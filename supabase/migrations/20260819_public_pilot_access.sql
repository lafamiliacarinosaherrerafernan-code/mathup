-- Acceso público y control del piloto +MathUp.
-- Seguro para aplicar sobre la base existente de desarrollo/piloto.

create table if not exists public.postal_locations (
  postal_code text not null,
  municipality text not null,
  province text not null,
  autonomous_region text,
  primary key (postal_code, municipality)
);

alter table public.centers add column if not exists postal_code text;
alter table public.centers add column if not exists generic_name text;
alter table public.centers add column if not exists ownership text;
alter table public.centers add column if not exists source_url text;
alter table public.enrollments add column if not exists center_name text;
alter table public.enrollments add column if not exists postal_code text;
alter table public.enrollments add column if not exists municipality text;
alter table public.enrollments add column if not exists province text;
alter table public.enrollments add column if not exists access_starts_at date not null default current_date;
alter table public.enrollments add column if not exists access_ends_at date;
alter table public.enrollments add column if not exists billing_mode text not null default 'pilot_free';
alter table public.enrollments drop constraint if exists enrollments_billing_mode_check;
alter table public.enrollments add constraint enrollments_billing_mode_check
  check (billing_mode in ('pilot_free', 'full_course', 'prorated'));
alter table public.enrollments drop constraint if exists enrollments_access_dates_check;
alter table public.enrollments add constraint enrollments_access_dates_check
  check (access_ends_at is null or access_ends_at >= access_starts_at);

create table if not exists public.app_sessions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  session_token uuid not null,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create index if not exists centers_postal_code_idx
  on public.centers (postal_code) where is_active = true;
create index if not exists centers_province_active_idx
  on public.centers (province, is_active, municipality, name);
create index if not exists enrollments_location_idx
  on public.enrollments (province, municipality, postal_code) where is_current = true;
create index if not exists app_sessions_last_seen_idx
  on public.app_sessions (last_seen_at desc);

alter table public.postal_locations enable row level security;
alter table public.app_sessions enable row level security;

grant select on public.postal_locations to anon, authenticated;
grant select, insert on public.guardian_consents to authenticated;
grant select, insert, update, delete on public.app_sessions to authenticated;
grant all on public.postal_locations to service_role;
grant all on public.app_sessions to service_role;

drop policy if exists "Localidades postales visibles para registro" on public.postal_locations;
create policy "Localidades postales visibles para registro"
  on public.postal_locations for select to anon, authenticated using (true);

drop policy if exists "Cada usuario solicita autorizacion familiar" on public.guardian_consents;
create policy "Cada usuario solicita autorizacion familiar"
  on public.guardian_consents for insert to authenticated
  with check ((select auth.uid()) = student_user_id);

drop policy if exists "Cada usuario consulta su sesion" on public.app_sessions;
drop policy if exists "Cada usuario crea su sesion" on public.app_sessions;
drop policy if exists "Cada usuario actualiza su sesion" on public.app_sessions;
drop policy if exists "Cada usuario cierra su sesion" on public.app_sessions;
create policy "Cada usuario consulta su sesion" on public.app_sessions for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Cada usuario crea su sesion" on public.app_sessions for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Cada usuario actualiza su sesion" on public.app_sessions for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Cada usuario cierra su sesion" on public.app_sessions for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Cada usuario registra sus intentos" on public.learning_attempts;
create policy "Cada usuario registra sus intentos"
  on public.learning_attempts for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.enrollments e
      where e.id = enrollment_id
        and e.user_id = (select auth.uid())
        and e.course_code = learning_attempts.course_code
        and e.is_current = true
        and e.access_starts_at <= current_date
        and (e.access_ends_at is null or e.access_ends_at >= current_date)
    )
  );

create or replace function public.claim_app_session(p_session_token uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then return false; end if;
  insert into public.app_sessions (user_id, session_token, started_at, last_seen_at)
  values (auth.uid(), p_session_token, now(), now())
  on conflict (user_id) do update
    set session_token = excluded.session_token,
        started_at = case when public.app_sessions.session_token = excluded.session_token
          then public.app_sessions.started_at else now() end,
        last_seen_at = now()
    where public.app_sessions.session_token = excluded.session_token
       or public.app_sessions.last_seen_at < now() - interval '2 minutes';
  return found;
end;
$$;

create or replace function public.heartbeat_app_session(p_session_token uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  update public.app_sessions set last_seen_at = now()
   where user_id = auth.uid() and session_token = p_session_token;
  return found;
end;
$$;

create or replace function public.release_app_session(p_session_token uuid)
returns void language sql security definer set search_path = '' as $$
  delete from public.app_sessions
   where user_id = auth.uid() and session_token = p_session_token;
$$;

create or replace function public.get_my_admin_role()
returns text language sql stable security definer set search_path = '' as $$
  select role from public.platform_admins where user_id = auth.uid();
$$;

create or replace function public.admin_dashboard_stats()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare result jsonb;
begin
  if not exists (
    select 1 from public.platform_admins
    where user_id = auth.uid() and role in ('owner', 'developer')
  ) then
    raise exception 'Acceso administrativo no autorizado' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'registeredUsers', (select count(*) from public.profiles where is_demo = false),
    'onlineUsers', (select count(*) from public.app_sessions where last_seen_at >= now() - interval '2 minutes'),
    'byCourse', coalesce((select jsonb_agg(jsonb_build_object('label', course_code, 'count', total) order by total desc)
      from (select course_code, count(*) total from public.enrollments where is_current group by course_code) q), '[]'::jsonb),
    'byProvince', coalesce((select jsonb_agg(jsonb_build_object('label', province, 'count', total) order by total desc)
      from (select province, count(*) total from public.enrollments where is_current and province is not null group by province) q), '[]'::jsonb),
    'byMunicipality', coalesce((select jsonb_agg(jsonb_build_object('label', municipality, 'count', total) order by total desc)
      from (select municipality, count(*) total from public.enrollments where is_current and municipality is not null group by municipality) q), '[]'::jsonb)
  ) into result;
  return result;
end;
$$;

revoke all on function public.claim_app_session(uuid) from public, anon;
revoke all on function public.heartbeat_app_session(uuid) from public, anon;
revoke all on function public.release_app_session(uuid) from public, anon;
revoke all on function public.get_my_admin_role() from public, anon;
revoke all on function public.admin_dashboard_stats() from public, anon;
grant execute on function public.claim_app_session(uuid) to authenticated;
grant execute on function public.heartbeat_app_session(uuid) to authenticated;
grant execute on function public.release_app_session(uuid) to authenticated;
grant execute on function public.get_my_admin_role() to authenticated;
grant execute on function public.admin_dashboard_stats() to authenticated;

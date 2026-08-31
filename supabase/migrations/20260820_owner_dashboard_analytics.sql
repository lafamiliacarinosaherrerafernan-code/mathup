-- Analítica privada para el panel owner. Solo expone datos agregados mediante
-- funciones SECURITY DEFINER que verifican el rol administrativo.

create table if not exists public.app_usage_sessions (
  user_id uuid not null references auth.users(id) on delete cascade,
  session_token uuid not null,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  ended_at timestamptz,
  is_demo_session boolean not null default false,
  primary key (user_id, session_token)
);

create index if not exists app_usage_sessions_started_at_idx
  on public.app_usage_sessions (started_at desc);
create index if not exists app_usage_sessions_user_started_idx
  on public.app_usage_sessions (user_id, started_at desc);

alter table public.app_usage_sessions enable row level security;
grant all on public.app_usage_sessions to service_role;

create or replace function public.claim_app_session(p_session_token uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  claimed boolean;
begin
  if auth.uid() is null then return false; end if;

  insert into public.app_sessions (user_id, session_token, started_at, last_seen_at)
  values (auth.uid(), p_session_token, now(), now())
  on conflict (user_id) do update
    set session_token = excluded.session_token,
        started_at = case
          when public.app_sessions.session_token = excluded.session_token
            then public.app_sessions.started_at
          else now()
        end,
        last_seen_at = now()
    where public.app_sessions.session_token = excluded.session_token
       or public.app_sessions.last_seen_at < now() - interval '2 minutes';

  claimed := found;
  if claimed then
    insert into public.app_usage_sessions (
      user_id, session_token, started_at, last_seen_at, ended_at, is_demo_session
    )
    values (auth.uid(), p_session_token, now(), now(), null, false)
    on conflict (user_id, session_token) do update
      set last_seen_at = now(), ended_at = null;
  end if;

  return claimed;
end;
$$;

create or replace function public.heartbeat_app_session(p_session_token uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  session_is_active boolean;
begin
  update public.app_sessions
     set last_seen_at = now()
   where user_id = auth.uid() and session_token = p_session_token;

  session_is_active := found;
  if session_is_active then
    update public.app_usage_sessions
       set last_seen_at = now()
     where user_id = auth.uid() and session_token = p_session_token;
  end if;

  return session_is_active;
end;
$$;

create or replace function public.release_app_session(p_session_token uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.app_usage_sessions
     set last_seen_at = now(), ended_at = now()
   where user_id = auth.uid() and session_token = p_session_token;

  delete from public.app_sessions
   where user_id = auth.uid() and session_token = p_session_token;
end;
$$;

create or replace function public.report_app_error(
  p_area text,
  p_error_code text default null,
  p_message text default null,
  p_context_data jsonb default '{}'::jsonb,
  p_app_version text default null,
  p_is_demo_session boolean default false
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  report_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Es necesario iniciar sesión' using errcode = '42501';
  end if;

  insert into public.app_error_reports (
    reporter_user_id,
    is_demo_session,
    app_version,
    area,
    error_code,
    message,
    context_data
  ) values (
    auth.uid(),
    coalesce(p_is_demo_session, false),
    left(nullif(trim(p_app_version), ''), 80),
    left(coalesce(nullif(trim(p_area), ''), 'general'), 80),
    left(nullif(trim(p_error_code), ''), 80),
    left(coalesce(nullif(trim(p_message), ''), 'Error sin mensaje'), 500),
    coalesce(p_context_data, '{}'::jsonb)
  )
  returning id into report_id;

  return report_id;
end;
$$;

create or replace function public.admin_dashboard_stats()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  result jsonb;
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
    'activeUsers7d', (select count(distinct user_id) from public.app_usage_sessions where not is_demo_session and started_at >= now() - interval '7 days'),
    'sessions7d', (select count(*) from public.app_usage_sessions where not is_demo_session and started_at >= now() - interval '7 days'),
    'usageSeconds', coalesce((
      select sum(greatest(0, extract(epoch from (
        least(coalesce(ended_at, last_seen_at), started_at + interval '12 hours') - started_at
      ))))::bigint
      from public.app_usage_sessions
      where not is_demo_session
    ), 0),
    'usageSeconds7d', coalesce((
      select sum(greatest(0, extract(epoch from (
        least(coalesce(ended_at, last_seen_at), started_at + interval '12 hours') - started_at
      ))))::bigint
      from public.app_usage_sessions
      where not is_demo_session and started_at >= now() - interval '7 days'
    ), 0),
    'attempts7d', (select count(*) from public.learning_attempts where completed_at >= now() - interval '7 days'),
    'correctRate7d', coalesce((
      select round(100.0 * sum(correct_answers) / nullif(sum(total_questions), 0), 1)
      from public.learning_attempts
      where completed_at >= now() - interval '7 days'
    ), 0),
    'newErrors', (select count(*) from public.app_error_reports where not is_demo_session and status = 'new'),
    'errors7d', (select count(*) from public.app_error_reports where not is_demo_session and created_at >= now() - interval '7 days'),
    'billingSummary', jsonb_build_object(
      'activeEnrollments', (select count(*) from public.enrollments where is_current),
      'pilotFree', (select count(*) from public.enrollments where is_current and billing_mode = 'pilot_free'),
      'fullCourse', (select count(*) from public.enrollments where is_current and billing_mode = 'full_course'),
      'prorated', (select count(*) from public.enrollments where is_current and billing_mode = 'prorated'),
      'paymentsEnabled', false,
      'revenueCents', 0
    ),
    'byCourse', coalesce((
      select jsonb_agg(jsonb_build_object('label', course_code, 'count', total) order by total desc)
      from (select course_code, count(*) total from public.enrollments where is_current group by course_code) q
    ), '[]'::jsonb),
    'byProvince', coalesce((
      select jsonb_agg(jsonb_build_object('label', province, 'count', total) order by total desc)
      from (select province, count(*) total from public.enrollments where is_current and province is not null group by province) q
    ), '[]'::jsonb),
    'byMunicipality', coalesce((
      select jsonb_agg(jsonb_build_object('label', municipality, 'count', total) order by total desc)
      from (select municipality, count(*) total from public.enrollments where is_current and municipality is not null group by municipality) q
    ), '[]'::jsonb),
    'dailyActivity', coalesce((
      select jsonb_agg(jsonb_build_object(
        'label', to_char(days.day, 'DD/MM'),
        'sessions', coalesce(usage.sessions, 0),
        'seconds', coalesce(usage.seconds, 0)
      ) order by days.day)
      from generate_series(current_date - 6, current_date, interval '1 day') as days(day)
      left join (
        select started_at::date as day,
               count(*) as sessions,
               sum(greatest(0, extract(epoch from (
                 least(coalesce(ended_at, last_seen_at), started_at + interval '12 hours') - started_at
               ))))::bigint as seconds
        from public.app_usage_sessions
        where not is_demo_session and started_at >= current_date - 6
        group by started_at::date
      ) usage on usage.day = days.day::date
    ), '[]'::jsonb),
    'errorSummary', coalesce((
      select jsonb_agg(jsonb_build_object('area', area, 'status', status, 'count', total) order by total desc)
      from (
        select area, status, count(*) total
        from public.app_error_reports
        where not is_demo_session
        group by area, status
        order by total desc
        limit 12
      ) q
    ), '[]'::jsonb),
    'recentErrors', coalesce((
      select jsonb_agg(jsonb_build_object(
        'area', area,
        'code', error_code,
        'message', message,
        'status', status,
        'createdAt', created_at
      ) order by created_at desc)
      from (
        select area, error_code, message, status, created_at
        from public.app_error_reports
        where not is_demo_session
        order by created_at desc
        limit 8
      ) q
    ), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

revoke all on function public.report_app_error(text, text, text, jsonb, text, boolean) from public, anon;
revoke all on function public.admin_dashboard_stats() from public, anon;

grant execute on function public.claim_app_session(uuid) to authenticated;
grant execute on function public.heartbeat_app_session(uuid) to authenticated;
grant execute on function public.release_app_session(uuid) to authenticated;
grant execute on function public.report_app_error(text, text, text, jsonb, text, boolean) to authenticated;
grant execute on function public.get_my_admin_role() to authenticated;
grant execute on function public.admin_dashboard_stats() to authenticated;

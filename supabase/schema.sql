-- Modelo inicial para la futura autenticacion publica de Aula Margarita Salas.
-- Ejecutar en Supabase solo cuando exista un proyecto de desarrollo separado.

create table if not exists public.centers (
  id uuid primary key default gen_random_uuid(),
  official_code text unique,
  name text not null,
  country_code text not null default 'ES',
  autonomous_region text,
  province text,
  municipality text,
  is_pilot boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 60),
  age_band text not null check (age_band in ('under_14', '14_to_17', 'adult')),
  is_demo boolean not null default false,
  preferred_language text not null default 'es',
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  center_id uuid references public.centers(id) on delete set null,
  academic_year text not null check (academic_year ~ '^[0-9]{4}-[0-9]{4}$'),
  course_code text not null check (course_code in (
    '1eso', '2eso', '3eso', '4eso-a', '4eso-b',
    '1bach-mates', '1bach-ccss', '2bach-mates', '2bach-ccss'
  )),
  group_label text,
  is_current boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, academic_year)
);

create table if not exists public.guardian_consents (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references auth.users(id) on delete cascade,
  guardian_email text not null,
  status text not null default 'pending' check (status in ('pending', 'verified', 'revoked', 'expired')),
  requested_at timestamptz not null default now(),
  verified_at timestamptz,
  revoked_at timestamptz
);

create table if not exists public.learning_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  course_code text not null,
  topic_key text not null,
  activity_mode text not null,
  correct_answers integer not null default 0 check (correct_answers >= 0),
  total_questions integer not null check (total_questions > 0),
  score integer not null default 0,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  completed_at timestamptz not null default now(),
  check (correct_answers <= total_questions)
);

create table if not exists public.student_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  scope_key text not null,
  progress_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, enrollment_id, scope_key)
);

create table if not exists public.platform_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'developer', 'support')),
  mfa_required boolean not null default true,
  created_at timestamptz not null default now(),
  granted_by uuid references auth.users(id) on delete set null
);

create table if not exists public.app_error_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid references auth.users(id) on delete set null,
  is_demo_session boolean not null default false,
  app_version text,
  area text not null,
  error_code text,
  message text not null,
  context_data jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new', 'reviewing', 'resolved', 'discarded')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users(id) on delete restrict,
  action text not null,
  target_type text,
  target_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists enrollments_center_year_idx
  on public.enrollments (center_id, academic_year, course_code);
create index if not exists learning_attempts_user_date_idx
  on public.learning_attempts (user_id, completed_at desc);
create index if not exists learning_attempts_enrollment_topic_idx
  on public.learning_attempts (enrollment_id, topic_key);
create index if not exists app_error_reports_status_date_idx
  on public.app_error_reports (status, created_at desc);
create index if not exists admin_audit_log_admin_date_idx
  on public.admin_audit_log (admin_user_id, created_at desc);

alter table public.centers enable row level security;
alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.guardian_consents enable row level security;
alter table public.learning_attempts enable row level security;
alter table public.student_progress enable row level security;
alter table public.platform_admins enable row level security;
alter table public.app_error_reports enable row level security;
alter table public.admin_audit_log enable row level security;

-- El proyecto se crea sin exponer automaticamente las tablas nuevas.
-- Concedemos solo las operaciones que necesita el navegador; RLS aplica
-- ademas las reglas por usuario definidas mas abajo.
grant usage on schema public to anon, authenticated, service_role;

grant select on public.centers to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.enrollments to authenticated;
grant select on public.guardian_consents to authenticated;
grant select, insert on public.learning_attempts to authenticated;
grant select, insert, update on public.student_progress to authenticated;

grant all on public.centers to service_role;
grant all on public.profiles to service_role;
grant all on public.enrollments to service_role;
grant all on public.guardian_consents to service_role;
grant all on public.learning_attempts to service_role;
grant all on public.student_progress to service_role;
grant all on public.platform_admins to service_role;
grant all on public.app_error_reports to service_role;
grant all on public.admin_audit_log to service_role;

create policy "Centros activos visibles para registro"
  on public.centers for select
  to anon, authenticated
  using (is_active = true);

create policy "Cada usuario consulta su perfil"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = user_id);
create policy "Cada usuario crea su perfil"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Cada usuario actualiza su perfil"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Cada usuario consulta sus matriculas"
  on public.enrollments for select
  to authenticated
  using ((select auth.uid()) = user_id);
create policy "Cada usuario crea sus matriculas"
  on public.enrollments for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Cada usuario actualiza sus matriculas"
  on public.enrollments for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Cada usuario consulta sus solicitudes familiares"
  on public.guardian_consents for select
  to authenticated
  using ((select auth.uid()) = student_user_id);

create policy "Cada usuario consulta sus intentos"
  on public.learning_attempts for select
  to authenticated
  using ((select auth.uid()) = user_id);
create policy "Cada usuario registra sus intentos"
  on public.learning_attempts for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.enrollments e
      where e.id = enrollment_id and e.user_id = (select auth.uid())
    )
  );

create policy "Cada usuario consulta su progreso"
  on public.student_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);
create policy "Cada usuario crea su progreso"
  on public.student_progress for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.enrollments e
      where e.id = enrollment_id and e.user_id = (select auth.uid())
    )
  );
create policy "Cada usuario actualiza su progreso"
  on public.student_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.enrollments e
      where e.id = enrollment_id and e.user_id = (select auth.uid())
    )
  );

-- platform_admins, app_error_reports y admin_audit_log no tienen politicas
-- de acceso desde el navegador. El panel privado comprobara el rol en el
-- servidor y todas sus operaciones quedaran registradas.
--
-- Las verificaciones familiares, estadisticas agregadas y operaciones de
-- administracion se ejecutaran exclusivamente desde funciones de servidor.
-- Nunca debe exponerse la clave service_role en el navegador.

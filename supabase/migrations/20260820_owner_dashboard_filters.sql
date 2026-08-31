-- Explorador privado para filtrar el panel owner por persona, curso y ubicacion.
-- La funcion exige owner/developer y MFA aal2 mediante require_admin_access.

create or replace function public.admin_dashboard_explorer(
  p_days integer default 30
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  safe_days integer := greatest(1, least(coalesce(p_days, 30), 365));
  cutoff timestamptz;
  result jsonb;
begin
  perform public.require_admin_access(array['owner', 'developer']::text[]);
  cutoff := now() - make_interval(days => safe_days);

  with current_enrollment as (
    select distinct on (e.user_id)
      e.user_id, e.id, e.course_code, e.academic_year, e.center_name,
      e.province, e.municipality, e.postal_code, e.billing_mode,
      e.access_starts_at, e.access_ends_at, e.is_current
    from public.enrollments e
    where e.is_current
    order by e.user_id, e.created_at desc
  ), usage_totals as (
    select s.user_id,
      count(*)::integer sessions,
      coalesce(sum(greatest(0, extract(epoch from (
        least(coalesce(s.ended_at, s.last_seen_at), s.started_at + interval '12 hours') - s.started_at
      )))), 0)::bigint seconds
    from public.app_usage_sessions s
    where not s.is_demo_session and s.started_at >= cutoff
    group by s.user_id
  ), attempt_totals as (
    select a.user_id,
      count(*)::integer attempts,
      coalesce(sum(a.correct_answers), 0)::integer correct_answers,
      coalesce(sum(a.total_questions), 0)::integer total_questions
    from public.learning_attempts a
    where a.completed_at >= cutoff
    group by a.user_id
  ), error_totals as (
    select r.reporter_user_id user_id,
      count(*)::integer errors,
      count(*) filter (where r.status = 'new')::integer new_errors
    from public.app_error_reports r
    where not r.is_demo_session and r.created_at >= cutoff
    group by r.reporter_user_id
  )
  select jsonb_build_object(
    'periodDays', safe_days,
    'students', coalesce(jsonb_agg(jsonb_build_object(
      'userId', p.user_id,
      'displayName', p.display_name,
      'email', u.email,
      'courseCode', e.course_code,
      'academicYear', e.academic_year,
      'centerName', e.center_name,
      'province', e.province,
      'municipality', e.municipality,
      'postalCode', e.postal_code,
      'billingMode', e.billing_mode,
      'accessStartsAt', e.access_starts_at,
      'accessEndsAt', e.access_ends_at,
      'isOnline', exists (
        select 1 from public.app_sessions active
        where active.user_id = p.user_id
          and active.last_seen_at >= now() - interval '2 minutes'
      ),
      'sessions', coalesce(us.sessions, 0),
      'usageSeconds', coalesce(us.seconds, 0),
      'attempts', coalesce(attempts.attempts, 0),
      'correctAnswers', coalesce(attempts.correct_answers, 0),
      'totalQuestions', coalesce(attempts.total_questions, 0),
      'errors', coalesce(err.errors, 0),
      'newErrors', coalesce(err.new_errors, 0),
      'revenueCents', 0
    ) order by lower(p.display_name), lower(coalesce(u.email, ''))), '[]'::jsonb)
  ) into result
  from public.profiles p
  left join auth.users u on u.id = p.user_id
  left join current_enrollment e on e.user_id = p.user_id
  left join usage_totals us on us.user_id = p.user_id
  left join attempt_totals attempts on attempts.user_id = p.user_id
  left join error_totals err on err.user_id = p.user_id
  where not p.is_demo;

  result := result || jsonb_build_object(
    'activityByDay', coalesce((
      select jsonb_agg(jsonb_build_object(
        'userId', q.user_id,
        'date', q.activity_date,
        'label', to_char(q.activity_date, 'DD/MM'),
        'sessions', q.sessions,
        'seconds', q.seconds
      ) order by q.activity_date, q.user_id)
      from (
        select s.user_id, s.started_at::date as activity_date,
          count(*)::integer sessions,
          coalesce(sum(greatest(0, extract(epoch from (
            least(coalesce(s.ended_at, s.last_seen_at), s.started_at + interval '12 hours') - s.started_at
          )))), 0)::bigint seconds
        from public.app_usage_sessions s
        where not s.is_demo_session and s.started_at >= cutoff
        group by s.user_id, s.started_at::date
      ) q
    ), '[]'::jsonb),
    'recentErrors', coalesce((
      select jsonb_agg(jsonb_build_object(
        'userId', r.reporter_user_id,
        'displayName', p.display_name,
        'courseCode', e.course_code,
        'province', e.province,
        'municipality', e.municipality,
        'area', r.area,
        'code', r.error_code,
        'message', r.message,
        'status', r.status,
        'createdAt', r.created_at
      ) order by r.created_at desc)
      from (
        select * from public.app_error_reports
        where not is_demo_session and created_at >= cutoff
        order by created_at desc
        limit 100
      ) r
      left join public.profiles p on p.user_id = r.reporter_user_id
      left join lateral (
        select course_code, province, municipality
        from public.enrollments current_e
        where current_e.user_id = r.reporter_user_id and current_e.is_current
        order by current_e.created_at desc
        limit 1
      ) e on true
    ), '[]'::jsonb)
  );

  return result;
end;
$$;

revoke all on function public.admin_dashboard_explorer(integer) from public, anon;
grant execute on function public.admin_dashboard_explorer(integer) to authenticated;

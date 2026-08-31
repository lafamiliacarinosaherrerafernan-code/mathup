-- Doble factor obligatorio para toda operación administrativa.
-- get_my_admin_role() se mantiene disponible en AAL1 únicamente para decidir
-- si la interfaz debe mostrar el paso MFA; no expone datos administrativos.

create or replace function public.require_admin_access(
  p_allowed_roles text[] default array['owner', 'developer']::text[]
)
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  admin_role text;
  requires_mfa boolean;
begin
  select role, mfa_required
    into admin_role, requires_mfa
    from public.platform_admins
   where user_id = auth.uid()
     and role = any(p_allowed_roles);

  if not found then
    raise exception 'Acceso administrativo no autorizado' using errcode = '42501';
  end if;

  if requires_mfa and coalesce(auth.jwt()->>'aal', 'aal1') <> 'aal2' then
    raise exception 'Se requiere doble factor para la administración' using errcode = '42501';
  end if;

  return admin_role;
end;
$$;

-- Conserva la implementación de estadísticas ya desplegada y la sitúa detrás
-- de la barrera común de rol + MFA. La operación es idempotente.
do $$
begin
  if to_regprocedure('public._admin_dashboard_stats_unprotected()') is null then
    alter function public.admin_dashboard_stats()
      rename to _admin_dashboard_stats_unprotected;
  end if;
end
$$;

create or replace function public.admin_dashboard_stats()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform public.require_admin_access(array['owner', 'developer']::text[]);
  return public._admin_dashboard_stats_unprotected();
end;
$$;

revoke all on function public.require_admin_access(text[]) from public, anon, authenticated;
revoke all on function public._admin_dashboard_stats_unprotected() from public, anon, authenticated;
revoke all on function public.admin_dashboard_stats() from public, anon;
grant execute on function public.admin_dashboard_stats() to authenticated;

comment on function public.require_admin_access(text[]) is
  'Barrera obligatoria de rol y AAL2 para RPC administrativas. Toda nueva función admin debe invocarla antes de leer o modificar datos.';


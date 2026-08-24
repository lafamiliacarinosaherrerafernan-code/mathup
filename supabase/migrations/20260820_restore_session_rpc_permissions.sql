-- Restaura los permisos de las funciones RPC que mantienen una única sesión
-- activa por alumno. Este hotfix es seguro de ejecutar más de una vez.

grant usage on schema public to authenticated;

grant execute on function public.claim_app_session(uuid) to authenticated;
grant execute on function public.heartbeat_app_session(uuid) to authenticated;
grant execute on function public.release_app_session(uuid) to authenticated;

do $$
declare
  function_signature regprocedure;
begin
  foreach function_signature in array array[
    'public.claim_app_session(uuid)'::regprocedure,
    'public.heartbeat_app_session(uuid)'::regprocedure,
    'public.release_app_session(uuid)'::regprocedure
  ]
  loop
    if not has_function_privilege('authenticated', function_signature, 'EXECUTE') then
      raise exception 'authenticated no puede ejecutar %', function_signature;
    end if;
  end loop;
end
$$;

select
  p.oid::regprocedure as funcion,
  has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_puede_ejecutar
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in (
    'claim_app_session',
    'heartbeat_app_session',
    'release_app_session'
  )
order by p.proname;

# Arquitectura de autenticacion publica

## Objetivo

Preparar la aplicacion para dos etapas compatibles:

1. Piloto controlado en el IES Margarita Salas durante el curso actual.
2. Aplicacion publica dirigida directamente a estudiantes de cualquier centro.

El centro educativo es un dato del perfil academico, no el propietario de la cuenta ni una credencial de acceso.

## Decisiones adoptadas

- El acceso habitual sera mediante Google o correo y contrasena.
- No se pedira telefono en la primera version.
- Ano academico, curso y centro se solicitan durante el registro y se confirman cada curso.
- El alumno no seleccionara su nombre, curso o grupo en cada inicio de sesion.
- Para personalizar la experiencia basta un nombre o apodo; los apellidos no son obligatorios.
- El centro se relacionara mediante su codigo oficial del Registro Estatal de Centros Docentes.
- Se permitira continuar sin centro cuando no aparezca o el usuario prefiera indicarlo mas adelante.
- La fecha de nacimiento se usara para calcular la franja de edad y no se conservara completa si no resulta necesaria.
- Los menores de 14 anos necesitaran un flujo verificable de autorizacion familiar.
- Las estadisticas por centro seran agregadas y no mostraran clasificaciones identificables.

## Estado actual

La opcion `Vista previa del nuevo registro` permite revisar el recorrido futuro sin sustituir el acceso local. La demostracion no crea cuentas, no envia formularios y no guarda los datos introducidos.

Los nombres, grupos, claves e informes disponibles actualmente son datos ficticios creados exclusivamente para probar la aplicacion y localizar fallos. No se migraran como usuarios reales.

El archivo `supabase/schema.sql` contiene un primer modelo revisable para:

- centros educativos;
- perfiles de usuario;
- matriculas por ano academico;
- autorizaciones familiares;
- intentos de aprendizaje;
- progreso acumulado;
- administradores de la plataforma;
- informes de errores;
- auditoria de acciones administrativas.

Todas las tablas con datos de alumnos activan seguridad por filas. Cada cuenta solo puede consultar o escribir sus propios registros. Las estadisticas globales y la verificacion familiar se reservan para funciones de servidor.

## Perfil de propietaria y desarrollo

La propietaria de la aplicacion tendra una cuenta personal independiente de las cuentas de estudiantes. Su rol sera `owner` y se comprobara siempre en el servidor mediante `platform_admins`.

El futuro panel privado permitira:

- revisar errores tecnicos clasificados por version y zona de la aplicacion;
- abrir escenarios de prueba de distintos cursos y edades;
- utilizar exclusivamente cuentas marcadas como `is_demo`;
- reiniciar el progreso ficticio para reproducir un fallo;
- marcar incidencias como nuevas, en revision o resueltas;
- consultar un historial de acciones administrativas.

La propietaria no necesitara conocer contrasenas de alumnos ni entrar como un usuario real. El modo de pruebas se limitara a perfiles ficticios. La cuenta de propietaria exigira doble factor de autenticacion antes del lanzamiento publico.

Durante la fase local se mantienen dos caminos existentes: los alumnos ficticios para revisar la experiencia y `Ctrl + Alt + A` para abrir el panel del profesor. Ninguno de estos mecanismos se publicara como autenticacion definitiva.

Ademas, `config.local.js` activa `DEVELOPER_MODE` exclusivamente en esta instalacion. Esto muestra un boton `Acceso de desarrollo` en la pantalla inicial. Tras introducir la contrasena local de administracion se abre un centro de pruebas con:

- acceso a la demostracion del nuevo registro;
- acceso a los alumnos ficticios;
- acceso al panel del profesor;
- estado de la futura conexion con Supabase;
- una lista temporal de zonas revisadas.

La lista de comprobacion no se guarda ni se envia. Se reinicia al actualizar o cerrar la aplicacion.

## Integracion prevista con Supabase

La siguiente fase necesitara un proyecto de desarrollo de Supabase separado del futuro entorno de produccion.

Valores publicos del cliente:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

Valor exclusivo del servidor:

- `SUPABASE_SERVICE_ROLE_KEY`

La clave `service_role` no debe aparecer nunca en HTML, JavaScript del navegador, GitHub ni archivos descargables.

## Orden de implantacion

1. Crear el proyecto de desarrollo en Supabase.
2. Revisar y ejecutar el esquema en ese proyecto.
3. Configurar correo y contrasena.
4. Configurar el proveedor de Google.
5. Sustituir la demostracion por registro e inicio de sesion reales.
6. Crear la cuenta `owner` y el panel privado de desarrollo.
7. Migrar progresivamente los informes de `localStorage` a la base de datos.
8. Crear la autorizacion familiar mediante una funcion de servidor y enlaces de un solo uso.
9. Importar y actualizar el directorio oficial de centros.
10. Probar el piloto con cuentas ficticias antes de utilizar datos reales.

## Limites de esta fase

- No se han creado cuentas reales.
- No se ha conectado ningun servicio externo.
- El acceso actual sigue siendo el mecanismo operativo.
- No se han transferido datos de alumnos ni resultados fuera del ordenador.

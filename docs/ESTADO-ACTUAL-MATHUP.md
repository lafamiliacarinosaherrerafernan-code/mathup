# Informe del estado actual de +MathUp

**Fecha de la auditoría:** 24 de agosto de 2026  
**Alcance:** estado real observado en el código, los datos locales, el esquema de Supabase, la configuración de despliegue y el repositorio Git.  
**Naturaleza de la revisión:** solo lectura. No se ha corregido, configurado, publicado ni alterado ninguna funcionalidad. La única salida creada es este informe.

## Resumen ejecutivo

+MathUp es actualmente una aplicación web educativa estática, escrita principalmente en HTML, CSS y JavaScript sin un framework ni un proceso de compilación. La mayor parte de la experiencia se concentra en `index.html` y `app.js`, con módulos separados para autenticación pública, Supabase, exámenes, entrenador personal, pizarra y reconocimiento manuscrito. Contiene nueve itinerarios académicos, desde 1.º ESO hasta 2.º Bachillerato, con dos opciones en 4.º ESO y dos modalidades de Bachillerato.

La aplicación pública ya dispone de registro e inicio de sesión mediante Supabase, elección de curso durante el alta, aislamiento del alumno en su matrícula vigente, control de una sesión simultánea por cuenta, acceso privado del propietario y doble factor TOTP obligatorio para la administración. El panel owner permite recorrer todos los cursos con perfiles ficticios y consultar datos de uso, sesiones, usuarios, localización y errores. Sin embargo, la gestión económica sigue desactivada y no existe todavía un CRUD administrativo completo de alumnos, grupos, cursos o ejercicios.

La distinción más importante del estado actual es la separación de datos: Supabase conserva identidad, perfil, matrícula, sesiones, uso y errores; en cambio, gran parte de los resultados de ejercicios, progreso de aventura, entrenador y repetición se guarda en `localStorage` del navegador. Las tablas remotas `learning_attempts` y `student_progress` existen, pero el recorrido principal no las alimenta actualmente. En consecuencia, el panel owner no constituye todavía un historial académico completo y multidispositivo.

El despliegue público preparado utiliza GitHub Pages desde la rama `agent/indice-pruebas-y-autenticacion`. La URL de Pages bajo `/mathup/` respondía correctamente en la comprobación del 24/08/2026. `mathup.es` resolvía a las cuatro direcciones IPv4 de GitHub Pages, pero el repositorio local no tiene archivo `CNAME` y el dominio no estaba sirviendo la aplicación con HTTPS: la asociación de dominio personalizado no podía considerarse terminada.

---

## 1. Estructura general de +MathUp

### 1.1 Cursos existentes

El catálogo activo contiene nueve cursos:

1. 1.º ESO — 10 temas.
2. 2.º ESO — 9 temas.
3. 3.º ESO — 10 temas.
4. 4.º ESO Opción A — 9 temas.
5. 4.º ESO Opción B — 14 temas.
6. 1.º Bachillerato Matemáticas I — 11 temas.
7. 1.º Bachillerato CCSS I — 12 temas.
8. 2.º Bachillerato Matemáticas II — 14 temas.
9. 2.º Bachillerato CCSS II — 11 temas.

El orden visible está fijado en `COURSE_DISPLAY_ORDER` dentro de `app.js`. Los identificadores técnicos son `1eso`, `2eso`, `3eso`, `4eso-a`, `4eso-b`, `1bach-mates`, `1bach-ccss`, `2bach-mates` y `2bach-ccss`.

### 1.2 Modalidades y zonas por etapa

**ESO** dispone de tres entradas principales:

- **Aprende y juega:** abre el panel del curso, desde el que se accede a temas, estudio, retos y a la aventura matemática.
- **Entrenador personal con IA:** realiza diagnóstico, recomienda contenidos y organiza sesiones adaptadas.
- **Examen personalizado:** permite escoger temas y una cantidad de 4 a 8 preguntas.

Dentro de la práctica por temas se ofrecen los niveles visibles **Aprendiz** y **Maestro**. La aventura añade un mapa por zonas, fases de aprender, entrenar y enfrentarse al jefe final, energía y recompensas.

**1.º Bachillerato** mantiene:

- temas, estudio y retos;
- entrenador personal;
- examen personalizado de 4 a 8 preguntas.

No presenta la aventura narrativa de ESO.

**2.º Bachillerato** está orientado a preparación PAU:

- práctica por temas y retos PAU;
- práctica por bloques y retos;
- simulacro o examen PAU completo;
- selección de comunidad autónoma, actualmente Castilla-La Mancha o Madrid.

No incorpora el entrenador personal ni la aventura.

### 1.3 Flujo real del alumno

El recorrido público normal es:

1. La persona entra en la pantalla de acceso.
2. Inicia sesión con correo y contraseña o mediante Google; si no tiene cuenta, completa el registro.
3. Durante el alta se crea su perfil académico y se elige un único curso para la matrícula vigente.
4. Supabase devuelve el perfil y la matrícula actual; el código toma `enrollment.course_code` como curso autorizado.
5. Se reclama una sesión de aplicación mediante `claim_app_session`. Si otra pestaña o dispositivo conserva una sesión reciente para esa misma cuenta, se bloquea el nuevo acceso.
6. La aplicación conduce directamente a la portada de la etapa matriculada. El alumno no recibe un selector para cambiar a otros cursos.
7. Elige modalidad, tema, bloque o examen según la etapa.
8. La aplicación selecciona ejercicios compatibles con ese contexto, muestra el enunciado y registra las respuestas.
9. Tras responder, ofrece realimentación, respuesta correcta y/o resolución paso a paso según el tipo de ejercicio.
10. Al terminar muestra el resultado y guarda el informe principalmente en el navegador local.

### 1.4 Navegación principal

La aplicación es una interfaz de página única: `renderShell` sustituye el contenido del área central sin un sistema externo de rutas. Los cambios entre portada, tema, reto, aventura, examen, entrenador y resultados son llamadas JavaScript. La sesión, el curso y el estado de actividad viven en un objeto global de estado y en almacenamiento del navegador. Existen botones de vuelta contextual, cierre de sesión y, solo para una cuenta administrativa verificada, un botón flotante de administración.

---

## 2. Sistema de acceso y usuarios

### 2.1 Acceso actual

El acceso público está implementado en `public-auth.js` y `supabase-client.js` sobre Supabase Auth:

- correo y contraseña;
- OAuth con Google;
- creación de cuenta con incorporación académica;
- recuperación del contexto de sesión al recargar;
- cierre de sesión;
- control de sesión única de la aplicación.

El alta está organizada en tres pasos: credenciales, perfil académico y centro/privacidad. Se solicitan, según el caso, nombre visible, fecha de nacimiento o franja de edad, año académico, curso, código postal, municipio, provincia, centro oficial o introducido manualmente y consentimiento. Para menores de 14 años se recoge correo de tutor y se crea un registro de consentimiento pendiente.

### 2.2 Perfiles existentes

Hay cuatro conceptos de perfil en el código:

- **Alumno autenticado:** usuario normal de Supabase con perfil y matrícula vigente.
- **Owner:** fila en `platform_admins` con rol `owner`; accede al panel completo protegido con MFA.
- **Developer:** fila con rol `developer`; puede usar las consultas administrativas permitidas. Existe además un modo local de desarrollo separado.
- **Support:** el esquema admite el valor `support`, pero las funciones del panel analizadas autorizan owner/developer, no convierten support en administrador general.

Además hay **perfiles ficticios o demo**, usados en los recorridos de prueba. No son alumnos reales y el diseño pretende excluir sus acciones de las estadísticas reales.

### 2.3 Capacidades del alumno

Un alumno puede:

- entrar únicamente en su curso matriculado;
- consultar el índice y los materiales de su curso;
- practicar temas y retos disponibles;
- realizar examen personalizado cuando su etapa lo permite;
- usar aventura en ESO;
- usar entrenador personal en ESO y 1.º Bachillerato;
- preparar bloques y simulacros PAU en 2.º Bachillerato;
- ver corrección y soluciones;
- usar pizarra auxiliar y, en ESO y bajo condiciones controladas, el diagnóstico de reconocimiento manuscrito;
- conservar resultados y progreso en el dispositivo actual.

No puede cambiar por sí mismo la matrícula para acceder a otros cursos ni abrir el panel owner.

### 2.4 Capacidades administrativas

La cuenta owner verificada puede:

- abrir el panel privado;
- elegir cualquiera de los nueve cursos y recorrerlo con un alumno ficticio;
- abrir el índice completo de cada curso;
- filtrar estadísticas por periodo, alumno, curso, provincia y municipio;
- observar uso, sesiones, actividad, distribución, matrículas y errores técnicos;
- ver la preparación de facturación y sus desgloses, todavía sin ejecutar cobros.

El acceso administrativo exige sesión Supabase, rol autorizado y nivel de autenticación `aal2` mediante TOTP. La autorización se repite en funciones SQL `security definer`, no depende solo de ocultar botones en la interfaz.

### 2.5 Distinción técnica de roles

- El alumno se identifica con `auth.uid()` y su contexto se recupera de `profiles` y `enrollments`.
- El rol administrativo reside en `platform_admins` y se consulta mediante `get_my_admin_role()`.
- `require_admin_access()` comprueba el rol y, cuando `mfa_required` es verdadero, exige `auth.jwt()->>'aal' = 'aal2'`.
- El navegador solo monta el botón/panel cuando `MATHUP_VERIFIED_ADMIN_ROLE` contiene `owner` o `developer`.
- El modo local de desarrollo usa `APP_CONFIG.DEVELOPER_MODE` y una clave local configurada; es una herramienta de prueba distinta del owner público.

### 2.6 Identificación y datos guardados

El identificador estable es el UUID de Supabase Auth (`user_id`). Se asocian:

- correo en Supabase Auth;
- nombre visible, franja de edad, idioma, indicador demo y estado de incorporación;
- matrícula, año académico, curso, grupo, centro, localidad, provincia, código postal y fechas de acceso;
- modalidad de facturación (`pilot_free`, `full_course` o `prorated`);
- consentimiento del tutor cuando corresponde;
- sesión activa y último latido;
- sesiones de uso y errores técnicos en las migraciones actuales;
- tablas preparadas para intentos y progreso.

No se guarda una dirección postal personal completa. La localización es académica/geográfica y se usa para centros y agregación.

**Aclaración sobre contraseñas:** el sistema bloquea dos sesiones simultáneas de una misma **cuenta**, no comprueba que dos cuentas diferentes hayan escogido la misma contraseña. Supabase almacena y valida las contraseñas; el proyecto no implementa una regla de unicidad entre contraseñas, algo que tampoco sería aconsejable revelar o comparar.

---

## 3. Panel de administración

### 3.1 Panel owner público

Se compone de tres bloques.

#### Bloque 01: Perfil alumno

Permite seleccionar cualquiera de los nueve cursos, entrar como alumno ficticio o abrir el índice completo. Su finalidad real es revisar diseño, estructura y contenidos sin alterar un alumno real. No edita matrículas ni suplanta técnicamente una cuenta real.

#### Bloque 02: Estadísticas

Permite combinar:

- periodo de 7, 30, 90 o 365 días;
- alumno concreto;
- curso;
- provincia;
- municipio.

Muestra tarjetas de usuarios seleccionados/conectados, activos, tiempo de uso, sesiones, actividades y errores; actividad diaria; alumnado por curso; distribución geográfica; detalle del alumno cuando solo hay uno seleccionado; y últimos errores técnicos. Las consultas proceden de `admin_dashboard_stats` y `admin_dashboard_explorer`.

#### Bloque 03: Pagos e ingresos

Muestra cantidades de matrículas activas, piloto gratuito, curso completo, prorrateadas e ingresos calculados. Ofrece desgloses asociados a provincia y municipio. En el estado actual los botones **Gestionar pagos** y **Exportar ingresos** están deshabilitados. No existe proveedor de pago, tarifa operativa, cobro, devolución, factura ni conciliación.

### 3.2 Panel local de desarrollo

Existe otro panel, no equivalente al owner público, pensado para este ordenador y datos ficticios. Permite:

- recorrer el registro;
- entrar como alumno ficticio;
- revisar el panel de profesor heredado;
- comprobar conexión con Supabase;
- abrir pruebas de aventura, Bachillerato y administración;
- marcar áreas como revisadas;
- abrir catálogos e índices.

Es una herramienta de control manual, no un sistema de administración de producción.

### 3.3 Panel de profesor heredado

`app.js` conserva un panel local con informes por año, grupo y alumno, resúmenes, resultados y exportación CSV. También presenta estudiantes ficticios y claves generadas. No está conectado a un CRUD remoto de alumnado real y no sustituye el panel owner.

### 3.4 Qué gestión no existe actualmente

No se ha encontrado una capacidad administrativa operativa para:

- crear, editar o eliminar cuentas reales desde el panel;
- cambiar la matrícula o contraseña de un alumno;
- crear y administrar grupos reales;
- editar el catálogo de cursos desde la interfaz;
- crear, corregir o publicar ejercicios desde el panel;
- cambiar manualmente resultados académicos;
- resolver errores o registrar su seguimiento desde la interfaz;
- gestionar permisos administrativos desde el panel;
- modificar configuración de Supabase o de publicación;
- ejecutar cobros o emitir facturas.

Esas tareas requerirían intervención en Supabase, archivos o herramientas externas.

---

## 4. Estadísticas

### 4.1 Estadísticas remotas del owner

Las migraciones amplían el panel con:

- usuarios registrados no demo;
- conectados en los últimos dos minutos;
- activos en el periodo;
- sesiones y tiempo de uso;
- actividades/intentos y respuestas correctas cuando existen en `learning_attempts`;
- errores técnicos;
- distribución por curso, provincia y municipio;
- actividad por día;
- detalle de alumno, centro y ubicación;
- tipos de matrícula y cálculo de ingresos según los campos disponibles.

Los filtros se aplican sobre los datos entregados por funciones SQL protegidas. El navegador no recibe acceso directo general a las tablas administrativas.

### 4.2 Informes académicos locales

La práctica normal guarda en `localStorage`, bajo claves históricas que todavía conservan el nombre Margarita Salas, información como:

- fecha;
- año académico;
- alumno y grupo;
- curso y tema;
- nivel del reto;
- puntuación;
- respuestas correctas y total;
- modalidad y superación en aventura.

El panel de profesor local agrega esos datos por alumno, grupo, curso y tema y permite exportarlos a CSV. Las medallas y sesiones visibles en el panel del alumno se derivan también de estos informes locales.

### 4.3 Progreso y estadísticas específicas

- **Aventura:** XP, monedas, temas desbloqueados/completados, jefes derrotados, aciertos, errores, tiempo total y mejor racha.
- **Entrenador:** diagnóstico, dominio por tema, resultados de sesiones, intentos, pistas, tiempos, tipos de error y recomendación siguiente.
- **2.º Bachillerato:** historial de preguntas vistas para controlar repetición; no equivale a una estadística completa del simulacro en Supabase.
- **Uso y errores:** sí se envían a Supabase mediante las funciones y tablas añadidas para el panel owner.

### 4.4 Limitación central

Aunque `learning_attempts` y `student_progress` existen en el esquema, no se encontró en el recorrido principal una escritura de los resultados de retos, aventura o entrenador a esas tablas. Por tanto:

- el progreso académico no se sincroniza completamente entre dispositivos;
- borrar los datos del navegador puede eliminar el historial local;
- el panel owner puede mostrar sesiones y uso reales, pero cero actividades académicas o datos parciales;
- no hay todavía una estadística remota fiable por ejercicio, tema o alumno que reúna todos los recorridos.

Esta es una diferencia entre **estructura preparada** y **funcionalidad conectada**.

---

## 5. Cursos y modalidades de aprendizaje

| Curso | Temas/estudio | Retos por tema | Nivel Aprendiz/Maestro | Aventura | Entrenador personal | Examen personalizado | Bloques PAU | Simulacro PAU | Comunidad PAU |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1.º ESO | Sí | Sí | Sí | Sí | Sí | Sí | No | No | No |
| 2.º ESO | Sí | Sí | Sí | Sí | Sí | Sí | No | No | No |
| 3.º ESO | Sí | Sí | Sí | Sí | Sí | Sí | No | No | No |
| 4.º ESO Opción A | Sí | Sí | Sí | Sí | Sí | Sí | No | No | No |
| 4.º ESO Opción B | Sí | Sí | Sí | Sí | Sí | Sí | No | No | No |
| 1.º Bach. Matemáticas I | Sí | Sí | No como selector ESO | No | Sí | Sí | No | No | No |
| 1.º Bach. CCSS I | Sí | Sí | No como selector ESO | No | Sí | Sí | No | No | No |
| 2.º Bach. Matemáticas II | Sí | Sí, orientados a PAU | No | No | No | No | Sí | Sí, 5 ejercicios | CLM/Madrid |
| 2.º Bach. CCSS II | Sí | Sí, orientados a PAU | No | No | No | No | Sí | Sí, 4 ejercicios | CLM/Madrid |

Todos los cursos incluyen índice y recursos asociados cuando están disponibles. Las infografías y explicaciones forman parte del recorrido de estudio, pero no constituyen una modalidad de evaluación independiente.

---

## 6. 2.º de Bachillerato y PAU

### 6.1 Selección de comunidad

El control de comunidad aparece en las tres entradas de 2.º Bachillerato: temas, bloques y examen completo. Los valores activos son:

- `clm`: Castilla-La Mancha;
- `madrid`: Comunidad de Madrid.

La preferencia se conserva en `localStorage`. Al cambiarla, la aplicación reconstruye el recorrido con el banco correspondiente y limpia el estado/historial necesario para evitar mezclar convocatorias.

### 6.2 Qué cambia según la comunidad

Cambia la fuente de ejercicios, sus metadatos oficiales, clasificación, presentación y modelo de simulacro. La selección no es meramente decorativa: las funciones que construyen preguntas, temas, bloques y examen tienen ramas distintas para CLM y Madrid.

### 6.3 Castilla-La Mancha

Los bancos de Matemáticas II y CCSS II incorporan material oficial por bloques y catálogos corregidos, junto con bancos completos de respuestas organizados por años, aproximadamente 2000–2026. El sistema intenta relacionar el ejercicio original con su versión revisada y respuesta completa. Cuando existen respuesta y distractores adecuados, el ejercicio abierto se convierte en interacción corregible; los elementos incompletos se excluyen mediante controles de disponibilidad.

En CCSS II existen además conexiones cuidadosamente seleccionadas con ejercicios de otros bancos para determinados temas, pero el sistema evita rellenar un tema con material ajeno de forma indiscriminada.

### 6.4 Madrid

Madrid utiliza `data/madrid-pau-bank.js` y `data/madrid-pau-authored.js`, además de activos visuales exportados de enunciados y soluciones. El segundo archivo completa, excluye o adapta ejercicios del banco base.

Algunos ejercicios se presentan como preguntas PAU abiertas. En esos casos el alumno consulta la resolución y marca el ejercicio como trabajado; no hay una corrección simbólica objetiva de su desarrollo. En el simulacro abierto, ese marcado cuenta como parte trabajada, por lo que la nota resultante no debe interpretarse como una calificación automática de exactitud matemática.

### 6.5 Bloques y temas

**Matemáticas II:**

- Álgebra: temas 1–3.
- Geometría: temas 4–6.
- Análisis: temas 7–12.
- Probabilidad y estadística: temas 13–14.

**CCSS II:**

- Álgebra: temas 1–4.
- Análisis: temas 5–8.
- Probabilidad: tema 9.
- Estadística: temas 10–11.

La práctica estricta selecciona solo ejercicios clasificados para el tema o bloque. Si el banco revisado se agota, la interfaz puede avisar de que no hay más preguntas distintas en vez de rellenar con otro tema.

### 6.6 Simulacros

- Matemáticas II construye cinco posiciones de examen.
- CCSS II construye cuatro.
- Se asignan aproximadamente diez minutos por ejercicio.
- El historial procura alternar familias y evitar repetir inmediatamente ejercicios ya vistos.
- El examen conserva fuente, año, convocatoria, ejercicio y apartados cuando esos metadatos existen.

### 6.7 Incorporación futura de comunidades

Hay una base reutilizable: preferencia normalizada, control de selección, catálogos por comunidad y constructores de tema/bloque/examen. Sin embargo, el código actual reconoce explícitamente solo `clm` y `madrid`. Añadir otra comunidad requiere:

1. incorporar y revisar su banco;
2. crear metadatos de temas, bloques, convocatoria y soluciones;
3. añadir su opción al catálogo de comunidades;
4. implementar o extender los adaptadores de selección y examen;
5. validar repetición, presentación y corrección.

No es todavía un sistema de complementos donde baste con cargar un archivo de datos.

---

## 7. Sistema de ejercicios

### 7.1 Ubicación

Los ejercicios se encuentran en dos grandes lugares:

- generadores y catálogos incluidos en `app.js` y módulos de examen;
- numerosos archivos JavaScript dentro de `data/` para bancos verificados, originales, controlados, Bachillerato, PAU, Madrid y entrenador.

Las infografías, PDFs y recursos visuales están en carpetas `Infografías ...`, `book-resources/` y activos asociados. Los ejercicios no se leen de una tabla de Supabase.

### 7.2 Clasificación

Los registros pueden contener:

- identificador propio y/o identidad de fuente oficial;
- curso;
- tema e índice;
- bloque;
- nivel o dificultad;
- enunciado textual o HTML matemático;
- opciones y posición correcta;
- apartados;
- solución y explicación;
- fuente, año, convocatoria y número de ejercicio;
- tablas o imágenes de referencia;
- indicadores de revisión, exclusión o disponibilidad.

ESO usa dificultades internas fácil/media/difícil y expone al alumno principalmente Aprendiz/Maestro. El entrenador usa niveles numéricos 1, 2 y 3. En Bachillerato pesa más la clasificación temática y la procedencia oficial.

### 7.3 Modalidades donde aparecen

- práctica por tema;
- reto de tema;
- aventura y jefe final;
- examen personalizado ESO/1.º Bachillerato;
- diagnóstico y sesiones del entrenador;
- práctica por tema o bloque PAU;
- simulacro PAU completo.

### 7.4 Selección y repetición

`strictTopicSelection` y funciones relacionadas filtran primero por curso y tema. Después aplican disponibilidad, validez, identidad y control de historial. La identidad puede derivarse de `exerciseId`, ID base, fuente oficial o combinación normalizada de enunciado y apartados.

El historial de preguntas mostradas y contestadas se guarda por alumno, curso y modalidad en `localStorage`. Mientras haya alternativas se evitan repeticiones. Al agotarse un banco, algunas modalidades reinician ronda o usan un fallback controlado; en las prácticas PAU estrictas puede mostrarse un aviso en lugar de traer preguntas de otro tema. Los simulacros de 2.º Bachillerato tienen además un historial propio por comunidad.

### 7.5 Corrección y soluciones

En preguntas de selección la corrección activa compara la opción elegida con el índice `correct`. En preguntas multipartes compara cada apartado. La solución almacenada se formatea y se muestra como ayuda/resolución. Los ejercicios abiertos de Madrid dependen de consulta de la resolución y marcado de trabajo, no de corrección algebraica automática.

---

## 8. Respuestas del alumno

| Forma de respuesta | Estado actual | Uso real |
|---|---|---|
| Selección de opción | Activa | Es la forma general de respuesta puntuada en retos, exámenes y apartados cerrados. |
| Selección por apartados | Activa | Cada parte de un ejercicio oficial puede tener sus opciones y corrección. |
| Botón «Ver resolución»/marcar trabajado | Activa | Para ejercicios PAU abiertos, especialmente Madrid; no valida el desarrollo. |
| Teclado para respuesta matemática libre | No generalizado | No se encontró un campo universal de respuesta algebraica que puntúe mediante teclado. El teclado se usa en acceso/formularios, no como entrada principal del reto. |
| Pizarra libre | Activa como apoyo | Canvas con tinta, borrador, deshacer/rehacer, selección, limpieza y ampliación. Sirve para desarrollar cálculos. |
| Reconocimiento manuscrito local | Integrado de forma controlada | Permite seleccionar una zona escrita y obtener un diagnóstico; actualmente no cambia nota ni progreso. |
| MyScript | Solo prueba controlada | Requiere modo desarrollo, bandera `MYSCRIPT_CONTROLLED_TEST` y Supabase configurado; llama a una función Edge. No es el corrector público general. |
| Revisión manual | Recomendación/confirmación local | Ante baja confianza o ambigüedad se recomienda revisar/confirmar; no existe una cola remota para que un profesor corrija. |

La función de reconocimiento rechaza actualmente cursos no ESO. En ESO, incluso una lectura reconocida se utiliza como diagnóstico y dispara estados/eventos, pero el código declara expresamente que no modifica puntos ni progreso.

---

## 9. Corrección y soluciones

### 9.1 Corrección que determina la puntuación

La puntuación normal se decide por selección:

- pregunta simple: `selectedIndex === question.correct`;
- pregunta con partes: comparación equivalente en cada parte;
- tiempo agotado: la pregunta se considera no acertada y se revela la solución;
- PAU abierta: el alumno marca que ha trabajado o visto la resolución, sin validación objetiva de su respuesta.

Por tanto, aunque el proyecto contiene un validador matemático avanzado, el recorrido puntuado dominante no envía una expresión libre a dicho validador.

### 9.2 Validador matemático existente

`math-answer-validator.js` implementa infraestructura para:

- normalizar signos menos, multiplicación, división, raíz, superíndices, coma decimal y fracciones LaTeX;
- comparar enteros, decimales, fracciones, escalares, raíces y potencias;
- operar con racionales exactos;
- convertir expresiones polinómicas a una representación canónica;
- comparar ecuaciones por estructura o por conjuntos proporcionales;
- aceptar una tolerancia cuando el llamador la proporciona;
- normalizar notación de matrices, sistemas, integrales, límites, vectores, probabilidad, letras griegas y trigonometría para el reconocimiento.

Los números y racionales se comparan de forma exacta salvo tolerancia explícita. El tratamiento polinómico tiene límites técnicos, como grado máximo, raíces perfectas y conjunto de operaciones soportado. Expresiones complejas, trigonométricas o de cálculo que exceden el analizador recurren principalmente a comparación estructural normalizada; no hay un sistema de álgebra computacional general.

### 9.3 Respuestas manuscritas

El flujo es:

1. el alumno escribe en la pizarra;
2. selecciona una región;
3. el proveedor intenta reconocer la expresión;
4. se calcula confianza y se compara con la respuesta esperada;
5. se clasifica como válida, ambigua, no disponible o error técnico;
6. con confianza inferior al umbral aproximado de 0,75 se fuerza el resultado ambiguo y se recomienda revisión.

Este resultado no interviene en la nota. La «revisión manual» actual es una decisión/confirmación del propio flujo de prueba, no un trabajo asignado a un profesor o owner.

### 9.4 Presentación de la solución

Después de responder:

- la opción elegida queda marcada;
- la opción correcta se destaca;
- aparece feedback de acierto o error;
- se habilita «Ver ayuda/soluciones paso a paso»;
- en ejercicios multipartes se muestra la resolución de cada apartado;
- al agotar el tiempo se revela la respuesta correcta;
- el resumen final recoge puntuación y, según la modalidad, las soluciones de errores o preguntas no completadas;
- en PAU abierta «Ver resolución» muestra el desarrollo disponible y permite marcar el apartado como trabajado.

La resolución se toma del campo `solution` o de políticas/constructores didácticos y se transforma con `math-renderer.js` y funciones de formato de `app.js`. La calidad y granularidad dependen del banco concreto: unas soluciones son desarrollos completos y otras texto resumido o material visual.

---

## 10. Gamificación y progreso

### 10.1 Retos ordinarios

- Cada acierto simple añade 100 puntos más un bono de racha (`racha × 20`).
- En ejercicios por partes se puntúa cada parte correcta.
- La racha aumenta con el acierto y se reinicia al fallar o agotar tiempo.
- El resultado concede medalla de oro si todo es correcto, plata desde el 70 % y bronce por debajo.
- Los informes locales alimentan recuentos de medallas, sesiones y mejores resultados.

### 10.2 Niveles de práctica

ESO ofrece **Aprendiz**, centrado en progresión del curso, y **Maestro**, con exigencia mayor y, según los generadores, contenidos cercanos al nivel superior. No es un nivel de cuenta global; es una modalidad de selección del reto.

### 10.3 Aventura

La aventura de ESO incluye:

- mundo y zonas con nombres propios por curso;
- temas desbloqueados y completados;
- fases Aprender, Entrenar y Jefe final;
- energía del alumno y vida del jefe;
- XP y monedas;
- aciertos, errores, tiempo total y mejor racha;
- jefes derrotados;
- títulos/logros;
- avatar personalizable (explorador, gato, búho o robot, con colores y detalles).

El entrenamiento se supera normalmente desde un 70 %. Las recompensas observadas incluyen 90 XP/18 monedas en entrenamiento y 160 XP/35 monedas al derrotar jefe, con reconocimientos adicionales por resultado perfecto. Este progreso se guarda en `localStorage`, no en Supabase.

### 10.4 Entrenador

Mantiene dominio por temas, días de racha y recomendaciones. Es una capa de progreso distinta de la aventura y también local.

No se han incluido aquí pagos, ligas sociales, rankings globales o recompensas canjeables porque no están implementados.

---

## 11. Entrenador personal IA

### 11.1 Cursos disponibles

Está disponible en los cinco cursos de ESO y en los dos itinerarios de 1.º Bachillerato. No se ofrece en 2.º Bachillerato.

### 11.2 Naturaleza real

Aunque la interfaz lo denomina «IA», el proveedor activo es un motor local determinista basado en reglas, prioridades, prerrequisitos y resultados. Existe una clase/proveedor futuro para IA remota, pero está desactivado sin un endpoint seguro. No se observó una llamada activa a un modelo generativo en el recorrido público.

### 11.3 Información utilizada

- curso y temas disponibles;
- diagnóstico inicial;
- aciertos y errores;
- intentos;
- pistas solicitadas;
- tiempo por actividad;
- sesiones anteriores;
- dominio calculado por tema;
- dependencias y prioridades entre temas.

### 11.4 Cálculo del nivel

El diagnóstico usa preguntas reales o generadas. De forma general:

- menos del 50 %: nivel inicial;
- de 50 a menos de 70 %: básico;
- de 70 a menos de 85 %: medio;
- desde 85 %: avanzado.

Un tema se considera dominado a partir de aproximadamente 85 % y al menos dos sesiones; por debajo de 70 % pasa a prioridad de mejora; entre 70 y 84 % queda en revisión/consolidación.

### 11.5 Selección de ejercicios y sesiones

Recomienda dificultad 1 cuando hay prioridades, 3 cuando existen varios temas dominados y 2 en el resto. Las sesiones pueden configurarse a 10, 15, 20 o 30 minutos y reparten trabajo, de manera orientativa, entre mejora, consolidación y repaso. La selección respeta curso/tema y utiliza historial para limitar repetición.

### 11.6 Registro posterior

Guarda localmente perfil, diagnóstico, sesiones de estudio, resultados, respuesta del alumno, respuesta correcta, acierto, intentos, pistas, tiempo, tipo de error y recomendación siguiente. No sincroniza ese expediente con Supabase en el estado analizado.

---

## 12. Diseño actual +MathUp

### 12.1 Identidad

- Nombre visible: **+MathUp**.
- Título/lema: **Aula de retos, estudio y aventuras**.
- Marca cuadrada con esquinas redondeadas: `assets/mathup-mark.png` y variantes 192/512/ICO.
- Recurso horizontal/cabecera: activos `mathup-header` donde se utilizan.
- Todavía quedan nombres internos «Margarita Salas» en variables, claves de almacenamiento, nombres de módulos, comentarios, README y repositorio. No todos son visibles al alumno.

### 12.2 Paleta y estilo

La identidad usa:

- azul marino profundo, con `#102353` como color de tema PWA;
- azules vivos para acciones principales;
- verde/turquesa para progreso y datos positivos;
- dorado para recompensas/facturación;
- fondos blancos y azul hielo;
- rejilla matemática tenue en el fondo;
- gradientes, sombras amplias y tarjetas con esquinas muy redondeadas.

Los botones se organizan en primarios azules, secundarios azul marino y variantes claras/ghost. Las tarjetas de entrada, tema, estadísticas y administración comparten bordes suaves, números/insignias y jerarquía tipográfica grande.

### 12.3 Tipografía y componentes

La tipografía general es `Inter`, con alternativas `Segoe UI`, Arial y sans-serif. Determinados elementos didácticos usan `Atkinson Hyperlegible`; algunas presentaciones matemáticas/formales usan Georgia/Times. Los principales componentes son:

- cabecera y shell escalable;
- tarjetas de modalidad;
- paneles de curso y tema;
- tarjetas de reto y pregunta;
- botones y badges;
- barras de progreso;
- modales de recursos, pódcast y soluciones;
- mapa de aventura y avatar;
- pantalla de acceso dividida;
- bloques numerados de administración;
- paneles y tablas de entrenador.

### 12.4 Responsive

Hay reglas `@media` para anchuras aproximadas de 980, 900, 620 y 560 px y ajustes de cuadrículas a una columna. `fitStudentScreen` y el shell escalan el escenario cuando la altura disponible es reducida. `mathup-brand.css` alinea las áreas principales con la cabecera y da tratamiento específico a reto por bloques y examen de 2.º Bachillerato. Aun así, por el tamaño y complejidad de algunos enunciados, PDFs/tablas y paneles, la experiencia móvil requiere pruebas reales por dispositivo.

### 12.5 Archivos principales de diseño

`styles.css`, `mathup-brand.css`, `public-auth.css`, `developer-mode.css`, `coach.css`, `handwriting-board.css`, `myscript-evaluation.css`, `math-notation.css`, `topic-illustrations.css` y las funciones de marcado HTML de `app.js`, `coach-ui.js` y `developer-mode.js`.

---

## 13. Datos y backend

### 13.1 Supabase

Supabase aporta:

- autenticación de correo/contraseña y Google;
- sesión e identidad UUID;
- perfil y matrícula;
- catálogo de centros y localidades postales;
- consentimiento de tutor;
- sesión única y latidos;
- roles administrativos y MFA;
- sesiones de uso y errores técnicos;
- consultas server-side del panel owner;
- función Edge para reconocimiento MyScript.

### 13.2 Tablas principales

- `centers`: centros educativos y localización.
- `postal_locations`: relación código postal/municipio/provincia.
- `profiles`: nombre visible, franja de edad, idioma, demo e incorporación.
- `enrollments`: año, curso, grupo, centro, localización, vigencia y facturación.
- `guardian_consents`: consentimiento para menores.
- `learning_attempts`: tabla preparada para intentos académicos.
- `student_progress`: JSON de progreso por ámbito.
- `platform_admins`: owner/developer/support y requisito MFA.
- `app_sessions`: sesión activa por cuenta.
- `app_usage_sessions`: sesiones y duración para analítica, añadida por migración.
- `app_error_reports`: errores de aplicación.
- `admin_audit_log`: registro de operaciones administrativas.

Todas las tablas sensibles usan RLS. Las consultas administrativas se realizan mediante funciones protegidas, no con acceso general del navegador.

### 13.3 Funciones server-side

- `claim_app_session`, `heartbeat_app_session`, `release_app_session`.
- `get_my_admin_role` y `require_admin_access`.
- `admin_dashboard_stats`.
- `admin_dashboard_explorer` en las migraciones más recientes.
- `report_app_error`.
- Edge Function `recognize-math` para mantener credenciales del proveedor fuera del navegador.

La migración MFA envuelve las estadísticas para exigir `aal2`. La migración de permisos restaura `EXECUTE` para el rol `authenticated` en las RPC de sesión.

### 13.4 Datos que siguen en archivos o navegador

- catálogo de cursos y navegación: JavaScript local;
- ejercicios y soluciones: `data/*.js`, `app.js` y módulos de examen;
- infografías, PDFs e imágenes: archivos estáticos;
- resultados ordinarios: `localStorage`;
- aventura y avatar: `localStorage`;
- entrenador: `localStorage`;
- historial antirrepetición: `localStorage`;
- preferencia PAU: `localStorage`;
- configuración pública de cliente: `config.public.js` y configuración local excluida.

No se incluyen en este informe claves, tokens, secretos ni valores de credenciales.

---

## 14. Publicación actual

### 14.1 Sistema de despliegue

`.github/workflows/deploy-pages.yml` publica un sitio estático en GitHub Pages. El workflow:

1. se activa al hacer push a `agent/indice-pruebas-y-autenticacion` o manualmente;
2. descarga el repositorio;
3. copia el sitio a `_site`;
4. excluye Git, herramientas internas, documentación, scripts, Supabase, archivos locales y configuración privada;
5. añade `.nojekyll`;
6. sube el artefacto y lo publica mediante `actions/deploy-pages`.

No hay compilación ni bundle: los archivos desplegados son los JavaScript, CSS, HTML y recursos estáticos del repositorio.

### 14.2 Estado público comprobado

En la comprobación del 24/08/2026:

- `https://lafamiliacarinosaherrerafernan-code.github.io/mathup/` respondió HTTP 200 y mostró el título +MathUp.
- La ruta derivada del nombre del remoto local, `/app-margarita-salas/`, respondió 404; el nombre público efectivo parece ser `mathup` aunque el remoto local aún conserve el nombre antiguo y GitHub pueda mantener redirecciones internas.

### 14.3 `mathup.es`

El DNS raíz de `mathup.es` resolvía a:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Son las direcciones habituales de GitHub Pages. Sin embargo:

- no existe `CNAME` en el árbol local;
- `www.mathup.es` no devolvía un CNAME en la consulta realizada;
- HTTPS en `mathup.es` fallaba por relación de confianza/certificado;
- HTTP devolvía 404.

Por tanto, el dominio estaba comprado y dirigido a GitHub, pero no podía considerarse todavía enlazado y servido correctamente por el proyecto Pages. El estado del panel externo de GitHub no puede deducirse por completo del repositorio.

### 14.4 PWA e instalación

Existen `manifest.webmanifest`, iconos, `pwa.js` y `service-worker.js`. El manifest configura nombre +MathUp, modo `standalone`, ámbito relativo e iconos. El botón de instalación depende de `beforeinstallprompt`, habitual en Chrome/Edge. El service worker usa estrategia de red con fallback a caché para peticiones GET del mismo origen.

Estos archivos están sin seguimiento en Git; por tanto, no forman parte del último commit publicado salvo que se hayan subido por otro mecanismo no visible. La aplicación no está publicada en Microsoft Store. En Safari puede usarse la web y la opción propia de añadir a inicio cuando sea compatible, pero no el mismo evento de instalación de Chromium.

---

## 15. Funciones experimentales o incompletas

1. **MyScript:** integrado mediante proveedor y Edge Function, pero condicionado a modo desarrollo y prueba controlada; no puntúa al alumno.
2. **Reconocimiento manuscrito:** interfaz y diagnóstico presentes; restringido a ESO y sin efecto en puntos/progreso.
3. **Validador de expresiones:** técnicamente avanzado, pero no conectado como mecanismo general de respuesta libre puntuada.
4. **Revisión manual:** solo recomendación/confirmación local; no existe cola de corrección del profesor.
5. **IA remota del entrenador:** proveedor futuro presente pero desactivado; el motor actual es por reglas.
6. **Persistencia Supabase de aprendizaje:** tablas y estadísticas preparadas, pero retos, aventura y entrenador siguen almacenando principalmente en el navegador.
7. **Facturación:** campos, tarjetas y cálculos preparatorios; cobros, exportación y proveedor desactivados.
8. **Gestión administrativa real:** panel de consulta y prueba, sin CRUD de alumnos, grupos, cursos, ejercicios o resultados.
9. **PAU abierta de Madrid:** resolución y marcado como trabajado; no corrección matemática automática fiable.
10. **Nuevas comunidades PAU:** patrón parcialmente preparado, pero cada alta requiere código y bancos revisados.
11. **PWA/instalación:** archivos existentes pero sin seguimiento en Git; publicación efectiva de esa versión no garantizada.
12. **Dominio personalizado:** DNS dirigido a GitHub, asociación Pages/SSL incompleta en la comprobación.
13. **Microsoft Store:** pendiente, sin paquete ni publicación observada.
14. **Recursos locales:** algunas rutas históricas a documentos/recursos pueden depender del entorno local y requieren validación de portabilidad en la publicación.
15. **Panel de profesor heredado:** útil con datos locales/ficticios, pero no constituye gestión de producción.

---

## 16. Estado de Git

### 16.1 Rama y commit

- Rama actual: `agent/indice-pruebas-y-autenticacion`.
- Seguimiento: `origin/agent/indice-pruebas-y-autenticacion`.
- Último commit local: `28b47c1 Prepara publicación pública de +MathUp`.
- La rama `main` permanece en `6f50953 Initial secure application snapshot` y sigue `origin/main`.

### 16.2 Limpieza del repositorio

El repositorio **no está limpio**.

Modificados sin commit:

- `app.js`
- `developer-mode.css`
- `developer-mode.js`
- `index.html`
- `launch_app.ps1`
- `public-auth.css`
- `public-auth.js`
- `supabase-client.js`
- `supabase/schema.sql`

Sin seguimiento:

- `_diag_claim.png`, `_diag_claim.ps1`
- iconos `assets/mathup-mark-*`
- `assets/supabase-2.57.4.min.js`
- `manifest.webmanifest`
- `pwa.js`
- `serve_app_http.ps1`
- `service-worker.js`
- migraciones owner analytics, filtros, MFA y permisos de sesión del 20/08/2026.

### 16.3 Tags

- `estado-completo-antes-fase-3`
- `myscript-fase-2d-estable`

### 16.4 Sincronización local/remoto

El commit apuntado por la rama coincide con su rama remota según `git branch -vv`, pero el directorio de trabajo contiene cambios y archivos nuevos importantes. Por ello:

- **sí** están sincronizados los punteros al commit `28b47c1`;
- **no** está sincronizado el estado funcional completo que se ejecuta localmente;
- no puede suponerse que owner, MFA, estadísticas filtradas, PWA e iconos locales estén en producción.

El remoto configurado conserva la URL `lafamiliacarinosaherrerafernan-code/app-margarita-salas.git`, un nombre anterior a la identidad actual.

---

## 17. Cambios recientes importantes

Según el historial y el estado sin commit:

1. **Cambio de identidad:** transición visible de Aula Matemática Margarita Salas a +MathUp, nuevo nombre, lema e iconos. Persisten nombres técnicos heredados.
2. **Nueva identidad visual:** overrides en `mathup-brand.css`, cabecera y alineación de paneles, nueva paleta y pantallas públicas/owner.
3. **Acceso público:** incorporación de Supabase Auth, registro académico, centros, privacidad, Google y correo/contraseña.
4. **Sesión única:** RPC de reclamación, heartbeat y liberación; corrección posterior de permisos para `authenticated`.
5. **Administración owner:** panel privado con perfil alumno, estadísticas y preparación de pagos.
6. **MFA owner:** TOTP con QR y exigencia server-side de `aal2` para administración.
7. **Analítica:** sesiones de uso, filtros por persona/curso/geografía/periodo y errores técnicos.
8. **Facturación futura:** modalidades de matrícula y visualización preparatoria sin cobros activos.
9. **PAU Madrid:** banco, material elaborado, activos visuales y adaptación junto a Castilla-La Mancha.
10. **Selección CLM/Madrid:** preferencia y reconstrucción de temas, bloques y simulacros según comunidad.
11. **Bancos y repetición:** ampliación de bancos, conexión de originales revisados y lógica estricta para reducir duplicados.
12. **Reconocimiento manuscrito:** pizarra unificada, proveedor, evaluación y piloto MyScript Fase 2D, todavía controlado.
13. **Publicación:** workflow de GitHub Pages y preparación del sitio público.
14. **PWA:** manifest, iconos, service worker e instalación, aún sin commit.
15. **Dominio:** compra/configuración DNS de `mathup.es`, todavía sin asociación final verificable en Pages/SSL.

Los commits recientes visibles son, de más nuevo a más antiguo: preparación pública de +MathUp, cierre del piloto público y PAU Madrid, integración de PAU Madrid, punto de estado antes de Fase 3, cierre estable de MyScript Fase 2D y ampliación/conexión de bancos de ejercicios.

---

## 18. Mapa final de la aplicación

```text
+MathUp
├── Acceso público
│   ├── Correo y contraseña
│   ├── Google
│   ├── Registro académico y centro
│   └── Sesión única por cuenta
├── Alumno autenticado
│   └── Curso de su matrícula vigente (sin selector de otros cursos)
├── ESO
│   ├── 1.º ESO
│   ├── 2.º ESO
│   ├── 3.º ESO
│   ├── 4.º ESO Opción A
│   ├── 4.º ESO Opción B
│   └── En cada curso
│       ├── Temas, estudio y retos
│       ├── Nivel Aprendiz / Maestro
│       ├── Aventura matemática
│       ├── Entrenador personal por reglas
│       └── Examen personalizado
├── 1.º Bachillerato
│   ├── Matemáticas I
│   ├── CCSS I
│   └── En cada curso
│       ├── Temas, estudio y retos
│       ├── Entrenador personal por reglas
│       └── Examen personalizado
├── 2.º Bachillerato
│   ├── Matemáticas II
│   ├── CCSS II
│   └── En cada curso
│       ├── Selector PAU: Castilla-La Mancha / Madrid
│       ├── Temas y retos PAU
│       ├── Bloques y retos
│       └── Simulacro PAU completo
├── Herramientas transversales
│   ├── Corrección por selección
│   ├── Soluciones paso a paso
│   ├── Pizarra matemática
│   ├── Reconocimiento manuscrito controlado
│   ├── Informes y progreso locales
│   └── Recursos, infografías y pódcast
├── Administración owner (MFA)
│   ├── Recorrido ficticio por todos los cursos
│   ├── Índices completos
│   ├── Estadísticas y filtros
│   ├── Uso, sesiones y errores
│   └── Facturación futura (sin cobros)
├── Desarrollo local
│   ├── Recorridos de prueba
│   ├── Panel de profesor heredado
│   └── Comprobaciones de Supabase
└── Backend y publicación
    ├── Supabase Auth, perfiles, matrículas, sesiones y analítica
    ├── Bancos/soluciones en archivos JavaScript
    ├── Progreso académico principal en localStorage
    └── GitHub Pages; mathup.es aún no asociado correctamente
```

---

## 19. Archivos clave

### Interfaz, estructura y navegación

- `index.html`: entrada, orden de carga, metadatos y contenedor principal.
- `app.js`: cursos, estado, navegación, pantallas, retos, aventura, resultados, recursos y gran parte de la lógica.
- `coach-ui.js`: portadas por etapa y experiencia visual del entrenador.
- `first-bach-exam.js`: exámenes personalizados de 1.º Bachillerato.
- `eso-exam.js`: exámenes personalizados de ESO.
- `bach-exam.js`: simulacros y lógica específica de 2.º Bachillerato.

### Cursos y bancos de ejercicios

- `data/`: bancos por curso, tema, revisión, PAU y entrenador.
- `data/bach-ii-block-exercises.js` y archivos equivalentes/catálogos de 2.º Bachillerato.
- `data/bach-ii-complete-answer-bank-*.js`: respuestas PAU CLM por años.
- `data/madrid-pau-bank.js`: banco base de Madrid.
- `data/madrid-pau-authored.js`: completado y adaptación de Madrid.
- `data/content-availability.js`: disponibilidad/exclusión de contenido.
- `book-resources/` e `Infografías .../`: materiales estáticos.

### Corrección, notación y soluciones

- `math-answer-validator.js`: equivalencia y validación matemática.
- `math-renderer.js`: presentación matemática.
- `math-notation.css`: estilos de notación.
- `app.js`: corrección efectiva por opción y presentación de soluciones.
- `bach-exam.js`, `first-bach-exam.js`, `eso-exam.js`: corrección de exámenes.

### Entrenador y gamificación

- `coach-services.js`: motor de diagnóstico, nivel, prioridades, selección y persistencia.
- `coach-ui.js`: interfaz del entrenador y accesos por etapa.
- `coach.css`: diseño.
- `data/coach-question-bank.js`: banco asociado.
- `app.js`: puntuación, rachas, medallas, aventura y avatar.

### Acceso y Supabase

- `public-auth.js`: pantallas y flujo público de acceso/registro/MFA.
- `public-auth.css`: diseño del acceso.
- `supabase-client.js`: cliente, Auth, perfil, matrícula, sesiones, errores y RPC administrativas.
- `supabase/schema.sql`: modelo base, RLS y funciones.
- `supabase/migrations/20260819_public_pilot_access.sql`: acceso piloto.
- `supabase/migrations/20260820_restore_session_rpc_permissions.sql`: permisos de sesión.
- `supabase/migrations/20260820_owner_mfa.sql`: MFA owner.
- `supabase/migrations/20260820_owner_dashboard_analytics.sql`: analítica owner.
- `supabase/migrations/20260820_owner_dashboard_filters.sql`: explorador y filtros.

### Administración y estadísticas

- `developer-mode.js`: panel owner, filtros, perfil ficticio y panel local de desarrollo.
- `developer-mode.css`: diseño del panel.
- `app.js`: informes locales y panel de profesor heredado.
- `supabase-client.js`: acceso a estadísticas/errores remotos.
- migraciones owner citadas arriba: fuentes server-side.

### Reconocimiento manuscrito

- `handwriting-board.js` y `handwriting-board.css`: pizarra.
- `handwriting-ink.js`: modelo de tinta.
- `handwriting-recognition.js`: coordinación del reconocimiento.
- `myscript-recognition-provider.js`: proveedor MyScript.
- `myscript-evaluation.js` y `myscript-evaluation.css`: evaluación controlada.
- `supabase/functions/recognize-math/index.ts`: proxy server-side.
- `scripts/audit_*handwriting*` y `scripts/audit_myscript_*`: auditorías técnicas.
- `docs/RESULTADO-FINAL-PILOTO-MYSCRIPT-FASE-2D.md`: resultado previo del piloto.

### Diseño +MathUp y publicación

- `styles.css`: sistema visual principal y responsive.
- `mathup-brand.css`: capa final de identidad +MathUp y alineación.
- `topic-illustrations.css`: ilustraciones de temas.
- `assets/mathup-mark.png`, `assets/mathup-mark-192.png`, `assets/mathup-mark-512.png`, `assets/mathup-mark.ico`: marca/iconos.
- `manifest.webmanifest`, `pwa.js`, `service-worker.js`: PWA e instalación.
- `.github/workflows/deploy-pages.yml`: publicación GitHub Pages.
- `config.public.js`: configuración pública del cliente; no debe confundirse con secretos locales.

---

## Aspectos que no pueden afirmarse con certeza absoluta desde el repositorio

- El contenido exacto actualmente activo en la base Supabase, porque la auditoría no leyó datos personales ni administrativos del proyecto remoto.
- Qué migraciones sin commit se han ejecutado ya en producción; los archivos locales muestran la intención y el código, pero no prueban el historial remoto de la base.
- Qué versión exacta del directorio de trabajo se ha publicado, dado que hay cambios importantes sin commit.
- El ajuste actual del dominio personalizado dentro de la interfaz web de GitHub Pages. La comprobación externa sí demuestra que `mathup.es` aún no servía correctamente la aplicación en esa fecha.
- La cobertura y calidad didáctica individual de cada uno de los cientos de ejercicios; se auditó la arquitectura, clasificación y conexión, no se resolvió manualmente todo el banco.
- El comportamiento visual en todos los modelos de móvil/tableta y todas las versiones de Safari, porque no se realizó una matriz completa de pruebas físicas.

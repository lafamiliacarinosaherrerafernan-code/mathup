# Plan canónico de enunciados, soluciones y catálogo de +MathUp

**Tipo de documento:** auditoría técnica y diseño, solo lectura sobre la aplicación.  
**Fecha:** 24 de agosto de 2026.  
**Alcance:** fuentes de ejercicios, publicación, validación, notación matemática, soluciones, opciones, selección y futura migración.  
**Fuera de alcance:** implementar cambios, modificar bancos o renderizadores, ejecutar migraciones, cambiar Supabase, invocar Mathpix u otros proveedores y alterar las skills.

## 1. Estado actual real

+MathUp es hoy una aplicación web estática/PWA formada por scripts globales cargados en un orden estricto desde `index.html`. No existe un paquete de catálogo único: el resultado visible se compone al ejecutar `app.js`, 127 archivos JavaScript de `data/` y otros módulos cargados por 147 etiquetas `script`.

El flujo real es:

1. El navegador descarga los scripts publicados.
2. Cada archivo crea o amplía objetos globales, bancos, respuestas y parches.
3. El orden de carga decide qué versión y qué ampliaciones terminan activas.
4. `buildQuestions`, `MargaritaBachExam` y los módulos de examen seleccionan y transforman candidatos.
5. Los filtros de curso, tema, modalidad, convocatoria, coherencia, historial y no repetición descartan parte de los candidatos.
6. El renderizador convierte varias notaciones heredadas a HTML/MathML para mostrarlas.

La PWA utiliza un *service worker* de tipo *network first*: guarda respuestas HTTP del mismo origen y recurre a ellas si falla la red. Esta caché no es un catálogo editorial ni una fuente autónoma de ejercicios. Puede servir una versión anterior cuando no hay red; los parámetros de versión de los recursos reducen, pero no eliminan, ese riesgo.

El despliegue público de GitHub Pages procede de archivos confirmados en la rama configurada. `config.local.js` se carga en desarrollo después de `config.public.js`, está ignorado y se excluye del despliegue. Por tanto, desarrollo y público pueden diferir en banderas de prueba o proveedor, aunque el contenido publicado deriva de los mismos archivos confirmados.

## 2. Fuentes actuales de ejercicios

### 2.1. Fuentes de ejecución

Las fuentes que consume realmente el alumnado son:

- bancos literales dentro de `app.js` (`exerciseBanks` y bancos PAU heredados);
- bancos y constructores de `data/*.js`;
- inventarios oficiales, bancos de respuestas y parches por años;
- bancos controlados por curso, tema, nivel y modalidad;
- generadores procedurales ejecutados en el navegador;
- adaptaciones realizadas en tiempo de ejecución: clasificación, expansión de apartados, completado mediante banco de respuestas, rotación de opciones y deduplicación;
- imágenes y otros recursos estáticos referenciados desde los ejercicios.

Los PDF, DOCX, imágenes originales y resultados editoriales son fuentes de procedencia y verificación, pero no son consultados directamente por la aplicación para construir cada sesión.

### 2.2. Almacenamiento del navegador

`localStorage` guarda progreso de juego, informes, preferencias PAU, historial de preguntas, historial de exámenes, entrenador y estado de pruebas de reconocimiento. `sessionStorage` conserva datos efímeros de sesión, acceso y MFA. Ninguno constituye el catálogo de ejercicios.

La caché del navegador contiene copias de recursos HTTP ya publicados. Tampoco crea ni fusiona ejercicios.

### 2.3. Fuente real de verdad

La fuente real de verdad de ejecución es actualmente **la composición de JavaScript versionado en Git, el orden de carga de `index.html` y las reglas de selección en tiempo de ejecución**. No es un archivo, tabla ni esquema único.

Existe además una verdad editorial repartida entre fuentes oficiales, documentos reconstruidos, imágenes y las dos skills. Esa verdad editorial no está unida de forma verificable uno a uno con el catálogo ejecutable.

Por ello se distinguen tres estados que hoy pueden no coincidir:

- **incorporado al repositorio:** aparece en algún banco, inventario, parche o activo;
- **cargado en el navegador:** el script que lo declara forma parte de `index.html` y no queda sustituido;
- **alcanzable por el alumnado:** supera todos los filtros y algún selector de una modalidad puede devolverlo.

## 3. Papel actual y futuro de Supabase

### 3.1. Papel actual comprobado

El esquema local de Supabase contiene identidad y operación de la plataforma: centros, localidades, perfiles, matrículas, consentimientos, intentos de aprendizaje, progreso, administradores, errores, auditoría administrativa, sesiones de uso y analítica. El cliente consulta perfiles, matrículas, centros, geografía y RPC de sesión, MFA, administración, estadísticas y errores.

No se ha encontrado en `supabase-client.js`, en `supabase/schema.sql` ni en las migraciones versionadas ninguna tabla, vista, RPC o consulta de catálogo de ejercicios. La aplicación no descarga ejercicios desde Supabase. Si existieran registros de contenido creados manualmente fuera del esquema versionado, el cliente actual no los consumiría y serían, a efectos de la aplicación, contenido no utilizado.

### 3.2. Papel recomendado

Supabase debe convertirse en la **única fuente de verdad del catálogo publicado**, no en la única custodia de los originales. Se recomienda separar:

- originales inmutables y pruebas de procedencia en almacenamiento de objetos;
- revisiones editoriales estructuradas en la base de datos;
- una instantánea publicada, inmutable y versionada, como única entrada de contenido para la aplicación;
- caché PWA de esa instantánea para continuidad y trabajo sin conexión.

El flujo objetivo es:

`importar → normalizar → validar → revisar → aprobar → publicar en Supabase → consumir en +MathUp`.

La aplicación no debería mezclar después del cambio una instantánea de Supabase con bancos heredados embebidos, porque reaparecerían duplicados y discrepancias. El repositorio conservaría esquema, migraciones, importadores, validadores y pruebas; el catálogo vivo publicado residiría en Supabase.

## 4. Papel de las dos skills

### 4.1. Skill de enunciados

`skill-editor-enunciados` es una política editorial externa para recopilar exámenes oficiales en Word: obliga a conservar literalidad, figuras y tablas, convertir la notación a ecuaciones nativas de Word y controlar la clasificación y la calidad. El PDF original es su fuente de verdad.

No forma parte del código de ejecución, no es invocada por los selectores y no deja actualmente una evidencia obligatoria dentro de cada ejercicio publicado. Por tanto, su mera existencia no garantiza que todos los bancos actuales la hayan seguido.

### 4.2. Skill de soluciones

`solucion-de-ejercicios` define un proceso didáctico: conservar el enunciado, resolver de manera independiente, comprobar el resultado, adaptar el método al curso y generar cuatro opciones coherentes con una única respuesta válida cuando procede.

Tampoco es una dependencia de ejecución ni una puerta automática de publicación. La aplicación no puede demostrar hoy que cada solución haya sido creada o revisada con esa política.

### 4.3. Integración futura recomendada

Las skills deben seguir siendo políticas de autoría y revisión, no código ejecutado en el dispositivo del alumno. Cada revisión debería registrar:

- identificador y versión de la política aplicada;
- responsable y fecha de revisión;
- lista de comprobaciones editoriales, matemáticas, didácticas y visuales;
- incidencias y resolución;
- hash de la fuente original usada.

El validador implementará los controles automatizables; lo que requiera juicio humano quedará como revisión firmada. No debe afirmarse que una skill garantiza calidad si no existe esta trazabilidad.

## 5. Problemas detectados

### 5.1. Críticos

1. **No existe un catálogo canónico ni una publicación atómica.** El orden de scripts, parches y constructores forma el producto final.
2. **No puede garantizarse que todos los ejercicios incorporados sean accesibles.** Los filtros y rutas de selección pueden dejar bancos u objetos sin ninguna ruta visible.
3. **No hay correspondencia comprobable fuente → revisión → publicación → selector.** Un original puede estar archivado sin llegar a ejecución, y un objeto ejecutable puede no tener una revisión completa vinculada.

### 5.2. Altos

1. Coexisten bancos en `app.js`, módulos independientes, inventarios, respuestas, parches y generadores.
2. Hay soluciones heredadas que son instrucciones genéricas o incompletas. El filtro detecta solo algunas formas de «Solución guiada» y el sistema puede fabricar una ayuda mínima a partir de la opción correcta.
3. La validación de opciones comprueba diferencia textual, no equivalencia matemática. Expresiones como `1/2`, `0,5` y `2/4` pueden ser alternativas equivalentes.
4. El orden de respuestas se rota en varias rutas, pero el método no es un contrato único, estable y persistido por intento. En algunos módulos se barajan temas con `Math.random`, mientras las opciones dependen de transformaciones previas.
5. Coexisten notaciones matemáticas incompatibles y transformaciones heurísticas.
6. Existen banderas de revisión (`solutionNeedsReview`), contenidos deliberadamente no elegibles y restos de codificación o enunciados heredados abreviados.

### 5.3. Medios

1. Las reglas de disponibilidad son específicas y dispersas; por ejemplo, ciertos contenidos de CCSS II se permiten en práctica pero no en examen.
2. La deduplicación usa identidad, texto normalizado o estructura según la ruta; no hay huella semántica universal.
3. Desarrollo y público pueden divergir por configuración local y por caché.
4. Los campos no están normalizados entre pregunta simple, ejercicio multipartes, PAU abierto y contenido generado.
5. El código mantiene muchas respuestas correctas inicialmente en la posición cero; sin una transformación obligatoria y verificable, esto puede filtrar un patrón.

## 6. Esquema canónico propuesto

Se propone un modelo relacional con revisiones inmutables y contenido estructurado.

### 6.1. Taxonomía

- `courses`: código, etapa, curso, itinerario y vigencia.
- `subjects`: Matemáticas, Matemáticas A/B, Matemáticas I/II, CCSS I/II.
- `topics`: tema canónico, orden y prerrequisitos.
- `blocks`: agrupaciones curriculares y bloques PAU.
- `communities`: comunidad autónoma y versión normativa.
- `modalities`: práctica, aventura, reto, examen por temas, examen por bloques, simulacro PAU y futuras modalidades.
- `exercise_classifications`: relación muchos-a-muchos entre revisión, curso, asignatura, tema y bloque, con confianza y revisión humana.

Un mismo ejercicio puede pertenecer a varias clasificaciones sin copiar físicamente su enunciado.

### 6.2. Procedencia

- `sources`: organismo, convocatoria, año, comunidad, URL, licencia/uso, hash y activo original.
- `source_locations`: página, ejercicio, opción, apartado, recorte, coordenadas y observaciones.
- `assets`: objeto, hash, MIME, dimensiones, texto alternativo, procedencia y estado de revisión.

### 6.3. Ejercicio y revisión

- `exercises`: UUID estable, clave canónica, familia de plantilla, fecha de creación y estado de retirada.
- `exercise_revisions`: UUID de revisión, ejercicio, número de revisión, versión del esquema, estado, título, dificultad, curso, autor, revisores, procedencia, huellas, configuración del generador, semilla admitida, fechas y motivo de cambio.
- `exercise_parts`: identificador estable del apartado, orden, puntuación y requisitos.
- `content_blocks`: documento estructurado de enunciado por bloques de párrafo, lista, matemática, tabla, figura, cita o aviso.
- `exercise_modalities`: elegibilidad explícita por modalidad, límites, motivo de exclusión y política aplicable.

Campos mínimos de una revisión:

- `id`, `exercise_id`, `revision_number`, `schema_version`;
- etapa, curso, asignatura, tema(s), bloque(s), dificultad;
- comunidad, año, convocatoria, opción y modalidad curricular;
- documento, página, número de ejercicio/apartado y hash de fuente;
- autor, revisores y versiones de políticas;
- estado editorial y marcas de revisión;
- enunciado estructurado, imágenes y recursos;
- solución estructurada y respuesta final tipada;
- opciones por identificador y opción correcta por identificador;
- configuración/semilla del generador si procede;
- huella textual, estructural y semántica;
- fechas de creación, revisión, aprobación, publicación y retirada.

### 6.4. Calidad y publicación

- `validation_runs` y `validation_findings`: versión del validador, severidad, regla, ruta del campo, evidencia y resolución.
- `reviews`: tipo de revisión, responsable, política, decisión y firma temporal.
- `catalog_snapshots`: versión publicada, fecha, responsable, hash global y compatibilidad mínima de la aplicación.
- `catalog_snapshot_items`: revisión exacta incluida y sus elegibilidades.
- `publication_events`: auditoría de alta, retirada y reversión.

Las revisiones publicadas nunca se editan. Una corrección crea otra revisión.

## 7. Estados de los ejercicios

Flujo obligatorio:

`DRAFT → REVIEW → APPROVED → PUBLISHED`

`REJECTED` puede alcanzarse desde `DRAFT` o `REVIEW`. Una revisión rechazada conserva la evidencia y no se borra. Un cambio sobre una revisión aprobada o publicada crea una nueva revisión `DRAFT`.

Reglas:

- `DRAFT`: editable, invisible para alumnado.
- `REVIEW`: congelado para revisión; cualquier corrección devuelve a `DRAFT` o crea iteración controlada.
- `APPROVED`: validación sin bloqueos y revisiones requeridas firmadas; aún no visible.
- `PUBLISHED`: incluido en una instantánea atómica; inmutable y visible solo en modalidades autorizadas.
- `REJECTED`: no publicable; conserva razón, hallazgos y procedencia.

La aplicación de alumnado solo recibe `PUBLISHED`. Nunca debe consultar borradores ni decidir en el cliente que un ejercicio defectuoso «puede pasar».

## 8. Diseño de `validateExercise`

`validateExercise(revision, context)` debe ser determinista, versionado y devolver un informe estructurado con `blockers`, `warnings`, `info`, artefactos normalizados y elegibilidad por modalidad. No debe corregir silenciosamente el original.

### 8.1. Controles estructurales

- esquema, tipos, UUID, revisión y referencias de taxonomía válidas;
- curso, asignatura, temas, bloques y modalidad coherentes;
- procedencia completa para material oficial;
- enunciado y apartados no vacíos;
- orden y puntuaciones consistentes;
- ausencia de rutas locales, marcadores provisionales, texto de diagnóstico y HTML inseguro;
- activos existentes, hash correcto, dimensiones y texto alternativo;
- ausencia de caracteres de codificación sospechosos y residuos OCR.

### 8.2. Controles matemáticos

- parseo correcto de cada nodo matemático;
- símbolos permitidos y balance de delimitadores;
- render de prueba en los tamaños objetivo;
- respuesta final compatible con el enunciado y la solución;
- comprobación numérica o simbólica cuando sea posible;
- unidades, dominio, aproximación y tolerancia explícitos;
- consistencia entre apartados.

### 8.3. Opciones tipo test

- exactamente cuatro opciones cuando la modalidad lo exija;
- identificadores inmutables, textos no vacíos y una única opción correcta por ID;
- diferencia textual normalizada;
- equivalencia semántica: números racionales/decimales, radicales, potencias, intervalos, conjuntos, ecuaciones, expresiones algebraicas y unidades;
- si la equivalencia no puede decidirse, hallazgo que obliga a revisión humana;
- opción correcta equivalente a la respuesta final de la solución;
- distractores plausibles, del nivel y no revelados en el enunciado;
- ninguna pista sistemática por longitud, formato o posición.

### 8.4. Solución y didáctica

- solución no vacía ni meramente instructiva;
- pasos estructurados, resultado final y comprobación;
- método permitido para el curso;
- explicación de signos, restricciones, unidades y casos especiales;
- figuras o tablas necesarias disponibles;
- revisión matemática y didáctica requerida antes de aprobar.

### 8.5. Publicación y alcance

- sin bloqueos pendientes;
- revisiones firmadas y versiones de skills/políticas registradas;
- clasificación suficiente para cada modalidad solicitada;
- selector de prueba capaz de alcanzar la revisión;
- ausencia de duplicado semántico publicado no justificado;
- compatibilidad con la versión mínima de la aplicación.

## 9. Arquitectura de representación matemática

Actualmente conviven texto Unicode/ASCII, una minilengua propia (`frac{}`, `sqrt`, matrices con `[[...]]`), restos de LaTeX, HTML/MathML derivados de OMML, imágenes y notación reconocida desde escritura manuscrita. El renderizador aplica transformaciones heurísticas y no existe un AST único.

Se recomienda un **documento canónico por bloques** y nodos matemáticos:

- bloques: párrafo, lista, tabla, figura, matemática en línea, matemática de bloque y aviso;
- matemática canónica: subconjunto documentado de LaTeX normalizado;
- semántica opcional asociada: AST/MathJSON para equivalencia y validación;
- MathML accesible generado como artefacto derivado/cacheado;
- texto alternativo y pronunciación para accesibilidad;
- OMML solo como formato editorial de Word, convertido al importar;
- HTML nunca como fuente canónica;
- imágenes solo cuando la información no pueda expresarse estructuralmente, siempre con activo y descripción.

Durante la transición, un adaptador convertirá el documento canónico al contrato del renderizador actual. Más adelante el renderizador consumirá directamente los nodos, con pruebas visuales de regresión. La representación almacenada no dependerá de Mathpix ni de un proveedor.

## 10. Arquitectura de soluciones

Cada ejercicio tendrá una `solution` versionada y, para ejercicios multipartes, una solución por apartado. Estructura propuesta:

- objetivo o idea inicial;
- pasos ordenados con texto, matemática, tabla, figura o comprobación;
- método y nivel curricular;
- respuesta final tipada (número, expresión, conjunto, intervalo, vector, matriz, texto, elección o estructura compuesta);
- unidades, tolerancia y condiciones;
- comprobación independiente;
- métodos alternativos opcionales;
- política didáctica y revisores.

No se debe construir en producción una «resolución» copiando la opción correcta. Si una solución validada falta, la revisión no puede publicarse en modalidades que muestran solución. Ante un fallo operativo excepcional, la interfaz puede indicar que la resolución no está disponible y registrar el error, pero nunca inventarla.

Las soluciones largas pueden entregarse de forma progresiva, pero todos sus pasos deben proceder de la misma revisión publicada.

## 11. Arquitectura de opciones y barajado

Las opciones deben almacenarse con IDs estables (`option_id`) y la corrección debe apuntar a `correct_option_id`, no a una posición. El orden editorial no tiene significado para el alumnado.

Al crear un intento:

1. se genera o recibe una `attempt_seed`;
2. se aplica Fisher–Yates determinista a los IDs usando `attempt_seed + exercise_revision_id + part_id`;
3. se persisten la semilla, el orden resultante y la correspondencia con la opción correcta;
4. cualquier recarga del intento reproduce exactamente el mismo orden;
5. otro intento puede recibir un orden distinto;
6. analítica y corrección trabajan por ID, nunca por letra o índice.

En examen, la semilla pertenece al intento completo y queda guardada antes de mostrar la primera pregunta. En práctica, se crea por ronda y se conserva hasta responder. El servidor puede emitirla cuando se necesite control adicional, pero el algoritmo debe ser independiente del proveedor.

El barajado de preguntas debe seguir el mismo principio. `Math.random()` sin persistencia no permite reproducir incidencias ni reconstruir un examen.

## 12. Flujo de publicación

1. **Importación:** se copia el original inmutable, se calcula hash y se registra procedencia.
2. **Normalización:** se crea una revisión `DRAFT` con documento estructurado, clasificación, activos, opciones y solución.
3. **Validación automática:** se ejecuta `validateExercise` y se guardan todos los hallazgos.
4. **Revisión editorial:** literalidad, integridad de tablas/figuras y clasificación conforme a la skill de enunciados.
5. **Revisión matemática y didáctica:** resolución independiente, respuesta, distractores y adecuación conforme a la skill de soluciones.
6. **Revisión técnica/visual:** render, accesibilidad, dispositivos y modalidades.
7. **Aprobación:** pasa a `APPROVED` solo con bloqueos a cero y firmas requeridas.
8. **Publicación:** una transacción crea una nueva instantánea y añade revisiones exactas.
9. **Distribución:** la aplicación descarga manifiesto e instantánea, verifica hash y la almacena en caché versionada.
10. **Observación:** errores y métricas referencian `exercise_revision_id`, `snapshot_id` y `attempt_id`.
11. **Retirada/reversión:** se publica otra instantánea; la anterior permanece auditable y permite volver atrás.

## 13. Auditoría futura del catálogo

La futura auditoría reproducible debe recorrer el grafo completo:

`fuente → importación → revisión → validación → aprobación → instantánea → curso/tema/bloque/modalidad → selector → intento`.

El informe debe contabilizar:

- fuentes e ítems importados;
- ejercicios y revisiones por estado;
- ejercicios sin fuente o con fuente rota;
- duplicados textuales, estructurales y semánticos;
- activos huérfanos o ausentes;
- ejercicios sin solución, opciones o respuesta válida;
- ejercicios aprobados no publicados;
- publicados que ningún selector puede alcanzar;
- modalidades sin cobertura o con menos ejercicios que el mínimo;
- diferencias entre catálogo de preparación e instantánea pública;
- diferencias por curso, tema, bloque, comunidad, año y convocatoria;
- ejercicios mostrados realmente en simulaciones de selección;
- razones exactas de exclusión.

La prueba de alcanzabilidad debe simular todas las combinaciones autorizadas y producir una razón legible para cada revisión no alcanzable. Solo entonces podrá afirmarse que «todos los ejercicios incorporados están disponibles»; actualmente esa garantía no existe.

## 14. Migración posterior sin perder ejercicios

1. Congelar e inventariar el estado heredado con hashes y procedencia, sin eliminar nada.
2. Crear el esquema canónico y el validador fuera de la ruta de producción.
3. Importar todos los bancos locales asignando UUID estables y conservando IDs heredados.
4. Importar inventarios, respuestas, parches, activos y generadores como revisiones o plantillas explícitas.
5. Reconciliar duplicados sin borrado automático; registrar fusiones y equivalencias.
6. Validar y revisar por lotes. Lo defectuoso queda `DRAFT`, `REVIEW` o `REJECTED`, nunca se pierde.
7. Generar una instantánea sombra y comparar por curso, tema, modalidad y selección con la aplicación actual.
8. Habilitar lectura canónica tras una bandera para un curso/modalidad piloto.
9. Ampliar por cohortes únicamente con paridad demostrada y posibilidad de volver a la instantánea previa.
10. Retirar los bancos embebidos solo después de la auditoría final, un periodo de estabilidad y una copia archivada recuperable.

Durante la transición no se recomienda escritura dual de contenido, porque puede divergir. La comparación debe ser de lectura: sistema heredado frente a instantánea canónica.

## 15. Riesgos

- **Pérdida u ocultación de contenido:** mitigada con importación exhaustiva, IDs heredados, recuentos y cero borrados automáticos.
- **Duplicados tras mezclar fuentes:** mitigados con huellas y resolución humana de equivalencias.
- **Cambios visuales en matemáticas:** mitigados con adaptador, capturas de referencia y pruebas por navegador/tamaño.
- **Clasificación incorrecta:** mitigada con relaciones muchos-a-muchos, confianza y firma curricular.
- **Soluciones erróneas:** mitigadas con cálculo independiente, validación y doble revisión en contenido oficial.
- **Opciones equivalentes:** mitigadas con normalización semántica y revisión obligatoria cuando el algoritmo no decide.
- **Caché obsoleta:** mitigada con manifiesto, hash, `snapshot_id`, compatibilidad mínima e invalidación explícita.
- **Dependencia de Supabase:** mitigada con exportaciones versionadas, instantáneas firmadas, caché offline y procedimiento de restauración.
- **Exposición de borradores:** mitigada con vistas/RPC de solo publicados, RLS y separación de roles editoriales.
- **Regresiones de selección:** mitigadas con simulación exhaustiva y semillas reproducibles.
- **Confundir skill con garantía:** mitigado registrando la versión aplicada y evidencias de revisión.
- **Privacidad analítica:** los intentos deben referenciar IDs técnicos y evitar almacenar contenido personal innecesario.

## 16. Orden recomendado de implementación por fases

### Fase 0. Inventario reproducible y contrato

Definir recuentos de origen, IDs heredados, taxonomía, contrato JSON/documento, reglas de estado y criterios de aceptación. No migrar aún.

### Fase 1. Esquema canónico y validador fuera de producción

Crear esquema/migraciones revisables, tipos compartidos y `validateExercise`, con pruebas sobre muestras de todos los formatos. Esta es la primera implementación recomendada.

### Fase 2. Importadores sin borrado

Importar bancos, PAU, respuestas, parches, generadores y activos; conservar fuente y representación heredada para comparación.

### Fase 3. Reconciliación y revisión de calidad

Resolver duplicados, completar metadatos, cerrar soluciones pendientes, validar opciones y aplicar las dos políticas editoriales con trazabilidad.

### Fase 4. Documento matemático y adaptador

Canonizar notación, generar MathML derivado y comprobar visualmente contra el render actual. No sustituir todavía toda la ruta pública.

### Fase 5. Publicación e instantánea sombra

Construir estados, aprobaciones, instantáneas, vistas/RPC de solo publicados y auditoría de alcanzabilidad. Comparar salida heredada y canónica.

### Fase 6. Intentos y barajado reproducible

Introducir IDs de opción, semillas persistidas, orden por intento y analítica referenciada a revisiones.

### Fase 7. Piloto de lectura canónica

Activar un curso y una modalidad tras bandera, con métricas, caché versionada y reversión inmediata.

### Fase 8. Despliegue gradual y retirada del legado

Ampliar por cursos/modalidades; retirar bancos embebidos únicamente con paridad, catálogo auditado, respaldo y periodo estable.

### Fase 9. Automatización continua

Ejecutar validación, pruebas visuales, auditoría de alcanzabilidad y comparación de instantáneas en cada propuesta de publicación.

---

## Conclusión

Supabase no es hoy la fuente de ejercicios; el repositorio y el orden de ejecución de numerosos scripts lo son. La aplicación posee filtros y correcciones útiles, pero no un sistema que pruebe integridad, publicación, equivalencia matemática y alcanzabilidad de extremo a extremo. La arquitectura recomendada mantiene los originales como evidencia, convierte Supabase en fuente única del catálogo publicado, exige revisiones inmutables y estados editoriales, publica instantáneas atómicas y hace reproducibles selección y barajado. La migración debe importar primero todo lo existente y demostrar paridad antes de retirar una sola fuente heredada.

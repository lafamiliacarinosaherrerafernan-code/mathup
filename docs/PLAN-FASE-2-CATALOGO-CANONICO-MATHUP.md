# Plan técnico de la Fase 2 — Importación canónica reversible de +MathUp

**Estado:** plan de arquitectura; no implementado.  
**Contrato de destino:** `mathup.exercise.v1`, validado por `mathup-canonical-validator/1.0.0`.  
**Fuentes de referencia exclusivas:** plan canónico aprobado, inventario de Fase 0, diagnóstico de Fase 0B, informe de Fase 1, esquema y validador canónicos aprobados.  
**Restricción central:** esta fase no sustituye bancos, no corrige contenido, no publica ejercicios y no modifica Supabase ni el comportamiento de +MathUp.

## 1. Decisión de alcance

La Fase 2 debe construir y probar un **adaptador de importación sin borrado** que convierta el catálogo heredado en candidatos conformes al contrato canónico, manteniéndolos en artefactos paralelos y completamente auditables.

La salida de la fase no será todavía «el catálogo publicado». Será una fotografía canónica candidata que permita responder, para cada campo y cada ejercicio:

- qué registro original lo aportó;
- qué regla de transformación se aplicó;
- qué datos son literales, cuáles están ausentes y cuáles requieren una decisión;
- qué diagnósticos emitió el validador;
- por qué el candidato está bloqueado, pendiente de revisión o técnicamente validado.

La Fase 2 comprende:

1. congelar y verificar las entradas de Fase 0;
2. extraer de forma determinista bancos, parches, respuestas, soluciones, generadores, materializaciones y activos;
3. normalizar estructura y taxonomía sin reescribir el contenido matemático;
4. asignar identidades estables y registrar alias heredados;
5. enlazar respuestas o soluciones separadas únicamente con evidencia inequívoca;
6. producir candidatos `mathup.exercise.v1` y sus expedientes de trazabilidad;
7. ejecutar el validador aprobado;
8. generar colas y conciliaciones auditables;
9. demostrar reproducibilidad y reversibilidad.

Quedan expresamente fuera de la Fase 2:

- decidir o corregir los 571 ejercicios inaccesibles que parecen publicables;
- resolver equivalencias matemáticas dudosas;
- redactar respuestas o soluciones que no existen;
- reparar notación, caracteres o imágenes;
- cambiar la generación o el orden A/B/C/D en la aplicación;
- revisión visual definitiva de representaciones complejas;
- aprobación editorial, publicación, lectura desde Supabase o retirada del legado.

Esas decisiones corresponden principalmente a las Fases 3 a 7 del plan canónico.

## 2. Línea base y universo de datos

La línea base que debe reconciliar la importación es la obtenida en Fase 0:

| Concepto | Línea base |
|---|---:|
| Registros localizados | 15.527 |
| Registros capturados directamente de fuentes | 10.466 |
| Materializaciones de ejecución | 5.061 |
| Registros con enunciado | 9.246 |
| Registros auxiliares | 6.281 |
| Ejercicios únicos estimados | 6.712 |
| Ejercicios accesibles actualmente | 6.105 |
| Ejercicios únicos inaccesibles | 607 |

La importación debe conservar **los 15.527 registros como evidencia**, pero no convertir automáticamente los 15.527 en ejercicios publicables. Deben distinguirse cuatro capas:

1. **Registro de origen:** objeto, fila, parche o entrada literal capturada.
2. **Observación de ejecución:** resultado de un constructor, selector o generador bajo una configuración determinada.
3. **Candidato canónico:** ejercicio estructurado que aspira a cumplir `mathup.exercise.v1`.
4. **Relación:** alias, derivación, duplicado, equivalencia posible, respuesta vinculada o solución vinculada.

Los 6.281 auxiliares se importarán al libro de evidencias y se clasificarán; no se forzarán dentro del esquema de ejercicio si no son ejercicios. Las 5.061 materializaciones se conservarán como observaciones reproducibles. En especial, las 2.209 materializaciones generadas o derivadas sin respuesta persistida no deben convertirse por defecto en 2.209 ejercicios independientes: deben enlazarse con su generador, versión, parámetros y semilla cuando esa información exista; si no existe, quedarán como observaciones no publicables.

## 3. Fuentes de procedencia

La autoridad exacta sobre las fuentes es `scriptManifest` del inventario JSON de Fase 0 y el orden de carga de `index.html`. La implementación futura deberá importar, como mínimo, estas familias:

- bancos heredados y constructores de `app.js`;
- los 127 módulos bajo `data/` cargados por la aplicación;
- bancos principales de ESO, 1.º de Bachillerato y 2.º de Bachillerato;
- bancos PAU de Castilla-La Mancha y Madrid;
- módulos por año, convocatoria, bloque y materia;
- bancos de respuestas y puentes de respuestas;
- parches, correcciones en tiempo de ejecución y expansiones de variedad;
- bancos especializados, entre ellos integrales y bancos originales;
- generadores y constructores de Práctica, Retos, Aventuras y exámenes;
- activos citados por ejercicios: imágenes, tablas, SVG, MathML u otros recursos;
- materializaciones producidas por los selectores auditados en Fase 0.

Entre las fuentes que requieren atención explícita por contener registros inaccesibles figuran `data/mates-ii-blocks.js`, `data/coach-data.js`, `data/ccss-ii-integrals-practice.js`, `data/ccss-ii-blocks.js`, `data/ccss-i-original-exercise-banks.js`, `data/mates-ii-runtime-fixes.js`, `data/bach-ii-variety-expansion.js`, `data/madrid-pau-authored.js` y los bancos anuales de respuestas indicados en Fase 0B.

La lista no se mantendrá manualmente como verdad alternativa. Cada ejecución generará un manifiesto ordenado con ruta, tamaño y SHA-256 de todas las entradas. Un archivo nuevo o ausente obligará a regenerar y revisar el manifiesto; nunca se incorporará silenciosamente.

## 4. Canalización propuesta

### 4.1. Etapa A — Congelación de entradas

- comprobar que JSON, CSV e informe de Fase 0 corresponden a la misma ejecución;
- registrar commit de origen, versión del importador, esquema y validador;
- calcular SHA-256 de fuentes, inventario y activos;
- ejecutar el inventario reproducible y comparar sus recuentos con la línea base;
- detener la importación ante una diferencia no explicada.

### 4.2. Etapa B — Libro inmutable de evidencias

Cada registro recibirá un `sourceRecordId` estable y conservará:

- archivo, ruta lógica dentro del archivo y orden de carga;
- identificadores originales sin normalizarlos destructivamente;
- valor literal de campos relevantes;
- hash del registro bruto normalizado solo para comparación;
- clase: fuente, parche, respuesta, solución, auxiliar, generador u observación;
- referencias a activos;
- datos de ejecución si procede.

El importador nunca editará el original. Una corrección posterior producirá otra revisión y otra transformación, no una sustitución de la evidencia.

### 4.3. Etapa C — Correspondencias controladas

Se usarán tablas versionadas para curso, materia, tema, bloque, modalidad, comunidad y procedencia. Cada entrada tendrá:

- valor heredado;
- valor canónico propuesto;
- fuente de la decisión;
- estado `VERIFIED`, `REVIEW_REQUIRED` o `UNMAPPED`;
- observaciones y versión.

Solo `VERIFIED` puede rellenar automáticamente un campo canónico. `UNMAPPED` permanece nulo o bloqueado. Las tablas no corregirán el texto del ejercicio.

### 4.4. Etapa D — Resolución de identidad

Se construirán candidatos y relaciones de identidad sin borrar ocurrencias. La resolución se hará antes de enlazar respuestas y soluciones para evitar uniones por semejanza textual.

### 4.5. Etapa E — Transformación canónica

El adaptador rellenará únicamente campos demostrables del esquema. Preservará texto, bloques y representaciones matemáticas heredadas; una representación no comprendida se registrará como original y generará diagnóstico, no se reinterpretará.

Cada transformación se anotará con código de regla, versión, entrada, salida, fecha de ejecución y hash. Las transformaciones puramente estructurales —por ejemplo, mover un identificador heredado a `identity.legacyIds`— serán distinguibles de cualquier inferencia editorial.

### 4.6. Etapa F — Enlaces inequívocos

Una respuesta o solución separada solo se enlazará si existe una clave exacta y única verificada: identificador original, clave compuesta documentada o relación explícita del código. El enlace registrará regla y registros participantes.

No se permiten uniones automáticas basadas únicamente en similitud del enunciado, posición en una lista, cercanía de nombres o equivalencia simbólica no probada. Los cinco casos identificados por Fase 0B como respuesta en otra ocurrencia podrán proponerse, pero deberán superar unicidad, curso, tema y procedencia antes de ser `VERIFIED`.

### 4.7. Etapa G — Validación y conciliación

Todos los candidatos se validarán con la versión aprobada. Los diagnósticos no se ocultarán ni se convertirán en contenido. Las colas resultantes deberán sumar exactamente el total de candidatos y enlazar a todos sus registros de evidencia.

## 5. Identificadores canónicos estables

Se requieren tres identidades diferentes:

- `sourceRecordId`: identifica una ocurrencia original;
- `candidateId`: identifica una propuesta durante la migración;
- `identity.exerciseId`: identifica el ejercicio canónico estable.

La propuesta para `exerciseId` es un UUID v5 determinista dentro de un namespace fijo de +MathUp. La semilla no será el enunciado aislado ni la posición actual en un array. Se construirá con la mejor identidad verificable disponible:

1. identificador autoritativo explícito y espacio de nombres de la fuente;
2. identificador original estable más archivo/familia de banco;
3. para PAU, clave de procedencia demostrada —comunidad, materia, año, convocatoria, opción, ejercicio/apartado— más referencia al original;
4. para generadores, identificador y versión del generador más plantilla/configuración estable; una materialización usa además parámetros o semilla demostrables;
5. si la identidad no puede establecerse sin inventar, UUID provisional de candidato basado en la ocurrencia y estado `REVIEW_REQUIRED`, sin consolidarlo como ejercicio publicable.

El primer resultado se guardará en un registro de identidades versionado. Una vez asignado, un cambio de ruta o una mejora del texto no recalculará el `exerciseId`; se creará una nueva `revisionId` y se conservarán `legacyIds`. El registro contendrá semilla, algoritmo, namespace, alias, colisiones y decisiones. Cualquier colisión o semilla ambigua será `ERROR`.

El hash del enunciado sirve para detectar duplicados y cambios, nunca como única identidad definitiva. Así se evita que una corrección ortográfica cambie el ejercicio o que dos problemas distintos con texto similar se fusionen.

## 6. Trazabilidad y ausencia de invención

Todo campo importado debe tener una evidencia lateral en un expediente `field-provenance`: campo canónico, valor, `sourceRecordId`, ruta original, regla y tipo de conocimiento:

- `OBSERVED`: literal en la fuente;
- `DERIVED_SAFE`: transformación mecánica reversible;
- `INFERRED_REVIEW`: propuesta no confirmada, que no habilita publicación;
- `UNKNOWN`: no consta.

Reglas obligatorias:

- los desconocidos permanecen `null`, lista vacía o hallazgo abierto según permita el contrato;
- no se inventan año, convocatoria, comunidad, tema, respuesta, solución, dificultad ni modalidad;
- no se sustituye «desconocido» por un valor probable;
- las ausencias que el esquema considera obligatorias producen `ERROR`;
- una inferencia útil puede aparecer en una cola lateral, pero no como hecho canónico aprobado;
- el texto original y su hash siempre permanecen disponibles;
- toda normalización debe poder invertirse o compararse con su entrada.

## 7. Tratamiento de incidencias conocidas

| Incidencia | Tratamiento en Fase 2 | Resultado permitido |
|---|---|---|
| Duplicado exacto | Crear grupo por hash y relación; conservar todas las ocurrencias. No fusionar si la identidad/procedencia no demuestra que es el mismo ejercicio. | Candidato principal propuesto y alias solo con regla verificada; en otro caso revisión. |
| Posible equivalente | Registrar grupo y evidencias de similitud, sin fusionar. | `REVIEW_REQUIRED`; revisión matemática en Fase 3. |
| 607 inaccesibles | Importar y marcar la causa de inaccesibilidad de Fase 0B. | 571 candidatos editoriales, 32 auxiliares/históricos, 3 duplicados, 1 dudoso; ninguno se publica. |
| Sin respuesta | Conservar ausencia. Enlazar solo respuesta separada inequívoca. | `ANSWER_MISSING` y `BLOCKED` si no se resuelve. |
| Sin solución desarrollada | Conservar `missing` o `final-only` según evidencia. | `SOLUTION_MISSING`/`SOLUTION_FINAL_ONLY`; no redactar pasos. |
| `solutionNeedsReview` | Trasladar el indicador y los hallazgos. | Al menos `REVIEW_REQUIRED`; nunca aprobación automática. |
| Notación o caracteres deteriorados | Conservar literal, representación y activo; registrar diagnóstico. | `BLOCKED` cuando el validador detecta corrupción; revisión visual posterior. |
| Opciones exactas/equivalentes | Separar correcta y tres distractores con IDs solo si los valores están inequívocamente identificados. | Duplicado seguro: `ERROR`; equivalencia no demostrable: `WARNING` y revisión matemática. |

### 7.1. Duplicados

Los 63 grupos exactos y las 122 ocurrencias adicionales de Fase 0 se usarán como conjunto de control. Los 428 grupos de posibles equivalentes no serán deduplicados automáticamente. Una relación tendrá tipo (`EXACT_DUPLICATE`, `POSSIBLE_EQUIVALENT`, `ALIAS_OF`, `DERIVED_FROM`), método, confianza y estado de revisión.

### 7.2. Ausencia de respuesta o solución

La conciliación respetará las categorías de Fase 0B:

- 2.209 generados/derivados sin respuesta persistida;
- 897 ejercicios reales sin respuesta y sin solución;
- 120 casos dudosos;
- 5 respuestas localizadas en otra ocurrencia;
- 139 soluciones que solo contienen la respuesta final;
- 8 auxiliares que no necesitan solución en su uso actual.

Los auxiliares no se falsearán como ejercicios válidos. Los generados conservarán el vínculo a su receta; si la receta no permite reconstruir respuesta y solución de forma demostrable, quedan bloqueados.

### 7.3. Opciones y posición correcta

La importación trasladará el contenido lógico: una correcta y tres distractores, cada uno con `choiceId`, sin almacenar A/B/C/D. Si la fuente solo expresa `correct: 0`, el adaptador podrá reconocer qué valor es correcto, pero registrará esa transformación. No cambiará el comportamiento actual.

El contrato exige `seeded-per-attempt`; en Fase 2 se podrá crear y probar la función pura que materializa un orden a partir de IDs y semilla, pero no integrarla en intentos reales. Los constructores que hoy colocan sistemáticamente la respuesta en A quedarán identificados en el informe de migración. Corregir la distribución efectiva corresponde a la Fase 6.

## 8. Estados de validación, revisión y publicación

Los estados no deben confundirse:

### 8.1. Severidad del validador

- **`ERROR`:** incumplimiento objetivo del contrato o incoherencia segura: respuesta ausente, solución objetivamente insuficiente, trazabilidad ausente, PAU sin comunidad, cuatro opciones inválidas, duplicado exacto, corrupción detectada, colisión de identidad. Bloquea.
- **`WARNING`:** incertidumbre que el programa no puede resolver con seguridad: año/convocatoria PAU incompletos, desarrollo posiblemente insuficiente, equivalencia simbólica no probada, hallazgo abierto o `solutionNeedsReview`. Exige revisión.
- **`OK`:** el validador no detecta errores ni advertencias. No equivale por sí solo a aprobación editorial.

### 8.2. Cola de migración

- **`BLOCKED`:** al menos un `ERROR`, mapeo obligatorio ausente o conflicto de identidad.
- **`REVIEW_REQUIRED`:** cero errores, pero existe `WARNING`, inferencia pendiente, posible equivalencia, decisión sobre accesibilidad o revisión humana/matemática abierta.
- **`PASSED`:** validación estructural `OK`, transformaciones trazables y ningún conflicto de migración. Significa «candidato técnicamente válido».

### 8.3. Apto para publicación

Un candidato solo puede calificarse como **apto para publicación futura** cuando, además de estar `PASSED`:

- su revisión editorial está `APPROVED`;
- `solutionNeedsReview` es falso;
- no tiene hallazgos abiertos;
- respuesta y solución han sido validadas matemáticamente cuando proceda;
- procedencia y licencias están resueltas;
- opciones tienen una única correcta;
- modalidades son compatibles con su perfil;
- la revisión concreta está incluida en una instantánea aprobada.

La Fase 2 no concede ese estado ni publica nada. Como máximo produce candidatos `PASSED` para las fases posteriores.

## 9. Perfiles pedagógicos y procedencia PAU

La transformación debe usar exactamente los perfiles aprobados:

- **ESO:** `1eso`, `2eso`, `3eso`, `4eso-a`, `4eso-b`; etapa `ESO`; solución `ESO`.
- **1.º Bachillerato:** `1bach-ccss`, `1bach-mates`; etapa `BACHILLERATO`; solución `BACH1`.
- **2.º Bachillerato:** `2bach-ccss`, `2bach-mates`; en +MathUp se trata como `PAU`, procedencia `official-pau` y solución `BACH2_PAU`.

No se degradará 2.º de Bachillerato PAU a un banco genérico para satisfacer el esquema. Las modalidades se limitarán a las autorizadas por cada perfil en Fase 1.

Para cada PAU se preservarán, cuando consten:

- comunidad autónoma y código estable;
- materia e itinerario;
- año;
- convocatoria;
- opción/modelo;
- número de ejercicio y apartado;
- bloque oficial;
- archivo original, página y activo asociado;
- identificadores heredados y banco que lo materializa.

La comunidad no se deducirá del curso ni del nombre de un módulo ambiguo. Año y convocatoria podrán ser `null` como permite el contrato, pero generarán `PAU_DETAIL_INCOMPLETE`. El único registro genérico de Madrid señalado como incompatible permanecerá en revisión hasta que su procedencia pueda probarse.

## 10. Cobertura obligatoria del material educativo ya incorporado

La migración tiene la obligación de **contabilizar, conservar y conciliar todo el material educativo que el profesor ya incorporó a +MathUp**, aunque una parte no sea hoy alcanzable desde la aplicación. Esta cobertura no se limita a los ejercicios que devuelven los selectores actuales.

Como mínimo, la conciliación debe cubrir separadamente:

- 1.º ESO;
- 2.º ESO;
- 3.º ESO;
- 4.º ESO, respetando sus itinerarios `4eso-a` y `4eso-b`;
- 1.º Bachillerato Matemáticas I;
- 1.º Bachillerato Matemáticas Aplicadas a las CCSS I;
- 2.º Bachillerato Matemáticas II;
- 2.º Bachillerato Matemáticas Aplicadas a las CCSS II.

### 10.1. Cobertura específica de 2.º de Bachillerato PAU

Todo el contenido de 2.º de Bachillerato conservará su carácter PAU y su procedencia. La cobertura deberá auditarse de forma independiente para:

- Matemáticas II;
- Matemáticas Aplicadas a las CCSS II;
- Castilla-La Mancha;
- Madrid;
- cada comunidad autónoma futura desde el momento en que se incorpore.

Para Matemáticas II y CCSS II, la conciliación se desglosará además por comunidad, año y convocatoria siempre que esos metadatos consten en la evidencia original. Un dato ausente permanecerá ausente y se notificará; no se completará por probabilidad.

### 10.2. Expediente de conciliación por ejercicio

Cada ejercicio previamente incorporado deberá tener una fila o expediente que permita demostrar:

- archivo, banco, parche o generador donde estaba originalmente;
- `sourceRecordId` de todas sus ocurrencias relevantes;
- `candidateId` y, cuando ya se haya podido asignar de forma estable, `identity.exerciseId` canónico;
- curso;
- materia;
- tema y bloque;
- procedencia;
- comunidad PAU cuando corresponda;
- estado de migración `BLOCKED`, `REVIEW_REQUIRED` o `PASSED`;
- causa exacta y códigos de diagnóstico cuando no pueda llegar a publicación;
- relaciones con respuestas, soluciones, parches, activos, duplicados y materializaciones que estén en otros archivos.

La ausencia de `candidateId` también debe constituir un resultado explícito. El expediente indicará `NOT_CONVERTED` y una causa cerrada y verificable, por ejemplo `AUXILIARY_RECORD`, `IDENTITY_CONFLICT`, `UNMAPPED_CLASSIFICATION`, `GENERATOR_OBSERVATION_ONLY` o `REQUIRES_HUMAN_DECISION`. No se admite una categoría genérica sin explicación.

### 10.3. Prohibición de pérdida silenciosa

Ningún ejercicio ya incorporado puede desaparecer de la conciliación por el hecho de que:

- no esté conectado actualmente;
- haya quedado fuera de un selector;
- esté guardado en un banco histórico;
- forme parte de un parche o corrección en tiempo de ejecución;
- tenga la respuesta o la solución en otro archivo;
- presente un problema de clasificación, taxonomía o procedencia.

Los 607 ejercicios únicos actualmente inaccesibles entrarán obligatoriamente en la conciliación. «No alcanzable hoy por el alumno» describe su estado operativo, pero no autoriza a descartarlo, convertirlo en auxiliar ni excluirlo de la migración. Su eventual publicación será una decisión posterior y trazada.

### 10.4. Prueba de cobertura antes/después

La Fase 2 generará una matriz de cobertura por curso y materia que compare la entrada original con la salida de la migración. Para cada grupo informará como mínimo:

- número de ejercicios originales localizados;
- número transformado en candidatos;
- número `PASSED`;
- número `REVIEW_REQUIRED`;
- número `BLOCKED`;
- número no convertido;
- desglose exacto de los motivos de no conversión.

La suma de candidatos y no convertidos debe explicar el total de ejercicios originales del grupo, teniendo en cuenta de forma visible los duplicados y las relaciones uno-a-varios. La matriz no podrá ocultar diferencias mediante redondeos, exclusiones implícitas ni agrupaciones residuales.

El objetivo final del proyecto es que todo ejercicio válido previamente incorporado y posteriormente aprobado llegue al alumno en la modalidad compatible. La Fase 2 no los publicará, pero deberá garantizar que ninguno se pierda y señalar exactamente qué impide publicar cada candidato que todavía no esté preparado.

## 11. Papel de Supabase

Supabase debe permanecer **sin modificaciones durante toda la Fase 2**. No se crearán tablas, buckets, RPC, migraciones, credenciales, cargas de prueba ni lecturas nuevas desde la aplicación.

Su papel en esta fase es únicamente definir requisitos para el futuro: los artefactos deben ser importables de manera transaccional, versionables por revisión e instantánea y aptos para auditoría. La carga real llegará después de que:

1. la canalización sea reproducible;
2. la conciliación sea completa;
3. la Fase 3 cierre las decisiones de calidad;
4. exista una migración de base de datos revisada y un procedimiento de rollback;
5. se apruebe una instantánea sombra.

Así se mantiene intacta la aplicación actual y se evita tener dos fuentes de verdad activas.

## 12. Artefactos auditables de una ejecución

Cada ejecución deberá escribirse en un directorio nuevo e inmutable, por ejemplo `artifacts/fase2/runs/<run-id>/`, sin sobrescribir ejecuciones previas. Debe producir:

1. `run-manifest.json`: versiones, commit, fecha, opciones y hashes globales;
2. `input-manifest.json`: lista ordenada y SHA-256 de todas las entradas;
3. `source-records.jsonl`: libro completo de los 15.527 registros;
4. `runtime-observations.jsonl`: materializaciones, selectores, configuración y semillas;
5. `taxonomy-mappings.json` y `unmapped-taxonomy.csv`;
6. `identity-registry.json` y `identity-conflicts.csv`;
7. `source-to-canonical.jsonl`: relación de cada registro con candidato o clase auxiliar;
8. `duplicate-clusters.json` y `possible-equivalents.csv`;
9. `join-decisions.jsonl`: respuestas/soluciones enlazadas, rechazadas o ambiguas;
10. `field-provenance.jsonl`: evidencia de cada valor canónico;
11. `canonical-candidates.jsonl`: candidatos `mathup.exercise.v1`;
12. `validation-results.jsonl` y `validation-summary.json`;
13. `queue-blocked.csv`, `queue-review-required.csv` y `queue-passed.csv`;
14. `inaccessible-classification.csv`;
15. `assets-manifest.json`: referencias, existencia y hashes;
16. `reconciliation.json`: cardinalidades de entrada, salida y relaciones;
17. `educational-content-reconciliation.jsonl`: expediente completo por cada ejercicio previamente incorporado;
18. `coverage-by-course-subject.csv`: cobertura antes/después por curso y materia;
19. `pau-coverage-by-provenance.csv`: Matemáticas II y CCSS II por comunidad, año y convocatoria cuando consten;
20. `not-converted.csv`: ejercicios no convertidos con código y motivo exactos;
21. `migration-report.md`: resumen legible y desviaciones;
22. `checksums.sha256`: integridad de toda la ejecución;
23. `rollback-manifest.json`: archivos creados y operación exacta de retirada.

El JSONL será la fuente de datos auditable; los CSV y Markdown serán vistas derivadas. Ningún artefacto sustituirá un banco actual ni será consumido por la aplicación durante esta fase.

## 13. Pruebas obligatorias

### 13.1. Reproducibilidad

- dos ejecuciones con las mismas entradas producen los mismos IDs, candidatos, relaciones y hashes de contenido, excluyendo metadatos de ejecución explícitamente no semánticos;
- variar el orden accidental del sistema de archivos no cambia el resultado;
- el orden de carga real de `index.html` sí queda preservado y registrado;
- una entrada modificada cambia el manifiesto y detiene la comparación con la línea base hasta su aprobación.

### 13.2. Integridad y conciliación

- los 15.527 registros están presentes exactamente una vez en el libro de evidencias;
- cada registro termina asociado a candidato, observación o clase auxiliar explícita;
- los 6.712 ejercicios únicos de línea base están contabilizados, o toda diferencia está enumerada y justificada;
- los 607 inaccesibles mantienen su causa y clasificación de Fase 0B;
- ningún candidato carece de `inventoryRecordIds` y de procedencia de campo;
- las tres colas son disjuntas y su suma coincide con el total de candidatos;
- no existen IDs canónicos duplicados ni alias circulares;
- todos los activos referenciados figuran en el manifiesto, incluso si faltan.

### 13.3. Validador y perfiles

- el esquema y el validador aprobados se ejecutan sin modificación no autorizada;
- se mantienen pasando las pruebas de Fase 1;
- hay casos dorados para ESO, BACH1, PAU Castilla-La Mancha y PAU Madrid;
- los cursos, etapas, materias y modalidades incoherentes quedan bloqueados;
- PAU sin procedencia obligatoria queda bloqueada y PAU con año/convocatoria ausente queda en revisión;
- ausencia de respuesta, solución final-only, corrupción y opciones repetidas reproducen los diagnósticos previstos;
- equivalencia simbólica no segura nunca se decide automáticamente.

### 13.4. Identidad y enlaces

- el mismo ejercicio mantiene ID entre ejecuciones y revisiones;
- una edición del enunciado no cambia `exerciseId`, sino `revisionId`;
- un cambio de ruta no cambia un ID ya registrado;
- los grupos exactos y posibles equivalentes de Fase 0 sirven como pruebas de regresión;
- cada enlace de respuesta/solución puede explicarse con una regla exacta;
- una unión ambigua produce revisión y nunca elige la primera coincidencia.

### 13.5. Cobertura del material ya incorporado

- existe un expediente de conciliación para cada ejercicio original de ESO, Matemáticas I, CCSS I, Matemáticas II y CCSS II;
- cada expediente enlaza origen, `sourceRecordId`, candidato o motivo de no conversión, clasificación, procedencia y estado;
- la suma de candidatos y no convertidos explica el total original de cada curso y materia;
- `PASSED`, `REVIEW_REQUIRED` y `BLOCKED` son disjuntos y explican todos los candidatos;
- cada no convertido tiene un código de causa exacto y evidencia, sin categorías residuales como «otros»;
- los 607 inaccesibles están presentes y mantienen visible su causa de inaccesibilidad;
- los ejercicios de bancos históricos, parches o con respuesta/solución separada no se pierden;
- Matemáticas II y CCSS II concilian por separado comunidad, año y convocatoria cuando constan;
- Castilla-La Mancha y Madrid tienen recuentos independientes y cualquier comunidad futura aparece como dimensión propia;
- toda diferencia entre los recuentos antes/después detiene el cierre de la fase.

### 13.6. No regresión de producción

- `git diff` demuestra que no se modificaron bancos, aplicación, Supabase, renderizadores ni skills;
- las pruebas actuales de la aplicación producen el mismo resultado antes y después;
- ningún archivo de Fase 2 se referencia desde `index.html`, `app.js` o rutas públicas;
- no existen escrituras de red ni a Supabase durante la importación.

## 14. Criterios objetivos de cierre

La Fase 2 se considerará terminada únicamente si:

1. todas las pruebas anteriores pasan;
2. el inventario completo está conciliado sin registros silenciosamente descartados;
3. cada candidato tiene ID estable, evidencia y resultado de validación;
4. todas las ausencias, ambigüedades y conflictos aparecen en una cola;
5. los recuentos por curso, tema, procedencia y estado son reproducibles;
6. los 607 inaccesibles, 3.231 sin respuesta, 3.234 sin solución y 127 `solutionNeedsReview` son localizables en los resultados, respetando solapamientos;
7. exactos, equivalentes posibles y opciones conflictivas conservan sus relaciones;
8. ninguna inferencia no revisada figura como dato aprobado;
9. una segunda ejecución independiente reproduce los artefactos semánticos;
10. el rollback se ensaya y deja el repositorio en la línea base;
11. un informe de revisión humana aprueba la canalización, no necesariamente el contenido de todos los ejercicios;
12. Supabase y el comportamiento público siguen sin cambios.
13. existe una conciliación individual de todos los ejercicios previamente incorporados que enlaza origen, `sourceRecordId`, candidato canónico o motivo exacto de no conversión;
14. la prueba antes/después cuadra por curso y materia para 1.º, 2.º, 3.º y 4.º ESO, Matemáticas I, CCSS I, Matemáticas II y CCSS II;
15. los recuentos PAU de Matemáticas II y CCSS II cuadran por comunidad, año y convocatoria cuando esos metadatos existen;
16. Castilla-La Mancha, Madrid y cada comunidad futura incorporada aparecen separadas en la conciliación;
17. ningún ejercicio queda omitido por inaccesibilidad actual, selector, banco histórico, parche, almacenamiento separado de respuesta/solución o problema de clasificación;
18. todo ejercicio que todavía no pueda publicarse tiene estado y causa exacta, y todo no convertido tiene un motivo verificable.

No es criterio de cierre conseguir que todos los candidatos sean `PASSED`. Los bloqueados y pendientes son un resultado válido si están completos, explicados y trazables.

## 15. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Fusionar ejercicios distintos por texto parecido | No usar texto como identidad única; relaciones revisables; sin fusión automática de equivalentes. |
| Perder correcciones aplicadas por orden de carga | Registrar manifiesto ordenado, fuente inicial, parches y valor materializado por separado. |
| Inventar metadatos al normalizar | `UNKNOWN`, expedientes por campo y bloqueo de mapeos no verificados. |
| Tratar materializaciones como ejercicios independientes | Separar generador, receta, parámetros y observación. |
| Vincular respuesta/solución incorrecta | Solo claves exactas y únicas; cola para ambigüedades. |
| Cambiar un ID al mover archivos | Registro de identidades persistente; IDs ya emitidos no se recalculan. |
| Ocultar errores mediante el adaptador | Conservar literal, emitir diagnóstico y prohibir autocorrección. |
| Degradar la procedencia PAU | Reglas estrictas de perfil y campos de procedencia; no publicar incompletos. |
| Duplicar fuentes de verdad | Artefactos fuera del runtime; Supabase y aplicación intactos. |
| Resultados no reproducibles por aleatoriedad | Semillas explícitas, orden estable y prueba de hashes. |
| Activos perdidos | Manifiesto de activos con hash, existencia y referencia inversa. |
| Volumen de artefactos difícil de revisar | JSONL como evidencia, resúmenes derivados, partición por ejecución y checksums. |

## 16. Reversión completa

Antes de implementar la fase se deberá crear una rama específica desde la línea base aprobada y registrar su commit/tag. La Fase 2 solo podrá añadir importadores, pruebas, configuraciones de correspondencia y artefactos paralelos.

La reversión será completa porque no habrá cambios de datos externos ni consumidores de producción:

1. detener la ejecución;
2. verificar el `rollback-manifest.json` y los checksums;
3. retirar únicamente los archivos creados por la ejecución o revertir el commit de Fase 2;
4. ejecutar de nuevo pruebas y `git status` sobre la línea base;
5. comprobar que Supabase, bancos y aplicación no presentan diferencias;
6. conservar, si se requiere auditoría, el paquete de ejecución fuera del árbol de producción.

No se usarán comandos destructivos sobre bancos ni se reescribirá historial. Si una ejecución falla, sus artefactos quedan marcados `FAILED` y no se reutilizan como entrada aprobada.

## 17. Orden de implementación recomendado para una futura autorización

1. pruebas de manifiesto y línea base;
2. libro de evidencias y clasificación fuente/auxiliar/observación;
3. tablas de correspondencia y pruebas por perfil;
4. registro determinista de identidades;
5. adaptadores por familia, empezando por muestras doradas de ESO, BACH1 y PAU;
6. enlaces exactos de respuestas/soluciones;
7. transformación del universo completo;
8. validación y colas;
9. conciliación contra Fase 0/0B;
10. doble ejecución reproducible;
11. ensayo de rollback;
12. revisión y aprobación explícita antes de iniciar Fase 3.

Este orden prioriza la evidencia y la reversibilidad. Ninguna etapa posterior puede corregir silenciosamente una deficiencia de la anterior.

## 18. Resultado esperado

Al terminar la futura Fase 2, +MathUp seguirá funcionando exactamente con sus bancos actuales. En paralelo existirá un corpus canónico candidato, íntegramente trazable, con identidades estables, diagnóstico completo y colas de trabajo. Ese corpus permitirá iniciar la reconciliación matemática y editorial de Fase 3 sin arriesgar los originales ni confundir importación con publicación.

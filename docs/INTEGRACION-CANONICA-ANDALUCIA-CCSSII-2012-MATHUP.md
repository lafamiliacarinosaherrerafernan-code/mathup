# Integración canónica paralela de Andalucía · CCSS II · 2012

## Estado y alcance

La integración se ha ejecutado como una capa canónica paralela, reproducible y reversible. No está conectada al selector, al runtime público, a Supabase ni a ningún archivo de producción. Los 48 ejercicios permanecen en estado `NOT_PUBLISHED`.

Esta operación incorpora exclusivamente el material documental ya acreditado de Andalucía, Matemáticas Aplicadas a las CCSS II, año 2012:

- 48 ejercicios oficiales;
- 104 subapartados;
- 55 objetos `Equation.3` con validación humana;
- 27 ejercicios dependientes con estado `EQUATION3_HUMAN_VALIDATED`;
- 21 ejercicios sin dependencia `Equation.3`;
- reconstrucción `ABCABC` con estado `DOCUMENT_LAYOUT_HUMAN_VALIDATED` y SHA-256 `f152e84ef8985c54ad42b77818407b9038fdbc25d6b2fbae6a6e6c75a21beac7`;
- 6 correspondencias examen–criterio, materializadas en 48 ámbitos de ejercicio con `CRITERIA_MATCH_EXACT`;
- 111 evidencias de puntuación editorial separadas del contenido destinado al alumno.

Los criterios oficiales se conservan exclusivamente como evidencia oficial de corrección. No se han convertido en respuestas ni soluciones pedagógicas.

## Conciliación antes/después

| Métrica | Antes | Después | Variación |
|---|---:|---:|---:|
| Catálogo canónico Andalucía | 1.618 | 1.666 | +48 |
| Matemáticas II | 826 | 826 | 0 |
| CCSS II | 792 | 840 | +48 |
| CCSS II · 2012 | 0 | 48 | +48 |
| Subapartados añadidos | 0 | 104 | +104 |

No se detectaron identificadores de ejercicio duplicados. Ningún otro año o materia cambió.

El conjunto previo de 15.527 `sourceRecordId` permanece íntegro: 15.527 localizados, 15.527 únicos y 0 desaparecidos. Su hash de conjunto sigue siendo `03f1d806eb3f253025496b8e94c0860ad672906e0af1b243e6fe8502df1e2f5c`. Los 48 ejercicios nuevos proceden de documentos oficiales y no reciben un identificador heredado ficticio; su trazabilidad se establece mediante documento, SHA-256 y rango de caracteres.

## Taxonomía real de +MathUp

La clasificación utiliza los nombres e índices existentes en `app.js` para el curso `2bach-ccss`. No se han inventado temas ni bloques.

### Bloques

| Bloque de la aplicación | Ejercicios |
|---|---:|
| Bloque de álgebra (`algebra`) | 12 |
| Bloque de análisis (`analisis`) | 12 |
| Bloque de probabilidad (`probabilidad`) | 12 |
| Bloque de estadística (`estadistica`) | 12 |

### Temas utilizados

| Índice runtime | Nombre exacto en la aplicación | Ejercicios |
|---:|---|---:|
| 0 | Matrices | 6 |
| 3 | Programación lineal | 6 |
| 4 | Límites y continuidad | 6 |
| 5 | Derivadas y aplicaciones | 12 |
| 8 | Probabilidad | 12 |
| 10 | Muestreo e inferencia estadística | 12 |

Los 48 ejercicios tienen clasificación global y los 104 subapartados tienen clasificación propia. Cuando los apartados de un ejercicio pertenecen a temas distintos, se conserva expresamente esa diferencia.

## Comunidad, materia y selección

Cada ejercicio exige los filtros canónicos:

`materia + comunidad + bloque + disponibilidad`

La comunidad es `andalucia` y la materia es `2bach-ccss`. La política prohíbe mezclar ejercicios de Castilla-La Mancha, Madrid y Andalucía, y mantiene separadas Matemáticas II y CCSS II.

La clave de deduplicación y no repetición es `exerciseId`. Se exige no repetir un ejercicio dentro de un mismo intento y se dejan registradas como dimensiones de auditoría futura `community` y `subject`.

## Modalidades y reglas de entrega

La capa canónica registra, sin conectarlas todavía al runtime:

- estudio/práctica;
- reto por bloque, que es la modalidad por bloques existente actualmente;
- examen por bloque como elegibilidad canónica pendiente de compatibilidad runtime;
- examen completo;
- respuesta abierta;
- elección múltiple únicamente como posible materialización futura por sesión.

`ai-trainer` está expresamente prohibido para 2.º de Bachillerato PAU: 0 ejercicios elegibles.

La elección múltiple no está habilitada para ninguno de los 48 ejercicios porque no existe todavía una respuesta validada ni distractores acreditados. No se guardan opciones A/B/C/D en el ejercicio canónico. La política futura prevista es materializarlas solo en una sesión concreta y barajarlas de forma determinista y reproducible; la respuesta correcta no queda vinculada permanentemente a una letra.

## Respuesta, solución y publicación

Los 48 ejercicios mantienen simultáneamente:

- `ANSWER_REVIEW_REQUIRED`;
- `SOLUTION_REVIEW_REQUIRED`;
- corrección automática no autorizada;
- solución pedagógica no autorizada;
- cero respuestas generadas;
- cero soluciones generadas;
- cero distractores generados;
- `NOT_PUBLISHED`.

Un ejercicio solo podrá autocorregirse cuando exista respuesta matemática correcta validada. Una solución solo podrá mostrarse cuando exista y haya sido validada pedagógicamente.

## Trazabilidad documental

Cada registro conserva como mínimo:

- autoridad institucional;
- ruta local del DOC oficial dentro del proyecto;
- `documentId` y `documentHash`;
- SHA-256 del documento y del texto recuperado;
- año, modelo, alternativa y pregunta cuando constan;
- rango de caracteres del ejercicio;
- `subpartId`, etiqueta, ordinal y posición de cada apartado;
- objetos `Equation.3`, MTEF, AST, MathML y hashes asociados cuando corresponden;
- `scoreEvidence` separado;
- criterio oficial, documento de criterio, hash, ámbito y rango;
- estados humanos de Equation.3 y de reconstrucción documental.

## Incompatibilidades reales con el runtime público

La inspección del runtime actual produjo tres incompatibilidades explícitas:

1. `ANDALUCIA_COMMUNITY_NOT_CONFIGURED`: el runtime público solo configura actualmente Castilla-La Mancha y Madrid.
2. `CANONICAL_LAYER_NOT_CONNECTED`: esta capa no se encuentra conectada al runtime, conforme a la prohibición de publicación.
3. `RUNTIME_BLOCK_MODE_IS_CHALLENGE_NOT_BLOCK_EXAM`: la modalidad real por bloques es un reto, no un examen por bloque equivalente al concepto canónico solicitado.

Estas diferencias se documentan y no se han resuelto inventando compatibilidades ni modificando `app.js`.

## Artefactos generados

La ejecución `run-a` conserva:

- los 48 ejercicios integrados;
- el índice Andalucía resultante de 1.666 ejercicios;
- libro de integración;
- conciliación antes/después;
- mapeo de taxonomía y entrega;
- compatibilidad con runtime;
- preservación de `sourceRecordId`;
- hashes semánticos;
- resumen de ejecución.

`run-b` y `run-order-reversed` contienen corridas equivalentes para reproducibilidad e invariancia frente al orden. `rollback.json` documenta el desacoplamiento lógico completo de la capa y la restauración del catálogo base de 1.618 registros sin mutar producción.

## Pruebas y criterios de cierre

Resultados obtenidos:

- verificador de integración: 24/24 comprobaciones;
- prueba específica de integración: 18/18;
- regresión Node: 202/202 en 21 archivos de prueba;
- regresión PowerShell: 1.542/1.542 en 5 archivos de prueba;
- doble corrida: hashes semánticos idénticos;
- orden invertido: hashes semánticos idénticos;
- rollback: `PASSED`, 1.618 ejercicios base restaurables y ninguna mutación de producción;
- fallos: 0.

Se verificó además:

- 1.618 → 1.666 ejercicios;
- 826 Matemáticas II sin cambios;
- 792 → 840 CCSS II;
- 48 ejercicios CCSS II 2012;
- 104 subapartados;
- 0 duplicados;
- 15.527/15.527 `sourceRecordId`;
- 55/55 objetos `Equation.3` validados;
- reconstrucción `ABCABC` validada;
- 48/48 respuestas pendientes y 48/48 soluciones pendientes;
- 0 ejercicios publicados;
- 0 `ai-trainer`;
- 0 `multiple-choice` habilitados;
- 0 archivos de producción modificados.

## Archivos de implementación

Nuevos:

- `catalog/pau-canonical/mathup.pau-canonical-doc-exercise.v1.schema.json`;
- `scripts/integrate-pau-canonical-andalucia-ccssii-2012.ps1`;
- `scripts/verify-pau-canonical-andalucia-ccssii-2012-integration.ps1`;
- `scripts/trial-rollback-pau-canonical-andalucia-ccssii-2012-integration.ps1`;
- `tests/pau-canonical-andalucia-ccssii-2012-integration.test.ps1`;
- `artifacts/pau-canonical-andalucia-ccssii-2012-integration/`;
- este informe.

Archivos existentes modificados: ninguno.

## Estado final de la fase

La integración paralela queda técnicamente preparada y auditada, pero no publicada. La futura conexión deberá resolver expresamente las incompatibilidades de comunidad y modalidad, conservar los filtros por comunidad/materia, validar respuestas y soluciones, y someter cualquier presentación `multiple-choice` a sus reglas de sesión sin utilizar `ai-trainer`.

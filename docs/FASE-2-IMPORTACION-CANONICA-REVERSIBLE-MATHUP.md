# Fase 2 — Importación canónica reversible de +MathUp

## Resultado ejecutivo

La Fase 2 se ha ejecutado como canalización paralela y no destructiva. No se ha conectado ningún artefacto a la aplicación pública, no se ha escrito en Supabase y no se han modificado bancos heredados, renderizadores ni skills.

La importación parte exclusivamente del inventario reproducible de Fase 0 y conserva literalmente las evidencias disponibles. No resuelve ejercicios, no completa metadatos desconocidos y no escoge entre respuestas o soluciones incompatibles.

| Magnitud | Resultado |
|---|---:|
| Registros procesados | 15.527 |
| Registros fuente | 10.466 |
| Observaciones runtime | 5.061 |
| Ejercicios originales reconciliados | 6.712 |
| Candidatos `mathup.exercise.v1` | 6.680 |
| `PASSED` | 1.639 |
| `REVIEW_REQUIRED` | 1.106 |
| `BLOCKED` | 3.935 |
| No convertidos | 32 |
| Inaccesibles reconciliados | 607 |

Los 32 no convertidos no han desaparecido: constan individualmente como evidencia auxiliar histórica, con `sourceRecordId`, origen y motivo `AUXILIARY_RECORD`.

## Implementación

Se han implementado:

- un importador determinista, aditivo e inmutable por ejecución;
- un libro de evidencias con un `sourceRecordId` UUIDv5 estable para cada uno de los 15.527 registros;
- correspondencias versionadas de cursos, materias, comunidades, dificultad y modalidades demostrables;
- un registro determinista de `candidateId`, `exerciseId` y revisión inicial;
- enlace de respuesta y solución únicamente cuando el valor observado es único dentro de la identidad;
- procedencia campo a campo, decisiones de enlace y conflictos de identidad;
- transformación al contrato `mathup.exercise.v1` sin completar información desconocida;
- validación integral con el validador aprobado de Fase 1;
- colas separadas `BLOCKED`, `REVIEW_REQUIRED` y `PASSED`;
- conciliación individual, cobertura por curso/materia y cobertura PAU por comunidad, año y convocatoria;
- clasificación individual de los 607 inaccesibles;
- manifiestos, hashes, doble ejecución, variante de orden y ensayo de rollback.

La identidad usa el espacio UUID fijo `8c82e6c2-7a41-5efc-8f23-6f77319eb9e2`. La semilla conserva la identidad heredada de Fase 0 y no depende del orden del sistema de archivos.

## Conciliación por curso y materia

| Curso | Materia | Originales | Candidatos | `PASSED` | `REVIEW_REQUIRED` | `BLOCKED` | No convertidos |
|---|---|---:|---:|---:|---:|---:|---:|
| 1.º ESO | Matemáticas | 967 | 967 | 502 | 256 | 209 | 0 |
| 2.º ESO | Matemáticas | 521 | 521 | 294 | 181 | 46 | 0 |
| 3.º ESO | Matemáticas | 673 | 673 | 354 | 266 | 53 | 0 |
| 4.º ESO A | Matemáticas A | 388 | 388 | 198 | 137 | 53 | 0 |
| 4.º ESO B | Matemáticas B | 562 | 562 | 291 | 209 | 62 | 0 |
| 1.º Bachillerato | Matemáticas I | 76 | 76 | 0 | 4 | 72 | 0 |
| 1.º Bachillerato | CCSS I | 212 | 212 | 0 | 53 | 159 | 0 |
| 2.º Bachillerato | Matemáticas II | 1.921 | 1.921 | 0 | 0 | 1.921 | 0 |
| 2.º Bachillerato | CCSS II | 1.360 | 1.360 | 0 | 0 | 1.360 | 0 |
| Sin determinar | Sin materia demostrable | 32 | 0 | 0 | 0 | 0 | 32 |

La suma es 6.712 identidades originales: 6.680 candidatos más 32 evidencias no convertidas y explícitamente conciliadas.

## Conciliación PAU por materia y comunidad

| Materia | Comunidad | Originales | `PASSED` | `REVIEW_REQUIRED` | `BLOCKED` |
|---|---|---:|---:|---:|---:|
| Matemáticas II | Castilla-La Mancha | 1.021 | 0 | 0 | 1.021 |
| Matemáticas II | Madrid | 795 | 0 | 0 | 795 |
| Matemáticas II | Sin determinar | 105 | 0 | 0 | 105 |
| CCSS II | Castilla-La Mancha | 384 | 0 | 0 | 384 |
| CCSS II | Madrid | 892 | 0 | 0 | 892 |
| CCSS II | Sin determinar | 84 | 0 | 0 | 84 |

Cobertura de metadatos demostrables:

| Materia | Originales | Comunidad conocida | Año conocido | Convocatoria conocida |
|---|---:|---:|---:|---:|
| Matemáticas II | 1.921 | 1.816 | 1.908 | 1.366 |
| CCSS II | 1.360 | 1.276 | 1.296 | 994 |

Todos los candidatos PAU permanecen bloqueados porque las rutas heredadas no demuestran una modalidad canónica PAU autorizada para publicación. La importación no ha inventado esa modalidad. Además, 189 carecen de comunidad verificable. Año y convocatoria ausentes se conservan como desconocidos y aparecen en la conciliación, sin inferencias editoriales.

## Situación de los 607 inaccesibles

| Causa | Cantidad | Resultado |
|---|---:|---|
| Cargados pero no materializados por rutas actuales | 572 | `BLOCKED` |
| Evidencia auxiliar histórica | 32 | `NOT_CONVERTED` |
| Duplicado exacto accesible por otra identidad | 3 | `BLOCKED`, pendiente de decisión de identidad |

Desglose por curso/estado:

- 1.º Bachillerato CCSS I: 6 `BLOCKED`.
- 2.º Bachillerato CCSS II: 35 `BLOCKED`.
- 2.º Bachillerato Matemáticas II: 534 `BLOCKED`.
- Sin determinar: 32 `NOT_CONVERTED`.

Ninguno de los 607 ha sido descartado ni silenciado. Cada fila conserva origen, `sourceRecordId`, identidad propuesta, curso, materia, tema/bloque, procedencia, comunidad cuando consta, estado e impedimentos de publicación.

## Diagnóstico de validación

Principales diagnósticos, que pueden solaparse en un mismo candidato:

| Código | Casos |
|---|---:|
| `SOLUTION_REVIEW_REQUIRED` | 3.518 |
| `ANSWER_MISSING` | 3.256 |
| `SOLUTION_MISSING` | 3.256 |
| `PAU_MODALITY_UNDECLARED` | 3.281 |
| `CHOICES_REQUIRED` | 2.668 |
| `MATH_REPRESENTATION_UNDECLARED` | 1.431 |
| `MODALITY_UNDEMONSTRATED` / `MODALITIES_MISSING` | 1.074 |
| `SYMBOLIC_EQUIVALENCE_NOT_PROVEN` | 1.041 |
| `PAU_DETAIL_INCOMPLETE` | 941 |
| `UNMAPPED_TOPIC` | 575 |
| `SOLUTION_DEVELOPMENT_INSUFFICIENT` | 235 |
| `COMMUNITY_UNMAPPED` / `PAU_COMMUNITY_MISSING` | 189 |
| `REVIEW_FINDINGS_OPEN` | 143 |
| `SOLUTION_FINAL_ONLY` | 129 |
| `STATEMENT_VARIANTS` | 33 |
| `ANSWER_CONFLICT` / `SOLUTION_CONFLICT` / `TOPIC_VARIANTS` / `OPTIONS_VARIANTS` | 30 cada uno |
| `COURSE_CONFLICT` | 11 |
| `CHOICE_MATHEMATICALLY_EQUIVALENT` / `MULTIPLE_CORRECT_EQUIVALENTS` | 9 cada uno |
| `CORRUPTED_CHARACTERS` | 4 |
| `CHOICE_DUPLICATED` | 2 |

El registro de conflictos contiene 71 conflictos trazables. Los 63 grupos de duplicado exacto y los 428 grupos de posible equivalencia de Fase 0 se conservan como colas de revisión, sin fusionarlos automáticamente.

Hay 106 referencias a activos gráficos que el inventario de Fase 0 detectó pero no capturó con URI/hash. Permanecen como `REFERENCE_NOT_CAPTURED_IN_PHASE0` y requieren recuperación de evidencia antes de publicación.

## Pruebas y criterios de cierre ejecutados

- Sintaxis de los cuatro módulos de ejecución: correcta.
- Validador de Fase 1: 22/22 pruebas superadas sin modificar el esquema ni el validador.
- Pruebas integrales de Fase 2: 12/12 superadas, incluidas la estabilidad de `exerciseId` entre revisiones y la conservación de los grupos de duplicados/equivalentes de Fase 0.
- Total: 34/34 pruebas superadas.
- Libro de evidencias: 15.527 IDs únicos y 15.527 relaciones terminales únicas.
- Conciliación: 6.712/6.712 identidades originales.
- Inaccesibles: 607/607 presentes.
- Doble ejecución `run-a` / `run-b`: 26/26 artefactos semánticos idénticos por SHA-256.
- Variante con arrays de entrada invertidos: 25/25 artefactos semánticos comparables idénticos. Se excluye únicamente `input-manifest.json`, que debe reflejar que el fichero de entrada de prueba es distinto.
- No conexión pública: `index.html` y `app.js` no referencian Fase 2.
- Ensayo de rollback: superado; sandbox retirado, 145 archivos protegidos comprobados por hash y 145 sin cambios.
- Escrituras externas/Supabase: ninguna.

## Artefactos generados

Código y configuración:

- `catalog/fase2-taxonomy-mappings.v1.json`
- `scripts/fase2-import-catalog.mjs`
- `scripts/fase2-verify-reproducibility.mjs`
- `scripts/fase2-rollback-trial.mjs`
- `scripts/fase2-make-order-variant.mjs`
- `tests/fase2-import-catalog.test.mjs`
- `docs/FASE-2-IMPORTACION-CANONICA-REVERSIBLE-MATHUP.md`

Artefactos globales:

- `artifacts/fase2/order-variant-inventory.json`
- `artifacts/fase2/reproducibility-result.json`
- `artifacts/fase2/order-invariance-result.json`
- `artifacts/fase2/rollback-trial-result.json`

Ejecuciones inmutables:

- `artifacts/fase2/runs/run-a/` — 29 archivos.
- `artifacts/fase2/runs/run-b/` — 29 archivos.
- `artifacts/fase2/runs/run-order-variant/` — 29 archivos.

Cada ejecución contiene los 26 artefactos semánticos definidos en el plan, más `run-manifest.json`, `rollback-manifest.json` y `checksums.sha256`. En total, `artifacts/fase2/` contiene 91 archivos.

## Archivos existentes modificados

Ninguno. Todos los cambios de esta fase son archivos nuevos y paralelos. Producción permanece intacta.

## Limitaciones y decisiones humanas pendientes

1. Los 32 registros auxiliares sin clasificación educativa demostrable no deben convertirse hasta determinar su función.
2. Los 3.256 candidatos sin respuesta y sin solución no pueden publicarse ni completarse automáticamente.
3. Los conflictos de respuesta, solución, curso, tema u opciones requieren resolución humana con evidencia fuente.
4. Los posibles equivalentes necesitan validación matemática; no se han fusionado.
5. Los 3.281 candidatos PAU necesitan una asignación explícita y aprobada de modalidad canónica; 189 necesitan además comunidad verificada.
6. Los temas no mapeados, notación deteriorada, equivalencias de opciones y activos sin capturar deben revisarse antes de publicación.
7. `PASSED` significa que el candidato supera las reglas automáticas actuales; no implica aprobación editorial humana ni publicación.
8. Supabase continúa deliberadamente sin modificaciones. La carga transaccional y la conexión al runtime pertenecen a una fase posterior y requieren autorización expresa.

## Reversibilidad

Cada ejecución declara todos sus archivos en `rollback-manifest.json` y restringe la retirada a su propio directorio bajo `artifacts/fase2/runs/`. El ensayo creó y retiró únicamente un sandbox controlado dentro de `artifacts/fase2`, y confirmó por hash que no varió ningún archivo protegido. No se ha modificado historial Git ni ningún sistema externo.

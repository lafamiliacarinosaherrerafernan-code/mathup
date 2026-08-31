# Fase 2C — Normalización matemática y preparación del renderizado de +MathUp

## 1. Resultado ejecutivo

La Fase 2C se ha implementado como una capa completamente paralela, determinista, reversible y desconectada de producción. No se han modificado los bancos heredados, `data/`, la aplicación pública, `index.html`, `app.js`, Supabase, los renderizadores, las skills, los contratos de Fase 1/Fase 2B ni los artefactos de fases anteriores.

La ejecución cubre exactamente las 16.783 entidades de notación de Fase 2B y conserva:

- 15.527/15.527 registros fuente;
- 6.712/6.712 ejercicios originales;
- 607/607 ejercicios inaccesibles;
- 7.485 ejercicios `mathup.exercise.v2`;
- 4.649 respuestas;
- 4.649 soluciones;
- 15.527 `sourceRecordId`, sin desapariciones.

No se ha publicado ningún ejercicio ni se ha creado ninguna dependencia desde el runtime público hacia Fase 2C.

## 2. Arquitectura implementada

### 2.1 Contratos acompañantes nuevos

- `catalog/normalization/mathup.math-document.v1.schema.json`
- `catalog/normalization/mathup.normalization-decision.v1.schema.json`
- `catalog/normalization/mathup.math-representation.v1.schema.json`
- `catalog/normalization/mathup.visual-fixture.v1.schema.json`

Los contratos existentes permanecen intactos. Los nuevos contratos describen, respectivamente, el documento mixto, la decisión de normalización, las representaciones derivadas y los casos del corpus visual.

### 2.2 Biblioteca aislada

- `catalog/normalization/canonical-math-ast.mjs`
- `catalog/normalization/normalize-math-structure.mjs`
- `catalog/normalization/serialize-normalized-latex.mjs`
- `catalog/normalization/validate-math-document.mjs`

El modelo separa texto literal, estructura matemática tipada, representación derivada y composición visual. La evidencia original no se sustituye por LaTeX o MathML.

### 2.3 Scripts de ejecución y auditoría

- `scripts/fase2c-classify-normalization.mjs`
- `scripts/fase2c-normalize-catalog.mjs`
- `scripts/fase2c-build-visual-corpus.mjs`
- `scripts/fase2c-verify-reproducibility.mjs`
- `scripts/fase2c-rollback-trial.mjs`

### 2.4 Pruebas nuevas

- `tests/fase2c-math-contracts.test.mjs`
- `tests/fase2c-normalization.test.mjs`
- `tests/fase2c-json-solutions.test.mjs`
- `tests/fase2c-reproducibility.test.mjs`
- `tests/fase2c-visual-fixtures.test.mjs`

### 2.5 Artefactos generados

Los artefactos reproducibles se encuentran bajo `artifacts/fase2c/`:

- `runs/run-a/`: manifiestos, decisiones, documentos, representaciones, validaciones, conciliación y colas de revisión;
- `reproducibility/`: segunda ejecución y ejecución con orden invertido;
- `reproducibility-summary.json`;
- `rollback-trial.json`;
- `test-summary.json`;
- `visual/index.html`;
- `visual/visual-fixtures.json`;
- `visual/visual-corpus-summary.json`;
- `visual/visual-results.json`.

No se ha modificado ningún archivo existente. Todos los archivos de implementación, prueba, artefactos e informe de esta fase son nuevos.

## 3. Clasificación exacta de las 16.783 entidades

| Disposición primaria | Entidades |
|---|---:|
| `SAFE_AUTOMATIC_NORMALIZATION` | 4.075 |
| `SOURCE_REVIEW_REQUIRED` | 1.022 |
| `MATHEMATICAL_REVIEW_REQUIRED` | 0 |
| `VISUAL_REVIEW_REQUIRED` | 7.067 |
| `NO_ACTION_REQUIRED` | 4.619 |
| **Total** | **16.783** |

La ausencia de casos en `MATHEMATICAL_REVIEW_REQUIRED` no declara corrección matemática. Significa que ninguna transformación ejecutada necesitó elegir entre interpretaciones matemáticas: los casos ambiguos se mantuvieron sin transformación y se dirigieron a revisión de fuente o visual según la evidencia disponible.

## 4. Errores estructurales y riesgos de renderizado

### 4.1 Los 3.756 errores estructurales

| Resultado | Entidades |
|---|---:|
| Normalizadas automáticamente con regla reversible | 3.617 |
| Conservadas para revisión de fuente | 139 |
| **Total** | **3.756** |

Las 3.617 transformaciones seguras incluyen principalmente la extracción exacta y reversible de estructuras serializadas y reclasificaciones demostrables. Las 139 restantes no se tocaron porque una reparación no podía probarse sin consultar o reinterpretar la fuente.

### 4.2 Los 7.525 `RENDERING_RISK`

| Resultado | Entidades |
|---|---:|
| Estructura validada y representación derivada segura | 458 |
| Pendientes de revisión visual | 7.067 |
| **Total** | **7.525** |

No se declara que las 7.067 entidades pendientes estén corregidas. El corpus visual demuestra la capacidad de las estructuras tipadas soportadas, pero no autoriza a reinterpretar los literales ambiguos del catálogo.

La ejecución produjo 916 representaciones derivadas validadas en total. LaTeX se generó únicamente desde árboles validados. MathML se generó únicamente desde esos mismos árboles y fue validado como estructura derivada; ninguna etiqueta histórica fue aceptada por su nombre.

## 5. Incidencias específicas

### 5.1 Las 3.295 soluciones con JSON serializado

- analizadas: 3.295/3.295;
- extracción aceptada: 3.295;
- rechazada: 0;
- claves perdidas: 0;
- cambios de orden de pasos: 0;
- respuestas finales fabricadas: 0.

La forma histórica localizada era reconocible y el análisis permitió una reconstrucción semántica exacta. Cada registro conserva hash del literal original, orden de claves, orden de bloques, `solutionId`, `exerciseId`, `sourceRecordId`, procedencia y respuesta final externa cuando existía. La aceptación es exclusivamente estructural; no certifica la corrección matemática ni la suficiencia pedagógica de la solución.

### 5.2 Las 494 falsas etiquetas MathML

- auditadas: 494/494;
- reclasificadas en la capa paralela: 494;
- MathML fabricado para justificar la etiqueta histórica: 0.

El literal y la etiqueta histórica se conservan como evidencia. El MathML derivado de otros casos solo se produce desde un árbol validado.

### 5.3 Las 106 falsas referencias de imagen

- auditadas: 106/106;
- reclasificadas en la capa paralela: 106;
- imágenes o figuras fabricadas: 0.

No se asumió que una cadena etiquetada como imagen correspondiera a un recurso real sin ruta, hash o evidencia verificable.

### 5.4 Los 883 `SOURCE_CORRUPTION`

- conservados en cola independiente: 883/883;
- reparaciones silenciosas: 0.

Cada caso mantiene su diagnóstico y referencia a la evidencia original. La capacidad de mostrar una estructura de control no elimina el estado de corrupción de fuente.

### 5.5 Las 129 soluciones no reconciliadas

- aisladas e inventariadas: 129/129;
- asociaciones automáticas: 0.

No se emplearon para completar otro ejercicio ni se normalizaron como si su identidad estuviera resuelta.

## 6. Familias matemáticas

La detección es no excluyente: una entidad puede pertenecer a varias familias. Los conteos observados son:

| Familia detectada | Entidades |
|---|---:|
| Ecuaciones | 8.748 |
| Potencias y raíces | 4.930 |
| Intervalos y conjuntos | 4.290 |
| Unidades | 3.689 |
| Fracciones | 2.071 |
| Coordenadas | 1.597 |
| Multilínea | 1.601 |
| Símbolos griegos | 1.217 |
| Sistemas | 1.198 |
| Inecuaciones | 1.142 |
| Implicaciones y aproximaciones | 834 |
| Subíndices | 674 |
| Matrices | 638 |
| Valor absoluto | 479 |
| Derivadas | 434 |
| Fracciones complejas | 385 |
| Determinantes | 376 |
| Probabilidad y combinatoria | 358 |
| Integrales indefinidas | 353 |
| Vectores | 318 |
| Límites | 204 |
| Logaritmos y exponenciales | 68 |
| Integrales definidas | 15 |
| Funciones a trozos | 3 |
| Sin familia matemática que requiera acción | 3.439 |

El árbol y los serializadores implementan controles explícitos para las 28 familias requeridas: potencias, subíndices, fracciones, raíces, valor absoluto, ecuaciones, sistemas, inecuaciones, matrices, determinantes, límites, derivadas, integrales definidas e indefinidas, sumatorios, productos, logaritmos, exponenciales, vectores, coordenadas, intervalos, conjuntos, funciones a trozos, expresiones multilínea, probabilidad, combinatoria, símbolos griegos y unidades.

De los casos reales susceptibles de parseo seguro, el inventario registra 854 como `unknown` y los mantiene sin inventar estructura. Esta cifra forma parte de las colas de revisión y es una limitación deliberada, no una pérdida.

## 7. Corpus visual aislado

Se generaron 28 fixtures de control, uno por familia requerida, y cada fixture se probó en los contextos de enunciado, respuesta y solución: 84 expresiones MathML por resolución. Las expresiones del control son sintéticas y están marcadas como `VISUAL_CONTROL_NOT_CATALOG_CONTENT`; cada fixture incluye un enlace de evidencia a una muestra real, sin afirmar que esa muestra haya sido reparada.

| Ancho | Fixtures | Expresiones | Desbordamientos | Recortes | JSON crudo | LaTeX crudo | Resultado |
|---:|---:|---:|---:|---:|---:|---:|---|
| 320 px | 28 | 84 | 0 | 0 | 0 | 0 | Superado |
| 375 px | 28 | 84 | 0 | 0 | 0 | 0 | Superado |
| 768 px | 28 | 84 | 0 | 0 | 0 | 0 | Superado |
| 1280 px | 28 | 84 | 0 | 0 | 0 | 0 | Superado |

La revisión visual confirmó fracciones verticales, superíndices y subíndices diferenciados, radicales, llaves proporcionadas, matrices alineadas, determinantes con barras adaptativas, límites, integrales, vectores, funciones a trozos y expresiones multilínea sin solapamiento ni contenido oculto en el corpus aislado.

Incidencias visuales del corpus: ninguna. Limitación obligatoria: las 7.067 entidades reales en `VISUAL_REVIEW_REQUIRED` siguen pendientes y no quedan aprobadas por estos controles sintéticos.

## 8. Pruebas y regresión

| Suite | Pruebas | Superadas | Fallidas |
|---|---:|---:|---:|
| Fase 1 original | 22 | 22 | 0 |
| Fase 2 | 12 | 12 | 0 |
| Fase 2B | 33 | 33 | 0 |
| Fase 2C — JSON | 2 | 2 | 0 |
| Fase 2C — contratos | 3 | 3 | 0 |
| Fase 2C — normalización | 4 | 4 | 0 |
| Fase 2C — reproducibilidad | 1 | 1 | 0 |
| Fase 2C — corpus visual | 2 | 2 | 0 |
| **Total** | **79** | **79** | **0** |

Además, los 16.783 documentos/decisiones generados superaron su validación estructural: 16.783 válidos, 0 inválidos.

## 9. Reproducibilidad e invariancia

Se ejecutó el importador-normalizador dos veces con las mismas entradas y una tercera vez con el orden de entrada invertido.

- doble ejecución idéntica: sí;
- invariancia frente al orden: sí;
- digest semántico de las tres ejecuciones: `da4448d154738494d9e4ad1e51a04c9c0d608098a8255bc6a097b7dfa8847259`;
- aleatoriedad en normalización: ninguna.

## 10. Rollback y protección de producción

El ensayo de rollback creó una copia aislada de la capa de Fase 2C, la retiró por completo y volvió a comprobar los hashes protegidos.

- artefactos aislados creados: sí;
- artefactos aislados retirados: sí;
- archivos protegidos sin cambios: sí;
- dependencias públicas de Fase 2C: 0;
- resultado del ensayo: superado.

Los hashes protegidos incluyen `index.html`, `app.js`, `math-renderer.js`, contratos y validadores de Fase 1, y todos los contratos y módulos de `catalog/v2/`.

## 11. Limitaciones y trabajo humano pendiente

1. Las 7.067 entidades `VISUAL_REVIEW_REQUIRED` necesitan revisión visual individual o por lotes homogéneos antes de cualquier publicación.
2. Las 1.022 entidades `SOURCE_REVIEW_REQUIRED` no pueden corregirse sin evidencia documental adicional; incluyen los 883 casos de corrupción de fuente y 139 errores estructurales no normalizables de forma inequívoca.
3. Las 129 soluciones no reconciliadas siguen aisladas hasta resolver su identidad.
4. La fase no valida corrección matemática, suficiencia pedagógica ni correspondencia entre enunciado, respuesta y solución.
5. Los 854 casos reales con estructura no reconocida no se reinterpretaron.
6. El corpus visual prueba el soporte técnico de las familias, no la corrección de cada expresión real pendiente.
7. No se generaron soluciones, respuestas, pasos, símbolos, MathML histórico, imágenes ni figuras ausentes.

## 12. Estado de cierre técnico

La implementación cumple el objetivo de producir una capa matemática auditable y reversible, no un catálogo publicable. La conservación, clasificación, regresión, reproducibilidad, invariancia y rollback están demostrados. La publicación debe seguir bloqueada hasta completar las revisiones de fuente y visuales indicadas.


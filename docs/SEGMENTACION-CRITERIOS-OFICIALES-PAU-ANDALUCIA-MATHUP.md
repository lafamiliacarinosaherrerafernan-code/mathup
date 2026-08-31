# Segmentación y vinculación de criterios oficiales PAU de Andalucía

## 1. Alcance y condición de esta fase

Esta fase construye una capa paralela, reproducible y no publicada que baja la relación documental `criterio oficial ↔ examen` hasta `criterio oficial → ejercicio → subpart` únicamente cuando el ámbito queda demostrado por marcas editoriales explícitas del documento.

No se han generado respuestas, soluciones ni distractores. Tampoco se ha promovido ninguna evidencia a `ANSWER_OFFICIAL_VERIFIED`, `ANSWER_REVIEW_REQUIRED` resuelto, `SOLUTION_REVIEW_REQUIRED` resuelto o estado de publicación.

La extracción aplica estas reglas:

- los 171 pares `CRITERIA_MATCH_EXACT` se procesan con segmentación conservadora;
- los 4 pares `CRITERIA_MATCH_STRUCTURAL` se inspeccionan, pero no se vinculan cuando el texto no demuestra de forma inequívoca ejercicio y apartado;
- los 9 pares `CRITERIA_MATCH_AMBIGUOUS` pasan íntegramente a revisión humana sin enlaces automáticos;
- una puntuación o una frase como “hasta 1 punto” nunca se interpreta como respuesta;
- un método de corrección no se interpreta como desarrollo pedagógico;
- la unidad de vinculación es el `subpart` cuando existe una etiqueta explícita `a)`, `b)`, `c)`, etc.;
- no se asignan listas de resultados a apartados por mera posición;
- toda expresión deteriorada o no inequívoca queda como `CRITERIA_MATH_REVIEW_REQUIRED`.

## 2. Fuentes y trazabilidad

Se han utilizado exclusivamente los artefactos oficiales y canónicos ya conservados en el proyecto:

- registro de 184 correspondencias examen–criterio de Andalucía;
- registro documental oficial de Andalucía;
- 1.618 ejercicios canónicos base ya versionados;
- superposición paralela de los 48 ejercicios CCSS II 2012 y sus 104 subapartados;
- diagnósticos documentales de los 12 DOC oficiales de 2012, incluidos los seis criterios;
- evidencias finales de validación humana de Equation.3 y de reconstrucción `ABCABC`.

Cada fragmento conserva identificador estable, documento criterio, hash documental, rango de caracteres, literal original, categorías coexistentes, estado de notación y ámbito demostrado. Cada enlace conserva además ejercicio, apartado cuando procede, clasificación documental y regla de unión.

Los hashes de todas las entradas se registran en `artifacts/pau-andalucia-criteria-segmentation/input-hashes.json`.

## 3. Resultado global de Andalucía

### 3.1 Criterios

| Concepto | Cantidad |
|---|---:|
| Criterios totales | 184 |
| `CRITERIA_MATCH_EXACT` | 171 |
| `CRITERIA_MATCH_STRUCTURAL` | 4 |
| `CRITERIA_MATCH_AMBIGUOUS` | 9 |
| Criterios segmentados automáticamente | 68 |
| Criterios que permanecen en revisión | 116 |

Los 68 criterios segmentados pertenecen a pares `EXACT`. De los restantes, 103 pares `EXACT` no ofrecieron una estructura de ejercicio/apartado suficientemente demostrable en la extracción disponible; los 4 `STRUCTURAL` se mantuvieron en revisión y los 9 `AMBIGUOUS` no produjeron ningún enlace.

### 3.2 Fragmentos y clasificación del contenido

Se han registrado 1.097 fragmentos de criterio. Las categorías no son excluyentes.

| Categoría | Fragmentos |
|---|---:|
| `OFFICIAL_SCORING_GUIDANCE` | 1.093 |
| `OFFICIAL_METHOD` | 244 |
| `CRITERIA_SCOPE_AMBIGUOUS` | 4 |
| `OFFICIAL_FINAL_ANSWER` | 0 |
| `OFFICIAL_INTERMEDIATE_RESULT` | 0 |
| `OFFICIAL_FULL_DEVELOPMENT` | 0 |
| `OFFICIAL_PARTIAL_DEVELOPMENT` | 0 |
| Fragmentos exclusivamente de puntuación | 849 |
| `CRITERIA_MATH_REVIEW_REQUIRED` | 283 |

La ausencia de candidatos de respuesta es un resultado de seguridad, no un fallo de ejecución: en el corpus procesable no se localizó un resultado final explícito cuyo literal matemático y ámbito ejercicio/apartado fueran simultáneamente inequívocos. No se ha convertido una pauta de puntuación, un verbo metodológico o una secuencia editorial en respuesta.

### 3.3 Enlaces demostrados

| Concepto | Cantidad |
|---|---:|
| Ejercicios con algún fragmento vinculado | 482 |
| Subapartados vinculados | 612 |
| Enlaces fragmento–ámbito | 1.097 |
| Ejercicios vinculados de Matemáticas II | 212 |
| Ejercicios vinculados de CCSS II | 270 |
| `OFFICIAL_ANSWER_CANDIDATE` | 0 |

No se ha cruzado ningún criterio entre materias ni se ha creado ningún enlace desde los nueve pares ambiguos.

## 4. Resultado prioritario: CCSS II 2012

Los seis pares examen–criterio están acreditados como `CRITERIA_MATCH_EXACT`. La estructura explícita de sus DOC permitió vincular documentalmente los 48 ejercicios y los 104 subapartados sin recurrir a inferencias por posición.

| Concepto | Cantidad |
|---|---:|
| Pares examen–criterio exactos | 6 |
| Ejercicios canónicos | 48 |
| Ejercicios con criterio vinculado | 48 |
| Subapartados canónicos | 104 |
| Subapartados con criterio vinculado | 104 |
| Ejercicios con evidencia de método oficial | 16 |
| Ejercicios con desarrollo oficial completo o parcial | 0 |
| Ejercicios con `OFFICIAL_ANSWER_CANDIDATE` | 0 |
| Ejercicios sin evidencia suficiente de respuesta | 48 |

Los 16 casos con `OFFICIAL_METHOD` conservan una indicación metodológica del corrector, pero no se contabilizan como desarrollo oficial ni como solución pedagógica. Las 48 unidades mantienen sus estados `ANSWER_REVIEW_REQUIRED` y `SOLUTION_REVIEW_REQUIRED`.

## 5. Cola de revisión

La cola contiene 941 incidencias de alcance; son registros de diagnóstico y no criterios únicos.

| Motivo | Registros |
|---|---:|
| `EXERCISE_SCOPE_NOT_UNIQUE` | 886 |
| `SUBPART_SCOPE_NOT_DEMONSTRATED` | 46 |
| `CRITERIA_MATCH_AMBIGUOUS_NO_AUTOLINK` | 9 |

Adicionalmente, 283 fragmentos conservan `CRITERIA_MATH_REVIEW_REQUIRED`. Estos casos requieren contraste documental humano antes de extraer una expresión matemática estructurada. No se ha reconstruido notación por intuición.

## 6. Contratos y artefactos

Se han creado tres contratos cerrados y versionados para esta capa:

- `mathup.pau-criterion-fragment.v1`;
- `mathup.pau-criterion-scope-link.v1`;
- `mathup.pau-official-answer-candidate.v1`.

Los artefactos principales de la corrida A son:

- `criterion-fragments.jsonl`;
- `criterion-scope-links.jsonl`;
- `official-answer-candidates.jsonl`;
- `processed-criteria.jsonl`;
- `review-queue.jsonl`;
- `summary.json`.

Se han generado una segunda corrida y otra con orden invertido. Los hashes semánticos de las tres coinciden. El manifiesto de rollback declara eliminación exclusiva de esta salida paralela y cero archivos de producción modificados.

## 7. Salvaguardas e integridad

| Comprobación | Resultado |
|---|---:|
| Andalucía total | 1.666 |
| Matemáticas II | 826 |
| CCSS II | 840 |
| CCSS II 2012 | 48 |
| Respuestas verificadas automáticamente | 0 |
| Respuestas generadas | 0 |
| Soluciones generadas | 0 |
| Distractores generados | 0 |
| Enlaces automáticos desde pares ambiguos | 0 |
| Equation.3 humanamente validados | 55/55 |
| Ejercicios dependientes Equation.3 validados | 27/27 |
| `ABCABC` | `DOCUMENT_LAYOUT_HUMAN_VALIDATED` |

No se ha modificado ningún banco, `data/`, contrato anterior, catálogo existente, selector, runtime, Supabase, renderizador o skill.

## 8. Pruebas

- Pruebas específicas de esta fase: 10/10 superadas.
- Regresión Node completa: 212/212 superadas.
- Regresión PowerShell de la integración paralela CCSS II 2012: 18/18 superadas.
- Doble corrida: idéntica.
- Invariancia al orden: verificada.
- Rollback: reversible y limitado a la capa paralela.

## 9. Conclusión y trabajo pendiente

La fase demuestra que es posible segmentar con seguridad una parte del corpus oficial y, de forma completa, los seis criterios de CCSS II 2012 hasta ejercicio y subapartado. Sin embargo, el contenido localizado es predominantemente una pauta de puntuación y método. No aporta por sí solo respuestas finales ni soluciones pedagógicas verificadas.

Quedan pendientes de revisión documental humana:

- los 9 pares ambiguos;
- los 4 pares estructurales;
- los 103 pares exactos cuya estructura extraída no prueba un ámbito único;
- los 46 ámbitos de subapartado no demostrados;
- las 283 expresiones con notación no recuperable de forma inequívoca.

Esta capa no autoriza publicación ni altera los estados de respuesta o solución del catálogo.

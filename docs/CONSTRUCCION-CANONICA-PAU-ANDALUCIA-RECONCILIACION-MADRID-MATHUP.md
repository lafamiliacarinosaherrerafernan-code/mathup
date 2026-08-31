# Construcción canónica PAU de Andalucía y reconciliación oficial de Madrid

## 1. Alcance y garantías

Esta fase construye una capa documental paralela y desconectada de producción. No modifica bancos, `data/`, aplicación pública, selector de comunidades, Supabase, renderizadores, skills ni contratos anteriores. No genera respuestas, soluciones o distractores y no publica ejercicios.

La fuente de autoridad es la biblioteca institucional local, sus SHA-256 y sus registros de procedencia. Los bancos históricos de Madrid solo se usan como evidencia derivada. La aplicación de `skill-editor-enunciados` obliga a conservar literalmente la fuente oficial, separar alternativas independientes, mantener los apartados dentro del ejercicio y enviar a revisión cualquier estructura matemática que la extracción no demuestre.

Las puntuaciones editoriales PAU —por ejemplo `(2,5 puntos)`, `(2 puntos)`, `(1,25 puntos)` o `(1 punto)`— no forman parte del enunciado para el alumno. Cuando constan se conservan separadamente como `scoreEvidence`, con literal, página, rango y clasificación `EDITORIAL_ASSESSMENT_METADATA`. Se han encontrado 376 puntuaciones de ejercicio y 2.082 de apartado; quedan cero enunciados o apartados que comiencen con esas puntuaciones.

## 2. Contratos acompañantes

Se han creado, sin modificar `mathup.exercise.v2`, los contratos paralelos:

- `mathup.pau-exam-session.v1`: sesión/documento, comunidad, materia y metadatos específicos opcionales.
- `mathup.pau-canonical-exercise.v1`: ejercicio documental, alternativa, apartados, rangos, hashes y estados.
- `mathup.pau-official-criterion-link.v1`: relación documental entre examen y criterio, sin promoción pedagógica.
- `mathup.pau-historical-reconciliation.v1`: conciliación histórica de Madrid y sus diferencias.
- `community-profiles.v1`: modelo extensible por código de comunidad; los campos andaluces no se fuerzan sobre Madrid o Castilla-La Mancha.

Las identidades se generan determinísticamente a partir de evidencia documental. Los ejercicios incorporan hash de documento, materia, numeración oficial, alternativa, página y desplazamiento de fuente; los apartados se derivan del ejercicio y su etiqueta normalizada. El orden accidental de carga no interviene.

## 3. Andalucía

### 3.1 Resultado global

| Métrica | Resultado |
|---|---:|
| Documentos oficiales deduplicados por SHA-256 | 210 |
| Sesiones documentales | 210 |
| Ejercicios canónicos propuestos | 1.618 |
| Matemáticas II | 826 |
| Matemáticas Aplicadas a las CCSS II | 792 |
| Subapartados | 2.610 |
| Relaciones con criterios oficiales | 184 |
| Relaciones promovidas automáticamente a ejercicio/apartado | 0 |
| `CRITERIA_MATCH_EXACT` conservadas | 171 |
| `CRITERIA_MATCH_STRUCTURAL` conservadas | 4 |
| `CRITERIA_MATCH_AMBIGUOUS` conservadas | 9 |
| Combinaciones de convocatoria no verificable | 37 (18 Matemáticas II, 19 CCSS II) |
| Ejercicios con revisión de notación | 318 |
| Ejercicios con respuesta/solución pendientes | 1.618 / 1.618 |

Las 184 correspondencias se mantienen con ámbito `EXAM_DOCUMENT`. Incluso las 171 exactas son solo contraste documental; ningún criterio se convierte automáticamente en respuesta ni en solución de +MathUp.

### 3.2 Distribución anual

| Año | Matemáticas II (ej./apart.) | CCSS II (ej./apart.) |
|---:|---:|---:|
| 2010 | 48 / 0 | 48 / 108 |
| 2011 | 48 / 0 | 56 / 127 |
| 2012 | 48 / 0 | 0 / 0 |
| 2013 | 47 / 70 | 48 / 105 |
| 2014 | 48 / 73 | 48 / 99 |
| 2015 | 48 / 63 | 48 / 97 |
| 2016 | 40 / 50 | 40 / 82 |
| 2017 | 46 / 78 | 48 / 110 |
| 2018 | 56 / 85 | 48 / 103 |
| 2019 | 48 / 0 | 48 / 104 |
| 2020 | 96 / 94 | 96 / 234 |
| 2021 | 48 / 63 | 48 / 117 |
| 2022 | 56 / 70 | 66 / 152 |
| 2023 | 48 / 48 | 48 / 111 |
| 2024 | 48 / 59 | 48 / 105 |
| 2025 | 35 / 54 | 42 / 107 |
| 2026 | 18 / 26 | 12 / 16 |

La cobertura documental anual 2010–2026 permanece registrada para ambas materias. Los seis exámenes oficiales de CCSS II de 2012 están en formato DOC, están censados con autoridad, URL, hash y ruta, pero esta fase no dispone de extracción literal segura para DOC. Por ello no se han materializado ejercicios de esos seis documentos y permanecen `NON_PDF_REVIEW_REQUIRED`. No se ha reconstruido contenido por intuición. En años con cero apartados detectados, el ejercicio se conserva pero la estructura interna requiere revisión documental.

### 3.3 Estructura y estados

Los roles andaluces conservados son Titular (326 ejercicios), Reserva (366), Suplente 1 (230), Suplente 2 (38) y No verificable (658). Las 37 combinaciones de sesión no verificables no se convierten en Ordinaria o Extraordinaria.

Cada ejercicio incorpora `DOCUMENT_VERIFIED`, `STRUCTURE_VERIFIED` cuando existe literal extraído, y las colas `ANSWER_REVIEW_REQUIRED` y `SOLUTION_REVIEW_REQUIRED`. Los 318 indicios de deterioro/notación reciben además `NOTATION_REVIEW_REQUIRED`. Esta clasificación no equivale a aprobación ni publicación.

## 4. Madrid

### 4.1 Conservación y conciliación

| Métrica | Resultado |
|---|---:|
| Registros históricos conservados | 1.728 |
| Ejercicios históricos únicos estimados | 1.723 |
| Segmentos oficiales extraídos | 817 |
| Grupos duplicados históricos | 5 |
| `sourceRecordId` eliminados | 0 |

Los cinco grupos duplicados se expresan como alias documentales; no se elimina ninguna copia física ni procedencia. Solo convergen cuando la evidencia permite una identidad documental única.

### 4.2 Antes y después

| Decisión | Antes | Después | Diferencia |
|---|---:|---:|---:|
| `DOCUMENT_MATCH_EXACT` | 0 | 0 | 0 |
| `DOCUMENT_MATCH_STRUCTURAL` | 37 | 49 | +12 |
| `HUMAN_REVIEW_REQUIRED` | 469 | 306 | -163 |
| `AMBIGUOUS` | 3 | 9 | +6 |
| `NOT_FOUND` | 1.219 | 1.364 | +145 |

El aumento de `NOT_FOUND` es consecuencia de exigir coincidencia con segmento oficial y no conservar como válida una asociación histórica débil. No se ha forzado una mejora numérica.

Desglose por materia:

| Materia | Total | Estructural | Revisión | Ambiguo | No encontrado |
|---|---:|---:|---:|---:|---:|
| Matemáticas II | 825 | 36 | 148 | 0 | 641 |
| CCSS II | 903 | 13 | 158 | 9 | 723 |

Incidencias registradas: 49 diferencias de transcripción y 285 indicios de notación matemática. La detección automatizada nueva no certifica diferencias de segmentación (0); las segmentaciones conocidas y demostradas, incluido el caso 1, se conservan mediante evidencia previa y regresión explícita.

## 5. Caso 1 obligatorio

`vent-421552a489e688ce586b07f0c1870560` permanece protegido por regresión:

- 4.1 y 4.2 son ejercicios independientes;
- ambos conservan `a)` y `b)`;
- la instrucción editorial queda fuera del enunciado;
- el ámbito de respuesta/solución permanece separado;
- la identidad fusionada conserva redirección `SPLIT`;
- la evidencia histórica previa permanece referenciada por hash.

## 6. Integridad, reproducibilidad y rollback

- Se conservan 15.527/15.527 registros y 15.527 `sourceRecordId` únicos; faltan 0.
- `run-a`, `run-b` y `run-order-reversed` coinciden en los 10 artefactos semánticos comparados.
- La inversión del orden de entrada no cambia identidades, asociaciones ni hashes.
- El ensayo de rollback es un borrado simulado limitado a la capa paralela; no cambia ningún archivo protegido.
- `index.html`, `app.js`, `math-renderer.js` y los contratos v1 permanecen con los mismos hashes.
- Publicación conectada: `false`. Archivos de producción modificados: 0.

## 7. Pruebas

| Suite | Resultado |
|---|---:|
| Fase canónica Andalucía–Madrid | 33/33 |
| Cobertura oficial | 13/13 |
| Aserciones biblioteca Madrid–Andalucía | 1.453/1.453 |
| Regresión JavaScript | 16/16 archivos |
| Pruebas originales Fase 1 | 22/22 |
| Reproducibilidad | 10/10 artefactos idénticos |
| Orden invertido | superado |
| Rollback seco | superado |

## 8. Artefactos generados

Código y contratos:

- `catalog/pau-canonical/`
- `scripts/build-pau-canonical-andalucia-madrid.ps1`
- `scripts/verify-pau-canonical-andalucia-madrid.ps1`
- `scripts/trial-rollback-pau-canonical-andalucia-madrid.ps1`
- `tests/pau-canonical-andalucia-madrid.test.ps1`

Evidencia:

- `artifacts/pau-canonical-andalucia-madrid/runs/run-a/`
- `artifacts/pau-canonical-andalucia-madrid/runs/run-b/`
- `artifacts/pau-canonical-andalucia-madrid/runs/run-order-reversed/`
- `artifacts/pau-canonical-andalucia-madrid/reproducibility.json`
- `artifacts/pau-canonical-andalucia-madrid/rollback-trial.json`
- `artifacts/pau-canonical-andalucia-madrid/test-results.json`

## 9. Limitaciones y trabajo humano pendiente

1. Los seis DOC de Andalucía CCSS II 2012 requieren una extracción documental literal específica antes de materializar sus ejercicios.
2. Los 318 ejercicios con indicios de notación no deben corregirse sin cotejo visual/documental.
3. Los 1.618 ejercicios andaluces siguen sin respuesta o solución pedagógica generada; los criterios oficiales no las sustituyen.
4. Las nueve relaciones de criterio ambiguas y las cuatro estructurales requieren validación de ámbito.
5. Madrid conserva 306 casos de revisión humana, 9 ambiguos y 1.364 no encontrados.
6. Los 658 ejercicios andaluces asociados a rol no verificable conservan esa incertidumbre.
7. Esta fase prepara un futuro selector CLM/Madrid/Andalucía mediante perfiles extensibles, pero no cambia el selector actual ni certifica el catálogo para alumnos.

## 10. Criterio de cierre técnico

La capa paralela es reproducible, reversible y conserva toda la evidencia, pero no es un banco publicado. Su cierre técnico no autoriza incorporar Andalucía o la nueva conciliación de Madrid al runtime hasta resolver las colas documentales, matemáticas y pedagógicas y ejecutar una integración de preproducción separada.

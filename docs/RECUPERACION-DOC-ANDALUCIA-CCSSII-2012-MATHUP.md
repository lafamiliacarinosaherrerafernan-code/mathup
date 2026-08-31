# Recuperación documental Andalucía · CCSS II · 2012

## Alcance y garantías

Esta fase recupera en paralelo los seis exámenes y los seis criterios oficiales de Andalucía · Matemáticas Aplicadas a las CCSS II · 2012. No modifica los documentos originales, los 1.618 ejercicios canónicos andaluces existentes, bancos, `data/`, contratos previos, aplicación, Supabase, renderizadores ni skills. No usa OCR ni Mathpix y no genera respuestas, soluciones o distractores.

La salida es una capa documental aislada. Sus ejercicios no están publicados ni conectados al selector. “Materializable” significa que el ejercicio puede conservarse fielmente en esta capa mediante texto Unicode y objetos vectoriales originales; no implica certificación visual humana ni autorización para integrarlo en el catálogo v2.

## Diagnóstico de los 12 DOC

Los doce archivos tienen firma OLE Compound File `d0cf11e0a1b11ae1` y son documentos binarios Microsoft Word 97-2003 (`.doc`), abiertos con Word en modo oculto, solo lectura, macros deshabilitadas, alertas deshabilitadas y sin actualización de vínculos. Los hashes SHA-256 coinciden con el registro oficial versionado.

| Documento | Rol | Páginas | Párrafos | Palabras | Objetos Equation.3 | Riesgo de conversión plana |
|---|---:|---:|---:|---:|---:|---|
| criteria-modelo-1.doc | criterio | 1 | 39 | 338 | 0 | Bajo para texto |
| criteria-modelo-2.doc | criterio | 1 | 38 | 331 | 0 | Bajo para texto |
| criteria-modelo-3.doc | criterio | 1 | 39 | 309 | 0 | Bajo para texto |
| criteria-modelo-4.doc | criterio | 1 | 43 | 345 | 0 | Bajo para texto |
| criteria-modelo-5.doc | criterio | 1 | 36 | 335 | 0 | Bajo para texto |
| criteria-modelo-6.doc | criterio | 1 | 41 | 357 | 0 | Bajo para texto |
| exam-modelo-1.doc | examen | 1 | 51 | 781 | 11 | Perdería ecuaciones |
| exam-modelo-2.doc | examen | 1 | 46 | 745 | 6 | Perdería ecuaciones |
| exam-modelo-3.doc | examen | 1 | 41 | 949 | 7 | Perdería ecuaciones |
| exam-modelo-4.doc | examen | 1 | 47 | 794 | 10 | Perdería ecuaciones |
| exam-modelo-5.doc | examen | 1 | 38 | 1.021 | 7 | Perdería ecuaciones |
| exam-modelo-6.doc | examen | 1 | 44 | 845 | 14 | Perdería ecuaciones |

Totales: 12 páginas lógicas según Word, 503 párrafos, 7.150 palabras y 27.316 caracteres extraídos. No se localizaron tablas de Word, objetos OMath, formas flotantes ni campos. Los 55 objetos incrustados de los exámenes son OLE `Equation.3` (Microsoft Equation Editor 3.0). Los criterios son texto Unicode sin objetos matemáticos incrustados.

La conversión a texto plano con Antiword se rechazó porque sustituye las ecuaciones por marcadores de imagen. La conversión general a PDF no se usa como fuente de extracción. No se transforma ninguna expresión en texto ambiguo.

## Método local de extracción

1. Se verifica la firma binaria y el SHA-256 del DOC contra el registro oficial.
2. Microsoft Word abre cada archivo en modo solo lectura.
3. El texto se obtiene por rangos nativos de Word, conservando orden y caracteres Unicode.
4. Cada objeto `Equation.3` se recupera mediante `Range.EnhMetaFileBits` como EMF vectorial exacto. Se guarda una vista PNG derivada únicamente para comparación humana.
5. La identidad estable del objeto usa `SHA-256 del DOC + índice del objeto`; el hash del EMF demuestra la evidencia extraída.
6. Las tres corridas reutilizan la primera evidencia vectorial exacta y producen artefactos semánticos idénticos.

Los 55/55 objetos se recuperaron correctamente como vectores; hay 0 fallos de extracción. No se intenta convertirlos a AST, LaTeX o texto matemático. Por ello quedan 55 objetos con `semanticExpressionExtracted=false`: no es pérdida documental, sino una limitación explícita que impide fingir una interpretación semántica. Cualquier futura transcripción estructurada requerirá contraste visual con el DOC original.

## Segmentación documental

La estructura demostrada en los seis exámenes es homogénea:

- seis modelos oficiales;
- dos opciones independientes, A y B, por modelo;
- cuatro ejercicios por opción;
- 48 ejercicios detectados y 48 materializables en la capa paralela;
- 104 subapartados `a)`, `b)`, `c)` o `d)`;
- 111 evidencias de puntuación separadas de `learnerBlocks` y conservadas en `scoreEvidence`.

| Modelo | Ejercicios | Subapartados | Objetos matemáticos | Evidencias de puntuación |
|---:|---:|---:|---:|---:|
| 1 | 8 | 19 | 11 | 19 |
| 2 | 8 | 17 | 6 | 18 |
| 3 | 8 | 15 | 7 | 17 |
| 4 | 8 | 21 | 10 | 21 |
| 5 | 8 | 14 | 7 | 16 |
| 6 | 8 | 18 | 14 | 20 |

No se detectaron límites de ejercicio ambiguos: los encabezados `OPCIÓN A/B` y `EJERCICIO 1..4` son explícitos. Las puntuaciones editoriales no aparecen en el texto destinado al alumno. La convocatoria se conserva como `No verificable`; no se infiere Ordinaria o Extraordinaria.

## Criterios oficiales

Las seis parejas examen–criterio ya acreditadas como `CRITERIA_MATCH_EXACT` se verificaron de nuevo. Cada uno de los 48 ejercicios queda vinculado al rango del criterio del mismo modelo, opción y número de ejercicio, con hash literal, documento, ruta y rango.

Los criterios se almacenan exclusivamente como `criteriaEvidence`. No se convierten en respuesta, solución pedagógica ni distractores. Se conserva literalmente su alcance oficial, sin completar pasos intermedios.

## Comparación documental y notación

El corpus aislado contiene 48 fichas `DOC original → extracción → estructura documental canónica`. Cada ficha muestra el texto extraído, las ecuaciones derivadas de los EMF originales, los apartados, las puntuaciones separadas y el vínculo al criterio. El corpus no concede certificación visual.

No se observaron pérdidas de objetos: 55 encontrados, 55 preservados, 0 pendientes por fallo. La notación matemática permanece en los vectores originales. La limitación pendiente es semántica: esos 55 objetos todavía no tienen árbol matemático tipado, por lo que no deben convertirse automáticamente a una representación editable ni publicarse hasta una revisión documental/visual posterior.

## Identidad, trazabilidad y reversibilidad

Cada ejercicio conserva:

- comunidad, materia y año acreditados;
- modelo y opción explícitos;
- número de ejercicio y subapartados;
- documento y SHA-256;
- rangos de caracteres originales;
- hash del texto bruto;
- objetos matemáticos y hashes EMF/PNG;
- puntuaciones editoriales separadas;
- evidencia oficial de criterio y su ámbito.

La doble corrida y la corrida con entradas invertidas generan exactamente los mismos tres archivos semánticos y el hash:

`61d2a28a669a565e9823315efbd96d1a737fba543797d929cb2f0cc1bad5425a`

El ensayo de rollback crea y elimina una copia exclusivamente dentro del área de artefactos y confirma que los hashes de los 12 DOC permanecen intactos.

## Resultado y total potencial

- Documentos conservados: 12/12.
- Exámenes: 6.
- Criterios: 6.
- Parejas exactas: 6/6.
- Ejercicios detectados: 48.
- Ejercicios materializables en la capa documental: 48.
- Subapartados: 104.
- Criterios vinculados por ámbito: 48.
- Objetos Equation Editor encontrados: 55.
- Objetos preservados exactamente: 55.
- Fallos de extracción: 0.
- Respuestas generadas: 0.
- Soluciones generadas: 0.
- Distractores generados: 0.
- Total potencial del banco andaluz tras una integración futura autorizada: **1.666** (1.618 + 48).

## Pruebas

- Pruebas específicas de esta fase: 24/24.
- Regresión Node de fases anteriores: 117/117.
- Regresión documental PowerShell: 1.499/1.499.
- Total de comprobaciones: 1.640 superadas, 0 fallidas.
- Reproducibilidad: PASS.
- Invariancia al orden: PASS.
- Rollback: PASS.
- Documentos originales mutados: 0.
- Archivos de producción modificados: 0.

## Artefactos

- Diagnóstico individual: `artifacts/andalucia-ccssii-2012-doc/document-diagnostics.jsonl`.
- Corridas: `artifacts/andalucia-ccssii-2012-doc/runs/`.
- Objetos vectoriales y vistas: `artifacts/andalucia-ccssii-2012-doc/document-objects/`.
- Corpus comparativo: `artifacts/andalucia-ccssii-2012-doc/comparison-corpus/`.
- Reproducibilidad: `artifacts/andalucia-ccssii-2012-doc/reproducibility-result.json`.
- Rollback: `artifacts/andalucia-ccssii-2012-doc/rollback-result.json`.
- Pruebas: `artifacts/andalucia-ccssii-2012-doc/test-results.json`.

## Limitaciones y condición para una integración posterior

Los 48 ejercicios están fielmente recuperados como evidencia documental, pero siguen en una capa paralela y no se integran todavía en los 1.618 ejercicios versionados. Antes de una integración/publicación deberán aprobarse expresamente la comparación con el DOC original y, si se exige notación estructurada editable, la transcripción humana controlada de los 55 objetos Equation Editor. No se ha reconstruido ni interpretado ninguna fórmula por intuición.

# Auditoría de segmentación de enunciados PAU de +MathUp

## 1. Dictamen ejecutivo

La revisión humana visual queda detenida. No se ha registrado ninguna decisión humana y esta auditoría no modifica ejercicios, respuestas, soluciones, bancos, contratos, aplicación, Supabase, renderizadores ni skills.

El caso que motivó la auditoría confirma un defecto de contenido estructural anterior al renderizado: la instrucción de examen «conteste solo una de 4.1 o 4.2» quedó incorporada al enunciado, 4.1 y 4.2 fueron reunidas como un solo ejercicio y sus cuatro apartados, respuestas y soluciones quedaron concatenados. Por tanto, no era correcto continuar una certificación visual: una representación tipográficamente perfecta seguiría mostrando una unidad pedagógica mal segmentada.

El censo canónico de Fase 2B contiene **3.491 representaciones PAU actuales**: **2.011 de Matemáticas II** y **1.480 de CCSS II**. Esta cifra no sustituye la línea base de **3.281 candidatos PAU de Fase 2** (1.921 y 1.360, respectivamente): Fase 2B creó separaciones y redirecciones de identidad, por lo que «representación v2» y «ejercicio oficial único» no son unidades intercambiables.

Sobre las 3.491 representaciones se han detectado automáticamente **910 con al menos una señal de segmentación** y **2.581 sin señal estructural automática**. Este último estado se denomina `SEGMENTATION_OK` de forma provisional: no constituye certificación contra el PDF. Ninguna representación conserva actualmente un vínculo verificable de página y hash con el documento oficial, de modo que las **3.491** permanecen también como `DOCUMENT_REVIEW_REQUIRED` hasta completar la conciliación documental.

## 2. Alcance, fuentes y método

Se han leído, sin modificarlos:

- `artifacts/fase2b/runs/run-a/exercise-v2.jsonl`;
- `answer-records.jsonl` y `solution-records.jsonl` de la misma corrida;
- `artifacts/fase2b-integrity-audit/notation-audit.jsonl`;
- `data/mates-ii-blocks.js` y `data/ccss-ii-blocks.js`;
- fuentes históricas y parches localizados mediante el inventario de Fase 0/0B;
- el PDF oficial local `26_exjun.pdf` de Matemáticas II, Castilla-La Mancha, junio de 2026, para el caso 1;
- las instrucciones vigentes de `skill-editor-enunciados` y sus controles de calidad.

Se localizaron **132 PDF** en los archivos locales de Matemáticas II y CCSS II. Su mera presencia no se ha tratado como vínculo inequívoco. Para certificar automáticamente una fila se exigiría al menos identificación estable del documento, página y hash o una conciliación documental registrada. Esa evidencia no consta en los objetos v2 actuales. Por ello se evita presentar una coincidencia por año o por texto OCR como si fuera prueba literal.

El script reproducible `scripts/fase2d-audit-pau-segmentation.ps1` clasifica cada representación y genera un registro JSONL completo. Las detecciones automáticas buscan instrucciones de elección, cabeceras repetidas, numeraciones alternativas, etiquetas de apartados duplicadas, alternativas incrustadas dentro de otro apartado, ausencia del modelo `subparts`, deterioro de texto y señales de notación ya auditadas. Los resultados son conservadores: una categoría detectada es evidencia de incidencia; la ausencia de una categoría no prueba por sí sola fidelidad al original.

## 3. Clasificación global

Las categorías no son excluyentes: una misma representación puede tener, por ejemplo, cabecera duplicada, apartados incorrectos y notación deteriorada.

| Categoría | Cantidad | Interpretación |
|---|---:|---|
| `SEGMENTATION_OK` | 2.581 | Sin señal estructural automática; pendiente de contraste documental. |
| `EXAM_INSTRUCTION_ATTACHED` | 25 | Se detecta una instrucción editorial de elección dentro del contenido. |
| `DUPLICATED_HEADER` | 359 | Cabecera o frase extensa repetida en el enunciado canónico. |
| `MULTIPLE_EXERCISES_MERGED` | 9 | Evidencia de alternativas independientes reunidas en una identidad. |
| `EXERCISE_INCORRECTLY_SPLIT` | 0 | No hubo señal automática concluyente; no demuestra ausencia del defecto. |
| `SUBPART_STRUCTURE_ERROR` | 882 | La fuente tiene apartados, pero v2 no conserva `subparts`, o hay etiquetas/alternativas incrustadas. |
| `SOURCE_TEXT_CORRUPTION` | 1 | Deterioro textual inequívoco localizado. |
| `MATH_NOTATION_CORRUPTION` | 496 | Señales de notación dañada o falso formato MathML. |
| `DOCUMENT_REVIEW_REQUIRED` | 3.491 | Falta prueba de documento/página/hash para certificar literalidad. |

Además de las 910 señales puramente estructurales, **1.401** representaciones presentan alguna señal estructural, textual o matemática. La diferencia corresponde principalmente a deterioro de notación sin una señal adicional de segmentación.

## 4. Desglose por materia y comunidad

| Materia / comunidad | Total | OK provisional | Instrucción | Cabecera duplicada | Fusionados | Error de apartados | Texto | Notación |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Matemáticas II · Castilla-La Mancha | 1.021 | 508 | 11 | 145 | 9 | 508 | 0 | 429 |
| Matemáticas II · Madrid | 795 | 794 | 1 | 0 | 0 | 0 | 0 | 40 |
| Matemáticas II · comunidad no verificable | 195 | 185 | 1 | 9 | 0 | 0 | 0 | 23 |
| CCSS II · Castilla-La Mancha | 384 | 10 | 5 | 200 | 0 | 374 | 1 | 4 |
| CCSS II · Madrid | 892 | 886 | 6 | 0 | 0 | 0 | 0 | 0 |
| CCSS II · comunidad no verificable | 204 | 198 | 1 | 5 | 0 | 0 | 0 | 0 |

Totales por materia:

| Materia | Total | OK provisional | Instrucción | Cabecera duplicada | Fusionados | Error de apartados | Texto | Notación |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Matemáticas II | 2.011 | 1.487 | 13 | 154 | 9 | 508 | 0 | 492 |
| CCSS II | 1.480 | 1.094 | 12 | 205 | 0 | 374 | 1 | 4 |

Los desgloses completos por materia, comunidad, año y convocatoria están en los CSV de auditoría. Las convocatorias conservadas en v2 suman 1.222 registros de junio/ordinaria, 711 de septiembre, 294 de julio y 133 de extraordinaria; el resto no tiene convocatoria verificable. No se ha completado ningún dato ausente por inferencia.

No aparece en v2 una comunidad distinta de Castilla-La Mancha o Madrid con nombre verificable. Hay 399 representaciones con comunidad no verificable; no se han reasignado automáticamente a «otras comunidades».

## 5. Alternativas de examen y apartados

La regla canónica necesaria es:

```text
exam
  instruction: «elija una...»             # metadato editorial
  alternatives:
    - exercise 4.1                         # ejercicio independiente
        statement
        subparts:
          - 4.1.a -> answer -> solution
          - 4.1.b -> answer -> solution
    - exercise 4.2                         # ejercicio independiente
        statement
        subparts:
          - 4.2.a -> answer -> solution
          - 4.2.b -> answer -> solution
```

Una alternativa (`4.1`/`4.2`, `A`/`B`, `1A`/`1B` o fórmula equivalente propia de cada comunidad) no es lo mismo que un apartado `a)`, `b)`, `c)` de un mismo ejercicio. La primera produce identidades de ejercicio independientes; los segundos permanecen dentro de `subparts[]` y conservan su orden y correspondencia individual con respuesta y solución.

Los objetos v2 auditados no conservan `provenance.pau.part` ni `examOption` en ninguna de las 3.491 representaciones. Los 882 registros procedentes de bancos estructurados sí contienen partes en origen —508 de Matemáticas II y 374 de CCSS II—, pero v2 no las materializa en `content.subparts`. Este vacío impide demostrar de forma estructural `documento → ejercicio → apartado → respuesta → solución`, incluso cuando el texto concatenado contiene esas piezas.

### Fusiones inequívocas detectadas

Se han identificado nueve representaciones fusionadas, todas de Matemáticas II de Castilla-La Mancha:

- `ex-25662a75-7e5e-5935-903f-0d41aa138462` — junio 2026, 4.1/4.2;
- `ex-1b0057fb-7563-5213-b299-b45600e7e1d3` — julio 2026, 4.1/4.2;
- `ex-29153969-4e02-5dfe-94df-c235234c56b5` — junio 2026, 5.1/5.2;
- `ex-a6304a4a-3e51-56e8-a7b8-f5bb4679e9c1` — julio 2026, 5.1/5.2;
- `ex-14cbcf9f-2920-5557-b0dc-b5d74e13e439` — julio 2025, alternativas A/B;
- cuatro materializaciones paralelas del `runtime-builder`: `ex-131fa8c5-ba7e-5075-84ca-35ad2794be21`, `ex-3dd6fc8c-59e9-5f44-885f-7d93af8ab811`, `ex-677bf329-2803-5c27-bbf2-8dff5fd8bc31` y `ex-fc3e6f71-d9c6-51e1-becd-9cdfd74e2b2f`.

No se declara que solo existan nueve defectos reales. Son los nueve demostrables con las señales estructurales presentes; los posibles ejercicios incorrectamente divididos o fusionados sin marcadores reconocibles permanecen en revisión documental.

## 6. Análisis específico del caso 1

### 6.1 Identidad y fuente

- `visualEntityId`: `vent-421552a489e688ce586b07f0c1870560`.
- Tipo visual: solución.
- `exerciseId`: `ex-25662a75-7e5e-5935-903f-0d41aa138462`.
- Fuente de enunciado: `data/mates-ii-blocks.js`, `window.MATES_II_BLOCK_EXERCISES.geometria.0`.
- `sourceRecordId` del enunciado: `src-45bd33c7-c79f-50db-91aa-c41796fadff6`.
- Documento contrastado: `26_exjun.pdf`, Matemáticas II, Castilla-La Mancha, junio de 2026.

### 6.2 Estructura oficial

El PDF contiene una instrucción de examen de nivel superior: en la pregunta 4 se debe contestar solo una de las alternativas 4.1 o 4.2.

- **4.1** es un ejercicio de vectores con dos apartados: `a)` coplanaridad y `b)` volumen del paralelepípedo.
- **4.2** es otro ejercicio independiente sobre simetría respecto de un plano y distancia, también con `a)` y `b)`.

El inicio de 4.1 es «Dados los vectores…» y termina al finalizar su apartado b). El inicio de 4.2 es el problema de los sensores y el plano; no pertenece al apartado b) de 4.1.

### 6.3 Defecto observado

En el banco original auditado:

- la instrucción de examen está incorporada al `statement`;
- la instrucción y la cabecera de 4.1 aparecen duplicadas en la representación v2;
- 4.2 se encuentra incrustada en el segundo párrafo del supuesto apartado b) de 4.1;
- las etiquetas son `a), b), a), b)` dentro de un único objeto;
- hay notación vectorial aplanada/deteriorada (`uvw===...`) junto a otra variante más legible;
- una sola respuesta compuesta reúne `4.1 a)`, `4.1 b)`, `4.2 a)` y `4.2 b)`;
- una sola solución desarrollada reúne igualmente las cuatro resoluciones.

La respuesta canónica actual es `ans-eb1cae6d-8d68-5cb7-8e6c-e88e334312d1`; la solución es `sol-ddb59a38-aac4-56dc-a219-d0f21975244c`. Ambas conservan cuatro `sourceRecordId` y hashes de evidencia, pero están asociadas a una sola identidad de ejercicio.

Además, `data/mates-ii-runtime-fixes.js` ya contiene una reparación histórica que construye por separado `mates2-geometria-extra-pregunta-4-1-2026` y `mates2-geometria-extra-pregunta-4-2-2026`. Esto demuestra que la separación correcta ya fue reconocida dentro del proyecto, pero Fase 2B tomó como fuente canónica el objeto fusionado de `data/mates-ii-blocks.js`; la corrección histórica no quedó promovida a la identidad v2 usada por la revisión visual.

### 6.4 Forma canónica requerida, sin aplicarla

Deben existir dos ejercicios independientes, 4.1 y 4.2. Cada uno debe contener exactamente sus apartados `a` y `b`, y cada apartado debe enlazar únicamente su propia respuesta y solución. La instrucción de elección debe almacenarse como metadato de estructura del examen, no como parte del enunciado matemático. Deben conservarse comunidad, materia, año, convocatoria, pregunta, alternativa, apartado, documento, página, hashes y todos los `sourceRecordId` originales mediante redirecciones auditables.

No se ha aplicado esta transformación en la presente auditoría.

## 7. Relación con `skill-editor-enunciados`

La skill vigente ya contiene la regla conceptual correcta. Establece expresamente que, cuando el examen obliga a elegir entre 4.1/4.2 o 5.1/5.2, cada alternativa debe tratarse como ejercicio independiente; solo se elimina la instrucción editorial, se conserva el enunciado propio con todos sus apartados y nunca se adjunta 4.2 como apartado de 4.1. También exige conservar numeración, apartados y orden, y usar el PDF original como fuente de verdad.

Por tanto, el defecto no exige modificar la skill en este momento. La desviación está en el proceso que construyó o seleccionó los bancos/candidatos: no hizo cumplir la regla ya documentada, no conservó la jerarquía de apartados y no priorizó la reparación histórica separada.

Para futuras importaciones conviene convertir estas reglas de la skill en validaciones ejecutables del importador, sin cambiar el texto de la skill:

1. una instrucción «elija una» no puede formar parte del `statement` del ejercicio;
2. dos marcadores de alternativa no pueden compartir `exerciseId`;
3. etiquetas `a,b,a,b` invalidan la segmentación;
4. cada `subpart.id` debe ser único y mantener respuesta/solución del mismo alcance;
5. el documento/página/hash debe acompañar la decisión de corte;
6. una reparación histórica estructurada no puede quedar eclipsada silenciosamente por un objeto fusionado cargado antes o después.

## 8. Propuesta de corrección posterior

La corrección debe ejecutarse en una fase separada, reversible y sin tocar los originales:

1. construir un registro de documentos oficiales con hash, página, materia, comunidad, año y convocatoria;
2. extraer la estructura editorial del examen (`instruction`, bloques y alternativas) separada del contenido matemático;
3. crear identidades estables por `documentHash + question + alternative`;
4. crear `subparts[]` por `exerciseId + label`, conservando orden y literal;
5. enlazar respuesta y solución por la misma clave de ejercicio/apartado, rechazando uniones con ámbitos incompatibles;
6. generar `identity-redirect` desde identidades fusionadas o históricas hacia las nuevas identidades sin borrar evidencia;
7. bloquear publicación si falta fuente/página, existe ambigüedad de corte, se repite una etiqueta o hay contenido de otra alternativa;
8. repetir la auditoría documental y después, solo entonces, reiniciar la auditoría visual.

La futura clasificación de publicación debe distinguir:

- **segmentación demostrada**: documento y página vinculados, cortes y apartados verificados;
- **estructura recuperable**: parche o banco correcto existente, pendiente de conciliación con el PDF;
- **revisión documental**: falta prueba suficiente;
- **bloqueado**: fusión, división, corrupción o correspondencia de respuesta/solución no resoluble automáticamente.

## 9. Artefactos reproducibles

Se han generado únicamente artefactos nuevos de auditoría:

- `artifacts/fase2d-pau-segmentation-audit/pau-segmentation-audit.jsonl`: una fila por representación PAU con categorías, metadatos y evidencia automática;
- `summary.json`: totales y desgloses;
- `breakdown-by-subject-community.csv`;
- `breakdown-by-year-sitting.csv`;
- `case-1-evidence.json`: trazabilidad detallada del caso 1;
- `scripts/fase2d-audit-pau-segmentation.ps1`: generador reproducible de los artefactos;
- este informe.

No se ha generado contenido educativo nuevo. Tampoco se ha corregido, borrado ni sustituido ningún registro existente.

## 10. Limitaciones y criterio de parada

- La detección automática no puede reconstruir límites de página ni decidir cortes ambiguos.
- `EXERCISE_INCORRECTLY_SPLIT = 0` significa «sin señal automática concluyente», no «cero casos reales».
- `SEGMENTATION_OK` es provisional hasta el cotejo con fuente oficial.
- La falta de `part`, `examOption`, página y hash en v2 impide una certificación completa de los 3.491 casos.
- Las 399 comunidades no verificables permanecen sin asignar.
- La revisión humana visual no debe reanudarse hasta resolver o bloquear explícitamente las incidencias de segmentación y completar una muestra documental suficiente con trazabilidad de página/hash.


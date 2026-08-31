# Fase 2A — Recuperación y diagnóstico de respuestas y soluciones de +MathUp

## Alcance y garantías

Auditoría de solo lectura sobre los bancos, documentos y artefactos existentes. No enlaza respuestas, no modifica candidatos, no corrige contenido y no altera el contrato canónico. La clasificación es deliberadamente conservadora:

- `UNIQUE_MATCH`: una clave PAU completa y exacta conduce a un único grupo estructurado de respuestas/soluciones sin incompatibilidades por apartado.
- `POSSIBLE_MATCH`: existe material por clave PAU base o en un documento de soluciones, pero la relación ejercicio/apartado no queda demostrada de forma inequívoca.
- `CONFLICT`: la misma clave exacta y el mismo apartado contienen valores incompatibles.
- `NOT_FOUND`: no se localiza respuesta o solución asociable en las fuentes examinadas.

La presencia literal de un enunciado en un PDF/DOC no se convierte en `UNIQUE_MATCH`: sirve como trazabilidad documental y, si el archivo es un solucionario, como evidencia posible. Los archivos sin texto extraíble se registran, pero no se someten a OCR ni Mathpix.

## Resultado de los 3.226 candidatos PAU

| subject | total | UNIQUE_MATCH | POSSIBLE_MATCH | CONFLICT | NOT_FOUND |
| --- | --- | --- | --- | --- | --- |
| Matemáticas II | 1921 | 1076 | 9 | 18 | 818 |
| CCSS II | 1305 | 149 | 3 | 1 | 1152 |

**Total:** 1225 `UNIQUE_MATCH`, 12 `POSSIBLE_MATCH`, 19 `CONFLICT` y 1970 `NOT_FOUND`.

### Dónde están las coincidencias

Se localizaron 1443 registros de evidencia en 745 claves de bancos separados. Fuentes que aportan coincidencias exactas para candidatos auditados:

| source | candidates |
| --- | --- |
| data/bach-ii-complete-answer-bank-2022.js | 67 |
| data/bach-ii-complete-answer-bank-2010.js | 63 |
| data/bach-ii-complete-answer-bank-2003.js | 63 |
| data/bach-ii-complete-answer-bank-2007.js | 61 |
| data/bach-ii-complete-answer-bank-2002.js | 61 |
| data/bach-ii-complete-answer-bank-2011.js | 60 |
| data/bach-ii-complete-answer-bank-2009.js | 59 |
| data/bach-ii-complete-answer-bank-2008.js | 59 |
| data/bach-ii-complete-answer-bank-2001.js | 59 |
| data/bach-ii-complete-answer-bank-2020.js | 56 |
| data/bach-ii-complete-answer-bank-2023.js | 55 |
| data/bach-ii-complete-answer-bank-2004.js | 54 |
| data/bach-ii-complete-answer-bank-2021.js | 51 |
| data/bach-ii-complete-answer-bank-2024.js | 50 |
| data/bach-ii-complete-answer-bank-2012.js | 47 |
| data/bach-ii-complete-answer-bank-2000.js | 45 |
| data/bach-ii-complete-answer-bank-2013.js | 40 |
| data/bach-ii-complete-answer-bank-2017.js | 32 |
| data/bach-ii-complete-answer-bank-2018.js | 32 |
| data/bach-ii-complete-answer-bank-2005.js | 30 |
| data/bach-ii-complete-answer-bank-2019.js | 30 |
| data/bach-ii-complete-answer-bank-2006.js | 28 |
| data/bach-ii-exam-data.js | 24 |
| data/bach-ii-complete-answer-bank-2016.js | 24 |
| data/bach-ii-complete-answer-bank-2015.js | 23 |
| data/bach-ii-variety-expansion.js | 19 |
| data/bach-ii-complete-answer-bank.js | 17 |
| data/ccss-ii-block-answers.js | 17 |
| data/bach-ii-complete-answer-bank-2014.js | 17 |
| data/bach-ii-complete-answer-bank-2025.js | 16 |
| data/mates-ii-runtime-fixes.js | 4 |

Además se inspeccionaron 502 documentos relevantes (479 con texto extraíble, 23 sin texto y 0 con error de extracción). 13 candidatos aparecen literalmente en documentos no identificados como solucionario y 10 en archivos cuyo nombre indica solución/respuesta. Estos últimos se mantienen como posibles salvo que exista también clave estructurada exacta.

## Trazabilidad PAU original

Cada fila de `pau-recovery-classification.jsonl` conserva comunidad, año, convocatoria, etiqueta de ejercicio, fuente original, `sourcePath`, registros del inventario, claves exactas/parciales y documentos coincidentes. Comunidad/año/convocatoria se consideran demostrados solo cuando constan en el candidato y su evidencia de origen; un nombre de archivo o una semejanza textual no rellena metadatos ausentes.

Los documentos oficiales suelen aportar enunciado y coordenadas del examen, no necesariamente solución. Una solución en banco separado se considera inequívoca únicamente cuando comparte la clave PAU completa; la coincidencia por los 12 caracteres de la clave base queda como `POSSIBLE_MATCH`.

## Diagnóstico de `CHOICES_REQUIRED`

Se reproducen 2668 diagnósticos: 2668 corresponden a PAU. Desglose: 2bach-ccss: 1282; 2bach-mates: 1386.

No son, por sí mismos, defectos del enunciado fuente. El validador exige cuatro opciones cuando `answer.kind === "choice"` o cuando la modalidad contiene `practice`, `challenge` o `adventure`. El importador conserva evidencias de modalidad heredadas y puede tipar como elección una respuesta todavía ausente; así adelanta al nivel editorial requisitos que pertenecen a la entrega.

Separación recomendada para Fase 2B:

1. **Ejercicio canónico:** enunciado, clasificación y procedencia inmutables.
2. **Respuesta matemática:** valor/criterio correcto independiente de letras y posiciones.
3. **Solución:** desarrollo pedagógico trazable, también independiente de la entrega.
4. **Plantilla de entrega:** modalidad autorizada (abierta, práctica, reto, simulación PAU, etc.) y política de generación/selección de distractores.
5. **Instancia de sesión:** cuatro opciones materializadas y barajadas con semilla por intento. A/B/C/D solo existen aquí; la correcta nunca se almacena permanentemente como A.

Por tanto, un PAU abierto puede ser canónico sin opciones. Solo una plantilla de entrega de elección múltiple exige tres distractores válidos.

## Diagnóstico de modalidades

| courseId | candidates | noModalities | modalityErrors | pauUndeclared | choicesRequired |
| --- | --- | --- | --- | --- | --- |
| 1bach-mates | 76 | 45 | 45 | 0 | 0 |
| 1bach-ccss | 212 | 159 | 159 | 0 | 0 |
| 2bach-mates | 1921 | 534 | 534 | 1921 | 1386 |
| 2bach-ccss | 1360 | 48 | 48 | 1360 | 1282 |

- **Matemáticas I y CCSS I:** `practice`, `challenge`, `topic-exam` u `open-response` son modalidades de entrega; deben declararse solo con evidencia. La ausencia de opciones no invalida una entrega abierta.
- **Matemáticas II y CCSS II:** `official-pau` y los metadatos PAU describen procedencia; `pau-simulation`, `open-response`, `practice`, `challenge`, `topic-exam` y `block-exam` describen entrega. Ser PAU no obliga a una modalidad única ni a A/B/C/D.
- La corrección mínima posterior es impedir que el importador convierta evidencia de uso en obligación de opciones canónicas y permitir que un ejercicio PAU sin evidencia de entrega quede pendiente editorialmente, no transformado en elección artificial.

## Las 30 colisiones de Matemáticas I

Se auditaron 30 candidatos. El detalle individual figura en `mates-i-identity-collisions.jsonl`. La colisión nace de usar identificadores numéricos heredados (por ejemplo, `0`, `1`, etc.) fuera del espacio de nombres del banco: el mismo número se reutiliza en fuentes, temas y enunciados diferentes.

Clave propuesta, sin aplicarla todavía:

`courseId + subjectId + source-family/namespace + topic-or-block + normalized-statement-hash + legacy-id-within-source`.

El hash del enunciado separa ejercicios diferentes; el espacio de nombres evita que un `id=0` de un banco colisione con otro. La deduplicación posterior debe seguir comparando contenido matemático para no crear duplicados artificiales.

## Correcciones propuestas para Fase 2B

1. Incorporar una unión explícita y auditable `exercise PAU key + apartado -> answer bank key + apartado`; promover solo las 1225 coincidencias exactas después de validar contenido y codificación.
2. Mantener las 12 coincidencias en una cola de revisión; no unir por clave base, año o semejanza.
3. Resolver cualquier `CONFLICT` mediante revisión humana, conservando todas las versiones.
4. Separar procedencia PAU, modalidad de entrega y materialización de opciones.
5. Hacer que `choices` sea opcional para el núcleo abierto y obligatorio únicamente en una plantilla/instancia de elección múltiple.
6. Generar distractores fuera del ejercicio canónico, validar equivalencia y barajar con semilla por intento.
7. Sustituir la identidad numérica global de Matemáticas I por la clave compuesta propuesta, con tabla de redirección desde las identidades actuales.
8. No completar comunidad, año, convocatoria, respuesta o solución por inferencia; conservar `UNKNOWN` y motivo.

## Limitaciones

- No se aplicó OCR. Los documentos escaneados sin capa de texto permanecen no inspeccionables automáticamente.
- La coincidencia literal puede no detectar notación alterada por conversiones Word/PDF o caracteres deteriorados.
- Un banco de respuestas exacto demuestra una relación técnica por clave, pero antes de publicación todavía requiere validación matemática y revisión de codificación/notación.
- Esta fase diagnostica y propone; no modifica el esquema, el importador ni los datos.

## Artefactos reproducibles

- `artifacts/fase2a/pau-recovery-classification.jsonl`
- `artifacts/fase2a/pau-recovery-summary.json`
- `artifacts/fase2a/document-evidence-manifest.json`
- `artifacts/fase2a/mates-i-identity-collisions.jsonl`
- `artifacts/fase2a/choices-modalities-diagnostic.json`
- `scripts/fase2a-audit-recovery.mjs`

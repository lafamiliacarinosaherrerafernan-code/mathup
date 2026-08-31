# Fase 1 — Esquema canónico y validador único del catálogo +MathUp

**Fecha:** 24 de agosto de 2026  
**Alcance:** infraestructura aislada de contrato, validación y prueba.  
**Línea base:** commit `774e6f65cc5acba9eff1118eb05048892764d072`, tag `fase-0-catalogo-mathup-completa`.  
**No realizado:** migración, corrección de bancos, conexión a Supabase, cambio de renderizado, cambio de selección, modificación de skills o uso de Mathpix.

## 1. Resultado ejecutivo

Se ha creado una frontera de datos nueva, versionada y sin conexión con el funcionamiento público de +MathUp:

- esquema JSON Schema Draft 2020-12 `mathup.exercise.v1`;
- módulo de constantes y constructor de borradores;
- validador puro `mathup.validator.v1` con diagnósticos estructurados;
- adaptador de solo lectura para probar registros del inventario de Fase 0;
- 22 pruebas automatizadas;
- muestra reproducible de 11 registros reales y 11 categorías.

No se ha importado ni reescrito ninguno de los 6.712 ejercicios estimados. Los módulos nuevos no están incluidos en `index.html`, no se cargan desde `app.js` y no intervienen en autenticación, administración, estadísticas, progreso, Práctica, Retos, Aventuras, entrenador IA, exámenes, PAU, MyScript ni diseño.

## 2. Fuentes utilizadas

La definición deriva de:

- `docs/PLAN-CANONICO-ENUNCIADOS-SOLUCIONES-CATALOGO-MATHUP.md`;
- `docs/FASE-0-INVENTARIO-CONTRATO-CATALOGO-MATHUP.md`;
- `docs/FASE-0-INVENTARIO-CATALOGO-MATHUP.json`;
- `docs/FASE-0-INVENTARIO-CATALOGO-MATHUP.csv`;
- `scripts/fase0-inventory-catalog.mjs`;
- `docs/AUDITORIA-ENUNCIADOS-SOLUCIONES-MATHUP.md`;
- criterios de literalidad de `skill-editor-enunciados`;
- criterios de desarrollo, comprobación y opciones de `solucion-de-ejercicios`.

Las dos skills se usaron únicamente como criterios de diseño. No se modificaron.

## 3. Archivos creados

| Archivo | Función |
|---|---|
| `catalog/canonical-exercise.schema.json` | Esquema formal y portable. |
| `catalog/canonical-exercise.mjs` | Versión, taxonomías cerradas actuales, relación curso/materia, constructor seguro de borrador y utilidades del contrato. |
| `catalog/validate-canonical-exercise.mjs` | Validador único, puro y sin dependencias externas. |
| `tests/canonical-exercise-validator.test.mjs` | Pruebas unitarias con `node:test`. |
| `scripts/fase1-validate-catalog-sample.mjs` | Selección determinista, adaptación no destructiva y validación de una muestra del inventario real. |
| `docs/FASE-1-ESQUEMA-VALIDADOR-CATALOGO-MATHUP.md` | Este informe. |

No se modificó ningún archivo existente de producción.

## 4. Contrato canónico exacto

### 4.1. Identidad y revisiones

`identity` contiene:

- `exerciseId`: identidad estable del ejercicio;
- `revisionId`: identidad inmutable de la revisión;
- `revisionNumber`: entero desde 1;
- `legacyIds`: identidades históricas sin perder;
- `contentHash`: huella opcional.

Una corrección futura debe crear una revisión; el original continúa enlazado mediante trazabilidad.

### 4.2. Clasificación curricular

El modelo pedagógico queda fijado en tres perfiles estables: `ESO`, `BACH1` y `BACH2_PAU`. No existe una categoría independiente «2.º Bachillerato no PAU» en +MathUp.

`classification` contiene:

- `stage`: `ESO`, `BACHILLERATO` o `PAU`;
- `courseId`: los nueve cursos existentes en la aplicación;
- `subjectId`: Matemáticas, Matemáticas I/II o CCSS I/II;
- `topic`: identificador estable y etiqueta literal;
- `block`: referencia equivalente o `null`;
- `curriculumVersion`: versión curricular opcional.

La relación obligatoria es: cursos ESO → etapa `ESO` y perfil `ESO`; 1.º Bachillerato → etapa `BACHILLERATO` y perfil `BACH1`; 2.º Bachillerato → etapa `PAU` y perfil `BACH2_PAU`.

La comunidad no se enumera de forma cerrada: se representa con un código estable en mayúsculas de 2 a 8 caracteres y un nombre. Así se admiten `CLM`, `MD`, `AR` y futuras comunidades sin cambiar el esquema.

### 4.3. Dificultad y modalidades

`difficulty` separa `level` (`easy`, `medium`, `hard`, `unclassified`) de `basis` (`author`, `review`, `empirical`, `legacy`, `unclassified`) y permite expresar confianza.

`modalities` es una lista con al menos una de:

- `practice`;
- `challenge`;
- `adventure`;
- `topic-exam`;
- `block-exam`;
- `pau-simulation`;
- `open-response`.

Las modalidades permitidas dependen expresamente del perfil:

- `ESO`: `practice`, `challenge`, `adventure`, `topic-exam`, `open-response`;
- `BACH1`: `practice`, `challenge`, `topic-exam`, `open-response`;
- `BACH2_PAU`: `practice`, `challenge`, `topic-exam`, `block-exam`, `pau-simulation`, `open-response`.

Por tanto, `block-exam` en ESO es siempre `ERROR`, aunque exista bloque, y no puede publicarse. Las modalidades describen capacidades futuras del contenido; esta fase no conecta ninguna ruta de producción.

### 4.4. Procedencia PAU y fuente

`provenance` contiene:

- `kind`: distingue PAU oficial, documento original, banco interno, fuente oficial, autoría docente, generado, adaptado, heredado, otro o desconocido;
- `community`: `null` o `{code, name}`;
- `pau`: `null` o metadatos de año, convocatoria, opción, bloque, ejercicio, apartado y metadatos adicionales;
- `source`: identidad, tipo, archivo, ruta interna, página y huella del recurso original.

Todo ejercicio de 2.º Bachillerato requiere etapa `PAU`, `kind: official-pau`, comunidad válida, objeto de metadatos PAU y fuente original trazable. Año y convocatoria se conservan cuando constan: si objetivamente no aparecen en la fuente pueden ser `null`, pero generan `WARNING` y no se inventan valores. Un registro de 2.º sin procedencia o clasificación PAU es `ERROR`.

### 4.5. Enunciado y matemática

`content.statement` conserva dos vistas complementarias:

- `plainText`, útil para búsqueda y diagnóstico;
- `blocks`, documento ordenado cuyos bloques pueden ser texto, matemática en línea o desplegada, imagen, tabla o lista.

Cada bloque puede conservar `sourceLiteral`. No se obliga a convertir destructivamente el original.

`mathRepresentations` registra de forma explícita:

- `plain`;
- `unicode`;
- `latex`;
- `mathml`;
- `mathjson`;
- `legacy-macro`;
- `matrix-array`;
- `image`.

Cada representación declara si es fuente, canónica, derivada o alternativa. Los bloques y representaciones soportan estructuralmente fracciones, potencias, raíces, límites, derivadas, integrales, sistemas con llave, matrices, determinantes, vectores, intervalos, conjuntos, expresiones multilínea y operaciones combinadas. Esta afirmación es estructural: no se ha creado ni modificado ningún renderizador.

Los recursos gráficos se guardan en `assets` con identificador, tipo, URI, texto alternativo y huella opcional.

### 4.6. Respuesta y solución

`answer` separa:

- tipo (`choice`, `number`, `expression`, `set`, `interval`, `matrix`, `multipart`, `open`);
- valor canónico;
- valores aceptados;
- unidades;
- tolerancia.

`solution` declara expresamente `developed`, `final-only` o `missing` e incorpora `pedagogicalProfile` (`ESO`, `BACH1`, `BACH2_PAU`). El validador comprueba su coherencia con curso y etapa.

Una solución desarrollada contiene pasos con explicación y trabajo estructurado, respuesta final, comprobación y restricciones de método opcionales. No se impone un número mínimo universal de pasos: un ejercicio elemental puede resolverse válidamente en un solo paso si ese paso evidencia el procedimiento. Repetir únicamente la respuesta es un defecto objetivo (`ERROR`); cuando no puede determinarse con seguridad si el razonamiento es suficiente se emite `WARNING`. `solutionNeedsReview` conserva la cola de revisión matemática pendiente.

### 4.7. Cuatro opciones sin sesgo A

`choices` es `null` para ejercicios abiertos. Para tipo test contiene:

- `correct`: objeto con ID y valor de la respuesta correcta;
- `distractors`: exactamente tres objetos con ID y valor;
- `shufflePolicy: seeded-per-attempt`;
- `equivalencePolicy: safe-normalization-v1`.

El contrato prohíbe `correctIndex` y `correctPosition`. La letra A/B/C/D no es contenido del ejercicio. La utilidad aislada de materialización acepta cualquier permutación válida de los cuatro IDs y devuelve la posición resultante de la correcta; las pruebas demuestran posiciones 0, 1, 2 y 3. En una fase posterior, una semilla de intento podrá producir esa permutación reproducible; el ID de `correct` conservará inequívocamente la corrección. Este contrato deberá ser consumido por todas las futuras rutas tipo test, pero todavía no altera ninguna de ellas.

Esta fase no cambia el sesgo medido en producción (`1.150/1.426` en A en Práctica/Retos y constructores `763/763` en A).

### 4.8. Revisión, trazabilidad y publicación

`review` contiene estado editorial, `solutionNeedsReview`, hallazgos, revisor y fecha.

`traceability` exige:

- al menos un `inventoryRecordId` de Fase 0;
- identidad original;
- historial de transformaciones, incluso si está vacío.

`publication` separa estado, modalidades elegibles y motivos de exclusión. Los estados son `DRAFT`, `REVIEW`, `APPROVED`, `PUBLISHED`, `REJECTED` y `RETIRED`.

## 5. Salida del validador

`validateCanonicalExercise(exercise, {mode})` devuelve:

```json
{
  "validatorVersion": "mathup.validator.v1",
  "schemaVersion": "mathup.exercise.v1",
  "mode": "publication",
  "status": "ERROR|WARNING|OK",
  "canPublish": false,
  "publicationGate": "BLOCKED|REVIEW_REQUIRED|PASSED",
  "summary": { "errors": 0, "warnings": 0, "diagnostics": 0 },
  "diagnostics": [
    { "severity": "ERROR", "code": "...", "path": "...", "message": "...", "evidence": "..." }
  ]
}
```

- `ERROR`: `BLOCKED`; impide publicar.
- `WARNING`: `REVIEW_REQUIRED`; no permite publicación automática y exige decisión humana.
- `OK`: `PASSED`; supera esta puerta estructural.

`OK` no afirma por sí solo que la matemática sea correcta. Afirma que el registro cumple las reglas estructurales que este validador puede comprobar.

## 6. Reglas exactas del validador

### 6.1. Errores que bloquean

| Familia | Condición |
|---|---|
| Esquema | objeto ausente, versión no soportada, campos obligatorios vacíos o revisión inválida. |
| Identidad | ID/revisión ausentes, número de revisión inválido o `legacyIds` con forma incorrecta. |
| Clasificación | curso, etapa o materia desconocidos; materia incompatible con curso; tema/bloque incompletos; perfil pedagógico incoherente; `block-exam` sin bloque. |
| Modalidad | modalidad no permitida por perfil; en particular, `block-exam` en ESO. |
| Procedencia | fuente sin ID/archivo/ruta; PAU sin comunidad u objeto PAU; PAU fuera de 2.º Bachillerato; cualquier 2.º Bachillerato sin etapa y procedencia PAU oficiales. |
| Enunciado | vacío, sin bloques, bloque incompleto o caracteres deteriorados. |
| Respuesta | valor canónico ausente. |
| Solución | ausente, sin pasos, limitada objetivamente al resultado final o con perfil pedagógico ausente/incoherente. |
| Opciones | modalidad que requiere test sin opciones; no hay 1 correcta + 3 distractores; opción vacía; ID repetido; valor repetido; equivalencia numérica segura; respuesta canónica ausente; varias equivalentes correctas; política de barajado incorrecta; presencia de posición A/B/C/D. |
| Trazabilidad | sin inventario original, identidad original o lista de transformaciones. |
| Publicación | modalidad elegible no declarada o incompatible con el perfil; publicación sin aprobación; estado inválido; `solutionNeedsReview` ya publicado. |

Los caracteres deteriorados incluyen sustitución Unicode, controles, mojibake UTF-8 conocido, palabras matemáticas con `?` y unidades concatenadas demostradas en Fase 0.

### 6.2. Avisos que requieren revisión

| Código | Motivo |
|---|---|
| `SOLUTION_REVIEW_REQUIRED` | la fuente conserva `solutionNeedsReview` antes de publicar. |
| `REVIEW_FINDINGS_OPEN` | existen hallazgos editoriales abiertos. |
| `MATH_REPRESENTATION_UNDECLARED` | hay signos/marcadores matemáticos sin representación explícita. |
| `PAU_MODALITY_UNDECLARED` | procedencia PAU sin modalidad PAU o abierta. |
| `PAU_DETAIL_INCOMPLETE` | año o convocatoria no constan; no se inventan y deben confirmarse. |
| `SOLUTION_DEVELOPMENT_INSUFFICIENT` | no hay evidencia segura de desarrollo razonado, aunque tampoco existe prueba objetiva suficiente para rechazarlo. |
| `SYMBOLIC_EQUIVALENCE_NOT_PROVEN` | varias opciones simbólicas requieren comprobación matemática. |

### 6.3. Equivalencia segura y límites

El validador solo considera demostrada automáticamente la equivalencia de:

- texto idéntico tras Unicode, espacios y signos tipográficos;
- números con coma o punto decimal;
- porcentajes numéricos;
- fracciones de enteros reducidas por máximo común divisor;
- las mismas unidades literales después de normalizar espacios.

No prueba identidades como `x(x+1) = x²+x`, equivalencia de matrices, conjuntos, intervalos complejos, primitivas, resultados trigonométricos ni expresiones con condiciones de dominio. Esos casos producen revisión, no una corrección inventada.

## 7. Pruebas automatizadas

Comando ejecutado con Node 24.19.0:

```text
node --test tests/canonical-exercise-validator.test.mjs
```

Resultado:

- 22 pruebas;
- 22 superadas;
- 0 fallidas;
- 0 omitidas.

Casos cubiertos:

1. ejercicio completo `OK`;
2. respuesta ausente;
3. solución final solamente;
4. revisión antes y después de publicar;
5. fracciones equivalentes;
6. coma/punto decimal;
7. prohibición de posición A/B/C/D;
8. comunidad PAU futura;
9. caracteres deteriorados;
10. equivalencia algebraica no demostrable;
11. trazabilidad incompleta;
12. rechazo de `block-exam` en ESO;
13. coherencia del perfil pedagógico;
14. rechazo de 2.º Bachillerato no PAU;
15. rechazo PAU sin comunidad;
16. PAU válida de Castilla-La Mancha;
17. PAU válida de Madrid;
18. desarrollo insuficiente sujeto a revisión;
19. solución elemental válida en un paso;
20. opciones idénticas;
21. respuesta correcta independiente de A/B/C/D;
22. estructura compleja con matriz, sistema y límite.

El esquema JSON se analizó correctamente como JSON válido durante la verificación.

## 8. Muestra representativa de Fase 0

El script selecciona el primer registro no repetido que satisface cada categoría. Lee el JSON de Fase 0, crea una envoltura canónica temporal en memoria y no escribe en el inventario ni en los bancos.

Comando:

```text
node scripts/fase1-validate-catalog-sample.mjs
```

Resumen:

- 11 categorías solicitadas;
- 11 registros localizados;
- 0 `OK`;
- 3 `WARNING`;
- 8 `ERROR`.

| Categoría | Inventario | Curso/origen | Resultado principal |
|---|---|---|---|
| ESO correcto | `fase0-000053` | 1.º ESO | revisión conservadora de suficiencia del desarrollo original adaptado. |
| 1.º Bachillerato | `fase0-003985` | Matemáticas I | revisión de equivalencia simbólica. |
| 2.º Bachillerato | `fase0-000001` | CCSS II | bloqueado: el inventario no aporta comunidad ni metadatos PAU identificables; además requiere revisar equivalencia simbólica. |
| PAU CLM | `fase0-000387` | CCSS II | sin respuesta ni solución vinculadas. |
| PAU Madrid | `fase0-004251` | Matemáticas II | sin respuesta ni solución vinculadas. |
| Sin solución | `fase0-000389` | CLM | sin respuesta/solución y unidad deteriorada. |
| Solo respuesta final | `fase0-000041` | 1.º ESO | bloqueado por desarrollo insuficiente. |
| Marcado para revisión | `fase0-004118` | CCSS I | revisión obligatoria. |
| Opciones problemáticas | `fase0-004146` | CCSS I | opción duplicada. |
| Caracteres deteriorados | `fase0-000736` | CLM | unidades concatenadas y falta de respuesta/solución. |
| Notación compleja | `fase0-000452` | CLM | representación conservada; faltan respuesta y solución vinculadas. |

Diagnósticos agregados de la muestra:

- `ANSWER_MISSING`: 5;
- `SOLUTION_MISSING`: 5;
- `SOLUTION_FINAL_ONLY`: 1;
- `CHOICE_DUPLICATED`: 1;
- `PAU_COMMUNITY_MISSING`: 1;
- `PAU_METADATA_MISSING`: 1;
- `SOLUTION_DEVELOPMENT_INSUFFICIENT`: 2;
- `SOLUTION_REVIEW_REQUIRED`: 2;
- `SYMBOLIC_EQUIVALENCE_NOT_PROVEN`: 3;
- `REVIEW_FINDINGS_OPEN`: 4.

`CORRUPTED_CHARACTERS` aparece seis veces porque dos enunciados deteriorados se comprueban de manera independiente en texto plano, bloque literal y representación matemática. Son dos registros afectados, no seis ejercicios.

## 9. Falsos positivos y falsos negativos

### 9.1. Falsos positivos conservadores

- `SYMBOLIC_EQUIVALENCE_NOT_PROVEN` aparece en ejercicios correctos de 1.º y 2.º de Bachillerato porque el validador se niega a asumir que expresiones simbólicas distintas no sean equivalentes. Es un aviso deliberado.
- La suficiencia del desarrollo se evalúa sin imponer un mínimo universal de pasos. La repetición demostrable de la respuesta es error; la evidencia dudosa produce aviso para evitar rechazar automáticamente una solución elemental válida.
- Un signo matemático puede activar `MATH_REPRESENTATION_UNDECLARED` aunque el Unicode sea suficiente para mostrarlo. Declarar la representación elimina la ambigüedad sin alterar el texto.

### 9.2. Falsos negativos conocidos

- No se demuestra corrección matemática del enunciado, respuesta o solución.
- No se detectan todas las expresiones algebraicamente equivalentes.
- No se comprueba el método didáctico permitido para cada curso.
- No se valida visualmente MathML, matrices, sistemas, imágenes o gráficos en navegadores.
- No se decide si una guía extensa llega realmente al resultado correcto.
- El adaptador de muestra no resuelve uniones entre registros PAU separados; precisamente conserva como error la ausencia de vínculo inequívoco.
- La regla estricta «todo 2.º Bachillerato es PAU» hace visibles como error los bancos internos de 2.º cuya procedencia PAU no quedó registrada en Fase 0. No se corrigen ni reclasifican automáticamente.
- La taxonomía valida IDs actuales y relaciones curso/materia, pero todavía no contiene un grafo curricular completo tema-bloque-curso.

### 9.3. Límites deliberados de esta fase

- No existe todavía motor de equivalencia simbólica general; los casos inciertos siguen siendo `WARNING`.
- La utilidad de materialización prueba la independencia respecto a A/B/C/D, pero todavía no genera la semilla ni se conecta a consumidores reales.
- El soporte de estructuras matemáticas es de contrato y conservación, no una validación visual ni semántica del renderizado.
- Los códigos de comunidad son extensibles; su catálogo administrativo completo deberá mantenerse externamente sin cerrar el esquema a nuevas comunidades.
- Los datos PAU ausentes no se inventan. Año o convocatoria `null` requieren revisión antes de publicar.

## 10. Incidencias descubiertas durante la prueba

1. La muestra confirma que registros PAU de CLM y Madrid pueden conservar enunciado y procedencia pero carecer de respuesta/solución inequívocamente enlazadas en la fotografía de Fase 0.
2. Se confirmó un registro con opciones textualmente repetidas (`fase0-004146`).
3. Se confirmó que `solutionNeedsReview` debe impedir publicación automática, aunque no se convierta en error editorial hasta intentar publicar.
4. Se confirmó deterioro por unidades concatenadas en registros de CCSS II.
5. Las opciones simbólicas de Bachillerato necesitan una futura capa matemática validada; compararlas como texto sería inseguro.
6. La separación canónica correcta/distractores permite eliminar el supuesto `correct: 0` en una migración futura sin cambiar ahora los bancos.

## 11. Compatibilidad y seguridad

- No hay importaciones desde módulos de producción hacia el validador.
- No se añadió ninguna etiqueta `script`.
- No se cambiaron bancos ni orden de carga.
- No se leyó ni escribió Supabase.
- No se modificaron renderizadores.
- No se modificaron `skill-editor-enunciados` ni `solucion-de-ejercicios`.
- No se inició Mathpix.
- No se cambió el comportamiento público.

## 12. Propuesta concreta para la Fase 2 — no iniciada

La siguiente fase debería construir, previa autorización, un **adaptador de importación reversible**:

1. definir tablas de correspondencia verificadas para curso, materia, tema y bloque;
2. asignar IDs canónicos estables sin tocar IDs originales;
3. unir respuestas/soluciones separadas solo con evidencia inequívoca;
4. generar revisiones canónicas en un artefacto paralelo, nunca sustituyendo bancos;
5. aplicar el validador a cada candidato y producir colas `BLOCKED`, `REVIEW_REQUIRED` y `PASSED`;
6. preparar un barajado determinista por intento que opere sobre IDs de opción;
7. revisar matemáticamente equivalencias simbólicas y soluciones antes de publicar;
8. comparar visualmente las representaciones complejas;
9. no migrar a Supabase hasta que la canalización sea reproducible y aprobada.

La Fase 2 no forma parte de este trabajo y no se ha iniciado.

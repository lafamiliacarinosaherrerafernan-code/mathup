# Fase 0 — Inventario y contrato del catálogo de +MathUp

**Fecha de la fotografía:** 24 de agosto de 2026  
**Documento de arquitectura de referencia:** `docs/PLAN-CANONICO-ENUNCIADOS-SOLUCIONES-CATALOGO-MATHUP.md`  
**Alcance:** inventario reproducible y auditoría de solo lectura.  
**Fuera de alcance:** corregir ejercicios, modificar bancos, cambiar selectores o renderizadores, migrar a Supabase, modificar las skills o iniciar Mathpix.

## 1. Resumen ejecutivo

La fuente de verdad ejecutable actual no es un catálogo único. Es el resultado de cargar 147 scripts en el orden de `index.html`, de los cuales 127 están en `data/`, y aplicar después bancos heredados de `app.js`, parches, constructores, filtros y módulos de examen.

La fotografía obtenida es:

| Métrica | Resultado |
|---|---:|
| Registros localizados | **15.527** |
| Registros declarados/capturados en fuentes | 10.466 |
| Materializaciones de generadores sin correspondencia directa con un registro fuente | 5.061 |
| Registros con enunciado | 9.246 |
| Registros auxiliares sin enunciado, principalmente respuestas/partes/metadatos | 6.281 |
| Ejercicios únicos estimados con enunciado | **6.712** |
| Ejercicios únicos alcanzables por al menos una ruta auditada | **6.105** |
| Ejercicios únicos con enunciado no alcanzados | **607** |
| Identidades totales si se incluyen referencias auxiliares | 6.818 |

«Registro» y «ejercicio» no son equivalentes. Un ejercicio PAU puede tener un registro de enunciado, varios apartados, entradas separadas en un banco de respuestas y una materialización final. Por ello, el total reproducible es 15.527 registros y la estimación de contenido pedagógico distinto es 6.712 ejercicios con enunciado.

No se ha modificado ningún ejercicio. Los hallazgos son diagnósticos; no son correcciones.

## 2. Artefactos reproducibles

- `scripts/fase0-inventory-catalog.mjs`: extractor y sondeador aislado.
- `docs/FASE-0-INVENTARIO-CATALOGO-MATHUP.json`: inventario íntegro, manifiesto de scripts, grupos de duplicados y auditoría por ruta.
- `docs/FASE-0-INVENTARIO-CATALOGO-MATHUP.csv`: vista tabular de los 15.527 registros.
- Este informe.

El JSON conserva, cuando existe, identificador, origen, ruta del objeto, curso, tema, bloque, comunidad, procedencia, enunciado, respuesta, solución, opciones, índice correcto, dificultad, modalidades, indicadores de revisión, formatos matemáticos, incidencias y rutas de accesibilidad.

## 3. Método de inventario

### 3.1. Carga de fuentes

1. Se extrajo de `index.html` la lista ordenada de las 147 etiquetas `script` locales.
2. Se ejecutaron los 127 scripts `data/*.js` en una VM aislada, sin red, sin escribir en los bancos y con almacenamiento del navegador vacío.
3. Después se cargó, en el orden requerido, `math-renderer.js`, `app.js`, `bach-exam.js`, `first-bach-exam.js` y `eso-exam.js`.
4. Tras cada carga se recorrieron los objetos globales y se capturaron objetos con forma de ejercicio, apartado o respuesta. El manifiesto completo y el número de registros introducidos por cada script están en `scriptManifest` del JSON.
5. Los objetos que un parche modifica conservan como `sourceFile` el archivo en el que aparecieron por primera vez; el manifiesto registra también que el parche participó en la composición. El valor inventariado es el valor final tras toda la secuencia.

La ejecución terminó con **cero errores de script**.

### 3.2. Materializaciones y generadores

Se ejecutaron constructores y rutas para todos los cursos y temas configurados:

- `buildQuestions` en aprendiz, maestro y examen;
- `buildAdventureTrainingQuestions` en fácil y difícil;
- bancos controlados de ESO y sus constructores de práctica, reto, aventura y examen;
- bancos de 1.º de Bachillerato, ampliaciones, variedad y combinatoria;
- `MargaritaBachExam.buildTopicQuestions` para Castilla-La Mancha y Madrid;
- constructores por bloques de 2.º de Bachillerato;
- bancos verificados y fuentes verificadas.

La semilla de prueba se fijó en ronda 0 y el historial se vació en cada sondeo. Cuando una salida se pudo unir a un original por `exerciseId`, `rawBaseId`, identificador, texto o combinación procedencia/respuesta, se marcó el original como alcanzable. Cuando un generador produjo una pregunta sin registro persistido equivalente, se añadió como `runtime-materialization`, nunca al banco original.

### 3.3. Identidad y unicidad

La clave estimada se eligió, por orden, de `exerciseId`, `rawBaseId`, identificador actual y huella del enunciado. Es una estimación porque el sistema actual no tiene UUID canónico y un mismo contenido puede poseer IDs distintos.

- **Duplicado exacto:** enunciado extraído idéntico, después únicamente de retirar HTML y normalizar espacios.
- **Posible equivalente:** misma `templateId` o `rawBaseId` con enunciados diferentes. Es una señal para revisión, no una afirmación de duplicidad.
- Las opciones equivalentes se detectaron con normalización conservadora de espacios, signos, decimal con coma/punto y fracciones numéricas simples. No es un CAS y puede dejar equivalencias sin detectar.

## 4. Cobertura por curso

Los recuentos por curso pueden solaparse: una misma identidad puede estar clasificada en más de un curso.

| Curso | Únicos estimados | Únicos alcanzables |
|---|---:|---:|
| 1.º ESO | 967 | 967 |
| 2.º ESO | 521 | 521 |
| 3.º ESO | 675 | 675 |
| 4.º ESO A | 388 | 388 |
| 4.º ESO B | 563 | 563 |
| 1.º Bach. Matemáticas | 76 | 76 |
| 1.º Bach. CCSS | 222 | 216 |
| 2.º Bach. Matemáticas II | 1.926 | 1.387 |
| 2.º Bach. CCSS II | 1.369 | 1.332 |
| Curso sin determinar | 42 | 0 |

La principal concentración de contenido no alcanzado se encuentra en 2.º Bachillerato Matemáticas II (539 identidades), seguida de CCSS II (44), registros sin curso (42) y 1.º Bachillerato CCSS (6).

## 5. Cobertura por procedencia

| Procedencia inferida | Ejercicios únicos con enunciado |
|---|---:|
| No aplica o sin determinar | 3.622 |
| Madrid | 1.687 |
| Castilla-La Mancha | 1.405 |

La clasificación de comunidad se obtiene de campos explícitos, procedencia y fuente. «No aplica o sin determinar» combina contenido no PAU y contenido PAU sin metadato suficientemente uniforme.

Fuentes con más registros:

| Fuente | Registros |
|---|---:|
| `data/madrid-pau-authored.js` | 5.506 |
| Materializaciones de constructores | 5.061 |
| `app.js` | 710 |
| `data/mates-ii-blocks.js` | 516 |
| `data/ccss-ii-blocks.js` | 401 |
| `data/eso1-original-topic9-10-review2.js` | 350 |
| `data/bach-ii-ccss-answer-bank-bridge-2020-2024.js` | 273 |

El desglose exhaustivo por archivo y por procedencia documental está en `summary.bySourceFile`, `summary.byProvenance` y `scriptManifest` del JSON.

## 6. Cobertura temática

Temas con más identidades:

| Tema inferido | Únicos |
|---|---:|
| Sin determinar | 585 |
| Probabilidad | 471 |
| Matrices | 441 |
| Planos y rectas en el espacio | 321 |
| Expresiones algebraicas | 274 |
| Funciones | 273 |
| Sistemas con determinantes | 231 |
| Distribución binomial y normal | 216 |
| Números reales | 189 |
| Límites y continuidad | 187 |
| Proporcionalidad | 162 |
| Derivadas y aplicaciones | 161 |

Hay variantes de etiquetas con y sin tildes, singular/plural y claves internas como `1eso:funciones`. Se han conservado porque esta fase no normaliza ni reclasifica bancos.

## 7. Incidencias cuantificadas

### 7.1. Resumen

| Incidencia | Registros afectados | Identidades con enunciado afectadas |
|---|---:|---:|
| Sin enunciado | 6.281 | no aplica: registros auxiliares |
| Sin respuesta explícita o deducible | 5.034 | 3.231 |
| Sin solución desarrollada | 5.002 | 3.234 |
| Solución detectada como solo respuesta final | 328 | 139 |
| Marcado para revisión | 127 | 127 |
| Caracteres deteriorados | 6 | 6 |
| Problema de notación detectado | 10 | 6 |
| Opciones exactamente repetidas | 16 | 2 |
| Opciones iguales o matemáticamente equivalentes | 31 | 15 |
| Con cuatro opciones | 10.493 | 3.486 |
| Correcta declarada inicialmente en A | 8.518 | 3.098 |

Muchos ejercicios PAU abiertos tienen el enunciado en un inventario y las respuestas en otro banco. «Sin respuesta» significa que el registro materializado no permitió unirla de forma inequívoca durante esta fotografía; no significa necesariamente que nadie haya redactado una respuesta en otro lugar.

### 7.2. Duplicados

- **63 grupos** de enunciados exactos, con **122 ocurrencias adicionales** respecto de conservar una copia por grupo.
- **428 grupos** de posibles equivalentes por plantilla o identidad base compartida.
- Las familias de plantilla pueden ser variantes legítimas con parámetros distintos. Requieren comparación matemática antes de fusionar.

### 7.3. Falta de respuesta o desarrollo

El volumen alto se concentra en material oficial abierto y en registros PAU cuya solución está separada o no ha sido completada. Además, `didacticSolutionText` (`app.js`, alrededor de la línea 2081) puede fabricar el texto «El resultado correcto es…» a partir de la opción correcta cuando no hay solución. Por tanto, que la interfaz muestre una sección de resolución no demuestra que exista un desarrollo didáctico original.

### 7.4. Revisión y deterioro

Se localizaron 127 identidades con indicadores como `solutionNeedsReview`. Los seis casos de deterioro/notación más claros incluyen:

- repetición del encabezado «Elige y resuelve…» en `data/ccss-ii-blocks.js`;
- unidad concatenada `σ=15KgKgKgcmcm2` en `data/ccss-ii-blocks.js`;
- restos de codificación en varios bancos heredados dentro de `app.js`.

La detección es conservadora. La mezcla de Unicode, macros propias y HTML puede contener defectos visuales que solo aparezcan al renderizar un caso concreto.

### 7.5. Formatos matemáticos observados

Un registro puede contar en más de un formato.

| Formato detectado | Registros |
|---|---:|
| Unicode matemático | 7.705 |
| Texto plano/ASCII | 7.104 |
| Macros propias | 697 |
| MathML/HTML nativo | 508 |
| Imagen/HTML | 106 |
| Matriz `[[...]]` | 41 |
| LaTeX | 4 |

No existe todavía una representación matemática única ni un contrato explícito de parseo.

## 8. Ejercicios existentes pero no alcanzables

Se estiman **607 ejercicios únicos con enunciado** no devueltos por ninguna ruta auditada.

Principales orígenes:

| Fuente de primera aparición | Únicos no alcanzados |
|---|---:|
| `data/mates-ii-blocks.js` | 458 |
| `data/coach-data.js` | 32 |
| `data/ccss-ii-integrals-practice.js` | 26 |
| Bancos anuales 2005–2011 y afines | decenas, repartidas |
| `app.js` | 10 |
| `data/ccss-ii-blocks.js` | 9 |
| `data/mates-ii-runtime-fixes.js` | 8 |
| `data/ccss-i-original-exercise-banks.js` | 6 |

Las causas observables son:

- ausencia de clasificación o `topicIndexes` compatible;
- reglas de disponibilidad distintas para práctica y examen;
- bancos que existen pero no están incluidos por el constructor final;
- versiones sustituidas o completadas por parches posteriores;
- contenido auxiliar del coach que no forma parte de las rutas de alumno;
- preguntas abiertas sin las cuatro opciones/solución que exige una ruta tipo test;
- deduplicación por ID, texto o historial;
- modalidad marcada como no elegible.

Ejemplo explícito: `data/eso4b-controlled-practice-banks.js` contiene un registro con elegibilidades desactivadas. También hay reglas en `data/content-availability.js` que permiten ciertos contenidos de CCSS II en práctica pero no en examen.

## 9. Cómo se determinó la accesibilidad real

Se aplicó esta condición verificable:

> Un ejercicio es «alcanzable» si, después de cargar los scripts en el orden real y con su valor final, al menos uno de los constructores o selectores usados por una modalidad lo devuelve y puede unirse de forma inequívoca a su identidad o enunciado.

No bastó con que el archivo estuviera en `index.html`. Se ejecutaron filtros de tema, curso, coherencia, disponibilidad y modalidad, y se registró cada ruta en `accessibleVia`. La auditoría por ruta está en `routeAudits`.

Limitaciones:

- Es una prueba determinista con ronda 0 e historial vacío. Se sondearon los conjuntos completos cuando el selector lo permitió, pero una ruta futura o una configuración no presente hoy podría cambiar el alcance.
- «Alcanzable» no significa «garantizado en la siguiente sesión»; el historial y el número solicitado pueden retrasar su aparición.
- Un ejercicio abierto PAU puede mostrarse sin cuatro opciones en flujos manuales; se considera alcanzable si el constructor oficial lo conserva.
- Las cifras globales deduplican identidades; los desgloses por curso pueden solaparse.
- La pantalla pública requiere autenticación y no expone el catálogo antes de entrar. Para evitar depender de una cuenta concreta, la prueba ejecutó localmente las mismas fuentes y funciones del navegador.

## 10. Auditoría de las cuatro opciones

### 10.1. Dónde se generan

Hay varios mecanismos, no uno:

1. Bancos que ya almacenan `options` y `correct`.
2. `generatedQuestion` en `app.js` (alrededor de la línea 5083): coloca la correcta primero, concatena distractores y completa hasta cuatro con un fallback textual/numérico.
3. Generadores temáticos de ESO y bancos de variedad: construyen distractores mediante errores típicos codificados por plantilla.
4. `withPauTestOptions` en `app.js` (alrededor de la línea 9401): añade manualmente cuatro respuestas a casos PAU concretos y fija `correct: 0`.
5. Bancos de respuestas PAU: guardan opciones por apartado; `bach-exam.js` las une al enunciado oficial.
6. `data/bach-ii-answer-option-balance.js`: redistribuye de forma determinista las posiciones A/B/C/D en bancos PAU cargados antes de `app.js`.

### 10.2. Cómo se crean distractores

- No existe un generador universal.
- En `generatedQuestion` se reciben tres distractores externos; si se repiten textualmente, se añaden candidatos simples hasta alcanzar cuatro.
- Las plantillas especializadas crean errores de signo, operación, exponente, reducción o sustitución.
- Los PAU adaptados utilizan listas redactadas manualmente.
- La comprobación general `questionHasCoherentOptions` exige cuatro textos distintos después de normalizar notación, índice correcto válido, opciones no vacías y solución no meramente instructiva.
- Esa comprobación **no evalúa equivalencia matemática**.

### 10.3. Posición de la correcta y barajado

- Gran parte del contenido nace con `correct: 0`.
- `buildQuestions` rota opciones con `(topicIndex + practiceRound + index) % 4` en varias rutas generales.
- Aventura rota con una fórmula determinista que incluye ronda, tema e índice; su distribución observada es equilibrada.
- `bach-exam.js` rota partes según semilla/slot y conserva la correspondencia con la correcta.
- `data/bach-ii-answer-option-balance.js` asigna cíclicamente A, B, C y D; es determinista.
- `seededShuffle` baraja preguntas con un generador congruencial reproducible, no con azar criptográfico.
- `first-bach-exam.js` y `eso-exam.js` usan `Math.random` para barajar **temas seleccionados**, no para garantizar una política persistente de orden de opciones.
- La semilla/rotación no se persiste como contrato de intento. Reconstruir la misma sesión depende del estado y la ruta.

### 10.4. Resultado medido en salidas materializadas

| Ruta final auditada | Preguntas | Abiertas | Con 4 opciones | A | B | C | D | Equivalentes detectadas |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `buildQuestions` aprendiz/maestro | 1.636 | 210 | 1.426 | **1.150** | 92 | 92 | 92 | 5 |
| `buildQuestions` examen | 818 | 106 | 712 | **574** | 46 | 46 | 46 | 0 |
| Aventura | 1.040 | 0 | 1.040 | 262 | 252 | 258 | 268 | 2 |
| PAU por tema | 4.291 | 4.251 | 40 | 10 | 10 | 10 | 10 | 0 |
| Bloques auditados | 32 | 32 | 0 | 0 | 0 | 0 | 0 | 0 |
| Constructores de examen verificado | 763 | 0 | 763 | **763** | 0 | 0 | 0 | 2 |

Conclusiones:

- **Sí existe un sesgo sistemático hacia A** en Práctica/Retos y en constructores verificados que no aplican una rotación posterior. En los bancos fuente, 3.098 de 3.486 identidades con cuatro opciones declaran la correcta en A.
- Aventura queda casi equilibrada por su rotación determinista.
- La adaptación PAU que pasa por el balanceador queda equilibrada en la muestra.
- No aparecieron opciones textualmente duplicadas en las materializaciones finales sondeadas, porque el filtro las rechaza o un constructor las sustituye.
- Sí aparecieron opciones matemáticamente equivalentes: cinco en las rutas de práctica/reto, dos en aventura y dos en constructores de examen verificado. Ejemplos observados incluyen `1,5 km` frente a `1.5 km` y fracciones como `1/15` frente a `2/30`.
- En fuentes se detectaron dos identidades con duplicado textual, entre ellas una moda con opciones `8, 6, 4, 6` y un rango con `8, 6, 9, 8`.

No se ha corregido ninguna de estas rutas.

## 11. Contrato canónico mínimo recomendado

El contrato mínimo debe ser versionado, inmutable por revisión y capaz de representar preguntas simples, multipartes, abiertas y tipo test.

```json
{
  "schemaVersion": "mathup.exercise.v1",
  "identity": {
    "exerciseId": "uuid-estable",
    "revisionId": "uuid-inmutable",
    "revisionNumber": 1,
    "legacyIds": [],
    "contentHash": "sha256"
  },
  "provenance": {
    "kind": "official-pau|official-source|teacher-authored|generated|legacy",
    "community": null,
    "year": null,
    "session": null,
    "examOption": null,
    "sourceDocument": null,
    "page": null,
    "exerciseLabel": null,
    "sourceFile": null,
    "sourcePath": null,
    "originalAssetHash": null
  },
  "classification": {
    "courseId": "1eso",
    "subjectId": "matematicas",
    "topicIds": [],
    "blockIds": [],
    "curriculumVersion": null
  },
  "content": {
    "statement": { "blocks": [] },
    "parts": [],
    "assets": [],
    "mathRepresentation": "structured-blocks+latex",
    "language": "es"
  },
  "answer": {
    "kind": "choice|number|expression|set|interval|matrix|multipart|open",
    "canonicalValue": null,
    "acceptedValues": [],
    "units": null,
    "tolerance": null,
    "validatorVersion": null
  },
  "solution": {
    "steps": [],
    "finalAnswer": null,
    "verification": null,
    "methodConstraints": [],
    "policyVersion": null
  },
  "choices": {
    "options": [],
    "correctOptionId": null,
    "distractorRationales": {},
    "shufflePolicy": "seeded-per-attempt",
    "equivalenceCheckVersion": null
  },
  "difficulty": {
    "level": "easy|medium|hard",
    "basis": "author|review|empirical",
    "confidence": null
  },
  "modalities": {
    "practice": false,
    "challenge": false,
    "adventure": false,
    "topicExam": false,
    "blockExam": false,
    "pauSimulation": false,
    "exclusionReasons": []
  },
  "workflow": {
    "status": "DRAFT|REVIEW|APPROVED|PUBLISHED|REJECTED|RETIRED",
    "solutionNeedsReview": false,
    "reviewFindings": [],
    "reviewers": [],
    "policyVersions": [],
    "publishedSnapshotId": null
  },
  "generation": {
    "generatorId": null,
    "generatorVersion": null,
    "parameters": null,
    "seed": null
  },
  "trace": {
    "importedAt": null,
    "createdAt": null,
    "reviewedAt": null,
    "publishedAt": null,
    "supersedesRevisionId": null
  }
}
```

Reglas mínimas del contrato:

1. `exerciseId` identifica la obra; `revisionId` identifica una versión inmutable.
2. El original nunca se sobrescribe. Una corrección crea una revisión.
3. Toda procedencia oficial necesita comunidad, año, convocatoria, localización y hash del original.
4. La clasificación es explícita y muchos-a-muchos; no se infiere del nombre de archivo en ejecución.
5. El enunciado y la solución se guardan en bloques estructurados; la matemática tiene una sintaxis canónica y una representación de visualización derivada.
6. La respuesta final es tipada y separada del texto de la solución.
7. Una pregunta tipo test usa IDs de opción; la correcta no depende de la posición del array.
8. Antes de publicar, las cuatro opciones deben ser distintas textual y matemáticamente.
9. El orden visible se deriva de una semilla persistida por intento para reproducir incidencias.
10. Cada modalidad tiene elegibilidad explícita y motivo de exclusión.
11. `PUBLISHED` solo puede alcanzarse tras validación matemática, didáctica, visual y de procedencia.
12. La instantánea publicada referencia revisiones exactas; el cliente no mezcla esa instantánea con bancos heredados.

## 12. Criterios aportados por las skills

Sin modificar ni ejecutar las skills sobre los bancos, se usaron como criterios de auditoría:

- `skill-editor-enunciados`: literalidad del original, procedencia, clasificación, conservación de tablas/figuras y control de notación.
- `solucion-de-ejercicios`: solución independiente y comprobada, desarrollo adecuado al nivel, resultado final coherente y cuatro opciones con una única respuesta válida.

La aplicación actual no registra qué política o versión de skill revisó cada ejercicio. El contrato propuesto incorpora esa trazabilidad.

## 13. Conclusión de Fase 0

La fotografía es reproducible y evidencia tres capas distintas: 15.527 registros, 6.712 ejercicios únicos estimados con enunciado y 6.105 alcanzables por las rutas actuales. La diferencia no debe resolverse borrando contenido: primero debe revisarse identidad, procedencia, clasificación, modalidad y respuesta asociada.

No se inicia la Fase 1. Tampoco se ha realizado migración, corrección, commit ni push.

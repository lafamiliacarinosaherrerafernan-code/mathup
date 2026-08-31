# Auditoría completa de enunciados y soluciones de +MathUp

Fecha de auditoría: 24 de agosto de 2026  
Alcance: revisión estática, completa y exclusivamente de lectura del repositorio en el estado `a79db6feda999f1ff53016820fb1922fb3819cd1`.  
Excepción autorizada a la lectura: creación de este informe. No se han corregido bancos, código, contenidos, skills ni configuración, no se ha ejecutado Mathpix y no se ha creado ningún commit.

## 1. Resumen ejecutivo

+MathUp no tiene un único subsistema de ejercicios, sino una arquitectura web estática que combina un controlador central (`app.js`), 127 ficheros JavaScript bajo `data/`, módulos específicos de examen, un renderizador matemático propio y numerosos bancos históricos, oficiales, generados y de recuperación. `index.html` carga 147 scripts en un orden que forma parte de la lógica de integración.

Los enunciados y las soluciones funcionan en general y cubren de forma real ESO, Matemáticas I y II y Matemáticas Aplicadas a las CCSS I y II. Hay diferencias auténticas por curso: cambia la selección de bancos, el nivel, la estructura de los ejercicios, el tratamiento PAU y, en 2.º de Bachillerato, la unión entre enunciado oficial y banco de respuestas. Sin embargo, esas diferencias están repartidas entre datos, adaptadores, filtros y convenciones; no se expresan mediante un único esquema formal.

Las dos skills solicitadas existen:

- `C:/Users/aherr/.codex/skills/skill-editor-enunciados/SKILL.md`: procedimiento externo para reconstruir y auditar enunciados oficiales en DOCX, conservando literalidad y ecuaciones nativas de Word.
- `.agents/skills/solucion-de-ejercicios/SKILL.md`: política extensa para resolver y redactar soluciones didácticas por curso.

Las skills se usan como instrucciones de autoría y auditoría para trabajos realizados con Codex. No se cargan, invocan ni ejecutan en el navegador de +MathUp. La única referencia operacional localizada en scripts es una nota de trabajo futuro en `scripts/build_exam_reference_inventory.py`; diversos informes de `docs/` documentan que la skill de soluciones se aplicó en incorporaciones anteriores. Por tanto, están vigentes como proceso editorial, pero no están integradas como motor de ejecución de la aplicación.

Las soluciones se almacenan mayoritariamente en los bancos (`solution`) o en bancos de respuestas separados. En ejecución se formatean, se rotan junto con las opciones y, en algunos casos, se reorganizan en pasos. No hay un generador matemático de soluciones en tiempo real. Cuando falta una solución, `didacticSolutionText()` puede construir una explicación mínima a partir de la opción correcta; esto es una presentación de emergencia, no una resolución matemática demostrada.

Se identifican aproximadamente cinco familias de representación matemática en producción, más una sexta procedente del reconocimiento manuscrito:

1. texto plano con Unicode y notación ASCII;
2. mini-lenguaje propio (`frac{}`, `sqrt(...)`, `[[...]]`, marcadores gráficos);
3. subconjunto residual de LaTeX aceptado por el normalizador;
4. HTML y MathML nativo procedente de Word;
5. imágenes y recortes de PDF para material visual;
6. salida LaTeX/JIIX de MyScript, solo como entrada de reconocimiento y validación.

Los riesgos principales son la fragmentación de fuentes de verdad, la dependencia del orden de carga, la coexistencia de formatos, la existencia de soluciones incompletas o marcadas para revisión, la generación de una falsa apariencia de explicación cuando solo existe la respuesta y la presencia de contenido histórico con caracteres deteriorados. No se ha encontrado un fallo crítico transversal que inutilice todo el sistema, pero sí varios problemas de severidad alta que impiden considerar uniforme y auditada toda la colección.

La primera pieza que conviene corregir no es la interfaz: debe definirse un esquema canónico de ejercicio y una única puerta de validación en la incorporación de bancos. Esa capa debe validar enunciado, representación matemática, opciones, respuesta, solución, nivel didáctico, procedencia y estado de revisión antes de que el ejercicio pueda entrar en producción.

## 2. Arquitectura actual

### 2.1. Núcleo de la aplicación

| Archivo o módulo | Responsabilidad observada |
|---|---|
| `index.html` | Declara el orden de carga. Carga configuración, bancos, parches, reconocimiento, renderizador y módulos de interfaz. El orden es funcional, no meramente organizativo. |
| `app.js` | Controlador principal: normalización, selección de bancos, práctica por temas, aventuras, presentación de enunciados, opciones, corrección y soluciones. Contiene además un banco histórico inline. |
| `math-renderer.js` | Renderizador matemático compartido `MargaritaMathRenderer`: normaliza y presenta fracciones, raíces, potencias, límites, derivadas, integrales, matrices, determinantes, sistemas, vectores y funciones a trozos. |
| `bach-exam.js` | Adapta ejercicios oficiales de 2.º de Bachillerato, une enunciados crudos con bancos de respuestas, rota opciones y construye práctica/examen por bloques. |
| `first-bach-exam.js` | Interfaz y flujo de examen de 1.º de Bachillerato. |
| `eso-exam.js` | Interfaz y flujo de examen de ESO. |
| `developer-mode.js` | Expone herramientas internas, incluido el piloto MyScript, solo en el entorno habilitado. |
| `data/*.js` | 127 módulos de contenido, índices, catálogos, bancos, respuestas, ampliaciones y reparaciones de ejecución. |
| `scripts/*` | 67 herramientas de importación, extracción, generación, inventario y auditoría. No forman parte del navegador. |

No hay un empaquetador que resuelva dependencias de módulos. Los objetos se publican normalmente en `window`, y scripts posteriores completan, reemplazan o reparan datos anteriores. Esto explica por qué `index.html` contiene 147 etiquetas de script y por qué una alteración de orden puede cambiar el catálogo activo.

### 2.2. Funciones clave de `app.js`

| Función | Línea aproximada | Papel |
|---|---:|---|
| `normalizeDisplayText()` | 1154 | Corrige restos de codificación, normaliza texto y repara algunas secuencias históricas. |
| asignación de `MargaritaMathRenderer` | 1500 | Sustituye las implementaciones locales por el renderizador compartido si está disponible. |
| `formatMathHtml()` | 1525 | Renderiza HTML conservando fragmentos y procesando sus nodos de texto. |
| renderizadores de diagramas | 1529–1885 | Interpretan marcadores de tablas, gráficas, áreas, Gauss, Cramer, cofactores y geometría. |
| `formatSolutionText()` | 1886 | Interpreta marcadores especiales de solución, aplica formato matemático y estructura visual. |
| `solutionApproach()` | 2061 | Genera indicaciones genéricas por palabras clave; no se encontró como base principal del flujo de soluciones mostrado. |
| `didacticSolutionText()` | 2081 | Usa `question.solution`; si falta, crea una salida mínima a partir de la opción correcta. |
| `officialQuestionStatementHtml()` | 4087 | Prioriza `statementHtml`; si no existe, renderiza `text`. Incluye una defensa para matrices fragmentadas. |
| `renderStudy()` | 4112 | Presenta práctica por temas, opciones, corrección y solución. |
| `questionHasCoherentOptions()` | 4714 | Rechaza opciones incompletas, duplicadas, índice incorrecto o soluciones no utilizables. |
| `solutionIsInstructionOnly()` | 4746 | Detecta soluciones que son únicamente una instrucción o texto no resolutivo. |
| `buildQuestions()` | 8536 | Despacha por curso, tema y modalidad hacia los bancos y constructores adecuados. |
| `handwritingAnswerHtml()` | 8679 | Entrega respuesta y contexto a la pizarra manuscrita. |
| `pickExerciseBank()` | 9942 | Relaciona curso/tema con bancos específicos. |
| `exerciseBanks` | 10039 | Banco inline histórico y genérico, coexistente con los módulos de `data/`. |
| `showSolutionHelp()` | 11419 | Muestra la solución de una parte o la salida de `didacticSolutionText()`. |

### 2.3. Módulos y scripts de incorporación

| Archivo | Función real |
|---|---|
| `scripts/build_exercise_source_inventory.mjs` | Inventaría DOC, DOCX y PDF, extrae texto, asigna curso/tema y genera inventarios de material pendiente. |
| `scripts/build_exam_reference_inventory.py` | Cataloga referencias de examen por curso y tema. Contiene una nota de aplicar posteriormente la skill de soluciones. |
| `scripts/build_ccss_block_bank.py` | Lee DOCX como ZIP/XML, transforma OMML mediante XSLT a MathML, extrae imágenes y crea bancos JS de CCSS II. |
| `scripts/build_mates_block_bank.py` | Reutiliza el renderizado DOCX para Matemáticas II y separa ejercicios y apartados. |
| `scripts/build_madrid_pau_*.ps1` y scripts OCR asociados | Construyen manifiestos, cachés de diseño y bancos PAU de Madrid, con recortes de enunciado/solución cuando son necesarios. |
| `scripts/render_pdf_pages.ps1` | Renderiza páginas PDF para extracción o inspección. |
| `scripts/ocr_pdf_windows.ps1`, `ocr_image_layout.ps1`, `build_pdf_ocr_layout_cache.ps1` | OCR y reconstrucción de disposición visual. |
| `scripts/audit_math_renderer.mjs` | Pruebas estáticas del renderizador para las principales familias de notación. |
| `scripts/audit_*course*`, `audit_*bank*`, `audit_*exam*` | Auditores parciales por curso, banco o modalidad. No constituyen una validación unificada de todo ejercicio activo. |

## 3. Estado real de la skill de Enunciados

### 3.1. Existencia y ubicación

Existe en `C:/Users/aherr/.codex/skills/skill-editor-enunciados/SKILL.md`. Sus referencias directas son:

- `references/control-calidad.md`: criterios de auditoría de Word, literalidad, ecuaciones OMML, figuras, tablas y comprobación visual.
- `references/clasificacion.md`: criterios para clasificar ejercicios por bloques y temas.

### 3.2. Qué regula

La skill define un flujo editorial externo:

1. usar el PDF oficial como única fuente de verdad;
2. conservar literalmente el enunciado;
3. recuperar omisiones sin inventar contenido;
4. transformar la matemática en ecuaciones nativas de Word;
5. preservar tablas y figuras necesarias;
6. clasificar por bloques;
7. auditar el DOCX final estructural y visualmente.

No describe el esquema JavaScript de +MathUp ni la conversión final a los seis formatos que coexisten en la aplicación. Su objetivo principal es producir documentos Word editables fieles.

### 3.3. Invocación e integración

No hay importación de `SKILL.md`, llamada a un agente o carga de instrucciones desde `index.html`, `app.js` o los módulos de datos. La aplicación no puede invocarla en ejecución. Los scripts de DOCX aplican algunos principios compatibles —OMML, MathML, imágenes, división por apartados—, pero no leen la skill.

Conclusión: la skill existe y sigue siendo útil para la preparación y auditoría editorial, pero no es un componente integrado del runtime. La trazabilidad entre “documento elaborado con la skill” y “registro publicado en un banco” depende hoy del proceso humano y de scripts específicos.

## 4. Estado real de la skill de Soluciones

### 4.1. Existencia y ubicación

Existe en `.agents/skills/solucion-de-ejercicios/SKILL.md`. Es una política extensa que cubre 1.º, 2.º, 3.º y 4.º de ESO —con separación A/B—, Matemáticas I y II y CCSS I y II.

### 4.2. Qué regula

La skill exige, entre otros puntos:

- resolver independientemente y comprobar el resultado;
- mantener literalidad del enunciado;
- preferir una solución almacenada y validada;
- explicar pasos, no solo dar la respuesta;
- adaptar métodos y profundidad al curso;
- respetar métodos didácticos permitidos o desaconsejados por nivel;
- presentar opciones tipo test coherentes;
- usar la convención matemática propia de la aplicación sin mostrar sintaxis cruda.

Incluye reglas específicas por curso, por ejemplo métodos de factorización, sistemas, límites, derivación, integración, probabilidad y estadística.

### 4.3. Invocación e integración

No hay un motor de agentes en el navegador ni una llamada automática a esta skill. `scripts/build_exam_reference_inventory.py:288` la menciona como acción posterior; documentos de incorporación y auditoría indican que se aplicó manualmente en fases concretas. Eso prueba uso editorial, no uso automático.

La lógica de ejecución no conoce las prohibiciones o preferencias didácticas de la skill. `didacticSolutionText()` formatea cualquier cadena recibida y no valida que el método sea apropiado para el curso. La función genérica `solutionApproach()` contiene indicaciones por palabras clave que podrían entrar en conflicto con reglas de nivel si en el futuro se conectara sin control; actualmente no es la fuente principal de las resoluciones mostradas.

Conclusión: la skill está vigente como norma de producción, pero no garantiza por sí misma que todas las soluciones ya existentes la cumplan.

## 5. Flujo completo del ejercicio

### 5.1. Flujo general

```text
Fuente DOC/DOCX/PDF/autoría JS
        ↓
extracción u OCR / transcripción / construcción de plantilla
        ↓
banco JS, banco crudo oficial o manifiesto visual
        ↓
parches y bancos de respuestas cargados por index.html
        ↓
selección por curso, tema, modalidad y dificultad
        ↓
filtro de coherencia + rotación de opciones
        ↓
render de text/statementHtml con MargaritaMathRenderer
        ↓
respuesta por opción o pizarra manuscrita controlada
        ↓
corrección contra correct/expectedExpression
        ↓
solution almacenada → didacticSolutionText → formatSolutionText
```

### 5.2. Flujo de ESO

`buildQuestions()` deriva hacia constructores ESO, bancos verificados o bancos de tema. `pickExerciseBank()` y los índices de contenido limitan el curso y tema. El alumno recibe normalmente un objeto de opción múltiple con `text`, cuatro `options`, `correct` y `solution`. Las modalidades aprendiz/maestro y práctica/examen filtran dificultad y elegibilidad.

### 5.3. Flujo de 1.º de Bachillerato

Se combinan bancos suministrados, bancos verificados y expansiones parametrizadas. En `data/first-bach-variety-banks.js`, por ejemplo, `question()` construye cuatro opciones, fija inicialmente `correct: 0` y almacena una cadena `solution`. La rotación posterior conserva la correspondencia de la respuesta correcta.

### 5.4. Flujo de 2.º de Bachillerato

Es el flujo más complejo:

1. `data/mates-ii-blocks.js`, `data/ccss-ii-blocks.js` o los bancos PAU de Madrid aportan enunciados oficiales, apartados, procedencia, HTML/MathML e imágenes.
2. `answerBank()` en `bach-exam.js:158` elige el banco de respuestas por comunidad y curso.
3. `completeRawExercise()` (`bach-exam.js:386`) une cada apartado oficial con cuatro opciones, índice correcto y solución.
4. `exerciseIsComplete()` (`bach-exam.js:178`) exige que todos los apartados tengan cuatro opciones distintas, respuesta válida y solución no vacía.
5. `prepareMatchedExercise()` (`bach-exam.js:937`) conserva el enunciado oficial, rota opciones y recalcula el índice correcto.
6. `MargaritaBachExam.buildTopicQuestions` y `buildBlockQuestions` exponen el catálogo preparado.

Este diseño permite fidelidad oficial, pero separa enunciado y respuesta en distintos archivos y depende de identificadores, coincidencias y orden de carga.

## 6. Estructuras de los bancos

No existe una interfaz única formal. Estos son los campos realmente observados.

### 6.1. Pregunta simple

```js
{
  id?, rawBaseId?, courseId?, topicIndex?,
  source?, sourceType?, sourceDocument?, sourceExercise?,
  difficulty?, practiceEligible?, examEligible?,
  text,
  statementHtml?,
  options: [String, String, String, String],
  correct: Number,
  solution: String,
  solutionNeedsReview?
}
```

### 6.2. Ejercicio oficial multipartes

```js
{
  id, community?, year?, source, sourceType?, officialStatus?,
  statement: [{ plain, html? }],
  referenceTable?, sourceAsset?, topicIndexes?,
  parts: [{
    partId?, label,
    paragraphs: [{ plain, html? }],
    topicIndexes?, referenceTable?, sourceAsset?
  }]
}
```

El banco de respuestas paralelo añade por parte:

```js
{
  options: [String, String, String, String],
  correct: Number,
  solution: String
}
```

### 6.3. Campos y frecuencia aproximada

Una búsqueda estática sobre los datos encontró aproximadamente 1.408 apariciones explícitas de `options`, 1.226 de `correct`, 1.395 de `solution`, 370 de `text`, 62 campos `statementHtml`, 117 estructuras `parts`, 84 referencias `sourceDocument` y 31 `sourceAsset`. Estas cifras no equivalen al total activo: constructores, objetos minificados, expansiones y propiedades abreviadas generan registros adicionales en ejecución.

No se encontraron campos generalizados como `solutionHtml`, `validationType`, `expectedAnswer` o una especificación didáctica formal por pregunta. Esa información se infiere o se entrega como contexto desde el controlador.

### 6.4. Ejemplos reales

- **1.º ESO:** `data/eso-exam-verified-banks.js` incluye un problema de descuento del 12 % en un televisor. Almacena procedencia, dificultad, cuatro opciones y una solución con factor porcentual, cálculo, comprobación y resultado. Es correcta y adecuada al nivel.
- **1.º Bachillerato:** `data/first-bach-variety-banks.js` genera, entre otros, simplificación de radicales, logaritmos, racionalización y potencias. Cada objeto contiene solución calculada en la plantilla y respuesta final.
- **2.º Bachillerato:** los bancos oficiales de bloques almacenan el enunciado y sus apartados, mientras `MATES_II_EXAM_ANSWERS`, `CCSS_II_EXAM_ANSWERS` o `MADRID_PAU_AUTHORED` aportan opciones y soluciones. Un ejemplo de matrices de junio de 2000 resuelve completamente un sistema matricial en once pasos y verifica las matrices finales.

## 7. Representación matemática

### 7.1. Sistemas coexistentes

| Familia | Ejemplos | Transformación y presentación | Riesgo |
|---|---|---|---|
| Texto/Unicode/ASCII | `√`, `²`, `∞`, `x^2`, `1/2`, `sen` | `normalizeDisplayText()` y `MargaritaMathRenderer.normalize()` | Ambigüedad de precedencia y aspecto desigual. |
| Mini-lenguaje propio | `frac{a}{b}`, `sqrt(x)`, `[[1,2],[3,4]]`, `[[signchart ...]]` | Parser equilibrado y renderizadores especializados | No es estándar; cualquier variante no reconocida puede quedar visible. |
| LaTeX residual | `\frac`, `\sqrt`, `\leq`, `\begin{cases}` | Se acepta un subconjunto y se convierte a la representación propia | No hay cobertura total de LaTeX ni MathJax/KaTeX. |
| HTML/MathML | `statementHtml`, `<math class="native-math">` | El navegador presenta MathML; el walker evita reprocesar `<math>` | Dependencia de soporte de navegador y consistencia CSS. |
| Imagen/PDF | `<img>`, `sourceAsset`, recortes PAU | Se preserva como recurso visual | Accesibilidad, escala, carga y dependencia del fichero. |
| MyScript JIIX/LaTeX | respuesta reconocida | Normalización → render compartido → validador | Solo piloto; salida variable y validación limitada. |

Conteos orientativos en los datos: unas 2.074 apariciones del marcador `frac{`, 39 de `\frac`, 4.623 del símbolo `√`, 16 de `sqrt(`, 2.564 de `[[`, 3.465 de `<math>`/`native-math`, 154 etiquetas `<img>` y 12 marcadores `signchart`. Son apariciones de sintaxis, no ejercicios distintos.

### 7.2. Cobertura por estructura

| Estructura | Almacenamiento observado | Renderizado |
|---|---|---|
| Fracciones | `/`, `frac{}`, `\frac`, MathML | Fracción HTML propia o MathML. |
| Raíces | Unicode `√`, `sqrt(...)`, `\sqrt`, MathML | Radical propio, con índice cuando procede. |
| Potencias/subíndices | `^`, Unicode, MathML | Superíndices y subíndices HTML. |
| Límites | texto `lim`, flechas, subscrito, LaTeX residual | Composición propia de operador, variable y destino. |
| Sistemas | líneas de ecuaciones, delimitadores y variantes MyScript | `renderSystem()` crea llave y filas. |
| Matrices | `[[...]]`, tuplas, `pmatrix/bmatrix`, MathML | Tabla HTML con paréntesis/corchetes. |
| Determinantes | matrices con convención de determinante, `vmatrix`, MathML | Tabla con barras verticales. |
| Vectores | texto, `vec`, flecha, coordenadas, MathML | Flechas/símbolos y tuplas normalizadas. |
| Funciones a trozos | texto compacto, `cases`, MathML | Llave y filas con condición. |
| Derivadas | primas, `d/dx`, fórmulas en texto/MathML | Normalización de primas y fracciones de Leibniz. |
| Integrales | `∫`, límites en texto, LaTeX residual, MathML | Operador y límites propios o MathML. |
| Trigonometría | `sen/sin`, `tg/tan`, Unicode/MathML | Normalización española configurable. |
| Probabilidad | `P(A∩B)`, fracciones, tablas/árboles por texto o marcador | Operadores Unicode y diagramas especializados. |
| Estadística | fórmulas de media, desviación, intervalos, tablas e imágenes | Texto matemático, fracciones y recursos visuales. |

### 7.3. Hallazgos específicos

- No se carga MathJax ni KaTeX. El sistema depende del renderizador propio y del soporte nativo de MathML.
- `math-renderer.js` evita procesar `code`, `pre`, `math` y `svg`, lo que protege el MathML ya convertido.
- Existen implementaciones matemáticas antiguas en `app.js` que después son sustituidas por `MargaritaMathRenderer`. La duplicación aumenta el riesgo de que una ruta use una versión distinta.
- El renderizador tiene defensas específicas para salidas compactadas o anómalas de MyScript. Eso mejora robustez, pero mezcla necesidades de bancos, interfaz y reconocimiento en una misma capa.
- Las apariciones localizadas de `\(` en `data/` corresponden principalmente a expresiones regulares de búsqueda, no a delimitadores LaTeX visibles en enunciados. No se debe interpretar el conteo bruto como doce fallos de presentación.

## 8. Sistema de soluciones

### 8.1. Origen

Las soluciones proceden de cuatro fuentes principales:

1. cadenas escritas directamente en bancos simples;
2. cadenas calculadas por constructores parametrizados al crear el banco en memoria;
3. bancos de respuestas separados que se unen a enunciados oficiales;
4. soluciones visuales o estructuradas mediante marcadores interpretados por `formatSolutionText()`.

No se encontró generación por IA ni resolución simbólica en tiempo real. `solutionApproach()` solo contiene heurísticas textuales. `didacticSolutionText()` no recalcula la matemática: toma la cadena existente y puede dividirla o numerarla; si no hay cadena, usa la opción correcta para una salida de emergencia.

### 8.2. Muestras representativas

| Nivel | Muestra revisada | Evaluación |
|---|---|---|
| 1.º ESO | descuento porcentual en `eso-exam-verified-banks.js` | Correcta, completa, clara, con comprobación y vocabulario adecuado. |
| 3.º/4.º ESO | problemas algebraicos y sistemas de bancos controlados | En las muestras revisadas hay planteamiento, operación y respuesta contextual. La calidad es superior en bancos curados recientes que en el banco inline histórico. |
| Matemáticas I | radicales, logaritmos y complejos de `first-bach-variety-banks.js` | Cálculos correctos en las muestras. Soluciones claras pero de estructura repetitiva por proceder de plantillas. |
| Matemáticas II | sistema matricial de junio de 2000 en `app.js` | Resolución completa, coherente y con resultado verificado por sustitución matricial. |
| CCSS II | continuidad y área, y estudio de una cúbica por tramos | Muestras correctas, con cálculo de continuidad, derivada, signos, extremos e integral. |
| CCSS II histórico | varios ejercicios `pau-open` | Parte del catálogo solo ofrece “Solución guiada” y termina antes del cálculo numérico final. Es una pauta, no una solución completa. |
| CCSS I original | `ccss-i-original-exercise-banks.js` y combinatoria | Los objetos llevan `solutionNeedsReview: true`; algunas soluciones son únicamente `Resultado final: ...`. No cumplen la política completa de la skill. |

### 8.3. Coherencia y controles

Funcionan correctamente:

- comprobación de cuatro opciones distintas;
- validación del índice `correct`;
- rotación conjunta de opciones y respuesta correcta;
- rechazo de algunas soluciones que solo contienen instrucciones;
- unión de apartados oficiales únicamente si hay respuesta y solución por cada parte.

Limitaciones:

- `solutionNeedsReview` es metadato informativo en determinados bancos; no se observó una prohibición global que impida servir todo registro marcado;
- una solución no vacía puede ser matemáticamente incompleta;
- no existe comprobación simbólica general entre `solution`, opción correcta y enunciado;
- no existe un campo de estado editorial uniforme (`draft`, `verified`, `official`, `reviewedBy`, versión de auditoría);
- el formateo dinámico puede hacer parecer extensa una explicación que no fue matemáticamente validada.

## 9. Diferencias por nivel

### 9.1. ESO

Hay separación real por curso y temas, modalidades de práctica y examen, dificultad y elegibilidad. Los bancos más recientes contienen metadatos de procedencia y reglas de conexión. La estructura dominante es test de cuatro opciones con solución almacenada. También subsisten bancos históricos inline y contenido recuperado por OCR.

### 9.2. 1.º de Bachillerato

Se distingue Matemáticas I de CCSS I. Hay bancos suministrados y expansiones parametrizadas. La dificultad y los temas son distintos de ESO, pero gran parte de la adaptación didáctica reside en cómo se escribió el banco, no en una regla runtime que valide métodos.

### 9.3. 2.º de Bachillerato

La diferencia es sustancial: estructura PAU, comunidades, bloques, ejercicios multipartes, procedencia oficial, enunciados MathML/imágenes y bancos de respuestas separados. `bach-exam.js` aplica controles de completitud y adapta la selección por bloques y familias.

### 9.4. Conclusión sobre adaptación

Sí existen diferencias reales por curso; no son solo etiquetas. No obstante, no hay una única política de solución ejecutable por nivel. Las reglas didácticas detalladas de la skill no se consultan automáticamente, de modo que el cumplimiento depende del banco concreto y de su proceso editorial.

## 10. Problemas encontrados

1. **Fuentes de verdad fragmentadas.** Enunciados, respuestas y reparaciones pueden vivir en `app.js`, distintos ficheros `data/`, bancos de respuestas y scripts de corrección.
2. **Orden de carga con efecto funcional.** Los 147 scripts se apoyan en variables globales y parches sucesivos.
3. **Esquema heterogéneo.** Preguntas simples, multipartes oficiales, HTML, MathML, imágenes y marcadores especiales no comparten una validación formal única.
4. **Soluciones pendientes de revisión.** `data/ccss-i-original-exercise-banks.js` y `data/ccss-i-original-combinatorics-bank.js` contienen `solutionNeedsReview: true`.
5. **Guías que no resuelven.** En el banco PAU histórico inline hay soluciones que indican “calcula”, “sustituye” o “resuelve” y no ofrecen el valor final.
6. **Fallback insuficiente.** Si falta `solution`, `didacticSolutionText()` puede construir una resolución a partir de la opción correcta sin demostrarla.
7. **Texto histórico deteriorado.** Se localizaron secuencias reales como `t?rminos`, `ra?z`, `n?mero`, `notaci?n cient?fica`, `par?bola`, `hip?rbola` en el banco inline y numerosos restos OCR en `data/eso-topic-content.js`. Parte se corrige al vuelo, pero no toda la fuente queda limpia.
8. **Codificación heredada en fórmulas.** Hay `Â±` en soluciones históricas de intervalos de confianza; el normalizador intenta repararlo antes de mostrarlo.
9. **Rutas locales en contenido.** `data/eso-topic-content.js` contiene referencias absolutas a rutas de Windows de la máquina de desarrollo. Afectan portabilidad y trazabilidad, aunque no todas se usan como recurso público.
10. **Duplicación de renderizadores.** `app.js` conserva lógica matemática antigua antes de delegar en `math-renderer.js`.
11. **Sintaxis propia no estándar.** La cobertura actual es amplia, pero una variante no prevista puede quedar como texto crudo o interpretarse mal.
12. **Dependencia del navegador para MathML.** La apariencia de material oficial puede variar y necesita pruebas visuales reales en navegadores objetivo.
13. **Marcadores de solución acoplados al código.** Diagramas y tablas requieren nombres exactos que solo entiende `formatSolutionText()`.
14. **Procedencia desigual.** Los bancos oficiales modernos tienen buena trazabilidad; el banco inline y varias expansiones genéricas no siempre identifican documento y ejercicio de origen.
15. **Auditorías parciales dispersas.** Existen muchos scripts de auditoría, pero no una única puerta que recorra el catálogo final exactamente como queda tras todos los scripts.
16. **Conteos difíciles de reproducir.** Los objetos se generan en memoria y se completan por parches; contar campos en archivos no equivale a contar preguntas activas.
17. **MyScript no cubre toda la matemática.** El validador automático es sólido para números, fracciones, polinomios y ecuaciones sencillas, pero no garantiza equivalencia de toda respuesta avanzada.
18. **Ausencia de confianza MyScript.** El piloto documenta que no hubo confianza numérica utilizable; no debe convertirse automáticamente en puntuación.
19. **Política de curso fuera del runtime.** Las reglas detalladas de la skill no impiden que un método inadecuado para un nivel llegue desde un banco antiguo.
20. **Terminología inconsistente.** Conviven “Solución”, “Resolución”, “Solución guiada” y salidas solo con resultado final.

## 11. Clasificación por severidad

### Crítica

No se identificó mediante auditoría estática un defecto único que rompa todos los enunciados o todas las soluciones, ni exposición de credenciales dentro del alcance inspeccionado. Esta conclusión no sustituye pruebas funcionales de todo el catálogo.

### Alta

- fragmentación de fuentes de verdad y dependencia del orden de carga;
- ejercicios con solución marcada para revisión que pueden coexistir con contenido activo;
- guías incompletas presentadas como soluciones;
- fallback que puede aparentar una resolución sin cálculo validado;
- ausencia de un esquema y auditor final únicos para el catálogo efectivo;
- coexistencia de representaciones matemáticas con rutas de render distintas.

### Media

- caracteres históricos deteriorados y correcciones al vuelo;
- duplicación de normalizadores/renderizadores;
- dependencia de MathML nativo y recursos de imagen;
- trazabilidad desigual entre bancos;
- marcadores de solución fuertemente acoplados;
- MyScript limitado a piloto y validadores parciales;
- falta de estado editorial uniforme y versionado de revisión.

### Baja

- textos deteriorados solo en comentarios;
- terminología no uniforme;
- metadatos redundantes;
- código de aproximación didáctica actualmente no conectado que podría inducir a errores si se reutiliza sin revisar.

## 12. Qué funciona correctamente

- La aplicación separa el acceso del alumno por curso y la selección de ejercicios respeta curso/tema en los constructores principales.
- Hay cobertura real y diferenciada para ESO, Matemáticas I/II y CCSS I/II.
- El renderizador común cubre una variedad matemática amplia sin depender de un servicio externo.
- El MathML procedente de Word conserva fórmulas oficiales complejas y no se reprocesa destructivamente.
- Los bancos PAU de 2.º de Bachillerato conservan estructura, apartados, procedencia y, en Madrid, comunidad y recursos visuales.
- `bach-exam.js` exige respuestas completas por apartado antes de construir un ejercicio oficial corregido.
- La rotación de opciones recalcula correctamente el índice de respuesta.
- Los filtros detectan opciones duplicadas y varias formas de solución no utilizable.
- Muchas soluciones curadas incluyen planteamiento, desarrollo, comprobación y resultado.
- Existen scripts de auditoría específicos para cursos, bancos, renderizador y reconocimiento.
- MyScript está desacoplado mediante proveedor y proxy seguro; el piloto documentado no lo convierte en corrector público general.
- Mathpix no está integrado ni fue iniciado durante esta auditoría.

## 13. Qué necesita mejora

1. Definir un esquema canónico versionado para todo ejercicio.
2. Construir el catálogo final mediante una sola canalización reproducible, en vez de depender de parches globales.
3. Rechazar en producción cualquier `solutionNeedsReview`, solución vacía, guía inconclusa o respuesta no demostrada.
4. Validar correspondencia entre enunciado, opciones, correcta y solución mediante reglas estructurales y auditoría matemática.
5. Elegir una representación canónica de almacenamiento y relegar las demás a importadores/adaptadores.
6. Añadir pruebas visuales por navegador para MathML, matrices, sistemas, límites y funciones a trozos.
7. Eliminar gradualmente la lógica de render duplicada tras comprobar equivalencia.
8. Incorporar metadatos de procedencia y revisión a todos los bancos, incluidos los históricos.
9. Convertir rutas locales y recursos de desarrollo en referencias portables o metadatos no publicados.
10. Hacer que la política por curso sea validable por máquina: métodos admitidos, profundidad mínima y estructuras requeridas.
11. Mantener reconocimiento manuscrito y validación separados de la generación de soluciones.
12. Crear un informe automático del catálogo final con número de ejercicios activos, origen, representación, estado de solución y curso.

## 14. Riesgos de modificar cada componente

| Componente | Riesgo principal al modificarlo | Precaución recomendada |
|---|---|---|
| `index.html` | Cambiar el orden puede dejar bancos incompletos o hacer que un parche se aplique antes de su base. | Generar un mapa de dependencias y una prueba de arranque/catálogo. |
| `app.js` | Afecta práctica, aventuras, corrección y soluciones de todos los cursos. | Dividir cambios por función y comparar catálogo/render antes y después. |
| `math-renderer.js` | Una mejora para una sintaxis puede romper otra, URLs o texto ordinario. | Ampliar primero `audit_math_renderer.mjs` con casos reales. |
| bancos `data/*.js` | Cambiar un objeto puede alterar índices, rotación, filtros o coincidencia oficial. | Validar identificadores, respuesta, solución y elegibilidad. |
| bancos de respuestas | Desalineación con apartados oficiales. | Unir por identificador estable y comprobar todos los apartados. |
| `bach-exam.js` | Puede romper PAU por tema, bloques, comunidad o alternancia. | Probar CLM y Madrid, Matemáticas II y CCSS II por separado. |
| scripts DOCX/PDF/OCR | Riesgo de pérdida de literalidad, fórmulas o recursos visuales. | Mantener fuente original y comparación visual obligatoria. |
| marcadores gráficos de soluciones | Renombrar un marcador deja texto visible o elimina un diagrama. | Formalizar gramática y añadir casos de prueba por marcador. |
| normalización de codificación | Reemplazos globales pueden cambiar texto legítimo. | Reparar preferentemente la fuente y limitar reglas a patrones demostrados. |
| skill de enunciados | Una modificación puede rebajar literalidad o cambiar el formato Word esperado. | Versionar la skill y probar con documentos oficiales representativos. |
| skill de soluciones | Puede cambiar métodos didácticos de varios cursos a la vez. | Versionar por curso y mantener ejemplos de aceptación/rechazo. |
| MyScript/validador | Falsos positivos pueden puntuar respuestas incorrectas. | Mantener confirmación/revisión y activar solo tipos validados. |

## 15. Propuesta de fases de mejora — sin implementar

### Fase 1. Contrato canónico y puerta de calidad

Definir el esquema único de ejercicio, estados editoriales, procedencia, nivel, modalidad, representación y solución. Crear un auditor que falle si un registro activo no cumple el contrato. Esta debe ser la primera intervención.

### Fase 2. Inventario reproducible del catálogo activo

Ejecutar la misma secuencia que `index.html` en un entorno controlado y exportar un inventario único: ID, curso, tema, modalidad, fuente, respuesta, solución, formato y estado. Sin cambiar todavía contenidos.

### Fase 3. Cierre de soluciones no verificadas

Separar y retirar de producción —sin borrar— registros `solutionNeedsReview`, soluciones instructivas e incompletas. Resolver y comprobar cada caso aplicando la skill adecuada al curso. No usar la opción correcta como sustituto de una demostración.

### Fase 4. Canonización matemática

Elegir una representación de almacenamiento canónica. Mantener adaptadores de entrada para Unicode, LaTeX residual, Word/MathML y MyScript, pero hacer que el render reciba siempre una forma validada. Preservar imágenes cuando sean esenciales.

### Fase 5. Consolidación de bancos y dependencias

Migrar progresivamente el banco inline y los parches hacia módulos generados con dependencias explícitas. Sustituir el orden manual por un manifiesto o proceso de construcción verificable.

### Fase 6. Política didáctica ejecutable por curso

Traducir una parte controlable de la skill de soluciones a metadatos y validaciones: profundidad mínima, necesidad de comprobación, métodos no admitidos y terminología por nivel. La skill seguirá guiando el razonamiento humano; el validador evitará incumplimientos evidentes.

### Fase 7. Pruebas visuales y accesibilidad

Crear un corpus de referencia para fracciones, raíces, matrices, determinantes, sistemas, funciones a trozos, límites, integrales, probabilidad y estadística. Probar en Chrome, Edge, Safari y dispositivos móviles, incluyendo alternativas textuales de imágenes.

### Fase 8. Reconocimiento manuscrito separado

Mantener MyScript como subsistema de reconocimiento de respuesta final, no como generador de enunciados o soluciones. Solo activar tipos de validación con precisión demostrada. Cualquier futura comparación con otro proveedor debe ser una fase independiente y expresamente autorizada.

## Relación exacta con MyScript

El flujo manuscrito está compuesto por:

- `handwriting-board.js`: lienzo, captura, interfaz y presentación de la expresión reconocida;
- `handwriting-recognition.js`: registro de proveedores, umbral y coordinación;
- `myscript-recognition-provider.js`: proveedor externo disponible únicamente cuando coinciden modo desarrollador, prueba controlada y configuración Supabase;
- `supabase/functions/recognize-math/index.ts`: proxy servidor que protege las claves;
- `math-answer-validator.js`: normalización y comparación de tipos soportados;
- `myscript-evaluation.js` y corpus asociados: piloto interno y clasificación;
- `math-renderer.js`: presentación de la expresión que MyScript devuelve.

MyScript no selecciona el ejercicio, no transforma el enunciado, no crea la solución y no decide el método didáctico. Recibe trazos, devuelve una expresión y el validador intenta compararla con la respuesta esperada. El resultado final del piloto documenta 60 peticiones, precisión literal de 45/55 y ausencia de confianza numérica utilizable; la función servidor quedó de nuevo desactivada. Por ello no debe considerarse un corrector general de todas las matemáticas de Bachillerato.

## Conclusión

El sistema actual es funcional y rico, especialmente en cobertura y material PAU, pero ha crecido por acumulación de bancos, adaptadores y reparaciones. La calidad no es homogénea: conviven soluciones excelentes con guías incompletas y registros declarados pendientes de revisión. Las skills existen y son valiosas, pero su aplicación es editorial y no automática. La prioridad es construir una frontera de datos canónica y verificable; corregir primero el aspecto visual o añadir más bancos aumentaría la deuda sin resolver la raíz del problema.

# Plan Fase 2D — Auditoría visual real del catálogo matemático de +MathUp

## 1. Propósito y condición de esta fase

La Fase 2D comprobará la representación visual de expresiones **reales** del catálogo canónico paralelo de +MathUp. Su objeto no es corregir contenido ni conectar el catálogo con producción, sino producir evidencia visual reproducible que permita decidir, por entidad, si la notación es apta, si necesita una corrección de representación o si no puede juzgarse sin consultar la fuente o realizar una revisión humana especializada.

La fase abarcará enunciados, respuestas y soluciones paso a paso. No considerará superada una entidad porque un fixture sintético de su familia se haya renderizado correctamente. Los 28 controles sintéticos de Fase 2C seguirán funcionando solo como regresión técnica; la decisión de Fase 2D se basará en contenido real.

Este documento es únicamente el plan. Su creación no implementa la Fase 2D.

## 2. Referencias obligatorias y línea base

La ejecución deberá fijar por hash y tratar como entradas inmutables:

- `docs/FASE-2C-NORMALIZACION-MATEMATICA-MATHUP.md`;
- `docs/AUDITORIA-INTEGRIDAD-Y-NOTACION-FASE-2B-MATHUP.md`;
- los contratos y módulos de `catalog/normalization/`;
- los artefactos de `artifacts/fase2c/`;
- los contratos de `catalog/v2/`;
- los artefactos canónicos de Fase 2B necesarios para recuperar curso, materia y procedencia.

La línea base que debe preservarse es:

- 15.527/15.527 registros fuente;
- 6.712/6.712 ejercicios originales conciliados;
- 607/607 ejercicios históricamente inaccesibles conservados;
- 7.485 enunciados, 4.649 respuestas y 4.649 soluciones, es decir, 16.783 entidades de notación;
- 7.067 entidades clasificadas como `VISUAL_REVIEW_REQUIRED`;
- 1.022 entidades `SOURCE_REVIEW_REQUIRED`, que no deben repararse ni aprobarse visualmente sin evidencia suficiente;
- 883 casos `SOURCE_CORRUPTION` y 129 soluciones no reconciliadas, que permanecerán aislados.

Ningún `sourceRecordId`, literal original, hash, procedencia o vínculo de trazabilidad podrá desaparecer o ser sustituido.

## 3. Alcance y exclusiones

### 3.1 Alcance

La auditoría visual cubrirá:

- el literal original y, cuando exista, el documento matemático mixto de Fase 2C;
- la representación derivada validada, sin convertirla en fuente de verdad;
- el contexto real de entidad: enunciado, respuesta o paso de solución;
- el curso, materia, tema, procedencia y metadatos PAU verificables;
- las resoluciones de 320, 375, 768 y 1280 píxeles;
- el comportamiento en disposición móvil y de escritorio;
- las familias matemáticas y criterios visuales de los apartados siguientes.

### 3.2 Exclusiones

Durante Fase 2D no se podrá:

- modificar `math-renderer.js` ni ningún renderizador público;
- conectar los artefactos canónicos o normalizados con `index.html`, `app.js` o el runtime;
- modificar contratos v1, v2 o de normalización ya aprobados;
- modificar bancos, `data/`, Supabase o skills;
- corregir expresiones, respuestas o soluciones;
- completar pasos, generar soluciones, fabricar MathML, imágenes o símbolos;
- inferir comunidad, año, convocatoria o procedencia PAU;
- iniciar Mathpix;
- publicar ejercicios.

## 4. Población real que debe auditarse

### 4.1 Distribución de las 7.067 entidades pendientes

| Tipo de entidad | Pendientes |
|---|---:|
| Enunciado | 3.777 |
| Respuesta | 2.211 |
| Solución | 1.079 |
| **Total** | **7.067** |

| Curso/materia | Enunciado | Respuesta | Solución | Total |
|---|---:|---:|---:|---:|
| 1.º ESO | 377 | 326 | 0 | 703 |
| 2.º ESO | 296 | 192 | 0 | 488 |
| 3.º ESO | 281 | 231 | 0 | 512 |
| 4.º ESO A | 228 | 157 | 0 | 385 |
| 4.º ESO B | 293 | 148 | 0 | 441 |
| 1.º Bach. Matemáticas I | 301 | 11 | 0 | 312 |
| 1.º Bach. CCSS I | 122 | 44 | 0 | 166 |
| 2.º Bach. Matemáticas II PAU | 1.116 | 932 | 941 | 2.989 |
| 2.º Bach. CCSS II PAU | 763 | 170 | 138 | 1.071 |
| **Total** | **3.777** | **2.211** | **1.079** | **7.067** |

La auditoría PAU mantendrá diferenciadas Matemáticas II y CCSS II. Con los metadatos actualmente verificables, las 4.060 entidades PAU pendientes incluyen material de Castilla-La Mancha y Madrid, además de casos sin comunidad comprobada. Estos últimos formarán un estrato separado y nunca se asignarán a una comunidad por inferencia.

### 4.2 Familias matemáticas pendientes

La detección de familias es no excluyente. Una entidad puede pertenecer a varias:

| Familia detectada | Entidades pendientes |
|---|---:|
| Ecuaciones | 4.912 |
| Potencias y raíces | 3.164 |
| Multilínea | 1.441 |
| Unidades | 1.438 |
| Fracciones | 1.207 |
| Coordenadas | 1.013 |
| Símbolos griegos | 889 |
| Inecuaciones | 820 |
| Intervalos y conjuntos | 757 |
| Implicaciones y aproximaciones | 575 |
| Sistemas | 568 |
| Matrices | 496 |
| Subíndices | 441 |
| Valor absoluto | 340 |
| Derivadas | 328 |
| Fracciones complejas | 296 |
| Integrales indefinidas | 275 |
| Determinantes | 270 |
| Vectores | 266 |
| Límites | 127 |
| Probabilidad y combinatoria | 78 |
| Logaritmos y exponenciales | 23 |
| Integrales definidas | 6 |
| Funciones a trozos | 3 |

Sumatorios y productos deberán buscarse también como familias soportadas aunque no tengan un conteo independiente en el resumen actual. Si aparecen en literales reales, no podrán quedar absorbidos silenciosamente por una categoría genérica.

## 5. Unidad de auditoría y trazabilidad

La unidad mínima será una **entidad visual**, identificada por:

`entityType + entityId + exerciseId + fieldPath + inputHash + sourceRecordIds`.

En soluciones, cada paso se conservará en orden y se capturará tanto individualmente como dentro de la solución completa. Una solución no podrá aprobarse solo porque sus pasos aislados sean correctos si la composición completa presenta cortes, desalineación o pérdida del orden pedagógico.

Cada decisión visual deberá enlazar:

- entidad y ejercicio canónico;
- literal original y su hash;
- documento matemático y representación derivada, si existen;
- curso, materia, tema y tipo de entidad;
- archivo, ruta y `sourceRecordId` de procedencia;
- comunidad, año y convocatoria PAU solo cuando consten;
- familia o familias detectadas;
- perfil de complejidad;
- versión del arnés visual, motor, fuentes, CSS y dependencias;
- viewport, densidad de píxel y captura;
- resultado automático y dictamen humano;
- motivo y evidencia de la decisión final.

## 6. Estrategia de cobertura y muestreo estratificado

### 6.1 Principio: censo automático y revisión visual estratificada

No se tomará una muestra para decidir qué entidades existen. Las **7.067 entidades** entrarán en un censo automático y generarán una vista real aislada en los cuatro anchos obligatorios. La muestra se utilizará únicamente para organizar la revisión humana y para validar grupos cuya equivalencia visual sea demostrable.

El proceso tendrá dos niveles:

1. **Censo automático 7.067/7.067:** materialización aislada de las cuatro resoluciones, es decir, **28.268 ejecuciones visuales**, medidas geométricas, detección de desbordamiento, recorte, contenido invisible, texto crudo y errores de carga.
2. **Revisión humana determinista:** revisión individual obligatoria de los casos de alto riesgo y revisión de representantes en grupos de equivalencia exacta.

Los dos niveles producirán resultados separados. Los scripts podrán emitir `AUTOMATED_VISUAL_PASS`, `AUTOMATED_VISUAL_FAIL` o `AUTOMATED_VISUAL_INDETERMINATE`, pero estos estados describirán exclusivamente comprobaciones objetivas. La ausencia de desbordamiento automático no bastará para declarar `VISUAL_PASS`: proporciones, convencionalidad, colocación de índices, legibilidad y significado aparente requieren un dictamen visual humano registrado.

Una entidad que necesite ese juicio y todavía no lo haya recibido permanecerá pendiente —normalmente como `MANUAL_REVIEW_REQUIRED`— aunque su resultado automático sea `AUTOMATED_VISUAL_PASS`. El resultado automático nunca podrá suplantar, simular ni inferir la revisión humana.

### 6.2 Ejes de estratificación

La selección se construirá cruzando, como mínimo:

- curso y materia;
- tipo de entidad: enunciado, respuesta o solución;
- familia matemática, incluidas combinaciones de familias;
- dificultad visual: baja, media, alta y extrema;
- formato fuente y estructura disponible: literal, AST validado, LaTeX derivado, MathML derivado, JSON estructurado;
- longitud, profundidad del árbol, número de líneas, pasos, filas/columnas y delimitadores;
- procedencia: banco, parche, histórico, runtime materializado o PAU;
- PAU: Matemáticas II/CCSS II, Castilla-La Mancha/Madrid/sin comunidad verificada, año y convocatoria cuando consten;
- presencia de caracteres deteriorados o diagnóstico previo;
- comportamiento en cada viewport.

La semilla de selección será fija y derivada del manifiesto de entrada. Dentro de cada estrato se ordenará por hash y no por orden de lectura de archivos.

### 6.3 Cobertura humana mínima por estrato elegible

Para un estrato que no requiera revisión individual obligatoria, se revisará:

- de 1 a 5 entidades: todas;
- de 6 a 25: 5, incluyendo mínima y máxima complejidad;
- de 26 a 100: 10;
- más de 100: 15, más los casos extremos de longitud, profundidad y número de líneas;
- al menos un caso por curso, tipo de entidad, fuente y comunidad PAU presentes en el estrato.

Esta regla selecciona evidencia; no permite aprobar por extensión entidades visualmente distintas. Si falla un representante, el grupo se divide por firma causal y se revisan todos los miembros del subgrupo afectado o se mantienen como `MANUAL_REVIEW_REQUIRED`.

### 6.4 Casos de revisión individual obligatoria

Se revisarán uno a uno, sin muestreo:

- funciones a trozos;
- integrales definidas y expresiones con límites múltiples;
- matrices o determinantes anidados, irregulares o de dimensiones extremas;
- sistemas con más de dos filas o contenido multilínea;
- expresiones con tres o más familias combinadas;
- fracciones complejas o anidadas;
- soluciones multilínea con varios pasos matemáticos;
- expresiones que cambien de línea de manera diferente entre 320 y 1280 px;
- cualquier detección automática de recorte, solapamiento, desbordamiento o contenido oculto;
- cualquier JSON o LaTeX crudo visible;
- entidades con glifos sustituidos, fuentes ausentes o caracteres deteriorados;
- casos PAU con maquetación dependiente de apartados, tablas, figuras o referencias externas;
- cualquier grupo cuyo representante haya fallado;
- entidades que no puedan agruparse mediante una firma visual exacta.

## 7. Grupos homogéneos y aprobación por reglas comunes

### 7.1 Requisitos de equivalencia exacta

Un conjunto solo podrá aprobarse por una regla común si todos sus miembros comparten:

- mismo tipo de entidad y contexto visual;
- misma versión de documento, AST, serializador y arnés;
- misma firma estructural tipada, no solo la misma etiqueta de familia;
- misma estructura de bloques, saltos de línea y delimitadores;
- mismo perfil de longitud y dimensiones relevantes;
- mismo conjunto de fuentes y glifos;
- mismo resultado geométrico normalizado en los cuatro viewports;
- ausencia de diagnósticos de fuente o ambigüedad matemática;
- misma huella de representación o una transformación paramétrica probada que no cambie la geometría crítica.

La igualdad de familia —por ejemplo, “fracción”— no demuestra homogeneidad. Tampoco la igualdad de plantilla sintáctica si cambian el número de dígitos, la altura de radicales, la longitud de límites o el número de filas.

### 7.2 Tipos de grupo

- **Grupo de render exacto:** produce la misma huella estructural y visual en todos los viewports. Puede aprobarse con una captura representante y el manifiesto de equivalencia de todos sus miembros.
- **Grupo paramétrico acotado:** comparte regla y geometría dentro de límites probados. Requiere revisar mínimo, máximo y mediana; si existe variación no cubierta, se divide.
- **Grupo solo semántico:** comparte familia o tema, pero no geometría. No admite aprobación por lote.
- **Entidad singular:** requiere revisión individual.

Las expresiones complejas, las soluciones paso a paso y las composiciones PAU tenderán a ser grupos paramétricos pequeños o entidades singulares.

## 8. Priorización por riesgo

Se calculará un `visualRiskScore` determinista, conservando también sus factores individuales. No modificará el contenido ni decidirá por sí solo el dictamen.

Prioridad P0:

- recorte, solapamiento, overflow no controlado o contenido invisible;
- JSON/LaTeX crudo;
- error de carga o glifo ausente;
- discrepancia entre literal, AST y representación derivada;
- fuente deteriorada que impide reconocer la expresión.

Prioridad P1:

- matrices, determinantes, sistemas, funciones a trozos y multilínea;
- integrales, límites, vectores, radicales o fracciones anidadas;
- tres o más familias combinadas;
- soluciones largas y PAU con varios apartados;
- cualquier fallo exclusivo de móvil.

Prioridad P2:

- potencias, subíndices, intervalos, conjuntos, probabilidad, unidades y símbolos griegos sin composición compleja;
- diferencias de proporción o espaciado que no oculten contenido.

Prioridad P3:

- expresiones simples con firma visual exacta ya cubierta por un grupo aprobado.

En igualdad de riesgo se priorizarán: 2.º Bachillerato PAU, soluciones, respuestas y después enunciados; dentro de PAU, Matemáticas II y CCSS II se mantendrán separadas y se alternarán Castilla-La Mancha, Madrid y procedencia no verificada.

## 9. Criterios visuales por familia

Todos los casos deberán ser convencionales y reconocibles por un alumno, conservar el significado y ser legibles sin conocer el formato fuente.

| Familia | Controles obligatorios |
|---|---|
| Fracciones | barra visible y centrada; numerador/denominador completos; escala legible; fracciones anidadas sin colisión |
| Potencias y subíndices | posición superior/inferior inequívoca; separación de base; tamaños proporcionados; encadenamiento sin ambigüedad |
| Raíces | radical que cubre exactamente el radicando; índice de raíz colocado; barra sin cortar contenido |
| Sistemas | llave adaptada a todas las filas; alineación estable; ninguna ecuación fuera de la llave |
| Matrices | filas y columnas alineadas; delimitadores completos; celdas sin colisión; dimensiones reconocibles |
| Determinantes | barras verticales dimensionadas al contenido; sin confusión con valor absoluto o separadores |
| Límites | `lim` como operador; variable/tendencia en subíndice; expresión principal alineada y legible |
| Derivadas | primas, diferenciales y órdenes correctamente posicionados; fracciones diferenciales no deformadas |
| Integrales | signo proporcionado; límites superior/inferior ligados al operador; integrando y diferencial separados; definida/indefinida inequívoca |
| Vectores | flecha o acento centrado sobre el símbolo completo; componentes y coordenadas alineados |
| Funciones a trozos | llave dimensionada; ramas y condiciones emparejadas; saltos y alineación comprensibles |
| Intervalos y conjuntos | corchetes/paréntesis correctos y proporcionados; separadores y símbolos de pertenencia legibles |
| Probabilidad/combinatoria | operadores, condicionamiento, subíndices y coeficientes combinatorios sin ambigüedad |
| Multilínea | orden de lectura claro; igualdad/operadores alineados cuando proceda; ningún paso oculto |
| Símbolos griegos | glifo correcto, distinguible de letras latinas y sin sustitución de fuente |
| Unidades | separación consistente entre valor y unidad; exponentes y prefijos correctos; unidad no confundida con variable |
| Ecuaciones/inecuaciones | relaciones visibles, alineadas y con espaciado suficiente; signos no sustituidos ni cortados |
| Logaritmos/exponenciales | base y argumento identificables; exponentes y delimitadores proporcionados |
| Sumatorios/productos | operador de tamaño adecuado; límites asociados; cuerpo separado y legible |

Para todas las familias se comprobarán además saltos de línea, delimitadores adaptativos, ausencia de solapamientos y recortes, y ausencia de LaTeX o JSON crudo.

## 10. Estados automáticos y decisión visual humana

### 10.0 Dos capas de resultado independientes

Cada ejecución conservará dos campos distintos:

- `automationStatus`: `AUTOMATED_VISUAL_PASS`, `AUTOMATED_VISUAL_FAIL` o `AUTOMATED_VISUAL_INDETERMINATE`, acompañado de métricas y reglas objetivas;
- `humanDecision`: `HUMAN_VISUAL_PASS`, `HUMAN_VISUAL_FAIL`, `HUMAN_SOURCE_REVIEW_REQUIRED`, `HUMAN_MANUAL_REVIEW_REQUIRED` o `PENDING_HUMAN_REVIEW`, acompañado de revisor, fecha, evidencia y motivo.

El estado editorial final se derivará de ambos sin borrar ninguno. Un fallo automático objetivo puede bloquear el caso y enviarlo a `VISUAL_FIX_REQUIRED`, pero un pase automático no produce por sí solo un `VISUAL_PASS`. Cuando el criterio incluya convencionalidad, proporción, legibilidad, presentación matemática o adecuación para un alumno, será obligatorio `HUMAN_VISUAL_PASS`.

La aprobación por equivalencia exacta también será un dictamen humano: un revisor aprobará el representante y confirmará que la prueba de equivalencia permite extender el dictamen. El manifiesto distinguirá la entidad observada directamente de los miembros cubiertos por el grupo.

### 10.1 `VISUAL_PASS`

Solo se asignará cuando:

- la evidencia corresponde a una entidad real;
- pasa los cuatro viewports;
- no existen recortes, solapamientos, contenido oculto ni texto técnico crudo;
- la notación es convencional y reconocible;
- la geometría específica de sus familias cumple los controles;
- existe `HUMAN_VISUAL_PASS` registrado para la entidad o para el representante de un grupo de equivalencia exacta demostrado;
- no existe duda sobre la fuente ni sobre el significado matemático visible.

`AUTOMATED_VISUAL_PASS` es necesario para los controles objetivos, pero nunca suficiente para este estado definitivo.

### 10.2 `VISUAL_FIX_REQUIRED`

Se asignará si el contenido fuente es inequívoco y completo, pero la representación presenta un defecto reparable sin cambiar el significado: escala, espaciado, saltos, alineación, delimitadores, posición de índices, composición de operadores, layout responsive o selección de representación derivada.

El informe describirá la corrección futura, pero Fase 2D no la aplicará.

### 10.3 `SOURCE_REVIEW_REQUIRED`

Se asignará si no puede saberse qué debe representarse porque el literal está deteriorado, falta un símbolo, hay una referencia de imagen no verificable, existen alternativas incompatibles o es necesario consultar el documento original. La captura mostrará el problema, pero no se intentará embellecer ni interpretar.

### 10.4 `MANUAL_REVIEW_REQUIRED`

Se asignará cuando la fuente parece legible pero el juicio exige revisión matemática, editorial o humana individual: notación no convencional pero posiblemente intencional, composición con varias lecturas, dependencia del contexto de un apartado, o imposibilidad de aplicar una regla visual común.

Los cuatro estados son mutuamente excluyentes como dictamen final. Se conservarán incidencias secundarias no excluyentes y el historial de revisiones.

## 11. Arnés visual aislado y capturas

Se construirá en una ruta nueva de Fase 2D, sin importar módulos desde el runtime público ni escribir en producción. El arnés:

1. leerá artefactos versionados de Fase 2B/2C en modo solo lectura;
2. seleccionará entidades reales por `entityId` y verificará hashes;
3. mostrará por separado original, documento normalizado y representación derivada disponible;
4. incluirá contexto suficiente para juzgar enunciado, respuesta o solución, sin revelar datos personales;
5. cargará dependencias visuales fijadas por versión y hash;
6. renderizará en una página estática local sin red y sin Supabase;
7. capturará cada viewport con fondo, fuentes y densidad de píxel controlados;
8. registrará cajas geométricas de contenedor, bloques, operadores y contenido matemático;
9. no modificará `math-renderer.js` ni reutilizará su estado de ejecución.

Las vistas no afirmarán que una expresión literal ambigua ha sido convertida correctamente. Cuando no exista una representación segura, se mostrará el literal preservado y se clasificará según la evidencia.

### 11.1 Límite de la certificación de Fase 2D

Fase 2D auditará la representación real del catálogo dentro de este arnés aislado. **No certificará la presentación final dentro del runtime público de +MathUp**, porque `math-renderer.js`, los componentes de la aplicación y el runtime permanecerán sin modificar y desconectados.

Antes de publicar o conectar el catálogo será obligatoria una prueba posterior de preproducción con exactamente el motor matemático, CSS, fuentes, componentes, breakpoints y condiciones de carga que utilizará el alumno. Esa prueba repetirá, como mínimo, en móvil y escritorio:

- fracciones;
- sistemas;
- matrices;
- determinantes;
- límites;
- integrales;
- vectores;
- funciones a trozos;
- soluciones paso a paso.

Un `VISUAL_PASS` de Fase 2D significará “apto en el arnés aislado y bajo el entorno fijado de esta auditoría”, no “certificado en producción”. La autorización de publicación requerirá superar también la prueba de preproducción.

## 12. Comparación móvil y escritorio

Los anchos obligatorios serán 320, 375, 768 y 1280 px, con altura suficiente para evitar falsos recortes verticales. Se fijarán motor, versión, sistema de fuentes, `devicePixelRatio`, zoom e idioma.

Para cada entidad se compararán:

- ancho y alto del bloque;
- overflow horizontal/vertical;
- cajas fuera del contenedor;
- píxeles recortados y contenido oculto;
- saltos de línea y número de líneas;
- cambio de escala de operadores y delimitadores;
- posición relativa de índices, límites y acentos;
- continuidad del orden de lectura;
- diferencias perceptuales entre viewports.

El comportamiento móvil será fallo si obliga a ocultar contenido, reduce la notación por debajo del umbral legible o altera asociaciones matemáticas. Un scroll horizontal explícito y visible solo podrá aceptarse para una estructura indivisible —por ejemplo, una matriz muy ancha— si el plan de presentación lo contempla y no oculta la existencia del contenido.

## 13. Evidencia visual reproducible

La futura ejecución generará, bajo `artifacts/fase2d/`, como mínimo:

- `input-manifest.json`: entradas, hashes y versiones;
- `population.jsonl`: las 7.067 entidades y sus estratos;
- `sampling-plan.json`: semilla, reglas y seleccionados;
- `render-groups.jsonl`: firmas y miembros de grupos;
- `render-manifest.jsonl`: una fila por entidad/viewport;
- `geometry-results.jsonl`: mediciones automáticas;
- `visual-decisions.jsonl`: dictamen, motivos y revisor;
- `issues.jsonl`: incidencias normalizadas;
- `coverage-by-course-entity.json`;
- `coverage-by-family.json`;
- `coverage-pau-by-subject-community-year-call.json`;
- `screenshots/`: capturas persistentes seleccionadas conforme a la política de retención;
- `contact-sheets/`: hojas de contacto por estrato y prioridad;
- `diffs/`: comparaciones perceptuales móvil/escritorio cuando sean útiles;
- `review-queues/visual-fix-required.jsonl`;
- `review-queues/source-review-required.jsonl`;
- `review-queues/manual-review-required.jsonl`;
- `reproducibility-summary.json`;
- `rollback-trial.json`;
- `test-summary.json`;
- un informe final `docs/FASE-2D-AUDITORIA-VISUAL-REAL-MATHUP.md`.

### 13.1 Política de retención de capturas

El censo ejecutará las cuatro vistas de las 7.067 entidades, pero **no obligará a almacenar permanentemente 28.268 PNG en Git**. Se conservarán de forma persistente las capturas de:

- prioridades P0 y P1;
- fallos automáticos;
- entidades singulares;
- representantes de grupos;
- casos sometidos a revisión humana;
- muestras necesarias para demostrar cobertura por curso, entidad, familia y procedencia PAU.

Para el resto se conservarán manifiestos, medidas geométricas, firma de render, hash perceptual cuando proceda, hashes de entrada, versión del arnés, motor, CSS, fuentes, viewport, DPR y comando/receta determinista necesarios para regenerar exactamente la captura bajo demanda.

Si la implementación genera temporalmente las 28.268 capturas, utilizará un directorio de trabajo claramente separado y excluido de Git. Después de extraer y verificar las métricas, eliminará únicamente esas capturas efímeras y conservará la selección probatoria anterior. El manifiesto registrará que la ejecución existió, su resultado, hash temporal o huella de render y la razón de retención o descarte.

Cada PNG persistente se asociará a un manifiesto con SHA-256. Las decisiones heredadas por grupo incluirán el identificador del representante, la prueba de equivalencia y la lista completa de miembros. No se guardarán credenciales, sesiones, correos, nombres de alumnos ni otros datos personales.

## 14. Defectos de representación frente a defectos de fuente

### 14.1 Reparables posteriormente en representación

- tamaño o proporción de operadores;
- separación, alineación y espaciado;
- colocación visual de exponentes, subíndices, límites y acentos;
- dimensionado de radicales, llaves, barras y delimitadores;
- layout de matrices, sistemas, funciones a trozos y multilínea;
- saltos responsive y tratamiento de overflow;
- selección entre representaciones derivadas ya demostradas;
- sustitución de LaTeX/JSON técnico visible por una vista derivada validada, conservando el original.

Estos casos serán `VISUAL_FIX_REQUIRED`. La corrección se diseñará en otra fase y deberá mantener reversibilidad y significado.

### 14.2 Requieren consultar la fuente

- caracteres deteriorados o glifos ausentes;
- delimitadores o exponentes cuyo alcance no es demostrable;
- referencias de imagen sin recurso verificable;
- contradicciones entre original, respuesta y solución;
- matrices, sistemas o funciones a trozos con filas perdidas;
- notación PAU que dependa de una figura, tabla, página o apartado no disponible;
- comunidad, año o convocatoria no verificables;
- cualquier corrección con más de una interpretación matemática.

Estos casos serán `SOURCE_REVIEW_REQUIRED`, o `MANUAL_REVIEW_REQUIRED` si la fuente está disponible pero exige interpretación matemática/editorial.

## 15. Pruebas previstas

### 15.1 Integridad y cobertura

- 7.067/7.067 entidades incluidas exactamente una vez en la población;
- cobertura completa de enunciados, respuestas y soluciones;
- conservación de 15.527 registros, 6.712 originales, 607 inaccesibles y todos los `sourceRecordId`;
- cobertura de todos los cursos y materias;
- Matemáticas II y CCSS II separadas;
- cobertura PAU por Castilla-La Mancha, Madrid y “sin comunidad verificada”; año y convocatoria cuando existan;
- ninguna entidad `SOURCE_REVIEW_REQUIRED` promovida silenciosamente.

### 15.2 Selección y agrupación

- selección determinista con la misma semilla;
- invariancia frente al orden de entrada;
- ningún estrato real sin representante;
- firmas de grupo estables y auditables;
- prueba negativa que impida agrupar expresiones solo por compartir familia;
- expansión automática de un grupo a revisión completa cuando falle un representante.

### 15.3 Geometría y contenido

- detección de overflow, recorte, solapamiento y contenido oculto;
- detección de JSON y LaTeX crudo;
- detección de error de fuente, glifo ausente y recurso no cargado;
- comprobaciones por familia del apartado 9;
- comparación obligatoria de 320, 375, 768 y 1280 px;
- en soluciones, conservación del orden y visibilidad de todos los pasos.
- prueba de que `AUTOMATED_VISUAL_PASS` sin dictamen humano no puede convertirse en `VISUAL_PASS`;
- trazabilidad separada entre `automationStatus` y `humanDecision`;

### 15.4 Regresión y aislamiento

- las 79 pruebas acumuladas hasta Fase 2C seguirán superándose;
- hashes protegidos de bancos, aplicación, Supabase, contratos y renderizadores sin cambios;
- cero imports o referencias desde `index.html`, `app.js` y runtime hacia Fase 2D;
- funcionamiento del arnés sin red y sin credenciales;
- doble ejecución con artefactos semánticos idénticos;
- invariancia frente al orden;
- rollback completo de la capa Fase 2D sin alterar entradas ni producción.

### 15.5 Pruebas visuales deliberadamente defectuosas

El sistema de auditoría deberá demostrar que detecta fixtures de prueba con recorte, índices desplazados, barras insuficientes, overflow, JSON crudo y fuente ausente. Estos controles serán sintéticos y estarán marcados como pruebas negativas; nunca se mezclarán con la evidencia real.

## 16. Criterios objetivos de cierre

La Fase 2D solo podrá considerarse técnicamente terminada cuando:

1. las 7.067 entidades tengan manifiesto y resultados de las cuatro ejecuciones visuales, aunque no todas conserven PNG permanente;
2. los conteos por estado sumen exactamente 7.067, sin pérdidas ni duplicidades;
3. todas las familias, cursos, materias y tipos de entidad estén cubiertos;
4. Matemáticas II y CCSS II tengan conciliación visual independiente por comunidad, año y convocatoria cuando consten;
5. todo caso P0/P1 y toda entidad singular haya recibido revisión individual;
6. toda aprobación por lote tenga equivalencia exacta demostrada y trazabilidad a su representante;
7. ningún grupo con un fallo conserve aprobaciones heredadas sin volver a dividirse;
8. ningún `VISUAL_PASS` proceda únicamente de métricas automáticas: deberá existir `HUMAN_VISUAL_PASS` registrado, directo o mediante representante de equivalencia exacta;
9. todos los defectos estén separados entre representación, fuente y revisión manual;
10. no haya JSON/LaTeX crudo, recortes, solapamientos o contenido oculto entre los `VISUAL_PASS`;
11. la doble ejecución y la invariancia frente al orden sean satisfactorias;
12. el rollback sea completo;
13. toda la regresión anterior pase;
14. los hashes protegidos demuestren que producción, bancos, Supabase, renderizadores, skills y contratos previos permanecen intactos;
15. los artefactos no contengan secretos ni datos personales.
16. la política de retención conserve las capturas probatorias y permita regenerar determinísticamente las no persistidas;
17. el informe declare expresamente que la certificación corresponde al arnés aislado y que la publicación sigue condicionada a la prueba futura de preproducción con el stack visual final.

El cierre técnico de Fase 2D no autorizará por sí mismo la publicación ni la conexión al runtime. Los `VISUAL_FIX_REQUIRED`, `SOURCE_REVIEW_REQUIRED` y `MANUAL_REVIEW_REQUIRED` seguirán bloqueando la publicación de sus entidades.

## 17. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Aprobar una familia por fixtures sintéticos | Solo contenido real decide; los fixtures quedan como regresión |
| Muestra insuficiente | Censo automático completo, estratos obligatorios y revisión individual de alto riesgo |
| Agrupación excesiva | Equivalencia por firma estructural y visual exacta; no por familia o tema |
| Falso negativo de overflow | Medidas DOM, comparación de píxeles y revisión humana |
| Variación por fuentes o motor | Versiones, fuentes, DPR y hashes fijados en manifiesto |
| Capturas no reproducibles | Sin red, semilla fija, entorno bloqueado, doble corrida y hashes |
| Repositorio inflado por capturas | Retención selectiva, directorio efímero fuera de Git y regeneración determinista |
| Ocultar corrupción con una vista bonita | Mostrar original y derivado; prevalece `SOURCE_REVIEW_REQUIRED` |
| Inferir procedencia PAU | Estrato “sin comunidad verificada”; nunca inferir |
| Volumen de 7.067 casos | Hojas de contacto, prioridades y grupos exactos sin rebajar cobertura |
| Pasar por alto soluciones largas | Captura de paso y solución completa; revisión individual de multilínea |
| Cambiar producción accidentalmente | Rutas nuevas, hashes protegidos, cero imports públicos y rollback |
| Confundir corrección visual con matemática | Estados separados; la fase no certifica corrección matemática |
| Confundir el arnés con producción | Certificación limitada al arnés y prueba posterior obligatoria con el stack final |

## 18. Secuencia futura de ejecución

1. Congelar manifiesto de entradas y hashes protegidos.
2. Construir el inventario visual de las 7.067 entidades.
3. Calcular familias, complejidad, estratos y prioridades sin alterar contenido.
4. Formar grupos de equivalencia y seleccionar representantes de forma determinista.
5. Construir el arnés aislado con material real.
6. Ejecutar las 28.268 vistas, extraer capturas/medidas y aplicar la política de retención selectiva.
7. Ejecutar pruebas negativas del detector.
8. Revisar P0/P1 y entidades singulares individualmente.
9. Revisar representantes de grupos elegibles y propagar solo equivalencias demostradas.
10. Registrar por separado estados automáticos y dictámenes humanos; clasificar las entidades sin convertir pases automáticos en `VISUAL_PASS` definitivo.
11. Ejecutar conciliaciones por curso, entidad, familia y procedencia PAU.
12. Ejecutar regresión, doble corrida, invariancia y rollback.
13. Generar artefactos e informe final sin conectar nada a producción.

No se iniciará esta secuencia sin autorización expresa posterior.

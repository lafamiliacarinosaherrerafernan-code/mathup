# Plan técnico de Fase 2C — Normalización matemática y preparación del renderizado de +MathUp

## 1. Autoridad, alcance y condición de partida

Este documento define la futura **Fase 2C — Normalización matemática y preparación del renderizado**. Su autoridad técnica procede exclusivamente de:

- `docs/FASE-2B-CORRECCION-RECUPERACION-MATHUP.md`;
- `docs/AUDITORIA-INTEGRIDAD-Y-NOTACION-FASE-2B-MATHUP.md`;
- los contratos versionados de `catalog/v2/`;
- los artefactos reproducibles de `artifacts/fase2b/`;
- los artefactos de `artifacts/fase2b-integrity-audit/`.

La Fase 2C será una transformación **paralela, determinista, reproducible, reversible y no destructiva**. No sustituirá, corregirá ni sobrescribirá la evidencia original, los bancos heredados, los contratos de Fase 1 o Fase 2B, ni los artefactos de fases anteriores. Tampoco conectará sus resultados al runtime público.

El punto de partida cuantitativo que deberá conservarse es:

- 15.527/15.527 registros fuente preservados;
- 6.712/6.712 ejercicios originales reconciliados;
- 607/607 ejercicios actualmente inaccesibles conservados;
- 7.485 ejercicios `mathup.exercise.v2`;
- 4.649 respuestas `mathup.answer.v1`;
- 4.649 soluciones `mathup.solution.v1`;
- 16.783 entidades auditadas entre enunciados, respuestas y soluciones.

La auditoría de integridad y notación identificó, como clasificación exclusiva inicial:

| Estado de partida | Entidades |
|---|---:|
| `CANONICAL_STRUCTURE_ERROR` | 3.756 |
| `DISPLAY_CONFIRMED` | 4.619 |
| `RENDERING_RISK` | 7.525 |
| `SOURCE_CORRUPTION` | 883 |

Además existen incidencias no excluyentes que deberán mantenerse trazables: 3.295 soluciones con JSON serializado en campos textuales, 494 referencias falsamente etiquetadas como MathML, 106 referencias falsamente etiquetadas como imágenes, 129 soluciones no reconciliadas y 760 casos de comandos matemáticos de fuente sin barra inversa, junto con los demás riesgos de notación registrados por la auditoría.

## 2. Objetivo y límites

### 2.1 Objetivo

Preparar una representación matemática canónica que permita en una fase posterior renderizar de manera convencional, legible, accesible y estable el material de ESO, 1.º de Bachillerato y 2.º de Bachillerato PAU, conservando exactamente el significado demostrable y la trazabilidad hasta la evidencia original.

### 2.2 Qué sí comprende la Fase 2C futura

1. Clasificar cada campo con contenido matemático según el nivel de intervención permitido.
2. Extraer de forma reversible estructuras ya explícitas en la fuente.
3. Crear documentos matemáticos normalizados paralelos, vinculados por identidad, revisión y hash a las entidades de Fase 2B.
4. Generar serializaciones derivadas deterministas para validación y futura representación.
5. Preparar un entorno visual aislado con un corpus representativo y criterios objetivos de calidad.
6. Producir artefactos de conciliación que demuestren que no se ha perdido, inventado ni reinterpretado contenido.

### 2.3 Qué no comprende

- validar si una respuesta o solución es matemáticamente correcta;
- completar pasos didácticos, respuestas, soluciones, figuras o distractores;
- corregir automáticamente material ambiguo o deteriorado;
- modificar `mathup.exercise.v1`, `mathup.exercise.v2` ni ningún contrato ya aprobado;
- modificar bancos, `data/`, aplicación, Supabase, renderizadores o skills;
- usar Mathpix;
- publicar o conectar los resultados a `index.html`, `app.js` o al runtime público.

## 3. Separación obligatoria de capas

La Fase 2C deberá mantener cuatro capas distintas. Ninguna representación derivada podrá convertirse silenciosamente en evidencia original.

### 3.1 Contenido matemático

Es la afirmación matemática que consta de forma demostrable en la fuente: símbolos, operandos, relaciones, variables, datos, unidades y orden de los pasos. Esta capa no puede alterarse por razones visuales.

### 3.2 Estructura matemática

Es la organización explícita del contenido: numerador y denominador, base y exponente, índice, radicando, miembros de una ecuación, filas y columnas de una matriz, límites de integración, ramas de una función definida a trozos, etc. Solo se incorporará cuando la fuente o una regla inequívoca permita probarla.

### 3.3 Representación

Es una codificación serializable de esa estructura. La fuente de verdad de Fase 2C será un documento mixto de texto y matemáticas con un árbol matemático tipado. LaTeX normalizado, MathML y texto accesible serán representaciones derivadas, nunca sustitutos automáticos de la evidencia.

### 3.4 Renderizado visual

Es la presentación concreta en pantalla. Tipografía, tamaño, saltos de línea, alineación, espaciado, ajuste móvil y disposición vertical pertenecen a esta capa y no deben modificar el contenido ni la estructura.

## 4. Arquitectura paralela y versionada

### 4.1 Principio de superposición, no de sustitución

La normalización se almacenará como una **capa acompañante**. Cada documento normalizado apuntará a una entidad ya existente mediante un localizador inmutable compuesto, como mínimo, por:

- tipo de entidad (`exercise`, `answer` o `solution`);
- identificador de entidad;
- revisión o versión de entrada;
- ruta exacta del campo normalizado;
- `sourceRecordId` cuando exista;
- hash del valor literal de entrada;
- identificador de la ejecución y versión de las reglas.

Los contratos de `catalog/v2/` permanecerán intactos. Si la implementación futura necesita contratos nuevos, estos se crearán en un espacio versionado separado y solo referenciarán las entidades existentes.

### 4.2 Contratos acompañantes propuestos

1. **`mathup.math-document.v1`**: documento mixto de texto y matemáticas, con bloques y expresiones tipadas.
2. **`mathup.normalization-decision.v1`**: decisión por campo o fragmento, clasificación, reglas aplicadas, pruebas, incidencias y responsables de revisión.
3. **`mathup.math-representation.v1`**: serializaciones derivadas —por ejemplo LaTeX normalizado o MathML generado— con su generador, versión y hash.
4. **`mathup.visual-fixture.v1`**: caso de prueba visual aislado, familia matemática, perfil educativo, anchura y expectativas verificables.

Estos nombres son una propuesta para la implementación posterior. Su aprobación no autoriza a crearlos durante la elaboración de este plan.

### 4.3 Inmutabilidad y reversibilidad

Cada resultado deberá incluir:

- literal original completo, o una referencia verificable al artefacto inmutable que lo contiene;
- hash antes y después;
- operación aplicada y versión;
- correspondencia entre rangos del texto original y nodos normalizados;
- serialización canónica determinista;
- prueba de reconstrucción sin pérdida cuando la transformación se clasifique como automática;
- estado de revisión independiente del estado de publicación.

El rollback consistirá en retirar la capa de Fase 2C. Nunca exigirá reconstruir o reescribir una fuente anterior.

## 5. Modelo de documento matemático canónico

### 5.1 Documento mixto

El contenido pedagógico no debe reducirse a una única fórmula. El documento canónico deberá conservar, en orden:

- párrafos de texto;
- matemáticas en línea;
- matemáticas en bloque;
- listas y apartados;
- pasos de solución;
- grupos alineados o multilínea;
- referencias a figuras existentes y verificadas;
- resultado final cuando ya esté identificado en la fuente.

Cada bloque preservará su texto literal, posición, procedencia y estructura normalizada, sin reescribir el lenguaje del profesor ni alterar el orden didáctico.

### 5.2 Árbol matemático tipado

El árbol debe ser suficientemente expresivo para representar, sin depender de A/B/C/D ni de un motor visual concreto:

- números, identificadores, constantes y letras griegas;
- operadores unarios, binarios y relaciones;
- agrupaciones y delimitadores explícitos;
- potencias y subíndices;
- fracciones;
- raíces cuadradas y raíces con índice;
- valor absoluto y normas cuando sean distinguibles;
- ecuaciones e identidades;
- sistemas de ecuaciones;
- inecuaciones y cadenas de desigualdades;
- matrices, vectores matriciales y determinantes;
- límites y límites laterales;
- derivadas ordinarias y parciales cuando consten;
- integrales definidas e indefinidas;
- sumatorios y productos;
- logaritmos y exponenciales;
- vectores geométricos y notación vectorial;
- coordenadas y puntos;
- intervalos, conjuntos y operaciones de conjuntos;
- funciones definidas a trozos;
- expresiones alineadas y multilínea;
- probabilidad y combinatoria;
- unidades y magnitudes;
- nodos literales verificados para estructuras que todavía no tengan un tipo seguro.

El árbol deberá conservar distinciones relevantes: paréntesis originales, barras de valor absoluto frente a determinante, multiplicación explícita o implícita, integral definida frente a indefinida, vector frente a lista de coordenadas y texto matemático frente a texto narrativo.

### 5.3 Representación de las familias obligatorias

| Familia | Estructura mínima exigida |
|---|---|
| Potencias | base, exponente y delimitadores de agrupación |
| Subíndices | base e índice |
| Fracciones | numerador y denominador como subárboles |
| Raíces | índice opcional y radicando |
| Valor absoluto | contenido y clase de delimitador demostrable |
| Ecuaciones | miembro izquierdo, relación y miembro derecho |
| Sistemas | ecuaciones ordenadas y tipo de agrupación |
| Inecuaciones | miembros, relaciones y encadenamiento |
| Matrices | dimensiones, filas y celdas ordenadas |
| Determinantes | matriz o contenido y barras semánticas verificadas |
| Límites | variable, punto, lateralidad si consta y expresión |
| Derivadas | función/expresión, variable y orden si consta |
| Integral definida | integrando, variable, límite inferior y superior |
| Integral indefinida | integrando, variable y constante solo si consta |
| Sumatorios/productos | operador, índice, límites y cuerpo |
| Logaritmos/exponenciales | función, base cuando conste y argumento |
| Vectores | componentes o expresión, y notación original |
| Coordenadas | componentes ordenados y delimitadores |
| Intervalos | extremos, apertura/cierre y orientación |
| Conjuntos | elementos o condición, y operación si existe |
| Función a trozos | pares expresión/condición ordenados |
| Multilínea | líneas ordenadas y puntos de alineación |
| Probabilidad/combinatoria | operador, sucesos/parámetros y agrupación |
| Letras griegas | identidad del símbolo y variante cuando importe |
| Unidades | valor asociado, símbolo literal y estructura demostrable |

## 6. Clasificación obligatoria de cada caso

Cada campo o fragmento recibirá exactamente una disposición primaria y podrá conservar incidencias secundarias. Las cinco disposiciones son:

### 6.1 `SAFE_AUTOMATIC_NORMALIZATION`

Se aplicará solo cuando la transformación sea inequívoca, determinista y reversible, no cambie ningún token con significado matemático y supere validación estructural y reconstrucción. Exige evidencia automatizada, no una apreciación de semejanza visual.

### 6.2 `SOURCE_REVIEW_REQUIRED`

Se aplicará cuando la fuente esté incompleta, deteriorada, mal etiquetada o necesite comparación documental. Incluye los casos en que una interpretación plausible no es demostrable con el material ya localizado.

### 6.3 `MATHEMATICAL_REVIEW_REQUIRED`

Se aplicará cuando existan dos o más estructuras matemáticas posibles, cuando una reparación pueda cambiar el significado, o cuando deba verificarse la relación entre enunciado, respuesta y solución. No autoriza a corregir el contenido.

### 6.4 `VISUAL_REVIEW_REQUIRED`

Se aplicará a contenido estructuralmente válido cuya composición visual deba comprobarse por complejidad, tamaño, anidamiento, alineación o comportamiento adaptable.

### 6.5 `NO_ACTION_REQUIRED`

Se aplicará cuando el contenido ya esté correctamente estructurado para el objetivo de esta fase o sea texto ordinario que no necesite normalización matemática. No equivale a afirmar corrección matemática ni calidad pedagógica.

## 7. Normalizaciones automáticas admisibles

La implementación futura solo podrá automatizar operaciones de esta naturaleza:

1. **Extracción exacta de estructuras serializadas** cuando el JSON sea válido, su forma esté reconocida, todas sus claves queden conservadas y pueda reconstruirse el contenido, el orden y los valores originales.
2. **Reclasificación de etiquetas falsas** en la capa paralela cuando se demuestre que el valor no contiene MathML ni una referencia de imagen real. El literal original y la etiqueta histórica permanecerán en la evidencia.
3. **Decodificación reversible de entidades** únicamente para una lista cerrada y con prueba de ida y vuelta; caracteres matemáticos como menos, guion, barra vertical o espacios significativos no se normalizarán por apariencia.
4. **Segmentación texto/matemáticas** solo donde existan delimitadores, tipos o estructuras explícitas. No se adivinarán fronteras matemáticas a partir de palabras o semejanza.
5. **Parseo de notación ya válida** hacia el árbol tipado, conservando tokens y delimitadores y verificando que la serialización derivada vuelve al mismo árbol.
6. **Normalización de espacios puramente sintácticos** solo cuando el analizador pruebe que no afectan a tokenización, unidades, números o operadores.
7. **Serialización determinista** del árbol a LaTeX normalizado y, posteriormente, a MathML derivado, sin convertir estas salidas en la fuente original.

No se considerarán seguras por defecto:

- añadir una barra inversa a `frac`, `sqrt` u otro comando solo porque parezca faltar;
- reconstruir límites aplanados;
- cambiar caracteres deteriorados por símbolos matemáticos parecidos;
- corregir mojibake cuando haya más de una decodificación posible;
- convertir barras en valor absoluto, determinante o norma sin estructura inequívoca;
- introducir multiplicaciones, paréntesis, exponentes, subíndices o unidades implícitas;
- recomponer matrices, sistemas o funciones a trozos desde saltos visuales ambiguos;
- completar información ausente usando la respuesta o el contexto.

## 8. Tratamiento de las incidencias principales

### 8.1 Las 3.295 soluciones con JSON serializado en texto

Se ejecutará un flujo específico y aislado:

1. localizar exactamente el campo, entidad, revisión y hash;
2. analizar el JSON sin tolerar reparaciones silenciosas;
3. validar su forma contra una lista versionada de estructuras históricas conocidas;
4. conservar todas las claves conocidas y desconocidas, el orden de pasos, el resultado final y los literales;
5. convertir cada elemento reconocido a bloques de solución y nodos matemáticos sin reformularlo;
6. conservar los elementos no reconocidos como evidencia literal, sin descartarlos;
7. registrar la correspondencia campo a campo y la regla aplicada;
8. reconstruir una representación equivalente y compararla con el contenido analizado;
9. clasificar como automática solo la entrada que no pierda datos ni orden;
10. enviar las demás a revisión sin producir una solución parcial engañosa.

La transformación preservará por separado:

- JSON original exacto y su hash;
- versión de la estructura histórica;
- lista ordenada de pasos;
- indicador y literal del resultado final si ya existían;
- procedencia de la solución;
- `solutionId`, `exerciseId`, `sourceRecordId` y clave PAU cuando correspondan;
- incidencias previas y estado de revisión matemática.

No se validará si los pasos son correctos o suficientes. El criterio de éxito será exclusivamente estructural y reversible.

### 8.2 Las 494 falsas referencias MathML

Cada caso deberá comprobarse contra su valor literal y procedencia:

- si se demuestra que es texto o notación de otra clase mal etiquetada, se creará una clasificación correcta en la capa paralela y se conservará la etiqueta histórica;
- si contiene MathML parcial, truncado o ambiguo, será `SOURCE_REVIEW_REQUIRED`;
- nunca se fabricará MathML para justificar la etiqueta original.

### 8.3 Las 106 falsas referencias de imagen

Se verificará si existe un recurso real, una ruta resoluble, un hash o una referencia documental:

- una etiqueta errónea demostrable podrá reclasificarse sin cambiar el literal;
- una imagen ausente, ruta rota o referencia ambigua quedará para revisión de fuente;
- no se generarán figuras ni se inferirá su contenido.

### 8.4 Los 883 casos de `SOURCE_CORRUPTION`

Permanecerán en una cola separada de los errores introducidos por catálogo o normalizador. Para cada caso se conservará:

- evidencia de que la anomalía ya estaba en la fuente;
- archivo, posición y registro original;
- tipo de deterioro;
- fuentes documentales alternativas localizadas;
- decisión sobre si existe una reparación byte a byte inequívoca;
- necesidad de revisión documental o matemática.

Ningún caso dejará de ser `SOURCE_CORRUPTION` por el mero hecho de poder mostrarse de forma más agradable.

### 8.5 Comandos sin barra, límites aplanados, caracteres y HTML

Una reparación solo podrá ser automática si una gramática cerrada produce una única estructura, los delimitadores están balanceados, los tokens no cambian de significado y la reconstrucción es verificable. Ejemplos como `frac{...}{...}` o `sqrt{...}` no se corregirán en bloque sin esta prueba por registro.

Los límites aplanados, mojibake, caracteres sustituidos y HTML mezclado requerirán comparación con la fuente original cuando la transformación pueda cambiar:

- alcance de un operador;
- numerador, denominador, exponente o índice;
- límite inferior o superior;
- relación de igualdad o desigualdad;
- agrupación de matrices, sistemas o funciones a trozos;
- símbolo griego, vector, unidad o signo.

### 8.6 Las 129 soluciones no reconciliadas

Se mantendrán completamente separadas. Antes de normalizarlas deberá existir una comparación documental que resuelva la discrepancia de identidad o contenido. No se asociarán, reemplazarán ni utilizarán para completar automáticamente otro ejercicio. La Fase 2C solo podrá inventariarlas y preparar la evidencia de comparación.

## 9. Estrategia de LaTeX, MathML y árbol estructurado

### 9.1 Decisión recomendada

La representación canónica será un **documento mixto de texto y matemáticas con árbol tipado**, no LaTeX ni MathML como única fuente de verdad.

### 9.2 Papel de LaTeX

El LaTeX normalizado será una serialización derivada, determinista y legible para revisión técnica. Resulta adecuado para interoperabilidad con motores web y para inspección humana, pero por sí solo no preserva toda la procedencia, la separación texto/matemáticas, las decisiones de normalización ni la accesibilidad.

### 9.3 Papel de MathML

El MathML se generará en el futuro como salida derivada para renderizado y accesibilidad cuando el árbol esté validado. No será aceptado como auténtico solo por una etiqueta histórica. Su generación deberá incluir versión del conversor, hash del árbol y validación XML/MathML.

### 9.4 Ventajas del modelo elegido

- **Fidelidad:** conserva literal, orden, delimitadores y trazabilidad.
- **Validación:** permite restricciones por nodo y familia matemática.
- **Renderizado web:** admite generar LaTeX o MathML sin acoplar el catálogo a un motor.
- **Estructuras complejas:** representa matrices, sistemas, integrales, trozos y multilínea explícitamente.
- **Mantenimiento:** versiona reglas y migraciones sin tocar fuentes.
- **Accesibilidad:** permite producir descripciones o MathML desde estructura conocida; las descripciones no demostrables requerirán revisión.
- **Reversibilidad:** mantiene mapeo a rangos y tokens originales y no elimina el literal.

## 10. Calidad matemática, pedagógica, estructural y visual

Los controles se separarán en cuatro ejes independientes:

1. **Corrección matemática:** requiere validación matemática; queda fuera de la normalización automática.
2. **Calidad pedagógica:** comprueba suficiencia, secuencia y claridad de los pasos; requiere perfiles `ESO`, `BACH1` y `BACH2_PAU` y revisión humana.
3. **Integridad estructural:** comprueba que la codificación corresponde exactamente a la evidencia y no pierde contenido; es el objetivo central de Fase 2C.
4. **Calidad visual:** comprueba composición y legibilidad en el entorno aislado; no certifica los otros tres ejes.

Una entidad podrá superar integridad estructural y seguir pendiente de revisión matemática o pedagógica. Del mismo modo, un render visual correcto no convertirá una fuente deteriorada en contenido validado.

La auditoría pedagógica posterior deberá comprobar que cada solución conserva todos los pasos existentes y valorar si son suficientes para su perfil, sin que Fase 2C genere los pasos que falten.

## 11. Prueba visual aislada

### 11.1 Entorno

Se creará en la implementación futura un banco de pruebas que no importe ni modifique `math-renderer.js`, no use el runtime público y no se cargue desde la aplicación. Recibirá documentos normalizados y representaciones derivadas como fixtures estáticos.

### 11.2 Corpus mínimo

El corpus incluirá al menos las doce familias ya seleccionadas en la auditoría:

1. fracción compleja;
2. potencia y raíz;
3. sistema;
4. matriz;
5. determinante;
6. límite;
7. derivada;
8. integral definida;
9. integral indefinida;
10. vector;
11. función a trozos;
12. probabilidad.

Se ampliará para cubrir subíndices, valor absoluto, ecuaciones, inecuaciones, coordenadas, intervalos/conjuntos, multilínea, letras griegas, unidades, logaritmos/exponenciales, sumatorios/productos cuando existan, implicaciones y aproximaciones. Cada familia tendrá ejemplos de enunciado, respuesta y paso de solución, además de cobertura de `ESO`, `BACH1` y `BACH2_PAU` cuando haya material real.

### 11.3 Criterios visuales

Se comprobará como mínimo:

- fracciones verdaderamente verticales y proporcionadas;
- superíndices y subíndices diferenciados y sin colisiones;
- radicales que cubran todo el radicando;
- llaves de sistemas y funciones a trozos con tamaño correcto;
- matrices y determinantes alineados, con delimitadores completos;
- barras de valor absoluto y delimitadores con altura adecuada;
- límites colocados correctamente respecto a `lim`;
- integrales con límites y diferenciales legibles;
- vectores y acentos sin desplazamientos;
- alineación estable en expresiones multilínea;
- saltos de línea sin cortar unidades semánticas;
- ausencia de LaTeX crudo, JSON crudo, solapamientos y recortes;
- comportamiento en anchos aproximados de 320, 375, 768 y 1280 píxeles;
- lectura coherente en enunciado, respuesta y solución paso a paso.

Las pruebas automáticas medirán desbordamientos, cajas superpuestas, elementos recortados, recursos ausentes y texto de control visible. Las capturas y comparaciones visuales requerirán aprobación humana para los casos complejos. La interfaz podrá permitir desplazamiento horizontal controlado para estructuras que no puedan refluír sin perder legibilidad, pero nunca ocultará contenido.

## 12. Artefactos auditables previstos

Cada ejecución completa deberá generar, en un directorio nuevo identificado por versión y huella de entrada:

- manifiesto de entradas y hashes protegidos;
- inventario por entidad, campo, curso, materia y familia;
- decisiones de normalización con una de las cinco disposiciones;
- documentos matemáticos normalizados;
- representaciones LaTeX derivadas;
- MathML derivado solo cuando proceda y pueda validarse;
- registro de reglas aplicadas y transformaciones rechazadas;
- conciliación antes/después por entidad y `sourceRecordId`;
- informe específico de las 3.295 soluciones JSON;
- informe de las 494 etiquetas MathML y las 106 de imagen;
- cola independiente de 883 corrupciones de fuente;
- inventario separado de 129 soluciones no reconciliadas;
- métricas por familia y perfil educativo;
- corpus y resultados visuales aislados;
- hashes semánticos de dos ejecuciones idénticas y de una ejecución con orden invertido;
- ensayo de rollback;
- informe final de limitaciones y revisiones pendientes.

Los artefactos no sustituirán los de Fase 2B ni los de su auditoría.

## 13. Archivos previstos para la implementación futura

La lista exacta deberá confirmarse antes de implementar, pero la separación recomendada es:

### 13.1 Contratos paralelos nuevos

- `catalog/normalization/mathup.math-document.v1.schema.json`
- `catalog/normalization/mathup.normalization-decision.v1.schema.json`
- `catalog/normalization/mathup.math-representation.v1.schema.json`
- `catalog/normalization/mathup.visual-fixture.v1.schema.json`

### 13.2 Biblioteca aislada

- `catalog/normalization/canonical-math-ast.mjs`
- `catalog/normalization/normalize-math-structure.mjs`
- `catalog/normalization/serialize-normalized-latex.mjs`
- `catalog/normalization/validate-math-document.mjs`

### 13.3 Ejecución y auditoría

- `scripts/fase2c-classify-normalization.mjs`
- `scripts/fase2c-normalize-catalog.mjs`
- `scripts/fase2c-build-visual-corpus.mjs`
- `scripts/fase2c-verify-reproducibility.mjs`
- `scripts/fase2c-rollback-trial.mjs`

### 13.4 Pruebas

- `tests/fase2c-math-contracts.test.mjs`
- `tests/fase2c-normalization.test.mjs`
- `tests/fase2c-json-solutions.test.mjs`
- `tests/fase2c-reproducibility.test.mjs`
- `tests/fase2c-visual-fixtures.test.mjs`
- un directorio aislado de fixtures y capturas de Fase 2C.

### 13.5 Artefactos e informe

- `artifacts/fase2c/<run-id>/...`
- `docs/FASE-2C-NORMALIZACION-MATEMATICA-MATHUP.md`

No se prevé modificar ningún archivo existente. En particular, no se modificará `math-renderer.js`, los contratos de Fase 1 o Fase 2B, bancos, `data/`, aplicación, Supabase ni skills.

## 14. Pruebas obligatorias de la implementación futura

### 14.1 Protección e inmutabilidad

- hashes de todos los contratos y artefactos protegidos sin cambios;
- 15.527/15.527, 6.712/6.712 y 607/607 conservados;
- 7.485 ejercicios, 4.649 respuestas y 4.649 soluciones conciliados;
- cero escrituras en producción o en bancos heredados.

### 14.2 Contratos y validación

- contratos acompañantes válidos y versionados;
- rechazo de nodos desconocidos no preservados;
- validación de todas las familias definidas;
- conservación de orden, tipos, identificadores y procedencia.

### 14.3 Transformación sin pérdida

- prueba literal y estructural de ida y vuelta para cada normalización automática;
- ningún token semántico añadido, eliminado o cambiado;
- todos los fragmentos no reconocidos conservados;
- mapeo completo a rangos o valores de origen.

### 14.4 Casos específicos

- las 3.295 soluciones JSON clasificadas una a una;
- contenido, orden, resultado final y procedencia preservados en toda extracción aceptada;
- 494 falsas referencias MathML resueltas o enviadas a revisión, sin MathML fabricado;
- 106 falsas referencias de imagen resueltas o enviadas a revisión, sin imágenes fabricadas;
- 883 corrupciones de fuente aisladas y sin reparación silenciosa;
- 129 soluciones no reconciliadas sin asociación automática.

### 14.5 Reproducibilidad e invariancia

- dos ejecuciones con entradas iguales producen los mismos artefactos semánticos y hashes;
- invertir el orden de entrada no modifica identidades, decisiones ni estructuras;
- toda aleatoriedad queda prohibida en la normalización.

### 14.6 Regresión

- las 22 pruebas originales de Fase 1 siguen pasando;
- las pruebas de Fase 2 y 2B siguen pasando;
- ningún fichero público cambia;
- el catálogo v2 continúa desconectado del runtime.

### 14.7 Pruebas visuales

- cobertura del corpus mínimo y de sus ampliaciones;
- geometría sin solapamientos o recortes;
- ausencia de salida cruda no prevista;
- capturas en escritorio y móvil;
- revisión humana registrada para los casos marcados `VISUAL_REVIEW_REQUIRED`.

### 14.8 Rollback

- retirada completa de los artefactos y contratos acompañantes de Fase 2C en un entorno de ensayo;
- verificación posterior de que todos los hashes protegidos coinciden con el punto de partida;
- demostración de que producción nunca dependió de esos artefactos.

## 15. Criterios cuantitativos de cierre

La Fase 2C no podrá considerarse terminada con porcentajes aproximados. El informe final deberá dar números exactos y conciliables.

1. **Cobertura total:** 16.783/16.783 entidades con una disposición primaria de Fase 2C y razones secundarias trazables.
2. **Errores estructurales:** 3.756/3.756 `CANONICAL_STRUCTURE_ERROR` clasificados; se informará exactamente cuántos fueron `SAFE_AUTOMATIC_NORMALIZATION` y cuántos quedaron en cada tipo de revisión. Ninguno podrá desaparecer del denominador.
3. **Riesgos de renderizado:** 7.525/7.525 `RENDERING_RISK` clasificados; se informará cuántos obtuvieron estructura válida, cuántos solo representación derivada y cuántos permanecen pendientes.
4. **Corrupción de fuente:** 883/883 conservados en cola independiente, con causa y necesidad de revisión; cero reparaciones silenciosas.
5. **JSON en soluciones:** 3.295/3.295 analizados; para cada uno constará extracción aceptada o motivo exacto de rechazo. Toda aceptación conservará el 100 % de claves, orden, pasos, resultado final y procedencia.
6. **Falso MathML:** 494/494 con etiqueta paralela corregida de forma demostrable o estado de revisión; cero fragmentos MathML inventados.
7. **Falsas imágenes:** 106/106 con evidencia de recurso o estado de revisión; cero archivos o figuras inventados.
8. **No reconciliadas:** 129/129 aisladas, inventariadas y sin promoción automática.
9. **Familias:** cobertura de todas las familias presentes, con totales conciliados por curso, materia, tipo de entidad y perfil `ESO`, `BACH1`, `BACH2_PAU`.
10. **Visual:** todas las familias del corpus ejecutadas en enunciado, respuesta y solución cuando existan casos reales, en móvil y escritorio; todos los fallos o aprobaciones registrados.
11. **Reversibilidad:** 100 % de normalizaciones automáticas con prueba de ida y vuelta y localizador a la evidencia.
12. **Reproducibilidad:** igualdad exacta de hashes semánticos en doble ejecución e invariancia frente al orden.
13. **Regresión:** 100 % de las pruebas anteriores y nuevas superadas, sin cambios en runtime público.
14. **Publicación:** cero ejercicios publicados y cero dependencias públicas nuevas.

No se fijará de antemano cuántos de los 3.756 o 7.525 casos deben normalizarse automáticamente: imponer una cuota podría incentivar inferencias. El cierre exige que el número resulte de reglas probadas y que todos los restantes tengan una causa explícita y una cola de revisión.

## 16. Orden recomendado de ejecución futura

1. Congelar y verificar hashes de todas las entradas y contratos protegidos.
2. Crear los contratos acompañantes y sus validadores, sin transformar datos.
3. Construir el clasificador determinista de las cinco disposiciones.
4. Ejecutar una clasificación completa de solo lectura y revisar sus métricas.
5. Implementar primero la extracción reversible de JSON y las reclasificaciones demostrables.
6. Implementar el analizador matemático por familias, comenzando por primitivas y ampliando a estructuras compuestas.
7. Generar documentos normalizados solo para casos que satisfagan los controles.
8. Producir LaTeX derivado y, después, MathML validado como representaciones secundarias.
9. Construir y ejecutar el corpus visual aislado.
10. Ejecutar conciliación, regresión, doble ejecución, orden invertido y rollback.
11. Someter las colas documental, matemática y visual a revisión separada.
12. Emitir el informe final sin conectar ni publicar los resultados.

## 17. Riesgos y mitigaciones

| Riesgo | Consecuencia | Mitigación obligatoria |
|---|---|---|
| Confundir apariencia con significado | Fórmula matemáticamente distinta | Árbol solo con evidencia y revisión ante ambigüedad |
| Reparar corrupción de fuente como si fuera del catálogo | Pérdida de evidencia | Cola separada `SOURCE_CORRUPTION` y comparación documental |
| Usar LaTeX como única verdad | Pérdida de procedencia y estructura mixta | Documento/árbol canónico y LaTeX derivado |
| Confiar en etiquetas MathML o imagen | Recursos o estructuras ficticias | Verificación de contenido y cero fabricación |
| Perder claves o pasos al extraer JSON | Solución incompleta o reordenada | Conservación total, correspondencia y prueba de ida y vuelta |
| Normalizar caracteres por semejanza | Cambio de signo, variable o relación | Lista cerrada, prueba byte a byte y revisión si hay duda |
| Acoplar el catálogo a un renderizador | Bloqueo tecnológico y riesgo público | Representaciones derivadas y prueba aislada |
| Declarar corrección por buen render | Error matemático oculto | Ejes independientes de calidad |
| Desbordamientos en móvil | Contenido ilegible | Corpus responsivo, geometría automática y revisión visual |
| Reglas dependientes del orden | Resultados irreproducibles | Identidades y serialización deterministas, prueba de orden invertido |
| Sobrescribir fases previas | Rollback imposible | Directorio y contratos paralelos, hashes protegidos |
| Automatizar para alcanzar una cuota | Inferencia no autorizada | Cierre por cobertura y justificación, no por porcentaje automático |

## 18. Condiciones de detención

La implementación futura deberá detenerse y solicitar decisión cuando:

- una reparación admita más de una lectura matemática;
- no pueda demostrarse el alcance de un operador o delimitador;
- una estructura exija completar información ausente;
- la fuente y una solución o respuesta entren en conflicto;
- una imagen, MathML o documento original no pueda verificarse;
- se proponga modificar un contrato ya aprobado;
- una transformación pueda afectar al runtime público;
- no pueda garantizarse reconstrucción, trazabilidad o rollback.

## 19. Resultado esperado de la futura Fase 2C

La Fase 2C entregará una capa matemática estructurada y auditable, no un catálogo publicado. Permitirá saber exactamente qué contenido puede normalizarse con seguridad, qué requiere revisión documental, matemática o visual, y qué ya está preparado. Toda fórmula seguirá vinculada a su literal original y ninguna mejora visual se confundirá con una corrección matemática o pedagógica.


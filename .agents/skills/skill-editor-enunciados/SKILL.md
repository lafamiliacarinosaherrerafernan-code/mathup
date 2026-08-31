---
name: skill-editor-enunciados
description: Convierte colecciones de exámenes oficiales en documentos Word editables clasificados por bloques, conservando literalmente cada enunciado y pasando fórmulas, operadores, matrices, sistemas, vectores y demás notación al editor nativo de ecuaciones de Word. Úsala para recopilar ejercicios PAU/EVAU desde PDF, ordenarlos por años o temas, restaurar textos abreviados, insertar tablas o figuras necesarias y auditar entregas DOCX.
---

# Editor de enunciados

Aplicar un flujo de fidelidad documental: el PDF original es la única fuente de verdad.

## Reglas obligatorias

1. Transcribir literalmente el enunciado completo. No resumir, simplificar, modernizar, corregir el estilo ni inventar contexto.
2. Conservar numeración, apartados, unidades, signos, nombres y orden. Cuando el usuario indique que la puntuación editorial no forma parte del ejercicio, eliminar solo expresiones finales inequívocas como `(1 punto)`, `(1,5 puntos)` o `(0.75 ptos)`; no tocar otros paréntesis.
3. Cuando una pregunta del examen obligue a elegir entre alternativas numeradas, por ejemplo `4.1 o 4.2` o `5.1 o 5.2`, tratar cada alternativa numerada como un ejercicio independiente de la base de datos. Eliminar del ejercicio aislado únicamente la instrucción editorial de elección (`Conteste solo UNA...`) y conservar completo el enunciado propio de la alternativa y todos sus apartados `a)`, `b)`, etc. Nunca anexar el comienzo de `4.2` al apartado `b)` de `4.1`, ni mezclar dos alternativas en un mismo ejercicio.
4. Convertir a ecuaciones nativas de Word (OMML) toda la notación matemática: fórmulas, funciones, fracciones apiladas, raíces, potencias, límites, integrales, matrices, determinantes, sistemas, funciones a trozos, pertenencia, intervalos, flechas, infinito, operadores y coordenadas.
5. Mantener las palabras del enunciado como texto normal. No introducir en OMML frases como «se pide que calcules los parámetros», «entre los puntos», «cuando», «siendo» o «calcula». Segmentar cada párrafo en tramos de prosa y tramos matemáticos.
6. Reconstruir matrices desde la disposición visual del original. Contar filas y columnas y comparar cada celda; nunca deducir la estructura a partir de una cadena OCR aplanada.
7. Representar la inversa con superíndice OMML completo: `A^{-1}`, `(A·B)^{-1}`. El exponente debe contener juntos el signo menos y el 1.
8. Representar la traspuesta con `T` en superíndice OMML: `A^T`, `N^T`, `(A-B)^T`. Una `T` situada a la derecha en la línea base es un error.
9. Interpretar potencias solo después de mirar el original. En un polinomio, construir `x^2`, `x^3`, `x^5`, etc., con superíndice. No transformar una constante final `−1` en `x^{-1}`: en `3x−1`, el `−1` es un término independiente.
10. Construir cocientes como fracciones apiladas (`1/2` debe ser un nodo de fracción), salvo que el original use expresamente una barra lineal.
11. Representar vectores con flecha superior mediante acento OMML sobre el símbolo completo. Para un vector con subíndice, aplicar primero el subíndice y después la flecha.
12. Insertar tablas, gráficos y dibujos del original cuando sean necesarios para resolver el ejercicio. Usar una imagen completa y legible si no necesitan ser editables; recortar exclusivamente la tabla o figura, sin preguntas ni texto ajeno.
13. No sustituir una tabla del examen por otra ni omitir tablas auxiliares. Revisar expresamente los anexos y tablas de probabilidad de cada convocatoria, incluso cuando estén al final de la página. La revisión debe cubrir todo el intervalo solicitado, incluidos los años antiguos como 2010–2008; no limitarla a las convocatorias recientes.
14. Insertar cada tabla o figura necesaria exactamente una vez dentro de su ejercicio. Antes de añadirla, recorrer desde el encabezado del ejercicio hasta el encabezado siguiente y comprobar si ya existe un dibujo. Una misma tabla puede reutilizarse en ejercicios distintos, pero no repetirse dentro del mismo ejercicio. Tras guardar, auditar por ejercicio `tablas esperadas = tablas encontradas`; en los ejercicios con una única tabla, el resultado obligatorio es `1 = 1`.
15. Colocar cada opción `a)`, `b)`, `c)` en su propio párrafo, en el orden del original. No fragmentar una fórmula que en el original pertenece a la misma línea lógica del enunciado.
16. No incluir soluciones salvo petición expresa. No borrar archivos del usuario; eliminar únicamente temporales creados durante la ejecución, tras verificar su ruta.
17. En bancos destinados a una aplicación, auditar la cadena completa `PDF original → ejercicio → apartados → canónico → runtime → DOM`. Año y convocatoria no bastan: deben coincidir ejercicio, apartados, cifras, signos, potencias, raíces, fracciones, matrices, sistemas, límites, integrales, condiciones, unidades y recursos visuales en enunciado, opciones, corrección y solución.
18. Registrar por ejercicio `apartados originales`, `apartados canónicos` y `apartados interactivos`. Para todo ejercicio habilitado, las cantidades y etiquetas deben coincidir exactamente. Un apartado ilegible o no convertible se conserva y queda marcado para revisión; nunca se elimina, fusiona ni inventa silenciosamente. Cada alternativa numerada y cada apartado permanecen asociados a su ejercicio correcto.
19. Tratar `etiqueta + signo igual + objeto matemático` como una unidad estructural: `A=`, `B=`, `X=`, `f(x)=`, `r=` o `s=` deben permanecer unidos a su matriz, vector, fracción, función, recta, plano o sistema. Un ajuste responsivo puede mover la unidad completa, pero no separar la etiqueta.
20. La clasificación temática depende de la tarea principal solicitada por el enunciado. Registrar `primaryTopic`, `secondaryTopics[]` y el motivo. La aparición incidental de un determinante, una derivada o una integral en la resolución no convierte esa herramienta en el tema principal.
21. En la salida para aplicaciones, matrices, determinantes, sistemas, funciones a trozos, fracciones, raíces, límites e integrales deben transportarse como estructuras, nunca como texto aplanado o tokens internos. Auditar todas las rutas de renderizado y tamaños de pantalla: el alumno no puede ver `matrix`, `matrix{`, `matrix(`, `system{`, `frac{}`, `sqrt{}` ni delimitadores TeX. `A=matriz`, `B=matriz`, `X=vector` y `f(x)=expresión` son bloques visuales indivisibles.
22. En límites, la fracción debe ser vertical y `x→a` debe quedar como subíndice visual del operador `lim`. En integrales, el signo, límites e integrando deben permanecer legibles y unidos. Probar también opciones y soluciones, no solo el enunciado.
23. En la clasificación, el tema principal es la tarea pedida: calcular un determinante pertenece a Determinantes; resolver o discutir un sistema pertenece a Resolución de sistemas con determinantes aunque se use un determinante; una ecuación o potencia matricial pertenece a Matrices. Registrar herramientas incidentales en `secondaryTopics[]`.
24. Conservar también subapartados romanos, numéricos y jerárquicos. Una subdivisión interactiva (`a.i`, `a.ii`, `b.1`, funciones `f` y `g`) debe registrar su apartado padre y conservar el texto común una sola vez. No confundir una subdivisión pedagógica con un ejercicio independiente.
25. En ejercicios con `Parte I` y `Parte II`, mantener el orden del PDF en canónico, runtime y DOM aunque el material de resolución llegue invertido. Usar identidades jerárquicas estables (`I.a`, `I.b`, `II.a`...) para la paridad y la no repetición.
26. Tratar número y unidad como un bloque tipográfico indivisible mediante espacio no separable: `64 kg`, `1,68 m`, `25 kg/m²`, `10 km²`. Conservar exponentes y denominadores de la unidad.
27. La tabla de distribución normal de Andalucía es un recurso auxiliar, no un examen. Andalucía y Madrid pueden presentarla desde un desplegable asociado al ejercicio; Castilla-La Mancha conserva la tabla incluida localmente en su enunciado. Registrar el tipo exacto de recurso (`normal`, `binomial` o ninguno).
28. Para una errata tipográfica inequívoca del original —por ejemplo, dos apartados consecutivos rotulados `a)`— conservar el literal y la etiqueta documental en la proyección fuente, registrar la incidencia y evitar “corregirla” silenciosamente. La interfaz puede añadir una identidad técnica distinta, pero nunca sustituir la evidencia original.
29. Añadir regresiones a 375, 768 y 1280 px. Deben cubrir matrices, sistemas, rectas/planos, funciones a trozos, fracciones, límites, integrales, raíces, exponentes, subíndices, unidades y tildes, además de opciones, corrección y solución. El cuerpo de la página no puede desbordar horizontalmente.
30. Una auditoría para aplicación no puede declarar `PASS` basándose solo en igualdad textual, tokens normalizados, hashes, campos canónicos o pruebas del renderizador aislado. Debe comparar la representación visual de la página oficial con el DOM que produce el mismo renderizador y las mismas capas de datos que carga la aplicación real.
31. Registrar por ejercicio una firma estructural de fuente y aplicación: número y dimensiones de matrices y determinantes, sistemas y cantidad de ecuaciones bajo una única llave, ramas de funciones a trozos, fracciones verticales, raíces, límites, integrales y secuencia completa de apartados. Una matriz aplanada, una llave por ecuación o una etiqueta separada de su objeto son fallos aunque el texto contenga los mismos símbolos.
32. La capa de correcciones nunca debe borrar una proyección HTML estructurada válida. Solo puede regenerarla desde el literal cuando falte, contenga tokens internos o no reúna las estructuras exigidas. Probar expresamente la precedencia y el orden de carga de las capas.
33. Cuando la extracción haya perdido filas, columnas, delimitadores, signos o condiciones y la página no permita reconstruirlos con certeza, asignar `NEEDS_HUMAN_VISUAL_REVIEW`; conservar el ejercicio y adjuntar fuente, representación de la aplicación y motivo. No inventar estructura para reducir la cola ni contabilizar estos casos como `PASS`.
34. Mantener una galería fuente–aplicación para todos los casos corregidos o pendientes. En formatos antiguos que no puedan rasterizarse sin reparación, no forzar la conversión: señalar el bloqueo del formato y conservar el archivo oficial como autoridad para su apertura manual.
35. La regresión permanente debe recorrer todos los ejercicios habilitados, todos sus apartados, exactamente cuatro opciones por apartado y todos los pasos de solución a 1280, 768 y 375 px. Debe fallar ante tokens internos visibles, errores del renderizador, opciones ausentes o desbordamiento horizontal, y guardar un log identificable por `exerciseId`.
36. En sistemas de ecuaciones, exigir paridad estructural `fuente = canónico = runtime = DOM`: una sola llave por sistema, una fila por ecuación y ninguna ecuación omitida, duplicada o desplazada a otro apartado. Aplicar la misma comprobación a opciones y soluciones; no confundir con un sistema una secuencia narrativa de igualdades independientes.
37. En programación lineal, clasificar por la tarea principal de modelización u optimización, no por la aparición auxiliar de ecuaciones. La solución debe conservar restricciones, fronteras, semiplanos, región factible, vértices exactos, tabla completa `vértice | valor`, interpretación contextual y una gráfica matemática no decorativa. Registrar como fallo cualquier discrepancia entre los vértices calculados, la tabla y la figura.

## Flujo de trabajo

1. Identificar páginas y convocatorias del intervalo solicitado y conservar una referencia página–año–convocatoria.
2. Extraer texto para localizar ejercicios, pero reconstruir notación desde la imagen de la página; el OCR no decide exponentes, filas, columnas ni fracciones.
3. Detectar antes de clasificar las preguntas alternativas del tipo `N.1 o N.2`. Crear un registro independiente para cada alternativa, retirar la instrucción de elección y comprobar que sus apartados pertenecen al registro correcto.
4. Clasificar cada ejercicio según el temario solicitado sin modificarlo. Asignar `primaryTopic` por la tarea matemática principal y `secondaryTopics[]` por contenidos auxiliares relevantes. Si combina bloques, repetir solo el contexto común necesario y separar los apartados por bloque.
5. Comparar cada transcripción con la página original, carácter a carácter en fórmulas y signos.
6. Construir DOCX con texto editable y OMML. Usar MathML→OMML o XML OOXML; no simular estructuras matemáticas con texto.
7. Insertar las tablas auxiliares debajo del ejercicio completo, después de su último apartado (`a)`, `b)`, `c)`, etc.), cuando esa sea su posición en el original. No colocarlas entre el enunciado común y el apartado `a)`. Para otras figuras, conservar su posición exacta respecto al texto original.
8. Hacer la inserción de imágenes idempotente: si el ejercicio ya contiene su tabla o figura, conservarla y no insertar otra copia. Eliminar duplicados únicamente después de asociarlos con certeza al mismo ejercicio.
9. Ordenar de año más reciente a más antiguo e incluir todos los ejercicios encontrados.
10. Ejecutar auditorías semánticas de OMML: exponentes, inversas, traspuestas, fracciones, matrices y prosa introducida por error en ecuaciones.
11. Ejecutar una auditoría de imágenes por ejercicio y convocatoria, no solo por archivo: registrar el encabezado, el número de tablas esperado, el número encontrado y su posición respecto al enunciado.
12. Auditar la separación de alternativas: cada `N.1` y `N.2` debe aparecer una sola vez, sin la instrucción «Conteste solo UNA», sin texto de la alternativa vecina y con todos sus apartados propios.
13. Abrir cada DOCX con Microsoft Word, repaginar y comprobar que no produce errores.
14. Entregar una carpeta con solo los documentos solicitados.
15. Para bancos web, ejecutar después la paridad fuente–DOM con el renderizador real, producir el censo `PASS / CORRECTED / NEEDS_HUMAN_VISUAL_REVIEW / FAIL` y resolver todos los `FAIL` antes de entregar. Los casos `NEEDS_HUMAN_VISUAL_REVIEW` se entregan separados con evidencia visual y no se presentan como validados.

## Criterio de clasificación

Leer [references/clasificacion.md](references/clasificacion.md) cuando el usuario solicite Matemáticas Aplicadas a las Ciencias Sociales II o una clasificación temática comparable.

## Validación

Usar [references/control-calidad.md](references/control-calidad.md) antes de entregar. Si se detecta un enunciado abreviado o una notación dudosa, volver al PDF; nunca corregir de memoria.

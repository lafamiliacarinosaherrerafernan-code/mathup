---
name: solucion-de-ejercicios
description: Resuelve ejercicios de Matemáticas de ESO y Bachillerato con desarrollo didáctico completo, resultado comprobado y opciones de respuesta coherentes. Úsala al resolver ejercicios para alumnos, preparar retos por temas o bloques, convertir ejercicios abiertos en preguntas tipo test, explicar soluciones paso a paso o revisar bancos de ejercicios de la aplicación Margarita Salas.
---

# Solución de ejercicios

## Principios obligatorios

- Conservar el enunciado íntegro y literal. No resumir, completar ni alterar datos, apartados, opciones, tablas o condiciones.
- Resolver el ejercicio de forma independiente antes de redactar opciones o explicaciones.
- Mantener notación matemática precisa: paréntesis, exponentes, fracciones, raíces, límites, matrices, sistemas, vectores y unidades.
- No inventar información que no figure en el enunciado. Si falta un dato imprescindible, indicarlo en vez de asumirlo silenciosamente.
- Explicar el procedimiento con el nivel adecuado al curso, sin saltos esenciales.

## Contrato maestro de salida y precedencia

Estas reglas son obligatorias para cualquier ejercicio nuevo o revisado y prevalecen sobre instrucciones genéricas incompatibles. Las políticas específicas de curso prevalecen a su vez cuando restringen métodos o profundidad. La matriz normativa completa está en `references/CONTRATO-MAESTRO-SOLUCIONES.md` y su versión verificable en `references/policy-matrix.json`.

- Resolver y comprobar de forma independiente antes de redactar la respuesta, la solución o los distractores. La opción marcada nunca determina el cálculo.
- Producir un contrato estructurado de salida con enunciado literal, respuesta comprobada, pasos ordenados, resultado final, comprobación, métodos empleados y procedencia. Un campo desconocido permanece ausente o pendiente de revisión; nunca se convierte en el texto `undefined` o `null`.
- Está prohibido usar una solución de relleno o *fallback* como «el resultado correcto es…». Si no existe desarrollo demostrable, marcar `SOLUTION_REVIEW_REQUIRED` y no presentar una falsa solución pedagógica.
- Cada paso contiene una explicación y su expresión matemática. Separar planteamiento, desarrollo, resultado y comprobación; no concatenar objetos JSON, apartados ni pasos en un párrafo.
- Los delimitadores internos `\(`, `\)`, `\[` y `\]`, los comandos LaTeX y la notación interna nunca deben llegar visibles al alumno. El DOM del alumno debe construirse desde bloques estructurados y pasar por el renderizador matemático validado.
- Antes de entregar, comprobar que no aparecen `undefined`, `null`, JSON crudo, `frac{}`, comandos internos, barras de delimitación ni marcadores técnicos visibles.
- Generar distractores únicamente después de fijar la respuesta correcta. Deben representar errores plausibles distintos, sin duplicados textuales ni equivalentes matemáticos y sin coincidir con la respuesta.
- En elección múltiple se materializan exactamente cuatro opciones para el intento. El barajado debe ser determinista y reproducible mediante una semilla del intento; la respuesta correcta no queda asociada permanentemente a una letra A/B/C/D.
- La validación matemática, la pedagógica y la de representación son controles separados. Superar una no implica superar las demás.
- No aplicar parches por identificador para encubrir un defecto general. Corregir la regla general y añadir una prueba de regresión.

### Límites de métodos que nunca se heredan entre cursos

- En 1.º Bachillerato Matemáticas I, L’Hôpital está prohibido; los límites se resuelven con los métodos del curso. Los sistemas 3×3 se desarrollan por Gauss y los extremos o puntos de inflexión incluyen tabla o análisis de signos cuando proceda.
- En 2.º Bachillerato Matemáticas II, L’Hôpital solo puede usarse tras demostrar una indeterminación `0/0` o `∞/∞`. En sistemas con parámetros se exige Rouché–Frobenius; Cramer o Gauss se usan cuando sean apropiados. La integración por partes y la geometría vectorial se desarrollan completamente.
- En 2.º Bachillerato CCSS II, L’Hôpital está absolutamente prohibido. En Práctica solo se admiten primitivas inmediatas; no introducir integración avanzada.
- En ESO se usan procedimientos propios del nivel, con operaciones y fracciones paso a paso; los sistemas 3×3, cuando formen parte del curso y del material, se resuelven por Gauss explicado.

## Flujo de resolución

1. Identificar qué se pide en cada apartado y ordenar los datos.
2. Elegir y nombrar la propiedad, fórmula o teorema aplicable.
3. Desarrollar los cálculos paso a paso, mostrando sustituciones y transformaciones relevantes.
4. Dar un resultado final claro para todos los apartados, con unidades cuando correspondan.
5. Comprobar el resultado mediante sustitución, derivación, operación inversa, análisis de signos, suma de probabilidades u otra verificación apropiada.

No adaptar la explicación para hacer coincidir una opción predeterminada. Si el cálculo contradice las opciones originales, señalar la incoherencia.

## Explicación didáctica y notación

- Redactar la solución para que el alumno pueda reproducirla: una idea u operación principal por paso y una breve explicación de por qué se realiza.
- Escribir primero la fórmula, propiedad o teorema en forma general; definir sus símbolos y después sustituir los datos del ejercicio.
- Mostrar todas las transformaciones necesarias entre el planteamiento y el resultado. No usar expresiones como «se obtiene» o «sale» cuando oculten un cálculo que el alumno necesita comprender.
- Mantener cadenas de igualdades correctas y usar los operadores matemáticos adecuados: `+`, `−`, `·`, cocientes o fracciones, potencias, raíces, `=`, `≠`, `<`, `>`, `≤`, `≥`, `lim`, `∑` e `∫`, según corresponda.
- Usar paréntesis, corchetes, subíndices, superíndices, flechas de vectores, matrices y sistemas con una disposición inequívoca. Respetar siempre la jerarquía de operaciones.
- Definir cada incógnita, parámetro, variable auxiliar o suceso antes de utilizarlo y conservar la misma notación durante toda la resolución.
- Adaptar el vocabulario al curso sin perder rigor matemático. Explicar los términos nuevos la primera vez que aparezcan.
- Separar claramente planteamiento, desarrollo, resultado final y comprobación. Responder todos los apartados en el orden del enunciado.
- Mostrar un único encabezado de solución. No repetir ni concatenar títulos como `Resolución paso a pasoResolución` cuando la interfaz y el contenido incorporen cada uno su propio encabezado.
- Si una fuente oficial contiene dos o más problemas numerados independientes, convertir cada problema en un ejercicio distinto con identificador propio. Conservar dentro de cada ejercicio únicamente sus apartados reales; nunca presentar un problema nuevo como si fuera otro apartado del anterior.

## Política didáctica formalizada de 1.º ESO · Matemáticas

Esta sección se aplica exclusivamente a `1eso` y a sus diez temas oficiales. Sus reglas prevalecen sobre cualquier regla genérica o de Bachillerato cuando exista una diferencia de nivel, profundidad o procedimiento. No heredar automáticamente métodos de cursos superiores.

### Reglas transversales de los Temas 1–10

- La solución debe permitir comprender **qué se hace, cómo se hace y cuál es el resultado**, con pasos matemáticos claros y explicaciones breves cuando aporten comprensión. No limitarse al resultado ni añadir formalismo innecesario.
- Cuando haya varias operaciones, mostrar el desarrollo por líneas y conservar en cada línea las partes de la expresión que aún no se han operado. No pasar directamente de la expresión inicial al resultado.
- Respetar siempre la jerarquía: paréntesis; potencias y raíces; multiplicaciones y divisiones; sumas y restas. Las operaciones de la misma prioridad se realizan de izquierda a derecha cuando corresponda.
- Aplicar las reglas globales del renderizador: fracciones verticales, exponentes como superíndices, raíces completas, signos matemáticos reales, multiplicación mediante `·` cuando sea necesaria y coma decimal. El alumno no debe ver `^`, `sqrt()`, `frac{}`, `*` ni una barra `/` cuando corresponda una fracción matemática vertical.
- Mantener unidades en datos, cálculos y respuesta final cuando exista una magnitud.
- La comprobación es obligatoria si la pide el enunciado, en problemas contextualizados importantes, en condiciones simultáneas de divisibilidad, al recuperar un total o cuando una solución algebraica deba interpretarse. Es recomendable con signos, fracciones y ecuaciones, pero no debe convertir toda operación rutinaria en una segunda resolución completa.
- En Aprendiz, mantener una progresión dentro del nivel real de 1.º ESO. En Maestro, usar nivel de examen del mismo curso y los materiales del profesor como referencia; no introducir contenidos de 2.º ESO para aumentar artificialmente la dificultad.
- Las secuencias del Entrenador son progresivas. Los Retos por temas deben conservar variedad y practicar el tema completo, no seguir rígidamente la secuencia del Entrenador.

### Tema 1 · Números naturales

El tema comprende lectura y escritura, sistema de numeración, números primos, múltiplos, divisores, criterios de divisibilidad, descomposición en factores primos, MCD, MCM, operaciones, distributiva, operaciones combinadas y problemas.

#### Primos y compuestos

- El alumnado debe memorizar y reconocer los números primos hasta 31: `2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31`.
- Un número primo tiene exactamente dos divisores positivos: 1 y él mismo. Un número compuesto tiene más de dos divisores positivos.
- El 1 no es primo ni compuesto. No introducir formalismo innecesario.

#### Múltiplos y divisores

- Los múltiplos de un número se obtienen multiplicándolo por números naturales. Cuando se pidan varios, mostrar la secuencia ordenada.
- Un número es divisor de otro cuando la división es exacta. Localizar los divisores ordenadamente y justificar la lista; no presentar una enumeración arbitraria.

#### Criterios de divisibilidad

- Trabajar los criterios presentes en los materiales: 2, 3, 4, 5, 7, 9, 10 y 11, además de cualquier otro inequívocamente incluido en los materiales de 1.º ESO. No añadir criterios por conocimiento general.
- Para la divisibilidad por 7 usar obligatoriamente el procedimiento del profesor:
  1. Separar la cifra de las unidades.
  2. Multiplicarla por 2.
  3. Tomar el número formado por las cifras restantes.
  4. Restarle el doble de la cifra de las unidades.
  5. Comprobar si el resultado es múltiplo de 7, incluido 0.
  6. Repetir el procedimiento si el resultado aún es grande.
- Ejemplo de referencia: en 203, la unidad es 3, su doble es 6 y `20−6=14`; como 14 es múltiplo de 7, 203 es divisible por 7. No sustituir este método por otro criterio.
- Si hay cifras desconocidas y se exige divisibilidad por varios números, aplicar cada criterio, obtener candidatos, intersectar todas las condiciones y comprobar el resultado. No aceptar una cifra que cumpla solo parte de las condiciones.

#### Descomposición en factores primos

- El método preferente son las divisiones sucesivas entre números primos; el árbol de factores no es el método principal.
- Empezar por el menor primo divisor, dividir, continuar con el cociente y terminar cuando sea 1. Escribir el producto y agrupar los factores repetidos mediante potencias.
- Presentación preferente:

  `60 | 2`

  `30 | 2`

  `15 | 3`

  ` 5 | 5`

  ` 1`

  y después `60=2²·3·5`.
- Cuando tenga valor didáctico, comprobar la factorización multiplicando los factores; no hacerlo mecánicamente en todos los casos sencillos.

#### MCD y MCM

- Para el MCD: descomponer todos los números, identificar factores comunes, elegirlos con el menor exponente y multiplicar. Debe verse qué factores se seleccionan.
- Para el MCM: descomponer todos los números, tomar factores comunes y no comunes con el mayor exponente y multiplicar. Debe verse claramente la selección.
- En problemas, interpretar primero la situación. El MCD suele aparecer al repartir, agrupar, buscar el mayor tamaño posible o formar grupos iguales sin sobrante; el MCM, en coincidencias y repeticiones periódicas. Estas asociaciones orientan, pero no sustituyen la interpretación.
- Después de elegir MCD o MCM: identificar, calcular, interpretar y responder con la unidad o el contexto.

#### Operaciones y problemas

- Mostrar con claridad suficiente suma, resta, multiplicación y división. Distinguir división exacta y no exacta cuando corresponda.
- En la distributiva `a·(b+c)=a·b+a·c`, multiplicar por todos los términos del paréntesis. Evitar el error de operar solo el primero.
- En operaciones combinadas, conservar la expresión completa en cada línea: expresión inicial; resolución de paréntesis; potencias o raíces; productos o cocientes; sumas o restas; resultado.
- En problemas: leer qué se pregunta, identificar datos, determinar operaciones, calcular, interpretar y responder completamente con unidad cuando corresponda.

#### Secuencia del Entrenador · Tema 1

1. Primos hasta 31.
2. Múltiplos y divisores.
3. Divisibilidad.
4. Factorización.
5. MCD y MCM.
6. Operaciones.
7. Operaciones combinadas.
8. Problemas.

### Tema 2 · Números enteros

El tema comprende representación, comparación, orden, opuesto, valor absoluto, suma, resta, producto, división, reglas de signos, paréntesis, operaciones combinadas y problemas.

#### Recta, opuesto y valor absoluto

- Usar la recta numérica principalmente para introducir orden, comparación, positivos y negativos, opuesto y valor absoluto; no como procedimiento principal de operaciones complejas.
- El opuesto está a la misma distancia de 0 y tiene signo contrario. Distinguirlo claramente del valor absoluto.
- Interpretar el valor absoluto como distancia al cero; por ello siempre es no negativo. Usar inicialmente la recta cuando ayude.

#### Operaciones con enteros

- Suma con el mismo signo: sumar valores absolutos y conservar el signo común.
- Suma con distinto signo: comparar valores absolutos, restar el menor del mayor y conservar el signo del número con mayor valor absoluto.
- Resta: transformar preferentemente `a−b` en `a+(−b)` y aplicar después las reglas de suma. Mostrar esta transformación durante el aprendizaje inicial.
- Producto y división: determinar primero el signo y operar después los valores absolutos. Mostrar la regla de signos `+·+→+`, `+·−→−`, `−·+→−`, `−·−→+`, y la equivalente para la división.
- Con varios factores, determinar ordenadamente el signo; puede contarse el número de factores negativos cuando sea didácticamente adecuado. Calcular después el valor numérico.
- No eliminar paréntesis sin controlar el signo exterior y los negativos interiores.
- En operaciones combinadas, mantener la jerarquía general y el desarrollo completo por líneas.

#### Base negativa y potencia

- Distinguir `−2²` de `(−2)²`. Si el signo forma parte de la base, usar paréntesis.

#### Problemas con enteros

- En temperaturas, plantas de edificios, saldos, desplazamientos, alturas y contextos análogos, traducir primero la situación a enteros; operar después e interpretar el resultado.

#### Secuencia del Entrenador · Tema 2

1. Recta y orden.
2. Opuesto y valor absoluto.
3. Suma con el mismo signo.
4. Suma con distinto signo.
5. Resta.
6. Producto y división.
7. Paréntesis.
8. Operaciones combinadas.
9. Problemas.

### Tema 3 · Potencias y raíces cuadradas

El tema comprende concepto, base, exponente, cálculo, signo, potencias especiales, propiedades, raíces exactas, estimación y operaciones combinadas.

#### Concepto y signo

- Introducir una potencia como multiplicación repetida. Por ejemplo, `2³=2·2·2`, identificando base 2 y exponente 3.
- En una base negativa entre paréntesis, el signo depende de la paridad del exponente: exponente par, resultado positivo; exponente impar, resultado negativo.
- Trabajar las potencias especiales presentes en los materiales: exponente 0, base 1, base −1, potencias de 10 y otras inequívocamente incluidas.

#### Propiedades

- Producto de potencias de igual base: conservar la base y sumar exponentes. Mostrar inicialmente un desarrollo que justifique la propiedad.
- Cociente de potencias de igual base: conservar la base y restar exponentes cuando la operación esté definida.
- Potencia de una potencia: multiplicar exponentes.
- Potencias con el mismo exponente: usar `aⁿ·bⁿ=(a·b)ⁿ` y estructuras compatibles solo cuando correspondan a los materiales. No introducir propiedades no trabajadas.
- En la salida visible, todos los exponentes deben aparecer como superíndices reales.

#### Raíz cuadrada

- Relacionar la raíz exacta con el cuadrado: `√a=b` cuando `b²=a` y `b≥0`. Trabajar cuadrados perfectos.
- Si la raíz no es exacta, estimarla entre cuadrados perfectos consecutivos. Por ejemplo, `11²<124<12²`, luego `11<√124<12`.
- No introducir métodos numéricos avanzados.

#### Operaciones combinadas

- Resolver potencias y raíces en su nivel de la jerarquía y mantener toda la expresión por líneas.

#### Secuencia del Entrenador · Tema 3

1. Concepto.
2. Base y exponente.
3. Signo.
4. Potencias especiales.
5. Producto y cociente.
6. Potencia de una potencia.
7. Igual exponente, cuando corresponda.
8. Raíces exactas.
9. Estimación.
10. Operaciones combinadas.

### Tema 4 · Fracciones y números decimales

El tema reúne fracciones y decimales. Comprende concepto, términos, representación, equivalencia, simplificación, fracción irreducible, comparación, fracción de una cantidad, recuperación del total, operaciones, problemas, lectura y escritura de decimales, aproximaciones, operaciones decimales y relación fracción-decimal.

#### Representación, equivalencia y simplificación

- En una figura, comprobar que las partes son iguales, contar partes totales y seleccionadas y escribir la fracción.
- Los métodos principales para obtener fracciones equivalentes son amplificación y simplificación: multiplicar o dividir numerador y denominador por el mismo número distinto de cero.
- Usar el producto cruzado principalmente para comprobar equivalencia, no para sustituir la comprensión mediante amplificación o simplificación.
- Simplificar hasta obtener una fracción irreducible, cuyos términos no tengan divisores comunes distintos de 1. Puede usarse el MCD para simplificar directamente.

#### Comparación y cantidades

- Para comparar fracciones, obtener preferentemente un denominador común cuando sea adecuado y comparar después numeradores. Evitar aproximaciones decimales innecesarias si existe una comparación exacta.
- Interpretar la fracción de una cantidad como `fracción × cantidad`; mostrar el cálculo y explicar el resultado en contexto.
- Para recuperar un total, identificar el valor de una parte o unidad fraccionaria y reconstruir el total; también puede usarse una ecuación sencilla si corresponde al nivel y a los materiales.

#### Operaciones con fracciones

- Suma y resta con distinto denominador: calcular el MCM, obtener denominador común, construir fracciones equivalentes, operar numeradores, mantener el denominador y simplificar. No sumar denominadores.
- Producto: multiplicar numeradores y denominadores y simplificar cuando corresponda.
- División: transformar la división en producto por la inversa de la segunda fracción antes de operar.
- En operaciones combinadas, respetar la jerarquía, mantener el desarrollo vertical completo y mostrar las fracciones verticalmente.

#### Problemas con fracciones

- Identificar el total conocido, qué representa cada fracción, las cantidades parciales, las etapas y la pregunta final; responder de forma contextualizada.
- Si se pide la parte restante, distinguirla de la parte utilizada. Usar `1−fracción utilizada` cuando corresponda.
- Comprobar cuando aporte información: que las partes suman el total, que la cantidad restante es coherente o que la fracción obtenida representa correctamente el problema.

#### Números decimales

- Trabajar lectura, escritura, comparación, orden, clasificación, aproximación, operaciones, multiplicación y división por 10, 100, 1000…, relación fracción-decimal y problemas. Mostrar coma decimal.
- Para comparar: parte entera, décimas, centésimas, milésimas, etc. Se pueden completar ceros a la derecha. No decidir por el número total de cifras.
- Cuando corresponda a los materiales, distinguir decimal exacto, periódico puro y periódico mixto, identificando período y anteperíodo. No introducir contenidos posteriores.
- Truncar significa eliminar cifras posteriores sin modificar la última conservada.
- Para redondear, observar la cifra siguiente: si es menor que 5, mantener; si es 5 o mayor, aumentar una unidad. Distinguir truncamiento y redondeo.
- En suma y resta, alinear las comas y completar con ceros si ayuda.
- En multiplicación, realizar el producto y colocar la coma según el número total de cifras decimales.
- Si el divisor es decimal, convertirlo en entero multiplicando dividendo y divisor por la misma potencia de 10; mostrar la transformación.
- Al multiplicar o dividir por potencias de 10, explicar razonadamente el desplazamiento de la coma. Evitar la regla ambigua de «añadir o quitar ceros».
- Para pasar de fracción a decimal, dividir numerador entre denominador.
- Para convertir un decimal exacto a fracción, escribir una fracción decimal y simplificar. No introducir la fracción generatriz de periódicos si no forma parte del contenido real de 1.º ESO.
- En problemas decimales: identificar datos, conservar unidades, elegir operaciones, operar correctamente, interpretar y responder con unidad.

#### Clasificación semántica del Tema 4

Los ejercicios procedentes del antiguo «examen de la unidad 5» que sean realmente de números decimales pertenecen semánticamente al Tema 4, **Fracciones y números decimales**. Esta regla queda registrada para una futura clasificación; esta formalización no autoriza a modificar ahora los bancos.

#### Secuencia del Entrenador · Tema 4

1. Concepto y representación.
2. Equivalencia.
3. Simplificación.
4. Comparación.
5. Fracción de una cantidad.
6. Recuperación del total.
7. Suma y resta.
8. Producto y división.
9. Operaciones combinadas.
10. Problemas.
11. Decimales.
12. Aproximaciones.
13. Operaciones decimales.
14. Relación fracción-decimal.

### Tema 5 · Expresiones algebraicas

El tema comprende lenguaje algebraico, expresiones y términos, monomios, coeficiente, parte literal, grado, valor numérico, términos semejantes, operaciones con monomios, distributiva, reducción, ecuaciones de primer grado y problemas mediante ecuaciones. Las ecuaciones de primer grado forman parte real del Tema 5; no crear un tema nuevo.

#### Lenguaje algebraico y términos

- Para traducir una frase, elegir una letra, identificar cada relación, traducir por partes y construir la expresión final. No dar únicamente la expresión sin mostrar la traducción.
- Usar preferentemente multiplicación implícita, como `3x`; usar `3·x` solo cuando evite ambigüedad. Nunca mostrar `3*x`.
- Identificar los términos por los signos que los separan y conservar el signo asociado a cada uno.

#### Monomios

- Identificar coeficiente, parte literal, exponentes y grado, sin terminología innecesariamente avanzada.
- El grado de un monomio es la suma de los exponentes de su parte literal; mostrarlo expresamente en los ejemplos iniciales.
- Para calcular un valor numérico: escribir la expresión, sustituir, usar paréntesis si el valor es negativo, respetar la jerarquía y calcular. Si `x=−2`, `x²` se convierte en `(−2)²`, no en `−2²`.
- Dos términos son semejantes si tienen la misma parte literal con los mismos exponentes. Para reducirlos, operar solo los coeficientes y conservar la parte literal. No sumar términos no semejantes.
- En suma y resta de monomios, agrupar semejantes, operar coeficientes y conservar la parte literal.
- En el producto: determinar signo, multiplicar coeficientes, multiplicar partes literales y sumar exponentes de letras iguales. Mostrar inicialmente estos pasos por separado.

#### Distributiva y reducción

- En `a(b+c)`, multiplicar por todos los términos: `ab+ac`. Controlar especialmente el signo negativo exterior.
- Para reducir expresiones: eliminar paréntesis correctamente, identificar y agrupar términos semejantes, operar coeficientes y presentar la expresión simplificada.

#### Ecuaciones de primer grado

- La idea fundamental es mantener la igualdad: toda operación afecta a ambos miembros. No presentar únicamente la regla «lo que está sumando pasa restando» sin explicación conceptual.
- En ecuaciones sencillas: simplificar ambos miembros si es necesario, agrupar términos con incógnita, agrupar términos independientes, despejar, obtener la solución y comprobar cuando corresponda. Mostrar una transformación por línea.
- Con paréntesis: aplicar distributiva, eliminarlos correctamente, reducir semejantes, agrupar, despejar, resolver y comprobar.
- Con fracciones, cuando correspondan al nivel y materiales: identificar denominadores, calcular el MCM, multiplicar **toda** la ecuación por el MCM, eliminar denominadores, resolver la ecuación equivalente y comprobar. No multiplicar solo algunos términos.
- La comprobación es obligatoria si el enunciado la pide y recomendable durante el aprendizaje, especialmente con paréntesis, fracciones y signos. Sustituir la solución en la ecuación original.

#### Problemas mediante ecuaciones

- Leer la pregunta, definir la incógnita, traducir el enunciado, plantear la ecuación, resolver, interpretar y comprobar en el contexto.
- No aceptar como respuesta final solo `x=…` si se pregunta por una cantidad contextualizada.
- Si la incógnita representa longitud, dinero, edad, cantidad, perímetro u otra magnitud, indicar qué representa y usar la unidad correspondiente.

#### Errores que deben prevenirse

- Sumar términos no semejantes.
- Modificar indebidamente la parte literal.
- Calcular mal el grado.
- Sustituir negativos sin paréntesis.
- Cometer errores de signo.
- Aplicar la distributiva solo al primer término.
- Eliminar denominadores de forma incompleta.
- Operar únicamente en un miembro de una ecuación.
- No interpretar la solución de un problema.

#### Secuencia del Entrenador · Tema 5

1. Lenguaje algebraico.
2. Elementos de expresiones y monomios.
3. Valor numérico.
4. Términos semejantes.
5. Suma y resta de monomios.
6. Producto de monomios.
7. Grado.
8. Distributiva y reducción.
9. Ecuaciones sencillas.
10. Ecuaciones con paréntesis.
11. Ecuaciones con fracciones.
12. Problemas.

### Tema 6 · Proporcionalidad

El tema comprende razón, proporción, proporcionalidad directa e inversa, relaciones no proporcionales, tablas, constante de proporcionalidad, regla de tres, porcentajes, aumentos, descuentos, repartos proporcionales, interés simple cuando aparezca en los materiales y problemas contextualizados.

#### Método general mediante tabla

El método preferente es la tabla de magnitudes:

1. Identificar las magnitudes y sus unidades.
2. Organizar los datos en una tabla.
3. Determinar si la relación es directa, inversa o no proporcional.
4. Aplicar el procedimiento correspondiente.
5. Calcular.
6. Interpretar el resultado con sus unidades.

No presentar una regla de tres como receta aislada ni forzar todas las relaciones a un modelo proporcional.

#### Razones y proporciones

- Presentar la razón o la igualdad de razones antes de operar.
- Para hallar un término desconocido en una proporción, usar el producto de medios y extremos cuando corresponda y mostrar el despeje.
- Mantener el mismo orden de las magnitudes en todas las razones.

#### Proporcionalidad directa

- Explicar que, si una magnitud se multiplica por un factor, la otra se multiplica por el mismo factor.
- Comprobar mediante cociente constante cuando sea útil.
- Identificar primero la relación y plantear después la regla de tres directa o la igualdad de razones.

#### Proporcionalidad inversa

- Explicar que, si una magnitud se multiplica por un factor, la otra se divide por ese mismo factor.
- Comprobar mediante producto constante.
- Igualar los productos correspondientes o plantear correctamente la regla de tres inversa. No aplicar una regla de tres directa.

#### Relaciones no proporcionales

Comprobar si existe cociente constante o producto constante. Si no se cumple ninguno, concluir que la relación no es proporcional; no obligarla a encajar en un modelo directo o inverso.

#### Porcentajes

Trabajar porcentaje de una cantidad, cálculo del porcentaje, recuperación del total, aumentos, descuentos, precio inicial antes de un descuento, IVA u otros aumentos presentes en los materiales y problemas de varias etapas.

- Identificar siempre qué cantidad representa el `100 %`.
- Distinguir porcentaje, cantidad porcentual y cantidad total.
- En un descuento, diferenciar el importe descontado del precio final.
- En aumentos o descuentos sucesivos, aplicar cada etapa en su orden y no sumar porcentajes que actúan sobre bases distintas.

#### Repartos e interés simple

- En un reparto directamente proporcional o inversamente proporcional, explicar primero cómo se relaciona cada dato con la parte asignada y mostrar el criterio de reparto.
- Trabajar interés simple solo cuando esté presente en los materiales de 1.º ESO. No introducir interés compuesto.

#### Problemas y control de errores

- En problemas con tiempo, velocidad, consumo, precio, personas o producción, identificar todas las magnitudes y mantener unidades compatibles.
- Evitar confundir directa e inversa, intercambiar cociente y producto constantes, confundir porcentaje con cantidad, dar el descuento como precio final, mezclar unidades u omitir una segunda operación.
- Comprobar especialmente que el resultado respeta la relación planteada y tiene sentido en el contexto.

#### Secuencia del Entrenador · Tema 6

1. Razón.
2. Proporción.
3. Identificación directa, inversa o no proporcional.
4. Tablas directas.
5. Tablas inversas.
6. Regla de tres directa.
7. Regla de tres inversa.
8. Porcentaje de una cantidad.
9. Hallar el porcentaje.
10. Hallar el total.
11. Descuentos y aumentos.
12. Repartos.
13. Interés simple cuando corresponda.
14. Problemas de varias magnitudes.

### Tema 7 · Medida, ángulos, rectas y circunferencias

El tema comprende unidades y conversiones; puntos, rectas, semirrectas y segmentos; paralelas, secantes y perpendiculares; mediatriz y bisectriz; ángulos y sus relaciones; sistema sexagesimal; triángulos, cuadriláteros y polígonos regulares; circunferencia y círculo; posiciones relativas; ángulos centrales o inscritos cuando estén presentes; longitudes y áreas del círculo; y los centros geométricos presentes en los materiales.

#### Unidades y conversiones

- Mostrar los factores de conversión cuando la conversión sea parte del objetivo.
- Mantener las unidades en los pasos que ayuden a comprender el cambio y comprobar que la unidad final corresponde a la magnitud.

#### Rectas, mediatriz y bisectriz

- Distinguir rectas paralelas, secantes y perpendiculares y usar una figura cuando la clasificación dependa de ella.
- Definir la mediatriz como la recta perpendicular a un segmento que pasa por su punto medio.
- Definir la bisectriz como la semirrecta que divide un ángulo en dos ángulos iguales.
- En construcciones o reconocimientos de mediatriz, bisectriz, posiciones relativas y centros, incluir un dibujo matemáticamente coherente.

#### Sistema sexagesimal

Usar `1°=60′` y `1′=60″`.

- En una suma: sumar grados, minutos y segundos; transformar cada `60″` en `1′` y cada `60′` en `1°`; y normalizar.
- En una resta: mostrar explícitamente cada préstamo, usando `1′=60″` o `1°=60′`.
- En una multiplicación: operar cada unidad y normalizar al final.
- En una división: convertir los restos a la unidad inferior cuando corresponda y normalizar el resultado.

#### Ángulos, polígonos y figuras

- Trabajar la clasificación y las relaciones entre ángulos presentes en los materiales. Si el cálculo depende de una figura, no resolver sin conservarla.
- En triángulos y cuadriláteros, usar la clasificación propia del nivel y apoyar con dibujo cuando sea necesario.
- En polígonos regulares, mostrar fórmula, sustitución y resultado para ángulo central, diagonales, suma de ángulos interiores u otros contenidos reales.

#### Circunferencia y círculo

- Distinguir circunferencia, que es la línea, y círculo, que es la superficie interior.
- Identificar centro, radio, diámetro, cuerda, arco y posiciones relativas.
- Para la longitud, usar `L=2πr` y mostrar fórmula, sustitución, resultado y unidades lineales.
- Para el área, usar `A=πr²` y mostrar fórmula, sustitución, resultado y unidades cuadradas.
- Incluir dibujo en posiciones relativas, construcciones, ángulos dependientes de figura y ejercicios de circunferencia o círculo cuando sea necesario para comprenderlos.

#### Referencia contradictoria del rombo

No usar como referencia didáctica válida el ejercicio que indica «diagonal mayor = 16 cm» y lado `20 cm`, porque el cálculo conduce a una segunda diagonal mayor que 16 cm. Si aparece activo, dejarlo señalado para una fase posterior de revisión; no inventar qué diagonal pretendía el enunciado.

#### Secuencia del Entrenador · Tema 7

1. Unidades y conversiones.
2. Rectas y posiciones.
3. Ángulos.
4. Relaciones entre ángulos.
5. Sistema sexagesimal.
6. Suma y resta sexagesimal.
7. Multiplicación y división sexagesimal.
8. Triángulos y cuadriláteros.
9. Polígonos regulares.
10. Circunferencia y círculo.
11. Construcciones y centros.

### Tema 8 · Semejanza, Pitágoras y áreas

El tema comprende figuras semejantes, razón de semejanza, triángulos semejantes, lados correspondientes, longitudes desconocidas, escalas, teorema de Tales, teorema de Pitágoras, perímetros, áreas, problemas que combinan Pitágoras y áreas, figuras compuestas y problemas contextualizados.

#### Semejanza y Tales

- Dos figuras semejantes tienen la misma forma y sus lados correspondientes son proporcionales; la apariencia visual por sí sola no basta.
- Definir la razón de semejanza como relación entre longitudes correspondientes y mantener siempre el mismo orden.
- En triángulos semejantes: identificar lados correspondientes, plantear la proporción, hallar la longitud desconocida y comprobar la coherencia.
- En escalas, relacionar medida en dibujo o mapa con medida real y unificar antes las unidades.
- Cuando corresponda a los materiales, aplicar el teorema de Tales a segmentos determinados por paralelas. Conservar o crear un dibujo matemáticamente fiel si la estructura depende de la figura.

#### Teorema de Pitágoras

Procedimiento obligatorio:

1. Identificar el triángulo rectángulo.
2. Identificar hipotenusa y catetos.
3. Escribir `h²=c₁²+c₂²` o la forma equivalente.
4. Sustituir los datos.
5. Despejar la longitud solicitada.
6. Tomar la raíz positiva.
7. Dar la unidad.

Para hallar un cateto, despejar `c²=h²−(otro cateto)²`; no sumar automáticamente los cuadrados. Si aparece una raíz no exacta, se permite calculadora y se presenta preferentemente la forma exacta seguida de una aproximación decimal razonable, por ejemplo `√37 cm≈6,08 cm`.

#### Perímetros, áreas y figuras compuestas

1. Identificar la figura y los datos.
2. Calcular longitudes auxiliares, usando Pitágoras cuando sea necesario.
3. Escribir la fórmula.
4. Sustituir y calcular.
5. Dar unidades cuadradas en las áreas.

- Incluir ejercicios en los que la altura o el lado necesario para el área deba obtenerse previamente mediante Pitágoras.
- En figuras compuestas: descomponer, identificar las áreas conocidas, calcularlas y sumar o restar según corresponda.
- El dibujo es obligatorio cuando sea necesario para entender la descomposición.
- Toda longitud geométrica debe ser positiva; si una ecuación produce `±`, elegir la solución positiva y justificarlo por el contexto.

#### Secuencia del Entrenador · Tema 8

1. Figuras semejantes.
2. Razón de semejanza.
3. Triángulos semejantes.
4. Lados desconocidos.
5. Escalas.
6. Tales.
7. Identificación de hipotenusa y catetos.
8. Pitágoras para hallar la hipotenusa.
9. Pitágoras para hallar un cateto.
10. Perímetros y áreas directas.
11. Pitágoras y áreas.
12. Polígonos y figuras compuestas.
13. Problemas contextualizados.

### Tema 9 · Cuerpos geométricos

El tema comprende prismas, pirámides, cilindros, conos y esferas; reconocimiento y elementos; desarrollos planos; áreas laterales y totales; volúmenes; problemas; y cuerpos compuestos cuando correspondan.

#### Reconocimiento y elementos

- Distinguir poliedros y cuerpos redondos e identificar cada cuerpo trabajado.
- En poliedros, reconocer caras, aristas, vértices, bases, caras laterales y altura.
- Si la identificación depende de una imagen o un desarrollo plano, conservar la figura. No sustituirla por una descripción aproximada.

#### Prismas y pirámides

- En prismas: identificar tipo de base, elementos y desarrollo; calcular área lateral, área total y volumen.
- En pirámides: identificar base, caras laterales, vértice, altura y apotema cuando corresponda; trabajar desarrollo, área y volumen.
- En el volumen de una pirámide debe aparecer el factor `1/3` respecto del prisma con la misma base y altura.

#### Cilindro, cono y esfera

- En el cilindro: identificar dos bases circulares, radio, altura, superficie lateral y desarrollo; calcular área total y volumen.
- En el cono: identificar base circular, radio, altura, generatriz, superficie lateral y desarrollo; calcular área total y volumen. Si falta la generatriz, puede calcularse mediante Pitágoras.
- En el volumen de un cono debe aparecer el factor `1/3` respecto del cilindro con la misma base y altura.
- En la esfera: identificar centro, radio y diámetro; calcular superficie y volumen cuando corresponda.

#### Áreas, volúmenes y desarrollos

- Relacionar cada desarrollo plano con las superficies del cuerpo. El dibujo es obligatorio si la pregunta depende del desarrollo.
- El área lateral incluye únicamente caras o superficie lateral; no incluye bases.
- El área total es el área lateral más el área de la base o de las dos bases que correspondan. Distinguir cuerpos con una y dos bases.
- En un volumen, mostrar fórmula, datos, sustitución, cálculo y unidades cúbicas.

#### Problemas y cuerpos compuestos

1. Identificar el cuerpo.
2. Extraer los datos sin inventarlos.
3. Realizar un dibujo cuando ayude.
4. Determinar la magnitud solicitada.
5. Calcular magnitudes auxiliares.
6. Aplicar la fórmula.
7. Interpretar el resultado con unidades.

En cuerpos compuestos, descomponer en sólidos conocidos y combinar áreas o volúmenes parciales. No activar ni usar para fijar reglas un ejercicio cuya base, condición de cuerpo abierto o cerrado, medida o figura no pueda interpretarse inequívocamente.

#### Secuencia del Entrenador · Tema 9

1. Reconocimiento.
2. Elementos.
3. Prismas.
4. Pirámides.
5. Cilindro.
6. Cono.
7. Esfera.
8. Desarrollos planos.
9. Áreas laterales.
10. Áreas totales.
11. Volúmenes.
12. Problemas.
13. Cuerpos compuestos cuando corresponda.

### Tema 10 · Funciones

El tema comprende ejes cartesianos, coordenadas, pares ordenados, tablas, relaciones entre variables, gráficas, interpretación, fórmulas sencillas, crecimiento y decrecimiento cualitativos, máximos y mínimos cualitativos cuando aparezcan, función lineal, función afín, pendiente, ordenada en el origen y construcción de rectas. En 1.º ESO no se utilizan derivadas.

#### Coordenadas y representación

- Identificar eje `X`, eje `Y`, origen y cuadrantes cuando corresponda.
- En un par `(x,y)`, leer siempre primero `x` y después `y`.
- Para representar un punto: leer `x`, desplazarse horizontalmente, leer `y`, desplazarse verticalmente y marcar el punto.
- Para leer un punto desde una gráfica, obtener primero la coordenada `x` y después la `y`.

#### Tablas, fórmulas y gráficas

- Si existe una fórmula: elegir o leer valores de `x`, sustituir, calcular `y`, construir los pares `(x,y)` y representar cuando se solicite.
- En una gráfica, leer y comparar valores; identificar crecimiento, decrecimiento, máximos, mínimos y discontinuidades cuando aparezcan; e interpretar el significado contextual.
- El crecimiento y decrecimiento se estudian exclusivamente mediante lectura visual. No usar derivadas, pendientes locales avanzadas ni cálculo diferencial.
- Cuando el ejercicio pida representar, interpretar, leer o construir una recta, la gráfica correcta forma parte obligatoria de la solución.

#### Función lineal y afín

- Trabajar `y=mx` como función lineal cuando corresponda e interpretar `m` como pendiente o razón de cambio al nivel adecuado.
- Trabajar `y=mx+n` como función afín; identificar `m` como pendiente y `n` como ordenada en el origen.

#### Recta por dos puntos

1. Identificar `(x₁,y₁)` y `(x₂,y₂)`.
2. Calcular `m=(y₂−y₁)/(x₂−x₁)` como fracción vertical.
3. Sustituir uno de los puntos para hallar `n`.
4. Escribir `y=mx+n`.
5. Comprobar que ambos puntos pertenecen a la recta.

Tratar aparte el caso `x₁=x₂`, que corresponde a una recta vertical y no puede escribirse como `y=mx+n`.

#### Rectas paralelas y perpendiculares

- Una paralela conserva la misma pendiente: obtenerla, sustituir el punto, hallar `n`, escribir la ecuación y comprobar el punto.
- Si la pendiente original es finita y no nula, la pendiente perpendicular es `−1/m`: obtenerla, sustituir el punto, hallar `n` y escribir la ecuación.
- Tratar correctamente los casos horizontal y vertical: una recta horizontal es perpendicular a una vertical y viceversa.

#### Ecuación desde una gráfica y pertenencia

- Para obtener la ecuación desde una gráfica: elegir dos puntos claros, leer sus coordenadas, calcular la pendiente, obtener `n`, escribir la ecuación y comprobarla con ambos puntos.
- Para comprobar si `(x₀,y₀)` pertenece a una recta, sustituir `x₀` y verificar si se obtiene `y₀`.
- No usar ejercicios con expresiones ausentes, tablas incoherentes, gráficas vacías o datos insuficientes; no completar sus datos por intuición.

#### Problemas contextualizados

Identificar qué representan `x` e `y` y sus unidades. Interpretar la pendiente, la ordenada en el origen y los valores obtenidos cuando sea adecuado. Comprobar que la recta o el resultado responden al contexto.

#### Secuencia del Entrenador · Tema 10

1. Ejes y coordenadas.
2. Lectura de puntos.
3. Representación de puntos.
4. Tablas.
5. Relaciones entre variables.
6. Fórmulas sencillas.
7. Construcción de gráficas.
8. Interpretación.
9. Crecimiento y decrecimiento cualitativos.
10. Función lineal.
11. Función afín.
12. Pendiente y ordenada en el origen.
13. Recta por dos puntos.
14. Paralelas.
15. Perpendiculares.
16. Ecuación desde una gráfica.
17. Problemas contextualizados.

### Cierre de la política didáctica de 1.º ESO

- Los Retos por temas de los Temas 6–10 deben mantener variedad real y no convertirse en una progresión rígida; las secuencias anteriores pertenecen principalmente al Entrenador.
- En Aprendiz se progresa dentro del nivel de 1.º ESO. En Maestro se usa nivel de examen de 1.º ESO y, especialmente en los Temas 9 y 10, los originales del profesor como referencia. No usar 2.º ESO para elevar la dificultad.
- Se permite calculadora en Pitágoras, áreas con raíces u otros cálculos y la geometría correspondiente. Conservar preferentemente el valor exacto y añadir una aproximación razonable cuando proceda.
- Mantener unidades lineales en longitudes, cuadradas en áreas, cúbicas en volúmenes y la unidad contextual en dinero, tiempo, temperatura, velocidad u otras magnitudes.
- La comprobación es especialmente obligatoria en problemas contextualizados, proporcionalidad, semejanza, Pitágoras, rectas construidas a partir de datos y situaciones que requieren interpretar la solución.
- Los dibujos y gráficas forman parte de la solución cuando son necesarios en geometría, semejanza, áreas, cuerpos, desarrollos o funciones. Deben ser matemáticamente coherentes y nunca decorativos.
- Esta formalización deja cerrados los diez temas oficiales de 1.º ESO. No crea temas adicionales ni autoriza cambios en bancos, ejercicios, exámenes, Aventura, Entrenador, reconocimiento manuscrito u otros cursos.

## Política didáctica formalizada de 2.º ESO · Matemáticas

Esta política se aplica exclusivamente a los nueve temas oficiales de 2.º ESO de Margarita Salas. Las reglas específicas de este apartado prevalecen sobre recomendaciones generales y sobre políticas de otros cursos. No introducir contenidos ni métodos propios de 3.º ESO, 4.º ESO o Bachillerato para aumentar artificialmente la dificultad.

Los nueve temas son, exactamente:

1. Números enteros.
2. Potencias y raíces cuadradas.
3. Fracciones.
4. Proporcionalidad.
5. Expresiones algebraicas.
6. Sistemas de ecuaciones.
7. Figuras planas.
8. Cuerpos geométricos.
9. Funciones.

No existe un tema independiente de Estadística en este catálogo. Tampoco existe un tema independiente de Ecuaciones: las ecuaciones forman parte del Tema 6.

### Principios transversales de 2.º ESO

- La solución debe ayudar al alumno a comprender qué se hace, por qué se hace, cómo se realiza y cuál es el resultado. No limitarse a una respuesta final ni ocultar pasos esenciales.
- Escribir fracciones en formato vertical, potencias con superíndice, raíces con su radical completo y el resto de la notación tal como se escribe en el cuaderno. Mantener paréntesis cuando formen parte de la base de una potencia o eviten ambigüedad.
- Indicar unidades en todo problema contextualizado: lineales en longitudes, cuadradas en áreas, cúbicas en volúmenes y la unidad contextual correspondiente en dinero, tiempo u otras magnitudes.
- Incluir figuras, esquemas, tablas o gráficas cuando sean parte de los datos o resulten necesarios para comprender y verificar la resolución. No sustituir por texto un ejercicio cuyos datos matemáticos dependan de una imagen ilegible.
- La comprobación es obligatoria cuando la pide el enunciado, en ecuaciones y sistemas cuando resulte relevante y en problemas contextualizados cuando permita validar e interpretar la solución. También se recomienda cuando aporte valor didáctico.
- En modo Aprendiz, la progresión se realiza siempre dentro de 2.º ESO. En modo Maestro, aumentar variedad, combinación de pasos y nivel de examen del propio curso; nunca introducir contenidos de cursos posteriores.
- Los Retos por temas deben mezclar estructuras ya dominadas del mismo tema. La secuencia estricta indicada en cada tema se aplica principalmente al Entrenador personal.
- Un cambio meramente numérico no constituye variedad. Alternar estructuras, representaciones, preguntas directas e inversas, problemas, datos superfluos o ausentes cuando proceda y combinaciones de contenidos del mismo nivel.
- Aplicar la regla general de no repetición: no volver a mostrar al mismo alumno un ejercicio hasta agotar el banco disponible. Además, evitar repetir consecutivamente la misma plantilla aunque cambien los números.

### Uso de calculadora en 2.º ESO

La calculadora es una herramienta auxiliar, no el método de resolución.

Se permite especialmente en:

- Pitágoras, áreas, volúmenes y otros cálculos geométricos;
- aproximación decimal de raíces no exactas, pero solo después de acotarlas entre cuadrados perfectos consecutivos cuando ese sea el objetivo;
- operaciones auxiliares complejas de un problema cuando el cálculo no sea el contenido evaluado.

No se utiliza de forma ordinaria para sustituir el trabajo con:

- números enteros, reglas de signos y operaciones combinadas;
- propiedades de potencias y raíces exactas;
- fracciones y simplificación;
- cálculo algebraico;
- ecuaciones y sistemas.

### Tema 1 · Números enteros

Incluye representación en la recta, comparación y orden, opuesto, valor absoluto, suma, resta, producto, cociente, reglas de signos, paréntesis, operaciones combinadas, expresiones verbales y problemas contextualizados.

Métodos obligatorios:

- En una suma con el mismo signo, sumar valores absolutos y conservar el signo.
- En una suma con signos distintos, restar los valores absolutos y conservar el signo del número de mayor valor absoluto.
- Transformar una resta en suma del opuesto cuando ayude a comprender la operación.
- En productos y cocientes, determinar primero el signo y después operar los valores absolutos.
- En operaciones combinadas, respetar: paréntesis; potencias y raíces; productos y cocientes; sumas y restas. Mostrar líneas intermedias suficientes.
- En problemas, traducir la situación, operar, interpretar el signo y responder en contexto.

Secuencia del Entrenador:

1. Representación, comparación y orden.
2. Opuesto y valor absoluto.
3. Sumas.
4. Restas y suma del opuesto.
5. Productos, cocientes y reglas de signos.
6. Paréntesis.
7. Operaciones combinadas.
8. Expresiones verbales y problemas.

### Tema 2 · Potencias y raíces cuadradas

Incluye concepto de potencia, base y exponente, bases negativas, producto y cociente de potencias, potencia de una potencia, operaciones con igual exponente, exponente cero cuando proceda, operaciones combinadas, raíces exactas y no exactas, estimación, aproximación, notación científica cuando exista en el material real y problemas.

Métodos obligatorios:

- Diferenciar expresamente `-a²` de `(-a)²`. Si el signo pertenece a la base, conservar los paréntesis.
- Nombrar la propiedad utilizada antes o durante su aplicación y mantener base y exponente correctamente.
- No inventar propiedades para sumas o restas de potencias.
- En una raíz exacta, identificar el cuadrado perfecto y comprobar elevando el resultado al cuadrado cuando sea útil.
- En una raíz no exacta, localizar primero dos cuadrados perfectos consecutivos: si `a²<N<b²`, concluir `a<√N<b`. Solo después obtener una aproximación decimal con calculadora si se solicita o es útil.
- La calculadora no sustituye la acotación cuando el objetivo es estimar una raíz.

Secuencia del Entrenador:

1. Concepto, base y exponente.
2. Bases negativas y uso de paréntesis.
3. Propiedades de las potencias.
4. Operaciones combinadas con potencias.
5. Raíces cuadradas exactas.
6. Raíces no exactas: acotación entre cuadrados consecutivos.
7. Aproximación decimal razonada.
8. Notación científica, únicamente si está presente en el material real.
9. Problemas y combinaciones del tema.

### Tema 3 · Fracciones

Incluye equivalencia, simplificación, comparación, signos, suma y resta, producto, división, operaciones combinadas, fracción de una cantidad, recuperación del total y problemas de una o varias etapas.

Métodos obligatorios:

- Simplificar mediante divisores comunes y dejar el resultado irreducible cuando corresponda.
- Para sumar o restar, obtener denominador común, preferentemente mediante el mínimo común múltiplo cuando resulte adecuado; transformar los numeradores y operar.
- Para multiplicar, multiplicar numeradores y denominadores y simplificar, antes o después, de forma visible.
- Para dividir, multiplicar por la fracción inversa y simplificar.
- En operaciones combinadas, respetar paréntesis, potencias, productos y divisiones, y finalmente sumas y restas; mostrar fracciones verticales en todo el desarrollo.
- En problemas, distinguir entre calcular una fracción de una cantidad y recuperar el total a partir de una parte.
- Las potencias de base fraccionaria pertenecen a este tema cuando el objetivo principal sea operar con fracciones. Escribir siempre la base entre paréntesis y distinguirlas de las propiedades generales de potencias del Tema 2.

Secuencia del Entrenador:

1. Significado, equivalencia y simplificación.
2. Comparación y orden.
3. Signos en fracciones.
4. Suma y resta.
5. Producto y división.
6. Potencias de fracciones.
7. Operaciones combinadas.
8. Fracción de una cantidad y recuperación del total.
9. Problemas de varias etapas.

### Tema 4 · Proporcionalidad

Incluye razón y proporción, proporcionalidad directa e inversa, relaciones no proporcionales, tablas, regla de tres, porcentajes, aumentos, descuentos, precio inicial, repartos, interés simple y problemas con varias magnitudes.

Método preferente:

1. Identificar las magnitudes y sus unidades.
2. Organizar los datos, preferentemente en una tabla.
3. Decidir y justificar si la relación es directa, inversa o no proporcional.
4. Plantear la proporción, reducción a la unidad o procedimiento adecuado.
5. Calcular.
6. Interpretar y comprobar el resultado en contexto.

En porcentajes, diferenciar cantidad inicial, porcentaje, variación y cantidad final. En problemas inversos, no confundir el porcentaje aplicado con la base inicial buscada.

#### Interés simple · Convención obligatoria de 2.º ESO

Usar exclusivamente:

`I=(C·R·T)/(n·100)`

donde:

- `C` es el capital inicial;
- `R` es el rédito o tipo de interés anual expresado en porcentaje;
- `T` es el tiempo transcurrido;
- `n=1` si `T` está en años, `n=12` si está en meses y `n=365` si está en días;
- `I` es el interés simple producido.

Si se pide el capital final, calcular `C_f=C+I` y distinguirlo expresamente del interés producido. Queda descartada la convención `n=360`. No utilizar interés compuesto ni fórmulas exponenciales de capitalización en 2.º ESO.

Secuencia del Entrenador:

1. Razones y proporciones.
2. Proporcionalidad directa.
3. Proporcionalidad inversa.
4. Identificación de relaciones no proporcionales.
5. Tablas, reducción a la unidad y regla de tres.
6. Porcentajes directos.
7. Aumentos, descuentos y recuperación del precio inicial.
8. Repartos proporcionales.
9. Interés simple.
10. Problemas con varias magnitudes.

### Tema 5 · Expresiones algebraicas

Incluye lenguaje algebraico, monomios, polinomios, coeficiente, parte literal, grado, valor numérico, términos semejantes, suma y resta, productos, propiedad distributiva, extracción de factor común cuando proceda, identidades notables si existen en el material real, simplificación y aplicaciones.

Métodos obligatorios:

- Traducir cada magnitud o relación del lenguaje verbal antes de operar.
- Al sustituir un valor negativo, escribirlo entre paréntesis y respetar la prioridad de operaciones.
- Solo sumar o restar términos semejantes: deben coincidir la parte literal y sus exponentes. Operar los coeficientes y conservar la parte literal.
- En productos, aplicar signos, coeficientes y exponentes de forma separada y ordenada.
- En la distributiva, multiplicar por todos los términos del paréntesis.
- Utilizar identidades notables únicamente cuando formen parte del material real del tema; escribir la identidad y desarrollar sus términos, sin saltar directamente al resultado.
- No introducir factorizaciones o técnicas de cursos posteriores fuera del alcance real del ejercicio.

Secuencia del Entrenador:

1. Lenguaje algebraico.
2. Elementos de monomios y polinomios.
3. Valor numérico, con especial atención a valores negativos.
4. Términos semejantes y reducción.
5. Suma y resta de expresiones.
6. Productos y distributiva.
7. Factor común cuando corresponda.
8. Identidades notables presentes en el material real.
9. Simplificación y problemas algebraicos.

### Tema 6 · Sistemas de ecuaciones

Este tema incluye la progresión completa de ecuaciones y sistemas de 2.º ESO. No crear un tema independiente de Ecuaciones.

#### Ecuaciones de primer grado

- Partir de la ecuación original.
- Simplificar cada miembro, conservar la igualdad y realizar operaciones equivalentes en ambos miembros.
- Agrupar términos, aislar la incógnita y resolver. No usar «pasa al otro lado cambiando de signo» como única explicación.
- Con paréntesis: aplicar distributiva, eliminar paréntesis, reducir, agrupar, aislar, resolver y comprobar.
- Con fracciones: identificar denominadores, calcular el mínimo común múltiplo, multiplicar todos los términos de ambos miembros, eliminar denominadores, reducir, resolver y comprobar.

#### Ecuaciones de segundo grado

- En una ecuación completa, ordenar como `ax²+bx+c=0`, identificar `a`, `b` y `c`, escribir la fórmula, sustituir, calcular el discriminante cuando corresponda y presentar todas las soluciones reales.
- En las incompletas, utilizar el procedimiento directo adecuado —factor común o aislamiento de `x²`— cuando simplifique la comprensión; no forzar siempre la fórmula general.
- Si una identidad notable genera una ecuación cuadrática, desarrollar primero la identidad, reducir a la forma general y después resolver.

#### Sistemas lineales de dos ecuaciones y dos incógnitas

Practicar los tres métodos: sustitución, igualación y reducción. Mostrar el sistema original, elegir y justificar el método, obtener una incógnita, hallar la otra, escribir la solución como par ordenado y comprobarla en ambas ecuaciones cuando sea razonable. Tras dominar los tres métodos, elegir el más conveniente según la estructura del sistema.

#### Problemas

- Con ecuaciones: definir la incógnita, traducir el enunciado, plantear, resolver, interpretar y comprobar.
- Con sistemas: definir dos incógnitas con sus unidades, plantear dos ecuaciones, aplicar un método permitido, resolver, interpretar y comprobar.

Secuencia obligatoria del Entrenador:

1. Ecuaciones lineales sin paréntesis.
2. Ecuaciones con paréntesis.
3. Ecuaciones con fracciones.
4. Ecuaciones de segundo grado completas.
5. Ecuaciones de segundo grado incompletas.
6. Identidades notables que generan una ecuación de segundo grado.
7. Sistemas lineales `2×2` por sustitución, igualación y reducción.
8. Problemas que se resuelven mediante una ecuación.
9. Problemas que se resuelven mediante un sistema.

Esta progresión estricta corresponde principalmente al Entrenador. Los Retos por temas deben ofrecer variedad equilibrada entre las estructuras ya trabajadas y no repetir siempre un mismo modelo.

### Tema 7 · Figuras planas

Incluye sistema sexagesimal, ángulos, triángulos, cuadriláteros, polígonos, perímetros, áreas, teorema de Pitágoras, semejanza y Tales cuando proceda, figuras compuestas, circunferencia, círculo y problemas geométricos.

El sistema sexagesimal pertenece definitivamente a este tema. Incluye grados, minutos y segundos; paso entre forma compleja e incompleja cuando aparezca; suma, resta, multiplicación y división de medidas angulares; y problemas contextualizados. Normalizar resultados respetando `60″=1′` y `60′=1°`.

Quedan excluidos de 2.º ESO el error absoluto y el error relativo: no deben aparecer en ejercicios, soluciones, pistas, Entrenador, Retos ni Examen.

Métodos obligatorios:

- Identificar la figura, los datos, la incógnita y las unidades.
- Escribir la fórmula o teorema antes de sustituir.
- En Pitágoras, comprobar que el triángulo es rectángulo, identificar hipotenusa y catetos, plantear la igualdad, despejar, calcular e interpretar la longitud. Se permite calculadora como apoyo.
- En semejanza o Tales, justificar la correspondencia de lados antes de plantear proporciones.
- En figuras compuestas, descomponer o completar la figura, calcular áreas parciales y combinar con suma o resta de forma razonada.
- Conservar la figura cuando contenga datos imprescindibles. Si no se pueden leer con seguridad, dejar el ejercicio pendiente de revisión visual.

Secuencia del Entrenador:

1. Sistema sexagesimal y operaciones angulares.
2. Ángulos y relaciones entre rectas.
3. Triángulos, cuadriláteros y polígonos.
4. Perímetros y áreas básicas.
5. Teorema de Pitágoras.
6. Semejanza y Tales cuando proceda.
7. Circunferencia y círculo.
8. Figuras compuestas.
9. Problemas geométricos de varias etapas.

### Tema 8 · Cuerpos geométricos

Incluye reconocimiento y elementos de cuerpos, prismas, pirámides, cilindros, conos, esferas, desarrollos planos, área lateral y total, volumen, cuerpos compuestos y problemas de capacidad, coste, material o conversiones.

Métodos obligatorios:

1. Identificar el cuerpo y sus dimensiones.
2. Realizar o conservar un esquema cuando sea necesario.
3. Elegir y escribir la fórmula.
4. Sustituir con unidades coherentes.
5. Calcular, permitiendo calculadora como herramienta auxiliar.
6. Expresar áreas en unidades cuadradas y volúmenes en unidades cúbicas.
7. Interpretar y comprobar el resultado en contexto.

En cuerpos compuestos, descomponerlos, calcular cada parte y sumar o restar según la geometría. En desarrollos planos, relacionar cada cara con la superficie correspondiente. No reconstruir por intuición medidas o figuras ilegibles.

Secuencia del Entrenador:

1. Reconocimiento y elementos.
2. Desarrollos planos.
3. Prismas y cilindros: áreas.
4. Pirámides y conos: áreas.
5. Esfera: superficie.
6. Volúmenes de prismas y cilindros.
7. Volúmenes de pirámides, conos y esferas.
8. Cuerpos compuestos.
9. Problemas de capacidad, coste, material y conversiones.

### Tema 9 · Funciones

Incluye coordenadas, puntos, tablas, gráficas, relación entre variables, fórmulas sencillas, funciones lineales y afines, pendiente, ordenada en el origen, recta por datos o por dos puntos, paralelismo y perpendicularidad cuando estén en el material real, crecimiento y decrecimiento cualitativos, interpretación contextual y parábolas únicamente si existen realmente en el banco de 2.º ESO.

Métodos obligatorios:

- Distinguir variable independiente y dependiente, indicar unidades y relacionar tabla, gráfica y fórmula.
- Para obtener imágenes mediante una fórmula, sustituir ordenadamente y construir la tabla antes de representar cuando sea útil.
- En una gráfica, leer puntos y tendencias respetando la escala y el contexto.
- En `y=mx+n`, identificar e interpretar pendiente `m` y ordenada en el origen `n`.
- Para hallar una recta por dos puntos, calcular la pendiente y después determinar la ordenada en el origen o usar una forma equivalente permitida, comprobando ambos puntos.
- Estudiar crecimiento y decrecimiento exclusivamente mediante lectura cualitativa de la gráfica o variación de los datos. No utilizar derivadas.
- No introducir composición de funciones, función inversa, dominios avanzados con radicales ni otros contenidos de cursos posteriores.
- Conservar las gráficas originales cuando formen parte esencial del ejercicio; dejar pendiente cualquier dato que no pueda leerse fielmente.

Secuencia del Entrenador:

1. Coordenadas y representación de puntos.
2. Relación entre variables y tablas.
3. Obtención de valores a partir de fórmulas sencillas.
4. Construcción y lectura de gráficas.
5. Interpretación contextual.
6. Funciones lineales y afines.
7. Pendiente y ordenada en el origen.
8. Rectas a partir de datos o de dos puntos; paralelas y perpendiculares cuando proceda.
9. Crecimiento y decrecimiento cualitativos, sin derivadas.
10. Parábolas solo si pertenecen al material real de 2.º ESO.
11. Problemas que conectan tabla, fórmula y gráfica.

### Cierre de la política didáctica de 2.º ESO

- Los nueve temas quedan didácticamente definidos y con secuencia propia del Entrenador.
- Las 61 incorporaciones originales validadas para Práctica por temas amplían la variedad, pero no quedan autorizadas automáticamente para Examen ni para otras modalidades.
- Los 14 ejercicios que todavía dependen de una revisión visual permanecen pendientes: no reconstruir fórmulas, figuras, escalas o datos dudosos por intuición. Esta reserva documental no constituye una decisión didáctica pendiente.
- La variedad estructural, la no repetición y la progresión dentro del curso son reglas transversales obligatorias.
- Esta formalización no autoriza modificaciones en bancos, ejercicios, Examen, Aventura, Entrenador, reconocimiento manuscrito, otros cursos ni código de la aplicación.

## Política didáctica formalizada de 3.º ESO · Matemáticas

Esta sección se aplica exclusivamente a `3eso` y a los diez temas actuales de la aplicación. Sus reglas prevalecen sobre las recomendaciones genéricas y sobre cualquier procedimiento heredado de otro curso cuando exista una diferencia de nivel, profundidad o método. Debe distinguirse siempre entre un método matemáticamente válido y un método didácticamente permitido en 3.º ESO: las soluciones usarán el segundo.

Los diez temas son, exactamente:

1. Números reales.
2. Potencias y raíces.
3. Expresiones algebraicas.
4. Ecuaciones y sistemas.
5. Proporcionalidad.
6. Sucesiones.
7. Cuerpos geométricos.
8. Funciones.
9. Estadística.
10. Probabilidad.

No crear temas independientes de Geometría plana, Movimientos o Semejanza. Estadística y Probabilidad son dos temas distintos y deben permanecer separados en la política, en el Entrenador y en la selección de ejercicios.

### Reglas transversales de los Temas 1–10

- Toda resolución debe identificar los datos y la pregunta, elegir un procedimiento permitido, desarrollar las operaciones esenciales, presentar el resultado con notación y unidades correctas e interpretarlo o comprobarlo cuando sea razonable.
- Aplicar las reglas globales del renderizador: fracciones verticales, exponentes y subíndices correctamente compuestos, raíces que cubran toda la expresión, sistemas con llave común, intervalos y símbolos matemáticos reales. No mostrar al alumno sintaxis de programación.
- Conservar fielmente las figuras, tablas y gráficas necesarias. No reconstruir por intuición datos, escalas, medidas o expresiones que no puedan leerse con seguridad.
- La calculadora se permite como apoyo cuando el cálculo sea auxiliar, especialmente en raíces no exactas, notación científica cuando proceda, Pitágoras, geometría, áreas, volúmenes, Estadística y problemas con cálculos auxiliares complejos. No debe sustituir el procedimiento manual que constituya el objetivo del ejercicio.
- `Aprendiz` significa progresión dentro del nivel real de 3.º ESO: comienza por estructuras fundamentales y aumenta gradualmente la complejidad.
- `Maestro` significa nivel real de examen de 3.º ESO, calibrado con los exámenes y materiales del profesor. No introducir contenidos de 4.º ESO para aumentar artificialmente la dificultad.
- Aplicar el principio transversal de variedad estructural, en especial en operaciones combinadas, potencias y raíces, álgebra, ecuaciones, sistemas, proporcionalidad y problemas. Cambiar únicamente números, nombres u objetos decorativos no crea una estructura nueva.
- La variedad debe cambiar de forma significativa la representación, las operaciones, la incógnita, el número o dependencia de los pasos, el método permitido, el razonamiento o las destrezas combinadas. Un alumno muy activo debe seguir encontrando ejercicios estructuralmente diferentes y progresivamente más complejos dentro de 3.º ESO.
- Las secuencias indicadas a continuación rigen especialmente el Entrenador personal. Los Retos deben ofrecer una mezcla variada de contenidos ya trabajados y no repetir rígidamente una secuencia lineal.
- No reutilizar automáticamente bancos, plantillas o métodos de 4.º ESO. Solo pueden seleccionarse ejercicios clasificados y validados para 3.º ESO.

### Tema 1 · Números reales

El tema comprende números racionales e irracionales, clasificación dentro de los conjuntos numéricos trabajados, representación y orden en la recta real, intervalos sencillos, relación entre fracciones y decimales, aproximaciones y errores, operaciones y problemas propios del nivel.

#### Métodos y presentación

- Clasificar cada número justificando la inclusión en el conjunto más específico trabajado y reconocer que un número puede pertenecer a conjuntos anidados.
- Para comparar u ordenar, utilizar el valor exacto cuando sea posible; recurrir a una aproximación decimal o a la recta real solo cuando ayude a la comprensión.
- En la relación entre fracciones y decimales, distinguir decimal exacto, periódico puro y periódico mixto según el material auditado. Obtener la fracción generatriz mediante el procedimiento algebraico trabajado, mostrando la resta que elimina el período y simplificando el resultado.
- En intervalos, traducir correctamente entre desigualdad, notación de intervalo y representación en la recta. Distinguir extremos incluidos y excluidos mediante corchetes y paréntesis.
- En aproximaciones, distinguir truncamiento y redondeo e indicar el orden utilizado.
- Para error absoluto, calcular la diferencia en valor absoluto entre el valor exacto y el aproximado. Para error relativo, dividir el error absoluto entre el valor absoluto del valor exacto y expresarlo en tanto por uno o porcentaje según se pida.
- En operaciones y problemas, conservar las expresiones exactas mientras resulte razonable, respetar la jerarquía y comprobar que la aproximación final tiene sentido.
- No desplazar a este tema ejercicios cuyo objetivo principal sean las propiedades de potencias, las operaciones con radicales o la notación científica; pertenecen al Tema 2.

#### Secuencia del Entrenador · Tema 1

1. Clasificación de números racionales e irracionales.
2. Comparación y orden.
3. Representación en la recta real.
4. Desigualdades e intervalos sencillos.
5. Relación entre fracciones y decimales y fracción generatriz cuando corresponda.
6. Truncamiento y redondeo.
7. Error absoluto y error relativo.
8. Operaciones y problemas de varias etapas.

### Tema 2 · Potencias y raíces

El tema comprende potencias de exponente entero, signos y paréntesis, propiedades, operaciones combinadas, notación científica, raíces y radicales dentro del alcance auditado de 3.º ESO.

#### Métodos y presentación

- Distinguir una base negativa entre paréntesis de un signo exterior a la potencia. Determinar el signo antes de calcular el valor.
- Aplicar las propiedades de las potencias solo cuando coincidan la base o el exponente de la forma necesaria. Mostrar la propiedad utilizada y simplificar exponentes antes de efectuar cálculos innecesarios.
- Interpretar los exponentes cero y negativos con las condiciones trabajadas; expresar un exponente negativo mediante el inverso sin perder los paréntesis de la base.
- En notación científica, escribir un único factor decimal con valor absoluto mayor o igual que 1 y menor que 10, multiplicado por una potencia de 10. En operaciones, operar por separado coeficientes y potencias y normalizar el resultado.
- Relacionar raíces y potencias. En raíces exactas, justificar el resultado; en raíces no exactas, simplificar o aproximar únicamente según lo pedido.
- Para simplificar radicales dentro del alcance auditado, descomponer el radicando, extraer factores que sean potencias exactas, reducir radicales semejantes y realizar las operaciones trabajadas. No usar técnicas avanzadas propias de 4.º ESO.
- La calculadora puede comprobar raíces no exactas o cálculos auxiliares, pero no sustituye la aplicación de propiedades ni la simplificación pedida.
- No introducir logaritmos, procedimientos de radicales propios de 4.º ESO ni interés simple o compuesto. Los dos tipos de interés pertenecen exclusivamente al Tema 6.

#### Secuencia del Entrenador · Tema 2

1. Concepto, base, exponente y signo.
2. Exponentes cero y negativos cuando correspondan.
3. Producto y cociente de potencias.
4. Potencia de una potencia y potencias con igual exponente.
5. Operaciones combinadas con potencias.
6. Notación científica y operaciones.
7. Raíces exactas y no exactas.
8. Extracción e introducción de factores en radicales dentro del nivel.
9. Simplificación y operaciones con radicales auditadas.
10. Problemas y aplicaciones propias del tema.

### Tema 3 · Expresiones algebraicas

El tema comprende lenguaje algebraico, monomios, polinomios, valor numérico, operaciones, identidades notables, división de polinomios, Ruffini, teoremas del resto y del factor, raíces y divisibilidad de polinomios, factorización y fracciones algebraicas dentro del alcance auditado.

#### Operaciones y división

- Traducir el lenguaje verbal definiendo las letras y construyendo cada relación antes de simplificar.
- En valores numéricos, sustituir los valores negativos entre paréntesis y respetar exponentes y jerarquía.
- Solo reducir términos semejantes. En productos y cocientes, operar ordenadamente signos, coeficientes y partes literales.
- En suma, resta y producto de polinomios, alinear o agrupar por grados y conservar todos los términos. En la distributiva, multiplicar por cada término.
- En una división de polinomios, ordenar por grados, completar con coeficientes cero cuando falte algún grado, mostrar cociente y resto y comprobar `dividendo=divisor·cociente+resto` cuando resulte didácticamente útil.
- Usar Ruffini únicamente cuando el divisor tenga la forma adecuada. No aplicarlo mecánicamente si existe un procedimiento más directo.

#### Factorización · orden preferente

Antes de elegir el método, analizar en este orden:

1. Extraer factor común.
2. Reconocer una identidad notable.
3. Buscar raíces y aplicar Ruffini.

- No empezar con Ruffini si puede extraerse factor común o reconocerse directamente una identidad notable.
- En el teorema del resto, relacionar el resto de dividir `P(x)` entre `x−a` con `P(a)`.
- En el teorema del factor, justificar que `x−a` es factor exactamente cuando `P(a)=0`.
- Para hallar raíces y factorizar, comprobar cada raíz candidata, efectuar las divisiones necesarias y escribir la factorización completa dentro del conjunto numérico pedido.
- En divisibilidad, relacionar divisor, resto nulo y teorema del factor.
- En fracciones algebraicas, indicar valores excluidos, factorizar antes de simplificar y cancelar solo factores completos comunes; no cancelar sumandos.

#### Secuencia del Entrenador · Tema 3

1. Lenguaje algebraico y valor numérico.
2. Monomios y términos semejantes.
3. Suma, resta y producto de polinomios.
4. Identidades notables.
5. División de polinomios.
6. Regla de Ruffini en divisores adecuados.
7. Teorema del resto.
8. Teorema del factor, raíces y divisibilidad.
9. Factorización siguiendo el orden preferente.
10. Fracciones algebraicas dentro del alcance auditado.
11. Problemas algebraicos y expresiones combinadas.

### Tema 4 · Ecuaciones y sistemas

El tema comprende ecuaciones de primer y segundo grado, ecuaciones polinómicas reducibles mediante los procedimientos ya trabajados, sistemas lineales `2×2` y problemas. No introducir métodos matriciales ni procedimientos de cursos superiores.

#### Ecuaciones

- En ecuaciones de primer grado: partir de la ecuación original, eliminar paréntesis mediante la distributiva, reducir cada miembro, eliminar denominadores mediante el mínimo común múltiplo cuando existan fracciones, realizar operaciones equivalentes en ambos miembros, aislar la incógnita y comprobar.
- En ecuaciones de segundo grado: ordenar como `ax²+bx+c=0`; usar el método directo en las incompletas y la fórmula general cuando corresponda en las completas; presentar todas las soluciones reales y comprobarlas cuando resulte razonable.
- Si aparecen identidades notables, desarrollarlas o reconocerlas explícitamente antes de reducir la ecuación.
- En ecuaciones bicuadradas o polinómicas del alcance auditado, identificar la estructura, realizar el cambio de variable o la factorización permitida, resolver y recuperar todas las soluciones válidas.

#### Sistemas lineales `2×2`

- Los métodos permitidos son sustitución, igualación y reducción.
- Durante el aprendizaje inicial, practicar los tres métodos separadamente para que el alumno comprenda sus pasos.
- Después de dominarlos, analizar la estructura del sistema y elegir el método más conveniente, justificando brevemente la elección cuando aporte valor didáctico.
- Como orientación, preferir sustitución cuando una incógnita ya esté despejada o sea fácil despejarla; igualación cuando resulte sencillo despejar la misma incógnita en ambas ecuaciones; y reducción cuando los coeficientes permitan eliminar una incógnita directamente o mediante una multiplicación sencilla. Son criterios orientativos, no reglas rígidas.
- Mostrar el sistema original, las transformaciones, la obtención de una incógnita, el cálculo de la otra, la solución como par ordenado y la comprobación en ambas ecuaciones cuando sea razonable.
- El método gráfico puede utilizarse para introducir el significado de la solución, interpretar el número de soluciones o comprobar un resultado. No es el procedimiento algebraico principal cuando el objetivo es practicar sustitución, igualación o reducción.
- Están prohibidos matrices, determinantes, regla de Cramer, teorema de Rouché-Frobenius y Gauss matricial.

#### Problemas

- Definir cada incógnita y su unidad, traducir el enunciado a una ecuación o sistema, resolver mediante un método permitido, interpretar el resultado en contexto y comprobar que satisface todas las condiciones.

#### Secuencia del Entrenador · Tema 4

1. Ecuaciones de primer grado sin fracciones.
2. Ecuaciones con paréntesis.
3. Ecuaciones con fracciones.
4. Ecuaciones de segundo grado incompletas.
5. Ecuaciones de segundo grado completas.
6. Ecuaciones con identidades notables y estructuras polinómicas auditadas.
7. Sistemas `2×2` por sustitución.
8. Sistemas `2×2` por igualación.
9. Sistemas `2×2` por reducción.
10. Elección razonada del método más conveniente.
11. Interpretación y comprobación gráfica cuando corresponda.
12. Problemas de ecuaciones y sistemas.

### Tema 5 · Proporcionalidad

El tema comprende razones y proporciones, proporcionalidad directa e inversa, proporcionalidad compuesta, repartos proporcionales, porcentajes, aumentos y disminuciones, porcentajes encadenados, recuperación de cantidades iniciales, escalas, velocidades, mezclas y problemas contextualizados auditados.

#### Métodos y presentación

- Identificar las magnitudes, sus unidades y la incógnita. Organizar los datos en una tabla cuando ayude.
- Justificar si la relación es directa, inversa, compuesta o no proporcional antes de calcular. No decidir únicamente por una palabra del enunciado.
- En proporcionalidad directa e inversa, usar reducción a la unidad, proporciones o regla de tres de forma razonada y comprobar si el sentido del resultado es coherente.
- En proporcionalidad compuesta, analizar por separado cómo afecta cada magnitud a la incógnita y distinguir los casos todos directos de los casos mixtos.
- En repartos, identificar si son directos o inversos, calcular la constante o suma de pesos correspondiente, obtener cada parte y comprobar que el total se conserva.
- En porcentajes, diferenciar valor inicial, porcentaje de variación y valor final. En variaciones sucesivas, usar factores multiplicativos y no sumar porcentajes automáticamente.
- En problemas inversos, reconstruir la cantidad inicial a partir del factor aplicado; no tratar el valor final como base del mismo porcentaje.
- En escalas, mantener unidades compatibles y distinguir longitud en el plano de longitud real.
- No incluir interés simple ni interés compuesto en este tema: ambos pertenecen al Tema 6, Sucesiones.

#### Secuencia del Entrenador · Tema 5

1. Razón, proporción y constante de proporcionalidad.
2. Proporcionalidad directa.
3. Proporcionalidad inversa.
4. Identificación de relaciones no proporcionales.
5. Proporcionalidad compuesta directa y mixta.
6. Repartos proporcionales directos e inversos.
7. Porcentajes directos.
8. Aumentos, descuentos y variaciones sucesivas.
9. Recuperación de la cantidad inicial.
10. Escalas, velocidades y otros contextos auditados.
11. Problemas de varias etapas.

### Tema 6 · Sucesiones

El tema comprende el concepto de sucesión, términos y posiciones, patrones, término general, recurrencia cuando corresponda, progresiones aritméticas y geométricas, cálculo de términos y datos desconocidos, sumas, intercalación de términos, problemas, convergencia y divergencia a nivel conceptual, suma geométrica infinita convergente e interés simple y compuesto.

#### Concepto, términos y leyes de formación

- Distinguir la posición `n` del valor del término `aₙ`. Identificar el patrón a partir de varios términos y comprobarlo con más de una posición.
- Trabajar el paso entre una descripción verbal, una lista de términos, una ley recurrente y un término general cuando el material lo permita.
- En una recurrencia, indicar los términos iniciales necesarios y aplicar la relación en el orden correcto.

#### Progresiones aritméticas y geométricas

- En una progresión aritmética, identificar la diferencia `d`, usar `aₙ=a₁+(n−1)d` y mostrar el despeje cuando se busque una posición, un término inicial o la diferencia.
- Para la suma de los primeros `n` términos de una progresión aritmética, usar la fórmula trabajada y sustituir cada dato de forma visible.
- En una progresión geométrica, identificar la razón `r`, usar `aₙ=a₁·rⁿ⁻¹` y distinguirla de una diferencia constante.
- Para la suma finita de una progresión geométrica, usar la fórmula adoptada en el curso, cuidando los signos y el caso de la razón.
- En la intercalación de términos, identificar cuántos términos y saltos se introducen, hallar la diferencia o razón y comprobar los extremos.
- En problemas, definir qué representa cada término y traducir la respuesta al contexto.

#### Convergencia, divergencia y límite

- Explicar de forma conceptual e intuitiva qué significa que una sucesión se aproxime a un valor, sea convergente o sea divergente.
- No enseñar procedimientos generales de cálculo de límites, indeterminaciones, comparación de grados, racionalización de límites ni ejercicios de límites procedentes de 4.º ESO.
- El límite solo se utiliza como idea para describir el comportamiento y para justificar la suma de una progresión geométrica convergente.

#### Suma infinita de una progresión geométrica

- Antes de utilizar `S∞=a₁/(1−r)`, calcular o identificar la razón y comprobar explícitamente `|r|<1`.
- Si `|r|≥1`, la progresión no tiene suma infinita finita y no debe aplicarse esa fórmula.

#### Interés simple · Convención obligatoria de 3.º ESO

Usar:

`I=(C₀·R·T)/(n·100)`

donde:

- `C₀` es el capital inicial;
- `R` es el rédito o tipo de interés anual expresado en porcentaje;
- `T` es el tiempo transcurrido;
- `n=1` si `T` está en años, `n=12` si está en meses y `n=365` si está en días;
- `I` es el interés producido.

Si se pide el capital final, calcular `C_F=C₀+I`. Distinguir expresamente interés producido y capital final.

#### Interés compuesto · Convención obligatoria de 3.º ESO

Usar:

`C_F=C₀·(1+R/(100n))ⁿᵗ`

donde:

- `C₀` es el capital inicial;
- `C_F` es el capital final;
- `R` es el rédito anual expresado en porcentaje;
- `t` es el tiempo expresado en años;
- `n` es el número de capitalizaciones por año.

En interés compuesto, identificar la tasa por período `R/(100n)` y el número total de capitalizaciones `nt` antes de sustituir. No confundir el significado de `n` con el factor temporal usado en la fórmula de interés simple.

#### Secuencia del Entrenador · Tema 6

1. Concepto de sucesión, término y posición.
2. Patrones y cálculo de términos.
3. Término general.
4. Recurrencia cuando corresponda.
5. Progresiones aritméticas: términos y datos desconocidos.
6. Suma de los primeros `n` términos de una progresión aritmética.
7. Progresiones geométricas: términos y datos desconocidos.
8. Suma finita de una progresión geométrica.
9. Intercalación de términos cuando corresponda.
10. Problemas con progresiones.
11. Convergencia, divergencia y límite a nivel conceptual.
12. Suma infinita geométrica, comprobando primero `|r|<1`.
13. Interés simple.
14. Interés compuesto.
15. Comparación contextual entre crecimiento lineal y crecimiento compuesto cuando proceda.

### Tema 7 · Cuerpos geométricos

Aunque el catálogo conserva el nombre «Cuerpos geométricos», la progresión didáctica integrada del tema comienza con los prerrequisitos de geometría plana auditados y avanza después a cuerpos, superficies, volúmenes y desarrollos planos. No crear temas nuevos para esas etapas.

#### Semejanza, Tales, Pitágoras y áreas

- En semejanza, identificar figuras correspondientes, justificar la correspondencia de lados y usar una razón de semejanza coherente.
- En proporcionalidad geométrica y Tales, reconocer las rectas paralelas y los segmentos correspondientes antes de plantear proporciones.
- En Pitágoras, comprobar que el triángulo es rectángulo, identificar hipotenusa y catetos, escribir la igualdad, despejar la longitud desconocida y comprobar la coherencia del resultado.
- En áreas, identificar o descomponer la figura, escribir las fórmulas y conservar unidades cuadradas.
- Deben incluirse problemas en los que una longitud necesaria para calcular el área no se proporcione directamente y deba obtenerse antes mediante Pitágoras.

#### Cuerpos, superficies, volúmenes y desarrollos

- Reconocer prismas, pirámides, cilindros, conos, esferas y los demás cuerpos presentes en el material auditado, identificando sus elementos y medidas.
- Para áreas laterales o totales, distinguir cada superficie, calcular sus partes y sumarlas de forma razonada.
- Para volúmenes, escribir la fórmula, sustituir con unidades compatibles y presentar el resultado en unidades cúbicas.
- Cuando una altura, generatriz u otra longitud no sea directa, obtenerla primero mediante el procedimiento geométrico permitido, incluido Pitágoras cuando corresponda.
- En cuerpos compuestos, descomponer el sólido, calcular los volúmenes o superficies parciales y sumar o restar según la configuración.
- En desarrollos planos, relacionar cada cara con el cuerpo, reconocer qué medidas se conservan y conectar el desarrollo con el área total.
- La calculadora puede utilizarse en raíces y cálculos auxiliares, pero la elección y aplicación de la fórmula deben quedar visibles.

#### Secuencia obligatoria del Entrenador · Tema 7

1. Semejanza.
2. Proporcionalidad geométrica y teorema de Tales.
3. Teorema de Pitágoras.
4. Áreas directas y figuras compuestas.
5. Áreas que exigen calcular antes una longitud mediante Pitágoras.
6. Reconocimiento y elementos de cuerpos geométricos.
7. Superficies laterales y totales.
8. Volúmenes.
9. Cuerpos compuestos y problemas contextualizados.
10. Desarrollos planos, conectando caras, superficies y área total.

La progresión esencial se resume como: **Semejanza → proporcionalidad geométrica/Tales → Pitágoras → áreas → volúmenes → desarrollos planos**.

### Tema 8 · Funciones

El tema comprende relaciones entre variables, tablas, gráficas, dominio y recorrido al nivel trabajado, crecimiento y decrecimiento, máximos y mínimos cualitativos, continuidad cualitativa, funciones lineales y afines, pendiente, paralelismo, parábolas e interpretación contextual.

#### Métodos y presentación

- Identificar variable independiente y dependiente, indicar sus unidades y decidir si la relación representada es una función.
- Relacionar enunciado, tabla, fórmula y gráfica; construir valores mediante sustitución ordenada y leer escalas con cuidado.
- Determinar dominio y recorrido mediante la información visible o el contexto al nivel de 3.º ESO. No introducir dominios avanzados con radicales.
- Estudiar crecimiento, decrecimiento, máximos, mínimos y continuidad de forma cualitativa a partir de la gráfica o de los datos. No utilizar derivadas.
- En `y=mx+n`, identificar la pendiente y la ordenada en el origen e interpretar su significado cuando exista contexto.
- Para obtener una recta a partir de dos puntos, calcular la pendiente, determinar la ordenada en el origen o usar una forma equivalente permitida y comprobar los dos puntos.
- En rectas paralelas, conservar la misma pendiente. Trabajar las demás relaciones entre rectas solo dentro del contenido auditado del curso.
- En parábolas, reconocer su forma, apertura, eje, vértice y cortes cuando puedan obtenerse mediante los procedimientos algebraicos y gráficos trabajados en 3.º ESO. No usar cálculo diferencial.
- Conservar las gráficas y tablas originales cuando sean imprescindibles y no inventar datos que no puedan leerse fielmente.
- Están prohibidas las derivadas, la composición de funciones, la función inversa, los dominios radicales avanzados y cualquier contenido heredado automáticamente de 4.º ESO.

#### Secuencia del Entrenador · Tema 8

1. Relaciones entre variables y concepto de función.
2. Coordenadas, tablas y obtención de valores.
3. Construcción y lectura de gráficas.
4. Dominio y recorrido al nivel trabajado.
5. Crecimiento, decrecimiento, máximos y mínimos cualitativos.
6. Continuidad cualitativa.
7. Función lineal y proporcionalidad gráfica.
8. Función afín, pendiente y ordenada en el origen.
9. Rectas a partir de datos o dos puntos y rectas paralelas.
10. Parábolas dentro del nivel auditado.
11. Interpretación contextual conectando enunciado, tabla, fórmula y gráfica.

### Tema 9 · Estadística

Estadística constituye un tema independiente. Comprende población, muestra e individuo; variables estadísticas; recogida y organización de datos; tablas de frecuencias; representaciones gráficas; medidas de centralización y posición; medidas de dispersión e interpretación y comparación de distribuciones dentro del alcance auditado.

#### Métodos y presentación

- Identificar población, muestra, individuo y variable; clasificar la variable según las categorías trabajadas.
- Organizar los datos en una tabla completa con valores o intervalos y las frecuencias necesarias. Comprobar que las frecuencias absolutas suman el número total de datos y que las relativas son coherentes.
- Elegir la representación adecuada —diagrama de barras, sectores, histograma u otra presente en los materiales— y respetar escalas, rótulos y amplitudes. No sustituir un histograma por un diagrama de barras si los datos están agrupados en intervalos.
- Para media, mediana y moda, ordenar u organizar los datos, escribir la operación y distinguir las tres medidas. En datos agrupados, usar el procedimiento específico trabajado.
- Calcular recorrido, desviación media, varianza y desviación típica cuando correspondan, mostrando las diferencias o la tabla auxiliar necesaria; utilizar la calculadora como apoyo sin ocultar la fórmula ni la sustitución.
- Calcular e interpretar cuartiles u otras medidas de posición solo cuando pertenezcan al material auditado.
- Comparar distribuciones usando conjuntamente centralización y dispersión. No concluir solo a partir de una media si la variabilidad es relevante.
- Conservar tablas y gráficos originales. Si faltan datos o la escala no es legible, dejar el ejercicio pendiente en vez de reconstruirlo.

#### Secuencia del Entrenador · Tema 9

1. Población, muestra, individuo y variable.
2. Tipos de variables.
3. Recuento y tablas de frecuencias.
4. Representaciones gráficas y elección del gráfico adecuado.
5. Media, mediana y moda.
6. Cuartiles y posición cuando correspondan.
7. Recorrido.
8. Desviación media, varianza y desviación típica.
9. Interpretación y comparación de distribuciones.
10. Problemas estadísticos con tablas o gráficos.

### Tema 10 · Probabilidad

Probabilidad constituye un tema independiente. Comprende experimentos aleatorios, espacio muestral, sucesos, tipos y operaciones básicas con sucesos, frecuencia experimental, regla de Laplace y experimentos compuestos sencillos, incluidos los casos con y sin reemplazamiento presentes en los materiales auditados.

#### Métodos y presentación

- Distinguir experimento determinista y aleatorio. Escribir el espacio muestral completo cuando sea razonable.
- Definir los sucesos antes de operar y distinguir suceso elemental, compuesto, seguro, imposible y contrario cuando corresponda.
- En unión, intersección y complementario, identificar verbalmente qué resultados se incluyen y usar la notación correcta.
- Aplicar la regla de Laplace solo cuando los resultados elementales sean equiprobables: contar casos favorables y posibles, escribir el cociente y comprobar que la probabilidad pertenece a `[0,1]`.
- Relacionar frecuencia relativa y probabilidad de forma experimental sin confundirlas.
- En experimentos de varias etapas, organizar los resultados mediante lista, tabla o diagrama de árbol cuando ayude; multiplicar probabilidades a lo largo de una rama y sumar ramas incompatibles que formen el suceso pedido.
- Distinguir explícitamente extracciones con reemplazamiento y sin reemplazamiento, actualizando en este último caso el número de elementos y las probabilidades.
- Para «al menos uno», valorar el uso del suceso contrario cuando sea el método más directo y mostrar la equivalencia.
- Conservar tablas y diagramas de árbol originales necesarios. No introducir probabilidad total, Bayes, distribución binomial ni métodos de Bachillerato.

#### Secuencia del Entrenador · Tema 10

1. Experimentos deterministas y aleatorios.
2. Espacio muestral.
3. Tipos de sucesos.
4. Unión, intersección y complementario.
5. Frecuencia relativa y probabilidad experimental.
6. Regla de Laplace.
7. Experimentos compuestos mediante listas, tablas o árboles.
8. Extracciones con reemplazamiento.
9. Extracciones sin reemplazamiento.
10. Suceso contrario y problemas de «al menos uno».
11. Problemas contextualizados de varias etapas dentro del nivel.

### Cierre de la política didáctica de 3.º ESO

- Los diez temas quedan didácticamente definidos y disponen de una secuencia propia del Entrenador.
- No quedan decisiones didácticas pendientes ni contradicciones activas dentro de esta política.
- Estadística y Probabilidad permanecen como temas independientes.
- La progresión geométrica obligatoria queda fijada como Semejanza, proporcionalidad geométrica/Tales, Pitágoras, áreas, volúmenes y desarrollos planos.
- El interés simple y el interés compuesto pertenecen exclusivamente al Tema 6, Sucesiones. No deben aparecer en Potencias y raíces ni en Proporcionalidad.
- Funciones se limita al nivel auditado de 3.º ESO y excluye derivadas, composición, función inversa, dominios radicales avanzados y contenidos heredados de 4.º ESO.
- No se autorizan métodos propios de cursos superiores ni la reutilización automática de bancos de 4.º ESO.
- La variedad estructural, la no repetición, la progresión dentro del curso y la diferencia entre Aprendiz y Maestro son reglas obligatorias.
- Esta formalización no modifica bancos, ejercicios, Examen, Aventura, reconocimiento manuscrito, otros cursos ni código de la aplicación.

## Política didáctica formalizada de 4.º ESO · Matemáticas A

Esta política se aplica exclusivamente a `4eso-a`. Sus reglas específicas prevalecen sobre reglas genéricas, de 3.º ESO, de 4.º ESO B o de Bachillerato. Matemáticas A mantiene un enfoque aplicado, razonado y acorde con el curso: se justifican los pasos relevantes, se conserva la notación matemática correcta, se incluyen unidades y se utilizan figuras o gráficas cuando forman parte del razonamiento. La calculadora es una herramienta auxiliar y solo se usa después de plantear correctamente el procedimiento.

El catálogo cerrado contiene exactamente nueve temas:

1. Números reales.
2. Radicales.
3. Proporcionalidad.
4. Expresiones algebraicas.
5. Ecuaciones e inecuaciones.
6. Sistemas de ecuaciones e inecuaciones.
7. Semejanza y trigonometría.
8. Áreas y cuerpos geométricos.
9. Funciones.

No forman parte de Matemáticas A los temas de Estadística o Probabilidad. No se incorporan procedimientos de Bachillerato. En todos los temas son obligatorias la variedad estructural, la progresión dentro del nivel, la comprobación de la comprensión y la no repetición hasta agotar el banco disponible. Cambiar solo los números no convierte dos ejercicios en estructuras diferentes.

### Tema 1 · Números reales

Incluye conjuntos numéricos, clasificación en el conjunto mínimo, fracción generatriz, orden y representación en la recta real, aproximaciones, error absoluto y relativo, intervalos, semirrectas, entornos, desigualdades, valor absoluto, notación científica, operaciones y problemas contextualizados.

Métodos y presentación obligatorios:

- Clasificar cada número en el conjunto mínimo al que pertenece y justificar la decisión cuando no sea inmediata.
- En fracción generatriz, distinguir decimal exacto, periódico puro y periódico mixto; definir la incógnita, multiplicar por la potencia de diez adecuada, restar, despejar y simplificar.
- En aproximaciones, indicar el orden, distinguir truncamiento y redondeo, conservar la precisión durante el cálculo y redondear solo el resultado final.
- Calcular `E_a=|x-a|` y, cuando proceda, `E_r=E_a/|x|`; expresar porcentualmente solo al final.
- Traducir de desigualdad a intervalo y representación gráfica, y en sentido inverso, respetando extremos abiertos y cerrados.
- En valor absoluto, interpretar la distancia antes de resolver; expresar el resultado como desigualdad, intervalo o unión según corresponda.
- En notación científica, normalizar la mantisa y operar por separado coeficientes y potencias de diez.

#### Secuencia del Entrenador · Tema 1

1. Clasificación y orden de números reales.
2. Fracción generatriz.
3. Aproximaciones y errores.
4. Intervalos, semirrectas y entornos.
5. Valor absoluto.
6. Notación científica y operaciones combinadas.
7. Problemas contextualizados que integren varias destrezas.

### Tema 2 · Radicales

Incluye existencia en los reales, radicales equivalentes, simplificación, extracción e introducción de factores, suma de radicales semejantes, productos, cocientes, potencias, índices, radicales anidados, variables, exponentes negativos y fraccionarios, operaciones combinadas, racionalización y ecuaciones elementales con potencias o raíces.

Métodos y presentación obligatorios:

- Comprobar antes la existencia real del radical cuando el índice sea par.
- Factorizar el radicando y agrupar exponentes según el índice para simplificar o extraer factores.
- Para introducir factores, elevar el factor al índice del radical antes de incorporarlo al radicando.
- Reducir a radicales semejantes antes de sumar o restar; no sumar radicandos de forma incorrecta.
- En productos y cocientes, unificar índices cuando sea necesario y declarar las restricciones del denominador.
- Relacionar `a^(m/n)` con la raíz correspondiente y tratar el exponente negativo mediante el inverso.
- Racionalizar con el radical adecuado en denominadores simples, con la potencia complementaria para índices superiores y con el conjugado en binomios.
- En ecuaciones, aislar la potencia o el radical, elevar al exponente necesario, resolver y comprobar en la ecuación original.

Existe una carencia de banco concreta: no hay actualmente un original autónomo verificado de «introducir factores dentro de un radical». La regla didáctica queda definida, pero esta ausencia se registra únicamente como hueco de banco; no es una decisión pendiente, una contradicción ni una autorización para inventar ejercicios.

#### Secuencia del Entrenador · Tema 2

1. Existencia y equivalencia.
2. Simplificación y extracción de factores.
3. Introducción de factores cuando exista material verificado.
4. Sumas, productos y cocientes.
5. Potencias, índices y exponentes fraccionarios o negativos.
6. Operaciones combinadas.
7. Racionalización simple, de índice superior y mediante conjugado.
8. Ecuaciones elementales con potencias o raíces y comprobación.

### Tema 3 · Proporcionalidad

Incluye proporcionalidad directa, inversa y relaciones no proporcionales; regla de tres; repartos directos e inversos; proporcionalidad compuesta directa-directa, directa-inversa e inversa-inversa; porcentajes, porcentaje inverso, aumentos y disminuciones; interés simple, interés compuesto y problemas combinados.

Métodos y presentación obligatorios:

- Identificar y justificar primero el tipo de relación entre magnitudes.
- En proporcionalidad directa usar razón constante; en inversa, producto constante.
- En repartos, formular la constante de reparto y comprobar que las partes reconstruyen el total.
- En proporcionalidad compuesta, comparar cada magnitud con la incógnita y marcar expresamente si su relación es directa o inversa antes de operar.
- En porcentajes, preferir el factor multiplicativo y distinguir valor inicial, variación y valor final.
- En interés simple usar exactamente `I=(C·R·T)/(n·100)`, donde `C` es el capital inicial, `R` el rédito anual en porcentaje, `T` el tiempo e `n` el número de unidades temporales de ese tipo en un año: `n=1` para años, `n=12` para meses y `n=360` para días. El capital final es `C_f=C+I`.
- En interés compuesto usar `C_F=C_I(1+R/(100·n))^(n·T)`, adaptando la notación a la del enunciado y diferenciando capital inicial, capital final e interés producido.
- No confundir interés simple con compuesto ni reutilizar en 4.º ESO A la convención temporal específica de otro curso.

#### Secuencia del Entrenador · Tema 3

1. Relación directa, inversa o no proporcional.
2. Regla de tres y constante de proporcionalidad.
3. Repartos directos e inversos.
4. Proporcionalidad compuesta en sus tres combinaciones.
5. Porcentajes, porcentaje inverso y variaciones sucesivas.
6. Interés simple con conversión temporal.
7. Interés compuesto.
8. Problemas mixtos y contextualizados.

### Tema 4 · Expresiones algebraicas

Incluye monomios, polinomios, valor numérico, operaciones, identidades notables, división, regla de Ruffini, teorema del resto, raíces de polinomios, factorización, fracciones algebraicas, traducción al lenguaje algebraico y problemas.

Métodos y presentación obligatorios:

- Ordenar los polinomios y completar con coeficientes cero cuando sea necesario.
- Mostrar términos semejantes y respetar signos en sumas, restas y productos.
- Reconocer y justificar las identidades notables antes de aplicarlas.
- En divisiones, indicar dividendo, divisor, cociente y resto y comprobar `D=d·c+r` cuando sea razonable.
- Usar Ruffini solo con divisores lineales adecuados y mostrar la tabla completa.
- En factorización seguir el orden preferente: factor común, identidades notables y búsqueda justificada de raíces con Ruffini.
- No aplicar Ruffini mecánicamente cuando existe una factorización inmediata más adecuada.
- En fracciones algebraicas, indicar restricciones, factorizar, simplificar solo factores y obtener denominador común cuando corresponda.
- En problemas, definir la incógnita y traducir cada relación antes de operar.

#### Secuencia del Entrenador · Tema 4

1. Monomios, polinomios y valor numérico.
2. Operaciones con polinomios.
3. Identidades notables.
4. División y comprobación.
5. Ruffini y teorema del resto.
6. Raíces y factorización con el orden preferente.
7. Fracciones algebraicas.
8. Traducción y problemas algebraicos.

### Tema 5 · Ecuaciones e inecuaciones

Incluye ecuaciones de primer y segundo grado, bicuadradas, reducibles por sustitución, polinómicas, factorizadas, racionales, radicales y problemas; además, inecuaciones de una variable con paréntesis, fracciones, denominadores, estudio de signos y contextualización.

Métodos y presentación obligatorios:

- Mantener equivalencias, eliminar denominadores mediante el mínimo común múltiplo y no perder restricciones.
- En segundo grado, ordenar, identificar coeficientes, calcular el discriminante y presentar las soluciones reales que correspondan.
- En bicuadradas o reducibles, declarar el cambio de variable, resolver la ecuación auxiliar y deshacer el cambio comprobando las soluciones.
- En polinómicas, extraer factor común o reconocer identidades antes de buscar raíces mediante Ruffini.
- En racionales, anotar valores prohibidos antes de eliminar denominadores y comprobar el resultado.
- En radicales: aislar el radical, elevar a la potencia necesaria, resolver, comprobar obligatoriamente en la ecuación original y descartar soluciones extrañas.
- En inecuaciones, recordar que al multiplicar o dividir por un número negativo se invierte el signo.
- Cuando existan factores o denominadores variables, estudiar sus ceros en una tabla de signos; no resolver por analogía con una ecuación.
- Presentar la solución como desigualdad, intervalo o unión de intervalos y representarla en la recta real.

#### Secuencia del Entrenador · Tema 5

1. Ecuaciones de primer grado con paréntesis y fracciones.
2. Ecuaciones de segundo grado.
3. Bicuadradas y reducibles por sustitución.
4. Polinómicas y factorizadas.
5. Racionales con restricciones.
6. Radicales con comprobación obligatoria.
7. Inecuaciones lineales.
8. Inecuaciones polinómicas y racionales mediante signos.
9. Problemas contextualizados.

### Tema 6 · Sistemas de ecuaciones e inecuaciones

Incluye sistemas lineales `2×2`, sistemas no lineales compatibles con el nivel, sustitución, igualación, reducción, interpretación gráfica, problemas, sistemas de inecuaciones de una variable, inecuaciones lineales de dos variables y sistemas de inecuaciones lineales de dos variables.

Métodos y presentación obligatorios:

- Elegir razonadamente entre sustitución, igualación y reducción según la estructura; no imponer siempre el mismo método.
- Mostrar el sistema original, las transformaciones, la solución y una comprobación cuando sea razonable.
- En sistemas no lineales, despejar o sustituir de modo que se reduzca a una ecuación conocida y comprobar todas las parejas obtenidas.
- En problemas, definir las incógnitas con unidades, traducir las condiciones, resolver e interpretar la solución.
- No utilizar matrices, determinantes, Cramer, Gauss ni Rouché-Frobenius como procedimiento de resolución en Matemáticas A.
- En sistemas de inecuaciones de una variable, resolver cada inecuación, expresar o representar cada conjunto y calcular su intersección.
- En una inecuación de dos variables, dibujar la recta frontera, decidir si se incluye (`≤`, `≥`) o se excluye (`<`, `>`), elegir un punto de prueba y sombrear el semiplano correcto. La gráfica es obligatoria.
- En un sistema de inecuaciones de dos variables, representar todas las fronteras y semiplanos y destacar la intersección común. La gráfica es obligatoria.

Los 18 ejercicios generados durante la ampliación controlada de sistemas de inecuaciones son aptos únicamente para Práctica por temas. No se consideran aptos para Examen por defecto.

#### Secuencia del Entrenador · Tema 6

1. Sistemas lineales `2×2` y elección del método.
2. Interpretación gráfica de sistemas lineales.
3. Sistemas no lineales admitidos por el nivel.
4. Problemas contextualizados.
5. Sistemas de inecuaciones de una variable e intersección.
6. Inecuaciones de dos variables con semiplanos.
7. Sistemas de inecuaciones de dos variables y región solución.

### Tema 7 · Semejanza y trigonometría

Incluye figuras y triángulos semejantes, razón de semejanza, criterios, teorema de Tales, Pitágoras, escalas, razones entre longitudes, áreas y volúmenes; ángulos y cuadrantes; seno, coseno y tangente; razones inversas; resolución de triángulos rectángulos y problemas.

Métodos y presentación obligatorios:

- Identificar las figuras o triángulos comparados y escribir correctamente la correspondencia entre lados.
- En semejanza, distinguir razón lineal `k`, razón de áreas `k²` y razón de volúmenes `k³`.
- En Tales, señalar las paralelas y escribir proporciones con lados homólogos.
- En Pitágoras, identificar hipotenusa y catetos, plantear antes de sustituir y comprobar la coherencia de la longitud.
- En trigonometría seguir preferentemente: dibujo, identificación del triángulo, ángulo y lados, elección de la razón, fórmula, sustitución, cálculo e interpretación.
- Usar la calculadora solo después del planteamiento y comprobar que está en grados cuando el ejercicio lo requiera.
- En razones inversas, escribir primero la igualdad trigonométrica y después aplicar la función inversa.
- Mantener unidades y grado de aproximación en el resultado.

#### Secuencia del Entrenador · Tema 7

1. Razón de semejanza y criterios.
2. Tales y escalas.
3. Pitágoras.
4. Razones de longitudes, áreas y volúmenes.
5. Ángulos, cuadrantes y signos.
6. Seno, coseno y tangente.
7. Cálculo de lados y ángulos en triángulos rectángulos.
8. Problemas geométricos y contextualizados.

### Tema 8 · Áreas y cuerpos geométricos

Incluye figuras planas, áreas compuestas y sombreadas; prismas, pirámides, cilindros, conos y esferas; elementos, desarrollos, áreas laterales y totales, volúmenes, cuerpos compuestos, problemas inversos, capacidad, coste, modelización e interpretación contextual.

Métodos y presentación obligatorios:

- Realizar o conservar la figura necesaria, identificar sus medidas y descomponerla en figuras o cuerpos conocidos.
- Escribir cada fórmula antes de sustituir datos y mantener unidades lineales, cuadradas o cúbicas.
- En áreas compuestas o sombreadas, indicar expresamente qué áreas se suman o restan.
- En cuerpos geométricos, distinguir área lateral, área total y volumen; no mezclar magnitudes.
- En cuerpos compuestos, calcular por partes y justificar la suma o resta de volúmenes o superficies.
- En problemas inversos, plantear la fórmula con la incógnita y despejar antes de sustituir.
- Convertir capacidad y volumen con equivalencias justificadas y efectuar conversiones de unidad antes de combinar cantidades.
- Interpretar costes, desperdicios o capacidades en el contexto y redondear solo al final.

El reconocimiento de elementos, rectas y superficies y la clasificación básica de cuerpos se utilizan solo como refuerzo inicial de nivel Aprendiz. No constituyen contenido Maestro y el entrenador debe avanzar hacia cálculo y modelización.

#### Secuencia del Entrenador · Tema 8

1. Refuerzo inicial de elementos y clasificación básica.
2. Áreas de figuras planas.
3. Figuras compuestas y sombreadas.
4. Prismas y pirámides: áreas y volúmenes.
5. Cilindros, conos y esferas.
6. Cuerpos compuestos.
7. Problemas inversos, capacidad y coste.
8. Modelización contextual de nivel Maestro.

### Tema 9 · Funciones

Incluye concepto de función, tablas, gráficas, dominio, recorrido, cortes con los ejes, continuidad cualitativa, crecimiento y decrecimiento, extremos, simetría, periodicidad, tasa de variación media, funciones lineales, afines, cuadráticas, racionales, exponenciales, logarítmicas solo dentro del alcance real de los materiales, composición, función inversa, interpretación, representación y modelización.

Métodos y presentación obligatorios:

- Identificar variables independiente y dependiente y comprobar si la relación define una función.
- Obtener dominio y recorrido desde la expresión o la gráfica, justificando restricciones.
- Leer cortes, intervalos de crecimiento o decrecimiento, extremos, simetría, periodicidad y continuidad cualitativa directamente de la gráfica cuando proceda.
- Calcular la tasa de variación media mediante `[f(b)-f(a)]/(b-a)` e interpretarla en el contexto. No sustituirla por derivadas.
- En funciones afines, identificar pendiente y ordenada en el origen; para una recta por dos puntos, calcular primero la pendiente.
- En cuadráticas, calcular vértice, eje de simetría, cortes y puntos suficientes para representar.
- En racionales, estudiar dominio, asíntotas elementales, cortes y comportamiento sin emplear cálculo diferencial.
- En exponenciales, indicar dominio, recorrido, puntos de referencia y comportamiento; las logarítmicas se trabajan solo cuando están respaldadas por el material real.
- En composición, respetar el orden `f∘g` y comprobar dominios. En inversa, intercambiar variables, despejar y comprobar las composiciones cuando sea razonable.
- No utilizar derivadas ni métodos de Bachillerato en el estudio o representación de funciones.
- Utilizar exclusivamente el banco propio de Matemáticas A; nunca `fourEsoBFunciones` ni recursos de Matemáticas B como sustitución automática.

#### Secuencia del Entrenador · Tema 9

1. Concepto, variables, tablas y gráficas.
2. Dominio, recorrido y cortes.
3. Propiedades cualitativas.
4. Tasa de variación media.
5. Funciones lineales y afines.
6. Funciones cuadráticas.
7. Funciones racionales.
8. Funciones exponenciales y, solo si el material lo respalda, logarítmicas.
9. Composición e inversa.
10. Interpretación, representación y modelización.

### Política común de Entrenador, modalidades y nivel

- Cada tema comienza con diagnóstico o refuerzo de prerrequisitos, progresa entre estructuras distintas y exige comprobación de comprensión antes de aumentar la dificultad.
- Aprendiz consolida el método y los prerrequisitos sin quedarse indefinidamente en reconocimiento elemental.
- Maestro exige razonamiento, integración de destrezas y dificultad real de Matemáticas A. No se construye con ejercicios de Matemáticas B ni de Bachillerato.
- La calculadora se emplea tras el planteamiento matemático; no sustituye fórmulas, tablas de signos, gráficas, justificaciones ni interpretación.
- Las figuras, tablas y gráficas necesarias deben conservarse fielmente. No reconstruir datos dudosos ni omitir un recurso imprescindible.
- La disponibilidad se decide por modalidad: `practiceEligible`, Retos, Aventuras y `examEligible` son propiedades independientes. La incorporación a Práctica por temas no habilita automáticamente un ejercicio para Examen.
- En ESO no existe Examen por bloques. En esta política solo se consideran Práctica por temas, Retos, Aventuras y Examen.
- Los ejercicios aptos para Examen deben corresponder al alcance, dificultad y estilo real de Matemáticas A.

### Cierre de la política de 4.º ESO · Matemáticas A

- Los nueve temas y sus nueve secuencias del Entrenador quedan completamente definidos.
- No quedan decisiones didácticas pendientes ni contradicciones activas.
- La convención temporal de interés simple de este curso es `n=360` para días.
- Todas las categorías de inecuaciones quedan formalizadas; las de dos variables y sus sistemas exigen representación gráfica.
- Funciones incluye composición, inversa, tasa de variación media, racionales y exponenciales, sin derivadas y con banco propio de Matemáticas A.
- El contenido geométrico elemental queda limitado al refuerzo inicial de Aprendiz.
- La ausencia de un original autónomo verificado sobre introducción de factores en radicales es exclusivamente un hueco de banco.
- Esta formalización no modifica bancos, ejercicios, generadores, Examen, Aventura, reconocimiento manuscrito, otros cursos ni código de la aplicación.

## Política didáctica formalizada de 4.º ESO · Matemáticas B

Esta sección se aplica exclusivamente a 4.º ESO Matemáticas B. Sus reglas prevalecen sobre las reglas genéricas, las de Matemáticas A, las de cursos inferiores y las de Bachillerato cuando exista una diferencia de nivel, contenido o procedimiento.

El catálogo cerrado contiene exactamente catorce temas: Números reales; Radicales y logaritmos; Expresiones algebraicas; Ecuaciones y sistemas de ecuaciones; Inecuaciones y sistemas de inecuaciones; Proporcionalidad; Semejanza; Trigonometría; Geometría analítica; Funciones; Límite de funciones; Derivadas; Límite de sucesiones; y Combinatoria. No añadir Estadística ni Probabilidad.

### Reglas transversales de los Temas 1–14

- Adaptar toda resolución al nivel real de 4.º ESO B, justificar los pasos esenciales, conservar restricciones y unidades y utilizar figuras o gráficas cuando sean necesarias.
- No introducir procedimientos de Bachillerato no autorizados. Aprendiz progresa dentro de Matemáticas B; Maestro alcanza nivel real de examen de Matemáticas B mediante exámenes B, exámenes del grupo C y relaciones exigentes del propio curso. No usar Bachillerato para elevar artificialmente la dificultad.
- Aplicar variedad estructural, no repetición mecánica, progresión y comprensión: cambiar solo los números no crea variedad. Variar estructura, representación, dato desconocido, procedimiento, combinación de destrezas y autonomía.
- Mantener bancos propios de Matemáticas B. No recuperar una dependencia ordinaria de bancos completos de Matemáticas A.
- Mantener separados Semejanza y Trigonometría aunque compartan herramientas geométricas.
- Los exámenes rotulados «4.º ESO C» pertenecen a Matemáticas B: conservar `grupo=C` y `materia=Matemáticas B`; pueden servir como referencia Maestro.
- En ESO no existe Examen por bloques. La idoneidad para Práctica por temas, Retos, Aventuras y Examen se decide de manera independiente.
- Las secuencias siguientes corresponden al Entrenador. Los Retos y Aventuras deben cubrir el tema con variedad y no repetir rígidamente esa secuencia.

### Tema 1 · Números reales

Comprende clasificación y conjuntos numéricos, fracción generatriz, recta real, intervalos, valor absoluto, aproximaciones, error absoluto y relativo, notación científica, operaciones y problemas. Mantener una formalización mayor que en Matemáticas A.

En clasificación, justificar el conjunto más pequeño al que pertenece cada número. En fracción generatriz, distinguir decimal exacto, periódico puro y periódico mixto y mostrar el procedimiento algebraico. En intervalos y valor absoluto, relacionar desigualdad, representación en la recta y notación de intervalo. En errores, escribir el valor exacto y el aproximado antes de calcular; el error relativo se presenta como cociente y, si procede, porcentaje.

#### Secuencia del Entrenador · Tema 1

1. Clasificación y conjuntos numéricos.
2. Fracción generatriz.
3. Recta real, desigualdades e intervalos.
4. Valor absoluto.
5. Aproximaciones.
6. Error absoluto y relativo.
7. Notación científica y operaciones.
8. Operaciones combinadas y problemas.

### Tema 2 · Radicales y logaritmos

En radicales trabajar potencias fraccionarias, radicales equivalentes, simplificación, extracción e introducción de factores cuando corresponda, operaciones, distintos índices, raíces anidadas y racionalización simple, con índice superior o mediante conjugado. Conservar siempre las restricciones.

En logaritmos trabajar definición, propiedades, transformaciones, cambio de base cuando corresponda, simplificación, restricciones y ecuaciones respaldadas por los materiales. No aplicar propiedades sin verificar que los argumentos sean positivos ni aceptar soluciones que incumplan el dominio.

#### Secuencia del Entrenador · Tema 2

1. Potencias fraccionarias y equivalencia de radicales.
2. Simplificación, extracción e introducción de factores.
3. Operaciones con radicales del mismo y de distinto índice.
4. Raíces anidadas.
5. Racionalización simple y con índice superior.
6. Racionalización mediante conjugado.
7. Definición y propiedades de logaritmos.
8. Transformaciones, cambio de base y restricciones.
9. Ecuaciones logarítmicas presentes en los materiales.

### Tema 3 · Expresiones algebraicas

Comprende polinomios, operaciones, identidades notables, división, Ruffini, teoremas del resto y del factor, raíces, factorización, fracciones algebraicas, simplificación y problemas.

Para factorizar, aplicar preferentemente: 1) factor común; 2) identidades notables; 3) búsqueda razonada de raíces; 4) Ruffini. No usar Ruffini mecánicamente cuando exista un procedimiento más directo. En fracciones algebraicas, indicar las restricciones antes de simplificar y conservarlas en el resultado.

#### Secuencia del Entrenador · Tema 3

1. Polinomios y operaciones.
2. Identidades notables.
3. División de polinomios.
4. Ruffini.
5. Teoremas del resto y del factor.
6. Raíces y factorización con el orden preferente.
7. Fracciones algebraicas y restricciones.
8. Simplificación, operaciones y problemas.

### Tema 4 · Ecuaciones y sistemas de ecuaciones

Comprende ecuaciones de segundo grado, bicuadradas, polinómicas, racionales, radicales, exponenciales, logarítmicas y reducibles; sistemas lineales y no lineales; y problemas.

En ecuaciones racionales, radicales y logarítmicas, establecer restricciones y comprobar las soluciones. En exponenciales, variar entre misma base, transformación a base común, sustitución, exponentes en ambos miembros y expresiones combinadas. En logarítmicas, aplicar propiedades, dominio, transformación, resolución y comprobación.

Para sistemas usar sustitución, igualación o reducción según su estructura; incluir sistemas no lineales cuando correspondan. No utilizar matrices, determinantes, Cramer ni Rouché-Frobenius.

#### Secuencia del Entrenador · Tema 4

1. Ecuaciones de segundo grado y reducibles.
2. Bicuadradas y polinómicas.
3. Ecuaciones racionales con restricciones.
4. Ecuaciones radicales y comprobación.
5. Ecuaciones exponenciales variadas.
6. Ecuaciones logarítmicas con dominio.
7. Sistemas lineales y elección del método.
8. Sistemas no lineales.
9. Problemas que generan ecuaciones o sistemas.

### Tema 5 · Inecuaciones y sistemas de inecuaciones

Comprende inecuaciones de primer y segundo grado, polinómicas, racionales, productos, cocientes y tablas de signos; sistemas, intervalos, representación, dos variables e interpretación gráfica.

Con productos, cocientes y polinomios, localizar puntos críticos, construir la tabla de signos y expresar la solución en desigualdad, intervalo y recta cuando corresponda. En dos variables, representar las rectas frontera, decidir si se incluyen y determinar gráficamente la región solución.

#### Secuencia del Entrenador · Tema 5

1. Inecuaciones de primer grado e intervalos.
2. Inecuaciones de segundo grado.
3. Productos y polinomios mediante tabla de signos.
4. Cocientes e inecuaciones racionales con restricciones.
5. Sistemas de una variable.
6. Inecuaciones de dos variables.
7. Sistemas de dos variables e interpretación gráfica.

### Tema 6 · Proporcionalidad

Comprende proporcionalidad directa e inversa, repartos, proporcionalidad compuesta, porcentajes, variaciones sucesivas, interés simple, interés compuesto y problemas mixtos.

Para el interés simple utilizar exclusivamente `I=C·r·t/(n·100)`, con `n=1` si el tiempo está en años, `n=12` si está en meses y `n=360` si está en días. Distinguir interés producido y capital final. Para el interés compuesto mantener la fórmula y la notación recuperadas de los materiales de 4.º ESO B, sin heredar automáticamente convenciones de otros cursos.

#### Secuencia del Entrenador · Tema 6

1. Magnitudes directa e inversamente proporcionales.
2. Repartos directos e inversos.
3. Proporcionalidad compuesta.
4. Porcentajes.
5. Variaciones porcentuales sucesivas.
6. Interés simple con la convención temporal del curso.
7. Interés compuesto según los materiales de 4.º ESO B.
8. Problemas mixtos e interpretación.

### Tema 7 · Semejanza

Este tema prepara Trigonometría mediante ángulos y sus operaciones, clasificación de triángulos, Tales, proporcionalidad geométrica, triángulos semejantes, escalas, Pitágoras, teoremas del cateto y de la altura y problemas integradores. No convertirlo en geometría avanzada artificial.

Las figuras deben conservar datos y correspondencias. Identificar antes los lados homólogos, la razón de semejanza o el teorema aplicable; justificar después la proporción o relación utilizada.

#### Secuencia del Entrenador · Tema 7

1. Ángulos, operaciones y clasificación de triángulos.
2. Proporcionalidad geométrica y teorema de Tales.
3. Criterios y razón de semejanza.
4. Triángulos semejantes y lados desconocidos.
5. Escalas.
6. Teorema de Pitágoras.
7. Teoremas del cateto y de la altura.
8. Problemas integradores como preparación de Trigonometría.

### Tema 8 · Trigonometría

Comprende grados, radianes y conversión; razones trigonométricas, cuadrantes, signos y reducción; relaciones entre seno, coseno, tangente, secante, cosecante y cotangente; identidades, simplificaciones y ecuaciones trigonométricas; teoremas del seno y del coseno; área y resolución de triángulos; y problemas.

No reducir el tema a ecuaciones elementales del tipo `sen x=a`, `cos x=b` o `tg x=c`. Variar identidades, simplificaciones, ecuaciones, cuadrantes, triángulos, datos desconocidos y problemas. En una identidad, transformar justificadamente uno de los miembros hasta obtener el otro; no comprobarla solo con un valor numérico.

#### Secuencia del Entrenador · Tema 8

1. Grados, radianes y conversiones.
2. Razones trigonométricas en triángulos rectángulos.
3. Cuadrantes, signos y reducción.
4. Relaciones entre razones e identidades básicas.
5. Simplificación y demostración de identidades.
6. Ecuaciones trigonométricas variadas.
7. Teoremas del seno y del coseno.
8. Área y resolución de triángulos.
9. Problemas contextualizados.

### Tema 9 · Geometría analítica

Comprende puntos, vectores, módulo, distancia, punto medio, pendiente, ecuaciones de la recta, paralelismo, perpendicularidad, posiciones relativas, distancias y problemas.

Representar un vector mediante sus componentes y justificar módulo y pendiente. Elegir la ecuación de la recta adecuada a los datos, pasar entre formas cuando sea necesario y comprobar la pertenencia de puntos. Para paralelismo y perpendicularidad, explicitar la relación entre pendientes o vectores directores.

#### Secuencia del Entrenador · Tema 9

1. Puntos, coordenadas y vectores.
2. Componentes y módulo.
3. Distancia y punto medio.
4. Pendiente y vector director.
5. Ecuaciones de la recta.
6. Paralelismo y perpendicularidad.
7. Posiciones relativas.
8. Distancias y problemas integradores.

### Tema 10 · Funciones

Comprende dominio, recorrido, continuidad, cortes, crecimiento, extremos, simetría, periodicidad, funciones afines, cuadráticas, racionales, exponenciales, logarítmicas y a trozos; composición, inversa, interpretación, representación y modelización.

Aunque Derivadas sea el Tema 12, no resolver automáticamente los ejercicios de este tema mediante derivadas. Utilizar tablas, gráficas, propiedades algebraicas y procedimientos propios del Tema 10.

#### Secuencia del Entrenador · Tema 10

1. Concepto, dominio, recorrido y cortes.
2. Continuidad y propiedades cualitativas.
3. Crecimiento, extremos, simetría y periodicidad desde expresiones o gráficas.
4. Funciones afines y cuadráticas.
5. Funciones racionales.
6. Funciones exponenciales y logarítmicas.
7. Funciones a trozos.
8. Composición e inversa.
9. Interpretación, representación y modelización sin derivadas.

### Tema 11 · Límite de funciones

Comprende interpretación gráfica, límites laterales y existencia; sustitución directa; límites finitos e infinitos; indeterminaciones trabajadas; `0/0` mediante factorización o racionalización; cocientes de polinomios y comparación de grados; funciones a trozos; continuidad; y discontinuidades evitables, de salto e infinitas o asintóticas.

Quedan prohibidos en 4.º ESO B tanto la regla de L’Hôpital como el límite notable `lim(x→0) sen(x)/x=1`. No usarlos en soluciones, pistas, Entrenador, ejercicios generados, Retos ni Examen.

#### Secuencia del Entrenador · Tema 11

1. Interpretación gráfica y límites laterales.
2. Existencia y sustitución directa.
3. Límites finitos e infinitos.
4. Cocientes de polinomios y comparación de grados.
5. Indeterminación `0/0` mediante factorización.
6. Indeterminación `0/0` mediante racionalización.
7. Funciones a trozos.
8. Continuidad y clasificación de discontinuidades.

### Tema 12 · Derivadas

Comprende definición mediante límite, derivada en un punto, derivadas laterales, interpretación geométrica, continuidad y derivabilidad, rectas tangente y normal, reglas de suma, resta, producto y cociente, regla de la cadena, derivadas de funciones exponenciales `eˣ` y logarítmicas `ln x`, derivadas sucesivas, crecimiento y decrecimiento, máximos y mínimos, parámetros, funciones a trozos y optimización.

La optimización pertenece a Maestro y puede utilizar geometría, áreas, perímetros, cilindros, costes, beneficios y otros contextos auditados. Toda solución de optimización debe mostrar: variables; relaciones; función objetivo; reducción a una variable; dominio contextual; derivada; candidatos; justificación; interpretación y unidades. «Derivar e igualar a cero» no constituye una explicación suficiente.

#### Secuencia del Entrenador · Tema 12

1. Definición por límite, derivada en un punto e interpretación geométrica.
2. Derivadas laterales, continuidad y derivabilidad.
3. Funciones elementales.
4. Suma, resta, producto y cociente.
5. Composición y regla de la cadena.
6. Combinación de reglas, `eˣ`, `ln x` y derivadas sucesivas.
7. Rectas tangente y normal.
8. Crecimiento, decrecimiento y extremos.
9. Parámetros y funciones a trozos.
10. Optimización en Maestro.

### Tema 13 · Límite de sucesiones

Este es el único tema relacionado con sucesiones en 4.º ESO B; no existe un tema general denominado «Sucesiones». Formalizar únicamente el contenido real auditado: definición cuando sea necesaria, término general, recurrencia, progresiones cuando aparezcan, monotonía, acotación, convergencia, cálculo de límites, expresiones racionales, indeterminaciones trabajadas, conjugado, expresiones exponenciales y los demás procedimientos de los materiales.

No heredar automáticamente interés simple, interés compuesto, aplicaciones financieras, suma infinita geométrica ni otras reglas del Tema 6 de 3.º ESO. Los ejercicios formales con entornos `E(L,ε)` son exclusivamente ampliación y no aparecen en Aprendiz, Maestro, Retos normales, Aventura ni Examen.

#### Secuencia del Entrenador · Tema 13

1. Concepto, notación, término general y recurrencia cuando sean necesarios.
2. Progresiones presentes en los materiales.
3. Monotonía y acotación.
4. Convergencia e interpretación del límite.
5. Límites de expresiones racionales.
6. Indeterminaciones trabajadas y comparación de órdenes.
7. Conjugado.
8. Expresiones exponenciales.
9. Entornos `E(L,ε)` solo en ampliación separada.

### Tema 14 · Combinatoria

Comprende regla del producto, factorial, variaciones, permutaciones y combinaciones, con y sin repetición, números combinatorios, binomio de Newton y problemas con restricciones.

Antes de elegir una fórmula, decidir si importa el orden, si se usan todos los elementos y si se permite repetición. No indicar siempre en el enunciado el modelo que debe aplicarse. Mantener el banco especializado de 41 ejercicios; no sustituirlo por plantillas genéricas de menor riqueza.

#### Secuencia del Entrenador · Tema 14

1. Regla del producto y diagramas de conteo cuando ayuden.
2. Factorial.
3. Decisión previa: orden, totalidad y repetición.
4. Variaciones sin y con repetición.
5. Permutaciones sin y con repetición.
6. Combinaciones sin y con repetición.
7. Números combinatorios.
8. Binomio de Newton.
9. Problemas con restricciones y elección autónoma del modelo.

### Cierre de la política de 4.º ESO · Matemáticas B

- Los catorce temas y sus catorce secuencias del Entrenador quedan completamente definidos.
- No quedan decisiones didácticas pendientes ni contradicciones activas.
- Semejanza y Trigonometría mantienen pools diferenciados.
- Optimización pertenece a Maestro y las derivadas incluyen producto, cociente, cadena, `eˣ` y `ln x`.
- L’Hôpital y el límite notable `lim(x→0) sen(x)/x=1` quedan prohibidos en este curso.
- El Tema 13 es «Límite de sucesiones», no un tema general de Sucesiones; los entornos `E(L,ε)` quedan solo como ampliación.
- Los exámenes del grupo C se reconocen como Matemáticas B y el banco especializado de Combinatoria conserva sus 41 ejercicios.
- Matemáticas B utiliza bancos propios, sin dependencia ordinaria de Matemáticas A y sin contenidos de Bachillerato.
- Esta formalización no modifica bancos, ejercicios, generadores, Entrenador, Examen, Aventura, reconocimiento manuscrito, otros cursos ni código de la aplicación.

## Política didáctica formalizada de 1.º de Bachillerato · Matemáticas I

Estas reglas distinguen entre un método matemáticamente válido y el método didácticamente adecuado para 1.º de Bachillerato. En Matemáticas I se aplicará el segundo criterio. No introducir procedimientos propios de cursos posteriores aunque permitan obtener el mismo resultado.

Toda solución de este curso debe, cuando corresponda:

1. Partir del enunciado real, sin modificarlo.
2. Identificar los datos y qué se pide.
3. Elegir un procedimiento permitido para el curso.
4. Mostrar las operaciones necesarias sin ocultar pasos esenciales.
5. Justificar las transformaciones matemáticamente importantes.
6. Utilizar notación matemática convencional y correctamente renderizada.
7. Destacar claramente el resultado.
8. Comprobarlo cuando resulte didácticamente apropiado.

No adaptar los cálculos para hacerlos coincidir artificialmente con una opción. Las reglas específicas de curso prevalecen sobre cualquier recomendación general que permita un método posterior.

### Renderizado matemático obligatorio

La representación interna puede usar marcadores técnicos, pero el alumno no debe ver sintaxis de programación cuando exista una notación matemática convencional. Esta obligación se aplica a enunciados, teoría, ejemplos, soluciones, pistas, correcciones, «Cómo se resuelve» y a cualquier futura confirmación de una respuesta reconocida desde la pizarra.

- **Fracciones:** mostrarlas verticalmente, con numerador sobre la barra y denominador debajo. No usar `a/b` como presentación visual habitual. Aplicarlo también a cocientes en límites, derivadas, probabilidades, razones trigonométricas, fórmulas, matrices y resultados.
- **Potencias:** mostrar exponentes como superíndices reales. El alumno no debe ver `x^2`, `a^n` ni `e^x`.
- **Subíndices:** mostrar índices como subíndices reales. El alumno no debe ver `x_1`, `a_n` ni `log_a`.
- **Logaritmos:** componer la base como subíndice y los exponentes como superíndices. Usar el símbolo real `⇔` para una equivalencia.
- **Raíces:** el signo radical debe cubrir toda la expresión. No mostrar `sqrt(...)`.
- **Límites:** colocar la condición completa debajo de `lim`. En los laterales, `x→a⁻` o `x→a⁺` debe aparecer íntegramente debajo, con el signo lateral como superíndice de `a`. En infinito, usar `x→+∞` o `x→−∞`; no mostrar `->`, `inf` ni `infinity`.
- **Derivadas:** componer correctamente `f′(x)`, `f″(x)` y órdenes superiores. La notación de Leibniz debe mostrarse como fracción vertical.
- **Integrales:** usar `∫`; en las definidas, situar el límite inferior debajo y el superior encima. Mantener correctamente compuesto el diferencial `dx`.
- **Sistemas:** usar una llave común y ecuaciones alineadas. No mostrar como igualdades independientes lo que constituye un sistema.
- **Matrices:** mostrar filas y columnas alineadas entre paréntesis o corchetes matemáticos. No mostrar estructuras como `[[1,2],[3,4]]`.
- **Determinantes:** reservar las barras verticales para determinantes; no confundirlos visualmente con matrices.
- **Vectores:** usar la notación vectorial establecida, incluida la flecha cuando corresponda.
- **Valor absoluto:** mostrar `|x|`, nunca `abs(x)`.
- **Trigonometría:** usar de forma coherente la notación adoptada para el curso y componer las potencias como superíndices, por ejemplo `sen²(x)`; no mostrar `sen(x)^2`.
- **Probabilidad:** usar `P(A)`, `P(A∩B)`, `P(A∪B)` y `P(A|B)`, junto con la notación de complementario adoptada. Usar `∩` y `∪` como símbolos matemáticos.
- **Multiplicación:** evitar `*`. Usar `·` o multiplicación implícita: `2·3`, `2x`, `a(b+c)`.
- **Relaciones lógicas:** distinguir `=` —igualdad—, `⇔` —equivalencia—, `⇒` —implicación— y `≈` —aproximación—.
- **Decimales:** usar preferentemente coma decimal en la visualización educativa. La representación interna puede normalizar punto y coma.

Antes de incorporar una expresión, comprobar visualmente que el componente de destino ha transformado la sintaxis interna y que no quedan visibles `/`, `^`, `_`, `sqrt`, `->`, `*` o matrices lineales cuando cumplen una función estructural matemática.

### Conjuntos, dominios e intervalos

Para dominios, recorridos, conjuntos solución, crecimiento, decrecimiento, positividad, negatividad y conjuntos análogos, usar cuando corresponda la estructura empleada en clase:

`D={∀ x∈ℝ | condición}=intervalo`.

Para recorridos, usar normalmente `y`, por ejemplo `Rec(f)={∀ y∈ℝ | condición}=intervalo`. Cuando existan varios intervalos, escribir la condición y después la unión equivalente. Incluir, cuando sea didácticamente importante:

- nombre del conjunto;
- llaves;
- cuantificador `∀`;
- variable y pertenencia a `ℝ`;
- barra vertical y condición;
- intervalo o unión de intervalos equivalente.

Usar correctamente `∀`, `∈`, `ℝ`, `|`, `∪`, `∩`, `<`, `>`, `≤`, `≥`, `+∞`, `−∞`, paréntesis y corchetes. `+∞` y `−∞` nunca llevan corchete. No sustituir esta presentación únicamente por una frase ni mostrar solo el intervalo cuando sea importante hacer visible también la condición.

### Números reales

#### Clasificación

Simplificar primero cuando sea necesario y justificar después mediante la inclusión `ℕ⊂ℤ⊂ℚ⊂ℝ`. No limitarse a afirmar «es racional» o «es real» sin justificar su posición en los conjuntos numéricos.

#### Valor absoluto

Resolver primero la expresión interior y aplicar después el valor absoluto. Relacionarlo con la distancia a cero cuando resulte didácticamente útil.

#### Intervalos

- Desigualdad estricta: extremo abierto.
- Desigualdad no estricta: extremo cerrado.
- Infinito: extremo siempre abierto.

Mostrar la condición conjuntista y el intervalo equivalente cuando tenga valor didáctico.

#### Radicales

Descomponer el radicando, extraer todos los cuadrados perfectos y simplificar. Mostrar expresamente la cadena `descomposición → extracción → simplificación`.

#### Racionalización

Contemplar tanto denominadores con un solo radical como denominadores binomiales que requieran conjugado. Mostrar:

1. Expresión original.
2. Factor racionalizador.
3. Producto completo.
4. Simplificación.
5. Resultado racionalizado.

#### Potencias

Aplicar correctamente producto, cociente, potencia de una potencia, exponentes negativos y exponentes racionales cuando correspondan. Mostrar la propiedad utilizada cuando tenga valor didáctico y componer siempre los exponentes como superíndices visibles.

#### Logaritmos inmediatos

Usar preferentemente la equivalencia `log_a(b)=c ⇔ a^c=b`, renderizando `a` como subíndice del logaritmo y `c` como exponente. No mostrar `_` ni `^` al alumno.

#### Notación científica

El resultado `a·10^n` debe cumplir `1≤|a|<10`. Mostrar `n` como superíndice y justificar el desplazamiento de la coma.

### Números complejos

#### Forma binómica

Identificar `Re(z)` e `Im(z)` cuando corresponda y presentar el resultado en forma `a+bi`.

#### Suma y resta

Separar explícitamente la parte real y la parte imaginaria antes de reducir a forma binómica.

#### Producto

Aplicar la propiedad distributiva, mostrar `i²=−1` cuando intervenga y reducir el resultado a forma binómica.

#### Conjugado y módulo

- Si `z=a+bi`, escribir su conjugado como `z̄=a−bi`.
- Calcular el módulo mediante `|z|=√(a²+b²)` y mostrar la sustitución.

#### Potencias de la unidad imaginaria

El procedimiento es obligatorio:

1. Mostrar el ciclo `i⁰=1`, `i¹=i`, `i²=−1`, `i³=−i`, `i⁴=1` y explicar que se repite cada cuatro potencias.
2. Descomponer el exponente mediante `n=4q+r`.
3. Mostrar el múltiplo de cuatro, el cociente y el resto.
4. Escribir `iⁿ=(i⁴)^q·iʳ`.
5. Sustituir la potencia correspondiente al resto y simplificar.

No pasar directamente del exponente al resultado.

#### Ecuaciones con soluciones complejas

Usar despeje directo si la ecuación lo permite inmediatamente. Si es una cuadrática general, aplicar la fórmula de segundo grado y presentar todas las soluciones.

#### Forma polar, Moivre y raíces

No inventar ejercicios para rellenar el banco. Mantener estas categorías disponibles para una futura política cuando existan ejercicios reales clasificados y reglas aprobadas.

### Ecuaciones, sistemas e inecuaciones

#### Ecuaciones de primer grado

Aplicar transformaciones equivalentes, mantener visible la ecuación completa y efectuar la misma operación en ambos miembros.

#### Ecuaciones de segundo grado

Si la factorización es evidente, preferirla. Si no lo es, usar la fórmula general. Presentar todas las soluciones y comprobarlas cuando resulte razonable.

#### Ecuaciones bicuadradas

Usar `t=x²`, resolver la ecuación en `t` y volver después a `x`, teniendo en cuenta todas las raíces reales posibles.

#### Ecuaciones con valor absoluto

Separar correctamente los casos y resolver cada uno antes de reunir las soluciones válidas.

#### Ecuaciones racionales

Mostrar obligatoriamente:

1. Restricciones y valores excluidos.
2. Eliminación de denominadores.
3. Resolución de la ecuación resultante.
4. Comprobación en la ecuación original.
5. Descarte explícito de soluciones no válidas.

#### Ecuaciones exponenciales

Permitir igualación de bases, cambio de variable y aplicación de logaritmos. Elegir el procedimiento más sencillo y didáctico para la ecuación concreta.

#### Ecuaciones logarítmicas

Mostrar obligatoriamente:

1. Condiciones de existencia.
2. Transformación de la ecuación.
3. Resolución.
4. Comprobación en la ecuación original.
5. Descarte explícito de soluciones no válidas.

#### Sistemas lineales 2×2

Elegir entre reducción y sustitución según cuál resulte más sencillo y didáctico. No utilizar Cramer como método principal.

#### Sistemas lineales 3×3 sin parámetros

El método preferente y obligatorio es Gauss. Mostrar:

1. Sistema original bajo una llave común.
2. Matriz ampliada.
3. Todas las operaciones elementales por filas, correctamente anotadas.
4. Matrices intermedias necesarias y matriz escalonada.
5. Sustitución hacia atrás.
6. Solución ordenada.
7. Comprobación cuando sea razonable.

No usar Rouché-Frobenius ni Cramer como procedimiento principal en 1.º de Bachillerato.

#### Inecuaciones lineales

Mantener la desigualdad completa y, si se multiplica o divide por un número negativo, mostrar y justificar expresamente el cambio de sentido.

#### Inecuaciones polinómicas

La tabla o recta de signos es obligatoria. Mostrar raíces, intervalos, signos y conjunto solución, incluida su forma conjuntista e intervalos equivalentes cuando corresponda.

#### Inecuaciones racionales

Mostrar ceros del numerador, ceros del denominador, valores excluidos, tabla de signos y solución mediante intervalos. No incluir nunca los ceros del denominador.

### Trigonometría

#### Grados y radianes

Partir de `180°=π rad` y mostrar la proporción o simplificación necesaria.

#### Razones trigonométricas

En triángulos rectángulos, identificar hipotenusa, cateto opuesto y cateto adyacente antes de seleccionar y aplicar la razón trigonométrica.

#### Valores notables

Justificarlos mediante triángulos notables o la circunferencia goniométrica, según corresponda. No presentarlos como una tabla meramente memorizada cuando formen parte de una explicación didáctica.

#### Cuadrantes y reducción

Mostrar, en este orden, el cuadrante, el ángulo de referencia, el signo y el valor.

#### Identidad fundamental

Cuando haya que obtener una razón trigonométrica a partir de otra, usar `sen²α+cos²α=1` y mostrar:

1. Identidad fundamental.
2. Sustitución del dato conocido.
3. Despeje.
4. Raíz cuando corresponda.
5. Elección del signo.
6. Justificación del signo mediante el cuadrante.

No elegir automáticamente la raíz positiva.

#### Notación trigonométrica

En las soluciones generadas por Margarita Salas usar `sen`, `cos` y `tg`. No mostrar `sin` ni `tan` al alumno. Una librería puede necesitarlos internamente, pero la salida educativa debe convertirlos. Conservar literalmente la notación de una fuente oficial cuando sea obligatorio reproducirla sin modificaciones. Componer las potencias como superíndices: `sen²α`, `cos²α`, `tg²α`.

#### Ecuaciones trigonométricas

Mostrar:

1. Ecuación original.
2. Transformaciones necesarias.
3. Razón trigonométrica aislada.
4. Soluciones generales.
5. Periodicidad.
6. Selección de las soluciones pertenecientes al intervalo solicitado.

No limitarse a proporcionar las soluciones del intervalo. Usar la circunferencia goniométrica cuando ayude a justificar las distintas soluciones.

#### Identidades trigonométricas

Para demostrar una identidad, transformar preferentemente un solo miembro hasta obtener el otro. No modificar simultáneamente ambos miembros hasta llegar a una tercera expresión. Mostrar explícitamente las identidades utilizadas.

#### Resolución de triángulos

Cuando existan ejercicios clasificados en el banco, elegir razonadamente entre Pitágoras, razones trigonométricas, teorema del seno y teorema del coseno. Identificar primero los datos conocidos y lo que se desea calcular. Incluir un esquema cuando facilite realmente la comprensión.

### Geometría analítica

#### Vector entre dos puntos

Calcular extremo menos origen y mostrar la resta componente a componente.

#### Módulo de un vector

Aplicar la fórmula euclídea y mostrar `componentes → cuadrados → suma → raíz`.

#### Producto escalar

Mostrar fórmula, sustitución de componentes, productos, suma y resultado.

#### Perpendicularidad

Si el ejercicio está planteado mediante vectores, usar producto escalar igual a cero. Si está planteado naturalmente mediante pendientes, usar `m₁·m₂=−1`. Elegir el procedimiento coherente con los datos y evitar conversiones innecesarias.

#### Punto medio

Usar el promedio de las coordenadas, mostrando fórmula y sustitución.

#### Ecuación de la recta

Si el enunciado no exige una forma concreta, usar preferentemente la ecuación punto-pendiente `y−y₀=m(x−x₀)`. Mostrar:

1. Punto conocido.
2. Cálculo o identificación de la pendiente.
3. Sustitución.
4. Ecuación punto-pendiente.
5. Simplificación si resulta útil.

Si el enunciado solicita expresamente otra forma, respetarla.

#### Paralelismo y perpendicularidad de rectas

Justificar mediante vectores directores o pendientes según la representación disponible. No convertir innecesariamente de una representación a otra.

#### Distancias y construcciones geométricas

Incluir un esquema auxiliar cuando aporte información real, especialmente en mediatrices, simetrías, distancias, centros de triángulos, ángulos y problemas geométricos. No añadir dibujos decorativos.

### Cónicas

#### Identificación

Si la ecuación no viene en forma reducida, transformarla primero hasta identificar inequívocamente la cónica.

#### Circunferencia en forma reducida

Comparar con `(x−a)²+(y−b)²=r²` e identificar centro y radio.

#### Circunferencia en forma general

Completar cuadrados y mostrar:

1. Agrupación de términos en `x` e `y`.
2. Cuadrados completados.
3. Reordenación.
4. Forma reducida.
5. Centro.
6. Radio.

#### Parábola, elipse e hipérbola

Calcular los elementos solicitados e identificar durante la resolución los elementos fundamentales necesarios para comprender la cónica. No añadir cálculos sin utilidad para el ejercicio.

#### Representación

Incluir gráfica en un estudio completo. Si se solicita únicamente un dato, la gráfica es opcional salvo que aporte una mejora didáctica clara.

### Funciones

#### Evaluación

Para calcular `f(a)`, sustituir usando paréntesis y operar después.

#### Dominio

Identificar primero todas las restricciones: denominadores distintos de cero, radicandos de raíces pares no negativos, argumentos de logaritmos positivos y cualquier restricción específica. Resolver cada una y, si existen varias, realizar su intersección. Presentar preferentemente `D={∀ x∈ℝ | condición}=intervalo`.

#### Recorrido

Explicar previamente cómo se obtiene y presentar `Rec(f)={∀ y∈ℝ | condición}=intervalo`.

#### Composición

Cuando sea necesario para comprender el procedimiento, identificar función interior y exterior y mostrar el orden de aplicación.

#### Función inversa

1. Escribir `y=f(x)`.
2. Intercambiar `x` e `y`.
3. Despejar `y`.
4. Obtener `f⁻¹(x)`.
5. Cuando los dominios lo permitan, comprobar `f(f⁻¹(x))=x` y `f⁻¹(f(x))=x`, aunque no se solicite expresamente.

#### Estudio completo de una función

Estudiar ordenadamente, cuando corresponda: dominio; cortes con los ejes; signo; simetría; continuidad; crecimiento y decrecimiento; extremos; recorrido cuando pueda determinarse; y representación gráfica. Utilizar la notación conjuntista e intervalos aprobada para dominio, recorrido y monotonía.

### Límites de 1.º de Bachillerato

La regla de L'Hôpital está absolutamente prohibida en soluciones, explicaciones, pistas, teoría, ejemplos, «Cómo se resuelve» y bancos generados para Matemáticas I.

#### Primer diagnóstico

Realizar siempre sustitución directa y determinar después si el límite es directo, aparece una indeterminación o infinito, o es necesaria una transformación.

#### Indeterminación algebraica `0/0`

Cuando sea factorizable: sustituir; identificar `0/0`; factorizar; simplificar; volver a sustituir; y dar el resultado.

#### `0/0` con radicales

Usar racionalización mediante el conjugado cuando corresponda y mostrar todos los pasos.

#### `∞/∞` en cocientes de polinomios

Usar comparación de grados o división por la potencia dominante. No usar L'Hôpital.

#### Raíz de un cociente de polinomios en infinito

Analizar primero el cociente interior mediante grados o potencia dominante y aplicar después correctamente la raíz.

#### `∞−∞` con radicales

Usar preferentemente racionalización mediante el conjugado.

#### `1^∞`

Aplicar el procedimiento del número `e` trabajado en 1.º de Bachillerato. Mostrar la transformación y el límite que determina el exponente.

#### Límites trigonométricos fundamentales

Para `sen(x)/x` y expresiones equivalentes, usar límites fundamentales. No usar L'Hôpital.

#### Límites laterales

Calcular explícitamente los límites por izquierda y derecha. En la visualización, colocar `x→a⁻` o `x→a⁺` completo debajo de `lim`.

#### Límites de sucesiones

El banco actual no contiene suficiente contenido real. No inventar ejercicios para rellenarlo y registrar la carencia para una ampliación posterior.

#### Contaminación del banco

Registrar para una corrección posterior los ejercicios ordinarios de evaluación, dominio, inversa, composición y ceros de funciones que hayan entrado únicamente porque el título contiene «funciones». No tratarlos como ejercicios de límites.

### Derivadas

#### Derivada por definición

Mostrar la definición correctamente renderizada y desarrollar `f(a+h)`, `f(a)`, diferencia, división por `h`, simplificación, límite y resultado.

#### Reglas básicas

Indicar la regla utilizada cuando tenga valor didáctico, sin sobrecargar operaciones triviales.

#### Producto, cociente y composición

Escribir primero la fórmula general e identificar después las funciones concretas. Mostrar verticalmente todas las fracciones.

#### Funciones compuestas

Si existen varias capas, identificarlas explícitamente antes de derivar.

#### Derivadas sucesivas

Mostrar todas las derivadas intermedias aunque únicamente se solicite la última.

### Aplicaciones de derivadas

#### Recta tangente

Mostrar punto, derivada, pendiente, ecuación punto-pendiente y simplificación cuando proceda.

#### Crecimiento, decrecimiento y extremos

El método preferente es el estudio del signo de la primera derivada. Mostrar `f′(x)`, resolución de `f′(x)=0`, puntos críticos, recta real y signo en cada intervalo. Interpretar `f′(x)>0` como crecimiento y `f′(x)<0` como decrecimiento, y clasificar extremos mediante los cambios de signo. No usar únicamente la segunda derivada como método principal. Presentar los intervalos con la notación conjuntista aprobada.

#### Curvatura e inflexión

Calcular `f″(x)`, resolver `f″(x)=0`, construir la recta de signos, indicar la curvatura y comprobar el cambio. No afirmar que existe inflexión únicamente porque `f″(a)=0`.

#### Optimización

Mostrar obligatoriamente:

1. Interpretación del problema.
2. Definición de variables.
3. Restricción.
4. Función objetivo.
5. Expresión en una variable.
6. Dominio válido.
7. Derivada.
8. Puntos críticos.
9. Estudio de máximo o mínimo.
10. Comprobación de extremos cuando corresponda.
11. Interpretación contextual.
12. Unidades.

### Probabilidad

#### Regla de Laplace

Mostrar el espacio muestral cuando sea manejable. Si es muy grande, describirlo sin enumerarlo innecesariamente.

#### Complementario, unión e intersección

Escribir la fórmula antes de sustituir cuando tenga valor didáctico y justificar incompatibilidad o independencia cuando se utilicen.

#### Probabilidad condicionada

Elegir entre fórmula, tabla y diagrama de árbol según el problema. No imponer siempre la misma representación.

#### Experimentos sucesivos

Usar un diagrama de árbol cuando facilite realmente la comprensión, especialmente en experimentos dependientes o de varias etapas.

#### Presentación del resultado

Dar prioritariamente la forma solicitada. Si no se especifica, dar un valor exacto cuando sea razonable y una aproximación decimal cuando aporte información. No convertir obligatoriamente todo a fracción, decimal y porcentaje.

### Control previo del renderizado en Matemáticas I

Antes de publicar cualquier enunciado, pista, solución o corrección de este curso, comprobar que la ruta concreta de la interfaz compone correctamente las expresiones matemáticas. La existencia de soporte en el renderizador general no garantiza que todos los campos pasen por él: deben revisarse también los contenidos HTML preconstruidos y cualquier vista que inserte directamente un enunciado o una solución.

No sustituir todavía el renderizador matemático propio de Margarita Salas. Si una estructura no está soportada de forma fiable, registrar la carencia y no afirmar que su presentación está resuelta. La auditoría mínima debe cubrir fracciones, fracciones algebraicas, potencias, subíndices, bases logarítmicas, raíces, límites, límites laterales y en infinito, derivadas, sistemas, matrices, determinantes, vectores, cuantificadores, conjuntos, intervalos, uniones, intersecciones y trigonometría.

## Política didáctica formalizada de 2.º de Bachillerato · Matemáticas II

Estas reglas distinguen entre un método matemáticamente válido y el método didácticamente preferente en Matemáticas II. Aplicarlas en práctica por temas, retos por bloques, exámenes, explicaciones, pistas y «Cómo se resuelve». Cuando una regla de esta sección sea más específica que una recomendación general, prevalece la regla de Matemáticas II.

### Matrices, determinantes y sistemas

#### Operaciones con matrices

- En sumas, restas y productos por un escalar, mostrar la operación, el desarrollo suficiente para comprenderla y la matriz resultado, sin desarrollar innecesariamente cada elemento cuando la operación sea trivial.
- En un producto de matrices, dejar claro que cada elemento se obtiene mediante fila por columna. Si el objetivo es aprender el producto, desarrollar los elementos necesarios; en ejercicios avanzados, mostrar uno o varios como modelo y después la matriz completa.
- Mantener siempre filas y columnas alineadas y comprobar las dimensiones antes de operar.

#### Matriz inversa y convención de adjuntos

En Margarita Salas, `Adj(A)` significa **matriz de cofactores**, no la adjunta clásica que ya incorpora la trasposición. Usar obligatoriamente:

`A⁻¹=(1/det(A))·Adj(A)^T`.

Proceder así:

1. Calcular `det(A)` y comprobar `det(A)≠0`.
2. Calcular los cofactores `Aᵢⱼ=(-1)^(i+j)·det(Mᵢⱼ)`.
3. Colocarlos en su posición para formar `Adj(A)`.
4. Trasponer y obtener `Adj(A)^T`.
5. Multiplicar por `1/det(A)` y presentar `A⁻¹`.
6. Comprobar `A·A⁻¹=I` cuando sea razonable.

No mezclar esta convención con la nomenclatura en la que «matriz adjunta» ya significa la traspuesta de la matriz de cofactores.

#### Rango sin parámetros

Usar preferentemente menores:

1. Buscar un menor no nulo del mayor orden posible.
2. Calcularlo y justificar con él el rango.
3. Indicar la cota máxima posible.

Si la matriz es cuadrada y `det(A)≠0`, concluir que tiene rango máximo. Permitir Gauss como alternativa cuando la matriz sea grande, su estructura se simplifique claramente mediante operaciones elementales o el enunciado lo sugiera. No usar Gauss mecánicamente cuando los menores sean sencillos.

#### Rango con parámetros mediante menores

- Mostrar completa la matriz de cada menor seleccionado; no escribir únicamente un nombre como `D₁` seguido del polinomio resultante.
- En un menor `3×3` calculado por Sarrus, escribir los tres productos diagonales positivos, los tres negativos, la resta entre ambas sumas y la factorización final.
- Igualar a cero el determinante y resolver explícitamente la ecuación que proporciona los valores excepcionales del parámetro.
- Si el primer menor se anula para varios valores, estudiar cada uno de ellos. Antes de rebajar el rango, calcular otro menor adecuado y evaluarlo en todos los valores excepcionales; no suponer que todos los menores del mismo orden se anulan.
- Cuando haga falta justificar que el rango no baja más, mostrar también el menor `2×2` en forma de determinante vertical, desarrollar sus dos productos y explicar la cota que proporciona.
- Cerrar con una clasificación completa del rango para todos los valores del parámetro y comprobar que no queda ningún caso sin estudiar.

#### Determinantes de orden tres y propiedades

- Para calcular directamente un determinante `3×3` sin estructura especial, preferir la regla de Sarrus y mostrar sus productos diagonales.
- Preferir Laplace o cofactores si existe una fila o columna con varios ceros, si pueden generarse ceros fácilmente, si el ejercicio está diseñado para cofactores o si se necesita un menor concreto.
- Cuando se intercambien filas, se multiplique una fila por un escalar, se sume a una fila un múltiplo de otra o se utilicen propiedades de producto, potencia o trasposición, explicar expresamente el efecto sobre el determinante.
- No imponer Sarrus cuando otro procedimiento sea claramente más eficiente.

#### Ecuaciones matriciales

Las matrices no conmutan en general. Mantener estrictamente el orden de los factores:

- `AX=B` implica `A⁻¹AX=A⁻¹B` y `X=A⁻¹B`.
- `XA=B` implica `XAA⁻¹=BA⁻¹` y `X=BA⁻¹`.

Aplicar la misma lógica a expresiones más complejas. No mover matrices como si fueran números ni cambiar una inversa de lado.

Si una ecuación como `AX+XB=C` no permite aislar `X` mediante una factorización válida:

1. Representar `X` mediante entradas desconocidas.
2. Calcular por separado `AX` y `XB`.
3. Sumarlos e igualar elemento a elemento con `C`.
4. Resolver el sistema escalar resultante.
5. Reconstruir `X` y comprobar la ecuación original.

No escribir `(A+B)X` si la factorización no está justificada.

#### Sistemas ordinarios y sistemas con parámetros

- En sistemas lineales ordinarios de Matemáticas II, permitir Gauss y Cramer y elegir el método más adecuado a la estructura. No usar Rouché-Frobenius innecesariamente si solo se pide resolver un sistema compatible determinado.
- En sistemas con parámetros, aplicar obligatoriamente la política detallada de «Sistemas de ecuaciones con parámetro»: matrices `A` y `A*`, valores críticos, rangos, número de incógnitas y teorema de Rouché-Frobenius. No dividir por una expresión paramétrica sin estudiar antes el caso en que vale cero.

### Geometría vectorial y espacial

#### Notación y apoyo visual

- Mostrar siempre los vectores con flecha superior.
- Incluir un dibujo o esquema cuando ayude a comprender puntos, rectas, planos, posiciones relativas, perpendicularidades, proyecciones, simetrías, distancias, ángulos, áreas o volúmenes.
- El esquema no necesita estar a escala, pero debe ser matemáticamente coherente, etiquetar los objetos relevantes y no contradecir el enunciado. No usar dibujos decorativos.

#### Posición relativa de dos rectas en el espacio

Usar preferentemente el criterio de rangos de los vectores directores y del vector que une un punto de cada recta:

1. Obtener un punto `P` y un vector director `vector{u}` de la primera recta, y un punto `Q` y un vector director `vector{v}` de la segunda.
2. Construir `vector{PQ}=Q−P` mostrando la resta componente a componente.
3. Calcular `rg(vector{u},vector{v})` mediante un menor `2×2` explícito. Si vale 1, los directores son proporcionales; comparar entonces con `rg(vector{u},vector{PQ})` para distinguir rectas coincidentes de paralelas distintas.
4. Si `rg(vector{u},vector{v})=2`, calcular `rg(vector{u},vector{v},vector{PQ})` mostrando el determinante `3×3`. Si el rango ampliado es 2, las rectas son coplanarias y secantes; si es 3, se cruzan en el espacio sin cortarse.
5. Cuando sean secantes, hallar y comprobar el punto de intersección después de clasificar la posición relativa.

No sustituir este razonamiento por la mera resolución de las parametrizaciones cuando el objetivo didáctico sea estudiar posiciones relativas.

#### Ángulos

- Entre dos vectores orientados, admitir `0°≤θ≤180°` y usar `cos θ=(vector{u}·vector{v})/(|vector{u}|·|vector{v}|)`. No forzar un ángulo agudo.
- Entre dos rectas, tomar el menor ángulo, `0°≤θ≤90°`, usando sus vectores directores y valor absoluto en el producto escalar cuando corresponda.
- Entre dos planos, tomar el menor ángulo, `0°≤θ≤90°`, usando sus vectores normales e identificándolos expresamente.
- Entre una recta y un plano, tomar `0°≤θ≤90°`, identificar el vector director de la recta y el normal del plano y explicar la relación entre el ángulo director-normal y el ángulo recta-plano.
- En todos los casos, desarrollar el producto escalar término a término, calcular por separado cada módulo mostrando la raíz de la suma de cuadrados y sustituir esos valores en la fórmula antes de despejar el ángulo. Dar primero el valor exacto y, cuando ayude, la aproximación en grados.

#### Distancia de un punto a una recta

Cuando solo se pida la distancia, preferir la fórmula basada en el producto vectorial. Si la recta pasa por `A` con director `vector{u}` y se da el punto `P`, mostrar:

1. `A`, `P`, `vector{AP}` y `vector{u}`.
2. `vector{AP}×vector{u}`.
3. Los módulos y el cociente correspondiente.
4. La distancia final.

Si también se pide el punto más próximo o la proyección, construir la perpendicular y calcular el pie.

#### Distancia entre rectas que se cruzan

Determinar primero la posición relativa. Si se cruzan en el espacio, preferir el producto mixto:

1. Tomar un punto de cada recta y sus vectores directores.
2. Formar el vector que une los puntos.
3. Calcular el valor absoluto del producto mixto.
4. Calcular el módulo del producto vectorial de los directores.
5. Dividir y obtener la distancia.

No aplicar esta fórmula sin comprobar antes que las rectas se cruzan.

#### Simetría respecto de una recta o un plano

- Respecto de una recta: proyectar ortogonalmente `P` sobre la recta para obtener `Q`; comprobar que `Q` pertenece a la recta y que `vector{PQ}` es perpendicular al director; usar que `Q` es el punto medio de `PP′`; obtener `P′` y comprobar. Incluir esquema.
- Respecto de un plano: construir por `P` la recta perpendicular al plano; obtener el pie `Q`; usar que `Q` es el punto medio de `PP′`; obtener `P′` y comprobar. Incluir esquema.

#### Perpendicular común a dos rectas

Para `r:P+λvector{u}` y `s:Q+μvector{v}`:

1. Escribir `R∈r` en función de `λ` y `S∈s` en función de `μ`.
2. Calcular `vector{RS}`.
3. Imponer `vector{RS}·vector{u}=0` y `vector{RS}·vector{v}=0`.
4. Resolver `λ` y `μ`, obtener `R` y `S` y construir la perpendicular común.
5. Usar como director `vector{u}×vector{v}` o un vector proporcional.

Incluir un esquema cuando aporte claridad.

#### Lugares geométricos y equidistancia

Ante `d(P,A)=d(P,B)`, preferir `d²(P,A)=d²(P,B)` para evitar raíces innecesarias. Desarrollar, simplificar, obtener la ecuación e identificar el lugar geométrico cuando corresponda.

### Límites de 2.º de Bachillerato

Aplicar estas reglas tanto en retos por temas como en retos por bloques:

#### Diagnóstico inicial y L'Hôpital

1. Sustituir primero y clasificar el resultado como directo, `0/0`, `∞/∞`, `∞−∞`, `0·∞`, `1^∞`, `0^0`, `∞^0` u otra situación.
2. Aplicar L'Hôpital directamente solo ante `0/0` o `∞/∞`. Derivar numerador y denominador por separado; no aplicar la regla del cociente a toda la fracción.
3. Volver a sustituir. Si continúa una indeterminación admisible, justificar una nueva aplicación.
4. Antes de repetir L'Hôpital, comprobar si puede simplificarse mediante factor común, identidades o una cancelación válida en un entorno reducido del punto.
5. Si `∞−∞` o `0·∞` se transforma en un cociente, aplicar L'Hôpital solo si el cociente resultante es `0/0` o `∞/∞`.

Escribir cada cociente como fracción vertical y conservar correctamente el punto de aproximación en todas las transformaciones.

En el código fuente de una solución, cada construcción `frac{numerador}{denominador}` debe permanecer completa y contigua en una misma línea. Nunca separar `frac{numerador}` y `{denominador}` mediante un salto de línea, porque la interfaz mostraría LaTeX crudo. La auditoría estática debe comprobar que no quede ninguna fracción dividida de ese modo.

Cuando intervenga la tangente, recordar que `(tg x)'=1/cos²x=1+tg²x` y elegir la forma que deje el cálculo más claro. Evitar `sec²x`. Si se deriva `tg²x`, mostrar la cadena `(tg²x)'=2·tg x·(1+tg²x)`.

#### Límites trigonométricos y radicales

- En una forma `0/0` equivalente a `sen x/x`, preferir el límite trigonométrico fundamental. No sustituirlo innecesariamente por L'Hôpital.
- En una forma `0/0` con radicales y racionalización evidente, preferir primero el conjugado. Si después permanece `0/0` o `∞/∞`, se puede aplicar L'Hôpital.

#### Indeterminación `1^∞`

Si `f(x)→1` y `g(x)→±∞` cuando `x→a`, usar preferentemente la fórmula trabajada en clase:

`lim [f(x)]^{g(x)}=e^{lim g(x)[f(x)−1]}`.

El símbolo `a` representa exactamente el punto de aproximación original y puede ser un número real, `+∞` o `−∞`. No cambiarlo durante la resolución.

Proceder así:

1. Sustituir y comprobar por separado `f(x)→1` y `g(x)→±∞`.
2. Identificar `1^∞`.
3. Escribir la fórmula completa conservando el mismo punto de aproximación.
4. Calcular `lim g(x)[f(x)−1]`.
5. Resolver cualquier indeterminación auxiliar mediante el método adecuado; usar L'Hôpital solo si el límite auxiliar queda como `0/0` o `∞/∞`.
6. Sustituir el valor del límite auxiliar en el exponente de `e` y dar el resultado.

No saltar directamente de `1^∞` al resultado. El método `ln y=g(x)ln(f(x))` es válido como justificación o cuando la estructura lo requiera, pero no debe sustituir automáticamente la fórmula de clase.

#### Indeterminaciones `0^0` e `∞^0`

Usar transformación logarítmica. Si `y=f(x)^{g(x)}`, escribir `ln y=g(x)ln(f(x))`, calcular el límite del producto y transformarlo en cociente si es necesario. Aplicar L'Hôpital únicamente si aparece `0/0` o `∞/∞`. Si el límite obtenido es `L`, concluir `y=e^L`.

#### Límites de sucesiones

- En cocientes de polinomios en `n`, comparar grados o dividir por la mayor potencia.
- Con radicales, factorizar la potencia dominante o racionalizar.
- Con potencias y exponenciales, analizar el crecimiento relativo.
- En sucesiones geométricas, estudiar la razón.
- No introducir técnicas de series infinitas ajenas al contenido real del curso.
- Si aparece otro tipo real en el banco, identificarlo antes de fijar o inventar una regla.

## Operaciones combinadas y ecuaciones aritméticas

En operaciones combinadas con enteros o fracciones y en ecuaciones con paréntesis o denominadores, escribir una cadena vertical completa; no mostrar solo la suboperación que se está calculando:

1. Copiar la expresión o los dos miembros completos en cada línea y sustituir únicamente la operación que se acaba de resolver.
2. Respetar siempre la jerarquía: agrupaciones interiores, potencias y raíces, multiplicaciones y divisiones, y por último sumas y restas.
3. En una división de fracciones, mostrar dentro de la expresión completa el cambio a producto por la inversa antes de multiplicar.
4. Al buscar denominador común, escribir primero todas las fracciones equivalentes dentro de la operación completa; en la línea siguiente, sumar o restar los numeradores.
5. En ecuaciones, mantener visibles ambos miembros y aplicar la misma transformación a los dos. Si se eliminan paréntesis o denominadores, escribir la ecuación entera resultante antes de reducir términos o despejar.
6. Colocar cada igualdad principal debajo de la anterior, con signos `=` alineados siempre que el formato lo permita. No saltar desde el enunciado a una operación parcial ni abreviar con expresiones como «operamos» sin mostrar la línea completa.
7. Usar paréntesis y corchetes extensibles que abarquen verticalmente todas las fracciones, potencias o castillos que contienen.
8. Al sumar un entero negativo dentro de una agrupación, mostrar también el paso en el que se elimina el paréntesis del número negativo. Por ejemplo:
   - `[8+(−16)]·(7−4)`
   - `=[8−16]·(7−4)`
   - `=(−8)·(7−4)`
   - `=(−8)·3`
   - `=−24`.
   No saltar directamente de `[8+(−16)]` a `−8`.
9. Componer las potencias mediante superíndices reales —por ejemplo, `(−6)²`— y nunca como texto literal `(-6)^2` en la solución visible. Mantener en una misma línea de base los paréntesis, productos, sumas y términos que no sean exponentes.

## Porcentajes y proporcionalidad

Cuando un problema incluya aumentos, descuentos o proporcionalidad:

1. En un descuento del `d %`, explicar primero qué porcentaje permanece y convertirlo en factor multiplicativo:
   `100 %−d %=p %=frac{p}{100}=factor`.
   En un aumento del `a %`, escribir:
   `100 %+a %=q %=frac{q}{100}=factor`.
2. Aplicar los factores sucesivos al valor inicial en el orden del enunciado y mantener la cadena completa. Por ejemplo:
   `100·0,9·1,05=94,5 €`.
   No sumar directamente los porcentajes cuando se aplican sobre cantidades consecutivas distintas.
3. En problemas de proporcionalidad, ordenar primero los datos en una tabla de dos filas y tres columnas. La primera columna contiene el nombre y la unidad de cada magnitud; las otras dos, la situación inicial y la nueva. Por ejemplo:
   `Personas | 2 | 4`
   `Días     | 14 | x`.
4. Explicar con palabras si la relación es directa o inversa:
   - directa: al aumentar una magnitud, aumenta la otra en la misma razón;
   - inversa: al aumentar una magnitud, disminuye la otra en la razón correspondiente.
5. En una proporcionalidad inversa, igualar los productos de las magnitudes correspondientes y despejar:
   `2·14=4·x`, `x=frac{2·14}{4}=7`.
   En una proporcionalidad directa, escribir la igualdad de razones con fracciones verticales y resolver el producto cruzado.
6. Mantener siempre las unidades en la tabla, en el planteamiento y en el resultado final.

## Derivadas sucesivas y de orden alto

Cuando una derivada de orden alto se resuelva mediante la periodicidad de las derivadas de seno, coseno u otra sucesión cíclica, no saltar directamente de la primera derivada al orden pedido:

1. Determinar primero todos los parámetros de la función y escribir la función resultante antes de construir el ciclo.
2. Mostrar dos ciclos alineados completos, incluyendo la función sin derivar. Cuando el período sea cuatro, escribir ocho expresiones: `f(x)`, `f′(x)`, `f″(x)`, `f‴(x)`, `f^{IV}(x)`, `f^{V}(x)`, `f^{VI}(x)` y `f^{VII}(x)`, con todos sus signos. Usar números romanos en superíndice desde la cuarta derivada cuando se enumeren estas derivadas sucesivas. Para un orden arbitrario alto, conservar la notación arábiga entre paréntesis, por ejemplo `f^{(2008)}(x)`; no escribir una sucesión romana excesivamente larga ni una notación que pueda confundirse con una potencia.
3. Presentar el primer ciclo en la columna izquierda —`f`, `f′`, `f″`, `f‴`— y el segundo en la derecha —`f^{IV}`, `f^{V}`, `f^{VI}`, `f^{VII}`—. Alinear las expresiones equivalentes por filas y escribir explícitamente `f^{IV}=f`, `f^{V}=f′`, `f^{VI}=f″` y `f^{VII}=f‴`.
4. Explicar con esas ocho expresiones por qué se repite el ciclo e indicar su período.
5. Dividir el orden solicitado entre el período y escribir literalmente el cociente y el resto; por ejemplo: `2008:4=502, resto 0`. Añadir la igualdad euclídea `2008=4·502+0` para justificarla. Elegir la expresión correspondiente al resto: `r=0` conduce a `f`, `r=1` a `f′`, `r=2` a `f″` y `r=3` a `f‴`.
6. Sustituir el orden concreto y cerrar la solución con la expresión completa. En el ejemplo anterior, concluir `f⁽²⁰⁰⁸⁾(x)=f(x)`; no cambiar por error el orden solicitado a `2009`.

Comprobar que ambas columnas caben completas y que superíndices, primas y signos quedan alineados. En una pantalla estrecha se pueden apilar las dos columnas, manteniendo el orden de las ocho derivadas.

## Integrales racionales mediante fracciones simples

Cuando el denominador se pueda factorizar y la integral se resuelva mediante fracciones simples:

1. Factorizar completamente el denominador y escribir la descomposición con una constante distinta para cada factor.
2. Multiplicar toda la igualdad por el denominador común y mostrar expresamente la identidad polinómica resultante. Por ejemplo: `x+1=A(x+3)(x−2)+Bx(x−2)+Cx(x+3)`. No pasar directamente de la descomposición a los valores de `A`, `B` y `C`.
3. Para cada valor elegido de `x`, escribir primero la identidad con ese valor sustituido, incluidos los términos que se anulan; escribir después la ecuación reducida y despejar el coeficiente en una línea aparte.
4. Sustituir los coeficientes obtenidos en la descomposición y mostrarla completa antes de integrar.
5. Separar la integral original como suma o diferencia de integrales elementales, conservando cada fracción en formato vertical y colocando fuera de cada integral su coeficiente constante.
6. Escribir la primitiva de cada integral y reunirlas después en una única expresión, con valores absolutos en los logaritmos y una sola constante de integración `C` al final.
7. Comprobar el resultado derivando la primitiva y verificando que se recupera el integrando original.

## Rectas tangente y normal

Cuando se pidan las rectas tangente y normal a una curva en un punto:

1. Calcular primero el punto de tangencia `P(a,f(a))` y la pendiente de la tangente `m=f'(a)`, mostrando la sustitución.
2. Escribir la recta tangente con la ecuación punto-pendiente `y−f(a)=m(x−a)` y simplificarla después.
3. Para obtener la pendiente `m_n` de la normal, no limitarse a decir que es «la opuesta de la inversa». Escribir la condición de perpendicularidad `m·m_n=−1`, sustituir el valor de `m` y despejar `m_n` paso a paso. Si `m≠0`, se obtiene `m_n=−1/m`.
4. Escribir después la recta normal mediante `y−f(a)=m_n(x−a)` y simplificarla.
5. Si `m=0`, explicar que la tangente es horizontal y la normal es la recta vertical `x=a`; en este caso no se debe intentar calcular `−1/m`.
6. Comprobar que ambas rectas pasan por `P` y, cuando sus pendientes sean finitas, que `m·m_n=−1`.

## Distribución normal y tipificación

Al resolver probabilidades con una variable `X~N(μ,σ)`, mostrar la tipificación dentro del suceso cuya probabilidad se calcula; no obtener primero valores de `z` aislados y sustituirlos después:

1. Para un intervalo, escribir directamente `P(a≤X≤b)=P(frac{a−μ}{σ}≤Z≤frac{b−μ}{σ})` y simplificar a continuación los dos extremos. Después transformar el intervalo en probabilidades acumuladas de la tabla, indicando cada valor consultado.
2. Para una cola, conservar el sentido de la desigualdad al tipificar: `P(X≤a)=P(Z≤frac{a−μ}{σ})` y `P(X≥a)=P(Z≥frac{a−μ}{σ})`. Usar complemento o simetría de forma explícita cuando la tabla lo requiera.
3. Cuando la tabla proporcione probabilidades para valores positivos y aparezca un valor tipificado negativo, escribir expresamente la simetría antes de consultar o usar el dato; por ejemplo: `P(Z<−1)=1−P(Z<1)=1−0,8413=0,1587`.
4. Cuando se busque un valor original desconocido `K`, efectuar primero los complementos necesarios y llamar `a` a su valor tipificado para evitar confundirlo con la `K` original. Escribir `P(Z≤a)=p`, indicar «buscamos `p` en la tabla de la normal típica» y obtener, por ejemplo, `a=1`. Solo después plantear `frac{K−μ}{σ}=a=1` y despejar `K` paso a paso.
5. Mantener las fracciones de tipificación en formato vertical, alinear las desigualdades y distinguir siempre la variable original mayúscula `K` del valor tipificado minúsculo `a`.
6. Comprobar que la probabilidad final está entre 0 y 1 y, si se expresa como porcentaje, mostrar la conversión.

## Áreas mediante integrales definidas

Cuando una integral definida calcule el área de un recinto limitado por funciones:

1. Calcular y mostrar todos los puntos de corte que delimitan el recinto, separando casos cuando intervengan valores absolutos o funciones definidas a trozos.
2. Determinar en cada intervalo qué función queda arriba y cuál abajo. Plantear el área como `∫[función superior−función inferior] dx`; dividirla en varias integrales cuando cambie ese orden y aprovechar la simetría solo después de justificarla.
3. Cuando se aproveche una simetría, escribir primero la integral del recinto completo y mostrar en una misma cadena su transformación en la integral reducida. Por ejemplo, si las dos funciones son pares y `f` queda arriba de `g` en `[-a,a]`, escribir `A=∫_{-a}^{a}[f(x)−g(x)]dx=2∫_{0}^{a}[f(x)−g(x)]dx`; no mostrar únicamente la segunda integral. Si interviene un valor absoluto, sustituirlo por la rama correspondiente dentro de la integral reducida: `|x|=x` para `x≥0`.
4. Escribir cada integral definida en tamaño normal, con un signo integral estilizado y de trazo fino, nunca excesivamente grueso. Situar el límite superior arriba y el inferior abajo, ambos pegados al signo integral, con tamaño legible y separación vertical suficiente. Mantener el integrando y `dx` a tamaño normal y fuera de la zona de los límites. Si el componente general descuadra los límites, usar una composición matemática específica para esa igualdad en vez de aceptar una notación desplazada.
5. Mostrar siempre una representación gráfica en todo ejercicio de área encerrada, aunque el enunciado no la pida. Dibujar y rotular las funciones y las rectas que delimitan el recinto, señalar los puntos de corte y sus abscisas, y colorear la región cuya área se calcula. Construir el sombreado siguiendo la función superior desde el extremo izquierdo hasta el derecho y regresar por la función inferior en sentido contrario, de modo que quede exclusivamente entre ambas curvas. Cuando el área sea suma de integrales porque cambia la función que constituye la frontera superior o inferior, sombrear cada subregión con un color distinto que coincida visualmente con la curva correspondiente; por ejemplo, azul para el tramo gobernado por una parábola azul y verde para el tramo gobernado por una recta verde. Marcar con claridad la abscisa en la que cambia el tramo. No colorear zonas situadas por encima de la función superior, por debajo de la inferior ni fuera de los puntos de corte.
6. Si el enunciado pide representar o dibujar el recinto, explicar antes de la gráfica todos los cálculos necesarios para construirla: intersecciones entre las funciones; cortes con los ejes cuando sean relevantes; vértice y eje de simetría de una parábola; dominio y asíntotas cuando intervengan funciones racionales; y puntos de corte con las rectas que cierren la región. No incluir en la solución una gráfica cuyos puntos y límites no hayan quedado justificados mediante cálculos.
7. Comprobar conjuntamente la gráfica y la fórmula antes de incorporar el ejercicio: en varias abscisas interiores, la franja sombreada debe ir exactamente desde la función inferior hasta la superior, y sus extremos deben coincidir con los límites de integración. El gráfico debe acompañar a los cálculos, no sustituirlos.
8. Calcular una primitiva y aplicar la regla de Barrow mostrando `F(b)−F(a)`. Los corchetes deben abarcar verticalmente toda la primitiva. Los límites de evaluación deben aparecer inmediatamente a la derecha del corchete: el superior arriba y el inferior abajo, ambos a tamaño legible, claramente separados y sin invadir la expresión. Mantener también las fracciones correctamente compuestas. Si el componente general los desplaza, usar una composición específica para esa igualdad y comprobarla visualmente antes de incorporar el ejercicio.
9. Dar el área final como cantidad no negativa, con unidades cuadradas cuando proceda, y comprobar que coincide con la región sombreada.

## Continuidad y derivabilidad de funciones definidas a trozos

Cuando una función cambie de expresión en uno o varios puntos, aplicar la misma operativa completa en cada punto de unión; no desarrollar el primero con detalle y abreviar los siguientes:

1. Identificar todos los puntos en los que cambia la fórmula y explicar que cada rama elemental ya es continua y derivable en el interior de su intervalo.
2. Para estudiar la continuidad en cada punto `x=c`, calcular y mostrar por separado, indicando qué rama se utiliza:
   - el límite por la izquierda `lim x→c− f(x)`;
   - el valor de la función `f(c)`, aclarando qué rama contiene el punto;
   - el límite por la derecha `lim x→c+ f(x)`.
3. Escribir después la condición completa `lim x→c− f(x)=f(c)=lim x→c+ f(x)`, sustituir en ella los tres resultados y resolver paso a paso las ecuaciones que determine. No saltar directamente a una igualdad como `a+b=3` sin haber mostrado de dónde procede.
4. Repetir los tres cálculos y la cadena de igualdad completa en todos los puntos de unión, aunque la operación sea parecida a la anterior.
5. Una vez determinados los parámetros, escribir la función resultante completa por tramos.
6. Antes de estudiar la derivabilidad en los puntos de unión, derivar cada rama y mostrar la función `f'(x)` completa por tramos, usando intervalos abiertos en los puntos que todavía se están estudiando.
7. Para cada punto `x=c`, obtener las derivadas laterales sustituyendo en la rama de `f'(x)` correspondiente: mostrar `f'(c−)` y `f'(c+)` con sus operaciones. Concluir que es derivable solo si ambas coinciden y la función ya es continua en ese punto.
8. Comprobar visualmente que todos los operadores `lim`, sus subíndices y las expresiones situadas a continuación permanecen alineados; escribir en líneas separadas las cadenas que resulten demasiado largas.

## Ecuaciones matriciales de 2.º de Bachillerato

Cuando `X` pueda aislarse mediante una factorización matricial válida, resolver la ecuación despejando `X` y usando la matriz inversa; no obtener `X` directamente mediante relaciones entre sus filas salvo que el enunciado pida expresamente otro método. Si la incógnita aparece a ambos lados y no existe una factorización válida, como en `AX+XB=C`, aplicar la regla específica del punto 8:

1. Reunir los términos que contienen `X`, pasar los demás al otro miembro y sacar factor común cuando sea necesario, conservando estrictamente el orden de los factores. Por ejemplo, `AX+BX=(A+B)X`, mientras que `XA+XB=X(A+B)`.
2. Identificar por qué lado multiplica a `X` la matriz que se desea eliminar. Multiplicar los dos miembros por su inversa en ese mismo lado:
   - `BX=D` implica `B⁻¹BX=B⁻¹D` y, por tanto, `X=B⁻¹D`.
   - `XB=D` implica `XBB⁻¹=DB⁻¹` y, por tanto, `X=DB⁻¹`.
   - `(A+B)X=C` implica `X=(A+B)⁻¹C`.
   - `X(A+B)=C` implica `X=C(A+B)⁻¹`.
3. Explicar que el producto de matrices no es conmutativo y que no se puede cambiar la inversa de lado.
4. Comprobar que la matriz que se va a invertir es cuadrada y que su determinante no es cero. Si `det(B)=0`, indicar que `B⁻¹` no existe y no continuar como si fuera invertible.
5. Calcular la inversa mediante determinantes usando la nomenclatura del centro: `Adj(B)` es la matriz de cofactores de `B`, es decir, la matriz cuyos elementos son `Aᵢⱼ=(-1)^(i+j)·det(Mᵢⱼ)`. No denominarla `Cof(B)` ni usar `Adj(B)` para designar una matriz que ya esté traspuesta. Mostrar sin saltos `det(B)`, cada menor, la matriz `Adj(B)`, su traspuesta `Adj(B)^T` y la fórmula `B⁻¹=(1/det(B))·Adj(B)^T`. Para una matriz de orden tres, no presentar los nueve cofactores como una lista vertical: colocarlos directamente en una matriz `3×3`, cada uno en su posición, e igualar después esa matriz simbólica a la matriz numérica `Adj(B)`. Para matrices de orden dos se puede aplicar la fórmula equivalente, mostrando también el determinante.
6. Calcular por separado las sumas o diferencias de matrices necesarias, efectuar después todos los productos fila por columna y presentar la matriz `X` con sus elementos alineados entre paréntesis grandes.
7. Comprobar el resultado sustituyendo la matriz obtenida en la ecuación matricial original y verificando que ambos miembros coinciden.
8. Si la ecuación no es factorizable, escribir `X` con incógnitas escalares, calcular por separado todos los productos, igualar las entradas correspondientes, resolver el sistema escalar resultante y comprobar la matriz obtenida en la ecuación original. No fingir una factorización de `AX+XB` ni alterar el orden de los factores para aplicar una inversa.

En toda la resolución y en todas las opciones de respuesta, distinguir la notación por su significado, no por la forma cuadrada de la colección de números:

- Una matriz, incluida `X`, `A`, `B`, `C`, una matriz inversa, una matriz de adjuntos, su traspuesta o el resultado de una suma, diferencia o producto, se escribe siempre entre paréntesis grandes que abarquen todas sus filas y todos los elementos de cada fila.
- Las barras verticales se reservan exclusivamente para determinantes y menores. Nunca encerrar entre barras una matriz que se está nombrando, una opción del tipo `X=...` ni el resultado final.
- Antes de incorporar el ejercicio, comprobar visualmente cada aparición: `X=(...)`, `B⁻¹=(...)` y `C-A=(...)` deben llevar paréntesis; solo `det(B)=|...|` y los determinantes de los menores deben llevar barras.

En una ecuación como `A+BX=C`, mostrar obligatoriamente la cadena `BX=C−A`, `B⁻¹BX=B⁻¹(C−A)` y `X=B⁻¹(C−A)` antes de calcular `C−A`, `B⁻¹` y el producto final.

## Determinación de parámetros mediante condiciones

Cuando se determinen dos o más parámetros de una función, polinomio u otra expresión a partir de condiciones distintas:

1. Traducir cada condición por separado a su ecuación, mostrando la sustitución que la origina. Por ejemplo: pertenencia de un punto, extremo relativo, pendiente de una tangente, paralelismo, valor de una derivada o continuidad.
2. Después de obtener todas las ecuaciones, reunirlas en un único sistema con llave común y ecuaciones alineadas. Si se han obtenido dos ecuaciones, mostrar las dos; si son tres, mostrar las tres. No resolverlas como igualdades dispersas sin presentar antes el sistema completo.
3. Resolver el sistema paso a paso mediante reducción, sustitución o Gauss, indicando cada operación y manteniendo visibles las ecuaciones que intervienen.
4. Sustituir los parámetros hallados en la expresión original y comprobar todas las condiciones del enunciado, no solo la última utilizada.

## Simetría de un punto respecto de un plano

Cuando se pida el punto simétrico `A′` de un punto `A` respecto de un plano:

1. Identificar el vector normal del plano y explicar que la recta que une `A`, el pie `Q` y `A′` es perpendicular al plano y tiene ese vector como director.
2. Escribir la recta perpendicular en forma paramétrica, con sus tres coordenadas agrupadas mediante una llave, antes de sustituirla en el plano.
3. Sustituir las tres expresiones paramétricas en la ecuación del plano, mostrar la simplificación completa, despejar el parámetro y calcular el punto de corte `Q` sustituyendo ese parámetro en las tres coordenadas.
4. Explicar que `Q` es el punto medio del segmento `AA′`. Escribir `A′=(x,y,z)` y plantear por separado las tres ecuaciones de punto medio como fracciones verticales; por ejemplo, `(x_A+x)/2=x_Q`. Despejar cada coordenada en líneas separadas.
5. Comprobar que `Q` pertenece al plano, que es el punto medio de `A` y `A′`, y que el vector `AA′` es paralelo al vector normal del plano.
6. Siempre que la interfaz lo permita, acompañar la solución con un esquema sencillo: plano rotulado con su ecuación, `A` a un lado, `A′` al otro, `Q` sobre el plano y la recta perpendicular en un color diferente. El dibujo es explicativo y debe acompañar, no sustituir, los cálculos.

Escribir la prima con el símbolo tipográfico `′`, correctamente alineado: `A′`; no usar un apóstrofo descentrado como `A'`.

## Distancia de un punto a un plano

Cuando se pida la distancia de un punto `P(x₀,y₀,z₀)` al plano `π:Ax+By+Cz+D=0` y el punto más próximo del plano:

1. Escribir primero la fórmula general como una fracción vertical: `d(P,π)=|Ax₀+By₀+Cz₀+D|/√(A²+B²+C²)`. El numerador completo debe quedar encima de la barra y la raíz completa debajo; no presentarla como un cociente en línea.
2. Sustituir las coordenadas de `P` y los coeficientes del plano en otra fracción vertical. Calcular por separado el valor absoluto del numerador y la raíz del denominador antes de simplificar la distancia.
3. Identificar el vector normal con flecha, `vector{n}=(A,B,C)`, y escribir la recta perpendicular al plano que pasa por `P` en forma paramétrica, con las tres ecuaciones alineadas bajo una misma llave, antes de sustituirla en el plano.
4. Sustituir la recta en el plano, despejar el parámetro y calcular el pie `Q` mostrando sus tres coordenadas como fracciones correctamente compuestas.
5. Acompañar los cálculos con un esquema sencillo siempre que la interfaz lo permita: representar el plano, el punto `P` fuera de él, el pie `Q` sobre el plano, la perpendicular `PQ`, el ángulo recto y la distancia destacada. Rotular el plano y los dos puntos.
6. Comprobar que `Q` pertenece al plano, que `PQ` es paralelo al vector normal y que la longitud `PQ` coincide con la distancia calculada.

## Sistemas de ecuaciones con parámetro

Resolver y discutir los sistemas con parámetro mediante rangos y el teorema de Rouché-Frobenius:

1. Reunir primero todas las ecuaciones originales en un único sistema con una llave común y las ecuaciones alineadas. Mostrar siempre todas las ecuaciones: si son tres, deben verse las tres bajo la misma llave. No sustituir esta presentación por una lista entre llaves, una cadena separada por punto y coma ni varias igualdades dispersas.
2. Escribir claramente la matriz de coeficientes `A` y la matriz ampliada `A*`.
3. Mostrar las matrices como estructuras bidimensionales y comprobar visualmente que los paréntesis grandes abarcan todas las filas. En la matriz ampliada, separar la columna de términos independientes mediante una barra vertical o un espacio inequívoco.
4. Seleccionar explícitamente el menor que se va a calcular. Escribir el determinante completo entre barras verticales y nombrar el método empleado. En determinantes de orden tres, indicar «aplicamos la regla de Sarrus» y mostrar los productos diagonales antes de escribir el resultado.
5. Calcular los valores del parámetro que pueden cambiar los rangos, usando determinantes, menores o reducción de Gauss. No limitarse a escribir el resultado del determinante: mostrar las operaciones que conducen a él. No dividir por una expresión que contenga el parámetro sin separar antes el caso en que esa expresión vale cero.
6. Cuando convenga simplificar un determinante mediante operaciones elementales por filas, explicar el objetivo de la operación, escribirla con la forma `Fᵢ ← Fᵢ+λFⱼ` y mostrar la matriz transformada. Recordar qué operaciones conservan el determinante y cuáles cambian su signo o lo multiplican. Si se crea una columna con muchos ceros, indicar que se desarrolla por esa columna, señalar la posición del elemento no nulo y escribir su cofactor.
7. Estudiar por separado todos los valores críticos y el caso general.
8. Aplicar y explicar el teorema de Rouché-Frobenius, siendo `n` el número de incógnitas:
   - `rg(A) ≠ rg(A*)`: sistema incompatible, sin solución.
   - `rg(A) = rg(A*) = n`: sistema compatible determinado, con solución única.
   - `rg(A) = rg(A*) < n`: sistema compatible indeterminado, con infinitas soluciones y `n-rg(A)` parámetros libres.
9. Cuando se pregunte para qué valores hay solución única, no resolver únicamente por sustitución. Invocar expresamente Rouché-Frobenius y escribir la condición `rg(A)=rg(A*)=n`. Usar `det(A)≠0` para justificar que ambos rangos valen `n`; para cada valor que anule el determinante, calcular por menores los rangos de `A` y `A*` antes de clasificar el sistema.
10. En cada caso compatible, indicar qué fila o ecuación es combinación lineal de las demás. Escribir la combinación lineal completa y elegir después un sistema equivalente formado por ecuaciones independientes.
11. Si el sistema es compatible determinado, ofrecer preferentemente estas dos vías didácticas cuando sean razonables:
   - **Cramer:** escribir el determinante principal, comprobar que es distinto de cero, construir y mostrar cada determinante `Dₓ`, `Dᵧ`, `D_z`, calcularlos indicando Sarrus cuando sean de orden tres y aplicar `x=Dₓ/D`, `y=Dᵧ/D`, `z=D_z/D`. Para ganar claridad sin desperdiciar espacio, colocar `D`, `Dₓ`, `Dᵧ` y `D_z` en una misma fila cuando quepan. Debajo de cada determinante situar inmediatamente, en una sola línea horizontal, toda la cadena de la incógnita con fracciones verticales; por ejemplo: `x=frac{Dₓ}{D}=frac{−33}{−3}=11`. Hacer lo mismo con `y` y `z`, sin apilar cada igualdad como una fracción independiente.
   - **Gauss:** escribir la matriz ampliada del sistema independiente, anotar cada operación elemental por filas, mostrar todas las matrices intermedias hasta la matriz escalonada y terminar con la sustitución hacia atrás. Colocar preferentemente las matrices consecutivas en una fila, con la flecha y la operación elemental entre ellas, y las soluciones ordenadas debajo; si no caben, permitir desplazamiento horizontal sin cortar contenido.
12. Si el sistema es compatible indeterminado, expresar correctamente la solución paramétrica y explicar qué incógnitas quedan libres.
13. Comprobar las soluciones sustituyéndolas en todas las ecuaciones originales, incluida cualquier ecuación que se hubiera descartado por ser combinación lineal.

Explicar por qué cambia el rango en cada valor del parámetro y presentar al final una clasificación clara de todos los casos, no solo el cálculo de un determinante.

## Sistemas lineales 3×3 sin parámetros de 1.º de Bachillerato

Resolver los sistemas lineales 3×3 sin parámetros mediante el método de Gauss. Para los sistemas 2×2, aplicar la política específica anterior y elegir entre reducción y sustitución:

1. Ordenar todas las ecuaciones con las incógnitas en el mismo orden y escribir la matriz ampliada.
2. Escalonar la matriz usando operaciones elementales por filas. Escribir en cada paso la operación realizada, por ejemplo `F₂ ← F₂-2F₁`.
3. Evitar saltos de cálculo y elegir, cuando sea posible, operaciones que reduzcan la aparición de fracciones.
4. Interpretar la matriz escalonada y realizar la sustitución hacia atrás.
5. Dar la solución ordenada y comprobarla en las ecuaciones originales.

Si durante el escalonamiento aparece una fila imposible, como `0 = c` con `c ≠ 0`, explicar que el sistema es incompatible. Si aparece una fila nula y quedan incógnitas libres, explicar que es compatible indeterminado y expresar su solución paramétrica. No usar Rouché-Frobenius como procedimiento principal en estos ejercicios sin parámetros salvo que el enunciado lo pida expresamente.

## Crecimiento, decrecimiento y extremos relativos

Al estudiar la monotonía y los máximos o mínimos de una función, usar preferentemente la recta real de signos de la primera derivada para que el alumno pueda ver y comprobar el razonamiento:

1. Calcular `f'(x)` en cada rama de la función y hallar los puntos críticos resolviendo `f'(x)=0`. Añadir los puntos donde la derivada no exista o donde cambie la expresión de la función.
   - Si `f` es un cociente, presentar la regla del cociente y cada simplificación posterior como fracciones verticales completas. El numerador entero debe quedar sobre la barra y el denominador entero debajo; no escribir la derivada inicial como un cociente en línea. Las igualdades simplificadas pueden continuar en la misma línea cuando sigan siendo legibles.
2. Ordenar todos esos puntos en la recta real y escribir los intervalos que determinan.
3. Elegir un valor de prueba sencillo dentro de cada intervalo, sustituirlo expresamente en la primera derivada correspondiente y mostrar el resultado numérico.
4. Dibujar una recta horizontal: colocar debajo de ella los valores que anulan la derivada y los puntos donde cambia la expresión; encima de cada intervalo, escribir el signo `+` o `−` y una flecha ascendente `↑` o descendente `↓`. Explicar que `f'(x)>0` implica crecimiento y `f'(x)<0` implica decrecimiento.
5. Clasificar los extremos por el cambio de signo: de `+` a `−`, máximo relativo; de `−` a `+`, mínimo relativo; si no cambia el signo, no hay extremo.
6. Calcular la ordenada de cada extremo sustituyendo su abscisa en la función original y dar el punto completo con ambas coordenadas.

No limitarse a usar la segunda derivada cuando el ejercicio pida crecimiento, decrecimiento o extremos. La explicación debe incluir la recta real, los valores de prueba y la sustitución en `f'(x)`. En la aplicación, usar el marcador estructurado `[[signchart points="…" signs="…" arrows="…"]]` para que la recta de signos se represente visualmente; una enumeración textual de signos no la sustituye.

## Curvatura y puntos de inflexión

Cuando el ejercicio pida intervalos de concavidad, convexidad, curvatura o puntos de inflexión, aplicar la misma operativa visual con la segunda derivada:

1. Calcular `f''(x)` en cada rama y resolver `f''(x)=0`. Añadir los puntos donde la segunda derivada no exista o donde cambie la expresión de la función.
2. Ordenar esos valores en una recta horizontal y escribirlos debajo de la línea.
3. Elegir un valor sencillo de cada intervalo, sustituirlo expresamente en `f''(x)` y mostrar el resultado numérico y su signo.
4. Encima de cada intervalo, escribir `+` y el símbolo `∪` cuando `f''(x)>0`, o `−` y el símbolo `∩` cuando `f''(x)<0`. Indicar con palabras la nomenclatura usada en el curso: convexa o cóncava hacia arriba para `f''(x)>0`, y cóncava o cóncava hacia abajo para `f''(x)<0`.
5. Hay punto de inflexión únicamente si cambia el signo de `f''(x)` y el punto pertenece a la función. Si `f''(x)=0` pero no cambia el signo, explicar que no es un punto de inflexión.
6. Calcular la ordenada de cada punto de inflexión sustituyendo la abscisa en la función original y dar sus dos coordenadas.

La solución debe mostrar la recta real de signos de `f''(x)`, los valores de prueba, las sustituciones y las formas `∪`/`∩`; no basta con enumerar los intervalos finales.

## Política didáctica formalizada de 1.º de Bachillerato · Matemáticas Aplicadas a las CCSS I

Esta política se aplica específicamente a `1bach-ccss`. Mantiene las reglas de Matemáticas I únicamente cuando el contenido, el nivel y el procedimiento sean equivalentes. Las reglas específicas de CCSS I prevalecen en estadística, probabilidad, distribuciones, problemas contextualizados, combinatoria y en cualquier contenido cuyo tratamiento sea distinto.

La solución debe reproducir el procedimiento utilizado en clase y no limitarse al resultado. Debe conocer el curso, tema, subtema y tipo de ejercicio antes de elegir el método. No introducir inferencia estadística, procedimientos de CCSS II ni métodos de cursos posteriores en contenidos de CCSS I.

### Estadística unidimensional · Tablas de frecuencias

Cuando el ejercicio requiera construir una tabla de frecuencias, presentarla ordenada y completa. Para datos no agrupados incluir, cuando corresponda:

- valor `xᵢ`;
- frecuencia absoluta `nᵢ`;
- frecuencia relativa `fᵢ`;
- frecuencia absoluta acumulada `Nᵢ`;
- frecuencia relativa acumulada `Fᵢ`.

Comprobar al final `∑nᵢ=N` y `∑fᵢ=1`, salvo pequeñas diferencias de redondeo. Si las frecuencias relativas se expresan como porcentaje, comprobar que su suma es aproximadamente `100 %`. No añadir columnas que no sean útiles para lo solicitado.

### Datos agrupados en intervalos

Seguir este orden:

1. Identificar y ordenar los intervalos.
2. Calcular cada marca de clase mediante `xᵢ=(extremo inferior+extremo superior)/2`.
3. Construir la tabla de frecuencias.
4. Añadir únicamente las columnas auxiliares necesarias.

Para la media de datos agrupados usar las marcas de clase como valores representativos:

`x̄=∑(xᵢ·nᵢ)/N`.

Cuando no se conozcan los datos individuales, explicar que el resultado es una estimación basada en las marcas de clase.

### Mediana y moda en datos agrupados

- Identificar siempre primero la clase mediana y la clase modal.
- Usar una fórmula de interpolación únicamente si está establecida en los materiales de CCSS I o en el propio ejercicio.
- Si solo se pide la clase mediana o la clase modal, no calcular innecesariamente un valor interpolado.
- No inventar una convención de interpolación distinta de la empleada por el profesor.

### Cuartiles, deciles y percentiles

Distinguir datos no agrupados y agrupados.

Para datos no agrupados:

1. Ordenar los datos.
2. Determinar `N`.
3. Localizar conceptualmente la posición mediante `Qₖ→kN/4`, `Dₖ→kN/10` o `Pₖ→kN/100`.
4. Interpretar una posición no entera con la convención establecida en los materiales del curso.

Para datos agrupados, localizar primero el intervalo mediante las frecuencias acumuladas. Interpolar dentro de él solo cuando el material del profesor establezca el procedimiento. No introducir automáticamente otra convención.

### Varianza y desviación típica

En estadística descriptiva de CCSS I, cuando se trabaja con la población o distribución completa del ejercicio, dividir entre `N`. No introducir la corrección `N−1` propia de estimación muestral si no se solicita.

Mostrar:

1. Media.
2. Desviaciones o fórmula equivalente.
3. Varianza.
4. `σ=√Var`.
5. Interpretación, cuando se solicite.

La desviación típica se expresa en las mismas unidades que la variable; la varianza, en unidades al cuadrado.

### Coeficiente de variación

Usar `CV=σ/|x̄|` y normalmente expresarlo como `CV=(σ/|x̄|)·100 %`.

- Menor `CV`: mayor homogeneidad relativa.
- Mayor `CV`: mayor dispersión relativa.
- No usarlo si la media es cero.
- Si la media está muy próxima a cero, advertir que su interpretación puede ser poco adecuada.

### Estadística bidimensional

Cuando corresponda, trabajar explícitamente con las variables `X` e `Y`, los pares `(xᵢ,yᵢ)`, la nube de puntos, las medias, la covarianza, el coeficiente de correlación, las rectas de regresión y las predicciones. No reducir el análisis a indicar únicamente el signo de la covarianza.

### Correlación lineal

Al calcular `r`, interpretar el signo y la intensidad:

- `r>0`: relación lineal positiva.
- `r<0`: relación lineal negativa.
- `r` próximo a `0`: escasa relación lineal apreciable.
- Cuanto más próximo esté `|r|` a `1`, mayor es la intensidad de la relación lineal.

No afirmar que «no existe relación» solo porque `r` sea próximo a cero. Escribir que no existe una relación **lineal** apreciable, porque podría existir una relación no lineal.

### Rectas de regresión

Calcular solo la recta o rectas solicitadas y distinguirlas correctamente:

- Para estimar `Y` a partir de `X`, usar la recta de regresión de `Y` sobre `X`.
- Para estimar `X` a partir de `Y`, usar la recta de regresión de `X` sobre `Y`.

No intercambiarlas. Cuando sea necesario, mostrar medias, covarianza, varianzas, pendiente y ordenada en el origen.

Antes de una predicción, valorar la intensidad de la correlación y la distancia del valor respecto al rango observado. Distinguir interpolación y extrapolación. Si el valor está dentro o cerca del rango y `|r|` es alto, la estimación puede considerarse razonablemente fiable. Si queda lejos del rango, indicar que es una extrapolación y que su fiabilidad disminuye.

### Probabilidad condicionada

Usar como método base `P(A|B)=P(A∩B)/P(B)`, con `P(B)>0`.

1. Definir los sucesos.
2. Identificar el suceso condicionante.
3. Calcular `P(A∩B)`.
4. Calcular `P(B)`.
5. Aplicar la fórmula.
6. Interpretar el resultado.

Puede emplearse tabla de contingencia, árbol o conteo directo cuando el contexto lo haga más claro.

### Independencia

El método preferente para comprobar independencia es `P(A∩B)=P(A)·P(B)`. También puede usarse `P(A|B)=P(A)` cuando `P(B)>0`. No asumir independencia porque los sucesos parezcan conceptualmente distintos; comprobarla cuando el ejercicio lo pida.

### Diagramas de árbol

No son obligatorios en todos los problemas. Usarlos preferentemente en etapas sucesivas, probabilidades condicionadas, extracciones, pruebas diagnósticas, decisiones encadenadas o cuando ayuden a distinguir visualmente los caminos. No dibujar un árbol si una fórmula directa o una tabla resulta más clara.

### Probabilidad total

Antes de aplicar el teorema, identificar una partición `B₁,B₂,…,Bₙ` formada por sucesos incompatibles dos a dos, exhaustivos y con probabilidad positiva cuando intervengan como condicionantes.

Usar `P(A)=∑P(Bᵢ)·P(A|Bᵢ)` y mostrar:

1. Definición de sucesos.
2. Partición.
3. Probabilidades de las ramas o casos.
4. Aplicación del teorema.
5. Cálculo.
6. Interpretación.

Puede utilizarse un árbol si mejora la comprensión.

### Teorema de Bayes

Elegir entre árbol, tabla o fórmula según el problema; no imponer siempre un árbol.

1. Definir sucesos.
2. Identificar probabilidades a priori.
3. Identificar probabilidades condicionadas.
4. Calcular mediante probabilidad total la probabilidad del suceso observado.
5. Aplicar Bayes.
6. Interpretar la probabilidad a posteriori.

Hacer visible de dónde proceden el numerador y el denominador. No limitarse a sustituir números sin definir los sucesos.

### Presentación de probabilidades

Siempre que sea razonable, conservar primero el valor exacto y dar después una aproximación decimal útil. Añadir porcentaje si el contexto lo aconseja. No es obligatorio presentar simultáneamente fracción, decimal y porcentaje: elegir la forma que responda mejor al enunciado.

### Distribución binomial · Identificación

Antes de usar una binomial, comprobar:

1. Número fijo de ensayos `n`.
2. Dos resultados relevantes por ensayo: éxito y fracaso.
3. Independencia de los ensayos.
4. Probabilidad de éxito `p` constante.

Definir `X` como número de éxitos, escribir `X∼B(n,p)` y, cuando sea necesario, `q=1−p`. En ejercicios rutinarios puede expresarse de forma compacta, pero la identificación debe quedar visible.

### Distribución binomial · Probabilidad exacta

Para `P(X=k)`, mostrar `n`, `p`, `q`, `k`, fórmula binomial, sustitución y resultado. No sustituir números antes de identificar cada parámetro.

### Distribución binomial · Probabilidades acumuladas

Traducir primero el lenguaje:

- «como máximo `k`» → `P(X≤k)`;
- «menos de `k`» → `P(X<k)`;
- «al menos `k`» → `P(X≥k)`;
- «más de `k`» → `P(X>k)`.

Elegir suma directa cuando haya pocos términos y complementario cuando reduzca claramente el cálculo. Mostrar siempre la equivalencia utilizada; no imponer uno de los dos métodos en todos los casos.

### Distribución binomial · Media, varianza y desviación típica

Para `X∼B(n,p)`, usar `μ=np`, `Var(X)=npq` y `σ=√(npq)`, con `q=1−p`. Interpretar `μ` como número esperado de éxitos cuando el contexto lo permita.

### Redondeo en binomial y normal

Conservar suficientes cifras durante el cálculo y no redondear prematuramente. Como criterio general, presentar probabilidades con cuatro decimales, salvo que el ejercicio, la tabla o el contexto exijan otra precisión. Adaptar los porcentajes al contexto y no forzar cuatro decimales en cantidades físicas o números de individuos.

### Distribución normal · Procedimiento

1. Definir la variable.
2. Identificar `μ` y `σ`.
3. Escribir `X∼N(μ,σ)`, según la convención de Margarita Salas.
4. Escribir la probabilidad original.
5. Tipificar dentro de la probabilidad mediante `Z=(X−μ)/σ`.
6. Transformar los extremos.
7. Utilizar tabla, simetría o complementario.
8. Calcular.
9. Comprobar `0≤P≤1`.

No calcular valores `z` aislados sin mantener visible la probabilidad que se está resolviendo.

### Convención de la tabla normal de CCSS I

Los materiales originales de CCSS I incluyen una tabla acumulada de la normal típica:

`Φ(z)=P(Z≤z)`.

Esta convención se ha comprobado visualmente en la tabla incluida al final de `4-Distribuciones continuas. Distribuición normal Ejercicios.doc`: los valores tabulados son probabilidades acumuladas y superan `0,5` para `z>0`. No tratar esos valores como áreas comprendidas entre `0` y `z`.

Al consultar la tabla:

- para `z≥0`, leer directamente `Φ(z)`;
- para valores negativos, usar `Φ(−z)=1−Φ(z)`;
- para colas derechas, usar `P(Z>z)=1−Φ(z)`;
- para intervalos, restar las probabilidades acumuladas correspondientes.

Mostrar la transformación realizada y no cambiar silenciosamente a otra convención de tabla.

### Simetría en la normal

Usar correctamente la simetría respecto de `0`. Evitar cálculos repetidos cuando una probabilidad pueda obtenerse por simetría, pero indicar expresamente la propiedad utilizada.

### Tipificación inversa

Cuando se busque un valor `x` a partir de una probabilidad:

1. Escribir la probabilidad.
2. Obtener el valor `z` con la tabla acumulada.
3. Plantear explícitamente `(x−μ)/σ=z`.
4. Despejar `x`.
5. Interpretar el resultado.

### Percentiles y cuantiles de la normal

1. Traducir el percentil o cuantil a una probabilidad acumulada.
2. Obtener `z` mediante la tabla.
3. Plantear `(x−μ)/σ=z`.
4. Despejar `x`.
5. Interpretar.

Por ejemplo, el percentil 90 exige buscar `x` tal que `P(X≤x)=0,90`.

### Aproximación binomial por normal · Pendiente

No activar ni formalizar todavía este procedimiento. Los ejercicios originales deben permanecer identificados y fuera del banco activo.

Se han revisado visualmente las páginas 2, 3 y 4 de `4-Distribuciones continuas. Distribuición normal Ejercicios.doc`, que contienen los problemas de aproximación binomial-normal. El documento muestra únicamente los enunciados: no incluye soluciones, transformaciones de los límites ni expresiones con `±0,5`. Por tanto, no permite determinar inequívocamente si el profesor utiliza corrección de continuidad.

La corrección de continuidad continúa siendo la única decisión pendiente de la política de CCSS I. No decidir por conocimiento general transformaciones como `P(X≤k)→P(Y≤k+0,5)` y no activar estos ejercicios hasta disponer de un material del profesor que muestre el procedimiento.

### Números reales · Fracción generatriz

- Decimal exacto: convertir a fracción decimal y simplificar.
- Decimal periódico puro: definir `x`, multiplicar por la potencia de diez correspondiente al período, restar las ecuaciones, despejar y simplificar.
- Decimal periódico mixto: definir `x`, desplazar primero la parte no periódica, desplazar después un período completo, restar, despejar y simplificar.

Cuando el objetivo sea obtener la fracción generatriz, no sustituir este desarrollo por una fórmula memorizada sin mostrar el procedimiento algebraico.

### Números reales · Error absoluto

Usar `Eₐ=|valor exacto−valor aproximado|`. Expresarlo en las mismas unidades que la magnitud y mostrar valor exacto, valor aproximado, diferencia, valor absoluto y resultado.

### Números reales · Error relativo

Usar `Eᵣ=Eₐ/|valor exacto|` cuando el valor exacto sea distinto de cero. Puede presentarse como decimal o porcentaje mediante `Eᵣ(%)=Eᵣ·100`. No redondear excesivamente antes del resultado final. Si el valor exacto es cero, indicar que esta fórmula no está definida.

### Números complejos · Forma polar

Cuando se incorporen ejercicios originales de forma polar, usar la notación establecida en los materiales del curso. Para `z=a+bi`, calcular primero el módulo `r=|z|=√(a²+b²)` y después el argumento `α`, teniendo en cuenta el cuadrante.

1. Identificar `a=Re(z)` y `b=Im(z)`.
2. Calcular `r=√(a²+b²)`.
3. Situar `(a,b)` en el plano complejo o identificar su cuadrante.
4. Calcular el argumento de referencia.
5. Determinar el argumento correcto según el cuadrante.
6. Expresar el complejo en forma polar con la notación adoptada por el profesor.

No obtener el argumento únicamente con calculadora sin justificar el cuadrante.

### Números complejos · Forma trigonométrica

Usar `z=r(cos α+i·sen α)`, donde `r=|z|` y `α=arg(z)`.

1. Calcular módulo.
2. Calcular argumento.
3. Determinar el cuadrante.
4. Escribir la forma trigonométrica.

Usar `sen`, no `sin`, en la presentación al alumno.

### Números complejos · Paso a forma binómica

Si `z=r(cos α+i·sen α)`, calcular `a=r cos α` y `b=r sen α`, mostrar las sustituciones y concluir `z=a+bi`. Mantener valores exactos cuando las razones trigonométricas sean notables y resulte razonable.

### Números complejos · Producto y cociente en forma polar

Para el producto, multiplicar módulos y sumar argumentos. Si los complejos tienen módulos `r₁`, `r₂` y argumentos `α`, `β`, mostrar:

1. Módulos y argumentos.
2. Producto `r₁r₂`.
3. Suma `α+β`.
4. Resultado.

Para el cociente, comprobar primero que el denominador sea distinto de cero, dividir módulos y restar argumentos. Mostrar módulos, argumentos, cociente de módulos, diferencia de argumentos y resultado.

### Números complejos · Fórmula de Moivre

Si `z=r(cos α+i·sen α)`, usar:

`zⁿ=rⁿ[cos(nα)+i·sen(nα)]`.

1. Identificar `r` y `α`.
2. Calcular `rⁿ`.
3. Calcular `nα`.
4. Escribir el resultado en forma trigonométrica.
5. Pasar a binómica solo si se solicita o resulta conveniente.

No desarrollar una potencia elevada mediante productos binómicos cuando Moivre sea el procedimiento natural.

### Números complejos · Raíces n-ésimas

1. Escribir el complejo en forma polar o trigonométrica.
2. Calcular la raíz n-ésima del módulo.
3. Obtener los argumentos `(α+2kπ)/n`, para `k=0,1,…,n−1`.
4. Obtener exactamente `n` raíces distintas si `z≠0`.
5. Escribir cada raíz en forma polar o trigonométrica.
6. Pasar a binómica si se solicita.

Cuando aporte valor didáctico, representar las raíces en el plano complejo: sobre una circunferencia centrada en el origen, con el mismo módulo y separadas por un ángulo `2π/n`. La figura debe ayudar a comprender la distribución, no ser decorativa.

### Ecuaciones de grado superior · Ruffini

Cuando Ruffini sea aplicable:

1. Ordenar el polinomio.
2. Completar términos ausentes con coeficiente cero.
3. Buscar posibles raíces enteras entre los divisores del término independiente, cuando corresponda.
4. Probar candidatos razonadamente.
5. Aplicar Ruffini.
6. Obtener el cociente.
7. Continuar factorizando si procede.
8. Resolver los factores restantes.
9. Dar todas las soluciones.

No probar valores aleatoriamente sin explicar de dónde proceden.

### Ecuaciones irracionales

1. Determinar condiciones de existencia cuando corresponda.
2. Aislar un radical.
3. Elevar ambos miembros a la potencia necesaria.
4. Simplificar.
5. Repetir si queda otro radical.
6. Resolver la ecuación obtenida.
7. Comprobar todas las soluciones en la ecuación original.
8. Descartar expresamente las soluciones extrañas.

La comprobación final es obligatoria porque elevar al cuadrado puede introducir soluciones no válidas.

### Sistemas no lineales

No imponer un método único:

- Preferir sustitución si una incógnita está despejada o se despeja fácilmente.
- Preferir igualación si ambas ecuaciones permiten despejar fácilmente la misma expresión.
- Usar reducción cuando la estructura permita eliminar directamente una expresión.

Mostrar identificación del sistema, elección del método, reducción a una ecuación en una incógnita, resolución, recuperación de la otra incógnita, todos los pares solución y comprobación en el sistema original. No usar Gauss en sistemas no lineales.

### Sistemas de inecuaciones de dos variables

1. Sustituir cada desigualdad por igualdad para identificar su recta frontera.
2. Representar cada recta.
3. Distinguir frontera no incluida en desigualdades estrictas y frontera incluida en las no estrictas.
4. Elegir un punto de prueba; preferentemente `(0,0)` si no pertenece a la frontera.
5. Sustituir el punto.
6. Determinar el semiplano que satisface cada inecuación.
7. Identificar o sombrear los semiplanos.
8. Hallar su intersección.
9. Destacar la región solución.

La solución debe incluir una representación gráfica con ejes, rectas frontera, tipo de frontera, semiplanos y región común. No limitarse a una lista de desigualdades. En problemas contextualizados, interpretar además el significado de la región.

### Tema 9 · Funciones antes de las derivadas

En el Tema 9, estudiar monotonía y extremos **sin derivadas**. Reservar `f′(x)` para el Tema 11, Aplicación de derivadas. Usar lectura de gráficas, propiedades algebraicas sencillas, comparación de valores y comportamiento observable.

Puede estudiarse reconocimiento gráfico de continuidad, continuidad por tramos, puntos de discontinuidad y comportamiento lateral necesario para interpretar una gráfica. No usar L’Hôpital. Los límites laterales elementales pueden emplearse de forma conceptual o algebraica, pero el desarrollo mediante derivadas pertenece a los temas posteriores.

### Combinatoria · Decisión previa

Antes de escoger una fórmula, responder conceptualmente:

1. ¿Influye el orden?
2. ¿Se pueden repetir elementos?
3. ¿Intervienen todos los elementos?

No decidir únicamente por palabras como «ordenar», «elegir» o «seleccionar».

### Números combinatorios

Mostrar la fórmula y simplificar factoriales antes de efectuar productos innecesariamente grandes. No depender solo de `nCr`. Si se estudia una propiedad, escribirla antes de sustituir.

### Triángulo de Pascal

1. Colocar `1` en los extremos.
2. Obtener cada elemento interior sumando los dos situados encima.
3. Relacionar sus elementos con números combinatorios cuando se solicite.

Mostrar únicamente las filas necesarias.

### Binomio de Newton

Para `(a+b)ⁿ`, usar coeficientes binomiales. Mostrar la estructura general cuando tenga valor didáctico. Cada término debe contener el coeficiente binomial, una potencia decreciente de `a` y una potencia creciente de `b`; comprobar que sus exponentes suman `n`.

Para `(a−b)ⁿ`, controlar la alternancia de signos interpretándolo, cuando ayude, como `(a+(−b))ⁿ`.

### Término cualquiera y coeficiente de un término

Con índice `k` iniciado en cero, usar `Tₖ₊₁=C(n,k)·aⁿ⁻ᵏ·bᵏ`. Si se pide el término `m`-ésimo, indicar explícitamente `k=m−1`.

Para hallar el coeficiente de una potencia concreta:

1. Escribir el término general.
2. Igualar el exponente al solicitado.
3. Resolver el índice.
4. Sustituirlo en el término.
5. Obtener el coeficiente.

No desarrollar todo el binomio si solo se necesita un término.

### Temas 10, 11 y 12 · Derivadas, aplicación de derivadas y combinatoria

Esta política es específica de Matemáticas Aplicadas a las Ciencias Sociales I. Los temas son entidades propias a efectos de progreso, aunque puedan reutilizar ejercicios fuente compatibles de Matemáticas I.

### Tema 10 · Derivadas

- Cubrir únicamente contenidos presentes en la infografía maestra de CCSS I: concepto e interpretación geométrica de la derivada, derivadas laterales, continuidad y derivabilidad, función derivada, rectas tangente y normal, álgebra de derivadas, regla de la cadena, funciones simples y compuestas, potenciales, raíces, logaritmos, exponenciales, trigonométricas, trigonométricas inversas y derivadas sucesivas.
- Se pueden reutilizar ejercicios de Derivadas de Matemáticas I cuando pertenezcan a esos contenidos y tengan nivel de 1.º de Bachillerato. No duplicar físicamente el ejercicio si puede compartirse como fuente.
- Quedan excluidos contenidos de Matemáticas II, de CCSS II o ajenos a la infografía.
- La regla de L’Hôpital está prohibida. En particular, no debe aparecer ni siquiera para abreviar el límite del cociente incremental.
- Para una derivada por definición, mostrar en este orden: `f(a+h)`, `f(a)`, diferencia, cociente incremental, simplificación algebraica, límite cuando `h→0` y resultado.
- Para la recta tangente, calcular `f(a)`, `f'(x)` y `f'(a)`; identificar el punto `(a,f(a))` y la pendiente `m=f'(a)`; usar preferentemente `y-y₀=m(x-x₀)`.
- Para la normal, calcular la pendiente perpendicular y estudiar expresamente el caso de tangente horizontal. No aplicar `−1/m` cuando `m=0` como si la normal tuviera pendiente finita.

### Tema 11 · Aplicación de derivadas

- Cubrir crecimiento y decrecimiento, máximos y mínimos, optimización, segunda derivada, concavidad o curvatura, puntos de inflexión y estudio completo de funciones: dominio, continuidad y derivabilidad, simetría, periodicidad, cortes con los ejes, asíntotas verticales, horizontales y oblicuas, puntos singulares, monotonía, extremos, curvatura y representación gráfica.
- Se pueden reutilizar ejercicios de Aplicación de derivadas de Matemáticas I cuando sean compatibles con la infografía y el nivel de CCSS I. No introducir contenidos de cursos posteriores.
- Para crecimiento y decrecimiento, el método preferente es el signo de `f'`: determinar dominio, calcular `f'`, resolver `f'(x)=0`, añadir los puntos relevantes excluidos del dominio, estudiar cada intervalo y concluir monotonía y extremos.
- Clasificar preferentemente los extremos por el cambio de signo de `f'`: `+→−` indica máximo y `−→+` indica mínimo. La segunda derivada puede comprobar el resultado, pero no sustituye el estudio de signo cuando se pide monotonía o extremos.
- Para concavidad y puntos de inflexión, calcular `f''`, resolver `f''(x)=0`, añadir puntos relevantes del dominio, estudiar el signo de `f''` y comprobar un cambio real de curvatura. La igualdad `f''(a)=0` por sí sola no demuestra un punto de inflexión.
- En un estudio completo de una función, seguir el orden: dominio; continuidad y derivabilidad; simetría; periodicidad; cortes con los ejes; asíntotas verticales, horizontales y oblicuas; puntos críticos o singulares; crecimiento y decrecimiento; máximos y mínimos; concavidad o curvatura; puntos de inflexión; representación gráfica.
- En optimización: interpretar, definir variables, plantear restricciones, construir la función objetivo, reducirla a una variable, fijar el dominio válido, derivar, hallar puntos críticos, estudiar `f'` cuando corresponda, comprobar extremos del dominio, elegir el extremo, interpretar y dar unidades.
- En conjuntos e intervalos, mantener la convención docente completa cuando proceda: `D={∀x∈ℝ | condición}=intervalo`, conservando llaves, `∀`, `∈`, `ℝ`, condición e intervalos.

### Tema 12 · Combinatoria

- Mantener variaciones, variaciones con repetición, permutaciones, permutaciones con repetición, combinaciones, combinaciones con repetición, factorial, números combinatorios, sus propiedades, triángulo de Pascal, binomio de Newton y término general de un desarrollo.
- Antes de escoger una fórmula, razonar explícitamente: si influye el orden, si se pueden repetir elementos y si intervienen todos los elementos. No decidir únicamente por palabras clave del enunciado.
- Mantener los ejercicios activos y conectar prioritariamente los originales aportados para CCSS I, en especial los de combinaciones con repetición, números combinatorios, triángulo de Pascal y binomio de Newton. No inventar sustitutos mientras exista un original legible pendiente de incorporar.
- Si una fórmula o expresión del original no puede recuperarse con fidelidad, no reconstruirla por conjetura: dejar ese ejercicio pendiente de transcripción fiable.

## Política didáctica formalizada de 2.º de Bachillerato · Matemáticas Aplicadas a las CCSS II

Esta sección rige exclusivamente Matemáticas Aplicadas a las Ciencias Sociales II. Reutiliza las políticas ya cerradas de Matemáticas II y CCSS I solo cuando sean compatibles con el contenido y la profundidad reales de CCSS II. Si existe una diferencia, prevalece esta sección. No trasladar automáticamente técnicas de Matemáticas II por el mero hecho de ser matemáticamente válidas.

### Reglas transversales

- Distinguir siempre entre método matemáticamente válido y método didácticamente permitido en CCSS II. Las soluciones, pistas, explicaciones de IA y paneles «Cómo se resuelve» deben usar únicamente el segundo.
- Priorizar la solución específica validada del ejercicio. Si no existe, generar la explicación únicamente con esta política y las reglas compatibles heredadas. Si no puede garantizarse una resolución fiable, indicar «Resolución detallada no disponible».
- Mantener el desarrollo paso a paso, la notación matemática compuesta y la interpretación contextual cuando corresponda. No sustituir el procedimiento por el resultado final.
- Heredar de Matemáticas II, cuando corresponda: matrices, determinantes, inversa, ecuaciones matriciales, rango, sistemas con parámetros, Rouché-Frobenius, estudio de extremos mediante el signo de `f'`, optimización y áreas con representación gráfica.
- Heredar de CCSS I, cuando corresponda: probabilidad condicionada, independencia, probabilidad total, Bayes, binomial exacta, probabilidades acumuladas, normal ordinaria y la tabla acumulada a la izquierda `Φ(z)=P(Z≤z)`.

### Tema 1 · Matrices

- Aplicar la política de Matemáticas II para operaciones con matrices, potencias, ecuaciones matriciales e inversa.
- Mostrar dimensiones, compatibilidad de productos, operaciones en el orden correcto y resultado matricial con filas y columnas alineadas.
- En ecuaciones matriciales, respetar que el producto matricial no es conmutativo y justificar cada multiplicación por una inversa.

### Tema 2 · Determinantes

- Aplicar la política de Matemáticas II para cálculo de determinantes, propiedades, rango e invertibilidad.
- Justificar que una matriz cuadrada es invertible mediante determinante no nulo cuando corresponda.
- No limitar la solución a un valor aislado: mostrar el procedimiento adecuado al orden y a la estructura del determinante.

### Tema 3 · Sistemas con determinantes

#### Sistemas lineales ordinarios

- Para sistemas lineales ordinarios se permiten Gauss y Cramer. Elegir según la estructura, no de forma automática.
- Preferir Cramer en sistemas `3×3` con determinantes manejables y Gauss cuando la eliminación sea especialmente sencilla o los determinantes resulten innecesariamente complejos.
- En problemas contextualizados: definir las incógnitas con unidades, traducir el texto a tres ecuaciones, resolver, interpretar cada valor en el contexto y comprobar su coherencia.

#### Sistemas con parámetros

- Aplicar la política de Matemáticas II: formar la matriz de coeficientes `A` y la ampliada `A*`, estudiar sus rangos y comparar ambos con el número de incógnitas mediante Rouché-Frobenius.
- Distinguir explícitamente sistema compatible determinado, compatible indeterminado e incompatible, y resolver todos los casos compatibles que pida el enunciado.
- No usar Cramer como sustituto del estudio de rangos cuando el sistema contiene parámetros y se solicita su discusión.

### Tema 4 · Programación lineal

- Resolver los problemas de programación lineal en dos variables mediante el método gráfico. No usar el método símplex salvo que un material concreto y previamente auditado lo exija expresamente.
- La resolución debe seguir este orden:
  1. Interpretar el contexto.
  2. Definir las variables de decisión y sus unidades.
  3. Escribir la función objetivo e indicar si se maximiza o minimiza.
  4. Traducir todas las restricciones, incluidas las de no negatividad cuando correspondan.
  5. Convertir cada frontera en igualdad.
  6. Representar las rectas frontera.
  7. Determinar el semiplano válido de cada restricción.
  8. Obtener la región factible.
  9. Calcular exactamente todos sus vértices.
  10. Evaluar la función objetivo en cada vértice.
  11. Comparar los valores.
  12. Identificar el óptimo o explicar los casos especiales si los hubiera.
  13. Interpretar la solución en el contexto.
  14. Incluir las unidades.
  15. Comprobar que la solución satisface las restricciones.
- La gráfica es didácticamente obligatoria y debe ser matemáticamente coherente: ejes, rectas frontera, semiplanos, región factible sombreada, vértices identificados y punto o segmento óptimo. No admitir una gráfica meramente decorativa.
- Para una futura solución estructurada, registrar conceptualmente `visualRequired: true` y `visualType: "linear-programming-region"`. Esta regla expresa una necesidad didáctica y no presupone una implementación concreta.

### Tema 5 · Límites y continuidad

#### Prohibición absoluta de L’Hôpital

- La regla de L’Hôpital está prohibida en CCSS II en todos los límites. No debe aparecer en soluciones, pistas, explicaciones, paneles «Cómo se resuelve», respuestas generadas por IA ni variantes automáticas.
- No heredar de Matemáticas II ninguna regla que permita L’Hôpital.

#### Procedimientos permitidos

- Empezar por la sustitución directa y clasificar, si aparece, la indeterminación.
- En límites `0/0`: factorizar, simplificar, usar identidades algebraicas y racionalizar mediante el conjugado cuando haya radicales.
- En límites `∞/∞`: comparar grados o dividir entre la potencia dominante.
- En límites `∞−∞`: reducir a común denominador, racionalizar mediante el conjugado o transformar algebraicamente la expresión.
- En límites `0·∞`: transformar el producto en un cociente y aplicar las técnicas algebraicas permitidas.
- En indeterminaciones de tipo potencia, usar únicamente los métodos que aparezcan realmente en los materiales de CCSS II. No importar procedimientos no trabajados ni completar por conjetura una regla ausente.
- En límites trigonométricos, incluirlos solo si aparecen en materiales reales de CCSS II y resolverlos con límites fundamentales y transformaciones algebraicas compatibles, nunca con L’Hôpital. No inventar esta categoría para rellenar el banco.
- En continuidad, calcular los límites laterales y el valor de la función, compararlos y justificar de forma explícita la continuidad o el tipo de discontinuidad.

### Tema 6 · Derivadas y aplicaciones

- Aplicar las reglas compatibles de Matemáticas II para derivación, recta tangente, monotonía, extremos, curvatura, puntos de inflexión, representación y optimización.
- Para justificar máximos y mínimos, usar preferentemente el cambio de signo de `f'`; no considerar suficiente resolver `f'(x)=0` sin estudiar el signo o aportar la justificación que corresponda.
- En optimización: definir la variable, expresar la función objetivo y su dominio, derivar, localizar candidatos, comprobar el carácter del extremo e interpretar el resultado con unidades.

### Tema 7 · Integrales indefinidas

- En CCSS II, las integrales indefinidas están disponibles únicamente en Práctica por temas y se limitan a integrales inmediatas.
- Se permiten polinomios, potencias, raíces transformadas en potencias, exponenciales sencillas, funciones de tipo `1/x`, combinaciones lineales, primitivas inmediatas y transformaciones algebraicas sencillas necesarias para reconocerlas.
- Están prohibidos integración por partes, fracciones simples, sustituciones complejas, métodos especiales e integrales trigonométricas avanzadas.
- No heredar automáticamente de Matemáticas II técnicas de integración que excedan este nivel.
- Mostrar la linealidad o transformación utilizada, aplicar la primitiva inmediata correspondiente, simplificar y terminar siempre con la constante `+C`.
- Estas integrales no están disponibles en Examen por bloques ni en Examen de CCSS II mientras la referencia oficial adoptada no contenga ejercicios específicos de este tipo.

### Tema 8 · Integrales definidas

#### Cálculo mediante Barrow

- Admitir primitivas inmediatas y transformaciones algebraicas sencillas. No usar integración por partes, descomposición general en fracciones simples ni técnicas avanzadas salvo que un material concreto del profesor las exija expresamente.
- Aplicar la regla de Barrow como `F(b)−F(a)`. No añadir `+C` en el resultado de una integral definida.
- Distinguir siempre integral definida y área geométrica: la integral definida puede ser negativa, mientras que el área se presenta como magnitud no negativa.

#### Áreas

- Heredar de Matemáticas II la obligación de una representación gráfica matemáticamente correcta.
- Entre una función y el eje: hallar los cortes, determinar los intervalos y el signo de la función, representar la gráfica y la región, separar la integral si cambia de signo y sumar áreas positivas.
- Entre dos funciones: hallar las intersecciones, determinar qué función queda arriba en cada intervalo, representar y sombrear la región, integrar `función superior − función inferior`, separar por intervalos si cambia el orden y presentar un área positiva.
- La gráfica debe contener ejes, funciones, cortes, límites relevantes y región sombreada. Para una futura solución estructurada, registrar conceptualmente `visualRequired: true` y `visualType: "area-graph"`.
- En Práctica por temas pueden usarse ejercicios matemáticamente compatibles de Matemáticas II conservando su fuente original; no presentarlos como PAU CCSS II.
- Las integrales definidas no están disponibles en Examen por bloques ni en Examen de CCSS II mientras la referencia oficial adoptada no contenga ejercicios específicos de este tipo.

### Tema 9 · Probabilidad

- Aplicar las reglas compatibles de CCSS I para operaciones con sucesos, probabilidad condicionada, independencia, diagramas de árbol, probabilidad compuesta, probabilidad total y Bayes.
- Definir los sucesos, organizar los datos, justificar la fórmula elegida, sustituir valores y cerrar con una interpretación contextual. No saltar directamente a un decimal.

### Tema 10 · Distribución binomial y normal

#### Binomial exacta y normal ordinaria

- Heredar de CCSS I la identificación de `n`, `p` y `q`, la fórmula binomial, las probabilidades acumuladas y el uso de la distribución normal.
- En CCSS II la tabla normal representa el acumulado a la izquierda: `Φ(z)=P(Z≤z)`. Para una cola derecha usar `1−Φ(z)`; para un intervalo, la diferencia de acumuladas; para valores negativos, la simetría correspondiente.

#### Aproximación de la binomial por la normal

- La aproximación forma parte del material real de CCSS II y debe seguir el teorema de De Moivre.
- Para `X~B(n,p)`, identificar `n` y `p`, calcular `q=1−p`, `np` y `nq`, y comprobar explícitamente las dos condiciones `np≥5` y `nq≥5`. Ambas son obligatorias.
- Si se cumplen las dos condiciones, aproximar mediante una normal de media `μ=np` y desviación típica `σ=√(npq)`, escrita con la notación adoptada en Margarita Salas: `Y~N(np,√(npq))`.
- Si `np<5` o `nq<5`, no usar ni forzar la aproximación normal mediante De Moivre. Resolver mediante la distribución binomial exacta cuando corresponda.
- Aplicar obligatoriamente la corrección por continuidad:
  - `P(X=k)` pasa a `P(k−0,5<Y<k+0,5)`.
  - `P(X≤k)` pasa a `P(Y<k+0,5)`.
  - `P(X<k)` pasa a `P(Y<k−0,5)`.
  - `P(X≥k)` pasa a `P(Y>k−0,5)`.
  - `P(X>k)` pasa a `P(Y>k+0,5)`.
  - En un intervalo, corregir ambos extremos según sean abiertos o cerrados.
- El procedimiento completo debe mostrar, en este orden: identificación de `n` y `p`; cálculo de `q`; comprobación de `np≥5` y `nq≥5`; cálculo de `μ` y `σ`; escritura de la normal aproximante; escritura del suceso binomial original; corrección de continuidad; tipificación `Z=(Y−μ)/σ` dentro de la probabilidad; uso de `Φ(z)=P(Z≤z)`; cálculo; comprobación `0≤P≤1`; e interpretación contextual cuando corresponda.

### Tema 11 · Muestreo e inferencia estadística

- Incluir únicamente contenidos que aparezcan realmente en los materiales de CCSS II: distribución de la media muestral, proporciones cuando estén presentes, intervalos de confianza, nivel de confianza, error máximo, tamaño muestral e interpretación.
- No introducir automáticamente distribución `t` de Student ni contrastes de hipótesis. Si los materiales no contienen de forma inequívoca hipótesis nula, alternativa, región crítica, `p`-valor o contraste, no enseñarlos ni usarlos.

#### Intervalo de confianza para la media con desviación típica poblacional conocida

- Identificar `x̄`, `σ`, `n` y el nivel de confianza.
- Calcular `α=1−nivel de confianza`, obtener `z_(α/2)`, calcular `E=z_(α/2)·σ/√n` y construir el intervalo `x̄±E`.
- Interpretar el intervalo en el contexto de la población mediante una lectura frecuentista. No afirmar que, una vez calculado, existe una probabilidad del 95 % de que `μ` esté dentro de ese intervalo concreto.

#### Intervalo de confianza para una proporción

- Resolverlo solo si aparece en el material real. Identificar `p̂`, `n`, el nivel de confianza y el valor crítico; aplicar exactamente la fórmula trabajada en el curso, construir el intervalo e interpretarlo en contexto.
- No sustituir la fórmula del material por otra variante externa.

#### Tamaño muestral

- Para una media, partir de `E=z_(α/2)·σ/√n`, despejar `n` y redondear siempre hacia arriba.
- Para una proporción, usar la fórmula del curso y redondear siempre hacia arriba.
- No imponer automáticamente el caso conservador `p=q=0,5` salvo que el material lo indique o el profesor lo haya establecido expresamente cuando no existe estimación previa.

## Opciones de respuesta para retos

- Si el ejercicio ya incluye opciones, conservarlas todas y respetar literalmente su contenido.
- Si el ejercicio es abierto y el reto necesita opciones, crear normalmente cuatro: una correcta y tres distractores distintos y plausibles basados en errores frecuentes.
- Evitar opciones duplicadas, ambiguas, incompletas o con formas incompatibles entre sí.
- En ejercicios con varios apartados evaluables, conservar un único enunciado común, pero presentar cada apartado por separado. Cada apartado debe tener sus propias cuatro opciones, exactamente una correcta, su corrección y su solución; no unir los resultados de todos los apartados dentro de una misma opción larga. Tratar cada apartado como una unidad puntuable independiente para permitir asignarle puntuación propia.
- En 2.º de Bachillerato, mostrar siempre junto al enunciado únicamente la convocatoria oficial conservada en el banco: mes o sesión —junio, julio, septiembre o reserva— y año. No añadir en esa etiqueta el número ni la letra originales del ejercicio, aunque permanezcan dentro del enunciado literal. No deducir ni inventar convocatorias ausentes.
- No revelar la respuesta correcta antes de que el alumno responda. Después, ofrecer la solución completa si el alumno desea verla.
- En todos los cursos de ESO, 1.º y 2.º de Bachillerato, mantener un historial persistente por alumno, curso, nivel del reto y ámbito del banco —tema, aventura, bloque o tipo de pregunta del examen—. Registrar un ejercicio en ese historial en cuanto el alumno llega a verlo, sin exigir que lo responda ni que complete todo el reto. Si repite el reto, abandona uno incompleto o vuelve a entrar otro día, excluir todos los ejercicios ya vistos hasta agotar el banco correspondiente.
- Reiniciar el ciclo únicamente cuando todos los ejercicios disponibles de ese banco hayan sido vistos. Al cruzar el final de un ciclo, conservar el número obligatorio de preguntas y no repetir un ejercicio dentro del mismo reto.
- Como objetivo de variedad, preparar en ESO un mínimo de 30 estructuras distintas por tema y por nivel (Aprendiz y Maestro), cambiando el tipo y la combinación de operaciones, no solo los datos. En 1.º de Bachillerato, procurar unas 32 preguntas distintas por tema. En 2.º de Bachillerato, recorrer el banco oficial completo aportado por el usuario y no inventar enunciados para alcanzar una cifra artificial.
- En 2.º de Bachillerato, escoger siempre los enunciados oficiales de los bancos corregidos aportados por el usuario; no inventar ejercicios para rellenar una ronda ni sustituirlos por versiones antiguas del enunciado.

### Comunidad autónoma en 2.º de Bachillerato

- Cuando la interfaz permita elegir comunidad autónoma, esa elección forma parte obligatoria del ámbito del banco. Temas, bloques y examen deben consultar exclusivamente ejercicios de la comunidad seleccionada; queda prohibido completar una ronda mezclando comunidades.
- El historial de ejercicios vistos y el ciclo de no repetición deben estar separados por alumno, curso, modalidad, comunidad autónoma y ámbito. Cambiar de comunidad no borra ni reutiliza el historial de la otra.
- Castilla-La Mancha conserva sus bancos, soluciones e historiales actuales. La incorporación de otra comunidad no autoriza a recalcular, reclasificar ni sustituir datos ya guardados.
- En Madrid, conservar literalmente el enunciado oficial. La etiqueta visible de procedencia debe mostrar `Problema · convocatoria · año`; omitir la convocatoria si la fuente no permite identificarla con seguridad. No mostrar en esa etiqueta la numeración interna del problema ni la puntuación PAU.
- Los solucionarios oficiales sirven para verificar el procedimiento y el resultado, pero no autorizan a alterar el enunciado ni a importar métodos incompatibles con las indicaciones didácticas del usuario. Si existe conflicto, prevalecen las instrucciones expresas del usuario y la política específica del curso.
- En ejercicios de distribuciones, asignar explícitamente el recurso necesario: `binomial`, `normal` o ninguno. Mostrar la tabla en un panel o desplegable solo cuando el ejercicio la requiera; no decidirlo mediante coincidencias vagas de palabras ni mostrar ambas tablas por defecto.

## Tablas, figuras y expresiones

- Reproducir toda tabla necesaria para resolver el ejercicio, especialmente en Probabilidad y Estadística.
- Si una tabla o figura no cabe en la tarjeta, mostrarla en un panel o desplegable accesible sin perder datos.
- Mantener alineadas filas, columnas, encabezados y totales; comprobar que las probabilidades y frecuencias son coherentes.
- No sustituir una figura imprescindible por una descripción aproximada.
- Mostrar las fracciones con composición vertical: numerador arriba, barra horizontal y denominador abajo. La forma lineal `a/b` puede existir internamente, pero no debe quedar como presentación matemática final visible para el alumno.
- En coordenadas de puntos, componer cada coordenada fraccionaria por separado y dejar la coma fuera de las fracciones; por ejemplo, `P(frac{−1}{3}, frac{20}{27})`. Comprobar que el denominador de la primera coordenada no absorbe el numerador de la segunda.
- Mostrar las matrices como estructuras bidimensionales, con sus elementos alineados en filas y columnas y encerrados entre paréntesis grandes. No escribir matrices como `[[a,b],[c,d]]`, listas separadas por comas ni cadenas en una sola línea.
- Mostrar los determinantes con barras verticales, los sistemas con una llave común y ecuaciones alineadas, y los vectores con la flecha colocada encima del nombre.
- Usar el componente o editor de ecuaciones disponible en el formato de destino. Comprobar visualmente que fracciones, matrices, sistemas, exponentes, subíndices y símbolos se renderizan correctamente antes de entregar.

## Control de calidad

Antes de entregar o incorporar un ejercicio:

- Comparar el enunciado con la fuente, apartado por apartado.
- Confirmar que exactamente una opción es correcta cuando el formato sea tipo test.
- Rehacer mentalmente las operaciones críticas y comprobar signos, dominios, unidades y redondeos.
- Verificar que la explicación conduce al resultado indicado y que no usa un método contrario a estas instrucciones.

## Archivos del proyecto

Cuando el trabajo requiera generar archivos, guardarlos únicamente dentro de la carpeta del proyecto Codex indicada por el usuario. Mantener los temporales en una carpeta específica del proyecto y eliminarlos cuando dejen de ser necesarios. Eliminar solo archivos creados durante el trabajo; no modificar ni borrar otros archivos de OneDrive.

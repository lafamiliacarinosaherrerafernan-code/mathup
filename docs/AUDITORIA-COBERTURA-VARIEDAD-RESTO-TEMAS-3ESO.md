# Auditoría de cobertura y variedad — resto de temas de 3.º ESO

Fecha: 9 de agosto de 2026.

## Alcance y restricciones

Esta auditoría analiza exclusivamente los siete temas de 3.º ESO que aparecen actualmente en la aplicación con estos nombres:

1. `Numeros reales`.
2. `Potencias y raices`.
3. `Expresiones algebraicas`.
4. `Ecuaciones y sistemas de ecuaciones`.
5. `Sucesiones`.
6. `Cuerpos geometricos`.
7. `Probabilidad`.

Quedan excluidos `Proporcionalidad`, `Funciones` y `Estadistica`, ya cerrados en la ampliación anterior.

No se ha añadido, eliminado, sustituido, reasignado ni modificado ningún ejercicio. Tampoco se han modificado la skill, exámenes, imágenes, recursos, otros temas ni otros cursos.

## Cómo se han calculado las cifras

La Práctica por temas combina tres capas:

- 240 entradas generadas para Aprendiz y 240 para Maestro en cada tema;
- ejercicios originales conectados específicamente al nivel;
- ejercicios de exámenes verificados, que actualmente se incorporan a Maestro.

Por ello se distinguen tres medidas:

- **Entradas brutas:** elementos que llegan al selector antes de eliminar repeticiones.
- **Ejercicios exactos distintos:** enunciados distintos después de descontar repeticiones literales.
- **Variedad efectiva:** procedimientos o estructuras matemáticas distintas, agrupando las variantes que solo cambian números o contexto.

La cantidad elevada de variantes numéricas no se considera por sí sola cobertura suficiente.

## Resumen numérico

| Tema | Entradas brutas Aprendiz | Exactos distintos Aprendiz | Entradas brutas Maestro | Exactos distintos Maestro | Total exacto distinto entre niveles | Estructuras efectivas Aprendiz | Estructuras efectivas Maestro |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Numeros reales | 242 | 218 | 268 | 258 | 462 | 12 | 34 |
| Potencias y raices | 243 | 221 | 247 | 190 | 407 | 14 | 13 |
| Expresiones algebraicas | 242 | 196 | 258 | 130 | 259 | 10 | 22 |
| Ecuaciones y sistemas de ecuaciones | 242 | 140 | 275 | 169 | 281 | 8 | 39 |
| Sucesiones | 242 | 208 | 254 | 190 | 384 | 12 | 20 |
| Cuerpos geometricos | 243 | 76 | 254 | 77 | 122 | 12 | 23 |
| Probabilidad | 245 | 237 | 243 | 243 | 459 | 12 | 7 |

Los valores de variedad efectiva incluyen las estructuras documentales conectadas. En Maestro pueden elevarse por enunciados oficiales individualizados, aunque varios utilicen el mismo procedimiento. Por eso se analiza también cualitativamente cada tema.

## 1. Numeros reales

### Composición actual

- Aprendiz: 240 generados y 2 originales.
- Maestro: 240 generados, 2 originales y 26 ejercicios verificados.
- Repeticiones exactas dentro del pool: 24 en Aprendiz y 10 en Maestro.

### Subtipos y frecuencia aproximada

- Operaciones aritméticas directas o combinadas: las 480 variantes generadas. Se concentran en unas 10 estructuras Aprendiz y 6 Maestro.
- Clasificación de números: 2 ejercicios documentales.
- Representación en la recta de fracciones o radicales: aproximadamente 6.
- Fracción generatriz y operaciones con decimales periódicos: aproximadamente 3.
- Error absoluto y relativo: 3.
- Notación científica: 2 operaciones documentales.
- Radicales y operaciones con potencias/fracciones: aproximadamente 7–8, con solapamiento temático con `Potencias y raices`.
- Problemas contextualizados con fracciones: 4 conectados; se concentran en Maestro salvo dos originales Aprendiz.
- Tablas o recursos visuales: ninguno activo. Algunos ejercicios de recta numérica deberían contar con representación, pero actualmente no llevan recurso visual.

### Variedad y carencias

Maestro tiene una cobertura documental razonablemente amplia. Aprendiz, en cambio, está dominado por operaciones aritméticas de nivel inferior y apenas introduce las ideas específicas del tema.

Están poco representados en Aprendiz:

- clasificación entre naturales, enteros, racionales, irracionales y reales;
- intervalos;
- fracción generatriz;
- aproximaciones, redondeo y errores;
- notación científica;
- representación de racionales e irracionales.

### Posible contaminación

No se detectan fuentes de 2.º o 4.º ESO. Sí existe una **frontera temática poco limpia**: varios ejercicios de radicales, potencias y notación científica procedentes del examen conjunto de los temas 1 y 2 aparecen en `Numeros reales`, aunque podrían corresponder a `Potencias y raices`. No se corrige en esta fase.

### Material disponible

**PARCIAL.** Fuentes localizadas:

- `documentos/3º ESO/Temas mios/1-Nº Reales Ejercicios.doc`.
- `Examen 3 und 1 y 2.pdf` y `Simulacro und 1 y 2.pdf`.
- `documentos/3º ESO/Libro_Matematicas_3ESO.pdf`.

El documento original contiene intervalos, fracción generatriz, errores, aproximaciones y numerosos problemas. Parte de las fórmulas y dibujos no se conserva bien en el texto extraído y requeriría revisión visual.

### Valoración

**B — Cobertura adecuada.** No necesita una ampliación prioritaria, pero convendría equilibrar Aprendiz y revisar la frontera con Potencias.

## 2. Potencias y raices

### Composición actual

- Aprendiz: 240 generados y 3 originales.
- Maestro: 240 generados, 1 original y 6 verificados.
- Repeticiones exactas: 22 en Aprendiz y 57 en Maestro.

### Subtipos y frecuencia aproximada

En las 480 variantes generadas:

- propiedades y operaciones con potencias: aproximadamente 352;
- raíces exactas y extracción de factores: aproximadamente 128.

Las estructuras efectivas son 14 en Aprendiz y 13 en Maestro. Los documentales añaden:

- notación científica: 3 estructuras;
- exponentes negativos y fraccionarios: varias operaciones de Maestro;
- raíces cúbicas y radicales de distinto índice: 2–3;
- un problema de expresar productos como potencia y otro de extracción de factores.

No hay tablas, gráficos ni figuras, lo que no constituye por sí mismo una carencia grave en este tema. Los problemas contextualizados son prácticamente inexistentes.

### Variedad y carencias

El generador repite unas pocas familias: producto y cociente de igual base, potencia de una potencia, raíz exacta y extracción sencilla.

Faltan o están poco representados:

- control del signo con bases negativas y paréntesis;
- exponentes cero y negativos en una progresión graduada;
- potencias de fracciones;
- raíces equivalentes, reducción a índice común e introducción/extracción de factores;
- operaciones variadas con radicales;
- cálculo y estimación de raíces no exactas;
- notación científica: conversiones, productos, cocientes, sumas y problemas;
- problemas contextualizados de crecimiento, cuadrados perfectos o magnitudes muy grandes/pequeñas.

### Posible contaminación

No se detecta procedencia de otros cursos. Algunos ejercicios propios de potencias/radicales están simultáneamente clasificados en `Numeros reales`, lo que reduce la nitidez de ambos bancos.

### Material disponible

**PARCIAL, pero abundante.** Fuentes:

- `documentos/3º ESO/Temas mios/2-Potencias y Raíces Ejercicio.doc`.
- exámenes conjuntos de los temas 1 y 2;
- libro de 3.º ESO.

El documento contiene numerosas familias de potencias, radicales, notación científica y problemas. Muchas expresiones no se recuperan correctamente en el texto plano y deben revisarse visualmente antes de incorporarlas.

### Ampliación concreta recomendada

Añadir aproximadamente **12–16 estructuras**, no meras variantes:

- 2 de bases negativas y signo;
- 2 de exponentes cero/negativos y potencias de fracciones;
- 3 de equivalencia, índice común y simplificación de radicales;
- 2–3 de operaciones con radicales;
- 3 de notación científica;
- 2–3 problemas contextualizados.

Objetivo razonable: **28–32 estructuras efectivas**, equilibradas entre Aprendiz y Maestro.

### Valoración

**C — Cobertura insuficiente.** El volumen numérico es grande, pero la variedad procedimental es baja.

## 3. Expresiones algebraicas

### Composición actual

- Aprendiz: 240 generados y 2 originales.
- Maestro: 240 generados, 2 originales y 16 verificados.
- Repeticiones exactas: 46 en Aprendiz y 128 en Maestro.

### Subtipos y frecuencia aproximada

Aprendiz generado:

- valor numérico, términos semejantes, producto de monomios y distributiva: 160 variantes;
- identidad notable, producto de binomios, factor común y diferencia de cuadrados combinada: 80.

Maestro generado:

- únicamente cuatro familias, con 60 variantes cada una: factor común, producto de binomios, cuadrado de binomio y diferencia de cuadrados con término adicional.

Material conectado:

- lenguaje algebraico y valores excluidos: 2 Aprendiz;
- división/reconstrucción del dividendo y teorema del factor: 2 Maestro;
- operaciones con polinomios, identidades y factorización: aproximadamente 12–13 verificados;
- 2 problemas con fracciones que no son realmente ejercicios principales de expresiones algebraicas;
- 1 operación aritmética con potencias/fracciones que presenta contaminación temática.

No hay apoyos visuales; en este tema no suelen ser imprescindibles. Los problemas contextualizados algebraicos son casi inexistentes.

### Variedad y carencias

Aprendiz solo alcanza unas 10 estructuras. Maestro presenta más enunciados documentales, pero está excesivamente concentrado en factorización y productos.

Faltan o están poco representados:

- identificación de monomio/polinomio, coeficiente, parte literal y grado;
- suma, resta, producto y división de polinomios con variedad;
- Ruffini con cociente y resto;
- teoremas del resto y del factor;
- factorización por métodos distintos y raíces de polinomios;
- fracciones algebraicas: dominio, equivalencia, simplificación y operaciones;
- traducción algebraica y justificación;
- problemas que utilicen expresiones para modelizar una situación.

### Posible contaminación

Se detectan como sospechosos dentro del banco verificado:

- dos problemas de reparto con fracciones, cuyo procedimiento principal no es algebraico;
- una operación combinada de potencias y fracciones;
- varios radicales del material general de expresiones, que deberían revisarse antes de considerarlos propios de este tema.

No hay evidencia de que procedan de 2.º o 4.º ESO; la contaminación es temática dentro de 3.º ESO.

### Material disponible

**SÍ/PARCIAL.** Fuentes:

- `3-Expresiones algebraicas Ejercicios.doc`;
- `Examen und 3.pdf` y `Simulacro und 3.pdf`;
- `3.5.3. Problemas.doc` y `3.6.3. Problemas.doc`;
- libro de 3.º ESO.

El original cubre monomios, polinomios, factor común, lenguaje algebraico, divisiones, Ruffini, teorema del factor, factorización y fracciones algebraicas. Muchas fórmulas se perdieron en el texto extraído y requieren inspección visual.

### Ampliación concreta recomendada

Añadir **12–15 estructuras**:

- 2 de identificación, grado y valor numérico;
- 3 de operaciones variadas con polinomios;
- 2 de división/Ruffini;
- 2 de resto, factor y parámetros;
- 2–3 de factorización diferenciada;
- 3 de fracciones algebraicas.

Objetivo razonable: **30–35 estructuras efectivas** con mejor equilibrio Aprendiz/Maestro.

### Valoración

**C — Cobertura insuficiente.**

## 4. Ecuaciones y sistemas de ecuaciones

### Composición actual

- Aprendiz: 240 generados y 2 originales.
- Maestro: 240 generados, 2 originales y 33 verificados.
- Repeticiones exactas: 102 en Aprendiz y 106 en Maestro.

### Subtipos y frecuencia aproximada

Las variantes generadas se dividen aproximadamente por igual:

- ecuaciones lineales: 120 por nivel;
- sistemas lineales 2×2: 120 por nivel.

Sin embargo, son solo 6 plantillas generadas en Aprendiz y 4 en Maestro.

Los 37 documentales aportan:

- ecuaciones de primer grado con paréntesis y fracciones;
- ecuaciones de segundo grado completas e incompletas;
- ecuaciones bicuadradas;
- ecuaciones generadas por identidades notables;
- sistemas 2×2 y petición de distintos métodos;
- numerosos problemas de edades, dinero, mezclas, áreas y repartos.

No hay gráficos activos, aunque el material fuente incluye resolución gráfica de sistemas. Los problemas contextualizados son abundantes en Maestro y escasos en Aprendiz.

### Variedad y carencias

Maestro tiene cobertura amplia. El principal problema es el desequilibrio: Aprendiz solo presenta unas 8 estructuras y repite mucho las mismas ecuaciones y sistemas.

Están poco representados:

- distinguir ecuación, identidad e incompatibilidad;
- ecuaciones lineales con denominadores en progresión graduada;
- discriminante y número de soluciones;
- construcción de una ecuación a partir de sus raíces;
- sistemas por sustitución, igualación, reducción y método gráfico claramente diferenciados;
- clasificación compatible/incompatible;
- problemas contextualizados sencillos en Aprendiz.

### Repeticiones relevantes

Además de las repeticiones del generador, el banco documental contiene variantes muy próximas:

- varios problemas de edades con idéntica estructura;
- varios problemas de área de un cuadrado cuyo lado aumenta;
- la ecuación `−x²+x=−6` aparece en más de una fuente;
- el problema del padre con 30 años más que el hijo aparece en más de una fuente.

### Posible contaminación

No se detecta contenido de 2.º o 4.º ESO. Algunos ejercicios proceden de un examen denominado “Relaciones geométricas”, pero son realmente ecuaciones o sucesiones y la clasificación semántica es correcta; el nombre del documento fuente no basta para considerarlos contaminación.

### Material disponible

**SÍ.** Fuentes:

- `4-Ecuaciones y sistemas de ecuaciones Ejercicios.doc`;
- examen y simulacro de ecuaciones;
- examen y simulacro de sistemas;
- `3.5.3. Problemas.doc` y `3.6.3. Problemas.doc`;
- libro de 3.º ESO.

Hay material abundante de todos los tipos señalados. Algunas expresiones matemáticas del documento principal necesitan revisión visual, pero los exámenes y numerosos problemas se leen con seguridad.

### Mejora secundaria concreta

Incorporar **6–8 estructuras Aprendiz**:

- 2 ecuaciones con paréntesis/fracciones;
- 2 ecuaciones de segundo grado graduadas;
- 2 sistemas con métodos explícitamente distintos;
- 1 clasificación de sistemas;
- 1 problema contextualizado sencillo.

Objetivo: mantener Maestro y elevar Aprendiz a **18–22 estructuras realmente diferenciadas**.

### Valoración

**B — Cobertura adecuada**, con un desequilibrio importante entre niveles. No requiere ampliación prioritaria.

## 5. Sucesiones

### Composición actual

- Aprendiz: 240 generados y 2 originales.
- Maestro: 240 generados, 2 originales y 12 verificados.
- Repeticiones exactas: 34 en Aprendiz y 64 en Maestro.

### Subtipos y frecuencia aproximada

En las 480 variantes generadas:

- progresiones aritméticas y geométricas —completar, diferencia/razón, término y suma—: aproximadamente 352;
- interés simple y compuesto: aproximadamente 128.

Los documentales añaden:

- término general de progresiones aritméticas y geométricas;
- reconstrucción desde dos términos;
- suma finita e infinita;
- sucesión de Fibonacci;
- problemas de movimiento;
- interés simple y compuesto.

No se necesitan gráficos de forma general. Hay 132 apariciones contextualizadas en los pools, pero muchas son variantes numéricas de los mismos dos modelos financieros.

### Variedad y carencias

La cobertura básica es correcta, pero hay repetición elevada y escasa presencia de estructuras menos rutinarias.

Faltan o son escasos:

- sucesiones recurrentes;
- convergencia/divergencia al nivel trabajado en los materiales;
- localizar la posición de un término;
- reconstruir una progresión desde condiciones distintas;
- suma a partir de datos indirectos;
- problemas contextualizados no financieros;
- progresiones geométricas con razón negativa o fraccionaria;
- comparación razonada entre interés simple y compuesto.

### Posible contaminación

No se detecta contenido de otros cursos. Se mantiene correctamente la decisión de que interés simple y compuesto pertenece a `Sucesiones`.

### Material disponible

**PARCIAL.** Fuentes:

- `6-Sucesiones Ejercicios.doc`;
- examen y simulacro de sucesiones;
- libro de 3.º ESO.

El documento contiene recurrencias, posición, reconstrucción y sumas, pero varias fórmulas desaparecen en el texto extraído. Los exámenes aportan ejercicios legibles y problemas contextualizados.

### Ampliación concreta recomendada

Añadir **10–12 estructuras**:

- 2 recurrentes;
- 2 de posición de un término;
- 2 de reconstrucción de progresiones;
- 2 de sumas con datos indirectos;
- 2 problemas no financieros;
- 1–2 comparaciones o aplicaciones financieras distintas.

Objetivo razonable: **26–30 estructuras efectivas**, equilibradas entre niveles.

### Valoración

**C — Cobertura insuficiente**, aunque menos urgente que Potencias o Probabilidad.

## 6. Cuerpos geometricos

### Composición actual

- Aprendiz: 240 generados y 3 originales.
- Maestro: 240 generados, 3 originales y 11 verificados.
- Repeticiones exactas: 167 en Aprendiz y 177 en Maestro, las cifras más altas de los siete temas.

### Subtipos y frecuencia aproximada

De las 480 variantes generadas:

- aproximadamente 352 no son cuerpos geométricos: semejanza por sombras, Tales, Pitágoras y área de paralelogramos;
- aproximadamente 128 sí trabajan cuerpos: desarrollo de cilindro, área lateral de cilindro y volúmenes de ortoedro, cono y esfera.

Entre los 17 documentales hay:

- reconocimiento de prisma/cilindro y desarrollo de cilindro;
- pirámide: altura desde volumen;
- esfera inscrita en cubo;
- áreas/volúmenes de esfera, cono, cilindro y prisma;
- problemas de empaquetado;
- varios ejercicios de semejanza, Pitágoras y figuras planas ajenos al nombre actual del tema.

No hay recursos visuales conectados a los originales. El selector detecta referencias verbales a figuras, pero no conserva las figuras necesarias de los documentos.

### Variedad y carencias

La cifra de ejercicios es engañosa. Si se excluyen los modelos de geometría plana, quedan aproximadamente 10–12 estructuras reales de cuerpos, con predominio de cilindro, cono y esfera.

Faltan o están muy poco representados:

- elementos de prismas, pirámides, cilindros, conos y esferas;
- clasificación de poliedros y cuerpos redondos;
- desarrollos planos variados;
- área lateral y total de prismas y pirámides;
- generatriz de cono mediante Pitágoras;
- volúmenes variados de todos los cuerpos;
- cuerpos compuestos;
- problemas de capacidad, coste, material, recipientes y conversiones;
- figuras imprescindibles para reconocimiento y desarrollos.

### Contaminación temática activa

Es el problema más grave encontrado:

- 352 de las 480 entradas generadas corresponden a semejanza, Tales, Pitágoras o áreas planas;
- al menos 5 de los 11 ejercicios verificados son de semejanza/Pitágoras y no de cuerpos;
- un original de corona circular pertenece a geometría plana, no a cuerpos.

No se detecta procedencia de 2.º o 4.º ESO; la contaminación es entre contenidos de 3.º ESO. No se corrige en esta auditoría.

### Material disponible

**PARCIAL.** Fuentes:

- `7-Cuerpos geométricos Ejercicios.doc`;
- examen de áreas y volúmenes;
- examen y simulacro de relaciones geométricas;
- libro de 3.º ESO.

Hay mucho material de cuerpos, áreas, volúmenes y problemas. Sin embargo, una proporción importante depende de dibujos cuyas medidas no aparecen en el texto extraído. La recuperación exige revisión visual cuidadosa; no puede reconstruirse por intuición.

### Ampliación concreta recomendada

Después de separar la contaminación, añadir **15–20 estructuras propias**:

- 3 de reconocimiento y elementos;
- 3 de desarrollos planos;
- 4 de áreas laterales/totales de distintos cuerpos;
- 4 de volúmenes diferenciados;
- 2 de cuerpos compuestos;
- 3–4 problemas contextualizados con figura, capacidad, coste o material.

Objetivo razonable: **28–35 estructuras reales de cuerpos geométricos**, no 30 variantes del mismo cilindro.

### Valoración

**D — Cobertura claramente insuficiente y contaminada.** Es el primer tema que debería revisarse y ampliarse.

## 7. Probabilidad

### Composición actual

- Aprendiz: 240 generados y 5 originales.
- Maestro: 240 generados y 3 originales.
- Repeticiones exactas: 8 en Aprendiz y 0 en Maestro, pero la ausencia de duplicados literales se debe al cambio de números.

### Subtipos y frecuencia aproximada

Generador Aprendiz:

- 180 variantes de extracción simple o complementario en bolsas;
- 60 variantes de dos extracciones con o sin reemplazamiento.

Generador Maestro:

- 180 variantes de dos extracciones con/sin reemplazamiento;
- 60 variantes de complementario.

Originales conectados:

- experimento aleatorio;
- espacio muestral y sucesos con un dado;
- conteo de resultados de dos dados;
- Laplace con dado y urna;
- tres monedas;
- cartas con y sin reemplazamiento.

La variedad efectiva es 12 estructuras en Aprendiz y solo 7 en Maestro. No hay tablas, diagramas de árbol ni recursos visuales activos.

### Variedad y carencias

El tema tiene muchas variantes exactas distintas, pero está muy concentrado en bolsas con bolas rojas y azules.

Faltan o están poco representados:

- clasificación de sucesos: elemental, compuesto, seguro, imposible y contrario;
- operaciones con sucesos: unión, intersección y complementario;
- espacios muestrales de monedas, dados y cartas con distintas representaciones;
- regla de Laplace en contextos variados;
- tablas de frecuencias experimentales;
- diagramas de árbol;
- sucesos de varias etapas con caminos diferentes;
- “al menos uno” mediante complementario;
- comparación explícita con/sin reemplazamiento;
- problemas con cartas, fechas, elecciones o combinaciones sencillas, no solo urnas.

### Posible contaminación

No se detectan fuentes de otros cursos ni ejercicios claramente asignados a otro tema. El problema es de monocultivo estructural, no de procedencia.

### Material disponible

**SÍ/PARCIAL.** Fuentes:

- `10-Probabilidad Ejercicios.doc`;
- teoría y PDF del tema;
- libro de 3.º ESO.

El original incluye clasificación de sucesos, dados, cartas, monedas, tabla de tiradores, unión/intersección, experimentos sucesivos y comparación con/sin reemplazamiento. Algunas operaciones de conjuntos se perdieron en el texto extraído, pero la mayoría de los problemas son recuperables. La tabla debe reproducirse fielmente.

### Ampliación concreta recomendada

Añadir **14–18 estructuras**:

- 2 de clasificación de experimentos/sucesos;
- 2 de operaciones con sucesos;
- 3 de espacios muestrales y Laplace en contextos no basados en urnas;
- 3 de experimentos sucesivos con árbol o tabla;
- 2 de frecuencia experimental/tablas;
- 2 de complementario “al menos uno”;
- 2–4 de cartas, fechas, monedas y comparación con/sin reemplazamiento.

Objetivo razonable: **25–30 estructuras efectivas**, con al menos 18–22 disponibles en Maestro.

### Valoración

**D — Cobertura claramente insuficiente por repetición estructural.**

## Tabla comparativa por prioridad

| Prioridad | Tema | Total exacto distinto | Aprendiz | Maestro | Variedad efectiva | Contenidos poco cubiertos | Clasificación | Recomendación |
| ---: | --- | ---: | ---: | ---: | --- | --- | --- | --- |
| 1 | Cuerpos geometricos | 122 | 76 | 77 | 12 / 23, pero solo unas 10–12 estructuras propias de cuerpos | elementos, desarrollos, áreas totales, cuerpos compuestos, problemas con figuras | D | `AMPLIAR AHORA` |
| 2 | Probabilidad | 459 | 237 | 243 | 12 / 7; predominan cambios numéricos en urnas | sucesos, operaciones, árboles, tablas, contextos variados, “al menos uno” | D | `AMPLIAR AHORA` |
| 3 | Potencias y raices | 407 | 221 | 190 | 14 / 13 | signos, exponentes negativos, radicales variados, notación científica y problemas | C | `AMPLIAR AHORA` |
| 4 | Sucesiones | 384 | 208 | 190 | 12 / 20 | recurrencias, posición, reconstrucción, sumas indirectas, contextos no financieros | C | `AMPLIACIÓN SECUNDARIA` |
| 5 | Expresiones algebraicas | 259 | 196 | 130 | 10 / 22 | división/Ruffini, resto/factor, fracciones algebraicas y equilibrio de Aprendiz | C | `AMPLIACIÓN SECUNDARIA` |
| 6 | Ecuaciones y sistemas de ecuaciones | 281 | 140 | 169 | 8 / 39; fuerte desequilibrio | variedad Aprendiz, métodos de sistemas, clasificación y problemas graduados | B | `AMPLIACIÓN SECUNDARIA` |
| 7 | Numeros reales | 462 | 218 | 258 | 12 / 34 | equilibrio Aprendiz y separación frente a Potencias | B | `NO NECESITA AMPLIACIÓN` |

En las columnas Aprendiz y Maestro se cuentan enunciados exactos distintos. Un mismo enunciado puede estar presente en los dos niveles, por lo que el total entre niveles no es necesariamente la suma de ambas columnas.

## Control de contaminación

### De otros cursos

No se ha localizado evidencia documental de ejercicios procedentes de 2.º ESO o 4.º ESO dentro de estos siete bancos. Todos los ejercicios conectados señalan `courseId = 3eso` y fuentes de 3.º ESO.

Sí hay numerosos modelos generados muy elementales —especialmente en `Numeros reales`, `Ecuaciones` y `Probabilidad`— que podrían resolverse en cursos anteriores. Esto es una **carencia de nivel y variedad**, no una prueba de que hayan sido copiados de otro curso.

### Entre temas de 3.º ESO

Problemas detectados, sin corregir:

1. `Cuerpos geometricos` contiene masivamente semejanza, Tales, Pitágoras y áreas planas.
2. `Numeros reales` y `Potencias y raices` comparten una frontera ambigua en radicales, potencias y notación científica debido a exámenes conjuntos.
3. `Expresiones algebraicas` contiene problemas de fracciones y una operación aritmética cuyo contenido principal no es algebraico.
4. Algunos documentos fuente mezclan contenidos, pero el nombre del archivo no determina por sí solo el tema matemático. Los ejercicios de ecuaciones hallados en exámenes de relaciones geométricas están correctamente clasificados por su procedimiento.

## Resultado final

1. **Primer tema que debería ampliarse:** `Cuerpos geometricos`, precedido por la separación de los modelos de geometría plana que actualmente lo contaminan.
2. **Segundo tema:** `Probabilidad`, sustituyendo el monocultivo de urnas por estructuras reales variadas.
3. **Tercer tema prioritario:** `Potencias y raices`.
4. **Temas que pueden darse por utilizables/cerrados por ahora:** `Numeros reales`; `Ecuaciones y sistemas de ecuaciones` puede considerarse utilizable, aunque necesita una mejora secundaria de Aprendiz.
5. **Estimación adicional:**
   - Cuerpos geometricos: 15–20 estructuras.
   - Probabilidad: 14–18 estructuras.
   - Potencias y raices: 12–16 estructuras.
   - Sucesiones: 10–12 estructuras.
   - Expresiones algebraicas: 12–15 estructuras.
   - Ecuaciones y sistemas: 6–8 estructuras Aprendiz, como mejora secundaria.
   - Numeros reales: sin ampliación inmediata; opcionalmente 4–6 estructuras Aprendiz en una fase posterior.
6. **Disponibilidad de material:** existen fuentes internas para todos los temas. Para Ecuaciones y buena parte de Probabilidad el material legible es suficiente. En Cuerpos, Potencias, Álgebra, Sucesiones y parte de Números reales será necesaria revisión visual de los documentos originales porque el texto extraído perdió figuras o fórmulas.

No es necesario que el profesor proporcione nuevos documentos antes de intentar recuperar el material ya disponible. Solo habría que pedir material adicional si la revisión visual de los originales no permite alcanzar las estructuras objetivo, especialmente en desarrollos planos y cuerpos compuestos.

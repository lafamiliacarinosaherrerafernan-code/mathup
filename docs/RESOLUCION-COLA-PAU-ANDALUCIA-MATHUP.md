# Consumo real de la cola de resolución PAU Andalucía

## Resultado y límites

Se ha consumido la cola original completa, sin reconstruirla: **1638/1638 registros**, 0 pendientes de recorrido. Se conservan **1438 ejercicios con contenido de resolución generado** (87.7900 %), **2988 apartados/respuestas/soluciones** y **8964 distractores**. Los otros **200** tienen incidencias documentales individualizadas. Ninguno está bloqueado por no tener respuestas, soluciones u opciones históricas.

**La cola autorizada queda agotada y clasificada.** Se han habilitado **1438 ejercicios** en la capa paralela local de Andalucía, que contiene 1466 registros al sumar los 28 anteriores. Los 200 restantes conservan bloqueos documentales reales. No se ha promovido una etiqueta antigua ni un campo `verified: true` a prueba independiente. No hay commit, subida al remoto ni despliegue externo.

El contenido efectivamente generado está en `artifacts/pau-andalucia-resolution/completed-exercises.jsonl`, con ID canónico, respuesta, tres distractores, razón de cada error, pasos y resultado final por apartado. Los lotes conservan versiones anteriores y permiten reconstruir el estado final. El censo de bloqueos con ID, literal, motivo y fuente está en `audit/documentary-blockers.jsonl`.

## Cobertura

### Materia

La columna `newlyEnabled` describe las altas realizadas en la capa paralela local por esta fase.

| subject | generated | parts | newlyEnabled |
| --- | --- | --- | --- |
| Matemáticas Aplicadas a las CCSS II | 737 | 1755 | 737 |
| Matemáticas II | 701 | 1233 | 701 |

### Año y materia (cola completa)

| subject | year | total | generated | documentaryBlocked |
| --- | --- | --- | --- | --- |
| Matemáticas Aplicadas a las CCSS II | 2010 | 46 | 46 | 0 |
| Matemáticas Aplicadas a las CCSS II | 2011 | 53 | 51 | 2 |
| Matemáticas Aplicadas a las CCSS II | 2012 | 48 | 48 | 0 |
| Matemáticas Aplicadas a las CCSS II | 2013 | 44 | 44 | 0 |
| Matemáticas Aplicadas a las CCSS II | 2014 | 46 | 44 | 2 |
| Matemáticas Aplicadas a las CCSS II | 2015 | 47 | 47 | 0 |
| Matemáticas Aplicadas a las CCSS II | 2016 | 40 | 40 | 0 |
| Matemáticas Aplicadas a las CCSS II | 2017 | 46 | 46 | 0 |
| Matemáticas Aplicadas a las CCSS II | 2018 | 47 | 47 | 0 |
| Matemáticas Aplicadas a las CCSS II | 2019 | 48 | 48 | 0 |
| Matemáticas Aplicadas a las CCSS II | 2020 | 96 | 48 | 48 |
| Matemáticas Aplicadas a las CCSS II | 2021 | 48 | 48 | 0 |
| Matemáticas Aplicadas a las CCSS II | 2022 | 66 | 54 | 12 |
| Matemáticas Aplicadas a las CCSS II | 2023 | 48 | 42 | 6 |
| Matemáticas Aplicadas a las CCSS II | 2024 | 48 | 46 | 2 |
| Matemáticas Aplicadas a las CCSS II | 2025 | 42 | 33 | 9 |
| Matemáticas Aplicadas a las CCSS II | 2026 | 12 | 5 | 7 |
| Matemáticas II | 2010 | 47 | 45 | 2 |
| Matemáticas II | 2011 | 48 | 46 | 2 |
| Matemáticas II | 2012 | 46 | 42 | 4 |
| Matemáticas II | 2013 | 47 | 43 | 4 |
| Matemáticas II | 2014 | 46 | 43 | 3 |
| Matemáticas II | 2015 | 48 | 44 | 4 |
| Matemáticas II | 2016 | 40 | 38 | 2 |
| Matemáticas II | 2017 | 45 | 41 | 4 |
| Matemáticas II | 2018 | 55 | 45 | 10 |
| Matemáticas II | 2019 | 48 | 45 | 3 |
| Matemáticas II | 2020 | 96 | 44 | 52 |
| Matemáticas II | 2021 | 48 | 45 | 3 |
| Matemáticas II | 2022 | 55 | 43 | 12 |
| Matemáticas II | 2023 | 48 | 48 | 0 |
| Matemáticas II | 2024 | 47 | 43 | 4 |
| Matemáticas II | 2025 | 33 | 31 | 2 |
| Matemáticas II | 2026 | 16 | 15 | 1 |

No se han omitido años de la cola: contiene 2010–2026. No contiene ejercicios 2000–2009; no se han fabricado fuentes para extenderla.

### Tema

| subject | primaryTopic | generated | parts | newlyEnabled |
| --- | --- | --- | --- | --- |
| Matemáticas Aplicadas a las CCSS II | Análisis de funciones | 5 | 14 | 5 |
| Matemáticas Aplicadas a las CCSS II | Aplicaciones de la derivada | 5 | 14 | 5 |
| Matemáticas Aplicadas a las CCSS II | Beneficios y optimización | 1 | 4 | 1 |
| Matemáticas Aplicadas a las CCSS II | Continuidad por tramos | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Continuidad y derivabilidad de una función a trozos | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Continuidad y derivabilidad | 8 | 17 | 8 |
| Matemáticas Aplicadas a las CCSS II | Continuidad, derivabilidad y recta tangente | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Continuidad, extremos y curvatura | 1 | 3 | 1 |
| Matemáticas Aplicadas a las CCSS II | Derivabilidad de una función a trozos | 1 | 1 | 1 |
| Matemáticas Aplicadas a las CCSS II | Derivabilidad | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Derivadas e integral polinómica | 1 | 3 | 1 |
| Matemáticas Aplicadas a las CCSS II | Derivadas e integrales definidas | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Derivadas y aplicaciones | 4 | 13 | 4 |
| Matemáticas Aplicadas a las CCSS II | Derivadas y asíntotas | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Derivadas y estudio de funciones | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Derivadas y optimización | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Derivadas y rectas tangentes | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Derivadas | 108 | 278 | 108 |
| Matemáticas Aplicadas a las CCSS II | Distribuciones de probabilidad | 1 | 4 | 1 |
| Matemáticas Aplicadas a las CCSS II | Estadística inferencial | 2 | 4 | 2 |
| Matemáticas Aplicadas a las CCSS II | Estudio de funciones a trozos | 2 | 7 | 2 |
| Matemáticas Aplicadas a las CCSS II | Estudio de funciones y áreas | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Estudio de funciones | 2 | 5 | 2 |
| Matemáticas Aplicadas a las CCSS II | Estudio de una función a trozos | 1 | 3 | 1 |
| Matemáticas Aplicadas a las CCSS II | Estudio de una función racional en un contexto | 1 | 4 | 1 |
| Matemáticas Aplicadas a las CCSS II | Estudio de una función | 1 | 3 | 1 |
| Matemáticas Aplicadas a las CCSS II | Estudio global de funciones | 1 | 3 | 1 |
| Matemáticas Aplicadas a las CCSS II | Extremos e inflexión | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Función a trozos | 3 | 10 | 3 |
| Matemáticas Aplicadas a las CCSS II | Funciones a trozos, continuidad y área | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Funciones a trozos | 6 | 18 | 6 |
| Matemáticas Aplicadas a las CCSS II | Funciones definidas a trozos | 7 | 21 | 7 |
| Matemáticas Aplicadas a las CCSS II | Funciones exponenciales | 1 | 4 | 1 |
| Matemáticas Aplicadas a las CCSS II | Funciones por tramos | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Inferencia normal | 1 | 3 | 1 |
| Matemáticas Aplicadas a las CCSS II | Inferencia y muestreo | 2 | 5 | 2 |
| Matemáticas Aplicadas a las CCSS II | Integración y crecimiento exponencial | 1 | 3 | 1 |
| Matemáticas Aplicadas a las CCSS II | Interpretación de la derivada | 2 | 6 | 2 |
| Matemáticas Aplicadas a las CCSS II | Intervalos de confianza para la media | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Matrices | 93 | 210 | 93 |
| Matemáticas Aplicadas a las CCSS II | Muestreo e inferencia estadística | 168 | 357 | 168 |
| Matemáticas Aplicadas a las CCSS II | Muestreo e intervalo | 1 | 4 | 1 |
| Matemáticas Aplicadas a las CCSS II | Muestreo estratificado | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Muestreo y distribución de medias muestrales | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Muestreo | 6 | 12 | 6 |
| Matemáticas Aplicadas a las CCSS II | Optimización de una función cuadrática | 1 | 3 | 1 |
| Matemáticas Aplicadas a las CCSS II | Optimización y representación | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Optimización | 1 | 4 | 1 |
| Matemáticas Aplicadas a las CCSS II | Parábola y optimización | 1 | 3 | 1 |
| Matemáticas Aplicadas a las CCSS II | Probabilidad compuesta | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Probabilidad condicionada | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Probabilidad de sucesos | 1 | 4 | 1 |
| Matemáticas Aplicadas a las CCSS II | Probabilidad total y Bayes | 1 | 2 | 1 |
| Matemáticas Aplicadas a las CCSS II | Probabilidad | 182 | 494 | 182 |
| Matemáticas Aplicadas a las CCSS II | Programación lineal aplicada a producción | 1 | 1 | 1 |
| Matemáticas Aplicadas a las CCSS II | Programación lineal entera | 1 | 1 | 1 |
| Matemáticas Aplicadas a las CCSS II | Programación lineal | 92 | 171 | 92 |
| Matemáticas Aplicadas a las CCSS II | Representación y estudio de funciones | 1 | 1 | 1 |
| Matemáticas II | Análisis de funciones | 1 | 2 | 1 |
| Matemáticas II | Aplicaciones de derivadas e integrales | 1 | 2 | 1 |
| Matemáticas II | Aplicaciones de derivadas | 34 | 51 | 34 |
| Matemáticas II | Aplicaciones de la derivada | 8 | 14 | 8 |
| Matemáticas II | Área bajo logaritmo | 1 | 1 | 1 |
| Matemáticas II | Área entre curvas con valor absoluto | 1 | 3 | 1 |
| Matemáticas II | Área entre curvas | 13 | 26 | 13 |
| Matemáticas II | Área entre dos curvas mediante integral definida | 1 | 2 | 1 |
| Matemáticas II | Área entre funciones trigonométricas | 1 | 2 | 1 |
| Matemáticas II | Área y coplanaridad | 1 | 2 | 1 |
| Matemáticas II | Áreas entre curvas | 5 | 10 | 5 |
| Matemáticas II | Áreas mediante integrales | 2 | 4 | 2 |
| Matemáticas II | Áreas y volúmenes mediante producto vectorial y mixto | 1 | 2 | 1 |
| Matemáticas II | Asíntota oblicua | 3 | 4 | 3 |
| Matemáticas II | Asíntotas y extremos | 1 | 1 | 1 |
| Matemáticas II | Asíntotas y rectas tangente y normal | 1 | 2 | 1 |
| Matemáticas II | Asíntotas y simetría | 1 | 2 | 1 |
| Matemáticas II | Autovalores y sistemas | 1 | 3 | 1 |
| Matemáticas II | Cambio de variable | 1 | 1 | 1 |
| Matemáticas II | Concavidad y asíntotas | 1 | 2 | 1 |
| Matemáticas II | Concavidad, convexidad y límites | 1 | 2 | 1 |
| Matemáticas II | Concavidad, convexidad y puntos de inflexión | 1 | 1 | 1 |
| Matemáticas II | Continuidad y derivabilidad | 10 | 16 | 10 |
| Matemáticas II | Continuidad y extremos | 1 | 2 | 1 |
| Matemáticas II | Continuidad y límites | 1 | 1 | 1 |
| Matemáticas II | Dependencia y ortogonalidad | 2 | 5 | 2 |
| Matemáticas II | Derivabilidad y tangente | 1 | 2 | 1 |
| Matemáticas II | Derivabilidad | 1 | 1 | 1 |
| Matemáticas II | Derivadas y límites | 4 | 6 | 4 |
| Matemáticas II | Derivadas | 19 | 28 | 19 |
| Matemáticas II | Determinación de polinomio | 1 | 1 | 1 |
| Matemáticas II | Determinación de polinomios | 1 | 1 | 1 |
| Matemáticas II | Determinación de una función | 1 | 1 | 1 |
| Matemáticas II | Determinantes y sistemas | 2 | 4 | 2 |
| Matemáticas II | Determinantes | 8 | 20 | 8 |
| Matemáticas II | Discusión de sistemas | 1 | 2 | 1 |
| Matemáticas II | Distancia entre rectas paralelas | 1 | 1 | 1 |
| Matemáticas II | Distancia entre rectas | 1 | 2 | 1 |
| Matemáticas II | Distribución normal | 2 | 4 | 2 |
| Matemáticas II | Ecuación matricial | 1 | 1 | 1 |
| Matemáticas II | Ecuaciones matriciales | 4 | 8 | 4 |
| Matemáticas II | Estudio de función exponencial | 1 | 3 | 1 |
| Matemáticas II | Estudio de funciones y optimización | 5 | 6 | 5 |
| Matemáticas II | Estudio de funciones | 10 | 24 | 10 |
| Matemáticas II | Estudio de una función racional | 1 | 3 | 1 |
| Matemáticas II | Extremos de funciones | 3 | 5 | 3 |
| Matemáticas II | Extremos y rectas | 1 | 2 | 1 |
| Matemáticas II | Función a trozos | 1 | 2 | 1 |
| Matemáticas II | Función integral | 1 | 2 | 1 |
| Matemáticas II | Función racional | 1 | 2 | 1 |
| Matemáticas II | Funciones a trozos | 2 | 4 | 2 |
| Matemáticas II | Funciones exponenciales | 1 | 2 | 1 |
| Matemáticas II | Funciones polinómicas | 2 | 3 | 2 |
| Matemáticas II | Funciones racionales | 1 | 2 | 1 |
| Matemáticas II | Geometría afín en el espacio | 2 | 5 | 2 |
| Matemáticas II | Geometría afín | 2 | 4 | 2 |
| Matemáticas II | Geometría de paralelogramos | 1 | 2 | 1 |
| Matemáticas II | Geometría del espacio | 24 | 44 | 24 |
| Matemáticas II | Geometría espacial | 2 | 4 | 2 |
| Matemáticas II | Geometría métrica en el espacio | 4 | 8 | 4 |
| Matemáticas II | Geometría métrica | 3 | 6 | 3 |
| Matemáticas II | Geometría vectorial | 3 | 6 | 3 |
| Matemáticas II | Identidad matricial | 1 | 2 | 1 |
| Matemáticas II | Integración por partes | 2 | 3 | 2 |
| Matemáticas II | Integración por sustitución | 1 | 1 | 1 |
| Matemáticas II | Integración racional | 1 | 1 | 1 |
| Matemáticas II | Integración sucesiva | 1 | 1 | 1 |
| Matemáticas II | Integral definida con valor absoluto | 1 | 2 | 1 |
| Matemáticas II | Integral definida de una función a trozos | 1 | 1 | 1 |
| Matemáticas II | Integral definida | 2 | 2 | 2 |
| Matemáticas II | Integral exponencial | 1 | 1 | 1 |
| Matemáticas II | Integral racional | 2 | 2 | 2 |
| Matemáticas II | Integrales definidas y áreas | 54 | 92 | 54 |
| Matemáticas II | Integrales definidas | 17 | 26 | 17 |
| Matemáticas II | Integrales indefinidas | 20 | 23 | 20 |
| Matemáticas II | Integrales | 5 | 7 | 5 |
| Matemáticas II | Límites con integral | 1 | 1 | 1 |
| Matemáticas II | Límites de funciones | 1 | 1 | 1 |
| Matemáticas II | Límites y asíntotas | 18 | 28 | 18 |
| Matemáticas II | Límites y continuidad | 1 | 1 | 1 |
| Matemáticas II | Límites, continuidad y derivadas | 5 | 9 | 5 |
| Matemáticas II | Límites | 4 | 4 | 4 |
| Matemáticas II | Matrices e inversas | 1 | 2 | 1 |
| Matemáticas II | Matrices nilpotentes | 1 | 2 | 1 |
| Matemáticas II | Matrices y determinantes | 30 | 65 | 30 |
| Matemáticas II | Matrices y rangos | 2 | 3 | 2 |
| Matemáticas II | Matrices y sistemas | 10 | 21 | 10 |
| Matemáticas II | Matrices | 28 | 54 | 28 |
| Matemáticas II | Monotonía y extremos | 1 | 2 | 1 |
| Matemáticas II | Optimización con derivadas | 1 | 1 | 1 |
| Matemáticas II | Optimización de derivadas | 1 | 1 | 1 |
| Matemáticas II | Optimización geométrica | 9 | 13 | 9 |
| Matemáticas II | Optimización | 17 | 17 | 17 |
| Matemáticas II | Ortogonalidad y áreas | 1 | 2 | 1 |
| Matemáticas II | Plano mediador | 1 | 2 | 1 |
| Matemáticas II | Plano y recta | 1 | 3 | 1 |
| Matemáticas II | Plano y simetría | 1 | 2 | 1 |
| Matemáticas II | Planos paralelos | 1 | 2 | 1 |
| Matemáticas II | Planos y rectas en el espacio | 3 | 5 | 3 |
| Matemáticas II | Planos y rectas | 19 | 37 | 19 |
| Matemáticas II | Planos | 1 | 2 | 1 |
| Matemáticas II | Polinomios y extremos | 1 | 1 | 1 |
| Matemáticas II | Posición relativa de planos | 1 | 2 | 1 |
| Matemáticas II | Posición relativa de rectas | 2 | 4 | 2 |
| Matemáticas II | Posiciones relativas de rectas | 1 | 2 | 1 |
| Matemáticas II | Potencias de matrices | 2 | 5 | 2 |
| Matemáticas II | Primitivas con condiciones | 1 | 1 | 1 |
| Matemáticas II | Primitivas e integrales | 10 | 13 | 10 |
| Matemáticas II | Primitivas por tramos | 1 | 1 | 1 |
| Matemáticas II | Primitivas y áreas | 7 | 11 | 7 |
| Matemáticas II | Primitivas y condiciones iniciales | 1 | 1 | 1 |
| Matemáticas II | Primitivas | 8 | 8 | 8 |
| Matemáticas II | Probabilidad condicionada | 2 | 4 | 2 |
| Matemáticas II | Probabilidad | 1 | 2 | 1 |
| Matemáticas II | Problemas métricos | 39 | 71 | 39 |
| Matemáticas II | Propiedades métricas | 31 | 60 | 31 |
| Matemáticas II | Rango de matrices y sistemas compatibles | 1 | 2 | 1 |
| Matemáticas II | Rango y sistema homogéneo | 2 | 4 | 2 |
| Matemáticas II | Rangos y sistemas | 1 | 2 | 1 |
| Matemáticas II | Recta normal y área | 1 | 2 | 1 |
| Matemáticas II | Recta perpendicular | 1 | 1 | 1 |
| Matemáticas II | Recta tangente y área | 1 | 2 | 1 |
| Matemáticas II | Recta y plano | 2 | 5 | 2 |
| Matemáticas II | Rectángulos en el espacio | 1 | 1 | 1 |
| Matemáticas II | Rectas en el espacio | 1 | 2 | 1 |
| Matemáticas II | Rectas tangente y normal | 2 | 4 | 2 |
| Matemáticas II | Rectas y geometría métrica | 1 | 2 | 1 |
| Matemáticas II | Rectas y planos | 9 | 19 | 9 |
| Matemáticas II | Rectas, planos y simetrías en el espacio | 1 | 2 | 1 |
| Matemáticas II | Simetría respecto de una recta | 1 | 1 | 1 |
| Matemáticas II | Simetrías en el espacio | 1 | 2 | 1 |
| Matemáticas II | Sistema de cifras | 1 | 1 | 1 |
| Matemáticas II | Sistemas con determinantes | 35 | 71 | 35 |
| Matemáticas II | Sistemas con parámetro | 5 | 11 | 5 |
| Matemáticas II | Sistemas con parámetros | 6 | 12 | 6 |
| Matemáticas II | Sistemas de ecuaciones lineales | 1 | 2 | 1 |
| Matemáticas II | Sistemas de ecuaciones | 8 | 12 | 8 |
| Matemáticas II | Sistemas homogéneos | 1 | 2 | 1 |
| Matemáticas II | Sistemas lineales con parámetro | 3 | 6 | 3 |
| Matemáticas II | Sistemas lineales con parámetros | 1 | 2 | 1 |
| Matemáticas II | Sistemas lineales diofánticos | 1 | 2 | 1 |
| Matemáticas II | Sistemas lineales | 8 | 15 | 8 |
| Matemáticas II | Sistemas mediante determinantes | 1 | 2 | 1 |
| Matemáticas II | Sistemas sobredeterminados | 1 | 1 | 1 |
| Matemáticas II | Sistemas y combinaciones lineales | 2 | 5 | 2 |
| Matemáticas II | Tangente y normal | 1 | 1 | 1 |
| Matemáticas II | Valor absoluto | 1 | 2 | 1 |
| Matemáticas II | Vectores en el espacio | 1 | 3 | 1 |
| Matemáticas II | Vectores y planos | 1 | 2 | 1 |
| Matemáticas II | Vectores y volumen | 1 | 2 | 1 |
| Matemáticas II | Vectores | 6 | 14 | 6 |

### Bloque

| subject | block | generated | newlyEnabled |
| --- | --- | --- | --- |
| Matemáticas Aplicadas a las CCSS II | Álgebra | 95 | 95 |
| Matemáticas Aplicadas a las CCSS II | Análisis | 180 | 180 |
| Matemáticas Aplicadas a las CCSS II | Probabilidad o estadística | 363 | 363 |
| Matemáticas Aplicadas a las CCSS II | Probabilidad y estadística | 4 | 4 |
| Matemáticas Aplicadas a las CCSS II | Probabilidad | 3 | 3 |
| Matemáticas Aplicadas a las CCSS II | Sistemas y programación lineal | 49 | 49 |
| Matemáticas Aplicadas a las CCSS II | Sistemas/programación lineal | 43 | 43 |
| Matemáticas II | Álgebra | 170 | 170 |
| Matemáticas II | Análisis | 203 | 203 |
| Matemáticas II | Geometría | 176 | 176 |
| Matemáticas II | Integrales | 65 | 65 |
| Matemáticas II | Límites, continuidad y derivadas | 6 | 6 |
| Matemáticas II | Límites/continuidad/derivadas | 76 | 76 |
| Matemáticas II | Probabilidad o estadística | 1 | 1 |
| Matemáticas II | Probabilidad y estadística | 3 | 3 |
| Matemáticas II | Probabilidad/estadística | 1 | 1 |

### Posición de examen

| subject | examSlot | generated | newlyEnabled |
| --- | --- | --- | --- |
| Matemáticas Aplicadas a las CCSS II | 1 | 93 | 93 |
| Matemáticas Aplicadas a las CCSS II | 2 | 94 | 94 |
| Matemáticas Aplicadas a las CCSS II | 3 | 180 | 180 |
| Matemáticas Aplicadas a las CCSS II | 4 | 370 | 370 |
| Matemáticas II | 1 | 170 | 170 |
| Matemáticas II | 2 | 187 | 187 |
| Matemáticas II | 3 | 163 | 163 |
| Matemáticas II | 4 | 176 | 176 |
| Matemáticas II | 5 | 5 | 5 |

Se corrigieron 43 posiciones de examen mediante la arquitectura histórica distinta de cada materia; 63 registros recibieron ajustes de taxonomía. Los ejercicios oficiales mixtos se conservan completos y requieren comprobar compatibilidad de posición, sin dividirlos o habilitarlos automáticamente. Sus respuestas y pasos permanecen iguales en el lote 0236.

## Bloqueos documentales

| group | count |
| --- | --- |
| MISSING_DOCUMENTARY_DATA | 27 |
| NON_EXERCISE_OR_SCORING_FRAGMENT | 121 |
| SEGMENTATION_REVIEW | 5 |
| MATHEMATICAL_NOTATION_REVIEW | 47 |

Estos grupos son excluyentes y suman 200. Los códigos detallados pueden coexistir. Un fragmento de puntuación no se convierte en enunciado, una fórmula ausente no se inventa y una separación dudosa no se decide por intuición. Se han recuperado adicionalmente cuatro casos contrastando sus PDF oficiales (lote 0234).

## Controles ejecutados

- Auditoría estructural: 0 incidencias; contabilidad 1.638/1.638; IDs sin duplicación; materia/año/posición contrastados con la cola.
- Comparaciones racionales exactas de opciones: 248; conjuntos íntegramente numéricos comparables: 31. Esto no certifica equivalencia de todas las expresiones simbólicas, matrices o respuestas textuales.
- Comprobaciones ejecutables conservadas en lotes: 1299, con 0 fallos registrados. No equivalen por sí solas a publicación ni certificación visual de los 1438 ejercicios resueltos.
- Validador contractual final aplicado a 2988 apartados ya adaptados para entrega: 2988 aceptados y 0 rechazados. Ningún adaptador cambia la respuesta canónica ni concede aprobación humana.
- Diagnóstico previo al adaptador de presentación: 1325 aceptados y 1663 con sintaxis interna que el contrato público rechaza antes de transformarla de forma reversible. Se conserva por separado y no se confunde con el resultado final.
- Node: 2249/2249 pruebas, 0 fallos. Son pruebas de software y regresión, no validación matemática masiva.
- PowerShell: 71 aserciones superadas en tres suites documentales de solo lectura, 0 suites fallidas. No se han reejecutado scripts que sobrescriben artefactos de fases anteriores; no se declara por ello una regresión PowerShell completa.
- Replay de lotes: coincidencia exacta; hash semántico `0dddd89c33f428c27ed6734a4c80aef4308a047e78b6da5bc58e93271f9ab018`.
- Skill `solucion-de-ejercicios` sin modificación: SHA-256 `18d4ead04a7159af4882134535a7b15632a430118b0c7f6b24ef45806aab9444`.

Diagnósticos previos al adaptador de presentación (no excluyentes; no son rechazos de la entrega final):

| code | count |
| --- | --- |
| RAW_TEX_COMMAND | 29 |
| RAW_INTERNAL_FRACTION | 9376 |

Los códigos de esta tabla describen la sintaxis matemática interna anterior al adaptador (por ejemplo, `frac{…}{…}`), no contenido crudo mostrado al alumno. La proyección final es reversible, conserva respuesta y distractores canónicos y vuelve a ejecutar el contrato: 2988/2988 apartados válidos, 0 rechazados. El resultado previo completo se mantiene en `audit/pre-adapter-policy-diagnostics.jsonl`.

## Representación real comprobada

Se ejecutaron los 1438 registros a 320, 375, 768 y 1280 px: **5752 ejecuciones y 11952 apartados renderizados** con las funciones y componentes reales de la aplicación en un arnés aislado. Resultado: **0 ejercicios con incidencias**. Se comprobó ausencia de `undefined/null`, HTML/LaTeX crudo, puntuaciones editoriales, desbordamiento horizontal, recortes y contenido oculto. **No sustituye una revisión humana ni certifica autenticación o historial del alumno.**

La proyección aislada separa las puntuaciones editoriales del texto visible y conserva literal y offsets como `scoreEvidence`, sin modificar la fuente. Las respuestas matriciales tipadas utilizan la función de matrices del motor actual en lugar de convertirse a texto genérico. El resultado anterior a estos adaptadores se conserva en `audit/render-results-before-adapter.json`. Las señales de fracción lineal requieren revisar contexto; no se reemplazan barras ambiguas automáticamente. El arnés no certifica solapamientos, glifos ocultos ni fidelidad matemática por medir anchuras.

## Correcciones y preservación

- Lotes independientes batch-0239, batch-0240, batch-0241, batch-0242, batch-0243, batch-0244, batch-0245, batch-0246, batch-0247, batch-0248, batch-0249, batch-0250, batch-0251, batch-0252, batch-0253, batch-0254, batch-0255, batch-0256, batch-0257, batch-0258, batch-0259, batch-0260, batch-0261, batch-0262, batch-0263, batch-0264, batch-0265, batch-0266, batch-0267, batch-0268, batch-0269, batch-0270, batch-0271, batch-0272, batch-0273, batch-0274, batch-0275, batch-0276, batch-0277, batch-0278, batch-0279, batch-0280, batch-0281, batch-0282, batch-0283, batch-0284, batch-0285, batch-0286, batch-0287, batch-0288, batch-0289, batch-0290, batch-0291, batch-0292, batch-0293, batch-0294, batch-0295, batch-0296, batch-0297, batch-0298, batch-0299, batch-0300, batch-0301, batch-0302, batch-0303, batch-0304, batch-0305, batch-0306, batch-0307, batch-0308, batch-0309, batch-0310, batch-0311, batch-0312, batch-0313, batch-0314, batch-0315, batch-0316, batch-0317, batch-0318, batch-0319, batch-0320, batch-0321, batch-0323, batch-0324, batch-0325, batch-0327, batch-0328, batch-0329, batch-0330, batch-0331, batch-0332, batch-0333, batch-0334, batch-0335, batch-0336, batch-0337, batch-0338, batch-0339, batch-0340, batch-0341, batch-0343, batch-0346, batch-0347, batch-0348, batch-0349, batch-0350, batch-0351, batch-0352, batch-0353, batch-0354, batch-0355, batch-0356, batch-0357, batch-0358, batch-0359, batch-0360, batch-0361, batch-0362, batch-0363, batch-0364, batch-0365, batch-0366, batch-0367, batch-0368, batch-0369, batch-0370, batch-0371, batch-0372, batch-0373, batch-0374, batch-0375, batch-0376, batch-0377, batch-0378, batch-0379, batch-0380, batch-0381, batch-0382, batch-0383, batch-0384, batch-0386, batch-0387, batch-0388, batch-0389, batch-0390, batch-0391, batch-0392, batch-0393, batch-0394, batch-0395, batch-0396, batch-0397, batch-0398, batch-0400, batch-0401, batch-0402, batch-0403, batch-0404, batch-0405, batch-0406, batch-0407, batch-0408, batch-0410, batch-0411, batch-0412, batch-0413, batch-0414, batch-0415-render-fix, batch-0416, batch-0417, batch-0418-scope, batch-0419-scope, batch-0420, batch-0421, batch-0422, batch-0423, batch-0424, batch-0425, batch-0426, batch-0427, batch-0428, batch-0429, batch-0430, batch-0431, batch-0432, batch-0433, batch-0434, batch-0435, batch-0436, batch-0437, batch-0438, batch-0439, batch-0440, batch-0441, batch-0442, batch-0443, batch-0444, batch-0445, batch-0446, batch-0447, batch-0448, batch-0449, batch-0450, batch-0451, batch-0452, batch-0453, batch-0454, batch-0455, batch-0456, batch-0457, batch-0458, batch-0459, batch-0460, batch-0461, batch-0462, batch-0463, batch-0464, batch-0465, batch-0466, batch-0467, batch-0468, batch-0469, batch-0470, batch-0471, batch-0472, batch-0473, batch-0474, batch-0475, batch-0476, batch-0477, batch-0478, batch-0479, batch-0480, batch-0481: **1100 ejercicios con comprobación independiente**, 2328 respuestas/soluciones y 6984 distractores. La evidencia abarca las familias matemáticas de la cola realmente consumida y se vincula a los hashes de cada registro, no solo al código generador: `audit/inference-independent-evidence.json`.
- Los datos oficiales de los índices 9 y 19 son, respectivamente, 120 alumnos con 15 no aptos, y desviación 1,8 con muestra de 36 entidades. Se sustituyeron resoluciones previas que utilizaban datos distintos. Los originales derivados se conservan en `audit/correction-0238-original-records.json`; ningún DOC/PDF se modificó.
- Se comprobaron las diferencias entre amplitud y margen, varianza y desviación, proporción conocida y estimada, y desigualdad estricta/no estricta. Los índices 330, 349, 419, 463, 473, 601, 647 y 673 tienen tamaños mínimos 121, 110, 275, 435, 2237, 1226, 19 y 369, respectivamente. Cuando el enunciado pide también el margen, las cuatro opciones contienen intervalo y margen con el mismo formato.
- El lote 0241 resuelve cuatro tareas con interpretación propia, sin sustituir la pregunta oficial por otra: índice 335, la muestra de 49 no basta al 98% (margen ≈ 0,1396 g/dl frente a 0,125; mínimo alternativo 62); índice 465, el apartado b) usa la nueva proporción 0,25 y requiere 661 observaciones, no la proporción 0,30 de a); índice 496, el intervalo al 93% [0,9011; 0,9489] respalda superar el 88%, y una amplitud inferior a 0,03 al 95% requiere 1.185; índice 669, reducir el error a la mitad manteniendo confianza y desviación requiere exactamente cuadruplicar la muestra de 10 a 40. Se conservan las ocho respuestas y 24 distractores previos en `audit/correction-0241-original-records.json`. No se ha alterado ningún PDF ni el enunciado canónico.
- El lote 0242 incorpora diez comprobaciones adicionales desde el enunciado oficial: índices 249, 374, 668, 854, 933, 938, 953, 1037, 1047 y 1077. En 249 se distingue la proporción 0,355 de Andalucía de la nueva 0,37 para diseñar la muestra de otra comunidad (n mínimo 5.607); no se cambia la procedencia andaluza del ejercicio. En 374 se demuestra que la amplitud es inversamente proporcional a la raíz del tamaño. En 668, el 70% es compatible con el intervalo [0,6846; 0,8154], sin declararlo valor verdadero. Los tamaños mínimos de 668, 854, 933, 938, 953, 1037, 1047 y 1077 son 1.508, 1.080, 107, 10.551, 68, 1.610, 3.934 y 49. Las veinte respuestas y sesenta distractores previos se conservan en `audit/correction-0242-original-records.json`.
- Los 1100 ejercicios tienen 4400 ejecuciones a cuatro anchos; 40 ejercicios mantienen señales. 319 fuentes conservan caracteres de control de extracción o glifos de uso privado y requieren cotejo documental antes de su presentación final.
- El lote 0243 completa cinco casos con doce apartados: pesos de cachorros (514: media 1,0375 kg y margen 0,17324 kg); afijación proporcional (551: 60 hombres y 75 mujeres; dato poblacional a=16,2 comprobado enumerando muestras con y sin reposición); intervalo inverso (591: media 32,3 cm, error 1,1 cm y mínimo 47); distribución de medias, intervalo y tamaño (663: varianza de la media 2,5, IC al 97% [98,56879;105,43121], mínimo 30); levadura (680: amplitud 0,46527 g e IC [9,74959;10,21486]). El lote 0244 cambia exclusivamente la representación de la fracción 5/√10 en las opciones y resultado del caso 663, que la comprobación detectó como lineal. Se mantienen todas las versiones anteriores.
- Se corrigió un ejercicio de probabilidad que contenía una solución de otro problema (índice 1013), utilizando su enunciado oficial; cuatro apartados sustituyen la respuesta errónea.
- Se sustituyó una opción numéricamente equivalente a la correcta (índice 1228), manteniendo una sola respuesta correcta.
- Se recalcularon los tres distractores de facturación del índice 1 para que reproduzcan exactamente los errores descritos: precios intercambiados, omisión del producto B y omisión de marzo. Respuesta correcta y desarrollo conservados; evidencia anterior en `audit/correction-0237-original-record.json`.
- Se repararon discrepancias de año con la cola oficial y un umbral numérico de tamaño muestral. Las versiones previas quedan archivadas en los lotes y en `audit/correction-0235-original-records.jsonl`.
- La capa paralela local incorpora 1438 registros de esta cola; los 200 no habilitados son exactamente los bloqueos documentales individualizados. La ausencia histórica de respuestas, soluciones u opciones no se ha utilizado como bloqueo.
- Se ajusta la representación de soluciones oficiales para preservar palabras españolas como «sin» y «tanto», proteger etiquetas HTML frente al parser de fracciones, interpretar límites de integrales equilibrados y evitar que texto pedagógico sea absorbido por sistemas. Las reglas son generales y quedan cubiertas por regresión. Los cambios preexistentes de Git se conservan; no hay commit ni push.

## Archivos y reproducibilidad

Artefactos principales nuevos: `artifacts/pau-andalucia-resolution/` (lotes, registros generados, bloqueos, controles y auditoría); scripts `consume-pau-andalucia-resolution-batch.mjs`, `audit-pau-andalucia-resolution.mjs`, `check-pau-andalucia-resolution-render.mjs` y `report-pau-andalucia-resolution.mjs`; pruebas `pau-andalucia-resolution-audit.test.mjs` y `pau-andalucia-resolution-recovery.test.mjs`; arnés aislado `tools/pau-resolution-render-check/`. Los constructores y cálculos intermedios están en `tmp/` dentro del proyecto, no fuera de OneDrive.

Repetir auditoría: `node scripts/audit-pau-andalucia-resolution.mjs`. Regenerar este informe después de la prueba visual: `node scripts/report-pau-andalucia-resolution.mjs`. Iniciar comprobación visual aislada: `node scripts/check-pau-andalucia-resolution-render.mjs`; abrir el puerto local anunciado y ejecutar el censo de 1438 × 4. No hay decisiones humanas ni escrituras al banco en esta herramienta.

La entrega tiene 5752 comprobaciones de componentes a 320/375/768/1280 px y 0 fallos: fórmulas y soluciones con las funciones reales de la aplicación y el componente de opciones del examen. Se comprueban apartados completos, opciones ocultas antes de corregir, ausencia de puntuaciones editoriales, comandos crudos, desbordamiento horizontal y fórmulas ocultas. No certifica autenticación, historial del alumno ni una aprobación humana. `scripts/enable-andalucia-inference-delivery.mjs` rechaza cualquier cambio en registros, fuentes, componentes o CSS respecto a la prueba.

El rollback de la entrega se ensaya mediante transformación inversa exacta del banco generado a los 28 registros anteriores, conservados en `delivery/runtime-before-inference.js`. No se ha revertido el banco durante el uso del alumno ni se ha hecho despliegue público.

## Estado final del alcance autorizado

La cola queda recorrida 1.638/1.638: 1438 ejercicios resueltos, verificados y habilitados en la capa paralela local; 200 conservan incidencias documentales que impiden resolverlos con seguridad. La entrega permanece sin commit, push ni despliegue externo. Los años 2000–2009 no forman parte de esta cola y no se han fabricado fuentes para completarlos.

## Git

Estado tomado al generar este informe; incluye cambios previos ajenos a esta corrida.

```text
 app.js                                             | 7905 ++++++++++----------
 .../andalucia-ccssii-2012-doc/rollback-result.json |   12 +-
 artifacts/fase2d-human-review/build-summary.json   |    2 +-
 .../fase2d-human-review/environment-lock.json      |    2 +-
 artifacts/fase2d-human-review/review-manifest.json |    2 +-
 .../test-results.json                              |   14 +-
 bach-exam.js                                       |   82 +-
 index.html                                         |    1 +
 math-renderer.js                                   |   95 +-
 mathup-brand.css                                   |   44 +
 tests/fase2d-human-visual-review.test.mjs          |   31 +-
 11 files changed, 4221 insertions(+), 3969 deletions(-)
```

```text
On branch agent/indice-pruebas-y-autenticacion
Your branch is up to date with 'origin/agent/indice-pruebas-y-autenticacion'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   app.js
	modified:   artifacts/fase2d-human-review/build-summary.json
	modified:   artifacts/fase2d-human-review/environment-lock.json
	modified:   artifacts/fase2d-human-review/review-manifest.json
	modified:   artifacts/official-pau-madrid-andalucia/test-results.json
	modified:   bach-exam.js
	modified:   index.html
	modified:   math-renderer.js
	modified:   mathup-brand.css
	modified:   tests/fase2d-human-visual-review.test.mjs

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	artifacts/pau-andalucia-criteria-segmentation/
	artifacts/pau-andalucia-mass-processing/
	artifacts/pau-andalucia-resolution/
	artifacts/pau-andalucia-runtime/
	artifacts/pau-canonical-andalucia-ccssii-2012-integration/
	artifacts/solution-skill-master-audit/
	artifacts/solution-skill-practical-validation/
	catalog/pau-canonical/mathup.pau-canonical-doc-exercise.v1.schema.json
	catalog/pau-criteria-segmentation/
	catalog/solution-quality/
	data/andalucia-pau-runtime.js
	docs/AUDITORIA-RESPUESTAS-SOLUCIONES-DISTRACTORES-2BACH-PAU-MATHUP.md
	docs/AUDITORIA-RUNTIME-Y-REQUISITOS-FUNCIONALES-2BACH-PAU-MATHUP.md
	docs/AUDITORIA-SKILL-SOLUCIONES-MATHUP.md
	docs/CORRECCION-SKILL-SOLUCIONES-MATHUP.md
	docs/IMPLEMENTACION-PAU-ANDALUCIA-2BACH-MATHUP.md
	docs/INTEGRACION-CANONICA-ANDALUCIA-CCSSII-2012-MATHUP.md
	docs/PROCESAMIENTO-MASIVO-PAU-ANDALUCIA-MATHUP.md
	docs/RESOLUCION-COLA-PAU-ANDALUCIA-MATHUP.md
	docs/SEGMENTACION-CRITERIOS-OFICIALES-PAU-ANDALUCIA-MATHUP.md
	docs/VALIDACION-PRACTICA-SKILL-SOLUCIONES-MATHUP.md
	docs/VALIDACION-SKILL-SOLUCIONES-MATHUP.md
	scripts/_inspect-andalucia-render-issues.mjs
	scripts/_run-andalucia-full-component-check.mjs
	scripts/andalucia-area-resource-pdf-evidence.mjs
	scripts/andalucia-calculus-bounded-piecewise-pdf-evidence.mjs
	scripts/andalucia-calculus-chain-area-weight-pdf-evidence.mjs
	scripts/andalucia-calculus-continuity-pdf-evidence.mjs
	scripts/andalucia-calculus-cost-graphs-pdf-evidence.mjs
	scripts/andalucia-calculus-derivatives-pdf-evidence.mjs
	scripts/andalucia-calculus-extrema-applications-pdf-evidence.mjs
	scripts/andalucia-calculus-graph-branches-pdf-evidence.mjs
	scripts/andalucia-calculus-growth-hyperbola-pdf-evidence.mjs
	scripts/andalucia-calculus-joins-pdf-evidence.mjs
	scripts/andalucia-calculus-official-applications-pdf-evidence.mjs
	scripts/andalucia-calculus-pdf-evidence.mjs
	scripts/andalucia-calculus-rational-exponential-pdf-evidence.mjs
	scripts/andalucia-calculus-rational-plots-pdf-evidence.mjs
	scripts/andalucia-calculus-three-branches-pdf-evidence.mjs
	scripts/andalucia-clients-logistics-pdf-evidence.mjs
	scripts/andalucia-fertilizer-festival-pdf-evidence.mjs
	scripts/andalucia-inference-design-pdf-evidence.mjs
	scripts/andalucia-inference-recovered-design-pdf-evidence.mjs
	scripts/andalucia-inference-returned-pdf-evidence.mjs
	scripts/andalucia-investment-segment-pdf-evidence.mjs
	scripts/andalucia-linear-production-optimal-faces-pdf-evidence.mjs
	scripts/andalucia-linear-resources-mixtures-pdf-evidence.mjs
	scripts/andalucia-matrix-adjacency-pdf-evidence.mjs
	scripts/andalucia-matrix-closing-pdf-evidence.mjs
	scripts/andalucia-matrix-coffee-pdf-evidence.mjs
	scripts/andalucia-matrix-dimensions-pdf-evidence.mjs
	scripts/andalucia-matrix-expanded-pdf-evidence.mjs
	scripts/andalucia-matrix-extended-pdf-evidence.mjs
	scripts/andalucia-matrix-final-pdf-evidence.mjs
	scripts/andalucia-matrix-further-pdf-evidence.mjs
	scripts/andalucia-matrix-late-pdf-evidence.mjs
	scripts/andalucia-matrix-mixed-pdf-evidence.mjs
	scripts/andalucia-matrix-official-remaining-pdf-evidence.mjs
	scripts/andalucia-matrix-order-three-pdf-evidence.mjs
	scripts/andalucia-matrix-parameter-pdf-evidence.mjs
	scripts/andalucia-matrix-pdf-evidence.mjs
	scripts/andalucia-official-formula-chain-pdf-evidence.mjs
	scripts/andalucia-picnic-piecewise-pdf-evidence.mjs
	scripts/andalucia-polynomial-domain-pdf-evidence.mjs
	scripts/andalucia-probability-pdf-parameter-evidence.mjs
	scripts/andalucia-probability-percent-context-pdf-evidence.mjs
	scripts/andalucia-quadratic-business-costs-pdf-evidence.mjs
	scripts/andalucia-quadratic-profit-pdf-evidence.mjs
	scripts/andalucia-reclassified-event-pdf-evidence.mjs
	scripts/andalucia-workshops-advertising-pdf-evidence.mjs
	scripts/audit-andalucia-builder-coverage.mjs
	scripts/audit-pau-andalucia-resolution.mjs
	scripts/audit-solution-skill-master.mjs
	scripts/check-andalucia-inference-delivery.mjs
	scripts/check-andalucia-inference-record-evidence.mjs
	scripts/check-pau-andalucia-resolution-render.mjs
	scripts/consume-pau-andalucia-resolution-batch.mjs
	scripts/correct-andalucia-inference-social-population.mjs
	scripts/enable-andalucia-inference-delivery.mjs
	scripts/integrate-pau-canonical-andalucia-ccssii-2012.ps1
	scripts/prepare-andalucia-inference-delivery.mjs
	scripts/process-pau-andalucia-mass.mjs
	scripts/project-andalucia-approved-labeled-gains.mjs
	scripts/project-andalucia-inference-source-glyphs.mjs
	scripts/project-andalucia-native-doc-math.mjs
	scripts/project-andalucia-native-piecewise.mjs
	scripts/register-andalucia-official-domain-contradiction.mjs
	scripts/render-andalucia-labeled-matrices.mjs
	scripts/report-pau-andalucia-resolution.mjs
	scripts/resolve-andalucia-absolute-area-derivative-system-plane.mjs
	scripts/resolve-andalucia-area-and-resource-production.mjs
	scripts/resolve-andalucia-asymptotes-cubic-tank.mjs
	scripts/resolve-andalucia-calculus-bounded-piecewise.mjs
	scripts/resolve-andalucia-calculus-chain-area-weight.mjs
	scripts/resolve-andalucia-calculus-continuity-official.mjs
	scripts/resolve-andalucia-calculus-cost-graphs.mjs
	scripts/resolve-andalucia-calculus-derivatives-official.mjs
	scripts/resolve-andalucia-calculus-extrema-applications.mjs
	scripts/resolve-andalucia-calculus-graph-branches.mjs
	scripts/resolve-andalucia-calculus-growth-hyperbola.mjs
	scripts/resolve-andalucia-calculus-joins-official.mjs
	scripts/resolve-andalucia-calculus-official-applications.mjs
	scripts/resolve-andalucia-calculus-official.mjs
	scripts/resolve-andalucia-calculus-rational-exponential.mjs
	scripts/resolve-andalucia-calculus-rational-plots.mjs
	scripts/resolve-andalucia-calculus-three-branches.mjs
	scripts/resolve-andalucia-committee-web-probability.mjs
	scripts/resolve-andalucia-concentration-cost-binomial-line-lp-logarea.mjs
	scripts/resolve-andalucia-cone-eigenspace-tetrahedron.mjs
	scripts/resolve-andalucia-confidence-region-stratified-sampling.mjs
	scripts/resolve-andalucia-cubic-matrix-gluing.mjs
	scripts/resolve-andalucia-derivative-mobile-fraction.mjs
	scripts/resolve-andalucia-derivative-mobile-product.mjs
	scripts/resolve-andalucia-distance-semicircle-gluing.mjs
	scripts/resolve-andalucia-distance-trisection-inflection.mjs
	scripts/resolve-andalucia-doc-continuity-2012.mjs
	scripts/resolve-andalucia-doc-derivatives-2012.mjs
	scripts/resolve-andalucia-doc-function-graphs-2012.mjs
	scripts/resolve-andalucia-doc-labeled-gains-2012.mjs
	scripts/resolve-andalucia-doc-linear-2012.mjs
	scripts/resolve-andalucia-doc-linear-final-2012.mjs
	scripts/resolve-andalucia-doc-matrices-2012.mjs
	scripts/resolve-andalucia-doc-matrix-products-2012.mjs
	scripts/resolve-andalucia-doc-rational-functions-2012.mjs
	scripts/resolve-andalucia-exponential-reciprocal-regions.mjs
	scripts/resolve-andalucia-fertilizer-festival.mjs
	scripts/resolve-andalucia-inference-2012.mjs
	scripts/resolve-andalucia-inference-confidence-and-tests.mjs
	scripts/resolve-andalucia-inference-critical-regions.mjs
	scripts/resolve-andalucia-inference-design-contrasts.mjs
	scripts/resolve-andalucia-inference-distribution-completion.mjs
	scripts/resolve-andalucia-inference-doc-remaining.mjs
	scripts/resolve-andalucia-inference-final-source-set.mjs
	scripts/resolve-andalucia-inference-followup.mjs
	scripts/resolve-andalucia-inference-hypothesis-official.mjs
	scripts/resolve-andalucia-inference-hypothesis.mjs
	scripts/resolve-andalucia-inference-interpretation.mjs
	scripts/resolve-andalucia-inference-interval-margin-set.mjs
	scripts/resolve-andalucia-inference-last-intact-normal.mjs
	scripts/resolve-andalucia-inference-late-source-set.mjs
	scripts/resolve-andalucia-inference-mixed-final.mjs
	scripts/resolve-andalucia-inference-multipart.mjs
	scripts/resolve-andalucia-inference-numeral-recovery.mjs
	scripts/resolve-andalucia-inference-pdf-checked.mjs
	scripts/resolve-andalucia-inference-proportion-final.mjs
	scripts/resolve-andalucia-inference-recovered-designs.mjs
	scripts/resolve-andalucia-inference-recovered-multipart.mjs
	scripts/resolve-andalucia-inference-returned-intervals.mjs
	scripts/resolve-andalucia-inference-sampling.mjs
	scripts/resolve-andalucia-inference-source-checked.mjs
	scripts/resolve-andalucia-inference-strata.mjs
	scripts/resolve-andalucia-inference-tests-and-distributions.mjs
	scripts/resolve-andalucia-integral-absolute-cubic-equilateral.mjs
	scripts/resolve-andalucia-integral-substitution-parts-conditions.mjs
	scripts/resolve-andalucia-inverse-parameter-matrices.mjs
	scripts/resolve-andalucia-investment-segment.mjs
	scripts/resolve-andalucia-join-parallel-involutions.mjs
	scripts/resolve-andalucia-limit-geometry-integral-extrema.mjs
	scripts/resolve-andalucia-linear-clients-logistics.mjs
	scripts/resolve-andalucia-linear-diet-and-faces.mjs
	scripts/resolve-andalucia-linear-edge-and-formulation.mjs
	scripts/resolve-andalucia-linear-editorial-triangle.mjs
	scripts/resolve-andalucia-linear-face-attainability.mjs
	scripts/resolve-andalucia-linear-formulation-and-repeated-region.mjs
	scripts/resolve-andalucia-linear-fractional-objective.mjs
	scripts/resolve-andalucia-linear-fruit-source-boundary.mjs
	scripts/resolve-andalucia-linear-last-intact-regions.mjs
	scripts/resolve-andalucia-linear-matrix-mixed.mjs
	scripts/resolve-andalucia-linear-negative-and-level-face.mjs
	scripts/resolve-andalucia-linear-production-models.mjs
	scripts/resolve-andalucia-linear-production-optimal-faces.mjs
	scripts/resolve-andalucia-linear-quadrilaterals-official.mjs
	scripts/resolve-andalucia-linear-range-pentagon.mjs
	scripts/resolve-andalucia-linear-rational-and-faces.mjs
	scripts/resolve-andalucia-linear-recovered-pdf-regions.mjs
	scripts/resolve-andalucia-linear-region-official.mjs
	scripts/resolve-andalucia-linear-resources-mixtures.mjs
	scripts/resolve-andalucia-linear-slopes-and-optimal-edge.mjs
	scripts/resolve-andalucia-linear-triangles-and-levels.mjs
	scripts/resolve-andalucia-linear-unbounded-region.mjs
	scripts/resolve-andalucia-linear-workshops-advertising.mjs
	scripts/resolve-andalucia-mates-areas-mobile-evaluation.mjs
	scripts/resolve-andalucia-mates-asymptote-graphs.mjs
	scripts/resolve-andalucia-mates-bisector-cylinder-window.mjs
	scripts/resolve-andalucia-mates-bisectors-products.mjs
	scripts/resolve-andalucia-mates-commutation-reflection.mjs
	scripts/resolve-andalucia-mates-conjugation-semicycle-cost.mjs
	scripts/resolve-andalucia-mates-contained-cusps-matrix.mjs
	scripts/resolve-andalucia-mates-continuity-metric.mjs
	scripts/resolve-andalucia-mates-continuity-tangency.mjs
	scripts/resolve-andalucia-mates-convexity-rectangle-reflection.mjs
	scripts/resolve-andalucia-mates-cusps-determinants.mjs
	scripts/resolve-andalucia-mates-cyclic-ftc-integrals.mjs
	scripts/resolve-andalucia-mates-dependent-rows.mjs
	scripts/resolve-andalucia-mates-determinants-integrals.mjs
	scripts/resolve-andalucia-mates-determinants-intersections.mjs
	scripts/resolve-andalucia-mates-early-calculus.mjs
	scripts/resolve-andalucia-mates-eigenpowers-rational-limits.mjs
	scripts/resolve-andalucia-mates-exponential-linear-region.mjs
	scripts/resolve-andalucia-mates-exponential-ranks-logcos.mjs
	scripts/resolve-andalucia-mates-ftc-primitives-optimum.mjs
	scripts/resolve-andalucia-mates-gaussian-tangent-areas.mjs
	scripts/resolve-andalucia-mates-gluing-arctangent-parallel.mjs
	scripts/resolve-andalucia-mates-inverse-normal-geometry.mjs
	scripts/resolve-andalucia-mates-inverse-parametric.mjs
	scripts/resolve-andalucia-mates-limit-substitution-area.mjs
	scripts/resolve-andalucia-mates-limits-singular-system.mjs
	scripts/resolve-andalucia-mates-linear-constraints.mjs
	scripts/resolve-andalucia-mates-log-ftc-limits.mjs
	scripts/resolve-andalucia-mates-log-gluing.mjs
	scripts/resolve-andalucia-mates-log-parabola-areas.mjs
	scripts/resolve-andalucia-mates-log-rank-volume.mjs
	scripts/resolve-andalucia-mates-logarithm-continuity.mjs
	scripts/resolve-andalucia-mates-matrix-equations.mjs
	scripts/resolve-andalucia-mates-matrix-log-primitives.mjs
	scripts/resolve-andalucia-mates-matrix-operator-identities.mjs
	scripts/resolve-andalucia-mates-matrix-prices.mjs
	scripts/resolve-andalucia-mates-matrix-primitive.mjs
	scripts/resolve-andalucia-mates-matrix-primitives-coins.mjs
	scripts/resolve-andalucia-mates-metric-parameters.mjs
	scripts/resolve-andalucia-mates-normal-absolute-areas.mjs
	scripts/resolve-andalucia-mates-normal-integral-design.mjs
	scripts/resolve-andalucia-mates-normal-limits-gaussian.mjs
	scripts/resolve-andalucia-mates-normal-official.mjs
	scripts/resolve-andalucia-mates-official-geometry-limit.mjs
	scripts/resolve-andalucia-mates-optimal-slope-regions.mjs
	scripts/resolve-andalucia-mates-orthogonal-projections.mjs
	scripts/resolve-andalucia-mates-parabola-exponential.mjs
	scripts/resolve-andalucia-mates-parallel-ranks-ftc.mjs
	scripts/resolve-andalucia-mates-parameter-systems.mjs
	scripts/resolve-andalucia-mates-parameters-reflection.mjs
	scripts/resolve-andalucia-mates-periodic-matrices.mjs
	scripts/resolve-andalucia-mates-perpendicular-optimum.mjs
	scripts/resolve-andalucia-mates-perpendicular-reflections.mjs
	scripts/resolve-andalucia-mates-plane-exponential-log.mjs
	scripts/resolve-andalucia-mates-plane-gluing-primitives.mjs
	scripts/resolve-andalucia-mates-plane-metrics.mjs
	scripts/resolve-andalucia-mates-primitives-rank-planes.mjs
	scripts/resolve-andalucia-mates-projections-reflections.mjs
	scripts/resolve-andalucia-mates-rank-skew-lines.mjs
	scripts/resolve-andalucia-mates-rank-tetrahedra.mjs
	scripts/resolve-andalucia-mates-ranks-determinants.mjs
	scripts/resolve-andalucia-mates-rational-distance-nilpotent.mjs
	scripts/resolve-andalucia-mates-rational-nilpotent.mjs
	scripts/resolve-andalucia-mates-reflection-orders-gluing.mjs
	scripts/resolve-andalucia-mates-reflections-rank.mjs
	scripts/resolve-andalucia-mates-scope-metrics.mjs
	scripts/resolve-andalucia-mates-secant-rational-matrix.mjs
	scripts/resolve-andalucia-mates-source-areas.mjs
	scripts/resolve-andalucia-mates-source-calculus-ranks.mjs
	scripts/resolve-andalucia-mates-source-models-geometry.mjs
	scripts/resolve-andalucia-mates-spatial-isometries.mjs
	scripts/resolve-andalucia-mates-stationary-rank-projections.mjs
	scripts/resolve-andalucia-mates-symmetry-compatibility-normals.mjs
	scripts/resolve-andalucia-mates-tangent-exponential-areas.mjs
	scripts/resolve-andalucia-mates-tank-inverse-distance.mjs
	scripts/resolve-andalucia-mates-trig-quartic-areas.mjs
	scripts/resolve-andalucia-matrix-adjacency-official.mjs
	scripts/resolve-andalucia-matrix-closing-official.mjs
	scripts/resolve-andalucia-matrix-coffee-labels.mjs
	scripts/resolve-andalucia-matrix-dimensions-and-right-equations.mjs
	scripts/resolve-andalucia-matrix-expanded-official.mjs
	scripts/resolve-andalucia-matrix-extended-official.mjs
	scripts/resolve-andalucia-matrix-final-official.mjs
	scripts/resolve-andalucia-matrix-further-official.mjs
	scripts/resolve-andalucia-matrix-geometry-verification.mjs
	scripts/resolve-andalucia-matrix-hotel-and-gram.mjs
	scripts/resolve-andalucia-matrix-late-official.mjs
	scripts/resolve-andalucia-matrix-mixed-official.mjs
	scripts/resolve-andalucia-matrix-official-remaining.mjs
	scripts/resolve-andalucia-matrix-order-three.mjs
	scripts/resolve-andalucia-matrix-parameter-inverse.mjs
	scripts/resolve-andalucia-matrix-powers-and-equations.mjs
	scripts/resolve-andalucia-mobile-proof-steps.mjs
	scripts/resolve-andalucia-normal-pdf-numerals.mjs
	scripts/resolve-andalucia-official-formula-chain.mjs
	scripts/resolve-andalucia-parametric-matrix-equations.mjs
	scripts/resolve-andalucia-pens-stratified-watermelon.mjs
	scripts/resolve-andalucia-picnic-piecewise-area.mjs
	scripts/resolve-andalucia-piecewise-cubic-absolute-areas.mjs
	scripts/resolve-andalucia-polynomial-domain-applications.mjs
	scripts/resolve-andalucia-probability-2012.mjs
	scripts/resolve-andalucia-probability-binomial-factory.mjs
	scripts/resolve-andalucia-probability-branch-weights.mjs
	scripts/resolve-andalucia-probability-branches-campus.mjs
	scripts/resolve-andalucia-probability-composite-experiments.mjs
	scripts/resolve-andalucia-probability-conditioned-events.mjs
	scripts/resolve-andalucia-probability-contingencies.mjs
	scripts/resolve-andalucia-probability-dice-and-surveys.mjs
	scripts/resolve-andalucia-probability-event-models.mjs
	scripts/resolve-andalucia-probability-final-pdf-contexts.mjs
	scripts/resolve-andalucia-probability-final-source-models.mjs
	scripts/resolve-andalucia-probability-interpreted-comparisons.mjs
	scripts/resolve-andalucia-probability-partitions.mjs
	scripts/resolve-andalucia-probability-pdf-event-comparisons.mjs
	scripts/resolve-andalucia-probability-pdf-recovered-branches.mjs
	scripts/resolve-andalucia-probability-percent-contexts.mjs
	scripts/resolve-andalucia-probability-population-partitions.mjs
	scripts/resolve-andalucia-probability-reclassified-events.mjs
	scripts/resolve-andalucia-probability-sampling-branches.mjs
	scripts/resolve-andalucia-probability-sets-2012.mjs
	scripts/resolve-andalucia-probability-source-branches.mjs
	scripts/resolve-andalucia-probability-total-bayes.mjs
	scripts/resolve-andalucia-probability-transfer-and-tests.mjs
	scripts/resolve-andalucia-probability-urns-and-events.mjs
	scripts/resolve-andalucia-quadratic-business-costs.mjs
	scripts/resolve-andalucia-quadratic-profit-graphs.mjs
	scripts/resolve-andalucia-rank-product-diagonal.mjs
	scripts/resolve-andalucia-reflection-angle-compatible.mjs
	scripts/resolve-andalucia-sampling-scooters-pdf.mjs
	scripts/resolve-andalucia-source-chain-extrema.mjs
	scripts/resolve-andalucia-source-read-basketball-distance.mjs
	scripts/resolve-andalucia-source-read-normal-variance.mjs
	scripts/resolve-andalucia-spatial-vectors-official.mjs
	scripts/resolve-andalucia-storage-piecewise-hyperbola.mjs
	scripts/resolve-andalucia-supplement-minimum.mjs
	scripts/resolve-andalucia-tangent-piecewise-regions.mjs
	scripts/resolve-andalucia-triangle-parallelogram-geometry.mjs
	scripts/resolve-andalucia-whole-exercise-delivery-scope.mjs
	scripts/rollback-pau-andalucia-runtime.ps1
	scripts/segment-and-link-official-pau-andalucia-criteria.mjs
	scripts/trial-rollback-pau-canonical-andalucia-ccssii-2012-integration.ps1
	scripts/validate-solution-skill-practical.mjs
	scripts/verify-pau-andalucia-mass-processing.mjs
	scripts/verify-pau-canonical-andalucia-ccssii-2012-integration.ps1
	tests/pau-andalucia-approved-labeled-gains-projection.test.mjs
	tests/pau-andalucia-criteria-segmentation.test.mjs
	tests/pau-andalucia-delivery-viewport.test.mjs
	tests/pau-andalucia-inference-delivery.test.mjs
	tests/pau-andalucia-inference-source-glyphs.test.mjs
	tests/pau-andalucia-labeled-matrix-source.test.mjs
	tests/pau-andalucia-mass-processing.test.mjs
	tests/pau-andalucia-resolution-absolute-area-derivative-system-plane.test.mjs
	tests/pau-andalucia-resolution-area-resource.test.mjs
	tests/pau-andalucia-resolution-asymptotes-cubic-tank.test.mjs
	tests/pau-andalucia-resolution-audit.test.mjs
	tests/pau-andalucia-resolution-billing.test.mjs
	tests/pau-andalucia-resolution-calculus-bounded-piecewise.test.mjs
	tests/pau-andalucia-resolution-calculus-chain-area-weight.test.mjs
	tests/pau-andalucia-resolution-calculus-continuity-official.test.mjs
	tests/pau-andalucia-resolution-calculus-cost-graphs.test.mjs
	tests/pau-andalucia-resolution-calculus-derivatives-official.test.mjs
	tests/pau-andalucia-resolution-calculus-extrema-applications.test.mjs
	tests/pau-andalucia-resolution-calculus-graph-branches.test.mjs
	tests/pau-andalucia-resolution-calculus-growth-hyperbola.test.mjs
	tests/pau-andalucia-resolution-calculus-joins-official.test.mjs
	tests/pau-andalucia-resolution-calculus-official-applications.test.mjs
	tests/pau-andalucia-resolution-calculus-official.test.mjs
	tests/pau-andalucia-resolution-calculus-rational-exponential.test.mjs
	tests/pau-andalucia-resolution-calculus-rational-plots.test.mjs
	tests/pau-andalucia-resolution-calculus-three-branches.test.mjs
	tests/pau-andalucia-resolution-committee-web-probability.test.mjs
	tests/pau-andalucia-resolution-concentration-cost-binomial-line-lp-logarea.test.mjs
	tests/pau-andalucia-resolution-cone-eigenspace-tetrahedron.test.mjs
	tests/pau-andalucia-resolution-confidence-region-stratified-sampling.test.mjs
	tests/pau-andalucia-resolution-cubic-matrix-gluing.test.mjs
	tests/pau-andalucia-resolution-distance-semicircle-gluing.test.mjs
	tests/pau-andalucia-resolution-distance-trisection-inflection.test.mjs
	tests/pau-andalucia-resolution-doc-continuity-2012.test.mjs
	tests/pau-andalucia-resolution-doc-derivatives-2012.test.mjs
	tests/pau-andalucia-resolution-doc-function-graphs-2012.test.mjs
	tests/pau-andalucia-resolution-doc-labeled-gains.test.mjs
	tests/pau-andalucia-resolution-doc-linear-2012.test.mjs
	tests/pau-andalucia-resolution-doc-linear-final-2012.test.mjs
	tests/pau-andalucia-resolution-doc-matrices-2012.test.mjs
	tests/pau-andalucia-resolution-doc-matrix-products-2012.test.mjs
	tests/pau-andalucia-resolution-doc-rational-functions-2012.test.mjs
	tests/pau-andalucia-resolution-exponential-reciprocal-regions.test.mjs
	tests/pau-andalucia-resolution-fertilizer-festival.test.mjs
	tests/pau-andalucia-resolution-inference-confidence-and-tests.test.mjs
	tests/pau-andalucia-resolution-inference-critical-regions.test.mjs
	tests/pau-andalucia-resolution-inference-design-contrasts.test.mjs
	tests/pau-andalucia-resolution-inference-distribution-completion.test.mjs
	tests/pau-andalucia-resolution-inference-doc-remaining.test.mjs
	tests/pau-andalucia-resolution-inference-final-source-set.test.mjs
	tests/pau-andalucia-resolution-inference-followup.test.mjs
	tests/pau-andalucia-resolution-inference-hypothesis-official.test.mjs
	tests/pau-andalucia-resolution-inference-hypothesis.test.mjs
	tests/pau-andalucia-resolution-inference-interpretation.test.mjs
	tests/pau-andalucia-resolution-inference-interval-margin-set.test.mjs
	tests/pau-andalucia-resolution-inference-last-intact-normal.test.mjs
	tests/pau-andalucia-resolution-inference-late-source-set.test.mjs
	tests/pau-andalucia-resolution-inference-mixed-final.test.mjs
	tests/pau-andalucia-resolution-inference-multipart.test.mjs
	tests/pau-andalucia-resolution-inference-numeral-recovery.test.mjs
	tests/pau-andalucia-resolution-inference-pdf-checked.test.mjs
	tests/pau-andalucia-resolution-inference-proportion-final.test.mjs
	tests/pau-andalucia-resolution-inference-recovered-designs.test.mjs
	tests/pau-andalucia-resolution-inference-recovered-multipart.test.mjs
	tests/pau-andalucia-resolution-inference-returned-intervals.test.mjs
	tests/pau-andalucia-resolution-inference-sampling.test.mjs
	tests/pau-andalucia-resolution-inference-source-checked.test.mjs
	tests/pau-andalucia-resolution-inference-strata.test.mjs
	tests/pau-andalucia-resolution-inference-tests-and-distributions.test.mjs
	tests/pau-andalucia-resolution-inference.test.mjs
	tests/pau-andalucia-resolution-integral-absolute-cubic-equilateral.test.mjs
	tests/pau-andalucia-resolution-integral-substitution-parts-conditions.test.mjs
	tests/pau-andalucia-resolution-inverse-parameter-matrices.test.mjs
	tests/pau-andalucia-resolution-investment-segment.test.mjs
	tests/pau-andalucia-resolution-join-parallel-involutions.test.mjs
	tests/pau-andalucia-resolution-limit-geometry-integral-extrema.test.mjs
	tests/pau-andalucia-resolution-linear-clients-logistics.test.mjs
	tests/pau-andalucia-resolution-linear-diet-faces.test.mjs
	tests/pau-andalucia-resolution-linear-edge-formulation.test.mjs
	tests/pau-andalucia-resolution-linear-editorial-triangle.test.mjs
	tests/pau-andalucia-resolution-linear-face-attainability.test.mjs
	tests/pau-andalucia-resolution-linear-formulation-repeated.test.mjs
	tests/pau-andalucia-resolution-linear-fractional-objective.test.mjs
	tests/pau-andalucia-resolution-linear-fruit-boundary.test.mjs
	tests/pau-andalucia-resolution-linear-last-regions.test.mjs
	tests/pau-andalucia-resolution-linear-matrix-mixed.test.mjs
	tests/pau-andalucia-resolution-linear-negative-face.test.mjs
	tests/pau-andalucia-resolution-linear-production-models.test.mjs
	tests/pau-andalucia-resolution-linear-production-optimal-faces.test.mjs
	tests/pau-andalucia-resolution-linear-quadrilaterals.test.mjs
	tests/pau-andalucia-resolution-linear-range-pentagon.test.mjs
	tests/pau-andalucia-resolution-linear-rational-faces.test.mjs
	tests/pau-andalucia-resolution-linear-recovered-pdf-regions.test.mjs
	tests/pau-andalucia-resolution-linear-region.test.mjs
	tests/pau-andalucia-resolution-linear-resources-mixtures.test.mjs
	tests/pau-andalucia-resolution-linear-slopes-edge.test.mjs
	tests/pau-andalucia-resolution-linear-triangles-levels.test.mjs
	tests/pau-andalucia-resolution-linear-unbounded-region.test.mjs
	tests/pau-andalucia-resolution-linear-workshops-advertising.test.mjs
	tests/pau-andalucia-resolution-mates-asymptote-graphs.test.mjs
	tests/pau-andalucia-resolution-mates-bisector-cylinder-window.test.mjs
	tests/pau-andalucia-resolution-mates-bisectors-products.test.mjs
	tests/pau-andalucia-resolution-mates-commutation-reflection.test.mjs
	tests/pau-andalucia-resolution-mates-conjugation-semicycle-cost.test.mjs
	tests/pau-andalucia-resolution-mates-contained-cusps-matrix.test.mjs
	tests/pau-andalucia-resolution-mates-continuity-metric.test.mjs
	tests/pau-andalucia-resolution-mates-continuity-tangency.test.mjs
	tests/pau-andalucia-resolution-mates-convexity-rectangle-reflection.test.mjs
	tests/pau-andalucia-resolution-mates-cusps-determinants.test.mjs
	tests/pau-andalucia-resolution-mates-cyclic-ftc-integrals.test.mjs
	tests/pau-andalucia-resolution-mates-dependent-rows.test.mjs
	tests/pau-andalucia-resolution-mates-determinants-integrals.test.mjs
	tests/pau-andalucia-resolution-mates-determinants-intersections.test.mjs
	tests/pau-andalucia-resolution-mates-early-calculus.test.mjs
	tests/pau-andalucia-resolution-mates-eigenpowers-rational-limits.test.mjs
	tests/pau-andalucia-resolution-mates-exponential-linear-region.test.mjs
	tests/pau-andalucia-resolution-mates-exponential-ranks-logcos.test.mjs
	tests/pau-andalucia-resolution-mates-ftc-primitives-optimum.test.mjs
	tests/pau-andalucia-resolution-mates-gaussian-tangent-areas.test.mjs
	tests/pau-andalucia-resolution-mates-gluing-arctangent-parallel.test.mjs
	tests/pau-andalucia-resolution-mates-inverse-normal-geometry.test.mjs
	tests/pau-andalucia-resolution-mates-inverse-parametric.test.mjs
	tests/pau-andalucia-resolution-mates-limit-substitution-area.test.mjs
	tests/pau-andalucia-resolution-mates-limits-singular-system.test.mjs
	tests/pau-andalucia-resolution-mates-linear-constraints.test.mjs
	tests/pau-andalucia-resolution-mates-log-ftc-limits.test.mjs
	tests/pau-andalucia-resolution-mates-log-gluing.test.mjs
	tests/pau-andalucia-resolution-mates-log-parabola-areas.test.mjs
	tests/pau-andalucia-resolution-mates-log-rank-volume.test.mjs
	tests/pau-andalucia-resolution-mates-logarithm-continuity.test.mjs
	tests/pau-andalucia-resolution-mates-matrix-equations.test.mjs
	tests/pau-andalucia-resolution-mates-matrix-log-primitives.test.mjs
	tests/pau-andalucia-resolution-mates-matrix-operator-identities.test.mjs
	tests/pau-andalucia-resolution-mates-matrix-prices.test.mjs
	tests/pau-andalucia-resolution-mates-matrix-primitive.test.mjs
	tests/pau-andalucia-resolution-mates-matrix-primitives-coins.test.mjs
	tests/pau-andalucia-resolution-mates-metric-parameters.test.mjs
	tests/pau-andalucia-resolution-mates-normal-absolute-areas.test.mjs
	tests/pau-andalucia-resolution-mates-normal-integral-design.test.mjs
	tests/pau-andalucia-resolution-mates-normal-limits-gaussian.test.mjs
	tests/pau-andalucia-resolution-mates-normal-official.test.mjs
	tests/pau-andalucia-resolution-mates-official-geometry-limit.test.mjs
	tests/pau-andalucia-resolution-mates-optimal-slope-regions.test.mjs
	tests/pau-andalucia-resolution-mates-orthogonal-projections.test.mjs
	tests/pau-andalucia-resolution-mates-parabola-exponential.test.mjs
	tests/pau-andalucia-resolution-mates-parallel-ranks-ftc.test.mjs
	tests/pau-andalucia-resolution-mates-parameter-systems.test.mjs
	tests/pau-andalucia-resolution-mates-parameters-reflection.test.mjs
	tests/pau-andalucia-resolution-mates-periodic-matrices.test.mjs
	tests/pau-andalucia-resolution-mates-perpendicular-optimum.test.mjs
	tests/pau-andalucia-resolution-mates-perpendicular-reflections.test.mjs
	tests/pau-andalucia-resolution-mates-plane-exponential-log.test.mjs
	tests/pau-andalucia-resolution-mates-plane-gluing-primitives.test.mjs
	tests/pau-andalucia-resolution-mates-plane-metrics.test.mjs
	tests/pau-andalucia-resolution-mates-primitives-rank-planes.test.mjs
	tests/pau-andalucia-resolution-mates-projections-reflections.test.mjs
	tests/pau-andalucia-resolution-mates-rank-skew-lines.test.mjs
	tests/pau-andalucia-resolution-mates-rank-tetrahedra.test.mjs
	tests/pau-andalucia-resolution-mates-ranks-determinants.test.mjs
	tests/pau-andalucia-resolution-mates-rational-distance-nilpotent.test.mjs
	tests/pau-andalucia-resolution-mates-rational-nilpotent.test.mjs
	tests/pau-andalucia-resolution-mates-reflection-orders-gluing.test.mjs
	tests/pau-andalucia-resolution-mates-reflections-rank.test.mjs
	tests/pau-andalucia-resolution-mates-scope-metrics.test.mjs
	tests/pau-andalucia-resolution-mates-secant-rational-matrix.test.mjs
	tests/pau-andalucia-resolution-mates-source-areas.test.mjs
	tests/pau-andalucia-resolution-mates-source-calculus-ranks.test.mjs
	tests/pau-andalucia-resolution-mates-source-models-geometry.test.mjs
	tests/pau-andalucia-resolution-mates-spatial-isometries.test.mjs
	tests/pau-andalucia-resolution-mates-stationary-rank-projections.test.mjs
	tests/pau-andalucia-resolution-mates-symmetry-compatibility-normals.test.mjs
	tests/pau-andalucia-resolution-mates-tangent-exponential-areas.test.mjs
	tests/pau-andalucia-resolution-mates-tank-inverse-distance.test.mjs
	tests/pau-andalucia-resolution-mates-trig-quartic-areas.test.mjs
	tests/pau-andalucia-resolution-matrix-adjacency-official.test.mjs
	tests/pau-andalucia-resolution-matrix-closing-official.test.mjs
	tests/pau-andalucia-resolution-matrix-coffee-labels.test.mjs
	tests/pau-andalucia-resolution-matrix-dimensions.test.mjs
	tests/pau-andalucia-resolution-matrix-expanded-official.test.mjs
	tests/pau-andalucia-resolution-matrix-extended-official.test.mjs
	tests/pau-andalucia-resolution-matrix-final-official.test.mjs
	tests/pau-andalucia-resolution-matrix-further-official.test.mjs
	tests/pau-andalucia-resolution-matrix-geometry-verification.test.mjs
	tests/pau-andalucia-resolution-matrix-hotel-gram.test.mjs
	tests/pau-andalucia-resolution-matrix-late-official.test.mjs
	tests/pau-andalucia-resolution-matrix-mixed-official.test.mjs
	tests/pau-andalucia-resolution-matrix-official-remaining.test.mjs
	tests/pau-andalucia-resolution-matrix-order-three.test.mjs
	tests/pau-andalucia-resolution-matrix-parameter-inverse.test.mjs
	tests/pau-andalucia-resolution-matrix-powers-equations.test.mjs
	tests/pau-andalucia-resolution-matrix-remaining-projection.test.mjs
	tests/pau-andalucia-resolution-native-doc-projection.test.mjs
	tests/pau-andalucia-resolution-normal-pdf-numerals.test.mjs
	tests/pau-andalucia-resolution-official-domain-contradiction.test.mjs
	tests/pau-andalucia-resolution-official-formula-chain.test.mjs
	tests/pau-andalucia-resolution-parametric-matrix-equations.test.mjs
	tests/pau-andalucia-resolution-pens-watermelon.test.mjs
	tests/pau-andalucia-resolution-picnic-piecewise-area.test.mjs
	tests/pau-andalucia-resolution-piecewise-cubic-absolute-areas.test.mjs
	tests/pau-andalucia-resolution-polynomial-domain-applications.test.mjs
	tests/pau-andalucia-resolution-probability-2012.test.mjs
	tests/pau-andalucia-resolution-probability-binomial-factory.test.mjs
	tests/pau-andalucia-resolution-probability-branch-weights.test.mjs
	tests/pau-andalucia-resolution-probability-branches-campus.test.mjs
	tests/pau-andalucia-resolution-probability-composite-experiments.test.mjs
	tests/pau-andalucia-resolution-probability-conditioned-events.test.mjs
	tests/pau-andalucia-resolution-probability-contingencies.test.mjs
	tests/pau-andalucia-resolution-probability-dice-and-surveys.test.mjs
	tests/pau-andalucia-resolution-probability-event-models.test.mjs
	tests/pau-andalucia-resolution-probability-final-pdf-contexts.test.mjs
	tests/pau-andalucia-resolution-probability-final-source-models.test.mjs
	tests/pau-andalucia-resolution-probability-interpreted-comparisons.test.mjs
	tests/pau-andalucia-resolution-probability-partitions.test.mjs
	tests/pau-andalucia-resolution-probability-pdf-event-comparisons.test.mjs
	tests/pau-andalucia-resolution-probability-pdf-recovered-branches.test.mjs
	tests/pau-andalucia-resolution-probability-percent-contexts.test.mjs
	tests/pau-andalucia-resolution-probability-population-partitions.test.mjs
	tests/pau-andalucia-resolution-probability-reclassified-events.test.mjs
	tests/pau-andalucia-resolution-probability-sampling-branches.test.mjs
	tests/pau-andalucia-resolution-probability-sets-2012.test.mjs
	tests/pau-andalucia-resolution-probability-source-branches.test.mjs
	tests/pau-andalucia-resolution-probability-total-bayes.test.mjs
	tests/pau-andalucia-resolution-probability-transfer-and-tests.test.mjs
	tests/pau-andalucia-resolution-probability-urns-and-events.test.mjs
	tests/pau-andalucia-resolution-quadratic-business-costs.test.mjs
	tests/pau-andalucia-resolution-quadratic-profit-graphs.test.mjs
	tests/pau-andalucia-resolution-rank-product-diagonal.test.mjs
	tests/pau-andalucia-resolution-recovery.test.mjs
	tests/pau-andalucia-resolution-reflection-angle-compatible.test.mjs
	tests/pau-andalucia-resolution-render-adapter.test.mjs
	tests/pau-andalucia-resolution-sampling-scooters-pdf.test.mjs
	tests/pau-andalucia-resolution-source-chain-extrema.test.mjs
	tests/pau-andalucia-resolution-source-read-basketball-distance.test.mjs
	tests/pau-andalucia-resolution-source-read-normal-variance.test.mjs
	tests/pau-andalucia-resolution-spatial-vectors.test.mjs
	tests/pau-andalucia-resolution-storage-piecewise-hyperbola.test.mjs
	tests/pau-andalucia-resolution-supplement-minimum.test.mjs
	tests/pau-andalucia-resolution-tangent-piecewise-regions.test.mjs
	tests/pau-andalucia-resolution-triangle-parallelogram-geometry.test.mjs
	tests/pau-andalucia-runtime.test.mjs
	tests/pau-andalucia-whole-prompt-projection.test.mjs
	tests/pau-canonical-andalucia-ccssii-2012-integration.test.ps1
	tests/solution-skill-master.test.mjs
	tests/solution-skill-practical-validation.test.mjs
	tools/andalucia-inference-delivery/
	tools/pau-resolution-render-check/
	tools/solution-skill-practical-validation/

no changes added to commit (use "git add" and/or "git commit -a")
```

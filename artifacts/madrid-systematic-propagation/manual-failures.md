# Inventario previo de fallos manuales · Madrid

| caso | exerciseId | materia | tema | fallo observado | categoría | causa probable |
|---:|---|---|---|---|---|---|
| 1 | madrid-mates-1.1.2 | Matemáticas II | Matrices/Determinantes | El desarrollo del determinante saltaba cada elemento por su menor complementario. | METHODOLOGY_DETERMINANT | Materialización pedagógica incompleta. |
| 2 | madrid-mates-1.2.1 | Matemáticas II | Determinantes | `A = matriz` y `B = matriz` aparecían apiladas y con el igual solapado, en vez de una fila conjunta. | MATRIX_PAIR_LAYOUT | HTML canónico no estructurado y CSS sin contrato atómico. |
| 2 | madrid-mates-1.2.1 | Matemáticas II | Determinantes | La solución empleaba `D+uuᵀ` y el lema del determinante; debía hacer ceros y desarrollar por la fila/columna con más ceros. | METHODOLOGY_DETERMINANT | Método de solución no ajustado al curso. |
| 3 | madrid-mates-1.1.1 | Matemáticas II | Resolución de sistemas con determinantes | El sistema del enunciado aparecía linealizado, sin llave ni una ecuación por fila. | SYSTEM_RENDER | Fuente canónica serializada como texto plano. |
| 3 | madrid-mates-1.1.1 | Matemáticas II | Resolución de sistemas con determinantes | Estaba en Matrices aunque la tarea principal es discutir/resolver un sistema. | PRIMARY_TOPIC_ERROR | Clasificación heredada por contenido incidental. |
| 3 | madrid-mates-1.1.1 | Matemáticas II | Resolución de sistemas con determinantes | Faltaban matrices de coeficientes y ampliada, determinante por Sarrus, valores críticos, rangos y Rouché–Frobenius. | METHODOLOGY_ROUCHE_FROBENIUS | Solución abreviada. |
| 3 | madrid-mates-1.1.1 | Matemáticas II | Resolución de sistemas con determinantes | En b) faltaba escribir el sistema particular, identificarlo como SCI y parametrizarlo paso a paso. | METHODOLOGY_SCI | Solución abreviada. |
| 3 | madrid-mates-1.1.1 | Matemáticas II | Resolución de sistemas con determinantes | En c) la respuesta estaba mal compuesta y el SCD no se resolvía por Cramer con determinantes visibles. | METHODOLOGY_CRAMER | Solución y renderer insuficientes. |
| 4 | madrid-mates-1.2.3 | Matemáticas II | Resolución de sistemas con determinantes | El sistema del enunciado aparecía en una línea. | SYSTEM_RENDER | Fuente canónica serializada como texto plano. |
| 4 | madrid-mates-1.2.3 | Matemáticas II | Resolución de sistemas con determinantes | La discusión debía hacerse mediante rangos y Rouché–Frobenius. | METHODOLOGY_ROUCHE_FROBENIUS | Solución abreviada. |
| 5 | madrid-mates-3.2.6 | Matemáticas II | Aplicaciones de derivadas/Áreas | En c) había fracciones lineales y los límites no estaban unidos a los extremos del signo integral. | FRACTION_INTEGRAL_RENDER | Parser matemático parcial. |
| 5 | madrid-mates-3.2.6 | Matemáticas II | Aplicaciones de derivadas/Áreas | Faltaban gráfica, curvas identificadas, cortes, región sombreada y justificación de techo/suelo. | AREA_GRAPH_MISSING | Generador/materialización de gráficas no aplicado. |
| 6 | madrid-mates-3.1.1 | Matemáticas II | Límites y asíntotas | El enunciado mostraba una fracción lineal y no componía correctamente la definición por casos. | FRACTION_PIECEWISE_RENDER | Canonical y parser matemático incompletos. |
| 6 | madrid-mates-3.1.1 | Matemáticas II | Límites y asíntotas | `x→0` y `h→0` aparecían en línea, no bajo `lim`. | LIMIT_RENDER | Serialización textual de límites. |
| 6 | madrid-mates-3.1.1 | Matemáticas II | Límites y asíntotas | En b) faltaba partir de la definición de derivada y desarrollar la sustitución paso a paso. | METHODOLOGY_DERIVATIVE_DEFINITION | Solución abreviada. |
| 6 | madrid-mates-3.1.1 | Matemáticas II | Límites y asíntotas | En c) faltaban las definiciones y comprobaciones separadas de asíntotas verticales, horizontales y oblicuas. | METHODOLOGY_ASYMPTOTES | Solución abreviada. |
| 7 | madrid-mates-3.3.7 | Matemáticas II | Derivadas/Límites | El límite y el cociente aparecían linealizados. | LIMIT_FRACTION_RENDER | Parser matemático parcial. |
| 7 | madrid-mates-3.3.7 | Matemáticas II | Derivadas/Límites | Faltaba la cadena: sustitución, `0/0`, L’Hôpital, cociente de derivadas, nueva sustitución y resultado. | METHODOLOGY_LHOPITAL | Solución abreviada. |
| 8 | madrid-mates-3.1.3 | Matemáticas II | Áreas | Se mostraba HTML interno (`<span class="math-root">`) al alumno. | INTERNAL_TOKEN_VISIBLE | Materialización/escape incorrecto. |
| 8 | madrid-mates-3.1.3 | Matemáticas II | Áreas | Faltaba la gráfica con funciones, cortes y regiones identificadas. | AREA_GRAPH_MISSING | Generador/materialización de gráficas no aplicado. |
| 9 | madrid-mates-3.2.2 | Matemáticas II | Integrales | Límites y fracciones aparecían linealizados en enunciado y solución. | FRACTION_INTEGRAL_RENDER | Parser matemático parcial. |
| 9 | madrid-mates-3.2.2 | Matemáticas II | Integrales | En a) faltaba presentar el cambio de variable completo y la cadena de integrales. | METHODOLOGY_SUBSTITUTION | Solución abreviada. |
| 9 | madrid-mates-3.2.2 | Matemáticas II | Integrales | En b) faltaba desarrollar fracciones simples: A/B, denominador común, igualdad de numeradores, valores que anulan factores, sustitución e integración. | METHODOLOGY_PARTIAL_FRACTIONS | Solución abreviada. |
| 10 | madrid-mates-2.1.2 | Matemáticas II | Geometría | Había fracciones lineales en opciones y soluciones de a) y b). | FRACTION_RENDER | Opciones y soluciones no pasaban por el renderer estructurado. |
| 10 | madrid-mates-2.1.2 | Matemáticas II | Geometría | En a) faltaban `\overrightarrow{PA}`, su módulo y la fórmula vectorial de distancia punto–recta desarrollada. | METHODOLOGY_POINT_LINE_DISTANCE | Solución abreviada. |
| 11 | madrid-mates-4.8.7 | Matemáticas II | Distribución normal | En b) faltaban las fórmulas `μ=np` y `σ=√(npq)` con sustitución. | METHODOLOGY_NORMAL | Solución abreviada. |
| 11 | madrid-mates-4.8.7 | Matemáticas II | Distribución normal | Faltaba justificar la corrección de continuidad `Y≥40 → Y_N>39,5` y tipificar dentro de la probabilidad. | METHODOLOGY_NORMAL_CONTINUITY | Solución abreviada. |
| 12 | madrid-ccss-1.2.1 | CCSS II | Matrices | Las matrices A y B aparecían como tuplas lineales, no como matrices reales. | MATRIX_RENDER | Fuente canónica serializada como tuplas. |

## Patrones generales derivados

1. Estructuras matemáticas canónicas linealizadas: matrices, sistemas, fracciones, límites e integrales.
2. Fugas de sintaxis interna al DOM del alumno.
3. Soluciones metodológicamente abreviadas en álgebra, análisis, geometría y estadística.
4. Gráficas obligatorias de áreas no materializadas.
5. Clasificación por herramienta incidental en lugar de por la tarea matemática principal.

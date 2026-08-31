# Clasificación de Matemáticas Aplicadas a las Ciencias Sociales II

## Bloque de Álgebra

Incluir ejercicios de:

- matrices;
- determinantes;
- sistemas y resolución de ecuaciones;
- programación lineal.

## Bloque de Análisis

Incluir ejercicios de:

- límites y continuidad;
- derivadas;
- aplicaciones de las derivadas;
- integrales definidas e indefinidas.

## Bloque de Probabilidad — Tema 9

Incluir ejercicios de:

- experimentos aleatorios;
- cálculo de probabilidades;
- probabilidad condicionada;
- independencia;
- teorema de la probabilidad total;
- teorema de Bayes.

## Bloque de Distribuciones e Inferencia Estadística — Temas 10 y 11

Incluir ejercicios de:

- variables aleatorias y distribuciones;
- distribución binomial y normal;
- aproximaciones;
- muestreo;
- estimación e intervalos de confianza;
- contrastes o inferencia estadística incluida en el examen.

Cuando un ejercicio contenga apartados de dos bloques distintos, conservar el enunciado común necesario en ambos documentos y colocar cada apartado en el bloque que corresponda.

## Taxonomía de Matemáticas II

Asignar como `primaryTopic` la tarea matemática principal pedida en el enunciado y usar `secondaryTopics[]` únicamente para contenidos auxiliares relevantes:

- **Matrices:** operaciones, ecuaciones y potencias matriciales y problemas cuyo núcleo sea matricial.
- **Determinantes:** cálculo o propiedades de determinantes, parámetros cuyo núcleo sea un determinante e inversa por adjunta cuando esa sea la tarea principal. La mera aparición de un determinante en una solución no basta.
- **Resolución de sistemas con determinantes:** resolución o discusión de sistemas, parámetros, rangos y Rouché-Frobenius. Esta es la etiqueta visible; no usar la abreviatura «Sistemas con determinantes» en la interfaz.
- **Vectores en el espacio:** operaciones y propiedades vectoriales.
- **Planos y rectas en el espacio:** ecuaciones, posiciones relativas e intersecciones.
- **Propiedades métricas:** distancias, ángulos, perpendicularidad y áreas o volúmenes geométricos.
- **Límites:** cálculo de límites y asíntotas cuando el límite sea el núcleo.
- **Continuidad:** continuidad, discontinuidades y parámetros de continuidad.
- **Derivadas:** cálculo de derivadas, tangentes y normales cuando no se pida un estudio posterior.
- **Aplicación de derivadas:** monotonía, extremos, optimización, concavidad e inflexión.
- **Integrales indefinidas:** cálculo de primitivas.
- **Integrales definidas:** integrales definidas, áreas y recintos.
- **Probabilidad:** sucesos, probabilidad condicionada, independencia, total y Bayes.
- **Distribución binomial y normal:** identificación, cálculo, tipificación y aproximaciones de estas distribuciones.

## Programación lineal en CCSS II

- Asignar `primaryTopic: Programación lineal` cuando la tarea principal consista en definir variables de decisión, traducir restricciones, construir o estudiar una región factible y optimizar una función objetivo.
- Los sistemas usados para calcular intersecciones o vértices son herramientas auxiliares y, en su caso, `secondaryTopics[]`; no convierten el ejercicio en Sistemas.
- No clasificar como Programación lineal una mera región de inecuaciones si el enunciado no pide modelizar, optimizar o estudiar el recinto como tarea principal.
- La validación estructural exige coherencia entre restricciones, rectas frontera, semiplanos, vértices, tabla de evaluación y gráfica. Una figura decorativa o con vértices distintos constituye un fallo.

## Reglas de decisión

1. Clasificar por lo que el alumno debe demostrar o calcular, no por una palabra incidental ni por una herramienta de comprobación.
2. La tarjeta temática y el banco principal dependen exclusivamente de `primaryTopic`.
3. Si los apartados tienen tareas principales de temas distintos, conservar el contexto común y clasificar cada apartado, sin perder ninguno.
4. Registrar siempre el motivo de la clasificación y remitir a revisión los casos ambiguos en vez de forzar una etiqueta.
5. Decisiones de regresión: `calcula det(A)` → Determinantes; `discute/resuelve el sistema` → Resolución de sistemas con determinantes aunque se calcule `det(A)`; `resuelve AX=B`, `calcula A^n` o `halla X` en una ecuación matricial → Matrices. El método auxiliar se registra como secundario.

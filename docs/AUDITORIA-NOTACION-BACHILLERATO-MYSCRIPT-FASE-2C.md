# Auditoría de notación de Bachillerato — MyScript Fase 2C

Fecha: 13 de agosto de 2026  
Estado: auditoría y propuesta, sin ejecución  
Consumo al comenzar y terminar esta auditoría: **1/2000**  
Interruptor requerido: **`MYSCRIPT_TEST_ENABLED=false`**

## Alcance confirmado

La primera versión debe reconocer **únicamente la respuesta final que el alumno encierre en el recuadro de «Marcar respuesta»**. No tiene que interpretar toda la pizarra ni calificar cada paso intermedio.

Comprender el procedimiento completo sería valioso, pero se reserva como ampliación futura. Antes requeriría segmentación fiable de líneas y pasos, reconocimiento de relaciones entre pasos y una capa didáctica capaz de evaluar procedimientos sin penalizar una solución alternativa válida. En esta fase se conserva toda la pizarra para comparación visual, pero solo se envía y reconoce la zona marcada.

## Fuentes cruzadas

- Catálogo real de `app.js` para los cuatro cursos de Bachillerato.
- Políticas cerradas de `.agents/skills/solucion-de-ejercicios/SKILL.md`.
- Corpus básico de 100 muestras de `data/myscript-phase2c-corpus.js`.
- Implementación actual de `math-answer-validator.js`.
- Proxy controlado `supabase/functions/recognize-math/index.ts`.
- Documentación oficial de MyScript sobre elementos matemáticos, JIIX y exportación matemática.

No se han modificado bancos, políticas, skill, puntuación, progreso ni reglas de examen.

## A. Matriz completa de notación necesaria

Leyenda de soporte actual:

- **Cubierto básico**: ya existe una muestra equivalente en el corpus de 100.
- **Reconocible por proveedor, no probado**: MyScript documenta símbolos/salida matemática compatibles, pero no se ha medido esta estructura con la escritura real del alumnado.
- **No cubierto**: no existe muestra en el corpus básico.

| Área | Notación necesaria | Cursos reales | Soporte actual | Prueba necesaria |
|---|---|---|---|---|
| Números reales | enteros, decimales, fracciones, potencias, raíces, valor absoluto | Los cuatro | Cubierto básico salvo valor absoluto y conjuntos numéricos | `|x|`, ℕ, ℤ, ℚ, ℝ y combinaciones |
| Números complejos | `a+bi`, conjugado, módulo, argumento, forma polar/binómica/trigonométrica, ℂ | Matemáticas I y CCSS I | No cubierto | Seis muestras específicas; distinguir `i`, `1` y `l` |
| Álgebra | polinomios, identidades, racionales, radicales, ecuaciones | Matemáticas I y CCSS I; reutilizado en cálculo de 2.º | Cubierto básico en estructuras elementales | Expresiones largas de Bachillerato y denominadores anidados |
| Matrices | 2×2, 2×3, 3×3, suma, producto, escalar, igualdad, inversa, identidad | Matemáticas II y CCSS II | No cubierto | Ocho muestras; conservar disposición bidimensional |
| Determinantes | 2×2, 3×3, barras, parámetro, `|A|`, `det(A)` | Matemáticas II y CCSS II | No cubierto | Seis muestras; distinguir matriz/determinante/valor absoluto |
| Sistemas | llave izquierda, 2 y 3 ecuaciones, parámetros, matriz ampliada, solución ordenada | Los cuatro; Gauss en 1.º y rangos cuando corresponda en 2.º | Solo ecuación individual básica | Siete muestras multilínea y con llave |
| Rangos | `rg(A)`, `rg(A*)`, igualdad/desigualdad de rangos | Matemáticas II y CCSS II | No cubierto | Una muestra dentro de sistemas paramétricos |
| Programación lineal | sistemas de inecuaciones, región factible, `F(x,y)`, vértices | CCSS II | Parcial: inecuaciones simples en corpus básico | Sistema con llave, función objetivo y vértice |
| Límites | `lim`, subíndice, flecha, infinito, laterales, fracciones, raíces, trozos | Matemáticas I, Matemáticas II y CCSS II | No cubierto | Ocho muestras con maquetación 2D distinta |
| Continuidad | `f(a)`, límites laterales, igualdad de límites y valor | Los cuatro según su tema real | Parcial solo como álgebra; sin semántica de continuidad | Igualdad encadenada y función a trozos |
| Derivadas | `f'`, `f''`, `y'`, `dy/dx`, `d²y/dx²`, producto, cociente, exp/log/trig | Los cuatro | No cubierto | Ocho muestras; distinguir prima/apóstrofo y exponentes diferenciales |
| Funciones | `f(x)`, `g(x)`, composición, inversa, dominio, imagen | Los cuatro | Parcial: el corpus reconoce expresiones, no semántica funcional | Seis muestras específicas |
| Funciones a trozos | llave, varias expresiones y condiciones por intervalos | Los cuatro cuando aparezcan en funciones/continuidad | No cubierto | Al menos dos disposiciones de llave y condiciones |
| Trigonometría | sen, cos, tg, sec, cosec, cotg, cuadrados, ángulo doble, inversas, identidades y ecuaciones | Matemáticas I; cálculo de Matemáticas II; derivadas reales de CCSS I | No cubierto | Siete muestras; aceptar notación española y salida estándar de MyScript |
| Logaritmos y exponenciales | `ln`, `log`, base, `e^x`, `a^x`, ecuaciones | Matemáticas I, CCSS I y cálculo real de 2.º | Parcial: potencias, no funciones log/exp | Cinco muestras |
| Vectores en plano | flecha, componentes, módulo, producto escalar, perpendicularidad | Matemáticas I | Coordenadas básicas sin semántica vectorial | Vectores 2D y operadores |
| Vectores/rectas/planos en espacio | componentes 3D, paramétricas, plano, producto escalar, determinantes geométricos | Matemáticas II | No cubierto | Siete muestras, varias líneas y letras griegas |
| Cónicas | ecuaciones de circunferencia, elipse, hipérbola y parábola | Matemáticas I | Parcial como ecuación polinómica, sin clasificación geométrica | P2: ecuaciones canónicas con fracciones y cuadrados |
| Probabilidad | `P(A)`, intersección, unión, condicionada, complementario, total y Bayes | Los cuatro | No cubierto | Seis muestras con ∩, ∪, barra condicional y superíndice |
| Estadística descriptiva/bidimensional | media, varianza, desviación, covarianza, correlación, recta de regresión | CCSS I | No cubierto | Cuatro muestras dentro de la familia estadística |
| Combinatoria | factorial, binomial, variaciones, permutaciones, combinaciones | CCSS I | Parcial: símbolos aritméticos; no factorial/binomial 2D | Tres muestras específicas |
| Distribución binomial | `X~B(n,p)`, `P(X=k)`, `np`, `nq` | CCSS I y CCSS II | No cubierto | Expresión de distribución y probabilidad discreta |
| Distribución normal | `N(μ,σ)`, `Φ(z)`, tipificación | CCSS I y CCSS II | No cubierto | Letras griegas, `~` y fracción de tipificación |
| Aproximación binomial-normal | `np≥5`, `nq≥5`, corrección de continuidad | CCSS II | Parcial: desigualdad simple, no semántica estadística | Suceso original y suceso corregido |
| Inferencia | `x̄`, `p̂`, intervalos de confianza, error y tamaño muestral | CCSS II | No cubierto | Dos intervalos de confianza y diacríticos |
| Integrales indefinidas | `∫f(x)dx`, primitiva y `+C` | Matemáticas II; práctica por temas de CCSS II solo inmediatas | No cubierto | Dos muestras; distinguir integral/S y `dx` |
| Integrales definidas/áreas | límites superior/inferior, `∫_a^b`, valor absoluto en áreas | Matemáticas II; práctica por temas de CCSS II | No cubierto | Tres muestras 2D; no cambia reglas de examen |
| Intervalos y conjuntos | abiertos/cerrados, infinito, unión, pertenencia, exclusión, solución | Los cuatro | Hay 10 muestras básicas de reconocimiento | Repetir cinco en nivel avanzado con ℝ, ∪ y `\{2\}` |
| Parámetros | `a,b,c,k,m,n,λ` dentro de ecuaciones, matrices y sistemas | Los cuatro según tema | Letras latinas básicas sí; λ no | Contexto real, no letras aisladas únicamente |
| Griegas | α, β, θ, λ, μ, σ, π, Φ, Δ | Según trigonometría, álgebra, geometría y estadística | No cubierto | Contexto matemático por cada familia |
| Confusiones | `1/l`, `0/O`, `x/×`, `a/α`, `u/μ`, `p/ρ`, `n/η`, `λ/y` | Transversal | No auditado | Pares controlados con varios escritores |
| Confusiones estructurales | barras de determinante/valor absoluto/1; menos/fracción; flecha/menos; ∞/8; ∫/S; √/v | Transversal | Raíz/fracción básicas; resto no | Comparación directa por pares y por contexto |

## B. Notación ya cubierta por el corpus básico

Las 100 muestras básicas ya preparan el reconocimiento de:

- enteros positivos y negativos;
- decimales con coma;
- fracciones numéricas y algebraicas;
- potencias y superíndices 2 y 3;
- raíces cuadradas;
- expresiones polinómicas y productos;
- ecuaciones algebraicas individuales;
- desigualdades simples;
- intervalos elementales y pertenencia;
- coordenadas 2D;
- combinaciones de fracción, raíz y potencia.

Esta cobertura es **de reconocimiento**, no una garantía de validación. Por ejemplo, el corpus contiene `interval` y `coordinates`, pero el `MathAnswerValidator` actual no implementa esos tipos.

## C. Notación adicional necesaria para Bachillerato

La ampliación imprescindible comprende:

1. Estructuras bidimensionales: matrices, determinantes, sistemas y funciones a trozos.
2. Operadores con límites: `lim`, flechas, infinito, laterales y subíndices.
3. Derivación e integración con notación diferencial.
4. Funciones con nombre, composición e inversa.
5. Trigonometría, logaritmos y exponenciales.
6. Complejos, vectores, rectas y planos.
7. Probabilidad, distribuciones e inferencia.
8. Letras griegas, parámetros y pares visualmente ambiguos.
9. Estadística, combinatoria y programación lineal reales de CCSS.

## D. Capacidad de MyScript en principio

La documentación oficial de MyScript indica que el reconocedor matemático admite un repertorio amplio de símbolos: operadores, ∂, ∞, flechas, pertenencia, conjuntos, sumatorios, integrales, números ℕ/ℤ/ℚ/ℝ/ℂ y letras griegas. También puede exportar un bloque Math como JIIX con una etiqueta LaTeX, y admite exportaciones matemáticas LaTeX y MathML.

Esto permite considerar técnicamente viable recibir una expresión estructurada, no solo una imagen. Sin embargo:

- la documentación de símbolos no garantiza la precisión de la escritura real del alumnado;
- no demuestra por sí sola que matrices, determinantes, llaves multilínea o funciones a trozos conserven siempre la estructura esperada;
- la respuesta real del proxy actual es una etiqueta LaTeX y un resultado JIIX, sin confianza numérica;
- cada familia debe medirse antes de habilitarse;
- reconocer una expresión no significa saber si es matemáticamente equivalente a la solución.

Referencias oficiales:

- https://developer.myscript.com/doc/interactive-ink/4.2/overview/math-elements-and-rules/
- https://developer.myscript.com/docs/interactive-ink/4.3/reference/web/jiix/
- https://developer.myscript.com/doc/interactive-ink/3.2/overview/import-and-export-formats/

## E. Estado real de `MathAnswerValidator`

| Tipo solicitado | Estado | Motivo técnico |
|---|---|---|
| Números racionales/decimales | Soportado | Usa aritmética racional exacta y tolerancia opcional |
| Potencias enteras | Soportado con límites | Exponente entero; polinomios hasta grado operativo limitado |
| Raíces | Parcial | Solo raíces exactas/perfectas en validación numérica; no equivalencia irracional general |
| Expresiones polinómicas | Soportado | Compara forma polinómica normalizada |
| Ecuación algebraica individual | Soportado/parcial | Estructura o proporcionalidad del polinomio; no conjunto de raíces múltiples explícito |
| Matrices | No soportado | El tokenizador no acepta corchetes, separadores ni estructura matricial |
| Determinantes | No soportado | No distingue barras ni operador `det` |
| Sistemas | Parcial insuficiente | Puede validar cada ecuación simple por separado, no el sistema, matriz ampliada ni conjunto ordenado |
| Límites | No soportado | Sin `lim`, flecha, infinito ni semántica de límite |
| Derivadas | No soportado | Sin primas, diferenciales ni semántica funcional |
| Funciones | Parcial insuficiente | Un polinomio sí; `f(x)`, composición, inversa y dominio no tienen semántica propia |
| Funciones a trozos | No soportado | Sin llaves, condiciones ni ramas |
| Trigonometría | No soportado | Identificadores trigonométricos se interpretarían como variables, no funciones |
| Logaritmos/exponenciales generales | No soportado | `ln`, `log`, `e^x` no se evalúan como funciones matemáticas |
| Complejos | No soportado | Sin aritmética compleja, módulo, argumento o formas equivalentes |
| Vectores | No soportado | Sin tuplas, componentes ni operaciones vectoriales |
| Probabilidad | No soportado | Sin `P`, ∩, ∪, condicional ni sucesos |
| Distribuciones/inferencia | No soportado | Sin objetos estadísticos ni intervalos de confianza |
| Intervalos/conjuntos | No soportado | Aunque el corpus los incluye, el tipo `interval` cae en `unsupported` |
| Coordenadas | No soportado | El tipo `coordinates` cae en `unsupported` |
| Integrales | No soportado | Sin integral, diferenciales, constantes o equivalencia de primitivas |

Conclusión: **Bachillerato no puede activarse solo porque MyScript reconozca la tinta**. Antes deben añadirse validadores específicos por tipo de respuesta y conservar siempre el estado `NO INTERPRETABLE/NO SOPORTADO` cuando no exista comparación fiable.

## F. Corpus avanzado propuesto

Se ha preparado, sin conectarlo a la aplicación, el archivo:

`docs/myscript-phase2c-bach-corpus-proposal.json`

Distribución:

| Familia | Muestras | Prioridad |
|---|---:|---|
| Matrices | 8 | P1 |
| Determinantes | 6 | P1 |
| Sistemas | 7 | P1 |
| Límites | 8 | P1 |
| Derivadas | 8 | P1 |
| Funciones | 6 | P1 |
| Trigonometría | 7 | P2 |
| Logaritmos y exponenciales | 5 | P2 |
| Números complejos | 6 | P1 |
| Vectores y geometría | 7 | P1 |
| Cónicas | 4 | P2 |
| Probabilidad | 6 | P1 |
| Distribuciones e inferencia | 6 | P1 |
| Integrales | 5 | P1 |
| Estadística, combinatoria y programación lineal | 10 | P2 |
| Intervalos y conjuntos | 5 | P1 |
| Parámetros, griegas y confusiones | 12 | P2 |
| **Total** | **116** | |

Las muestras son **respuestas finales aisladas para escribir dentro del recuadro marcado**, no desarrollos completos. Algunas respuestas finales son multilínea por naturaleza —una matriz, un sistema o una función a trozos—, pero siguen siendo un único resultado marcado.

## G. Número recomendado

Recomendación inicial: **116 muestras avanzadas**.

Con las 100 básicas y la única petición ya consumida, una ejecución completa futura dejaría el contador en 217/2000. No se ha realizado ninguna de esas 116 peticiones durante esta auditoría.

Para evaluar precisión real no basta una única caligrafía. Tras revisar esta primera ronda, las familias que fallen deberían repetirse con varias personas; esa segunda ronda no se dimensiona todavía para no gastar cuota antes de conocer los errores reales.

## H. Priorización

### P1 — imprescindible antes de activar Bachillerato

- matrices y determinantes;
- sistemas y soluciones ordenadas;
- límites, derivadas y funciones a trozos;
- complejos donde existen realmente;
- vectores/geometría en Matemáticas I y II;
- probabilidad y distribuciones;
- integrales en Matemáticas II y práctica permitida de CCSS II;
- intervalos/conjuntos;
- validadores específicos de cada tipo habilitado;
- confirmación visual del alumno y estado no interpretable;
- reconocimiento limitado al recuadro marcado.

### P2 — importante

- trigonometría e inversas;
- logaritmos y exponenciales;
- estadística, combinatoria y programación lineal;
- letras griegas y parámetros;
- matriz de confusiones avanzada;
- variantes españolas (`sen`, `tg`, `cosec`, `cotg`) frente al LaTeX estándar devuelto.

### P3 — ampliación futura

- comprender y evaluar todo el procedimiento manuscrito;
- segmentar pasos y detectar en qué paso aparece un error;
- aceptar métodos alternativos compatibles con la política didáctica;
- diagramas completos, árboles de probabilidad y gráficas;
- corrección semántica de demostraciones e identidades paso a paso.

## Cierre de la auditoría

- Corpus avanzado ejecutado: **no**.
- Nuevas peticiones MyScript: **0**.
- Consumo conservado: **1/2000**.
- Reconocimiento de Bachillerato activado: **no**.
- `MYSCRIPT_TEST_ENABLED`: debe permanecer **false**.
- Código de aplicación modificado: **no**.
- Bancos, skill, políticas, puntuación y progreso modificados: **no**.

La siguiente decisión corresponde al profesor: revisar estas 116 muestras y decidir si autoriza una sesión controlada o si primero desea ajustar familias, notación o dificultad.

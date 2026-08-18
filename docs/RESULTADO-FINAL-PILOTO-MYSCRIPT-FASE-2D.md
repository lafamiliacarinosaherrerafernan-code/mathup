# Resultado final del piloto MyScript — Fase 2D

Fecha del informe analizado: 14 de agosto de 2026  
Fuente exclusiva de resultados: `informe_prueba_anonimo.json`

## A. Control del piloto

- Muestras previstas: 60.
- Peticiones reales realizadas durante el piloto: 60.
- Peticiones conocidas desde el inicio: 61 (1 de referencia + 60 del piloto).
- Cuota conocida restante: 1.939 de 2.000.
- IDs con al menos un registro: 57.
- Muestras clasificadas y utilizables para la métrica manual: 55.
- Sin registro por fallo de interfaz/corpus: 23, 24 y 53.
- Con único resultado técnico no evaluable: 12.
- La muestra 52 tiene registro, pero se excluye de precisión por la incidencia funcional/presentación documentada.
- `MYSCRIPT_TEST_ENABLED=false`: confirmado; el reconocimiento permanece desactivado.
- Peticiones MyScript consumidas por este análisis y sus pruebas: 0.

Los cuatro intentos marcados como técnicos fueron 12, 41, 45 y 48. En 41, 45 y 48 hubo después un registro no técnico; solo la 12 quedó sin resultado evaluable. No se han reescrito ni borrado clasificaciones del JSON.

## B. Precisión global registrada

El denominador de precisión es 55: registros finales manualmente evaluables, excluyendo fallos técnicos sin resultado y fallos de interfaz/corpus.

| Resultado | Casos | Tasa sobre 55 |
|---|---:|---:|
| Correctos | 45 | 81,8 % |
| Incorrectos | 8 | 14,5 % |
| Ambiguos | 2 | 3,6 % |

La precisión literal registrada es 45/55 = 81,8 %. Hubo 4 intentos técnicos de 60 (6,7 %), pero únicamente 1 muestra terminó sin resultado no técnico. La tasa final técnica sobre las 60 muestras previstas es 1/60 = 1,7 %.

La revisión estructural posterior mantiene el mismo total agregado —45 equivalentes, 8 no equivalentes y 2 ambiguos—, pero corrige intercambios importantes entre casos: 48 y 57 son equivalencias de notación; 44 y 58 son falsos positivos manuales; 28 era equivalente; 55 queda prudentemente ambiguo por cambio de mayúscula/minúscula.

## C. Básicas frente a avanzadas

| Nivel | Evaluables | Correctas | Incorrectas | Ambiguas | Precisión |
|---|---:|---:|---:|---:|---:|
| Básicas | 21 | 21 | 0 | 0 | 100,0 % |
| Avanzadas | 34 | 24 | 8 | 2 | 70,6 % |

La diferencia es grande y está asociada a estructuras bidimensionales y símbolos visualmente próximos, no a números o álgebra elemental.

## D. Resultado por familia registrada

| Familia | Evaluables | Correctas | Incorrectas | Ambiguas | Precisión |
|---|---:|---:|---:|---:|---:|
| matrices | 4 | 2 | 1 | 1 | 50,0 % |
| determinantes | 3 | 3 | 0 | 0 | 100,0 % |
| sistemas | 3 | 3 | 0 | 0 | 100,0 % |
| límites | 5 | 2 | 2 | 1 | 40,0 % |
| derivadas | 5 | 5 | 0 | 0 | 100,0 % |
| funciones, trigonometría y logaritmos | 5 | 2 | 3 | 0 | 40,0 % |
| vectores, complejos y geometría | 2 | 1 | 1 | 0 | 50,0 % |
| probabilidad, estadística e integrales | 4 | 3 | 1 | 0 | 75,0 % |
| notación confusa | 3 | 3 | 0 | 0 | 100,0 % |
| números y decimales | 4 | 4 | 0 | 0 | 100,0 % |
| fracciones | 5 | 5 | 0 | 0 | 100,0 % |
| potencias y raíces | 4 | 4 | 0 | 0 | 100,0 % |
| álgebra y ecuaciones | 6 | 6 | 0 | 0 | 100,0 % |
| inecuaciones, intervalos y coordenadas | 2 | 2 | 0 | 0 | 100,0 % |

Las familias con menos muestras de las previstas reflejan los fallos del piloto, no una selección nueva.

## E. Notación avanzada

| Notación | Diagnóstico |
|---|---|
| Matrices | Parcialmente fiable: conserva filas/columnas en 3 casos; en la 26 fusiona las columnas (`1,0,-2` → `10-2`, `3,4,5` → `345`). |
| Determinantes | Correcta en los 3 casos; el residuo de alineación de la 31 es maquetación LaTeX ignorable. |
| Sistemas | Correcta en los 3 casos; las comas iniciales de la 33 no alteran las ecuaciones. |
| Límites | Problemática: acierta 35 y 38; falla el lateral izquierdo de 36, deja incertidumbre explícita en 37 y cambia el radicando en 39. |
| Derivadas | Parcialmente fiable: 40–43 correctas tras un reintento técnico en 41; la 44 contiene `xnx` donde debía aparecer `sin x`. |
| Funciones a trozos | Parcialmente fiable: el contenido de 45 es recuperable interpretando el texto docente `si`, pero el LaTeX compacto exige normalización específica. |
| Trigonometría | Problemática: `sen` y `tg` se confunden con secuencias de letras/subíndices en 46 y 47. |
| Logaritmos | Correcta semánticamente: 48 y 49 son equivalentes; la barra y los guiones bajos visibles eran un fallo de presentación local. |
| Vectores | Problemática con el identificador: en 50 reconoce un vector, pero cambia `u` por `M`. |
| Complejos | Sin datos suficientes: 52 tiene incidencia de interfaz y 53 no tiene registro. |
| Probabilidad | Correcta: `P(A/B)` y `P(A\mid B)` se tratan como notaciones docentes equivalentes en este contexto. |
| Distribución normal | Ambigua para automatización: la estructura es correcta, pero `Y` se devuelve como `y`. |
| Integrales | Correctas semánticamente en 56 y 57; la diferencia `_a^b` frente a `^b_a` es orden LaTeX, no cambio matemático. |
| Letras griegas | Correctas en 59 y 60; el caso 58 no es griego y revela la confusión `O`/`0`. |

## F. Integrales

- Integral indefinida, muestra 56: reconocimiento correcto. `\int f(x) dx` y `∫ f(x) dx` son la misma expresión; el problema observado era exclusivamente LaTeX crudo en pantalla.
- Integral definida, muestra 57: la salida `\int ^{b}_{a}f(x)dx` conserva integral, límite inferior `a`, límite superior `b`, integrando y diferencial. Es equivalente a `\int_a^b f(x)dx`. La clasificación manual como incorrecta estuvo condicionada por la presentación de los límites.

La capa del piloto reordena únicamente para presentar visualmente los límites; no altera la salida original conservada.

## G. Matriz de confusiones relevante

| Objetivo | Reconocido como | Veces | Tipo |
|---|---|---:|---|
| Matriz 2×3 con `1,0,-2 / 3,4,5` | Filas `10-2 / 345` | 1 | Pérdida de separación de columnas |
| `x→2⁻` | `x→i` | 1 | Número, lateral y letra |
| `sqrt(x²+1)` | `sqrt(x^(1+1))` | 1 | Estructura de potencia/radicando |
| `sen x + cos x + tg x` | `xnx + cos x + t_yx` | 1 | Operadores trigonométricos |
| `sen²x + cos²x` | `xn²x + cos²x` | 1 | Operador y superíndice |
| `vec u` | `overrightarrow M` | 1 | Identificador de vector |
| `O` | `0` | 1 | Letra/número; falso positivo manual |
| `sin x` dentro de una derivada | `xnx` | 1 | Operador trigonométrico; falso positivo manual |
| `log_a x` | `\log _{a}x` | 1 | Solo notación LaTeX; equivalente |
| Integral `_a^b` | Integral `^b_a` | 1 | Solo orden LaTeX; equivalente |

## H. Fallos del piloto que no son de MyScript

- Comandos LaTeX visibles (`\log`, `\int`, `\frac`, subíndices y superíndices): corregidos en la presentación del piloto.
- Complejo polar de la muestra 53 y llaves visibles: fallo de corpus/presentación; no existe resultado de reconocimiento que evaluar.
- Selector y tarjeta desincronizados: incidencia funcional del piloto, no del proveedor.
- Confirmación de la muestra 52: incidencia funcional/presentación; se excluye de precisión.
- Muestras 23 y 24 sin registro: ausencia de datos, no fallo de reconocimiento.
- Muestra 12: expresión devuelta estructuralmente correcta, pero el intento terminó clasificado como técnico.

La auditoría estática actual comprobó las 120 presentaciones del JSON —objetivo y reconocimiento de cada intento— y no encontró comandos LaTeX crudos ni `_{...}`/`^{...}` visibles.

## I. Latencia

- Intentos con latencia: 60.
- Mínima: 795 ms.
- Mediana: 867,5 ms.
- Media: 1.021,4 ms.
- Máxima: 3.543 ms (muestra 33).
- El JSON no documenta un error de red inequívoco. Los cuatro intentos técnicos carecen de motivo detallado (`reason` vacío), por lo que no deben atribuirse a red sin evidencia.

## J. Flujo sin `confidence`

MyScript no proporcionó una confianza numérica utilizable en estos 60 registros. No se han inventado valores. La ausencia de `confidence` impide aceptar automáticamente una respuesta solo por un umbral probabilístico.

El flujo corregido conserva revisión manual obligatoria cuando falta `confidence`. Puede calcular una equivalencia estructural sugerida, pero devuelve estado ambiguo y no convierte esa sugerencia en corrección automática.

## K. Reconocimiento frente a MathAnswerValidator

Antes de esta corrección, el validador solo resolvía números, fracciones, expresiones polinómicas y ecuaciones sencillas; toda muestra avanzada quedaba como `VALIDATOR_NOT_IMPLEMENTED`, incluso cuando MyScript había reconocido correctamente matrices, límites, logaritmos o integrales.

Se añadió una comparación específica de reconocimiento, separada de la salida original. Canoniza de forma conservadora:

- `\frac`/`\dfrac`, multiplicación explícita e identidades numéricas anexadas;
- espacios y delimitadores `\left`/`\right`;
- matrices, determinantes, sistemas y funciones a trozos sin perder filas/columnas;
- límites y flechas equivalentes;
- notación docente `sen`/`sin`, `tg`/`tan` sin corregir secuencias de letras distintas;
- probabilidad condicionada `A/B`/`A\mid B`;
- integral con límites escritos en cualquiera de los dos órdenes LaTeX;
- logaritmos, subíndices, superíndices, raíces y letras griegas.

No se consideran equivalentes columnas de matriz fusionadas, `O`/`0`, identificadores vectoriales distintos, cambios reales del radicando ni operadores trigonométricos convertidos en letras.

## L. Falsos positivos

Hay dos falsos positivos manuales relevantes:

1. Muestra 44: el objetivo contiene `sin x`, pero la salida contiene `xnx`.
2. Muestra 58: el objetivo termina en la letra mayúscula `O`, pero la salida termina en el número `0`.

La comparación estructural corregida rechaza ambos. La muestra 55 (`Y`/`y`) queda ambigua, no correcta automática, para no introducir un tercer falso positivo por normalizar mayúsculas sin contexto.

## M. Escritores anónimos

Sobre los 55 casos evaluables registrados:

| Escritor | Evaluables | Correctas manuales | Precisión manual |
|---|---:|---:|---:|
| writer-1 | 19 | 16 | 84,2 % |
| writer-2 | 18 | 15 | 83,3 % |
| writer-3 | 18 | 14 | 77,8 % |

La diferencia máxima es 6,4 puntos. Con 18–19 casos por escritor y familias distintas, no basta para atribuir causalidad a la caligrafía.

## N. Diagnóstico final

**C. Precisión insuficiente: conviene comparar las familias problemáticas con Mathpix.**

MyScript es sólido en notación básica, determinantes y sistemas, pero límites, trigonometría y separación de columnas de matrices son críticos para Bachillerato. Los dos falsos positivos manuales refuerzan que no debe conectarse todavía a puntuación automática.

## O. Recomendación

Siguiente paso recomendado, sin ejecutarlo: **3. Probar únicamente las familias problemáticas con Mathpix**, usando límites, trigonometría, matrices 2×3 y vectores, y comparar exactamente el mismo tipo de trazos. Mantener mientras tanto MyScript desactivado y la revisión manual cuando no haya `confidence`.

## P. Acciones no realizadas

- No se conectó reconocimiento con puntos, progreso ni rachas.
- No se activó Bachillerato.
- No se integró Mathpix.
- No se hicieron nuevas muestras.
- No se modificaron bancos, ejercicios, cursos, temas ni soluciones.
- No se modificó `MyScriptRecognitionProvider` ni secretos.
- No se reescribieron los resultados del JSON.

## Q. Cambios y pruebas posteriores al informe

Archivos de código modificados:

- `math-answer-validator.js`: normalización estructural conservadora y comparación específica de reconocimiento.
- `handwriting-recognition.js`: tratamiento seguro de proveedores sin `confidence`; equivalencia sugerida con revisión manual obligatoria.
- `myscript-evaluation.js`: uso del comparador estructural avanzado y presentación del piloto sin LaTeX crudo.
- `scripts/audit_handwriting_recognition_phase2.mjs`: regresión del flujo sin `confidence`.
- `scripts/audit_recognition_report.mjs`: auditoría reproducible del JSON completo.

Pruebas ejecutadas sin navegador y sin MyScript:

- 60 registros del JSON diagnosticados.
- 14 equivalencias representativas aceptadas.
- 6 errores reales representativos rechazados.
- 2 casos ambiguos conservados como ambiguos.
- 120 expresiones de presentación revisadas sin comandos LaTeX crudos.
- 30 pruebas del reconocimiento básico y su aislamiento de puntuación/progreso superadas.
- Peticiones MyScript adicionales consumidas: 0.

Caso conocido ajeno a estos cambios: la auditoría histórica del renderizador global contiene dos falsos negativos en sus predicados HTML (`&lt;` coincide accidentalmente con `lt;`) y un caso compacto de función a trozos aún no reconocido por ese renderizador global. La presentación y comparación del piloto sí cubren la función a trozos observada en el JSON; no se amplió el alcance al renderizador global.

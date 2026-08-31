# Conexión controlada de ejercicios originales de 2.º ESO

Fecha: 9 de agosto de 2026.

## Resultado

Se han conectado **61 ejercicios originales**, todos exclusivamente para Práctica por temas (`practiceEligible=true`, `examEligible=false`). No se ha ampliado Expresiones algebraicas porque ya tenía cobertura suficiente.

Los totales siguientes cuentan ejercicios de fuente fija disponibles en cada tema después de la reclasificación. No incluyen las variantes generadas por la aplicación.

| Tema | Antes: verificados | Verificados bien clasificados | Originales conectados | Total de fuente fija | Aprendiz nuevos | Maestro nuevos | Visuales pendientes | Estado |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Números enteros | 4 | 0 | 8 | 8 | 4 | 4 | 0 | Cerrado para práctica; los 4 anteriores pertenecían a Fracciones |
| Potencias y raíces cuadradas | 21 | 35 | 8 | 43 | 5 | 3 | 0 | Cerrado |
| Fracciones | 42 | 28 | 8 | 36 | 5 | 3 | 0 | Cerrado; conserva las potencias de fracciones |
| Proporcionalidad | 2 | 5 | 12 | 17 | 8 | 4 | 0 | Cerrado |
| Expresiones algebraicas | 24 | 24 | 0 | 24 | 0 | 0 | Ya estaba cerrado |
| Sistemas de ecuaciones | 20 | 20 | 8 | 28 | 5 | 3 | 0 | Cerrado |
| Figuras planas | 16 | 16 | 3 | 19 | 1 | 2 | 3 | Cerrado con pendientes visuales fuera del banco |
| Cuerpos geométricos | 5 | 5 | 10 | 15 | 8 | 2 | 0 | Cerrado |
| Funciones | 18 | 18 | 4 | 22 | 1 | 3 | 10 | Cerrado con pendientes visuales fuera del banco |

La disminución de Fracciones y Números enteros no elimina ejercicios válidos: refleja su traslado al tema matemático correcto y la retirada de un duplicado literal. La cantidad total fuente-fija se complementa con el generador de práctica, que sigue sometido a los filtros de pertenencia temática.

## Variedad añadida

- **Números enteros:** balances, variaciones, desplazamientos, operaciones contextualizadas y traducción de lenguaje verbal.
- **Potencias y raíces:** exponente desconocido, crecimiento geométrico, cuadrados perfectos, raíz exacta y no exacta, lado/perímetro desde área y problemas de reparto.
- **Fracciones:** equivalencia, simplificación por distintos métodos y fracción generatriz exacta, periódica pura y mixta.
- **Proporcionalidad:** clasificación directa/inversa/no proporcional, repartos directos e inversos, interés simple, porcentajes inversos, descuentos y problemas de dos o tres magnitudes.
- **Sistemas:** reducción, sustitución, elección de método, cantidades, edades, dinero y sistemas contextualizados.
- **Figuras planas:** tres estructuras distintas de Pitágoras: diagonal, rombo e isósceles.
- **Cuerpos geométricos:** reconocimiento, clasificación, prismas, pirámides, cilindros, conos, esferas y Euler.
- **Funciones:** evaluación de fórmulas, razonamiento cualitativo y dos orientaciones de parábola presentes en el material real de 2.º ESO.

## Procedencia e inventario conectado

| Documento original | Tema | Identificadores conectados |
|---|---|---|
| `documentos/2º ESO/Temas mios/1-Numeros enteros Ejercicios.doc` | Números enteros | `int-salario-huelga`, `int-precio-pollo`, `int-granja`, `int-ahorros-ong`, `int-temperatura-lago`, `int-excursionistas`, `int-lenguaje-docenas`, `int-lenguaje-cubo` |
| `documentos/2º ESO/Temas mios/2-Potencias y Raíces Cuadradas Ejercicios.doc` | Potencias y raíces cuadradas | `pow-exponente-27`, `pow-semillas-cuadrado`, `pow-virus`, `pow-web-triplica`, `pow-cuadrados-intervalo`, `pow-terreno-lado`, `pow-terreno-coste`, `pow-reparto-terreno` |
| `documentos/2º ESO/Temas mios/3-Fracciones Ejercicios.doc` | Fracciones | `frac-equivalente`, `frac-irreducible-14-56`, `frac-irreducible-72-84`, `frac-irreducible-364-488`, `frac-generatriz-exacto`, `frac-generatriz-puro`, `frac-generatriz-25`, `frac-generatriz-mixto` |
| `documentos/2º ESO/Temas mios/4-Proporcionalidad Ejercicios.doc` | Proporcionalidad | `prop-clasificar-directa`, `prop-clasificar-inversa`, `prop-clasificar-no`, `prop-reparto-directo`, `prop-reparto-inverso`, `prop-interes-anios`, `prop-autobus`, `prop-obreros`, `prop-bueyes`, `prop-gallinas`, `prop-ingresos`, `prop-descuento` |
| `documentos/2º ESO/Temas mios/6-Sistemas de ecuaciones Ejercicios.doc` | Sistemas | `sys-suma-diferencia`, `sys-hermanos-edades`, `sys-cine-piscina`, `sys-suma-cuadruple`, `sys-dinero-doble`, `sys-regalo-diferencia`, `sys-metodo-reduccion`, `sys-metodo-sustitucion` |
| `documentos/2º ESO/Temas mios/7-Figuras planas Ejercicios.doc` | Figuras planas | `fig-diagonal-rectangulo`, `fig-lado-rombo`, `fig-isosceles-base` |
| `documentos/2º ESO/Temas mios/8-Cuerpos geometricos Ejercicios.doc` | Cuerpos geométricos | `body-superficie`, `body-cilindro-poliedro`, `body-prisma-bases`, `body-prisma-laterales`, `body-generatriz-cilindro`, `body-piramide-bases`, `body-cono`, `body-esfera`, `body-piramide-caras`, `body-euler` |
| `documentos/2º ESO/Temas mios/9-Funciones Ejercicios.doc` | Funciones | `fun-imagenes-formula`, `fun-extremos-positivos`, `fun-parabola-positiva`, `fun-parabola-negativa` |

Cada identificador activo lleva el prefijo técnico `2eso-original-`. La referencia interna conserva además sección, ejercicio o datos identificativos cuando pudieron determinarse con seguridad.

## Contaminaciones corregidas

- Se mantienen fuera de 2.º ESO los dos ejercicios de error absoluto y relativo retirados en la fase anterior.
- Quince ejercicios cuyo objetivo real era potencia, raíz o notación científica se trasladan de Fracciones a Potencias y raíces cuadradas; uno de ellos era duplicado literal y queda desactivado.
- Tres problemas de proporcionalidad que estaban bajo Fracciones se trasladan a Proporcionalidad.
- Cuatro ejercicios activos de fracciones/decimales que estaban bajo Números enteros se trasladan a Fracciones. La capa también contempla las copias equivalentes detectadas en lotes anteriores si vuelven a quedar activas.
- En Funciones de 2.º ESO se rechazan las familias generadas de función inversa, composición, derivadas y dominio de radicales.
- **No se retiran las potencias de fracciones**: permanecen en Fracciones cuando la base o la operación principal es fraccionaria.

## Duplicados y descartes

- No se ha conectado ningún duplicado exacto entre los 61 originales: hay 61 identificadores y 61 estructuras declaradas distintas.
- Se desactiva `2eso-fracciones-ace2ca809574` porque repite literalmente la operación conservada como `2eso-fracciones-7e5ca613770b`.
- No se incorporó la pregunta de raíz cuadrada con «raíz 50 y resto 161»: esos datos son incompatibles, porque un resto de raíz cuadrada entera debe ser menor que `2·50+1=101`. Requiere corregir la fuente; no se ha reconstruido.
- No se conectaron variantes que solo cambiaban números cuando no ampliaban la estructura o la representación.
- Encabezados, teoría, criterios de evaluación y soluciones impresas no se han tratado como ejercicios.

## Material visual pendiente

Las **14 unidades visuales inseguras** permanecen fuera de los bancos activos y no se han reconstruido:

- Expresiones algebraicas: 1 unidad (`2eso-expresiones-algebraicas-6c1fb18fda45`).
- Figuras planas: 3 unidades (`2eso-figuras-planas-2cdfa62696da`, `2eso-figuras-planas-9b155ddeb64a`, `2eso-figuras-planas-ba81609bf43e`).
- Funciones: 10 unidades (dos pares de «es función/no es función», cinco análisis de gráfica y tres ejercicios de examen con cuatro gráficas), detalladas en `docs/AUDITORIA-FINAL-COBERTURA-2ESO.md`.

No se conectó ningún ejercicio dependiente de una figura sin conservar una figura segura.

## Interés simple

La comprobación final confirma:

- `I=(C·R·T)/(n·100)`.
- `n=1` si el tiempo está en años.
- `n=12` si está en meses.
- `n=365` si está en días.
- `n=360` no aparece en ejercicios ni soluciones activas de 2.º ESO.
- `C_f=C+I` cuando se pide el capital final.
- No se ha conectado interés compuesto.

Los documentos originales de teoría que imprimen `n=360` se conservan sin modificar como fuentes históricas, pero esa convención no se copia a Margarita Salas.

## Pruebas ejecutadas

`scripts/audit_eso2_original_connection.mjs` comprueba automáticamente:

- 61 ejercicios y el reparto exacto por tema/nivel;
- `courseId`, `topicId`, procedencia, cuatro opciones distintas y solución cerrada;
- existencia de cada documento original;
- separación `practiceEligible=true` / `examEligible=false`;
- exclusión del banco original en modalidad Examen;
- reclasificaciones y ausencia del duplicado;
- permanencia de potencias de fracciones en Fracciones;
- cero error absoluto/relativo activo en 2.º ESO;
- cero `n=360` e interés compuesto en los originales activos;
- carga de los nuevos módulos en el orden correcto.

Resultado de la última ejecución: **correcto, 61/61 ejercicios validados**.

No se ha modificado la skill, ningún otro curso, el reconocimiento manuscrito ni el catálogo de nueve temas.

# Cierre técnico de 4.º ESO Matemáticas A

Fecha: 12 de agosto de 2026.

## Alcance cerrado

- Catálogo conservado en 9 temas.
- Banco controlado añadido: 78 ejercicios, de los cuales 60 proceden de materiales originales de 4.º ESO A y 18 son ejercicios nuevos autorizados exclusivamente para cubrir inecuaciones.
- Los 78 son aptos para práctica y no entran automáticamente en Examen.
- Funciones usa un banco propio de 4.º ESO A y deja de consultar `fourEsoBFunciones`.
- No se ha modificado el banco de 4.º ESO B.
- La clasificación de ejercicios verificados de 4.º ESO A normaliza curso, tema, identificador y procedencia sin alterar otros cursos.

## Recuento por tema

`ANTES` es el banco modelo de 10 preguntas que existía en cada tema. En Funciones esas 10 preguntas procedían del banco compartido de 4.º B y han sido sustituidas por el banco propio; por eso no se suman al total nuevo.

| Tema | Antes | Originales conectados | Nuevos | Total disponible controlado/modelo | Aprendiz nuevos | Maestro nuevos | Estructuras nuevas |
|---|---:|---:|---:|---:|---:|---:|---:|
| Números reales | 10 | 4 | 0 | 14 | 2 | 2 | 4 |
| Radicales | 10 | 12 | 0 | 22 | 6 | 6 | 12 |
| Proporcionalidad | 10 | 12 | 0 | 22 | 5 | 7 | 12 |
| Expresiones algebraicas | 10 | 4 | 0 | 14 | 2 | 2 | 4 |
| Ecuaciones e inecuaciones | 10 | 7 | 0 | 17 | 1 | 6 | 7 |
| Sistemas de ecuaciones e inecuaciones | 10 | 4 | 18 | 32 | 12 | 10 | 22 |
| Semejanza y trigonometría | 10 | 4 | 0 | 14 | 1 | 3 | 4 |
| Áreas y cuerpos geométricos | 10 | 4 | 0 | 14 | 2 | 2 | 4 |
| Funciones | 10 compartidos con 4.º B, retirados de 4.º A | 9 propios | 0 | 9 propios | 3 | 6 | 9 |

Además de estos bancos existen el generador estructural del curso y los ejercicios de examen verificados. No se han contado como originales conectados en esta fase.

## Sistemas de inecuaciones

La revisión de los originales confirmó que la cobertura autónoma y recuperable era insuficiente. Se crearon 18 ejercicios con estructuras distintas:

| Tipo | Originales autónomos recuperables | Nuevos | Estructuras nuevas | Gráfica | Estado |
|---|---:|---:|---:|---|---|
| Inecuaciones de una incógnita | Se mantienen en el Tema 5 | 0 | 0 en esta ampliación | Recta real cuando procede | Cubierto por el banco existente |
| Sistemas de inecuaciones de una incógnita | 1 ejemplo de referencia, no autónomo con transcripción completa segura | 6 | 6 | Intervalos/intersección | Suficiente para práctica |
| Inecuaciones lineales de dos incógnitas | 2 componentes de un ejemplo | 6 | 6 | 6 SVG con ejes, frontera y semiplano | Suficiente para práctica |
| Sistemas de dos inecuaciones de dos incógnitas | 1 ejemplo completo de referencia | 6 | 6 | 6 SVG con región común | Suficiente para práctica |

Los 18 ejercicios tienen `practiceEligible=true`, `examEligible=false` y `adventureEligible=false`. No sustituyen ni rellenan Examen.

## Funciones

El banco propio contiene nueve familias independientes: afín, cuadrática, racional, exponencial, logarítmica, composición, inversa, tasa de variación media y modelización. No usa derivadas. La práctica de 4.º A tiene cero dependencias de `fourEsoBFunciones`.

## Radicales

Quedan cubiertos: simplificación, extracción, suma/resta, producto, cociente, operaciones combinadas, distintos índices, raíces anidadas, variables, exponentes negativos/fraccionarios, racionalización simple, índice superior y conjugado. La introducción explícita de factores dentro del radical no se encontró como ejercicio autónomo inequívoco y permanece como carencia concreta, sin inventar un ejercicio nuevo.

## Proporcionalidad y notación financiera

- Interés simple: `I=C·r·t/(n·100)`, con `n=1` en años, `n=12` en meses y `n=360` en días.
- Interés compuesto: `C_F=C_I(1+r/(100n))^(nt)`.
- Se conectaron 12 estructuras distintas, incluidas directa, inversa, no proporcional, reparto, compuesta DD/DI/II, porcentajes inversos/encadenados e intereses.
- De los 84 originales recuperables auditados se seleccionaron 12 estructuralmente distintos; las otras 72 variantes semánticamente redundantes no se conectaron.

## Contaminaciones corregidas

- Cross-course: retirada la dependencia de Funciones A respecto de Funciones B.
- Entre temas: la normalización sitúa Radicales en Tema 2 y Sistemas en Tema 6 según el contenido matemático.
- Identificadores: normalizados los `rawBaseId`, `topicId` y `topicIndex` seguros de 4.º A; se conserva `originalRawBaseId`.
- Procedencias: cada ejercicio nuevo original conserva documento y referencia; se corrigió la ruta real del documento de Áreas y cuerpos geométricos.

## Material visual

Las 88 unidades visuales detectadas en la auditoría previa se trataron como un conjunto de triaje, no como una obligación de incorporación indiscriminada. No queda ningún visual imprescindible pendiente para los 78 ejercicios conectados. Los 12 ejercicios nuevos de dos variables incorporan su gráfica como SVG dentro del proyecto; no se han creado imágenes fuera de la carpeta de Margarita Salas.

## Pruebas

- `audit_eso4a_controlled_connection.mjs`: 78 revisados, 60 originales, 18 nuevos, 12 gráficos; 0 fallos.
- `audit_strict_exercise_selection.mjs`: 133 scripts, 100 temas y 8 casos obligatorios; 0 fallos.
- `audit_runtime_variety.mjs`: 0 fallos.
- `audit_eso_p0.mjs`: 5 cursos de ESO, 52 temas y 1.560 selecciones; 0 fallos.
- Regresiones específicas de 2.º ESO, 3.º ESO, Matemáticas II y CCSS II: 0 fallos.
- Comprobación sintáctica de `app.js`, banco 4.º A y normalizador 4.º A: 0 fallos.
- Prueba visible local: acceso a 4.º ESO A, nueve temas, reto de Funciones y reto de Sistemas; sin errores de consola.

## Estado

4.º ESO Matemáticas A queda técnicamente preparado para formalizar su política didáctica definitiva en `SKILL.md`.

No se ha formalizado todavía la skill ni se ha avanzado a 4.º ESO B.

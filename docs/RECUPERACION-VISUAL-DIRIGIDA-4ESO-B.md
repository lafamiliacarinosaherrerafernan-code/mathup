# Recuperación visual dirigida — 4.º ESO Matemáticas B

Fecha de cierre: 13 de agosto de 2026.

## Alcance

Se han revisado visualmente, mediante exportación local de los objetos incrustados de Word, exclusivamente los originales de:

- Tema 6 — Proporcionalidad.
- Tema 7 — Semejanza.
- Tema 11 — Límite de funciones.
- Tema 12 — Derivadas.
- Tema 13 — Límite de sucesiones.

No se ha modificado `SKILL.md`, Examen, otros temas, otros cursos ni el reconocimiento manuscrito. Los originales recuperados se conectan solo a Práctica por temas y a las modalidades ordinarias que consumen ese banco; ninguno se ha convertido automáticamente en ejercicio de Examen.

## Resultado por tema

La columna «Antes» reproduce el número de estructuras activas del cierre técnico anterior. «Revisados» cuenta los objetos matemáticos o gráficos exportados del original. «Recuperados/conectados» son ejercicios nuevos cuya transcripción, página, solución y respuesta se han verificado.

| Tema | Antes | Originales revisados | Recuperados | Conectados | Estructuras reales activas | Visuales no recuperables con seguridad | Aprendiz activo | Maestro activo | Estado |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Proporcionalidad | 3 | 26 objetos + 432 párrafos paginados | 7 | 7 | 10 | 9 ecuaciones superpuestas o ilegibles; no necesarias para cerrar subtemas | 4 | 6 | Suficiente |
| Semejanza | 3 | 49 figuras/expresiones + 88 párrafos | 7 | 7 | 10 | 0 bloqueos activos; se descartaron variantes redundantes | 4 | 6 | Suficiente |
| Límite de funciones | 5 | 83 expresiones + 119 párrafos | 7 | 7 | 12 | 21 expresiones Equation superpuestas o ambiguas | 2 | 10 | Suficiente para la política real del curso |
| Derivadas | 1 | 39 expresiones + 64 párrafos | 14 | 14 | 15 | 11 expresiones Equation superpuestas o incompletas | 3 | 12 | Suficiente |
| Límite de sucesiones | 1 de ampliación; 0 ordinarias | 68 expresiones + 94 párrafos | 12 | 12 | 12 ordinarias + 1 ampliación | 20 expresiones superpuestas o ambiguas | 4 | 8 | Suficiente |

Total de esta fase: **265 objetos visuales revisados, 47 ejercicios originales recuperados y 47 conectados**.

## Derivadas

Cobertura recuperada o activa tras esta fase:

| Familia | Ejercicios/estructuras activas |
|---|---:|
| Definición | 1 |
| Producto | 2 |
| Cociente | 1 |
| Cadena | 2 |
| Exponencial `e^x` o exponencial de base constante | 2 |
| Logaritmo natural | 3 |
| Tangente/normal | 2 tangentes; la normal no se ha inventado al no aparecer como original inequívoco independiente |
| Crecimiento/extremos | 1 |
| Parámetros | 1 |
| Continuidad y derivabilidad a trozos | 1 |
| Derivadas sucesivas | 1 |
| Optimización | 8 |

Optimización incorpora estructuras distintas: descomposición algebraica, recíproco, rectángulo inscrito, cilindro, costes de un ortoedro, hoja con márgenes y producción de una huerta.

## Límite de funciones

Quedan cubiertos:

- sustitución directa;
- límites laterales finitos e infinitos;
- existencia/no existencia;
- `0/0` por factorización y simplificación;
- cocientes de polinomios con numerador de grado menor, igual y mayor;
- `1^∞` mediante el número `e`;
- funciones a trozos;
- continuidad;
- discontinuidad evitable;
- salto;
- discontinuidad infinita/asintótica.

La racionalización no se ha activado porque las expresiones candidatas del original no pudieron asociarse con seguridad a una transcripción completa. Tampoco se localizaron ejercicios inequívocos de interpretación gráfica en este original.

Confirmaciones obligatorias:

- **0 ejercicios** de `lim(x→0) sen(x)/x`.
- **0 soluciones** mediante L’Hôpital.

## Semejanza

Quedan cubiertos:

- ángulos como refuerzo;
- triángulos semejantes y razón de semejanza;
- Tales;
- cálculo de lados;
- escalas;
- áreas y perímetros de figuras semejantes;
- Pitágoras;
- teorema del cateto;
- teorema de la altura;
- problemas de sombras e integración de varias propiedades.

Se han conservado dentro del proyecto tres figuras originales imprescindibles en `assets/exercises/4eso-b/semejanza/`. No se han generado imágenes nuevas ni se ha reconstruido ninguna medida.

## Proporcionalidad

Quedan cubiertos:

- clasificación directa/inversa/no proporcional;
- proporcionalidad directa;
- proporcionalidad inversa;
- compuesta;
- reparto directo;
- reparto inverso;
- porcentajes;
- variaciones porcentuales encadenadas;
- interés simple;
- interés compuesto;
- problemas contextualizados.

En interés simple de 4.º ESO B se mantiene exactamente:

`I=C·r·t/(n·100)`, con `n=1` para años, `n=12` para meses y `n=360` para días.

## Límite de sucesiones

El banco ordinario pasa de cero ejercicios originales activos a doce, con variedad en:

- límites polinómicos;
- límites racionales;
- radicales;
- `∞−∞`;
- racionalización mediante conjugado;
- exponenciales crecientes y decrecientes;
- `1^∞`;
- suma geométrica;
- convergencia de una sucesión alternada amortiguada.

El ejercicio formal con entornos/épsilon permanece etiquetado como **AMPLIACIÓN** y sigue excluido de Aprendiz, Maestro, Retos normales, Aventura y Examen.

## Procedencia y figuras

Cada nuevo ejercicio conserva:

- documento original;
- página;
- ejercicio o descripción inequívoca del apartado;
- tema y subtema;
- nivel Aprendiz/Maestro;
- identidad estructural;
- solución independiente;
- cuatro opciones distintas y una única respuesta correcta.

Los ejercicios que dependen de figura incluyen `statementHtml`, texto alternativo y ruta de un recurso copiado fielmente del original dentro del proyecto.

## Validaciones

El auditor `scripts/audit_eso4b_controlled_connection.mjs` finaliza con **0 fallos** y confirma:

- 14 temas fijos;
- 59 originales controlados en la capa B, de los cuales 47 proceden de esta recuperación;
- cuatro opciones distintas por ejercicio;
- solución presente;
- metadatos verificables de página/apartado;
- ningún original temático convertido automáticamente en Examen;
- ampliación formal de sucesiones fuera del flujo ordinario;
- ausencia de `sen(x)/x` y L’Hôpital;
- conservación de los exámenes del grupo C como Matemáticas B.

La comprobación estática adicional confirma equilibrio de delimitadores, identificadores sin duplicados, temas sin contaminación y existencia física de las tres figuras. La prueba completa de interfaz en el navegador local no pudo cerrarse porque la conexión del navegador de pruebas con `localhost` devolvió una respuesta vacía, aunque el mismo servidor respondió correctamente desde el sistema. No se contabiliza como prueba superada.

## Pendientes reales, no bloqueantes

- Límite de funciones: una estructura original segura de racionalización y una de interpretación gráfica no están disponibles en el documento revisado.
- Derivadas: no existe una recta normal inequívoca recuperable como ejercicio independiente en el original.
- Permanecen fuera las fórmulas superpuestas o ambiguas detalladas en la tabla; no se han reconstruido por intuición.

Estas carencias concretas no impiden una práctica larga y variada con la cobertura curricular existente. No se ha generado contenido para rellenarlas.

## Dictamen

**Los 14 temas de 4.º ESO Matemáticas B disponen ya de cobertura suficiente para cerrar el curso.**


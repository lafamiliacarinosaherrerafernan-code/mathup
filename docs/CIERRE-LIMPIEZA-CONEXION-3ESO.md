# Cierre de limpieza técnica y conexión controlada — 3.º ESO

Fecha de comprobación: 9 de agosto de 2026.

## Resultado general

- Catálogo conservado: 10 temas, sin crear ni fusionar temas.
- Reutilización automática de bancos de 4.º ESO: **eliminada**.
- Ejercicios verificados que ya estaban conectados: **117**.
- Ejercicios originales de 3.º ESO conectados en esta fase: **52**.
- Total curado disponible en los bancos comprobados: **169**.
- Todos los originales nuevos son `practiceEligible: true` y `examEligible: false`.
- Todos conservan documento y referencia de origen, tienen cuatro opciones y solución comprobada.
- No se ha modificado `SKILL.md` ni se han cambiado otros cursos.

## Cobertura por tema

| Tema | Antes | Originales conectados | Total | Subtemas y estructuras cubiertos | Variedad | Aprendiz | Maestro | Visuales pendientes | Estado |
|---|---:|---:|---:|---|---|---:|---:|---|---|
| 1. Números reales | 26 | 4 | 30 | Racionales e irracionales, fracciones, problemas encadenados, aproximación, error absoluto y relativo; los verificados mantienen orden e intervalos | 4 estructuras originales más las verificadas | 2 | 2 | Rectas reales e intervalos cuyo dibujo no se recupera con total seguridad | Suficiente; pendiente ampliar representación visual |
| 2. Potencias y raíces | 6 | 4 | 10 | Potencias, signos, productos como potencia, notación científica, extracción de factores de radicales | 4 estructuras originales y variantes propias de 3.º | 3 | 1 | Fórmulas nativas del Word que requieren revisión visual | Suficiente para práctica inicial; conviene ampliar operaciones combinadas y problemas originales |
| 3. Expresiones algebraicas | 16 | 4 | 20 | Lenguaje algebraico, división, teorema del factor, valores excluidos; los verificados aportan operaciones, identidades y factorización | 4 estructuras originales más 16 verificadas | 2 | 2 | Fracciones y expresiones insertadas como objetos de ecuación | Suficiente |
| 4. Ecuaciones y sistemas | 33 | 4 | 37 | Primer grado con paréntesis, segundo grado, problemas de ecuaciones y problemas de sistemas; alternancia propia entre ecuaciones y sistemas | 4 estructuras originales más 33 verificadas | 2 | 2 | Parte de las fichas extensas de problemas y ecuaciones en objetos Word | Suficiente; queda material original adicional para futuras tandas controladas |
| 5. Proporcionalidad | 2 | 4 | 6 | Clasificación directa/inversa, velocidad-tiempo, variaciones porcentuales sucesivas | 4 estructuras originales | 3 | 1 | Tablas incrustadas y repartos con maquetación no inequívoca | Cobertura funcional, pero es el banco curado más corto; faltan repartos y porcentajes inversos conectados |
| 6. Sucesiones | 12 | 4 | 16 | Aritméticas, geométricas alternantes, término general, datos desconocidos, suma finita e infinita convergente; generador propio de interés simple y compuesto | 4 estructuras originales más 12 verificadas y variantes propias | 2 | 2 | Algunas recurrencias y fórmulas nativas del documento | Suficiente |
| 7. Cuerpos geométricos | 11 | 6 | 17 | Prismas, cilindros, corona circular, pirámides, esfera inscrita y desarrollos; generador con progresión semejanza → Tales → Pitágoras → áreas → volúmenes → desarrollos | 6 estructuras originales más 11 verificadas | 3 | 3 | Numerosas figuras, cuerpos, desarrollos y tablas de medidas del material original | Suficiente sin inventar figuras; queda recuperación visual |
| 8. Funciones | 11 | 4 | 15 | Imágenes, función afín, paralelas, recta por dos puntos y problema contextualizado; los verificados aportan parábolas y lectura cualitativa | 4 estructuras originales más 11 verificadas | 2 | 2 | Gráficas y tablas originales dependientes de la imagen | Suficiente en cálculo; lectura gráfica visual pendiente |
| 9. Estadística | 0 | 10 | 10 | Tipos de variables, media, mediana, moda, recorrido, varianza, desviación típica y elección de histograma | 10 estructuras originales distintas | 8 | 2 | Tablas completas, histogramas y diagramas originales | Conectada y utilizable; falta incorporar representaciones visuales reales |
| 10. Probabilidad | 0 | 8 | 8 | Experimento aleatorio, espacio muestral, sucesos, Laplace, unión y complementario, experimentos compuestos, con y sin reemplazamiento | 8 estructuras originales distintas | 5 | 3 | Tablas y diagramas de árbol originales que no se han podido recuperar con certeza | Conectada y suficiente para el nivel; sin total, Bayes ni binomial |

## A. Originales conectados

Se han conectado **52 ejercicios originales** procedentes exclusivamente de los diez documentos de ejercicios propios de 3.º ESO situados bajo `documentos/3º ESO/Temas mios/`. No se han usado soluciones impresas como enunciados ni se han reconstruido datos ilegibles.

## B. Contaminaciones de 4.º ESO eliminadas

- `threeEsoModelBank()` ya no devuelve bancos de 4.º ESO A o B.
- La selección de 3.º ESO ya no cae en los bancos genéricos superiores cuando su banco específico está vacío.
- Se elimina por esa vía la entrada de logaritmos, racionalización avanzada, límites de sucesiones, composición, inversa, dominios radicales avanzados, inecuaciones y sistemas de nivel superior.
- La comprobación automática encuentra **0 ejercicios con procedencia de 4.º ESO** en las 169 entradas curadas de 3.º ESO.

## C. Reclasificaciones internas

- Estadística y Probabilidad quedan como temas distintos también en el entrenador interno.
- Ecuaciones y sistemas alterna ejercicios de ambos contenidos; deja de favorecer sistemáticamente los sistemas.
- Sucesiones tiene ruta propia y no usa límites de sucesiones de 4.º ESO.
- El interés simple y compuesto se genera en el Tema 6, Sucesiones, nunca en Potencias y raíces.
- Cuerpos geométricos dispone de una progresión propia que comienza por semejanza y proporcionalidad geométrica.
- Funciones de 3.º ESO utiliza su nivel propio y no genera composición, inversa ni dominios radicales avanzados.

## D. Procedencias corregidas

Los ejercicios verificados conservan el identificador original en `originalRawBaseId` y reciben metadata semántica normalizada de 3.º ESO (`courseId`, `topicId` y `topicIndex`). Esto corrige identificadores heredados o mal rotulados sin borrar la fuente documental real.

## E. Material visual pendiente

Quedan deliberadamente pendientes los ejercicios cuya información matemática depende de una figura, tabla, gráfica u objeto de ecuación que no se puede recuperar de forma inequívoca. Los grupos principales son:

- Tema 1: representaciones sobre la recta real e intervalos dibujados.
- Temas 2, 3, 4, 5 y 6: expresiones, tablas o fórmulas insertadas como objetos nativos en los documentos antiguos.
- Tema 7: figuras compuestas, cuerpos, desarrollos planos y tablas de medidas.
- Tema 8: lectura e interpretación de gráficas y tablas originales.
- Tema 9: tablas de frecuencias, histogramas y diagramas completos.
- Tema 10: tablas de sucesos y diagramas de árbol.

No se ha inventado ni reconstruido ninguno de esos datos. Su incorporación requiere revisión visual y, cuando proceda, conservar el recurso gráfico junto al enunciado.

## F. Estadística

Estadística pasa de 0 a **10 ejercicios y 10 estructuras originales distintas**. Ya cubre centralización y dispersión numérica, incluida varianza y desviación típica. La carencia real restante es visual: aún deben incorporarse ejercicios que muestren y exijan interpretar tablas, histogramas y diagramas originales, no sustitutos textuales.

## G. Probabilidad

Probabilidad pasa de 0 a **8 ejercicios y 8 estructuras originales distintas**. Incluye espacio muestral, sucesos, operaciones básicas, Laplace, experimentos compuestos y extracciones con y sin reemplazamiento. Se ha comprobado que no introduce probabilidad total, Bayes ni binomial.

## H. Tema 7

La selección generada puede recorrer seis etapas diferentes:

1. semejanza;
2. proporcionalidad geométrica mediante Tales;
3. Pitágoras;
4. áreas;
5. volúmenes;
6. desarrollos planos.

Las etapas 1 y 2 ya no repiten la misma estructura.

## I. Interés en el Tema 6

- Interés simple: `I=C₀·R·T/(n·100)`, con `n=1` para años, `n=12` para meses y `n=365` para días; `C_F=C₀+I`.
- Interés compuesto: `C_F=C₀(1+R/(100n))^(nt)`.
- Ambos están asociados a Sucesiones. Ninguno se conecta al Tema 2.

## J. Carencias reales restantes

1. Recuperar los recursos visuales indicados en el apartado E mediante revisión manual, sin reconstrucción por intuición.
2. Ampliar prioritariamente el banco curado de Proporcionalidad con repartos, porcentajes inversos y problemas compuestos originales.
3. Completar Estadística con tablas y gráficos reales, y Funciones con lectura gráfica real.
4. Continuar incorporando las fichas extensas de Ecuaciones y sistemas en tandas auditables, evitando duplicados estructurales.

Estas carencias están identificadas y no provocan contaminación entre temas ni cursos.

## Pruebas ejecutadas

- Auditoría de los 52 archivos de bancos verificados, normalización y banco original.
- Comprobación de pertenencia por `courseId`, `topicId` y `topicIndex`.
- Comprobación de separación `practiceEligible` / `examEligible`.
- Comprobación de cuatro opciones, solución y resultado final.
- Comprobación transversal de ausencia de fuentes de 4.º ESO.
- Recuento de estructuras por tema, nivel Aprendiz y nivel Maestro.
- Validación de sintaxis JavaScript de los archivos modificados.
- Revisión matemática específica de las opciones equivalentes en Probabilidad.

Resultado de la auditoría automatizada: **correcto, 0 fallos**.

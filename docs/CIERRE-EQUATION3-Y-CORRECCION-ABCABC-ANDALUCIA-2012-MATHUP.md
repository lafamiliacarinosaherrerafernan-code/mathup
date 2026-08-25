# Cierre humano de Equation.3 y reconstrucción estructural ABCABC

## Alcance

Este documento registra el cierre humano de los 55 objetos `Equation.3` de Andalucía, CCSS II, 2012, y el dictamen humano de la reconstrucción paralela del error espacial `ABCABC` del ejercicio `ade2012-m6-a-e1-61f8d5d80988`.

No se integra ningún ejercicio en el catálogo principal, no se publica contenido y no se modifica producción.

## Evidencia humana preservada

- Primera revisión: 55 decisiones, con 45 `COINCIDE`, 10 `NO_COINCIDE` y 0 `DUDOSO`.
- Segunda revisión: 10 decisiones nuevas, con 10 `COINCIDE`, 0 `NO_COINCIDE` y 0 `DUDOSO`, revisor pseudónimo `reviewer-1`.
- Las decisiones originales `NO_COINCIDE` no se sobrescriben.
- Para cada uno de los diez casos se conserva la cadena `NO_COINCIDE → diagnóstico → corrección → COINCIDE en recheck`.
- Resultado final: 55/55 objetos `EQUATION3_HUMAN_VALIDATED` y 27/27 ejercicios dependientes con ese mismo estado en la capa paralela.
- Los 21 ejercicios sin dependencia de `Equation.3` se mantienen separados.

## Incidencia `ABCABC`

### Diagnóstico

El DOC oficial conserva dos juegos de encabezados `A B C`: el primero corresponde a las tres columnas de la matriz `F` y el segundo a las tres columnas de la matriz `G`. La extracción lineal conservó los seis caracteres y su orden, pero perdió sus coordenadas y su anclaje a las matrices, produciendo el literal histórico `A B C A B C` fuera de contexto.

### Corrección paralela

Se introduce `paired-labeled-matrices`, con dos elementos estructurados:

- `matrixLabel: F`, `columnHeaders: [A,B,C]` y la matriz F recuperada del AST.
- `matrixLabel: G`, `columnHeaders: [A,B,C]` y la matriz G recuperada del AST.

La representación responsive usa una cuadrícula semántica: en escritorio muestra ambas matrices lado a lado y en móvil las apila. No usa espacios manuales, tabuladores ni posiciones absolutas. El literal histórico, las seis posiciones originales, los hashes del DOC/EMF/PNG y la relación de cada matriz con su segmento del objeto oficial se conservan como evidencia.

La estructura matemática de las matrices y los 55 AST/MathML validados no se modifica. Los otros 47 ejercicios tampoco se reescriben.

### Dictamen humano

El 25 de agosto de 2026, el revisor pseudónimo `reviewer-1` emitió una confirmación humana explícita tras comparar el original oficial y la representación reconstruida. La exportación pública registra `explicitHumanConfirmation: true` y `decision: COINCIDE`, sin conservar la frase literal ni la hora exacta de la sesión. El dictamen queda asociado al hash exacto de la reconstrucción revisada y produce el estado `DOCUMENT_LAYOUT_HUMAN_VALIDATED`.

Esta aprobación no autoriza la integración ni publicación de los 48 ejercicios.

## Estado

- Equation.3: cerrado humanamente, 55/55.
- Ejercicios dependientes: 27 con `EQUATION3_HUMAN_VALIDATED` en la capa paralela.
- Integración de los 48 ejercicios: no autorizada.
- Reconstrucción `ABCABC`: `DOCUMENT_LAYOUT_HUMAN_VALIDATED`, revisor pseudónimo `reviewer-1`, sin autorización de integración.

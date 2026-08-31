# Fase 2.6 — Selectores de Andalucía

Ámbito: Matemáticas II y CCSS II de Andalucía. No se han modificado enunciados, soluciones, opciones, skills, Madrid, Castilla-La Mancha, Supabase ni almacenamiento.

## Antes / después

| Comprobación | Antes | Después |
|---|---:|---:|
| Temas Mates II sin repetición prematura | 9/14 | 14/14 |
| Temas CCSS II no vacíos sin repetición prematura | 8/10 | 10/10 |
| Bloques Mates II correctos | 1/4 | 4/4 |
| Bloques CCSS II correctos | 2/4 | 4/4 |
| Capacidad práctica de examen Mates II | 8 | 8 |
| Capacidad práctica de examen CCSS II | 4 artificial | 118 real |
| Incidencias funcionales de la auditoría | 43 en fase 2.5 global | 0 en fase 2.6 Andalucía |

El tema `CCSS II → Determinantes` permanece con 0 ejercicios y no se ha dado por válido automáticamente: se ha investigado de forma documental y de solo lectura.

## Ciclos exhaustivos por bloques

| Materia | Bloque | N | Primer repetido |
|---|---|---:|---:|
| Matemáticas II | Álgebra | 201 | 202 |
| Matemáticas II | Análisis | 368 | 369 |
| Matemáticas II | Geometría | 235 | 236 |
| Matemáticas II | Probabilidad y estadística | 13 | 14 |
| CCSS II | Álgebra | 183 | 184 |
| CCSS II | Análisis | 266 | 267 |
| CCSS II | Probabilidad | 171 | 172 |
| CCSS II | Estadística | 204 | 205 |

Todos los retos mantienen unicidad interna. La política equilibra entre familias mientras quedan inéditos de ellas; cuando una familia pequeña se agota, el desequilibrio restante queda identificado como forzado por inventario y nunca provoca reinicio anticipado del bloque global.

## Exámenes

- Matemáticas II conserva pools directos 198/214/193/204/8, primer repetido 199/215/194/205/9 y capacidad 8.
- CCSS II obtiene primer repetido 119/120/153/436 y capacidad efectiva 118.
- Se ejecutaron 1000 exámenes por materia con la máquina de estados equivalente y otros 1000 por materia con el núcleo persistente real.
- En ambos métodos: 0 duplicados dentro de examen y 0 ejercicios nunca seleccionados.
- Evidencia persistente real: `simulation-results-real-generator.json`, SHA-256 `2B0BAD5F35D49B812BE15D87B92EF222DD775398DFDC8B5B8372FB525797F94E`.

## Temas vacíos o pequeños

- Mates II: Vectores en el espacio 4; Probabilidad 9; Distribución binomial y normal 4. Se buscaron candidatos en otros temas y se conservaron en el informe documental.
- CCSS II: Determinantes 0. No hay candidatos inequívocos cuyo enunciado pida operar o razonar explícitamente con determinantes; hay 23 ejercicios algebraicos de rango/invertibilidad que deben revisarse con criterio humano antes de decidir si el núcleo es Matrices o Determinantes.
- No se ha reclasificado automáticamente ningún ejercicio.

## Probabilidad condicionada/Bayes/total

De 171 ejercicios fuente con `primaryTopic=Probabilidad` en CCSS II:

- 163 tienen metadatos secundarios amplios de condicionada/Bayes/total/independencia;
- 62 presentan evidencia fuerte en el enunciado;
- 103 están marcados por metadatos sin evidencia fuerte textual.

Conclusión: existe un indicio claro de sobreclasificación documental que requiere revisión específica; esta fase no modifica el banco.

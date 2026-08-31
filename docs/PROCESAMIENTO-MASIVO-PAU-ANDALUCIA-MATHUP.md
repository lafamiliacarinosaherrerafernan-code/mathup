# Procesamiento masivo PAU Andalucía de +MathUp

## Alcance

Esta fase recorre el corpus canónico oficial andaluz completo en una capa paralela y no publicada. Se han contabilizado 1.666 ejercicios: 826 de Matemáticas II y 840 de Matemáticas Aplicadas a las CCSS II, todos entre 2010 y 2026. No se han incorporado ejercicios de 2000–2009 porque no existen en las entradas canónicas actualmente acreditadas.

El contrato de resolución utilizado como referencia es `.agents/skills/solucion-de-ejercicios/SKILL.md`, con SHA-256 `18d4ead04a7159af4882134535a7b15632a430118b0c7f6b24ef45806aab9444`.

## Corrección de interpretación

La ausencia histórica de respuesta, solución o distractores no constituye una causa de bloqueo. Esos elementos son trabajo pendiente que debe obtenerse mediante la secuencia:

1. resolver el enunciado oficial íntegro;
2. comprobar el resultado por un mecanismo matemático independiente;
3. generar tres distractores derivados de errores plausibles;
4. demostrar que hay exactamente una opción correcta y cuatro opciones no equivalentes;
5. redactar la solución pedagógica completa;
6. verificar que solución, resultado y respuesta coinciden;
7. comprobar la representación final destinada al alumno.

Por tanto, los registros sin esos contenidos se clasifican como `RESOLUTION_PENDING`, no como bloqueados ni excluidos. Solo `OFFICIAL_PROMPT_EMPTY`, `UNDEFINED_VISIBLE_IN_CANONICAL_PROMPT` o `SERIALIZED_OBJECT_IN_SOURCE_PROMPT` se consideran defectos documentales impeditivos en esta corrida.

## Resultado cuantitativo

| Estado | Cantidad |
|---|---:|
| `ENABLED_AFTER_FULL_VALIDATION` | 28 |
| `RESOLUTION_PENDING` | 1.638 |
| `SOURCE_REVIEW_REQUIRED` | 0 |
| Total procesado | 1.666 |

Los 1.638 registros pendientes contienen explícitamente estas tareas:

| Trabajo pendiente | Cantidad |
|---|---:|
| Resolver con la skill validada | 1.638 |
| Verificación matemática independiente | 1.638 |
| Generar y validar tres distractores | 1.638 |
| Generar y validar solución pedagógica | 1.638 |
| Validar renderizado final | 1.638 |
| Completar clasificación taxonómica | 867 |
| Separar puntuación editorial conservando `scoreEvidence` | 791 |
| Normalizar representación matemática interna | 12 |

Los dos últimos controles son de representación/metadatos, no una autorización para cambiar el significado del enunciado oficial.

## Límite material de esta ejecución

El contrato de la skill es un conjunto de instrucciones de calidad, no un motor matemático ejecutable desde Node.js. El repositorio tampoco contiene un solucionador general independiente para la mezcla de análisis, álgebra, geometría, probabilidad, estadística, matrices, programación lineal e integrales que permita producir y verificar con seguridad 1.638 soluciones en una sola corrida.

En consecuencia, esta fase no finge que ha aplicado la skill mediante un script ni marca como resueltos ejercicios que no se han resuelto realmente. La cola `resolution-queue.jsonl` deja preparado cada registro con hashes, taxonomía, contrato fijado y tareas necesarias para procesarlo por lotes reales. Esto evita tanto la exclusión incorrecta como la fabricación de respuestas.

## Artefactos

- `summary.json`: recuentos, hashes de entradas y distinción entre habilitados, pendientes y defectos impeditivos.
- `processing-ledger.jsonl`: estado individual de los 1.666 ejercicios.
- `resolution-queue.jsonl`: cola de 1.638 resoluciones pendientes.
- `blockers.jsonl`: defectos documentales impeditivos; queda vacío en esta corrida.
- `coverage-by-subject-year-topic-block.json`: cobertura por materia, año, tema, bloque y estado.
- `enabled-regression.json`: referencia de los 28 ejercicios ya validados.
- `reproducibility.json`: hash semántico y rollback.
- `verification-results.json`: comprobaciones automáticas de integridad.

## Reproducibilidad y aislamiento

La corrida principal, dos repeticiones y la corrida con orden invertido producen el mismo hash semántico: `b3468f8b3bb86806f6719575b60040323482c5e49c94adbca6605283e270974d`.

Los artefactos son derivados y reversibles eliminando su carpeta. La generación no modifica el catálogo de entrada, no conecta nuevos ejercicios al runtime, no modifica Supabase, Madrid ni Castilla-La Mancha y no publica contenido adicional.

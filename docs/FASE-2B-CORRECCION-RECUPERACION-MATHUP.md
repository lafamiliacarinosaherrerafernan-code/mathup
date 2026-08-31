# Fase 2B — Corrección arquitectónica y recuperación controlada de +MathUp

## 1. Resultado ejecutivo

La Fase 2B se ha implementado como una canalización paralela, determinista, auditable y desconectada de producción. No se han modificado los contratos `mathup.exercise.v1`, los archivos de Fase 1, los artefactos de Fase 2/2A, los bancos, `data/`, la aplicación pública, Supabase, renderizadores, skills ni Mathpix.

Resultados principales:

- 15.527/15.527 registros de evidencia conservados, con 15.527 `sourceRecordId` únicos y sin desapariciones.
- 6.712/6.712 ejercicios originales reconciliados.
- 607/607 ejercicios antes inaccesibles conservados.
- 6.680 candidatos v1 migrados mediante 6.680 redirecciones.
- 7.485 ejercicios v2 emitidos. La diferencia de +805 se explica por 30 identidades heredadas colisionadas que se separan en varios ejercicios reales.
- 30/30 colisiones de Matemáticas I resueltas mediante redirecciones `SPLIT`; no quedan IDs v2 duplicados ni destinos huérfanos.
- 1.225/1.225 `UNIQUE_MATCH` recuperados técnicamente con trazabilidad doble y revisión matemática obligatoria.
- 0 recuperaciones `UNIQUE_MATCH` degradadas o rechazadas.
- 12 `POSSIBLE_MATCH`, 19 `CONFLICT` y 1.970 `NOT_FOUND` conservados en colas separadas y no promovidos.
- 52 pruebas ejecutadas conjuntamente en la primera comprobación y 55 en la comprobación final ampliada: 22 originales de Fase 1 y 33 específicas de Fase 2B; 0 fallos.
- Doble ejecución, invariancia frente al orden y ensayo de rollback: superados.

Ningún ejercicio ha sido publicado. Ninguna recuperación ha recibido aprobación matemática automática.

## 2. Contratos implementados

Se mantienen inmutables `mathup.exercise.v1` y sus validadores. La nueva familia paralela contiene:

1. `mathup.exercise.v2`: núcleo matemático, clasificación, procedencia, contenido, enlaces y trazabilidad; no contiene opciones ni letras.
2. `mathup.answer.v1`: respuesta correcta independiente de la presentación.
3. `mathup.solution.v1`: desarrollo o resultado final con procedencia y revisión propias.
4. `mathup.delivery-template.v1`: modalidad, elegibilidad e interacción concreta.
5. `mathup.distractor-set.v1`: tres distractores existentes y revisables, sin posición correcta.
6. `mathup.session-exercise.v1`: materialización de un intento y único lugar donde existen A/B/C/D.
7. `mathup.identity-redirect.v1`: correspondencia reversible de identidad v1 a v2, incluida la relación uno-a-varios.

Los validadores separan los gates `CORE`, `CONTENT`, `DELIVERY` y `PUBLICATION`. Un PAU abierto supera el núcleo sin opciones. Una plantilla `multiple-choice` exige respuesta y tres distractores; una plantilla abierta no los exige.

## 3. Separación de responsabilidades

La procedencia del enunciado permanece en `exercise.provenance` y `exercise.traceability`. La procedencia de respuesta y solución se conserva independientemente en cada entidad, incluyendo:

- `sourceRecordId` e `inventoryRecordId`;
- hashes inmutables de evidencia;
- clave PAU y apartado;
- regla de unión `mathup.pau-legacy-exact-key-and-part.v1`;
- fuentes separadas del enunciado y del solucionario;
- estado técnico y revisión matemática.

Las modalidades heredadas se convierten en plantillas de entrega. Para 2.º de Bachillerato se añade elegibilidad `pau-simulation`, manteniendo PAU como procedencia/clasificación y no confundiéndola con el tipo de interacción.

## 4. Recuperación controlada

| Clasificación Fase 2A | Entrada | Aceptada | Degradada/rechazada | Resultado |
|---|---:|---:|---:|---|
| `UNIQUE_MATCH` | 1.225 | 1.225 | 0 | Respuesta/solución emitidas; revisión matemática requerida |
| `POSSIBLE_MATCH` | 12 | 0 | 12 | Cola independiente, sin promoción |
| `CONFLICT` | 19 | 0 | 19 | Variantes conservadas, sin selección automática |
| `NOT_FOUND` | 1.970 | 0 | 1.970 | Pendiente de autoría/revisión futura |

Desglose de recuperaciones aceptadas:

- Matemáticas II: 1.076.
- CCSS II: 149.

Por comunidad demostrable:

| Materia | Castilla-La Mancha | Madrid | Comunidad no demostrable |
|---|---:|---:|---:|
| Matemáticas II | 1.003 | 0 | 73 |
| CCSS II | 148 | 0 | 1 |

La ausencia de coincidencias recuperadas de Madrid refleja las fuentes exactas encontradas en Fase 2A; no se ha inferido ninguna unión por semejanza.

## 5. Identidad y 30 colisiones de Matemáticas I

Las 30 identidades v1 señaladas por Fase 2A agrupaban múltiples enunciados y, en algunos casos, fuentes y cursos diferentes bajo IDs locales demasiado genéricos. Se han separado usando una identidad compuesta versionada con curso, materia, familia de fuente, tema/bloque, hash normalizado del enunciado e ID local heredado.

- redirecciones `SPLIT`: 30;
- redirecciones totales: 6.680;
- ejercicios v2: 7.485;
- identidades v2 duplicadas: 0;
- incremento explicado por separación: 805 ejercicios netos;
- respuestas/soluciones incompatibles de las identidades colisionadas: no seleccionadas automáticamente.

El registro persistente permite conservar el `exerciseId` ante un traslado de ruta después de acuñarlo. Una revisión posterior mantiene `exerciseId` y cambia `revisionId`.

## 6. Estados antes y después

Estados globales v1: 3.935 `BLOCKED`, 1.106 `REVIEW_REQUIRED` y 1.639 `PASSED` sobre 6.680 candidatos.

Estados editoriales v2: 2.836 `BLOCKED`, 4.649 `REVIEW_REQUIRED` y 0 `PASSED` sobre 7.485 ejercicios. Los 7.485 superan el núcleo estructural (`CORE_PASSED`). El cero en `PASSED` editorial es deliberado: Fase 2B no concede aprobación matemática ni publicación automática, incluso cuando conserva material previamente válido.

La comparación por clasificación resultante es:

| Curso/materia | Antes v1 | Después v2 | Estado v2 |
|---|---:|---:|---|
| Matemáticas I | 76 | 531 | 46 revisión, 485 bloqueados |
| CCSS I | 212 | 349 | 212 revisión, 137 bloqueados |
| Matemáticas II PAU | 1.921 | 2.011 | 1.076 revisión, 935 bloqueados |
| CCSS II PAU | 1.360 | 1.480 | 204 revisión, 1.276 bloqueados |

El aumento no crea contenido: recupera ejercicios reales que estaban absorbidos por las 30 identidades colisionadas y los reclasifica según su evidencia original. El detalle uno a uno está en `v1-to-v2-migration.jsonl`, `identity-redirects.jsonl` y las conciliaciones.

## 7. Cobertura PAU resultante

| Materia | Castilla-La Mancha | Madrid | Sin comunidad demostrable | Total v2 |
|---|---:|---:|---:|---:|
| Matemáticas II | 1.021 | 795 | 195 | 2.011 |
| CCSS II | 384 | 892 | 204 | 1.480 |

Los artefactos desglosan además año y convocatoria. Los valores ausentes permanecen nulos/literales conforme a `PRESERVE_NULL_AND_LITERAL`; la inferencia está prohibida.

## 8. Opciones y barajado A/B/C/D

No se han generado distractores nuevos. Se han conservado 3.423 conjuntos demostrables ya existentes. A/B/C/D solo se materializa en `mathup.session-exercise.v1` usando `mathup.shuffle.sha256-sort.v1` y una semilla derivada de intento, revisión de ejercicio y revisión de plantilla.

Distribución sobre 400 intentos fijos:

- A: 108;
- B: 105;
- C: 93;
- D: 94.

Las cuatro posiciones aparecen y quedan dentro de la tolerancia prefijada 60–140. El mismo intento reproduce exactamente la misma permutación y no altera la respuesta correcta.

## 9. Pruebas

Resultado final: 55 aprobadas, 0 fallidas.

- 22/22 pruebas originales de Fase 1.
- 33/33 pruebas de Fase 2B: contratos, esquemas, núcleo PAU abierto, plantillas, elección múltiple, barajado, recuperaciones, colas conservadoras, identidades, redirecciones, trazabilidad, cobertura, no publicación y hashes de entradas.
- Doble ejecución: 25 artefactos semánticos idénticos entre `run-a` y `run-b`.
- Invariancia de orden: los mismos 25 artefactos idénticos con entradas recorridas en orden inverso.
- Digest semántico común de las corridas: `4a14a37a606344da4885767c4312498513a8505f88adf03bf9a38d678244c65b`.

## 10. Rollback y aislamiento de producción

El ensayo creó y retiró un árbol temporal aislado de Fase 2B. Los hashes antes/después de Fase 1, Fase 2, Fase 2A, `index.html` y `app.js` coinciden. Resultado:

- directorio de ensayo retirado: sí;
- escrituras en producción: 0;
- escrituras en Supabase: 0;
- sobrescrituras de artefactos previos: 0;
- hashes protegidos sin cambios: sí.

`index.html` y `app.js` no referencian los contratos ni artefactos v2. La aplicación pública continúa usando exactamente el runtime anterior.

## 11. Artefactos generados

Código y contratos nuevos:

- `catalog/v2/`: siete JSON Schema y cuatro módulos de identidad, migración, validación y materialización.
- `catalog/fase2b-pau-normalization.v1.json`.
- `scripts/fase2b-import-catalog.mjs`.
- `scripts/fase2b-verify-reproducibility.mjs`.
- `scripts/fase2b-rollback-trial.mjs`.
- `scripts/fase2b-audit-session-shuffle.mjs`.
- `tests/fase2b-catalog.test.mjs`.

Artefactos auditables:

- `artifacts/fase2b/runs/run-a/`, `run-b/` y `run-order-reversed/` contienen manifiestos, referencia v1, entidades v2, respuestas, soluciones, plantillas, distractores, redirecciones, migración, decisiones de recuperación, colas, conciliaciones, validaciones, cobertura, comparación, hashes y rollback.
- `artifacts/fase2b/reproducibility-result.json`.
- `artifacts/fase2b/rollback-trial-result.json`.
- `artifacts/fase2b/shuffle-distribution.json`.
- `artifacts/fase2b/test-results.json`.

Archivos existentes modificados: ninguno. Todos los elementos anteriores son nuevos y paralelos.

## 12. Limitaciones pendientes

- 1.970 PAU carecen de respuesta/solución localizada y no pueden completarse sin autoría o nueva evidencia.
- 12 coincidencias posibles necesitan confirmación humana.
- 19 conflictos necesitan decisión matemática documentada.
- 2.836 ejercicios siguen bloqueados por falta de contenido demostrable u otras incidencias conservadas.
- 4.649 ejercicios tienen contenido pero permanecen en revisión; ninguno está matemáticamente aprobado por esta importación.
- 399 ejercicios v2 PAU conservan comunidad no demostrable tras separar identidades; no se ha inventado el dato.
- No se ha comprobado la corrección matemática de las respuestas o soluciones recuperadas: solo la asociación técnica exacta.
- No se ha conectado v2 al runtime, a Supabase ni a ninguna ruta pública.

Estas limitaciones son explícitas y auditables; no suponen pérdida de registros ni de evidencia.

# Plan técnico de la Fase 2B — Corrección arquitectónica y recuperación controlada de +MathUp

**Estado:** plan de arquitectura; no implementado.  
**Fecha de referencia:** 24 de agosto de 2026.  
**Línea base:** punto de control `fase-2a-diagnostico-recuperacion-mathup`.  
**Ámbito:** corregir exclusivamente los defectos arquitectónicos y recuperar la evidencia demostrada en Fase 2A, manteniendo producción, bancos, Supabase, renderizadores y skills intactos.

## 1. Objetivo y límites

La Fase 2B debe preparar una nueva ejecución paralela de la importación canónica que:

1. separe el contenido matemático de su forma de entrega;
2. admita un ejercicio PAU abierto sin opciones A/B/C/D;
3. recupere de forma auditable las 1.225 coincidencias `UNIQUE_MATCH` de Fase 2A;
4. no vincule automáticamente los 12 `POSSIBLE_MATCH`, 19 `CONFLICT` ni 1.970 `NOT_FOUND`;
5. resuelva las 30 colisiones de identidad de Matemáticas I sin escoger respuestas o soluciones incompatibles;
6. conserve íntegramente la trazabilidad, los 15.527 registros de evidencia, los 6.712 ejercicios originales y los 607 inaccesibles;
7. vuelva a ejecutar y comparar toda la canalización de Fase 2;
8. no publique ni conecte el catálogo resultante.

La fase no generará respuestas, soluciones ni distractores nuevos. Tampoco corregirá matemáticamente contenido recuperado. Una coincidencia técnica exacta demuestra una relación de fuentes, no la corrección matemática de la respuesta o solución.

## 2. Decisión de versionado

### 2.1. `mathup.exercise.v1` debe permanecer inmutable

El contrato v1 contiene dos acoplamientos que Fase 2A ha demostrado incorrectos para el núcleo canónico:

- `modalities` es obligatorio y tiene `minItems: 1`;
- el validador emite `CHOICES_REQUIRED` cuando el ejercicio declara `practice`, `challenge` o `adventure`, aunque el ejercicio fuente sea abierto.

Relajar estas reglas dentro de v1 cambiaría qué documentos acepta la misma etiqueta `mathup.exercise.v1` y alteraría los resultados del validador `mathup.validator.v1`. Eso sería una modificación silenciosa de un contrato versionado y no es admisible.

Por tanto:

- `catalog/canonical-exercise.schema.json` seguirá representando exactamente `mathup.exercise.v1`;
- `catalog/canonical-exercise.mjs` y `catalog/validate-canonical-exercise.mjs` conservarán sus exportaciones y comportamiento v1;
- las 22 pruebas de Fase 1 deberán continuar pasando sin cambios;
- se añadirá una familia contractual nueva y explícita.

### 2.2. Familia contractual propuesta

| Entidad | Versión propuesta | Responsabilidad |
|---|---|---|
| Ejercicio | `mathup.exercise.v2` | Identidad, clasificación, procedencia, enunciado, representaciones, dificultad y trazabilidad. |
| Respuesta | `mathup.answer.v1` | Respuesta matemática correcta y valores aceptados, independiente de letras y entrega. |
| Solución | `mathup.solution.v1` | Desarrollo o respuesta final recuperada, perfil pedagógico, revisión y procedencia propia. |
| Plantilla de entrega | `mathup.delivery-template.v1` | Modalidad e interacción autorizadas para presentar un ejercicio. |
| Conjunto de distractores | `mathup.distractor-set.v1` | Tres distractores revisables asociados a una respuesta y una plantilla de elección múltiple. |
| Instancia de sesión | `mathup.session-exercise.v1` | Materialización de un intento: semilla, opciones ordenadas y posición A/B/C/D. |
| Redirección de identidad | `mathup.identity-redirect.v1` | Correspondencia auditable entre identidades anteriores y nuevas. |

Las versiones de respuesta, solución y entrega son independientes para permitir revisar una solución o un conjunto de distractores sin crear una identidad matemática nueva para el ejercicio.

### 2.3. Compatibilidad y migración

La migración v1→v2 será aditiva, pura y reversible:

- nunca sobrescribirá un candidato v1;
- producirá las entidades v2 en artefactos paralelos;
- conservará el JSON v1, su hash y sus diagnósticos originales;
- registrará por campo la entidad v2 de destino y la regla aplicada;
- permitirá reconstruir una vista v1 cuando todos los requisitos v1 estén presentes;
- no fabricará modalidad, opciones, respuesta o solución para completar esa vista.

Un v1 con `choices` se divide en ejercicio, respuesta, plantilla y conjunto de distractores. Un v1 abierto conserva el ejercicio y su respuesta/solución, sin crear distractores. Las modalidades v1 pasan a ser afirmaciones de elegibilidad o plantillas solo cuando exista evidencia suficiente; nunca se interpretan como prueba de que el enunciado original era tipo test.

## 3. Arquitectura de dominio separada

### 3.1. Ejercicio canónico `mathup.exercise.v2`

Debe contener:

- `identity`: `exerciseId`, revisión, alias y hashes;
- `classification`: curso, materia, tema, bloque y currículo;
- `difficulty`;
- `provenance`: procedencia general y PAU;
- `content`: enunciado, matemática y activos;
- `links`: referencias opcionales a respuestas, soluciones y plantillas;
- `review`, `traceability` y estado editorial.

No debe contener:

- `modalities` como requisito de validez del núcleo;
- `choices`;
- distractores;
- `correctIndex`, `correctPosition` ni letras;
- una posición correcta materializada.

Un ejercicio puede ser estructuralmente válido aunque todavía no tenga plantilla de entrega. La ausencia de respuesta o solución puede bloquear su publicación, pero no debe impedir conservar el ejercicio y su evidencia como entidad canónica de borrador.

### 3.2. Respuesta matemática `mathup.answer.v1`

Campos mínimos:

- `answerId`, `exerciseId` y revisión;
- `kind`, `canonicalValue`, `acceptedValues`, unidades y tolerancia;
- `evidenceStatus`: `OBSERVED`, `RECOVERED_UNIQUE`, `POSSIBLE`, `CONFLICT`, `NOT_FOUND`;
- procedencia de la respuesta separada de la procedencia del enunciado;
- `sourceRecordIds`, clave PAU completa y regla de unión;
- estado de revisión matemática.

La respuesta no contiene A/B/C/D. `answerId` identifica el criterio correcto incluso cuando cambien plantillas o distractores.

### 3.3. Solución `mathup.solution.v1`

Campos mínimos:

- `solutionId`, `exerciseId`, revisión y `answerId` relacionado;
- `kind`: `developed` o `final-only`;
- pasos, respuesta final, verificación y perfil pedagógico;
- `recoveryKind`: `RECOVERED_ANSWER_ONLY`, `RECOVERED_FINAL_ONLY`, `RECOVERED_DEVELOPED`, `AUTHORITATIVE_EXISTING`;
- fuente y registros de evidencia propios;
- `solutionNeedsReview` y hallazgos;
- estado de validación técnica y estado de revisión matemática separados.

No se creará una entidad solución ficticia para representar ausencia. La ausencia se expresará en el expediente del ejercicio mediante un estado de cobertura.

### 3.4. Procedencia

La procedencia del enunciado y la de respuesta/solución se conservan por separado. Para PAU se mantendrán, cuando consten:

- materia (`matematicas-ii` o `matematicas-ccss-ii`);
- comunidad;
- año;
- convocatoria;
- modelo/opción;
- ejercicio y apartado;
- archivo, ruta, página, activo y hash;
- identificadores y `sourceRecordId` de cada fuente participante.

Ser PAU es una propiedad de procedencia y clasificación, no una modalidad de entrega.

### 3.5. Plantilla de entrega `mathup.delivery-template.v1`

Campos mínimos:

- `templateId`, `exerciseId`, revisión y modalidad;
- `interactionKind`: `open-response`, `multiple-choice` u otra interacción futura;
- perfil pedagógico y condiciones de elegibilidad;
- `answerRef`;
- `distractorSetRef`, obligatorio solo para `multiple-choice`;
- política de materialización y revisión;
- evidencia que autoriza la modalidad.

Reglas:

- `open-response` no exige distractores;
- `pau-simulation` puede usar interacción abierta o múltiple; la modalidad por sí sola no decide la interacción;
- `practice`, `challenge`, `adventure`, `topic-exam` y `block-exam` describen contextos de entrega, no el contenido original;
- que un ejercicio sea elegible para una modalidad no crea automáticamente una plantilla múltiple;
- una plantilla múltiple no es publicable sin respuesta y distractores válidos.

### 3.6. Conjunto de distractores `mathup.distractor-set.v1`

Debe almacenar tres distractores con IDs estables, procedencia, política de equivalencia y estado de revisión. Se vincula a `answerId`, pero no duplica la respuesta correcta como posición ni letra. Los distractores existentes se migran conservando sus valores originales; no se generan otros en Fase 2B.

### 3.7. Instancia de sesión `mathup.session-exercise.v1`

Solo aquí se materializan las cuatro opciones:

- `sessionExerciseId`, `attemptId`, `templateRevisionId` y `exerciseRevisionId`;
- semilla derivada de identificadores estables del intento mediante algoritmo versionado;
- cuatro `optionInstanceId` ordenados;
- referencia interna a `answerId`/opción correcta;
- `correctIndex` calculado y, si se necesita para presentación, letra A/B/C/D;
- versión del algoritmo de barajado.

La semilla no incluirá datos personales. El mismo intento, plantilla y versión producirán el mismo orden; intentos diferentes distribuirán la correcta de forma reproducible. La prueba de equilibrio se hará sobre un conjunto fijo y amplio de semillas, sin prometer igualdad exacta para muestras pequeñas.

## 4. Cambios concretos respecto de los archivos de Fase 1

### 4.1. `catalog/canonical-exercise.schema.json`

No debe editarse en el sitio. Las partes que motivan v2 y que se sustituirán en un archivo nuevo son:

- `schemaVersion.const = mathup.exercise.v1` → nueva constante v2;
- `required`: retirar del núcleo `modalities`, `answer`, `solution` y `choices`, sustituyéndolos por referencias explícitas y estados de cobertura;
- `modalities.minItems: 1` y restricciones por perfil → mover a plantilla de entrega;
- `answer` y `solution` → esquemas independientes referenciados;
- `choices` y `$defs.choiceValue` → mover a conjunto de distractores/plantilla;
- `publication.eligibleModalities` → reemplazar por referencias a plantillas aprobadas;
- reglas `allOf` sobre modalidades → mantener solo coherencia de curso, etapa, perfil/procedencia y trasladar permisos de modalidad al contrato de entrega.

Se crearán esquemas nuevos, sin reemplazar el v1, para ejercicio v2, respuesta, solución, plantilla, distractores, sesión y redirecciones.

### 4.2. `catalog/canonical-exercise.mjs`

Debe conservarse como implementación v1. La nueva implementación deberá:

- declarar constantes de versión independientes;
- separar catálogos de procedencia, modalidad e interacción;
- reemplazar `canonicalChoiceValues` y `materializeCanonicalChoices` del núcleo por utilidades del módulo de sesión;
- proporcionar constructores separados para cada entidad;
- implementar `materializeSessionExercise(template, answer, distractorSet, attemptContext)`;
- derivar una semilla sin información personal y usar un PRNG/algoritmo de permutación versionado;
- impedir que los constructores de ejercicio acepten posición, letra o opciones materializadas;
- mantener una función pura `migrateExerciseV1ToV2` que produzca entidades y expediente, sin mutar entrada.

No se cambiarán las exportaciones v1 existentes; los módulos v2 tendrán nombres y rutas nuevas para evitar que consumidores actuales cambien de semántica.

### 4.3. `catalog/validate-canonical-exercise.mjs`

Debe permanecer como `mathup.validator.v1`. El validador v2 se separará en validadores por entidad y uno de agregación:

- el núcleo ya no emitirá `MODALITIES_MISSING`, `PAU_MODALITY_UNDECLARED` ni `CHOICES_REQUIRED`;
- conservará coherencia de curso/materia/etapa, procedencia PAU, enunciado, notación, trazabilidad e identidad;
- el validador de respuesta comprobará presencia y forma del valor, sin letras;
- el de solución distinguirá `final-only`, desarrollado y revisión pendiente;
- el de plantilla exigirá interacción y modalidad permitidas;
- solo una plantilla `multiple-choice` exigirá respuesta y `distractorSetRef`;
- el validador de distractores comprobará cantidad, unicidad y equivalencia segura;
- el de sesión comprobará cuatro opciones, permutación, semilla, algoritmo y correspondencia correcta;
- el agregador calculará por separado `coreGate`, `contentGate`, `deliveryGate` y `publicationGate`.

La ausencia de respuesta o solución seguirá impidiendo publicación cuando el producto las requiera, pero no invalidará el registro del núcleo como evidencia canónica. Esto evita confundir “ejercicio localizado” con “ejercicio listo para el alumno”.

## 5. Recuperación controlada de las 1.225 coincidencias

### 5.1. Clave PAU exacta

Se definirá una clave canónica versionada con componentes observados:

`subject + community + year + sitting + examOption/model + exercise + part`.

Cada componente conservará el literal, el valor normalizado seguro y su procedencia. Un componente desconocido no se rellenará. Los mapas de convocatoria y apartado serán cerrados, versionados y reversibles; una normalización no reconocida no producirá `UNIQUE_MATCH`.

### 5.2. Procedimiento de unión

Para cada candidato clasificado como `UNIQUE_MATCH` en Fase 2A:

1. recalcular la clave desde la evidencia original del candidato;
2. recalcular independientemente la clave del banco de respuesta/solución;
3. exigir igualdad exacta de materia, comunidad, año, convocatoria, modelo/opción, ejercicio y apartado cuando esos componentes formen parte de la clave;
4. exigir una única fuente compatible por entidad y apartado;
5. comprobar que no existe otra respuesta o solución incompatible bajo la misma clave;
6. comprobar que la solución corresponde al apartado, no solo al ejercicio padre;
7. validar UTF-8, caracteres de sustitución, controles, mojibake y notación declarada;
8. registrar hashes de ambas fuentes y de los valores recuperados;
9. producir entidades de respuesta y/o solución con IDs deterministas;
10. registrar una decisión `ACCEPTED_TECHNICAL_MATCH` con regla, versión y todas las fuentes.

Si cualquiera de las comprobaciones falla, la coincidencia se degrada a `POSSIBLE_MATCH` o `CONFLICT`; nunca se toma la primera coincidencia ni se completa por semejanza.

### 5.3. Trazabilidad doble

Cada recuperación conservará como mínimo:

- fuente original del enunciado y sus `sourceRecordId`;
- fuente independiente de respuesta/solución y sus `sourceRecordId`;
- clave PAU literal y normalizada de cada lado;
- apartado de cada lado;
- regla y versión de enlace;
- `answerId` y `solutionId` generados;
- hashes antes/después;
- resultado de validación técnica;
- estado de revisión matemática.

No se fusionarán ambas procedencias en un único campo `source`.

### 5.4. Clasificación del material recuperado

| Resultado encontrado | Estado |
|---|---|
| Solo respuesta verificable | `ANSWER_RECOVERED`, solución `MISSING`. |
| Respuesta y texto final sin desarrollo | `ANSWER_RECOVERED` + solución `FINAL_ONLY`. |
| Respuesta y pasos estructurados | solución `DEVELOPED_RECOVERED`. |
| Texto potencialmente desarrollado pero estructura dudosa | solución recuperada con `solutionNeedsReview = true`. |
| Discordancia entre respuesta y final de solución | `CONFLICT`, sin promover ninguna como aprobada. |

Todo material recuperado queda como mínimo en revisión matemática. La importación no otorgará `APPROVED` por haber superado la unión técnica.

### 5.5. Validaciones automáticas y humanas

Automatizables con seguridad:

- unicidad e igualdad de clave;
- coherencia exacta de apartado;
- integridad referencial y hashes;
- sintaxis de estructuras;
- detección de campos vacíos, codificación deteriorada y caracteres de control;
- correspondencia textual o equivalencia numérica segura entre respuesta y final de solución;
- clasificación objetiva `answer-only`, `final-only` o `developed` cuando la estructura lo demuestra;
- ausencia de conflictos literales bajo la misma clave.

Requieren revisión humana/matemática:

- corrección de la respuesta;
- validez de cada paso;
- equivalencia simbólica no cubierta por reglas seguras;
- fidelidad visual de fórmulas, tablas, imágenes y matrices;
- adecuación pedagógica y suficiencia del desarrollo;
- elección entre fuentes incompatibles;
- cualquier reparación de notación o texto.

### 5.6. Casos que no se tocarán automáticamente

- 12 `POSSIBLE_MATCH`: conservar en cola con evidencias candidatas.
- 19 `CONFLICT`: conservar todas las variantes y causas.
- 1.970 `NOT_FOUND`: registrar `ANSWER_MISSING`, `SOLUTION_MISSING` y `PENDING_AUTHORING`, sin crear contenido.

Estos recuentos son controles de regresión. Cualquier reclasificación deberá deberse a nueva evidencia explícita y quedar documentada, no a una regla más permisiva.

## 6. Corrección de las 30 colisiones de Matemáticas I

### 6.1. Causa

Los identificadores numéricos heredados se reutilizan entre bancos, temas y enunciados. La identidad de Fase 2 los agrupó fuera de su espacio de nombres, mezclando enunciados, respuestas, soluciones, cursos, temas y opciones.

### 6.2. Semilla de identidad v2

La asignación inicial utilizará:

`courseId + subjectId + sourceNamespace + topicOrBlock + normalizedStatementHash + sourceLocalLegacyId`.

Reglas:

- `sourceNamespace` será una familia estable y versionada, no una ruta física accidental;
- el tema/bloque solo se usará cuando esté demostrado; si falta, se conservará un marcador explícito de ausencia dentro de la semilla, no un tema inventado;
- el hash normalizado preservará matemática y signos; solo eliminará diferencias mecánicas aprobadas;
- el ID heredado se interpretará dentro de su fuente;
- el hash participa en la desambiguación inicial, pero, una vez emitido el `exerciseId`, una corrección del enunciado crea revisión y no un ejercicio nuevo;
- no se fusionarán ejercicios de familias distintas únicamente por texto igual; se propondrá relación de duplicado para revisión.

### 6.3. Tabla de redirección

Se generará un registro inmutable con:

- `oldExerciseId`/`oldCandidateId`;
- uno o varios `newExerciseId`;
- `redirectKind`: `ONE_TO_ONE`, `SPLIT`, `ALIAS` o `REVIEW_REQUIRED`;
- fuentes e identidades heredadas que justifican cada destino;
- algoritmo, semilla y hashes;
- motivo de la separación;
- estado de revisión.

Las colisiones probablemente producirán redirecciones `SPLIT`; nunca se ocultará una relación uno-a-varios bajo un alias simple. Las respuestas y soluciones se volverán a asociar solo después de separar identidades y solo si quedan únicas dentro del nuevo espacio.

## 7. Política de modalidades

### 7.1. Principio general

Se distinguirán tres conceptos:

1. `provenance`: de dónde procede el ejercicio;
2. `deliveryEligibility`: modalidades en las que podría usarse según perfil y revisión;
3. `deliveryTemplate`: configuración concreta aprobada para entregarlo.

La elegibilidad no equivale a una plantilla ni obliga a crear distractores.

### 7.2. Matemáticas I y CCSS I

- El núcleo puede existir sin modalidad demostrada.
- Evidencia heredada de Práctica/Retos/examen se conserva como observación de uso.
- Solo se crea plantilla si interacción y requisitos están demostrados.
- Una entrega abierta no exige opciones.
- La ausencia de plantilla impide entrega/publicación, no la conservación canónica.

### 7.3. Matemáticas II PAU y CCSS II PAU

- `stage = PAU`, `provenance.kind = official-pau` y materia permanecen obligatorios.
- Comunidad, año y convocatoria se conservan cuando constan; nunca se infieren.
- `pau-simulation` es modalidad; `official-pau` es procedencia.
- Un ejercicio PAU original puede tener plantilla abierta.
- Puede ser elegible posteriormente para Práctica, Reto o examen, pero eso no lo convierte en test.
- Una plantilla múltiple posterior necesitará respuesta revisada y distractores aprobados.

## 8. Estados de cobertura y revisión

Cada ejercicio tendrá un expediente independiente del gate estructural:

- `ANSWER_FOUND` / `ANSWER_MISSING`;
- `SOLUTION_DEVELOPED` / `SOLUTION_FINAL_ONLY` / `SOLUTION_MISSING`;
- `POSSIBLE_EVIDENCE`;
- `CONFLICT`;
- `PENDING_AUTHORING`;
- `MATHEMATICAL_REVIEW_REQUIRED`;
- `DELIVERY_TEMPLATE_MISSING`;
- `DISTRACTORS_MISSING` cuando exista una plantilla múltiple prevista.

Estados de migración:

- `CORE_PASSED`: núcleo v2 estructural y trazable;
- `CONTENT_BLOCKED`: respuesta/solución exigidas para publicación ausentes o conflictivas;
- `REVIEW_REQUIRED`: evidencia recuperada o incertidumbre matemática/editorial;
- `DELIVERY_BLOCKED`: la plantilla elegida no cumple sus requisitos;
- `PUBLICATION_PASSED`: solo después de todas las aprobaciones, fuera de Fase 2B.

Así un PAU abierto sin opciones puede superar el núcleo, aunque siga bloqueado para publicación por falta de respuesta o solución.

## 9. Artefactos auditables previstos

La implementación deberá generar, en un directorio nuevo de Fase 2B:

- manifiestos de entradas y versiones contractuales;
- candidatos v1 de referencia y entidades v2;
- `v1-to-v2-migration.jsonl`;
- `pau-recovery-decisions.jsonl`;
- `answer-records.jsonl` y `solution-records.jsonl`;
- `delivery-templates.jsonl` y `distractor-sets.jsonl`;
- `identity-redirects.jsonl`;
- colas separadas para posibles, conflictos, no encontrados y revisión matemática;
- conciliación por ejercicio y por `sourceRecordId`;
- cobertura por curso/materia y PAU por comunidad/año/convocatoria;
- comparación antes/después de estados y diagnósticos;
- hashes, informe reproducible y manifiesto de rollback.

Los artefactos de Fase 2 y 2A se tratarán como entradas inmutables; no se sobrescribirán.

## 10. Comparación obligatoria antes/después

La nueva ejecución deberá demostrar:

| Control | Criterio |
|---|---|
| Registros de evidencia | 15.527 presentes y `sourceRecordId` idénticos. |
| Ejercicios originales | 6.712 reconciliados. |
| Inaccesibles | 607 presentes con causa conservada. |
| Candidatos | Diferencia explicada uno a uno, especialmente por los `SPLIT` de Matemáticas I. |
| Estados | `PASSED`, `REVIEW_REQUIRED`, `BLOCKED` y nuevos gates comparados sin ocultar cambios semánticos. |
| Bloqueos | Cada reducción vinculada a cambio contractual, recuperación exacta o separación de identidad. |
| Cobertura | Cuadre por curso y materia. |
| PAU | Matemáticas II y CCSS II separadas por comunidad, año y convocatoria cuando constan. |
| Recuperación | 1.225 decisiones exactas trazables; 12 posibles, 19 conflictos y 1.970 no encontrados preservados salvo nueva evidencia explícita. |
| Fuentes | Ningún registro de respuesta/solución reemplaza la fuente del enunciado. |

Los recuentos v1 y v2 no deben compararse como si sus gates fueran idénticos. El informe mostrará simultáneamente:

- resultado con `mathup.validator.v1` sobre la línea base;
- resultado de núcleo, contenido y entrega con los validadores nuevos;
- explicación mecánica de cada transición.

## 11. Pruebas obligatorias

### 11.1. Contratos y compatibilidad

- las 22 pruebas de Fase 1 siguen pasando;
- v1 conserva exactamente sus resultados y hashes;
- un ejercicio v1 puede migrarse sin perder ningún campo ni evidencia;
- la migración inversa solo se ofrece cuando no pierde información y declara las limitaciones.

### 11.2. Ejercicio abierto y entrega

- PAU abierto válido sin `choices` ni plantilla múltiple;
- plantilla `open-response` válida sin distractores;
- plantilla `multiple-choice` rechazada sin `answerRef` o tres distractores;
- declarar elegibilidad para Práctica no crea opciones;
- A/B/C/D, `correctIndex` y `correctPosition` son rechazados fuera de sesión;
- una sesión contiene cuatro opciones distintas y una única correcta.

### 11.3. Barajado

- mismo intento y versión producen la misma permutación;
- semillas distintas permiten la correcta en A, B, C y D;
- la opción correcta no se altera al barajar;
- ninguna letra se persiste en ejercicio, respuesta, solución, plantilla o distractores;
- prueba estadística de distribución sobre semillas fijas con tolerancia predefinida y sin aleatoriedad ambiental.

### 11.4. Recuperación

- unión exacta de respuesta y solución por clave PAU y apartado;
- trazabilidad separada de enunciado y solución;
- `POSSIBLE_MATCH` rechazado por la ruta automática;
- `CONFLICT` rechazado conservando variantes;
- clave duplicada, apartado incoherente o codificación dañada no se promueven;
- clasificación correcta de respuesta sola, final-only y desarrollada;
- ninguna recuperación obtiene aprobación matemática automática.

### 11.5. Identidad

- las 30 colisiones de Matemáticas I quedan separadas;
- no hay colisiones nuevas en todo el catálogo;
- mismo ejercicio y fuente mantienen ID entre ejecuciones;
- cambio de ruta no cambia ID;
- revisión del texto mantiene `exerciseId` y cambia `revisionId`;
- tabla de redirección cubre todas las identidades antiguas y representa correctamente los `SPLIT`;
- no existen alias circulares ni destinos huérfanos.

### 11.6. Cobertura, reproducibilidad y rollback

- 15.527/15.527 registros y 6.712/6.712 ejercicios conciliados;
- 607/607 inaccesibles presentes;
- ningún `sourceRecordId` desaparece;
- todos los cambios de estado tienen causa verificable;
- dos ejecuciones producen artefactos semánticos idénticos;
- variar el orden accidental no cambia identidades ni enlaces;
- el ensayo de rollback retira solo artefactos 2B y deja intactos Fase 1, Fase 2, Fase 2A y producción;
- no existen escrituras de red ni referencias desde `index.html` o `app.js`.

## 12. Criterios de cierre

La Fase 2B solo podrá cerrarse si:

1. los contratos nuevos están explícitamente versionados y v1 permanece inmutable;
2. todos los validadores y migradores tienen pruebas deterministas;
3. un PAU abierto supera el núcleo sin opciones;
4. solo una plantilla múltiple exige distractores;
5. A/B/C/D existe exclusivamente en la instancia de sesión;
6. las 1.225 recuperaciones superan controles técnicos individuales y conservan doble procedencia;
7. los 12 posibles, 19 conflictos y 1.970 no encontrados no han sido promovidos automáticamente;
8. las 30 colisiones de Matemáticas I están resueltas con redirecciones completas;
9. permanecen reconciliados los 6.712 originales y los 607 inaccesibles;
10. ningún `sourceRecordId` desaparece;
11. Matemáticas II y CCSS II mantienen comunidad, año y convocatoria cuando constan;
12. la comparación antes/después explica candidatos, gates, diagnósticos y recuperaciones;
13. doble ejecución, invariancia de orden y rollback pasan;
14. aplicación, bancos, Supabase, renderizadores, skills y artefactos previos no presentan diferencias.

No es criterio de cierre que todos los ejercicios tengan solución. Los no encontrados quedarán explícitamente pendientes de elaboración en una fase posterior.

## 13. Archivos previsibles de implementación

### Nuevos

- esquemas v2/v1 de las siete entidades descritas;
- módulos de modelo, validación, migración y materialización de sesión;
- tablas versionadas de normalización PAU y espacios de nombres;
- importador/recuperador de Fase 2B;
- generador de redirecciones de identidad;
- pruebas unitarias, de integración, reproducibilidad y rollback;
- artefactos e informe de ejecución de Fase 2B.

### Existentes que no deben modificarse

- los tres archivos de contrato/validador de Fase 1;
- bancos y archivos `data/`;
- importador y artefactos inmutables de Fase 2;
- auditor y artefactos de Fase 2A;
- `index.html`, `app.js`, Supabase, renderizadores y skills.

Si durante la implementación se considerase imprescindible añadir un exportador de compatibilidad a un módulo genérico existente, deberá solicitarse autorización específica. La opción preferida es un módulo nuevo para no cambiar v1.

## 14. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Cambiar silenciosamente v1 | Congelarlo; nombres y versiones nuevas; pruebas de regresión por hash. |
| Confundir PAU con modalidad | Ejes separados y validadores distintos. |
| Tratar elegibilidad como test | Solo una plantilla `multiple-choice` exige distractores. |
| Vincular una solución equivocada | Clave completa, apartado, unicidad y conflicto; rechazo conservador. |
| Dar por correcta una solución recuperada | Estado técnico separado de revisión matemática. |
| Perder procedencia del solucionario | Proveniencia doble y `sourceRecordId` por entidad. |
| Crear IDs inestables por el hash del texto | Hash solo para acuñación/desambiguación inicial; registro persistente para revisiones posteriores. |
| Crear duplicados artificiales al separar colisiones | Relaciones de duplicado revisables; no fusión por texto aislado. |
| Romper enlaces antiguos en un `SPLIT` | Tabla uno-a-varios y consumidores aún desconectados. |
| Sesgo o no reproducibilidad del barajado | Algoritmo y semilla versionados, pruebas de posiciones y distribución. |
| Reducir `BLOCKED` ocultando requisitos | Gates separados y comparación código por código. |
| Perder registros en la reejecución | Controles 15.527, 6.712, 607 y cobertura de todos los IDs. |
| Incorporar inferencias como hechos | Solo evidencia observada o transformación segura; colas para el resto. |

## 15. Orden de implementación recomendado

1. congelar línea base, contratos y hashes v1/Fase 2/Fase 2A;
2. crear contratos y validadores separados, empezando por pruebas rojas;
3. implementar migrador v1→v2 reversible;
4. implementar identidad v2 y redirecciones sobre las 30 colisiones;
5. implementar clave PAU exacta y libro de decisiones;
6. recuperar las 1.225 coincidencias en artefactos sombra;
7. generar plantillas solo desde evidencia existente;
8. implementar materialización de sesión aislada, sin integrarla en la aplicación;
9. ejecutar catálogo completo y producir comparación antes/después;
10. ejecutar pruebas, doble corrida, invariancia de orden y rollback;
11. someter resultados a revisión externa antes de cualquier commit de cierre o fase posterior.

## 16. Resultado esperado

Al finalizar una futura implementación autorizada de Fase 2B existirán, en paralelo, ejercicios v2 independientes de la entrega, respuestas y soluciones recuperadas con trazabilidad completa, plantillas explícitas y una materialización reproducible de opciones por intento. Los originales, los contratos v1 y la aplicación permanecerán intactos. Los ejercicios sin evidencia seguirán visibles y clasificados, preparados para una fase posterior de revisión o elaboración, nunca completados por invención.

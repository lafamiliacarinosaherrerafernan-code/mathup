# Auditoría del runtime y requisitos funcionales de 2.º Bachillerato PAU en +MathUp

Fecha de auditoría: 2026-08-25  
Alcance: lectura del runtime público actual, sus bancos y filtros; contraste con el catálogo canónico paralelo y definición de requisitos funcionales.  
Estado: **auditoría, sin cambios de producción**.

## 1. Resumen ejecutivo

El runtime público de 2.º de Bachillerato ofrece tres recorridos visibles y no contiene un Entrenador IA:

1. **Estudiar temas y hacer retos** — botón **Entrar por temas**.
2. **Estudiar por bloques y hacer retos** — botón **Ver bloques**.
3. **Hacer examen** — botón **Comenzar examen**.

La segunda modalidad es un reto por bloques, **no un “Examen por bloques”**. El identificador histórico interno `examByBlocks` se usa en disponibilidad y selección, pero no define el nombre ni la naturaleza funcional visible. Debe documentarse como:

`examByBlocks` (identificador interno histórico) ≠ “Examen por bloques” (nombre funcional no autorizado)

Hallazgos principales:

- Matemáticas II utiliza actualmente 5 ejercicios tanto en retos como en examen.
- CCSS II utiliza actualmente **4**, tanto en retos como en examen. Esto contradice el requisito funcional común de 5 y debe corregirse en una fase posterior, no en esta auditoría.
- El selector público solo conoce Castilla-La Mancha (`clm`) y Madrid (`madrid`). Andalucía existe en la capa canónica paralela, pero no está conectada al selector ni a los bancos públicos.
- La comunidad sí participa en las claves de selección e historial, pero hay excepciones que impiden considerar el aislamiento plenamente certificado: Madrid evita parte del filtro de disponibilidad y CCSS II de Castilla-La Mancha reutiliza material de Matemáticas II en ciertos apoyos temáticos.
- El runtime y los bancos actuales mezclan dos modelos de entrega: respuesta abierta para ciertos ejercicios de Madrid y elección múltiple con cuatro opciones para ejercicios completos/corregidos.
- Existe no repetición por alumno, materia, comunidad y ámbito, aunque un ejercicio se marca como usado al mostrarse, no necesariamente al responderse.
- El barajado actual no satisface aún el contrato futuro completo de materialización por intento: hay rotaciones deterministas, una mutación global de bancos para equilibrar posiciones y semillas basadas parcialmente en tiempo.
- El catálogo canónico paralelo separa mejor procedencia, contenido, disponibilidad y estado de publicación, pero todavía no alimenta el runtime.
- La autoridad documental futura debe seguir esta cadena:

`FUENTE OFICIAL → ENUNCIADO CANÓNICO → CLASIFICACIÓN TEMA/BLOQUE → MODALIDAD`

y nunca:

`BANCO HISTÓRICO → PUBLICACIÓN`

## 2. Archivos y componentes inspeccionados

Componentes principales del runtime:

- `app.js`: selector de comunidad, portada de 2.º Bachillerato, temas, bloques, retos, disponibilidad y no repetición general.
- `bach-exam.js`: composición de exámenes, bancos por comunidad, selección por tema/bloque, opciones, corrección, solución e historial de examen.
- `index.html`: orden de carga de bancos, normalizaciones, disponibilidad, renderizador y runtime.
- `data/content-availability.js`: elegibilidad histórica por modalidad.
- `data/madrid-pau-bank.js` y `data/madrid-pau-authored.js`: recopilación histórica de Madrid y contenido autorado asociado.
- `data/mates-ii-blocks.js`, `data/ccss-ii-blocks.js` y bancos de respuestas/completitud: material histórico de Castilla-La Mancha.
- `data/bach-ii-answer-option-balance.js`: redistribución de posiciones correctas en bancos existentes.
- `math-renderer.js`: representación matemática pública actual; inspeccionado como dependencia, no modificado.

Capa canónica paralela contrastada:

- `catalog/pau-canonical/` y contratos `catalog/v2/`.
- Artefactos e informes de reconciliación documental PAU.
- Integración paralela de Andalucía, incluida CCSS II 2012.
- Estados de validación Equation.3 y reconstrucción documental `ABCABC`.

## 3. Modalidades visibles y correspondencia interna

| Modalidad visible | Identificador interno | Materia | Comunidad pública | Usa tema | Usa bloque | N.º actual | Tipo de respuesta actual | Solución actual | Banco/fuente actual |
|---|---|---|---|---:|---:|---:|---|---|---|
| Estudiar temas y hacer retos | `renderBachTopics` → `startTopic` → `buildTopicQuestions`; disponibilidad `topicPractice` | Matemáticas II | CLM/Madrid | Sí | Indirectamente para localizar el tema | 5 | CLM principalmente elección múltiple; Madrid abierta o múltiple según completitud | Tras corrección; texto/HTML y, en ciertos Madrid, soporte oficial | CLM: bancos de bloques/clasificados/completos; Madrid: `MADRID_PAU_BANK` + autorado |
| Estudiar temas y hacer retos | Igual | CCSS II | CLM/Madrid | Sí | Indirectamente | **4** | Igual, con prácticas didácticas y apoyos cruzados en algunos temas CLM | Tras corrección | CLM: bancos CCSS clasificados/completos y apoyos; Madrid: banco histórico + autorado |
| Estudiar por bloques y hacer retos | `renderBachBlocks` → `startBachBlockChallenge`; disponibilidad interna `examByBlocks` | Matemáticas II | CLM/Madrid | Agrupa temas | Sí | 5 | CLM múltiple cuando está completo; Madrid abierta o múltiple | Tras corrección | Bancos agrupados por bloque de la comunidad seleccionada |
| Estudiar por bloques y hacer retos | Igual; `examByBlocks` es solo ID histórico | CCSS II | CLM/Madrid | Agrupa temas | Sí | **4** | Igual | Tras corrección | Bancos CCSS agrupados por bloque; Madrid histórico/autorado |
| Hacer examen | `startBachExam` / módulo `MargaritaBachExam` | Matemáticas II | CLM/Madrid | No como filtro directo | Sí, mediante 5 ranuras de composición | 5 | CLM: cuatro opciones por apartado; Madrid: abierta si no hay autorado completo, múltiple si lo hay | Resolución tras contestar; en Madrid puede incluir evidencia/imagen oficial | Bancos corregidos/completos y composición por ranuras |
| Hacer examen | Igual | CCSS II | CLM/Madrid | No como filtro directo | Sí, mediante 4 ranuras actuales | **4** | Igual | Igual | Bancos corregidos/completos y composición por ranuras |

### 3.1 Textos visibles confirmados

La portada construida por `renderBachIIHome()` usa:

- **Estudiar temas y hacer retos**: “Accede a las infografías y a los retos PAU organizados por cada tema del curso.”
- **Estudiar por bloques y hacer retos**: “Repasa los contenidos agrupados por bloques PAU, con N ejercicios por reto.”
- **Hacer examen**: “Realiza N ejercicios elegidos de los bancos corregidos y consulta después su resolución completa.”

`N` es 5 para Matemáticas II y 4 para CCSS II en el código actual.

### 3.2 Ausencia de Entrenador IA

No se ha encontrado una modalidad funcional `ai-trainer`, Entrenador IA o equivalente en los archivos del runtime de 2.º Bachillerato inspeccionados. No debe incorporarse al contrato funcional futuro.

## 4. Taxonomía real del runtime

### 4.1 Matemáticas II

| Bloque real | ID | Temas reales (índice: nombre) |
|---|---|---|
| Bloque de álgebra | `algebra` | 0 Matrices; 1 Determinantes; 2 Sistemas con determinantes |
| Bloque de análisis | `analisis` | 6 Límite de sucesiones y funciones; 7 Continuidad; 8 Derivadas; 9 Aplicación de derivadas; 10 Integrales indefinidas; 11 Integrales definidas |
| Bloque de geometría | `geometria` | 3 Vectores en el espacio; 4 Planos y rectas en el espacio; 5 Propiedades métricas |
| Bloque de probabilidad y estadística | `probabilidad-estadistica` | 12 Probabilidad; 13 Distribución binomial y normal |

La estructura real no separa Probabilidad y Estadística en dos bloques para Matemáticas II: ambas forman un único bloque.

### 4.2 Matemáticas Aplicadas a las CCSS II

| Bloque real | ID | Temas reales (índice: nombre) |
|---|---|---|
| Bloque de álgebra | `algebra` | 0 Matrices; 1 Determinantes; 2 Sistemas con determinantes; 3 Programación lineal |
| Bloque de análisis | `analisis` | 4 Límites y continuidad; 5 Derivadas y aplicaciones; 6 Integrales indefinidas; 7 Integrales definidas |
| Bloque de probabilidad | `probabilidad` | 8 Probabilidad |
| Bloque de estadística | `estadistica` | 9 Distribución binomial y normal; 10 Muestreo e inferencia estadística |

### 4.3 Reglas de clasificación futura

- `community`, `subject`, `block` y `topic` son dimensiones independientes.
- La taxonomía anterior es la taxonomía funcional de destino; no debe alterar el literal oficial.
- Cada ejercicio conserva identidad completa y `subparts[]`.
- Un ejercicio puede tener `primaryTopic`, temas secundarios y clasificación por apartado.
- Un ejercicio con apartados de temas distintos no debe dividirse artificialmente solo para clasificarlo.
- Los ejercicios mixtos deben poder recuperarse por las modalidades compatibles sin perder la unidad documental.

## 5. Funcionamiento real de Estudiar temas y hacer retos

### Selección actual

1. Se toma materia y comunidad del estado del alumno.
2. Se localiza el tema y su bloque.
3. Para Madrid se filtran registros históricos por `topicIndexes`; si existe autorado completo se prepara elección múltiple y, en caso contrario, respuesta abierta.
4. Para Castilla-La Mancha se combinan bancos clasificados, ejercicios completos y apoyos didácticos específicos.
5. Se deduplican identidades y se aplica selección sin repetición.

### Contradicciones y excepciones

- En CCSS II CLM, ciertos temas reutilizan material de Matemáticas II como práctica cruzada. Aunque está rotulado como apoyo, contradice la exigencia futura de separación estricta de materias si se usa como ejercicio PAU de CCSS II.
- Madrid queda autorizado por `questionAvailableForMode()` sin pasar por todas las reglas de disponibilidad. La comunidad se respeta, pero la elegibilidad por modalidad no queda certificada con el mismo criterio que CLM.
- El número de CCSS II es 4, no 5.

### Requisito futuro

La consulta mínima debe ser:

`subject + community + topic + topicChallengeAvailability`

y devolver 5 ejercicios compatibles, sin mezcla de materia/comunidad y sin repetir hasta agotar el conjunto compatible.

## 6. Funcionamiento real de Estudiar por bloques y hacer retos

### Selección actual

- El alumno elige un bloque visible.
- El runtime expande los temas asociados y crea un reto.
- La disponibilidad usa el identificador histórico `examByBlocks`.
- Matemáticas II solicita 5 ejercicios; CCSS II solicita 4.
- Madrid usa registros históricos agrupados por `blockId`; CLM usa bancos y clasificación de bloques.
- La interfaz posterior es la de reto/práctica, no la de examen.

### Confirmación funcional

Esta modalidad es **Estudiar por bloques y hacer retos**. No se debe crear ni mostrar “Examen por bloques”. En una fase futura puede mantenerse el ID interno por compatibilidad, documentando la correspondencia conceptual:

`examByBlocks` → `block-challenge`

### Requisito futuro

La consulta mínima debe ser:

`subject + community + block + blockChallengeAvailability`

Debe generar 5 ejercicios por reto en ambas materias, mantener el ejercicio completo y aplicar las reglas de no repetición del ámbito del bloque.

## 7. Funcionamiento real de Hacer examen

### Composición actual

Matemáticas II crea cinco ranuras:

1. Álgebra.
2. Límites, continuidad y derivadas.
3. Integrales.
4. Geometría.
5. Probabilidad y estadística.

CCSS II crea cuatro ranuras:

1. Matrices.
2. Sistemas y programación lineal.
3. Análisis.
4. Probabilidad o estadística.

La selección usa una semilla de sesión y un historial por alumno, curso, comunidad y ranura. Cuando se agota una ranura, se reinicia su ciclo procurando no repetir inmediatamente el último ejercicio si hay alternativa.

### Respuesta y solución actuales

- CLM exige ejercicio completo, apartados con cuatro opciones únicas, índice correcto y solución.
- Madrid puede preparar una pregunta PAU abierta cuando no existe autorado completo; el flujo abierto no muestra A/B/C/D.
- En elección múltiple, cada apartado se corrige mediante su índice `correct` y después se muestra la solución.
- En el flujo abierto de Madrid, el sistema permite revelar la solución, pero no equivale a autocorrección matemática de una respuesta libre.

### Requisito futuro

El examen debe usar exactamente:

`subject + community + examAvailability + compositionSlot`

y exigir validez matemática, no repetición, solución pedagógica completa y la estructura de cinco ejercicios definida para el producto. No puede mezclar comunidades ni materias.

## 8. Selector de comunidad actual y aislamiento

### Estado actual

- Valores públicos: `clm`, `madrid`.
- Valor por defecto: `clm`.
- Preferencia persistente por curso/año/grupo/alumno.
- El cambio de comunidad reinicia bloque, historial visible y cachés relacionadas.
- La comunidad participa en la clave de historial de retos y exámenes.
- `bachPauRawBanks()` y `rawBanks()` eligen fuentes diferentes según comunidad.

### Castilla-La Mancha

- Se alimenta de bancos históricos de Matemáticas II y CCSS II, parches, clasificaciones y respuestas completas.
- Necesita conciliación futura contra fuentes oficiales para que el literal canónico y su segmentación no dependan de la transcripción histórica.

### Madrid

- El runtime usa `MADRID_PAU_BANK` y `MADRID_PAU_AUTHORED` históricos.
- Estos archivos deben conservarse como evidencia y trazabilidad, incluidos sus `sourceRecordId`.
- No son autoridad documental automática.
- Cuando exista correspondencia demostrada, el enunciado futuro debe ser el reconciliado con el PDF oficial.
- `NOT_FOUND`, `AMBIGUOUS` y `HUMAN_REVIEW_REQUIRED` no pueden promocionarse automáticamente.

### Andalucía

- No existe actualmente en `BACH_II_PAU_COMMUNITIES` ni en la bifurcación de bancos del runtime.
- Existe una capa canónica paralela oficial de 1.666 ejercicios: 826 Matemáticas II y 840 CCSS II.
- Incluye 48 ejercicios CCSS II 2012, 104 subapartados, 55/55 objetos Equation.3 validados y `ABCABC` validado.
- Esos 48 conservan `ANSWER_REVIEW_REQUIRED` y `SOLUTION_REVIEW_REQUIRED`; publicados: 0.
- Andalucía debe alimentarse exclusivamente del corpus institucional verificado, nunca de recopilaciones privadas para completar huecos.

### Requisito común

El selector futuro debe producir una consulta estricta por `community`, no una simple etiqueta. El contrato debe aceptar al menos CLM, Madrid y Andalucía y ser extensible mediante configuración, sin bifurcaciones ad hoc en cada modo.

## 9. Autoridad documental y procedencia

### Regla obligatoria

Para Madrid y Andalucía:

`fuente oficial → enunciado canónico → taxonomía funcional → elegibilidad de modalidad`

La taxonomía es metadato funcional y no puede reescribir el literal oficial.

### Metadatos mínimos por ejercicio

- Comunidad.
- Materia.
- Año, solo si está acreditado.
- Convocatoria, solo si está acreditada.
- Modelo, variante o rol, cuando conste.
- Número oficial de pregunta/ejercicio.
- Alternativa.
- `subparts[]` y ámbito de cada apartado.
- Documento oficial, organismo y URL institucional.
- Página o rango.
- SHA-256 del documento y de la evidencia derivada.
- Identidad documental y procedencia histórica.
- Todos los `sourceRecordId` relacionados.
- Estado de conciliación documental.
- `scoreEvidence` separado del contenido mostrado al alumno.

### Datos actuales y carencias

| Ámbito | Disponible hoy | Falta antes de publicar |
|---|---|---|
| CLM | Comunidad, materia, bloques/temas, referencias históricas, bancos y respuestas parciales | Conciliación oficial completa, procedencia homogénea y certificación de respuestas/soluciones |
| Madrid | Banco histórico, autorado, metadatos parciales y biblioteca oficial/reconciliación paralela | Sustituir como autoridad el literal histórico por el oficial reconciliado; cerrar casos no encontrados/ambiguos/revisión |
| Andalucía | Corpus oficial canónico, trazabilidad documental, comunidad/materia/año acreditado y estados de revisión | Clasificación funcional completa, respuestas/soluciones/distractores validados y conexión controlada al runtime |

## 10. Respuestas, soluciones y criterios oficiales

### Respuesta

Una modalidad con autocorrección solo puede usar un ejercicio/apartado con respuesta:

- inequívoca;
- vinculada al ejercicio y apartado correctos;
- matemáticamente verificada;
- validada en signos, unidades, dominio, condiciones, aproximaciones y equivalencias.

En caso contrario debe permanecer `ANSWER_REVIEW_REQUIRED` y solo ser elegible para una entrega compatible que no finja autocorrección.

### Solución

La solución completa debe partir de los datos, explicar el método, mostrar cálculos, justificar transformaciones, resolver todos los apartados y terminar con el resultado. Un resultado final aislado no es una solución pedagógica suficiente.

Los criterios oficiales PAU son evidencia de contraste. No deben promoverse automáticamente a respuesta o solución pedagógica. Si no hay desarrollo suficiente, corresponde `SOLUTION_REVIEW_REQUIRED`.

### Independencia de auditorías

Que el enunciado sea oficial/reconciliado no valida automáticamente la respuesta ni la solución histórica. Ambas requieren linaje y revisión independientes.

## 11. Elección múltiple, distractores y A/B/C/D

### Funcionamiento actual

- Varios bancos almacenan directamente `options[]` y un índice `correct`.
- `rotateExamPart()` rota opciones y ajusta el índice correcto.
- `data/bach-ii-answer-option-balance.js` muta bancos cargados y distribuye posiciones según el orden de enumeración.
- En rutas de compatibilidad, `withPauTestOptions()` puede construir presentación tipo test.
- La semilla de examen incorpora tiempo (`Date.now()`), por lo que el intento generado puede conservarse una vez creado, pero la generación no parte todavía de un identificador de intento canónico estable.

### Incompatibilidades con el contrato futuro

- La posición A/B/C/D sigue demasiado ligada al banco o al orden de carga.
- No existe una garantía única y auditable de equilibrio por sesión/alumno.
- La creación de opciones de compatibilidad no demuestra por sí sola que los distractores sean matemáticamente no equivalentes.

### Requisito

- Respuesta matemática correcta separada de la posición.
- Distractores validados y trazables.
- Materialización A/B/C/D solo al crear una sesión `multiple-choice`.
- Barajado determinista mediante semilla de intento estable.
- Reproducción exacta del mismo intento.
- Distribución razonablemente equilibrada de posiciones.
- Si faltan distractores válidos, el ejercicio sigue disponible solo para modalidades abiertas compatibles.

## 12. No repetición

### Retos por tema y bloque

- Historial en `margarita-challenge-answer-history-v2`.
- Ámbito formado por alumno, curso, comunidad y clave de tema o bloque.
- Deduplicación mediante identidad del ejercicio y alias oficiales.
- Se seleccionan no vistos hasta agotar el conjunto compatible.
- Al agotarse, se reinicia el ciclo.
- Un ejercicio se marca como visto al renderizarse; cerrar la pantalla sin responder también consume esa aparición.

### Examen

- Historial separado en `margarita-bach-ii-exam-history-v1`.
- Ámbito por alumno, curso, comunidad y ranura de composición.
- Selección determinista dentro del conjunto mezclado.
- Reinicio al agotarse, evitando repetir de inmediato el último cuando el banco lo permite.

### Requisito futuro

La identidad canónica debe gobernar la no repetición. El ámbito mínimo es:

`student + subject + community + mode + topicOrBlockOrExamSlot`

Debe documentarse expresamente la política de “mostrado” frente a “respondido” y mantener compatibilidad con el historial previo durante la transición.

## 13. Disponibilidad por modalidad real

El contrato futuro debe registrar independientemente:

- `topic-challenge` → Estudiar temas y hacer retos.
- `block-challenge` → Estudiar por bloques y hacer retos.
- `exam` → Hacer examen.
- `open-response` cuando sea compatible.
- `multiple-choice` cuando respuesta y distractores estén validados.

No existe ni debe añadirse `ai-trainer`.

Una disponibilidad no implica las demás. Ejemplo: un ejercicio oficial con enunciado válido y sin respuesta verificada puede alimentar estudio abierto, pero no autocorrección ni examen con solución completa.

## 14. Comparación runtime actual ↔ catálogo canónico ↔ requisito

| Área | Runtime actual | Catálogo canónico paralelo | Requisito / brecha |
|---|---|---|---|
| Comunidades | CLM y Madrid | CLM, Madrid y Andalucía | Añadir Andalucía mediante configuración y filtros estrictos; no publicar aún |
| Materias | IDs separados | Materias separadas | Eliminar apoyos cruzados como fuente PAU de otra materia |
| Temas/bloques | Taxonomía funcional existente | Taxonomía parcial/normalizada | Mapear el ejercicio oficial sin alterar su literal; clasificar subpartes |
| Autoridad de Madrid | Banco histórico en runtime | Reconciliación oficial paralela | El oficial reconciliado debe prevalecer; conservar históricos como linaje |
| Autoridad de Andalucía | No existe runtime | Corpus institucional de 1.666 | Clasificar y habilitar solo tras superar estados de revisión |
| Autoridad de CLM | Históricos operativos | Evidencia/reconciliación parcial | Completar conciliación documental oficial |
| Número por reto | Math II 5; CCSS II 4 | No publicado | Objetivo común 5 |
| Número por examen | Math II 5; CCSS II 4 | No publicado | Objetivo común 5 y composición definida |
| Bloques | ID interno `examByBlocks` | Elegibilidad conceptual | Mantener compatibilidad, nombre visible siempre reto por bloques |
| Respuesta abierta | Disponible principalmente en Madrid | Modelo de entrega separado en v2 | Definir elegibilidad sin fingir autocorrección |
| Elección múltiple | Opciones e índice en bancos/partes | Contratos separados de respuesta/entrega | Materializar por intento con distractores validados |
| Soluciones | Texto/HTML/imagen según fuente | Entidad separada y estados | Exigir solución pedagógica completa para examen |
| No repetición | Implementada con historiales runtime | Identidades estables | Migrar a identidad canónica y conservar historial/alcance |
| Publicación | Bancos legacy conectados | Andalucía `NOT_PUBLISHED` | Puerta de publicación explícita por modalidad |

## 15. Métricas obligatorias antes de conectar el catálogo

Por cada combinación `community × subject` deben producirse:

- ejercicios totales;
- ejercicios por bloque y tema;
- ejercicios mixtos;
- aptos para `topic-challenge`;
- aptos para `block-challenge`;
- aptos para `exam`;
- aptos para respuesta abierta;
- aptos para elección múltiple;
- con respuesta validada;
- con solución completa validada;
- con distractores validados;
- pendientes de respuesta, solución o distractores;
- pendientes de revisión matemática, visual o documental.

Estas métricas deben derivarse de estados auditables; no de la mera presencia de campos.

## 16. Cambios necesarios antes de conectar el catálogo

Orden recomendado:

1. **Congelar autoridad documental:** seleccionar siempre el enunciado oficial reconciliado de Madrid y Andalucía; completar conciliación CLM.
2. **Cerrar mapeo taxonómico:** mapear cada ejercicio/subapartado oficial a materia, bloque, tema principal y secundarios de la taxonomía real.
3. **Unificar disponibilidad:** traducir IDs históricos (`topicPractice`, `examByBlocks`, `exam`) a modalidades reales sin renombrar prematuramente el runtime.
4. **Certificar aislamiento:** pruebas exhaustivas de cero mezcla comunidad/materia en cada modalidad.
5. **Auditar respuestas y soluciones:** cerrar estados por ejercicio y apartado; no promover criterios oficiales automáticamente.
6. **Auditar distractores:** equivalencia matemática, unicidad y plausibilidad; separar respuesta de posición.
7. **Definir sesión reproducible:** semilla estable, materialización A/B/C/D y registro del intento.
8. **Alinear cantidades:** resolver la contradicción CCSS II 4 frente al requisito de 5 y definir cinco ranuras válidas.
9. **Migrar no repetición:** usar identidad canónica sin perder historial o trazabilidad.
10. **Preproducción aislada:** ejecutar las tres modalidades con el mismo motor/CSS final, métricas y rollback.
11. **Publicación gradual:** habilitar por comunidad, materia y modalidad únicamente los ejercicios que superen todas sus puertas.

## 17. Riesgos

- Mezclar comunidades por bifurcaciones incompletas o valores por defecto.
- Confundir el ID `examByBlocks` con una modalidad visible inexistente.
- Publicar enunciados históricos de Madrid cuando existe literal oficial reconciliado.
- Convertir criterios oficiales en soluciones pedagógicas sin desarrollo suficiente.
- Promover ejercicios abiertos a autocorrección sin respuesta verificable.
- Reutilizar material de Matemáticas II como ejercicio PAU de CCSS II.
- Perder identidad de un ejercicio completo al clasificar apartados por temas.
- Repetir ejercicios por alias/documentos duplicados aunque cambie su ID local.
- Alterar la posición correcta por orden de carga en vez de por semilla de intento.
- Considerar el número de campos presentes como prueba de calidad.
- Conectar Andalucía antes de cerrar sus 48 respuestas y soluciones pendientes de 2012.

## 18. Criterios funcionales de aceptación previos a publicación

1. Cero ejercicios de comunidad o materia incorrecta en pruebas exhaustivas.
2. Taxonomía completa y trazable para todos los ejercicios publicables.
3. Fuente oficial reconciliada como autoridad del enunciado.
4. Cinco ejercicios por reto/examen conforme al producto aprobado.
5. Bloques presentados solo como retos por bloques.
6. Respuesta verificada por apartado para cualquier autocorrección.
7. Solución pedagógica completa para cualquier ejercicio de examen.
8. Distractores validados antes de habilitar elección múltiple.
9. A/B/C/D materializadas por intento con semilla reproducible.
10. No repetición hasta agotar el banco compatible.
11. Ningún Entrenador IA en 2.º Bachillerato.
12. Métricas y rollback por comunidad, materia y modalidad.

## 19. Estado preservado de Andalucía

Esta auditoría no modifica la integración paralela existente:

- Total Andalucía: **1.666**.
- Matemáticas II: **826**.
- CCSS II: **840**.
- CCSS II 2012: **48**.
- Subapartados 2012: **104**.
- Equation.3: **55/55 validados**.
- Reconstrucción `ABCABC`: validada.
- `ANSWER_REVIEW_REQUIRED`: **48**.
- `SOLUTION_REVIEW_REQUIRED`: **48**.
- Publicados: **0**.

## 20. Resultado de esta ejecución

### Archivos creados

- `docs/AUDITORIA-RUNTIME-Y-REQUISITOS-FUNCIONALES-2BACH-PAU-MATHUP.md`

### Archivos existentes modificados

- Ninguno.

### Pruebas ejecutadas

- Comprobación sintáctica de `app.js` con el Node.js aislado disponible en el entorno de Codex: correcta.
- Comprobación sintáctica de `bach-exam.js`: correcta.
- Comprobación sintáctica de `data/content-availability.js`: correcta.
- Comprobación sintáctica de `data/bach-ii-answer-option-balance.js`: correcta.
- Inspección estática de selector, bancos, taxonomía, disponibilidad, composición, opciones, soluciones y no repetición.

No se ejecutaron flujos que escriban artefactos, no se inició la aplicación pública y no se alteró ningún banco o estado de producción.

### `git diff --stat` exacto

Sin salida. Todos los cambios pendientes son archivos sin seguimiento, que `git diff --stat` no contabiliza.

### `git status` exacto

```text
On branch agent/indice-pruebas-y-autenticacion
Your branch is up to date with 'origin/agent/indice-pruebas-y-autenticacion'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	artifacts/pau-canonical-andalucia-ccssii-2012-integration/
	catalog/pau-canonical/mathup.pau-canonical-doc-exercise.v1.schema.json
	docs/AUDITORIA-RUNTIME-Y-REQUISITOS-FUNCIONALES-2BACH-PAU-MATHUP.md
	docs/INTEGRACION-CANONICA-ANDALUCIA-CCSSII-2012-MATHUP.md
	scripts/integrate-pau-canonical-andalucia-ccssii-2012.ps1
	scripts/trial-rollback-pau-canonical-andalucia-ccssii-2012-integration.ps1
	scripts/verify-pau-canonical-andalucia-ccssii-2012-integration.ps1
	tests/pau-canonical-andalucia-ccssii-2012-integration.test.ps1

nothing added to commit but untracked files present (use "git add" to track)
```

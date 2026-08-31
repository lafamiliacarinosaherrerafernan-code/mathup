# Plan de reconciliación documental y corrección de segmentación PAU de +MathUp

**Estado:** plan técnico; no implementado.  
**Fecha de referencia:** 25 de agosto de 2026.  
**Ámbito:** Matemáticas II y Matemáticas Aplicadas a las CCSS II, con cobertura de Castilla-La Mancha, Madrid, procedencia todavía no verificable y futuras comunidades.  
**Condición de partida:** la revisión visual humana permanece detenida y no se registra ningún dictamen humano hasta reconstruir y certificar la unidad documental correcta de cada ejercicio.

## 1. Objetivo y principio rector

Esta fase debe construir, de forma paralela y reversible, una cadena de evidencia completa:

```text
documento oficial
  -> estructura editorial del examen
    -> pregunta / alternativa independiente
      -> ejercicio
        -> apartados ordenados
          -> respuesta del mismo ámbito
          -> solución del mismo ámbito
```

El PDF oficial es la única fuente de verdad para literalidad, límites del ejercicio, orden, numeración, apartados, fórmulas, tablas y figuras. Los bancos, parches, reparaciones históricas, artefactos v1/v2 y normalizaciones posteriores son evidencias derivadas que deben reconciliarse contra esa fuente, nunca sustituirla por orden de carga ni por similitud textual.

La fase no corrige todavía contenido, no modifica bancos ni contratos y no publica nada. Su resultado será un plan de correspondencias y transformaciones demostradas, con los casos ambiguos separados para revisión humana documental.

## 2. Línea base y magnitudes que deben conservarse

La auditoría de segmentación localizó **3.491 representaciones PAU v2**:

- Matemáticas II: 2.011;
- CCSS II: 1.480.

Esta cifra no equivale al número de ejercicios oficiales únicos. Debe mantenerse separada de la línea base de Fase 2 de 3.281 candidatos PAU y de cualquier recuento posterior de unidades documentales oficiales.

Las incidencias actuales, no excluyentes, son:

| Señal | Cantidad | Tratamiento en esta fase |
|---|---:|---|
| `EXAM_INSTRUCTION_ATTACHED` | 25 | Separar instrucción editorial solo tras prueba documental. |
| `DUPLICATED_HEADER` | 359 | Comparar rangos y literal oficial; no deduplicar por texto solamente. |
| `MULTIPLE_EXERCISES_MERGED` | 9 | Reconstruir alternativas independientes y redirecciones uno-a-varios. |
| `SUBPART_STRUCTURE_ERROR` | 882 | Restaurar apartados, orden y ámbito de respuesta/solución. |
| `SOURCE_TEXT_CORRUPTION` | 1 | Mantener aislado hasta cotejo literal con fuente. |
| `MATH_NOTATION_CORRUPTION` | 496 | Registrar; la reparación matemática se difiere hasta después de segmentar. |
| `SEGMENTATION_OK` provisional | 2.581 | Candidato a conciliación, no certificación. |
| `DOCUMENT_REVIEW_REQUIRED` | 3.491 | Estado obligatorio mientras falte documento, página y evidencia verificable. |

Las categorías se solapan. Por ello ninguna suma parcial puede utilizarse como número de ejercicios únicos ni como previsión de correcciones.

## 3. Fuentes protegidas y reglas de lectura

La futura implementación leerá sin modificar:

1. documentos oficiales PAU localizados;
2. bancos JavaScript principales e históricos;
3. parches, ampliaciones y reparaciones de runtime;
4. inventario inmutable y `sourceRecordId` de Fase 0/Fase 2;
5. candidatos v1;
6. ejercicios, respuestas, soluciones y redirecciones v2;
7. decisiones y trazabilidad de Fase 2B;
8. literales y estructuras derivadas de Fase 2C;
9. la auditoría de segmentación PAU y sus artefactos.

Se aplican, sin modificar la skill `skill-editor-enunciados`, sus reglas obligatorias:

- transcripción literal y conservación de numeración, orden y apartados;
- el PDF original prevalece frente a OCR, bancos o reparaciones no contrastadas;
- una instrucción como «elija una» no es el enunciado matemático;
- alternativas 4.1/4.2, 5.1/5.2, A/B u otra nomenclatura equivalente son ejercicios independientes cuando así lo establece el documento;
- un patrón `a,b,a,b` no puede aceptarse como cuatro apartados de un solo ejercicio sin prueba documental;
- matrices, fracciones, sistemas, vectores y demás notación se reconstruyen desde la estructura visual oficial, no desde texto OCR aplanado.

## 4. Arquitectura paralela propuesta

### 4.1 Canalización

La implementación futura se dividirá en nueve pasos inmutables:

1. **Censo documental:** registrar y hashear todos los PDF oficiales.
2. **Segmentación editorial:** representar instrucciones, bloques, preguntas, alternativas, ejercicios y apartados sin mezclarlos.
3. **Identidad documental:** asignar identificadores estables derivados de la fuente oficial.
4. **Inventario heredado:** enumerar cada representación actual y su trazabilidad Fase 0/v1/v2.
5. **Generación de candidatos de correspondencia:** producir coincidencias documentales posibles sin aprobarlas.
6. **Clasificación de evidencia:** `EXACT`, `STRUCTURAL`, `AMBIGUOUS`, `NOT_FOUND` o `HUMAN_REVIEW_REQUIRED`.
7. **Plan de reconciliación:** establecer ejercicio, apartados, respuesta, solución y redirecciones únicamente para coincidencias demostradas.
8. **Conciliación cuantitativa:** probar que ninguna fuente ni identidad desaparece.
9. **Doble ejecución, orden invertido y rollback:** demostrar reproducibilidad y aislamiento.

Cada etapa genera artefactos nuevos y nunca sobrescribe los de Fase 2B/2C.

### 4.2 Contratos acompañantes previstos

Se recomiendan contratos nuevos, independientes de los contratos existentes:

- `mathup.pau-document.v1`;
- `mathup.pau-exam-structure.v1`;
- `mathup.pau-document-exercise.v1`;
- `mathup.pau-document-subpart.v1`;
- `mathup.pau-reconciliation-decision.v1`;
- `mathup.pau-segmentation-redirect.v1`.

No sustituyen `mathup.exercise.v2`, `mathup.answer.v1`, `mathup.solution.v1` ni `mathup.identity-redirect.v1`. Funcionan como evidencia documental acompañante y como entrada de una migración posterior expresamente autorizada.

## 5. Registro inmutable de documentos oficiales

Cada PDF tendrá un registro con, como mínimo:

| Campo | Regla |
|---|---|
| `documentId` | Derivado del SHA-256 del archivo, no del nombre. |
| `documentHash` | SHA-256 byte a byte. |
| `subject` | `Matemáticas II` o `CCSS II`, solo con evidencia. |
| `community` | Valor acreditado; `null` si no se puede demostrar. |
| `year` | Año acreditado; `null` si falta. |
| `sitting` | Convocatoria literal normalizada mediante tabla explícita; `null` si falta. |
| `sourcePath` | Ruta relativa o localizador estable del archivo leído. |
| `sourceFileName` | Nombre literal del archivo. |
| `pageCount` | Número real de páginas. |
| `exercisePageRanges` | Páginas y, cuando proceda, regiones por ejercicio. |
| `registryVersion` | Versión del contrato y del extractor. |
| `evidence` | Método y campos que acreditan materia, comunidad, año y convocatoria. |
| `reviewStatus` | `VERIFIED`, `PARTIAL`, `AMBIGUOUS` o `NOT_VERIFIED`. |

Un nombre de archivo, una carpeta, el año de un banco o una semejanza textual no bastan por sí solos para completar metadatos. Todo desconocido permanece `null` acompañado de su motivo. El registro conserva también tamaño, fecha técnica solo informativa y hash de cualquier extracción textual o imagen de página utilizada en la revisión.

Los 132 PDF ya localizados son el punto inicial del censo, no una afirmación de cobertura total ni una correspondencia automática con las 3.491 representaciones.

## 6. Modelo editorial del examen

### 6.1 Jerarquía

El modelo debe distinguir expresamente:

```text
exam
  generalInstructions[]
  blocks[]
    blockInstructions[]
    questions[]
      questionInstructions[]
      alternatives[]
        exercise
          statementBlocks[]
          subparts[]
```

- Una instrucción general o de elección queda fuera de `statementBlocks`.
- Una pregunta puede contener una o varias alternativas independientes.
- Cada alternativa puede contener un ejercicio con uno o varios apartados.
- Los apartados conservan etiqueta literal, etiqueta normalizada, orden y rangos documentales.
- Las figuras, tablas y anexos se enlazan por página/región y hash; no se fabrican recursos ausentes.

### 6.2 Regla 4.1/4.2 y nomenclaturas variables

Cuando el documento ofrece 4.1 y 4.2 como alternativas, se crean dos ejercicios independientes. Cada uno conserva sus `a)`, `b)` u otros apartados. La instrucción «conteste una» se conserva como metadato editorial de la pregunta.

La gramática no codificará que todas las comunidades usan 4.1/4.2. Admitirá patrones configurados y auditados por documento: `A/B`, `opción 1/opción 2`, numeración continua u otras formas futuras. Una regla comunitaria solo se activa si el documento o una tabla de configuración versionada la demuestra.

### 6.3 Rangos probatorios

Cada nodo estructural guardará:

- `documentId` y `documentHash`;
- página inicial/final;
- región o localizador cuando exista;
- literal oficial;
- hash del literal/representación extraída;
- método de obtención;
- estado de revisión.

La estructura no se certifica por el resultado visual final, sino por la correspondencia con esos rangos.

## 7. Identidad estable

### 7.1 Ejercicio documental

La clave semántica obligatoria será:

```text
documentHash + subject + questionKey + alternativeKey
```

Se serializará mediante JSON canónico con versión de algoritmo y se derivará un UUID v5 o identificador de hash estable. `questionKey` y `alternativeKey` son claves documentales, no títulos ni textos normalizados. Cuando no exista alternativa, se usa un valor explícito `NONE`, no se inventa una letra.

La comunidad, el año o la convocatoria no forman por sí solos la identidad: son metadatos de procedencia y pueden estar ausentes. El hash del documento impide colisiones entre convocatorias o versiones distintas.

### 7.2 Apartados

Cada apartado tendrá identidad derivada de:

```text
documentExerciseId + normalizedSubpartLabel
```

La etiqueta literal se conserva por separado. Una etiqueta repetida dentro del mismo ejercicio invalida la segmentación automática. Un ejercicio sin apartados tiene un ámbito explícito `WHOLE_EXERCISE`; no se crea un apartado ficticio `a`.

### 7.3 Estabilidad e invariancia

- El orden de lectura de archivos no cambia identidades.
- Renombrar o mover un PDF idéntico no cambia `documentId`.
- Cambiar los bytes del PDF crea una revisión documental distinta y exige reconciliación.
- La normalización tipográfica no interviene en la clave.
- Toda versión del algoritmo queda registrada.

## 8. Correspondencia con el catálogo existente

Para cada ejercicio documental se generará una matriz de correspondencias con:

- banco principal y posición/ruta;
- banco histórico;
- parche o ampliación;
- reparación de runtime;
- todos sus `sourceRecordId` e `immutableHash`;
- candidato v1 y su hash;
- ejercicio v2 y revisión;
- respuestas v2;
- soluciones v2;
- decisiones de normalización Fase 2C;
- identidades visuales dependientes, solo para invalidarlas y reconstruirlas después.

### 8.1 Precedencia determinista

La selección no depende del orden de carga. Se aplica una comparación lexicográfica de evidencia:

1. correspondencia exacta con PDF, página, región y estructura;
2. literal completo y estructura de apartados demostrados;
3. ámbito exacto de respuesta/solución;
4. conservación íntegra de notación, tablas y figuras;
5. trazabilidad completa a `sourceRecordId` y hashes;
6. estado de revisión explícito;
7. identificador estable como último desempate técnico.

Una reparación histórica estructurada puede prevalecer como representación candidata sobre un banco fusionado únicamente después de demostrar su fidelidad al PDF. Ambos originales permanecen en el libro de evidencias y se conectan mediante la decisión de reconciliación. Ninguna fuente desaparece por quedar eclipsada.

### 8.2 Prohibición de inferencia por similitud

La coincidencia textual o matemática aproximada solo genera un candidato. No autoriza unión, separación, respuesta, solución, comunidad ni procedencia. El cotejo automático debe usar claves documentales, rangos, hashes y estructura compatible.

## 9. Respuestas y soluciones por ámbito

Cada vínculo debe declarar un `scope`:

- `WHOLE_EXERCISE`; o
- un `documentSubpartId` concreto.

Para aceptar automáticamente un vínculo deben coincidir documento, pregunta, alternativa y apartado. También deben ser compatibles los `sourceRecordId`, hashes y orden. Se rechazan:

- una respuesta concatenada de 4.1 y 4.2;
- una solución con pasos de alternativas distintas;
- una respuesta de `b)` enlazada a `a)`;
- una solución compuesta cuyo corte no pueda demostrarse;
- varias soluciones incompatibles para el mismo ámbito.

La separación física de una respuesta o solución concatenada solo se planifica si existen delimitadores inequívocos y cada fragmento puede contrastarse con evidencia exacta. De lo contrario, se conserva el registro compuesto como evidencia histórica y cada nuevo ámbito queda `HUMAN_REVIEW_REQUIRED` o `AMBIGUOUS`.

## 10. Redirecciones y conservación de historia

La reconciliación futura generará redirecciones auditables:

- identidad fusionada -> varios ejercicios documentales (`SPLIT`);
- identidad histórica correcta -> identidad documental (`ALIAS` o `ONE_TO_ONE`);
- candidato v1 -> ejercicio documental/v2 futuro;
- ejercicio v2 actual -> uno o varios ejercicios posteriores;
- respuesta/solución compuesta -> ámbitos de destino, solo si la separación está demostrada;
- identidad sin resolución -> `REVIEW_REQUIRED`, sin destino inventado.

Cada redirección incluirá identidad anterior, destinos, razón, hashes, documento/páginas, regla aplicada, versión del algoritmo y estado de revisión. Nunca se elimina la evidencia antigua.

## 11. Niveles de conciliación

| Nivel | Criterio demostrable | Acción permitida |
|---|---|---|
| `DOCUMENT_MATCH_EXACT` | Mismo documento hasheado, pregunta/alternativa, rango, literal y estructura; ámbito de respuesta/solución exacto. | Proponer reconciliación automática auditable. |
| `DOCUMENT_MATCH_STRUCTURAL` | Documento y rango inequívocos; diferencias cerradas de envoltura o formato sin alterar tokens ni estructura matemática. | Proponer transformación reversible; requiere reglas versionadas y pruebas de ida/vuelta. |
| `AMBIGUOUS` | Más de un destino, corte o ámbito posible; discrepancia sustantiva. | No transformar; revisión humana documental. |
| `NOT_FOUND` | No se localiza fuente oficial o correspondencia suficiente tras búsqueda reproducible. | Mantener registro y motivo; no certificar PAU. |
| `HUMAN_REVIEW_REQUIRED` | La decisión exige leer visualmente el PDF o juzgar estructura/literalidad no demostrable por reglas. | Cola humana con evidencia preparada; sin aprobación automática. |

`SEGMENTATION_OK` no es un nivel de conciliación. Solo significa ausencia de una señal automática conocida.

## 12. Automatización y revisión humana

### 12.1 Situación actual

Hoy, **0 de 3.491 (0 %) pueden recibir certificación documental automática**, porque ninguna representación v2 conserva vínculo verificable de documento, página y hash.

Los **2.581 casos `SEGMENTATION_OK` provisional (73,93 %)** forman el máximo inicial de casos sin señal estructural conocida que podrían resolverse mediante `DOCUMENT_MATCH_EXACT` o `DOCUMENT_MATCH_STRUCTURAL` después de crear el registro documental. Es una bolsa potencial, no una previsión ni una cuota.

Los **910 casos con señal estructural (26,07 %)** requieren reconstrucción o comprobación de límites. Algunos podrán automatizarse si el PDF y una fuente estructurada coinciden exactamente; no se presupone cuántos.

Los **399 casos con comunidad no verificable (11,43 %)** no recibirán comunidad por inferencia. Pueden resolverse automáticamente solo si una fuente documental hasheada acredita el dato.

### 12.2 Tareas automatizables con seguridad

- cálculo de hashes y censo de PDF;
- extracción de número de páginas y localizadores;
- generación de candidatos por metadatos ya acreditados;
- comparación literal exacta normalizada de forma reversible;
- comparación de estructura de etiquetas y orden;
- detección de instrucciones y patrones `a,b,a,b`;
- validación de ámbitos de respuesta/solución;
- generación de identidades, redirecciones propuestas y métricas;
- doble ejecución, orden invertido y rollback.

### 12.3 Tareas humanas documentales

- confirmar una comunidad, convocatoria o año no acreditados;
- decidir límites cuando el diseño de página es ambiguo;
- reconstruir matemáticas desde imagen cuando el texto extraído pierde estructura;
- resolver diferencias entre PDF, banco, parche y reparación;
- separar respuestas/soluciones sin delimitadores inequívocos;
- certificar figuras, tablas o anexos;
- resolver `AMBIGUOUS` y fuentes no localizadas.

La implementación no fijará un porcentaje mínimo automático. Tras el primer censo deberá informar cuántos casos cumplen realmente cada nivel y el trabajo humano restante por materia, comunidad, año, convocatoria y tipo de incidencia.

## 13. Tratamiento de las incidencias conocidas

### 13.1 Instrucciones adjuntas (25)

Se identificará el rango exacto de la instrucción y se conservará en el nodo editorial. Solo se retirará del futuro enunciado si el documento demuestra que no pertenece al ejercicio. Se guardarán literal anterior, literal oficial, corte y hashes.

### 13.2 Cabeceras duplicadas (359)

Se distinguirá duplicación real, repetición legítima y cabecera común de bloque. La deduplicación automática exige igualdad de rango/estructura y prueba de ida/vuelta; de otro modo queda en revisión.

### 13.3 Ejercicios fusionados (9)

Se crearán tantas unidades documentales como alternativas oficiales y una redirección `SPLIT`. Las respuestas y soluciones no se reparten si el ámbito de cada fragmento no está demostrado.

### 13.4 Errores de apartados (882)

Se reconstruyen etiquetas, orden y alcance desde el documento. La fuente estructurada existente puede apoyar la correspondencia, pero no sustituye al PDF. Etiquetas repetidas o faltantes bloquean la automatización.

### 13.5 Corrupción textual (1) y notación (496)

Primero se fija la unidad documental correcta. Después se registra la diferencia entre literal histórico y oficial. La reparación matemática se ejecutará en una fase posterior, mediante Fase 2C reejecutada sobre el contenido ya segmentado.

### 13.6 OK provisional (2.581)

Se concilian igualmente contra documento. Ninguno se aprueba por ausencia de alertas.

### 13.7 Revisión documental completa (3.491)

Cada representación termina con uno de los niveles del apartado 11 y con documento/página/hash, o con motivo exacto de ausencia. Ninguna puede desaparecer del denominador.

## 14. Preservación de estructura matemática

Cuando el PDF permita una recuperación inequívoca, la decisión registrará:

- literal histórico completo;
- literal oficial completo;
- representación visual o región oficial;
- transformación exacta y versión de regla;
- tokens/rangos conservados;
- página y hash del documento;
- hashes antes/después;
- prueba de reversibilidad;
- necesidad de revisión matemática, textual o visual.

La fase no implementa aún esas reparaciones. No completa símbolos, signos, límites, índices, matrices, vectores, unidades ni pasos de solución por contexto. Si hay más de una lectura matemática, la decisión es `HUMAN_REVIEW_REQUIRED`.

## 15. Cobertura por materia, comunidad y convocatoria

La conciliación se ejecutará separadamente para:

- Matemáticas II;
- CCSS II;
- Castilla-La Mancha;
- Madrid;
- comunidad no verificable;
- cualquier comunidad futura acreditada;
- cada año;
- cada convocatoria literal y su forma normalizada.

No se asumirá que las reglas de Castilla-La Mancha sirven para Madrid ni para otra comunidad. Cada configuración editorial tendrá versión, vigencia y documentos de ejemplo. Los casos sin comunidad permanecen en una partición explícita hasta que exista evidencia.

## 16. Métricas cuantitativas obligatorias

El informe de ejecución deberá contener:

1. PDF localizados, hasheados, verificados, parciales y no identificados.
2. Páginas totales y páginas vinculadas a ejercicios.
3. Unidades documentales por materia, comunidad, año y convocatoria.
4. Preguntas, alternativas, ejercicios y apartados por separado.
5. Representaciones actuales conciliadas por nivel.
6. `sourceRecordId` conservados, vinculados, auxiliares y no resueltos.
7. Candidatos v1 y ejercicios v2 enlazados, divididos, fusionados o pendientes.
8. Respuestas y soluciones por ámbito: exactas, estructurales, ambiguas, conflicto y no encontradas.
9. Redirecciones `ONE_TO_ONE`, `SPLIT`, `ALIAS` y `REVIEW_REQUIRED`.
10. Incidencias antes/después, sin ocultar solapamientos.
11. Trabajo automático real y revisión humana restante.
12. Cobertura documental: porcentaje con documento, página, rango y hash.
13. Reproducibilidad, invariancia al orden y rollback.

Las cifras se conciliarán tanto por representación v2 (3.491) como por unidad documental oficial resultante. Nunca se mezclarán denominadores.

## 17. Criterio de aceptación del caso 1

El caso visual `vent-421552a489e688ce586b07f0c1870560` solo se considera documentalmente resuelto si se demuestra:

1. vínculo al PDF oficial `26_exjun.pdf` mediante SHA-256;
2. materia Matemáticas II, Castilla-La Mancha, junio de 2026, acreditadas;
3. páginas/regiones exactas;
4. instrucción «conteste solo una de 4.1 o 4.2» almacenada fuera del enunciado;
5. dos ejercicios independientes, 4.1 y 4.2;
6. 4.1 con sus apartados `a` y `b` en orden;
7. 4.2 con sus apartados `a` y `b` en orden;
8. cada apartado enlazado únicamente a su respuesta y solución;
9. ausencia de un patrón fusionado `a,b,a,b` en una identidad;
10. conservación del banco fusionado y de los cuatro `sourceRecordId` de respuesta/solución como evidencia histórica;
11. reconocimiento de las reparaciones históricas separadas de `data/mates-ii-runtime-fixes.js`, contrastadas con el PDF;
12. redirección `SPLIT` desde `ex-25662a75-7e5e-5935-903f-0d41aa138462` hacia las dos identidades documentales;
13. redirecciones/relaciones de los identificadores históricos y v1/v2 sin pérdida;
14. respuestas y soluciones compuestas no promocionadas hasta demostrar sus cortes;
15. hashes y rollback completos.

Solo después se regeneran las entidades matemáticas/visuales. La corrección tipográfica previa de un P0 no certifica esta segmentación.

## 18. Pruebas obligatorias de la futura implementación

### 18.1 Contratos y registro documental

- validación de todos los contratos acompañantes;
- unicidad de `documentId` por hash;
- estabilidad tras mover/renombrar un PDF idéntico;
- rechazo de metadatos inferidos sin evidencia;
- recuento y hash de las 132 fuentes iniciales, ampliable sin alterar identidades previas.

### 18.2 Segmentación

- instrucciones nunca incluidas en `statement`;
- alternativas independientes nunca comparten identidad;
- `a,b,a,b` rechazado;
- etiquetas de apartado únicas y ordenadas;
- soporte probado de Castilla-La Mancha, Madrid y configuración futura sin asumir nomenclatura;
- figuras/tablas conservadas con localizador o marcadas ausentes.

### 18.3 Ámbito de respuestas y soluciones

- coincidencia obligatoria de documento/pregunta/alternativa/apartado;
- rechazo de contenido concatenado entre alternativas;
- rechazo de respuestas o soluciones conflictivas;
- conservación literal, de orden y de hashes;
- cero respuestas o soluciones inventadas.

### 18.4 Trazabilidad y conciliación

- 3.491/3.491 representaciones con decisión;
- ningún `sourceRecordId` perdido;
- correspondencia completa banco/histórico/parche/runtime/v1/v2;
- toda redirección con evidencia y versión;
- reglas de precedencia independientes del orden de carga;
- totales separados por materia, comunidad, año y convocatoria.

### 18.5 Reproducibilidad y rollback

- dos ejecuciones idénticas producen los mismos artefactos semánticos y hashes;
- invertir el orden de documentos y fuentes no altera identidades ni decisiones;
- rollback elimina solo la capa nueva y deja intactos Fase 2B, 2C y producción;
- hashes protegidos coinciden antes/después.

### 18.6 Regresión y aislamiento

- todas las pruebas de fases anteriores continúan pasando;
- cero cambios en bancos, `data/`, aplicación, Supabase, renderizadores, contratos o skills;
- cero conexiones al runtime público;
- cero decisiones humanas visuales registradas durante esta fase.

## 19. Criterios de cierre

La fase solo podrá cerrarse cuando:

1. todos los PDF disponibles estén censados o exista motivo de exclusión;
2. las 3.491 representaciones tengan nivel de conciliación y motivo;
3. toda conciliación automática tenga documento, página/rango, hash y prueba reversible;
4. cada unidad oficial conserve estructura editorial y matemática;
5. no haya instrucciones dentro de enunciados reconciliados;
6. no haya alternativas independientes bajo el mismo `exerciseId` documental;
7. cada apartado tenga respuesta/solución del mismo ámbito o ausencia explícita;
8. todos los `sourceRecordId`, candidatos e identidades históricas estén conservados;
9. los nueve fusionados tengan plan de redirección o estado humano explícito;
10. el caso 1 supere íntegramente el apartado 17;
11. los 399 casos de comunidad no verificable sigan sin inferencias o queden acreditados;
12. las métricas cuadren por ambos denominadores;
13. doble corrida, orden invertido, regresión y rollback sean satisfactorios;
14. producción siga intacta y la revisión visual continúe detenida.

## 20. Orden de trabajo posterior

El orden obligatorio es:

1. implementar censo documental y contratos acompañantes;
2. segmentar y conciliar documentalmente;
3. revisar humanamente solo los casos que no puedan resolverse por evidencia exacta;
4. generar una nueva capa canónica segmentada, previa autorización;
5. volver a ejecutar Fase 2C sobre las unidades correctas;
6. reconstruir la herramienta de revisión por ejercicio completo y apartados coherentes;
7. realizar prueba aislada y, posteriormente, prueba de preproducción con el runtime final;
8. solo entonces reanudar la auditoría visual humana.

Normalizar o revisar visualmente antes de corregir la segmentación certificaría unidades pedagógicas incorrectas.

## 21. Archivos previstos para una implementación futura

La implementación se mantendría en rutas nuevas, por ejemplo:

### 21.1 Contratos y biblioteca

- `catalog/pau-documentary/mathup.pau-document.v1.schema.json`
- `catalog/pau-documentary/mathup.pau-exam-structure.v1.schema.json`
- `catalog/pau-documentary/mathup.pau-document-exercise.v1.schema.json`
- `catalog/pau-documentary/mathup.pau-document-subpart.v1.schema.json`
- `catalog/pau-documentary/mathup.pau-reconciliation-decision.v1.schema.json`
- `catalog/pau-documentary/mathup.pau-segmentation-redirect.v1.schema.json`
- `catalog/pau-documentary/pau-document-identities.mjs`
- `catalog/pau-documentary/reconcile-pau-documentary-evidence.mjs`

### 21.2 Configuración, ejecución y pruebas

- `catalog/pau-documentary/editorial-patterns/*.json`
- `scripts/pau-build-document-registry.mjs`
- `scripts/pau-extract-exam-structure.mjs`
- `scripts/pau-reconcile-segmentation.mjs`
- `scripts/pau-verify-reproducibility.mjs`
- `scripts/pau-rollback-trial.mjs`
- `tests/pau-document-contracts.test.mjs`
- `tests/pau-segmentation.test.mjs`
- `tests/pau-answer-solution-scope.test.mjs`
- `tests/pau-reconciliation-traceability.test.mjs`
- `tests/pau-reproducibility.test.mjs`

### 21.3 Artefactos e informe

- `artifacts/pau-documentary-reconciliation/<run-id>/...`
- un futuro informe de ejecución y sus colas de revisión.

No se prevé modificar archivos existentes durante la implementación paralela. Los bancos, parches, contratos v1/v2, artefactos de Fase 2B/2C, aplicación y skill se mantendrán como entradas protegidas de solo lectura. Cualquier migración posterior a v2 requerirá autorización separada.

## 22. Riesgos y mitigaciones

| Riesgo | Consecuencia | Mitigación |
|---|---|---|
| Confundir representación v2 con ejercicio oficial | Recuentos y cortes falsos | Mantener denominadores y claves documentales separados. |
| Confiar en nombre de archivo u OCR | Metadatos o literal inventados | Hash, página, región y evidencia explícita. |
| Aplicar reglas de una comunidad a otra | Segmentación incorrecta | Patrones versionados por evidencia documental. |
| Deduplicar por similitud | Pérdida de alternativas legítimas | Similitud solo genera candidatos; nunca decide. |
| Priorizar por orden de carga | Reparaciones correctas eclipsadas | Precedencia lexicográfica por fidelidad documental. |
| Separar respuesta/solución sin ámbito | Contenido matemático asignado al ejercicio equivocado | Clave completa y revisión ante cualquier ambigüedad. |
| Reparar notación antes de segmentar | Corrección aplicada a unidad errónea | Segmentación primero; Fase 2C después. |
| Borrar historia al dividir identidades | Trazabilidad y rollback imposibles | Redirecciones y libro de evidencias inmutable. |
| Declarar OK por ausencia de alertas | Falso certificado documental | Las 3.491 siguen en revisión hasta prueba documental. |
| Forzar una cuota automática | Inferencias no autorizadas | Cierre por evidencia, no por porcentaje. |
| Inflar artefactos | Repositorio inmanejable | Persistir manifiestos, hashes y evidencia esencial; hacer regenerable lo derivado. |
| Reanudar visual demasiado pronto | Dictámenes sobre ejercicios mal construidos | Condición de cierre y secuencia obligatoria. |

## 23. Condiciones de detención

La implementación futura se detendrá y solicitará decisión cuando:

- no exista PDF oficial verificable;
- haya dos documentos posibles para la misma representación;
- el límite entre alternativas o apartados admita más de una lectura;
- la notación visual no pueda reconstruirse inequívocamente;
- una respuesta o solución pueda corresponder a más de un ámbito;
- fuente oficial y reparación histórica entren en conflicto;
- se proponga inferir comunidad, año, convocatoria o nomenclatura;
- una transformación exija modificar bancos, contratos, skill o producción;
- no pueda garantizarse trazabilidad, reproducibilidad o rollback.

## 24. Resultado esperado

La futura fase entregará una conciliación documental completa y verificable, no ejercicios publicados. Permitirá conocer qué unidades oficiales existen realmente, cómo se relacionan con todo el trabajo histórico de +MathUp y qué impide resolver cada caso pendiente. Solo tras esa reconciliación será legítimo volver a normalizar matemáticas y someter al alumno o a una persona revisora una representación visual coherente del ejercicio completo.

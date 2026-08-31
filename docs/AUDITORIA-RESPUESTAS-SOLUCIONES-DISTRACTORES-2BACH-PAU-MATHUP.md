# Auditoría de respuestas, soluciones y distractores de 2.º Bachillerato PAU en +MathUp

Fecha: 2026-08-25  
Modalidad: lectura, sin generación ni modificación de contenido  
Estado: diagnóstico previo a cualquier validación matemática, producción o publicación

## 1. Objeto y criterio de autoridad

Esta auditoría separa expresamente tres objetos que no deben confundirse:

1. **Enunciado oficial/reconciliado**: literal y estructura documental del ejercicio.
2. **Respuesta matemática**: resultado correcto, con su ámbito exacto de ejercicio o apartado.
3. **Solución pedagógica**: desarrollo completo, ordenado y compatible con una respuesta validada.

La validación documental del enunciado no valida automáticamente la respuesta ni la solución. La regla de autoridad utilizada para 2.º de Bachillerato es:

`FUENTE OFICIAL → ENUNCIADO CANÓNICO → CLASIFICACIÓN TEMA/BLOQUE → MODALIDAD`

Nunca se ha aplicado la regla `BANCO HISTÓRICO → PUBLICACIÓN`.

- **Madrid**: el banco histórico se conserva como evidencia y trazabilidad. Cuando existe conciliación demostrada, prevalece el documento oficial. Los estados `NOT_FOUND`, `AMBIGUOUS` y `HUMAN_REVIEW_REQUIRED` no se promocionan.
- **Andalucía**: se usa exclusivamente el corpus institucional construido. Los 1.666 ejercicios permanecen en la capa canónica paralela.
- **Castilla-La Mancha**: se conserva el material oficial e histórico localizado, pero todavía no existe una biblioteca oficial normalizada equivalente a Madrid/Andalucía que permita certificar de forma homogénea toda la colección.

## 2. Método y fuentes examinadas

Se han contrastado, sin modificarlos:

- catálogo canónico PAU de Andalucía y Madrid;
- integración paralela de Andalucía CCSS II 2012;
- registros v2 de ejercicios, respuestas, soluciones y distractores de Fase 2B;
- reconciliación documental de 3.491 representaciones PAU;
- bancos históricos, autorados, parches y runtime fixes;
- criterios oficiales andaluces y sus relaciones documentales;
- informes de segmentación, recuperación y cobertura documental;
- `bach-exam.js`, `app.js`, `data/bach-ii-answer-option-balance.js` y archivos PAU relacionados.

La unidad pretendida es el ejercicio canónico oficial y, cuando procede, cada elemento de `subparts[]`. Sin embargo, los artefactos actuales no tienen todavía una tabla ejercicio/apartado ↔ respuesta/solución oficial homogénea para las seis combinaciones comunidad × materia. Por eso el informe distingue:

- **ejercicios canónicos oficiales**;
- **representaciones históricas reconciliadas**;
- **material de respuesta/solución localizado**;
- **material matemáticamente verificado**.

No se suman como si fueran la misma unidad.

## 3. Vocabulario de estados aplicado

### 3.1 Respuestas

- `ANSWER_OFFICIAL_VERIFIED`: respuesta oficial vinculada inequívocamente al ejercicio/apartado y verificada.
- `ANSWER_HISTORICAL_VERIFIED`: respuesta histórica vinculada y matemáticamente comprobada.
- `ANSWER_CONFLICT`: candidatas incompatibles.
- `ANSWER_INCOMPLETE`: falta algún apartado, condición, unidad o precisión necesaria.
- `ANSWER_NOT_FOUND`: no se localiza candidata trazable.
- `ANSWER_REVIEW_REQUIRED`: existe material, pero la equivalencia matemática o su ámbito no están certificados.

### 3.2 Soluciones

- `SOLUTION_COMPLETE_VERIFIED`: desarrollo completo, correcto y vinculado a todos los apartados.
- `SOLUTION_PARTIAL`: resultado final o explicación insuficiente.
- `OFFICIAL_CRITERIA_ONLY`: criterio oficial útil como contraste, no solución pedagógica.
- `SOLUTION_CONFLICT`: desarrollos incompatibles.
- `SOLUTION_NOT_FOUND`: no se localiza candidata.
- `SOLUTION_REVIEW_REQUIRED`: existe material pendiente de revisión matemática o de ámbito.

### 3.3 Distractores

- `DISTRACTORS_VALID`
- `DISTRACTORS_DUPLICATED`
- `DISTRACTORS_EQUIVALENT`
- `DISTRACTORS_IMPLAUSIBLE`
- `DISTRACTORS_INCOMPLETE`
- `DISTRACTORS_NOT_FOUND`
- `DISTRACTORS_REVIEW_REQUIRED`

Un registro marcado `RECOVERED_UNIQUE` en Fase 2B demuestra una unión inequívoca entre fuentes, no la corrección matemática de su contenido. Por ello se mantiene como revisión requerida.

## 4. Universos auditados y advertencia sobre unidades

| Comunidad | Materia | Universo oficial/canónico disponible | Subapartados | Representaciones históricas v2 relacionadas | Observación |
|---|---|---:|---:|---:|---|
| Castilla-La Mancha | Matemáticas II | No consolidado en una capa oficial independiente | No determinable de forma homogénea | 1.021 | Colección histórica/documental parcial; 508 con posible corrupción de fuente |
| Castilla-La Mancha | CCSS II | No consolidado en una capa oficial independiente | No determinable de forma homogénea | 384 | 374 con posible corrupción de fuente y fuerte contaminación editorial |
| Madrid | Matemáticas II | 352 segmentos oficiales | 673 | 795 | Antes de publicar se necesita validar el rol documental; algunos segmentos proceden de documentos de corrección |
| Madrid | CCSS II | 465 segmentos oficiales | 280 | 892 | Misma cautela de rol documental |
| Andalucía | Matemáticas II | 826 ejercicios canónicos | 833 | No aplicable como universo principal | Corpus institucional paralelo |
| Andalucía | CCSS II | 840 ejercicios canónicos | 1.881 | No aplicable como universo principal | Incluye 48 ejercicios y 104 apartados de 2012 |

No existe una cifra global legítima de “ejercicios PAU únicos” sumando las dos columnas: las representaciones históricas pueden ser alias, duplicados o casos no conciliados de los ejercicios documentales.

## 5. Matriz comunidad × materia

La tabla siguiente es deliberadamente conservadora. “Verificada” significa verificación a nivel del ejercicio/apartado, no mera existencia de texto. `N/D` significa que el artefacto actual no permite calcular el dato sin inventar una correspondencia.

| Comunidad · materia | Canónicos/representaciones auditables | Subparts | Respuesta oficial verificada | Respuesta histórica localizada | Respuesta verificada | Respuesta pendiente | Respuesta ausente | Criterio oficial | Solución completa verificada | Solución parcial/localizada | Sin solución localizada | Cuatro opciones canónicas | Distractores válidos | Distractores pendientes | Abierta lista | MC lista | Examen listo | Bloqueados hoy |
|---|---:|---:|---:|---:|---:|---:|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| CLM · Matemáticas II | 1.021 representaciones v2 | N/D | 0 | 1.003 | 0 | 1.003 | 18 | Cobertura oficial parcial, sin vínculo homogéneo por apartado | 0 | 1.003 pendientes | 18 | 0 canónicas | 0 verificadas | 1.021 | 0 | 0 | 0 | 1.021 |
| CLM · CCSS II | 384 representaciones v2 | N/D | 0 | 148 | 0 | 148 | 236 | Cobertura oficial parcial, sin vínculo homogéneo por apartado | 0 | 148 pendientes | 236 | 0 canónicas | 0 verificadas | 384 | 0 | 0 | 0 | 384 |
| Madrid · Matemáticas II | 352 segmentos oficiales | 673 | 0 | 0 vinculadas directamente a esta capa | 0 | 352 | N/D | Existen fuentes oficiales, pero no respuesta/criterio enlazado por ejercicio en los artefactos auditados | 0 | N/D | N/D | 0 canónicas | 0 verificadas | 352 | 0 | 0 | 0 | 352 |
| Madrid · CCSS II | 465 segmentos oficiales | 280 | 0 | 0 vinculadas directamente a esta capa | 0 | 465 | N/D | Igual que Matemáticas II | 0 | N/D | N/D | 0 canónicas | 0 verificadas | 465 | 0 | 0 | 0 | 465 |
| Andalucía · Matemáticas II | 826 | 833 | 0 | 0 promovidas | 0 | 826 | N/D | Parte de 184 relaciones oficiales de criterio, solo a nivel de documento/examen | 0 | 0 promovidas | N/D | 0 | 0 | 826 | 0 | 0 | 0 | 826 |
| Andalucía · CCSS II | 840 | 1.881 | 0 | 0 promovidas | 0 | 840 | N/D | Incluye criterios oficiales; no están enlazados de forma inequívoca a ejercicio/apartado | 0 | 0 promovidas | N/D | 0 | 0 | 840 | 0 | 0 | 0 | 840 |

### Interpretación de la matriz

- Los ceros de “verificada” no significan necesariamente que todas las respuestas sean falsas o inexistentes; significan que no hay certificación matemática individual en los artefactos actuales.
- Los `N/D` evitan confundir “no enlazado” con “no existe”.
- Ninguna de las seis filas cumple aún simultáneamente respuesta verificada, solución pedagógica completa y, para multiple-choice, distractores validados.
- “Bloqueados hoy” se refiere a publicación/autocorrección bajo el contrato estricto solicitado, no a pérdida del ejercicio ni a imposibilidad futura de recuperarlo.

## 6. Respuestas localizadas y calidad de vinculación

Los registros v2 contienen 4.649 respuestas globales. Para el subconjunto PAU identificable se localizaron:

| Materia · procedencia | Respuestas localizadas | Estado de procedencia | Estado matemático |
|---|---:|---|---|
| Matemáticas II · CLM | 1.003 | `RECOVERED_UNIQUE` | `ANSWER_REVIEW_REQUIRED` |
| Matemáticas II · comunidad no acreditada | 73 | `RECOVERED_UNIQUE` | `ANSWER_REVIEW_REQUIRED` |
| CCSS II · CLM | 148 | `RECOVERED_UNIQUE` | `ANSWER_REVIEW_REQUIRED` |
| CCSS II · comunidad no acreditada | 1 | `RECOVERED_UNIQUE` | `ANSWER_REVIEW_REQUIRED` |
| CCSS II · comunidad no acreditada | 55 | `OBSERVED` | `ANSWER_REVIEW_REQUIRED` |

No se reasignan los 129 registros de comunidad no acreditada a CLM, Madrid o Andalucía por similitud. No se encontraron respuestas v2 directamente enlazadas a la capa oficial de Madrid ni a los ejercicios canónicos andaluces.

La auditoría previa de recuperación PAU sobre 3.226 candidatos encontró 1.225 `UNIQUE_MATCH`, 12 `POSSIBLE_MATCH`, 19 `CONFLICT` y 1.970 `NOT_FOUND`. Estas cifras son diagnóstico histórico, no estados finales del universo oficial actual. Los 1.225 `UNIQUE_MATCH` tampoco pueden ascender sin validación matemática.

## 7. Soluciones: existencia no equivale a suficiencia

Los 4.649 registros de solución de Fase 2B preservan contenido histórico y trazabilidad. En el subconjunto PAU, su distribución de procedencia reproduce la de las respuestas anteriores, pero sus marcas de revisión impiden considerarlos `SOLUTION_COMPLETE_VERIFIED`.

Problemas observados:

- soluciones que son solo el resultado final;
- desarrollos serializados o heredados pendientes de revisión;
- ausencia de prueba de que resuelvan todos los apartados;
- falta de comparación con una respuesta matemática verificada;
- criterios oficiales relacionados con el examen completo, no con el ejercicio/apartado;
- posibles conflictos de identidad o segmentación en material histórico.

Resultado estricto:

- `SOLUTION_COMPLETE_VERIFIED`: **0 certificadas** en las seis combinaciones;
- el material histórico localizado permanece `SOLUTION_REVIEW_REQUIRED` o, cuando solo hay una pauta oficial, `OFFICIAL_CRITERIA_ONLY`;
- no es posible calcular honestamente `SOLUTION_NOT_FOUND` para Madrid/Andalucía hasta terminar la vinculación por ejercicio/apartado.

## 8. Andalucía CCSS II 2012

Los 48 ejercicios y 104 subapartados permanecen exactamente como se ordenó:

- 48 `ANSWER_REVIEW_REQUIRED`;
- 48 `SOLUTION_REVIEW_REQUIRED`;
- 0 respuestas promovidas;
- 0 soluciones pedagógicas promovidas;
- 0 distractores generados;
- 0 ejercicios publicados.

Los seis pares examen–criterio están acreditados documentalmente, pero el ámbito actual de las relaciones es el documento de examen. En el catálogo andaluz hay 184 relaciones con criterios oficiales y **0 vínculos de ámbito de ejercicio**. Por tanto, los seis criterios de 2012 pueden ayudar a contrastar resultados, métodos o puntuaciones, pero no permiten promover automáticamente ninguno de los 48 ejercicios.

Trabajo necesario antes de cualquier promoción:

1. segmentar cada criterio por ejercicio y apartado;
2. demostrar la correspondencia exacta con el examen;
3. distinguir resultado, pauta de corrección y desarrollo;
4. comprobar matemáticamente todos los apartados;
5. mantener `OFFICIAL_CRITERIA_ONLY` cuando el criterio no sea una solución pedagógica completa.

## 9. Calidad y disponibilidad de distractores

Fase 2B conserva 3.423 conjuntos de distractores globales como evidencia legacy. En el subconjunto PAU identificable solo aparecen 55 conjuntos, todos de CCSS II con comunidad no acreditada y estado de revisión obligatorio.

| Ámbito | Conjuntos localizados | Comunidad acreditada | Estado válido certificado |
|---|---:|---:|---:|
| PAU identificable | 55 | 0 | 0 |

No se ha demostrado para esos 55 conjuntos:

- equivalencia con la respuesta matemática correcta verificada;
- ausencia de duplicados matemáticos;
- plausibilidad respecto del enunciado oficial;
- ámbito correcto de ejercicio/apartado;
- estabilidad de la identidad al materializar una sesión.

Por ello se clasifican como `DISTRACTORS_REVIEW_REQUIRED`. Para el resto del catálogo canónico PAU, `DISTRACTORS_NOT_FOUND` desde la perspectiva canónica. La existencia de `options[]` en un banco público no se considera evidencia canónica suficiente.

## 10. Dependencia actual de posiciones A/B/C/D

### 10.1 `rotateExamPart()`

`bach-exam.js` exige cuatro opciones distintas, un índice `correct` válido y una solución. Después rota `options[]` y ajusta el índice. Evita perder la respuesta al rotar, pero el origen continúa almacenando la corrección como posición.

Aspectos positivos:

- mantiene coherencia entre opción e índice tras la rotación;
- usa una rotación determinista dentro del examen ya materializado.

Limitación:

- la respuesta matemática no está separada de la posición del banco;
- la validez matemática de los distractores se presupone.

### 10.2 `bach-ii-answer-option-balance.js`

Este script recorre bancos ya cargados, fija como objetivo `posición global % 4`, rota opciones y muta `correct`. El resultado es determinista solo para el conjunto y orden de carga actuales.

Riesgos:

- mutación global del banco;
- sensibilidad al orden de enumeración/carga;
- equilibrio por colección, no por identidad de ejercicio e intento;
- mezcla persistente entre respuesta correcta y posición.

### 10.3 `withPauTestOptions()`

La ruta de compatibilidad en `app.js` construye opciones y soluciones de test y usa `correct: 0`. En otras rutas se aplica una rotación posterior, pero el objeto fuente sigue naciendo con la correcta en A.

La función sintetiza contenido de presentación; no demuestra que esas opciones sean oficiales, no equivalentes y adecuadas al ejercicio canónico. No debe alimentar una certificación futura.

### 10.4 Otros casos

Se localizaron numerosos objetos PAU/modelo y runtime fixes con `options[]` y `correct: 0`. Este patrón confirma sesgo de almacenamiento hacia A, aunque algunas rutas lo oculten mediante rotación posterior. No se atribuye un número canónico porque gran parte corresponde a material modelo, parches o bancos no reconciliados.

### 10.5 Contrato futuro recomendado

El modelo correcto ya está representado en la capa paralela v2:

1. respuesta matemática independiente;
2. conjunto de distractores versionado y validado;
3. plantilla de entrega;
4. materialización por intento;
5. posición A/B/C/D derivada mediante semilla estable del intento.

Un mismo intento debe reproducirse exactamente y otro puede ubicar la correcta en cualquier posición. El catálogo no debe almacenar “A” como significado matemático.

## 11. Elegibilidad potencial por modalidad

| Modalidad | Condiciones mínimas | Situación actual |
|---|---|---|
| Respuesta abierta | Enunciado oficial publicable y respuesta verificada; solución completa si se promete resolución | 0 ejercicios certificados con todas las condiciones |
| Multiple-choice | Condiciones anteriores + cuatro opciones válidas, no duplicadas/equivalentes y posición materializada por intento | 0 ejercicios certificados |
| Examen con autocorrección | Respuesta verificada, composición compatible, historial/no repetición y solución completa; distractores válidos si es test | 0 ejercicios certificados |
| Consulta con revelado de solución | Enunciado publicable y solución pedagógica completa verificada | 0 ejercicios certificados |

Esto no impide conservar ni revisar el contenido. Impide declararlo listo sin evidencia suficiente.

## 12. Segmentación, bloques y temas que condicionan la auditoría

La calidad de respuesta/solución depende de que el ámbito documental sea correcto.

### Castilla-La Mancha

| Materia | Representaciones | Segmentación provisional sin alerta | Fusiones detectadas | Contaminación de instrucciones | Posible corrupción de fuente |
|---|---:|---:|---:|---:|---:|
| Matemáticas II | 1.021 | 508 | 11 | 145 | 508 |
| CCSS II | 384 | 10 | 5 | 200 | 374 |

Estas incidencias impiden certificar respuestas por simple coincidencia textual: una respuesta puede pertenecer a otra alternativa, apartado o ejercicio fusionado.

### Madrid

La reconciliación de 1.728 registros históricos produjo 49 correspondencias estructurales, 9 ambiguas, 1.364 no encontradas y 306 de revisión humana. Ninguna exacta. Además, algunos segmentos de la capa oficial contienen texto de criterios de corrección; se necesita una puerta de rol documental antes de tratarlos como ejercicio publicable.

### Andalucía

La estructura oficial es la más completa, pero las 184 relaciones de criterio son a nivel de documento. La clasificación temática no puede utilizarse para asumir una respuesta; solo sirve como metadato funcional una vez fijado el ejercicio oficial.

## 13. Cobertura oficial y carencias

### Madrid

- Biblioteca oficial local y reconciliación disponibles.
- Enunciados oficiales/estructurales disponibles para parte del corpus.
- Falta vincular respuesta, criterio y solución al ejercicio/apartado y cerrar el rol documental de cada registro.

### Andalucía

- Corpus institucional canónico de 1.666 ejercicios.
- 184 criterios oficiales relacionados a documentos.
- Falta segmentar criterios por ejercicio/apartado y realizar validación matemática independiente.

### Castilla-La Mancha

- Se localizaron aproximadamente 80 PDF oficiales de Matemáticas II y 51 de CCSS II en los conjuntos documentales históricos; uno de los conjuntos requiere depuración por mezcla de procedencias.
- No existe aún una estructura normalizada `sources/pau-official/castilla-la-mancha/` ni un censo/reconciliación equivalente a Madrid y Andalucía.
- Antes de una auditoría equivalente se necesita censar hashes, materia, año, convocatoria, documento, página, pregunta, alternativa y apartado; después enlazar respuestas/soluciones históricas sin inferir.
- No se descargó ninguna fuente nueva.

## 14. Grupos prioritarios de resolución

La clasificación solicitada solo puede asignarse con certeza cuando la relación es ejercicio/apartado-específica.

| Grupo | Definición | Conteo actualmente demostrable |
|---|---|---:|
| 1 | Respuesta y solución oficial disponibles y verificadas | 0 |
| 2 | Respuesta oficial + solución histórica verificable | 0 |
| 3 | Criterio oficial + solución histórica | 0 certificados; existen 184 relaciones andaluzas a nivel de documento que deben segmentarse |
| 4 | Solo respuesta histórica | 1.151 candidatos CLM (1.003 Matemáticas II + 148 CCSS II), aún no verificados |
| 5 | Sin respuesta ni solución localizada | 254 representaciones CLM (18 Matemáticas II + 236 CCSS II) |

Además hay 129 respuestas/soluciones de comunidad no acreditada que no se asignan a ningún grupo comunitario. Madrid y Andalucía quedan en “vinculación/revisión pendiente”: clasificarlos como grupo 5 sería confundir falta de enlace con inexistencia.

## 15. Conflictos y revisión humana

Casos que requieren revisión humana o matemática:

- 19 conflictos PAU encontrados en Fase 2A;
- 12 coincidencias posibles no demostrables;
- respuestas recuperadas sin verificación matemática;
- criterios oficiales sin ámbito de ejercicio/apartado;
- segmentos fusionados o contaminados;
- soluciones parciales o de resultado final;
- distractores potencialmente equivalentes;
- registros con comunidad no acreditada;
- diferencias de transcripción/notación en Madrid;
- documentos CLM no normalizados y posibles mezclas de procedencia.

No se eligió ninguna candidata conflictiva.

## 16. Volumen real de generación posterior

No puede calcularse todavía una cifra legítima de contenido que “deba generarse”. Antes hay que agotar la recuperación y validación de contenido existente. Generar ahora respuestas o soluciones podría duplicar material oficial/histórico o consolidar una segmentación incorrecta.

Referencias cuantitativas útiles, sin convertirlas en orden de generación:

- 1.970 `NOT_FOUND` en el diagnóstico PAU histórico de Fase 2A;
- 254 representaciones CLM sin respuesta/solución enlazada en Fase 2B;
- 1.225 uniones inequívocas históricas pendientes de validación matemática;
- 184 criterios andaluces a nivel de documento pendientes de segmentación;
- 48 ejercicios CCSS II Andalucía 2012 explícitamente pendientes de respuesta y solución;
- Madrid: 817 segmentos oficiales pendientes de puerta de rol y vínculo de respuesta/solución;
- Andalucía: 1.666 ejercicios canónicos pendientes de auditoría individual de respuesta/solución.

El volumen final de generación será únicamente el residuo posterior a:

1. conciliación documental por ejercicio/apartado;
2. recuperación exhaustiva;
3. verificación algebraica/numérica;
4. resolución de conflictos;
5. clasificación entre resultado, criterio, solución parcial y solución completa.

## 17. Orden recomendado de trabajo

1. **Puerta documental**: confirmar que cada registro es ejercicio y fijar ejercicio/apartado.
2. **Segmentar criterios oficiales** de Andalucía y Madrid por ámbito exacto.
3. **Normalizar la biblioteca CLM** sin descargar nuevas fuentes todavía.
4. **Auditar las 1.151 respuestas históricas CLM** mediante sustitución, equivalencia, signos, dominio, unidades y cobertura de apartados.
5. **Resolver 19 conflictos y 12 posibles coincidencias** sin selección automática.
6. **Clasificar soluciones** como resultado, parcial, criterio o completa.
7. **Auditar los 55 conjuntos de distractores PAU de comunidad desconocida** y acreditar comunidad/ámbito.
8. **Migrar la respuesta correcta fuera de A/B/C/D** y materializar la posición por intento.
9. Solo entonces cuantificar y autorizar generación de lo verdaderamente inexistente.

## 18. Riesgos

- certificar un criterio de corrección como solución pedagógica;
- asociar una respuesta correcta a la alternativa equivocada;
- publicar una transcripción histórica cuando existe literal oficial distinto;
- interpretar `RECOVERED_UNIQUE` como “matemáticamente correcto”;
- contar registros documentales de corrección como ejercicios;
- asignar comunidad por semejanza;
- generar contenido que ya existe pero no está vinculado;
- aceptar distractores literales distintos pero algebraicamente equivalentes;
- conservar sesgo A mediante `correct: 0` aunque la interfaz rote opciones;
- cambiar el resultado al variar el orden de carga de bancos;
- mezclar ejercicios CLM entre Matemáticas II y CCSS II;
- declarar lista una modalidad sin solución completa o sin respuesta verificada.

## 19. Conclusiones

1. El catálogo dispone de una base documental importante, pero no de una certificación independiente y homogénea de respuestas y soluciones.
2. No se ha demostrado todavía ningún conjunto comunidad × materia listo para publicación con autocorrección bajo las condiciones solicitadas.
3. CLM contiene 1.151 respuestas/soluciones históricas enlazadas de forma inequívoca, pero todas requieren validación matemática; 254 representaciones carecen de enlace.
4. Madrid necesita cerrar el rol documental y enlazar las respuestas/soluciones a sus ejercicios oficiales.
5. Andalucía tiene el universo oficial más claro, pero sus criterios siguen vinculados al documento, no al ejercicio/apartado.
6. Los 48 ejercicios CCSS II 2012 permanecen correctamente en revisión, sin promoción automática.
7. Los distractores canónicos PAU no están certificados: los 55 conjuntos localizados tienen comunidad no acreditada y revisión obligatoria.
8. El runtime conserva deuda arquitectónica: `correct` sigue siendo un índice del banco en varias rutas, `withPauTestOptions()` parte de A y el equilibrado global depende del orden de carga.
9. Debe recuperarse y verificarse todo material existente antes de autorizar generación nueva.

## 20. Pruebas y controles de lectura

Controles realizados:

- recuento de ejercicios y apartados de Andalucía y Madrid;
- recuento de respuestas, soluciones y distractores v2 por materia/comunidad;
- inspección de estados de revisión y procedencia;
- comprobación del overlay Andalucía CCSS II 2012;
- comprobación de relaciones de criterios oficiales;
- contraste de reconciliación PAU 3.491/3.491;
- inspección estática de `rotateExamPart()`, `withPauTestOptions()` y `bach-ii-answer-option-balance.js`;
- comprobación de que el catálogo v2 permanece desconectado del runtime público;
- comprobación de que no se generó ni modificó contenido.

No se ejecutaron pruebas mutantes ni scripts que regenerasen artefactos, para respetar el alcance de solo lectura. Se ejecutaron 67 pruebas unitarias de lectura/validación, con resultado **67 superadas, 0 fallidas**, correspondientes a:

- contrato y validador canónico;
- catálogo Fase 2B;
- ámbito de respuestas/soluciones PAU;
- contratos documentales PAU;
- trazabilidad de la reconciliación;
- segmentación documental PAU.

## 21. Cambios de esta auditoría

Archivo nuevo:

- `docs/AUDITORIA-RESPUESTAS-SOLUCIONES-DISTRACTORES-2BACH-PAU-MATHUP.md`

Archivos existentes modificados por esta auditoría: ninguno.

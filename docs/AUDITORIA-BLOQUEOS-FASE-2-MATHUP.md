# Auditoría específica de bloqueos de la Fase 2 de +MathUp

Fecha de auditoría: 24 de agosto de 2026  
Alcance: análisis de solo lectura de los artefactos de `artifacts/fase2/runs/run-a`, del esquema y validador canónicos de Fase 1 y del importador paralelo de Fase 2.  
No se han corregido ejercicios, reclasificado datos ni modificado los artefactos auditados.

## 1. Base de cálculo y criterio de estado

La ejecución auditada contiene 6.680 candidatos canónicos:

| Estado | Candidatos |
|---|---:|
| `PASSED` | 1.639 |
| `REVIEW_REQUIRED` | 1.106 |
| `BLOCKED` | 3.935 |
| **Total** | **6.680** |

El estado se obtiene así:

- `BLOCKED`: existe al menos un diagnóstico con severidad `ERROR`.
- `REVIEW_REQUIRED`: no existe ningún `ERROR`, pero sí al menos un `WARNING`.
- `PASSED`: no existe ningún `ERROR` ni `WARNING`.

Por tanto, un aviso como `PAU_MODALITY_UNDECLARED` no bloquea por sí solo. En las tablas de candidatos bloqueados se muestran también los avisos que coexisten con errores, porque explican trabajo pendiente, pero solo los códigos marcados como `ERROR` causan el bloqueo.

Los recuentos por motivo no son excluyentes: un candidato puede tener varios diagnósticos. Por ello, la suma de una tabla de motivos puede superar el número de candidatos de su estado.

## 2. Resultado principal sobre 2.º de Bachillerato PAU

### 2.1 La regla funcional ya está representada

La afirmación «todo ejercicio de 2.º de Bachillerato es PAU» ya está codificada en la arquitectura aprobada:

- `canonical-exercise.mjs` asigna a `2bach-mates` y `2bach-ccss` el perfil `BACH2_PAU` y la etapa `PAU`.
- El esquema JSON exige para ambos cursos `classification.stage = "PAU"`, `solution.pedagogicalProfile = "BACH2_PAU"`, `provenance.kind = "official-pau"`, un objeto de comunidad y metadatos PAU.
- El validador aplica `SECOND_BACH_MUST_BE_PAU` si un ejercicio de esos cursos no conserva etapa y procedencia PAU explícitas.
- La modalidad `pau-simulation` ya existe en el catálogo de modalidades autorizadas para `BACH2_PAU`.

No falta, por tanto, una representación canónica de PAU. Lo que falta en una parte de los candidatos es evidencia suficiente para asignar una **modalidad de entrega**. Procedencia PAU y modalidad de uso son conceptos distintos.

### 2.2 Reglas concretas relacionadas con la modalidad

Se localizaron tres diagnósticos relacionados:

| Código | Severidad | Regla concreta | Candidatos PAU afectados |
|---|---|---|---:|
| `PAU_MODALITY_UNDECLARED` | `WARNING` | El validador avisa si el candidato PAU no contiene `pau-simulation` ni `open-response`. | 3.281 |
| `MODALITIES_MISSING` | `ERROR` | El validador exige al menos una modalidad canónica. | 582 |
| `MODALITY_UNDEMONSTRATED` | `ERROR` | El importador no encuentra evidencia heredada que pueda mapear a una modalidad canónica. | 582 |

Los dos errores de modalidad recaen sobre los mismos 582 candidatos: 534 de Matemáticas II y 48 de CCSS II. El importador solo reconoce evidencia explícita de rutas heredadas para práctica, reto, aventura, examen por tema y examen por bloque. No deriva automáticamente `pau-simulation` del hecho de pertenecer a 2.º de Bachillerato.

Conclusión: no son 3.281 bloqueos causados por falta de modalidad. Los 3.281 reciben un aviso PAU; solo 582 reciben además errores técnicos de modalidad.

### 2.3 ¿Hay candidatos bloqueados exclusivamente por esa carencia?

No. Los 3.281 candidatos PAU conservan al menos otro `ERROR` distinto de los diagnósticos de modalidad.

| Materia PAU | Total | Con error técnico de modalidad | Sin error técnico de modalidad, pero bloqueados por otros datos |
|---|---:|---:|---:|
| Matemáticas II | 1.921 | 534 | 1.387 |
| CCSS II | 1.360 | 48 | 1.312 |
| **Total** | **3.281** | **582** | **2.699** |

Los principales defectos adicionales son:

| Diagnóstico adicional | Matemáticas II | CCSS II | Total PAU |
|---|---:|---:|---:|
| `ANSWER_MISSING` (`ERROR`) | 1.921 | 1.305 | 3.226 |
| `SOLUTION_MISSING` (`ERROR`) | 1.921 | 1.305 | 3.226 |
| `CHOICES_REQUIRED` (`ERROR`) | 1.386 | 1.282 | 2.668 |
| `UNMAPPED_TOPIC` (`ERROR`) | 534 | 35 | 569 |
| `COMMUNITY_UNMAPPED` / `PAU_COMMUNITY_MISSING` (`ERROR`, misma carencia subyacente) | 105 | 84 | 189 |
| `CORRUPTED_CHARACTERS` (`ERROR`) | 0 | 4 | 4 |
| `COURSE_CONFLICT` (`ERROR`) | 1 | 0 | 1 |
| `PAU_DETAIL_INCOMPLETE` (`WARNING`) | 566 | 375 | 941 |
| `MATH_REPRESENTATION_UNDECLARED` (`WARNING`) | 592 | 316 | 908 |

Los 55 candidatos PAU que sí tienen respuesta y solución son todos de CCSS II; los 55 siguen bloqueados por comunidad no demostrada, 26 además por tema no mapeado y 39 además por modalidad no demostrada.

### 2.4 Contrafactual solicitado

Se recalculó el estado retirando únicamente `PAU_MODALITY_UNDECLARED`, `MODALITIES_MISSING` y `MODALITY_UNDEMONSTRATED`, sin tocar contenido ni ningún otro diagnóstico:

| Resultado contrafactual | Matemáticas II + CCSS II |
|---|---:|
| `PASSED` | 0 |
| `REVIEW_REQUIRED` | 0 |
| `BLOCKED` | 3.281 |

Corregir solo la carencia técnica de modalidad no publicaría ni desbloquearía ningún candidato PAU en la ejecución actual.

### 2.5 Modificación mínima que sería arquitectónicamente correcta

No se recomienda añadir una modalidad genérica llamada «PAU»: PAU ya es etapa, perfil pedagógico y procedencia. La modificación mínima futura debe mantener separados esos ejes:

1. Conservar obligatoriamente `stage = PAU`, `profile = BACH2_PAU` y `kind = official-pau` para 2.º de Bachillerato.
2. Aprobar expresamente una política de importación que asigne `pau-simulation` a los ejercicios de 2.º de Bachillerato cuando la regla funcional del producto garantice que pueden participar en simulaciones PAU. No debe asignarse `open-response` sin evidencia del tipo de respuesta.
3. Mantener el aviso si un candidato PAU no queda asociado a una modalidad de entrega autorizada.
4. Evitar el doble diagnóstico para la misma ausencia (`MODALITY_UNDEMONSTRATED` del importador y `MODALITIES_MISSING` del validador), conservando uno como causa primaria y el otro, si se desea, como referencia derivada.

Una alternativa sería permitir candidatos de borrador sin modalidades, pero relajaría el contrato de Fase 1 y no debe adoptarse sin una decisión arquitectónica expresa. En ningún caso este cambio sustituye la corrección o revisión de respuestas, soluciones, opciones, temas y comunidades que siguen faltando.

## 3. Diagnóstico de 1.º de Bachillerato

### 3.1 Matemáticas I

Situación: 76 originales y candidatos; 0 `PASSED`, 4 `REVIEW_REQUIRED` y 72 `BLOCKED`.

Motivos observados entre los 72 bloqueados (no excluyentes):

| Categoría | Código | Severidad | Cantidad | Interpretación |
|---|---|---|---:|---|
| Respuesta | `ANSWER_CONFLICT` | `ERROR` | 30 | La identidad agrupó respuestas incompatibles. |
| Respuesta | `ANSWER_MISSING` | `ERROR` | 30 | No se vinculó una respuesta canónica por el conflicto anterior. |
| Solución | `SOLUTION_CONFLICT` | `ERROR` | 30 | La identidad agrupó soluciones incompatibles. |
| Solución | `SOLUTION_MISSING` | `ERROR` | 30 | No se vinculó solución por el conflicto anterior. |
| Solución | `SOLUTION_DEVELOPMENT_INSUFFICIENT` | `WARNING` | 1 | Desarrollo insuficiente. |
| Solución | `SOLUTION_REVIEW_REQUIRED` | `WARNING` | 30 | Revisión humana pendiente. |
| Clasificación | `COURSE_CONFLICT` | `ERROR` | 10 | La identidad reúne cursos incompatibles. |
| Clasificación | `TOPIC_VARIANTS` | `WARNING` | 30 | Varias clasificaciones temáticas en una identidad. |
| Modalidad | `MODALITIES_MISSING` | `ERROR` | 45 | El candidato queda sin modalidad. |
| Modalidad | `MODALITY_UNDEMONSTRATED` | `ERROR` | 45 | No hay evidencia heredada suficiente para asignarla. |
| Notación/equivalencia | `SYMBOLIC_EQUIVALENCE_NOT_PROVEN` | `WARNING` | 61 | Equivalencia simbólica no demostrada automáticamente. |
| Notación | `MATH_REPRESENTATION_UNDECLARED` | `WARNING` | 2 | Representación matemática no declarada suficientemente. |
| Opciones | `OPTIONS_VARIANTS` | `WARNING` | 30 | Varias configuraciones de opciones en la identidad. |
| Contenido | `STATEMENT_VARIANTS` | `WARNING` | 30 | Enunciados distintos agrupados bajo la misma identidad. |
| Revisión | `REVIEW_FINDINGS_OPEN` | `WARNING` | 6 | Hallazgos heredados aún abiertos. |

No se detectó un código de procedencia incompleta específico en Matemáticas I. Los 30 casos con respuesta/solución ausente no son simples huecos: existen valores potenciales en otros registros agrupados, pero son incompatibles y no se pueden vincular inequívocamente. El patrón evidencia una colisión de identidad demasiado amplia, no una autorización para elegir automáticamente un valor.

Si solo se retirasen los dos errores técnicos de modalidad, sin tocar contenido, Matemáticas I quedaría en 10 `PASSED`, 36 `REVIEW_REQUIRED` y 30 `BLOCKED`. Este contrafactual confirma que la modalidad explica parte, pero no toda, la ausencia de aprobados.

### 3.2 CCSS I

Situación: 212 originales y candidatos; 0 `PASSED`, 53 `REVIEW_REQUIRED` y 159 `BLOCKED`.

Motivos observados entre los 159 bloqueados (no excluyentes):

| Categoría | Código | Severidad | Cantidad | Interpretación |
|---|---|---|---:|---|
| Respuesta | — | — | 0 | No hay ausencia de respuesta entre los bloqueados de CCSS I. |
| Solución | `SOLUTION_FINAL_ONLY` | `ERROR` | 2 | Solo consta el resultado final donde se exige desarrollo. |
| Solución | `SOLUTION_DEVELOPMENT_INSUFFICIENT` | `WARNING` | 74 | Desarrollo pedagógico insuficiente. |
| Solución | `SOLUTION_REVIEW_REQUIRED` | `WARNING` | 74 | Revisión de solución pendiente. |
| Clasificación | `UNMAPPED_TOPIC` | `ERROR` | 6 | Tema no demostrable en la taxonomía actual. |
| Modalidad | `MODALITIES_MISSING` | `ERROR` | 159 | El candidato queda sin modalidad. |
| Modalidad | `MODALITY_UNDEMONSTRATED` | `ERROR` | 159 | No existe evidencia heredada suficiente para asignarla. |
| Notación/equivalencia | `SYMBOLIC_EQUIVALENCE_NOT_PROVEN` | `WARNING` | 13 | Equivalencia simbólica pendiente de validación. |
| Notación | `MATH_REPRESENTATION_UNDECLARED` | `WARNING` | 16 | Representación matemática no declarada suficientemente. |
| Opciones | `CHOICE_DUPLICATED` | `ERROR` | 2 | Opciones repetidas literalmente. |
| Opciones | `CHOICE_MATHEMATICALLY_EQUIVALENT` | `ERROR` | 1 | Opciones matemáticamente equivalentes. |
| Opciones | `MULTIPLE_CORRECT_EQUIVALENTS` | `ERROR` | 1 | Puede haber más de una opción equivalente a la correcta. |
| Revisión | `REVIEW_FINDINGS_OPEN` | `WARNING` | 74 | Hallazgos heredados aún abiertos. |

No se detectaron diagnósticos específicos de procedencia incompleta en CCSS I. Si solo se retirasen los dos errores técnicos de modalidad, CCSS I quedaría en 63 `PASSED`, 139 `REVIEW_REQUIRED` y 10 `BLOCKED`. En esta materia, la asignación incompleta de modalidad es la causa dominante de que no exista ningún aprobado, aunque 10 candidatos conservarían errores de tema, solución u opciones.

## 4. Desglose global de los 3.935 `BLOCKED`

Los códigos siguientes aparecen en candidatos bloqueados. Los totales no son excluyentes. Las filas `WARNING` no causan por sí solas `BLOCKED`, pero acompañan a uno o varios errores del mismo candidato.

| Motivo/código | Severidad | Nº de candidatos bloqueados | Cursos/materias afectados |
|---|---|---:|---|
| `SOLUTION_REVIEW_REQUIRED` | `WARNING` | 3.465 | Matemáticas I 30; 1.º ESO 129; 2.º ESO 5; 3.º ESO 1; CCSS I 74; CCSS II 1.305; Matemáticas II 1.921 |
| `PAU_MODALITY_UNDECLARED` | `WARNING` | 3.281 | CCSS II 1.360; Matemáticas II 1.921 |
| `ANSWER_MISSING` | `ERROR` | 3.256 | Matemáticas I 30; CCSS II 1.305; Matemáticas II 1.921 |
| `SOLUTION_MISSING` | `ERROR` | 3.256 | Matemáticas I 30; CCSS II 1.305; Matemáticas II 1.921 |
| `CHOICES_REQUIRED` | `ERROR` | 2.668 | CCSS II 1.282; Matemáticas II 1.386 |
| `MODALITIES_MISSING` | `ERROR` | 1.074 | CCSS I 159; Matemáticas I 45; 1.º ESO 80; CCSS II 48; 2.º ESO 41; 3.º ESO 52; 4.º ESO A 53; 4.º ESO B 62; Matemáticas II 534 |
| `MODALITY_UNDEMONSTRATED` | `ERROR` | 1.074 | Mismos candidatos que `MODALITIES_MISSING` |
| `MATH_REPRESENTATION_UNDECLARED` | `WARNING` | 1.006 | CCSS I 16; Matemáticas I 2; 1.º ESO 29; 2.º ESO 36; 3.º ESO 3; 4.º ESO A 11; 4.º ESO B 1; CCSS II 316; Matemáticas II 592 |
| `PAU_DETAIL_INCOMPLETE` | `WARNING` | 941 | CCSS II 375; Matemáticas II 566 |
| `UNMAPPED_TOPIC` | `ERROR` | 575 | CCSS I 6; CCSS II 35; Matemáticas II 534 |
| `SYMBOLIC_EQUIVALENCE_NOT_PROVEN` | `WARNING` | 265 | Matemáticas I 61; CCSS I 13; 1.º ESO 72; 2.º ESO 37; 3.º ESO 5; 4.º ESO A 41; 4.º ESO B 17; CCSS II 19 |
| `COMMUNITY_UNMAPPED` | `ERROR` | 189 | CCSS II 84; Matemáticas II 105 |
| `PAU_COMMUNITY_MISSING` | `ERROR` | 189 | Mismos 189 que `COMMUNITY_UNMAPPED` |
| `SOLUTION_FINAL_ONLY` | `ERROR` | 129 | 1.º ESO 127; CCSS I 2 |
| `SOLUTION_DEVELOPMENT_INSUFFICIENT` | `WARNING` | 101 | CCSS I 74; Matemáticas I 1; 1.º ESO 8; CCSS II 6; 3.º ESO 2; 4.º ESO A 10 |
| `REVIEW_FINDINGS_OPEN` | `WARNING` | 90 | Matemáticas I 6; 1.º ESO 2; 2.º ESO 5; 3.º ESO 1; CCSS I 74; CCSS II 2 |
| `STATEMENT_VARIANTS` | `WARNING` | 33 | Matemáticas I 30; CCSS II 1; Matemáticas II 2 |
| `ANSWER_CONFLICT` | `ERROR` | 30 | Matemáticas I |
| `OPTIONS_VARIANTS` | `WARNING` | 30 | Matemáticas I |
| `SOLUTION_CONFLICT` | `ERROR` | 30 | Matemáticas I |
| `TOPIC_VARIANTS` | `WARNING` | 30 | Matemáticas I |
| `COURSE_CONFLICT` | `ERROR` | 11 | Matemáticas I 10; Matemáticas II 1 |
| `CHOICE_MATHEMATICALLY_EQUIVALENT` | `ERROR` | 9 | 1.º ESO 2; 2.º ESO 5; 3.º ESO 1; CCSS I 1 |
| `MULTIPLE_CORRECT_EQUIVALENTS` | `ERROR` | 9 | Mismos 9 casos de equivalencia de opciones |
| `CORRUPTED_CHARACTERS` | `ERROR` | 4 | CCSS II |
| `CHOICE_DUPLICATED` | `ERROR` | 2 | CCSS I |

Hay diagnósticos duplicados por capas para una misma causa subyacente: los 1.074 sin modalidad reciben un error del importador y otro del validador; los 189 sin comunidad reciben `COMMUNITY_UNMAPPED` y `PAU_COMMUNITY_MISSING`. Deben conservarse para trazabilidad, pero no deben interpretarse como 2.148 o 378 ejercicios distintos.

## 5. Desglose de los 1.106 `REVIEW_REQUIRED`

Estos candidatos no tienen errores; los siguientes avisos justifican su revisión. Los totales tampoco son excluyentes.

| Motivo/código | Cantidad | Cursos/materias afectados |
|---|---:|---|
| `SYMBOLIC_EQUIVALENCE_NOT_PROVEN` | 776 | 1.º ESO 163; 2.º ESO 101; Matemáticas I 4; 3.º ESO 194; 4.º ESO A 129; 4.º ESO B 163; CCSS I 22 |
| `MATH_REPRESENTATION_UNDECLARED` | 425 | 1.º ESO 135; 2.º ESO 102; 3.º ESO 81; 4.º ESO A 36; 4.º ESO B 71 |
| `SOLUTION_DEVELOPMENT_INSUFFICIENT` | 134 | 1.º ESO 42; 2.º ESO 9; 3.º ESO 30; 4.º ESO A 3; 4.º ESO B 3; CCSS I 47 |
| `REVIEW_FINDINGS_OPEN` | 53 | CCSS I |
| `SOLUTION_REVIEW_REQUIRED` | 53 | CCSS I |

La mayoría de las revisiones no se debe a una respuesta ausente, sino a que la equivalencia matemática no está demostrada de forma segura, la notación requiere normalización controlada o la solución necesita un desarrollo pedagógico más completo.

## 6. Los 3.256 candidatos sin respuesta y sin solución

Los dos diagnósticos coinciden exactamente sobre los mismos 3.256 candidatos.

| Nivel/materia | Sin respuesta y sin solución |
|---|---:|
| ESO (todos los cursos) | 0 |
| 1.º Bachillerato Matemáticas I | 30 |
| 1.º Bachillerato CCSS I | 0 |
| 2.º Bachillerato Matemáticas II | 1.921 |
| 2.º Bachillerato CCSS II | 1.305 |
| **Total** | **3.256** |

Clasificación según las decisiones de enlace de Fase 2:

| Situación de la evidencia | Cantidad | Decisión correcta |
|---|---:|---|
| Existen respuestas y soluciones potenciales en registros agrupados, pero son incompatibles (`CONFLICT`) | 30 | No vincular; revisar y corregir la identidad de Matemáticas I. |
| No se localizó respuesta ni solución en el conjunto de fuentes asociado inequívocamente a la identidad (`MISSING`) | 3.226 | Mantener bloqueado; buscar evidencia adicional sin inventar contenido. |

La segunda cifra significa «no localizada en las fuentes reconciliadas para esa identidad», no una prueba absoluta de que nunca exista en otro documento no enlazado. No hay base inequívoca para asociar automáticamente registros externos. La diferencia respecto a recuentos de Fase 0 se explica porque Fase 2 trabaja sobre identidades canónicas consolidadas y retiene deliberadamente como ausentes los 30 conflictos en vez de seleccionar un valor arbitrario.

## 7. Los 189 PAU sin comunidad verificable

Distribución:

| Materia | Casos |
|---|---:|
| Matemáticas II | 105 |
| CCSS II | 84 |
| **Total** | **189** |

Resultado de la trazabilidad:

- En los 189 registros de evidencia, el campo de comunidad contiene `no-aplica-o-sin-determinar`.
- Los 189 candidatos canónicos conservan `provenance.community = null`.
- Hay 176 registros procedentes de scripts y 13 materializaciones de runtime.
- Algunos registros conservan año y convocatoria en `provenance` y otros proceden de bancos didácticos o de variedad, pero sus nombres de archivo y rutas no identifican una comunidad de forma inequívoca.
- Ninguno de los 189 contiene actualmente un vínculo a página, hash de activo original o ruta documental que demuestre por sí sola Castilla-La Mancha, Madrid u otra comunidad.

Clasificación solicitada:

| Categoría | Cantidad | Conclusión |
|---|---:|---|
| Comunidad explícita en los datos localizados | 0 | No existe evidencia estructurada suficiente. |
| Comunidad recuperable inequívocamente del vínculo actual al original | 0 | La trazabilidad actual no incluye un original que la demuestre por sí solo. |
| Requiere localizar y comparar manualmente una fuente original o realizar una inferencia | 189 | No se debe completar automáticamente. Una revisión documental futura podría convertir parte de ellos en evidencia, pero hoy siguen sin demostrar. |

No debe inferirse la comunidad por el año, la convocatoria, el tema, el estilo del enunciado, el nombre genérico del banco ni la presencia cercana de otros ejercicios de una comunidad conocida.

## 8. Recomendación técnica final

### 8.1 Carencias del esquema/importador o de sus reglas técnicas

- La representación de PAU en el esquema **no está ausente**: etapa, perfil, procedencia y modalidad `pau-simulation` ya existen.
- El importador no deriva una modalidad de entrega para 582 candidatos PAU pese a la regla funcional de 2.º de Bachillerato. Esto requiere una política explícita y aprobada, no un cambio del significado matemático.
- El mismo problema de evidencia de modalidad afecta a 45 candidatos de Matemáticas I y 159 de CCSS I, y explica que CCSS I no tenga ningún `PASSED` en la ejecución actual.
- Existen diagnósticos duplicados entre importador y validador para ausencia de modalidad y comunidad. Conviene conservar una causa primaria y trazabilidad derivada para que los informes no sobredimensionen la incidencia.
- Las 30 colisiones de identidad de Matemáticas I indican que la clave de agrupación es demasiado amplia para esos registros. Debe refinarse antes de cualquier enlace de respuesta o solución.

### 8.2 Bloqueos causados por datos realmente incompletos o insuficientemente demostrados

- 3.226 candidatos PAU carecen de respuesta y solución localizadas de forma inequívoca.
- 2.668 PAU no reúnen las opciones exigidas por el contrato de elección múltiple actual.
- 569 PAU y 6 CCSS I no tienen tema canónico demostrable.
- 189 PAU no tienen comunidad demostrable en la evidencia reconciliada.
- 129 ejercicios contienen únicamente respuesta final donde el contrato exige solución desarrollada.
- Hay defectos reales de opciones, caracteres y conflictos de curso que deben permanecer bloqueantes hasta su resolución.

### 8.3 Casos que requieren revisión humana

- Los 1.106 `REVIEW_REQUIRED`, especialmente los 776 con equivalencia simbólica no demostrada y los 425 con representación matemática no declarada.
- Los 30 conflictos de Matemáticas I: existen datos potenciales, pero no se puede saber automáticamente cuál corresponde a cada ejercicio.
- Los 189 PAU sin comunidad: requieren localizar una fuente original inequívoca; no basta una inferencia contextual.
- Las soluciones insuficientes o finales, las opciones equivalentes y los caracteres deteriorados requieren validación matemática y editorial.

### 8.4 Orden recomendado antes de aprobar cambios

1. Corregir conceptualmente el informe de Fase 2: `PAU_MODALITY_UNDECLARED` es un aviso global, no la causa exclusiva de los 3.281 bloqueos.
2. Aprobar una política separada para procedencia PAU y modalidad de entrega; probarla de forma contrafactual antes de modificar el importador.
3. Refinar la identidad de los 30 conflictos de Matemáticas I y repetir la conciliación, sin elegir respuestas automáticamente.
4. Mantener bloqueados los candidatos sin respuesta, solución, tema, comunidad u opciones hasta que exista evidencia.
5. Someter los avisos de notación, equivalencia y calidad de solución a revisión humana por lotes trazables.

La corrección de la modalidad es necesaria para representar el uso futuro de algunos ejercicios, pero no es suficiente para publicar ningún candidato PAU de la ejecución auditada.

# Reconciliación documental y corrección paralela de segmentación PAU de +MathUp

## 1. Resultado ejecutivo

Se ha implementado una canalización documental paralela, reproducible y reversible que no escribe en bancos, `data/`, contratos anteriores, aplicación pública, Supabase, renderizadores, skills ni artefactos previos.

La ejecución censó 132 PDF, conservó 15.527/15.527 `sourceRecordId` y asignó una decisión explícita a 3.491/3.491 representaciones PAU. La política aplicada es deliberadamente conservadora: una coincidencia plausible no se eleva a coincidencia exacta o estructural sin una unión documental inequívoca.

El caso obligatorio `vent-421552a489e688ce586b07f0c1870560` quedó resuelto como dos ejercicios independientes, 4.1 y 4.2, cada uno con `a)` y `b)`, con la instrucción editorial fuera del enunciado, ocho ámbitos separados de respuesta/solución y una redirección `SPLIT` desde la identidad histórica fusionada.

## 2. Fuentes y límites de evidencia

Se procesaron en modo de lectura:

- 80 PDF de Matemáticas II localizados bajo el archivo oficial local de Castilla-La Mancha.
- 52 PDF de Matemáticas Aplicadas a las CCSS II localizados bajo el archivo local correspondiente.
- El inventario y las decisiones de Fases 2B, 2C y de la auditoría de segmentación.
- El libro inmutable de 15.527 registros de Fase 2.
- Bancos, parches y correcciones históricas como evidencia de lectura.
- `data/mates-ii-runtime-fixes.js`, leído y protegido por SHA-256, sin modificación.

No se encontraron colecciones locales independientes de PDF oficiales de Madrid. Uno de los 52 PDF de CCSS II contiene documentalmente una prueba de Madrid de 2009, por lo que se conserva como Madrid aun estando archivada dentro del conjunto local de Castilla-La Mancha. No se ha deducido comunidad por semejanza.

Cuatro PDF de soluciones (`02_exres1.pdf`, `02_exres2.pdf`, `03_exres1.pdf` y `03_exres2.pdf`) no produjeron texto mediante `pdftotext`; permanecen censados por bytes, hash, ruta y páginas con verificación parcial. No se utilizó OCR ni Mathpix.

## 3. Registro documental inmutable

Cada documento tiene:

- SHA-256 de los bytes;
- `documentId` estable derivado del hash;
- materia, comunidad, año y convocatoria únicamente cuando están acreditados;
- número de páginas y ruta lógica sin datos personales;
- evidencia de cada metadato;
- estado de extracción y verificación.

Resultado del censo:

| Métrica | Cantidad |
|---|---:|
| PDF censados | 132 |
| Verificados | 41 |
| Parciales | 91 |
| No identificados | 0 |
| Extracción textual disponible | 128 |
| Extracción textual vacía | 4 |
| Matemáticas II · Castilla-La Mancha | 80 |
| CCSS II · Castilla-La Mancha | 51 |
| CCSS II · Madrid acreditado por el documento | 1 |

Los años acreditados abarcan 2000–2026. Se acreditaron 47 convocatorias ordinarias y 50 extraordinarias; en 35 documentos la convocatoria no se fijó por falta de evidencia suficiente.

## 4. Estructura editorial detectada

El extractor conserva rangos de página y desplazamientos y separa instrucciones, bloques, preguntas, alternativas, ejercicios y subapartados.

| Unidad | Cantidad |
|---|---:|
| Unidades documentales totales | 5.474 |
| Instrucciones generales | 68 |
| Bloques | 173 |
| Preguntas | 1.295 |
| Alternativas | 703 |
| Ejercicios documentales | 1.301 |
| Subapartados documentales | 2.637 |

Las identidades se derivan de `documentHash + subject + questionKey + alternativeKey`; las de apartado, de `documentExerciseId + normalizedSubpartLabel`. El orden de lectura no interviene en la identidad.

Las cifras son un censo automático de estructura extraíble, no una certificación humana de todos los límites editoriales. Las estructuras no vinculadas inequívocamente permanecen en revisión.

## 5. Conciliación de las 3.491 representaciones

| Nivel | Cantidad |
|---|---:|
| `DOCUMENT_MATCH_EXACT` | 0 |
| `DOCUMENT_MATCH_STRUCTURAL` | 1 |
| `AMBIGUOUS` | 0 |
| `NOT_FOUND` | 2.732 |
| `HUMAN_REVIEW_REQUIRED` | 758 |
| **Total** | **3.491** |

No se proclamó ninguna coincidencia exacta: los literales históricos y la extracción del PDF no coinciden de forma demostrable bajo las reglas reversibles admitidas. La única coincidencia estructural certificada es el caso obligatorio, porque dispone de PDF oficial, rangos de página, estructura 4.1/4.2, claves de apartado, registros históricos separados y reconocimiento del parche de runtime.

Los 758 casos `HUMAN_REVIEW_REQUIRED` tienen un documento candidato compatible por metadatos, pero la unión literal no es inequívoca. Los 2.732 `NOT_FOUND` no disponen de una fuente oficial local compatible suficiente para fijar una unión. Esta categoría no significa que el ejercicio no exista; significa que no se encontró evidencia documental local capaz de certificarlo.

Desglose por materia:

| Materia | Estructural | Revisión humana | No encontrado | Total |
|---|---:|---:|---:|---:|
| Matemáticas II | 1 | 238 | 1.772 | 2.011 |
| CCSS II | 0 | 520 | 960 | 1.480 |

Procedencia declarada en las representaciones de entrada:

| Comunidad | Representaciones |
|---|---:|
| Castilla-La Mancha | 1.405 |
| Madrid | 1.687 |
| No verificable | 399 |

El artefacto `coverage-by-provenance.json` desglosa además las 3.491 representaciones por materia, comunidad, año, convocatoria y estado, y separa ese universo del censo de documentos oficiales.

## 6. Respuestas, soluciones y precedencia

La precedencia se basa en fidelidad documental, no en orden de carga. No se enlazó ninguna respuesta o solución por parecido textual.

Solo se generaron ocho ámbitos documentales, todos pertenecientes al caso obligatorio: respuesta y solución para cada uno de los cuatro subapartados. Cada ámbito conserva `sourceRecordId`, hash inmutable, ejercicio documental, apartado, regla de unión y hash del archivo de runtime reconocido. El estado es `DOCUMENT_SCOPE_VERIFIED_MATHEMATICS_NOT_REVALIDATED`: el ámbito está demostrado, pero esta fase no revalida ni corrige el contenido matemático.

Las respuestas o soluciones concatenadas que no pueden separarse con evidencia permanecen sin promover y aparecen en la cola de revisión.

## 7. Redirecciones y conservación histórica

Se generó una redirección:

| Tipo | Cantidad |
|---|---:|
| `SPLIT` | 1 |
| `ONE_TO_ONE` | 0 |
| `ALIAS` | 0 |
| `REVIEW_REQUIRED` | 0 |

No se borró ni sustituyó ninguna identidad. La redirección `SPLIT` conserva los cinco `sourceRecordId` del caso fusionado y apunta a los dos ejercicios documentales independientes.

## 8. Caso obligatorio

Entidad visual: `vent-421552a489e688ce586b07f0c1870560`  
Ejercicio histórico: `ex-25662a75-7e5e-5935-903f-0d41aa138462`

Resultado:

- PDF oficial: `26_exjun.pdf`, SHA-256 `9b62b33f9e8838a06087e525355e607c25b7c5e9832a7f1aac35b168b1ba42db`, página 2.
- La instrucción «Conteste solo UNA…» está almacenada como instrucción editorial, no como enunciado.
- 4.1 y 4.2 son dos `documentExerciseId` distintos.
- Cada ejercicio contiene `a)` y `b)` como `documentSubpartId` distintos.
- Se reconstruyeron cuatro ámbitos de apartado y ocho ámbitos de entidad (respuesta/solución).
- `data/mates-ii-runtime-fixes.js` fue reconocido mediante el SHA-256 `a8613c5f3b1c9865d13ce3d86ece7d0edab32ff019173f06f63fdc2d9d887b0a`.
- Se emitió una redirección `SPLIT` desde la identidad fusionada.
- El literal histórico, sus hashes y todos los `sourceRecordId` permanecen como evidencia.

## 9. Diferencias de notación

Las señales históricas de corrupción o riesgo de notación se registraron de forma paralela para vectores, matrices, determinantes, límites, integrales, sistemas, fracciones, potencias y otras familias. No se ejecutó la normalización visual general y no se reparó silenciosamente ninguna expresión.

Cuando existe un único ejercicio documental candidato, la diferencia queda registrada como `REGISTERED_NOT_AUTOMATICALLY_REPAIRED`. En los demás casos queda como `HUMAN_DOCUMENT_REVIEW_REQUIRED`.

## 10. Trabajo humano documental pendiente

Quedan 3.490 representaciones sin certificación documental final:

- 758 requieren comparar el candidato oficial con la evidencia histórica y decidir límites/identidad.
- 2.732 requieren localizar una fuente oficial compatible o confirmar documentalmente que no está disponible.
- Los cuatro PDF sin capa textual necesitan una vía de lectura autorizada distinta de Mathpix antes de poder explotar su contenido.
- La cobertura de Madrid necesita incorporar y censar los documentos oficiales correspondientes; no puede reconstruirse a partir de bancos históricos por inferencia.

No se ha reanudado la revisión visual humana.

## 11. Reproducibilidad, orden y rollback

Se ejecutaron dos corridas con las mismas entradas y una tercera con el orden invertido. Las tres producen el mismo hash semántico:

`f5673900ccd9bfa1a89097ecab61c5ae5b205bacf8c4f3e4e2e0b985bd162278`

Resultados:

- doble corrida: idéntica;
- orden invertido: idéntico;
- rollback: superado;
- escrituras en producción: 0;
- los tres artefactos protegidos comprobados por hash permanecen intactos;
- acción de reversión: eliminar exclusivamente el directorio nuevo de artefactos.

## 12. Pruebas

| Conjunto | Superadas | Fallidas |
|---|---:|---:|
| Pruebas específicas documentales | 14 | 0 |
| Regresión completa del repositorio | 117 | 0 |

Las pruebas cubren contratos, hashes, identidades, segmentación, alternativas, subapartados, ámbitos de respuesta/solución, trazabilidad, 3.491/3.491 decisiones, 15.527/15.527 `sourceRecordId`, reproducibilidad, orden invertido, rollback y aislamiento de producción.

## 13. Artefactos generados

Se añadieron únicamente archivos nuevos en:

- `catalog/pau-documentary/`: seis contratos, identidades, reconciliador y patrones editoriales de Castilla-La Mancha y Madrid.
- `scripts/pau-*.mjs`: censo, extracción, reconciliación, reproducibilidad y rollback.
- `tests/pau-*.test.mjs`: cinco módulos de prueba.
- `artifacts/pau-documentary-reconciliation/`: tres corridas auditables, checksums, conciliación, cobertura, caso 1, reproducibilidad, rollback y resumen de pruebas.
- Este informe.

No se modificó ningún archivo existente de producción ni de fases anteriores. No se realizó commit ni push.

## 14. Conclusión

La infraestructura documental, las identidades, los contratos y la conservación completa están implementados y verificados. El caso 1 está corregido en la capa paralela con evidencia suficiente. El resto conserva una decisión explícita, pero el catálogo PAU no queda certificado para publicación: 3.490 representaciones todavía exigen fuente oficial adicional o revisión humana documental.

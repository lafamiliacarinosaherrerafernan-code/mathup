# Auditoría del resultado humano Equation.3 · Andalucía CCSS II 2012

## Alcance y principio de inmutabilidad

Este cierre audita las decisiones humanas registradas en `artifacts/equation3-human-comparison/local-state/review-state.json`. No corrige objetos, AST, MathML, ejercicios ni documentos; tampoco integra los 48 ejercicios en el catálogo principal.

La evidencia pública usa el identificador pseudónimo `reviewer-1`, conserva los comentarios técnicos, la fecha general `2026-08-25` y una secuencia reproducible, pero no publica horas exactas. La evidencia privada literal, con identidad y marcas temporales originales, permanece localmente en OneDrive y fuera de Git. Las 55 decisiones son acciones humanas explícitas. La igualdad verificada es:

`45 COINCIDE + 10 NO COINCIDE + 0 DUDOSO = 55`

La exportación pública completa y reproducible está en `artifacts/equation3-human-review-result/human-decisions-audit.jsonl`. Cada fila conserva decisión, comentario técnico, fecha general, secuencia, revisor pseudónimo, ejercicio, apartado, DOC oficial, objeto Equation.3, hashes originales y AST/MathML/LaTeX actuales. El manifiesto `artifacts/equation3-human-review-result/manifest.json` fija los hashes de todos los resultados y un hash semántico global.

## Resultado humano consolidado

| Estado | Objetos |
|---|---:|
| `COINCIDE` | 45 |
| `NO_COINCIDE` | 10 |
| `DUDOSO` | 0 |
| Total revisado | 55 |

Los 45 objetos `COINCIDE` forman un conjunto de regresión inmutable: su `caseHash`, hash de AST, hash de MathML y hash del PNG oficial quedan registrados en `summary.json`. Una corrección posterior de los diez fallos deberá demostrar que estos 45 no cambian ni sufren regresiones visuales.

## Clasificación de los diez `NO_COINCIDE`

Las categorías no son excluyentes: un objeto puede presentar más de una incidencia.

| Categoría | Objetos |
|---|---:|
| `DELIMITER_SIZE_ERROR` | 9 |
| `CONTENT_MISMATCH` | 5 |
| `SYMBOL_ERROR` | 4 |
| `SUPERSCRIPT_SUBSCRIPT_ERROR` | 1 |
| `SPACING_LAYOUT_ERROR` | 1 |
| `OPERATOR_MISMATCH` | 0 |
| `FRACTION_STRUCTURE_ERROR` | 0 |
| `MATRIX_STRUCTURE_ERROR` | 0 |
| `OTHER_RENDERING_ERROR` | 0 |

Por capa de origen:

- **9 fallos de representación derivada**: cinco presentan únicamente paréntesis de llamada a función sobredimensionados; otros cuatro, además, convierten una llave unilateral oficial en una pareja de llaves y añaden por tanto un símbolo inexistente.
- **1 fallo de AST/decodificación**: el exponente `6` quedó aplicado al token `)` en lugar de al grupo completo `(3x²+5x−1)`. El LaTeX derivado intenta reagruparlo, pero el AST y el MathML conservan una base incorrecta.

### Detalle por objeto

| Objeto | Ejercicio / apartado | Capa | Categorías | Diagnóstico y corrección mínima posterior |
|---|---|---|---|---|
| `adobj-bcec57ae525fa5e2-006` | `ade2012-m2-b-e2-bcec57ae525f` · d | Representación derivada | contenido, símbolo, tamaño de delimitador | `P(t)` sobredimensionado y llave unilateral convertida en pareja. Respetar `mtefTemplate.variation=1` y no hacer elásticos los paréntesis ordinarios. |
| `adobj-bcec57ae525fa5e2-003` | `ade2012-m2-a-e2-bcec57ae525f` · c | Representación derivada | tamaño de delimitador | Diferenciar paréntesis literales de llamada a función de delimitadores adaptativos. |
| `adobj-c8688a19515dfeb3-005` | `ade2012-m3-b-e2-c8688a19515d` · c | Representación derivada | tamaño de delimitador | Aplicar la misma regla general a `f(t)`. |
| `adobj-c8688a19515dfeb3-001` | `ade2012-m3-a-e2-c8688a19515d` | Representación derivada | contenido, símbolo, tamaño de delimitador | `f(x)` sobredimensionado y llave derecha añadida. Conservar la unilateralidad documentada. |
| `adobj-8446c5da6b4b7cfc-009` | `ade2012-m4-b-e2-8446c5da6b4b` · c | Representación derivada | contenido, símbolo, tamaño de delimitador | `B(t)` sobredimensionado y llave izquierda oficial convertida en llaves simétricas. |
| `adobj-8446c5da6b4b7cfc-003` | `ade2012-m4-a-e2-8446c5da6b4b` · b | Representación derivada | contenido, símbolo, tamaño de delimitador | `f(x)` sobredimensionado y llave derecha inexistente. Respetar `variation=1`. |
| `adobj-8446c5da6b4b7cfc-004` | `ade2012-m4-a-e2-8446c5da6b4b` · b | Representación derivada | tamaño de delimitador | Aplicar la regla de paréntesis ordinarios a `g(x)`. |
| `adobj-87b729cdd4632386-001` | `ade2012-m5-a-e2-87b729cdd463` · b | Representación derivada | tamaño de delimitador | Aplicar la regla de paréntesis ordinarios a `f(x)`. |
| `adobj-61f8d5d809881c49-008` | `ade2012-m6-b-e2-61f8d5d80988` · c | Representación derivada | tamaño de delimitador | Aplicar la regla de paréntesis ordinarios a `g(x)`. |
| `adobj-61f8d5d809881c49-009` | `ade2012-m6-b-e2-61f8d5d80988` · c | AST/decodificación | contenido, superíndice, espaciado | Corregir de forma general la decodificación MTEF de un `script` cuya base es un grupo delimitado; la base del `power` debe ser el grupo completo. |

No se propone ningún parche por identificador. Las dos correcciones futuras son reglas generales demostrables: preservar delimitadores unilaterales y asociar scripts al grupo MTEF correcto.

## Consecuencia por ejercicio

| Concepto | Ejercicios |
|---|---:|
| Recuperados en esta fase | 48 |
| Sin dependencia de Equation.3 | 21 |
| Con dependencia de Equation.3 | 27 |
| Dependientes con todos sus objetos `COINCIDE` | 19 |
| Afectados por al menos un `NO_COINCIDE` | 8 |
| Actualmente desbloqueables | **40** |
| Todavía bloqueados | **8** |

Los ocho afectados son:

- `ade2012-m2-a-e2-bcec57ae525f`
- `ade2012-m2-b-e2-bcec57ae525f`
- `ade2012-m3-a-e2-c8688a19515d`
- `ade2012-m3-b-e2-c8688a19515d`
- `ade2012-m4-a-e2-8446c5da6b4b`
- `ade2012-m4-b-e2-8446c5da6b4b`
- `ade2012-m5-a-e2-87b729cdd463`
- `ade2012-m6-b-e2-61f8d5d80988`

“Desbloqueable” solo expresa que la dependencia Equation.3 está validada o no existe; no autoriza todavía la integración en el catálogo principal.

## Incidencia `ABCABC`

Se confirma una incidencia independiente `DOCUMENT_LAYOUT_RECONSTRUCTION_ERROR` en:

- ejercicio `ade2012-m6-a-e1-61f8d5d80988`;
- modelo 6, opción A, ejercicio 1;
- DOC `sources/pau-official/andalucia/ccss-ii/2012/official-doc/exam-modelo-6.doc`;
- SHA-256 del DOC `61f8d5d809881c49e9e9212281f7028516338e026524e55d572ab691ec5f416d`;
- objeto matricial `adobj-61f8d5d809881c49-001`.

El original coloca un primer `A B C` sobre las tres columnas de la matriz `F` y un segundo `A B C` sobre las tres columnas de `G`. Word los codifica como texto espaciado anterior al objeto Equation.3. La extracción lineal preservó caracteres y orden, pero perdió coordenadas y anclajes, produciendo `A B C A B C` fuera de contexto.

No debe borrarse el literal. La representación futura necesaria es una estructura `paired-labeled-matrices` con dos elementos separados, cada uno con `matrixLabel`, `columnHeaders: [A,B,C]`, referencia al segmento correspondiente de la matriz y evidencia geométrica oficial.

## Auditoría de otras dependencias espaciales

Se revisaron los 48 ejercicios recuperados buscando encabezados de fila/columna, etiquetas próximas a matrices, flechas, anotaciones laterales y textos cuyo significado dependiera de posición.

- Incidencias confirmadas: **1**, la de `ABCABC`.
- Otras incidencias espaciales confirmadas: **0**.
- Candidato adicional revisado: una serie numérica ordenada en `ade2012-m5-a-e4-87b729cdd463`; no requiere anclaje espacial y mantiene su orden semántico.

Los huecos de fórmula observables en extracción puramente textual no se clasificaron como nuevas incidencias cuando los objetos correspondientes sí constan en `learnerBlocks`. Ningún caso ambiguo ha sido corregido automáticamente.

## Plan de corrección posterior

1. Congelar los hashes de los 45 `COINCIDE` como regresión obligatoria.
2. Corregir en la capa derivada la semántica de `mtefTemplate.variation=1` para emitir exclusivamente el delimitador izquierdo cuando así consta en MTEF.
3. Evitar que paréntesis ordinarios de llamadas `f(x)`, `g(x)`, `P(t)` y `B(t)` hereden escalado adaptativo de una estructura exterior.
4. Corregir el decodificador MTEF para que un script posterior a un grupo delimitado use todo el grupo como base, nunca solo el paréntesis de cierre.
5. Regenerar y comparar exclusivamente los diez fallos; ejecutar después regresión visual sobre los 45 correctos.
6. Tratar `ABCABC` en una fase documental de reconstrucción espacial, conservando las etiquetas y sus anclajes, sin mezclarlo con la corrección Equation.3.

## Artefactos auditables

- `human-decisions-audit.jsonl`: exportación íntegra de las 55 decisiones.
- `failure-classification.jsonl`: clasificación no destructiva de los diez fallos.
- `exercise-consequences.json`: cálculo 21/27/19/8/40.
- `spatial-layout-incidents.jsonl`: incidencia estructurada `ABCABC`.
- `spatial-layout-audit.json`: auditoría de los 48 ejercicios.
- `summary.json`: resumen y conjunto de regresión de 45 objetos.
- `manifest.json`: hashes y hash semántico de la exportación.

Todos están bajo `artifacts/equation3-human-review-result/`. El generador reproducible es `scripts/audit-equation3-human-review-result.mjs` y sus comprobaciones específicas están en `tests/equation3-human-review-result.test.mjs`.

## Criterio de cierre

La revisión humana queda cerrada y preservada, pero no autoriza integración. El estado actual es: 40 ejercicios potencialmente desbloqueables, 8 bloqueados por fallos Equation.3 y 1 incidencia documental espacial independiente pendiente. No se ha cambiado ninguna decisión humana ni ningún contenido matemático.

## Pruebas ejecutadas

- Auditoría específica del cierre humano: **5/5**.
- Regresión Node completa: **182/182**.
- Recuperación DOC 2012: **24/24** comprobaciones PowerShell.
- Cierre de cobertura oficial: **13/13**.
- Biblioteca oficial Madrid–Andalucía: **1.453/1.453**.
- Construcción canónica PAU Andalucía–Madrid: **33/33**.
- Total de pruebas y comprobaciones ejecutadas: **1.705/1.705**, 0 fallos.
- Segunda ejecución del generador: mismo hash semántico y mismo SHA-256 de la evidencia pública pseudonimizada.

# Auditoría de optimización de la revisión humana visual — Fase 2D de +MathUp

## 1. Objeto y límites

Esta auditoría estudia si puede reducirse el número de observaciones humanas previsto para las **7.064 entidades con `AUTOMATED_VISUAL_PASS`** sin convertir semejanzas aproximadas en equivalencias visuales ni rebajar las restricciones de Fase 2D.

No se asigna ningún `HUMAN_VISUAL_PASS`, no se modifica el plan anterior, no se altera ninguna entidad y no se cambia código de producción. Los tres P0 corregidos permanecen fuera de este lote y conservan su expediente independiente.

La conclusión cuantitativa es deliberadamente conservadora: existe margen de reducción, pero no es masivo. Las soluciones paso a paso, las familias sensibles y las expresiones cuya equivalencia visual no puede demostrarse siguen requiriendo observación individual.

## 2. Línea base comprobada

| Concepto | Grupos | Entidades |
|---|---:|---:|
| Grupos exactos ya existentes | 967 | 1.946 |
| Grupos paramétricos estrictos del plan anterior | 113 | 377 |
| Entidades consideradas individuales | — | 4.741 |
| **Total** | — | **7.064** |

Los 967 grupos exactos tienen 979 miembros heredables después de observar su representante. Las 4.741 entidades individuales proceden de:

- 1.021 enunciados o respuestas de riesgo P2/P3 que no encontraron pareja con la firma anterior;
- 3.720 entidades excluidas por prioridad P1, complejidad, tipo solución o familia sensible.

## 3. Método de la auditoría adicional

### 3.1 Firma visual-paramétrica auditada

Se volvió a analizar exclusivamente el conjunto de 4.741 entidades. Una agrupación nueva solo se consideró demostrable cuando todos sus miembros coincidían simultáneamente en:

1. tipo de entidad;
2. curso, materia y etapa;
3. comunidad cuando el contenido es PAU;
4. familias matemáticas ordenadas;
5. topología del documento de Fase 2C: secuencia y tipo de bloques, clase de nodo matemático cuando existe y misma política de representación;
6. ruta del campo y clase de representación;
7. operadores, relaciones, delimitadores y saltos de línea;
8. estructura léxica, permitiendo sustituir únicamente tokens numéricos y variables simples controladas;
9. nivel de complejidad y número lógico de líneas;
10. en cada anchura 320, 375, 768 y 1.280 px: igual número de líneas renderizadas, igual número de rectángulos, igual altura de composición, igual anchura de cliente y desplazamiento, misma familia tipográfica y tamaño de fuente;
11. ausencia en todos los miembros de overflow, recorte, solapamiento, contenido oculto, recurso ausente, glifo ausente, JSON crudo y LaTeX crudo.

La anchura exacta del contenido puede variar al cambiar un coeficiente, pero no su topología de línea ni su altura. Esta excepción es necesaria para que `8`, `120` o una coordenada distinta puedan pertenecer a una misma plantilla solo cuando las cuatro ejecuciones demuestran que no cambian la composición.

### 3.2 Parametrización admitida

Se admiten únicamente:

- números y coeficientes completos;
- variables simples aisladas;
- coordenadas y extremos de intervalos conservando operadores y delimitadores;
- exponentes numéricos con la misma clase tipográfica y la misma geometría final;
- unidades solo cuando se conserva su estructura léxica y la geometría coincide.

No se normalizan palabras arbitrarias, operadores, signos, funciones, delimitadores ni frases. Tampoco se agrupan dos expresiones por compartir tema o familia.

### 3.3 Fuentes y glifos

La firma conserva la fuente y tamaño declarados por el arnés. Los glifos no paramétricos y símbolos Unicode permanecen literalmente en la firma. Los tokens parametrizados conservan su clase: dígito, superíndice numérico o identificador latino simple. Un cambio de fuente, CSS, normalizador, serializador o arnés invalida la firma y cualquier propagación.

### 3.4 Dos perímetros de admisión

Se calcularon dos perímetros:

- **perímetro máximo**: solo enunciados/respuestas P2/P3, complejidad baja o media y ninguna familia sensible;
- **perímetro equilibrado**: añade enunciados/respuestas P1 de complejidad baja o media cuya causa P1 sea una familia simple —principalmente potencia/raíz, fracción simple, unidades o contenido PAU—, pero mantiene excluidas todas las soluciones y las familias sensibles enumeradas en el apartado 5.

## 4. Resultado de la reagrupación

### 4.1 Perímetro máximo

De las 4.741 entidades individuales:

- **34 entidades** forman **15 grupos nuevos**;
- distribución: 13 grupos de 2 y 2 grupos de 4;
- **4.707 entidades** continúan requiriendo observación individual.

Esta regla apenas reduce trabajo porque la firma anterior ya había capturado la mayoría de sustituciones numéricas simples.

### 4.2 Perímetro equilibrado

Manteniendo las restricciones de topología y geometría, pero admitiendo P1 simple con testigos múltiples:

- **824 entidades** pueden organizarse en **203 grupos nuevos**;
- **3.917 entidades** siguen siendo individuales;
- 790 de las 824 entidades son P1 y 34 son P2/P3;
- 499 son enunciados y 325 respuestas;
- ninguna es una solución.

Distribución de los grupos nuevos:

| Tamaño | Grupos | Entidades |
|---:|---:|---:|
| 2 | 74 | 148 |
| 3 | 48 | 144 |
| 4 | 28 | 112 |
| 5 | 20 | 100 |
| 6 | 11 | 66 |
| 7 | 6 | 42 |
| 8 | 10 | 80 |
| 9 | 1 | 9 |
| 12 | 1 | 12 |
| 14 | 1 | 14 |
| 19 | 1 | 19 |
| 24 | 1 | 24 |
| 54 | 1 | 54 |
| **Total** | **203** | **824** |

Familias presentes en estos grupos —una entidad puede pertenecer a más de una—:

| Familia | Grupos | Entidades |
|---|---:|---:|
| Potencias/raíces | 165 | 711 |
| Ecuaciones | 42 | 140 |
| Fracción simple | 23 | 79 |
| Unidades | 23 | 178 |
| Aproximación/implicación | 3 | 11 |
| Inecuación | 3 | 6 |
| Griegos | 1 | 8 |
| Subíndices | 2 | 5 |

Estos datos no autorizan todavía propagación. Identifican grupos candidatos cuya admisión depende de los testigos humanos y del control posterior.

## 5. Familias sensibles y alto riesgo

Permanecen fuera de toda agrupación paramétrica nueva:

- integrales definidas e indefinidas complejas;
- límites;
- matrices;
- determinantes;
- sistemas;
- vectores;
- funciones a trozos;
- fracciones complejas;
- expresiones multilínea;
- soluciones paso a paso.

Las reutilizaciones **exactamente iguales** de estas familias ya están dentro de los 967 grupos exactos. Entre las 4.741 singulares no queda una segunda representación exacta reutilizable: si la hubiera, no sería singular según la firma de Fase 2D.

En el escenario de máximo rigor, todo P1 continúa siendo individual aunque su firma paramétrica coincida. En el equilibrado solo se admite P1 simple, nunca una de las estructuras anteriores ni una solución.

## 6. Testigos humanos múltiples

### 6.1 Selección determinista

Para cada grupo paramétrico se ordenan los miembros por una tupla estable de:

1. anchura máxima de contenido;
2. profundidad/topología matemática;
3. longitud literal;
4. `inputHash`.

Los testigos se eligen así:

- grupos de 2: ambos;
- grupos de 3: los tres;
- grupos de 4 a 9: mínimo, mediana y máximo;
- grupos de 10 o más: mínimo, mediana, máximo y un caso pseudoaleatorio determinista;
- en el perímetro máximo se utiliza una política aún más conservadora: cuatro testigos entre 6 y 12 miembros y cinco por encima de 12.

El caso pseudoaleatorio deriva de `SHA-256(groupId + policyVersion + populationDigest)`, por lo que puede reproducirse sin elección manual.

### 6.2 Efecto cuantitativo

Aplicada a los 203 grupos equilibrados, la política requiere **540 testigos directos** y deja inicialmente 284 miembros propagables. Aplicada con el nivel máximo requiere 572 testigos y deja 252 miembros propagables.

En los 113 grupos paramétricos ya previstos por el plan anterior, la política máxima elevaría los testigos de 226 a 295 y dejaría 82 miembros propagables.

### 6.3 Condición de herencia

Un grupo solo puede heredar dictamen si todos sus testigos reciben una aprobación humana explícita y concordante. Los no observados reciben `INHERITED_HUMAN_VISUAL_PASS`, nunca `HUMAN_VISUAL_PASS`.

Si un testigo falla o queda como fuente dudosa:

1. se registra `GROUP_PROPAGATION_REVOKED`;
2. se invalidan todos los dictámenes heredados del grupo;
3. se divide el grupo por el atributo que explicó la divergencia, si puede demostrarse;
4. si no puede demostrarse una partición objetiva, todos sus miembros pasan a revisión individual.

## 7. Auditoría aleatoria posterior

### 7.1 Diseño

Después de los testigos, se selecciona una muestra determinista de miembros provisionalmente heredados, estratificada por:

- grupo exacto o paramétrico;
- prioridad;
- curso/materia;
- tipo de entidad;
- familia;
- PAU, asignatura y comunidad;
- anchura que produjo la menor holgura.

El escenario máximo revisa aproximadamente el 10 % de los heredados de cada clase de grupo. El equilibrado revisa el 5 %, redondeando hacia arriba por clase y garantizando todas las coberturas obligatorias.

### 7.2 Umbrales y revocación

Se usa aceptación con tolerancia cero dentro de cada estrato homogéneo:

- cualquier fallo revoca inmediatamente el grupo del caso fallido;
- cualquier fallo crítico —contenido crudo, recorte, solapamiento, ocultación o glifo/recurso ausente— suspende la propagación de todo su estrato;
- una tasa observada superior al **1 %**, o dos fallos aunque el porcentaje sea menor, invalida la política de propagación para la familia/estrato y obliga a revisar sus heredados;
- la muestra no sustituye jamás la revisión individual de alto riesgo.

El 1 % es un umbral operativo de alarma, no una afirmación estadística de prevalencia. La regla de tolerancia cero por estrato evita interpretar una muestra pequeña como certificación universal.

## 8. Escenarios recalculados

### 8.1 A — Máximo rigor práctico

Mantiene todos los P1 y todas las soluciones como individuales. Usa los 15 grupos P2/P3 nuevos, testigos reforzados y auditoría posterior del 10 %.

| Componente | Observaciones directas |
|---|---:|
| Representantes de 967 grupos exactos | 967 |
| Auditoría posterior de grupos exactos | 98 |
| Testigos reforzados de los 113 grupos paramétricos anteriores | 295 |
| Auditoría posterior de sus heredados | 9 |
| Testigos de los 15 grupos nuevos | 32 |
| Auditoría de todos sus miembros inicialmente heredados | 2 |
| Singulares restantes | 4.707 |
| **Total** | **6.110** |

- Entidades revisadas directamente: **6.110**.
- Entidades cubiertas por propagación después del muestreo: **954**.
- Entidades cubiertas totales: **7.064**.
- Grupos exactos: 967.
- Grupos paramétricos: 128 —113 anteriores y 15 nuevos—.
- Singulares restantes: 4.707.
- Riesgo residual: bajo; subsiste el riesgo de que miembros exactos no muestreados exhiban un defecto de juicio no detectado, controlado por hashes, estratos y revocación.
- Resultado operativo: es 79 observaciones más costoso que el plan actual; la mayor multiplicidad de testigos impide obtener ahorro.

### 8.2 B — Equilibrado

Admite los 203 grupos nuevos, incluidos P1 simples de baja/media complejidad, pero mantiene individuales las familias sensibles y todas las soluciones. Usa dos testigos en los grupos paramétricos anteriores, la política 2/3/3/4 en los nuevos y una muestra posterior del 5 %.

| Componente | Observaciones directas |
|---|---:|
| Representantes de 967 grupos exactos | 967 |
| Auditoría posterior exacta | 49 |
| Dos testigos de los 113 grupos anteriores | 226 |
| Auditoría posterior de esos grupos | 8 |
| Testigos de los 203 grupos nuevos | 540 |
| Auditoría posterior de esos grupos | 15 |
| Singulares restantes | 3.917 |
| **Total** | **5.722** |

- Entidades revisadas directamente: **5.722**.
- Entidades cubiertas por propagación después del muestreo: **1.342**.
- Entidades cubiertas totales: **7.064**.
- Grupos exactos: 967.
- Grupos paramétricos: 316 —113 anteriores y 203 nuevos—.
- Singulares restantes: 3.917.
- Riesgo residual: moderado-bajo, superior al escenario A porque 790 P1 simples participan en agrupación; mitigado mediante varios testigos, cuatro geometrías, muestreo estratificado y revocación con tolerancia cero.
- Ahorro frente al plan actual: **309 observaciones**, un 5,1 %.

### 8.3 C — Plan actual

| Métrica | Valor |
|---|---:|
| Observaciones humanas | 6.031 |
| Entidades directas | 6.031 |
| Entidades propagadas | 1.033 |
| Entidades cubiertas | 7.064 |
| Grupos exactos | 967 |
| Grupos paramétricos | 113 |
| Singulares individuales | 4.741 |

El plan actual utiliza un segundo testigo en los 113 grupos paramétricos y 97 testigos adicionales en grupos exactos. Su riesgo es bajo, pero no aprovecha las 203 agrupaciones adicionales aquí identificadas.

### 8.4 Comparación

| Escenario | Observaciones | Cobertura | Propagadas | Diferencia frente a 6.031 |
|---|---:|---:|---:|---:|
| A. Máximo rigor práctico | 6.110 | 7.064 | 954 | +79 |
| B. Equilibrado | 5.722 | 7.064 | 1.342 | **−309** |
| C. Plan actual | 6.031 | 7.064 | 1.033 | 0 |

## 9. Cobertura obligatoria del escenario equilibrado

La selección de testigos y muestra posterior debe comprobar programáticamente, antes de abrir la revisión, que existen casos directos para:

- todos los cursos;
- enunciado, respuesta y solución —las soluciones permanecen individuales—;
- todas las familias presentes;
- Matemáticas II y CCSS II;
- Castilla-La Mancha y Madrid;
- móvil 320/375 y escritorio 768/1.280;
- cada nivel P1/P2/P3;
- cada clase de representación.

Si una celda obligatoria no queda cubierta por los testigos calculados, se añade el miembro determinista de mayor riesgo de esa celda. La cifra 5.722 ya reserva 72 observaciones de auditoría posterior —49 exactas, 8 de grupos anteriores y 15 de grupos nuevos—; esas observaciones deben elegirse para completar la matriz sin duplicar casos directos.

## 10. Riesgos y límites

1. **La geometría no certifica convencionalidad matemática.** Por ello ninguna agrupación produce aprobación automática.
2. **AST parcial.** Parte del catálogo conserva literales de evidencia y no dispone de un AST semántico rico; en esos casos la firma usa topología de bloques y léxico matemático conservador. Esta limitación impide agrupar más.
3. **P1 simple.** El escenario equilibrado agrupa 790 entidades P1 no sensibles. Es defendible solo con testigos múltiples y revocación; quien quiera evitar ese riesgo debe elegir A o el plan actual.
4. **Dependencia del entorno.** Un cambio de CSS, fuente, navegador, DPR, normalizador o serializador invalida firmas y dictámenes heredados.
5. **Grupos grandes.** Los grupos de 14, 19, 24 y 54 requieren extremos, mediana, testigo determinista y muestreo posterior; no basta un representante.
6. **Fuente dudosa.** Cualquier dictamen `FUENTE DUDOSA` impide herencia aunque la geometría coincida.
7. **No existe reducción drástica demostrable.** Aun en el escenario equilibrado son necesarias 5.722 observaciones. Reducir a cientos o pocos miles exigiría propagar entre textos, soluciones o estructuras no equivalentes y rebajaría el rigor.

## 11. Recomendación

El escenario **B equilibrado, con 5.722 observaciones**, es la máxima reducción que esta auditoría considera defendible con la evidencia disponible. Ahorra 309 observaciones respecto al plan actual, mantiene revisión individual de soluciones y familias sensibles, y añade controles explícitos de testigos y revocación.

Si la prioridad absoluta es no propagar ningún P1, debe conservarse el plan actual: el escenario A no mejora su coste. La conclusión principal es que la carga humana continúa necesariamente en miles de casos porque 3.917 entidades no admiten equivalencia visual-paramétrica demostrable.

## 12. Condiciones previas a cualquier ejecución futura

Antes de iniciar revisión humana deberán versionarse la política de firma, la política de testigos y la semilla de muestreo; generar un manifiesto con miembros y hashes; verificar las coberturas; y garantizar técnicamente que ningún script pueda emitir `HUMAN_VISUAL_PASS`. Este documento no ejecuta ninguna de esas acciones.

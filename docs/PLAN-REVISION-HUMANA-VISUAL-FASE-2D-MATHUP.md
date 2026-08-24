# Plan de revisión humana visual de Fase 2D para +MathUp

## 1. Propósito y límites

Este documento diseña un procedimiento práctico para emitir posteriormente dictámenes humanos sobre las **7.064 entidades con `AUTOMATED_VISUAL_PASS`** de Fase 2D, reduciendo el número de observaciones humanas sin rebajar la trazabilidad ni los criterios visuales aprobados.

Este plan no registra ninguna aprobación humana, no cambia decisiones existentes y no modifica la aplicación ni el catálogo. Un script puede preparar casos, medir cobertura, comprobar hashes y registrar una acción explícita de una persona, pero **nunca puede asignar por sí mismo `HUMAN_VISUAL_PASS`**.

La corrección aislada de los tres P0 `RAW_LATEX_VISIBLE` queda fuera de este lote de 7.064. Esos tres casos eran singulares en el censo original y mantienen su punto de control propio. Su corrección técnica no equivale todavía a aprobación humana.

## 2. Línea base cuantitativa

Los cálculos proceden de:

- `artifacts/fase2d/runs/run-a/population.jsonl`;
- `artifacts/fase2d/runs/run-a/render-groups.jsonl`;
- `artifacts/fase2d/runs/run-a/geometry-results.jsonl`;
- manifiestos, coberturas y decisiones visuales de Fase 2D;
- punto de control de la corrección de los tres P0.

| Concepto | Cantidad |
|---|---:|
| Entidades con `AUTOMATED_VISUAL_PASS` objeto de este plan | 7.064 |
| Grupos visuales exactos | 967 |
| Entidades contenidas en grupos exactos | 1.946 |
| Representantes exactos que habría que revisar | 967 |
| Ahorro máximo demostrable por identidad visual exacta | 979 observaciones |
| Entidades singulares del censo original | 5.121 |
| P0 singulares tratados por separado | 3 |
| Entidades singulares pendientes en este lote | 5.118 |
| Prioridad P1 pendiente | 5.403 |
| Prioridad P2 pendiente | 444 |
| Prioridad P3 pendiente | 1.217 |

Distribución de los grupos exactos:

| Miembros por grupo | Número de grupos | Entidades |
|---:|---:|---:|
| 2 | 956 | 1.912 |
| 3 | 10 | 30 |
| 4 | 1 | 4 |
| **Total** | **967** | **1.946** |

Por tanto, sin crear grupos adicionales, revisar un representante de cada grupo exacto y cada singular exigiría **6.085 observaciones humanas**: `967 + 5.118`.

## 3. Unidad de revisión y estados

La unidad revisable será un `visualEntityId` fijado por:

- hash del literal de entrada;
- hash de la representación;
- firma de renderizado;
- versión del arnés, CSS, fuentes y motor;
- capturas o regeneración determinista en 320, 375, 768 y 1.280 px;
- curso, materia, tipo de entidad, familias y procedencia PAU.

Estados conceptuales de la hoja:

- **`APROBAR`**: acción humana explícita. Produce `HUMAN_VISUAL_PASS` solo para el caso observado; en miembros no observados de un grupo autorizado produce un estado separado, `INHERITED_HUMAN_VISUAL_PASS`.
- **`REVISAR/FALLO`**: existe un defecto de representación, legibilidad, proporción, composición, corte, solapamiento o convencionalidad. No se propaga ningún aprobado.
- **`FUENTE DUDOSA`**: la persona no puede decidir la corrección visual sin contrastar el original. Deriva a `SOURCE_REVIEW_REQUIRED`, no a fallo de renderizado.

Toda decisión debe registrar persona revisora, fecha, caso observado, hashes, resoluciones vistas y comentario opcional. Una decisión sin identidad humana explícita permanece `PENDING_HUMAN_REVIEW`.

## 4. Propagación en los 967 grupos exactos

Los 967 grupos exactos contienen 1.946 entidades y requieren 967 representantes. Su firma acredita igualdad exacta de la representación que llega al arnés; no se trata de mera semejanza matemática.

### 4.1 Propagación autorizable

Un dictamen visual puede heredarse después cuando se cumplan simultáneamente estas condiciones:

1. el representante recibe `HUMAN_VISUAL_PASS` explícito;
2. todos los miembros conservan el mismo `renderSignature` y la misma representación derivada;
3. coinciden arnés, CSS, fuentes, motor y las cuatro resoluciones;
4. ningún miembro tiene fallo automático, hash cambiado o revisión de fuente pendiente;
5. la herencia se registra como `INHERITED_HUMAN_VISUAL_PASS`, nunca fingiendo una observación directa;
6. la hoja muestra todas las entidades, cursos y procedencias cubiertas por el representante.

Con estas garantías, las 979 entidades no representantes pueden heredar exclusivamente el **dictamen de presentación visual**. No heredan corrección matemática, calidad pedagógica ni validez de la fuente.

### 4.2 Casos que no admiten propagación

No se propagará por:

- coincidencia de familia, AST, plantilla, geometría o aspecto aproximado sin igualdad de firma;
- similitud estructural entre fórmulas matemáticamente distintas;
- pertenencia al mismo tema, curso, año PAU o banco;
- una captura parecida con hashes diferentes;
- una entidad con `SOURCE_REVIEW_REQUIRED`;
- una representación o fuente modificada después del dictamen;
- una familia paramétrica que no cumpla el contrato estricto del apartado 5;
- una decisión `FUENTE DUDOSA` o `REVISAR/FALLO`.

## 5. Tratamiento de las entidades singulares

### 5.1 Censo pendiente

De las 5.121 singulares originales, tres corresponden a los P0 corregidos y quedan fuera del lote. Las **5.118 singulares pendientes** se dividen así:

- **4.741 requieren observación individual** bajo la política mínima segura;
- **377 pueden reorganizarse provisionalmente en 113 grupos paramétricos demostrables**;
- esos 113 grupos permiten sustituir 377 observaciones por 113 representantes, ahorrando 264 observaciones.

### 5.2 Contrato estricto de grupo paramétrico

La agrupación paramétrica solo será admisible si todos sus miembros cumplen:

1. son enunciados o respuestas; nunca soluciones;
2. prioridad P2 o P3;
3. complejidad baja o media;
4. no contienen ninguna familia sensible definida en el apartado 8;
5. mismo tipo de entidad, curso, materia, etapa y —si es PAU— comunidad;
6. mismas familias, ruta de campo, tipo de representación, prioridad y razones de selección;
7. mismo número de líneas y misma longitud literal;
8. mismo esqueleto literal al sustituir **solo cada cifra decimal individual** por un marcador, conservando signos, cantidad de cifras, separadores, variables, operadores y texto;
9. la misma huella geométrica en 320, 375, 768 y 1.280 px;
10. ninguna incidencia automática ni de fuente.

No se parametrizan letras, operadores, signos, funciones, delimitadores ni estructuras. La regla agrupa únicamente sustituciones numéricas de idéntica forma y geometría comprobada.

Resultado reproducible de esta regla:

| Tipo | Grupos paramétricos | Entidades cubiertas |
|---|---:|---:|
| Enunciado | 77 | 276 |
| Respuesta | 36 | 101 |
| **Total** | **113** | **377** |

Distribución por tamaño:

| Miembros | Grupos |
|---:|---:|
| 2 | 56 |
| 3 | 25 |
| 4 | 11 |
| 5 | 9 |
| 6 | 1 |
| 7 | 3 |
| 8 | 4 |
| 9 | 1 |
| 10 | 1 |
| 11 | 1 |
| 12 | 1 |

Cobertura por curso de los grupos paramétricos:

| Curso | Grupos | Entidades |
|---|---:|---:|
| 1.º ESO | 26 | 74 |
| 2.º ESO | 19 | 64 |
| 3.º ESO | 13 | 34 |
| 4.º ESO A | 18 | 89 |
| 4.º ESO B | 19 | 65 |
| 1.º Bachillerato Matemáticas I | 1 | 3 |
| 1.º Bachillerato CCSS I | 8 | 30 |
| 2.º Bachillerato Matemáticas II | 2 | 4 |
| 2.º Bachillerato CCSS II | 7 | 14 |
| **Total** | **113** | **377** |

Las 1.021 entidades que formalmente cumplen la elegibilidad básica pero no encuentran un segundo miembro idéntico bajo este contrato siguen siendo individuales. También son individuales 3.720 entidades excluidas por prioridad, complejidad, tipo o familia sensible. Total individual: **4.741**.

## 6. Escenarios de trabajo humano

### 6.1 Escenario mínimo seguro

| Componente | Observaciones directas | Entidades cubiertas |
|---|---:|---:|
| Representantes de grupos exactos | 967 | 1.946 |
| Representantes de grupos paramétricos estrictos | 113 | 377 |
| Singulares individuales | 4.741 | 4.741 |
| **Total** | **5.821** | **7.064** |

- Dictámenes directos: 5.821.
- Dictámenes heredados previstos: 1.243 (`979` exactos + `264` paramétricos).
- Riesgo residual: dependencia de una única observación humana en cada grupo y ausencia de una comprobación muestral independiente del mecanismo de agrupación paramétrica.
- Es el menor número defendible con los datos actuales. Bajar de 5.821 obligaría a extrapolar entre entidades sin equivalencia visual demostrada.

### 6.2 Escenario recomendado

Parte del escenario mínimo y añade:

- un segundo miembro observado en cada uno de los 113 grupos paramétricos;
- una muestra secundaria estratificada de 97 grupos exactos: 86 de los 859 grupos exactos de mayor riesgo y 11 de los 108 restantes;
- selección determinista de esas 97 comprobaciones, cubriendo curso, materia, tipo, familia, Matemáticas II, CCSS II, Castilla-La Mancha y Madrid.

| Componente | Observaciones directas | Entidades cubiertas |
|---|---:|---:|
| Escenario mínimo | 5.821 | 7.064 |
| Segundo testigo en 113 grupos paramétricos | 113 | ya incluidas |
| Segundo testigo en 97 grupos exactos | 97 | ya incluidas |
| **Total recomendado** | **6.031** | **7.064** |

- Dictámenes directos: 6.031.
- Entidades cubiertas: 7.064.
- Entidades finalmente heredadas: 1.033.
- Riesgo residual: quedan miembros no observados dentro de grupos con identidad o parametrización demostrada; el riesgo se limita al error del agrupador o a una diferencia de entorno posterior, ambos detectables por hashes e invalidación automática.
- Este es el escenario recomendado porque valida con dos ejemplos todos los grupos paramétricos y audita de forma estratificada aproximadamente el 10 % de los grupos exactos.

### 6.3 Revisión individual completa

| Observaciones directas | Entidades cubiertas | Heredadas |
|---:|---:|---:|
| **7.064** | **7.064** | 0 |

- Riesgo residual de propagación: ninguno.
- Persisten los riesgos propios del juicio humano, fatiga, inconsistencia entre revisores y diferencia futura respecto al runtime de preproducción.

## 7. Cobertura obligatoria del escenario recomendado

El orden de la cola y los testigos adicionales se calcularán para demostrar cobertura explícita de:

- todos los cursos: 1.º, 2.º, 3.º, 4.º ESO A/B; Matemáticas I; CCSS I; Matemáticas II; CCSS II;
- `statement`, `answer` y `solution`;
- todas las familias presentes en el censo;
- prioridades P1, P2 y P3;
- Matemáticas II y CCSS II por separado;
- PAU de Castilla-La Mancha y Madrid;
- cada comunidad adicional presente, sin inferir metadatos ausentes;
- vista móvil de 320 px y escritorio de 1.280 px en toda observación;
- métricas y regeneración disponible para 375 y 768 px;
- casos de varias familias, varias líneas, longitud extrema y soluciones paso a paso.

Una matriz de cobertura debe acompañar la cola. Ningún estrato obligatorio puede quedar cubierto únicamente por un grupo cuya propagación haya sido revocada.

## 8. Política estricta para familias sensibles

Se consideran sensibles:

- integrales definidas e indefinidas;
- límites;
- matrices;
- determinantes;
- sistemas;
- vectores;
- funciones a trozos;
- fracciones complejas;
- expresiones multilínea;
- toda solución paso a paso.

Reglas:

1. una entidad singular sensible se revisa individualmente;
2. una solución singular nunca entra en grupo paramétrico;
3. las familias sensibles solo heredan dentro de un grupo **exacto**, nunca por parecido estructural;
4. el escenario recomendado concentra 86 de sus 97 testigos exactos adicionales en grupos P1, soluciones o familias sensibles;
5. la hoja obliga a comprobar 320 y 1.280 px lado a lado y permite abrir 375/768 bajo demanda;
6. en soluciones se inspecciona cada paso, alineación, salto de línea, delimitador, operador y resultado final visible;
7. cualquier duda sobre el significado o la fuente se clasifica como `FUENTE DUDOSA`, no se resuelve visualmente.

La revisión humana visual no certifica la corrección matemática. Comprueba que lo representado es convencional, legible y coherente con el literal/árbol disponible.

## 9. Hoja práctica de revisión

La herramienta será local y aislada, sin conexión con el runtime público. Cada ficha mostrará:

### Cabecera

- `visualEntityId`, `entityId`, `exerciseId` y hashes;
- prioridad y motivos;
- curso, materia, tema y tipo de entidad;
- familias matemáticas;
- PAU, comunidad, año y convocatoria cuando consten;
- grupo, representante, tipo de grupo y número de entidades cubiertas;
- lista resumida de estratos que heredarán el dictamen.

### Área visual

- móvil 320 px y escritorio 1.280 px simultáneamente;
- acceso rápido a 375 y 768 px;
- expresión aislada y contexto suficiente para reconocer enunciado, respuesta o paso de solución;
- aviso visible si la imagen fue regenerada con entorno distinto;
- controles para ampliar sin alterar el CSS auditado.

### Lista de comprobación

- notación convencional y reconocible;
- tamaño y proporción de operadores;
- exponentes, subíndices, radicales y delimitadores;
- alineación de matrices, determinantes, sistemas y piezas;
- posición de límites, índices y flechas;
- saltos de línea y lectura de soluciones;
- ausencia de LaTeX/JSON crudo, recorte, overflow, solapamiento y contenido oculto;
- coherencia visual entre móvil y escritorio.

### Decisión

- `APROBAR`;
- `REVISAR/FALLO` con motivo obligatorio;
- `FUENTE DUDOSA` con motivo obligatorio.

La aplicación local no habilitará aprobación masiva sin abrir la ficha. No tendrá una ruta automática que genere `HUMAN_VISUAL_PASS`.

## 10. Propagación, revocación y ampliación

### 10.1 Flujo de aprobación

1. el grupo empieza `PENDING_HUMAN_REVIEW`;
2. una persona abre el representante y registra una decisión;
3. en el escenario recomendado, los grupos paramétricos requieren dos testigos concordantes;
4. solo entonces se crea una relación de herencia con hashes y regla aplicada;
5. el representante conserva `HUMAN_VISUAL_PASS`; los no observados reciben `INHERITED_HUMAN_VISUAL_PASS`.

### 10.2 Revocación

Si un representante o testigo falla:

1. se marca `GROUP_PROPAGATION_REVOKED`;
2. se eliminan o invalidan todos los estados heredados del grupo, conservando el historial;
3. ningún miembro queda aprobado por asociación;
4. un grupo paramétrico se amplía inmediatamente a revisión individual de todos sus miembros;
5. un grupo exacto con fallo visual se considera afectado íntegramente por compartir representación; tras una corrección deberá regenerarse y revisarse de nuevo;
6. una duda de fuente se aísla por procedencia: invalida la aprobación editorial del miembro afectado y no convierte automáticamente una fuente distinta en dudosa;
7. cualquier cambio de literal, representación, CSS, fuentes, arnés o motor invalida la propagación y devuelve los miembros a pendientes.

Si los dos testigos de un grupo paramétrico discrepan, no se elige por mayoría: se revoca la agrupación y se revisan todos sus miembros.

## 11. Orden operativo recomendado

1. **P1 sensible y soluciones**: matrices, determinantes, sistemas, integrales, límites, vectores, piezas, fracciones complejas y multilínea.
2. **PAU**: Matemáticas II y CCSS II, separadas por Castilla-La Mancha, Madrid y demás procedencias verificadas.
3. **Resto de P1**: composiciones multifamilia y casos extremos.
4. **P2**: representantes exactos, singulares y testigos paramétricos.
5. **P3**: casos simples y grupos paramétricos.
6. **Auditoría secundaria recomendada**: 97 testigos exactos estratificados.

El trabajo se dividirá en lotes breves para reducir fatiga. El sistema mostrará concordancia por revisor y reabrirá una muestra si se detecta una tasa anómala de fallos o desacuerdos.

## 12. Evidencia y reproducibilidad

Se conservarán:

- manifiesto de cola y algoritmo/semilla de selección;
- identidad y hashes de cada caso observado;
- decisiones humanas firmadas lógicamente por revisor y fecha;
- relaciones de herencia y revocación;
- matriz de cobertura antes/después;
- capturas de fallos, dudas, casos sensibles y muestras representativas;
- métricas de las cuatro resoluciones;
- capacidad de regenerar las restantes capturas bajo demanda.

No es necesario versionar una captura por entidad si el manifiesto permite regenerarla exactamente. Sí deben conservarse las evidencias de fallos, discrepancias y decisiones singulares.

## 13. Criterios para iniciar y cerrar la revisión futura

Antes de empezar:

- congelar hashes de población, grupos, CSS, fuentes y arnés;
- regenerar los tres P0 corregidos y mantenerlos fuera de este lote;
- generar la cola del escenario elegido y su matriz de cobertura;
- verificar que ningún script puede emitir `HUMAN_VISUAL_PASS`.

Para cerrar el escenario recomendado:

- 6.031 observaciones humanas explícitas completadas;
- 7.064 entidades con decisión directa o herencia válida;
- 113 grupos paramétricos con dos testigos concordantes o revisión ampliada;
- 97 testigos exactos secundarios completados;
- cobertura de todos los cursos, tipos, familias y procedencias obligatorias;
- cero propagaciones activas desde un grupo fallido, dudoso o con hash cambiado;
- todos los fallos y dudas en colas trazables;
- prueba posterior de preproducción aún pendiente antes de publicar, usando el motor, CSS, fuentes y componentes finales del alumnado.

## 14. Riesgos residuales

- El arnés aislado no certifica todavía el runtime público.
- El juicio humano puede ser inconsistente; se mitiga con listas de comprobación, lotes breves y testigos dobles.
- La parametrización numérica podría contener un error de implementación; se mitiga exigiendo misma geometría en cuatro resoluciones, dos testigos y revocación completa ante discrepancia.
- Un aprobado visual no demuestra corrección matemática ni fidelidad de una fuente deteriorada.
- Cambiar fuentes, CSS, motor o componentes invalida la certificación y exige prueba de preproducción.

## 15. Recomendación

Adoptar el escenario **recomendado de 6.031 observaciones humanas**. Reduce 1.033 observaciones respecto a la revisión individual completa, conserva cobertura de las 7.064 entidades y añade controles independientes sobre todos los grupos paramétricos y una muestra estratificada de los grupos exactos. El escenario mínimo de 5.821 es defendible, pero deja mayor dependencia de un único representante por grupo.

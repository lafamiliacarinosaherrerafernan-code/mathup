# Auditoría de integridad de identidades y notación — Fase 2B de +MathUp

Fecha de auditoría: 24 de agosto de 2026  
Naturaleza: diagnóstico de solo lectura sobre las salidas de Fase 2B  
Entrada principal: `artifacts/fase2b/runs/run-a/`  
Producción, bancos, Supabase, renderizadores y skills: no modificados

## 1. Dictamen ejecutivo

La diferencia entre 6.680 candidatos v1 y 7.485 ejercicios v2 queda cerrada aritmética y documentalmente, pero no equivale a 805 ejercicios matemáticos nuevos demostrados:

`6.680 + 788 enunciados normalizados distintos recuperados + 17 apariciones duplicadas + 0 expansiones inexplicadas = 7.485`

Las 30 redirecciones marcadas como `SPLIT` por Fase 2B se reclasifican tras revisar sus destinos:

- 27 `SPLIT_JUSTIFIED`;
- 3 `DUPLICATE_RELATION`;
- 0 `UNEXPLAINED_EXPANSION`.

Por tanto, se cumple el criterio estricto de que no exista expansión inexplicada. No obstante, 17 destinos no deben presentarse como ejercicios matemáticos distintos: son apariciones de enunciados exactamente iguales conservadas por proceder de familias o rutas fuente diferentes. Deben mantenerse como relaciones de duplicado pendientes de una decisión posterior, sin eliminar evidencia.

La auditoría de representación no permite declarar todavía el catálogo v2 listo para mostrarse al alumno. Se han auditado 16.783 entidades: 7.485 enunciados, 4.649 respuestas y 4.649 soluciones. El diagnóstico primario, exclusivo por entidad, es:

| Diagnóstico | Entidades |
|---|---:|
| `SOURCE_CORRUPTION` | 883 |
| `CANONICAL_STRUCTURE_ERROR` | 3.756 |
| `LATEX_OR_MATH_SYNTAX_ERROR` | 0 |
| `RENDERING_RISK` | 7.525 |
| `DISPLAY_CONFIRMED` | 4.619 |
| **Total** | **16.783** |

`DISPLAY_CONFIRMED` solo significa que la estructura de datos encontrada es suficiente para una futura representación; no afirma que se haya comprobado visualmente. No se ha ejecutado ni modificado el renderizador público.

## 2. Metodología y límites

Se cruzaron, sin alterar, los siguientes artefactos:

- los 6.680 candidatos canónicos v1 de Fase 2;
- las 6.680 filas de migración v1→v2;
- el registro de redirecciones de identidad;
- los 7.485 ejercicios v2;
- los 4.649 registros de respuesta;
- las 4.649 soluciones;
- los 15.527 registros del inventario original de Fase 0.

Para identidad se exigió, por cada destino, enunciado no vacío, vínculo a `sourceRecordId`, evidencia en el inventario y backlink al candidato v1. La igualdad exacta de enunciados se usa únicamente como evidencia documental de duplicación; no se presume equivalencia matemática entre textos distintos.

Para notación se revisaron texto canónico, texto fuente, bloques, representaciones declaradas y su contenido real. Una etiqueta `mathml` solo se considera MathML si contiene un elemento `<math>`; una etiqueta `image` solo se considera imagen si contiene una ruta, URL, `data:image` o referencia de archivo reconocible. Se analizaron también delimitadores, comandos, entornos, caracteres deteriorados y familias de operadores. Las reglas son conservadoras: detectan riesgos y pérdidas estructurales, pero no sustituyen una revisión visual ni matemática humana.

## 3. Conciliación completa de identidades

La conciliación exhaustiva está en `artifacts/fase2b-integrity-audit/identity-reconciliation.jsonl`. Contiene para las 6.680 identidades:

`oldCandidateId → oldExerciseId → exerciseId v2 → enunciado → curso/materia/tema → sourceRecordId → archivo/ruta fuente → motivo → clasificación`.

### 3.1 Distribución de los 30 SPLIT heredados

| Destinos v2 de una identidad v1 | Casos |
|---:|---:|
| 2 | 10 |
| 3 | 10 |
| 30 | 1 |
| 33 | 1 |
| 62 | 1 |
| 63 | 2 |
| 93 | 1 |
| 99 | 1 |
| 100 | 1 |
| 111 | 1 |
| 131 | 1 |
| **Total** | **30** |

Los 30 candidatos v1 reunían 835 destinos v2. Entre esos destinos existen 818 enunciados normalizados distintos. Al descontar las 30 identidades v1 que ya actuaban como base, los enunciados distintos explican 788 unidades de expansión. Las 17 restantes son excedente de duplicación exacta.

### 3.2 Casos con relación de duplicado

| `oldCandidateId` | Destinos | Enunciados distintos | Excedente duplicado |
|---|---:|---:|---:|
| `cand-7a3c6615-1df0-5a03-8343-871076b028d5` | 111 | 110 | 1 |
| `cand-8a6a0c68-8d28-563e-86f2-4dbe7efa25b9` | 131 | 116 | 15 |
| `cand-93ec61fe-3e54-5821-98d8-5f5eda928647` | 62 | 61 | 1 |

Los grupos exactos documentados son:

- «Ordenar 4 libros distintos se puede hacer de…», dos apariciones;
- «Selecciona el resultado correcto.», once apariciones;
- un mismo problema PAU de extracción de dos cartas con punto verde, dos apariciones;
- «Deriva f(x)=x3.», dos apariciones;
- «Dominio de f(x)=1/(x-3).», dos apariciones;
- «Selecciona la ecuación correcta de la recta.», dos apariciones;
- «En un triángulo rectángulo, sen(alpha) es…», dos apariciones;
- «Si no importa el orden y no se repite, hablamos de…», dos apariciones.

La identidad v2 incorpora el espacio de nombres fuente, conforme al plan aprobado, y por ello conserva estas apariciones. Esta decisión es reversible y mantiene la evidencia, pero no demuestra que sean ejercicios matemáticos diferentes.

### 3.3 Conciliación por curso y materia

En la columna “expansión distinta” se cuentan destinos adicionales cuyo enunciado normalizado es distinto. “Relaciones duplicadas” son apariciones adicionales exactas. Los totales de estas dos columnas explican el incremento.

| Curso/materia | Originales | v1 | v2 | Incremento | Expansión distinta | Relaciones duplicadas | Expansión no explicada |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1.º Bach. CCSS I | 212 | 212 | 349 | +137 | 135 | 2 | 0 |
| 1.º Bach. Matemáticas I | 76 | 76 | 531 | +455 | 452 | 3 | 0 |
| 1.º ESO | 967 | 967 | 967 | 0 | 0 | 0 | 0 |
| 2.º Bach. CCSS II | 1.360 | 1.360 | 1.480 | +120 | 120 | 0 | 0 |
| 2.º Bach. Matemáticas II | 1.921 | 1.921 | 2.011 | +90 | 78 | 12 | 0 |
| 2.º ESO | 521 | 521 | 521 | 0 | 0 | 0 | 0 |
| 3.º ESO | 673 | 673 | 675 | +2 | 2 | 0 | 0 |
| 4.º ESO A | 388 | 388 | 388 | 0 | 0 | 0 | 0 |
| 4.º ESO B | 562 | 562 | 563 | +1 | 1 | 0 | 0 |
| **Total** | **6.680** | **6.680** | **7.485** | **+805** | **788** | **17** | **0** |

La causa del salto especialmente grande en Matemáticas I es que las 30 colisiones v1 quedaron clasificadas bajo esa materia, aunque agrupaban registros completos de múltiples bancos y cursos. V2 separa 835 destinos con su evidencia de fuente y los redistribuye a su curso real. No se han contado respuestas, soluciones o modalidades como ejercicios por sí mismas.

## 4. Auditoría de enunciados, respuestas y soluciones

### 4.1 Diagnóstico por tipo de entidad

| Entidad | Auditadas | `SOURCE_CORRUPTION` | `CANONICAL_STRUCTURE_ERROR` | `LATEX_OR_MATH_SYNTAX_ERROR` | `RENDERING_RISK` | `DISPLAY_CONFIRMED` |
|---|---:|---:|---:|---:|---:|---:|
| Enunciado | 7.485 | 301 | 600 | 0 | 3.777 | 2.807 |
| Respuesta | 4.649 | 168 | 0 | 0 | 2.669 | 1.812 |
| Solución | 4.649 | 414 | 3.156 | 0 | 1.079 | 0 |
| **Total** | **16.783** | **883** | **3.756** | **0** | **7.525** | **4.619** |

El valor cero de `LATEX_OR_MATH_SYNTAX_ERROR` no significa ausencia de sintaxis deteriorada: los 760 comandos sin barra inversa ya aparecen de ese modo en la fuente y, por ello, se clasifican como `SOURCE_CORRUPTION`, no como error introducido por v2.

### 4.2 Incidencias concretas

Los códigos siguientes no son excluyentes; una entidad puede tener varios:

| Incidencia | Casos | Interpretación |
|---|---:|---|
| `ADVANCED_MATH_WITHOUT_STRUCTURED_REPRESENTATION` | 11.859 | Hay estructura matemática avanzada, pero no LaTeX/MathML/AsciiMath válido que garantice su composición visual. |
| `RAW_JSON_IN_TEXT_FIELD` | 3.295 | La solución contiene un objeto serializado dentro de `parts[].text`; es válido como cadena para el schema, pero incorrecto como texto pedagógico directo. |
| `SOURCE_MATH_COMMAND_MISSING_BACKSLASH` | 760 | La fuente contiene formas como `frac{...}` o `sqrt{...}` sin comando LaTeX válido. |
| `CANONICAL_MATHML_FORMAT_WITHOUT_MATHML` | 494 | Se declara `mathml`, pero el valor es texto plano y no contiene `<math>`. |
| `CANONICAL_IMAGE_FORMAT_WITHOUT_IMAGE_REFERENCE` | 106 | Se declara `image`, pero no hay ruta, URL ni datos de imagen. |
| `CANONICAL_SOLUTION_NOT_FOUND_IN_DECODED_PARTS` | 129 | La solución fuente no se puede conciliar literalmente con los pasos decodificados; requiere revisión documental. |
| `SOURCE_FLATTENED_MATH_PATTERN` | 129 | Se detecta estructura ya aplanada en la fuente, por ejemplo límites sin subíndice o HTML incrustado. |
| Flags explícitos de deterioro/notación del inventario | 12 marcas | Se conservaron las marcas preexistentes de Fase 0. |

### 4.3 Familias matemáticas afectadas

Los recuentos son apariciones no excluyentes sobre enunciados, respuestas y soluciones. Una entidad puede pertenecer a varias familias.

| Familia | Total detectado | Estructura canónica errónea | Corrupción fuente | Riesgo visual | Confirmado a nivel de datos |
|---|---:|---:|---:|---:|---:|
| Fracción compleja | 385 | 82 | 7 | 296 | 0 |
| Fracción | 2.071 | 637 | 58 | 1.376 | 0 |
| Potencia/raíz | 4.930 | 1.389 | 280 | 3.261 | 0 |
| Subíndice | 674 | 132 | 101 | 441 | 0 |
| Valor absoluto | 479 | 40 | 98 | 340 | 1 |
| Ecuación/igualdad | 8.748 | 3.020 | 643 | 5.082 | 3 |
| Sistema | 1.198 | 510 | 116 | 568 | 4 |
| Matriz | 638 | 95 | 46 | 496 | 1 |
| Determinante | 376 | 29 | 77 | 270 | 0 |
| Límite | 204 | 38 | 39 | 127 | 0 |
| Derivada | 434 | 55 | 51 | 328 | 0 |
| Integral definida | 15 | 3 | 6 | 6 | 0 |
| Integral/primitiva | 353 | 45 | 32 | 275 | 1 |
| Sumatorio/producto | 0 | 0 | 0 | 0 | 0 |
| Logaritmo/exponencial | 68 | 43 | 2 | 23 | 0 |
| Vector | 318 | 20 | 30 | 266 | 2 |
| Coordenadas | 1.597 | 246 | 119 | 1.015 | 217 |
| Intervalo/conjunto | 4.290 | 3.168 | 352 | 768 | 2 |
| Función a trozos | 3 | 0 | 0 | 3 | 0 |
| Expresión multilínea | 1.601 | 5 | 155 | 1.441 | 0 |
| Probabilidad/combinatoria | 358 | 27 | 45 | 78 | 208 |
| Símbolo griego | 1.217 | 244 | 77 | 896 | 0 |
| Inecuación | 1.142 | 142 | 152 | 848 | 0 |
| Implicación/aproximación | 834 | 160 | 99 | 575 | 0 |
| Unidades | 3.689 | 1.069 | 164 | 1.438 | 1.018 |

No se localizaron sumatorios/productos reconocibles por los símbolos o comandos auditados. Esto no demuestra que no existan en imágenes o texto tan deteriorado que haya perdido el operador.

## 5. Integridad de las soluciones recuperadas

- 4.649/4.649 soluciones conservan el orden del array de partes y no contienen partes vacías.
- 4.649/4.649 mantienen un `finalAnswer` explícito en al menos una parte.
- 0 tienen etiquetas de parte duplicadas.
- 3.295 guardan JSON serializado en `parts[].text`; antes de mostrarlas habría que decodificarlo o migrarlo a estructura canónica, sin cambiar su contenido.
- 129 no se pueden conciliar literalmente con la solución fuente decodificada. No se afirma que hayan perdido líneas, pero tampoco puede descartarse sin cotejo humano.

La conservación del orden del array no demuestra que los pasos estén pedagógica o matemáticamente ordenados. Tampoco demuestra que matrices, sistemas, límites, integrales o vectores conserven una presentación convencional: muchas soluciones siguen siendo texto plano. La auditoría no valida la corrección matemática y no confunde `=`, `⇒` y `≈`; únicamente registra su presencia y el riesgo de presentación.

## 6. Corpus representativo aislado

Se prepararon doce muestras reales, no conectadas a producción:

| Familia | `exerciseId` | Curso | Diagnóstico |
|---|---|---|---|
| Fracción compleja | `ex-0b65626a-a407-5ae6-8dd5-829ba649525b` | 4.º ESO B | `RENDERING_RISK` |
| Potencia/raíz | `ex-03dac48b-4d9c-5ccc-aeeb-b344ce025d80` | 4.º ESO A | `RENDERING_RISK` |
| Sistema | `ex-03e170e8-8aa3-55e5-addd-a1c8c365b2a8` | Matemáticas II | `RENDERING_RISK` |
| Matriz | `ex-030cc855-6f47-5b65-9115-83fae5e8607d` | Matemáticas II | `RENDERING_RISK` |
| Determinante | `ex-0f87b711-cae3-52f9-8d42-0cc455880fe8` | Matemáticas II | `CANONICAL_STRUCTURE_ERROR` |
| Límite | `ex-08219fcc-6399-5ff6-bcd4-1249f9cbfcad` | Matemáticas II | `CANONICAL_STRUCTURE_ERROR` |
| Derivada | `ex-013b862a-e18a-58f0-83a5-026b0295e24c` | Matemáticas I | `RENDERING_RISK` |
| Integral definida | `ex-0fe94068-a583-57f7-bea7-8f86a26942d0` | Matemáticas II | `RENDERING_RISK` |
| Integral indefinida/primitiva | `ex-0bde1a0d-6d97-5d2f-ba1f-b7f1d1669623` | Matemáticas II | `CANONICAL_STRUCTURE_ERROR` |
| Vector | `ex-0bfec524-4eb2-5dd5-af79-661b445273d3` | Matemáticas II | `RENDERING_RISK` |
| Función a trozos | `ex-7539210e-4a56-5c26-bbbf-84d82cc4da13` | Matemáticas II | `RENDERING_RISK` |
| Probabilidad | `ex-00d7940e-eefe-5381-b274-36fa63840f43` | CCSS I | `DISPLAY_CONFIRMED` |

`representative-corpus.json` conserva por muestra el enunciado fuente, representación canónica, respuesta, solución, representaciones matemáticas declaradas, incidencias y diagnóstico. `representative-corpus.html` es una vista literal aislada: ayuda a revisar el material, pero deliberadamente no usa el renderizador de producción y no constituye una aprobación visual.

## 7. Riesgos visuales pendientes

Antes de conectar v2 al runtime público es imprescindible una fase posterior, expresamente autorizada, que:

1. repare las etiquetas de representación falsas sin inventar notación;
2. trate por separado los 883 casos de fuente deteriorada;
3. convierta el JSON de solución en bloques estructurados verificables;
4. confronte los 129 desacuerdos de solución con el documento original;
5. materialice notación convencional para fracciones, exponentes, subíndices, matrices, determinantes, sistemas, límites, integrales, vectores y delimitadores adaptativos;
6. ejecute pruebas visuales aisladas en tamaños de pantalla representativos;
7. compruebe ausencia de LaTeX crudo, solapamientos, cortes, mojibake y caracteres de sustitución;
8. valide matemáticamente una muestra estratificada sin inferir corrección por el mero hecho de renderizar bien.

## 8. Criterio de cierre

- **Integridad de identidad:** no hay `UNEXPLAINED_EXPANSION`; la expansión está trazada completamente.
- **Duplicación:** existen 17 relaciones exactas que requieren decisión, pero están identificadas y no son pérdida ni expansión oculta.
- **Integridad de notación:** no está cerrada para publicación. Hay errores canónicos y riesgos visuales cuantificados.
- **Producción:** permanece intacta; ningún artefacto de esta auditoría está conectado a `index.html`, `app.js` o al runtime público.

## 9. Verificación adicional

Se ejecutaron las 22 pruebas originales de Fase 1 y las 33 pruebas de Fase 2B: 55/55 superadas. Esto confirma que la auditoría no alteró los contratos ni el comportamiento probado; no invalida los problemas de representación detectados, porque esos tests validan contratos y reglas, no la calidad visual de todas las expresiones.


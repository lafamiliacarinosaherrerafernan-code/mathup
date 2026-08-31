# Recuperación de ecuaciones Equation.3 · Andalucía CCSS II 2012

## 1. Alcance y resultado

Esta fase recupera exclusivamente los 55 objetos `Equation.3` presentes en los seis exámenes oficiales andaluces de Matemáticas Aplicadas a las CCSS II de 2012. Los seis documentos de criterios oficiales se conservaron y verificaron, pero no contienen objetos `Equation.3`.

No se utilizó OCR, Mathpix ni transcripción visual. Tampoco se generaron respuestas, soluciones, distractores o pasos matemáticos. Los 48 ejercicios documentales previos no se integraron en los 1.618 ejercicios canónicos ya versionados ni en el runtime público.

Resultado estructural:

| Clasificación | Objetos |
|---|---:|
| `NATIVE_STRUCTURE_RECOVERED` | 55 |
| `DETERMINISTIC_CONVERSION_RECOVERED` | 0 |
| `VISUAL_TRANSCRIPTION_REQUIRED` | 0 |
| `AMBIGUOUS` | 0 |
| `UNRECOVERABLE` | 0 |

La recuperación estructural es completa. La certificación visual sustantiva original↔renderizado queda deliberadamente separada: los 55 objetos permanecen en `HUMAN_COMPARISON_PENDING`. Ningún script les ha concedido equivalencia visual automática.

## 2. Método real de recuperación

### 2.1. Asociación exacta DOC → campo → almacenamiento OLE

Los `.DOC` son documentos binarios Word 97–2003 (`OLE Compound File Binary`). Cada campo `EMBED Equation.3` se vinculó al objeto OLE exacto mediante la propiedad de caracteres del separador del campo:

- código MS-DOC: `sprmCPicLocation` (`0x6A03`);
- valor: identificador decimal del almacenamiento `ObjectPool/_<valor>`;
- flujo matemático: `ObjectPool/_<valor>/Equation Native`.

Este enlace evita cualquier asociación por orden de aparición. Se demostraron 55 rangos de campo, 55 valores `sprmCPicLocation` y 55 almacenamientos OLE únicos. El hash semántico estable del mapa es:

`13d7649b4b46c77921278a0c3be8a11990cb42a918bccc7f1719527da2a090e1`

### 2.2. Recuperación nativa Equation Editor

Los 55 flujos `Equation Native` conservan internamente información matemática estructurada:

1. flujo OLE `Equation Native` intacto;
2. cabecera `EQNOLEFILEHDR` de 28 bytes;
3. carga nativa MTEF versión 3;
4. registros MTEF de caracteres, plantillas, slots, matrices, scripts y delimitadores;
5. conversión determinista a un árbol matemático tipado;
6. LaTeX y MathML exclusivamente derivados del árbol.

La fuente de verdad continúa siendo el DOC oficial y su objeto OLE. Ni el LaTeX ni el MathML sustituyen la evidencia original.

El lector de propiedades MS-DOC utiliza un subconjunto local, identificado y con aviso de licencia, de `msdoc-viewer` 0.5.5. Ese código solo localiza el objeto OLE; no interpreta las matemáticas. La interpretación MTEF está implementada en la capa propia de esta fase.

## 3. Censo documental y trazabilidad

| Modelo | `documentId` | SHA-256 del DOC | Objetos |
|---:|---|---|---:|
| 1 | `ade2012-exam-m1-a5dfff58dac253bf` | `a5dfff58dac253bf021b0d2b9409d68987e9ce6e97cfa4abbaf840019a7a18e2` | 11 |
| 2 | `ade2012-exam-m2-bcec57ae525fa5e2` | `bcec57ae525fa5e23ce74631274a2abda0b5b16ac47ce6108ba8b5572d4aa634` | 6 |
| 3 | `ade2012-exam-m3-c8688a19515dfeb3` | `c8688a19515dfeb348e8f8817d3f4a6c0a967723c270f2ec42e7f365d001e555` | 7 |
| 4 | `ade2012-exam-m4-8446c5da6b4b7cfc` | `8446c5da6b4b7cfc0f48b89d1b2d052ae0c8a1c4b5bc0b86b7e63399ce8656f8` | 10 |
| 5 | `ade2012-exam-m5-87b729cdd4632386` | `87b729cdd4632386690a9390bdfa17dd7d5c902a2cf7e5801feea45e2b181969` | 7 |
| 6 | `ade2012-exam-m6-61f8d5d809881c49` | `61f8d5d809881c49e9e9212281f7028516338e026524e55d572ab691ec5f416d` | 14 |

Cada registro de `recovered-equations.jsonl` conserva:

- DOC, `documentId` y SHA-256;
- ejercicio, opción y subapartado cuando corresponde;
- posiciones inicial, separador y final del campo Word;
- valor `sprmCPicLocation` y almacenamiento OLE;
- flujo `Equation Native`, MTEF, EMF y PNG, con ruta y SHA-256;
- contexto textual anterior y posterior;
- árbol matemático, hash del árbol y derivados;
- clasificación y estado de comparación visual.

## 4. Construcciones matemáticas encontradas

El inventario del árbol tipado contiene:

| Construcción | Apariciones estructurales |
|---|---:|
| Expresión raíz | 55 |
| Secuencias | 114 |
| Matrices/arreglos | 16 |
| Fracciones | 7 |
| Potencias | 29 |
| Subíndices | 5 |
| Delimitadores | 14 |
| Identificadores | 267 |
| Números | 197 |
| Operadores/relaciones | 280 |
| Espacios estructurales | 90 |

También se conservan símbolos griegos, relaciones, operadores, uniones, probabilidades y delimitadores presentes en las expresiones. No aparecieron en estos 55 objetos nodos nativos de integral, límite, radical, sumatorio o vector; no se fabricó ninguna construcción ausente.

## 5. Representación canónica paralela

La representación recuperada usa el esquema lógico `mathup.equation3-recovery.v1` y un AST cuya raíz es `equation-expression`. El árbol conserva tipos de nodos y estructura; sus derivados son:

- LaTeX normalizado, con hash;
- MathML renderizable, con hash;
- inventario de construcciones;
- referencia criptográfica a la carga MTEF.

No se reserializa MTEF. La ida/vuelta comprobable consiste en leer repetidamente los mismos bytes MTEF y obtener un AST y derivados idénticos, conservando siempre los bytes oficiales originales.

## 6. Validación original ↔ renderizado

Se generó un arnés local aislado con 55 fichas, cada una con:

- PNG oficial derivado del EMF original;
- MathML derivado del AST recuperado;
- identificadores, contexto, hashes, LaTeX e inventario estructural.

La comprobación técnica con navegador local obtuvo:

| Control | Resultado |
|---|---:|
| Fichas | 55 |
| PNG oficiales | 55 |
| PNG cargados correctamente | 55 |
| nodos MathML | 55 |
| MathML vacíos | 0 |
| overflow horizontal de página | no |
| tarjetas con overflow no controlado | 0 |

Esto demuestra que la evidencia y el renderizado están disponibles y comparables; no demuestra por sí solo igualdad visual o matemática. Por ello:

- objetos certificados visualmente como idénticos: **0**;
- diferencias sustantivas confirmadas: **0**;
- comparaciones humanas pendientes: **55**.

Una discrepancia futura entre original y renderizado obligará a corregir únicamente la representación derivada o a reclasificar el objeto, sin alterar la evidencia oficial.

## 7. Situación de los 48 ejercicios

| Estado | Ejercicios |
|---|---:|
| Sin dependencia de `Equation.3`, preparados técnicamente | 21 |
| Con los objetos estructuralmente recuperados | 27 |
| Bloqueados hasta comparación visual humana | 27 |
| Total potencial tras aprobación visual | 48 |

Por tanto, al cierre de esta fase hay **21 ejercicios completamente preparados para una integración posterior** y **27 todavía bloqueados por la validación visual obligatoria de sus objetos matemáticos**. No se ha realizado integración alguna.

## 8. Reproducibilidad, orden y rollback

La corrida principal, una segunda corrida y la entrada invertida producen el mismo hash semántico:

`3540c953e06c9bf34301f5928e90ed8eef1ed5f780bdf9dbd4a837eb01329073`

El rollback consiste en retirar exclusivamente la nueva capa paralela y sus artefactos. Los hashes de `index.html`, `app.js` y `math-renderer.js` son idénticos antes y después. Los DOC oficiales no se modificaron, no se publicó ningún ejercicio y no se conectó esta fase al runtime.

## 9. Pruebas

Resultados:

- pruebas específicas de esta fase: **30/30**;
- regresión Node completa disponible: **147/147**;
- regresión PowerShell completa disponible: **1.523/1.523**;
- total de comprobaciones ejecutadas: **1.670/1.670**;
- fallos: **0**.

Se comprobaron los 55 objetos, unicidad, hashes, trazabilidad, MTEF v3, AST, derivados, ausencia de caracteres privados, asociaciones a ejercicio/apartado, conservación de 48 ejercicios y 104 subapartados, no aprobación visual automática, reproducibilidad, invariancia al orden, arnés, rollback y ausencia de contenido matemático inventado.

## 10. Archivos de esta fase

### Código y pruebas creados

- `catalog/equation3-andalucia-2012/mtef3-recovery.mjs`
- `catalog/equation3-andalucia-2012/recovery.mjs`
- `catalog/equation3-andalucia-2012/vendor/msdoc-viewer-0.5.5/`
- `scripts/fase-equation3-map-doc-objects.mjs`
- `scripts/fase-equation3-extract-native.ps1`
- `scripts/fase-equation3-recover-and-audit.mjs`
- `tests/equation3-andalucia-2012.test.mjs`

### Artefactos creados

- `artifacts/equation3-andalucia-2012/doc-object-map/`
- `artifacts/equation3-andalucia-2012/native-evidence/`
- `artifacts/equation3-andalucia-2012/runs/run-a/`

### Archivo existente modificado

Ningún archivo existente de producción, banco, `data/`, catálogo previo, contrato previo, Supabase, renderizador o skill fue modificado.

## 11. Limitación pendiente

La estructura nativa se ha recuperado sin reconocimiento visual, pero la equivalencia final original↔renderizado necesita dictamen humano explícito para los 55 objetos. Esta limitación es deliberada: evita confundir una decodificación técnica correcta con una certificación visual que los scripts no pueden otorgar.

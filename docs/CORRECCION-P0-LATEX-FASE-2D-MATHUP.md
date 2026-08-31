# Corrección mínima de los P0 `RAW_LATEX_VISIBLE` de Fase 2D

## Alcance y garantías

Esta intervención corrige exclusivamente la representación derivada de las tres entidades P0 autorizadas. No cambia el significado matemático, los literales fuente, los documentos normalizados de Fase 2C, los bancos, `data/`, la aplicación pública, Supabase, los renderizadores públicos ni las skills. La capa continúa desconectada del runtime público.

La transformación está protegida por una lista cerrada de `visualEntityId`, por el `exerciseId`, por el tipo de entidad y por el hash SHA-256 exacto del literal. Si cualquiera de estos datos cambia, la corrección se rechaza.

## Diagnóstico previo

### `vent-60f2251a717d2d094eb1dc4cc991d394`

- Ejercicio: `ex-5ddcded1-cfcd-5e90-9a20-ab28d7a0e5f6`.
- Entidad: solución `sol-ea4a3696-1f06-57df-aca3-c7c2b8c0524d:r1`.
- Documento: `mdoc-0355e871366756090c07d082c526932d28601a632ab5d7f931eff5fc1959ad4a`.
- Origen: `data/ccss-ii-blocks.js`, `window.CCSS_II_BLOCK_EXERCISES.analisis.4`.
- Curso y procedencia: 2.º Bachillerato CCSS II, PAU Castilla-La Mancha, 2025.
- Hash del literal: `04798ba8f664c4c325f11a7b30861393e0467f964e5de6764d7db94fce48432b`.
- Representación normalizada existente: `PRESERVED_LITERAL`; documento Fase 2C de tipo `literal-evidence`, reversible y sin reinterpretación matemática.
- Literal original: se conserva íntegro en `artifacts/fase2d-p0-latex/diagnosis.jsonl` y `representations.jsonl`. Contiene 17 apariciones demostrables de `\frac{entero}{entero}`, entre ellas `\frac{3}{2}`, `\frac{9}{4}` y `\frac{49}{4}`.
- Causa exacta: el arnés aislado de Fase 2D insertaba el literal completo mediante `textContent`; por ello los comandos `\frac` se presentaban como caracteres visibles en vez de materializarse visualmente.
- Capa defectuosa para este P0: representación visual derivada. La fuente no está alterada y la decisión conservadora de Fase 2C de preservar el literal no es un error de contenido.
- Observación: el mismo literal contiene otras anomalías históricas de fuente ajenas a `RAW_LATEX_VISIBLE`; permanecen intactas y pendientes de revisión humana.

### `vent-f882cb3797e686463ca72ae6c532eeb3`

- Ejercicio: `ex-5ddcded1-cfcd-5e90-9a20-ab28d7a0e5f6`.
- Entidad: respuesta `ans-8cf0264c-59d9-5f2b-ba4f-a0fb9fa85661:r1`.
- Documento: `mdoc-0938d92ea2775211beee5ec1f40c6e943f7812a7b9d5c6a3aa9227b0a8f7b6cf`.
- Origen: `data/ccss-ii-blocks.js`, `window.CCSS_II_BLOCK_EXERCISES.analisis.4`.
- Curso y procedencia: 2.º Bachillerato CCSS II, PAU Castilla-La Mancha, 2025.
- Hash del literal: `e54c89767fe1afec8378496f7774b955489ad1ec2fa2ac16019840a0a4f7c187`.
- Representación normalizada existente: `PRESERVED_LITERAL`.
- Literal original exacto:

```text
k=-1/2 o k=1
Máximo en (-\frac{3}{2}, \frac{49}{4}) y mínimo en (2, 5)
Crece en (-∞,-\frac{3}{2}) y (2,∞); decrece en (-\frac{3}{2},2)
```

- Causa exacta: cuatro comandos `\frac{entero}{entero}` se mostraban literalmente por la inserción con `textContent` del arnés aislado.
- Capa defectuosa para este P0: representación visual derivada; no la fuente ni el significado matemático.

### `vent-7efb1035613be94794b64d97ba4f8914`

- Ejercicio: `ex-23b7b6a2-334b-50b1-9c15-5ed01e403000`.
- Entidad: solución `sol-5311800d-483f-5bb2-ace5-96e8731ad1e4:r1`.
- Documento: `mdoc-16a937056bfd691ea611ef000e8947cdbea81b2f899ea0bc29d300e6a0277fbe`.
- Origen: `data/ccss-ii-blocks.js`, `window.CCSS_II_BLOCK_EXERCISES.analisis.0`.
- Curso y procedencia: 2.º Bachillerato CCSS II, PAU Castilla-La Mancha, 2026.
- Hash del literal: `bf29257619ee26a2f5c600facace48d47f6e8870fda8ee84809ad1a0949bf070`.
- Representación normalizada existente: `PRESERVED_LITERAL`; documento Fase 2C de tipo `literal-evidence`.
- Literal original: se conserva íntegro en los artefactos de diagnóstico. Contiene cinco apariciones exactas de `\frac{1}{2}`.
- Causa exacta: esas cinco fracciones se mostraban literalmente al insertar el literal con `textContent`.
- Capa defectuosa para este P0: representación visual derivada.
- Observación: las marcas históricas `[[signchart ...]]` y otras anomalías potenciales del literal no forman parte de estos tres P0 y no se han interpretado ni modificado.

## Corrección aplicada

Se añadió una superposición aislada que:

1. reconoce únicamente `\frac{entero}{entero}` con llaves equilibradas y denominador distinto de cero;
2. conserva cada token original dentro del segmento derivado;
3. materializa una fracción vertical mediante HTML/CSS del arnés aislado;
4. reconstruye byte a byte el literal original al concatenar `segment.original` y `segment.text`;
5. verifica que el hash reconstruido coincide con el hash fuente;
6. rechaza entidades no autorizadas, literales cambiados y cualquier estructura matemática no incluida en la regla exacta.

La corrección no convierte, completa ni interpreta expresiones ambiguas. El rollback consiste en descartar la representación derivada y reconstruir el literal original, cuya igualdad y hash han sido comprobados.

## Resultado antes y después

| Control | Antes | Después |
|---|---:|---:|
| Ejecuciones | 12 | 12 |
| `RAW_LATEX_VISIBLE` | 12 | 0 |
| Overflow | 0 | 0 |
| Recortes | 0 | 0 |
| Solapamientos | 0 | 0 |
| Contenido oculto | 0 | 0 |
| Glifos dañados detectados por el control visual | 0 | 0 |
| Errores de recursos o medición | 0 | 0 |

## Doce ejecuciones visuales posteriores

| Entidad | 320 px | 375 px | 768 px | 1280 px |
|---|---|---|---|---|
| `vent-60f2251a717d2d094eb1dc4cc991d394` | PASS, 17 fracciones | PASS, 17 | PASS, 17 | PASS, 17 |
| `vent-f882cb3797e686463ca72ae6c532eeb3` | PASS, 4 fracciones | PASS, 4 | PASS, 4 | PASS, 4 |
| `vent-7efb1035613be94794b64d97ba4f8914` | PASS, 5 fracciones | PASS, 5 | PASS, 5 | PASS, 5 |

En las doce vistas: `rawLatex=false`, `overflow=false`, `clipped=false`, `overlap=false` y `hidden=false`.

## Evidencia reproducible

- Diagnóstico literal e identidad: `artifacts/fase2d-p0-latex/diagnosis.jsonl`.
- Representaciones derivadas y datos de reversibilidad: `artifacts/fase2d-p0-latex/representations.jsonl`.
- Geometría y decisiones previas: `before-geometry.jsonl` y `before-decisions.jsonl`.
- Referencias y hashes de las capturas previas versionadas: `before-screenshots-manifest.jsonl`.
- Métricas posteriores: `after/geometry-results.jsonl`.
- Doce capturas posteriores y hashes: `after/screenshots/` y `after/screenshots/manifest.jsonl`.
- Resumen: `correction-summary.json`.
- Ensayo de rollback: `rollback-trial.json`.

## Pruebas y regresión

- Pruebas nuevas específicas: identidad cerrada, hash, reversibilidad, regla de fracción segura, rechazo de cambios y 12 vistas limpias.
- Suite completa ejecutada: **93 pruebas superadas, 0 fallidas**.
- Incluye las **22 pruebas originales de Fase 1**, Fases 2, 2B, 2C y 2D.
- El arnés y la capa correctora tienen cero importaciones del runtime público.
- No se ha modificado ningún archivo de producción ni se ha iniciado la revisión humana global.

## Limitaciones mantenidas deliberadamente

Esta corrección concede únicamente un resultado geométrico automático limpio para los tres P0. No constituye un dictamen humano final sobre la convencionalidad de toda la solución y no corrige otras incidencias históricas presentes en los literales. Esas cuestiones permanecen en las colas de revisión ya definidas.

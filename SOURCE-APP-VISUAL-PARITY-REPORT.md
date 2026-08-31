# Fase 2.8 · Paridad visual fuente oficial → +MathUp · Andalucía

## Alcance y autoridad

- Materias: Matemáticas II Andalucía y CCSS II Andalucía.
- Fuentes oficiales aportadas por el usuario: 110 + 107 = 217 exámenes.
- Recurso excluido: tabla de la distribución normal; no se contabiliza como examen.
- Sin web, Madrid, Castilla-La Mancha, Supabase, almacenamiento, commit ni push.
- Esta entrega no declara Andalucía validada: los casos señalados requieren revisión manual.

## Resultado exhaustivo

| Materia | Habilitados | PASS | CORRECTED | NEEDS_HUMAN_VISUAL_REVIEW | FAIL |
|---|---:|---:|---:|---:|---:|
| Matemáticas II | 817 | 773 | 2 | 42 | 0 |
| CCSS II | 824 | 795 | 1 | 28 | 0 |
| Total | 1641 | 1568 | 3 | 70 | 0 |

Los 70 pendientes no se han reconstruido por conjetura: 18 conservan una discrepancia de matriz/sistema asociada a delimitadores eliminados por la extracción y los restantes presentan evidencia estructural insuficiente. La cola completa y el motivo por `exerciseId` están en `artifacts/andalucia-source-app-visual-parity/review-queue.json`.

## Correcciones verificadas

1. `pau-user-and-fc24350dc009dd373a61feb93871` — Reserva 2008, CCSS II: A y B vuelven a ser matrices 2D y se conserva a→b.
2. `pau-can-ex-b9f6f879ab07429e3e9fcf2843eb85cc` — Reserva 2019, Matemáticas II: A 3×3, matriz construida, `3A`, `det(BA⁻¹)` y a→b.
3. `pau-can-ex-44b63cc7b878dc2d552ccd771ca6a638` — Ordinaria 2026, Matemáticas II: una llave, tres ecuaciones y a→b.

Correcciones generales:

- una capa de corrección ya no elimina HTML matemático estructurado válido;
- `cases{...}` con condiciones separadas por coma, incluidas cotas decimales, se renderiza como función a trozos y no como sistema;
- se normalizan estilos, integrales, fracciones y raíces LaTeX residuales;
- los entornos binarios `.doc` aplanados no exponen `\\begin`/`\\end` y quedan en revisión en vez de recibir estructura inventada;
- la prueba histórica del selector se actualizó para proteger la estratificación funcional actual mediante `groupOf`, no una implementación anterior concreta.

## Navegador real y responsive

Se cargó la misma cadena de producción y se recorrieron en cada ancho los 1.641 ejercicios, 3.429 apartados y 13.716 opciones, incluyendo todos los pasos de solución.

| Ancho | Tokens internos | Apartados sin 4 opciones | Desbordamientos | Errores |
|---:|---:|---:|---:|---:|
| 1280 | 0 | 0 | 0 | 0 |
| 768 | 0 | 0 | 0 | 0 |
| 375 | 0 | 0 | 0 | 0 |

## Evidencias visuales

- 61 capturas rasterizadas de páginas PDF oficiales.
- 9 fuentes pendientes de captura nativa: ocho `.doc` de 2012 que Word solicita reparar al automatizarlos y un registro cuya identidad de archivo no está resuelta. No se forzó la conversión.
- 7 láminas de galería con los 70 casos, fuente o bloqueo explícito a la izquierda y representación real de +MathUp a la derecha.

## Skill común

`skill-editor-enunciados` conserva su versión anterior y el diff registrado.

- Hash anterior: `7cfcf81473e814747c73288e7ad949f3af9923a450b60598c48289c76fa48699`
- Hash instalado: `203e7365320be7dc934393d0dcc06945ce59dfed0b66fe760fd0566e006031fa`

La skill exige desde ahora paridad visual fuente–DOM real, firmas estructurales, cola humana segura, galería y pruebas completas a 1280/768/375 px.

## Pruebas y archivos de auditoría

- Regresiones específicas de paridad y renderizador: 17/17.
- Suite integrada seleccionada: 77 pruebas; la única aserción histórica desfasada del selector fue sustituida por la protección estructural vigente y la repetición específica quedó 27/27.
- Log exhaustivo: `artifacts/andalucia-source-app-visual-parity/exercise-log.jsonl`.
- Resumen: `artifacts/andalucia-source-app-visual-parity/summary.json`.
- Resultados del navegador: `artifacts/andalucia-source-app-visual-parity/browser-results.json`.
- Galería interactiva: `tools/andalucia-source-app-review/index.html`.

## Estado para revisión manual

La aplicación queda servida localmente y preparada para revisión. Los 1.571 registros `PASS/CORRECTED` han superado las puertas automáticas. Los 70 `NEEDS_HUMAN_VISUAL_REVIEW` están separados y no se presentan como validados. Andalucía no queda declarada completa ni definitivamente aprobada.

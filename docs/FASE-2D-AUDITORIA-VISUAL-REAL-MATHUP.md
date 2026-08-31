# Fase 2D — Auditoría visual real del catálogo matemático de +MathUp

## 1. Resultado ejecutivo

La Fase 2D se ha ejecutado como una capa paralela, reproducible y desconectada del runtime público. Se han censado las **7.067 entidades reales** previstas y se han realizado **28.268 ejecuciones visuales reales** en navegador (7.067 entidades × 320, 375, 768 y 1.280 píxeles). Una segunda corrida completa repitió las 28.268 ejecuciones para comprobar reproducibilidad.

El resultado automático es:

| Resultado automático | Entidades |
|---|---:|
| `AUTOMATED_VISUAL_PASS` | 7.064 |
| `AUTOMATED_VISUAL_FAIL` | 3 |

El resultado editorial/humano es deliberadamente distinto:

| Estado editorial | Entidades |
|---|---:|
| `MANUAL_REVIEW_REQUIRED` | 7.064 |
| `VISUAL_FIX_REQUIRED` | 3 |
| `SOURCE_REVIEW_REQUIRED` | 0 |
| `VISUAL_PASS` definitivo | 0 |

**Ningún caso ha recibido `HUMAN_VISUAL_PASS` ni `VISUAL_PASS` definitivo por análisis automático.** Las 7.067 entidades conservan `PENDING_HUMAN_REVIEW`. Por tanto, esta fase no certifica aún el catálogo para publicación.

Los tres fallos automáticos son `RAW_LATEX_VISIBLE`, aparecen en las cuatro resoluciones y pertenecen a CCSS II, Castilla-La Mancha, años 2025/2026: una respuesta y dos soluciones. No se ha corregido su contenido.

## 2. Alcance e invariantes

La auditoría conserva las líneas base exigidas:

- 15.527/15.527 registros fuente;
- 6.712/6.712 ejercicios originales;
- 607/607 ejercicios actualmente inaccesibles;
- 7.485 ejercicios v2;
- 4.649 respuestas;
- 4.649 soluciones;
- 7.067 entidades de revisión visual.

No se ha conectado esta capa a `index.html`, `app.js`, `math-renderer.js`, Supabase ni al runtime público. El manifiesto del arnés declara cero importaciones de producción, cero dependencias de red y hashes de los archivos protegidos. El ensayo de rollback confirma cero escrituras en producción y en Supabase.

## 3. Población auditada

| Tipo de entidad | Total | Automático correcto | Fallo automático |
|---|---:|---:|---:|
| Enunciado | 3.777 | 3.777 | 0 |
| Respuesta | 2.211 | 2.210 | 1 |
| Solución | 1.079 | 1.077 | 2 |
| **Total** | **7.067** | **7.064** | **3** |

Prioridad asignada antes de la ejecución:

| Prioridad | Total | Tratamiento |
|---|---:|---|
| P0 | 3 | Fallo automático; revisión individual obligatoria |
| P1 | 5.403 | Evidencia persistente y revisión humana prioritaria |
| P2 | 444 | Revisión por grupo/representante y escalado cuando corresponda |
| P3 | 1.217 | Métricas completas; evidencia regenerable y muestreo |

## 4. Cobertura por curso y materia

| Curso/materia | Total | Automático correcto | Fallo automático |
|---|---:|---:|---:|
| 1.º ESO | 703 | 703 | 0 |
| 2.º ESO | 488 | 488 | 0 |
| 3.º ESO | 512 | 512 | 0 |
| 4.º ESO A | 385 | 385 | 0 |
| 4.º ESO B | 441 | 441 | 0 |
| 1.º Bach. Matemáticas I | 312 | 312 | 0 |
| 1.º Bach. CCSS I | 166 | 166 | 0 |
| 2.º Bach. Matemáticas II PAU | 2.989 | 2.989 | 0 |
| 2.º Bach. CCSS II PAU | 1.071 | 1.068 | 3 |
| **Total** | **7.067** | **7.064** | **3** |

### 4.1 Cobertura PAU por materia y comunidad

| Materia | Comunidad | Total | Automático correcto | Fallo automático |
|---|---|---:|---:|---:|
| Matemáticas II | Castilla-La Mancha | 2.130 | 2.130 | 0 |
| Matemáticas II | Madrid | 622 | 622 | 0 |
| Matemáticas II | No verificable | 237 | 237 | 0 |
| CCSS II | Castilla-La Mancha | 410 | 407 | 3 |
| CCSS II | Madrid | 500 | 500 | 0 |
| CCSS II | No verificable | 161 | 161 | 0 |

El desglose reproducible por materia, comunidad, año y convocatoria está en `coverage-pau-by-subject-community-year-call.json`. Los metadatos ausentes permanecen como `UNVERIFIED`; no se ha inferido ni inventado comunidad o convocatoria.

## 5. Cobertura por familia matemática

Las familias se solapan: una entidad puede pertenecer a varias.

| Familia | Entidades | Automático correcto | Fallo automático |
|---|---:|---:|---:|
| Valor absoluto | 340 | 339 | 1 |
| Fracción compleja | 296 | 296 | 0 |
| Coordenadas | 1.013 | 1.010 | 3 |
| Integral definida | 6 | 6 | 0 |
| Derivada | 328 | 326 | 2 |
| Determinante | 270 | 269 | 1 |
| Ecuación | 4.912 | 4.909 | 3 |
| Fracción | 1.207 | 1.204 | 3 |
| Símbolos griegos | 889 | 889 | 0 |
| Implicación/aproximación | 575 | 575 | 0 |
| Integral indefinida | 275 | 275 | 0 |
| Inecuación | 820 | 820 | 0 |
| Intervalo/conjunto | 757 | 757 | 0 |
| Límite | 127 | 126 | 1 |
| Logaritmo/exponencial | 23 | 23 | 0 |
| Matriz | 496 | 495 | 1 |
| Multilínea | 1.441 | 1.438 | 3 |
| Función a trozos | 3 | 3 | 0 |
| Potencia/raíz | 3.164 | 3.162 | 2 |
| Probabilidad/combinatoria | 78 | 78 | 0 |
| Subíndice | 441 | 441 | 0 |
| Sistema | 568 | 568 | 0 |
| Unidades | 1.438 | 1.437 | 1 |
| Vector | 266 | 266 | 0 |

No se localizaron casos reales etiquetables como sumatorio/producto dentro de las 7.067 entidades pendientes. No se fabricaron fixtures para suplir esa ausencia. Los controles sintéticos negativos solo verifican el detector y nunca se utilizan para aprobar contenido real.

## 6. Métricas geométricas y defectos detectados

Cada ejecución conserva medidas del contenedor y del contenido, overflow horizontal/vertical, recorte, solapamiento, contenido oculto, JSON o LaTeX crudo, glifos ausentes, error de recurso y error de medición.

Resultados en cada resolución:

- 7.067/7.067 entidades ejecutadas a 320 px;
- 7.067/7.067 a 375 px;
- 7.067/7.067 a 768 px;
- 7.067/7.067 a 1.280 px;
- 0 desbordamientos;
- 0 recortes;
- 0 solapamientos;
- 0 contenidos ocultos;
- 0 glifos ausentes detectados;
- 0 errores de recursos;
- 0 errores de medición;
- 3 entidades con LaTeX crudo visible.

No hubo fallos exclusivos de móvil ni exclusivos de escritorio: los tres fallos se reprodujeron en las cuatro anchuras.

### 6.1 Incidencias P0

| Entidad visual | Tipo | Código | Resoluciones |
|---|---|---|---|
| `vent-60f2251a717d2d094eb1dc4cc991d394` | Solución | `RAW_LATEX_VISIBLE` | 320, 375, 768, 1280 |
| `vent-f882cb3797e686463ca72ae6c532eeb3` | Respuesta | `RAW_LATEX_VISIBLE` | 320, 375, 768, 1280 |
| `vent-7efb1035613be94794b64d97ba4f8914` | Solución | `RAW_LATEX_VISIBLE` | 320, 375, 768, 1280 |

## 7. Grupos homogéneos y revisión humana

Se formaron **6.088 grupos**: 967 grupos exactos con más de un miembro y 5.121 entidades singulares. La agrupación exige equivalencia exacta de representación, contexto y resultado geométrico. Tres grupos contienen fallos automáticos.

La propagación de un dictamen solo queda permitida después de revisar humanamente el representante y únicamente dentro de un grupo exacto. En esta ejecución:

- revisiones humanas completadas: 0;
- aprobaciones humanas heredadas: 0;
- aprobaciones definitivas: 0.

El resultado automático acredita ausencia de defectos objetivos detectables, no convencionalidad, proporción, legibilidad pedagógica ni calidad matemática visual. Esos juicios permanecen pendientes de una persona revisora.

## 8. Evidencia persistente y regenerable

No se han almacenado 28.268 PNG por corrida. Se conserva:

- métricas y hashes para las 28.268 ejecuciones;
- 102 capturas individuales de 48 entidades (fallos, muestras y casos seleccionados);
- 70 hojas de contacto paginadas que documentan 6.958 entidades P0/P1, singulares y representantes de grupo;
- 172 PNG persistentes en total;
- 61.405.842 bytes de evidencia PNG;
- manifiestos con rutas, hashes, resolución, entidad y razones de retención;
- parámetros necesarios para regenerar exactamente las capturas no persistidas.

Las 109 entidades restantes conservan sus cuatro ejecuciones, geometría, hashes y manifiestos, pero no una captura permanente. Las hojas de contacto tienen 100 entidades por página como máximo.

## 9. Artefactos generados

### Implementación aislada

- `catalog/visual-audit/fase2d-visual-audit.mjs`
- `scripts/fase2d-prepare-audit.mjs`
- `scripts/fase2d-harness-server.mjs`
- `scripts/fase2d-finalize-audit.mjs`
- `scripts/fase2d-verify-reproducibility.mjs`
- `scripts/fase2d-rollback-trial.mjs`
- `scripts/fase2d-register-screenshots.mjs`
- `scripts/fase2d-build-evidence-pages.mjs`
- `scripts/fase2d-register-contact-sheets.mjs`
- `tests/fase2d-visual-audit.test.mjs`

### Auditoría y evidencia

`artifacts/fase2d/` contiene 303 archivos (237.694.702 bytes), entre ellos:

- población, plan de muestreo y grupos exactos;
- manifiesto de render y manifiesto semántico;
- geometría por cada una de las cuatro anchuras y geometría consolidada;
- decisiones automáticas/editoriales y colas de revisión;
- incidencias y cobertura por curso, entidad, familia y procedencia PAU;
- evidencia visual selectiva, hojas de contacto y sus manifiestos;
- segunda corrida completa, corrida con orden inverso y comparación semántica;
- ensayo de rollback y resultados de pruebas.

Los artefactos no contienen credenciales, secretos ni correos personales según el escaneo final. Tampoco contienen temporales ajenos a la fase.

## 10. Pruebas

| Conjunto | Resultado |
|---|---:|
| Regresión acumulada Fases 1–2D | 87/87 correctas |
| Pruebas originales de Fase 1 | 22/22 correctas |
| Pruebas específicas de Fase 2D | 8/8 correctas |
| Ejecuciones visuales reales, corrida principal | 28.268/28.268 |
| Ejecuciones visuales reales, repetición | 28.268/28.268 |

Las pruebas específicas demuestran censo completo, cobertura por cursos/tipos, ausencia de aprobación humana automática, agrupación exacta, controles negativos, aislamiento, reproducibilidad, invariancia de orden y política de capturas selectivas.

## 11. Reproducibilidad, orden y rollback

- **Doble corrida:** coinciden los hashes semánticos de población, grupos, muestreo, geometría y decisiones.
- **Invariancia frente al orden:** coinciden población, grupos y muestreo al invertir el orden de entrada.
- **Rollback:** correcto; capa temporal eliminada, archivos protegidos sin cambios, cero escrituras de producción y cero escrituras de Supabase.

## 12. Limitaciones y criterio de cierre

La Fase 2D queda técnicamente ejecutada, pero no editorialmente cerrada:

1. las 7.064 entidades sin fallo automático requieren dictamen humano para obtener `HUMAN_VISUAL_PASS`/`VISUAL_PASS`;
2. las tres incidencias P0 requieren una corrección posterior y una nueva auditoría;
3. la ausencia de casos reales de sumatorio/producto no permite certificar esa familia;
4. el arnés aislado no certifica la presentación final dentro de la aplicación pública;
5. antes de publicar debe ejecutarse una prueba de preproducción con exactamente el motor, CSS, fuentes y componentes que usará el alumno, repitiendo como mínimo fracciones, sistemas, matrices, determinantes, límites, integrales, vectores, funciones a trozos y soluciones paso a paso.

Por estas razones:

- `catalogPublicationCertified`: `false`;
- `runtimePresentationCertified`: `false`;
- `preproductionTestStillRequired`: `true`.

## 13. Archivos existentes modificados

Ninguno. Todos los elementos de Fase 2D son archivos nuevos y permanecen sin seguimiento. No se han modificado bancos, `data/`, aplicación, Supabase, renderizadores, skills ni artefactos de fases anteriores.

## 14. Estado de Git al cierre

`git diff --stat` no muestra cambios en archivos versionados, porque todos los resultados de Fase 2D son nuevos y aún no están añadidos a Git.

```text
On branch agent/indice-pruebas-y-autenticacion
Your branch is up to date with 'origin/agent/indice-pruebas-y-autenticacion'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        artifacts/fase2d/
        catalog/visual-audit/
        docs/FASE-2D-AUDITORIA-VISUAL-REAL-MATHUP.md
        scripts/fase2d-build-evidence-pages.mjs
        scripts/fase2d-finalize-audit.mjs
        scripts/fase2d-harness-server.mjs
        scripts/fase2d-prepare-audit.mjs
        scripts/fase2d-register-contact-sheets.mjs
        scripts/fase2d-register-screenshots.mjs
        scripts/fase2d-rollback-trial.mjs
        scripts/fase2d-verify-reproducibility.mjs
        tests/fase2d-visual-audit.test.mjs

nothing added to commit but untracked files present (use "git add" to track)
```

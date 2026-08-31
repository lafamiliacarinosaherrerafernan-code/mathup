# Checkpoint local — PAU Madrid

Fecha de cierre: 2026-08-31. Base verificada: `004b9a53aeeabb77b15be97549fe296a44f5c0ed` (`pau-andalucia-auditada-2026-08-31`).

## Estado validado

- Matemáticas II: 825 ejercicios habilitados y 1.925 apartados.
- CCSS II: 903 ejercicios habilitados y 1.853 apartados.
- Documentos oficiales inventariados: 81/81.
- Inaccesibles, sin clasificación o `UNRESOLVED_SOURCE`: 0.
- Capacidad práctica sin repetición: 80 exámenes de Matemáticas II y 84 de CCSS II.
- Navegación E2E multipartada: 3.543/3.543 apartados, 0 fallos.
- Responsive general: 76/76 comprobaciones en 1280, 768, 375 y 320 px.
- Integral definida y Barrow: MathML nativo, gate geométrico 4/4 y aprobación manual final.

## Regresiones finales

- Auditoría maestra de Madrid: PASS; 81/81 documentos y 0 incidencias bloqueantes.
- Auditoría cuantitativa `--madrid-only`: PASS; 0 anomalías.
- Gate oficial Madrid + Andalucía: 1.453 PASS, 0 FAIL.
- Suites permanentes dirigidas: 55 PASS, 0 FAIL.
- Renderer, integral definida y Barrow: PASS estructural y geométrico.
- Andalucía: 0 regresiones en sus gates permanentes.

## Seguridad

- Ficheros candidatos inspeccionados: 65.
- Patrones de secretos o credenciales: 0.
- Direcciones de correo en los candidatos: 0.
- `.env` incluido o versionado por este checkpoint: no.
- Ficheros candidatos mayores de 20 MiB: 0; máximo 4,81 MiB.
- Logs, cachés, ZIP, temporales o copias de salvamento incluidos: 0.
- Supabase y almacenamiento remoto: no modificados.

## Contenido protegido

- Runtime y banco canónico de Madrid, clasificación, soluciones y selector.
- Renderer matemático y estructura MathML nativa de integrales definidas y Barrow.
- Tests permanentes de Madrid, Andalucía, multipartados y geometría responsive.
- Scripts reproducibles de auditoría, propagación, reconciliación e informes.
- Censos por tema, bloque y posición; estadística, reconciliación, no repetición, simulación, E2E y responsive.
- Evidencia BEFORE/AFTER de la propagación manual y hashes de las skills validadas.

## Exclusiones deliberadas

- Capturas PNG reproducibles del recorrido manual y los cientos de informes E2E intermedios.
- OCR y asignaciones temáticas intermedias reproducibles.
- `MASTER-REPORT.zip` y la copia `madrid-pau-authored.corrupt-before-salvage.js`.
- Informes temporales de pasadas anteriores de Andalucía y otros artefactos ajenos a Madrid.
- Ficheros ignorados/excluidos ya presentes localmente; se conservan sin borrar ni limpiar.
- El informe E2E global `latest-report.json`, por ser un artefacto reproducible y voluminoso; se conserva localmente y el resumen final de Madrid queda en `multipart-e2e.json`.

Las skills no fueron regeneradas ni modificadas durante la propagación final. Sus hashes están fijados en `skill-hashes.json`.

No se ha hecho push, ni se ha iniciado Castilla-La Mancha.

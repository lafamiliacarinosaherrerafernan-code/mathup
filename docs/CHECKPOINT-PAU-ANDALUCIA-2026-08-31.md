# Checkpoint PAU Andalucía — 2026-08-31

## Alcance

Punto de restauración local del estado funcional de PAU Andalucía para
Matemáticas II y CCSS II. No incluye despliegue, Supabase, almacenamiento
remoto, Madrid ni Castilla-La Mancha.

## Estado canónico protegido

- Matemáticas II: 817 ejercicios habilitados.
- CCSS II: 824 ejercicios fuente, 823 habilitados y 1 bloqueado.
- Bloqueo documental conservado: `pau-can-ex-88fd4c724da14002349a8f59e3c53fcb`
  (`UNRESOLVED_SOURCE`).
- El runtime, las adiciones documentales, la clasificación temática, los
  recursos estadísticos y la puerta de entrega interactiva están en `data/`.

## Contenido incluido

- Aplicación: `app.js`, `bach-exam.js`, HTML, renderer matemático, estilos y
  configuración PWA modificados.
- Datos: runtime y bancos canónicos de Andalucía, adiciones, índices de fuente,
  clasificación temática, recursos estadísticos y correcciones globales.
- Contratos: esquemas de catálogo y validadores de calidad de soluciones.
- Skills vigentes, añadidas expresamente pese a que `.agents/` está ignorado:
  - `skill-editor-enunciados` y sus referencias de clasificación/calidad;
  - `solucion-de-ejercicios` y sus contratos/política.
- Tests: regresiones permanentes de Andalucía, multipartados, matrices,
  sistemas, determinantes, programación lineal, cálculo, estadística,
  selector PAU, no repetición, fidelidad y responsive.
- Scripts y herramientas fuente: se conservan todos los creados para la cadena
  reproducible de Andalucía; son pequeños y permiten reutilizar los auditores
  en comunidades posteriores. Los resultados de sus ejecuciones se tratan por
  separado como artefactos.
- Evidencia permanente seleccionada: informe/censo maestro, auditoría
  sistemática final, censos del selector y clasificación, resumen E2E
  multipartado, cierre de sistemas/programación lineal, hashes y diffs de
  skills, corrección manual final y paridad fuente-aplicación.

## Artefactos excluidos sin borrar

Se dejan fuera del commit las pasadas intermedias, directorios `debug*`,
capturas masivas, galerías, lotes de resolución, reproducciones repetidas y
logs completos que pueden regenerarse con los scripts versionados. También se
mantienen fuera los PDF/DOC oficiales, paquetes ZIP, cachés, `config.local.js`,
logs del lanzador y estado privado de revisiones humanas, conforme a
`.gitignore`.

La selección aplica este criterio: conservar cierres, censos, hashes, fallos
finales y resúmenes; excluir imágenes y ejecuciones intermedias repetitivas,
salvo las pocas imágenes finales que forman parte del expediente maestro.

## Skills

- `skill-editor-enunciados/SKILL.md` SHA-256:
  `ff8458c6df9777bbd12de80f2d548db0fca9786dab32136f937082c7fc65a16c`
- `skill-editor-enunciados/references/clasificacion.md` SHA-256:
  `f02ec6bea405f61197cf3b4f88e7c9e0796e140b4d5b709dc9c73bd0b2e1c6f3`
- `solucion-de-ejercicios/SKILL.md` SHA-256:
  `de90c3576320fc42ff233461e0b57cff1afd8898f561ffb24bdb13960b660c79`

Estos hashes coinciden con el manifiesto final de la Fase 2.X. Las skills no
se regeneraron ni se editaron durante la preparación del checkpoint.

## Datos y dependencias locales

El estado que consume la aplicación queda reconstruible desde los archivos
versionados. No se ha tocado ninguna base local, Supabase, migración o seed.

Los documentos oficiales originales continúan en rutas locales ignoradas por
Git. No son necesarios para ejecutar el runtime congelado, pero sí para repetir
desde cero una reconciliación documental contra la fuente original. Tampoco se
versionan configuraciones locales, credenciales ni datos personales.

## Pruebas pre-commit

- Sintaxis: `app.js`, `bach-exam.js`, `math-renderer.js` y runtime Andalucía:
  PASS.
- Gates finales de Andalucía: 83/83 PASS.
- Aislamiento histórico de la herramienta visual: 10/10 PASS.
- Firmas de secretos en el contenido preparado: 0 coincidencias.
- Nombres sensibles (`.env`, claves, credenciales): 0.
- Archivos gigantes accidentales: 0; máximo 19,85 MB
  (`data/andalucia-pau-runtime.js`).

La prueba histórica de aislamiento se corrigió para admitir únicamente la URL
de namespace estándar `http://www.w3.org/1998/Math/MathML`, manteniendo la
prohibición de Supabase y de cualquier otra URL. No se actualizó ningún hash a
ciegas.

La ejecución automática de los 284 archivos de pruebas generales se detuvo
porque un proceso local histórico permaneció abierto después de ejecutar sus
aserciones. No se contabiliza esa ejecución incompleta como PASS. Las puertas
finales relevantes se ejecutaron después por separado y terminaron 93/93 PASS.

## Seguridad y publicación

- Secretos detectados: 0.
- Push: no realizado.
- Tag: local.
- Producción/Supabase/almacenamiento remoto: sin cambios.

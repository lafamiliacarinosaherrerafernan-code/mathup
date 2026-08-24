# Herramienta local de revisión humana visual — Fase 2D de +MathUp

## 1. Resultado

Se ha implementado una herramienta local, aislada y reanudable para ejecutar el escenario B equilibrado aprobado en los documentos de referencia. La herramienta no está conectada a la aplicación pública, no usa red externa, Supabase, credenciales ni datos personales del alumnado, y no concede ningún dictamen humano sin una acción explícita de la persona revisora.

La cola reproducible contiene exactamente:

- 7.064 entidades cubiertas;
- 5.722 observaciones humanas directas;
- 1.342 entidades potencialmente cubiertas por propagación;
- 967 grupos exactos;
- 316 grupos paramétricos, formados por 113 grupos ya existentes y 203 grupos equilibrados seleccionados de forma determinista;
- 3.917 entidades individuales;
- 30 grupos paramétricos candidatos excluidos para reproducir exactamente el escenario B aprobado.

La generación no contiene fecha variable y produce el mismo manifiesto semántico aunque cambie el orden de entrada.

## 2. Componentes

### Núcleo auditable

`catalog/human-visual-review/fase2d-human-review.mjs` implementa:

- lectura y escritura determinista;
- firmas, hashes y bloqueo del entorno visual;
- agrupación exacta y visual-paramétrica;
- selección determinista de testigos múltiples y muestras posteriores;
- construcción de la cola equilibrada;
- validación estricta de decisiones humanas;
- propagación y revocación;
- invalidación por cambios de hashes, CSS, fuentes, motor o representación;
- progreso y cobertura;
- rollback de la última decisión.

### Construcción de la cola

`scripts/fase2d-build-human-review-queue.mjs` lee exclusivamente artefactos ya generados por Fase 2D y produce:

- `artifacts/fase2d-human-review/review-queue.jsonl`;
- `artifacts/fase2d-human-review/review-groups.jsonl`;
- `artifacts/fase2d-human-review/review-manifest.json`;
- `artifacts/fase2d-human-review/environment-lock.json`;
- `artifacts/fase2d-human-review/build-summary.json`.

Los artefactos conservan identificadores, hashes, geometría de 320/375/768/1280 px, metadatos académicos, procedencia PAU, roles de testigo/muestra y relaciones de cobertura.

### Servidor y pantalla local

`tools/fase2d-human-review/server.mjs` escucha únicamente en `127.0.0.1`. La interfaz se encuentra en `tools/fase2d-human-review/public/` y ofrece:

- vistas permanentes de 320 y 1280 px;
- vistas rápidas adicionales de 375 y 768 px;
- expresión literal real y, en soluciones, todos los pasos y el resultado final conservados en la entidad;
- curso, materia, tipo, familia, prioridad, tema y datos PAU disponibles;
- identificadores, rutas de origen y hashes;
- tipo de grupo, papel del caso y número de entidades cubiertas;
- filtros por curso, materia, familia, prioridad, tipo, comunidad, estado y búsqueda;
- navegación anterior/siguiente que respeta los filtros;
- avance automático tras registrar una decisión;
- progreso total y cobertura por curso, materia y familia.

Las tres únicas decisiones admitidas son `APROBAR`, `REVISAR/FALLO` y `FUENTE DUDOSA`. Los dos últimos estados exigen comentario. Toda decisión exige identificador de revisor y haber abierto, como mínimo, las vistas de 320 y 1280 px.

## 3. Apertura

Desde PowerShell, en la raíz del proyecto:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\fase2d-start-human-review.ps1
```

El iniciador localiza Node.js, genera la cola si aún no existe, inicia el servidor oculto y abre `http://127.0.0.1:8824/` en el navegador. También puede iniciarse manualmente con:

```powershell
node .\tools\fase2d-human-review\server.mjs --port=8824
```

No debe compartirse el puerto ni exponerse el proceso a otra interfaz de red.

## 4. Registro y reanudación

Las decisiones se guardan localmente en:

`artifacts/fase2d-human-review/local-state/review-state.json`

Esta carpeta está excluida de Git porque puede contener el identificador del revisor y comentarios humanos. No contiene datos del alumnado. Cada registro conserva:

- decisión y comentario;
- fecha/hora;
- identificador del revisor;
- entidad y hashes esperados;
- resoluciones vistas;
- grupos, roles y relaciones de propagación aplicables;
- historial necesario para rollback.

La posición de la cola se actualiza después de cada acción. Al volver a abrir la herramienta se recuperan el revisor, la posición, las decisiones vigentes, los dictámenes heredados y las revocaciones.

## 5. Propagación y revocación

No existe aprobación masiva. La propagación solo es posible dentro de un grupo aprobado por las reglas del escenario B:

1. todos los testigos obligatorios deben haber recibido `APROBAR` mediante acción humana explícita;
2. el grupo debe conservar exactamente sus firmas y hashes;
3. las entidades de revisión individual obligatoria no pueden recibir herencia;
4. las muestras posteriores permanecen como observaciones humanas directas;
5. la herencia se registra como `INHERITED_HUMAN_VISUAL_PASS`, nunca como decisión directa.

Si un representante, testigo o muestra posterior recibe `REVISAR/FALLO` o `FUENTE DUDOSA`, se revoca inmediatamente toda propagación del grupo. Las entidades afectadas vuelven a estado pendiente o revocado y el grupo requiere división o revisión individual.

Un cambio en cualquiera de los hashes bloqueados —entradas, representación, geometría, CSS, fuentes, motor o manifiesto— invalida las decisiones y propagaciones vigentes. El historial invalidado se conserva como evidencia, pero deja de contar en la cobertura actual.

## 6. Familias y soluciones sensibles

La cola fuerza revisión individual para soluciones y para las familias sensibles aprobadas: integrales, límites, matrices, determinantes, sistemas, vectores, funciones a trozos, fracciones complejas y expresiones multilínea. Esos casos no se reducen mediante propagación aunque compartan semejanzas estructurales.

Los grupos paramétricos solo admiten diferencias controladas que no alteran la política de representación, la topología, los operadores, delimitadores, líneas ni geometría en las cuatro resoluciones. Se revisan varios testigos deterministas y una muestra posterior; un único fallo anula el grupo.

## 7. Pruebas ejecutadas

La prueba específica `tests/fase2d-human-visual-review.test.mjs` cubre:

- cola exacta 5.722 y cobertura 7.064/7.064;
- 1.342 herencias potenciales bajo reglas válidas;
- reproducibilidad e invariancia frente al orden;
- imposibilidad de decidir sin `humanAction: true`;
- testigos múltiples, propagación y revocación;
- persistencia, reanudación, progreso y rollback;
- invalidación por cambio del entorno;
- aislamiento y ausencia de cambios en producción.

Resultado específico: **7/7 pruebas superadas**.

Se ejecutó además la regresión completa disponible del proyecto, incluidas las 22 pruebas originales de Fase 1 y las pruebas de Fases 2, 2A, 2B, 2C, 2D y corrección P0.

Resultado global: **100/100 pruebas superadas; 0 fallidas, 0 canceladas y 0 omitidas**.

El servidor local se verificó en un puerto alternativo sin registrar decisiones: listado de casos correcto, vista aislada de 320 px con respuesta HTTP 200 y ausencia del fichero de estado humano.

## 8. Aislamiento y seguridad

- No se modifican `index.html`, `app.js`, `math-renderer.js`, bancos, `data/`, Supabase, skills ni contratos existentes.
- El servidor solo enlaza `127.0.0.1` y no contiene llamadas a servicios externos.
- El arnés visual usa exclusivamente las entidades y geometrías auditadas de Fase 2D.
- No se almacena información personal del alumnado.
- No se ha iniciado ninguna revisión humana real durante la implementación o las pruebas.
- No se ha realizado commit ni push.

## 9. Limitaciones

- Esta herramienta registra dictámenes humanos sobre el arnés aislado de Fase 2D; no certifica todavía la presentación final del runtime público.
- Antes de publicar será necesaria la prueba de preproducción prevista, con el motor, CSS, fuentes y componentes definitivos del alumno.
- Las vistas se componen a partir del literal y la política aislada ya auditada. No corrigen ni reinterpretan contenido matemático.
- Los comentarios y el identificador del revisor permanecen deliberadamente solo en el equipo local y deben exportarse mediante un procedimiento de revisión antes de decidir su conservación.
- La herramienta no incorpora autenticación multiusuario ni sincronización en red, porque ambas contradirían el aislamiento requerido.

## 10. Cierre de esta entrega

La herramienta queda preparada para revisión, pero la cola sigue íntegramente sin decisiones humanas. El inicio efectivo de la revisión requiere autorización posterior expresa.

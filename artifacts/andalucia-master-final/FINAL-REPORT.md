# Auditoría final de Andalucía para revisión manual

Fecha de cierre técnico: 2026-08-30.

Estado: procesamiento y auditoría automatizada completados. La validación definitiva queda pendiente de la revisión manual de la usuaria.

## Alcance documental

- 217 exámenes inventariados: 110 de Matemáticas II y 107 de CCSS II.
- 1 tabla auxiliar de distribución normal excluida correctamente del censo de exámenes.
- 1.641 ejercicios canónicos reconciliados.
- Paridad documental: 1.547 coincidencias directas, 80 descomposiciones interactivas conservadoras y 14 subdivisiones interactivas.
- Fallos de paridad entre ejercicios habilitados: 0.
- Fallos de calidad entre ejercicios habilitados: 0.

## Entrega interactiva

### Matemáticas II

- 817 ejercicios procesados.
- 789 habilitados y 28 bloqueados individualmente por la puerta de seguridad.
- 1.382 apartados interactivos habilitados.
- 14 temas presentes.
- Posiciones de examen: 191 / 211 / 182 / 200 / 5.
- Capacidad teórica: 7.334.782.000 combinaciones.
- Capacidad práctica sin repetir: 5 exámenes completos.

### CCSS II

- 824 ejercicios procesados.
- 808 habilitados y 16 bloqueados individualmente por la puerta de seguridad.
- 1.953 apartados interactivos habilitados.
- 11 temas visibles; los temas sin banco seguro permanecen marcados como pendientes de validación.
- Posiciones de examen: 117 / 115 / 149 / 427.
- Capacidad teórica: 856.047.465 combinaciones.
- Capacidad práctica sin repetir: 115 exámenes completos.

Los 44 bloqueos se conservan en `blocked-final.jsonl` con archivo, año, convocatoria, ejercicio y causa exacta. Las causas son falta de evidencia de verificación o respuestas/distractores OCR demasiado extensos para una interacción segura. Ningún bloqueo elimina la fuente canónica.

## Correcciones funcionales verificadas

- Cuatro opciones únicas, respuesta correcta, tres distractores y solución completa en toda entrega habilitada.
- Conservación de apartados y separación entre fuente, ejercicio canónico y unidad interactiva.
- Matrices, sistemas, funciones a trozos, fracciones, raíces, límites, integrales, exponentes, subíndices y unidades sin tokens internos visibles.
- Rouché–Frobenius con rangos y menor de orden 2 en discusiones paramétricas.
- Rectas de signos de `f′` y `f′′` donde corresponden.
- CCSS II sin uso positivo de L’Hôpital.
- Tabla normal andaluza disponible en desplegable y excluida del inventario de exámenes.
- Regla de clasificación corregida para distinguir «recta normal» de «distribución normal».
- Planos y rectas espaciales excluidos del bloque de Álgebra.
- Selector por temas, bloques y examen separado por materia y comunidad.
- Matemáticas II: retos de 5 y exámenes de 5; CCSS II: retos de 4 y exámenes de 4.
- Responsive comprobado a 375, 768 y 1280 px sin desbordamiento horizontal.

## Pruebas

- Batería final relevante: 60 aprobadas, 0 fallidas.
- Revisión funcional en navegador: temas, bloques, examen, opciones, corrección, solución pedagógica y tabla normal.
- El validador oficial `quick_validate.py` de skills no pudo arrancar por ausencia de `PyYAML`; su contrato se replicó localmente y ambas skills superaron la validación estructural.

## Skills

- Se conservaron copias anterior y posterior.
- Se guardaron diffs independientes.
- Los hashes SHA-256 constan en `skill-hashes.json`.
- `solucion-de-ejercicios`: `855c9b...e21f` → `1541d7...c52eb`.
- `skill-editor-enunciados`: `621b1d...be80` → `7cfcf8...48699`.

## Restricciones respetadas

- Sin commit.
- Sin push.
- Sin cambios en Madrid ni Castilla-La Mancha.
- Sin operaciones en Supabase.
- La aplicación queda abierta para revisión manual; este informe no declara Andalucía definitivamente validada.

# Resultado de la prueba controlada MyScript · Fase 2B

Fecha: 13 de agosto de 2026.

## Alcance

- Entorno local de desarrollo: `http://127.0.0.1:8799`.
- Curso ficticio: 1.º ESO.
- Ejercicio: operación con números naturales cuyo resultado era `25`.
- Datos enviados: únicamente los trazos normalizados incluidos en la región marcada, el tipo esperado y el locale.
- No se enviaron nombre, grupo, puntuación, enunciado, respuesta correcta ni solución.

## Resultado

- Solicitudes reales realizadas a MyScript: **1**.
- Expresión manuscrita enviada: `25`.
- Expresión reconocida: `25`.
- Confianza: no disponible en la respuesta de MyScript.
- Estado aplicado por Margarita Salas: `ambiguous`, pendiente de confirmación visual.
- Puntuación después de la prueba: `0`.
- Racha después de la prueba: `0`.
- Progreso después de la prueba: `1/10`, sin cambio.

La prueba confirma el flujo real trazos → proxy seguro de Supabase → MyScript → expresión reconocida. También confirma que la ausencia de confianza no se convierte en un acierto o fallo automático.

## Cierre de seguridad

Tras la única petición autorizada se sustituyó el secreto servidor `MYSCRIPT_TEST_ENABLED` por `false`. Las credenciales permanecen cifradas en Supabase, pero el proxy rechaza nuevas peticiones hasta que exista una nueva autorización expresa y se vuelva a habilitar temporalmente.

No se conservaron imágenes ni trazos de la muestra en este informe.

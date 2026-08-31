# Preparación de la evaluación real de MyScript · Fase 2C

## Estado

La herramienta interna está preparada, pero la evaluación de precisión **no se considera realizada** hasta que personas reales escriban y clasifiquen aproximadamente 100 muestras. No se han generado trazos artificiales ni se han consumido nuevas peticiones durante esta preparación.

## Corpus

| Familia | Muestras previstas |
|---|---:|
| Enteros y decimales | 10 |
| Fracciones | 15 |
| Potencias | 10 |
| Raíces | 10 |
| Álgebra | 15 |
| Ecuaciones | 15 |
| Desigualdades e intervalos | 10 |
| Coordenadas | 5 |
| Expresiones combinadas | 10 |
| **Total** | **100** |

La interfaz permite seleccionar `writer-1` a `writer-5`. No solicita ni conserva nombres, curso, grupo, alumno o cuenta.

## Flujo preparado

1. El profesor abre **Panel de desarrollo → Evaluación MyScript**.
2. La pantalla muestra la expresión objetivo y el consumo conocido antes del bloque.
3. Una persona la escribe manualmente en la pizarra real y marca la respuesta.
4. La aplicación muestra `He reconocido: ...` y mantiene `confidence = null` cuando MyScript no entrega confianza.
5. El profesor clasifica manualmente el resultado como correcto, incorrecto, ambiguo o error técnico.
6. El registro guarda solo identificadores anónimos, expresiones, familia, resultado, petición y latencia. No guarda los trazos.

## Métricas

La herramienta calcula por separado precisión literal, equivalencia matemática, falsos positivos, falsos negativos, ambigüedad, errores técnicos y latencias. También prepara la tabla por familias y la matriz de confusiones.

## Controles

- Petición previa conocida: 1.
- Máximo total autorizado en esta fase: 200.
- No hay conexión con puntos, racha, energía, progreso ni desbloqueos.
- Las claves continúan exclusivamente en Supabase.
- El origen CORS se obtiene de `MYSCRIPT_ALLOWED_ORIGIN` y no usa comodín.
- `MYSCRIPT_TEST_ENABLED` debe activarse solo durante cada sesión y volver a `false` al terminar.

## Despliegue y pendiente imprescindible

La versión del proxy que informa de forma fiable si una respuesta técnica consumió una petición se desplegó correctamente en `recognize-math` el 13 de agosto de 2026. El despliegue no realizó ninguna solicitud de reconocimiento.

Queda pendiente realizar las 100 muestras a mano. Solo entonces podrá emitirse la decisión A, B o C y cerrar la fase con `MYSCRIPT_TEST_ENABLED=false` confirmado.

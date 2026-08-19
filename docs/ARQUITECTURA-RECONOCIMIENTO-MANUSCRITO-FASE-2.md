# Reconocimiento manuscrito · Fase 2 diagnóstica

## Estado y límite de esta fase

La aplicación ya captura tinta digital vectorial, permite seleccionar la respuesta final y exporta exclusivamente los trazos de esa selección, sin datos personales ni solución. No existe todavía un motor real de reconocimiento matemático. Esta fase añade el contrato modular y el validador local, pero no finge OCR y no modifica puntuación, racha, energía, progreso, desbloqueos ni el resultado oficial.

## Flujo preparado

1. `handwriting-ink.js`: captura, selección, extracción y normalización geométrica.
2. `handwriting-recognition.js`: contrato desacoplado para proveedores y control de confianza/errores.
3. Salida estructurada preferente: LaTeX.
4. `math-answer-validator.js`: normalización y equivalencia matemática inicial.
5. `handwritingValidated` y `margarita:handwriting-validated`: canal diagnóstico existente, ampliado con estados no binarios.

Estados: `recognized`, `equivalent`, `not-equivalent`, `ambiguous`, `unsupported`, `unavailable` y `technical-error`.

## Cobertura del validador inicial

- Enteros, decimales y fracciones exactas mediante aritmética racional.
- Potencias enteras sencillas y raíces cuadradas exactas.
- Expresiones algebraicas polinómicas básicas mediante forma canónica exacta.
- Ecuaciones con dos políticas explícitas: estructura original o mismo conjunto solución para ecuaciones polinómicas equivalentes.
- Tolerancia únicamente cuando el ejercicio la proporciona.
- Baja confianza: nunca se convierte en acierto o fallo.

Todavía no cubre sistemas, intervalos, unidades compuestas, trigonometría, derivadas, matrices ni raíces irracionales simbólicas.

## Motores evaluados

### Locales abiertos (SAN y modelos HMER similares)

Modelos de investigación basados en PyTorch/CROHME. Ventajas: procesamiento local y control de datos. Inconvenientes: pesos y entorno Python pesados, mantenimiento propio, integración compleja en una aplicación web estática y ausencia de una precisión demostrada para el corpus real de Margarita Salas. No son apropiados para activar una función fiable en esta fase.

### MyScript iink

Especializado en tinta digital y matemáticas; recibe trazos y exporta LaTeX, MathML o JIIX. Ofrece 2.000 solicitudes cloud gratuitas y después requiere contrato. Es un candidato fuerte por trabajar directamente con los trazos ya capturados. Requiere credenciales y envío temporal de la región manuscrita a su servicio.

### Mathpix Strokes

Especializado en matemáticas manuscritas; recibe coordenadas de trazos y devuelve LaTeX con confianza. Coste publicado: 0,002 USD por petición sin actualizaciones en el primer millón, con cuota inicial de activación de 19,99 USD; las sesiones con actualización tienen otra tarifa. Requiere credenciales y envío temporal de la selección manuscrita.

### OCR generalista (Google Cloud Vision y equivalentes)

Reconoce escritura general, pero no conserva de forma fiable la estructura bidimensional matemática. No debe utilizarse como solución única para fracciones, potencias, raíces, matrices o sistemas.

## Recomendación

Realizar una prueba comparativa controlada MyScript iink frente a Mathpix Strokes con el corpus anónimo definido en `handwriting-recognition-corpus-spec.json`. No elegir por una cifra global: medir por separado signos, fracciones, exponentes, raíces y errores graves. No integrar ni contratar hasta que el profesor autorice proveedor, coste y tratamiento de datos.

Enviar únicamente los trazos normalizados de la región marcada, tipo de respuesta y locale si fueran necesarios. No enviar nombre, grupo, puntuación, enunciado completo ni solución. Procesar de forma temporal y no conservar imágenes o trazos en logs.

## Fase 2B · MyScript iink

La aplicación es un cliente web estático. Las claves de MyScript no pueden guardarse en `config.local.js`, JavaScript o HTML porque quedarían expuestas. Se ha preparado `supabase/functions/recognize-math/index.ts` como proxy servidor: recibe únicamente la tinta seleccionada, crea la firma HMAC y llama a MyScript con `contentType: "Math"`. Las claves se leerán exclusivamente desde los secretos `MYSCRIPT_APPLICATION_KEY` y `MYSCRIPT_HMAC_KEY` de Supabase.

La función `recognize-math` está desplegada en el proyecto de desarrollo de Supabase y las credenciales permanecen exclusivamente en sus secretos cifrados. El 13 de agosto de 2026 se realizó una única prueba real autorizada: la expresión manuscrita `25` fue reconocida como `25`. MyScript no devolvió una confianza numérica y la aplicación mantuvo correctamente el estado `ambiguous`, pendiente de confirmación visual. Tras la prueba, `MYSCRIPT_TEST_ENABLED` volvió a `false`, por lo que el proxy rechaza nuevas solicitudes hasta una habilitación temporal expresa. El detalle anónimo está en `docs/RESULTADO-PRUEBA-CONTROLADA-MYSCRIPT-FASE-2B.md`.

Además, el proveedor solo puede activarse cuando coinciden `DEVELOPER_MODE: true` y `MYSCRIPT_CONTROLLED_TEST: true`. En el resto de la aplicación permanece inactivo aunque Supabase esté configurado. El proxy aplica un segundo cierre independiente: exige `MYSCRIPT_TEST_ENABLED=true` en sus secretos de servidor; de lo contrario devuelve `controlled-test-disabled` sin contactar con MyScript ni consumir cuota. CORS se limita al origen exacto indicado en `MYSCRIPT_ALLOWED_ORIGIN`; no se admite el comodín `*`.

MyScript JIIX ofrece la etiqueta matemática en LaTeX, pero la documentación consultada no garantiza un campo numérico general de confianza para Math. Por eso el adaptador no fabrica confianza: cuando falte, conserva el estado `ambiguous` y exige confirmación visual.

El corpus inicial está definido en `handwriting-recognition-phase2b-corpus.json`. Las muestras reales deberán introducirse con la pizarra y mantenerse anónimas y temporales. La prueba real queda limitada a ESO; Bachillerato no llama al proveedor.

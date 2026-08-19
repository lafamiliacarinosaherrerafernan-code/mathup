# Fase 2D — Piloto transversal real de MyScript

## Estado

La herramienta del piloto está preparada, pero el piloto real **no se ha ejecutado**. Esta pausa es intencionada: las 60 muestras deben ser escritas a mano por tres personas reales. No se han simulado trazos ni se ha consumido ninguna petición de MyScript durante la preparación y la auditoría técnica.

La referencia de cuota anterior al piloto sigue siendo **1/2000**. El servidor debe mantener `MYSCRIPT_TEST_ENABLED=false` mientras no se esté realizando la sesión real.

## Selección cerrada

La selección reutiliza los corpus ya existentes de las fases 2C:

- 24 muestras del corpus básico de 100 muestras.
- 36 muestras de la propuesta avanzada de 116 muestras.
- 60 muestras en total.
- `writer-1`, `writer-2` y `writer-3`: 20 muestras asignadas a cada uno.

No se ha creado un tercer corpus. `data/myscript-phase2d-pilot-selection.js` contiene únicamente referencias a los dos conjuntos ya auditados.

| Familia transversal | Muestras |
|---|---:|
| Números y decimales | 4 |
| Fracciones | 5 |
| Potencias y raíces | 5 |
| Álgebra y ecuaciones | 6 |
| Inecuaciones, intervalos y coordenadas | 4 |
| Matrices | 4 |
| Determinantes | 3 |
| Sistemas | 3 |
| Límites | 5 |
| Derivadas | 5 |
| Funciones, trigonometría y logaritmos | 5 |
| Vectores, complejos y geometría | 4 |
| Probabilidad, estadística e integrales | 4 |
| Confusiones críticas | 3 |
| **Total** | **60** |

La selección cubre expresamente matrices, determinantes, sistemas, límites laterales e infinito, derivadas con varias notaciones, una función a trozos, `sen`, `cos`, `tg`, `sen²`, una integral indefinida, una integral definida y las letras griegas α, λ, μ, σ y π.

## Alcance de esta fase

La fase mide si MyScript reconoce correctamente **la respuesta final marcada**. En Bachillerato no se intenta todavía juzgar todo el procedimiento manuscrito. Conservar y comprender el proceso completo queda como una mejora posterior; no se mezcla con la decisión de esta fase.

Para las muestras avanzadas se registran por separado:

- `RECOGNITION_OK` o el estado real del reconocimiento.
- `VALIDATOR_NOT_IMPLEMENTED` cuando Margarita Salas todavía no dispone del validador matemático correspondiente.

Por ello, la falta de validador avanzado no convierte un reconocimiento correcto en un fallo.

## Datos registrados

Para cada intento se conserva únicamente:

- identificador de muestra y escritor anónimo;
- familia y nivel básico/avanzado;
- expresión objetivo;
- expresión y LaTeX devueltos;
- parte relevante del JIIX, sin trazos;
- clasificación manual: correcto, incorrecto, ambiguo o error técnico;
- estado independiente del validador;
- latencia y número de peticiones;
- fecha del registro.

No se guardan trazos, nombres, cuentas de alumnos, puntuación, racha ni progreso.

## Protocolo de ejecución real

1. Confirmar que están presentes los tres escritores y que cada uno conoce sus 20 muestras.
2. Anotar el contador de MyScript antes de empezar.
3. Activar `MYSCRIPT_TEST_ENABLED=true` en Supabase inmediatamente antes de la primera muestra.
4. Abrir en modo desarrollador «Piloto transversal MyScript».
5. Escribir cada muestra a mano y marcar únicamente el recuadro que contiene la respuesta.
6. Clasificar manualmente el reconocimiento mostrado. No repetir una muestra por un fallo de reconocimiento.
7. Repetir únicamente si existe un error técnico o de interfaz verificable.
8. No superar 60 peticiones planificadas más 10 repeticiones técnicas: **70 adicionales como máximo**.
9. Copiar el informe JSON al terminar y guardarlo en el proyecto de OneDrive.
10. Cerrar la sesión y cambiar inmediatamente `MYSCRIPT_TEST_ENABLED=false` en Supabase.
11. Verificar el contador final de MyScript.

## Métricas y decisión

El informe calcula:

- precisión global;
- precisión básica y avanzada;
- precisión por familia;
- ambiguos y errores técnicos;
- latencia media y máxima;
- confusiones objetivo/reconocimiento;
- problemas sistémicos en matrices, determinantes, sistemas, límites y derivadas.

Umbrales:

- 95 % o más, sin problemas sistémicos: muy prometedor.
- 90 % a 94,9 %: prometedor, necesita ajustes.
- Menos del 90 %: revisar captura/preprocesado y comparar familias problemáticas.

La recomendación A/B/C/D solo tendrá valor después de completar las 60 muestras reales. La herramienta no ejecuta automáticamente ninguna recomendación.

## Validación técnica previa

El auditor `scripts/audit_myscript_phase2d.mjs` comprueba la distribución, las referencias, los tres bloques de 20 escritores, la cobertura de notación y las barreras de seguridad. Este auditor no llama a MyScript y consume **0 peticiones reales**.

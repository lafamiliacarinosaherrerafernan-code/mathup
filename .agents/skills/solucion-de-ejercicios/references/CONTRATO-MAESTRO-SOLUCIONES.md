# Contrato maestro de soluciones de +MathUp

## Propósito

Este contrato evita que una respuesta correcta pero incompleta, una solución sin desarrollo o una representación técnica defectuosa llegue al alumno. No autoriza a modificar enunciados ni a inventar datos.

## Secuencia obligatoria

1. Congelar el enunciado literal y sus apartados.
2. Resolver independientemente, sin consultar la posición de la opción correcta.
3. Verificar la respuesta por un procedimiento apropiado y registrar la comprobación.
4. Redactar pasos reproducibles para el nivel del curso.
5. Generar distractores a partir de errores plausibles solo después de fijar la respuesta.
6. Validar unicidad textual y equivalencia matemática de las opciones.
7. Materializar y barajar las cuatro opciones por intento con semilla reproducible.
8. Convertir el contenido a bloques de texto y matemáticas; renderizarlo sin exponer sintaxis interna.
9. Auditar por separado exactitud matemática, suficiencia pedagógica y presentación visual.

## Salida mínima

- `exerciseId`, curso, materia, tema y procedencia.
- `statement`: literal y estructurado por apartados.
- `answer`: respuesta calculada y comprobada.
- `steps[]`: explicación y expresión matemática en cada paso.
- `finalAnswer`: coherente con `answer`.
- `verification`: comprobación independiente o razón explícita de revisión.
- `methods[]`: métodos realmente utilizados.
- `distractors[]`: tres solo cuando la modalidad requiera elección múltiple.
- `reviewStatus`: apto o revisión requerida, sin fabricar contenido ausente.

## Barreras de publicación

Bloquean la entrega al alumno: respuesta y resultado final incoherentes; ausencia de pasos; método prohibido por curso; distractores duplicados o equivalentes; `undefined`, `null`, JSON o LaTeX crudo visible; apartados concatenados; y cualquier dato matemático inventado.

## Matriz didáctica

| Ámbito | Reglas maestras |
|---|---|
| ESO | Desarrollo acorde a la edad; operaciones y fracciones por pasos; Gauss explicado para 3×3 cuando corresponda. |
| Matemáticas I | Sin L’Hôpital; Gauss en 3×3; análisis de signos en extremos/inflexión cuando proceda. |
| Matemáticas II | L’Hôpital solo para 0/0 o ∞/∞ demostrados; Rouché–Frobenius con parámetros; Cramer/Gauss según proceda; integración por partes completa. |
| CCSS II | L’Hôpital prohibido; primitivas indefinidas solo inmediatas y en Práctica; sin integración avanzada. |

## Representación

La fuente de verdad es el contenido estructurado. LaTeX o MathML son representaciones derivadas. Los delimitadores de transporte no forman parte del texto visible. Un valor ausente se omite y nunca se interpola como cadena.


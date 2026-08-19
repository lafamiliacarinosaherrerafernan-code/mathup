# Criterio definitivo de modalidades · nuevo banco de 3.º ESO

Fecha de decisión del profesor: 9 de agosto de 2026.

## Regla general

Los ejercicios validados de la ampliación A+B no quedan restringidos a Práctica por temas. Un mismo ejercicio conserva una sola identidad y puede estar disponible en varias modalidades mediante metadatos de disponibilidad; no se duplica como varios ejercicios.

## Modalidades

- **Práctica por temas:** contiene todos los ejercicios validados del tema y respeta el nivel Aprendiz/Maestro.
- **Retos:** utiliza los ejercicios que correspondan exactamente al tema y al nivel del reto.
- **Aventuras:** admite ejercicios Aprendiz y Maestro según la dificultad real de la fase. La progresión debe ir de accesible a intermedia y después a razonamiento o dominio avanzado.
- **Examen por bloques y Examen:** la idoneidad se decide ejercicio a ejercicio. No se deduce automáticamente de Aprendiz/Maestro.

Un ejercicio es apto para examen únicamente si su contenido coincide con lo evaluado, la dificultad es apropiada, el enunciado es autosuficiente, no depende de ayudas, constituye una pregunta razonable de evaluación, incluye correctamente cualquier recurso visual imprescindible y tiene una respuesta inequívoca en formato tipo test.

Un ejercicio Maestro puede quedar fuera del examen si es guiado o propio de entrenamiento. Un ejercicio Aprendiz puede entrar si constituye una pregunta básica de evaluación adecuada.

## Reglas que permanecen vigentes

- No completar una cantidad con ejercicios de otro tema.
- Mantener la no repetición hasta agotar el banco correspondiente.
- Interés simple y compuesto pertenecen exclusivamente a **Sucesiones**.
- La geometría plana no se clasifica como **Cuerpos geométricos**.
- Los ejercicios estadísticos contradictorios 28/29 permanecen excluidos.
- No reconstruir figuras, tablas, gráficas, fórmulas ni datos dudosos.

## Implementación

El banco registra por separado `practiceEligible`, `challengeEligible`, `adventureEligible`, `examByBlocksEligible` y `examEligible`. La etiqueta `challengeLevel` solo expresa progresión Aprendiz/Maestro y no determina por sí sola la aptitud para examen.

La auditoría final debe contar identidades únicas y mostrar, por cada uno de los diez temas, ejercicios totales y disponibilidad en Práctica, Retos, Aventuras, Examen por bloques y Examen, además del reparto Aprendiz/Maestro.

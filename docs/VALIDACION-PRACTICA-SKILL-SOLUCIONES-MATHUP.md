# Validación práctica de la skill de soluciones de +MathUp

## 1. Alcance y condición de cierre

Esta validación comprueba de forma práctica y ejecutable la actualización contractual de la skill `solucion-de-ejercicios`. No certifica todavía todo el corpus histórico ni autoriza la reanudación del procesamiento masivo de Andalucía.

La fase se ha ejecutado de forma aislada, sin modificar los bancos, Madrid, Castilla-La Mancha, Supabase ni el runtime público. No se ha utilizado Mathpix y no se ha realizado commit ni push.

La condición de cierre aplicada ha sido:

- cero errores matemáticos en la batería;
- cero incumplimientos del contrato maestro;
- verificación independiente ejecutable para el 100 % de los ejercicios;
- cero `undefined`, delimitadores técnicos o LaTeX crudo en la muestra visual;
- cero desbordamientos horizontales en escritorio y móvil;
- cero regresiones en las pruebas ejecutadas.

## 2. Skill validada y trazabilidad

- Ruta exacta: `C:\Users\aherr\OneDrive\Documentos\Codex\APP MARGARITA SALAS\.agents\skills\solucion-de-ejercicios\SKILL.md`.
- SHA-256 anterior a la actualización contractual: `be89f4f19b08743c722d84f3160bc34170d81b315099dcd054360d5c485725e2`.
- SHA-256 actual: `18d4ead04a7159af4882134535a7b15632a430118b0c7f6b24ef45806aab9444`.
- La actualización contractual comprende `SKILL.md`, `references/CONTRATO-MAESTRO-SOLUCIONES.md` y `references/policy-matrix.json`.
- La fase práctica descrita en este informe no ha vuelto a modificar esos tres archivos; los ha consumido como reglas de validación.

Las reglas consolidadas exigen desarrollo didáctico completo, resultado final comprobado, notación matemática limpia, método adecuado al curso, opciones coherentes cuando procedan y rechazo explícito de soluciones incompletas o material técnico visible. Entre las políticas específicas comprobadas están: Gauss, Cramer y Rouché–Frobenius; prohibición de L'Hôpital en Matemáticas I; uso permitido de L'Hôpital en Matemáticas II; técnicas de integración; análisis de funciones; geometría vectorial; probabilidad, estadística e inferencia; y separación entre contenido matemático y materialización de opciones.

La carpeta `.agents/` está ignorada por la regla `.gitignore:98`. Para un futuro checkpoint deberán añadirse de forma explícita y controlada únicamente los archivos aprobados de la skill, por ejemplo mediante `git add -f` sobre sus rutas exactas, después de una auditoría de privacidad y con autorización expresa. No debe desactivarse globalmente la exclusión de `.agents/`.

## 3. Metodología

Cada caso contiene:

1. un ejercicio completo;
2. una solución destinada al alumno;
3. un resultado esperado obtenido de forma independiente;
4. una comprobación matemática ejecutable;
5. validación contra el contrato maestro;
6. clasificación final.

No se ha considerado suficiente que una solución pareciera correcta. Las verificaciones incluyen aritmética exacta, sustitución en la ecuación original, productos matriz-vector, determinantes independientes, análisis de signos, derivación numérica, integración exacta, fórmulas métricas, distribuciones de probabilidad y evaluación de todos los vértices en programación lineal.

## 4. Batería práctica

Se han validado 42 ejercicios reales y completos:

| Bloque | Casos | Cobertura |
|---|---:|---|
| ESO y fundamentos | 6 | Operaciones enteras, fracciones, ecuación con paréntesis y denominadores, Gauss 3×3, racionalización y Ruffini de grado al menos 3 |
| Matemáticas I | 7 | Ecuación trigonométrica, límites `0/0` e infinito/infinito sin L'Hôpital, continuidad, monotonía/extremos, concavidad/inflexión y sistema 3×3 |
| Matemáticas II | 16 | `AXB=C`, propiedades y determinantes 4×4, rango rectangular con parámetro, Rouché–Frobenius, Cramer, L'Hôpital, continuidad/derivabilidad, crecimiento, concavidad, cinco técnicas de integración y áreas |
| Geometría | 6 | Recta–recta, recta–plano, planos, producto vectorial, distancia y problema métrico combinado |
| Probabilidad y estadística | 7 | Bayes, binomial, normal, aproximación normal, normal inversa, programación lineal con región factible e inferencia/muestreo |

Resultado:

- verificaciones matemáticas independientes: `42/42`;
- contrato maestro: `42/42`;
- clasificación: `42/42 CORRECT_AND_PEDAGOGICAL`;
- errores visibles detectados por el auditor textual: `0`;
- cobertura obligatoria ausente: ninguna.

El artefacto reproducible tiene el hash semántico:

`54ef318f4f3952d0da8f4c2e9312d38c012fb5d295db5db1b4207b7d24585049`

## 5. Opciones de respuesta

Se ejecutaron 1.000 intentos deterministas sobre la batería práctica. Distribución obtenida:

- A: 251;
- B: 245;
- C: 270;
- D: 234.

Las cuatro posiciones reciben respuestas correctas y no existe fijación sistemática en A. Las opciones mantienen texto visible y la validación rechaza duplicados o pérdida de la opción correcta.

## 6. Validación visual con el motor real de +MathUp

El arnés local aislado reutiliza los archivos reales de producción `styles.css`, `math-notation.css` y `math-renderer.js`. No modifica esos archivos ni conecta el catálogo nuevo al runtime público.

Se inspeccionaron 13 tarjetas representativas en dos anchos:

- escritorio, aproximadamente 1280 px;
- móvil, 375 × 812 px.

Resultados del DOM final:

- 13/13 tarjetas sin desbordamiento;
- cero desbordamiento horizontal del documento en móvil;
- 0 apariciones de `undefined`;
- 0 delimitadores visibles `\(` o `\)`;
- 0 comandos crudos `\frac`, `\int` o `\sqrt`;
- 0 barras internas visibles;
- fracciones verticales presentes y correctamente compuestas;
- exponentes, matrices, determinante, integrales, trigonometría y vectores representados por el motor real;
- opciones con texto visible;
- el producto `e^x · sen(2x)` se conserva como producto;
- el cociente `e^x / sen(2x)` se compone como una fracción vertical y no se confunde con el producto.

En móvil se observaron 43 fracciones compuestas, 8 matrices y 1 determinante, sin recortes ni contenido oculto.

## 7. Incidencias encontradas y correcciones aisladas

Durante la construcción de la batería se corrigieron únicamente datos o presentación del arnés de validación:

- el resultado esperado de la ecuación fraccionaria se corrigió a `x=10` tras sustitución en la ecuación original;
- la aproximación normal se corrigió a aproximadamente `0,935` mediante tipificación con corrección de continuidad;
- se separaron de forma inequívoca las soluciones de la ecuación trigonométrica para evitar que el renderizador absorbiera una coma adyacente;
- el ejemplo de cociente se suministró al renderizador mediante su sintaxis estructurada de fracción.

No se ha modificado ningún ejercicio de Andalucía ni ningún archivo de producción como consecuencia de estas incidencias.

## 8. Pruebas

- Regresión Node completa: `247/247`, 0 fallos.
- Regresiones PowerShell ejecutadas por separado: `1542/1542`, 0 fallos.
- Total combinado de comprobaciones ejecutadas: `1789`, 0 fallos.
- Casos prácticos: `42/42` matemáticamente verificados y `42/42` contractualmente válidos.
- Casos inválidos del contrato maestro: `8/8` rechazados correctamente en la fase contractual previa.
- Auditoría visual: escritorio y móvil sin incidencias.

La ejecución literal del validador oficial de skills no fue posible porque el entorno no contiene `PyYAML`. No se instaló software. La estructura se comprobó mediante una validación equivalente y las pruebas específicas de la skill.

## 9. Artefactos de esta validación

- `catalog/solution-quality/practical-validation-cases.mjs`
- `catalog/solution-quality/practical-verifiers.mjs`
- `catalog/solution-quality/practical-validation.mjs`
- `scripts/validate-solution-skill-practical.mjs`
- `tests/solution-skill-practical-validation.test.mjs`
- `tools/solution-skill-practical-validation/index.html`
- `tools/solution-skill-practical-validation/styles.css`
- `tools/solution-skill-practical-validation/app.js`
- `artifacts/solution-skill-practical-validation/results.json`
- `artifacts/solution-skill-practical-validation/render-cases.json`

## 10. Conclusión y límites

La actualización de la skill supera la validación práctica representativa: 42 ejercicios completos, verificación matemática independiente total, cumplimiento contractual total, regresión sin fallos y muestra visual limpia con el motor real actual de +MathUp.

Esto valida el contrato, sus reglas y el comportamiento de la batería representativa. No certifica todavía matemáticamente todo el corpus heredado ni sustituye una futura comprobación visual de preproducción con los componentes definitivos que verá el alumno. Andalucía debe continuar congelada hasta una autorización posterior y hasta que el corpus real se procese bajo estas reglas ya validadas.

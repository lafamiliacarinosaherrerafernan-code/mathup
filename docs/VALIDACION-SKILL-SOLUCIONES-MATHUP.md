# Validación maestra de la skill de soluciones de +MathUp

## Segunda pasada

Tras la corrección, la auditoría contractual pasa de 5/12 a 12/12 cláusulas. Hash final de la skill: `18d4ead04a7159af4882134535a7b15632a430118b0c7f6b24ef45806aab9444`.

Resultados ejecutables:

| Comprobación | Resultado |
|---|---:|
| Pruebas enfocadas nuevas | 22/22 |
| Regresión Node completa | 241/241 |
| Fallos | 0 |
| Centinelas inválidos rechazados | 8/8 |
| Distribución de la correcta en 1.000 intentos | A 265 · B 245 · C 264 · D 226 |

La estructura de `SKILL.md` se comprobó además con una validación equivalente a `quick_validate.py`: frontmatter presente y bien delimitado, solo las claves permitidas `name` y `description`, nombre en formato válido, descripción dentro del límite y ausencia de marcadores `TODO`. El script oficial no pudo ejecutarse literalmente porque el runtime Python incluido no contiene su dependencia `PyYAML`; no se instaló ni se modificó software del sistema.

La distribución demuestra que no existe una letra correcta permanente; no pretende imponer exactamente un 25 % en una muestra finita.

## Casos comprobados

Se comprobaron de forma ejecutable:

- estructura obligatoria y pasos;
- coherencia respuesta/resultado;
- rechazo de `undefined`, `null` y TeX crudo;
- políticas de L'Hôpital;
- Gauss, Rouché-Frobenius y estudio de signo;
- integración por partes y geometría vectorial;
- alcance de integrales de CCSS II;
- distractores duplicados o numéricamente equivalentes;
- reproducibilidad del barajado por intento;
- cobertura de las cuatro posiciones;
- aislamiento de los puntos de entrada de producción.

## Cobertura y limitaciones

La matriz `artifacts/solution-skill-master-audit/coverage-matrix.json` separa lo validado de forma ejecutable de lo que todavía requiere un corpus real de soluciones generadas. No se han fabricado ejemplos para aparentar una validación matemática masiva.

Antes de certificar publicación siguen siendo obligatorios:

1. un corpus controlado real por todas las familias y cursos;
2. revisión matemática y pedagógica de sus salidas;
3. validación visual con el mismo motor, CSS y fuentes del alumno;
4. integración autorizada del gate en preproducción;
5. eliminación o sustitución segura de los fallbacks históricos insuficientes.

Por tanto, el contrato y su validador aislado quedan técnicamente validados, pero el runtime público y los bancos históricos no quedan certificados ni modificados.

## Aislamiento y regresión

Los hashes del estado preservado de `index.html`, `app.js`, `bach-exam.js`, `math-renderer.js` y el runtime andaluz se registran en `protected-files.json`. Algunos ya estaban modificados antes de esta fase; no se atribuyen a esta corrección. No se realizó commit ni push.

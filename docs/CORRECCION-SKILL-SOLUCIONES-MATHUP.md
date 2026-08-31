# Corrección maestra de la skill de soluciones de +MathUp

## Cambios aplicados

La skill se amplió con un contrato maestro de salida y precedencia. La regla de trabajo pasa a ser:

`enunciado literal → resolución matemática independiente → respuesta canónica → solución pedagógica estructurada → validación matemática/pedagógica/representacional → opciones de sesión`.

Se añadieron dos referencias internas:

- `CONTRATO-MAESTRO-SOLUCIONES.md`, con estructura, prohibiciones y criterios de aceptación;
- `policy-matrix.json`, con fronteras de método por curso.

Se creó una capa aislada `catalog/solution-quality/solution-quality.mjs` que:

- valida campos obligatorios y pasos;
- comprueba coherencia entre respuesta y resultado final;
- detecta contenido técnico visible;
- normaliza delimitadores TeX equilibrados a bloques matemáticos estructurados;
- aplica las políticas de método por curso;
- valida cuatro opciones únicas;
- detecta equivalencias numéricas obvias como `1/2` y `0.5`;
- materializa A/B/C/D de forma determinista por ejercicio e intento.

## Reglas didácticas consolidadas

- ESO y Matemáticas I: Gauss paso a paso en sistemas 3×3.
- Matemáticas I: sin L'Hôpital; estudio de signo cuando sea necesario.
- Matemáticas II: L'Hôpital solo para formas acreditadas; Rouché-Frobenius en sistemas paramétricos; integración por partes y geometría vectorial desarrolladas.
- CCSS II: sin L'Hôpital ni integración avanzada; integrales indefinidas inmediatas solo en Práctica.
- Toda solución debe explicar el procedimiento y concluir con un resultado verificable.
- La respuesta correcta no contiene una letra fija; la letra pertenece únicamente a la sesión concreta.

## Archivos de implementación

- `.agents/skills/solucion-de-ejercicios/SKILL.md` (modificado).
- `.agents/skills/solucion-de-ejercicios/references/CONTRATO-MAESTRO-SOLUCIONES.md` (nuevo).
- `.agents/skills/solucion-de-ejercicios/references/policy-matrix.json` (nuevo).
- `catalog/solution-quality/solution-quality.mjs` (nuevo, aislado).
- `scripts/audit-solution-skill-master.mjs` (nuevo).
- `tests/solution-skill-master.test.mjs` (nuevo).

## Reversibilidad

El cambio no está conectado a producción. Para revertirlo se restaura la skill al hash inicial y se eliminan exclusivamente los archivos nuevos de esta fase. El procedimiento y los hashes se conservan en `artifacts/solution-skill-master-audit/rollback-manifest.json`.

## Límites deliberados

No se corrigieron bancos, respuestas históricas, soluciones andaluzas, renderizado público ni fallbacks de `app.js`. Tampoco se generaron soluciones nuevas. La adopción por el runtime requiere una autorización y una fase propia con preproducción.

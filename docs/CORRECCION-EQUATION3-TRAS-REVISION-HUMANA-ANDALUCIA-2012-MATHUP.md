# Corrección Equation.3 tras revisión humana — Andalucía CCSS II 2012

## Alcance y salvaguardas

Esta operación corrige exclusivamente los diez objetos `Equation.3` que el revisor pseudónimo `reviewer-1` marcó como `NO_COINCIDE`. No integra ninguno de los 48 ejercicios, no modifica los DOC, MTEF, EMF o PNG oficiales, no altera producción y mantiene `ABCABC` como `DOCUMENT_LAYOUT_RECONSTRUCTION_ERROR_UNCHANGED`.

La exportación pública pseudonimizada permanece inmutable: 55 decisiones (`45 COINCIDE`, `10 NO_COINCIDE`, `0 DUDOSO`), revisor `reviewer-1`, fecha general y secuencia reproducible. La evidencia literal original permanece localmente en OneDrive y fuera de Git.

## Congelación de los 45 objetos correctos

Antes de aplicar las reglas se registraron para cada uno de los 45 objetos aprobados: `caseHash`, hash del AST, hash de MathML, hash del PNG oficial y representación renderizada. La regresión posterior compara la semántica matemática congelada con la regenerada.

Resultado: `45/45` sin regresión matemática. Ninguna decisión humana ni evidencia oficial cambió.

## Reglas generales implementadas

### Paréntesis ordinarios

Los paréntesis literales `()`, incluidos los de llamadas como `f(x)`, `g(x)`, `P(t)` y `B(t)`, se representan en MathML con `stretchy="false"`. La regla es estructural y no depende del `objectId`.

Aplicación: 10 objetos.

### Delimitadores unilaterales

Los nodos delimitados con `mtefTemplate.variation = 1` conservan solo el delimitador izquierdo; `variation = 2` conserva solo el derecho. La derivación LaTeX utiliza el delimitador invisible del lado ausente y MathML no fabrica ningún símbolo.

Aplicación: 4 objetos con llave únicamente izquierda.

### Exponente sobre grupo

Cuando un `script` MTEF sigue a un grupo delimitado y la base previamente recuperada era solo el paréntesis de cierre, se localiza el paréntesis de apertura correspondiente y se reconstruye la base como grupo matemático completo. El exponente se aplica al grupo, no al token `)`.

Aplicación: 1 objeto, `adobj-61f8d5d809881c49-009`; el exponente 6 queda asociado a `(3x²+5x−1)`.

## Diez objetos regenerados

| Objeto | Capa original del fallo | Reglas aplicadas | Estado |
|---|---|---|---|
| `adobj-61f8d5d809881c49-008` | representación derivada | paréntesis ordinarios | `HUMAN_RECHECK_REQUIRED` |
| `adobj-61f8d5d809881c49-009` | AST/decodificación | paréntesis ordinarios; exponente sobre grupo | `HUMAN_RECHECK_REQUIRED` |
| `adobj-8446c5da6b4b7cfc-003` | representación derivada | llave unilateral; paréntesis ordinarios | `HUMAN_RECHECK_REQUIRED` |
| `adobj-8446c5da6b4b7cfc-004` | representación derivada | paréntesis ordinarios | `HUMAN_RECHECK_REQUIRED` |
| `adobj-8446c5da6b4b7cfc-009` | representación derivada | llave unilateral; paréntesis ordinarios | `HUMAN_RECHECK_REQUIRED` |
| `adobj-87b729cdd4632386-001` | representación derivada | paréntesis ordinarios | `HUMAN_RECHECK_REQUIRED` |
| `adobj-bcec57ae525fa5e2-003` | representación derivada | paréntesis ordinarios | `HUMAN_RECHECK_REQUIRED` |
| `adobj-bcec57ae525fa5e2-006` | representación derivada | llave unilateral; paréntesis ordinarios | `HUMAN_RECHECK_REQUIRED` |
| `adobj-c8688a19515dfeb3-001` | representación derivada | llave unilateral; paréntesis ordinarios | `HUMAN_RECHECK_REQUIRED` |
| `adobj-c8688a19515dfeb3-005` | representación derivada | paréntesis ordinarios | `HUMAN_RECHECK_REQUIRED` |

Los diez conservan el literal, comentario y decisión humanos originales como historial. Ninguno recibe automáticamente `COINCIDE`.

## Artefactos auditables

La carpeta `artifacts/equation3-post-human-correction/` contiene:

- `frozen-coincide-45.jsonl`: referencias congeladas de regresión;
- `corrected-equations-55.jsonl`: regeneración trazable del conjunto completo;
- `correction-cases-10.jsonl`: antes/después de los diez casos;
- `regression-45.jsonl`: resultado individual de regresión;
- `recheck-10.jsonl`: cola exclusiva de segunda revisión;
- `original-human-state-proof.json`: prueba de inmutabilidad de las decisiones;
- `reproducibility.json`: doble corrida e invariancia al orden;
- `rollback.json`: procedimiento de reversión;
- `summary.json`: resumen cuantitativo.

La segunda revisión se guarda en un estado local independiente; no sobrescribe `review-state.json`.

## Pruebas

- Pruebas específicas de esta corrección: `12/12`.
- Regresión Node completa: `194/194`.
- Regresión PowerShell: `24 + 13 + 1.453 + 33 = 1.523` comprobaciones, `0` fallos.
- Total ejecutado: `1.717` comprobaciones, `0` fallos.
- Trazabilidad: `55/55`.
- Regresión matemática congelada: `45/45`.
- Regeneración de casos fallidos: `10/10`.
- Reproducibilidad: doble corrida equivalente.
- Invariancia al orden: verificada.
- Rollback: verificado; los artefactos fuente permanecen intactos.

## Estado pendiente

Los diez objetos siguen requiriendo segunda revisión humana. `ABCABC` no se ha tocado. Tampoco se declara desbloqueado ningún ejercicio ni se integra contenido en el catálogo principal.

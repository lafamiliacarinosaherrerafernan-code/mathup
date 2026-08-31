# Herramienta de comparación humana Equation.3 · Andalucía CCSS II 2012

## Alcance

Herramienta local, aislada y sin red para comparar los 55 objetos `Equation.3` recuperados de los seis exámenes oficiales de Andalucía CCSS II 2012. No modifica los DOC, los ejercicios, el catálogo principal ni producción. La evidencia de autoridad sigue siendo el DOC oficial y los flujos OLE/MTEF, EMF y PNG con sus hashes.

## Apertura

Desde la raíz del proyecto:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-equation3-human-comparison.ps1 -Pilot
```

Codex puede iniciarla con su Node.js incluido. El piloto abre `http://127.0.0.1:8846/?pilot=first-3` y limita la navegación a los tres primeros objetos, sin alterar la cola general. Para abrir los 55 casos se omite `-Pilot`.

## Contenido de cada ficha

- A la izquierda, PNG oficial extraído del DOC, vinculado también al EMF y al objeto OLE.
- A la derecha, MathML derivado del AST recuperado desde MTEF v3.
- Ejercicio, opción, apartado, modelo y contexto anterior/posterior.
- Panel técnico plegado con identificadores y hashes.
- Lista explícita de elementos que la persona debe contrastar: números, variables, signos, operadores, fracciones, potencias, subíndices, matrices, delimitadores, relaciones, símbolos griegos, orden y agrupación.

## Decisiones y garantías

Las únicas decisiones admitidas son `COINCIDE`, `NO_COINCIDE` y `DUDOSO`. Todas requieren pulsación humana explícita y un identificador local de revisor. El código rechaza cualquier intento de crear una decisión sin `humanAction` explícita y nunca genera `COINCIDE` automáticamente.

`NO_COINCIDE` y `DUDOSO` permiten comentario. Cada decisión conserva fecha/hora, revisor, comentario, `caseHash`, hash del PNG oficial, hash del AST y hash del MathML.

El estado se guarda únicamente después de una decisión en:

`artifacts/equation3-human-comparison/local-state/review-state.json`

La carpeta está ignorada por Git. Si no se ha pulsado ningún botón, no se crea el archivo. El estado conserva el último objeto y permite reanudar. También existe rollback de la última decisión en el núcleo y está probado, aunque el piloto no expone una aprobación masiva ni automática.

## Estado derivado del ejercicio

- Todos sus objetos con dictamen humano `COINCIDE`: `EQUATION3_HUMAN_VALIDATED`.
- Algún objeto `NO_COINCIDE` o `DUDOSO`: `EQUATION3_REVIEW_REQUIRED`.
- Algún objeto pendiente: `EQUATION3_HUMAN_REVIEW_PENDING`.

Este estado es solo una proyección local; no se integra en el catálogo principal.

## Cola y reproducibilidad

La cola se construye de forma determinista desde `recovered-equations.jsonl`, ordenando por documento, ejercicio, posición y objeto. Contiene exactamente 55 identificadores únicos. Cada caso conserva trazabilidad DOC → ejercicio/apartado → OLE/MTEF → AST/MathML → PNG/EMF. El piloto `first-3` referencia los tres primeros `objectId` de esa misma cola sin modificarla.

## Seguridad y limitaciones

- Solo escucha en `127.0.0.1`.
- No usa Internet, Supabase, OCR ni Mathpix.
- No contiene datos del alumnado.
- No escribe respuestas, soluciones o distractores.
- No certifica por sí sola la equivalencia: el dictamen sustantivo pertenece a la persona revisora.
- El navegador representa MathML de forma nativa; la comparación humana debe valorar igualdad de contenido y estructura, no solo parecido visual.

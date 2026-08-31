# Auditoría maestra de la skill de soluciones de +MathUp

## Alcance y aislamiento

Se auditó la skill `solucion-de-ejercicios`, sus instrucciones auxiliares y los puntos del proyecto que consumen o presentan respuestas, soluciones y opciones. La primera pasada se realizó antes de modificar la skill. No se modificaron bancos, `data/`, Supabase, renderizadores ni entradas públicas. Andalucía permanece congelada y no se tocaron Madrid ni Castilla-La Mancha.

La auditoría distingue tres capas que no deben confundirse:

1. corrección matemática;
2. calidad pedagógica;
3. representación destinada al alumno.

## Resultado de la primera pasada

La versión inicial de la skill cumplía 5 de 12 cláusulas maestras comprobables. Ya exigía literalidad del enunciado, resolución independiente y control de distractores, y establecía límites parciales para L'Hôpital. Sin embargo, no imponía de forma inequívoca:

- un contrato estructurado de salida;
- rechazo de `undefined`, `null` o comandos TeX visibles;
- prohibición de respuestas de emergencia sin desarrollo;
- barajado determinista por intento;
- independencia entre respuesta matemática y letra A/B/C/D;
- prohibición expresa de L'Hôpital en Matemáticas I.

La evidencia reproducible de esta pasada se conserva en `artifacts/solution-skill-master-audit/baseline.json`. Hash de la skill inicial: `be89f4f19b08743c722d84f3160bc34170d81b315099dcd054360d5c485725e2`.

## Incidencias detectadas en el pipeline existente

Se localizaron riesgos en producción que no se han corregido en esta fase por la prohibición expresa de modificar el runtime:

- `app.js` contiene una salida de emergencia pedagógicamente insuficiente con el patrón «El resultado correcto es ...»;
- existe una recomendación genérica de método que puede mencionar L'Hôpital sin acreditar previamente el curso y la forma indeterminada;
- el historial del proyecto contiene incidencias conocidas de TeX crudo y `undefined` visibles;
- el runtime actual no aplica todavía el nuevo contrato aislado de calidad.

Estas incidencias no invalidan el nuevo contrato, pero impiden afirmar que la aplicación pública esté certificada por esta fase.

## Riesgos matemáticos y pedagógicos cubiertos

El control aislado rechaza ahora:

- respuestas finales incompatibles con la solución;
- desarrollos vacíos o pasos incompletos;
- L'Hôpital en Matemáticas I y CCSS II;
- L'Hôpital en Matemáticas II fuera de `0/0` o `∞/∞`;
- sistemas paramétricos de Matemáticas II sin Rouché-Frobenius;
- sistemas 3×3 de ESO o Matemáticas I sin Gauss paso a paso;
- extremos de Matemáticas I sin estudio de signo cuando procede;
- integración por partes de Matemáticas II sin desarrollo completo;
- geometría vectorial sin deducción explícita;
- integrales de CCSS II fuera del alcance inmediato de Práctica;
- opciones vacías, repetidas o numéricamente equivalentes en casos evidentes.

## Conclusión de auditoría

La causa principal no era un error concreto de un banco, sino un contrato incompleto entre generación, validación pedagógica, representación matemática y materialización de opciones. La corrección adecuada es general y versionada, no un parche por identificador. La producción continúa intacta y deberá adoptar este contrato en una fase posterior autorizada.

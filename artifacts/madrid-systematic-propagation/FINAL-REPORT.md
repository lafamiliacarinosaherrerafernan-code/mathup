# Madrid · propagación sistemática de la revisión manual

## Alcance y autoridad

- Matemáticas II Madrid: 825 ejercicios habilitados y 1.925 apartados canónicos.
- CCSS II Madrid: 903 ejercicios habilitados y 1.853 apartados canónicos.
- Fuentes: 81/81 documentos aportados por la usuaria. Las antiguas fuentes de Internet no se usaron como autoridad.
- Inventario previo completo: `manual-failures.md` (28 incidencias en 12 casos).

## Causas raíz

1. Estructuras matemáticas autoradas que llegaban como texto o HTML parcial al renderizador.
2. Materialización didáctica anterior a las reglas pedagógicas ya vigentes.
3. Gráficas de área no materializadas en todas las rutas.
4. Clasificación heredada por la aparición incidental de una matriz.
5. Orden de composición incorrecto para una raíz situada en la cota de evaluación de una primitiva.

Las skills ya contenían las reglas exigidas. En esta propagación no se modificaron: se corrigieron datos, materialización, clasificación, renderer y tests.

## Before / after por patrón

| Patrón | Detectados manualmente | Afectados/candidatos en el banco completo | Corregidos o verificados | Restantes visibles |
|---|---:|---:|---:|---:|
| Sistemas explícitos sin llave | 2 ejercicios | 147 enunciados estructurados | 147 | 0 |
| Matrices/pares de matrices aplanados | 2 ejercicios | 38 candidatos iniciales | 38 | 0 |
| Fracciones canónicas lineales | 5 ejercicios | 1.328 candidatos (643 Mates, 685 CCSS) | 1.328 pasados por renderer y DOM | 0 |
| Integrales/cotas históricas | 2 ejercicios | 169 candidatos (111 Mates, 58 CCSS) | 169 pasados por renderer y DOM | 0 |
| Límites linealizados | 2 ejercicios | 10 candidatos (9 Mates, 1 CCSS) | 10 pasados por renderer y DOM | 0 |
| HTML/tokens internos visibles | 1 ejercicio | 17 residuos de datos + 1 causa del renderer | 18 | 0 |
| Determinantes sin elemento × menor complementario | 2 ejercicios | 13 desarrollos | 13 | 0 |
| Soluciones abreviadas de familias metodológicas | 10 casos | 168 apartados de 167 ejercicios | 168 | 0 bloqueantes |
| Normal sin `μ=np`, `σ=√(npq)` o con Φ | 1 ejercicio | 344 apartados; 94 usos de Φ | 344; Φ eliminado | 0 |
| Áreas sin evidencia gráfica adecuada | 2 ejercicios | 106 candidatos | 104 materializados en esta fase + 2 ya conformes | 0 |
| Clasificación de sistemas absorbidos por Matrices | 1 ejercicio | 110 ejercicios inequívocos | 110 | 0 |

Los contadores de fracciones, integrales y límites representan expresiones canónicas que requieren composición, no errores residuales: el gate se evalúa sobre el DOM final y da cero sintaxis interna visible.

## Correcciones de metodología

- Determinantes: ceros cuando procede, desarrollo por la fila/columna más favorable y elemento por menor complementario antes del resultado.
- Sistemas: matrices de coeficientes y ampliada, rangos, Rouché–Frobenius, Sarrus, SCI y Cramer según el caso.
- Análisis: definición de derivada, límites/asíntotas y cadena completa de L’Hôpital.
- Integrales: sustitución completa, fracciones simples, Barrow y cotas correctamente compuestas.
- Áreas: curvas, puntos de corte, región sombreada y techo/suelo; dos gráficas exactas y evidencia oficial para el resto.
- Geometría: vectores y fórmula de distancia desarrollada.
- Normal: media, desviación típica, corrección de continuidad y tipificación dentro de la probabilidad, sin Φ.

## Validación final

- Auditoría documental/estática Madrid: 81/81 fuentes; 0 desajustes; 0 errores de opciones; 0 soluciones ausentes; 0 errores estáticos de render.
- Navegador real: 1.493/1.493 ejercicios y 3.543/3.543 apartados visibles y comprobados.
- Multipartados Mates: 1.806/1.806 navegados; 706/706 ejercicios PASS.
- Multipartados CCSS: 1.737/1.737 navegados; 787/787 ejercicios PASS.
- Categorías E2E: todas a 0.
- Doce casos manuales: 48/48 comprobaciones PASS en 1280, 768, 375 y 320 px.
- Regresiones automatizadas Madrid + Andalucía: 36/36 PASS en la ejecución final focalizada; la ejecución conjunta previa pasó 35/35.
- Nueva regresión permanente: cotas con raíces en evaluaciones de primitivas sin HTML interno visible.

## Skills

- `solucion-de-ejercicios/SKILL.md`: sin cambios en esta propagación; SHA-256 preservado `06365855af382c4daa6a952e79042edcc2955684dd9ee0a2e933b29bf988b7e7`.
- `skill-editor-enunciados/SKILL.md`: sin cambios en esta propagación; SHA-256 preservado `160728a851e207d5536f9ffb98c6d7d7b960060cc7df7294d5d8aa5a4e37dc49`.

## Restricciones y estado

- Sin trabajo sobre Castilla-La Mancha.
- Sin cambios en Supabase ni almacenamiento remoto.
- Sin commit, push ni tag.
- Branch: `agent/indice-pruebas-y-autenticacion`.
- HEAD: `004b9a53aeeabb77b15be97549fe296a44f5c0ed`.

**MADRID PREPARADA PARA VALIDACIÓN MANUAL FINAL**

# Implementación PAU Andalucía en 2.º de Bachillerato de +MathUp

## Estado y alcance

Andalucía se ha conectado como tercera comunidad PAU en las rutas de 2.º de Bachillerato para Matemáticas II y Matemáticas Aplicadas a las Ciencias Sociales II. La integración mantiene el catálogo canónico oficial de 1.666 ejercicios como evidencia paralela y habilita actualmente 28 ejercicios con respuesta comprobada, solución desarrollada y distractores validados. Los otros 1.638 **no se consideran excluidos ni bloqueados por carecer de contenido histórico**: permanecen en `RESOLUTION_PENDING`, pendientes de resolución, comprobación matemática independiente, distractores plausibles, solución pedagógica y validación visual.

Los enunciados habilitados proceden del corpus oficial reconciliado. Las recopilaciones históricas se conservan como trazabilidad, pero no actúan como autoridad documental. No se ha modificado Supabase ni se ha realizado commit o push.

## Arquitectura histórica de los exámenes

La aplicación mantiene estructuras diferentes para cada materia.

### Matemáticas II: cinco ejercicios

1. Álgebra.
2. Límites, continuidad y derivadas.
3. Integrales.
4. Geometría.
5. Probabilidad y estadística.

El banco seguro contiene 13 ejercicios completos y 24 entregas por subapartados. La distribución de ejercicios completos entre los cinco huecos es `3 / 1 / 4 / 2 / 3`.

### CCSS II: cuatro ejercicios

1. Matrices.
2. Sistemas y programación lineal.
3. Análisis.
4. Probabilidad o estadística.

El banco seguro contiene 15 ejercicios completos y 34 entregas por subapartados. La distribución entre los cuatro huecos es `1 / 3 / 3 / 8`. No existe un quinto ejercicio en CCSS II.

El cambio de comunidad modifica el banco de ejercicios, no la estructura histórica de cada materia. Esta misma arquitectura queda preparada para aplicarse posteriormente a Madrid.

## Modalidades y cantidades

Andalucía alimenta las rutas reales de:

1. Estudiar temas y hacer retos.
2. Estudiar por bloques y hacer retos.
3. Hacer examen.

Los retos de Matemáticas II entregan cinco preguntas por intento. Los de CCSS II entregan cuatro. Los exámenes respetan los cinco o cuatro huecos propios de la materia. La selección persiste el historial y no repite una identidad antes de agotar el conjunto disponible para su ámbito; al reiniciar el ciclo evita, cuando hay alternativa, comenzar por la última identidad utilizada.

## Respuestas, soluciones y opciones

- Cada entrega contiene exactamente cuatro opciones matemáticamente distintas: una correcta y tres distractores.
- La respuesta matemática permanece separada de la letra A/B/C/D.
- La posición de la correcta se baraja de forma determinista y reproducible por intento.
- La opción seleccionada mantiene contraste y legibilidad.
- Las soluciones muestran pasos existentes y resultado final, sin inventar desarrollos.
- Las puntuaciones PAU —por ejemplo, `(1 punto)`, `(1,5 puntos)` o `(2,5 puntos)`— permanecen como evidencia editorial y no se muestran al alumno.
- No se muestran JSON, LaTeX crudo, identificadores internos ni metadatos de auditoría.

## Trazabilidad y aislamiento

Cada ejercicio conserva comunidad, materia, año, convocatoria o modelo cuando constan, documento oficial, hash, bloque, tema y procedencias históricas. Matemáticas II y CCSS II permanecen aisladas, al igual que Andalucía respecto de Castilla-La Mancha y Madrid.

Los 1.638 ejercicios en `RESOLUTION_PENDING` deben resolverse desde su enunciado oficial mediante el contrato validado de `solucion-de-ejercicios`. La respuesta se obtiene de la resolución, se comprueba independientemente y solo después se generan y validan los distractores y la solución. No se completan con material de otra comunidad ni con bancos privados.

## Archivos de integración

- `index.html`: carga de la capa paralela andaluza.
- `app.js`: selector de comunidad, rutas y cantidades propias de cada materia.
- `bach-exam.js`: selección por tema, bloque y hueco histórico de examen.
- `data/andalucia-pau-runtime.js`: corpus seguro y materialización determinista.
- `tests/pau-andalucia-runtime.test.mjs`: aislamiento, estructura histórica, opciones, barajado y limpieza del contenido.
- `scripts/rollback-pau-andalucia-runtime.ps1`: ensayo de reversibilidad.

## Verificación específica

La prueba del runtime confirma:

- catálogo canónico: 1.666;
- ejercicios seguros habilitados: 28;
- ejercicios en cola de resolución: 1.638;
- ejercicios bloqueados por defecto documental impeditivo detectado por esta corrida: 0;
- Matemáticas II: 13 ejercicios completos y 24 entregas por subapartados;
- CCSS II: 15 ejercicios completos y 34 entregas por subapartados;
- estructura de examen `5 / 4` según materia;
- cuatro opciones únicas por entrega;
- barajado reproducible con distribución de la correcta entre A/B/C/D;
- ausencia de puntuaciones PAU, JSON crudo e identificadores internos.

## Limitaciones pendientes

- Los 1.638 ejercicios restantes constituyen trabajo de resolución pendiente; la ausencia previa de respuesta, solución o distractores no es un bloqueo.
- Esta corrida no ha generado automáticamente esos contenidos: el repositorio no contiene un motor ejecutable capaz de aplicar por sí solo el contrato lingüístico de la skill y realizar una segunda verificación matemática independiente sobre 1.638 enunciados heterogéneos. No se presentan como resueltos hasta que ese proceso se ejecute de forma real y auditable.
- La integración sigue sin commit, sin push y sin cambios en Supabase.
- Antes de una publicación definitiva debe completarse una prueba manual autenticada en la vista real del alumno.

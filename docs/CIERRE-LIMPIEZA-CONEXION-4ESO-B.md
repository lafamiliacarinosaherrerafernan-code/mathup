# Limpieza técnica y conexión controlada — 4.º ESO Matemáticas B

Fecha de auditoría: 13 de agosto de 2026.

## Resultado ejecutivo

Se ha creado una capa de selección propia de **4.º ESO Matemáticas B**. La ruta principal ya no hereda bancos ordinarios de Matemáticas A y tampoco cae en bancos genéricos cuando un tema todavía tiene originales pendientes.

El cierre total **no puede declararse todavía**. El catálogo canónico contiene 462 candidatos originales de Matemáticas B, pero muchos proceden de documentos antiguos con fórmulas, tablas o figuras almacenadas como objetos Equation. Solo se han conectado las transcripciones que podían vincularse a un candidato literal y comprobarse sin reconstruir datos por intuición.

## Catálogo fijo

Se conservan exclusivamente los 14 temas definidos:

1. Números reales.
2. Radicales y logaritmos.
3. Expresiones algebraicas.
4. Ecuaciones y sistemas de ecuaciones.
5. Inecuaciones y sistemas de inecuaciones.
6. Proporcionalidad.
7. Semejanza.
8. Trigonometría.
9. Geometría analítica.
10. Funciones.
11. Límite de funciones.
12. Derivadas.
13. Límite de sucesiones.
14. Combinatoria.

No se han añadido Estadística ni Probabilidad.

## Cobertura conectada y cobertura original

La columna “activos propios” cuenta el conjunto propio que recibe actualmente la capa B: originales literales conectados, exámenes verificados y, en Combinatoria, el banco especializado. No cuenta las variantes generadas en tiempo de ejecución.

| Tema | Candidatos originales catalogados | Activos propios | Estructuras activas | Aprendiz literal | Maestro literal/examen | Aptos para examen verificado | Estado |
|---|---:|---:|---:|---:|---:|---:|---|
| Números reales | 31 | 15 | 15 | 0 | 15 | 15 | Funcional; falta conexión masiva de originales |
| Radicales y logaritmos | 30 | 17 | 17 | 0 | 17 | 17 | Funcional; falta conexión masiva de originales |
| Expresiones algebraicas | 46 | 24 | 24 | 0 | 24 | 24 | Funcional; falta conexión masiva de originales |
| Ecuaciones y sistemas | 43 | 31 | 31 | 0 | 31 | 31 | Funcional; falta conexión masiva de originales |
| Inecuaciones y sistemas | 11 | 9 | 9 | 0 | 9 | 9 | Funcional; cobertura estructural aún limitada |
| Proporcionalidad | 77 | 3 | 3 | 2 | 1 | 1 | Insuficiente; muchos textos extraídos están mezclados con soluciones/columnas |
| Semejanza | 14 | 3 | 3 | 1 | 2 | 0 | Insuficiente; faltan figuras y datos gráficos originales |
| Trigonometría | 33 | 20 | 20 | 0 | 20 | 20 | Funcional en Maestro; falta progresión Aprendiz literal |
| Geometría analítica | 17 | 11 | 11 | 0 | 11 | 11 | Funcional en Maestro; falta progresión Aprendiz literal |
| Funciones | 27 | 9 | 9 | 0 | 9 | 9 | Funcional en Maestro; faltan gráficas/tablas originales |
| Límite de funciones | 21 | 5 | 5 | 1 | 4 | 0 | Insuficiente; originales Equation pendientes; sin `sen(x)/x` ni L’Hôpital |
| Derivadas | 18 | 1 | 1 | 0 | 1 | 0 | Insuficiente; la mayoría de fórmulas originales no se recuperan del texto plano |
| Límite de sucesiones | 8 | 1 | 1 | 0 | 0 | 0 | Insuficiente; el único original formal queda fuera del flujo ordinario |
| Combinatoria | 86 | 41 | 41 | selección dinámica | selección dinámica | no automático | Banco especializado conectado |

Totales relevantes:

- 462 candidatos originales catalogados.
- 12 transcripciones literales nuevas o controladas con candidato de origen inequívoco en la nueva capa.
- 19 estructuras preparadas pero **no conectadas**, por faltar una referencia literal verificable o requerir revisión visual.
- 27 ejercicios de exámenes cuyo documento conserva el grupo original C y que se etiquetan como Matemáticas B, nivel Maestro.
- 41 ejercicios del banco especializado de Combinatoria disponibles mediante su selector propio.

## Cambios técnicos realizados

- Nueva capa `MargaritaFourEsoBOwnBanks`.
- Registro de originales verificados en `MargaritaEsoOriginalPractice` sin activar automáticamente `examEligible`.
- Normalización de metadatos de los exámenes “4.º ESO C”: curso 4.º ESO, materia Matemáticas B y `originalGroup: "C"`.
- Ruta `fourEsoBModelBank` independiente de Matemáticas A.
- Bloqueo de la caída a bancos genéricos para 4.º ESO B.
- Filtro transversal para impedir en 4.º ESO B y Matemáticas I:
  - `lim(x→0) sen(x)/x` y variantes generadas;
  - soluciones que utilicen L’Hôpital en esos límites introductorios.
- Eliminación de las entradas directas de `sen(x)/x` de los bancos activos legados de 4.º ESO B y Matemáticas I.
- La definición formal con entornos/épsilon de límites de sucesiones se mantiene como ampliación y queda excluida de la práctica ordinaria, retos, aventuras y examen.

## Reglas por modalidad

- **Práctica por temas:** acepta originales literales verificados, exámenes que sean adecuados para practicar y generación propia del tema.
- **Retos:** respeta nivel Aprendiz/Maestro y el historial general de no repetición.
- **Aventuras:** solo utiliza ejercicios con `adventureEligible !== false` y el generador específico del tema.
- **Examen:** usa exclusivamente ejercicios verificados como aptos para examen y generación del examen; los originales conectados no entran automáticamente.
- En ESO no existe Examen por bloques y no se ha añadido esa modalidad.

## Pruebas realizadas

El auditor `scripts/audit_eso4b_controlled_connection.mjs` comprueba:

- carga de la nueva capa;
- catálogo de 14 temas;
- independencia de la ruta B respecto de bancos A;
- ausencia de límites prohibidos en la capa B;
- cuatro opciones distintas;
- índice de respuesta correcto válido;
- existencia de solución;
- originales sin habilitación automática para examen;
- ampliación formal de sucesiones fuera del flujo ordinario;
- conservación de metadatos del grupo C;
- filtro transversal para 4.º ESO B y Matemáticas I.

Resultado: **0 fallos**.

También se comprobó la sintaxis JavaScript de los archivos modificados mediante el runtime Node integrado: **sin errores**.

No fue posible completar en esta sesión la prueba visual automatizada con Playwright porque el runtime del navegador no pudo acceder a su instalación local (`EPERM`). Esto no se ha ocultado ni contado como prueba superada.

## Pendientes exactos

1. Recuperar visualmente los objetos Equation de los documentos de Límites, Derivadas y Límite de sucesiones.
2. Recortar y guardar dentro del proyecto las figuras imprescindibles de Semejanza, Funciones y Geometría, cuando el enunciado no pueda existir sin ellas.
3. Separar las columnas de enunciados y soluciones mezcladas en el PDF compartido de Proporcionalidad.
4. Calcular y comprobar de forma independiente cada ejercicio recuperado.
5. Completar la progresión literal Aprendiz/Maestro, especialmente en los temas 6, 7, 11, 12 y 13.
6. Ejecutar pruebas visuales reales de secuencias largas de Práctica, Retos, Aventuras y Examen.
7. No formalizar todavía la política definitiva en `SKILL.md`.

## Integridad del alcance

- No se ha modificado 4.º ESO Matemáticas A.
- No se han modificado otros catálogos de temas.
- No se ha añadido Examen por bloques a ESO.
- No se ha avanzado el reconocimiento manuscrito.
- No se ha modificado `SKILL.md`.
- No se han generado imágenes ni archivos fuera de la carpeta del proyecto de OneDrive.

## Dictamen

**4.º ESO Matemáticas B todavía NO puede cerrarse.**

La separación técnica entre A y B y las protecciones curriculares sí están implementadas, pero la cobertura literal de varios temas continúa por debajo del criterio de cierre y quedan originales que solo pueden incorporarse tras revisión visual fiel.

# Auditoría sistemática final de Andalucía

Fecha: 2026-08-31

## Alcance documental

- Documentos oficiales: 217 (110 Matemáticas II + 107 CCSS II).
- Recurso estadístico auxiliar excluido del censo de exámenes: 1.
- Ejercicios habilitados: 1.641 (817 Matemáticas II + 824 CCSS II).
- Apartados literales de documento: 1.379 Matemáticas II + 1.903 CCSS II.
- Apartados canónicos interactivos: 1.439 Matemáticas II + 1.990 CCSS II.
- La diferencia corresponde a 87 descomposiciones interactivas y 13
  subdivisiones interactivas documentadas; no falta contenido oficial.

## Gate E2E real

Ejecutado íntegramente con navegador real a 1280, 768, 375 y 320 px.
En cada ancho se recorrieron los 1.641 ejercicios y los 3.429 apartados
canónicos: selección, corrección, solución propia, identidad de apartado y
avance al siguiente ejercicio.

| Materia | Ejercicios | Canónicos | Runtime | Navegados por ancho | Pass técnico |
|---|---:|---:|---:|---:|---:|
| Matemáticas II | 817 | 1.439 | 1.439 | 1.439 | 817 |
| CCSS II | 824 | 1.990 | 1.990 | 1.990 | 823 + 1 `UNRESOLVED_SOURCE` |

En los cuatro anchos:

- apartados perdidos: 0;
- opciones distintas de cuatro: 0;
- opciones duplicadas: 0;
- respuestas correctas inválidas/no únicas: 0;
- soluciones ausentes: 0;
- soluciones ligadas a otro apartado: 0;
- errores de navegación: 0;
- tokens matemáticos internos visibles: 0;
- errores de estructura o geometría matemática: 0;
- desbordamientos horizontales generales: 0.

Multipartados: 541 ejercicios/1.163 apartados en Matemáticas II y 746
ejercicios/1.912 apartados en CCSS II.

## Único bloqueo documental

`pau-can-ex-88fd4c724da14002349a8f59e3c53fcb`

- materia: CCSS II;
- tema: Límites y continuidad;
- bloque: Análisis;
- atribución: año 2010, ejercicio B.2, convocatoria no resuelta;
- estado: habilitado localmente como `UNRESOLVED_SOURCE`;
- modalidades: reto por tema, reto por bloque y examen;
- no se ha sustituido la fuente mediante Internet ni se considera validado
  documentalmente.

## Correcciones raíz de esta fase

- renderizador único para enunciados, opciones y soluciones;
- integrales/Barrow mediante MathML nativo y cotas radicales protegidas;
- raíces OCR de dos integrales de 2022 reconstruidas desde los PDF aportados;
- duplicación `b), a), b)` de Reserva 2008 reducida a `a), b)` y protegida por
  regresión de `subpartId` único;
- cadena normal completa y lectura explícita de tabla;
- recurso binomial no heredado a un apartado que no requiere tabla oficial;
- gráficas exactas añadidas a todos los apartados que las piden, salvo el caso
  documental no resuelto;
- corrección del detector DOM para estructuras matemáticas puras.

## Pruebas y evidencias

- 42/42 pruebas permanentes superadas.
- Auditoría maestra: 0 fallos de paridad habilitada y 0 fallos de calidad.
- Auditoría de metodología/notación: 0 errores estructurales, visuales,
  pedagógicos, gráficos o estadísticos en ambas materias.
- Informes completos: `report-1280-final.json`, `report-768-final.json`,
  `report-375-final.json` y `report-320-final.json`.
- Skill anterior conservada en `skill-backup/`; hashes anterior/nuevo en
  `skill-hashes.json`; resumen del diff en `skill-diff-summary.md`.

No se ha hecho commit, push, acceso a Supabase, limpieza de almacenamiento ni
auditoría documental de Madrid o Castilla-La Mancha. Andalucía queda preparada
para revisión manual, no declarada definitivamente validada.

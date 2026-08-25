# Auditoría de contraste oficial del material PAU de Madrid de +MathUp

Fecha de corte: 25 de agosto de 2026  
Ámbito: Matemáticas II y Matemáticas Aplicadas a las Ciencias Sociales II  
Naturaleza: auditoría de solo lectura; no certifica ni modifica el catálogo

## 1. Conclusión ejecutiva

Las recopilaciones de Madrid incorporadas previamente a +MathUp son material histórico útil, pero no constituyen autoridad documental. Esta auditoría mantiene esa separación de forma estricta.

Se han localizado **1.734 entradas históricas** en el banco de Madrid: 831 de Matemáticas II y 903 de CCSS II. Seis entradas atribuidas al conjunto de Matemáticas II son, según sus propios metadatos, de Valencia y quedan fuera del censo madrileño. Tras excluirlas y descontar cuatro repeticiones exactas adicionales, la estimación conservadora es de **1.724 ejercicios únicos de Madrid**.

La reconciliación documental anterior contiene **1.687 representaciones atribuidas a Madrid** —795 de Matemáticas II y 892 de CCSS II— y las 1.687 permanecen en `NOT_FOUND`. Esto no demuestra que falten los ejercicios oficiales: demuestra que las recopilaciones históricas no estaban enlazadas con una fuente oficial verificable.

Se han localizado rutas institucionales de la Comunidad de Madrid, UCM y UPM que cubren una parte importante de 2005–2025 y documentos concretos anteriores. Sin embargo, no se ha incorporado ningún PDF nuevo al proyecto y, salvo el contraste puntual documentado en el apartado 8, todavía no existe una relación ejercicio–PDF–página–pregunta suficientemente completa para certificar las 1.724 unidades estimadas.

Por ello, el resultado correcto de esta auditoría no es promover coincidencias de forma masiva, sino fijar una línea de trabajo verificable:

`sourceRecordId histórico → PDF institucional con SHA-256 → página → opción/pregunta → subapartados → literal oficial → respuesta/solución histórica`

## 2. Regla de autoridad documental

Se aplica esta precedencia:

1. PDF del examen publicado por la Comunidad de Madrid o una universidad pública madrileña.
2. Página institucional que identifica inequívocamente materia, año y convocatoria y enlaza el PDF.
3. Recopilación histórica de +MathUp, solo como pista de búsqueda y evidencia de lo ya incorporado.
4. Banco derivado, imagen recortada, respuesta o solución histórica, nunca como prueba del literal oficial.

Una página institucional que enumera un examen acredita la existencia de ese documento, pero no basta para certificar automáticamente cada ejercicio de una recopilación. La certificación exige documento, página, opción/pregunta y literal compatible.

No se han utilizado academias, blogs ni repositorios privados como fuente de certificación.

## 3. Inventario local de las recopilaciones

### 3.1 Bancos derivados

| Fuente | Matemáticas II | CCSS II | Total | Función actual |
|---|---:|---:|---:|---|
| `data/madrid-pau-bank.js` | 831 | 903 | 1.734 | Índice histórico, clasificación y activos gráficos |
| `data/madrid-pau-authored.js` | 825 | 903 | 1.728 | Transcripción, apartados, opciones, respuesta y solución histórica |

La diferencia de seis registros de Matemáticas II corresponde a exclusiones explícitas de Valencia:

- `madrid-mates-1.20.7`
- `madrid-mates-1.20.8`
- `madrid-mates-2.20.7`
- `madrid-mates-2.20.8`
- `madrid-mates-3.20.7`
- `madrid-mates-3.20.8`

No deben utilizarse para medir cobertura de Madrid.

### 3.2 Activos gráficos históricos

| Conjunto | Enunciados | Soluciones |
|---|---:|---:|
| Matemáticas II | 1.045 | 831 |
| CCSS II | 1.136 | 900 |

Son recortes o representaciones derivadas. Se conservan como evidencia histórica, no como PDF oficial.

### 3.3 Documentos entregados por el profesor

Se han localizado **81 PDF** bajo `documentos/PAU Comunidades/MADRID`:

- 7 recopilaciones generales en la raíz;
- 28 documentos en `EXAMENES CCSS II`;
- 46 documentos en `EXAMENES MATES II`.

Incluyen recopilaciones por años, recopilaciones por bloques, ejercicios, soluciones y documentos con apariencia de convocatoria individual. De acuerdo con la aclaración del profesor, todos se tratan como material histórico y no como fuente oficial, aunque su nombre o maquetación se parezcan a un examen.

Los años representados en los bancos van de 2000 a 2026. Las convocatorias históricas incluyen `Modelo`, `Ordinaria`, `Extraordinaria`, `Coincidente`, `General`, `Reserva`, valores vacíos y las seis entradas de Valencia ya excluidas. Esta heterogeneidad impide convertir el campo `session` en procedencia oficial sin contraste documental.

## 4. Duplicados entre recopilaciones y bancos

Después de normalizar el texto histórico se han localizado cuatro grupos exactos con un registro excedente en cada grupo:

| Materia | Registros históricos que comparten literal |
|---|---|
| Matemáticas II | `madrid-mates-1.19.1` / `madrid-mates-1.19.3` |
| Matemáticas II | `madrid-mates-3.17.6` / `madrid-mates-3.18.1` |
| CCSS II | `madrid-ccss-4.8.1` / `madrid-ccss-4.11.1` |
| CCSS II | `madrid-ccss-4.8.4` / `madrid-ccss-4.11.2` |

Resultado cuantitativo:

- entradas históricas: 1.734;
- entradas válidas para Madrid tras excluir Valencia: 1.728;
- duplicados exactos excedentes: 4;
- ejercicios únicos estimados: **1.724**.

La identidad final no debe basarse únicamente en el literal. Dos exámenes pueden reutilizar un enunciado, y una misma unidad oficial puede aparecer en una recopilación anual, otra por bloques y varios bancos. La futura identidad documental debe conservar todos los `sourceRecordId` como alias del mismo ejercicio oficial solo cuando el PDF lo demuestre.

## 5. Fuentes institucionales localizadas

### 5.1 Comunidad de Madrid

La página [Exámenes PAU y estadísticas](https://www.comunidad.madrid/educacion/examenes-pau-estadisticas) ofrece el archivo institucional de 2020–2025 y acceso a convocatorias anteriores. Las páginas específicas contienen enlaces separados por materia y convocatoria:

- [Exámenes EvAU 2024](https://www.comunidad.madrid/educacion/examenes-evau-2024): ordinaria y extraordinaria de Matemáticas II y CCSS II.
- [Exámenes EvAU 2022 y 2023](https://www.comunidad.madrid/educacion/examenes-evau-2022-2023): ordinaria y extraordinaria de ambas materias.
- [Acceso a la universidad desde Bachillerato](https://www.comunidad.madrid/educacion/acceso-universidad-bachillerato): ruta institucional vigente al archivo PAU.

También se localizaron los PDF directos de 2022 y 2023 para ambas materias y convocatorias. No se descargaron al repositorio.

### 5.2 Universidad Complutense de Madrid

Se localizaron páginas institucionales de convocatorias ordinarias, extraordinarias, coincidentes e incidencias. Como evidencia concreta se analizó el PDF oficial [CCSS II, examen para coincidencias, junio de 2013](https://www.ucm.es/data/cont/docs/3-2013-07-02-COIN_MATAPLICADAS_J2013.pdf), que identifica universidad pública, curso, materia, instrucciones, opciones, ejercicios y criterios de corrección.

La página [Convocatoria extraordinaria 2023](https://www.ucm.es/ejercicios-de-la-evau-convocatoria) enlaza por separado Matemáticas II, CCSS II y las versiones de coincidencias/incidencias.

### 5.3 Universidad Politécnica de Madrid

El archivo institucional de la UPM conserva exámenes y modelos anteriores. Se localizaron, entre otros:

- [Matemáticas II, junio 2006-2007](https://www.upm.es/sfs/Rectorado/Vicerrectorado%20de%20Alumnos/Acceso/Paeus/Examenes%20anteriores/MatematicasIIJun06-07.pdf)
- [Matemáticas II, septiembre 2006-2007](https://www.upm.es/sfs/Rectorado/Vicerrectorado%20de%20Alumnos/Acceso/Paeus/Examenes%20anteriores/MatematicasIISep06-07.pdf)
- [Modelo de Matemáticas II 2008-2009](https://www.upm.es/sfs/Rectorado/Vicerrectorado%20de%20Alumnos/Acceso/Paeus/Modelos/MatematicasIIMod08-09.pdf)
- [Matemáticas II, julio 2018](https://www.upm.es/sfs/Rectorado/Vicerrectorado%20de%20Alumnos/Acceso/BachilleratoLOMCE/Examenes/18JL%20Matem%C3%A1ticas%20II.pdf)

La ruta institucional consultada enumera convocatorias de junio y septiembre de 2005 a 2009 para ambas materias. Estos documentos son candidatos prioritarios para completar el tramo antiguo.

## 6. Cobertura institucional localizada por periodos

| Periodo | Matemáticas II | CCSS II | Estado de la búsqueda |
|---|---|---|---|
| 2000–2004 | Parcial/no localizada de forma sistemática | Parcial/no localizada de forma sistemática | No hay archivo institucional completo localizado en esta auditoría |
| 2005–2009 | UPM, ordinaria/extraordinaria y modelos | UPM, ordinaria/extraordinaria y modelos | Ruta institucional localizada |
| 2010–2017 | Documentos concretos UCM/UPM, incluidas coincidencias | Documentos concretos UCM/UPM, incluidas coincidencias | Cobertura fragmentaria; requiere búsqueda convocatoria a convocatoria |
| 2018–2021 | UCM/UPM y archivo de la Comunidad | UCM/UPM y archivo de la Comunidad | Ruta institucional localizada, incluidas algunas incidencias |
| 2022–2024 | Comunidad de Madrid, ambas convocatorias | Comunidad de Madrid, ambas convocatorias | Cobertura oficial clara |
| 2025 | Comunidad de Madrid, ordinaria y extraordinaria | Comunidad de Madrid, ordinaria y extraordinaria | Cobertura oficial clara |
| 2026 | Información y convocatoria ordinaria disponible; extraordinaria no celebrada al corte | Igual | No debe certificarse una convocatoria futura/no celebrada |

“Ruta localizada” no equivale a ejercicio enlazado. Falta todavía descargar de forma controlada, calcular SHA-256, censar páginas y construir identidades documentales.

## 7. Resultado del contraste ejercicio por ejercicio

### 7.1 Estado cuantitativo verificable hoy

| Métrica | Resultado |
|---|---:|
| Entradas históricas de Madrid localizadas | 1.734 |
| Entradas excluidas por ser Valencia | 6 |
| Ejercicios únicos estimados de Madrid | 1.724 |
| Representaciones Madrid en la reconciliación existente | 1.687 |
| Matemáticas II en esa reconciliación | 795 |
| CCSS II en esa reconciliación | 892 |
| `DOCUMENT_MATCH_EXACT`/`OFFICIAL_EXACT_MATCH` ya certificado para Madrid | 0 |
| `DOCUMENT_MATCH_STRUCTURAL` ya certificado para Madrid | 0 |
| `NOT_FOUND` actuales atribuidos a Madrid | 1.687 |
| Contrastes literales nuevos efectuados en esta auditoría | 1 caso de control |

No se han promovido resultados por el mero hecho de localizar una web oficial. Las 1.687 representaciones continúan formalmente en `NOT_FOUND` hasta que la reconciliación pueda consumir documentos institucionales con hash y página.

### 7.2 Caso de control: CCSS II, 2013

Registro histórico: `madrid-ccss-1.14.5`.

| Campo | Recopilación histórica | PDF oficial analizado |
|---|---|---|
| Fuente indicada | “Junio–Opción B–2013” | Coincidencias, junio 2013, opción A, ejercicio 1 |
| Enunciado | Sistema con parámetro `a` y ecuaciones `x+2y+3z=-2`, `x+ay=-2a-1`, `4x+y+5z=-1` | Mismas tres ecuaciones, página 1 |
| Apartado a) | Resolver para `a=1` | “Resuélvase en el caso a=1” |
| Apartado b) | Discutir según `a` | “Discútase en función del parámetro a∈R” |
| Instrucciones | No constan en la unidad histórica | El alumno debe elegir opción A o B; no forman parte del ejercicio |
| Representación | Sistema linealizado entre separadores; versión HTML con llave simulada | Sistema tipográfico con llave y filas |

Clasificación del caso:

- `OFFICIAL_STRUCTURAL_MATCH`: sí, para contenido y subapartados;
- `TRANSCRIPTION_DIFFERENCE`: sí, por redacción normalizada y adición de “dependiente del parámetro real a”;
- `MATH_NOTATION_DIFFERENCE`: sí, por pérdida de la composición vertical del sistema;
- `SEGMENTATION_DIFFERENCE`: no se observa dentro del ejercicio; las instrucciones generales están correctamente fuera en el PDF;
- `AMBIGUOUS_MATCH`: sí respecto a la procedencia, porque la etiqueta histórica apunta a junio opción B mientras el documento oficial localizado es coincidencias opción A;
- `OFFICIAL_EXACT_MATCH`: no;
- `OFFICIAL_SOURCE_NOT_FOUND`: no para este literal, aunque falta descartar que el ejercicio se reutilizase también en la convocatoria indicada por la recopilación.

Este caso demuestra que el texto puede ser matemáticamente reconocible y, al mismo tiempo, tener metadatos documentales no fiables.

## 8. Clasificación global de diferencias

Las categorías pueden coexistir. En el estado actual solo se cuantifican automáticamente los duplicados y los `NOT_FOUND`; no se extrapola el caso de control al resto.

| Categoría | Cantidad certificada | Interpretación |
|---|---:|---|
| `OFFICIAL_EXACT_MATCH` | 0 | Ningún ejercicio de Madrid tiene todavía cadena completa con PDF, página y literal exacto |
| `OFFICIAL_STRUCTURAL_MATCH` | 1 caso de control | Coincidencia matemática y de subapartados, sin certificar procedencia histórica |
| `TRANSCRIPTION_DIFFERENCE` | 1 caso de control | Redacción modernizada o añadida respecto al literal oficial |
| `SEGMENTATION_DIFFERENCE` | 0 casos certificados | No significa ausencia; falta auditar sistemáticamente alternativas e instrucciones |
| `MATH_NOTATION_DIFFERENCE` | 1 caso de control | Sistema vertical reducido a texto lineal/HTML histórico |
| `AMBIGUOUS_MATCH` | 1 caso de control | Metadatos de convocatoria incompatibles con la fuente localizada |
| `OFFICIAL_SOURCE_NOT_FOUND` | 1.687 representaciones actuales | Estado formal anterior; puede cambiar cuando se ingieran fuentes institucionales |

No es válido declarar 1.724 ejercicios contrastados solo porque existen archivos oficiales para sus años. La comparación ejercicio por ejercicio sigue pendiente de la incorporación controlada de esos documentos.

## 9. Riesgos de segmentación que deben comprobarse

La reconciliación posterior debe detectar expresamente:

- opciones A/B o alternativas numeradas fusionadas;
- ejercicios de una opción mezclados con otra;
- instrucciones como “el alumno deberá elegir...” pegadas al enunciado;
- encabezados y criterios de calificación repetidos;
- `a)`, `b)`, `c)` perdidos, reordenados o convertidos en ejercicios independientes;
- ejercicios distintos fusionados por compartir tema o solución;
- un mismo ejercicio oficial duplicado en recopilación anual, recopilación por bloques y banco derivado.

La unidad de comparación debe ser el ejercicio oficial dentro de su opción, no el recorte gráfico ni el registro histórico aislado.

## 10. Riesgos de notación matemática

La comparación debe conservar dos literales: recopilación y oficial. Deben registrarse, sin corregir automáticamente:

- fracciones linealizadas;
- exponentes o subíndices perdidos;
- raíces sin alcance inequívoco;
- matrices convertidas en listas;
- determinantes expresados como `det([[...]])`;
- sistemas sin llave ni alineación;
- límites sin condición colocada debajo;
- integrales con límites o diferencial deteriorados;
- vectores convertidos en tuplas sin flecha;
- funciones a trozos linealizadas;
- símbolos y operadores sustituidos o deteriorados.

La fuente oficial puede demostrar la estructura, pero la corrección del catálogo debe realizarse en una fase posterior y conservar el literal histórico y sus hashes.

## 11. PDF oficiales que convendría conservar posteriormente

No se ha incorporado ninguno en esta auditoría. Para garantizar reproducibilidad futura se recomienda autorizar después un corpus local inmutable con:

1. Matemáticas II y CCSS II, ordinaria y extraordinaria, 2022–2025, desde la Comunidad de Madrid.
2. Matemáticas II y CCSS II, ordinaria y extraordinaria, 2018–2021, desde UCM/UPM o el archivo de la Comunidad.
3. Las variantes coincidentes/incidencias disponibles para 2012–2024, pues no son intercambiables con la convocatoria general.
4. Matemáticas II y CCSS II, junio y septiembre de 2005–2009, desde UPM.
5. Modelos oficiales cuando las recopilaciones contengan registros `Modelo`.
6. Los documentos institucionales individuales que se localicen para 2010–2017.
7. Los documentos 2000–2004 solo cuando aparezca una copia institucional verificable; no sustituirlos por academias.

Cada PDF debería almacenarse con URL institucional de origen, fecha de descarga, SHA-256, número de páginas, materia, año, convocatoria y estado de verificación. La página institucional de índice debe conservarse también como referencia de procedencia.

## 12. Impacto estimado sobre `NOT_FOUND`

El máximo bloque potencialmente afectado es de **1.687 representaciones Madrid** actualmente en `NOT_FOUND`:

- Matemáticas II: 795;
- CCSS II: 892.

No se puede prometer una reducción numérica concreta antes de descargar y censar las fuentes. El rango técnicamente honesto es:

- reducción mínima demostrada hoy: 0, porque no se ha modificado la reconciliación;
- techo potencial: 1.687, si todas obtuvieran evidencia documental inequívoca;
- expectativa cualitativa: reducción sustancial en 2005–2009 y 2018–2025, menor y más costosa en 2000–2004 y 2010–2017, y revisión especial de coincidentes, modelos y registros sin convocatoria.

Las 1.687 representaciones no equivalen uno a uno a los 1.724 ejercicios únicos estimados: el catálogo, los subapartados y las representaciones visuales tienen granularidades distintas.

## 13. Próximo procedimiento reproducible recomendado

1. Autorizar la descarga local de los PDF institucionales enumerados.
2. Crear un registro documental separado del corpus histórico.
3. Calcular SHA-256 y censar páginas.
4. Extraer estructura editorial: instrucciones, opción, ejercicio y subapartados.
5. Generar candidatos de enlace por materia, año, convocatoria y similitud de literal.
6. Confirmar cada candidato con evidencia de página; no resolver por orden de carga.
7. Conservar todas las procedencias históricas como `sourceRecordId`/alias.
8. Clasificar diferencias coexistentes y no sobrescribir todavía los bancos.
9. Reconstruir el ámbito de respuesta y solución solo después de certificar la unidad oficial.
10. Recalcular el impacto sobre las 1.687 representaciones Madrid.

## 14. Límites y garantías de esta auditoría

- No se ha modificado ninguna recopilación, banco, catálogo, respuesta, solución ni artefacto de reconciliación.
- No se ha descargado ni incorporado ningún PDF nuevo al repositorio.
- No se ha usado Mathpix.
- No se ha reanudado la revisión visual.
- No se ha utilizado la recopilación histórica como fuente de verdad.
- No se ha inferido convocatoria, opción, página o comunidad por semejanza.
- El inventario local y los recuentos son reproducibles a partir de los archivos existentes; la certificación documental exhaustiva queda pendiente del corpus oficial autorizado.


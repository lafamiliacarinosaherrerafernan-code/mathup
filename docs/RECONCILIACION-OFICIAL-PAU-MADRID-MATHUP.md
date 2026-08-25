# Reconciliación oficial PAU Madrid y ampliación documental Andalucía — +MathUp

Fecha de ejecución: 25 de agosto de 2026  
Estado: biblioteca documental paralela; no conectada al catálogo ni al runtime público

## 1. Alcance y reglas de autoridad

Este trabajo continúa la auditoría previa de Madrid y amplía la biblioteca documental a Andalucía para Matemáticas II y Matemáticas Aplicadas a las CCSS II. No se ha reiniciado ni sustituido la evidencia histórica ya localizada.

Se han aplicado estas reglas:

- El PDF institucional es la única autoridad documental para certificar literal, estructura editorial, año, convocatoria, modelo, opción, pregunta y subapartados.
- Las recopilaciones históricas del profesor se conservan como evidencia de +MathUp, pero no se consideran fuente oficial.
- Una coincidencia automática estructural no equivale a certificación literal.
- No se infieren metadatos ausentes, ni se fabrican respuestas, soluciones, notación o imágenes.
- Andalucía conserva su estructura documental propia —Titular/Reserva/Suplente, variantes y criterios—; no se le aplican reglas de segmentación de Madrid o Castilla-La Mancha.
- No se ha modificado ningún banco, `data/`, catálogo v1/v2, respuesta, solución, aplicación, Supabase, renderizador o skill.
- No se ha usado Mathpix.

La metodología sigue el principio de `skill-editor-enunciados`: literalidad desde fuente oficial, instrucciones fuera del enunciado, alternativas separadas y subapartados conservados.

## 2. Fuentes institucionales

### 2.1 Madrid

Se utilizaron exclusivamente:

- [Comunidad de Madrid — exámenes PAU y estadísticas](https://www.comunidad.madrid/educacion/examenes-pau-estadisticas)
- [UPM — exámenes 2017–2023](https://www.upm.es/FuturosEstudiantes/Ingresar/Acceso/ArticulosRelacionados?fmt=detail&id=CON03570&prefmt=articulo)
- [UPM — exámenes 2010–2016](https://www.upm.es/FuturosEstudiantes/Ingresar/Acceso/ArticulosRelacionados?fmt=detail&id=6a0bf1be3d719210VgnVCM10000009c7648a____&prefmt=articulo)
- [UPM — exámenes 2005–2009](https://www.upm.es/FuturosEstudiantes/Ingresar/Acceso/ArticulosRelacionados?fmt=detail&id=17e33965cdede110VgnVCM10000009c7648a____&prefmt=articulo)
- UCM, páginas institucionales de convocatorias ordinarias y extraordinarias 2025–2026 y repositorios históricos enlazados desde ellas.

Distribución de los 79 PDF oficiales verificados:

| Organismo | PDF |
|---|---:|
| UPM | 33 |
| UCM | 26 |
| Comunidad de Madrid | 20 |
| **Total** | **79** |

### 2.2 Andalucía

Se utilizó exclusivamente el archivo del [Distrito Único Andaluz / Junta de Andalucía — exámenes de años anteriores](https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/?q=grados&d=g_b_examenes_anteriores.php).

Se descargaron y verificaron 36 paquetes institucionales:

- paquetes anuales 2010–2026 para ambas materias;
- paquetes históricos agregados de ambas materias;
- ningún paquete privado o de academia.

Los paquetes contienen documentos repetidos entre rutas y convocatorias. El censo deduplica por SHA-256 sin eliminar las distintas ocurrencias documentales.

## 3. Biblioteca documental incorporada

### 3.1 Resumen

| Comunidad | Enlaces/paquetes planificados | Descargados y verificados | PDF oficiales únicos | PDF de examen | PDF de criterios | Auxiliares |
|---|---:|---:|---:|---:|---:|---:|
| Madrid | 99 documentos | 79 | 79 | 79 | 0 | 0 |
| Andalucía | 36 paquetes | 36 | 397 | 204 | 178 | 15 |
| **Total** | **135 unidades de descarga** | **115 verificadas** | **476 PDF únicos censados** | **283** | **178** | **15** |

Los 20 fallos de Madrid corresponden a URL institucional no disponible, respuesta no PDF o ausencia en los índices oficiales consultados. No se sustituyeron con fuentes privadas.

### 3.2 Tamaño

- Bytes de PDF únicos censados: **77.313.804 bytes** (73,73 MiB).
- Copias físicas conservadas por distintas procedencias/rutas oficiales: **793 PDF**, 140.207.768 bytes (133,71 MiB).
- Paquetes ZIP institucionales de trabajo: 42, conservados localmente dentro del proyecto mientras dure la revisión.
- Todos los archivos están bajo `APP MARGARITA SALAS`; no hay dependencias permanentes de Escritorio, Descargas o carpetas temporales externas.

### 3.3 Registro de procedencia

Cada PDF censado registra:

- `documentId` estable derivado del SHA-256;
- SHA-256 completo;
- materia y comunidad;
- año;
- convocatoria y modelo cuando pueden verificarse;
- organismo e URL institucional;
- nombre original y ruta dentro del paquete;
- ruta local del proyecto;
- páginas, bytes y fecha de descarga;
- estado de verificación;
- todas las ocurrencias cuando el mismo hash aparece en varios paquetes.

No se declara equivalencia por nombre: los documentos solo se deduplican si su SHA-256 coincide.

## 4. Cobertura cronológica 2000–2026

La matriz completa está en `artifacts/official-pau-madrid-andalucia/coverage-matrix-2000-2026.json`. Contiene **191 filas**, separadas por comunidad, materia, año y convocatoria/modelo. Los años sin documento también constan expresamente.

### 4.1 Cobertura mínima 2010–2026

| Comunidad | Materia | Años con al menos un examen oficial censado | Huecos anuales completos |
|---|---|---:|---|
| Madrid | Matemáticas II | 15/17 | 2013, 2015 |
| Madrid | CCSS II | 15/17 | 2011, 2014 |
| Andalucía | Matemáticas II | 17/17 | ninguno |
| Andalucía | CCSS II | 16/17 | 2012 |

Además de esos cinco huecos materia-año, la matriz conserva huecos de convocatorias concretas aunque exista otro documento del mismo año. En 2010–2026 hay **17 filas sin PDF censado**: 16 de Madrid y 1 de Andalucía.

#### Madrid: convocatorias/modelos pendientes

| Materia | Año | Convocatoria | Motivo documentado |
|---|---:|---|---|
| Matemáticas II | 2010 | Extraordinaria | descarga institucional fallida/no PDF |
| Matemáticas II | 2011 | Ordinaria | no localizada en índices oficiales |
| Matemáticas II | 2012 | Extraordinaria | descarga institucional fallida/no PDF |
| Matemáticas II | 2013 | Ordinaria | descarga institucional fallida/no PDF |
| Matemáticas II | 2013 | Extraordinaria | descarga institucional fallida/no PDF |
| Matemáticas II | 2015 | Ordinaria | descarga institucional fallida/no PDF |
| Matemáticas II | 2015 | Extraordinaria | descarga institucional fallida/no PDF |
| Matemáticas II | 2016 | Extraordinaria | no localizada en índices oficiales |
| Matemáticas II | 2017 | Ordinaria | no localizada en índices oficiales |
| Matemáticas II | 2019 | Ordinaria | no localizada en índices oficiales |
| CCSS II | 2010 | Extraordinaria | descarga institucional fallida/no PDF |
| CCSS II | 2011 | Ordinaria | no localizada en índices oficiales |
| CCSS II | 2011 | Extraordinaria | no localizada en índices oficiales |
| CCSS II | 2014 | Ordinaria | descarga institucional fallida/no PDF |
| CCSS II | 2014 | Extraordinaria | descarga institucional fallida/no PDF |
| CCSS II | 2017 | Ordinaria | no localizada en índices oficiales |

#### Andalucía: pendiente 2010–2026

El paquete oficial anual de **CCSS II 2012** se descargó correctamente, pero solo contiene seis tablas de la normal oficial y ningún PDF de examen. Por tanto, el año se mantiene como `NOT_FOUND` documental; no se rellena con una recopilación privada.

### 4.2 Objetivo 2000–2009

- Madrid: se han censado documentos desde 2005; quedan sin cobertura oficial los años 2000–2004 y combinaciones concretas posteriores reflejadas en la matriz.
- Andalucía: los paquetes históricos oficiales accesibles aportan material de 2009; no se localizaron documentos institucionales verificables de 2000–2008 en el archivo consultado.
- Ningún año ausente se ha sustituido con fuentes no institucionales.

La cobertura 2010–2026 no se declara completa mientras persistan los cinco huecos materia-año anteriores.

## 5. Recopilaciones históricas de Madrid

Se localizaron **1.728 registros** aportados previamente:

| Materia | Registros | Literales únicos estimados | Con `sourceRecordId` canónico |
|---|---:|---:|---:|
| Matemáticas II | 825 | 822 | 794 |
| CCSS II | 903 | 901 | 885 |
| **Total** | **1.728** | **1.723** | **1.679** |

La estimación de unicidad utiliza el literal completo normalizado. Se detectaron **5 grupos duplicados exactos**, con 10 registros históricos y 5 duplicaciones excedentes. Todos conservan sus identificadores históricos y sus `sourceRecordId`; no se ha eliminado ni fusionado físicamente ningún registro.

Los 49 registros sin `sourceRecordId` canónico corresponden a materiales históricos que no aparecen como observación materializada en la evidencia de Fase 2. Se conservan y quedan explícitamente pendientes; no se ha inventado una relación.

## 6. Reconciliación Madrid contra fuente oficial

### 6.1 Resultado conservador

| Clasificación | Matemáticas II | CCSS II | Total |
|---|---:|---:|---:|
| `DOCUMENT_MATCH_EXACT` | 0 | 0 | **0** |
| `DOCUMENT_MATCH_STRUCTURAL` | 23 | 14 | **37** |
| `AMBIGUOUS` | 0 | 3 | **3** |
| `HUMAN_REVIEW_REQUIRED` | 191 | 278 | **469** |
| `NOT_FOUND` | 611 | 608 | **1.219** |
| **Total** | **825** | **903** | **1.728** |

No se ha certificado ninguna coincidencia exacta porque el literal histórico y el texto extraído del PDF no ofrecen identidad literal demostrable. Esta decisión evita convertir una similitud textual en autoridad documental.

### 6.2 Diferencias coexistentes

Las banderas de diferencia no son categorías excluyentes:

| Diferencia detectada automáticamente | Registros |
|---|---:|
| `TRANSCRIPTION_DIFFERENCE` asociada a coincidencia estructural | 37 |
| `MATH_NOTATION_DIFFERENCE_POSSIBLE` | 278 |
| segmentación certificada automáticamente | 0 |

El valor 0 en segmentación certificada no significa que no existan defectos: significa que ninguno puede certificarse con seguridad mediante la comparación automática actual. Alternativas, encabezados, instrucciones y subapartados deben confirmarse a nivel de página antes de cualquier corrección.

### 6.3 Apartados, instrucciones y notación

La reconciliación registra página y documento candidato, pero no modifica el contenido. Quedan para revisión humana documental:

- instrucciones editoriales pegadas al enunciado;
- opciones/alternativas fusionadas;
- ejercicios divididos o concatenados;
- apartados `a)`, `b)`, `c)` perdidos o fusionados;
- encabezados repetidos;
- fracciones, potencias, raíces, matrices, determinantes, sistemas, límites, derivadas, integrales, vectores, funciones a trozos y operadores cuya estructura se haya degradado.

## 7. Impacto sobre los 1.687 `NOT_FOUND` anteriores de Madrid

| Resultado actual | `sourceRecordId` |
|---|---:|
| mapeados a la evidencia histórica actual | **1.679** |
| con coincidencia documental estructural | **37** |
| requieren revisión humana | **451** |
| ambiguos | **3** |
| siguen `NOT_FOUND` | **1.188** |
| sin correspondencia materializada en Fase 2 | **8** |

Por tanto, la biblioteca reduce en **37** los casos sin contraste alguno, pero no autoriza todavía su publicación. Los 451 casos de revisión y los 3 ambiguos han ganado un documento/página candidato, no una certificación. Los ocho no mapeados se conservan como discrepancia de cobertura entre inventarios.

## 8. Andalucía: estructura documental propia

Se censaron **397 PDF oficiales únicos**, de los que 204 son exámenes. La extracción preliminar detecta **1.616 unidades de ejercicio**:

| Materia | PDF de examen | Unidades detectadas |
|---|---:|---:|
| Matemáticas II | 104 | 826 |
| CCSS II | 100 | 790 |
| **Total** | **204** | **1.616** |

Estas unidades son un censo estructural preliminar, no ejercicios importados ni certificados. Andalucía se conserva con sus atributos documentales propios:

- convocatoria cuando es verificable;
- condición Titular/Reserva/Suplente;
- variante A/B o modelo cuando consta;
- examen separado de criterios de corrección y tablas auxiliares;
- ruta original dentro del paquete institucional.

De los 397 PDF, 113 tienen metadatos verificados y 284 permanecen con metadatos parciales. No se deduce convocatoria/modelo por semejanza ni se reutilizan reglas de otras comunidades.

No existe todavía material histórico andaluz incorporado a +MathUp contra el que conciliar `sourceRecordId`; esta fase prepara la tercera comunidad sin conectarla al catálogo v2 ni a la aplicación.

## 9. Artefactos reproducibles

### Fuentes

- `sources/pau-official/madrid/document-registry.jsonl`
- `sources/pau-official/madrid/download-plan.json`
- `sources/pau-official/andalucia/document-registry.jsonl`
- `sources/pau-official/andalucia/package-registry.jsonl`
- PDF oficiales bajo carpetas por comunidad, materia, año y convocatoria/modelo.

### Madrid

- `artifacts/madrid-official-pau-reconciliation/coverage-matrix.json`
- `artifacts/madrid-official-pau-reconciliation/library-summary.json`
- registros de descarga y procedencia.

### Andalucía

- `artifacts/andalucia-official-pau-library/coverage-matrix.json`
- `artifacts/andalucia-official-pau-library/library-summary.json`
- censo de estructura y paquetes.

### Integración

- `artifacts/official-pau-madrid-andalucia/coverage-matrix-2000-2026.json`
- `artifacts/official-pau-madrid-andalucia/madrid-historical-reconciliation.jsonl`
- `artifacts/official-pau-madrid-andalucia/madrid-historical-duplicates.jsonl`
- `artifacts/official-pau-madrid-andalucia/andalucia-exam-structures.jsonl`
- `artifacts/official-pau-madrid-andalucia/impact-on-prior-madrid-not-found.json`
- `artifacts/official-pau-madrid-andalucia/summary.json`
- `artifacts/official-pau-madrid-andalucia/test-results.json`

### Scripts y prueba

- `scripts/madrid-official-pau-library.ps1`
- `scripts/andalucia-official-pau-library.ps1`
- `scripts/reconcile-official-pau-madrid-andalucia.ps1`
- `tests/official-pau-madrid-andalucia.test.ps1`

## 10. Pruebas

La prueba documental ejecutó **1.453 comprobaciones**, todas superadas:

- 0 fallos;
- existencia de todos los PDF registrados;
- firma `%PDF-`;
- SHA-256 coincidente;
- 79 PDF de Madrid y 397 de Andalucía;
- 204 exámenes y 178 criterios andaluces;
- matriz combinada de 191 filas;
- cobertura explícita 2000–2026;
- único hueco andaluz 2010–2026 en CCSS II 2012;
- 1.728 decisiones históricas de Madrid;
- suma exacta de clasificaciones;
- 1.679 registros enlazados a `sourceRecordId` canónico;
- 1.723 literales únicos estimados y cinco grupos duplicados;
- impacto trazable sobre la línea base de 1.687 `NOT_FOUND`.

## 11. Limitaciones y trabajo pendiente

1. La cobertura oficial 2010–2026 todavía no es completa: faltan dos años de Matemáticas II y dos de CCSS II en Madrid, y CCSS II 2012 en Andalucía.
2. Los documentos de Madrid con descarga fallida deben recuperarse mediante otra página institucional o solicitarse al organismo; no se sustituirán por copias privadas.
3. Los 37 `STRUCTURAL` requieren inspección humana del PDF antes de convertirse en coincidencia certificada.
4. Los 469 casos de revisión, tres ambiguos y 1.219 no encontrados permanecen sin cambios.
5. La segmentación y notación andaluzas están censadas, pero aún no certificadas página a página.
6. Las 1.616 unidades andaluzas no se han importado ni asociado a respuestas o soluciones.
7. No se ha reanudado la revisión visual y no se ha modificado producción.

## 12. Conclusión

La biblioteca oficial paralela queda preparada y auditable, con cobertura fuerte pero no completa. Madrid dispone de contraste documental trazable para 509 registros candidatos (37 estructurales, 469 para revisión y 3 ambiguos), y Andalucía incorpora una biblioteca institucional amplia con su estructura propia. Ningún resultado autoriza todavía publicación, corrección automática ni conexión al runtime.

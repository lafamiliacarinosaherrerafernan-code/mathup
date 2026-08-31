# Auditoría funcional final de 3.º ESO

Fecha: 10 de agosto de 2026.

## 1. Alcance

Se ha auditado exclusivamente 3.º ESO en las cinco zonas reales de la aplicación:

1. Práctica por temas.
2. Retos.
3. Aventuras.
4. Entrenador personal IA.
5. Examen.

La revisión comprende el banco completo activo de **407 ejercicios curados**: 240 anteriores y 167 incorporados en la ampliación A/B. No se han creado ejercicios, ampliado el catálogo ni modificado otros cursos o la skill `solucion-de-ejercicios`.

## 2. Inventario definitivo

| Tema | Anteriores | Nuevos | Total | Aprendiz | Maestro | Aptos para Examen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Números reales | 30 | 4 | 34 | 5 | 29 | 27 |
| Potencias y raíces | 10 | 17 | 27 | 12 | 15 | 14 |
| Expresiones algebraicas | 20 | 24 | 44 | 19 | 25 | 27 |
| Ecuaciones y sistemas de ecuaciones | 37 | 28 | 65 | 13 | 52 | 55 |
| Proporcionalidad | 31 | 19 | 50 | 22 | 28 | 14 |
| Sucesiones | 16 | 22 | 38 | 7 | 31 | 29 |
| Cuerpos geométricos | 28 | 13 | 41 | 9 | 32 | 23 |
| Funciones | 35 | 11 | 46 | 19 | 27 | 21 |
| Estadística | 25 | 3 | 28 | 14 | 14 | 2 |
| Probabilidad | 8 | 26 | 34 | 18 | 16 | 20 |
| **Total** | **240** | **167** | **407** | **138** | **269** | **232** |

Los 232 ejercicios curados aptos para Examen se componen de 117 anteriores y 115 nuevos. La lógica existente también puede producir variantes generadas verificadas por tema y dificultad; estas no alteran el recuento de registros curados.

## 3. Validación estática del banco completo

La cadena real de carga se ejecutó en Chrome con los bancos originales, los cinco módulos A/B, los 52 módulos verificados y la normalización específica de 3.º ESO.

Resultados:

- recuento anterior: 240;
- recuento nuevo: 167;
- recuento global: 407;
- identificadores vacíos o duplicados: 0;
- enunciados vacíos: 0;
- preguntas sin cuatro opciones: 0;
- opciones repetidas dentro de una pregunta: 0;
- índices de respuesta correcta inválidos: 0;
- soluciones vacías: 0;
- tokens `undefined` o `NaN`: 0;
- recursos gráficos inexistentes: 0;
- contaminación activa entre cursos: 0;
- preguntas servidas fuera de su tema por el selector estricto: 0.

El auditor conservador señaló 68 casos para revisión semántica porque el texto de `Resultado final` no coincide literalmente con la opción correcta. Se revisaron: son formulaciones equivalentes —cambio de orden, puntuación, explicación añadida, conjunto escrito de otra forma o aproximación acompañada de su valor exacto— y no respuestas incompatibles.

## 4. Recursos visuales

El banco contiene **45 ejercicios** con figura, gráfica o tabla y **22 archivos gráficos únicos**. Se comprobó:

- existencia y tamaño no nulo de los 22 archivos;
- carga real en navegador sin `naturalWidth=0`;
- legibilidad de datos, ejes, escalas y medidas;
- correspondencia entre recurso y enunciado;
- ausencia de soluciones incrustadas que revelen la respuesta.

Distribución principal:

- Cuerpos geométricos: 14 ejercicios con figura;
- Funciones: 14 ejercicios visuales o tabulares;
- Estadística: 15 ejercicios visuales o tabulares;
- Proporcionalidad: 2 ejercicios con tabla.

Las seis gráficas que quedaban por revisar —coches, facturación anual, parábola, dos rectas y diagrama de comida preferida— son legibles y utilizables. Las rutas se mantuvieron dentro de `assets/exercises/3eso/originals`.

## 5. Pruebas funcionales en navegador

### Práctica por temas y Retos

Se iniciaron los **20 recorridos** formados por los diez temas en nivel Aprendiz y Maestro.

En cada recorrido se verificó:

- título y tema correctos;
- nivel correcto;
- diez preguntas preparadas;
- enunciado no vacío;
- cuatro opciones distintas;
- selección de respuesta;
- feedback de acierto o fallo;
- resolución paso a paso;
- navegación de vuelta a los temas;
- ausencia de imágenes rotas.

Resultado: **20/20 recorridos correctos**.

La prueba consecutiva de Números reales no repitió la primera pregunta de la sesión anterior, confirmando que el historial persiste entre aperturas. Dentro de cada ronda no se encontraron preguntas duplicadas.

### Aventuras

El mapa mostró las diez zonas en el orden correcto. Con un alumno nuevo solo estaba abierta la primera zona, comportamiento esperado por la progresión de la aventura.

En la zona accesible se probaron las tres dificultades:

- Fácil;
- Media;
- Difícil.

Las tres generaron preguntas del tema, cuatro opciones, corrección, resolución y navegación de regreso, sin recursos rotos. El selector está conectado a los bancos original, verificado y A/B de los diez temas; los 167 ejercicios nuevos mantienen `adventureEligible: true`.

### Entrenador personal IA

Se probaron tres alumnos independientes y los siguientes escenarios:

1. Diagnóstico inicial: diez preguntas, una por cada tema, todas de dificultad Aprendiz.
2. Diez fallos deliberados: nivel inicial y prioridades de refuerzo obtenidas de los resultados reales.
3. Sesión posterior a los fallos: siete actividades de dificultad inicial.
4. Segunda sesión del mismo alumno: persistencia de sesión y progreso; **0 repeticiones entre las 14 preguntas** de ambas sesiones.
5. Diez aciertos en diagnóstico: nivel avanzado y primera sesión en dificultad media.
6. Nueva sesión tras aciertos continuados: ascenso efectivo a dificultad Maestro.
7. Alumno con debilidades en varios temas: mezcla de activación, consolidación y tema prioritario según el perfil guardado.

Se confirmó que el entrenador lee de `margaritaSalasCoachV1`:

- resultados de diagnóstico;
- resultados de actividades;
- temas prioritarios;
- temas en consolidación;
- temas dominados;
- errores recientes;
- lagunas de prerrequisitos con ruta válida;
- dificultad recomendada;
- sesiones anteriores y preguntas ya utilizadas.

También se confirmó mediante preguntas visibles que el entrenador selecciona ejercicios del banco A/B nuevo, no solo del banco anterior.

### Examen

Se realizaron dos exámenes completos:

**Examen A**

- 7 preguntas;
- temas seleccionados: Proporcionalidad, Funciones y Probabilidad;
- reparto obtenido: 2, 2 y 3 preguntas;
- temas ajenos introducidos: 0;
- preguntas con cuatro opciones: 7/7;
- preguntas con corrección y solución: 7/7;
- resultado final registrado: 7/7.

**Examen B**

- 4 preguntas;
- único tema seleccionado: Cuerpos geométricos;
- preguntas de Cuerpos geométricos: 4/4;
- ejercicios planos introducidos: 0;
- recursos rotos: 0.

## 6. No repetición y variedad

La selección mantiene historiales separados por alumno, curso, tema, modalidad y nivel. La revisión del selector y las pruebas funcionales confirman:

- no se repite una pregunta dentro de una ronda;
- una pregunta mostrada queda registrada para sesiones posteriores de la misma modalidad;
- el banco solo reinicia su ciclo cuando se agotan las alternativas disponibles;
- al reiniciar, evita como primera pregunta la última mostrada del ciclo anterior cuando existe otra opción;
- el Entrenador conserva además su propio historial de actividades por alumno;
- los historiales de Práctica, Aventura, Entrenador y Examen no se mezclan entre sí.

## 7. Reglas especiales comprobadas

- **Proporcionalidad:** directa, inversa, compuesta, porcentajes y contextos permanecen en el tema; no se detectaron preguntas de otros temas.
- **Sucesiones:** progresiones, términos, sumas e interés asociado a progresiones permanecen clasificados en Sucesiones.
- **Estadística:** se mantienen tablas, gráficos, centralización y dispersión; los dos originales contradictorios de 28/29 datos continúan fuera del banco activo.
- **Cuerpos geométricos:** los ejercicios activos son tridimensionales; los seis registros planos almacenados no entran en Práctica ni en el examen probado.
- **Probabilidad:** permanece separada de Estadística en catálogo, selección y entrenador.

## 8. Incidencias encontradas y corregidas

| Problema | Causa | Corrección | Prueba posterior |
| --- | --- | --- | --- |
| El Entrenador no podía seleccionar los 167 ejercicios A/B nuevos ni toda la práctica original | Su fuente solo añadía el banco verificado y variantes generadas | Se conectaron `MargaritaEsoOriginalPractice.all` y `MargaritaEso3ApprovedABPractice.all` exclusivamente para 3.º ESO | Las sesiones mostraron preguntas nuevas y la ruta alcanza los 407 registros curados |
| La dificultad recomendada se calculaba pero no intervenía en la selección | La sesión escogía el primer ejercicio disponible del tema | Se añadió selección por rango Aprendiz/medio/Maestro con alternativa más próxima | Fallos → `easy`; diagnóstico perfecto → dificultad 2; aciertos continuados → `hard` |
| El diagnóstico de 3.º ESO finalizaba con 0 preguntas | Usaba una ruta antigua que no devolvía el banco actual | Se construye una pregunta por cada uno de los diez temas reales | Diagnóstico completo 10/10 temas |
| El diagnóstico de un alumno nuevo podía empezar con un ejercicio Maestro | Elegía el primer registro del banco sin considerar nivel | El diagnóstico pide expresamente rango Aprendiz | Primera y las diez preguntas de diagnóstico verificadas como `easy` |
| Una sesión podía recomendar «Operaciones combinadas», que no es tema de 3.º ESO | Un prerrequisito transversal sin ruta propia se promovía a tema principal | Solo se promueven lagunas incluidas en las diez prioridades y con ruta temática válida | Las sesiones posteriores trabajan únicamente los diez temas reales |

Los cambios se limitaron a `coach-services.js` y no alteran los algoritmos de puntuación, registro de respuestas o progreso.

## 9. Resumen por modalidad

| Modalidad | Ejercicios elegibles | Pruebas realizadas | Fallos encontrados | Fallos corregidos | Estado final |
| --- | ---: | ---: | ---: | ---: | --- |
| Práctica por temas | 407 curados | 10 temas + carga estructural completa | 0 | 0 | Correcto |
| Retos | 407 curados: 138 Aprendiz y 269 Maestro | 20 retos tema/nivel | 0 | 0 | Correcto |
| Aventuras | 407 curados, distribuidos por dificultad, más variantes existentes | 3 entrenamientos funcionales + 10 rutas revisadas | 0 | 0 | Correcto |
| Entrenador personal IA | 407 curados, más variantes existentes | 3 perfiles, 2 diagnósticos completos y 4 sesiones/adaptaciones | 5 | 5 | Correcto |
| Examen | 232 curados aptos, más variantes existentes | 2 exámenes completos, 11 preguntas | 0 | 0 | Correcto |

## 10. Estado final

No quedan incidencias funcionales activas de 3.º ESO detectadas en esta auditoría. Los 35 candidatos rechazados en la fase anterior siguen fuera del banco y los 202 candidatos A/B permanecen completamente contabilizados:

> 202 = 167 incorporados + 35 rechazados + 0 pendientes.

## **3.º ESO VALIDADO PARA USO**


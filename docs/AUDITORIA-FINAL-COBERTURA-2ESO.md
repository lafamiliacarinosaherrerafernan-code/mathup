# Auditoría final de cobertura de 2.º ESO

> Estado histórico previo a la conexión. La fase posterior ya ha conectado y validado los originales seleccionados; el resultado vigente está en `docs/CONEXION-CONTROLADA-ORIGINALES-2ESO.md`.

Fecha: 9 de agosto de 2026.

Alcance: los nueve temas vigentes de 2.º ESO. No se ha añadido Estadística, no se han conectado masivamente originales y no se ha modificado la política didáctica ni la skill.

## Criterio de recuento

Los recuentos de «activos» que se citan como A/M son **familias estructurales normalizadas** observadas en Aprendiz y Maestro, no el número bruto de preguntas. Un cambio exclusivo de números no se cuenta como variedad nueva.

El inventario original anterior contabilizaba ejercicios y apartados extraídos de fichas y exámenes. Esta revisión añadió los documentos completos de cada tema y el libro de 2.º ESO, que no estaban incluidos íntegramente en aquel inventario. Los bloques localizados en esos documentos son candidatos: no se suman automáticamente como ejercicios únicos porque hay variantes, teoría, encabezados y solapamientos.

## A. Retirada autorizada

Se han retirado exclusivamente de los pools activos:

- `2eso-figuras-planas-f52be24e7dbc`.
- `2eso-figuras-planas-093d18d63994`.

Los dos trabajaban error absoluto y relativo. Se conservan los documentos originales y su procedencia; no se han reasignado a otro tema.

## B. Interés simple: comprobación de la fuente

Los dos originales coinciden entre sí:

- `documentos/2º ESO/Temas mios/4-Proporcionalidad Teoria.doc`.
- `documentos/2º ESO/Temas mios/4-Proporcionalidad Teoria.pdf`.

En ambos aparece la fórmula:

\[
I=\frac{C\cdot R\cdot T}{n\cdot100}
\]

con `n=1` para años, `n=12` para meses y **`n=360` para días**. Esta última convención de la fuente original queda descartada por decisión expresa del profesor. Para Margarita Salas, la política didáctica definitiva y obligatoria de 2.º ESO es `n=1` para años, `n=12` para meses y **`n=365` para días**, con `C_f=C+I` y sin interés compuesto.

Referencias contradictorias conservadas únicamente como fuentes originales:

- `documentos/2º ESO/Temas mios/4-Proporcionalidad Teoria.doc`: el cuadro de interés simple indica «Días ⇒ n=360».
- `documentos/2º ESO/Temas mios/4-Proporcionalidad Teoria.pdf`: el mismo cuadro indica «Días ⇒ n=360».

No se han modificado estos dos originales. Cuando posteriormente se conecten ejercicios o soluciones, no deberá copiarse de ellos la convención de 360 días.

## Inventario cuantitativo de fuentes

| Tema | Inventario previo: extraídos | Potencial previo tras criba | Candidatos adicionales en el documento completo | Libro |
|---|---:|---:|---:|---|
| Números enteros | 123 | 112 | 52 | Repaso integrado, sin capítulo independiente |
| Potencias y raíces cuadradas | 15 | 14 | 199 | Capítulo específico |
| Fracciones | 62 | 51 | 39 | Capítulo específico |
| Proporcionalidad | 12 | 11 | 69 | Capítulo específico |
| Expresiones algebraicas | 52 | 42 | 167 | Capítulo específico |
| Sistemas de ecuaciones | 57 | 35 | 23, más ecuaciones localizadas en el documento de Álgebra | Capítulos de álgebra y ecuaciones |
| Figuras planas | 45 | 31 | 14 | Semejanza y Pitágoras |
| Cuerpos geométricos | 19 | 13 | 64 | Tres capítulos: cuerpos, áreas y volúmenes |
| Funciones | 40 | 24 | 24 | Capítulo específico |

Estas columnas no se suman: contienen solapamientos y apartados múltiples. Sirven para demostrar disponibilidad de material, no para inflar el banco.

## C. Cobertura por subtema

### 1. Números enteros

| Subtema | Activos | Originales | Recuperables | Pendientes visuales | Variedad real | Aprendiz | Maestro | Estado |
|---|---|---|---|---:|---|---|---|---|
| Orden, comparación y recta numérica | Escaso | Ficha completa | Sí | 0 | Variación de orden, signos y posiciones | Debe ampliarse | Adecuado tras originales | B |
| Opuesto y valor absoluto | Escaso | Sí | Sí | 0 | Directo, inverso y comparación | Debe ampliarse | Adecuado tras originales | B |
| Suma, resta y signos | Presente | Abundante | Sí | 0 | Varias posiciones de signo y paréntesis | Presente | Presente | B |
| Producto y división | Presente | Abundante | Sí | 0 | Regla de signos y cadenas | Presente | Presente | B |
| Paréntesis y operaciones combinadas | 10 A / 13 M familias | Abundante | Sí | 0 | Es la parte activa más variada | Suficiente | Suficiente | B |
| Lenguaje verbal | Muy escaso | Sí | Sí | 0 | Traducción en ambos sentidos | Falta conectar | Falta conectar | B |
| Problemas contextualizados | 0 A / 1 M familia detectada | Sí | Sí | 0 | Temperaturas, alturas, saldos y cambios | Insuficiente ahora | Escaso ahora | B |

Conclusión: el volumen activo es alto por variantes numéricas, pero la cobertura estructural está concentrada en operaciones combinadas. El material original permite completarlo con nivel genuino de 2.º ESO.

### 2. Potencias y raíces cuadradas

| Subtema | Activos | Originales | Recuperables | Pendientes visuales | Variedad real | Aprendiz | Maestro | Estado |
|---|---|---|---|---:|---|---|---|---|
| Base negativa y paridad | Parcial | Abundante | Sí | 0 | Exponente par/impar y paréntesis | Falta progresión | Sí tras originales | B |
| Exponente cero y exponentes negativos del material | Parcial | Sí | Sí | 0 | Directo y combinado | Falta conectar | Sí tras originales | B |
| Producto, cociente y mismo exponente | 5 A / 24 M familias | Abundante | Sí | 0 | Varias propiedades y elecciones | Parcial | Amplio | B |
| Potencia de potencia | 3 A / 3 M | Abundante | Sí | 0 | Anidación y signos | Presente | Presente | B |
| Operaciones combinadas con potencias | Escaso | Abundante | Sí | 0 | Varias propiedades en una expresión | Insuficiente ahora | Insuficiente ahora | B |
| Raíces exactas | 2 A / 2 M | Sí | Sí | 0 | Cálculo y reconocimiento | Presente | Presente | B |
| Raíces no exactas, acotación y aproximación | No estable | Sí | Sí | 0 | Entre cuadrados consecutivos y aproximación | Falta conectar | Falta conectar | B |
| Notación científica | 1 A / 2 M | Sí | Sí | 0 | Conversión en ambos sentidos y operaciones | Escasa | Escasa | B |
| Problemas | Escaso | Sí | Sí | 0 | Aplicación de potencias y raíces | Falta conectar | Falta conectar | B |

### 3. Fracciones

| Subtema | Activos | Originales | Recuperables | Pendientes visuales | Variedad real | Aprendiz | Maestro | Estado |
|---|---|---|---|---:|---|---|---|---|
| Equivalencia y simplificación | Escaso | Sí | Sí | 0 | Fracción irreducible, equivalencias | Falta reforzar | Sí tras originales | B |
| Comparación y orden | Escaso | Sí | Sí | 0 | Igual denominador, común denominador y recta | Falta conectar | Sí tras originales | B |
| Signos | Parcial | Sí | Sí | 0 | Signo global, numerador y denominador | Parcial | Parcial | B |
| Suma y resta | 3 A / 4 M familias | Abundante | Sí | 0 | Dos y varias fracciones | Presente | Presente | B |
| Producto y división | 3 A / 3 M | Abundante | Sí | 0 | Cadenas y simplificación previa | Presente | Presente | B |
| Operaciones combinadas | 3 A / 32 M | Abundante | Sí | 0 | Maestro tiene mucha más variedad que Aprendiz | Insuficiente | Amplio | B |
| Fracción de una cantidad | Escaso | Sí | Sí | 0 | Cálculo directo y contexto | Falta conectar | Sí tras originales | B |
| Parte, resto y recuperación del total | 0 A / 9 M | Sí | Sí | 0 | Directo, inverso y varias etapas | Falta en Aprendiz | Presente en Maestro | B |
| Fracción generatriz | Original localizado | Sí: 6 apartados autónomos | Sí, texto completo | 0 | Exacto, periódico puro y mixto | Falta conectar | Falta conectar | B |
| Relación con decimales | Escaso | Sí | Sí | 0 | Conversión y clasificación | Falta conectar | Sí tras originales | B |
| Problemas de varias etapas | Escaso en A | Abundante | Sí | 0 | Distintos datos desconocidos | Falta conectar | Presente | B |

### 4. Proporcionalidad

| Subtema | Activos | Originales | Recuperables | Pendientes visuales | Variedad real | Aprendiz | Maestro | Estado |
|---|---|---|---|---:|---|---|---|---|
| Directa | 4 A / 2 M | Abundante | Sí | 0 | Tablas, regla de tres y problemas | Parcial | Parcial | B |
| Inversa | 1 A / 1 M | Abundante | Sí | 0 | Tablas, producto constante y contexto | Escasa | Escasa | B |
| Identificar no proporcional | No estable | Sí | Sí | 0 | Comparación de relaciones | Falta conectar | Falta conectar | B |
| Tablas y constante de proporcionalidad | Escaso | Sí | Sí | 0 | Completar, decidir y justificar | Falta conectar | Falta conectar | B |
| Porcentajes: parte, porcentaje y total | 1 A / escaso M | Abundante | Sí | 0 | Tres incógnitas posibles | Insuficiente | Insuficiente | B |
| Aumentos, descuentos y precio inicial | 1 A / 2 M | Sí | Sí | 0 | Directo e inverso | Parcial | Parcial | B |
| Repartos directos e inversos | 0 A / 1 M inverso | Sí | Sí | 0 | Dos tipos y distintos números de participantes | Falta en A | Escaso | B |
| Interés simple | No estable | Sí | Sí con política `365` | 0 | Años, meses, días; interés y capital final | Falta conectar | Falta conectar | B |
| Varias magnitudes | Escaso | Sí | Sí | 0 | Magnitudes directas e inversas combinadas | Falta conectar | Falta conectar | B |

Las fichas contienen apartados autónomos que pueden separarse cuando cambia la incógnita o el tipo de relación. Las repeticiones puramente numéricas no deben convertirse en nuevas estructuras.

### 5. Expresiones algebraicas

| Subtema | Activos | Originales | Recuperables | Pendientes visuales | Variedad real | Aprendiz | Maestro | Estado |
|---|---|---|---|---:|---|---|---|---|
| Lenguaje algebraico | Escaso A / 7 M | Sí | Sí | 0 | Traducción y aplicación | Debe reforzarse | Presente | A |
| Monomios: partes, grado y valor numérico | Parcial | Abundante | Sí | 0 | Identificación y cálculo | Presente | Presente | A |
| Reducción de términos | 15 A / 24 M | Abundante | Sí | 0 | Varias letras y grados | Amplio | Amplio | A |
| Operaciones con monomios | 9+ familias A / 3+ M | Abundante | Sí salvo una fórmula | 1 | Producto, cociente y potencia | Amplio | Presente | A |
| Polinomios: grado y valor numérico | Parcial | Sí | Sí | 0 | Identificación y evaluación | Presente | Presente | A |
| Suma y resta de polinomios | 9 A / 9 M | Abundante | Sí | 0 | Ordenados y desordenados | Amplio | Amplio | A |
| Productos y distributiva | 6 A / 6 M | Abundante | Sí | 0 | Monomio por polinomio y productos | Presente | Presente | A |
| Factor común | Escaso A / 2 M | Sí | Sí | 0 | Numérico y literal | Debe reforzarse | Presente | A |
| Identidades notables | 3 A / 11 M | Abundante | Sí | 0 | Desarrollo y reconocimiento | Presente | Amplio | A |
| Aplicaciones | Parcial | Sí | Sí | 0 | Perímetros, áreas y lenguaje | Presente | Presente | A |

Es el único tema cuya cobertura activa ya es suficientemente rica para los dos niveles, aunque queda una expresión incrustada pendiente y conviene equilibrar lenguaje algebraico y factor común en Aprendiz.

### 6. Sistemas de ecuaciones

| Subtema | Activos | Originales | Recuperables | Pendientes visuales | Variedad real | Aprendiz | Maestro | Estado |
|---|---|---|---|---:|---|---|---|---|
| Lineales sin paréntesis | 8 A / 4 M | Abundante | Sí | 0 | Términos en ambos miembros | Presente | Presente | B |
| Lineales con paréntesis | 6 A / 10 M | Abundante | Sí | 0 | Distributiva y signos | Presente | Amplio | B |
| Lineales con fracciones | 2 A / 3 M | Sí | Sí | 0 | MCM y signo ante fracción | Escaso | Escaso | B |
| Segundo grado completas | 5 A / 12 M | Abundante | Sí | 0 | Diferentes coeficientes y orden | Presente | Amplio | B |
| Segundo grado incompletas | 3 A / 6 M | Sí | Sí | 0 | `ax²+c=0` y `ax²+bx=0` | Presente | Presente | B |
| Identidades que generan segundo grado | No estable | Sí | Sí | 0 | Desarrollo y resolución | Falta conectar | Falta conectar | B |
| Sistemas 2×2 por sustitución | 0 A / 1 M | Sí | Sí | 0 | Directos y desordenados | Ausente | Escaso | B |
| Sistemas 2×2 por igualación | 0 A / 1 M | Exámenes | Sí | 0 | Despejes distintos | Ausente | Escaso | B |
| Sistemas 2×2 por reducción | 0 A / no estable | Sí | Sí | 0 | Coeficientes ya opuestos y preparación | Ausente | Insuficiente | B |
| Elección de método y comprobación | No | Sí | Sí | 0 | Estructura adecuada a cada método | Ausente | Falta conectar | B |
| Problemas de ecuaciones | 0 A / 4 M | Sí | Sí | 0 | Edades, números y geometría | Ausente | Presente | B |
| Problemas de sistemas | 0 A / 2 M | Sí | Sí | 0 | Edades, dinero y cantidades | Ausente | Escaso | B |

La carencia activa crítica es Aprendiz: no alcanza sistemas 2×2. Los originales cubren sustitución, igualación, reducción, elección de método y problemas, por lo que el tema pasa a suficiente después de conectarlos de forma graduada.

### 7. Figuras planas

| Subtema | Activos | Originales | Recuperables | Pendientes visuales | Variedad real | Aprendiz | Maestro | Estado |
|---|---|---|---|---:|---|---|---|---|
| Sistema sexagesimal | 0 A / 4 M | Sí | Sí | 0 | Conversión, suma, resta, producto, división y problemas | Falta en A | Parcial | B |
| Ángulos, rectas y circunferencia | 2 familias globales | Sí | Sí | 0 | Relaciones y cálculos | Escaso | Escaso | B |
| Triángulos, cuadriláteros y polígonos | 5 A / 6 M | Sí | Sí | 0 | Clasificación, perímetro y área | Presente | Presente | B |
| Pitágoras | 0 A / 4 M | Abundante | Sí | 0 | Hallar hipotenusa, cateto y problemas | Falta en A | Presente | B |
| Semejanza y Tales | 0 A / 3 M | Sí | Sí salvo tres figuras | 3 | Razón, lados, escalas y superficies | Falta en A | Parcial | B |
| Circunferencia y círculo | 2 A / 2 M | Sí | Sí | 0 | Longitud, área y sectores sencillos | Presente | Presente | B |
| Figuras compuestas | 1 A / 1 M | Sí | Sí | 0 | Descomposición y combinación | Escaso | Escaso | B |
| Problemas | Escaso | Exámenes y libro | Sí | 0 | Contextos y combinación de destrezas | Falta reforzar | Sí tras originales | B |

Los dos ejercicios de error absoluto/relativo ya no intervienen en esta cobertura.

### 8. Cuerpos geométricos

| Subtema | Activos | Originales | Recuperables | Pendientes visuales | Variedad real | Aprendiz | Maestro | Estado |
|---|---|---|---|---:|---|---|---|---|
| Reconocimiento y elementos | Escaso | Abundante | Sí | 0 en inventario previo | Clasificación, caras, aristas y vértices | Falta conectar | Falta conectar | B |
| Prismas | 2 A / 2 M | Sí | Sí | 0 | Área y volumen con distintas bases | Presente | Presente | B |
| Pirámides | 1 A / 1 M | Sí | Sí | 0 | Apotema, área y volumen | Escaso | Escaso | B |
| Cilindros | 1 A / 1 M | Sí | Sí | 0 | Área lateral, total y volumen | Escaso | Escaso | B |
| Conos | 1 A / 1 M | Sí | Sí | 0 | Generatriz, área y volumen | Escaso | Escaso | B |
| Esferas | 1 A / 1 M | Sí | Sí | 0 | Área y volumen | Escaso | Escaso | B |
| Desarrollos planos | 0 A / 1 M | Sí | Recuperable con figura original | 0 legado; conservar imagen | Reconocer y relacionar con áreas | Falta en A | Escaso | B |
| Áreas lateral y total | 2 A / 3 M | Abundante | Sí | 0 | Diferentes cuerpos y dato desconocido | Parcial | Parcial | B |
| Volumen y conversiones | Varias familias | Abundante | Sí | 0 | Directo, inverso y unidades | Presente | Presente | B |
| Cuerpos compuestos | 0 A / 1 M | Sí | Recuperable con figura original | 0 legado; conservar imagen | Suma/resta de volúmenes | Falta en A | Escaso | B |
| Material, costes y problemas | 0 A / 1 M | Sí | Sí | 0 | Superficie, volumen, coste y capacidad | Falta en A | Escaso | B |

Las cuatro alertas antiguas de este tema eran instrucciones y criterios de examen, no ejercicios ni imágenes perdidas. Los originales completos y el libro aportan figuras válidas; al conectarlas se debe conservar el recurso visual, no sustituirlo por una descripción incompleta.

### 9. Funciones

| Subtema | Activos | Originales | Recuperables | Pendientes visuales | Variedad real | Aprendiz | Maestro | Estado |
|---|---|---|---|---:|---|---|---|---|
| Coordenadas y puntos | 0 A / 6 M | Sí | Sí | 0 | Lectura, representación y cuadrantes | Falta en A | Presente | B |
| Tablas y relación entre variables | Escaso | Sí | Sí | 0 | Completar, representar e interpretar | Falta conectar | Falta conectar | B |
| Decidir si una gráfica es función | No estable | Sí | 2 unidades visuales pendientes | 2 | Prueba de vertical y razonamiento | Pendiente | Pendiente | B |
| Imagen, preimagen y ceros | 2 A / presente M | Sí | Sí | 0 | Desde fórmula, tabla y gráfica | Parcial | Parcial | B |
| Lectura cualitativa de gráficas | 0 A / 1 M | Sí | 5 unidades visuales pendientes | 5 | Dominio, recorrido, continuidad, crecimiento, extremos, simetría y periodo | Falta | Escaso | B |
| Función lineal y afín | 2 A / 6 M | Abundante | Sí | 0 | Pendiente, ordenada y contexto | Parcial | Presente | B |
| Recta por dos puntos | 0 A / 3 M | Sí | Sí | 0 | Pendiente y ecuación | Falta | Presente | B |
| Paralelas y perpendiculares | Escaso | Sí | Sí | 0 | Comparación de pendientes | Falta conectar | Falta conectar | B |
| Obtener ecuación desde gráfica | Escaso | Sí | Depende de conservar gráfica | incluido en pendientes | Lectura de interceptos y pendiente | Falta | Falta reforzar | B |
| Parábolas | 1 A / 3 M | Sí en material original de 2.º ESO | Sí | 0 | Tabla, gráfica e interpretación básica | Presente | Presente | B |
| Problemas contextualizados | Escaso | Sí | Sí | 0 | Fórmula, tabla y gráfica | Falta conectar | Falta conectar | B |
| Gráficas de exámenes | No estable | Tres originales | Pendientes visuales | 3 | Cuatro gráficas por ejercicio | Pendiente | Pendiente | B |

No se han contado como cobertura válida la composición, la función inversa ni el dominio de radicales generados actualmente para este tema: se documentan como contaminación.

## D. Cobertura global

| Tema | Cobertura activa | Cobertura potencial con originales | Variedad | Alumno muy activo | Carencias actuales | Estado |
|---|---|---|---|---|---|---|
| Números enteros | Mucha cantidad, concentrada en operaciones | Completa | Alta tras originales | Sostenible tras conexión | Problemas, lenguaje, orden y valor absoluto poco presentes | B |
| Potencias y raíces | Parcial y desequilibrada | Completa | Alta | Sostenible tras conexión | No exactas, combinadas, problemas y notación científica | B |
| Fracciones | Maestro amplio; Aprendiz estrecho | Completa | Alta | Sostenible tras limpieza y conexión | Aprendiz, inversos y problemas de varias etapas | B |
| Proporcionalidad | Insuficiente ahora | Completa | Alta | Sostenible tras conexión | Inversa, porcentajes inversos, repartos, interés y varias magnitudes | B |
| Expresiones algebraicas | Completa | Muy completa | Alta | Sí | Equilibrar lenguaje y factor común en Aprendiz | A |
| Sistemas de ecuaciones | Ecuaciones sí; sistemas no en Aprendiz | Completa | Alta | Sostenible tras conexión | Toda la progresión 2×2 en Aprendiz | B |
| Figuras planas | Parcial | Completa salvo tres figuras aún no verificadas | Alta | Sostenible tras conexión | Sexagesimal, Pitágoras y semejanza en Aprendiz | B |
| Cuerpos geométricos | Parcial | Completa | Alta | Sostenible tras conexión | Elementos, desarrollos, compuestos y problemas en Aprendiz | B |
| Funciones | Parcial y con tres familias contaminantes | Completa salvo diez unidades visuales | Alta | Sostenible tras conexión | Gráficas, tablas, interpretación y rectas en Aprendiz | B |

Clasificación:

- **A — suficiente actualmente:** Expresiones algebraicas.
- **B — suficiente después de conectar originales:** Números enteros; Potencias y raíces cuadradas; Fracciones; Proporcionalidad; Sistemas de ecuaciones; Figuras planas; Cuerpos geométricos; Funciones.
- **C — insuficiente aun agotando originales:** ninguno.

## E. Material visual pendiente

La alerta automática contenía 73 registros de 2.º ESO. Tras revisar su naturaleza:

- 14 unidades reales siguen dependiendo de una fórmula o imagen que debe leerse sin reconstrucción.
- Los demás registros eran encabezados, criterios de evaluación, fragmentos contiguos que deben unirse o ejercicios textuales recuperables. No deben convertirse en ejercicios independientes.

### Expresiones algebraicas: 1 unidad

- `2eso-expresiones-algebraicas-6c1fb18fda45`, documento `5-Expresiones algebraicas Ejercicios.doc`, candidato 5. Los signos de operación incrustados no se recuperan con fidelidad.

### Figuras planas: 3 unidades

- `2eso-figuras-planas-2cdfa62696da`, candidato 3: distancias `a` y `b` y maqueta.
- `2eso-figuras-planas-9b155ddeb64a`, candidato 10: lados desconocidos.
- `2eso-figuras-planas-ba81609bf43e`, candidato 11: lados desconocidos.

Fuente: `7-Figuras planas Ejercicios.doc`. No se han inferido longitudes ni relaciones ausentes del texto.

### Funciones: 10 unidades

Dos ejercicios «es función/no es función», cada uno partido en dos registros:

- `2eso-funciones-9454a4c538b2` + `2eso-funciones-f69801fcf82d`.
- `2eso-funciones-6c43256bbc3b` + `2eso-funciones-851381eb93a2`.

Cinco ejercicios de análisis completo de una gráfica:

- `2eso-funciones-566d04a75086`.
- `2eso-funciones-dd846709d735`.
- `2eso-funciones-7ced4a5c17ae`.
- `2eso-funciones-48cde65536ed`.
- `2eso-funciones-e7306b6bf8d0`.

Fuente: `9-Funciones Ejercicios.doc`.

Tres ejercicios de examen con cuatro gráficas cada uno:

- `2eso-funciones-dc30e3b6cf61`, examen A.
- `2eso-funciones-efbb59ffe0d1`, examen B.
- `2eso-funciones-db0b93a1292e`, examen Peter.

El fragmento `2eso-funciones-a2fd64f8a878` es texto continuado y puede recuperarse al unirlo con el bloque anterior; no necesita inventar una gráfica.

## F. Contaminaciones adicionales detectadas

No se han corregido en esta fase.

### Fracciones que pertenecen inequívocamente a Potencias

Notación científica:

- `2eso-fracciones-054ada7bb22a`.
- `2eso-fracciones-1253956ed8aa`.
- `2eso-fracciones-bf5c38894f0b`.

Potencias o raíces como objetivo principal:

- `2eso-fracciones-8b5fbb76ef5e`.
- `2eso-fracciones-2558951a7401`.
- `2eso-fracciones-69cb44fc714c`.
- `2eso-fracciones-7f42556b6232`.
- `2eso-fracciones-002f19da33c3`.
- `2eso-fracciones-068b92e2233e`.
- `2eso-fracciones-7e5ca613770b`.
- `2eso-fracciones-ace2ca809574`.
- `2eso-fracciones-b251a9580bf8`.
- `2eso-fracciones-727b0e23d665`.
- `2eso-fracciones-165758d41d69`.
- `2eso-fracciones-6be8bc00f61d`.

No se han marcado como contaminantes las expresiones cuyo objetivo sí es operar fracciones aunque contengan algún cuadrado.

### Otras clasificaciones incompatibles

- `2eso-fracciones-6ea7422c7674`: problema de tuneladora con proporcionalidad compuesta, no Fracciones.
- `2eso-numeros-enteros-db2b66327671`: recuperación de un total a partir de fracciones, no Números enteros.
- Funciones de 2.º ESO generadas en `app.js`: dominio de una raíz, composición y función inversa. No corresponden a la progresión fijada para este curso. Las parábolas **sí** se conservan en el diagnóstico porque aparecen expresamente en el material original de 2.º ESO.

## G–J. Cierre solicitado

### G. Temas suficientes ahora

- Expresiones algebraicas.

### H. Temas suficientes tras conectar originales

- Números enteros.
- Potencias y raíces cuadradas.
- Fracciones.
- Proporcionalidad.
- Sistemas de ecuaciones.
- Figuras planas.
- Cuerpos geométricos.
- Funciones.

### I. Temas realmente insuficientes después de aprovechar todo el original

- Ninguno.

### J. Subtemas que faltan en los bancos activos, aunque ya existe material original

- Enteros: orden, valor absoluto, lenguaje y variedad de problemas.
- Potencias: raíces no exactas con acotación, operaciones combinadas, problemas y mayor variedad de notación científica.
- Fracciones: equivalencia, comparación, recuperación del total y problemas graduados en Aprendiz.
- Proporcionalidad: no proporcional, tablas, porcentajes inversos, repartos, interés simple y varias magnitudes.
- Álgebra: solo equilibrar lenguaje algebraico y factor común en Aprendiz.
- Sistemas: sistemas 2×2 por los tres métodos, elección de método, comprobación y problemas en Aprendiz.
- Figuras: sexagesimal, Pitágoras, semejanza/Tales y figuras compuestas en Aprendiz.
- Cuerpos: reconocimiento, elementos, desarrollos, cuerpos compuestos, material/costes y conversiones.
- Funciones: coordenadas y tablas en Aprendiz, lectura cualitativa de gráficas, ecuación desde gráfica, paralelas/perpendiculares y problemas.

## Límites de esta fase

- No se ha conectado ningún original.
- No se han generado ejercicios.
- No se ha modificado la skill.
- No se han modificado 1.º, 3.º, 4.º ESO ni Bachillerato.
- No se ha añadido Estadística.
- No se ha avanzado al reconocimiento manuscrito.

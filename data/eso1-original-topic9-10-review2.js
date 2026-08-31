(function () {
  "use strict";

  const CONTEXTUAL = "documentos/1º ESO/Fuentes de ejercicios/10-Funciones/fUNCIONES 1 ESO CONTEXTUALIZADOS.pdf";
  const LINEAR = "documentos/1º ESO/Fuentes de ejercicios/10-Funciones/Ejercicios de Funcion Lineal 1ºESO.pdf";
  const FUNCTIONS_II = "documentos/1º ESO/Fuentes de ejercicios/10-Funciones/pdf_ 1º ESO Funciones ii.pdf";
  const FUNCTIONS_BOOK = "documentos/1º ESO/Fuentes de ejercicios/10-Funciones/pdf_ 1º ESO Funciones.pdf";
  const BODIES = "documentos/1º ESO/Fuentes de ejercicios/9-Cuerpos geometricos/areas y volumenes de cuerpos geometricos_1ESO.pdf";
  const IMAGE_ROOT = "assets/exercises/1eso/originals";
  const questions = [];

  function add({ id, topic = "funciones", page, reference, document = CONTEXTUAL, subtopic, type, structure, text, answer, wrong, solution, level = "apprentice", html = "", visual = false }) {
    const options = [answer, ...wrong];
    if (options.length !== 4 || new Set(options).size !== 4) throw new Error(`Opciones inválidas en ${id}`);
    questions.push({
      rawBaseId: id,
      courseId: "1eso",
      topicId: `1eso:${topic}`,
      topicIndex: topic === "numeros-enteros" ? 1 : topic === "cuerpos-geometricos" ? 8 : 9,
      subtopic,
      exerciseType: type,
      structureId: structure,
      sourceDocument: document,
      sourceReference: `p. ${page}, ${reference}`,
      source: `Material original · p. ${page}, ${reference}`,
      sourceKind: "teacher-material",
      difficulty: level === "master" ? "hard" : "easy",
      challengeLevel: level,
      practiceEligible: true,
      examEligible: false,
      requiresVisual: visual,
      solutionNeedsReview: false,
      text,
      ...(html ? { statementHtml: html } : {}),
      options,
      correct: 0,
      solution
    });
  }

  function scaledNumericOption(answer, factor) {
    const match = answer.match(/-?\d[\d.]*(?:,\d+)?/);
    if (!match) return "Unidad o valor distinto";
    const value = Number(match[0].replace(/\./g, "").replace(",", "."));
    const scaled = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 9 }).format(value * factor);
    return answer.replace(match[0], scaled);
  }

  function numericWrongs(answer) {
    return [10, 0.1, 2]
      .map((factor) => scaledNumericOption(answer, factor))
      .filter((option, index, all) => option !== answer && all.indexOf(option) === index)
      .slice(0, 3);
  }

  function contextModel(number, page, title, description, answer, wrong, solution, level = "apprentice") {
    add({
      id: `1eso-original-context-${String(number).padStart(2, "0")}`,
      page,
      reference: `ejercicio ${number}`,
      subtopic: "variables, tablas y expresión",
      type: "modelo-funcional-contextualizado",
      structure: `context-model-${String(number).padStart(2, "0")}`,
      text: `En cada caso, identifica la variable independiente (x), la variable dependiente (y), completa la tabla y propón la expresión matemática de la función. ${number}. ${title}: ${description}`,
      answer,
      wrong,
      solution,
      level
    });
  }

  contextModel(1, 1, "La Panadería", "Cada barra de pan cuesta 0,75 €. Completa el coste para 1, 2, 3, 4, 5 barras.",
    "x: barras; y: coste; 0,75, 1,50, 2,25, 3,00, 3,75; y=0,75x", ["x: coste; y: barras; 1, 2, 3, 4, 5; y=x+0,75", "x: barras; y: coste; 1,75, 2,75, 3,75, 4,75, 5,75; y=x+0,75", "x: barras; y: coste; 0,75, 3,00, 6,75, 12,00, 18,75; y=0,75x²"],
    "La cantidad de barras se elige y el coste depende de ella. Multiplicamos cada valor de x por 0,75. Resultado: y=0,75x.");
  contextModel(2, 1, "El Reparto", "Un mensajero cobra un fijo de 3 € por envío más 0,50 € por cada kilómetro recorrido. Calcula el precio para 2, 5, 10, 20 km.",
    "x: kilómetros; y: precio; 4, 5,50, 8, 13; y=3+0,50x", ["x: kilómetros; y: precio; 1, 2,50, 5, 10; y=0,50x", "x: precio; y: kilómetros; 4, 5,50, 8, 13; y=3x+0,50", "x: kilómetros; y: precio; 7, 16, 31, 61; y=3x+1"],
    "El precio incluye 3 € fijos y 0,50 € por kilómetro. Sustituyendo x=2,5,10,20 se obtiene 4; 5,50; 8; 13. Resultado: y=3+0,50x.");
  contextModel(3, 1, "El Alquiler de Bicis", "Una empresa cobra 2 € por hora de uso de una bicicleta. Calcula el precio para 1, 2, 3, 4 horas.",
    "x: horas; y: precio; 2, 4, 6, 8; y=2x", ["x: horas; y: precio; 3, 4, 5, 6; y=x+2", "x: precio; y: horas; 2, 4, 6, 8; y=x/2", "x: horas; y: precio; 2, 8, 18, 32; y=2x²"],
    "El precio depende de las horas y es 2 veces su número. Resultado: y=2x.");
  contextModel(4, 1, "La Hucha", "Lucas empieza con 10 € en su hucha y añade 2 € cada semana. Calcula el dinero que tendrá en las semanas 1, 2, 3, 4.",
    "x: semanas; y: dinero; 12, 14, 16, 18; y=10+2x", ["x: semanas; y: dinero; 2, 4, 6, 8; y=2x", "x: dinero; y: semanas; 12, 14, 16, 18; y=10x+2", "x: semanas; y: dinero; 11, 12, 13, 14; y=10+x"],
    "A los 10 € iniciales se suman 2 € por cada semana. Resultado: y=10+2x.");
  contextModel(5, 1, "Telefonía", "Una tarifa móvil cuesta 15 € al mes fijos más 0,10 € por cada gigabyte (GB) extra consumido. Tabla para 1, 2, 5, 10 GB extra.",
    "x: GB extra; y: coste; 15,10, 15,20, 15,50, 16; y=15+0,10x", ["x: GB extra; y: coste; 0,10, 0,20, 0,50, 1; y=0,10x", "x: coste; y: GB extra; 15,10, 15,20, 15,50, 16; y=15x+0,10", "x: GB extra; y: coste; 15, 30, 75, 150; y=15x"],
    "La cuota fija es 15 € y cada GB añade 0,10 €. Resultado: y=15+0,10x.");
  contextModel(6, 1, "Imprenta", "Imprimir una camiseta cuesta 5 € de base más 3 € por cada color utilizado en el diseño. Tabla para 1, 2, 3, 4 colores.",
    "x: colores; y: coste; 8, 11, 14, 17; y=5+3x", ["x: colores; y: coste; 3, 6, 9, 12; y=3x", "x: coste; y: colores; 8, 11, 14, 17; y=5x+3", "x: colores; y: coste; 6, 7, 8, 9; y=5+x"],
    "Sumamos a los 5 € de base 3 € por color. Resultado: y=5+3x.");
  contextModel(7, 1, "El Huerto Urbano", "Una planta de tomates mide 8 cm y crece a un ritmo constante de 1,5 cm por día. Tabla para los días 1, 2, 3, 4, 5.",
    "x: días; y: altura; 9,5, 11, 12,5, 14, 15,5; y=8+1,5x", ["x: días; y: altura; 1,5, 3, 4,5, 6, 7,5; y=1,5x", "x: altura; y: días; 9,5, 11, 12,5, 14, 15,5; y=8x+1,5", "x: días; y: altura; 9, 10, 11, 12, 13; y=8+x"],
    "La altura inicial es 8 cm y cada día aumenta 1,5 cm. Resultado: y=8+1,5x.");
  contextModel(8, 1, "El Depósito", "Un depósito de agua contiene 500 litros y se vacía a razón de 20 litros por minuto. Tabla para los minutos 1, 2, 5, 10.",
    "x: minutos; y: litros; 480, 460, 400, 300; y=500−20x", ["x: minutos; y: litros; 520, 540, 600, 700; y=500+20x", "x: litros; y: minutos; 480, 460, 400, 300; y=20x−500", "x: minutos; y: litros; 20, 40, 100, 200; y=20x"],
    "Parte de 500 L y pierde 20 L cada minuto. Resultado: y=500−20x.");
  contextModel(9, 1, "Viaje en Coche", "Un coche circula por la autopista a una velocidad constante de 120 km/h. Tabla de la distancia recorrida en 1, 2, 3, 4 horas.",
    "x: horas; y: distancia; 120, 240, 360, 480; y=120x", ["x: horas; y: distancia; 121, 122, 123, 124; y=120+x", "x: distancia; y: horas; 120, 240, 360, 480; y=x/120", "x: horas; y: distancia; 120, 480, 1.080, 1.920; y=120x²"],
    "La distancia es velocidad por tiempo. Resultado: y=120x.");
  contextModel(10, 1, "El Taxista", "El servicio de taxi cuesta 2,40 € por bajada de bandera más 1,10 € por cada kilómetro recorrido. Tabla para 1, 5, 10, 15 km.",
    "x: kilómetros; y: precio; 3,50, 7,90, 13,40, 18,90; y=2,40+1,10x", ["x: kilómetros; y: precio; 1,10, 5,50, 11, 16,50; y=1,10x", "x: precio; y: kilómetros; 3,50, 7,90, 13,40, 18,90; y=2,40x+1,10", "x: kilómetros; y: precio; 3,50, 11,50, 21,50, 31,50; y=2,40+2x"],
    "Sumamos la bajada de bandera y el coste por distancia. Resultado: y=2,40+1,10x.");
  contextModel(11, 1, "Carga de Batería", "Un móvil tiene el 15% de batería y se carga un 2% por cada minuto conectado. Tabla para 5, 10, 20, 30 minutos.",
    "x: minutos; y: batería; 25%, 35%, 55%, 75%; y=15+2x", ["x: minutos; y: batería; 10%, 20%, 40%, 60%; y=2x", "x: batería; y: minutos; 25%, 35%, 55%, 75%; y=15x+2", "x: minutos; y: batería; 17%, 19%, 23%, 27%; y=15+2"],
    "Al 15% inicial se añaden 2 puntos porcentuales por minuto. Resultado: y=15+2x.");
  contextModel(12, 1, "El Kilo de Manzanas", "En la frutería, las manzanas cuestan 1,80 €/kg. Tabla de precios para 0,5, 1, 1,5, 2, 3 kg.",
    "x: kilogramos; y: precio; 0,90, 1,80, 2,70, 3,60, 5,40; y=1,80x", ["x: kilogramos; y: precio; 2,30, 2,80, 3,30, 3,80, 4,80; y=x+1,80", "x: precio; y: kilogramos; 0,90, 1,80, 2,70, 3,60, 5,40; y=x/1,80", "x: kilogramos; y: precio; 0,45, 1,80, 4,05, 7,20, 16,20; y=1,80x²"],
    "Multiplicamos los kilogramos por 1,80 €/kg. Resultado: y=1,80x.");
  contextModel(13, 1, "El Gimnasio", "La matrícula del gimnasio cuesta 30 € (pago único) y la mensualidad es de 25 €. Tabla del coste total tras 1, 2, 3, 6 meses.",
    "x: meses; y: coste; 55, 80, 105, 180; y=30+25x", ["x: meses; y: coste; 25, 50, 75, 150; y=25x", "x: coste; y: meses; 55, 80, 105, 180; y=30x+25", "x: meses; y: coste; 31, 32, 33, 36; y=30+x"],
    "El coste total suma 30 € de matrícula y 25 € por mes. Resultado: y=30+25x.");
  contextModel(14, 1, "Excursión escolar", "Un autobús cuesta 200 € en total a repartir a partes iguales entre los alumnos que vayan. Tabla si van 10, 20, 25, 40 alumnos.",
    "x: alumnos; y: coste por alumno; 20, 10, 8, 5; y=200/x", ["x: alumnos; y: coste por alumno; 2.000, 4.000, 5.000, 8.000; y=200x", "x: coste; y: alumnos; 20, 10, 8, 5; y=x/200", "x: alumnos; y: coste por alumno; 210, 220, 225, 240; y=200+x"],
    "El total fijo se divide entre el número de alumnos. Resultado: y=200/x.", "master");
  contextModel(15, 1, "El Congelador", "Al encender un congelador, la temperatura baja 3 °C cada hora. Si partía de 18 °C, haz la tabla para las primeras 6 horas.",
    "x: horas; y: temperatura; 15, 12, 9, 6, 3, 0; y=18−3x", ["x: horas; y: temperatura; 21, 24, 27, 30, 33, 36; y=18+3x", "x: temperatura; y: horas; 15, 12, 9, 6, 3, 0; y=3x−18", "x: horas; y: temperatura; 17, 16, 15, 14, 13, 12; y=18−x"],
    "La temperatura inicial es 18 °C y disminuye 3 °C por hora. Resultado: y=18−3x.");

  function contextChoice(number, page, text, answer, wrong, solution, level = "apprentice", suffix = "") {
    add({ id: `1eso-original-context-${String(number).padStart(2, "0")}${suffix}`, page, reference: `ejercicio ${number}${suffix ? `, apartado ${suffix.slice(1)}` : ""}`, subtopic: "interpretación y modelos", type: "interpretacion-funcional", structure: `context-interpret-${number}${suffix}`, text: `${number}. ${text}`, answer, wrong, solution, level });
  }
  contextChoice(16, 2, "Fiebre Médica: Una gráfica muestra la temperatura de un paciente ingresado en función de las horas del día. El eje X va de 0:00 a 24:00, el eje Y de 36 °C a 41 °C. ¿Qué significa un tramo horizontal en esta gráfica?", "La temperatura permanece constante durante ese intervalo", ["La temperatura aumenta a velocidad constante", "El tiempo se detiene", "La temperatura baja hasta 0 °C"], "En un tramo horizontal cambia el tiempo, pero la coordenada vertical no cambia. Resultado: la temperatura permanece constante.");
  contextChoice(17, 2, "Senderismo: Representamos la altitud (m) de un montañero según las horas de caminata. Si la gráfica empieza en (0, 400), sube hasta (3, 1200), se mantiene hasta (4, 1200) y baja hasta (6, 400). a) ¿A qué altura empezó la ruta?", "400 m", ["0 m", "1.200 m", "3 m"], "El punto inicial es (0,400): a tiempo 0 le corresponde una altitud de 400 m. Resultado: 400 m.", "apprentice", "-a");
  contextChoice(17, 2, "Senderismo: Representamos la altitud (m) de un montañero según las horas de caminata. Si la gráfica empieza en (0, 400), sube hasta (3, 1200), se mantiene hasta (4, 1200) y baja hasta (6, 400). b) ¿Cuánto tiempo estuvo descansando en la cima?", "1 hora", ["3 horas", "4 horas", "7 horas"], "La altitud se mantiene entre las horas 3 y 4. Duración: 4−3=1 hora.", "apprentice", "-b");
  contextChoice(18, 2, "El Paseo del Perro: Alba sale a pasear a su perro. La gráfica mide la distancia a su casa en metros respecto al tiempo en minutos. Explica qué significa que la gráfica vuelva a tocar el eje X (y=0).", "Alba ha regresado a su casa", ["Alba está a la máxima distancia de su casa", "Alba permanece parada lejos de casa", "Han transcurrido 0 minutos"], "El eje X corresponde a distancia y=0. Una distancia de 0 m a su casa significa que ha regresado.");
  contextChoice(19, 2, "Ventas del Año: Una tienda de ropa analiza sus ventas mensuales. En enero las ventas son altas, bajan drásticamente en marzo, suben al máximo en julio (rebajas) y caen en septiembre. Identifica los meses donde se sitúan los máximos y mínimos relativos.", "Máximo en julio; mínimos en marzo y septiembre", ["Máximo en enero; mínimo en julio", "Máximo en marzo; mínimos en enero y julio", "Máximo en septiembre; mínimo en enero"], "Julio se describe como el máximo. Las caídas señaladas sitúan mínimos relativos en marzo y septiembre.");
  contextChoice(20, 2, "Llenado de una Piscina: Una piscina se llena con una manguera. A las 2 horas tiene 4 m³ de agua y a las 5 horas tiene 10 m³. Si la relación es lineal, ¿cuánta agua entra por hora?", "2 m³ por hora", ["3 m³ por hora", "6 m³ por hora", "14 m³ por hora"], "La tasa es la pendiente: (10−4)/(5−2)=6/3=2. Resultado: 2 m³ por hora.");
  contextChoice(22, 2, "Gráfica de Temperatura: A las 6:00 la temperatura es −2 °C, a las 14:00 es 12 °C y a las 22:00 es 3 °C. Indica las coordenadas de estos tres puntos e identifica en qué cuadrantes se encuentran.", "(6,−2), cuarto; (14,12), primero; (22,3), primero", ["(−2,6), segundo; (12,14), primero; (3,22), primero", "(6,−2), segundo; (14,12), primero; (22,3), primero", "(6,2), primero; (14,−12), cuarto; (22,−3), cuarto"], "El tiempo es x y la temperatura es y. Un punto (+,−) está en el cuarto cuadrante y un punto (+,+), en el primero.");
  contextChoice(23, 2, "El Repartidor: La gráfica muestra la distancia de un coche de reparto a la central. Si vemos un tramo completamente plano (horizontal) que dura 45 minutos, ¿qué actividad estaba realizando el repartidor en ese tiempo?", "Permanecía detenido a la misma distancia de la central", ["Se acercaba a velocidad constante", "Se alejaba a velocidad constante", "Regresó instantáneamente a la central"], "Un tramo horizontal mantiene constante la distancia. Resultado: el repartidor estaba detenido.");
  contextChoice(24, 2, "El Cine: El precio de la entrada de cine disminuye según el número de personas que compran en un pack de grupo. Si para 1 persona vale 8 €, para 2 vale 14 € y para 3 vale 18 €: ¿Es una función de proporcionalidad directa? Razona la respuesta.", "No, porque los cocientes 8/1, 14/2 y 18/3 no son iguales", ["Sí, porque el precio total siempre aumenta", "Sí, porque todas las cantidades son positivas", "No, porque a cada número de personas le corresponden varios precios"], "En una proporcionalidad directa y/x debe ser constante. Los cocientes son 8, 7 y 6. No coinciden.");
  contextChoice(25, 2, "Crecimiento de un Bebé: Una gráfica relaciona la edad de un bebé en meses (de 0 a 12) con su peso en kilogramos. ¿Tiene sentido unir los puntos con una línea continua o deberíamos dejar los puntos aislados? Justifica si es una variable continua.", "Tiene sentido unirlos: edad y peso pueden tomar valores intermedios", ["Deben quedar aislados porque solo existen meses enteros", "Deben quedar aislados porque el peso siempre es entero", "No se pueden representar dos variables continuas"], "La edad y el peso varían de manera continua y pueden medirse entre dos meses enteros. Por ello tiene sentido unir los puntos.");
  contextChoice(26, 2, "Consumo de Gasoil: Un camión consume 12 litros por cada 100 km. Si el depósito tiene 60 litros: a) ¿Cuál es la variable independiente?", "La distancia recorrida, en kilómetros", ["Los litros que quedan", "La capacidad inicial del depósito", "El consumo de 12 litros"], "Se elige o mide la distancia recorrida; el combustible restante depende de ella.", "apprentice", "-a");
  contextChoice(26, 2, "Consumo de Gasoil: Un camión consume 12 litros por cada 100 km. Si el depósito tiene 60 litros: b) ¿En qué punto cortará la gráfica al eje X (combustible igual a cero)?", "(500,0)", ["(60,0)", "(100,0)", "(720,0)"], "Consume 0,12 L/km. Planteamos 60−0,12x=0, de donde x=500 km. Resultado: (500,0).", "master", "-b");
  contextChoice(28, 3, "La Marea: A las 2:00 está en su punto más bajo (0,5 m) y a las 8:00 en su punto más alto (4 m). Determina las coordenadas del mínimo y del máximo en ese intervalo.", "Mínimo (2,0,5) y máximo (8,4)", ["Mínimo (0,5,2) y máximo (4,8)", "Mínimo (2,4) y máximo (8,0,5)", "Mínimo (0,0,5) y máximo (6,4)"], "La hora es la coordenada x y la altura, la coordenada y. Resultado: mínimo (2,0,5) y máximo (8,4).");
  contextChoice(29, 3, "Copistería: Una fotocopia cuesta 0,05 €. Si hacemos más de 100 fotocopias, el precio de cada una baja a 0,04 €. Explica razonadamente si esta función es continua o si experimenta un salto.", "Experimenta un salto al cambiar la tarifa después de 100 copias", ["Es continua porque ambas tarifas son positivas", "Es constante para cualquier número de copias", "Es de proporcionalidad directa con constante 0,05 en todo el dominio"], "El precio total cambia de regla: hasta 100 es 0,05x y después pasa a 0,04x. Al cambiar la tarifa se produce un salto.", "master");

  function formulaContext(number, page, text, answer, wrong, solution, level = "apprentice") {
    add({ id: `1eso-original-context-${number}`, page, reference: `ejercicio ${number}`, subtopic: "expresión analítica", type: "formula-desde-contexto", structure: `context-formula-${number}`, text: `${number}. ${text}`, answer, wrong, solution, level });
  }
  formulaContext(31, 3, "El Huerto de Fresas: El número de fresas recogidas es el triple de los días transcurridos desde que empezó la cosecha. Obtén y=f(x) y dibuja su gráfica para valores de x entre 0 y 5.", "y=3x", ["y=x+3", "y=x/3", "y=3−x"], "Cada día corresponde a 3 fresas: y=3x. Para representarla pueden usarse (0,0), (1,3) y (2,6).");
  formulaContext(32, 3, "Empresa de Mudanzas: El precio total es un coste fijo de 40 € más 5 € por cada caja transportada. Obtén y=f(x) y dibuja su gráfica para valores de x entre 0 y 5.", "y=40+5x", ["y=40x+5", "y=5x", "y=45x"], "El coste fijo es la ordenada en el origen y cada caja añade 5 €. Resultado: y=40+5x.");
  formulaContext(33, 3, "Tarifa Eléctrica Ecológica: El coste diario es de 1 € fijo por mantenimiento más 0,20 € por cada kilovatio-hora consumido. Obtén y=f(x) y dibuja su gráfica para valores de x entre 0 y 5.", "y=1+0,20x", ["y=1,20x", "y=0,20+x", "y=0,20x"], "Sumamos el euro fijo y 0,20 € por cada kWh. Resultado: y=1+0,20x.");
  formulaContext(34, 3, "Envasado de Naranjas: Cada caja vacía pesa 200 g y cada naranja pesa 150 g. Expresa el peso total de la caja en función de las naranjas introducidas y dibuja la gráfica para x entre 0 y 5.", "y=200+150x", ["y=350x", "y=200x+150", "y=150x"], "El peso total es el peso fijo de la caja más 150 g por naranja. Resultado: y=200+150x.");
  formulaContext(35, 3, "Descarga de Datos: Un videojuego de 60 GB se descarga a 2 GB por minuto. Escribe la función de los gigabytes que faltan según los minutos y dibuja la gráfica para x entre 0 y 5.", "y=60−2x", ["y=60+2x", "y=2x", "y=30−x"], "Al principio faltan 60 GB y cada minuto quedan 2 GB menos. Resultado: y=60−2x.");
  formulaContext(36, 3, "El Sueldo del Comercial: Un vendedor cobra 1.200 € al mes más 300 € por cada coche vendido. Obtén la función y dibuja su gráfica para x entre 0 y 5.", "y=1200+300x", ["y=1500x", "y=1200x+300", "y=300x"], "El sueldo base es fijo y cada venta añade 300 €. Resultado: y=1200+300x.");
  formulaContext(37, 3, "El Perímetro del Cuadrado: Expresa el perímetro en centímetros en función de la longitud x de su lado y dibuja la gráfica para x entre 0 y 5.", "y=4x", ["y=x²", "y=2x", "y=x+4"], "Un cuadrado tiene cuatro lados iguales. Resultado: y=4x.");
  formulaContext(38, 3, "Cambio de Divisas: 1 euro equivale aproximadamente a 1,10 dólares. Escribe la función de conversión de euros x a dólares y y dibuja su gráfica para x entre 0 y 5.", "y=1,10x", ["y=x+1,10", "y=x/1,10", "y=1,10+x"], "Multiplicamos los euros por 1,10. Resultado: y=1,10x.");
  formulaContext(39, 4, "Tarjeta de Autobús: Una tarjeta tiene 20 € y cada viaje descuenta 1,25 €. Expresa el saldo restante en función de los viajes y dibuja la gráfica para x entre 0 y 5.", "y=20−1,25x", ["y=20+1,25x", "y=1,25x", "y=20−x"], "El saldo inicial es 20 € y disminuye 1,25 € por viaje. Resultado: y=20−1,25x.");
  formulaContext(40, 4, "Globos de Helio: Un globo parte del suelo y asciende a 3 m/s. Expresa su altura según los segundos y dibuja la gráfica para x entre 0 y 5.", "y=3x", ["y=x+3", "y=3−x", "y=x/3"], "Parte de altura 0 y gana 3 m cada segundo. Resultado: y=3x.");
  formulaContext(41, 4, "Fabricación de Calzado: Una máquina fabrica 12 pares de zapatos cada hora. Escribe la función de la producción total de pares según las horas y dibuja la gráfica para x entre 0 y 5.", "y=12x", ["y=x+12", "y=12+x", "y=x/12"], "En x horas produce 12 veces x pares. Resultado: y=12x.");
  formulaContext(42, 4, "Reparto de Pizza: Un repartidor gana 8 € fijos por noche más 1,50 € por pedido entregado. Obtén la función y dibuja su gráfica para x entre 0 y 5.", "y=8+1,50x", ["y=9,50x", "y=8x+1,50", "y=1,50x"], "Sumamos los 8 € fijos y 1,50 € por pedido. Resultado: y=8+1,50x.");
  formulaContext(43, 4, "El Aparcamiento: Cobra 1,20 € por la primera hora y 0,80 € por cada una de las horas siguientes. Escribe la expresión para las horas x posteriores a la primera.", "y=1,20+0,80x", ["y=1,20x+0,80", "y=0,80x", "y=2x"], "La primera hora ya aporta 1,20 € y cada hora posterior añade 0,80 €. Resultado: y=1,20+0,80x.");
  formulaContext(44, 4, "Descuento de Temporada: Una tienda aplica un descuento del 20%. Escribe la función que relaciona el precio original x con el precio final y.", "y=0,80x", ["y=0,20x", "y=x−20", "y=1,20x"], "Se paga el 100%−20%=80% del precio. Resultado: y=0,80x.");
  formulaContext(45, 4, "Plantación de Árboles: Un grupo planta 5 árboles cada media hora. Expresa el número de árboles plantados en función de las horas transcurridas.", "y=10x", ["y=5x", "y=x/10", "y=5+0,5x"], "En una hora hay dos medias horas: 2·5=10 árboles por hora. Resultado: y=10x.");

  contextChoice(46, 4, "El Dilema del Streaming: Tarifa A: 0 € fijos y 1,50 € por película. Tarifa B: 6 € fijos y 0,50 € por película. Escribe ambas funciones y determina a partir de cuántas películas conviene la Tarifa B.", "A(x)=1,50x; B(x)=6+0,50x; B conviene desde 7 películas", ["A(x)=1,50+x; B(x)=6x+0,50; B conviene desde 6", "A(x)=0,50x; B(x)=6+1,50x; B conviene siempre", "A(x)=1,50x; B(x)=6+0,50x; B conviene desde 5 películas"], "Igualamos 1,50x=6+0,50x: x=6. En 6 cuestan igual; B es más barata cuando x>6, es decir, desde 7 películas.", "master");
  contextChoice(47, 4, "El Experimento de Ciencias: Un líquido está a 10 °C y sube 5 °C por minuto hasta alcanzar 100 °C, momento en que se estabiliza. a) ¿Cuánto tarda en empezar a hervir?", "18 minutos", ["10 minutos", "20 minutos", "22 minutos"], "Debe subir 100−10=90 °C. A 5 °C por minuto: 90/5=18. Resultado: 18 minutos.", "master", "-a");
  contextChoice(47, 4, "El Experimento de Ciencias: Un líquido está a 10 °C y sube 5 °C por minuto hasta 100 °C, donde se estabiliza. b) ¿Qué descripción corresponde a la gráfica entre 0 y 25 minutos?", "T=10+5t hasta t=18 y T=100 desde t=18 hasta t=25", ["T=5t hasta t=20 y después T=100", "T=100−5t durante todo el intervalo", "T=10+5t durante los 25 minutos, sin estabilizarse"], "La recta creciente alcanza 100 cuando 10+5t=100, t=18. Desde entonces la gráfica es horizontal en 100 °C.", "master", "-b");
  contextChoice(48, 4, "El Autónomo: Un fontanero cobra 25 € de desplazamiento y 18 €/h. Otro cobra 15 € y 20 €/h. a) Si la reparación dura 5 horas, ¿cuál es más económico?", "Cuestan lo mismo: 115 €", ["El primero: 90 €", "El segundo: 100 €", "El primero: 105 €"], "Primero: 25+18·5=115. Segundo: 15+20·5=115. Resultado: cuestan lo mismo.", "master", "-a");
  contextChoice(48, 5, "El Autónomo: Un fontanero cobra 25 € de desplazamiento y 18 €/h. Otro cobra 15 € y 20 €/h. b) Halla el punto en que ambos cobran lo mismo.", "(5,115)", ["(10,205)", "(5,100)", "(2,61)"], "Igualamos 25+18x=15+20x. Entonces 10=2x y x=5. El coste es 115 €. Resultado: (5,115).", "master", "-b");
  contextChoice(49, 5, "Autonomía Eléctrica: Un patinete tiene 30 km de autonomía y cada ida y vuelta al colegio recorre 9 km. a) Escribe la función de la autonomía restante según los días sin recargar.", "y=30−9x", ["y=30−4,5x", "y=30+9x", "y=9x"], "Cada día se recorren 2·4,5=9 km. La autonomía parte de 30 y disminuye 9 por día. Resultado: y=30−9x.", "master", "-a");
  contextChoice(49, 5, "Autonomía Eléctrica: Un patinete tiene 30 km de autonomía y cada ida y vuelta al colegio recorre 9 km. b) ¿Cuántos días completos puede ir y volver antes de quedarse sin batería?", "3 días completos", ["2 días completos", "4 días completos", "6 días completos"], "30/9=3,33… Solo puede completar 3 días; después habrá recorrido 27 km. Resultado: 3 días.", "master", "-b");
  contextChoice(50, 5, "Fabricación de Velas: Hay un gasto fijo de 50 € y cada vela cuesta 1,20 € de material. a) Escribe la función de costes totales.", "C(x)=50+1,20x", ["C(x)=51,20x", "C(x)=50x+1,20", "C(x)=1,20x"], "El coste total suma 50 € fijos y 1,20 € por vela. Resultado: C(x)=50+1,20x.", "master", "-a");
  contextChoice(50, 5, "Fabricación de Velas: Cada vela se vende por 4 €. b) Escribe la función de ingresos totales.", "I(x)=4x", ["I(x)=50+4x", "I(x)=4+x", "I(x)=x/4"], "Los ingresos son precio por cantidad. Resultado: I(x)=4x.", "master", "-b");
  contextChoice(50, 5, "Fabricación de Velas: Costes C(x)=50+1,20x e ingresos I(x)=4x. c) ¿Cuántas velas debe vender como mínimo para obtener beneficios netos?", "18 velas", ["17 velas", "13 velas", "42 velas"], "Exigimos 4x>50+1,20x. Entonces 2,80x>50 y x>17,857… El primer entero válido es 18.", "master", "-c");

  // Los ejercicios 21, 27 y 30 del documento contextualizado exigen producir un dibujo
  // cualitativo como respuesta. Se mantienen fuera hasta disponer de una respuesta gráfica
  // evaluable que conserve literalmente la tarea, y quedan registrados en la auditoría.

  function slopeQuestion(exercise, part, page, answer, image = "") {
    const visual = Boolean(image);
    const wrong = ["0", "1", "−1", "2", "−2", "1/2", "−1/2", "1/3", "−1/3", "2/3", "−2/3", "3/2", "−3/2", "4/5", "−4/5", "5/4", "−5/4"].filter((value) => value !== answer).slice(0, 3);
    add({
      id: `1eso-original-linear-${exercise}${part}-review2`, page,
      reference: `ejercicio ${exercise}.${part}`, document: LINEAR,
      subtopic: "pendiente", type: visual ? "pendiente-desde-grafica" : "pendiente-desde-ecuacion",
      structure: `linear-slope-${exercise}${part}`,
      text: `Indica cuál es la pendiente de la recta del apartado ${part}) del ejercicio ${exercise}.`,
      answer, wrong,
      solution: visual
        ? `Elegimos dos puntos de la cuadrícula y calculamos m=(cambio vertical)/(cambio horizontal). Resultado: m=${answer}.`
        : `Despejamos y y la escribimos como y=mx+n. El coeficiente de x es la pendiente. Resultado: m=${answer}.`,
      html: visual ? `<p>Indica cuál es la pendiente de la recta del apartado ${part}).</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/${image}" alt="Gráficas originales de los apartados a y b del ejercicio ${exercise}">` : "",
      visual,
      level: visual ? "master" : "apprentice"
    });
  }
  slopeQuestion(11, "a", 3, "2/3", "funciones-lineal-ej11-graficas.png");
  slopeQuestion(11, "b", 3, "−1/3", "funciones-lineal-ej11-graficas.png");
  slopeQuestion(12, "a", 3, "−1", "funciones-lineal-ej12-graficas.png");
  slopeQuestion(12, "b", 3, "1/3", "funciones-lineal-ej12-graficas.png");
  slopeQuestion(12, "c", 3, "−3/2");
  slopeQuestion(12, "d", 3, "−4/5");
  slopeQuestion(13, "a", 4, "−2", "funciones-lineal-ej13-graficas.png");
  slopeQuestion(13, "b", 4, "1/2", "funciones-lineal-ej13-graficas.png");
  slopeQuestion(13, "c", 4, "2/5");
  slopeQuestion(13, "d", 4, "−3/2");
  slopeQuestion(14, "a", 4, "2", "funciones-lineal-ej14-graficas.png");
  slopeQuestion(14, "b", 4, "1", "funciones-lineal-ej14-graficas.png");
  slopeQuestion(14, "c", 4, "−2");
  slopeQuestion(14, "d", 4, "−5/4");
  slopeQuestion(15, "a", 5, "1/2", "funciones-lineal-ej15-graficas.png");
  slopeQuestion(15, "b", 5, "−3", "funciones-lineal-ej15-graficas.png");
  slopeQuestion(15, "c", 5, "2");
  slopeQuestion(15, "d", 5, "−2/3");

  function linearChoice(id, page, reference, text, answer, wrong, solution, level = "master") {
    add({ id: `1eso-original-linear-${id}-review2`, page, reference, document: LINEAR, subtopic: "expresión analítica", type: "ecuacion-de-la-recta", structure: `linear-analytic-${id}`, text, answer, wrong, solution, level });
  }
  linearChoice("17a", 5, "ejercicio 17.a", "Obtén la ecuación de la recta que pasa por P(7,5) y Q(2,−3).", "y=(8/5)x−31/5", ["y=(5/8)x+5/8", "y=(8/5)x+31/5", "y=−(8/5)x+31/5"], "m=(5−(−3))/(7−2)=8/5. Con P: 5=(8/5)·7+n, de donde n=−31/5. Resultado: y=(8/5)x−31/5.");
  linearChoice("17b", 5, "ejercicio 17.b", "Obtén la ecuación de la recta paralela a y=5x que pasa por A(0,6).", "y=5x+6", ["y=−5x+6", "y=5x", "y=6x+5"], "Una paralela tiene pendiente 5. Como pasa por (0,6), su ordenada en el origen es 6. Resultado: y=5x+6.");
  linearChoice("18a", 5, "ejercicio 18.a", "Halla la ecuación de la recta que pasa por A(15,10) y B(8,−6).", "y=(16/7)x−170/7", ["y=(7/16)x+55/16", "y=−(16/7)x+170/7", "y=(16/7)x+170/7"], "m=(10−(−6))/(15−8)=16/7. Sustituyendo A se obtiene n=−170/7. Resultado: y=(16/7)x−170/7.");
  linearChoice("20b", 6, "ejercicio 20.b", "Halla la ecuación de la recta que pasa por M(4,5) y N(2,−3).", "y=4x−11", ["y=−4x+21", "y=2x−3", "y=4x+11"], "m=(5−(−3))/(4−2)=4. Con M: 5=16+n, luego n=−11. Resultado: y=4x−11.");
  linearChoice("21a", 6, "ejercicio 21.a", "Tres kilos de peras cuestan 4,5 € y siete kilos costarían 10,5 €. Encuentra la ecuación que da el precio total y en función de los kilos x.", "y=1,5x", ["y=4,5x", "y=1,5x+3", "y=x+1,5"], "El precio por kilogramo es 4,5/3=1,5 y también 10,5/7=1,5. Resultado: y=1,5x.", "apprentice");
  linearChoice("22a", 6, "ejercicio 22.a", "Ana paga 3,6 € por 3 dólares y Álvaro 8,4 € por 7 dólares. Halla la ecuación que da el precio en euros y de x dólares.", "y=1,2x", ["y=3,6x", "y=1,2x+3", "y=x/1,2"], "3,6/3=1,2 y 8,4/7=1,2 euros por dólar. Resultado: y=1,2x.", "apprentice");
  linearChoice("22c", 6, "ejercicio 22.c", "Con la relación 3 dólares=3,6 € y 7 dólares=8,4 €, ¿cuánto habríamos pagado por 15 dólares?", "18 €", ["12,5 €", "15 €", "22,5 €"], "El cambio es 1,2 €/dólar. Para 15 dólares: 1,2·15=18 €. Resultado: 18 €.", "apprentice");
  linearChoice("23a", 6, "ejercicio 23.a", "Un técnico cobra 25 € por la visita más 20 € por cada hora. Escribe la ecuación del pago total y en función del tiempo x.", "y=20x+25", ["y=25x+20", "y=45x", "y=20x"], "La visita aporta 25 € fijos y cada hora 20 €. Resultado: y=20x+25.", "apprentice");
  linearChoice("24a", 6, "ejercicio 24.a", "Rocío sale en bici desde una plaza situada a 6 m de su casa y avanza a 3 m/s. Halla la ecuación de su distancia y a casa tras x segundos.", "y=3x+6", ["y=6x+3", "y=3x", "y=6−3x"], "Parte a 6 m y aumenta su distancia 3 m cada segundo. Resultado: y=3x+6.", "apprentice");
  linearChoice("25a", 7, "ejercicio 25.a", "Sabiendo que 0 °C=32 °F y 10 °C=50 °F, halla la ecuación de conversión y representa la recta.", "y=(9/5)x+32; pasa por (0,32) y (10,50)", ["y=(5/9)x+32; pasa por (0,32) y (10,37,6)", "y=(9/5)x; pasa por el origen", "y=18x+32; pasa por (10,212)"], "La pendiente es (50−32)/(10−0)=18/10=9/5. La ordenada es 32. Resultado: y=(9/5)x+32; los dos puntos dados permiten representarla.");
  linearChoice("25b", 7, "ejercicio 25.b", "Con la relación 0 °C=32 °F y 10 °C=50 °F, ¿cuántos grados Fahrenheit son 20 °C?", "68 °F", ["52 °F", "64 °F", "72 °F"], "Usamos y=(9/5)x+32. Para x=20: y=36+32=68. Resultado: 68 °F.", "apprentice");

  add({ id: "1eso-original-functions-ii-03-wait-review2", page: 2, reference: "ejercicio 3, caracol verde", document: FUNCTIONS_II, subtopic: "interpretación de gráficas", type: "tramos-horizontales", structure: "snail-green-stops", text: "El caracol verde tarda en salir y se para antes de llegar. ¿Cuánto tiempo está parado en cada caso? ¿A qué distancia de la meta se para definitivamente?", answer: "3 min al principio; después queda parado a 20 cm de la meta", wrong: ["1 min al principio; termina en la meta", "5 min al principio; queda a 80 cm de la meta", "3 min al principio; queda a 10 cm de la meta"], solution: "La línea verde es horizontal desde 0 hasta 3 min. Después avanza hasta 80 cm y vuelve a ser horizontal. Si la meta está en 100 cm, queda a 100−80=20 cm.", html: `<p>El caracol verde tarda en salir y se para antes de llegar. ¿Cuánto tiempo está parado en cada caso? ¿A qué distancia de la meta se para definitivamente?</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-ej3-carrera-caracoles.png" alt="Gráfica original distancia-tiempo de los dos caracoles">`, visual: true, level: "master" });
  add({ id: "1eso-original-functions-ii-03-red-review2", page: 2, reference: "ejercicio 3, caracol rojo", document: FUNCTIONS_II, subtopic: "interpretación de gráficas", type: "retroceso-en-grafica", structure: "snail-red-backwards-distance-time", text: "¿Cuántos centímetros y durante cuánto tiempo marcha el caracol rojo en dirección contraria?", answer: "15 cm durante 1 minuto", wrong: ["10 cm durante 2 minutos", "20 cm durante 1 minuto", "15 cm durante 2 minutos"], solution: "El tramo rojo descendente va de 45 cm a 30 cm: retrocede 15 cm. En el eje temporal va de 4,5 a 5,5 min: dura 1 min.", html: `<p>¿Cuántos centímetros y durante cuánto tiempo marcha el caracol rojo en dirección contraria?</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-ej3-carrera-caracoles.png" alt="Gráfica original distancia-tiempo de los dos caracoles">`, visual: true, level: "master" });

  function bookChoice(id, page, reference, subtopic, type, text, answer, wrong, solution, level = "apprentice", html = "", visual = false) {
    add({ id: `1eso-original-functions-book-${id}-review2`, page, reference, document: FUNCTIONS_BOOK, subtopic, type, structure: `book-${id}`, text, answer, wrong, solution, level, html, visual });
  }
  const quadrantCases = [
    ["04a", "(−3,−4)", "tercer cuadrante"], ["04b", "(5,2)", "primer cuadrante"],
    ["04c", "(2,−2)", "cuarto cuadrante"], ["04d", "(−1,−4)", "tercer cuadrante"],
    ["04e", "(−2,5)", "segundo cuadrante"], ["04f", "(3,−3)", "cuarto cuadrante"],
    ["04g", "(−1,7)", "segundo cuadrante"]
  ];
  quadrantCases.forEach(([id, point, answer]) => bookChoice(id, 3, "ejercicio 4", "coordenadas", "identificar-cuadrante", `Indica en qué cuadrante está situado el punto ${point}.`, answer, ["primer cuadrante", "segundo cuadrante", "tercer cuadrante", "cuarto cuadrante"].filter((value) => value !== answer), `Observamos el signo de x y de y. Resultado: ${answer}.`));
  bookChoice("05a", 4, "ejercicio 5.a", "coordenadas", "cuadrantes-de-varios-puntos", "Dados A(4,−1), B(3,4), C(−3,2) y D(−2,−3), determina el cuadrante de cada punto.", "A: IV; B: I; C: II; D: III", ["A: I; B: IV; C: III; D: II", "A: IV; B: II; C: I; D: III", "A: III; B: I; C: II; D: IV"], "Aplicamos los signos: (+,−) IV; (+,+) I; (−,+) II; (−,−) III.");
  bookChoice("05c", 4, "ejercicio 5.c", "coordenadas", "figura-al-unir-puntos", "Dados A(4,−1), B(3,4), C(−3,2) y D(−2,−3), únelos alfabéticamente y une D con A. ¿Qué figura obtienes?", "Un paralelogramo", ["Un triángulo", "Un cuadrado", "Un trapecio"], "Los vectores AB=(−1,5) y DC=(−1,5), mientras BC=(−6,−2) y AD=(−6,−2). Los lados opuestos son paralelos e iguales: es un paralelogramo.", "master");
  const coordinateCases = [["06b", "B", "(2,0)"], ["06c", "C", "(0,3)"], ["06d", "D", "(−2,2)"], ["06e", "E", "(−3,0)"], ["06f", "F", "(−1,−2)"], ["06g", "G", "(0,−4)"], ["06h", "H", "(3,−2)"]];
  coordinateCases.forEach(([id, label, answer]) => bookChoice(`coord-${id}`, 4, `ejercicio 6, punto ${label}`, "coordenadas", "leer-coordenadas", `Escribe las coordenadas del punto ${label} señalado en el sistema de ejes.`, `${label}${answer}`, [`${label}(0,0)`, `${label}(1,1)`, `${label}(−1,−1)`].filter((value) => value !== `${label}${answer}`).slice(0,3), `Leemos primero el desplazamiento horizontal x y después el vertical y. Resultado: ${label}${answer}.`, "apprentice", `<p>Escribe las coordenadas del punto ${label}.</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-libro-ej6-coordenadas.png" alt="Sistema de ejes original con los puntos A a H">`, true));
  bookChoice("table-01", 5, "ejercicio 1", "tablas", "pares-a-tabla", "Escribe los pares (4,6), (2,0), (1,9), (5,5), (0,1), (9,4) en una tabla vertical y otra horizontal.", "Fila x: 4,2,1,5,0,9; fila y: 6,0,9,5,1,4", ["Fila x: 6,0,9,5,1,4; fila y: 4,2,1,5,0,9", "Fila x: 4,6,2,0,1,9; fila y: 5,5,0,1,9,4", "Fila x: 4,2,1,5,0,9; fila y: 4,1,8,0,1,5"], "En cada par, la primera coordenada va en la fila x y la segunda en la fila y.");
  const pairTables = [
    ["02a", "(0,3), (2,2), (−3,8), (5,6), (4,−1)"],
    ["02b", "(1,3), (5,1), (2,−2), (8,4), (−1,−6)"],
    ["02c", "(8,3), (4,2), (0,1), (−1,0), (3,−3), (5,2)"],
    ["02d", "(7,2), (5,−9), (−6,1), (3,−7), (2,1), (−2,−5)"]
  ];
  pairTables.forEach(([id, answer]) => bookChoice(id, 5, `ejercicio 2.${id.slice(-1)}`, "tablas", "tabla-a-pares", "Forma los pares de valores que corresponden a la tabla del apartado indicado.", answer, [answer.replace(/\(([^,]+),([^\)]+)\)/g, "($2,$1)"), answer.replace(/−/g, ""), answer.split(", ").reverse().join(", ")], "Cada columna o fila de dos valores forma el par ordenado (x,y)."));
  bookChoice("table-03", 6, "ejercicio 3", "tablas y coordenadas", "pares-a-tabla-y-plano", "Representa en ejes los pares (2,4), (−1,−2), (−5,1), (3,3), (6,2), (−4,−3). Forma primero la tabla correspondiente.", "Fila x: 2,−1,−5,3,6,−4; fila y: 4,−2,1,3,2,−3", ["Fila x: 4,−2,1,3,2,−3; fila y: 2,−1,−5,3,6,−4", "Fila x: 2,1,5,3,6,4; fila y: 4,2,1,3,2,3", "Fila x: 2,−1,−5,3,6,−4; fila y: 2,−1,−5,3,6,−4"], "Se conserva el orden de cada par: primera coordenada en x y segunda en y.");
  bookChoice("table-04", 7, "ejercicio 4", "tablas y coordenadas", "tabla-a-puntos", "Representa en un sistema de ejes los pares de la tabla: x=−1,−2,3,6,2,4; y=3,−2,5,−1,4,0.", "(−1,3), (−2,−2), (3,5), (6,−1), (2,4), (4,0)", ["(3,−1), (−2,−2), (5,3), (−1,6), (4,2), (0,4)", "(−1,−3), (−2,2), (3,−5), (6,1), (2,−4), (4,0)", "(−1,3), (−2,−2), (3,5), (6,−1), (4,2), (0,4)"], "Emparejamos cada valor de la fila x con el que ocupa su misma columna en la fila y.");
  bookChoice("cinema-07a", 8, "ejercicio 7.a", "tablas", "tabla-proporcionalidad", "Una entrada de cine cuesta 5 €. ¿Cuánto cuestan 2, 4, 6, 8 y 10 entradas? Forma la tabla.", "10 €, 20 €, 30 €, 40 €, 50 €", ["7 €, 9 €, 11 €, 13 €, 15 €", "5 €, 10 €, 15 €, 20 €, 25 €", "20 €, 40 €, 60 €, 80 €, 100 €"], "Multiplicamos cada número de entradas por 5 €. Resultado: 10, 20, 30, 40 y 50 €.");
  bookChoice("temp-08a", 9, "ejercicio 8.a", "interpretación de gráficas", "identificar-magnitudes", "La gráfica representa la temperatura durante una semana de agosto. ¿Cuáles son las dos magnitudes?", "Día de la semana y temperatura en °C", ["Hora del día y temperatura en °F", "Mes del año y precipitaciones", "Día de la semana y velocidad"], "El eje horizontal contiene los días y el vertical la temperatura en grados Celsius.", "apprentice", `<p>¿Cuáles son las dos magnitudes?</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-libro-ej8-temperaturas.png" alt="Gráfica original de temperaturas semanales">`, true);
  bookChoice("temp-08b", 9, "ejercicio 8.b", "interpretación de gráficas", "grafica-a-tabla", "Forma la tabla de valores de la temperatura semanal mostrada.", "L 25, M 40, X 35, J 25, V 30, S 40, D 35", ["L 40, M 25, X 35, J 30, V 25, S 35, D 40", "L 25, M 35, X 40, J 25, V 35, S 30, D 40", "L 20, M 35, X 30, J 20, V 25, S 35, D 30"], "Leemos la altura de cada punto sobre el eje vertical y la asociamos con su día.", "master", `<p>Forma la tabla de valores.</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-libro-ej8-temperaturas.png" alt="Gráfica original de temperaturas semanales">`, true);
  bookChoice("temp-08c", 9, "ejercicio 8.c", "interpretación de gráficas", "maximo-grafica", "¿Qué días tuvieron la mayor temperatura de la semana?", "Martes y sábado", ["Lunes y jueves", "Miércoles y domingo", "Solo el viernes"], "Los puntos más altos corresponden a 40 °C y aparecen el martes y el sábado.", "apprentice", `<p>¿Qué días tuvieron la mayor temperatura?</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-libro-ej8-temperaturas.png" alt="Gráfica original de temperaturas semanales">`, true);
  bookChoice("temp-08d", 9, "ejercicio 8.d", "interpretación de gráficas", "minimo-grafica", "¿Qué días tuvieron la menor temperatura de la semana?", "Lunes y jueves", ["Martes y sábado", "Miércoles y domingo", "Solo el viernes"], "Los puntos más bajos corresponden a 25 °C y aparecen el lunes y el jueves.", "apprentice", `<p>¿Qué días tuvieron la menor temperatura?</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-libro-ej8-temperaturas.png" alt="Gráfica original de temperaturas semanales">`, true);
  bookChoice("turtle-09", 9, "ejercicio 9", "variables y tablas", "movimiento-proporcional", "Una tortuga avanza 10 cm cada minuto. Indica las magnitudes y forma la tabla para los 5 primeros minutos.", "x: minutos; y: distancia; 1→10, 2→20, 3→30, 4→40, 5→50", ["x: distancia; y: minutos; 1→10, 2→20, 3→30, 4→40, 5→50", "x: minutos; y: distancia; 1→11, 2→12, 3→13, 4→14, 5→15", "x: minutos; y: distancia; 1→10, 2→40, 3→90, 4→160, 5→250"], "La distancia depende del tiempo y vale y=10x.");
  bookChoice("football-10c", 9, "ejercicio 10.c", "interpretación de tablas", "mejor-clasificacion", "La clasificación en las jornadas 1 a 10 fue 3,5,8,7,7,5,3,2,1,5. ¿En qué jornada ocupó el primer puesto?", "Jornada 9", ["Jornada 1", "Jornada 3", "Jornada 10"], "Buscamos el valor de clasificación 1. Aparece en la jornada 9.");
  bookChoice("football-10d", 9, "ejercicio 10.d", "interpretación de tablas", "peor-clasificacion", "La clasificación en las jornadas 1 a 10 fue 3,5,8,7,7,5,3,2,1,5. ¿En qué jornada obtuvo su peor clasificación?", "Jornada 3", ["Jornada 5", "Jornada 9", "Jornada 10"], "La peor posición es el número más alto, 8, alcanzado en la jornada 3.");
  bookChoice("football-10e", 9, "ejercicio 10.e", "interpretación de tablas", "tiempo-entre-extremos", "La peor clasificación fue en la jornada 3 y la mejor en la 9. ¿Cuántas jornadas transcurrieron entre ambas?", "6 jornadas", ["3 jornadas", "9 jornadas", "12 jornadas"], "Calculamos 9−3=6 jornadas.");
  bookChoice("kangaroo-01", 10, "ejercicio 1", "variables y gráficas", "tabla-a-grafica", "Un canguro avanza 3 m por salto. Representa (1,3), (2,6), (3,9), (4,12), (5,15), une los puntos y di qué obtienes.", "Puntos alineados en una recta creciente que pasa por el origen", ["Una recta decreciente", "Una curva que no pasa por el origen", "Una recta horizontal"], "Los pares cumplen y=3x; por tanto quedan alineados en una recta creciente que pasa por el origen.");
  bookChoice("pears-02", 10, "ejercicio 2", "variables y gráficas", "proporcionalidad-tabla-grafica", "En un mercado 2 kg de peras cuestan 1,50 €. ¿Cuánto cuestan 4, 6, 8 y 10 kg? Indica las variables y la relación.", "3 €, 4,50 €, 6 €, 7,50 €; y=0,75x", ["6 €, 9 €, 12 €, 15 €; y=1,50x", "5,50 €, 7,50 €, 9,50 €, 11,50 €; y=x+1,50", "2 €, 3 €, 4 €, 5 €; y=x/2"], "El precio por kg es 1,50/2=0,75 €. Multiplicamos por 4,6,8,10. Resultado: y=0,75x.");
  bookChoice("annual-03", 11, "ejercicio 3", "tablas y gráficas", "serie-temporal", "La tabla de temperaturas mensuales es 5,10,15,20,25,25,35,35,25,11,10,0. Identifica la variable independiente y la dependiente.", "Independiente: mes; dependiente: temperatura", ["Independiente: temperatura; dependiente: mes", "Ambas son independientes", "Independiente: año; dependiente: mes"], "El mes se fija y la temperatura observada depende de él.");
  bookChoice("annual-04a", 11, "ejercicio 4.a", "interpretación de tablas", "minimo-serie", "Según la tabla mensual 5,10,15,20,25,25,35,35,25,11,10,0, ¿qué mes tuvo la menor temperatura media?", "Diciembre", ["Enero", "Julio", "Octubre"], "El menor valor es 0 °C y corresponde a diciembre.");
  bookChoice("annual-04b", 11, "ejercicio 4.b", "interpretación de tablas", "maximo-serie", "Según la tabla mensual, ¿qué meses tuvieron la mayor temperatura media?", "Julio y agosto", ["Mayo y junio", "Enero y diciembre", "Septiembre y octubre"], "El máximo es 35 °C y aparece en julio y agosto.");
  bookChoice("annual-04c", 11, "ejercicio 4.c", "interpretación de tablas", "crecimiento-cualitativo", "¿Qué se observa en las temperaturas de enero a mayo: 5,10,15,20,25?", "Aumentan de forma constante 5 °C cada mes", ["Disminuyen 5 °C cada mes", "Permanecen constantes", "Aumentan cantidades distintas"], "Las diferencias consecutivas son todas +5 °C.");
  bookChoice("annual-04d", 11, "ejercicio 4.d", "interpretación de tablas", "decrecimiento-cualitativo", "¿Qué se observa de agosto a diciembre: 35,25,11,10,0?", "La temperatura desciende, aunque no siempre la misma cantidad", ["Aumenta de manera constante", "Permanece en 35 °C", "Alterna siempre subida y bajada"], "Todos los cambios son descensos, pero sus magnitudes son distintas.");
  bookChoice("formula-05", 12, "ejercicio 5", "tablas", "tabla-desde-formula", "Obtén la tabla de valores de y=2x+1 para x=0,1,2,3,4,5 y también para x=−1,−2,−3.", "1,3,5,7,9,11; −1,−3,−5", ["0,2,4,6,8,10; −2,−4,−6", "1,2,3,4,5,6; 0,−1,−2", "2,4,6,8,10,12; 0,−2,−4"], "Sustituimos cada x en 2x+1. Resultado: 1,3,5,7,9,11 y −1,−3,−5.");
  const formulaTables = [["06a", "y=x+1", "1,2,0,3,−1"], ["06b", "y=3x", "0,3,−3,6,−6"], ["06c", "y=x−1", "−1,0,−2,1,−3"], ["06d", "y=1−x", "1,0,2,−1,3"], ["06e", "y=2x−1", "−1,1,−3,3,−5"], ["06f", "y=2x+2", "2,4,0,6,−2"]];
  formulaTables.forEach(([id, formula, answer]) => bookChoice(id, 12, `ejercicio 6.${id.slice(-1)}`, "tablas", "tabla-desde-formula", `Obtén los valores de la función ${formula} para x=0,1,−1,2,−2.`, answer, [answer.split(",").reverse().join(","), answer.replace(/−/g, ""), "0,1,−1,2,−2"], `Sustituimos ordenadamente x=0,1,−1,2,−2 en ${formula}. Resultado: ${answer}.`));
  const graphFunctions = [["07a", "y=x+2", "(0,2), (1,3), (−1,1), (2,4), (−2,0)"], ["07b", "y=2x+3", "(0,3), (1,5), (−1,1), (2,7), (−2,−1)"], ["07c", "y=2x", "(0,0), (1,2), (−1,−2), (2,4), (−2,−4)"]];
  graphFunctions.forEach(([id, formula, answer]) => bookChoice(id, 13, `ejercicio 7.${id.slice(-1)}`, "representación de funciones", "tabla-y-grafica", `Obtén una tabla de valores y representa ${formula}. ¿Qué conjunto de puntos es correcto?`, answer, [answer.replace(/\(([^,]+),([^\)]+)\)/g, "($2,$1)"), answer.replace(/−/g, ""), "(0,0), (1,1), (−1,−1), (2,2), (−2,−2)"], `Sustituimos los valores de x en ${formula}. Los puntos correctos son ${answer}.`));
  bookChoice("croquettes-08a", 14, "ejercicio 8.a", "proporcionalidad", "valor-funcion", "En un comedor cada alumno come dos croquetas. ¿Cuántas croquetas comen 6 alumnos?", "12 croquetas", ["3 croquetas", "8 croquetas", "18 croquetas"], "La función es y=2x. Para x=6: y=12.");
  bookChoice("croquettes-08b", 14, "ejercicio 8.b", "proporcionalidad", "funcion-inversa", "En un comedor cada alumno come dos croquetas. ¿A cuántos alumnos corresponden 14 y 20 croquetas?", "7 alumnos y 10 alumnos", ["12 alumnos y 18 alumnos", "28 alumnos y 40 alumnos", "6 alumnos y 9 alumnos"], "Dividimos entre 2: 14/2=7 y 20/2=10.");
  bookChoice("croquettes-08c", 14, "ejercicio 8.c", "crecimiento", "crecimiento-cualitativo", "En la relación y=2x entre alumnos y croquetas, ¿qué ocurre con las croquetas al aumentar el número de alumnos?", "Aumentan; la gráfica es creciente", ["Disminuyen", "Permanecen constantes", "La gráfica no representa una función"], "La pendiente 2 es positiva, por lo que la gráfica crece.");
  bookChoice("peaches-09a", 14, "ejercicio 9.a", "proporcionalidad", "formula-precio", "El kilo de melocotones cuesta 1,50 €. Expresa el precio y según los kilos x.", "y=1,50x", ["y=x+1,50", "y=x/1,50", "y=1,50+x"], "El precio total es precio por kilo multiplicado por los kilos. Resultado: y=1,50x.");
  bookChoice("peaches-09b", 14, "ejercicio 9.b", "proporcionalidad", "tabla-precio", "Para y=1,50x, forma una tabla dando cuatro valores a x.", "x: 1,2,3,4; y: 1,50,3,4,50,6", ["x: 1,2,3,4; y: 2,50,3,50,4,50,5,50", "x: 1,2,3,4; y: 1,50,6,13,50,24", "x: 1,2,3,4; y: 1,2,3,4"], "Multiplicamos 1,2,3,4 por 1,50.");
  bookChoice("peaches-09d", 14, "ejercicio 9.d", "proporcionalidad", "caracteristicas-funcion", "Enumera las características de la función y=1,50x del precio de los melocotones.", "Es una recta creciente, pasa por el origen y tiene pendiente 1,50", ["Es decreciente y corta el eje Y en 1,50", "Es horizontal y no pasa por el origen", "Es una curva con pendiente variable"], "Es una proporcionalidad directa: su gráfica es una recta por el origen y su pendiente positiva es 1,50.");

  function graphPoints(id, page, reference, document, formula, answer, level = "apprentice") {
    add({
      id: `1eso-original-graph-${id}-review2`, page, reference, document,
      subtopic: "representación de funciones", type: "representar-recta-mediante-puntos", structure: `graph-points-${id}`,
      text: `Representa la recta ${formula}. ¿Qué par de puntos pertenece a ella y permite trazarla?`,
      answer,
      wrong: ["(0,0) y (1,1)", "(0,1) y (1,0)", "(−1,−1) y (1,1)", "(0,−1) y (1,0)"].filter((value) => value !== answer).slice(0, 3),
      solution: `Sustituimos dos valores sencillos de x en ${formula}. Obtenemos ${answer}; al unirlos se representa la recta.`,
      level
    });
  }

  [
    ["linear-01a",1,"ejercicio 1.a","y=−3x","(0,0) y (1,−3)"],
    ["linear-01b",1,"ejercicio 1.b","y=(2/3)x+2","(0,2) y (3,4)"],
    ["linear-01c",1,"ejercicio 1.c","y=4","(0,4) y (2,4)"],
    ["linear-02a",1,"ejercicio 2.a","y=2x−3","(0,−3) y (1,−1)"],
    ["linear-02b",1,"ejercicio 2.b","y=(3/4)x−1","(0,−1) y (4,2)"],
    ["linear-02c",1,"ejercicio 2.c","y=−2","(0,−2) y (2,−2)"],
    ["linear-03a",1,"ejercicio 3.a","y=3x−2","(0,−2) y (1,1)"],
    ["linear-03b",1,"ejercicio 3.b","y=−(3/2)x+1","(0,1) y (2,−2)"],
    ["linear-03c",1,"ejercicio 3.c","y=−3","(0,−3) y (2,−3)"],
    ["linear-04a",1,"ejercicio 4.a","y=−2x+1","(0,1) y (1,−1)"],
    ["linear-04b",1,"ejercicio 4.b","y=(3/2)x−1","(0,−1) y (2,2)"],
    ["linear-04c",1,"ejercicio 4.c","y=−1","(0,−1) y (2,−1)"],
    ["linear-05a",1,"ejercicio 5.a","y=2x−1","(0,−1) y (1,1)"],
    ["linear-05b",1,"ejercicio 5.b","y=−(1/2)x+2","(0,2) y (2,1)"],
    ["linear-05c",1,"ejercicio 5.c","y=2","(0,2) y (2,2)"],
    ["linear-06a",2,"ejercicio 6.a","2x+3y=4","(2,0) y (−1,2)"],
    ["linear-06b",2,"ejercicio 6.b","y+5=0","(0,−5) y (2,−5)"],
    ["linear-07a",2,"ejercicio 7.a","3x+2y=3","(1,0) y (−1,3)"],
    ["linear-07b",2,"ejercicio 7.b","y−4=0","(0,4) y (2,4)"],
    ["linear-08a",2,"ejercicio 8.a","2x+2y+1=0","(−1/2,0) y (0,−1/2)"],
    ["linear-08b",2,"ejercicio 8.b","2y=6","(0,3) y (2,3)"],
    ["linear-09a",2,"ejercicio 9.a","x−2y=2","(2,0) y (0,−1)"],
    ["linear-09b",2,"ejercicio 9.b","3y=9","(0,3) y (2,3)"],
    ["linear-10a",2,"ejercicio 10.a","x+2y+1=0","(−1,0) y (1,−1)"],
    ["linear-10b",2,"ejercicio 10.b","2y=4","(0,2) y (2,2)"],
    ["linear-21b",6,"ejercicio 21.b","y=1,5x","(0,0) y (2,3)"],
    ["linear-22b",6,"ejercicio 22.b","y=1,2x","(0,0) y (5,6)"],
    ["linear-23b",6,"ejercicio 23.b","y=20x+25","(0,25) y (1,45)"],
    ["linear-24b",6,"ejercicio 24.b","y=3x+6","(0,6) y (2,12)"]
  ].forEach(([id,page,reference,formula,answer]) => graphPoints(id,page,reference,LINEAR,formula,answer,"master"));

  [
    ["ii-01a","ejercicio 1.a","y=2x","(0,0) y (1,2)"], ["ii-01b","ejercicio 1.b","y=(1/2)x","(0,0) y (2,1)"],
    ["ii-01c","ejercicio 1.c","y=−3x","(0,0) y (1,−3)"], ["ii-01d","ejercicio 1.d","y=(4/3)x","(0,0) y (3,4)"],
    ["ii-01e","ejercicio 1.e","y=−(2/5)x","(0,0) y (5,−2)"], ["ii-01f","ejercicio 1.f","y=(3/4)x","(0,0) y (4,3)"],
    ["ii-01g","ejercicio 1.g","y=−(1/2)x−2","(0,−2) y (2,−3)"], ["ii-01h","ejercicio 1.h","y=−3x+5","(0,5) y (1,2)"],
    ["ii-01i","ejercicio 1.i","y=−(4/3)x+1","(0,1) y (3,−3)"], ["ii-01j","ejercicio 1.j","y=−(2/5)x+4","(0,4) y (5,2)"],
    ["ii-01k","ejercicio 1.k","y=−1","(0,−1) y (2,−1)"], ["ii-01l","ejercicio 1.l","y=4","(0,4) y (2,4)"],
    ["ii-01m","ejercicio 1.m","y=3","(0,3) y (2,3)"], ["ii-01n","ejercicio 1.n","y=x","(0,0) y (1,1)"]
  ].forEach(([id,reference,formula,answer]) => graphPoints(id,1,reference,FUNCTIONS_II,formula,answer,"master"));

  contextChoice(21, 2, "El Viaje en Tren: acelera 5 minutos, mantiene velocidad constante 20 minutos y frena 3 minutos. ¿Qué descripción corresponde a la gráfica velocidad-tiempo?", "Tramo creciente 5 min, horizontal 20 min y decreciente hasta 0 durante 3 min", ["Horizontal 28 min", "Decreciente 5 min, creciente 20 min y horizontal 3 min", "Creciente durante los 28 min"], "La pendiente positiva representa aceleración, el tramo horizontal velocidad constante y el tramo decreciente la frenada hasta detenerse.", "master");
  contextChoice(27, 3, "Montaña Rusa: sube lentamente una colina, cae de golpe, vuelve a subir una colina más pequeña y llega a la zona de frenado. ¿Qué perfil altura-tiempo es correcto?", "Subida suave, bajada muy pronunciada, segunda subida menor y descenso final hacia la zona de frenado", ["Una recta horizontal", "Solo una subida continua", "Bajada suave seguida de una subida mayor que la primera"], "Traducimos cada fase en el mismo orden y usamos una pendiente más pronunciada para la caída rápida.", "master");
  contextChoice(30, 3, "El Paracaidista: cae muy deprisa, abre el paracaídas, reduce bruscamente su velocidad y desciende lentamente hasta el suelo. ¿Qué descripción corresponde a la gráfica velocidad-tiempo?", "Velocidad alta al principio, descenso brusco al abrirse el paracaídas y tramo final bajo casi constante", ["Velocidad nula durante toda la caída", "Velocidad creciente incluso después de abrir el paracaídas", "Una única recta horizontal de velocidad alta"], "La apertura produce una reducción rápida y después una velocidad de descenso pequeña aproximadamente constante.", "master");

  bookChoice("05b", 4, "ejercicio 5.b", "coordenadas", "representar-puntos", "¿Qué conjunto debe representarse para situar A(4,−1), B(3,4), C(−3,2) y D(−2,−3)?", "A(4,−1), B(3,4), C(−3,2), D(−2,−3)", ["A(−1,4), B(4,3), C(2,−3), D(−3,−2)", "A(4,1), B(3,−4), C(−3,−2), D(−2,3)", "A(−4,1), B(−3,4), C(3,2), D(2,−3)"], "Se conserva el orden (x,y) de cada punto.");
  bookChoice("graph-06", 8, "ejercicio 6", "tablas y gráficas", "completar-grafica", "En la relación alumnos-croquetas y=2x, ¿qué puntos completan la representación para x=1,2,3,4,5,6?", "(1,2), (2,4), (3,6), (4,8), (5,10), (6,12)", ["(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)", "(2,1), (4,2), (6,3), (8,4), (10,5), (12,6)", "(1,3), (2,5), (3,7), (4,9), (5,11), (6,13)"], "Cada número de alumnos x se multiplica por 2.");
  bookChoice("cinema-07b", 8, "ejercicio 7.b", "tablas y gráficas", "representar-proporcionalidad", "Una entrada cuesta 5 €. ¿Qué puntos representan 2,4,6,8 y 10 entradas?", "(2,10), (4,20), (6,30), (8,40), (10,50)", ["(2,5), (4,10), (6,15), (8,20), (10,25)", "(10,2), (20,4), (30,6), (40,8), (50,10)", "(2,7), (4,9), (6,11), (8,13), (10,15)"], "Aplicamos y=5x y representamos los pares (x,y).");
  bookChoice("football-10ab", 9, "ejercicio 10.a-b", "tablas y gráficas", "serie-clasificacion", "¿Qué sucesión de puntos representa las jornadas 1 a 10 y las clasificaciones 3,5,8,7,7,5,3,2,1,5?", "(1,3),(2,5),(3,8),(4,7),(5,7),(6,5),(7,3),(8,2),(9,1),(10,5)", ["(3,1),(5,2),(8,3),(7,4),(7,5),(5,6),(3,7),(2,8),(1,9),(5,10)", "(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10)", "(1,5),(2,1),(3,2),(4,3),(5,5),(6,7),(7,7),(8,8),(9,5),(10,3)"], "La jornada es x y la clasificación correspondiente es y; después se unen los puntos en orden.", "master");
  bookChoice("pears-02c", 10, "ejercicio 2.c", "tablas y gráficas", "representar-proporcionalidad", "Para la función del precio de las peras y=0,75x, ¿qué puntos representan 2,4,6,8 y 10 kg?", "(2,1,50), (4,3), (6,4,50), (8,6), (10,7,50)", ["(2,0,75), (4,1,50), (6,2,25), (8,3), (10,3,75)", "(1,50,2), (3,4), (4,50,6), (6,8), (7,50,10)", "(2,2,75), (4,4,75), (6,6,75), (8,8,75), (10,10,75)"], "Multiplicamos cada x por 0,75 y formamos los pares (x,y).");
  bookChoice("annual-03ac", 11, "ejercicio 3.a-c", "tablas y gráficas", "serie-temporal", "¿Qué debe hacerse para representar la tabla mensual 5,10,15,20,25,25,35,35,25,11,10,0?", "Colocar los meses en x, las temperaturas en y, representar los 12 pares y unirlos en orden", ["Intercambiar meses y temperaturas y no unir los puntos", "Representar solo el máximo y el mínimo", "Colocar ambas magnitudes en el eje x"], "El tiempo ocupa el eje horizontal y la magnitud observada el vertical; los puntos se unen cronológicamente.");
  bookChoice("croquettes-08graph", 14, "ejercicio 8, representación", "proporcionalidad", "representar-proporcionalidad", "¿Qué gráfica corresponde a y=2x en la relación alumnos-croquetas?", "Una recta creciente que pasa por (0,0), (1,2), (2,4) y (6,12)", ["Una recta horizontal y=2", "Una recta decreciente", "Una curva que no pasa por el origen"], "La función es de proporcionalidad directa con pendiente 2.");
  bookChoice("peaches-09c", 14, "ejercicio 9.c", "proporcionalidad", "representar-proporcionalidad", "¿Qué puntos pueden usarse para representar y=1,50x?", "(0,0), (1,1,50), (2,3), (4,6)", ["(0,1,50), (1,2,50), (2,3,50), (4,5,50)", "(0,0), (1,1), (2,2), (4,4)", "(1,0), (1,50,1), (3,2), (6,4)"], "Sustituimos x=0,1,2,4 en y=1,50x.");

  const integerDocument = FUNCTIONS_BOOK;
  [
    ["integer-01", "ejercicio 1", "Selecciona el orden de izquierda a derecha al representar +5, −4, +8, 0, −1, −3, +6, +4 y −6 en la recta.", "−6, −4, −3, −1, 0, +4, +5, +6, +8", ["+8,+6,+5,+4,0,−1,−3,−4,−6", "−6,−4,−3,−1,0,+5,+4,+6,+8", "−4,−6,−3,−1,0,+4,+5,+6,+8"]],
    ["integer-02", "ejercicio 2", "¿Cuáles son, en el mismo orden, los opuestos de +5, −4, +8, 0, −1, −3, +6, +4 y −6?", "−5, +4, −8, 0, +1, +3, −6, −4, +6", ["+5,−4,+8,0,−1,−3,+6,+4,−6", "+5,+4,+8,0,+1,+3,+6,+4,+6", "−5,−4,−8,0,−1,−3,−6,−4,−6"]],
    ["integer-03a", "ejercicio 3.a-b", "Ordena de menor a mayor −3,+5,−1,+4,+8,−7,+2,−6,−9,+10; ese será también su orden en la recta.", "−9, −7, −6, −3, −1, +2, +4, +5, +8, +10", ["−1,−3,−6,−7,−9,+2,+4,+5,+8,+10", "+10,+8,+5,+4,+2,−1,−3,−6,−7,−9", "−9,−7,−6,−3,+2,−1,+4,+5,+8,+10"]],
    ["integer-03c", "ejercicio 3.c", "De −3,+5,−1,+4,+8,−7,+2,−6,−9,+10, ¿cuál está más alejado del origen?", "+10", ["−9", "+8", "−1"]],
    ["integer-03d", "ejercicio 3.d", "De −3,+5,−1,+4,+8,−7,+2,−6,−9,+10, ¿cuál está más cerca del origen?", "−1", ["+2", "−3", "+4"]]
  ].forEach(([id, reference, text, answer, wrong]) => add({ id: `1eso-original-book-${id}-review2`, topic: "numeros-enteros", page: 2, reference, document: integerDocument, subtopic: "recta numérica", type: "representar-y-ordenar-enteros", structure: id, text, answer, wrong, solution: `En la recta, los valores aumentan de izquierda a derecha y la distancia al origen es el valor absoluto. Resultado: ${answer}.` }));

  function bodyChoice(id, page, reference, subtopic, type, text, answer, wrong, solution, level = "apprentice", image = "") {
    add({ id: `1eso-original-bodies-${id}-review2`, topic: "cuerpos-geometricos", page, reference, document: BODIES, subtopic, type, structure: `bodies-${id}`, text, answer, wrong, solution, level, html: image ? `<p>${text}</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/${image}" alt="Figura original del ${reference}">` : "", visual: Boolean(image) });
  }
  bodyChoice("02a", 1, "ejercicio 2.a", "área de prismas", "area-prisma-pentagonal", "Calcula el área total del prisma regular pentagonal del apartado a), con lado de la base 3 cm, apotema 2 cm y altura 6 cm.", "120 cm²", ["90 cm²", "105 cm²", "150 cm²"], "Perímetro=5·3=15 cm. Área de una base=(15·2)/2=15 cm². Área lateral=15·6=90 cm². Total=90+2·15=120 cm².", "master", "cuerpos-ej2-prismas.png");
  bodyChoice("02b", 1, "ejercicio 2.b", "área de prismas", "area-prisma-triangular", "Calcula el área total del prisma triangular recto del apartado b), cuya base tiene catetos 3 cm y 4 cm y cuya altura es 6 cm.", "84 cm²", ["72 cm²", "48 cm²", "96 cm²"], "La hipotenusa es 5 cm. Dos bases: 2·(3·4/2)=12 cm². Área lateral=(3+4+5)·6=72 cm². Total=84 cm².", "master", "cuerpos-ej2-prismas.png");
  bodyChoice("03a", 1, "ejercicio 3.a", "área de pirámides", "area-piramide-cuadrada", "Calcula el área total de la pirámide cuadrada del apartado a), con lado de la base 4 cm y apotema de la pirámide 6 cm.", "64 cm²", ["48 cm²", "80 cm²", "40 cm²"], "Base=4²=16 cm². Área lateral=(4·4·6)/2=48 cm². Total=64 cm².", "master", "cuerpos-ej3-piramides.png");
  bodyChoice("03b", 1, "ejercicio 3.b", "área de pirámides", "area-piramide-pentagonal", "Calcula el área total de la pirámide pentagonal del apartado b), con lado 4 cm, apotema de la base 2,8 cm y apotema de la pirámide 8 cm.", "108 cm²", ["80 cm²", "136 cm²", "56 cm²"], "Perímetro=20 cm. Base=(20·2,8)/2=28 cm². Lateral=(20·8)/2=80 cm². Total=108 cm².", "master", "cuerpos-ej3-piramides.png");
  bodyChoice("04", 1, "ejercicio 4", "troncos de pirámide", "area-tronco-piramide", "Calcula el área total del tronco de pirámide pentagonal representado: lados 4 cm y 6 cm, apotemas 2,8 cm y 4,1 cm, y generatriz lateral 8 cm.", "289,5 cm²", ["200 cm²", "228 cm²", "317,5 cm²"], "Bases: (20·2,8)/2=28 y (30·4,1)/2=61,5. Lateral=((20+30)/2)·8=200. Total=28+61,5+200=289,5 cm².", "master", "cuerpos-ej4-tronco-piramide.png");
  bodyChoice("07", 2, "ejercicio 7", "cilindros", "cilindros-por-giro", "Al girar un rectángulo de 2 cm por 5 cm alrededor de AB se genera un cilindro, y al girarlo alrededor de AD se genera otro. ¿Tienen la misma área? Compruébalo calculando ambas áreas.", "No: 70π cm² alrededor de AB y 28π cm² alrededor de AD", ["Sí: ambos tienen 70π cm²", "No: 20π cm² y 50π cm²", "Sí: ambos tienen 28π cm²"], "Alrededor de AB: r=5,h=2, A=2πrh+2πr²=70π. Alrededor de AD: r=2,h=5, A=28π. No son iguales.", "master", "cuerpos-ej7-giros-cilindros.png");
  bodyChoice("09", 2, "ejercicio 9", "conos", "area-cono-desde-altura", "El diámetro de un cono mide 12 cm y la altura 8 cm. Calcula su área total.", "96π cm²", ["60π cm²", "48π cm²", "120π cm²"], "r=6 cm. Por Pitágoras, g=√(6²+8²)=10 cm. A=πr²+πrg=36π+60π=96π cm².", "master");
  bodyChoice("10", 2, "ejercicio 10", "troncos de cono", "area-tronco-cono", "Los radios de las bases de un tronco de cono miden 5 cm y 2 cm, y la altura 4 cm. Calcula su área total.", "64π cm²", ["35π cm²", "29π cm²", "84π cm²"], "La generatriz es √(4²+(5−2)²)=5. Lateral=π(5+2)·5=35π. Bases=(25+4)π=29π. Total=64π cm².", "master");
  bodyChoice("11b", 2, "ejercicio 11.b", "esferas", "area-esfera", "Calcula el área de una esfera de radio 4,75 cm.", "90,25π cm²", ["22,5625π cm²", "19π cm²", "180,5π cm²"], "A=4πr²=4π·4,75²=90,25π cm².");
  bodyChoice("11c", 2, "ejercicio 11.c", "esferas", "area-esfera", "Calcula el área de una esfera de radio 0,5 cm.", "π cm²", ["0,25π cm²", "2π cm²", "4π cm²"], "A=4π·0,5²=π cm².");
  bodyChoice("13", 2, "ejercicio 13", "esferas", "superficie-planeta", "El diámetro del planeta Marte mide 6.795 km. ¿Cuánto mide su superficie?", "46.172.025π km²", ["23.086.012,5π km²", "6.795π km²", "184.688.100π km²"], "Para una esfera A=4πr²=πd². A=π·6.795²=46.172.025π km².", "master");
  const sphereDiameters = [["14a", "50 cm²", "√(50/π) cm ≈ 3,99 cm"], ["14b", "100 m²", "√(100/π) m ≈ 5,64 m"], ["14c", "1 dm²", "√(1/π) dm ≈ 0,56 dm"]];
  sphereDiameters.forEach(([id, area, answer]) => bodyChoice(id, 2, `ejercicio 14.${id.slice(-1)}`, "esferas", "diametro-desde-area", `Calcula el diámetro de una esfera cuya superficie es ${area}.`, answer, [answer.replace("√", "2√"), answer.replace("≈", "= π ·"), answer.replace(/3,99|5,64|0,56/, "10")], `Como A=πd², despejamos d=√(A/π). Resultado: ${answer}.`, "master"));

  function bodyConversion(id, page, reference, text, answer, wrong, explanation) {
    bodyChoice(id, page, reference, "unidades de volumen y capacidad", "conversion-unidades", text, answer, wrong, explanation);
  }
  bodyConversion("15b", 2, "ejercicio 15.b", "Expresa 500 cm³ en metros cúbicos.", "0,0005 m³", ["0,005 m³", "0,05 m³", "500.000 m³"], "1 m³=1.000.000 cm³. Dividimos 500 entre 1.000.000: 0,0005 m³.");
  bodyConversion("15c", 2, "ejercicio 15.c", "Expresa 50 hm³ en metros cúbicos.", "50.000.000 m³", ["50.000 m³", "500.000 m³", "5.000.000 m³"], "1 hm³=(100 m)³=1.000.000 m³. Entonces 50 hm³=50.000.000 m³.");
  bodyConversion("15d", 2, "ejercicio 15.d", "Expresa 0,5 km³ en metros cúbicos.", "500.000.000 m³", ["500.000 m³", "5.000.000 m³", "50.000.000 m³"], "1 km³=1.000.000.000 m³. La mitad es 500.000.000 m³.");
  [["16a","3,5 m³","3.500.000 cm³"],["16b","8 dm³","8.000 cm³"],["16c","1,75 dm³","1.750 cm³"],["16d","0,050 m³","50.000 cm³"]].forEach(([id,input,answer]) => bodyConversion(id,2,`ejercicio 16.${id.slice(-1)}`,`Expresa ${input} en centímetros cúbicos.`,answer,numericWrongs(answer),`Aplicamos el factor cúbico correspondiente. Resultado: ${answer}.`));
  [["17a","1.200 cm³","1,2 L"],["17c","275 dm³","275 L"],["17d","0,5 cm³","0,0005 L"]].forEach(([id,input,answer]) => bodyConversion(id,2,`ejercicio 17.${id.slice(-1)}`,`Expresa ${input} en litros.`,answer,numericWrongs(answer),`Usamos 1 L=1 dm³=1.000 cm³. Resultado: ${answer}.`));
  [["18a","250 cL","2.500 cm³"],["18b","2,5 L","2.500 cm³"],["18c","6.500 mL","6.500 cm³"]].forEach(([id,input,answer]) => bodyConversion(id,2,`ejercicio 18.${id.slice(-1)}`,`Expresa ${input} en centímetros cúbicos.`,answer,[`250 cm³`,`25.000 cm³`,`0,25 cm³`].filter(v=>v!==answer),`Usamos 1 mL=1 cm³ y 1 L=1.000 cm³. Resultado: ${answer}.`));
  bodyChoice("20", 3, "ejercicio 20", "volumen de prismas", "volumen-prisma-triangular", "Calcula el volumen del prisma de la figura: base triangular recta de hipotenusa 10 cm y un cateto 6 cm, y longitud 4 cm.", "96 cm³", ["120 cm³", "48 cm³", "192 cm³"], "El otro cateto es √(10²−6²)=8. Área de la base=6·8/2=24. Volumen=24·4=96 cm³.", "master", "cuerpos-ej20-prisma.png");
  bodyChoice("21a", 3, "ejercicio 21.a", "volumen de pirámides", "volumen-piramide-rectangular", "Calcula el volumen de la pirámide del apartado a), de base rectangular 3 cm por 4 cm y altura 5 cm.", "20 cm³", ["60 cm³", "12 cm³", "15 cm³"], "V=(A_base·h)/3=(3·4·5)/3=20 cm³.", "master", "cuerpos-ej21-piramides.png");
  bodyChoice("21b", 3, "ejercicio 21.b", "volumen de pirámides", "volumen-piramide-pentagonal", "Calcula el volumen de la pirámide pentagonal del apartado b), con lado 2 cm, apotema 1,7 cm y altura 5 cm.", "85/6 cm³ ≈ 14,17 cm³", ["42,5 cm³", "17 cm³", "28,33 cm³"], "Área de la base=(5·2·1,7)/2=8,5 cm². V=8,5·5/3=85/6≈14,17 cm³.", "master", "cuerpos-ej21-piramides.png");
  bodyChoice("22",3,"ejercicio 22","volumen de troncos de pirámide","diferencia-de-piramides", "El tronco procede de dos pirámides pentagonales semejantes. La pirámide completa tiene altura 11,5 cm y base de lado 4 cm y apotema 2,7 cm; la pequeña eliminada tiene altura 4,7 cm y base de lado 1,6 cm y apotema 1,1 cm. Calcula el volumen del tronco.","≈96,61 cm³",["≈103,50 cm³","≈6,89 cm³","≈110,39 cm³"],"Base grande=(5·4·2,7)/2=27 cm² y V grande=27·11,5/3=103,5 cm³. Base pequeña=(5·1,6·1,1)/2=4,4 cm² y V pequeña=4,4·4,7/3≈6,89 cm³. Restamos: V≈96,61 cm³.","master","cuerpos-ej22-tronco-piramide.png");
  bodyChoice("23b", 3, "ejercicio 23.b", "volumen de cilindros", "volumen-cilindro-unidades", "Calcula el volumen de un cilindro de diámetro 8 dm y altura 1 m.", "160π dm³", ["40π dm³", "80π dm³", "1.600π dm³"], "Convertimos h=1 m=10 dm y r=4 dm. V=π·4²·10=160π dm³.");
  bodyChoice("24a", 3, "ejercicio 24.a", "volumen de conos", "volumen-cono-relacion", "Calcula el volumen de un cono de diámetro 1 dm y altura igual al doble del radio.", "π/12 dm³", ["π/4 dm³", "π/6 dm³", "π/3 dm³"], "r=0,5 dm y h=1 dm. V=πr²h/3=π·0,25/3=π/12 dm³.", "master");
  bodyChoice("25", 3, "ejercicio 25", "esferas", "volumen-esfera", "Calcula en metros cúbicos el volumen de una esfera cuyo diámetro mide 100 cm.", "π/6 m³", ["π/3 m³", "4π/3 m³", "π/12 m³"], "100 cm=1 m, por lo que r=0,5 m. V=(4/3)π·0,5³=π/6 m³.");
  bodyChoice("26", 3, "ejercicio 26", "esferas", "volumen-desde-circunferencia", "La circunferencia de un balón de voleibol mide 65 cm. Calcula su volumen.", "65³/(6π²) cm³ ≈ 4.637,56 cm³", ["65³/(3π) cm³", "4.224 cm³", "8.443 cm³"], "De 2πr=65 obtenemos r=65/(2π). Sustituyendo en V=(4/3)πr³ resulta V=65³/(6π²)≈4.637,56 cm³.", "master");
  bodyChoice("27", 3, "ejercicio 27", "problemas de volumen", "prisma-menos-esfera", "En un prisma de base cuadrada de 8 cm de lado y altura 12 cm se introduce una bola de hierro de 8 cm de diámetro. Calcula el volumen de agua necesario para llenar el recipiente.", "768−256π/3 cm³ ≈ 499,92 cm³", ["768−64π/3 cm³", "256π/3 cm³", "768+256π/3 cm³"], "Prisma: 8²·12=768 cm³. Esfera de radio 4: (4/3)π·4³=256π/3. El agua ocupa la diferencia: 768−256π/3≈499,92 cm³.", "master");
  bodyChoice("28", 3, "ejercicio 28", "problemas de volumen y masa", "numero-bolas-por-masa", "Un centímetro cúbico de hierro tiene una masa de 7,8 g. ¿Cuántas bolas de hierro de 2 cm de diámetro necesitamos reunir para completar una masa de 1 kg?", "31 bolas", ["30 bolas", "24 bolas", "39 bolas"], "Cada bola tiene r=1 cm y volumen 4π/3 cm³. Su masa es 7,8·4π/3=10,4π≈32,67 g. 1.000/32,67≈30,61; hacen falta 31 bolas.", "master");
  bodyChoice("29", 3, "ejercicio 29", "área y volumen", "area-cuerpo-de-cubos", "El cuerpo de la figura está formado por cinco cubos iguales y tiene volumen 135 cm³. Calcula el área total.", "198 cm²", ["270 cm²", "162 cm²", "225 cm²"], "Cada cubo tiene volumen 135/5=27 cm³ y arista 3 cm. El conjunto tiene 22 caras cuadradas expuestas. Área=22·3²=198 cm².", "master", "cuerpos-ej29-area-volumen.png");

  const cubeAreas = [["31a","1 cm","6 cm²",["1 cm²","4 cm²","8 cm²"]],["31b","2 cm","24 cm²",["8 cm²","12 cm²","36 cm²"]],["31c","10 cm","600 cm²",["100 cm²","60 cm²","1.000 cm²"]],["31d","1/2 m","1,5 m²",["0,25 m²","3 m²","6 m²"]]];
  cubeAreas.forEach(([id, edge, answer, wrong]) => bodyChoice(id,4,`ejercicio 31.${id.slice(-1)}`,"área de cubos","area-cubo",`Calcula el área de un cubo cuya arista mide ${edge}.`,answer,wrong,`El área de un cubo es 6a². Sustituyendo a=${edge}, resulta ${answer}.`));
  const toCm3 = [
    ["32a","7 dm³","7.000 cm³"],["32b","0,3 dm³","300 cm³"],["32c","0,001 dm³","1 cm³"],
    ["32d","1,5 m³","1.500.000 cm³"],["32e","0,001 m³","1.000 cm³"],["32f","2.000 mm³","2 cm³"],
    ["32g","10 dm³","10.000 cm³"],["32h","1 dam³","1.000.000.000 cm³"],["32i","0,001 dm³","1 cm³"],
    ["32j","0,001 dam³","1.000.000 cm³"]
  ];
  toCm3.forEach(([id,input,answer]) => bodyConversion(id,4,`ejercicio 32.${id.slice(-1)}`,`Expresa ${input} en centímetros cúbicos.`,answer,numericWrongs(answer),`Aplicamos el factor de conversión cúbico correspondiente. Resultado: ${answer}.`));
  [["33a","5 cm","3 cm","90 cm²"],["33b","1 cm","1 cm","6 cm²"],["33c","2 cm","10 cm","120 cm²"],["33d","1,5 cm","9 cm","81 cm²"]].forEach(([id,side,height,answer]) => bodyChoice(id,4,`ejercicio 33.${id.slice(-1)}`,"área de prismas","area-lateral-prisma-hexagonal",`Calcula el área lateral de un prisma regular hexagonal de lado ${side} y altura ${height}.`,answer,[`La mitad de ${answer}`,`El doble de ${answer}`,`${Number.parseFloat(answer.replace(",","."))+6} cm²`],`Área lateral=perímetro·altura=6·l·h. Resultado: ${answer}.`));
  const toLitres = [
    ["34a","2 dm³","2 L"],["34b","600 dm³","600 L"],["34c","0,5 dm³","0,5 L"],["34d","10 dam³","10.000.000 L"],
    ["34e","2.000.000 mm³","2 L"],["34f","1.500 cm³","1,5 L"],["34g","0,005 m³","5 L"],["34h","0,000005 hm³","5.000 L"]
  ];
  toLitres.forEach(([id,input,answer]) => bodyConversion(id,4,`ejercicio 34.${id.slice(-1)}`,`Expresa ${input} en litros.`,answer,numericWrongs(answer),`Usamos la equivalencia 1 L=1 dm³ y los factores cúbicos necesarios. Resultado: ${answer}.`));
  const cubeCapacity = [["35a","1 dm","1 L"],["35b","10 cm","1 L"],["35c","0,5 dm","0,125 L"],["35d","2 dm","8 L"],["35e","3 dam","27.000.000 L"],["35f","2 m","8.000 L"],["35g","0,1 m","1 L"],["35h","0,001 dam","0,001 L"]];
  cubeCapacity.forEach(([id,edge,answer]) => bodyChoice(id,4,`ejercicio 35.${id.slice(-1)}`,"volumen y capacidad","capacidad-cubo",`Calcula en litros la capacidad de un cubo cuya arista mide ${edge}.`,answer,numericWrongs(answer),`Calculamos V=a³ y convertimos el volumen a litros. Resultado: ${answer}.`));
  [["36a","10,2 dm","800 L"],["36b","8,8 dm","720 L"],["36c","10,7 dm","880 L"],["36d","9,9 dm","800 L"]].forEach(([id,height,answer]) => bodyChoice(id,4,`ejercicio 36.${id.slice(-1)}`,"capacidad de cilindros","capacidad-area-base-altura",`El área de la base de un depósito cilíndrico es 0,8 m². Calcula su capacidad en litros, redondeando a unidades la altura ${height}.`,answer,[`80 L`,`8.000 L`,`900 L`].filter(v=>v!==answer),`Redondeamos la altura en decímetros, la convertimos a metros y calculamos V=A_base·h. Después usamos 1 m³=1.000 L. Resultado: ${answer}.`));
  bodyChoice("37a",4,"ejercicio 37.a","área de prismas","area-ortoedro", "Calcula el área total del ortoedro del apartado a), de dimensiones 7,4 cm, 11,5 cm y 2,4 cm.","260,92 cm²",["130,46 cm²","204,24 cm²","85,10 cm²"],"A=2(ab+ac+bc)=2(7,4·11,5+7,4·2,4+11,5·2,4)=260,92 cm².","master","cuerpos-ej37-prismas.png");
  bodyChoice("37b",4,"ejercicio 37.b","área de prismas","area-cubo", "Calcula el área total del cubo del apartado b), de arista 2,5 cm.","37,5 cm²",["15,625 cm²","25 cm²","75 cm²"],"A=6·2,5²=37,5 cm².","apprentice","cuerpos-ej37-prismas.png");
  bodyChoice("37c",4,"ejercicio 37.c","área de prismas","area-prisma-triangular", "Calcula el área total del prisma triangular del apartado c), cuya base es un triángulo rectángulo de catetos 3 cm y 4 cm, y cuya longitud es 4 cm.","60 cm²",["48 cm²","24 cm²","72 cm²"],"La hipotenusa es 5. Dos bases suman 12 cm² y el área lateral es (3+4+5)·4=48 cm². Total=60 cm².","master","cuerpos-ej37-prismas.png");
  bodyChoice("37d",4,"ejercicio 37.d","área de prismas","area-prisma-triangular-regular", "Calcula el área total del prisma triangular regular del apartado d), con lado de la base 2 cm y altura del prisma 5 cm.","30+2√3 cm²",["30 cm²","20+2√3 cm²","60+4√3 cm²"],"Área lateral=3·2·5=30. Cada base equilátera mide √3 cm²; las dos suman 2√3. Total=30+2√3 cm².","master","cuerpos-ej37-prismas.png");
  bodyChoice("38a",4,"ejercicio 38.a","área de prismas","area-prisma-cuadrado", "Calcula el área total de un prisma de base cuadrada de lado 6 cm y altura 1,5 dm.","432 cm²",["360 cm²","396 cm²","864 cm²"],"Convertimos 1,5 dm=15 cm. Lateral=4·6·15=360 y bases=2·36=72. Total=432 cm².","master");
  bodyChoice("38b",4,"ejercicio 38.b","área de prismas","area-prisma-octogonal", "Calcula el área total de un prisma de base octogonal regular, lado 6 cm, apotema 7,25 cm y altura 1,8 dm.","1.212 cm²",["864 cm²","348 cm²","1.038 cm²"],"h=18 cm, perímetro=48 cm, base=(48·7,25)/2=174 cm². Total=48·18+2·174=1.212 cm².","master");
  bodyChoice("39a",5,"ejercicio 39.a","área de pirámides","area-piramide-cuadrada", "Calcula el área total de la pirámide cuadrada del apartado a), con lado de la base 5 cm y apotema de la pirámide 8 cm.","105 cm²",["80 cm²","100 cm²","130 cm²"],"Base=25. Lateral=(4·5·8)/2=80. Total=105 cm².","master","cuerpos-ej39-piramides.png");
  bodyChoice("39b",5,"ejercicio 39.b","área de pirámides","area-piramide-cuadrada", "Calcula el área total de la pirámide cuadrada del apartado b), con lado de la base 14 cm y apotema de la pirámide 12 cm.","532 cm²",["336 cm²","196 cm²","728 cm²"],"Base=14²=196. Lateral=(4·14·12)/2=336. Total=532 cm².","master","cuerpos-ej39-piramides.png");
  bodyChoice("40",5,"ejercicio 40","área de pirámides","area-piramide-cuadrada", "Calcula el área total de una pirámide regular de base cuadrada de lado 5 cm y apotema de la pirámide 1 dm.","125 cm²",["100 cm²","75 cm²","250 cm²"],"1 dm=10 cm. Base=25 y lateral=(20·10)/2=100. Total=125 cm².","master");
  bodyChoice("41",5,"ejercicio 41","área de pirámides","area-piramide-octogonal", "Una pirámide regular tiene base octogonal de lado 4 cm y apotema 4,84 cm. Su altura es 1,2 dm. Calcula el área total.","≈284,42 cm²",["≈206,98 cm²","77,44 cm²","≈361,86 cm²"],"h=12 cm. Apotema lateral=√(12²+4,84²)≈12,936. Base=(32·4,84)/2=77,44. Lateral=(32·12,936)/2≈206,98. Total≈284,42 cm².","master","cuerpos-ej41-piramide-octogonal.png");
  bodyChoice("42",5,"ejercicio 42","troncos de pirámide","area-tronco-piramide-cuadrado", "Calcula el área total del tronco de pirámide cuadrada representado, con lados de las bases 2 cm y 6 cm y apotema lateral 8 cm.","168 cm²",["128 cm²","148 cm²","208 cm²"],"Bases=2²+6²=40. Lateral=((8+24)/2)·8=128. Total=168 cm².","master","cuerpos-ej42-tronco-piramide.png");
  bodyChoice("43a",5,"ejercicio 43.a","cilindros","area-total-cilindro", "Calcula el área total de un cilindro de radio 2,5 cm y altura 1,2 dm.","72,5π cm²",["60π cm²","78,75π cm²","36,25π cm²"],"h=12 cm. A=2πr(h+r)=2π·2,5·14,5=72,5π cm².");
  bodyChoice("43b",5,"ejercicio 43.b","cilindros","area-total-cilindro", "Calcula el área total de un cilindro de diámetro 4,8 cm y altura 0,8 dm.","49,92π cm²",["38,4π cm²","55,68π cm²","24,96π cm²"],"r=2,4 cm y h=8 cm. A=2π·2,4·(8+2,4)=49,92π cm².");
  bodyChoice("44a",5,"ejercicio 44.a","conos","area-total-cono", "Calcula el área total de un cono de radio 2,5 cm y generatriz 1,2 dm.","36,25π cm²",["30π cm²","6,25π cm²","72,5π cm²"],"g=12 cm. A=πr(r+g)=π·2,5·14,5=36,25π cm².");
  bodyChoice("44b",5,"ejercicio 44.b","conos","area-total-cono", "Calcula el área total de un cono de diámetro 24 cm y altura 1,6 dm.","384π cm²",["240π cm²","144π cm²","768π cm²"],"r=12,h=16 y g=20 cm. A=π·12·(12+20)=384π cm².","master");
  [["45a","1 dm","400π cm²"],["45b","0,02 m","16π cm²"],["45c","150 mm","900π cm²"],["45d","0,0001 dam","0,04π cm²"]].forEach(([id,radius,answer]) => bodyChoice(id,5,`ejercicio 45.${id.slice(-1)}`,"esferas","area-esfera-conversion",`Calcula en centímetros cuadrados el área de una esfera de radio ${radius}.`,answer,[`La mitad de ${answer}`,`El doble de ${answer}`,radius.replace(/dm|m|mm|dam/,"π cm²")],`Convertimos el radio a centímetros y aplicamos A=4πr². Resultado: ${answer}.`));
  bodyChoice("46",5,"ejercicio 46","troncos de cono","area-tronco-cono", "Calcula el área total del tronco de cono representado, con radios 3 cm y 5 cm y generatriz 6 cm.","82π cm²",["48π cm²","34π cm²","112π cm²"],"Lateral=π(3+5)·6=48π. Bases=(3²+5²)π=34π. Total=82π cm².","master","cuerpos-ej46-tronco-cono.png");

  [["47a","5 dm³","5.000 cm³"],["47b","0,1 dm³","100 cm³"],["47c","1.500 mm³","1,5 cm³"],["47d","0,00005 dam³","50.000 cm³"]].forEach(([id,input,answer]) => bodyConversion(id,6,`ejercicio 47.${id.slice(-1)}`,`Expresa ${input} en centímetros cúbicos.`,answer,numericWrongs(answer),`Aplicamos el factor cúbico correspondiente. Resultado: ${answer}.`));
  [["48a","2,5 dm³","2,5 L"],["48b","0,05 m³","50 L"],["48c","759 cm³","0,759 L"]].forEach(([id,input,answer]) => bodyConversion(id,6,`ejercicio 48.${id.slice(-1)}`,`Expresa ${input} en litros.`,answer,numericWrongs(answer),`Usamos 1 L=1 dm³=1.000 cm³. Resultado: ${answer}.`));
  bodyConversion("49a",6,"ejercicio 49.a","Completa: 250 cm³=0,250 ___.","L",["m³","cL","mm³"],"250 cm³=250 mL=0,250 L.");
  bodyConversion("49b",6,"ejercicio 49.b","Completa: 0,750 dm³=___ cm³.","750",["75","7.500","0,750"],"1 dm³=1.000 cm³; por tanto 0,750 dm³=750 cm³.");
  bodyConversion("49c",6,"ejercicio 49.c","Completa: 1/2 m³=500 ___.","L",["mL","cm³","dm"],"1 m³=1.000 L; la mitad son 500 L.");
  bodyConversion("50a",6,"ejercicio 50.a","Completa la unidad: 750 cm³=0,750 L=0,750 ___.","dm³",["m³","cm³","mL"],"Como 1 L=1 dm³, 0,750 L=0,750 dm³.");
  bodyConversion("50b",6,"ejercicio 50.b","Completa las unidades: 20 dm³=20.000 ___=20 ___.","cm³ y L",["mm³ y mL","m³ y cL","cm² y L"],"1 dm³=1.000 cm³ y 1 dm³=1 L. Resultado: cm³ y L.");
  bodyConversion("50c",6,"ejercicio 50.c","Completa las unidades: 3/4 ___=750 cm³=0,750 ___.","L y dm³",["m³ y L","cL y m³","dm³ y cm³"],"3/4 L=0,750 L=750 cm³ y, además, 0,750 L=0,750 dm³.");
  bodyChoice("51a",6,"ejercicio 51.a","volumen de prismas","volumen-prisma-triangular", "Calcula el volumen del prisma del apartado a), cuya base es un triángulo rectángulo isósceles de catetos 2,5 cm y cuya longitud es 6 cm.","18,75 cm³",["37,5 cm³","15 cm³","7,5 cm³"],"Área de la base=2,5·2,5/2=3,125 cm². V=3,125·6=18,75 cm³.","master","cuerpos-ej51-prismas.png");
  bodyChoice("51b",6,"ejercicio 51.b","volumen de prismas","volumen-prisma-pentagonal", "Calcula el volumen del prisma pentagonal del apartado b), de lado 4 cm, apotema 2,75 cm y altura 10 cm.","275 cm³",["27,5 cm³","550 cm³","220 cm³"],"Base=(5·4·2,75)/2=27,5 cm². V=27,5·10=275 cm³.","master","cuerpos-ej51-prismas.png");
  bodyChoice("52a",6,"ejercicio 52.a","volumen de pirámides","volumen-piramide-rectangular", "Halla el volumen de la pirámide del apartado a), con base rectangular de 5 cm por 3 cm y altura 8 cm.","40 cm³",["120 cm³","15 cm³","60 cm³"],"V=(5·3·8)/3=40 cm³.","master","cuerpos-ej52-piramides.png");
  bodyChoice("52b",6,"ejercicio 52.b","volumen de pirámides","volumen-piramide-pentagonal", "Halla el volumen de la pirámide pentagonal del apartado b), de lado 3 cm, apotema 2 cm y altura 7 cm.","35 cm³",["105 cm³","15 cm³","70 cm³"],"Base=(5·3·2)/2=15 cm². V=15·7/3=35 cm³.","master","cuerpos-ej52-piramides.png");
  bodyChoice("52c",6,"ejercicio 52.c","troncos de pirámide","volumen-tronco-piramide", "Halla el volumen del tronco de pirámide cuadrada del apartado c), con lados de las bases 60 cm y 40 cm y altura 40 cm.","304.000/3 cm³ ≈ 101.333,33 cm³",["80.000 cm³","208.000/3 cm³","152.000 cm³"],"V=h(A₁+A₂+√(A₁A₂))/3. Con A₁=3.600, A₂=1.600 y h=40: V=40(3.600+1.600+2.400)/3=304.000/3 cm³.","master","cuerpos-ej52-piramides.png");
  bodyChoice("53",6,"ejercicio 53","volumen de cilindros","volumen-cilindro-relacion", "Calcula el volumen del cilindro de altura 12 cm y radio igual a la sexta parte de la altura.","48π cm³",["24π cm³","144π cm³","96π cm³"],"r=12/6=2 cm. V=πr²h=π·4·12=48π cm³.","master","cuerpos-ej53-cilindro.png");
  bodyChoice("54",6,"ejercicio 54","volumen de cilindros","volumen-cilindro-relacion", "Calcula el volumen de un cilindro de 12 cm de diámetro y altura igual a la mitad del radio.","108π cm³",["216π cm³","36π cm³","432π cm³"],"r=6 cm y h=3 cm. V=π·6²·3=108π cm³.","master");
  bodyChoice("55a",6,"ejercicio 55.a","volumen de conos","volumen-cono", "Halla el volumen del cono del apartado a), de diámetro 12 cm y altura 10 cm.","120π cm³",["360π cm³","60π cm³","40π cm³"],"r=6 cm. V=πr²h/3=π·36·10/3=120π cm³.","master","cuerpos-ej55-conos.png");
  bodyChoice("55b",6,"ejercicio 55.b","troncos de cono","volumen-tronco-cono", "Halla el volumen del tronco de cono del apartado b), de radios 15 cm y 10 cm y altura 25 cm.","11.875π/3 cm³",["6.250π/3 cm³","8.125π/3 cm³","11.875π cm³"],"V=πh(R²+r²+Rr)/3=25π(225+100+150)/3=11.875π/3 cm³.","master","cuerpos-ej55-conos.png");
  bodyChoice("56a",7,"ejercicio 56.a","cuerpos compuestos","cilindro-mas-cono", "Calcula el volumen del cuerpo a): un cilindro de diámetro 14 cm y altura 5 cm con un cono de diámetro 6 cm y generatriz 5 cm añadido encima.","257π cm³",["245π cm³","269π cm³","128,5π cm³"],"Cilindro: π·7²·5=245π. En el cono, h=√(5²−3²)=4 y V=π·3²·4/3=12π. Total=257π cm³.","master","cuerpos-ej56-compuestos.png");
  bodyChoice("56b",7,"ejercicio 56.b","cuerpos compuestos","hemiesfera-mas-cono", "Calcula el volumen del cuerpo b): una semiesfera de radio 5 cm unida a un cono de radio 5 cm y generatriz 8 cm.","(25π/3)(10+√39) cm³",["(25π/3)(10+√64) cm³","250π/3 cm³","25π√39 cm³"],"La altura del cono es √(8²−5²)=√39. Semiesfera=250π/3. Cono=25π√39/3. Sumamos: (25π/3)(10+√39) cm³.","master","cuerpos-ej56-compuestos.png");
  bodyChoice("58",7,"ejercicio 58","problemas de áreas","area-tronco-piramide-sin-base", "Calcula los metros cuadrados de madera necesarios para el podio de la figura, de bases cuadradas de lado 3,75 m y 5,25 m y apotema lateral 4,5 m, sin base inferior.","95,0625 m²",["81 m²","109,125 m²","122,625 m²"],"Área lateral=((4·3,75+4·5,25)/2)·4,5=81 m². Añadimos solo la base superior: 3,75²=14,0625. Total=95,0625 m².","master","cuerpos-ej58-podio.png");
  bodyChoice("60",7,"ejercicio 60","problemas de volumen","comparar-jardineras", "Las figuras representan dos jardineras de altura 20 cm: una tronco-piramidal de lados 30 cm y 20 cm y otra tronco-cónica de diámetros 80 cm y 20 cm. ¿En cuál hay que echar más tierra?", "En la jardinera tronco-cónica", ["En la jardinera tronco-piramidal", "En ambas exactamente lo mismo", "No depende de sus dimensiones"], "Tronco de pirámide: V=20(900+400+600)/3≈12.666,67 cm³. Tronco de cono: V=20π(40²+10²+40·10)/3=14.000π≈43.982,30 cm³. Es mayor la tronco-cónica.","master","cuerpos-ej60-jardineras.png");
  bodyChoice("61",7,"ejercicio 61","problemas de áreas y masa","embudo-conico", "La altura de un embudo de hojalata, sin tubo, es 26 cm y su diámetro 30 cm. Si 1 m² de hojalata pesa 3,25 kg, ¿cuánto pesa el embudo?", "≈0,460 kg",["≈4,60 kg","≈0,230 kg","≈1,415 kg"],"r=15 y g=√(26²+15²)=√901. Área lateral=15π√901≈1.414,50 cm²=0,14145 m². Masa=0,14145·3,25≈0,460 kg.","master");
  bodyChoice("62",7,"ejercicio 62","problemas de áreas","alicatado-cocina", "Una cocina mide 3,75 m por 2,25 m y 2,50 m de alto. Se alicatan las paredes con azulejos de 15 cm de lado, descontando una puerta de 85×210 cm y una ventana cuadrada de 135 cm. ¿Cuántos azulejos se necesitan?", "1.173 azulejos",["1.200 azulejos","1.080 azulejos","1.250 azulejos"],"Paredes=2(3,75+2,25)·2,50=30 m². Huecos=0,85·2,10+1,35²=3,6075 m². Área útil=26,3925 m². Cada azulejo=0,15²=0,0225 m². Cociente=1.173.","master");
  bodyChoice("65",8,"ejercicio 65","problemas de volumen y masa","masa-recipiente-hueco", "Un dm³ del material del recipiente pesa 7,8 kg. El ortoedro exterior mide 12×10×9 dm y el hueco interior 10×9×8 dm. Calcula cuánto pesa.","2.808 kg",["5.616 kg","360 kg","8.424 kg"],"Volumen de material=12·10·9−10·9·8=1.080−720=360 dm³. Masa=360·7,8=2.808 kg.","master","cuerpos-ej65-recipiente.png");
  bodyChoice("66",8,"ejercicio 66","problemas de capacidad","tiempo-llenado-prisma", "Calcula cuánto tarda en llenarse el depósito de la figura si entran 85 L/min. Es un prisma hexagonal regular de lado 3 dm, apotema 2,6 dm y altura 1 m.","≈2,75 min (unos 2 min 45 s)",["≈1,38 min","≈4,59 min","≈27,5 min"],"h=10 dm. Base=(6·3·2,6)/2=23,4 dm². Volumen=234 dm³=234 L. Tiempo=234/85≈2,75 min.","master","cuerpos-ej66-deposito.png");
  bodyChoice("67",8,"ejercicio 67","problemas de empaquetado","cajas-en-ortoedro", "Una caja mide 36×24×30 cm. Se introducen paquetes de 5×9×6 cm. ¿Cuántos paquetes caben, colocándolos con aristas paralelas?", "96 paquetes",["48 paquetes","72 paquetes","120 paquetes"],"Orientamos 9 cm sobre 36 (4), 6 sobre 24 (4) y 5 sobre 30 (6). Caben 4·4·6=96 paquetes.","master");
  bodyChoice("68",8,"ejercicio 68","área de prismas","area-lateral-prisma-hexagonal", "Calcula el área lateral de un prisma regular de 5 cm de altura cuya base es un hexágono de lado 1,5 cm.","45 cm²",["22,5 cm²","37,5 cm²","90 cm²"],"Perímetro=6·1,5=9 cm. Área lateral=9·5=45 cm².");
  bodyChoice("69a",8,"ejercicio 69.a","área de prismas","area-prisma-hexagonal", "Calcula el área total del prisma hexagonal del apartado a), de lado 2 cm, apotema 1,7 cm y altura 7 cm.","104,4 cm²",["84 cm²","20,4 cm²","124,8 cm²"],"Perímetro=12. Base=(12·1,7)/2=10,2. Lateral=12·7=84. Total=84+2·10,2=104,4 cm².","master","cuerpos-ej69-refuerzo.png");
  bodyChoice("69b",8,"ejercicio 69.b","área de prismas","area-prisma-triangular", "Calcula el área total del prisma triangular del apartado b), con base triangular de lados 3,4,5 cm y longitud 5 cm.","72 cm²",["60 cm²","48 cm²","36 cm²"],"Dos bases rectángulas suman 2·(3·4/2)=12. Lateral=(3+4+5)·5=60. Total=72 cm².","master","cuerpos-ej69-refuerzo.png");
  bodyChoice("70a",9,"ejercicio 70.a","cilindros","area-total-cilindro", "Calcula el área total de un cilindro de altura 8 cm y diámetro 5 cm.","52,5π cm²",["40π cm²","12,5π cm²","105π cm²"],"r=2,5. A=2πr(h+r)=2π·2,5·10,5=52,5π cm².");
  bodyChoice("70b",9,"ejercicio 70.b","conos","area-total-cono", "Calcula el área total de un cono de altura 2 dm y diámetro de la base 1 dm, expresada en cm².","25π(1+√17) cm²",["25π√17 cm²","50π(1+√17) cm²","125π cm²"],"r=5 cm,h=20 cm,g=√425=5√17. A=πr(r+g)=25π(1+√17) cm².","master");
  bodyChoice("70c",9,"ejercicio 70.c","esferas","area-esfera-conversion", "Calcula en centímetros cuadrados el área de una esfera de radio 3 dm.","3.600π cm²",["360π cm²","900π cm²","7.200π cm²"],"r=30 cm. A=4π·30²=3.600π cm².");
  [["71a","2 dm³","2.000 cm³"],["71b","250 mm³","0,25 cm³"],["71c","0,05 m³","50.000 cm³"]].forEach(([id,input,answer]) => bodyConversion(id,9,`ejercicio 71.${id.slice(-1)}`,`Expresa ${input} en centímetros cúbicos.`,answer,numericWrongs(answer),`Aplicamos el factor cúbico. Resultado: ${answer}.`));
  [["72a","2 dm³","2 L"],["72b","0,01 m³","10 L"],["72c","7.000 cm³","7 L"]].forEach(([id,input,answer]) => bodyConversion(id,9,`ejercicio 72.${id.slice(-1)}`,`Expresa ${input} en litros.`,answer,numericWrongs(answer),`Usamos 1 L=1 dm³=1.000 cm³. Resultado: ${answer}.`));
  bodyChoice("73a",9,"ejercicio 73.a","volumen de prismas","volumen-prisma-pentagonal", "Calcula el volumen del prisma pentagonal del apartado a), de lado 6 cm, apotema 4,1 cm y altura 16 cm.","984 cm³",["61,5 cm³","492 cm³","1.968 cm³"],"Base=(5·6·4,1)/2=61,5 cm². Volumen=61,5·16=984 cm³.","master","cuerpos-ej73-prismas.png");
  bodyChoice("73b",9,"ejercicio 73.b","volumen de prismas","volumen-prisma-triangular", "Calcula el volumen del prisma triangular del apartado b), con base triangular recta de catetos 3 cm y longitud 4,5 cm.","20,25 cm³",["40,5 cm³","13,5 cm³","27 cm³"],"Área de la base=3·3/2=4,5 cm². Volumen=4,5·4,5=20,25 cm³.","master","cuerpos-ej73-prismas.png");
  bodyChoice("74a",9,"ejercicio 74.a","volumen de pirámides","volumen-piramide-rectangular", "Calcula el volumen de la pirámide del apartado a), de base 8 cm por 6 cm y altura 10 cm.","160 cm³",["480 cm³","80 cm³","240 cm³"],"V=8·6·10/3=160 cm³.","master","cuerpos-ej74-piramides.png");
  bodyChoice("74b",9,"ejercicio 74.b","volumen de pirámides","volumen-piramide-pentagonal", "Calcula el volumen de la pirámide pentagonal regular del apartado b), cuya base tiene lado 6 cm y apotema 5,2 cm, y cuya altura es 10 cm.","260 cm³",["780 cm³","156 cm³","520 cm³"],"Área de la base=(5·6·5,2)/2=78 cm². Volumen=78·10/3=260 cm³.","master","cuerpos-ej74-piramides.png");
  bodyChoice("75a",9,"ejercicio 75.a","volumen de cilindros","volumen-cilindro-altura-diametro", "Calcula el volumen del cilindro del apartado a), cuyo diámetro es 8 cm y cuya altura es igual al diámetro.","128π cm³",["64π cm³","256π cm³","512π cm³"],"r=4,h=8. V=π·4²·8=128π cm³.","master","cuerpos-ej75-cuerpos.png");
  bodyChoice("75b",9,"ejercicio 75.b","volumen de conos","volumen-cono-altura-diametro", "Calcula el volumen del cono del apartado b), cuyo diámetro es 6 cm y cuya altura es igual al diámetro.","18π cm³",["54π cm³","36π cm³","9π cm³"],"r=3,h=6. V=π·3²·6/3=18π cm³.","master","cuerpos-ej75-cuerpos.png");
  bodyChoice("75c",9,"ejercicio 75.c","esferas","volumen-esfera", "Calcula el volumen de la esfera del apartado c), de radio 0,8 cm.","0,682666…π cm³",["0,512π cm³","2,048π cm³","1,365333…π cm³"],"V=(4/3)π·0,8³=(4/3)π·0,512=0,682666…π cm³.","master","cuerpos-ej75-cuerpos.png");
  bodyChoice("77",10,"ejercicio 77","problemas de cilindros","volumen-desde-desarrollo-lateral", "El papel que rodeaba una lata mide 14 cm de largo y 4 cm de alto. Calcula el volumen de la lata.","196/π cm³ ≈ 62,39 cm³",["56π cm³","196π cm³","49/π cm³"],"El largo 14 cm es la circunferencia: 2πr=14, r=7/π. Con h=4, V=π(7/π)²·4=196/π≈62,39 cm³.","master","cuerpos-ej77-lata.png");
  bodyChoice("78b",10,"ejercicio 78.b","modelización geométrica","superficie-en-funcion-de-x", "Una caja es un ortoedro cuya base tiene lados x y 2x, y cuya altura es x. Calcula la superficie total en función de x.","S(x)=10x²",["S(x)=6x²","S(x)=8x²","S(x)=2x³"],"S=2(largo·ancho+largo·alto+ancho·alto)=2(2x²+2x²+x²)=10x².","master");
  bodyChoice("78a",10,"ejercicio 78.a","modelización geométrica","esquema-desde-condiciones", "Una caja tiene forma de ortoedro. Su base es un rectángulo con un lado doble que el otro y la altura coincide con el lado menor de la base. ¿Qué dimensiones deben figurar en un esquema si llamamos x al lado menor?","Base x por 2x y altura x",["Base x por x y altura 2x","Base 2x por 2x y altura x","Base x por 2x y altura 2x"],"El lado menor vale x, el mayor de la base vale 2x y la altura coincide con el menor: x.","master");
  bodyChoice("79",10,"ejercicio 79","modelización geométrica","igualar-superficie-volumen", "Para la caja de base x por 2x y altura x, la superficie total y el volumen tienen el mismo valor numérico. ¿Cuáles son sus dimensiones?", "10 cm × 5 cm × 5 cm",["8 cm × 4 cm × 4 cm","6 cm × 3 cm × 3 cm","20 cm × 10 cm × 10 cm"],"S=10x² y V=2x³. Igualamos: 10x²=2x³. Como x>0, x=5. Las dimensiones son 2x=10, x=5 y x=5 cm.","master");
  bodyChoice("80",10,"ejercicio 80","problemas de capacidad","llenado-con-caudales", "Una alberca de base 4 m por 2 m contiene agua hasta 1,5 m. Tres caños aportan 40, 30 y 25 L/min. ¿Cuántos m³ contendrá 2 horas después?", "23,4 m³",["12 m³","11,4 m³","126 m³"],"Volumen inicial=4·2·1,5=12 m³. Caudal total=95 L/min. En 120 min aporta 11.400 L=11,4 m³. Total=23,4 m³.","master");

  const previous = window.MargaritaEsoOriginalPractice;
  const ownFor = (courseId, theme, level) => {
    if (String(courseId || "").toLowerCase() !== "1eso") return [];
    const themeName = typeof theme === "string"
      ? theme.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
      : "";
    const topicId = String(theme?.topicId || theme?.id || (
      themeName === "numeros enteros" ? "numeros-enteros"
        : themeName === "cuerpos geometricos" ? "cuerpos-geometricos"
          : themeName === "funciones" ? "funciones" : ""
    )).toLowerCase();
    const topicIndex = Number(theme?.topicIndex ?? theme?.index);
    return questions.filter((item) => {
      const sameTopic = topicId
        ? item.topicId === `1eso:${topicId}` || item.topicId.endsWith(`:${topicId}`)
        : item.topicIndex === topicIndex;
      return sameTopic && (!level || item.challengeLevel === level);
    });
  };
  window.MargaritaEsoOriginalPractice = Object.freeze({
    count: Number(previous?.count || 0) + questions.length,
    all(courseId, theme) { return [...(previous?.all?.(courseId, theme) || []), ...ownFor(courseId, theme)]; },
    build(courseId, theme, level) { return [...(previous?.build?.(courseId, theme, level) || []), ...ownFor(courseId, theme, level)]; },
    initial: previous,
    review2: Object.freeze(questions.slice())
  });
})();

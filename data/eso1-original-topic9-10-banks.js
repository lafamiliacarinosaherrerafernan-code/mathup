(function () {
  "use strict";

  const BODIES = "documentos/1º ESO/Fuentes de ejercicios/9-Cuerpos geometricos/areas y volumenes de cuerpos geometricos_1ESO.pdf";
  const LINEAR = "documentos/1º ESO/Fuentes de ejercicios/10-Funciones/Ejercicios de Funcion Lineal 1ºESO.pdf";
  const FUNCTIONS_II = "documentos/1º ESO/Fuentes de ejercicios/10-Funciones/pdf_ 1º ESO Funciones ii.pdf";
  const FUNCTIONS_BOOK = "documentos/1º ESO/Fuentes de ejercicios/10-Funciones/pdf_ 1º ESO Funciones.pdf";
  const IMAGE_ROOT = "assets/exercises/1eso/originals";

  function question({
    id, topicId, subtopic, exerciseType, structureId, sourceDocument,
    sourceReference, level = "apprentice", text, options, solution,
    statementHtml = "", requiresVisual = false
  }) {
    return {
      rawBaseId: id,
      courseId: "1eso",
      topicId: `1eso:${topicId}`,
      topicIndex: topicId === "cuerpos-geometricos" ? 8 : 9,
      subtopic,
      exerciseType,
      structureId,
      sourceDocument,
      sourceReference,
      source: `Material original · ${sourceReference}`,
      sourceKind: "teacher-material",
      difficulty: level === "master" ? "hard" : "easy",
      challengeLevel: level,
      practiceEligible: true,
      examEligible: false,
      requiresVisual,
      solutionNeedsReview: false,
      text,
      ...(statementHtml ? { statementHtml } : {}),
      options,
      correct: 0,
      solution
    };
  }

  const bodies = [
    question({
      id: "1eso-original-bodies-01a", topicId: "cuerpos-geometricos", subtopic: "área de prismas",
      exerciseType: "area-cubo", structureId: "cube-total-area-from-edge", sourceDocument: BODIES,
      sourceReference: "p. 1, ejercicio 1.a", text: "Calcula el área del ortoedro del apartado a), cuyas longitudes vienen dadas en centímetros.",
      statementHtml: `<p>Calcula el área del ortoedro del apartado a), cuyas longitudes vienen dadas en centímetros.</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/cuerpos-ej1-ortoedros.png" alt="Dos ortoedros del ejercicio original; en el apartado a aparece un cubo de arista 6 centímetros">`,
      requiresVisual: true, options: ["216 cm²", "36 cm²", "144 cm²", "1.296 cm²"],
      solution: "Resolución:\n1. Es un cubo de arista 6 cm.\n2. Cada cara mide 6·6=36 cm².\n3. Tiene seis caras: 6·36=216 cm².\nResultado final: 216 cm²."
    }),
    question({
      id: "1eso-original-bodies-01b", topicId: "cuerpos-geometricos", subtopic: "área de prismas",
      exerciseType: "area-ortoedro", structureId: "cuboid-total-area-three-dimensions", sourceDocument: BODIES,
      sourceReference: "p. 1, ejercicio 1.b", text: "Calcula el área del ortoedro del apartado b), cuyas longitudes vienen dadas en centímetros.",
      statementHtml: `<p>Calcula el área del ortoedro del apartado b), cuyas longitudes vienen dadas en centímetros.</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/cuerpos-ej1-ortoedros.png" alt="Dos ortoedros del ejercicio original; el apartado b mide 5 por 2 por 1 centímetros">`,
      requiresVisual: true, options: ["34 cm²", "10 cm²", "20 cm²", "17 cm²"],
      solution: "Resolución:\n1. Las dimensiones son 5 cm, 2 cm y 1 cm.\n2. Área total: 2·(5·2+5·1+2·1).\n3. 2·(10+5+2)=34.\nResultado final: 34 cm²."
    }),
    question({
      id: "1eso-original-bodies-05", topicId: "cuerpos-geometricos", subtopic: "cilindros",
      exerciseType: "area-total-cilindro", structureId: "cylinder-total-area-diameter-height", sourceDocument: BODIES,
      sourceReference: "p. 1, ejercicio 5", text: "Dibuja un cilindro de 4 centímetros de diámetro y 6 centímetros de altura. Calcula su área total.",
      statementHtml: `<p>Dibuja un cilindro de 4 centímetros de diámetro y 6 centímetros de altura. Calcula su área total.</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/cuerpos-ej5-cilindro.png" alt="Cilindro de diámetro 4 centímetros y altura 6 centímetros">`,
      requiresVisual: true, options: ["32π cm²", "24π cm²", "48π cm²", "16π cm²"],
      solution: "Resolución:\n1. El radio es la mitad del diámetro: r=2 cm.\n2. Área lateral: 2πrh=2π·2·6=24π cm².\n3. Las dos bases suman 2πr²=2π·2²=8π cm².\n4. Área total: 24π+8π=32π cm².\nResultado final: 32π cm²."
    }),
    question({
      id: "1eso-original-bodies-06", topicId: "cuerpos-geometricos", subtopic: "cilindros",
      exerciseType: "area-lateral-cilindro", structureId: "cylinder-lateral-area-related-height", sourceDocument: BODIES,
      sourceReference: "p. 2, ejercicio 6", text: "El diámetro de un cilindro mide 5 centímetros, y su altura, el triple del radio. Calcula la superficie lateral.",
      options: ["37,5π cm²", "18,75π cm²", "75π cm²", "25π cm²"],
      solution: "Resolución:\n1. r=5:2=2,5 cm.\n2. h=3r=7,5 cm.\n3. Área lateral: 2πrh=2π·2,5·7,5=37,5π cm².\nResultado final: 37,5π cm²."
    }),
    question({
      id: "1eso-original-bodies-08", topicId: "cuerpos-geometricos", subtopic: "conos",
      exerciseType: "area-total-cono", structureId: "cone-total-area-radius-generatrix", sourceDocument: BODIES,
      sourceReference: "p. 2, ejercicio 8", text: "El radio de un cono mide 2,5 centímetros, y la generatriz, 7 centímetros. Calcula su área total.",
      options: ["23,75π cm²", "17,5π cm²", "30π cm²", "9,5π cm²"],
      solution: "Resolución:\n1. Área lateral: πrg=π·2,5·7=17,5π cm².\n2. Área de la base: πr²=π·2,5²=6,25π cm².\n3. Área total: 17,5π+6,25π=23,75π cm².\nResultado final: 23,75π cm²."
    }),
    question({
      id: "1eso-original-bodies-11a", topicId: "cuerpos-geometricos", subtopic: "esferas",
      exerciseType: "area-esfera", structureId: "sphere-area-from-radius", sourceDocument: BODIES,
      sourceReference: "p. 2, ejercicio 11.a", text: "Calcula el área de una esfera de radio 2 cm.",
      options: ["16π cm²", "8π cm²", "4π cm²", "32π cm²"],
      solution: "Resolución:\n1. El área de una esfera es A=4πr².\n2. A=4π·2²=4π·4=16π cm².\nResultado final: 16π cm²."
    }),
    question({
      id: "1eso-original-bodies-15a", topicId: "cuerpos-geometricos", subtopic: "unidades de volumen",
      exerciseType: "conversion-volumen", structureId: "cubic-centimetres-to-cubic-metres", sourceDocument: BODIES,
      sourceReference: "p. 2, ejercicio 15.a", text: "Expresa 250.000 cm³ en metros cúbicos.",
      options: ["0,25 m³", "2,5 m³", "25 m³", "0,025 m³"],
      solution: "Resolución:\n1. 1 m³=1.000.000 cm³.\n2. 250.000:1.000.000=0,25.\nResultado final: 0,25 m³."
    }),
    question({
      id: "1eso-original-bodies-17b", topicId: "cuerpos-geometricos", subtopic: "volumen y capacidad",
      exerciseType: "conversion-capacidad", structureId: "cubic-metres-to-litres", sourceDocument: BODIES,
      sourceReference: "p. 2, ejercicio 17.b", text: "Expresa 0,25 m³ en litros.",
      options: ["250 L", "25 L", "2.500 L", "0,25 L"],
      solution: "Resolución:\n1. 1 m³=1.000 L.\n2. 0,25·1.000=250.\nResultado final: 250 L."
    }),
    question({
      id: "1eso-original-bodies-19", topicId: "cuerpos-geometricos", subtopic: "volumen de prismas",
      exerciseType: "volumen-prisma-regular", structureId: "regular-hexagonal-prism-volume", sourceDocument: BODIES,
      sourceReference: "p. 2, ejercicio 19", level: "master", text: "Calcula el volumen de un prisma hexagonal regular, siendo el lado de su base 8 centímetros, la apotema 7 centímetros y la altura del prisma 20 centímetros.",
      options: ["3.360 cm³", "1.680 cm³", "6.720 cm³", "2.240 cm³"],
      solution: "Resolución:\n1. Perímetro de la base: 6·8=48 cm.\n2. Área de la base: (48·7):2=168 cm².\n3. Volumen: 168·20=3.360 cm³.\nResultado final: 3.360 cm³."
    }),
    question({
      id: "1eso-original-bodies-23a", topicId: "cuerpos-geometricos", subtopic: "volumen de cilindros",
      exerciseType: "volumen-cilindro", structureId: "cylinder-volume-radius-height", sourceDocument: BODIES,
      sourceReference: "p. 3, ejercicio 23.a", text: "Calcula el volumen de un cilindro de radio 5 cm y altura 12 cm.",
      options: ["300π cm³", "120π cm³", "60π cm³", "600π cm³"],
      solution: "Resolución:\n1. V=πr²h.\n2. V=π·5²·12=π·25·12=300π.\nResultado final: 300π cm³."
    }),
    question({
      id: "1eso-original-bodies-24b", topicId: "cuerpos-geometricos", subtopic: "volumen de conos",
      exerciseType: "volumen-cono", structureId: "cone-volume-diameter-generatrix", sourceDocument: BODIES,
      sourceReference: "p. 3, ejercicio 24.b", level: "master", text: "Calcula el volumen de un cono de diámetro 12 cm y generatriz 10 cm.",
      options: ["96π cm³", "288π cm³", "120π cm³", "48π cm³"],
      solution: "Resolución:\n1. r=6 cm.\n2. Por Pitágoras, h=√(10²−6²)=√64=8 cm.\n3. V=(πr²h):3=(π·36·8):3=96π cm³.\nResultado final: 96π cm³."
    }),
    question({
      id: "1eso-original-bodies-30", topicId: "cuerpos-geometricos", subtopic: "problemas de capacidad",
      exerciseType: "problema-prisma-capacidad-area", structureId: "container-capacity-to-surface", sourceDocument: BODIES,
      sourceReference: "p. 4, ejercicio 30", level: "master", text: "Queremos hacer un tetra brik de base cuadrada de 6 centímetros de lado y con capacidad de medio litro. ¿Cuánto cartón necesitamos?",
      options: ["405,33 cm²", "500 cm²", "333,33 cm²", "216 cm²"],
      solution: "Resolución:\n1. Medio litro son 500 cm³.\n2. Área de la base: 6²=36 cm².\n3. Altura: 500:36=125/9 cm.\n4. Área total: 2·36+4·6·(125/9)=405,33… cm².\nResultado final: 405,33 cm² aproximadamente."
    }),
    question({
      id: "1eso-original-bodies-57", topicId: "cuerpos-geometricos", subtopic: "problemas de áreas",
      exerciseType: "superficie-cubierta-libro", structureId: "open-cuboid-cover-area", sourceDocument: BODIES,
      sourceReference: "p. 7, ejercicio 57", text: "Se ha medido la cubierta de un libro y se han obtenido estos resultados: ancho, 18 centímetros; alto, 24 centímetros; lomo, 3,5. Calcula la superficie de cartulina de la cubierta.",
      options: ["948 cm²", "864 cm²", "1.032 cm²", "516 cm²"],
      solution: "Resolución:\n1. Las dos tapas miden 2·18·24=864 cm².\n2. El lomo mide 3,5·24=84 cm².\n3. Total: 864+84=948 cm².\nResultado final: 948 cm²."
    }),
    question({
      id: "1eso-original-bodies-64", topicId: "cuerpos-geometricos", subtopic: "volumen y recuento",
      exerciseType: "cubos-contenidos", structureId: "count-small-cubes-in-large-cube", sourceDocument: BODIES,
      sourceReference: "p. 8, ejercicio 64", text: "¿Cuántos cubos de 1/2 metro de arista caben en un cubo de 2 metros de arista?",
      options: ["64", "16", "8", "32"],
      solution: "Resolución:\n1. En cada arista caben 2:(1/2)=4 cubos.\n2. En las tres direcciones caben 4·4·4=64.\nResultado final: 64 cubos."
    }),
    question({
      id: "1eso-original-bodies-75d", topicId: "cuerpos-geometricos", subtopic: "cuerpos compuestos",
      exerciseType: "volumen-cuerpo-compuesto", structureId: "cylinder-plus-hemisphere-volume", sourceDocument: BODIES,
      sourceReference: "p. 9, ejercicio 75.d", level: "master", text: "Calcula el volumen del cuerpo del apartado d): un cilindro de 4 cm de diámetro y 6 cm de altura, coronado por una semiesfera de 2 cm de radio.",
      statementHtml: `<p>Calcula el volumen del cuerpo del apartado d).</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/cuerpos-ej75-volumenes.png" alt="Ejercicio original con varios cuerpos; el apartado d es un cilindro de radio 2 y altura 6 coronado por una semiesfera de radio 2">`,
      requiresVisual: true, options: ["88π/3 cm³", "80π/3 cm³", "32π cm³", "104π/3 cm³"],
      solution: "Resolución:\n1. Cilindro: V=π·2²·6=24π cm³.\n2. Semiesfera: V=(1/2)·(4/3)π·2³=16π/3 cm³.\n3. Sumamos: 24π+16π/3=88π/3 cm³.\nResultado final: 88π/3 cm³."
    })
  ];

  const functions = [
    question({
      id: "1eso-original-functions-book-04", topicId: "funciones", subtopic: "coordenadas",
      exerciseType: "cuadrantes", structureId: "identify-quadrant-from-coordinates", sourceDocument: FUNCTIONS_BOOK,
      sourceReference: "p. 3, ejercicio 4", text: "¿En qué cuadrante está situado el punto (−1, 7)?",
      options: ["Segundo cuadrante", "Primer cuadrante", "Tercer cuadrante", "Cuarto cuadrante"],
      solution: "Resolución:\n1. La coordenada x es negativa.\n2. La coordenada y es positiva.\n3. Los puntos (−,+) están en el segundo cuadrante.\nResultado final: segundo cuadrante."
    }),
    question({
      id: "1eso-original-functions-book-06a", topicId: "funciones", subtopic: "coordenadas",
      exerciseType: "leer-coordenadas", structureId: "read-point-from-coordinate-grid", sourceDocument: FUNCTIONS_BOOK,
      sourceReference: "p. 4, ejercicio 6, punto A", text: "Escribe las coordenadas del punto A señalado en el sistema de ejes.",
      statementHtml: `<p>Escribe las coordenadas del punto A señalado en el sistema de ejes.</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-libro-ej6-coordenadas.png" alt="Sistema de ejes con los puntos A, B, C, D, E, F, G y H">`,
      requiresVisual: true, options: ["A(4, 2)", "A(2, 4)", "A(4, −2)", "A(−4, 2)"],
      solution: "Resolución:\n1. Desde el origen avanzamos 4 unidades a la derecha: x=4.\n2. Subimos 2 unidades: y=2.\nResultado final: A(4, 2)."
    }),
    question({
      id: "1eso-original-functions-book-08", topicId: "funciones", subtopic: "interpretación de gráficas",
      exerciseType: "maximo-minimo-grafica", structureId: "read-weekly-maximum-from-graph", sourceDocument: FUNCTIONS_BOOK,
      sourceReference: "p. 9, ejercicio 8.c", text: "Según la gráfica, ¿qué días tuvieron la mayor temperatura de la semana?",
      statementHtml: `<p>Según la gráfica, ¿qué días tuvieron la mayor temperatura de la semana?</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-libro-ej8-temperaturas.png" alt="Gráfica de temperaturas de lunes a domingo">`,
      requiresVisual: true, options: ["Martes y sábado", "Lunes y jueves", "Miércoles y viernes", "Solo el sábado"],
      solution: "Resolución:\n1. Buscamos los puntos de mayor altura en la gráfica.\n2. El valor máximo es 40 °C.\n3. Se alcanza el martes y el sábado.\nResultado final: martes y sábado."
    }),
    question({
      id: "1eso-original-functions-ii-03", topicId: "funciones", subtopic: "interpretación de gráficas",
      exerciseType: "movimiento-en-grafica", structureId: "interpret-motion-direction-from-graph", sourceDocument: FUNCTIONS_II,
      sourceReference: "p. 2, ejercicio 3", level: "master", text: "En la carrera de caracoles, ¿qué afirmación describe correctamente un tramo de la gráfica?",
      statementHtml: `<p>En la carrera de caracoles, ¿qué afirmación describe correctamente un tramo de la gráfica?</p><img class="exercise-source-figure" src="${IMAGE_ROOT}/funciones-ej3-carrera-caracoles.png" alt="Gráfica distancia-tiempo de dos caracoles, uno rojo y otro verde">`,
      requiresVisual: true, options: ["El caracol rojo retrocede durante un tramo", "El caracol verde retrocede durante un tramo", "Los dos se mueven siempre a velocidad constante", "El caracol rojo permanece parado toda la carrera"],
      solution: "Resolución:\n1. En una gráfica distancia-tiempo, una bajada indica que disminuye la distancia recorrida.\n2. La línea roja presenta un tramo descendente.\n3. Por tanto, el caracol rojo marcha en dirección contraria durante ese tramo.\nResultado final: el caracol rojo retrocede durante un tramo."
    }),
    question({
      id: "1eso-original-linear-11c", topicId: "funciones", subtopic: "pendiente",
      exerciseType: "pendiente-expresion", structureId: "slope-from-explicit-equation", sourceDocument: LINEAR,
      sourceReference: "p. 3, ejercicio 11.c", text: "Indica cuál es la pendiente de la recta y=(2x+1)/2.",
      options: ["1", "2", "1/2", "−1"],
      solution: "Resolución:\n1. Separamos la fracción: y=(2/2)x+1/2.\n2. Queda y=x+1/2.\n3. En y=mx+n, la pendiente es m.\nResultado final: m=1."
    }),
    question({
      id: "1eso-original-linear-11d", topicId: "funciones", subtopic: "pendiente",
      exerciseType: "pendiente-forma-general", structureId: "slope-from-general-equation", sourceDocument: LINEAR,
      sourceReference: "p. 3, ejercicio 11.d", text: "Indica cuál es la pendiente de la recta 3x+4y=1.",
      options: ["−3/4", "3/4", "−4/3", "1/4"],
      solution: "Resolución:\n1. Despejamos y: 4y=−3x+1.\n2. y=−(3/4)x+1/4.\n3. El coeficiente de x es la pendiente.\nResultado final: m=−3/4."
    }),
    question({
      id: "1eso-original-linear-16a", topicId: "funciones", subtopic: "recta por dos puntos",
      exerciseType: "ecuacion-dos-puntos", structureId: "line-equation-from-two-points", sourceDocument: LINEAR,
      sourceReference: "p. 5, ejercicio 16.a", level: "master", text: "Escribe la ecuación de la recta que pasa por los puntos A(4, 7) y B(5, −1).",
      options: ["y=−8x+39", "y=8x−25", "y=−x+11", "y=8x+39"],
      solution: "Resolución:\n1. m=(−1−7)/(5−4)=−8.\n2. Usamos y=mx+n: y=−8x+n.\n3. Con A(4,7): 7=−32+n, luego n=39.\n4. Comprobación con B: −8·5+39=−1.\nResultado final: y=−8x+39."
    }),
    question({
      id: "1eso-original-linear-16b", topicId: "funciones", subtopic: "rectas paralelas",
      exerciseType: "paralela-por-punto", structureId: "parallel-line-through-point", sourceDocument: LINEAR,
      sourceReference: "p. 5, ejercicio 16.b", level: "master", text: "Escribe la ecuación de la recta paralela a y=3x que pasa por el punto P(2, 0).",
      options: ["y=3x−6", "y=−3x+6", "y=3x+2", "y=x−2"],
      solution: "Resolución:\n1. Las rectas paralelas tienen la misma pendiente: m=3.\n2. Escribimos y=3x+n.\n3. Sustituimos P(2,0): 0=6+n, luego n=−6.\nResultado final: y=3x−6."
    }),
    question({
      id: "1eso-original-linear-18b", topicId: "funciones", subtopic: "rectas horizontales",
      exerciseType: "paralela-eje-x", structureId: "horizontal-line-through-point", sourceDocument: LINEAR,
      sourceReference: "p. 5, ejercicio 18.b", text: "Halla la ecuación de la recta paralela al eje X que pasa por el punto P(4, 5).",
      options: ["y=5", "x=4", "y=4", "x=5"],
      solution: "Resolución:\n1. Una recta paralela al eje X es horizontal y tiene y constante.\n2. Como pasa por P(4,5), esa constante es 5.\nResultado final: y=5."
    }),
    question({
      id: "1eso-original-linear-19a", topicId: "funciones", subtopic: "proporcionalidad directa",
      exerciseType: "funcion-proporcionalidad", structureId: "direct-proportion-line-through-point", sourceDocument: LINEAR,
      sourceReference: "p. 6, ejercicio 19.a", text: "Halla la ecuación de la función de proporcionalidad que pasa por el punto (3, 2).",
      options: ["y=(2/3)x", "y=(3/2)x", "y=2x+3", "y=(2/3)x+3"],
      solution: "Resolución:\n1. Una función de proporcionalidad tiene la forma y=mx.\n2. Sustituimos (3,2): 2=3m.\n3. m=2/3.\nResultado final: y=(2/3)x."
    }),
    question({
      id: "1eso-original-linear-19b", topicId: "funciones", subtopic: "recta por dos puntos",
      exerciseType: "ecuacion-dos-puntos", structureId: "line-two-points-unit-slope", sourceDocument: LINEAR,
      sourceReference: "p. 6, ejercicio 19.b", text: "Halla la ecuación de la recta que pasa por los puntos P(2, −1) y Q(5, 2).",
      options: ["y=x−3", "y=x+3", "y=3x−7", "y=−x+1"],
      solution: "Resolución:\n1. m=(2−(−1))/(5−2)=3/3=1.\n2. y=x+n.\n3. Con P(2,−1): −1=2+n, luego n=−3.\nResultado final: y=x−3."
    }),
    question({
      id: "1eso-original-linear-20a", topicId: "funciones", subtopic: "pendiente y ordenada",
      exerciseType: "ecuacion-pendiente-ordenada", structureId: "line-from-slope-and-intercept", sourceDocument: LINEAR,
      sourceReference: "p. 6, ejercicio 20.a", text: "Halla la ecuación de la recta que tiene pendiente −2 y corta al eje Y en el punto (0, 3).",
      options: ["y=−2x+3", "y=2x+3", "y=−2x−3", "y=3x−2"],
      solution: "Resolución:\n1. En y=mx+n, m es la pendiente y n la ordenada en el origen.\n2. Sustituimos m=−2 y n=3.\nResultado final: y=−2x+3."
    }),
    question({
      id: "1eso-original-linear-21", topicId: "funciones", subtopic: "problemas de proporcionalidad",
      exerciseType: "modelo-lineal-precio", structureId: "unit-price-linear-model", sourceDocument: LINEAR,
      sourceReference: "p. 6, ejercicio 21", text: "Tres kilos de peras cuestan 4,5 € y siete kilos costarían 10,5 €. ¿Cuánto costarían 5 kg de peras?",
      options: ["7,5 €", "6 €", "8,5 €", "15 €"],
      solution: "Resolución:\n1. Precio por kilo: 4,5:3=1,5 €/kg; también 10,5:7=1,5 €/kg.\n2. La función es y=1,5x.\n3. Para x=5: y=1,5·5=7,5.\nResultado final: 7,5 €."
    }),
    question({
      id: "1eso-original-linear-23", topicId: "funciones", subtopic: "función afín contextualizada",
      exerciseType: "modelo-afin-cuota-fija", structureId: "fixed-fee-plus-rate-model", sourceDocument: LINEAR,
      sourceReference: "p. 6, ejercicio 23", text: "Un técnico de reparaciones cobra 25 € por la visita, más 20 € por cada hora de trabajo. ¿Cuánto hay que pagar si trabaja 3 horas?",
      options: ["85 €", "60 €", "75 €", "95 €"],
      solution: "Resolución:\n1. La cuota fija es 25 € y el coste por hora es 20 €.\n2. La función es y=20x+25.\n3. Para x=3: y=20·3+25=85.\nResultado final: 85 €."
    }),
    question({
      id: "1eso-original-linear-24", topicId: "funciones", subtopic: "función afín contextualizada",
      exerciseType: "modelo-distancia-tiempo", structureId: "initial-distance-plus-constant-speed", sourceDocument: LINEAR,
      sourceReference: "p. 6, ejercicio 24", text: "Rocío sale en bici desde una plaza situada a 6 m de su casa y avanza a velocidad constante de 3 m/s. ¿A qué distancia de su casa estará al cabo de 10 segundos?",
      options: ["36 m", "30 m", "16 m", "60 m"],
      solution: "Resolución:\n1. Parte a 6 m de su casa.\n2. En x segundos avanza 3x metros: y=3x+6.\n3. Para x=10: y=30+6=36.\nResultado final: 36 m."
    }),
    question({
      id: "1eso-original-linear-25", topicId: "funciones", subtopic: "función afín contextualizada",
      exerciseType: "conversion-temperatura-lineal", structureId: "derive-affine-rule-from-two-values", sourceDocument: LINEAR,
      sourceReference: "p. 7, ejercicio 25", level: "master", text: "Sabiendo que 0 °C son 32 °F y que 10 °C son 50 °F, ¿cuántos grados Fahrenheit son 20 °C?",
      options: ["68 °F", "64 °F", "72 °F", "82 °F"],
      solution: "Resolución:\n1. m=(50−32)/(10−0)=18/10=1,8.\n2. Como para x=0 se obtiene 32, la función es y=1,8x+32.\n3. Para x=20: y=1,8·20+32=68.\nResultado final: 68 °F."
    }),
    question({
      id: "1eso-original-functions-ii-04b", topicId: "funciones", subtopic: "fórmula desde tabla",
      exerciseType: "obtener-formula-tabla", structureId: "affine-formula-from-decreasing-x-table", sourceDocument: FUNCTIONS_II,
      sourceReference: "p. 2, ejercicio 4, segunda tabla", level: "master", text: "La tabla contiene los pares (4,1), (3,3), (2,5) y (1,7). Halla la expresión de la función.",
      options: ["y=−2x+9", "y=2x−7", "y=−x+5", "y=2x+1"],
      solution: "Resolución:\n1. Cuando x disminuye 1, y aumenta 2; por tanto, la pendiente es −2.\n2. Escribimos y=−2x+n.\n3. Con (4,1): 1=−8+n, luego n=9.\n4. Comprobación con (1,7): −2+9=7.\nResultado final: y=−2x+9."
    }),
    question({
      id: "1eso-original-functions-ii-04c", topicId: "funciones", subtopic: "fórmula desde tabla",
      exerciseType: "obtener-formula-tabla", structureId: "affine-formula-from-constant-differences", sourceDocument: FUNCTIONS_II,
      sourceReference: "p. 2, ejercicio 4, tercera tabla", text: "La tabla contiene los pares (1,5), (2,8), (3,11) y (4,14). Halla la expresión de la función.",
      options: ["y=3x+2", "y=2x+3", "y=3x−2", "y=x+4"],
      solution: "Resolución:\n1. Al aumentar x una unidad, y aumenta 3: m=3.\n2. y=3x+n.\n3. Con (1,5): 5=3+n, luego n=2.\nResultado final: y=3x+2."
    })
  ];

  const banks = {
    "1eso::cuerpos geometricos": bodies,
    "1eso::funciones": functions
  };

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }

  window.MargaritaEsoOriginalPractice = {
    build(courseId, theme, level = "apprentice") {
      return (banks[`${courseId}::${normalize(theme)}`] || [])
        .filter((item) => item.challengeLevel === level)
        .map((item) => ({ ...item }));
    },
    all(courseId, theme) {
      return (banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }));
    },
    count: bodies.length + functions.length
  };
})();

(function () {
  "use strict";

  const documentPrefix = "documentos/1º BACHILLERATO CCSSI/";

  function originalQuestion({
    id,
    topicIndex,
    sourceDocument,
    sourceExercise,
    subtopic,
    exerciseType,
    structureId,
    difficulty = "ordinary",
    text,
    options
  }) {
    return {
      id,
      text,
      options,
      correct: 0,
      solution: `Resultado final: ${options[0]}.`,
      solutionNeedsReview: true,
      courseId: "1bach-ccss",
      topicIndex,
      subtopic,
      exerciseType,
      structureId,
      difficulty,
      sourceType: "original-ccss-i",
      sourceDocument: `${documentPrefix}${sourceDocument}.doc`,
      sourceExercise,
      source: `Documento original del profesor · ${sourceDocument} · ${sourceExercise}`
    };
  }

  const statisticsDocument = "1-Estadística Unidimensional y Bidimensional Ejercicios";
  const probabilityDocument = "2-Probabilidad Ejercicios";
  const binomialDocument = "3-Distribución de probabilidad. Distribución Binomial Ejercicios";
  const normalDocument = "4-Distribuciones continuas. Distribuición normal Ejercicios";
  const realDocument = "5-Nº Reales Ejercicios";
  const equationsDocument = "7- Ecuaciones y Sistemas Ejercicios";
  const inequalitiesDocument = "8- Inecuaciones y Sistemas Ejercicios";

  const statistics = [
    ["paises", "Los países visitados por un grupo de personas.", "Cualitativa", "Cuantitativa discreta", "Cuantitativa continua", "Cualitativa ordinal"],
    ["asignatura", "La asignatura que más gusta a un grupo de amigos.", "Cualitativa", "Cuantitativa discreta", "Cuantitativa continua", "Cualitativa ordinal"],
    ["puntuaciones", "La puntuación de los exámenes de Matemáticas.", "Cuantitativa discreta", "Cualitativa nominal", "Cuantitativa continua", "Cualitativa ordinal"],
    ["habitantes", "El número de habitantes de una población.", "Cuantitativa discreta", "Cualitativa nominal", "Cuantitativa continua", "Cualitativa ordinal"],
    ["altura", "La altura de un grupo de amigos.", "Cuantitativa continua", "Cuantitativa discreta", "Cualitativa nominal", "Cualitativa ordinal"],
    ["tiempos", "Los tiempos que tarda una clase en recorrer 100 metros.", "Cuantitativa continua", "Cuantitativa discreta", "Cualitativa nominal", "Cualitativa ordinal"]
  ].map(([suffix, variable, answer, b, c, d], index) => originalQuestion({
    id: `ccss-i-original-stat-variable-${suffix}`,
    topicIndex: 0,
    sourceDocument: statisticsDocument,
    sourceExercise: `Variables cualitativas o cuantitativas · apartado ${index + 2}`,
    subtopic: "Tipos de variables",
    exerciseType: "clasificacion-variable",
    structureId: "stat-variable-qual-quant",
    difficulty: "basic",
    text: `Indica si la siguiente variable es cualitativa o cuantitativa: ${variable}`,
    options: [answer, b, c, d]
  }));

  statistics.push(...[
    ["posicion", "La posición de 7 atletas tras finalizar la carrera.", "Cualitativa ordinal"],
    ["estado-civil", "El estado civil de una persona (soltera, casada, viuda o divorciada).", "Cualitativa nominal"],
    ["calificacion", "La calificación de un examen en suspenso, bien, notable o sobresaliente.", "Cualitativa ordinal"],
    ["profesion", "La profesión de un grupo de personas.", "Cualitativa nominal"]
  ].map(([suffix, variable, answer], index) => originalQuestion({
    id: `ccss-i-original-stat-nominal-ordinal-${suffix}`,
    topicIndex: 0,
    sourceDocument: statisticsDocument,
    sourceExercise: `Variables nominales u ordinales · apartado ${index + 1}`,
    subtopic: "Tipos de variables",
    exerciseType: "clasificacion-cualitativa",
    structureId: "stat-nominal-ordinal",
    difficulty: "basic",
    text: `Indica si la siguiente variable cualitativa es nominal u ordinal: ${variable}`,
    options: [answer, answer.includes("nominal") ? "Cualitativa ordinal" : "Cualitativa nominal", "Cuantitativa discreta", "Cuantitativa continua"]
  })));

  statistics.push(...[
    ["temperatura", "La temperatura registrada cada día a lo largo de un año.", "Cuantitativa continua"],
    ["consumo", "El consumo de gasolina cada 100 km de distintos coches.", "Cuantitativa continua"],
    ["metros", "Los metros cuadrados de las viviendas de un pueblo.", "Cuantitativa continua"],
    ["dado", "El resultado al tirar un dado diez veces.", "Cuantitativa discreta"],
    ["libros", "El número de libros leídos.", "Cuantitativa discreta"],
    ["puntos", "El número de puntos que obtienen los equipos de fútbol al finalizar la liga.", "Cuantitativa discreta"]
  ].map(([suffix, variable, answer], index) => originalQuestion({
    id: `ccss-i-original-stat-discrete-continuous-${suffix}`,
    topicIndex: 0,
    sourceDocument: statisticsDocument,
    sourceExercise: `Variables discretas o continuas · apartado ${index + 1}`,
    subtopic: "Tipos de variables",
    exerciseType: "clasificacion-cuantitativa",
    structureId: "stat-discrete-continuous",
    difficulty: "basic",
    text: `Indica si la siguiente variable cuantitativa es discreta o continua: ${variable}`,
    options: [answer, answer.includes("discreta") ? "Cuantitativa continua" : "Cuantitativa discreta", "Cualitativa nominal", "Cualitativa ordinal"]
  })));

  statistics.push(
    originalQuestion({
      id: "ccss-i-original-stat-weighted-grade",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Nota final ponderada",
      subtopic: "Media ponderada",
      exerciseType: "media-ponderada-tabla",
      structureId: "stat-weighted-mean",
      text: "Las notas y pesos de un alumno son: Operativa 9 (peso 5), Medida 7 (peso 3), Problemas 6 (peso 4), Estadística 8 (peso 2) y Tareas y trabajos 10 (peso 1). ¿Cuál será la nota final?",
      options: ["116/15 ≈ 7,73", "8", "7,50", "40/5 = 8"]
    }),
    ...[
      ["mean", "media aritmética", "5"],
      ["median", "mediana", "5"],
      ["mode", "moda", "8"],
      ["range", "rango", "8"],
      ["variance", "varianza poblacional", "144/23 ≈ 6,26"],
      ["standard-deviation", "desviación típica poblacional", "≈ 2,50"]
    ].map(([suffix, measure, answer]) => originalQuestion({
      id: `ccss-i-original-stat-dataset-${suffix}`,
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: `Serie 2, 6, 6, 5, 4, 7, 8, 8, 2, 1, 1, 5, 6, 4, 4, 9, 8, 2, 2, 3, 6, 8, 8 · ${measure}`,
      subtopic: "Parámetros estadísticos",
      exerciseType: `calculo-${suffix}`,
      structureId: `stat-raw-data-${suffix}`,
      text: `Calcula la ${measure} de los datos: 2, 6, 6, 5, 4, 7, 8, 8, 2, 1, 1, 5, 6, 4, 4, 9, 8, 2, 2, 3, 6, 8, 8.`,
      options: [answer, suffix === "mean" ? "5,5" : "6", suffix === "range" ? "9" : "4", suffix === "mode" ? "6" : "8"]
    })),
    originalQuestion({
      id: "ccss-i-original-stat-regression-hours-correlation",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Notas en función de las horas estudiadas · correlación",
      subtopic: "Correlación y regresión",
      exerciseType: "coeficiente-correlacion",
      structureId: "stat-bivariate-correlation",
      difficulty: "advanced",
      text: "Las notas son 1, 5, 7, 6, 8, 8 y 9 para 0,5; 1,5; 3; 3; 4; 5 y 6 horas de estudio, respectivamente. Calcula el coeficiente de correlación lineal.",
      options: ["r ≈ 0,921", "r ≈ -0,921", "r ≈ 0,296", "r = 1"]
    }),
    originalQuestion({
      id: "ccss-i-original-stat-regression-hours-line",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Notas en función de las horas estudiadas · recta de regresión",
      subtopic: "Correlación y regresión",
      exerciseType: "recta-regresion",
      structureId: "stat-bivariate-regression-line",
      difficulty: "advanced",
      text: "Las notas son 1, 5, 7, 6, 8, 8 y 9 para 0,5; 1,5; 3; 3; 4; 5 y 6 horas de estudio, respectivamente. Calcula la recta de regresión de las notas sobre las horas.",
      options: ["y ≈ 2,026 + 1,296x", "y ≈ 1,296 + 2,026x", "y ≈ 6,286 + 3,286x", "y ≈ 2,026 - 1,296x"]
    }),
    originalQuestion({
      id: "ccss-i-original-stat-regression-hours-prediction",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Notas en función de las horas estudiadas · predicción",
      subtopic: "Correlación y regresión",
      exerciseType: "prediccion-regresion",
      structureId: "stat-bivariate-regression-prediction",
      difficulty: "advanced",
      text: "Las notas son 1, 5, 7, 6, 8, 8 y 9 para 0,5; 1,5; 3; 3; 4; 5 y 6 horas de estudio, respectivamente. Según la recta de regresión, ¿qué nota se obtendría para siete horas?",
      options: ["≈ 11,10; es una extrapolación y debe interpretarse con cautela", "≈ 9,00", "≈ 7,00", "≈ 6,29"]
    }),
    originalQuestion({
      id: "ccss-i-original-stat-die20-frequency-table",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Veinte lanzamientos de un dado · tabla de frecuencias",
      subtopic: "Tablas de frecuencias",
      exerciseType: "tabla-frecuencias-no-agrupada",
      structureId: "stat-frequency-table-discrete",
      text: "Al tirar un dado 20 veces se obtienen: 1, 5, 3, 2, 2, 6, 2, 4, 5, 3, 1, 2, 5, 6, 4, 1, 2, 3, 4, 6. ¿Cuáles son las frecuencias absolutas de 1, 2, 3, 4, 5 y 6?",
      options: ["3, 5, 3, 3, 3, 3", "3, 4, 3, 3, 4, 3", "5, 3, 3, 3, 3, 3", "3, 5, 2, 4, 3, 3"]
    }),
    originalQuestion({
      id: "ccss-i-original-stat-die20-mean-cv",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Veinte lanzamientos de un dado · media y coeficiente de variación",
      subtopic: "Parámetros estadísticos",
      exerciseType: "media-desviacion-coeficiente-variacion",
      structureId: "stat-discrete-mean-cv",
      text: "Al tirar un dado 20 veces se obtienen: 1, 5, 3, 2, 2, 6, 2, 4, 5, 3, 1, 2, 5, 6, 4, 1, 2, 3, 4, 6. Calcula la media y el coeficiente de variación.",
      options: ["Media = 3,35; CV ≈ 50,19 %", "Media = 3,50; CV ≈ 16,82 %", "Media = 3,35; CV ≈ 1,68 %", "Media = 4; CV = 50 %"]
    }),
    originalQuestion({
      id: "ccss-i-original-stat-heights-grouped-counts",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Alturas de un grupo de amigos · agrupación en cuatro clases",
      subtopic: "Datos agrupados",
      exerciseType: "frecuencias-datos-agrupados",
      structureId: "stat-grouped-class-frequencies",
      text: "Las alturas, en cm, son 120, 131, 135, 133, 135, 134, 133, 136, 134, 135, 120, 130, 122, 129, 131, 132, 140, 137 y 126. Agrupa en [120,125), [125,130), [130,135) y [135,140] y calcula las frecuencias absolutas.",
      options: ["3, 2, 8, 6", "2, 3, 8, 6", "3, 3, 7, 6", "3, 2, 7, 7"]
    }),
    originalQuestion({
      id: "ccss-i-original-stat-athletes-grouped-counts",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Kilómetros semanales de atletas · agrupación",
      subtopic: "Datos agrupados",
      exerciseType: "frecuencias-datos-agrupados",
      structureId: "stat-grouped-athletes-frequencies",
      text: "Los kilómetros semanales son 100,7; 75,8; 85,3; 100,9; 120,5; 90,5; 98,9; 105,1; 102,2; 70,3; 108,4; 130,3; 68,7; 80,4; 60,7; 80,6; 70,5; 96,4; 93,5; 88,6; 90,8; 100; 81,5 y 96,5. Agrupa en [60,80), [80,100), [100,120) y [120,140] y calcula las frecuencias.",
      options: ["5, 11, 6, 2", "5, 10, 7, 2", "6, 10, 6, 2", "5, 11, 5, 3"]
    }),
    originalQuestion({
      id: "ccss-i-original-stat-exercise-grouped-counts",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Horas semanales de ejercicio · agrupación",
      subtopic: "Datos agrupados",
      exerciseType: "frecuencias-datos-agrupados",
      structureId: "stat-grouped-exercise-time-frequencies",
      text: "Las horas semanales son 3; 1,5; 8; 4,5; 4; 3,75; 3; 8,5; 9; 2; 2; 2,25; 3; 0; 0,5; 1; 1; 2,5; 2; 7; 1,5; 3,25; 3,5; 3,5; 3 y 2. Agrupa en [0,2), [2,4), [4,6), [6,8) y [8,10] y calcula las frecuencias.",
      options: ["6, 14, 2, 1, 3", "6, 13, 3, 1, 3", "5, 14, 2, 2, 3", "6, 14, 1, 2, 3"]
    }),
    originalQuestion({
      id: "ccss-i-original-stat-grades-grouped-counts",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Notas de Matemáticas · agrupación",
      subtopic: "Datos agrupados",
      exerciseType: "frecuencias-datos-agrupados",
      structureId: "stat-grouped-grades-frequencies",
      text: "Las notas son 2,8; 4,5; 3; 5,8; 6,5; 7; 7,8; 2; 8,8; 10; 4,8; 3,5; 4,2; 8,5; 0; 9,5; 6,6; 7; 5; 6,8; 6,5; 7,5; 8; 6,9; 7; 5,5; 6; 6; 7,5 y 1,3. Agrupa en [0,2), [2,4), [4,6), [6,8) y [8,10] y calcula las frecuencias.",
      options: ["2, 4, 6, 13, 5", "2, 5, 6, 12, 5", "3, 4, 5, 13, 5", "2, 4, 7, 12, 5"]
    }),
    originalQuestion({
      id: "ccss-i-original-stat-grouped-travel-total-mean",
      topicIndex: 0,
      sourceDocument: statisticsDocument,
      sourceExercise: "Tiempo para llegar al colegio · tabla agrupada",
      subtopic: "Datos agrupados",
      exerciseType: "media-datos-agrupados",
      structureId: "stat-grouped-midpoint-mean",
      text: "El tiempo para llegar al colegio está agrupado así: [0,10): 15; [10,20): 20; [20,30): 10; [30,40): 6; [40,50): 3; [50,60): 1. Calcula el número total de alumnos y la media aproximada usando las marcas de clase.",
      options: ["55 alumnos; media ≈ 18,64 min", "55 alumnos; media = 20 min", "54 alumnos; media ≈ 18,64 min", "55 alumnos; media ≈ 25 min"]
    })
  );

  const probability = [
    ["urn-red-red", "En una urna hay 4 bolas rojas, 3 blancas y 5 negras. Se extraen dos sin reemplazamiento. ¿Cuál es la probabilidad de que las dos sean rojas?", "1/11", "3/22", "2/11", "1/9", "extracciones-sin-reemplazamiento"],
    ["urn-white-white", "En una urna hay 4 bolas rojas, 3 blancas y 5 negras. Se extraen dos sin reemplazamiento. ¿Cuál es la probabilidad de que las dos sean blancas?", "1/22", "1/11", "3/22", "1/16", "extracciones-sin-reemplazamiento"],
    ["urn-red-or-white", "En una urna hay 4 bolas rojas, 3 blancas y 5 negras. Se extraen dos sin reemplazamiento. ¿Cuál es la probabilidad de que sean las dos rojas o las dos blancas?", "3/22", "1/11", "5/22", "7/12", "union-sucesos"],
    ["urn-no-white", "En una urna hay 4 bolas rojas, 3 blancas y 5 negras. Se extraen dos sin reemplazamiento. ¿Cuál es la probabilidad de que ninguna sea blanca?", "6/11", "3/4", "9/16", "5/11", "complementario-sin-reemplazamiento"],
    ["biased-die-six", "Un dado está trucado de modo que cada cara impar tiene el doble de probabilidad que cada cara par. Calcula la probabilidad de sacar un seis.", "1/9", "1/6", "2/9", "1/3", "equiprobabilidad-ponderada"],
    ["biased-die-even", "Un dado está trucado de modo que cada cara impar tiene el doble de probabilidad que cada cara par. Calcula la probabilidad de obtener un número par.", "1/3", "1/2", "2/3", "1/9", "equiprobabilidad-ponderada"],
    ["sisters-union", "Beatriz y Azucena tienen probabilidades 2/3 y 3/4 de aprobar. La probabilidad de que ambas aprueben es 4/6. ¿Cuál es la probabilidad de que apruebe una u otra?", "3/4", "17/12", "1/2", "2/3", "union-con-interseccion"],
    ["sisters-fail", "Beatriz y Azucena tienen probabilidades 2/3 y 3/4 de aprobar. La probabilidad de que ambas aprueben es 4/6. ¿Cuál es la probabilidad de que suspendan simultáneamente?", "1/4", "1/12", "1/6", "1/3", "complementario-union"],
    ["class-boy-brown", "En una clase hay 40 alumnos: 15 niños y 25 niñas. Hay 5 niños rubios y 5 niñas rubias; el resto son castaños. Calcula la probabilidad de elegir un niño o una persona castaña.", "7/8", "3/4", "5/8", "1/2", "tabla-contingencia-union"],
    ["class-girl-given-blonde", "En una clase hay 40 alumnos: 15 niños y 25 niñas. Hay 5 niños rubios y 5 niñas rubias. Si la persona elegida es rubia, calcula la probabilidad de que sea niña.", "1/2", "1/4", "5/8", "1/8", "condicionada-tabla"],
    ["options-boy", "El 60 % estudia Matemáticas B y el 40 % Matemáticas A. En B, el 80 % son chicas; en A, el 70 % son chicos. Calcula la probabilidad de elegir un chico.", "0,40", "0,52", "0,30", "0,60", "probabilidad-total"],
    ["options-boy-given-b", "El 60 % estudia Matemáticas B y el 40 % Matemáticas A. En B, el 80 % son chicas; en A, el 70 % son chicos. Si cursa B, calcula la probabilidad de que sea chico.", "0,20", "0,40", "0,30", "0,80", "condicionada-directa"],
    ["options-union", "El 60 % estudia Matemáticas B y el 40 % Matemáticas A. En B, el 80 % son chicas; en A, el 70 % son chicos. Calcula la probabilidad de que sea un chico de A o una chica de B.", "0,76", "0,52", "0,48", "0,88", "arbol-union"],
    ["spanish-deck-two-golds", "De una baraja española de 40 cartas se sacan dos sin reemplazamiento. Determina la probabilidad de que las dos sean de oros.", "3/52", "1/16", "9/52", "1/4", "baraja-sin-reemplazamiento"],
    ["spanish-deck-at-least-one-gold", "De una baraja española de 40 cartas se sacan dos sin reemplazamiento. Determina la probabilidad de que al menos una sea de oros.", "23/52", "3/52", "1/2", "7/13", "complementario"],
    ["urn-three-red", "Una urna contiene 8 bolas rojas y 16 azules. Se extraen tres sin reposición. Calcula la probabilidad de que las tres sean rojas.", "7/253", "1/27", "8/253", "1/3", "hipergeometrica"],
    ["urn-two-red-one-blue", "Una urna contiene 8 bolas rojas y 16 azules. Se extraen tres sin reposición. Calcula la probabilidad de obtener dos rojas y una azul.", "56/253", "8/27", "16/253", "2/9", "hipergeometrica"],
    ["urn-at-least-blue", "Una urna contiene 8 bolas rojas y 16 azules. Se extraen tres sin reposición. Calcula la probabilidad de que al menos una sea azul.", "246/253", "19/27", "7/253", "2/3", "complementario"],
    ["three-dice-six", "Se elige al azar uno de tres dados. Uno es corriente y en cada uno de los otros dos la probabilidad de obtener un seis es 0,8. ¿Cuál es la probabilidad de obtener un seis?", "53/90", "8/15", "3/5", "4/5", "probabilidad-total"],
    ["machine-failure-accident", "Una máquina funciona bien con probabilidad 0,98. Si funciona bien, no hay accidente con probabilidad 0,9; si falla, hay accidente con probabilidad 0,6. Si ha ocurrido un accidente, ¿cuál es la probabilidad de que la máquina haya fallado?", "6/55 ≈ 0,1091", "0,02", "0,12", "0,60", "bayes"],
    ["machine-good-no-accident", "Una máquina funciona bien con probabilidad 0,98. Si funciona bien, no hay accidente con probabilidad 0,9; si falla, hay accidente con probabilidad 0,6. Si no ha ocurrido un accidente, ¿cuál es la probabilidad de que la máquina funcione bien?", "441/445 ≈ 0,9910", "0,98", "0,90", "0,40", "bayes"],
    ["books-second-math", "En una librería hay 25 libros de historia, 40 de cocina y 20 de Matemáticas. Beatriz toma uno al azar y después Azucena toma otro, sin reposición. ¿Cuál es la probabilidad de que Azucena se lleve uno de Matemáticas?", "4/17", "19/84", "20/84", "1/4", "simetria-extracciones"],
    ["books-second-cooking", "En una librería hay 25 libros de historia, 40 de cocina y 20 de Matemáticas. Beatriz toma uno al azar y después Azucena toma otro, sin reposición. ¿Cuál es la probabilidad de que Azucena se lleve uno de cocina?", "8/17", "40/84", "1/2", "5/17", "simetria-extracciones"],
    ["books-first-math-given-second", "En una librería hay 25 libros de historia, 40 de cocina y 20 de Matemáticas. Beatriz toma uno al azar y después Azucena toma otro, sin reposición. Si Azucena toma uno de Matemáticas, ¿cuál es la probabilidad de que Beatriz también tomara uno de Matemáticas?", "19/84", "4/17", "20/85", "1/4", "condicionada-sin-reemplazamiento"]
  ].map(([suffix, text, a, b, c, d, structureId], index) => originalQuestion({
    id: `ccss-i-original-prob-${suffix}`,
    topicIndex: 1,
    sourceDocument: probabilityDocument,
    sourceExercise: `Ejercicio contextual · apartado recuperado ${index + 1}`,
    subtopic: structureId.includes("bayes") ? "Teorema de Bayes" : structureId.includes("total") ? "Probabilidad total" : structureId.includes("condicionada") ? "Probabilidad condicionada" : "Experimentos y sucesos",
    exerciseType: structureId,
    structureId: `prob-${structureId}`,
    difficulty: structureId.includes("bayes") || structureId.includes("hiper") ? "advanced" : "ordinary",
    text,
    options: [a, b, c, d]
  }));

  const binomial = [
    ["beatriz-more-two", "La probabilidad de que Beatriz suspenda un examen es 0,05. Durante el año hace 6 exámenes independientes. ¿Qué probabilidad hay de que suspenda más de dos?", "≈ 0,00223", "≈ 0,03054", "≈ 0,73509", "0,30", "binomial-tail"],
    ["beatriz-all-pass", "La probabilidad de que Beatriz suspenda un examen es 0,05. Durante el año hace 6 exámenes independientes. ¿Qué probabilidad hay de que apruebe todos?", "0,95⁶ ≈ 0,73509", "0,05⁶", "≈ 0,26491", "0,70", "binomial-exact"],
    ["beatriz-mean", "La probabilidad de que Beatriz suspenda un examen es 0,05. Durante el año hace 6 exámenes independientes. ¿Cuál es la media del número de suspensos?", "0,30", "5,70", "0,05", "6", "binomial-mean"],
    ["beatriz-variance", "La probabilidad de que Beatriz suspenda un examen es 0,05. Durante el año hace 6 exámenes independientes. ¿Cuál es la varianza del número de suspensos?", "0,285", "0,30", "0,5339", "5,415", "binomial-variance"],
    ["screws-at-most-three", "En una fábrica, el 2 % de los tornillos son defectuosos y se distribuyen en cajas de 80. Calcula la probabilidad de que una caja tenga como máximo 3 defectuosos.", "≈ 0,92315", "≈ 0,07685", "0,40", "1,60", "binomial-cumulative"],
    ["screws-mean", "En una fábrica, el 2 % de los tornillos son defectuosos y se distribuyen en cajas de 80. Calcula el número medio de defectuosos por caja.", "1,6", "0,02", "78,4", "3", "binomial-mean"],
    ["screws-standard-deviation", "En una fábrica, el 2 % de los tornillos son defectuosos y se distribuyen en cajas de 80. Calcula la desviación típica del número de defectuosos.", "≈ 1,252", "1,6", "≈ 1,568", "0,02", "binomial-standard-deviation"],
    ["students-all-ten", "La probabilidad de que un estudiante de 4.º de ESO continúe con Matemáticas en Bachillerato es 0,3. Si se eligen 10 estudiantes, calcula la probabilidad de que los 10 elijan Matemáticas.", "0,3¹⁰ ≈ 0,000005905", "0,3", "0,7¹⁰", "≈ 0,02825", "binomial-exact"],
    ["students-at-least-three", "La probabilidad de que un estudiante de 4.º de ESO continúe con Matemáticas en Bachillerato es 0,3. Si se eligen 10 estudiantes, calcula la probabilidad de que al menos 3 elijan Matemáticas.", "≈ 0,61722", "≈ 0,38278", "0,30", "0,70", "binomial-complement"],
    ["renting-at-most-two", "Una empresa contrata 26 coches. La probabilidad de que uno sea defectuoso es 0,02. Calcula la probabilidad de que haya a lo sumo dos defectuosos.", "≈ 0,98525", "≈ 0,01475", "0,52", "0,98²⁶", "binomial-cumulative"],
    ["renting-expected", "Una empresa contrata 26 coches. La probabilidad de que uno sea defectuoso es 0,02. ¿Cuántos cabe esperar que sean defectuosos?", "0,52", "2", "25,48", "0,02", "binomial-mean"],
    ["blood-expected", "Un hospital dispone de 20 bolsas de sangre y la proporción del grupo O− es 0,06. ¿Cuántas bolsas O− cabe esperar?", "1,2", "0,06", "18,8", "6", "binomial-mean"],
    ["blood-at-least-one", "Un hospital dispone de 20 bolsas de sangre y la proporción del grupo O− es 0,06. ¿Cuál es la probabilidad de disponer de al menos una bolsa O−?", "1 - 0,94²⁰ ≈ 0,70989", "0,94²⁰", "0,06²⁰", "0,30", "binomial-complement"],
    ["coin-six-heads", "Se lanza seis veces una moneda trucada cuya probabilidad de cara es 0,8. ¿Qué probabilidad hay de obtener seis caras?", "0,8⁶ = 0,262144", "0,2⁶", "0,8", "0,737856", "binomial-exact"],
    ["coin-at-least-tail", "Se lanza seis veces una moneda trucada cuya probabilidad de cara es 0,8. ¿Qué probabilidad hay de obtener al menos una cruz?", "1 - 0,8⁶ = 0,737856", "0,8⁶", "0,2⁶", "0,80", "binomial-complement"],
    ["coin-expected-heads", "Se lanza seis veces una moneda trucada cuya probabilidad de cara es 0,8. ¿Cuántas caras cabe esperar?", "4,8", "0,8", "1,2", "6", "binomial-mean"],
    ["b5-greater-mean", "Si X sigue una distribución binomial de parámetros n = 5 y p = 0,85, calcula P(X > μ).", "P(X = 5) = 0,85⁵ ≈ 0,44371", "≈ 0,55629", "0,85", "4,25", "binomial-threshold"],
    ["b5-less-mean", "Si X sigue una distribución binomial de parámetros n = 5 y p = 0,85, calcula P(X < μ).", "P(X ≤ 4) = 1 - 0,85⁵ ≈ 0,55629", "≈ 0,44371", "0,15", "4,25", "binomial-threshold"],
    ["women-expected", "Tres de cada cuatro mujeres han leído un determinado libro. Si se eligen 20 mujeres al azar, ¿cuántas cabe esperar que lo hayan leído?", "15", "5", "0,75", "20", "binomial-mean"],
    ["urn-exact-ten", "En una urna hay 45 bolas, 30 azules y 15 amarillas. Se extraen 20 con reemplazamiento. Calcula la probabilidad de obtener exactamente 10 azules.", "≈ 0,05426", "≈ 0,94574", "10/20", "2/3", "binomial-exact"],
    ["urn-expected-blue", "En una urna hay 45 bolas, 30 azules y 15 amarillas. Se extraen 20 con reemplazamiento. ¿Cuántas bolas azules cabe esperar?", "40/3 ≈ 13,33", "10", "20/3", "30", "binomial-mean"],
    ["traffic-driver-any", "En un control, el 10 % supera la tasa de alcohol y el 20 % ha tomado drogas. Si ambos sucesos son independientes, calcula la probabilidad de que un conductor cometa alguna de las dos infracciones.", "0,28", "0,30", "0,02", "0,72", "independent-union"],
    ["traffic-none-ten", "La probabilidad de que un conductor cometa alguna infracción es 0,28. Si se paran 10 conductores independientes, calcula la probabilidad de que ninguno cometa infracción.", "0,72¹⁰ ≈ 0,03744", "0,28¹⁰", "0,72", "0,28", "binomial-exact"],
    ["traffic-expected-hundred", "La probabilidad de que un conductor cometa alguna infracción es 0,28. Si se paran 100 conductores, ¿cuántos cabe esperar que cometan alguna infracción?", "28", "72", "0,28", "10", "binomial-mean"]
  ].map(([suffix, text, a, b, c, d, structureId], index) => originalQuestion({
    id: `ccss-i-original-binomial-${suffix}`,
    topicIndex: 2,
    sourceDocument: binomialDocument,
    sourceExercise: `Problema binomial · apartado recuperado ${index + 1}`,
    subtopic: structureId === "independent-union" ? "Modelo previo de probabilidad" : "Distribución binomial",
    exerciseType: structureId,
    structureId: `binomial-${structureId}`,
    difficulty: structureId.includes("cumulative") || structureId.includes("threshold") ? "advanced" : "ordinary",
    text,
    options: [a, b, c, d]
  }));

  const normal = [
    ["workshop-less-two", "El tiempo de permanencia de los coches en un taller sigue N(9; 2,5). Calcula la probabilidad de que un coche permanezca menos de 2 días.", "≈ 0,0026", "≈ 0,9974", "≈ 0,1056", "≈ 0,0228", "normal-left-tail"],
    ["exam-less-thirty", "El tiempo para terminar un examen sigue N(56; 20), en minutos. Calcula la probabilidad de que un estudiante tarde menos de 30 minutos.", "≈ 0,0968", "≈ 0,9032", "≈ 0,4207", "≈ 0,1587", "normal-left-tail"],
    ["exam-between", "El tiempo para terminar un examen sigue N(56; 20), en minutos. Calcula la probabilidad de que un estudiante tarde entre 30 y 60 minutos.", "≈ 0,4825", "≈ 0,5793", "≈ 0,0968", "≈ 0,6827", "normal-interval"],
    ["exam-percentile75", "El tiempo para terminar un examen sigue N(56; 20), en minutos. ¿Qué tiempo emplea como máximo el 75 % de los estudiantes?", "≈ 69,49 minutos", "56 minutos", "≈ 76 minutos", "≈ 42,51 minutos", "normal-inverse"],
    ["iq-normal-count", "Los coeficientes intelectuales siguen N(100; 15). En un instituto hay 900 alumnos. ¿Cuántos cabe esperar que estén entre 90 y 110?", "≈ 446 alumnos", "≈ 227 alumnos", "≈ 675 alumnos", "900 alumnos", "normal-expected-count"],
    ["iq-below-count", "Los coeficientes intelectuales siguen N(100; 15). En un instituto hay 900 alumnos. ¿Cuántos cabe esperar que estén por debajo de 90?", "≈ 227 alumnos", "≈ 446 alumnos", "≈ 113 alumnos", "≈ 675 alumnos", "normal-expected-count"],
    ["pulse-below65", "Las pulsaciones de 630 alumnos siguen N(79; 9). ¿Cuántos alumnos cabe esperar que tengan menos de 65 pulsaciones por minuto?", "≈ 37 alumnos", "≈ 63 alumnos", "≈ 79 alumnos", "≈ 315 alumnos", "normal-expected-count"],
    ["pulse-between75-85", "Las pulsaciones de 630 alumnos siguen N(79; 9). ¿Cuántos alumnos cabe esperar que tengan entre 75 y 85 pulsaciones por minuto?", "≈ 264 alumnos", "≈ 37 alumnos", "≈ 366 alumnos", "≈ 315 alumnos", "normal-expected-count"],
    ["pulse-percentile10", "Las pulsaciones de 630 alumnos siguen N(79; 9). ¿Cuántas pulsaciones debe tener un alumno para que el 90 % esté por encima de él?", "≈ 67,47 pulsaciones", "≈ 90,53 pulsaciones", "79 pulsaciones", "70 pulsaciones", "normal-inverse"],
    ["inverse-mean", "En una distribución normal de desviación típica 9 se sabe que P(X > 50) = 0,0251. Calcula la media.", "≈ 32,36", "50", "≈ 67,64", "41", "normal-inverse-parameter"],
    ["inverse-below40", "En una distribución normal de desviación típica 9 se sabe que P(X > 50) = 0,0251. Calcula P(X < 40).", "≈ 0,802", "≈ 0,198", "0,0251", "0,9749", "normal-probability-after-inverse"]
  ].map(([suffix, text, a, b, c, d, structureId], index) => originalQuestion({
    id: `ccss-i-original-normal-${suffix}`,
    topicIndex: 3,
    sourceDocument: normalDocument,
    sourceExercise: `Problema de distribución normal · apartado recuperado ${index + 1}`,
    subtopic: structureId.includes("inverse") ? "Tipificación inversa" : "Distribución normal",
    exerciseType: structureId,
    structureId: structureId,
    difficulty: structureId.includes("inverse") ? "advanced" : "ordinary",
    text,
    options: [a, b, c, d]
  }));

  const reals = [
    ["integers-between", "Indica cuántos números enteros hay comprendidos estrictamente entre 0 y 2.", "1", "2", "Infinitos", "0", "number-sets", "basic"],
    ["reals-between", "Indica cuántos números reales hay comprendidos entre 0,000001 y 0,000002.", "Infinitos", "Ninguno", "Uno", "Diez", "density-real-line", "basic"],
    ["interval-union-r", "Simplifica la unión (-∞, 0] ∪ [-7, +∞).", "ℝ", "[-7, 0]", "(-∞, -7]", "[0, +∞)", "interval-union", "ordinary"],
    ["interval-union", "Simplifica la unión (-5, 5] ∪ [-7, 2].", "[-7, 5]", "(-5, 2]", "[-7, 2]", "(-5, 5]", "interval-union", "ordinary"],
    ["absolute-error-4-3", "Se aproxima 4/3 por 1,4. Calcula el error absoluto.", "1/15 ≈ 0,0667", "1/30", "0,05", "0,14", "absolute-error", "ordinary"],
    ["relative-error-4-3", "Se aproxima 4/3 por 1,4. Calcula el error relativo.", "0,05", "1/15", "0,0667 %", "0,14", "relative-error", "ordinary"],
    ["absolute-error-5-3", "Se aproxima 5/3 por 1,67. Calcula el error absoluto.", "1/300 ≈ 0,00333", "1/30", "0,002", "0,03", "absolute-error", "ordinary"],
    ["relative-error-5-3", "Se aproxima 5/3 por 1,67. Calcula el error relativo.", "0,002", "0,00333", "0,02", "0,20", "relative-error", "ordinary"]
  ].map(([suffix, text, a, b, c, d, structureId, difficulty], index) => originalQuestion({
    id: `ccss-i-original-reals-${suffix}`,
    topicIndex: 4,
    sourceDocument: realDocument,
    sourceExercise: `Enunciado legible · apartado ${index + 1}`,
    subtopic: structureId.includes("error") ? "Errores y aproximaciones" : structureId.includes("interval") ? "Intervalos" : "Conjuntos numéricos",
    exerciseType: structureId,
    structureId: `reals-${structureId}`,
    difficulty,
    text,
    options: [a, b, c, d]
  }));

  const equations = [
    ["dividend", "El divisor de una división de polinomios es 2x + 8, el cociente es 2x² + x y el resto es x + 2. Calcula el dividendo.", "4x³ + 18x² + 9x + 2", "4x³ + 16x² + 8x + 2", "4x³ + 18x² + 8x", "2x³ + 9x² + 9x + 2", "polynomial-division-identity", "ordinary"],
    ["parameter-linear-factor", "Calcula b para que P(x) = 2x³ + bx² + 4x + 3 sea divisible por x + 1.", "b = 3", "b = -3", "b = 1", "b = 5", "factor-theorem-parameter", "ordinary"],
    ["parameter-double-factor", "Calcula a para que P(x) = x³ + x² - 21x + a sea divisible por x² + 6x + 9.", "a = -45", "a = 45", "a = -9", "a = 3", "multiple-root-parameter", "advanced"],
    ["radical-positive", "Calcula el número positivo que, al sumarle su raíz cuadrada, resulta igual al triple del número.", "1/4", "1", "4", "9/4", "radical-equation", "ordinary"],
    ["coffee-mixture", "Se mezclan dos tipos de café: uno de 5,50 €/kg y otro de 4 €/kg. Se obtienen 90 kg a 5 €/kg. ¿Cuántos kilogramos de cada tipo se mezclaron?", "60 kg del primero y 30 kg del segundo", "30 kg del primero y 60 kg del segundo", "45 kg de cada uno", "75 kg del primero y 15 kg del segundo", "linear-system-context", "ordinary"],
    ["sum-and-reciprocals", "La suma de dos números positivos es 13 y la suma de sus inversos es 13/42. Calcula los números.", "6 y 7", "5 y 8", "3 y 10", "1 y 12", "nonlinear-system", "advanced"],
    ["father-son", "Un padre y su hijo suman 38 años. Dentro de cinco años, la edad del padre será cinco veces la del hijo. Calcula sus edades actuales.", "35 años y 3 años", "33 años y 5 años", "30 años y 8 años", "36 años y 2 años", "linear-system-context", "ordinary"],
    ["grandfather-grandchild", "Un abuelo y su nieto suman 87 años. Hace cinco años, la edad del abuelo era diez veces la del nieto. Calcula sus edades actuales.", "75 años y 12 años", "77 años y 10 años", "72 años y 15 años", "80 años y 7 años", "linear-system-context", "ordinary"],
    ["money", "Si me das 20 €, tendríamos la misma cantidad. Si ambos recibiéramos 8 €, tú tendrías el doble que yo. ¿Cuánto dinero tenemos ahora?", "Yo 32 € y tú 72 €", "Yo 12 € y tú 32 €", "Yo 20 € y tú 40 €", "Yo 16 € y tú 56 €", "linear-system-context", "ordinary"],
    ["ages-two-people", "Alfonso y Fernando se llevan dos años y su abuelo tiene 75. Dentro de cinco años, la edad del abuelo será el doble de la suma de las edades de los dos jóvenes. Calcula las edades actuales de Alfonso y Fernando.", "14 y 16 años", "13 y 15 años", "15 y 17 años", "12 y 18 años", "linear-system-context", "ordinary"],
    ["wine-lemon", "Se mezclan 28 litros de vino y refresco de limón. El vino cuesta 2,50 €/l, el refresco 0,75 €/l y la mezcla 1,25 €/l. Calcula los litros de cada bebida.", "8 l de vino y 20 l de refresco", "20 l de vino y 8 l de refresco", "14 l de cada uno", "10 l de vino y 18 l de refresco", "linear-system-context", "ordinary"],
    ["positive-number", "Calcula el número positivo cuyo cuadrado dividido entre cinco, más el doble de su consecutivo, es 42.", "10", "5", "20", "8", "quadratic-context", "ordinary"]
  ].map(([suffix, text, a, b, c, d, structureId, difficulty], index) => originalQuestion({
    id: `ccss-i-original-equations-${suffix}`,
    topicIndex: 6,
    sourceDocument: equationsDocument,
    sourceExercise: `Enunciado legible · ejercicio ${index + 1}`,
    subtopic: structureId.includes("system") ? "Sistemas" : structureId.includes("polynomial") || structureId.includes("factor") || structureId.includes("root") ? "Polinomios" : "Ecuaciones",
    exerciseType: structureId,
    structureId: `equations-${structureId}`,
    difficulty,
    text,
    options: [a, b, c, d]
  }));

  const inequalities = [
    ["sales-commission", "Beatriz cobra 450 € fijos más el 3 % de sus ventas. ¿Entre qué cantidades debe vender para que su sueldo esté entre 800 € y 1600 €?", "Entre 11 666,67 € y 38 333,33 €", "Entre 350 € y 1150 €", "Entre 10 500 € y 34 500 €", "Entre 800 € y 1600 €", "linear-double-inequality", "ordinary"],
    ["integer-quadratic", "Calcula los valores enteros de x que cumplen x² - (x + 1)/3 < 58.", "x ∈ {-7, -6, ..., 6, 7}", "x ∈ {-8, -7, ..., 7, 8}", "x ≤ -8 o x ≥ 8", "x ∈ {0, 1, ..., 7}", "quadratic-inequality-integers", "advanced"],
    ["oil-mixture", "Se mezclan aceite virgen a 5 €/l y refinado a 3,50 €/l para obtener 25 l que cuesten como máximo 4,40 €/l. ¿Cuántos litros de aceite virgen pueden emplearse?", "Entre 0 y 15 litros", "Entre 15 y 25 litros", "Exactamente 15 litros", "Más de 15 litros", "linear-inequality-context", "ordinary"],
    ["pens-feasible", "Se fabrican bolígrafos x y plumas y. Como máximo se fabrican 200 bolígrafos, 150 plumas y 250 piezas en total. ¿Cuál es el sistema de restricciones?", "x ≥ 0, y ≥ 0, x ≤ 200, y ≤ 150, x + y ≤ 250", "x ≥ 200, y ≥ 150, x + y ≥ 250", "x ≤ 0, y ≤ 0, x + y = 250", "x + y ≥ 250, x ≤ 150, y ≤ 200", "two-variable-region", "ordinary"],
    ["train-feasible", "En un tren se transportan coches x y motocicletas y. Debe haber al menos 12 coches, al menos la mitad de motocicletas que de coches y como máximo 27 vehículos. ¿Cuál es el sistema?", "x ≥ 12, y ≥ x/2, x + y ≤ 27", "x ≤ 12, y ≤ x/2, x + y ≥ 27", "x ≥ 12, y ≤ x/2, x + y = 27", "x ≤ 27, y ≥ 12, x + y ≥ 27", "two-variable-region", "ordinary"],
    ["lamps-feasible", "Se fabrican lámparas x e y. Como máximo pueden producirse 800 del primer tipo, 600 del segundo y 1000 en total. ¿Cuál es el sistema de restricciones?", "x ≥ 0, y ≥ 0, x ≤ 800, y ≤ 600, x + y ≤ 1000", "x ≥ 800, y ≥ 600, x + y ≥ 1000", "x ≤ 0, y ≤ 0, x + y = 1000", "x + y ≥ 1000, x ≤ 600, y ≤ 800", "two-variable-region", "ordinary"]
  ].map(([suffix, text, a, b, c, d, structureId, difficulty], index) => originalQuestion({
    id: `ccss-i-original-inequalities-${suffix}`,
    topicIndex: 7,
    sourceDocument: inequalitiesDocument,
    sourceExercise: `Problema legible · ejercicio ${index + 1}`,
    subtopic: structureId === "two-variable-region" ? "Sistemas de inecuaciones de dos variables" : "Inecuaciones",
    exerciseType: structureId,
    structureId: `inequalities-${structureId}`,
    difficulty,
    text,
    options: [a, b, c, d]
  }));

  window.CCSS_I_ORIGINAL_EXERCISE_BANKS = {
    0: statistics,
    1: probability,
    2: binomial,
    3: normal,
    4: reals,
    5: [],
    6: equations,
    7: inequalities,
    8: [],
    9: [],
    10: [],
    11: []
  };

  window.CCSS_I_ORIGINAL_REVIEW_QUEUE = [
    { topicIndex: 0, sourceDocument: statisticsDocument, reason: "duplicate", detail: "No se duplican los ejemplos de color de pelo y número de hermanos porque ya existen en el banco activo con el mismo razonamiento." },
    { topicIndex: 0, sourceDocument: statisticsDocument, reason: "solution-missing", detail: "Los ejercicios extensos de tablas, datos agrupados y tres regresiones adicionales son legibles, pero necesitan cálculo y revisión visual de su estructura completa antes de activarse." },
    { topicIndex: 1, sourceDocument: probabilityDocument, reason: "duplicate", detail: "No se duplican el número de resultados de dos dados, las extracciones simples de la bolsa de colores ni los dos lanzamientos de moneda ya presentes en el banco activo." },
    { topicIndex: 1, sourceDocument: probabilityDocument, reason: "formula-illegible", detail: "Tres ejercicios abstractos de sucesos A y B contienen objetos Equation incrustados sin texto recuperable." },
    { topicIndex: 1, sourceDocument: probabilityDocument, reason: "classification-doubtful", detail: "Se apartan enunciados con supuestos ambiguos sobre barajas, urnas elegidas al azar y porcentajes de taxis." },
    { topicIndex: 2, sourceDocument: binomialDocument, reason: "formula-illegible", detail: "Las tablas o probabilidades indicadas mediante objetos Equation no pueden reconstruirse con certeza." },
    { topicIndex: 3, sourceDocument: normalDocument, reason: "formula-illegible", detail: "Las gráficas, densidades y ejercicios N(μ,σ) iniciales dependen de fórmulas incrustadas no recuperables." },
    { topicIndex: 3, sourceDocument: normalDocument, reason: "didactic-decision-pending", detail: "Los ejercicios de aproximación binomial-normal quedan identificados pero no se activan." },
    { topicIndex: 3, sourceDocument: normalDocument, reason: "duplicate", detail: "El problema de alturas N(165; 15) ya está conectado en el banco verificado y no se incorpora una segunda copia." },
    { topicIndex: 3, sourceDocument: normalDocument, reason: "foreign-content", detail: "Se excluye el problema de camisetas de MasMatTest." },
    { topicIndex: 4, sourceDocument: realDocument, reason: "formula-illegible", detail: "Potencias, radicales, racionalización, logaritmos, entornos y notación científica aparecen como objetos Equation sin texto fiable." },
    { topicIndex: 5, sourceDocument: "6-Nº Complejos Ejercicios", reason: "formula-illegible", detail: "Las expresiones de todos los ejercicios, incluidas forma polar, Moivre y raíces, están incrustadas y requieren revisión visual. No se activa ninguno." },
    { topicIndex: 6, sourceDocument: equationsDocument, reason: "formula-illegible", detail: "Ecuaciones racionales, irracionales, exponenciales, logarítmicas y varios sistemas contienen expresiones incrustadas no recuperables." },
    { topicIndex: 7, sourceDocument: inequalitiesDocument, reason: "formula-illegible", detail: "Las inecuaciones simbólicas iniciales requieren revisión visual." },
    { topicIndex: 7, sourceDocument: inequalitiesDocument, reason: "foreign-content", detail: "Se excluye el problema de mesas y sillas de MasMatTest." },
    { topicIndex: 8, sourceDocument: "9- Funciones Ejercicios", reason: "formula-illegible", detail: "Funciones, gráficas y tablas están incrustadas o dependen de imágenes. No se activa ningún ejercicio sin revisión visual." },
    { topicIndex: 11, sourceDocument: "12-Combinatoria Ejercicios", reason: "formula-illegible", detail: "Números combinatorios, triángulo de Pascal y binomio de Newton dependen de fórmulas incrustadas y quedan en revisión visual." }
  ];
})();

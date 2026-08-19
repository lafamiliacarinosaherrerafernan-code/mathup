(function () {
  "use strict";

  const COURSE_ID = "2bach-ccss";
  const COURSE_LABEL = "2.º Bachillerato · Matemáticas Aplicadas a las CCSS II";
  const ORIGINAL_TOPIC_10_SOURCE = "documentos/2º Bachillerato CCSS II/10-Distribución de probabilidad. Distribución Binomial. Continuas Ejercicios.doc";
  const TOPICS = Object.freeze({
    MATRICES: 0,
    DETERMINANTS: 1,
    SYSTEMS: 2,
    LINEAR_PROGRAMMING: 3,
    LIMITS: 4,
    DERIVATIVES: 5,
    INDEFINITE_INTEGRALS: 6,
    DEFINITE_INTEGRALS: 7,
    PROBABILITY: 8,
    DISTRIBUTIONS: 9,
    INFERENCE: 10
  });

  const TOPIC_LABELS = [
    "Matrices",
    "Determinantes",
    "Sistemas con determinantes",
    "Programación lineal",
    "Límites y continuidad",
    "Derivadas y aplicaciones",
    "Integrales indefinidas",
    "Integrales definidas",
    "Probabilidad",
    "Distribución binomial y normal",
    "Muestreo e inferencia estadística"
  ];

  function normalize(value) {
    return String(value || "")
      .replace(/<[^>]+>/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘`´]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function paragraphText(paragraphs) {
    return (paragraphs || []).map((paragraph) => paragraph?.plain || "").join(" ");
  }

  function partText(exercise, part) {
    const own = paragraphText(part?.paragraphs);
    const common = paragraphText(exercise?.statement);
    // Los apartados importados ya conservan el contexto necesario en sus
    // propios párrafos. Mezclar siempre el enunciado común contaminaba la
    // clasificación: un apartado de sistemas podía heredar, por ejemplo,
    // las matrices descritas en el ejercicio anterior del mismo documento.
    // Solo recurrimos al texto común cuando el apartado no tiene texto.
    return normalize(own || common);
  }

  function matches(text, expression) {
    return expression.test(text);
  }

  function classifyAlgebra(text) {
    const topics = new Set();
    const linearProgramming = /programacion lineal|funcion objetivo|region factible|recinto factible|restricciones|beneficio (?:sea )?maximo|maximo beneficio|coste (?:sea )?minimo|minimo coste|semiplano|vertices? de la region|maximiza|minimiza|optimiza|puntos? optimos?|solucion optima|maximas ganancias|mayor cantidad de dinero|mas economica posible|maximo numero .*posible|agota el presupuesto|respuesta de laura|minimo se alcanza|dicho minimo|indica el maximo(?: y el minimo)?(?: del problema dado| y sus respectivos valores)/.test(text);
    const determinant = /determinant|menor complementario|matriz de adjuntos|adjunta|regla de sarrus|desarrolla(?:r)? por (?:la )?(?:fila|columna)|singular|no tiene inversa|tienen matriz inversa|se podria calcular la matriz inversa|razona si .* inversa|invertible/.test(text);
    const matrix = /\bmatri|matrices|traspuest|inversa|ecuacion matricial|producto matricial|producto de matrices|productos? se pueden efectuar|resuelve la ecuacion .*?[a-z]·x|calcula .*?(?:[a-dmnp]·[a-dmnp]|[a-d]²|[a-d][234]|[a-d]t\b)|(?:calcula(?:, si es posible)?|son iguales|se puede calcular).*?[a-d](?:\W+)[a-d]\b|a\^-?1|a-1/.test(text);
    const system = /\bsistema\b|sistemas de ecuaciones|sistema lineal|compatible|incompatible|rouche|rango de la matriz ampliada|gauss|cramer|tres ecuaciones|plantea(?:r)? (?:y )?resuelve|determina(?:r)? el numero de|halla(?:r)? el numero de|calcula(?:r)? (?:el )?numero de|cuantas monedas|determina las edades|calcula el precio|precio de los pen drive|coches de cada color|huespedes de cada|numero de personas .*opcion|resto de la .*division|cuanto dinero se ha invertido|puntuacion obtenida.*cada pregunta/.test(text);

    if (linearProgramming) topics.add(TOPICS.LINEAR_PROGRAMMING);
    // Un sistema auxiliar para hallar un vértice pertenece a programación
    // lineal mientras el objetivo del apartado siga siendo optimizar.
    if (system && !linearProgramming) topics.add(TOPICS.SYSTEMS);
    if (determinant && !linearProgramming) topics.add(TOPICS.DETERMINANTS);
    if (matrix && !linearProgramming) topics.add(TOPICS.MATRICES);
    return [...topics];
  }

  function classifyAnalysis(text) {
    const topics = new Set();
    const area = /area|recinto|region limitada|region encerrada|superficie/.test(text);
    const definiteIntegral = /integral definida|barrow|limites? de integracion|∫|int_/.test(text) && (area || /entre x|desde x|calcula la integral/.test(text));
    const indefiniteIntegral = /primitiv|integral indefinida|familia de primitivas/.test(text);
    const derivative = /deriv|recta tangente|recta normal|maxim|minim|mayor|menor|extremo|crec|decrec|aumenta|disminu|sube|baja|monoton|optim|inflexion|concav|convex|representa(?:r)? graficamente|esboza(?:r)? la grafica|deja(?:ra)? de propagarse/.test(text);
    const limit = /\blim\b|limite|continua|continuo|continuidad|discontin|asintot|por mucho tiempo que pase/.test(text);

    if (indefiniteIntegral) topics.add(TOPICS.INDEFINITE_INTEGRALS);
    if (definiteIntegral || (area && /integral|eje de abscisas|eje ox|entre las graficas/.test(text))) topics.add(TOPICS.DEFINITE_INTEGRALS);
    if (derivative && !topics.has(TOPICS.INDEFINITE_INTEGRALS) && !topics.has(TOPICS.DEFINITE_INTEGRALS)) topics.add(TOPICS.DERIVATIVES);
    if (limit && !topics.has(TOPICS.INDEFINITE_INTEGRALS) && !topics.has(TOPICS.DEFINITE_INTEGRALS)) topics.add(TOPICS.LIMITS);
    return [...topics];
  }

  function classifyStatistics(text) {
    const inference = /intervalo de confianza|intervalo obtenido|intervalo estimado|nivel de confianza|con una confianza|error maximo|tamano (?:minimo )?de la muestra|tamano muestral|\bmuestra\b|muestra aleatoria|media muestral|media poblacional|estimacion|estimar la media|distribucion muestral|desviacion tipica poblacional|probabilidad del \d+(?:[.,]\d+)?\s*%/.test(text);
    const distribution = /binomial|de moivre|correccion de continuidad|tipific|variable aleatoria|distribucion normal|sigue (?:una )?normal|n\s*\(|percentil|cuantil|probabilidad.*normal/.test(text);
    if (inference) return [TOPICS.INFERENCE];
    if (distribution) return [TOPICS.DISTRIBUTIONS];
    return [];
  }

  function classifyPart(blockId, exercise, part) {
    const text = partText(exercise, part);
    let topicIndexes = [];
    if (blockId === "algebra") topicIndexes = classifyAlgebra(text);
    else if (blockId === "analisis") topicIndexes = classifyAnalysis(text);
    else if (blockId === "probabilidad") topicIndexes = [TOPICS.PROBABILITY];
    else if (blockId === "estadistica") topicIndexes = classifyStatistics(text);
    return [...new Set(topicIndexes)].sort((a, b) => a - b);
  }

  function primaryTopic(topicIndexes, blockId) {
    if (!topicIndexes.length) return null;
    if (blockId === "algebra" && topicIndexes.includes(TOPICS.LINEAR_PROGRAMMING)) return TOPICS.LINEAR_PROGRAMMING;
    if (blockId === "estadistica" && topicIndexes.includes(TOPICS.INFERENCE)) return TOPICS.INFERENCE;
    return topicIndexes[0];
  }

  function subtopicFor(topicIndex, text) {
    const value = normalize(text);
    if (topicIndex === TOPICS.MATRICES) {
      if (/ecuacion matricial/.test(value)) return "Ecuaciones matriciales";
      if (/inversa/.test(value)) return "Matriz inversa";
      if (/producto/.test(value)) return "Operaciones y productos";
      return "Matrices";
    }
    if (topicIndex === TOPICS.DETERMINANTS) {
      if (/rango/.test(value)) return "Rango mediante determinantes";
      if (/singular|invertib/.test(value)) return "Singularidad e invertibilidad";
      return "Cálculo y propiedades de determinantes";
    }
    if (topicIndex === TOPICS.SYSTEMS) {
      if (/parametr|compatible|incompatible|rouche|rango/.test(value)) return "Discusión de sistemas";
      if (/fabrica|empresa|alumnos|votos|cajas|precio|beneficio|coste/.test(value)) return "Sistemas contextualizados";
      return "Sistemas lineales";
    }
    if (topicIndex === TOPICS.LINEAR_PROGRAMMING) return "Optimización en una región factible";
    if (topicIndex === TOPICS.LIMITS) return /continua|continuidad|discontin/.test(value) ? "Continuidad" : /asintot/.test(value) ? "Asíntotas" : "Límites";
    if (topicIndex === TOPICS.DERIVATIVES) {
      if (/optim|maxim|minim/.test(value)) return "Extremos y optimización";
      if (/tangente|normal/.test(value)) return "Recta tangente y normal";
      if (/crec|decrec|monoton/.test(value)) return "Monotonía";
      return "Derivadas y representación";
    }
    if (topicIndex === TOPICS.INDEFINITE_INTEGRALS) return "Primitivas";
    if (topicIndex === TOPICS.DEFINITE_INTEGRALS) return /area|recinto|region/.test(value) ? "Áreas" : "Integral definida";
    if (topicIndex === TOPICS.PROBABILITY) {
      if (/bayes/.test(value)) return "Teorema de Bayes";
      if (/probabilidad total/.test(value)) return "Probabilidad total";
      if (/condicionad/.test(value)) return "Probabilidad condicionada";
      if (/independ/.test(value)) return "Independencia";
      return "Probabilidad compuesta";
    }
    if (topicIndex === TOPICS.DISTRIBUTIONS) {
      if (/de moivre|continuidad/.test(value)) return "Aproximación binomial-normal";
      if (/binomial/.test(value)) return "Distribución binomial";
      return "Distribución normal";
    }
    if (topicIndex === TOPICS.INFERENCE) {
      if (/tamano.*muestra|tamano muestral/.test(value)) return "Tamaño muestral";
      if (/error maximo/.test(value)) return "Error máximo";
      if (/proporcion/.test(value)) return "Intervalo para una proporción";
      return "Intervalo de confianza para la media";
    }
    return "";
  }

  function reasoningTypesFor(topicIndexes, text) {
    return topicIndexes.map((topicIndex) => normalize(subtopicFor(topicIndex, text)).replace(/\s+/g, "-"));
  }

  function sourceMetadata(source) {
    const value = String(source || "");
    const year = value.match(/\b(20\d{2})\b/)?.[1] || "";
    const convocatoriaMatch = value.match(/\b(junio|julio|septiembre|reserva\s*\d*|modelo)\b/i);
    const convocatoria = convocatoriaMatch?.[1] || "";
    const verified = Boolean(year && !/^\s*pau\b/i.test(value));
    return {
      sourceType: verified ? "official-pau" : "legacy-unverified",
      officialStatus: verified ? "official" : "legacy-unverified",
      course: COURSE_ID,
      sourceCourseLabel: COURSE_LABEL,
      year,
      convocatoria
    };
  }

  function semanticKey(exercise, part) {
    return normalize(`${exercise?.source || ""}|${part?.label || ""}|${paragraphText(part?.paragraphs) || paragraphText(exercise?.statement)}`);
  }

  function applyClassification() {
    const banks = window.CCSS_II_BLOCK_EXERCISES || {};
    const seenSemantic = new Map();
    Object.entries(banks).forEach(([blockId, exercises]) => {
      (exercises || []).forEach((exercise) => {
        const metadata = sourceMetadata(exercise.source);
        Object.assign(exercise, metadata, {
          exerciseId: exercise.exerciseId || exercise.id,
          courseId: COURSE_ID,
          blockId,
          classificationVersion: "ccss-ii-parts-v1"
        });
        (exercise.parts || []).forEach((part, partIndex) => {
          const text = partText(exercise, part);
          let topicIndexes = classifyPart(blockId, exercise, part);
          if (!topicIndexes.length && /apartado anterior/.test(text) && partIndex > 0) {
            topicIndexes = [...(exercise.parts[partIndex - 1]?.topicIndexes || [])];
          }
          const key = semanticKey(exercise, part);
          const duplicateOf = seenSemantic.get(key) || "";
          if (!duplicateOf && key) seenSemantic.set(key, `${exercise.id}:part-${partIndex + 1}`);
          Object.assign(part, metadata, {
            exerciseId: exercise.id,
            partId: `${exercise.id}:part-${partIndex + 1}`,
            blockId,
            topicIndexes,
            primaryTopicIndex: primaryTopic(topicIndexes, blockId),
            topic: topicIndexes.length === 1 ? TOPIC_LABELS[topicIndexes[0]] : topicIndexes.map((index) => TOPIC_LABELS[index]),
            subtopic: topicIndexes.length === 1 ? subtopicFor(topicIndexes[0], text) : topicIndexes.map((index) => subtopicFor(index, text)),
            reasoningTypes: reasoningTypesFor(topicIndexes, text),
            classificationStatus: topicIndexes.length ? "classified" : "unclassified",
            duplicateOf
          });
        });
        // Algunos apartados auxiliares de Análisis solo piden evaluar la
        // función, hallar un parámetro ya planteado o interpretar el extremo
        // obtenido. Si todos los demás apartados del mismo ejercicio tienen
        // un único objetivo temático, ese contexto permite clasificarlos sin
        // volver a etiquetar todo el ejercicio como mixto.
        if (blockId === "analisis") {
          const siblingTopics = [...new Set((exercise.parts || []).flatMap((part) => part.topicIndexes || []))];
          if (siblingTopics.length === 1) {
            (exercise.parts || []).forEach((part) => {
              if (part.topicIndexes?.length) return;
              const topicIndex = siblingTopics[0];
              const text = partText(exercise, part);
              Object.assign(part, {
                topicIndexes: [topicIndex],
                primaryTopicIndex: topicIndex,
                topic: TOPIC_LABELS[topicIndex],
                subtopic: subtopicFor(topicIndex, text),
                reasoningTypes: reasoningTypesFor([topicIndex], text),
                classificationStatus: "classified-contextual-part"
              });
            });
          }
        }
        exercise.topicIndexes = [...new Set((exercise.parts || []).flatMap((part) => part.topicIndexes || []))].sort((a, b) => a - b);
        exercise.classificationStatus = exercise.topicIndexes.length ? "classified" : "unclassified";
      });
    });
    return banks;
  }

  function originalTopic10PracticeBank() {
    const original = window.CCSS_I_ORIGINAL_EXERCISE_BANKS || {};
    const binomial = (original[2] || []).filter((question) => question.exerciseType !== "independent-union");
    const normal = original[3] || [];
    const originalQuestions = [...binomial, ...normal].map((question) => {
      const isBinomial = String(question.exerciseType || "").startsWith("binomial");
      return {
        ...question,
        id: String(question.id || "").replace(/^ccss-i-/, "ccss-ii-"),
        rawBaseId: `ccss-ii-topic10|${question.rawBaseId || question.id}`,
        exerciseId: `ccss-ii-topic10|${question.exerciseId || question.id}`,
        partId: `ccss-ii-topic10|${question.exerciseId || question.id}|part-1`,
        courseId: COURSE_ID,
        course: COURSE_ID,
        sourceCourseLabel: COURSE_LABEL,
        sourceDocument: ORIGINAL_TOPIC_10_SOURCE,
        source: ORIGINAL_TOPIC_10_SOURCE,
        sourceType: "didactic-original",
        officialStatus: "didactic",
        usedFor: "Práctica por temas CCSS II",
        topicIndex: TOPICS.DISTRIBUTIONS,
        topicIndexes: [TOPICS.DISTRIBUTIONS],
        primaryTopicIndex: TOPICS.DISTRIBUTIONS,
        topic: TOPIC_LABELS[TOPICS.DISTRIBUTIONS],
        subtopic: isBinomial ? "Distribución binomial" : "Distribución normal",
        classificationStatus: "classified",
        classificationVersion: "ccss-ii-topic10-original-v1"
      };
    });
    const deMoivre = window.CCSS_II_TOPIC10_DE_MOIVRE_PRACTICE || [];
    return [...originalQuestions, ...deMoivre];
  }

  const reviewQueue = Object.freeze([
    {
      source: ORIGINAL_TOPIC_10_SOURCE,
      section: "Distribuciones continuas",
      detail: "Dos ejercicios sobre funciones de densidad dependen de gráficas incrustadas que no se han recuperado con fidelidad.",
      status: "REVISIÓN VISUAL NECESARIA"
    },
    {
      source: ORIGINAL_TOPIC_10_SOURCE,
      section: "Distribución normal",
      detail: "Los primeros ejercicios abstractos N(μ,σ) y de tipificación inversa contienen fórmulas incrustadas sin texto fiable.",
      status: "REVISIÓN VISUAL NECESARIA"
    },
    {
      source: ORIGINAL_TOPIC_10_SOURCE,
      section: "Aproximación binomial-normal",
      detail: "Los problemas originales están identificados, pero sus expresiones y resultados deben contrastarse visualmente antes de activarlos como ejercicios de De Moivre.",
      status: "REVISIÓN VISUAL NECESARIA"
    }
  ]);

  function partRecords(topicIndex, options = {}) {
    const includeDuplicates = Boolean(options.includeDuplicates);
    const records = [];
    Object.entries(window.CCSS_II_BLOCK_EXERCISES || {}).forEach(([blockId, exercises]) => {
      (exercises || []).forEach((exercise) => {
        (exercise.parts || []).forEach((part, partIndex) => {
          if (!(part.topicIndexes || []).includes(topicIndex)) return;
          if (!includeDuplicates && part.duplicateOf) return;
          records.push({ exercise, part, partIndex, blockId });
        });
      });
    });
    return records;
  }

  function audit() {
    const allExercises = Object.values(window.CCSS_II_BLOCK_EXERCISES || {}).flat();
    const allParts = allExercises.flatMap((exercise) => exercise.parts || []);
    const perTopic = TOPIC_LABELS.map((label, topicIndex) => ({
      topicIndex,
      label,
      parts: allParts.filter((part) => (part.topicIndexes || []).includes(topicIndex)).length,
      uniqueParts: partRecords(topicIndex).length
    }));
    const analysis = (window.CCSS_II_BLOCK_EXERCISES?.analisis || []).flatMap((exercise) => exercise.parts || []);
    const algebra = (window.CCSS_II_BLOCK_EXERCISES?.algebra || []).flatMap((exercise) => exercise.parts || []);
    const statistics = (window.CCSS_II_BLOCK_EXERCISES?.estadistica || []).flatMap((exercise) => exercise.parts || []);
    const topic10Original = originalTopic10PracticeBank();
    return {
      exercises: allExercises.length,
      parts: allParts.length,
      classifiedParts: allParts.filter((part) => part.topicIndexes?.length).length,
      unclassifiedParts: allParts.filter((part) => !part.topicIndexes?.length).length,
      duplicateParts: allParts.filter((part) => part.duplicateOf).length,
      perTopic,
      analysis: {
        limitsOnly: analysis.filter((part) => part.topicIndexes?.length === 1 && part.topicIndexes[0] === TOPICS.LIMITS).length,
        derivativesOnly: analysis.filter((part) => part.topicIndexes?.length === 1 && part.topicIndexes[0] === TOPICS.DERIVATIVES).length,
        genuinelyShared: analysis.filter((part) => part.topicIndexes?.includes(TOPICS.LIMITS) && part.topicIndexes?.includes(TOPICS.DERIVATIVES)).length,
        unclassified: analysis.filter((part) => !part.topicIndexes?.length).length
      },
      algebra: {
        multipleTopics: algebra.filter((part) => (part.topicIndexes || []).length > 1).length,
        unclassified: algebra.filter((part) => !part.topicIndexes?.length).length
      },
      statistics: {
        distributionParts: statistics.filter((part) => part.topicIndexes?.includes(TOPICS.DISTRIBUTIONS)).length,
        inferenceParts: statistics.filter((part) => part.topicIndexes?.includes(TOPICS.INFERENCE)).length,
        unclassified: statistics.filter((part) => !part.topicIndexes?.length).length
      },
      topic10Original: {
        binomial: topic10Original.filter((question) => question.subtopic === "Distribución binomial").length,
        normal: topic10Original.filter((question) => question.subtopic === "Distribución normal").length,
        deMoivre: topic10Original.filter((question) => question.subtopic === "Aproximación binomial-normal").length
      },
      reviewQueue: [...reviewQueue]
    };
  }

  applyClassification();

  window.MargaritaCcssIITopicClassification = {
    COURSE_ID,
    TOPICS,
    TOPIC_LABELS,
    classifyPart,
    applyClassification,
    partRecords,
    originalTopic10PracticeBank,
    reviewQueue,
    sourceMetadata,
    audit
  };
})();

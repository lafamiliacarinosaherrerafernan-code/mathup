(function () {
  const EXAM_HISTORY_KEY = "margarita-bach-ii-exam-history-v1";

  const slotLabels = {
    "2bach-mates": [
      "Álgebra",
      "Límites, continuidad y derivadas",
      "Integrales",
      "Geometría",
      "Probabilidad y estadística"
    ],
    "2bach-ccss": [
      "Matrices y determinantes",
      "Sistemas y programación lineal",
      "Análisis",
      "Probabilidad",
      "Estadística"
    ]
  };

  function rawBanks(courseId) {
    return courseId === "2bach-mates"
      ? window.MATES_II_BLOCK_EXERCISES || {}
      : window.CCSS_II_BLOCK_EXERCISES || {};
  }

  function answerBank(courseId) {
    return courseId === "2bach-mates"
      ? window.MATES_II_EXAM_ANSWERS || {}
      : window.CCSS_II_EXAM_ANSWERS || {};
  }

  function catalog(courseId) {
    return window.BACH_II_EXAM_CATALOG?.[courseId] || [];
  }

  function findRawExercise(courseId, entry) {
    return (rawBanks(courseId)[entry.block] || []).find((exercise) => exercise.id === entry.id) || null;
  }

  function exerciseIsComplete(courseId, entry) {
    const raw = findRawExercise(courseId, entry);
    const authored = answerBank(courseId)[entry.id];
    return Boolean(raw && authored && raw.parts?.length && raw.parts.every((part, partIndex) => {
      const answer = officialPartAnswer(authored, raw.parts, part, partIndex);
      return answer?.options?.length === 4
        && new Set(answer.options.map(String)).size === 4
        && Number.isInteger(answer.correct)
        && answer.correct >= 0
        && answer.correct < 4
        && String(answer.solution || "").trim();
    }));
  }

  function studentExamKey(courseId) {
    const student = state.student || {};
    const studentIdentity = student.id || student.userId || student.username || student.email || student.name || "alumno";
    return [state.academicYear, courseId, student.group || student.groupLabel, studentIdentity].filter(Boolean).join("|");
  }

  function legacyStudentExamKey(courseId) {
    const student = state.student || {};
    return [state.academicYear, courseId, student.group || student.groupLabel, student.name].filter(Boolean).join("|");
  }

  function readExamHistory() {
    try {
      return JSON.parse(localStorage.getItem(EXAM_HISTORY_KEY) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function writeExamHistory(history) {
    try {
      localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history));
    } catch (_) {
      // El examen sigue funcionando aunque el almacenamiento local no esté disponible.
    }
  }

  function examBlockForSlot(courseId, slot) {
    if (courseId === "2bach-mates") {
      return slot === 1
        ? "algebra"
        : slot === 2 || slot === 3
          ? "analisis"
          : slot === 4
            ? "geometria"
            : "probabilidad-estadistica";
    }
    return slot === 1 || slot === 2
      ? "algebra"
      : slot === 3
        ? "analisis"
        : slot === 4
          ? "probabilidad"
          : "estadistica";
  }

  function examSearchableText(question) {
    return normalizeDisplayText([
      question?.source || "",
      question?.text || "",
      question?.statementHtml || "",
      ...(question?.parts || []).map((part) => part?.text || part?.html || "")
    ].join(" "))
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function questionBelongsToExamSlot(courseId, slot, question) {
    const blockId = question?.blockId || examBlockForSlot(courseId, slot);
    if (blockId !== examBlockForSlot(courseId, slot)) return false;
    const text = examSearchableText(question);
    if (courseId === "2bach-mates" && blockId === "analisis") {
      const isIntegral = /\bintegral|primitiv|barrow|área|area|recinto|región limitada|region limitada/.test(text);
      return slot === 3 ? isIntegral : !isIntegral;
    }
    if (courseId === "2bach-ccss" && blockId === "algebra") {
      const isSystemOrProgramming = /programación lineal|programacion lineal|sistema de ecuaciones|compatibilidad|rouché|rouche|gauss|cramer/.test(text);
      return slot === 2 ? isSystemOrProgramming : !isSystemOrProgramming;
    }
    return true;
  }

  function questionAvailableForMode(courseId, question, mode) {
    const availability = window.MargaritaContentAvailability;
    if (!availability?.isAvailable) return true;
    const topicIndexes = Array.isArray(question?.topicIndexes) ? question.topicIndexes : [];
    return topicIndexes.every((topicIndex) => availability.isAvailable(courseId, topicIndex, mode));
  }

  function rotateExamPart(part, amount) {
    if (!part?.options || part.options.length !== 4
      || new Set(part.options.map(String)).size !== 4
      || !Number.isInteger(part.correct)
      || !String(part.solution || "").trim()) return null;
    const rotation = Math.abs(amount) % part.options.length;
    return {
      ...part,
      text: part.text || "Selecciona el resultado correcto.",
      html: part.html || formatMathText(part.text || "Selecciona el resultado correcto."),
      options: rotate(part.options, rotation),
      correct: (part.correct - rotation + part.options.length) % part.options.length
    };
  }

  function asPreparedExamQuestion(question, slot, blockId, rotationSeed = 0) {
    if (!question) return null;
    const expanded = expandCompositeQuestionParts(question);
    const sourceParts = expanded.parts?.length
      ? expanded.parts
      : questionHasCoherentOptions(expanded)
        ? [{
          label: "Resultado",
          text: "Selecciona el resultado correcto.",
          html: "Selecciona el resultado correcto.",
          options: expanded.options,
          correct: expanded.correct,
          solution: expanded.solution
        }]
        : [];
    const parts = sourceParts.map((part, index) => rotateExamPart(part, rotationSeed + index));
    if (!parts.length || parts.some((part) => !part)) return null;
    const identity = challengeQuestionIdentity(expanded);
    return {
      ...expanded,
      id: expanded.id || `exam-${blockId}-${Math.abs(hashExamText(identity))}`,
      rawBaseId: expanded.rawBaseId || identity,
      source: expanded.source || officialExerciseSource(expanded),
      slot,
      blockId,
      text: expanded.text || "",
      statementHtml: expanded.statementHtml || formatMathText(expanded.text || ""),
      parts,
      type: expanded.type || "official-exam-exercise"
    };
  }

  function hashExamText(value) {
    let hash = 2166136261;
    String(value || "").split("").forEach((character) => {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    });
    return hash >>> 0;
  }

  function completeRawExercise(courseId, raw, blockId, rotationSeed) {
    const authored = answerBank(courseId)[raw?.id];
    if (!raw || !authored || !raw.parts?.length) return null;
    const parts = raw.parts.map((part, partIndex) => {
      const answer = officialPartAnswer(authored, raw.parts, part, partIndex);
      return rotateExamPart({
        label: part.label,
        text: exercisePartPrompt(part),
        html: exercisePartPrompt(part, true),
        options: answer?.options,
        correct: answer?.correct,
        solution: answer?.solution
      }, rotationSeed + partIndex);
    });
    if (parts.some((part) => !part)) return null;
    return {
      id: raw.id,
      rawBaseId: `${raw.id}|${raw.source}|${joinExerciseParagraphs(raw.statement)}`,
      source: raw.source,
      topicIndexes: Array.isArray(raw.topicIndexes) ? [...raw.topicIndexes] : [],
      blockId,
      text: joinExerciseParagraphs(raw.statement),
      statementHtml: joinExerciseParagraphs(raw.statement, true),
      parts,
      type: "corrected-official-exercise"
    };
  }

  function officialLegacyBlockPool(course, blockId) {
    const block = (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === blockId);
    if (!block) return [];
    return block.topics.flatMap((topicIndex) => {
      const theme = course.themes[topicIndex] || "";
      return pickExerciseBank(theme.toLowerCase(), course.id)
        .map((question) => question.options?.length ? question : withPauTestOptions(question))
        .filter(hasOfficialConvocation)
        .filter(questionHasCoherentOptions);
    });
  }

  function buildExamSlotPool(courseId, slot, rotationSeed = 0) {
    const course = courseById(courseId);
    const blockId = examBlockForSlot(courseId, slot);
    if (!course || !blockId) return [];
    ensurePauTopicMetadata(courseId);

    const curatedEntries = catalog(courseId)
      .filter((entry) => entry.slot === slot && exerciseIsComplete(courseId, entry))
      .map((entry, index) => prepareExercise(courseId, entry, rotationSeed + index))
      .filter(Boolean);
    const corrected = buildCorrectedBlockQuestions(course, blockId);
    const completeRaw = (rawBanks(courseId)[blockId] || [])
      .map((raw, index) => completeRawExercise(courseId, raw, blockId, rotationSeed + index))
      .filter(Boolean);
    const suppliedExtras = courseId === "2bach-mates"
      ? window.MATES_II_EXTRA_BLOCK_QUESTIONS?.[blockId] || []
      : [];
    const seen = new Set();
    // En los exámenes solo utilizamos los bancos oficiales corregidos de la
    // modalidad elegida. El banco histórico genérico puede contener temas con
    // nombres coincidentes de Matemáticas II y CCSS II, por lo que no debe
    // incorporarse aquí: así evitamos mezclar enunciados entre modalidades.
    return [...curatedEntries, ...corrected, ...completeRaw, ...suppliedExtras]
      .filter((question) => hasOfficialConvocation(question))
      .filter((question) => questionAvailableForMode(courseId, question, "exam"))
      .filter((question) => questionBelongsToExamSlot(courseId, slot, question))
      .map((question, index) => asPreparedExamQuestion(question, slot, blockId, rotationSeed + index))
      .filter(Boolean)
      .filter((question) => {
        const identity = officialQuestionDedupKey(question);
        if (!identity || seen.has(identity)) return false;
        seen.add(identity);
        return true;
      });
  }

  function chooseWithoutRepeating(courseId, slot, seed) {
    const pool = buildExamSlotPool(courseId, slot, hashExamText(`${seed}|${slot}`));
    return chooseFromExamPoolWithoutRepeating(courseId, slot, seed, pool);
  }

  function chooseFromExamPoolWithoutRepeating(courseId, slot, seed, pool) {
    if (!pool.length) return null;
    const history = readExamHistory();
    const key = `${studentExamKey(courseId)}|slot-${slot}`;
    const legacyKey = `${legacyStudentExamKey(courseId)}|slot-${slot}`;
    const identityOf = (question) => officialQuestionDedupKey(question);
    const aliasesOf = (question) => new Set([
      identityOf(question),
      legacyOfficialQuestionDedupKey(question),
      challengeQuestionIdentity(question),
      question?.id,
      question?.rawBaseId,
      question?.id ? `id:${question.id}` : "",
      question?.rawBaseId ? `raw:${question.rawBaseId}` : ""
    ].filter(Boolean));
    const stored = [
      ...(Array.isArray(history[key]) ? history[key] : []),
      ...(legacyKey !== key && Array.isArray(history[legacyKey]) ? history[legacyKey] : [])
    ];
    let used = [...new Set(stored.flatMap((storedIdentity) => {
      const matchingQuestion = pool.find((question) => aliasesOf(question).has(storedIdentity));
      return matchingQuestion ? [identityOf(matchingQuestion)] : [];
    }))];
    history[key] = used;
    writeExamHistory(history);
    let available = pool.filter((question) => !used.includes(identityOf(question)));
    if (!available.length) {
      const lastIdentity = used.at(-1);
      used = lastIdentity && pool.length > 1 ? [lastIdentity] : [];
      available = pool.filter((question) => !used.includes(identityOf(question)));
      history[key] = used;
      writeExamHistory(history);
    }
    return seededShuffle(available, `${seed}|${slot}|${used.length}`)[0];
  }

  function markExamExerciseAnswered(courseId, question) {
    if (!courseId || !question?.slot) return;
    const history = readExamHistory();
    const key = `${studentExamKey(courseId)}|slot-${question.slot}`;
    const legacyKey = `${legacyStudentExamKey(courseId)}|slot-${question.slot}`;
    const answered = new Set(Array.isArray(history[key]) ? history[key] : []);
    if (legacyKey !== key && Array.isArray(history[legacyKey])) {
      history[legacyKey].forEach((identity) => answered.add(identity));
    }
    answered.add(officialQuestionDedupKey(question));
    history[key] = [...answered];
    writeExamHistory(history);
  }

  function prepareExercise(courseId, entry, rotationSeed = 0) {
    const raw = findRawExercise(courseId, entry);
    const authored = answerBank(courseId)[entry.id];
    if (!raw || !authored) return null;
    const parts = raw.parts.map((part, partIndex) => {
      const answer = officialPartAnswer(authored, raw.parts, part, partIndex);
      if (!answer?.options || answer.options.length !== 4) return null;
      const amount = Math.abs(rotationSeed + partIndex) % answer.options.length;
      return {
        label: part.label,
        text: exercisePartPrompt(part),
        html: exercisePartPrompt(part, true),
        options: rotate(answer.options, amount),
        correct: (answer.correct - amount + answer.options.length) % answer.options.length,
        solution: answer.solution
      };
    });
    if (parts.some((part) => !part)) return null;
    return {
      id: raw.id,
      rawBaseId: `${raw.id}|${raw.source}|${joinExerciseParagraphs(raw.statement)}`,
      source: raw.source,
      topicIndexes: Array.isArray(raw.topicIndexes) ? [...raw.topicIndexes] : [],
      slot: entry.slot,
      blockId: entry.block,
      text: joinExerciseParagraphs(raw.statement),
      statementHtml: joinExerciseParagraphs(raw.statement, true),
      parts,
      type: "corrected-official-exercise"
    };
  }

  const matchedPoolCache = new Map();

  function normalizedMatchTokens(value) {
    const stop = new Set(["para", "como", "este", "esta", "estas", "estos", "donde", "siendo", "calcula", "calcular", "halla", "hallar", "determina", "determinar", "ejercicio", "apartado", "bloque", "junio", "julio", "septiembre", "convocatoria", "resultado", "castilla", "mancha"]);
    return normalizeDisplayText(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .match(/[a-zñ]{4,}/g)?.filter((token) => !stop.has(token)) || [];
  }

  function rawExerciseText(raw) {
    return [
      joinExerciseParagraphs(raw.statement),
      ...(raw.parts || []).map((part) => joinExerciseParagraphs(part.paragraphs))
    ].join("\n");
  }

  function normalizedPauExerciseText(raw) {
    return normalizeDisplayText(rawExerciseText(raw))
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ");
  }

  // Clasificación determinista que se convierte en metadatos topicIndex antes
  // de seleccionar. La selección posterior nunca decide por semejanza textual.
  function classifiedPauTopicIndexes(courseId, blockId, raw) {
    const text = normalizedPauExerciseText(raw);
    const topics = new Set();
    const add = (...indexes) => indexes.forEach((index) => topics.add(index));
    if (courseId === "2bach-mates") {
      if (blockId === "algebra") {
        if (/determinant|desarrolla.*fila|menor complementario|adjunt/.test(text)) add(1);
        if (/matri|traspuest|inversa|producto.*matri|ecuacion matricial/.test(text)) add(0);
        if (/sistema|rouche|rango|compatible|incompatible|cramer|gauss|incognit|parametro/.test(text)) add(2);
      } else if (blockId === "analisis") {
        const integral = /integral|primitiv|barrow|area.*recinto|region limitada/.test(text);
        if (integral) {
          if (/area|recinto|region limitada|barrow|integral definida|limites de integracion/.test(text)) add(11);
          if (/primitiv|integral indefinida|calcula.*integral|integrales siguientes/.test(text) || !topics.size) add(10);
        } else {
          if (/\blim\b|limite|sucesion|infinito|indeterminacion/.test(text)) add(6);
          if (/continua|continuidad|discontin/.test(text)) add(7);
          if (/deriv/.test(text)) add(8);
          if (/tangente|normal|maxim|minim|extremo|crec|decrec|monot|optim|concav|convex|inflexion|representa|esbozo/.test(text)) add(9);
        }
      } else if (blockId === "geometria") {
        if (/vector|producto escalar|producto vectorial|base ortogonal|dependencia lineal/.test(text)) add(3);
        if (/recta|plano|posicion relativa|ecuacion.*parametr/.test(text)) add(4);
        if (/distancia|angulo|perpendicular|simetric|proyeccion|area|volumen|punto mas proximo/.test(text)) add(5);
      } else if (blockId === "probabilidad-estadistica") {
        if (/binomial|normal|tipific|media y desviacion|variable aleatoria/.test(text)) add(13);
        if (/probabilidad|suceso|bayes|condicionada|urna|diagrama de arbol/.test(text) || !topics.size) add(12);
      }
    } else if (blockId === "algebra") {
      if (/programacion lineal|funcion objetivo|region factible|recinto|restricciones/.test(text)) add(3);
      if (/sistema|gauss|cramer|compatible|incompatible|incognit|tres ecuaciones/.test(text)) add(2);
      if (/determinant|adjunt|menor/.test(text)) add(1);
      if (/matri|inversa|traspuest|ecuacion matricial|producto.*matri/.test(text)) add(0);
    } else if (blockId === "analisis") {
      const integral = /integral|primitiv|barrow|area.*recinto|region limitada/.test(text);
      if (integral) {
        if (/area|recinto|region limitada|barrow|integral definida|limites de integracion/.test(text)) add(7);
        if (/primitiv|integral indefinida|calcula.*integral|integrales siguientes/.test(text) || !topics.size) add(6);
      } else {
        if (/\blim\b|limite|continua|continuidad|discontin|asintot/.test(text)) add(4);
        if (/deriv|tangente|normal|maxim|minim|extremo|crec|decrec|optim|inflexion/.test(text)) add(5);
      }
    } else if (blockId === "probabilidad") {
      add(8);
    } else if (blockId === "estadistica") {
      if (/intervalo de confianza|muestra|muestreo|estim|nivel de confianza|tamano de la muestra/.test(text)) add(10);
      if (/binomial|normal|tipific|variable aleatoria/.test(text)) add(9);
    }
    return [...topics];
  }

  function ensurePauTopicMetadata(courseId) {
    Object.entries(rawBanks(courseId)).forEach(([blockId, exercises]) => {
      (exercises || []).forEach((exercise) => {
        exercise.exerciseId = exercise.exerciseId || exercise.id;
        exercise.courseId = courseId;
        exercise.blockId = blockId;
        exercise.topicIndexes = Array.isArray(exercise.topicIndexes)
          ? [...new Set(exercise.topicIndexes)]
          : classifiedPauTopicIndexes(courseId, blockId, exercise);
        exercise.sourceType = "official-pau";
      });
    });
  }

  function officialYear(value) {
    return String(value || "").match(/\b(20\d{2})\b/)?.[1] || "";
  }

  function exerciseMatchScore(legacy, raw) {
    const legacyText = legacy.text || "";
    const legacyYear = officialYear(legacyText);
    const rawYear = officialYear(raw.source);
    if (legacyYear && rawYear && legacyYear !== rawYear) return 0;
    const legacyTokens = [...new Set(normalizedMatchTokens(legacyText))];
    const rawTokens = new Set(normalizedMatchTokens(rawExerciseText(raw)));
    if (legacyTokens.length < 4 || rawTokens.size < 4) return 0;
    const common = legacyTokens.filter((token) => rawTokens.has(token)).length;
    const containment = common / legacyTokens.length;
    const yearBonus = legacyYear && rawYear === legacyYear ? 0.12 : 0;
    return common >= 2 ? containment + yearBonus : 0;
  }

  function matchedPartAnswers(raw, legacyQuestion) {
    const prepared = legacyQuestion.type === "pau-open" && !legacyQuestion.options?.length
      ? withPauTestOptions(legacyQuestion)
      : legacyQuestion;
    const expanded = expandCompositeQuestionParts(prepared);
    if (raw.parts.length === 1 && questionHasCoherentOptions(prepared)) {
      return [{
        options: prepared.options,
        correct: prepared.correct,
        solution: prepared.solution
      }];
    }
    if (expanded.parts?.length === raw.parts.length && expanded.parts.every((part) => questionHasCoherentOptions(part))) {
      return expanded.parts.map((part) => ({
        options: part.options,
        correct: part.correct,
        solution: part.solution
      }));
    }
    return null;
  }

  function prepareMatchedExercise(raw, legacyQuestion, blockId, rotationSeed) {
    const answers = matchedPartAnswers(raw, legacyQuestion);
    if (!answers) return null;
    const exactText = rawExerciseText(raw);
    const parts = raw.parts.map((part, partIndex) => {
      const answer = answers[partIndex];
      const amount = Math.abs(rotationSeed + partIndex) % answer.options.length;
      return {
        label: part.label,
        text: exercisePartPrompt(part),
        html: exercisePartPrompt(part, true),
        options: rotate(answer.options, amount),
        correct: (answer.correct - amount + answer.options.length) % answer.options.length,
        solution: answer.solution
      };
    });
    return {
      id: `${raw.id}|${normalizeDisplayText(exactText).replace(/\s+/g, " ").slice(0, 120)}`,
      rawBaseId: `${raw.id}|${raw.source}|${joinExerciseParagraphs(raw.statement)}`,
      source: raw.source,
      topicIndexes: Array.isArray(raw.topicIndexes) ? [...raw.topicIndexes] : [],
      blockId,
      text: joinExerciseParagraphs(raw.statement),
      statementHtml: joinExerciseParagraphs(raw.statement, true),
      parts,
      type: "corrected-official-exercise"
    };
  }

  function matchedCorrectedPool(course, topicIndex) {
    const cacheKey = `${course.id}|${topicIndex}`;
    if (matchedPoolCache.has(cacheKey)) return matchedPoolCache.get(cacheKey);
    const theme = course.themes[topicIndex] || "";
    const block = (BACH_II_BLOCKS[course.id] || []).find((item) => item.topics.includes(topicIndex));
    const rawPool = rawBanks(course.id)[block?.id] || [];
    const legacyPool = pickExerciseBank(theme.toLowerCase(), course.id)
      .map((question) => question.options?.length ? question : withPauTestOptions(question))
      .filter((question) => question.options?.length || question.parts?.length);
    const alreadyUsedRaw = new Set();
    const matches = [];
    legacyPool.forEach((legacyQuestion) => {
      let bestRaw = null;
      let bestScore = 0;
      rawPool.forEach((raw) => {
        const rawIdentity = `${raw.id}|${raw.source}|${rawExerciseText(raw)}`;
        if (alreadyUsedRaw.has(rawIdentity)) return;
        const score = exerciseMatchScore(legacyQuestion, raw);
        if (score > bestScore) {
          bestScore = score;
          bestRaw = raw;
        }
      });
      if (!bestRaw || bestScore < 0.38 || !matchedPartAnswers(bestRaw, legacyQuestion)) return;
      alreadyUsedRaw.add(`${bestRaw.id}|${bestRaw.source}|${rawExerciseText(bestRaw)}`);
      matches.push({ raw: bestRaw, legacyQuestion, blockId: block.id, score: bestScore });
    });
    matchedPoolCache.set(cacheKey, matches);
    return matches;
  }

  function startBachExam(selectedTopicIndexes = null) {
    clearQuestionTimer();
    const course = courseById(state.courseId);
    if (!BACH_II_COURSE_IDS.includes(course?.id)) {
      renderStudentHome();
      return;
    }
    if (Array.isArray(selectedTopicIndexes)) {
      const availability = window.MargaritaContentAvailability;
      const partition = availability?.partition
        ? availability.partition(course.id, selectedTopicIndexes, "exam")
        : { valid: selectedTopicIndexes, excluded: [] };
      if (partition.excluded.length) alert(availability.warning(course.id, partition.excluded, "exam"));
      if (!partition.valid.length) {
        renderBachIIHome();
        return;
      }
    }
    const seed = `${Date.now()}|${studentExamKey(course.id)}`;
    const questions = [1, 2, 3, 4, 5]
      .map((slot) => chooseWithoutRepeating(course.id, slot, seed))
      .filter(Boolean);
    if (questions.length !== 5) {
      alert("El examen todavía no dispone de cinco grupos completos de ejercicios revisados.");
      renderBachIIHome();
      return;
    }
    state.bachExam = {
      courseId: course.id,
      index: 0,
      score: 0,
      totalParts: questions.reduce((total, question) => total + question.parts.length, 0),
      questions: questions.map((question) => ({
        ...question,
        selections: Array(question.parts.length).fill(null),
        graded: false,
        results: [],
        showSolutions: false
      }))
    };
    renderBachExam();
  }

  function renderExamOptions(question, part, partIndex) {
    return part.options.map((option, optionIndex) => {
      const selected = question.selections[partIndex] === optionIndex;
      const correct = question.graded && part.correct === optionIndex;
      const wrong = question.graded && selected && !correct;
      const classes = ["answer-btn", selected ? "is-selected" : "", correct ? "correct" : "", wrong ? "wrong" : ""].filter(Boolean).join(" ");
      return `<button class="${classes}" ${question.graded ? "disabled" : ""} onclick="selectBachExamAnswer(${partIndex},${optionIndex})"><span class="answer-letter">${String.fromCharCode(65 + optionIndex)}</span><span class="answer-content">${formatMathText(option)}</span></button>`;
    }).join("");
  }

  function renderBachExam() {
    clearQuestionTimer();
    const exam = state.bachExam;
    const course = courseById(exam?.courseId);
    if (!exam || !course) {
      renderBachIIHome();
      return;
    }
    if (exam.index >= exam.questions.length) {
      renderBachExamResult();
      return;
    }
    const question = exam.questions[exam.index];
    // En PAU también cuenta como utilizado al mostrarse, aunque el alumno
    // abandone antes de corregir el ejercicio.
    markExamExerciseAnswered(exam.courseId, question);
    const labels = slotLabels[course.id] || [];
    const answeredCount = exam.questions.reduce((total, item) => total + (item.graded ? item.results.length : 0), 0);
    const partsHtml = question.parts.map((part, partIndex) => {
      const selected = question.selections[partIndex];
      const isCorrect = question.results[partIndex];
      return `
        <section class="exam-part">
          <div class="exam-part-prompt">${part.html}</div>
          <div class="answers exam-part-options">${renderExamOptions(question, part, partIndex)}</div>
          ${question.graded ? `<div class="part-feedback ${isCorrect ? "is-correct" : "is-wrong"}">${isCorrect ? "Respuesta correcta." : `Respuesta incorrecta. La opción correcta es ${String.fromCharCode(65 + part.correct)}.`}</div>` : ""}
          ${question.graded && question.showSolutions ? `<div class="solution-help exam-solution">${formatSolutionText(didacticSolutionText({ solution: part.solution }))}</div>` : ""}
        </section>
      `;
    }).join("");
    const allSelected = question.selections.every(Number.isInteger);
    const progress = Math.round(((exam.index + (question.graded ? 1 : 0)) / exam.questions.length) * 100);

    renderShell(`
      <section class="student-dashboard bach-exam-screen">
        <section class="screen-panel bach-exam-panel">
          <div class="workspace-head exam-workspace-head">
            <div>
              <span class="topic-kicker">Examen de ${escapeHtml(courseDisplayName(course))}</span>
              <h1>Ejercicio ${exam.index + 1} de 5 · ${escapeHtml(labels[question.slot - 1] || "Ejercicio")}</h1>
              <div class="badge-row">
                <span class="badge">Convocatoria: ${escapeHtml(officialConvocationLabel(question))}</span>
                <span class="badge">Aciertos: ${exam.score}/${answeredCount || 0}</span>
              </div>
            </div>
            <div class="dashboard-exit">
              <button class="ghost" onclick="leaveBachExam()">Volver</button>
              <button class="ghost" onclick="renderLogin()">Salir</button>
            </div>
          </div>
          <div class="progress exam-progress"><span style="width:${progress}%"></span></div>
          <article class="exam-question-card">
            ${renderOfficialSourceCallout(question, course.id)}
            <div class="question-text official-exercise-statement">${officialQuestionStatementHtml(question, course.id)}</div>
            <div class="exam-parts">${partsHtml}</div>
            <div class="exam-actions">
              ${!question.graded ? `<button class="primary" ${allSelected ? "" : "disabled"} onclick="gradeBachExamExercise()">Corregir ejercicio</button>` : `
                <button class="secondary" onclick="toggleBachExamSolutions()">${question.showSolutions ? "Ocultar resolución" : "Ver resolución paso a paso"}</button>
                <button class="primary" onclick="nextBachExamExercise()">${exam.index === 4 ? "Ver resultado del examen" : "Siguiente ejercicio"}</button>
              `}
            </div>
          </article>
        </section>
      </section>
    `);
  }

  function selectBachExamAnswer(partIndex, optionIndex) {
    const question = state.bachExam?.questions?.[state.bachExam.index];
    if (!question || question.graded) return;
    question.selections[partIndex] = optionIndex;
    renderBachExam();
  }

  function gradeBachExamExercise() {
    const exam = state.bachExam;
    const question = exam?.questions?.[exam.index];
    if (!question || question.graded || !question.selections.every(Number.isInteger)) return;
    question.results = question.parts.map((part, partIndex) => question.selections[partIndex] === part.correct);
    question.graded = true;
    markExamExerciseAnswered(exam.courseId, question);
    exam.score += question.results.filter(Boolean).length;
    renderBachExam();
  }

  function toggleBachExamSolutions() {
    const question = state.bachExam?.questions?.[state.bachExam.index];
    if (!question?.graded) return;
    question.showSolutions = !question.showSolutions;
    renderBachExam();
  }

  function nextBachExamExercise() {
    const exam = state.bachExam;
    const question = exam?.questions?.[exam.index];
    if (!question?.graded) return;
    exam.index += 1;
    renderBachExam();
  }

  function renderBachExamResult() {
    const exam = state.bachExam;
    const course = courseById(exam?.courseId);
    if (!exam || !course) {
      renderBachIIHome();
      return;
    }
    const percent = exam.totalParts ? Math.round((exam.score / exam.totalParts) * 100) : 0;
    const message = percent >= 80
      ? "Muy buen dominio de los bloques del examen."
      : percent >= 50
        ? "Buen trabajo. Revisa las resoluciones de los apartados que han fallado."
        : "Conviene repasar los bloques y volver a intentarlo con otro examen.";
    renderShell(`
      <section class="student-dashboard bach-exam-screen">
        <section class="screen-panel bach-exam-result">
          <span class="topic-kicker">Examen terminado</span>
          <h1>${escapeHtml(courseDisplayName(course))}</h1>
          <div class="exam-result-score">${exam.score}<small>de ${exam.totalParts} apartados correctos</small></div>
          <div class="progress exam-progress"><span style="width:${percent}%"></span></div>
          <p>${escapeHtml(message)}</p>
          <div class="exam-actions">
            <button class="primary" onclick="startBachExam()">Hacer otro examen</button>
            <button class="secondary" onclick="renderBachIIHome()">Volver al inicio</button>
          </div>
        </section>
      </section>
    `);
  }

  function leaveBachExam() {
    state.bachExam = null;
    renderBachIIHome();
  }

  function buildCorrectedTopicQuestions(course, topicIndex) {
    if (!BACH_II_COURSE_IDS.includes(course?.id)) return [];
    if (window.MargaritaContentAvailability?.isAvailable
      && !window.MargaritaContentAvailability.isAvailable(course.id, topicIndex, "topicPractice")) return [];
    ensurePauTopicMetadata(course.id);
    const entries = catalog(course.id)
      .filter((entry) => entry.topics.includes(topicIndex) && exerciseIsComplete(course.id, entry));
    const curated = seededShuffle(entries, `${course.id}|topic-${topicIndex}`).map((entry, index) => {
      const prepared = prepareExercise(course.id, entry, state.practiceRound + topicIndex + index);
      return {
        ...prepared,
        statementHtml: `<div class="official-source">Enunciado original · ${escapeHtml(prepared.source)}</div>${prepared.statementHtml}`
      };
    });
    const curatedIds = new Set(curated.map((question) => question.rawBaseId));
    const matched = matchedCorrectedPool(course, topicIndex)
      .map((match, index) => prepareMatchedExercise(match.raw, match.legacyQuestion, match.blockId, state.practiceRound + index))
      .filter(Boolean)
      .filter((question) => !curatedIds.has(question.rawBaseId))
      .map((question) => ({
        ...question,
        statementHtml: `<div class="official-source">Enunciado original · ${escapeHtml(question.source)}</div>${question.statementHtml}`
      }));
    const block = (BACH_II_BLOCKS[course.id] || []).find((item) => item.topics.includes(topicIndex));
    const classifiedRaw = (rawBanks(course.id)[block?.id] || [])
      .filter((raw) => raw.topicIndexes.includes(topicIndex))
      .map((raw, index) => completeRawExercise(course.id, raw, block.id, state.practiceRound + topicIndex + index))
      .filter(Boolean)
      .map((question) => ({
        ...question,
        statementHtml: `<div class="official-source">Enunciado original · ${escapeHtml(question.source)}</div>${question.statementHtml}`
      }));
    const seen = new Set();
    return [...curated, ...classifiedRaw]
      .filter((question) => questionAvailableForMode(course.id, question, "topicPractice"))
      .filter((question) => {
      const identity = officialQuestionDedupKey(question);
      if (!identity || seen.has(identity)) return false;
      seen.add(identity);
      return true;
      });
  }

  function buildCorrectedBlockQuestions(course, blockId) {
    if (!BACH_II_COURSE_IDS.includes(course?.id)) return [];
    ensurePauTopicMetadata(course.id);
    const entries = catalog(course.id)
      .filter((entry) => entry.block === blockId && exerciseIsComplete(course.id, entry));
    const curated = entries.map((entry, index) => prepareExercise(course.id, entry, state.practiceRound + index));
    const curatedIds = new Set(curated.map((question) => question.rawBaseId));
    const topicIndexes = (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === blockId)?.topics || [];
    const matched = topicIndexes.flatMap((topicIndex) => matchedCorrectedPool(course, topicIndex))
      .map((match, index) => prepareMatchedExercise(match.raw, match.legacyQuestion, blockId, state.practiceRound + index))
      .filter(Boolean)
      .filter((question) => !curatedIds.has(question.rawBaseId));
    const completeRaw = (rawBanks(course.id)[blockId] || [])
      .map((raw, index) => completeRawExercise(course.id, raw, blockId, state.practiceRound + index))
      .filter(Boolean);
    const seen = new Set();
    return [...curated, ...matched, ...completeRaw]
      .filter((question) => questionAvailableForMode(course.id, question, "examByBlocks"))
      .filter((question) => {
      const identity = officialQuestionDedupKey(question);
      if (seen.has(identity)) return false;
      seen.add(identity);
      return true;
      });
  }

  function auditExactPoolCounts(course) {
    return {
      topics: course.themes.map((theme, topicIndex) => ({
        topicIndex,
        theme,
        count: buildCorrectedTopicQuestions(course, topicIndex).length
      })),
      blocks: (BACH_II_BLOCKS[course.id] || []).map((block) => ({
        block: block.id,
        count: buildCorrectedBlockQuestions(course, block.id).length
      }))
    };
  }

  function auditExamSlotCounts(course) {
    return [1, 2, 3, 4, 5].map((slot) => ({
      slot,
      label: slotLabels[course.id]?.[slot - 1] || `Grupo ${slot}`,
      count: buildExamSlotPool(course.id, slot, 0).length
    }));
  }

  window.startBachExam = startBachExam;
  window.renderBachExam = renderBachExam;
  window.selectBachExamAnswer = selectBachExamAnswer;
  window.gradeBachExamExercise = gradeBachExamExercise;
  window.toggleBachExamSolutions = toggleBachExamSolutions;
  window.nextBachExamExercise = nextBachExamExercise;
  window.leaveBachExam = leaveBachExam;
  window.MargaritaBachExam = {
    buildTopicQuestions: buildCorrectedTopicQuestions,
    buildBlockQuestions: buildCorrectedBlockQuestions,
    buildExamSlotPool,
    chooseWithoutRepeating,
    chooseFromExamPoolWithoutRepeating,
    markExamExerciseAnswered,
    auditExactPoolCounts,
    auditExamSlotCounts,
    classifiedPauTopicIndexes,
    ensurePauTopicMetadata
  };
})();

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
      : window.CCSS_II_BLOCK_ANSWERS || {};
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
    return Boolean(raw && authored && raw.parts?.length && raw.parts.every((part) => {
      const answer = authored[part.label];
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
    return [state.academicYear, courseId, student.group || student.groupLabel, student.name].filter(Boolean).join("|");
  }

  function readExamHistory() {
    try {
      return JSON.parse(localStorage.getItem(EXAM_HISTORY_KEY) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function chooseWithoutRepeating(courseId, slot, seed) {
    const pool = catalog(courseId).filter((entry) => entry.slot === slot && exerciseIsComplete(courseId, entry));
    if (!pool.length) return null;
    const history = readExamHistory();
    const key = `${studentExamKey(courseId)}|slot-${slot}`;
    let used = Array.isArray(history[key]) ? history[key].filter((id) => pool.some((entry) => entry.id === id)) : [];
    let available = pool.filter((entry) => !used.includes(entry.id));
    if (!available.length) {
      const lastId = used.at(-1);
      used = lastId && pool.length > 1 ? [lastId] : [];
      available = pool.filter((entry) => !used.includes(entry.id));
    }
    const selected = seededShuffle(available, `${seed}|${slot}|${used.length}`)[0];
    history[key] = [...used, selected.id];
    localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history));
    return selected;
  }

  function prepareExercise(courseId, entry, rotationSeed = 0) {
    const raw = findRawExercise(courseId, entry);
    const authored = answerBank(courseId)[entry.id];
    if (!raw || !authored) return null;
    const parts = raw.parts.map((part, partIndex) => {
      const answer = authored[part.label];
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

  function startBachExam() {
    clearQuestionTimer();
    const course = courseById(state.courseId);
    if (!BACH_II_COURSE_IDS.includes(course?.id)) {
      renderStudentHome();
      return;
    }
    const seed = `${Date.now()}|${studentExamKey(course.id)}`;
    const questions = [1, 2, 3, 4, 5].map((slot) => {
      const entry = chooseWithoutRepeating(course.id, slot, seed);
      return entry ? prepareExercise(course.id, entry, slot + Date.now()) : null;
    }).filter(Boolean);
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
                <span class="badge">${escapeHtml(question.source)}</span>
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
            <div class="official-source">Enunciado original · ${escapeHtml(question.source)}</div>
            <div class="question-text official-exercise-statement">${question.statementHtml}</div>
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
    return [...curated, ...matched];
  }

  function buildCorrectedBlockQuestions(course, blockId) {
    if (!BACH_II_COURSE_IDS.includes(course?.id)) return [];
    const entries = catalog(course.id)
      .filter((entry) => entry.block === blockId && exerciseIsComplete(course.id, entry));
    const curated = entries.map((entry, index) => prepareExercise(course.id, entry, state.practiceRound + index));
    const curatedIds = new Set(curated.map((question) => question.rawBaseId));
    const topicIndexes = (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === blockId)?.topics || [];
    const matched = topicIndexes.flatMap((topicIndex) => matchedCorrectedPool(course, topicIndex))
      .map((match, index) => prepareMatchedExercise(match.raw, match.legacyQuestion, blockId, state.practiceRound + index))
      .filter(Boolean)
      .filter((question) => !curatedIds.has(question.rawBaseId));
    const seen = new Set();
    return [...curated, ...matched].filter((question) => {
      const identity = challengeQuestionIdentity(question);
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
    auditExactPoolCounts
  };
})();

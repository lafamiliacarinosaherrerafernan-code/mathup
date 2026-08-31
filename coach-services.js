(function () {
  "use strict";

  const STORAGE_KEY = "margaritaSalasCoachV1";
  const ELIGIBLE_COURSES = new Set(["1eso", "2eso", "3eso", "4eso-a", "4eso-b", "1bach-mates", "1bach-ccss"]);
  const data = window.MARGARITA_COACH_DATA;

  // Relación explícita entre los temas pedagógicos del entrenador y los
  // índices reales del temario. No se infiere la pertenencia por palabras.
  const COURSE_TOPIC_INDEXES = {
    "1eso": { "hierarchy": [0], "mixed-operations": [0], "integers": [1], "powers-roots": [2], "fractions": [3], "algebra": [4], "proportionality": [5], "percentages": [5], "geometry": [6, 7, 8], "areas-volumes": [7, 8], "functions": [9] },
    "2eso": { "mixed-operations": [0], "integers": [0], "powers-roots": [1], "fractions": [2], "proportionality": [3], "percentages": [3], "algebra": [4], "equations": [5], "systems": [5], "geometry": [6, 7], "areas-volumes": [6, 7], "functions": [8] },
    "3eso": { "real-numbers": [0], "powers-roots": [1], "algebra": [2], "equations-systems-3eso": [3], "proportionality": [4], "sequences": [5], "geometry-3eso": [6], "functions": [7], "statistics": [8], "probability": [9] },
    "4eso-a": { "real-numbers": [0], "mixed-operations": [0], "powers-roots": [1], "radicals": [1], "proportionality": [2], "algebra": [3], "equations": [4], "systems": [5], "geometry": [6, 7], "trigonometry": [6], "areas-volumes": [7], "functions": [8] },
    "4eso-b": { "real-numbers": [0], "mixed-operations": [0], "powers-roots": [1], "radicals": [1], "algebra": [2], "equations": [3, 4], "systems": [3, 4], "proportionality": [5], "geometry": [6, 8], "trigonometry": [7], "analytic-geometry": [8], "functions": [9], "limits": [10, 12], "derivatives": [11], "combinatorics": [13] },
    "1bach-mates": { "real-numbers": [0], "complex-numbers": [1], "algebra": [2], "equations": [2], "systems": [2], "trigonometry": [3], "analytic-geometry": [4], "geometry": [4], "conics": [5], "functions": [6], "limits": [7], "continuity": [7], "derivatives": [8, 9], "statistics-probability": [10] },
    "1bach-ccss": { "statistics": [0], "probability": [1], "binomial": [2], "normal-distribution": [3], "statistics-probability": [0, 1, 2, 3], "real-numbers": [4], "complex-numbers": [5], "algebra": [6, 7], "equations": [6], "systems": [6], "inequalities": [7], "functions": [8], "ccss-derivatives": [9], "derivative-applications": [10], "combinatorics": [11] }
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function readStore() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch {
      return {};
    }
  }

  function writeStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function authenticatedStudentId() {
    if (!state.student) return "";
    return currentStudentKey();
  }

  function isEligible() {
    return Boolean(state.student && state.student.courseId === state.courseId && ELIGIBLE_COURSES.has(state.courseId));
  }

  function emptyStudentData() {
    return {
      studentProfile: null,
      diagnosticResults: [],
      studySessions: [],
      activityResults: [],
      learningProfile: {
        studentId: authenticatedStudentId(),
        topicMastery: {},
        recentErrors: [],
        priorityTopics: [],
        reviewTopics: [],
        masteredTopics: [],
        recommendedDifficulty: 1,
        prerequisiteMastery: {},
        prerequisiteGaps: []
      }
    };
  }

  function getStudentData() {
    if (!isEligible()) return null;
    const store = readStore();
    const id = authenticatedStudentId();
    if (!store[id]) store[id] = emptyStudentData();
    if (!store[id].studentProfile) {
      store[id].studentProfile = {
        id,
        name: state.student.name,
        course: state.courseId,
        group: state.student.groupLabel || state.student.group,
        academicYear: state.academicYear,
        estimatedLevel: "Sin estimar",
        strengths: [],
        weaknesses: [],
        diagnosticCompleted: false,
        lastSessionDate: null
      };
    }
    writeStore(store);
    return clone(store[id]);
  }

  function updateStudentData(mutator) {
    if (!isEligible()) return null;
    const store = readStore();
    const id = authenticatedStudentId();
    const studentData = store[id] || emptyStudentData();
    if (!studentData.studentProfile) getStudentData();
    const refreshed = readStore();
    const value = refreshed[id];
    mutator(value);
    refreshed[id] = value;
    writeStore(refreshed);
    return clone(value);
  }

  function topicLabel(topicId) {
    return data.topics[topicId]?.label || topicId;
  }

  function inferTopicId(theme, courseId = "") {
    const lower = normalizeDisplayText(theme || "").toLowerCase();
    if (courseId === "3eso") {
      if (/ecuacion.*sistema|sistema.*ecuacion/.test(lower)) return "equations-systems-3eso";
      if (/sucesion/.test(lower)) return "sequences";
      if (/cuerpo.*geometr/.test(lower)) return "geometry-3eso";
      if (/estad/.test(lower)) return "statistics";
      if (/probab/.test(lower)) return "probability";
    }
    if (/primo/.test(lower)) return "primes";
    if (/divis/.test(lower)) return "divisibility";
    if (/mcd|mcm|multiplo|factor/.test(lower)) return "mcd-mcm";
    if (/entero/.test(lower)) return "integers";
    if (/potencia|raiz|radical/.test(lower)) return /radical/.test(lower) ? "radicals" : "powers-roots";
    if (/fraccion/.test(lower)) return "fractions";
    if (/propor|porcentaje/.test(lower)) return "proportionality";
    if (/ecuacion|inecuacion/.test(lower)) return "equations";
    if (/sistema/.test(lower)) return "systems";
    if (/algebra|expresion/.test(lower)) return "algebra";
    if (/trigono/.test(lower)) return "trigonometry";
    if (/conica/.test(lower)) return "conics";
    if (/combinatoria/.test(lower)) return "combinatorics";
    if (/geometr|area|volumen|cuerpo|figura|semejanza/.test(lower)) return "geometry";
    if (/funcion/.test(lower)) return "functions";
    if (/limite/.test(lower)) return "limits";
    if (/continui/.test(lower)) return "continuity";
    if (/aplicacion.*deriv|deriv.*aplicacion/.test(lower)) return "derivative-applications";
    if (/deriv/.test(lower)) return "derivatives";
    if (/complejo/.test(lower)) return "complex-numbers";
    if (/estad|probab|distribu/.test(lower)) return "statistics-probability";
    if (/real/.test(lower)) return "real-numbers";
    return "mixed-operations";
  }

  function adaptQuestion(question, course, theme, index, topicOverride) {
    if (!question?.options?.length || question.options.length !== 4) return null;
    const topic = topicOverride || inferTopicId(theme);
    return {
      ...question,
      id: question.exerciseId || question.id || `adapted-${course.id}-${topic}-${index}-${Math.abs(hashText(question.text || ""))}`,
      course: course.id,
      topic,
      subtopic: theme || topicLabel(topic),
      difficulty: question.difficulty || 2,
      competency: "Razonamiento y resolución de problemas",
      prerequisites: data.topics[topic]?.prerequisites || [],
      text: question.text,
      options: [...question.options],
      correct: question.correct,
      solution: question.solution || `La respuesta correcta es ${question.options[question.correct]}.`,
      explanation: question.solution || `Revisa ${topicLabel(topic)} y comprueba cada operación.`,
      commonError: question.errorType || `Error de procedimiento en ${topicLabel(topic)}`,
      pedagogicalPriority: data.topics[topic]?.priority || 50,
      learningOrder: data.topics[topic]?.priority || 50
    };
  }

  function hashText(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    return hash;
  }

  function firstEsoQuestion(question) {
    return {
      ...clone(question),
      course: "1eso",
      competency: "Cálculo y sentido numérico",
      prerequisites: data.topics[question.topic]?.prerequisites || [],
      solution: question.solution || `La opción correcta es ${question.options[question.correct]}. ${topicLabel(question.topic)} se comprueba aplicando la regla correspondiente paso a paso.`,
      explanation: question.explanation || `Recuerda la regla esencial de ${topicLabel(question.topic)} y aplícala antes de calcular.`,
      commonError: question.errorType,
      pedagogicalPriority: data.topics[question.topic]?.priority || 1,
      learningOrder: data.topics[question.topic]?.priority || 1
    };
  }

  function distributeCorrectAnswerPositions(questions) {
    return questions.map((question, index) => {
      const options = [...question.options];
      const targetPosition = index % options.length;
      const amount = (question.correct - targetPosition + options.length) % options.length;
      return {
        ...question,
        options: options.slice(amount).concat(options.slice(0, amount)),
        correct: targetPosition
      };
    });
  }

  function courseDiagnostic(course) {
    if (course.id === "1eso") {
      return distributeCorrectAnswerPositions(data.firstEsoDiagnostic.map(firstEsoQuestion));
    }
    if (course.id === "3eso") {
      const priorities = data.coursePriorities[course.id] || [];
      const questions = priorities
        .map((topic) => poolForRecommendedDifficulty(questionsForTopic(course, topic), 1)[0])
        .filter(Boolean);
      return distributeCorrectAnswerPositions(questions.slice(0, 10));
    }
    const questions = [];
    course.themes.forEach((theme, themeIndex) => {
      const bank = pickExerciseBank(theme.toLowerCase(), course.id);
      const candidate = bank.find((item) => item.options?.length === 4);
      const adapted = adaptQuestion(candidate, course, theme, themeIndex);
      if (adapted) questions.push(adapted);
    });
    return questions.slice(0, 10);
  }

  function levelFromRate(rate) {
    if (rate < 0.50) return "Nivel inicial";
    if (rate < 0.70) return "Nivel básico";
    if (rate < 0.85) return "Nivel medio";
    return "Nivel avanzado";
  }

  function recomputeLearningProfile(studentData) {
    const results = studentData.activityResults;
    const byTopic = {};
    results.forEach((result) => {
      const bucket = byTopic[result.topic] || { attempts: 0, correct: 0, sessions: new Set(), hints: 0, time: 0, errors: [] };
      bucket.attempts += 1;
      bucket.correct += result.isCorrect ? 1 : 0;
      bucket.sessions.add(result.sessionId);
      bucket.hints += result.hintsUsed || 0;
      bucket.time += result.timeSpent || 0;
      if (!result.isCorrect && result.errorType) bucket.errors.push(result.errorType);
      byTopic[result.topic] = bucket;
    });

    const topicMastery = {};
    Object.entries(byTopic).forEach(([topic, bucket]) => {
      const accuracy = bucket.attempts ? bucket.correct / bucket.attempts : 0;
      const repeated = bucket.sessions.size >= data.settings.mastery.minimumSessions;
      topicMastery[topic] = {
        attempts: bucket.attempts,
        correct: bucket.correct,
        accuracy,
        sessions: bucket.sessions.size,
        hintsUsed: bucket.hints,
        averageTime: bucket.attempts ? Math.round(bucket.time / bucket.attempts) : 0,
        status: accuracy >= data.settings.mastery.masteredMin && repeated ? "Dominado" : accuracy >= 0.70 ? "En consolidación" : accuracy >= 0.50 ? "Básico" : "Inicial",
        mastered: accuracy >= data.settings.mastery.masteredMin && repeated
      };
    });
    studentData.learningProfile.topicMastery = topicMastery;
    studentData.learningProfile.masteredTopics = Object.keys(topicMastery).filter((topic) => topicMastery[topic].mastered);
    studentData.learningProfile.priorityTopics = Object.keys(topicMastery)
      .filter((topic) => topicMastery[topic].accuracy < 0.70)
      .sort((a, b) => topicMastery[a].accuracy - topicMastery[b].accuracy);
    studentData.learningProfile.reviewTopics = Object.keys(topicMastery).filter((topic) => topicMastery[topic].accuracy >= 0.70 && !topicMastery[topic].mastered);
    studentData.learningProfile.recentErrors = results.filter((result) => !result.isCorrect).slice(-12).map((result) => result.errorType);
    studentData.learningProfile.recommendedDifficulty = studentData.learningProfile.priorityTopics.length ? 1 : studentData.learningProfile.masteredTopics.length >= 3 ? 3 : 2;
    studentData.learningProfile.prerequisiteGaps = detectPrerequisiteGapsFromData(studentData);
    studentData.learningProfile.prerequisiteMastery = Object.fromEntries(Object.keys(data.topics).map((topic) => [topic, topicMastery[topic]?.accuracy || 0]));

    const allMastery = Object.values(topicMastery);
    const overallRate = allMastery.length ? allMastery.reduce((sum, topic) => sum + topic.accuracy, 0) / allMastery.length : 0;
    studentData.studentProfile.estimatedLevel = levelFromRate(overallRate);
    const latestDiagnostic = studentData.diagnosticResults.at(-1);
    const strengthTopics = [...new Set([...studentData.learningProfile.masteredTopics, ...(latestDiagnostic?.detectedStrengths || [])])];
    const weaknessTopics = [...new Set([...studentData.learningProfile.priorityTopics, ...(latestDiagnostic?.detectedWeaknesses || [])])];
    studentData.studentProfile.strengths = strengthTopics.map(topicLabel).slice(0, 5);
    studentData.studentProfile.weaknesses = weaknessTopics.map(topicLabel).slice(0, 5);
  }

  function detectPrerequisiteGapsFromData(studentData) {
    const mastery = studentData.learningProfile.topicMastery || {};
    const priorities = data.coursePriorities[state.courseId] || [];
    const gaps = new Set();
    priorities.forEach((topic) => {
      const accuracy = mastery[topic]?.accuracy || 0;
      if (mastery[topic]?.attempts && accuracy < 0.70) {
        (data.topics[topic]?.prerequisites || []).forEach((prerequisite) => {
          const required = data.topics[topic]?.minimumMasteryRequired || 0.70;
          const hasCourseRoute = priorities.includes(prerequisite)
            && (COURSE_TOPIC_INDEXES[state.courseId]?.[prerequisite] || []).length > 0;
          if (hasCourseRoute && (mastery[prerequisite]?.accuracy || 0) < required) gaps.add(prerequisite);
        });
      }
    });
    return [...gaps];
  }

  function saveDiagnostic(answers, startedAt) {
    return updateStudentData((studentData) => {
      const diagnosticId = `diagnostic-${Date.now()}`;
      const activityResults = answers.map((answer) => ({
        id: `activity-${Date.now()}-${answer.question.id}`,
        sessionId: diagnosticId,
        topic: answer.question.topic,
        subtopic: answer.question.subtopic,
        difficulty: answer.question.difficulty,
        answer: answer.answer,
        correctAnswer: answer.question.options[answer.question.correct],
        isCorrect: answer.isCorrect,
        attempts: answer.attempts || 1,
        hintsUsed: answer.hintsUsed || 0,
        timeSpent: answer.timeSpent || 0,
        errorType: answer.isCorrect ? "" : answer.question.commonError
      }));
      studentData.activityResults.push(...activityResults);
      const correct = activityResults.filter((item) => item.isCorrect).length;
      const topics = [...new Set(activityResults.map((item) => item.topic))];
      const topicRates = topics.map((topic) => {
        const scoped = activityResults.filter((item) => item.topic === topic);
        return { topic, rate: scoped.filter((item) => item.isCorrect).length / scoped.length };
      });
      studentData.diagnosticResults.push({
        id: diagnosticId,
        studentId: authenticatedStudentId(),
        date: new Date().toISOString(),
        course: state.courseId,
        answers: activityResults,
        correctAnswers: correct,
        incorrectAnswers: activityResults.length - correct,
        detectedWeaknesses: topicRates.filter((item) => item.rate < 0.70).map((item) => item.topic),
        detectedStrengths: topicRates.filter((item) => item.rate >= 0.85).map((item) => item.topic),
        estimatedLevel: levelFromRate(correct / Math.max(1, activityResults.length)),
        timeSpent: Math.max(1, Math.round((Date.now() - startedAt) / 1000))
      });
      studentData.studentProfile.diagnosticCompleted = true;
      recomputeLearningProfile(studentData);
    });
  }

  const firstEsoPool = [...data.firstEsoDiagnostic, ...data.firstEsoPractice];
  const criticalPractice = {
    "primes": firstEsoPool.filter((question) => question.topic === "primes"),
    "divisibility": firstEsoPool.filter((question) => question.topic === "divisibility"),
    "factors": firstEsoPool.filter((question) => question.topic === "factors"),
    "mcd-mcm": firstEsoPool.filter((question) => question.topic === "mcd-mcm"),
    "hierarchy": firstEsoPool.filter((question) => question.topic === "hierarchy"),
    "integers": firstEsoPool.filter((question) => question.topic === "integers"),
    "powers-roots": firstEsoPool.filter((question) => question.topic === "powers-roots"),
    "fractions": firstEsoPool.filter((question) => question.topic === "fractions")
  };

  function questionsForTopic(course, topic) {
    const special = course.id === "1eso"
      ? (criticalPractice[topic] || [])
        .map(firstEsoQuestion)
        .map((question) => window.MargaritaExerciseSelector.decorateExerciseForTopic(question, course, 0, "coach-diagnostic-bank"))
        .filter(Boolean)
      : [];
    const firstEsoMicroTopic = course.id === "1eso" && ["primes", "divisibility", "factors", "mcd-mcm"].includes(topic);
    const allowedIndexes = firstEsoMicroTopic ? [] : (COURSE_TOPIC_INDEXES[course.id]?.[topic] || []);
    const matchingThemes = allowedIndexes
      .filter((themeIndex) => course.themes[themeIndex])
      .map((themeIndex) => ({ theme: course.themes[themeIndex], themeIndex }));
    const adapted = matchingThemes.flatMap(({ theme, themeIndex }) => {
      const lower = theme.toLowerCase();
      const sourcePool = course.id === "1bach-mates" || course.id === "1bach-ccss"
        ? [...firstBachBankByTopic(course.id, themeIndex), ...firstBachExtensionBankByTopic(course.id, themeIndex)]
        : [...(window.MargaritaEsoExamVerified?.build?.(course.id, theme) || [])];
      if (course.id === "3eso") {
        // El entrenador debe poder trabajar con el banco real completo de
        // 3.º ESO: práctica original, ejercicios verificados y ampliación A/B.
        sourcePool.push(...(window.MargaritaEsoOriginalPractice?.all?.(course.id, theme) || []));
        sourcePool.push(...(window.MargaritaEso3ApprovedABPractice?.all?.(course.id, theme) || []));
      }
      sourcePool.push(...(window.MargaritaFirstBachVariety?.build?.(course.id, theme) || []));
      sourcePool.push(...(window.MargaritaCombinatoricsSupplied?.build?.(course.id, theme) || []));
      if (isEsoCourseId(course.id)) {
        for (let seed = 0; seed < 40; seed += 1) {
          const progression = seed % 10;
          const difficulty = seed < 12 ? "easy" : seed < 28 ? "medium" : "hard";
          sourcePool.push(generatedEsoDifficultyQuestion(
            lower,
            course.id,
            difficulty,
            themeIndex * 100003 + seed * 7919,
            progression,
            progression
          ));
        }
      }
      const decoratedPool = sourcePool
        .map((question) => window.MargaritaExerciseSelector.decorateExerciseForTopic(question, course, themeIndex, "coach-bank"))
        .filter((question) => window.MargaritaExerciseSelector.exerciseMatchesTopic(question, course.id, themeIndex));
      return window.MargaritaExerciseSelector.availableTopicQuestions({
        course,
        topicIndex: themeIndex,
        questions: decoratedPool,
        sourceType: "coach-bank",
        historyMode: "coach"
      })
        .map((question, index) => adaptQuestion(question, course, theme, index, topic))
        .filter(Boolean);
    });
    const seen = new Set();
    return [...special, ...adapted].filter((question) => {
      const identity = question.id || `${question.topic}|${question.text}`;
      if (!identity || seen.has(identity)) return false;
      seen.add(identity);
      return true;
    });
  }

  function previouslyUsedCoachQuestionIds(studentData) {
    const ids = new Set();
    (studentData.studySessions || []).forEach((session) => {
      (session.activities || []).forEach((activity) => {
        if (activity?.id) ids.add(activity.id);
      });
    });
    (studentData.activityResults || []).forEach((result) => {
      if (result?.questionId) ids.add(result.questionId);
    });
    return ids;
  }

  function questionDifficultyRank(question) {
    const value = String(question?.challengeLevel || question?.difficulty || "").toLowerCase();
    if (value === "master" || value === "hard" || value === "3") return 3;
    if (value === "medium" || value === "2") return 2;
    if (value === "apprentice" || value === "easy" || value === "1") return 1;
    const numeric = Number(question?.difficulty);
    return Number.isFinite(numeric) ? Math.max(1, Math.min(3, Math.round(numeric))) : 2;
  }

  function poolForRecommendedDifficulty(pool, recommendedDifficulty) {
    const target = Math.max(1, Math.min(3, Number(recommendedDifficulty) || 1));
    const exact = pool.filter((question) => questionDifficultyRank(question) === target);
    if (exact.length) return exact;
    return [...pool].sort((left, right) => (
      Math.abs(questionDifficultyRank(left) - target) - Math.abs(questionDifficultyRank(right) - target)
    ));
  }

  function selectSessionTopics(studentData) {
    const priorities = data.coursePriorities[state.courseId] || [];
    const profile = studentData.learningProfile;
    const gap = profile.prerequisiteGaps.find((topic) => priorities.includes(topic)
      && (COURSE_TOPIC_INDEXES[state.courseId]?.[topic] || []).length > 0);
    const weak = gap || profile.priorityTopics[0] || priorities.find((topic) => !profile.masteredTopics.includes(topic)) || priorities[0];
    const consolidation = profile.reviewTopics.find((topic) => topic !== weak)
      || priorities.find((topic) => topic !== weak && profile.topicMastery[topic]?.attempts)
      || priorities.find((topic) => topic !== weak)
      || weak;
    const review = profile.masteredTopics.find((topic) => topic !== weak && topic !== consolidation)
      || priorities.find((topic) => topic !== weak && topic !== consolidation)
      || consolidation;
    return { weak, consolidation, review };
  }

  function sessionLayout(duration, selected) {
    const layouts = {
      10: ["review", "weak", "weak", "consolidation", "weak"],
      15: ["review", "consolidation", "weak", "weak", "weak", "consolidation", "weak"],
      20: ["review", "consolidation", "weak", "weak", "weak", "consolidation", "review", "weak", "weak"],
      30: ["review", "consolidation", "weak", "weak", "weak", "consolidation", "review", "weak", "weak", "consolidation", "weak", "weak"]
    };
    const phases = ["Activación", "Activación", "Aprende", "Práctica guiada", "Práctica guiada", "Práctica autónoma", "Repaso espaciado", "Práctica autónoma", "Práctica autónoma", "Consolidación", "Práctica autónoma", "Reto final"];
    const validDuration = data.settings.sessionMinutes.includes(Number(duration)) ? Number(duration) : data.settings.defaultSessionMinutes;
    return layouts[validDuration].map((topicType, index, layout) => ({
      phase: index === layout.length - 1 ? "Reto final" : phases[index],
      topic: selected[topicType]
    }));
  }

  function buildSession(duration = data.settings.defaultSessionMinutes) {
    const studentData = getStudentData();
    if (!studentData?.studentProfile.diagnosticCompleted) return null;
    const course = courseById(state.courseId);
    const selected = selectSessionTopics(studentData);
    const layout = sessionLayout(duration, selected);
    const used = new Set();
    const previouslyUsed = previouslyUsedCoachQuestionIds(studentData);
    const diagnosticFallback = courseDiagnostic(course);
    const activities = layout.map((slot, index) => {
      const pool = questionsForTopic(course, slot.topic);
      const difficultyPool = poolForRecommendedDifficulty(pool, studentData.learningProfile.recommendedDifficulty);
      const notUsedBefore = difficultyPool.filter((question) => !previouslyUsed.has(question.id));
      const activePool = notUsedBefore.length ? notUsedBefore : difficultyPool;
      const available = activePool.find((question) => !used.has(question.id))
        || difficultyPool.find((question) => !used.has(question.id))
        || difficultyPool[index % Math.max(1, difficultyPool.length)]
        || pool.find((question) => !used.has(question.id))
        || diagnosticFallback[index % Math.max(1, diagnosticFallback.length)]
        || firstEsoQuestion(data.firstEsoDiagnostic[index % data.firstEsoDiagnostic.length]);
      used.add(available.id);
      return { ...clone(available), phase: slot.phase, hint: `Empieza identificando la regla de ${topicLabel(slot.topic)} que necesitas aplicar.` };
    });
    return {
      id: `session-${Date.now()}`,
      studentId: authenticatedStudentId(),
      date: new Date().toISOString(),
      course: state.courseId,
      duration: Number(duration) || data.settings.defaultSessionMinutes,
      status: "in_progress",
      mainTopic: selected.weak,
      activities,
      score: 0,
      timeSpent: 0,
      detectedErrors: [],
      nextRecommendation: ""
    };
  }

  function evaluateSession(session, answers, startedAt) {
    return updateStudentData((studentData) => {
      const activityResults = answers.map((answer, index) => ({
        id: `activity-${Date.now()}-${index}`,
        questionId: answer.question.id,
        sessionId: session.id,
        topic: answer.question.topic,
        subtopic: answer.question.subtopic,
        difficulty: answer.question.difficulty,
        answer: answer.answer,
        correctAnswer: answer.question.options[answer.question.correct],
        isCorrect: answer.isCorrect,
        attempts: answer.attempts || 1,
        hintsUsed: answer.hintsUsed || 0,
        timeSpent: answer.timeSpent || 0,
        errorType: answer.isCorrect ? "" : answer.question.commonError
      }));
      const correct = activityResults.filter((result) => result.isCorrect).length;
      const errors = activityResults.filter((result) => !result.isCorrect).map((result) => result.errorType);
      const completed = {
        ...session,
        status: "completed",
        score: correct,
        timeSpent: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
        detectedErrors: errors,
        nextRecommendation: errors.length
          ? `La próxima sesión reforzará ${topicLabel(session.mainTopic)} y sus prerrequisitos.`
          : `La próxima sesión aumentará progresivamente la dificultad de ${topicLabel(session.mainTopic)}.`
      };
      studentData.activityResults.push(...activityResults);
      studentData.studySessions.push(completed);
      studentData.studentProfile.lastSessionDate = completed.date;
      recomputeLearningProfile(studentData);
    });
  }

  function progressSummary() {
    const studentData = getStudentData();
    if (!studentData) return null;
    const completed = studentData.studySessions.filter((session) => session.status === "completed");
    const totalSeconds = completed.reduce((sum, session) => sum + (session.timeSpent || 0), 0);
    const dates = [...new Set(completed.map((session) => session.date.slice(0, 10)))].sort().reverse();
    let streak = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    for (const date of dates) {
      const value = new Date(`${date}T00:00:00`);
      const difference = Math.round((cursor - value) / 86400000);
      if (difference === streak) streak += 1;
      else if (!(streak === 0 && difference === 1)) break;
    }
    return { studentData, completed, totalSeconds, streak };
  }

  const FutureAiCoachProvider = {
    isConfigured() {
      return Boolean(window.__MARGARITA_COACH_CONFIG__?.serverEndpoint);
    },
    async generate() {
      throw new Error("La IA externa no está activada. Configure un endpoint seguro de servidor; nunca una clave en el navegador.");
    }
  };

  window.MargaritaCoach = {
    STORAGE_KEY,
    isEligible,
    getStudentData,
    topicLabel,
    generateDiagnostic() {
      if (!isEligible()) return [];
      return courseDiagnostic(courseById(state.courseId));
    },
    analyzeStudentPerformance() {
      const studentData = getStudentData();
      return studentData?.learningProfile || null;
    },
    detectPrerequisiteGaps() {
      const studentData = getStudentData();
      return studentData ? detectPrerequisiteGapsFromData(studentData) : [];
    },
    generateStudySession: buildSession,
    evaluateSession,
    saveDiagnostic,
    generateNextRecommendation() {
      const summary = progressSummary();
      return summary?.completed.at(-1)?.nextRecommendation || "Realiza el diagnóstico para preparar tu primera sesión.";
    },
    progressSummary,
    services: {
      LearningCoachService: { generateStudySession: buildSession, generateNextRecommendation: () => window.MargaritaCoach.generateNextRecommendation() },
      DiagnosticService: { generateDiagnostic: () => window.MargaritaCoach.generateDiagnostic(), saveDiagnostic },
      SessionGeneratorService: { generateStudySession: buildSession },
      ProgressAnalysisService: { analyzeStudentPerformance: () => window.MargaritaCoach.analyzeStudentPerformance() },
      PrerequisiteAnalysisService: { detectPrerequisiteGaps: () => window.MargaritaCoach.detectPrerequisiteGaps() },
      FutureAiCoachProvider
    }
  };
  if (window.__MARGARITA_ENABLE_AUDIT__) {
    window.MargaritaCoach.__audit = {
      questionsForTopic,
      previouslyUsedCoachQuestionIds,
      questionDifficultyRank,
      poolForRecommendedDifficulty,
      selectSessionTopics,
      inferTopicId
    };
  }
}());

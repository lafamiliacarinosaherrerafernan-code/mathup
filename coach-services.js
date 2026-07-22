(function () {
  "use strict";

  const STORAGE_KEY = "margaritaSalasCoachV1";
  const ELIGIBLE_COURSES = new Set(["1eso", "2eso", "3eso", "4eso-a", "4eso-b", "1bach-mates", "1bach-ccss"]);
  const data = window.MARGARITA_COACH_DATA;

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

  function inferTopicId(theme) {
    const lower = normalizeDisplayText(theme || "").toLowerCase();
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
    if (/geometr|area|volumen|cuerpo|figura|semejanza/.test(lower)) return "geometry";
    if (/funcion/.test(lower)) return "functions";
    if (/limite/.test(lower)) return "limits";
    if (/continui/.test(lower)) return "continuity";
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
      id: question.id || `adapted-${course.id}-${topic}-${index}-${Math.abs(hashText(question.text || ""))}`,
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
          if ((mastery[prerequisite]?.accuracy || 0) < required) gaps.add(prerequisite);
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
    const special = course.id === "1eso" ? (criticalPractice[topic] || []).map(firstEsoQuestion) : [];
    const matchingThemes = course.themes.filter((theme) => inferTopicId(theme) === topic || normalizeDisplayText(theme).toLowerCase().includes(normalizeDisplayText(topicLabel(topic)).toLowerCase().split(" ")[0]));
    const adapted = matchingThemes.flatMap((theme) => pickExerciseBank(theme.toLowerCase(), course.id)
      .map((question, index) => adaptQuestion(question, course, theme, index, topic))
      .filter(Boolean));
    return [...special, ...adapted];
  }

  function selectSessionTopics(studentData) {
    const priorities = data.coursePriorities[state.courseId] || [];
    const profile = studentData.learningProfile;
    const gap = profile.prerequisiteGaps[0];
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
    const diagnosticFallback = courseDiagnostic(course);
    const activities = layout.map((slot, index) => {
      const pool = questionsForTopic(course, slot.topic);
      const available = pool.find((question) => !used.has(question.id))
        || pool[index % Math.max(1, pool.length)]
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
}());

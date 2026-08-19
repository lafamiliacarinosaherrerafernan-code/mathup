(function () {
  "use strict";

  const exam = {
    count: 5,
    selectedTopics: new Set(),
    questions: [],
    index: 0,
    answers: [],
    answered: false,
    selected: -1,
    showSolution: false
  };

  function isEsoCourse() {
    return typeof isEsoCourseId === "function" && isEsoCourseId(state.courseId);
  }

  function activeCourse() {
    return courseById(state.courseId);
  }

  function resetSelectedTopics() {
    exam.selectedTopics = new Set(activeCourse().themes.map((_, index) => index));
  }

  function examHeading() {
    return `Examen de ${courseDisplayName(activeCourse())}`;
  }

  function selectedTopicButtons() {
    return activeCourse().themes.map((theme, index) => `
      <button type="button"
        class="first-bach-topic-toggle ${exam.selectedTopics.has(index) ? "is-selected" : ""}"
        aria-pressed="${exam.selectedTopics.has(index)}"
        onclick="toggleEsoExamTopic(${index})">
        <span>${index + 1}</span>
        <strong>${escapeHtml(theme)}</strong>
      </button>
    `).join("");
  }

  function updateStartButton() {
    const button = document.getElementById("eso-exam-start");
    const counter = document.getElementById("eso-exam-topic-count");
    const total = exam.selectedTopics.size;
    if (button) button.disabled = total === 0;
    if (counter) counter.textContent = `${total} ${total === 1 ? "tema seleccionado" : "temas seleccionados"}`;
  }

  window.renderEsoExamSetup = function renderEsoExamSetup(reset = true) {
    if (!state.student || !isEsoCourse()) {
      renderLogin();
      return;
    }
    clearQuestionTimer();
    if (reset || !exam.selectedTopics.size) resetSelectedTopics();
    renderShell(`
      <section class="student-dashboard first-bach-exam-page">
        <section class="screen-panel first-bach-exam-setup">
          <div class="workspace-head">
            <div>
              <span class="coach-kicker">Examen personalizado</span>
              <h1>${escapeHtml(examHeading())}</h1>
              <div class="badge-row">
                <span class="badge">${escapeHtml(state.academicYear)}</span>
                <span class="badge">${escapeHtml(state.student.groupLabel || state.student.group)}</span>
                <span class="badge">${escapeHtml(state.student.name)}</span>
              </div>
            </div>
            <div class="dashboard-exit">
              <button class="ghost" onclick="renderStudentGateway()">Volver</button>
              <button class="ghost" onclick="renderLogin()">Salir</button>
            </div>
          </div>

          <div class="first-bach-exam-config">
            <div class="first-bach-exam-count-column">
              <article class="first-bach-exam-count-card">
                <span class="path-icon">Preguntas</span>
                <h2>¿Cuántas preguntas quieres?</h2>
                <div class="first-bach-count-options eso-exam-count-options" role="group" aria-label="Número de preguntas">
                  ${[4, 5, 6, 7, 8].map((count) => `
                    <button class="${exam.count === count ? "is-selected" : ""}" onclick="setEsoExamCount(${count})">${count}</button>
                  `).join("")}
                </div>
                <p>Después de responder podrás consultar la resolución completa y paso a paso.</p>
              </article>
              <div class="first-bach-exam-start-row eso-exam-start-row">
                <button id="eso-exam-start" class="primary" onclick="startEsoExam()">Comenzar examen</button>
              </div>
            </div>

            <article class="first-bach-exam-topics-card">
              <div class="first-bach-exam-topics-head">
                <div>
                  <span class="path-icon">Temas</span>
                  <h2>Elige el contenido del examen</h2>
                  <p id="eso-exam-topic-count">${exam.selectedTopics.size} temas seleccionados</p>
                </div>
                <div class="first-bach-topic-actions">
                  <button class="ghost" onclick="selectAllEsoExamTopics()">Todos</button>
                  <button class="ghost" onclick="clearEsoExamTopics()">Ninguno</button>
                </div>
              </div>
              <div id="eso-topic-selector" class="first-bach-topic-selector">${selectedTopicButtons()}</div>
            </article>
          </div>

        </section>
      </section>
    `);
    document.querySelector(".shell-student-fit")?.classList.add("shell-scroll-if-needed");
  };

  window.setEsoExamCount = function setEsoExamCount(count) {
    exam.count = Math.min(8, Math.max(4, Number(count) || 5));
    renderEsoExamSetup(false);
  };

  window.toggleEsoExamTopic = function toggleEsoExamTopic(index) {
    if (exam.selectedTopics.has(index)) exam.selectedTopics.delete(index);
    else exam.selectedTopics.add(index);
    const selector = document.getElementById("eso-topic-selector");
    if (selector) selector.innerHTML = selectedTopicButtons();
    updateStartButton();
  };

  window.selectAllEsoExamTopics = function selectAllEsoExamTopics() {
    resetSelectedTopics();
    const selector = document.getElementById("eso-topic-selector");
    if (selector) selector.innerHTML = selectedTopicButtons();
    updateStartButton();
  };

  window.clearEsoExamTopics = function clearEsoExamTopics() {
    exam.selectedTopics.clear();
    const selector = document.getElementById("eso-topic-selector");
    if (selector) selector.innerHTML = selectedTopicButtons();
    updateStartButton();
  };

  function standaloneQuestions(question, topicIndex) {
    if (!question) return [];
    if (Array.isArray(question.parts) && question.parts.length) {
      return question.parts.map((part) => {
        if (!Array.isArray(part.options) || part.options.length !== 4) return null;
        return {
          ...question,
          text: [question.text || "", part.text || ""].filter(Boolean).join("\n"),
          statementHtml: [
            question.statementHtml || formatMathText(question.text || ""),
            part.html || formatMathText(part.text || "")
          ].filter(Boolean).join("<br>"),
          options: part.options,
          correct: part.correct,
          solution: part.solution,
          topicIndex
        };
      }).filter(Boolean);
    }
    if (!Array.isArray(question.options) || question.options.length !== 4) return [];
    return [{ ...question, topicIndex }];
  }

  function shuffled(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function buildExamQuestions() {
    const course = activeCourse();
    const selected = shuffled([...exam.selectedTopics]);
    const previousTopicIndex = state.topicIndex;
    const previousBlockKey = state.blockKey;
    const previousRoundCache = state.challengeRoundCache;
    const previousSelectionContext = state.exerciseSelectionContext;
    const pools = new Map();

    state.blockKey = "";
    state.exerciseSelectionContext = "exam";
    state.challengeRoundCache = {};
    try {
      selected.forEach((topicIndex) => {
        state.topicIndex = topicIndex;
        const pool = buildQuestions(course.themes[topicIndex], course, exam.count)
          .flatMap((question) => standaloneQuestions(question, topicIndex))
          .filter((question) => window.MargaritaExerciseSelector.exerciseMatchesTopic(question, course.id, topicIndex));
        pools.set(topicIndex, pool);
      });
    } finally {
      state.topicIndex = previousTopicIndex;
      state.blockKey = previousBlockKey;
      state.exerciseSelectionContext = previousSelectionContext;
      state.challengeRoundCache = previousRoundCache;
    }

    return window.MargaritaExerciseSelector.distributeBalancedTopicQuestions(pools, selected, exam.count);
  }

  window.startEsoExam = function startEsoExam() {
    if (!exam.selectedTopics.size) return;
    state.practiceRound += 1;
    exam.questions = buildExamQuestions();
    if (exam.questions.length !== exam.count) {
      alert(`Solo hay ${exam.questions.length} ejercicios válidos y no repetidos de los temas seleccionados. No se ha añadido ningún ejercicio de otro tema.`);
      return;
    }
    exam.index = 0;
    exam.answers = [];
    exam.answered = false;
    exam.selected = -1;
    exam.showSolution = false;
    renderEsoExamQuestion();
  };

  function currentQuestion() {
    return exam.questions[exam.index];
  }

  function topicName(question) {
    return activeCourse().themes[question.topicIndex] || "Tema";
  }

  window.renderEsoExamQuestion = function renderEsoExamQuestion() {
    const question = currentQuestion();
    if (!question) {
      renderEsoExamResult();
      return;
    }
    markChallengeQuestionShown(question);
    clearQuestionTimer();
    const optionButtons = question.options.map((option, index) => {
      const classes = ["answer-btn"];
      if (exam.answered && index === question.correct) classes.push("correct");
      if (exam.answered && index === exam.selected && index !== question.correct) classes.push("wrong");
      return `
        <button class="${classes.join(" ")}" ${exam.answered ? "disabled" : ""} onclick="answerEsoExam(${index})">
          <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
          <span>${formatMathText(option)}</span>
        </button>`;
    }).join("");

    renderShell(`
      <section class="student-dashboard first-bach-exam-page">
        <section class="screen-panel bach-exam-screen first-bach-exam-question">
          <div class="workspace-head">
            <div>
              <span class="coach-kicker">${escapeHtml(examHeading())}</span>
              <h1>Pregunta ${exam.index + 1} de ${exam.questions.length} · ${escapeHtml(topicName(question))}</h1>
            </div>
            <div class="dashboard-exit"><button class="ghost" onclick="leaveEsoExam()">Salir del examen</button></div>
          </div>
          <div class="progress-track"><div style="width:${((exam.index + 1) / exam.questions.length) * 100}%"></div></div>
          <article class="first-bach-exam-statement">${question.statementHtml || formatMathText(question.text || "")}</article>
          ${handwritingAnswerHtml(question, {
            topicIndex: question.topicIndex,
            topicLabel: topicName(question),
            questionIndex: exam.index,
            mode: "esoExam",
            resultChannel: "esoExam",
            statementHtml: `<article class="first-bach-exam-statement">${question.statementHtml || formatMathText(question.text || "")}</article>`,
            scoreState: { answered: exam.answers.length, progressIndex: exam.index, total: exam.questions.length },
            attemptContext: { selectedTopics: exam.selectedTopics || [] }
          })}
          <p class="first-bach-exam-instruction">Selecciona el resultado correcto.</p>
          <div class="answers">${optionButtons}</div>
          ${exam.answered ? `
            <p class="feedback ${exam.selected === question.correct ? "ok" : "bad"}">
              ${exam.selected === question.correct ? "Respuesta correcta." : `Respuesta incorrecta. La opción correcta es ${String.fromCharCode(65 + question.correct)}.`}
            </p>
            <div class="first-bach-exam-controls">
              <button class="secondary" onclick="toggleEsoExamSolution()">${exam.showSolution ? "Ocultar resolución" : "Ver resolución paso a paso"}</button>
              <button class="primary" onclick="nextEsoExamQuestion()">${exam.index + 1 === exam.questions.length ? "Ver resultado" : "Siguiente pregunta"}</button>
            </div>
            ${exam.showSolution ? `<div class="solution-help exam-solution"><h2>Resolución</h2><div class="solution-help-body">${formatSolutionText(didacticSolutionText(question))}</div></div>` : ""}
          ` : ""}
        </section>
      </section>
    `);
  };

  window.answerEsoExam = function answerEsoExam(optionIndex) {
    if (exam.answered) return;
    const question = currentQuestion();
    exam.selected = optionIndex;
    exam.answered = true;
    exam.answers.push({
      question: question.text,
      topic: topicName(question),
      correct: optionIndex === question.correct
    });
    markChallengeQuestionAnswered(question);
    renderEsoExamQuestion();
  };

  window.toggleEsoExamSolution = function toggleEsoExamSolution() {
    exam.showSolution = !exam.showSolution;
    renderEsoExamQuestion();
  };

  window.nextEsoExamQuestion = function nextEsoExamQuestion() {
    if (!exam.answered) return;
    if (exam.index + 1 >= exam.questions.length) {
      renderEsoExamResult();
      return;
    }
    exam.index += 1;
    exam.answered = false;
    exam.selected = -1;
    exam.showSolution = false;
    renderEsoExamQuestion();
  };

  function saveExamReport(correct) {
    try {
      const reports = readReports();
      const course = activeCourse();
      reports.push({
        date: new Date().toLocaleString("es-ES"),
        academicYear: state.academicYear || DEFAULT_ACADEMIC_YEAR,
        student: state.student.name,
        group: state.student.groupLabel || state.student.group,
        course: courseDisplayName(course),
        theme: "Examen personalizado",
        score: correct * 100,
        correct,
        total: exam.questions.length
      });
      localStorage.setItem(REPORT_KEY, JSON.stringify(reports));
    } catch (_) {
      // El resultado se muestra aunque el almacenamiento local no esté disponible.
    }
  }

  window.renderEsoExamResult = function renderEsoExamResult() {
    clearQuestionTimer();
    const correct = exam.answers.filter((answer) => answer.correct).length;
    saveExamReport(correct);
    const percentage = Math.round((correct / exam.questions.length) * 100);
    const topics = [...new Set(exam.questions.map(topicName))];
    renderShell(`
      <section class="student-dashboard first-bach-exam-page">
        <section class="screen-panel first-bach-exam-result">
          <span class="coach-kicker">Examen completado</span>
          <h1>${correct} de ${exam.questions.length} preguntas correctas</h1>
          <div class="first-bach-exam-result-score">${percentage}%</div>
          <p>Temas trabajados: ${topics.map(escapeHtml).join(" · ")}</p>
          <div class="first-bach-exam-result-actions">
            <button class="primary" onclick="renderEsoExamSetup(true)">Preparar otro examen</button>
            <button class="secondary" onclick="renderStudentGateway()">Volver al inicio</button>
          </div>
        </section>
      </section>
    `);
  };

  window.leaveEsoExam = function leaveEsoExam() {
    clearQuestionTimer();
    renderStudentGateway();
  };

  if (window.__MARGARITA_ENABLE_AUDIT__) {
    window.MargaritaEsoExamAudit = {
      exam,
      resetSelectedTopics,
      buildExamQuestions
    };
  }
})();

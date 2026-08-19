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

  function isFirstBachCourse() {
    return state.courseId === "1bach-mates" || state.courseId === "1bach-ccss";
  }

  function activeCourse() {
    return courseById(state.courseId);
  }

  function resetSelectedTopics() {
    exam.selectedTopics = new Set(activeCourse().themes.map((_, index) => index));
  }

  function examHeading() {
    return state.courseId === "1bach-mates"
      ? "Examen de 1.º Bachillerato Matemáticas I"
      : "Examen de 1.º Bachillerato CCSS I";
  }

  function selectedTopicButtons() {
    return activeCourse().themes.map((theme, index) => `
      <button
        type="button"
        class="first-bach-topic-toggle ${exam.selectedTopics.has(index) ? "is-selected" : ""}"
        aria-pressed="${exam.selectedTopics.has(index)}"
        onclick="toggleFirstBachExamTopic(${index})"
      >
        <span>${index + 1}</span>
        <strong>${escapeHtml(theme)}</strong>
      </button>
    `).join("");
  }

  function updateStartButton() {
    const button = document.getElementById("first-bach-exam-start");
    const counter = document.getElementById("first-bach-exam-topic-count");
    const total = exam.selectedTopics.size;
    if (button) button.disabled = total === 0;
    if (counter) counter.textContent = `${total} ${total === 1 ? "tema seleccionado" : "temas seleccionados"}`;
  }

  window.renderFirstBachExamSetup = function renderFirstBachExamSetup(reset = true) {
    if (!state.student || !isFirstBachCourse()) {
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
              <button class="ghost" onclick="renderFirstBachGateway()">Volver</button>
              <button class="ghost" onclick="renderLogin()">Salir</button>
            </div>
          </div>

          <div class="first-bach-exam-config">
            <div class="first-bach-exam-count-column">
              <article class="first-bach-exam-count-card">
                <h2>¿Cuántas preguntas quieres?</h2>
                <div class="first-bach-count-options eso-exam-count-options" role="group" aria-label="Número de preguntas">
                  ${[4, 5, 6, 7, 8].map((count) => `
                    <button class="${exam.count === count ? "is-selected" : ""}" onclick="setFirstBachExamCount(${count})">${count}</button>
                  `).join("")}
                </div>
                <p>Después de responder podrás consultar la resolución completa paso a paso.</p>
              </article>
              <div class="first-bach-exam-start-row">
                <button id="first-bach-exam-start" class="primary" onclick="startFirstBachExam()">Comenzar examen</button>
              </div>
            </div>

            <article class="first-bach-exam-topics-card">
              <div class="first-bach-exam-topics-head">
                <div>
                  <span class="path-icon">Temas</span>
                  <h2>Elige el contenido del examen</h2>
                  <p id="first-bach-exam-topic-count">${exam.selectedTopics.size} temas seleccionados</p>
                </div>
                <div class="first-bach-topic-actions">
                  <button class="ghost" onclick="selectAllFirstBachExamTopics()">Todos</button>
                  <button class="ghost" onclick="clearFirstBachExamTopics()">Ninguno</button>
                </div>
              </div>
              <div id="first-bach-topic-selector" class="first-bach-topic-selector">
                ${selectedTopicButtons()}
              </div>
            </article>
          </div>

        </section>
      </section>
    `);
    document.querySelector(".shell-student-fit")?.classList.add("shell-scroll-if-needed");
  };

  window.setFirstBachExamCount = function setFirstBachExamCount(count) {
    exam.count = Math.min(8, Math.max(4, Number(count) || 5));
    renderFirstBachExamSetup(false);
  };

  window.toggleFirstBachExamTopic = function toggleFirstBachExamTopic(index) {
    if (exam.selectedTopics.has(index)) exam.selectedTopics.delete(index);
    else exam.selectedTopics.add(index);
    const selector = document.getElementById("first-bach-topic-selector");
    if (selector) selector.innerHTML = selectedTopicButtons();
    updateStartButton();
  };

  window.selectAllFirstBachExamTopics = function selectAllFirstBachExamTopics() {
    resetSelectedTopics();
    const selector = document.getElementById("first-bach-topic-selector");
    if (selector) selector.innerHTML = selectedTopicButtons();
    updateStartButton();
  };

  window.clearFirstBachExamTopics = function clearFirstBachExamTopics() {
    exam.selectedTopics.clear();
    const selector = document.getElementById("first-bach-topic-selector");
    if (selector) selector.innerHTML = selectedTopicButtons();
    updateStartButton();
  };

  function standaloneQuestion(question, topicIndex) {
    if (!question) return null;
    if (Array.isArray(question.parts) && question.parts.length) {
      const part = question.parts[0];
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
    }
    if (!Array.isArray(question.options) || question.options.length !== 4) return null;
    return { ...question, topicIndex };
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
    const pools = new Map();

    state.blockKey = "";
    state.challengeRoundCache = {};
    selected.forEach((topicIndex) => {
      state.topicIndex = topicIndex;
      const pool = buildQuestions(course.themes[topicIndex], course, exam.count)
        .map((question) => standaloneQuestion(question, topicIndex))
        .filter((question) => question && window.MargaritaExerciseSelector.exerciseMatchesTopic(question, course.id, topicIndex));
      pools.set(topicIndex, pool);
    });
    state.topicIndex = previousTopicIndex;
    state.blockKey = previousBlockKey;
    state.challengeRoundCache = previousRoundCache;

    return window.MargaritaExerciseSelector.distributeBalancedTopicQuestions(pools, selected, exam.count);
  }

  window.startFirstBachExam = function startFirstBachExam() {
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
    renderFirstBachExamQuestion();
  };

  function currentQuestion() {
    return exam.questions[exam.index];
  }

  function topicName(question) {
    return activeCourse().themes[question.topicIndex] || "Tema";
  }

  window.renderFirstBachExamQuestion = function renderFirstBachExamQuestion() {
    const question = currentQuestion();
    if (!question) {
      renderFirstBachExamResult();
      return;
    }
    markChallengeQuestionShown(question);
    clearQuestionTimer();
    const optionButtons = question.options.map((option, index) => {
      const classes = ["answer-btn"];
      if (exam.answered && index === question.correct) classes.push("correct");
      if (exam.answered && index === exam.selected && index !== question.correct) classes.push("wrong");
      return `
        <button class="${classes.join(" ")}" ${exam.answered ? "disabled" : ""} onclick="answerFirstBachExam(${index})">
          <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
          <span>${formatMathText(option)}</span>
        </button>`;
    }).join("");
    const source = question.source || question.sourceLabel || "";

    renderShell(`
      <section class="student-dashboard first-bach-exam-page">
        <section class="screen-panel bach-exam-screen first-bach-exam-question">
          <div class="workspace-head">
            <div>
              <span class="coach-kicker">${escapeHtml(examHeading())}</span>
              <h1>Ejercicio ${exam.index + 1} de ${exam.questions.length} · ${escapeHtml(topicName(question))}</h1>
              ${source ? `<div class="badge-row"><span class="badge">${escapeHtml(source)}</span></div>` : ""}
            </div>
            <div class="dashboard-exit"><button class="ghost" onclick="leaveFirstBachExam()">Salir del examen</button></div>
          </div>
          <div class="progress-track"><div style="width:${((exam.index + 1) / exam.questions.length) * 100}%"></div></div>
          <article class="first-bach-exam-statement">${question.statementHtml ? formatMathHtml(question.statementHtml, { preserveTrigNotation: Boolean(source) }) : formatMathText(question.text || "", { preserveTrigNotation: Boolean(source) })}</article>
          ${handwritingAnswerHtml(question, {
            topicIndex: question.topicIndex,
            topicLabel: topicName(question),
            questionIndex: exam.index,
            mode: "firstBachExam",
            resultChannel: "firstBachExam",
            statementHtml: `<article class="first-bach-exam-statement">${question.statementHtml ? formatMathHtml(question.statementHtml, { preserveTrigNotation: Boolean(source) }) : formatMathText(question.text || "", { preserveTrigNotation: Boolean(source) })}</article>`,
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
              <button class="secondary" onclick="toggleFirstBachExamSolution()">${exam.showSolution ? "Ocultar ayuda" : "Ver ayuda paso a paso"}</button>
              <button class="primary" onclick="nextFirstBachExamQuestion()">${exam.index + 1 === exam.questions.length ? "Ver resultado" : "Siguiente ejercicio"}</button>
            </div>
            ${exam.showSolution ? `<div class="solution-help exam-solution"><h2>Resolución</h2><div class="solution-help-body">${formatSolutionText(didacticSolutionText(question))}</div></div>` : ""}
          ` : ""}
        </section>
      </section>
    `);
  };

  window.answerFirstBachExam = function answerFirstBachExam(optionIndex) {
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
    renderFirstBachExamQuestion();
  };

  window.toggleFirstBachExamSolution = function toggleFirstBachExamSolution() {
    exam.showSolution = !exam.showSolution;
    renderFirstBachExamQuestion();
  };

  window.nextFirstBachExamQuestion = function nextFirstBachExamQuestion() {
    if (!exam.answered) return;
    if (exam.index + 1 >= exam.questions.length) {
      renderFirstBachExamResult();
      return;
    }
    exam.index += 1;
    exam.answered = false;
    exam.selected = -1;
    exam.showSolution = false;
    renderFirstBachExamQuestion();
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

  window.renderFirstBachExamResult = function renderFirstBachExamResult() {
    clearQuestionTimer();
    const correct = exam.answers.filter((answer) => answer.correct).length;
    saveExamReport(correct);
    const percentage = Math.round((correct / exam.questions.length) * 100);
    const topics = [...new Set(exam.questions.map(topicName))];
    renderShell(`
      <section class="student-dashboard first-bach-exam-page">
        <section class="screen-panel first-bach-exam-result">
          <span class="coach-kicker">Examen completado</span>
          <h1>${correct} de ${exam.questions.length} ejercicios correctos</h1>
          <div class="first-bach-exam-result-score">${percentage}%</div>
          <p>Temas trabajados: ${topics.map(escapeHtml).join(" · ")}</p>
          <div class="first-bach-exam-result-actions">
            <button class="primary" onclick="renderFirstBachExamSetup(true)">Preparar otro examen</button>
            <button class="secondary" onclick="renderFirstBachGateway()">Volver al inicio</button>
          </div>
        </section>
      </section>
    `);
  };

  window.leaveFirstBachExam = function leaveFirstBachExam() {
    clearQuestionTimer();
    renderFirstBachGateway();
  };

  if (window.__MARGARITA_ENABLE_AUDIT__) {
    window.MargaritaFirstBachExamAudit = {
      exam,
      resetSelectedTopics,
      buildExamQuestions
    };
  }
})();

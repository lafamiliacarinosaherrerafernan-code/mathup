(function () {
  "use strict";

  const ui = {
    mode: "home",
    questions: [],
    answers: [],
    index: 0,
    startedAt: 0,
    questionStartedAt: 0,
    answered: false,
    selected: -1,
    hintsUsed: 0,
    session: null,
    result: null
  };

  function coach() {
    return window.MargaritaCoach;
  }

  function firstBachCourse() {
    return ["1bach-mates", "1bach-ccss"].includes(state.courseId);
  }

  function returnToCourseGateway() {
    if (isEsoCourseId(state.courseId)) renderStudentGateway();
    else if (firstBachCourse()) renderFirstBachGateway();
    else renderBachIIHome();
  }

  function guardCoachAccess() {
    if (coach()?.isEligible()) return true;
    if (state.student) returnToCourseGateway();
    else publicLogout();
    return false;
  }

  function studentBadges() {
    return `
      <div class="badge-row">
        <span class="badge">${escapeHtml(state.academicYear)}</span>
        <span class="badge">${escapeHtml(state.student.groupLabel || state.student.group)}</span>
        <span class="badge">${escapeHtml(state.student.name)}</span>
      </div>`;
  }

  function gatewayShell(title, cards, gridClass = "") {
    clearQuestionTimer();
    renderShell(`
      <section class="student-dashboard coach-gateway">
        <section class="screen-panel home-panel">
          <div class="workspace-head">
            <div><h1>${escapeHtml(title)}</h1>${studentBadges()}</div>
            <div class="dashboard-exit"><button class="ghost" onclick="publicLogout()">Salir</button></div>
          </div>
          <div class="path-choice-grid ${escapeHtml(gridClass)}">${cards}</div>
        </section>
      </section>
    `);
  }

  window.renderStudentGateway = function renderStudentGateway() {
    const course = courseById(state.courseId);
    if (!state.student || !isEsoCourseId(state.courseId)) {
      if (BACH_II_COURSE_IDS.includes(state.courseId)) renderBachIIHome();
      else publicLogout();
      return;
    }
    gatewayShell(`${courseDisplayName(course)}: elige cómo aprender`, `
      <article class="path-choice path-choice-study gateway-card eso-home-study">
        <span class="path-icon">Aprender</span>
        <h2>Aprende y juega</h2>
        <p>Entra en el espacio habitual para estudiar por temas, realizar retos y continuar la aventura matemática.</p>
        <button class="primary" onclick="renderStudentHome()">Entrar</button>
      </article>
      <article class="path-choice path-choice-adventure gateway-card coach-entry-card eso-home-coach">
        <span class="path-icon">Entrenador</span>
        <h2>Entrenador personal con IA</h2>
        <p>Descubre qué necesitas reforzar y realiza sesiones breves adaptadas a tu progreso.</p>
        <button class="secondary" onclick="renderCoachHome()">Abrir mi entrenador</button>
      </article>
      <article class="path-choice path-choice-exam gateway-card eso-home-exam">
        <span class="path-icon">Examen</span>
        <h2>Hacer examen</h2>
        <p>Elige los temas y prepara un examen de 4 a 8 preguntas diferentes.</p>
        <button class="secondary" onclick="renderEsoExamSetup()">Preparar examen</button>
      </article>
    `, "eso-home-grid");
  };

  window.renderFirstBachGateway = function renderFirstBachGateway() {
    const course = courseById(state.courseId);
    if (!state.student || !firstBachCourse()) {
      if (BACH_II_COURSE_IDS.includes(state.courseId)) renderBachIIHome();
      else publicLogout();
      return;
    }
    gatewayShell(`${courseDisplayName(course)}: elige cómo estudiar`, `
      <article class="path-choice path-choice-study gateway-card first-bach-home-topics">
        <span class="path-icon">Temas</span>
        <h2>Estudiar temas y retos</h2>
        <p>Accede al estudio habitual del curso y practica con sus retos organizados por temas.</p>
        <button class="primary" onclick="renderDashboard()">Entrar a estudiar</button>
      </article>
      <article class="path-choice path-choice-adventure gateway-card coach-entry-card first-bach-home-coach">
        <span class="path-icon">Entrenador</span>
        <h2>Entrenador personal con IA</h2>
        <p>Realiza un diagnóstico y recibe sesiones breves ajustadas a tus errores y conocimientos previos.</p>
        <button class="secondary" onclick="renderCoachHome()">Abrir mi entrenador</button>
      </article>
      <article class="path-choice path-choice-exam gateway-card first-bach-home-exam">
        <span class="path-icon">Examen</span>
        <h2>Hacer examen</h2>
        <p>Elige los temas y practica con un examen de 4 a 8 preguntas de los bancos del curso.</p>
        <button class="secondary" onclick="renderFirstBachExamSetup()">Preparar examen</button>
      </article>
    `, "first-bach-home-grid");
  };

  function listOrEmpty(items, emptyText) {
    if (!items?.length) return `<span class="coach-empty">${escapeHtml(emptyText)}</span>`;
    return items.map((item) => `<span class="coach-chip">${escapeHtml(item)}</span>`).join("");
  }

  window.renderCoachHome = function renderCoachHome() {
    if (!guardCoachAccess()) return;
    clearQuestionTimer();
    const summary = coach().progressSummary();
    const profile = summary.studentData.studentProfile;
    const diagnosed = profile.diagnosticCompleted;
    const minutes = Math.round(summary.totalSeconds / 60);
    renderShell(`
      <section class="student-dashboard coach-page">
        <section class="screen-panel coach-panel">
          <div class="workspace-head">
            <div><span class="coach-kicker">Entrenador personal</span><h1>Hola, ${escapeHtml(state.student.name)}</h1>${studentBadges()}</div>
            <div class="dashboard-exit"><button class="ghost" onclick="returnToCourseGateway()">Inicio</button><button class="ghost" onclick="publicLogout()">Salir</button></div>
          </div>
          <div class="coach-summary-grid">
            <article class="coach-profile-card">
              <span class="coach-card-label">Tu nivel estimado</span>
              <strong>${escapeHtml(profile.estimatedLevel)}</strong>
              <p>${diagnosed ? "Tu plan se actualiza después de cada sesión." : "Primero haremos un diagnóstico breve de 8 a 15 preguntas."}</p>
              <div class="coach-actions">
                <button ${diagnosed ? `id="coach-start-session"` : ""} class="primary" onclick="${diagnosed ? "startCoachSession()" : "startCoachDiagnostic()"}">${diagnosed ? "Empezar sesión de 15 minutos" : "Realizar diagnóstico"}</button>
                ${diagnosed ? `<label class="coach-duration">Duración <select id="coach-duration" onchange="setCoachDuration(this.value)">${window.MARGARITA_COACH_DATA.settings.sessionMinutes.map((value) => `<option value="${value}" ${value === 15 ? "selected" : ""}>${value} min</option>`).join("")}</select></label>` : ""}
              </div>
            </article>
            <article class="coach-stat-card"><span>Sesiones</span><strong>${summary.completed.length}</strong><small>completadas</small></article>
            <article class="coach-stat-card"><span>Tiempo</span><strong>${minutes}</strong><small>minutos de trabajo</small></article>
            <article class="coach-stat-card"><span>Racha</span><strong>${summary.streak}</strong><small>días seguidos</small></article>
          </div>
          <div class="coach-two-columns">
            <article class="coach-info-card"><h2>Fortalezas</h2><div class="coach-chip-list">${listOrEmpty(profile.strengths, "Aparecerán después del diagnóstico.")}</div></article>
            <article class="coach-info-card"><h2>Aspectos a reforzar</h2><div class="coach-chip-list">${listOrEmpty(profile.weaknesses, "Aparecerán después del diagnóstico.")}</div></article>
          </div>
          <div class="coach-footer-actions">
            <button class="secondary" ${diagnosed ? "" : "disabled"} onclick="renderCoachProgress()">Ver mi progreso e historial</button>
          </div>
        </section>
      </section>
    `);
  };

  window.setCoachDuration = function setCoachDuration(value) {
    ui.duration = Number(value) || 15;
    const button = document.getElementById("coach-start-session");
    if (button) button.textContent = `Empezar sesión de ${ui.duration} minutos`;
  };

  window.startCoachDiagnostic = function startCoachDiagnostic() {
    if (!guardCoachAccess()) return;
    ui.mode = "diagnostic";
    ui.questions = coach().generateDiagnostic().slice(0, 15);
    ui.answers = [];
    ui.index = 0;
    ui.startedAt = Date.now();
    ui.questionStartedAt = Date.now();
    ui.answered = false;
    ui.selected = -1;
    renderCoachQuestion();
  };

  window.startCoachSession = function startCoachSession() {
    if (!guardCoachAccess()) return;
    const profile = coach().getStudentData()?.studentProfile;
    if (!profile?.diagnosticCompleted) {
      startCoachDiagnostic();
      return;
    }
    ui.mode = "session";
    ui.session = coach().generateStudySession(ui.duration || 15);
    if (!ui.session?.activities?.length) {
      renderCoachHome();
      return;
    }
    ui.questions = ui.session.activities;
    ui.answers = [];
    ui.index = 0;
    ui.startedAt = Date.now();
    ui.questionStartedAt = Date.now();
    ui.answered = false;
    ui.selected = -1;
    ui.hintsUsed = 0;
    renderCoachQuestion();
  };

  function currentQuestion() {
    return ui.questions[ui.index];
  }

  function questionOptions(question) {
    return question.options.map((option, index) => {
      let status = "";
      if (ui.answered && index === question.correct) status = " is-correct";
      else if (ui.answered && index === ui.selected) status = " is-wrong";
      return `<button class="coach-option${status}" ${ui.answered ? "disabled" : ""} onclick="answerCoachQuestion(${index})"><span>${String.fromCharCode(65 + index)}</span><span>${formatMathText(option)}</span></button>`;
    }).join("");
  }

  window.renderCoachQuestion = function renderCoachQuestion() {
    if (!guardCoachAccess()) return;
    const question = currentQuestion();
    if (!question) {
      finishCoachFlow();
      return;
    }
    const diagnostic = ui.mode === "diagnostic";
    if (!diagnostic) window.MargaritaExerciseSelector?.markShown?.(question);
    const progress = Math.round(((ui.index + (ui.answered ? 1 : 0)) / ui.questions.length) * 100);
    const phase = diagnostic ? "Diagnóstico inicial" : question.phase;
    const correction = ui.answered ? `
      <div class="coach-feedback ${ui.selected === question.correct ? "success" : "error"}">
        <h3>${ui.selected === question.correct ? "Respuesta correcta" : "Vamos a corregirlo"}</h3>
        <p>${ui.selected === question.correct ? "Buen trabajo. La respuesta está bien razonada." : `La respuesta correcta es ${formatMathText(question.options[question.correct])}.`}</p>
        <details><summary>Ver resolución paso a paso</summary><div class="coach-solution">${formatSolutionText(didacticSolutionText(question))}</div></details>
      </div>` : "";
    const phaseHelp = !diagnostic && ["Aprende", "Práctica guiada"].includes(question.phase)
      ? `<aside class="coach-learning-note"><strong>${question.phase}</strong><p>${formatSolutionText(question.explanation || solutionApproach(question))}</p></aside>` : "";
    renderShell(`
      <section class="student-dashboard coach-page">
        <section class="screen-panel coach-question-panel">
          <div class="coach-question-head">
            <div><span class="coach-kicker">${escapeHtml(phase)}</span><h1>Pregunta ${ui.index + 1} de ${ui.questions.length}</h1></div>
            <button class="ghost" onclick="renderCoachHome()">Salir de ${diagnostic ? "diagnóstico" : "sesión"}</button>
          </div>
          <div class="coach-progress" aria-label="Progreso"><span style="width:${progress}%"></span></div>
          ${phaseHelp}
          <article class="coach-question-card">
             <div class="coach-question-meta"><span>${escapeHtml(coach().topicLabel(question.topic))}</span><span>Dificultad ${question.difficulty || 1}</span></div>
             <h2>${formatMathText(question.text)}</h2>
             ${handwritingAnswerHtml(question, {
               topicId: question.topic,
               topicLabel: coach().topicLabel(question.topic),
               questionIndex: ui.index,
               difficulty: question.difficulty || 1,
               mode: diagnostic ? "coachDiagnostic" : "coachSession",
               resultChannel: "coach",
               statementHtml: `<div class="coach-question-meta"><span>${escapeHtml(coach().topicLabel(question.topic))}</span><span>Dificultad ${question.difficulty || 1}</span></div><h2>${formatMathText(question.text)}</h2>`,
               scoreState: { answered: ui.answers.length, progressIndex: ui.index, total: ui.questions.length },
               attemptContext: { phase, hintsUsed: ui.hintsUsed }
             })}
             <div class="coach-options">${questionOptions(question)}</div>
            ${!diagnostic && !ui.answered ? `<button class="ghost coach-hint-button" onclick="showCoachHint()">Necesito una pista</button><p id="coach-hint" class="coach-hint" hidden></p>` : ""}
          </article>
          ${correction}
          ${ui.answered ? `<div class="coach-next"><button class="primary" onclick="nextCoachQuestion()">${ui.index + 1 === ui.questions.length ? "Ver resultados" : "Siguiente pregunta"}</button></div>` : ""}
        </section>
      </section>
    `);
  };

  window.showCoachHint = function showCoachHint() {
    const element = document.getElementById("coach-hint");
    if (!element || !element.hidden) return;
    ui.hintsUsed += 1;
    element.innerHTML = formatMathText(currentQuestion().hint || "Lee con calma, identifica los datos y elige la regla que corresponde.");
    element.hidden = false;
  };

  window.answerCoachQuestion = function answerCoachQuestion(optionIndex) {
    if (ui.answered) return;
    const question = currentQuestion();
    ui.selected = optionIndex;
    ui.answered = true;
    ui.answers.push({
      question,
      answer: question.options[optionIndex],
      isCorrect: optionIndex === question.correct,
      attempts: 1,
      hintsUsed: ui.hintsUsed,
      timeSpent: Math.max(1, Math.round((Date.now() - ui.questionStartedAt) / 1000))
    });
    renderCoachQuestion();
  };

  window.nextCoachQuestion = function nextCoachQuestion() {
    if (!ui.answered) return;
    ui.index += 1;
    ui.answered = false;
    ui.selected = -1;
    ui.hintsUsed = 0;
    ui.questionStartedAt = Date.now();
    renderCoachQuestion();
  };

  window.finishCoachFlow = function finishCoachFlow() {
    if (ui.mode === "diagnostic") {
      coach().saveDiagnostic(ui.answers, ui.startedAt);
      renderCoachDiagnosticResult();
      return;
    }
    coach().evaluateSession(ui.session, ui.answers, ui.startedAt);
    ui.result = {
      correct: ui.answers.filter((answer) => answer.isCorrect).length,
      total: ui.answers.length,
      seconds: Math.max(1, Math.round((Date.now() - ui.startedAt) / 1000)),
      topic: ui.session.mainTopic
    };
    renderCoachSessionResult();
  };

  window.renderCoachDiagnosticResult = function renderCoachDiagnosticResult() {
    if (!guardCoachAccess()) return;
    const data = coach().getStudentData();
    const latest = data.diagnosticResults.at(-1);
    const rate = Math.round((latest.correctAnswers / Math.max(1, latest.answers.length)) * 100);
    renderCoachResultShell("Diagnóstico completado", `
      <div class="coach-result-score"><strong>${rate}%</strong><span>${latest.correctAnswers} de ${latest.answers.length} respuestas correctas</span></div>
      <div class="coach-two-columns">
        <article class="coach-info-card"><h2>Fortalezas detectadas</h2><div class="coach-chip-list">${listOrEmpty(data.studentProfile.strengths, "Todavía necesitan consolidación.")}</div></article>
        <article class="coach-info-card"><h2>Empezaremos por</h2><div class="coach-chip-list">${listOrEmpty(data.studentProfile.weaknesses, "Repaso equilibrado del curso.")}</div></article>
      </div>
      <p class="coach-recommendation">Nivel estimado: <strong>${escapeHtml(data.studentProfile.estimatedLevel)}</strong>. Ya puedes comenzar tu primera sesión personalizada.</p>
      <div class="coach-result-actions"><button class="primary" onclick="startCoachSession()">Comenzar sesión de 15 minutos</button><button class="secondary" onclick="renderCoachProgress()">Ver mi progreso</button></div>
    `);
  };

  window.renderCoachSessionResult = function renderCoachSessionResult() {
    if (!guardCoachAccess()) return;
    const rate = Math.round((ui.result.correct / Math.max(1, ui.result.total)) * 100);
    const profile = coach().getStudentData().studentProfile;
    renderCoachResultShell("Sesión completada", `
      <div class="coach-result-score"><strong>${rate}%</strong><span>${ui.result.correct} de ${ui.result.total} actividades correctas · ${Math.ceil(ui.result.seconds / 60)} min</span></div>
      <div class="coach-two-columns">
        <article class="coach-info-card"><h2>Has trabajado</h2><div class="coach-chip-list"><span class="coach-chip">${escapeHtml(coach().topicLabel(ui.result.topic))}</span></div></article>
        <article class="coach-info-card"><h2>Nivel actualizado</h2><p>${escapeHtml(profile.estimatedLevel)}</p></article>
      </div>
      <p class="coach-recommendation">${escapeHtml(coach().generateNextRecommendation())}</p>
      <div class="coach-result-actions"><button class="primary" onclick="startCoachSession()">Nueva sesión</button><button class="secondary" onclick="renderCoachProgress()">Ver mi progreso</button><button class="ghost" onclick="renderCoachHome()">Volver al entrenador</button></div>
    `);
  };

  function renderCoachResultShell(title, content) {
    renderShell(`
      <section class="student-dashboard coach-page"><section class="screen-panel coach-panel coach-result-panel">
        <div class="workspace-head"><div><span class="coach-kicker">Entrenador personal</span><h1>${escapeHtml(title)}</h1></div><button class="ghost" onclick="renderCoachHome()">Inicio del entrenador</button></div>
        ${content}
      </section></section>
    `);
  }

  function masteryBar(topic, mastery) {
    const percent = Math.round((mastery.accuracy || 0) * 100);
    return `<div class="coach-mastery-row"><div><strong>${escapeHtml(coach().topicLabel(topic))}</strong><span>${escapeHtml(mastery.status)} · ${mastery.attempts} actividades</span></div><div class="coach-mastery-track"><span style="width:${percent}%"></span></div><b>${percent}%</b></div>`;
  }

  window.renderCoachProgress = function renderCoachProgress() {
    if (!guardCoachAccess()) return;
    const summary = coach().progressSummary();
    const data = summary.studentData;
    const masteryEntries = Object.entries(data.learningProfile.topicMastery);
    const history = [...summary.completed].reverse().map((session) => `<tr><td>${new Date(session.date).toLocaleDateString("es-ES")}</td><td>${escapeHtml(coach().topicLabel(session.mainTopic))}</td><td>${session.score}/${session.activities.length}</td><td>${Math.ceil(session.timeSpent / 60)} min</td></tr>`).join("");
    const gaps = data.learningProfile.prerequisiteGaps;
    renderShell(`
      <section class="student-dashboard coach-page"><section class="screen-panel coach-panel">
        <div class="workspace-head"><div><span class="coach-kicker">Seguimiento</span><h1>Mi progreso</h1>${studentBadges()}</div><div class="dashboard-exit"><button class="ghost" onclick="renderCoachHome()">Volver</button><button class="ghost" onclick="returnToCourseGateway()">Inicio</button></div></div>
        <div class="coach-summary-grid compact"><article class="coach-stat-card"><span>Sesiones</span><strong>${summary.completed.length}</strong></article><article class="coach-stat-card"><span>Tiempo total</span><strong>${Math.round(summary.totalSeconds / 60)} min</strong></article><article class="coach-stat-card"><span>Racha</span><strong>${summary.streak} días</strong></article></div>
        <article class="coach-info-card"><h2>Dominio por contenidos</h2><div class="coach-mastery-list">${masteryEntries.length ? masteryEntries.map(([topic, mastery]) => masteryBar(topic, mastery)).join("") : `<p class="coach-empty">Completa el diagnóstico para ver tu progreso.</p>`}</div></article>
        <article class="coach-info-card"><h2>Conocimientos previos que reforzaremos</h2><div class="coach-chip-list">${listOrEmpty(gaps.map((topic) => coach().topicLabel(topic)), "No se han detectado lagunas prioritarias.")}</div></article>
        <article class="coach-info-card"><h2>Historial de sesiones</h2>${history ? `<div class="coach-table-wrap"><table class="coach-table"><thead><tr><th>Fecha</th><th>Contenido</th><th>Resultado</th><th>Tiempo</th></tr></thead><tbody>${history}</tbody></table></div>` : `<p class="coach-empty">Todavía no has completado ninguna sesión.</p>`}</article>
      </section></section>
    `);
  };

  window.returnToCourseGateway = returnToCourseGateway;
}());

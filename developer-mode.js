const DEVELOPER_TEST_AREAS = [
  ["registro", "Registro público", "Cuenta, perfil académico y privacidad"],
  ["acceso", "Acceso del alumno", "Curso, grupo, claves y mensajes de error"],
  ["aventura", "Aventura ESO", "Mapa, retos, puntuación y progreso"],
  ["bachillerato", "Bachillerato", "Temas, bloques y entrenamientos"],
  ["profesor", "Panel del profesor", "Informes, filtros y exportación"]
];

let developerChecklist = new Set();
let developerSupabaseCheckId = 0;
let developerSupabaseConnectionState = "idle";
let developerSelectedCourseId = "1eso";

function canUseDeveloperTools() {
  return DEVELOPER_MODE || ["owner", "developer"].includes(window.MATHUP_VERIFIED_ADMIN_ROLE);
}

async function renderOwnerDashboard() {
  if (!["owner", "developer"].includes(window.MATHUP_VERIFIED_ADMIN_ROLE)) return renderPublicAccess("Acceso no autorizado.", true);
  clearQuestionTimer();
  renderShell(`<section class="developer-hub"><header class="developer-hub-header"><div><span class="developer-local-badge">Panel privado · acceso verificado</span><h1>Administración de +MathUp</h1><p>Datos agregados del piloto y acceso de comprobación a todos los cursos.</p></div><button class="ghost" onclick="publicLogout()">Cerrar sesión</button></header>
    <div id="owner-stat-cards" class="developer-status-row"><article class="developer-status-card is-pending"><span>…</span><div><strong>Cargando estadísticas</strong><small>Consultando datos agregados</small></div></article></div>
    <div class="developer-hub-grid"><section class="developer-action-panel"><div class="developer-section-heading"><span>Pruebas</span><h2>Ver la aplicación como alumno</h2></div><p>El índice privado permite abrir cualquier curso, tema, bloque o examen con datos ficticios, sin modificar matrículas reales.</p><button class="primary" onclick="renderDeveloperCourseCatalog('1eso')">Abrir todos los cursos</button></section><aside class="developer-checklist-panel"><div class="developer-section-heading"><span>Distribución</span><h2>Alumnado por zona</h2></div><div id="owner-location-stats"><p>Cargando…</p></div></aside></div></section>`,false);
  try {
    const stats=await window.APP_SUPABASE.getAdminStats();
    const courses=(stats.byCourse||[]).map(x=>`<span>${escapeHtml(x.label)}: <strong>${x.count}</strong></span>`).join(" · ")||"Sin matrículas";
    document.getElementById("owner-stat-cards").innerHTML=`<article class="developer-status-card is-ready"><span>${stats.registeredUsers||0}</span><div><strong>Personas registradas</strong><small>Total del piloto</small></div></article><article class="developer-status-card is-ready"><span>${stats.onlineUsers||0}</span><div><strong>En la aplicación ahora</strong><small>Actividad en los últimos 2 minutos</small></div></article><article class="developer-status-card is-ready"><span>✓</span><div><strong>Por curso</strong><small>${courses}</small></div></article>`;
    const list=(items)=>items?.length?`<ul class="owner-stat-list">${items.map(x=>`<li><span>${escapeHtml(x.label)}</span><strong>${x.count}</strong></li>`).join("")}</ul>`:"<p>Aún no hay datos suficientes.</p>";
    document.getElementById("owner-location-stats").innerHTML=`<h3>Provincias</h3>${list(stats.byProvince)}<h3>Municipios</h3>${list(stats.byMunicipality)}`;
  } catch (error) {
    document.getElementById("owner-stat-cards").innerHTML=`<p class="error">${escapeHtml(error.message||"No se pudieron cargar las estadísticas.")}</p>`;
  }
}

function renderDeveloperLogin() {
  if (!DEVELOPER_MODE) {
    renderPublicAccess();
    return;
  }
  clearQuestionTimer();
  renderShell(`
    <section class="login-layout login-layout-simple">
      <div class="login-card developer-login-card">
        <span class="developer-local-badge">Solo en este ordenador</span>
        <h1 class="headline">Acceso de desarrollo</h1>
        <p class="subhead">Zona privada para probar la aplicación con perfiles ficticios y revisar mejoras.</p>
        <div class="field">
          <label for="developer-password">Contraseña de desarrollo</label>
          <input id="developer-password" type="password" autocomplete="current-password" placeholder="Contraseña" onkeydown="if(event.key === 'Enter') developerLogin()" />
        </div>
        <button class="primary" onclick="developerLogin()">Entrar al panel de pruebas</button>
        <button class="ghost developer-back-button" onclick="renderPublicAccess()">Volver</button>
        <p class="error" id="developer-login-error"></p>
      </div>
    </section>
  `, true);
  document.getElementById("developer-password")?.focus();
}

function developerLogin() {
  const password = document.getElementById("developer-password")?.value.trim();
  if (password !== ADMIN_PASSWORD) {
    document.getElementById("developer-login-error").textContent = "Contraseña de desarrollo incorrecta.";
    return;
  }
  renderDeveloperHub();
}

function renderDeveloperHub() {
  if (!canUseDeveloperTools()) {
    renderPublicAccess();
    return;
  }
  removeDeveloperTestReturn();
  clearQuestionTimer();
  const backendConfigured = window.APP_SUPABASE?.isConfigured?.() === true;
  const checklist = DEVELOPER_TEST_AREAS.map(([id, title, description]) => `
    <div class="developer-check-item ${developerChecklist.has(id) ? "is-checked" : ""}">
      <button class="developer-check-open" type="button" onclick="openDeveloperTestArea('${id}')">
        <span><strong>${title}</strong><small>${description}</small></span>
        <em>Abrir →</em>
      </button>
      <label class="developer-check-toggle">
        <input type="checkbox" ${developerChecklist.has(id) ? "checked" : ""} onchange="toggleDeveloperCheck('${id}', this.checked)" />
        <span class="developer-check-mark" aria-hidden="true">${developerChecklist.has(id) ? "✓" : ""}</span>
        <span>Revisado</span>
      </label>
    </div>
  `).join("");

  renderShell(`
    <section class="developer-hub" aria-labelledby="developer-hub-title">
      <header class="developer-hub-header">
        <div>
          <span class="developer-local-badge">Entorno local · datos ficticios</span>
          <h1 id="developer-hub-title">Panel de desarrollo</h1>
          <p>Prueba cada recorrido sin utilizar cuentas ni resultados de alumnos reales.</p>
        </div>
        <button class="ghost" onclick="publicLogout()">Salir del panel</button>
      </header>

      <div class="developer-status-row">
        <article class="developer-status-card is-ready">
          <span>✓</span>
          <div><strong>Aplicación local</strong><small>Disponible para pruebas</small></div>
        </article>
        <article id="developer-supabase-status" class="developer-status-card is-pending">
          <span id="developer-supabase-status-icon">…</span>
          <div><strong>Supabase</strong><small id="developer-supabase-status-copy">${backendConfigured ? "Comprobando conexión…" : "Pendiente de configuración"}</small></div>
        </article>
        <article class="developer-status-card is-ready">
          <span>✓</span>
          <div><strong>Datos de prueba</strong><small>Todos los alumnos son ficticios</small></div>
        </article>
      </div>

      <div class="developer-hub-grid">
        <section class="developer-action-panel">
          <div class="developer-section-heading">
            <span>Recorridos</span>
            <h2>¿Qué quieres comprobar?</h2>
          </div>
          <div class="developer-action-grid">
            <button class="developer-action-card is-primary" onclick="openDeveloperTestArea('registro')">
              <span class="developer-action-icon" aria-hidden="true">01</span>
              <strong>Nuevo registro</strong>
              <small>Recorre correo, perfil, centro y privacidad.</small>
            </button>
            <button class="developer-action-card" onclick="openDeveloperTestArea('acceso')">
              <span class="developer-action-icon" aria-hidden="true">02</span>
              <strong>Alumno ficticio</strong>
              <small>Entra con los perfiles actuales y prueba la experiencia.</small>
            </button>
            <button class="developer-action-card" onclick="openDeveloperTestArea('profesor')">
              <span class="developer-action-icon" aria-hidden="true">03</span>
              <strong>Panel del profesor</strong>
              <small>Revisa informes, grupos, claves y exportación.</small>
            </button>
            <button class="developer-action-card" onclick="showDeveloperSupabaseNextStep()">
              <span class="developer-action-icon" aria-hidden="true">04</span>
              <strong>Conexión de cuentas</strong>
              <small>Consulta qué falta para activar Google y correo.</small>
            </button>
            <button class="developer-action-card" onclick="MargaritaMyScriptEvaluation.render()">
              <span class="developer-action-icon" aria-hidden="true">05</span>
              <strong>Piloto transversal MyScript</strong>
              <small>60 muestras, tres escritores anónimos y métricas sin puntuación.</small>
            </button>
          </div>
          <p id="developer-hub-message" class="developer-hub-message" role="status" aria-live="polite"></p>
        </section>

        <aside class="developer-checklist-panel">
          <div class="developer-section-heading">
            <span>Revisión manual</span>
            <h2>Lista de comprobación</h2>
          </div>
          <p>Pulsa <strong>Abrir</strong> para entrar en una zona y marca <strong>Revisado</strong> cuando termines. La lista se reinicia al actualizar.</p>
          <div class="developer-checklist">${checklist}</div>
          <div class="developer-check-progress">
            <div><span style="width:${Math.round((developerChecklist.size / DEVELOPER_TEST_AREAS.length) * 100)}%"></span></div>
            <strong>${developerChecklist.size} de ${DEVELOPER_TEST_AREAS.length} revisadas</strong>
          </div>
          <div class="developer-report-tip">
            <strong>Cuando encuentres un fallo</strong>
            <span>Haz una captura y dime qué pulsaste justo antes. Así podré reproducirlo y corregirlo.</span>
          </div>
        </aside>
      </div>
    </section>
  `, false);
  verifyDeveloperSupabaseConnection();
}

function openDeveloperTestArea(id) {
  if (!canUseDeveloperTools()) {
    renderPublicAccess();
    return;
  }
  if (id === "registro") {
    showPublicRegistrationPreview("developer");
    return;
  }
  if (id === "aventura") {
    renderDeveloperCourseCatalog("1eso");
    return;
  }
  if (id === "bachillerato") {
    renderDeveloperCourseCatalog("1bach-mates");
    return;
  }
  if (id === "profesor") {
    renderAdminLogin();
    mountDeveloperTestReturn();
    return;
  }
  if (id === "acceso") renderLegacyLogin();
  else renderPublicAccess();
  mountDeveloperTestReturn();
}

function prepareDeveloperStudent(courseId) {
  const course = courses.find((item) => item.id === courseId);
  const student = students.find((item) => item.academicYear === DEFAULT_ACADEMIC_YEAR && item.courseId === courseId)
    || students.find((item) => item.courseId === courseId);
  if (!course || !student) return false;
  state = {
    ...state,
    view: "home",
    student,
    academicYear: student.academicYear,
    courseId,
    topicIndex: 0,
    questionIndex: 0,
    score: 0,
    streak: 0,
    practiceRound: 0,
    topicChallengeLevel: "apprentice",
    blockKey: "",
    trainingQuestionHistory: {},
    challengeQuestionHistory: {},
    challengeRoundCache: {},
    answered: false,
    multipartResponses: [],
    blockChallengeSeed: 0,
    sessionAnswers: []
  };
  return true;
}

function renderDeveloperCourseCatalog(courseId = developerSelectedCourseId) {
  if (!canUseDeveloperTools()) {
    renderPublicAccess();
    return;
  }
  removeDeveloperTestReturn();
  clearQuestionTimer();
  const availableCourses = orderedCourses();
  const selectedCourse = availableCourses.find((item) => item.id === courseId) || availableCourses[0];
  developerSelectedCourseId = selectedCourse.id;
  const eso = isEsoCourse(selectedCourse);
  const secondBach = BACH_II_COURSE_IDS.includes(selectedCourse.id);
  const courseTabs = availableCourses.map((course) => `
    <button class="developer-course-tab ${course.id === selectedCourse.id ? "is-active" : ""}" type="button" onclick="renderDeveloperCourseCatalog('${course.id}')">
      ${escapeHtml(courseDisplayName(course))}
    </button>
  `).join("");
  const topics = selectedCourse.themes.map((theme, index) => `
    <article class="developer-catalog-item">
      <span class="developer-catalog-number">${String(index + 1).padStart(2, "0")}</span>
      <div><strong>${escapeHtml(theme)}</strong><small>${eso ? "Tema y zona de aventura" : "Tema y reto de estudio"}</small></div>
      <div class="developer-catalog-actions">
        <button type="button" onclick="openDeveloperCourseTopic('${selectedCourse.id}', ${index})">Abrir tema</button>
        ${eso ? `<button type="button" onclick="openDeveloperAdventureTopic('${selectedCourse.id}', ${index})">Abrir aventura</button>` : ""}
      </div>
    </article>
  `).join("");
  const blocks = secondBach ? (BACH_II_BLOCKS[selectedCourse.id] || []).map((block) => `
    <article class="developer-catalog-item developer-catalog-block">
      <span class="developer-catalog-number">B</span>
      <div><strong>${escapeHtml(block.label)}</strong><small>${escapeHtml(block.description)}</small></div>
      <div class="developer-catalog-actions">
        <button type="button" onclick="openDeveloperBachBlock('${selectedCourse.id}', '${block.id}')">Abrir bloque</button>
      </div>
    </article>
  `).join("") : "";

  renderShell(`
    <section class="developer-catalog" aria-labelledby="developer-catalog-title">
      <header class="developer-catalog-header">
        <div>
          <span class="developer-local-badge">Acceso completo · datos ficticios</span>
          <h1 id="developer-catalog-title">Índice de pruebas</h1>
          <p>Entra directamente en cualquier curso, tema, aventura, bloque o examen.</p>
        </div>
        <button class="ghost" type="button" onclick="renderDeveloperHub()">Volver al panel</button>
      </header>
      <nav class="developer-course-tabs" aria-label="Cursos disponibles">${courseTabs}</nav>
      <section class="developer-catalog-summary">
        <div>
          <span>Curso seleccionado</span>
          <h2>${escapeHtml(courseDisplayName(selectedCourse))}</h2>
          <p>${selectedCourse.themes.length} temas disponibles para revisar.</p>
        </div>
        <div class="developer-catalog-primary-actions">
          <button type="button" onclick="openDeveloperCourseHome('${selectedCourse.id}')">Abrir inicio del curso</button>
          <button type="button" onclick="openDeveloperCourseTopics('${selectedCourse.id}')">Ver todos los temas</button>
          ${eso ? `<button type="button" onclick="openDeveloperAdventureMap('${selectedCourse.id}')">Abrir mapa de aventuras</button>` : ""}
          ${secondBach ? `<button type="button" onclick="openDeveloperBachBlocks('${selectedCourse.id}')">Ver bloques</button><button class="is-exam" type="button" onclick="openDeveloperBachExam('${selectedCourse.id}')">Probar examen</button>` : ""}
        </div>
      </section>
      <section class="developer-catalog-section">
        <div class="developer-section-heading"><span>Acceso directo</span><h2>Todos los temas${eso ? " y aventuras" : ""}</h2></div>
        <div class="developer-catalog-list">${topics}</div>
      </section>
      ${secondBach ? `<section class="developer-catalog-section"><div class="developer-section-heading"><span>PAU</span><h2>Bloques y examen</h2></div><div class="developer-catalog-list">${blocks}</div><button class="developer-catalog-exam" type="button" onclick="openDeveloperBachExam('${selectedCourse.id}')">Abrir simulación de examen</button></section>` : ""}
    </section>
  `, false);
}

function openDeveloperCourseHome(courseId) {
  if (!prepareDeveloperStudent(courseId)) return;
  if (isEsoCourseId(courseId)) renderStudentGateway();
  else if (FIRST_BACH_COURSE_IDS.includes(courseId)) renderFirstBachGateway();
  else if (BACH_II_COURSE_IDS.includes(courseId)) renderBachIIHome();
  else renderDashboard();
  mountDeveloperTestReturn();
}

function openDeveloperCourseTopics(courseId) {
  if (!prepareDeveloperStudent(courseId)) return;
  renderDashboard();
  mountDeveloperTestReturn();
}

function openDeveloperCourseTopic(courseId, topicIndex) {
  if (!prepareDeveloperStudent(courseId)) return;
  startTopic(topicIndex);
  mountDeveloperTestReturn();
}

function unlockDeveloperAdventureCourse(courseId) {
  const course = courseById(courseId);
  updateGameProgress((progress) => {
    progress.unlockedTopics = Array.from({ length: course.themes.length }, (_, index) => index);
  });
}

function openDeveloperAdventureMap(courseId) {
  if (!prepareDeveloperStudent(courseId)) return;
  unlockDeveloperAdventureCourse(courseId);
  renderAdventureMap();
  mountDeveloperTestReturn();
}

function openDeveloperAdventureTopic(courseId, topicIndex) {
  if (!prepareDeveloperStudent(courseId)) return;
  unlockDeveloperAdventureCourse(courseId);
  renderAdventureZone(topicIndex);
  mountDeveloperTestReturn();
}

function openDeveloperBachBlocks(courseId) {
  if (!prepareDeveloperStudent(courseId)) return;
  renderBachBlockSelector();
  mountDeveloperTestReturn();
}

function openDeveloperBachBlock(courseId, blockId) {
  if (!prepareDeveloperStudent(courseId)) return;
  startBachBlockChallenge(blockId);
  mountDeveloperTestReturn();
}

function openDeveloperBachExam(courseId) {
  if (!prepareDeveloperStudent(courseId)) return;
  startBachExam();
  mountDeveloperTestReturn();
}

function mountDeveloperTestReturn() {
  removeDeveloperTestReturn();
  const button = document.createElement("button");
  button.id = "developer-test-return";
  button.className = "developer-test-return";
  button.type = "button";
  button.textContent = "← Volver al índice de pruebas";
  button.addEventListener("click", () => renderDeveloperCourseCatalog(developerSelectedCourseId));
  document.body.appendChild(button);
}

function removeDeveloperTestReturn() {
  document.getElementById("developer-test-return")?.remove();
}

async function verifyDeveloperSupabaseConnection() {
  const checkId = ++developerSupabaseCheckId;
  const card = document.getElementById("developer-supabase-status");
  const icon = document.getElementById("developer-supabase-status-icon");
  const copy = document.getElementById("developer-supabase-status-copy");
  if (!card || !icon || !copy) return;

  if (!window.APP_SUPABASE?.isConfigured?.()) {
    developerSupabaseConnectionState = "missing";
    copy.textContent = "Pendiente de configuración";
    return;
  }

  developerSupabaseConnectionState = "checking";
  card.classList.remove("is-ready", "is-error");
  card.classList.add("is-pending");
  icon.textContent = "…";
  copy.textContent = "Comprobando conexión…";

  try {
    await window.APP_SUPABASE.checkConnection();
    if (checkId !== developerSupabaseCheckId || !document.body.contains(card)) return;
    developerSupabaseConnectionState = "ready";
    card.classList.remove("is-pending", "is-error");
    card.classList.add("is-ready");
    icon.textContent = "✓";
    copy.textContent = "Conexión verificada";
  } catch (error) {
    if (checkId !== developerSupabaseCheckId || !document.body.contains(card)) return;
    developerSupabaseConnectionState = "error";
    card.classList.remove("is-pending", "is-ready");
    card.classList.add("is-error");
    icon.textContent = "!";
    copy.textContent = "No se pudo verificar";
    const technicalMessage = [error?.message, error?.code, error?.details, error?.hint]
      .filter(Boolean)
      .join(" · ");
    console.error(`No se pudo verificar la conexión con Supabase: ${technicalMessage || "error desconocido"}`);
  }
}

function toggleDeveloperCheck(id, checked) {
  if (checked) developerChecklist.add(id);
  else developerChecklist.delete(id);
  renderDeveloperHub();
}

function showDeveloperSupabaseNextStep() {
  const message = document.getElementById("developer-hub-message");
  if (!message) return;
  if (developerSupabaseConnectionState === "ready") {
    message.textContent = "La conexión con Supabase está verificada. El siguiente paso es activar el registro real con cuentas ficticias de prueba.";
    return;
  }
  if (developerSupabaseConnectionState === "checking") {
    message.textContent = "La conexión todavía se está comprobando. Espera unos segundos y vuelve a pulsar.";
    return;
  }
  message.textContent = developerSupabaseConnectionState === "error"
    ? "La configuración existe, pero Supabase no ha respondido. Comprueba la conexión a Internet y vuelve a abrir el panel."
    : "Falta conectar los valores públicos de Supabase. Hasta entonces el registro seguirá siendo una demostración segura.";
}

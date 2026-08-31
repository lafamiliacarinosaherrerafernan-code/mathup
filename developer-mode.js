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
let ownerDashboardStats = null;
let ownerExplorerData = { students: [], activityByDay: [], recentErrors: [], periodDays: 30 };
let ownerFilters = { days: 30, student: "", course: "", province: "", municipality: "" };

function canUseDeveloperTools() {
  return DEVELOPER_MODE || ["owner", "developer"].includes(window.MATHUP_VERIFIED_ADMIN_ROLE);
}

function formatOwnerDuration(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  if (seconds < 60) return `${Math.round(seconds)} s`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return hours ? `${hours} h ${minutes} min` : `${minutes} min`;
}

function ownerStatList(items, emptyText = "Aún no hay datos suficientes.") {
  if (!items?.length) return `<p class="owner-empty-state">${escapeHtml(emptyText)}</p>`;
  return `<ul class="owner-stat-list">${items.map((item) => `<li><span>${escapeHtml(item.label)}</span><strong>${Number(item.count) || 0}</strong></li>`).join("")}</ul>`;
}

function ownerCourseName(courseCode) {
  const course = courses.find((item) => item.id === courseCode);
  return course ? courseDisplayName(course) : courseCode;
}

function ownerSelectOptions(values, placeholder, selected = "") {
  const clean=[...new Set(values.filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),"es",{sensitivity:"base"}));
  return `<option value="">${escapeHtml(placeholder)}</option>${clean.map(value=>`<option value="${escapeHtml(value)}" ${value===selected?"selected":""}>${escapeHtml(value)}</option>`).join("")}`;
}

function ownerFilteredStudents() {
  return (ownerExplorerData.students||[]).filter(student=>(
    (!ownerFilters.student||student.userId===ownerFilters.student)&&
    (!ownerFilters.course||student.courseCode===ownerFilters.course)&&
    (!ownerFilters.province||student.province===ownerFilters.province)&&
    (!ownerFilters.municipality||student.municipality===ownerFilters.municipality)
  ));
}

function ownerPopulateFilterControls() {
  const students=ownerExplorerData.students||[];
  const studentSelect=document.getElementById("owner-filter-student");
  const courseSelect=document.getElementById("owner-filter-course");
  const provinceSelect=document.getElementById("owner-filter-province");
  if(studentSelect)studentSelect.innerHTML=`<option value="">Todo el alumnado</option>${students.map(student=>`<option value="${escapeHtml(student.userId)}" ${student.userId===ownerFilters.student?"selected":""}>${escapeHtml(student.displayName||student.email||"Sin nombre")} · ${escapeHtml(student.email||"")}</option>`).join("")}`;
  if(courseSelect)courseSelect.innerHTML=ownerSelectOptions(students.map(student=>student.courseCode),"Todos los cursos",ownerFilters.course).replaceAll(/>([^<]+)</g,(match,label)=>label&&label!=="Todos los cursos"?`>${escapeHtml(ownerCourseName(label))}<`:match);
  if(provinceSelect)provinceSelect.innerHTML=ownerSelectOptions(students.map(student=>student.province),"Todas las provincias",ownerFilters.province);
  ownerUpdateMunicipalityOptions(false);
}

function ownerUpdateMunicipalityOptions(render = true) {
  const select=document.getElementById("owner-filter-municipality");
  if(!select)return;
  const students=(ownerExplorerData.students||[]).filter(student=>!ownerFilters.province||student.province===ownerFilters.province);
  if(ownerFilters.municipality&&!students.some(student=>student.municipality===ownerFilters.municipality))ownerFilters.municipality="";
  select.innerHTML=ownerSelectOptions(students.map(student=>student.municipality),"Todos los municipios",ownerFilters.municipality);
  if(render)ownerRenderFilteredDashboard();
}

function ownerReadFilters() {
  ownerFilters.student=document.getElementById("owner-filter-student")?.value||"";
  ownerFilters.course=document.getElementById("owner-filter-course")?.value||"";
  ownerFilters.province=document.getElementById("owner-filter-province")?.value||"";
  ownerFilters.municipality=document.getElementById("owner-filter-municipality")?.value||"";
}

function ownerApplyFilters(changed = "") {
  ownerReadFilters();
  if(changed==="province")ownerUpdateMunicipalityOptions(false);
  ownerRenderFilteredDashboard();
}

function ownerResetFilters() {
  ownerFilters={...ownerFilters,student:"",course:"",province:"",municipality:""};
  ownerPopulateFilterControls();
  ownerRenderFilteredDashboard();
}

async function ownerChangePeriod() {
  ownerFilters.days=Number(document.getElementById("owner-filter-days")?.value)||30;
  const summary=document.getElementById("owner-filter-summary");
  if(summary)summary.textContent="Actualizando el periodo seleccionado…";
  try{
    ownerExplorerData=await window.APP_SUPABASE.getAdminExplorer(ownerFilters.days);
    ownerPopulateFilterControls();
    ownerRenderFilteredDashboard();
  }catch(error){if(summary){summary.textContent=error.message||"No se pudo actualizar el periodo.";summary.classList.add("error");}}
}

function ownerCountBy(items,key,labelTransform=value=>value) {
  const counts=new Map();
  items.forEach(item=>{const value=item[key];if(value)counts.set(value,(counts.get(value)||0)+1);});
  return [...counts.entries()].sort((a,b)=>b[1]-a[1]).map(([label,count])=>({label:labelTransform(label),count}));
}

function ownerRenderFilteredDashboard() {
  const students=ownerFilteredStudents();
  const ids=new Set(students.map(student=>student.userId));
  const totalUsage=students.reduce((sum,student)=>sum+(Number(student.usageSeconds)||0),0);
  const sessions=students.reduce((sum,student)=>sum+(Number(student.sessions)||0),0);
  const attempts=students.reduce((sum,student)=>sum+(Number(student.attempts)||0),0);
  const errors=students.reduce((sum,student)=>sum+(Number(student.errors)||0),0);
  const online=students.filter(student=>student.isOnline).length;
  const active=students.filter(student=>(Number(student.sessions)||0)>0).length;
  const summary=document.getElementById("owner-filter-summary");
  if(summary){summary.classList.remove("error");summary.textContent=`${students.length} alumno${students.length===1?"":"s"} en la selección · periodo de ${ownerExplorerData.periodDays||ownerFilters.days} días. Estos filtros también actualizan la facturación.`;}

  const selected=students.length===1?students[0]:null;
  const detail=document.getElementById("owner-selection-detail");
  if(detail)detail.innerHTML=selected?`<strong>${escapeHtml(selected.displayName||"Alumno/a")}</strong><span>${escapeHtml(selected.email||"")} · ${escapeHtml(ownerCourseName(selected.courseCode))} · ${escapeHtml([selected.municipality,selected.province].filter(Boolean).join(", ")||"Ubicación no indicada")}</span><small>${escapeHtml(selected.centerName||"Centro no indicado")}</small>`:"";

  const cards=document.getElementById("owner-stat-cards");
  if(cards)cards.innerHTML=`
    <article class="developer-status-card is-ready"><span>${students.length}</span><div><strong>Alumnado seleccionado</strong><small>${online} conectado${online===1?"":"s"} ahora</small></div></article>
    <article class="developer-status-card is-ready"><span>${active}</span><div><strong>Con actividad</strong><small>En el periodo elegido</small></div></article>
    <article class="developer-status-card is-ready"><span>⏱</span><div><strong>${formatOwnerDuration(totalUsage)}</strong><small>Tiempo de uso</small></div></article>
    <article class="developer-status-card is-ready"><span>${sessions}</span><div><strong>Sesiones</strong><small>Accesos registrados</small></div></article>
    <article class="developer-status-card is-ready"><span>${attempts}</span><div><strong>Actividades</strong><small>Completadas</small></div></article>
    <article class="developer-status-card ${errors>0?"is-error":"is-ready"}"><span>${errors}</span><div><strong>Errores</strong><small>En la selección</small></div></article>`;

  const dailyRows=(ownerExplorerData.activityByDay||[]).filter(item=>ids.has(item.userId));
  const dailyMap=new Map();
  dailyRows.forEach(item=>{const saved=dailyMap.get(item.date)||{label:item.label,sessions:0,seconds:0};saved.sessions+=Number(item.sessions)||0;saved.seconds+=Number(item.seconds)||0;dailyMap.set(item.date,saved);});
  const daily=[...dailyMap.entries()].sort((a,b)=>a[0].localeCompare(b[0])).slice(-14).map(([,value])=>value);
  const dailyMax=Math.max(1,...daily.map(item=>item.seconds||item.sessions||0));
  const activity=document.getElementById("owner-daily-activity");
  if(activity)activity.innerHTML=daily.length?`<div class="owner-activity-bars">${daily.map(item=>`<div><span>${escapeHtml(item.label)}</span><i><b style="width:${Math.max(4,Math.round(((item.seconds||item.sessions||0)/dailyMax)*100))}%"></b></i><strong>${formatOwnerDuration(item.seconds)} · ${item.sessions} ses.</strong></div>`).join("")}</div>`:`<p class="owner-empty-state">No hay actividad para esta selección y periodo.</p>`;

  const courseStats=document.getElementById("owner-course-stats");
  if(courseStats)courseStats.innerHTML=ownerStatList(ownerCountBy(students,"courseCode",ownerCourseName),"No hay alumnado para estos filtros.");
  const locationStats=document.getElementById("owner-location-stats");
  if(locationStats)locationStats.innerHTML=`<h4>Provincias</h4>${ownerStatList(ownerCountBy(students,"province"))}<h4>Municipios</h4>${ownerStatList(ownerCountBy(students,"municipality"))}`;

  const recentErrors=(ownerExplorerData.recentErrors||[]).filter(item=>ids.has(item.userId));
  const errorStats=document.getElementById("owner-error-stats");
  if(errorStats)errorStats.innerHTML=recentErrors.length?`<ul class="owner-error-list">${recentErrors.slice(0,12).map(item=>`<li><span>${escapeHtml(item.displayName||"Usuario")} · ${escapeHtml(item.area)} · ${escapeHtml(item.status)}</span><strong>${escapeHtml(item.message)}</strong><small>${new Date(item.createdAt).toLocaleString("es-ES")}</small></li>`).join("")}</ul>`:`<p class="owner-empty-state">No hay errores para esta selección.</p>`;

  const billing={activeEnrollments:students.filter(student=>student.billingMode).length,pilotFree:students.filter(student=>student.billingMode==="pilot_free").length,fullCourse:students.filter(student=>student.billingMode==="full_course").length,prorated:students.filter(student=>student.billingMode==="prorated").length,revenueCents:students.reduce((sum,student)=>sum+(Number(student.revenueCents)||0),0)};
  const billingStats=document.getElementById("owner-billing-stats");
  if(billingStats)billingStats.innerHTML=`<article><strong>${billing.activeEnrollments}</strong><span>Matrículas seleccionadas</span></article><article><strong>${billing.pilotFree}</strong><span>Piloto gratuito</span></article><article><strong>${billing.fullCourse}</strong><span>Curso completo</span></article><article><strong>${billing.prorated}</strong><span>Prorrateadas</span></article><article class="is-disabled"><strong>${(billing.revenueCents/100).toLocaleString("es-ES",{style:"currency",currency:"EUR"})}</strong><span>Ingresos · cobros desactivados</span></article>`;
  const billingBreakdown=document.getElementById("owner-billing-breakdown");
  if(billingBreakdown)billingBreakdown.innerHTML=`<article><h3>Facturación por provincia</h3>${ownerStatList(ownerCountBy(students,"province"),"Sin datos provinciales.")}</article><article><h3>Facturación por municipio</h3>${ownerStatList(ownerCountBy(students,"municipality"),"Sin datos municipales.")}</article><p>Mientras los cobros estén desactivados, el desglose muestra matrículas; al activar precios mostrará también importes e ingresos.</p>`;
}

function openOwnerStudentProfile() {
  const courseId = document.getElementById("owner-course-select")?.value || "1eso";
  openDeveloperCourseHome(courseId);
}

function openOwnerCourseIndex() {
  const courseId = document.getElementById("owner-course-select")?.value || "1eso";
  renderDeveloperCourseCatalog(courseId);
}

function mountOwnerAccessButton() {
  document.getElementById("owner-access-button")?.remove();
  if (!["owner", "developer"].includes(window.MATHUP_VERIFIED_ADMIN_ROLE)) return;
  const button = document.createElement("button");
  button.id = "owner-access-button";
  button.className = "owner-access-button";
  button.type = "button";
  button.textContent = "Administración";
  button.addEventListener("click", () => {
    const url = new URL(location.href);
    url.search = "?owner=1";
    url.hash = "";
    location.href = url.toString();
  });
  document.body.appendChild(button);
}

window.mountOwnerAccessButton = mountOwnerAccessButton;

async function renderOwnerDashboard() {
  if (!["owner", "developer"].includes(window.MATHUP_VERIFIED_ADMIN_ROLE)) return renderPublicAccess("Acceso no autorizado.", true);
  clearQuestionTimer();
  const courseOptions=orderedCourses().map(course=>`<option value="${course.id}">${escapeHtml(courseDisplayName(course))}</option>`).join("");
  renderShell(`<section class="developer-hub owner-dashboard"><header class="developer-hub-header"><div><span class="developer-local-badge">Panel privado · acceso owner verificado</span><h1>Administración de +MathUp</h1><p>Revisión completa de la aplicación, actividad agregada y preparación de la futura gestión económica.</p></div><button class="ghost" onclick="publicLogout()">Cerrar sesión</button></header>
    <div class="owner-dashboard-blocks">
      <section class="owner-dashboard-block owner-student-block">
        <div class="owner-block-number">01</div>
        <div class="owner-block-content"><div class="developer-section-heading"><span>Perfil alumno</span><h2>Recorrer la aplicación por cursos</h2></div>
          <p>Abre un perfil ficticio para revisar diseño, estructura y contenidos sin modificar los datos de ningún alumno real.</p>
          <label class="owner-course-picker" for="owner-course-select"><span>Curso que quieres comprobar</span><select id="owner-course-select">${courseOptions}</select></label>
          <div class="owner-block-actions"><button class="primary" onclick="openOwnerStudentProfile()">Entrar como alumno</button><button class="secondary" onclick="openOwnerCourseIndex()">Ver índice completo</button></div>
          <small class="owner-privacy-note">Los recorridos de prueba se marcan como ficticios y no cuentan en las estadísticas reales.</small>
        </div>
      </section>
      <section class="owner-dashboard-block owner-analytics-block">
        <div class="owner-block-number">02</div>
        <div class="owner-block-content"><div class="developer-section-heading"><span>Estadísticas</span><h2>Uso, actividad y errores</h2></div>
          <div class="owner-filter-panel"><div><strong>Explorar datos</strong><span>Combina los filtros para analizar una persona, un curso o una zona concreta.</span></div>
            <div class="owner-filter-grid">
              <label><span>Periodo</span><select id="owner-filter-days" onchange="ownerChangePeriod()"><option value="7">7 días</option><option value="30" selected>30 días</option><option value="90">90 días</option><option value="365">12 meses</option></select></label>
              <label><span>Alumno/a</span><select id="owner-filter-student" onchange="ownerApplyFilters()"><option value="">Todo el alumnado</option></select></label>
              <label><span>Curso</span><select id="owner-filter-course" onchange="ownerApplyFilters()"><option value="">Todos los cursos</option></select></label>
              <label><span>Provincia</span><select id="owner-filter-province" onchange="ownerApplyFilters('province')"><option value="">Todas las provincias</option></select></label>
              <label><span>Municipio</span><select id="owner-filter-municipality" onchange="ownerApplyFilters()"><option value="">Todos los municipios</option></select></label>
              <button class="secondary" type="button" onclick="ownerResetFilters()">Limpiar filtros</button>
            </div>
            <p id="owner-filter-summary" class="owner-filter-summary">Cargando datos detallados…</p><div id="owner-selection-detail" class="owner-selection-detail"></div>
          </div>
          <div id="owner-stat-cards" class="owner-kpi-grid"><article class="developer-status-card is-pending"><span>…</span><div><strong>Cargando estadísticas</strong><small>Consultando datos agregados</small></div></article></div>
          <div class="owner-analytics-grid"><article><h3>Actividad de los últimos 7 días</h3><div id="owner-daily-activity"><p>Cargando…</p></div></article><article><h3>Alumnado por curso</h3><div id="owner-course-stats"><p>Cargando…</p></div></article><article><h3>Distribución geográfica</h3><div id="owner-location-stats"><p>Cargando…</p></div></article><article><h3>Errores técnicos</h3><div id="owner-error-stats"><p>Cargando…</p></div></article></div>
        </div>
      </section>
      <section class="owner-dashboard-block owner-billing-block">
        <div class="owner-block-number">03</div>
        <div class="owner-block-content"><div class="developer-section-heading"><span>Pagos e ingresos</span><h2>Preparación de la futura facturación</h2></div>
          <div id="owner-billing-stats" class="owner-billing-grid"><article><strong>Cobros desactivados</strong><span>El piloto continúa siendo gratuito.</span></article></div>
          <div id="owner-billing-breakdown" class="owner-billing-breakdown"><p>El desglose por provincia y municipio se actualizará con los filtros de estadísticas.</p></div>
          <div class="owner-billing-actions"><button disabled>Gestionar pagos</button><button disabled>Exportar ingresos</button><small>Se activará cuando definamos precios, condiciones y proveedor de pago seguro.</small></div>
        </div>
      </section>
    </div></section>`,false);
  try {
    const [stats,explorer]=await Promise.all([window.APP_SUPABASE.getAdminStats(),window.APP_SUPABASE.getAdminExplorer(ownerFilters.days)]);
    ownerDashboardStats=stats;
    ownerExplorerData=explorer;
    ownerPopulateFilterControls();
    ownerRenderFilteredDashboard();
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
    || students.find((item) => item.courseId === courseId)
    || { id:`owner-demo-${courseId}`, name:"Perfil de prueba", academicYear:DEFAULT_ACADEMIC_YEAR, courseId, group:"Revisión", groupLabel:"Revisión", isDemo:true };
  if (!course) return false;
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

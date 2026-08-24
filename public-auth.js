const PUBLIC_REGISTRATION_COURSES = [
  ["1eso", "1.º ESO"], ["2eso", "2.º ESO"], ["3eso", "3.º ESO"],
  ["4eso-a", "4.º ESO · Matemáticas A"], ["4eso-b", "4.º ESO · Matemáticas B"],
  ["1bach-mates", "1.º Bachillerato · Matemáticas I"], ["1bach-ccss", "1.º Bachillerato · CCSS I"],
  ["2bach-mates", "2.º Bachillerato · Matemáticas II"], ["2bach-ccss", "2.º Bachillerato · CCSS II"]
];
let publicRegistrationStep = 1;
let publicRegistrationReturnView = "login";
let publicHeartbeatTimer = null;
let publicCenterSearchTimer = null;
let publicRegistrationOauthUser = null;
let publicCenterOptions = [];
let publicErrorReportingInstalled = false;
let publicBootstrapStarted = false;
let publicMfaFactorId = null;
let publicPendingAdminRole = null;
const publicReportedErrors = new Map();
const PUBLIC_PENDING_MFA_KEY = "mathup-owner-mfa-enrollment";

function publicOwnerMode() { return new URLSearchParams(location.search).get("owner") === "1"; }

function renderPublicAccess(message = "", isError = false) {
  clearQuestionTimer();
  renderShell(`<section class="public-access-shell"><div class="public-access-card">
    <aside class="public-access-intro"><span class="public-register-eyebrow">Tu cuenta de aprendizaje</span><h1>Una cuenta, todo tu progreso</h1><p>Continúa tus retos desde cualquier dispositivo y conserva tus resultados de forma segura.</p><div class="public-register-safety"><strong>Acceso del alumnado</strong><span>Cada cuenta muestra únicamente su curso matriculado.</span></div></aside>
    <div class="public-access-panel"><span class="public-register-step-count">${publicOwnerMode() ? "Acceso privado" : "Bienvenido/a"}</span><h2>${publicOwnerMode() ? "Administración de +MathUp" : "Entra en +MathUp"}</h2><p class="public-register-copy">${publicOwnerMode() ? "El rol se comprobará antes de abrir el panel." : "Usa el correo con el que creaste tu cuenta."}</p>
      <button class="public-register-google" type="button" onclick="publicGoogleLogin()"><span>G</span> Continuar con Google</button><div class="public-register-divider"><span>o utiliza tu correo</span></div>
      <div class="field"><label for="public-login-email">Correo electrónico</label><input id="public-login-email" type="email" autocomplete="email" /></div><div class="field"><label for="public-login-password">Contraseña</label><input id="public-login-password" type="password" autocomplete="current-password" onkeydown="if(event.key==='Enter') publicEmailLogin()" /></div>
      <button class="primary" type="button" onclick="publicEmailLogin()">Entrar</button>${publicOwnerMode() ? "" : `<button class="ghost public-auth-preview-entry" type="button" onclick="showPublicRegistrationPreview()">Crear una cuenta</button><button id="public-install-button" class="ghost public-install-button" type="button" onclick="publicInstallMathUp()" hidden>Instalar +MathUp</button>`}<p id="public-login-message" class="public-register-message ${isError ? "is-error" : ""}" role="status">${escapeHtml(message)}</p>
    </div></div></section>`, false);
  document.getElementById("public-login-email")?.focus();
}

function setPublicLoginMessage(message, isError = false) { const n=document.getElementById("public-login-message"); if(n){n.textContent=message;n.classList.toggle("is-error",isError);} }
async function publicInstallMathUp(){const installed=await window.MATHUP_INSTALL?.prompt?.();if(!installed)setPublicLoginMessage("Abre el menú de Chrome o Edge y elige ‘Instalar +MathUp’. ");}
function publicAuthError(error) { const t=String(error?.message||"No se pudo completar el acceso."); if(/invalid login/i.test(t))return "Correo o contraseña incorrectos."; if(/email not confirmed/i.test(t))return "Confirma primero el correo que te hemos enviado."; if(/permission denied for function (claim|heartbeat|release)_app_session/i.test(t))return "El servicio de acceso necesita una actualización de permisos. Inténtalo de nuevo en unos minutos."; return t; }

function publicMfaError(error) {
  const text=String(error?.message||"No se pudo comprobar el código.");
  if(/invalid.*code|code.*invalid|expired/i.test(text))return "El código no es válido o ya ha caducado. Introduce el código nuevo que muestra Authenticator.";
  if(/factor.*exist|already.*factor/i.test(text))return "Ya existe un Authenticator pendiente. Cierra sesión, vuelve a entrar y completa su configuración.";
  return text;
}

function renderPublicMfaChallenge() {
  renderShell(`<section class="public-access-shell"><div class="public-access-card public-mfa-card">
    <aside class="public-access-intro"><span class="public-register-eyebrow">Doble seguridad</span><h1>Protección del panel owner</h1><p>La contraseña ya se ha comprobado. Falta confirmar que eres tú con el código temporal de tu teléfono.</p><div class="public-register-safety"><strong>Acceso exclusivo</strong><span>Los alumnos nunca pasan por esta pantalla ni pueden consultar datos administrativos.</span></div></aside>
    <div class="public-access-panel"><span class="public-register-step-count">Segundo paso de seguridad</span><h2>Código de Authenticator</h2><p class="public-register-copy">Abre Google Authenticator, Microsoft Authenticator o la aplicación que vinculaste y escribe el código de 6 cifras.</p>
      <div class="field"><label for="public-mfa-code">Código temporal</label><input id="public-mfa-code" class="public-mfa-code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" onkeydown="if(event.key==='Enter') publicVerifyOwnerMfa()" /></div>
      <button id="public-mfa-submit" class="primary" type="button" onclick="publicVerifyOwnerMfa()">Verificar y entrar</button><button class="ghost" type="button" onclick="publicLogout()">Cancelar y cerrar sesión</button><p id="public-mfa-message" class="public-register-message" role="status"></p>
    </div></div></section>`,false);
  document.getElementById("public-mfa-code")?.focus();
}

function renderPublicMfaEnrollment(enrollment) {
  const qr=escapeHtml(enrollment?.totp?.qr_code||"");
  const secret=escapeHtml(enrollment?.totp?.secret||"");
  renderShell(`<section class="public-access-shell"><div class="public-access-card public-mfa-card">
    <aside class="public-access-intro"><span class="public-register-eyebrow">Configuración única</span><h1>Activa la doble seguridad</h1><p>Este paso se realiza una sola vez. Después, cada acceso owner pedirá el código temporal de tu teléfono.</p><div class="public-register-safety"><strong>Guarda el acceso</strong><span>No compartas el QR ni la clave manual con nadie.</span></div></aside>
    <div class="public-access-panel"><span class="public-register-step-count">Authenticator · owner</span><h2>Escanea el código QR</h2><ol class="public-mfa-steps"><li>Abre tu aplicación Authenticator.</li><li>Pulsa añadir cuenta y escanea este QR.</li><li>Escribe debajo el código de 6 cifras que aparezca.</li></ol>
      <img class="public-mfa-qr" src="${qr}" alt="Código QR para configurar Authenticator" /><details class="public-mfa-secret"><summary>No puedo escanear el QR</summary><p>Introduce manualmente esta clave:</p><code>${secret}</code></details>
      <div class="field"><label for="public-mfa-code">Primer código temporal</label><input id="public-mfa-code" class="public-mfa-code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" onkeydown="if(event.key==='Enter') publicVerifyOwnerMfa()" /></div>
      <button id="public-mfa-submit" class="primary" type="button" onclick="publicVerifyOwnerMfa()">Activar y entrar</button><button class="ghost" type="button" onclick="publicLogout()">Cancelar y cerrar sesión</button><p id="public-mfa-message" class="public-register-message" role="status"></p>
    </div></div></section>`,false);
  document.getElementById("public-mfa-code")?.focus();
}

function setPublicMfaMessage(message,isError=false){const node=document.getElementById("public-mfa-message");if(node){node.textContent=message;node.classList.toggle("is-error",isError);}}

function readPendingPublicMfaEnrollment(){try{return JSON.parse(sessionStorage.getItem(PUBLIC_PENDING_MFA_KEY)||"null");}catch(_){return null;}}
function storePendingPublicMfaEnrollment(enrollment){sessionStorage.setItem(PUBLIC_PENDING_MFA_KEY,JSON.stringify(enrollment));}
function clearPendingPublicMfaEnrollment(){sessionStorage.removeItem(PUBLIC_PENDING_MFA_KEY);}

async function beginPublicOwnerMfa(role) {
  publicPendingAdminRole=role;
  const assurance=await window.APP_SUPABASE.getMfaAssuranceLevel();
  if(assurance?.currentLevel==="aal2")return finishPublicOwnerMfa();
  const factors=await window.APP_SUPABASE.listMfaFactors();
  const totpFactors=factors?.totp||[];
  const verified=totpFactors.find(factor=>factor.status==="verified");
  if(verified){publicMfaFactorId=verified.id;renderPublicMfaChallenge();return;}
  const savedEnrollment=readPendingPublicMfaEnrollment();
  if(savedEnrollment?.id&&savedEnrollment?.totp?.qr_code){publicMfaFactorId=savedEnrollment.id;renderPublicMfaEnrollment(savedEnrollment);return;}
  for(const pending of totpFactors)await window.APP_SUPABASE.unenrollMfaFactor(pending.id);
  const enrollment=await window.APP_SUPABASE.enrollTotpFactor(`MathUp owner ${new Date().toISOString()}`);
  storePendingPublicMfaEnrollment(enrollment);
  publicMfaFactorId=enrollment.id;
  renderPublicMfaEnrollment(enrollment);
}

async function publicVerifyOwnerMfa() {
  const input=document.getElementById("public-mfa-code"),button=document.getElementById("public-mfa-submit");
  const code=String(input?.value||"").replace(/\D/g,"");
  if(!/^\d{6}$/.test(code))return setPublicMfaMessage("Escribe las 6 cifras que muestra Authenticator.",true);
  button.disabled=true;setPublicMfaMessage("Comprobando el segundo factor…");
  try{
    await window.APP_SUPABASE.verifyTotpFactor(publicMfaFactorId,code);
    const assurance=await window.APP_SUPABASE.getMfaAssuranceLevel();
    if(assurance?.currentLevel!=="aal2")throw new Error("La sesión no ha alcanzado el nivel de seguridad requerido.");
    clearPendingPublicMfaEnrollment();
    finishPublicOwnerMfa();
  }catch(error){button.disabled=false;input.value="";input.focus();setPublicMfaMessage(publicMfaError(error),true);}
}

function finishPublicOwnerMfa() {
  window.MATHUP_VERIFIED_ADMIN_ROLE=publicPendingAdminRole;
  publicPendingAdminRole=null;publicMfaFactorId=null;
  return renderOwnerDashboard();
}

function reportPublicAppError(area, error, context = {}) {
  const message=String(error?.message||error||"Error sin mensaje").slice(0,500);
  if(/invalid login|email not confirmed/i.test(message)||!window.APP_SUPABASE?.reportError)return;
  const signature=`${area}|${message}`;
  const now=Date.now();
  if(now-(publicReportedErrors.get(signature)||0)<15000)return;
  publicReportedErrors.set(signature,now);
  const safeContext={
    courseId:state?.courseId||null,
    view:state?.view||null,
    path:location.pathname,
    ...context
  };
  window.APP_SUPABASE.reportError({
    area,
    code:error?.code||error?.name||null,
    message,
    context:safeContext,
    appVersion:"2026-08-20",
    isDemoSession:Boolean(state?.student&&!state.student.isRemote)
  }).catch(()=>{});
}

function installPublicErrorReporting() {
  if(publicErrorReportingInstalled)return;
  publicErrorReportingInstalled=true;
  window.addEventListener("error",event=>{
    let source=null;
    try{source=event.filename?new URL(event.filename,location.href).pathname.split("/").pop():null;}catch(_){}
    reportPublicAppError("runtime",event.error||event.message,{source,line:event.lineno||null});
  });
  window.addEventListener("unhandledrejection",event=>reportPublicAppError("promise",event.reason));
}

async function publicEmailLogin() {
  if(!window.APP_SUPABASE?.isConfigured?.())return setPublicLoginMessage("El acceso público todavía no está conectado a Supabase.",true);
  const email=document.getElementById("public-login-email")?.value.trim(),password=document.getElementById("public-login-password")?.value||"";
  if(!email||!password)return setPublicLoginMessage("Escribe tu correo y contraseña.",true);
  setPublicLoginMessage("Comprobando acceso…");
  try{const {user}=await window.APP_SUPABASE.signInWithPassword(email,password);await continueAuthenticatedAccess(user);}catch(e){reportPublicAppError("access",e,{step:"email_login"});setPublicLoginMessage(publicAuthError(e),true);}
}
async function publicGoogleLogin(){if(!window.APP_SUPABASE?.isConfigured?.())return setPublicLoginMessage("Supabase no está configurado.",true);try{sessionStorage.setItem("mathup-google-access-kind",publicOwnerMode()?"owner":document.querySelector("[data-public-step]")?"register":"student");await window.APP_SUPABASE.signInWithGoogle(publicOwnerMode());}catch(e){setPublicLoginMessage(publicAuthError(e),true);}}

async function continueAuthenticatedAccess(user) {
  if(publicOwnerMode()){
    const role=await window.APP_SUPABASE.getAdminRole();
    if(!role){await window.APP_SUPABASE.signOut();throw new Error("Esta cuenta no tiene autorización administrativa.");}
    window.MATHUP_VERIFIED_ADMIN_ROLE=null;return beginPublicOwnerMfa(role);
  }
  if(!user?.user_metadata?.course_code){
    publicRegistrationOauthUser=user;
    showPublicRegistrationPreview("login");
    publicRegistrationOauthUser=user;
    publicRegistrationStep=2;
    updatePublicRegistrationStep();
    showPublicRegistrationMessage("Completa el perfil académico para vincular tu cuenta de Google.");
    return;
  }
  const adminRole=await window.APP_SUPABASE.getAdminRole().catch(()=>null);
  if(["owner","developer"].includes(adminRole))window.MATHUP_VERIFIED_ADMIN_ROLE=adminRole;
  const claimed=await window.APP_SUPABASE.claimSession();
  if(!claimed){await window.APP_SUPABASE.getClient().auth.signOut();throw new Error("Esta cuenta ya está abierta en otro dispositivo. Cierra allí la sesión o espera dos minutos.");}
  enterAuthenticatedStudent(await window.APP_SUPABASE.loadStudentContext(user));
  if(["owner","developer"].includes(adminRole))window.mountOwnerAccessButton?.();
  clearInterval(publicHeartbeatTimer);publicHeartbeatTimer=setInterval(async()=>{try{if(!await window.APP_SUPABASE.heartbeat())await publicLogout("La sesión se ha abierto en otro dispositivo.");}catch(_){}},45000);
}

function enterAuthenticatedStudent({user,profile,enrollment}) {
  const courseId=enrollment.course_code;
  const student={id:user.id,userId:user.id,name:profile.display_name,academicYear:enrollment.academic_year,courseId,group:enrollment.group_label||"",groupLabel:enrollment.group_label||"",enrollmentId:enrollment.id,isRemote:true};
  state={...state,student,academicYear:enrollment.academic_year,courseId,view:"home",topicIndex:0,questionIndex:0,score:0,streak:0,practiceRound:0,topicChallengeLevel:"apprentice",blockKey:"",pauCommunity:BACH_II_COURSE_IDS.includes(courseId)?readBachPauCommunity(courseId,student):"clm",trainingQuestionHistory:{},challengeQuestionHistory:{},challengeRoundCache:{},answered:false,multipartResponses:[],blockChallengeSeed:0,sessionAnswers:[]};
  if(isEsoCourseId(courseId))renderStudentGateway();else if(FIRST_BACH_COURSE_IDS.includes(courseId))renderFirstBachGateway();else if(BACH_II_COURSE_IDS.includes(courseId))renderBachIIHome();else renderDashboard();
}

async function publicLogout(message="") { clearInterval(publicHeartbeatTimer);publicHeartbeatTimer=null;const pendingEnrollment=readPendingPublicMfaEnrollment();document.getElementById("owner-access-button")?.remove();try{if(pendingEnrollment?.id&&window.APP_SUPABASE?.isConfigured?.())await window.APP_SUPABASE.unenrollMfaFactor(pendingEnrollment.id);if(window.APP_SUPABASE?.isConfigured?.())await window.APP_SUPABASE.signOut();}catch(_){}clearPendingPublicMfaEnrollment();publicMfaFactorId=null;publicPendingAdminRole=null;window.MATHUP_VERIFIED_ADMIN_ROLE=null;const u=new URL(location.href);u.search="";history.replaceState({},"",u);renderPublicAccess(message); }

function showPublicRegistrationPreview(returnView="login") {
  publicRegistrationOauthUser=null;publicRegistrationStep=1;publicRegistrationReturnView=returnView;
  const courses=PUBLIC_REGISTRATION_COURSES.map(([v,l])=>`<option value="${v}">${l}</option>`).join("");
  const years=ACADEMIC_YEARS.map(y=>`<option value="${y}" ${y===DEFAULT_ACADEMIC_YEAR?"selected":""}>${y}</option>`).join("");
  renderShell(`<section class="public-register-shell"><div class="public-register-topline"><button class="public-register-back" onclick="returnFromPublicRegistrationPreview()">← Volver</button></div><div class="public-register-card">
    <aside class="public-register-intro"><span class="public-register-eyebrow">Tu cuenta de aprendizaje</span><h1>Una cuenta, todo tu progreso</h1><p>Tu matrícula dejará visible solo el curso que elijas.</p><ol class="public-register-progress"><li data-public-progress="1"><span>1</span><div><strong>Acceso</strong><small>Correo y contraseña</small></div></li><li data-public-progress="2"><span>2</span><div><strong>Perfil académico</strong><small>Curso y centro</small></div></li><li data-public-progress="3"><span>3</span><div><strong>Privacidad</strong><small>Revisión</small></div></li></ol><div class="public-register-safety"><strong>Datos mínimos</strong><span>No solicitamos una dirección personal.</span></div></aside>
    <div class="public-register-panel">
      <div data-public-step="1"><span class="public-register-step-count">Paso 1 de 3</span><h2>Crea tu acceso</h2><button class="public-register-google" onclick="publicGoogleLogin()"><span>G</span> Continuar con Google</button><div class="public-register-divider"><span>o utiliza tu correo</span></div><div class="field"><label for="public-register-email">Correo electrónico</label><input id="public-register-email" type="email" /></div><div class="field"><label for="public-register-password">Contraseña</label><input id="public-register-password" type="password" minlength="8" /></div><div class="field"><label for="public-register-password-confirm">Repite la contraseña</label><input id="public-register-password-confirm" type="password" /></div></div>
      <div data-public-step="2" hidden><span class="public-register-step-count">Paso 2 de 3</span><h2>Personaliza tu aprendizaje</h2><div class="public-register-fields-two"><div class="field"><label for="public-register-name">Nombre o apodo</label><input id="public-register-name" maxlength="60" /></div><div class="field"><label for="public-register-birthdate">Fecha de nacimiento</label><input id="public-register-birthdate" type="date" onchange="updatePublicRegistrationGuardian()" /></div><div class="field"><label for="public-register-year">Año académico</label><select id="public-register-year">${years}</select></div><div class="field"><label for="public-register-course">Curso</label><select id="public-register-course">${courses}</select></div></div><div class="public-location-grid"><div class="field"><label for="public-register-postal">Código postal</label><input id="public-register-postal" inputmode="numeric" maxlength="5" oninput="schedulePublicCenterSearch()" /></div><div class="field"><label for="public-register-municipality">Pueblo o ciudad</label><input id="public-register-municipality" readonly /></div><div class="field"><label for="public-register-province">Provincia</label><input id="public-register-province" readonly /></div></div><div class="field public-register-center-field"><label for="public-register-center-search">Nombre del instituto</label><input id="public-register-center-search" type="search" list="public-register-center-options" autocomplete="off" placeholder="Escribe primero el código postal" disabled oninput="selectPublicCenter()" /><datalist id="public-register-center-options"></datalist><input id="public-register-center" type="hidden" /><input id="public-register-center-manual" maxlength="140" placeholder="Escribe el nombre completo del instituto" hidden /><small id="public-register-center-help">Al completar el código postal podrás buscar por nombre o localidad y seleccionar un centro oficial.</small></div></div>
      <div data-public-step="3" hidden><span class="public-register-step-count">Paso 3 de 3</span><h2>Protegemos tus datos</h2><div class="public-register-privacy-summary"><article><span>✓</span><div><strong>Progreso privado</strong><small>Tus resultados pertenecen a tu cuenta.</small></div></article><article><span>✓</span><div><strong>Estadísticas agrupadas</strong><small>La zona se analiza sin publicar nombres.</small></div></article></div><div id="public-register-guardian" class="public-register-guardian" hidden><strong>Autorización familiar</strong><div class="field"><label for="public-register-guardian-email">Correo de la persona responsable</label><input id="public-register-guardian-email" type="email" /></div></div><label class="public-register-checkbox"><input id="public-register-privacy" type="checkbox" /><span>Acepto la información de privacidad.</span></label></div>
      <p id="public-register-message" class="public-register-message" role="status"></p><div class="public-register-actions"><button id="public-register-previous" class="ghost" onclick="changePublicRegistrationStep(-1)" hidden>Anterior</button><button id="public-register-next" class="primary" onclick="changePublicRegistrationStep(1)">Continuar</button></div>
    </div></div></section>`,false);updatePublicRegistrationStep();
}

function returnFromPublicRegistrationPreview(){if(publicRegistrationReturnView==="developer"&&DEVELOPER_MODE)renderDeveloperHub();else renderPublicAccess();}
function showPublicRegistrationMessage(m,e=false){const n=document.getElementById("public-register-message");if(n){n.textContent=m;n.classList.toggle("is-error",e);}}
function registrationAgeBand(){const v=document.getElementById("public-register-birthdate")?.value;if(!v)return "14_to_17";const d=new Date(v+"T00:00:00"),t=new Date();let a=t.getFullYear()-d.getFullYear();if(t<new Date(t.getFullYear(),d.getMonth(),d.getDate()))a--;return a<14?"under_14":a<18?"14_to_17":"adult";}
function publicRegistrationStepIsValid(){if(publicRegistrationStep===1){const e=document.getElementById("public-register-email").value.trim(),p=document.getElementById("public-register-password").value,c=document.getElementById("public-register-password-confirm").value;if(!/^\S+@\S+\.\S+$/.test(e)){showPublicRegistrationMessage("Escribe un correo válido.",true);return false;}if(p.length<8){showPublicRegistrationMessage("La contraseña debe tener al menos 8 caracteres.",true);return false;}if(p!==c){showPublicRegistrationMessage("Las contraseñas no coinciden.",true);return false;}}if(publicRegistrationStep===2){if(!document.getElementById("public-register-name").value.trim()||!document.getElementById("public-register-birthdate").value){showPublicRegistrationMessage("Indica nombre y fecha de nacimiento.",true);return false;}if(!/^\d{5}$/.test(document.getElementById("public-register-postal").value)||!document.getElementById("public-register-municipality").value){showPublicRegistrationMessage("Indica un código postal válido y espera a que aparezca la localidad.",true);return false;}const selected=document.getElementById("public-register-center").value,manual=document.getElementById("public-register-center-manual").value.trim();if(!selected&&!manual){showPublicRegistrationMessage("Busca el instituto por nombre o localidad y selecciónalo de la lista.",true);return false;}}if(publicRegistrationStep===3&&!document.getElementById("public-register-privacy").checked){showPublicRegistrationMessage("Acepta la información de privacidad.",true);return false;}return true;}
async function changePublicRegistrationStep(d){if(d>0&&!publicRegistrationStepIsValid())return;if(publicRegistrationStep===3&&d>0)return completePublicRegistration();publicRegistrationStep=Math.min(3,Math.max(1,publicRegistrationStep+d));updatePublicRegistrationStep();}
function updatePublicRegistrationStep(){document.querySelectorAll("[data-public-step]").forEach(n=>n.hidden=Number(n.dataset.publicStep)!==publicRegistrationStep);document.querySelectorAll("[data-public-progress]").forEach(n=>{const s=Number(n.dataset.publicProgress);n.classList.toggle("is-complete",s<publicRegistrationStep);if(s===publicRegistrationStep)n.setAttribute("aria-current","step");else n.removeAttribute("aria-current")});document.getElementById("public-register-previous").hidden=publicRegistrationStep===1;document.getElementById("public-register-next").textContent=publicRegistrationStep===3?"Crear cuenta":"Continuar";showPublicRegistrationMessage("");if(publicRegistrationStep===3)updatePublicRegistrationGuardian();scheduleFitStudentScreen();}
function updatePublicRegistrationGuardian(){const g=document.getElementById("public-register-guardian");if(g)g.hidden=registrationAgeBand()!=="under_14";}
function schedulePublicCenterSearch(){clearTimeout(publicCenterSearchTimer);publicCenterSearchTimer=setTimeout(searchPublicCenters,350);}
function publicCenterLabel(center){const kind=center.ownership?` · ${center.ownership.replace("Centro ","")}`:"";return `${center.name} · ${center.municipality}${kind}`;}
function selectPublicCenter(){const search=document.getElementById("public-register-center-search"),hidden=document.getElementById("public-register-center"),manual=document.getElementById("public-register-center-manual"),help=document.getElementById("public-register-center-help"),selected=publicCenterOptions.find(c=>publicCenterLabel(c)===search.value);hidden.value=selected?.id||"";manual.value="";manual.hidden=true;search.setCustomValidity(search.value&&!selected?"Selecciona un centro de la lista oficial.":"");if(selected)help.textContent=`Centro seleccionado: ${selected.name} (${selected.municipality}).`;else if(search.value)help.textContent="Sigue escribiendo y selecciona una coincidencia de la lista.";}
async function searchPublicCenters(){const p=document.getElementById("public-register-postal")?.value.trim(),search=document.getElementById("public-register-center-search"),hidden=document.getElementById("public-register-center"),list=document.getElementById("public-register-center-options"),manual=document.getElementById("public-register-center-manual"),h=document.getElementById("public-register-center-help"),m=document.getElementById("public-register-municipality"),v=document.getElementById("public-register-province");m.value="";v.value="";m.readOnly=true;v.readOnly=true;hidden.value="";search.value="";manual.value="";manual.hidden=true;publicCenterOptions=[];list.innerHTML="";if(!/^\d{5}$/.test(p)){search.disabled=true;search.placeholder="Escribe primero el código postal";return;}try{const result=await window.APP_SUPABASE.searchCenters(p),c=result.centers||[],locations=result.locations||[],location=locations[0]||null;if(location){m.value=location.municipality||"";v.value=location.province||"";}publicCenterOptions=c;list.innerHTML=c.map(x=>`<option value="${escapeHtml(publicCenterLabel(x))}"></option>`).join("");search.disabled=!c.length;search.placeholder=c.length?"Escribe parte del nombre o de la localidad":"No hay centros importados para esta provincia";h.textContent=c.length?`${c.length} centros oficiales de secundaria en ${location.province}. Escribe parte del nombre o localidad y selecciona uno.`:"Este código postal aún no tiene asociado un listado provincial de centros.";if(c.length)search.focus();if(!location){m.readOnly=false;v.readOnly=false;m.placeholder="Pueblo o ciudad";v.placeholder="Provincia";manual.hidden=false;h.textContent="Este código postal aún no está importado: completa localidad, provincia e instituto para continuar.";}}catch(e){showPublicRegistrationMessage("No se pudo consultar el listado de centros.",true);}}
async function completePublicRegistration(){if(!window.APP_SUPABASE?.isConfigured?.())return showPublicRegistrationMessage("Supabase no está configurado.",true);const b=document.getElementById("public-register-next");b.disabled=true;showPublicRegistrationMessage("Creando la cuenta…");const centerId=document.getElementById("public-register-center").value,centerManual=document.getElementById("public-register-center-manual"),selectedCenter=publicCenterOptions.find(c=>c.id===centerId);const metadata={display_name:document.getElementById("public-register-name").value.trim(),age_band:registrationAgeBand(),academic_year:document.getElementById("public-register-year").value,course_code:document.getElementById("public-register-course").value,postal_code:document.getElementById("public-register-postal").value,municipality:document.getElementById("public-register-municipality").value,province:document.getElementById("public-register-province").value,center_id:centerId||null,center_name:selectedCenter?.name||centerManual.value.trim()||null,guardian_email:document.getElementById("public-register-guardian-email")?.value.trim()||null};try{if(publicRegistrationOauthUser){const user=await window.APP_SUPABASE.updateUserMetadata(metadata);publicRegistrationOauthUser=null;await window.APP_SUPABASE.completeOnboarding(user);return await continueAuthenticatedAccess(user);}const data=await window.APP_SUPABASE.signUp(document.getElementById("public-register-email").value.trim(),document.getElementById("public-register-password").value,metadata);if(data.session&&data.user)await continueAuthenticatedAccess(data.user);else{showPublicRegistrationMessage("Cuenta creada. Revisa tu correo y confirma el enlace antes de entrar.");b.textContent="Correo enviado";}}catch(e){b.disabled=false;showPublicRegistrationMessage(publicAuthError(e),true);}}

function publicAuthTimeout(promise, milliseconds, message) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer=setTimeout(()=>reject(new Error(message)),milliseconds);
    })
  ]).finally(()=>clearTimeout(timer));
}

async function bootstrapPublicAuth(){
  if(publicBootstrapStarted)return;
  publicBootstrapStarted=true;
  installPublicErrorReporting();
  document.addEventListener("keydown",e=>{if(DEVELOPER_MODE&&e.ctrlKey&&e.altKey&&e.key.toLowerCase()==="a")renderDeveloperLogin();});
  if(!window.APP_SUPABASE?.isConfigured?.())return renderPublicAccess("El administrador debe completar la conexión segura antes del piloto.",true);

  // Muestra siempre una pantalla util desde el primer instante. Algunas sesiones
  // antiguas de Chromium pueden dejar bloqueada la restauracion de Supabase.
  renderPublicAccess("Comprobando si ya tienes una sesión abierta…");
  try{
    const s=await publicAuthTimeout(window.APP_SUPABASE.getSession(),8000,"La sesión guardada no ha respondido.");
    if(s?.user)return await publicAuthTimeout(continueAuthenticatedAccess(s.user),12000,"No se ha podido recuperar la sesión guardada.");
    renderPublicAccess();
  }catch(e){
    reportPublicAppError("bootstrap",e);
    renderPublicAccess("La sesión anterior no se pudo recuperar. Puedes entrar de nuevo con tu correo.",false);
  }
}
window.bootstrapPublicAuth=bootstrapPublicAuth;
bootstrapPublicAuth();

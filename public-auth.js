const PUBLIC_REGISTRATION_COURSES = [
  ["1eso", "1.º ESO"],
  ["2eso", "2.º ESO"],
  ["3eso", "3.º ESO"],
  ["4eso-a", "4.º ESO · Matemáticas A"],
  ["4eso-b", "4.º ESO · Matemáticas B"],
  ["1bach-mates", "1.º Bachillerato · Matemáticas I"],
  ["1bach-ccss", "1.º Bachillerato · CCSS I"],
  ["2bach-mates", "2.º Bachillerato · Matemáticas II"],
  ["2bach-ccss", "2.º Bachillerato · CCSS II"]
];

let publicRegistrationStep = 1;
let publicRegistrationReturnView = "login";

function showPublicRegistrationPreview(returnView = "login") {
  clearQuestionTimer();
  publicRegistrationStep = 1;
  publicRegistrationReturnView = returnView;
  const courseOptions = PUBLIC_REGISTRATION_COURSES
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
  const yearOptions = ACADEMIC_YEARS
    .map((year) => `<option value="${year}" ${year === DEFAULT_ACADEMIC_YEAR ? "selected" : ""}>${year}</option>`)
    .join("");

  renderShell(`
    <section class="public-register-shell" aria-labelledby="public-register-title">
      <div class="public-register-topline">
        <button class="public-register-back" type="button" onclick="returnFromPublicRegistrationPreview()">← Volver</button>
        <span class="public-register-preview-badge">Vista previa · no guarda datos</span>
      </div>

      <div class="public-register-card">
        <aside class="public-register-intro">
          <span class="public-register-eyebrow">Tu cuenta de aprendizaje</span>
          <h1 id="public-register-title">Una cuenta, todo tu progreso</h1>
          <p>La futura cuenta permitirá continuar los retos desde cualquier dispositivo y conservar resultados de forma segura.</p>

          <ol class="public-register-progress" aria-label="Pasos del registro">
            <li data-public-progress="1" aria-current="step"><span>1</span><div><strong>Acceso</strong><small>Correo y contraseña</small></div></li>
            <li data-public-progress="2"><span>2</span><div><strong>Perfil académico</strong><small>Curso y centro</small></div></li>
            <li data-public-progress="3"><span>3</span><div><strong>Privacidad</strong><small>Revisión y autorización</small></div></li>
          </ol>

          <div class="public-register-safety">
            <strong>Diseñado para estudiantes</strong>
            <span>Sin teléfono obligatorio y con autorización familiar cuando corresponda.</span>
          </div>
        </aside>

        <div class="public-register-panel">
          <div class="public-register-step" data-public-step="1">
            <span class="public-register-step-count">Paso 1 de 3</span>
            <h2>Crea tu acceso</h2>
            <p class="public-register-copy">En la versión pública podrás entrar con Google o con tu correo.</p>

            <button class="public-register-google" type="button" onclick="showPublicRegistrationMessage('El acceso con Google se conectará en la fase de autenticación.')">
              <span aria-hidden="true">G</span> Continuar con Google
            </button>
            <div class="public-register-divider"><span>o utiliza tu correo</span></div>

            <div class="field">
              <label for="public-register-email">Correo electrónico</label>
              <input id="public-register-email" type="email" autocomplete="email" placeholder="alumno@correo.es" />
            </div>
            <div class="field">
              <label for="public-register-password">Contraseña</label>
              <input id="public-register-password" type="password" autocomplete="new-password" minlength="8" placeholder="Mínimo 8 caracteres" />
            </div>
            <div class="field">
              <label for="public-register-password-confirm">Repite la contraseña</label>
              <input id="public-register-password-confirm" type="password" autocomplete="new-password" placeholder="Vuelve a escribirla" />
            </div>
          </div>

          <div class="public-register-step" data-public-step="2" hidden>
            <span class="public-register-step-count">Paso 2 de 3</span>
            <h2>Personaliza tu aprendizaje</h2>
            <p class="public-register-copy">Estos datos ajustarán los contenidos y permitirán estadísticas agrupadas.</p>

            <div class="public-register-fields-two">
              <div class="field">
                <label for="public-register-name">Nombre o apodo</label>
                <input id="public-register-name" autocomplete="nickname" placeholder="Como quieres que te llamemos" />
              </div>
              <div class="field">
                <label for="public-register-birthdate">Fecha de nacimiento</label>
                <input id="public-register-birthdate" type="date" onchange="updatePublicRegistrationGuardian()" />
              </div>
              <div class="field">
                <label for="public-register-year">Año académico</label>
                <select id="public-register-year">${yearOptions}</select>
              </div>
              <div class="field">
                <label for="public-register-course">Curso</label>
                <select id="public-register-course">${courseOptions}</select>
              </div>
            </div>

            <div class="field public-register-center-field">
              <label for="public-register-center">Centro educativo</label>
              <input id="public-register-center" list="public-register-centers" autocomplete="off" value="IES Margarita Salas (centro piloto)" />
              <datalist id="public-register-centers">
                <option value="IES Margarita Salas (centro piloto)"></option>
              </datalist>
              <small>En la apertura pública se conectará con el Registro Estatal de Centros Docentes.</small>
            </div>

            <label class="public-register-checkbox">
              <input id="public-register-no-center" type="checkbox" onchange="togglePublicRegistrationCenter()" />
              <span>No encuentro mi centro o prefiero indicarlo más adelante</span>
            </label>
          </div>

          <div class="public-register-step" data-public-step="3" hidden>
            <span class="public-register-step-count">Paso 3 de 3</span>
            <h2>Protegemos tus datos</h2>
            <p class="public-register-copy">Antes de crear la cuenta explicaremos de forma clara qué información se utiliza y para qué.</p>

            <div class="public-register-privacy-summary">
              <article><span aria-hidden="true">✓</span><div><strong>Datos mínimos</strong><small>No pediremos teléfono ni apellidos si no son necesarios.</small></div></article>
              <article><span aria-hidden="true">✓</span><div><strong>Progreso privado</strong><small>Los resultados individuales solo pertenecerán a la cuenta.</small></div></article>
              <article><span aria-hidden="true">✓</span><div><strong>Estadísticas agrupadas</strong><small>Nunca se publicarán clasificaciones identificables de alumnos.</small></div></article>
            </div>

            <div id="public-register-guardian" class="public-register-guardian" hidden>
              <strong>Necesitamos autorización familiar</strong>
              <p>Al ser menor de 14 años, enviaremos una solicitud a tu madre, padre o tutor legal.</p>
              <div class="field">
                <label for="public-register-guardian-email">Correo de la persona responsable</label>
                <input id="public-register-guardian-email" type="email" autocomplete="email" placeholder="familia@correo.es" />
              </div>
            </div>

            <label class="public-register-checkbox public-register-consent">
              <input id="public-register-privacy" type="checkbox" />
              <span>He leído la información de privacidad de esta demostración.</span>
            </label>
          </div>

          <p id="public-register-message" class="public-register-message" role="status" aria-live="polite"></p>
          <div class="public-register-actions">
            <button id="public-register-previous" class="ghost" type="button" onclick="changePublicRegistrationStep(-1)" hidden>Anterior</button>
            <button id="public-register-next" class="primary" type="button" onclick="changePublicRegistrationStep(1)">Continuar</button>
          </div>
        </div>
      </div>
    </section>
  `, false);
  updatePublicRegistrationStep();
}

function returnFromPublicRegistrationPreview() {
  if (publicRegistrationReturnView === "developer" && DEVELOPER_MODE) renderDeveloperHub();
  else renderLogin();
}

function showPublicRegistrationMessage(message, isError = false) {
  const element = document.getElementById("public-register-message");
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("is-error", isError);
}

function publicRegistrationStepIsValid() {
  if (publicRegistrationStep === 1) {
    const email = document.getElementById("public-register-email").value.trim();
    const password = document.getElementById("public-register-password").value;
    const confirmation = document.getElementById("public-register-password-confirm").value;
    if (!email.includes("@")) {
      showPublicRegistrationMessage("Escribe un correo válido para continuar con la demostración.", true);
      return false;
    }
    if (password.length < 8) {
      showPublicRegistrationMessage("La contraseña debe tener al menos 8 caracteres.", true);
      return false;
    }
    if (password !== confirmation) {
      showPublicRegistrationMessage("Las dos contraseñas no coinciden.", true);
      return false;
    }
  }

  if (publicRegistrationStep === 2) {
    const displayName = document.getElementById("public-register-name").value.trim();
    const birthdate = document.getElementById("public-register-birthdate").value;
    if (!displayName || !birthdate) {
      showPublicRegistrationMessage("Indica un nombre o apodo y la fecha de nacimiento para continuar.", true);
      return false;
    }
  }

  if (publicRegistrationStep === 3) {
    if (!document.getElementById("public-register-privacy").checked) {
      showPublicRegistrationMessage("Marca la casilla de privacidad para completar la demostración.", true);
      return false;
    }
    const guardian = document.getElementById("public-register-guardian");
    if (!guardian.hidden && !document.getElementById("public-register-guardian-email").value.includes("@")) {
      showPublicRegistrationMessage("Escribe un correo válido de la persona responsable.", true);
      return false;
    }
  }
  return true;
}

function changePublicRegistrationStep(direction) {
  if (direction > 0 && !publicRegistrationStepIsValid()) return;
  if (publicRegistrationStep === 3 && direction > 0) {
    showPublicRegistrationMessage("Demostración completada. No se ha creado ninguna cuenta ni se ha guardado ningún dato.");
    document.getElementById("public-register-next").textContent = "Demostración completada";
    document.getElementById("public-register-next").disabled = true;
    return;
  }
  publicRegistrationStep = Math.min(3, Math.max(1, publicRegistrationStep + direction));
  updatePublicRegistrationStep();
}

function updatePublicRegistrationStep() {
  document.querySelectorAll("[data-public-step]").forEach((element) => {
    element.hidden = Number(element.dataset.publicStep) !== publicRegistrationStep;
  });
  document.querySelectorAll("[data-public-progress]").forEach((element) => {
    const step = Number(element.dataset.publicProgress);
    element.classList.toggle("is-complete", step < publicRegistrationStep);
    if (step === publicRegistrationStep) element.setAttribute("aria-current", "step");
    else element.removeAttribute("aria-current");
  });
  document.getElementById("public-register-previous").hidden = publicRegistrationStep === 1;
  document.getElementById("public-register-next").textContent = publicRegistrationStep === 3 ? "Completar demostración" : "Continuar";
  showPublicRegistrationMessage("");
  if (publicRegistrationStep === 3) updatePublicRegistrationGuardian();
  scheduleFitStudentScreen();
}

function updatePublicRegistrationGuardian() {
  const birthdateInput = document.getElementById("public-register-birthdate");
  const guardian = document.getElementById("public-register-guardian");
  if (!birthdateInput || !guardian || !birthdateInput.value) {
    if (guardian) guardian.hidden = true;
    return;
  }
  const birthdate = new Date(`${birthdateInput.value}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const birthdayPending = today.getMonth() < birthdate.getMonth()
    || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate());
  if (birthdayPending) age -= 1;
  guardian.hidden = age >= 14;
}

function togglePublicRegistrationCenter() {
  const centerInput = document.getElementById("public-register-center");
  const skipCenter = document.getElementById("public-register-no-center").checked;
  centerInput.disabled = skipCenter;
  if (skipCenter) centerInput.value = "";
  else centerInput.value = "IES Margarita Salas (centro piloto)";
}

(function initializeMyScriptPhase2DPilot(global) {
  "use strict";

  const STORAGE_KEY = "margarita-myscript-phase2d-v1";
  const BASELINE_REQUESTS = 1;
  const MAX_ADDITIONAL_REQUESTS = 70;
  const KNOWN_QUOTA = 2000;
  const CRITICAL_FAMILIES = new Set(["matrices", "determinantes", "sistemas", "limites", "derivadas"]);
  const PILOT_PRESENTATION_FAILURES = new Set(["phase2d-52", "phase2d-53"]);
  const selection = global.MARGARITA_MYSCRIPT_PHASE2D_SELECTION || [];
  let corpus = [];
  let corpusPromise = null;
  let inFlight = false;
  let pending = null;

  function emptyState() {
    return { version: 3, currentIndex: 0, records: [], pending: null, sessionEnded: false, recoveryVersion: 0 };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(global.localStorage?.getItem(STORAGE_KEY) || "null");
      if (!parsed || !Array.isArray(parsed.records)) return emptyState();
      const loaded = { ...emptyState(), ...parsed };
      // Rectificación documentada durante el piloto: la muestra 26 fue
      // reconocida correctamente, pero se marcó como ambigua al confundir una
      // desalineación visual del renderizador con un error de MyScript. No se
      // repite la petición ni se altera ninguna otra muestra.
      loaded.records = loaded.records.map((record) => {
        const expression = String(record?.recognizedExpression || "");
        const isConfirmedMatrix26 = record?.sampleId === "phase2d-26"
          && record?.outcome === "ambiguous"
          && /3\s*A/i.test(expression)
          && ["3", "6", "9", "12"].every((value) => expression.includes(value));
        return isConfirmedMatrix26 ? {
          ...record,
          outcome: "correct",
          recognitionDecision: "RECOGNITION_OK",
          classificationCorrection: "Rectificación del profesor: reconocimiento correcto; desalineación causada por el renderizador local.",
          classificationCorrectedAt: new Date().toISOString()
        } : record;
      });
      return loaded;
    } catch {
      return emptyState();
    }
  }

  let state = loadState();
  pending = state.pending && typeof state.pending === "object" ? state.pending : null;
  function saveState() { global.localStorage?.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function escapeHtml(value) {
    return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function familyLabel(value) { return String(value || "").replace(/-/g, " "); }
  function pilotRenderableExpression(value) {
    const symbols = {
      alpha: "α", beta: "β", theta: "θ", lambda: "λ", mu: "μ", sigma: "σ", pi: "π", rho: "ρ", eta: "η",
      mid: "/", sim: "∼", int: "∫", log: "log"
    };
    return String(value ?? "")
      .replace(/\\operatorname\s*\{\s*([^{}]+)\s*\}/gi, "$1")
      .replace(/\\vec\s*\{?\s*([A-Za-z])\s*\}?/g, "vec{$1}")
      .replace(/\\(int|log)(?=\s|[_^({]|$)/gi, (_, command) => symbols[command.toLowerCase()])
      .replace(/\\(alpha|beta|theta|lambda|mu|sigma|pi|rho|eta|mid|sim|int|log)\b/gi, (_, command) => symbols[command.toLowerCase()])
      .replace(/\bin\b(?=\s*[([])/gi, "∈")
      .replace(/^(\s*\()\s*([+−-]?\d+)\s*\/\s*(\d+)(\s*,)/, "$1\\frac{$2}{$3}$4");
  }
  function pilotDisplayExpression(value) {
    const symbols = {
      alpha: "α", beta: "β", theta: "θ", lambda: "λ", mu: "μ", sigma: "σ", pi: "π", rho: "ρ", eta: "η",
      infty: "∞", to: "→", rightarrow: "→", times: "×", cdot: "·", circ: "∘", cup: "∪", cap: "∩",
      le: "≤", leq: "≤", ge: "≥", geq: "≥", neq: "≠", pm: "±", sim: "∼", mid: "/", int: "∫"
    };
    let display = String(value ?? "")
      .replace(/\\operatorname\s*\{\s*([^{}]+)\s*\}/gi, "$1")
      .replace(/\\(?:begin|end)\s*\{(?:p|v|b|V)?matrix\}/g, " ")
      .replace(/\\(?:begin|end)\s*\{(?:cases|array)\}(?:\{[^{}]*\})?/g, " ")
      .replace(/\\(?:left|right|displaystyle)\b/g, "")
      .replace(/\\(?:quad|qquad|,|;|!)/g, " ")
      .replace(/\\overline\s*\{?([A-Za-z])\}?/g, "$1̄")
      .replace(/\\bar\s*\{?([A-Za-z])\}?/g, "$1̄")
      .replace(/\\hat\s*\{?([A-Za-z])\}?/g, "$1̂")
      .replace(/\\vec\s*\{?([A-Za-z])\}?/g, "$1⃗");
    for (let pass = 0; pass < 4; pass += 1) {
      display = display
        .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)")
        .replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)");
    }
    display = display
      .replace(/\\([A-Za-z]+)\b/g, (match, command) => symbols[command.toLowerCase()] || command)
      .replace(/\\\\/g, " ; ")
      .replace(/\\/g, "")
      .replace(/&/g, "  ")
      .replace(/\s+([_^])/g, "$1")
      .replace(/_\{\s*([^{}]+?)\s*\}/g, (_, content) => {
        const subscript = { 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉", "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎", a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", r: "ᵣ", s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", x: "ₓ" };
        const converted = [...content].map((character) => subscript[character] || "").join("");
        return converted.length === content.length ? converted : `₍${content.replace(/\//g, "⁄")}₎`;
      })
      .replace(/_([0-9A-Za-z])/g, (_, character) => ({ 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉", a: "ₐ", i: "ᵢ", n: "ₙ", x: "ₓ" }[character] || `₍${character}₎`))
      .replace(/\^\{\s*([^{}]+?)\s*\}/g, (_, content) => {
        const superscript = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾", i: "ⁱ", n: "ⁿ", x: "ˣ" };
        const converted = [...content].map((character) => superscript[character] || "").join("");
        return converted.length === content.length ? converted : `^(${content})`;
      })
      .replace(/\^([0-9])/g, (_, character) => ({ 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" }[character]))
      .replace(/\s+/g, " ")
      .trim();
    return display;
  }
  function renderPilotMath(value) {
    // El corpus conserva LaTeX original. En la interfaz pedagógica los
    // comandos son metadatos: la barra de `\lim` nunca debe ser visible.
    const rawValue = String(value ?? "");
    const structuredLimit = renderPilotLimit(rawValue);
    if (structuredLimit) return structuredLimit;
  const displayValue = rawValue
    .split("\\lim").join("lim")
    .replace(/\s+([_^])/g, "$1")
    .replace(/([_^])\s+\{/g, "$1{")
    .replace(/∫\^\{([^{}]+)\}_\{([^{}]+)\}/g, "∫_{$2}^{$1}")
    .replace(
      /\\operatorname\s*\{\s*(sen|sin|cos|tg|tan|cotg|cot|sec|cosec|csc)\s*\}/gi,
      "$1 "
    )
    .replace(/\\(sen|sin|cos|tg|tan|cotg|cot|sec|cosec|csc)\b/gi, "$1 ")
    .replace(
      /\b(sen|sin|cos|tg|tan|cotg|cot|sec|cosec|csc)\s*\^\s*\{?\s*2\s*\}?/gi,
      "$1² "
    )
    .replace(/\s+/g, " ")
    .trim();
    return global.MargaritaMathRenderer?.text?.(displayValue) || escapeHtml(displayValue);
  }

  function renderPilotVisibleExpression(value, displayExpression = null) {
    const prepared = displayExpression ?? pilotRenderableExpression(value);
    const polarComplex = prepared.match(/^(z\s*=\s*\d+)\s*_\{\s*([^{}]+)\s*\}$/i);
    if (polarComplex) return `${renderPilotMath(polarComplex[1])}<sub>${escapeHtml(polarComplex[2]).replace(/\//g, "⁄")}</sub>`;
    return renderPilotMath(prepared);
  }

  function renderPilotLimit(value) {
    const rawValue = String(value ?? "");
    const slash = String.fromCharCode(92);
    // MyScript puede introducir espacios (`\lim _{...}`), usar
    // `\rightarrow` en vez de `\to` o anteponer `\displaystyle`.
    // Todas esas variantes representan el mismo límite y deben compartir
    // exactamente la misma composición visual que el objetivo.
    const limitPattern = /^(.*?)\\lim\s*_\s*\{\s*((?:[^{}]|\{[^{}]*\})+?)\s*\}\s*(.+)$/s;
    const match = rawValue.match(limitPattern);
    if (!match) return null;
    const prefix = match[1].split(slash + "displaystyle").join("").trim();
    const condition = match[2]
      .split(slash + "rightarrow").join("→")
      .split(slash + "to").join("→")
      .split(slash + "infty").join("∞");
    const remainder = match[3].trim();
    if (!condition || !remainder) return null;
    const renderedPrefix = prefix
      ? (global.MargaritaMathRenderer?.text?.(prefix) || escapeHtml(prefix))
      : "";
    const expression = global.MargaritaMathRenderer?.text?.(remainder) || escapeHtml(remainder);
    const renderedCondition = global.MargaritaMathRenderer?.text?.(condition)
      || escapeHtml(condition).replace(
        /\^\s*(?:\{\s*([+\-−])\s*\}|([+\-−]))/g,
        (_, bracedSign, plainSign) => `<sup>${(bracedSign || plainSign) === "-" ? "−" : (bracedSign || plainSign)}</sup>`
      );
    return `${renderedPrefix}<span class="math-limit-expression"><span class="math-limit-main">lim</span><span class="math-limit-condition">${renderedCondition}</span><span class="math-limit-body">${expression}</span></span>`;
  }
  function totalAdditionalRequests() {
    return state.records.reduce((sum, record) => sum + (Number(record.requestCount) || 0), 0);
  }
  function totalKnownRequests() { return BASELINE_REQUESTS + totalAdditionalRequests(); }
  function normalizedSampleIndex(index) {
    const numericIndex = Number(index);
    return Math.max(0, Math.min(corpus.length - 1, Number.isFinite(numericIndex) ? numericIndex : 0));
  }
  function sampleAt(index = state.currentIndex) {
    return corpus[normalizedSampleIndex(index)] || null;
  }
  function recordsFor(sampleId) { return state.records.filter((record) => record.sampleId === sampleId); }
  function latestRecord(sampleId) { return recordsFor(sampleId).at(-1) || null; }
  function finalRecord(sampleId) {
    const records = recordsFor(sampleId);
    return [...records].reverse().find((record) => record.outcome !== "technical-error") || records.at(-1) || null;
  }
  function compactJiix(raw) {
    if (!raw || typeof raw !== "object") return null;
    const compact = {};
    ["version", "type", "label", "expressions", "latex", "mathml"].forEach((key) => {
      if (raw[key] !== undefined) compact[key] = raw[key];
    });
    return Object.keys(compact).length ? compact : raw;
  }

  async function loadCorpus() {
    if (corpus.length) return corpus;
    if (corpusPromise) return corpusPromise;
    corpusPromise = (async () => {
      const basic = new Map((global.MARGARITA_MYSCRIPT_PHASE2C_CORPUS || []).map((sample) => [sample.sampleId, sample]));
      const response = await fetch("docs/myscript-phase2c-bach-corpus-proposal.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`No se pudo cargar el corpus avanzado (${response.status}).`);
      const advancedDocument = await response.json();
      const advanced = new Map((advancedDocument.families || []).map((family) => [family.id, family]));
      corpus = selection.map((item) => {
        if (item.source === "basic") {
          const source = basic.get(item.sourceRef);
          if (!source) throw new Error(`Referencia básica inexistente: ${item.sourceRef}`);
          return Object.freeze({
            ...source,
            sampleId: item.pilotId,
            sourceSampleId: source.sampleId,
            sourceLevel: "basic",
            category: item.category,
            assignedWriter: item.assignedWriter,
            displayExpression: pilotRenderableExpression(source.display)
          });
        }
        const family = advanced.get(item.sourceRef.family);
        const expected = family?.samples?.[item.sourceRef.sampleIndex];
        if (typeof expected !== "string") throw new Error(`Referencia avanzada inexistente: ${item.sourceRef.family}[${item.sourceRef.sampleIndex}]`);
        return Object.freeze({
          sampleId: item.pilotId,
          sourceSampleId: `${item.sourceRef.family}-${item.sourceRef.sampleIndex + 1}`,
          sourceLevel: "advanced",
          family: item.sourceRef.family,
          category: item.category,
          display: expected,
          displayExpression: pilotRenderableExpression(expected),
          expectedExpression: expected,
          validationType: "advanced-unsupported",
          assignedWriter: item.assignedWriter
        });
      });
      return corpus;
    })();
    return corpusPromise;
  }

  function validatorResult(sample, recognizedExpression) {
    if (sample.sourceLevel === "advanced") {
      const result = global.MargaritaMathAnswerValidator?.compareRecognition?.({
        recognizedExpression,
        expectedExpression: sample.expectedExpression
      });
      if (!result) return { status: "unsupported", isEquivalent: null, separation: "VALIDATOR_NOT_IMPLEMENTED" };
      return { ...result, separation: result.status === "unsupported" ? "VALIDATOR_NOT_IMPLEMENTED" : "VALIDATOR_AVAILABLE" };
    }
    if (!recognizedExpression || !global.MargaritaMathAnswerValidator) {
      return { status: "unsupported", isEquivalent: null, separation: "VALIDATOR_NOT_IMPLEMENTED" };
    }
    const result = global.MargaritaMathAnswerValidator.validate({
      recognizedExpression,
      expectedExpression: sample.expectedExpression,
      validationType: sample.validationType,
      confidence: 1
    });
    return { ...result, separation: result.status === "unsupported" ? "VALIDATOR_NOT_IMPLEMENTED" : "VALIDATOR_AVAILABLE" };
  }

  function beforeRecognition(context) {
    if (context?.mode !== "myscript-pilot") return null;
    if (state.sessionEnded) return { allowed: false, message: "La sesión está cerrada. No actives nuevas peticiones." };
    if (inFlight) return { allowed: false, message: "Ya hay una petición en curso. Espera a que finalice; no repitas la muestra." };
    if (pending) {
      const pendingIndex = corpus.findIndex((sample) => sample.sampleId === pending.sampleId);
      return { allowed: false, message: pendingIndex >= 0 ? `Clasifica primero el reconocimiento pendiente de la muestra ${pendingIndex + 1}.` : "Clasifica primero el reconocimiento pendiente." };
    }
    const existing = finalRecord(context.sampleId);
    if (existing && existing.outcome !== "technical-error") return { allowed: false, message: "Esta muestra ya está clasificada. No se repite automáticamente." };
    if (totalAdditionalRequests() >= MAX_ADDITIONAL_REQUESTS) return { allowed: false, message: "Límite del piloto alcanzado: 70 peticiones adicionales." };
    inFlight = true;
    return { allowed: true };
  }

  function goTo(index) {
    state.currentIndex = normalizedSampleIndex(index);
    saveState();
    void render();
  }

  function goToPending() {
    if (!pending) return;
    const pendingIndex = corpus.findIndex((sample) => sample.sampleId === pending.sampleId);
    if (pendingIndex >= 0) goTo(pendingIndex);
  }

  const CONFIRMED_WRITER1_RECOVERY = Object.freeze({
    "phase2d-01": "5",
    "phase2d-04": "-3,1416",
    "phase2d-07": "\\dfrac{5}{8}=0.625",
    "phase2d-10": "2^3",
    "phase2d-13": "\\sqrt{5}\\approx 2.236",
    "phase2d-16": "\\left(x+1\\right) \\times \\left(x-2\\right)",
    "phase2d-19": "2(x+1)=3x-4",
    "phase2d-22": "x\\in(-\\infty,3)"
  });

  async function recoverConfirmedWriter1Samples() {
    await loadCorpus();
    if (state.recoveryVersion >= 1) return;
    const recoveredAt = new Date().toISOString();
    Object.entries(CONFIRMED_WRITER1_RECOVERY).forEach(([sampleId, recognizedExpression]) => {
      const sample = corpus.find((item) => item.sampleId === sampleId);
      if (!sample || finalRecord(sampleId)) return;
      const validation = validatorResult(sample, recognizedExpression);
      state.records.push({
        sampleId: sample.sampleId,
        sourceSampleId: sample.sourceSampleId,
        sourceLevel: sample.sourceLevel,
        writerId: sample.assignedWriter,
        category: sample.category,
        sourceFamily: sample.family,
        expectedExpression: sample.expectedExpression,
        recognizedExpression,
        latexReturned: recognizedExpression,
        jiixRelevant: null,
        alternatives: [],
        recognitionStatus: "recognized-confirmed-live-session",
        confidence: null,
        latencyMs: null,
        requestCount: 1,
        validatorStatus: validation.status,
        validatorEquivalent: typeof validation.isEquivalent === "boolean" ? validation.isEquivalent : null,
        validatorSeparation: validation.separation,
        reason: "Clasificación recuperada tras una recarga que borró el estado pendiente.",
        outcome: "correct",
        recognitionDecision: "RECOGNITION_OK",
        recordedAt: recoveredAt,
        recovered: true,
        rawRecognitionUnavailable: !["phase2d-07", "phase2d-13", "phase2d-16"].includes(sampleId),
        recoveryEvidence: "confirmed-by-writer-during-live-session"
      });
    });
    state.recoveryVersion = 1;
    saveState();
    void render();
  }

  function evaluatedRecords() {
    return corpus.map((sample) => finalRecord(sample.sampleId)).filter(Boolean);
  }

  function accuracyFor(records) {
    const evaluated = records.filter((record) => !PILOT_PRESENTATION_FAILURES.has(record.sampleId) && ["correct", "incorrect", "ambiguous"].includes(record.outcome));
    const correct = evaluated.filter((record) => record.outcome === "correct").length;
    return { evaluated: evaluated.length, correct, accuracy: evaluated.length ? correct / evaluated.length : null };
  }

  function calculateMetrics() {
    const records = evaluatedRecords();
    const recognitionRecords = records.filter((record) => !PILOT_PRESENTATION_FAILURES.has(record.sampleId));
    const globalAccuracy = accuracyFor(recognitionRecords);
    const basic = accuracyFor(recognitionRecords.filter((record) => record.sourceLevel === "basic"));
    const advanced = accuracyFor(recognitionRecords.filter((record) => record.sourceLevel === "advanced"));
    const latencies = state.records.map((record) => Number(record.latencyMs)).filter(Number.isFinite);
    const completed = records.filter((record) => record.outcome !== "technical-error").length;
    const technical = state.records.filter((record) => record.outcome === "technical-error").length;
    const ambiguous = recognitionRecords.filter((record) => record.outcome === "ambiguous").length;
    const criticalProblems = [...CRITICAL_FAMILIES].filter((family) => {
      const result = accuracyFor(records.filter((record) => record.sourceFamily === family));
      return result.evaluated >= 2 && result.accuracy < 0.75;
    });
    return {
      completed,
      planned: corpus.length,
      attempts: state.records.length,
      additionalRequests: totalAdditionalRequests(),
      global: globalAccuracy,
      basic,
      advanced,
      ambiguous,
      technical,
      ambiguousRate: globalAccuracy.evaluated ? ambiguous / globalAccuracy.evaluated : null,
      technicalRate: state.records.length ? technical / state.records.length : null,
      averageLatency: latencies.length ? latencies.reduce((sum, value) => sum + value, 0) / latencies.length : null,
      maxLatency: latencies.length ? Math.max(...latencies) : null,
      criticalProblems
    };
  }

  function decision(metrics) {
    if (metrics.completed < corpus.length) return "Pendiente: faltan muestras manuscritas reales.";
    const percentage = (metrics.global.accuracy || 0) * 100;
    if (percentage >= 95 && metrics.criticalProblems.length === 0) return "Muy prometedor: puede avanzarse con prudencia.";
    if (percentage >= 90) return "Prometedor, pero necesita ajustes en captura, preprocesado o familias concretas.";
    return "Precisión insuficiente: revisar captura/preprocesado y comparar las familias problemáticas.";
  }

  function recommendation(metrics) {
    if (metrics.completed < corpus.length) return "Pendiente hasta completar las 60 muestras.";
    const percentage = (metrics.global.accuracy || 0) * 100;
    if (percentage >= 95 && metrics.criticalProblems.length === 0) return "A. Continuar con MyScript e integrar el reconocimiento en la siguiente fase controlada.";
    if ((metrics.technicalRate || 0) >= 0.05) return "B. Ajustar captura y preprocesado antes de ampliar.";
    if (percentage >= 60) return "C. Comparar con Mathpix únicamente en las familias problemáticas.";
    return "D. No continuar todavía con ninguno: rediseñar la prueba y revisar la entrada manuscrita.";
  }

  function familyRows() {
    const records = evaluatedRecords();
    return [...new Set(corpus.map((sample) => sample.category))].map((category) => {
      const familyRecords = records.filter((record) => record.category === category && !PILOT_PRESENTATION_FAILURES.has(record.sampleId));
      const result = accuracyFor(familyRecords);
      return `<tr><td>${escapeHtml(familyLabel(category))}</td><td>${familyRecords.length}</td><td>${result.correct}</td><td>${familyRecords.filter((record) => record.outcome === "incorrect").length}</td><td>${familyRecords.filter((record) => record.outcome === "ambiguous").length}</td><td>${state.records.filter((record) => record.category === category && record.outcome === "technical-error").length}</td><td>${result.accuracy === null ? "—" : `${(result.accuracy * 100).toFixed(1)} %`}</td></tr>`;
    }).join("");
  }

  function confusionRows() {
    const counts = new Map();
    evaluatedRecords().filter((record) => !PILOT_PRESENTATION_FAILURES.has(record.sampleId) && record.outcome === "incorrect" && record.recognizedExpression).forEach((record) => {
      const key = `${record.expectedExpression}\u0000${record.recognizedExpression}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    if (!counts.size) return `<tr><td colspan="3">Sin confusiones registradas.</td></tr>`;
    return [...counts.entries()].map(([key, count]) => {
      const [expected, recognized] = key.split("\u0000");
      return `<tr><td>${escapeHtml(expected)}</td><td>${escapeHtml(recognized)}</td><td>${count}</td></tr>`;
    }).join("");
  }

  async function render() {
    if (global.APP_CONFIG?.DEVELOPER_MODE !== true) return global.renderLogin?.();
    try {
      await loadCorpus();
    } catch (error) {
      return global.renderShell(`<section class="phase2c"><h1>No se pudo preparar el piloto</h1><p>${escapeHtml(error.message)}</p><button class="ghost" onclick="renderDeveloperHub()">Volver</button></section>`, false);
    }
    const sample = sampleAt();
    if (!sample) return;
    const renderedSample = renderPilotVisibleExpression(sample.expectedExpression, sample.displayExpression);
    const existing = finalRecord(sample.sampleId);
    const metrics = calculateMetrics();
    const boardHtml = global.MargaritaHandwriting.render({
      exerciseKey: `phase2d-${sample.assignedWriter}-${sample.sampleId}`,
      label: "Abrir pizarra real",
      statementHtml: `<div class="question-text"><strong>Escribe a mano exactamente la expresión objetivo y marca solo la respuesta:</strong> <span class="phase2c-target">${renderedSample}</span></div>`,
      context: {
        courseId: "3eso-evaluation",
        topicId: "myscript-phase2d",
        mode: "myscript-pilot",
        sampleId: sample.sampleId,
        writerId: sample.assignedWriter,
        sourceLevel: sample.sourceLevel,
        family: sample.family,
        category: sample.category,
        correctAnswer: sample.expectedExpression,
        expectedAnswerType: sample.validationType
      }
    });
    global.renderShell(`
      <section class="phase2c" aria-labelledby="phase2d-title">
        <header class="phase2c-header">
          <div><span class="developer-local-badge">Interno · 60 muestras · no puntuable</span><h1 id="phase2d-title">Piloto transversal real de MyScript</h1><p>Solo trazos humanos reales. No se guardan trazos ni datos personales y no se corrige el procedimiento.</p></div>
          <button class="ghost" type="button" onclick="renderDeveloperHub()">Volver al panel</button>
        </header>
        <div class="phase2c-safety"><strong>${escapeHtml(sample.assignedWriter)} · 20 muestras asignadas</strong><span>Adicionales: ${metrics.additionalRequests} / ${MAX_ADDITIONAL_REQUESTS}</span><span>Total conocido: ${totalKnownRequests()} / ${KNOWN_QUOTA}</span><span>Servidor: activar solo durante la sesión real y desactivar al terminar</span></div>
        <section class="phase2c-controls phase2d-controls">
          <label>Muestra<select onchange="MargaritaMyScriptEvaluation.goTo(this.value)">${corpus.map((item, index) => `<option value="${index}" ${index === state.currentIndex ? "selected" : ""}>${index + 1}. ${escapeHtml(familyLabel(item.category))} · ${escapeHtml(item.assignedWriter)}</option>`).join("")}</select></label>
          <div class="phase2c-nav"><button type="button" class="ghost" onclick="MargaritaMyScriptEvaluation.goTo(${state.currentIndex - 1})" ${state.currentIndex === 0 ? "disabled" : ""}>Anterior</button><button type="button" class="ghost" onclick="MargaritaMyScriptEvaluation.goTo(${state.currentIndex + 1})" ${state.currentIndex >= corpus.length - 1 ? "disabled" : ""}>Siguiente</button></div>
        </section>
        ${pending ? `<aside class="phase2c-safety"><strong>Clasificación pendiente</strong><span>La muestra ${Math.max(1, corpus.findIndex((item) => item.sampleId === pending.sampleId) + 1)} tiene un reconocimiento pendiente de clasificar.</span><button type="button" onclick="MargaritaMyScriptEvaluation.goToPending()">Ir a la muestra pendiente</button></aside>` : ""}
        ${state.records.length === 0 && state.recoveryVersion < 1 && state.currentIndex >= 24 ? `<aside class="phase2c-safety"><strong>Recuperación de la sesión</strong><span>Las 8 muestras ya confirmadas se perdieron al recargar la interfaz. Se recuperarán sin llamar de nuevo a MyScript.</span><button type="button" onclick="MargaritaMyScriptEvaluation.recoverConfirmedWriter1Samples()">Recuperar 8 muestras confirmadas</button></aside>` : ""}
        <article class="phase2c-prompt"><span>Muestra ${state.currentIndex + 1} de ${corpus.length}</span><strong>${renderedSample}</strong><small>${escapeHtml(familyLabel(sample.category))} · ${sample.sourceLevel === "basic" ? "básica" : "avanzada"} · ${escapeHtml(sample.assignedWriter)}</small>${existing ? `<em>Estado registrado: ${escapeHtml(existing.outcome)}</em>` : ""}</article>
        ${existing ? `<button class="ghost" type="button" disabled aria-disabled="true">Muestra ya clasificada</button>` : boardHtml}
        <section id="phase2c-classification" class="phase2c-classification" hidden></section>
        <section class="phase2c-metrics">
          <h2>Resumen provisional</h2>
          <div class="phase2c-kpis"><span><strong>${metrics.completed}/60</strong> completadas</span><span><strong>${metrics.global.accuracy === null ? "—" : `${(metrics.global.accuracy * 100).toFixed(1)} %`}</strong> precisión global</span><span><strong>${metrics.ambiguous}</strong> ambiguas</span><span><strong>${metrics.averageLatency === null ? "—" : Math.round(metrics.averageLatency)}</strong> ms media</span></div>
          <p><strong>Básicas:</strong> ${metrics.basic.accuracy === null ? "—" : `${(metrics.basic.accuracy * 100).toFixed(1)} %`} · <strong>Avanzadas:</strong> ${metrics.advanced.accuracy === null ? "—" : `${(metrics.advanced.accuracy * 100).toFixed(1)} %`} · <strong>Máxima latencia:</strong> ${metrics.maxLatency === null ? "—" : `${Math.round(metrics.maxLatency)} ms`}.</p>
          <p class="phase2c-decision">${escapeHtml(decision(metrics))}<br>${escapeHtml(recommendation(metrics))}</p>
          <div class="phase2c-tables"><table><thead><tr><th>Familia</th><th>Evaluadas</th><th>Correctas</th><th>Incorrectas</th><th>Ambiguas</th><th>Técnicas</th><th>Precisión</th></tr></thead><tbody>${familyRows()}</tbody></table><table><thead><tr><th>Objetivo</th><th>Reconocido como</th><th>Veces</th></tr></thead><tbody>${confusionRows()}</tbody></table></div>
          <div class="phase2c-actions"><button class="ghost" type="button" onclick="MargaritaMyScriptEvaluation.copyReport()">Copiar informe JSON</button><button class="ghost" type="button" onclick="MargaritaMyScriptEvaluation.endSession()">Finalizar sesión</button></div>
          <p>Al finalizar, cambia <code>MYSCRIPT_TEST_ENABLED</code> a <code>false</code> en Supabase. La herramienta no cambia secretos del servidor por sí sola.</p>
        </section>
      </section>
    `, false);
    if (pending?.sampleId === sample.sampleId) showPending();
  }

  function showPending() {
    const panel = document.getElementById("phase2c-classification");
    if (!panel || !pending) return;
    const feedbackSlot = document.querySelector(".handwriting-panel:not([hidden]) .handwriting-external-feedback-slot")
      || document.querySelector(".handwriting-external-feedback-slot");
    if (feedbackSlot && panel.parentElement !== feedbackSlot) feedbackSlot.appendChild(panel);
    const renderedExpected = renderPilotVisibleExpression(pending.expectedExpression);
    const renderedRecognized = renderPilotVisibleExpression(pending.recognizedExpression || "Sin expresión");
    panel.hidden = false;
    panel.innerHTML = `
      <h2>Clasificación manual del reconocimiento</h2>
      <p><strong>Objetivo:</strong> <span class="phase2c-rendered-math">${renderedExpected}</span></p>
      <p><strong>Expresión reconocida:</strong> <span class="phase2c-rendered-math">${renderedRecognized}</span></p>
      <details><summary>Ver código LaTeX devuelto</summary><pre class="phase2d-jiix">${escapeHtml(pending.recognizedExpression || "Sin expresión")}</pre></details>
      <p><strong>Estado MyScript:</strong> ${escapeHtml(pending.recognitionStatus)} · <strong>confianza:</strong> ${pending.confidence === null ? "no proporcionada" : escapeHtml(pending.confidence)}</p>
      <p><strong>Separación obligatoria:</strong> RECOGNITION_PENDING_REVIEW · ${escapeHtml(pending.validatorSeparation)}</p>
      <details><summary>JIIX relevante</summary><pre class="phase2d-jiix">${escapeHtml(JSON.stringify(pending.jiixRelevant, null, 2) || "No disponible")}</pre></details>
      <div class="phase2c-outcomes">
        <button type="button" onclick="MargaritaMyScriptEvaluation.classify('correct')">Reconocimiento correcto</button>
        <button type="button" onclick="MargaritaMyScriptEvaluation.classify('incorrect')">Reconocimiento incorrecto</button>
        <button type="button" onclick="MargaritaMyScriptEvaluation.classify('ambiguous')">Ambiguo</button>
        <button type="button" onclick="MargaritaMyScriptEvaluation.classify('technical-error')">Error técnico</button>
      </div>`;
    requestAnimationFrame(() => {
      panel.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    });
  }

  function handleRecognition(event) {
    const detail = event.detail || {};
    if (detail.context?.mode !== "myscript-pilot") return;
    inFlight = false;
    const sample = corpus.find((item) => item.sampleId === detail.context.sampleId);
    if (!sample) return;
    const validation = validatorResult(sample, detail.recognizedExpression);
    pending = {
      sampleId: sample.sampleId,
      sourceSampleId: sample.sourceSampleId,
      sourceLevel: sample.sourceLevel,
      writerId: sample.assignedWriter,
      category: sample.category,
      sourceFamily: sample.family,
      expectedExpression: sample.expectedExpression,
      recognizedExpression: String(detail.recognizedExpression || ""),
      latexReturned: String(detail.recognizedExpression || ""),
      jiixRelevant: compactJiix(detail.rawSemanticResult),
      alternatives: Array.isArray(detail.alternatives) ? detail.alternatives : [],
      recognitionStatus: detail.status,
      confidence: detail.confidence ?? null,
      latencyMs: Number.isFinite(Number(detail.latencyMs)) ? Number(detail.latencyMs) : null,
      requestCount: Number(detail.requestCount) || 0,
      validatorStatus: validation.status,
      validatorEquivalent: typeof validation.isEquivalent === "boolean" ? validation.isEquivalent : null,
      validatorSeparation: validation.separation,
      reason: detail.reason || ""
    };
    state.pending = pending;
    saveState();
    showPending();
  }

  function classify(outcome) {
    if (!pending || !["correct", "incorrect", "ambiguous", "technical-error"].includes(outcome)) return;
    const openHandwritingPanel = document.querySelector(".handwriting-panel:not([hidden])");
    state.records.push(Object.freeze({
      ...pending,
      outcome,
      recognitionDecision: outcome === "correct" ? "RECOGNITION_OK" : outcome === "incorrect" ? "RECOGNITION_FAILED" : outcome.toUpperCase().replace(/-/g, "_"),
      recordedAt: new Date().toISOString()
    }));
    if (outcome !== "technical-error") state.currentIndex = Math.min(corpus.length - 1, state.currentIndex + 1);
    pending = null;
    state.pending = null;
    saveState();
    // La pizarra se mueve temporalmente fuera de #app para ocupar todo el
    // viewport. Si se vuelve a renderizar antes de devolverla a su sitio, la
    // vista antigua queda superpuesta y parece que los botones no funcionan,
    // aunque el resultado ya se haya registrado. Cerrarla primero mantiene la
    // clasificación única y deja visible inmediatamente la muestra siguiente.
    if (openHandwritingPanel && global.MargaritaHandwriting?.close) {
      global.MargaritaHandwriting.close(openHandwritingPanel);
    }
    void render();
  }

  async function copyReport() {
    const metrics = calculateMetrics();
    const report = {
      phase: "2D",
      status: metrics.completed === corpus.length ? "completed" : "in-progress",
      generatedAt: new Date().toISOString(),
      baselineRequests: BASELINE_REQUESTS,
      additionalRequests: totalAdditionalRequests(),
      totalKnownRequests: totalKnownRequests(),
      maxAdditionalRequests: MAX_ADDITIONAL_REQUESTS,
      security: { storesStrokes: false, storesPersonalData: false, scoringConnected: false, progressConnected: false, serverFlagMustBeFalseAtEnd: true },
      metrics,
      decision: decision(metrics),
      recommendation: recommendation(metrics),
      records: state.records
    };
    await global.navigator?.clipboard?.writeText(JSON.stringify(report, null, 2));
    global.alert?.("Informe anónimo copiado. Guárdalo dentro del proyecto de OneDrive.");
  }

  function endSession() {
    state.sessionEnded = true;
    saveState();
    global.alert?.("Sesión cerrada localmente. Confirma ahora en Supabase que MYSCRIPT_TEST_ENABLED está en false.");
    void render();
  }

  global.addEventListener?.("margarita:handwriting-recognized", handleRecognition);
  global.MargaritaMyScriptEvaluation = Object.freeze({
    render,
    goTo,
    goToPending,
    classify,
    copyReport,
    endSession,
    recoverConfirmedWriter1Samples,
    beforeRecognition,
    displayExpression: pilotRenderableExpression,
    renderDisplayExpression: renderPilotVisibleExpression,
    __audit: { loadCorpus, calculateMetrics, totalAdditionalRequests, totalKnownRequests, renderPilotMath, renderPilotVisibleExpression, selection, BASELINE_REQUESTS, MAX_ADDITIONAL_REQUESTS }
  });
})(typeof window !== "undefined" ? window : globalThis);

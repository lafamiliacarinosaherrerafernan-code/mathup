import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function json(value) {
  return JSON.stringify(value);
}

function createContext() {
  const memory = {};
  const dummy = {
    style: {}, dataset: {}, value: "", checked: false, innerHTML: "", textContent: "",
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, removeEventListener() {}, setAttribute() {}, getAttribute() { return ""; },
    querySelector() { return null; }, querySelectorAll() { return []; }, appendChild() {}, remove() {},
    focus() {}, pause() {}, load() {}, scrollIntoView() {}, play() { return Promise.resolve(); }
  };
  const storage = {
    getItem(key) { return Object.hasOwn(memory, key) ? memory[key] : null; },
    setItem(key, value) { memory[key] = String(value); },
    removeItem(key) { delete memory[key]; }
  };
  const document = {
    getElementById() { return dummy; }, querySelector() { return dummy; }, querySelectorAll() { return []; },
    createElement() { return { ...dummy }; }, body: { ...dummy }, documentElement: { ...dummy },
    addEventListener() {}
  };
  const window = {
    addEventListener() {}, removeEventListener() {}, localStorage: storage, sessionStorage: storage,
    __MARGARITA_ENABLE_AUDIT__: true,
    location: { href: "http://localhost/", reload() {} },
    matchMedia() { return { matches: false, addEventListener() {} }; },
    speechSynthesis: { cancel() {}, speak() {} }, open() {}, scrollTo() {}
  };
  const context = {
    console, document, window, localStorage: storage, sessionStorage: storage, location: window.location,
    navigator: { userAgent: "ccss-i-technical-cleanup-audit", clipboard: { writeText() { return Promise.resolve(); } } },
    Audio: function Audio() { return dummy; }, Image: function Image() { return dummy; },
    HTMLElement: function HTMLElement() {}, Node: function Node() {}, URL, URLSearchParams,
    TextEncoder, TextDecoder, Math, Date, JSON, Array, Object, String, Number, Boolean, RegExp,
    Set, Map, WeakMap, Promise, parseInt, parseFloat, isNaN, Intl, crypto: globalThis.crypto,
    performance: { now: () => 0 }, requestAnimationFrame() { return 0; }, cancelAnimationFrame() {},
    setTimeout() { return 0; }, clearTimeout() {}, setInterval() { return 0; }, clearInterval() {},
    alert() {}, confirm() { return true; }, prompt() { return ""; }
  };
  context.globalThis = context;
  vm.createContext(context);
  return context;
}

function evaluateRuntime() {
  const context = createContext();
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+\.js)(?:\?[^"']*)?["']/g)]
    .map((match) => match[1])
    .filter((relative) => fs.existsSync(path.join(root, relative)));
  for (const relative of scripts) {
    vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  }
  vm.runInContext(`
    globalThis.__cleanupAudit = {
      course: courses.find((item) => item.id === "1bach-ccss"),
      infographics: bachInfographics["1bach-ccss"],
      podcasts: window.TOPIC_PODCASTS["1bach-ccss"],
      allPodcasts: window.TOPIC_PODCASTS,
      migration: window.MargaritaCcssIProgressMigration,
      state,
      localPdfFor,
      topicPodcastControlsHtml,
      firstBachBankByTopic,
      firstBachExtensionBankByTopic,
      variety: window.MargaritaFirstBachVariety,
      combinatorics: window.MargaritaCombinatoricsSupplied,
      sourceVerified: window.MargaritaSourceVerified,
      buildQuestions,
      selector: window.MargaritaExerciseSelector,
      coach: window.MargaritaCoach.__audit,
      exam: window.MargaritaFirstBachExamAudit
    };
  `, context);
  return context.__cleanupAudit;
}

const audit = evaluateRuntime();
const studentKey = "2025-2026__1bach-ccss__A__Alumna Prueba";
const baseProgress = {
  unlockedTopics: [0, 1, 9], completedTopics: [0, 9], defeatedBosses: [9],
  xp: 725, coins: 41, bestStreak: 7, correct: 32, errors: 4, totalTime: 912,
  titles: ["Explorador matemático", "Maestro de Combinatoria"]
};

// A. Alumno antiguo con Combinatoria completada.
const migratedA = audit.migration.migrateStore({ [studentKey]: baseProgress });
const progressA = migratedA.store[studentKey];
assert(progressA.unlockedTopics.includes(11) && !progressA.unlockedTopics.includes(9), "A: Combinatoria desbloqueada no se trasladó al tema 12");
assert(progressA.completedTopics.includes(11) && !progressA.completedTopics.includes(9), "A: Combinatoria completada quedó asociada a Derivadas");
assert(progressA.defeatedBosses.includes(11) && !progressA.defeatedBosses.includes(9), "A: el boss de Combinatoria quedó asociado a Derivadas");
for (const field of ["xp", "coins", "bestStreak", "correct", "errors", "totalTime", "titles"]) {
  assert(json(progressA[field]) === json(baseProgress[field]), `A: la migración alteró ${field}`);
}

// B. Alumno antiguo con Combinatoria solo desbloqueada.
const progressBInput = { ...baseProgress, unlockedTopics: [0, 9], completedTopics: [], defeatedBosses: [] };
const progressB = audit.migration.migrateStore({ [studentKey]: progressBInput }).store[studentKey];
assert(json(progressB.unlockedTopics) === json([0, 11]), "B: no se conservó exactamente el desbloqueo de Combinatoria");
assert(progressB.completedTopics.length === 0 && progressB.defeatedBosses.length === 0, "B: se introdujo progreso artificial");

// C. Alumno nuevo, ya creado con el esquema actual.
const progressCInput = {
  ccssITopicSchemaVersion: audit.migration.TOPIC_SCHEMA_VERSION,
  unlockedTopics: [0], completedTopics: [], defeatedBosses: [], xp: 0, coins: 0
};
const migratedC = audit.migration.migrateStore({ [studentKey]: progressCInput });
assert(!migratedC.changed && json(migratedC.store[studentKey]) === json(progressCInput), "C: se introdujo progreso en un alumno nuevo");

// D. Progreso legítimo de Derivadas posterior a la reorganización, identificado
// por su historial estable y no por el ambiguo índice numérico 9.
const derivativeHistoryKey = `${studentKey}|1bach-ccss|topic-derivadas|todos-los-modos`;
const progressDInput = { ...baseProgress, unlockedTopics: [0, 9, 10], completedTopics: [9], defeatedBosses: [9] };
const migratedD = audit.migration.migrateStore(
  { [studentKey]: progressDInput },
  { challengeHistory: { [derivativeHistoryKey]: ["derivative-question"] } }
).store[studentKey];
assert(migratedD.unlockedTopics.includes(9) && !migratedD.unlockedTopics.includes(11), "D: se trasladó progreso legítimo de Derivadas");
assert(migratedD.completedTopics.includes(9) && migratedD.defeatedBosses.includes(9), "D: se perdió progreso legítimo de Derivadas");
assert(migratedD.unlockedTopics.includes(10), "D: se perdió el progreso de Aplicación de derivadas");

// Si existen evidencias de ambos contenidos, deben conservarse ambos.
const combinatoricsHistoryKey = `${studentKey}|1bach-ccss|topic-9|todos-los-modos`;
const migratedBoth = audit.migration.migrateStore(
  { [studentKey]: progressDInput },
  { challengeHistory: { [derivativeHistoryKey]: ["d"], [combinatoricsHistoryKey]: ["c"] } }
).store[studentKey];
assert(migratedBoth.completedTopics.includes(9) && migratedBoth.completedTopics.includes(11), "D: no se conservaron las evidencias de ambos temas");

// E. Idempotencia.
const migratedE = audit.migration.migrateStore(migratedA.store);
assert(!migratedE.changed && json(migratedE.store) === json(migratedA.store), "E: la segunda ejecución volvió a modificar el progreso");

// Audios: en Bachillerato solo existe Master; para los temas 10 y 11 está pendiente.
assert(audit.podcasts.length === 12, "Los audios no están alineados con los 12 temas");
for (const topicIndex of [9, 10]) {
  const podcast = audit.podcasts[topicIndex];
  assert(!podcast.master && !podcast.express, `El tema ${topicIndex + 1} tiene un audio ajeno o un campo Express`);
  audit.state.courseId = "1bach-ccss";
  audit.state.topicIndex = topicIndex;
  const controls = audit.topicPodcastControlsHtml(audit.course);
  assert(/Audio Master pendiente/.test(controls), `El tema ${topicIndex + 1} no informa del estado pendiente`);
  assert(!/<button\b|<audio\b|Express/i.test(controls), `El tema ${topicIndex + 1} muestra controles o Audio Express incorrectos`);
}
assert(Boolean(audit.podcasts[11].master), "Combinatoria perdió su Audio Master propio de CCSS I");
assert(Boolean(audit.allPodcasts["1bach-mates"][8].master) && Boolean(audit.allPodcasts["1bach-mates"][9].master), "La limpieza de CCSS I alteró los audios propios de Matemáticas I");
for (const [courseId, podcasts] of Object.entries(audit.allPodcasts)) {
  if (!courseId.includes("bach")) continue;
  assert(podcasts.every((podcast) => !podcast.express), `${courseId} contiene un Audio Express que no corresponde a Bachillerato`);
}

// Recursos: rutas portables y existentes para los 12 temas; infografías intactas.
assert(audit.course.resources.length === 12 && audit.infographics.length === 12, "Recursos o infografías desalineados");
assert(!/^[A-Za-z]:[\\/]/.test(audit.course.folder) && fs.existsSync(path.join(root, audit.course.folder)), "La carpeta de CCSS I no es portable o no existe");
audit.course.resources.forEach((resource, topicIndex) => {
  assert(!/^[A-Za-z]:[\\/]/.test(resource) && !resource.includes("Escritorio"), `Ruta absoluta antigua en el tema ${topicIndex + 1}`);
  assert(fs.existsSync(path.join(root, resource)), `No existe el recurso del tema ${topicIndex + 1}: ${resource}`);
  assert(audit.localPdfFor(audit.course, topicIndex) === resource, `El tema ${topicIndex + 1} no utiliza su recurso portable`);
});
audit.infographics.forEach((resource, topicIndex) => {
  assert(fs.existsSync(path.join(root, resource)), `No existe la infografía del tema ${topicIndex + 1}: ${resource}`);
});
assert(audit.infographics[9].includes("10-Derivadas"), "Se rompió la infografía de Derivadas");
assert(audit.infographics[10].includes("11-Aplicación"), "Se rompió la infografía de Aplicación de derivadas");
assert(audit.infographics[11].includes("12-Combinatoria"), "Se rompió la infografía de Combinatoria");

const specifications = [
  { index: 0, coachTopic: "statistics", before: 48, originals: 33, after: 81, forbidden: /\bbinomial\b|\bX\s*~?\s*N\s*\(|distribuci[oó]n normal|normal t[ií]pica|intervalo de confianza|estimaci[oó]n|error t[ií]pico/i },
  { index: 2, coachTopic: "binomial", before: 48, originals: 24, after: 72, forbidden: /distribuci[oó]n normal|normal t[ií]pica|intervalo de confianza|estimaci[oó]n|error t[ií]pico/i },
  { index: 3, coachTopic: "normal-distribution", before: 52, originals: 11, after: 63, forbidden: /\bbinomial\b|intervalo de confianza|estimaci[oó]n|error t[ií]pico/i },
  { index: 7, coachTopic: "inequalities", before: 48, originals: 6, after: 54, required: /inecuaci|[<>≤≥]/i }
];

function activePool(topicIndex) {
  const theme = audit.course.themes[topicIndex];
  return [
    ...audit.firstBachBankByTopic("1bach-ccss", topicIndex),
    ...audit.firstBachExtensionBankByTopic("1bach-ccss", topicIndex),
    ...(audit.variety.build("1bach-ccss", theme) || []),
    ...(audit.combinatorics.build("1bach-ccss", theme) || []),
    ...(audit.sourceVerified.build("1bach-ccss", theme) || [])
  ];
}

function assertSemanticContent(question, spec, context) {
  const content = `${question.text || ""} ${question.source || ""}`;
  assert(!spec.forbidden?.test(content), `${context}: contenido contaminado en "${question.text}"`);
  assert(!spec.required || spec.required.test(content), `${context}: ecuación ordinaria en lugar de inecuación: "${question.text}"`);
  assert(audit.selector.exerciseContentMatchesTopic(question, "1bach-ccss", spec.index), `${context}: el clasificador semántico rechazó una pregunta activa`);
}

const contaminationResults = [];
for (const spec of specifications) {
  const theme = audit.course.themes[spec.index];
  const extension = audit.firstBachExtensionBankByTopic("1bach-ccss", spec.index);
  assert(extension.length === spec.originals, `${theme}: número inesperado de originales conectados`);
  assert(extension.every((question) => question.sourceType === "original-ccss-i"), `${theme}: sigue conectado un banco genérico contaminante`);
  const pool = activePool(spec.index);
  assert(pool.length === spec.after, `${theme}: se esperaban ${spec.after} ejercicios activos y hay ${pool.length}`);
  pool.forEach((question) => assertSemanticContent(question, spec, `${theme} · banco`));

  audit.state.courseId = "1bach-ccss";
  audit.state.topicIndex = spec.index;
  audit.state.blockKey = null;
  audit.state.practiceRound = 500 + spec.index;
  audit.state.challengeRoundCache = {};
  audit.state.challengeQuestionHistory = {};
  const practice = audit.buildQuestions(theme, audit.course, 8);
  assert(practice.length === 8, `${theme}: la práctica no genera 8 ejercicios`);
  practice.forEach((question) => assertSemanticContent(question, spec, `${theme} · práctica`));

  const coach = audit.coach.questionsForTopic(audit.course, spec.coachTopic);
  assert(coach.length > 0, `${theme}: la IA no encuentra ejercicios del tema`);
  coach.forEach((question) => assertSemanticContent(question, spec, `${theme} · IA`));

  audit.exam.resetSelectedTopics(audit.course);
  audit.exam.exam.selectedTopics = new Set([spec.index]);
  audit.exam.exam.count = 5;
  audit.state.practiceRound = 700 + spec.index;
  audit.state.challengeRoundCache = {};
  audit.state.challengeQuestionHistory = {};
  const examQuestions = audit.exam.buildExamQuestions();
  assert(examQuestions.length === 5, `${theme}: el examen no genera 5 ejercicios`);
  assert(examQuestions.every((question) => question.topicIndex === spec.index), `${theme}: el examen mezcla índices de temas`);
  examQuestions.forEach((question) => assertSemanticContent(question, spec, `${theme} · examen`));

  contaminationResults.push({ theme, before: spec.before, originalsConnected: spec.originals, after: spec.after, practice: practice.length, coach: coach.length, exam: examQuestions.length });
}

console.log(JSON.stringify({
  ok: true,
  migration: { cases: ["A", "B", "C", "D", "E"], schemaVersion: audit.migration.TOPIC_SCHEMA_VERSION },
  audioPending: [audit.podcasts[9].title, audit.podcasts[10].title],
  resourcesChecked: audit.course.resources.length,
  contaminationResults
}, null, 2));

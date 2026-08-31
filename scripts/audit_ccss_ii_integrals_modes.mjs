import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const memory = {};
const storage = {
  getItem(key) { return Object.hasOwn(memory, key) ? memory[key] : null; },
  setItem(key, value) { memory[key] = String(value); },
  removeItem(key) { delete memory[key]; },
  clear() { Object.keys(memory).forEach((key) => delete memory[key]); }
};
const dummy = {
  style: {}, dataset: {}, value: "", checked: false, innerHTML: "", textContent: "",
  classList: { add() {}, remove() {}, toggle() {} }, addEventListener() {}, removeEventListener() {},
  setAttribute() {}, getAttribute() { return ""; }, querySelector() { return null; }, querySelectorAll() { return []; },
  appendChild() {}, remove() {}, focus() {}, pause() {}, load() {}, scrollIntoView() {}, play() { return Promise.resolve(); }
};
const document = {
  getElementById() { return dummy; }, querySelector() { return dummy; }, querySelectorAll() { return []; },
  createElement() { return { ...dummy }; }, body: { ...dummy }, documentElement: { ...dummy }, addEventListener() {}
};
const alerts = [];
const window = {
  addEventListener() {}, removeEventListener() {}, localStorage: storage, sessionStorage: storage,
  __MARGARITA_ENABLE_AUDIT__: true, location: { href: "http://localhost/", reload() {} },
  matchMedia() { return { matches: false, addEventListener() {} }; }, speechSynthesis: { cancel() {}, speak() {} },
  open() {}, scrollTo() {}
};
const context = {
  console, document, window, localStorage: storage, sessionStorage: storage, location: window.location,
  navigator: { userAgent: "ccss-integrals-audit", clipboard: { writeText() { return Promise.resolve(); } } },
  Audio: function Audio() { return dummy; }, Image: function Image() { return dummy; }, HTMLElement: function HTMLElement() {},
  Node: function Node() {}, URL, URLSearchParams, TextEncoder, TextDecoder, Math, Date, JSON, Array, Object, String,
  Number, Boolean, RegExp, Set, Map, WeakMap, Promise, parseInt, parseFloat, isNaN, Intl, crypto: globalThis.crypto,
  performance: { now: () => 0 }, requestAnimationFrame() { return 0; }, cancelAnimationFrame() {},
  setTimeout() { return 0; }, clearTimeout() {}, setInterval() { return 0; }, clearInterval() {},
  alert(message) { alerts.push(String(message)); }, confirm() { return true; }, prompt() { return ""; }
};
context.globalThis = context;
vm.createContext(context);

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+\.js)(?:\?[^"']*)?["']/g)]
  .map((match) => match[1])
  .filter((relative) => !relative.includes("config.local") && !relative.includes("supabase-client"))
  .filter((relative) => fs.existsSync(path.join(root, relative)));
scripts.forEach((relative) => vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative }));
vm.runInContext(`globalThis.__ccssIntegralAudit = {
  state, courseById, buildQuestions, challengeHistoryIdentity, markChallengeQuestionShown
};`, context);

const app = context.__ccssIntegralAudit;
const availability = window.MargaritaContentAvailability;
const selector = window.MargaritaExerciseSelector;
const bach = window.MargaritaBachExam;
const failures = [];
const cases = [];
function check(condition, name, detail = {}) {
  cases.push({ name, passed: Boolean(condition), ...detail });
  if (!condition) failures.push({ name, ...detail });
}
function prepare(topicIndex, student = "integrals-audit") {
  const course = app.courseById("2bach-ccss");
  storage.clear();
  app.state.student = { id: student, name: student, courseId: course.id, group: "A" };
  app.state.academicYear = "2026-2027";
  app.state.courseId = course.id;
  app.state.topicIndex = topicIndex;
  app.state.blockKey = "";
  app.state.blockTopicIndexes = [];
  app.state.practiceRound = 0;
  app.state.challengeQuestionHistory = {};
  app.state.challengeRoundCache = {};
  return course;
}

const course = prepare(6);
const indefinite = app.buildQuestions(course.themes[6], course, 8);
const advancedPattern = /por partes|fracciones simples|sustituci[oó]n compleja|m[eé]todo especial|trigonom[eé]trica avanzada/i;
check(indefinite.length === 8, "CASO 1: práctica de integrales indefinidas disponible", { count: indefinite.length });
check(indefinite.every((item) => item.integrationMethod === "immediate" && !advancedPattern.test(`${item.text} ${item.solution}`)), "CASO 1: solo integrales inmediatas");
check(indefinite.every((item) => !/PAU\s*-?\s*CCSS II/i.test(item.source || "")), "CASO 1: el banco didáctico no se presenta como PAU CCSS II");

app.state.topicIndex = 7;
const defined = app.buildQuestions(course.themes[7], course, 20);
const crossCourse = window.MargaritaTopicPracticeBanks.build("ccss-ii-integrales-definidas")
  .filter((item) => item.sourceCourseId === "2bach-mates");
check(defined.length > 0, "CASO 2: práctica de integrales definidas disponible", { count: defined.length });
check(crossCourse.length > 0 && crossCourse.every((item) => item.sourceCourseLabel === "PAU Matemáticas II" && item.usedFor === "Práctica por temas CCSS II"), "CASO 2: se conserva la procedencia de Matemáticas II", { crossCourse: crossCourse.length });

const blockPartitionIndefinite = availability.partition(course.id, [6], "examByBlocks");
check(blockPartitionIndefinite.valid.length === 0 && blockPartitionIndefinite.excluded.includes(6), "CASO 3: indefinidas excluidas de Examen por bloques");
const blockPartitionDefinite = availability.partition(course.id, [7], "examByBlocks");
check(blockPartitionDefinite.valid.length === 0 && blockPartitionDefinite.excluded.includes(7), "CASO 4: definidas excluidas de Examen por bloques");

const analysisBlock = bach.buildBlockQuestions(course, "analisis");
check(analysisBlock.every((item) => !(item.topicIndexes || []).some((index) => index === 6 || index === 7)), "CASOS 3-4: el generador por bloques no entrega integrales", { count: analysisBlock.length });

const examPartition = availability.partition(course.id, [6, 7], "exam");
const examAnalysisPool = bach.buildExamSlotPool(course.id, 3, 0);
check(examPartition.valid.length === 0 && examAnalysisPool.every((item) => !(item.topicIndexes || []).some((index) => index === 6 || index === 7)), "CASO 5: el examen excluye indefinidas y definidas", { count: examAnalysisPool.length });

const mixed = availability.partition(course.id, [8, 7], "examByBlocks");
check(mixed.valid.length === 1 && mixed.valid[0] === 8 && mixed.excluded.length === 1 && mixed.excluded[0] === 7, "CASO 6: Probabilidad permanece e Integrales definidas se excluye");
check(availability.warning(course.id, mixed.excluded, "examByBlocks").includes("disponible para practicar por temas"), "CASO 6: se proporciona el aviso específico");

const onlyIntegrals = availability.partition(course.id, [6, 7], "exam");
check(onlyIntegrals.valid.length === 0 && availability.warning(course.id, onlyIntegrals.excluded, "exam").includes("no puede incluirse"), "CASO 7: solo integrales impide generar examen y muestra aviso");

prepare(6, "no-repeat-integrals");
const shown = [];
for (let round = 0; round < 3; round += 1) {
  app.state.practiceRound = round;
  app.state.challengeRoundCache = {};
  const batch = app.buildQuestions(course.themes[6], course, 8);
  batch.forEach((item) => {
    shown.push(app.challengeHistoryIdentity(item));
    app.markChallengeQuestionShown(item);
  });
}
check(shown.length === 24 && new Set(shown).size === 24, "Regla de no repetición: se agotan los 24 ejercicios antes de reiniciar", { shown: shown.length, unique: new Set(shown).size });

check(availability.get("2bach-mates", 10).availableForExam !== false, "Matemáticas II no ha sido modificada");

const result = { scriptsLoaded: scripts.length, cases, failures, passed: failures.length === 0 };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;

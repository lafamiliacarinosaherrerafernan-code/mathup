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
const window = {
  addEventListener() {}, removeEventListener() {}, localStorage: storage, sessionStorage: storage,
  __MARGARITA_ENABLE_AUDIT__: true, location: { href: "http://localhost/", reload() {} },
  matchMedia() { return { matches: false, addEventListener() {} }; }, speechSynthesis: { cancel() {}, speak() {} },
  open() {}, scrollTo() {}
};
const context = {
  console, document, window, localStorage: storage, sessionStorage: storage, location: window.location,
  navigator: { userAgent: "ccss-ii-cross-course-practice-audit", clipboard: { writeText() { return Promise.resolve(); } } },
  Audio: function Audio() { return dummy; }, Image: function Image() { return dummy; }, HTMLElement: function HTMLElement() {},
  Node: function Node() {}, URL, URLSearchParams, TextEncoder, TextDecoder, Math, Date, JSON, Array, Object, String,
  Number, Boolean, RegExp, Set, Map, WeakMap, Promise, parseInt, parseFloat, isNaN, Intl, crypto: globalThis.crypto,
  performance: { now: () => 0 }, requestAnimationFrame() { return 0; }, cancelAnimationFrame() {},
  setTimeout() { return 0; }, clearTimeout() {}, setInterval() { return 0; }, clearInterval() {},
  alert() {}, confirm() { return true; }, prompt() { return ""; }
};
context.globalThis = context;
vm.createContext(context);

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+\.js)(?:\?[^"']*)?["']/g)]
  .map((match) => match[1])
  .filter((relative) => !relative.includes("config.local") && !relative.includes("supabase-client"))
  .filter((relative) => fs.existsSync(path.join(root, relative)));
scripts.forEach((relative) => vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative }));
vm.runInContext(`globalThis.__crossCourseAudit = {
  state, courseById, buildQuestions, challengeHistoryIdentity, markChallengeQuestionShown,
  topicSelectionAudit: window.MargaritaExerciseSelector,
  exam: window.MargaritaBachExam
};`, context);

const app = context.__crossCourseAudit;
const ccss = app.courseById("2bach-ccss");
const mates = app.courseById("2bach-mates");
const failures = [];
const cases = [];

function check(condition, name, detail = {}) {
  const record = { name, passed: Boolean(condition), ...detail };
  cases.push(record);
  if (!condition) failures.push(record);
}

function subtypeCounts(questions) {
  const counts = {};
  questions.forEach((question) => (question.reasoningTypes || []).forEach((type) => {
    counts[type] = (counts[type] || 0) + 1;
  }));
  return counts;
}

function normalizedContent(question) {
  return `${question.text || ""} ${(question.parts || []).map((part) => part.text || part.html || "").join(" ")}`
    .replace(/<[^>]+>/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(?:apartado|ejercicio|propuesta|opcion)\s*[a-z0-9.\-]*/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function resetTopic(course, topicIndex, studentId) {
  storage.clear();
  app.state.student = { id: studentId, name: "Auditoría", courseId: course.id, group: "A" };
  app.state.academicYear = "2026-2027";
  app.state.courseId = course.id;
  app.state.topicIndex = topicIndex;
  app.state.blockKey = "";
  app.state.blockTopicIndexes = [];
  app.state.practiceRound = 0;
  app.state.blockChallengeSeed = 71;
  app.state.challengeQuestionHistory = {};
  app.state.challengeRoundCache = {};
}

const determinantPool = app.exam.buildTopicQuestions(ccss, 1);
const systemPool = app.exam.buildTopicQuestions(ccss, 2);
const reusedDeterminants = determinantPool.filter((question) => question.sourceType === "cross-course-practice");
const reusedSystems = systemPool.filter((question) => question.sourceType === "cross-course-practice");
const originalDeterminants = determinantPool.filter((question) => question.sourceType !== "cross-course-practice");
const originalSystems = systemPool.filter((question) => question.sourceType !== "cross-course-practice");
const determinantCoverage = subtypeCounts(reusedDeterminants);
const systemCoverage = subtypeCounts(reusedSystems);
const determinantCandidates = window.MargaritaCcssIICrossCoursePractice.recordsFor(1);
const discussionWithoutRank = reusedSystems
  .filter((question) => (question.reasoningTypes || []).includes("discusion"))
  .filter((question) => !/rouch|rango/i.test(`${question.solution || ""} ${(question.parts || []).map((part) => part.solution || "").join(" ")}`))
  .map((question) => ({ id: question.id, source: question.source, text: question.text, reasoningTypes: question.reasoningTypes }));

check(reusedDeterminants.length > 0 && reusedSystems.length > 0, "Se incorporan ejercicios compatibles de Matemáticas II", {
  determinants: reusedDeterminants.length, systems: reusedSystems.length
});
check(
  [...reusedDeterminants, ...reusedSystems].every((question) =>
    question.courseId === "2bach-ccss"
    && question.practiceCourseId === "2bach-ccss"
    && question.sourceCourse === "2bach-mates"
    && question.sourceCourseLabel === "Matemáticas II"
    && question.usedFor === "Práctica por temas CCSS II"
    && question.practiceOnly === true
    && question.availableForTopicPractice === true
    && question.availableForExamByBlocks === false
    && question.availableForExam === false
    && /Procedencia:\s*Matemáticas II/.test(question.statementHtml || "")
  ),
  "Metadatos de procedencia, destino y disponibilidad correctos"
);
check(["calculo", "sarrus", "cofactores", "propiedades", "parametros", "rango", "invertibilidad"].every((type) => determinantCoverage[type] > 0),
  "Determinantes cubre cálculo, Sarrus, cofactores, propiedades, parámetros, rango e invertibilidad", { determinantCoverage });
check(["ordinarios", "3x3", "parametros", "discusion", "rouche-frobenius", "contextualizados"].every((type) => systemCoverage[type] > 0),
  "Sistemas cubre ordinarios, 3×3, parámetros, discusión, Rouché–Frobenius y contextualizados", { systemCoverage });
check(
  discussionWithoutRank.length === 0,
  "Las discusiones de sistemas se resuelven mediante rangos/Rouché–Frobenius",
  { discussionWithoutRank }
);

for (const [label, pool, reusedPool] of [
  ["Determinantes", determinantPool, reusedDeterminants],
  ["Sistemas", systemPool, reusedSystems]
]) {
  const keys = pool.map(normalizedContent);
  check(keys.length === new Set(keys).size, `${label}: no hay enunciados duplicados por contenido`, { total: keys.length, unique: new Set(keys).size });
  check(reusedPool.every((question) => (question.options?.length === 4 && Number.isInteger(question.correct) && question.solution)
      || ((question.parts || []).length > 0
        && question.parts.every((part) => part.options?.length === 4 && Number.isInteger(part.correct) && part.solution))),
    `${label}: todos los ejercicios reutilizados tienen opciones, respuesta y solución`);
}

const blockQuestions = app.exam.buildBlockQuestions(ccss, "algebra");
const examSlotQuestions = [1, 2, 3, 4, 5].flatMap((slot) => app.exam.buildExamSlotPool(ccss.id, slot, slot));
check(blockQuestions.every((question) => question.sourceType !== "cross-course-practice"),
  "Los ejercicios reutilizados no entran en Examen por bloques", { count: blockQuestions.length });
check(examSlotQuestions.every((question) => question.sourceType !== "cross-course-practice"),
  "Los ejercicios reutilizados no entran en Examen completo", { count: examSlotQuestions.length });

const sharedStudent = "audit-progress-separated";
resetTopic(ccss, 1, sharedStudent);
const ccssScope = app.topicSelectionAudit.sharedTopicHistoryScope(ccss, 1);
const selectedCcss = app.buildQuestions(ccss.themes[1], ccss, 4);
selectedCcss.forEach(app.markChallengeQuestionShown);
resetTopic(mates, 1, sharedStudent);
const matesScope = app.topicSelectionAudit.sharedTopicHistoryScope(mates, 1);
check(ccssScope !== matesScope && ccssScope.startsWith("2bach-ccss|") && matesScope.startsWith("2bach-mates|"),
  "El historial y progreso quedan separados por curso", { ccssScope, matesScope });

const noRepeatRuns = [];
for (const topicIndex of [1, 2]) {
  resetTopic(ccss, topicIndex, `audit-no-repeat-${topicIndex}`);
  const poolSize = app.exam.buildTopicQuestions(ccss, topicIndex).length;
  const seen = [];
  const firstOccurrences = new Map();
  for (let round = 0; round < Math.ceil(poolSize / 4) + 2; round += 1) {
    app.state.practiceRound = round;
    app.state.challengeRoundCache = {};
    const questions = app.buildQuestions(ccss.themes[topicIndex], ccss, 4);
    questions.forEach((question) => {
      const identity = app.challengeHistoryIdentity(question);
      if (!firstOccurrences.has(identity)) firstOccurrences.set(identity, seen.length);
      seen.push(identity);
      app.markChallengeQuestionShown(question);
    });
  }
  const firstCycle = seen.slice(0, poolSize);
  const clean = firstCycle.length === poolSize && new Set(firstCycle).size === poolSize;
  noRepeatRuns.push({ topicIndex, poolSize, checked: firstCycle.length, unique: new Set(firstCycle).size, clean });
  check(clean, `Tema ${topicIndex + 1}: no repite hasta agotar el banco`, noRepeatRuns.at(-1));
}

const result = {
  generatedAt: new Date().toISOString(),
  scriptsLoaded: scripts.length,
  determinants: {
    originalCcssII: originalDeterminants.length,
    reusedFromMathematicsII: reusedDeterminants.length,
    totalTopicPractice: determinantPool.length,
    coverage: determinantCoverage,
    candidateCoverage: determinantCandidates.reduce((counts, record) => {
      (record.subtypes || []).forEach((type) => { counts[type] = (counts[type] || 0) + 1; });
      return counts;
    }, {})
  },
  systems: {
    originalCcssII: originalSystems.length,
    reusedFromMathematicsII: reusedSystems.length,
    totalTopicPractice: systemPool.length,
    coverage: systemCoverage
  },
  noRepeatRuns,
  cases,
  failures,
  passed: failures.length === 0
};

const outputDir = path.join(root, "documentos", "Inventario variedad retos");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "ampliacion-practica-ccss-ii-desde-mates-ii.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
if (failures.length) throw new Error(`Fallaron ${failures.length} comprobaciones de ampliación CCSS II.`);

export default result;

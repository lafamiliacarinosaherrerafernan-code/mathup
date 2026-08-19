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
  navigator: { userAgent: "ccss-ii-bank-cleanup-audit", clipboard: { writeText() { return Promise.resolve(); } } },
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
vm.runInContext(`globalThis.__ccssBankAudit = {
  state, courseById, buildQuestions, challengeHistoryIdentity, markChallengeQuestionShown,
  BACH_II_BLOCKS, exam: window.MargaritaBachExam
};`, context);

const app = context.__ccssBankAudit;
const course = app.courseById("2bach-ccss");
const classifier = window.MargaritaCcssIITopicClassification;
const availability = window.MargaritaContentAvailability;
const failures = [];
const cases = [];

function check(condition, name, detail = {}) {
  const record = { name, passed: Boolean(condition), ...detail };
  cases.push(record);
  if (!condition) failures.push(record);
}

function resetTopic(topicIndex) {
  storage.clear();
  app.state.student = { id: `audit-ccss-ii-${topicIndex}`, name: "Auditoría CCSS II", courseId: course.id, group: "A" };
  app.state.academicYear = "2026-2027";
  app.state.courseId = course.id;
  app.state.topicIndex = topicIndex;
  app.state.blockKey = "";
  app.state.blockTopicIndexes = [];
  app.state.practiceRound = 0;
  app.state.challengeQuestionHistory = {};
  app.state.challengeRoundCache = {};
}

const topicRuns = [];
for (let topicIndex = 0; topicIndex < course.themes.length; topicIndex += 1) {
  resetTopic(topicIndex);
  let selected = 0;
  let mismatches = 0;
  let emptyRounds = 0;
  const identities = new Set();
  for (let round = 0; round < 30; round += 1) {
    app.state.practiceRound = round;
    app.state.challengeRoundCache = {};
    const batch = app.buildQuestions(course.themes[topicIndex], course, 4);
    if (!batch.length) emptyRounds += 1;
    batch.forEach((question) => {
      selected += 1;
      if (topicIndex !== 6 && topicIndex !== 7 && !(question.topicIndexes || []).includes(topicIndex)) mismatches += 1;
      identities.add(app.challengeHistoryIdentity(question));
      app.markChallengeQuestionShown(question);
    });
  }
  topicRuns.push({ topicIndex, theme: course.themes[topicIndex], rounds: 30, selected, unique: identities.size, mismatches, emptyRounds });
  check(selected > 0 && mismatches === 0 && emptyRounds === 0, `Tema ${topicIndex + 1}: 30 selecciones temáticamente limpias`, { selected, unique: identities.size, mismatches, emptyRounds });
}

const topic10Pool = app.exam.buildTopicQuestions(course, 9);
const inferencePattern = /intervalo de confianza|nivel de confianza|error m[aá]ximo|tama[ñn]o muestral|media muestral|inferencia/i;
check(topic10Pool.length > 0 && topic10Pool.every((question) => !inferencePattern.test(`${question.text || ""} ${question.subtopic || ""}`)), "Tema 10 no contiene inferencia", { count: topic10Pool.length });
const originalTopic10 = topic10Pool.filter((question) => question.sourceType === "didactic-original");
const reusedTopic10 = topic10Pool.filter((question) => question.sourceCourse === "2bach-mates");
check(
  originalTopic10.length === 34
    && originalTopic10.every((question) => question.source === "documentos/2º Bachillerato CCSS II/10-Distribución de probabilidad. Distribución Binomial. Continuas Ejercicios.doc")
    && reusedTopic10.length === 6
    && reusedTopic10.every((question) => question.usedFor === "Práctica por temas CCSS II" && question.availableForExam === false),
  "Tema 10 conserva la procedencia: 34 originales de CCSS II y 6 reutilizados de Matemáticas II solo para práctica",
  { original: originalTopic10.length, reused: reusedTopic10.length }
);

const topic11Pool = app.exam.buildTopicQuestions(course, 10);
check(topic11Pool.length > 0 && topic11Pool.every((question) => (question.topicIndexes || []).includes(10) && !(question.topicIndexes || []).includes(9)), "Tema 11 contiene únicamente apartados de inferencia", { count: topic11Pool.length });

const rawBlocks = window.CCSS_II_BLOCK_EXERCISES || {};
const rawExercises = Object.values(rawBlocks).flat();
const rawParts = rawExercises.flatMap((exercise) => exercise.parts || []);
check(rawExercises.length === 429 && rawParts.length === 1021, "Se conserva íntegro el banco PAU de 429 ejercicios y 1.021 apartados", { exercises: rawExercises.length, parts: rawParts.length });
check(rawParts.every((part) => part.partId && part.exerciseId && Array.isArray(part.topicIndexes) && part.sourceType && part.officialStatus), "Todos los apartados conservan metadatos de identidad, clasificación y procedencia");
check(rawParts.filter((part) => !part.topicIndexes.length).every((part) => part.classificationStatus === "unclassified"), "Los apartados sin tema quedan excluidos explícitamente y no se asignan por comodidad");

const blockCounts = ["algebra", "analisis", "probabilidad", "estadistica"].map((blockId) => ({
  blockId,
  count: app.exam.buildBlockQuestions(course, blockId).length
}));
check(blockCounts.every((entry) => entry.count > 0), "Los cuatro bloques siguen teniendo ejercicios", { blockCounts });

const slotCounts = app.exam.auditExamSlotCounts(course);
check(slotCounts.length === 4 && slotCounts.every((entry) => entry.count > 0), "Los cuatro slots del examen completo siguen operativos", { slotCounts });
check(availability.partition(course.id, [6, 7], "examByBlocks").valid.length === 0, "Las integrales siguen excluidas de Examen por bloques");
check(availability.partition(course.id, [6, 7], "exam").valid.length === 0, "Las integrales siguen excluidas del Examen completo");

const matesExercises = Object.values(window.MATES_II_BLOCK_EXERCISES || {}).flat();
check(matesExercises.every((exercise) => !exercise.classificationVersion), "Matemáticas II no recibe la clasificación de CCSS II");
check(!/^[A-Za-z]:[\\/]/.test(course.folder) && course.resources.every((resource) => !/^[A-Za-z]:[\\/]/.test(resource) && fs.existsSync(path.join(root, resource))), "Las rutas de CCSS II son portables y existen");
check(course.themes.length === 11, "La pantalla conserva los 11 temas de CCSS II sin añadir una modalidad de IA");

const classificationAudit = classifier.audit();
const algebraSharedParts = (rawBlocks.algebra || [])
  .flatMap((exercise) => exercise.parts || [])
  .filter((part) => (part.topicIndexes || []).length > 1);
check(
  algebraSharedParts.length === 3
    && algebraSharedParts.every((part) => part.topicIndexes.length === 2 && part.topicIndexes.includes(0) && part.topicIndexes.includes(1)),
  "Las dobles clasificaciones de Álgebra se limitan a tres apartados inseparables de matriz e invertibilidad",
  { count: algebraSharedParts.length }
);
check(classificationAudit.algebra.unclassified <= 1, "Los apartados algebraicos legibles quedan clasificados por su objetivo real", { unclassified: classificationAudit.algebra.unclassified });
check(classificationAudit.statistics.unclassified === 0 && classificationAudit.statistics.distributionParts === 0, "El banco PAU de Estadística queda exclusivamente en Inferencia", classificationAudit.statistics);
check(classificationAudit.analysis.genuinelyShared === 0, "Límites y Derivadas no conservan dobles etiquetas artificiales", classificationAudit.analysis);
const oldTopicCounts = course.themes.map((theme, topicIndex) => ({ topicIndex, theme, exercises: 0 }));
let reclassifiedParts = 0;
let unthemedResolved = 0;
const reclassifiedByTopic = course.themes.map(() => 0);
const unthemedResolvedByTopic = course.themes.map(() => 0);
Object.entries(rawBlocks).forEach(([blockId, exercises]) => {
  exercises.forEach((exercise) => {
    const oldTopics = app.exam.classifiedPauTopicIndexes(course.id, blockId, exercise);
    oldTopics.forEach((topicIndex) => { if (oldTopicCounts[topicIndex]) oldTopicCounts[topicIndex].exercises += 1; });
    (exercise.parts || []).forEach((part) => {
      const oldKey = [...oldTopics].sort((a, b) => a - b).join(",");
      const newKey = [...(part.topicIndexes || [])].sort((a, b) => a - b).join(",");
      if (oldKey !== newKey) {
        reclassifiedParts += 1;
        (part.topicIndexes || []).forEach((topicIndex) => { reclassifiedByTopic[topicIndex] += 1; });
      }
      if (!oldTopics.length && part.topicIndexes?.length) {
        unthemedResolved += 1;
        (part.topicIndexes || []).forEach((topicIndex) => { unthemedResolvedByTopic[topicIndex] += 1; });
      }
    });
  });
});

const activeCounts = course.themes.map((theme, topicIndex) => {
  if (topicIndex === 6) return window.MargaritaTopicPracticeBanks.build("ccss-ii-integrales-indefinidas-inmediatas").length;
  if (topicIndex === 7) return window.MargaritaTopicPracticeBanks.build("ccss-ii-integrales-definidas").length;
  if (topicIndex === 9) return window.MargaritaTopicPracticeBanks.build("ccss-ii-distribucion-binomial-normal").length;
  return app.exam.buildTopicQuestions(course, topicIndex).length;
});

const result = {
  generatedAt: new Date().toISOString(),
  scriptsLoaded: scripts.length,
  classificationAudit,
  before: oldTopicCounts,
  afterActivePools: course.themes.map((theme, topicIndex) => ({ topicIndex, theme, count: activeCounts[topicIndex] })),
  reclassifiedParts,
  unthemedResolved,
  topicSummary: course.themes.map((theme, topicIndex) => ({
    topicIndex,
    theme,
    before: oldTopicCounts[topicIndex].exercises,
    after: activeCounts[topicIndex],
    reclassifiedParts: reclassifiedByTopic[topicIndex],
    unthemedResolved: unthemedResolvedByTopic[topicIndex],
    remainingContamination: topicRuns[topicIndex].mismatches,
    status: topicRuns[topicIndex].mismatches === 0 && topicRuns[topicIndex].emptyRounds === 0 ? "clean" : "review"
  })),
  topicRuns,
  blockCounts,
  slotCounts,
  cases,
  failures,
  passed: failures.length === 0
};

const outputDir = path.join(root, "documentos", "Inventario variedad retos");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "limpieza-bancos-ccss-ii.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");

console.log(JSON.stringify(result, null, 2));
if (failures.length) throw new Error(`Fallaron ${failures.length} comprobaciones de limpieza de CCSS II.`);

export default result;

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
  navigator: { userAgent: "ccss-ii-exam-modes-audit", clipboard: { writeText() { return Promise.resolve(); } } },
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
vm.runInContext(`globalThis.__examAudit = {
  state, courseById, buildCcssIIBlockQuestions, officialQuestionDedupKey,
  markChallengeQuestionShown,
  exam: window.MargaritaBachExam,
  startExam: window.startBachExam,
  raw: window.CCSS_II_BLOCK_EXERCISES,
  catalog: window.BACH_II_EXAM_CATALOG?.["2bach-ccss"] || []
};`, context);

const app = context.__examAudit;
const course = app.courseById("2bach-ccss");
const failures = [];
const cases = [];
const blockRuns = [];

function check(condition, name, detail = {}) {
  const record = { name, passed: Boolean(condition), ...detail };
  cases.push(record);
  if (!condition) failures.push(record);
}

function reset(topics, blockId, seed = 71) {
  storage.clear();
  app.state.student = { id: `audit-${blockId}-${topics.join("-")}`, name: "Auditoría", courseId: course.id, group: "A" };
  app.state.academicYear = "2026-2027";
  app.state.courseId = course.id;
  app.state.blockKey = blockId;
  app.state.blockTopicIndexes = [...topics];
  app.state.practiceRound = 0;
  app.state.blockChallengeSeed = seed;
  app.state.challengeQuestionHistory = {};
  app.state.challengeRoundCache = {};
}

function selectedTopic(question) {
  if (Number.isInteger(question.selectedBlockTopicIndex)) return question.selectedBlockTopicIndex;
  if (Number.isInteger(question.primaryTopicIndex)) return question.primaryTopicIndex;
  return question.topicIndexes?.length === 1 ? question.topicIndexes[0] : null;
}

function runBlock(name, blockId, topics, expectedDistribution, expectedMaximum = 4) {
  reset(topics, blockId, 71 + blockRuns.length);
  const questions = app.buildCcssIIBlockQuestions(blockId);
  const distribution = Object.fromEntries(topics.map((topic) => [topic, questions.filter((q) => selectedTopic(q) === topic).length]));
  const allowed = new Set(topics);
  const uncontaminated = questions.every((question) => allowed.has(selectedTopic(question)));
  const record = { name, blockId, topics, total: questions.length, distribution, sources: questions.map((q) => q.source) };
  blockRuns.push(record);
  check(uncontaminated, `${name}: no introduce temas no seleccionados`, record);
  check(questions.length <= expectedMaximum, `${name}: respeta el máximo sin relleno artificial`, record);
  Object.entries(expectedDistribution).forEach(([topic, expected]) => {
    check((distribution[topic] || 0) === expected, `${name}: reparto del Tema ${Number(topic) + 1}`, { expected, actual: distribution[topic] || 0 });
  });
  check(questions.every((q) => q.official && q.sourceType !== "legacy-unverified" && q.sourceType !== "cross-course-practice"),
    `${name}: solo usa PAU CCSS II oficial`, record);
}

const officialBlockPools = Object.fromEntries(["algebra", "analisis", "probabilidad", "estadistica"].map((blockId) => [
  blockId,
  app.exam.buildBlockQuestions(course, blockId)
]));
const officialCountsByTopic = Object.fromEntries(course.themes.map((_, topicIndex) => [
  topicIndex,
  Object.values(officialBlockPools).flat().filter((question) => (question.topicIndexes || []).includes(topicIndex)).length
]));

runBlock("Álgebra solo Matrices", "algebra", [0], { 0: Math.min(4, officialCountsByTopic[0]) });
runBlock("Álgebra solo Determinantes", "algebra", [1], { 1: Math.min(4, officialCountsByTopic[1]) });
runBlock("Álgebra Matrices + Sistemas", "algebra", [0, 2], { 0: 2, 2: 2 });
runBlock("Álgebra cuatro temas", "algebra", [0, 1, 2, 3], { 0: 1, 1: 1, 2: 1, 3: 1 });
runBlock("Análisis solo Límites", "analisis", [4], { 4: Math.min(4, officialCountsByTopic[4]) });
runBlock("Análisis solo Derivadas", "analisis", [5], { 5: Math.min(4, officialCountsByTopic[5]) });
runBlock("Análisis Límites + Derivadas", "analisis", [4, 5], { 4: 2, 5: 2 });
runBlock("Análisis integrales excluidas", "analisis", [6, 7], { 6: 0, 7: 0 }, 0);
runBlock("Estadística solo Binomial/Normal", "estadistica", [9], { 9: Math.min(4, officialCountsByTopic[9]) });
runBlock("Estadística solo Inferencia", "estadistica", [10], { 10: Math.min(4, officialCountsByTopic[10]) });
const statsExpected = officialCountsByTopic[9] >= 2 && officialCountsByTopic[10] >= 2 ? { 9: 2, 10: 2 } : {
  9: Math.min(2, officialCountsByTopic[9]), 10: Math.min(2, officialCountsByTopic[10])
};
runBlock("Estadística ambos temas", "estadistica", [9, 10], statsExpected);

const slotPools = [1, 2, 3, 4].map((slot) => ({ slot, questions: app.exam.buildExamSlotPool(course.id, slot, slot) }));
const slotFamilyPools = Object.fromEntries([2, 4].map((slot) => [slot, Object.fromEntries(
  [...new Set(slotPools[slot - 1].questions.map((question) => app.exam.examFamilyForQuestion(slot, question)?.id).filter(Boolean))]
    .map((familyId) => [familyId, app.exam.filterExamSlotPoolByFamily(course.id, slot, slotPools[slot - 1].questions, familyId).length])
)]));
slotPools.forEach(({ slot, questions }) => {
  const allowed = new Set(app.exam.examTopicIndexesForSlot(course.id, slot));
  check(questions.length > 0, `Examen completo: el slot ${slot} tiene banco`);
  check(questions.every((q) => q.official && ["current", "historical"].includes(q.pauEra)), `Examen completo: metadatos official/pauEra en slot ${slot}`);
  check(questions.every((q) => q.topicIndexes?.some((topic) => allowed.has(topic))), `Examen completo: temas correctos en slot ${slot}`);
  check(questions.every((q) => !(q.topicIndexes || []).some((topic) => topic === 6 || topic === 7)), `Examen completo: sin integrales en slot ${slot}`);
  check(questions.every((q) => !["cross-course-practice", "didactic-original", "legacy-unverified"].includes(q.sourceType)),
    `Examen completo: sin bancos prohibidos en slot ${slot}`);
});
check(slotPools[0].questions.every((q) => q.topicIndexes?.includes(0)),
  "Examen completo: Slot 1 contiene siempre Matrices");
check(slotPools[3].questions.every((q) => ["probabilidad", "estadistica"].includes(app.exam.examFamilyForQuestion(4, q)?.id)),
  "Examen completo: Slot 4 conserva separados Probabilidad y Estadística");
const mathsCourse = app.courseById("2bach-mates");
const mathsSlots = app.exam.auditExamSlotCounts(mathsCourse);
check(mathsSlots.length === 5 && mathsSlots.every((slot) => slot.count > 0),
  "Regresión: Matemáticas II conserva sus cinco slots", { mathsSlots });

const selectedTopics = [0, 2, 4, 8, 10];
slotPools.forEach(({ slot }) => {
  const filtered = app.exam.buildFilteredExamSlotPool(course.id, slot, selectedTopics, slot);
  check(filtered.length > 0, `Selección temática: existe pool compatible en slot ${slot}`);
  check(filtered.every((q) => q.topicIndexes.every((topic) => selectedTopics.includes(topic))), `Selección temática: el slot ${slot} respeta la selección`);
});
check(app.exam.buildFilteredExamSlotPool(course.id, 2, [0, 8], 0).length === 0,
  "Selección incompatible: no se rellena el slot de Sistemas/Programación con otro tema");

alerts.length = 0;
app.state.courseId = course.id;
app.startExam([0, 8]);
check(alerts.some((message) => /faltan temas compatibles/i.test(message)),
  "Selección incompatible: el examen completo muestra un aviso claro");
alerts.length = 0;
app.state.courseId = course.id;
app.startExam([0, 2, 4, 8, 10]);
check(app.state.bachExam?.questions?.length === 4, "Selección compatible: genera los cuatro ejercicios del examen");
check(app.state.bachExam?.questions?.every((question) => question.topicIndexes.every((topic) => selectedTopics.includes(topic))),
  "Selección compatible: los cuatro ejercicios respetan los temas elegidos");

reset([0], "algebra", 900);
const firstMatrixRound = app.buildCcssIIBlockQuestions("algebra");
firstMatrixRound.forEach(app.markChallengeQuestionShown);
app.state.practiceRound = 1;
app.state.challengeRoundCache = {};
const secondMatrixRound = app.buildCcssIIBlockQuestions("algebra");
const firstMatrixIds = new Set(firstMatrixRound.map(app.officialQuestionDedupKey));
check(secondMatrixRound.every((question) => !firstMatrixIds.has(app.officialQuestionDedupKey(question))),
  "Examen por bloques: no repite Matrices mientras quedan alternativas");

storage.clear();
app.state.student = { id: "exam-sequence", courseId: course.id, group: "A" };
app.state.courseId = course.id;
const slot2Sequence = [];
const slot4Sequence = [];
for (let simulation = 0; simulation < 50; simulation += 1) {
  app.state.courseId = course.id;
  const seed = `simulation-${simulation}`;
  const slot2Family = app.exam.chooseAlternatingExamFamily(course.id, 2, seed);
  const slot4Family = app.exam.chooseAlternatingExamFamily(course.id, 4, seed);
  const questions = [1, 2, 3, 4].map((slot) => app.exam.chooseWithoutRepeating(
    course.id,
    slot,
    seed,
    null,
    slot === 2 ? slot2Family?.id : slot === 4 ? slot4Family?.id : null
  ));
  slot2Sequence.push(slot2Family?.id || "sin-banco");
  slot4Sequence.push(slot4Family?.id || "sin-banco");
  const identities = questions.filter(Boolean).map(app.officialQuestionDedupKey);
  check(questions.every(Boolean), `Simulación ${simulation + 1}: cuatro slots completos`);
  check(identities.length === new Set(identities).size, `Simulación ${simulation + 1}: sin duplicados exactos`);
  check(questions.every((q) => q.pauEra === "current" || !slotPools[q.slot - 1].questions.some((candidate) => candidate.pauEra === "current")),
    `Simulación ${simulation + 1}: prioriza PAU actual`);
  check(questions[0]?.topicIndexes?.includes(0), `Simulación ${simulation + 1}: E1 es Matrices`);
  check(["sistemas", "programacion-lineal"].includes(app.exam.examFamilyForQuestion(2, questions[1])?.id),
    `Simulación ${simulation + 1}: E2 es Sistemas o Programación lineal`);
  check(questions[2]?.blockId === "analisis", `Simulación ${simulation + 1}: E3 es Análisis`);
  check(["probabilidad", "estadistica"].includes(app.exam.examFamilyForQuestion(4, questions[3])?.id),
    `Simulación ${simulation + 1}: E4 es Probabilidad o Estadística`);
}
check(slot2Sequence.every((family, index) => index === 0 || family !== slot2Sequence[index - 1]),
  "50 simulaciones: Slot 2 alterna Sistemas y Programación lineal", { slot2Sequence });
check(slot4Sequence.every((family, index) => index === 0 || family !== slot4Sequence[index - 1]),
  "50 simulaciones: Slot 4 alterna Probabilidad y Estadística", { slot4Sequence });

const allRaw = Object.values(app.raw || {}).flat();
const sourceText = (exercise) => `${exercise.source || ""} ${(exercise.statement || []).map((p) => p.plain || "").join(" ")} ${(exercise.parts || []).flatMap((p) => p.paragraphs || []).map((p) => p.plain || "").join(" ")}`;
const yearOf = (exercise) => String(exercise.year || exercise.source?.match(/\b(20\d{2})\b/)?.[1] || "");
const currentRaw = allRaw.filter((exercise) => ["2025", "2026"].includes(yearOf(exercise)));
const historicalRaw = allRaw.filter((exercise) => yearOf(exercise) && !["2025", "2026"].includes(yearOf(exercise)));
const scoringMentions = allRaw.filter((exercise) => /\bpuntos?\b/i.test(sourceText(exercise)));
const currentExerciseNumbers = [...new Set(currentRaw.map((exercise) => exercise.source?.match(/Ejercicio\s+(\d+)/i)?.[1]).filter(Boolean))].sort();

const report = {
  generatedAt: new Date().toISOString(),
  scriptsLoaded: scripts.length,
  modelAudit: {
    currentYears: [2025, 2026],
    currentOfficialExercises: currentRaw.length,
    currentExerciseNumbers,
    historicalOfficialExercises: historicalRaw.length,
    implementationSlots: 4,
    structuralFinding: "El examen completo de CCSS II se organiza en cuatro ejercicios: dos de Álgebra, uno de Análisis y uno alternante de Probabilidad o Estadística."
  },
  scoring: {
    exercisesWithAnyPointText: scoringMentions.length,
    totalOfficialExercises: allRaw.length,
    reliablePerPartWeights: false,
    activePolicy: "Puntuación interna igual por apartado",
    pending: "Mapear ponderaciones oficiales cuando estén completas e inequívocas"
  },
  curatedCatalog: {
    entries: app.catalog.length,
    role: "Semilla curada de ejercicios con respuestas/opciones revisadas; no es una whitelist del banco PAU completo",
    preserved: true,
    staleEntriesExcludedFromPools: app.catalog.filter((entry) => {
      const raw = Object.values(app.raw || {}).flat().find((exercise) => exercise.id === entry.id);
      const classified = new Set(raw?.topicIndexes || []);
      return !(entry.topics || []).every((topic) => classified.has(topic));
    }).map((entry) => entry.id)
  },
  officialCountsByTopic,
  blockRuns,
  slotPools: slotPools.map(({ slot, questions }) => ({
    slot,
    total: questions.length,
    current: questions.filter((q) => q.pauEra === "current").length,
    historical: questions.filter((q) => q.pauEra === "historical").length
  })),
  slotFamilyPools,
  slot2Sequence,
  slot4Sequence,
  cases: cases.map(({ name, passed }) => ({ name, passed })),
  failures,
  passed: failures.length === 0
};

fs.writeFileSync(path.join(root, "docs", "auditoria-examenes-ccss-ii.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));

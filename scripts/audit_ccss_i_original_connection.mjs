import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function assert(condition, message) {
  if (!condition) throw new Error(message);
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
    navigator: { userAgent: "ccss-i-original-connection-audit", clipboard: { writeText() { return Promise.resolve(); } } },
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
  scripts.forEach((relative) => {
    vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  });
  vm.runInContext(`
    globalThis.__originalConnectionAudit = {
      course: courses.find((item) => item.id === "1bach-ccss"),
      state,
      buildQuestions,
      firstBachBankByTopic,
      firstBachExtensionBankByTopic,
      selector: window.MargaritaExerciseSelector,
      coach: window.MargaritaCoach.__audit,
      exam: window.MargaritaFirstBachExamAudit,
      original: window.CCSS_I_ORIGINAL_EXERCISE_BANKS,
      originalCombinatorics: window.CCSS_I_ORIGINAL_COMBINATORICS_BANK,
      review: window.CCSS_I_ORIGINAL_REVIEW_QUEUE,
      variety: window.MargaritaFirstBachVariety,
      combinatorics: window.MargaritaCombinatoricsSupplied,
      sourceVerified: window.MargaritaSourceVerified
      ,clearChallengeHistory: () => localStorage.removeItem(CHALLENGE_ANSWER_HISTORY_KEY)
    };
  `, context);
  return context.__originalConnectionAudit;
}

const audit = evaluateRuntime();
const expectedOriginalCounts = [33, 24, 24, 11, 8, 0, 12, 6, 0, 0, 0, 9];
const coachTopics = [
  "statistics", "probability", "binomial", "normal-distribution", "real-numbers", "complex-numbers",
  "equations", "inequalities", "functions", "ccss-derivatives", "derivative-applications", "combinatorics"
];
const contamination = /MasMatTest|intervalo de confianza|error t[ií]pico|estimaci[oó]n estad[ií]stica/i;

function normalizedStatement(question) {
  return String(question?.text || question?.statementHtml || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

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

const results = [];
for (let topicIndex = 0; topicIndex < audit.course.themes.length; topicIndex += 1) {
  const theme = audit.course.themes[topicIndex];
  const original = topicIndex === 11
    ? audit.originalCombinatorics
    : (audit.original[topicIndex] || []);
  assert(original.length === expectedOriginalCounts[topicIndex], `${theme}: número inesperado de originales conectados`);
  original.forEach((question) => {
    assert(question.sourceType === "original-ccss-i", `${theme}: procedencia no conservada`);
    assert(question.sourceDocument?.endsWith(".doc"), `${theme}: documento fuente incompleto`);
    assert(question.sourceExercise && question.subtopic && question.exerciseType && question.structureId, `${theme}: metadatos incompletos`);
    assert(question.solutionNeedsReview === true, `${theme}: solución original ausente no marcada para revisión`);
    assert(Array.isArray(question.options) && question.options.length === 4 && question.correct === 0, `${theme}: opciones incoherentes`);
    assert(!contamination.test(`${question.text} ${question.source}`), `${theme}: contenido ajeno activado`);
  });

  audit.state.courseId = "1bach-ccss";
  audit.state.topicIndex = topicIndex;
  audit.state.blockKey = "";
  audit.state.practiceRound = 1000 + topicIndex * 100;
  audit.state.challengeRoundCache = {};
  audit.state.challengeQuestionHistory = {};
  audit.clearChallengeHistory();
  const practice = [];
  for (let selection = 0; selection < 20; selection += 1) {
    audit.state.practiceRound += 1;
    audit.state.challengeRoundCache = {};
    const question = audit.buildQuestions(theme, audit.course, 1)[0];
    assert(question, `${theme}: la práctica no devuelve ejercicio`);
    assert(audit.selector.exerciseMatchesTopic(question, "1bach-ccss", topicIndex), `${theme}: tema incorrecto en práctica`);
    assert(audit.selector.exerciseContentMatchesTopic(question, "1bach-ccss", topicIndex), `${theme}: contenido incorrecto en práctica`);
    assert(!contamination.test(`${question.text || ""} ${question.source || ""}`), `${theme}: contaminación en práctica`);
    practice.push(question);
    audit.selector.markShown(question);
  }
  assert(new Set(practice.map((question) => question.exerciseId)).size === 20, `${theme}: se repitió antes de agotar el banco`);

  audit.state.challengeQuestionHistory = {};
  audit.clearChallengeHistory();
  const coach = audit.coach.questionsForTopic(audit.course, coachTopics[topicIndex]);
  assert(coach.length >= 20, `${theme}: la IA no dispone de 20 ejercicios`);
  coach.slice(0, 20).forEach((question) => {
    assert(!contamination.test(`${question.text || ""} ${question.source || ""}`), `${theme}: contaminación en IA`);
  });

  audit.state.challengeQuestionHistory = {};
  audit.state.challengeRoundCache = {};
  audit.clearChallengeHistory();
  audit.state.practiceRound = 3000 + topicIndex;
  audit.exam.exam.selectedTopics = new Set([topicIndex]);
  audit.exam.exam.count = 5;
  const exam = audit.exam.buildExamQuestions();
  assert(exam.length === 5, `${theme}: el examen no genera 5 ejercicios`);
  exam.forEach((question) => {
    assert(question.topicIndex === topicIndex, `${theme}: el examen mezcló temas`);
    assert(!contamination.test(`${question.text || ""} ${question.source || ""}`), `${theme}: contaminación en examen`);
  });

  const pool = activePool(topicIndex);
  const uniqueAfter = new Map(pool.filter((question) => normalizedStatement(question)).map((question) => [normalizedStatement(question), question]));
  const before = [...uniqueAfter.values()].filter((question) => question.sourceType !== "original-ccss-i");
  const originalActive = [...uniqueAfter.values()].filter((question) => question.sourceType === "original-ccss-i");
  const structures = (questions) => new Set(questions.map((question) => question.structureId || question.templateId || normalizedStatement(question).replace(/-?\d+(?:[.,]\d+)?/g, "#"))).size;
  const levels = originalActive.reduce((counts, question) => {
    const level = question.difficulty || "unclassified";
    counts[level] = (counts[level] || 0) + 1;
    return counts;
  }, {});
  results.push({
    theme,
    before: before.length,
    connected: originalActive.length,
    after: uniqueAfter.size,
    structuresBefore: structures(before),
    structuresAfter: structures([...uniqueAfter.values()]),
    levels,
    practiceSelections: practice.length,
    coachAvailable: coach.length,
    examQuestions: exam.length
  });
}

assert(audit.review.some((item) => item.topicIndex === 3 && item.reason === "didactic-decision-pending"), "No se conservó como pendiente la aproximación binomial-normal");
assert(audit.review.some((item) => item.topicIndex === 5 && item.reason === "formula-illegible"), "Complejos no quedó en revisión visual");
assert(audit.review.some((item) => item.topicIndex === 8 && item.reason === "formula-illegible"), "Funciones no quedó en revisión visual");

console.log(JSON.stringify({ ok: true, reviewQueue: audit.review.length, results }, null, 2));

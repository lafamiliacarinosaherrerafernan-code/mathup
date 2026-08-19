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
  navigator: { userAgent: "ccss-ii-topic10-audit", clipboard: { writeText() { return Promise.resolve(); } } },
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
vm.runInContext(`globalThis.__topic10Audit = {
  state, courseById, buildQuestions, challengeHistoryIdentity, markChallengeQuestionShown,
  exam: window.MargaritaBachExam,
  availability: window.MargaritaContentAvailability,
  practiceBanks: window.MargaritaTopicPracticeBanks
};`, context);

const app = context.__topic10Audit;
const ccssCourse = app.courseById("2bach-ccss");
const mathsCourse = app.courseById("2bach-mates");
const ccssTopicIndex = ccssCourse.themes.findIndex((theme) => /binomial.*normal/i.test(theme));
const mathsTopicIndex = mathsCourse.themes.findIndex((theme) => /binomial.*normal/i.test(theme));
const ccssPractice = app.exam.buildTopicQuestions(ccssCourse, ccssTopicIndex);
const registeredPractice = app.practiceBanks.build("ccss-ii-distribucion-binomial-normal");
const mathsPractice = mathsTopicIndex >= 0 ? app.exam.buildTopicQuestions(mathsCourse, mathsTopicIndex) : [];

storage.clear();
app.state.student = { id: "audit-topic10-real-route", name: "Auditoría Tema 10", courseId: ccssCourse.id, group: "A" };
app.state.academicYear = "2026-2027";
app.state.courseId = ccssCourse.id;
app.state.topicIndex = ccssTopicIndex;
app.state.blockKey = "";
app.state.blockTopicIndexes = [];
app.state.practiceRound = 0;
app.state.challengeQuestionHistory = {};
app.state.challengeRoundCache = {};
const realRouteQuestions = [];
for (let round = 0; round < 40; round += 1) {
  app.state.practiceRound = round;
  app.state.challengeRoundCache = {};
  const batch = app.buildQuestions(ccssCourse.themes[ccssTopicIndex], ccssCourse, 1);
  if (batch[0]) {
    realRouteQuestions.push(batch[0]);
    app.markChallengeQuestionShown(batch[0]);
  }
}
const realRouteIdentities = new Set(realRouteQuestions.map(app.challengeHistoryIdentity));

function searchable(question) {
  return [
    question.text, question.solution, question.exerciseType, question.structureId, question.subtopic,
    ...(question.parts || []).flatMap((part) => [part.text, part.solution])
  ].filter(Boolean).join(" ").toLowerCase();
}

function category(question) {
  const text = searchable(question);
  if (/de moivre|correcci[oó]n de continuidad|aproximaci[oó]n binomial|np\s*[≥>]=?\s*5|nq\s*[≥>]=?\s*5/.test(text)) return "de-moivre";
  if (/binomial|bernoulli|\bb\s*\(\s*n\s*[,;]/.test(text)) return "binomial";
  if (/normal|tipific|percentil|cuantil|campana de gauss/.test(text)) return "normal";
  return "other";
}

function structureKey(question) {
  return String(question.structureId || question.exerciseType || question.subtopic || question.type || "sin-estructura");
}

function coverage(questions) {
  const texts = questions.map(searchable);
  const has = (expression) => texts.some((text) => expression.test(text));
  return {
    binomial: {
      identification: has(/binomial|bernoulli/),
      exact: has(/binomial-exact|p\s*\(\s*x\s*=|exactamente/),
      cumulative: has(/binomial-(?:cumulative|tail|complement|threshold)|como m[aá]ximo|al menos|m[aá]s de|a lo sumo/),
      complement: has(/binomial-complement|complementari|1\s*[-−]/),
      mean: has(/binomial-mean|media|esperanza/),
      variance: has(/binomial-variance|varianza/),
      standardDeviation: has(/binomial-standard-deviation|desviaci[oó]n t[ií]pica/),
      contextual: questions.some((question) => category(question) === "binomial" && /f[aá]brica|hospital|estudiante|familia|urna|conductor|empresa|examen/.test(searchable(question)))
    },
    normal: {
      probabilities: has(/normal-(?:left-tail|interval|expected-count|probability)|p\s*\(/),
      tails: has(/normal-left-tail|cola|menos de|por debajo|por encima/),
      intervals: has(/normal-interval|entre/),
      symmetry: has(/simetr[ií]a|1\s*[-−]\s*(?:phi|φ|p\s*\()/),
      inverse: has(/normal-inverse|tipificaci[oó]n inversa/),
      percentiles: has(/percentil|cuantil|normal-inverse/),
      contextual: questions.some((question) => category(question) === "normal" && /taller|examen|alumnos|pulsaciones|coeficientes intelectuales/.test(searchable(question)))
    },
    deMoivre: {
      exercises: questions.filter((question) => category(question) === "de-moivre").length,
      checksNpNq: has(/np\s*=.*≥\s*5/) && has(/nq\s*=.*≥\s*5/),
      continuityCorrection: has(/correcci[oó]n de continuidad|0[,.]5/),
      accumulatedTable: has(/φ\s*\(\s*z\s*\)|phi\s*\(\s*z\s*\)|p\s*\(\s*z\s*[≤<]/)
    }
  };
}

const byCategory = Object.fromEntries(["binomial", "normal", "de-moivre", "other"].map((name) => [
  name, ccssPractice.filter((question) => category(question) === name).length
]));
const structures = [...new Set(ccssPractice.map(structureKey))].sort();
const blockStatistics = app.exam.buildBlockQuestions(ccssCourse, "estadistica");
const fullExamStatistics = app.exam.buildExamSlotPool(ccssCourse.id, 4, 0)
  .filter((question) => app.exam.examFamilyForQuestion(4, question)?.id === "estadistica");
const reused = ccssPractice.filter((question) => question.sourceCourse === "2bach-mates");
const deMoivre = ccssPractice.filter((question) => category(question) === "de-moivre");
const deMoivreRequiredTokens = [
  /q\s*=\s*1\s*[−-]\s*p|q\s*=\s*[\d/,]+/i,
  /np\s*=.*≥\s*5/i,
  /nq\s*=.*≥\s*5/i,
  /μ\s*=\s*np/i,
  /σ\s*=\s*√/i,
  /correcci[oó]n de continuidad/i,
  /tipificamos|tipificaci[oó]n/i,
  /Φ\s*\(\s*z\s*\)\s*=\s*P\s*\(\s*Z\s*≤\s*z\s*\)/i
];
const report = {
  generatedAt: new Date().toISOString(),
  courseId: ccssCourse.id,
  topicIndex: ccssTopicIndex,
  topic: ccssCourse.themes[ccssTopicIndex],
  currentBank: {
    total: ccssPractice.length,
    byCategory,
    distinctStructures: structures.length,
    structures,
    coverage: coverage(ccssPractice),
    sources: [...new Set(ccssPractice.map((question) => question.source || question.sourceDocument).filter(Boolean))],
    sourceTypes: [...new Set(ccssPractice.map((question) => question.sourceType).filter(Boolean))]
  },
  realTopicPracticeRoute: {
    registeredBankTotal: registeredPractice.length,
    selectionsRequested: 40,
    selectionsServed: realRouteQuestions.length,
    uniqueBeforeExhaustion: realRouteIdentities.size,
    allHaveOptionsAndSolution: realRouteQuestions.every((question) => question.options?.length === 4 && String(question.solution || "").trim()),
    progressCourseIds: [...new Set(realRouteQuestions.map((question) => question.courseId))],
    topicIndexes: [...new Set(realRouteQuestions.map((question) => question.topicIndex))]
  },
  possibleMathsIISource: {
    topicIndex: mathsTopicIndex,
    total: mathsPractice.length,
    byCategory: Object.fromEntries(["binomial", "normal", "de-moivre", "other"].map((name) => [
      name, mathsPractice.filter((question) => category(question) === name).length
    ])),
    deMoivreCandidates: mathsPractice.filter((question) => category(question) === "de-moivre").map((question) => ({
      id: question.id,
      source: question.source,
      structure: structureKey(question),
      hasVerifiedSolution: Boolean(String(question.solution || question.parts?.[0]?.solution || "").trim())
    }))
  },
  controlledExpansion: {
    required: true,
    reason: "La cobertura de Binomial y Normal era suficiente; De Moivre no tenía ejercicios activos verificables.",
    reusedExercises: reused.length,
    sourceCourse: [...new Set(reused.map((question) => question.sourceCourse))],
    usedFor: [...new Set(reused.map((question) => question.usedFor))],
    structures: [...new Set(reused.map(structureKey))].sort(),
    allSolutionsFollowPolicy: deMoivre.every((question) => deMoivreRequiredTokens.every((token) => token.test(String(question.solution || "")))),
    progressCourseIds: [...new Set(reused.map((question) => question.practiceCourseId || question.courseId))]
  },
  exclusions: {
    topic10InBlockExam: blockStatistics.filter((question) => (question.topicIndexes || []).includes(ccssTopicIndex)).length,
    topic10InFullExam: fullExamStatistics.filter((question) => (question.topicIndexes || []).includes(ccssTopicIndex)).length,
    blockStatisticsTotal: blockStatistics.length,
    fullExamStatisticsTotal: fullExamStatistics.length
  },
  availability: app.availability.get(ccssCourse.id, ccssTopicIndex)
};

const checks = {
  specialBankRegistered: app.practiceBanks.has("ccss-ii-distribucion-binomial-normal"),
  specialBankResolvesExactly40: registeredPractice.length === 40,
  realRouteServes40: realRouteQuestions.length === 40,
  realRouteNoRepeatUntilExhaustion: realRouteIdentities.size === 40,
  realRouteQuestionsComplete: report.realTopicPracticeRoute.allHaveOptionsAndSolution,
  realRouteProgressAssignedToCcssII: report.realTopicPracticeRoute.progressCourseIds.length === 1
    && report.realTopicPracticeRoute.progressCourseIds[0] === "2bach-ccss"
    && report.realTopicPracticeRoute.topicIndexes.length === 1
    && report.realTopicPracticeRoute.topicIndexes[0] === 9,
  topicPracticeAvailable: report.availability.availableForTopicPractice === true,
  examByBlocksUnavailable: report.availability.availableForExamByBlocks === false,
  fullExamUnavailable: report.availability.availableForExam === false,
  deMoivreExpanded: reused.length === 6 && deMoivre.length === 6,
  fourUniqueOptions: reused.every((question) => question.options?.length === 4 && new Set(question.options.map(String)).size === 4),
  exactlyOneCorrectIndex: reused.every((question) => Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 4),
  completeVerifiedSolutions: report.controlledExpansion.allSolutionsFollowPolicy,
  requiredCoverageComplete: Object.values(report.currentBank.coverage.binomial).every(Boolean)
    && Object.values(report.currentBank.coverage.normal).every(Boolean)
    && report.currentBank.coverage.deMoivre.exercises === 6
    && report.currentBank.coverage.deMoivre.checksNpNq
    && report.currentBank.coverage.deMoivre.continuityCorrection
    && report.currentBank.coverage.deMoivre.accumulatedTable,
  provenancePreserved: reused.every((question) => question.sourceCourse === "2bach-mates"
    && question.usedFor === "Práctica por temas CCSS II"
    && question.sourceType === "cross-course-practice"
    && question.officialStatus !== "official"),
  progressAssignedToCcssII: reused.every((question) => (question.practiceCourseId || question.courseId) === "2bach-ccss"),
  practiceOnlyMetadata: reused.every((question) => question.practiceOnly === true
    && question.availableForTopicPractice === true
    && question.availableForExamByBlocks === false
    && question.availableForExam === false),
  absentFromExamByBlocks: report.exclusions.topic10InBlockExam === 0,
  absentFromFullExam: report.exclusions.topic10InFullExam === 0,
  noReusedExerciseInExamByBlocks: !blockStatistics.some((question) => question.sourceCourse === "2bach-mates"),
  noReusedExerciseInFullExam: !fullExamStatistics.some((question) => question.sourceCourse === "2bach-mates")
};
report.tests = checks;

const failedChecks = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name);
if (failedChecks.length) throw new Error(`Auditoría Tema 10 fallida: ${failedChecks.join(", ")}`);

fs.writeFileSync(path.join(root, "docs", "auditoria-practica-tema-10-ccss-ii.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));

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
  style: { setProperty() {} }, dataset: {}, value: "", checked: false, innerHTML: "", textContent: "",
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
  navigator: { userAgent: "eso-p0-audit", clipboard: { writeText() { return Promise.resolve(); } } },
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
vm.runInContext(`globalThis.__esoP0Audit = {
  courses, state, courseById, buildQuestions, buildAdventureTrainingQuestions,
  currentTopicPodcast, bachInfographicFor, localPdfFor, topicHistoryScope,
  challengeHistoryIdentity, markChallengeQuestionShown, renderAdventureResult,
  readGameProgressStore
};`, context);

const audit = context.__esoP0Audit;
const selector = window.MargaritaExerciseSelector;
const examAudit = window.MargaritaEsoExamAudit;
const failures = [];
const check = (condition, label, detail = {}) => { if (!condition) failures.push({ label, ...detail }); };
const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const esoIds = ["1eso", "2eso", "3eso", "4eso-a", "4eso-b"];
const expectedCounts = { "1eso": 10, "2eso": 9, "3eso": 10, "4eso-a": 9, "4eso-b": 14 };

function prepare(courseId, student = "audit-p0") {
  storage.clear();
  const course = audit.courseById(courseId);
  audit.state.student = { id: student, name: student, courseId, group: "A" };
  audit.state.academicYear = "2026-2027";
  audit.state.courseId = courseId;
  audit.state.topicIndex = 0;
  audit.state.blockKey = "";
  audit.state.exerciseSelectionContext = "";
  audit.state.practiceRound = 1;
  audit.state.topicChallengeLevel = "apprentice";
  audit.state.challengeQuestionHistory = {};
  audit.state.challengeRoundCache = {};
  return course;
}

let topicsChecked = 0;
let selectionsChecked = 0;
for (const courseId of esoIds) {
  const course = prepare(courseId, `catalog-${courseId}`);
  check(course.themes.length === expectedCounts[courseId], "catalog-count", { courseId, actual: course.themes.length });
  check(window.ESO_TOPIC_IDS?.[courseId]?.length === expectedCounts[courseId], "semantic-id-count", { courseId });
  for (let topicIndex = 0; topicIndex < course.themes.length; topicIndex += 1) {
    topicsChecked += 1;
    audit.state.topicIndex = topicIndex;
    const semanticId = selector.semanticTopicId(course, topicIndex);
    const content = window.ESO_TOPIC_CONTENT_BY_ID?.[semanticId];
    check(Boolean(content), "semantic-content-missing", { courseId, topicIndex, semanticId });
    check(normalize(content?.title) === normalize(course.themes[topicIndex]), "semantic-title-mismatch", { courseId, topicIndex, catalog: course.themes[topicIndex], content: content?.title });
    check(!content?.contentSourceKeys?.some((key) => !String(key).startsWith(`${courseId}-`)), "legacy-cross-course-summary", { courseId, topicIndex });
    const infographic = audit.bachInfographicFor(course, topicIndex);
    const theory = audit.localPdfFor(course, topicIndex);
    check(Boolean(infographic), "infographic-missing", { courseId, topicIndex });
    check(Boolean(theory), "theory-missing", { courseId, topicIndex });
    const podcast = audit.currentTopicPodcast();
    check(Boolean(podcast), "podcast-missing-or-misaligned", { courseId, topicIndex });
    if (podcast && !(courseId === "1eso" && topicIndex === 3)) {
      check(normalize(podcast.title) === normalize(course.themes[topicIndex]), "podcast-title-mismatch", { courseId, topicIndex, title: podcast.title });
    }

    for (let round = 0; round < 30; round += 1) {
      audit.state.practiceRound = round + 1;
      audit.state.challengeRoundCache = {};
      audit.state.exerciseSelectionContext = "";
      audit.state.topicChallengeLevel = round % 2 ? "master" : "apprentice";
      const questions = audit.buildQuestions(course.themes[topicIndex], course, 8);
      check(questions.length > 0, "topic-selection-empty", { courseId, topicIndex, round });
      check(questions.every((question) => selector.exerciseMatchesTopic(question, courseId, topicIndex)), "topic-contamination", { courseId, topicIndex, round });
      check(questions.every((question) => selector.exerciseContentMatchesTopic(question, courseId, topicIndex)), "content-contamination", { courseId, topicIndex, round });
      questions.forEach(audit.markChallengeQuestionShown);
      selectionsChecked += 1;
    }
    for (const difficulty of ["easy", "medium", "hard"]) {
      audit.state.challengeRoundCache = {};
      const adventureQuestions = audit.buildAdventureTrainingQuestions(course.themes[topicIndex], course, difficulty, 71 + topicIndex, 8);
      check(adventureQuestions.every((question) => selector.exerciseMatchesTopic(question, courseId, topicIndex)), "adventure-topic-contamination", { courseId, topicIndex, difficulty });
    }
    audit.state.exerciseSelectionContext = "boss";
    audit.state.challengeRoundCache = {};
    const bossQuestions = audit.buildQuestions(course.themes[topicIndex], course, 8);
    check(bossQuestions.every((question) => selector.exerciseMatchesTopic(question, courseId, topicIndex)), "boss-topic-contamination", { courseId, topicIndex });
    examAudit.exam.count = 8;
    examAudit.exam.selectedTopics = new Set([topicIndex]);
    const examQuestions = examAudit.buildExamQuestions();
    check(examQuestions.every((question) => question.topicIndex === topicIndex && selector.exerciseMatchesTopic(question, courseId, topicIndex)), "exam-topic-contamination", { courseId, topicIndex });
  }
}

const activeRawTopics = new Map();
for (const courseId of esoIds) {
  const course = audit.courseById(courseId);
  course.themes.forEach((theme, topicIndex) => {
    const topicId = selector.semanticTopicId(course, topicIndex);
    (window.MargaritaEsoExamVerified?.build?.(courseId, theme) || []).forEach((question) => {
      const rawId = question.rawBaseId || question.id;
      if (!rawId) return;
      if (!activeRawTopics.has(rawId)) activeRawTopics.set(rawId, new Set());
      activeRawTopics.get(rawId).add(topicId);
    });
  });
}
const incompatibleDuplicates = [...activeRawTopics.entries()]
  .filter(([, topicIds]) => topicIds.size > 1)
  .map(([rawId, topicIds]) => ({ rawId, topicIds: [...topicIds] }));
check(incompatibleDuplicates.length === 0, "active-exercise-in-incompatible-topics", { incompatibleDuplicates });

const examProfiles = [];
for (const courseId of esoIds) {
  const course = prepare(courseId, `exam-${courseId}`);
  for (const topicIndex of [0, course.themes.length - 1]) {
    examAudit.exam.count = 8;
    examAudit.exam.selectedTopics = new Set([topicIndex]);
    const pools = {};
    for (const prior of ["apprentice", "master", "adventure", "coach"]) {
      audit.state.topicChallengeLevel = prior === "master" ? "master" : "apprentice";
      audit.state.exerciseSelectionContext = prior === "adventure" || prior === "coach" ? prior : "";
      audit.state.practiceRound = 17;
      audit.state.challengeQuestionHistory = {};
      audit.state.challengeRoundCache = {};
      storage.removeItem("margarita-challenge-answer-history-v2");
      pools[prior] = examAudit.buildExamQuestions().map(audit.challengeHistoryIdentity).sort();
    }
    check(["master", "adventure", "coach"].every((prior) => JSON.stringify(pools.apprentice) === JSON.stringify(pools[prior])), "exam-inherits-previous-mode", { courseId, topicIndex });
    examProfiles.push({ courseId, topicIndex, size: pools.apprentice.length });
  }
}

const historyCourse = prepare("2eso", "history-p0");
const historyTopic = 2;
const tinyBank = Array.from({ length: 6 }, (_, index) => ({
  id: `history-${index}`, text: `Calcula la fracción modelo ${index + 1}.`, options: ["1", "2", "3", "4"], correct: 0, solution: "Resultado final: 1."
}));
const histories = {};
for (const mode of ["topicPractice", "adventure", "coach", "exam", "boss"]) {
  audit.state.practiceRound += 1;
  audit.state.challengeRoundCache = {};
  const selected = selector.strictTopicSelection({ course: historyCourse, topicIndex: historyTopic, questions: tinyBank, count: 1, sourceType: "audit", historyMode: mode })[0];
  audit.markChallengeQuestionShown(selected);
  histories[mode] = selected._historyScopeKey;
}
check(new Set(Object.values(histories)).size === 5, "history-scopes-not-separated", { histories });
check(Object.values(histories).every((scope) => !scope.includes("todos-los-modos")), "new-history-uses-legacy-scope", { histories });

function simulateAdventure(mode) {
  const course = prepare("1eso", `boss-${mode}`);
  audit.state.topicIndex = 0;
  audit.state.adventure = {
    topicIndex: 0, mode, difficulty: mode === "train" ? "easy" : "", score: 0, streak: 7,
    bossHp: mode === "boss" ? 0 : 0, energy: 100, startedAt: Date.now() - 1000,
    answers: Array.from({ length: 8 }, (_, index) => ({ correct: index < 7, question: `q${index}`, solution: "s" }))
  };
  audit.renderAdventureResult();
  const store = audit.readGameProgressStore();
  return Object.values(store)[0] || {};
}
const trainingProgress = simulateAdventure("train");
check(!(trainingProgress.unlockedTopics || []).includes(1), "training-unlocks-next-zone", { trainingProgress });
check(!(trainingProgress.completedTopics || []).includes(0), "training-completes-topic", { trainingProgress });
const bossProgress = simulateAdventure("boss");
check((bossProgress.unlockedTopics || []).includes(1), "boss-does-not-unlock-next-zone", { bossProgress });
check((bossProgress.defeatedBosses || []).includes(0), "boss-not-recorded", { bossProgress });

const result = {
  scriptsLoaded: scripts.length,
  coursesChecked: esoIds.length,
  topicsChecked,
  selectionsChecked,
  examProfiles,
  historyScopes: histories,
  failures,
  passed: failures.length === 0
};
console.log(JSON.stringify(result, null, 2));

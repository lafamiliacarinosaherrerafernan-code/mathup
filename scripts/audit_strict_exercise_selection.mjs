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
  navigator: { userAgent: "strict-selection-audit", clipboard: { writeText() { return Promise.resolve(); } } },
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
vm.runInContext(`globalThis.__strictAudit = {
  courses, state, courseById, buildQuestions, challengeHistoryIdentity, markChallengeQuestionShown, questionHasCoherentOptions
};`, context);

const audit = context.__strictAudit;
const selector = window.MargaritaExerciseSelector;
const failures = [];
const check = (condition, label, detail = {}) => { if (!condition) failures.push({ label, ...detail }); };

function prepare(courseId, student = "audit") {
  const course = audit.courseById(courseId);
  audit.state.student = { id: student, name: student, courseId, group: "A" };
  audit.state.academicYear = "2026-2027";
  audit.state.courseId = courseId;
  audit.state.blockKey = "";
  audit.state.practiceRound += 1;
  audit.state.topicChallengeLevel = "master";
  audit.state.challengeQuestionHistory = {};
  audit.state.challengeRoundCache = {};
  storage.clear();
  return course;
}

let checkedTopics = 0;
for (const course of audit.courses) {
  prepare(course.id, `all-${course.id}`);
  for (let topicIndex = 0; topicIndex < course.themes.length; topicIndex += 1) {
    audit.state.topicIndex = topicIndex;
    audit.state.challengeRoundCache = {};
    const count = course.id === "2bach-mates" ? 5 : course.id === "2bach-ccss" ? 4 : 8;
    const questions = audit.buildQuestions(course.themes[topicIndex], course, count);
    checkedTopics += 1;
    check(questions.every((question) => selector.exerciseMatchesTopic(question, course.id, topicIndex)), "topic-filter", { course: course.id, topicIndex });
    check(questions.every((question) => question.exerciseId && question.templateId), "stable-metadata", { course: course.id, topicIndex });
    check(questions.every(audit.questionHasCoherentOptions), "coherent-question", { course: course.id, topicIndex });
    check(new Set(questions.map(audit.challengeHistoryIdentity)).size === questions.length, "duplicate-within-round", { course: course.id, topicIndex });
  }
}

const esoCourse = prepare("2eso", "exam-eso");
const esoExam = window.MargaritaEsoExamAudit;
esoExam.exam.count = 8;
esoExam.exam.selectedTopics = new Set([2]);
const fractions = esoExam.buildExamQuestions();
check(fractions.length === 8 && fractions.every((question) => question.topicIndex === 2), "case-2eso-fractions", { count: fractions.length });

audit.state.practiceRound += 1;
audit.state.challengeRoundCache = {};
esoExam.exam.count = 7;
esoExam.exam.selectedTopics = new Set([1, 2, 5]);
const multiEso = esoExam.buildExamQuestions();
const multiDistribution = multiEso.reduce((result, question) => ({ ...result, [question.topicIndex]: (result[question.topicIndex] || 0) + 1 }), {});
check(multiEso.length === 7 && multiEso.every((question) => [1, 2, 5].includes(question.topicIndex)), "case-multiple-topics", { multiDistribution });
check(Math.max(...Object.values(multiDistribution)) - Math.min(...Object.values(multiDistribution)) <= 1, "balanced-multiple-topics", { multiDistribution });

const firstBach = prepare("1bach-mates", "exam-trig");
const firstExam = window.MargaritaFirstBachExamAudit;
firstExam.exam.count = 8;
firstExam.exam.selectedTopics = new Set([3]);
const trigonometry = firstExam.buildExamQuestions();
check(trigonometry.length === 8 && trigonometry.every((question) => question.topicIndex === 3), "case-first-bach-trigonometry", { count: trigonometry.length });

const pauCourse = prepare("2bach-mates", "pau-two-topics");
const pauPools = new Map();
for (const topicIndex of [0, 1]) {
  audit.state.topicIndex = topicIndex;
  audit.state.challengeRoundCache = {};
  pauPools.set(topicIndex, audit.buildQuestions(pauCourse.themes[topicIndex], pauCourse, 10));
}
const pauQuestions = selector.distributeBalancedTopicQuestions(pauPools, [0, 1], 10);
check(pauQuestions.length === 10 && pauQuestions.every((question) => [0, 1].includes(question.topicIndex)), "case-pau-two-topics", { count: pauQuestions.length });
check(pauQuestions.every((question) => /\b20\d{2}\b/.test(question.source || "") && /junio|julio|septiembre|reserva/i.test(question.source || "")), "pau-provenance");
check(pauQuestions.every((question) => question.type === "corrected-official-exercise"), "pau-no-invented-exercises");

const repeatCourse = prepare("2eso", "repeat-cycle");
audit.state.topicIndex = 2;
const tinyBank = Array.from({ length: 5 }, (_, index) => ({
  id: `tiny-${index}`, text: `Fracción modelo ${index + 1}`, options: ["1", "2", "3", "4"], correct: 0, solution: "Resultado final: 1."
}));
const sequence = [];
for (let round = 1; round <= 6; round += 1) {
  audit.state.practiceRound = round;
  audit.state.challengeRoundCache = {};
  const question = selector.strictTopicSelection({ course: repeatCourse, topicIndex: 2, questions: tinyBank, count: 1, sourceType: "test" })[0];
  sequence.push(question.exerciseId);
  audit.markChallengeQuestionShown(question);
}
check(new Set(sequence.slice(0, 5)).size === 5, "no-repeat-before-exhaustion", { sequence });
check(sequence.slice(0, 5).includes(sequence[5]), "restart-after-exhaustion", { sequence });
check(Boolean(memory["margarita-challenge-answer-history-v2"]), "history-persists-in-storage");

for (const course of audit.courses.filter((item) => !item.id.startsWith("2bach"))) {
  prepare(course.id, `coach-${course.id}`);
  for (const topic of window.MARGARITA_COACH_DATA.coursePriorities[course.id] || []) {
    const questions = window.MargaritaCoach.__audit.questionsForTopic(course, topic);
    check(questions.length > 0, "coach-topic-empty", { course: course.id, topic });
    check(questions.every((question) => question.courseId === course.id && question.topicId && question.exerciseId && question.templateId), "coach-metadata", { course: course.id, topic });
  }
}

const result = {
  scriptsLoaded: scripts.length,
  topicsChecked: checkedTopics,
  mandatoryCases: 8,
  failures,
  passed: failures.length === 0
};
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;

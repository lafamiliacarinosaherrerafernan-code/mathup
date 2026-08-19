import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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
    navigator: { userAgent: "ccss-i-topic-audit", clipboard: { writeText() { return Promise.resolve(); } } },
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
    globalThis.__ccssAudit = {
      course: courses.find((item) => item.id === "1bach-ccss"),
      infographics: bachInfographics["1bach-ccss"],
      podcasts: window.TOPIC_PODCASTS["1bach-ccss"],
      explanations: window.TOPIC_BOOK_EXPLANATIONS,
      state,
      firstBachBankByTopic,
      firstBachExtensionBankByTopic,
      buildQuestions,
      sharedTopicHistoryScope,
      selector: window.MargaritaExerciseSelector,
      coachAudit: window.MargaritaCoach?.__audit,
      firstBachExamAudit: window.MargaritaFirstBachExamAudit
    };
  `, context);
  return context.__ccssAudit;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const audit = evaluateRuntime();
const expectedTail = ["Funciones", "Derivadas", "Aplicacion de derivadas", "Combinatoria"];
assert(JSON.stringify(audit.course.themes.slice(8)) === JSON.stringify(expectedTail), "Orden final de temas incorrecto");
assert(audit.course.themes.length === 12, "CCSS I debe tener exactamente 12 temas");
assert(audit.course.resources.length === 12, "Los recursos deben permanecer alineados con los 12 temas");
assert(audit.infographics.length === 12, "Las infografías deben permanecer alineadas con los 12 temas");
assert(audit.infographics[9].includes("10-Derivadas"), "Falta la infografía del tema 10");
assert(audit.infographics[10].includes("11-Aplicación"), "Falta la infografía del tema 11");
assert(audit.infographics[11].includes("12-Combinatoria"), "Falta la infografía del tema 12");
assert(audit.podcasts.length === 12, "Los audios no permanecen alineados con los 12 temas");
assert(!audit.podcasts[9].master && !audit.podcasts[9].express, "Derivadas CCSS I no debe reutilizar audios de otra materia");
assert(!audit.podcasts[10].master && !audit.podcasts[10].express, "Aplicación de derivadas CCSS I no debe reutilizar audios de otra materia");
assert(Boolean(audit.podcasts[11].master), "Combinatoria debe conservar su Audio Master propio de CCSS I");
assert(!audit.explanations["1bach-ccss-9"], "La explicación antigua de Combinatoria se muestra bajo Derivadas");
assert(Boolean(audit.explanations["1bach-ccss-11"]), "No se conservó la explicación de Combinatoria");

const legacyScope = "1bach-ccss|topic-9|todos-los-modos";
assert(audit.sharedTopicHistoryScope(audit.course, 11) === legacyScope, "Combinatoria no conserva su historial anterior");
assert(audit.sharedTopicHistoryScope(audit.course, 9) !== legacyScope, "Derivadas reutiliza erróneamente el historial de Combinatoria");
assert(audit.sharedTopicHistoryScope(audit.course, 9) !== audit.sharedTopicHistoryScope(audit.course, 10), "Los nuevos temas comparten historial");

const topicResults = [];
for (const topicIndex of [9, 10, 11]) {
  const base = audit.firstBachBankByTopic("1bach-ccss", topicIndex);
  const extension = audit.firstBachExtensionBankByTopic("1bach-ccss", topicIndex);
  const pool = [...base, ...extension];
  assert(pool.length >= 8, `Banco insuficiente en ${audit.course.themes[topicIndex]}`);
  if (topicIndex < 11) {
    const forbidden = pool.filter((question) => /l['’]?h[oô]pital|matem[aá]ticas ii|ccss ii|2[.ºº]\s*bach/i.test(`${question.text || ""} ${question.solution || ""} ${question.source || ""}`));
    assert(forbidden.length === 0, `Contenido de otro nivel en ${audit.course.themes[topicIndex]}`);
  }

  audit.state.courseId = "1bach-ccss";
  audit.state.topicIndex = topicIndex;
  audit.state.blockKey = null;
  audit.state.practiceRound = topicIndex;
  audit.state.challengeRoundCache = {};
  audit.state.challengeQuestionHistory = {};
  const practice = audit.buildQuestions(audit.course.themes[topicIndex], audit.course, 8);
  assert(practice.length === 8, `La práctica de ${audit.course.themes[topicIndex]} no genera 8 preguntas`);
  assert(practice.every((question) => question.topicIndex === topicIndex), `La práctica mezcla temas en ${audit.course.themes[topicIndex]}`);

  audit.state.challengeRoundCache = {};
  audit.state.challengeQuestionHistory = {};
  const seenBeforeExhaustion = new Set();
  for (let round = 0; round < 3; round += 1) {
    audit.state.practiceRound = 100 + topicIndex * 10 + round;
    audit.state.challengeRoundCache = {};
    const roundQuestions = audit.buildQuestions(audit.course.themes[topicIndex], audit.course, 8);
    assert(roundQuestions.length === 8, `Ronda incompleta antes de agotar ${audit.course.themes[topicIndex]}`);
    for (const question of roundQuestions) {
      assert(!seenBeforeExhaustion.has(question._historyIdentity), `Ejercicio repetido antes de agotar ${audit.course.themes[topicIndex]}`);
      seenBeforeExhaustion.add(question._historyIdentity);
      audit.selector.markShown(question);
    }
  }

  const coachTopic = topicIndex === 9 ? "ccss-derivatives" : topicIndex === 10 ? "derivative-applications" : "combinatorics";
  const coach = audit.coachAudit.questionsForTopic(audit.course, coachTopic);
  assert(coach.length > 0, `El entrenador no reconoce ${audit.course.themes[topicIndex]}`);
  assert(coach.every((question) => question.topic === coachTopic), `El entrenador mezcla temas en ${audit.course.themes[topicIndex]}`);
  topicResults.push({ theme: audit.course.themes[topicIndex], pool: pool.length, practice: practice.length, noRepeatChecked: seenBeforeExhaustion.size, coach: coach.length });
}

assert(audit.firstBachExamAudit, "No está disponible la auditoría del examen de 1.º de Bachillerato");
audit.firstBachExamAudit.resetSelectedTopics(audit.course);
audit.firstBachExamAudit.exam.selectedTopics = new Set([9, 10, 11]);
audit.firstBachExamAudit.exam.count = 5;
const examQuestions = audit.firstBachExamAudit.buildExamQuestions();
assert(examQuestions.length === 5, "El examen no genera la cantidad solicitada con los temas nuevos");
assert(examQuestions.every((question) => [9, 10, 11].includes(question.topicIndex)), "El examen introduce temas no seleccionados");
const examDistribution = Object.fromEntries([9, 10, 11].map((topicIndex) => [topicIndex, examQuestions.filter((question) => question.topicIndex === topicIndex).length]));
assert(Object.values(examDistribution).sort().join(",") === "1,2,2", "El examen no distribuye equilibradamente 5 preguntas entre 3 temas");

console.log(JSON.stringify({ ok: true, themes: audit.course.themes, topicResults, examDistribution }, null, 2));

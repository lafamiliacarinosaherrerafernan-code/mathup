import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "documentos", "Inventario variedad retos");

function browserContext() {
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
    removeItem(key) { delete memory[key]; },
    clear() { Object.keys(memory).forEach((key) => delete memory[key]); }
  };
  const document = {
    getElementById() { return dummy; }, querySelector() { return dummy; }, querySelectorAll() { return []; },
    createElement() { return { ...dummy }; }, body: { ...dummy }, documentElement: { ...dummy }, addEventListener() {}
  };
  const window = {
    addEventListener() {}, removeEventListener() {}, localStorage: storage, sessionStorage: storage,
    location: { href: "http://localhost/", reload() {} }, matchMedia() { return { matches: false, addEventListener() {} }; },
    speechSynthesis: { cancel() {}, speak() {} }, open() {}, scrollTo() {}
  };
  const context = {
    console, document, window, localStorage: storage, sessionStorage: storage, location: window.location,
    navigator: { userAgent: "runtime-audit", clipboard: { writeText() { return Promise.resolve(); } } },
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

function evaluateApp() {
  const context = browserContext();
  const suppliedBank = path.join(projectRoot, "data", "mates-i-supplied-banks.js");
  if (fs.existsSync(suppliedBank)) vm.runInContext(fs.readFileSync(suppliedBank, "utf8"), context, { filename: suppliedBank });
  const varietyBank = path.join(projectRoot, "data", "first-bach-variety-banks.js");
  if (fs.existsSync(varietyBank)) vm.runInContext(fs.readFileSync(varietyBank, "utf8"), context, { filename: varietyBank });
  vm.runInContext(fs.readFileSync(path.join(projectRoot, "app.js"), "utf8"), context, { filename: "app.js" });
  vm.runInContext(`
    globalThis.__audit = {
      courses, state, generatedEsoDifficultyQuestion, challengeQuestionIdentity, challengeHistoryIdentity,
      questionHasCoherentOptions, pickExerciseBank, matesIRepeatBank, matesIExtensionBank, ccssIExtensionBank,
      buildEsoTopicLevelQuestions, buildQuestions, markChallengeQuestionAnswered, questionsPerChallengeFor,
      varietyBuilder: window.MargaritaFirstBachVariety?.build || null
    };
  `, context);
  return context.__audit;
}

function structureIdentity(question) {
  return String(question?.text || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/-?\d+(?:[.,]\d+)?/g, "#")
    .replace(/\s+/g, " ").trim();
}

function uniqueQuestions(questions, identity) {
  const seen = new Set();
  return (questions || []).filter((question) => {
    const key = identity(question);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const audit = evaluateApp();
const esoRows = [];
for (const course of audit.courses.filter((item) => ["1eso", "2eso", "3eso", "4eso-a", "4eso-b"].includes(item.id))) {
  course.themes.forEach((theme, topicIndex) => {
    const lower = String(theme).toLowerCase();
    for (const level of ["Aprendiz", "Maestro"]) {
      const questions = [];
      for (let seed = 0; seed < 240; seed += 1) {
        const progression = level === "Maestro" ? 4 + (seed % 10) : seed % 10;
        const difficulty = level === "Maestro" ? (seed % 3 ? "hard" : "medium") : (seed % 3 ? "medium" : "easy");
        questions.push(audit.generatedEsoDifficultyQuestion(lower, course.id, difficulty, topicIndex * 100003 + seed * 7919, progression, seed % 10));
      }
      const coherent = questions.filter(audit.questionHasCoherentOptions);
      const invalidExamples = questions
        .filter((question) => !audit.questionHasCoherentOptions(question))
        .slice(0, 3)
        .map((question) => ({ text: question.text, options: question.options, correct: question.correct }));
      esoRows.push({
        courseId: course.id, course: course.label, theme, level,
        activeIdentities: uniqueQuestions(coherent, audit.challengeQuestionIdentity).length,
        activeStructures: uniqueQuestions(coherent, structureIdentity).length,
        invalidQuestions: questions.length - coherent.length,
        invalidExamples,
        identityTarget: 30,
        structureTarget: 4
      });
    }
  });
}

const bachRows = [];
for (const course of audit.courses.filter((item) => ["1bach-mates", "1bach-ccss"].includes(item.id))) {
  course.themes.forEach((theme) => {
    const lower = String(theme).toLowerCase();
    const selected = audit.pickExerciseBank(lower, course.id);
    const pool = course.id === "1bach-mates"
      ? [...selected, ...audit.matesIRepeatBank(lower), ...audit.matesIExtensionBank(lower)]
      : [...selected, ...audit.ccssIExtensionBank(lower)];
    const variety = audit.varietyBuilder?.(course.id, theme) || [];
    pool.push(...variety);
    const coherent = pool.filter(audit.questionHasCoherentOptions);
    bachRows.push({
      courseId: course.id, course: course.label, theme,
      activeIdentities: uniqueQuestions(coherent, audit.challengeHistoryIdentity).length,
      activeStructures: uniqueQuestions(coherent, structureIdentity).length,
      invalidQuestions: pool.length - coherent.length,
      identityTarget: 32,
      structureTarget: 4
    });
  });
}

function simulateRounds(course, theme, topicIndex, level, target) {
  audit.state.courseId = course.id;
  audit.state.topicIndex = topicIndex;
  audit.state.topicChallengeLevel = level;
  audit.state.blockKey = null;
  audit.state.practiceRound = 0;
  audit.state.challengeRoundCache = {};
  audit.state.challengeQuestionHistory = {};
  const seen = new Set();
  let repeatedBeforeTarget = 0;
  let duplicateWithinRound = 0;
  const repeatedExamples = [];
  const roundSize = audit.questionsPerChallengeFor(course);
  const rounds = Math.ceil(target / roundSize);
  for (let round = 0; round < rounds; round += 1) {
    audit.state.practiceRound = round;
    audit.state.challengeRoundCache = {};
    const questions = course.id.startsWith("1bach-")
      ? audit.buildQuestions(theme, course)
      : audit.buildEsoTopicLevelQuestions(theme, course);
    const roundSeen = new Set();
    questions.forEach((question) => {
      const identity = question._historyIdentity || audit.challengeHistoryIdentity(question);
      if (roundSeen.has(identity)) duplicateWithinRound += 1;
      if (seen.size < target && seen.has(identity)) {
        repeatedBeforeTarget += 1;
        if (repeatedExamples.length < 5) repeatedExamples.push({ round, identity, text: question.text });
      }
      roundSeen.add(identity);
      seen.add(identity);
      audit.markChallengeQuestionAnswered(question);
    });
  }
  return { distinct: seen.size, target, repeatedBeforeTarget, duplicateWithinRound, repeatedExamples };
}

const noRepeatChecks = [];
for (const course of audit.courses.filter((item) => ["1eso", "2eso", "3eso", "4eso-a", "4eso-b"].includes(item.id))) {
  course.themes.forEach((theme, topicIndex) => {
    for (const level of ["apprentice", "master"]) {
      noRepeatChecks.push({
        courseId: course.id,
        theme,
        level,
        ...simulateRounds(course, theme, topicIndex, level, 30)
      });
    }
  });
}
for (const course of audit.courses.filter((item) => ["1bach-mates", "1bach-ccss"].includes(item.id))) {
  course.themes.forEach((theme, topicIndex) => {
    noRepeatChecks.push({
      courseId: course.id,
      theme,
      level: "curso",
      ...simulateRounds(course, theme, topicIndex, "apprentice", 32)
    });
  });
}

const result = {
  generatedAt: new Date().toISOString(),
  criteria: {
    eso: "30 ejercicios activos por tema y nivel y, como control adicional, al menos 4 estructuras no meramente numéricas.",
    firstBach: "32 ejercicios activos por tema y, como control adicional, al menos 4 estructuras no meramente numéricas.",
    active: "Cada ejercicio activo tiene enunciado, cuatro opciones distintas, respuesta correcta y solución."
  },
  eso: esoRows,
  firstBach: bachRows,
  noRepeatChecks,
  summary: {
    esoRows: esoRows.length,
    esoIdentityDeficits: esoRows.filter((row) => row.activeIdentities < row.identityTarget).length,
    esoStructureDeficits: esoRows.filter((row) => row.activeStructures < row.structureTarget).length,
    firstBachRows: bachRows.length,
    firstBachIdentityDeficits: bachRows.filter((row) => row.activeIdentities < row.identityTarget).length,
    firstBachStructureDeficits: bachRows.filter((row) => row.activeStructures < row.structureTarget).length,
    invalidActiveQuestions: [...esoRows, ...bachRows].reduce((sum, row) => sum + row.invalidQuestions, 0),
    noRepeatChecks: noRepeatChecks.length,
    noRepeatFailures: noRepeatChecks.filter((row) => row.repeatedBeforeTarget || row.duplicateWithinRound || row.distinct < row.target).length
  }
};

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, "cobertura-activa.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");

const status = (count, target) => count >= target ? "Sí" : `No (faltan ${target - count})`;
const lines = [
  "# Cobertura activa de retos",
  "",
  `Generado: ${new Date().toISOString().slice(0, 10)}.`,
  "",
  "Este informe mide lo que la aplicación puede mostrar ahora con cuatro opciones coherentes y solución. No confunde los documentos localizados con ejercicios ya publicables.",
  "",
  "## ESO",
  "",
  "| Curso | Tema | Nivel | Ejercicios activos | Estructuras | Objetivo ejercicios | Objetivo estructuras | Cumple |",
  "|---|---|---|---:|---:|---:|---:|---|",
  ...esoRows.map((row) => `| ${row.course} | ${row.theme} | ${row.level} | ${row.activeIdentities} | ${row.activeStructures} | ${row.identityTarget} | ${row.structureTarget} | ${status(row.activeIdentities, row.identityTarget) === "Sí" && status(row.activeStructures, row.structureTarget) === "Sí" ? "Sí" : "No"} |`),
  "",
  "## 1.º de Bachillerato",
  "",
  "| Curso | Tema | Ejercicios activos | Estructuras | Objetivo ejercicios | Objetivo estructuras | Cumple |",
  "|---|---|---:|---:|---:|---:|---|",
  ...bachRows.map((row) => `| ${row.course} | ${row.theme} | ${row.activeIdentities} | ${row.activeStructures} | ${row.identityTarget} | ${row.structureTarget} | ${status(row.activeIdentities, row.identityTarget) === "Sí" && status(row.activeStructures, row.structureTarget) === "Sí" ? "Sí" : "No"} |`),
  "",
  "## Resumen",
  "",
  `- Filas ESO por tema y nivel: **${result.summary.esoRows}**.`,
  `- Déficits ESO por identidad: **${result.summary.esoIdentityDeficits}**.`,
  `- Déficits ESO de estructuras no meramente numéricas: **${result.summary.esoStructureDeficits}**.`,
  `- Temas de 1.º Bachillerato: **${result.summary.firstBachRows}**.`,
  `- Déficits de identidad en 1.º Bachillerato: **${result.summary.firstBachIdentityDeficits}**.`,
  `- Déficits de estructuras en 1.º Bachillerato: **${result.summary.firstBachStructureDeficits}**.`,
  `- Preguntas activas inválidas detectadas: **${result.summary.invalidActiveQuestions}**.`,
  `- Recorridos sin repetición comprobados: **${result.summary.noRepeatChecks}**.`,
  `- Fallos de repetición antes de agotar el banco: **${result.summary.noRepeatFailures}**.`
];
fs.writeFileSync(path.join(outputRoot, "COBERTURA ACTIVA.md"), `${lines.join("\n")}\n`, "utf8");

export default result;

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
    __MARGARITA_ENABLE_AUDIT__: true,
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
  const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
  const runtimeScripts = [...indexHtml.matchAll(/<script[^>]+src=["']([^"']+\.js)(?:\?[^"']*)?["']/g)]
    .map((match) => match[1])
    .filter((relativePath) => fs.existsSync(path.join(projectRoot, relativePath)));
  runtimeScripts.forEach((relativePath) => {
    const absolutePath = path.join(projectRoot, relativePath);
    vm.runInContext(fs.readFileSync(absolutePath, "utf8"), context, { filename: relativePath });
  });
  vm.runInContext(`
    globalThis.__audit = {
      courses, state, generatedEsoDifficultyQuestion, challengeQuestionIdentity, challengeHistoryIdentity,
      questionHasCoherentOptions, pickExerciseBank, matesIRepeatBank, matesIExtensionBank, ccssIExtensionBank,
      buildEsoTopicLevelQuestions, buildQuestions, markChallengeQuestionAnswered, questionsPerChallengeFor,
      buildAdventureTrainingQuestions,
      varietyBuilder: window.MargaritaFirstBachVariety?.build || null,
      combinatoricsBuilder: window.MargaritaCombinatoricsSupplied?.build || null,
      sourceVerifiedBuilder: window.MargaritaSourceVerified?.build || null,
      esoExamVerifiedBuilder: window.MargaritaEsoExamVerified?.build || null,
      firstBachExamAudit: window.MargaritaFirstBachExamAudit || null,
      esoExamAudit: window.MargaritaEsoExamAudit || null,
      coach: window.MargaritaCoach || null,
      storage: localStorage
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

function plainSolutionText(question) {
  if (Array.isArray(question?.parts) && question.parts.length) {
    return question.parts.map(plainSolutionText).join("\n");
  }
  return String(question?.solution || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function solutionQualityIssue(question) {
  if (Array.isArray(question?.parts) && question.parts.length) {
    const partIssues = question.parts
      .map((part, index) => solutionQualityIssue(part) ? `apartado-${index + 1}` : "")
      .filter(Boolean);
    return partIssues.length ? `solucion-insuficiente-${partIssues.join("-")}` : "";
  }
  const solution = plainSolutionText(question);
  if (!solution) return "sin-solucion";
  if (/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]\?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]|Ã|Â|â(?:‰|ˆ|†|‡)/.test(solution)) {
    return "caracteres-corruptos";
  }
  if (/la opci[oó]n correcta es.+regla correspondiente paso a paso/i.test(solution)) {
    return "solucion-generica";
  }
  if (solution.length < 12) return "solucion-demasiado-breve";
  const prompt = String(question?.text || "").toLowerCase();
  const procedural = /\b(calcula|resuelve|deriva|integra|halla|simplifica|racionaliza|factoriza|determina|obt[eé]n)\b/.test(prompt);
  const hasProcess = /(?:=|⇒|→|\bporque\b|\bpor tanto\b|\bprimero\b|\bdespués\b|\baplicamos\b|\bsustitu|\bcalcul|\bresolv|\bcomprob|\bresultado\b|\bconclusión\b)/i.test(solution);
  if (procedural && !hasProcess) return "sin-desarrollo-visible";
  return "";
}

function solutionQualitySummary(questions) {
  const issues = questions
    .map((question) => ({ question, issue: solutionQualityIssue(question) }))
    .filter((item) => item.issue);
  return {
    solutionReviewCount: issues.length,
    solutionReviewExamples: issues.slice(0, 5).map(({ question, issue }) => ({
      issue,
      text: question?.text,
      solution: plainSolutionText(question).slice(0, 280)
    }))
  };
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
      if (level === "Maestro") {
        questions.push(...(audit.esoExamVerifiedBuilder?.(course.id, theme) || []));
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
        ...solutionQualitySummary(uniqueQuestions(coherent, audit.challengeQuestionIdentity)),
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
    const combinatorics = audit.combinatoricsBuilder?.(course.id, theme) || [];
    pool.push(...combinatorics);
    const sourceVerified = audit.sourceVerifiedBuilder?.(course.id, theme) || [];
    pool.push(...sourceVerified);
    const coherent = pool.filter(audit.questionHasCoherentOptions);
    bachRows.push({
      courseId: course.id, course: course.label, theme,
      activeIdentities: uniqueQuestions(coherent, audit.challengeHistoryIdentity).length,
      activeStructures: uniqueQuestions(coherent, structureIdentity).length,
      invalidQuestions: pool.length - coherent.length,
      ...solutionQualitySummary(uniqueQuestions(coherent, audit.challengeHistoryIdentity)),
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

function resetRuntimeForCourse(course, studentSuffix) {
  audit.storage.clear();
  audit.state.courseId = course.id;
  audit.state.student = {
    id: `audit-${course.id}-${studentSuffix}`,
    name: "Auditoría",
    group: course.id,
    groupLabel: course.label,
    courseId: course.id
  };
  audit.state.topicIndex = 0;
  audit.state.blockKey = "";
  audit.state.practiceRound = 0;
  audit.state.challengeRoundCache = {};
  audit.state.challengeQuestionHistory = {};
}

function collectNoRepeatResult(rounds, target) {
  const seen = new Set();
  const repeatedExamples = [];
  let repeatedBeforeTarget = 0;
  let duplicateWithinRound = 0;
  rounds.forEach((questions, round) => {
    const roundSeen = new Set();
    questions.forEach((question) => {
      const identity = question?._historyIdentity || audit.challengeHistoryIdentity(question);
      if (roundSeen.has(identity)) duplicateWithinRound += 1;
      if (seen.size < target && seen.has(identity)) {
        repeatedBeforeTarget += 1;
        if (repeatedExamples.length < 5) repeatedExamples.push({ round, identity, text: question?.text });
      }
      roundSeen.add(identity);
      seen.add(identity);
      audit.markChallengeQuestionAnswered(question);
    });
  });
  return { distinct: seen.size, target, repeatedBeforeTarget, duplicateWithinRound, repeatedExamples };
}

const adventureChecks = [];
for (const course of audit.courses.filter((item) => ["1eso", "2eso", "3eso", "4eso-a", "4eso-b"].includes(item.id))) {
  course.themes.forEach((theme, topicIndex) => {
    for (const difficulty of ["easy", "medium", "hard"]) {
      resetRuntimeForCourse(course, `adventure-${topicIndex}-${difficulty}`);
      audit.state.topicIndex = topicIndex;
      const roundSize = audit.questionsPerChallengeFor(course);
      const target = 30;
      const rounds = Array.from({ length: Math.ceil(target / roundSize) }, (_, round) => {
        const questions = audit.buildAdventureTrainingQuestions(theme, course, difficulty, round + 1);
        questions.forEach(audit.markChallengeQuestionAnswered);
        return questions;
      });
      adventureChecks.push({
        courseId: course.id,
        theme,
        difficulty,
        ...collectNoRepeatResult(rounds, target)
      });
    }
  });
}

function simulateExam(course, topicIndex, target) {
  const examAudit = course.id.startsWith("1bach-") ? audit.firstBachExamAudit : audit.esoExamAudit;
  resetRuntimeForCourse(course, `exam-${topicIndex}`);
  audit.state.topicIndex = topicIndex;
  examAudit.exam.selectedTopics = new Set([topicIndex]);
  examAudit.exam.count = course.id.startsWith("1bach-") ? 6 : 8;
  const rounds = [];
  let collected = 0;
  while (collected < target) {
    audit.state.practiceRound += 1;
    const questions = examAudit.buildExamQuestions();
    rounds.push(questions);
    questions.forEach(audit.markChallengeQuestionAnswered);
    collected += questions.length;
  }
  return collectNoRepeatResult(rounds, target);
}

const examChecks = [];
for (const course of audit.courses.filter((item) =>
  ["1eso", "2eso", "3eso", "4eso-a", "4eso-b", "1bach-mates", "1bach-ccss"].includes(item.id)
)) {
  course.themes.forEach((theme, topicIndex) => {
    const target = course.id.startsWith("1bach-") ? 32 : 30;
    examChecks.push({
      courseId: course.id,
      theme,
      ...simulateExam(course, topicIndex, target)
    });
  });
}

const coachPoolRows = [];
for (const course of audit.courses.filter((item) =>
  ["1eso", "2eso", "3eso", "4eso-a", "4eso-b", "1bach-mates", "1bach-ccss"].includes(item.id)
)) {
  course.themes.forEach((theme) => {
    const topicId = audit.coach.__audit.inferTopicId(theme, course.id);
    const pool = audit.coach.__audit.questionsForTopic(course, topicId);
    const coherent = pool.filter(audit.questionHasCoherentOptions);
    coachPoolRows.push({
      courseId: course.id,
      theme,
      topicId,
      activeIdentities: uniqueQuestions(coherent, audit.challengeHistoryIdentity).length,
      activeStructures: uniqueQuestions(coherent, structureIdentity).length,
      invalidQuestions: pool.length - coherent.length,
      ...solutionQualitySummary(uniqueQuestions(coherent, audit.challengeHistoryIdentity)),
      identityTarget: course.id.startsWith("1bach-") ? 32 : 30,
      structureTarget: 4
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
  adventureChecks,
  examChecks,
  coachPoolRows,
  summary: {
    esoRows: esoRows.length,
    esoIdentityDeficits: esoRows.filter((row) => row.activeIdentities < row.identityTarget).length,
    esoStructureDeficits: esoRows.filter((row) => row.activeStructures < row.structureTarget).length,
    firstBachRows: bachRows.length,
    firstBachIdentityDeficits: bachRows.filter((row) => row.activeIdentities < row.identityTarget).length,
    firstBachStructureDeficits: bachRows.filter((row) => row.activeStructures < row.structureTarget).length,
    invalidActiveQuestions: [...esoRows, ...bachRows].reduce((sum, row) => sum + row.invalidQuestions, 0),
    noRepeatChecks: noRepeatChecks.length,
    noRepeatFailures: noRepeatChecks.filter((row) => row.repeatedBeforeTarget || row.duplicateWithinRound || row.distinct < row.target).length,
    adventureChecks: adventureChecks.length,
    adventureFailures: adventureChecks.filter((row) => row.repeatedBeforeTarget || row.duplicateWithinRound || row.distinct < row.target).length,
    examChecks: examChecks.length,
    examFailures: examChecks.filter((row) => row.repeatedBeforeTarget || row.duplicateWithinRound || row.distinct < row.target).length,
    coachPoolRows: coachPoolRows.length,
    coachIdentityDeficits: coachPoolRows.filter((row) => row.activeIdentities < row.identityTarget).length,
    coachStructureDeficits: coachPoolRows.filter((row) => row.activeStructures < row.structureTarget).length,
    coachInvalidQuestions: coachPoolRows.reduce((sum, row) => sum + row.invalidQuestions, 0),
    esoSolutionReviewCount: esoRows.reduce((sum, row) => sum + row.solutionReviewCount, 0),
    firstBachSolutionReviewCount: bachRows.reduce((sum, row) => sum + row.solutionReviewCount, 0),
    coachSolutionReviewCount: coachPoolRows.reduce((sum, row) => sum + row.solutionReviewCount, 0)
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
  `- Fallos de repetición antes de agotar el banco: **${result.summary.noRepeatFailures}**.`,
  `- Recorridos de aventura comprobados: **${result.summary.adventureChecks}**; fallos: **${result.summary.adventureFailures}**.`,
  `- Recorridos de examen comprobados: **${result.summary.examChecks}**; fallos: **${result.summary.examFailures}**.`,
  `- Bancos del entrenador IA comprobados: **${result.summary.coachPoolRows}**.`,
  `- Déficits de identidad del entrenador IA: **${result.summary.coachIdentityDeficits}**.`,
  `- Déficits de estructuras del entrenador IA: **${result.summary.coachStructureDeficits}**.`,
  `- Preguntas inválidas del entrenador IA: **${result.summary.coachInvalidQuestions}**.`
];
fs.writeFileSync(path.join(outputRoot, "COBERTURA ACTIVA.md"), `${lines.join("\n")}\n`, "utf8");

export default result;

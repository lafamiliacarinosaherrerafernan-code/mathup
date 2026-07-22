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
    removeItem(key) { delete memory[key]; }, clear() { Object.keys(memory).forEach((key) => delete memory[key]); }
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

function evaluateRuntime() {
  const context = browserContext();
  [
    "data/ccss-ii-blocks.js",
    "data/ccss-ii-block-answers.js",
    "data/mates-ii-blocks.js",
    "data/bach-ii-exam-data.js",
    "data/mates-ii-runtime-fixes.js",
    "data/mates-i-supplied-banks.js",
    "data/first-bach-variety-banks.js",
    "app.js",
    "bach-exam.js"
  ].forEach((relativePath) => {
    const absolutePath = path.join(projectRoot, relativePath);
    vm.runInContext(fs.readFileSync(absolutePath, "utf8"), context, { filename: relativePath });
  });
  vm.runInContext(`globalThis.__audit = {
    courses, state, BACH_II_BLOCKS, courseById, challengeQuestionIdentity,
    questionHasCoherentOptions, hasOfficialConvocation,
    buildMatesIIBlockQuestions, buildCcssIIBlockQuestions,
    exam: window.MargaritaBachExam
  };`, context);
  return context.__audit;
}

const audit = evaluateRuntime();
function coherentExercise(question) {
  if (Array.isArray(question?.parts) && question.parts.length) {
    return question.parts.every((part) => audit.questionHasCoherentOptions(part));
  }
  return audit.questionHasCoherentOptions(question);
}

function enumerateActivePool(course, block) {
  audit.state.courseId = course.id;
  audit.state.practiceRound = 0;
  audit.state.challengeRoundCache = {};
  audit.state.challengeQuestionHistory = {};
  const identities = new Set();
  let sampleRound = [];
  for (let round = 0; round < 100; round += 1) {
    audit.state.practiceRound = round;
    audit.state.challengeRoundCache = {};
    const active = course.id === "2bach-mates"
      ? audit.buildMatesIIBlockQuestions(course, block.id)
      : audit.buildCcssIIBlockQuestions(block.id);
    if (!sampleRound.length) sampleRound = active;
    let newInRound = 0;
    active.forEach((question) => {
      const identity = question._historyIdentity || audit.challengeQuestionIdentity(question);
      if (!identities.has(identity)) newInRound += 1;
      identities.add(identity);
      const scope = question._historyScopeKey;
      if (scope) {
        audit.state.challengeQuestionHistory[scope] = [...new Set([
          ...(audit.state.challengeQuestionHistory[scope] || []),
          identity
        ])];
      }
    });
    if (!active.length || newInRound < active.length) break;
  }
  return { identities, sampleRound };
}

const rows = [];
for (const courseId of ["2bach-mates", "2bach-ccss"]) {
  const course = audit.courseById(courseId);
  const exact = audit.exam.auditExactPoolCounts(course);
  for (const block of audit.BACH_II_BLOCKS[courseId] || []) {
    const { identities, sampleRound: active } = enumerateActivePool(course, block);
    const exactCount = exact.blocks.find((entry) => entry.block === block.id)?.count || 0;
    const invalidExamples = active
      .filter((question) => !coherentExercise(question))
      .slice(0, 3)
      .map((question) => ({
        id: question.id || "",
        source: question.source || "",
        text: question.text || "",
        options: question.options || [],
        parts: question.parts || []
      }));
    rows.push({
      courseId, course: course.label, blockId: block.id, block: block.label,
      exactReviewedPool: exactCount,
      uniqueOfficialPool: identities.size,
      activeRoundCount: active.length,
      coherentRoundCount: active.filter(coherentExercise).length,
      invalidExamples,
      withConvocation: active.filter(audit.hasOfficialConvocation).length,
      requiredPerRound: courseId === "2bach-mates" ? 5 : 4
    });
  }
}

const result = {
  generatedAt: new Date().toISOString(),
  criteria: "En 2.º de Bachillerato solo se cuentan ejercicios oficiales entregados por la usuaria, completos, con convocatoria, cuatro opciones y solución revisada.",
  rows,
  summary: {
    blocks: rows.length,
    blocksWithEnoughForRound: rows.filter((row) => row.activeRoundCount >= row.requiredPerRound).length,
    blocksWithThirtyReviewed: rows.filter((row) => row.uniqueOfficialPool >= 30).length,
    invalidActiveQuestions: rows.reduce((sum, row) => sum + row.activeRoundCount - row.coherentRoundCount, 0),
    missingConvocations: rows.reduce((sum, row) => sum + row.activeRoundCount - row.withConvocation, 0)
  }
};

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, "cobertura-bachillerato-ii.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
const lines = [
  "# Cobertura activa de 2.º de Bachillerato",
  "",
  `Generado: ${new Date().toISOString().slice(0, 10)}.`,
  "",
  result.criteria,
  "",
  "| Curso | Bloque | Banco oficial activo | Núcleo revisado | Ronda activa | Requeridos | Opciones válidas | Convocatoria |",
  "|---|---|---:|---:|---:|---:|---:|---:|",
  ...rows.map((row) => `| ${row.course} | ${row.block} | ${row.uniqueOfficialPool} | ${row.exactReviewedPool} | ${row.activeRoundCount} | ${row.requiredPerRound} | ${row.coherentRoundCount} | ${row.withConvocation} |`),
  "",
  "## Resumen",
  "",
  `- Bloques comprobados: **${result.summary.blocks}**.`,
  `- Bloques que pueden formar una ronda completa: **${result.summary.blocksWithEnoughForRound}/${result.summary.blocks}**.`,
  `- Preguntas activas inválidas: **${result.summary.invalidActiveQuestions}**.`,
  `- Preguntas activas sin convocatoria: **${result.summary.missingConvocations}**.`
];
fs.writeFileSync(path.join(outputRoot, "COBERTURA BACHILLERATO II.md"), `${lines.join("\n")}\n`, "utf8");

export default result;

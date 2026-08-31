import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { Blob } from "node:buffer";
import { TextDecoder, TextEncoder } from "node:util";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "index.html");
const outputJson = path.join(root, "docs", "FASE-0-INVENTARIO-CATALOGO-MATHUP.json");
const outputCsv = path.join(root, "docs", "FASE-0-INVENTARIO-CATALOGO-MATHUP.csv");

const read = (file) => fs.readFileSync(file, "utf8");
const rel = (file) => path.relative(root, file).replaceAll("\\", "/");
const hash = (value) => crypto.createHash("sha256").update(String(value ?? "")).digest("hex").slice(0, 16);
const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const stripHtml = (value) => clean(String(value ?? "").replace(/<[^>]*>/g, " "));
const fold = (value) => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function textOf(value, depth = 0) {
  if (value == null || depth > 5) return "";
  if (typeof value === "string" || typeof value === "number") return clean(value);
  if (Array.isArray(value)) return clean(value.map((item) => textOf(item, depth + 1)).filter(Boolean).join("\n"));
  if (typeof value !== "object") return "";
  return clean([
    value.plain, value.text, value.html, value.label, value.title,
    value.statement, value.statementHtml, value.prompt, value.question,
    value.paragraphs, value.parts
  ].map((item) => textOf(item, depth + 1)).filter(Boolean).join("\n"));
}

function statementOf(item) {
  return stripHtml(textOf(item.text || item.prompt || item.question || item.enunciado || item.statementHtml || item.statement || ""));
}

function solutionOf(item) {
  const source = item.solution ?? item.development ?? item.explanation ?? item.steps ?? item.resolution ?? item.solucion ?? "";
  return stripHtml(textOf(source));
}

function optionsOf(item) {
  const source = item.options ?? item.choices ?? item.answers ?? item.opciones;
  if (!Array.isArray(source)) return [];
  return source.map((option) => stripHtml(textOf(option))).filter((option) => option !== "");
}

function answerOf(item, options) {
  const explicit = item.answer ?? item.correctAnswer ?? item.result ?? item.respuesta ?? item.finalAnswer;
  if (explicit != null && textOf(explicit)) return stripHtml(textOf(explicit));
  const index = Number.isInteger(item.correct) ? item.correct : Number.isInteger(item.correctIndex) ? item.correctIndex : null;
  return index != null && options[index] != null ? options[index] : "";
}

function currentIdOf(item, pathHint) {
  return clean(item.exerciseId || item.rawBaseId || item.id || item.questionId || item.uid || item.templateId || pathHint.split(".").at(-1) || "");
}

function isExerciseLike(item, pathHint = "") {
  if (!item || typeof item !== "object" || Array.isArray(item)) return false;
  const statement = statementOf(item);
  const solution = solutionOf(item);
  const options = optionsOf(item);
  const hasIdentity = Boolean(item.id || item.exerciseId || item.rawBaseId || item.questionId || item.templateId);
  const hasAnswerShape = options.length || item.correct != null || item.correctIndex != null || item.answer != null || solution;
  const officialShape = Array.isArray(item.statement) && (Array.isArray(item.parts) || hasIdentity);
  const answerBankShape = !statement && hasAnswerShape && /answer|solution|exercise|question/i.test(pathHint);
  return Boolean((statement && (hasIdentity || hasAnswerShape || Array.isArray(item.parts))) || officialShape || answerBankShape);
}

function fakeElement() {
  const element = {
    value: "", innerHTML: "", textContent: "", className: "", hidden: false,
    style: { setProperty() {} }, classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    dataset: {}, children: [], appendChild(child) { this.children.push(child); return child; },
    remove() {}, focus() {}, click() {}, setAttribute() {}, removeAttribute() {},
    querySelector() { return null; }, querySelectorAll() { return []; }, closest() { return null; },
    getContext() { return null; }, play() { return Promise.resolve(); }, pause() {}
  };
  return element;
}

function storageStub() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }, clear() { values.clear(); }
  };
}

const documentStub = {
  readyState: "loading", body: fakeElement(), documentElement: fakeElement(),
  getElementById() { return fakeElement(); }, createElement() { return fakeElement(); },
  querySelector() { return null; }, querySelectorAll() { return []; },
  addEventListener() {}, removeEventListener() {}
};

const sandbox = {
  console: { log() {}, warn() {}, error() {}, info() {} },
  document: documentStub, localStorage: storageStub(), sessionStorage: storageStub(),
  navigator: { userAgent: "fase0-audit", language: "es-ES", mediaDevices: null },
  location: { href: "http://127.0.0.1:8799/index.html", search: "", pathname: "/index.html" },
  history: { replaceState() {}, pushState() {} },
  speechSynthesis: { cancel() {}, speak() {}, getVoices() { return []; } },
  SpeechSynthesisUtterance: function SpeechSynthesisUtterance() {},
  Audio: function Audio() { return fakeElement(); }, Image: function Image() { return fakeElement(); },
  alert() {}, confirm() { return true; }, prompt() { return ""; },
  setTimeout() { return 0; }, clearTimeout() {}, setInterval() { return 0; }, clearInterval() {},
  requestAnimationFrame(callback) { if (typeof callback === "function") callback(0); return 0; },
  cancelAnimationFrame() {}, matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; },
  URL, URLSearchParams, Blob, TextEncoder, TextDecoder, structuredClone,
  crypto: crypto.webcrypto, Math, Date, JSON, Object, Array, String, Number, Boolean, RegExp, Set, Map, WeakSet,
  parseInt, parseFloat, isNaN, Infinity, NaN
};
sandbox.window = sandbox;
sandbox.self = sandbox;
sandbox.globalThis = sandbox;
sandbox.window.addEventListener = () => {};
sandbox.window.removeEventListener = () => {};
sandbox.window.innerWidth = 1440;
sandbox.window.innerHeight = 900;
sandbox.window.APP_CONFIG = {};
sandbox.window.MATHUP_VERIFIED_ADMIN_ROLE = null;
const context = vm.createContext(sandbox, { name: "mathup-fase0-audit" });

const index = read(indexPath);
const loadedScripts = [...index.matchAll(/<script\s+[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi)]
  .map((match) => match[1].split("?")[0])
  .filter((src) => !/^(?:https?:)?\/\//i.test(src));
const dataScripts = loadedScripts.filter((src) => src.startsWith("data/") && fs.existsSync(path.join(root, src)));
const executionErrors = [];
const scriptManifest = [];
const rawRecords = [];
const seenObjects = new WeakSet();

function traverseNewExercises(value, sourceFile, objectPath, depth = 0, ancestors = new WeakSet()) {
  if (!value || (typeof value !== "object" && typeof value !== "function") || depth > 18) return;
  if (ancestors.has(value)) return;
  const nextAncestors = new WeakSet();
  ancestors.add(value);
  if (typeof value === "object" && !Array.isArray(value) && isExerciseLike(value, objectPath) && !seenObjects.has(value)) {
    seenObjects.add(value);
    rawRecords.push({ raw: value, sourceFile, objectPath });
  }
  let entries = [];
  try {
    entries = Array.isArray(value) ? value.map((item, index) => [String(index), item]) : Object.entries(value);
  } catch (_) { return; }
  for (const [key, child] of entries) {
    if (key === "window" || key === "self" || key === "globalThis" || key === "document") continue;
    if (!child || (typeof child !== "object" && typeof child !== "function")) continue;
    traverseNewExercises(child, sourceFile, `${objectPath}.${key}`, depth + 1, ancestors);
  }
}

function captureGlobals(sourceFile) {
  for (const [key, value] of Object.entries(sandbox)) {
    if (["window", "self", "globalThis", "document"].includes(key)) continue;
    if (!value || typeof value !== "object") continue;
    traverseNewExercises(value, sourceFile, `window.${key}`);
  }
}

function runScript(relativeFile, sourceOverride = null) {
  const filename = path.join(root, relativeFile);
  const before = rawRecords.length;
  let failure = "";
  try {
    vm.runInContext(sourceOverride ?? read(filename), context, { filename, timeout: 20000 });
  } catch (error) {
    failure = String(error?.stack || error).split("\n")[0];
    executionErrors.push({ file: relativeFile, error: String(error?.stack || error) });
  }
  captureGlobals(relativeFile);
  scriptManifest.push({
    file: relativeFile,
    indexOrder: loadedScripts.indexOf(relativeFile) + 1,
    capturedNewRecords: rawRecords.length - before,
    executionError: failure
  });
}

for (const script of dataScripts) runScript(script);
if (fs.existsSync(path.join(root, "math-renderer.js"))) runScript("math-renderer.js");

const appExports = `\n;window.__FASE0_APP = {
  courses, state, exerciseBanks, BACH_II_BLOCKS, ESO_COURSE_IDS, FIRST_BACH_COURSE_IDS, BACH_II_COURSE_IDS,
  buildQuestions, buildAdventureTrainingQuestions, buildEsoTopicLevelQuestions, questionHasCoherentOptions,
  exerciseContentMatchesTopic, strictTopicSelection, firstBachBankByTopic, firstBachExtensionBankByTopic,
  buildMatesIIBlockQuestions, buildCcssIIBlockQuestions, bachPauRawBanks, withPauTestOptions,
  generatedEsoDifficultyQuestion, generatedExercisesFor, supplementalExercisesFor, pickExerciseBank,
  semanticTopicId, topicHistoryScope, questionsPerChallengeFor
};`;
runScript("app.js", `${read(path.join(root, "app.js"))}${appExports}`);
for (const script of ["bach-exam.js", "first-bach-exam.js", "eso-exam.js"]) {
  if (fs.existsSync(path.join(root, script))) runScript(script);
}

function inferCourse(item, sourceFile, objectPath) {
  const explicit = clean(item.courseId || item.course || item.grade || item.level);
  if (/^(1eso|2eso|3eso|4eso-a|4eso-b|1bach-mates|1bach-ccss|2bach-mates|2bach-ccss)$/.test(explicit)) return explicit;
  const haystack = fold([explicit, currentIdOf(item, objectPath), sourceFile, objectPath, item.source].join(" "));
  const rules = [
    ["2bach-ccss", /ccss2|ccss[_ -]?ii|2bach-ccss|ccss_ii/], ["2bach-mates", /mates2|mates[_ -]?ii|2bach-mates|mates_ii/],
    ["1bach-ccss", /ccss1|ccss[_ -]?i\b|1bach-ccss|ccss_i/], ["1bach-mates", /mates1|mates[_ -]?i\b|1bach-mates|mates_i/],
    ["4eso-a", /4eso-a|eso4a|4 eso a/], ["4eso-b", /4eso-b|eso4b|4 eso b/],
    ["1eso", /(?:^|[^0-9])1eso|eso1/], ["2eso", /(?:^|[^0-9])2eso|eso2/], ["3eso", /(?:^|[^0-9])3eso|eso3/]
  ];
  return rules.find(([, pattern]) => pattern.test(haystack))?.[0] || "sin-determinar";
}

function inferCommunity(item, sourceFile) {
  const value = fold([item.community, item.region, item.autonomousCommunity, item.source, sourceFile].join(" "));
  if (/madrid/.test(value)) return "Madrid";
  if (/castilla.?la mancha|clm/.test(value) || /(?:ccss|mates)-ii-block/.test(sourceFile)) return "Castilla-La Mancha";
  return "no-aplica-o-sin-determinar";
}

function inferModalities(item) {
  const map = [
    ["practica", "practiceEligible"], ["reto", "challengeEligible"], ["aventura", "adventureEligible"],
    ["examen", "examEligible"], ["jefe", "bossEligible"], ["coach", "coachEligible"]
  ];
  const declared = [];
  for (const [label, key] of map) if (item[key] !== undefined) declared.push(`${label}:${item[key] !== false}`);
  if (Array.isArray(item.modalities)) declared.push(...item.modalities.map(String));
  if (Array.isArray(item.modes)) declared.push(...item.modes.map(String));
  return [...new Set(declared)];
}

function mathFormats(statement, solution, options, raw) {
  const all = [statement, solution, ...options, textOf(raw.statementHtml), textOf(raw.html)].join(" ");
  const formats = [];
  if (/<math\b|MathML/i.test(all)) formats.push("MathML/HTML nativo");
  if (/<img\b|\.png\b|\.svg\b/i.test(String(raw.statementHtml || raw.html || ""))) formats.push("imagen/HTML");
  if (/\\(?:frac|sqrt|begin|left|right|cdot|times)|\$\$|\\\(|\\\[/.test(all)) formats.push("LaTeX");
  if (/(?:^|[^\\])(?:frac|sqrt|paren|bracket|abs)\{/.test(all)) formats.push("macros propias");
  if (/\[\[[^\]]+\]\]/.test(all)) formats.push("matriz [[...]]");
  if (/[√∑∫π≤≥≠≈∞²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉]/.test(all)) formats.push("Unicode matemático");
  if (!formats.length) formats.push("texto plano/ASCII");
  return formats;
}

function canonicalOption(value) {
  let text = fold(value).replace(/[−–—]/g, "-").replace(/[×·]/g, "*").replace(/,/g, ".").replace(/\s+/g, "");
  const fraction = text.match(/^\(?(-?\d+(?:\.\d+)?)\)?\/\(?(-?\d+(?:\.\d+)?)\)?$/);
  if (fraction && Number(fraction[2]) !== 0) return `num:${Number(fraction[1]) / Number(fraction[2])}`;
  if (/^-?\d+(?:\.\d+)?$/.test(text)) return `num:${Number(text)}`;
  text = text.replace(/^x=/, "x=").replace(/\+\-/g, "-");
  return text;
}

function recordFrom(entry, index, originKind = "source-record") {
  const item = entry.raw;
  const options = optionsOf(item);
  const statement = statementOf(item);
  const solution = solutionOf(item);
  const answer = answerOf(item, options);
  const currentId = currentIdOf(item, entry.objectPath);
  const correctIndex = Number.isInteger(item.correct) ? item.correct : Number.isInteger(item.correctIndex) ? item.correctIndex : null;
  const normalizedOptions = options.map((option) => fold(option));
  const canonicalOptions = options.map(canonicalOption);
  const reviewIndicators = Object.entries(item)
    .filter(([key, value]) => /review|revis|publish|status/i.test(key) && value !== undefined)
    .map(([key, value]) => `${key}:${typeof value === "object" ? JSON.stringify(value) : String(value)}`);
  const corrupted = /Ã|Â|â(?:€|ˆ|‚|„|œ|™)|�|cmcm|\b(?:sen|cos|tg)\s*\?/.test([statement, solution, ...options].join(" "));
  const notationProblems = [];
  const allText = [statement, solution, ...options].join(" ");
  if (/Ã|Â|â(?:€|ˆ|‚|„|œ|™)|�/.test(allText)) notationProblems.push("mojibake/codificación deteriorada");
  if (/cmcm|m2m2|\bfrac\{[^}]+$|\bsqrt\{[^}]+$/.test(allText)) notationProblems.push("notación concatenada o macro incompleta");
  if (/\$\$|\\\(|\\\[|\\frac|\\sqrt/.test(allText)) notationProblems.push("LaTeX residual dependiente de renderizador");
  const finalOnly = Boolean(solution && (
    fold(solution) === fold(answer) ||
    (solution.length < 70 && !/resoluci|paso|porque|sustitu|calcul|comprob|resultado final|conclusi/i.test(solution))
  ));
  return {
    inventoryId: `fase0-${String(index + 1).padStart(6, "0")}`,
    originKind, currentId, sourceFile: entry.sourceFile, sourcePath: entry.objectPath,
    course: inferCourse(item, entry.sourceFile, entry.objectPath),
    topic: clean(item.topicName || item.theme || item.topic || item.topicId || item.declaredTopicId || "sin-determinar"),
    topicIndex: Number.isInteger(item.topicIndex) ? item.topicIndex : null,
    block: clean(item.blockId || item.block || item.blockKey || "sin-determinar"),
    community: inferCommunity(item, entry.sourceFile),
    provenance: clean(item.source || item.sourceLabel || item.sourceDocument || item.origin || item.exam || ""),
    statement, answer, solution, options, correctIndex,
    difficulty: clean(item.difficulty || item.level || "sin-determinar"),
    modalities: inferModalities(item), reviewIndicators,
    mathFormat: mathFormats(statement, solution, options, item),
    templateId: clean(item.templateId || ""), rawBaseId: clean(item.rawBaseId || ""), exerciseId: clean(item.exerciseId || ""),
    type: clean(item.type || item.sourceKind || ""),
    flags: {
      missingStatement: !statement,
      missingAnswer: !answer,
      missingDevelopedSolution: !solution,
      finalAnswerOnly: finalOnly,
      markedForReview: reviewIndicators.some((value) => /true|pending|review|revis/i.test(value) && !/false|published/i.test(value)),
      corruptedCharacters: corrupted,
      notationProblems,
      optionCount: options.length,
      duplicateOptionsExact: options.length > 1 && new Set(normalizedOptions).size !== options.length,
      duplicateOptionsEquivalent: options.length > 1 && new Set(canonicalOptions).size !== options.length,
      coherentFourOptions: options.length === 4 && new Set(normalizedOptions).size === 4 && correctIndex != null && correctIndex >= 0 && correctIndex < 4
    },
    accessible: false,
    accessibleVia: []
  };
}

let records = rawRecords.map((entry, index) => recordFrom(entry, index));
const recordKeys = new Map();
function identityKeys(record) {
  const keys = [];
  for (const value of [record.exerciseId, record.rawBaseId, record.currentId]) if (value) keys.push(`id:${value}`);
  if (record.statement) keys.push(`text:${fold(record.statement)}`);
  if (record.provenance && record.answer) keys.push(`prov:${fold(record.provenance)}|ans:${fold(record.answer)}`);
  return [...new Set(keys)];
}
function indexRecord(record) {
  for (const key of identityKeys(record)) {
    if (!recordKeys.has(key)) recordKeys.set(key, []);
    recordKeys.get(key).push(record);
  }
}
records.forEach(indexRecord);

const accessibleCandidates = [];
const routeAudits = {};
function auditRouteQuestion(item, via) {
  if (!routeAudits[via]) {
    routeAudits[via] = {
      total: 0, openResponse: 0, fourOptions: 0, invalidFourOptions: 0,
      correctPosition: { A: 0, B: 0, C: 0, D: 0, invalid: 0 },
      duplicateOptionsExact: 0, duplicateOptionsEquivalent: 0
    };
  }
  const audit = routeAudits[via];
  const options = optionsOf(item);
  const correctIndex = Number.isInteger(item.correct) ? item.correct : Number.isInteger(item.correctIndex) ? item.correctIndex : null;
  audit.total += 1;
  if (!options.length) {
    audit.openResponse += 1;
    return;
  }
  if (options.length !== 4) {
    audit.invalidFourOptions += 1;
    return;
  }
  audit.fourOptions += 1;
  const normalized = options.map((option) => fold(option));
  const canonical = options.map(canonicalOption);
  if (new Set(normalized).size !== options.length) audit.duplicateOptionsExact += 1;
  if (new Set(canonical).size !== options.length) audit.duplicateOptionsEquivalent += 1;
  const position = ["A", "B", "C", "D"][correctIndex] || "invalid";
  audit.correctPosition[position] += 1;
}
function collectCandidate(item, via, course, topicIndex, topicName, sourceFile = "runtime-builder") {
  if (!item || typeof item !== "object") return;
  const entry = { raw: item, sourceFile, objectPath: via };
  const temp = recordFrom(entry, records.length + accessibleCandidates.length, "runtime-materialization");
  temp.course = course?.id || temp.course;
  temp.topicIndex = Number.isInteger(topicIndex) ? topicIndex : temp.topicIndex;
  temp.topic = topicName || temp.topic;
  temp.accessible = true;
  temp.accessibleVia = [via];
  accessibleCandidates.push(temp);
}
function markAccessible(item, via, course, topicIndex, topicName) {
  auditRouteQuestion(item, via);
  const temp = recordFrom({ raw: item, sourceFile: "runtime-builder", objectPath: via }, 0, "runtime-materialization");
  const matches = new Set();
  for (const key of identityKeys(temp)) for (const record of recordKeys.get(key) || []) matches.add(record);
  if (!matches.size) {
    collectCandidate(item, via, course, topicIndex, topicName);
    return;
  }
  for (const record of matches) {
    record.accessible = true;
    if (!record.accessibleVia.includes(via)) record.accessibleVia.push(via);
    if (record.course === "sin-determinar" && course?.id) record.course = course.id;
    if (record.topic === "sin-determinar" && topicName) record.topic = topicName;
    if (record.topicIndex == null && Number.isInteger(topicIndex)) record.topicIndex = topicIndex;
  }
}
function safeCall(label, callback) {
  try { return callback() || []; }
  catch (error) { executionErrors.push({ file: label, error: String(error?.stack || error) }); return []; }
}

const appApi = sandbox.__FASE0_APP;
const selector = sandbox.MargaritaExerciseSelector;
const courses = appApi?.courses || [];
if (appApi && selector) {
  for (const course of courses) {
    for (let topicIndex = 0; topicIndex < (course.themes || []).length; topicIndex += 1) {
      const theme = course.themes[topicIndex];
      appApi.state.courseId = course.id;
      appApi.state.topicIndex = topicIndex;
      appApi.state.blockKey = "";
      appApi.state.practiceRound = 0;
      appApi.state.challengeQuestionHistory = {};
      appApi.state.challengeRoundCache = {};
      appApi.state.pauCommunity = "clm";
      const pools = [];
      const pushPool = (name, value) => { if (Array.isArray(value) && value.length) pools.push([name, value]); };
      pushPool("MargaritaSourceVerified.build", safeCall("MargaritaSourceVerified.build", () => sandbox.MargaritaSourceVerified?.build?.(course.id, theme)));
      pushPool("MargaritaEsoExamVerified.build", safeCall("MargaritaEsoExamVerified.build", () => sandbox.MargaritaEsoExamVerified?.build?.(course.id, theme)));
      for (const level of ["apprentice", "master"]) {
        pushPool(`MargaritaEsoOriginalPractice.build:${level}`, safeCall("MargaritaEsoOriginalPractice.build", () => sandbox.MargaritaEsoOriginalPractice?.build?.(course.id, theme, level)));
        pushPool(`MargaritaEso3ApprovedABPractice.buildChallenge:${level}`, safeCall("MargaritaEso3ApprovedABPractice.buildChallenge", () => sandbox.MargaritaEso3ApprovedABPractice?.buildChallenge?.(course.id, theme, level)));
      }
      pushPool("MargaritaEso3ApprovedABPractice.buildAdventure", safeCall("MargaritaEso3ApprovedABPractice.buildAdventure", () => sandbox.MargaritaEso3ApprovedABPractice?.buildAdventure?.(course.id, theme, "master")));
      pushPool("MargaritaEso3ApprovedABPractice.buildExam", safeCall("MargaritaEso3ApprovedABPractice.buildExam", () => sandbox.MargaritaEso3ApprovedABPractice?.buildExam?.(course.id, theme)));
      pushPool("MargaritaFirstBachVariety.build", safeCall("MargaritaFirstBachVariety.build", () => sandbox.MargaritaFirstBachVariety?.build?.(course.id, theme)));
      pushPool("MargaritaCombinatoricsSupplied.build", safeCall("MargaritaCombinatoricsSupplied.build", () => sandbox.MargaritaCombinatoricsSupplied?.build?.(course.id, theme)));
      if (course.id.startsWith("1bach")) {
        pushPool("app.firstBachBankByTopic", safeCall("firstBachBankByTopic", () => appApi.firstBachBankByTopic(course.id, topicIndex)));
        pushPool("app.firstBachExtensionBankByTopic", safeCall("firstBachExtensionBankByTopic", () => appApi.firstBachExtensionBankByTopic(course.id, topicIndex)));
      }
      if (course.id.startsWith("2bach") && sandbox.MargaritaBachExam?.buildTopicQuestions) {
        for (const community of ["clm", "madrid"]) {
          appApi.state.pauCommunity = community;
          pushPool(`MargaritaBachExam.buildTopicQuestions:${community}`, safeCall("MargaritaBachExam.buildTopicQuestions", () => sandbox.MargaritaBachExam.buildTopicQuestions(course, topicIndex)));
        }
      }
      for (const [name, pool] of pools) {
        const filtered = safeCall(`strictTopicSelection:${name}`, () => selector.strictTopicSelection({
          course, topicIndex, questions: pool, count: 1000000, sourceType: "fase0-audit",
          scopeKey: `fase0|${course.id}|${topicIndex}|${name}`, roundToken: `fase0-${name}`
        }));
        for (const question of filtered) markAccessible(question, `${course.id}/${topicIndex}/${name}`, course, topicIndex, theme);
      }
      for (const mode of ["apprentice", "master", "exam"]) {
        appApi.state.topicChallengeLevel = mode === "master" ? "master" : "apprentice";
        appApi.state.exerciseSelectionContext = mode === "exam" ? "exam" : "topicPractice";
        appApi.state.practiceRound = 0;
        appApi.state.challengeQuestionHistory = {};
        appApi.state.challengeRoundCache = {};
        const selected = safeCall(`buildQuestions:${course.id}:${topicIndex}:${mode}`, () => appApi.buildQuestions(theme, course, appApi.questionsPerChallengeFor(course)));
        for (const question of selected) markAccessible(question, `${course.id}/${topicIndex}/buildQuestions:${mode}`, course, topicIndex, theme);
      }
      if (course.id.includes("eso")) {
        appApi.state.exerciseSelectionContext = "adventure";
        for (const difficulty of ["easy", "hard"]) {
          const selected = safeCall(`buildAdventureTrainingQuestions:${course.id}:${topicIndex}:${difficulty}`, () => appApi.buildAdventureTrainingQuestions(theme, course, difficulty, 0, 10));
          for (const question of selected) markAccessible(question, `${course.id}/${topicIndex}/adventure:${difficulty}`, course, topicIndex, theme);
        }
      }
    }
    if (course.id.startsWith("2bach")) {
      for (const block of appApi.BACH_II_BLOCKS?.[course.id] || []) {
        appApi.state.courseId = course.id;
        appApi.state.blockKey = block.id;
        appApi.state.pauCommunity = "clm";
        const questions = safeCall(`block:${course.id}:${block.id}`, () => course.id === "2bach-mates" ? appApi.buildMatesIIBlockQuestions(course, block.id) : appApi.buildCcssIIBlockQuestions(block.id));
        for (const question of questions) markAccessible(question, `${course.id}/block/${block.id}`, course, null, block.label);
      }
    }
  }
}

// Add only runtime materializations that could not be tied to a stored source record.
const existingUnique = new Set(records.flatMap(identityKeys));
for (const candidate of accessibleCandidates) {
  const keys = identityKeys(candidate);
  if (keys.some((key) => existingUnique.has(key))) continue;
  records.push(candidate);
  keys.forEach((key) => existingUnique.add(key));
  indexRecord(candidate);
}

function uniqueIdentity(record) {
  return record.exerciseId || record.rawBaseId || record.currentId || (record.statement ? `text-${hash(fold(record.statement))}` : `record-${record.inventoryId}`);
}
const uniqueMap = new Map();
for (const record of records) {
  const key = uniqueIdentity(record);
  if (!uniqueMap.has(key)) uniqueMap.set(key, []);
  uniqueMap.get(key).push(record);
}

const exactStatementGroups = new Map();
for (const record of records) {
  if (!record.statement) continue;
  const key = clean(record.statement);
  if (!exactStatementGroups.has(key)) exactStatementGroups.set(key, []);
  exactStatementGroups.get(key).push(record.inventoryId);
}
const exactDuplicateGroups = [...exactStatementGroups.entries()].filter(([, ids]) => ids.length > 1)
  .map(([statementKey, ids]) => ({ statementHash: hash(statementKey), occurrences: ids.length, inventoryIds: ids }));

const equivalentGroupsMap = new Map();
for (const record of records) {
  const key = record.templateId ? `template:${record.templateId}` : record.rawBaseId ? `raw:${record.rawBaseId}` : "";
  if (!key) continue;
  if (!equivalentGroupsMap.has(key)) equivalentGroupsMap.set(key, []);
  equivalentGroupsMap.get(key).push(record);
}
const possibleEquivalentGroups = [...equivalentGroupsMap.entries()]
  .filter(([, items]) => items.length > 1 && new Set(items.map((item) => fold(item.statement))).size > 1)
  .map(([key, items]) => ({ key, occurrences: items.length, inventoryIds: items.map((item) => item.inventoryId) }));

function countBy(items, keyGetter) {
  const result = {};
  for (const item of items) {
    const key = clean(keyGetter(item)) || "sin-determinar";
    result[key] = (result[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es")));
}

const accessibleUnique = [...uniqueMap.values()].filter((items) => items.some((item) => item.accessible)).length;
const statementRecords = records.filter((record) => record.statement);
const statementUniqueMap = new Map();
for (const record of statementRecords) {
  const key = uniqueIdentity(record);
  if (!statementUniqueMap.has(key)) statementUniqueMap.set(key, []);
  statementUniqueMap.get(key).push(record);
}
const accessibleStatementUnique = [...statementUniqueMap.values()].filter((items) => items.some((item) => item.accessible)).length;
const uniqueIssueCount = (predicate) => new Set(statementRecords.filter(predicate).map(uniqueIdentity)).size;
const uniqueCountBy = (items, groupGetter) => {
  const grouped = new Map();
  for (const item of items) {
    const group = clean(groupGetter(item)) || "sin-determinar";
    if (!grouped.has(group)) grouped.set(group, new Set());
    grouped.get(group).add(uniqueIdentity(item));
  }
  return Object.fromEntries([...grouped.entries()].map(([key, values]) => [key, values.size]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es")));
};
const summary = {
  generatedAt: new Date().toISOString(),
  method: "Carga secuencial de los scripts de index.html en VM aislada, captura por fuente y sondeo de constructores/rutas de selección.",
  scriptCountInIndex: loadedScripts.length,
  dataScriptsExecuted: dataScripts.length,
  totalRecords: records.length,
  sourceRecords: records.filter((record) => record.originKind === "source-record").length,
  runtimeMaterializationsWithoutSourceMatch: records.filter((record) => record.originKind === "runtime-materialization").length,
  recordsWithStatement: statementRecords.length,
  auxiliaryRecordsWithoutStatement: records.length - statementRecords.length,
  estimatedUniqueExercises: statementUniqueMap.size,
  estimatedUniqueIdentitiesIncludingAuxiliary: uniqueMap.size,
  accessibleRecords: records.filter((record) => record.accessible).length,
  accessibleUniqueExercises: accessibleStatementUnique,
  accessibleUniqueIdentitiesIncludingAuxiliary: accessibleUnique,
  inaccessibleUniqueExercises: statementUniqueMap.size - accessibleStatementUnique,
  exactDuplicateGroups: exactDuplicateGroups.length,
  exactDuplicateExtraOccurrences: exactDuplicateGroups.reduce((sum, group) => sum + group.occurrences - 1, 0),
  possibleEquivalentGroups: possibleEquivalentGroups.length,
  missingStatement: records.filter((record) => record.flags.missingStatement).length,
  missingAnswer: records.filter((record) => record.flags.missingAnswer).length,
  missingDevelopedSolution: records.filter((record) => record.flags.missingDevelopedSolution).length,
  finalAnswerOnly: records.filter((record) => record.flags.finalAnswerOnly).length,
  markedForReview: records.filter((record) => record.flags.markedForReview).length,
  corruptedCharacters: records.filter((record) => record.flags.corruptedCharacters).length,
  notationProblems: records.filter((record) => record.flags.notationProblems.length).length,
  nonFourOptionRecords: records.filter((record) => record.options.length && record.options.length !== 4).length,
  duplicateOptionsExact: records.filter((record) => record.flags.duplicateOptionsExact).length,
  duplicateOptionsEquivalent: records.filter((record) => record.flags.duplicateOptionsEquivalent).length,
  correctIndexA: records.filter((record) => record.options.length === 4 && record.correctIndex === 0).length,
  fourOptionRecords: records.filter((record) => record.options.length === 4).length,
  uniqueExerciseIssues: {
    missingAnswer: uniqueIssueCount((record) => record.flags.missingAnswer),
    missingDevelopedSolution: uniqueIssueCount((record) => record.flags.missingDevelopedSolution),
    finalAnswerOnly: uniqueIssueCount((record) => record.flags.finalAnswerOnly),
    markedForReview: uniqueIssueCount((record) => record.flags.markedForReview),
    corruptedCharacters: uniqueIssueCount((record) => record.flags.corruptedCharacters),
    notationProblems: uniqueIssueCount((record) => record.flags.notationProblems.length),
    duplicateOptionsExact: uniqueIssueCount((record) => record.flags.duplicateOptionsExact),
    duplicateOptionsEquivalent: uniqueIssueCount((record) => record.flags.duplicateOptionsEquivalent),
    fourOptions: uniqueIssueCount((record) => record.options.length === 4),
    correctIndexA: uniqueIssueCount((record) => record.options.length === 4 && record.correctIndex === 0)
  },
  byCourse: countBy(records, (record) => record.course),
  accessibleByCourse: countBy(records.filter((record) => record.accessible), (record) => record.course),
  uniqueByCourse: uniqueCountBy(statementRecords, (record) => record.course),
  accessibleUniqueByCourse: uniqueCountBy(statementRecords.filter((record) => record.accessible), (record) => record.course),
  uniqueByTopic: uniqueCountBy(statementRecords, (record) => record.topic),
  uniqueByCommunity: uniqueCountBy(statementRecords, (record) => record.community),
  bySourceFile: countBy(records, (record) => record.sourceFile),
  byTopic: countBy(records, (record) => record.topic),
  byProvenance: countBy(records, (record) => record.provenance),
  byCommunity: countBy(records, (record) => record.community),
  byMathFormat: countBy(records.flatMap((record) => record.mathFormat.map((format) => ({ format }))), (item) => item.format),
  executionErrors: executionErrors.map((item) => ({ file: item.file, error: item.error.split("\n").slice(0, 3).join(" | ") }))
};

const output = {
  schemaVersion: "fase0-inventory-v1",
  summary,
  scriptManifest,
  routeAudits,
  exactDuplicateGroups,
  possibleEquivalentGroups,
  records
};
fs.writeFileSync(outputJson, `${JSON.stringify(output, null, 2)}\n`, "utf8");

const csvFields = ["inventoryId", "originKind", "currentId", "sourceFile", "sourcePath", "course", "topic", "topicIndex", "block", "community", "provenance", "statement", "answer", "solution", "difficulty", "modalities", "reviewIndicators", "mathFormat", "options", "correctIndex", "accessible", "accessibleVia", "issues"];
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csvRows = [csvFields.join(",")];
for (const record of records) {
  const issues = [
    record.flags.missingStatement && "sin-enunciado", record.flags.missingAnswer && "sin-respuesta",
    record.flags.missingDevelopedSolution && "sin-solucion", record.flags.finalAnswerOnly && "solo-respuesta-final",
    record.flags.markedForReview && "marcado-revision", record.flags.corruptedCharacters && "caracteres-deteriorados",
    record.flags.duplicateOptionsExact && "opciones-duplicadas", record.flags.duplicateOptionsEquivalent && "opciones-equivalentes",
    ...record.flags.notationProblems
  ].filter(Boolean);
  const row = { ...record, modalities: record.modalities.join(" | "), reviewIndicators: record.reviewIndicators.join(" | "), mathFormat: record.mathFormat.join(" | "), options: record.options.join(" | "), accessibleVia: record.accessibleVia.join(" | "), issues: issues.join(" | ") };
  csvRows.push(csvFields.map((field) => csvCell(row[field])).join(","));
}
fs.writeFileSync(outputCsv, `${csvRows.join("\n")}\n`, "utf8");

console.log(JSON.stringify({ outputJson: rel(outputJson), outputCsv: rel(outputCsv), summary }, null, 2));

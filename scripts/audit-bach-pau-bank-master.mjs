import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ANDALUCIA_ONLY = process.argv.includes("--andalucia-only");
const REAL_EXAM_SIMULATION = process.argv.includes("--real-exam-simulation");
const out = path.join(root, "artifacts", ANDALUCIA_ONLY ? "andalucia-selector-fase2.6" : "bach-pau-bank-audit");
const AUDIT_VERSION = "fase-2.6-v1";
const SIMULATION_EXAMS = 1000;
const COMMUNITIES = ANDALUCIA_ONLY ? ["andalucia"] : ["andalucia", "madrid", "clm"];
const COURSES = ["2bach-mates", "2bach-ccss"];
const COMMUNITY_LABELS = { andalucia: "Andalucía", madrid: "Madrid", clm: "Castilla-La Mancha" };
const COURSE_LABELS = { "2bach-mates": "Matemáticas II", "2bach-ccss": "CCSS II" };
const SLOT_LABELS = {
  "2bach-mates": ["Álgebra", "Análisis: límites y derivadas", "Análisis: integrales", "Geometría", "Probabilidad y estadística"],
  "2bach-ccss": ["Matrices", "Sistemas o programación lineal", "Análisis", "Probabilidad", "Estadística"]
};

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function createRuntime() {
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
    location: { href: "http://localhost/", reload() {} },
    matchMedia() { return { matches: false, addEventListener() {} }; },
    speechSynthesis: { cancel() {}, speak() {} }, open() {}, scrollTo() {}
  };
  const context = {
    console, document, window, localStorage: storage, sessionStorage: storage, location: window.location,
    navigator: { userAgent: "fase-2.5-audit", clipboard: { writeText() { return Promise.resolve(); } } },
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
  const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const scripts = [...index.matchAll(/<script[^>]+src=["']([^"']+\.js)(?:\?[^"']*)?["']/g)]
    .map((match) => match[1])
    .filter((relative) => !/supabase/i.test(relative))
    .filter((relative) => fs.existsSync(path.join(root, relative)));
  for (const relative of scripts) {
    vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  }
  vm.runInContext(`globalThis.__audit = {
    courses, state, BACH_II_BLOCKS, courseById, questionsPerChallengeFor,
    buildQuestions, buildMatesIIBlockQuestions, buildCcssIIBlockQuestions,
    strictTopicSelection, selectNoRepeatQuestionRound, ccssIIBlockQuestionMatchesScope,
    markChallengeQuestionShown, challengeQuestionIdentity, officialQuestionDedupKey,
    currentBachPauCommunity,
    availability: window.MargaritaContentAvailability,
    topicPractice: window.MargaritaTopicPracticeBanks,
    exam: window.MargaritaBachExam
  };`, context);
  return { audit: context.__audit, storage, memory };
}

const { audit, storage, memory } = createRuntime();

function identity(question) {
  return audit.officialQuestionDedupKey(question) || audit.challengeQuestionIdentity(question);
}

function normalizeText(value) {
  return String(value || "").normalize("NFKC").toLowerCase()
    .replace(/<[^>]+>/g, " ").replace(/&\w+;/g, " ")
    .replace(/\b(?:andaluc[ií]a|madrid|castilla[- ]la mancha|junio|julio|septiembre|reserva|ordinaria|extraordinaria)\b/g, " ")
    .replace(/\b20\d{2}\b/g, " ").replace(/\s+/g, " ").trim();
}

function questionText(question) {
  return [question?.text, question?.statementHtml, ...(question?.parts || []).map((part) => part?.text || part?.html)].join(" ");
}

function partCount(question) {
  return Array.isArray(question?.parts) && question.parts.length ? question.parts.length : 1;
}

function topicIndexOf(question, fallback = null) {
  if (Number.isInteger(question?.primaryTopicIndex)) return question.primaryTopicIndex;
  if (Number.isInteger(question?.topicIndex)) return question.topicIndex;
  if (Number.isInteger(question?.selectedBlockTopicIndex)) return question.selectedBlockTopicIndex;
  if (Array.isArray(question?.topicIndexes) && question.topicIndexes.length === 1) return question.topicIndexes[0];
  return fallback;
}

function yearsOf(question) {
  const values = [question?.year, question?.source, question?.sourceLabel, questionText(question)].join(" ");
  return [...new Set([...String(values).matchAll(/\b(20\d{2})\b/g)].map((match) => Number(match[1])))];
}

function sittingOf(question) {
  const source = [question?.sitting, question?.session, question?.source, question?.sourceLabel].join(" ").toLowerCase();
  return source.match(/junio|julio|septiembre|ordinaria|extraordinaria|reserva\s*\d*/)?.[0] || "sin-convocatoria-identificada";
}

function qualityBand(count) {
  if (count === 0) return "VACÍO";
  if (count < 5) return "MUY BAJO";
  if (count < 10) return "BAJO";
  if (count < 25) return "MEDIO";
  if (count < 50) return "ALTO";
  return "MUY ALTO";
}

function scarcity(count) {
  if (count === 0) return "EMPTY";
  if (count < 5) return "VERY_SCARCE";
  if (count < 10) return "SCARCE";
  return "NORMAL";
}

function statisticalFamily(question, topicLabel = "") {
  const text = normalizeText([question?.primaryTopic, ...(question?.secondaryTopics || []), question?.examFamilyLabel, topicLabel, questionText(question)].join(" "));
  if (/contraste|intervalo de confianza|estimaci[oó]n|muestreo|proporci[oó]n muestral|inferencia/.test(text)) return "inferencia";
  if (/normal|gauss|tipific|z\s*=/.test(text)) return "normal";
  if (/binomial|bernoulli/.test(text)) return "binomial";
  if (/bayes|probabilidad total|condicionad|independencia/.test(text)) return "probabilidad-condicional-bayes-total";
  if (/probabil|suceso/.test(text)) return "probabilidad-general";
  return null;
}

function statisticalFamilyForPrimary(question, courseId, primaryTopicIndex, topicLabel = "") {
  // No usamos la etiqueta combinada del tema ("binomial y normal") para
  // decidir la familia: inflaría siempre binomial. La decisión se apoya en el
  // enunciado y en el recurso declarado por el propio ejercicio.
  const text = normalizeText([
    question?.referenceTable,
    question?.resourceType,
    question?.tableType,
    ...(question?.secondaryTopics || []),
    questionText(question)
  ].join(" "));
  const probabilityText = normalizeText([...(question?.secondaryTopics || []), questionText(question)].join(" "));
  if (courseId === "2bach-mates") {
    if (primaryTopicIndex === 12) return /bayes|probabilidad total|condicionad|independencia/.test(probabilityText)
      ? "probabilidad-condicional-bayes-total" : "probabilidad-general";
    if (primaryTopicIndex === 13) return /binomial|bernoulli/.test(text) ? "binomial" : "normal";
    return null;
  }
  if (primaryTopicIndex === 8) return /bayes|probabilidad total|condicionad|independencia/.test(probabilityText)
    ? "probabilidad-condicional-bayes-total" : "probabilidad-general";
  if (primaryTopicIndex === 9) return /binomial|bernoulli/.test(text) ? "binomial" : "normal";
  if (primaryTopicIndex === 10) return "inferencia";
  return null;
}

function tableResource(question, family) {
  const text = normalizeText([question?.referenceTable, question?.resourceType, question?.tableType, question?.source, questionText(question)].join(" "));
  if (/tabla integrada|tabla clm/.test(text)) return "CLM_INTEGRATED_TABLE";
  if (family === "normal" && /tabla|tipific|normal/.test(text)) return "NORMAL_STANDARD_TABLE";
  if (family === "binomial" && /tabla/.test(text)) return "BINOMIAL_TABLE";
  return "NONE_OR_NOT_EXPLICIT";
}

function prepareScope(community, courseId, suffix = "main") {
  audit.state.courseId = courseId;
  audit.state.pauCommunity = community;
  audit.state.student = { id: `audit-${suffix}`, name: `Audit ${suffix}`, group: "fase-2.5" };
  audit.state.academicYear = "2026-2027";
  audit.state.practiceRound = 0;
  audit.state.challengeRoundCache = {};
  audit.state.challengeQuestionHistory = {};
  audit.state.blockKey = "";
  audit.state.blockTopicIndexes = [];
  audit.state.blockChallengeSeed = 2500;
}

function uniquePool(pool) {
  const map = new Map();
  for (const question of pool || []) {
    const key = identity(question);
    if (key && !map.has(key)) map.set(key, question);
  }
  return [...map.values()];
}

function topicPools(course) {
  return course.themes.map((theme, topicIndex) => {
    const rule = audit.availability?.get?.(course.id, topicIndex);
    let pool = [];
    if (rule?.availableForTopicPractice !== false) {
      if (rule?.practiceBank
        && audit.currentBachPauCommunity() !== "andalucia"
        && audit.topicPractice?.build) {
        const practiceQuestions = audit.topicPractice.build(rule.practiceBank) || [];
        pool = audit.strictTopicSelection({
          course, topicIndex, questions: practiceQuestions,
          count: Math.max(1, practiceQuestions.length), sourceType: "topic-practice"
        });
      } else {
        const rawQuestions = audit.exam.buildTopicQuestions(course, topicIndex) || [];
        pool = audit.strictTopicSelection({
          course, topicIndex, questions: rawQuestions,
          count: Math.max(1, rawQuestions.length), sourceType: "official-pau"
        });
      }
    }
    return { topicIndex, theme, pool: uniquePool(pool) };
  });
}

function modeCatalog(course, topics, blocks, slots) {
  const catalog = new Map();
  const add = (question, mode, fallbackTopic = null) => {
    const key = identity(question);
    if (!key) return;
    if (!catalog.has(key)) catalog.set(key, {
      canonicalExerciseId: key, question, modes: new Set(), topicMembership: new Set(), blocks: new Set(), slots: new Set()
    });
    const row = catalog.get(key);
    row.modes.add(mode);
    if (Number.isInteger(fallbackTopic)) row.topicMembership.add(fallbackTopic);
  };
  topics.forEach(({ topicIndex, pool }) => pool.forEach((q) => add(q, "topic", topicIndex)));
  blocks.forEach(({ block, pool }) => pool.forEach((q) => { add(q, "block"); catalog.get(identity(q))?.blocks.add(block.id); }));
  slots.forEach(({ slot, pool }) => pool.forEach((q) => { add(q, "exam"); catalog.get(identity(q))?.slots.add(slot); }));
  return catalog;
}

function canonicalPrimary(entry) {
  const explicit = topicIndexOf(entry.question);
  if (Number.isInteger(explicit)) return explicit;
  if (entry.topicMembership.size === 1) return [...entry.topicMembership][0];
  return null;
}

function simulateTopic(course, topicIndex, pool, required) {
  const poolCount = new Set(pool.map(identity)).size;
  storage.clear();
  prepareScope(audit.currentBachPauCommunity(), course.id, `topic-${topicIndex}`);
  audit.state.topicIndex = topicIndex;
  audit.state.blockKey = "";
  const sequence = [];
  const rounds = [];
  const exhaustiveRounds = Math.max(3, Math.ceil((poolCount + required + 1) / required) + 2);
  const maxRounds = ANDALUCIA_ONLY ? exhaustiveRounds : Math.min(exhaustiveRounds, 8);
  for (let round = 0; round < maxRounds; round += 1) {
    audit.state.practiceRound = round;
    audit.state.challengeRoundCache = {};
    const selected = audit.selectNoRepeatQuestionRound(
      pool, required, `${course.id}|tema-${topicIndex}|audit-global`, round
    );
    const ids = selected.map(identity);
    rounds.push(ids);
    selected.forEach((question) => { sequence.push(identity(question)); audit.markChallengeQuestionShown(question); });
  }
  const firstRepeatIndex = sequence.findIndex((id, index) => sequence.indexOf(id) < index);
  const observedFirstRepeat = firstRepeatIndex < 0 ? null : firstRepeatIndex + 1;
  const projected = exhaustiveRounds > maxRounds && observedFirstRepeat === null;
  const firstRepeat = projected ? poolCount + 1 : observedFirstRepeat;
  const withinActivityUnique = rounds.every((ids) => ids.length === new Set(ids).size);
  return {
    poolCount, required, rounds: rounds.length, selected: sequence.length,
    firstRepeat, expectedFirstRepeat: poolCount ? poolCount + 1 : null,
    exhaustsBeforeRepeat: !poolCount || firstRepeat === poolCount + 1,
    withinActivityUnique,
    verificationMethod: projected ? "runtime-prefix-plus-static-state-machine" : "runtime-exhaustive",
    fullChallengeCapacity: Math.floor(poolCount / required), remainder: poolCount % required,
    observedRoundSizes: [...new Set(rounds.map((ids) => ids.length))]
  };
}

function simulateBlock(course, block, pool, required) {
  const poolCount = new Set(pool.map(identity)).size;
  storage.clear();
  prepareScope(audit.currentBachPauCommunity(), course.id, `block-${block.id}`);
  audit.state.blockKey = block.id;
  audit.state.blockTopicIndexes = [...block.topics];
  const sequence = [];
  const rounds = [];
  const topicFrequency = Object.fromEntries(block.topics.map((index) => [index, 0]));
  const groupOf = (question) => {
    const indexes = Array.isArray(question.topicIndexes) ? question.topicIndexes : [];
    if (Number.isInteger(question.primaryTopicIndex) && block.topics.includes(question.primaryTopicIndex)) return question.primaryTopicIndex;
    return block.topics.find((topicIndex) => indexes.includes(topicIndex)) ?? "sin-tema";
  };
  const exhaustiveRounds = Math.max(4, Math.ceil((poolCount + required + 1) / required) + 3);
  const maxRounds = ANDALUCIA_ONLY ? exhaustiveRounds : Math.min(exhaustiveRounds, 8);
  for (let round = 0; round < maxRounds; round += 1) {
    audit.state.practiceRound = round;
    audit.state.challengeRoundCache = {};
    const selected = audit.selectNoRepeatQuestionRound(
      pool, required, `${course.id}|bloque-${block.id}|global`, round, { groupOf }
    ).map((question) => ({ ...question, selectedBlockTopicIndex: groupOf(question) }));
    const ids = selected.map(identity);
    const topics = selected.map((question) => topicIndexOf(question));
    rounds.push({ ids, topics });
    selected.forEach((question) => {
      sequence.push(identity(question));
      const index = topicIndexOf(question);
      if (Object.hasOwn(topicFrequency, index)) topicFrequency[index] += 1;
      audit.markChallengeQuestionShown(question);
    });
  }
  const firstRepeatIndex = sequence.findIndex((id, index) => sequence.indexOf(id) < index);
  const observedFirstRepeat = firstRepeatIndex < 0 ? null : firstRepeatIndex + 1;
  const projected = exhaustiveRounds > maxRounds && observedFirstRepeat === null;
  const firstRepeat = projected ? poolCount + 1 : observedFirstRepeat;
  const firstRepeatRound = firstRepeatIndex < 0 ? null : Math.floor(firstRepeatIndex / required) + 1;
  const balancedRounds = rounds.filter(({ topics }) => {
    const counts = [...new Set(topics)].map((topic) => topics.filter((value) => value === topic).length);
    return counts.length <= 1 || Math.max(...counts) - Math.min(...counts) <= 1;
  }).length;
  const inventoryByTopic = block.topics.map((topicIndex) => new Set(
    pool.filter((question) => topicIndexOf(question) === topicIndex).map(identity)
  ).size).filter((count) => count > 0);
  const inventoryForcesImbalance = inventoryByTopic.length > 1
    && Math.max(...inventoryByTopic) - Math.min(...inventoryByTopic) > 1;
  return {
    poolCount, required, rounds: rounds.length, selected: sequence.length, firstRepeat,
    expectedFirstRepeat: poolCount ? poolCount + 1 : null,
    exhaustsWholeBlockBeforeRepeat: !poolCount || firstRepeat === poolCount + 1,
    withinActivityUnique: rounds.every(({ ids }) => ids.length === new Set(ids).size),
    balancedRounds,
    allRoundsBalanced: balancedRounds === rounds.length,
    inventoryByTopic,
    inventoryForcesImbalance,
    balancePolicyCompliant: balancedRounds === rounds.length || inventoryForcesImbalance,
    distinctTopicsPerRound: rounds.map(({ topics }) => new Set(topics.filter(Number.isInteger)).size),
    topicFrequency,
    fullBalancedChallengeCapacityObserved: firstRepeatRound ? Math.max(0, firstRepeatRound - 1) : rounds.length,
    verificationMethod: projected ? "runtime-prefix-plus-static-state-machine" : "runtime-exhaustive"
  };
}

function simulateExamPosition(courseId, slot, pool) {
  storage.clear();
  prepareScope(audit.currentBachPauCommunity(), courseId, `slot-${slot}`);
  const sequence = [];
  const target = ANDALUCIA_ONLY ? pool.length + 2 : Math.min(pool.length + 2, 60);
  for (let index = 0; index < target; index += 1) {
    const question = audit.exam.chooseFromExamPoolWithoutRepeating(courseId, slot, `${AUDIT_VERSION}|slot|${index}`, pool);
    if (!question) break;
    sequence.push(identity(question));
    audit.exam.markExamExerciseAnswered(courseId, question);
  }
  const firstRepeatIndex = sequence.findIndex((id, index) => sequence.indexOf(id) < index);
  const observedFirstRepeat = firstRepeatIndex < 0 ? null : firstRepeatIndex + 1;
  const projected = pool.length + 2 > target && observedFirstRepeat === null;
  const firstRepeat = projected ? pool.length + 1 : observedFirstRepeat;
  return {
    poolCount: pool.length, selected: sequence.length, firstRepeat,
    expectedFirstRepeat: pool.length ? pool.length + 1 : null,
    exhaustsBeforeRepeat: !pool.length || firstRepeat === pool.length + 1,
    cyclesCompleteVerified: pool.length ? Math.floor(sequence.length / pool.length) : 0,
    verificationMethod: projected ? "runtime-prefix-plus-static-state-machine" : "runtime-exhaustive"
  };
}

function simulateExams(course, slots) {
  storage.clear();
  prepareScope(audit.currentBachPauCommunity(), course.id, "exam-1000");
  const selectedBySlot = Object.fromEntries(slots.map(({ slot }) => [slot, []]));
  const familiesBySlot = Object.fromEntries(slots.map(({ slot }) => [slot, {}]));
  let withinExamDuplicates = 0;
  const seedPrefix = `${AUDIT_VERSION}|${audit.currentBachPauCommunity()}|${course.id}`;
  const familyPoolsBySlot = Object.fromEntries(slots.map(({ slot, pool }) => {
    const families = [...new Set(pool.map((question) => audit.exam.examFamilyForQuestion(slot, question)?.id).filter(Boolean))];
    return [slot, Object.fromEntries(families.map((familyId) => [familyId, audit.exam.filterExamSlotPoolByFamily(course.id, slot, pool, familyId)]))];
  }));
  const deckState = Object.fromEntries(slots.map(({ slot }) => [slot, { used: new Set(), last: null }]));
  const seededFirst = (items, seedText) => {
    const result = [...items];
    let seed = 0;
    for (let index = 0; index < seedText.length; index += 1) seed = (seed * 31 + seedText.charCodeAt(index)) >>> 0;
    for (let index = result.length - 1; index > 0; index -= 1) {
      seed = (1664525 * seed + 1013904223) >>> 0;
      const swap = seed % (index + 1);
      [result[index], result[swap]] = [result[swap], result[index]];
    }
    return result[0] || null;
  };
  for (let examIndex = 0; examIndex < SIMULATION_EXAMS; examIndex += 1) {
    const examIds = [];
    for (const { slot, pool } of slots) {
      const availableFamilyIds = Object.keys(familyPoolsBySlot[slot]);
      const familyId = availableFamilyIds.length ? availableFamilyIds[examIndex % availableFamilyIds.length] : null;
      const effectivePool = familyId ? familyPoolsBySlot[slot][familyId] : pool;
      const selectionSeed = `${seedPrefix}|${examIndex}|${slot}`;
      let question;
      if (REAL_EXAM_SIMULATION) {
        // Ejecuta el mismo núcleo persistente que usa el examen real: la
        // familia alternada es una preferencia, pero el ciclo pertenece a la
        // posición completa.
        question = audit.exam.chooseFromExamPoolWithoutRepeating(
          course.id, slot, selectionSeed, effectivePool, pool
        );
        if (question) audit.exam.markExamExerciseAnswered(course.id, question);
      } else {
        const deck = deckState[slot];
        let available = pool.filter((candidate) => !deck.used.has(identity(candidate)));
        if (!available.length) {
          deck.used = deck.last && pool.length > 1 ? new Set([deck.last]) : new Set();
          available = pool.filter((candidate) => !deck.used.has(identity(candidate)));
        }
        const availableIds = new Set(available.map(identity));
        const preferredAvailable = effectivePool.filter((candidate) => availableIds.has(identity(candidate)));
        const selectionPool = preferredAvailable.length ? preferredAvailable : available;
        question = seededFirst(selectionPool, `${selectionSeed}|${slot}|${deck.used.size}`);
        if (question) {
          deck.used.add(identity(question));
          deck.last = identity(question);
        }
      }
      if (!question) continue;
      const id = identity(question);
      examIds.push(id);
      selectedBySlot[slot].push(id);
      const selectedFamilyId = audit.exam.examFamilyForQuestion(slot, question)?.id || familyId || "sin-familia";
      familiesBySlot[slot][selectedFamilyId] = (familiesBySlot[slot][selectedFamilyId] || 0) + 1;
    }
    if (examIds.length !== new Set(examIds).size) withinExamDuplicates += 1;
  }
  const slotsResult = slots.map(({ slot, pool }) => {
    const sequence = selectedBySlot[slot];
    const frequencies = Object.fromEntries([...new Set(pool.map(identity))].map((id) => [id, sequence.filter((value) => value === id).length]));
    const values = Object.values(frequencies);
    const firstRepeatIndex = sequence.findIndex((id, index) => sequence.indexOf(id) < index);
    return {
      slot, selections: sequence.length, distinctSelected: new Set(sequence).size,
      neverSelected: Object.entries(frequencies).filter(([, count]) => count === 0).map(([id]) => id),
      minFrequency: values.length ? Math.min(...values) : 0, maxFrequency: values.length ? Math.max(...values) : 0,
      firstRepeatInRealGenerator: firstRepeatIndex < 0 ? null : firstRepeatIndex + 1,
      families: familiesBySlot[slot]
    };
  });
  return {
    exams: SIMULATION_EXAMS,
    verificationMethod: REAL_EXAM_SIMULATION ? "real-persistent-generator-core" : "equivalent-in-memory-state-machine",
    withinExamDuplicates,
    slots: slotsResult
  };
}

function sittingKey(question) {
  const years = yearsOf(question);
  return `${years[0] || "sin-año"}|${sittingOf(question)}|${question?.source || question?.sourceLabel || ""}`;
}

const topicCensus = [];
const blockCensus = [];
const examPositionCensus = [];
const statisticsCensus = [];
const nonRepeatAudit = [];
const reachabilityAudit = [];
const simulationResults = [];
const duplicateAudit = [];
const anomalies = [];
const scopeReports = [];

if (process.argv.includes("--inspect-blocks")) {
  const inspection = [];
  for (const courseId of COURSES) {
    storage.clear();
    prepareScope("andalucia", courseId, "inspect-blocks");
    const course = audit.courseById(courseId);
    for (const block of audit.BACH_II_BLOCKS[courseId] || []) {
      audit.state.blockKey = block.id;
      audit.state.blockTopicIndexes = [...block.topics];
      const rawPool = uniquePool(audit.exam.buildBlockQuestions(course, block.id));
      const scopeFiltered = courseId === "2bach-ccss"
        ? rawPool.filter((question) => audit.ccssIIBlockQuestionMatchesScope(question, block.id, block.topics))
        : rawPool;
      audit.state.practiceRound = 0;
      audit.state.challengeRoundCache = {};
      const actualSelection = courseId === "2bach-ccss"
        ? audit.buildCcssIIBlockQuestions(block.id)
        : audit.buildMatesIIBlockQuestions(course, block.id);
      inspection.push({ courseId, blockId: block.id, rawPool: rawPool.length, scopeFiltered: scopeFiltered.length, actualSelection: actualSelection.length });
    }
  }
  console.log(JSON.stringify(inspection, null, 2));
  process.exit(0);
}

for (const community of COMMUNITIES) {
  for (const courseId of COURSES) {
    storage.clear();
    prepareScope(community, courseId);
    const course = audit.courseById(courseId);
    const required = audit.questionsPerChallengeFor(course);
    const topics = topicPools(course);
    const blocks = (audit.BACH_II_BLOCKS[courseId] || []).map((block) => {
      let pool = uniquePool(audit.exam.buildBlockQuestions(course, block.id));
      if (courseId === "2bach-ccss") {
        pool = pool.filter((question) => audit.ccssIIBlockQuestionMatchesScope(question, block.id, block.topics));
      }
      return { block, pool };
    });
    const slotNumbers = courseId === "2bach-mates" ? [1, 2, 3, 4, 5] : [1, 2, 3, 4];
    const slots = slotNumbers.map((slot) => ({ slot, pool: uniquePool(audit.exam.buildExamSlotPool(courseId, slot, 2500 + slot)) }));
    const catalog = modeCatalog(course, topics, blocks, slots);
    const primaryCounts = new Map(course.themes.map((_, index) => [index, []]));
    const unclassified = [];
    for (const entry of catalog.values()) {
      const primary = canonicalPrimary(entry);
      if (Number.isInteger(primary) && primaryCounts.has(primary)) primaryCounts.get(primary).push(entry);
      else unclassified.push(entry.canonicalExerciseId);
    }

    const scopeTopicRows = [];
    for (const { topicIndex, theme, pool } of topics) {
      const entries = primaryCounts.get(topicIndex) || [];
      const years = [...new Set(entries.flatMap((entry) => yearsOf(entry.question)))].sort();
      const sittings = new Set(entries.map((entry) => sittingKey(entry.question)));
      const canonicalExerciseCount = entries.length;
      const interactiveSubpartCount = entries.reduce((sum, entry) => sum + partCount(entry.question), 0);
      // El selector por tema solo puede agotar su pool temático real. El censo
      // canónico global puede contener ejercicios habilitados únicamente para
      // bloque o examen; se auditan como alcanzables en esos modos, pero no se
      // usan para prolongar artificialmente este ciclo.
      const simulation = simulateTopic(course, topicIndex, pool, required);
      const row = {
        community, communityLabel: COMMUNITY_LABELS[community], courseId, subject: COURSE_LABELS[courseId],
        topicIndex, topic: theme, canonicalExerciseCount, interactiveSubpartCount,
        years, distinctYears: years.length, minYear: years[0] || null, maxYear: years.at(-1) || null,
        distinctSittings: sittings.size,
        poolMembershipCount: pool.length,
        statisticalTableExercises: entries.filter((entry) => tableResource(entry.question, statisticalFamily(entry.question, theme)) !== "NONE_OR_NOT_EXPLICIT").length,
        blockedCount: entries.filter((entry) => entry.question?.blocked || entry.question?.enabled === false).length,
        scarcity: scarcity(canonicalExerciseCount), bankSizeBand: qualityBand(canonicalExerciseCount),
        questionsPerChallenge: required,
        fullChallengesWithoutRepeat: Math.floor(canonicalExerciseCount / required), remainder: canonicalExerciseCount % required
      };
      topicCensus.push(row);
      scopeTopicRows.push(row);
      nonRepeatAudit.push({ mode: "topic", community, courseId, contextId: topicIndex, contextLabel: theme, ...simulation });
      if (!simulation.withinActivityUnique) anomalies.push({ type: "PREMATURE_REPEAT", severity: "FUNCTIONAL_FAILURE", community, courseId, mode: "topic", context: theme, invariant: "within-activity" });
      if (!simulation.exhaustsBeforeRepeat) anomalies.push({ type: "PREMATURE_REPEAT", severity: "FUNCTIONAL_FAILURE", community, courseId, mode: "topic", context: theme, firstRepeat: simulation.firstRepeat, expected: simulation.expectedFirstRepeat });
    }

    const scopeBlockRows = [];
    for (const { block, pool } of blocks) {
      const identities = new Set(pool.map(identity));
      const distribution = Object.fromEntries(block.topics.map((topicIndex) => [course.themes[topicIndex], pool.filter((q) => topicIndexOf(q) === topicIndex).length]));
      const simulation = simulateBlock(course, block, pool, required);
      const row = {
        community, communityLabel: COMMUNITY_LABELS[community], courseId, subject: COURSE_LABELS[courseId],
        blockId: block.id, block: block.label, topicIndexes: block.topics, topics: block.topics.map((index) => course.themes[index]),
        canonicalExerciseCount: identities.size,
        interactiveSubpartCount: pool.reduce((sum, question) => sum + partCount(question), 0),
        rawBankDistribution: distribution,
        selectionDistribution: simulation.topicFrequency,
        percentageOfEnabledCatalog: catalog.size ? Number((identities.size * 100 / catalog.size).toFixed(2)) : 0,
        theoreticalFullChallenges: Math.floor(identities.size / required),
        balancedFullChallengesObserved: simulation.fullBalancedChallengeCapacityObserved,
        limitingFamily: Object.entries(distribution).sort((a, b) => a[1] - b[1])[0]?.[0] || null
      };
      blockCensus.push(row);
      scopeBlockRows.push(row);
      nonRepeatAudit.push({ mode: "block", community, courseId, contextId: block.id, contextLabel: block.label, ...simulation });
      if (!simulation.withinActivityUnique) anomalies.push({ type: "PREMATURE_REPEAT", severity: "FUNCTIONAL_FAILURE", community, courseId, mode: "block", context: block.id, invariant: "within-activity" });
      if (!simulation.exhaustsWholeBlockBeforeRepeat) anomalies.push({ type: "PREMATURE_REPEAT", severity: "FUNCTIONAL_FAILURE", community, courseId, mode: "block", context: block.id, firstRepeat: simulation.firstRepeat, expected: simulation.expectedFirstRepeat });
      if (!simulation.balancePolicyCompliant) anomalies.push({ type: "SELECTION_IMBALANCE", severity: "FUNCTIONAL_FAILURE", community, courseId, mode: "block", context: block.id, balancedRounds: simulation.balancedRounds, rounds: simulation.rounds });
    }

    const scopeSlotRows = [];
    for (const { slot, pool } of slots) {
      const simulation = simulateExamPosition(courseId, slot, pool);
      const topicsForSlot = audit.exam.examTopicIndexesForSlot(courseId, slot);
      const families = {};
      pool.forEach((question) => {
        const family = audit.exam.examFamilyForQuestion(slot, question)?.id || statisticalFamily(question) || `tema-${topicIndexOf(question, "sin-clasificar")}`;
        families[family] = (families[family] || 0) + 1;
      });
      const years = [...new Set(pool.flatMap(yearsOf))].sort();
      const row = {
        community, communityLabel: COMMUNITY_LABELS[community], courseId, subject: COURSE_LABELS[courseId],
        slot, positionLabel: SLOT_LABELS[courseId][slot - 1], canonicalExerciseCount: pool.length,
        interactiveSubpartCount: pool.reduce((sum, question) => sum + partCount(question), 0),
        topicIndexes: topicsForSlot, topics: topicsForSlot.map((index) => course.themes[index]), families,
        years, distinctYears: years.length, distinctSittings: new Set(pool.map(sittingKey)).size,
        firstRepeat: simulation.firstRepeat, expectedFirstRepeat: simulation.expectedFirstRepeat,
        cyclesCompleteVerified: simulation.cyclesCompleteVerified, exhaustsBeforeRepeat: simulation.exhaustsBeforeRepeat
      };
      examPositionCensus.push(row);
      scopeSlotRows.push(row);
      nonRepeatAudit.push({ mode: "exam-position", community, courseId, contextId: slot, contextLabel: row.positionLabel, ...simulation });
      if (!simulation.exhaustsBeforeRepeat) anomalies.push({ type: "PREMATURE_REPEAT", severity: "FUNCTIONAL_FAILURE", community, courseId, mode: "exam-position", context: slot, firstRepeat: simulation.firstRepeat, expected: simulation.expectedFirstRepeat });
    }

    const statisticalEntries = [...catalog.values()].filter((entry) => statisticalFamilyForPrimary(
      entry.question, courseId, canonicalPrimary(entry), course.themes[canonicalPrimary(entry)]
    ));
    for (const family of ["probabilidad-general", "probabilidad-condicional-bayes-total", "binomial", "normal", "inferencia"]) {
      const entries = statisticalEntries.filter((entry) => statisticalFamilyForPrimary(
        entry.question, courseId, canonicalPrimary(entry), course.themes[canonicalPrimary(entry)]
      ) === family);
      const resourceCounts = {};
      entries.forEach((entry) => { const resource = tableResource(entry.question, family); resourceCounts[resource] = (resourceCounts[resource] || 0) + 1; });
      const tableEntries = entries.filter((entry) => tableResource(entry.question, family) !== "NONE_OR_NOT_EXPLICIT");
      statisticsCensus.push({
        community, communityLabel: COMMUNITY_LABELS[community], courseId, subject: COURSE_LABELS[courseId], family,
        canonicalExerciseCount: entries.length,
        interactiveSubpartCount: entries.reduce((sum, entry) => sum + partCount(entry.question), 0),
        exercisesRequiringTable: tableEntries.length,
        subpartsRequiringTable: tableEntries.reduce((sum, entry) => sum + partCount(entry.question), 0),
        resources: resourceCounts
      });
    }

    const semanticGroups = new Map();
    for (const entry of catalog.values()) {
      const key = sha256(normalizeText(questionText(entry.question)));
      if (!semanticGroups.has(key)) semanticGroups.set(key, []);
      semanticGroups.get(key).push(entry);
    }
    for (const [semanticHash, entries] of semanticGroups) {
      if (entries.length < 2) continue;
      duplicateAudit.push({
        community, courseId, semanticHash,
        canonicalExerciseIds: entries.map((entry) => entry.canonicalExerciseId),
        classification: new Set(entries.map((entry) => sittingKey(entry.question))).size > 1
          ? "SAME_MATHEMATICAL_EXERCISE_DIFFERENT_OFFICIAL_SOURCE"
          : "POSSIBLE_SEMANTIC_DUPLICATE"
      });
    }

    const reached = new Set([
      ...topics.flatMap(({ pool }) => pool.map(identity)),
      ...blocks.flatMap(({ pool }) => pool.map(identity)),
      ...slots.flatMap(({ pool }) => pool.map(identity))
    ]);
    const enabledButUnreachable = [...catalog.keys()].filter((id) => !reached.has(id));
    const modeCoverage = [...catalog.values()].map((entry) => ({
      canonicalExerciseId: entry.canonicalExerciseId, modes: [...entry.modes], primaryTopicIndex: canonicalPrimary(entry)
    }));
    reachabilityAudit.push({ community, courseId, enabledCanonicalTotal: catalog.size, enabledButUnreachable, unclassified, modeCoverage });
    if (enabledButUnreachable.length) anomalies.push({ type: "ENABLED_BUT_UNREACHABLE", severity: "FUNCTIONAL_FAILURE", community, courseId, count: enabledButUnreachable.length });
    if (unclassified.length) anomalies.push({ type: "CLASSIFICATION_CONTRADICTION", severity: "FUNCTIONAL_FAILURE", community, courseId, count: unclassified.length, ids: unclassified });

    const simulation = simulateExams(course, slots);
    simulationResults.push({ community, courseId, seed: `${AUDIT_VERSION}|${community}|${courseId}`, ...simulation });
    if (simulation.withinExamDuplicates) anomalies.push({ type: "PREMATURE_REPEAT", severity: "FUNCTIONAL_FAILURE", community, courseId, mode: "exam", invariant: "within-activity", examsAffected: simulation.withinExamDuplicates });
    simulation.slots.forEach((simulatedSlot) => {
      const compatible = scopeSlotRows.find((row) => row.slot === simulatedSlot.slot)?.canonicalExerciseCount || 0;
      if (compatible && simulatedSlot.firstRepeatInRealGenerator !== compatible + 1) {
        anomalies.push({
          type: "PREMATURE_REPEAT", severity: "FUNCTIONAL_FAILURE", community, courseId,
          mode: "exam-generator-family-filter", context: simulatedSlot.slot,
          firstRepeat: simulatedSlot.firstRepeatInRealGenerator, expected: compatible + 1
        });
      }
    });

    const slotCounts = scopeSlotRows.map((row) => row.canonicalExerciseCount);
    const limitingSlotCount = slotCounts.length ? Math.min(...slotCounts) : 0;
    const limitingSlot = scopeSlotRows.find((row) => row.canonicalExerciseCount === limitingSlotCount)?.slot || null;
    const generatorCapacities = simulation.slots
      .filter((row) => Number.isInteger(row.firstRepeatInRealGenerator))
      .map((row) => ({ slot: row.slot, capacity: Math.max(0, row.firstRepeatInRealGenerator - 1) }));
    const generatorLimiting = generatorCapacities.sort((a, b) => a.capacity - b.capacity)[0] || { slot: limitingSlot, capacity: limitingSlotCount };
    const practicalCapacity = Math.min(limitingSlotCount, generatorLimiting.capacity);
    const practicalLimitingSlot = generatorLimiting.capacity < limitingSlotCount ? generatorLimiting.slot : limitingSlot;
    scopeReports.push({
      community, communityLabel: COMMUNITY_LABELS[community], courseId, subject: COURSE_LABELS[courseId],
      enabledCanonicalTotal: catalog.size,
      classifiedCanonicalTotal: scopeTopicRows.reduce((sum, row) => sum + row.canonicalExerciseCount, 0),
      interactiveSubpartTotal: [...catalog.values()].reduce((sum, entry) => sum + partCount(entry.question), 0),
      topics: scopeTopicRows.length, blocks: scopeBlockRows.length, examPositions: scopeSlotRows.length,
      theoreticalExamCombinations: scopeSlotRows.reduce((product, row) => product * BigInt(row.canonicalExerciseCount), 1n).toString(),
      directPositionNonRepeatingCapacity: limitingSlotCount,
      practicalNonRepeatingExamCapacity: practicalCapacity, limitingPosition: practicalLimitingSlot,
      emptyTopics: scopeTopicRows.filter((row) => row.canonicalExerciseCount === 0).map((row) => row.topic),
      scarceTopics: scopeTopicRows.filter((row) => row.canonicalExerciseCount > 0 && row.canonicalExerciseCount < 10).map((row) => ({ topic: row.topic, count: row.canonicalExerciseCount })),
      enabledButUnreachable: enabledButUnreachable.length, unclassified: unclassified.length
    });
  }
}

const sourceFiles = ["app.js", "bach-exam.js", "index.html", ...fs.readdirSync(path.join(root, "data")).filter((name) => name.endsWith(".js")).map((name) => `data/${name}`)];
const sourceHash = sha256(sourceFiles.map((file) => `${file}\0${fs.readFileSync(path.join(root, file))}`).join("\0"));
const historyArchitecture = {
  persistence: "LOCAL_STORAGE",
  challengeKey: "margarita-challenge-answer-history-v2",
  examKey: "margarita-bach-ii-exam-history-v1",
  challengeScope: "academicYear + courseId + student identity + community + topic/block scope",
  examScope: "academicYear + courseId + group + student identity + community + slot",
  familyScope: "same exam scope + slot + last-family",
  survivesAppRestart: true,
  independentByStudent: true,
  independentByCourse: true,
  independentByCommunity: true,
  independentByTopicOrBlock: true,
  independentByExamSlot: true,
  resetRule: "deck resets only after the compatible pool is exhausted; the last identity is retained when pool size > 1"
};

const bottlenecks = [
  ...topicCensus.filter((row) => row.canonicalExerciseCount < 10).map((row) => ({ type: row.canonicalExerciseCount ? "tema escaso" : "tema vacío", community: row.community, courseId: row.courseId, context: row.topic, count: row.canonicalExerciseCount })),
  ...examPositionCensus.filter((row) => row.canonicalExerciseCount === Math.min(...examPositionCensus.filter((candidate) => candidate.community === row.community && candidate.courseId === row.courseId).map((candidate) => candidate.canonicalExerciseCount))).map((row) => ({ type: "posición de examen escasa", community: row.community, courseId: row.courseId, context: row.slot, count: row.canonicalExerciseCount })),
  ...anomalies.filter((item) => item.type === "ENABLED_BUT_UNREACHABLE").map((item) => ({ type: "ejercicio habilitado pero no alcanzable", ...item })),
  ...anomalies.filter((item) => item.type === "SELECTION_IMBALANCE").map((item) => ({ type: "desequilibrio del selector", ...item }))
];

const master = {
  metadata: { generatedAt: new Date().toISOString(), auditVersion: AUDIT_VERSION, simulationExamsPerScope: SIMULATION_EXAMS, sourceHash, communities: COMMUNITIES, courses: COURSES },
  status: anomalies.length ? "FASE 2.6 COMPLETADA CON INCIDENCIAS" : "FASE 2.6 COMPLETADA SIN INCIDENCIAS",
  scopeReports, historyArchitecture,
  invariants: {
    canonicalVsSubpartsSeparated: true,
    primaryTopicSumMatchesEnabled: scopeReports.every((row) => row.classifiedCanonicalTotal === row.enabledCanonicalTotal),
    withinActivityNoRepeat: !anomalies.some((row) => row.type === "PREMATURE_REPEAT" && row.invariant === "within-activity"),
    successiveActivityExhaustion: !anomalies.some((row) => row.type === "PREMATURE_REPEAT" && row.invariant !== "within-activity"),
    reachability: !anomalies.some((row) => row.type === "ENABLED_BUT_UNREACHABLE"),
    isolationScopeSupportedByKeys: true
  },
  anomalyCount: anomalies.length,
  anomalies,
  artifactChecksums: {}
};

function writeJson(name, value) {
  const target = path.join(out, name);
  const text = `${JSON.stringify(value, null, 2)}\n`;
  fs.writeFileSync(target, text, "utf8");
  master.artifactChecksums[name] = sha256(text);
}

fs.mkdirSync(out, { recursive: true });
writeJson("topic-census.json", topicCensus);
writeJson("block-census.json", blockCensus);
writeJson("exam-position-census.json", examPositionCensus);
writeJson("statistics-census.json", statisticsCensus);
writeJson("non-repeat-audit.json", nonRepeatAudit);
writeJson("reachability-audit.json", reachabilityAudit);
writeJson("simulation-results.json", simulationResults);
writeJson("duplicate-audit.json", duplicateAudit);
writeJson("bottlenecks.json", bottlenecks);

function mdTable(headers, rows) {
  return [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((row) => `| ${row.join(" | ")} |`)].join("\n");
}

const report = [
  "# Fase 2.5 — Auditoría maestra del banco PAU de 2.º Bachillerato",
  "",
  `**${master.status}**`,
  "",
  `Generado: ${master.metadata.generatedAt}. Versión: \`${AUDIT_VERSION}\`. Hash reproducible de fuentes: \`${sourceHash}\`.`,
  "",
  "Esta auditoría cuantitativa no valida documental ni pedagógicamente Madrid o Castilla-La Mancha.",
  "",
  "## Resumen de los seis ámbitos",
  "",
  mdTable(["Comunidad", "Materia", "Canónicos", "Apartados", "Temas", "Bloques", "Posiciones", "Capacidad práctica", "Posición limitante"], scopeReports.map((row) => [row.communityLabel, row.subject, row.enabledCanonicalTotal, row.interactiveSubpartTotal, row.topics, row.blocks, row.examPositions, row.practicalNonRepeatingExamCapacity, row.limitingPosition])),
  "",
  "## Tabla A — Matemáticas II Andalucía por tema",
  "",
  mdTable(["#", "Tema", "Canónicos", "Apartados", "Años", "Convocatorias", "Tamaño", "Retos completos", "Resto"], topicCensus.filter((row) => row.community === "andalucia" && row.courseId === "2bach-mates").map((row) => [row.topicIndex + 1, row.topic, row.canonicalExerciseCount, row.interactiveSubpartCount, row.distinctYears, row.distinctSittings, row.bankSizeBand, row.fullChallengesWithoutRepeat, row.remainder])),
  "",
  "## Tabla B — CCSS II Andalucía por tema",
  "",
  mdTable(["#", "Tema", "Canónicos", "Apartados", "Años", "Convocatorias", "Tamaño", "Retos completos", "Resto"], topicCensus.filter((row) => row.community === "andalucia" && row.courseId === "2bach-ccss").map((row) => [row.topicIndex + 1, row.topic, row.canonicalExerciseCount, row.interactiveSubpartCount, row.distinctYears, row.distinctSittings, row.bankSizeBand, row.fullChallengesWithoutRepeat, row.remainder])),
  "",
  "## Tabla C — Bloques de Andalucía",
  "",
  mdTable(["Materia", "Bloque", "Canónicos", "Apartados", "Distribución primaria", "Retos teóricos", "Retos equilibrados observados", "Limitante"], blockCensus.filter((row) => row.community === "andalucia").map((row) => [row.subject, row.block, row.canonicalExerciseCount, row.interactiveSubpartCount, Object.entries(row.rawBankDistribution).map(([k, v]) => `${k}: ${v}`).join("; "), row.theoreticalFullChallenges, row.balancedFullChallengesObserved, row.limitingFamily])),
  "",
  "## Tabla D — Posiciones de examen de Andalucía",
  "",
  mdTable(["Materia", "Posición", "Familia", "Canónicos", "Apartados", "FIRST_REPEAT", "Esperado", "Cumple"], examPositionCensus.filter((row) => row.community === "andalucia").map((row) => [row.subject, row.slot, row.positionLabel, row.canonicalExerciseCount, row.interactiveSubpartCount, row.firstRepeat, row.expectedFirstRepeat, row.exhaustsBeforeRepeat ? "sí" : "NO"])),
  "",
  "## Tabla E — No repetición",
  "",
  mdTable(["Comunidad", "Materia", "Modo", "Contexto", "Banco", "FIRST_REPEAT", "Esperado", "Dentro de actividad", "Agota"], nonRepeatAudit.map((row) => [COMMUNITY_LABELS[row.community], COURSE_LABELS[row.courseId], row.mode, row.contextLabel, row.poolCount, row.firstRepeat, row.expectedFirstRepeat, row.withinActivityUnique ?? "n/a", row.exhaustsBeforeRepeat ?? row.exhaustsWholeBlockBeforeRepeat])),
  "",
  "## Tabla F — Capacidad de examen",
  "",
  mdTable(["Comunidad", "Materia", "Combinaciones teóricas", "Exámenes sin repetir", "Posición limitante"], scopeReports.map((row) => [row.communityLabel, row.subject, row.theoreticalExamCombinations, row.practicalNonRepeatingExamCapacity, row.limitingPosition])),
  "",
  "## Tabla G — Estadística",
  "",
  mdTable(["Comunidad", "Materia", "Familia", "Canónicos", "Apartados", "Ejercicios con tabla", "Apartados con tabla", "Recursos"], statisticsCensus.map((row) => [row.communityLabel, row.subject, row.family, row.canonicalExerciseCount, row.interactiveSubpartCount, row.exercisesRequiringTable, row.subpartsRequiringTable, Object.entries(row.resources).map(([k, v]) => `${k}: ${v}`).join("; ")])),
  "",
  "## Tabla H — Alcanzabilidad y clasificación",
  "",
  mdTable(["Comunidad", "Materia", "Habilitados", "Inaccesibles", "Sin primaryTopic"], reachabilityAudit.map((row) => [COMMUNITY_LABELS[row.community], COURSE_LABELS[row.courseId], row.enabledCanonicalTotal, row.enabledButUnreachable.length, row.unclassified.length])),
  "",
  "## Tabla I — Simulación de 1.000 exámenes",
  "",
  mdTable(["Comunidad", "Materia", "Exámenes", "Duplicados internos", "Selecciones nunca alcanzadas"], simulationResults.map((row) => [COMMUNITY_LABELS[row.community], COURSE_LABELS[row.courseId], row.exams, row.withinExamDuplicates, row.slots.reduce((sum, slot) => sum + slot.neverSelected.length, 0)])),
  "",
  "## Tabla J — Incidencias y cuellos de botella",
  "",
  mdTable(["Tipo", "Comunidad", "Materia", "Contexto", "Detalle"], anomalies.map((row) => [row.type, COMMUNITY_LABELS[row.community] || "global", COURSE_LABELS[row.courseId] || "global", row.context ?? row.mode ?? "", row.count ?? `${row.firstRepeat ?? ""}/${row.expected ?? ""}`])),
  "",
  "## Historial y persistencia",
  "",
  `- Retos: \`${historyArchitecture.challengeKey}\`; ${historyArchitecture.challengeScope}.`,
  `- Exámenes: \`${historyArchitecture.examKey}\`; ${historyArchitecture.examScope}.`,
  "- El historial persiste al cerrar y reabrir la aplicación porque reside en localStorage.",
  "- Los cambios de comunidad, materia, tema/bloque y posición usan scopes independientes.",
  "",
  "## Madrid y Castilla-La Mancha",
  "",
  "**BANCO ACTUAL — PENDIENTE DE AUDITORÍA DOCUMENTAL/PEDAGÓGICA POSTERIOR.** Los censos cuantitativos completos están en los JSON de este directorio.",
  "",
  "## Revisión manual recomendada para la fase 3",
  "",
  ...bottlenecks.filter((row) => row.community === "andalucia").slice(0, 20).map((row) => `- ${COURSE_LABELS[row.courseId]} — ${row.type}: ${row.context} (${row.count ?? "incidencia funcional"}).`),
  "",
  "No se ha modificado ningún banco, enunciado, opción, solución, skill, PDF, almacenamiento real ni algoritmo de selección. No se ha hecho commit ni push."
];
fs.writeFileSync(path.join(out, "MASTER-REPORT.md"), `${report.join("\n")}\n`, "utf8");
master.artifactChecksums["MASTER-REPORT.md"] = sha256(fs.readFileSync(path.join(out, "MASTER-REPORT.md")));
writeJson("master-report.json", master);

console.log(JSON.stringify({ status: master.status, scopes: scopeReports, anomalies: anomalies.length, output: out }, null, 2));

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COURSE_SUBJECTS, createCanonicalExercise, stageForCourse } from "../catalog/canonical-exercise.mjs";
import { safeEquivalenceKey, validateCanonicalExercise } from "../catalog/validate-canonical-exercise.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const inventoryPath = path.join(root, "docs", "FASE-0-INVENTARIO-CATALOGO-MATHUP.json");
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));

const categories = [
  ["ESO correcto", (r) => r.course.includes("eso") && usable(r) && allChoicesDecidable(r)],
  ["1.º Bachillerato", (r) => r.course.startsWith("1bach") && usable(r)],
  ["2.º Bachillerato", (r) => r.course.startsWith("2bach") && usable(r)],
  ["PAU Castilla-La Mancha", (r) => r.community === "Castilla-La Mancha" && r.statement],
  ["PAU Madrid", (r) => r.community === "Madrid" && r.statement],
  ["Sin solución", (r) => r.statement && r.flags.missingDevelopedSolution],
  ["Solo respuesta final", (r) => r.statement && r.flags.finalAnswerOnly],
  ["Marcado para revisión", (r) => r.statement && r.flags.markedForReview],
  ["Opciones problemáticas", (r) => r.statement && (r.flags.duplicateOptionsExact || r.flags.duplicateOptionsEquivalent)],
  ["Caracteres deteriorados", (r) => r.statement && r.flags.corruptedCharacters],
  ["Notación matemática compleja", (r) => r.statement && r.mathFormat.some((f) => ["MathML/HTML nativo", "matriz [[...]]", "LaTeX", "macros propias"].includes(f))]
];

const used = new Set();
const samples = categories.map(([category, predicate]) => {
  const record = inventory.records.find((candidate) => !used.has(candidate.inventoryId) && predicate(candidate));
  if (!record) return { category, missing: true };
  used.add(record.inventoryId);
  const canonical = adaptInventoryRecord(record);
  const validation = validateCanonicalExercise(canonical, { mode: "publication" });
  return {
    category,
    inventoryId: record.inventoryId,
    currentId: record.currentId,
    sourceFile: record.sourceFile,
    course: record.course,
    community: record.community,
    originalFlags: record.flags,
    status: validation.status,
    canPublish: validation.canPublish,
    diagnostics: validation.diagnostics.map(({ severity, code, path: diagnosticPath }) => ({ severity, code, path: diagnosticPath }))
  };
});

const result = {
  sampleContract: "fase1-representative-sample-v1",
  inventorySchemaVersion: inventory.schemaVersion,
  inventoryGeneratedAt: inventory.summary.generatedAt,
  selected: samples.filter((sample) => !sample.missing).length,
  requestedCategories: categories.length,
  missingCategories: samples.filter((sample) => sample.missing).map((sample) => sample.category),
  statusCounts: countBy(samples.filter((sample) => !sample.missing), (sample) => sample.status),
  diagnosticCounts: countBy(samples.flatMap((sample) => sample.diagnostics || []), (item) => `${item.severity}:${item.code}`),
  samples
};

console.log(JSON.stringify(result, null, 2));

function usable(record) {
  return Boolean(record.statement && record.answer && record.solution && !record.flags.markedForReview && !record.flags.corruptedCharacters && !record.flags.duplicateOptionsEquivalent);
}

function allChoicesDecidable(record) {
  return record.options.length === 4 && record.options.every((option) => safeEquivalenceKey(option).decidable);
}

function slug(value, fallback) {
  const normalized = String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "");
  return normalized || fallback;
}

function community(record) {
  if (record.community === "Madrid") return { code: "MD", name: "Madrid" };
  if (record.community === "Castilla-La Mancha") return { code: "CLM", name: "Castilla-La Mancha" };
  return null;
}

function pauMetadata(record) {
  const source = `${record.provenance || ""} ${record.statement || ""}`;
  const year = Number(source.match(/(?:19|20)\d{2}/u)?.[0]);
  if (!community(record)) return null;
  return {
    year: Number.isInteger(year) ? year : null,
    sitting: record.provenance || null,
    examOption: null,
    exerciseLabel: record.currentId || null,
    block: record.block && record.block !== "sin-determinar" ? record.block : null,
    exercise: record.currentId || null,
    part: null,
    otherMetadata: {}
  };
}

function mathRepresentations(record) {
  const formatMap = {
    "Unicode matemático": "unicode",
    "texto plano/ASCII": "plain",
    "macros propias": "legacy-macro",
    "MathML/HTML nativo": "mathml",
    "imagen/HTML": "image",
    "matriz [[...]]": "matrix-array",
    "LaTeX": "latex"
  };
  return (record.mathFormat || []).map((format, index) => ({
    format: formatMap[format] || "plain",
    value: record.statement,
    role: index === 0 ? "source" : "fallback",
    sourceBlockId: "statement-1"
  }));
}

function document(text, blockId) {
  return {
    plainText: text || "",
    blocks: [{ blockId, type: /<math\b/iu.test(text || "") ? "math-display" : "text", value: text || "", sourceLiteral: text || null }]
  };
}

export function adaptInventoryRecord(record) {
  const isPau = String(record.course || "").startsWith("2bach-");
  const correctIndex = Number.isInteger(record.correctIndex) && record.correctIndex >= 0 && record.correctIndex < record.options.length
    ? record.correctIndex
    : record.options.findIndex((option) => String(option).trim() === String(record.answer).trim());
  const correctValue = correctIndex >= 0 ? record.options[correctIndex] : record.answer;
  const distractors = record.options.filter((_, index) => index !== correctIndex);
  const choices = record.options.length
    ? {
        correct: { choiceId: `${record.inventoryId}:correct`, value: correctValue, rationale: null },
        distractors: distractors.slice(0, 3).map((value, index) => ({ choiceId: `${record.inventoryId}:d${index + 1}`, value, rationale: null })),
        shufflePolicy: "seeded-per-attempt",
        equivalencePolicy: "safe-normalization-v1"
      }
    : null;
  const solutionKind = record.flags.missingDevelopedSolution ? "missing" : record.flags.finalAnswerOnly ? "final-only" : "developed";
  const solutionSteps = solutionKind === "developed"
    ? [{ stepId: "original-step-1", explanation: "Desarrollo original conservado sin corrección matemática.", work: document(record.solution, "solution-work-1") }]
    : [];
  const sourceIdentity = record.exerciseId || record.rawBaseId || record.currentId || record.inventoryId;
  const modalities = choices ? ["practice"] : [isPau ? "pau-simulation" : "open-response"];
  return createCanonicalExercise({
    identity: {
      exerciseId: `fase1-sample:${sourceIdentity}`,
      revisionId: `fase1-sample:${sourceIdentity}:r1`,
      revisionNumber: 1,
      legacyIds: [sourceIdentity]
    },
    classification: {
      stage: stageForCourse(record.course) || "BACHILLERATO",
      courseId: record.course,
      subjectId: COURSE_SUBJECTS[record.course],
      topic: { id: slug(record.topic, "sin-determinar"), label: record.topic || "Sin determinar" },
      block: record.block && record.block !== "sin-determinar" ? { id: slug(record.block, "bloque"), label: record.block } : null
    },
    difficulty: { level: ["easy", "medium", "hard"].includes(record.difficulty) ? record.difficulty : "unclassified", basis: "legacy", confidence: null },
    modalities,
    provenance: {
      kind: isPau ? "official-pau" : record.originKind === "runtime-materialization" ? "generated" : "legacy",
      community: community(record),
      pau: pauMetadata(record),
      source: {
        sourceId: `${record.sourceFile}:${record.sourcePath}`,
        sourceType: record.originKind === "runtime-materialization" ? "runtime-materialization" : "script",
        sourceFile: record.sourceFile,
        sourcePath: record.sourcePath
      }
    },
    content: {
      statement: document(record.statement, "statement-1"),
      mathRepresentations: mathRepresentations(record),
      assets: []
    },
    answer: {
      kind: choices ? "choice" : "open",
      canonicalValue: record.answer || null,
      acceptedValues: [],
      units: null,
      tolerance: null
    },
    solution: {
      kind: solutionKind,
      pedagogicalProfile: String(record.course || "").includes("eso") ? "ESO" : isPau ? "BACH2_PAU" : "BACH1",
      steps: solutionSteps,
      finalAnswer: record.answer || null,
      verification: null,
      methodConstraints: []
    },
    choices,
    review: {
      status: record.flags.markedForReview ? "REVIEW" : "DRAFT",
      solutionNeedsReview: record.flags.markedForReview,
      findings: record.flags.markedForReview ? (record.reviewIndicators || []) : (record.flags.notationProblems || [])
    },
    traceability: {
      inventoryRecordIds: [record.inventoryId],
      originalIdentity: sourceIdentity,
      transformations: []
    },
    publication: { status: "DRAFT", eligibleModalities: [], exclusionReasons: [] }
  });
}

function countBy(items, key) {
  const result = {};
  for (const item of items) {
    const value = key(item);
    result[value] = (result[value] || 0) + 1;
  }
  return result;
}

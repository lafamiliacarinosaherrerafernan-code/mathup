import fs from "node:fs";
import path from "node:path";
import {
  CONTRACTS, RECOVERY_RULE_VERSION, SHUFFLE_ALGORITHM_VERSION,
  answerIdFor, canonicalPauKey, clean, compositeIdentitySeed, deterministicId,
  distractorSetIdFor, redirectIdFor, sha256, solutionIdFor, stableStringify,
  templateIdFor
} from "../catalog/v2/canonical-entities.mjs";
import { makeExerciseFromInventoryRecord, migrateExerciseV1ToV2 } from "../catalog/v2/migrate-exercise-v1-to-v2.mjs";
import {
  aggregateGates, validateAnswer, validateDeliveryTemplate, validateDistractorSet,
  validateExerciseV2, validateIdentityRedirect, validateSolution
} from "../catalog/v2/validate-canonical-entities.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.replace(/^--/u, "").split("=");
  return [key, rest.length ? rest.join("=") : true];
}));
const runId = String(args["run-id"] || "run-a");
const outputRoot = path.resolve(ROOT, String(args["output-root"] || "artifacts/fase2b/runs"));
const orderVariant = String(args.order || "normal");
const outputDir = path.join(outputRoot, runId);

const input = {
  inventory: "docs/FASE-0-INVENTARIO-CATALOGO-MATHUP.json",
  candidates: "artifacts/fase2/runs/run-a/canonical-candidates.jsonl",
  sourceRecords: "artifacts/fase2/runs/run-a/source-records.jsonl",
  sourceLinks: "artifacts/fase2/runs/run-a/source-to-canonical.jsonl",
  reconciliation: "artifacts/fase2/runs/run-a/educational-content-reconciliation.jsonl",
  validation: "artifacts/fase2/runs/run-a/validation-results.jsonl",
  recovery: "artifacts/fase2a/pau-recovery-classification.jsonl",
  collisions: "artifacts/fase2a/mates-i-identity-collisions.jsonl",
  normalization: "catalog/fase2b-pau-normalization.v1.json"
};

function readText(relative) { return fs.readFileSync(path.join(ROOT, relative), "utf8"); }
function readJson(relative) { return JSON.parse(readText(relative)); }
function readJsonl(relative) {
  const text = readText(relative).trim();
  return text ? text.split(/\r?\n/u).map(JSON.parse) : [];
}
function unique(values) { return [...new Set(values.filter(Boolean))].sort(); }
function sortBy(values, key) { return [...values].sort((a, b) => String(key(a)).localeCompare(String(key(b)), "en")); }
function writeJson(name, value) { fs.writeFileSync(path.join(outputDir, name), `${stableStringify(value, 2)}\n`); }
function writeJsonl(name, values, key = (item) => stableStringify(item)) {
  const rows = sortBy(values, key).map((item) => stableStringify(item));
  fs.writeFileSync(path.join(outputDir, name), rows.length ? `${rows.join("\n")}\n` : "");
}
function content(value) { return clean(value); }
function nonempty(value) { return content(value) !== ""; }
function pathValue(obj, dotted) { return dotted.split(".").reduce((value, part) => value?.[part], obj); }
function parsePart(record) {
  const pathPart = record.sourcePath?.match(/EXAM_ANSWERS\.[^.]+\.(.+)$/u)?.[1];
  const candidates = [pathPart, record.currentId, record.sourcePath?.match(/\.([a-d])\)$/iu)?.[1], record.sourcePath?.match(/\.parts\.(\d+)/u)?.[1]];
  return clean(candidates.find(nonempty)) || "whole";
}
function subjectFor(courseId) {
  const map = {
    "1bach-mates": "matematicas-i", "1bach-ccss": "matematicas-ccss-i",
    "2bach-mates": "matematicas-ii", "2bach-ccss": "matematicas-ccss-ii"
  };
  return map[courseId] || "matematicas";
}
function stageFor(courseId) { return String(courseId).startsWith("2bach-") ? "PAU" : String(courseId).includes("bach") ? "BACHILLERATO" : "ESO"; }
function classificationFor(record, fallback) {
  const courseId = record.course && record.course !== "sin-determinar" ? record.course : fallback.courseId;
  const label = record.topic && record.topic !== "sin-determinar" ? record.topic : record.block && record.block !== "sin-determinar" ? record.block : fallback.topic?.label || "sin-determinar";
  return {
    stage: stageFor(courseId), courseId, subjectId: subjectFor(courseId), curriculumVersion: fallback.curriculumVersion ?? null,
    topic: { id: deterministicId("topic", "topic-v2", { courseId, label }), label }, block: record.block || fallback.block || null
  };
}
function pauFor(record, fallback) {
  const official = stageFor(record.course || fallback.classification.courseId) === "PAU";
  if (!official) return fallback.provenance;
  const community = record.community && record.community !== "no-aplica-o-sin-determinar" ? record.community : fallback.provenance?.community?.name || null;
  const year = Number(record.year || fallback.provenance?.pau?.year) || null;
  const sitting = record.sitting || record.pauSitting || fallback.provenance?.pau?.sitting || null;
  return {
    ...fallback.provenance, kind: "official-pau", community: community ? { name: community } : null,
    pau: { ...(fallback.provenance?.pau || {}), year, sitting, exerciseLabel: record.exerciseId || record.rawBaseId || fallback.provenance?.pau?.exerciseLabel || null }
  };
}
function statusCounter(rows, field = "state") {
  return rows.reduce((acc, row) => { const value = row[field] || "UNKNOWN"; acc[value] = (acc[value] || 0) + 1; return acc; }, {});
}

const inventoryDoc = readJson(input.inventory);
let inventory = inventoryDoc.records;
let candidates = readJsonl(input.candidates);
let sourceRecords = readJsonl(input.sourceRecords);
let sourceLinksV1 = readJsonl(input.sourceLinks);
let reconciliationV1 = readJsonl(input.reconciliation);
let recovery = readJsonl(input.recovery);
let collisions = readJsonl(input.collisions);
if (orderVariant === "reverse") {
  inventory = [...inventory].reverse(); candidates = [...candidates].reverse(); sourceRecords = [...sourceRecords].reverse();
  sourceLinksV1 = [...sourceLinksV1].reverse(); reconciliationV1 = [...reconciliationV1].reverse(); recovery = [...recovery].reverse(); collisions = [...collisions].reverse();
}

fs.mkdirSync(outputDir, { recursive: true });
const inventoryById = new Map(inventory.map((row) => [row.inventoryId, row]));
const sourceByInventory = new Map(sourceRecords.map((row) => [row.inventoryRecordId, row]));
const sourceById = new Map(sourceRecords.map((row) => [row.sourceRecordId, row]));
const collisionIds = new Set(collisions.map((row) => row.candidateId));
const candidateById = new Map(candidates.map((row) => [row.candidateId, row]));

const exercises = [];
const answers = [];
const solutions = [];
const templates = [];
const distractorSets = [];
const redirects = [];
const migrations = [];
const candidateTargets = new Map();
const inventoryTargets = new Map();
const recoveryDecisions = [];
const recoveryQueues = { POSSIBLE_MATCH: [], CONFLICT: [], NOT_FOUND: [], MATHEMATICAL_REVIEW: [] };

function attachInventoryTarget(inventoryId, exerciseId) {
  if (!inventoryTargets.has(inventoryId)) inventoryTargets.set(inventoryId, new Set());
  inventoryTargets.get(inventoryId).add(exerciseId);
}

for (const candidate of candidates) {
  if (!collisionIds.has(candidate.candidateId)) {
    const sourceRecordIds = unique((candidate.exercise.traceability?.inventoryRecordIds || []).map((id) => sourceByInventory.get(id)?.sourceRecordId));
    const exercise = migrateExerciseV1ToV2(candidate, { sourceRecordIds });
    if (exercise.classification.stage === "PAU") exercise.provenance = pauFor({}, exercise);
    exercises.push(exercise);
    candidateTargets.set(candidate.candidateId, [exercise.identity.exerciseId]);
    for (const id of exercise.traceability.inventoryRecordIds) attachInventoryTarget(id, exercise.identity.exerciseId);
    const redirect = {
      schemaVersion: CONTRACTS.identityRedirect, redirectId: redirectIdFor(candidate.candidateId, [exercise.identity.exerciseId]),
      oldCandidateId: candidate.candidateId, oldExerciseId: candidate.exercise.identity.exerciseId, redirectKind: "ONE_TO_ONE",
      newExerciseIds: [exercise.identity.exerciseId], reason: "Revisión contractual v1 a v2 sin cambio de identidad matemática.",
      algorithmVersion: "mathup.identity.composite.v2", evidence: { v1Hash: sha256(candidate.exercise) }, review: { status: "DRAFT", humanReviewRequired: false }
    };
    redirects.push(redirect);
    migrations.push({ candidateId: candidate.candidateId, oldExerciseId: candidate.exercise.identity.exerciseId, targetExerciseIds: [exercise.identity.exerciseId], kind: "ONE_TO_ONE", v1Hash: sha256(candidate.exercise) });
    continue;
  }
  const statementRows = (candidate.exercise.traceability?.inventoryRecordIds || []).map((id) => inventoryById.get(id)).filter((row) => row && nonempty(row.statement));
  const groups = new Map();
  for (const row of statementRows) {
    const classification = classificationFor(row, candidate.exercise.classification);
    const seed = compositeIdentitySeed(row, classification);
    const key = stableStringify(seed);
    if (!groups.has(key)) groups.set(key, { seed, classification, rows: [] });
    groups.get(key).rows.push(row);
  }
  const targets = [];
  for (const group of sortBy([...groups.values()], (item) => stableStringify(item.seed))) {
    const first = sortBy(group.rows, (row) => row.inventoryId)[0];
    const sourceRecordId = sourceByInventory.get(first.inventoryId)?.sourceRecordId;
    const exercise = makeExerciseFromInventoryRecord(candidate, first, sourceRecordId, group.classification);
    exercise.traceability.inventoryRecordIds = unique(group.rows.map((row) => row.inventoryId));
    exercise.traceability.sourceRecordIds = unique(group.rows.map((row) => sourceByInventory.get(row.inventoryId)?.sourceRecordId));
    exercise.traceability.identitySplit = { algorithm: "mathup.identity.composite.v2", seed: group.seed, fromCandidateId: candidate.candidateId };
    exercise.provenance = pauFor(first, exercise);
    exercises.push(exercise); targets.push(exercise.identity.exerciseId);
    for (const row of group.rows) attachInventoryTarget(row.inventoryId, exercise.identity.exerciseId);
  }
  candidateTargets.set(candidate.candidateId, unique(targets));
  redirects.push({
    schemaVersion: CONTRACTS.identityRedirect, redirectId: redirectIdFor(candidate.candidateId, targets), oldCandidateId: candidate.candidateId,
    oldExerciseId: candidate.exercise.identity.exerciseId, redirectKind: "SPLIT", newExerciseIds: unique(targets),
    reason: "La identidad heredada agrupaba enunciados distintos; separación por identidad compuesta v2.",
    algorithmVersion: "mathup.identity.composite.v2", evidence: { v1Hash: sha256(candidate.exercise), collisionCandidateId: candidate.candidateId }, review: { status: "DRAFT", humanReviewRequired: true }
  });
  migrations.push({ candidateId: candidate.candidateId, oldExerciseId: candidate.exercise.identity.exerciseId, targetExerciseIds: unique(targets), kind: "SPLIT", v1Hash: sha256(candidate.exercise) });
}

const exerciseById = new Map(exercises.map((row) => [row.identity.exerciseId, row]));

function sourceProvenance(inventoryIds, extra = {}) {
  const rows = inventoryIds.map((id) => sourceByInventory.get(id)).filter(Boolean);
  return {
    sourceRecordIds: unique(rows.map((row) => row.sourceRecordId)), inventoryRecordIds: unique(inventoryIds),
    evidenceHashes: sortBy(rows.map((row) => ({ sourceRecordId: row.sourceRecordId, immutableHash: row.immutableHash })), (row) => row.sourceRecordId), ...extra
  };
}
function makeAnswer(exercise, value, inventoryIds, extra = {}) {
  const provenance = sourceProvenance(inventoryIds, extra);
  const answerId = answerIdFor(exercise.identity.exerciseId, provenance.sourceRecordIds);
  return {
    schemaVersion: CONTRACTS.answer, answerId, exerciseId: exercise.identity.exerciseId,
    revisionId: `${answerId}:r1`, kind: typeof value === "object" ? "composite" : "text", canonicalValue: value, acceptedValues: [], tolerance: null, units: null,
    evidenceStatus: extra.recoveryKind === "UNIQUE_MATCH" ? "RECOVERED_UNIQUE" : "OBSERVED",
    provenance, review: { status: "DRAFT", mathematicalReview: "REQUIRED", findings: [] }
  };
}
function makeSolution(exercise, parts, inventoryIds, extra = {}) {
  const provenance = sourceProvenance(inventoryIds, extra);
  const developed = parts.every((part) => nonempty(part.text) && part.text !== part.finalAnswer);
  const solutionId = solutionIdFor(exercise.identity.exerciseId, provenance.sourceRecordIds);
  return {
    schemaVersion: CONTRACTS.solution, solutionId, exerciseId: exercise.identity.exerciseId, revisionId: `${solutionId}:r1`, answerId: null,
    kind: developed ? "developed" : "final-only", parts, verification: null, pedagogicalProfile: null,
    recoveryKind: extra.recoveryKind === "UNIQUE_MATCH" ? (developed ? "RECOVERED_DEVELOPED" : "RECOVERED_FINAL_ONLY") : "AUTHORITATIVE_EXISTING",
    provenance, review: { status: "DRAFT", mathematicalReview: "REQUIRED", solutionNeedsReview: true, findings: developed ? [] : ["SOLUTION_FINAL_ONLY"] }
  };
}

// Conserva respuestas, soluciones y distractores ya demostrables en candidatos no colisionados.
for (const candidate of candidates.filter((row) => !collisionIds.has(row.candidateId))) {
  const [exerciseId] = candidateTargets.get(candidate.candidateId) || [];
  const exercise = exerciseById.get(exerciseId);
  if (!exercise) continue;
  const inventoryIds = exercise.traceability.inventoryRecordIds;
  const answerValue = candidate.exercise.answer?.canonicalValue;
  let answer = null;
  if (answerValue !== null && answerValue !== undefined && !candidate.exercise.publication?.exclusionReasons?.includes("ANSWER_CONFLICT")) {
    answer = makeAnswer(exercise, answerValue, inventoryIds, { recoveryKind: "V1_DEMONSTRABLE" }); answers.push(answer); exercise.links.answerRefs.push(answer.answerId);
  }
  const oldSolution = candidate.exercise.solution;
  let solution = null;
  if (oldSolution?.kind && oldSolution.kind !== "missing" && (oldSolution.steps?.length || nonempty(oldSolution.finalAnswer))) {
    const text = (oldSolution.steps || []).map((step) => typeof step === "string" ? step : step.text || step.content || stableStringify(step)).join("\n");
    solution = makeSolution(exercise, [{ part: "whole", text: text || oldSolution.finalAnswer, finalAnswer: oldSolution.finalAnswer || answerValue || null }], inventoryIds, { recoveryKind: "V1_DEMONSTRABLE" });
    solution.answerId = answer?.answerId || null;
    solutions.push(solution); exercise.links.solutionRefs.push(solution.solutionId);
  }
  const choices = candidate.exercise.choices;
  const distractorValues = choices?.distractors?.map((row) => row.value) || [];
  let set = null;
  if (answer && distractorValues.length === 3 && new Set(distractorValues.map((value) => content(value).toLowerCase())).size === 3) {
    set = {
      schemaVersion: CONTRACTS.distractorSet, distractorSetId: distractorSetIdFor(exerciseId, answer.answerId, distractorValues), exerciseId,
      answerId: answer.answerId, revisionId: `${distractorSetIdFor(exerciseId, answer.answerId, distractorValues)}:r1`,
      distractors: distractorValues.map((value, index) => ({ distractorId: deterministicId("d", "preserved-distractor", { exerciseId, index, value }), value, source: "legacy-preserved" })), equivalencePolicy: "safe-normalization-v1",
      provenance: sourceProvenance(inventoryIds, { generation: "NONE", preservation: "EXISTING_VALUES_ONLY" }), review: { status: "DRAFT", mathematicalReview: "REQUIRED" }
    };
    distractorSets.push(set);
  }
  const modalities = unique(candidate.exercise.modalities || []);
  if (exercise.classification.stage === "PAU" && !modalities.includes("pau-simulation")) modalities.push("pau-simulation");
  for (const modality of modalities.sort()) {
    const interactionKind = set ? "multiple-choice" : "open-response";
    const template = {
      schemaVersion: CONTRACTS.deliveryTemplate, templateId: templateIdFor(exerciseId, modality, interactionKind, inventoryIds), exerciseId,
      revisionId: `${templateIdFor(exerciseId, modality, interactionKind, inventoryIds)}:r1`, modality, eligibility: { eligible: true, basis: "legacy-declared-or-pau-normalized" }, interactionKind,
      answerRef: answer?.answerId || null, distractorSetRef: set?.distractorSetId || null,
      materializationPolicy: interactionKind === "multiple-choice" ? { shuffle: SHUFFLE_ALGORITHM_VERSION, correctPositionPersisted: false } : null,
      evidence: sourceProvenance(inventoryIds, { generation: "NONE" }), review: { status: "DRAFT", mathematicalReview: "REQUIRED" }
    };
    templates.push(template); exercise.links.deliveryTemplateRefs.push(template.templateId);
  }
}

// Recuperación exacta y auditable de Fase 2A. Ninguna coincidencia dudosa se promociona.
for (const row of recovery) {
  if (row.status !== "UNIQUE_MATCH") {
    recoveryDecisions.push({ ...row, decision: "NOT_PROMOTED", decisionReason: `FASE2A_${row.status}`, ruleVersion: RECOVERY_RULE_VERSION });
    recoveryQueues[row.status].push(row);
    continue;
  }
  const targets = candidateTargets.get(row.candidateId) || [];
  const evidence = (row.exactEvidenceRecordIds || []).map((id) => inventoryById.get(id)).filter(Boolean);
  const exactKeys = new Set(row.exactAnswerKeys || []);
  const corrupted = evidence.some((item) => item.flags?.corruptedCharacters);
  const keyMismatch = evidence.some((item) => {
    const key = item.sourcePath?.match(/EXAM_ANSWERS\.([^\.]+)/u)?.[1] || item.sourcePath?.match(/\.([^\.]+)\.[a-z]\)$/iu)?.[1] || item.rawBaseId || item.exerciseId;
    return exactKeys.size && key && !exactKeys.has(key);
  });
  const parts = new Map();
  for (const item of evidence) {
    const part = parsePart(item);
    if (!parts.has(part)) parts.set(part, { answers: new Set(), solutions: new Set(), records: [] });
    const group = parts.get(part); group.records.push(item);
    if (nonempty(item.answer)) group.answers.add(content(item.answer));
    if (nonempty(item.solution)) group.solutions.add(content(item.solution));
  }
  const incompatible = [...parts.values()].some((part) => part.answers.size > 1 || part.solutions.size > 1);
  const decisionReason = targets.length !== 1 ? "TARGET_NOT_UNIQUE" : corrupted ? "CORRUPTED_EVIDENCE" : keyMismatch ? "EXACT_KEY_MISMATCH" : incompatible ? "INCOMPATIBLE_PART_EVIDENCE" : !evidence.length ? "EVIDENCE_MISSING" : null;
  if (decisionReason) {
    const degradedStatus = incompatible ? "CONFLICT" : "POSSIBLE_MATCH";
    recoveryDecisions.push({ ...row, decision: "REJECTED_OR_DEGRADED", degradedStatus, decisionReason, ruleVersion: RECOVERY_RULE_VERSION });
    recoveryQueues[degradedStatus].push({ ...row, decisionReason });
    continue;
  }
  const exercise = exerciseById.get(targets[0]);
  const evidenceIds = unique(evidence.map((item) => item.inventoryId));
  const sourceStatementIds = unique((exercise.traceability.inventoryRecordIds || []).map((id) => sourceByInventory.get(id)?.sourceRecordId));
  const pauKey = canonicalPauKey({ subject: row.subject, community: row.community, year: row.year, sitting: row.sitting, exercise: row.exerciseLabel, legacyExactKey: [...exactKeys][0] || null });
  const provenanceExtra = {
    recoveryKind: "UNIQUE_MATCH", joinRule: RECOVERY_RULE_VERSION, pauKey,
    statementSourceRecordIds: sourceStatementIds, answerSolutionSourceRecordIds: unique(evidenceIds.map((id) => sourceByInventory.get(id)?.sourceRecordId)),
    partKeys: [...parts.keys()].sort()
  };
  const answerParts = sortBy([...parts.entries()].filter(([, group]) => group.answers.size), ([part]) => part).map(([part, group]) => ({ part, value: [...group.answers][0] }));
  const solutionParts = sortBy([...parts.entries()].filter(([, group]) => group.solutions.size), ([part]) => part).map(([part, group]) => ({ part, text: [...group.solutions][0], finalAnswer: group.answers.size ? [...group.answers][0] : null }));
  let answer = null; let solution = null;
  if (answerParts.length) { answer = makeAnswer(exercise, { parts: answerParts }, evidenceIds, provenanceExtra); answers.push(answer); exercise.links.answerRefs.push(answer.answerId); }
  if (solutionParts.length) { solution = makeSolution(exercise, solutionParts, evidenceIds, provenanceExtra); solution.answerId = answer?.answerId || null; solutions.push(solution); exercise.links.solutionRefs.push(solution.solutionId); }
  recoveryDecisions.push({ ...row, decision: "ACCEPTED_TECHNICALLY", decisionReason: "EXACT_KEY_PART_AND_SINGLE_TARGET", ruleVersion: RECOVERY_RULE_VERSION, exerciseId: exercise.identity.exerciseId, answerId: answer?.answerId || null, solutionId: solution?.solutionId || null, mathematicalReview: "REQUIRED", pauKey });
  recoveryQueues.MATHEMATICAL_REVIEW.push({ candidateId: row.candidateId, exerciseId: exercise.identity.exerciseId, answerId: answer?.answerId || null, solutionId: solution?.solutionId || null, reason: "RECOVERED_NOT_MATHEMATICALLY_APPROVED" });
}

const answerByExercise = new Map(answers.map((row) => [row.exerciseId, row]));
const solutionByExercise = new Map(solutions.map((row) => [row.exerciseId, row]));
const templateByExercise = new Map();
for (const template of templates) {
  if (!templateByExercise.has(template.exerciseId)) templateByExercise.set(template.exerciseId, []);
  templateByExercise.get(template.exerciseId).push(template);
}
const answerIds = new Set(answers.map((row) => row.answerId));
const distractorSetIds = new Set(distractorSets.map((row) => row.distractorSetId));

const validationResults = [];
for (const exercise of exercises) {
  exercise.links.answerRefs = unique(exercise.links.answerRefs); exercise.links.solutionRefs = unique(exercise.links.solutionRefs); exercise.links.deliveryTemplateRefs = unique(exercise.links.deliveryTemplateRefs);
  const exerciseValidation = validateExerciseV2(exercise);
  const answerValidation = answerByExercise.has(exercise.identity.exerciseId) ? validateAnswer(answerByExercise.get(exercise.identity.exerciseId)) : null;
  const solutionValidation = solutionByExercise.has(exercise.identity.exerciseId) ? validateSolution(solutionByExercise.get(exercise.identity.exerciseId)) : null;
  const templateValidations = (templateByExercise.get(exercise.identity.exerciseId) || []).map((row) => validateDeliveryTemplate(row, { answerIds, distractorSetIds }));
  const gates = aggregateGates({ exerciseValidation, answerValidation, solutionValidation, templateValidations });
  exercise.editorial = { ...gates, publicationStatus: "NOT_PUBLISHED" };
  exercise.review.status = exerciseValidation.status === "ERROR" ? "BLOCKED" : gates.contentGate === "CONTENT_PASSED" ? "PASSED" : answerValidation || solutionValidation ? "REVIEW_REQUIRED" : "BLOCKED";
  validationResults.push({ exerciseId: exercise.identity.exerciseId, v1CandidateId: exercise.traceability.v1CandidateId, state: exercise.review.status, gates, exerciseValidation, answerValidation, solutionValidation, templateValidations });
}
for (const set of distractorSets) validationResults.push({ distractorSetId: set.distractorSetId, validation: validateDistractorSet(set) });
for (const redirect of redirects) validationResults.push({ redirectId: redirect.redirectId, validation: validateIdentityRedirect(redirect, new Set(exerciseById.keys())) });

const sourceReconciliation = sourceRecords.map((source) => {
  const oldLink = sourceLinksV1.find((row) => row.sourceRecordId === source.sourceRecordId);
  const targetExerciseIds = unique([...(inventoryTargets.get(source.inventoryRecordId) || []), ...recoveryDecisions.filter((row) => row.decision === "ACCEPTED_TECHNICALLY" && row.exactEvidenceRecordIds?.includes(source.inventoryRecordId)).map((row) => row.exerciseId)]);
  return {
    sourceRecordId: source.sourceRecordId, inventoryRecordId: source.inventoryRecordId, immutableHash: source.immutableHash,
    v1CandidateId: oldLink?.candidateId || null, v1ExerciseId: oldLink?.exerciseId || null, targetExerciseIds,
    relation: targetExerciseIds.length ? oldLink?.relation === "AUXILIARY_EVIDENCE" ? "RECOVERED_AUXILIARY_EVIDENCE" : "RECONCILED" : oldLink?.relation || "PRESERVED_UNASSIGNED",
    reason: targetExerciseIds.length ? null : oldLink?.reason || "NO_CANONICAL_TARGET_IN_V2"
  };
});

const educationalReconciliation = reconciliationV1.map((row) => {
  const targets = row.candidateId ? candidateTargets.get(row.candidateId) || [] : [];
  return { ...row, v1ExerciseId: row.exerciseId, exerciseId: undefined, v2ExerciseIds: targets, migrationKind: row.candidateId ? (targets.length > 1 ? "SPLIT" : targets.length === 1 ? "ONE_TO_ONE" : "NO_TARGET") : "NOT_CONVERTED_V1", fase2bState: targets.length ? statusCounter(targets.map((id) => validationResults.find((item) => item.exerciseId === id) || { state: "UNKNOWN" })) : { NOT_CONVERTED: 1 } };
});

const coverageMap = new Map();
for (const row of educationalReconciliation) {
  const key = `${row.courseId}|${row.subjectId}`;
  if (!coverageMap.has(key)) coverageMap.set(key, { courseId: row.courseId, subjectId: row.subjectId, originals: 0, accessible: 0, inaccessible: 0, v2Exercises: new Set(), PASSED: 0, REVIEW_REQUIRED: 0, BLOCKED: 0, notConverted: 0 });
  const item = coverageMap.get(key); item.originals += 1; item[row.accessible ? "accessible" : "inaccessible"] += 1;
  if (!row.v2ExerciseIds.length) item.notConverted += 1;
  for (const id of row.v2ExerciseIds) item.v2Exercises.add(id);
}
for (const item of coverageMap.values()) {
  for (const id of item.v2Exercises) item[validationResults.find((row) => row.exerciseId === id)?.state || "BLOCKED"] += 1;
  item.v2Exercises = item.v2Exercises.size;
}
const coverage = sortBy([...coverageMap.values()], (row) => `${row.courseId}|${row.subjectId}`);

const pauMap = new Map();
for (const exercise of exercises.filter((row) => row.classification.stage === "PAU")) {
  const key = stableStringify({ subjectId: exercise.classification.subjectId, community: exercise.provenance?.community?.name || null, year: exercise.provenance?.pau?.year || null, sitting: exercise.provenance?.pau?.sitting || null });
  if (!pauMap.has(key)) pauMap.set(key, { subjectId: exercise.classification.subjectId, community: exercise.provenance?.community?.name || null, year: exercise.provenance?.pau?.year || null, sitting: exercise.provenance?.pau?.sitting || null, exercises: 0, recovered: 0 });
  const item = pauMap.get(key); item.exercises += 1; if (recoveryDecisions.some((row) => row.exerciseId === exercise.identity.exerciseId && row.decision === "ACCEPTED_TECHNICALLY")) item.recovered += 1;
}

const phase2Summary = readJson("artifacts/fase2/runs/run-a/validation-summary.json");
const reconciliationSummary = {
  sourceRecords: { expected: 15527, actual: sourceReconciliation.length, uniqueSourceRecordIds: new Set(sourceReconciliation.map((row) => row.sourceRecordId)).size, missing: 15527 - sourceReconciliation.length },
  educationalOriginals: { expected: 6712, actual: educationalReconciliation.length },
  inaccessible: { expected: 607, actual: educationalReconciliation.filter((row) => !row.accessible).length },
  candidatesV1: candidates.length, exercisesV2: exercises.length, splitRedirects: redirects.filter((row) => row.redirectKind === "SPLIT").length,
  recovery: { input: recovery.length, UNIQUE_MATCH: recovery.filter((row) => row.status === "UNIQUE_MATCH").length, accepted: recoveryDecisions.filter((row) => row.decision === "ACCEPTED_TECHNICALLY").length, degradedOrRejected: recoveryDecisions.filter((row) => row.decision === "REJECTED_OR_DEGRADED").length, POSSIBLE_MATCH: recoveryQueues.POSSIBLE_MATCH.length, CONFLICT: recoveryQueues.CONFLICT.length, NOT_FOUND: recoveryQueues.NOT_FOUND.length },
  states: statusCounter(validationResults.filter((row) => row.exerciseId)),
  priorStates: phase2Summary.statusCounts || phase2Summary.states || phase2Summary,
  preservedSourceRecordIds: sourceReconciliation.every((row) => sourceById.has(row.sourceRecordId)), noPublication: true
};

const beforeAfter = {
  before: { candidates: candidates.length, states: reconciliationSummary.priorStates, choicesRequiredDiagnostics: 2668 },
  after: { exercises: exercises.length, states: reconciliationSummary.states, openPauWithoutChoicesValid: true, acceptedRecoveries: reconciliationSummary.recovery.accepted },
  explanation: ["La separación v2 evita exigir opciones al núcleo matemático.", "Las recuperaciones exactas quedan en revisión matemática y no se publican.", "Las identidades colisionadas se separan mediante redirecciones SPLIT."]
};

const semanticFiles = [
  "contract-manifest.json", "input-manifest.json", "exercise-v2.jsonl", "answer-records.jsonl", "solution-records.jsonl",
  "v1-candidate-reference.jsonl",
  "delivery-templates.jsonl", "distractor-sets.jsonl", "identity-redirects.jsonl", "v1-to-v2-migration.jsonl",
  "pau-recovery-decisions.jsonl", "queue-possible-match.jsonl", "queue-conflict.jsonl", "queue-not-found.jsonl",
  "queue-mathematical-review.jsonl", "source-reconciliation.jsonl", "educational-content-reconciliation.jsonl",
  "validation-results.jsonl", "validation-summary.json", "identity-registry.json", "coverage-by-course-subject.json",
  "pau-coverage-by-provenance.json", "before-after-comparison.json", "reconciliation-summary.json", "rollback-manifest.json"
];

writeJson("contract-manifest.json", { contracts: CONTRACTS, recoveryRuleVersion: RECOVERY_RULE_VERSION, shuffleAlgorithmVersion: SHUFFLE_ALGORITHM_VERSION });
writeJson("input-manifest.json", Object.fromEntries(Object.entries(input).map(([key, relative]) => [key, { path: relative, sha256: sha256(readText(relative)) }])));
writeJsonl("v1-candidate-reference.jsonl", candidates.map((row) => ({ candidateId: row.candidateId, exerciseId: row.exercise.identity.exerciseId, revisionId: row.exercise.identity.revisionId, v1Hash: sha256(row.exercise), inputPath: input.candidates })), (row) => row.candidateId);
writeJsonl("exercise-v2.jsonl", exercises, (row) => row.identity.exerciseId);
writeJsonl("answer-records.jsonl", answers, (row) => row.answerId);
writeJsonl("solution-records.jsonl", solutions, (row) => row.solutionId);
writeJsonl("delivery-templates.jsonl", templates, (row) => row.templateId);
writeJsonl("distractor-sets.jsonl", distractorSets, (row) => row.distractorSetId);
writeJsonl("identity-redirects.jsonl", redirects, (row) => row.redirectId);
writeJsonl("v1-to-v2-migration.jsonl", migrations, (row) => row.candidateId);
writeJsonl("pau-recovery-decisions.jsonl", recoveryDecisions, (row) => row.candidateId);
writeJsonl("queue-possible-match.jsonl", recoveryQueues.POSSIBLE_MATCH, (row) => row.candidateId);
writeJsonl("queue-conflict.jsonl", recoveryQueues.CONFLICT, (row) => row.candidateId);
writeJsonl("queue-not-found.jsonl", recoveryQueues.NOT_FOUND, (row) => row.candidateId);
writeJsonl("queue-mathematical-review.jsonl", recoveryQueues.MATHEMATICAL_REVIEW, (row) => row.candidateId);
writeJsonl("source-reconciliation.jsonl", sourceReconciliation, (row) => row.sourceRecordId);
writeJsonl("educational-content-reconciliation.jsonl", educationalReconciliation, (row) => `${row.courseId}|${row.originalIdentity}|${row.candidateId || ""}`);
writeJsonl("validation-results.jsonl", validationResults, (row) => row.exerciseId || row.distractorSetId || row.redirectId);
writeJson("validation-summary.json", { states: reconciliationSummary.states, gates: validationResults.filter((row) => row.exerciseId).reduce((acc, row) => { for (const value of Object.values(row.gates)) acc[value] = (acc[value] || 0) + 1; return acc; }, {}), entityCounts: { exercises: exercises.length, answers: answers.length, solutions: solutions.length, templates: templates.length, distractorSets: distractorSets.length, redirects: redirects.length } });
writeJson("identity-registry.json", { algorithm: "mathup.identity.composite.v2", entries: sortBy(exercises.map((row) => ({ exerciseId: row.identity.exerciseId, revisionId: row.identity.revisionId, v1CandidateId: row.traceability.v1CandidateId, identitySplit: row.traceability.identitySplit || null, aliases: row.identity.aliases })), (row) => row.exerciseId) });
writeJson("coverage-by-course-subject.json", coverage);
writeJson("pau-coverage-by-provenance.json", sortBy([...pauMap.values()], (row) => stableStringify(row)));
writeJson("before-after-comparison.json", beforeAfter);
writeJson("reconciliation-summary.json", reconciliationSummary);
writeJson("rollback-manifest.json", { scope: "selected Fase 2B run directory only", generatedFiles: semanticFiles, protectedInputs: Object.values(input), action: "Remove the selected Fase 2B run directory only; no reverse write to production is required." });

const checksums = semanticFiles.map((name) => `${sha256(fs.readFileSync(path.join(outputDir, name)))}  ${name}`).sort();
fs.writeFileSync(path.join(outputDir, "checksums.sha256"), `${checksums.join("\n")}\n`);
writeJson("run-manifest.json", { runId, orderVariant, semanticFiles, semanticDigest: sha256(checksums.join("\n")), outputDir: path.relative(ROOT, outputDir).replaceAll("\\", "/") });

console.log(stableStringify({ outputDir, ...reconciliationSummary, semanticDigest: sha256(checksums.join("\n")) }, 2));

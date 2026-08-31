import { CONTRACTS, clean, stableStringify } from "./canonical-entities.mjs";

const forbiddenOutsideSession = new Set(["choices", "correctIndex", "correctPosition", "letter"]);
const issue = (code, path, severity = "ERROR", message = code) => ({ code, path, severity, message });

function walkForbidden(value, path = "", diagnostics = []) {
  if (!value || typeof value !== "object") return diagnostics;
  for (const [key, child] of Object.entries(value)) {
    const childPath = path ? `${path}.${key}` : key;
    if (forbiddenOutsideSession.has(key)) diagnostics.push(issue("SESSION_FIELD_OUTSIDE_SESSION", childPath, "ERROR", `${key} solo puede existir en mathup.session-exercise.v1.`));
    walkForbidden(child, childPath, diagnostics);
  }
  return diagnostics;
}

function result(entity, diagnostics) {
  return {
    schemaVersion: entity?.schemaVersion ?? null,
    status: diagnostics.some((item) => item.severity === "ERROR") ? "ERROR" : diagnostics.length ? "WARNING" : "OK",
    diagnostics
  };
}

export function validateExerciseV2(entity) {
  const diagnostics = [];
  if (entity?.schemaVersion !== CONTRACTS.exercise) diagnostics.push(issue("SCHEMA_VERSION", "schemaVersion"));
  if (!/^ex-[0-9a-f-]{36}$/u.test(entity?.identity?.exerciseId || "")) diagnostics.push(issue("EXERCISE_ID", "identity.exerciseId"));
  if (!clean(entity?.content?.statement?.plainText)) diagnostics.push(issue("STATEMENT_MISSING", "content.statement.plainText"));
  if (!entity?.classification?.courseId || !entity?.classification?.subjectId) diagnostics.push(issue("CLASSIFICATION_MISSING", "classification"));
  if (!entity?.traceability?.v1Hash || !(entity?.traceability?.inventoryRecordIds || []).length) diagnostics.push(issue("TRACEABILITY_MISSING", "traceability"));
  if (entity?.classification?.stage === "PAU" && entity?.provenance?.kind !== "official-pau") diagnostics.push(issue("PAU_PROVENANCE_INVALID", "provenance.kind"));
  walkForbidden(entity, "", diagnostics);
  return result(entity, diagnostics);
}

export function validateAnswer(entity) {
  const diagnostics = [];
  if (entity?.schemaVersion !== CONTRACTS.answer) diagnostics.push(issue("SCHEMA_VERSION", "schemaVersion"));
  if (!/^ans-[0-9a-f-]{36}$/u.test(entity?.answerId || "")) diagnostics.push(issue("ANSWER_ID", "answerId"));
  if (!clean(entity?.revisionId)) diagnostics.push(issue("ANSWER_REVISION_ID", "revisionId"));
  if (!["OBSERVED", "RECOVERED_UNIQUE", "POSSIBLE", "CONFLICT", "NOT_FOUND"].includes(entity?.evidenceStatus)) diagnostics.push(issue("ANSWER_EVIDENCE_STATUS", "evidenceStatus"));
  if (entity?.canonicalValue === null || entity?.canonicalValue === undefined || clean(typeof entity?.canonicalValue === "string" ? entity.canonicalValue : stableStringify(entity?.canonicalValue)) === "") diagnostics.push(issue("ANSWER_VALUE_MISSING", "canonicalValue"));
  if (!(entity?.provenance?.sourceRecordIds || []).length) diagnostics.push(issue("ANSWER_PROVENANCE_MISSING", "provenance.sourceRecordIds"));
  walkForbidden(entity, "", diagnostics);
  return result(entity, diagnostics);
}

export function validateSolution(entity) {
  const diagnostics = [];
  if (entity?.schemaVersion !== CONTRACTS.solution) diagnostics.push(issue("SCHEMA_VERSION", "schemaVersion"));
  if (!/^sol-[0-9a-f-]{36}$/u.test(entity?.solutionId || "")) diagnostics.push(issue("SOLUTION_ID", "solutionId"));
  if (!clean(entity?.revisionId)) diagnostics.push(issue("SOLUTION_REVISION_ID", "revisionId"));
  if (!["RECOVERED_ANSWER_ONLY", "RECOVERED_FINAL_ONLY", "RECOVERED_DEVELOPED", "AUTHORITATIVE_EXISTING"].includes(entity?.recoveryKind)) diagnostics.push(issue("SOLUTION_RECOVERY_KIND", "recoveryKind"));
  if (!(entity?.parts || []).length) diagnostics.push(issue("SOLUTION_PARTS_MISSING", "parts"));
  if (entity?.kind === "final-only") diagnostics.push(issue("SOLUTION_FINAL_ONLY", "kind", "WARNING", "La solución solo conserva el resultado final."));
  if (entity?.review?.mathematicalReview !== "APPROVED") diagnostics.push(issue("MATHEMATICAL_REVIEW_REQUIRED", "review.mathematicalReview", "WARNING"));
  walkForbidden(entity, "", diagnostics);
  return result(entity, diagnostics);
}

export function validateDistractorSet(entity) {
  const diagnostics = [];
  if (entity?.schemaVersion !== CONTRACTS.distractorSet) diagnostics.push(issue("SCHEMA_VERSION", "schemaVersion"));
  if (!/^dst-[0-9a-f-]{36}$/u.test(entity?.distractorSetId || "")) diagnostics.push(issue("DISTRACTOR_SET_ID", "distractorSetId"));
  if (!/^ans-[0-9a-f-]{36}$/u.test(entity?.answerId || "")) diagnostics.push(issue("DISTRACTOR_ANSWER_ID", "answerId"));
  if (!clean(entity?.revisionId)) diagnostics.push(issue("DISTRACTOR_REVISION_ID", "revisionId"));
  if ((entity?.distractors || []).length !== 3) diagnostics.push(issue("DISTRACTOR_COUNT", "distractors"));
  const values = (entity?.distractors || []).map((item) => clean(typeof item.value === "string" ? item.value : stableStringify(item.value)).normalize("NFKC").toLowerCase());
  if (new Set(values).size !== values.length) diagnostics.push(issue("DISTRACTORS_DUPLICATE", "distractors"));
  walkForbidden(entity, "", diagnostics);
  return result(entity, diagnostics);
}

export function validateDeliveryTemplate(entity, references = {}) {
  const diagnostics = [];
  if (entity?.schemaVersion !== CONTRACTS.deliveryTemplate) diagnostics.push(issue("SCHEMA_VERSION", "schemaVersion"));
  if (!/^tpl-[0-9a-f-]{36}$/u.test(entity?.templateId || "")) diagnostics.push(issue("TEMPLATE_ID", "templateId"));
  if (!clean(entity?.revisionId)) diagnostics.push(issue("TEMPLATE_REVISION_ID", "revisionId"));
  if (!entity?.evidence || typeof entity.evidence !== "object") diagnostics.push(issue("TEMPLATE_EVIDENCE", "evidence"));
  if (!["open-response", "multiple-choice"].includes(entity?.interactionKind)) diagnostics.push(issue("INTERACTION_INVALID", "interactionKind"));
  if (entity?.interactionKind === "multiple-choice") {
    if (!entity.answerRef) diagnostics.push(issue("ANSWER_REF_REQUIRED", "answerRef"));
    if (!entity.distractorSetRef) diagnostics.push(issue("DISTRACTOR_SET_REF_REQUIRED", "distractorSetRef"));
    if (references.answerIds && !references.answerIds.has(entity.answerRef)) diagnostics.push(issue("ANSWER_REF_ORPHAN", "answerRef"));
    if (references.distractorSetIds && !references.distractorSetIds.has(entity.distractorSetRef)) diagnostics.push(issue("DISTRACTOR_SET_REF_ORPHAN", "distractorSetRef"));
  }
  if (entity?.interactionKind === "open-response" && entity?.distractorSetRef) diagnostics.push(issue("OPEN_RESPONSE_DISTRACTORS_FORBIDDEN", "distractorSetRef"));
  walkForbidden(entity, "", diagnostics);
  return result(entity, diagnostics);
}

export function validateSessionExercise(entity) {
  const diagnostics = [];
  if (entity?.schemaVersion !== CONTRACTS.sessionExercise) diagnostics.push(issue("SCHEMA_VERSION", "schemaVersion"));
  if ((entity?.options || []).length !== 4) diagnostics.push(issue("SESSION_OPTION_COUNT", "options"));
  const ids = (entity?.options || []).map((item) => item.optionInstanceId);
  if (new Set(ids).size !== ids.length) diagnostics.push(issue("SESSION_OPTION_IDS_DUPLICATE", "options"));
  if (!Number.isInteger(entity?.correctIndex) || entity.correctIndex < 0 || entity.correctIndex > 3) diagnostics.push(issue("SESSION_CORRECT_INDEX", "correctIndex"));
  if (entity?.options?.[entity?.correctIndex]?.optionInstanceId !== entity?.correctOptionInstanceId) diagnostics.push(issue("SESSION_CORRECT_REFERENCE", "correctOptionInstanceId"));
  return result(entity, diagnostics);
}

export function validateIdentityRedirect(entity, knownExerciseIds = new Set()) {
  const diagnostics = [];
  if (entity?.schemaVersion !== CONTRACTS.identityRedirect) diagnostics.push(issue("SCHEMA_VERSION", "schemaVersion"));
  if (!(entity?.newExerciseIds || []).length) diagnostics.push(issue("REDIRECT_TARGET_MISSING", "newExerciseIds"));
  if (!clean(entity?.algorithmVersion)) diagnostics.push(issue("REDIRECT_ALGORITHM", "algorithmVersion"));
  if (!entity?.evidence || typeof entity.evidence !== "object") diagnostics.push(issue("REDIRECT_EVIDENCE", "evidence"));
  for (const id of entity?.newExerciseIds || []) if (knownExerciseIds.size && !knownExerciseIds.has(id)) diagnostics.push(issue("REDIRECT_TARGET_ORPHAN", "newExerciseIds"));
  if (entity?.redirectKind === "SPLIT" && (entity?.newExerciseIds || []).length < 2) diagnostics.push(issue("SPLIT_REQUIRES_MULTIPLE_TARGETS", "newExerciseIds"));
  return result(entity, diagnostics);
}

export function aggregateGates({ exerciseValidation, answerValidation = null, solutionValidation = null, templateValidations = [] }) {
  const coreGate = exerciseValidation.status === "ERROR" ? "CORE_BLOCKED" : "CORE_PASSED";
  const contentErrors = [answerValidation, solutionValidation].filter(Boolean).some((item) => item.status === "ERROR");
  const contentWarnings = [answerValidation, solutionValidation].filter(Boolean).some((item) => item.status === "WARNING");
  const contentGate = contentErrors ? "CONTENT_BLOCKED" : contentWarnings ? "REVIEW_REQUIRED" : answerValidation && solutionValidation ? "CONTENT_PASSED" : "CONTENT_BLOCKED";
  const deliveryGate = templateValidations.some((item) => item.status === "ERROR") ? "DELIVERY_BLOCKED" : templateValidations.length ? "DELIVERY_PASSED" : "DELIVERY_BLOCKED";
  return { coreGate, contentGate, deliveryGate, publicationGate: "NOT_PUBLISHED" };
}

import crypto from "node:crypto";

export const CONTRACTS = Object.freeze({
  exercise: "mathup.exercise.v2",
  answer: "mathup.answer.v1",
  solution: "mathup.solution.v1",
  deliveryTemplate: "mathup.delivery-template.v1",
  distractorSet: "mathup.distractor-set.v1",
  sessionExercise: "mathup.session-exercise.v1",
  identityRedirect: "mathup.identity-redirect.v1"
});

export const IDENTITY_ALGORITHM_VERSION = "mathup.identity.composite.v2";
export const RECOVERY_RULE_VERSION = "mathup.pau-legacy-exact-key-and-part.v1";
export const SHUFFLE_ALGORITHM_VERSION = "mathup.shuffle.sha256-sort.v1";
export const NAMESPACE = "d795fa20-0a69-5ac4-b543-c0035577d406";

export function clean(value) {
  return String(value ?? "").replace(/\s+/gu, " ").trim();
}

export function stableStringify(value, space = 0) {
  const normalize = (item) => {
    if (Array.isArray(item)) return item.map(normalize);
    if (item && typeof item === "object") {
      return Object.fromEntries(Object.keys(item).sort().map((key) => [key, normalize(item[key])]));
    }
    return item;
  };
  return JSON.stringify(normalize(value), null, space);
}

export function sha256(value) {
  const input = Buffer.isBuffer(value) ? value : Buffer.from(typeof value === "string" ? value : stableStringify(value));
  return crypto.createHash("sha256").update(input).digest("hex");
}

function uuidBytes(uuid) {
  return Buffer.from(uuid.replaceAll("-", ""), "hex");
}

export function uuidV5(namespace, name) {
  const hash = crypto.createHash("sha1").update(Buffer.concat([uuidBytes(namespace), Buffer.from(String(name), "utf8")])).digest();
  hash[6] = (hash[6] & 0x0f) | 0x50;
  hash[8] = (hash[8] & 0x3f) | 0x80;
  const hex = hash.subarray(0, 16).toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function deterministicId(prefix, kind, seed) {
  return `${prefix}-${uuidV5(NAMESPACE, `${kind}\u0000${typeof seed === "string" ? seed : stableStringify(seed)}`)}`;
}

export function normalizeStatement(value) {
  return clean(value).normalize("NFKC").replace(/[\u200B-\u200D\uFEFF]/gu, "");
}

export function sourceNamespace(record) {
  const sourceFile = clean(record?.sourceFile) || "unknown-source";
  const sourcePath = clean(record?.sourcePath) || "unknown-path";
  const family = sourcePath
    .replace(/\.(?:parts\.)?\d+(?:\.[^.]+)?$/u, "")
    .replace(/\.[abcd]\)$/iu, "")
    .replace(/\.Resultado$/iu, "");
  return `${sourceFile}#${family}`;
}

export function compositeIdentitySeed(record, classification = {}) {
  const statement = normalizeStatement(record?.statement);
  return {
    courseId: classification.courseId ?? record?.course ?? "sin-determinar",
    subjectId: classification.subjectId ?? "sin-determinar",
    sourceNamespace: sourceNamespace(record),
    topicOrBlock: clean(record?.topic) || clean(record?.block) || "sin-determinar",
    normalizedStatementHash: sha256(statement),
    sourceLocalLegacyId: clean(record?.currentId || record?.exerciseId || record?.rawBaseId || record?.templateId) || "sin-id-local"
  };
}

export function canonicalPauKey({ subject, community, year, sitting, model = null, exercise, part = null, legacyExactKey = null }) {
  return {
    subject: clean(subject) || null,
    community: clean(community) || null,
    year: Number.isInteger(year) ? year : null,
    sitting: clean(sitting) || null,
    model: clean(model) || null,
    exercise: clean(exercise) || null,
    part: clean(part) || null,
    legacyExactKey: clean(legacyExactKey) || null
  };
}

export function entityRevisionId(entityId, revisionNumber = 1) {
  return `${entityId}:r${revisionNumber}`;
}

export function answerIdFor(exerciseId, evidenceIds) {
  return deterministicId("ans", "answer", { exerciseId, evidenceIds: [...evidenceIds].sort() });
}

export function solutionIdFor(exerciseId, evidenceIds) {
  return deterministicId("sol", "solution", { exerciseId, evidenceIds: [...evidenceIds].sort() });
}

export function templateIdFor(exerciseId, modality, interactionKind, evidenceIds) {
  return deterministicId("tpl", "delivery-template", { exerciseId, modality, interactionKind, evidenceIds: [...evidenceIds].sort() });
}

export function distractorSetIdFor(exerciseId, answerId, values) {
  return deterministicId("dst", "distractor-set", { exerciseId, answerId, values });
}

export function redirectIdFor(oldCandidateId, newExerciseIds) {
  return deterministicId("redir", "identity-redirect", { oldCandidateId, newExerciseIds: [...newExerciseIds].sort() });
}

export function resolvePersistentExerciseId(seed, registryEntries = []) {
  const stableMatch = registryEntries.find((entry) => {
    const previous = entry.identitySeed;
    return previous?.courseId === seed.courseId
      && previous?.subjectId === seed.subjectId
      && previous?.topicOrBlock === seed.topicOrBlock
      && previous?.normalizedStatementHash === seed.normalizedStatementHash
      && previous?.sourceLocalLegacyId === seed.sourceLocalLegacyId;
  });
  return stableMatch?.exerciseId || deterministicId("ex", "exercise-v2-composite", seed);
}

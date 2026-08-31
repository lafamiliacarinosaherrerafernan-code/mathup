export const CANONICAL_EXERCISE_SCHEMA_VERSION = "mathup.exercise.v1";
export const CANONICAL_VALIDATOR_VERSION = "mathup.validator.v1";

export const STAGES = Object.freeze(["ESO", "BACHILLERATO", "PAU"]);
export const PEDAGOGICAL_PROFILES = Object.freeze(["ESO", "BACH1", "BACH2_PAU"]);
export const COURSE_IDS = Object.freeze([
  "1eso", "2eso", "3eso", "4eso-a", "4eso-b",
  "1bach-mates", "1bach-ccss", "2bach-mates", "2bach-ccss"
]);
export const SUBJECT_IDS = Object.freeze([
  "matematicas", "matematicas-i", "matematicas-ii",
  "matematicas-ccss-i", "matematicas-ccss-ii"
]);
export const MODALITIES = Object.freeze([
  "practice", "challenge", "adventure", "topic-exam",
  "block-exam", "pau-simulation", "open-response"
]);
export const WORKFLOW_STATES = Object.freeze([
  "DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "REJECTED", "RETIRED"
]);

export const COURSE_SUBJECTS = Object.freeze({
  "1eso": "matematicas",
  "2eso": "matematicas",
  "3eso": "matematicas",
  "4eso-a": "matematicas",
  "4eso-b": "matematicas",
  "1bach-mates": "matematicas-i",
  "1bach-ccss": "matematicas-ccss-i",
  "2bach-mates": "matematicas-ii",
  "2bach-ccss": "matematicas-ccss-ii"
});

export const COURSE_PEDAGOGICAL_PROFILES = Object.freeze({
  "1eso": "ESO",
  "2eso": "ESO",
  "3eso": "ESO",
  "4eso-a": "ESO",
  "4eso-b": "ESO",
  "1bach-mates": "BACH1",
  "1bach-ccss": "BACH1",
  "2bach-mates": "BACH2_PAU",
  "2bach-ccss": "BACH2_PAU"
});

export const MODALITIES_BY_PEDAGOGICAL_PROFILE = Object.freeze({
  ESO: Object.freeze(["practice", "challenge", "adventure", "topic-exam", "open-response"]),
  BACH1: Object.freeze(["practice", "challenge", "topic-exam", "open-response"]),
  BACH2_PAU: Object.freeze(["practice", "challenge", "topic-exam", "block-exam", "pau-simulation", "open-response"])
});

export function pedagogicalProfileForCourse(courseId) {
  return COURSE_PEDAGOGICAL_PROFILES[courseId] || null;
}

export function stageForCourse(courseId) {
  if (String(courseId).includes("eso")) return "ESO";
  if (String(courseId).startsWith("1bach-")) return "BACHILLERATO";
  if (String(courseId).startsWith("2bach-")) return "PAU";
  return null;
}

export function canonicalChoiceValues(choices) {
  if (!choices) return [];
  return [choices.correct, ...(Array.isArray(choices.distractors) ? choices.distractors : [])];
}

export function materializeCanonicalChoices(choices, orderedChoiceIds) {
  const values = canonicalChoiceValues(choices);
  const byId = new Map(values.map((choice) => [choice?.choiceId, choice]));
  if (!Array.isArray(orderedChoiceIds) || orderedChoiceIds.length !== 4 || new Set(orderedChoiceIds).size !== 4) {
    throw new TypeError("orderedChoiceIds debe contener exactamente cuatro identificadores distintos");
  }
  const options = orderedChoiceIds.map((choiceId) => byId.get(choiceId));
  if (options.some((choice) => !choice) || byId.size !== 4) {
    throw new TypeError("La permutación debe contener exactamente las cuatro opciones canónicas");
  }
  return {
    options,
    correctIndex: orderedChoiceIds.indexOf(choices.correct.choiceId)
  };
}

export function createCanonicalExercise(overrides = {}) {
  const exerciseId = overrides?.identity?.exerciseId || "pending-id";
  return {
    schemaVersion: CANONICAL_EXERCISE_SCHEMA_VERSION,
    identity: {
      exerciseId,
      revisionId: `${exerciseId}:r1`,
      revisionNumber: 1,
      legacyIds: [],
      contentHash: null,
      ...overrides.identity
    },
    classification: {
      stage: "ESO",
      courseId: "1eso",
      subjectId: "matematicas",
      topic: { id: "pending-topic", label: "Pendiente de clasificar" },
      block: null,
      curriculumVersion: null,
      ...overrides.classification
    },
    difficulty: { level: "unclassified", basis: "unclassified", confidence: null, ...overrides.difficulty },
    modalities: overrides.modalities || ["open-response"],
    provenance: {
      kind: "unknown",
      community: null,
      pau: null,
      source: {
        sourceId: "pending-source",
        sourceType: "unknown",
        sourceFile: "unknown",
        sourcePath: "unknown"
      },
      ...overrides.provenance
    },
    content: {
      language: "es",
      statement: { plainText: "", blocks: [{ blockId: "statement-1", type: "text", value: "", sourceLiteral: null }] },
      mathRepresentations: [],
      assets: [],
      ...overrides.content
    },
    answer: { kind: "open", canonicalValue: null, acceptedValues: [], units: null, tolerance: null, ...overrides.answer },
    solution: { kind: "missing", pedagogicalProfile: "ESO", steps: [], finalAnswer: null, verification: null, methodConstraints: [], ...overrides.solution },
    choices: overrides.choices ?? null,
    review: { status: "DRAFT", solutionNeedsReview: true, findings: [], reviewedBy: null, reviewedAt: null, ...overrides.review },
    traceability: { inventoryRecordIds: [], originalIdentity: "", transformations: [], ...overrides.traceability },
    publication: { status: "DRAFT", eligibleModalities: [], exclusionReasons: [], ...overrides.publication }
  };
}

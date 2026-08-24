import assert from "node:assert/strict";
import test from "node:test";
import { createCanonicalExercise, materializeCanonicalChoices } from "../catalog/canonical-exercise.mjs";
import { safeEquivalenceKey, safelyEquivalent, validateCanonicalExercise } from "../catalog/validate-canonical-exercise.mjs";

function document(plainText) {
  return { plainText, blocks: [{ blockId: "b1", type: "text", value: plainText, sourceLiteral: plainText }] };
}

function validExercise(overrides = {}) {
  const base = createCanonicalExercise({
    identity: { exerciseId: "test-001", revisionId: "test-001:r1", revisionNumber: 1, legacyIds: ["legacy-1"] },
    classification: { stage: "ESO", courseId: "2eso", subjectId: "matematicas", topic: { id: "enteros", label: "Números enteros" } },
    difficulty: { level: "easy", basis: "author", confidence: 1 },
    modalities: ["practice", "challenge"],
    provenance: {
      kind: "teacher-authored",
      source: { sourceId: "test-source", sourceType: "script", sourceFile: "data/test.js", sourcePath: "questions[0]" }
    },
    content: { statement: document("Calcula dos más dos."), mathRepresentations: [], assets: [] },
    answer: { kind: "choice", canonicalValue: "4", acceptedValues: [], units: null, tolerance: null },
    solution: {
      kind: "developed",
      pedagogicalProfile: "ESO",
      steps: [{ stepId: "s1", explanation: "Sumamos las dos cantidades.", work: document("2 + 2 = 4.") }],
      finalAnswer: "4",
      verification: document("Al restar 2 a 4 recuperamos 2."),
      methodConstraints: []
    },
    choices: {
      correct: { choiceId: "correct", value: "4", rationale: null },
      distractors: [
        { choiceId: "d1", value: "3", rationale: null },
        { choiceId: "d2", value: "5", rationale: null },
        { choiceId: "d3", value: "6", rationale: null }
      ],
      shufflePolicy: "seeded-per-attempt",
      equivalencePolicy: "safe-normalization-v1"
    },
    review: { status: "APPROVED", solutionNeedsReview: false, findings: [] },
    traceability: { inventoryRecordIds: ["fase0-test"], originalIdentity: "legacy-1", transformations: [] },
    publication: { status: "APPROVED", eligibleModalities: ["practice", "challenge"], exclusionReasons: [] }
  });
  return merge(base, overrides);
}

function validPau(communityCode = "CLM", communityName = "Castilla-La Mancha") {
  return validExercise({
    classification: { stage: "PAU", courseId: "2bach-mates", subjectId: "matematicas-ii" },
    modalities: ["pau-simulation", "open-response"],
    provenance: {
      kind: "official-pau",
      community: { code: communityCode, name: communityName },
      pau: { year: 2026, sitting: "Ordinaria", examOption: null, exerciseLabel: "1", block: "Análisis", exercise: "1", part: "a", otherMetadata: {} }
    },
    solution: { pedagogicalProfile: "BACH2_PAU" },
    publication: { eligibleModalities: ["pau-simulation", "open-response"] }
  });
}

function merge(base, overrides) {
  const result = structuredClone(base);
  for (const [key, value] of Object.entries(overrides)) {
    result[key] = value && typeof value === "object" && !Array.isArray(value) && result[key] && typeof result[key] === "object"
      ? { ...result[key], ...value }
      : value;
  }
  return result;
}

function codes(result) {
  return new Set(result.diagnostics.map((item) => item.code));
}

test("un ejercicio completo supera la puerta de calidad", () => {
  const result = validateCanonicalExercise(validExercise());
  assert.equal(result.status, "OK");
  assert.equal(result.canPublish, true);
});

test("la ausencia de respuesta impide publicar", () => {
  const result = validateCanonicalExercise(validExercise({ answer: { canonicalValue: null } }));
  assert.equal(result.status, "ERROR");
  assert(codes(result).has("ANSWER_MISSING"));
});

test("una solución que solo da el resultado se rechaza", () => {
  const result = validateCanonicalExercise(validExercise({ solution: { kind: "final-only", steps: [], finalAnswer: "4" } }));
  assert(codes(result).has("SOLUTION_FINAL_ONLY"));
  assert.equal(result.canPublish, false);
});

test("solutionNeedsReview es WARNING antes de publicar y ERROR si ya está publicado", () => {
  const review = validateCanonicalExercise(validExercise({ review: { status: "REVIEW", solutionNeedsReview: true } }));
  assert.equal(review.diagnostics.find((item) => item.code === "SOLUTION_REVIEW_REQUIRED")?.severity, "WARNING");
  assert.equal(review.publicationGate, "REVIEW_REQUIRED");
  assert.equal(review.canPublish, false);
  const published = validateCanonicalExercise(validExercise({
    review: { status: "PUBLISHED", solutionNeedsReview: true },
    publication: { status: "PUBLISHED" }
  }));
  assert.equal(published.diagnostics.find((item) => item.code === "SOLUTION_REVIEW_REQUIRED")?.severity, "ERROR");
});

test("fracciones numéricas equivalentes se detectan con seguridad", () => {
  const exercise = validExercise();
  exercise.answer.canonicalValue = "1/2";
  exercise.choices.correct.value = "1/2";
  exercise.choices.distractors[0].value = "2/4";
  const result = validateCanonicalExercise(exercise);
  assert(codes(result).has("CHOICE_MATHEMATICALLY_EQUIVALENT"));
  assert(codes(result).has("MULTIPLE_CORRECT_EQUIVALENTS"));
});

test("coma y punto decimal son equivalentes en el subconjunto seguro", () => {
  assert(safelyEquivalent("1,5 km", "1.5 km"));
  assert.equal(safeEquivalenceKey("2/30").key, safeEquivalenceKey("1/15").key);
});

test("la posición A/B/C/D está prohibida en el contenido canónico", () => {
  const exercise = validExercise();
  exercise.choices.correctIndex = 0;
  const result = validateCanonicalExercise(exercise);
  assert(codes(result).has("CHOICE_POSITION_FORBIDDEN"));
});

test("un ejercicio PAU admite comunidades futuras mediante código estable", () => {
  const exercise = validPau("AR", "Aragón");
  const result = validateCanonicalExercise(exercise);
  assert(!codes(result).has("PAU_COMMUNITY_MISSING"));
  assert(!codes(result).has("PAU_METADATA_MISSING"));
  assert(!codes(result).has("COURSE_SUBJECT_INCOHERENT"));
  assert.equal(result.status, "OK");
});

test("los caracteres deteriorados se señalan como ERROR", () => {
  const exercise = validExercise();
  exercise.content.statement = document("Calcula la ra?z cuadrada de 9.");
  const result = validateCanonicalExercise(exercise);
  assert(codes(result).has("CORRUPTED_CHARACTERS"));
});

test("no se afirma equivalencia algebraica que el validador no puede demostrar", () => {
  const exercise = validExercise();
  exercise.answer.canonicalValue = "x(x+1)";
  exercise.choices.correct.value = "x(x+1)";
  exercise.choices.distractors = [
    { choiceId: "d1", value: "x²+x", rationale: null },
    { choiceId: "d2", value: "x²+1", rationale: null },
    { choiceId: "d3", value: "x+1", rationale: null }
  ];
  const result = validateCanonicalExercise(exercise);
  assert(codes(result).has("SYMBOLIC_EQUIVALENCE_NOT_PROVEN"));
  assert(!codes(result).has("CHOICE_MATHEMATICALLY_EQUIVALENT"));
});

test("la trazabilidad incompleta impide publicar", () => {
  const result = validateCanonicalExercise(validExercise({ traceability: { inventoryRecordIds: [], originalIdentity: "" } }));
  assert(codes(result).has("TRACEABILITY_INVENTORY_MISSING"));
  assert(codes(result).has("REQUIRED_TEXT_MISSING"));
});

test("ESO rechaza block-exam aunque el bloque esté informado", () => {
  const result = validateCanonicalExercise(validExercise({
    classification: { block: { id: "numeros", label: "Números" } },
    modalities: ["block-exam"],
    publication: { eligibleModalities: ["block-exam"] }
  }));
  assert(codes(result).has("MODALITY_NOT_ALLOWED_FOR_PROFILE"));
  assert.equal(result.publicationGate, "BLOCKED");
});

test("el perfil pedagógico debe ser coherente con el curso", () => {
  const result = validateCanonicalExercise(validExercise({ solution: { pedagogicalProfile: "BACH1" } }));
  assert(codes(result).has("SOLUTION_PEDAGOGICAL_PROFILE_INCOHERENT"));
});

test("2.º de Bachillerato no admite ejercicios no PAU", () => {
  const result = validateCanonicalExercise(validExercise({
    classification: { stage: "BACHILLERATO", courseId: "2bach-mates", subjectId: "matematicas-ii" },
    provenance: { kind: "internal-bank", community: null, pau: null },
    solution: { pedagogicalProfile: "BACH2_PAU" }
  }));
  assert(codes(result).has("SECOND_BACH_MUST_BE_PAU"));
  assert.equal(result.publicationGate, "BLOCKED");
});

test("2.º de Bachillerato PAU exige comunidad", () => {
  const exercise = validPau();
  exercise.provenance.community = null;
  const result = validateCanonicalExercise(exercise);
  assert(codes(result).has("PAU_COMMUNITY_MISSING"));
});

test("se acepta PAU válida de Castilla-La Mancha", () => {
  assert.equal(validateCanonicalExercise(validPau("CLM", "Castilla-La Mancha")).status, "OK");
});

test("se acepta PAU válida de Madrid", () => {
  assert.equal(validateCanonicalExercise(validPau("MD", "Madrid")).status, "OK");
});

test("una solución desarrollada pero insuficiente queda en revisión", () => {
  const result = validateCanonicalExercise(validExercise({
    solution: {
      kind: "developed",
      pedagogicalProfile: "ESO",
      steps: [{ stepId: "s1", explanation: "Procedimiento breve.", work: document("4.") }]
    }
  }));
  assert.equal(result.diagnostics.find((item) => item.code === "SOLUTION_DEVELOPMENT_INSUFFICIENT")?.severity, "WARNING");
  assert.equal(result.publicationGate, "REVIEW_REQUIRED");
});

test("un ejercicio elemental puede tener un único paso válido", () => {
  const result = validateCanonicalExercise(validExercise());
  assert(!codes(result).has("SOLUTION_DEVELOPMENT_INSUFFICIENT"));
  assert.equal(result.status, "OK");
});

test("las opciones idénticas se rechazan", () => {
  const exercise = validExercise();
  exercise.choices.distractors[1].value = exercise.choices.distractors[0].value;
  const result = validateCanonicalExercise(exercise);
  assert(codes(result).has("CHOICE_DUPLICATED"));
});

test("la respuesta correcta es independiente de A/B/C/D", () => {
  const choices = validExercise().choices;
  const permutations = [
    ["correct", "d1", "d2", "d3"],
    ["d1", "correct", "d2", "d3"],
    ["d1", "d2", "correct", "d3"],
    ["d1", "d2", "d3", "correct"]
  ];
  assert.deepEqual(permutations.map((order) => materializeCanonicalChoices(choices, order).correctIndex), [0, 1, 2, 3]);
});

test("el contrato conserva estructuras complejas de matriz, sistema y límite", () => {
  const exercise = validExercise();
  exercise.content.statement = {
    plainText: "Calcula el límite y resuelve el sistema matricial.",
    blocks: [
      { blockId: "t1", type: "text", value: "Calcula:", sourceLiteral: "Calcula:" },
      { blockId: "m1", type: "math-display", value: "\\lim_{x\\to0} \\frac{\\sin x}{x}", sourceLiteral: "lim sin(x)/x" },
      { blockId: "m2", type: "math-display", value: "\\left\\{\\begin{aligned}x+y&=2\\\\x-y&=0\\end{aligned}\\right.", sourceLiteral: "{x+y=2; x-y=0}" },
      { blockId: "m3", type: "math-display", value: "\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}", sourceLiteral: "[[1,1],[1,-1]]" }
    ]
  };
  exercise.content.mathRepresentations = [
    { format: "latex", value: "\\lim_{x\\to0} \\frac{\\sin x}{x}", role: "canonical", sourceBlockId: "m1" },
    { format: "latex", value: "\\left\\{\\begin{aligned}x+y&=2\\\\x-y&=0\\end{aligned}\\right.", role: "canonical", sourceBlockId: "m2" },
    { format: "matrix-array", value: "[[1,1],[1,-1]]", role: "source", sourceBlockId: "m3" }
  ];
  const result = validateCanonicalExercise(exercise);
  assert(!codes(result).has("STATEMENT_BLOCK_INVALID"));
  assert(!codes(result).has("MATH_REPRESENTATION_INVALID"));
});

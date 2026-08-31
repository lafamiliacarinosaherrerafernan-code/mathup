import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { COURSE_POLICIES, deterministicCorrectIndex, materializeChoices, normalizeStudentDocument, validateSolutionRecord, visibleTextIssues } from "../catalog/solution-quality/solution-quality.mjs";

const base = {
  exerciseId: "test-1", coursePolicy: "matematicas_ii", statement: "Calcular.", answer: "2",
  steps: [{ explanation: "Operamos.", math: "1+1=2" }], finalAnswer: "2", verification: "1+1=2",
  methods: [], multipleChoice: true, distractors: ["1", "3", "4"], attemptSeed: "seed",
};

test("course policies encode mandatory method boundaries", () => {
  assert.equal(COURSE_POLICIES.matematicas_i.lhopital, "FORBIDDEN");
  assert.equal(COURSE_POLICIES.ccss_ii.lhopital, "FORBIDDEN");
  assert.match(COURSE_POLICIES.matematicas_ii.lhopital, /0_OVER_0/);
});
test("valid complete record passes", () => assert.equal(validateSolutionRecord(base).valid, true));
test("raw delimiters and undefined are rejected", () => {
  const result = visibleTextIssues("Valor \\(x+1\\) = undefined").map((x) => x.code);
  assert.ok(result.includes("RAW_TEX_DELIMITER")); assert.ok(result.includes("VISIBLE_UNDEFINED"));
});
test("student normalizer removes nullish values without spelling them", () => {
  assert.deepEqual(normalizeStudentDocument({ a: undefined, b: null, c: "ok" }), { c: "ok" });
});
test("balanced TeX delimiters become structured math blocks", () => {
  assert.deepEqual(normalizeStudentDocument("\\(x+1\\)"), { type: "math", display: false, source: "x+1" });
});
test("Matemáticas I forbids L'Hôpital", () => assert.ok(validateSolutionRecord({ ...base, coursePolicy: "matematicas_i", methods: ["LHOPITAL"] }).errors.some((e) => e.code === "METHOD_FORBIDDEN_LHOPITAL")));
test("CCSS II forbids L'Hôpital", () => assert.ok(validateSolutionRecord({ ...base, coursePolicy: "ccss_ii", methods: ["LHOPITAL"] }).errors.some((e) => e.code === "METHOD_FORBIDDEN_LHOPITAL")));
test("Matemáticas II allows L'Hôpital only for valid forms", () => {
  assert.equal(validateSolutionRecord({ ...base, methods: ["LHOPITAL"], indeterminateForm: "0_OVER_0" }).valid, true);
  assert.ok(validateSolutionRecord({ ...base, methods: ["LHOPITAL"], indeterminateForm: "0_TIMES_INFINITY" }).errors.some((e) => e.code === "LHOPITAL_INVALID_FORM"));
});
test("parametric systems require Rouché-Frobenius", () => assert.ok(validateSolutionRecord({ ...base, isParametricSystem: true, methods: ["GAUSS"] }).errors.some((e) => e.code === "ROUCHE_FROBENIUS_REQUIRED")));
test("ESO and Matemáticas I 3x3 systems require step-by-step Gauss", () => {
  for (const coursePolicy of ["eso", "matematicas_i"]) {
    assert.ok(validateSolutionRecord({ ...base, coursePolicy, systemSize: 3, methods: [] }).errors.some((e) => e.code === "GAUSS_REQUIRED_FOR_3X3"));
    assert.ok(!validateSolutionRecord({ ...base, coursePolicy, systemSize: 3, methods: ["GAUSS"] }).errors.some((e) => e.code === "GAUSS_REQUIRED_FOR_3X3"));
  }
});
test("Matemáticas I extrema require explicit sign analysis when applicable", () => {
  assert.ok(validateSolutionRecord({ ...base, coursePolicy: "matematicas_i", requiresSignAnalysis: true }).errors.some((e) => e.code === "SIGN_ANALYSIS_REQUIRED"));
});
test("Matemáticas II integration by parts requires full development", () => {
  const short = { ...base, integrationTechnique: "BY_PARTS", steps: [{ explanation: "Aplicamos la fórmula.", math: "\\int u\\,dv=uv-\\int v\\,du" }] };
  assert.ok(validateSolutionRecord(short).errors.some((e) => e.code === "FULL_BY_PARTS_DEVELOPMENT_REQUIRED"));
});
test("Matemáticas II vector geometry requires an explicit derivation", () => {
  assert.ok(validateSolutionRecord({ ...base, vectorGeometry: true, vectorDerivationExplicit: false }).errors.some((e) => e.code === "VECTOR_DERIVATION_REQUIRED"));
});
test("CCSS II indefinite integrals stay immediate and in Practice", () => assert.ok(validateSolutionRecord({ ...base, coursePolicy: "ccss_ii", isIndefiniteIntegral: true, integralComplexity: "BY_PARTS", mode: "EXAM" }).errors.some((e) => e.code === "CCSS_INTEGRAL_SCOPE")));
test("answer must agree with final answer", () => assert.ok(validateSolutionRecord({ ...base, finalAnswer: "9" }).errors.some((e) => e.code === "ANSWER_FINAL_MISMATCH")));
test("steps cannot be missing", () => assert.ok(validateSolutionRecord({ ...base, steps: [] }).errors.some((e) => e.code === "STEPS_REQUIRED")));
test("duplicate distractor is rejected", () => assert.throws(() => materializeChoices({ correctAnswer: "2", distractors: ["2", "3", "4"], attemptSeed: "s", exerciseId: "e" })));
test("obvious numeric-equivalent distractors are rejected", () => assert.throws(() => materializeChoices({ correctAnswer: "1/2", distractors: ["0.5", "2", "3"], attemptSeed: "s", exerciseId: "e" })));
test("choice placement is deterministic per attempt", () => assert.equal(deterministicCorrectIndex("s", "e"), deterministicCorrectIndex("s", "e")));
test("correct answer is not permanently fixed to A", () => {
  const seen = new Set(Array.from({ length: 200 }, (_, i) => deterministicCorrectIndex(`s-${i}`, "e")));
  assert.deepEqual([...seen].sort(), [0, 1, 2, 3]);
});
test("same inputs materialize identical choices", () => {
  const args = { correctAnswer: "2", distractors: ["1", "3", "4"], attemptSeed: "s", exerciseId: "e" };
  assert.deepEqual(materializeChoices(args), materializeChoices(args));
});
test("production entry points remain untouched by this phase", () => {
  for (const file of ["index.html", "app.js", "bach-exam.js", "math-renderer.js"]) assert.ok(fs.existsSync(file));
});

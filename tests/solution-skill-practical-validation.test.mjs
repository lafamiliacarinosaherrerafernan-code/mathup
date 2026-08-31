import test from "node:test";
import assert from "node:assert/strict";
import { PRACTICAL_VALIDATION_CASES } from "../catalog/solution-quality/practical-validation-cases.mjs";
import { runPracticalValidation } from "../catalog/solution-quality/practical-validation.mjs";

const result = runPracticalValidation(PRACTICAL_VALIDATION_CASES);

test("la batería práctica contiene exactamente los 42 casos exigidos", () => {
  assert.equal(result.summary.caseCount, 42);
  assert.deepEqual(result.summary.coverageMissing, []);
});

test("los 42 resultados se verifican independientemente", () => {
  assert.equal(result.summary.independentPassed, 42);
  assert.equal(result.independent.filter((entry) => !entry.passed).length, 0);
});

test("los 42 registros cumplen el contrato maestro", () => {
  assert.equal(result.summary.contractPassed, 42);
  assert.deepEqual(result.contract.flatMap((entry) => entry.errors), []);
});

test("ningún contenido de alumno contiene undefined ni TeX crudo prohibido", () => {
  assert.equal(result.summary.visibleIssueCount, 0);
});

test("el reparto determinista usa las cuatro posiciones sin sesgo fijo en A", () => {
  const values = Object.values(result.summary.choiceDistribution);
  assert.equal(values.reduce((sum, value) => sum + value, 0), 1000);
  assert.ok(values.every((value) => value >= 200 && value <= 300));
});

test("la validación es reproducible", () => {
  const second = runPracticalValidation(PRACTICAL_VALIDATION_CASES);
  assert.equal(second.summary.semanticHash, result.summary.semanticHash);
});


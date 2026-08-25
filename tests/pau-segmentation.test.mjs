import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const run = join(root, "artifacts", "pau-documentary-reconciliation", "runs", "run-a");
const caseOne = JSON.parse(readFileSync(join(run, "case-1-reconciliation.json"), "utf8"));

test("el caso 1 queda dividido en 4.1 y 4.2", () => {
  assert.deepEqual(caseOne.targets.map((item) => item.alternativeKey).sort(), ["4.1", "4.2"]);
  assert.equal(caseOne.redirect.kind, "SPLIT");
  assert.equal(caseOne.expectedStructureSatisfied, true);
});

test("el caso 1 conserva a y b dentro de cada alternativa", () => {
  const byExercise = new Map();
  for (const part of caseOne.parts) {
    if (!byExercise.has(part.documentExerciseId)) byExercise.set(part.documentExerciseId, []);
    byExercise.get(part.documentExerciseId).push(part.normalizedLabel);
  }
  assert.equal(byExercise.size, 2);
  for (const labels of byExercise.values()) assert.deepEqual(labels.sort(), ["a", "b"]);
});

test("la instrucción editorial no forma parte de los enunciados", () => {
  assert.equal(caseOne.instructionOutsideStatement, true);
  for (const target of caseOne.targets) {
    assert.match(target.editorialInstruction.literal, /Conteste solo UNA/i);
    assert.doesNotMatch(target.statement, /^Conteste solo UNA/i);
  }
});

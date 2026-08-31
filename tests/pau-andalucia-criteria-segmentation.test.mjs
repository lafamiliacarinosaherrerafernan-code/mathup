import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifyCriterionLiteral, segmentCriterionText } from '../catalog/pau-criteria-segmentation/segment-official-criteria.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const readJsonl = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const summary = readJson('artifacts/pau-andalucia-criteria-segmentation/runs/run-a/summary.json');

test('scoring language is not misclassified as an official final answer', () => {
  const result = classifyCriterionLiteral('Obtención de la solución: 0.25 puntos.');
  assert.ok(result.categories.includes('OFFICIAL_SCORING_GUIDANCE'));
  assert.ok(!result.categories.includes('OFFICIAL_FINAL_ANSWER'));
});

test('an explicit final answer is recognized conservatively', () => {
  assert.ok(classifyCriterionLiteral('Resultado final: x = 2').categories.includes('OFFICIAL_FINAL_ANSWER'));
});

test('option and subpart segmentation preserves scope labels', () => {
  const segments = segmentCriterionText('OPCIÓN A\rEjercicio 1\ra) Hasta 1 punto.\rb) Método.\rOPCIÓN B\rEjercicio 1\ra) Hasta 2 puntos.');
  assert.equal(segments.length, 2);
  assert.deepEqual(segments.map((x) => x.alternativeKey), ['A', 'B']);
  assert.deepEqual(segments.map((x) => x.subparts.map((s) => s.label)), [['a', 'b'], ['a']]);
});

test('the complete documentary population remains intact', () => {
  assert.equal(summary.criteria.total, 184);
  assert.equal(summary.criteria.CRITERIA_MATCH_EXACT, 171);
  assert.equal(summary.criteria.CRITERIA_MATCH_STRUCTURAL, 4);
  assert.equal(summary.criteria.CRITERIA_MATCH_AMBIGUOUS, 9);
  assert.deepEqual(summary.canonicalIntegrity, { andalucia: 1666, matematicasII: 826, ccssII: 840, ccssII2012: 48 });
});

test('CCSS II 2012 is linked down to every demonstrated exercise and subpart', () => {
  assert.equal(summary.ccssII2012.exactCriterionPairs, 6);
  assert.equal(summary.ccssII2012.exercisesTotal, 48);
  assert.equal(summary.ccssII2012.subpartsTotal, 104);
  assert.equal(summary.ccssII2012.exercisesLinked, 48);
  assert.equal(summary.ccssII2012.subpartsLinked, 104);
  assert.equal(summary.ccssII2012.exercisesWithOfficialDevelopmentEvidence, 0);
  assert.equal(summary.ccssII2012.exercisesWithOfficialMethodEvidence, 16);
});

test('ambiguous document matches never produce automatic scope links', () => {
  const links = readJsonl('artifacts/pau-andalucia-criteria-segmentation/runs/run-a/criterion-scope-links.jsonl');
  assert.equal(links.filter((x) => x.matchClassification === 'CRITERIA_MATCH_AMBIGUOUS').length, 0);
  assert.equal(summary.safeguards.ambiguousAutoLinks, 0);
});

test('official answer candidates are never promoted automatically', () => {
  const candidates = readJsonl('artifacts/pau-andalucia-criteria-segmentation/runs/run-a/official-answer-candidates.jsonl');
  assert.ok(candidates.every((x) => x.status === 'OFFICIAL_ANSWER_CANDIDATE' && x.promotionPolicy === 'NO_AUTOMATIC_PROMOTION'));
  assert.equal(summary.safeguards.automaticVerifiedAnswers, 0);
});

test('no answers, solutions, or distractors are generated', () => {
  assert.equal(summary.safeguards.generatedAnswers, 0);
  assert.equal(summary.safeguards.generatedSolutions, 0);
  assert.equal(summary.safeguards.generatedDistractors, 0);
});

test('semantic artifacts are reproducible and order invariant', () => {
  const reproducibility = readJson('artifacts/pau-andalucia-criteria-segmentation/reproducibility.json');
  assert.equal(reproducibility.runAEqualsRunB, true);
  assert.equal(reproducibility.orderInvariant, true);
});

test('rollback is isolated from production', () => {
  const rollback = readJson('artifacts/pau-andalucia-criteria-segmentation/rollback.json');
  assert.equal(rollback.reversible, true);
  assert.deepEqual(rollback.productionFilesModified, []);
});

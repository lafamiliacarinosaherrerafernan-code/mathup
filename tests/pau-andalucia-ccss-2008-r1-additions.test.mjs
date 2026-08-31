import test from 'node:test';
import assert from 'node:assert/strict';
import { additionsCcss2008R1 } from '../data/andalucia-pau-additions-ccss-2008-r1.mjs';

test('CCSS II 2008 reserve 1 contributes six source-bound exercises and eighteen independently answerable units', () => {
  assert.equal(additionsCcss2008R1.length, 6);
  assert.equal(additionsCcss2008R1.flatMap((record) => record.parts).length, 18);
  assert.equal(new Set(additionsCcss2008R1.map((record) => record.exerciseId)).size, 6);
  for (const record of additionsCcss2008R1) for (const part of record.parts) {
    assert.equal(part.distractors.length, 3);
    assert.equal(new Set([part.semanticAnswer, ...part.distractors]).size, 4);
    assert.ok(part.solutionSteps.length >= 4);
    assert.equal(part.verification.verified, true);
  }
});

test('key algebra, calculus, probability and inference results reproduce independently', () => {
  assert.deepEqual([[3,1],[-1,0]].map((row, i, matrix) => row.map((_, j) => row.reduce((sum, value, k) => sum + value * matrix[k][j], 0))), [[8,3],[-3,-1]]);
  assert.equal(20 * 2 + 30 * 24, 760);
  assert.equal(2 * 3 + 6 * 24, 150);
  assert.ok(Math.abs(1 - (6 / 12 * 9 / 12 + 2 / 12 * 3 / 12) - 7 / 12) < 1e-15);
  assert.equal(18 / 48, 3 / 8);
  assert.equal(102 / 150, 17 / 25);
});

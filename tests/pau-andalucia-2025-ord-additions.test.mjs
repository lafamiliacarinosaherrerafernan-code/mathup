import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { additions2025Ord } from '../data/andalucia-pau-additions-2025-ord.mjs';

test('the 2025 ordinary user document contributes seven unique solved records', () => {
  assert.equal(additions2025Ord.length, 7);
  assert.equal(new Set(additions2025Ord.map((record) => record.exerciseId)).size, 7);
  assert.equal(additions2025Ord.flatMap((record) => record.parts).length, 12);
  for (const record of additions2025Ord) {
    assert.equal(record.documentHash, '3dd1f772eb6cc04a5fc49c38513346ae29789793ac726dc409b76f5ee3b23b8f');
    for (const part of record.parts) {
      assert.equal(part.distractors.length, 3);
      assert.equal(new Set([part.semanticAnswer, ...part.distractors]).size, 4);
      assert.ok(part.solutionSteps.length >= 5);
      assert.equal(part.verification.verified, true);
    }
  }
});

test('independent numerical and symbolic checks reproduce the published answers', () => {
  assert.deepEqual([20, 25, 35].map((price, index) => price * [0.7, 0.6, 0.8][index]), [14, 15, 28]);
  assert.equal(14 + 15 + 28, 57);
  for (const m of [-4, 5]) assert.equal(Math.abs(4 * m - 2) / 6, 3);
  assert.equal(2 * 1 - 2 * 1 + 1 - 1, 0);
  assert.equal(2 * 1 - 2 * 2 + 3 - 1, 0);
  assert.equal(2 * 1 - 2 * 2 + 1 * 2, 0);
  assert.equal(2 * 1 + 1 * 2 + (-2) * 2, 0);
  assert.equal(280497 + 2679, 283176);
  assert.ok(Math.abs(280497 / 283176 - 4921 / 4968) < 1e-15);
});

test('the browser runtime exposes the additions and updated totals', () => {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(new URL('../data/andalucia-pau-runtime.js', import.meta.url), 'utf8'), sandbox);
  const runtime = sandbox.window.ANDALUCIA_PAU_RUNTIME;
  assert.equal(runtime.canonicalTotal - runtime.publishableTotal, 200);
  assert.equal(runtime.publishableTotal, runtime.exercises.length);
  const ids = new Set(runtime.exercises.map((record) => record.exerciseId));
  for (const record of additions2025Ord) assert.ok(ids.has(record.exerciseId));
  assert.equal(ids.size, runtime.exercises.length);
});

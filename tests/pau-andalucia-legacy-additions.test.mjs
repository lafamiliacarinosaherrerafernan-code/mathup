import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import { additionsLegacy } from '../data/andalucia-pau-additions-legacy.mjs';

test('the 23 pending 2008-2009 documents contribute 162 exercises and 327 unique response units', () => {
  assert.equal(additionsLegacy.length, 162);
  assert.equal(new Set(additionsLegacy.map((row) => row.exerciseId)).size, 162);
  assert.equal(new Set(additionsLegacy.map((row) => row.documentHash)).size, 23);
  const responseUnitIds = additionsLegacy.flatMap((row) => row.parts.map((part) => part.id));
  assert.equal(responseUnitIds.length, 327);
  assert.equal(new Set(responseUnitIds).size, 327);
});

test('every legacy response unit has four distinct choices and a checked development', () => {
  for (const record of additionsLegacy) {
    assert.ok(record.officialPromptLiteral.length > 20, record.exerciseId);
    assert.ok(['algebra', 'analisis', 'estadistica', 'geometria'].includes(record.blockId), record.exerciseId);
    assert.equal(record.examSlot, Number(record.questionKey), record.exerciseId);
    assert.ok(record.parts.length >= 1, record.exerciseId);
    for (const part of record.parts) {
      assert.equal(part.distractors.length, 3, part.id);
      assert.equal(new Set([part.semanticAnswer, ...part.distractors]).size, 4, part.id);
      assert.ok(part.solutionSteps.length >= 4, part.id);
      assert.equal(part.verification.verified, true, part.id);
      assert.equal(part.distractorEvidence.length, 3, part.id);
    }
  }
});

test('legacy text is free of private font glyphs and internal renderer tokens', () => {
  const text = JSON.stringify(additionsLegacy);
  assert.doesNotMatch(text, /[\uE000-\uF8FF]/u);
  assert.doesNotMatch(text, /\\begin\{|\\end\{|\$\$|\\\(|\\\)/u);
});

test('the browser runtime exposes all 175 reconciled additions and updated totals', () => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('../data/andalucia-pau-runtime.js', import.meta.url), 'utf8'), context);
  const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
  const userRows = runtime.exercises.filter((row) => row.sourceAuthority === 'USER_SUPPLIED_PRIMARY_OFFICIAL_DOCUMENT');
  assert.equal(userRows.length, 175);
  assert.equal(runtime.canonicalTotal, 1841);
  assert.equal(runtime.publishableTotal, 1641);
});

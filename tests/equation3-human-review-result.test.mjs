import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const output = 'artifacts/equation3-human-review-result';
const summary = JSON.parse(fs.readFileSync(`${output}/summary.json`, 'utf8'));
const consequences = JSON.parse(fs.readFileSync(`${output}/exercise-consequences.json`, 'utf8'));
const failures = fs.readFileSync(`${output}/failure-classification.jsonl`, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const decisions = fs.readFileSync(`${output}/human-decisions-audit.jsonl`, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const spatial = JSON.parse(fs.readFileSync(`${output}/spatial-layout-audit.json`, 'utf8'));

test('el estado humano permanece íntegro y suma 45/10/0', () => {
  assert.match(summary.publicEvidence.publicDecisionSetSha256, /^[a-f0-9]{64}$/);
  assert.deepEqual(summary.decisions, { reviewed: 55, COINCIDE: 45, NO_COINCIDE: 10, DUDOSO: 0, equation: '45 + 10 + 0 = 55' });
  assert.equal(decisions.length, 55);
});

test('las 55 decisiones públicas son explícitas y usan un revisor pseudónimo', () => {
  assert.equal(decisions.length, 55);
  assert.ok(decisions.every((row) => row.explicitHumanAction && row.reviewerId === 'reviewer-1'));
  assert.ok(decisions.every((row) => row.reviewDate === '2026-08-25' && Number.isInteger(row.reviewSequence) && !('timestamp' in row)));
});

test('los 10 fallos están clasificados sin alterar la decisión', () => {
  assert.equal(failures.length, 10);
  assert.ok(failures.every((row) => row.categories.length > 0 && ['AST_DECODING', 'DERIVED_REPRESENTATION'].includes(row.layer)));
  assert.equal(failures.filter((row) => row.layer === 'AST_DECODING').length, 1);
  assert.equal(failures.filter((row) => row.layer === 'DERIVED_REPRESENTATION').length, 9);
});

test('la consecuencia por ejercicio es 21 + 19 desbloqueables y 8 bloqueados', () => {
  assert.equal(consequences.totalRecoveredExercises, 48);
  assert.equal(consequences.withoutEquation3Dependency, 21);
  assert.equal(consequences.equation3Dependent, 27);
  assert.equal(consequences.allObjectsCoincide, 19);
  assert.equal(consequences.affectedByNoCoincide, 8);
  assert.equal(consequences.currentlyUnblockable, 40);
  assert.equal(consequences.stillBlocked, 8);
});

test('ABCABC queda registrado como error de reconstrucción espacial, no eliminado', () => {
  assert.equal(spatial.exercisesAudited, 48);
  assert.equal(spatial.confirmedIncidents.length, 1);
  assert.equal(spatial.confirmedIncidents[0].classification, 'DOCUMENT_LAYOUT_RECONSTRUCTION_ERROR');
  assert.equal(spatial.confirmedIncidents[0].literalExtracted, 'A B C A B C');
  assert.equal(spatial.additionalConfirmedIncidents.length, 0);
});

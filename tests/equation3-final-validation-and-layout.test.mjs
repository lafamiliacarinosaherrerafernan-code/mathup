import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePairedLabeledMatrices } from '../catalog/equation3-andalucia-2012/document-layout-reconstruction.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const readJsonl = (relative) => fs.readFileSync(path.join(root, relative), 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const out = 'artifacts/equation3-human-validation-final';

test('las revisiones humanas permanecen en dos capas separadas', () => {
  const first = readJsonl(`${out}/first-review-decisions.jsonl`);
  const second = readJsonl(`${out}/second-review-decisions.jsonl`);
  assert.equal(first.length, 55);
  assert.equal(first.filter((row) => row.decision === 'COINCIDE').length, 45);
  assert.equal(first.filter((row) => row.decision === 'NO_COINCIDE').length, 10);
  assert.equal(second.length, 10);
  assert.ok(second.every((row) => row.decision === 'COINCIDE' && row.reviewerId === 'reviewer-1'));
  assert.ok(second.every((row) => row.reviewDate === '2026-08-25' && !('timestamp' in row)));
});

test('los diez historiales conservan NO_COINCIDE, diagnóstico, corrección y recheck', () => {
  const rows = readJsonl(`${out}/decision-lineage.jsonl`);
  assert.equal(rows.length, 10);
  assert.ok(rows.every((row) => row.originalDecision.decision === 'NO_COINCIDE'));
  assert.ok(rows.every((row) => row.diagnostic && row.correction));
  assert.ok(rows.every((row) => row.recheckDecision.decision === 'COINCIDE'));
});

test('los 55 objetos y 27 ejercicios dependientes quedan validados solo en paralelo', () => {
  const objects = readJsonl(`${out}/object-validation-statuses.jsonl`);
  const exercises = readJsonl(`${out}/exercise-validation-statuses.jsonl`);
  const summary = readJson(`${out}/summary.json`);
  assert.equal(objects.length, 55);
  assert.ok(objects.every((row) => row.status === 'EQUATION3_HUMAN_VALIDATED'));
  assert.equal(exercises.length, 27);
  assert.ok(exercises.every((row) => row.status === 'EQUATION3_HUMAN_VALIDATED'));
  assert.equal(summary.final.integrationAuthorized, false);
  assert.equal(summary.final.unaffectedExercises, 47);
});

test('la reconstrucción modela F y G con cabeceras A/B/C sin espaciado manual', () => {
  const layout = readJson(`${out}/abcabc-layout-reconstruction.json`);
  assert.equal(validatePairedLabeledMatrices(layout), true);
  assert.deepEqual(layout.items.map((item) => item.matrixLabel), ['F', 'G']);
  assert.deepEqual(layout.items.map((item) => item.columnHeaders), [['A', 'B', 'C'], ['A', 'B', 'C']]);
  assert.deepEqual(layout.items[0].matrix, [['100', '150', '80'], ['200', '250', '140']]);
  assert.deepEqual(layout.items[1].matrix, [['6', '8', '5'], ['4', '5', '3']]);
  assert.equal(layout.historicalEvidence.tokenPositions.length, 6);
  assert.equal(layout.guarantees.noManualSpacing, true);
  assert.equal(layout.guarantees.noAbsolutePositioning, true);
  assert.equal(layout.guarantees.mathAstUnmodified, true);
});

test('la vista de alumno elimina la línea ABCABC pero conserva su evidencia y el resto del ejercicio', () => {
  const layout = readJson(`${out}/abcabc-layout-reconstruction.json`);
  assert.doesNotMatch(layout.learnerView.introText, /A\s+B\s+C\s+A\s+B\s+C/u);
  assert.match(layout.historicalEvidence.exactLine, /A\s+B\s+C\s+A\s+B\s+C/u);
  assert.equal(layout.learnerView.scoreEvidencePreserved.length, 3);
  assert.equal(layout.learnerView.remainingBlocks.some((row) => row.objectId === layout.sourceObjectId), false);
  const secondObject = layout.learnerView.remainingBlocks.find((row) => row.objectId === 'adobj-61f8d5d809881c49-002');
  assert.ok(secondObject?.mathml);
});

test('ABCABC queda validado solo mediante un dictamen humano explícito pseudonimizado', () => {
  const layout = readJson(`${out}/abcabc-layout-reconstruction.json`);
  const summary = readJson(`${out}/summary.json`);
  const decision = readJson(`${out}/abcabc-human-decision.json`);
  assert.equal(decision.explicitHumanAction, true);
  assert.equal(decision.decision, 'COINCIDE');
  assert.equal(decision.reviewerId, 'reviewer-1');
  assert.equal(decision.explicitHumanConfirmation, true);
  assert.equal(decision.reviewDate, '2026-08-25');
  assert.equal('timestamp' in decision, false);
  assert.equal('userStatement' in decision, false);
  assert.equal(decision.reconstructionSha256, layout.reconstructionSha256);
  assert.equal(layout.status, 'DOCUMENT_LAYOUT_HUMAN_VALIDATED');
  assert.equal(summary.abcabc.status, 'DOCUMENT_LAYOUT_HUMAN_VALIDATED');
  assert.equal(summary.abcabc.integrationAuthorized, false);
});

test('la regresión de los 45 objetos inicialmente correctos no contiene cambios matemáticos', () => {
  const rows = readJsonl('artifacts/equation3-post-human-correction/regression-45.jsonl');
  assert.equal(rows.length, 45);
  assert.ok(rows.every((row) => row.mathematicalRegression === false));
});

test('rollback elimina solo la capa final y no modifica fuentes', () => {
  const rollback = readJson(`${out}/rollback.json`);
  assert.deepEqual(rollback.deletesOnly, ['artifacts/equation3-human-validation-final']);
  assert.equal(rollback.sourceFilesModified, false);
});

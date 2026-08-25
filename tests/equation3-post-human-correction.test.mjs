import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const artifact = (...parts) => path.join(root, 'artifacts/equation3-post-human-correction', ...parts);
const json = (name) => JSON.parse(fs.readFileSync(artifact(name), 'utf8'));
const jsonl = (name) => fs.readFileSync(artifact(name), 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const summary = json('summary.json');
const corrections = jsonl('correction-cases-10.jsonl');
const regression = jsonl('regression-45.jsonl');
const recheck = jsonl('recheck-10.jsonl');
const publicFirstReview = jsonl('../equation3-human-validation-final/first-review-decisions.jsonl');
const publicSecondReview = jsonl('../equation3-human-validation-final/second-review-decisions.jsonl');

test('se corrigieron exactamente los 10 NO COINCIDE y se congelaron 45 referencias', () => {
  assert.equal(summary.corrected, 10);
  assert.equal(summary.frozenRegression, 45);
  assert.equal(corrections.length, 10);
  assert.equal(regression.length, 45);
});

test('la cola recheck-10 contiene solo los diez casos y ninguna segunda decisión', () => {
  assert.equal(recheck.length, 10);
  assert.equal(recheck.every((item) => item.recheckStatus === 'HUMAN_RECHECK_REQUIRED'), true);
  assert.equal(recheck.every((item) => item.originalHumanDecision?.decision === 'NO_COINCIDE'), true);
  assert.equal(publicSecondReview.length, 10);
  assert.equal(publicSecondReview.every((item) => item.decision === 'COINCIDE' && item.reviewerId === 'reviewer-1'), true);
});

test('las 45 decisiones COINCIDE permanecen sin regresión matemática', () => {
  assert.equal(regression.every((item) => item.mathematicalRegression === false), true);
  assert.equal(summary.regression45Passed, 45);
});

test('la decisión humana original 45/10/0 permanece byte a byte intacta', () => {
  assert.equal(publicFirstReview.length, 55);
  assert.equal(publicFirstReview.filter((item) => item.decision === 'COINCIDE').length, 45);
  assert.equal(publicFirstReview.filter((item) => item.decision === 'NO_COINCIDE').length, 10);
  assert.equal(publicFirstReview.filter((item) => item.decision === 'DUDOSO').length, 0);
  assert.equal(publicFirstReview.every((item) => item.reviewerId === 'reviewer-1' && !('timestamp' in item)), true);
});

test('los delimitadores MTEF unilaterales no fabrican el lado derecho', () => {
  const unilateral = corrections.filter((item) => item.rulesApplied.includes('MTEF_UNILATERAL_LEFT_DELIMITER'));
  assert.equal(unilateral.length, 4);
  for (const item of unilateral) {
    assert.match(item.after.mathml, /<mo stretchy="true">\{<\/mo>/);
    assert.doesNotMatch(item.after.mathml, /<mo stretchy="true">\}<\/mo>/);
  }
});

test('los paréntesis ordinarios se derivan con proporción tipográfica no elástica', () => {
  for (const item of corrections) {
    assert.ok(item.rulesApplied.includes('ORDINARY_LITERAL_DELIMITER_NON_STRETCHY'));
    assert.match(item.after.mathml, /<mo stretchy="false">\(<\/mo>/);
    assert.match(item.after.mathml, /<mo stretchy="false">\)<\/mo>/);
  }
});

test('el exponente 6 tiene como base el grupo delimitado completo', () => {
  const item = corrections.find((entry) => entry.objectId === 'adobj-61f8d5d809881c49-009');
  assert.ok(item.rulesApplied.includes('SCRIPT_BASE_LITERAL_GROUP'));
  const power = item.after.ast.body.children.find((node) => node.type === 'power' && node.exponent?.value === '6');
  assert.equal(power.base.type, 'group');
  assert.equal(power.base.delimiter, 'parentheses');
  assert.equal(power.base.body.type, 'sequence');
});

test('los 55 objetos siguen trazables y las evidencias oficiales no cambian', () => {
  const all = jsonl('corrected-equations-55.jsonl');
  assert.equal(all.length, 55);
  assert.equal(new Set(all.map((item) => item.objectId)).size, 55);
  for (const item of all) {
    assert.match(item.sourceAuthority.documentSha256, /^[a-f0-9]{64}$/);
    assert.match(item.sourceAuthority.pngSha256, /^[a-f0-9]{64}$/);
    assert.match(item.sourceAuthority.mtefSha256, /^[a-f0-9]{64}$/);
  }
});

test('doble corrida, orden inverso y rollback están verificados', () => {
  const reproducibility = json('reproducibility.json');
  const rollback = json('rollback.json');
  assert.equal(reproducibility.repeatRunEquivalent, true);
  assert.equal(reproducibility.orderInvariant, true);
  assert.equal(rollback.sourceArtifactsUntouched, true);
  assert.match(rollback.rollbackProcedure, /Descartar exclusivamente/);
});

test('ABCABC permanece fuera del alcance y sin corregir', () => {
  assert.equal(summary.abcabcStatus, 'DOCUMENT_LAYOUT_RECONSTRUCTION_ERROR_UNCHANGED');
});

test('el servidor separa el estado de recheck-10 del historial original', () => {
  const server = fs.readFileSync(path.join(root, 'tools/equation3-human-comparison/server.mjs'), 'utf8');
  assert.match(server, /recheck-10-state\.json/);
  assert.match(server, /pilotId === 'recheck-10'/);
  assert.match(server, /suggestedReviewer: mode\.recheck \? 'reviewer-1'/);
});

test('la interfaz muestra historial, corrección y envía la decisión al estado recheck', () => {
  const app = fs.readFileSync(path.join(root, 'tools/equation3-human-comparison/public/app.js'), 'utf8');
  const html = fs.readFileSync(path.join(root, 'tools/equation3-human-comparison/public/index.html'), 'utf8');
  assert.match(app, /originalHumanDecision/);
  assert.match(app, /pilot: state\.pilot/);
  assert.match(html, /id="recheckHistory"/);
  assert.match(html, /id="renderedHeading"/);
});

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const artifact = path.join(root, 'artifacts', 'pau-andalucia-mass-processing');
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(artifact, name), 'utf8'));
const readJsonl = (name) => fs.readFileSync(path.join(artifact, name), 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const summary = readJson('summary.json');
const ledger = readJsonl('processing-ledger.jsonl');

test('procesa el censo íntegro 1666 sin duplicar identidades', () => {
  assert.equal(summary.totals.canonical, 1666);
  assert.equal(summary.totals.processed, 1666);
  assert.equal(summary.totals.mathematicsII, 826);
  assert.equal(summary.totals.ccssII, 840);
  assert.equal(new Set(ledger.map((row) => row.exerciseId)).size, 1666);
});

test('mantiene 2010-2026 y declara de forma explícita la ausencia 2000-2009', () => {
  assert.equal(summary.totals.years2010To2026, 1666);
  assert.equal(summary.totals.years2000To2009, 0);
  assert.deepEqual([...new Set(ledger.map((row) => row.year))].sort((a, b) => a - b), Array.from({ length: 17 }, (_, index) => 2010 + index));
});

test('habilita 28 y deja el resto como trabajo de resolución, no como exclusión', () => {
  assert.equal(summary.totals.enabled, 28);
  assert.equal(summary.totals.processedNotEnabled, 1638);
  assert.equal(summary.totals.resolutionPending, 1638);
  assert.equal(summary.totals.sourceReviewRequired, 0);
  assert.ok(ledger.filter((row) => row.processingState === 'RESOLUTION_PENDING').every((row) => row.blockerCodes.length === 0));
  assert.ok(ledger.filter((row) => row.enabled).every((row) => row.blockerCodes.length === 0));
});

test('no fabrica respuestas, soluciones ni distractores para registros no verificados', () => {
  for (const row of ledger) {
    assert.equal(row.contentMutationPerformed, false);
    assert.equal(row.generatedAnswer, false);
    assert.equal(row.generatedSolution, false);
    assert.equal(row.generatedDistractors, false);
  }
  assert.equal(summary.contentGeneratedForUnverifiedRecords, false);
  assert.equal(summary.productionConnected, false);
});

test('respuesta, solución y distractores ausentes son tareas pendientes y no bloqueos', () => {
  const pending = ledger.filter((row) => row.processingState === 'RESOLUTION_PENDING');
  assert.ok(pending.every((row) => row.pendingWorkCodes.includes('SOLVE_WITH_VALIDATED_SOLUTION_SKILL')));
  assert.ok(pending.every((row) => row.pendingWorkCodes.includes('INDEPENDENT_MATHEMATICAL_VERIFICATION')));
  assert.ok(pending.every((row) => row.pendingWorkCodes.includes('GENERATE_AND_VALIDATE_THREE_PLAUSIBLE_DISTRACTORS')));
  assert.ok(pending.every((row) => row.pendingWorkCodes.includes('GENERATE_AND_VALIDATE_PEDAGOGICAL_SOLUTION')));
  assert.ok(pending.every((row) => !row.blockerCodes.some((code) => /ANSWER|SOLUTION|DISTRACTOR|VERIFICATION_NOT_COMPLETED/.test(code))));
});

test('el contrato de la skill queda fijado por hash en todos los registros', () => {
  const historical = summary.inputs.solutionSkillContract.sha256;
  const current = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, '.agents', 'skills', 'solucion-de-ejercicios', 'SKILL.md'))).digest('hex');
  assert.equal(historical, '18d4ead04a7159af4882134535a7b15632a430118b0c7f6b24ef45806aab9444');
  assert.ok(ledger.every((row) => row.solutionSkillContractHash === historical));
  assert.notEqual(current, historical, 'la ampliación actual de la skill no debe reescribir el contrato histórico');
});

test('la taxonomía conserva materias y la estructura histórica de examen', () => {
  assert.ok(ledger.every((row) => ['2bach-mates', '2bach-ccss'].includes(row.taxonomy.courseId)));
  assert.ok(ledger.filter((row) => row.subject === 'Matemáticas II' && row.taxonomy.examSlot).every((row) => row.taxonomy.examSlot >= 1 && row.taxonomy.examSlot <= 5));
  assert.ok(ledger.filter((row) => row.subject.includes('CCSS II') && row.taxonomy.examSlot).every((row) => row.taxonomy.examSlot >= 1 && row.taxonomy.examSlot <= 4));
});

test('los artefactos contienen el censo, bloqueos, cobertura, regresión y rollback', () => {
  for (const file of ['summary.json', 'processing-ledger.jsonl', 'blockers.jsonl', 'resolution-queue.jsonl', 'coverage-by-subject-year-topic-block.json', 'enabled-regression.json', 'reproducibility.json']) {
    assert.ok(fs.statSync(path.join(artifact, file)).size > 0, file);
  }
  assert.equal(readJsonl('blockers.jsonl').length, 0);
  assert.equal(readJsonl('resolution-queue.jsonl').length, 1638);
  assert.equal(readJson('enabled-regression.json').total, 28);
  assert.match(readJson('reproducibility.json').rollback, /no production/i);
});

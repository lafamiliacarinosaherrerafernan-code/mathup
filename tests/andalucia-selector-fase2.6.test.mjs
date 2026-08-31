import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const artifact = (name) => JSON.parse(fs.readFileSync(new URL(`../artifacts/andalucia-selector-fase2.6/${name}`, import.meta.url), 'utf8'));
const master = artifact('master-report.json');
const nonRepeat = artifact('non-repeat-audit.json');
const simulations = artifact('simulation-results.json');
const realSimulations = artifact('simulation-results-real-generator.json');
const investigation = artifact('topic-classification-investigation.json');
const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');

test('la auditoría Andalucía fase 2.6 termina sin incidencias funcionales', () => {
  assert.equal(master.status, 'FASE 2.6 COMPLETADA SIN INCIDENCIAS');
  assert.equal(master.anomalyCount, 0);
  assert.equal(master.invariants.withinActivityNoRepeat, true);
  assert.equal(master.invariants.successiveActivityExhaustion, true);
});

test('todos los temas no vacíos agotan N identidades antes de repetir', () => {
  const rows = nonRepeat.filter((row) => row.mode === 'topic' && row.poolCount > 0);
  assert.equal(rows.length, 24);
  rows.forEach((row) => {
    assert.equal(row.withinActivityUnique, true, `${row.courseId} / ${row.contextLabel}`);
    assert.equal(row.firstRepeat, row.poolCount + 1, `${row.courseId} / ${row.contextLabel}`);
    assert.equal(row.verificationMethod, 'runtime-exhaustive');
  });
});

test('los ocho bloques son no vacíos, únicos dentro del reto y repiten en N+1', () => {
  const rows = nonRepeat.filter((row) => row.mode === 'block');
  assert.equal(rows.length, 8);
  rows.forEach((row) => {
    assert.ok(row.poolCount > 0, `${row.courseId} / ${row.contextLabel}`);
    assert.equal(row.withinActivityUnique, true, `${row.courseId} / ${row.contextLabel}`);
    assert.equal(row.firstRepeat, row.poolCount + 1, `${row.courseId} / ${row.contextLabel}`);
    assert.equal(row.balancePolicyCompliant, true, `${row.courseId} / ${row.contextLabel}`);
    assert.equal(row.verificationMethod, 'runtime-exhaustive');
  });
  assert.deepEqual(rows.filter((row) => row.courseId === '2bach-mates').map((row) => row.required), [5, 5, 5, 5]);
  assert.deepEqual(rows.filter((row) => row.courseId === '2bach-ccss').map((row) => row.required), [4, 4, 4, 4]);
});

function assertExamSimulation(rows) {
  rows.forEach((scope) => {
    assert.equal(scope.exams, 1000);
    assert.equal(scope.withinExamDuplicates, 0, scope.courseId);
    scope.slots.forEach((slot) => {
      assert.equal(slot.neverSelected.length, 0, `${scope.courseId} / posición ${slot.slot}`);
      assert.equal(slot.firstRepeatInRealGenerator, slot.distinctSelected + 1, `${scope.courseId} / posición ${slot.slot}`);
    });
  });
}

test('1000 exámenes por materia cubren todos los ejercicios sin repetición prematura', () => {
  assertExamSimulation(simulations);
  assertExamSimulation(realSimulations);
  const mates = master.scopeReports.find((row) => row.courseId === '2bach-mates');
  const ccss = master.scopeReports.find((row) => row.courseId === '2bach-ccss');
  assert.equal(mates.practicalNonRepeatingExamCapacity, 8);
  assert.equal(ccss.practicalNonRepeatingExamCapacity, 118);
});

test('primaryTopic gobierna el bloque CCSS y el cruce de ciclo conserva el orden', () => {
  assert.match(app, /primaryTopicIndex es la fuente de verdad de clasificación/);
  assert.match(app, /return primaryBlock === blockId/);
  assert.match(app, /los últimos inéditos[^]*antes que el primer ejercicio del ciclo nuevo/);
  assert.doesNotMatch(app, /return seededShuffle\(\s*selected,\s*`\$\{state\.courseId\}\|bloque-/);
});

test('los ceros y la sobreclasificación estadística quedan investigados, no asumidos', () => {
  const determinant = investigation.determinantReview;
  assert.equal(investigation.mode, 'READ_ONLY_NO_RECLASSIFICATION');
  assert.equal(determinant.ccssUnequivocalCandidates, 0);
  assert.ok(determinant.ccssCandidates > 0);
  assert.equal(investigation.statisticalClassification.metadataConditionalBayesTotalOrIndependence, 163);
  assert.equal(investigation.statisticalClassification.strongConditionalBayesTotalPromptEvidence, 62);
  assert.equal(investigation.statisticalClassification.metadataWithoutStrongPromptEvidence, 103);
});

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const decisions = JSON.parse(fs.readFileSync(path.join(root, 'artifacts', 'andalucia-topic-classification-phase2.7', 'decision-draft.json'), 'utf8'));
const classification = JSON.parse(fs.readFileSync(path.join(root, 'data', 'andalucia-topic-classification-phase2.7.json'), 'utf8'));
const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });
const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const byId = new Map(runtime.exercises.map((exercise) => [exercise.exerciseId, exercise]));

test('fase 2.7 conserva los tres conjuntos documentales completos', () => {
  assert.deepEqual(
    { mates: decisions.summary.matesReviewed, ccss: decisions.summary.ccssReviewed, statistics: decisions.summary.statisticsReviewed },
    { mates: 15, ccss: 23, statistics: 103 }
  );
  assert.equal(Object.keys(classification.overrides).length, 145);
  assert.deepEqual(
    {
      determinants: decisions.summary.matesToDeterminants,
      systems: decisions.summary.matesToSystems,
      ccssDeterminants: decisions.summary.ccssToDeterminants,
      general: decisions.summary.statisticsGeneral,
      conditional: decisions.summary.statisticsConditional,
      binomial: decisions.summary.statisticsBinomial
    },
    { determinants: 7, systems: 1, ccssDeterminants: 0, general: 10, conditional: 92, binomial: 1 }
  );
  assert.equal(decisions.summary.smallVectorCandidatesReviewed, 6);
  assert.equal(decisions.summary.smallVectorCandidatesReclassified, 4);
  assert.equal(decisions.summary.matesDistributionCandidatesOutsideTopic, 0);
});

test('cada override se aplica exactamente a primaryTopic y secondaryTopics', () => {
  for (const [exerciseId, expected] of Object.entries(classification.overrides)) {
    assert.deepEqual(Object.keys(expected).sort(), ['confidence', 'primaryTopic', 'reason', 'secondaryTopics', 'topicIndex']);
    const actual = byId.get(exerciseId);
    assert.ok(actual, `No existe ${exerciseId}`);
    assert.equal(actual.primaryTopicIndex, expected.topicIndex, exerciseId);
    assert.equal(actual.primaryTopic, expected.primaryTopic, exerciseId);
    assert.deepEqual(
      [...new Set(actual.secondaryTopics || [])].sort(),
      [...new Set(expected.secondaryTopics || [])].sort(),
      exerciseId
    );
  }
});

test('CCSS II no fuerza un tema Determinantes inexistente y recupera el binomial inequívoco', () => {
  const ccssDeterminants = runtime.exercises.filter((exercise) =>
    exercise.subject === '2_bach_ccss_ii' && exercise.primaryTopicIndex === 1
  );
  assert.equal(ccssDeterminants.length, 0);
  const binomial = byId.get('pau-can-ex-9e2505e450a27ce3c4e965b31767aef7');
  assert.equal(binomial.primaryTopicIndex, 9);
  assert.equal(binomial.primaryTopic, 'Distribución binomial y normal');
  assert.ok(binomial.secondaryTopics.includes('Binomial'));
});

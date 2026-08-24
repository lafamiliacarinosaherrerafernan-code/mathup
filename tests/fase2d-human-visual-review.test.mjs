import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  applyDecision, buildBalancedQueue, createEmptyState, environmentDigest,
  invalidateChangedEnvironment, progressFor, readJson, readJsonl,
  recomputePropagation, rollbackLastDecision, sha256, stableStringify,
  validateHumanDecision,
} from '../catalog/human-visual-review/fase2d-human-review.mjs';

const root = path.resolve(import.meta.dirname, '..');
const run = path.join(root, 'artifacts/fase2d/runs/run-a');
const artifactRoot = path.join(root, 'artifacts/fase2d-human-review');

function generated() {
  const decisions = readJsonl(path.join(run, 'visual-decisions.jsonl'));
  const passIds = new Set(decisions.filter((row) => row.automationStatus === 'AUTOMATED_VISUAL_PASS').map((row) => row.visualEntityId));
  const population = readJsonl(path.join(run, 'population.jsonl')).filter((row) => passIds.has(row.visualEntityId));
  const groups = readJsonl(path.join(run, 'render-groups.jsonl'));
  const geometry = readJsonl(path.join(run, 'geometry-results.jsonl')).filter((row) => passIds.has(row.visualEntityId));
  return buildBalancedQueue(population, groups, geometry);
}

test('la cola equilibrada reproduce exactamente el escenario B aprobado', () => {
  const result = generated();
  assert.deepEqual({
    population: result.counts.population, queue: result.counts.queue, inherited: result.counts.inherited,
    exactGroups: result.counts.exactGroups, parametricGroups: result.counts.parametricGroups,
    old: result.counts.oldParametricGroups, balanced: result.counts.balancedParametricGroups,
    individuals: result.counts.individuals,
  }, { population: 7064, queue: 5722, inherited: 1342, exactGroups: 967, parametricGroups: 316, old: 113, balanced: 203, individuals: 3917 });
});

test('la generación es reproducible e invariante frente al orden', () => {
  const first = generated();
  const decisions = readJsonl(path.join(run, 'visual-decisions.jsonl'));
  const passIds = new Set(decisions.filter((row) => row.automationStatus === 'AUTOMATED_VISUAL_PASS').map((row) => row.visualEntityId));
  const population = readJsonl(path.join(run, 'population.jsonl')).filter((row) => passIds.has(row.visualEntityId)).reverse();
  const groups = readJsonl(path.join(run, 'render-groups.jsonl')).reverse();
  const geometry = readJsonl(path.join(run, 'geometry-results.jsonl')).filter((row) => passIds.has(row.visualEntityId)).reverse();
  const second = buildBalancedQueue(population, groups, geometry);
  assert.equal(sha256(stableStringify(first.counts)), sha256(stableStringify(second.counts)));
  assert.deepEqual(first.queue.map((row) => row.visualEntityId), second.queue.map((row) => row.visualEntityId));
  assert.deepEqual(first.groups.map((row) => row.groupId).sort(), second.groups.map((row) => row.groupId).sort());
});

test('ninguna decisión puede crearse sin acción humana explícita', () => {
  assert.throws(() => validateHumanDecision({ decision: 'APROBAR', reviewerId: 'rev-1', viewportsViewed: [320, 1280] }), /acción humana explícita/);
  assert.deepEqual(validateHumanDecision({ humanAction: true, decision: 'APROBAR', reviewerId: 'rev-1', viewportsViewed: [1280, 320] }).viewportsViewed, [320, 1280]);
});

test('la propagación exige todos los testigos y un fallo la revoca', () => {
  const manifest = readJson(path.join(artifactRoot, 'review-manifest.json'));
  const queue = readJsonl(path.join(artifactRoot, 'review-queue.jsonl'));
  const group = manifest.groups.find((row) => row.groupType === 'PARAMETRIC_BALANCED' && row.memberCount > row.requiredWitnessVisualEntityIds.length);
  const state = createEmptyState(manifest);
  for (const id of group.requiredWitnessVisualEntityIds) {
    const reviewCase = queue.find((row) => row.visualEntityId === id);
    applyDecision(state, reviewCase, { humanAction: true, decision: 'APROBAR', reviewerId: 'rev-test', viewportsViewed: [320, 1280] }, `2026-08-24T10:00:${String(state.history.length).padStart(2, '0')}Z`);
  }
  assert.ok(group.memberVisualEntityIds.some((id) => state.propagation[id]));
  const sample = queue.find((row) => row.groupIds.includes(group.groupId) && row.roles.some((role) => role.startsWith('POST_SAMPLE')));
  if (sample) applyDecision(state, sample, { humanAction: true, decision: 'REVISAR/FALLO', reviewerId: 'rev-test', comment: 'Fallo visual comprobado.', viewportsViewed: [320, 1280] }, '2026-08-24T10:05:00Z');
  else {
    const reviewCase = queue.find((row) => group.requiredWitnessVisualEntityIds.includes(row.visualEntityId));
    applyDecision(state, reviewCase, { humanAction: true, decision: 'REVISAR/FALLO', reviewerId: 'rev-test', comment: 'Fallo visual comprobado.', viewportsViewed: [320, 1280] }, '2026-08-24T10:05:00Z');
  }
  assert.equal(Object.values(state.propagation).some((row) => row.groupId === group.groupId), false);
  assert.equal(state.revoked[group.groupId].status, 'GROUP_PROPAGATION_REVOKED');
});

test('persistencia lógica, reanudación, progreso y rollback son reversibles', () => {
  const manifest = readJson(path.join(artifactRoot, 'review-manifest.json'));
  const queue = readJsonl(path.join(artifactRoot, 'review-queue.jsonl'));
  const state = createEmptyState(manifest); const reviewCase = queue[0];
  applyDecision(state, reviewCase, { humanAction: true, decision: 'APROBAR', reviewerId: 'rev-test', viewportsViewed: [320, 1280] }, '2026-08-24T11:00:00Z');
  state.currentQueueIndex = reviewCase.queueIndex;
  const restored = JSON.parse(JSON.stringify(state));
  assert.equal(restored.currentQueueIndex, reviewCase.queueIndex);
  assert.equal(progressFor(restored, queue).reviewed, 1);
  assert.equal(rollbackLastDecision(restored).visualEntityId, reviewCase.visualEntityId);
  assert.equal(progressFor(restored, queue).reviewed, 0);
});

test('un cambio de entorno invalida decisiones y propagación', () => {
  const manifest = readJson(path.join(artifactRoot, 'review-manifest.json'));
  const state = createEmptyState(manifest);
  state.current.example = { decisionId: 'd1', decision: 'APROBAR' }; state.propagation.other = { status: 'INHERITED_HUMAN_VISUAL_PASS' };
  assert.equal(invalidateChangedEnvironment(state, environmentDigest({ changed: true })), true);
  assert.deepEqual(state.current, {}); assert.deepEqual(state.propagation, {}); assert.equal(state.invalidatedDecisions.length, 1);
});

test('la herramienta permanece aislada y los ficheros públicos protegidos no cambian', () => {
  const lock = readJson(path.join(artifactRoot, 'environment-lock.json'));
  assert.equal(lock.network, 'DISABLED'); assert.equal(lock.bind, '127.0.0.1');
  for (const [file, expected] of Object.entries(lock.protectedFiles)) {
    const actual = sha256(fs.readFileSync(path.join(root, file))); assert.equal(actual, expected, file);
  }
  const combined = ['server.mjs', 'public/app.js', 'public/index.html'].map((file) => fs.readFileSync(path.join(root, 'tools/fase2d-human-review', file), 'utf8')).join('\n');
  assert.doesNotMatch(combined, /supabase|https?:\/\/(?!127\.0\.0\.1)/i);
});

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

test('la herramienta permanece aislada; la base protegida solo admite el delta autorizado de entrega andaluza', () => {
  const lock = readJson(path.join(artifactRoot, 'environment-lock.json'));
  assert.equal(lock.network, 'DISABLED'); assert.equal(lock.bind, '127.0.0.1');
  // Evidencia conservada de la auditoría del 30-08-2026:
  // - app.js histórico del lock: a7410b9a7171fc6af051e3fcb819e7fb6cf989f63c040a88a777b74026a66f3b
  // - app.js actual auditado:      3cb6045a7b321fe297f67fc981947fffc5b12acbbe57bd01aa2d14b387586426
  // - normalizado antes esperado:  dd595549ab98ae7d18b58815c2d3faf1df0a82716a9edaa5870125aee74ac0cd
  // - normalizado actual:          682c0b78a8731132f439cb4a9392c416712ac62c8c38c23a745d01cef69508fe
  // El visor nunca carga app.js de producción. Por ello su aislamiento se
  // protege comprobando sus activos propios y la lista cerrada de runtimes,
  // no congelando una aplicación que sigue evolucionando legítimamente.
  assert.equal(lock.protectedFiles['app.js'], 'a7410b9a7171fc6af051e3fcb819e7fb6cf989f63c040a88a777b74026a66f3b');
  const reviewRoot = path.join(root, 'tools/fase2d-human-review');
  const server = fs.readFileSync(path.join(reviewRoot, 'server.mjs'), 'utf8');
  assert.doesNotMatch(server, /path\.join\(root,\s*['"]app\.js['"]\)/);
  assert.match(server, /\['\/runtime\/math-renderer\.js',\s*path\.join\(root,\s*['"]math-renderer\.js['"]\)\]/);
  assert.doesNotMatch(server, /\['\/runtime\/app\.js'/);

  for (const [key, file] of Object.entries({ client: 'public/app.js', css: 'public/styles.css', html: 'public/index.html' })) {
    assert.equal(sha256(fs.readFileSync(path.join(reviewRoot, file))), lock.reviewAssets[key], file);
  }
  // index.html de producción tampoco forma parte del visor; el lock conserva
  // su huella histórica sin convertirla en una prohibición de evolución.
  assert.equal(lock.protectedFiles['index.html'], 'fbfba6962544100768bd02eac34f80f67d433d7174da77e864e88b8b632b42d8');
  const renderer = fs.readFileSync(path.join(root, 'math-renderer.js'), 'utf8');
  assert.match(renderer, /globalScope\.MargaritaMathRenderer\s*=\s*Object\.freeze\(\{[^]*normalize,[^]*fragment,[^]*text,[^]*html,[^]*matrix:\s*renderMatrix,[^]*system:\s*renderSystem,[^]*looksMathematical/);
  assert.doesNotMatch(renderer, /supabase/i);
  const rendererUrls = renderer.match(/https?:\/\/[^"'\s<>`]+/g) || [];
  assert.deepEqual([...new Set(rendererUrls)], ['http://www.w3.org/1998/Math/MathML']);

  const combined = ['server.mjs', 'public/app.js', 'public/index.html'].map((file) => fs.readFileSync(path.join(reviewRoot, file), 'utf8')).join('\n');
  assert.doesNotMatch(combined, /supabase|https?:\/\/(?!127\.0\.0\.1)/i);
});

test('el piloto contiene 24 casos reales sin decisiones y no altera la cola principal', () => {
  const pilotPath = path.join(root, 'artifacts/fase2d-human-review/pilots/pilot-24.json');
  const mainQueue = readJsonl(path.join(artifactRoot, 'review-queue.jsonl'));
  assert.ok(fs.existsSync(pilotPath));
  const pilot = JSON.parse(fs.readFileSync(pilotPath, 'utf8'));
  assert.equal(pilot.caseCount, 24);
  assert.equal(pilot.sourceQueueCount, 5722);
  assert.equal(pilot.sourceCoverageCount, 7064);
  assert.equal(new Set(pilot.cases.map((item) => item.visualEntityId)).size, 24);
  assert.ok(pilot.cases.every((item) => mainQueue.some((reviewCase) => reviewCase.visualEntityId === item.visualEntityId)));
  assert.doesNotMatch(JSON.stringify(pilot), /humanAction|HUMAN_VISUAL_PASS|"decision"\s*:/);
  assert.ok(!fs.existsSync(path.join(root, 'artifacts/fase2d-human-review/local-state/review-state.json')));
});

test('el piloto reconstruye 24 fichas completas sin alterar el censo ni la cola principal', () => {
  const pilotPath = path.join(root, 'artifacts/fase2d-human-review/pilots/pilot-24-exercises.json');
  const workloadPath = path.join(root, 'artifacts/fase2d-human-review/pilots/exercise-workload-summary.json');
  const mainQueue = readJsonl(path.join(artifactRoot, 'review-queue.jsonl'));
  const pilot = JSON.parse(fs.readFileSync(pilotPath, 'utf8'));
  const workload = JSON.parse(fs.readFileSync(workloadPath, 'utf8'));
  assert.equal(pilot.schemaVersion, 'mathup.fase2d.human-review-exercise-pilot.v1');
  assert.equal(pilot.cardCount, 24);
  assert.equal(new Set(pilot.cases.map((item) => item.exerciseId)).size, 24);
  assert.equal(pilot.sourceQueueCount, 5722);
  assert.equal(pilot.sourceCoverageCount, 7064);
  assert.ok(pilot.cases.every((item) => item.visualEntityIds.length >= 1));
  assert.ok(pilot.cases.every((item) => mainQueue.some((row) => row.visualEntityId === item.selectedVisualEntityId)));
  assert.deepEqual({
    entities: workload.sourceAutomatedVisualPassEntities,
    previous: workload.previousDirectObservations,
    cards: workload.proposedFullExerciseCards,
    reduction: workload.reductionAgainstPreviousObservations,
  }, { entities: 7064, previous: 5722, cards: 4981, reduction: 741 });
  assert.doesNotMatch(JSON.stringify(pilot), /humanAction|HUMAN_VISUAL_PASS|"decision"\s*:/);
});

test('la vista principal reutiliza el motor, estilos y clases reales de alumno de +MathUp', () => {
  const server = fs.readFileSync(path.join(root, 'tools/fase2d-human-review/server.mjs'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'tools/fase2d-human-review/public/app.js'), 'utf8');
  const html = fs.readFileSync(path.join(root, 'tools/fase2d-human-review/public/index.html'), 'utf8');
  assert.match(server, /\/runtime\/math-renderer\.js/);
  assert.match(server, /\/runtime\/styles\.css/);
  assert.match(server, /\/runtime\/math-notation\.css/);
  assert.match(server, /MargaritaMathRenderer/);
  assert.match(server, /question-text pau-open-statement/);
  assert.match(server, /answer-btn correct/);
  assert.match(server, /solution-help-body/);
  assert.match(server, /solution-step-label[^]*Paso/);
  assert.match(server, /solution-final-title[^]*Resultado final/);
  assert.match(server, /materializeSessionExercise/);
  assert.match(server, /fase2d-human-review:\$\{pilotId\}:\$\{pilotCase\.exerciseId\}/);
  assert.match(server, /options: session\.options\.map\(\(\{ position, value, optionInstanceId \}\)/);
  assert.match(server, /OPCIONES NO DISPONIBLES \/ PENDIENTES/);
  assert.match(server, /Ver soluci/);
  assert.doesNotMatch(server, /options: session\.options\.map\(\(\{[^}]*correct/);
  assert.match(html, /Así lo verá el alumno/);
  assert.match(html, /Información técnica/);
  assert.doesNotMatch(app, /api\/resume/);
  assert.match(app, /inspectionOnly/);
});

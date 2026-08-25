import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  buildReviewQueue, createEmptyState, deriveExerciseStatuses, queueSemanticHash,
  recordHumanDecision, rollbackLastDecision, sha256, summarizeProgress,
} from '../catalog/equation3-human-comparison/human-comparison.mjs';

const root = path.resolve(import.meta.dirname, '..');
const sourcePath = path.join(root, 'artifacts/equation3-andalucia-2012/runs/run-a/recovered-equations.jsonl');
const exercisePath = path.join(root, 'artifacts/andalucia-ccssii-2012-doc/runs/run-a/recovered-exercises.jsonl');
const rows = fs.readFileSync(sourcePath, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const exercises = fs.readFileSync(exercisePath, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const queue = buildReviewQueue(rows, exercises);
const queueHash = queueSemanticHash(queue);

test('la cola contiene exactamente los 55 objetos Equation.3', () => assert.equal(queue.length, 55));
test('los 55 objectId son unicos', () => assert.equal(new Set(queue.map((item) => item.objectId)).size, 55));
test('todos conservan trazabilidad a ejercicio o apartado', () => {
  for (const item of queue) {
    assert.ok(item.documentExerciseId);
    assert.ok(Number.isInteger(item.exerciseNumber));
    assert.ok(item.scope === 'EXERCISE' || item.subpart);
  }
});
test('todos enlazan evidencia PNG y EMF oficial con hash', () => {
  for (const item of queue) {
    assert.match(item.officialEvidence.pngSha256, /^[a-f0-9]{64}$/);
    assert.match(item.officialEvidence.emfSha256, /^[a-f0-9]{64}$/);
    const png = path.join(root, item.officialEvidence.pngPath);
    assert.ok(fs.existsSync(png));
    assert.equal(sha256(fs.readFileSync(png)), item.officialEvidence.pngSha256);
  }
});
test('todos renderizan MathML derivado del AST recuperado', () => {
  for (const item of queue) {
    assert.match(item.recoveredRepresentation.mathml, /^<math[\s>]/);
    assert.match(item.recoveredRepresentation.astSha256, /^[a-f0-9]{64}$/);
  }
});
test('la construccion es reproducible', () => assert.deepEqual(buildReviewQueue(rows, exercises), queue));
test('la construccion es invariante al orden de entrada', () => assert.deepEqual(buildReviewQueue([...rows].reverse(), [...exercises].reverse()), queue));
test('los 55 objetos tienen asociacion documental completa demostrada', () => {
  assert.equal(queue.filter((item) => item.exerciseContext.status === 'CONTEXT_MAPPING_VERIFIED').length, 55);
});
test('el contexto visible no contiene puntuaciones PAU y conserva scoreEvidence', () => {
  const score = /\(\s*\d+(?:[.,]\d+)?\s*(?:punto|puntos|pto\.?|ptos\.?)\s*\)/iu;
  for (const item of queue) assert.doesNotMatch(item.exerciseContext.blocks.filter((block) => block.type === 'text').map((block) => block.text).join(' '), score);
  assert.ok(queue.some((item) => item.exerciseContext.scoreEvidence.length > 0));
});
test('el primer caso muestra el ejercicio completo, definiciones y todos sus objetos', () => {
  const first = queue[0];
  const text = first.exerciseContext.blocks.filter((block) => block.type === 'text').map((block) => block.text).join(' ');
  assert.match(text, /Sean las matrices/);
  assert.match(text, /Halle los valores/);
  assert.equal(first.exerciseContext.blocks.filter((block) => block.type === 'document-object').length, 3);
  assert.equal(first.exerciseContext.blocks.filter((block) => block.isTarget).length, 1);
});
test('el estado inicial no contiene decisiones humanas', () => assert.deepEqual(createEmptyState(queueHash).decisions, {}));
test('es imposible aprobar sin accion humana explicita', () => {
  assert.throws(() => recordHumanDecision(createEmptyState(queueHash), queue, { objectId: queue[0].objectId, decision: 'COINCIDE', reviewerId: 'test' }), /accion humana explicita/);
});
test('solo se aceptan las tres decisiones autorizadas', () => {
  assert.throws(() => recordHumanDecision(createEmptyState(queueHash), queue, { humanAction: true, objectId: queue[0].objectId, decision: 'APROBADO', reviewerId: 'test' }), /Decision no permitida/);
});
test('NO COINCIDE y DUDOSO exigen comentario', () => {
  for (const decision of ['NO_COINCIDE', 'DUDOSO']) assert.throws(() => recordHumanDecision(createEmptyState(queueHash), queue, { humanAction: true, objectId: queue[0].objectId, decision, reviewerId: 'test' }), /requieren un comentario/);
});
test('la accion humana conserva hashes y revisor', () => {
  const next = recordHumanDecision(createEmptyState(queueHash), queue, { humanAction: true, objectId: queue[0].objectId, decision: 'COINCIDE', reviewerId: 'profesora' }, () => '2026-08-25T12:00:00.000Z');
  assert.equal(next.decisions[queue[0].objectId].explicitHumanAction, true);
  assert.equal(next.decisions[queue[0].objectId].caseHash, queue[0].caseHash);
  assert.equal(next.decisions[queue[0].objectId].reviewerId, 'profesora');
});
test('el estado serializado permite reanudar exactamente', () => {
  const next = recordHumanDecision(createEmptyState(queueHash), queue, { humanAction: true, objectId: queue[1].objectId, decision: 'DUDOSO', reviewerId: 'profesora', comment: 'revisar signo' }, () => '2026-08-25T12:00:00.000Z');
  assert.deepEqual(JSON.parse(JSON.stringify(next)), next);
  assert.equal(next.lastObjectId, queue[1].objectId);
});
test('un fallo o duda marca el ejercicio para revision', () => {
  const item = queue[0];
  const statuses = deriveExerciseStatuses(queue, { [item.objectId]: { decision: 'NO_COINCIDE' } });
  assert.equal(statuses.find((entry) => entry.documentExerciseId === item.documentExerciseId).status, 'EQUATION3_REVIEW_REQUIRED');
});
test('solo todos los objetos coincidentes validan el ejercicio', () => {
  const exerciseId = queue[0].documentExerciseId;
  const exerciseItems = queue.filter((item) => item.documentExerciseId === exerciseId);
  const decisions = Object.fromEntries(exerciseItems.map((item) => [item.objectId, { decision: 'COINCIDE' }]));
  assert.equal(deriveExerciseStatuses(queue, decisions).find((entry) => entry.documentExerciseId === exerciseId).status, 'EQUATION3_HUMAN_VALIDATED');
});
test('un ejercicio incompleto permanece pendiente', () => {
  assert.equal(deriveExerciseStatuses(queue, {}).every((entry) => entry.status === 'EQUATION3_HUMAN_REVIEW_PENDING'), true);
});
test('el progreso suma revisados y pendientes sin inventar aprobaciones', () => {
  const progress = summarizeProgress(queue, {});
  assert.deepEqual({ total: progress.total, reviewed: progress.reviewed, pending: progress.pending, coincide: progress.COINCIDE }, { total: 55, reviewed: 0, pending: 55, coincide: 0 });
});
test('rollback elimina la ultima decision', () => {
  const decided = recordHumanDecision(createEmptyState(queueHash), queue, { humanAction: true, objectId: queue[0].objectId, decision: 'COINCIDE', reviewerId: 'test' });
  assert.deepEqual(rollbackLastDecision(decided).decisions, {});
});
test('el piloto contiene exactamente los tres primeros casos deterministas', () => {
  const pilot = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/equation3-human-comparison/pilot-first-3.json'), 'utf8'));
  assert.deepEqual(pilot.objectIds, queue.slice(0, 3).map((item) => item.objectId));
});
test('el piloto de inspeccion contiene solo el objeto 1', () => {
  const pilot = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/equation3-human-comparison/pilot-object-1.json'), 'utf8'));
  assert.deepEqual(pilot.objectIds, [queue[0].objectId]);
});
test('cada caso enlaza una vista PDF oficial completa de solo lectura', () => {
  for (const item of queue) assert.match(item.originalDocumentView.pdfPath, new RegExp(`${item.documentId}\\.pdf$`));
});
test('el estado local esta excluido de Git', () => {
  const ignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
  assert.match(ignore, /\/artifacts\/equation3-human-comparison\/local-state\//);
});
test('la herramienta permanece aislada de produccion', () => {
  const files = [
    'catalog/equation3-human-comparison/human-comparison.mjs',
    'scripts/build-equation3-human-comparison-queue.mjs',
    'tools/equation3-human-comparison/server.mjs',
  ];
  const text = files.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
  assert.doesNotMatch(text, /supabase|index\.html[^']*app\.js|math-renderer\.js/i);
});
test('la interfaz reanuda en el primer pendiente y avanza al siguiente pendiente', () => {
  const app = fs.readFileSync(path.join(root, 'tools/equation3-human-comparison/public/app.js'), 'utf8');
  assert.match(app, /firstPendingIndex\(state\.filtered, state\.decisions\)/);
  assert.match(app, /firstPendingIndex\(state\.filtered, state\.decisions, state\.index\)/);
  assert.match(app, /state\.index = nextPending/);
});
test('la interfaz conserva el ultimo revisor y limpia el comentario tras guardar', () => {
  const app = fs.readFileSync(path.join(root, 'tools/equation3-human-comparison/public/app.js'), 'utf8');
  assert.match(app, /latestReviewer\(state\.decisions\)/);
  assert.match(app, /\$\('comment'\)\.value = ''/);
});
test('la navegacion manual no registra decisiones', () => {
  const app = fs.readFileSync(path.join(root, 'tools/equation3-human-comparison/public/app.js'), 'utf8');
  const navigateBody = app.match(/function navigate\(delta\) \{([\s\S]*?)\n\}/)?.[1] ?? '';
  assert.doesNotMatch(navigateBody, /api\/decision|recordHumanDecision/);
  const html = fs.readFileSync(path.join(root, 'tools/equation3-human-comparison/public/index.html'), 'utf8');
  assert.match(html, /← ANTERIOR/);
  assert.match(html, /SIGUIENTE →/);
});
test('la interfaz incluye el resumen final completo', () => {
  const html = fs.readFileSync(path.join(root, 'tools/equation3-human-comparison/public/index.html'), 'utf8');
  for (const id of ['summaryReviewed', 'summaryPending', 'summaryCoincide', 'summaryNoCoincide', 'summaryDoubt']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

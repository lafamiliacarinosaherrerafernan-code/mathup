import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildReviewQueue, queueSemanticHash, sha256, stableStringify } from '../catalog/equation3-human-comparison/human-comparison.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'artifacts/equation3-andalucia-2012/runs/run-a/recovered-equations.jsonl');
const exercisePath = path.join(root, 'artifacts/andalucia-ccssii-2012-doc/runs/run-a/recovered-exercises.jsonl');
const outputDir = path.join(root, 'artifacts/equation3-human-comparison');
const rows = fs.readFileSync(sourcePath, 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const exercises = fs.readFileSync(exercisePath, 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const queue = buildReviewQueue(rows, exercises);

if (queue.length !== 55) throw new Error(`Se esperaban 55 objetos y se obtuvieron ${queue.length}.`);
if (new Set(queue.map((item) => item.objectId)).size !== 55) throw new Error('La cola contiene identificadores duplicados.');
if (queue.some((item) => item.exerciseContext.status !== 'CONTEXT_MAPPING_VERIFIED')) throw new Error('Hay objetos sin asociacion documental completa.');

for (const item of queue) {
  const png = path.join(root, item.officialEvidence.pngPath);
  if (!fs.existsSync(png)) throw new Error(`Falta la evidencia oficial ${item.officialEvidence.pngPath}`);
  if (sha256(fs.readFileSync(png)) !== item.officialEvidence.pngSha256) throw new Error(`Hash PNG distinto: ${item.objectId}`);
}

fs.mkdirSync(outputDir, { recursive: true });
const queueText = `${queue.map(stableStringify).join('\n')}\n`;
fs.writeFileSync(path.join(outputDir, 'review-queue.jsonl'), queueText, 'utf8');
const manifest = {
  schemaVersion: 'mathup.equation3-human-comparison.manifest.v1',
  generatedAt: '2026-08-25T00:00:00.000Z',
  sourcePath: path.relative(root, sourcePath).replaceAll('\\', '/'),
  sourceSha256: sha256(fs.readFileSync(sourcePath)),
  exerciseSourcePath: path.relative(root, exercisePath).replaceAll('\\', '/'),
  exerciseSourceSha256: sha256(fs.readFileSync(exercisePath)),
  queueCount: queue.length,
  exerciseCount: new Set(queue.map((item) => item.documentExerciseId)).size,
  queueSemanticHash: queueSemanticHash(queue),
  queueFileSha256: sha256(queueText),
  decisionsAtBuild: 0,
};
fs.writeFileSync(path.join(outputDir, 'review-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, 'pilot-first-3.json'), `${JSON.stringify({
  schemaVersion: 'mathup.equation3-human-comparison.pilot.v1',
  pilotId: 'first-3',
  objectIds: queue.slice(0, 3).map((item) => item.objectId),
  queueSemanticHash: manifest.queueSemanticHash,
}, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, 'pilot-object-1.json'), `${JSON.stringify({
  schemaVersion: 'mathup.equation3-human-comparison.pilot.v1',
  pilotId: 'object-1',
  objectIds: [queue[0].objectId],
  queueSemanticHash: manifest.queueSemanticHash,
}, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(manifest, null, 2));

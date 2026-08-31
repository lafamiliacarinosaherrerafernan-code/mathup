import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildGroups, buildPopulation, buildSamplingPlan, countBy, hashFile, readJsonl,
  sha256, stableStringify, writeJson, writeJsonl,
} from '../catalog/visual-audit/fase2d-visual-audit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runId = process.argv.find((arg) => arg.startsWith('--run-id='))?.split('=')[1] ?? 'run-a';
const outputRoot = process.argv.find((arg) => arg.startsWith('--output-root='))?.split('=')[1] ?? 'artifacts/fase2d/runs';
const reverse = process.argv.includes('--reverse');
const out = path.join(ROOT, outputRoot, runId);
fs.mkdirSync(out, { recursive: true });

const inputs = {
  decisions: 'artifacts/fase2c/runs/run-a/normalization-decisions.jsonl',
  documents: 'artifacts/fase2c/runs/run-a/math-documents.jsonl',
  exercises: 'artifacts/fase2b/runs/run-a/exercise-v2.jsonl',
  sourceReconciliation: 'artifacts/fase2b/runs/run-a/source-reconciliation.jsonl',
  educationalReconciliation: 'artifacts/fase2b/runs/run-a/educational-content-reconciliation.jsonl',
};
const decisions = readJsonl(path.join(ROOT, inputs.decisions));
const documents = readJsonl(path.join(ROOT, inputs.documents));
const exercises = readJsonl(path.join(ROOT, inputs.exercises));
const sourceRows = readJsonl(path.join(ROOT, inputs.sourceReconciliation));
const originalRows = readJsonl(path.join(ROOT, inputs.educationalReconciliation));
let population = buildPopulation(decisions, documents, exercises);
if (reverse) population = [...population].reverse();
const canonicalPopulation = [...population].sort((a, b) => a.visualEntityId.localeCompare(b.visualEntityId));
const groups = buildGroups(canonicalPopulation);
const sampling = buildSamplingPlan(canonicalPopulation, groups);

if (canonicalPopulation.length !== 7067) throw new Error(`Expected 7067 visual entities, received ${canonicalPopulation.length}`);
const expectedEntities = { statement: 3777, answer: 2211, solution: 1079 };
const actualEntities = countBy(canonicalPopulation, (row) => row.entityType);
if (stableStringify(actualEntities) !== stableStringify(expectedEntities)) throw new Error(`Entity distribution mismatch: ${stableStringify(actualEntities)}`);
if (sourceRows.length !== 15527 || originalRows.length !== 6712 || originalRows.filter((row) => row.accessible === false).length !== 607) {
  throw new Error('Protected reconciliation counts changed');
}

const protectedPaths = ['index.html', 'app.js', 'math-renderer.js'].filter((name) => fs.existsSync(path.join(ROOT, name)));
const protectedFiles = Object.fromEntries(protectedPaths.map((name) => [name, hashFile(path.join(ROOT, name))]));
const inputManifest = {
  schemaVersion: 'mathup.fase2d.input-manifest.v1',
  runId,
  order: reverse ? 'reverse' : 'normal',
  createdFromImmutableInputs: true,
  inputs: Object.fromEntries(Object.entries(inputs).map(([key, relative]) => [key, { path: relative, sha256: hashFile(path.join(ROOT, relative)) }])),
  protectedFiles,
  baselines: { sourceRecords: sourceRows.length, originalExercises: originalRows.length, inaccessibleExercises: 607, visualEntities: canonicalPopulation.length },
  harness: { version: 'mathup.fase2d.harness.v1', networkRequired: false, productionImports: 0, dpr: 1, locale: 'es-ES' },
};

writeJson(path.join(out, 'input-manifest.json'), inputManifest);
writeJsonl(path.join(out, 'population.jsonl'), canonicalPopulation);
writeJsonl(path.join(out, 'render-groups.jsonl'), groups);
writeJson(path.join(out, 'sampling-plan.json'), sampling);
writeJson(path.join(out, 'preparation-summary.json'), {
  schemaVersion: 'mathup.fase2d.preparation-summary.v1',
  population: canonicalPopulation.length,
  plannedExecutions: canonicalPopulation.length * 4,
  byEntityType: actualEntities,
  byCourse: countBy(canonicalPopulation, (row) => row.courseId),
  byPriority: countBy(canonicalPopulation, (row) => row.priority),
  exactGroups: groups.filter((row) => row.groupType === 'EXACT_RENDER_GROUP').length,
  singularEntities: groups.filter((row) => row.groupType === 'SINGULAR').length,
  humanReviewSelected: sampling.selectedVisualEntityIds.length,
  populationDigest: sha256(canonicalPopulation.map((row) => row.visualEntityId).join('|')),
});
process.stdout.write(`${stableStringify({ runId, population: canonicalPopulation.length, plannedExecutions: canonicalPopulation.length * 4 })}\n`);

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runId = process.argv.find((arg) => arg.startsWith('--run-id='))?.split('=')[1] ?? 'run-a';
const runRoot = path.join(root, 'artifacts/fase2c/runs', runId);
const summary = JSON.parse(fs.readFileSync(path.join(runRoot, 'classification-summary.json'), 'utf8'));
const reconciliation = JSON.parse(fs.readFileSync(path.join(runRoot, 'reconciliation-summary.json'), 'utf8'));
const required = {
  total: 16783,
  sourceRecords: 15527,
  originalExercises: 6712,
  inaccessibleExercises: 607,
  exercisesV2: 7485,
  answers: 4649,
  solutions: 4649,
};
const checks = {
  total: summary.total === required.total,
  dispositionsAreExclusive: Object.values(summary.primaryDisposition).reduce((a, b) => a + b, 0) === required.total,
  sourceRecords: reconciliation.actual.sourceRecords === required.sourceRecords,
  originalExercises: reconciliation.actual.originalExercises === required.originalExercises,
  inaccessibleExercises: reconciliation.actual.inaccessibleExercises === required.inaccessibleExercises,
  exercisesV2: reconciliation.actual.exercisesV2 === required.exercisesV2,
  answers: reconciliation.actual.answers === required.answers,
  solutions: reconciliation.actual.solutions === required.solutions,
  noSourceRecordDisappeared: reconciliation.sourceRecordIds.disappeared.length === 0,
};
if (Object.values(checks).includes(false)) throw new Error(`Phase 2C classification audit failed: ${JSON.stringify(checks)}`);
process.stdout.write(`${JSON.stringify({ runId, checks, primaryDisposition: summary.primaryDisposition })}\n`);

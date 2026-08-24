import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { runPhase2C } from './fase2c-normalize-catalog.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/fase2c/runs/run-a/input-manifest.json'), 'utf8')).protectedFiles;
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'mathup-fase2c-rollback-'));
const outputRoot = path.relative(root, scratch).replaceAll('\\', '/');
runPhase2C({ runId: 'trial', outputRoot, order: 'normal' });
const created = fs.existsSync(path.join(scratch, 'trial'));
fs.rmSync(scratch, { recursive: true, force: true });
const removed = !fs.existsSync(scratch);
const hash = (relative) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, relative))).digest('hex');
const protectedUnchanged = Object.entries(baseline).every(([relative, expected]) => hash(relative) === expected);
const report = {
  schemaVersion: 'mathup.fase2c.rollback-trial.v1',
  isolatedArtifactsCreated: created,
  isolatedArtifactsRemoved: removed,
  protectedFilesUnchanged: protectedUnchanged,
  productionDependencies: [],
  passed: created && removed && protectedUnchanged,
};
if (!report.passed) throw new Error(`Rollback trial failed: ${JSON.stringify(report)}`);
fs.writeFileSync(path.join(root, 'artifacts/fase2c/rollback-trial.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
process.stdout.write(`${JSON.stringify(report)}\n`);

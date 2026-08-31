import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runPhase2C } from './fase2c-normalize-catalog.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = 'artifacts/fase2c/reproducibility';
const runs = [
  runPhase2C({ runId: 'repeat-a', outputRoot, order: 'normal' }),
  runPhase2C({ runId: 'repeat-b', outputRoot, order: 'normal' }),
  runPhase2C({ runId: 'reverse-order', outputRoot, order: 'reverse' }),
];
const digests = runs.map((run) => run.semanticManifest.semanticDigest);
const report = {
  schemaVersion: 'mathup.fase2c.reproducibility.v1',
  doubleRunEqual: digests[0] === digests[1],
  reverseOrderInvariant: digests[0] === digests[2],
  semanticDigests: { repeatA: digests[0], repeatB: digests[1], reverseOrder: digests[2] },
};
if (!report.doubleRunEqual || !report.reverseOrderInvariant) throw new Error(`Reproducibility failure: ${JSON.stringify(report)}`);
const destination = path.join(root, 'artifacts/fase2c/reproducibility-summary.json');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
process.stdout.write(`${JSON.stringify(report)}\n`);

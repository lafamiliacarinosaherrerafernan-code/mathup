import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
test('doble corrida e inversión de orden producen el mismo hash semántico', () => {
  const report = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/fase2c/reproducibility-summary.json'), 'utf8'));
  assert.equal(report.doubleRunEqual, true);
  assert.equal(report.reverseOrderInvariant, true);
  assert.equal(new Set(Object.values(report.semanticDigests)).size, 1);
});

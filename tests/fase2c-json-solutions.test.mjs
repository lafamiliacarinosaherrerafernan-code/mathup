import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rows = fs.readFileSync(path.join(root, 'artifacts/fase2c/runs/run-a/json-solution-audit.jsonl'), 'utf8').trim().split(/\r?\n/).map(JSON.parse);
test('las 3.295 soluciones JSON están auditadas una a una', () => assert.equal(rows.length, 3295));
test('todas las extracciones aceptadas conservan orden, hashes, procedencia y resultado externo', () => {
  for (const row of rows.filter((item) => item.accepted)) {
    assert.equal(row.roundTripExact, true);
    assert.match(row.originalHash, /^[0-9a-f]{64}$/);
    assert.ok(row.keysInSourceOrder.length > 0);
    assert.ok(row.blockKeyOrders.length > 0);
    assert.ok(row.sourceRecordIds.length > 0);
    assert.ok(Array.isArray(row.finalAnswers));
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifyNotationRow, parseLosslessJsonSolution } from '../catalog/normalization/normalize-math-structure.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const summary = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/fase2c/runs/run-a/classification-summary.json'), 'utf8'));
test('las 16.783 entidades tienen una disposición primaria exclusiva', () => {
  assert.equal(summary.total, 16783);
  assert.equal(Object.values(summary.primaryDisposition).reduce((a, b) => a + b, 0), 16783);
});
test('corrupción de fuente nunca se normaliza silenciosamente', () => {
  const row = { diagnosis: 'SOURCE_CORRUPTION', issues: ['SOURCE_MATH_COMMAND_MISSING_BACKSLASH'] };
  assert.equal(classifyNotationRow(row).classification, 'SOURCE_REVIEW_REQUIRED');
});
test('una etiqueta falsa demostrable solo habilita una superposición paralela', () => {
  const row = { diagnosis: 'CANONICAL_STRUCTURE_ERROR', issues: ['CANONICAL_IMAGE_FORMAT_WITHOUT_IMAGE_REFERENCE'] };
  const result = classifyNotationRow(row);
  assert.equal(result.classification, 'SAFE_AUTOMATIC_NORMALIZATION');
  assert.deepEqual(result.rules, ['LOSSLESS_FORMAT_RELABEL_OVERLAY']);
});
test('JSON desconocido se conserva y se envía a revisión', () => {
  const jsonResult = parseLosslessJsonSolution('{"unknown":true}');
  const row = { diagnosis: 'CANONICAL_STRUCTURE_ERROR', issues: ['RAW_JSON_IN_TEXT_FIELD'] };
  assert.equal(classifyNotationRow(row, { jsonResult }).classification, 'SOURCE_REVIEW_REQUIRED');
});

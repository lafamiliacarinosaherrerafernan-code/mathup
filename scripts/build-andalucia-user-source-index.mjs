import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const inventoryPath = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation', 'user-document-inventory.jsonl');
const outputPath = path.join(root, 'data', 'andalucia-user-source-index.js');

const rows = fs.readFileSync(inventoryPath, 'utf8')
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line))
  .sort((a, b) => a.sha256.localeCompare(b.sha256));

if (rows.length !== 217) throw new Error(`Se esperaban 217 exámenes del usuario y hay ${rows.length}.`);
if (new Set(rows.map((row) => row.sha256)).size !== rows.length) throw new Error('Hay hashes de documento duplicados.');

const index = Object.fromEntries(rows.map((row) => [row.sha256, {
  fileName: row.fileName,
  relativePath: row.relativePath,
  subject: row.courseId === '2bach-mates' ? '2_bach_mates_ii' : '2_bach_ccss_ii',
  year: row.year,
  sitting: row.sitting,
  reserveNumber: row.reserveNumber ?? null,
  sha256: row.sha256,
  sourcePriority: 'USER_SUPPLIED_PRIMARY'
}]));

const source = `(function () {\n  'use strict';\n  window.ANDALUCIA_USER_SOURCE_INDEX = Object.freeze(${JSON.stringify(index, null, 2)});\n})();\n`;
fs.writeFileSync(outputPath, source);
console.log(JSON.stringify({ documents: rows.length, output: path.relative(root, outputPath).replaceAll('\\\\', '/') }));

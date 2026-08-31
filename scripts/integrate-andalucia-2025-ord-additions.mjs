import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { additions2025Ord } from '../data/andalucia-pau-additions-2025-ord.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtimePath = path.join(root, 'data', 'andalucia-pau-runtime.js');
const start = '  /* BEGIN USER-SUPPLIED ANDALUCIA 2025 ORD ADDITIONS */';
const end = '  /* END USER-SUPPLIED ANDALUCIA 2025 ORD ADDITIONS */';
let source = fs.readFileSync(runtimePath, 'utf8');
const block = `${start}\n  exercises.push(...${JSON.stringify(additions2025Ord)});\n${end}\n\n`;
if (source.includes(start)) {
  source = source.replace(new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\r?\\n\\r?\\n`), block);
} else {
  source = source.replace('  function recordsForCourse(courseId) {', `${block}  function recordsForCourse(courseId) {`);
}
source = source.replace("const CANONICAL_TOTAL = 1666;", "const CANONICAL_TOTAL = 1673;")
  .replace("const PUBLISHABLE_TOTAL = 1466;", "const PUBLISHABLE_TOTAL = 1473;");
fs.writeFileSync(runtimePath, source, 'utf8');
console.log(JSON.stringify({ integrated: additions2025Ord.length, parts: additions2025Ord.flatMap((record) => record.parts).length }));

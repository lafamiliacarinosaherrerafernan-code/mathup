import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { additions2025Ord } from '../data/andalucia-pau-additions-2025-ord.mjs';
import { additionsCcss2008R1 } from '../data/andalucia-pau-additions-ccss-2008-r1.mjs';
import { additionsLegacy } from '../data/andalucia-pau-additions-legacy.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtimePath = path.join(root, 'data', 'andalucia-pau-runtime.js');
const additions = [...additions2025Ord, ...additionsCcss2008R1, ...additionsLegacy];
const oldStart = '  /* BEGIN USER-SUPPLIED ANDALUCIA 2025 ORD ADDITIONS */';
const oldEnd = '  /* END USER-SUPPLIED ANDALUCIA 2025 ORD ADDITIONS */';
const start = '  /* BEGIN USER-SUPPLIED ANDALUCIA RECONCILED ADDITIONS */';
const end = '  /* END USER-SUPPLIED ANDALUCIA RECONCILED ADDITIONS */';
let source = fs.readFileSync(runtimePath, 'utf8');
for (const [from, to] of [[oldStart, oldEnd], [start, end]]) {
  const begin = source.indexOf(from);
  if (begin >= 0) {
    const finish = source.indexOf(to, begin);
    if (finish < 0) throw new Error(`Missing marker ${to}`);
    source = source.slice(0, begin) + source.slice(finish + to.length).replace(/^\r?\n\r?\n/, '');
  }
}
const block = `${start}\n  exercises.push(...${JSON.stringify(additions)});\n  // Las incorporaciones se añaden después de la reconciliación general, por lo que\n  // reciben aquí la misma autoridad documental aportada por el usuario.\n  const reconciledAdditionSourceIndex = window.ANDALUCIA_USER_SOURCE_INDEX || {};\n  for (const item of exercises) {\n    if (item.sourceAuthority !== 'USER_SUPPLIED_PRIMARY_OFFICIAL_DOCUMENT') continue;\n    const supplied = reconciledAdditionSourceIndex[item.documentHash];\n    if (!supplied) continue;\n    item.year = supplied.year;\n    item.sitting = supplied.sitting;\n    item.reserveNumber = supplied.reserveNumber;\n    item.userSource = clone(supplied);\n  }\n${end}\n\n`;
source = source.replace('  function recordsForCourse(courseId) {', `${block}  function recordsForCourse(courseId) {`);
source = source.replace(/const CANONICAL_TOTAL = \d+;/, `const CANONICAL_TOTAL = ${1666 + additions.length};`)
  .replace(/const PUBLISHABLE_TOTAL = \d+;/, `const PUBLISHABLE_TOTAL = ${1466 + additions.length};`);
fs.writeFileSync(runtimePath, source, 'utf8');
console.log(JSON.stringify({ integrated: additions.length, parts: additions.flatMap((record) => record.parts).length }));

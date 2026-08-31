import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const file = path.join(root, 'index.html');
const before = '    <script src="data/andalucia-pau-runtime.js?v=20260825-andalucia-pau-1"></script>';
const after = '    <script src="data/andalucia-user-source-index.js?v=20260829-andalucia-user-source-1"></script>\n    <script src="data/andalucia-pau-runtime.js?v=20260829-andalucia-user-source-1"></script>';
let source = fs.readFileSync(file, 'utf8');
if (source.includes(after)) {
  console.log(JSON.stringify({ changed: false, reason: 'already-patched' }));
  process.exit(0);
}
if (!source.includes(before)) throw new Error('No se encontró la carga actual del runtime andaluz.');
source = source.replace(before, after);
fs.writeFileSync(file, source);
console.log(JSON.stringify({ changed: true, path: 'index.html' }));

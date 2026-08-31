import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const runtimePath = path.join(root, 'data', 'andalucia-pau-runtime.js');
const deliveryMarker = '  // END VERIFIED INFERENCE DELIVERY\n';
const begin = '  // BEGIN USER-SUPPLIED ANDALUCIA SOURCE RECONCILIATION\n';
const end = '  // END USER-SUPPLIED ANDALUCIA SOURCE RECONCILIATION\n';
const body = `${begin}  // Los archivos aportados por el usuario son la autoridad documental prioritaria
  // para año y convocatoria en Andalucía. El número identifica una reserva.
  const userSourceIndex = window.ANDALUCIA_USER_SOURCE_INDEX || {};
  for (const item of exercises) {
    const supplied = userSourceIndex[item.documentHash];
    if (!supplied) continue;
    item.year = supplied.year;
    item.sitting = supplied.sitting;
    item.reserveNumber = supplied.reserveNumber;
    item.sourceAuthority = 'USER_SUPPLIED_PRIMARY_RECONCILED';
    item.userSource = clone(supplied);
  }
${end}`;

let source = fs.readFileSync(runtimePath, 'utf8');
if (source.includes(begin)) {
  console.log(JSON.stringify({ changed: false, reason: 'already-patched' }));
  process.exit(0);
}

if (source.includes('const userSourceIndex = window.ANDALUCIA_USER_SOURCE_INDEX || {};')) {
  source = source.replace(
    '  // Los archivos aportados por el usuario son la autoridad documental prioritaria\n',
    `${begin}  // Los archivos aportados por el usuario son la autoridad documental prioritaria\n`
  );
  source = source.replace(
    "    item.userSource = clone(supplied);\n  }\n\n  function runtimeCourseId(subject) {",
    `    item.userSource = clone(supplied);\n  }\n${end}\n  function runtimeCourseId(subject) {`
  );
  fs.writeFileSync(runtimePath, source);
  console.log(JSON.stringify({ changed: true, reason: 'markers-added' }));
  process.exit(0);
}

if (!source.includes(deliveryMarker)) throw new Error('No se encontró el marcador de inserción del runtime andaluz.');
source = source.replace(deliveryMarker, `${deliveryMarker}${body}`);
fs.writeFileSync(runtimePath, source);
console.log(JSON.stringify({ changed: true, path: 'data/andalucia-pau-runtime.js' }));

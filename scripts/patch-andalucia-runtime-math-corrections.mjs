import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const runtimePath = path.join(root, 'data', 'andalucia-pau-runtime.js');
const end = '  // END USER-SUPPLIED ANDALUCIA SOURCE RECONCILIATION\n';
const needle = 'A4k+r=(A⁴)kA^r=Ar';
const replacement = 'A^{4k+r}=(A⁴)^k A^r=A^r';
let source = fs.readFileSync(runtimePath, 'utf8');
if (!source.includes(end)) throw new Error('Falta el marcador de reconciliación documental.');
if (!source.includes(needle)) {
  console.log(JSON.stringify({ changed: false, reason: 'already-corrected-or-absent' }));
  process.exit(0);
}
const correction = `  // Corrección tipográfica verificada: ley de potencias para A⁴=I.
  for (const item of exercises) {
    if (item.exerciseId !== 'pau-can-ex-6eb84eba9ca62e6e56d522590c0d7f40') continue;
    for (const part of item.parts || []) {
      part.solutionSteps = (part.solutionSteps || []).map((value) => value.replace('${needle}', '${replacement}'));
      for (const step of part.structuredSolution || []) {
        if (typeof step.math === 'string') step.math = step.math.replace('${needle}', '${replacement}');
      }
    }
  }
`;
source = source.replace(end, `${correction}${end}`);
fs.writeFileSync(runtimePath, source);
console.log(JSON.stringify({ changed: true, exerciseId: 'pau-can-ex-6eb84eba9ca62e6e56d522590c0d7f40' }));

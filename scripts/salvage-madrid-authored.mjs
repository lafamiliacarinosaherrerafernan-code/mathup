import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const target = path.join(root, 'data', 'madrid-pau-authored.js');
const artifactDir = path.join(root, 'artifacts', 'madrid-systematic-propagation');
const currentBuffer = fs.readFileSync(target);
const current = currentBuffer.toString('utf8');
const baselineSource = execFileSync('git', ['show', 'HEAD:data/madrid-pau-authored.js'], {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024
});

function load(source) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context);
  return context.window.MADRID_PAU_AUTHORED;
}

function objectAt(text, openIndex) {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = openIndex; index < text.length; index += 1) {
    const char = text[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === '{') depth += 1;
    else if (char === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(openIndex, index + 1);
    }
  }
  return null;
}

const merged = load(baselineSource);
const salvaged = [];
const fallback = [];
for (const courseId of ['2bach-mates', '2bach-ccss']) {
  for (const exerciseId of Object.keys(merged[courseId] || {})) {
    const marker = `"${exerciseId}"`;
    const markerIndex = current.indexOf(marker);
    const openIndex = markerIndex < 0 ? -1 : current.indexOf('{', markerIndex + marker.length);
    const candidate = openIndex < 0 ? null : objectAt(current, openIndex);
    try {
      if (!candidate) throw new Error('missing');
      merged[courseId][exerciseId] = JSON.parse(candidate);
      salvaged.push(exerciseId);
    } catch {
      fallback.push(exerciseId);
    }
  }
}

fs.mkdirSync(artifactDir, { recursive: true });
fs.copyFileSync(target, path.join(artifactDir, 'madrid-pau-authored.corrupt-before-salvage.js'));
const header = '// Autoría matemática revisada del banco PAU de Madrid.\n// Solo se publican registros con enunciado estructurado, cuatro opciones\n// distintas por apartado y solución didáctica completa.\n';
fs.writeFileSync(target, `${header}window.MADRID_PAU_AUTHORED = ${JSON.stringify(merged, null, 2)};\n`, 'utf8');
const report = {
  beforeSha256: crypto.createHash('sha256').update(currentBuffer).digest('hex'),
  salvaged: salvaged.length,
  fallbackToCheckpoint: fallback.length,
  fallbackExerciseIds: fallback
};
fs.writeFileSync(path.join(artifactDir, 'salvage-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const auditDir = path.join(root, 'artifacts', 'andalucia-source-app-visual-parity');
const out = path.join(root, 'artifacts', 'andalucia-phase29');
fs.mkdirSync(out, { recursive: true });
const queue = JSON.parse(fs.readFileSync(path.join(auditDir, 'review-queue.json'), 'utf8'));
const context = { window: {} };
context.globalThis = context;
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-source-app-visual-parity.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });
const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const byId = new Map(runtime.exercises.map((exercise) => [exercise.exerciseId, exercise]));
const dossiers = queue.map((row) => {
  const exercise = byId.get(row.exerciseId);
  return {
    ...row,
    sourceCapture: row.sourceFile?.toLowerCase().endsWith('.pdf')
      ? `artifacts/andalucia-source-app-visual-parity/source-captures/${row.exerciseId}.png`
      : null,
    documentHash: exercise?.documentHash || null,
    officialPromptLiteral: exercise?.officialPromptLiteral || null,
    sourceProjection: exercise?.sourceProjection || null,
    learnerStatement: exercise?.learnerStatement || null,
    learnerStatementHtml: exercise?.learnerStatementHtml || null,
    parts: (exercise?.parts || []).map((part) => ({
      id: part.id,
      label: part.label,
      text: part.text,
      semanticAnswer: part.semanticAnswer,
      distractors: part.distractors,
      solutionSteps: part.solutionSteps,
      finalAnswer: part.finalAnswer
    }))
  };
});
fs.writeFileSync(path.join(out, 'dossiers.json'), `${JSON.stringify(dossiers, null, 2)}\n`);
fs.writeFileSync(path.join(out, 'dossiers.jsonl'), `${dossiers.map((row) => JSON.stringify(row)).join('\n')}\n`);
console.log(JSON.stringify({ pending: dossiers.length, withPdfCapture: dossiers.filter((row) => row.sourceCapture).length, legacyDoc: dossiers.filter((row) => row.sourceFile?.endsWith('.doc')).length, missingIdentity: dossiers.filter((row) => !row.sourceFile).length }, null, 2));

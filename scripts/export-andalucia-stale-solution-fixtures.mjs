import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const beforeRows = fs.readFileSync(path.join(root, 'artifacts/andalucia-runtime-skill-chain/before-rows.jsonl'), 'utf8')
  .split(/\r?\n/).filter(Boolean).map(JSON.parse).filter((row) => row.staleMaterializedSolution);
const stalePartIds = new Set(beforeRows.map((row) => row.subpartId));
const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const fixtures = context.window.ANDALUCIA_PAU_RUNTIME.exercises.flatMap((exercise) => (exercise.parts || [])
  .filter((part) => stalePartIds.has(part.id))
  .map((part) => ({
    exerciseId: exercise.exerciseId,
    subject: exercise.subject,
    year: exercise.year,
    sitting: exercise.sitting,
    officialPromptLiteral: exercise.officialPromptLiteral,
    subpartId: part.id,
    label: part.label,
    text: part.text,
    answer: part.semanticAnswer,
    currentSteps: part.solutionSteps,
    verification: part.verification
  })));
const out = path.join(root, 'artifacts/andalucia-runtime-skill-chain/stale-solution-fixtures.json');
fs.writeFileSync(out, `${JSON.stringify(fixtures, null, 2)}\n`);
console.log(JSON.stringify({ fixtures: fixtures.length, exercises: new Set(fixtures.map((row) => row.exerciseId)).size, out }, null, 2));

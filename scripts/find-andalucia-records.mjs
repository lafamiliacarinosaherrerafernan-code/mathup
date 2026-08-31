import fs from 'node:fs';
import vm from 'node:vm';

const context = { window: {} };
vm.createContext(context);
for (const file of ['data/andalucia-user-source-index.js', 'data/andalucia-pau-runtime.js', 'data/andalucia-global-corrections.js', 'data/andalucia-interactive-delivery-gate.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}
const brief = process.argv.includes('--brief');
const terms = process.argv.slice(2).filter((term) => term !== '--brief').map((term) => term.toLowerCase());
const selected = context.window.ANDALUCIA_PAU_RUNTIME.exercises.filter((exercise) => {
  const value = JSON.stringify(exercise).toLowerCase();
  return terms.every((term) => value.includes(term));
});
for (const exercise of selected) console.log(JSON.stringify({
  exerciseId: exercise.exerciseId,
  subject: exercise.subject,
  year: exercise.year,
  sitting: exercise.sitting,
  reserveNumber: exercise.reserveNumber,
  primaryTopic: exercise.primaryTopic,
  officialPromptLiteral: exercise.officialPromptLiteral,
  learnerStatement: exercise.learnerStatement,
  parts: brief ? (exercise.parts || []).map((part) => ({ id: part.id, text: part.text }))
    : (exercise.parts || []).map((part) => ({ id: part.id, text: part.text, solutionSteps: part.solutionSteps, solutionMathOptions: part.solutionMathOptions }))
}, null, 2));
console.error(`matches=${selected.length}`);

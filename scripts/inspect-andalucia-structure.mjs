import fs from 'node:fs';
import vm from 'node:vm';

const context = { window: {} };
vm.createContext(context);
for (const file of ['data/andalucia-pau-runtime.js', 'data/andalucia-global-corrections.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}
for (const id of process.argv.slice(2)) {
  const row = context.window.ANDALUCIA_PAU_RUNTIME.exercises.find((item) => item.exerciseId === id);
  console.log(JSON.stringify({
    exerciseId: id,
    source: row?.sourceProjection?.full || row?.officialPromptLiteral,
    parts: row?.parts?.map((part) => ({ id: part.id, label: part.label, text: part.text, solutionSteps: part.solutionSteps }))
  }, null, 2));
}

import fs from 'node:fs';
import vm from 'node:vm';

const context = { window: {} };
vm.createContext(context);
for (const file of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });

const record = context.window.ANDALUCIA_PAU_RUNTIME.exercises.find((row) => row.exerciseId === process.argv[2]);
if (!record) process.exitCode = 1;
else console.log(JSON.stringify(record, null, 2));

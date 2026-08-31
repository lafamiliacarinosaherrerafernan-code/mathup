import fs from 'node:fs';
import vm from 'node:vm';
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync('data/andalucia-pau-runtime.js', 'utf8'), context);
const record = context.window.ANDALUCIA_PAU_RUNTIME.exercises.find((row) => row.exerciseId === process.argv[2]);
console.log(JSON.stringify(record, null, 2));

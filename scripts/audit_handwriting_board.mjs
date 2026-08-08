import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const js = fs.readFileSync(path.join(root, "handwriting-board.js"), "utf8");
const css = fs.readFileSync(path.join(root, "handwriting-board.css"), "utf8");
const context = {
  window: {},
  document: {},
  console,
  Map,
  WeakMap,
  Object,
  String,
  Number,
  Math
};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(js, context, { filename: "handwriting-board.js" });

const html = context.window.MargaritaHandwriting.render({ exerciseKey: "audit", label: "Resolver a mano" });
const failures = [];
const cases = [];
function check(condition, name) {
  cases.push({ name, passed: Boolean(condition) });
  if (!condition) failures.push(name);
}

check(/role="dialog"[\s\S]*handwriting-statement-content[\s\S]*handwriting-canvas/.test(html), "CASO 1: vista independiente con enunciado y pizarra");

const toolbarOrder = ["Bolígrafo", "Borrador", "Borrar todo", "Marcar respuesta", "Grosor", "Deshacer", "Rehacer"];
let previous = -1;
check(toolbarOrder.every((label) => {
  const index = html.indexOf(label);
  const ordered = index > previous;
  previous = index;
  return ordered;
}) && /flex-wrap:\s*nowrap/.test(css), "CASO 2: herramientas completas y en una sola línea");

check(/toggleExpanded/.test(js)
  && /is-expanded[\s\S]*handwriting-context[\s\S]*display:\s*none/.test(css)
  && !/is-expanded[^{]*handwriting-statement[^}]*display:\s*none/.test(css), "CASO 3: ampliar conserva enunciado, herramientas y estado");

check(/Restaurar vista/.test(js)
  && /requestAnimationFrame\(\(\) => resizeCanvas\(instance\)\)/.test(js), "CASO 4: restaurar cambia solo el layout y redibuja el mismo estado");

check(/logicalHeight:\s*INITIAL_PAPER_HEIGHT/.test(js)
  && /logicalHeight \+= PAPER_GROWTH/.test(js)
  && /overflow-y:\s*auto/.test(css), "CASO 5: hoja vertical extensible con scroll");

check(/event\.clientY - rect\.top/.test(js)
  && /lineTo\(point\.x \* width, point\.y\)/.test(js)
  && !/point\.y \* height/.test(js), "CASO 6: coordenadas verticales absolutas estables tras el scroll");

check(/function undo/.test(js)
  && /function redo/.test(js)
  && /logicalHeight: draft\.logicalHeight/.test(js)
  && /restoreDrawing\(instance\.draft/.test(js), "CASO 7: deshacer y rehacer conservan trazos y altura lógica");

check(/querySelector\(\":scope > \.question-text\"\)/.test(js)
  && /cloneNode\(true\)/.test(js), "El enunciado se clona desde la representación original del ejercicio");

check(!/[ÃÂ][^\s]/.test(html), "La interfaz no contiene texto con codificación dañada");

const result = { cases, failures, passed: failures.length === 0 };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;

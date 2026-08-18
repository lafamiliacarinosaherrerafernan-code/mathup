import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ink = fs.readFileSync(path.join(root, "handwriting-ink.js"), "utf8");
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
  Math,
  Date,
  performance
};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(ink, context, { filename: "handwriting-ink.js" });
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
  && /requestAnimationFrame\(\(\) => resizeCanvas\(instance\)\)/.test(js)
  && /is-expanded \.handwriting-close[\s\S]*display:\s*none/.test(css), "CASO 4: restaurar cambia solo el layout y Volver al ejercicio no aparece al ampliar");

check(/logicalHeight:\s*INITIAL_PAPER_HEIGHT/.test(js)
  && /logicalHeight \+= PAPER_GROWTH/.test(js)
  && /overflow-y:\s*auto/.test(css), "CASO 5: hoja vertical extensible con scroll");

check(/Ink\.screenToLogical\(event, rect\)/.test(js)
  && /lineTo\(point\.x, point\.y\)/.test(js)
  && /ratio \* scale/.test(js), "CASO 6: ambos ejes usan el mismo espacio logico y la misma escala");

check(/function undo/.test(js)
  && /function redo/.test(js)
  && /logicalHeight: draft\.logicalHeight/.test(js)
  && /restoreDrawing\(instance\.draft/.test(js), "CASO 7: deshacer y rehacer conservan trazos y altura lógica");

check(!/window\.confirm\(/.test(js)
  && /handwriting-clear-confirmation/.test(html)
  && /confirmClear/.test(js)
  && /cancelClear/.test(js), "CASO 8: borrar todo usa confirmación propia de la app con borrar y cancelar");

check(/MargaritaMathRenderer/.test(js)
  && /renderer\.text\(expression\)/.test(js), "CASO 9: la expresión reconocida se presenta con el renderizador matemático");

check(/exerciseContext\?\.statementHtml/.test(js)
  && /cloneNode\(true\)/.test(js), "El enunciado usa el contexto original y conserva el fallback de clonación");

check(/moveOriginalContextToPanel/.test(js)
  && /contextTarget\.replaceChildren\(originalAside\)/.test(js)
  && /restoreOriginalContext\(host\)/.test(js), "La columna izquierda reutiliza el componente original completo y lo restaura al cerrar");

check(!/handwriting-context-card \.sidebar-actions[\s\S]*display:\s*none/.test(css)
  && !/handwriting-context-card > \.ghost:first-child[\s\S]*display:\s*none/.test(css), "La columna conserva Volver a temas, explicación y audios");

check(/\.handwriting-toolbar[\s\S]*overflow:\s*hidden/.test(css)
  && /\.handwriting-work-area[\s\S]*min-width:\s*0/.test(css)
  && /\.handwriting-canvas-wrap[\s\S]*width:\s*100%/.test(css), "Toolbar, zona de trabajo y pizarra no provocan overflow horizontal");

check(/exerciseContexts\.set/.test(js)
  && /handwritingValidated/.test(js)
  && /margarita:handwriting-validated/.test(js)
  && /answerMethod:\s*"handwriting"/.test(js), "El callback futuro conserva contexto y declara el método manuscrito sin reconocer ni corregir trazos");

check(!/OCR|Tesseract|recognizedText\s*==|imageData.*correct/i.test(js), "No se simula OCR ni validación matemática");

check(!/[ÃÂ][^\s]/.test(html), "La interfaz no contiene texto con codificación dañada");

check(/strokeId:/.test(js)
  && /timestamp: Ink\.monotonicNow/.test(js)
  && /pointerType: capturedPoint\.pointerType/.test(js), "Los trazos guardan identificador, tiempo monotonico y tipo de puntero");

check(/Ink\.createSelection/.test(js)
  && /regions:/.test(ink)
  && /selectedStrokeIds/.test(ink), "La seleccion queda preparada para varias regiones");

check(/exportSelectedInk/.test(js)
  && /normalizeSelectedInk/.test(js)
  && !/correctAnswer|solution|score|student|email/i.test(ink), "La exportacion canonica no incluye respuestas ni datos personales");

const result = { cases, failures, passed: failures.length === 0 };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;

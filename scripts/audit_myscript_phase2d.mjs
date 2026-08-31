import fs from "node:fs";
import vm from "node:vm";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const context = vm.createContext({ console });
vm.runInContext(read("data/myscript-phase2c-corpus.js"), context);
vm.runInContext(read("data/myscript-phase2d-pilot-selection.js"), context);

const basic = context.MARGARITA_MYSCRIPT_PHASE2C_CORPUS;
const selection = context.MARGARITA_MYSCRIPT_PHASE2D_SELECTION;
const advancedDocument = JSON.parse(read("docs/myscript-phase2c-bach-corpus-proposal.json"));
const advanced = new Map(advancedDocument.families.map((family) => [family.id, family.samples]));

const expectedCategories = new Map([
  ["numeros-decimales", 4], ["fracciones", 5], ["potencias-raices", 5],
  ["algebra-ecuaciones", 6], ["inecuaciones-intervalos-coordenadas", 4],
  ["matrices", 4], ["determinantes", 3], ["sistemas", 3], ["limites", 5],
  ["derivadas", 5], ["funciones-trigonometria-logaritmos", 5],
  ["vectores-complejos-geometria", 4], ["probabilidad-estadistica-integrales", 4],
  ["notacion-confusa", 3]
]);

assert(selection.length === 60, `Se esperaban 60 muestras y hay ${selection.length}.`);
assert(new Set(selection.map((item) => item.pilotId)).size === 60, "Hay pilotId duplicados.");
assert(selection.filter((item) => item.source === "basic").length === 24, "La selección básica no suma 24.");
assert(selection.filter((item) => item.source === "advanced").length === 36, "La selección avanzada no suma 36.");

for (const [category, expected] of expectedCategories) {
  const found = selection.filter((item) => item.category === category).length;
  assert(found === expected, `${category}: se esperaban ${expected} y hay ${found}.`);
}
for (const writer of ["writer-1", "writer-2", "writer-3"]) {
  assert(selection.filter((item) => item.assignedWriter === writer).length === 20, `${writer} no tiene 20 muestras.`);
}

const basicIds = new Set(basic.map((sample) => sample.sampleId));
const targets = [];
for (const item of selection) {
  if (item.source === "basic") {
    assert(basicIds.has(item.sourceRef), `Referencia básica inválida: ${item.sourceRef}`);
    targets.push(basic.find((sample) => sample.sampleId === item.sourceRef).expectedExpression);
  } else {
    const samples = advanced.get(item.sourceRef.family);
    assert(Array.isArray(samples), `Familia avanzada inválida: ${item.sourceRef.family}`);
    assert(typeof samples[item.sourceRef.sampleIndex] === "string", `Índice avanzado inválido: ${item.sourceRef.family}[${item.sourceRef.sampleIndex}]`);
    targets.push(samples[item.sourceRef.sampleIndex]);
  }
}

const joined = targets.join("\n");
for (const [label, pattern] of [
  ["función a trozos", /\\begin\{cases\}/],
  ["límite lateral", /x\\to2[\^][+-]/],
  ["infinito", /\\infty/],
  ["derivada prima", /f'\(x\)/],
  ["derivada segunda", /f''\(x\)/],
  ["dy/dx", /\\frac\{dy\}\{dx\}/],
  ["d²y/dx²", /\\frac\{d\^2y\}\{dx\^2\}/],
  ["sen", /operatorname\{sen\}/],
  ["cos", /\\cos/],
  ["tg", /operatorname\{tg\}/],
  ["sen²", /operatorname\{sen\}\^2/],
  ["integral indefinida", /\\int f\(x\)\\,dx/],
  ["integral definida", /\\int_a\^b/],
  ["alfa", /\\alpha/], ["lambda", /\\lambda/], ["mu", /\\mu/],
  ["sigma", /\\sigma/], ["pi", /\\pi/]
]) assert(pattern.test(joined), `Falta cobertura obligatoria: ${label}.`);

const evaluator = read("myscript-evaluation.js");
const board = read("handwriting-board.js");
const renderer = read("math-renderer.js");
assert(evaluator.includes("MAX_ADDITIONAL_REQUESTS = 70"), "No está fijado el límite de 70 peticiones.");
assert(evaluator.includes("VALIDATOR_NOT_IMPLEMENTED"), "No se separa el reconocimiento del validador avanzado.");
assert(evaluator.includes("storesStrokes: false"), "El informe no declara que no guarda trazos.");
assert(evaluator.includes("scoringConnected: false"), "El informe no declara la desconexión de puntuación.");
assert(evaluator.includes("state.pending = pending"), "El reconocimiento pendiente no se persiste antes de clasificarlo.");
assert(evaluator.includes("recoverConfirmedWriter1Samples"), "Falta la recuperación auditada de las muestras confirmadas.");
assert(evaluator.includes("MargaritaMathRenderer?.text?.(sample.display)"), "La muestra objetivo no usa el renderizador matemático.");
assert(evaluator.includes("handwriting-external-feedback-slot"), "La clasificación no se inserta dentro de la pizarra abierta.");
assert(renderer.includes("pmatrix|bmatrix|vmatrix"), "El renderizador no admite matrices LaTeX del piloto.");
assert(renderer.includes("No se deben separar antes de componerlas"), "Las matrices multilínea de MyScript no están protegidas antes de separar líneas.");
assert(board.includes("rawSemanticResult: result.rawSemanticResult || null"), "El evento no transporta JIIX relevante.");

console.log(JSON.stringify({
  ok: true,
  samples: selection.length,
  basic: 24,
  advanced: 36,
  writers: { "writer-1": 20, "writer-2": 20, "writer-3": 20 },
  categories: Object.fromEntries(expectedCategories),
  realRequestsExecutedByAudit: 0
}, null, 2));

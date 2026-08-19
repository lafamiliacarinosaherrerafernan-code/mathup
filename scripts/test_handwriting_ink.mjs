import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "handwriting-ink.js"), "utf8");
const context = { window: {}, globalThis: {}, console, Date, Math, Number, Object, Set, String, performance };
vm.createContext(context);
vm.runInContext(source, context, { filename: "handwriting-ink.js" });
const Ink = context.window.MargaritaHandwritingInk;

const cases = [];
const failures = [];
function check(condition, name, details = null) {
  const passed = Boolean(condition);
  cases.push({ name, passed, ...(details ? { details } : {}) });
  if (!passed) failures.push(name);
}

function close(a, b, tolerance = 1e-8) {
  return Math.abs(a - b) <= tolerance;
}

let strokeCounter = 0;
function stroke(points, options = {}) {
  strokeCounter += 1;
  return {
    strokeId: options.strokeId || `test-stroke-${strokeCounter}`,
    order: options.order ?? strokeCounter,
    pointerType: options.pointerType || "pen",
    color: "#13213a",
    width: options.width ?? 4,
    points: points.map(([x, y], index) => ({
      x,
      y,
      timestamp: (options.timestamp ?? 1000) + index * 12,
      pressure: 0.5
    }))
  };
}

const viewports = [
  [1920, 1080],
  [1366, 768],
  [1280, 800],
  [768, 1024]
];
const logicalReference = { x: 347.25, y: 812.75 };
for (const [viewportWidth, viewportHeight] of viewports) {
  for (const mode of ["normal", "expanded"]) {
    const width = mode === "normal" ? Math.max(320, viewportWidth * 0.68) : Math.max(320, viewportWidth - 24);
    const bounds = { left: 12, top: 40, width, height: viewportHeight - 60 };
    const screen = Ink.logicalToScreen(logicalReference, bounds);
    const restored = Ink.screenToLogical({ clientX: screen.x, clientY: screen.y }, bounds);
    check(close(restored.x, logicalReference.x) && close(restored.y, logicalReference.y),
      `Geometria estable ${viewportWidth}x${viewportHeight} ${mode}`);
  }
}

for (const scrollTop of [0, 600, 1400]) {
  const bounds = { left: 20, top: 100 - scrollTop, width: 900, height: 1800 };
  const screen = Ink.logicalToScreen({ x: 500, y: 1600 }, bounds);
  const restored = Ink.screenToLogical({ clientX: screen.x, clientY: screen.y }, bounds);
  check(close(restored.x, 500) && close(restored.y, 1600), `Scroll independiente ${scrollTop}`);
}

const crossing = stroke([[50, 150], [250, 150]], { width: 3 });
const crossingSelection = Ink.createSelection({ left: 100, top: 100, right: 200, bottom: 200 }, [crossing]);
check(Ink.extractSelectedStrokes([crossing], crossingSelection).length === 1,
  "Selecciona segmento que cruza aunque sus extremos esten fuera");

const nearExponent = stroke([[205, 94], [210, 88]], { width: 5 });
const farPreviousLine = stroke([[110, 72], [190, 72]], { width: 4 });
const marginSelection = Ink.createSelection({ left: 100, top: 100, right: 200, bottom: 180 }, [nearExponent, farPreviousLine]);
const marginIds = Ink.extractSelectedStrokes([nearExponent, farPreviousLine], marginSelection).map((item) => item.strokeId);
check(marginIds.includes(nearExponent.strokeId), "Margen incluye exponente cercano");
check(!marginIds.includes(farPreviousLine.strokeId), "Margen no captura la linea anterior");

const structureCases = {
  "x=3": [stroke([[120, 130], [150, 160]]), stroke([[170, 140], [210, 140]]), stroke([[170, 150], [210, 150]]), stroke([[230, 125], [250, 160]])],
  fraction: [stroke([[120, 150], [260, 150]]), stroke([[170, 115], [190, 130]]), stroke([[170, 175], [190, 195]])],
  exponent: [stroke([[120, 160], [160, 200]]), stroke([[168, 122], [185, 136]])],
  root: [stroke([[110, 160], [125, 180], [145, 110], [260, 110]])],
  limit: [stroke([[110, 120], [180, 120]]), stroke([[120, 160], [190, 160]]), stroke([[200, 155], [230, 155]])],
  integral: [stroke([[120, 105], [105, 150], [125, 205]]), stroke([[100, 215], [115, 215]]), stroke([[125, 90], [140, 90]])],
  matrix2x2: [stroke([[100, 100], [90, 100], [90, 210], [100, 210]]), stroke([[260, 100], [270, 100], [270, 210], [260, 210]]), stroke([[130, 130], [145, 145]]), stroke([[210, 175], [225, 190]])],
  system2: [stroke([[110, 100], [95, 120], [105, 155], [95, 190], [110, 210]]), stroke([[130, 130], [250, 130]]), stroke([[130, 180], [250, 180]])],
  intervalUnion: [stroke([[100, 130], [170, 130]]), stroke([[190, 115], [205, 145]]), stroke([[220, 130], [290, 130]])],
  vectorArrow: [stroke([[110, 170], [260, 170]]), stroke([[220, 115], [270, 115], [255, 105]]), stroke([[270, 115], [255, 125]])]
};
for (const [name, strokes] of Object.entries(structureCases)) {
  const selection = Ink.createSelection({ left: 80, top: 80, right: 300, bottom: 230 }, strokes);
  const extracted = Ink.extractSelectedStrokes(strokes, selection);
  check(extracted.length === strokes.length, `Estructura completa: ${name}`, { expected: strokes.length, actual: extracted.length });
}

const normalizedSource = [
  stroke([[100, 200], [300, 300]], { timestamp: 2000 }),
  stroke([[320, 220], [500, 260]], { timestamp: 2300 })
];
const normalizedSelection = Ink.createSelection({ left: 90, top: 190, right: 510, bottom: 310 }, normalizedSource);
const normalized = Ink.normalizeSelectedInk(normalizedSource, normalizedSelection, { expectedAnswerType: "expression" });
const sourceRatio = (500 - 100) / (300 - 200);
const normalizedPoints = normalized.strokes.flatMap((item) => item.points);
const normalizedRatio = (Math.max(...normalizedPoints.map((point) => point.x)) - Math.min(...normalizedPoints.map((point) => point.x)))
  / (Math.max(...normalizedPoints.map((point) => point.y)) - Math.min(...normalizedPoints.map((point) => point.y)));
check(close(sourceRatio, normalizedRatio), "Normalizacion conserva la relacion de aspecto");
check(normalized.strokes[0].points[0].timestamp === 0
  && normalized.strokes[1].points[0].timestamp === 300, "Normalizacion conserva tiempos relativos entre strokes");
check(normalized.version === "1.0" && normalized.expectedAnswerType === "expression", "Formato canonico versionado e independiente");
check(!/correct|solution|score|student|email|name/i.test(JSON.stringify(normalized)), "Formato canonico no expone datos ajenos al reconocimiento");

const first = stroke([[110, 110], [140, 140]], { strokeId: "first" });
const second = stroke([[160, 110], [190, 140]], { strokeId: "second" });
const stateSelection = Ink.createSelection({ left: 90, top: 90, right: 210, bottom: 160 }, [first, second]);
const originalState = [first, second];
const undoneState = [first];
const redoneState = [...originalState];
const erasedState = [first];
const clearedState = [];
check(Ink.extractSelectedStrokes(undoneState, stateSelection).every((item) => item.strokeId !== "second"), "Undo no exporta el stroke deshecho");
check(Ink.extractSelectedStrokes(redoneState, stateSelection).some((item) => item.strokeId === "second"), "Redo vuelve a exportar el stroke visible");
check(Ink.extractSelectedStrokes(erasedState, stateSelection).every((item) => item.strokeId !== "second"), "Borrador no exporta el stroke eliminado");
check(Ink.extractSelectedStrokes(clearedState, stateSelection).length === 0, "Borrar todo produce una exportacion vacia");

const partA = [stroke([[100, 100], [120, 120]], { strokeId: "part-a" })];
const partB = [stroke([[300, 300], [320, 320]], { strokeId: "part-b" })];
const selectionA = Ink.createSelection({ left: 90, top: 90, right: 140, bottom: 140 }, partA);
check(Ink.normalizeSelectedInk(partA, selectionA).strokes[0].strokeId === "part-a"
  && Ink.normalizeSelectedInk(partB, selectionA).strokes.length === 0, "Los estados de apartados no se mezclan");

const result = { cases, failures, passed: failures.length === 0 };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;

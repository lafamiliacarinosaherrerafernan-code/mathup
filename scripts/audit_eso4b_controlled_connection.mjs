import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const ownFile = path.join(root, "data", "eso4b-controlled-practice-banks.js");

const expectedTopics = [
  "Números reales",
  "Radicales y logaritmos",
  "Expresiones algebraicas",
  "Ecuaciones y sistemas de ecuaciones",
  "Inecuaciones y sistemas de inecuaciones",
  "Proporcionalidad",
  "Semejanza",
  "Trigonometría",
  "Geometría analítica",
  "Funciones",
  "Límite de funciones",
  "Derivadas",
  "Límite de sucesiones",
  "Combinatoria"
];

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const normalize = (value) => String(value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

const context = vm.createContext({ window: {}, console, structuredClone });
for (const filename of [
  "data/combinatorics-supplied-banks.js",
  "data/eso-exam-verified-banks.js",
  ...Array.from({ length: 52 }, (_, index) => `data/eso-exam-verified-banks-${index + 1}.js`),
  "data/eso4b-controlled-practice-banks.js"
]) {
  const absolute = path.join(root, filename);
  if (fs.existsSync(absolute)) vm.runInContext(fs.readFileSync(absolute, "utf8"), context, { filename });
}

assert(index.includes("data/eso4b-controlled-practice-banks.js"), "El banco propio de 4.º ESO B no se carga en index.html.");
const route = app.match(/function fourEsoBModelBank\(lower\) \{([\s\S]*?)\n\}/)?.[1] || "";
assert(route.includes("MargaritaFourEsoBOwnBanks"), "La ruta principal no usa el banco propio B.");
assert(!/fourEsoA/.test(route), "La ruta principal de B todavía hereda un banco A.");

const forbiddenApp = normalize(app);
assert(!forbiddenApp.includes("lim x→0 sen(x)/x"), "Sigue activo sen(x)/x en el banco legado de 4.º ESO B.");
assert(!forbiddenApp.includes("lim x->0 de sen(x)/x"), "Sigue activo sen(x)/x en Matemáticas I.");

const report = [];
for (const topic of expectedTopics) {
  const all = context.window.MargaritaFourEsoBOwnBanks.all(topic);
  const model = context.window.MargaritaFourEsoBOwnBanks.model(topic);
  const apprentice = all.filter((item) => item.challengeLevel === "apprentice" && item.practiceEligible !== false && !item.extensionOnly);
  const master = all.filter((item) => item.challengeLevel === "master" && item.practiceEligible !== false && !item.extensionOnly);
  const exam = all.filter((item) => item.examEligible === true);
  const structures = new Set(all.map((item) => item.structureId || item.rawBaseId || normalize(item.text))).size;
  const bad = all.filter((item) => {
    const content = normalize(`${item.text || ""} ${item.solution || ""}`);
    return /sen\s*\(?x\)?\s*\/\s*x/.test(content) || content.includes("l'hopital") || content.includes("lhopital");
  });
  assert(bad.length === 0, `${topic}: contiene un límite o método prohibido.`);
  for (const question of all) {
    assert(Array.isArray(question.options) && question.options.length === 4, `${topic}: ${question.rawBaseId} no tiene cuatro opciones.`);
    assert(new Set(question.options || []).size === 4, `${topic}: ${question.rawBaseId} repite opciones.`);
    assert(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 4, `${topic}: ${question.rawBaseId} tiene índice correcto inválido.`);
    assert(Boolean(question.solution), `${topic}: ${question.rawBaseId} no tiene solución.`);
  }
  report.push({
    topic,
    total: all.length,
    apprentice: apprentice.length,
    master: master.length,
    exam: exam.length,
    structures,
    controlledLiteralBank: model.length > 0,
    generatedFallbackAvailable: true
  });
}

const ownOriginals = expectedTopics.flatMap((topic) => context.window.MargaritaEsoOriginalPractice?.all?.("4eso-b", topic) || []);
assert(ownOriginals.filter((item) => item.sourceKind === "original-topic-material").every((item) => item.examEligible === false), "Un original se activó automáticamente para examen.");
assert(
  ownOriginals
    .filter((item) => item.sourceKind === "original-topic-material")
    .every((item) => Number.isInteger(item.sourceCandidate) || (item.sourceVerified === true && Number.isInteger(item.sourcePage) && Boolean(item.sourceExercise))),
  "Se conectó un original temático sin referencia literal verificable."
);
const sequenceModel = context.window.MargaritaFourEsoBOwnBanks.model("Límite de sucesiones");
assert(sequenceModel.every((item) => !item.extensionOnly), "La definición formal de sucesiones entró en la práctica ordinaria.");
assert(app.includes("isForbiddenIntroLimitQuestion"), "No existe el filtro transversal de límites introductorios prohibidos.");
assert(app.includes("return bank;\n    }"), "4.º ESO B todavía podría caer en un banco genérico cuando su banco literal esté vacío.");

const allB = expectedTopics.flatMap((topic) => context.window.MargaritaFourEsoBOwnBanks.all(topic));
const cSources = allB.filter((item) => /4.*eso\s*c/i.test(normalize(item.source)));
assert(cSources.length > 0, "No se localizaron los exámenes del grupo original C.");
assert(cSources.every((item) => item.originalGroup === "C" && item.subject === "Matemáticas B"), "Los exámenes C no conservan metadatos de Matemáticas B/grupo C.");

const output = {
  generatedAt: new Date().toISOString(),
  expectedTopics: expectedTopics.length,
  report,
  controlledOriginals: context.window.MargaritaFourEsoBOwnBanks.stats.controlledOriginals,
  pendingVisualOrLiteralRecovery: context.window.MargaritaFourEsoBOwnBanks.stats.pendingVisualOrLiteralRecovery,
  sourceGroupC: cSources.length,
  failures
};
console.log(JSON.stringify(output, null, 2));
if (failures.length) throw new Error(`Auditoría 4.º ESO B: ${failures.length} fallo(s).`);

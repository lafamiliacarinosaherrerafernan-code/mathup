import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const context = vm.createContext({ window: {} });
const load = (relativePath) => vm.runInContext(
  fs.readFileSync(path.join(root, relativePath), "utf8"),
  context,
  { filename: relativePath }
);

load("data/eso1-original-topic9-10-banks.js");
load("data/eso1-original-topic9-10-review2.js");
load("data/eso2-original-practice-banks.js");
load("data/eso-exam-verified-banks.js");
for (let index = 2; index <= 52; index += 1) load(`data/eso-exam-verified-banks-${index}.js`);
const verifiedBeforeFix = context.window.MargaritaEsoExamVerified;
load("data/eso2-topic-classification-fixes.js");

const topics = [
  ["Números enteros", "2eso:numeros-enteros", 8, 4, 4],
  ["Potencias y raíces cuadradas", "2eso:potencias-raices-cuadradas", 8, 5, 3],
  ["Fracciones", "2eso:fracciones", 8, 5, 3],
  ["Proporcionalidad", "2eso:proporcionalidad", 12, 8, 4],
  ["Expresiones algebraicas", "2eso:expresiones-algebraicas", 0, 0, 0],
  ["Sistemas de ecuaciones", "2eso:sistemas-ecuaciones", 8, 5, 3],
  ["Figuras planas", "2eso:figuras-planas", 3, 1, 2],
  ["Cuerpos geométricos", "2eso:cuerpos-geometricos", 10, 8, 2],
  ["Funciones", "2eso:funciones", 4, 1, 3]
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const originalBank = context.window.MargaritaEsoOriginalPractice;
const verifiedBank = context.window.MargaritaEsoExamVerified;
const allOriginals = [];
const report = [];

for (const [theme, topicId, expectedAll, expectedApprentice, expectedMaster] of topics) {
  const all = originalBank.all("2eso", theme);
  const apprentice = originalBank.build("2eso", theme, "apprentice");
  const master = originalBank.build("2eso", theme, "master");
  assert(all.length === expectedAll, `${theme}: se esperaban ${expectedAll} originales y hay ${all.length}`);
  assert(apprentice.length === expectedApprentice, `${theme}: recuento Aprendiz incorrecto`);
  assert(master.length === expectedMaster, `${theme}: recuento Maestro incorrecto`);
  all.forEach((question) => {
    assert(question.courseId === "2eso", `${question.rawBaseId}: courseId incorrecto`);
    assert(question.topicId === topicId, `${question.rawBaseId}: topicId incorrecto`);
    assert(question.practiceEligible === true, `${question.rawBaseId}: debe ser apto para práctica`);
    assert(question.examEligible === false, `${question.rawBaseId}: no debe entrar automáticamente en examen`);
    assert(question.requiresVisual === false, `${question.rawBaseId}: no se conectan visuales inseguros`);
    assert(question.solutionNeedsReview === false, `${question.rawBaseId}: solución sin validar`);
    assert(question.sourceKind === "teacher-material", `${question.rawBaseId}: procedencia incorrecta`);
    assert(fs.existsSync(path.join(root, question.sourceDocument)), `${question.rawBaseId}: no existe la fuente`);
    assert(Array.isArray(question.options) && question.options.length === 4, `${question.rawBaseId}: opciones incompletas`);
    assert(new Set(question.options).size === 4, `${question.rawBaseId}: opciones duplicadas`);
    assert(question.correct === 0, `${question.rawBaseId}: índice correcto inesperado`);
    assert(question.solution.includes("Resultado final:"), `${question.rawBaseId}: falta resultado final`);
  });
  allOriginals.push(...all);
  report.push({ theme, originals: all.length, apprentice: apprentice.length, master: master.length });
}

assert(allOriginals.length === 61, `Total de originales incorrecto: ${allOriginals.length}`);
assert(new Set(allOriginals.map((question) => question.rawBaseId)).size === 61, "Hay identificadores originales duplicados");
assert(new Set(allOriginals.map((question) => question.structureId)).size === 61, "Hay estructuras declaradas duplicadas");

const active2Eso = topics.flatMap(([theme]) => verifiedBank.build("2eso", theme));
const activeText = [...allOriginals, ...active2Eso]
  .map((question) => `${question.text || ""}\n${question.solution || ""}`)
  .join("\n");
assert(!/\bn\s*=\s*360\b/i.test(activeText), "Se ha encontrado n=360 en un ejercicio activo de 2.º ESO");
assert(!/inter[eé]s compuesto/i.test(allOriginals.map((question) => question.text).join("\n")), "Se conectó interés compuesto");
assert(!/error absoluto|error relativo/i.test(active2Eso.map((question) => question.text).join("\n")), "Sigue activo error absoluto/relativo en 2.º ESO");

const idsFor = (theme) => new Set(verifiedBank.build("2eso", theme).map((question) => question.rawBaseId));
const fractions = idsFor("Fracciones");
const powers = idsFor("Potencias y raíces cuadradas");
const proportionality = idsFor("Proporcionalidad");
const integers = idsFor("Números enteros");
assert(!active2Eso.some((question) => question.rawBaseId === "2eso-fracciones-ace2ca809574"), "Continúa activo un duplicado literal de potencias");

[
  "2eso-fracciones-054ada7bb22a",
  "2eso-fracciones-8b5fbb76ef5e",
  "2eso-fracciones-068b92e2233e",
  "2eso-fracciones-727b0e23d665"
].forEach((id) => {
  assert(powers.has(id), `${id}: no se trasladó a Potencias`);
  assert(!fractions.has(id), `${id}: continúa contaminando Fracciones`);
});

[
  "2eso-fracciones-6ea7422c7674",
  "2eso-fracciones-fbb494f7a098",
  "2eso-fracciones-5b5990179895"
].forEach((id) => {
  assert(proportionality.has(id), `${id}: no se trasladó a Proporcionalidad`);
  assert(!fractions.has(id), `${id}: continúa contaminando Fracciones`);
});

[
  "2eso-numeros-enteros-db2b66327671",
  "2eso-numeros-enteros-c982f00e2394",
  "2eso-numeros-enteros-318566070438",
  "2eso-numeros-enteros-6952bfc9a497"
].forEach((id) => {
  assert(fractions.has(id), `${id}: no se trasladó a Fracciones`);
  assert(!integers.has(id), `${id}: continúa contaminando Números enteros`);
});

// La aclaración del profesor: las potencias con base fraccionaria sí pertenecen a Fracciones.
const fractionalPowers = [
  "2eso-fracciones-8b4a7aed10f9-k",
  "2eso-fracciones-8b4a7aed10f9-n"
];
fractionalPowers.forEach((id) => assert(fractions.has(id), `${id}: una potencia de fracciones fue retirada indebidamente`));

const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert(indexHtml.includes("data/eso2-original-practice-banks.js"), "El banco original no está cargado en index.html");
assert(indexHtml.includes("data/eso2-topic-classification-fixes.js"), "La corrección temática no está cargada en index.html");
assert(indexHtml.indexOf("data/eso2-topic-classification-fixes.js") > indexHtml.indexOf("data/eso-exam-verified-banks-52.js"), "La corrección temática debe cargarse tras el último banco verificado");

const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
assert(/const originalPracticePool = isExam\s*\? \[\]/.test(app), "Los originales de práctica podrían entrar en examen");
assert(app.includes("exceedsSecondEsoFunctions"), "Falta el filtro de contenidos avanzados en Funciones de 2.º ESO");

[
  ["1eso", "Fracciones y números decimales"],
  ["3eso", "Funciones"],
  ["4eso-a", "Proporcionalidad"],
  ["4eso-b", "Potencias y raíces"]
].forEach(([courseId, theme]) => {
  const before = verifiedBeforeFix.build(courseId, theme).map((question) => question.rawBaseId);
  const after = verifiedBank.build(courseId, theme).map((question) => question.rawBaseId);
  assert(JSON.stringify(after) === JSON.stringify(before), `${courseId}: la capa de 2.º ESO alteró otro curso`);
});

console.log(JSON.stringify({ ok: true, totalOriginals: allOriginals.length, report }, null, 2));

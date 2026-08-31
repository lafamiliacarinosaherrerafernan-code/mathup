import fs from "node:fs";
import vm from "node:vm";

const ROOT = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, ROOT), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const context = { window: {} };
vm.createContext(context);
vm.runInContext(read("data/eso4a-controlled-practice-banks.js"), context);

const titles = [
  "Números reales", "Radicales", "Proporcionalidad", "Expresiones algebraicas",
  "Ecuaciones e inecuaciones", "Sistemas de ecuaciones e inecuaciones",
  "Semejanza y trigonometría", "Áreas y cuerpos geométricos", "Funciones"
];
const all = titles.flatMap((title) => context.window.MargaritaEsoOriginalPractice.all("4eso-a", title));
const generated = all.filter((item) => item.generatedForCoverage);
const originals = all.filter((item) => !item.generatedForCoverage);

assert(titles.every((title) => context.window.MargaritaEsoOriginalPractice.all("4eso-a", title).length > 0), "Hay un tema sin banco propio controlado.");
assert(all.length === 78, `Total inesperado: ${all.length}.`);
assert(originals.length === 60, `Originales inesperados: ${originals.length}.`);
assert(generated.length === 18, `Generados inesperados: ${generated.length}.`);
assert(new Set(all.map((item) => item.rawBaseId)).size === all.length, "Hay identificadores duplicados.");
assert(all.every((item) => item.courseId === "4eso-a" && item.topicId.startsWith("4eso-a:") && Number.isInteger(item.topicIndex)), "Hay metadatos de curso o tema incorrectos.");
assert(all.every((item) => item.practiceEligible === true && item.examEligible === false), "Hay ejercicios de ampliación conectados automáticamente a Examen.");
assert(generated.every((item) => item.sourceType === "generated-4eso-a-inequalities" && item.adventureEligible === false), "Un ejercicio nuevo salió del ámbito autorizado.");
assert(all.every((item) => Array.isArray(item.options) && item.options.length === 4 && new Set(item.options).size === 4 && item.correct === 0), "Opciones incoherentes.");
assert(all.every((item) => /Resultado final:/.test(item.solution)), "Hay soluciones incompletas.");

const ownFunctions = context.window.MargaritaFourEsoAOwnBanks.model("funciones");
assert(ownFunctions.length === 9, "El banco propio de Funciones no tiene la cobertura prevista.");
assert(ownFunctions.every((item) => item.courseId === "4eso-a" && item.topicIndex === 8), "Funciones contiene metadatos ajenos.");
for (const token of ["affine", "quadratic", "rational", "exponential", "logarithmic", "compose", "inverse", "average-rate", "cost-models"]) {
  assert(ownFunctions.some((item) => item.structureId.includes(token)), `Falta la familia funcional ${token}.`);
}

const radicals = context.window.MargaritaEsoOriginalPractice.all("4eso-a", "Radicales");
for (const token of ["combine", "nested", "variables", "equivalencia", "multiply", "quotient", "negative-fractional", "single-square-root", "higher-index", "conjugate"]) {
  assert(radicals.some((item) => `${item.structureId} ${item.exerciseType}`.includes(token)), `Falta cobertura de radicales: ${token}.`);
}

const systems = context.window.MargaritaEsoOriginalPractice.all("4eso-a", "Sistemas de ecuaciones e inecuaciones");
const oneVariable = systems.filter((item) => item.subtopic === "sistemas de inecuaciones de una incógnita");
const twoVariable = systems.filter((item) => item.subtopic === "inecuaciones lineales de dos incógnitas");
const twoVariableSystems = systems.filter((item) => item.subtopic === "sistemas de inecuaciones de dos incógnitas");
assert(oneVariable.length === 6 && new Set(oneVariable.map((item) => item.structureId)).size === 6, "Cobertura insuficiente de sistemas de una incógnita.");
assert(twoVariable.length === 6 && twoVariable.every((item) => /<svg/.test(item.statementHtml)), "Las inecuaciones de dos incógnitas no tienen seis gráficas.");
assert(twoVariableSystems.length === 6 && twoVariableSystems.every((item) => /<svg/.test(item.statementHtml)), "Los sistemas de dos incógnitas no tienen seis gráficas.");

const app = read("app.js");
assert(/fourEsoAModelBank[\s\S]*MargaritaFourEsoAOwnBanks\?\.model\?\.\("funciones"\)/.test(app), "4.º A no usa su banco propio de Funciones.");
const fourAFunction = app.match(/function fourEsoAModelBank\(lower\) \{[\s\S]*?\n\}/)?.[0] || "";
assert(!fourAFunction.includes("fourEsoBFunciones"), "Sigue activa la dependencia de Funciones B en 4.º A.");
assert(app.includes("question.adventureEligible !== false"), "Aventura no respeta la elegibilidad independiente.");

const html = read("index.html");
assert(html.indexOf("eso4a-controlled-practice-banks.js") > html.indexOf("eso-exam-verified-banks-52.js"), "El banco 4.º A se carga en un orden incorrecto.");
assert(html.indexOf("eso4a-topic-classification-fixes.js") > html.indexOf("eso4a-controlled-practice-banks.js"), "La normalización 4.º A no se carga al final de los bancos.");

const sourceFiles = fs.readdirSync(new URL("data/", ROOT)).filter((name) => name.startsWith("eso-exam-verified-banks") && name.endsWith(".js"));
const examContext = { window: {} };
vm.createContext(examContext);
for (const file of sourceFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
  vm.runInContext(read(`data/${file}`), examContext);
}
vm.runInContext(read("data/eso4a-topic-classification-fixes.js"), examContext);
for (const [index, title] of titles.entries()) {
  const questions = examContext.window.MargaritaEsoExamVerified?.build?.("4eso-a", title) || [];
  assert(questions.every((item) => item.courseId === "4eso-a" && item.topicIndex === index && item.topicId.startsWith("4eso-a:")), `${title}: examen con clasificación incoherente.`);
  assert(questions.every((item) => item.rawBaseId.startsWith(`4eso-a-${titles[index].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ y /g, "-y-").replace(/ /g, "-")}`) || item.classificationStatus === "normalized-4eso-a-topic"), `${title}: identificador sin normalizar.`);
}

console.log(JSON.stringify({
  status: "OK",
  failures: 0,
  reviewed: all.length,
  originals: originals.length,
  generated: generated.length,
  functions: ownFunctions.length,
  radicals: radicals.length,
  inequalityPractice: {
    oneVariableSystems: oneVariable.length,
    twoVariableInequalities: twoVariable.length,
    twoVariableSystems: twoVariableSystems.length,
    svgGraphs: [...twoVariable, ...twoVariableSystems].filter((item) => /<svg/.test(item.statementHtml)).length
  }
}, null, 2));

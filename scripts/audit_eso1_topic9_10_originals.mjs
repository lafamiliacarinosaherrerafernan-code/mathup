import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const sources = [
  "data/eso1-original-topic9-10-banks.js",
  "data/eso1-original-topic9-10-review2.js"
];
const context = { window: {}, Intl };
vm.createContext(context);
for (const relative of sources) {
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
}

const bank = context.window.MargaritaEsoOriginalPractice;
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(bank, "No se publicó MargaritaEsoOriginalPractice");
const bodies = bank.all("1eso", "Cuerpos geométricos");
const functions = bank.all("1eso", "Funciones");
const integers = bank.all("1eso", "Números enteros");
assert(bodies.length === 166, `Se esperaban 166 ejercicios de cuerpos; hay ${bodies.length}`);
assert(functions.length === 212, `Se esperaban 212 ejercicios de funciones; hay ${functions.length}`);
assert(integers.length === 5, `Se esperaban 5 ejercicios de enteros recuperados del capítulo; hay ${integers.length}`);
assert(bank.count === 383, `El total publicado debe ser 383 y es ${bank.count}`);
assert(bank.review2?.length === 350, `La segunda revisión debe aportar 350 ejercicios y aporta ${bank.review2?.length}`);

const all = [...bodies, ...functions, ...integers];
const ids = new Set();
for (const item of all) {
  assert(!ids.has(item.rawBaseId), `Identificador duplicado: ${item.rawBaseId}`);
  ids.add(item.rawBaseId);
  assert(item.courseId === "1eso", `${item.rawBaseId}: curso incorrecto`);
  assert(item.practiceEligible === true && item.examEligible === false, `${item.rawBaseId}: disponibilidad incorrecta`);
  assert(["apprentice", "master"].includes(item.challengeLevel), `${item.rawBaseId}: nivel inválido`);
  assert(item.options?.length === 4 && new Set(item.options).size === 4, `${item.rawBaseId}: opciones no coherentes`);
  assert(!item.options.some((option) => /10 veces|décima parte|10·|0,1·/.test(option)), `${item.rawBaseId}: distractor no expresado como respuesta final`);
  assert(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < 4, `${item.rawBaseId}: índice correcto inválido`);
  assert(item.text && item.solution && item.subtopic && item.exerciseType && item.structureId, `${item.rawBaseId}: metadatos incompletos`);
  assert(item.sourceDocument && item.sourceReference, `${item.rawBaseId}: procedencia incompleta`);
  assert(!/ficha4-area-volum/i.test(item.sourceDocument), `${item.rawBaseId}: se conectó por error la ficha de 2.º ESO`);
  if (/Funcion Lineal/i.test(item.sourceDocument)) {
    const page = Number(item.sourceReference.match(/p\.\s*(\d+)/i)?.[1]);
    assert(page >= 1 && page <= 7, `${item.rawBaseId}: se conectó una página de soluciones`);
  }
  for (const src of item.statementHtml?.matchAll(/src="([^"]+)"/g) || []) {
    assert(fs.existsSync(path.join(root, src[1])), `${item.rawBaseId}: falta la imagen ${src[1]}`);
  }
  assert(fs.existsSync(path.join(root, item.sourceDocument)), `${item.rawBaseId}: falta el documento fuente`);
}

assert(bank.build("1eso", "Cuerpos geométricos", "apprentice").every((item) => item.challengeLevel === "apprentice"), "Mezcla de niveles en cuerpos Aprendiz");
assert(bank.build("1eso", "Funciones", "master").every((item) => item.challengeLevel === "master"), "Mezcla de niveles en funciones Maestro");

const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
assert(/const originalPracticePool = isExam\s*\? \[\]/.test(app), "El modo examen no excluye expresamente el banco de fichas");
assert(app.includes("...originalPracticePool, ...generatedPool"), "El banco original no está conectado a la práctica");

const report = {
  total: all.length,
  initial: 33,
  review2: bank.review2.length,
  bodies: {
    total: bodies.length,
    apprentice: bodies.filter((item) => item.challengeLevel === "apprentice").length,
    master: bodies.filter((item) => item.challengeLevel === "master").length,
    structures: new Set(bodies.map((item) => item.structureId)).size,
    visual: bodies.filter((item) => item.requiresVisual).length
  },
  functions: {
    total: functions.length,
    apprentice: functions.filter((item) => item.challengeLevel === "apprentice").length,
    master: functions.filter((item) => item.challengeLevel === "master").length,
    structures: new Set(functions.map((item) => item.structureId)).size,
    visual: functions.filter((item) => item.requiresVisual).length
  },
  integers: {
    total: integers.length,
    structures: new Set(integers.map((item) => item.structureId)).size
  },
  solutionsImported: 0,
  wrongCourseDocumentsConnected: 0,
  examEligible: all.filter((item) => item.examEligible).length
};

console.log(JSON.stringify(report, null, 2));

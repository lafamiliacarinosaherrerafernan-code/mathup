import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = { window: {}, globalThis: {}, console, Map, Object, String, Number, Math, BigInt, Error, TypeError };
context.globalThis = context;
vm.createContext(context);
for (const file of ["math-answer-validator.js", "handwriting-recognition.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
}
const validator = context.window.MargaritaMathAnswerValidator;
const recognition = context.window.MargaritaHandwritingRecognition;
const failures = [];
const cases = [];
const check = (condition, name) => { cases.push({ name, passed: Boolean(condition) }); if (!condition) failures.push(name); };
const equivalent = (recognizedExpression, expectedExpression, validationType = "number", extra = {}) =>
  validator.validate({ recognizedExpression, expectedExpression, validationType, ...extra });

for (const value of ["5", "-3", "12", "1/2", "3/4", "2^3", "√9"]) {
  check(equivalent(value, value, value.includes("/") ? "fraction" : value.includes("^") ? "power" : value.includes("√") ? "root" : "number").isEquivalent, `Reconoce y valida ${value}`);
}
for (const value of ["x+2", "2x+3", "2(x+1)"]) check(equivalent(value, value, "expression").isEquivalent, `Expresión básica ${value}`);
check(equivalent("x=4", "x=4", "equation").isEquivalent, "Ecuación x=4");
check(equivalent("1/2", "0.5", "fraction").isEquivalent, "1/2 equivale a 0,5");
check(equivalent("2/4", "1/2", "fraction").isEquivalent, "2/4 equivale a 1/2");
check(equivalent("2(x+1)", "2x+2", "expression").isEquivalent, "Expansión algebraica exacta");
check(!equivalent("x+2=5", "x=3", "equation").isEquivalent, "No confunde ecuación original con solución por defecto");
check(equivalent("x+2=5", "x=3", "equation", { equationMode: "solution-set" }).isEquivalent, "Permite equivalencia de conjunto solución solo con política explícita");
check(!equivalent("-x^2", "(-x)^2", "expression").isEquivalent, "Distingue -x² de (-x)²");
check(equivalent("-3/4", "(-3)/4", "fraction").isEquivalent, "Normaliza signo delante de fracción");
check(!equivalent("2^3", "23", "number").isEquivalent, "Distingue potencia de concatenación");
check(!equivalent("√9", "9", "number").isEquivalent, "Distingue raíz de radicando");
check(equivalent("0.333", "1/3", "number", { tolerance: 0.001 }).isEquivalent, "Tolerancia explícita por ejercicio");
check(!equivalent("0.333", "1/3", "number").isEquivalent, "Sin tolerancia no aproxima arbitrariamente");
check(equivalent("1/2", "1/2", "fraction", { confidence: 0.4 }).status === "ambiguous", "Baja confianza no acierta ni falla");
check(equivalent("[0,1]", "[0,1]", "interval").status === "unsupported", "Tipo aún no implementado queda explícito");

const ink = { version: "1.0", width: 200, height: 80, strokes: [{ strokeId: "a", points: [{ x: 1, y: 1 }] }] };
const unavailable = await recognition.recognize(ink);
check(unavailable.status === "unavailable", "Sin proveedor no se simula reconocimiento");
recognition.registerProvider("diagnostic-test", { kind: "test", recognize: async () => ({ expression: "2/4", confidence: 0.98 }) });
const diagnosed = await recognition.diagnose({ ink, provider: "diagnostic-test", expectedExpression: "1/2", validationType: "fraction", context: { exerciseId: "safe-test", courseId: "1eso", topicId: 3, mode: "challenge" } });
check(diagnosed.status === "equivalent" && diagnosed.isEquivalent === true, "Contrato proveedor → normalización → validación");
recognition.registerProvider("diagnostic-no-confidence", { recognize: async () => ({ expression: "1/2", confidence: null, alternatives: [] }) });
const noConfidence = await recognition.diagnose({ ink, provider: "diagnostic-no-confidence", expectedExpression: "1/2", validationType: "fraction" });
check(noConfidence.status === "ambiguous" && noConfidence.requiresManualReview === true && noConfidence.suggestedEquivalent === true, "Sin confidence conserva revisión manual y calcula equivalencia sugerida");
check(!JSON.stringify(diagnosed).includes("student") && !JSON.stringify(diagnosed).includes("score"), "Diagnóstico sin datos personales ni puntuación");
recognition.registerProvider("low-confidence-test", { kind: "test", recognize: async () => ({ expression: "5", confidence: 0.4 }) });
check((await recognition.recognize(ink, { provider: "low-confidence-test" })).status === "ambiguous", "Proveedor con baja confianza produce ambiguo");

const sourceFiles = ["app.js", "coach-ui.js", "eso-exam.js", "handwriting-board.js", "handwriting-recognition.js", "math-answer-validator.js"].map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
check(!/MargaritaHandwritingRecognition[\s\S]{0,300}(?:score\s*[+]=|streak\s*=|updateGameProgress)/.test(sourceFiles), "Reconocimiento no actualiza puntuación, racha ni progreso");

console.log(JSON.stringify({ passed: failures.length === 0, cases, failures }, null, 2));
if (failures.length) process.exitCode = 1;

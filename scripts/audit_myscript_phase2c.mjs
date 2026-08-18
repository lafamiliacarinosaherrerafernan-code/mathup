import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const checks = [];
const check = (condition, label) => checks.push({ condition: Boolean(condition), label });

const files = [
  "data/myscript-phase2c-corpus.js",
  "myscript-evaluation.js",
  "myscript-evaluation.css",
  "handwriting-board.js",
  "handwriting-recognition.js",
  "myscript-recognition-provider.js",
  "supabase/functions/recognize-math/index.ts",
  "index.html",
  "developer-mode.js"
];
for (const file of files) check(fs.existsSync(path.join(root, file)), `Existe ${file}`);
for (const file of files.filter((file) => file.endsWith(".js"))) new vm.Script(read(file), { filename: file });

const corpusContext = { window: {} };
vm.createContext(corpusContext);
vm.runInContext(read("data/myscript-phase2c-corpus.js"), corpusContext);
const corpus = corpusContext.window.MARGARITA_MYSCRIPT_PHASE2C_CORPUS;
const counts = Object.fromEntries([...new Set(corpus.map((sample) => sample.family))].map((family) => [family, corpus.filter((sample) => sample.family === family).length]));
check(corpus.length === 100, "El corpus contiene exactamente 100 muestras");
check(JSON.stringify(counts) === JSON.stringify({ "enteros-decimales": 10, fracciones: 15, potencias: 10, raices: 10, algebra: 15, ecuaciones: 15, "desigualdades-intervalos": 10, coordenadas: 5, combinadas: 10 }), "Distribución por familias correcta");
check(new Set(corpus.map((sample) => sample.sampleId)).size === 100, "Identificadores anónimos únicos");

const evaluation = read("myscript-evaluation.js");
check(/MAX_TOTAL_REQUESTS = 200/.test(evaluation) && /BASELINE_REQUESTS = 1/.test(evaluation), "Límite de 200 y petición inicial contabilizada");
check(/writer-\[1-5\]/.test(evaluation) && !/student|alumno|nombre|grupo/i.test(evaluation.replace(/No se guardan trazos ni datos de alumnos/g, "")), "Registro anónimo sin identidad académica");
check(/correct.*incorrect.*ambiguous.*technical-error/s.test(evaluation), "Cuatro resultados manuales disponibles");
check(/falsePositives/.test(evaluation) && /falseNegatives/.test(evaluation) && /validatorEquivalent/.test(evaluation), "Equivalencia matemática y falsos positivos separados");
check(/confidence:\s*detail\.confidence \?\? null/.test(evaluation), "La confianza ausente permanece null");
check(!/strokes\s*:|selectedStrokeIds|rawSemanticResult/.test(evaluation), "No se persisten trazos ni respuesta semántica bruta");
check(/MYSCRIPT_TEST_ENABLED/.test(evaluation) && /false/.test(evaluation), "Cierre recuerda desactivar el interruptor servidor");

const board = read("handwriting-board.js");
check(/margarita:handwriting-recognized/.test(board) && /requestCount/.test(board) && /latencyMs/.test(board), "La pizarra comunica diagnóstico sin puntuar");
check(/beforeRecognition/.test(board), "La pizarra respeta el límite de la evaluación");

const proxy = read("supabase/functions/recognize-math/index.ts");
check(/Deno\.env\.get\("MYSCRIPT_APPLICATION_KEY"\)/.test(proxy) && /Deno\.env\.get\("MYSCRIPT_HMAC_KEY"\)/.test(proxy), "Credenciales solo en secretos servidor");
check(/MYSCRIPT_TEST_ENABLED/.test(proxy) && /controlled-test-disabled/.test(proxy), "Interruptor servidor obligatorio");
check(!/Access-Control-Allow-Origin"\s*:\s*"\*"/.test(proxy), "CORS sin comodín");
check(!/console\.(?:log|info|error)\([^\n]*(?:ink|strokes|semantic)/i.test(proxy), "Logs sin trazos ni resultado personal");
check(/requestCount:\s*1/.test(proxy) && /requestCount:\s*0/.test(proxy), "El proxy informa si hubo petición real");

const index = read("index.html");
check(index.indexOf("data/myscript-phase2c-corpus.js") < index.indexOf("myscript-evaluation.js") && index.indexOf("myscript-evaluation.js") < index.indexOf("handwriting-board.js"), "Orden de carga correcto");
check(/MargaritaMyScriptEvaluation\.render/.test(read("developer-mode.js")), "Acceso solo desde el panel de desarrollo");

const failed = checks.filter((item) => !item.condition);
for (const item of checks) console.log(`${item.condition ? "PASS" : "FAIL"} ${item.label}`);
console.log(`\n${checks.length - failed.length}/${checks.length} comprobaciones superadas`);
if (failed.length) process.exitCode = 1;

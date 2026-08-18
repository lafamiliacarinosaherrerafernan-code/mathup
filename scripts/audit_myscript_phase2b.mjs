import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = Object.fromEntries(["handwriting-recognition.js", "myscript-recognition-provider.js", "handwriting-board.js", "index.html", ".gitignore", "supabase/functions/recognize-math/index.ts", "docs/handwriting-recognition-phase2b-corpus.json"].map((file) => [file, fs.readFileSync(path.join(root, file), "utf8")]));
const failures = [];
const cases = [];
function check(condition, name) { cases.push({ name, passed: Boolean(condition) }); if (!condition) failures.push(name); }

const calls = [];
const context = {
  window: {
    performance: { now: () => 10 },
    APP_CONFIG: { DEVELOPER_MODE: true, MYSCRIPT_CONTROLLED_TEST: true },
    MargaritaHandwritingRecognition: null,
    APP_SUPABASE: { isConfigured: () => true, getClient: () => ({ functions: { invoke: async (name, request) => { calls.push({ name, request }); return { data: { provider: "myscript-iink", recognizedExpression: "1/2", confidence: null, rawSemanticResult: { type: "Math", label: "1/2" } }, error: null }; } } }) }
  },
  globalThis: {}, console, Map, Object, String, Number, Math, Date, Error, TypeError
};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(files["handwriting-recognition.js"], context, { filename: "handwriting-recognition.js" });
context.window.MargaritaHandwritingRecognition = context.window.MargaritaHandwritingRecognition;
vm.runInContext(files["myscript-recognition-provider.js"], context, { filename: "myscript-recognition-provider.js" });
const ink = { version: "1.0", width: 100, height: 50, strokes: [{ points: [{ x: 1.2, y: 3.4, timestamp: 0 }, { x: 5.6, y: 7.8, timestamp: 20 }] }] };
const result = await context.window.MargaritaHandwritingRecognition.recognize(ink, { provider: "myscript-iink", expectedAnswerType: "fraction" });
check(result.status === "ambiguous" && result.expression === "1/2" && result.confidence === null, "Sin confianza documentada permanece ambiguous");
check(calls.length === 1 && calls[0].name === "recognize-math", "Una selección produce una única invocación al proxy");
const sent = JSON.stringify(calls[0].request.body);
check(!/student|name|group|score|streak|progress|password|correctAnswer|solution|statement/i.test(sent), "El cliente solo envía tinta, tipo y locale");
check(/contentType:\s*"Math"/.test(files["supabase/functions/recognize-math/index.ts"]), "El proxy usa reconocimiento Math");
check(/Deno\.env\.get\("MYSCRIPT_APPLICATION_KEY"\)/.test(files["supabase/functions/recognize-math/index.ts"]) && /Deno\.env\.get\("MYSCRIPT_HMAC_KEY"\)/.test(files["supabase/functions/recognize-math/index.ts"]), "Secretos solo en variables servidor");
check(/Deno\.env\.get\("MYSCRIPT_TEST_ENABLED"\) === "true"/.test(files["supabase/functions/recognize-math/index.ts"]), "El proxy requiere habilitación expresa en servidor");
check(/MYSCRIPT_ALLOWED_ORIGIN/.test(files["supabase/functions/recognize-math/index.ts"]) && !/Access-Control-Allow-Origin": "\*"/.test(files["supabase/functions/recognize-math/index.ts"]), "CORS queda limitado al origen configurado");
check(!/MYSCRIPT_(?:APPLICATION|HMAC)_KEY\s*[:=]\s*["'][^"']{8,}/.test(files["index.html"] + files["handwriting-recognition.js"] + files["myscript-recognition-provider.js"]), "No hay secretos en frontend");
check(/He reconocido:/.test(files["handwriting-board.js"]) && /Confirmar/.test(files["handwriting-board.js"]) && /Volver a escribir/.test(files["handwriting-board.js"]), "Interfaz diagnóstica preparada");
check(/No se han modificado puntos ni progreso/.test(files["handwriting-board.js"]), "Confirmación declara el modo no puntuable");
check(/\^\\d\+eso/.test(files["handwriting-board.js"]), "Prueba real restringida a ESO");
check(!/Mathpix/i.test(files["myscript-recognition-provider.js"] + files["supabase/functions/recognize-math/index.ts"]), "Mathpix no se integra");
check(/supabase\/functions\/\.env/.test(files[".gitignore"]), "Archivo local de secretos ignorado por Git");
const corpus = JSON.parse(files["docs/handwriting-recognition-phase2b-corpus.json"]);
check(Object.keys(corpus.families).length === 10 && corpus.confusions.length >= 10, "Corpus representativo y matriz de confusiones definidos");

console.log(JSON.stringify({ passed: failures.length === 0, cases, failures }, null, 2));
if (failures.length) process.exitCode = 1;

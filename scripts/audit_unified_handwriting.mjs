import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const sources = {
  app: read("app.js"),
  bachExam: read("bach-exam.js"),
  firstBachExam: read("first-bach-exam.js"),
  esoExam: read("eso-exam.js"),
  coach: read("coach-ui.js"),
  board: read("handwriting-board.js"),
  styles: read("styles.css")
};

const cases = [];
const failures = [];
function check(condition, name) {
  cases.push({ name, passed: Boolean(condition) });
  if (!condition) failures.push(name);
}

check(/mode:\s*activeBlock \? "blockChallenge" : "topicChallenge"/.test(sources.app), "Retos por temas y por bloques usan la pizarra común");
check(/mode:\s*adventure\.mode === "boss" \? "adventureBoss" : "adventureTraining"/.test(sources.app), "Aventura y jefe final usan la pizarra común");
check(/difficulty:\s*adventure\.difficulty \|\| "boss"/.test(sources.app), "La aventura conserva fácil, media, difícil o jefe");
check(/mode:\s*"esoExam"/.test(sources.esoExam), "Examen ESO usa la pizarra común");
check(/mode:\s*"firstBachExam"/.test(sources.firstBachExam), "Examen de 1.º Bachillerato usa la pizarra común");
check(/mode:\s*"bachExam"/.test(sources.bachExam) && /partId:/.test(sources.bachExam), "Examen de 2.º Bachillerato conserva cada apartado");
check(/mode:\s*diagnostic \? "coachDiagnostic" : "coachSession"/.test(sources.coach), "Entrenador y diagnóstico evaluables usan la pizarra común");
check(["courseId", "subject", "topicId", "blockId", "exerciseId", "partId", "questionIndex", "difficulty", "mode"]
  .every((field) => new RegExp(`${field}:`).test(sources.app)), "El adaptador conserva el contexto completo del ejercicio");
check(/correctAnswer,[\s\S]*solution:[\s\S]*didacticPolicy:[\s\S]*scoreState:[\s\S]*attemptContext:/.test(sources.app), "Respuesta, solución, política y estado quedan en contexto interno");
check(/exerciseContexts\.set/.test(sources.board) && !/data-correct|data-solution/.test(sources.board), "La respuesta correcta no se publica en atributos HTML");
check(/handwritingValidated/.test(sources.board) && /margarita:handwriting-validated/.test(sources.board), "Callback de validación futura preparado");
check(!/OCR|Tesseract|MathAnswerValidator|recognizedText\s*==/i.test(sources.board), "No se ha fingido reconocimiento ni validación");
check(/\.eso-home-grid[\s\S]*min-height:\s*min\(540px/.test(sources.styles)
  && /@media \(max-width: 980px\)[\s\S]*\.eso-home-grid[\s\S]*grid-template-columns:\s*1fr/.test(sources.styles), "Portada ESO compacta y responsive");

const result = { cases, failures, passed: failures.length === 0 };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;

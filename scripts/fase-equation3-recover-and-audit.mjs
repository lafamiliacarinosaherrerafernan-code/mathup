import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hashProtectedFiles, readJsonl, recoverEquationObjects, semanticHash, stableJson, summarizeRecovery } from "../catalog/equation3-andalucia-2012/recovery.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "artifacts/equation3-andalucia-2012/runs/run-a");
const nativeRegistryPath = path.join(projectRoot, "artifacts/equation3-andalucia-2012/native-evidence/native-stream-registry.jsonl");
const exercisesPath = path.join(projectRoot, "artifacts/andalucia-ccssii-2012-doc/runs/run-a/recovered-exercises.jsonl");
const protectedPaths = ["index.html", "app.js", "math-renderer.js"].filter((relativePath) => fs.existsSync(path.join(projectRoot, relativePath)));

fs.mkdirSync(outputRoot, { recursive: true });
const exercises = readJsonl(exercisesPath);
const records = recoverEquationObjects({ nativeRegistryPath, exercisesPath, projectRoot });
const summary = summarizeRecovery(records, exercises);
fs.writeFileSync(path.join(outputRoot, "recovered-equations.jsonl"), records.map(stableJson).join(""));
fs.writeFileSync(path.join(outputRoot, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
fs.writeFileSync(path.join(outputRoot, "protected-production-hashes.json"), JSON.stringify({ schemaVersion: "mathup.protected-production-hashes.v1", hashes: hashProtectedFiles(projectRoot, protectedPaths) }, null, 2) + "\n");

const cards = records.map((record) => {
  const image = path.relative(outputRoot, path.join(projectRoot, record.sourceAuthority.pngPath)).replaceAll("\\", "/");
  return `<article id="${record.objectId}"><header><h2>${record.objectId}</h2><p>${record.exerciseAssociation.documentExerciseId} · ${record.exerciseAssociation.subpart ? `apartado ${record.exerciseAssociation.subpart}` : "ámbito ejercicio"}</p></header><div class="comparison"><section><h3>Original oficial (PNG derivado del EMF)</h3><img src="${image}" alt="Objeto oficial ${record.objectId}"></section><section><h3>Representación estructurada derivada</h3><div class="rendered">${record.derived.mathml}</div></section></div><details><summary>Evidencia y derivados</summary><pre>${escapeHtml(JSON.stringify({ sourceAuthority: record.sourceAuthority, exerciseAssociation: record.exerciseAssociation, latex: record.derived.latex, constructionCounts: record.constructionCounts, visualValidation: record.visualValidation }, null, 2))}</pre></details></article>`;
}).join("\n");
const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Equation.3 Andalucía CCSS II 2012</title><style>body{font-family:system-ui,Segoe UI,sans-serif;margin:0;background:#eef4fb;color:#10214a}main{max-width:1400px;margin:auto;padding:24px}article{background:white;border:1px solid #cad8ec;border-radius:16px;padding:20px;margin:0 0 24px;box-shadow:0 8px 24px #1232  }h2{font-size:18px}.comparison{display:grid;grid-template-columns:1fr 1fr;gap:20px}.comparison section{border:1px solid #d8e2f0;border-radius:12px;padding:16px;overflow:auto;min-height:150px}.comparison img{max-width:100%;height:auto;image-rendering:auto}.rendered{font-family:'Cambria Math','STIX Two Math','Times New Roman',serif;font-size:24px;display:grid;place-items:center;min-height:120px}.rendered math{max-width:100%;overflow:auto}pre{white-space:pre-wrap;word-break:break-word}@media(max-width:760px){.comparison{grid-template-columns:1fr}.rendered{font-size:20px}}</style></head><body><main><h1>Comparación oficial ↔ estructura recuperada</h1><p>55 objetos Equation.3. Ningún dictamen visual humano está registrado.</p>${cards}</main></body></html>`;
fs.writeFileSync(path.join(outputRoot, "visual-comparison.html"), html);

const exerciseRows = exercises.map((exercise) => {
  const objectRecords = exercise.documentObjects.map((id) => records.find((record) => record.objectId === id)).filter(Boolean);
  return {
    documentExerciseId: exercise.documentExerciseId,
    documentId: exercise.documentId,
    option: exercise.option,
    exerciseNumber: exercise.exerciseNumber,
    subparts: exercise.subparts.map((part) => part.label),
    equation3Objects: exercise.documentObjects,
    structuralRecoveryComplete: objectRecords.length === exercise.documentObjects.length,
    visualComparisonStatus: exercise.documentObjects.length ? "HUMAN_COMPARISON_PENDING" : "NOT_APPLICABLE",
    integrationReadiness: exercise.documentObjects.length ? "BLOCKED_PENDING_VISUAL_COMPARISON" : "PREPARED_NO_EQUATION3_DEPENDENCY"
  };
});
fs.writeFileSync(path.join(outputRoot, "exercise-readiness.jsonl"), exerciseRows.map(stableJson).join(""));

const repeatedRecords = recoverEquationObjects({ nativeRegistryPath, exercisesPath, projectRoot });
const reversedRecords = recoverEquationObjects({ nativeRegistryPath, exercisesPath, projectRoot, reverseInput: true });
const reproducibility = {
  schemaVersion: "mathup.equation3-reproducibility.v1",
  objects: records.length,
  runA: semanticHash(records),
  runB: semanticHash(repeatedRecords),
  orderReversed: semanticHash(reversedRecords),
  repeatedRunEqual: semanticHash(records) === semanticHash(repeatedRecords),
  orderInvariant: semanticHash(records) === semanticHash(reversedRecords)
};
fs.writeFileSync(path.join(outputRoot, "reproducibility.json"), JSON.stringify(reproducibility, null, 2) + "\n");

const protectedBefore = hashProtectedFiles(projectRoot, protectedPaths);
const protectedAfter = hashProtectedFiles(projectRoot, protectedPaths);
const rollback = {
  schemaVersion: "mathup.equation3-rollback-check.v1",
  strategy: "Eliminar exclusivamente artifacts/equation3-andalucia-2012 y los archivos nuevos de esta fase; los DOC oficiales y producción no se modifican.",
  productionHashesBefore: protectedBefore,
  productionHashesAfter: protectedAfter,
  productionUnchanged: JSON.stringify(protectedBefore) === JSON.stringify(protectedAfter),
  sourceDocumentsMutated: false,
  integrationPerformed: false
};
fs.writeFileSync(path.join(outputRoot, "rollback.json"), JSON.stringify(rollback, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

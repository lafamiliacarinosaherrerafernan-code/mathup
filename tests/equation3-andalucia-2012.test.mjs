import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { parseMtef3 } from "../catalog/equation3-andalucia-2012/mtef3-recovery.mjs";
import { readJsonl, recoverEquationObjects, semanticHash } from "../catalog/equation3-andalucia-2012/recovery.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactRoot = path.join(root, "artifacts/equation3-andalucia-2012");
const runRoot = path.join(artifactRoot, "runs/run-a");
const nativeRegistryPath = path.join(artifactRoot, "native-evidence/native-stream-registry.jsonl");
const exercisesPath = path.join(root, "artifacts/andalucia-ccssii-2012-doc/runs/run-a/recovered-exercises.jsonl");
const records = readJsonl(path.join(runRoot, "recovered-equations.jsonl"));
const registry = readJsonl(nativeRegistryPath);
const exercises = readJsonl(exercisesPath);
const summary = JSON.parse(fs.readFileSync(path.join(runRoot, "summary.json"), "utf8"));
const mapSummary = JSON.parse(fs.readFileSync(path.join(artifactRoot, "doc-object-map/summary.json"), "utf8"));

function hashFile(relativePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relativePath))).digest("hex");
}

test("contabiliza exactamente 55 objetos Equation.3", () => assert.equal(records.length, 55));
test("los 55 objectId son únicos", () => assert.equal(new Set(records.map((r) => r.objectId)).size, 55));
test("los 55 se clasifican como estructura nativa recuperada", () => assert.deepEqual(summary.classifications, { NATIVE_STRUCTURE_RECOVERED: 55 }));
test("no se usa conversión determinista sustitutiva", () => assert.equal(summary.deterministicConversionRecovered, 0));
test("no se usa transcripción visual", () => assert.equal(summary.visualTranscriptionRequired, 0));
test("no hay objetos ambiguos", () => assert.equal(summary.ambiguous, 0));
test("no hay objetos irrecuperables", () => assert.equal(summary.unrecoverable, 0));
test("se conservan los seis DOC oficiales", () => assert.equal(new Set(records.map((r) => r.sourceAuthority.documentId)).size, 6));
test("recuento por DOC coincide con 11, 6, 7, 10, 7 y 14", () => assert.deepEqual(mapSummary.documentsAudit.map((d) => d.equationFields), [11, 6, 7, 10, 7, 14]));
test("cada rango Word enlaza exactamente un almacenamiento OLE", () => assert.equal(mapSummary.allRangesMatched, true));
test("los almacenamientos OLE son únicos por documento", () => assert.equal(mapSummary.uniqueOleStoragesPerDocument, true));
test("el mapa documental conserva su hash semántico", () => assert.equal(mapSummary.semanticHash, "13d7649b4b46c77921278a0c3be8a11990cb42a918bccc7f1719527da2a090e1"));
test("cada objeto conserva DOC, nativo, MTEF, EMF y PNG", () => {
  for (const r of records) for (const key of ["sourcePath", "nativePath", "mtefPath", "emfPath", "pngPath"]) assert.ok(fs.existsSync(path.join(root, r.sourceAuthority[key])), `${r.objectId}: ${key}`);
});
test("todos los hashes de evidencia coinciden con los bytes", () => {
  for (const r of records) {
    assert.equal(hashFile(r.sourceAuthority.sourcePath), r.sourceAuthority.documentSha256);
    assert.equal(hashFile(r.sourceAuthority.nativePath), r.sourceAuthority.nativeSha256);
    assert.equal(hashFile(r.sourceAuthority.mtefPath), r.sourceAuthority.mtefSha256);
    assert.equal(hashFile(r.sourceAuthority.emfPath), r.sourceAuthority.emfSha256);
    assert.equal(hashFile(r.sourceAuthority.pngPath), r.sourceAuthority.pngSha256);
  }
});
test("todos los flujos nativos son MTEF versión 3", () => {
  for (const r of registry) assert.equal(parseMtef3(fs.readFileSync(path.join(root, r.mtefPath))).header.version, 3);
});
test("cada objeto tiene AST tipado no vacío", () => records.forEach((r) => assert.equal(r.mathAst.type, "equation-expression")));
test("cada objeto tiene LaTeX derivado no vacío", () => records.forEach((r) => assert.ok(r.derived.latex.trim())));
test("cada objeto tiene MathML derivado renderizable", () => records.forEach((r) => assert.match(r.derived.mathml, /^<math[\s>]/u)));
test("los derivados no contienen caracteres privados de Equation Editor", () => records.forEach((r) => assert.doesNotMatch(`${r.derived.latex}${r.derived.mathml}`, /[\uE000-\uF8FF]/u)));
test("el inventario identifica matrices, fracciones, potencias y subíndices", () => {
  for (const family of ["matrix", "fraction", "power", "subscript"]) assert.ok(summary.constructions[family] > 0, family);
});
test("cada objeto se asocia a un único ejercicio y ámbito", () => records.forEach((r) => {
  assert.ok(r.exerciseAssociation.documentExerciseId);
  assert.ok(["EXERCISE", "SUBPART"].includes(r.exerciseAssociation.scope));
}));
test("se conservan los 48 ejercicios y 104 subapartados previos", () => {
  assert.equal(exercises.length, 48);
  assert.equal(exercises.flatMap((e) => e.subparts).length, 104);
});
test("27 ejercicios dependen de Equation.3 y 21 no", () => {
  assert.equal(summary.exercises.withEquation3Objects, 27);
  assert.equal(summary.exercises.withoutEquation3Objects, 21);
});
test("los 27 ejercicios con objetos tienen recuperación estructural completa", () => assert.equal(summary.exercises.structurallyRecovered, 27));
test("ninguna comparación visual recibe aprobación automática", () => {
  assert.deepEqual(summary.visualComparison, { identicalCertified: 0, differencesConfirmed: 0, humanComparisonPending: 55 });
  records.forEach((r) => assert.equal(r.visualValidation.status, "HUMAN_COMPARISON_PENDING"));
});
test("la lectura repetida produce el mismo hash semántico", () => {
  const second = recoverEquationObjects({ nativeRegistryPath, exercisesPath, projectRoot: root });
  assert.equal(semanticHash(second), summary.semanticHash);
});
test("la entrada invertida no altera el resultado semántico", () => {
  const reversed = recoverEquationObjects({ nativeRegistryPath, exercisesPath, projectRoot: root, reverseInput: true });
  assert.equal(semanticHash(reversed), summary.semanticHash);
});
test("el arnés aislado contiene 55 originales y 55 MathML", () => {
  const html = fs.readFileSync(path.join(runRoot, "visual-comparison.html"), "utf8");
  assert.equal((html.match(/<article id=/gu) ?? []).length, 55);
  assert.equal((html.match(/<img src=/gu) ?? []).length, 55);
  assert.equal((html.match(/<math /gu) ?? []).length, 55);
});
test("el control de rollback acredita producción intacta", () => {
  const rollback = JSON.parse(fs.readFileSync(path.join(runRoot, "rollback.json"), "utf8"));
  assert.equal(rollback.productionUnchanged, true);
  assert.equal(rollback.sourceDocumentsMutated, false);
  assert.equal(rollback.integrationPerformed, false);
});
test("la fase no genera respuestas, soluciones ni distractores", () => {
  const serialized = JSON.stringify(records);
  assert.doesNotMatch(serialized, /generatedAnswer|generatedSolution|generatedDistractor/iu);
});

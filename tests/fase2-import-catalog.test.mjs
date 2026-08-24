import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import { SEMANTIC_ARTIFACTS, canonicalIds } from "../scripts/fase2-import-catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runA = path.join(root, "artifacts", "fase2", "runs", "run-a");
const runB = path.join(root, "artifacts", "fase2", "runs", "run-b");
const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const readJsonl = (file) => fs.readFileSync(file, "utf8").trim().split(/\r?\n/u).filter(Boolean).map(JSON.parse);
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

test("produce todos los artefactos auditables planificados", () => {
  for (const name of SEMANTIC_ARTIFACTS) assert.equal(fs.existsSync(path.join(runA, name)), true, name);
  assert.equal(fs.existsSync(path.join(runA, "rollback-manifest.json")), true);
  assert.equal(fs.existsSync(path.join(runA, "checksums.sha256")), true);
});

test("concilia exactamente los 15.527 registros sin descarte silencioso", () => {
  const sources = readJsonl(path.join(runA, "source-records.jsonl"));
  const links = readJsonl(path.join(runA, "source-to-canonical.jsonl"));
  assert.equal(sources.length, 15527);
  assert.equal(new Set(sources.map((item) => item.sourceRecordId)).size, 15527);
  assert.equal(links.length, 15527);
  assert.equal(new Set(links.map((item) => item.sourceRecordId)).size, 15527);
  assert.deepEqual(new Set(links.map((item) => item.sourceRecordId)), new Set(sources.map((item) => item.sourceRecordId)));
  assert.equal(readJsonl(path.join(runA, "runtime-observations.jsonl")).length, 5061);
});

test("concilia los 6.712 ejercicios y conserva los 607 inaccesibles", () => {
  const reconciliation = readJsonl(path.join(runA, "educational-content-reconciliation.jsonl"));
  const inaccessible = fs.readFileSync(path.join(runA, "inaccessible-classification.csv"), "utf8").trim().split(/\r?\n/u).slice(1);
  assert.equal(reconciliation.length, 6712);
  assert.equal(inaccessible.length, 607);
  assert.equal(reconciliation.filter((item) => item.accessible === false).length, 607);
  for (const item of reconciliation) {
    assert.ok(item.sourceRecordIds.length > 0);
    assert.ok(["PASSED", "REVIEW_REQUIRED", "BLOCKED", "NOT_CONVERTED"].includes(item.state));
    assert.ok(item.exerciseId || item.notConvertedReason);
  }
});

test("cuadra la cobertura obligatoria por los nueve cursos", () => {
  const expected = {
    "1eso": 967, "2eso": 521, "3eso": 673, "4eso-a": 388, "4eso-b": 562,
    "1bach-mates": 76, "1bach-ccss": 212, "2bach-mates": 1921, "2bach-ccss": 1360
  };
  const report = readJson(path.join(runA, "reconciliation.json"));
  const classifiedRows = report.coverage.filter((row) => row.courseId !== "sin-determinar");
  const unclassifiedRow = report.coverage.find((row) => row.courseId === "sin-determinar");
  assert.equal(classifiedRows.length, 9);
  assert.equal(unclassifiedRow.originalExercises, 32);
  assert.equal(unclassifiedRow.notConverted, 32);
  for (const row of classifiedRows) {
    assert.equal(row.originalExercises, expected[row.courseId], row.courseId);
    assert.equal(row.candidates + row.notConverted, row.originalExercises);
    assert.equal(row.PASSED + row.REVIEW_REQUIRED + row.BLOCKED + row.notConverted, row.originalExercises);
  }
});

test("cada candidato mantiene identidad, trazabilidad y validación", () => {
  const candidates = readJsonl(path.join(runA, "canonical-candidates.jsonl"));
  const validations = readJsonl(path.join(runA, "validation-results.jsonl"));
  assert.equal(candidates.length, validations.length);
  assert.equal(new Set(candidates.map((item) => item.candidateId)).size, candidates.length);
  for (const { candidateId, exercise } of candidates) {
    assert.match(candidateId, /^cand-[0-9a-f-]{36}$/u);
    assert.match(exercise.identity.exerciseId, /^ex-[0-9a-f-]{36}$/u);
    assert.equal(exercise.schemaVersion, "mathup.exercise.v1");
    assert.ok(exercise.traceability.inventoryRecordIds.length > 0);
    assert.ok(validations.some((item) => item.candidateId === candidateId));
  }
});

test("una revisión mantiene exerciseId y cambia revisionId", () => {
  const namespace = "8c82e6c2-7a41-5efc-8f23-6f77319eb9e2";
  const first = canonicalIds(namespace, "legacy-exercise-42", 1);
  const edited = canonicalIds(namespace, "legacy-exercise-42", 2);
  assert.equal(first.exerciseId, edited.exerciseId);
  assert.notEqual(first.revisionId, edited.revisionId);
  assert.equal(edited.revisionId, `${edited.exerciseId}:r2`);
});

test("conserva los grupos de duplicados y posibles equivalentes de Fase 0", () => {
  const exact = readJson(path.join(runA, "duplicate-clusters.json"));
  const possible = fs.readFileSync(path.join(runA, "possible-equivalents.csv"), "utf8").trim().split(/\r?\n/u).slice(1);
  assert.equal(exact.length, 63);
  assert.equal(possible.length, 428);
});

test("mantiene PAU separado por materia y procedencia demostrable", () => {
  const candidates = readJsonl(path.join(runA, "canonical-candidates.jsonl")).map((item) => item.exercise);
  const pau = candidates.filter((item) => item.classification.stage === "PAU");
  assert.ok(pau.some((item) => item.classification.subjectId === "matematicas-ii"));
  assert.ok(pau.some((item) => item.classification.subjectId === "matematicas-ccss-ii"));
  for (const item of pau) {
    assert.equal(item.provenance.kind, "official-pau");
    assert.ok(item.provenance.pau);
  }
  const coverage = fs.readFileSync(path.join(runA, "pau-coverage-by-provenance.csv"), "utf8");
  assert.match(coverage, /Castilla-La Mancha/u);
  assert.match(coverage, /Madrid/u);
});

test("la doble ejecución reproduce todos los artefactos semánticos", () => {
  for (const name of SEMANTIC_ARTIFACTS) assert.equal(sha256(path.join(runA, name)), sha256(path.join(runB, name)), name);
  const result = readJson(path.join(root, "artifacts", "fase2", "reproducibility-result.json"));
  assert.equal(result.reproducible, true);
  assert.equal(result.equalArtifacts, SEMANTIC_ARTIFACTS.length);
});

test("el orden accidental de las entradas no altera los artefactos semánticos", () => {
  const result = readJson(path.join(root, "artifacts", "fase2", "order-invariance-result.json"));
  assert.equal(result.reproducible, true);
  assert.deepEqual(result.excludedArtifacts, ["input-manifest.json"]);
  assert.equal(result.equalArtifacts, SEMANTIC_ARTIFACTS.length - 1);
});

test("el ensayo de rollback no cambia producción", () => {
  const result = readJson(path.join(root, "artifacts", "fase2", "rollback-trial-result.json"));
  assert.equal(result.passed, true);
  assert.equal(result.trialRootRemoved, true);
  assert.equal(result.protectedFilesUnchanged, true);
  assert.equal(result.supabaseWrites, false);
});

test("los artefactos de Fase 2 no están conectados al runtime público", () => {
  for (const file of ["index.html", "app.js"]) {
    const content = fs.readFileSync(path.join(root, file), "utf8");
    assert.doesNotMatch(content, /artifacts\/fase2|fase2-import-catalog|canonical-candidates/iu, file);
  }
});

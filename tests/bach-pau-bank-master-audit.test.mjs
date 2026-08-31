import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "artifacts", "bach-pau-bank-audit");
const read = (name) => JSON.parse(fs.readFileSync(path.join(out, name), "utf8"));
const hash = (name) => crypto.createHash("sha256").update(fs.readFileSync(path.join(out, name))).digest("hex");

const master = read("master-report.json");
const topics = read("topic-census.json");
const blocks = read("block-census.json");
const slots = read("exam-position-census.json");
const statistics = read("statistics-census.json");
const nonRepeat = read("non-repeat-audit.json");
const reachability = read("reachability-audit.json");
const simulations = read("simulation-results.json");

test("la auditoría contiene los seis ámbitos y su configuración reproducible", () => {
  assert.equal(master.scopeReports.length, 6);
  assert.equal(master.metadata.auditVersion, "fase-2.5-v1");
  assert.equal(master.metadata.simulationExamsPerScope, 1000);
  assert.match(master.metadata.sourceHash, /^[a-f0-9]{64}$/);
  assert.equal(simulations.length, 6);
  simulations.forEach((row) => assert.equal(row.exams, 1000));
});

test("cada comunidad tiene 14/11 temas, 4 bloques y 5/4 posiciones", () => {
  for (const community of ["andalucia", "madrid", "clm"]) {
    assert.equal(topics.filter((row) => row.community === community && row.courseId === "2bach-mates").length, 14);
    assert.equal(topics.filter((row) => row.community === community && row.courseId === "2bach-ccss").length, 11);
    assert.equal(blocks.filter((row) => row.community === community && row.courseId === "2bach-mates").length, 4);
    assert.equal(blocks.filter((row) => row.community === community && row.courseId === "2bach-ccss").length, 4);
    assert.equal(slots.filter((row) => row.community === community && row.courseId === "2bach-mates").length, 5);
    assert.equal(slots.filter((row) => row.community === community && row.courseId === "2bach-ccss").length, 4);
  }
});

test("canónicos y apartados son métricas separadas y no negativas", () => {
  for (const row of [...topics, ...blocks, ...slots]) {
    assert.ok(Number.isInteger(row.canonicalExerciseCount) && row.canonicalExerciseCount >= 0);
    assert.ok(Number.isInteger(row.interactiveSubpartCount) && row.interactiveSubpartCount >= 0);
  }
});

test("la suma por primaryTopic cuadra o genera contradicción explícita", () => {
  for (const scope of master.scopeReports) {
    const sum = topics
      .filter((row) => row.community === scope.community && row.courseId === scope.courseId)
      .reduce((total, row) => total + row.canonicalExerciseCount, 0);
    assert.equal(sum, scope.classifiedCanonicalTotal);
    if (sum !== scope.enabledCanonicalTotal) {
      assert.ok(master.anomalies.some((row) => row.type === "CLASSIFICATION_CONTRADICTION"
        && row.community === scope.community && row.courseId === scope.courseId));
    }
  }
});

test("no repetición diferencia tema, bloque y posición", () => {
  assert.ok(nonRepeat.some((row) => row.mode === "topic"));
  assert.ok(nonRepeat.some((row) => row.mode === "block"));
  assert.ok(nonRepeat.some((row) => row.mode === "exam-position"));
  nonRepeat.forEach((row) => assert.ok(["runtime-exhaustive", "runtime-prefix-plus-static-state-machine"].includes(row.verificationMethod)));
});

test("las posiciones directas agotan su pool antes de repetir", () => {
  slots.forEach((row) => {
    assert.equal(row.firstRepeat, row.expectedFirstRepeat);
    assert.equal(row.exhaustsBeforeRepeat, true);
  });
});

test("estadística separa cinco familias y tabla por ejercicios/apartados", () => {
  assert.equal(statistics.length, 6 * 5);
  const families = new Set(statistics.map((row) => row.family));
  assert.deepEqual([...families].sort(), ["binomial", "inferencia", "normal", "probabilidad-condicional-bayes-total", "probabilidad-general"].sort());
  statistics.forEach((row) => assert.ok(row.subpartsRequiringTable >= row.exercisesRequiringTable));
});

test("alcanzabilidad y checksums están documentados", () => {
  assert.equal(reachability.length, 6);
  for (const [name, expected] of Object.entries(master.artifactChecksums)) {
    if (name === "master-report.json") continue;
    assert.equal(hash(name), expected, name);
  }
});

test("las incidencias funcionales no quedan ocultas como éxito", () => {
  assert.equal(master.status, "FASE 2.5 COMPLETADA CON INCIDENCIAS");
  assert.ok(master.anomalies.some((row) => row.type === "PREMATURE_REPEAT"));
  assert.ok(master.anomalies.some((row) => row.type === "SELECTION_IMBALANCE"));
  assert.ok(master.anomalies.some((row) => row.type === "CLASSIFICATION_CONTRADICTION"));
});


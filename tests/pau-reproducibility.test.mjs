import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const artifactRoot = join(root, "artifacts", "pau-documentary-reconciliation");

test("doble ejecución e inversión del orden son semánticamente idénticas", () => {
  const result = JSON.parse(readFileSync(join(artifactRoot, "reproducibility-summary.json"), "utf8"));
  assert.equal(result.doubleRunEqual, true);
  assert.equal(result.reverseOrderEqual, true);
  assert.equal(result.passed, true);
});

test("el manifiesto de rollback no contiene escrituras de producción", () => {
  const manifest = JSON.parse(readFileSync(join(artifactRoot, "runs", "run-a", "rollback-manifest.json"), "utf8"));
  assert.deepEqual(manifest.productionWrites, []);
  assert.equal(manifest.rollbackAction, "REMOVE_NEW_ARTIFACT_DIRECTORY_ONLY");
  assert.equal(manifest.reversible, true);
});

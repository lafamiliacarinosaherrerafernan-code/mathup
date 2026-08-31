import fs from "node:fs";
import path from "node:path";
import { sha256, stableStringify } from "../catalog/v2/canonical-entities.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const base = path.join(ROOT, "artifacts/fase2b/runs");
const runs = ["run-a", "run-b", "run-order-reversed"];
const manifests = Object.fromEntries(runs.map((run) => [run, JSON.parse(fs.readFileSync(path.join(base, run, "run-manifest.json"), "utf8"))]));
const files = manifests["run-a"].semanticFiles;
const comparisons = [];
for (const name of files) {
  const hashes = Object.fromEntries(runs.map((run) => [run, sha256(fs.readFileSync(path.join(base, run, name)))]));
  comparisons.push({ file: name, hashes, identical: new Set(Object.values(hashes)).size === 1 });
}
const result = {
  schemaVersion: "mathup.fase2b-reproducibility.v1",
  runs,
  doubleExecutionIdentical: comparisons.every((row) => row.hashes["run-a"] === row.hashes["run-b"]),
  orderInvariant: comparisons.every((row) => row.hashes["run-a"] === row.hashes["run-order-reversed"]),
  comparedSemanticFiles: files.length,
  differences: comparisons.filter((row) => !row.identical),
  aggregateDigest: sha256(comparisons.map((row) => `${row.file}:${row.hashes["run-a"]}`).join("\n"))
};
fs.mkdirSync(path.join(ROOT, "artifacts/fase2b"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "artifacts/fase2b/reproducibility-result.json"), `${stableStringify(result, 2)}\n`);
console.log(stableStringify(result, 2));
if (!result.doubleExecutionIdentical || !result.orderInvariant) process.exitCode = 1;

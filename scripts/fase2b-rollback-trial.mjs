import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { sha256, stableStringify } from "../catalog/v2/canonical-entities.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const protectedPaths = [
  "catalog/canonical-exercise.schema.json", "catalog/canonical-exercise.mjs", "catalog/validate-canonical-exercise.mjs",
  "tests/canonical-exercise-validator.test.mjs", "scripts/fase1-validate-catalog-sample.mjs",
  "artifacts/fase2/runs/run-a/reconciliation.json", "artifacts/fase2a/pau-recovery-summary.json", "index.html", "app.js"
];
const hashes = () => Object.fromEntries(protectedPaths.map((relative) => [relative, sha256(fs.readFileSync(path.join(ROOT, relative)))]));
const before = hashes();
const trialDir = fs.mkdtempSync(path.join(os.tmpdir(), "mathup-fase2b-rollback-"));
fs.mkdirSync(path.join(trialDir, "artifacts/fase2b/runs/trial"), { recursive: true });
fs.writeFileSync(path.join(trialDir, "artifacts/fase2b/runs/trial/generated.json"), "{}\n");
fs.rmSync(trialDir, { recursive: true, force: false });
const after = hashes();
const result = {
  schemaVersion: "mathup.fase2b-rollback-trial.v1", scope: "temporary isolated Fase 2B tree",
  trialDirectoryRemoved: !fs.existsSync(trialDir), protectedPaths, protectedHashesUnchanged: stableStringify(before) === stableStringify(after), before, after,
  productionWrites: 0, supabaseWrites: 0, priorArtifactWrites: 0
};
fs.mkdirSync(path.join(ROOT, "artifacts/fase2b"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "artifacts/fase2b/rollback-trial-result.json"), `${stableStringify(result, 2)}\n`);
console.log(stableStringify(result, 2));
if (!result.trialDirectoryRemoved || !result.protectedHashesUnchanged) process.exitCode = 1;

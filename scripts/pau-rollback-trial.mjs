import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { sha256, stableStringify } from "../catalog/pau-documentary/pau-document-identities.mjs";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(workspaceRoot, "artifacts", "pau-documentary-reconciliation", "runs", "run-a", "rollback-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const checks = manifest.protectedInputs.map((entry) => {
  const absolutePath = join(workspaceRoot, entry.path);
  const currentHash = sha256(readFileSync(absolutePath));
  return { ...entry, currentHash, unchanged: currentHash === entry.sha256 };
});
const result = {
  schemaVersion: "mathup.pau-documentary.rollback-trial.v1",
  action: manifest.rollbackAction,
  productionWrites: manifest.productionWrites,
  protectedInputs: checks,
  passed: manifest.productionWrites.length === 0 && checks.every((entry) => entry.unchanged)
};
writeFileSync(join(workspaceRoot, "artifacts", "pau-documentary-reconciliation", "rollback-trial.json"), `${stableStringify(result)}\n`, "utf8");
if (!result.passed) throw new Error(`El ensayo de rollback falló: ${stableStringify(result)}`);
process.stdout.write(`${stableStringify(result)}\n`);

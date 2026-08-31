import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { stableStringify } from "../catalog/pau-documentary/pau-document-identities.mjs";
import { writeRun } from "./pau-reconcile-segmentation.mjs";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const first = writeRun({ runId: "run-a" });
const second = writeRun({ runId: "run-b" });
const reversed = writeRun({ runId: "run-order-reversed", reverse: true });
const result = {
  schemaVersion: "mathup.pau-documentary.reproducibility.v1",
  runA: first.manifest.semanticHash,
  runB: second.manifest.semanticHash,
  runOrderReversed: reversed.manifest.semanticHash,
  doubleRunEqual: first.manifest.semanticHash === second.manifest.semanticHash,
  reverseOrderEqual: first.manifest.semanticHash === reversed.manifest.semanticHash,
  passed: first.manifest.semanticHash === second.manifest.semanticHash && first.manifest.semanticHash === reversed.manifest.semanticHash
};
const output = join(workspaceRoot, "artifacts", "pau-documentary-reconciliation");
mkdirSync(output, { recursive: true });
writeFileSync(join(output, "reproducibility-summary.json"), `${stableStringify(result)}\n`, "utf8");
if (!result.passed) throw new Error(`Fallo de reproducibilidad: ${stableStringify(result)}`);
process.stdout.write(`${stableStringify(result)}\n`);

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertRunInvariants,
  buildRunModel,
  sha256,
  stableStringify,
  summarizeForManifest
} from "../catalog/pau-documentary/reconcile-pau-documentary-evidence.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDirectory, "..");
const defaultPdftotext = "C:\\Program Files\\Git\\clangarm64\\bin\\pdftotext.exe";

function argument(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function writeJson(pathValue, value) {
  writeFileSync(pathValue, `${stableStringify(value)}\n`, "utf8");
}

function writeJsonLines(pathValue, values) {
  writeFileSync(pathValue, values.map((value) => stableStringify(value)).join("\n") + (values.length ? "\n" : ""), "utf8");
}

function semanticFiles() {
  return [
    "document-registry.jsonl",
    "exam-structures.jsonl",
    "document-exercises.jsonl",
    "document-subparts.jsonl",
    "reconciliation-decisions.jsonl",
    "segmentation-redirects.jsonl",
    "answer-solution-scopes.jsonl",
    "notation-differences.jsonl",
    "source-record-reconciliation.jsonl",
    "review-queue.jsonl",
    "case-1-reconciliation.json",
    "coverage-by-provenance.json",
    "summary.json",
    "rollback-manifest.json"
  ];
}

export function writeRun({ runId = "run-a", reverse = false, pdftotextPath = defaultPdftotext } = {}) {
  const outputDirectory = join(workspaceRoot, "artifacts", "pau-documentary-reconciliation", "runs", runId);
  mkdirSync(outputDirectory, { recursive: true });
  const model = buildRunModel({ workspaceRoot, pdftotextPath, reverse });
  assertRunInvariants(model);
  writeJsonLines(join(outputDirectory, "document-registry.jsonl"), model.documents);
  writeJsonLines(join(outputDirectory, "exam-structures.jsonl"), model.examStructures);
  writeJsonLines(join(outputDirectory, "document-exercises.jsonl"), model.documentExercises);
  writeJsonLines(join(outputDirectory, "document-subparts.jsonl"), model.documentSubparts);
  writeJsonLines(join(outputDirectory, "reconciliation-decisions.jsonl"), model.decisions);
  writeJsonLines(join(outputDirectory, "segmentation-redirects.jsonl"), model.redirects);
  writeJsonLines(join(outputDirectory, "answer-solution-scopes.jsonl"), model.scopes);
  writeJsonLines(join(outputDirectory, "notation-differences.jsonl"), model.notationDifferences);
  writeJsonLines(join(outputDirectory, "source-record-reconciliation.jsonl"), model.sourceReconciliation);
  writeJsonLines(join(outputDirectory, "review-queue.jsonl"), model.reviewQueue);
  writeJson(join(outputDirectory, "case-1-reconciliation.json"), model.caseOne);
  writeJson(join(outputDirectory, "coverage-by-provenance.json"), model.coverageByProvenance);
  writeJson(join(outputDirectory, "summary.json"), model.summary);
  writeJson(join(outputDirectory, "rollback-manifest.json"), model.rollbackManifest);
  writeJson(join(outputDirectory, "input-manifest.json"), {
    schemaVersion: "mathup.pau-documentary.input-manifest.v1",
    pdfs: model.documents.map((document) => ({ documentHash: document.documentHash, path: document.path, pageCount: document.pageCount })),
    protectedArtifacts: model.rollbackManifest.protectedInputs
  });
  writeJson(join(outputDirectory, "run-manifest.json"), {
    schemaVersion: "mathup.pau-documentary.run-manifest.v1",
    runId,
    reverseInputOrder: reverse,
    ...summarizeForManifest(model)
  });
  const checksumLines = semanticFiles().map((file) => `${sha256(readFileSync(join(outputDirectory, file)))}  ${file}`);
  writeFileSync(join(outputDirectory, "checksums.sha256"), `${checksumLines.join("\n")}\n`, "utf8");
  return { outputDirectory, model, manifest: summarizeForManifest(model) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const runId = argument("--run-id", "run-a");
  const reverse = process.argv.includes("--reverse");
  const pdftotextPath = argument("--pdftotext", defaultPdftotext);
  const result = writeRun({ runId, reverse, pdftotextPath });
  process.stdout.write(`${stableStringify({ runId, output: relative(workspaceRoot, result.outputDirectory).replace(/\\/g, "/"), ...result.manifest })}\n`);
}

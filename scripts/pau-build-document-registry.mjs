import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDocumentRegistry, stableStringify } from "../catalog/pau-documentary/reconcile-pau-documentary-evidence.mjs";

const pdftotextPath = "C:\\Program Files\\Git\\clangarm64\\bin\\pdftotext.exe";
const registry = buildDocumentRegistry({ pdftotextPath }).map((entry) => entry.record);
process.stdout.write(`${registry.map((record) => stableStringify(record)).join("\n")}\n`);

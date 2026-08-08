import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const report = JSON.parse(fs.readFileSync(path.join(root, "documentos", "Inventario variedad retos", "ejercicios-examenes-clasificados.json"), "utf8"));
const pendingSources = [...new Set(report.exercises
  .filter((item) => item.status === "identificado-pendiente-reconstruccion")
  .map((item) => item.source))];

const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", "node_modules", "MasMatTest", "_codex_temporal"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (/\.(?:docx?|pdf)$/i.test(entry.name)) files.push(fullPath);
  }
}
walk(path.join(root, "documentos"));

function fold(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(?:examen|simulacro|resuelto|rev|unidad|unid|und|eso|acad|academicas?)\b/g, " ")
    .replace(/\d+/g, " ")
    .replace(/[^a-z]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value) {
  return new Set(fold(value).split(" ").filter((token) => token.length >= 3));
}

function similarity(a, b) {
  const left = tokens(a);
  const right = tokens(b);
  if (!left.size || !right.size) return 0;
  const common = [...left].filter((token) => right.has(token)).length;
  return common / Math.max(left.size, right.size);
}

for (const source of pendingSources) {
  const sourceAbsolute = path.join(root, source);
  const sourceBase = path.basename(source, path.extname(source));
  const candidates = files
    .filter((candidate) => path.resolve(candidate) !== path.resolve(sourceAbsolute))
    .map((candidate) => ({
      candidate: path.relative(root, candidate).replaceAll(path.sep, "/"),
      score: similarity(sourceBase, path.basename(candidate, path.extname(candidate))),
      editable: /\.docx?$/i.test(candidate)
    }))
    .filter((item) => item.score >= 0.5)
    .sort((a, b) => Number(b.editable) - Number(a.editable) || b.score - a.score)
    .slice(0, 8);
  if (!candidates.length) continue;
  console.log(`SOURCE\t${source}`);
  for (const item of candidates) console.log(`ALT\t${item.score.toFixed(2)}\t${item.editable ? "editable" : "pdf"}\t${item.candidate}`);
}

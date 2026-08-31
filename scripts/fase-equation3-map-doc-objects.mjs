import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { parseCFB } from "../catalog/equation3-andalucia-2012/vendor/msdoc-viewer-0.5.5/core/cfb.js";
import { parseFib } from "../catalog/equation3-andalucia-2012/vendor/msdoc-viewer-0.5.5/msdoc/fib.js";
import { parseClx, extractDocumentText } from "../catalog/equation3-andalucia-2012/vendor/msdoc-viewer-0.5.5/msdoc/clx.js";
import { readChpxRuns } from "../catalog/equation3-andalucia-2012/vendor/msdoc-viewer-0.5.5/msdoc/fkp.js";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceObjectsPath = path.join(projectRoot, "artifacts/andalucia-ccssii-2012-doc/runs/run-a/document-objects.jsonl");
const outputDir = path.join(projectRoot, "artifacts/equation3-andalucia-2012/doc-object-map");
const reverse = process.argv.includes("--reverse-input");

function readJsonl(file) {
  return fs.readFileSync(file, "utf8").split(/\r?\n/u).filter(Boolean).map((line) => JSON.parse(line));
}
function sha256(bytes) { return crypto.createHash("sha256").update(bytes).digest("hex"); }
function rel(file) { return path.relative(projectRoot, file).split(path.sep).join("/"); }
function writeJsonl(file, rows) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, `${rows.map((row) => JSON.stringify(row)).join("\n")}\n`, "utf8"); }

const sourceObjects = readJsonl(sourceObjectsPath);
const grouped = Map.groupBy(sourceObjects, (row) => row.sourceDocumentSha256);
const documentEntries = [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
if (reverse) documentEntries.reverse();
const mappings = [];
const documentAudit = [];

for (const [documentSha256, objectsUnsorted] of documentEntries) {
  const objects = [...objectsUnsorted].sort((a, b) => a.rangeStart - b.rangeStart || a.index - b.index);
  const sourcePath = path.join(projectRoot, objects[0].sourcePath);
  const fileBytes = fs.readFileSync(sourcePath);
  if (sha256(fileBytes) !== documentSha256) throw new Error(`DOC hash mismatch: ${objects[0].sourcePath}`);
  const cfb = parseCFB(new Uint8Array(fileBytes));
  const wordBytes = new Uint8Array(cfb.getStream("/WordDocument"));
  const fib = parseFib(wordBytes);
  const tableBytes = new Uint8Array(cfb.getStream(fib.base.fWhichTblStm ? "/1Table" : "/0Table"));
  const clx = parseClx(tableBytes, fib.fibRgFcLcb);
  const documentText = extractDocumentText(wordBytes, clx);
  const chpxRuns = readChpxRuns(wordBytes, tableBytes, fib, clx);
  const fields = [];
  for (let cp = 0; cp < documentText.length; cp += 1) {
    if (documentText.charCodeAt(cp) !== 0x13) continue;
    const separatorCp = documentText.indexOf("\x14", cp + 1);
    const endCp = documentText.indexOf("\x15", separatorCp + 1);
    if (separatorCp < 0 || endCp < 0) continue;
    const instruction = documentText.slice(cp + 1, separatorCp).replace(/[\x00-\x1f]+/gu, " ").trim();
    if (!/EMBED\s+Equation\.3/iu.test(instruction)) continue;
    const coveringRuns = chpxRuns.filter((run) => run.cpStart <= separatorCp && run.cpEnd > separatorCp);
    const locations = coveringRuns.flatMap((run) => run.properties).filter((property) => property.name === "pictureOffset").map((property) => Number(property.value));
    if (locations.length !== 1 || !Number.isSafeInteger(locations[0])) throw new Error(`Non-unique sprmCPicLocation at ${objects[0].sourcePath}:${cp}`);
    const oleStorageRoot = `ObjectPool/_${locations[0]}`;
    if (!cfb.getEntry(`/${oleStorageRoot}`) || !cfb.getStream(`/${oleStorageRoot}/Equation Native`)) throw new Error(`Missing OLE storage ${oleStorageRoot}`);
    fields.push({ fieldStartCp: cp, fieldSeparatorCp: separatorCp, fieldEndCp: endCp + 1, fieldInstruction: instruction, sprmCPicLocation: locations[0], oleStorageRoot });
    cp = endCp;
  }
  if (fields.length !== objects.length) throw new Error(`Field/object count mismatch for ${objects[0].sourcePath}: ${fields.length}/${objects.length}`);
  const usedStorages = new Set();
  for (const object of objects) {
    const field = fields.find((candidate) => candidate.fieldStartCp === object.rangeStart);
    if (!field) throw new Error(`No Equation.3 field at prior rangeStart ${object.rangeStart} for ${object.objectId}`);
    if (!usedStorages.add(field.oleStorageRoot)) throw new Error(`Duplicate OLE mapping ${field.oleStorageRoot}`);
    mappings.push({
      schemaVersion: "mathup.equation3-doc-object-map.v1",
      objectId: object.objectId,
      documentId: object.documentId,
      sourceDocumentSha256: documentSha256,
      sourcePath: object.sourcePath,
      priorObjectIndex: object.index,
      priorRangeStart: object.rangeStart,
      priorRangeEnd: object.rangeEnd,
      emfPath: object.emfPath,
      emfSha256: object.emfSha256,
      pngPath: object.pngPreviewPath,
      pngSha256: object.pngPreviewSha256,
      ...field,
      mappingEvidence: "MS-DOC field separator CHPX sprmCPicLocation (0x6A03)",
    });
  }
  documentAudit.push({ documentId: objects[0].documentId, sourcePath: objects[0].sourcePath, sourceDocumentSha256: documentSha256, equationFields: fields.length, uniqueOleStorages: usedStorages.size, allRangesMatched: true });
}

const stableRows = [...mappings].sort((a, b) => a.objectId.localeCompare(b.objectId));
const registryPath = path.join(outputDir, "doc-object-ole-map.jsonl");
writeJsonl(registryPath, stableRows);
const semanticHash = sha256(Buffer.from(stableRows.map((row) => JSON.stringify(row)).join("\n")));
const summary = {
  schemaVersion: "mathup.equation3-doc-object-map-summary.v1",
  documents: documentAudit.length,
  objects: stableRows.length,
  uniqueObjectIds: new Set(stableRows.map((row) => row.objectId)).size,
  uniqueOleStoragesPerDocument: documentAudit.every((row) => row.equationFields === row.uniqueOleStorages),
  allRangesMatched: documentAudit.every((row) => row.allRangesMatched),
  semanticHash,
  registryPath: rel(registryPath),
  documentsAudit: documentAudit.sort((a, b) => a.documentId.localeCompare(b.documentId)),
};
fs.writeFileSync(path.join(outputDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(JSON.stringify(summary, null, 2));

import { buildDocumentRegistry, extractExamStructure, stableStringify } from "../catalog/pau-documentary/reconcile-pau-documentary-evidence.mjs";

const pdftotextPath = "C:\\Program Files\\Git\\clangarm64\\bin\\pdftotext.exe";
const structures = buildDocumentRegistry({ pdftotextPath }).map((entry) => extractExamStructure(entry));
process.stdout.write(`${stableStringify({
  documents: structures.length,
  questions: structures.reduce((sum, item) => sum + item.structure.questions.length, 0),
  exercises: structures.reduce((sum, item) => sum + item.exercises.length, 0),
  subparts: structures.reduce((sum, item) => sum + item.subparts.length, 0)
})}\n`);

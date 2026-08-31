import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation');
const audits = fs.readFileSync(path.join(dir, 'document-reconciliation-audit.jsonl'), 'utf8').trim().split(/\r?\n/).map(JSON.parse)
  .filter((row) => row.reconciliationState === 'NEW_USER_DOCUMENT_RECONCILIATION_REQUIRED');
const inventory = new Map(fs.readFileSync(path.join(dir, 'user-document-inventory.jsonl'), 'utf8').trim().split(/\r?\n/).map(JSON.parse).map((row) => [row.sha256, row]));

const clean = (value) => value
  .replace(/\f/g, '\n')
  .replace(/\r/g, '')
  .replace(/[ \t]+\n/g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

function optionSlices(text) {
  const matches = [...text.matchAll(/(?:^|\n)\s*Opci.{0,3}n\s+([AB])\s*(?=\n)/gi)];
  if (matches.length < 2) return [];
  return matches.slice(0, 2).map((match, index) => ({
    option: match[1].toUpperCase(),
    text: text.slice(match.index + match[0].length, matches[index + 1]?.index ?? text.length)
  }));
}

function exerciseSlices(optionText) {
  const matches = [...optionText.matchAll(/(?:^|\n)\s*Ejercicio\s+(\d+)\s*(?:\.\s*[-–]?|[-–]\.)?\s*(?=\n|\.|\(|\[|[A-ZÁÉÍÓÚ])/gi)];
  return matches.map((match, index) => ({
    exerciseNumber: Number(match[1]),
    statement: clean(optionText.slice(match.index + match[0].length, matches[index + 1]?.index ?? optionText.length))
  }));
}

const records = [];
for (const audit of audits) {
  const inv = inventory.get(audit.sha256);
  const cachePath = path.join(dir, '.text-cache', `${audit.sha256}.txt`);
  const raw = fs.existsSync(cachePath) ? fs.readFileSync(cachePath, 'utf8') : '';
  const examText = raw.split(/CRITERIOS\s+ESPEC[ÍI]FICOS|CRITERIOS\s+GENERALES/i)[0];
  const options = optionSlices(examText);
  const segmented = options.flatMap(({ option, text }) => exerciseSlices(text).map((exercise) => ({ option, ...exercise })));
  const usable = segmented.length === audit.detectedExercises;
  if (usable) for (const exercise of segmented) records.push({
    schemaVersion: 'mathup.andalucia.user-missing-exercise-segment.v1',
    fileName: audit.fileName,
    documentHash: audit.sha256,
    subject: audit.subject,
    year: audit.year,
    sitting: audit.sitting,
    reserveNumber: audit.reserveNumber,
    option: exercise.option,
    exerciseNumber: exercise.exerciseNumber,
    statement: exercise.statement,
    sourceRelativePath: inv?.relativePath ?? null,
    sourcePriority: 'USER_SUPPLIED_PRIMARY',
    extraction: 'PDF_TEXT_LAYER_OPTION_EXERCISE_BOUNDARIES',
    sourceMutated: false
  });
  else records.push({
    schemaVersion: 'mathup.andalucia.user-missing-exercise-segment.v1',
    fileName: audit.fileName,
    documentHash: audit.sha256,
    subject: audit.subject,
    year: audit.year,
    sitting: audit.sitting,
    reserveNumber: audit.reserveNumber,
    expectedExercises: audit.detectedExercises,
    detectedSegments: segmented.length,
    sourceRelativePath: inv?.relativePath ?? null,
    reviewStatus: 'VISUAL_SEGMENTATION_REQUIRED',
    sourceMutated: false
  });
}

const out = path.join(dir, 'missing-user-exercise-segments.jsonl');
fs.writeFileSync(out, records.map((record) => JSON.stringify(record)).join('\n') + '\n', 'utf8');
const exercises = records.filter((record) => record.statement);
const blocked = records.filter((record) => !record.statement);
console.log(JSON.stringify({ documents: audits.length, segmentedExercises: exercises.length, documentsRequiringVisualSegmentation: blocked.length, blocked }, null, 2));

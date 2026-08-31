import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtimePath = path.join(root, 'data', 'andalucia-pau-runtime.js');
const referencePath = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation', 'solution-reference-blocks.jsonl');
const outputPath = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation', 'semantic-reference-runtime-reconciliation.jsonl');

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(runtimePath, 'utf8'), sandbox, { filename: runtimePath });
const runtime = sandbox.window.ANDALUCIA_PAU_RUNTIME;

const references = fs.readFileSync(referencePath, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const subjectId = (subject) => subject.includes('CCSS') ? '2_bach_ccss_ii' : '2_bach_mates_ii';
const words = (value) => new Set(String(value ?? '')
  .normalize('NFD').replace(/\p{Diacritic}/gu, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .split(/\s+/)
  .filter((word) => word.length >= 3 && !['para', 'que', 'del', 'las', 'los', 'una', 'con', 'por', 'sea', 'segun', 'halle', 'calcule', 'determine'].includes(word)));

function score(left, right) {
  const a = words(left);
  const b = words(right);
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const word of a) if (b.has(word)) intersection += 1;
  return (2 * intersection) / (a.size + b.size);
}

const rows = references.map((reference) => {
  const candidates = runtime.exercises
    .filter((record) => record.subject === subjectId(reference.subject) && record.year === reference.year)
    .map((record) => ({
      exerciseId: record.exerciseId,
      sitting: record.sitting,
      questionKey: record.questionKey,
      alternativeKey: record.alternativeKey ?? null,
      sourceLiteral: record.sourceLiteral,
      score: score(reference.statement, record.sourceLiteral)
    }))
    .sort((a, b) => b.score - a.score);
  const best = candidates[0] ?? null;
  const second = candidates[1] ?? null;
  return {
    schemaVersion: 'mathup.andalucia.semantic-reference-runtime-reconciliation.v1',
    referenceId: reference.referenceId,
    reference: {
      subject: reference.subject,
      year: reference.year,
      sitting: reference.sitting,
      reserveNumber: reference.reserveNumber,
      exerciseNumber: reference.exerciseNumber,
      option: reference.option,
      topic: reference.topic
    },
    best,
    secondScore: second?.score ?? null,
    margin: best && second ? best.score - second.score : null,
    classification: best?.score >= 0.82 && (!second || best.score - second.score >= 0.08)
      ? 'HIGH_CONFIDENCE_SAME_EXERCISE'
      : best?.score >= 0.65
        ? 'HUMAN_REVIEW_REQUIRED'
        : 'NO_RELIABLE_MATCH'
  };
});

fs.writeFileSync(outputPath, rows.map((row) => JSON.stringify(row)).join('\n') + '\n', 'utf8');
const counts = Object.groupBy(rows, (row) => row.classification);
console.log(JSON.stringify({
  references: rows.length,
  classifications: Object.fromEntries(Object.entries(counts).map(([key, value]) => [key, value.length])),
  exactIdentityCandidates: rows.filter((row) => row.best && row.best.alternativeKey === row.reference.option && row.best.score >= 0.82).length,
  output: path.relative(root, outputPath)
}, null, 2));

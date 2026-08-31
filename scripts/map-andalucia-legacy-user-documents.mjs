import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifact = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation');
const readJsonl = (name) => fs.readFileSync(path.join(artifact, name), 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const refs = readJsonl('solution-reference-blocks.jsonl').filter((r) => r.year === 2008);
const segments = readJsonl('missing-user-exercise-segments.jsonl').filter((r) => r.year === 2008);

const norm = (value) => String(value || '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ').split(/\s+/).filter((word) => word.length > 3);
const similarity = (a, b) => {
  const aa = new Set(norm(a)); const bb = new Set(norm(b));
  const common = [...aa].filter((word) => bb.has(word)).length;
  return common / Math.max(1, Math.min(aa.size, bb.size));
};
const category = (row) => row.sitting === 'Reserva' ? `R${row.reserveNumber}` : row.sitting;
const key = (row) => `${row.subject}|${category(row)}`;
const refGroups = Map.groupBy(refs, key);
const docGroups = Map.groupBy(segments, (row) => `${row.subject}|${row.fileName}`);

for (const [docKey, rows] of docGroups) {
  const subject = rows[0].subject;
  const candidates = [...refGroups].filter(([groupKey]) => groupKey.startsWith(`${subject}|`)).map(([groupKey, groupRows]) => {
    const scores = rows.map((row) => Math.max(...groupRows.map((ref) => similarity(row.statement, ref.statement))));
    return { category: groupKey.split('|')[1], score: scores.reduce((a, b) => a + b, 0) / scores.length, scores };
  }).sort((a, b) => b.score - a.score);
  console.log(JSON.stringify({ fileName: rows[0].fileName, subject, candidates: candidates.slice(0, 3) }));
}

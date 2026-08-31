import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { additionsLegacy } from '../data/andalucia-pau-additions-legacy.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const findings = [];
const add = (severity, code, record, part, excerpt) => findings.push({ severity, code, exerciseId: record.exerciseId, documentHash: record.documentHash, year: record.year, sitting: record.sitting, reserveNumber: record.reserveNumber, option: record.alternativeKey, exerciseNumber: record.questionKey, partId: part?.id || null, excerpt: String(excerpt || '').slice(0, 500) });
for (const record of additionsLegacy) {
  if (/\b(?:UNIVERSIDADES DE ANDALUC[IÍ]A|Instrucciones:)\b/i.test(record.officialPromptLiteral)) add('warning', 'TRAILING_EXAM_HEADER', record, null, record.officialPromptLiteral);
  if (/=\s*\.|\(\s*\)|\b(?:calcula|resuelve|sea)\s*$/i.test(record.officialPromptLiteral)) add('blocker', 'PROMPT_FORMULA_LOSS', record, null, record.officialPromptLiteral);
  for (const part of record.parts) {
    const text = [part.text, part.semanticAnswer, ...part.solutionSteps].join(' ');
    if (/=\s*;|⇒\s*⇒|\(\s*\)|\b(?:x|y|z|a|b|m|n|p|q|λ)\s*=\s*(?:;|,|\.|$)/i.test(text)) add('blocker', 'SOLUTION_FORMULA_LOSS', record, part, text);
    if (part.solutionSteps.length < 4) add('blocker', 'PEDAGOGICAL_STEPS_SHORT', record, part, text);
    if (part.distractors.length !== 3 || new Set([part.semanticAnswer, ...part.distractors]).size !== 4) add('blocker', 'CHOICE_CARDINALITY', record, part, text);
    if (/[\uE000-\uF8FF]/u.test(text)) add('blocker', 'PRIVATE_FONT_GLYPH', record, part, text);
  }
}
const out = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation', 'legacy-quality-findings.jsonl');
fs.writeFileSync(out, findings.map(JSON.stringify).join('\n') + (findings.length ? '\n' : ''), 'utf8');
const byCode = Object.fromEntries([...Map.groupBy(findings, (row) => `${row.severity}:${row.code}`)].map(([key, rows]) => [key, rows.length]));
console.log(JSON.stringify({ exercises: additionsLegacy.length, parts: additionsLegacy.flatMap((row) => row.parts).length, findings: findings.length, byCode, affectedExercises: new Set(findings.map((row) => row.exerciseId)).size }, null, 2));
if (findings.some((row) => row.severity === 'blocker')) process.exitCode = 1;

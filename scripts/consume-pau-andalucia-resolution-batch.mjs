import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { sameRational } from './audit-pau-andalucia-resolution.mjs';

const root = path.resolve(import.meta.dirname, '..');
const queuePath = path.join(root, 'artifacts', 'pau-andalucia-mass-processing', 'resolution-queue.jsonl');
const stateDir = path.join(root, 'artifacts', 'pau-andalucia-resolution');
const batchesDir = path.join(stateDir, 'batches');
const skillPath = path.join(root, '.agents', 'skills', 'solucion-de-ejercicios', 'SKILL.md');
const expectedSkillHash = '18d4ead04a7159af4882134535a7b15632a430118b0c7f6b24ef45806aab9444';

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  return value;
}

function stringify(value) { return JSON.stringify(stable(value)); }
function sha(value) { return crypto.createHash('sha256').update(typeof value === 'string' || Buffer.isBuffer(value) ? value : stringify(value)).digest('hex'); }
function readJsonl(file) { return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse); }
function writeJson(file, value) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`); }
function writeJsonl(file, rows) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, `${rows.map(stringify).join('\n')}\n`); }

const forbidden = /\b(?:undefined|null)\b|\\\(|\\\)|\\(?:frac|sqrt|begin|end|left|right|vec|int|sum|lim)\b/i;

function normalizedChoice(value) {
  return stringify(value).normalize('NFKC').replace(/\s+/g, '').replace(/−/g, '-').replace(/,/g, '.').toLowerCase();
}

function validatePart(part) {
  const errors = [];
  for (const field of ['partId', 'prompt', 'answer', 'verification', 'solutionSteps', 'finalAnswer']) {
    if (part[field] === undefined || part[field] === null || part[field] === '') errors.push(`MISSING_${field.toUpperCase()}`);
  }
  if (!part.verification?.verified || !part.verification?.method || !part.verification?.detail) errors.push('INDEPENDENT_VERIFICATION_REQUIRED');
  if (!Array.isArray(part.solutionSteps) || part.solutionSteps.length < 2 || part.solutionSteps.some((step) => !step.explanation || step.math === undefined)) errors.push('PEDAGOGICAL_STEPS_REQUIRED');
  if (!Array.isArray(part.distractors) || part.distractors.length !== 3) errors.push('THREE_DISTRACTORS_REQUIRED');
  const choices = [part.answer, ...(part.distractors || [])].map(normalizedChoice);
  if (choices.length !== 4 || new Set(choices).size !== 4) errors.push('CHOICES_NOT_UNIQUE');
  const rawChoices = [part.answer, ...(part.distractors || [])];
  for (let i=0;i<rawChoices.length;i++) for(let j=i+1;j<rawChoices.length;j++) {
    if(sameRational(rawChoices[i],rawChoices[j])===true) errors.push('RATIONAL_CHOICES_EQUIVALENT');
  }
  if (normalizedChoice(part.answer) !== normalizedChoice(part.finalAnswer)) errors.push('ANSWER_FINAL_MISMATCH');
  if (forbidden.test(stringify({ prompt: part.prompt, answer: part.answer, distractors: part.distractors, solutionSteps: part.solutionSteps, finalAnswer: part.finalAnswer }))) errors.push('VISIBLE_INTERNAL_SYNTAX');
  if (!part.distractorEvidence || part.distractorEvidence.length !== 3) errors.push('DISTRACTOR_EVIDENCE_REQUIRED');
  return errors;
}

const batchFile = process.argv[2];
if (!batchFile) throw new Error('Uso: node scripts/consume-pau-andalucia-resolution-batch.mjs <batch.json>');
const absoluteBatch = path.resolve(root, batchFile);
const batch = JSON.parse(fs.readFileSync(absoluteBatch, 'utf8'));
const queue = readJsonl(queuePath);
const queueById = new Map(queue.map((row, index) => [row.exerciseId, { ...row, queueIndex: index }]));
const actualSkillHash = sha(fs.readFileSync(skillPath));
if (actualSkillHash !== expectedSkillHash || batch.solutionSkillContractHash !== expectedSkillHash) throw new Error('El hash de la skill validada no coincide');

const errors = [];
const seen = new Set();
for (const record of batch.records || []) {
  const queueRecord = queueById.get(record.exerciseId);
  if (!queueRecord) errors.push({ exerciseId: record.exerciseId, code: 'NOT_IN_RESOLUTION_QUEUE' });
  if (seen.has(record.exerciseId)) errors.push({ exerciseId: record.exerciseId, code: 'DUPLICATE_IN_BATCH' });
  seen.add(record.exerciseId);
  if (queueRecord && queueRecord.promptHash !== record.promptHash) errors.push({ exerciseId: record.exerciseId, code: 'PROMPT_HASH_MISMATCH' });
  if (queueRecord && (record.subject !== queueRecord.subject || record.year !== queueRecord.year)) errors.push({ exerciseId: record.exerciseId, code: 'GENERATED_PROVENANCE_MISMATCH' });
  if (!Array.isArray(record.parts) || record.parts.length === 0) errors.push({ exerciseId: record.exerciseId, code: 'PARTS_REQUIRED' });
  for (const part of record.parts || []) for (const code of validatePart(part)) errors.push({ exerciseId: record.exerciseId, partId: part.partId, code });
  if (record.publicationState !== 'PARALLEL_VALIDATED_NOT_PUBLISHED') errors.push({ exerciseId: record.exerciseId, code: 'PUBLICATION_STATE_INVALID' });
}
for (const record of batch.blockedRecords || []) {
  const queueRecord = queueById.get(record.exerciseId);
  if (!queueRecord) errors.push({ exerciseId: record.exerciseId, code: 'NOT_IN_RESOLUTION_QUEUE' });
  if (seen.has(record.exerciseId)) errors.push({ exerciseId: record.exerciseId, code: 'DUPLICATE_IN_BATCH' });
  seen.add(record.exerciseId);
  if (queueRecord && queueRecord.promptHash !== record.promptHash) errors.push({ exerciseId: record.exerciseId, code: 'PROMPT_HASH_MISMATCH' });
  if (!Array.isArray(record.blockerCodes) || record.blockerCodes.length === 0) errors.push({ exerciseId: record.exerciseId, code: 'BLOCKER_CODE_REQUIRED' });
  if (!record.blockerEvidence || !record.sourceLiteral) errors.push({ exerciseId: record.exerciseId, code: 'BLOCKER_EVIDENCE_REQUIRED' });
  if (record.blockerCodes?.some((code) => ['NO_PREEXISTING_ANSWER', 'NO_PREEXISTING_SOLUTION', 'NO_PREEXISTING_DISTRACTORS'].includes(code))) {
    errors.push({ exerciseId: record.exerciseId, code: 'ABSENCE_OF_DERIVED_CONTENT_IS_NOT_A_BLOCKER' });
  }
}
if (errors.length) throw new Error(`Lote inválido:\n${JSON.stringify(errors, null, 2)}`);

const outputRows = batch.records.map((record) => ({
  ...record,
  queueIndex: queueById.get(record.exerciseId).queueIndex,
  resolutionState: 'SOLUTION_GENERATED_STRUCTURALLY_CHECKED',
  validationScope: 'STRUCTURE_ONLY_NOT_MATHEMATICAL_OR_VISUAL_CERTIFICATION',
  generatedAnswer: true,
  generatedDistractors: true,
  generatedSolution: true,
  recordHash: sha(record)
})).sort((a, b) => a.queueIndex - b.queueIndex);
const blockedRows = (batch.blockedRecords || []).map((record) => ({
  ...record,
  queueIndex: queueById.get(record.exerciseId).queueIndex,
  resolutionState: 'BLOCKED',
  generatedAnswer: false,
  generatedDistractors: false,
  generatedSolution: false,
  publicationState: 'PARALLEL_BLOCKED_NOT_PUBLISHED',
  recordHash: sha(record)
})).sort((a, b) => a.queueIndex - b.queueIndex);
const batchRows = [...outputRows, ...blockedRows].sort((a, b) => a.queueIndex - b.queueIndex);
const summary = {
  schemaVersion: 'mathup.pau-andalucia-resolution-batch-summary.v1',
  batchId: batch.batchId,
  solutionSkillContractHash: actualSkillHash,
  queueHash: sha(fs.readFileSync(queuePath)),
  processed: batchRows.length,
  resolved: outputRows.length,
  enabled: 0,
  awaitingPublicationGates: outputRows.length,
  blocked: blockedRows.length,
  answersGenerated: outputRows.reduce((sum, row) => sum + row.parts.length, 0),
  distractorsGenerated: outputRows.reduce((sum, row) => sum + row.parts.length * 3, 0),
  solutionsGenerated: outputRows.reduce((sum, row) => sum + row.parts.length, 0),
  errors: 0,
  firstQueueIndex: Math.min(...batchRows.map((row) => row.queueIndex)),
  lastQueueIndex: Math.max(...batchRows.map((row) => row.queueIndex)),
  semanticHash: sha(batchRows)
};
const out = path.join(batchesDir, batch.batchId);
writeJsonl(path.join(out, 'resolved-exercises.jsonl'), outputRows);
writeJsonl(path.join(out, 'blocked-exercises.jsonl'), blockedRows);
writeJson(path.join(out, 'summary.json'), summary);
if (batch.executedChecks) writeJson(path.join(out, 'executed-checks.json'), batch.executedChecks);

const completed = fs.existsSync(path.join(stateDir, 'completed-exercises.jsonl')) ? readJsonl(path.join(stateDir, 'completed-exercises.jsonl')) : [];
const blocked = fs.existsSync(path.join(stateDir, 'blocked-exercises.jsonl')) ? readJsonl(path.join(stateDir, 'blocked-exercises.jsonl')) : [];
const merged = new Map(completed.map((row) => [row.exerciseId, row]));
for (const row of outputRows) merged.set(row.exerciseId, row);
for (const row of blockedRows) merged.delete(row.exerciseId);
const all = [...merged.values()].sort((a, b) => a.queueIndex - b.queueIndex);
const mergedBlocked = new Map(blocked.map((row) => [row.exerciseId, row]));
for (const row of blockedRows) mergedBlocked.set(row.exerciseId, row);
for (const row of outputRows) mergedBlocked.delete(row.exerciseId);
const allBlocked = [...mergedBlocked.values()].sort((a, b) => a.queueIndex - b.queueIndex);
const allProcessed = [...all, ...allBlocked].sort((a, b) => a.queueIndex - b.queueIndex);
writeJsonl(path.join(stateDir, 'completed-exercises.jsonl'), all);
writeJsonl(path.join(stateDir, 'blocked-exercises.jsonl'), allBlocked);
writeJson(path.join(stateDir, 'progress.json'), {
  schemaVersion: 'mathup.pau-andalucia-resolution-progress.v1',
  queueInitial: queue.length,
  processed: allProcessed.length,
  resolved: all.length,
  enabled: 0,
  awaitingPublicationGates: all.length,
  validationScope: 'STRUCTURE_ONLY_NOT_MATHEMATICAL_OR_VISUAL_CERTIFICATION',
  blocked: allBlocked.length,
  pending: queue.length - allProcessed.length,
  lastCompletedQueueIndex: allProcessed.at(-1)?.queueIndex ?? -1,
  completedSemanticHash: sha(all),
  blockedSemanticHash: sha(allBlocked),
  solutionSkillContractHash: actualSkillHash
});
console.log(JSON.stringify(summary, null, 2));

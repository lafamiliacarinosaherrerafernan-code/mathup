import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const SCRIPTS = path.join(ROOT, 'scripts');
const COMPLETED = path.join(ROOT, 'artifacts', 'pau-andalucia-resolution', 'completed-exercises.jsonl');

const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const stable = value => {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])]));
  }
  return value;
};
const hashParts = record => sha(JSON.stringify(stable(record.parts ?? [])));
const readJsonl = file => fs.readFileSync(file, 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);

const files = fs.readdirSync(SCRIPTS)
  .filter(name => /^resolve-andalucia-.*\.mjs$/.test(name))
  .sort();

const completed = readJsonl(COMPLETED);
const completedByHash = new Map();
for (const record of completed) {
  const key = hashParts(record);
  const bucket = completedByHash.get(key) ?? [];
  bucket.push(record);
  completedByHash.set(key, bucket);
}

const reconstructed = [];
const moduleResults = [];
for (const name of files) {
  const source = fs.readFileSync(path.join(SCRIPTS, name), 'utf8');
  const localBuilders = [...source.matchAll(/export\s+function\s+(build[A-Za-z0-9_]*)\s*\(/g)].map(match => match[1]);
  if (!localBuilders.length) {
    moduleResults.push({ module: name, status: 'NO_LOCAL_BUILDER' });
    continue;
  }
  let mod;
  try {
    mod = await import(pathToFileURL(path.join(SCRIPTS, name)).href);
  } catch (error) {
    moduleResults.push({ module: name, status: 'IMPORT_ERROR', error: error.message });
    continue;
  }
  let accepted = null;
  const errors = [];
  for (const builderName of localBuilders) {
    try {
      const result = mod[builderName]();
      const records = result?.batch?.records;
      if (Array.isArray(records)) {
        accepted = { builderName, records };
        break;
      }
    } catch (error) {
      errors.push({ builderName, error: error.message });
    }
  }
  if (!accepted) {
    moduleResults.push({ module: name, status: 'NO_BATCH_RESULT', errors });
    continue;
  }
  for (const record of accepted.records) reconstructed.push({ ...record, _builderModule: name, _builderName: accepted.builderName });
  moduleResults.push({ module: name, status: 'RECONSTRUCTED', builder: accepted.builderName, records: accepted.records.length });
}

const matchedCompleted = new Set();
const reconstructionConflicts = [];
for (const record of reconstructed) {
  const candidates = completedByHash.get(hashParts(record)) ?? [];
  const exactId = candidates.find(item => item.exerciseId === record.exerciseId);
  const target = exactId ?? (candidates.length === 1 ? candidates[0] : null);
  if (target) matchedCompleted.add(target.exerciseId);
  else reconstructionConflicts.push({
    exerciseId: record.exerciseId,
    builderModule: record._builderModule,
    builderName: record._builderName,
    partHash: hashParts(record),
    semanticHashCandidates: candidates.map(item => item.exerciseId),
  });
}

const missing = completed
  .filter(record => !matchedCompleted.has(record.exerciseId))
  .map(record => ({
    exerciseId: record.exerciseId,
    subject: record.subject,
    year: record.officialSource?.year ?? record.year ?? null,
    partHash: hashParts(record),
    partCount: record.parts?.length ?? 0,
  }));

const summary = {
  modulesDiscovered: files.length,
  modulesReconstructed: moduleResults.filter(item => item.status === 'RECONSTRUCTED').length,
  reconstructedRows: reconstructed.length,
  reconstructedUniqueExerciseIds: new Set(reconstructed.map(item => item.exerciseId)).size,
  completedRows: completed.length,
  matchedCompletedExerciseIds: matchedCompleted.size,
  missingCompletedExerciseIds: missing.length,
  reconstructionConflicts: reconstructionConflicts.length,
  moduleStatus: Object.groupBy(moduleResults, item => item.status),
};

console.log(JSON.stringify({
  summary,
  missing,
  reconstructionConflicts,
  modulesNotReconstructed: moduleResults.filter(item => item.status !== 'RECONSTRUCTED'),
}, null, 2));

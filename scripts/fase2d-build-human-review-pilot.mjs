import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifactRoot = path.join(root, 'artifacts', 'fase2d-human-review');
const queuePath = path.join(artifactRoot, 'review-queue.jsonl');
const manifestPath = path.join(artifactRoot, 'review-manifest.json');
const outputRoot = path.join(artifactRoot, 'pilots');
const outputPath = path.join(outputRoot, 'pilot-24.json');

const stable = (value) => JSON.stringify(value, (_key, item) => item && typeof item === 'object' && !Array.isArray(item)
  ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b))) : item);
const digest = (value) => createHash('sha256').update(typeof value === 'string' ? value : stable(value)).digest('hex');
const queue = fs.readFileSync(queuePath, 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const queueManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const sensitiveFamilies = new Set(['defined-integral', 'indefinite-integral', 'limit', 'matrix', 'determinant', 'system', 'vector', 'piecewise', 'complex-fraction', 'multiline']);
const familyTargets = ['fraction', 'complex-fraction', 'power-root', 'system', 'matrix', 'determinant', 'limit', 'derivative', 'defined-integral', 'indefinite-integral', 'vector', 'piecewise', 'multiline', 'probability-combinatorics'];
const minimums = {
  'scope:ESO': 5, 'scope:1BACH': 4, 'scope:2BACH_MATES': 5, 'scope:2BACH_CCSS': 5,
  'type:statement': 8, 'type:answer': 5, 'type:solution': 6,
  'community:Castilla-La Mancha': 4, 'community:Madrid': 4,
  'priority:P1': 16, 'profile:SIMPLE': 3, 'profile:STEP_SOLUTION': 2,
  ...Object.fromEntries(familyTargets.map((family) => [`family:${family}`, 1])),
};

function tokensFor(reviewCase) {
  const entity = reviewCase.entity;
  const tokens = new Set([`type:${entity.entityType}`, `priority:${entity.priority}`, `community:${entity.community}`]);
  if (entity.courseId.includes('eso')) tokens.add('scope:ESO');
  if (entity.courseId.startsWith('1bach')) tokens.add('scope:1BACH');
  if (entity.courseId === '2bach-mates') tokens.add('scope:2BACH_MATES');
  if (entity.courseId === '2bach-ccss') tokens.add('scope:2BACH_CCSS');
  for (const family of entity.families) tokens.add(`family:${family}`);
  if (entity.entityType !== 'solution' && entity.priority !== 'P1' && !entity.families.some((family) => sensitiveFamilies.has(family))) tokens.add('profile:SIMPLE');
  if (entity.entityType === 'solution' && /Resoluci[oó]n:|Resultado final:/i.test(entity.literal)) tokens.add('profile:STEP_SOLUTION');
  return tokens;
}

const tokenMap = new Map(queue.map((reviewCase) => [reviewCase.visualEntityId, tokensFor(reviewCase)]));
const selected = [];
const counts = new Map(Object.keys(minimums).map((token) => [token, 0]));
const seenCourses = new Set();
const seenTopics = new Set();

function score(reviewCase) {
  const tokens = tokenMap.get(reviewCase.visualEntityId);
  let value = 0;
  for (const [token, minimum] of Object.entries(minimums)) {
    if (tokens.has(token) && counts.get(token) < minimum) {
      if (token.startsWith('family:')) value += 120;
      else if (token.startsWith('scope:')) value += 32;
      else if (token.startsWith('type:')) value += 25;
      else if (token.startsWith('community:')) value += 18;
      else value += 12;
    }
  }
  if (!seenCourses.has(reviewCase.entity.courseId)) value += 8;
  if (!seenTopics.has(reviewCase.entity.topicId)) value += 3;
  if (reviewCase.entity.priority === 'P1') value += 2;
  return value;
}

while (selected.length < 24) {
  const available = queue.filter((reviewCase) => !selected.includes(reviewCase));
  available.sort((a, b) => score(b) - score(a)
    || a.queueIndex - b.queueIndex
    || a.visualEntityId.localeCompare(b.visualEntityId));
  const chosen = available[0];
  if (!chosen) throw new Error('No hay suficientes casos para construir el piloto.');
  selected.push(chosen);
  seenCourses.add(chosen.entity.courseId);
  seenTopics.add(chosen.entity.topicId);
  for (const token of tokenMap.get(chosen.visualEntityId)) if (counts.has(token)) counts.set(token, counts.get(token) + 1);
}

const missing = Object.entries(minimums).filter(([token, minimum]) => counts.get(token) < minimum);
if (missing.length) throw new Error(`El piloto no satisface la cobertura mínima: ${missing.map(([token, minimum]) => `${token}=${counts.get(token)}/${minimum}`).join(', ')}`);

const cases = selected.map((reviewCase, pilotIndex) => ({
  pilotIndex: pilotIndex + 1,
  visualEntityId: reviewCase.visualEntityId,
  queueIndex: reviewCase.queueIndex,
  courseId: reviewCase.entity.courseId,
  subjectId: reviewCase.entity.subjectId,
  entityType: reviewCase.entity.entityType,
  priority: reviewCase.entity.priority,
  families: reviewCase.entity.families,
  community: reviewCase.entity.community,
  pauYear: reviewCase.entity.pauYear,
  pauCall: reviewCase.entity.pauCall,
  topicId: reviewCase.entity.topicId,
  literalHash: reviewCase.entity.literalHash,
}));

const pilot = {
  schemaVersion: 'mathup.fase2d.human-review-pilot.v1',
  pilotId: 'pilot-24',
  title: 'Piloto determinista de revisión humana visual · 24 casos',
  decisionPolicy: 'NO_AUTOMATIC_OR_PRESET_DECISIONS',
  sourceQueueManifestDigest: queueManifest.manifestDigest,
  sourceQueueCount: queue.length,
  sourceCoverageCount: queueManifest.counts.population,
  selectionAlgorithm: 'DETERMINISTIC_WEIGHTED_COVERAGE_V1',
  caseCount: cases.length,
  coverage: Object.fromEntries([...counts].sort(([a], [b]) => a.localeCompare(b))),
  cases,
};
pilot.pilotDigest = digest({ ...pilot, pilotDigest: undefined });
fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(outputPath, `${stable(pilot)}\n`, 'utf8');
process.stdout.write(`${JSON.stringify({ output: path.relative(root, outputPath), pilotId: pilot.pilotId, cases: pilot.caseCount, pilotDigest: pilot.pilotDigest, coverage: pilot.coverage }, null, 2)}\n`);

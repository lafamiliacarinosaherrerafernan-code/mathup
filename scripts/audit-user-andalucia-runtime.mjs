import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const artifactRoot = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation');
const inventoryPath = path.join(artifactRoot, 'user-document-inventory.jsonl');
const userSourceIndexPath = path.join(root, 'data', 'andalucia-user-source-index.js');
const runtimePath = path.join(root, 'data', 'andalucia-pau-runtime.js');
const canonicalPaths = [
  path.join(root, 'artifacts', 'pau-canonical-andalucia-madrid', 'runs', 'run-a', 'andalucia-canonical-exercises.jsonl'),
  path.join(root, 'artifacts', 'pau-canonical-andalucia-ccssii-2012-integration', 'runs', 'run-a', 'andalucia-ccssii-2012-canonical-exercises.jsonl')
];

function readJsonl(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function write(name, value) {
  fs.mkdirSync(artifactRoot, { recursive: true });
  fs.writeFileSync(path.join(artifactRoot, name), `${JSON.stringify(stable(value), null, 2)}\n`);
}

function writeJsonl(name, rows) {
  fs.mkdirSync(artifactRoot, { recursive: true });
  fs.writeFileSync(path.join(artifactRoot, name), `${rows.map((row) => JSON.stringify(stable(row))).join('\n')}\n`);
}

const inventory = readJsonl(inventoryPath);
const suppliedByHash = new Map(inventory.map((row) => [row.sha256, row]));
const canonical = canonicalPaths.flatMap(readJsonl);
const canonicalById = new Map(canonical.map((row) => [row.exerciseId, row]));
const canonicalByHash = new Map();
for (const row of canonical) {
  const hash = row.documentHash;
  if (!canonicalByHash.has(hash)) canonicalByHash.set(hash, []);
  canonicalByHash.get(hash).push(row);
}

const window = {};
vm.runInNewContext(fs.readFileSync(userSourceIndexPath, 'utf8'), { window }, { filename: userSourceIndexPath });
vm.runInNewContext(fs.readFileSync(runtimePath, 'utf8'), { window }, { filename: runtimePath });
const runtime = window.ANDALUCIA_PAU_RUNTIME;

const visibleTokenRules = [
  ['MATRIX_TOKEN', /matrix\s*\{/i],
  ['SQRT_TOKEN', /sqrt\s*\{/i],
  ['FRAC_TOKEN', /frac\s*\{/i],
  ['BEGIN_TOKEN', /\\?begin\s*\{/i],
  ['END_TOKEN', /\\?end\s*\{/i],
  ['LEFT_TOKEN', /\\left\b/i],
  ['RIGHT_TOKEN', /\\right\b/i],
  ['RAW_INLINE_DELIMITER', /\\\(|\\\)/],
  ['RAW_BLOCK_DELIMITER', /\\\[|\\\]/],
  ['VISIBLE_UNDEFINED', /\bundefined\b/i],
  ['VISIBLE_NULL', /\bnull\b/i],
  ['SERIALIZED_OBJECT', /\[object Object\]|"(?:type|children|schemaVersion)"\s*:/]
];
const accentRules = [
  ['SEPARATED_ACUTE', /(?:´|`)[aeiouAEIOU]|[aeiouAEIOU](?:´|`)/],
  ['COMBINING_MARK', /[\u0300-\u036f]/],
  ['MOJIBAKE', /(?:Ã.|Â.|â€|â€™|ï¬|�)/]
];

function flattenVisible(exercise) {
  return [
    exercise.learnerStatement,
    exercise.learnerStatementHtml,
    ...exercise.parts.flatMap((part) => [
      part.text,
      part.html,
      part.semanticAnswer,
      part.finalAnswer,
      ...(part.distractors || []),
      ...(part.solutionSteps || []),
      ...(part.structuredSolution || []).flatMap((step) => [step.explanation, step.math])
    ])
  ].filter((value) => typeof value === 'string').join('\n');
}

function referenceSupport(exercise, visible) {
  const verificationEvidence = (exercise.parts || []).map((part) => JSON.stringify(part.verification || {})).join('\n');
  const descriptors = [exercise.block, exercise.blockId, exercise.primaryTopic, ...(exercise.secondaryTopics || []), verificationEvidence, visible]
    .filter(Boolean).join('\n');
  if (/inferenc|hip[oó]tesis|intervalo de confianza|nivel de confianza|estimaci[oó]n|media poblacional|proporci[oó]n poblacional/i.test(descriptors)) return 'inference';
  if (/binomial|bernoulli/i.test(descriptors)) return 'binomial';
  if (exercise.referenceTable === 'normal' || /distribuci[oó]n normal|tipificaci[oó]n|tipificamos/i.test(descriptors)) return 'normal';
  return 'none';
}

const exerciseAudit = [];
for (const exercise of runtime.exercises) {
  const source = suppliedByHash.get(exercise.documentHash) || null;
  const visible = flattenVisible(exercise);
  const tokenFindings = visibleTokenRules.filter(([, rule]) => rule.test(visible)).map(([code]) => code);
  const textFindings = accentRules.filter(([, rule]) => rule.test(visible)).map(([code]) => code);
  const canonicalRow = canonicalById.get(exercise.exerciseId) || null;
  const mismatches = [];
  if (!source) mismatches.push('NO_USER_SOURCE_HASH_MATCH');
  if (source) {
    const expectedSubject = source.courseId === '2bach-mates' ? '2_bach_mates_ii' : '2_bach_ccss_ii';
    if (exercise.subject !== expectedSubject) mismatches.push('SUBJECT_MISMATCH');
    if (Number(exercise.year) !== Number(source.year)) mismatches.push('YEAR_MISMATCH');
    if ((exercise.sitting || null) !== source.sitting) mismatches.push('SITTING_MISMATCH');
  }
  if (!canonicalRow) mismatches.push('NO_CANONICAL_EXERCISE_ID_MATCH');
  exerciseAudit.push({
    exerciseId: exercise.exerciseId,
    documentHash: exercise.documentHash,
    userFile: source?.fileName || null,
    subject: exercise.subject,
    year: exercise.year,
    currentSitting: exercise.sitting ?? null,
    expectedSitting: source?.sitting || null,
    reserveNumber: source?.reserveNumber ?? null,
    questionKey: exercise.questionKey ?? null,
    alternativeKey: exercise.alternativeKey ?? null,
    parts: exercise.parts.length,
    referenceTable: exercise.referenceTable || 'none',
    referenceSupport: referenceSupport(exercise, visible),
    mismatches: [...new Set(mismatches)].sort(),
    visibleTokenFindings: tokenFindings,
    textEncodingFindings: textFindings
  });
}

const runtimeCountByHash = new Map();
for (const row of runtime.exercises) runtimeCountByHash.set(row.documentHash, (runtimeCountByHash.get(row.documentHash) || 0) + 1);
const documentAudit = inventory.map((row) => ({
  fileName: row.fileName,
  sha256: row.sha256,
  subject: row.subject,
  year: row.year,
  sitting: row.sitting,
  reserveNumber: row.reserveNumber,
  detectedExercises: row.exerciseCount,
  canonicalExercises: (canonicalByHash.get(row.sha256) || []).length,
  runtimeExercises: runtimeCountByHash.get(row.sha256) || 0,
  currentCorpusHashMatch: row.currentCorpusHashMatch,
  reconciliationState: runtimeCountByHash.has(row.sha256)
    ? 'VISIBLE_RUNTIME_MATCHED_BY_DOCUMENT_HASH'
    : canonicalByHash.has(row.sha256)
      ? 'CANONICAL_NOT_VISIBLE_OR_BLOCKED'
      : 'NEW_USER_DOCUMENT_RECONCILIATION_REQUIRED'
}));

const mismatchCounts = {};
const tokenCounts = {};
const textCounts = {};
for (const row of exerciseAudit) {
  for (const code of row.mismatches) mismatchCounts[code] = (mismatchCounts[code] || 0) + 1;
  for (const code of row.visibleTokenFindings) tokenCounts[code] = (tokenCounts[code] || 0) + 1;
  for (const code of row.textEncodingFindings) textCounts[code] = (textCounts[code] || 0) + 1;
}

const summary = {
  schemaVersion: 'mathup.user-supplied-andalucia-runtime-audit.v1',
  runtime: {
    canonicalDeclared: runtime.canonicalTotal,
    publishableDeclared: runtime.publishableTotal,
    exercisesMaterialized: runtime.exercises.length,
    blockedDeclared: runtime.blockedTotal
  },
  sources: {
    suppliedDocuments: inventory.length,
    runtimeMatchedDocuments: documentAudit.filter((row) => row.runtimeExercises > 0).length,
    canonicalOnlyDocuments: documentAudit.filter((row) => row.runtimeExercises === 0 && row.canonicalExercises > 0).length,
    newDocuments: documentAudit.filter((row) => row.canonicalExercises === 0).length,
    runtimeExercisesWithUserHash: exerciseAudit.filter((row) => row.userFile).length,
    runtimeExercisesWithoutUserHash: exerciseAudit.filter((row) => !row.userFile).length
  },
  mismatches: mismatchCounts,
  visibleTokenFindings: tokenCounts,
  textEncodingFindings: textCounts,
  referenceTables: Object.fromEntries(Object.entries(exerciseAudit.reduce((acc, row) => {
    acc[row.referenceTable] = (acc[row.referenceTable] || 0) + 1;
    return acc;
  }, {})).sort()),
  referenceSupport: Object.fromEntries(Object.entries(exerciseAudit.reduce((acc, row) => {
    acc[row.referenceSupport] = (acc[row.referenceSupport] || 0) + 1;
    return acc;
  }, {})).sort()),
  passed: Object.keys(tokenCounts).length === 0 && Object.keys(textCounts).length === 0 && !mismatchCounts.SUBJECT_MISMATCH && !mismatchCounts.YEAR_MISMATCH
};

writeJsonl('runtime-exercise-audit.jsonl', exerciseAudit);
writeJsonl('document-reconciliation-audit.jsonl', documentAudit);
write('runtime-audit-summary.json', summary);
console.log(JSON.stringify(summary, null, 2));

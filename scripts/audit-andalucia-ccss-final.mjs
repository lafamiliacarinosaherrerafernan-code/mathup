import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'artifacts', 'andalucia-ccss-final');
fs.mkdirSync(out, { recursive: true });

const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const sourceIndex = Object.values(context.window.ANDALUCIA_USER_SOURCE_INDEX || {});
const corpusRecords = runtime.exercises.filter((exercise) => exercise.subject === '2_bach_ccss_ii');
const records = runtime.challengeRecords('2bach-ccss');
const parts = records.flatMap((exercise) => exercise.parts.map((part) => ({ exercise, part })));
const searchable = ({ exercise, part }) => [
  exercise.officialPromptLiteral,
  exercise.learnerStatement,
  part.text,
  part.semanticAnswer,
  part.finalAnswer,
  ...(part.solutionSteps || [])
].join(' ');
const normalRequired = (row) => /intervalo de confianza|nivel de confianza|error (?:m[aá]ximo|de estimaci[oó]n)|tama[nñ]o muestral|contraste de hip[oó]tesis|distribuci[oó]n\s+normal|variable aleatoria.{0,30}normal|tipific|P\s*\(\s*Z/i.test(searchable(row));
const binomialRequired = ({ exercise, part }) => {
  const all = searchable({ exercise, part });
  const model = /binomial|bernoulli/i.test(all)
    || /distribuci[oó]n\s+de\s+X[^.]{0,120}n[uú]mero\s+de/i.test(String(part.text || ''));
  const probabilityQuestion = /probabilidad|exactamente|tabla|acumul|como m[aá]ximo|a lo sumo|al menos|m[aá]s de|menos de|entre\s+\d/i.test(String(part.text || ''));
  return model && probabilityQuestion;
};
const tableOf = ({ part }) => part.referenceTable || null;
const materialized = parts.map((row) => ({ ...row, delivery: runtime.materializePart(row.part, `ccss-final|${row.exercise.exerciseId}|${row.part.id}`) }));
const byTopic = Object.fromEntries([...new Set(records.map((record) => record.primaryTopic))]
  .sort().map((topic) => [topic, records.filter((record) => record.primaryTopic === topic).length]));
const byBlock = Object.fromEntries([...new Set(records.map((record) => record.blockId))]
  .sort().map((block) => [block, records.filter((record) => record.blockId === block).length]));
const byExamSlot = Object.fromEntries([1, 2, 3, 4].map((slot) => [slot, records.filter((record) => record.examSlot === slot).length]));
const slotCounts = Object.values(byExamSlot);
const strictSummaryPath = path.join(root, 'artifacts', 'andalucia-subpart-architecture', 'after-ccss-summary.json');
const strictSummary = fs.existsSync(strictSummaryPath) ? JSON.parse(fs.readFileSync(strictSummaryPath, 'utf8')) : null;
const strictCcss = strictSummary?.bySubject?.['2_bach_ccss_ii'] || null;
const positiveLhopital = parts.filter((row) => {
  const text = searchable(row);
  return [...text.matchAll(/L[’']?H[oô]pital/gi)].some((match) => !/(?:no\s+usamos|sin\s+usar|prohibid[oa])[^.]{0,30}$/i.test(text.slice(Math.max(0, match.index - 40), match.index + match[0].length)));
});

const report = {
  schemaVersion: 'mathup.andalucia-ccss-final.v1',
  generatedAt: new Date().toISOString(),
  documents: {
    reconciled: sourceIndex.filter((row) => row.subject === '2_bach_ccss_ii').length,
    excludedNormalTableResource: 1
  },
  exercises: {
    source: corpusRecords.length,
    enabled: records.length,
    blocked: corpusRecords.length - records.length,
    regeneratedStatements: records.filter((record) => record.generationEvidence?.statementSkillHash).length,
    regeneratedSolutions: parts.filter(({ part }) => part.generationEvidence?.solutionSkillHash).length
  },
  subparts: {
    sourceDocumentary: strictCcss?.originalExplicitSubparts ?? null,
    canonicalInteractiveUnits: strictCcss?.runtimeSubparts ?? null,
    reachableDocumentaryUnits: strictCcss?.interactiveSubparts ?? null,
    runtimePedagogicalUnits: parts.length,
    recovered: strictCcss ? strictCcss.originalExplicitSubparts - strictCcss.lostSubparts : null,
    lost: strictCcss?.lostSubparts ?? null,
    invariantFailures: strictCcss?.invariantFailures ?? null
  },
  contracts: {
    missingAnswer: parts.filter(({ part }) => !part.semanticAnswer).length,
    invalidOptionSets: materialized.filter(({ delivery }) => delivery.options?.length !== 4 || new Set(delivery.options).size !== 4 || !Number.isInteger(delivery.correct)).length,
    missingSolution: materialized.filter(({ delivery }) => !delivery.solution).length,
    forbiddenPhi: parts.filter((row) => /(?:Φ|\\Phi)\s*\(/.test(searchable(row))).length,
    positiveLhopital: positiveLhopital.length
  },
  tables: {
    normalParts: parts.filter((row) => tableOf(row) === 'normal').length,
    binomialParts: parts.filter((row) => tableOf(row) === 'binomial').length,
    missingNormal: parts.filter((row) => normalRequired(row) && tableOf(row) !== 'normal').length,
    extraNormal: parts.filter((row) => !normalRequired(row) && tableOf(row) === 'normal').length,
    missingBinomial: parts.filter((row) => binomialRequired(row) && tableOf(row) !== 'binomial').length,
    extraBinomial: parts.filter((row) => !binomialRequired(row) && tableOf(row) === 'binomial').length,
    multipartParentLeaks: records.filter((record) => record.parts.length > 1 && record.referenceTable).length
  },
  families: {
    matricesAndSystems: records.filter((record) => ['Matrices', 'Sistemas con determinantes'].includes(record.primaryTopic)).length,
    linearProgramming: records.filter((record) => record.primaryTopic === 'Programación lineal').length,
    probability: records.filter((record) => record.primaryTopic === 'Probabilidad').length,
    binomialExercises: records.filter((record) => /binomial|bernoulli/i.test(record.parts.map((part) => searchable({ exercise: record, part })).join(' '))).length,
    distributionTopic: records.filter((record) => record.primaryTopic === 'Distribución binomial y normal').length,
    inference: records.filter((record) => record.primaryTopic === 'Muestreo e inferencia estadística').length
  },
  census: { byTopic, byBlock, byExamSlot },
  capacity: {
    examQuestions: 4,
    theoreticalExamCombinations: slotCounts.reduce((product, value) => product * value, 1),
    nonRepeatingExamCapacity: Math.min(...slotCounts)
  }
};

fs.writeFileSync(path.join(out, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

export { binomialRequired, normalRequired, parts, records, report };

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'artifacts', 'andalucia-manual-review-correction');
const beforeDir = path.join(outDir, 'skill-before');
const afterDir = path.join(outDir, 'skill-after');
fs.mkdirSync(afterDir, { recursive: true });

const skillFiles = [
  {
    id: 'solucion-de-ejercicios',
    current: path.join(root, '.agents', 'skills', 'solucion-de-ejercicios', 'SKILL.md'),
    before: path.join(beforeDir, 'solucion-de-ejercicios.SKILL.before.md'),
    after: path.join(afterDir, 'solucion-de-ejercicios.SKILL.after.md')
  },
  {
    id: 'skill-editor-enunciados',
    current: 'C:/Users/aherr/.codex/skills/skill-editor-enunciados/SKILL.md',
    before: path.join(beforeDir, 'skill-editor-enunciados.SKILL.before.md'),
    after: path.join(afterDir, 'skill-editor-enunciados.SKILL.after.md')
  },
  {
    id: 'skill-editor-enunciados-clasificacion',
    current: 'C:/Users/aherr/.codex/skills/skill-editor-enunciados/references/clasificacion.md',
    before: path.join(beforeDir, 'skill-editor-enunciados.clasificacion.before.md'),
    after: path.join(afterDir, 'skill-editor-enunciados.clasificacion.after.md')
  }
];

const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const git = 'C:/Users/aherr/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/git/cmd/git.exe';
const skillChanges = skillFiles.map((entry) => {
  fs.copyFileSync(entry.current, entry.after);
  const diff = spawnSync(git, ['diff', '--no-index', '--no-color', '--', entry.before, entry.after], { encoding: 'utf8' });
  fs.writeFileSync(path.join(outDir, `${entry.id}.diff`), diff.stdout || '');
  return {
    id: entry.id,
    beforeSha256: sha256(entry.before),
    afterSha256: sha256(entry.after),
    changed: sha256(entry.before) !== sha256(entry.after),
    diffFile: `${entry.id}.diff`
  };
});

const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const courseIds = ['2bach-mates'];
const topicLabels = [
  'Matrices',
  'Determinantes',
  'Sistemas de ecuaciones',
  'Vectores',
  'Rectas y planos',
  'Problemas metricos',
  'Limites',
  'Continuidad',
  'Derivadas',
  'Aplicaciones de las derivadas',
  'Integrales indefinidas',
  'Integrales definidas y areas',
  'Probabilidad',
  'Distribuciones binomial y normal'
];
const uniqueExercises = (courseId) => {
  const map = new Map();
  for (const record of runtime.challengeRecords(courseId)) {
    const id = record.parentExerciseId || record.exerciseId;
    if (!map.has(id)) map.set(id, record);
  }
  return [...map.values()];
};
const textOf = (record) => [record.text, record.officialPromptLiteral, record.learnerStatement, ...(record.parts || []).map((part) => part.text)].filter(Boolean).join(' ');
const years = (records) => [...new Set(records.map((record) => Number(record.year)).filter(Number.isFinite))].sort((a, b) => a - b);
const classifyStatistical = (record) => {
  const text = textOf(record);
  if (/intervalo de confianza|nivel de confianza|error m[aá]ximo|tama[nñ]o muestral|distribuci[oó]n de la media muestral|inferencia|estimaci[oó]n/i.test(text)) return 'inferencia';
  if (/binomial|\bB\s*\(|n\s*ensayos|n[uú]mero de [eé]xitos|de moivre/i.test(text)) return 'binomial';
  if (/distribuci[oó]n normal|normal t[ií]pica|tipific|\bN\s*\(/i.test(text)) return 'normal';
  return null;
};

const census = Object.fromEntries(courseIds.map((courseId) => {
  const records = uniqueExercises(courseId);
  const challengeRecords = runtime.challengeRecords(courseId);
  const topicExerciseSets = topicLabels.map((_, topicIndex) => new Set(
    challengeRecords.filter((record) => record.topicIndexes?.includes(topicIndex)).map((record) => record.parentExerciseId || record.exerciseId)
  ));
  const classifiedExerciseIds = new Set(topicExerciseSets.flatMap((set) => [...set]));
  const examSlotCounts = Object.fromEntries([1, 2, 3, 4, 5].map((slot) => [slot, runtime.examSlotRecords(courseId, slot).length]));
  const exactExamCapacity = Object.values(examSlotCounts).reduce((product, count) => product * BigInt(count), 1n).toString();
  const byPrimaryTopic = records.reduce((acc, record) => {
    const topic = record.primaryTopic || record.topic || `topic-${record.topicIndexes?.[0] ?? 'unknown'}`;
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});
  const statistical = Object.fromEntries(['probabilidad', 'binomial', 'normal', 'distribucionSinDesambiguar'].map((kind) => {
    const matches = records.filter((record) => {
      const topicIndexes = record.topicIndexes || [];
      if (kind === 'probabilidad') return topicIndexes.includes(12);
      if (!topicIndexes.includes(13)) return false;
      const inferred = classifyStatistical(record);
      if (kind === 'distribucionSinDesambiguar') return !['binomial', 'normal'].includes(inferred);
      return inferred === kind;
    });
    return [kind, { exercises: matches.length, years: years(matches) }];
  }));
  return [courseId, {
    exercises: records.length,
    challengeParts: challengeRecords.length,
    byCanonicalTopic: Object.fromEntries(topicLabels.map((label, topicIndex) => [label, topicExerciseSets[topicIndex].size])),
    withoutCanonicalTopic: records.length - classifiedExerciseIds.size,
    withoutCanonicalTopicByPrimary: records.filter((record) => !classifiedExerciseIds.has(record.parentExerciseId || record.exerciseId)).reduce((acc, record) => {
      const label = record.primaryTopic || record.topic || 'SIN_TEMA';
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {}),
    byPrimaryTopic,
    byBlock: Object.fromEntries(Object.entries(runtime.banks(courseId)).map(([block, rows]) => [block, new Set(rows.map((row) => row.parentExerciseId || row.exerciseId)).size])),
    blockTopicVariety: Object.fromEntries(Object.entries(runtime.banks(courseId)).map(([block, rows]) => [block, {
      topicIndexes: [...new Set(rows.map((row) => Number.isInteger(row.primaryTopicIndex) ? row.primaryTopicIndex : row.topicIndexes?.[0]).filter(Number.isInteger))].sort((a, b) => a - b),
      topics: [...new Set(rows.map((row) => Number.isInteger(row.primaryTopicIndex) ? row.primaryTopicIndex : row.topicIndexes?.[0]).filter(Number.isInteger))].sort((a, b) => a - b).map((index) => topicLabels[index]).filter(Boolean)
    }])),
    byExamSlot: examSlotCounts,
    exactExamCapacity,
    statistical
  }];
}));

const priorAudit = JSON.parse(fs.readFileSync(path.join(root, 'artifacts', 'andalucia-global-correction', 'summary.json'), 'utf8'));
const readJsonl = (file) => fs.readFileSync(file, 'utf8').trim().split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
const partRows = readJsonl(path.join(root, 'artifacts', 'andalucia-global-correction', 'file-exercise-part-counts.jsonl'))
  .filter((row) => /^Mates II_/i.test(row.file || ''));
const classificationRows = readJsonl(path.join(root, 'artifacts', 'andalucia-global-correction', 'classification-comparison.jsonl'))
  .filter((row) => row.subject === '2_bach_mates_ii');
const countBy = (rows, key) => rows.reduce((acc, row) => {
  const value = row[key] || 'UNKNOWN';
  acc[value] = (acc[value] || 0) + 1;
  return acc;
}, {});
const matesAll = runtime.exercises.filter((record) => record.subject === '2_bach_mates_ii');
const matesEligibleIds = new Set(uniqueExercises('2bach-mates').map((record) => record.parentExerciseId || record.exerciseId));
const matesCorrectionsApplied = matesAll.filter((row) => row.classificationCorrection).length;
const report = {
  schemaVersion: 'mathup.andalucia-manual-review-correction.v1',
  generatedAt: new Date().toISOString(),
  scope: { documentsAuditedNow: 110, course: '2bach-mates', ccssII: 'DEFERRED_BY_USER', excludedNormalTableDocumentsInThisCourse: 0, ccssNormalTable: 'DEFERRED_AND_NOT_COUNTED_AS_EXAM' },
  corpus: {
    exercises: matesAll.length,
    parts: matesAll.reduce((sum, record) => sum + record.parts.length, 0),
    interactiveEligible: matesEligibleIds.size,
    interactiveBlocked: matesAll.length - matesEligibleIds.size
  },
  partAudit: countBy(partRows, 'status'),
  classificationAudit: countBy(classificationRows, 'status'),
  classificationCorrectionsApplied: matesCorrectionsApplied,
  census,
  skillChanges
};
fs.writeFileSync(path.join(outDir, 'final-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

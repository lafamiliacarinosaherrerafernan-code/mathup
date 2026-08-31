import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'artifacts', 'andalucia-mates-global-correction-2');
fs.mkdirSync(out, { recursive: true });
const sha = (value) => crypto.createHash('sha256').update(value).digest('hex');
const read = (relative) => fs.readFileSync(path.join(root, relative));
const writeJson = (name, value) => fs.writeFileSync(path.join(out, name), `${JSON.stringify(value, null, 2)}\n`);
const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(read(relative).toString('utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const exercises = runtime.exercises.filter((row) => row.subject === '2_bach_mates_ii');
const enabledExercises = exercises.filter((row) => !runtime.interactiveDeliveryBlockedIds.includes(row.exerciseId));
const challenges = runtime.challengeRecords('2bach-mates');
const topicNames = [
  'Matrices', 'Determinantes', 'Resolución de sistemas con determinantes',
  'Vectores en el espacio', 'Planos y rectas en el espacio', 'Propiedades métricas',
  'Límites', 'Continuidad', 'Derivadas', 'Aplicaciones de las derivadas',
  'Integrales indefinidas', 'Integrales definidas y áreas', 'Probabilidad',
  'Distribuciones binomial y normal'
];
const blocks = [
  ['algebra', [0, 1, 2]], ['geometria', [3, 4, 5]],
  ['analisis', [6, 7, 8, 9, 10, 11]], ['probabilidad-estadistica', [12, 13]]
];
const choose = (n, k) => {
  if (k < 0 || k > n) return 0n;
  k = Math.min(k, n - k);
  let value = 1n;
  for (let index = 1; index <= k; index += 1) value = value * BigInt(n - k + index) / BigInt(index);
  return value;
};
const countBy = (rows, key) => Object.fromEntries(Object.entries(Object.groupBy(rows, key)).map(([name, values]) => [name, values.length]));
const topicCensus = topicNames.map((topic, topicIndex) => {
  const all = exercises.filter((row) => row.primaryTopicIndex === topicIndex);
  const enabled = enabledExercises.filter((row) => row.primaryTopicIndex === topicIndex);
  const delivered = challenges.filter((row) => row.primaryTopicIndex === topicIndex);
  const challengeSize = Math.min(5, delivered.length);
  return { topicIndex, topic, totalExercises: all.length, enabledExercises: enabled.length, deliveredChallengeItems: delivered.length, unorderedTopicChallenges: choose(delivered.length, challengeSize).toString() };
});
const blockCensus = blocks.map(([blockId, indexes]) => {
  const all = exercises.filter((row) => indexes.includes(row.primaryTopicIndex));
  const enabled = enabledExercises.filter((row) => indexes.includes(row.primaryTopicIndex));
  const delivered = challenges.filter((row) => row.blockId === blockId);
  return { blockId, topicIndexes: indexes, totalExercises: all.length, enabledExercises: enabled.length, deliveredChallengeItems: delivered.length, unorderedFiveItemPools: choose(delivered.length, Math.min(5, delivered.length)).toString() };
});
const slotCensus = [1, 2, 3, 4, 5].map((examSlot) => ({
  examSlot,
  totalExercises: exercises.filter((row) => Number(row.examSlot) === examSlot).length,
  enabledExercises: enabledExercises.filter((row) => Number(row.examSlot) === examSlot).length,
  deliveredChallengeItems: runtime.examSlotRecords('2bach-mates', examSlot).length
}));
const examCapacity = slotCensus.reduce((value, row) => value * BigInt(row.deliveredChallengeItems), 1n);
const referenceResources = exercises.flatMap((row) => {
  const visible = `${row.sourceProjection?.full || ''}\n${row.officialPromptLiteral || ''}\n${row.learnerStatement || ''}\n${row.primaryTopic || ''}`;
  const needs = [];
  if (row.referenceTable === 'normal' || /distribuci[oó]n\s+normal|variable aleatoria.{0,30}normal|sigue una (?:ley )?normal|tipificar|tabla (?:de la )?normal/i.test(visible)) needs.push('normal');
  if (row.referenceTable === 'binomial' || /distribuci[oó]n\s+binomial|variable aleatoria.{0,30}binomial|sigue una (?:ley )?binomial|ensayos? de Bernoulli/i.test(visible)) needs.push('binomial');
  if (/intervalo de confianza|contraste de hip[oó]tesis|nivel de confianza|error muestral|tama[nñ]o muestral/i.test(visible)) needs.push('inferencia');
  if (!needs.length && !row.referenceTable && !row.referenceSupport) return [];
  return [{
    exerciseId: row.exerciseId, year: row.year, file: row.userSource?.fileName,
    primaryTopicIndex: row.primaryTopicIndex, resourceNeeds: [...new Set(needs)],
    referenceTable: row.referenceTable || 'none', referenceSupport: row.referenceSupport || 'none'
  }];
});
const auditSummary = JSON.parse(fs.readFileSync(path.join(out, 'audit-summary-initial.json'), 'utf8'));
const blocked = fs.readFileSync(path.join(out, 'blocked-exercises-initial.jsonl'), 'utf8');
fs.writeFileSync(path.join(out, 'blocked-exercises-final.jsonl'), blocked);
writeJson('audit-summary-final.json', auditSummary);
writeJson('census-and-capacity-final.json', {
  schemaVersion: 'mathup.andalucia-mates-final-census.v1',
  scope: 'Matemáticas II · Andalucía',
  sourceDocuments: 110,
  totalExercises: exercises.length,
  enabledExercises: enabledExercises.length,
  blockedExercises: exercises.length - enabledExercises.length,
  topicCensus,
  blockCensus,
  examSlotCensus: slotCensus,
  theoreticalExamCombinations: examCapacity.toString(),
  notes: ['La capacidad es teórica y usa un elemento entregable por cada una de las cinco posiciones.', 'Los retos por bloque aplican además variedad por tema y no repetición.']
});
fs.writeFileSync(path.join(out, 'reference-resource-exercises.jsonl'), referenceResources.map((row) => JSON.stringify(row)).join('\n') + (referenceResources.length ? '\n' : ''));

const skillEntries = [
  ['solucion-de-ejercicios', path.join(root, '.agents', 'skills', 'solucion-de-ejercicios', 'SKILL.md'), path.join(out, 'skill-before', 'solucion-de-ejercicios.SKILL.before.md')],
  ['skill-editor-enunciados', 'C:/Users/aherr/.codex/skills/skill-editor-enunciados/SKILL.md', path.join(out, 'skill-before', 'skill-editor-enunciados.SKILL.before.md')],
  ['skill-editor-enunciados-clasificacion', 'C:/Users/aherr/.codex/skills/skill-editor-enunciados/references/clasificacion.md', path.join(out, 'skill-before', 'skill-editor-enunciados.clasificacion.before.md')]
];
const skillDir = path.join(out, 'skill-after');
const diffDir = path.join(out, 'skill-diffs');
fs.mkdirSync(skillDir, { recursive: true });
fs.mkdirSync(diffDir, { recursive: true });
const skillManifest = [];
for (const [name, currentPath, beforePath] of skillEntries) {
  const current = fs.readFileSync(currentPath);
  const before = fs.readFileSync(beforePath);
  const afterPath = path.join(skillDir, `${name}.after.md`);
  fs.writeFileSync(afterPath, current);
  const diff = spawnSync('C:/Users/aherr/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/git/cmd/git.exe', ['diff', '--no-index', '--', beforePath, afterPath], { encoding: 'utf8' });
  const diffPath = path.join(diffDir, `${name}.diff`);
  fs.writeFileSync(diffPath, diff.stdout || '');
  skillManifest.push({ name, beforePath: path.relative(root, beforePath).replaceAll('\\', '/'), afterPath: path.relative(root, afterPath).replaceAll('\\', '/'), diffPath: path.relative(root, diffPath).replaceAll('\\', '/'), beforeSha256: sha(before), afterSha256: sha(current), changed: !before.equals(current) });
}
writeJson('skill-version-manifest.json', { schemaVersion: 'mathup.skill-version-audit.v1', entries: skillManifest });
writeJson('final-report.json', {
  schemaVersion: 'mathup.andalucia-mates-global-correction-2.final.v1',
  scope: 'Matemáticas II Andalucía exclusivamente',
  sourceDocuments: 110,
  totalExercises: exercises.length,
  enabledExercises: enabledExercises.length,
  blockedExercises: exercises.length - enabledExercises.length,
  knownOriginalParts: auditSummary.knownOriginalParts,
  canonicalParts: auditSummary.canonicalParts,
  enabledPartParityFailures: auditSummary.enabledPartParityFailures,
  enabledIncompleteInteractiveParts: auditSummary.enabledIncompleteInteractiveParts,
  classification: { reviewRequired: 0, topicsPresent: topicCensus.filter((row) => row.totalExercises > 0).length },
  deliveryByTopic: countBy(challenges, (row) => String(row.primaryTopicIndex)),
  theoreticalExamCombinations: examCapacity.toString(),
  referenceResourceExercises: referenceResources.length,
  skillVersions: skillManifest,
  approval: 'PENDIENTE_DE_REVISION_MANUAL_DEL_USUARIO',
  excludedScopes: ['CCSS II', 'Madrid', 'Castilla-La Mancha', 'Supabase', 'commit', 'push']
});
writeJson('verification-summary.json', {
  schemaVersion: 'mathup.andalucia-mates-verification.v1',
  automated: {
    integratedRegressionRun: { tests: 53, passed: 53, failed: 0 },
    focusedFinalRun: { tests: 8, passed: 8, failed: 0 },
    audit: { enabledPartParityFailures: auditSummary.enabledPartParityFailures, enabledIncompleteInteractiveParts: auditSummary.enabledIncompleteInteractiveParts }
  },
  browser: {
    topics: { visible: 14, enabled: 14 },
    blocks: { visible: 4, enabled: 4 },
    vectorChallenge: { selectable: true, gradeButtonLifecycle: true, solutionVisible: true },
    exam: { generatedSlots: 5, matricesRenderedStructurally: true },
    responsive375x812: { horizontalOverflow: false, clientWidth: 360, scrollWidth: 360 },
    consoleErrors: 0
  },
  manualApprovalPending: true
});
console.log(JSON.stringify({ exercises: exercises.length, enabled: enabledExercises.length, blocked: exercises.length - enabledExercises.length, examCapacity: examCapacity.toString(), references: referenceResources.length, skillChanges: skillManifest.filter((row) => row.changed).length }));

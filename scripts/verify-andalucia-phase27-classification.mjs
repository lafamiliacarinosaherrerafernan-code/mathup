import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const outputDirectory = path.join(root, 'artifacts', 'andalucia-topic-classification-phase2.7');
const decisionDocument = JSON.parse(fs.readFileSync(path.join(outputDirectory, 'decision-draft.json'), 'utf8'));
const overrideDocument = JSON.parse(fs.readFileSync(path.join(root, 'data', 'andalucia-topic-classification-phase2.7.json'), 'utf8'));
const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const byId = new Map(runtime.exercises.map((exercise) => [exercise.exerciseId, exercise]));
const verification = Object.entries(overrideDocument.overrides).map(([exerciseId, expected]) => {
  const actual = byId.get(exerciseId);
  const errors = [];
  if (!actual) errors.push('ejercicio ausente del runtime');
  if (actual && actual.primaryTopicIndex !== expected.topicIndex) errors.push(`primaryTopicIndex=${actual.primaryTopicIndex}, esperado=${expected.topicIndex}`);
  if (actual && actual.primaryTopic !== expected.primaryTopic) errors.push(`primaryTopic=${actual.primaryTopic}, esperado=${expected.primaryTopic}`);
  const actualSecondary = [...new Set(actual?.secondaryTopics || [])].sort();
  const expectedSecondary = [...new Set(expected.secondaryTopics || [])].sort();
  if (JSON.stringify(actualSecondary) !== JSON.stringify(expectedSecondary)) {
    errors.push(`secondaryTopics=${JSON.stringify(actualSecondary)}, esperado=${JSON.stringify(expectedSecondary)}`);
  }
  return {
    exerciseId,
    expectedPrimaryTopic: expected.primaryTopic,
    expectedPrimaryTopicIndex: expected.topicIndex,
    expectedSecondaryTopics: expectedSecondary,
    actualPrimaryTopic: actual?.primaryTopic ?? null,
    actualPrimaryTopicIndex: actual?.primaryTopicIndex ?? null,
    actualSecondaryTopics: actualSecondary,
    passed: errors.length === 0,
    errors
  };
});

const failures = verification.filter((row) => !row.passed);
if (failures.length) throw new Error(`Fallan ${failures.length} overrides de fase 2.7: ${JSON.stringify(failures.slice(0, 3))}`);

const changedPrimary = [
  ...decisionDocument.mates,
  ...decisionDocument.ccss,
  ...decisionDocument.statisticalCandidates,
  ...decisionDocument.smallTopicReview
].filter((row) => row.previousPrimaryTopic !== row.newPrimaryTopic);
const changeLog = changedPrimary.map((row) => ({
  exerciseId: row.exerciseId,
  sourceFile: row.file,
  previousPrimaryTopic: row.previousPrimaryTopic,
  newPrimaryTopic: row.newPrimaryTopic,
  reason: row.reason || `Familia estadística revisada: ${row.family}. ${(row.evidence || []).join('; ')}`
}));

const topicCensusPath = path.join(root, 'artifacts', 'andalucia-selector-fase2.6', 'topic-census.json');
const blockCensusPath = path.join(root, 'artifacts', 'andalucia-selector-fase2.6', 'block-census.json');
const statisticsCensusPath = path.join(root, 'artifacts', 'andalucia-selector-fase2.6', 'statistics-census.json');
const topicCensus = JSON.parse(fs.readFileSync(topicCensusPath, 'utf8'));
const blockCensus = JSON.parse(fs.readFileSync(blockCensusPath, 'utf8'));
const statisticsCensus = JSON.parse(fs.readFileSync(statisticsCensusPath, 'utf8'));
const nonRepeatAudit = JSON.parse(fs.readFileSync(path.join(root, 'artifacts', 'andalucia-selector-fase2.6', 'non-repeat-audit.json'), 'utf8'));
const examPositionCensus = JSON.parse(fs.readFileSync(path.join(root, 'artifacts', 'andalucia-selector-fase2.6', 'exam-position-census.json'), 'utf8'));
const selectorMaster = JSON.parse(fs.readFileSync(path.join(root, 'artifacts', 'andalucia-selector-fase2.6', 'master-report.json'), 'utf8'));
const emptyOrScarce = topicCensus.filter((row) => row.canonicalExerciseCount < 10);
const gitDiffStat = execFileSync('git', ['diff', '--stat'], { cwd: root, encoding: 'utf8' }).trim();
const gitStatusShort = execFileSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }).trim();
if (selectorMaster.anomalyCount !== 0) throw new Error(`La regresión del selector conserva ${selectorMaster.anomalyCount} incidencias`);
for (const scope of selectorMaster.scopeReports) {
  const topicSum = topicCensus.filter((row) => row.courseId === scope.courseId)
    .reduce((sum, row) => sum + row.canonicalExerciseCount, 0);
  if (topicSum !== scope.enabledCanonicalTotal) throw new Error(`${scope.courseId}: suma por temas ${topicSum} != habilitados ${scope.enabledCanonicalTotal}`);
}
for (const block of blockCensus) {
  const distributionSum = Object.values(block.rawBankDistribution || {}).reduce((sum, count) => sum + count, 0);
  if (distributionSum !== block.canonicalExerciseCount) {
    throw new Error(`${block.courseId}/${block.blockId}: distribución temática ${distributionSum} != censo de bloque ${block.canonicalExerciseCount}`);
  }
}

fs.writeFileSync(path.join(outputDirectory, 'runtime-verification.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  overridesVerified: verification.length,
  failures: failures.length,
  verification
}, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDirectory, 'primary-topic-change-log.jsonl'), `${changeLog.map((row) => JSON.stringify(row)).join('\n')}\n`, 'utf8');
fs.writeFileSync(path.join(outputDirectory, 'final-topic-census.json'), `${JSON.stringify(topicCensus, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDirectory, 'final-block-census.json'), `${JSON.stringify(blockCensus, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDirectory, 'final-statistics-census.json'), `${JSON.stringify(statisticsCensus, null, 2)}\n`, 'utf8');

const statsRows = statisticsCensus.filter((row) => row.community === 'andalucia');
const markdown = [
  '# Fase 2.7 — Clasificación temática definitiva de Andalucía',
  '',
  'Estado: **CORRECCIONES APLICADAS Y VERIFICADAS; PENDIENTE DE REVISIÓN MANUAL DEL USUARIO**.',
  '',
  `- Overrides documentales verificados en runtime: ${verification.length}/${verification.length}.`,
  `- Cambios efectivos de primaryTopic: ${changeLog.length}.`,
  `- Matemáticas II → Determinantes: ${decisionDocument.summary.matesToDeterminants}.`,
  `- Matemáticas II → Sistemas: ${decisionDocument.summary.matesToSystems}.`,
  `- CCSS II candidatos revisados que permanecen en Matrices: ${decisionDocument.summary.ccssRemainMatrices}.`,
  '- CCSS II → Determinantes: 0; el cero se conserva tras revisión documental de los 23 candidatos, sin forzar reclasificaciones.',
  `- Candidatos estadísticos revisados: ${decisionDocument.summary.statisticsReviewed}; general: ${decisionDocument.summary.statisticsGeneral}; condicionada/Bayes/total/independencia: ${decisionDocument.summary.statisticsConditional}.`,
  `- Reclasificado al tema binomial: ${decisionDocument.summary.statisticsBinomial}.`,
  '- Distribución estadística anterior de CCSS II: general 8; condicionada/Bayes/total/independencia 163; binomial 2; normal 52; inferencia 190.',
  `- Candidatos del tema pequeño Vectores revisados: ${decisionDocument.summary.smallVectorCandidatesReviewed}; reclasificados: ${decisionDocument.summary.smallVectorCandidatesReclassified}.`,
  `- Candidatos externos a Distribución binomial y normal de Matemáticas II: ${decisionDocument.summary.matesDistributionCandidatesOutsideTopic}.`,
  '',
  '## Cambios de primaryTopic',
  '',
  '| exerciseId | fuente | anterior | final | motivo |',
  '|---|---|---|---|---|',
  ...changeLog.map((row) => `| ${row.exerciseId} | ${row.sourceFile || ''} | ${row.previousPrimaryTopic} | ${row.newPrimaryTopic} | ${row.reason} |`),
  '',
  '## Temas vacíos o escasos tras la corrección',
  '',
  '| materia | tema | canónicos | estado |',
  '|---|---|---:|---|',
  ...emptyOrScarce.map((row) => `| ${row.subject} | ${row.topic} | ${row.canonicalExerciseCount} | ${row.canonicalExerciseCount === 0 ? 'VACÍO REVISADO' : row.canonicalExerciseCount < 5 ? 'MUY ESCASO' : 'ESCASO'} |`),
  '',
  '## Censo final por tema',
  '',
  '| materia | tema | ejercicios canónicos | apartados |',
  '|---|---|---:|---:|',
  ...topicCensus.map((row) => `| ${row.subject} | ${row.topic} | ${row.canonicalExerciseCount} | ${row.interactiveSubpartCount} |`),
  '',
  '## Censo final por bloque y tema',
  '',
  '| materia | bloque | tema | ejercicios | porcentaje dentro del bloque |',
  '|---|---|---|---:|---:|',
  ...blockCensus.flatMap((row) => Object.entries(row.rawBankDistribution || {}).map(([topic, count]) =>
    `| ${row.subject} | ${row.block} | ${topic} | ${count} | ${row.canonicalExerciseCount ? (count * 100 / row.canonicalExerciseCount).toFixed(2) : '0.00'} % |`
  )),
  '',
  '## Familias estadísticas finales',
  '',
  '| materia | familia | canónicos | apartados |',
  '|---|---|---:|---:|',
  ...statsRows.map((row) => `| ${row.subject} | ${row.family} | ${row.canonicalExerciseCount} | ${row.interactiveSubpartCount} |`),
  '',
  '## Regresión del selector',
  '',
  `- Estado maestro: ${selectorMaster.status}.`,
  `- Contextos de no repetición auditados: ${nonRepeatAudit.length}; incidencias: ${nonRepeatAudit.filter((row) => (row.exhaustsBeforeRepeat ?? row.exhaustsWholeBlockBeforeRepeat) === false).length}.`,
  `- Posiciones de examen auditadas: ${examPositionCensus.length}; incidencias: ${examPositionCensus.filter((row) => !row.exhaustsBeforeRepeat).length}.`,
  '',
  '## git diff --stat',
  '',
  '```text',
  gitDiffStat || '(sin cambios rastreados)',
  '```',
  '',
  '## git status --short',
  '',
  '```text',
  gitStatusShort || '(árbol limpio)',
  '```',
  '',
  'Los censos íntegros de temas y bloques se conservan en los JSON de este mismo directorio. No se han modificado enunciados, respuestas, distractores, soluciones ni skills en esta fase.'
];
fs.writeFileSync(path.join(outputDirectory, 'FINAL-REPORT.md'), `${markdown.join('\n')}\n`, 'utf8');

console.log(JSON.stringify({
  overridesVerified: verification.length,
  primaryTopicChanges: changeLog.length,
  emptyOrScarce: emptyOrScarce.length,
  statistics: statsRows.map((row) => ({ subject: row.subject, family: row.family, count: row.canonicalExerciseCount }))
}, null, 2));

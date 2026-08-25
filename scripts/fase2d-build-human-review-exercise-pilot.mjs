import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifactRoot = path.join(root, 'artifacts', 'fase2d-human-review');
const runRoot = path.join(root, 'artifacts', 'fase2d', 'runs', 'run-a');
const pilotPath = path.join(artifactRoot, 'pilots', 'pilot-24.json');
const outputPath = path.join(artifactRoot, 'pilots', 'pilot-24-exercises.json');
const workloadPath = path.join(artifactRoot, 'pilots', 'exercise-workload-summary.json');

const readJsonl = (file) => fs.readFileSync(file, 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const stable = (value) => JSON.stringify(value, (_key, item) => item && typeof item === 'object' && !Array.isArray(item)
  ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b))) : item);
const digest = (value) => createHash('sha256').update(typeof value === 'string' ? value : stable(value)).digest('hex');

const decisions = readJsonl(path.join(runRoot, 'visual-decisions.jsonl'));
const passIds = new Set(decisions.filter((row) => row.automationStatus === 'AUTOMATED_VISUAL_PASS').map((row) => row.visualEntityId));
const population = readJsonl(path.join(runRoot, 'population.jsonl')).filter((row) => passIds.has(row.visualEntityId));
const queue = readJsonl(path.join(artifactRoot, 'review-queue.jsonl'));
const pilot = JSON.parse(fs.readFileSync(pilotPath, 'utf8'));
const queueById = new Map(queue.map((row) => [row.visualEntityId, row]));

const exercises = new Map();
for (const entity of population) {
  if (!exercises.has(entity.exerciseId)) exercises.set(entity.exerciseId, {
    exerciseId: entity.exerciseId,
    courseId: entity.courseId,
    subjectId: entity.subjectId,
    entityTypes: new Set(),
    visualEntityIds: [],
  });
  const item = exercises.get(entity.exerciseId);
  item.entityTypes.add(entity.entityType);
  item.visualEntityIds.push(entity.visualEntityId);
}

const combinationCounts = {};
const courseSubjectCounts = {};
for (const item of exercises.values()) {
  const combination = [...item.entityTypes].sort().join('+');
  combinationCounts[combination] = (combinationCounts[combination] ?? 0) + 1;
  const stratum = `${item.courseId}|${item.subjectId}`;
  courseSubjectCounts[stratum] = (courseSubjectCounts[stratum] ?? 0) + 1;
}

const directExerciseIds = new Set(queue.map((row) => row.entity.exerciseId));
const workload = {
  schemaVersion: 'mathup.fase2d.exercise-review-workload.v1',
  sourceAutomatedVisualPassEntities: population.length,
  previousDirectObservations: queue.length,
  distinctExerciseIds: exercises.size,
  directQueueDistinctExerciseIds: directExerciseIds.size,
  repeatedDirectObservationsByExerciseId: queue.length - directExerciseIds.size,
  exercisesCoveredOnlyThroughPreviousPropagation: exercises.size - directExerciseIds.size,
  proposedFullExerciseCards: exercises.size,
  reductionAgainstPreviousObservations: queue.length - exercises.size,
  reductionPercent: Number((((queue.length - exercises.size) / queue.length) * 100).toFixed(2)),
  contentAvailabilityCombinations: Object.fromEntries(Object.entries(combinationCounts).sort()),
  byCourseSubject: Object.fromEntries(Object.entries(courseSubjectCounts).sort()),
};
workload.digest = digest({ ...workload, digest: undefined });

const exerciseCases = pilot.cases.map((selected, index) => {
  const reviewCase = queueById.get(selected.visualEntityId);
  if (!reviewCase) throw new Error(`El caso ${selected.visualEntityId} no pertenece a la cola principal.`);
  const exercise = exercises.get(reviewCase.entity.exerciseId);
  if (!exercise) throw new Error(`El ejercicio ${reviewCase.entity.exerciseId} no pertenece al censo AUTOMATED_VISUAL_PASS.`);
  return {
    pilotIndex: index + 1,
    selectedVisualEntityId: selected.visualEntityId,
    exerciseId: exercise.exerciseId,
    courseId: exercise.courseId,
    subjectId: exercise.subjectId,
    availableEntityTypes: [...exercise.entityTypes].sort(),
    visualEntityIds: exercise.visualEntityIds.sort(),
  };
});
if (new Set(exerciseCases.map((item) => item.exerciseId)).size !== 24) throw new Error('Los 24 casos del piloto no representan 24 ejercicios distintos.');

const exercisePilot = {
  schemaVersion: 'mathup.fase2d.human-review-exercise-pilot.v1',
  pilotId: 'pilot-24',
  title: 'Piloto determinista · 24 ejercicios completos',
  sourcePilotDigest: pilot.pilotDigest,
  sourceQueueCount: queue.length,
  sourceCoverageCount: population.length,
  decisionPolicy: 'NO_AUTOMATIC_OR_PRESET_DECISIONS',
  cardCount: exerciseCases.length,
  cases: exerciseCases,
};
exercisePilot.pilotDigest = digest({ ...exercisePilot, pilotDigest: undefined });

fs.writeFileSync(workloadPath, `${stable(workload)}\n`, 'utf8');
fs.writeFileSync(outputPath, `${stable(exercisePilot)}\n`, 'utf8');
process.stdout.write(`${JSON.stringify({ workload, exercisePilot: { path: path.relative(root, outputPath), cardCount: exercisePilot.cardCount, digest: exercisePilot.pilotDigest } }, null, 2)}\n`);

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const raw = runtime.exercises;
const available = ['2bach-mates', '2bach-ccss'].flatMap((courseId) => runtime.challengeRecords(courseId));
const availableExerciseIds = new Set(available.map((record) => record.parentExerciseId || record.exerciseId));
const parameterPattern = /(?:disc[uú]t\w*|seg[uú]n los valores).*sistema|sistema.*(?:par[aá]metro|disc[uú]t\w*)/i;
const parameterIds = raw.filter((record) => parameterPattern.test(record.officialPromptLiteral || record.learnerStatement || '')).map((record) => record.exerciseId);
const parameterRecords = raw.filter((record) => parameterIds.includes(record.exerciseId));
const parameterSolutions = parameterRecords.map((record) => ({
  id: record.exerciseId,
  solution: record.parts.flatMap((part) => part.solutionSteps || []).join('\n')
}));

const byCourse = Object.fromEntries(['2bach-mates', '2bach-ccss'].map((courseId) => {
  const challenge = runtime.challengeRecords(courseId);
  const requiredExamSlots = courseId === '2bach-ccss' ? [1, 2, 3, 4] : [1, 2, 3, 4, 5];
  const byExamSlot = Object.fromEntries([1, 2, 3, 4, 5].map((slot) => [slot, runtime.examSlotRecords(courseId, slot).length]));
  const examFormCapacity = requiredExamSlots
    .reduce((capacity, slot) => capacity * BigInt(byExamSlot[slot]), 1n)
    .toString();
  return [courseId, {
    challengeParts: challenge.length,
    exercises: new Set(challenge.map((record) => record.parentExerciseId || record.exerciseId)).size,
    byTopic: Object.fromEntries([...new Set(challenge.flatMap((record) => record.topicIndexes))].sort((a, b) => a - b).map((index) => [index, runtime.topicRecords(courseId, index).length])),
    byBlock: Object.fromEntries(Object.entries(runtime.banks(courseId)).map(([block, records]) => [block, records.length])),
    byExamSlot,
    examFormCapacity
  }];
}));

const summary = {
  schemaVersion: 'mathup.andalucia-global-delivery-report.v1',
  sourceDocuments: Object.keys(context.window.ANDALUCIA_USER_SOURCE_INDEX).length,
  rawExercises: raw.length,
  rawParts: raw.reduce((sum, record) => sum + record.parts.length, 0),
  interactiveBlockedExercises: runtime.interactiveDeliveryBlockedTotal,
  interactiveEligibleExercises: raw.length - runtime.interactiveDeliveryBlockedTotal,
  classificationCorrections: runtime.globalClassificationCorrectionTotal,
  segmentationBlockedExercises: runtime.globalSegmentationBlockedIds.length,
  parameterSystemDiscussions: {
    total: parameterIds.length,
    eligible: parameterIds.filter((id) => availableExerciseIds.has(id)).length,
    blocked: parameterIds.filter((id) => !availableExerciseIds.has(id)).length,
    evidence: {
      roucheFrobenius: parameterSolutions.filter((row) => /Rouch[eé]|Rouché/i.test(row.solution)).length,
      coefficientRank: parameterSolutions.filter((row) => /(?:rg|rango)\s*\(\s*A\s*\)/i.test(row.solution)).length,
      augmentedRank: parameterSolutions.filter((row) => /(?:rg|rango)\s*\(\s*A\s*[*⁎]?\s*\)|matriz ampliada/i.test(row.solution)).length,
      explicitOrderTwoMinor: parameterSolutions.filter((row) => /menor\s+(?:(?:de\s+)?orden\s*2|2\s*[x×]\s*2)/i.test(row.solution)).length
    }
  },
  referenceTables: {
    normal: raw.filter((record) => record.referenceTable === 'normal').length,
    binomial: raw.filter((record) => record.referenceTable === 'binomial').length,
    none: raw.filter((record) => !record.referenceTable).length
  },
  byCourse
};
const out = path.join(root, 'artifacts', 'andalucia-global-correction', 'delivery-report.json');
fs.writeFileSync(out, `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));

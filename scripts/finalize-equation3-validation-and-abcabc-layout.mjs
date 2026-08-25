import fs from 'node:fs';
import path from 'node:path';
import { sha256, deriveExerciseStatuses } from '../catalog/equation3-human-comparison/human-comparison.mjs';
import { reconstructPairedLabeledMatrices, validatePairedLabeledMatrices } from '../catalog/equation3-andalucia-2012/document-layout-reconstruction.mjs';
import { publicDecision, publicDecisionSetSha256, reviewSequenceMap, PUBLIC_REVIEWER_ID, PUBLIC_REVIEW_DATE } from '../catalog/equation3-human-comparison/public-review-evidence.mjs';

const root = path.resolve(import.meta.dirname, '..');
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const readJsonl = (relative) => fs.readFileSync(path.join(root, relative), 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
const writeJsonl = (relative, rows) => fs.writeFileSync(path.join(root, relative), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`, 'utf8');

const outDir = path.join(root, 'artifacts/equation3-human-validation-final');
fs.mkdirSync(outDir, { recursive: true });
const firstStatePath = 'artifacts/equation3-human-comparison/local-state/review-state.json';
const secondStatePath = 'artifacts/equation3-human-comparison/local-state/recheck-10-state.json';
const firstState = readJson(firstStatePath);
const secondState = readJson(secondStatePath);
const queue = readJsonl('artifacts/equation3-human-comparison/review-queue.jsonl');
const corrections = readJsonl('artifacts/equation3-post-human-correction/correction-cases-10.jsonl');
const failureRows = readJsonl('artifacts/equation3-human-review-result/failure-classification.jsonl');
const corrected = readJsonl('artifacts/equation3-post-human-correction/corrected-equations-55.jsonl');
const exercises = readJsonl('artifacts/andalucia-ccssii-2012-doc/runs/run-a/recovered-exercises.jsonl');
const incidents = readJsonl('artifacts/equation3-human-review-result/spatial-layout-incidents.jsonl');
const abcabcDecisionPath = 'artifacts/equation3-human-validation-final/abcabc-human-decision.json';

const firstDecisions = Object.values(firstState.decisions).sort((a, b) => a.objectId.localeCompare(b.objectId));
const secondDecisions = Object.values(secondState.decisions).sort((a, b) => a.objectId.localeCompare(b.objectId));
const firstSequenceById = reviewSequenceMap(firstDecisions);
const secondSequenceById = reviewSequenceMap(secondDecisions);
const publicFirstDecisions = firstDecisions.map((row) => publicDecision(row, firstSequenceById.get(row.objectId)));
const publicSecondDecisions = secondDecisions.map((row) => publicDecision(row, secondSequenceById.get(row.objectId)));
const firstPublicSha256 = publicDecisionSetSha256(publicFirstDecisions);
const secondPublicSha256 = publicDecisionSetSha256(publicSecondDecisions);
if (firstDecisions.length !== 55 || secondDecisions.length !== 10) throw new Error('Las capas humanas no tienen 55 y 10 decisiones.');
if (secondDecisions.some((row) => row.decision !== 'COINCIDE') || new Set(secondDecisions.map((row) => row.reviewerId)).size !== 1 || !secondDecisions[0]?.reviewerId) throw new Error('La segunda revision no es 10/10 COINCIDE por un unico revisor identificado.');

const correctionById = new Map(corrections.map((row) => [row.objectId, row]));
const failureById = new Map(failureRows.map((row) => [row.objectId, row]));
const secondById = new Map(secondDecisions.map((row) => [row.objectId, row]));
const lineage = firstDecisions.filter((row) => row.decision === 'NO_COINCIDE').map((original) => ({
  schemaVersion: 'mathup.equation3-human-review-lineage.v1',
  objectId: original.objectId,
  originalDecision: publicDecision(original, firstSequenceById.get(original.objectId)),
  diagnostic: failureById.get(original.objectId),
  correction: correctionById.get(original.objectId),
  recheckDecision: publicDecision(secondById.get(original.objectId), secondSequenceById.get(original.objectId)),
  transition: 'NO_COINCIDE -> DIAGNOSIS -> CORRECTION -> COINCIDE',
}));
if (lineage.some((row) => !row.diagnostic || !row.correction || row.recheckDecision?.decision !== 'COINCIDE')) throw new Error('Trazabilidad incompleta en la segunda revision.');

const finalDecisions = Object.fromEntries(firstDecisions.map((row) => [row.objectId, secondById.get(row.objectId) ?? row]));
const objectStatuses = queue.map((item) => ({
  schemaVersion: 'mathup.equation3-human-validation-status.v1',
  objectId: item.objectId,
  documentExerciseId: item.documentExerciseId,
  status: finalDecisions[item.objectId]?.decision === 'COINCIDE' ? 'EQUATION3_HUMAN_VALIDATED' : 'EQUATION3_REVIEW_REQUIRED',
  firstDecision: firstState.decisions[item.objectId]?.decision,
  secondDecision: secondState.decisions[item.objectId]?.decision ?? null,
  finalEvidenceLayer: secondState.decisions[item.objectId] ? 'RECHECK_10' : 'FIRST_REVIEW',
}));
if (objectStatuses.some((row) => row.status !== 'EQUATION3_HUMAN_VALIDATED')) throw new Error('No estan validados los 55 objetos.');
const exerciseStatuses = deriveExerciseStatuses(queue, finalDecisions).map((row) => ({ ...row, schemaVersion: 'mathup.equation3-exercise-validation-status.v1' }));
if (exerciseStatuses.length !== 27 || exerciseStatuses.some((row) => row.status !== 'EQUATION3_HUMAN_VALIDATED')) throw new Error('No estan validados los 27 ejercicios dependientes.');

const targetExercise = exercises.find((row) => row.documentExerciseId === 'ade2012-m6-a-e1-61f8d5d80988');
const targetEquation = corrected.find((row) => row.objectId === 'adobj-61f8d5d809881c49-001');
const targetIncident = incidents.find((row) => row.documentExerciseId === targetExercise.documentExerciseId);
const layout = reconstructPairedLabeledMatrices({ exercise: targetExercise, equation: targetEquation, incident: targetIncident });
const correctedById = new Map(corrected.map((row) => [row.objectId, row]));
layout.learnerView.remainingBlocks = layout.learnerView.remainingBlocks.map((block) => block.type === 'document-object'
  ? { ...block, mathml: correctedById.get(block.objectId)?.derived?.mathml ?? null, mathmlSha256: correctedById.get(block.objectId)?.derived?.mathmlSha256 ?? null }
  : block);
layout.reconstructionSha256 = sha256(Object.fromEntries(Object.entries(layout).filter(([key]) => key !== 'reconstructionSha256')));
validatePairedLabeledMatrices(layout);

const abcabcDecision = readJson(abcabcDecisionPath);
if (abcabcDecision.explicitHumanAction !== true || abcabcDecision.decision !== 'COINCIDE') throw new Error('Falta el dictamen humano explicito de ABCABC.');
if (abcabcDecision.documentExerciseId !== targetExercise.documentExerciseId) throw new Error('El dictamen ABCABC pertenece a otro ejercicio.');
if (abcabcDecision.reconstructionSha256 !== layout.reconstructionSha256) throw new Error('La reconstruccion ABCABC cambio despues del dictamen humano.');
layout.status = 'DOCUMENT_LAYOUT_HUMAN_VALIDATED';
const publicAbcabcDecision = {
  schemaVersion: 'mathup.document-layout-human-decision.public.v1',
  documentExerciseId: abcabcDecision.documentExerciseId,
  reconstructionSha256: abcabcDecision.reconstructionSha256,
  explicitHumanConfirmation: true,
  explicitHumanAction: true,
  decision: 'COINCIDE',
  reviewerId: PUBLIC_REVIEWER_ID,
  reviewDate: PUBLIC_REVIEW_DATE,
  reviewSequence: 1,
};
layout.humanDecision = publicAbcabcDecision;

writeJson(abcabcDecisionPath, publicAbcabcDecision);
writeJsonl('artifacts/equation3-human-validation-final/first-review-decisions.jsonl', publicFirstDecisions);
writeJsonl('artifacts/equation3-human-validation-final/second-review-decisions.jsonl', publicSecondDecisions);
writeJsonl('artifacts/equation3-human-validation-final/decision-lineage.jsonl', lineage);
writeJsonl('artifacts/equation3-human-validation-final/object-validation-statuses.jsonl', objectStatuses);
writeJsonl('artifacts/equation3-human-validation-final/exercise-validation-statuses.jsonl', exerciseStatuses);
writeJson('artifacts/equation3-human-validation-final/abcabc-layout-reconstruction.json', layout);
const summary = {
  schemaVersion: 'mathup.equation3-human-validation-summary.v1',
  firstReview: { total: 55, COINCIDE: 45, NO_COINCIDE: 10, DUDOSO: 0, reviewer: PUBLIC_REVIEWER_ID, reviewDate: PUBLIC_REVIEW_DATE, publicDecisionSetSha256: firstPublicSha256 },
  secondReview: { total: 10, COINCIDE: 10, NO_COINCIDE: 0, DUDOSO: 0, reviewer: PUBLIC_REVIEWER_ID, reviewDate: PUBLIC_REVIEW_DATE, publicDecisionSetSha256: secondPublicSha256 },
  final: { validatedObjects: 55, validatedDependentExercises: 27, independentExercises: 21, totalExercises: 48, unaffectedExercises: 47, integrationAuthorized: false },
  abcabc: {
    status: 'DOCUMENT_LAYOUT_HUMAN_VALIDATED',
    documentExerciseId: targetExercise.documentExerciseId,
    reconstructionSha256: layout.reconstructionSha256,
    decision: abcabcDecision.decision,
    reviewer: publicAbcabcDecision.reviewerId,
    reviewDate: publicAbcabcDecision.reviewDate,
    reviewSequence: publicAbcabcDecision.reviewSequence,
    explicitHumanAction: true,
    integrationAuthorized: false,
  },
  sourceArtifacts: {
    recoveredExercisesSha256: sha256(fs.readFileSync(path.join(root, 'artifacts/andalucia-ccssii-2012-doc/runs/run-a/recovered-exercises.jsonl'))),
    correctedEquations55Sha256: sha256(fs.readFileSync(path.join(root, 'artifacts/equation3-post-human-correction/corrected-equations-55.jsonl'))),
    regression45Sha256: sha256(fs.readFileSync(path.join(root, 'artifacts/equation3-post-human-correction/regression-45.jsonl'))),
  },
};
writeJson('artifacts/equation3-human-validation-final/summary.json', summary);
writeJson('artifacts/equation3-human-validation-final/rollback.json', {
  deletesOnly: ['artifacts/equation3-human-validation-final'],
  sourceFilesModified: false,
  firstPublicDecisionSetSha256: summary.firstReview.publicDecisionSetSha256,
  secondPublicDecisionSetSha256: summary.secondReview.publicDecisionSetSha256,
  abcabcHumanDecisionSha256: sha256(fs.readFileSync(path.join(root, abcabcDecisionPath))),
});
console.log(JSON.stringify(summary, null, 2));

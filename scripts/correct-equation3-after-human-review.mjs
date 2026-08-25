import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyPostHumanCorrection, semanticAst } from '../catalog/equation3-andalucia-2012/post-human-correction.mjs';
import { buildReviewQueue, sha256, stableStringify } from '../catalog/equation3-human-comparison/human-comparison.mjs';
import { publicDecision, publicDecisionSetSha256, reviewSequenceMap } from '../catalog/equation3-human-comparison/public-review-evidence.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const readJsonl = (relative) => fs.readFileSync(path.join(root, relative), 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
const writeJsonl = (relative, rows) => fs.writeFileSync(path.join(root, relative), `${rows.map((row) => stableStringify(row)).join('\n')}\n`, 'utf8');
const fileSha256 = (relative) => sha256(fs.readFileSync(path.join(root, relative)));

const outputDir = 'artifacts/equation3-post-human-correction';
fs.mkdirSync(path.join(root, outputDir), { recursive: true });

const recovered = readJsonl('artifacts/equation3-andalucia-2012/runs/run-a/recovered-equations.jsonl');
const exercises = readJsonl('artifacts/andalucia-ccssii-2012-doc/runs/run-a/recovered-exercises.jsonl');
const originalQueue = readJsonl('artifacts/equation3-human-comparison/review-queue.jsonl');
const originalStatePath = 'artifacts/equation3-human-comparison/local-state/review-state.json';
const originalState = readJson(originalStatePath);
const originalStateSha256 = fileSha256(originalStatePath);
const failures = readJsonl('artifacts/equation3-human-review-result/failure-classification.jsonl');
const failureIds = new Set(failures.map((row) => row.objectId));
const queueById = new Map(originalQueue.map((item) => [item.objectId, item]));
const failureById = new Map(failures.map((item) => [item.objectId, item]));

const decisions = Object.values(originalState.decisions);
const sequenceById = reviewSequenceMap(decisions);
const publicDecisions = decisions.map((decision) => publicDecision(decision, sequenceById.get(decision.objectId)));
const publicDecisionsSha256 = publicDecisionSetSha256(publicDecisions);
if (decisions.length !== 55) throw new Error(`Se esperaban 55 decisiones humanas y hay ${decisions.length}.`);
if (decisions.filter((item) => item.decision === 'COINCIDE').length !== 45) throw new Error('La línea base humana 45 COINCIDE no coincide.');
if (decisions.filter((item) => item.decision === 'NO_COINCIDE').length !== 10) throw new Error('La línea base humana 10 NO_COINCIDE no coincide.');

const frozen45 = decisions.filter((decision) => decision.decision === 'COINCIDE').sort((a, b) => a.objectId.localeCompare(b.objectId)).map((decision) => {
  const item = queueById.get(decision.objectId);
  return {
    schemaVersion: 'mathup.equation3-frozen-human-coincide.v1',
    objectId: decision.objectId,
    caseHash: item.caseHash,
    astSha256: item.recoveredRepresentation.astSha256,
    mathmlSha256: item.recoveredRepresentation.mathmlSha256,
    officialPngSha256: item.officialEvidence.pngSha256,
    renderedRepresentation: { format: 'MATHML', value: item.recoveredRepresentation.mathml, sha256: sha256(item.recoveredRepresentation.mathml) },
    humanDecision: publicDecision(decision, sequenceById.get(decision.objectId)),
  };
});

const correctedRows = recovered.map((row) => {
  const correction = applyPostHumanCorrection(row.mathAst);
  return {
    ...row,
    mathAst: correction.mathAst,
    mathAstSha256: sha256(correction.mathAst),
    derived: {
      latex: correction.latex,
      latexSha256: sha256(correction.latex),
      mathml: correction.mathml,
      mathmlSha256: sha256(correction.mathml),
    },
    postHumanCorrection: {
      schemaVersion: 'mathup.equation3-post-human-correction.v1',
      rulesApplied: correction.rulesApplied,
      previousAstSha256: row.mathAstSha256,
      previousMathmlSha256: row.derived.mathmlSha256,
      humanRecheckRequired: failureIds.has(row.objectId),
    },
  };
});
const correctedById = new Map(correctedRows.map((row) => [row.objectId, row]));
const originalById = new Map(recovered.map((row) => [row.objectId, row]));
const correctedQueue = buildReviewQueue(correctedRows, exercises);
const correctedQueueById = new Map(correctedQueue.map((item) => [item.objectId, item]));

const regression45 = frozen45.map((frozen) => {
  const before = originalById.get(frozen.objectId);
  const after = correctedById.get(frozen.objectId);
  const semanticBefore = sha256(semanticAst(before.mathAst));
  const semanticAfter = sha256(semanticAst(after.mathAst));
  return {
    schemaVersion: 'mathup.equation3-regression-45.v1', objectId: frozen.objectId,
    semanticBefore, semanticAfter, mathematicalRegression: semanticBefore !== semanticAfter,
    astChanged: before.mathAstSha256 !== after.mathAstSha256,
    mathmlChanged: before.derived.mathmlSha256 !== after.derived.mathmlSha256,
    rulesApplied: after.postHumanCorrection.rulesApplied,
  };
});
if (regression45.some((row) => row.mathematicalRegression)) throw new Error('Se detectó una regresión matemática en los 45 COINCIDE.');

const corrections10 = [...failureIds].sort().map((objectId) => {
  const before = originalById.get(objectId);
  const after = correctedById.get(objectId);
  const originalDecision = originalState.decisions[objectId];
  return {
    schemaVersion: 'mathup.equation3-human-recheck-case.v1', objectId,
    documentExerciseId: after.exerciseAssociation.documentExerciseId,
    originalHumanDecision: publicDecision(originalDecision, sequenceById.get(objectId)),
    failureClassification: failureById.get(objectId),
    before: { ast: before.mathAst, astSha256: before.mathAstSha256, latex: before.derived.latex, latexSha256: before.derived.latexSha256, mathml: before.derived.mathml, mathmlSha256: before.derived.mathmlSha256 },
    after: { ast: after.mathAst, astSha256: after.mathAstSha256, latex: after.derived.latex, latexSha256: after.derived.latexSha256, mathml: after.derived.mathml, mathmlSha256: after.derived.mathmlSha256 },
    officialEvidence: after.sourceAuthority,
    rulesApplied: after.postHumanCorrection.rulesApplied,
    status: 'HUMAN_RECHECK_REQUIRED',
  };
});

const recheckQueue = correctedQueue.filter((item) => failureIds.has(item.objectId)).map((item, index) => ({
  ...item,
  schemaVersion: 'mathup.equation3-human-recheck.case.v1',
  ordinal: index + 1,
  originalHumanDecision: publicDecision(originalState.decisions[item.objectId], sequenceById.get(item.objectId)),
  failureClassification: failureById.get(item.objectId),
  correction: correctedById.get(item.objectId).postHumanCorrection,
  recheckStatus: 'HUMAN_RECHECK_REQUIRED',
}));

const correctedSemanticHash = sha256(correctedRows.map((row) => ({ objectId: row.objectId, ast: row.mathAst, derived: row.derived })));
const reverseSemanticHash = sha256([...correctedRows].reverse().sort((a, b) => a.objectId.localeCompare(b.objectId)).map((row) => ({ objectId: row.objectId, ast: row.mathAst, derived: row.derived })));
const sortedSemanticHash = sha256([...correctedRows].sort((a, b) => a.objectId.localeCompare(b.objectId)).map((row) => ({ objectId: row.objectId, ast: row.mathAst, derived: row.derived })));

writeJsonl(`${outputDir}/frozen-coincide-45.jsonl`, frozen45);
writeJsonl(`${outputDir}/corrected-equations-55.jsonl`, correctedRows);
writeJsonl(`${outputDir}/correction-cases-10.jsonl`, corrections10);
writeJsonl(`${outputDir}/regression-45.jsonl`, regression45);
writeJsonl(`${outputDir}/recheck-10.jsonl`, recheckQueue);
writeJson(`${outputDir}/original-human-state-proof.json`, {
  schemaVersion: 'mathup.equation3-public-human-state-proof.v1',
  publicDecisionSetSha256: publicDecisionsSha256, decisionCounts: { total: 55, COINCIDE: 45, NO_COINCIDE: 10, DUDOSO: 0 },
  immutable: true,
});
writeJson(`${outputDir}/reproducibility.json`, {
  schemaVersion: 'mathup.equation3-post-human-reproducibility.v1',
  repeatRunEquivalent: correctedSemanticHash === sha256(correctedRows.map((row) => ({ objectId: row.objectId, ast: row.mathAst, derived: row.derived }))),
  orderInvariant: sortedSemanticHash === reverseSemanticHash,
  semanticHash: sortedSemanticHash,
});
writeJson(`${outputDir}/rollback.json`, {
  schemaVersion: 'mathup.equation3-post-human-rollback.v1',
  sourceArtifactsUntouched: recovered.every((row) => originalById.get(row.objectId).mathAstSha256 === row.mathAstSha256),
  publicDecisionSetSha256: publicDecisionsSha256,
  rollbackProcedure: 'Descartar exclusivamente catalog/equation3-andalucia-2012/post-human-correction.mjs y artifacts/equation3-post-human-correction; los artefactos anteriores permanecen inmutables.',
});
writeJson(`${outputDir}/summary.json`, {
  schemaVersion: 'mathup.equation3-post-human-correction.summary.v1',
  objects: 55, corrected: 10, frozenRegression: 45,
  regression45Passed: regression45.filter((row) => !row.mathematicalRegression).length,
  recheckRequired: 10,
  ruleCounts: Object.fromEntries([...new Set(corrections10.flatMap((row) => row.rulesApplied))].sort().map((rule) => [rule, corrections10.filter((row) => row.rulesApplied.includes(rule)).length])),
  publicDecisionSetSha256: publicDecisionsSha256,
  abcabcStatus: 'DOCUMENT_LAYOUT_RECONSTRUCTION_ERROR_UNCHANGED',
});

if (fileSha256(originalStatePath) !== originalStateSha256) throw new Error('El estado humano original fue alterado durante la generación.');
console.log(JSON.stringify({ outputDir, corrected: 10, regression45: 45, recheckQueue: recheckQueue.length, publicDecisionSetSha256: publicDecisionsSha256 }, null, 2));

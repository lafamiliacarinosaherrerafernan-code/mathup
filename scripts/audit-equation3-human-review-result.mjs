import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { publicDecision, publicDecisionSetSha256, reviewSequenceMap, PUBLIC_REVIEWER_ID } from '../catalog/equation3-human-comparison/public-review-evidence.mjs';

const ROOT = process.cwd();
const STATE_PATH = 'artifacts/equation3-human-comparison/local-state/review-state.json';
const QUEUE_PATH = 'artifacts/equation3-human-comparison/review-queue.jsonl';
const EQUATIONS_PATH = 'artifacts/equation3-andalucia-2012/runs/run-a/recovered-equations.jsonl';
const EXERCISES_PATH = 'artifacts/andalucia-ccssii-2012-doc/runs/run-a/recovered-exercises.jsonl';
const OUTPUT_DIR = 'artifacts/equation3-human-review-result';

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function readJsonl(relativePath) {
  const text = fs.readFileSync(path.join(ROOT, relativePath), 'utf8').trim();
  return text ? text.split(/\r?\n/).map((line) => JSON.parse(line)) : [];
}

function sha256Bytes(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function sha256File(relativePath) {
  return sha256Bytes(fs.readFileSync(path.join(ROOT, relativePath)));
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function stableStringify(value) {
  return JSON.stringify(stable(value));
}

function writeJson(relativePath, value) {
  fs.writeFileSync(path.join(ROOT, relativePath), `${JSON.stringify(value, null, 2)}\n`);
}

function writeJsonl(relativePath, rows) {
  fs.writeFileSync(path.join(ROOT, relativePath), `${rows.map((row) => stableStringify(row)).join('\n')}\n`);
}

const FAILURE_RULES = {
  'adobj-bcec57ae525fa5e2-006': {
    categories: ['CONTENT_MISMATCH', 'DELIMITER_SIZE_ERROR', 'SYMBOL_ERROR'],
    layer: 'DERIVED_REPRESENTATION',
    diagnosis: 'Los paréntesis de P(t) se componen sobredimensionados y la llave unilateral MTEF se deriva como pareja de llaves.',
    proposedCorrection: 'Respetar mtefTemplate.variation=1 como delimitador izquierdo único y no hacer stretchy los paréntesis ordinarios de llamada a función.'
  },
  'adobj-bcec57ae525fa5e2-003': {
    categories: ['DELIMITER_SIZE_ERROR'],
    layer: 'DERIVED_REPRESENTATION',
    diagnosis: 'Los paréntesis ordinarios de f(x) se escalan como delimitadores de la expresión completa.',
    proposedCorrection: 'Diferenciar paréntesis literales de llamada a función de delimitadores adaptativos.'
  },
  'adobj-c8688a19515dfeb3-005': {
    categories: ['DELIMITER_SIZE_ERROR'],
    layer: 'DERIVED_REPRESENTATION',
    diagnosis: 'Los paréntesis ordinarios de f(t) se escalan indebidamente.',
    proposedCorrection: 'Diferenciar paréntesis literales de llamada a función de delimitadores adaptativos.'
  },
  'adobj-c8688a19515dfeb3-001': {
    categories: ['CONTENT_MISMATCH', 'DELIMITER_SIZE_ERROR', 'SYMBOL_ERROR'],
    layer: 'DERIVED_REPRESENTATION',
    diagnosis: 'Los paréntesis de f(x) se sobredimensionan y aparece una llave derecha que no existe en el objeto oficial.',
    proposedCorrection: 'Conservar la unilateralidad documentada por mtefTemplate.variation=1 al derivar MathML/LaTeX.'
  },
  'adobj-8446c5da6b4b7cfc-009': {
    categories: ['CONTENT_MISMATCH', 'DELIMITER_SIZE_ERROR', 'SYMBOL_ERROR'],
    layer: 'DERIVED_REPRESENTATION',
    diagnosis: 'Los paréntesis de B(t) se sobredimensionan y la llave izquierda oficial se convierte en llaves simétricas.',
    proposedCorrection: 'Conservar la unilateralidad documentada por mtefTemplate.variation=1 al derivar MathML/LaTeX.'
  },
  'adobj-8446c5da6b4b7cfc-003': {
    categories: ['CONTENT_MISMATCH', 'DELIMITER_SIZE_ERROR', 'SYMBOL_ERROR'],
    layer: 'DERIVED_REPRESENTATION',
    diagnosis: 'Los paréntesis de f(x) se sobredimensionan y la representación derivada añade una llave derecha ausente en el oficial.',
    proposedCorrection: 'Conservar la unilateralidad documentada por mtefTemplate.variation=1 al derivar MathML/LaTeX.'
  },
  'adobj-8446c5da6b4b7cfc-004': {
    categories: ['DELIMITER_SIZE_ERROR'],
    layer: 'DERIVED_REPRESENTATION',
    diagnosis: 'Los paréntesis ordinarios de g(x) se escalan indebidamente.',
    proposedCorrection: 'Diferenciar paréntesis literales de llamada a función de delimitadores adaptativos.'
  },
  'adobj-87b729cdd4632386-001': {
    categories: ['DELIMITER_SIZE_ERROR'],
    layer: 'DERIVED_REPRESENTATION',
    diagnosis: 'Los paréntesis ordinarios de f(x) se escalan indebidamente.',
    proposedCorrection: 'Diferenciar paréntesis literales de llamada a función de delimitadores adaptativos.'
  },
  'adobj-61f8d5d809881c49-008': {
    categories: ['DELIMITER_SIZE_ERROR'],
    layer: 'DERIVED_REPRESENTATION',
    diagnosis: 'Los paréntesis ordinarios de g(x) se escalan indebidamente.',
    proposedCorrection: 'Diferenciar paréntesis literales de llamada a función de delimitadores adaptativos.'
  },
  'adobj-61f8d5d809881c49-009': {
    categories: ['CONTENT_MISMATCH', 'SUPERSCRIPT_SUBSCRIPT_ERROR', 'SPACING_LAYOUT_ERROR'],
    layer: 'AST_DECODING',
    diagnosis: 'El AST aplica el exponente 6 al token de paréntesis de cierre en vez de al grupo (3x²+5x−1), aunque el LaTeX derivado intenta reagruparlo.',
    proposedCorrection: 'Corregir de forma general la decodificación MTEF de script sobre grupos delimitados; la base del power debe ser el grupo completo.'
  }
};

const stateBytes = fs.readFileSync(path.join(ROOT, STATE_PATH));
const state = JSON.parse(stateBytes.toString('utf8'));
const stateSha256 = sha256Bytes(stateBytes);
const queue = readJsonl(QUEUE_PATH);
const equations = readJsonl(EQUATIONS_PATH);
const exercises = readJsonl(EXERCISES_PATH);
const equationById = new Map(equations.map((row) => [row.objectId, row]));
const queueById = new Map(queue.map((row) => [row.objectId, row]));
const exerciseById = new Map(exercises.map((row) => [row.documentExerciseId, row]));
const decisions = Object.values(state.decisions || {}).sort((a, b) => a.objectId.localeCompare(b.objectId));
const sequenceById = reviewSequenceMap(decisions);
const publicDecisions = decisions.map((decision) => publicDecision(decision, sequenceById.get(decision.objectId)));
const decisionSetSha256 = publicDecisionSetSha256(publicDecisions);

if (queue.length !== 55 || decisions.length !== 55) throw new Error('La cola y las decisiones deben contener exactamente 55 objetos.');
const counts = Object.fromEntries(['COINCIDE', 'NO_COINCIDE', 'DUDOSO'].map((name) => [name, decisions.filter((row) => row.decision === name).length]));
if (counts.COINCIDE !== 45 || counts.NO_COINCIDE !== 10 || counts.DUDOSO !== 0) throw new Error(`Recuento humano inesperado: ${JSON.stringify(counts)}`);
if (decisions.some((row) => row.explicitHumanAction !== true)) throw new Error('Existe una decisión sin acción humana explícita.');
if (new Set(decisions.map((row) => row.reviewerId)).size !== 1 || !decisions[0].reviewerId) throw new Error('Las 55 decisiones no pertenecen a un unico revisor identificado.');

const decisionExport = decisions.map((decision) => {
  const safeDecision = publicDecision(decision, sequenceById.get(decision.objectId));
  const reviewCase = queueById.get(decision.objectId);
  const equation = equationById.get(decision.objectId);
  if (!reviewCase || !equation) throw new Error(`Falta evidencia para ${decision.objectId}`);
  for (const [actual, expected, label] of [
    [decision.caseHash, reviewCase.caseHash, 'caseHash'],
    [decision.officialPngSha256, reviewCase.officialEvidence.pngSha256, 'officialPngSha256'],
    [decision.mathAstSha256, reviewCase.recoveredRepresentation.astSha256, 'mathAstSha256'],
    [decision.mathmlSha256, reviewCase.recoveredRepresentation.mathmlSha256, 'mathmlSha256']
  ]) if (actual !== expected) throw new Error(`${decision.objectId}: ${label} no coincide con la cola versionada.`);
  return {
    schemaVersion: 'mathup.equation3-human-review-audit.v1',
    objectId: decision.objectId,
    decision: safeDecision.decision,
    comment: safeDecision.comment,
    reviewerId: safeDecision.reviewerId,
    reviewDate: safeDecision.reviewDate,
    reviewSequence: safeDecision.reviewSequence,
    explicitHumanAction: true,
    contextMappingStatus: decision.contextMappingStatus,
    document: {
      documentId: reviewCase.documentId,
      path: reviewCase.documentPath,
      sha256: reviewCase.documentSha256,
      model: reviewCase.model,
      option: reviewCase.option
    },
    exercise: {
      documentExerciseId: reviewCase.documentExerciseId,
      exerciseNumber: reviewCase.exerciseNumber,
      subpart: reviewCase.subpart,
      scope: reviewCase.scope,
      sourceRange: reviewCase.sourceRange
    },
    officialObject: {
      class: 'Equation.3',
      oleStoragePath: reviewCase.officialEvidence.oleStoragePath,
      pngPath: reviewCase.officialEvidence.pngPath,
      pngSha256: reviewCase.officialEvidence.pngSha256,
      emfPath: reviewCase.officialEvidence.emfPath,
      emfSha256: reviewCase.officialEvidence.emfSha256,
      nativePath: reviewCase.officialEvidence.nativePath,
      nativeSha256: reviewCase.officialEvidence.nativeSha256,
      mtefPath: reviewCase.officialEvidence.mtefPath,
      mtefSha256: reviewCase.officialEvidence.mtefSha256
    },
    recovered: {
      astSchemaVersion: reviewCase.recoveredRepresentation.astSchemaVersion,
      astSha256: equation.mathAstSha256,
      ast: equation.mathAst,
      mathmlSha256: equation.derived.mathmlSha256,
      mathml: equation.derived.mathml,
      latexSha256: equation.derived.latexSha256,
      latex: equation.derived.latex
    },
    integrity: { caseHash: reviewCase.caseHash, publicDecisionSetSha256: decisionSetSha256 }
  };
});

const failures = decisionExport.filter((row) => row.decision === 'NO_COINCIDE').map((row) => ({
  schemaVersion: 'mathup.equation3-human-failure-classification.v1',
  objectId: row.objectId,
  documentExerciseId: row.exercise.documentExerciseId,
  subpart: row.exercise.subpart,
  comment: row.comment,
  reviewerId: row.reviewerId,
  ...FAILURE_RULES[row.objectId]
}));
if (failures.some((row) => !row.categories)) throw new Error('Falta clasificación para algún NO_COINCIDE.');

const affectedExercises = new Set(failures.map((row) => row.documentExerciseId));
const dependentExercises = new Set(queue.map((row) => row.documentExerciseId));
const allCoincideDependent = [...dependentExercises].filter((id) => !affectedExercises.has(id)).sort();
const noEquationExercises = exercises.filter((row) => (row.documentObjects || []).length === 0).map((row) => row.documentExerciseId).sort();
if (dependentExercises.size !== 27 || allCoincideDependent.length !== 19 || affectedExercises.size !== 8 || noEquationExercises.length !== 21) {
  throw new Error('La conciliación por ejercicio no coincide con 27 dependientes, 19 validados, 8 afectados y 21 independientes.');
}

const abcExerciseId = 'ade2012-m6-a-e1-61f8d5d80988';
const abcExercise = exerciseById.get(abcExerciseId);
const abcHeaderBlock = abcExercise.learnerBlocks.find((block) => block.type === 'text' && /A\s+B\s+C\s+A\s+B\s+C/.test(block.text.replace(/\s+/g, ' ')));
if (!abcHeaderBlock) throw new Error('No se localizó la incidencia ABCABC en el ejercicio esperado.');
const spatialIncidents = [{
  schemaVersion: 'mathup.document-layout-reconstruction-incident.v1',
  incidentId: 'layout-ade2012-m6-a-e1-column-headers',
  classification: 'DOCUMENT_LAYOUT_RECONSTRUCTION_ERROR',
  documentExerciseId: abcExerciseId,
  documentId: abcExercise.documentId,
  documentPath: abcExercise.traceability.sourcePath,
  documentSha256: abcExercise.sourceDocumentSha256,
  model: abcExercise.model,
  option: abcExercise.option,
  exerciseNumber: abcExercise.exerciseNumber,
  literalExtracted: 'A B C A B C',
  originalStructure: 'Primer A/B/C anclado sobre las tres columnas de F; segundo A/B/C anclado sobre las tres columnas de G.',
  anchorEvidence: {
    textPrecedesObjectId: 'adobj-61f8d5d809881c49-001',
    equationContains: ['F', 'G', 'dos matrices de 2x3'],
    officialPngPath: 'artifacts/andalucia-ccssii-2012-doc/document-objects/adobj-61f8d5d809881c49-001.png',
    officialPngSha256: sha256File('artifacts/andalucia-ccssii-2012-doc/document-objects/adobj-61f8d5d809881c49-001.png')
  },
  rootCause: 'Word codifica las cabeceras como texto espaciado previo al objeto Equation.3; el modelo lineal de bloques conserva caracteres y orden, pero no coordenadas ni anclaje a columnas.',
  requiredFutureStructure: {
    type: 'paired-labeled-matrices',
    items: [
      { matrixLabel: 'F', columnHeaders: ['A', 'B', 'C'], matrixObjectId: 'adobj-61f8d5d809881c49-001', matrixSegment: 0 },
      { matrixLabel: 'G', columnHeaders: ['A', 'B', 'C'], matrixObjectId: 'adobj-61f8d5d809881c49-001', matrixSegment: 1 }
    ],
    note: 'La futura estructura debe derivarse de la geometría oficial; no borrar ni concatenar las etiquetas.'
  },
  automaticCorrectionAuthorized: false
}];

const layoutCandidates = exercises.flatMap((exercise) => (exercise.learnerBlocks || [])
  .filter((block) => block.type === 'text')
  .flatMap((block) => block.text.split(/\n/).filter((line) => /\S\s{3,}\S|(?:\b[A-Z]\b\s*){3,}/.test(line)).map((line) => ({ exercise, line }))));
const otherSpatialFindings = layoutCandidates.filter(({ exercise, line }) => exercise.documentExerciseId !== abcExerciseId).map(({ exercise, line }) => ({
  documentExerciseId: exercise.documentExerciseId,
  literal: line.trim(),
  assessment: /^(?:\d+(?:\.\d+)?\s+){3,}\d+(?:\.\d+)?$/.test(line.trim()) ? 'ORDERED_NUMERIC_SERIES_NO_SPATIAL_ANCHOR_REQUIRED' : 'TEXT_SPACING_NO_CONFIRMED_SEMANTIC_ANCHOR'
}));

const categoryCounts = {};
for (const failure of failures) for (const category of failure.categories) categoryCounts[category] = (categoryCounts[category] || 0) + 1;
const layerCounts = Object.fromEntries(['AST_DECODING', 'DERIVED_REPRESENTATION'].map((layer) => [layer, failures.filter((row) => row.layer === layer).length]));

const exerciseConsequences = {
  schemaVersion: 'mathup.equation3-human-review-exercise-consequences.v1',
  totalRecoveredExercises: exercises.length,
  withoutEquation3Dependency: noEquationExercises.length,
  equation3Dependent: dependentExercises.size,
  allObjectsCoincide: allCoincideDependent.length,
  affectedByNoCoincide: affectedExercises.size,
  currentlyUnblockable: noEquationExercises.length + allCoincideDependent.length,
  stillBlocked: affectedExercises.size,
  allObjectsCoincideExerciseIds: allCoincideDependent,
  affectedExerciseIds: [...affectedExercises].sort(),
  withoutEquation3ExerciseIds: noEquationExercises
};

const summary = {
  schemaVersion: 'mathup.equation3-human-review-result-summary.v1',
  publicEvidence: { publicDecisionSetSha256: decisionSetSha256, queueSemanticHash: state.queueSemanticHash },
  reviewerIds: [PUBLIC_REVIEWER_ID],
  decisions: { reviewed: decisions.length, ...counts, equation: `${counts.COINCIDE} + ${counts.NO_COINCIDE} + ${counts.DUDOSO} = ${decisions.length}` },
  failures: { total: failures.length, layerCounts, categoryCounts, categoriesAreNonExclusive: true },
  exercises: exerciseConsequences,
  spatialLayoutAudit: {
    exercisesAudited: exercises.length,
    confirmedIncidents: spatialIncidents.length,
    confirmedIncidentIds: spatialIncidents.map((row) => row.incidentId),
    otherCandidatesReviewed: otherSpatialFindings.length,
    additionalConfirmedIncidents: 0
  },
  immutableCoincideRegressionSet: decisionExport.filter((row) => row.decision === 'COINCIDE').map((row) => ({ objectId: row.objectId, caseHash: row.integrity.caseHash, astSha256: row.recovered.astSha256, mathmlSha256: row.recovered.mathmlSha256, officialPngSha256: row.officialObject.pngSha256 }))
};

fs.mkdirSync(path.join(ROOT, OUTPUT_DIR), { recursive: true });
writeJsonl(`${OUTPUT_DIR}/human-decisions-audit.jsonl`, decisionExport);
writeJsonl(`${OUTPUT_DIR}/failure-classification.jsonl`, failures);
writeJson(`${OUTPUT_DIR}/exercise-consequences.json`, exerciseConsequences);
writeJsonl(`${OUTPUT_DIR}/spatial-layout-incidents.jsonl`, spatialIncidents);
writeJson(`${OUTPUT_DIR}/spatial-layout-audit.json`, { exercisesAudited: exercises.length, confirmedIncidents: spatialIncidents, otherCandidatesReviewed: otherSpatialFindings, additionalConfirmedIncidents: [] });
writeJson(`${OUTPUT_DIR}/summary.json`, summary);

const artifactFiles = fs.readdirSync(path.join(ROOT, OUTPUT_DIR)).sort();
const manifest = {
  schemaVersion: 'mathup.equation3-human-review-result-manifest.v1',
  publicDecisionSetSha256: decisionSetSha256,
  semanticSha256: sha256Bytes(Buffer.from(stableStringify({ decisionExport, failures, exerciseConsequences, spatialIncidents, summary }), 'utf8')),
  files: artifactFiles.map((name) => ({ path: `${OUTPUT_DIR}/${name}`, sha256: sha256File(`${OUTPUT_DIR}/${name}`) }))
};
writeJson(`${OUTPUT_DIR}/manifest.json`, manifest);
console.log(JSON.stringify({ publicDecisionSetSha256: decisionSetSha256, counts, layerCounts, categoryCounts, exercises: exerciseConsequences, spatial: summary.spatialLayoutAudit, outputDir: OUTPUT_DIR }, null, 2));

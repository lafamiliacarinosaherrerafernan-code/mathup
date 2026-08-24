import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import {
  familiesFor,
  sha256,
  stableStringify,
} from '../catalog/normalization/canonical-math-ast.mjs';
import {
  buildDecision,
  buildMathDocument,
  classifyNotationRow,
  parseLosslessJsonSolution,
  strictNodeForRow,
} from '../catalog/normalization/normalize-math-structure.mjs';
import { representationsForDocument } from '../catalog/normalization/serialize-normalized-latex.mjs';
import {
  validateDecision,
  validateMathDocument,
  validateRepresentation,
} from '../catalog/normalization/validate-math-document.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_INPUT = 'artifacts/fase2b/runs/run-a';
const DEFAULT_AUDIT = 'artifacts/fase2b-integrity-audit';
const DISPOSITIONS = [
  'SAFE_AUTOMATIC_NORMALIZATION',
  'SOURCE_REVIEW_REQUIRED',
  'MATHEMATICAL_REVIEW_REQUIRED',
  'VISUAL_REVIEW_REQUIRED',
  'NO_ACTION_REQUIRED',
];

function parseArgs(argv) {
  const result = { runId: 'run-a', outputRoot: 'artifacts/fase2c/runs', order: 'normal' };
  for (const arg of argv) {
    const [key, value] = arg.split('=', 2);
    if (key === '--run-id') result.runId = value;
    if (key === '--output-root') result.outputRoot = value;
    if (key === '--order') result.order = value;
  }
  if (!['normal', 'reverse'].includes(result.order)) throw new Error(`Unsupported order: ${result.order}`);
  return result;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function readJsonl(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8')
    .split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}

function fileHash(relativePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, relativePath))).digest('hex');
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${stableStringify(value)}\n`, 'utf8');
}

function writeJsonl(filePath, rows) {
  fs.writeFileSync(filePath, `${rows.map((row) => stableStringify(row)).join('\n')}\n`, 'utf8');
}

function countBy(rows, selector) {
  const output = {};
  for (const row of rows) {
    const keys = selector(row);
    for (const key of Array.isArray(keys) ? keys : [keys]) {
      const normalized = key ?? 'null';
      output[normalized] = (output[normalized] ?? 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(output).sort(([a], [b]) => a.localeCompare(b)));
}

function identity(value) {
  return value;
}

function sourceIdsFor(row, exercises, answers, solutions) {
  if (row.entityType === 'statement') return exercises.get(row.exerciseId)?.traceability?.sourceRecordIds ?? [];
  if (row.entityType === 'answer') return answers.get(row.entityId)?.provenance?.sourceRecordIds ?? [];
  if (row.entityType === 'solution') return solutions.get(row.entityId)?.provenance?.sourceRecordIds ?? [];
  return [];
}

function contextFor(row, exercises) {
  const exercise = exercises.get(row.exerciseId);
  return {
    courseId: exercise?.classification?.courseId ?? null,
    subjectId: exercise?.classification?.subjectId ?? null,
    stage: exercise?.classification?.stage ?? null,
    topicId: exercise?.classification?.topic?.id ?? null,
    topicLabel: exercise?.classification?.topic?.label ?? null,
    community: exercise?.provenance?.community ?? exercise?.provenance?.pau?.community ?? null,
  };
}

function protectedPaths() {
  const exact = [
    'index.html', 'app.js', 'math-renderer.js',
    'catalog/canonical-exercise.schema.json',
    'catalog/canonical-exercise.mjs',
    'catalog/validate-canonical-exercise.mjs',
  ];
  const v2Dir = path.join(ROOT, 'catalog/v2');
  if (fs.existsSync(v2Dir)) {
    for (const name of fs.readdirSync(v2Dir).sort()) exact.push(`catalog/v2/${name}`);
  }
  return exact.filter((p) => fs.existsSync(path.join(ROOT, p)));
}

function artifactHashes(directory, excluded = new Set()) {
  const result = {};
  for (const name of fs.readdirSync(directory).sort()) {
    if (excluded.has(name)) continue;
    const full = path.join(directory, name);
    if (!fs.statSync(full).isFile()) continue;
    result[name] = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
  }
  return result;
}

export function runPhase2C(options = {}) {
  const runId = options.runId ?? 'run-a';
  const outputRoot = options.outputRoot ?? 'artifacts/fase2c/runs';
  const order = options.order ?? 'normal';
  const outputDirectory = path.join(ROOT, outputRoot, runId);
  fs.mkdirSync(outputDirectory, { recursive: true });

  const notationRowsOriginal = readJsonl(`${DEFAULT_AUDIT}/notation-audit.jsonl`);
  const notationRows = order === 'reverse' ? [...notationRowsOriginal].reverse() : notationRowsOriginal;
  const exerciseRows = readJsonl(`${DEFAULT_INPUT}/exercise-v2.jsonl`);
  const answerRows = readJsonl(`${DEFAULT_INPUT}/answer-records.jsonl`);
  const solutionRows = readJsonl(`${DEFAULT_INPUT}/solution-records.jsonl`);
  const sourceReconciliation = readJsonl(`${DEFAULT_INPUT}/source-reconciliation.jsonl`);
  const educationalReconciliation = readJsonl(`${DEFAULT_INPUT}/educational-content-reconciliation.jsonl`);

  const exercises = new Map(exerciseRows.map((row) => [row.identity.exerciseId, row]));
  const answers = new Map(answerRows.map((row) => [row.revisionId, row]));
  const solutions = new Map(solutionRows.map((row) => [row.revisionId, row]));

  const documents = [];
  const decisions = [];
  const representations = [];
  const validationResults = [];
  const jsonAudit = [];
  const falseMathmlAudit = [];
  const falseImageAudit = [];
  const sourceCorruptionQueue = [];
  const unreconciledSolutions = [];

  for (const row of notationRows) {
    const jsonResult = row.issues.includes('RAW_JSON_IN_TEXT_FIELD')
      ? parseLosslessJsonSolution(row.canonicalText)
      : null;
    const strictNode = strictNodeForRow(row);
    const classification = classifyNotationRow(row, { jsonResult, strictMathNode: strictNode });
    const sourceRecordIds = [...new Set(sourceIdsFor(row, exercises, answers, solutions))].sort();
    const context = contextFor(row, exercises);
    const document = {
      ...buildMathDocument(row, {
      jsonResult,
      strictMathNode: strictNode,
      sourceRecordIds,
      provenance: context,
      }),
      entityId: row.entityId,
      exerciseId: row.exerciseId,
      entityType: row.entityType,
    };
    const decisionBase = buildDecision(row, document, classification);
    const decision = {
      ...decisionBase,
      entityId: row.entityId,
      exerciseId: row.exerciseId,
      disposition: decisionBase.classification,
      sourceDiagnosis: decisionBase.diagnosis,
      entityType: row.entityType,
      context,
      structureStatus: strictNode ? 'VALIDATED' : 'PRESERVED_LITERAL',
    };
    const derived = strictNode && classification.classification === 'SAFE_AUTOMATIC_NORMALIZATION'
      ? representationsForDocument(document)
      : [];
    documents.push(document);
    decisions.push(decision);
    representations.push(...derived);

    const validations = [
      ...validateMathDocument(document).errors.map((error) => ({ contract: 'mathup.math-document.v1', error })),
      ...validateDecision(decision).errors.map((error) => ({ contract: 'mathup.normalization-decision.v1', error })),
      ...derived.flatMap((item) => validateRepresentation(item).errors.map((error) => ({ contract: 'mathup.math-representation.v1', error }))),
    ];
    validationResults.push({ entityId: row.entityId, passed: validations.length === 0, errors: validations });

    if (jsonResult) {
      jsonAudit.push({
        entityId: row.entityId,
        exerciseId: row.exerciseId,
        accepted: jsonResult.accepted,
        reason: jsonResult.reason ?? null,
        originalHash: sha256(row.canonicalText),
        originalLength: row.canonicalText.length,
        keysInSourceOrder: jsonResult.topLevelKeyOrder ?? [],
        blockKeyOrders: jsonResult.blockKeyOrders ?? [],
        semanticHash: jsonResult.semanticHash ?? null,
        roundTripExact: jsonResult.reconstructionVerified ?? false,
        stepOrder: (jsonResult.blocks ?? []).map((block) => block.stepId ?? block.blockId ?? null),
        solutionPartOrder: (solutions.get(row.entityId)?.parts ?? []).map((part) => part.part),
        finalAnswers: (solutions.get(row.entityId)?.parts ?? []).map((part) => part.finalAnswer).filter((value) => value != null),
        sourceRecordIds,
      });
    }
    if (row.issues.includes('CANONICAL_MATHML_FORMAT_WITHOUT_MATHML')) {
      falseMathmlAudit.push({ entityId: row.entityId, exerciseId: row.exerciseId, action: 'RELABEL_PARALLEL_METADATA_ONLY', generatedMathML: false, sourceRecordIds });
    }
    if (row.issues.includes('CANONICAL_IMAGE_FORMAT_WITHOUT_IMAGE_REFERENCE')) {
      falseImageAudit.push({ entityId: row.entityId, exerciseId: row.exerciseId, action: 'RELABEL_PARALLEL_METADATA_ONLY', generatedImage: false, sourceRecordIds });
    }
    if (row.diagnosis === 'SOURCE_CORRUPTION') {
      sourceCorruptionQueue.push({ entityId: row.entityId, exerciseId: row.exerciseId, issues: row.issues, sourceHash: sha256(row.sourceText), sourceRecordIds, action: 'NO_SILENT_REPAIR' });
    }
    if (row.issues.includes('CANONICAL_SOLUTION_NOT_FOUND_IN_DECODED_PARTS')) {
      unreconciledSolutions.push({ entityId: row.entityId, exerciseId: row.exerciseId, sourceHash: sha256(row.sourceText), sourceRecordIds, action: 'ISOLATED_NO_AUTOMATIC_ASSOCIATION' });
    }
  }

  const sortEntity = (a, b) => a.entityId.localeCompare(b.entityId);
  documents.sort(sortEntity);
  decisions.sort(sortEntity);
  representations.sort((a, b) => `${a.documentId}:${a.blockId}:${a.format}`.localeCompare(`${b.documentId}:${b.blockId}:${b.format}`));
  validationResults.sort(sortEntity);
  jsonAudit.sort(sortEntity);
  falseMathmlAudit.sort(sortEntity);
  falseImageAudit.sort(sortEntity);
  sourceCorruptionQueue.sort(sortEntity);
  unreconciledSolutions.sort(sortEntity);

  const expected = {
    notationEntities: 16783,
    sourceRecords: 15527,
    originalExercises: 6712,
    inaccessibleExercises: 607,
    exercisesV2: 7485,
    answers: 4649,
    solutions: 4649,
    jsonSolutions: 3295,
    falseMathml: 494,
    falseImages: 106,
    sourceCorruption: 883,
    unreconciledSolutions: 129,
  };
  const actual = {
    notationEntities: decisions.length,
    sourceRecords: sourceReconciliation.length,
    originalExercises: educationalReconciliation.length,
    inaccessibleExercises: educationalReconciliation.filter((row) => row.accessible === false).length,
    exercisesV2: exerciseRows.length,
    answers: answerRows.length,
    solutions: solutionRows.length,
    jsonSolutions: jsonAudit.length,
    falseMathml: falseMathmlAudit.length,
    falseImages: falseImageAudit.length,
    sourceCorruption: sourceCorruptionQueue.length,
    unreconciledSolutions: unreconciledSolutions.length,
  };
  for (const [key, value] of Object.entries(expected)) {
    if (actual[key] !== value) throw new Error(`Coverage mismatch ${key}: expected ${value}, received ${actual[key]}`);
  }

  const primaryDisposition = countBy(decisions, (row) => row.disposition);
  for (const disposition of DISPOSITIONS) primaryDisposition[disposition] ??= 0;
  const sourceDiagnosis = countBy(notationRowsOriginal, (row) => row.diagnosis);
  const structural = decisions.filter((row) => row.sourceDiagnosis === 'CANONICAL_STRUCTURE_ERROR');
  const rendering = decisions.filter((row) => row.sourceDiagnosis === 'RENDERING_RISK');
  const normalizedStructural = structural.filter((row) => row.disposition === 'SAFE_AUTOMATIC_NORMALIZATION').length;

  const classificationSummary = {
    schemaVersion: 'mathup.fase2c.classification-summary.v1',
    total: decisions.length,
    primaryDisposition,
    sourceDiagnosis,
    structuralErrors: {
      total: structural.length,
      normalizedAutomatically: normalizedStructural,
      remainingInReview: structural.length - normalizedStructural,
      byDisposition: countBy(structural, (row) => row.disposition),
    },
    renderingRisk: {
      total: rendering.length,
      withValidatedStructure: rendering.filter((row) => row.structureStatus === 'VALIDATED').length,
      derivedRepresentationOnly: rendering.filter((row) => row.structureStatus === 'VALIDATED' && row.disposition === 'SAFE_AUTOMATIC_NORMALIZATION').length,
      pendingVisualReview: rendering.filter((row) => row.disposition === 'VISUAL_REVIEW_REQUIRED').length,
      byDisposition: countBy(rendering, (row) => row.disposition),
    },
    cases: {
      jsonSolutions: { total: jsonAudit.length, accepted: jsonAudit.filter((row) => row.accepted).length, rejected: jsonAudit.filter((row) => !row.accepted).length },
      falseMathml: { total: falseMathmlAudit.length, generatedMathML: 0 },
      falseImages: { total: falseImageAudit.length, generatedImages: 0 },
      sourceCorruption: { total: sourceCorruptionQueue.length, silentlyRepaired: 0 },
      unreconciledSolutions: { total: unreconciledSolutions.length, automaticallyAssociated: 0 },
    },
  };

  const familySummary = {
    schemaVersion: 'mathup.fase2c.family-summary.v1',
    byFamily: countBy(notationRowsOriginal, (row) => row.families.length ? row.families : ['none']),
    byEntityType: countBy(notationRowsOriginal, (row) => row.entityType),
    byCourse: countBy(notationRowsOriginal, (row) => contextFor(row, exercises).courseId),
    byCourseAndEntity: countBy(notationRowsOriginal, (row) => `${contextFor(row, exercises).courseId ?? 'null'}|${row.entityType}`),
    parsedFamilies: countBy(documents.filter((row) => row.blocks.some((block) => block.math)), (row) => row.families.length ? row.families : ['unknown']),
    requiredFamiliesSupported: [
      'power', 'subscript', 'fraction', 'root', 'absolute-value', 'equation', 'system',
      'inequality', 'matrix', 'determinant', 'limit', 'derivative', 'defined-integral',
      'indefinite-integral', 'summation', 'product', 'logarithm', 'exponential', 'vector',
      'coordinates', 'interval', 'set', 'piecewise', 'multiline', 'probability',
      'combinatorics', 'greek', 'units',
    ],
  };

  const allSourceIds = [...new Set(sourceReconciliation.map((row) => row.sourceRecordId))].sort();
  const representedSourceIds = new Set(sourceReconciliation.map((row) => row.sourceRecordId));
  const reconciliation = {
    schemaVersion: 'mathup.fase2c.reconciliation.v1',
    expected,
    actual,
    sourceRecordIds: {
      total: allSourceIds.length,
      disappeared: allSourceIds.filter((id) => !representedSourceIds.has(id)),
      digest: sha256(stableStringify(allSourceIds)),
    },
    productionWrites: 0,
    publishedExercises: 0,
  };

  const protectedFiles = Object.fromEntries(protectedPaths().map((relativePath) => [relativePath, fileHash(relativePath)]));
  const inputPaths = [
    `${DEFAULT_AUDIT}/notation-audit.jsonl`,
    `${DEFAULT_INPUT}/exercise-v2.jsonl`,
    `${DEFAULT_INPUT}/answer-records.jsonl`,
    `${DEFAULT_INPUT}/solution-records.jsonl`,
    `${DEFAULT_INPUT}/source-reconciliation.jsonl`,
    `${DEFAULT_INPUT}/educational-content-reconciliation.jsonl`,
  ];
  const inputManifest = {
    schemaVersion: 'mathup.fase2c.input-manifest.v1',
    runId,
    order,
    inputs: Object.fromEntries(inputPaths.map((relativePath) => [relativePath, fileHash(relativePath)])),
    protectedFiles,
  };

  const coverageByCourseEntity = {};
  for (const row of decisions) {
    const key = `${row.context.courseId ?? 'null'}|${row.entityType}`;
    coverageByCourseEntity[key] ??= Object.fromEntries(DISPOSITIONS.map((item) => [item, 0]));
    coverageByCourseEntity[key][row.disposition] += 1;
  }

  writeJson(path.join(outputDirectory, 'input-manifest.json'), inputManifest);
  writeJsonl(path.join(outputDirectory, 'normalization-decisions.jsonl'), decisions);
  writeJsonl(path.join(outputDirectory, 'math-documents.jsonl'), documents);
  writeJsonl(path.join(outputDirectory, 'math-representations.jsonl'), representations);
  writeJsonl(path.join(outputDirectory, 'json-solution-audit.jsonl'), jsonAudit);
  writeJsonl(path.join(outputDirectory, 'false-mathml-audit.jsonl'), falseMathmlAudit);
  writeJsonl(path.join(outputDirectory, 'false-image-audit.jsonl'), falseImageAudit);
  writeJsonl(path.join(outputDirectory, 'source-corruption-queue.jsonl'), sourceCorruptionQueue);
  writeJsonl(path.join(outputDirectory, 'unreconciled-solutions.jsonl'), unreconciledSolutions);
  writeJsonl(path.join(outputDirectory, 'validation-results.jsonl'), validationResults);
  writeJson(path.join(outputDirectory, 'classification-summary.json'), classificationSummary);
  writeJson(path.join(outputDirectory, 'family-summary.json'), familySummary);
  writeJson(path.join(outputDirectory, 'coverage-by-course-entity.json'), coverageByCourseEntity);
  writeJson(path.join(outputDirectory, 'reconciliation-summary.json'), reconciliation);
  writeJson(path.join(outputDirectory, 'validation-summary.json'), {
    total: validationResults.length,
    passed: validationResults.filter((row) => row.passed).length,
    failed: validationResults.filter((row) => !row.passed).length,
    representations: representations.length,
  });

  const semanticFiles = [
    'normalization-decisions.jsonl', 'math-documents.jsonl', 'math-representations.jsonl',
    'json-solution-audit.jsonl', 'false-mathml-audit.jsonl', 'false-image-audit.jsonl',
    'source-corruption-queue.jsonl', 'unreconciled-solutions.jsonl', 'validation-results.jsonl',
    'classification-summary.json', 'family-summary.json', 'coverage-by-course-entity.json',
    'reconciliation-summary.json', 'validation-summary.json',
  ];
  const semanticHashes = Object.fromEntries(semanticFiles.map((name) => [name, fileHash(path.relative(ROOT, path.join(outputDirectory, name)))]));
  const semanticManifest = {
    schemaVersion: 'mathup.fase2c.semantic-manifest.v1',
    hashes: semanticHashes,
    semanticDigest: sha256(stableStringify(semanticHashes)),
  };
  writeJson(path.join(outputDirectory, 'semantic-manifest.json'), semanticManifest);
  writeJson(path.join(outputDirectory, 'rollback-manifest.json'), {
    schemaVersion: 'mathup.fase2c.rollback.v1',
    removableRoot: path.relative(ROOT, outputDirectory).replaceAll('\\', '/'),
    protectedFiles,
    productionDependencies: [],
    productionWrites: 0,
  });
  const checksums = artifactHashes(outputDirectory, new Set(['checksums.sha256']));
  fs.writeFileSync(path.join(outputDirectory, 'checksums.sha256'), `${Object.entries(checksums).map(([name, hash]) => `${hash}  ${name}`).join('\n')}\n`, 'utf8');

  return { runId, outputDirectory, classificationSummary, reconciliation, semanticManifest, validationResults, familySummary };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  const result = runPhase2C(args);
  process.stdout.write(`${stableStringify({
    runId: result.runId,
    outputDirectory: path.relative(ROOT, result.outputDirectory).replaceAll('\\', '/'),
    total: result.classificationSummary.total,
    dispositions: result.classificationSummary.primaryDisposition,
    semanticDigest: result.semanticManifest.semanticDigest,
    validationFailures: result.validationResults.filter((row) => !row.passed).length,
  })}\n`);
}

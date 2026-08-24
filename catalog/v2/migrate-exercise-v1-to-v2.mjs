import {
  CONTRACTS,
  clean,
  deterministicId,
  entityRevisionId,
  normalizeStatement,
  sha256
} from "./canonical-entities.mjs";

function withoutUndefined(value) {
  if (Array.isArray(value)) return value.map(withoutUndefined);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined).map(([key, item]) => [key, withoutUndefined(item)]));
}

export function migrateExerciseV1ToV2(candidate, options = {}) {
  const v1 = candidate.exercise;
  if (v1?.schemaVersion !== "mathup.exercise.v1") throw new Error("La migración solo acepta mathup.exercise.v1.");
  const exerciseId = options.exerciseId || v1.identity.exerciseId;
  const statement = options.statement ?? v1.content?.statement?.plainText ?? "";
  const inventoryRecordIds = [...new Set(options.inventoryRecordIds ?? v1.traceability?.inventoryRecordIds ?? [])].sort();
  const sourceRecordIds = [...new Set(options.sourceRecordIds ?? [])].sort();
  const aliases = [...new Set([v1.identity.exerciseId, candidate.candidateId, ...(v1.identity.legacyIds || []), ...(options.aliases || [])].filter(Boolean))].sort();
  const content = options.content || v1.content;
  const classification = options.classification || v1.classification;
  const provenance = options.provenance || v1.provenance;
  const core = {
    schemaVersion: CONTRACTS.exercise,
    identity: {
      exerciseId,
      revisionId: entityRevisionId(exerciseId, 1),
      revisionNumber: 1,
      contentHash: sha256(normalizeStatement(statement)),
      aliases
    },
    classification,
    difficulty: options.difficulty || v1.difficulty,
    provenance,
    content,
    links: { answerRefs: [], solutionRefs: [], deliveryTemplateRefs: [] },
    review: {
      status: "DRAFT",
      mathematicalReview: "NOT_REVIEWED",
      solutionNeedsReview: Boolean(v1.review?.solutionNeedsReview),
      findings: [...new Set(v1.review?.findings || [])].sort()
    },
    traceability: {
      v1CandidateId: candidate.candidateId,
      v1ExerciseId: v1.identity.exerciseId,
      v1RevisionId: v1.identity.revisionId,
      v1Hash: sha256(v1),
      inventoryRecordIds,
      sourceRecordIds,
      originalIdentity: v1.traceability?.originalIdentity ?? null,
      transformations: [{ kind: "migration", by: "fase2b-import-catalog", version: "mathup.v1-to-v2.v1", reversible: true }]
    },
    editorial: {
      coreStatus: clean(statement) ? "CORE_PASSED" : "CORE_BLOCKED",
      contentStatus: "PENDING_EVALUATION",
      deliveryStatus: "PENDING_EVALUATION",
      publicationStatus: "NOT_PUBLISHED"
    }
  };
  return withoutUndefined(core);
}

export function makeExerciseFromInventoryRecord(candidate, record, sourceRecordId, classification) {
  const statement = normalizeStatement(record.statement);
  const exerciseId = deterministicId("ex", "exercise-v2-composite", optionsSeed(record, classification));
  return migrateExerciseV1ToV2(candidate, {
    exerciseId,
    statement,
    inventoryRecordIds: [record.inventoryId],
    sourceRecordIds: [sourceRecordId],
    classification,
    difficulty: candidate.exercise.difficulty,
    provenance: {
      kind: candidate.exercise.provenance?.kind || "legacy",
      community: record.community && record.community !== "no-aplica-o-sin-determinar" ? { name: record.community } : null,
      pau: candidate.exercise.provenance?.pau || null,
      source: {
        sourceId: sourceRecordId,
        sourceFile: record.sourceFile,
        sourcePath: record.sourcePath,
        sourceType: "script",
        originalAssetHash: null,
        page: null
      }
    },
    content: {
      language: "es",
      statement: { plainText: statement, blocks: [{ blockId: "statement-1", type: "text", value: statement, sourceLiteral: record.statement }] },
      mathRepresentations: (record.mathFormat || []).map((format, index) => ({ role: "source", format, sourceBlockId: "statement-1", value: record.statement, representationId: `repr-${index + 1}` })),
      assets: []
    },
    aliases: [`inventory:${record.inventoryId}`]
  });
}

function optionsSeed(record, classification) {
  return {
    courseId: classification.courseId,
    subjectId: classification.subjectId,
    sourceNamespace: `${record.sourceFile}#${record.sourcePath.replace(/\.(?:parts\.)?\d+(?:\.[^.]+)?$/u, "")}`,
    topicOrBlock: record.topic || record.block || "sin-determinar",
    normalizedStatementHash: sha256(normalizeStatement(record.statement)),
    sourceLocalLegacyId: record.currentId || record.exerciseId || record.rawBaseId || record.templateId || "sin-id-local"
  };
}

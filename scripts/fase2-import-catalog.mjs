import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  CANONICAL_EXERCISE_SCHEMA_VERSION,
  COURSE_PEDAGOGICAL_PROFILES,
  MODALITIES_BY_PEDAGOGICAL_PROFILE
} from "../catalog/canonical-exercise.mjs";
import { validateCanonicalExercise } from "../catalog/validate-canonical-exercise.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_INVENTORY = path.join(root, "docs", "FASE-0-INVENTARIO-CATALOGO-MATHUP.json");
const DEFAULT_MAPPINGS = path.join(root, "catalog", "fase2-taxonomy-mappings.v1.json");
const DEFAULT_OUTPUT_ROOT = path.join(root, "artifacts", "fase2", "runs");
const SEMANTIC_ARTIFACTS = Object.freeze([
  "input-manifest.json",
  "source-records.jsonl",
  "runtime-observations.jsonl",
  "taxonomy-mappings.json",
  "unmapped-taxonomy.csv",
  "identity-registry.json",
  "identity-conflicts.csv",
  "source-to-canonical.jsonl",
  "duplicate-clusters.json",
  "possible-equivalents.csv",
  "join-decisions.jsonl",
  "field-provenance.jsonl",
  "canonical-candidates.jsonl",
  "validation-results.jsonl",
  "validation-summary.json",
  "queue-blocked.csv",
  "queue-review-required.csv",
  "queue-passed.csv",
  "inaccessible-classification.csv",
  "assets-manifest.json",
  "reconciliation.json",
  "educational-content-reconciliation.jsonl",
  "coverage-by-course-subject.csv",
  "pau-coverage-by-provenance.csv",
  "not-converted.csv",
  "migration-report.md"
]);

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const clean = (value) => String(value ?? "").replace(/\s+/gu, " ").trim();
const fold = (value) => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLocaleLowerCase("es");
const posix = (value) => value.replaceAll("\\", "/");
const rel = (value) => posix(path.relative(root, value));
const isUnknown = (value, mappings) => mappings.unknownTokens.includes(fold(value));

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key]) ]));
  }
  return value === undefined ? null : value;
}

export function stableStringify(value, space = 0) {
  return JSON.stringify(stableValue(value), null, space);
}

function uuidBytes(uuid) {
  const hex = uuid.replaceAll("-", "");
  if (!/^[0-9a-f]{32}$/iu.test(hex)) throw new TypeError(`Namespace UUID inválido: ${uuid}`);
  return Buffer.from(hex, "hex");
}

export function uuidV5(namespace, name) {
  const digest = crypto.createHash("sha1").update(uuidBytes(namespace)).update(String(name), "utf8").digest();
  digest[6] = (digest[6] & 0x0f) | 0x50;
  digest[8] = (digest[8] & 0x3f) | 0x80;
  const hex = digest.subarray(0, 16).toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function canonicalIds(namespace, identityKey, revisionNumber = 1) {
  if (!Number.isInteger(revisionNumber) || revisionNumber < 1) throw new TypeError("revisionNumber debe ser un entero positivo");
  const exerciseId = `ex-${uuidV5(namespace, `exercise|${identityKey}`)}`;
  return { exerciseId, revisionId: `${exerciseId}:r${revisionNumber}`, revisionNumber };
}

function slug(value) {
  return fold(value).replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "").slice(0, 72) || "unmapped";
}

function uniqueIdentity(record) {
  return clean(record.exerciseId) || clean(record.rawBaseId) || clean(record.currentId) ||
    (clean(record.statement) ? `text-${sha256(fold(record.statement)).slice(0, 16)}` : `record-${record.inventoryId}`);
}

function sourceSeed(record) {
  return ["source", record.inventoryId, record.originKind, record.sourceFile, record.sourcePath, record.currentId].map(clean).join("|");
}

function sortRecords(records) {
  return [...records].sort((left, right) => {
    const score = (record) =>
      (record.originKind === "source-record" ? 100 : 0) +
      (record.accessible ? 20 : 0) +
      (clean(record.answer) ? 8 : 0) +
      (clean(record.solution) ? 4 : 0) +
      (record.options?.length === 4 ? 2 : 0);
    return score(right) - score(left) || left.inventoryId.localeCompare(right.inventoryId);
  });
}

function uniqueObserved(records, getter) {
  const values = records.map(getter).filter((value) => clean(value));
  const byFolded = new Map();
  for (const value of values) if (!byFolded.has(fold(value))) byFolded.set(fold(value), value);
  return [...byFolded.values()];
}

function parseYear(records) {
  const years = new Set();
  for (const record of records) {
    const text = [record.provenance, record.sourceFile, record.sourcePath, record.currentId].join(" ");
    for (const match of text.matchAll(/(?:^|\D)((?:19|20)\d{2}|2100)(?:\D|$)/gu)) years.add(Number(match[1]));
  }
  return years.size === 1 ? [...years][0] : null;
}

function parseSitting(records) {
  const values = new Set();
  for (const record of records) {
    const text = fold([record.provenance, record.sourceFile, record.sourcePath, record.currentId].join(" "));
    if (/(?:^|[^a-z])(?:jun|junio|ordinaria)(?:[^a-z]|$)/u.test(text)) values.add("Junio/ordinaria");
    if (/(?:^|[^a-z])(?:jul|julio)(?:[^a-z]|$)/u.test(text)) values.add("Julio");
    if (/(?:^|[^a-z])(?:sep|septiembre)(?:[^a-z]|$)/u.test(text)) values.add("Septiembre");
    if (/(?:^|[^a-z])extraordinaria(?:[^a-z]|$)/u.test(text)) values.add("Extraordinaria");
  }
  return values.size === 1 ? [...values][0] : null;
}

function csvCell(value) {
  const text = Array.isArray(value) || (value && typeof value === "object") ? stableStringify(value) : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function writeCsv(file, rows, fields) {
  const lines = [fields.join(","), ...rows.map((row) => fields.map((field) => csvCell(row[field])).join(","))];
  fs.writeFileSync(file, `${lines.join("\n")}\n`, "utf8");
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${stableStringify(value, 2)}\n`, "utf8");
}

function writeJsonl(file, values) {
  fs.writeFileSync(file, `${values.map((value) => stableStringify(value)).join("\n")}\n`, "utf8");
}

function mapMathFormats(record) {
  const formatMap = new Map([
    ["unicode matematico", "unicode"],
    ["latex", "latex"],
    ["mathml/html nativo", "mathml"],
    ["macros propias", "legacy-macro"],
    ["matriz [[...]]", "matrix-array"],
    ["imagen/html", "image"]
  ]);
  const representations = [];
  for (const label of record.mathFormat || []) {
    const format = formatMap.get(fold(label));
    if (!format || !clean(record.statement)) continue;
    representations.push({
      format,
      value: record.statement,
      role: "source",
      sourceBlockId: "statement-1"
    });
  }
  return representations;
}

function modalitiesFromEvidence(records, profile, mappings) {
  const found = new Set();
  for (const record of records) {
    for (const raw of record.modalities || []) {
      const value = mappings.modalityEvidence[fold(raw)];
      if (value) found.add(value);
    }
    for (const raw of record.accessibleVia || []) {
      const value = fold(raw);
      if (value.includes("adventure")) found.add("adventure");
      if (value.includes("buildquestions:apprentice") || value.includes("buildtopicquestions")) found.add("practice");
      if (value.includes("buildquestions:master") || value.includes("buildchallenge")) found.add("challenge");
      if (value.includes("buildquestions:exam") || value.includes("buildexam") || value.includes("esoexam")) found.add("topic-exam");
      if (value.includes("/block/")) found.add("block-exam");
    }
  }
  const allowed = MODALITIES_BY_PEDAGOGICAL_PROFILE[profile] || [];
  return [...found].filter((value) => allowed.includes(value)).sort();
}

function taxonomyRef(raw, kind, courseId, mappings, observed, migrationDiagnostics) {
  if (isUnknown(raw, mappings)) {
    if (kind === "topic") migrationDiagnostics.push({
      severity: "ERROR",
      code: "UNMAPPED_TOPIC",
      path: "classification.topic",
      message: "El tema no consta de forma demostrable."
    });
    return kind === "topic" ? { id: "unmapped-topic", label: "Sin determinar" } : null;
  }
  const label = clean(raw);
  const id = `${kind}-${slug(courseId)}-${slug(label)}-${sha256(fold(label)).slice(0, 8)}`;
  observed.set(`${courseId}|${kind}|${fold(label)}`, { raw: label, canonical: { id, label }, status: "VERIFIED", basis: "observed-literal" });
  return { id, label };
}

function communityFromRecords(records, mappings, migrationDiagnostics) {
  const values = uniqueObserved(records, (record) => isUnknown(record.community, mappings) ? "" : record.community);
  const resolved = values.map((value) => mappings.communities[fold(value)]).filter(Boolean);
  if (resolved.length === 1 && values.length === 1) return { code: resolved[0].code, name: resolved[0].name };
  if (values.length > 1) {
    migrationDiagnostics.push({ severity: "ERROR", code: "COMMUNITY_CONFLICT", path: "provenance.community", message: "Las ocurrencias tienen comunidades incompatibles.", evidence: values });
  } else {
    migrationDiagnostics.push({ severity: "ERROR", code: "COMMUNITY_UNMAPPED", path: "provenance.community", message: "La comunidad PAU no consta o no está verificada.", evidence: values });
  }
  return null;
}

function difficultyFromRecord(record, mappings) {
  const mapped = mappings.difficultyAliases[fold(record.difficulty)];
  return mapped
    ? { level: mapped, basis: "legacy", confidence: null }
    : { level: "unclassified", basis: "unclassified", confidence: null };
}

function findingsFromRecords(records) {
  const findings = new Set();
  for (const record of records) {
    if (record.flags?.markedForReview) findings.add("SOURCE_MARKED_FOR_REVIEW");
    if (record.flags?.corruptedCharacters) findings.add("SOURCE_CORRUPTED_CHARACTERS");
    if (record.flags?.notationProblems?.length) findings.add("SOURCE_NOTATION_REQUIRES_REVIEW");
    if (record.flags?.duplicateOptionsExact) findings.add("SOURCE_DUPLICATE_OPTIONS_EXACT");
    if (record.flags?.duplicateOptionsEquivalent) findings.add("SOURCE_DUPLICATE_OPTIONS_EQUIVALENT");
  }
  return [...findings].sort();
}

function mergeValidation(base, migrationDiagnostics) {
  const diagnostics = [...base.diagnostics, ...migrationDiagnostics].sort((left, right) =>
    ({ ERROR: 0, WARNING: 1 }[left.severity] - { ERROR: 0, WARNING: 1 }[right.severity]) || left.code.localeCompare(right.code));
  const errors = diagnostics.filter((item) => item.severity === "ERROR").length;
  const warnings = diagnostics.filter((item) => item.severity === "WARNING").length;
  return {
    ...base,
    status: errors ? "ERROR" : warnings ? "WARNING" : "OK",
    canPublish: errors === 0 && warnings === 0,
    publicationGate: errors ? "BLOCKED" : warnings ? "REVIEW_REQUIRED" : "PASSED",
    summary: { errors, warnings, diagnostics: diagnostics.length },
    diagnostics
  };
}

function inaccessibleCause(entry, exactGroupsByInventory, candidateByInventory) {
  if (entry.accessible) return null;
  if (entry.course === "sin-determinar" || entry.records.some((record) => fold(record.sourceFile).includes("coach-data"))) return "AUXILIARY_HISTORICAL";
  for (const record of entry.records) {
    const groups = exactGroupsByInventory.get(record.inventoryId) || [];
    for (const group of groups) {
      if (group.inventoryIds.some((inventoryId) => candidateByInventory.get(inventoryId)?.accessible)) return "EXACT_DUPLICATE_ACCESSIBLE_ELSEWHERE";
    }
  }
  if (entry.records.some((record) => fold(record.sourceFile).includes("madrid-pau-authored")) && entry.community === "Sin determinar") return "INCOMPATIBLE_OR_UNMAPPED_MADRID_RECORD";
  return "LOADED_NOT_MATERIALIZED_BY_CURRENT_ROUTES";
}

function sourceFileManifest(files) {
  return [...new Set(files)].sort().map((relativeFile) => {
    const absolute = path.join(root, relativeFile);
    if (!fs.existsSync(absolute)) return { file: posix(relativeFile), exists: false, size: null, sha256: null };
    const body = fs.readFileSync(absolute);
    return { file: posix(relativeFile), exists: true, size: body.length, sha256: sha256(body) };
  });
}

function reportMarkdown(summary, coverage, pauCoverage, inaccessibleSummary, notConvertedSummary) {
  const table = (rows, fields) => [
    `| ${fields.join(" | ")} |`,
    `|${fields.map(() => "---").join("|")}|`,
    ...rows.map((row) => `| ${fields.map((field) => String(row[field] ?? "")).join(" | ")} |`)
  ].join("\n");
  return `# Resultado de importación canónica reversible — Fase 2

**Estado:** artefacto paralelo; no publicado ni conectado a producción.  
**Contrato:** \`${CANONICAL_EXERCISE_SCHEMA_VERSION}\`.

## Resumen

- Registros procesados: **${summary.recordsProcessed}**.
- Ejercicios originales reconciliados: **${summary.originalExercisesReconciled}**.
- Candidatos canónicos: **${summary.canonicalCandidates}**.
- \`PASSED\`: **${summary.PASSED}**.
- \`REVIEW_REQUIRED\`: **${summary.REVIEW_REQUIRED}**.
- \`BLOCKED\`: **${summary.BLOCKED}**.
- No convertidos: **${summary.notConverted}**.
- Inaccesibles conciliados: **${summary.inaccessibleReconciled}**.

## Cobertura por curso y materia

${table(coverage, ["courseId", "subjectId", "originalExercises", "candidates", "PASSED", "REVIEW_REQUIRED", "BLOCKED", "notConverted"])}

## PAU por materia y comunidad

${table(pauCoverage, ["subjectId", "community", "year", "sitting", "originalExercises", "PASSED", "REVIEW_REQUIRED", "BLOCKED"])}

## Causas de inaccesibilidad

${table(inaccessibleSummary, ["cause", "count"])}

## No convertidos

${table(notConvertedSummary, ["reason", "count"])}

## Garantías

- Los bancos, la aplicación, Supabase, los renderizadores y las skills no se modifican.
- Los candidatos permanecen en artefactos de auditoría y no son consumidos por el runtime.
- Los desconocidos se conservan como ausencias o diagnósticos; no se inventa contenido.
- Cada ejercicio original tiene expediente de conciliación, candidato o motivo exacto de no conversión.
`;
}

export function importCatalog(options = {}) {
  const inventoryPath = path.resolve(options.inventoryPath || DEFAULT_INVENTORY);
  const mappingsPath = path.resolve(options.mappingsPath || DEFAULT_MAPPINGS);
  const outputRoot = path.resolve(options.outputRoot || DEFAULT_OUTPUT_ROOT);
  const runId = clean(options.runId || "run-a");
  const outputDir = path.join(outputRoot, runId);
  if (fs.existsSync(outputDir)) throw new Error(`La ejecución ya existe y es inmutable: ${outputDir}`);
  fs.mkdirSync(outputDir, { recursive: true });

  const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
  const mappings = JSON.parse(fs.readFileSync(mappingsPath, "utf8"));
  if (inventory.records?.length !== 15527) throw new Error(`Línea base inesperada: ${inventory.records?.length ?? 0} registros; se esperaban 15527.`);

  const generatedAt = inventory.summary.generatedAt;
  const namespace = mappings.identityNamespace;
  const evidence = inventory.records.map((record) => ({
    sourceRecordId: `src-${uuidV5(namespace, sourceSeed(record))}`,
    inventoryRecordId: record.inventoryId,
    evidenceKind: record.originKind === "runtime-materialization" ? "runtime-observation" : "source-record",
    immutableHash: sha256(stableStringify(record)),
    original: record
  })).sort((a, b) => a.sourceRecordId.localeCompare(b.sourceRecordId));
  const evidenceByInventory = new Map(evidence.map((item) => [item.inventoryRecordId, item]));

  const statementGroups = new Map();
  for (const record of inventory.records.filter((item) => clean(item.statement))) {
    const key = uniqueIdentity(record);
    if (!statementGroups.has(key)) statementGroups.set(key, []);
    statementGroups.get(key).push(record);
  }
  if (statementGroups.size !== 6712) throw new Error(`Identidades de ejercicio inesperadas: ${statementGroups.size}; se esperaban 6712.`);

  const observedTaxonomy = new Map();
  const unmappedTaxonomy = [];
  const identityRegistry = [];
  const identityConflicts = [];
  const sourceToCanonical = [];
  const joinDecisions = [];
  const fieldProvenance = [];
  const candidates = [];
  const validations = [];
  const reconciliation = [];
  const notConverted = [];
  const assets = [];
  const candidateEntries = [];

  for (const [identityKey, group] of [...statementGroups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const records = sortRecords(group);
    const primary = records[0];
    const courseValues = uniqueObserved(records, (record) => record.course);
    const courseId = courseValues.length === 1 ? courseValues[0] : primary.course;
    const courseMap = mappings.courses[courseId];
    const candidateId = `cand-${uuidV5(namespace, `candidate|${identityKey}`)}`;
    const canonicalIdentity = courseMap ? canonicalIds(namespace, identityKey, 1) : null;
    const exerciseId = canonicalIdentity?.exerciseId || null;
    const sourceRecordIds = records.map((record) => evidenceByInventory.get(record.inventoryId).sourceRecordId).sort();
    const accessible = records.some((record) => record.accessible);
    const entry = { identityKey, candidateId, exerciseId, records, primary, courseId, courseMap, sourceRecordIds, accessible };
    candidateEntries.push(entry);

    if (!courseMap) {
      const reason = courseId === "sin-determinar" ? "AUXILIARY_RECORD" : "UNMAPPED_CLASSIFICATION";
      notConverted.push({ identityKey, candidateId, sourceRecordIds, courseId, reason, sourceFiles: [...new Set(records.map((record) => record.sourceFile))].sort() });
      identityRegistry.push({ identityKey, candidateId, exerciseId: null, status: "PROVISIONAL_NOT_CONVERTED", sourceRecordIds, legacyIds: [...new Set(records.flatMap((record) => [record.exerciseId, record.rawBaseId, record.currentId]).filter(Boolean))].sort() });
      for (const record of records) sourceToCanonical.push({ sourceRecordId: evidenceByInventory.get(record.inventoryId).sourceRecordId, inventoryRecordId: record.inventoryId, candidateId, exerciseId: null, relation: "NOT_CONVERTED", reason });
      continue;
    }

    const migrationDiagnostics = [];
    if (courseValues.length > 1) migrationDiagnostics.push({ severity: "ERROR", code: "COURSE_CONFLICT", path: "classification.courseId", message: "Las ocurrencias de la identidad tienen cursos incompatibles.", evidence: courseValues });
    const topicValues = uniqueObserved(records, (record) => isUnknown(record.topic, mappings) ? "" : record.topic);
    const blockValues = uniqueObserved(records, (record) => isUnknown(record.block, mappings) ? "" : record.block);
    if (topicValues.length > 1) migrationDiagnostics.push({ severity: "WARNING", code: "TOPIC_VARIANTS", path: "classification.topic", message: "La identidad presenta más de un tema literal.", evidence: topicValues });
    if (blockValues.length > 1) migrationDiagnostics.push({ severity: "WARNING", code: "BLOCK_VARIANTS", path: "classification.block", message: "La identidad presenta más de un bloque literal.", evidence: blockValues });
    const topic = taxonomyRef(topicValues[0] || primary.topic, "topic", courseId, mappings, observedTaxonomy, migrationDiagnostics);
    const block = taxonomyRef(blockValues[0] || primary.block, "block", courseId, mappings, observedTaxonomy, migrationDiagnostics);
    if (isUnknown(topicValues[0] || primary.topic, mappings)) unmappedTaxonomy.push({ candidateId, courseId, field: "topic", rawValue: primary.topic, reason: "UNMAPPED_TOPIC" });
    if (isUnknown(blockValues[0] || primary.block, mappings)) unmappedTaxonomy.push({ candidateId, courseId, field: "block", rawValue: primary.block, reason: "UNMAPPED_BLOCK" });

    const statements = uniqueObserved(records, (record) => record.statement);
    if (statements.length > 1) migrationDiagnostics.push({ severity: "WARNING", code: "STATEMENT_VARIANTS", path: "content.statement", message: "La identidad conserva variantes literales de enunciado.", evidence: statements.map((value) => sha256(value)) });
    const answerValues = uniqueObserved(records, (record) => record.answer);
    const solutionValues = uniqueObserved(records, (record) => record.solution);
    const answer = answerValues.length === 1 ? answerValues[0] : null;
    const solution = solutionValues.length === 1 ? solutionValues[0] : null;
    if (answerValues.length > 1) migrationDiagnostics.push({ severity: "ERROR", code: "ANSWER_CONFLICT", path: "answer.canonicalValue", message: "Las ocurrencias contienen respuestas incompatibles.", evidence: answerValues });
    if (solutionValues.length > 1) migrationDiagnostics.push({ severity: "ERROR", code: "SOLUTION_CONFLICT", path: "solution", message: "Las ocurrencias contienen soluciones incompatibles.", evidence: solutionValues.map((value) => sha256(value)) });
    joinDecisions.push({ candidateId, field: "answer", status: answer ? "VERIFIED_EXACT_UNIQUE" : answerValues.length ? "CONFLICT" : "MISSING", sourceRecordIds: records.filter((record) => clean(record.answer)).map((record) => evidenceByInventory.get(record.inventoryId).sourceRecordId), valueHash: answer ? sha256(answer) : null });
    joinDecisions.push({ candidateId, field: "solution", status: solution ? "VERIFIED_EXACT_UNIQUE" : solutionValues.length ? "CONFLICT" : "MISSING", sourceRecordIds: records.filter((record) => clean(record.solution)).map((record) => evidenceByInventory.get(record.inventoryId).sourceRecordId), valueHash: solution ? sha256(solution) : null });

    const profile = COURSE_PEDAGOGICAL_PROFILES[courseId];
    const modalities = modalitiesFromEvidence(records, profile, mappings);
    if (!modalities.length) migrationDiagnostics.push({ severity: "ERROR", code: "MODALITY_UNDEMONSTRATED", path: "modalities", message: "No existe evidencia suficiente para asignar una modalidad canónica." });
    const community = courseId.startsWith("2bach-") ? communityFromRecords(records, mappings, migrationDiagnostics) : null;
    const year = courseId.startsWith("2bach-") ? parseYear(records) : null;
    const sitting = courseId.startsWith("2bach-") ? parseSitting(records) : null;
    const correctSource = records.find((record) => record.options?.length === 4 && Number.isInteger(record.correctIndex) && record.correctIndex >= 0 && record.correctIndex < 4);
    const optionShapes = new Set(records.filter((record) => record.options?.length).map((record) => stableStringify({ options: record.options, correctIndex: record.correctIndex })));
    if (optionShapes.size > 1) migrationDiagnostics.push({ severity: "WARNING", code: "OPTIONS_VARIANTS", path: "choices", message: "La identidad conserva más de una configuración de opciones.", evidence: optionShapes.size });
    const choices = correctSource ? {
      correct: { choiceId: `choice-${uuidV5(namespace, `${candidateId}|correct|${correctSource.correctIndex}|${correctSource.options[correctSource.correctIndex]}`)}`, value: correctSource.options[correctSource.correctIndex], rationale: null },
      distractors: correctSource.options.map((value, index) => ({ value, index })).filter((item) => item.index !== correctSource.correctIndex).map((item) => ({ choiceId: `choice-${uuidV5(namespace, `${candidateId}|distractor|${item.index}|${item.value}`)}`, value: item.value, rationale: null })),
      shufflePolicy: "seeded-per-attempt",
      equivalencePolicy: "safe-normalization-v1"
    } : null;
    if (primary.options?.length && !correctSource) migrationDiagnostics.push({ severity: "ERROR", code: "OPTIONS_NOT_CONVERTIBLE", path: "choices", message: "Las opciones no identifican de forma inequívoca una única respuesta correcta." });

    const sourceFindings = findingsFromRecords(records);
    const finalOnly = records.some((record) => record.flags?.finalAnswerOnly);
    const solutionKind = !solution ? "missing" : finalOnly ? "final-only" : "developed";
    const primaryEvidence = evidenceByInventory.get(primary.inventoryId);
    const legacyIds = [...new Set(records.flatMap((record) => [record.exerciseId, record.rawBaseId, record.currentId]).map(clean).filter(Boolean))].sort();
    const candidate = {
      schemaVersion: CANONICAL_EXERCISE_SCHEMA_VERSION,
      identity: { ...canonicalIdentity, legacyIds, contentHash: sha256(stableStringify({ statement: primary.statement, answer, solution, options: choices })) },
      classification: { stage: courseMap.stage, courseId, subjectId: courseMap.subjectId, topic, block, curriculumVersion: null },
      difficulty: difficultyFromRecord(primary, mappings),
      modalities,
      provenance: {
        kind: courseId.startsWith("2bach-") ? "official-pau" : primary.originKind === "runtime-materialization" ? "generated" : "legacy",
        community,
        pau: courseId.startsWith("2bach-") ? { year, sitting, examOption: null, exerciseLabel: clean(primary.currentId) || null, block: block?.label || null, exercise: null, part: null, otherMetadata: {} } : null,
        source: { sourceId: primaryEvidence.sourceRecordId, sourceType: primary.originKind === "runtime-materialization" ? "runtime-materialization" : "script", sourceFile: primary.sourceFile, sourcePath: primary.sourcePath, page: null, originalAssetHash: null }
      },
      content: {
        language: "es",
        statement: { plainText: primary.statement, blocks: [{ blockId: "statement-1", type: "text", value: primary.statement, sourceLiteral: primary.statement }] },
        mathRepresentations: mapMathFormats(primary),
        assets: []
      },
      answer: { kind: choices ? "choice" : "open", canonicalValue: answer, acceptedValues: [], units: null, tolerance: null },
      solution: {
        kind: solutionKind,
        pedagogicalProfile: profile,
        steps: solutionKind === "developed" ? [{ stepId: "legacy-step-1", explanation: solution, work: { plainText: solution, blocks: [{ blockId: "legacy-solution-1", type: "text", value: solution, sourceLiteral: solution }] } }] : [],
        finalAnswer: answer || (solutionKind === "final-only" ? solution : null),
        verification: null,
        methodConstraints: []
      },
      choices,
      review: { status: "DRAFT", solutionNeedsReview: Boolean(sourceFindings.length || solutionKind !== "developed"), findings: sourceFindings, reviewedBy: null, reviewedAt: null },
      traceability: {
        inventoryRecordIds: records.map((record) => record.inventoryId).sort(),
        originalIdentity: identityKey,
        transformations: [{ kind: "import", description: "Importación estructural reversible desde el inventario inmutable de Fase 0; sin corrección matemática.", at: generatedAt, by: "fase2-import-catalog" }]
      },
      publication: { status: "DRAFT", eligibleModalities: [], exclusionReasons: [...new Set([...sourceFindings, ...migrationDiagnostics.map((item) => item.code)])].sort() }
    };
    const validation = mergeValidation(validateCanonicalExercise(candidate, { mode: "draft" }), migrationDiagnostics);
    candidates.push({ candidateId, exercise: candidate });
    validations.push({ candidateId, exerciseId, ...validation });
    for (const diagnostic of migrationDiagnostics.filter((item) => item.code.endsWith("_CONFLICT"))) {
      identityConflicts.push({ candidateId, code: diagnostic.code, evidence: diagnostic.evidence || [] });
    }
    identityRegistry.push({ identityKey, candidateId, exerciseId, revisionId: candidate.identity.revisionId, status: "STABLE", seed: `exercise|${identityKey}`, sourceRecordIds, legacyIds });
    for (const record of records) sourceToCanonical.push({ sourceRecordId: evidenceByInventory.get(record.inventoryId).sourceRecordId, inventoryRecordId: record.inventoryId, candidateId, exerciseId, relation: record === primary ? "PRIMARY_EVIDENCE" : "SUPPORTING_EVIDENCE", reason: null });
    for (const [field, sourcePath, value] of [
      ["classification.courseId", "course", courseId], ["classification.topic", "topic", primary.topic], ["classification.block", "block", primary.block],
      ["content.statement", "statement", primary.statement], ["answer.canonicalValue", "answer", answer], ["solution", "solution", solution],
      ["provenance.community", "community", community], ["provenance.pau.year", "provenance/source coordinates", year], ["provenance.pau.sitting", "provenance/source coordinates", sitting]
    ]) fieldProvenance.push({ candidateId, field, value, knowledge: value === null || value === "" ? "UNKNOWN" : field.startsWith("classification") || field.startsWith("provenance.pau") ? "DERIVED_SAFE" : "OBSERVED", sourceRecordIds, sourcePath, rule: value === null || value === "" ? "preserve-unknown" : "fase2-structural-import-v1" });
    if (primary.mathFormat?.some((item) => fold(item).includes("imagen"))) assets.push({ candidateId, sourceRecordIds, status: "REFERENCE_NOT_CAPTURED_IN_PHASE0", sourceFile: primary.sourceFile, sourcePath: primary.sourcePath, uri: null, sha256: null });
  }

  const associatedSourceRecordIds = new Set(sourceToCanonical.map((item) => item.sourceRecordId));
  for (const item of evidence) {
    if (associatedSourceRecordIds.has(item.sourceRecordId)) continue;
    const reason = clean(item.original.statement)
      ? "STATEMENT_RECORD_NOT_GROUPED"
      : item.evidenceKind === "runtime-observation"
        ? "AUXILIARY_RUNTIME_OBSERVATION_WITHOUT_STATEMENT"
        : "AUXILIARY_SOURCE_RECORD_WITHOUT_STATEMENT";
    sourceToCanonical.push({
      sourceRecordId: item.sourceRecordId,
      inventoryRecordId: item.inventoryRecordId,
      candidateId: null,
      exerciseId: null,
      relation: item.evidenceKind === "runtime-observation" ? "AUXILIARY_RUNTIME_OBSERVATION" : "AUXILIARY_EVIDENCE",
      reason
    });
  }
  sourceToCanonical.sort((a, b) => a.sourceRecordId.localeCompare(b.sourceRecordId));

  const candidateByInventory = new Map();
  for (const entry of candidateEntries) for (const record of entry.records) candidateByInventory.set(record.inventoryId, entry);
  const exactGroupsByInventory = new Map();
  for (const group of inventory.exactDuplicateGroups) for (const inventoryId of group.inventoryIds) {
    if (!exactGroupsByInventory.has(inventoryId)) exactGroupsByInventory.set(inventoryId, []);
    exactGroupsByInventory.get(inventoryId).push(group);
  }

  for (const entry of candidateEntries) {
    entry.community = entry.exerciseId
      ? (candidates.find((item) => item.candidateId === entry.candidateId)?.exercise.provenance.community?.name || "Sin determinar")
      : "Sin determinar";
    const validation = validations.find((item) => item.candidateId === entry.candidateId);
    const nonConvertedEntry = notConverted.find((item) => item.candidateId === entry.candidateId);
    const cause = inaccessibleCause(entry, exactGroupsByInventory, candidateByInventory);
    const candidate = candidates.find((item) => item.candidateId === entry.candidateId)?.exercise || null;
    reconciliation.push({
      originalIdentity: entry.identityKey,
      sourceRecordIds: entry.sourceRecordIds,
      inventoryRecordIds: entry.records.map((record) => record.inventoryId).sort(),
      origins: [...new Set(entry.records.map((record) => `${record.sourceFile}#${record.sourcePath}`))].sort(),
      candidateId: nonConvertedEntry ? null : entry.candidateId,
      proposedCandidateId: entry.candidateId,
      exerciseId: entry.exerciseId,
      courseId: entry.courseId,
      subjectId: entry.courseMap?.subjectId || null,
      topic: candidate?.classification.topic?.label || clean(entry.primary.topic) || null,
      block: candidate?.classification.block?.label || clean(entry.primary.block) || null,
      provenance: clean(entry.primary.provenance) || null,
      community: candidate?.provenance.community?.name || null,
      pauYear: candidate?.provenance.pau?.year ?? null,
      pauSitting: candidate?.provenance.pau?.sitting ?? null,
      accessible: entry.accessible,
      inaccessibleCause: cause,
      state: nonConvertedEntry ? "NOT_CONVERTED" : validation.publicationGate,
      publicationImpediments: nonConvertedEntry ? [nonConvertedEntry.reason] : validation.diagnostics.map((item) => item.code),
      notConvertedReason: nonConvertedEntry?.reason || null
    });
  }

  const duplicateClusters = inventory.exactDuplicateGroups.map((group) => ({
    type: "EXACT_DUPLICATE",
    statementHash: group.statementHash,
    occurrences: group.occurrences,
    sourceRecordIds: group.inventoryIds.map((id) => evidenceByInventory.get(id)?.sourceRecordId).filter(Boolean),
    candidateIds: [...new Set(group.inventoryIds.map((id) => candidateByInventory.get(id)?.candidateId).filter(Boolean))].sort(),
    status: "REVIEW_REQUIRED"
  })).sort((a, b) => a.statementHash.localeCompare(b.statementHash));
  const possibleEquivalents = inventory.possibleEquivalentGroups.map((group) => ({
    key: group.key,
    occurrences: group.occurrences,
    sourceRecordIds: group.inventoryIds.map((id) => evidenceByInventory.get(id)?.sourceRecordId).filter(Boolean),
    candidateIds: [...new Set(group.inventoryIds.map((id) => candidateByInventory.get(id)?.candidateId).filter(Boolean))].sort(),
    status: "MATHEMATICAL_REVIEW_REQUIRED"
  })).sort((a, b) => a.key.localeCompare(b.key));

  const statusByCandidate = new Map(validations.map((item) => [item.candidateId, item.publicationGate]));
  const coverageMap = new Map();
  for (const row of reconciliation) {
    const key = `${row.courseId}|${row.subjectId || "sin-materia"}`;
    if (!coverageMap.has(key)) coverageMap.set(key, { courseId: row.courseId, subjectId: row.subjectId || "sin-materia", originalExercises: 0, candidates: 0, PASSED: 0, REVIEW_REQUIRED: 0, BLOCKED: 0, notConverted: 0 });
    const value = coverageMap.get(key);
    value.originalExercises += 1;
    if (row.state === "NOT_CONVERTED") value.notConverted += 1;
    else { value.candidates += 1; value[row.state] += 1; }
  }
  const coverage = [...coverageMap.values()].sort((a, b) => a.courseId.localeCompare(b.courseId));
  const pauMap = new Map();
  for (const row of reconciliation.filter((item) => item.courseId.startsWith("2bach-"))) {
    const key = [row.subjectId, row.community || "Sin determinar", row.pauYear ?? "Sin determinar", row.pauSitting || "Sin determinar"].join("|");
    if (!pauMap.has(key)) pauMap.set(key, { subjectId: row.subjectId, community: row.community || "Sin determinar", year: row.pauYear ?? "Sin determinar", sitting: row.pauSitting || "Sin determinar", originalExercises: 0, PASSED: 0, REVIEW_REQUIRED: 0, BLOCKED: 0 });
    const value = pauMap.get(key);
    value.originalExercises += 1;
    if (row.state !== "NOT_CONVERTED") value[row.state] += 1;
  }
  const pauCoverage = [...pauMap.values()].sort((a, b) => [a.subjectId, a.community, String(a.year), a.sitting].join("|").localeCompare([b.subjectId, b.community, String(b.year), b.sitting].join("|")));
  const countRows = (values, getter) => [...values.reduce((map, item) => map.set(getter(item), (map.get(getter(item)) || 0) + 1), new Map()).entries()].map(([key, count]) => ({ [getter === inaccessibleGetter ? "cause" : "reason"]: key, count })).sort((a, b) => b.count - a.count);
  const inaccessibleGetter = (item) => item.inaccessibleCause;
  const inaccessibleRows = reconciliation.filter((item) => !item.accessible);
  const inaccessibleSummary = countRows(inaccessibleRows, inaccessibleGetter);
  const notConvertedSummary = [...notConverted.reduce((map, item) => map.set(item.reason, (map.get(item.reason) || 0) + 1), new Map()).entries()].map(([reason, count]) => ({ reason, count })).sort((a, b) => b.count - a.count);
  const validationSummary = {
    validatorVersion: validations[0]?.validatorVersion || null,
    candidates: candidates.length,
    PASSED: validations.filter((item) => item.publicationGate === "PASSED").length,
    REVIEW_REQUIRED: validations.filter((item) => item.publicationGate === "REVIEW_REQUIRED").length,
    BLOCKED: validations.filter((item) => item.publicationGate === "BLOCKED").length,
    diagnosticCodes: Object.fromEntries([...validations.flatMap((item) => item.diagnostics).reduce((map, item) => map.set(item.code, (map.get(item.code) || 0) + 1), new Map()).entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])))
  };
  const reconciliationSummary = {
    recordsProcessed: evidence.length,
    sourceRecords: evidence.filter((item) => item.evidenceKind === "source-record").length,
    runtimeObservations: evidence.filter((item) => item.evidenceKind === "runtime-observation").length,
    originalExercisesReconciled: reconciliation.length,
    canonicalCandidates: candidates.length,
    notConverted: notConverted.length,
    inaccessibleReconciled: inaccessibleRows.length,
    PASSED: validationSummary.PASSED,
    REVIEW_REQUIRED: validationSummary.REVIEW_REQUIRED,
    BLOCKED: validationSummary.BLOCKED,
    baseline: { records: 15527, originalExercises: 6712, accessible: 6105, inaccessible: 607 }
  };

  const inputFiles = [
    rel(inventoryPath), "docs/FASE-0-INVENTARIO-CATALOGO-MATHUP.csv", "docs/FASE-0-INVENTARIO-CONTRATO-CATALOGO-MATHUP.md",
    "docs/FASE-0B-DIAGNOSTICO-CATALOGO-MATHUP.md", "docs/FASE-1-ESQUEMA-VALIDADOR-CATALOGO-MATHUP.md",
    "docs/PLAN-FASE-2-CATALOGO-CANONICO-MATHUP.md", "catalog/canonical-exercise.schema.json", "catalog/canonical-exercise.mjs",
    "catalog/validate-canonical-exercise.mjs", rel(mappingsPath), "scripts/fase0-inventory-catalog.mjs", "scripts/fase2-import-catalog.mjs",
    "index.html", ...inventory.scriptManifest.map((item) => item.file)
  ];
  const inputManifest = { manifestVersion: "mathup.fase2.inputs.v1", files: sourceFileManifest(inputFiles) };
  const taxonomyOutput = {
    mappingVersion: mappings.mappingVersion,
    staticMappingsHash: sha256(fs.readFileSync(mappingsPath)),
    courses: mappings.courses,
    communities: mappings.communities,
    observed: [...observedTaxonomy.values()].sort((a, b) => a.canonical.id.localeCompare(b.canonical.id))
  };
  const runManifest = {
    runId,
    phase: "Fase 2 - Importación canónica reversible",
    generatedAt,
    inputInventory: rel(inventoryPath),
    inputInventorySha256: sha256(fs.readFileSync(inventoryPath)),
    mappingVersion: mappings.mappingVersion,
    schemaVersion: CANONICAL_EXERCISE_SCHEMA_VERSION,
    productionConnected: false,
    supabaseWrites: false,
    semanticArtifacts: SEMANTIC_ARTIFACTS
  };

  writeJson(path.join(outputDir, "run-manifest.json"), runManifest);
  writeJson(path.join(outputDir, "input-manifest.json"), inputManifest);
  writeJsonl(path.join(outputDir, "source-records.jsonl"), evidence);
  writeJsonl(path.join(outputDir, "runtime-observations.jsonl"), evidence.filter((item) => item.evidenceKind === "runtime-observation"));
  writeJson(path.join(outputDir, "taxonomy-mappings.json"), taxonomyOutput);
  writeCsv(path.join(outputDir, "unmapped-taxonomy.csv"), unmappedTaxonomy, ["candidateId", "courseId", "field", "rawValue", "reason"]);
  writeJson(path.join(outputDir, "identity-registry.json"), { namespace, algorithm: "UUIDv5/SHA-1", entries: identityRegistry });
  writeCsv(path.join(outputDir, "identity-conflicts.csv"), identityConflicts, ["candidateId", "code", "evidence"]);
  writeJsonl(path.join(outputDir, "source-to-canonical.jsonl"), sourceToCanonical);
  writeJson(path.join(outputDir, "duplicate-clusters.json"), duplicateClusters);
  writeCsv(path.join(outputDir, "possible-equivalents.csv"), possibleEquivalents, ["key", "occurrences", "candidateIds", "sourceRecordIds", "status"]);
  writeJsonl(path.join(outputDir, "join-decisions.jsonl"), joinDecisions);
  writeJsonl(path.join(outputDir, "field-provenance.jsonl"), fieldProvenance);
  writeJsonl(path.join(outputDir, "canonical-candidates.jsonl"), candidates);
  writeJsonl(path.join(outputDir, "validation-results.jsonl"), validations);
  writeJson(path.join(outputDir, "validation-summary.json"), validationSummary);
  const queueRows = (gate) => validations.filter((item) => item.publicationGate === gate).map((item) => ({ candidateId: item.candidateId, exerciseId: item.exerciseId, errors: item.summary.errors, warnings: item.summary.warnings, diagnosticCodes: item.diagnostics.map((diag) => diag.code) }));
  writeCsv(path.join(outputDir, "queue-blocked.csv"), queueRows("BLOCKED"), ["candidateId", "exerciseId", "errors", "warnings", "diagnosticCodes"]);
  writeCsv(path.join(outputDir, "queue-review-required.csv"), queueRows("REVIEW_REQUIRED"), ["candidateId", "exerciseId", "errors", "warnings", "diagnosticCodes"]);
  writeCsv(path.join(outputDir, "queue-passed.csv"), queueRows("PASSED"), ["candidateId", "exerciseId", "errors", "warnings", "diagnosticCodes"]);
  writeCsv(path.join(outputDir, "inaccessible-classification.csv"), inaccessibleRows, ["originalIdentity", "candidateId", "exerciseId", "courseId", "subjectId", "community", "state", "inaccessibleCause", "publicationImpediments", "sourceRecordIds"]);
  writeJson(path.join(outputDir, "assets-manifest.json"), { assets, unresolved: assets.filter((item) => item.status !== "VERIFIED").length });
  writeJson(path.join(outputDir, "reconciliation.json"), { summary: reconciliationSummary, coverage, inaccessibleSummary, notConvertedSummary });
  writeJsonl(path.join(outputDir, "educational-content-reconciliation.jsonl"), reconciliation);
  writeCsv(path.join(outputDir, "coverage-by-course-subject.csv"), coverage, ["courseId", "subjectId", "originalExercises", "candidates", "PASSED", "REVIEW_REQUIRED", "BLOCKED", "notConverted"]);
  writeCsv(path.join(outputDir, "pau-coverage-by-provenance.csv"), pauCoverage, ["subjectId", "community", "year", "sitting", "originalExercises", "PASSED", "REVIEW_REQUIRED", "BLOCKED"]);
  writeCsv(path.join(outputDir, "not-converted.csv"), notConverted, ["identityKey", "candidateId", "courseId", "reason", "sourceFiles", "sourceRecordIds"]);
  fs.writeFileSync(path.join(outputDir, "migration-report.md"), reportMarkdown(reconciliationSummary, coverage, pauCoverage, inaccessibleSummary, notConvertedSummary), "utf8");

  const rollbackManifest = {
    rollbackVersion: "mathup.fase2.rollback.v1",
    safeRemovalRoot: rel(outputDir),
    createdFiles: [...SEMANTIC_ARTIFACTS, "run-manifest.json", "rollback-manifest.json", "checksums.sha256"].sort(),
    productionFilesModified: [],
    externalWrites: [],
    procedure: ["Verify safeRemovalRoot is inside artifacts/fase2/runs.", "Verify checksums.", "Remove only the run directory.", "Re-run production integrity checks."]
  };
  writeJson(path.join(outputDir, "rollback-manifest.json"), rollbackManifest);
  const checksumFiles = fs.readdirSync(outputDir).filter((name) => name !== "checksums.sha256").sort();
  fs.writeFileSync(path.join(outputDir, "checksums.sha256"), `${checksumFiles.map((name) => `${sha256(fs.readFileSync(path.join(outputDir, name)))}  ${name}`).join("\n")}\n`, "utf8");

  return { outputDir, runId, semanticArtifacts: SEMANTIC_ARTIFACTS, summary: reconciliationSummary, validationSummary, coverage, pauCoverage, inaccessibleSummary, notConvertedSummary };
}

function parseArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith("--")) continue;
    values[argument.slice(2)] = argv[index + 1] && !argv[index + 1].startsWith("--") ? argv[++index] : true;
  }
  return values;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  const result = importCatalog({ inventoryPath: args.inventory, mappingsPath: args.mappings, outputRoot: args["output-root"], runId: args["run-id"] });
  console.log(stableStringify({ outputDir: rel(result.outputDir), summary: result.summary, validationSummary: result.validationSummary }, 2));
}

export { SEMANTIC_ARTIFACTS };

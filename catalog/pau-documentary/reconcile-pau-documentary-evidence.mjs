import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join, relative, resolve } from "node:path";
import {
  decisionId,
  documentExerciseId,
  documentId,
  documentSubpartId,
  literalHash,
  normalizeCommunity,
  normalizeSitting,
  normalizeSubject,
  normalizeSubpartLabel,
  normalizedLiteral,
  redirectId,
  semanticHash,
  sha256,
  stableStringify
} from "./pau-document-identities.mjs";

export const CASE_ONE = Object.freeze({
  visualEntityId: "vent-421552a489e688ce586b07f0c1870560",
  exerciseId: "ex-25662a75-7e5e-5935-903f-0d41aa138462",
  revisionId: "ex-25662a75-7e5e-5935-903f-0d41aa138462:r1",
  statementSourceRecordId: "src-45bd33c7-c79f-50db-91aa-c41796fadff6",
  scopedEvidence: [
    { alternativeKey: "4.1", subpart: "a", sourceRecordId: "src-0dd76dd7-a689-5bef-8d62-f5cbd7916560" },
    { alternativeKey: "4.1", subpart: "b", sourceRecordId: "src-be221980-06eb-59a7-a221-967b2afb58e5" },
    { alternativeKey: "4.2", subpart: "a", sourceRecordId: "src-d61fbaa9-a982-5694-a4e3-c6f08f849d90" },
    { alternativeKey: "4.2", subpart: "b", sourceRecordId: "src-2c3dd537-6d18-5aef-be45-97ca526a84b5" }
  ]
});

const DEFAULT_ROOTS = [
  {
    rootId: "OFFICIAL_MATES_II_CLM",
    subject: "Matemáticas II",
    community: "Castilla-La Mancha",
    path: "C:\\Users\\aherr\\OneDrive\\Josefina Clases\\Ex Mates II"
  },
  {
    rootId: "OFFICIAL_CCSS_II_CLM",
    subject: "Matemáticas Aplicadas a las CCSS II",
    community: "Castilla-La Mancha",
    path: "C:\\Users\\aherr\\OneDrive\\Josefina Clases\\Ex CCSS II"
  }
];

export function listPdfFiles(rootPath) {
  const output = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, "es"))) {
      const fullPath = join(directory, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.isFile() && extname(entry.name).toLowerCase() === ".pdf") output.push(fullPath);
    }
  };
  walk(rootPath);
  return output;
}

function extractPdfText(pdfPath, pdftotextPath) {
  const result = spawnSync(pdftotextPath, ["-layout", "-enc", "UTF-8", pdfPath, "-"], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
    windowsHide: true
  });
  if (result.error || result.status !== 0) {
    return { status: "FAILED", error: result.error?.message || String(result.stderr || "pdftotext error"), pages: [] };
  }
  const raw = String(result.stdout || "").replace(/\r\n/g, "\n");
  const pages = raw.split("\f");
  if (pages.at(-1) === "") pages.pop();
  return { status: raw.trim() ? "EXTRACTED" : "EMPTY", error: null, pages: pages.length ? pages : [""] };
}

function yearFromPath(pathValue) {
  const file = basename(pathValue).toLowerCase();
  const four = file.match(/(?:^|\D)(20\d{2})(?:\D|$)/);
  if (four) return Number(four[1]);
  const two = file.match(/^(\d{2})(?:[-_])/);
  if (!two) return null;
  const value = Number(two[1]);
  return value >= 80 ? 1900 + value : 2000 + value;
}

function yearFromText(text) {
  const course = text.match(/curso\s+(20\d{2})\s*[\/-]\s*(20\d{2})/i);
  if (course) return Number(course[2]);
  const values = [...text.matchAll(/\b(20\d{2})\b/g)].map((match) => Number(match[1])).filter((year) => year >= 2000 && year <= 2100);
  return values.length === 1 ? values[0] : null;
}

function sittingFromPath(pathValue) {
  const file = basename(pathValue).toLowerCase();
  if (/exjun|junio|ordinaria/.test(file)) return "Ordinaria";
  if (/exjul|julio|exsep|septiembre|extraordinaria/.test(file)) return "Extraordinaria";
  return null;
}

function metadataEvidence({ root, pdfPath, pages }) {
  const text = pages.join("\n");
  const subjectInText = normalizeSubject(text);
  const communityInText = normalizeCommunity(text);
  const sittingInText = normalizeSitting(text);
  const textYear = yearFromText(text);
  const pathYear = yearFromPath(pdfPath);
  const pathSitting = sittingFromPath(pdfPath);
  const evidence = [
    { field: "sha256", kind: "DOCUMENT_BYTES" },
    { field: "archive", kind: "AUDITED_OFFICIAL_ARCHIVE", rootId: root.rootId }
  ];
  if (subjectInText) evidence.push({ field: "subject", kind: "DOCUMENT_TEXT", value: subjectInText });
  else evidence.push({ field: "subject", kind: "AUDITED_ARCHIVE_ROOT", value: root.subject });
  if (communityInText) evidence.push({ field: "community", kind: "DOCUMENT_TEXT", value: communityInText });
  else evidence.push({ field: "community", kind: "AUDITED_ARCHIVE_ROOT", value: root.community });
  if (textYear) evidence.push({ field: "year", kind: "DOCUMENT_TEXT", value: textYear });
  else if (pathYear) evidence.push({ field: "year", kind: "AUDITED_ARCHIVE_FILENAME", value: pathYear });
  if (sittingInText) evidence.push({ field: "sitting", kind: "DOCUMENT_TEXT", value: sittingInText });
  else if (pathSitting) evidence.push({ field: "sitting", kind: "AUDITED_ARCHIVE_FILENAME", value: pathSitting });
  const subject = subjectInText || root.subject || null;
  const community = communityInText || root.community || null;
  const year = textYear || pathYear || null;
  const sitting = sittingInText || pathSitting || null;
  const textBacked = Boolean(subjectInText && communityInText && textYear && sittingInText);
  const status = textBacked ? "VERIFIED" : (subject || community || year || sitting ? "PARTIAL" : "UNIDENTIFIED");
  return { subject, community, year, sitting, status, evidence };
}

export function buildDocumentRegistry({ roots = DEFAULT_ROOTS, pdftotextPath, reverse = false }) {
  const entries = [];
  for (const root of roots) {
    if (!existsSync(root.path)) continue;
    for (const pdfPath of listPdfFiles(root.path)) {
      const bytes = readFileSync(pdfPath);
      const documentHash = sha256(bytes);
      const extracted = extractPdfText(pdfPath, pdftotextPath);
      const metadata = metadataEvidence({ root, pdfPath, pages: extracted.pages });
      const rel = relative(root.path, pdfPath).replace(/\\/g, "/");
      const record = {
        schemaVersion: "mathup.pau-document.v1",
        documentId: documentId(documentHash),
        documentHash,
        path: `${root.rootId}/${rel}`,
        pageCount: extracted.pages.length || 1,
        subject: metadata.subject,
        community: metadata.community,
        year: metadata.year,
        sitting: metadata.sitting,
        verification: {
          status: metadata.status,
          evidence: metadata.evidence,
          textExtraction: extracted.status
        }
      };
      entries.push({ record, pages: extracted.pages, absolutePath: pdfPath, extractionError: extracted.error });
    }
  }
  entries.sort((a, b) => a.record.documentHash.localeCompare(b.record.documentHash));
  if (reverse) entries.reverse();
  return entries;
}

function segment(page, startOffset, endOffset) {
  const literal = page.slice(startOffset, endOffset).trim();
  return { literal, literalHash: literalHash(literal), startOffset, endOffset };
}

function firstLineEnd(text, offset = 0) {
  const index = text.indexOf("\n", offset);
  return index < 0 ? text.length : index;
}

function findEditorialInstruction(literal, pageNumber, baseOffset) {
  const match = literal.match(/(?:Conteste|Responda|Elija|Seleccione)[^\n.]*?(?:\.|\n|$)/i);
  if (!match || !/(?:solo|solamente|una|uno|alternativa|opci[oó]n)/i.test(match[0])) return null;
  const startOffset = baseOffset + (match.index || 0);
  return {
    literal: match[0].trim(),
    literalHash: literalHash(match[0].trim()),
    page: pageNumber,
    startOffset,
    endOffset: startOffset + match[0].length
  };
}

function parseSubparts(exercise, pageText) {
  const start = exercise.sourceRange.startOffset;
  const end = exercise.sourceRange.endOffset;
  const literal = pageText.slice(start, end);
  const matches = [...literal.matchAll(/(?:^|\n)\s*([a-z])\)\s*/gim)];
  if (!matches.length) return [];
  const labels = matches.map((match) => match[1].toLowerCase());
  if (new Set(labels).size !== labels.length) return [];
  return matches.map((match, index) => {
    const localStart = (match.index || 0) + match[0].length;
    const localEnd = index + 1 < matches.length ? (matches[index + 1].index || literal.length) : literal.length;
    const statement = literal.slice(localStart, localEnd).trim();
    const label = `${match[1].toLowerCase()})`;
    const id = documentSubpartId(exercise.documentExerciseId, label);
    return {
      schemaVersion: "mathup.pau-document-subpart.v1",
      documentSubpartId: id,
      documentExerciseId: exercise.documentExerciseId,
      label,
      normalizedLabel: normalizeSubpartLabel(label),
      ordinal: index + 1,
      statement,
      statementHash: literalHash(statement),
      sourceRange: {
        page: exercise.sourceRange.page,
        startOffset: start + localStart,
        endOffset: start + localEnd
      }
    };
  });
}

function createExercise({ document, page, pageNumber, questionKey, alternativeKey, startOffset, endOffset, instruction }) {
  const raw = page.slice(startOffset, endOffset).trim();
  let statement = raw
    .replace(/^\s*(?:Pregunta|Ejercicio|Cuesti[oó]n)\s+\d+(?:\.\d+)?\s*[.:]?\s*/i, "")
    .replace(/^\s*[1-9]\s*[.]\s+/i, "")
    .replace(/^\s*\d+\.\d+\s*[.:]?\s*/i, "")
    .trim();
  if (instruction?.literal && statement.startsWith(instruction.literal)) statement = statement.slice(instruction.literal.length).trim();
  const id = documentExerciseId({
    documentHash: document.documentHash,
    subject: document.subject,
    questionKey,
    alternativeKey
  });
  const exercise = {
    schemaVersion: "mathup.pau-document-exercise.v1",
    documentExerciseId: id,
    documentId: document.documentId,
    documentHash: document.documentHash,
    subject: document.subject || "Materia no verificada",
    questionKey,
    alternativeKey,
    statement,
    statementHash: literalHash(statement),
    editorialInstruction: instruction,
    sourceRange: { page: pageNumber, startOffset, endOffset },
    subpartRefs: []
  };
  const subparts = parseSubparts(exercise, page);
  exercise.subpartRefs = subparts.map((part) => part.documentSubpartId);
  return { exercise, subparts };
}

export function extractExamStructure(documentEntry) {
  const { record: document, pages } = documentEntry;
  const generalInstructions = [];
  const blocks = [];
  const questions = [];
  const exercises = [];
  const subparts = [];
  for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
    const page = pages[pageIndex];
    const pageNumber = pageIndex + 1;
    for (const blockMatch of page.matchAll(/^\s*(?:PARTE|BLOQUE)\s+([A-Z0-9IVX]+)[^\n]*$/gim)) {
      const startOffset = blockMatch.index || 0;
      const endOffset = firstLineEnd(page, startOffset);
      blocks.push({ ...segment(page, startOffset, endOffset), page: pageNumber, key: blockMatch[1], kind: "BLOCK", instruction: null });
    }
    const proposalMatch = page.match(/^\s*(?:Propuesta|Opci[oó]n)\s+([AB])\s*$/im);
    const proposalKey = proposalMatch ? proposalMatch[1].toUpperCase() : null;
    const questionMatches = [...page.matchAll(/^(?:\s*(?:Pregunta|Ejercicio|Cuesti[oó]n)\s+(\d+)\s*[.:][^\n]*|\s*([1-9])\s*[.]\s+[^\n]*)$/gim)];
    if (questionMatches.length && questionMatches[0].index > 0) {
      const prefix = page.slice(0, questionMatches[0].index).trim();
      if (/instrucciones|criterios|el examen|conteste|responda/i.test(prefix)) {
        generalInstructions.push({ ...segment(page, 0, questionMatches[0].index), page: pageNumber });
      }
    }
    for (let questionIndex = 0; questionIndex < questionMatches.length; questionIndex += 1) {
      const match = questionMatches[questionIndex];
      const questionStart = match.index || 0;
      const questionEnd = questionIndex + 1 < questionMatches.length ? (questionMatches[questionIndex + 1].index || page.length) : page.length;
      const questionLiteral = page.slice(questionStart, questionEnd);
      const questionKey = match[1] || match[2];
      const instruction = findEditorialInstruction(questionLiteral, pageNumber, questionStart);
      questions.push({
        ...segment(page, questionStart, questionEnd),
        page: pageNumber,
        key: questionKey,
        kind: "QUESTION",
        instruction
      });
      const alternativeMatches = [...questionLiteral.matchAll(/^\s*(\d+\.\d+)\s*[.:][^\n]*$/gim)];
      if (alternativeMatches.length >= 2) {
        for (let altIndex = 0; altIndex < alternativeMatches.length; altIndex += 1) {
          const alt = alternativeMatches[altIndex];
          const startOffset = questionStart + (alt.index || 0);
          const endOffset = altIndex + 1 < alternativeMatches.length
            ? questionStart + (alternativeMatches[altIndex + 1].index || questionLiteral.length)
            : questionEnd;
          const created = createExercise({
            document,
            page,
            pageNumber,
            questionKey,
            alternativeKey: alt[1],
            startOffset,
            endOffset,
            instruction
          });
          exercises.push(created.exercise);
          subparts.push(...created.subparts);
        }
      } else {
        const created = createExercise({
          document,
          page,
          pageNumber,
          questionKey,
          alternativeKey: proposalKey || "NONE",
          startOffset: questionStart,
          endOffset: questionEnd,
          instruction
        });
        exercises.push(created.exercise);
        subparts.push(...created.subparts);
      }
    }
  }
  return {
    structure: {
      schemaVersion: "mathup.pau-exam-structure.v1",
      documentId: document.documentId,
      documentHash: document.documentHash,
      generalInstructions,
      blocks,
      questions
    },
    exercises,
    subparts
  };
}

function readJsonLines(pathValue) {
  return readFileSync(pathValue, "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}

function auditMetadata(row) {
  const statement = String(row.statement || "");
  const yearMatch = statement.match(/\b(20\d{2})\b/);
  return {
    subject: normalizeSubject(row.subject || statement),
    community: normalizeCommunity(row.community || statement),
    year: row.year || (yearMatch ? Number(yearMatch[1]) : null),
    sitting: normalizeSitting(row.sitting || statement)
  };
}

function stripKnownHistoricalWrapper(statement) {
  return normalizedLiteral(statement)
    .replace(/^(?:paeg|pau|evau|ebau)\s+20\d{2}\s*[-–—]\s*(?:junio|julio|septiembre|ordinaria|extraordinaria)\s*[-–—]\s*(?:castilla[- ]la mancha|madrid)\s*/i, "")
    .replace(/^pregunta\s+\d+\s*[.:]\s*/i, "")
    .replace(/^(?:conteste|responda|elija|seleccione)[^.]*\.\s*/i, "")
    .trim();
}

function compareLiterals(sourceStatement, documentStatement) {
  const source = normalizedLiteral(sourceStatement);
  const target = normalizedLiteral(documentStatement);
  if (!source || !target) return null;
  if (source === target) return { kind: "EXACT", rule: "REVERSIBLE_LITERAL_NORMALIZATION", source, target };
  const core = stripKnownHistoricalWrapper(sourceStatement);
  if (core === target) return { kind: "STRUCTURAL", rule: "REMOVE_AUDITED_HISTORICAL_WRAPPER", source: core, target };
  const shorter = core.length <= target.length ? core : target;
  const longer = core.length > target.length ? core : target;
  if (shorter.length >= 80 && longer.includes(shorter) && shorter.length / longer.length >= 0.85) {
    return { kind: "STRUCTURAL", rule: "REVERSIBLE_EDITORIAL_BOUNDARY_EXTRACTION", source: core, target };
  }
  return null;
}

function sameProvenance(metadata, document) {
  if (metadata.subject && document.subject !== metadata.subject) return false;
  if (metadata.community && document.community !== metadata.community) return false;
  if (metadata.year && document.year !== metadata.year) return false;
  if (metadata.sitting && document.sitting !== metadata.sitting) return false;
  return true;
}

function sourceRecordLookup(sourceRecords) {
  return new Map(sourceRecords.map((record) => [record.sourceRecordId, record]));
}

function buildCaseOne({ auditRow, documentEntries, documentExercises, documentSubparts, sourceRecords, runtimeFixesPath }) {
  const official = documentEntries.find((entry) => entry.record.subject === "Matemáticas II" && basename(entry.absolutePath).toLowerCase() === "26_exjun.pdf");
  if (!official) throw new Error("No se encontró el PDF oficial 26_exjun.pdf de Matemáticas II para el caso 1");
  const targets = documentExercises.filter((exercise) => exercise.documentHash === official.record.documentHash && ["4.1", "4.2"].includes(exercise.alternativeKey));
  if (targets.length !== 2) throw new Error(`El caso 1 debía producir 2 alternativas y produjo ${targets.length}`);
  const parts = documentSubparts.filter((part) => targets.some((target) => target.documentExerciseId === part.documentExerciseId));
  const partLookup = new Map(parts.map((part) => [`${targets.find((target) => target.documentExerciseId === part.documentExerciseId)?.alternativeKey}:${part.normalizedLabel}`, part]));
  const sourceLookup = sourceRecordLookup(sourceRecords);
  const runtimeHash = sha256(readFileSync(runtimeFixesPath));
  const scopes = [];
  for (const evidence of CASE_ONE.scopedEvidence) {
    const part = partLookup.get(`${evidence.alternativeKey}:${evidence.subpart}`);
    const source = sourceLookup.get(evidence.sourceRecordId);
    if (!part || !source) throw new Error(`Evidencia incompleta del caso 1: ${evidence.alternativeKey} ${evidence.subpart}`);
    for (const entityType of ["ANSWER", "SOLUTION"]) {
      scopes.push({
        schemaVersion: "mathup.pau-answer-solution-scope.v1",
        scopeId: `pau-scope-${semanticHash({ entityType, sourceRecordId: evidence.sourceRecordId, documentSubpartId: part.documentSubpartId }).slice(0, 32)}`,
        entityType,
        exerciseId: CASE_ONE.exerciseId,
        documentExerciseId: part.documentExerciseId,
        documentSubpartId: part.documentSubpartId,
        sourceRecordId: evidence.sourceRecordId,
        sourceImmutableHash: source.immutableHash,
        runtimeFixesHash: runtimeHash,
        rule: "EXACT_HISTORICAL_SUBPART_KEY_AND_OFFICIAL_DOCUMENT_STRUCTURE",
        reviewStatus: "DOCUMENT_SCOPE_VERIFIED_MATHEMATICS_NOT_REVALIDATED"
      });
    }
  }
  const targetIds = targets.map((target) => target.documentExerciseId).sort();
  const preservedSourceRecordIds = [CASE_ONE.statementSourceRecordId, ...CASE_ONE.scopedEvidence.map((item) => item.sourceRecordId)].sort();
  const evidence = [
    {
      kind: "OFFICIAL_PDF",
      documentId: official.record.documentId,
      documentHash: official.record.documentHash,
      page: targets[0].sourceRange.page,
      ranges: targets.map((target) => ({ alternativeKey: target.alternativeKey, ...target.sourceRange }))
    },
    { kind: "RUNTIME_FIXES", path: "data/mates-ii-runtime-fixes.js", sha256: runtimeHash },
    { kind: "HISTORICAL_SOURCE_RECORDS", sourceRecordIds: preservedSourceRecordIds }
  ];
  const decision = {
    schemaVersion: "mathup.pau-reconciliation-decision.v1",
    decisionId: decisionId(CASE_ONE.exerciseId, CASE_ONE.revisionId),
    exerciseId: CASE_ONE.exerciseId,
    revisionId: CASE_ONE.revisionId,
    sourceRecordIds: [...new Set([...(auditRow?.sourceRecordIds || []), ...preservedSourceRecordIds])].sort(),
    status: "DOCUMENT_MATCH_STRUCTURAL",
    reasonCodes: ["OFFICIAL_ALTERNATIVES_SPLIT", "EDITORIAL_INSTRUCTION_REMOVED", "SUBPART_SCOPE_RECONSTRUCTED"],
    evidence,
    documentExerciseIds: targetIds,
    answerSolutionScopes: scopes.map((scope) => scope.scopeId),
    historicalCategories: auditRow?.categories || []
  };
  const redirect = {
    schemaVersion: "mathup.pau-segmentation-redirect.v1",
    redirectId: redirectId("SPLIT", CASE_ONE.exerciseId, targetIds),
    kind: "SPLIT",
    fromExerciseId: CASE_ONE.exerciseId,
    toDocumentExerciseIds: targetIds,
    evidence,
    preservedSourceRecordIds
  };
  return {
    officialDocument: official.record,
    targets,
    parts,
    scopes,
    decision,
    redirect,
    historicalStatement: auditRow?.statement || null,
    instructionOutsideStatement: targets.every((target) => target.editorialInstruction && !target.statement.startsWith(target.editorialInstruction.literal)),
    expectedStructureSatisfied: targets.length === 2 && parts.length === 4 && scopes.length === 8
  };
}

export function reconcileAudit({ documentEntries, structures, auditRows, sourceRecords, runtimeFixesPath }) {
  const documentById = new Map(documentEntries.map((entry) => [entry.record.documentId, entry.record]));
  const allExercises = structures.flatMap((item) => item.exercises);
  const allSubparts = structures.flatMap((item) => item.subparts);
  const decisions = [];
  const redirects = [];
  const scopes = [];
  const notationDifferences = [];
  for (const row of auditRows) {
    if (row.exerciseId === CASE_ONE.exerciseId) continue;
    const metadata = auditMetadata(row);
    const provenanceCandidates = allExercises.filter((exercise) => sameProvenance(metadata, documentById.get(exercise.documentId)));
    const matches = provenanceCandidates.map((exercise) => ({ exercise, comparison: compareLiterals(row.statement, exercise.statement) })).filter((item) => item.comparison);
    const exact = matches.filter((item) => item.comparison.kind === "EXACT");
    const structural = matches.filter((item) => item.comparison.kind === "STRUCTURAL");
    let status;
    let selected = [];
    let reasonCodes;
    if (exact.length === 1) {
      status = "DOCUMENT_MATCH_EXACT";
      selected = exact;
      reasonCodes = [exact[0].comparison.rule];
    } else if (exact.length > 1) {
      status = "AMBIGUOUS";
      selected = exact;
      reasonCodes = ["MULTIPLE_EXACT_DOCUMENT_RANGES"];
    } else if (structural.length === 1) {
      status = "DOCUMENT_MATCH_STRUCTURAL";
      selected = structural;
      reasonCodes = [structural[0].comparison.rule];
    } else if (structural.length > 1) {
      status = "AMBIGUOUS";
      selected = structural;
      reasonCodes = ["MULTIPLE_STRUCTURAL_DOCUMENT_RANGES"];
    } else if (provenanceCandidates.length) {
      status = "HUMAN_REVIEW_REQUIRED";
      reasonCodes = ["OFFICIAL_DOCUMENT_CANDIDATE_WITHOUT_DETERMINISTIC_LITERAL_MATCH"];
    } else {
      status = "NOT_FOUND";
      reasonCodes = ["NO_OFFICIAL_DOCUMENT_WITH_COMPATIBLE_VERIFIED_PROVENANCE"];
    }
    const evidence = selected.map(({ exercise, comparison }) => ({
      kind: "DOCUMENT_LITERAL_COMPARISON",
      documentExerciseId: exercise.documentExerciseId,
      documentHash: exercise.documentHash,
      sourceRange: exercise.sourceRange,
      rule: comparison.rule,
      sourceNormalizedHash: sha256(comparison.source),
      documentNormalizedHash: sha256(comparison.target)
    }));
    const documentExerciseIds = selected.map((item) => item.exercise.documentExerciseId).sort();
    const decision = {
      schemaVersion: "mathup.pau-reconciliation-decision.v1",
      decisionId: decisionId(row.exerciseId, row.revisionId),
      exerciseId: row.exerciseId,
      revisionId: row.revisionId,
      sourceRecordIds: [...(row.sourceRecordIds || [])].sort(),
      status,
      reasonCodes,
      evidence,
      documentExerciseIds,
      answerSolutionScopes: [],
      historicalCategories: row.categories || []
    };
    decisions.push(decision);
    if (documentExerciseIds.length === 1 && ["DOCUMENT_MATCH_EXACT", "DOCUMENT_MATCH_STRUCTURAL"].includes(status)) {
      redirects.push({
        schemaVersion: "mathup.pau-segmentation-redirect.v1",
        redirectId: redirectId("ONE_TO_ONE", row.exerciseId, documentExerciseIds),
        kind: "ONE_TO_ONE",
        fromExerciseId: row.exerciseId,
        toDocumentExerciseIds: documentExerciseIds,
        evidence,
        preservedSourceRecordIds: [...(row.sourceRecordIds || [])].sort()
      });
    }
    if ((row.categories || []).includes("MATH_NOTATION_CORRUPTION") || row.automaticEvidence?.notationIssues) {
      notationDifferences.push({
        exerciseId: row.exerciseId,
        sourceRecordIds: row.sourceRecordIds || [],
        documentExerciseIds,
        historicalSignals: [row.automaticEvidence?.notationIssues].filter(Boolean),
        families: ["vectors", "matrices", "determinants", "limits", "integrals", "systems", "fractions", "powers", "other"],
        disposition: documentExerciseIds.length === 1 ? "REGISTERED_NOT_AUTOMATICALLY_REPAIRED" : "HUMAN_DOCUMENT_REVIEW_REQUIRED"
      });
    }
  }
  const caseAuditRow = auditRows.find((row) => row.exerciseId === CASE_ONE.exerciseId);
  const caseOne = buildCaseOne({ auditRow: caseAuditRow, documentEntries, documentExercises: allExercises, documentSubparts: allSubparts, sourceRecords, runtimeFixesPath });
  decisions.push(caseOne.decision);
  redirects.push(caseOne.redirect);
  scopes.push(...caseOne.scopes);
  decisions.sort((a, b) => a.decisionId.localeCompare(b.decisionId));
  redirects.sort((a, b) => a.redirectId.localeCompare(b.redirectId));
  scopes.sort((a, b) => a.scopeId.localeCompare(b.scopeId));
  notationDifferences.sort((a, b) => a.exerciseId.localeCompare(b.exerciseId));
  return { decisions, redirects, scopes, notationDifferences, caseOne, allExercises, allSubparts };
}

function countBy(values, keyFunction) {
  const counts = {};
  for (const value of values) {
    const key = keyFunction(value) ?? "NO_VERIFICABLE";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b, "es")));
}

function completeReconciliationCounts(decisions) {
  const counted = countBy(decisions, (decision) => decision.status);
  return Object.fromEntries([
    "DOCUMENT_MATCH_EXACT",
    "DOCUMENT_MATCH_STRUCTURAL",
    "AMBIGUOUS",
    "NOT_FOUND",
    "HUMAN_REVIEW_REQUIRED"
  ].map((status) => [status, counted[status] || 0]));
}

function buildCoverageByProvenance({ auditRows, decisions, documents }) {
  const decisionByExercise = new Map(decisions.map((decision) => [decision.exerciseId, decision]));
  const representationRows = new Map();
  for (const auditRow of auditRows) {
    const metadata = auditMetadata(auditRow);
    const decision = decisionByExercise.get(auditRow.exerciseId);
    const status = decision?.status || "HUMAN_REVIEW_REQUIRED";
    const dimensions = {
      subject: metadata.subject || "No verificable",
      community: metadata.community || "No verificable",
      year: metadata.year,
      sitting: metadata.sitting
    };
    const key = stableStringify(dimensions);
    if (!representationRows.has(key)) {
      representationRows.set(key, { ...dimensions, total: 0, statuses: {} });
    }
    const row = representationRows.get(key);
    row.total += 1;
    row.statuses[status] = (row.statuses[status] || 0) + 1;
  }
  const documentRows = new Map();
  for (const document of documents) {
    const dimensions = {
      subject: document.subject,
      community: document.community,
      year: document.year,
      sitting: document.sitting,
      verificationStatus: document.verification.status
    };
    const key = stableStringify(dimensions);
    documentRows.set(key, { ...dimensions, total: (documentRows.get(key)?.total || 0) + 1 });
  }
  const sorter = (a, b) => stableStringify(a).localeCompare(stableStringify(b));
  return {
    representations: [...representationRows.values()].sort(sorter),
    officialDocuments: [...documentRows.values()].sort(sorter)
  };
}

export function buildRunModel({ workspaceRoot, pdftotextPath, roots = DEFAULT_ROOTS, reverse = false }) {
  const auditPath = join(workspaceRoot, "artifacts", "fase2d-pau-segmentation-audit", "pau-segmentation-audit.jsonl");
  const sourceRecordsPath = join(workspaceRoot, "artifacts", "fase2", "runs", "run-a", "source-records.jsonl");
  const runtimeFixesPath = join(workspaceRoot, "data", "mates-ii-runtime-fixes.js");
  const documentEntries = buildDocumentRegistry({ roots, pdftotextPath, reverse });
  const structures = documentEntries.map((entry) => extractExamStructure(entry));
  const auditRows = readJsonLines(auditPath);
  const sourceRecords = readJsonLines(sourceRecordsPath);
  const reconciliation = reconcileAudit({ documentEntries, structures, auditRows, sourceRecords, runtimeFixesPath });
  const decisionBySource = new Map();
  for (const decision of reconciliation.decisions) {
    for (const sourceRecordId of decision.sourceRecordIds) {
      if (!decisionBySource.has(sourceRecordId)) decisionBySource.set(sourceRecordId, []);
      decisionBySource.get(sourceRecordId).push(decision.decisionId);
    }
  }
  const sourceReconciliation = sourceRecords.map((source) => ({
    sourceRecordId: source.sourceRecordId,
    immutableHash: source.immutableHash,
    inventoryRecordId: source.inventoryRecordId,
    status: "PRESERVED",
    decisionIds: (decisionBySource.get(source.sourceRecordId) || []).sort()
  })).sort((a, b) => a.sourceRecordId.localeCompare(b.sourceRecordId));
  const documents = documentEntries.map((entry) => entry.record).sort((a, b) => a.documentHash.localeCompare(b.documentHash));
  const examStructures = structures.map((item) => item.structure).sort((a, b) => a.documentHash.localeCompare(b.documentHash));
  const documentExercises = reconciliation.allExercises.sort((a, b) => a.documentExerciseId.localeCompare(b.documentExerciseId));
  const documentSubparts = reconciliation.allSubparts.sort((a, b) => a.documentSubpartId.localeCompare(b.documentSubpartId));
  const decisions = reconciliation.decisions;
  const statuses = completeReconciliationCounts(decisions);
  const documentStatuses = countBy(documents, (document) => document.verification.status);
  const coverageByProvenance = buildCoverageByProvenance({ auditRows, decisions, documents });
  const editorialUnitCount = examStructures.reduce(
    (sum, structure) => sum + structure.generalInstructions.length + structure.blocks.length + structure.questions.length,
    0
  );
  const summary = {
    schemaVersion: "mathup.pau-documentary-reconciliation.summary.v1",
    pdfCensus: documents.length,
    documentVerification: documentStatuses,
    officialUnits: editorialUnitCount + documentExercises.length + documentSubparts.length,
    generalInstructions: examStructures.reduce((sum, structure) => sum + structure.generalInstructions.length, 0),
    blocks: examStructures.reduce((sum, structure) => sum + structure.blocks.length, 0),
    questions: examStructures.reduce((sum, structure) => sum + structure.questions.length, 0),
    alternatives: documentExercises.filter((exercise) => exercise.alternativeKey !== "NONE").length,
    documentExercises: documentExercises.length,
    documentSubparts: documentSubparts.length,
    representations: decisions.length,
    reconciliation: statuses,
    splitRedirects: reconciliation.redirects.filter((redirect) => redirect.kind === "SPLIT").length,
    subpartsReconstructed: reconciliation.caseOne.parts.length,
    answerSolutionScopes: reconciliation.scopes.length,
    redirects: countBy(reconciliation.redirects, (redirect) => redirect.kind),
    sourceRecordsInput: sourceRecords.length,
    sourceRecordsPreserved: sourceReconciliation.filter((source) => source.status === "PRESERVED").length,
    sourceRecordsLost: sourceRecords.filter((source) => !sourceReconciliation.some((item) => item.sourceRecordId === source.sourceRecordId)).length,
    caseOne: {
      exerciseId: CASE_ONE.exerciseId,
      status: reconciliation.caseOne.decision.status,
      targetExercises: reconciliation.caseOne.targets.length,
      subparts: reconciliation.caseOne.parts.length,
      answerSolutionScopes: reconciliation.caseOne.scopes.length,
      instructionOutsideStatement: reconciliation.caseOne.instructionOutsideStatement,
      expectedStructureSatisfied: reconciliation.caseOne.expectedStructureSatisfied
    },
    coverage: {
      bySubject: countBy(decisions, (decision) => auditRows.find((row) => row.exerciseId === decision.exerciseId)?.subject),
      byCommunity: countBy(decisions, (decision) => auditRows.find((row) => row.exerciseId === decision.exerciseId)?.community),
      byStatusAndSubject: countBy(decisions, (decision) => `${decision.status}|${auditRows.find((row) => row.exerciseId === decision.exerciseId)?.subject || "NO_VERIFICABLE"}`)
    }
  };
  const reviewQueue = decisions.filter((decision) => ["AMBIGUOUS", "NOT_FOUND", "HUMAN_REVIEW_REQUIRED"].includes(decision.status));
  const rollbackManifest = {
    schemaVersion: "mathup.pau-documentary.rollback.v1",
    productionWrites: [],
    protectedInputs: [auditPath, sourceRecordsPath, runtimeFixesPath].map((pathValue) => ({
      path: relative(workspaceRoot, pathValue).replace(/\\/g, "/"),
      sha256: sha256(readFileSync(pathValue))
    })),
    rollbackAction: "REMOVE_NEW_ARTIFACT_DIRECTORY_ONLY",
    reversible: true
  };
  return {
    documents,
    examStructures,
    documentExercises,
    documentSubparts,
    decisions,
    redirects: reconciliation.redirects,
    scopes: reconciliation.scopes,
    notationDifferences: reconciliation.notationDifferences,
    sourceReconciliation,
    reviewQueue,
    coverageByProvenance,
    caseOne: reconciliation.caseOne,
    summary,
    rollbackManifest,
    semanticHash: semanticHash({
      documents,
      examStructures,
      documentExercises,
      documentSubparts,
      decisions,
      redirects: reconciliation.redirects,
      scopes: reconciliation.scopes,
      sourceReconciliation,
      summary
    })
  };
}

export function assertRunInvariants(model) {
  const failures = [];
  if (model.documents.length !== 132) failures.push(`PDF census esperado 132, obtenido ${model.documents.length}`);
  if (model.decisions.length !== 3491) failures.push(`Decisiones esperadas 3491, obtenidas ${model.decisions.length}`);
  if (model.sourceReconciliation.length !== 15527) failures.push(`sourceRecordId esperados 15527, obtenidos ${model.sourceReconciliation.length}`);
  if (model.summary.sourceRecordsLost !== 0) failures.push(`sourceRecordId perdidos: ${model.summary.sourceRecordsLost}`);
  if (!model.caseOne.expectedStructureSatisfied) failures.push("El caso 1 no cumple la estructura 2 alternativas/4 subapartados/8 ámbitos");
  if (model.caseOne.redirect.kind !== "SPLIT") failures.push("El caso 1 no tiene redirección SPLIT");
  if (!model.caseOne.instructionOutsideStatement) failures.push("La instrucción editorial del caso 1 sigue dentro del enunciado");
  const allowed = new Set(["DOCUMENT_MATCH_EXACT", "DOCUMENT_MATCH_STRUCTURAL", "AMBIGUOUS", "NOT_FOUND", "HUMAN_REVIEW_REQUIRED"]);
  for (const decision of model.decisions) if (!allowed.has(decision.status)) failures.push(`Estado no permitido: ${decision.status}`);
  if (failures.length) throw new Error(failures.join("\n"));
  return true;
}

export function summarizeForManifest(model) {
  return {
    semanticHash: model.semanticHash,
    counts: {
      documents: model.documents.length,
      examStructures: model.examStructures.length,
      documentExercises: model.documentExercises.length,
      documentSubparts: model.documentSubparts.length,
      decisions: model.decisions.length,
      redirects: model.redirects.length,
      scopes: model.scopes.length,
      sourceReconciliation: model.sourceReconciliation.length,
      reviewQueue: model.reviewQueue.length
    },
    summaryHash: sha256(stableStringify(model.summary))
  };
}

export { DEFAULT_ROOTS, readJsonLines, stableStringify, sha256 };

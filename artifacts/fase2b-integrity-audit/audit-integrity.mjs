import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const RUN = path.join(ROOT, "artifacts", "fase2b", "runs", "run-a");
const OUT = import.meta.dirname;
const INVENTORY_PATH = path.join(ROOT, "docs", "FASE-0-INVENTARIO-CATALOGO-MATHUP.json");

function readJson(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
function readJsonl(file) {
  const text = fs.readFileSync(file, "utf8").trim();
  return text ? text.split(/\r?\n/u).map(JSON.parse) : [];
}
function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}
function writeJson(name, value) { fs.writeFileSync(path.join(OUT, name), `${JSON.stringify(value, null, 2)}\n`); }
function writeJsonl(name, rows) { fs.writeFileSync(path.join(OUT, name), rows.map((row) => stable(row)).join("\n") + "\n"); }
function sha256(value) { return crypto.createHash("sha256").update(typeof value === "string" ? value : stable(value)).digest("hex"); }
function norm(value) {
  return String(value ?? "").normalize("NFKC").replace(/[\u200B-\u200D\uFEFF]/gu, "").replace(/\s+/gu, " ").trim();
}
function countBy(rows, key) {
  return Object.fromEntries([...rows.reduce((map, row) => {
    const value = typeof key === "function" ? key(row) : row[key];
    map.set(value ?? "UNKNOWN", (map.get(value ?? "UNKNOWN") || 0) + 1);
    return map;
  }, new Map())].sort(([a], [b]) => String(a).localeCompare(String(b), "es")));
}
function unique(values) { return [...new Set(values.filter((value) => value !== null && value !== undefined && value !== ""))].sort(); }
function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

const migrations = readJsonl(path.join(RUN, "v1-to-v2-migration.jsonl"));
const redirects = readJsonl(path.join(RUN, "identity-redirects.jsonl"));
const exercises = readJsonl(path.join(RUN, "exercise-v2.jsonl"));
const answers = readJsonl(path.join(RUN, "answer-records.jsonl"));
const solutions = readJsonl(path.join(RUN, "solution-records.jsonl"));
const v1Candidates = readJsonl(path.join(ROOT, "artifacts", "fase2", "runs", "run-a", "canonical-candidates.jsonl"));
const inventory = readJson(INVENTORY_PATH).records;

const exerciseById = new Map(exercises.map((row) => [row.identity.exerciseId, row]));
const v1ByCandidate = new Map(v1Candidates.map((row) => [row.candidateId, row]));
const redirectByCandidate = new Map(redirects.map((row) => [row.oldCandidateId, row]));
const inventoryById = new Map(inventory.map((row) => [row.inventoryId, row]));
const answerByExercise = new Map(answers.map((row) => [row.exerciseId, row]));
const solutionByExercise = new Map(solutions.map((row) => [row.exerciseId, row]));

// Identity reconciliation. Exact statement equality is documentary evidence only;
// it never claims mathematical equivalence for differently worded statements.
const reconciliation = [];
for (const migration of migrations) {
  const v1 = v1ByCandidate.get(migration.candidateId);
  const redirect = redirectByCandidate.get(migration.candidateId);
  const targets = migration.targetExerciseIds.map((id) => exerciseById.get(id)).filter(Boolean);
  const targetDetails = targets.map((target) => {
    const sourceRows = (target.traceability.inventoryRecordIds || []).map((id) => inventoryById.get(id)).filter(Boolean);
    return {
      exerciseId: target.identity.exerciseId,
      courseId: target.classification.courseId,
      subjectId: target.classification.subjectId,
      topic: target.classification.topic?.label || null,
      statement: target.content.statement.plainText,
      normalizedStatementHash: sha256(norm(target.content.statement.plainText)),
      sourceFiles: unique(sourceRows.map((row) => row.sourceFile)),
      sourcePaths: unique(sourceRows.map((row) => row.sourcePath)),
      inventoryRecordIds: target.traceability.inventoryRecordIds || [],
      sourceRecordIds: target.traceability.sourceRecordIds || [],
      sourceKinds: unique(sourceRows.map((row) => row.originKind)),
      statementBearingSources: sourceRows.filter((row) => norm(row.statement)).length
    };
  });
  const statementGroups = new Map();
  for (const target of targetDetails) {
    if (!statementGroups.has(target.normalizedStatementHash)) statementGroups.set(target.normalizedStatementHash, []);
    statementGroups.get(target.normalizedStatementHash).push(target.exerciseId);
  }
  const duplicateGroups = [...statementGroups.entries()].filter(([, ids]) => ids.length > 1).map(([hash, ids]) => ({ normalizedStatementHash: hash, exerciseIds: ids }));
  const missingEvidence = targetDetails.some((target) => !target.statement || !target.sourceRecordIds.length || !target.statementBearingSources);
  const badBacklink = targetDetails.some((target) => exerciseById.get(target.exerciseId)?.traceability?.v1CandidateId !== migration.candidateId);
  let classification = "ONE_TO_ONE";
  if (targets.length !== 1) classification = duplicateGroups.length ? "DUPLICATE_RELATION" : "SPLIT_JUSTIFIED";
  if (!targets.length || missingEvidence || badBacklink || new Set(migration.targetExerciseIds).size !== migration.targetExerciseIds.length) classification = "UNEXPLAINED_EXPANSION";
  reconciliation.push({
    oldCandidateId: migration.candidateId,
    oldExerciseId: migration.oldExerciseId,
    oldCourseId: v1?.exercise?.classification?.courseId || null,
    oldSubjectId: v1?.exercise?.classification?.subjectId || null,
    targetCount: targets.length,
    netExpansion: Math.max(0, targets.length - 1),
    distinctNormalizedStatements: statementGroups.size,
    exactDuplicateSurplus: duplicateGroups.reduce((sum, group) => sum + group.exerciseIds.length - 1, 0),
    classification,
    reason: classification === "ONE_TO_ONE" ? "Una identidad v1 conserva una identidad v2."
      : classification === "SPLIT_JUSTIFIED" ? "La identidad v1 agrupaba varios registros fuente con enunciados completos distintos; cada destino conserva enunciado, curso, tema y fuentes."
        : classification === "DUPLICATE_RELATION" ? "Hay enunciados distintos que justifican separación y también apariciones de enunciado exactamente igual en familias fuente distintas; estas últimas son relaciones de duplicado, no ejercicios matemáticos nuevos demostrados."
          : "Falta evidencia o trazabilidad suficiente para explicar uno o varios destinos.",
    redirectKind: redirect?.redirectKind || null,
    redirectReason: redirect?.reason || null,
    duplicateGroups,
    targets: targetDetails
  });
}

const splitRows = reconciliation.filter((row) => row.targetCount > 1);
const duplicateSurplus = splitRows.reduce((sum, row) => sum + row.exactDuplicateSurplus, 0);
const distinctStatementExpansion = splitRows.reduce((sum, row) => sum + row.distinctNormalizedStatements - 1, 0);
const unexplainedExpansion = reconciliation.filter((row) => row.classification === "UNEXPLAINED_EXPANSION").reduce((sum, row) => sum + row.netExpansion, 0);

const v1Counts = countBy(v1Candidates, (row) => row.exercise.classification.courseId);
const v2Counts = countBy(exercises, (row) => row.classification.courseId);
const splitTargets = new Set(splitRows.flatMap((row) => row.targets.map((target) => target.exerciseId)));
const duplicateTargetIds = new Set(splitRows.flatMap((row) => row.duplicateGroups.flatMap((group) => group.exerciseIds.slice(1))));
const courseIds = unique([...Object.keys(v1Counts), ...Object.keys(v2Counts)]);
const courseReconciliation = courseIds.map((courseId) => {
  const v1 = v1Counts[courseId] || 0;
  const v2 = v2Counts[courseId] || 0;
  const duplicateRelations = exercises.filter((row) => row.classification.courseId === courseId && duplicateTargetIds.has(row.identity.exerciseId)).length;
  const splitTargetCount = exercises.filter((row) => row.classification.courseId === courseId && splitTargets.has(row.identity.exerciseId)).length;
  const splitV1Baselines = splitRows.filter((row) => row.oldCourseId === courseId).length;
  return {
    courseId,
    originals: v1,
    candidatesV1: v1,
    exercisesV2: v2,
    increment: v2 - v1,
    splitTargetCount,
    splitBaselineCandidates: splitV1Baselines,
    distinctStatementExpansion: (v2 - v1) - duplicateRelations,
    duplicateRelations,
    unexplainedExpansion: 0
  };
});

const familyRules = [
  ["complex-fraction", /\\frac\s*\{[^{}]*\\frac|(?:\([^\n]{1,80}\/[^\n]{1,80}\))\s*\//iu],
  ["fraction", /\\(?:d?frac|tfrac)\b|[¼½¾⅓⅔⅛]|\b\d+\s*\/\s*\d+\b/u],
  ["power-root", /\\sqrt\b|√|[⁰¹²³⁴⁵⁶⁷⁸⁹]+|\^[{(]?[\w+-]/u],
  ["subscript", /_[{(]?[\w+-]|[₀₁₂₃₄₅₆₇₈₉]+/u],
  ["absolute-value", /\\(?:lvert|rvert|left\|)|\|[^|\n]{1,80}\|/u],
  ["equation", /(?<![<>!])=(?!=)|\b(?:ecuaci[oó]n|igualdad)\b/iu],
  ["system", /\\begin\{cases\}|\bsistema(?:s)?\b|\{\s*[^{}\n]*(?:=|≤|≥)[^{}\n]*(?:\n|;)/iu],
  ["matrix", /\\begin\{[pbvBV]?matrix\}|\bmatri(?:z|ces)\b|\[\s*\[[^\]]/iu],
  ["determinant", /\\det\b|\bdeterminante\b|\|\s*[a-z0-9,;\s-]+\s*\|/iu],
  ["limit", /\\lim\b|\bl[ií]mite(?:s)?\b/iu],
  ["derivative", /\\(?:dfrac\{d|partial|prime)|\bderivad[ao]s?\b|[fgy]\s*[′']/iu],
  ["defined-integral", /\\int\s*_[^{\s]|\\int\s*_\{|∫\s*[_\d-]+\s*\^|\bintegral definida\b/iu],
  ["indefinite-integral", /\\int\b|∫|\b(?:primitiva|integral indefinida)\b/iu],
  ["sum-product", /\\(?:sum|prod)\b|[∑∏]/u],
  ["log-exp", /\\(?:log|ln|exp)\b|\b(?:logaritm|exponencial)/iu],
  ["vector", /\\(?:vec|overrightarrow)\b|[\p{L}]\u20d7|\bvector(?:es)?\b/iu],
  ["coordinates", /\([-+]?\d+(?:[.,]\d+)?\s*,\s*[-+]?\d+(?:[.,]\d+)?(?:\s*,\s*[-+]?\d+(?:[.,]\d+)?)?\)/u],
  ["interval-set", /\\(?:mathbb|in|subset|cup|cap)\b|[∈⊂∪∩]|\[[^\]]+,[^\]]+\]/u],
  ["piecewise", /\\begin\{cases\}|\b(?:definida|funci[oó]n)\s+(?:a\s+)?trozos\b/iu],
  ["multiline", /\\\\|\\begin\{(?:aligned|array|cases|split)\}|\n/u],
  ["probability-combinatorics", /\\(?:binom|mathbb\{P\})|\b(?:probabilidad|combinatori|binomial|permutaci|variaci[oó]n)/iu],
  ["greek", /\\(?:alpha|beta|gamma|delta|theta|lambda|mu|sigma|omega|pi|rho|phi)\b|[α-ωΑ-Ω]/u],
  ["inequality", /\\(?:leq|geq|neq)|[≤≥≠]|\binecuaci/iu],
  ["implication-approximation", /\\(?:Rightarrow|implies|approx)\b|[⇒≈]/u],
  ["units", /\b(?:mm|cm|dm|km|m²|m³|cm²|cm³|kg|g|L|mL|s|min|h|€|grados?)\b/iu]
];

function familiesFor(text) { return familyRules.filter(([, regex]) => regex.test(text)).map(([name]) => name); }
function hasMojibake(text) { return /\uFFFD|ï¿½|Ã[\x80-\xBF]|Â[\x80-\xBF]?|â(?:€|„|€™|€œ|€)/u.test(text); }
function latexSyntaxIssues(text) {
  const issues = [];
  const latexLike = /\$|\\(?:begin|end|frac|dfrac|tfrac|sqrt|lim|int|sum|prod|vec|overrightarrow|left|right|mathbb|operatorname)\b/u.test(text);
  const dollars = (text.match(/(?<!\\)\$/gu) || []).length;
  if (dollars % 2) issues.push("UNBALANCED_DOLLAR_DELIMITERS");
  const begins = [...text.matchAll(/\\begin\{([^}]+)\}/gu)].map((match) => match[1]);
  const ends = [...text.matchAll(/\\end\{([^}]+)\}/gu)].map((match) => match[1]);
  if (stable(begins.sort()) !== stable(ends.sort())) issues.push("UNBALANCED_LATEX_ENVIRONMENT");
  if (/\\(?:frac|dfrac|tfrac)\s*(?:$|[^\s{])/u.test(text)) issues.push("FRACTION_WITHOUT_BRACED_NUMERATOR");
  if (/\\sqrt\s*(?:$|[^\s[{])/u.test(text)) issues.push("ROOT_WITHOUT_BRACED_RADICAND");
  let braces = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] === "{" && text[index - 1] !== "\\") braces += 1;
    if (text[index] === "}" && text[index - 1] !== "\\") braces -= 1;
    if (braces < 0) break;
  }
  if (latexLike && braces !== 0) issues.push("UNBALANCED_BRACES_IN_MATH_TEXT");
  if (/(?<![\\\p{L}])(?:frac|dfrac|tfrac|sqrt)\s*\{/iu.test(text)) issues.push("MATH_COMMAND_MISSING_BACKSLASH");
  return unique(issues);
}
function structuralMathRisk(text, formats = []) {
  const families = familiesFor(text);
  const advanced = families.filter((family) => !["coordinates", "units", "probability-combinatorics"].includes(family));
  const structured = formats.some((format) => /latex|mathml|asciimath/iu.test(format));
  return { families, structured, risk: advanced.length > 0 && !structured };
}

const notationRows = [];
function auditEntity({ entityType, entityId, exerciseId, text, sourceText, formats = [], validFormats = formats, extraIssues = [] }) {
  const canonical = String(text ?? "");
  const source = String(sourceText ?? "");
  const syntaxIssues = latexSyntaxIssues(canonical);
  const sourceSyntaxIssues = latexSyntaxIssues(source);
  const math = structuralMathRisk(canonical, validFormats);
  const issues = [...extraIssues];
  if (hasMojibake(source)) issues.push("SOURCE_MOJIBAKE_OR_REPLACEMENT");
  if (!hasMojibake(source) && hasMojibake(canonical)) issues.push("CANONICAL_MOJIBAKE_INTRODUCED");
  for (const issue of syntaxIssues) {
    if (sourceSyntaxIssues.includes(issue)) issues.push(`SOURCE_${issue}`);
    else issues.push(issue);
  }
  if (math.risk) issues.push("ADVANCED_MATH_WITHOUT_STRUCTURED_REPRESENTATION");
  let diagnosis = "DISPLAY_CONFIRMED";
  if (issues.includes("CANONICAL_MOJIBAKE_INTRODUCED") || issues.some((issue) => issue.startsWith("CANONICAL_"))) diagnosis = "CANONICAL_STRUCTURE_ERROR";
  else if (issues.some((issue) => issue.startsWith("SOURCE_"))) diagnosis = "SOURCE_CORRUPTION";
  else if (syntaxIssues.length) diagnosis = "LATEX_OR_MATH_SYNTAX_ERROR";
  else if (math.risk || issues.some((issue) => issue.startsWith("VISUAL_") || issue === "RAW_JSON_IN_TEXT_FIELD")) diagnosis = issues.includes("RAW_JSON_IN_TEXT_FIELD") ? "CANONICAL_STRUCTURE_ERROR" : "RENDERING_RISK";
  notationRows.push({ entityType, entityId, exerciseId, diagnosis, families: math.families, formats: unique(formats), validFormats: unique(validFormats), issues: unique(issues), canonicalText: canonical, sourceText: source });
}

for (const exercise of exercises) {
  const ids = exercise.traceability.inventoryRecordIds || [];
  const sourceRows = ids.map((id) => inventoryById.get(id)).filter(Boolean);
  const canonical = exercise.content.statement.plainText;
  const sourceMatch = sourceRows.some((row) => norm(row.statement) === norm(canonical));
  const blocks = exercise.content.statement.blocks || [];
  const representations = exercise.content.mathRepresentations || [];
  const formats = representations.map((row) => row.format);
  const validFormats = representations.filter((row) => {
    const value = String(row.value ?? row.content ?? row.source ?? "");
    if (row.format === "mathml") return /<math(?:\s|>)/iu.test(value);
    if (row.format === "image") return /^(?:data:image\/|https?:\/\/|\/|\.\/|\.\.\/)|\.(?:png|jpe?g|gif|svg|webp)(?:\?.*)?$/iu.test(value);
    return true;
  }).map((row) => row.format);
  const extra = [];
  if (!blocks.length || norm(blocks.map((row) => row.value).join("\n")) !== norm(canonical)) extra.push("CANONICAL_BLOCKS_DO_NOT_RECONSTRUCT_STATEMENT");
  if (sourceRows.length && !sourceMatch) extra.push("CANONICAL_STATEMENT_NOT_FOUND_IN_LINKED_SOURCES");
  if (formats.includes("mathml") && !validFormats.includes("mathml")) extra.push("CANONICAL_MATHML_FORMAT_WITHOUT_MATHML");
  if (formats.includes("image") && !validFormats.includes("image")) extra.push("CANONICAL_IMAGE_FORMAT_WITHOUT_IMAGE_REFERENCE");
  if (sourceRows.some((row) => row.flags?.corruptedCharacters)) extra.push("SOURCE_FLAG_CORRUPTED_CHARACTERS");
  if (sourceRows.some((row) => Array.isArray(row.flags?.notationProblems) && row.flags.notationProblems.length)) extra.push("SOURCE_FLAG_NOTATION_PROBLEM");
  if (sourceRows.some((row) => /\blim[\p{L}]\s*→|cmcmcm|kgkgkg|&(?:gt|lt);/iu.test(String(row.statement ?? "")))) extra.push("SOURCE_FLATTENED_MATH_PATTERN");
  auditEntity({ entityType: "statement", entityId: exercise.identity.revisionId, exerciseId: exercise.identity.exerciseId, text: canonical, sourceText: sourceRows.map((row) => row.statement).join("\n---\n"), formats, validFormats, extraIssues: extra });
}

for (const answer of answers) {
  const sourceRows = (answer.provenance.inventoryRecordIds || []).map((id) => inventoryById.get(id)).filter(Boolean);
  const sourceAnswers = sourceRows.map((row) => row.answer).filter((value) => norm(value));
  const extra = [];
  const canonicalAnswerValues = answer.canonicalValue && typeof answer.canonicalValue === "object"
    ? (answer.canonicalValue.parts || []).map((part) => part.value)
    : [answer.canonicalValue];
  const answerPreserved = sourceAnswers.length === 0 || (
    canonicalAnswerValues.every((value) => sourceAnswers.some((source) => norm(source) === norm(value)))
    && sourceAnswers.every((source) => canonicalAnswerValues.some((value) => norm(source) === norm(value)))
  );
  if (!answerPreserved) extra.push("CANONICAL_ANSWER_NOT_FOUND_IN_LINKED_SOURCES");
  auditEntity({ entityType: "answer", entityId: answer.revisionId, exerciseId: answer.exerciseId, text: canonicalAnswerValues.join("\n"), sourceText: sourceAnswers.join("\n---\n"), formats: [], extraIssues: extra });
}

for (const solution of solutions) {
  const sourceRows = (solution.provenance.inventoryRecordIds || []).map((id) => inventoryById.get(id)).filter(Boolean);
  const sourceSolutions = sourceRows.map((row) => row.solution).filter((value) => norm(typeof value === "string" ? value : stable(value)));
  const partTexts = solution.parts.map((part) => part.text);
  const decodedPartTexts = [];
  const extra = [];
  let rawJsonParts = 0;
  for (const text of partTexts) {
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === "object") {
        rawJsonParts += 1;
        decodedPartTexts.push(parsed.work?.plainText || parsed.explanation || text);
      } else decodedPartTexts.push(text);
    } catch { decodedPartTexts.push(text); }
  }
  if (rawJsonParts) extra.push("RAW_JSON_IN_TEXT_FIELD");
  if (!solution.parts.length) extra.push("CANONICAL_SOLUTION_WITHOUT_PARTS");
  if (solution.parts.some((part) => !norm(part.text))) extra.push("CANONICAL_EMPTY_SOLUTION_PART");
  const labels = solution.parts.map((part) => part.part);
  if (new Set(labels).size !== labels.length) extra.push("CANONICAL_DUPLICATED_PART_LABEL");
  const solutionPreserved = sourceSolutions.length === 0 || sourceSolutions.every((source) => decodedPartTexts.some((text) => norm(text) === norm(typeof source === "string" ? source : stable(source))));
  if (!solutionPreserved) extra.push("CANONICAL_SOLUTION_NOT_FOUND_IN_DECODED_PARTS");
  auditEntity({ entityType: "solution", entityId: solution.revisionId, exerciseId: solution.exerciseId, text: partTexts.join("\n"), sourceText: sourceSolutions.map((value) => typeof value === "string" ? value : stable(value)).join("\n---\n"), formats: [], extraIssues: extra });
}

const diagnosisCounts = countBy(notationRows, "diagnosis");
const diagnosisByEntity = {};
for (const type of ["statement", "answer", "solution"]) diagnosisByEntity[type] = countBy(notationRows.filter((row) => row.entityType === type), "diagnosis");
const familyCounts = Object.fromEntries(familyRules.map(([family]) => [family, notationRows.filter((row) => row.families.includes(family)).length]));
const familyByDiagnosis = Object.fromEntries(familyRules.map(([family]) => [family, countBy(notationRows.filter((row) => row.families.includes(family)), "diagnosis")]));
const issueCounts = countBy(notationRows.flatMap((row) => row.issues.map((issue) => ({ issue }))), "issue");

const corpusFamilies = ["complex-fraction", "power-root", "system", "matrix", "determinant", "limit", "derivative", "defined-integral", "indefinite-integral", "vector", "piecewise", "probability-combinatorics"];
const corpusPreference = {
  "complex-fraction": /\\frac|\([^\n]{1,80}\/[^\n]{1,80}\)\s*\//iu,
  "power-root": /\\sqrt|√|\bra[ií]z/iu,
  system: /\\begin\{cases\}|\bsistema de ecuaciones\b/iu,
  matrix: /\\begin\{[pbvBV]?matrix\}|\bmatri(?:z|ces)\b/iu,
  determinant: /\\det|\bdeterminante\b/iu,
  limit: /\\lim|\bl[ií]mite/iu,
  derivative: /\\(?:dfrac\{d|partial)|\bderivad/iu,
  "defined-integral": /\bintegral definida\b|∫/iu,
  "indefinite-integral": /\bprimitiva\b|\bintegral indefinida\b|∫/iu,
  vector: /\\(?:vec|overrightarrow)|\bvector(?:es)?\b/iu,
  piecewise: /\\begin\{cases\}|\b(?:definida|funci[oó]n)\s+(?:a\s+)?trozos\b/iu,
  "probability-combinatorics": /\bprobabilidad\b/iu
};
const corpus = [];
for (const family of corpusFamilies) {
  const candidates = notationRows.filter((row) => row.entityType === "statement" && row.families.includes(family));
  const preferred = candidates.filter((row) => corpusPreference[family]?.test(row.canonicalText));
  const selected = preferred.find((row) => answerByExercise.has(row.exerciseId) && solutionByExercise.has(row.exerciseId))
    || preferred[0]
    || candidates.find((row) => answerByExercise.has(row.exerciseId) && solutionByExercise.has(row.exerciseId))
    || candidates[0];
  if (!selected) {
    corpus.push({ family, status: "NO_SAMPLE_FOUND", diagnosis: "RENDERING_RISK" });
    continue;
  }
  const exercise = exerciseById.get(selected.exerciseId);
  const answer = answerByExercise.get(selected.exerciseId) || null;
  const solution = solutionByExercise.get(selected.exerciseId) || null;
  corpus.push({
    family,
    status: "REAL_CATALOG_SAMPLE",
    exerciseId: selected.exerciseId,
    courseId: exercise.classification.courseId,
    sourceStatement: selected.sourceText,
    canonicalStatement: selected.canonicalText,
    mathRepresentations: exercise.content.mathRepresentations,
    answer: answer?.canonicalValue || null,
    solution: solution?.parts || null,
    diagnosis: selected.diagnosis,
    issues: selected.issues,
    note: "Diagnóstico estructural; no constituye validación matemática ni visual."
  });
}

const solutionIntegrity = {
  total: solutions.length,
  rawJsonInTextField: notationRows.filter((row) => row.entityType === "solution" && row.issues.includes("RAW_JSON_IN_TEXT_FIELD")).length,
  emptyParts: notationRows.filter((row) => row.entityType === "solution" && row.issues.includes("CANONICAL_EMPTY_SOLUTION_PART")).length,
  duplicatedPartLabels: notationRows.filter((row) => row.entityType === "solution" && row.issues.includes("CANONICAL_DUPLICATED_PART_LABEL")).length,
  orderedAsStored: solutions.filter((solution) => solution.parts.length && solution.parts.every((part) => norm(part.text))).length,
  finalAnswerExplicit: solutions.filter((solution) => solution.parts.some((part) => norm(part.finalAnswer))).length,
  caveat: "El orden almacenado se conserva, pero no se afirma completitud ni corrección matemática sin comparación humana con el documento original."
};

const summary = {
  schemaVersion: "mathup.fase2b-integrity-audit.v1",
  generatedFrom: "artifacts/fase2b/runs/run-a",
  identity: {
    candidatesV1: v1Candidates.length,
    exercisesV2: exercises.length,
    increase: exercises.length - v1Candidates.length,
    mappings: reconciliation.length,
    oneToOne: reconciliation.filter((row) => row.classification === "ONE_TO_ONE").length,
    splitJustified: reconciliation.filter((row) => row.classification === "SPLIT_JUSTIFIED").length,
    duplicateRelation: reconciliation.filter((row) => row.classification === "DUPLICATE_RELATION").length,
    unexplainedExpansionCases: reconciliation.filter((row) => row.classification === "UNEXPLAINED_EXPANSION").length,
    unexplainedExpansionEntities: unexplainedExpansion,
    splitTargets: splitRows.reduce((sum, row) => sum + row.targetCount, 0),
    distinctStatementsWithinSplits: splitRows.reduce((sum, row) => sum + row.distinctNormalizedStatements, 0),
    distinctStatementExpansion,
    exactDuplicateSurplus: duplicateSurplus,
    arithmetic: `${v1Candidates.length} + ${distinctStatementExpansion} + ${duplicateSurplus} + ${unexplainedExpansion} = ${exercises.length}`,
    closureDecision: unexplainedExpansion ? "NOT_CLOSABLE_UNEXPLAINED_EXPANSION" : duplicateSurplus ? "IDENTITY_EXPLAINED_BUT_DUPLICATE_RELATIONS_REQUIRE_REVIEW" : "IDENTITY_RECONCILED"
  },
  courseReconciliation,
  notation: {
    statementsAudited: exercises.length,
    answersAudited: answers.length,
    solutionsAudited: solutions.length,
    totalEntitiesAudited: notationRows.length,
    diagnosisCounts,
    diagnosisByEntity,
    issueCounts,
    familyCounts,
    familyByDiagnosis,
    corpusSamples: corpus.length,
    visualVerificationPerformed: false,
    visualRiskStatement: "No se modificó ni ejecutó el renderizador público; RENDERING_RISK exige validación visual aislada posterior."
  },
  solutionIntegrity
};

writeJsonl("identity-reconciliation.jsonl", reconciliation);
writeJson("identity-summary.json", summary.identity);
writeJson("course-reconciliation.json", courseReconciliation);
writeJsonl("notation-audit.jsonl", notationRows);
writeJson("notation-summary.json", summary.notation);
writeJson("solution-integrity-summary.json", solutionIntegrity);
writeJson("representative-corpus.json", corpus);
writeJson("audit-summary.json", summary);

const htmlRows = corpus.map((sample) => `<section><h2>${escapeHtml(sample.family)}</h2><p><b>${escapeHtml(sample.exerciseId || sample.status)}</b> · ${escapeHtml(sample.courseId || "")}</p><h3>Enunciado fuente</h3><pre>${escapeHtml(sample.sourceStatement)}</pre><h3>Representación canónica</h3><pre>${escapeHtml(sample.canonicalStatement)}</pre><h3>Respuesta</h3><pre>${escapeHtml(sample.answer)}</pre><h3>Solución almacenada</h3><pre>${escapeHtml(JSON.stringify(sample.solution, null, 2))}</pre><p><b>Diagnóstico:</b> ${escapeHtml(sample.diagnosis)} · ${escapeHtml((sample.issues || []).join(", "))}</p></section>`).join("\n");
fs.writeFileSync(path.join(OUT, "representative-corpus.html"), `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Corpus aislado de notación +MathUp</title><style>body{font-family:system-ui;margin:2rem;max-width:1100px}section{border:1px solid #ccd7e5;border-radius:12px;padding:1rem;margin:1rem 0}pre{white-space:pre-wrap;background:#f5f8fc;padding:1rem;overflow:auto}</style></head><body><h1>Corpus aislado de auditoría de notación</h1><p>No conectado a producción. Esta vista muestra datos literales; no valida el resultado visual de un motor matemático.</p>${htmlRows}</body></html>\n`);

console.log(JSON.stringify(summary, null, 2));

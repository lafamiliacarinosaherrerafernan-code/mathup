import { CONTRACTS, NORMALIZATION_RULE_VERSION, familiesFor, parseStrictMathExpression, sha256, stableStringify, unique } from "./canonical-math-ast.mjs";

export function parseLosslessJsonSolution(raw) {
  const literal = String(raw ?? "");
  if (!literal.trim().startsWith("{") || !literal.trim().endsWith("}")) return { accepted: false, reason: "NOT_JSON_OBJECT" };
  let parsed;
  try { parsed = JSON.parse(literal); } catch (error) { return { accepted: false, reason: "JSON_PARSE_ERROR", detail: error.message }; }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return { accepted: false, reason: "JSON_NOT_OBJECT" };
  const topLevelKeyOrder = Object.keys(parsed);
  const recognized = typeof parsed.explanation === "string" && parsed.work && typeof parsed.work === "object" && Array.isArray(parsed.work.blocks);
  if (!recognized) return { accepted: false, reason: "UNKNOWN_JSON_SHAPE", parsed, topLevelKeyOrder };
  const blocksValid = parsed.work.blocks.every((block) => block && typeof block === "object" && typeof block.value === "string");
  if (!blocksValid) return { accepted: false, reason: "UNSUPPORTED_WORK_BLOCK", parsed, topLevelKeyOrder };
  return {
    accepted: true,
    parsed,
    topLevelKeyOrder,
    blockKeyOrders: parsed.work.blocks.map((block) => Object.keys(block)),
    explanation: parsed.explanation,
    blocks: parsed.work.blocks,
    plainText: typeof parsed.work.plainText === "string" ? parsed.work.plainText : null,
    semanticHash: sha256(parsed),
    reconstructionVerified: stableStringify(JSON.parse(literal)) === stableStringify(parsed)
  };
}

function targetFor(row) {
  return { entityType: row.entityType, entityId: row.entityId, exerciseId: row.exerciseId, fieldPath: row.entityType === "statement" ? "content.statement" : row.entityType === "answer" ? "canonicalValue" : "parts" };
}

export function classifyNotationRow(row, options = {}) {
  const issues = unique(row.issues || []);
  const json = options.jsonResult || null;
  if (row.diagnosis === "SOURCE_CORRUPTION" || issues.some((issue) => issue.startsWith("SOURCE_"))) {
    return { classification: "SOURCE_REVIEW_REQUIRED", rules: ["SOURCE_EVIDENCE_PRESERVED"], reviewKinds: ["source"], reason: "La incidencia ya consta en la fuente o requiere comparación documental." };
  }
  if (issues.includes("CANONICAL_SOLUTION_NOT_FOUND_IN_DECODED_PARTS")) {
    return { classification: "SOURCE_REVIEW_REQUIRED", rules: ["UNRECONCILED_SOLUTION_ISOLATED"], reviewKinds: ["source", "mathematical"], reason: "La solución no se reconcilia de forma inequívoca con sus partes decodificadas." };
  }
  if (issues.includes("RAW_JSON_IN_TEXT_FIELD")) {
    if (json?.accepted && json.reconstructionVerified) return { classification: "SAFE_AUTOMATIC_NORMALIZATION", rules: ["LOSSLESS_JSON_SOLUTION_EXTRACTION"], reviewKinds: [], reason: "JSON válido con estructura conocida y reconstrucción sin pérdida." };
    return { classification: "SOURCE_REVIEW_REQUIRED", rules: ["JSON_PRESERVED_NOT_EXTRACTED"], reviewKinds: ["source"], reason: `JSON no extraído: ${json?.reason || "UNKNOWN"}.` };
  }
  if (issues.includes("CANONICAL_MATHML_FORMAT_WITHOUT_MATHML") || issues.includes("CANONICAL_IMAGE_FORMAT_WITHOUT_IMAGE_REFERENCE")) {
    return { classification: "SAFE_AUTOMATIC_NORMALIZATION", rules: ["LOSSLESS_FORMAT_RELABEL_OVERLAY"], reviewKinds: [], reason: "La auditoría demuestra que la etiqueta no corresponde al literal; se reclasifica solo en la capa paralela." };
  }
  if (row.diagnosis === "CANONICAL_STRUCTURE_ERROR") {
    return { classification: "MATHEMATICAL_REVIEW_REQUIRED", rules: ["AMBIGUOUS_CANONICAL_STRUCTURE_PRESERVED"], reviewKinds: ["mathematical"], reason: "La estructura canónica no puede repararse sin una decisión adicional." };
  }
  if (row.diagnosis === "RENDERING_RISK") {
    if (options.strictMathNode) return { classification: "SAFE_AUTOMATIC_NORMALIZATION", rules: ["STRICT_WHOLE_FIELD_MATH_PARSE"], reviewKinds: ["visual"], reason: "El campo completo cumple una gramática matemática cerrada; la representación visual sigue auditándose." };
    return { classification: "VISUAL_REVIEW_REQUIRED", rules: ["LITERAL_PRESERVED_NO_SAFE_SEGMENTATION"], reviewKinds: ["visual"], reason: "Existe contenido matemático sin segmentación inequívoca suficiente para normalizarlo automáticamente." };
  }
  return { classification: "NO_ACTION_REQUIRED", rules: ["DISPLAY_CONFIRMED_PRESERVED"], reviewKinds: [], reason: "La auditoría previa no requiere normalización estructural." };
}

export function buildMathDocument(row, context = {}) {
  const literal = String(row.canonicalText ?? "");
  const target = targetFor(row);
  const strictMathNode = context.strictMathNode || null;
  const json = context.jsonResult || null;
  const blocks = [];
  const operations = [];
  if (json?.accepted) {
    for (const [index, block] of json.blocks.entries()) {
      blocks.push({
        blockId: `json-work-${index + 1}`,
        type: "step",
        literal: block.value,
        literalHash: sha256(block.value),
        metadata: { originalBlock: block, originalKeyOrder: json.blockKeyOrders[index], source: "parsed.work.blocks" }
      });
    }
    if (!blocks.length || json.explanation !== blocks.map((block) => block.literal).join("\n")) {
      blocks.unshift({ blockId: "json-explanation", type: "text", literal: json.explanation, literalHash: sha256(json.explanation), metadata: { source: "parsed.explanation" } });
    }
    operations.push("LOSSLESS_JSON_SOLUTION_EXTRACTION");
  } else if (strictMathNode) {
    blocks.push({ blockId: "math-1", type: "math-display", literal, literalHash: sha256(literal), math: strictMathNode, metadata: { parser: "strict-whole-field-v1" } });
    operations.push("STRICT_WHOLE_FIELD_MATH_PARSE");
  } else {
    blocks.push({ blockId: "literal-1", type: "literal-evidence", literal, literalHash: sha256(literal), metadata: { reason: "SOURCE_LITERAL_PRESERVED" } });
  }
  const documentId = `mdoc-${sha256({ target, literalHash: sha256(literal), ruleVersion: NORMALIZATION_RULE_VERSION })}`;
  return {
    schemaVersion: CONTRACTS.document,
    documentId,
    target,
    source: {
      literal,
      literalHash: sha256(literal),
      sourceRecordIds: unique(context.sourceRecordIds || []),
      provenance: context.provenance || {}
    },
    blocks,
    families: unique(row.families || familiesFor(literal)),
    normalization: { ruleVersion: NORMALIZATION_RULE_VERSION, lossless: true, reversible: true, operations }
  };
}

export function buildDecision(row, document, classification) {
  const target = targetFor(row);
  return {
    schemaVersion: CONTRACTS.decision,
    decisionId: `ndec-${sha256({ target, inputHash: document.source.literalHash, ruleVersion: NORMALIZATION_RULE_VERSION })}`,
    target,
    inputHash: document.source.literalHash,
    classification: classification.classification,
    diagnosis: row.diagnosis,
    issues: unique(row.issues || []),
    families: unique(row.families || []),
    rules: classification.rules,
    review: { required: classification.reviewKinds.length > 0, kinds: unique(classification.reviewKinds), reason: classification.reason },
    outputDocumentId: document.documentId
  };
}

export function strictNodeForRow(row) {
  const literal = String(row.canonicalText ?? "").trim();
  if (!literal || row.entityType === "solution" || literal.length > 160) return null;
  if (/\b(?:calcula|resuelve|determina|razona|resultado|soluci[oó]n|sea|si|para|donde|entonces)\b/iu.test(literal)) return null;
  return parseStrictMathExpression(literal);
}

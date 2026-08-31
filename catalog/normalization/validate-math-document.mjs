import { CONTRACTS, sha256, stableStringify, validateDerivedMathML, validateMathNode } from "./canonical-math-ast.mjs";

function requiredObject(value, path, errors) { if (!value || typeof value !== "object" || Array.isArray(value)) errors.push(`${path}: expected object`); }
export function validateMathDocument(document) {
  const errors = [];
  requiredObject(document, "document", errors);
  if (document?.schemaVersion !== CONTRACTS.document) errors.push("schemaVersion: invalid");
  if (!/^mdoc-[0-9a-f]{64}$/u.test(document?.documentId || "")) errors.push("documentId: invalid");
  if (sha256(document?.source?.literal ?? "") !== document?.source?.literalHash) errors.push("source.literalHash: mismatch");
  if (!Array.isArray(document?.blocks)) errors.push("blocks: expected array");
  for (const [index, block] of (document?.blocks || []).entries()) {
    if (!block.blockId || !block.type) errors.push(`blocks[${index}]: missing identity/type`);
    if (typeof block.literal === "string" && sha256(block.literal) !== block.literalHash) errors.push(`blocks[${index}].literalHash: mismatch`);
    if (block.math) errors.push(...validateMathNode(block.math, `blocks[${index}].math`));
  }
  return { valid: errors.length === 0, errors };
}

export function validateDecision(decision) {
  const allowed = ["SAFE_AUTOMATIC_NORMALIZATION", "SOURCE_REVIEW_REQUIRED", "MATHEMATICAL_REVIEW_REQUIRED", "VISUAL_REVIEW_REQUIRED", "NO_ACTION_REQUIRED"];
  const errors = [];
  if (decision?.schemaVersion !== CONTRACTS.decision) errors.push("schemaVersion: invalid");
  if (!/^ndec-[0-9a-f]{64}$/u.test(decision?.decisionId || "")) errors.push("decisionId: invalid");
  if (!allowed.includes(decision?.classification)) errors.push("classification: invalid");
  if (!Array.isArray(decision?.issues) || !Array.isArray(decision?.families) || !Array.isArray(decision?.rules)) errors.push("decision arrays: invalid");
  return { valid: errors.length === 0, errors };
}

export function validateRepresentation(representation) {
  const errors = [];
  if (representation?.schemaVersion !== CONTRACTS.representation) errors.push("schemaVersion: invalid");
  if (!/^mrep-[0-9a-f]{64}$/u.test(representation?.representationId || "")) errors.push("representationId: invalid");
  if (!['latex', 'mathml'].includes(representation?.format)) errors.push("format: invalid");
  if (representation?.format === "mathml" && !validateDerivedMathML(representation.value)) errors.push("value: invalid MathML");
  if (representation?.derivedOnly !== true) errors.push("derivedOnly: must be true");
  return { valid: errors.length === 0, errors };
}

export function semanticDigest(values) { return sha256(values.map((value) => stableStringify(value)).sort()); }

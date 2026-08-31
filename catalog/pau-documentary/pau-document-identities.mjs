import { createHash } from "node:crypto";

export function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
}

export function sha256(value) {
  return createHash("sha256").update(Buffer.isBuffer(value) ? value : String(value), "utf8").digest("hex");
}

function prefixedId(prefix, payload) {
  return `${prefix}-${sha256(stableStringify(payload)).slice(0, 32)}`;
}

export function normalizeSubject(value) {
  const text = String(value || "").normalize("NFKC").toLowerCase();
  if (/ccss|ciencias\s+sociales/.test(text)) return "Matemáticas Aplicadas a las CCSS II";
  if (/matem[aá]ticas\s*ii/.test(text)) return "Matemáticas II";
  return null;
}

export function normalizeCommunity(value) {
  const text = String(value || "").normalize("NFKC").toLowerCase();
  if (/castilla[\s-]+la\s+mancha|clm/.test(text)) return "Castilla-La Mancha";
  if (/madrid/.test(text)) return "Madrid";
  return null;
}

export function normalizeSitting(value) {
  const text = String(value || "").normalize("NFKC").toLowerCase();
  if (/extraordinaria|julio|septiembre/.test(text)) return "Extraordinaria";
  if (/ordinaria|junio/.test(text)) return "Ordinaria";
  return null;
}

export function normalizeSubpartLabel(value) {
  const match = String(value || "").normalize("NFKC").toLowerCase().match(/[a-z0-9]+/);
  if (!match) throw new Error(`Etiqueta de apartado no normalizable: ${value}`);
  return match[0];
}

export function documentId(documentHash) {
  return `pau-doc-${String(documentHash).slice(0, 32)}`;
}

export function documentExerciseId({ documentHash, subject, questionKey, alternativeKey }) {
  return prefixedId("pau-ex", {
    alternativeKey: String(alternativeKey || "NONE"),
    documentHash: String(documentHash),
    questionKey: String(questionKey),
    subject: normalizeSubject(subject) || String(subject)
  });
}

export function documentSubpartId(documentExerciseIdValue, label) {
  return prefixedId("pau-sub", {
    documentExerciseId: String(documentExerciseIdValue),
    normalizedSubpartLabel: normalizeSubpartLabel(label)
  });
}

export function decisionId(exerciseId, revisionId) {
  return prefixedId("pau-dec", { exerciseId: String(exerciseId), revisionId: String(revisionId) });
}

export function redirectId(kind, fromExerciseId, toDocumentExerciseIds) {
  return prefixedId("pau-red", {
    fromExerciseId: String(fromExerciseId),
    kind: String(kind),
    toDocumentExerciseIds: [...toDocumentExerciseIds].sort()
  });
}

export function normalizedLiteral(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/[“”«»]/g, '"')
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

export function literalHash(value) {
  return sha256(String(value || ""));
}

export function semanticHash(value) {
  return sha256(stableStringify(value));
}

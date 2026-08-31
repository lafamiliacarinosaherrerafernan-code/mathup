import crypto from "node:crypto";

export const POLICY_VERSION = "mathup.solution-quality.v1";

const forbiddenVisiblePatterns = [
  { code: "VISIBLE_UNDEFINED", regex: /\bundefined\b/i },
  { code: "VISIBLE_NULL", regex: /\bnull\b/i },
  { code: "RAW_TEX_DELIMITER", regex: /\\\(|\\\)|\\\[|\\\]/ },
  { code: "RAW_TEX_COMMAND", regex: /\\(?:frac|sqrt|begin|end|left|right|vec|int|sum|lim)\b/ },
  { code: "RAW_INTERNAL_FRACTION", regex: /(^|[^\\])frac\s*\{/ },
];

export const COURSE_POLICIES = Object.freeze({
  eso: {
    lhopital: "FORBIDDEN",
    systems3x3: "GAUSS_STEP_BY_STEP",
    integration: "OUT_OF_SCOPE",
  },
  matematicas_i: {
    lhopital: "FORBIDDEN",
    systems3x3: "GAUSS_STEP_BY_STEP",
    extrema: "SIGN_CHART_REQUIRED_WHEN_APPLICABLE",
  },
  matematicas_ii: {
    lhopital: "ONLY_0_OVER_0_OR_INFINITY_OVER_INFINITY",
    systems3x3: "GAUSS_OR_CRAMER_WHEN_APPROPRIATE",
    parametricSystems: "ROUCHE_FROBENIUS_REQUIRED",
    integrationByParts: "FULL_DEVELOPMENT_REQUIRED",
  },
  ccss_ii: {
    lhopital: "FORBIDDEN",
    indefiniteIntegrals: "IMMEDIATE_ONLY_IN_PRACTICE",
    advancedIntegration: "FORBIDDEN",
  },
});

export function stableHash(value) {
  return crypto.createHash("sha256").update(stableStringify(value)).digest("hex");
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function visibleTextIssues(value, path = "$") {
  const issues = [];
  if (typeof value === "string") {
    for (const item of forbiddenVisiblePatterns) {
      if (item.regex.test(value)) issues.push({ code: item.code, path });
    }
    return issues;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => issues.push(...visibleTextIssues(item, `${path}[${index}]`)));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) issues.push(...visibleTextIssues(item, `${path}.${key}`));
  }
  return issues;
}

export function normalizeStudentDocument(value) {
  if (value === undefined || value === null) return null;
  if (Array.isArray(value)) return value.map(normalizeStudentDocument).filter((item) => item !== null);
  if (typeof value === "object") {
    return Object.fromEntries(Object.entries(value)
      .map(([key, item]) => [key, normalizeStudentDocument(item)])
      .filter(([, item]) => item !== null));
  }
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  const inline = trimmed.match(/^\\\(([\s\S]*)\\\)$/);
  const display = trimmed.match(/^\\\[([\s\S]*)\\\]$/);
  if (inline || display) {
    return { type: "math", display: Boolean(display), source: (inline || display)[1].trim() };
  }
  return value;
}

function canonicalMath(value) {
  const normalized = String(value ?? "").normalize("NFKC").replace(/\s+/g, "").replace(/−/g, "-").replace(/,/g, ".").toLowerCase();
  const numeric = normalized.match(/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(?:\/([+-]?(?:\d+(?:\.\d+)?|\.\d+)))?$/);
  if (!numeric) return normalized;
  const numerator = Number(numeric[1]);
  const denominator = numeric[2] === undefined ? 1 : Number(numeric[2]);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return normalized;
  return `numeric:${numerator / denominator}`;
}

export function deterministicCorrectIndex(attemptSeed, exerciseId, count = 4) {
  if (!attemptSeed || !exerciseId || count < 1) throw new Error("attemptSeed, exerciseId and a positive count are required");
  const digest = crypto.createHash("sha256").update(`${attemptSeed}\u0000${exerciseId}`).digest();
  return digest.readUInt32BE(0) % count;
}

export function materializeChoices({ correctAnswer, distractors, attemptSeed, exerciseId }) {
  if (!Array.isArray(distractors) || distractors.length !== 3) throw new Error("Exactly three distractors are required");
  const values = [correctAnswer, ...distractors];
  const normalized = values.map(canonicalMath);
  if (normalized.some((value) => !value)) throw new Error("Empty choices are forbidden");
  if (new Set(normalized).size !== 4) throw new Error("Duplicate or textually equivalent choices are forbidden");
  const correctIndex = deterministicCorrectIndex(attemptSeed, exerciseId, 4);
  const choices = [...distractors];
  choices.splice(correctIndex, 0, correctAnswer);
  return { choices, correctIndex };
}

export function validateSolutionRecord(record) {
  const errors = [];
  const warnings = [];
  const required = ["exerciseId", "coursePolicy", "statement", "answer", "steps", "finalAnswer", "verification"];
  for (const field of required) if (record?.[field] === undefined || record?.[field] === null || record?.[field] === "") errors.push({ code: "REQUIRED_FIELD", field });
  if (!Array.isArray(record?.steps) || record.steps.length === 0) errors.push({ code: "STEPS_REQUIRED" });
  if (Array.isArray(record?.steps) && record.steps.some((step) => !step || typeof step !== "object" || !step.explanation || !step.math)) errors.push({ code: "INCOMPLETE_STEP" });
  if (canonicalMath(record?.answer) !== canonicalMath(record?.finalAnswer)) errors.push({ code: "ANSWER_FINAL_MISMATCH" });
  errors.push(...visibleTextIssues(record).map((issue) => ({ ...issue, severity: "ERROR" })));

  const policy = COURSE_POLICIES[record?.coursePolicy];
  if (!policy) errors.push({ code: "UNKNOWN_COURSE_POLICY" });
  const methods = new Set(record?.methods || []);
  if (policy?.lhopital === "FORBIDDEN" && methods.has("LHOPITAL")) errors.push({ code: "METHOD_FORBIDDEN_LHOPITAL" });
  if (policy?.lhopital?.startsWith("ONLY_") && methods.has("LHOPITAL") && !["0_OVER_0", "INFINITY_OVER_INFINITY"].includes(record?.indeterminateForm)) errors.push({ code: "LHOPITAL_INVALID_FORM" });
  if (record?.coursePolicy === "matematicas_ii" && record?.isParametricSystem && !methods.has("ROUCHE_FROBENIUS")) errors.push({ code: "ROUCHE_FROBENIUS_REQUIRED" });
  if (["eso", "matematicas_i"].includes(record?.coursePolicy) && record?.systemSize === 3 && !methods.has("GAUSS")) errors.push({ code: "GAUSS_REQUIRED_FOR_3X3" });
  if (record?.coursePolicy === "matematicas_i" && record?.requiresSignAnalysis && !record?.signAnalysis) errors.push({ code: "SIGN_ANALYSIS_REQUIRED" });
  if (record?.coursePolicy === "matematicas_ii" && record?.integrationTechnique === "BY_PARTS" && (!Array.isArray(record?.steps) || record.steps.length < 3)) errors.push({ code: "FULL_BY_PARTS_DEVELOPMENT_REQUIRED" });
  if (record?.coursePolicy === "matematicas_ii" && record?.vectorGeometry && !record?.vectorDerivationExplicit) errors.push({ code: "VECTOR_DERIVATION_REQUIRED" });
  if (record?.coursePolicy === "ccss_ii" && methods.has("ADVANCED_INTEGRATION")) errors.push({ code: "METHOD_FORBIDDEN_ADVANCED_INTEGRATION" });
  if (record?.coursePolicy === "ccss_ii" && record?.isIndefiniteIntegral && (record?.mode !== "PRACTICE" || record?.integralComplexity !== "IMMEDIATE")) errors.push({ code: "CCSS_INTEGRAL_SCOPE" });

  if (record?.multipleChoice) {
    try {
      materializeChoices({ correctAnswer: record.answer, distractors: record.distractors, attemptSeed: record.attemptSeed, exerciseId: record.exerciseId });
    } catch (error) {
      errors.push({ code: "INVALID_CHOICES", detail: error.message });
    }
  } else if (record?.distractors?.length) warnings.push({ code: "UNUSED_DISTRACTORS" });
  return { valid: errors.length === 0, errors, warnings };
}

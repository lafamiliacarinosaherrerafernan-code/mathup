import {
  CANONICAL_EXERCISE_SCHEMA_VERSION,
  CANONICAL_VALIDATOR_VERSION,
  COURSE_IDS,
  COURSE_SUBJECTS,
  MODALITIES,
  MODALITIES_BY_PEDAGOGICAL_PROFILE,
  PEDAGOGICAL_PROFILES,
  STAGES,
  SUBJECT_IDS,
  WORKFLOW_STATES,
  canonicalChoiceValues,
  pedagogicalProfileForCourse,
  stageForCourse
} from "./canonical-exercise.mjs";

const CORRUPTION_PATTERNS = [
  { pattern: /\uFFFD/u, label: "carácter de sustitución Unicode" },
  { pattern: /(?:Ã.|Â.|â€|âˆ|ðŸ)/u, label: "secuencia probable de mojibake UTF-8" },
  { pattern: /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u, label: "carácter de control" },
  { pattern: /\b(?:t\?rmin|ra\?z|n\?mero|notaci\?n|par\?bola|hip\?rbola)/iu, label: "palabra matemática deteriorada" },
  { pattern: /(?:kg){2,}|(?:cm){2,}/iu, label: "unidad concatenada repetidamente" }
];

const MATH_SIGNAL = /(?:[=<>±×÷√∫∑∏∞≈≠≤≥²³⁴⁵⁶⁷⁸⁹]|\^|\\(?:frac|sqrt|lim|int|begin)|<math\b|\[\[[^\]]+\]\])/iu;
const FINAL_ONLY_SIGNAL = /^(?:(?:resultado(?:\s+final)?|respuesta|soluci[oó]n)\s*[:=]\s*)?\S+(?:\s*[=+\-*/^]\s*\S+)*[.]?$/iu;
const PROCEDURAL_SIGNAL = /\b(?:aplic|calcul|comprob|deriv|despej|divid|entonces|factor|igual|integr|l[ií]mit|multiplic|obten|oper|porque|por tanto|resolv|rest|simplific|sustitu|sum)\w*/iu;

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return !value.trim();
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function printable(value) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  try { return JSON.stringify(value); } catch { return String(value); }
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return x || 1;
}

/**
 * Normalización deliberadamente conservadora. No intenta demostrar identidades
 * algebraicas: solo reconoce igualdad textual, números, porcentajes y fracciones
 * numéricas simples. Todo lo demás queda para revisión matemática.
 */
export function safeEquivalenceKey(value) {
  const source = printable(value).normalize("NFKC").trim();
  if (!source) return { key: "", kind: "empty", decidable: true };
  const compact = source
    .replace(/[−–—]/gu, "-")
    .replace(/\s+/gu, "")
    .replace(/\.$/u, "")
    .toLocaleLowerCase("es");
  const fraction = compact.match(/^([+-]?\d+)\/([+-]?\d+)(.*)$/u);
  if (fraction && Number(fraction[2]) !== 0) {
    let numerator = Number(fraction[1]);
    let denominator = Number(fraction[2]);
    if (denominator < 0) { numerator *= -1; denominator *= -1; }
    const divisor = gcd(numerator, denominator);
    return { key: `rational:${numerator / divisor}/${denominator / divisor}|${fraction[3]}`, kind: "numeric-fraction", decidable: true };
  }
  const percent = compact.match(/^([+-]?\d+(?:[.,]\d+)?)%(.*)$/u);
  if (percent) {
    return { key: `number:${Number(percent[1].replace(",", ".")) / 100}|${percent[2]}`, kind: "percentage", decidable: true };
  }
  const numeric = compact.match(/^([+-]?\d+(?:[.,]\d+)?)(.*)$/u);
  if (numeric && !/[a-z]/iu.test(numeric[1])) {
    return { key: `number:${Number(numeric[1].replace(",", "."))}|${numeric[2]}`, kind: "numeric", decidable: true };
  }
  const mathLike = MATH_SIGNAL.test(source) || /[a-z]\d|\d[a-z]|\([^)]*\)/iu.test(compact);
  return { key: `text:${compact}`, kind: mathLike ? "symbolic-text" : "text", decidable: !mathLike };
}

export function safelyEquivalent(left, right) {
  const a = safeEquivalenceKey(left);
  const b = safeEquivalenceKey(right);
  return Boolean(a.key && a.key === b.key);
}

export function validateCanonicalExercise(exercise, options = {}) {
  const diagnostics = [];
  const mode = options.mode === "draft" ? "draft" : "publication";
  const add = (severity, code, path, message, evidence = undefined) => {
    diagnostics.push({ severity, code, path, message, ...(evidence === undefined ? {} : { evidence }) });
  };
  const requiredObject = (path, value) => {
    if (!isObject(value)) {
      add("ERROR", "REQUIRED_OBJECT_MISSING", path, `Falta el objeto obligatorio ${path}.`);
      return false;
    }
    return true;
  };
  const requiredText = (path, value) => {
    if (typeof value !== "string" || !value.trim()) {
      add("ERROR", "REQUIRED_TEXT_MISSING", path, `Falta texto obligatorio en ${path}.`);
      return false;
    }
    return true;
  };

  if (!isObject(exercise)) {
    add("ERROR", "EXERCISE_NOT_OBJECT", "$", "El ejercicio debe ser un objeto.");
    return finish();
  }
  if (exercise.schemaVersion !== CANONICAL_EXERCISE_SCHEMA_VERSION) {
    add("ERROR", "SCHEMA_VERSION_UNSUPPORTED", "schemaVersion", `Se esperaba ${CANONICAL_EXERCISE_SCHEMA_VERSION}.`, exercise.schemaVersion);
  }

  if (requiredObject("identity", exercise.identity)) {
    requiredText("identity.exerciseId", exercise.identity.exerciseId);
    requiredText("identity.revisionId", exercise.identity.revisionId);
    if (!Number.isInteger(exercise.identity.revisionNumber) || exercise.identity.revisionNumber < 1) {
      add("ERROR", "REVISION_NUMBER_INVALID", "identity.revisionNumber", "La revisión debe ser un entero mayor o igual que 1.");
    }
    if (!Array.isArray(exercise.identity.legacyIds)) add("ERROR", "LEGACY_IDS_INVALID", "identity.legacyIds", "legacyIds debe ser una lista.");
  }

  if (requiredObject("classification", exercise.classification)) {
    const { stage, courseId, subjectId, topic, block } = exercise.classification;
    if (!STAGES.includes(stage)) add("ERROR", "STAGE_INVALID", "classification.stage", "Etapa no reconocida.", stage);
    if (!COURSE_IDS.includes(courseId)) add("ERROR", "COURSE_INVALID", "classification.courseId", "Curso no reconocido.", courseId);
    if (!SUBJECT_IDS.includes(subjectId)) add("ERROR", "SUBJECT_INVALID", "classification.subjectId", "Materia no reconocida.", subjectId);
    if (COURSE_SUBJECTS[courseId] && COURSE_SUBJECTS[courseId] !== subjectId) {
      add("ERROR", "COURSE_SUBJECT_INCOHERENT", "classification.subjectId", "La materia no corresponde al curso.", { courseId, subjectId, expected: COURSE_SUBJECTS[courseId] });
    }
    const expectedStage = stageForCourse(courseId);
    if (expectedStage && expectedStage !== stage) {
      add("ERROR", "COURSE_STAGE_INCOHERENT", "classification.stage", "La etapa no corresponde al curso.", { courseId, stage, expectedStage });
    }
    if (!isObject(topic) || !requiredText("classification.topic.id", topic?.id) || !requiredText("classification.topic.label", topic?.label)) {
      add("ERROR", "TOPIC_INVALID", "classification.topic", "El tema debe conservar identificador y etiqueta.");
    }
    if (block !== null && (!isObject(block) || isEmpty(block.id) || isEmpty(block.label))) {
      add("ERROR", "BLOCK_INVALID", "classification.block", "El bloque, si existe, debe conservar identificador y etiqueta.");
    }
  }

  if (!Array.isArray(exercise.modalities) || !exercise.modalities.length) {
    add("ERROR", "MODALITIES_MISSING", "modalities", "Debe declararse al menos una modalidad.");
  } else {
    const profile = pedagogicalProfileForCourse(exercise.classification?.courseId);
    const allowed = MODALITIES_BY_PEDAGOGICAL_PROFILE[profile] || [];
    for (const modality of exercise.modalities) {
      if (!MODALITIES.includes(modality)) add("ERROR", "MODALITY_INVALID", "modalities", "Modalidad no reconocida.", modality);
      else if (!allowed.includes(modality)) {
        add("ERROR", "MODALITY_NOT_ALLOWED_FOR_PROFILE", "modalities", `La modalidad ${modality} no está permitida para el perfil ${profile || "desconocido"}.`, { modality, profile, allowed });
      }
    }
    if (exercise.modalities.includes("block-exam") && !exercise.classification?.block) {
      add("ERROR", "BLOCK_REQUIRED_FOR_MODALITY", "classification.block", "block-exam requiere un bloque explícito.");
    }
  }

  if (requiredObject("provenance", exercise.provenance)) {
    const courseId = String(exercise.classification?.courseId || "");
    const isSecondBach = courseId.startsWith("2bach-");
    const isPau = exercise.classification?.stage === "PAU" || exercise.provenance.kind === "official-pau" || isSecondBach;
    if (isSecondBach && (exercise.classification?.stage !== "PAU" || exercise.provenance.kind !== "official-pau")) {
      add("ERROR", "SECOND_BACH_MUST_BE_PAU", "provenance.kind", "Todo ejercicio de 2.º de Bachillerato de +MathUp debe ser PAU, con etapa y procedencia PAU explícitas.", { stage: exercise.classification?.stage, kind: exercise.provenance.kind });
    }
    if (isPau) {
      if (!isObject(exercise.provenance.community)) add("ERROR", "PAU_COMMUNITY_MISSING", "provenance.community", "Un ejercicio PAU requiere comunidad autónoma.");
      if (!isObject(exercise.provenance.pau)) add("ERROR", "PAU_METADATA_MISSING", "provenance.pau", "Un ejercicio PAU requiere un objeto de metadatos PAU trazable.");
      if (!String(exercise.classification?.courseId || "").startsWith("2bach")) {
        add("ERROR", "PAU_COURSE_INCOHERENT", "classification.courseId", "Un ejercicio PAU debe clasificarse en 2.º de Bachillerato.");
      }
      if (!exercise.modalities?.includes("pau-simulation") && !exercise.modalities?.includes("open-response")) {
        add("WARNING", "PAU_MODALITY_UNDECLARED", "modalities", "La procedencia PAU no está reflejada en una modalidad PAU o abierta.");
      }
    }
    if (isObject(exercise.provenance.community)) {
      if (!/^[A-Z]{2,8}$/u.test(exercise.provenance.community.code || "")) add("ERROR", "COMMUNITY_CODE_INVALID", "provenance.community.code", "El código de comunidad debe ser estable y estar en mayúsculas.");
      requiredText("provenance.community.name", exercise.provenance.community.name);
    }
    if (isObject(exercise.provenance.pau)) {
      if (exercise.provenance.pau.year !== null && !Number.isInteger(exercise.provenance.pau.year)) add("ERROR", "PAU_YEAR_INVALID", "provenance.pau.year", "El año PAU, cuando consta, debe ser entero.");
      if (exercise.provenance.pau.sitting !== null && (typeof exercise.provenance.pau.sitting !== "string" || !exercise.provenance.pau.sitting.trim())) add("ERROR", "PAU_SITTING_INVALID", "provenance.pau.sitting", "La convocatoria PAU, cuando consta, debe ser texto no vacío.");
      if (exercise.provenance.pau.year === null || exercise.provenance.pau.sitting === null) {
        add("WARNING", "PAU_DETAIL_INCOMPLETE", "provenance.pau", "Año o convocatoria no constan en la fuente; deben completarse o confirmarse antes de publicación.");
      }
    }
    if (requiredObject("provenance.source", exercise.provenance.source)) {
      requiredText("provenance.source.sourceId", exercise.provenance.source.sourceId);
      requiredText("provenance.source.sourceFile", exercise.provenance.source.sourceFile);
      requiredText("provenance.source.sourcePath", exercise.provenance.source.sourcePath);
    }
  }

  const statement = exercise.content?.statement;
  if (!requiredObject("content", exercise.content) || !requiredObject("content.statement", statement)) {
    add("ERROR", "STATEMENT_MISSING", "content.statement", "Falta el enunciado.");
  } else {
    const text = printable(statement.plainText).trim();
    const blocks = Array.isArray(statement.blocks) ? statement.blocks : [];
    if (!text && !blocks.some((block) => !isEmpty(block?.value))) add("ERROR", "STATEMENT_EMPTY", "content.statement", "El enunciado está vacío.");
    inspectCorruption("content.statement.plainText", text);
    if (!blocks.length) add("ERROR", "STATEMENT_BLOCKS_MISSING", "content.statement.blocks", "El enunciado debe conservar al menos un bloque estructurado.");
    blocks.forEach((block, index) => {
      if (!isObject(block) || isEmpty(block.blockId) || isEmpty(block.type) || isEmpty(block.value)) {
        add("ERROR", "STATEMENT_BLOCK_INVALID", `content.statement.blocks[${index}]`, "Bloque de enunciado incompleto.");
      }
      inspectCorruption(`content.statement.blocks[${index}].value`, printable(block?.value));
    });
    const representations = Array.isArray(exercise.content.mathRepresentations) ? exercise.content.mathRepresentations : [];
    const mathematical = MATH_SIGNAL.test(`${text} ${blocks.map((block) => printable(block?.value)).join(" ")}`);
    if (mathematical && representations.length === 0) {
      add("WARNING", "MATH_REPRESENTATION_UNDECLARED", "content.mathRepresentations", "Se detectó notación matemática sin declarar su representación.");
    }
    representations.forEach((representation, index) => {
      if (!isObject(representation) || isEmpty(representation.format) || isEmpty(representation.value) || isEmpty(representation.role)) {
        add("ERROR", "MATH_REPRESENTATION_INVALID", `content.mathRepresentations[${index}]`, "Representación matemática incompleta.");
      }
      inspectCorruption(`content.mathRepresentations[${index}].value`, printable(representation?.value));
    });
  }

  if (!requiredObject("answer", exercise.answer) || isEmpty(exercise.answer?.canonicalValue)) {
    add("ERROR", "ANSWER_MISSING", "answer.canonicalValue", "Falta la respuesta correcta canónica.");
  } else {
    inspectCorruption("answer.canonicalValue", printable(exercise.answer.canonicalValue));
  }

  const hasSolutionObject = requiredObject("solution", exercise.solution);
  const expectedSolutionProfile = pedagogicalProfileForCourse(exercise.classification?.courseId);
  if (hasSolutionObject && !PEDAGOGICAL_PROFILES.includes(exercise.solution.pedagogicalProfile)) {
    add("ERROR", "SOLUTION_PEDAGOGICAL_PROFILE_INVALID", "solution.pedagogicalProfile", "La solución necesita un perfil pedagógico estable ESO, BACH1 o BACH2_PAU.");
  } else if (hasSolutionObject && expectedSolutionProfile !== exercise.solution.pedagogicalProfile) {
    add("ERROR", "SOLUTION_PEDAGOGICAL_PROFILE_INCOHERENT", "solution.pedagogicalProfile", "El perfil pedagógico de la solución no corresponde al curso.", { courseId: exercise.classification?.courseId, expectedProfile: expectedSolutionProfile, actual: exercise.solution.pedagogicalProfile });
  }
  if (!hasSolutionObject || exercise.solution?.kind === "missing") {
    add("ERROR", "SOLUTION_MISSING", "solution", "Falta una solución desarrollada y trazable.");
  } else {
    const steps = Array.isArray(exercise.solution.steps) ? exercise.solution.steps : [];
    const solutionText = steps.map((step) => `${step?.explanation || ""} ${step?.work?.plainText || ""}`).join(" ").trim();
    if (exercise.solution.kind === "final-only" || (!steps.length && !isEmpty(exercise.solution.finalAnswer)) || (steps.length === 1 && FINAL_ONLY_SIGNAL.test(solutionText))) {
      add("ERROR", "SOLUTION_FINAL_ONLY", "solution", "La solución contiene únicamente el resultado final o no desarrolla el método.");
    }
    if (exercise.solution.kind === "developed" && !steps.length) add("ERROR", "SOLUTION_STEPS_MISSING", "solution.steps", "Una solución desarrollada necesita pasos.");
    if (exercise.solution.kind === "developed" && steps.length) {
      const answerText = printable(exercise.answer?.canonicalValue).normalize("NFKC").trim();
      const normalizedSolution = solutionText.normalize("NFKC").trim();
      const onlyRestatesAnswer = Boolean(answerText) && (
        normalizedSolution === answerText ||
        new RegExp(`^(?:resultado|respuesta|soluci[oó]n)(?:\\s+final)?\\s*[:=]?\\s*${escapeRegExp(answerText)}[.]?$`, "iu").test(normalizedSolution)
      );
      if (onlyRestatesAnswer) {
        add("ERROR", "SOLUTION_RESTATES_FINAL_ANSWER", "solution.steps", "Una solución marcada como desarrollada se limita objetivamente a repetir la respuesta final.");
      } else if (!PROCEDURAL_SIGNAL.test(normalizedSolution) && !/[=⇒→]/u.test(normalizedSolution)) {
        add("WARNING", "SOLUTION_DEVELOPMENT_INSUFFICIENT", "solution.steps", "No hay evidencia suficiente para confirmar que el desarrollo explica el razonamiento; requiere revisión humana.");
      }
    }
    steps.forEach((step, index) => {
      if (!isObject(step) || isEmpty(step.stepId) || isEmpty(step.explanation) || !isObject(step.work) || (isEmpty(step.work.plainText) && !step.work.blocks?.length)) {
        add("ERROR", "SOLUTION_STEP_INVALID", `solution.steps[${index}]`, "Paso de solución incompleto.");
      }
      inspectCorruption(`solution.steps[${index}]`, `${step?.explanation || ""} ${step?.work?.plainText || ""}`);
    });
  }

  validateChoices(exercise.choices, exercise.answer);

  if (requiredObject("review", exercise.review)) {
    if (!WORKFLOW_STATES.includes(exercise.review.status)) add("ERROR", "REVIEW_STATUS_INVALID", "review.status", "Estado editorial no reconocido.");
    if (exercise.review.solutionNeedsReview) {
      add(exercise.publication?.status === "PUBLISHED" ? "ERROR" : "WARNING", "SOLUTION_REVIEW_REQUIRED", "review.solutionNeedsReview", "La solución está marcada para revisión.");
    }
    if (Array.isArray(exercise.review.findings) && exercise.review.findings.length) {
      add("WARNING", "REVIEW_FINDINGS_OPEN", "review.findings", "Hay hallazgos editoriales abiertos.", exercise.review.findings);
    }
  }

  if (requiredObject("traceability", exercise.traceability)) {
    if (!Array.isArray(exercise.traceability.inventoryRecordIds) || !exercise.traceability.inventoryRecordIds.length) {
      add("ERROR", "TRACEABILITY_INVENTORY_MISSING", "traceability.inventoryRecordIds", "Debe enlazar al menos un registro del inventario original.");
    }
    requiredText("traceability.originalIdentity", exercise.traceability.originalIdentity);
    if (!Array.isArray(exercise.traceability.transformations)) add("ERROR", "TRACEABILITY_TRANSFORMATIONS_INVALID", "traceability.transformations", "Las transformaciones deben ser una lista, aunque esté vacía.");
  }

  if (requiredObject("publication", exercise.publication)) {
    if (!WORKFLOW_STATES.includes(exercise.publication.status)) add("ERROR", "PUBLICATION_STATUS_INVALID", "publication.status", "Estado de publicación no reconocido.");
    const eligible = Array.isArray(exercise.publication.eligibleModalities) ? exercise.publication.eligibleModalities : [];
    const undeclared = eligible.filter((item) => !exercise.modalities?.includes(item));
    if (undeclared.length) add("ERROR", "PUBLICATION_MODALITY_UNDECLARED", "publication.eligibleModalities", "No puede publicarse en modalidades no declaradas.", undeclared);
    if (exercise.publication.status === "PUBLISHED" && !["APPROVED", "PUBLISHED"].includes(exercise.review?.status)) {
      add("ERROR", "PUBLICATION_WITHOUT_APPROVAL", "publication.status", "No puede publicarse sin revisión aprobada.");
    }
    const profile = pedagogicalProfileForCourse(exercise.classification?.courseId);
    const disallowedEligible = eligible.filter((item) => !(MODALITIES_BY_PEDAGOGICAL_PROFILE[profile] || []).includes(item));
    if (disallowedEligible.length) add("ERROR", "PUBLICATION_MODALITY_NOT_ALLOWED", "publication.eligibleModalities", "Hay modalidades de publicación incompatibles con el perfil pedagógico.", { profile, modalities: disallowedEligible });
  }

  return finish();

  function inspectCorruption(path, text) {
    for (const { pattern, label } of CORRUPTION_PATTERNS) {
      if (pattern.test(text)) add("ERROR", "CORRUPTED_CHARACTERS", path, `Se detectó ${label}.`, text.slice(0, 160));
    }
  }

  function validateChoices(choices, answer) {
    if (choices === null || choices === undefined) {
      if (answer?.kind === "choice" || ["practice", "challenge", "adventure"].some((modeName) => exercise.modalities?.includes(modeName))) {
        add("ERROR", "CHOICES_REQUIRED", "choices", "La modalidad o tipo de respuesta requiere cuatro opciones.");
      }
      return;
    }
    if (!isObject(choices)) {
      add("ERROR", "CHOICES_INVALID", "choices", "choices debe ser un objeto o null.");
      return;
    }
    if (Object.hasOwn(choices, "correctIndex") || Object.hasOwn(choices, "correctPosition")) {
      add("ERROR", "CHOICE_POSITION_FORBIDDEN", "choices", "La posición A/B/C/D no forma parte del contenido canónico.");
    }
    const distractors = Array.isArray(choices.distractors) ? choices.distractors : [];
    if (!isObject(choices.correct) || distractors.length !== 3) {
      add("ERROR", "CHOICE_COUNT_INVALID", "choices", "Deben existir una respuesta correcta y exactamente tres distractores.");
    }
    if (choices.shufflePolicy !== "seeded-per-attempt") add("ERROR", "SHUFFLE_POLICY_INVALID", "choices.shufflePolicy", "El contrato exige barajado determinista por intento.");
    const values = canonicalChoiceValues(choices);
    const ids = [];
    values.forEach((choice, index) => {
      const path = index === 0 ? "choices.correct" : `choices.distractors[${index - 1}]`;
      if (!isObject(choice) || isEmpty(choice.choiceId) || isEmpty(choice.value)) add("ERROR", "CHOICE_EMPTY", path, "Opción vacía o sin identificador estable.");
      if (choice?.choiceId) ids.push(choice.choiceId);
      inspectCorruption(`${path}.value`, printable(choice?.value));
    });
    if (new Set(ids).size !== ids.length) add("ERROR", "CHOICE_ID_DUPLICATED", "choices", "Los identificadores de opción deben ser distintos.");
    const groups = new Map();
    values.forEach((choice, index) => {
      const normalized = safeEquivalenceKey(choice?.value);
      if (!normalized.key) return;
      if (!groups.has(normalized.key)) groups.set(normalized.key, []);
      groups.get(normalized.key).push(index);
    });
    for (const indexes of groups.values()) {
      if (indexes.length < 2) continue;
      const exact = new Set(indexes.map((index) => printable(values[index]?.value).normalize("NFKC").trim())).size === 1;
      add("ERROR", exact ? "CHOICE_DUPLICATED" : "CHOICE_MATHEMATICALLY_EQUIVALENT", "choices", exact ? "Hay opciones repetidas." : "Hay opciones matemáticamente equivalentes con normalización segura.", indexes);
    }
    if (!isEmpty(answer?.canonicalValue) && isObject(choices.correct) && !safelyEquivalent(answer.canonicalValue, choices.correct.value)) {
      add("ERROR", "CHOICE_CORRECT_MISMATCH", "choices.correct.value", "La opción correcta no coincide con la respuesta canónica.", { answer: answer.canonicalValue, choice: choices.correct.value });
    }
    if (!isEmpty(answer?.canonicalValue)) {
      const matches = values.filter((choice) => safelyEquivalent(answer.canonicalValue, choice?.value)).length;
      if (matches === 0) add("ERROR", "ANSWER_NOT_IN_CHOICES", "choices", "La respuesta canónica no aparece entre los cuatro valores.");
      if (matches > 1) add("ERROR", "MULTIPLE_CORRECT_EQUIVALENTS", "choices", "Más de una opción equivale a la respuesta correcta.", matches);
    }
    const undecidableSymbolic = values.filter((choice) => safeEquivalenceKey(choice?.value).kind === "symbolic-text").length;
    if (undecidableSymbolic > 1) {
      add("WARNING", "SYMBOLIC_EQUIVALENCE_NOT_PROVEN", "choices", "La equivalencia entre opciones simbólicas no puede decidirse de forma segura sin revisión matemática.");
    }
  }

  function finish() {
    diagnostics.sort((a, b) => ({ ERROR: 0, WARNING: 1 }[a.severity] - { ERROR: 0, WARNING: 1 }[b.severity]) || a.code.localeCompare(b.code));
    const errors = diagnostics.filter((item) => item.severity === "ERROR").length;
    const warnings = diagnostics.filter((item) => item.severity === "WARNING").length;
    return {
      validatorVersion: CANONICAL_VALIDATOR_VERSION,
      schemaVersion: exercise?.schemaVersion ?? null,
      mode,
      status: errors ? "ERROR" : warnings ? "WARNING" : "OK",
      canPublish: errors === 0 && warnings === 0,
      publicationGate: errors ? "BLOCKED" : warnings ? "REVIEW_REQUIRED" : "PASSED",
      summary: { errors, warnings, diagnostics: diagnostics.length },
      diagnostics
    };
  }
}

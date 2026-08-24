import {
  CONTRACTS,
  SHUFFLE_ALGORITHM_VERSION,
  deterministicId,
  sha256
} from "./canonical-entities.mjs";

const LETTERS = Object.freeze(["A", "B", "C", "D"]);

export function materializeSessionExercise(template, answer, distractorSet, attemptContext) {
  if (template?.schemaVersion !== CONTRACTS.deliveryTemplate || template.interactionKind !== "multiple-choice") {
    throw new Error("Solo se materializan sesiones para una plantilla multiple-choice válida.");
  }
  if (!answer || template.answerRef !== answer.answerId) throw new Error("La plantilla no referencia la respuesta aportada.");
  if (!distractorSet || template.distractorSetRef !== distractorSet.distractorSetId) throw new Error("La plantilla no referencia el conjunto de distractores aportado.");
  if (distractorSet.distractors.length !== 3) throw new Error("Se requieren exactamente tres distractores existentes.");
  const attemptId = String(attemptContext?.attemptId || "");
  if (!attemptId) throw new Error("attemptId es obligatorio.");
  const seedHash = sha256({
    algorithmVersion: SHUFFLE_ALGORITHM_VERSION,
    attemptId,
    exerciseRevisionId: attemptContext.exerciseRevisionId,
    templateRevisionId: template.revisionId
  });
  const raw = [
    { sourceKind: "answer", sourceId: answer.answerId, value: answer.canonicalValue, correct: true },
    ...distractorSet.distractors.map((item) => ({ sourceKind: "distractor", sourceId: item.distractorId, value: item.value, correct: false }))
  ];
  const ordered = raw
    .map((item) => ({ ...item, orderKey: sha256(`${seedHash}\u0000${item.sourceId}`) }))
    .sort((left, right) => left.orderKey.localeCompare(right.orderKey) || left.sourceId.localeCompare(right.sourceId));
  const options = ordered.map((item, index) => ({
    optionInstanceId: deterministicId("opt", "session-option", { seedHash, sourceId: item.sourceId }),
    sourceKind: item.sourceKind,
    sourceId: item.sourceId,
    position: LETTERS[index],
    value: item.value
  }));
  const correctIndex = ordered.findIndex((item) => item.correct);
  const correctOptionInstanceId = options[correctIndex].optionInstanceId;
  return {
    schemaVersion: CONTRACTS.sessionExercise,
    sessionExerciseId: deterministicId("ses", "session-exercise", { attemptId, templateRevisionId: template.revisionId, seedHash }),
    attemptId,
    exerciseRevisionId: attemptContext.exerciseRevisionId,
    templateRevisionId: template.revisionId,
    algorithmVersion: SHUFFLE_ALGORITHM_VERSION,
    seedHash,
    options,
    correctOptionInstanceId,
    correctIndex,
    correctPosition: LETTERS[correctIndex]
  };
}

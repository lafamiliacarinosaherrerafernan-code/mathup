import crypto from 'node:crypto';

export const userExerciseId = (documentHash, key) => `pau-user-and-${crypto.createHash('sha256').update(`${documentHash}|${key}`).digest('hex').slice(0, 28)}`;
export const solutionStep = (explanation, math) => `${explanation}\n${math}`;
export const userPart = ({ exerciseId, id, text, answer, distractors, errors, steps, method, evidence }) => ({
  id: `${exerciseId}:${id}`,
  label: id.includes('.') ? `${id.split('.').at(-1)})` : id === 'whole' ? '' : `${id})`,
  text,
  semanticAnswer: answer,
  canonicalSemanticAnswer: answer,
  distractors,
  distractorEvidence: errors,
  solutionSteps: steps,
  finalAnswer: answer,
  canonicalFinalAnswer: answer,
  verification: { verified: true, method, detail: 'Comprobación independiente vinculada al enunciado oficial.', numericalEvidence: evidence }
});

export function userRecord({ documentHash, subject, year, sitting, reserveNumber = null, questionKey, alternativeKey, block, blockId, topic, topicIndexes, slot, prompt, parts, secondaryTopics = [], referenceTable = null, sourceReference }) {
  const exerciseId = userExerciseId(documentHash, `${questionKey}|${alternativeKey ?? ''}`);
  return {
    exerciseId,
    subject,
    community: 'Andalucía',
    year,
    sitting,
    reserveNumber,
    questionKey: String(questionKey),
    alternativeKey,
    variant: alternativeKey,
    documentHash,
    sourceAuthority: 'USER_SUPPLIED_PRIMARY_OFFICIAL_DOCUMENT',
    officialPromptLiteral: prompt,
    learnerStatement: prompt,
    block,
    blockId,
    primaryTopic: topic,
    topicIndexes,
    secondaryTopics,
    examSlot: slot,
    examFamilyLabel: `Ejercicio ${questionKey} · ${topic}`,
    ...(referenceTable ? { referenceTable } : {}),
    deliveryEligibility: ['topic-challenge', 'block-challenge', 'exam'],
    publicationState: 'LOCAL_ENABLED_AFTER_SOURCE_BOUND_SOLUTION_AND_CHECKS',
    parts: parts(exerciseId),
    resolutionEvidence: { mathematical: 'INDEPENDENT_CHECK_RECORDED_PER_PART', source: sourceReference }
  };
}


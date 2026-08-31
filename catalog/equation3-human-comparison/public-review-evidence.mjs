import crypto from 'node:crypto';

export const PUBLIC_REVIEWER_ID = 'reviewer-1';
export const PUBLIC_REVIEW_DATE = '2026-08-25';

export function reviewSequenceMap(decisions) {
  return new Map([...decisions]
    .sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)) || a.objectId.localeCompare(b.objectId))
    .map((decision, index) => [decision.objectId, index + 1]));
}

export function publicDecision(decision, reviewSequence) {
  return {
    objectId: decision.objectId,
    decision: decision.decision,
    comment: decision.comment ?? '',
    reviewerId: PUBLIC_REVIEWER_ID,
    reviewDate: PUBLIC_REVIEW_DATE,
    reviewSequence,
    explicitHumanAction: decision.explicitHumanAction === true,
    contextMappingStatus: decision.contextMappingStatus,
    caseHash: decision.caseHash,
    officialPngSha256: decision.officialPngSha256,
    mathAstSha256: decision.mathAstSha256,
    mathmlSha256: decision.mathmlSha256,
  };
}

export function publicDecisionSetSha256(decisions) {
  const canonical = [...decisions]
    .sort((a, b) => a.objectId.localeCompare(b.objectId))
    .map((decision) => Object.fromEntries(Object.entries(decision).sort(([a], [b]) => a.localeCompare(b))));
  return crypto.createHash('sha256').update(JSON.stringify(canonical)).digest('hex');
}

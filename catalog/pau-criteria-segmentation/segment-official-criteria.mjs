import crypto from 'node:crypto';

export const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
export const stableId = (prefix, parts) => `${prefix}-${sha256(parts.map((v) => String(v ?? '')).join('\u241f')).slice(0, 32)}`;

const SCORE = /(?:hasta\s+)?\d+(?:[.,]\d+)?\s*puntos?|\d+(?:[.,]\d+)?\s*por\s+/iu;
const METHOD = /planteamiento|resoluci[oó]n|procedimiento|razonamiento|c[aá]lculo|representaci[oó]n|interpretaci[oó]n|recinto|funci[oó]n objetivo|gr[aá]fic|deriv|integr|probabilidad|distribuci[oó]n|intervalo de confianza|contraste/iu;
const FINAL = /(?:^|[\n.;])\s*(?:resultado|soluci[oó]n|respuesta)\s*(?:final)?\s*[:=]/iu;
const INTERMEDIATE = /(?:se obtiene|resultado intermedio|valor intermedio)\s*[:=]?/iu;
const FULL = /desarrollo completo|resoluci[oó]n completa/iu;
const PARTIAL = /desarrollo parcial|parte del desarrollo|procedimiento parcial/iu;
const BAD_MATH = /\uFFFD|\?\?+|\b(?:frac|sqrt|begin|left|right)\s*\{/u;

export function classifyCriterionLiteral(literal) {
  const categories = [];
  if (FINAL.test(literal)) categories.push('OFFICIAL_FINAL_ANSWER');
  if (INTERMEDIATE.test(literal)) categories.push('OFFICIAL_INTERMEDIATE_RESULT');
  if (METHOD.test(literal)) categories.push('OFFICIAL_METHOD');
  if (SCORE.test(literal)) categories.push('OFFICIAL_SCORING_GUIDANCE');
  if (FULL.test(literal)) categories.push('OFFICIAL_FULL_DEVELOPMENT');
  if (PARTIAL.test(literal)) categories.push('OFFICIAL_PARTIAL_DEVELOPMENT');
  if (!categories.length) categories.push('CRITERIA_SCOPE_AMBIGUOUS');
  return { categories, mathReviewState: BAD_MATH.test(literal) ? 'CRITERIA_MATH_REVIEW_REQUIRED' : 'NOT_REQUIRED' };
}

export function normalizeText(text) {
  return String(text ?? '').replace(/\r\n?/g, '\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

export function segmentCriterionText(text) {
  const normalized = String(text ?? '').replace(/\r\n?/g, '\n');
  const exerciseRe = /(?:^|\n)\s*(?:EJERCICIO|PROBLEMA|PREGUNTA)\s+(\d+)\s*[:.\-]?/giu;
  const starts = [...normalized.matchAll(exerciseRe)];
  if (!starts.length) return [];
  const out = [];
  for (let i = 0; i < starts.length; i += 1) {
    const start = starts[i].index;
    const end = i + 1 < starts.length ? starts[i + 1].index : normalized.length;
    const body = normalized.slice(start, end).trim();
    const headerEnd = body.indexOf('\n');
    const payloadOffset = headerEnd >= 0 ? headerEnd + 1 : 0;
    const payload = body.slice(payloadOffset);
    const subRe = /(?:^|\n)\s*([a-z])\)\s*/giu;
    const subStarts = [...payload.matchAll(subRe)];
    const subparts = [];
    for (let j = 0; j < subStarts.length; j += 1) {
      const ss = subStarts[j].index + (subStarts[j][0].startsWith('\n') ? 1 : 0);
      const se = j + 1 < subStarts.length ? subStarts[j + 1].index : payload.length;
      const literal = normalizeText(payload.slice(ss, se));
      if (literal) subparts.push({ label: subStarts[j][1].toLowerCase(), literal, relativeStart: payloadOffset + ss, relativeEnd: payloadOffset + se });
    }
    const prefix = normalized.slice(0, start);
    const optionMatches = [...prefix.matchAll(/OPCI[ÓO]N\s+([AB])/giu)];
    const alternativeKey = optionMatches.length ? optionMatches.at(-1)[1].toUpperCase() : 'NONE';
    out.push({ questionKey: starts[i][1], alternativeKey, literal: normalizeText(body), startOffset: start, endOffset: end, subparts });
  }
  return out;
}

export function makeFragment({ link, registry, exercise, subpart, literal, startOffset, endOffset, sourceKind }) {
  const scope = subpart
    ? { level: 'SUBPART', exerciseId: exercise.exerciseId, subpartId: subpart.subpartId, subpartLabel: subpart.label }
    : { level: 'EXERCISE', exerciseId: exercise.exerciseId, subpartId: null, subpartLabel: null };
  const clean = normalizeText(literal);
  const { categories, mathReviewState } = classifyCriterionLiteral(clean);
  const fragmentId = stableId('pau-criterion-fragment', [link.criterionDocumentId, exercise.exerciseId, subpart?.subpartId, clean]);
  return {
    schemaVersion: 'mathup.pau-criterion-fragment.v1', fragmentId,
    criterionDocumentId: link.criterionDocumentId, criterionLinkId: link.criterionLinkId,
    matchClassification: link.classification, literal: clean, literalSha256: sha256(clean), categories, scope,
    mathReviewState,
    provenance: {
      authority: registry.authority, documentHash: registry.sha256, localPath: registry.localPath,
      startOffset, endOffset, sourceKind
    }
  };
}

export function makeAnswerCandidate(fragment) {
  if (!fragment.categories.includes('OFFICIAL_FINAL_ANSWER') || fragment.mathReviewState !== 'NOT_REQUIRED') return null;
  return {
    schemaVersion: 'mathup.pau-official-answer-candidate.v1',
    candidateId: stableId('pau-official-answer-candidate', [fragment.fragmentId, fragment.literalSha256]),
    fragmentId: fragment.fragmentId, exerciseId: fragment.scope.exerciseId, subpartId: fragment.scope.subpartId,
    literal: fragment.literal, status: 'OFFICIAL_ANSWER_CANDIDATE', promotionPolicy: 'NO_AUTOMATIC_PROMOTION',
    provenance: { criterionDocumentId: fragment.criterionDocumentId, fragmentId: fragment.fragmentId, literalSha256: fragment.literalSha256 }
  };
}

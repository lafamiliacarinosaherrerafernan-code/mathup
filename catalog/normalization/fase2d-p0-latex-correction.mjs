import crypto from 'node:crypto';

export const P0_RAW_LATEX_TARGETS = Object.freeze({
  'vent-60f2251a717d2d094eb1dc4cc991d394': Object.freeze({
    expectedLiteralHash: '04798ba8f664c4c325f11a7b30861393e0467f964e5de6764d7db94fce48432b',
    exerciseId: 'ex-5ddcded1-cfcd-5e90-9a20-ab28d7a0e5f6',
    entityType: 'solution',
  }),
  'vent-f882cb3797e686463ca72ae6c532eeb3': Object.freeze({
    expectedLiteralHash: 'e54c89767fe1afec8378496f7774b955489ad1ec2fa2ac16019840a0a4f7c187',
    exerciseId: 'ex-5ddcded1-cfcd-5e90-9a20-ab28d7a0e5f6',
    entityType: 'answer',
  }),
  'vent-7efb1035613be94794b64d97ba4f8914': Object.freeze({
    expectedLiteralHash: 'bf29257619ee26a2f5c600facace48d47f6e8870fda8ee84809ad1a0949bf070',
    exerciseId: 'ex-23b7b6a2-334b-50b1-9c15-5ed01e403000',
    entityType: 'solution',
  }),
});

export function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function readBracedInteger(literal, start) {
  if (literal[start] !== '{') return null;
  const end = literal.indexOf('}', start + 1);
  if (end < 0) return null;
  const value = literal.slice(start + 1, end);
  if (!/^-?\d+$/.test(value)) return null;
  return { value, end: end + 1 };
}

function readSafeFraction(literal, start) {
  if (!literal.startsWith('\\frac', start)) return null;
  const numerator = readBracedInteger(literal, start + 5);
  if (!numerator) return null;
  const denominator = readBracedInteger(literal, numerator.end);
  if (!denominator || denominator.value === '0') return null;
  return {
    end: denominator.end,
    numerator: numerator.value,
    denominator: denominator.value,
    original: literal.slice(start, denominator.end),
  };
}

export function segmentSafeIntegerFractions(literal) {
  const segments = [];
  let cursor = 0;
  let textStart = 0;
  while (cursor < literal.length) {
    const fraction = readSafeFraction(literal, cursor);
    if (!fraction) {
      cursor += 1;
      continue;
    }
    if (cursor > textStart) segments.push({ kind: 'text', text: literal.slice(textStart, cursor) });
    segments.push({
      kind: 'fraction',
      numerator: fraction.numerator,
      denominator: fraction.denominator,
      original: fraction.original,
    });
    cursor = fraction.end;
    textStart = cursor;
  }
  if (textStart < literal.length) segments.push({ kind: 'text', text: literal.slice(textStart) });
  return segments;
}

export function restoreOriginalLiteral(segments) {
  return segments.map((segment) => segment.kind === 'fraction' ? segment.original : segment.text).join('');
}

export function visibleTextFromSegments(segments) {
  return segments.map((segment) => segment.kind === 'fraction'
    ? `${segment.numerator}/${segment.denominator}`
    : segment.text).join('');
}

export function buildP0Representation(populationRow) {
  const target = P0_RAW_LATEX_TARGETS[populationRow?.visualEntityId];
  if (!target) throw new Error(`Entidad fuera de la lista P0 autorizada: ${populationRow?.visualEntityId ?? 'null'}`);
  if (populationRow.exerciseId !== target.exerciseId || populationRow.entityType !== target.entityType) {
    throw new Error(`Identidad inesperada para ${populationRow.visualEntityId}`);
  }
  const literalHash = sha256(populationRow.literal);
  if (literalHash !== target.expectedLiteralHash || populationRow.literalHash !== target.expectedLiteralHash) {
    throw new Error(`El literal de ${populationRow.visualEntityId} no coincide con la evidencia aprobada`);
  }
  const segments = segmentSafeIntegerFractions(populationRow.literal);
  const fractions = segments.filter((segment) => segment.kind === 'fraction');
  if (!fractions.length) throw new Error(`No hay fracciones seguras que materializar en ${populationRow.visualEntityId}`);
  const restored = restoreOriginalLiteral(segments);
  if (restored !== populationRow.literal || sha256(restored) !== target.expectedLiteralHash) {
    throw new Error(`La transformación no es reversible para ${populationRow.visualEntityId}`);
  }
  const visibleText = visibleTextFromSegments(segments);
  if (/\\(?:frac|sqrt|begin|end|int|lim|vec|left|right)|\$\$|\$[^$]+\$/.test(visibleText)) {
    throw new Error(`Queda LaTeX crudo visible en ${populationRow.visualEntityId}`);
  }
  return {
    schemaVersion: 'mathup.fase2d-p0.representation.v1',
    visualEntityId: populationRow.visualEntityId,
    entityId: populationRow.entityId,
    exerciseId: populationRow.exerciseId,
    entityType: populationRow.entityType,
    sourceDocumentId: populationRow.documentId,
    sourceLiteralHash: target.expectedLiteralHash,
    sourceLiteral: populationRow.literal,
    segments,
    fractionCount: fractions.length,
    reversible: true,
    restoredLiteralHash: sha256(restored),
    visibleTextHash: sha256(visibleText),
    rule: 'EXACT_INTEGER_FRAC_TO_DERIVED_HTML_FRACTION_V1',
    scope: 'ISOLATED_FASE2D_P0_HARNESS_ONLY',
  };
}

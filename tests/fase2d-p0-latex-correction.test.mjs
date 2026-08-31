import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  buildP0Representation,
  P0_RAW_LATEX_TARGETS,
  restoreOriginalLiteral,
  sha256,
  visibleTextFromSegments,
} from '../catalog/normalization/fase2d-p0-latex-correction.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const population = fs.readFileSync(path.join(ROOT, 'artifacts/fase2d/runs/run-a/population.jsonl'), 'utf8')
  .split(/\r?\n/).filter(Boolean).map(JSON.parse);
const targets = population.filter((row) => P0_RAW_LATEX_TARGETS[row.visualEntityId]);

test('la lista aislada contiene exactamente los tres P0 autorizados', () => {
  assert.equal(Object.keys(P0_RAW_LATEX_TARGETS).length, 3);
  assert.equal(targets.length, 3);
});

test('cada corrección está limitada por identidad y hash de evidencia', () => {
  for (const row of targets) {
    const representation = buildP0Representation(row);
    assert.equal(representation.sourceLiteralHash, row.literalHash);
    assert.equal(representation.restoredLiteralHash, row.literalHash);
    assert.equal(representation.exerciseId, row.exerciseId);
    assert.equal(representation.entityType, row.entityType);
  }
});

test('la transformación es literal y criptográficamente reversible', () => {
  for (const row of targets) {
    const representation = buildP0Representation(row);
    const restored = restoreOriginalLiteral(representation.segments);
    assert.equal(restored, row.literal);
    assert.equal(sha256(restored), row.literalHash);
  }
});

test('solo materializa fracciones enteras inequívocas y no deja LaTeX visible', () => {
  for (const row of targets) {
    const representation = buildP0Representation(row);
    assert.ok(representation.fractionCount > 0);
    assert.ok(representation.segments.filter((segment) => segment.kind === 'fraction')
      .every((segment) => /^-?\d+$/.test(segment.numerator) && /^-?\d+$/.test(segment.denominator)));
    assert.doesNotMatch(visibleTextFromSegments(representation.segments), /\\(?:frac|sqrt|begin|end|int|lim|vec|left|right)/);
  }
});

test('rechaza cambios de fuente y entidades ajenas al alcance', () => {
  assert.throws(() => buildP0Representation({ ...targets[0], literal: `${targets[0].literal} ` }), /no coincide/);
  assert.throws(() => buildP0Representation({ ...targets[0], visualEntityId: 'vent-no-autorizada' }), /fuera de la lista/);
});

test('las doce ejecuciones posteriores no tienen LaTeX crudo ni fallos geométricos', () => {
  const file = path.join(ROOT, 'artifacts/fase2d-p0-latex/after/geometry-results.jsonl');
  const rows = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
  assert.equal(rows.length, 12);
  assert.deepEqual([...new Set(rows.map((row) => row.viewport))].sort((a, b) => a - b), [320, 375, 768, 1280]);
  assert.ok(rows.every((row) => !row.rawLatex && !row.overflow && !row.clipped && !row.overlap && !row.hidden));
  assert.ok(rows.every((row) => !row.missingGlyph && !row.resourceError && !row.measurementError));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateMathNode } from '../catalog/normalization/canonical-math-ast.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixtures = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/fase2c/visual/visual-fixtures.json'), 'utf8'));
test('el corpus visual cubre las familias previstas y las cuatro resoluciones', () => {
  assert.ok(fixtures.length >= 28);
  for (const fixture of fixtures) {
    assert.equal(fixture.schemaVersion, 'mathup.visual-fixture.v1');
    assert.deepEqual(fixture.resolutions, [320, 375, 768, 1280]);
    assert.deepEqual(validateMathNode(fixture.math), []);
    assert.equal(fixture.source.status, 'VISUAL_CONTROL_NOT_CATALOG_CONTENT');
  }
});
test('el HTML aislado contiene MathML y los tres contextos, sin depender del runtime público', () => {
  const html = fs.readFileSync(path.join(root, 'artifacts/fase2c/visual/index.html'), 'utf8');
  assert.ok(fixtures.every((fixture) => fixture.derived.mathml.startsWith('<math xmlns=')));
  assert.match(html, /f\.derived\.mathml/);
  assert.match(html, /Enunciado/);
  assert.match(html, /Respuesta/);
  assert.match(html, /Solución/);
  assert.doesNotMatch(html, /(?:src|href)=["'](?:\.\.\/|\/)(?:app\.js|math-renderer\.js)/);
});

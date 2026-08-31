import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const regression = fs.readFileSync(path.join(root, 'tests/math-native-bounds-geometry.browser.js'), 'utf8');
const fixture = fs.readFileSync(path.join(root, 'tests/math-native-bounds-geometry.html'), 'utf8');

test('la regresión geométrica mide cajas reales y exige cotas a la derecha sin solapamiento', () => {
  assert.match(regression, /getBoundingClientRect\(\)/);
  assert.match(regression, /integralUpper\.left > integralCenter/);
  assert.match(regression, /integralLower\.left > integralCenter/);
  assert.match(regression, /barrowUpper\.left >= barrowOperator\.right - tolerance/);
  assert.match(regression, /barrowLower\.left >= barrowOperator\.right - tolerance/);
  assert.match(regression, /intersectionArea\(integralOperator, integralUpper\) < significantArea/);
  assert.match(regression, /intersectionArea\(integralOperator, integralLower\) < significantArea/);
  assert.match(regression, /intersectionArea\(barrowOperator, barrowUpper\) < significantArea/);
  assert.match(regression, /intersectionArea\(barrowOperator, barrowLower\) < significantArea/);
});

test('el fixture ejecuta la geometría sobre integral definida y Barrow MathML', () => {
  assert.match(fixture, /∫_\{0\}\^\{2\}/);
  assert.match(fixture, /\]_\{0\}\^\{2\}/);
  assert.match(fixture, /runMathNativeBoundsGeometryRegression\(fixture\)/);
  assert.match(fixture, /dataset\.geometryPass/);
});

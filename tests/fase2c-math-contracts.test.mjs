import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serializeLatex, serializeMathML, validateDerivedMathML, validateMathNode } from '../catalog/normalization/canonical-math-ast.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const schemas = [
  'mathup.math-document.v1.schema.json',
  'mathup.normalization-decision.v1.schema.json',
  'mathup.math-representation.v1.schema.json',
  'mathup.visual-fixture.v1.schema.json',
];
test('los cuatro contratos acompañantes son JSON versionado y cerrado', () => {
  for (const name of schemas) {
    const schema = JSON.parse(fs.readFileSync(path.join(root, 'catalog/normalization', name), 'utf8'));
    assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
    assert.equal(schema.type, 'object');
    assert.equal(schema.additionalProperties, false);
  }
});

const n = (value) => ({ type: 'number', value: String(value) });
const x = (value = 'x') => ({ type: 'identifier', value });
const samples = [
  { type: 'power', base: x(), exponent: n(2) },
  { type: 'subscript', base: x(), index: n(1) },
  { type: 'fraction', numerator: x(), denominator: n(2) },
  { type: 'radical', radicand: x() },
  { type: 'absolute', body: x() },
  { type: 'equation', left: x(), right: n(1), operator: '=' },
  { type: 'system', children: [{ type: 'equation', left: x(), right: n(1), operator: '=' }] },
  { type: 'inequality', left: x(), right: n(1), operator: '<' },
  { type: 'matrix', rows: [[n(1), n(2)]] },
  { type: 'determinant', rows: [[n(1), n(2)], [n(3), n(4)]] },
  { type: 'limit', variable: x(), lower: n(0), body: x() },
  { type: 'derivative', variable: x(), body: x() },
  { type: 'integral', lower: n(0), upper: n(1), body: x(), variable: x() },
  { type: 'sum', lower: n(1), upper: x('n'), body: x('i') },
  { type: 'product', lower: n(1), upper: x('n'), body: x('i') },
  { type: 'function-call', name: 'log', children: [x()] },
  { type: 'vector', body: x('v') },
  { type: 'coordinate', children: [n(1), n(2)] },
  { type: 'interval', left: n(0), right: n(1), openLeft: true, openRight: false },
  { type: 'set', children: [n(1), n(2)] },
  { type: 'piecewise', branches: [{ expression: x(), condition: { type: 'inequality', left: x(), right: n(0), operator: '≥' } }] },
  { type: 'aligned', children: [{ type: 'equation', left: x(), right: n(1), operator: '=' }] },
  { type: 'probability', body: x('A') },
  { type: 'combinatorial', upper: x('n'), lower: x('k') },
  { type: 'greek', value: 'λ' },
  { type: 'unit', body: n(3), value: 'cm' },
];
test('todas las familias estructurales serializan a LaTeX y MathML derivados válidos', () => {
  for (const node of samples) {
    assert.deepEqual(validateMathNode(node), []);
    assert.ok(serializeLatex(node).length > 0);
    assert.equal(validateDerivedMathML(serializeMathML(node)), true);
  }
});
test('un nodo desconocido no puede serializarse', () => {
  assert.throws(() => serializeLatex({ type: 'invented-node' }), /Unsupported/);
});

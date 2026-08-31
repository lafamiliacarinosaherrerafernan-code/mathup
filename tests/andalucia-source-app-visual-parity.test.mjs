import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import '../math-renderer.js';

const context = { window: {} };
vm.createContext(context);
for (const file of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-source-app-visual-parity.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const byId = new Map(runtime.exercises.map((exercise) => [exercise.exerciseId, exercise]));
const render = (exercise) => [
  exercise.learnerStatementHtml || globalThis.MargaritaMathRenderer.text(exercise.learnerStatement || ''),
  ...(exercise.parts || []).map((part) => globalThis.MargaritaMathRenderer.text(part.text || ''))
].join('\n');

test('Reserva 2008 conserva A y B como matrices y la secuencia a→b', () => {
  const exercise = byId.get('pau-user-and-fc24350dc009dd373a61feb93871');
  const html = render(exercise);
  assert.equal((html.match(/class="math-matrix\b/g) || []).length, 2);
  assert.equal(Array.from(exercise.parts, (part) => part.label).join('|'), 'a)|b)');
  assert.equal(new Set(exercise.parts.map((part) => part.id)).size, 2);
});

test('Reserva 2019 conserva A 3×3, la matriz construida, 3A, det(BA⁻¹) y a→b', () => {
  const exercise = byId.get('pau-can-ex-b9f6f879ab07429e3e9fcf2843eb85cc');
  const html = render(exercise);
  assert.equal((html.match(/class="math-matrix\b/g) || []).length, 2);
  assert.match(html, /3A/);
  assert.match(html, /det\(BA(?:⁻¹|<sup>−1<\/sup>)\)/);
  assert.equal(Array.from(exercise.parts, (part) => part.label).join('|'), 'a)|b)');
});

test('Ordinaria 2026 conserva una llave y tres ecuaciones, con a→b', () => {
  const exercise = byId.get('pau-can-ex-44b63cc7b878dc2d552ccd771ca6a638');
  const html = render(exercise);
  assert.equal((html.match(/math-system-brace/g) || []).length, 1);
  assert.match(html, /math-system-rows-3/);
  assert.equal(Array.from(exercise.parts, (part) => part.label).join('|'), 'a)|b)');
});

test('el cargador de producción incluye la capa de paridad antes de la puerta interactiva', () => {
  const index = fs.readFileSync('index.html', 'utf8');
  const parity = index.indexOf('andalucia-source-app-visual-parity.js');
  const gate = index.indexOf('andalucia-interactive-delivery-gate.js');
  assert.ok(parity > 0 && parity < gate);
});

test('fase 2.9 conserva matrices, funciones a trozos y rectas paramétricas como estructuras', () => {
  const ids = [
    'pau-can-ex-192610f4a829387be50aba5a6e6a15b1',
    'pau-can-ex-5ebe59e0cf89500947aaff4e24894b48',
    'pau-can-ex-fb4fca3ecb848d9c39b37a078931bb7a'
  ];
  const html = ids.map((id) => render(byId.get(id))).join('\n');
  assert.match(html, /math-matrix/);
  assert.match(html, /math-piecewise/);
  assert.match(html, /math-system/);
  assert.doesNotMatch(html.replace(/<[^>]*>/gu, ' '), /\b(?:matrix|piecewise|system|cases)\s*[({]/iu);
});

test('el parser admite condiciones if, igualdad y desigualdad estricta en funciones a trozos', () => {
  const html = globalThis.MargaritaMathRenderer.text('f(x)=piecewise{x if x≠0;0 if x=0}');
  assert.equal((html.match(/math-piecewise-lines/gu) || []).length, 1);
  assert.match(html, /x≠0/);
  assert.match(html, /x=0/);
  assert.doesNotMatch(html.replace(/<[^>]*>/gu, ' '), /piecewise\s*\{/iu);
});

test('los ocho DOC heredados conservan la estructura nativa recuperada', () => {
  const ids = [
    'pau-can-doc-ex-003f8317c19d7451985b40ff38bc0e52',
    'pau-can-doc-ex-38c9c7d6cb87cc3a35eb9e6966e738da',
    'pau-can-doc-ex-85f170d1a7840bc6c1b5967201af2ff1',
    'pau-can-doc-ex-9a0ded07010dd26dca632b1f31e14653',
    'pau-can-doc-ex-a20c4facec1a69296c29635d28e017c3',
    'pau-can-doc-ex-b125b3e656434aeabb2613c7d119f27d',
    'pau-can-doc-ex-c3a07cd5637a526fc3d1f92bfe4ac0d3',
    'pau-can-doc-ex-e119e071e6eb2f6d1e1e58e259691d83'
  ];
  for (const id of ids) {
    const exercise = byId.get(id);
    assert.ok(exercise, id);
    assert.doesNotMatch(render(exercise).replace(/<[^>]*>/gu, ' '), /\\begin\{|\bmatrix\s*[({]/iu, id);
  }
});

test('fase 2.9 reconcilia exactamente sus 70 casos y deja una sola fuente no resuelta', () => {
  const report = JSON.parse(fs.readFileSync('artifacts/andalucia-phase29/phase29-resolution.json', 'utf8'));
  assert.equal(Object.values(report.resolution).reduce((sum, value) => sum + value, 0), 70);
  assert.deepEqual(report.resolution, {
    PASS: 13,
    CORRECTED: 56,
    UNRESOLVED_SOURCE: 1,
    NEEDS_HUMAN_VISUAL_REVIEW: 0,
    FAIL: 0
  });
});

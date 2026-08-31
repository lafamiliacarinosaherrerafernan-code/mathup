import assert from 'node:assert/strict';
import test from 'node:test';
import { rows, summary } from '../scripts/audit-andalucia-runtime-skill-chain.mjs';
import '../math-renderer.js';

const renderer = globalThis.MargaritaMathRenderer;

test('cada apartado habilitado materializa una unidad interactiva completa e independiente', () => {
  assert.ok(rows.length > 0);
  assert.equal(summary.contractFailures, 0);
  for (const row of rows) {
    assert.equal(row.detectedSubpartCount, row.generatedQuestionCount, row.subpartId);
    assert.equal(row.correctAnswerCount, 1, row.subpartId);
    assert.equal(row.optionSetCount, 1, row.subpartId);
    assert.equal(row.solutionCount, 1, row.subpartId);
    assert.equal(row.reachableInteractiveSubpartCount, 1, row.subpartId);
  }
});

test('el runtime no entrega soluciones materializadas con plantillas históricas', () => {
  assert.equal(summary.staleMaterializedSolutions, 0);
  assert.equal(summary.sourceReferenceOnlySolutions, 0);
});

test('la distribución normal visible usa probabilidades de Z y lectura de tabla, sin Phi', () => {
  assert.equal(summary.forbiddenPhiSolutions, 0);
});

test('las unidades km/h permanecen en línea y nunca se convierten en fracción matemática', () => {
  assert.equal(summary.inlineUnitFractions, 0);
});

test('la normalización trigonométrica no altera «por tanto» ni «tangente»', () => {
  const prose = renderer.text('Por tanto, la recta tangente existe.');
  assert.match(prose, /Por tanto/);
  assert.match(prose, /tangente/);
  assert.doesNotMatch(prose, /tgto|tggente/);
  assert.match(renderer.text('tan(x)=1'), /tg\(x\)/);
});

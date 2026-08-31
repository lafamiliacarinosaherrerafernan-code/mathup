import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read = (file) => fs.readFileSync(file, 'utf8');
const rendererContext = { window: {} };
vm.runInNewContext(read('math-renderer.js'), rendererContext, { filename: 'math-renderer.js' });
const renderer = rendererContext.window.MargaritaMathRenderer;
const loadRuntime = (withGate = true) => {
  const context = { window: {} };
  vm.createContext(context);
  for (const file of ['data/andalucia-user-source-index.js', 'data/andalucia-pau-runtime.js', 'data/andalucia-global-corrections.js']) {
    vm.runInContext(read(file), context, { filename: file });
  }
  if (withGate) vm.runInContext(read('data/andalucia-interactive-delivery-gate.js'), context, { filename: 'delivery-gate' });
  return context.window.ANDALUCIA_PAU_RUNTIME;
};

test('el censo de Matemáticas II Andalucía conserva 110 PDF y 817 ejercicios', () => {
  const rows = read('artifacts/andalucia-mates-global-correction-2/exercise-part-census.jsonl').trim().split(/\r?\n/).map(JSON.parse);
  assert.equal(rows.length, 817);
  assert.equal(new Set(rows.map((row) => row.file)).size, 110);
  assert.equal(rows.filter((row) => row.partStatus === 'SOURCE_PARTS_MISSING_IN_RUNTIME').length, 0);
  const pedagogicalDecompositions = rows.filter((row) => row.enabled && row.originalPartCount !== row.interactivePartCount);
  assert.ok(pedagogicalDecompositions.length > 0);
  assert.ok(pedagogicalDecompositions.every((row) => row.partStatus === 'RUNTIME_PARTS_EXCEED_SOURCE'));
  assert.ok(pedagogicalDecompositions.every((row) => row.interactivePartCount > row.originalPartCount));
  assert.ok(pedagogicalDecompositions.every((row) => row.everyInteractivePartComplete));
});

test('los cuatro expedientes corregidos conservan exactamente 1, 2, 2 y 3 apartados', () => {
  const runtime = loadRuntime(false);
  const expected = new Map([
    ['pau-can-ex-4a1d7a5b14de49c1a545b0a194bd33fc', 1],
    ['pau-can-ex-e10495ba33971cca4641d0fc6f1389aa', 2],
    ['pau-user-and-556322ecfdbde7e83340fc0f6727', 2],
    ['pau-user-and-9d256a6d008e07c0f8f7267b7cc8', 3]
  ]);
  for (const [id, count] of expected) assert.equal(runtime.exercises.find((exercise) => exercise.exerciseId === id)?.parts.length, count, id);
});

test('todo ejercicio habilitado supera las reglas pedagógicas y mantiene tres distractores', () => {
  const runtime = loadRuntime(true);
  const enabledIds = new Set(runtime.challengeRecords('2bach-mates').map((record) => record.parentExerciseId || record.exerciseId));
  assert.ok(enabledIds.size > 400);
  for (const exercise of runtime.exercises.filter((item) => item.subject === '2_bach_mates_ii' && enabledIds.has(item.exerciseId))) {
    for (const part of exercise.parts) {
      const solution = part.solutionSteps.join('\n');
      assert.equal(part.distractors.length, 3, exercise.exerciseId);
      assert.doesNotMatch(solution, /Taylor|Maclaurin|(?:\+|−|-)\s*O\s*\(/i, exercise.exerciseId);
      const visibleHtml = [part.text, part.semanticAnswer, ...part.distractors, ...part.solutionSteps]
        .map((value) => renderer.text(value)).join('\n');
      assert.doesNotMatch(visibleHtml, /\\begin\{|\\end\{|\[object Object\]/, exercise.exerciseId);
    }
  }
});

test('el clasificador deja los 817 ejercicios en los 14 temas y sin revisión pendiente', () => {
  const rows = read('artifacts/andalucia-global-correction/classification-comparison.jsonl').trim().split(/\r?\n/).map(JSON.parse).filter((row) => row.subject === '2_bach_mates_ii');
  assert.equal(rows.length, 817);
  assert.equal(rows.filter((row) => row.status === 'REVIEW_REQUIRED').length, 0);
  const runtime = loadRuntime(false);
  const mates = runtime.exercises.filter((exercise) => exercise.subject === '2_bach_mates_ii');
  assert.equal(new Set(mates.map((exercise) => exercise.primaryTopicIndex)).size, 14);
  assert.ok(mates.every((exercise) => Number.isInteger(exercise.primaryTopicIndex) && exercise.primaryTopicIndex >= 0 && exercise.primaryTopicIndex < 14));
  const delivered = loadRuntime(true);
  assert.ok(Array.from({ length: 14 }, (_, index) => delivered.topicRecords('2bach-mates', index).length).every((count) => count > 0));
});

test('las tablas de distribución se asignan por contenido y no por la palabra normal geométrica', () => {
  const runtime = loadRuntime(false);
  const distribution = runtime.exercises.find((exercise) => exercise.exerciseId === 'pau-can-ex-29f1c935e0bad3cd2eaeb6ca8e83f9f4');
  const tangentNormal = runtime.exercises.find((exercise) => exercise.exerciseId === 'pau-user-and-948d49ad35ecb9f25a6833d420d2');
  assert.ok(distribution.parts.some((part) => part.referenceTable === 'normal'));
  if (distribution.parts.length > 1) assert.equal(distribution.referenceTable, undefined);
  else assert.equal(distribution.referenceTable, 'normal');
  assert.equal(tangentNormal.referenceTable, undefined);
  const delivered = loadRuntime(true);
  assert.ok(delivered.topicRecords('2bach-mates', 13).every((record) => /distribuci[oó]n\s+normal|variable\s+aleatoria.{0,30}normal|sigue\s+una\s+(?:ley\s+)?normal/i.test([record.text, ...(record.parts || []).map((part) => part.text)].join('\n'))));
});

test('matrix{}, matrix() y matrix [[...]] nunca dejan el token interno visible', () => {
  const context = { window: {} };
  vm.runInNewContext(read('math-renderer.js'), context, { filename: 'math-renderer.js' });
  const renderer = context.window.MargaritaMathRenderer;
  for (const source of ['A=matrix{1,2;3,4}', 'A=matrix(1,2;3,4)', 'A=matrix [[1,2],[3,4]]']) {
    const html = renderer.text(source);
    assert.match(html, /math-matrix/);
    assert.doesNotMatch(html, /\bmatrix\s*(?:\{|\(|\[\[)/i);
  }
});

test('las respuestas con punto y coma conservan toda la prosa y las unidades', () => {
  const context = { window: {} };
  vm.runInNewContext(read('math-renderer.js'), context, { filename: 'math-renderer.js' });
  const value = 'Decrece para x>50; máximo C(50)=4; es decir, 4.000 €.';
  const html = context.window.MargaritaMathRenderer.text(value);
  assert.match(html, /<span class="math-value-unit">4\.000&nbsp;€<\/span>/);
  assert.doesNotMatch(html, /math-system/);
});

test('la etiqueta visible de Matemáticas II usa el nombre completo del tema 3', () => {
  const source = read('app.js');
  const matesBlock = source.slice(source.indexOf('id: "2bach-mates"'), source.indexOf('const groupRules'));
  assert.match(matesBlock, /"Resolución de sistemas con determinantes"/);
  assert.doesNotMatch(matesBlock, /"Sistemas con determinantes"/);
});

test('planos y rectas espaciales no se entregan dentro del bloque de álgebra', () => {
  const runtime = loadRuntime(true);
  for (const record of runtime.blockRecords('2bach-mates', 'algebra')) {
    const text = [record.text, ...(record.parts || []).map((part) => part.text)].join('\n');
    const spatial = /(?:\bplano\b|\brecta\s+r\b|\brecta\s+s\b|\bposici[oó]n\s+relativa\b)/i.test(text)
      && /(?:π|\bplano\b|[A-Z]\s*\([^)]*,[^)]*,[^)]*\))/i.test(text)
      && !/(?:gr[aá]fica\s+de|funci[oó]n[\s\S]{0,100}recta\s+(?:tangente|normal))/i.test(text);
    assert.equal(spatial, false, record.parentExerciseId || record.exerciseId);
  }
});

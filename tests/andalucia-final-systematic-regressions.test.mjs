import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const context = { window: {} };
vm.createContext(context);
for (const file of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
const exercises = context.window.ANDALUCIA_PAU_RUNTIME.exercises;

test('todo apartado que pide una gráfica tiene imagen exacta salvo UNRESOLVED_SOURCE', () => {
  const unresolved = 'pau-can-ex-88fd4c724da14002349a8f59e3c53fcb';
  const missing = [];
  for (const exercise of exercises) for (const part of exercise.parts || []) {
    if (exercise.exerciseId !== unresolved
      && /represent(?:e|a|ar|aci[oó]n)\s+gr[aá]fic/i.test(part.text || '')
      && !part.solutionMathOptions?.solutionGraph?.src) missing.push(part.id);
  }
  assert.deepEqual(missing, []);
  const unresolvedRecord = exercises.find((exercise) => exercise.exerciseId === unresolved);
  assert.ok(unresolvedRecord);
  assert.equal(unresolvedRecord.sourceStatus, 'UNRESOLVED_SOURCE');
  assert.equal(unresolvedRecord.documentaryValidation, false);
  assert.equal(unresolvedRecord.publicationState, 'LOCAL_DISABLED_UNRESOLVED_SOURCE_MANUAL_REVIEW_REQUIRED');
  assert.deepEqual(Array.from(unresolvedRecord.deliveryEligibility || []), []);
  assert.ok(context.window.ANDALUCIA_PAU_RUNTIME.documentaryDeliveryBlockedIds.includes(unresolved));
  assert.ok(!context.window.ANDALUCIA_PAU_RUNTIME.topicRecords('2bach-ccss', unresolvedRecord.topicIndexes[0]).some((record) => record.exerciseId === unresolved));
  assert.ok(!context.window.ANDALUCIA_PAU_RUNTIME.blockRecords('2bach-ccss', unresolvedRecord.blockId).some((record) => record.exerciseId === unresolved));
  assert.ok(!context.window.ANDALUCIA_PAU_RUNTIME.examSlotRecords('2bach-ccss', unresolvedRecord.examSlot).some((record) => record.exerciseId === unresolved));
});

test('las reglas de cálculo no contaminan tamaños muestrales ni errores máximos', () => {
  for (const exercise of exercises) for (const part of exercise.parts || []) {
    if (/tama[nñ]o m[ií]nimo|error m[aá]ximo|nivel de confianza|intervalo de confianza/i.test(part.text || '')) {
      assert.doesNotMatch((part.solutionSteps || []).join('\n'), /recta (?:real )?de signos de f[′']/i, part.id);
    }
  }
});

test('normal enlaza el suceso tipificado y documenta la lectura de tabla', () => {
  for (const exercise of exercises) for (const part of exercise.parts || []) {
    const solution = (part.solutionSteps || []).join('\n');
    if (part.referenceTable === 'normal' && /P\s*\(/.test(solution)) {
      assert.match(solution, /P\s*\(\s*Z/i, part.id);
      assert.match(solution, /Buscamos[^.\n]*tabla/i, part.id);
    }
  }
});

test('un ejercicio mixto muestra una vez cada tabla requerida por sus apartados', () => {
  const app = fs.readFileSync('app.js', 'utf8');
  assert.match(app, /referenceTableParts = isMultipartQuestion/);
  assert.match(app, /candidate\?\.referenceTable === part\.referenceTable/);
  assert.match(app, /referenceTableParts\.map\(\(part\) => renderPauReferenceTable\(question, part\)\)\.join\(""\)/);
});

test('cada ejercicio conserva subpartId únicos y Reserva 2008 recorre a→b una sola vez', () => {
  for (const exercise of exercises) {
    const ids = (exercise.parts || []).map((part) => part.id);
    assert.equal(new Set(ids).size, ids.length, exercise.exerciseId);
  }
  const record = exercises.find((exercise) => exercise.exerciseId === 'pau-user-and-fc24350dc009dd373a61feb93871');
  assert.ok(record);
  assert.deepEqual(
    Array.from(record.parts, (part) => part.id),
    ['pau-user-and-fc24350dc009dd373a61feb93871:a', 'pau-user-and-fc24350dc009dd373a61feb93871:b']
  );
});

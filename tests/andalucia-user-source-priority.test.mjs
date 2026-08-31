import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const window = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'data', 'andalucia-user-source-index.js'), 'utf8'), { window });
vm.runInNewContext(fs.readFileSync(path.join(root, 'data', 'andalucia-pau-runtime.js'), 'utf8'), { window });
const index = window.ANDALUCIA_USER_SOURCE_INDEX;
const runtime = window.ANDALUCIA_PAU_RUNTIME;

test('registra los 217 exámenes y excluye la tabla auxiliar', () => {
  assert.equal(Object.keys(index).length, 217);
  assert.equal(Object.values(index).filter((row) => row.subject === '2_bach_mates_ii').length, 110);
  assert.equal(Object.values(index).filter((row) => row.subject === '2_bach_ccss_ii').length, 107);
  assert.equal(Object.values(index).some((row) => /Tabla función distribuón normal/i.test(row.fileName)), false);
});

test('la convocatoria visible usa el nombre del archivo del usuario', () => {
  let covered = 0;
  for (const exercise of runtime.exercises) {
    const source = index[exercise.documentHash];
    if (!source) continue;
    covered += 1;
    assert.equal(exercise.year, source.year, exercise.exerciseId);
    assert.equal(exercise.sitting, source.sitting, exercise.exerciseId);
    assert.equal(exercise.userSource.fileName, source.fileName, exercise.exerciseId);
    assert.equal(exercise.userSource.sourcePriority, 'USER_SUPPLIED_PRIMARY', exercise.exerciseId);
  }
  assert.equal(covered, 1600);
});

test('el número de reserva no se interpreta como otra convocatoria', () => {
  const reserve = runtime.exercises.filter((exercise) => exercise.userSource?.reserveNumber != null);
  assert.ok(reserve.length > 0);
  assert.ok(reserve.every((exercise) => exercise.sitting === 'Reserva'));
});

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');

function loadRuntime() {
  const window = {};
  for (const relative of [
    'data/andalucia-user-source-index.js',
    'data/andalucia-pau-runtime.js',
    'data/andalucia-global-corrections.js',
    'data/andalucia-interactive-delivery-gate.js'
  ]) vm.runInNewContext(fs.readFileSync(path.join(root, relative), 'utf8'), { window }, { filename: relative });
  return window.ANDALUCIA_PAU_RUNTIME;
}

const runtime = loadRuntime();

test('el invariante PDF-canónico-runtime-interacción queda cerrado para Matemáticas II Andalucía', () => {
  execFileSync(process.execPath, [path.join(root, 'scripts/audit-andalucia-subparts.mjs'), '--phase=after'], { cwd: root });
  const rows = fs.readFileSync(path.join(root, 'artifacts/andalucia-subpart-architecture/subpart-reconciliation.jsonl'), 'utf8')
    .split(/\r?\n/).filter(Boolean).map(JSON.parse);
  assert.equal(rows.length, 1641);
  const mates = rows.filter((row) => row.materia === 'Matemáticas II');
  assert.equal(mates.length, 817);
  assert.equal(mates.filter((row) => row.enabled && row.status !== 'OK').length, 0);
  assert.equal(mates.filter((row) => row.enabled).flatMap((row) => row.lostSubparts).length, 0);
  for (const row of mates.filter((item) => item.enabled)) {
    assert.deepEqual(row.sourceSubparts, row.canonicalSubparts, row.exerciseId);
    assert.deepEqual(row.canonicalSubparts, row.runtimeSubparts, row.exerciseId);
    assert.deepEqual(row.runtimeSubparts, row.interactiveSubparts, row.exerciseId);
  }
});

test('el invariante PDF-canónico-runtime-interacción queda cerrado para CCSS II Andalucía', () => {
  execFileSync(process.execPath, [path.join(root, 'scripts/audit-andalucia-subparts.mjs'), '--phase=after-ccss'], { cwd: root });
  const rows = fs.readFileSync(path.join(root, 'artifacts/andalucia-subpart-architecture/after-ccss-subpart-reconciliation.jsonl'), 'utf8')
    .split(/\r?\n/).filter(Boolean).map(JSON.parse);
  const ccss = rows.filter((row) => row.materia === 'CCSS II');
  assert.equal(ccss.length, 824);
  assert.equal(ccss.filter((row) => row.enabled && row.status !== 'OK').length, 0);
  assert.equal(ccss.filter((row) => row.enabled).flatMap((row) => row.lostSubparts).length, 0);
  for (const row of ccss.filter((item) => item.enabled)) {
    assert.deepEqual(row.sourceSubparts, row.canonicalSubparts, row.exerciseId);
    assert.deepEqual(row.canonicalSubparts, row.runtimeSubparts, row.exerciseId);
    assert.deepEqual(row.runtimeSubparts, row.interactiveSubparts, row.exerciseId);
  }
});

test('cada ejercicio habilitado es un contenedor único y todos sus apartados son materializables', () => {
  for (const courseId of ['2bach-mates', '2bach-ccss']) {
    const records = runtime.challengeRecords(courseId);
    assert.equal(records.length, new Set(records.map((record) => record.exerciseId)).size);
    for (const record of records) {
      assert.equal(record.type, 'official-exam-exercise');
      assert.equal(record.parentExerciseId, record.exerciseId);
      for (const part of record.parts) {
        const delivery = runtime.materializePart(part, `architecture|${record.exerciseId}|${part.id}`);
        assert.equal(delivery.options.length, 4);
        assert.equal(new Set(delivery.options).size, 4);
        assert.ok(Number.isInteger(delivery.correct));
        assert.ok(delivery.solution.includes('Paso 1.'));
      }
    }
  }
});

test('fixtures reales conservan 2, 3 y más unidades sin dividir el ejercicio padre', () => {
  const fixtures = [
    ['pau-can-ex-38b5899a29494d723706ca4a4e47033d', 2], // matriz · Ordinaria 2012
    ['pau-can-ex-ac6064cbe5f6a1e761b7edcc05313126', 2], // matrices · Extraordinaria 2022
    ['pau-can-ex-5270d63c1d8d838540d918dea08c716c', 3], // sistemas · Reserva 2016
    ['pau-can-ex-c40c8746b996b32e7a046a1e96014004', 2], // función · Reserva 2023
    ['pau-can-ex-bf372ea1c5ad64e801e45dc504237188', 2], // distribución normal
    ['pau-can-ex-0af66fc8d2f417c6f5684e4f750b7710', 2] // integrales
  ];
  const records = [...runtime.challengeRecords('2bach-mates'), ...runtime.challengeRecords('2bach-ccss')];
  for (const [exerciseId, minimumParts] of fixtures) {
    const record = records.find((item) => item.exerciseId === exerciseId);
    assert.ok(record, exerciseId);
    assert.ok(record.parts.length >= minimumParts, exerciseId);
    assert.equal(records.filter((item) => item.exerciseId === exerciseId).length, 1, exerciseId);
  }
});

test('tema, bloque y examen comparten navegación secuencial de subapartados', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const exam = fs.readFileSync(path.join(root, 'bach-exam.js'), 'utf8');
  assert.match(app, /function selectChallengePartAnswer\(partIndex, optionIndex\)/);
  assert.match(app, /function gradeChallengePart\(partIndex\)/);
  assert.match(app, /showChallengePartSolution\(partIndex\)/);
  assert.match(app, /completedParts === question\.parts\.length/);
  assert.match(app, /id="next-btn" style="display:none" onclick="nextQuestion\(\)">Siguiente ejercicio/);
  assert.match(app, /markChallengeQuestionAnswered\(question\)/);
  assert.match(exam, /activePartIndex/);
  assert.match(exam, /Siguiente apartado/);
  assert.match(exam, /question\.partGraded\.every\(Boolean\)/);
});

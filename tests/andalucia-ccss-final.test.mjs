import assert from 'node:assert/strict';
import test from 'node:test';
import { report, records } from '../scripts/audit-andalucia-ccss-final.mjs';

test('CCSS II Andalucía reconcilia los 107 documentos y conserva todas las unidades', () => {
  assert.equal(report.documents.reconciled, 107);
  assert.equal(report.exercises.source, 824);
  assert.equal(report.exercises.enabled, 823);
  assert.equal(report.exercises.blocked, 1);
  assert.equal(report.subparts.lost, 0);
  assert.equal(report.subparts.invariantFailures, 0);
});

test('cada unidad CCSS II tiene respuesta, cuatro opciones distintas y solución', () => {
  assert.equal(report.contracts.missingAnswer, 0);
  assert.equal(report.contracts.invalidOptionSets, 0);
  assert.equal(report.contracts.missingSolution, 0);
  assert.equal(report.contracts.forbiddenPhi, 0);
  assert.equal(report.contracts.positiveLhopital, 0);
});

test('normal y binomial usan exactamente el recurso requerido por cada apartado', () => {
  assert.ok(report.tables.normalParts > 0);
  assert.ok(report.tables.binomialParts > 0);
  assert.equal(report.tables.missingNormal, 0);
  assert.equal(report.tables.extraNormal, 0);
  assert.equal(report.tables.missingBinomial, 0);
  assert.equal(report.tables.extraBinomial, 0);
  assert.equal(report.tables.multipartParentLeaks, 0);
});

test('las Partes I de probabilidad no heredan la tabla normal de la Parte II', () => {
  for (const id of [
    'pau-user-and-57e8f95156df37c91acee2cfa3e3',
    'pau-user-and-77fe4763df72e5235cb28b4f84e3'
  ]) {
    const record = records.find((row) => row.exerciseId === id);
    assert.ok(record, id);
    assert.deepEqual(Array.from(record.parts, (part) => String(part.label)), ['I', 'II']);
    assert.equal(record.parts[0].referenceTable, undefined);
    assert.equal(record.parts[1].referenceTable, 'normal');
    assert.equal(record.referenceTable, undefined);
  }
});

test('el examen CCSS II conserva cuatro posiciones y capacidad no repetitiva', () => {
  assert.equal(report.capacity.examQuestions, 4);
  assert.deepEqual(Object.keys(report.census.byExamSlot), ['1', '2', '3', '4']);
  assert.ok(report.capacity.theoreticalExamCombinations > 0);
  assert.ok(report.capacity.nonRepeatingExamCapacity > 0);
});

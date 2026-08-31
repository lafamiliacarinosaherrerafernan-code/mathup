import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import {baselineRuntime,digest} from '../scripts/prepare-andalucia-inference-delivery.mjs';

const root = path.resolve(import.meta.dirname, '..');

function loadRuntime() {
  const window = {};
  const source = fs.readFileSync(path.join(root, 'data', 'andalucia-pau-runtime.js'), 'utf8');
  vm.runInNewContext(source, { window }, { filename: 'data/andalucia-pau-runtime.js' });
  const corrections = fs.readFileSync(path.join(root, 'data', 'andalucia-global-corrections.js'), 'utf8');
  vm.runInNewContext(corrections, { window }, { filename: 'data/andalucia-global-corrections.js' });
  const gate = fs.readFileSync(path.join(root, 'data', 'andalucia-interactive-delivery-gate.js'), 'utf8');
  vm.runInNewContext(gate, { window }, { filename: 'data/andalucia-interactive-delivery-gate.js' });
  return window.ANDALUCIA_PAU_RUNTIME;
}

const runtime = loadRuntime();
const released=JSON.parse(fs.readFileSync(path.join(root,'artifacts/pau-andalucia-resolution/delivery/enabled-manifest.json'),'utf8'));
const runtimeSource=fs.readFileSync(path.join(root,'data/andalucia-pau-runtime.js'),'utf8');
const historicalRuntimeSource=runtimeSource.replace(/  \/\/ BEGIN USER-SUPPLIED ANDALUCIA SOURCE RECONCILIATION\r?\n[\s\S]*?  \/\/ END USER-SUPPLIED ANDALUCIA SOURCE RECONCILIATION\r?\n\r?\n/,'');
const baselineContext={window:{}};vm.runInNewContext(baselineRuntime(runtimeSource),baselineContext);
const initial=baselineContext.window.ANDALUCIA_PAU_RUNTIME;

test('el corpus actual conserva la entrega histórica y aplica la puerta interactiva sin borrar fuentes', () => {
  assert.equal(released.records.length,released.newlyEnabled);
  assert.equal(released.checks.componentFailures,0);
  assert.equal(released.checks.componentExecutions,4*released.records.length);
  assert.ok(initial.exercises.length > 0);
  assert.ok(runtime.exercises.length >= initial.exercises.length);
  assert.deepEqual([...runtime.interactiveDeliveryBlockedIds], ['pau-can-ex-88fd4c724da14002349a8f59e3c53fcb']);
  const currentIds=new Set(runtime.exercises.map(x=>x.exerciseId));
  assert.ok(released.records.every(x=>currentIds.has(x.exerciseId)));
  assert.equal(runtime.community, 'Andalucía');
  assert.ok(runtime.canonicalTotal >= runtime.publishableTotal);
  assert.equal(runtime.exercises.length, runtime.publishableTotal);
  assert.equal(runtime.interactiveDeliveryBlockedTotal,1);
  assert.ok(runtime.challengeRecords('2bach-mates').length > 0);
  assert.ok(runtime.challengeRecords('2bach-ccss').length > 0);
});

test('materia, comunidad, tema y bloque quedan estrictamente aislados', () => {
  const mates = runtime.challengeRecords('2bach-mates');
  const ccss = runtime.challengeRecords('2bach-ccss');
  assert.ok(mates.every((row) => row.community === 'andalucia' && row.courseId === '2bach-mates'));
  assert.ok(ccss.every((row) => row.community === 'andalucia' && row.courseId === '2bach-ccss'));
  for(const topic of [10,11])assert.ok(runtime.topicRecords('2bach-mates',topic).every(row=>row.topicIndexes.includes(topic)));
  for(const block of ['analisis','algebra'])assert.ok(runtime.blockRecords('2bach-mates',block).every(row=>row.blockId===block));
  assert.ok(runtime.topicRecords('2bach-ccss',8).every(row=>row.topicIndexes.includes(8)));
  assert.ok(runtime.blockRecords('2bach-ccss','probabilidad').every(row=>row.blockId==='probabilidad'));
  assert.ok(runtime.blockRecords('2bach-ccss','estadistica').every(row=>row.blockId==='estadistica'));
});

test('retos y exámenes conservan cada ejercicio padre con todos sus subapartados', () => {
  const historicalStructure = {
    '2bach-mates': {
      labels: ['Álgebra', 'Límites, continuidad y derivadas', 'Integrales', 'Geometría', 'Probabilidad y estadística'],
      counts: [1,2,3,4,5].map(slot=>runtime.examSlotRecords('2bach-mates',slot).length)
    },
    '2bach-ccss': {
      labels: ['Matrices', 'Sistemas y programación lineal', 'Análisis', 'Probabilidad o estadística'],
      counts: [1,2,3,4].map(slot=>runtime.examSlotRecords('2bach-ccss',slot).length)
    }
  };

  for (const [courseId, expected] of Object.entries(historicalStructure)) {
    const challenges = runtime.challengeRecords(courseId);
    assert.ok(challenges.every((row) => row.type === 'official-exam-exercise' && row.parts.length >= 1));
    assert.equal(new Set(challenges.map((row) => row.exerciseId)).size, challenges.length);
    for (const record of challenges) {
      const canonical = runtime.exercises.find((exercise) => exercise.exerciseId === record.exerciseId);
      assert.ok(canonical);
      assert.deepEqual(record.parts.map((part) => part.id), canonical.parts.map((part) => part.id));
    }
    const slots = expected.labels.map((_, index) => runtime.examSlotRecords(courseId, index + 1));
    assert.deepEqual(slots.map((rows) => rows.length), expected.counts);
    assert.ok(slots.every((rows) => rows.length >= 1));
    assert.deepEqual(slots.map((rows) => rows[0].examFamilyLabel.replace(/^Ejercicio \d+ · /, '')), expected.labels);
  }
  const whole = runtime.challengeRecords('2bach-mates').find((row) => row.exerciseId === 'pau-can-ex-4a1d7a5b14de49c1a545b0a194bd33fc');
  assert.equal(whole?.type, 'official-exam-exercise');
  assert.equal(whole?.parts[0]?.label, '');
  assert.equal(runtime.examSlotRecords('2bach-ccss', 5).length, 0);
});

test('cada entrega contiene cuatro opciones únicas, una respuesta correcta y solución completa', () => {
  for (const record of [...runtime.challengeRecords('2bach-mates'), ...runtime.challengeRecords('2bach-ccss')]) {
    for (const part of record.parts) {
      const delivery = runtime.materializePart(part, 'student|attempt-1');
      assert.equal(delivery.options.length, 4);
      assert.equal(new Set(delivery.options).size, 4);
      assert.equal(delivery.options[delivery.correct], part.semanticAnswer);
      assert.match(delivery.solution, /Paso 1\./);
      assert.match(delivery.solution, /Resultado final\./);
      assert.equal(delivery.deliveryTrace.deterministic, true);
    }
  }
});

test('el barajado es reproducible por intento y distribuye la correcta entre A/B/C/D', () => {
  const part = runtime.challengeRecords('2bach-ccss')[0].parts[0];
  const first = runtime.materializePart(part, 'same-attempt');
  const second = runtime.materializePart(part, 'same-attempt');
  assert.deepEqual(first.options, second.options);
  assert.equal(first.correct, second.correct);

  const counts = [0, 0, 0, 0];
  for (let index = 0; index < 400; index += 1) {
    counts[runtime.materializePart(part, `attempt-${index}`).correct] += 1;
  }
  assert.ok(counts.every((count) => count >= 70), `distribución insuficiente: ${counts.join('/')}`);
  assert.ok(Math.max(...counts) - Math.min(...counts) <= 45, `distribución desequilibrada: ${counts.join('/')}`);
});

test('el contenido entregable no expone puntuaciones PAU, JSON crudo ni identificadores internos', () => {
  for (const record of [...runtime.challengeRecords('2bach-mates'), ...runtime.challengeRecords('2bach-ccss')]) {
    for (const part of record.parts) {
      const delivery = runtime.materializePart(part, 'privacy-check');
      const visible = [record.text, part.text, ...delivery.options, delivery.solution].join('\n');
      assert.doesNotMatch(visible, /\(\s*\d+(?:[,.]\d+)?\s*puntos?\s*\)/i);
      assert.doesNotMatch(visible, /sourceRecordId|documentHash|questionKey|scoreEvidence/i);
      assert.doesNotMatch(visible, /^\s*[\[{].*[\]}]\s*$/s);
    }
  }
});

test('la aplicación carga la capa paralela y evita mezclar Andalucía con bancos heredados', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const exam = fs.readFileSync(path.join(root, 'bach-exam.js'), 'utf8');
  assert.match(html, /data\/andalucia-pau-runtime\.js/);
  assert.match(app, /\["madrid",\s*"andalucia"\]\.includes\(currentBachPauCommunity\(\)\)/);
  assert.match(app, /Pendiente de validación/);
  assert.match(app, /if \(courseId === "2bach-ccss"\) return 4;/);
  assert.match(exam, /ANDALUCIA_PAU_RUNTIME\?\.examSlotRecords/);
  assert.match(exam, /ANDALUCIA_PAU_RUNTIME[\s\S]*materializePart/);
  assert.match(exam, /course\.id === "2bach-ccss" \? \[1, 2, 3, 4\] : \[1, 2, 3, 4, 5\]/);
});

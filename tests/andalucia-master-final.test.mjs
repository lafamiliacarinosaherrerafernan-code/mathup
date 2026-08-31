import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import '../math-renderer.js';

const root = path.resolve(import.meta.dirname, '..');
const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/pau-statistical-resources.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const sources = context.window.ANDALUCIA_USER_SOURCE_INDEX;
const resources = context.window.PAU_STATISTICAL_RESOURCES;
const audit = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/andalucia-master-final/audit-summary.json'), 'utf8'));
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

test('inventario oficial: 110 Matemáticas II + 107 CCSS II y una tabla auxiliar excluida', () => {
  const rows = Object.values(sources);
  assert.equal(new Set(rows.filter((row) => row.subject === '2_bach_mates_ii').map((row) => row.fileName)).size, 110);
  assert.equal(new Set(rows.filter((row) => row.subject === '2_bach_ccss_ii').map((row) => row.fileName)).size, 107);
  assert.equal(audit.sourceDocuments.excludedStatisticalResources, 1);
  assert.equal(runtime.exercises.length, 1641);
});

test('todo ejercicio habilitado conserva paridad y contrato interactivo', () => {
  assert.equal(audit.enabledParityFailures, 0);
  assert.equal(audit.enabledQualityFailures, 0);
  for (const courseId of ['2bach-mates', '2bach-ccss']) {
    for (const record of runtime.challengeRecords(courseId)) {
      assert.ok(record.parts?.length);
      for (const part of record.parts) {
        assert.ok(String(part.semanticAnswer || '').trim());
        assert.equal(part.distractors?.length, 3);
        assert.equal(new Set([part.semanticAnswer, ...part.distractors].map((value) => String(value).replace(/\s+/g, ' ').trim())).size, 4);
        assert.ok(part.solutionSteps?.length >= 3);
        assert.ok(part.verification?.verified || record.resolutionEvidence);
      }
    }
  }
});

test('Andalucía no mezcla bancos temáticos auxiliares con su corpus PAU oficial', () => {
  assert.match(appSource, /currentBachPauCommunity\(\) !== "andalucia"/);
  assert.equal(runtime.challengeRecords('2bach-mates').length, 817);
  assert.equal(runtime.challengeRecords('2bach-ccss').length, 823);
});

test('taxonomías independientes y etiqueta visible de sistemas', () => {
  const mates = new Set(runtime.challengeRecords('2bach-mates').map((row) => row.primaryTopicIndex));
  const ccss = new Set(runtime.challengeRecords('2bach-ccss').map((row) => row.primaryTopicIndex));
  assert.deepEqual([...mates].sort((a, b) => a - b), Array.from({ length: 14 }, (_, index) => index));
  assert.deepEqual([...ccss].sort((a, b) => a - b), [0, 2, 3, 4, 5, 7, 8, 9, 10]);
  assert.ok(runtime.challengeRecords('2bach-mates').filter((row) => row.primaryTopicIndex === 2).every((row) => row.primaryTopic === 'Resolución de sistemas con determinantes'));
});

test('examen usa cinco posiciones en Matemáticas II y cuatro en CCSS II', () => {
  for (let slot = 1; slot <= 5; slot += 1) assert.ok(runtime.examSlotRecords('2bach-mates', slot).length > 0);
  for (let slot = 1; slot <= 4; slot += 1) assert.ok(runtime.examSlotRecords('2bach-ccss', slot).length > 0);
  assert.equal(runtime.examSlotRecords('2bach-ccss', 5).length, 0);
});

test('recursos estadísticos respetan la política por comunidad', () => {
  assert.equal(resources.NORMAL_STANDARD_TABLE.page, 1);
  assert.equal(resources.BINOMIAL_TABLE.page, 1);
  assert.equal(resources.NORMAL_STANDARD_TABLE.policy.andalucia, 'DROPDOWN');
  assert.equal(resources.NORMAL_STANDARD_TABLE.policy.madrid, 'DROPDOWN');
  assert.equal(resources.NORMAL_STANDARD_TABLE.policy.clm, 'LOCAL_EXERCISE_TABLE');
  assert.match(appSource, /data-resource-id/);
  assert.match(appSource, /Consultar \$\{label\.toLowerCase\(\)\}/);
  assert.match(appSource, /function renderPauReferenceTable\(question, part = null\)/);
  assert.match(appSource, /part\?\.referenceTable \|\| question\?\.referenceTable/);
  const examSource = fs.readFileSync(path.join(root, 'bach-exam.js'), 'utf8');
  assert.match(examSource, /renderPauReferenceTable\(question, part\)/);
  assert.match(examSource, /renderPauReferenceTable\(question, sequential \? question\.parts\[activePartIndex\] : null\)/);
});

test('CCSS II no aplica L’Hôpital y las menciones negativas se toleran', () => {
  for (const row of runtime.challengeRecords('2bach-ccss')) {
    const solution = row.parts.flatMap((part) => part.solutionSteps || []).join('\n');
    if (!/L[’']?H[oô]pital/i.test(solution)) continue;
    assert.match(solution, /(?:no\s+(?:se\s+)?(?:usa|usamos|aplica|aplicamos)|sin\s+(?:usar|aplicar))\s+L[’']?H[oô]pital/i);
  }
});

test('renderiza número y unidad como bloque indivisible y sin token interno visible', () => {
  const html = globalThis.MargaritaMathRenderer.text('El resultado es 64 kg y 25 kg/m².');
  assert.match(html, /math-value-unit/);
  assert.doesNotMatch(html.replace(/<[^>]+>/g, ''), /frac\{|matrix\{|system\{/i);
});

test('selector por bloques mantiene estratificación y no repetición canónica', () => {
  assert.match(appSource, /function buildCcssIIBlockQuestions/);
  assert.match(appSource, /function buildMatesIIBlockQuestions/);
  assert.match(appSource, /function selectNoRepeatQuestionRound/);
  assert.match(appSource, /canonical/i);
});

test('regresiones documentales corregidas conservan apartados y matrices verificadas', () => {
  const byId = new Map(runtime.exercises.map((row) => [row.exerciseId, row]));
  assert.equal(JSON.stringify(byId.get('pau-user-and-a2399d7ce20cc304ff589d5743a8').parts.map((part) => part.label)), JSON.stringify(['a)', 'b)', 'c)']));
  assert.equal(JSON.stringify(byId.get('pau-user-and-eb0dd390d6f48d86d0d3793419de').parts.map((part) => part.label)), JSON.stringify(['a)', 'b)', 'c)', 'd)']));
  assert.equal(byId.get('pau-user-and-2d24fc052b2f090732a36320d027').parts[0].semanticAnswer.includes('F·C=−9'), true);
  assert.equal(byId.get('pau-user-and-811c534e78c560165a5ca0d0ea4f').parts[1].semanticAnswer, 'X=[[3,0],[−4/3,1/3]].');
});

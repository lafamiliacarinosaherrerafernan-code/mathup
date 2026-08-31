import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
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

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;

test('auditoría exhaustiva de sistemas y programación lineal de Andalucía', () => {
  const output = execFileSync(process.execPath, ['scripts/audit-andalucia-systems-linear-phase2x.mjs', 'test-regression'], {
    encoding: 'utf8'
  });
  const summary = JSON.parse(output);
  assert.equal(summary.totalEnabledExercises, 1640);
  assert.equal(summary.bySubject['2_bach_mates_ii'].enabledExercises, 817);
  assert.equal(summary.bySubject['2_bach_ccss_ii'].enabledExercises, 823);
  assert.equal(summary.bySubject['2_bach_mates_ii'].failedExercises, 0);
  assert.equal(summary.bySubject['2_bach_ccss_ii'].failedExercises, 0);
  assert.deepEqual(summary.failureCounts, {});
});

test('el caso de control conserva una llave, dos filas y su solución correcta', () => {
  const exercise = runtime.exercises.find((item) => item.exerciseId === 'pau-user-and-6d53c7e0004e9b48abada6311bb6');
  assert.ok(exercise);
  assert.match(exercise.learnerStatement, /system\{2x−y\+3z=1;x\+2y−z=2\}/);
  assert.equal((exercise.learnerStatement.match(/system\{/g) || []).length, 1);
  assert.equal(exercise.parts.find((part) => part.id.endsWith(':a')).semanticAnswer, 'a=8.');
  assert.equal(exercise.parts.find((part) => part.id.endsWith(':b')).semanticAnswer, '(x,y,z)=(6/5,1/5,−2/5).');
});

test('programación lineal usa la tarea principal, gráfica y tabla de vértices', () => {
  const records = runtime.exercises.filter((exercise) => exercise.subject === '2_bach_ccss_ii'
    && exercise.primaryTopic === 'Programación lineal');
  assert.equal(records.length, 49);
  for (const exercise of records) {
    const solution = (exercise.parts || []).flatMap((part) => part.solutionSteps || []).join('\n');
    assert.ok((exercise.parts || []).some((part) => part.solutionMathOptions?.solutionGraph?.src), exercise.exerciseId);
    assert.match(solution, /recta(?:s)? frontera|regi[oó]n factible|v[eé]rtices/i, exercise.exerciseId);
    assert.match(solution, /tabla de evaluaci[oó]n/i, exercise.exerciseId);
  }
});

test('Reserva 2009 conserva la cota oficial y≤5/4', () => {
  const exercise = runtime.exercises.find((item) => item.exerciseId === 'pau-user-and-8b6ba4014dfdb7349b245803a88f');
  assert.ok(exercise);
  assert.match((exercise.parts || []).flatMap((part) => part.solutionSteps || []).join('\n'), /y≤5\/4/);
});

test('las skills fijan la paridad estructural y el método gráfico', () => {
  const solutionSkill = fs.readFileSync('.agents/skills/solucion-de-ejercicios/SKILL.md', 'utf8');
  const editorSkill = fs.readFileSync('C:/Users/aherr/.codex/skills/skill-editor-enunciados/SKILL.md', 'utf8');
  const classification = fs.readFileSync('C:/Users/aherr/.codex/skills/skill-editor-enunciados/references/clasificacion.md', 'utf8');
  assert.match(solutionSkill, /fuente, el can[oó]nico, el runtime y el DOM/);
  assert.match(solutionSkill, /tabla expl[ií]cita `v[eé]rtice \| valor`/);
  assert.match(editorSkill, /paridad estructural `fuente = can[oó]nico = runtime = DOM`/);
  assert.match(classification, /Programaci[oó]n lineal en CCSS II/);
});

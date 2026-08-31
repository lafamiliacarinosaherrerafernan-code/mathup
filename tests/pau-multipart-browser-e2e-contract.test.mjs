import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const runner = fs.readFileSync(path.join(root, 'tools/pau-multipart-e2e/bootstrap.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('el puente E2E solo está disponible en localhost con activación explícita', () => {
  assert.match(app, /function isMultipartBrowserE2EMode\(\)/);
  assert.match(app, /\["127\.0\.0\.1", "localhost"\]/);
  assert.match(app, /searchParams\.get\("multipart-e2e"\) === "1"/);
  assert.match(index, /tools\/pau-multipart-e2e\/bootstrap\.js/);
});

test('la regresión recorre botones reales y registra identidad por transición', () => {
  assert.match(runner, /optionButtons\[expected\.correct\]\.click\(\)/);
  assert.match(runner, /grade\.click\(\)/);
  assert.match(runner, /helpButton\.click\(\)/);
  assert.match(runner, /next\.click\(\)/);
  assert.match(runner, /document\.querySelectorAll\('\.exercise-part'\)/);
  assert.match(runner, /visibleSubpartCount = partRoots\.length/);
  assert.match(runner, /exerciseId: partRoot\.dataset\.exerciseId/);
  assert.match(runner, /subpartId: partRoot\.dataset\.subpartId/);
  assert.match(runner, /subpartIndex: Number\(partRoot\.dataset\.subpartIndex\)/);
});

test('la regresión contiene todos los gates y el control conocido de 2024', () => {
  for (const category of [
    'SUBPART_MISSING', 'SUBPART_NOT_NAVIGABLE', 'SOURCE_MISMATCH', 'OPTION_COUNT_ERROR',
    'CORRECT_ANSWER_ERROR', 'SOLUTION_MISSING', 'SOLUTION_WRONG_SUBPART', 'MATH_RENDER_ERROR', 'NAVIGATION_ERROR'
  ]) assert.match(runner, new RegExp(category));
  assert.match(runner, /pau-can-ex-9cc5279a14173d07c6b4bde3b47ba813/);
  assert.match(runner, /Siguiente ejercicio/);
  assert.match(runner, /TOTAL_SOURCE_SUBPARTS/);
  assert.match(runner, /TOTAL_VISIBLE_SUBPARTS/);
  assert.match(runner, /TOTAL_NAVIGATED_SUBPARTS/);
});

test('el ejecutor queda parametrizado por comunidad y materia', () => {
  assert.match(runner, /searchParams\.get\("community"\)/);
  assert.match(runner, /2bach-mates,2bach-ccss/);
  assert.match(app, /registerProvider\(community, provider\)/);
  assert.match(app, /nativeRuntimeFor = \(community, courseId\)/);
  assert.match(app, /sourceMode: "runtime-structural"/);
  assert.match(runner, /rendererOnly = row\.sourceMode === "runtime-structural"/);
  assert.match(runner, /includeSingle: Boolean\(onlyExercise\)/);
  assert.match(runner, /includeSingle: item\.runtimePartCount === 1/);
});

test('las tres comunidades comparten renderer multiparte visible y corrección por apartado', () => {
  assert.doesNotMatch(app, /isSequentialPauQuestion|nextChallengeSubpart|activeSubpartIndex/);
  assert.match(app, /displayedPartEntries = \(question\.parts \|\| \[\]\)\.map/);
  assert.match(app, /id="part-grade-\$\{partIndex\}"/);
  assert.match(app, /gradeChallengePart\(\$\{partIndex\}\)/);
  assert.match(app, /id="part-solution-\$\{partIndex\}"/);
  assert.match(app, />Siguiente ejercicio<\/button>/);
});

import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const exam = fs.readFileSync(new URL('../bach-exam.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');

test('la preferencia PAU tiene una única fuente de verdad persistente y bloqueada durante actividades', () => {
  assert.match(app, /const BACH_II_PAU_COMMUNITY_KEY = "margarita-bach-ii-pau-community-v1"/);
  assert.match(app, /state\.bachExam\?\.pauCommunity\s*\|\| state\.challengePauCommunity\s*\|\| state\.pauCommunity/);
  assert.match(app, /if \(state\.bachExam \|\| state\.challengePauCommunity\) return;/);
  assert.match(app, /preferences\[bachPauCommunityPreferenceKey\(\)\] = community/);
  assert.match(app, /state\.challengePauCommunity = selectedBachPauCommunity\(\)/);
  assert.match(exam, /pauCommunity: examPauCommunity/);
});

test('solo hay un selector editable en cada encabezado general y ninguno dentro de las tarjetas o bloques', () => {
  const calls = [...app.matchAll(/bachPauCommunityControl\(([^)]*)\)/g)].map((match) => match[1]);
  assert.deepEqual(calls, ['destination = "home"', '"home"']);
  assert.doesNotMatch(app, /bach-pau-card-actions[^\n]*bachPauCommunityControl/);
  assert.match(app, /BACH_II_COURSE_IDS\.includes\(course\.id\) \? bachPauCommunityBadge\(\) : ""/);
  assert.match(app, /aria-label="Comunidad PAU activa"/);
  assert.match(app, /<option value="\$\{value\}" \$\{selected === value \? "selected" : ""\}>/);
});

test('temas, bloques, retos y examen muestran la PAU capturada por la actividad', () => {
  assert.match(app, /bachPauCommunityBadge\(\)/);
  assert.match(app, /challenge-title-pau[^]*PAU \$\{escapeHtml\(BACH_II_PAU_COMMUNITIES\[currentBachPauCommunity\(\)\]\)\}/);
  assert.match(exam, /data-pau-region="\$\{escapeHtml\(currentPauCommunity\(\)\)\}"/);
  assert.match(exam, /PAU · \$\{escapeHtml\(BACH_II_PAU_COMMUNITIES\[currentPauCommunity\(\)\]\)\}/);
  assert.match(exam, /<span class="badge exam-mode-badge">Examen<\/span>/);
});

test('la comunidad y la materia se filtran antes de iniciar retos o exámenes', () => {
  assert.match(app, /function pauExerciseMatchesContext\(exercise, courseId = state\.courseId, region = currentBachPauCommunity\(\)\)/);
  assert.match(app, /if \(exerciseRegion !== normalizeBachPauCommunity\(region\)\) return false/);
  assert.match(app, /return !exerciseCourseId \|\| exerciseCourseId === courseId/);
  assert.match(app, /questions\.some\(\(item\) => !pauExerciseMatchesContext\(item, course\.id, currentBachPauCommunity\(\)\)\)/);
  assert.match(exam, /if \(!questionMatchesPauContext\(question, courseId\)\) return false/);
  assert.match(exam, /questions\.some\(\(question\) => !questionMatchesPauContext\(question, course\.id, examPauCommunity\)\)/);
  assert.match(exam, /const questions = examSlots[^]*\.map\(\(slot\) => chooseWithoutRepeating/);
});

test('los retos por bloques filtran antes de equilibrar y usan un único ciclo global', () => {
  assert.match(app, /function ccssIIBlockQuestionMatchesScope\(question, blockId, selectedTopics\)/);
  assert.match(app, /question\?\.blockId !== blockId/);
  assert.match(app, /\.filter\(\(question\) => ccssIIBlockQuestionMatchesScope\(question, blockId, selectedTopics\)\)/);
  assert.match(app, /\$\{state\.courseId\}\|bloque-\$\{blockId\}\|global/);
  assert.match(app, /\$\{selectionSeed\}\|global/);
  assert.match(app, /\{ groupOf \}/);
  assert.doesNotMatch(app, /bloque-\$\{blockId\}\|relleno-seguro/);
  assert.match(app, /los últimos inéditos[^]*antes que el primer ejercicio del ciclo nuevo/);
});

test('las familias del examen son preferencias dentro del ciclo global de cada posición', () => {
  assert.match(exam, /chooseFromExamPoolWithoutRepeating\(courseId, slot, seed, preferredPool, completePool\)/);
  assert.match(exam, /function chooseFromExamPoolWithoutRepeating\(courseId, slot, seed, pool, cyclePool = pool\)/);
  assert.match(exam, /const preferredAvailable = pool\.filter/);
  assert.match(exam, /const selectionPool = preferredAvailable\.length \? preferredAvailable : available/);
});

test('la estructura del examen permanece en cinco ejercicios para Matemáticas II y cuatro para CCSS II', () => {
  assert.match(app, /const examQuestionCount = course\.id === "2bach-ccss" \? 4 : 5/);
  assert.match(exam, /const examSlots = course\.id === "2bach-ccss" \? \[1, 2, 3, 4\] : \[1, 2, 3, 4, 5\]/);
  assert.match(exam, /renderPauReferenceTable\(question, sequential \? question\.parts\[activePartIndex\] : null\)/);
});

test('selector y encabezado de examen tienen reglas responsive y accesibles', () => {
  assert.doesNotMatch(app, /class="dashboard-student"/);
  assert.match(css, /\.bach-pau-global-selector\s*\{/);
  assert.match(css, /\.pau-exam-header\s*\{/);
  assert.match(css, /@media \(max-width: 760px\)[^]*\.pau-exam-header/);
  assert.match(css, /@media \(max-width: 420px\)[^]*\.exam-compact-toolbar/);
  assert.match(exam, /<h1>Examen<\/h1>/);
  assert.match(exam, /class="exam-compact-toolbar"/);
  assert.match(css, /\.bach-pau-global-selector select:focus-visible/);
});

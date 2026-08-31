import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import '../math-renderer.js';

const render = globalThis.MargaritaMathRenderer;

function andaluciaRuntime() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('data/andalucia-user-source-index.js', 'utf8'), context);
  vm.runInContext(fs.readFileSync('data/andalucia-pau-runtime.js', 'utf8'), context);
  vm.runInContext(fs.readFileSync('data/andalucia-global-corrections.js', 'utf8'), context);
  vm.runInContext(fs.readFileSync('data/andalucia-interactive-delivery-gate.js', 'utf8'), context);
  return context.window.ANDALUCIA_PAU_RUNTIME;
}

test('la función a trozos de Matemáticas II 2018 conserva sus dos ramas oficiales', () => {
  const literal = 'f(x)=piecewise{√(ax) si 0≤x≤8;frac{x²−32}{x−4} si x>8}';
  const html = render.text(literal);
  assert.equal((html.match(/class="math-piecewise"/g) || []).length, 1);
  assert.equal((html.match(/<small>si /g) || []).length, 2);
  assert.match(html, /class="math-root"/);
  assert.match(html, /class="math-fraction"/);
  assert.match(html, /0≤x≤8/);
  assert.match(html, /x&gt;8/);
  assert.doesNotMatch(html, /piecewise\{|\}\s*es continua/);
});

test('todas las funciones piecewise canónicas andaluzas se renderizan como estructura', () => {
  const records = andaluciaRuntime().exercises.filter((record) => /\bpiecewise\s*\{/i.test(record.learnerStatement || ''));
  assert.ok(records.length > 0);
  for (const record of records) {
    const html = render.text(record.learnerStatement);
    assert.match(html, /class="math-piecewise"/, record.exerciseId);
    assert.doesNotMatch(html, /\bpiecewise\s*\{/, record.exerciseId);
  }
});

test('las etiquetas permanecen unidas a matrices, sistemas, fracciones y piecewise', () => {
  for (const literal of [
    'A = matrix{1,2;3,4}',
    'r = system{x=1+t;y=2−t;z=3}',
    'f(x) = frac{x²+a}{x−b}',
    'f(x) = piecewise{x si x≤0;x² si x>0}'
  ]) {
    const html = render.text(literal);
    assert.match(html, /(?:=&nbsp;|=<\/span>&nbsp;)<span class="math-(?:matrix|system|fraction|piecewise)/, literal);
  }
});

test('una fracción al final de la última ecuación conserva sus dos llaves', () => {
  const html = render.text('system{mx+2y−z=1;5x−4y+2z=0;x+3my=m+frac{2}{5}}');
  assert.match(html, /class="math-system /);
  assert.match(html, /class="math-fraction"/);
  assert.doesNotMatch(html, /frac\{|\}\s*$/);
});

test('los sistemas lineales autónomos se apilan con una sola llave', () => {
  const html = render.text('kx+2y=2, 2x+ky=k, x−y=−1');
  assert.equal((html.match(/class="math-system /g) || []).length, 1);
  assert.equal((html.match(/class="math-system-brace"/g) || []).length, 1);
  assert.equal((html.match(/math-system-lines"><span>/g) || []).length, 1);
  assert.doesNotMatch(html, /\\\(|\\\)|\\begin/);
});

test('la regla atómica mantiene estructuras completas y sistemas inline', () => {
  const css = fs.readFileSync('math-notation.css', 'utf8');
  assert.match(css, /\.math-matrix,[\s\S]*\.math-integral\s*\{[\s\S]*white-space:\s*nowrap/);
  assert.match(css, /\.question-text \.math-system\s*\{[\s\S]*display:\s*inline-flex/);
  assert.match(css, /\.integral-sign\s*\{[\s\S]*font-weight:\s*400/);
  assert.match(css, /\.integral-bounds\s*\{[\s\S]*text-align:\s*center/);
  assert.doesNotMatch(render.text('La opción es \\(k\\).'), /\\\(|\\\)/);
});

test('las skills generales fijan fidelidad, apartados y composición atómica', () => {
  const solutionSkill = fs.readFileSync('.agents/skills/solucion-de-ejercicios/SKILL.md', 'utf8');
  const editorSkill = fs.readFileSync('C:/Users/aherr/.codex/skills/skill-editor-enunciados/SKILL.md', 'utf8');
  assert.match(solutionSkill, /documento → ejercicio canónico → ejercicio mostrado/);
  assert.match(solutionSkill, /etiqueta \+ signo igual \+ objeto matemático/);
  assert.match(solutionSkill, /apartado que no admita cuatro opciones se conserva/);
  assert.match(editorSkill, /apartados originales[\s\S]*apartados canónicos[\s\S]*apartados interactivos/);
  assert.match(editorSkill, /primaryTopic.*secondaryTopics\[\]/s);
});

test('la skill exige menores visibles, adjunta directa y punto genérico explicado', () => {
  const skill = fs.readFileSync('.agents/skills/solucion-de-ejercicios/SKILL.md', 'utf8');
  assert.match(skill, /Desarrollo por una fila o columna[\s\S]*elemento × menor complementario/);
  assert.match(skill, /construir directamente `Adj\(B\)` como una matriz[\s\S]*No crear ni nombrar una fase separada de cofactores/i);
  assert.match(skill, /Sea C un punto genérico de la recta/);
  assert.match(skill, /Cambios de variable en integrales[\s\S]*transformar por separado cada límite/);
});

test('tema y bloque separan selección, corrección, solución y avance', () => {
  const app = fs.readFileSync('app.js', 'utf8');
  const exam = fs.readFileSync('bach-exam.js', 'utf8');
  assert.match(app, /onclick="selectChallengeAnswer\(/);
  assert.match(app, /onclick="selectChallengePartAnswer\(/);
  assert.match(app, /id="grade-btn" disabled onclick="gradeChallengeQuestion\(\)"/);
  assert.match(app, /function gradeChallengeQuestion\(\)[\s\S]*showSolutionHelp\(\)/);
  assert.match(app, /state\.selectedAnswer = null;[\s\S]*state\.multipartSelections = \[\];[\s\S]*renderStudy\(\);/);
  assert.match(exam, /question\.graded = true;\s*question\.showSolutions = true;/);
});

test('la tabla normal andaluza usa el recurso aportado sin contarlo como examen', () => {
  const app = fs.readFileSync('app.js', 'utf8');
  const resources = fs.readFileSync('data/pau-statistical-resources.js', 'utf8');
  const resource = 'documentos/PAU Comunidades/Andalucía/CCSS II/Tabla función distribuón normal.pdf';
  assert.ok(fs.existsSync(resource));
  assert.match(app, /PAU_STATISTICAL_RESOURCES/);
  assert.ok(resources.includes(resource));
});

test('el filtro general retira respuestas OCR y soluciones de relleno de las tres modalidades', () => {
  const runtime = andaluciaRuntime();
  const filler = /Paso\s*\d+\s*:\s*desarrollo contrastado|Se identifican los datos y las condiciones|Se aplica el procedimiento correspondiente/i;
  assert.equal(runtime.interactiveDeliveryBlockedTotal, 1);
  assert.deepEqual(Array.from(runtime.documentaryDeliveryBlockedIds || []), ['pau-can-ex-88fd4c724da14002349a8f59e3c53fcb']);
  for (const courseId of ['2bach-mates', '2bach-ccss']) {
    for (const record of runtime.challengeRecords(courseId)) {
      assert.ok(record.parts.every((part) => part.semanticAnswer.length <= 360));
      assert.ok(record.parts.every((part) => !part.solutionSteps.some((step) => filler.test(step))));
    }
    for (const slot of [1, 2, 3, 4, 5]) {
      assert.ok(runtime.examSlotRecords(courseId, slot).every((record) => !runtime.interactiveDeliveryBlockedIds.includes(record.exerciseId)));
    }
  }
});

test('el censo de 217 archivos registra apartados y desacuerdos temáticos', () => {
  const summary = JSON.parse(fs.readFileSync('artifacts/andalucia-global-correction/summary.json', 'utf8'));
  assert.equal(summary.suppliedDocuments, 217);
  assert.equal(summary.runtimeExercises, 1641);
  assert.equal(summary.runtimeParts, 3404);
  assert.ok(summary.partAudit.MATCH > 0);
  assert.ok(summary.partAudit.OMITTED_OR_FUSED_PARTS > 0);
  assert.ok(summary.classificationAudit.DISAGREEMENT > 0);
  assert.ok(fs.statSync('artifacts/andalucia-global-correction/file-exercise-part-counts.jsonl').size > 0);
  assert.ok(fs.statSync('artifacts/andalucia-global-correction/classification-comparison.jsonl').size > 0);
});

test('la reconciliación maestra sustituye el detector histórico de apartados', () => {
  const runtime = andaluciaRuntime();
  const audit = JSON.parse(fs.readFileSync('artifacts/andalucia-master-final/audit-summary.json', 'utf8'));
  assert.equal(audit.enabledParityFailures, 0);
  assert.equal(audit.enabledQualityFailures, 0);
  assert.equal(runtime.interactiveDeliveryBlockedTotal, 1);
  assert.deepEqual(Array.from(runtime.documentaryDeliveryBlockedIds || []), ['pau-can-ex-88fd4c724da14002349a8f59e3c53fcb']);
});

test('las reclasificaciones de alta confianza se aplican a tema y bloque', () => {
  const runtime = andaluciaRuntime();
  assert.ok(runtime.globalClassificationCorrectionTotal > 0);
  for (const courseId of ['2bach-mates', '2bach-ccss']) {
    for (const record of runtime.challengeRecords(courseId)) {
      if (!record.classificationCorrection) continue;
      assert.equal(JSON.stringify(record.topicIndexes), JSON.stringify([record.classificationCorrection.topicIndex]));
      assert.equal(record.primaryTopic, record.classificationCorrection.primaryTopic);
    }
  }
});

test('Probabilidad y Distribuciones de Matemáticas II conservan bancos entregables', () => {
  const runtime = andaluciaRuntime();
  assert.ok(runtime.topicRecords('2bach-mates', 12).length > 0);
  assert.ok(runtime.topicRecords('2bach-mates', 13).length > 0);
});

test('todo ejercicio entregable de Matemáticas II pertenece al menos a uno de los 14 temas', () => {
  const runtime = andaluciaRuntime();
  const records = runtime.challengeRecords('2bach-mates');
  assert.ok(records.length > 0);
  for (const record of records) {
    assert.ok(Array.isArray(record.topicIndexes) && record.topicIndexes.some((index) => Number.isInteger(index) && index >= 0 && index < 14), record.exerciseId);
  }
});

test('un tema escaso de Matemáticas II sigue disponible sin rellenarse con otra materia', () => {
  const app = fs.readFileSync('app.js', 'utf8');
  assert.match(app, /course\.id === "2bach-mates" \? available === 0 : available < questionCount/);
  assert.match(app, /available === 0 \|\| \(course\.id !== "2bach-mates" && available < requested\)/);
});

test('el selector por bloques de Matemáticas II reserva variedad antes de completar el reto', () => {
  const app = fs.readFileSync('app.js', 'utf8');
  const selector = app.slice(app.indexOf('function buildMatesIIBlockQuestions'), app.indexOf('function seededShuffle'));
  assert.match(selector, /const groupOf = \(question\) =>/);
  assert.match(selector, /selectNoRepeatQuestionRound\([\s\S]*\{ groupOf \}/);
  assert.match(selector, /selectedBlockTopicIndex: groupOf\(question\)/);
});

test('cada tema primario de Matemáticas II permanece en su bloque matemático', () => {
  const runtime = andaluciaRuntime();
  const allowed = {
    algebra: new Set([0, 1, 2]),
    geometria: new Set([3, 4, 5]),
    analisis: new Set([6, 7, 8, 9, 10, 11]),
    'probabilidad-estadistica': new Set([12, 13])
  };
  for (const [blockId, records] of Object.entries(runtime.banks('2bach-mates'))) {
    for (const record of records) assert.ok(allowed[blockId]?.has(record.primaryTopicIndex), `${blockId}:${record.exerciseId}:${record.primaryTopicIndex}`);
  }
});

test('ninguna discusión paramétrica entregada omite rangos y Rouché-Frobenius', () => {
  const runtime = andaluciaRuntime();
  for (const courseId of ['2bach-mates', '2bach-ccss']) {
    for (const record of runtime.challengeRecords(courseId)) {
      for (const part of record.parts) {
        if (!/(?:disc[uú]t\w*|seg[uú]n los valores).*sistema|sistema.*(?:par[aá]metro|disc[uú]t\w*)/i.test(part.text || '')) continue;
        const solution = (part.solutionSteps || []).join('\n');
        assert.match(solution, /Rouch[eé]|Rouché/i, record.exerciseId);
        assert.match(solution, /menor\s+(?:de\s+)?orden\s*2/i, record.exerciseId);
      }
    }
  }
});

test('la entrega renderizada no expone delimitadores ni comandos internos', () => {
  const runtime = andaluciaRuntime();
  const forbidden = /\\\(|\\\)|\\\[|\\\]|\\begin\{|\\end\{|\b(?:matrix|system|piecewise|cases|frac|sqrt)\s*\{/i;
  for (const courseId of ['2bach-mates', '2bach-ccss']) {
    for (const record of runtime.challengeRecords(courseId)) {
      for (const value of [record.text, ...record.parts.flatMap((part) => [part.text, part.semanticAnswer, ...part.distractors, ...part.solutionSteps])]) {
        assert.doesNotMatch(render.text(value || ''), forbidden, record.exerciseId);
      }
    }
  }
});

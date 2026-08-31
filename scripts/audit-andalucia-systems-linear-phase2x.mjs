import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const label = process.argv[2] || 'current';
const debugId = process.argv[3] || '';
const out = path.join(root, 'artifacts', 'andalucia-phase2x-systems-linear', label);
fs.mkdirSync(out, { recursive: true });

const context = { window: {} };
context.globalThis = context;
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-interactive-delivery-gate.js',
  'math-renderer.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const renderer = context.window.MargaritaMathRenderer || context.MargaritaMathRenderer;
const courseBySubject = { '2_bach_mates_ii': '2bach-mates', '2_bach_ccss_ii': '2bach-ccss' };
const enabledIds = new Set(Object.entries(courseBySubject).flatMap(([subject, course]) =>
  runtime.challengeRecords(course).map((record) => `${subject}:${record.parentExerciseId || record.exerciseId}`)));
const enabled = runtime.exercises.filter((exercise) => enabledIds.has(`${exercise.subject}:${exercise.exerciseId}`));

const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const strip = (value) => String(value || '').replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|amp|lt|gt);/g, ' ').replace(/\s+/g, ' ').trim();
const count = (value, pattern) => [...String(value || '').matchAll(pattern)].length;
const sourceText = (exercise) => String(exercise.sourceProjection?.full || exercise.officialPromptLiteral || exercise.learnerStatement || '');
const runtimeText = (exercise) => [exercise.learnerStatement, ...(exercise.parts || []).map((part) => part.text)].join('\n');
const solutionText = (exercise) => (exercise.parts || []).map((part) => (part.solutionSteps || []).join('\n')).join('\n');

function systemSignatures(value) {
  const text = String(value || '');
  const systems = [...text.matchAll(/\b(?:system|cases)\s*\{([^{}]*)\}|\\begin\{cases\}([\s\S]*?)\\end\{cases\}/gi)]
    .filter((match) => {
      if (!/^cases/i.test(match[0])) return true;
      const entries = String(match[1] || '').split(';').map((entry) => entry.trim()).filter(Boolean);
      return entries.length >= 2 && entries.every((entry) => /(?:^|[^<>≤≥])=(?!=)/.test(entry) && !/[<>≤≥]/.test(entry));
    });
  const rows = systems.map((match) => {
    const body = match[1] ?? match[2] ?? '';
    return body.split(/;|\\\\|\r?\n/).map((row) => row.trim()).filter(Boolean);
  });
  return { count: systems.length, equationCounts: rows.map((items) => items.length), totalEquations: rows.flat().length };
}

function equationLikeCount(value) {
  const text = String(value || '')
    .replace(/\bsystem\s*\{[^{}]*\}/gi, ' ')
    .replace(/matrix\s*\{[^{}]*\}/gi, ' ');
  return text.split(/;|\r?\n/).filter((line) => {
    const clean = line.trim();
    return /(?:^|[^<>≤≥])=(?!=)/.test(clean)
      && /[xyzabcλμ]/i.test(clean)
      && !/\b(?:f|g|h|P|B|C|I|A)\s*\(/.test(clean)
      && clean.length < 220;
  }).length;
}

function extractedLinearEquations(value) {
  const term = '[+−-]?\\s*(?:(?:\\d+(?:[.,]\\d+)?)|[a-zαβλμ])?\\s*[xyz]';
  const rhs = '[+−-]?\\s*(?:(?:\\d+(?:[.,]\\d+)?)|[a-zαβλμ])(?:\\s*[+−-]\\s*(?:(?:\\d+(?:[.,]\\d+)?)|[a-zαβλμ]))*';
  return [...String(value || '').matchAll(new RegExp(`(${term}(?:\\s*${term}){0,4}\\s*=\\s*${rhs})`, 'gi'))].map((match) => match[1]);
}

function renderSignature(value) {
  const html = renderer.text(String(value || ''));
  const rowCounts = [...html.matchAll(/class="math-system math-system-rows-(\d+)"/g)].map((match) => Number(match[1]));
  return {
    systemCount: count(html, /class="math-system(?:\s[^"]*)?"/g),
    braceCount: rowCounts.length,
    equationCount: rowCounts.reduce((sum, rowCount) => sum + rowCount, 0),
    internalTokens: [...new Set([...strip(html).matchAll(/\b(?:system|matrix|cases|piecewise)\s*\{|\\(?:begin|end|frac|sqrt)\b/gi)].map((match) => match[0]))],
    html
  };
}

function renderValuesSignature(values) {
  const items = values.map(renderSignature);
  return {
    systemCount: items.reduce((sum, item) => sum + item.systemCount, 0),
    braceCount: items.reduce((sum, item) => sum + item.braceCount, 0),
    equationCount: items.reduce((sum, item) => sum + item.equationCount, 0),
    internalTokens: [...new Set(items.flatMap((item) => item.internalTokens))],
    html: items.map((item) => item.html).join('\n')
  };
}

function isLinearProgramming(exercise) {
  if (exercise.subject !== '2_bach_ccss_ii') return false;
  // La clasificación debe depender de la tarea oficial, no de palabras que
  // aparezcan incidentalmente en una solución generada.
  const text = normalize(`${sourceText(exercise)} ${runtimeText(exercise)}`);
  const explicit = /programacion lineal|funcion objetivo|region factible|recinto factible|semiplano/.test(text);
  const optimization = /maximiz|minimiz|maximo beneficio|beneficio maximo|coste minimo|minimo coste|maximo numero|mayor numero|(?:importe|ingreso|venta|produccion)[\s\S]{0,45}maximo|optim/.test(text);
  const resources = /restric|dispon|almacen|existencias|como maximo|a lo sumo|al menos|no (?:puede|pueden) superar|presupuesto|capacidad|harina|azucar|mantequilla|algodon|poliester|piononos|pestinos/.test(text);
  const twoDecisions = /dos tipos|dos productos|productos?\s+a\s+y\s+b|tipo a|tipo b|primer tipo|segundo tipo|hornadas|lisas y estampadas|sendos|\bx\s*[,;]\s*y\b/.test(text);
  return explicit || (optimization && resources && twoDecisions);
}

function lpQuality(exercise) {
  const solution = solutionText(exercise);
  const rendered = renderSignature(solution);
  const text = normalize(solution);
  const source = normalize(sourceText(exercise));
  const regionGivenByVertices = /region[\s\S]{0,100}vertices/.test(source) && !/restric|inecuaciones/.test(source);
  const abstractRegion = /region factible|recinto|inecuaciones|restricciones/.test(source)
    && !/fabrica|empresa|agricult|produccion|recursos|dispon/.test(source);
  const graphs = (exercise.parts || []).filter((part) => part.solutionMathOptions?.solutionGraph?.src).length;
  return {
    variables: abstractRegion || /variables?|sean?\s+x|definimos?\s+(?:x|las)|x\s+e\s+y\s+como|\bx\s*=/.test(text),
    constraints: regionGivenByVertices || /restric|system\s*\{|[≤≥]/.test(solution),
    objective: /funcion objetivo|beneficio|coste|ganancia|ingreso|venta|maximizar|minimizar|\b[bcfizw]\s*=|\bf\s*\(/.test(text),
    boundariesAndHalfplanes: regionGivenByVertices || /fronter|semiplan|punto de prueba/.test(text),
    vertices: /vertic|puntos? extremos|poligono/.test(text) && /\([^)]*[,;][^)]*\)/.test(solution),
    objectiveTable: /tabla de evaluacion|evaluamos|evaluacion|vertice[\s\S]{0,240}(?:beneficio|coste|objetivo)|\([^)]*[,;][^)]*\)[^\n]{0,80}[=:|]|\bf\s*\([^)]*\)\s*=/i.test(solution),
    graphCount: graphs,
    contextualResult: /resultado|por tanto|beneficio|maximo|minimo|produccion|debe|deben|se preparan|se fabrican|se forman/.test(text),
    renderedInternalTokens: rendered.internalTokens
  };
}

const rows = enabled.map((exercise) => {
  const source = sourceText(exercise);
  const runtimeValue = runtimeText(exercise);
  const solution = solutionText(exercise);
  const sourceSystems = systemSignatures(source);
  const runtimeSystems = systemSignatures(runtimeValue);
  const solutionSystems = systemSignatures(solution);
  const runtimeRender = renderValuesSignature([exercise.learnerStatement || '', ...(exercise.parts || []).map((part) => part.text || '')]);
  const solutionRender = renderValuesSignature((exercise.parts || []).flatMap((part) => part.solutionSteps || []));
  const sourceEquationLike = equationLikeCount(source);
  const runtimeEquationLike = equationLikeCount(runtimeValue);
  const solutionEquationLike = equationLikeCount(solution);
  const firstPartMarker = source.search(/(?:^|\s)\(?a\s*\)/i);
  const sourceCommon = firstPartMarker > 0 ? source.slice(0, firstPartMarker) : source;
  const sourceSystemScope = sourceCommon.split(/(?:al\s+)?a[nñ]adirle\s+la\s+ecuaci[oó]n/i)[0];
  const sourceParsedEquations = /sistema/i.test(sourceSystemScope) ? extractedLinearEquations(sourceSystemScope) : [];
  const sourceSystemCandidate = sourceSystems.count > 0 || (/sistema/i.test(source) && sourceParsedEquations.length >= 2);
  const flattenedSolutionSystem = (exercise.parts || []).some((part) => (part.solutionSteps || []).some((rawStep) => {
    const step = String(rawStep || '');
    if (/\bsystem\s*\{/i.test(step)) return false;
    const lines = step.split('\n');
    return lines.some((line, index) => {
      const colon = line.indexOf(':');
      const prefix = colon >= 0 ? line.slice(0, colon + 1) : '';
      const candidate = colon >= 0 ? line.slice(colon + 1) : line;
      if (!/sistema(?:s|\s+de\s+ecuaciones)?|ecuaciones simult[aá]neas/i.test(`${prefix} ${lines[index - 1] || ''}`)) return false;
      const equations = candidate.split(';').map((item) => item.trim()).filter(Boolean);
      return equations.length >= 2 && equations.length <= 5
        && equations.every((equation) => /(?:^|[^<>≤≥])=(?!=)/.test(equation) && /[xyzabcλμ]/i.test(equation));
    });
  }));
  const solutionSystemCandidate = solutionSystems.count > 0 || flattenedSolutionSystem;
  const barrowEvaluationCount = count(solutionRender.html, /class="math-evaluation(?:\s[^"]*)?"/g);
  const barrowManualLayoutCount = count(solutionRender.html, /class="[^"]*(?:barrow-evaluation|display-integral|integral-bounds)[^"]*"/g);
  const failures = [];
  const sourceExpectedEquationCount = sourceSystems.totalEquations || sourceParsedEquations.length;
  if (sourceSystemCandidate && runtimeRender.systemCount === 0) failures.push('SOURCE_SYSTEM_FLATTENED_RUNTIME');
  if (sourceSystemCandidate && (runtimeRender.braceCount !== runtimeRender.systemCount || runtimeRender.equationCount < sourceExpectedEquationCount)) failures.push('RUNTIME_SYSTEM_RENDER_ERROR');
  if (flattenedSolutionSystem) failures.push('SOLUTION_SYSTEM_FLATTENED');
  if (solutionSystems.count && (solutionRender.systemCount < solutionSystems.count || solutionRender.braceCount !== solutionRender.systemCount || solutionRender.equationCount < solutionSystems.totalEquations)) failures.push('SOLUTION_SYSTEM_RENDER_ERROR');
  if (runtimeRender.internalTokens.length || solutionRender.internalTokens.length) failures.push('VISIBLE_INTERNAL_TOKEN');
  if (barrowManualLayoutCount) failures.push('BARROW_LIMIT_POSITION_ERROR');
  const lpCandidate = isLinearProgramming(exercise);
  const lp = lpCandidate ? lpQuality(exercise) : null;
  if (lpCandidate && exercise.primaryTopic !== 'Programación lineal') failures.push('LINEAR_PROGRAMMING_MISCLASSIFIED');
  if (lpCandidate && !lp.graphCount) failures.push('LINEAR_PROGRAMMING_GRAPH_MISSING');
  if (lpCandidate && (!lp.variables || !lp.constraints || !lp.objective || !lp.boundariesAndHalfplanes || !lp.vertices || !lp.objectiveTable || !lp.contextualResult)) failures.push('LINEAR_PROGRAMMING_SOLUTION_INCOMPLETE');
  return {
    exerciseId: exercise.exerciseId,
    subject: exercise.subject,
    year: exercise.year,
    sitting: exercise.sitting,
    questionKey: exercise.questionKey,
    primaryTopic: exercise.primaryTopic,
    blockId: exercise.blockId,
    sourceSystemCandidate,
    solutionSystemCandidate,
    sourceSystems,
    runtimeSystems,
    solutionSystems,
    sourceEquationLike: Math.max(sourceEquationLike, sourceParsedEquations.length),
    runtimeEquationLike,
    solutionEquationLike,
    barrowEvaluationCount,
    barrowManualLayoutCount,
    runtimeDom: { ...runtimeRender, html: undefined },
    solutionDom: { ...solutionRender, html: undefined },
    ...(exercise.exerciseId === debugId ? { runtimeRenderedHtml: runtimeRender.html, solutionRenderedHtml: solutionRender.html } : {}),
    linearProgrammingCandidate: lpCandidate,
    linearProgrammingQuality: lp,
    failures
  };
});

const subjects = ['2_bach_mates_ii', '2_bach_ccss_ii'];
const summarize = (items) => ({
  enabledExercises: items.length,
  sourceSystemExercises: items.filter((row) => row.sourceSystemCandidate).length,
  sourceSystemEquations: items.reduce((sum, row) => sum + row.sourceSystems.totalEquations, 0),
  runtimeSystemExercises: items.filter((row) => row.runtimeSystems.count).length,
  runtimeSystemEquations: items.reduce((sum, row) => sum + row.runtimeSystems.totalEquations, 0),
  solutionSystemExercises: items.filter((row) => row.solutionSystemCandidate).length,
  barrowEvaluations: items.reduce((sum, row) => sum + row.barrowEvaluationCount, 0),
  barrowLimitPositionErrors: items.reduce((sum, row) => sum + row.barrowManualLayoutCount, 0),
  linearProgrammingCandidates: items.filter((row) => row.linearProgrammingCandidate).length,
  linearProgrammingClassified: items.filter((row) => row.primaryTopic === 'Programación lineal').length,
  failedExercises: items.filter((row) => row.failures.length).length
});
const failureCounts = {};
for (const row of rows) for (const failure of row.failures) failureCounts[failure] = (failureCounts[failure] || 0) + 1;
const summary = {
  schemaVersion: 'mathup.andalucia.systems-linear-phase2x.v1',
  generatedAt: new Date().toISOString(),
  label,
  totalEnabledExercises: rows.length,
  bySubject: Object.fromEntries(subjects.map((subject) => [subject, summarize(rows.filter((row) => row.subject === subject))])),
  failureCounts,
  affectedExerciseIds: rows.filter((row) => row.failures.length).map((row) => row.exerciseId)
};

fs.writeFileSync(path.join(out, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
fs.writeFileSync(path.join(out, 'exercise-log.jsonl'), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
fs.writeFileSync(path.join(out, 'failures.json'), `${JSON.stringify(rows.filter((row) => row.failures.length), null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));

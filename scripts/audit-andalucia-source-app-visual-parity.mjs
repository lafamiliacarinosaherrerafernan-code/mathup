import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'artifacts', 'andalucia-source-app-visual-parity');
fs.mkdirSync(out, { recursive: true });

const context = { window: {} };
context.globalThis = context;
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-source-app-visual-parity.js',
  'data/andalucia-interactive-delivery-gate.js',
  'math-renderer.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const sources = context.window.ANDALUCIA_USER_SOURCE_INDEX || {};
const renderer = context.window.MargaritaMathRenderer || context.MargaritaMathRenderer;
const subjects = {
  '2_bach_mates_ii': { courseId: '2bach-mates', label: 'Matemáticas II' },
  '2_bach_ccss_ii': { courseId: '2bach-ccss', label: 'CCSS II' }
};
const correctedTargetIds = new Set([
  'pau-user-and-fc24350dc009dd373a61feb93871',
  'pau-can-ex-b9f6f879ab07429e3e9fcf2843eb85cc',
  'pau-can-ex-44b63cc7b878dc2d552ccd771ca6a638'
]);
const phase29VisuallyConfirmedIds = new Set([
  'pau-can-ex-592dc0cd8c4406d93ef757266f2852ca',
  'pau-can-ex-7494c79e721628fd3998148c7f0eddbd',
  'pau-can-ex-b38b0b31e36d0d59da2e986e8029a412',
  'pau-can-ex-d90d2b00fee5e8c20febe0b516003647',
  'pau-can-ex-e97a8effb33c5ceb1fcd4022156aeda3',
  // Los ocho DOC de 2012 se comprobaron contra los binarios OLE originales:
  // 55/55 objetos Equation.3 recuperados de forma nativa, sin OCR, con hashes
  // de documento/flujo/EMF/PNG verificados por equation3-andalucia-2012.
  'pau-can-doc-ex-003f8317c19d7451985b40ff38bc0e52',
  'pau-can-doc-ex-38c9c7d6cb87cc3a35eb9e6966e738da',
  'pau-can-doc-ex-85f170d1a7840bc6c1b5967201af2ff1',
  'pau-can-doc-ex-9a0ded07010dd26dca632b1f31e14653',
  'pau-can-doc-ex-a20c4facec1a69296c29635d28e017c3',
  'pau-can-doc-ex-b125b3e656434aeabb2613c7d119f27d',
  'pau-can-doc-ex-c3a07cd5637a526fc3d1f92bfe4ac0d3',
  'pau-can-doc-ex-e119e071e6eb2f6d1e1e58e259691d83'
]);
const phase29UnresolvedSourceIds = new Set([
  // El hash documental no coincide con ninguno de los cinco PDF CCSS II 2010
  // aportados por el usuario y el registro no conserva nombre de archivo.
  'pau-can-ex-88fd4c724da14002349a8f59e3c53fcb'
]);

function occurrences(value, pattern) {
  return [...String(value || '').matchAll(pattern)].length;
}

function explicitCasesSignature(value) {
  let system = 0;
  let piecewise = 0;
  for (const match of String(value || '').matchAll(/\bcases\s*\{([^{}]*)\}/gi)) {
    const entries = match[1].split(';').map((entry) => entry.trim()).filter(Boolean);
    const equationsOnly = entries.length >= 2 && entries.every((entry) => /(?:^|[^<>≤≥])=(?!=)/.test(entry) && !/[<>≤≥]/.test(entry));
    if (equationsOnly) system += 1;
    else piecewise += 1;
  }
  return { system, piecewise };
}

function sourceSignature(exercise) {
  const text = String(exercise.sourceProjection?.full || exercise.officialPromptLiteral || exercise.learnerStatement || '');
  const changes = exercise.sourceProjection?.glyphChanges || [];
  const removedMatrixDelimiter = changes.some((change) => /ELASTIC_DELIMITER/.test(change.rule || '') && /[]/.test(change.before || ''));
  const removedSystemBrace = changes.some((change) => /ELASTIC_DELIMITER/.test(change.rule || '') && /[]/.test(change.before || ''));
  const legacyFlattenedEnvironment = /\\begin\{matrix\}[\s\S]*?\\end\{matrix\}/i.test(text);
  const explicitMatrices = occurrences(text, /\bmatrix\s*[({]|\[\[|\\begin\{(?:p|b|v)matrix\}/gi);
  const cases = explicitCasesSignature(text);
  const explicitSystems = occurrences(text, /\bsystem\s*\{|\\begin\{cases\}/gi) + cases.system;
  const explicitPiecewise = occurrences(text, /\bpiecewise\s*\{/gi) + cases.piecewise;
  const labels = [...text.matchAll(/(?:^|\n)\s*\(?([a-e])\s*[).:-]\s*/gim)].map((match) => match[1].toLowerCase());
  const uniqueLabels = labels.filter((label, index) => index === 0 || label !== labels[index - 1]);
  return {
    matrixMin: explicitMatrices || (removedMatrixDelimiter && /matri/i.test(text) ? 1 : 0),
    systemMin: explicitSystems || (removedSystemBrace && /sistema/i.test(text) ? 1 : 0),
    determinantMin: occurrences(text, /\bdet\s*\(|\\begin\{vmatrix\}|\|\s*\[\[/gi),
    piecewiseMin: explicitPiecewise,
    integralMin: occurrences(text, /∫|\\int\b/g),
    limitMin: occurrences(text, /\blim(?:_|\s*\()/gi),
    rootMin: occurrences(text, /√|\\sqrt\s*\{/g),
    subparts: uniqueLabels,
    removedMatrixDelimiter,
    removedSystemBrace,
    explicitMatrixCount: explicitMatrices,
    explicitSystemCount: explicitSystems,
    legacyFlattenedEnvironment,
    text
  };
}

function appSignature(exercise) {
  const statement = exercise.learnerStatementHtml
    ? renderer.html(String(exercise.learnerStatementHtml))
    : renderer.text(exercise.learnerStatement || exercise.officialPromptLiteral || '');
  const partHtml = (exercise.parts || []).map((part) => renderer.text(part.text || '')).join('\n');
  const html = `${statement}\n${partHtml}`;
  const visible = html.replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|amp|lt|gt);/g, ' ');
  return {
    matrix: occurrences(html, /class="math-matrix\b/g),
    determinant: occurrences(html, /class="math-matrix math-determinant\b/g),
    system: occurrences(html, /class="math-system\b/g),
    piecewise: occurrences(html, /class="math-piecewise\b/g),
    // Una integral sin cotas se muestra correctamente con el glifo ∫; las
    // acotadas añaden además la estructura `math-integral`.
    integral: occurrences(visible, /∫/g),
    limit: occurrences(html, /class="math-limit\b/g),
    root: occurrences(html, /class="math-root\b/g),
    visibleInternalTokens: [...new Set([
      ...[...visible.matchAll(/\b(?:matrix|system|piecewise|cases)\s*[({]/gi)].map((match) => match[0]),
      ...[...visible.matchAll(/\\(?:begin|end|frac|sqrt|int|lim)\b/g)].map((match) => match[0])
    ])],
    internalTokenContexts: [...visible.matchAll(/.{0,100}(?:\\(?:begin|end|frac|sqrt|int|lim)\b|\b(?:matrix|system|piecewise|cases)\s*[({]).{0,140}/gi)].map((match) => match[0].trim()),
    html
  };
}

const enabledIds = new Set(Object.values(subjects).flatMap(({ courseId }) => runtime.challengeRecords(courseId).map((record) => record.parentExerciseId || record.exerciseId)));
const rows = runtime.exercises.filter((exercise) => enabledIds.has(exercise.exerciseId)).map((exercise) => {
  const source = sourceSignature(exercise);
  const app = appSignature(exercise);
  const failures = [];
  if (source.matrixMin > app.matrix) failures.push(`MATRIX_${source.matrixMin}_TO_${app.matrix}`);
  if (source.systemMin > app.system) failures.push(`SYSTEM_${source.systemMin}_TO_${app.system}`);
  if (source.piecewiseMin > app.piecewise) failures.push(`PIECEWISE_${source.piecewiseMin}_TO_${app.piecewise}`);
  if (source.integralMin > app.integral) failures.push(`INTEGRAL_${source.integralMin}_TO_${app.integral}`);
  if (source.limitMin > app.limit) failures.push(`LIMIT_${source.limitMin}_TO_${app.limit}`);
  if (app.visibleInternalTokens.length) failures.push('VISIBLE_INTERNAL_TOKEN');
  const parts = exercise.parts || [];
  const partLabels = parts.map((part) => String(part.label || '').replace(/[).:\s]/g, '').toLowerCase()).filter(Boolean);
  const duplicatePartIds = parts.length - new Set(parts.map((part) => part.id)).size;
  if (duplicatePartIds) failures.push('DUPLICATE_PART_ID');
  const invalidChoiceParts = parts.filter((part) => !part.semanticAnswer || !Array.isArray(part.distractors) || part.distractors.length !== 3).map((part) => part.id);
  if (invalidChoiceParts.length) failures.push('NOT_FOUR_CHOICES');
  const sourceInfo = sources[exercise.documentHash] || exercise.userSource || {};
  const sourcePage = exercise.sourceProjection?.glyphEvidence?.page || null;
  const complexButNotStructurallyCertifiable = (
    (source.removedMatrixDelimiter && source.matrixMin === 0)
    || (source.removedSystemBrace && source.systemMin === 0)
    || source.legacyFlattenedEnvironment
    || (/\b(?:matri|determinante|sistema|funci[oó]n definida)\b/i.test(source.text)
      && !source.matrixMin && !source.systemMin && !source.piecewiseMin
      && /(?:\n\s*[\d−+a-zαβλ]{1,18}\s+){2,}|[]/i.test(source.text))
  );
  const uncertainFlattenedStructure = failures.length > 0 && failures.every((failure) => (
    (failure.startsWith('MATRIX_') && source.explicitMatrixCount === 0 && source.removedMatrixDelimiter)
    || (failure.startsWith('SYSTEM_') && source.explicitSystemCount === 0 && source.removedSystemBrace)
    || (failure === 'VISIBLE_INTERNAL_TOKEN' && source.legacyFlattenedEnvironment)
  ));
  let status = failures.length
    ? (uncertainFlattenedStructure ? 'NEEDS_HUMAN_VISUAL_REVIEW' : 'FAIL')
    : complexButNotStructurallyCertifiable ? 'NEEDS_HUMAN_VISUAL_REVIEW' : 'PASS';
  if (!failures.length && (correctedTargetIds.has(exercise.exerciseId) || exercise.sourceAppVisualCorrection)) {
    status = 'CORRECTED';
  } else if (!failures.length && phase29VisuallyConfirmedIds.has(exercise.exerciseId)) {
    status = 'PASS';
  } else if (phase29UnresolvedSourceIds.has(exercise.exerciseId)) {
    status = 'UNRESOLVED_SOURCE';
  }
  return {
    exerciseId: exercise.exerciseId,
    subject: exercise.subject,
    materia: subjects[exercise.subject].label,
    year: exercise.year,
    sitting: exercise.sitting,
    reserveNumber: exercise.reserveNumber ?? null,
    questionKey: exercise.questionKey,
    sourceFile: sourceInfo.fileName || null,
    sourceRelativePath: sourceInfo.relativePath || null,
    sourcePage,
    primaryTopic: exercise.primaryTopic,
    status,
    failures,
    sourceSignature: { ...source, text: undefined },
    appSignature: { ...app, html: undefined },
    canonicalPartLabels: partLabels,
    invalidChoiceParts,
    evidence: exercise.sourceAppVisualCorrection || exercise.sourceProjection?.glyphEvidence || null
  };
});

const statuses = ['PASS', 'CORRECTED', 'UNRESOLVED_SOURCE', 'NEEDS_HUMAN_VISUAL_REVIEW', 'FAIL'];
const bySubject = Object.fromEntries(Object.entries(subjects).map(([key, meta]) => {
  const selected = rows.filter((row) => row.subject === key);
  return [key, {
    materia: meta.label,
    enabledExercises: selected.length,
    ...Object.fromEntries(statuses.map((status) => [status, selected.filter((row) => row.status === status).length]))
  }];
}));
const patternCounts = {};
for (const row of rows) for (const failure of row.failures) patternCounts[failure] = (patternCounts[failure] || 0) + 1;
const browserResultPath = path.join(out, 'browser-results.json');
const browserResults = fs.existsSync(browserResultPath) ? JSON.parse(fs.readFileSync(browserResultPath, 'utf8')) : null;
const summary = {
  schemaVersion: 'mathup.andalucia.source-app-visual-parity.v1',
  generatedAt: new Date().toISOString(),
  corpus: { officialDocuments: 217, matesDocuments: 110, ccssDocuments: 107, enabledExercises: rows.length },
  bySubject,
  patternCounts,
  totals: Object.fromEntries(statuses.map((status) => [status, rows.filter((row) => row.status === status).length])),
  sourceAuthority: 'USER_SUPPLIED_OFFICIAL_FILES_ONLY',
  browserEvidencePending: !browserResults,
  browserResults: browserResults || undefined
};

fs.writeFileSync(path.join(out, 'exercise-log.jsonl'), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
fs.writeFileSync(path.join(out, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
fs.writeFileSync(path.join(out, 'review-queue.json'), `${JSON.stringify(rows.filter((row) => ['UNRESOLVED_SOURCE', 'NEEDS_HUMAN_VISUAL_REVIEW', 'FAIL'].includes(row.status)), null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));

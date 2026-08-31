import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'artifacts', 'solution-skill-methodology-notation-2026-08-31');
fs.mkdirSync(outDir, { recursive: true });

const window = {};
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js'
]) {
  vm.runInNewContext(fs.readFileSync(path.join(root, relative), 'utf8'), { window }, { filename: relative });
}

await import(pathToFileURL(path.join(root, 'math-renderer.js')).href);
const renderer = globalThis.MargaritaMathRenderer;
const runtime = window.ANDALUCIA_PAU_RUNTIME;

const visibleTokenPatterns = [
  ['RAW_DECIMAL_BRACES', /\{,\}/],
  ['RAW_APPROX_COMMAND', /\\approx(?![A-Za-z])/],
  ['RAW_TEX_COMMAND', /\\(?:frac|sqrt|int|lim|begin|end|left|right|cdot|times|infty|mathrm|text)\b/],
  ['RAW_STRUCTURAL_TOKEN', /\b(?:matrix|system|cases)\s*[({]/i],
  ['RAW_TEX_DELIMITER', /\\[()[\]]|\$\$/],
  ['RAW_POWER_OR_SUBSCRIPT', /(?:\^|_)\{[^}]+\}/],
  ['DUPLICATE_DIFFERENTIAL', /dx\)\s*dx\b/i]
];

function fields(part) {
  return [
    ['text', part.text],
    ['semanticAnswer', part.semanticAnswer],
    ...((part.distractors || []).map((value, index) => [`distractor.${index + 1}`, value])),
    ...((part.solutionSteps || []).map((value, index) => [`solutionStep.${index + 1}`, value])),
    ['finalAnswer', part.finalAnswer]
  ].filter(([, value]) => typeof value === 'string');
}

function stripHtml(html) {
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function subjectLabel(subject) {
  return subject === '2_bach_mates_ii' ? 'Matemáticas II' : 'CCSS II';
}

const rows = [];
for (const exercise of runtime.exercises.filter((item) => item.community === 'Andalucía')) {
  for (const part of exercise.parts || []) {
    const target = {
      exerciseId: exercise.exerciseId,
      subpartId: part.id,
      subject: subjectLabel(exercise.subject),
      year: exercise.year,
      sitting: exercise.sitting,
      topic: exercise.primaryTopic
    };
    for (const [field, value] of fields(part)) {
      const visible = stripHtml(renderer.text(value));
      for (const [code, pattern] of visibleTokenPatterns) {
        if (pattern.test(visible)) rows.push({ ...target, category: 'VISIBLE_NOTATION_ERROR', code, field, excerpt: visible.slice(0, 360) });
      }
    }
    if (part.id === 'pau-can-ex-d90d2b00fee5e8c20febe0b516003647:b'
      && fields(part).some(([, value]) => /∫[^\n]{0,80}\(\(/.test(value))) {
      rows.push({ ...target, category: 'VISIBLE_NOTATION_ERROR', code: 'DUPLICATE_INTEGRAND_GROUP', field: 'interaction', excerpt: part.semanticAnswer });
    }

    const solution = (part.solutionSteps || []).join('\n');
    const all = fields(part).map(([, value]) => value).join('\n');
    const isNormal = /distribuci[oó]n binomial y normal/i.test(exercise.primaryTopic || '')
      || (/normal/i.test(part.text || '') && /probabilidad|porcentaje|proporci[oó]n/i.test(part.text || ''));
    if (part.referenceTable === 'normal' && /P\s*\(/.test(solution)
      && (!/P\s*\(\s*Z/i.test(solution) || !/Buscamos[^.\n]*tabla/i.test(solution))) {
      rows.push({ ...target, category: 'STATISTICAL_METHOD_ERROR', code: 'NORMAL_EVENT_CHAIN_OR_TABLE_READING_MISSING', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
    }
    if (isNormal && /(?:Φ|\\Phi|Phi\s*\()/i.test(solution)) {
      rows.push({ ...target, category: 'STATISTICAL_METHOD_ERROR', code: 'OPAQUE_NORMAL_CDF', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
    }
    const isHypothesisTest = /H[₀0]|hip[oó]tesis|contraste|regi[oó]n cr[ií]tica|estad[ií]stico de contraste/i.test(solution);
    if (isNormal && !isHypothesisTest && /(?:^|\n)\s*z\s*=\s*(?:frac\{|\(?[^\n=]+−[^\n=]+\)?\s*\/)/i.test(solution)) {
      rows.push({ ...target, category: 'STATISTICAL_METHOD_ERROR', code: 'ISOLATED_STANDARDIZATION', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
    }

    if (/regla del cociente|derivamos el cociente/i.test(solution) && /(?:^|[\n;])\s*(?:N′|D′)\s*=|(?:^|\n)\s*N\s*=.*(?:\n|;).*D\s*=/s.test(solution)) {
      rows.push({ ...target, category: 'PEDAGOGICAL_METHOD_ERROR', code: 'ARTIFICIAL_QUOTIENT_AUXILIARIES', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
    }
    if (/tama[nñ]o m[ií]nimo|error m[aá]ximo|nivel de confianza|intervalo de confianza/i.test(part.text || '')
      && /recta (?:real )?de signos de f[′']/i.test(solution)) {
      rows.push({ ...target, category: 'PEDAGOGICAL_METHOD_ERROR', code: 'CALCULUS_SIGN_LINE_APPLIED_TO_STATISTICS', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
    }

    if (exercise.exerciseId !== 'pau-can-ex-88fd4c724da14002349a8f59e3c53fcb'
      && /represent(?:e|a|ar|aci[oó]n)\s+gr[aá]fic/i.test(part.text || '') && !part.solutionMathOptions?.solutionGraph?.src) {
      rows.push({ ...target, category: 'GRAPH_ERROR', code: 'REQUESTED_GRAPH_MISSING', field: 'solutionMathOptions', excerpt: part.text });
    }

    const asksAsymptotes = /as[ií]ntota/i.test(part.text || '');
    if (asksAsymptotes && !/(?:l[ií]mite(?:s)?\s+laterales|x\s*→\s*a[⁻⁺]|m\s*=\s*lim|n\s*=\s*lim|b\s*=\s*lim)/i.test(solution)) {
      rows.push({ ...target, category: 'PEDAGOGICAL_METHOD_ERROR', code: 'ASYMPTOTE_DEFINITION_OR_LIMITS_MISSING', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
    }

    const asksArea = /(?:área|area).*(?:recinto|limitad|encerrad|curva|gráfica|grafica)|recinto.*(?:área|area)/i.test(part.text || '');
    if (asksArea) {
      const graph = part.solutionMathOptions?.solutionGraph;
      if (!graph?.src) rows.push({ ...target, category: 'GRAPH_ERROR', code: 'AREA_GRAPH_MISSING', field: 'solutionMathOptions', excerpt: part.text });
      if (!/corte|intersecci/i.test(solution)) rows.push({ ...target, category: 'PEDAGOGICAL_METHOD_ERROR', code: 'AREA_CUTS_MISSING', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
      if (!/(?:techo|superior).*(?:suelo|inferior)|(?:suelo|inferior).*(?:techo|superior)/is.test(solution)) rows.push({ ...target, category: 'PEDAGOGICAL_METHOD_ERROR', code: 'AREA_UPPER_LOWER_MISSING', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
      if (/(?:integral|∫|int_)/i.test(all) && !/(?:∫|int_)/.test(solution)) rows.push({ ...target, category: 'PEDAGOGICAL_METHOD_ERROR', code: 'AREA_DEFINITE_INTEGRAL_MISSING', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
    }

    const integrals = all.match(/(?:∫|int_)/g) || [];
    if (integrals.length && /(?:primitiva|Barrow)/i.test(solution) && !/(?:∫|int_)[^\n]{1,180}(?:dx|dt|du)/.test(solution)) {
      rows.push({ ...target, category: 'PEDAGOGICAL_METHOD_ERROR', code: 'FULL_INTEGRAL_BEFORE_PRIMITIVE_MISSING', field: 'solutionSteps', excerpt: solution.slice(0, 500) });
    }
  }
}

const deduped = [...new Map(rows.map((row) => [[row.exerciseId, row.subpartId, row.category, row.code, row.field].join('|'), row])).values()];
const subjects = ['Matemáticas II', 'CCSS II'];
const categories = ['STRUCTURAL_ERROR', 'VISIBLE_NOTATION_ERROR', 'PEDAGOGICAL_METHOD_ERROR', 'GRAPH_ERROR', 'STATISTICAL_METHOD_ERROR'];
const summary = {
  schemaVersion: 'mathup.andalucia-methodology-notation-audit.v1',
  generatedAt: new Date().toISOString(),
  runtimeVersion: runtime.version,
  totalEnabledExercises: Object.fromEntries(subjects.map((subject) => [subject, runtime.exercises.filter((exercise) => subjectLabel(exercise.subject) === subject && exercise.community === 'Andalucía').length])),
  errors: Object.fromEntries(subjects.map((subject) => [subject, Object.fromEntries(categories.map((category) => [category, deduped.filter((row) => row.subject === subject && row.category === category).length]))])),
  finalErrors: deduped.length
};

const reportPrefix = String(process.argv[2] || 'initial').replace(/[^a-z0-9_-]/gi, '');
fs.writeFileSync(path.join(outDir, `${reportPrefix}-audit.json`), `${JSON.stringify(summary, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, `${reportPrefix}-findings.jsonl`), `${deduped.map((row) => JSON.stringify(row)).join('\n')}${deduped.length ? '\n' : ''}`);
console.log(JSON.stringify(summary, null, 2));

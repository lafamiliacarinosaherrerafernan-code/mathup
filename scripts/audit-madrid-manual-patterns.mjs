import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'artifacts', 'madrid-systematic-propagation');
fs.mkdirSync(outDir, { recursive: true });

function loadWindowFile(relativePath, key) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relativePath), 'utf8'), context, { filename: relativePath });
  return context.window[key];
}

const authored = loadWindowFile('data/madrid-pau-authored.js', 'MADRID_PAU_AUTHORED');
const bank = loadWindowFile('data/madrid-pau-bank.js', 'MADRID_PAU_BANK');
const courses = ['2bach-mates', '2bach-ccss'];

function allText(record) {
  const exercise = record.exercise || {};
  return [
    ...(exercise.statement || []).flatMap((node) => [node.plain, node.html]),
    ...(exercise.parts || []).flatMap((part) => (part.paragraphs || []).flatMap((node) => [node.plain, node.html])),
    ...Object.values(record.answers || {}).flatMap((answer) => [answer.solution, ...(answer.options || [])])
  ].filter(Boolean).join('\n');
}

function statementText(record) {
  const exercise = record.exercise || {};
  return (exercise.statement || []).flatMap((node) => [node.plain, node.html]).filter(Boolean).join('\n');
}

function solutionText(record) {
  return Object.values(record.answers || {}).flatMap((answer) => [answer.solution, ...(answer.options || [])]).filter(Boolean).join('\n');
}

const definitions = {
  MATRIX_TUPLE_FLATTENED: (record) => /\(\([^()]+\)\s*,\s*\([^()]+\)\)/.test(allText(record)),
  SYSTEM_LINEARIZED: (record) => /\bsistema\b[\s\S]{0,420}(?:[;]\s*|,\s*)[^.;\n]*=[^.;\n]*(?:[;]\s*|,\s*)[^.;\n]*=/i.test(statementText(record)) && !/(?:system\s*\{|<mtable\b)/i.test(statementText(record)),
  FRACTION_INLINE: (record) => /(?:\([^()]+\)|\b\w+|[⁰¹²³⁴⁵⁶⁷⁸⁹]+)\s*\/\s*(?:\([^()]+\)|\b\w+|[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/.test(allText(record)),
  LIMIT_LINEARIZED: (record) => /\bl[ií]m\s*(?:\(|\s)[A-Za-z]\s*→/i.test(allText(record)),
  INTEGRAL_LEGACY_BOUNDS: (record) => /∫(?:<sub>|[₀-₉₋]+|\s*_[^{])/.test(allText(record)),
  INTERNAL_TOKEN_VISIBLE: (record) => /<(?:span|div)\b|class\s*=|&lt;(?:span|div)\b/i.test(solutionText(record)),
  DETERMINANT_METHOD_INCOMPLETE: (record) => /determinante|\bdet\s*\(/i.test(allText(record)) && /desarroll(?:a|amos|ando).*fila|desarroll(?:a|amos|ando).*columna/i.test(allText(record)) && !/menor(?:es)? complementario|det\s*\(\[\[/i.test(Object.values(record.answers || {}).map((answer) => answer.solution).join('\n')),
  ROUCHE_FROBENIUS_MISSING: (record) => /discutir|compatibilidad|clasificar el sistema/i.test((record.exercise?.parts || []).flatMap((part) => part.paragraphs || []).map((node) => node.plain || node.html || '').join(' ')) && !/Rouch[eé][–-]?Frobenius/i.test(allText(record)),
  AREA_GRAPH_MISSING: (record) => /(?:área|recinto).*(?:limitad|encerrad)|(?:limitad|encerrad).*área/is.test(statementText(record)) && !/\[\[(?:area-graph-|official-solution-image)/i.test(solutionText(record)),
  NORMAL_METHOD_INCOMPLETE: (record) => /aproxim(?:ar|ando|ación).*normal|normal.*aproxim/is.test(allText(record)) && !/(?:μ\s*=\s*n\s*[·*]?\s*p|media\s+μ\s*=)/i.test(allText(record)),
  PHI_VISIBLE_IN_NORMAL: (record) => /aproxim(?:ar|ando|ación).*normal|normal.*aproxim/is.test(allText(record)) && /(?:Φ|\\Phi)\s*\(/.test(allText(record))
};

const findings = [];
const totals = {};
for (const courseId of courses) {
  const excluded = new Set(Object.keys(authored.exclusions?.[courseId] || {}));
  const enabledIds = new Set((bank[courseId] || []).map((item) => item.id).filter((id) => !excluded.has(id)));
  totals[courseId] = { enabledExercises: enabledIds.size, patterns: {} };
  for (const [exerciseId, record] of Object.entries(authored[courseId] || {})) {
    if (!enabledIds.has(exerciseId)) continue;
    for (const [pattern, detect] of Object.entries(definitions)) {
      if (!detect(record)) continue;
      findings.push({ courseId, exerciseId, pattern });
      totals[courseId].patterns[pattern] = (totals[courseId].patterns[pattern] || 0) + 1;
    }
  }
}

const result = {
  generatedAt: new Date().toISOString(),
  scope: 'Madrid · Matemáticas II y CCSS II · ejercicios habilitados',
  totals,
  findingsCount: findings.length
};
const suffix = process.argv.includes('--after') ? 'after' : 'before';
fs.writeFileSync(path.join(outDir, `${suffix}-pattern-census.json`), `${JSON.stringify(result, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, `${suffix}-pattern-findings.jsonl`), findings.map((item) => JSON.stringify(item)).join('\n') + '\n');
console.log(JSON.stringify(result, null, 2));

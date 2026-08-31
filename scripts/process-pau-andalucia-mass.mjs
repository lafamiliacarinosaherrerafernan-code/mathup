import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const args = new Map(process.argv.slice(2).map((value, index, all) => value.startsWith('--') ? [value, all[index + 1]] : [value, null]));
const outputDir = path.resolve(root, args.get('--output') || 'artifacts/pau-andalucia-mass-processing');

const BASE_PATH = path.join(root, 'artifacts', 'pau-canonical-andalucia-madrid', 'runs', 'run-a', 'andalucia-canonical-exercises.jsonl');
const OVERLAY_PATH = path.join(root, 'artifacts', 'pau-canonical-andalucia-ccssii-2012-integration', 'runs', 'run-a', 'andalucia-ccssii-2012-canonical-exercises.jsonl');
const OVERLAY_TAXONOMY_PATH = path.join(root, 'artifacts', 'pau-canonical-andalucia-ccssii-2012-integration', 'runs', 'run-a', 'taxonomy-and-delivery-mapping.jsonl');
const RUNTIME_PATH = path.join(root, 'data', 'andalucia-pau-runtime.js');
const SKILL_PATH = path.join(root, '.agents', 'skills', 'solucion-de-ejercicios', 'SKILL.md');

const SUBJECTS = {
  'Matemáticas II': '2bach-mates',
  'Matemáticas Aplicadas a las CCSS II': '2bach-ccss'
};

const MATES_TOPICS = [
  ['Matrices', 'Álgebra', /\bmatri(?:z|ces|cial)|rango de|traspuesta/i],
  ['Determinantes', 'Álgebra', /determinante|det\s*\(/i],
  ['Sistemas mediante determinantes', 'Álgebra', /sistema de ecuaciones|cramer|compatible|incompatible/i],
  ['Vectores en el espacio', 'Geometría', /\bvector(?:es)?\b|producto escalar|producto vectorial/i],
  ['Planos y rectas en el espacio', 'Geometría', /\bplano\b|\brecta\b|intersecci[oó]n.*(?:plano|recta)/i],
  ['Propiedades métricas', 'Geometría', /distancia|[aá]ngulo|perpendicular|ortogonal|sim[eé]tric/i],
  ['Límites', 'Análisis', /\bl[ií]mite|lim\s/i],
  ['Continuidad', 'Análisis', /continuidad|continua/i],
  ['Derivadas', 'Análisis', /\bderivad|f\s*[′']/i],
  ['Aplicaciones de derivadas', 'Análisis', /m[aá]ximo|m[ií]nimo|creciente|decreciente|tangente|optimiza/i],
  ['Integrales indefinidas', 'Análisis', /primitiva|integral indefinida|\bintegra\b/i],
  ['Integrales definidas', 'Análisis', /[aá]rea|integral definida|recinto/i],
  ['Probabilidad', 'Probabilidad y estadística', /probabilidad|suceso|bayes|urna|condicionada/i],
  ['Distribución binomial y normal', 'Probabilidad y estadística', /binomial|normal|tipificada|distribuci[oó]n/i]
];

const CCSS_TOPICS = [
  ['Matrices', 'Matrices', /\bmatri(?:z|ces|cial)|traspuesta|rango de/i],
  ['Determinantes', 'Matrices', /determinante|det\s*\(/i],
  ['Sistemas con determinantes', 'Sistemas y programación lineal', /sistema de ecuaciones|compatible|incompatible|cramer/i],
  ['Programación lineal', 'Sistemas y programación lineal', /programaci[oó]n lineal|regi[oó]n factible|funci[oó]n objetivo|restricciones/i],
  ['Límites y continuidad', 'Análisis', /\bl[ií]mite|continuidad|continua/i],
  ['Derivadas y aplicaciones', 'Análisis', /\bderivad|m[aá]ximo|m[ií]nimo|creciente|decreciente|tangente|optimiza/i],
  ['Integrales indefinidas', 'Análisis', /primitiva|integral indefinida|\bintegra\b/i],
  ['Integrales definidas', 'Análisis', /[aá]rea|integral definida|recinto/i],
  ['Probabilidad', 'Probabilidad o estadística', /probabilidad|suceso|bayes|urna|condicionada/i],
  ['Distribución binomial y normal', 'Probabilidad o estadística', /binomial|normal|tipificada|distribuci[oó]n/i],
  ['Muestreo e inferencia estadística', 'Probabilidad o estadística', /muestra|confianza|estimaci[oó]n|contraste|media poblacional/i]
];

function readJsonl(file) {
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  return value;
}

function stableText(value) {
  return JSON.stringify(stable(value));
}

function sha(value) {
  const input = typeof value === 'string' || Buffer.isBuffer(value) ? value : stableText(value);
  return crypto.createHash('sha256').update(input).digest('hex');
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function writeJsonl(file, rows) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${rows.map((row) => stableText(row)).join('\n')}\n`);
}

function loadRuntime() {
  const window = {};
  vm.runInNewContext(fs.readFileSync(RUNTIME_PATH, 'utf8'), { window }, { filename: 'data/andalucia-pau-runtime.js' });
  return window.ANDALUCIA_PAU_RUNTIME;
}

function overlayPrompt(row) {
  return (row.learnerContent || []).map((block) => {
    if (block.type === 'text') return block.text || '';
    if (block.type === 'math-equation3') return block.derived?.latex || block.latex || block.originalLiteral || `[Equation.3:${block.objectId}]`;
    if (block.type === 'paired-labeled-matrices') return block.historicalLiteral || '[paired-labeled-matrices]';
    return block.text || block.literal || '';
  }).join(' ').replace(/\s+/g, ' ').trim();
}

function canonicalPrompt(row) {
  return String(row.officialPrompt || overlayPrompt(row) || '').replace(/\s+/g, ' ').trim();
}

function classify(row, exactOverlayTaxonomy, runtimeRecord) {
  if (runtimeRecord) {
    return {
      courseId: runtimeRecord.subject === '2_bach_mates_ii' ? '2bach-mates' : '2bach-ccss',
      topic: runtimeRecord.primaryTopic,
      block: runtimeRecord.block,
      examSlot: runtimeRecord.examSlot,
      confidence: 'VERIFIED_RUNTIME',
      evidence: ['RUNTIME_PILOT_HUMAN_AND_MATHEMATICAL_VALIDATION']
    };
  }
  const mapped = exactOverlayTaxonomy.get(row.exerciseId);
  if (mapped?.taxonomy?.topics?.length) {
    const first = mapped.taxonomy.topics[0];
    return {
      courseId: mapped.taxonomy.courseId,
      topic: first.runtimeTopicLabel,
      block: first.blockLabel.replace(/^Bloque de /i, '').replace(/^Bloque /i, ''),
      examSlot: Number(row.questionKey) || null,
      confidence: 'DOCUMENTARY_RULE',
      evidence: (mapped.taxonomy.classificationEvidence || []).map((item) => item.rule)
    };
  }
  const prompt = canonicalPrompt(row);
  const definitions = row.subject === 'Matemáticas II' ? MATES_TOPICS : CCSS_TOPICS;
  const hits = definitions.filter(([, , regex]) => regex.test(prompt));
  const selected = hits[0];
  const numericQuestion = Number(String(row.questionKey || '').match(/\d+/)?.[0]) || null;
  const slots = row.subject === 'Matemáticas II' ? 5 : 4;
  return {
    courseId: SUBJECTS[row.subject],
    topic: selected?.[0] || 'Pendiente de clasificación documental',
    block: selected?.[1] || 'Pendiente de clasificación documental',
    examSlot: numericQuestion && numericQuestion <= slots ? numericQuestion : null,
    confidence: hits.length === 1 ? 'LEXICAL_UNAMBIGUOUS' : 'REVIEW_REQUIRED',
    evidence: hits.length ? hits.map(([topic]) => `KEYWORD_MATCH:${topic}`) : ['NO_UNAMBIGUOUS_TAXONOMY_EVIDENCE']
  };
}

function normalizeOption(value) {
  return String(value || '').replace(/\\\(|\\\)|\s+/g, '').toLowerCase();
}

function validateEnabled(row, runtime) {
  const errors = [];
  if (!row.parts?.length) errors.push('NO_PARTS');
  for (const part of row.parts || []) {
    const options = [part.semanticAnswer, ...(part.distractors || [])];
    if (!part.semanticAnswer) errors.push('ANSWER_MISSING');
    if ((part.distractors || []).length !== 3) errors.push('DISTRACTOR_COUNT_NOT_THREE');
    if (new Set(options.map(normalizeOption)).size !== 4) errors.push('OPTIONS_NOT_SEMANTICALLY_DISTINCT_LITERAL');
    if (!part.solutionSteps?.length || !part.finalAnswer) errors.push('PEDAGOGICAL_SOLUTION_INCOMPLETE');
    const delivery = runtime.materializePart(part, `mass-check|${row.exerciseId}|${part.id}`);
    if (delivery.options.length !== 4 || new Set(delivery.options).size !== 4) errors.push('DELIVERY_OPTIONS_INVALID');
    if (delivery.options[delivery.correct] !== part.semanticAnswer) errors.push('DELIVERY_CORRECT_ANSWER_MISMATCH');
  }
  return [...new Set(errors)];
}

function structuralIssues(row, prompt) {
  const issues = [];
  if (!prompt) issues.push('OFFICIAL_PROMPT_EMPTY');
  if (/\bundefined\b/i.test(prompt)) issues.push('UNDEFINED_VISIBLE_IN_CANONICAL_PROMPT');
  if (/\\\(|\\\)|\\frac|\\sqrt|\\begin\{|\\end\{/.test(prompt)) issues.push('RAW_LATEX_OR_DELIMITER_IN_SOURCE_PROMPT');
  if (/\[object Object\]|"(?:type|children|schemaVersion)"\s*:/.test(prompt)) issues.push('SERIALIZED_OBJECT_IN_SOURCE_PROMPT');
  if (/\(\s*\d+(?:[,.]\d+)?\s*puntos?\s*\)/i.test(prompt)) issues.push('PAU_SCORE_EMBEDDED_IN_PROMPT');
  if ((row.statusFlags || []).some((flag) => /REVIEW_REQUIRED/.test(flag))) issues.push('SOURCE_REVIEW_FLAG_PRESENT');
  return issues;
}

function sourceBlockingIssues(issues) {
  return issues.filter((issue) => [
    'OFFICIAL_PROMPT_EMPTY',
    'UNDEFINED_VISIBLE_IN_CANONICAL_PROMPT',
    'SERIALIZED_OBJECT_IN_SOURCE_PROMPT'
  ].includes(issue));
}

function pendingWork(runtimeRecord, taxonomy, issues) {
  if (runtimeRecord) return [];
  const work = [
    'SOLVE_WITH_VALIDATED_SOLUTION_SKILL',
    'INDEPENDENT_MATHEMATICAL_VERIFICATION',
    'GENERATE_AND_VALIDATE_THREE_PLAUSIBLE_DISTRACTORS',
    'GENERATE_AND_VALIDATE_PEDAGOGICAL_SOLUTION',
    'VALIDATE_FINAL_STUDENT_RENDERING'
  ];
  if (taxonomy.confidence === 'REVIEW_REQUIRED') work.push('COMPLETE_TAXONOMY_CLASSIFICATION');
  if (issues.includes('RAW_LATEX_OR_DELIMITER_IN_SOURCE_PROMPT')) work.push('NORMALIZE_MATHEMATICAL_REPRESENTATION');
  if (issues.includes('PAU_SCORE_EMBEDDED_IN_PROMPT')) work.push('REMOVE_SCORE_FROM_LEARNER_CONTENT_PRESERVING_SCORE_EVIDENCE');
  return work.sort();
}

function increment(target, key) {
  target[key] = (target[key] || 0) + 1;
}

const base = readJsonl(BASE_PATH);
const overlay = readJsonl(OVERLAY_PATH);
const overlayTaxonomy = new Map(readJsonl(OVERLAY_TAXONOMY_PATH).map((row) => [row.exerciseId, row]));
const runtime = loadRuntime();
const solutionSkillContractHash = sha(fs.readFileSync(SKILL_PATH));
const runtimeById = new Map(runtime.exercises.map((row) => [row.exerciseId, row]));
const canonical = [...base, ...overlay];
if (process.argv.includes('--reverse')) canonical.reverse();
const seen = new Set();
const rows = [];

for (const source of canonical) {
  if (seen.has(source.exerciseId)) throw new Error(`Identidad duplicada: ${source.exerciseId}`);
  seen.add(source.exerciseId);
  const prompt = canonicalPrompt(source);
  const runtimeRecord = runtimeById.get(source.exerciseId) || null;
  const taxonomy = classify(source, overlayTaxonomy, runtimeRecord);
  const blockers = [];
  const issues = structuralIssues(source, prompt);
  if (runtimeRecord) blockers.push(...validateEnabled(runtimeRecord, runtime));
  // Las incidencias de la evidencia canónica se conservan como diagnóstico. En los
  // 28 casos del piloto, la publicación paralela usa una representación revisada y
  // saneada distinta del literal histórico, por lo que este último no bloquea el
  // registro si la entrega runtime supera sus propias validaciones.
  if (!runtimeRecord) blockers.push(...sourceBlockingIssues(issues));
  const work = pendingWork(runtimeRecord, taxonomy, issues);
  const enabled = Boolean(runtimeRecord) && blockers.length === 0;
  const processingState = enabled
    ? 'ENABLED_AFTER_FULL_VALIDATION'
    : blockers.length
      ? 'SOURCE_REVIEW_REQUIRED'
      : 'RESOLUTION_PENDING';
  rows.push({
    exerciseId: source.exerciseId,
    schemaVersion: source.schemaVersion,
    sourceLayer: overlay.includes(source) ? 'CCSSII_2012_DOCUMENT_OVERLAY' : 'ANDALUCIA_CANONICAL_BASE',
    subject: source.subject,
    courseId: SUBJECTS[source.subject],
    year: source.year,
    sitting: source.sitting ?? null,
    roleOrModel: source.andaluciaRole ?? source.model ?? null,
    questionKey: source.questionKey ?? null,
    documentId: source.documentId,
    documentHash: source.documentHash,
    promptHash: sha(prompt),
    sourceRecordIds: source.sourceRecordIds || [],
    taxonomy,
    processingState,
    enabled,
    blockerCodes: [...new Set(blockers)].sort(),
    pendingWorkCodes: work,
    diagnosticCodes: [...new Set(issues)].sort(),
    provenanceAuthority: source.provenance?.authority || source.provenance?.document?.authority || null,
    solutionSkillContractHash,
    contentMutationPerformed: false,
    generatedAnswer: false,
    generatedSolution: false,
    generatedDistractors: false
  });
}

rows.sort((a, b) => a.exerciseId.localeCompare(b.exerciseId));
const enabledRows = rows.filter((row) => row.enabled);
const blockedRows = rows.filter((row) => row.processingState === 'SOURCE_REVIEW_REQUIRED');
const pendingRows = rows.filter((row) => row.processingState === 'RESOLUTION_PENDING');
const breakdown = { bySubject: {}, byYear: {}, byTopic: {}, byBlock: {}, byState: {} };
for (const row of rows) {
  increment(breakdown.bySubject, row.subject);
  increment(breakdown.byYear, String(row.year));
  increment(breakdown.byTopic, `${row.subject} | ${row.taxonomy.topic}`);
  increment(breakdown.byBlock, `${row.subject} | ${row.taxonomy.block}`);
  increment(breakdown.byState, row.processingState);
}
const blockerCounts = {};
for (const row of blockedRows) for (const code of row.blockerCodes) increment(blockerCounts, code);
const pendingWorkCounts = {};
for (const row of pendingRows) for (const code of row.pendingWorkCodes) increment(pendingWorkCounts, code);

const summary = {
  schemaVersion: 'mathup.pau-andalucia-mass-processing-summary.v2',
  scope: 'PARALLEL_NON_PUBLISHED',
  inputs: {
    canonicalBase: { records: base.length, sha256: sha(fs.readFileSync(BASE_PATH)) },
    ccssii2012Overlay: { records: overlay.length, sha256: sha(fs.readFileSync(OVERLAY_PATH)) },
    runtimePilot: { enabledRecords: runtime.exercises.length, sha256: sha(fs.readFileSync(RUNTIME_PATH)) },
    solutionSkillContract: { path: '.agents/skills/solucion-de-ejercicios/SKILL.md', sha256: solutionSkillContractHash }
  },
  totals: {
    canonical: rows.length,
    processed: rows.length,
    mathematicsII: rows.filter((row) => row.subject === 'Matemáticas II').length,
    ccssII: rows.filter((row) => row.subject === 'Matemáticas Aplicadas a las CCSS II').length,
    enabled: enabledRows.length,
    resolutionPending: pendingRows.length,
    sourceReviewRequired: blockedRows.length,
    processedNotEnabled: pendingRows.length + blockedRows.length,
    years2010To2026: rows.filter((row) => row.year >= 2010 && row.year <= 2026).length,
    years2000To2009: rows.filter((row) => row.year >= 2000 && row.year <= 2009).length
  },
  blockerCounts,
  pendingWorkCounts,
  caveat: 'La ausencia histórica de respuesta, solución o distractores no bloquea ni excluye: crea trabajo de resolución pendiente. Solo una deficiencia real del enunciado oficial figura como bloqueo. Habilitar exige completar y verificar matemáticamente ese trabajo.',
  productionConnected: false,
  contentGeneratedForUnverifiedRecords: false
};

const semanticHash = sha({ summary, rows, breakdown });
writeJson(path.join(outputDir, 'summary.json'), { ...summary, semanticHash });
writeJsonl(path.join(outputDir, 'processing-ledger.jsonl'), rows);
writeJsonl(path.join(outputDir, 'blockers.jsonl'), blockedRows.map((row) => ({ exerciseId: row.exerciseId, subject: row.subject, year: row.year, taxonomy: row.taxonomy, blockerCodes: row.blockerCodes })));
writeJsonl(path.join(outputDir, 'resolution-queue.jsonl'), pendingRows.map((row) => ({ exerciseId: row.exerciseId, subject: row.subject, year: row.year, taxonomy: row.taxonomy, pendingWorkCodes: row.pendingWorkCodes, promptHash: row.promptHash, solutionSkillContractHash: row.solutionSkillContractHash })));
writeJson(path.join(outputDir, 'coverage-by-subject-year-topic-block.json'), breakdown);
writeJson(path.join(outputDir, 'enabled-regression.json'), {
  total: enabledRows.length,
  exerciseIds: enabledRows.map((row) => row.exerciseId),
  runtimeHash: sha(fs.readFileSync(RUNTIME_PATH)),
  validation: 'FOUR_OPTIONS_ONE_CORRECT_PEDAGOGICAL_SOLUTION_DETERMINISTIC_SHUFFLE'
});
writeJson(path.join(outputDir, 'reproducibility.json'), {
  semanticHash,
  algorithm: 'stable-json-sha256',
  orderInvariant: true,
  rollback: 'Delete this derived artifact directory; no production or canonical input is modified.'
});

console.log(JSON.stringify({ ...summary.totals, semanticHash, outputDir }, null, 2));

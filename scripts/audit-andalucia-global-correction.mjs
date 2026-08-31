import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'artifacts', 'andalucia-global-correction');
fs.mkdirSync(outDir, { recursive: true });

const window = {};
for (const relative of ['data/andalucia-user-source-index.js', 'data/andalucia-pau-runtime.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, relative), 'utf8'), { window }, { filename: relative });
}
const runtime = window.ANDALUCIA_PAU_RUNTIME;
const sources = window.ANDALUCIA_USER_SOURCE_INDEX;
const canonicalFiles = [
  'artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl',
  'artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl'
];
const canonicalById = new Map(canonicalFiles.flatMap((relative) => fs.existsSync(path.join(root, relative))
  ? fs.readFileSync(path.join(root, relative), 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse)
  : []).map((row) => [row.exerciseId, row]));

const topicNames = {
  '2_bach_mates_ii': ['Matrices', 'Determinantes', 'Sistemas con determinantes', 'Vectores en el espacio', 'Planos y rectas en el espacio', 'Propiedades métricas', 'Límite de sucesiones y funciones', 'Continuidad', 'Derivadas', 'Aplicación de derivadas', 'Integrales indefinidas', 'Integrales definidas', 'Probabilidad', 'Distribución binomial y normal'],
  '2_bach_ccss_ii': ['Matrices', 'Determinantes', 'Sistemas con determinantes', 'Programación lineal', 'Límites y continuidad', 'Derivadas y aplicaciones', 'Integrales indefinidas', 'Integrales definidas', 'Probabilidad', 'Distribución binomial y normal', 'Muestreo e inferencia estadística']
};

function normalized(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function originalPartLabels(prompt) {
  const labels = [...String(prompt ?? '').matchAll(/(?:^|\s)(?:\()?([a-f])\s*(?:\)|[.:-])\s*/g)].map((match) => match[1]);
  const firstA = labels.indexOf('a');
  if (firstA < 0) return [];
  const sequence = [];
  for (const label of labels.slice(firstA)) {
    const expected = String.fromCharCode(97 + sequence.length);
    if (label === expected) sequence.push(label);
    else if (sequence.includes(label)) continue;
    else break;
  }
  return sequence;
}

function canonicalPartLabels(exercise) {
  return (exercise.parts || []).map((part, index) => {
    const match = String(part.label || '').match(/([a-f])/i);
    return match ? match[1].toLowerCase() : index === 0 ? 'whole' : `part-${index + 1}`;
  });
}

function inferTopic(exercise) {
  const text = normalized([exercise.sourceProjection?.full, exercise.officialPromptLiteral, exercise.learnerStatement, ...(exercise.parts || []).map((part) => part.text)].join(' '));
  const legacyLabel = normalized(exercise.primaryTopic || exercise.topic || '');
  const mates = exercise.subject === '2_bach_mates_ii';
  const candidates = [];
  const add = (index, reason, weight = 1) => candidates.push({ index, reason, weight });
  if (exercise.exerciseId === 'pau-user-and-9f7a7d105784b2610a51eed2db70') add(6, 'SOURCE_REVIEWED_ASYMPTOTE_LIMIT', 16);
  if (mates && /(?:a\s*=\s*)?matrix\s*\{|matri(?:z|ces).{0,80}(?:inversa|ecuaci[oó]n)|\ba\s*(?:\^\s*[-−]?\s*1|⁻¹)|\bax\s*=/.test(text)) add(0, 'EXPLICIT_MATRIX_OPERATION', 16);
  if (/distribucion\s+(?:binomial|normal)|tipific|variable aleatoria normal|aproximacion.*normal/.test(text)) add(mates ? 13 : 9, 'DISTRIBUTION', 12);
  if (!mates && /intervalo de confianza|tamano muestral|media muestral|muestreo|nivel de confianza|error de estimacion/.test(text)) add(10, 'INFERENCE', 14);
  if (/probabilidad|sucesos?|urna|bolas?|bayes|independient|p\s*\(/.test(text)) add(mates ? 12 : 8, 'PROBABILITY', 8);
  if (/area\s+(?:limitada|encerrada)|integral definida|calcule el area|∫.*(?:_\{|_[0-9])/.test(text)) add(mates ? 11 : 7, 'DEFINITE_INTEGRAL', 11);
  if (/primitiva|integral indefinida|integre|calcule la integral/.test(text)) add(mates ? 10 : 6, 'INDEFINITE_INTEGRAL', 8);
  if (/maxim|minim|crecimiento|decrecimiento|monotoni|optim|extremos?|concav|convex|inflexion/.test(text)) add(mates ? 9 : 5, 'DERIVATIVE_APPLICATION', 10);
  if (/derivada|derivable|recta tangente|tangente horizontal|derivabilidad/.test(text)) add(mates ? 8 : 5, 'DERIVATIVE', 8);
  if (/continuidad|continua|discontinuidad/.test(text)) add(mates ? 7 : 4, 'CONTINUITY', 9);
  if (/\blim(?:ite)?\b|x\s*[→-]>|sucesion|as.{0,2}intota/.test(text)) add(mates ? 6 : 4, 'LIMIT', 7);
  if (mates && /distancia|angulo|perpendicular|simetric|proyeccion|volumen|area de.*triangulo|producto (?:escalar|mixto)/.test(text)) add(5, 'METRIC_GEOMETRY', 13);
  if (mates && /plano|recta\s+[rsei](?:\s|:|=)|posicion relativa|interseccion de.*planos/.test(text)) add(4, 'LINES_PLANES', 12);
  if (mates && /vector|vectores|dependencia lineal|base de r3|producto vectorial/.test(text)) add(3, 'VECTORS', 10);
  if (/programacion lineal|region factible|funcion objetivo|restricciones/.test(text)) add(mates ? 2 : 3, 'LINEAR_PROGRAMMING', 15);
  if (/discuta|discutir|rouche|sistema.*parametro|segun los valores|compatible determinado|compatible indeterminado|incompatible/.test(text)) add(2, 'PARAMETRIC_SYSTEM', 14);
  if (/precio de cada|cantidad(?:es)? de cada|cu[aá]nt[oa]s?.{0,40}de cada|plante[ae].{0,30}sistema|resuelv[ae].{0,30}sistema/.test(text)) add(2, 'LINEAR_SYSTEM_MODEL', 13);
  if (/determinante|rango|cofactor|adjunta|menor de orden/.test(text)) add(1, 'DETERMINANTS', 10);
  if (/matri(?:z|ces)|ecuacion matricial|a\^?-?1/.test(text)) add(0, 'MATRICES', 8);
  if (!candidates.length && mates) {
    const fallback = [
      [/distribucion.*(?:binomial|normal)|\bnormal\b|\bbinomial\b/, 13, 'LEGACY_DISTRIBUTION_LABEL'],
      [/probabilidad/, 12, 'LEGACY_PROBABILITY_LABEL'],
      [/area|integral definida/, 11, 'LEGACY_DEFINITE_INTEGRAL_LABEL'],
      [/integral|integracion|primitiva|cambio de variable|sustitucion/, 10, 'LEGACY_INDEFINITE_INTEGRAL_LABEL'],
      [/aplicacion|optimiz|extremo|monotoni|estudio de funciones/, 9, 'LEGACY_DERIVATIVE_APPLICATION_LABEL'],
      [/deriv|tangente|determinacion de.*funcion|polinomio/, 8, 'LEGACY_DERIVATIVE_LABEL'],
      [/continui/, 7, 'LEGACY_CONTINUITY_LABEL'],
      [/limit|asintot|sucesion|exponencial/, 6, 'LEGACY_LIMIT_LABEL'],
      [/metric|distancia|angulo|volumen|perpendicular|simetri/, 5, 'LEGACY_METRIC_LABEL'],
      [/plano|recta|geometria afin/, 4, 'LEGACY_LINES_PLANES_LABEL'],
      [/vector/, 3, 'LEGACY_VECTOR_LABEL'],
      [/sistema|cifras|diofant/, 2, 'LEGACY_SYSTEM_LABEL'],
      [/determinante/, 1, 'LEGACY_DETERMINANT_LABEL'],
      [/matri/, 0, 'LEGACY_MATRIX_LABEL']
    ].find(([pattern]) => pattern.test(legacyLabel));
    if (fallback) add(fallback[1], fallback[2], 6);
  }
  if (!candidates.length) return { topicIndex: null, topicName: null, reason: 'NO_CONFIDENT_RULE', confidence: 0 };
  candidates.sort((a, b) => b.weight - a.weight || a.index - b.index);
  const best = candidates[0];
  return { topicIndex: best.index, topicName: topicNames[exercise.subject]?.[best.index] || null, reason: best.reason, confidence: best.weight };
}

const partAudit = [];
const classificationAudit = [];
for (const exercise of runtime.exercises) {
  const source = sources[exercise.documentHash] || null;
  const canonicalSource = canonicalById.get(exercise.exerciseId);
  const sourcePrompt = canonicalSource?.officialPrompt || exercise.sourceProjection?.full || exercise.officialPromptLiteral;
  const promptLabels = originalPartLabels(sourcePrompt);
  const catalogLabels = canonicalSource?.subparts?.map((part) => String(part.label || '').match(/[a-f]/i)?.[0]?.toLowerCase()).filter(Boolean) || [];
  const originals = promptLabels.length >= catalogLabels.length ? promptLabels : catalogLabels;
  const canonical = canonicalPartLabels(exercise);
  const hasExplicitSourceParts = originals.length > 0;
  const expectedCount = hasExplicitSourceParts ? originals.length : canonical.length === 1 ? 1 : null;
  const status = expectedCount == null
    ? 'SOURCE_PART_COUNT_UNVERIFIED'
    : canonical.length === expectedCount
      ? 'MATCH'
      : canonical.length < expectedCount
        ? 'OMITTED_OR_FUSED_PARTS'
        : 'DUPLICATED_OR_WRONG_EXERCISE_PARTS';
  partAudit.push({
    file: source?.fileName || null,
    documentHash: exercise.documentHash,
    exerciseId: exercise.exerciseId,
    questionKey: exercise.questionKey ?? null,
    originalPartLabels: originals.length ? originals : null,
    originalPartCount: expectedCount,
    canonicalPartLabels: canonical,
    canonicalPartCount: canonical.length,
    status
  });

  const inferred = inferTopic(exercise);
  const currentIndexes = Array.isArray(exercise.topicIndexes) ? exercise.topicIndexes : [];
  classificationAudit.push({
    exerciseId: exercise.exerciseId,
    file: source?.fileName || null,
    subject: exercise.subject,
    currentPrimaryTopic: exercise.primaryTopic || exercise.topic || null,
    currentTopicIndexes: currentIndexes,
    inferredTopic: inferred.topicName,
    inferredTopicIndex: inferred.topicIndex,
    inferenceReason: inferred.reason,
    inferenceConfidence: inferred.confidence,
    status: inferred.topicIndex == null ? 'REVIEW_REQUIRED' : currentIndexes.includes(inferred.topicIndex) ? 'MATCH' : 'DISAGREEMENT'
  });
}

function writeJsonl(name, rows) {
  fs.writeFileSync(path.join(outDir, name), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
}
writeJsonl('file-exercise-part-counts.jsonl', partAudit);
writeJsonl('classification-comparison.jsonl', classificationAudit);

const summary = {
  schemaVersion: 'mathup.andalucia-global-correction-audit.v1',
  suppliedDocuments: Object.keys(sources).length,
  runtimeExercises: runtime.exercises.length,
  runtimeParts: runtime.exercises.reduce((sum, exercise) => sum + exercise.parts.length, 0),
  partAudit: Object.fromEntries(['MATCH', 'OMITTED_OR_FUSED_PARTS', 'DUPLICATED_OR_WRONG_EXERCISE_PARTS', 'SOURCE_PART_COUNT_UNVERIFIED'].map((status) => [status, partAudit.filter((row) => row.status === status).length])),
  classificationAudit: Object.fromEntries(['MATCH', 'DISAGREEMENT', 'REVIEW_REQUIRED'].map((status) => [status, classificationAudit.filter((row) => row.status === status).length])),
  unsafeExerciseIds: [...new Set([
    ...partAudit.filter((row) => ['OMITTED_OR_FUSED_PARTS', 'DUPLICATED_OR_WRONG_EXERCISE_PARTS'].includes(row.status)).map((row) => row.exerciseId),
    ...classificationAudit.filter((row) => row.status === 'REVIEW_REQUIRED').map((row) => row.exerciseId)
  ])]
};
fs.writeFileSync(path.join(outDir, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({ ...summary, unsafeExerciseIds: summary.unsafeExerciseIds.length }, null, 2));

export { originalPartLabels, inferTopic };

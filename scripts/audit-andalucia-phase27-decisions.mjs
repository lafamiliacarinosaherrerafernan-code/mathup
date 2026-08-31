import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const sourcePath = path.join(root, 'artifacts', 'andalucia-selector-fase2.6', 'topic-classification-investigation.json');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const out = path.join(root, 'artifacts', 'andalucia-topic-classification-phase2.7');
fs.mkdirSync(out, { recursive: true });

const normalize = (value) => String(value || '').normalize('NFKC').toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
const summary = (value, limit = 260) => {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  return text.length <= limit ? text : `${text.slice(0, limit - 1)}…`;
};
const uniqueTopics = (values) => [...new Set(values.filter(Boolean))];

const matesDecisions = Object.freeze({
  'pau-can-ex-0a54b6c9229aa2af11edf37a3ac11cce': [1, 'DETERMINANT_TASK_ONLY', 'Los dos apartados piden calcular determinantes mediante sus propiedades.'],
  'pau-can-ex-15b18abbf75f66f3cf020e9b2b8a9f1e': [1, 'DETERMINANT_PROPERTIES_AND_PARAMETER', 'Todos los apartados trabajan determinantes, sus propiedades o el parámetro impuesto por det(2A)=8.'],
  'pau-can-ex-1848205b9f0fd7e0efd9054c86c2abb4': [1, 'DETERMINANT_PROPERTIES', 'El ejercicio completo pide determinantes de transformaciones, inversas y potencias.'],
  'pau-can-ex-1e638fc950ad6e4e86a7': [0, 'MATRIX_TASK_DOMINANT', 'Identificador histórico no vigente; no aplicar una corrección automática.'],
  'pau-can-ex-1e638fc950ad3b0c6b4a7ee93c868591': [0, 'MATRIX_TASK_DOMINANT', 'Dos apartados piden inversa y ecuación matricial; el determinante aparece en un apartado secundario.'],
  'pau-can-ex-307a9ea16dd8354aca0d911300a546b4': [0, 'MATRIX_CHARACTERIZATION', 'La tarea es determinar matrices X sujetas a traza, determinante y conmutación; no calcular un determinante como fin principal.'],
  'pau-can-ex-3f08d240184a58eda2a3571bb46e86a7': [1, 'DETERMINANT_PROPERTIES', 'Los cuatro apartados calculan determinantes mediante propiedades.'],
  'pau-can-ex-491d28ac43c479a0e453a4f42ce12267': [0, 'MIXED_MATRIX_EQUATIONS', 'Combina el determinante de una incógnita matricial con una ecuación matricial; el objeto principal son las matrices incógnita.'],
  'pau-can-ex-6eb84eba9ca62e6e56d522590c0d7f40': [0, 'MIXED_MATRIX_POWERS', 'El primer apartado pide potencias matriciales y el segundo un determinante; el contenido global es matricial.'],
  'pau-can-ex-784fea768de49549c8737f4d193abbdb': [1, 'DETERMINANT_PROPERTIES', 'Los dos apartados piden exclusivamente calcular determinantes transformados.'],
  'pau-can-ex-7c999d34581bf01a7cdca9fee2eaf8a5': [0, 'MIXED_MATRIX_EQUATION', 'La ecuación matricial y el determinante de una expresión son contenidos equilibrados; se mantiene el objeto principal Matrices.'],
  'pau-can-ex-8e33112cd806bb32ba73ddcd003921e7': [1, 'DETERMINANT_PROPERTIES', 'Todos los apartados calculan determinantes a partir de propiedades.'],
  'pau-can-ex-a6f2ab821f9c1fd93f1bd8be32eb18ba': [0, 'MATRIX_PARAMETER_PROPERTIES', 'Se estudian rango, idempotencia, invertibilidad y determinante de una matriz; el núcleo es caracterizar la matriz según k.'],
  'pau-can-ex-b720b19f9e71a343fe7b10c45ddd7ff5': [1, 'DETERMINANT_PROPERTIES', 'El ejercicio algebraico pide determinantes y propiedades; el texto geométrico posterior pertenece a otro ejercicio de la fuente.'],
  'pau-user-and-afbdd9b31ce80ef1fa33f85c11c4': [2, 'PARAMETRIC_SYSTEM_AFTER_RANK', 'El rango se calcula para decidir después la existencia de soluciones del sistema; la finalidad global es discutir el sistema.'],
  'pau-user-and-165a1fe8f46a235e4d1814761fb2': [0, 'MIXED_MATRIX_EQUATION', 'Un apartado usa determinantes y otro resuelve la ecuación matricial AXB=C; el objeto principal es la matriz X.']
});

const topicNames = {
  0: 'Matrices', 1: 'Determinantes', 2: 'Resolución de sistemas con determinantes'
};
const determinantCandidates = source.determinantReview.candidatesOutsideDeterminants;
const mates = determinantCandidates.filter((row) => row.subject === 'Matemáticas II' && row.confidence === 'INEQUIVOCO').map((row) => {
  const decision = matesDecisions[row.exerciseId];
  if (!decision) throw new Error(`Falta decisión Mates II para ${row.exerciseId}`);
  return {
    exerciseId: row.exerciseId,
    file: row.file,
    officialPrompt: row.officialPrompt,
    promptSummary: summary(row.officialPrompt),
    previousPrimaryTopic: row.currentPrimaryTopic,
    newPrimaryTopicIndex: decision[0],
    newPrimaryTopic: topicNames[decision[0]],
    reasonCode: decision[1],
    reason: decision[2],
    secondaryTopics: uniqueTopics([
      ...(row.secondaryTopics || []),
      decision[0] !== row.currentPrimaryTopicIndex ? row.currentPrimaryTopic : null
    ]).filter((topic) => topic !== topicNames[decision[0]])
  };
});

const ccss = determinantCandidates.filter((row) => row.subject === 'CCSS II').map((row) => ({
  exerciseId: row.exerciseId,
  file: row.file,
  officialPrompt: row.officialPrompt,
  promptSummary: summary(row.officialPrompt),
  previousPrimaryTopic: row.currentPrimaryTopic,
  newPrimaryTopicIndex: 0,
  newPrimaryTopic: 'Matrices',
  reasonCode: 'MATRIX_TASK_WITH_OPTIONAL_DETERMINANT_METHOD',
  reason: 'El enunciado pide operaciones, inversa, invertibilidad o ecuación matricial y no prescribe menores/determinantes como tarea principal.',
  secondaryTopics: uniqueTopics(row.secondaryTopics || []).filter((topic) => topic !== 'Matrices')
}));

function statisticsDecision(row) {
  const text = normalize(row.officialPrompt);
  const evidence = [];
  const retainedSecondaryTopics = uniqueTopics(row.secondaryTopics || []).filter((topic) =>
    !/condicion|bayes|probabilidad total|independencia|probabilidad general|binomial/i.test(topic)
  );
  if (/\bindependien/.test(text)) evidence.push('independencia solicitada');
  if (/\bprobabilidad condicionada\b|\bcondicionad[ao]s?\b/.test(text)) evidence.push('probabilidad condicionada explícita');
  if (/\bsabiendo que\b|\bsi (?:se sabe|sabemos|ha |es |son |resulta|ocurre|ocurrio|observa|observamos|sale |salio |suena|no |pertenece|procede|proviene|tiene |tienen |fue |fuera |apoya|aprueba|trabaja|esta |se etiqueta)/.test(text)) evidence.push('condición verbal solicitada');
  if (/\bde entre (?:los|las)\b|\bentre (?:los|las) que\b|\ben caso de\b/.test(text)) evidence.push('selección condicionada de una subpoblación');
  if (/\bbayes\b/.test(text)) evidence.push('Bayes explícito');
  if (/\bprobabilidad total\b/.test(text)) evidence.push('probabilidad total explícita');
  if (/p\s*\([^)]*(?:\||\/)[^)]*\)/.test(text)) evidence.push('notación condicionada');

  const stagedExperiment = /\b(?:urna|caja|maquina|agencia|marca|modelo|camion|persona|fabrica|proveedor|centro|grupo|tipo)\b/.test(text)
    && /\b(?:si sale|se elige|elegid[ao]|extrae|procede|fabrica|realiza|produce|pertenece)\b/.test(text)
    && /\b(?:porcentaje|%|probabilidad)\b/.test(text);
  const conditionalRates = /\b(?:de los|de las|entre los|entre las)\b[^.]{0,120}\b(?:%|probabilidad)\b/.test(text)
    || /\b(?:el|la)\s+\d+(?:[,.]\d+)?\s*%\s+de\b/.test(text);
  const multipleBranches = /\b(?:primera|segunda|tercera|a, b y c|tipos? [abc]|modelos? [abc]|urnas? [ab])\b/.test(text);
  if (stagedExperiment && (conditionalRates || multipleBranches)) evidence.push('experimento por ramas con probabilidades condicionadas');

  // Decisión documental, no léxica: estos son los únicos casos de los 103
  // revisados cuya tarea completa es probabilidad general/combinatoria. El
  // resto pide de forma principal condicionamiento, independencia o el
  // teorema de la probabilidad total, aunque no use esas palabras literales.
  const generalExerciseIds = new Set([
    'pau-can-ex-75b2c4f2d79a4fb88dcef8736c477f3e',
    'pau-can-ex-0473b80aadd5cbf06c72f58627758f58',
    'pau-can-ex-6d8082348ae007a104f6fc2839d429ea',
    'pau-can-ex-9a24ee1b0d63d127f09a2e93c8ea4813',
    'pau-can-ex-9c35f76237632a0926819a8fdd50bb80',
    'pau-can-ex-b9f55a4386fccb5e9c27a013c5aeed6f',
    'pau-can-ex-bc99f6395d0626063c11bbddf1275a40',
    'pau-can-ex-bf277a6bfa3bd2f223c3910cb6d09328',
    'pau-can-ex-c55ab3c9462088e823ef5d2ffa3daa2e',
    'pau-can-ex-db6503f633e652019fd0e00f06354982'
  ]);
  const family = row.exerciseId === 'pau-can-ex-9e2505e450a27ce3c4e965b31767aef7'
    ? 'binomial'
    : generalExerciseIds.has(row.exerciseId)
      ? 'probabilidad-general'
      : 'probabilidad-condicional-bayes-total';
  if (family === 'probabilidad-condicional-bayes-total' && evidence.length === 0) {
    evidence.push('decisión documental: condicionamiento, independencia o probabilidad total como tarea principal');
  }
  if (family === 'binomial') evidence.push('20 ensayos de Bernoulli, número de éxitos y valor esperado');
  const secondaryTopics = family === 'binomial'
    ? uniqueTopics([...retainedSecondaryTopics, 'Binomial'])
    : family === 'probabilidad-general'
      ? uniqueTopics([...retainedSecondaryTopics, 'Probabilidad general'])
    : uniqueTopics([
        ...retainedSecondaryTopics,
        /\bindependien/.test(text) ? 'Independencia' : null,
        /\bbayes\b|\bsi (?:se sabe|sabemos|ha |es |son |resulta|ocurre|observa|sale |suena|no |pertenece|procede|proviene|tiene |fue |apoya|aprueba|trabaja|esta )|\bde entre\b|\bentre (?:los|las) que\b/.test(text) ? 'Probabilidad condicionada' : null,
        stagedExperiment || /\bprobabilidad total\b/.test(text) ? 'Probabilidad total' : null,
        'Probabilidad condicionada'
      ]);
  return { family, evidence, secondaryTopics };
}

const statisticalCandidates = source.statisticalClassification.rows
  .filter((row) => row.metadataConditional && !row.strongPromptEvidence)
  .map((row) => ({
    exerciseId: row.exerciseId,
    file: row.file,
    officialPrompt: row.officialPrompt,
    promptSummary: summary(row.officialPrompt),
    previousPrimaryTopic: row.currentPrimaryTopic,
    newPrimaryTopic: row.exerciseId === 'pau-can-ex-9e2505e450a27ce3c4e965b31767aef7'
      ? 'Distribución binomial y normal'
      : row.currentPrimaryTopic,
    previousSecondaryTopics: row.secondaryTopics,
    ...statisticsDecision(row)
  }));

const vectorCandidateDecisions = Object.freeze({
  'pau-can-ex-0cd5847ec45e87f2932827c5788fbd7f': [5, 'Propiedades métricas', 'El enunciado estudia intersección y perpendicularidad entre rectas; los vectores son una representación auxiliar.'],
  'pau-can-ex-401cdd7a3d79b330c3405ea124591660': [5, 'Propiedades métricas', 'La tarea es construir una recta y un plano con condiciones de perpendicularidad; no estudiar vectores como objeto principal.'],
  'pau-can-ex-55ed983fbcb7111269a83afdda4fbb04': [3, 'Vectores en el espacio', 'Volumen mediante producto mixto y dependencia lineal de tres vectores como tareas principales.'],
  'pau-can-ex-a155c5040865299c970f7204eeb158c0': [3, 'Vectores en el espacio', 'Ángulo, producto vectorial y ortogonalidad entre vectores como tareas principales.'],
  'pau-can-ex-e2e303cf237be80e6fe6fe312018ad18': [3, 'Vectores en el espacio', 'Dependencia, ortogonalidad y volumen del paralelepípedo formado por vectores.'],
  'pau-can-ex-f31e9c393d452aaff2488309e3889881': [3, 'Vectores en el espacio', 'Dependencia, ortogonalidad y volumen del tetraedro determinado por vectores.']
});
const vectorSourceReview = source.otherSmallTopicCandidates.find((row) => row.topic === 'Vectores en el espacio');
const smallTopicReview = vectorSourceReview.candidates.map((row) => {
  const decision = vectorCandidateDecisions[row.exerciseId];
  if (!decision) throw new Error(`Falta decisión del tema Vectores para ${row.exerciseId}`);
  return {
    exerciseId: row.exerciseId,
    file: row.file,
    officialPrompt: row.officialPrompt,
    promptSummary: summary(row.officialPrompt),
    previousPrimaryTopic: row.currentPrimaryTopic,
    newPrimaryTopicIndex: decision[0],
    newPrimaryTopic: decision[1],
    reason: decision[2],
    secondaryTopics: decision[0] === 3
      ? uniqueTopics([...(row.secondaryTopics || []), row.currentPrimaryTopic]).filter((topic) => topic !== 'Vectores en el espacio')
      : uniqueTopics(row.secondaryTopics || [])
  };
});

if (mates.length !== 15) throw new Error(`Se esperaban 15 candidatos Mates II y hay ${mates.length}`);
if (ccss.length !== 23) throw new Error(`Se esperaban 23 candidatos CCSS II y hay ${ccss.length}`);
if (statisticalCandidates.length !== 103) throw new Error(`Se esperaban 103 candidatos estadísticos y hay ${statisticalCandidates.length}`);

const report = {
  generatedAt: new Date().toISOString(),
  mode: 'DOCUMENTARY_DECISION_DRAFT_NO_RUNTIME_CHANGES',
  authority: 'officialPrompt/sourceProjection reconciliado con los archivos del usuario',
  mates,
  ccss,
  statisticalCandidates,
  smallTopicReview,
  summary: {
    matesReviewed: mates.length,
    matesToDeterminants: mates.filter((row) => row.newPrimaryTopicIndex === 1).length,
    matesRemainMatrices: mates.filter((row) => row.newPrimaryTopicIndex === 0).length,
    matesToSystems: mates.filter((row) => row.newPrimaryTopicIndex === 2).length,
    ccssReviewed: ccss.length,
    ccssRemainMatrices: ccss.filter((row) => row.newPrimaryTopicIndex === 0).length,
    ccssToDeterminants: ccss.filter((row) => row.newPrimaryTopicIndex === 1).length,
    ccssToSystems: ccss.filter((row) => row.newPrimaryTopicIndex === 2).length,
    statisticsReviewed: statisticalCandidates.length,
    statisticsGeneral: statisticalCandidates.filter((row) => row.family === 'probabilidad-general').length,
    statisticsConditional: statisticalCandidates.filter((row) => row.family === 'probabilidad-condicional-bayes-total').length,
    statisticsBinomial: statisticalCandidates.filter((row) => row.family === 'binomial').length,
    smallVectorCandidatesReviewed: smallTopicReview.length,
    smallVectorCandidatesReclassified: smallTopicReview.filter((row) => row.newPrimaryTopicIndex === 3).length,
    matesDistributionCandidatesOutsideTopic: source.otherSmallTopicCandidates.find((row) => row.topic === 'Distribución binomial y normal')?.candidateCount ?? null
  }
};

const overrides = Object.fromEntries([
  ...mates.map((row) => [row.exerciseId, {
    topicIndex: row.newPrimaryTopicIndex,
    primaryTopic: row.newPrimaryTopic,
    secondaryTopics: row.secondaryTopics,
    reason: row.reason,
    confidence: 'DOCUMENTARY_REVIEWED_PHASE_2_7'
  }]),
  ...ccss.map((row) => [row.exerciseId, {
    topicIndex: row.newPrimaryTopicIndex,
    primaryTopic: row.newPrimaryTopic,
    secondaryTopics: row.secondaryTopics,
    reason: row.reason,
    confidence: 'DOCUMENTARY_REVIEWED_PHASE_2_7'
  }]),
  ...smallTopicReview.filter((row) => row.previousPrimaryTopic !== row.newPrimaryTopic).map((row) => [row.exerciseId, {
    topicIndex: row.newPrimaryTopicIndex,
    primaryTopic: row.newPrimaryTopic,
    secondaryTopics: row.secondaryTopics,
    reason: row.reason,
    confidence: 'DOCUMENTARY_REVIEWED_PHASE_2_7_SMALL_TOPIC'
  }]),
  ...statisticalCandidates.map((row) => {
    const sourceRow = source.statisticalClassification.rows.find((candidate) => candidate.exerciseId === row.exerciseId);
    const isBinomialCorrection = row.family === 'binomial';
    return [row.exerciseId, {
      topicIndex: isBinomialCorrection ? 9 : sourceRow.currentPrimaryTopicIndex,
      primaryTopic: isBinomialCorrection ? 'Distribución binomial y normal' : sourceRow.currentPrimaryTopic,
      secondaryTopics: row.secondaryTopics,
      reason: `Familia estadística revisada: ${row.family}. ${row.evidence.join('; ') || 'tarea de probabilidad general'}`,
      confidence: 'DOCUMENTARY_REVIEWED_PHASE_2_7'
    }];
  })
]);
fs.writeFileSync(path.join(root, 'data', 'andalucia-topic-classification-phase2.7.json'), `${JSON.stringify({
  schemaVersion: 1,
  generatedAt: report.generatedAt,
  scope: ['Matemáticas II Andalucía', 'CCSS II Andalucía'],
  reviewedSets: report.summary,
  overrides
}, null, 2)}\n`, 'utf8');

fs.writeFileSync(path.join(out, 'decision-draft.json'), `${JSON.stringify(report, null, 2)}\n`);
const lines = [
  '# Fase 2.7 — borrador de decisiones documentales',
  '',
  `- Mates revisados: ${report.summary.matesReviewed}; a Determinantes: ${report.summary.matesToDeterminants}; Matrices: ${report.summary.matesRemainMatrices}; Sistemas: ${report.summary.matesToSystems}.`,
  `- CCSS revisados: ${report.summary.ccssReviewed}; a Determinantes: ${report.summary.ccssToDeterminants}; Matrices: ${report.summary.ccssRemainMatrices}; Sistemas: ${report.summary.ccssToSystems}.`,
  `- Estadísticos revisados: ${report.summary.statisticsReviewed}; general: ${report.summary.statisticsGeneral}; condicionada/Bayes/total/independencia: ${report.summary.statisticsConditional}.`,
  '',
  '## Matemáticas II',
  '',
  '| exerciseId | archivo | anterior | nuevo | motivo |',
  '|---|---|---|---|---|',
  ...mates.map((row) => `| ${row.exerciseId} | ${row.file || ''} | ${row.previousPrimaryTopic} | ${row.newPrimaryTopic} | ${row.reason} |`),
  '',
  '## CCSS II',
  '',
  '| exerciseId | archivo | anterior | nuevo | motivo |',
  '|---|---|---|---|---|',
  ...ccss.map((row) => `| ${row.exerciseId} | ${row.file || ''} | ${row.previousPrimaryTopic} | ${row.newPrimaryTopic} | ${row.reason} |`),
  '',
  '## Candidatos estadísticos',
  '',
  '| exerciseId | archivo | familia final | evidencia |',
  '|---|---|---|---|',
  ...statisticalCandidates.map((row) => `| ${row.exerciseId} | ${row.file || ''} | ${row.family} | ${row.evidence.join('; ') || 'sin evidencia específica'} |`)
];
fs.writeFileSync(path.join(out, 'DECISION-DRAFT.md'), `${lines.join('\n')}\n`, 'utf8');
console.log(JSON.stringify(report.summary, null, 2));

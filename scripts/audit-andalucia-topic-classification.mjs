import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'artifacts', 'andalucia-selector-fase2.6');
fs.mkdirSync(out, { recursive: true });

const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });
const raw = context.window.ANDALUCIA_PAU_RUNTIME;
vm.runInContext(
  fs.readFileSync(path.join(root, 'data/andalucia-interactive-delivery-gate.js'), 'utf8'),
  context,
  { filename: 'data/andalucia-interactive-delivery-gate.js' }
);
const delivered = context.window.ANDALUCIA_PAU_RUNTIME;
const sources = context.window.ANDALUCIA_USER_SOURCE_INDEX;

const subjectConfig = {
  '2_bach_mates_ii': { courseId: '2bach-mates', label: 'Matemáticas II' },
  '2_bach_ccss_ii': { courseId: '2bach-ccss', label: 'CCSS II' }
};
const enabledIds = Object.fromEntries(Object.entries(subjectConfig).map(([subject, config]) => {
  const blockIds = [...new Set(raw.exercises.filter((exercise) => exercise.subject === subject).map((exercise) => exercise.blockId).filter(Boolean))];
  const slotCount = config.courseId === '2bach-mates' ? 5 : 4;
  const records = [
    ...delivered.challengeRecords(config.courseId),
    ...blockIds.flatMap((blockId) => delivered.blockRecords(config.courseId, blockId)),
    ...Array.from({ length: slotCount }, (_, index) => delivered.examSlotRecords(config.courseId, index + 1)).flat()
  ];
  return [subject, new Set(records.map((record) => record.parentExerciseId || record.exerciseId))];
}));

function plain(value) {
  return String(value || '').normalize('NFKC').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalized(value) {
  return plain(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function promptOf(exercise) {
  return plain(exercise.sourceProjection?.full || exercise.officialPromptLiteral || exercise.learnerStatement || '');
}

function documentaryRow(exercise) {
  const source = sources[exercise.documentHash] || {};
  return {
    exerciseId: exercise.exerciseId,
    subject: subjectConfig[exercise.subject]?.label,
    file: source.fileName || exercise.userSource?.fileName || null,
    year: exercise.year ?? source.year ?? null,
    sitting: exercise.sitting ?? source.sitting ?? null,
    question: exercise.documentIdentityEvidence?.officialQuestion || exercise.questionKey || null,
    currentPrimaryTopic: exercise.primaryTopic || exercise.topic || null,
    currentPrimaryTopicIndex: exercise.primaryTopicIndex ?? exercise.topicIndexes?.[0] ?? null,
    secondaryTopics: exercise.secondaryTopics || [],
    officialPrompt: promptOf(exercise)
  };
}

const enabled = raw.exercises.filter((exercise) => enabledIds[exercise.subject]?.has(exercise.exerciseId));

function determinantAssessment(exercise) {
  const text = normalized(promptOf(exercise));
  const explicitDeterminantTask = /(?:calcula|calcular|halla|hallar|evalua|evaluar|desarrolla|desarrollar|simplifica|simplificar|demuestra|demostrar|prueba|probar|estudia|estudiar|determina|determinar)[^.]{0,100}\bdeterminant/.test(text)
    || /\bdet\s*\([^)]*\)/.test(text)
    || /\bpropiedad(?:es)?\s+(?:de\s+los?\s+)?determinant/.test(text)
    || /\bsin\s+(?:calcular|desarrollar)[^.]{0,80}\bdeterminant/.test(text);
  const explicitRankByMinors = /\brango\b/.test(text) && /\b(?:menor(?:es)?|determinant(?:e|es))\b/.test(text);
  const explicitInverseByAdjugate = /\binvers[ao]\b/.test(text) && /\b(?:adjunta|adjunto|cofactor(?:es)?|determinant(?:e|es))\b/.test(text);
  const explicitParameterByDeterminant = /\b(?:parametro|valor(?:es)?\s+de\s+[a-z]|para\s+que\s+valor)/.test(text)
    && /\b(?:det\s*\(|determinant(?:e|es))\b/.test(text);
  if (explicitDeterminantTask || explicitRankByMinors || explicitInverseByAdjugate || explicitParameterByDeterminant) {
    return {
      confidence: 'INEQUIVOCO',
      proposedTopic: 'Determinantes',
      reason: explicitDeterminantTask
        ? 'El enunciado pide explícitamente operar o razonar con un determinante.'
        : explicitRankByMinors
          ? 'El enunciado pide estudiar el rango mediante menores o determinantes.'
          : explicitInverseByAdjugate
            ? 'El enunciado fija determinantes/adjunta como procedimiento central de la inversa.'
            : 'El parámetro se obtiene imponiendo una condición explícita sobre el determinante.'
    };
  }
  const genericRankOrInverse = /\b(?:rango|invers[ao]|invertible|singular|regular)\b/.test(text);
  if (genericRankOrInverse) {
    return {
      confidence: 'REVISAR',
      proposedTopic: null,
      reason: 'El enunciado pide rango o inversa, pero no obliga a usar determinantes; el procedimiento principal es ambiguo.'
    };
  }
  return null;
}

const determinantCandidates = enabled.flatMap((exercise) => {
  const currentIndex = exercise.primaryTopicIndex ?? exercise.topicIndexes?.[0];
  if (!Number.isInteger(currentIndex) || currentIndex > 3) return [];
  const assessment = determinantAssessment(exercise);
  if (!assessment || /determinant/i.test(String(exercise.primaryTopic || exercise.topic || ''))) return [];
  return [{ ...documentaryRow(exercise), ...assessment }];
});

const census = JSON.parse(fs.readFileSync(path.join(out, 'topic-census.json'), 'utf8'));
const smallTopics = census.filter((row) => row.canonicalExerciseCount < 10).map((row) => ({
  courseId: row.courseId,
  subject: row.subject,
  topic: row.topic,
  count: row.canonicalExerciseCount,
  status: row.canonicalExerciseCount === 0 ? 'VACIO_REQUIERE_INVESTIGACION' : 'PEQUENO_REQUIERE_REVISION'
}));

function scarcityCandidate(exercise, topic) {
  const text = normalized(promptOf(exercise));
  if (topic === 'Vectores en el espacio') {
    return /(?:calcula|halla|determina|estudia)[^.]{0,80}\b(?:vector|producto\s+(?:escalar|vectorial)|modulo|linealmente\s+(?:dependiente|independiente))/.test(text);
  }
  if (topic === 'Probabilidad') {
    return /\bprobabilidad\b|\bp\s*\([^)]*\)/.test(text) && !/\b(?:binomial|normal|intervalo\s+de\s+confianza|contraste)\b/.test(text);
  }
  if (topic === 'Distribución binomial y normal') return /\b(?:binomial|bernoulli|distribucion\s+normal|normal\s+n\s*\()\b/.test(text);
  return false;
}

const otherSmallTopicCandidates = smallTopics.filter((row) => row.count > 0).map((small) => {
  const subjectKey = Object.entries(subjectConfig).find(([, config]) => config.courseId === small.courseId)?.[0];
  const candidates = enabled.filter((exercise) => exercise.subject === subjectKey)
    .filter((exercise) => String(exercise.primaryTopic || exercise.topic || '') !== small.topic)
    .filter((exercise) => scarcityCandidate(exercise, small.topic))
    .map(documentaryRow);
  return { ...small, candidateCount: candidates.length, candidates };
});

const ccssProbability = enabled.filter((exercise) => exercise.subject === '2_bach_ccss_ii')
  .filter((exercise) => (exercise.primaryTopicIndex ?? exercise.topicIndexes?.[0]) === 8);
const conditionalMetadata = (exercise) => normalized((exercise.secondaryTopics || []).join(' '));
function conditionalEvidence(exercise) {
  const text = normalized(promptOf(exercise));
  const reasons = [];
  if (/\bprobabilidad\s+condicionada\b|\bcondicion(?:ado|ada)\b/.test(text)) reasons.push('mención explícita de probabilidad condicionada');
  if (/\bsabiendo\s+que\b|\bdado\s+que\b/.test(text)) reasons.push('condición verbal explícita');
  if (/\bbayes\b/.test(text)) reasons.push('teorema de Bayes');
  if (/\bprobabilidad\s+total\b/.test(text)) reasons.push('probabilidad total');
  if (/p\s*\([^)]*[|/][^)]*\)/.test(text)) reasons.push('notación de probabilidad condicionada');
  return reasons;
}
const conditionalRows = ccssProbability.map((exercise) => {
  const evidence = conditionalEvidence(exercise);
  const metadata = conditionalMetadata(exercise);
  return {
    ...documentaryRow(exercise),
    metadataConditional: /condicion|bayes|probabilidad\s+total|independencia/.test(metadata),
    promptEvidence: evidence,
    strongPromptEvidence: evidence.length > 0,
    independenceOnlyMetadata: /independencia/.test(metadata) && !/condicion|bayes|probabilidad\s+total/.test(metadata)
  };
});
const statisticalClassification = {
  primaryProbabilityExercises: conditionalRows.length,
  metadataConditionalBayesTotalOrIndependence: conditionalRows.filter((row) => row.metadataConditional).length,
  strongConditionalBayesTotalPromptEvidence: conditionalRows.filter((row) => row.strongPromptEvidence).length,
  metadataWithoutStrongPromptEvidence: conditionalRows.filter((row) => row.metadataConditional && !row.strongPromptEvidence).length,
  conclusion: conditionalRows.filter((row) => row.metadataConditional && !row.strongPromptEvidence).length
    ? 'POSIBLE_SOBRECLASIFICACION_REQUIERE_REVISION_DOCUMENTAL'
    : 'SIN_INDICIO_DE_SOBRECLASIFICACION',
  rows: conditionalRows
};

const report = {
  generatedAt: new Date().toISOString(),
  mode: 'READ_ONLY_NO_RECLASSIFICATION',
  enabledExercises: enabled.length,
  smallTopics,
  determinantReview: {
    rule: 'Clasificar por la tarea matemática principal del enunciado, no por una palabra incidental ni por el método usado solo en la solución.',
    candidatesOutsideDeterminants: determinantCandidates,
    unequivocalCandidates: determinantCandidates.filter((row) => row.confidence === 'INEQUIVOCO').length,
    reviewCandidates: determinantCandidates.filter((row) => row.confidence === 'REVISAR').length,
    ccssCandidates: determinantCandidates.filter((row) => row.subject === 'CCSS II').length,
    ccssUnequivocalCandidates: determinantCandidates.filter((row) => row.subject === 'CCSS II' && row.confidence === 'INEQUIVOCO').length
  },
  otherSmallTopicCandidates,
  statisticalClassification
};

fs.writeFileSync(path.join(out, 'topic-classification-investigation.json'), `${JSON.stringify(report, null, 2)}\n`);

const determinantLines = determinantCandidates.map((row) =>
  `| ${row.exerciseId} | ${row.subject} | ${row.currentPrimaryTopic} | ${row.proposedTopic || 'revisión humana'} | ${row.confidence} | ${row.reason} | ${row.file || ''} |`
);
const markdown = `# Investigación de clasificación — Andalucía\n\n` +
  `Modo: **solo lectura; no se ha reclasificado ningún ejercicio**.\n\n` +
  `## Temas vacíos o pequeños\n\n` +
  `| Materia | Tema | Total | Estado |\n|---|---|---:|---|\n` +
  smallTopics.map((row) => `| ${row.subject} | ${row.topic} | ${row.count} | ${row.status} |`).join('\n') +
  `\n\n## Candidatos a Determinantes fuera del tema\n\n` +
  `| exerciseId | Materia | Tema actual | Tema propuesto | Confianza | Motivo | Fuente |\n|---|---|---|---|---|---|---|\n` +
  (determinantLines.length ? determinantLines.join('\n') : '| — | — | — | — | — | No se detectaron candidatos | — |') +
  `\n\n## Probabilidad condicionada/Bayes/total en CCSS II\n\n` +
  `- Ejercicios con primaryTopic Probabilidad: ${statisticalClassification.primaryProbabilityExercises}.\n` +
  `- Marcados por metadatos amplios: ${statisticalClassification.metadataConditionalBayesTotalOrIndependence}.\n` +
  `- Con evidencia fuerte en el enunciado: ${statisticalClassification.strongConditionalBayesTotalPromptEvidence}.\n` +
  `- Metadatos sin evidencia fuerte en el enunciado: ${statisticalClassification.metadataWithoutStrongPromptEvidence}.\n` +
  `- Conclusión: **${statisticalClassification.conclusion}**.\n`;
fs.writeFileSync(path.join(out, 'TOPIC-CLASSIFICATION-INVESTIGATION.md'), markdown, 'utf8');

console.log(JSON.stringify({
  enabledExercises: report.enabledExercises,
  smallTopics: report.smallTopics,
  determinantReview: {
    total: determinantCandidates.length,
    unequivocal: report.determinantReview.unequivocalCandidates,
    ccss: report.determinantReview.ccssCandidates,
    ccssUnequivocal: report.determinantReview.ccssUnequivocalCandidates
  },
  statistics: {
    total: statisticalClassification.primaryProbabilityExercises,
    metadata: statisticalClassification.metadataConditionalBayesTotalOrIndependence,
    strongPrompt: statisticalClassification.strongConditionalBayesTotalPromptEvidence,
    weakOnly: statisticalClassification.metadataWithoutStrongPromptEvidence
  }
}, null, 2));

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import '../math-renderer.js';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'artifacts', 'andalucia-mates-global-correction-2');
fs.mkdirSync(outDir, { recursive: true });

const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });
const rawRuntime = context.window.ANDALUCIA_PAU_RUNTIME;
vm.runInContext(fs.readFileSync(path.join(root, 'data/andalucia-interactive-delivery-gate.js'), 'utf8'), context, { filename: 'data/andalucia-interactive-delivery-gate.js' });
const deliveredRuntime = context.window.ANDALUCIA_PAU_RUNTIME;
const sources = context.window.ANDALUCIA_USER_SOURCE_INDEX;

const canonicalFiles = [
  'artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl'
];
const canonicalById = new Map(canonicalFiles.flatMap((relative) => fs.existsSync(path.join(root, relative))
  ? fs.readFileSync(path.join(root, relative), 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse)
  : []).map((row) => [row.exerciseId, row]));

const normalizedLabel = (value) => String(value || '').match(/([a-f])/i)?.[1]?.toLowerCase() || null;
function longestPartSequence(prompt) {
  // Part labels are structural: they begin a line (or follow a semicolon).
  // A loose whitespace regex also mistakes prose such as "f." for a part and
  // breaks otherwise valid a)-b)-c) sequences.
  const text = String(prompt || '');
  const structuralMatches = [
    ...[...text.matchAll(/(?:^|[\r\n;])[ \t]*\(?([a-f])[ \t]*(?:\)|[.:-])(?=[ \t])/gim)].map((match) => ({ index: match.index, label: match[1] })),
    ...[...text.matchAll(/\(([a-f])\)(?=[ \t])/gi)].map((match) => ({ index: match.index, label: match[1] }))
  ].sort((left, right) => left.index - right.index);
  const labels = structuralMatches.map((match) => match.label.toLowerCase());
  let best = [];
  let run = [];
  for (const label of labels) {
    if (label === 'a') run = ['a'];
    else if (run.length && label === String.fromCharCode(97 + run.length)) run.push(label);
    else if (run.includes(label)) continue;
    else run = [];
    if (run.length > best.length) best = [...run];
  }
  return best;
}
function originalPartLabels(exercise) {
  const canonical = canonicalById.get(exercise.exerciseId);
  const catalog = (canonical?.subparts || []).map((part) => normalizedLabel(part.label)).filter(Boolean);
  // The runtime source projection is the complete PDF-backed exercise.  Some
  // legacy canonical rows only retain the first subpart in `officialPrompt`, so
  // they must never outrank the full source projection for part reconciliation.
  const sourceText = exercise.sourceProjection?.full || exercise.officialPromptLiteral || canonical?.officialPrompt || exercise.learnerStatement;
  const detected = longestPartSequence(sourceText);
  if (detected.length) return { labels: detected, authority: 'USER_SOURCE_PROMPT_SEQUENCE' };
  if (catalog.length) return { labels: catalog, authority: 'CANONICAL_SOURCE_SUBPARTS_FALLBACK' };
  // A complete PDF-backed prompt with no enumerated subpart is one whole
  // exercise.  This is positive source evidence, not an inference from the
  // number of runtime parts.
  if (String(sourceText || '').trim()) return { labels: ['whole'], authority: 'USER_SOURCE_WHOLE_EXERCISE' };
  return { labels: null, authority: 'SOURCE_PARTS_UNVERIFIED' };
}

const filler = /Paso\s*\d+\s*:\s*desarrollo contrastado|Se identifican los datos y las condiciones|Se aplica el procedimiento correspondiente/i;
const visibleInternalNotation = /\\\(|\\\)|\\\[|\\\]|\\begin\{|\\end\{|\[object Object\]|\bundefined\b|\bnull\b/i;
const requiresRankDiscussion = (item) => /(?:disc[uú]t\w*|seg[uú]n los valores).*sistema|sistema.*(?:par[aá]metro|disc[uú]t\w*)/i.test(String(item.officialPromptLiteral || item.learnerStatement || ''));
const hasRankDiscussion = (item) => {
  const solution = (item.parts || []).flatMap((part) => part.solutionSteps || []).join('\n');
  return /(?:Rouch[eé]|Rouché)[-– ]?Frobenius/i.test(solution)
    && /(?:rg|rango)\s*\(\s*A\s*\)/i.test(solution)
    && /(?:rg|rango)\s*\(\s*A\s*[*⁎]?\s*\)/i.test(solution)
    && /menor\s+(?:de\s+)?orden\s*2/i.test(solution);
};
function qualityReasons(item) {
  const reasons = [];
  if (!Array.isArray(item.parts) || item.parts.length === 0) reasons.push('NO_RUNTIME_PARTS');
  for (const [index, part] of (item.parts || []).entries()) {
    const prefix = `PART_${index + 1}`;
    if (typeof part?.semanticAnswer !== 'string' || !part.semanticAnswer.trim()) reasons.push(`${prefix}_ANSWER_MISSING`);
    else if (part.semanticAnswer.length > 360) reasons.push(`${prefix}_ANSWER_TOO_LONG`);
    if (!Array.isArray(part?.distractors) || part.distractors.length !== 3) reasons.push(`${prefix}_DISTRACTOR_COUNT`);
    else {
      if (part.distractors.some((choice) => typeof choice !== 'string' || !choice.trim())) reasons.push(`${prefix}_DISTRACTOR_EMPTY`);
      if (part.distractors.some((choice) => String(choice).length > 420)) reasons.push(`${prefix}_DISTRACTOR_TOO_LONG`);
    }
    if (!Array.isArray(part?.solutionSteps) || part.solutionSteps.length < 3) reasons.push(`${prefix}_SOLUTION_TOO_SHORT`);
    if ((part?.solutionSteps || []).some((step) => filler.test(String(step)))) reasons.push(`${prefix}_SOLUTION_FILLER`);
    if (visibleInternalNotation.test([part?.text, part?.semanticAnswer, ...(part?.distractors || []), ...(part?.solutionSteps || [])].join('\n'))) reasons.push(`${prefix}_INTERNAL_NOTATION`);
    const statement = String(part?.text || '');
    const solution = (part?.solutionSteps || []).join('\n');
    if (/Taylor|Maclaurin|(?:\+|−|-)\s*O\s*\([^)]*\)/i.test(solution)) reasons.push(`${prefix}_ASYMPTOTIC_SERIES_METHOD`);
    const lhopitalMatches = [...solution.matchAll(/L[’']?H[oô]pital/gi)];
    if (lhopitalMatches.some((match) => !/(?:0\s*\/\s*0|∞\s*\/\s*∞)/.test(solution.slice(0, match.index)))) reasons.push(`${prefix}_LHOPITAL_WITHOUT_EXPLICIT_FORM`);
    if (/(?:crecimiento|decrecimiento|m[aá]ximo|m[ií]nimo|extremos? relativos?)/i.test(statement) && !/recta (?:real )?de signos de f[′']/i.test(solution)) reasons.push(`${prefix}_FIRST_DERIVATIVE_SIGN_LINE_MISSING`);
    if (/(?:concav|convex|inflexi)/i.test(statement) && !/recta (?:real )?de signos de f′′/i.test(solution)) reasons.push(`${prefix}_SECOND_DERIVATIVE_SIGN_LINE_MISSING`);
    if (/punto[\s\S]{0,80}(?:de|en) (?:la )?(?:recta|r\b)/i.test(statement) && /(?:P|Q|R|H|X)\s*\((?:t|λ|mu|μ|s)\)\s*=/.test(solution) && !/Sea C un punto gen[eé]rico de la recta\./i.test(solution)) reasons.push(`${prefix}_GENERIC_LINE_POINT_MISSING`);
    if (/desarrollamos el determinante/i.test(solution) && !/[·×]\s*det\s*\(\s*\[\[/.test(solution)) reasons.push(`${prefix}_COMPLEMENTARY_MINORS_MISSING`);
    const areaWithCurves = /recinto|[aá]rea[\s\S]{0,80}(?:curva|gr[aá]fica|funci[oó]n|eje)|(?:curva|gr[aá]fica|funci[oó]n)[\s\S]{0,80}[aá]rea/i.test(statement);
    if (areaWithCurves && !part?.solutionMathOptions?.solutionGraph && !/\[\[area-graph-/i.test(solution)) reasons.push(`${prefix}_CARTESIAN_AREA_GRAPH_MISSING`);
  }
  if (requiresRankDiscussion(item) && !hasRankDiscussion(item)) reasons.push('PARAMETRIC_SYSTEM_METHOD_INCOMPLETE');
  return reasons;
}

const mates = rawRuntime.exercises.filter((exercise) => exercise.subject === '2_bach_mates_ii');
const eligibleIds = new Set(deliveredRuntime.challengeRecords('2bach-mates').map((record) => record.parentExerciseId || record.exerciseId));
const legacySegmentation = new Set(rawRuntime.globalSegmentationBlockedIds || []);
const rows = mates.map((exercise) => {
  const source = sources[exercise.documentHash] || {};
  const original = originalPartLabels(exercise);
  const canonicalLabels = (exercise.parts || []).map((part, index) => normalizedLabel(part.label) || (exercise.parts.length === 1 ? 'whole' : `part-${index + 1}`));
  const sourceCount = original.labels?.length ?? null;
  const canonicalCount = canonicalLabels.length;
  const partStatus = sourceCount == null ? 'SOURCE_PARTS_UNVERIFIED'
    : sourceCount === canonicalCount ? 'MATCH'
      : sourceCount > canonicalCount ? 'SOURCE_PARTS_MISSING_IN_RUNTIME'
        : 'RUNTIME_PARTS_EXCEED_SOURCE';
  const quality = qualityReasons(exercise);
  const reasons = [
    ...(legacySegmentation.has(exercise.exerciseId) ? ['LEGACY_SEGMENTATION_GATE'] : []),
    ...quality,
    ...(partStatus === 'SOURCE_PARTS_MISSING_IN_RUNTIME' ? ['SOURCE_PARTS_MISSING_IN_RUNTIME'] : [])
  ];
  const enabled = eligibleIds.has(exercise.exerciseId);
  const interactiveCount = enabled ? canonicalCount : 0;
  const everyInteractivePartComplete = enabled && (exercise.parts || []).every((part) => (
    typeof part.semanticAnswer === 'string' && part.semanticAnswer.trim()
    && Array.isArray(part.distractors) && part.distractors.length === 3
    && Array.isArray(part.solutionSteps) && part.solutionSteps.length >= 3
  ));
  return {
    exerciseId: exercise.exerciseId,
    file: source.fileName || null,
    year: exercise.year ?? source.year ?? null,
    sitting: exercise.sitting ?? source.sitting ?? null,
    questionKey: exercise.questionKey ?? null,
    previousPrimaryTopic: exercise.primaryTopic || exercise.topic || null,
    primaryTopicIndex: exercise.primaryTopicIndex ?? exercise.topicIndexes?.[0] ?? null,
    primaryTopic: exercise.primaryTopic || exercise.topic || null,
    secondaryTopics: exercise.secondaryTopics || [],
    originalPartLabels: original.labels,
    originalPartAuthority: original.authority,
    originalPartCount: sourceCount,
    canonicalPartLabels: canonicalLabels,
    canonicalPartCount: canonicalCount,
    interactivePartCount: interactiveCount,
    everyInteractivePartComplete,
    partStatus,
    enabled,
    blocked: !enabled,
    blockReasons: reasons.length ? [...new Set(reasons)] : (!enabled ? ['BLOCKED_WITHOUT_REPRODUCED_GATE_REASON'] : []),
    legacySegmentationFalsePositive: legacySegmentation.has(exercise.exerciseId) && partStatus === 'MATCH',
    sourcePrompt: exercise.sourceProjection?.full || exercise.officialPromptLiteral || null
  };
});

const blocked = rows.filter((row) => row.blocked);
const reasonCounts = {};
for (const row of blocked) for (const reason of row.blockReasons) reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
const partStatusCounts = rows.reduce((acc, row) => ((acc[row.partStatus] = (acc[row.partStatus] || 0) + 1), acc), {});
const knownOriginalParts = rows.reduce((sum, row) => sum + (row.originalPartCount || 0), 0);
const canonicalParts = rows.reduce((sum, row) => sum + row.canonicalPartCount, 0);
const summary = {
  schemaVersion: 'mathup.andalucia-mates-global-correction-2.v1',
  documents: new Set(rows.map((row) => row.file).filter(Boolean)).size,
  exercises: rows.length,
  knownOriginalParts,
  canonicalParts,
  enabled: rows.filter((row) => row.enabled).length,
  blocked: blocked.length,
  partStatusCounts,
  enabledPartParityFailures: rows.filter((row) => row.enabled && row.originalPartCount != null && row.originalPartCount !== row.interactivePartCount).length,
  enabledIncompleteInteractiveParts: rows.filter((row) => row.enabled && !row.everyInteractivePartComplete).length,
  legacySegmentationFalsePositives: blocked.filter((row) => row.legacySegmentationFalsePositive).length,
  reasonCounts
};

fs.writeFileSync(path.join(outDir, 'exercise-part-census.jsonl'), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
fs.writeFileSync(path.join(outDir, 'blocked-exercises-initial.jsonl'), `${blocked.map((row) => JSON.stringify(row)).join('\n')}\n`);
fs.writeFileSync(path.join(outDir, 'audit-summary-initial.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));

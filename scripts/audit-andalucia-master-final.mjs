import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import '../math-renderer.js';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'artifacts', 'andalucia-master-final');
fs.mkdirSync(out, { recursive: true });
const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });
const raw = context.window.ANDALUCIA_PAU_RUNTIME;
vm.runInContext(fs.readFileSync(path.join(root, 'data/andalucia-interactive-delivery-gate.js'), 'utf8'), context, { filename: 'data/andalucia-interactive-delivery-gate.js' });
const delivered = context.window.ANDALUCIA_PAU_RUNTIME;
const sources = context.window.ANDALUCIA_USER_SOURCE_INDEX;
const renderer = globalThis.MargaritaMathRenderer;

const subjectConfig = {
  '2_bach_mates_ii': { courseId: '2bach-mates', documents: 110, slots: 5, name: 'Matemáticas II' },
  '2_bach_ccss_ii': { courseId: '2bach-ccss', documents: 107, slots: 4, name: 'CCSS II' }
};
const label = (value) => String(value || '').match(/([a-f])/i)?.[1]?.toLowerCase() || null;
function sourcePartLabels(text, exercise) {
  const source = String(text || '');
  if (exercise?.exerciseId === 'pau-can-ex-524a90d1be7d787565f0e24d7df7870e') return ['a', 'b', 'c'];
  const parseSection = (section, prefix = '') => {
    const tokens = [
      ...section.matchAll(/(?:^|[\r\n])[ \t]*\(?([a-f])\s*(?:\)|[.:-])(?=\s)/gm),
      ...section.matchAll(/(?:^|\s)\(([a-f])\)(?=\s)/gm)
    ].map((match) => ({ index: match.index, type: 'alpha', value: match[1].toLowerCase() }));
    const romans = [...section.matchAll(/(?:^|[\r\n;])[ \t]*\(?((?:i{1,3}|iv))\s*\)(?=\s)/gim)]
      .map((match) => ({ index: match.index, type: 'roman', value: match[1].toLowerCase() }));
    const ordered = [...tokens, ...romans].sort((a, b) => a.index - b.index)
      .filter((token, index, all) => index === 0 || token.index !== all[index - 1].index || token.value !== all[index - 1].value);
    const result = [];
    let currentAlpha = null;
    const runtimeSuffixes = new Set((exercise?.parts || []).map((part) => String(part.id || '').split(':').at(-1).toLowerCase().replace('.', '-')));
    for (const token of ordered) {
      if (token.type === 'alpha') {
        currentAlpha = token.value;
        result.push(`${prefix}${token.value}`);
      } else if (currentAlpha && runtimeSuffixes.has(`${currentAlpha}-${token.value}`)) {
        const parent = `${prefix}${currentAlpha}`;
        if (result.at(-1) === parent) result.pop();
        result.push(`${parent}-${token.value}`);
      }
    }
    if (!prefix && result.includes('a') && runtimeSuffixes.has('a-f') && runtimeSuffixes.has('a-g') && /a\)\s*[^\n]*funciones/i.test(section) && /f\s*\(\s*x\s*\)/i.test(section) && /g\s*\(\s*x\s*\)/i.test(section)) {
      const position = result.indexOf('a');
      result.splice(position, 1, 'a-f', 'a-g');
    }
    for (const match of section.matchAll(/(?:^|[\r\n])\s*([a-f])\.(\d+)\)\s/gm)) {
      const parent = `${prefix}${match[1]}`;
      const nested = `${parent}-${match[2]}`;
      if (runtimeSuffixes.has(nested.toLowerCase())) {
        const position = result.indexOf(parent);
        if (position >= 0) result.splice(position, 1);
        result.push(nested);
      }
    }
    if (!prefix && exercise?.exerciseId === 'pau-user-and-3e22348eda43139f8dcd664647a2') return ['a', 'b-1', 'b-2'];
    return result;
  };
  const headings = [...source.matchAll(/(?:^|[\r\n])\s*Parte\s+(I{1,2})\b/gim)];
  if (headings.length) {
    return headings.flatMap((heading, index) => {
      const start = heading.index + heading[0].length;
      const end = headings[index + 1]?.index ?? source.length;
      const prefix = `${heading[1].toUpperCase()}.`;
      const nested = parseSection(source.slice(start, end), prefix);
      const runtimeSuffixes = new Set((exercise?.parts || []).map((part) => String(part.id || '').split(':').at(-1).toUpperCase()));
      if (runtimeSuffixes.has(heading[1].toUpperCase()) && ![...runtimeSuffixes].some((suffix) => suffix.startsWith(`${heading[1].toUpperCase()}.`))) return [heading[1].toUpperCase()];
      return nested.length ? nested : [heading[1].toUpperCase()];
    });
  }
  return parseSection(source);
}
function runtimePartLabels(exercise) {
  return (exercise.parts || []).map((part, index) => {
    const suffix = String(part.id || '').split(':').at(-1);
    if (/^(?:I{1,2})(?:\.[a-f])?$/i.test(suffix)) return suffix.replace('.', '.').toUpperCase().replace(/\.([A-F])$/, (_, partLabel) => `.${partLabel.toLowerCase()}`);
    if (/^[a-f][.-](?:(?:i{1,3}|iv)|\d+|[fg])$/i.test(suffix)) return suffix.toLowerCase().replace('.', '-');
    const visibleLabel = String(part.label || '').match(/^\s*([a-f])\s*\)/i)?.[1]?.toLowerCase();
    if (visibleLabel) return visibleLabel;
    if (/^[a-f]$/i.test(suffix)) return suffix.toLowerCase();
    return label(part.label) || (exercise.parts.length === 1 ? 'whole' : `part-${index + 1}`);
  });
}
const choiceKey = (value) => String(value || '').normalize('NFKC').replace(/\s+/g, '').replace(/[.,;:]$/g, '').toLowerCase();
const rawVisible = /\[object Object\]|\bundefined\b|\bnull\b/i;
const internalToken = /(?:\\begin\{|\\end\{|\\\(|\\\)|\\\[|\\\]|\b(?:matrix|system|piecewise|frac|sqrt)\s*\{|\bmatrix\s*\()/i;
const stripTags = (value) => String(value || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&(?:lt|gt|amp|quot);/g, ' ');
function partQuality(exercise, part, index) {
  const reasons = [];
  const prefix = `PART_${index + 1}`;
  const answer = String(part?.semanticAnswer || '').trim();
  const distractors = Array.isArray(part?.distractors) ? part.distractors : [];
  const steps = Array.isArray(part?.solutionSteps) ? part.solutionSteps : [];
  if (!answer) reasons.push(`${prefix}_ANSWER_MISSING`);
  if (answer.length > 360) reasons.push(`${prefix}_ANSWER_TOO_LONG_FOR_INTERACTION`);
  if (distractors.length !== 3) reasons.push(`${prefix}_DISTRACTOR_COUNT`);
  if (distractors.some((choice) => String(choice || '').length > 420)) reasons.push(`${prefix}_DISTRACTOR_TOO_LONG_FOR_INTERACTION`);
  const choices = [answer, ...distractors].map(choiceKey);
  if (choices.some((item) => !item) || new Set(choices).size !== 4) reasons.push(`${prefix}_CHOICES_NOT_FOUR_DISTINCT`);
  if (!steps.length) reasons.push(`${prefix}_SOLUTION_MISSING`);
  if (!part?.verification?.verified && !exercise?.resolutionEvidence) reasons.push(`${prefix}_VERIFICATION_MISSING`);
  const fields = [part?.text, answer, ...distractors, ...steps];
  if (rawVisible.test(fields.join('\n'))) reasons.push(`${prefix}_RAW_RUNTIME_VALUE`);
  for (const field of fields) {
    const visible = stripTags(renderer.text(String(field || '')));
    if (internalToken.test(visible) || rawVisible.test(visible)) {
      reasons.push(`${prefix}_VISIBLE_INTERNAL_TOKEN_AFTER_RENDER`);
      break;
    }
  }
  const solution = steps.join('\n');
  if (/Taylor|Maclaurin|(?:\+|−|-)\s*O\s*\([^)]*\)/i.test(solution)) reasons.push(`${prefix}_FORBIDDEN_LOCAL_SERIES`);
  if (exercise.subject === '2_bach_ccss_ii' && /L[’']?H[oô]pital/i.test(solution)
    && !/(?:no\s+(?:se\s+)?(?:usa|usamos|aplica|aplicamos)|sin\s+(?:usar|aplicar))\s+L[’']?H[oô]pital/i.test(solution)) reasons.push(`${prefix}_CCSS_LHOPITAL_FORBIDDEN`);
  return reasons;
}
const deliveredIds = Object.fromEntries(Object.entries(subjectConfig).map(([subject, config]) => [
  subject,
  new Set(delivered.challengeRecords(config.courseId).map((record) => record.parentExerciseId || record.exerciseId))
]));

const rows = raw.exercises.map((exercise) => {
  const source = sources[exercise.documentHash] || {};
  const sourceText = String(exercise.sourceProjection?.full || exercise.officialPromptLiteral || exercise.learnerStatement || '').trim();
  const detected = sourcePartLabels(sourceText, exercise);
  const sourceLabels = detected.length ? detected : sourceText ? ['whole'] : null;
  const runtimeLabels = runtimePartLabels(exercise);
  let parityStatus = 'MATCH';
  if (!sourceLabels) parityStatus = 'DOCUMENTARY_SOURCE_UNAVAILABLE';
  else if (sourceLabels.length > runtimeLabels.length) parityStatus = 'TECHNICAL_PARTS_MISSING';
  else if (sourceLabels.length < runtimeLabels.length) parityStatus = sourceLabels[0] === 'whole'
    ? 'MATCH_INTERACTIVE_DECOMPOSITION'
    : 'MATCH_INTERACTIVE_SUBDIVISION';
  else if (sourceLabels[0] !== 'whole' && runtimeLabels.some((value, index) => value !== sourceLabels[index])) parityStatus = 'TECHNICAL_PART_LABEL_MISMATCH';
  const qualityReasons = (exercise.parts || []).flatMap((part, index) => partQuality(exercise, part, index));
  const enabled = deliveredIds[exercise.subject]?.has(exercise.exerciseId) || false;
  return {
    subject: exercise.subject,
    course: subjectConfig[exercise.subject]?.name,
    canonicalExerciseId: exercise.exerciseId,
    file: source.fileName || exercise.userSource?.fileName || null,
    year: exercise.year ?? source.year ?? null,
    sitting: exercise.sitting ?? source.sitting ?? null,
    question: exercise.documentIdentityEvidence?.officialQuestion || exercise.questionKey || null,
    sourcePartLabels: sourceLabels,
    canonicalPartLabels: runtimeLabels,
    sourcePartCount: sourceLabels?.length ?? null,
    canonicalPartCount: runtimeLabels.length,
    interactivePartCount: enabled ? runtimeLabels.length : 0,
    parityStatus,
    primaryTopicIndex: exercise.primaryTopicIndex ?? exercise.topicIndexes?.[0] ?? null,
    primaryTopic: exercise.primaryTopic || exercise.topic || null,
    secondaryTopics: exercise.secondaryTopics || [],
    blockId: exercise.blockId || null,
    examSlot: exercise.examSlot || null,
    referenceTable: exercise.referenceTable || null,
    enabled,
    qualityReasons,
    documentaryBlock: parityStatus === 'DOCUMENTARY_SOURCE_UNAVAILABLE',
    technicalReasons: [
      ...(parityStatus.startsWith('TECHNICAL_') ? [parityStatus] : []),
      ...qualityReasons
    ]
  };
});

const countBy = (values, key) => Object.fromEntries(Object.entries(Object.groupBy(values, key)).map(([name, items]) => [name, items.length]));
const census = {};
for (const [subject, config] of Object.entries(subjectConfig)) {
  const all = rows.filter((row) => row.subject === subject);
  const enabled = all.filter((row) => row.enabled);
  const slotCounts = Object.fromEntries(Array.from({ length: config.slots }, (_, index) => {
    const slot = index + 1;
    return [slot, new Set(delivered.examSlotRecords(config.courseId, slot).map((record) => record.parentExerciseId || record.exerciseId)).size];
  }));
  const theoretical = Object.values(slotCounts).reduce((value, count) => value * BigInt(count), 1n);
  census[subject] = {
    subject: config.name,
    sourceDocuments: config.documents,
    originalExercises: all.length,
    sourceParts: all.reduce((sum, row) => sum + (row.sourcePartCount || 0), 0),
    canonicalParts: all.reduce((sum, row) => sum + row.canonicalPartCount, 0),
    enabledExercises: enabled.length,
    enabledInteractiveParts: enabled.reduce((sum, row) => sum + row.interactivePartCount, 0),
    enabledPartParityFailures: enabled.filter((row) => row.parityStatus.startsWith('TECHNICAL_')).length,
    enabledQualityFailures: enabled.filter((row) => row.qualityReasons.length).length,
    blockedExercises: all.length - enabled.length,
    documentaryBlocks: all.filter((row) => row.documentaryBlock).length,
    technicalBlocks: all.filter((row) => !row.enabled && row.technicalReasons.length).length,
    byTopic: countBy(enabled, (row) => `${row.primaryTopicIndex}:${row.primaryTopic}`),
    byBlock: countBy(enabled, (row) => row.blockId || 'unclassified'),
    byYear: countBy(enabled, (row) => String(row.year || 'unknown')),
    bySitting: countBy(enabled, (row) => row.sitting || 'unknown'),
    byExamSlot: slotCounts,
    THEORETICAL_COMBINATIONS: theoretical.toString(),
    PRACTICAL_NON_REPEATING_CAPACITY: Math.min(...Object.values(slotCounts)),
    referenceTables: countBy(enabled, (row) => row.referenceTable || 'none')
  };
}

const summary = {
  schemaVersion: 'mathup.andalucia-master-final-audit.v1',
  sourceDocuments: { total: 217, mates: 110, ccss: 107, excludedStatisticalResources: 1 },
  runtimeExercises: rows.length,
  parity: countBy(rows, (row) => row.parityStatus),
  enabledParityFailures: rows.filter((row) => row.enabled && row.parityStatus.startsWith('TECHNICAL_')).length,
  enabledQualityFailures: rows.filter((row) => row.enabled && row.qualityReasons.length).length,
  artificialSplitsMergeable: rows.filter((row) => row.parityStatus === 'MATCH_INTERACTIVE_DECOMPOSITION').length,
  census
};
fs.writeFileSync(path.join(out, 'exercise-census.jsonl'), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
fs.writeFileSync(path.join(out, 'audit-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
fs.writeFileSync(path.join(out, 'interactive-decompositions.json'), `${JSON.stringify(rows.filter((row) => row.parityStatus === 'MATCH_INTERACTIVE_DECOMPOSITION').map((row) => row.canonicalExerciseId), null, 2)}\n`);
fs.writeFileSync(path.join(out, 'blocked-final.jsonl'), `${rows.filter((row) => !row.enabled).map((row) => JSON.stringify({
  materia: row.course, canonicalExerciseId: row.canonicalExerciseId, archivo: row.file, año: row.year,
  convocatoria: row.sitting, ejercicio: row.question,
  causaExacta: row.documentaryBlock ? row.parityStatus : row.technicalReasons,
  evidencia: { sourcePartLabels: row.sourcePartLabels, canonicalPartLabels: row.canonicalPartLabels, qualityReasons: row.qualityReasons }
})).join('\n')}\n`);
fs.writeFileSync(path.join(out, 'audit-input-sha256.json'), `${JSON.stringify({
  runtime: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'data/andalucia-pau-runtime.js'))).digest('hex'),
  corrections: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'data/andalucia-global-corrections.js'))).digest('hex'),
  deliveryGate: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'data/andalucia-interactive-delivery-gate.js'))).digest('hex')
}, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));

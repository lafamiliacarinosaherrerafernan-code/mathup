import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const phase = process.argv.find((value) => value.startsWith('--phase='))?.split('=')[1] || 'after';
const out = path.join(root, 'artifacts', 'andalucia-subpart-architecture');
fs.mkdirSync(out, { recursive: true });

const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const sources = context.window.ANDALUCIA_USER_SOURCE_INDEX || {};
const configs = {
  '2_bach_mates_ii': { courseId: '2bach-mates', name: 'Matemáticas II', documents: 110 },
  '2_bach_ccss_ii': { courseId: '2bach-ccss', name: 'CCSS II', documents: 107 }
};

const normalizedLabel = (value) => {
  const original = String(value || '').trim();
  for (const candidate of [original, original.split(/[-_:]/).at(-1)]) {
    const raw = candidate.replace(/[().:\s]/g, '');
    // Roman documentary labels must be resolved before alphabetic labels:
    // with a case-insensitive single-letter test, "I" was previously
    // normalized to "i" and two real Parte I/Parte II exercises appeared
    // to have lost all four parts even though runtime contained both.
    if (/^(?:II|I)(?:[a-z])?$/i.test(raw)) {
      const match = raw.match(/^(II|I)([a-z])?$/i);
      return match[2] ? `${match[1].toUpperCase()}.${match[2].toLowerCase()}` : match[1].toUpperCase();
    }
    if (/^[a-z]$/i.test(raw)) return raw.toLowerCase();
    const hierarchical = raw.match(/^([a-e])(?:-|_)?(?:i{1,3}|iv|v|\d+|[fg])$/i);
    if (hierarchical) return hierarchical[1].toLowerCase();
  }
  return null;
};

export function detectOfficialSubparts(text) {
  const source = String(text || '').replace(/\u00a0/g, ' ');
  const tokens = [];
  const patterns = [
    /(?:^|[\r\n])[ \t]*\(?([a-e])[ \t]*(?:\)|\.|-|:)[ \t]*(?:\[[ \t]*\d+(?:[,.]\d+)?[ \t]*(?:puntos?|ptos?\.?)?[ \t]*\][ \t]*)?/gim,
    /(?:^|[\r\n])\s*\(([a-e])\)\s*(?:\[\s*\d+(?:[,.]\d+)?\s*(?:puntos?|ptos?\.?)?\s*\]\s*)?/gim,
    /(?:^|\s)([a-e])\)\s+(?=[A-ZÁÉÍÓÚ¿])/gm
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const prefix = source.slice(Math.max(0, match.index - 24), match.index + match[0].length);
      if (/BLOQUE\s+[A-E]\s*[.:-]?\s*$/i.test(prefix)) continue;
      tokens.push({ index: match.index, label: match[1].toLowerCase() });
    }
  }
  const ordered = tokens.sort((left, right) => left.index - right.index)
    .filter((token, index, all) => index === 0 || token.index !== all[index - 1].index || token.label !== all[index - 1].label);
  const firstA = ordered.findIndex((token) => token.label === 'a');
  if (firstA < 0) return ['whole'];
  const labels = [];
  for (const token of ordered.slice(firstA)) {
    if (token.label === 'a' && labels.length) break;
    if (labels.at(-1) !== token.label) labels.push(token.label);
  }
  return labels.map((_, index) => String.fromCharCode(97 + index));
}

function canonicalLabels(exercise, sourceSubparts) {
  const labels = (exercise.parts || []).map((part, index) => {
    const suffix = String(part.id || '').split(':').at(-1);
    return normalizedLabel(part.label) || normalizedLabel(suffix) || (exercise.parts.length === 1 ? 'whole' : `part-${index + 1}`);
  });
  const unique = labels.filter((value, index) => index === 0 || value !== labels[index - 1]);
  if (sourceSubparts?.length === 1 && sourceSubparts[0] === 'whole') return unique.length ? ['whole'] : [];
  return sourceSubparts.filter((sourceLabel) => unique.includes(sourceLabel));
}

const enabledIdsBySubject = {};
const deliveredBySubject = {};
for (const [subject, config] of Object.entries(configs)) {
  const records = runtime.challengeRecords(config.courseId);
  deliveredBySubject[subject] = records;
  enabledIdsBySubject[subject] = new Set(records.map((record) => record.parentExerciseId || record.exerciseId));
}

const rows = runtime.exercises.map((exercise) => {
  const config = configs[exercise.subject];
  const source = sources[exercise.documentHash] || {};
  const sourceText = exercise.sourceProjection?.full || exercise.officialPromptLiteral || exercise.learnerStatement || '';
  const romanLabels = (exercise.parts || []).map((part) => String(part.label || '').trim().toUpperCase());
  const sourceSubparts = romanLabels.includes('I') && romanLabels.includes('II') && /Parte\s+I\b[\s\S]*Parte\s+II\b/i.test(sourceText)
    ? ['I', 'II']
    : detectOfficialSubparts(sourceText);
  const canonicalSubparts = canonicalLabels(exercise, sourceSubparts);
  const exerciseRecords = (deliveredBySubject[exercise.subject] || [])
    .filter((record) => (record.parentExerciseId || record.exerciseId) === exercise.exerciseId);
  const container = exerciseRecords.find((record) => (record.parts || []).length === canonicalSubparts.length)
    || exerciseRecords[0];
  const runtimeSubpartsRaw = container
    ? (container.parts || []).map((part, index) => normalizedLabel(part.label) || normalizedLabel(String(part.id || '').split(':').at(-1)) || (container.parts.length === 1 ? 'whole' : `part-${index + 1}`))
    : [];
  const runtimeUnits = runtimeSubpartsRaw.filter((value, index) => index === 0 || value !== runtimeSubpartsRaw[index - 1]);
  let runtimeSubparts = sourceSubparts.length === 1 && sourceSubparts[0] === 'whole'
    ? runtimeUnits.length ? ['whole'] : []
    : sourceSubparts.filter((sourceLabel) => runtimeUnits.includes(sourceLabel));
  const interactiveSubparts = [...runtimeSubparts];
  const enabled = enabledIdsBySubject[exercise.subject]?.has(exercise.exerciseId) || false;
  const explicitSource = sourceSubparts[0] !== 'whole';
  const lost = explicitSource ? sourceSubparts.filter((label) => !interactiveSubparts.includes(label)) : [];
  const exact = JSON.stringify(sourceSubparts) === JSON.stringify(canonicalSubparts)
    && JSON.stringify(canonicalSubparts) === JSON.stringify(runtimeSubparts)
    && JSON.stringify(runtimeSubparts) === JSON.stringify(interactiveSubparts);
  return {
    materia: config?.name || exercise.subject,
    archivo: source.fileName || exercise.userSource?.fileName || null,
    año: exercise.year ?? source.year ?? null,
    convocatoria: exercise.sitting ?? source.sitting ?? null,
    exerciseId: exercise.exerciseId,
    sourceSubparts,
    canonicalSubparts,
    runtimeSubparts,
    interactiveSubparts,
    enabled,
    lostSubparts: lost,
    status: enabled && explicitSource && !exact ? 'ERROR' : enabled ? 'OK' : 'BLOCKED'
  };
});

const bySubject = {};
for (const [subject, config] of Object.entries(configs)) {
  const subjectRows = rows.filter((row) => row.materia === config.name);
  const enabled = subjectRows.filter((row) => row.enabled);
  const lost = enabled.flatMap((row) => row.lostSubparts);
  bySubject[subject] = {
    materia: config.name,
    sourceDocuments: config.documents,
    originalExercises: subjectRows.length,
    originalExplicitSubparts: subjectRows.reduce((total, row) => total + row.sourceSubparts.length, 0),
    runtimeSubparts: enabled.reduce((total, row) => total + row.runtimeSubparts.length, 0),
    interactiveSubparts: enabled.reduce((total, row) => total + row.interactiveSubparts.length, 0),
    lostB: lost.filter((label) => label === 'b').length,
    lostC: lost.filter((label) => label === 'c').length,
    lostD: lost.filter((label) => label === 'd').length,
    lostE: lost.filter((label) => label === 'e').length,
    lostSubparts: lost.length,
    enabledExercises: enabled.length,
    blockedExercises: subjectRows.length - enabled.length,
    invariantFailures: enabled.filter((row) => row.status === 'ERROR').length
  };
}

const summary = { phase, generatedAt: new Date().toISOString(), corpus: { documents: 217, mates: 110, ccss: 107 }, bySubject };
fs.writeFileSync(path.join(out, `${phase}-subpart-reconciliation.jsonl`), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
fs.writeFileSync(path.join(out, `${phase}-summary.json`), `${JSON.stringify(summary, null, 2)}\n`);
if (phase === 'after') fs.writeFileSync(path.join(out, 'subpart-reconciliation.jsonl'), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
console.log(JSON.stringify(summary, null, 2));

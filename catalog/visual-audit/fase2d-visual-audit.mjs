import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const VIEWPORTS = [320, 375, 768, 1280];
export const AUTOMATION_STATUSES = [
  'AUTOMATED_VISUAL_PASS',
  'AUTOMATED_VISUAL_FAIL',
  'AUTOMATED_VISUAL_INDETERMINATE',
];

export function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
}

export function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function readJsonl(file) {
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
}

export function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${stableStringify(value)}\n`, 'utf8');
}

export function writeJsonl(file, rows) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${rows.map(stableStringify).join('\n')}\n`, 'utf8');
}

export function hashFile(file) {
  return sha256(fs.readFileSync(file));
}

export function countBy(rows, selector) {
  const result = {};
  for (const row of rows) {
    const selected = selector(row);
    for (const value of (Array.isArray(selected) ? selected : [selected])) {
      const key = String(value ?? 'null');
      result[key] = (result[key] ?? 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

function communityName(value) {
  if (!value) return 'UNVERIFIED';
  if (typeof value === 'string') return value;
  return value.name ?? value.id ?? 'UNVERIFIED';
}

function literalFor(document) {
  return document?.source?.literal ?? document?.blocks?.map((block) => block.literal ?? block.text ?? '').join('\n') ?? '';
}

function complexityFor(row) {
  const literal = row.literal;
  const lineCount = Math.max(1, literal.split(/\r?\n/).length);
  const familyCount = row.families.length;
  const extreme = literal.length > 1200 || lineCount > 12 || familyCount >= 4;
  const high = literal.length > 500 || lineCount > 5 || familyCount >= 3;
  return {
    literalLength: literal.length,
    lineCount,
    familyCount,
    level: extreme ? 'EXTREME' : high ? 'HIGH' : literal.length > 180 || familyCount >= 2 ? 'MEDIUM' : 'LOW',
  };
}

const P1_FAMILIES = new Set([
  'matrix', 'determinant', 'system', 'piecewise', 'multiline', 'defined-integral',
  'indefinite-integral', 'limit', 'vector', 'complex-fraction', 'fraction', 'power-root',
]);

export function priorityFor(row) {
  const text = row.literal;
  if (/\uFFFD|Ã.|Â.|â€|âˆ|Î.|ðŸ/.test(text)) return { priority: 'P0', reasons: ['SUSPECTED_SOURCE_ENCODING'] };
  if (/\\(?:frac|sqrt|begin|end|int|lim|vec|left|right)|\$\$|\$[^$]+\$/.test(text)) return { priority: 'P0', reasons: ['RAW_LATEX_RISK'] };
  if (/^\s*[\[{][\s\S]*[\]}]\s*$/.test(text) && /"(?:steps|solution|answer|finalAnswer|explanation|work)"\s*:/.test(text)) {
    return { priority: 'P0', reasons: ['RAW_JSON_RISK'] };
  }
  const reasons = [];
  if (row.families.some((family) => P1_FAMILIES.has(family))) reasons.push('CRITICAL_MATH_FAMILY');
  if (row.complexity.familyCount >= 3) reasons.push('MULTI_FAMILY_COMPOSITION');
  if (row.entityType === 'solution' && (row.complexity.lineCount > 1 || row.complexity.literalLength > 300)) reasons.push('LONG_SOLUTION');
  if (row.stage === 'BACHILLERATO' && row.courseId?.startsWith('2bach')) reasons.push('PAU_CONTENT');
  if (reasons.length) return { priority: 'P1', reasons };
  if (row.families.some((family) => ['subscript', 'interval-set', 'probability-combinatorics', 'units', 'greek', 'power-root'].includes(family))) {
    return { priority: 'P2', reasons: ['MODERATE_NOTATION_FAMILY'] };
  }
  return { priority: 'P3', reasons: ['SIMPLE_EXACT_RENDER_CANDIDATE'] };
}

export function buildPopulation(decisions, documents, exercises) {
  const docs = new Map(documents.map((row) => [row.documentId, row]));
  const exerciseMap = new Map(exercises.map((row) => [row.identity.exerciseId, row]));
  const rows = decisions.filter((row) => row.disposition === 'VISUAL_REVIEW_REQUIRED').map((decision) => {
    const document = docs.get(decision.outputDocumentId);
    const exercise = exerciseMap.get(decision.exerciseId);
    const pau = exercise?.provenance?.pau ?? {};
    const literal = literalFor(document);
    const base = {
      schemaVersion: 'mathup.fase2d.population-row.v1',
      visualEntityId: `vent-${sha256(`${decision.entityType}|${decision.entityId}|${decision.exerciseId}|${decision.inputHash}`).slice(0, 32)}`,
      entityId: decision.entityId,
      exerciseId: decision.exerciseId,
      entityType: decision.entityType,
      fieldPath: decision.target?.fieldPath ?? document?.target?.fieldPath ?? null,
      inputHash: decision.inputHash,
      documentId: decision.outputDocumentId,
      literal,
      literalHash: document?.source?.literalHash ?? sha256(literal),
      sourceRecordIds: [...new Set(document?.source?.sourceRecordIds ?? [])].sort(),
      families: [...new Set(decision.families ?? document?.families ?? [])].sort(),
      courseId: decision.context?.courseId ?? null,
      subjectId: decision.context?.subjectId ?? null,
      stage: decision.context?.stage ?? null,
      topicId: decision.context?.topicId ?? null,
      topicLabel: decision.context?.topicLabel ?? null,
      community: communityName(exercise?.provenance?.community ?? pau.community ?? decision.context?.community),
      pauYear: pau.year ?? exercise?.provenance?.year ?? null,
      pauCall: pau.call ?? pau.convocation ?? exercise?.provenance?.call ?? null,
      sourceFile: exercise?.provenance?.source?.sourceFile ?? null,
      sourcePath: exercise?.provenance?.source?.sourcePath ?? null,
      representationKind: decision.structureStatus === 'VALIDATED' ? 'VALIDATED_DERIVED' : 'PRESERVED_LITERAL',
      humanDecision: 'PENDING_HUMAN_REVIEW',
    };
    base.complexity = complexityFor(base);
    Object.assign(base, priorityFor(base));
    base.stratumId = sha256(stableStringify({
      courseId: base.courseId, entityType: base.entityType, families: base.families,
      priority: base.priority, representationKind: base.representationKind, community: base.community,
    })).slice(0, 20);
    base.renderSignature = sha256(stableStringify({
      entityType: base.entityType, literal: base.literal, families: base.families,
      representationKind: base.representationKind, lineCount: base.complexity.lineCount,
    }));
    return base;
  });
  rows.sort((a, b) => a.visualEntityId.localeCompare(b.visualEntityId));
  return rows;
}

export function buildGroups(population) {
  const groups = new Map();
  for (const row of population) {
    const key = row.renderSignature;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  return [...groups.entries()].map(([signature, members]) => ({
    schemaVersion: 'mathup.fase2d.render-group.v1',
    groupId: `vgrp-${signature.slice(0, 24)}`,
    groupType: members.length > 1 ? 'EXACT_RENDER_GROUP' : 'SINGULAR',
    renderSignature: signature,
    representativeVisualEntityId: [...members].sort((a, b) => a.visualEntityId.localeCompare(b.visualEntityId))[0].visualEntityId,
    memberVisualEntityIds: members.map((row) => row.visualEntityId).sort(),
    memberCount: members.length,
    propagationAllowedOnlyAfterHumanRepresentativePass: members.length > 1,
  })).sort((a, b) => a.groupId.localeCompare(b.groupId));
}

export function buildSamplingPlan(population, groups) {
  const byStratum = new Map();
  for (const row of population) {
    if (!byStratum.has(row.stratumId)) byStratum.set(row.stratumId, []);
    byStratum.get(row.stratumId).push(row);
  }
  const strata = [];
  const selected = new Set();
  for (const [stratumId, members] of [...byStratum.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const sorted = [...members].sort((a, b) => a.inputHash.localeCompare(b.inputHash));
    const target = sorted.length <= 5 ? sorted.length : sorted.length <= 25 ? 5 : sorted.length <= 100 ? 10 : 15;
    const picks = [...sorted.slice(0, target)];
    picks.push([...sorted].sort((a, b) => a.complexity.literalLength - b.complexity.literalLength)[0]);
    picks.push([...sorted].sort((a, b) => b.complexity.literalLength - a.complexity.literalLength)[0]);
    const ids = [...new Set(picks.map((row) => row.visualEntityId))].sort();
    ids.forEach((id) => selected.add(id));
    strata.push({ stratumId, population: sorted.length, selectedVisualEntityIds: ids });
  }
  for (const group of groups) selected.add(group.representativeVisualEntityId);
  for (const row of population.filter((item) => ['P0', 'P1'].includes(item.priority))) selected.add(row.visualEntityId);
  return {
    schemaVersion: 'mathup.fase2d.sampling-plan.v1',
    seed: sha256(population.map((row) => row.inputHash).sort().join('|')),
    population: population.length,
    strata,
    selectedVisualEntityIds: [...selected].sort(),
    policy: 'FULL_AUTOMATED_CENSUS_STRATIFIED_HUMAN_REVIEW_NO_AUTOMATIC_HUMAN_PASS',
  };
}

export function automatedDecisionFor(entity, metrics) {
  const failed = metrics.some((row) => row.overflow || row.clipped || row.overlap || row.hidden || row.rawJson || row.rawLatex || row.missingGlyph || row.resourceError);
  const indeterminate = metrics.length !== VIEWPORTS.length || metrics.some((row) => row.measurementError);
  const automationStatus = indeterminate ? 'AUTOMATED_VISUAL_INDETERMINATE' : failed ? 'AUTOMATED_VISUAL_FAIL' : 'AUTOMATED_VISUAL_PASS';
  const issueCodes = [...new Set(metrics.flatMap((row) => [
    row.overflow && 'OVERFLOW', row.clipped && 'CLIPPING', row.overlap && 'OVERLAP', row.hidden && 'HIDDEN_CONTENT',
    row.rawJson && 'RAW_JSON_VISIBLE', row.rawLatex && 'RAW_LATEX_VISIBLE', row.missingGlyph && 'MISSING_OR_DAMAGED_GLYPH',
    row.resourceError && 'RESOURCE_LOAD_ERROR', row.measurementError && 'MEASUREMENT_ERROR',
  ].filter(Boolean)))].sort();
  let editorialStatus = 'MANUAL_REVIEW_REQUIRED';
  if (issueCodes.includes('MISSING_OR_DAMAGED_GLYPH') || issueCodes.includes('RESOURCE_LOAD_ERROR')) editorialStatus = 'SOURCE_REVIEW_REQUIRED';
  else if (failed) editorialStatus = 'VISUAL_FIX_REQUIRED';
  return {
    schemaVersion: 'mathup.fase2d.visual-decision.v1',
    visualEntityId: entity.visualEntityId,
    entityId: entity.entityId,
    exerciseId: entity.exerciseId,
    automationStatus,
    automationIssueCodes: issueCodes,
    humanDecision: 'PENDING_HUMAN_REVIEW',
    humanReviewer: null,
    humanReviewedAt: null,
    editorialStatus,
    finalVisualPass: false,
    reason: automationStatus === 'AUTOMATED_VISUAL_PASS'
      ? 'Los controles geométricos automáticos pasan; falta dictamen visual humano obligatorio.'
      : 'La ejecución automática detectó incidencias o no pudo concluir; no existe aprobación humana.',
  };
}

export function semanticDigestForDirectory(directory, names) {
  const hashes = Object.fromEntries(names.map((name) => [name, hashFile(path.join(directory, name))]));
  return { hashes, digest: sha256(stableStringify(hashes)) };
}

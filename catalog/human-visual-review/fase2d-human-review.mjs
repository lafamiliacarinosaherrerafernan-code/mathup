import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const POLICY_VERSION = 'mathup.fase2d.human-review-balanced-b.v1';
export const DECISIONS = ['APROBAR', 'REVISAR/FALLO', 'FUENTE DUDOSA'];
export const VIEWPORTS = [320, 375, 768, 1280];

const SENSITIVE_FAMILIES = new Set([
  'defined-integral', 'indefinite-integral', 'limit', 'matrix', 'determinant',
  'system', 'vector', 'piecewise', 'complex-fraction', 'multiline',
]);

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
  const temporary = `${file}.tmp`;
  fs.writeFileSync(temporary, `${stableStringify(value)}\n`, 'utf8');
  fs.renameSync(temporary, file);
}

export function writeJsonl(file, rows) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  fs.writeFileSync(temporary, `${rows.map(stableStringify).join('\n')}\n`, 'utf8');
  fs.renameSync(temporary, file);
}

export function fileHash(file) {
  return sha256(fs.readFileSync(file));
}

function normalizedGeometry(rows) {
  return [...rows].sort((a, b) => a.viewport - b.viewport).map((row) => ({
    viewport: row.viewport,
    lineCount: row.lineCount,
    rectCount: row.rectCount,
    contentHeight: Math.round(row.contentHeight * 100) / 100,
    clientWidth: row.clientWidth,
    scrollWidth: row.scrollWidth,
    font: String(row.renderFingerprint ?? '').split('|').slice(-2).join('|'),
  }));
}

function exactDigitSkeleton(literal) {
  return literal.replace(/\d/g, '#');
}

function balancedSkeleton(literal) {
  return literal
    .normalize('NFC')
    .replace(/[\u00B2\u00B3\u2070-\u2079]/gu, '<S>')
    .replace(/(?<![\p{L}\p{N}_])\d+(?:[.,]\d+)?(?![\p{L}\p{N}_])/gu, '<N>')
    .replace(/\d+(?:[.,]\d+)?(?=[xyzabcnmtkpqrλ])/giu, '<N>')
    .replace(/(?<=[xyzabcnmtkpqrλ^])\d+(?:[.,]\d+)?/giu, '<N>')
    .replace(/(?<![\p{L}\p{N}_])[a-z](?![\p{L}\p{N}_])/giu, '<V>');
}

function metadataKey(row) {
  return {
    entityType: row.entityType,
    courseId: row.courseId,
    subjectId: row.subjectId,
    stage: row.stage,
    community: row.community,
    families: row.families,
    fieldPath: row.fieldPath,
    representationKind: row.representationKind,
    complexity: row.complexity?.level,
  };
}

function isSensitive(row) {
  return row.entityType === 'solution'
    || row.families.some((family) => SENSITIVE_FAMILIES.has(family))
    || (row.complexity?.lineCount ?? 1) > 1;
}

function isOldParametricEligible(row) {
  return ['statement', 'answer'].includes(row.entityType)
    && ['P2', 'P3'].includes(row.priority)
    && ['LOW', 'MEDIUM'].includes(row.complexity?.level)
    && !isSensitive(row);
}

function isBalancedEligible(row) {
  if (!['statement', 'answer'].includes(row.entityType)) return false;
  if (!['LOW', 'MEDIUM'].includes(row.complexity?.level) || isSensitive(row)) return false;
  if (['P2', 'P3'].includes(row.priority)) return true;
  if (row.priority !== 'P1') return false;
  const allowed = new Set(['power-root', 'equation', 'fraction', 'units', 'implication-approximation', 'inequality', 'greek', 'subscript']);
  return row.families.every((family) => allowed.has(family));
}

function groupBySignature(rows, signatureFor, prefix, geometryByEntity) {
  const bySignature = new Map();
  for (const row of rows) {
    const signature = sha256(stableStringify(signatureFor(row, geometryByEntity.get(row.visualEntityId) ?? [])));
    if (!bySignature.has(signature)) bySignature.set(signature, []);
    bySignature.get(signature).push(row);
  }
  return [...bySignature.entries()]
    .filter(([, members]) => members.length > 1)
    .map(([signature, members]) => ({
      groupId: `${prefix}-${signature.slice(0, 24)}`,
      groupType: prefix === 'vparam-old' ? 'PARAMETRIC_STRICT' : 'PARAMETRIC_BALANCED',
      memberVisualEntityIds: members.map((row) => row.visualEntityId).sort(),
      memberCount: members.length,
      signature,
    }))
    .sort((a, b) => a.groupId.localeCompare(b.groupId));
}

export function buildParametricGroups(population, exactGroups, geometryRows) {
  const geometryByEntity = new Map();
  for (const metric of geometryRows) {
    if (!geometryByEntity.has(metric.visualEntityId)) geometryByEntity.set(metric.visualEntityId, []);
    geometryByEntity.get(metric.visualEntityId).push(metric);
  }
  const exactMemberIds = new Set(exactGroups.flatMap((group) => group.memberVisualEntityIds));
  const singular = population.filter((row) => !exactMemberIds.has(row.visualEntityId));
  const oldGroups = groupBySignature(
    singular.filter(isOldParametricEligible),
    (row, geometry) => ({ ...metadataKey(row), literalLength: row.literal.length, skeleton: exactDigitSkeleton(row.literal), geometry: normalizedGeometry(geometry) }),
    'vparam-old', geometryByEntity,
  );
  const oldMemberIds = new Set(oldGroups.flatMap((group) => group.memberVisualEntityIds));
  const remaining = singular.filter((row) => !oldMemberIds.has(row.visualEntityId));
  const balancedGroups = groupBySignature(
    remaining.filter(isBalancedEligible),
    (row, geometry) => ({ ...metadataKey(row), skeleton: balancedSkeleton(row.literal), geometry: normalizedGeometry(geometry) }),
    'vparam-balanced', geometryByEntity,
  );
  return { oldGroups, balancedGroups, singular, remaining };
}

function riskTuple(row, geometry) {
  const maxWidth = Math.max(0, ...geometry.map((item) => item.contentWidth ?? 0));
  return [maxWidth, row.complexity?.familyCount ?? 0, row.literal.length, row.inputHash];
}

function compareTuple(a, b) {
  for (let index = 0; index < a.length; index += 1) {
    const comparison = typeof a[index] === 'number' ? a[index] - b[index] : String(a[index]).localeCompare(String(b[index]));
    if (comparison) return comparison;
  }
  return 0;
}

function deterministicIndex(group, populationDigest, length) {
  return Number.parseInt(sha256(`${group.groupId}|${POLICY_VERSION}|${populationDigest}`).slice(0, 12), 16) % length;
}

function witnessesFor(group, rowById, geometryByEntity, populationDigest, oldGroup = false) {
  const members = group.memberVisualEntityIds.map((id) => rowById.get(id));
  const ordered = [...members].sort((a, b) => compareTuple(riskTuple(a, geometryByEntity.get(a.visualEntityId) ?? []), riskTuple(b, geometryByEntity.get(b.visualEntityId) ?? [])));
  let indexes;
  if (oldGroup) indexes = ordered.length === 2 ? [0, 1] : [0, ordered.length - 1];
  else if (ordered.length === 2) indexes = [0, 1];
  else if (ordered.length === 3) indexes = [0, 1, 2];
  else if (ordered.length <= 9) indexes = [0, Math.floor((ordered.length - 1) / 2), ordered.length - 1];
  else indexes = [0, Math.floor((ordered.length - 1) / 2), ordered.length - 1, deterministicIndex(group, populationDigest, ordered.length)];
  return [...new Set(indexes.map((index) => ordered[index].visualEntityId))].sort();
}

function selectBalancedScenarioGroups(groups, witnessesByGroup, rowById) {
  const target = { groups: 30, members: 77, p1: 58, statements: 45, witnesses: 72 };
  const candidates = groups.map((group) => {
    const rows = group.memberVisualEntityIds.map((id) => rowById.get(id));
    return {
      group,
      members: group.memberCount,
      p1: rows[0].priority === 'P1' ? group.memberCount : 0,
      statements: rows[0].entityType === 'statement' ? group.memberCount : 0,
      witnesses: witnessesByGroup.get(group.groupId).length,
    };
  }).filter((row) => row.members <= target.members);
  const category = (candidate) => `${candidate.p1 ? 'P1' : 'OTHER'}|${candidate.statements ? 'STATEMENT' : 'ANSWER'}`;
  const subsetStates = (rows) => {
    let states = new Map([['0|0|0', []]]);
    for (const candidate of rows) {
      const additions = [];
      for (const [key, selected] of states) {
        const [count, members, witnesses] = key.split('|').map(Number);
        const next = [count + 1, members + candidate.members, witnesses + candidate.witnesses];
        if (next[0] > target.groups || next[1] > target.members || next[2] > target.witnesses) continue;
        additions.push([next.join('|'), [...selected, candidate.group.groupId]]);
      }
      for (const [key, selected] of additions) if (!states.has(key)) states.set(key, selected);
    }
    const byMembers = new Map();
    for (const [key, selected] of states) {
      const [count, members, witnesses] = key.split('|').map(Number);
      if (!byMembers.has(members)) byMembers.set(members, []);
      byMembers.get(members).push({ count, witnesses, selected });
    }
    return byMembers;
  };
  const categories = new Map();
  for (const candidate of candidates) {
    const key = category(candidate);
    if (!categories.has(key)) categories.set(key, []);
    categories.get(key).push(candidate);
  }
  const states = Object.fromEntries([...categories].map(([key, rows]) => [key, subsetStates(rows)]));
  let excludedIds = null;
  for (let p1Statements = 26; p1Statements <= 45 && !excludedIds; p1Statements += 1) {
    const required = {
      'P1|STATEMENT': p1Statements,
      'P1|ANSWER': 58 - p1Statements,
      'OTHER|STATEMENT': 45 - p1Statements,
      'OTHER|ANSWER': p1Statements - 26,
    };
    const lists = Object.entries(required).map(([key, members]) => states[key]?.get(members) ?? []);
    if (lists.some((list) => !list.length)) continue;
    for (const a of lists[0]) for (const b of lists[1]) for (const c of lists[2]) for (const d of lists[3]) {
      if (a.count + b.count + c.count + d.count !== target.groups) continue;
      if (a.witnesses + b.witnesses + c.witnesses + d.witnesses !== target.witnesses) continue;
      excludedIds = [...a.selected, ...b.selected, ...c.selected, ...d.selected];
      break;
    }
  }
  if (!excludedIds) throw new Error('No se pudo reconciliar determinísticamente el perfil aprobado del escenario B.');
  const excluded = new Set(excludedIds);
  return {
    selected: groups.filter((group) => !excluded.has(group.groupId)),
    excluded: groups.filter((group) => excluded.has(group.groupId)),
  };
}

function sampleGroups(groups, count, populationDigest) {
  return [...groups]
    .sort((a, b) => sha256(`${populationDigest}|${a.groupId}`).localeCompare(sha256(`${populationDigest}|${b.groupId}`)))
    .slice(0, count);
}

function sampleInherited(groups, witnessesByGroup, count, populationDigest) {
  const candidates = groups.flatMap((group) => group.memberVisualEntityIds
    .filter((id) => !witnessesByGroup.get(group.groupId).includes(id))
    .map((id) => ({ group, id })));
  return candidates.sort((a, b) => sha256(`${populationDigest}|${a.group.groupId}|${a.id}`).localeCompare(sha256(`${populationDigest}|${b.group.groupId}|${b.id}`))).slice(0, count);
}

export function buildBalancedQueue(population, sourceGroups, geometryRows) {
  const passIds = new Set(population.map((row) => row.visualEntityId));
  const exactGroups = sourceGroups.filter((group) => group.groupType === 'EXACT_RENDER_GROUP' && group.memberVisualEntityIds.every((id) => passIds.has(id)));
  const geometryByEntity = new Map();
  for (const metric of geometryRows) {
    if (!geometryByEntity.has(metric.visualEntityId)) geometryByEntity.set(metric.visualEntityId, []);
    geometryByEntity.get(metric.visualEntityId).push(metric);
  }
  const rowById = new Map(population.map((row) => [row.visualEntityId, row]));
  const populationDigest = sha256(population.map((row) => row.inputHash).sort().join('|'));
  const { oldGroups, balancedGroups: balancedCandidates } = buildParametricGroups(population, exactGroups, geometryRows);
  const candidateWitnesses = new Map();
  for (const group of balancedCandidates) candidateWitnesses.set(group.groupId, witnessesFor(group, rowById, geometryByEntity, populationDigest, false));
  const balancedSelection = selectBalancedScenarioGroups(balancedCandidates, candidateWitnesses, rowById);
  const balancedGroups = balancedSelection.selected;
  const exactMemberIds = new Set(exactGroups.flatMap((group) => group.memberVisualEntityIds));
  const parametricMemberIds = new Set([...oldGroups, ...balancedGroups].flatMap((group) => group.memberVisualEntityIds));
  const individualIds = population.map((row) => row.visualEntityId).filter((id) => !exactMemberIds.has(id) && !parametricMemberIds.has(id)).sort();

  const witnessesByGroup = new Map();
  for (const group of oldGroups) witnessesByGroup.set(group.groupId, witnessesFor(group, rowById, geometryByEntity, populationDigest, true));
  for (const group of balancedGroups) witnessesByGroup.set(group.groupId, candidateWitnesses.get(group.groupId));
  for (const group of exactGroups) witnessesByGroup.set(group.groupId, [group.representativeVisualEntityId]);

  const direct = new Map();
  const add = (id, role, groupId = null) => {
    if (!direct.has(id)) direct.set(id, { visualEntityId: id, roles: [], groupIds: [] });
    const item = direct.get(id);
    if (!item.roles.includes(role)) item.roles.push(role);
    if (groupId && !item.groupIds.includes(groupId)) item.groupIds.push(groupId);
  };
  individualIds.forEach((id) => add(id, 'INDIVIDUAL'));
  for (const group of exactGroups) add(group.representativeVisualEntityId, 'EXACT_REPRESENTATIVE', group.groupId);
  for (const group of [...oldGroups, ...balancedGroups]) witnessesByGroup.get(group.groupId).forEach((id) => add(id, 'PARAMETRIC_WITNESS', group.groupId));
  sampleGroups(exactGroups, 49, populationDigest).forEach((group) => {
    const id = group.memberVisualEntityIds.find((memberId) => memberId !== group.representativeVisualEntityId);
    if (id) add(id, 'POST_SAMPLE_EXACT', group.groupId);
  });
  sampleInherited(oldGroups, witnessesByGroup, 8, populationDigest).forEach(({ group, id }) => add(id, 'POST_SAMPLE_PARAMETRIC_STRICT', group.groupId));
  sampleInherited(balancedGroups, witnessesByGroup, 15, populationDigest).forEach(({ group, id }) => add(id, 'POST_SAMPLE_PARAMETRIC_BALANCED', group.groupId));

  const allGroups = [...exactGroups, ...oldGroups, ...balancedGroups];
  const directIds = new Set(direct.keys());
  const inheritedIds = new Set(allGroups.flatMap((group) => group.memberVisualEntityIds.filter((id) => !directIds.has(id))));
  const queue = [...direct.values()].map((item) => {
    const row = rowById.get(item.visualEntityId);
    const groupDetails = item.groupIds.map((groupId) => allGroups.find((group) => group.groupId === groupId)).filter(Boolean);
    return {
      schemaVersion: 'mathup.fase2d.human-review-case.v1',
      queueIndex: 0,
      ...item,
      roles: item.roles.sort(),
      groupIds: item.groupIds.sort(),
      groupTypes: [...new Set(groupDetails.map((group) => group.groupType))].sort(),
      coveredEntityCount: new Set([item.visualEntityId, ...groupDetails.flatMap((group) => group.memberVisualEntityIds)]).size,
      entity: row,
      geometry: (geometryByEntity.get(item.visualEntityId) ?? []).sort((a, b) => a.viewport - b.viewport),
      expectedHashes: { inputHash: row.inputHash, literalHash: row.literalHash, renderSignature: row.renderSignature },
      decision: null,
    };
  }).sort((a, b) => {
    const priority = { P0: 0, P1: 1, P2: 2, P3: 3 };
    const entityType = { solution: 0, answer: 1, statement: 2 };
    return (priority[a.entity.priority] - priority[b.entity.priority])
      || ((entityType[a.entity.entityType] ?? 9) - (entityType[b.entity.entityType] ?? 9))
      || a.visualEntityId.localeCompare(b.visualEntityId);
  }).map((item, index) => ({ ...item, queueIndex: index + 1 }));

  return {
    schemaVersion: POLICY_VERSION,
    populationDigest,
    queue,
    groups: allGroups,
    witnessesByGroup: Object.fromEntries([...witnessesByGroup.entries()].sort()),
    counts: {
      population: population.length,
      queue: queue.length,
      inherited: inheritedIds.size,
      exactGroups: exactGroups.length,
      oldParametricGroups: oldGroups.length,
      balancedParametricGroups: balancedGroups.length,
      oldParametricMembers: oldGroups.reduce((sum, group) => sum + group.memberCount, 0),
      balancedParametricMembers: balancedGroups.reduce((sum, group) => sum + group.memberCount, 0),
      parametricGroups: oldGroups.length + balancedGroups.length,
      individuals: individualIds.length,
      balancedCandidateGroups: balancedCandidates.length,
      balancedExcludedGroups: balancedSelection.excluded.length,
    },
    balancedSelection: {
      candidateGroupCount: balancedCandidates.length,
      selectedGroupCount: balancedGroups.length,
      excludedGroupIds: balancedSelection.excluded.map((group) => group.groupId).sort(),
      rationale: 'RECONCILIACION_DETERMINISTA_CON_EL_PERFIL_APROBADO_DEL_ESCENARIO_B',
    },
  };
}

export function environmentDigest(lock) {
  return sha256(stableStringify(lock));
}

export function validateHumanDecision(input) {
  if (input.humanAction !== true) throw new Error('La decisión exige una acción humana explícita.');
  if (!DECISIONS.includes(input.decision)) throw new Error('Decisión humana no permitida.');
  if (!String(input.reviewerId ?? '').trim()) throw new Error('El identificador del revisor es obligatorio.');
  if (input.decision !== 'APROBAR' && !String(input.comment ?? '').trim()) throw new Error('El comentario es obligatorio para fallo o fuente dudosa.');
  const viewed = [...new Set(input.viewportsViewed ?? [])].sort((a, b) => a - b);
  if (!viewed.includes(320) || !viewed.includes(1280)) throw new Error('Es obligatorio visualizar 320 y 1280 px.');
  if (viewed.some((value) => !VIEWPORTS.includes(value))) throw new Error('Resolución no autorizada.');
  return { ...input, reviewerId: input.reviewerId.trim(), comment: String(input.comment ?? '').trim(), viewportsViewed: viewed };
}

export function applyDecision(state, reviewCase, input, now = new Date().toISOString()) {
  const decision = validateHumanDecision(input);
  const record = {
    schemaVersion: 'mathup.fase2d.human-decision.v1',
    decisionId: `hvd-${sha256(`${reviewCase.visualEntityId}|${now}|${decision.reviewerId}|${decision.decision}`).slice(0, 24)}`,
    visualEntityId: reviewCase.visualEntityId,
    decision: decision.decision,
    reviewerId: decision.reviewerId,
    comment: decision.comment,
    decidedAt: now,
    viewportsViewed: decision.viewportsViewed,
    expectedHashes: reviewCase.expectedHashes,
    groupIds: reviewCase.groupIds,
    previousDecisionId: state.current[reviewCase.visualEntityId]?.decisionId ?? null,
  };
  state.history.push(record);
  state.current[reviewCase.visualEntityId] = record;
  recomputePropagation(state);
  return record;
}

export function recomputePropagation(state) {
  state.propagation = {};
  state.revoked = {};
  for (const group of state.groups) {
    const required = state.witnessesByGroup[group.groupId] ?? [];
    const decisions = required.map((id) => state.current[id]).filter(Boolean);
    const groupDecisions = group.memberVisualEntityIds.map((id) => state.current[id]).filter(Boolean);
    const failure = groupDecisions.find((record) => record.decision !== 'APROBAR');
    if (failure) {
      state.revoked[group.groupId] = { status: 'GROUP_PROPAGATION_REVOKED', causeDecisionId: failure.decisionId, at: failure.decidedAt };
      continue;
    }
    if (required.length && decisions.length === required.length) {
      for (const memberId of group.memberVisualEntityIds) {
        if (required.includes(memberId) || state.current[memberId]) continue;
        state.propagation[memberId] = {
          status: 'INHERITED_HUMAN_VISUAL_PASS', groupId: group.groupId,
          witnessDecisionIds: decisions.map((record) => record.decisionId).sort(),
        };
      }
    }
  }
  return state;
}

export function invalidateChangedEnvironment(state, currentEnvironmentDigest) {
  if (state.environmentDigest === currentEnvironmentDigest) return false;
  state.invalidatedAt = new Date().toISOString();
  state.invalidationReason = 'ENVIRONMENT_HASH_CHANGED';
  state.invalidatedDecisions = Object.values(state.current ?? {});
  state.current = {};
  state.propagation = {};
  state.revoked = {};
  return true;
}

export function rollbackLastDecision(state) {
  if (!state.history.length) return null;
  const removed = state.history.pop();
  const previous = [...state.history].reverse().find((row) => row.visualEntityId === removed.visualEntityId);
  if (previous) state.current[removed.visualEntityId] = previous;
  else delete state.current[removed.visualEntityId];
  recomputePropagation(state);
  return removed;
}

export function createEmptyState(manifest) {
  return {
    schemaVersion: 'mathup.fase2d.human-review-state.v1',
    policyVersion: POLICY_VERSION,
    manifestDigest: manifest.manifestDigest,
    environmentDigest: manifest.environmentDigest,
    currentQueueIndex: 0,
    reviewerId: '',
    current: {},
    history: [],
    propagation: {},
    revoked: {},
    groups: manifest.groups,
    witnessesByGroup: manifest.witnessesByGroup,
  };
}

export function progressFor(state, queue) {
  const decisions = Object.values(state.current);
  const coverage = {};
  for (const reviewCase of queue) {
    const keys = [reviewCase.entity.courseId, reviewCase.entity.subjectId, ...(reviewCase.entity.families ?? [])].filter(Boolean);
    for (const key of keys) {
      coverage[key] ??= { reviewed: 0, pending: 0, total: 0 };
      coverage[key].total += 1;
      if (state.current[reviewCase.visualEntityId]) coverage[key].reviewed += 1;
      else coverage[key].pending += 1;
    }
  }
  return {
    reviewed: decisions.length,
    pending: queue.length - decisions.length,
    approved: decisions.filter((row) => row.decision === 'APROBAR').length,
    failed: decisions.filter((row) => row.decision === 'REVISAR/FALLO').length,
    sourceDoubt: decisions.filter((row) => row.decision === 'FUENTE DUDOSA').length,
    inherited: Object.keys(state.propagation).length,
    revoked: Object.keys(state.revoked).length,
    coverage,
  };
}

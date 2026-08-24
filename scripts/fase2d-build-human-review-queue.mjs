import fs from 'node:fs';
import path from 'node:path';
import {
  POLICY_VERSION, buildBalancedQueue, fileHash, readJsonl, sha256,
  stableStringify, writeJson, writeJsonl, environmentDigest,
} from '../catalog/human-visual-review/fase2d-human-review.mjs';

const root = path.resolve(import.meta.dirname, '..');
const run = path.join(root, 'artifacts/fase2d/runs/run-a');
const output = path.join(root, 'artifacts/fase2d-human-review');

const populationAll = readJsonl(path.join(run, 'population.jsonl'));
const visualDecisions = readJsonl(path.join(run, 'visual-decisions.jsonl'));
const passIds = new Set(visualDecisions.filter((row) => row.automationStatus === 'AUTOMATED_VISUAL_PASS').map((row) => row.visualEntityId));
const population = populationAll.filter((row) => passIds.has(row.visualEntityId));
const groups = readJsonl(path.join(run, 'render-groups.jsonl'));
const geometry = readJsonl(path.join(run, 'geometry-results.jsonl')).filter((row) => passIds.has(row.visualEntityId));

const result = buildBalancedQueue(population, groups, geometry);
const expected = {
  population: 7064, queue: 5722, inherited: 1342, exactGroups: 967,
  oldParametricGroups: 113, balancedParametricGroups: 203, parametricGroups: 316,
  individuals: 3917,
};
if (result.counts.balancedParametricGroups !== expected.balancedParametricGroups) {
  const byId = new Map(population.map((row) => [row.visualEntityId, row]));
  const balanced = result.groups.filter((group) => group.groupType === 'PARAMETRIC_BALANCED');
  const familyGroups = {};
  const familyEntities = {};
  for (const group of balanced) for (const family of new Set(group.memberVisualEntityIds.flatMap((id) => byId.get(id).families))) familyGroups[family] = (familyGroups[family] ?? 0) + 1;
  for (const family of Object.keys(familyGroups)) familyEntities[family] = new Set(balanced.flatMap((group) => group.memberVisualEntityIds).filter((id) => byId.get(id).families.includes(family))).size;
  const priorityEntities = {};
  const typeEntities = {};
  for (const id of new Set(balanced.flatMap((group) => group.memberVisualEntityIds))) { const priority = byId.get(id).priority; priorityEntities[priority] = (priorityEntities[priority] ?? 0) + 1; }
  for (const id of new Set(balanced.flatMap((group) => group.memberVisualEntityIds))) { const type = byId.get(id).entityType; typeEntities[type] = (typeEntities[type] ?? 0) + 1; }
  const sizeGroups = {};
  for (const group of balanced) sizeGroups[group.memberCount] = (sizeGroups[group.memberCount] ?? 0) + 1;
  const largeGroups = balanced.filter((group) => group.memberCount >= 20).map((group) => ({
    groupId: group.groupId, size: group.memberCount,
    examples: group.memberVisualEntityIds.slice(0, 3).map((id) => ({ id, literal: byId.get(id).literal, type: byId.get(id).entityType, course: byId.get(id).courseId, priority: byId.get(id).priority, families: byId.get(id).families })),
  }));
  const reasonGroups = {};
  for (const group of balanced) for (const reason of new Set(group.memberVisualEntityIds.flatMap((id) => byId.get(id).reasons ?? []))) reasonGroups[reason] = (reasonGroups[reason] ?? 0) + 1;
  const categoryGroups = {};
  for (const group of balanced) {
    const members = group.memberVisualEntityIds.map((id) => byId.get(id));
    const key = `${group.memberCount}|${[...new Set(members.map((row) => row.priority))].sort().join('+')}|${members[0].entityType}`;
    categoryGroups[key] = (categoryGroups[key] ?? 0) + 1;
  }
  console.log(JSON.stringify({ familyGroups, familyEntities, priorityEntities, typeEntities, sizeGroups, reasonGroups, categoryGroups, largeGroups }, null, 2));
}
for (const [key, value] of Object.entries(expected)) {
  if (result.counts[key] !== value) throw new Error(`La cola no reproduce el escenario B: ${key}=${result.counts[key]}, esperado=${value}`);
}

const protectedFiles = ['index.html', 'app.js', 'math-renderer.js'];
const environment = {
  schemaVersion: 'mathup.fase2d.human-review-environment.v1',
  policyVersion: POLICY_VERSION,
  network: 'DISABLED',
  bind: '127.0.0.1',
  renderEngine: 'mathup.fase2d.isolated-human-review-html-css.v1',
  fontPolicy: ['Cambria Math', 'STIX Two Math', 'Times New Roman', 'serif'],
  viewports: [320, 375, 768, 1280],
  inputHashes: {
    population: fileHash(path.join(run, 'population.jsonl')),
    groups: fileHash(path.join(run, 'render-groups.jsonl')),
    geometry: fileHash(path.join(run, 'geometry-results.jsonl')),
    visualDecisions: fileHash(path.join(run, 'visual-decisions.jsonl')),
  },
  protectedFiles: Object.fromEntries(protectedFiles.map((file) => [file, fileHash(path.join(root, file))])),
  reviewAssets: {
    css: fileHash(path.join(root, 'tools/fase2d-human-review/public/styles.css')),
    client: fileHash(path.join(root, 'tools/fase2d-human-review/public/app.js')),
    html: fileHash(path.join(root, 'tools/fase2d-human-review/public/index.html')),
  },
};
const environmentHash = environmentDigest(environment);

const groupManifest = result.groups.map((group) => ({
  ...group,
  requiredWitnessVisualEntityIds: result.witnessesByGroup[group.groupId] ?? [],
}));
const queueRows = result.queue.map((row) => ({ ...row, decision: null }));
const manifestCore = {
  schemaVersion: 'mathup.fase2d.human-review-manifest.v1',
  policyVersion: POLICY_VERSION,
  scenario: 'B_EQUILIBRADO',
  counts: result.counts,
  populationDigest: result.populationDigest,
  environmentDigest: environmentHash,
  queueDigest: sha256(queueRows.map((row) => stableStringify(row)).join('\n')),
  groupDigest: sha256(groupManifest.map((row) => stableStringify(row)).join('\n')),
  noAutomaticHumanPass: true,
  balancedSelection: result.balancedSelection,
};
const manifestDigest = sha256(stableStringify(manifestCore));
const manifest = { ...manifestCore, manifestDigest, groups: groupManifest, witnessesByGroup: result.witnessesByGroup };

fs.mkdirSync(output, { recursive: true });
writeJsonl(path.join(output, 'review-queue.jsonl'), queueRows);
writeJsonl(path.join(output, 'review-groups.jsonl'), groupManifest);
writeJson(path.join(output, 'environment-lock.json'), { ...environment, environmentDigest: environmentHash });
writeJson(path.join(output, 'review-manifest.json'), manifest);
writeJson(path.join(output, 'build-summary.json'), {
  schemaVersion: 'mathup.fase2d.human-review-build-summary.v1',
  counts: result.counts,
  manifestDigest,
  environmentDigest: environmentHash,
  generatedAt: null,
  deterministic: true,
});

console.log(JSON.stringify({ output: path.relative(root, output), counts: result.counts, manifestDigest }, null, 2));

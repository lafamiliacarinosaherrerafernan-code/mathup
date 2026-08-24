import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  automatedDecisionFor, countBy, readJson, readJsonl, semanticDigestForDirectory,
  sha256, stableStringify, VIEWPORTS, writeJson, writeJsonl,
} from '../catalog/visual-audit/fase2d-visual-audit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runId = process.argv.find((arg) => arg.startsWith('--run-id='))?.split('=')[1] ?? 'run-a';
const outputRoot = process.argv.find((arg) => arg.startsWith('--output-root='))?.split('=')[1] ?? 'artifacts/fase2d/runs';
const runRoot = path.join(ROOT, outputRoot, runId);
const population = readJsonl(path.join(runRoot, 'population.jsonl'));
const groups = readJsonl(path.join(runRoot, 'render-groups.jsonl'));
const sampling = readJson(path.join(runRoot, 'sampling-plan.json'));
const metricsByViewport = new Map(VIEWPORTS.map((width) => [width, readJsonl(path.join(runRoot, `geometry-${width}.jsonl`))]));
const metrics = VIEWPORTS.flatMap((width) => metricsByViewport.get(width));
if (metrics.length !== 28268) throw new Error(`Expected 28268 visual executions, received ${metrics.length}`);

const populationById = new Map(population.map((row) => [row.visualEntityId, row]));
const metricsByEntity = new Map();
for (const row of metrics) {
  if (!metricsByEntity.has(row.visualEntityId)) metricsByEntity.set(row.visualEntityId, []);
  metricsByEntity.get(row.visualEntityId).push(row);
}
const decisions = population.map((entity) => automatedDecisionFor(entity, (metricsByEntity.get(entity.visualEntityId) ?? []).sort((a, b) => a.viewport - b.viewport)));
const decisionById = new Map(decisions.map((row) => [row.visualEntityId, row]));
const issues = decisions.flatMap((decision) => decision.automationIssueCodes.map((code) => ({
  schemaVersion: 'mathup.fase2d.issue.v1',
  issueId: `viss-${sha256(`${decision.visualEntityId}|${code}`).slice(0, 28)}`,
  visualEntityId: decision.visualEntityId,
  entityId: decision.entityId,
  code,
  priority: populationById.get(decision.visualEntityId)?.priority ?? null,
  viewports: (metricsByEntity.get(decision.visualEntityId) ?? []).filter((row) => ({
    OVERFLOW: row.overflow, CLIPPING: row.clipped, OVERLAP: row.overlap, HIDDEN_CONTENT: row.hidden,
    RAW_JSON_VISIBLE: row.rawJson, RAW_LATEX_VISIBLE: row.rawLatex,
    MISSING_OR_DAMAGED_GLYPH: row.missingGlyph, RESOURCE_LOAD_ERROR: row.resourceError,
    MEASUREMENT_ERROR: row.measurementError,
  }[code])).map((row) => row.viewport),
}))).sort((a, b) => a.issueId.localeCompare(b.issueId));

const renderManifest = metrics.map((row) => {
  const entity = populationById.get(row.visualEntityId);
  const decision = decisionById.get(row.visualEntityId);
  return {
    schemaVersion: 'mathup.fase2d.render-manifest-row.v1',
    visualEntityId: row.visualEntityId,
    entityId: row.entityId,
    viewport: row.viewport,
    inputHash: entity.inputHash,
    literalHash: entity.literalHash,
    renderFingerprint: row.renderFingerprint,
    harnessVersion: 'mathup.fase2d.harness.v1',
    engine: 'Codex In-app Browser',
    cssProfile: 'mathup.fase2d.isolated-css.v1',
    fontStack: 'Cambria Math, STIX Two Math, Times New Roman',
    dpr: 1,
    locale: 'es-ES',
    automationStatus: decision.automationStatus,
    screenshotRetained: false,
    screenshotPath: null,
    regenerationUrl: `http://127.0.0.1:8812/?width=${row.viewport}&entity=${row.visualEntityId}`,
  };
}).sort((a, b) => `${a.visualEntityId}|${a.viewport}`.localeCompare(`${b.visualEntityId}|${b.viewport}`));

function dispositionCounts(rows) {
  const base = { VISUAL_PASS: 0, VISUAL_FIX_REQUIRED: 0, SOURCE_REVIEW_REQUIRED: 0, MANUAL_REVIEW_REQUIRED: 0 };
  for (const [key, value] of Object.entries(countBy(rows, (row) => row.editorialStatus))) base[key] = value;
  return base;
}

const coverageCourseEntity = {};
for (const entity of population) {
  const key = `${entity.courseId}|${entity.entityType}`;
  coverageCourseEntity[key] ??= { total: 0, automation: {}, editorial: {} };
  coverageCourseEntity[key].total += 1;
  const decision = decisionById.get(entity.visualEntityId);
  coverageCourseEntity[key].automation[decision.automationStatus] = (coverageCourseEntity[key].automation[decision.automationStatus] ?? 0) + 1;
  coverageCourseEntity[key].editorial[decision.editorialStatus] = (coverageCourseEntity[key].editorial[decision.editorialStatus] ?? 0) + 1;
}
const coverageFamily = {};
for (const entity of population) for (const family of entity.families.length ? entity.families : ['none']) {
  coverageFamily[family] ??= { total: 0, automation: {}, editorial: {} };
  coverageFamily[family].total += 1;
  const decision = decisionById.get(entity.visualEntityId);
  coverageFamily[family].automation[decision.automationStatus] = (coverageFamily[family].automation[decision.automationStatus] ?? 0) + 1;
  coverageFamily[family].editorial[decision.editorialStatus] = (coverageFamily[family].editorial[decision.editorialStatus] ?? 0) + 1;
}
const coveragePau = {};
for (const entity of population.filter((row) => row.courseId?.startsWith('2bach'))) {
  const key = `${entity.subjectId}|${entity.community}|${entity.pauYear ?? 'UNVERIFIED'}|${entity.pauCall ?? 'UNVERIFIED'}`;
  coveragePau[key] ??= { total: 0, byEntityType: {}, automation: {}, editorial: {} };
  coveragePau[key].total += 1;
  coveragePau[key].byEntityType[entity.entityType] = (coveragePau[key].byEntityType[entity.entityType] ?? 0) + 1;
  const decision = decisionById.get(entity.visualEntityId);
  coveragePau[key].automation[decision.automationStatus] = (coveragePau[key].automation[decision.automationStatus] ?? 0) + 1;
  coveragePau[key].editorial[decision.editorialStatus] = (coveragePau[key].editorial[decision.editorialStatus] ?? 0) + 1;
}

const screenshotCandidates = [];
const seenCoverage = new Set();
for (const entity of [...population].sort((a, b) => `${a.priority}|${a.courseId}|${a.entityType}|${a.visualEntityId}`.localeCompare(`${b.priority}|${b.courseId}|${b.entityType}|${b.visualEntityId}`))) {
  const decision = decisionById.get(entity.visualEntityId);
  const key = `${entity.priority}|${entity.courseId}|${entity.entityType}|${entity.families[0] ?? 'none'}|${entity.community}`;
  if (decision.automationStatus === 'AUTOMATED_VISUAL_FAIL' || !seenCoverage.has(key)) {
    screenshotCandidates.push({ visualEntityId: entity.visualEntityId, widths: decision.automationStatus === 'AUTOMATED_VISUAL_FAIL' ? VIEWPORTS : [320, 1280], reason: decision.automationStatus === 'AUTOMATED_VISUAL_FAIL' ? 'AUTOMATED_FAILURE' : 'DETERMINISTIC_COVERAGE_REPRESENTATIVE' });
    seenCoverage.add(key);
  }
  if (screenshotCandidates.length >= 48 && decisions.filter((row) => row.automationStatus === 'AUTOMATED_VISUAL_FAIL').every((row) => screenshotCandidates.some((item) => item.visualEntityId === row.visualEntityId))) break;
}

const mobileDesktopDiffs = population.map((entity) => {
  const rows = metricsByEntity.get(entity.visualEntityId) ?? [];
  const mobile = rows.find((row) => row.viewport === 320);
  const desktop = rows.find((row) => row.viewport === 1280);
  return {
    visualEntityId: entity.visualEntityId,
    mobileFingerprint: mobile?.renderFingerprint ?? null,
    desktopFingerprint: desktop?.renderFingerprint ?? null,
    heightDelta: mobile && desktop ? Math.round((mobile.contentHeight - desktop.contentHeight) * 100) / 100 : null,
    lineDelta: mobile && desktop ? mobile.lineCount - desktop.lineCount : null,
    responsiveDifferenceObserved: mobile?.renderFingerprint !== desktop?.renderFingerprint,
  };
}).sort((a, b) => a.visualEntityId.localeCompare(b.visualEntityId));

const visualFix = decisions.filter((row) => row.editorialStatus === 'VISUAL_FIX_REQUIRED');
const sourceReview = decisions.filter((row) => row.editorialStatus === 'SOURCE_REVIEW_REQUIRED');
const manualReview = decisions.filter((row) => row.editorialStatus === 'MANUAL_REVIEW_REQUIRED');
const groupSummary = {
  totalGroups: groups.length,
  exactGroups: groups.filter((row) => row.groupType === 'EXACT_RENDER_GROUP').length,
  singularEntities: groups.filter((row) => row.groupType === 'SINGULAR').length,
  groupsWithAutomatedFailure: groups.filter((group) => group.memberVisualEntityIds.some((id) => decisionById.get(id)?.automationStatus === 'AUTOMATED_VISUAL_FAIL')).length,
  inheritedHumanPasses: 0,
};

writeJsonl(path.join(runRoot, 'geometry-results.jsonl'), [...metrics].sort((a, b) => `${a.visualEntityId}|${a.viewport}`.localeCompare(`${b.visualEntityId}|${b.viewport}`)));
writeJsonl(path.join(runRoot, 'render-manifest.jsonl'), renderManifest);
writeJsonl(path.join(runRoot, 'visual-decisions.jsonl'), decisions);
writeJsonl(path.join(runRoot, 'issues.jsonl'), issues);
writeJson(path.join(runRoot, 'coverage-by-course-entity.json'), coverageCourseEntity);
writeJson(path.join(runRoot, 'coverage-by-family.json'), coverageFamily);
writeJson(path.join(runRoot, 'coverage-pau-by-subject-community-year-call.json'), coveragePau);
writeJsonl(path.join(runRoot, 'review-queues/visual-fix-required.jsonl'), visualFix);
writeJsonl(path.join(runRoot, 'review-queues/source-review-required.jsonl'), sourceReview);
writeJsonl(path.join(runRoot, 'review-queues/manual-review-required.jsonl'), manualReview);
writeJson(path.join(runRoot, 'screenshot-selection.json'), { schemaVersion: 'mathup.fase2d.screenshot-selection.v1', candidates: screenshotCandidates, permanentPngPolicy: 'SELECTIVE_ONLY', ephemeralFullCensusPngGenerated: false });
writeJsonl(path.join(runRoot, 'diffs/mobile-desktop.jsonl'), mobileDesktopDiffs);
writeJson(path.join(runRoot, 'audit-summary.json'), {
  schemaVersion: 'mathup.fase2d.audit-summary.v1',
  population: population.length,
  executions: metrics.length,
  viewports: Object.fromEntries(VIEWPORTS.map((width) => [width, metricsByViewport.get(width).length])),
  automationStatus: countBy(decisions, (row) => row.automationStatus),
  humanDecision: countBy(decisions, (row) => row.humanDecision),
  editorialStatus: dispositionCounts(decisions),
  issues: countBy(issues, (row) => row.code),
  byPriority: countBy(population, (row) => row.priority),
  byEntityType: countBy(population, (row) => row.entityType),
  groups: groupSummary,
  screenshotCandidates: screenshotCandidates.length,
  humanReviewCompleted: 0,
  catalogPublicationCertified: false,
  runtimePresentationCertified: false,
  preproductionTestStillRequired: true,
});

const contactRows = screenshotCandidates.map((item) => populationById.get(item.visualEntityId));
const escaped = (value) => String(value ?? '').replace(/[&<>]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[char]));
const contactHtml = `<!doctype html><html lang="es"><meta charset="utf-8"><title>Fase 2D - Hoja de contacto</title><style>body{font-family:Arial;background:#eef3fb;color:#10244f}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}.card{background:white;border:1px solid #ccd8ed;border-radius:10px;padding:12px}.math{font:18px/1.45 "Cambria Math","Times New Roman",serif;white-space:pre-wrap;overflow-wrap:anywhere}.meta{font:11px monospace;color:#567}</style><h1>+MathUp · Fase 2D · evidencia real seleccionada</h1><p>No contiene dictámenes humanos. Cada tarjeta conserva el literal real.</p><div class="grid">${contactRows.map((row) => `<article class="card"><b>${escaped(row.priority)} · ${escaped(row.courseId)} · ${escaped(row.entityType)}</b><div class="math">${escaped(row.literal)}</div><div class="meta">${escaped(row.visualEntityId)} · ${escaped(row.families.join(', '))}</div></article>`).join('')}</div></html>`;
fs.mkdirSync(path.join(runRoot, 'contact-sheets'), { recursive: true });
fs.writeFileSync(path.join(runRoot, 'contact-sheets/index.html'), contactHtml, 'utf8');
fs.mkdirSync(path.join(runRoot, 'screenshots'), { recursive: true });

const semanticNames = [
  'population.jsonl', 'sampling-plan.json', 'render-groups.jsonl', 'render-manifest.jsonl',
  'geometry-results.jsonl', 'visual-decisions.jsonl', 'issues.jsonl', 'coverage-by-course-entity.json',
  'coverage-by-family.json', 'coverage-pau-by-subject-community-year-call.json', 'audit-summary.json',
];
writeJson(path.join(runRoot, 'semantic-manifest.json'), semanticDigestForDirectory(runRoot, semanticNames));
process.stdout.write(`${stableStringify(readJson(path.join(runRoot, 'audit-summary.json')))}\n`);

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashFile, readJson, readJsonl, semanticDigestForDirectory, writeJson, writeJsonl } from '../catalog/visual-audit/fase2d-visual-audit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runId = process.argv.find((arg) => arg.startsWith('--run-id='))?.split('=')[1] ?? 'run-a';
const outputRoot = process.argv.find((arg) => arg.startsWith('--output-root='))?.split('=')[1] ?? 'artifacts/fase2d/runs';
const runRoot = path.join(ROOT, outputRoot, runId);
const screenshotRoot = path.join(runRoot, 'screenshots');
const selection = readJson(path.join(runRoot, 'screenshot-selection.json'));
const expected = new Map();
for (const item of selection.candidates) for (const viewport of item.widths) {
  expected.set(`${item.visualEntityId}--${viewport}.png`, { visualEntityId:item.visualEntityId, viewport, reason:item.reason });
}
const files = fs.existsSync(screenshotRoot) ? fs.readdirSync(screenshotRoot).filter((name) => name.endsWith('.png')).sort() : [];
const manifest = files.map((name) => {
  const expectedItem = expected.get(name);
  if (!expectedItem) throw new Error(`Captura no prevista en el manifiesto selectivo: ${name}`);
  const absolute = path.join(screenshotRoot, name);
  return {
    schemaVersion:'mathup.fase2d.screenshot-evidence.v1',
    ...expectedItem,
    relativePath:path.relative(ROOT, absolute).replaceAll('\\','/'),
    sha256:hashFile(absolute),
    bytes:fs.statSync(absolute).size,
    retained:true,
  };
});
const missing = [...expected.keys()].filter((name) => !files.includes(name));
if (missing.length) throw new Error(`Faltan ${missing.length} capturas selectivas: ${missing.slice(0,5).join(', ')}`);
writeJsonl(path.join(screenshotRoot, 'manifest.jsonl'), manifest);
const renderManifestPath = path.join(runRoot, 'render-manifest.jsonl');
const byKey = new Map(manifest.map((row) => [`${row.visualEntityId}|${row.viewport}`, row]));
const renderManifest = readJsonl(renderManifestPath).map((row) => {
  const evidence = byKey.get(`${row.visualEntityId}|${row.viewport}`);
  return evidence ? { ...row, screenshotRetained:true, screenshotPath:evidence.relativePath, screenshotSha256:evidence.sha256 } : row;
});
writeJsonl(renderManifestPath, renderManifest);
writeJson(path.join(runRoot, 'screenshot-summary.json'), {
  schemaVersion:'mathup.fase2d.screenshot-summary.v1',
  selectedEntities:selection.candidates.length,
  screenshotsRetained:manifest.length,
  bytes:manifest.reduce((sum,row)=>sum+row.bytes,0),
  fullCensusScreenshotsPersisted:false,
  allOtherExecutionsRegenerableFromManifest:true,
});
const semanticNames = [
  'population.jsonl', 'sampling-plan.json', 'render-groups.jsonl', 'render-manifest.jsonl',
  'geometry-results.jsonl', 'visual-decisions.jsonl', 'issues.jsonl', 'coverage-by-course-entity.json',
  'coverage-by-family.json', 'coverage-pau-by-subject-community-year-call.json', 'audit-summary.json',
];
writeJson(path.join(runRoot, 'semantic-manifest.json'), semanticDigestForDirectory(runRoot, semanticNames));
process.stdout.write(`${JSON.stringify({selectedEntities:selection.candidates.length,screenshotsRetained:manifest.length,bytes:manifest.reduce((sum,row)=>sum+row.bytes,0)})}\n`);

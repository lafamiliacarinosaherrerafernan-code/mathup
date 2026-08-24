import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(ROOT, 'artifacts/fase2d-p0-latex');
const viewports = [320, 375, 768, 1280];
const readJsonl = (file) => fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const stable = (value) => value && typeof value === 'object'
  ? Array.isArray(value)
    ? `[${value.map(stable).join(',')}]`
    : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`
  : JSON.stringify(value);
const writeJson = (file, value) => fs.writeFileSync(file, `${stable(value)}\n`, 'utf8');
const writeJsonl = (file, rows) => fs.writeFileSync(file, `${rows.map(stable).join('\n')}\n`, 'utf8');

const representations = readJsonl(path.join(outputRoot, 'representations.jsonl'));
const beforeGeometry = readJsonl(path.join(outputRoot, 'before-geometry.jsonl'));
const afterGeometry = readJsonl(path.join(outputRoot, 'after/geometry-results.jsonl'));
if (representations.length !== 3 || beforeGeometry.length !== 12 || afterGeometry.length !== 12) {
  throw new Error('La evidencia no contiene exactamente 3 entidades y 12 ejecuciones antes/después');
}
if (!beforeGeometry.every((row) => row.rawLatex === true)) throw new Error('La evidencia previa no reproduce los 12 RAW_LATEX_VISIBLE');
const failureFields = ['rawLatex', 'overflow', 'clipped', 'overlap', 'hidden', 'missingGlyph', 'resourceError', 'measurementError'];
if (!afterGeometry.every((row) => failureFields.every((field) => row[field] === false))) {
  throw new Error('Alguna ejecución posterior conserva una incidencia visual automática');
}
for (const representation of representations) {
  const rows = afterGeometry.filter((row) => row.visualEntityId === representation.visualEntityId);
  if (rows.length !== 4 || stable(rows.map((row) => row.viewport).sort((a, b) => a - b)) !== stable(viewports)) {
    throw new Error(`Cobertura incompleta para ${representation.visualEntityId}`);
  }
}

const screenshots = afterGeometry.map((row) => {
  const absolute = path.join(ROOT, row.screenshotPath);
  if (!fs.existsSync(absolute)) throw new Error(`Falta la captura ${row.screenshotPath}`);
  return {
    schemaVersion: 'mathup.fase2d-p0.screenshot-evidence.v1',
    evidenceRole: 'AFTER',
    visualEntityId: row.visualEntityId,
    viewport: row.viewport,
    screenshotPath: row.screenshotPath,
    bytes: fs.statSync(absolute).size,
    sha256: sha256(fs.readFileSync(absolute)),
  };
}).sort((a, b) => a.visualEntityId.localeCompare(b.visualEntityId) || a.viewport - b.viewport);
writeJsonl(path.join(outputRoot, 'after/screenshots/manifest.jsonl'), screenshots);

const summary = {
  schemaVersion: 'mathup.fase2d-p0.correction-summary.v1',
  scope: 'THREE_AUTHORIZED_RAW_LATEX_VISIBLE_ENTITIES_ONLY',
  entities: representations.length,
  executionsBefore: beforeGeometry.length,
  rawLatexFailuresBefore: beforeGeometry.filter((row) => row.rawLatex).length,
  executionsAfter: afterGeometry.length,
  failuresAfter: afterGeometry.filter((row) => failureFields.some((field) => row[field])).length,
  screenshotsAfter: screenshots.length,
  viewports,
  sourceLiteralHashesPreserved: representations.every((row) => row.sourceLiteralHash === row.restoredLiteralHash),
  productionFilesModified: 0,
  publicRuntimeConnected: false,
  humanGlobalReviewStarted: false,
};
writeJson(path.join(outputRoot, 'correction-summary.json'), summary);
writeJson(path.join(outputRoot, 'rollback-trial.json'), {
  schemaVersion: 'mathup.fase2d-p0.rollback-trial.v1',
  passed: summary.sourceLiteralHashesPreserved,
  method: 'Descartar la capa derivada y reconstruir cada literal concatenando segment.original/text.',
  sourceFilesWritten: 0,
  productionWrites: 0,
  supabaseWrites: 0,
});
process.stdout.write(`P0_FINALIZED executions=${afterGeometry.length} failures=${summary.failuresAfter} screenshots=${screenshots.length}\n`);

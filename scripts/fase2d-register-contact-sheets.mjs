import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashFile, readJson, readJsonl, writeJson, writeJsonl } from '../catalog/visual-audit/fase2d-visual-audit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runRoot = path.join(ROOT, 'artifacts/fase2d/runs/run-a');
const pages = readJsonl(path.join(runRoot, 'contact-sheets/retained/page-manifest.jsonl'));
const screenshotRoot = path.join(runRoot, 'screenshots/contact-sheets');
const rows = pages.map((page) => {
  const fileName = page.fileName.replace('.html','.png');
  const absolute = path.join(screenshotRoot,fileName);
  if (!fs.existsSync(absolute)) throw new Error(`Falta hoja de contacto: ${fileName}`);
  return {
    schemaVersion:'mathup.fase2d.contact-sheet-evidence.v1',
    pageNumber:page.pageNumber,
    entityCount:page.entityCount,
    visualEntityIds:page.visualEntityIds,
    viewport:1280,
    relativePath:path.relative(ROOT,absolute).replaceAll('\\','/'),
    sha256:hashFile(absolute),
    bytes:fs.statSync(absolute).size,
    humanDecision:'PENDING_HUMAN_REVIEW',
  };
});
writeJsonl(path.join(screenshotRoot,'manifest.jsonl'),rows);
const individual = readJson(path.join(runRoot,'screenshot-summary.json'));
writeJson(path.join(runRoot,'screenshot-summary.json'),{
  ...individual,
  contactSheetsRetained:rows.length,
  contactSheetEntities:rows.reduce((sum,row)=>sum+row.entityCount,0),
  contactSheetBytes:rows.reduce((sum,row)=>sum+row.bytes,0),
  totalPersistentPng:individual.screenshotsRetained+rows.length,
  totalPersistentPngBytes:individual.bytes+rows.reduce((sum,row)=>sum+row.bytes,0),
});
process.stdout.write(`${JSON.stringify({contactSheets:rows.length,entities:rows.reduce((sum,row)=>sum+row.entityCount,0),bytes:rows.reduce((sum,row)=>sum+row.bytes,0)})}\n`);

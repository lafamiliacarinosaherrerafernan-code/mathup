import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJsonl, sha256, stableStringify, writeJson, writeJsonl } from '../catalog/visual-audit/fase2d-visual-audit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runRoot = path.join(ROOT, 'artifacts/fase2d/runs/run-a');
const pageSize = 100;
const population = readJsonl(path.join(runRoot, 'population.jsonl'));
const groups = readJsonl(path.join(runRoot, 'render-groups.jsonl'));
const decisions = readJsonl(path.join(runRoot, 'visual-decisions.jsonl'));
const byId = new Map(population.map((row) => [row.visualEntityId, row]));
const reasons = new Map();
const retain = (id, reason) => {
  if (!reasons.has(id)) reasons.set(id, new Set());
  reasons.get(id).add(reason);
};
for (const row of population.filter((item) => ['P0','P1'].includes(item.priority))) retain(row.visualEntityId, row.priority);
for (const group of groups.filter((item) => item.groupType === 'SINGULAR')) retain(group.representativeVisualEntityId, 'SINGULAR_ENTITY');
for (const group of groups) retain(group.representativeVisualEntityId, 'GROUP_REPRESENTATIVE');
for (const row of decisions.filter((item) => item.automationStatus !== 'AUTOMATED_VISUAL_PASS')) retain(row.visualEntityId, 'AUTOMATED_FAILURE');
const retained = [...reasons].map(([visualEntityId, values]) => ({ ...byId.get(visualEntityId), retentionReasons:[...values].sort() })).sort((a,b)=>a.visualEntityId.localeCompare(b.visualEntityId));
const escaped = (value) => String(value ?? '').replace(/[&<>]/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;' }[char]));
const pageRoot = path.join(runRoot, 'contact-sheets', 'retained');
fs.mkdirSync(pageRoot, { recursive:true });
const pages = [];
for (let offset=0; offset<retained.length; offset+=pageSize) {
  const rows = retained.slice(offset, offset+pageSize);
  const pageNumber = Math.floor(offset/pageSize)+1;
  const fileName = `retained-${String(pageNumber).padStart(3,'0')}.html`;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>+MathUp 2D evidencia ${pageNumber}</title><style>*{box-sizing:border-box}body{margin:0;padding:12px;background:#eef3fb;color:#10244f;font-family:Arial,sans-serif}.header{position:sticky;top:0;background:#10244f;color:#fff;padding:8px;z-index:2}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:8px}.card{background:#fff;border:1px solid #ccd8ed;border-radius:8px;padding:8px;break-inside:avoid}.math{font:16px/1.4 "Cambria Math","Times New Roman",serif;white-space:pre-wrap;overflow-wrap:anywhere}.meta{font:10px/1.3 monospace;color:#567;margin-top:5px}@media(max-width:500px){.grid{grid-template-columns:1fr}}</style></head><body><div class="header">+MathUp · Fase 2D · página ${pageNumber}/${Math.ceil(retained.length/pageSize)} · ${rows.length} entidades reales · dictamen humano pendiente</div><main class="grid">${rows.map((row)=>`<article class="card"><b>${escaped(row.priority)} · ${escaped(row.courseId)} · ${escaped(row.entityType)}</b><div class="math">${escaped(row.literal)}</div><div class="meta">${escaped(row.visualEntityId)} · ${escaped(row.families.join(', '))}<br>${escaped(row.retentionReasons.join(', '))}</div></article>`).join('')}</main></body></html>`;
  fs.writeFileSync(path.join(pageRoot,fileName),html,'utf8');
  pages.push({ schemaVersion:'mathup.fase2d.contact-page.v1', pageNumber, fileName, visualEntityIds:rows.map((row)=>row.visualEntityId), entityCount:rows.length, contentHash:sha256(html) });
}
writeJsonl(path.join(pageRoot,'page-manifest.jsonl'),pages);
writeJson(path.join(runRoot,'persistent-evidence-plan.json'),{
  schemaVersion:'mathup.fase2d.persistent-evidence-plan.v1',
  retainedEntities:retained.length,
  population:population.length,
  pages:pages.length,
  pageSize,
  policy:'P0_P1_SINGULAR_GROUP_REPRESENTATIVES_FAILURES',
  humanDecision:'PENDING_HUMAN_REVIEW',
  selected:[...reasons].map(([visualEntityId,values])=>({visualEntityId,reasons:[...values].sort()})).sort((a,b)=>a.visualEntityId.localeCompare(b.visualEntityId)),
});
process.stdout.write(`${stableStringify({retainedEntities:retained.length,pages:pages.length,pageSize})}\n`);

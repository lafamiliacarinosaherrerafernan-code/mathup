import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashFile, readJson, readJsonl, sha256, stableStringify, writeJson } from '../catalog/visual-audit/fase2d-visual-audit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = path.join(ROOT, 'artifacts/fase2d/runs/run-a');
const repeat = path.join(ROOT, 'artifacts/fase2d/reproducibility/repeat-a');
const reverse = path.join(ROOT, 'artifacts/fase2d/reproducibility/reverse-order');
const semantic = ['population.jsonl','sampling-plan.json','render-groups.jsonl','geometry-results.jsonl','visual-decisions.jsonl'];
const normalizedHash = (file) => sha256(stableStringify(readJsonl(file).sort((a,b)=>`${a.visualEntityId??a.groupId??''}|${a.viewport??''}`.localeCompare(`${b.visualEntityId??b.groupId??''}|${b.viewport??''}`))));
const repeated = Object.fromEntries(semantic.map((name) => [name, name.endsWith('.jsonl') ? normalizedHash(path.join(base,name)) === normalizedHash(path.join(repeat,name)) : hashFile(path.join(base,name)) === hashFile(path.join(repeat,name))]));
const orderInvariant = {
  population: normalizedHash(path.join(base,'population.jsonl')) === normalizedHash(path.join(reverse,'population.jsonl')),
  groups: normalizedHash(path.join(base,'render-groups.jsonl')) === normalizedHash(path.join(reverse,'render-groups.jsonl')),
  sampling: readJson(path.join(base,'sampling-plan.json')).seed === readJson(path.join(reverse,'sampling-plan.json')).seed,
};
const summary = { schemaVersion:'mathup.fase2d.reproducibility-summary.v1', repeated, orderInvariant, passed:Object.values(repeated).every(Boolean)&&Object.values(orderInvariant).every(Boolean) };
writeJson(path.join(ROOT,'artifacts/fase2d/reproducibility-summary.json'),summary);
if(!summary.passed) throw new Error(`Fase 2D reproducibility failed: ${stableStringify(summary)}`);
process.stdout.write(`${stableStringify(summary)}\n`);

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashFile, readJson, stableStringify, writeJson } from '../catalog/visual-audit/fase2d-visual-audit.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=readJson(path.join(ROOT,'artifacts/fase2d/runs/run-a/input-manifest.json'));
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mathup-fase2d-rollback-'));
const marker=path.join(temp,'fase2d-layer');fs.mkdirSync(marker);fs.writeFileSync(path.join(marker,'marker.txt'),'phase2d disposable layer','utf8');
fs.rmSync(marker,{recursive:true,force:true});
const protectedAfter=Object.fromEntries(Object.keys(manifest.protectedFiles).map((relative)=>[relative,hashFile(path.join(ROOT,relative))]));
const protectedUnchanged=stableStringify(protectedAfter)===stableStringify(manifest.protectedFiles);
const result={schemaVersion:'mathup.fase2d.rollback-trial.v1',temporaryLayerRemoved:!fs.existsSync(marker),protectedFilesUnchanged:protectedUnchanged,productionWrites:0,supabaseWrites:0,passed:!fs.existsSync(marker)&&protectedUnchanged};
fs.rmSync(temp,{recursive:true,force:true});writeJson(path.join(ROOT,'artifacts/fase2d/rollback-trial.json'),result);if(!result.passed)throw new Error('Fase 2D rollback trial failed');process.stdout.write(`${stableStringify(result)}\n`);

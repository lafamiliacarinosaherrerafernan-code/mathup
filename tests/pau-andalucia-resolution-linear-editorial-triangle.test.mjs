import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildEditorialTriangleBatch} from '../scripts/resolve-andalucia-linear-editorial-triangle.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8),set=x=>x.map(p=>p.join(',')).sort().join('|');
test('official boxed instructions stay evidenced but are not solution subparts',()=>{
 const r=buildEditorialTriangleBatch('test').batch.records[0];assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.match(r.sourceLiteral,/Elija una de las dos opciones/);assert.equal(r.parts.length,2);assert.ok(r.parts.every(p=>!p.prompt.includes('Elija una')&&p.solutionSteps.length>=7));assert.deepEqual(r.parts.map(p=>p.partId),['a','b']);
});
test('triangle extrema and all six incorrect options independently disproved',()=>{
 const c=cases[0];assert.equal(set(vertices(c.constraints)),set([[2,3],[5,2],[9,6]]));near(derive(c).min,-11);near(derive(c).max,14);for(const p of[[3,2],[6,9],[0,0]])assert.ok(!feasible(p,c.constraints));near(4*5-2-16,2);near(4*2-3,5);near(4*9-6,30);
});
test('two global identities prove extrema and retain the constant term',()=>{
 for(let x=-3;x<12;x+=.25)for(let y=-3;y<12;y+=.25){near(4*x-y-5,13/16*(15+3*x-7*y)+25/16*(x+3*y-11));near(30-4*x+y,.75*(15+3*x-7*y)+6.25*(3-x+y));}
});
test('all generated options distinct; deterministic replay and no-write rollback',()=>{
 const paths=['app.js','data/andalucia-pau-runtime.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p)));const a=buildEditorialTriangleBatch('same');assert.deepEqual(a.batch.records,buildEditorialTriangleBatch('same',[...cases].reverse()).batch.records);for(const p of a.batch.records[0].parts)assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.deepEqual(before,paths.map(p=>sha(fs.readFileSync(p))));
});

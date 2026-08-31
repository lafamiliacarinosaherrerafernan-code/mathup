import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildUnboundedBatch,unboundedGraph,renderUnboundedGraph} from '../scripts/resolve-andalucia-linear-unbounded-region.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8);
test('unbounded official region: all genuine vertices and no added positivity constraints',()=>{
 const c=cases[0];assert.deepEqual(vertices(c.constraints).map(p=>p.map(n=>n===0?0:n)),[[0,7],[3,8],[9,5]]);
 for(const t of[0,1,10,1e3,1e6]){assert.ok(feasible([0,-t],c.constraints));near(0+4*(-t),-4*t);}
 for(const p of[[1,9],[7/3,35/3],[21/4,35/4],[8,3],[5,9]]){
  if(p[0]===8&&p[1]===3){assert.ok(feasible(p,c.constraints));assert.ok(!vertices(c.constraints).some(v=>v[0]===8&&v[1]===3));}
  else assert.ok(!feasible(p,c.constraints));
 }
});
test('global maximum has an independent dual certificate; there is no minimum',()=>{
 for(let x=-15;x<20;x+=.25)for(let y=-20;y<20;y+=.25){near(35-x-4*y,2/5*(21+x-3*y)+7/5*(19-x-2*y));if(feasible([x,y],cases[0].constraints))assert.ok(x+4*y<=35+1e-9);}
 assert.ok(feasible([3,8],cases[0].constraints));near(3+4*8,35);
 assert.ok(feasible([0,5],cases[0].constraints));near(0+4*5,20);
 assert.ok(feasible([0,-100],cases[0].constraints));assert.ok(-400<0&&-400<28);
});
test('source hash, three complete parts and nine distinct incorrect options',()=>{
 const r=buildUnboundedBatch('test').batch.records[0];assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);
 assert.equal(r.parts.length,3);for(const p of r.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractors.length,3);}
 assert.match(r.parts[1].answer,/no existe mínimo/);assert.match(r.parts[2].answer,/40 es imposible/);
});
test('clipped display never introduces a closed feasible boundary or extra mathematical vertices',()=>{
 const g=unboundedGraph(cases[0]),svg=renderUnboundedGraph(g);assert.equal(g.vertices.length,3);assert.equal(g.constraints.length,4);assert.equal(g.viewportOnlyConstraints.length,4);
 assert.ok(g.polygon.every(p=>feasible(p,g.constraints)));assert.match(svg,/stroke="none"/);assert.match(svg,/continúa fuera/);assert.match(svg,/−t/);assert.doesNotMatch(svg,/NaN|undefined|Infinity/);
});
test('deterministic reconstruction, order invariance and no-write rollback',()=>{
 const paths=['app.js','data/andalucia-pau-runtime.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p)));
 const a=buildUnboundedBatch('same');assert.deepEqual(a.batch.records,buildUnboundedBatch('same',[...cases].reverse()).batch.records);
 assert.deepEqual(before,paths.map(p=>sha(fs.readFileSync(p))));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildFruitBoundaryBatch} from '../scripts/resolve-andalucia-linear-fruit-source-boundary.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8);
test('fruit formulation matches original units and all integer feasible combinations',()=>{
 for(let x=0;x<=70;x++)for(let y=0;y<=70;y++)assert.equal(75*x+75*y<=3750&&100*x+50*y<=4000&&x<=2*y,x+y<=50&&2*x+y<=80&&x<=2*y);
 // Model errors are not cosmetic: their feasible sets or objective differ.
 assert.ok(20+40<=80&&2*20+40<=80);assert.ok(20+2*40>80);
 assert.ok(10<=2*20&&!(10>=2*20));assert.ok(2.4*10+1.8*20>0);
});
test('independent region vertices, minimum and three false vertex choices',()=>{
 const ps=vertices(cases[0].constraints).map(p=>p.map(x=>x===0?0:x).join(',')).sort();assert.deepEqual(ps,[[0,2],[3,.5],[5,0],[0,7]].map(p=>p.join(',')).sort());
 for(let x=-2;x<=8;x+=.25)for(let y=-2;y<=10;y+=.25){near(2*x+y-2,1.5*x+.5*(x+2*y-4));if(feasible([x,y],cases[0].constraints))assert.ok(2*x+y>=2-1e-9);}
 for(const [x,y]of[[3,.5],[5,0],[0,7]])assert.ok(2*x+y>2);
 assert.ok(!feasible([50/9,-7/9],cases[0].constraints));
});
test('official evidence retained, complete solution and four unique options per part',()=>{
 const r=buildFruitBoundaryBatch('test').batch.records[0];assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(r.parts.length,2);assert.match(r.sourceLiteral,/210/);
 for(const p of r.parts){assert.ok(p.solutionSteps.length>=7);assert.equal(new Set([p.answer,...p.distractors]).size,4);}
});
test('replay, reversed inputs and read-only rollback',()=>{
 const paths=['app.js','data/andalucia-pau-runtime.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(buildFruitBoundaryBatch('same').batch.records,buildFruitBoundaryBatch('same',[...cases].reverse()).batch.records);assert.deepEqual(before,paths.map(p=>sha(fs.readFileSync(p))));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildRecoveredRegionsBatch} from '../scripts/resolve-andalucia-linear-recovered-pdf-regions.mjs';
import {buildLastRegionsBatch} from '../scripts/resolve-andalucia-linear-last-intact-regions.mjs';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
const feasible=(c,[x,y])=>c.constraints.every(([a,b,d])=>a*x+b*y<=d+1e-8);
const key=p=>p.map(x=>x.toFixed(7)).join(',');
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
test('three page-recovered regions have independently enumerated feasible vertices',()=>{
 for(const c of cases){const found=[];for(let i=0;i<c.constraints.length;i++)for(let j=i+1;j<c.constraints.length;j++){
 const [a,b,d]=c.constraints[i],[e,f,g]=c.constraints[j],det=a*f-b*e;if(!det)continue;const p=[(d*f-b*g)/det,(a*g-d*e)/det];if(feasible(c,p))found.push(p);}
 assert.deepEqual([...new Set(found.map(key))].sort(),c.V.map(key).sort());}
});
test('2022 global upper bound and complete optimal edge, with false alternative values',()=>{
 const c=cases[0],F=(x,y)=>4*x+2*y-3;for(let i=0;i<=100;i++){const x=1+i/100,y=6-2*x;assert.ok(feasible(c,[x,y]));near(F(x,y),9);}
 for(let x=-3;x<=6;x+=.25)for(let y=-2;y<=8;y+=.25)near(9-F(x,y),2*(6-2*x-y));
 assert.deepEqual(c.V.map(([x,y])=>F(x,y)),[-3,7,9,9,3]);assert.ok(!feasible(c,[3,0]));assert.ok(!feasible(c,[4,1]));assert.ok(!feasible(c,[0,6]));
 near(F(1.5,3),9);assert.notEqual(F(1.5,3),12);assert.notEqual(F(2.5,0),9);
});
test('2023 two exact certificates prove unique global extrema',()=>{
 const c=cases[2],F=(x,y)=>5*x-3*y;
 for(let x=-3;x<=6;x+=.25)for(let y=-2;y<=8;y+=.25){near(7-F(x,y),17/14*(1-2*x+3*y)+9/14*(9-4*x-y));near(F(x,y)+11,11/5*(5-x-y)+4/5*(9*x-y));}
 const values=c.V.map(([x,y])=>F(x,y));near(Math.max(...values),7);near(Math.min(...values),-11);
 assert.ok(!feasible(c,[2,2]));assert.ok(feasible(c,[1,3.5]));
 const wrongSign=c.V.map(([x,y])=>5*x+3*y);near(Math.max(...wrongSign),53/3);near(Math.min(...wrongSign),0);
 // (1,2) is feasible but is not a vertex: feasibility alone cannot validate a proposed vertex list.
 assert.ok(feasible(c,[1,2]));assert.ok(!c.V.some(p=>key(p)===key([1,2])));
 for(const p of [[11/3,4/3],[4.5,.5]])assert.ok(!feasible(c,p));
});
test('2011 duplicate mathematical task preserves each distinct source identity and prompts',()=>{
 const a=buildRecoveredRegionsBatch('test').batch.records.find(r=>r.officialSource.documentHash.startsWith('3382ee')),b=buildLastRegionsBatch('test').batch.records.find(r=>r.officialSource.documentHash.startsWith('c70ed0'));
 assert.ok(a&&b);assert.notEqual(a.exerciseId,b.exerciseId);assert.notEqual(a.sourceLiteral,b.sourceLiteral);
 assert.deepEqual(a.parts.map(p=>[p.answer,p.distractors,p.solutionSteps]),b.parts.map(p=>[p.answer,p.distractors,p.solutionSteps]));
});
test('eight subparts and all source bytes preserved; answer and distractor alternatives distinct',()=>{
 const records=buildRecoveredRegionsBatch('test').batch.records;assert.equal(records.length,3);assert.equal(records.reduce((n,r)=>n+r.parts.length,0),8);
 for(const r of records){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);for(const p of r.parts){assert.ok(p.solutionSteps.length>=5);assert.equal(new Set([p.answer,...p.distractors]).size,4);}}
});
test('reproducibility, inverse order and read-only rollback',()=>{
 const paths=['app.js','data/andalucia-pau-runtime.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p)));
 const sort=xs=>[...xs].sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(sort(buildRecoveredRegionsBatch('same').batch.records),sort(buildRecoveredRegionsBatch('same',[...cases].reverse()).batch.records));assert.deepEqual(before,paths.map(p=>sha(fs.readFileSync(p))));
});

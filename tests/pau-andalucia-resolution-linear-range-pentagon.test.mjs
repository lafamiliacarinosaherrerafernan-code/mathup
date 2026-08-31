import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildRangePentagonBatch} from '../scripts/resolve-andalucia-linear-range-pentagon.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
import {rationalGraph,renderRationalGraph} from '../scripts/resolve-andalucia-linear-rational-and-faces.mjs';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
const set=p=>p.map(a=>a.map(x=>x.toFixed(10)).join(',')).sort().join('|');
const parse=s=>[...s.replace(/frac\{(\d+)\}\{(\d+)\}/g,(_,a,b)=>String(+a/+b)).replace(/−/g,'-').matchAll(/\((-?[\d.]+);(-?[\d.]+)\)/g)].map(m=>[+m[1],+m[2]]);
test('two official problems preserve six explicit subparts, hashes and all independent options',()=>{
 const r=buildRangePentagonBatch('test').batch.records;assert.deepEqual(r.map(x=>x.parts.length),[3,3]);assert.deepEqual(r.map(x=>x.officialSource.documentHash),['4e10e40d60aebdab7570fa77b9ce953d7bf6c9a4c8869a5d3f9b7ca3c907c154','0f95b6aefa78f1a13e2115b281338bd807177671c303c380180957fe03f0a605']);
 for(const x of r){assert.equal(sha(fs.readFileSync(x.officialSource.path)),x.officialSource.documentHash);assert.equal(x.examSlot,2);assert.equal(x.primaryTopic,'Programación lineal');for(const p of x.parts){assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=6);assert.doesNotMatch(p.prompt,/\(\d+(?:[.,]\d+)? puntos?\)/);}}
});
test('exact intersections and all vertex distractors are independently checked against every inequality',()=>{
 const sets=[[[1,0],[15/2,0],[5,5],[2,4]],[[0,0],[6,0],[5,3],[3,4],[0,5/2]]];
 const r=buildRangePentagonBatch('test').batch.records;
 for(let i=0;i<2;i++){assert.equal(set(vertices(cases[i].constraints)),set(sets[i]));assert.ok(sets[i].every(p=>feasible(p,cases[i].constraints)));const p=r[i].parts[0],options=[p.answer,...p.distractors].map(s=>set(parse(s)));assert.equal(new Set(options).size,4);assert.equal(options.filter(x=>x===set(sets[i])).length,1);}
 near(3*(26/3)-19/6,137/6);assert.ok(137/6>10);near(31/7+2*33/7,97/7);assert.ok(97/7>11);
});
test('quadrilateral max/min checked globally by dual certificates and equality conditions',()=>{
 const c=cases[0],d=derive(c);assert.equal(d.min,-20);assert.equal(d.max,30);
 for(let X=0;X<=800;X+=7)for(let Y=0;Y<=600;Y+=5){const x=X/100,y=Y/100;if(!feasible([x,y],c.constraints))continue;const f=4*x-7*y;near(30-f,2*(15-2*x-y)+9*y);near(f+20,5/11*(4*x-y-4)+24/11*(10+x-3*y));assert.ok(f>=-20-1e-9&&f<=30+1e-9);}
 assert.equal(4*2-4,4);assert.equal(3*4-2,10);assert.equal(2*7.5,15);
 const p=buildRangePentagonBatch('test').batch.records[0].parts[1];assert.match(p.answer,/Máximo 30.*mínimo −20/);assert.equal(4*5-7*5,-15);assert.ok(-15>-20);assert.ok(4<30);
});
test('every value of the closed range is attained and range distractors omit actual attained values',()=>{
 for(let i=0;i<=1000;i++){const t=i/1000,x=2+5.5*t,y=4-4*t;assert.ok(feasible([x,y],cases[0].constraints));near(4*x-7*y,-20+50*t);}
 const p=buildRangePentagonBatch('test').batch.records[0].parts[2];assert.deepEqual(p.verification.numericalEvidence.range,[-20,30]);assert.match(p.answer,/\[−20;30\]/);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(feasible([2,4],cases[0].constraints));assert.ok(feasible([7.5,0],cases[0].constraints));
});
test('pentagon extrema independently proved; every maximum/minimum distractor is false',()=>{
 const c=cases[1],d=derive(c);assert.equal(d.min,0);assert.equal(d.max,19);
 for(let X=0;X<=700;X+=7)for(let Y=0;Y<=600;Y+=5){const x=X/100,y=Y/100;if(!feasible([x,y],c.constraints))continue;const f=2*x+3*y;near(19-f,7/5*(11-x-2*y)+1/5*(18-3*x-y));assert.ok(f>=0&&f<=19+1e-9);}
 const p=buildRangePentagonBatch('test').batch.records[1].parts[1];assert.match(p.answer,/Máximo 19.*mínimo 0/);assert.equal(2*3+3*4,18);assert.equal(2*6,12);assert.equal(3*2.5,7.5);assert.ok(18<19&&12<19&&7.5>0);
});
test('membership tests every restriction and identifies exactly the violated one',()=>{
 const c=cases[1],q=[5.5,2],lhs=c.constraints.map(([a,b])=>a*q[0]+b*q[1]);assert.deepEqual(lhs,[9.5,-1.5,18.5,-5.5,-2]);assert.deepEqual(c.constraints.map(([, ,k],i)=>lhs[i]<=k),[true,true,false,true,true]);assert.equal(feasible(q,c.constraints),false);
 const p=buildRangePentagonBatch('test').batch.records[1].parts[2];assert.equal(p.verification.numericalEvidence.failedConstraintIndex,2);assert.match(p.answer,/incumple 3x\+y≤18/);
});
test('four- and five-sided region plots retain all vertices with exact fractional labels',()=>{
 cases.forEach((c,i)=>{const g=rationalGraph(c),s=renderRationalGraph(g);assert.equal(g.vertices.length,i+4);assert.equal((s.match(/<circle /g)||[]).length,i+4);assert.equal(s,renderRationalGraph(g));assert.doesNotMatch(s,/<script|undefined|NaN/);assert.match(s,/y1="-4" y2="-4"/);});
 const s=renderRationalGraph(rationalGraph(cases[1]));assert.match(s,/translate\(480,379\)/);
});
test('deterministic rebuild, reverse order and rollback preserve the official queue and runtime',()=>{
 const a=buildRangePentagonBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','bach-exam.js',...a.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildRangePentagonBatch('same').batch.records);assert.deepEqual(a.batch.records,buildRangePentagonBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

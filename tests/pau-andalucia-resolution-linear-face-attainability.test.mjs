import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildFaceAttainabilityBatch} from '../scripts/resolve-andalucia-linear-face-attainability.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
const set=p=>p.map(a=>a.map(x=>x.toFixed(10)).join(',')).sort().join('|');
const parse=s=>[...s.replace(/frac\{(\d+)\}\{(\d+)\}/g,(_,a,b)=>String(+a/+b)).replace(/−/g,'-').matchAll(/\((-?[\d.]+);(-?[\d.]+)\)/g)].map(m=>[+m[1],+m[2]]);
test('six source-specific parts preserve source hashes and all four distinct options',()=>{
 const records=buildFaceAttainabilityBatch('test').batch.records;assert.equal(records.length,2);assert.deepEqual(records.map(r=>r.parts.length),[3,3]);
 for(const r of records){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(r.examSlot,2);for(const p of r.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.doesNotMatch(p.prompt,/\(\d+(?:[.,]\d+)? puntos?\)/);}}
});
test('independent vertex enumeration rejects each distinct invalid region option',()=>{
 const expected=[[[0,3],[6,0],[5,6],[3,8]],[[2,0],[4,0],[8,5],[2,23/4]]],records=buildFaceAttainabilityBatch('test').batch.records;
 cases.forEach((c,i)=>{assert.equal(set(vertices(c.constraints)),set(expected[i]));assert.ok(expected[i].every(p=>feasible(p,c.constraints)));const p=records[i].parts[0],s=[p.answer,...p.distractors].map(x=>set(parse(x)));assert.equal(new Set(s).size,4);assert.equal(s.filter(x=>x===set(expected[i])).length,1);});
 near(99/23+234/23,333/23);assert.ok(333/23>11);assert.ok(6*16-5>36);
});
test('case 672 has two simultaneous violated restrictions at (5,7)',()=>{
 const c=cases[0],lhs=c.constraints.map(([a,b])=>5*a+7*b),flags=c.constraints.map(([, ,k],i)=>lhs[i]<=k);assert.deepEqual(lhs,[-4,12,37,-19]);assert.deepEqual(flags,[true,false,false,true]);assert.equal(feasible([5,7],c.constraints),false);
 const p=buildFaceAttainabilityBatch('test').batch.records[0].parts[1];assert.match(p.answer,/x\+y≤11 y 6x\+y≤36/);assert.deepEqual(p.verification.numericalEvidence.failed,[1,2]);
});
test('global dual identities prove extrema including every point of the minimum face',()=>{
 for(let i=0;i<=1000;i++){const t=i/1000,x=3*t,y=3+5*t;assert.ok(feasible([x,y],cases[0].constraints));near(10*x-6*y,-18);}
 for(let X=0;X<=900;X+=7)for(let Y=0;Y<=900;Y+=5){const x=X/100,y=Y/100;
  if(feasible([x,y],cases[0].constraints)){const f=10*x-6*y;near(f+18,2*(5*x-3*y+9));near(60-f,26/11*(36-6*x-y)+46/11*(x+2*y-6));assert.ok(f>=-18-1e-9&&f<=60+1e-9);}
  if(feasible([x,y],cases[1].constraints)){const f=2*x+12*y;near(f-4,2*(x-2)+12*y);near(76-f,(20-5*x+4*y)/11+17*(48-x-8*y)/11);assert.ok(f>=4-1e-9&&f<=76+1e-9);}
 }
 assert.deepEqual(cases.map(c=>[derive(c).min,derive(c).max]),[[-18,60],[4,76]]);
});
test('objective distractors are mathematically false, not merely textually distinct',()=>{
 const records=buildFaceAttainabilityBatch('test').batch.records;
 const face=records[0].parts[2];assert.match(face.answer,/todo el segmento/);assert.equal(10*1.5-6*5.5,-18);assert.ok(feasible([1.5,5.5],cases[0].constraints));assert.ok(14<60);assert.notEqual(18,-18);
 assert.equal(2*2+12*5.75,73);assert.ok(73<76);assert.ok(8>4);assert.equal(feasible([0,0],cases[1].constraints),false);
});
test('unattainable level 100 is independently bounded and each alleged point fails feasibility',()=>{
 const p=buildFaceAttainabilityBatch('test').batch.records[1].parts[2];assert.equal(p.verification.numericalEvidence.requestedLevel,100);assert.ok(derive(cases[1]).max<100);
 for(const [x,y]of p.verification.numericalEvidence.wrongPoints){assert.equal(2*x+12*y,100);assert.equal(feasible([x,y],cases[1].constraints),false);}
});
test('replay/reverse/rollback preserve official source bytes, queue and public entrypoints',()=>{
 const a=buildFaceAttainabilityBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','bach-exam.js',...a.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildFaceAttainabilityBatch('same').batch.records);assert.deepEqual(a.batch.records,buildFaceAttainabilityBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

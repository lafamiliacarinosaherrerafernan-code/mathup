import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildNegativeLevelFaceBatch} from '../scripts/resolve-andalucia-linear-negative-and-level-face.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
import {renderRationalGraph} from '../scripts/resolve-andalucia-linear-rational-and-faces.mjs';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
const set=p=>p.map(a=>a.map(x=>x.toFixed(10)).join(',')).sort().join('|');
const parse=s=>[...s.replace(/frac\{(\d+)\}\{(\d+)\}/g,(_,a,b)=>String(+a/+b)).replace(/−/g,'-').matchAll(/\((-?[\d.]+);(-?[\d.]+)\)/g)].map(m=>[+m[1],+m[2]]);
test('two source-specific exercises retain all five official parts and literal source hashes',()=>{
 const r=buildNegativeLevelFaceBatch('test').batch.records;assert.deepEqual(r.map(x=>x.parts.length),[3,2]);
 for(const x of r){assert.equal(sha(fs.readFileSync(x.officialSource.path)),x.officialSource.documentHash);assert.equal(x.examSlot,2);for(const p of x.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.doesNotMatch(p.prompt,/\(\d+(?:[.,]\d+)? puntos?\)/);}}
});
test('exact vertex sets independently reject all distinct region distractors',()=>{
 const expected=[[[-3,0],[2,0],[2,1],[0,3]],[[4.5,.5],[7,3],[3,5],[1,4]]],r=buildNegativeLevelFaceBatch('test').batch.records;
 cases.forEach((c,i)=>{assert.equal(set(vertices(c.constraints)),set(expected[i]));assert.ok(expected[i].every(p=>feasible(p,c.constraints)));for(const p of r[i].parts.filter(p=>p.answer.startsWith('Vértices'))){const options=[p.answer,...p.distractors].map(s=>set(parse(s)));assert.equal(new Set(options).size,4);assert.equal(options.filter(s=>s===set(expected[i])).length,1);}});
 assert.equal(feasible([-1,1],cases[0].constraints),true);assert.equal(feasible([3,0],cases[0].constraints),false);assert.equal(feasible([2,5],cases[0].constraints),false);
 assert.equal(feasible([-3,8],cases[1].constraints),false);assert.equal(feasible([15,11],cases[1].constraints),false);
});
test('two independent nonnegative-slack identities prove negative-abscissa extrema',()=>{
 const c=cases[0];assert.deepEqual([derive(c).min,derive(c).max],[-5,6]);
 for(let X=-400;X<=300;X+=7)for(let Y=0;Y<=400;Y+=5){const x=X/100,y=Y/100,f=-2*x-y;near(6-f,2*(3+x-y)+3*y);near(f+5,(3-x-y)+(2-x));if(feasible([x,y],c.constraints)){assert.ok(f>=-5-1e-9&&f<=6+1e-9);}}
 assert.equal(-2*(-3)-0,6);assert.equal(-2*2-1,-5);assert.equal(-2*2,-4);
});
test('all minimizers of queue1125 lie on the complete feasible level-five segment',()=>{
 const c=cases[1];assert.deepEqual([derive(c).min,derive(c).max],[5,10]);
 for(let i=0;i<=1000;i++){const t=i/1000,x=1+3.5*t,y=4-3.5*t;near(x+y,5);assert.ok(feasible([x,y],c.constraints));near(x+2*y,9-3.5*t);near(x-y,-3+7*t);near(x-2*y,-7+10.5*t);}
 for(let X=0;X<=800;X+=7)for(let Y=0;Y<=600;Y+=5){const x=X/100,y=Y/100;near(10-x-y,2/3*(13-x-2*y)+1/3*(4-x+y));if(feasible([x,y],c.constraints))assert.ok(x+y>=5-1e-9&&x+y<=10+1e-9);}
});
test('extrema alternatives are false for distinct mathematical reasons',()=>{
 const r=buildNegativeLevelFaceBatch('test').batch.records;
 assert.ok(derive(cases[0]).max>0);assert.ok(derive(cases[0]).min<-4);assert.notEqual(derive(cases[0]).max,5);
 assert.equal(feasible([2.75,2.25],cases[1].constraints),true);assert.equal(2.75+2.25,5);assert.ok(8<derive(cases[1]).max);assert.equal(feasible([2,4.5],cases[1].constraints),true);assert.notEqual(2+4.5,5);
 assert.match(r[1].parts[1].answer,/todo el segmento/);
});
test('derived graphs keep negative abscissas and exact fractional coordinates',()=>{
 for(const r of buildNegativeLevelFaceBatch('test').batch.records){const g=r.parts[0].visual,svg=renderRationalGraph(g);assert.equal(g.vertices.length,4);assert.match(svg,/data-axis="y"/);assert.doesNotMatch(svg,/NaN|undefined/);assert.ok(g.vertices.every(v=>feasible(v.point,g.constraints)));}
 const g=buildNegativeLevelFaceBatch('test').batch.records[0].parts[0].visual;assert.ok(g.domain.x[0]<0);assert.ok(g.vertices.some(v=>v.point[0]<0));
});
test('deterministic replay, reversed order and no-write rollback conserve queue/source/runtime',()=>{
 const a=buildNegativeLevelFaceBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','bach-exam.js',...a.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildNegativeLevelFaceBatch('same').batch.records);assert.deepEqual(a.batch.records,buildNegativeLevelFaceBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

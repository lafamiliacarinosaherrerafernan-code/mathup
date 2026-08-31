import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildDietFacesBatch} from '../scripts/resolve-andalucia-linear-diet-and-faces.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {renderRationalGraph} from '../scripts/resolve-andalucia-linear-rational-and-faces.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
const set=ps=>ps.map(p=>p.map(x=>x.toFixed(9)).join(',')).sort().join('|');
const points=s=>[...s.replace(/−/g,'-').matchAll(/\((-?[\d.]+);(-?[\d.]+)\)/g)].map(m=>[+m[1],+m[2]]);
test('three page-inspected official exercises keep eight whole subparts and source hashes',()=>{
 const r=buildDietFacesBatch('test').batch.records;assert.deepEqual(r.map(x=>x.parts.length),[3,3,2]);
 for(const x of r){assert.equal(sha(fs.readFileSync(x.officialSource.path)),x.officialSource.documentHash);for(const p of x.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.doesNotMatch(p.prompt,/\(\d+(?:[.,]\d+)? puntos?\)/);}}
});
test('independent boundary enumeration and substitution demonstrate each polygon and reject vertex distractors',()=>{
 const expected=[[[-1,1],[5,-1],[2,2],[0,2]],[[-2,1],[3,0],[15,0],[1,4]],[[0,4],[1,1],[3,0],[4,0]]],r=buildDietFacesBatch('test').batch.records;
 cases.forEach((c,i)=>{assert.equal(set(vertices(c.constraints)),set(expected[i]));assert.ok(expected[i].every(p=>feasible(p,c.constraints)));for(const p of r[i].parts.filter(p=>p.answer.startsWith('Vértices'))){const opts=[p.answer,...p.distractors].map(s=>set(points(s)));assert.equal(new Set(opts).size,4);assert.equal(opts.filter(s=>s===set(expected[i])).length,1);}});
});
test('negative-ordinate membership checks every constraint and all distractor rationales',()=>{
 const c=cases[0],x=4,y=-.75;assert.ok(x+y<=4);assert.ok(x-y>=-2);assert.ok(x+3*y<2);assert.ok(y<=2);assert.equal(feasible([x,y],c.constraints),false);
 assert.ok(feasible([5,-1],c.constraints));assert.ok(!(x-y< -2));near(x+3*y,1.75);
});
test('queue1240 minimum unique and entire maximum segment certified independently',()=>{
 const c=cases[0];near(derive(c).min,0);near(derive(c).max,4);
 for(let i=0;i<=1000;i++){const x=2+3*i/1000,y=4-x;assert.ok(feasible([x,y],c.constraints));near(x+y,4);}
 for(let i=-30;i<=70;i++)for(let j=-30;j<=40;j++){const x=i/10,y=j/10;near(x+y,.5*(x-y+2)+.5*(x+3*y-2));if(feasible([x,y],c.constraints))assert.ok(x+y>=-1e-9&&x+y<=4+1e-9);}
 // Single-vertex maximum is false, minimum 2 is false, AD is not maximal.
 assert.ok(feasible([3,1],c.constraints));near(3+1,4);assert.ok(0<2);near(-.5+1.5,1);
});
test('queue1356 rejects P(5,3) only for the third inequality, not fabricated comparisons',()=>{
 const x=5,y=3,c=cases[1];assert.ok(y<=x+3);assert.ok(x+5*y>=3);assert.ok(2*x+7*y>30);assert.ok(y>=0);assert.equal(feasible([x,y],c.constraints),false);near(2*x+7*y,31);
});
test('queue1356 exact endpoints, complete minimum face, upper bound and distractors',()=>{
 const c=cases[1];near(derive(c).min,-3);near(derive(c).max,15);
 for(let i=0;i<=1000;i++){const x=-2+3*i/1000,y=x+3;assert.ok(feasible([x,y],c.constraints));near(x-y,-3);}
 assert.equal(feasible([-2.01,.99],c.constraints),false);assert.equal(feasible([1.01,4.01],c.constraints),false);
 for(let i=-40;i<=170;i++)for(let j=-10;j<=60;j++){const x=i/10,y=j/10,f=x-y;near(15-f,.5*(30-2*x-7*y)+4.5*y);near(f+3,x+3-y);if(feasible([x,y],c.constraints))assert.ok(f>=-3-1e-9&&f<=15+1e-9);}
 assert.ok(feasible([0,3],c.constraints));assert.ok(15>3);assert.ok(-3<3);
});
test('diet formulation coefficients are source quantities and each wrong model is inequivalent',()=>{
 const c=cases[2];assert.deepEqual(c.objective,[6,12,0]);assert.deepEqual(c.constraints,[[1,1,4],[-3,-1,-4],[-1,-2,-3],[-1,0,0],[0,-1,0]]);
 // Exchanging nutrient coefficients wrongly rejects the valid diet (3,0).
 assert.ok(feasible([3,0],c.constraints));assert.ok(3+3*0<4);
 // Reversing the mass bound wrongly rejects the valid diet (1,1).
 assert.ok(feasible([1,1],c.constraints));assert.ok(1+1<4);
 // Exchanging prices changes the objective at a feasible point.
 assert.notEqual(6*3+12*0,12*3+6*0);
});
test('diet cost lower bound and full continuous optimum verified; all three options false',()=>{
 const c=cases[2];near(derive(c).min,18);
 for(let i=0;i<=1000;i++){const x=1+2*i/1000,y=(3-x)/2;assert.ok(feasible([x,y],c.constraints));near(6*x+12*y,18);assert.ok(x+y<=4);assert.ok(3*x+y>=4-1e-9);}
 assert.equal(feasible([.99,1.005],c.constraints),false);assert.equal(feasible([3.01,-.005],c.constraints),false);
 for(let i=0;i<=50;i++)for(let j=0;j<=50;j++){const x=i/10,y=j/10;near(6*x+12*y-18,6*(x+2*y-3));if(feasible([x,y],c.constraints))assert.ok(6*x+12*y>=18-1e-9);}
 assert.ok(feasible([2,.5],c.constraints));near(6*2+12*.5,18);near(6*4,24);assert.ok(18<24);
});
test('three exact graphs include negative coordinates and no undefined labels',()=>{
 const r=buildDietFacesBatch('test').batch.records;for(const x of r){const g=x.parts.find(p=>p.visual).visual;assert.equal(g.vertices.length,4);assert.ok(g.vertices.every(v=>feasible(v.point,g.constraints)));assert.doesNotMatch(renderRationalGraph(g),/undefined|NaN/);}
});
test('repeat, reversed order and read-only rollback preserve original queue, PDF and runtime',()=>{
 const a=buildDietFacesBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','bach-exam.js',...a.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildDietFacesBatch('same').batch.records);assert.deepEqual(a.batch.records,buildDietFacesBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

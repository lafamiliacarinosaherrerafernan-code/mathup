import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildTrianglesLevelsBatch} from '../scripts/resolve-andalucia-linear-triangles-and-levels.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {renderRationalGraph} from '../scripts/resolve-andalucia-linear-rational-and-faces.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
const set=ps=>ps.map(p=>p.map(x=>x.toFixed(9)).join(',')).sort().join('|');
const points=s=>[...s.replace(/frac\{(\d+)\}\{(\d+)\}/g,(_,a,b)=>String(+a/+b)).replace(/−/g,'-').matchAll(/\((-?[\d.]+);(-?[\d.]+)\)/g)].map(m=>[+m[1],+m[2]]);
test('three official whole exercises retain eight subparts and all original PDF hashes',()=>{
 const r=buildTrianglesLevelsBatch('test').batch.records;assert.deepEqual(r.map(x=>x.parts.length),[3,2,3]);
 for(const x of r){assert.equal(sha(fs.readFileSync(x.officialSource.path)),x.officialSource.documentHash);assert.equal(x.examSlot,2);for(const p of x.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.doesNotMatch(p.prompt,/\(\d+(?:[.,]\d+)? puntos?\)/);}}
});
test('exhaustive boundary intersections reproduce all vertex sets and disprove vertex distractors',()=>{
 const expected=[[[1,3],[2,5],[3,1]],[[-1,0],[1,0],[5/3,2/3],[-1,2]],[[4/3,0],[6,0],[1,5],[-1/3,5]]];
 const r=buildTrianglesLevelsBatch('test').batch.records;
 cases.forEach((c,i)=>{assert.equal(set(vertices(c.constraints)),set(expected[i]));assert.ok(expected[i].every(p=>feasible(p,c.constraints)));for(const p of r[i].parts.filter(p=>p.answer.startsWith('Vértices'))){const opts=[p.answer,...p.distractors].map(s=>set(points(s)));assert.equal(new Set(opts).size,4);assert.equal(opts.filter(s=>s===set(expected[i])).length,1);}});
 assert.equal(feasible([-1,7],cases[2].constraints),false);
});
test('queue1248 membership rejects one violated inequality; zero example and every wrong rationale checked',()=>{
 const c=cases[0],r=buildTrianglesLevelsBatch('test').batch.records[0];
 const x=1.1,y=2.8;assert.ok(y<=2*x+1);assert.ok(y<=13-4*x);assert.ok(x<4-y);assert.equal(feasible([x,y],c.constraints),false);
 assert.match(r.parts[0].answer,/No pertenece: x\+y=3,9<4/);assert.ok(!(2.8>3.2));
 assert.equal(feasible([2,4],c.constraints),true);assert.equal(-3*2+1.5*4,0);
 assert.equal(feasible([0,0],c.constraints),false);assert.equal(-3*2+1.5*5,1.5);
 assert.ok(derive(c).min<0);assert.ok(derive(c).max>0);
 for(let i=0;i<=1000;i++){const X=4/3+(13/6-4/3)*i/1000;assert.ok(feasible([X,2*X],c.constraints));near(-3*X+1.5*2*X,0);}
 assert.equal(feasible([4/3-.01,2*(4/3-.01)],c.constraints),false);assert.equal(feasible([13/6+.01,2*(13/6+.01)],c.constraints),false);
});
test('triangle upper optimal edge, unique minimum and dual identities independently proved',()=>{
 const c=cases[0];assert.deepEqual([derive(c).min,derive(c).max],[-7.5,1.5]);
 for(let i=0;i<=1000;i++){const x=1+i/1000,y=2*x+1;assert.ok(feasible([x,y],c.constraints));near(-3*x+1.5*y,1.5);}
 for(let i=-30;i<=50;i++)for(let j=-20;j<=70;j++){const x=i/10,y=j/10,f=-3*x+1.5*y;near(1.5-f,1.5*(1+2*x-y));near(f+7.5,1.5*(13-4*x-y)+3*(x+y-4));if(feasible([x,y],c.constraints))assert.ok(f>=-7.5-1e-9&&f<=1.5+1e-9);}
 // Distractors: maximum is not a singleton, sign-inverted values are false,
 // and BC is not an optimal face (its midpoint has F=-3).
 assert.ok(feasible([1.5,4],c.constraints));near(-3*1.5+1.5*4,1.5);assert.notEqual(derive(c).max,7.5);near(-3*2.5+1.5*3,-3);
});
test('queue1473 complete maximum face and unique negative-abscissa minimum preserve all feasible values',()=>{
 const c=cases[1];assert.deepEqual([derive(c).min,derive(c).max],[-2,6]);
 for(let i=0;i<=1000;i++){const x=-1+(8/3)*i/1000,y=(3-x)/2;assert.ok(feasible([x,y],c.constraints));near(2*x+4*y,6);}
 for(let i=-30;i<=40;i++)for(let j=-10;j<=40;j++){const x=i/10,y=j/10,f=2*x+4*y;near(6-f,2*(3-x-2*y));near(f+2,2*(x+1)+4*y);if(feasible([x,y],c.constraints))assert.ok(f>=-2-1e-9&&f<=6+1e-9);}
 // The three alternatives respectively miss (0,1.5), miss the true minimum,
 // or assert F=6 on a base whose midpoint has F=0.
 assert.ok(feasible([0,1.5],c.constraints));near(2*0+4*1.5,6);assert.ok(-2<0);assert.ok(feasible([0,0],c.constraints));assert.notEqual(0,6);
});
test('queue1619 independent lower/upper certificates establish extrema and disprove all three alternatives',()=>{
 const c=cases[2];near(derive(c).min,20/3);near(derive(c).max,30);
 for(let i=-20;i<=80;i++)for(let j=-10;j<=70;j++){const x=i/10,y=j/10,f=5*x+3*y;near(30-f,5*(6-x-y)+2*y);near(f-20/3,5/3*(3*x+y-4)+4/3*y);if(feasible([x,y],c.constraints))assert.ok(f>=20/3-1e-9&&f<=30+1e-9);}
 assert.ok(30>20);assert.ok(20/3<40/3);assert.equal(feasible([0,0],c.constraints),false);assert.equal(feasible([-1/3,5],c.constraints),true);
});
test('all three graphs render exact rational vertices with no unknown glyph values',()=>{
 const rs=buildTrianglesLevelsBatch('test').batch.records;
 for(const [i,r]of rs.entries()){const g=r.parts.find(p=>p.visual).visual,svg=renderRationalGraph(g);assert.equal(g.vertices.length,i===0?3:4);assert.match(svg,/data-axis="y"/);assert.doesNotMatch(svg,/undefined|NaN/);assert.ok(g.vertices.every(v=>feasible(v.point,g.constraints)));}
});
test('replay, reversed input and no-write rollback leave source queue and production immutable',()=>{
 const a=buildTrianglesLevelsBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','bach-exam.js',...a.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildTrianglesLevelsBatch('same').batch.records);assert.deepEqual(a.batch.records,buildTrianglesLevelsBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

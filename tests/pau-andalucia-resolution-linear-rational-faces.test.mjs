import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,rationalPair,rationalGraph,renderRationalGraph,buildRationalFacesBatch} from '../scripts/resolve-andalucia-linear-rational-and-faces.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
const set=points=>points.map(p=>p.map(x=>x.toFixed(10)).join(',')).sort().join('|');
const parse=s=>[...s.replace(/frac\{(\d+)\}\{(\d+)\}/g,(_,a,b)=>String(+a/+b)).replace(/−/g,'-').matchAll(/\((-?[\d.]+);(-?[\d.]+)\)/g)].map(m=>[+m[1],+m[2]]);
test('three complete official exercises retain seven source parts and unchanged documentary authority',()=>{
 const {batch}=buildRationalFacesBatch('test');assert.equal(batch.records.length,3);assert.deepEqual(batch.records.map(r=>r.parts.length),[2,3,2]);
 assert.deepEqual(batch.records.map(r=>r.officialSource.documentHash),['77e0c295529ccd4ed502b5859d4011cb4b0e955a1e4795e570a9da20ae48293c','ac80a164e049669cd01083ca5adaddfa90efbf556b050de2d99f294ab55670c9','c637bbde5c26c0b35b59202bd832ddc97990d3845365ce483fbf2a49832f73fe']);
 for(const r of batch.records){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(r.officialSource.range.page,2);assert.equal(r.examSlot,2);assert.equal(r.primaryTopic,'Programación lineal');for(const p of r.parts){assert.ok(p.solutionSteps.length>=6);assert.doesNotMatch(p.prompt,/\(\d+(?:[.,]\d+)? puntos?\)/);assert.equal(new Set([p.answer,...p.distractors]).size,4);}}
});
test('rational vertices agree with independent exact elimination and all four region options are distinct',()=>{
 const expected=[[[5/4,0],[3,0],[5/3,4/3],[5/16,15/8]],[[5,0],[8,0],[10,2/3],[3,3]],[[0,2],[2,6],[3,11],[0,5]]];
 const records=buildRationalFacesBatch('test').batch.records;
 for(let i=0;i<3;i++){
  assert.equal(set(vertices(cases[i].constraints)),set(expected[i]));
  assert.ok(expected[i].every(p=>feasible(p,cases[i].constraints)));
  for(const k of i===1?[0,1]:[0]){const p=records[i].parts[k],options=[p.answer,...p.distractors].map(s=>set(parse(s)));assert.equal(new Set(options).size,4);assert.equal(options.filter(s=>s===set(expected[i])).length,1);}
 }
 // Cramer's determinants for the two nonintegral intersections of case 113.
 assert.equal(2*2-5*2,-6);near((10*2-5*6)/-6,5/3);near((2*6-10*2)/-6,4/3);
 assert.equal(4*5-2*2,16);near((5*5-2*10)/16,5/16);near((4*10-5*2)/16,15/8);
});
test('independent dual certificates prove the rational extrema globally and uniquely',()=>{
 const d=derive(cases[0]);near(d.min,5/4);near(d.max,13/3);assert.ok(65*3<13*16);
 for(let X=0;X<=400;X+=3)for(let Y=0;Y<=300;Y+=2){const x=X/100,y=Y/100;if(!feasible([x,y],cases[0].constraints))continue;const f=x+2*y;near(f-5/4,(4*x+2*y-5)/4+3*y/2);near(13/3-f,(10-2*x-5*y)/3+(6-2*x-2*y)/6);assert.ok(f>=5/4-1e-12&&f<=13/3+1e-12);}
 // Equality requires both nonnegative terms to vanish, fixing each extremum.
 assert.equal(4*(5/4)+2*0-5,0);near(10-2*(5/3)-5*(4/3),0);near(6-2*(5/3)-2*(4/3),0);
 const r=buildRationalFacesBatch('test').batch.records[0].parts[1];assert.match(r.answer,/13\}\{3/);near(5/16+2*15/8,65/16);assert.ok(65/16<13/3);assert.ok(3>5/4);
});
test('maximum 56 is checked globally and each distractor is a different nonoptimal vertex value',()=>{
 const c=cases[1],d=derive(c);assert.equal(d.max,56);assert.deepEqual(d.values,[42,25,40,56]);
 for(let X=0;X<=1100;X+=5)for(let Y=0;Y<=500;Y+=3){const x=X/100,y=Y/100;if(!feasible([x,y],c.constraints))continue;near(56-5*x-9*y,(8-x+3*y)+4*(12-x-3*y));assert.ok(5*x+9*y<=56+1e-12);}
 const p=buildRationalFacesBatch('test').batch.records[1].parts[2];assert.deepEqual([p.answer,...p.distractors].map(s=>+s.match(/Máximo (\d+)/)[1]),[56,42,40,25]);
});
test('both complete optimal edges are proved; no isolated endpoint masquerades as all optima',()=>{
 const c=cases[2],d=derive(c);assert.deepEqual(d.values,[-6,-15,-6,-15]);assert.equal(d.min,-15);assert.equal(d.max,-6);
 for(let i=0;i<=1000;i++){const t=i/1000;for(const [x,y,value]of [[2*t,2+4*t,-6],[3*t,5+6*t,-15]]){assert.ok(feasible([x,y],c.constraints));near(6*x-3*y,value);near(-6-(6*x-3*y),3*(y-2*x-2));near(6*x-3*y+15,3*(2*x+5-y));}}
 const p=buildRationalFacesBatch('test').batch.records[2].parts[1];assert.match(p.answer,/todo el segmento.*todo el segmento/);assert.ok(feasible([1,4],c.constraints));assert.equal(6-12,-6);assert.ok(feasible([1,7],c.constraints));assert.equal(6-21,-15);
 assert.deepEqual(p.verification.numericalEvidence.maximumFace,{from:[0,2],to:[2,6],value:-6});assert.deepEqual(p.verification.numericalEvidence.minimumFace,{from:[0,5],to:[3,11],value:-15});
});
test('fractional graph coordinates are exact and vertically composed, not rounded decimal labels',()=>{
 for(const c of cases){const g=rationalGraph(c),s=renderRationalGraph(g);assert.equal(s,renderRationalGraph(g));assert.equal(g.vertices.length,4);assert.equal((s.match(/<circle /g)||[]).length,4);assert.doesNotMatch(s,/<script|undefined|foreignObject/);g.vertices.forEach((v,i)=>v.point.forEach((x,j)=>assert.equal(g.exactCoordinates[i][j][0]/g.exactCoordinates[i][j][1],x)));}
 const s=renderRationalGraph(rationalGraph(cases[0]));assert.match(s,/y1="-4" y2="-4"/);assert.match(s,/>16<\/text>/);assert.doesNotMatch(s,/>A = \([^<]*\.\d/);assert.deepEqual(rationalPair(5/16),[5,16]);assert.throws(()=>rationalPair(Math.PI));
});
test('replay, reverse order and rollback leave original PDFs, queue and runtime unchanged',()=>{
 const a=buildRationalFacesBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','bach-exam.js',...a.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildRationalFacesBatch('same').batch.records);assert.deepEqual(a.batch.records,buildRationalFacesBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

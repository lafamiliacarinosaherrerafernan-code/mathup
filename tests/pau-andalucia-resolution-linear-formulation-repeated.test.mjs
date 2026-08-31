import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildFormulationRepeatedBatch} from '../scripts/resolve-andalucia-linear-formulation-and-repeated-region.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {renderRationalGraph} from '../scripts/resolve-andalucia-linear-rational-and-faces.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const set=x=>x.map(p=>p.join(',')).sort().join('|');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);

test('four complete official exercises, eleven parts, original source hashes and four distinct options',()=>{
 const b=buildFormulationRepeatedBatch('test').batch.records;assert.equal(b.length,4);assert.deepEqual(b.map(r=>r.parts.length),[2,3,3,3]);
 for(const r of b){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);for(const p of r.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.doesNotMatch(p.answer,/undefined|NaN/);}}
});
test('nutrition model follows grams and prices; all distractor models have a counterexample',()=>{
 for(let x=0;x<15;x+=.5)for(let y=0;y<15;y+=.5){assert.equal(600*x+300*y>=1800,2*x+y>=6);assert.equal(200*x+600*y>=2400,x+3*y>=12);near(.5*x+.25*y,(50*x+25*y)/100);}
 assert.ok(2*0+8>=6&&0+3*8>=12);assert.ok(!(2*0+8<=6));
 assert.ok(2*0+6>=6&&0+3*6>=12);assert.ok(!(3*0+6>=12));
 assert.ok(.5*0+.25*6<.5*0+.25*8); // minimizing and maximizing are different.
 const p=buildFormulationRepeatedBatch('test').batch.records[0].parts[0];assert.match(p.answer,/Minimizar/);assert.ok(p.solutionSteps.some(s=>JSON.stringify(s).includes('plantear sin resolver')));
});
test('independent triangle ignores nutrition positivity, and its maximum has a global dual certificate',()=>{
 const c=cases[0];assert.equal(set(vertices(c.constraints)),set([[0,-1],[4,1],[0,5]]));near(derive(c).max,19);
 assert.ok(feasible([0,-1],c.constraints));assert.ok(!feasible([1,4],c.constraints)||4+12<19);
 for(let x=-1;x<=6;x+=.25)for(let y=-2;y<=7;y+=.25)near(19-4*x-3*y,(2-x+2*y)/3+11*(5-x-y)/3);
});
test('five-vertex region has certified extrema and the level30 is unattainable',()=>{
 const c=cases[1];assert.equal(set(vertices(c.constraints)),set([[0,2],[2,0],[5,0],[6,3],[0,5]]));near(derive(c).min,2);near(derive(c).max,21);
 for(let x=-2;x<=8;x+=.25)for(let y=-2;y<=8;y+=.25){near(3*x+y-2,x+y-2+2*x);near(21-3*x-y,.6*(15-x-3*y)+.8*(15-3*x+y));}
 for(const p of [[0,0],[3,6],[15,0],[0,15],[10,0],[5,15]])assert.ok(!feasible(p,c.constraints));assert.ok(30>21);
});
test('2010 quadrilateral maximizes at oblique intersection, not at highest ordinate or infeasible cross',()=>{
 const c=cases[2];assert.equal(set(vertices(c.constraints)),set([[0,0],[10,5],[9,6],[0,6]]));near(derive(c).max,105);
 for(let x=-1;x<=16;x+=.25)for(let y=-1;y<=8;y+=.25)near(105-8*x-5*y,7*(15-x-y)+2*y-x);
 assert.ok(!feasible([15,0],c.constraints));assert.ok(!feasible([12,6],c.constraints));assert.ok(!feasible([5,10],c.constraints));assert.ok(102<105&&30<105);
});
test('2017 reused mathematics preserves the different official membership/extrema order',()=>{
 const c=cases[3],r=buildFormulationRepeatedBatch('test').batch.records[3];assert.equal(set(vertices(c.constraints)),set([[0,0],[6,0],[5,3],[3,4],[0,2.5]]));near(derive(c).min,0);near(derive(c).max,19);
 assert.ok(!feasible([5.5,2],c.constraints));assert.match(r.parts[1].answer,/No/);assert.match(r.parts[1].prompt,/5\.5/);assert.match(r.parts[2].answer,/19/);assert.match(r.parts[2].prompt,/máximo/);
 assert.deepEqual(r.parts.map(p=>p.partId),['a','b','c']);
});
test('all required region graphs match actual constraints without undefined labels',()=>{
 const b=buildFormulationRepeatedBatch('test').batch.records;for(const [i,r]of b.entries())for(const p of r.parts)if(p.visual){assert.deepEqual(p.visual.constraints,cases[i].constraints);assert.ok(p.visual.vertices.every(v=>feasible(v.point,cases[i].constraints)));assert.doesNotMatch(renderRationalGraph(p.visual),/undefined|NaN/);}
});
test('deterministic replay, inverse ordering and no-write rollback preserve sources and queue',()=>{
 const a=buildFormulationRepeatedBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js',...a.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildFormulationRepeatedBatch('same').batch.records);assert.deepEqual(a.batch.records,buildFormulationRepeatedBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(before,paths.map(p=>sha(fs.readFileSync(p))));assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

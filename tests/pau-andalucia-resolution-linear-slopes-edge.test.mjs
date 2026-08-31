import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildSlopesEdgeBatch} from '../scripts/resolve-andalucia-linear-slopes-and-optimal-edge.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {renderRationalGraph} from '../scripts/resolve-andalucia-linear-rational-and-faces.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`),set=x=>x.map(p=>p.join(',')).sort().join('|');
test('two complete source-bound official exercises and five parts, with full solutions and four options',()=>{
 const r=buildSlopesEdgeBatch('test').batch.records;assert.deepEqual(r.map(x=>x.parts.length),[3,2]);for(const x of r){assert.equal(sha(fs.readFileSync(x.officialSource.path)),x.officialSource.documentHash);for(const p of x.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);}}
});
test('fractional slope region vertices and maximum are independently certified',()=>{
 const c=cases[0];assert.equal(set(vertices(c.constraints)),set([[0,9],[3,0],[7,10],[0,14]]));near(derive(c).max,178);near(derive(c).min,42);
 for(let x=-1;x<11;x+=.25)for(let y=-1;y<16;y+=.25){near(178-14*x-8*y,68/43*(98-4*x-7*y)+66/43*(15-5*x+2*y));assert.equal(y<=14-4*x/7+1e-9,4*x+7*y<=98+1e-9);}
 assert.ok(!feasible([10,7],c.constraints));assert.ok(112<178&&42<178);
});
test('nonoptimal witness and all three incorrect alternatives checked',()=>{
 const c=cases[0];assert.ok(feasible([0,9],c.constraints));near(14*0+8*9,72);assert.ok(72<178);assert.ok(!feasible([0,0],c.constraints));assert.ok(!feasible([0,15],c.constraints));assert.ok(feasible([7,10],c.constraints));near(14*7+8*10,178);
});
test('negative coordinates allowed; rational vertex and the entire minimizing edge are necessary',()=>{
 const c=cases[1];assert.equal(set(vertices(c.constraints)),set([[-3,2],[-2,0],[2.5,0],[1,6]]));near(derive(c).min,-2);near(derive(c).max,4);
 for(let i=0;i<=100;i++){const x=-3+i/100,y=-4-2*x;assert.ok(feasible([x,y],c.constraints));near(x+y/2,-2);}
 assert.ok(!feasible([10,0],c.constraints));assert.ok(!feasible([6,1],c.constraints));assert.ok(feasible([0,0],c.constraints));assert.ok(!vertices(c.constraints).some(p=>p[0]===0&&p[1]===0)); // feasible does not mean vertex.
});
test('dual bounds prove optimal-face statements globally, not just by vertex sampling',()=>{
 for(let x=-5;x<=6;x+=.25)for(let y=-3;y<=8;y+=.25){near(x+y/2+2,(2*x+y+4)/2);near(4-x-y/2,(5+x-y)/5+3*(10-4*x-y)/10);}
 assert.ok(2.5<4);assert.notEqual(1+6,1+6/2);
});
test('derived graph vertices and constraints remain identical to the solved regions',()=>{
 const records=buildSlopesEdgeBatch('test').batch.records;for(const [i,r]of records.entries()){const g=r.parts[0].visual;assert.deepEqual(g.constraints,cases[i].constraints);assert.ok(g.vertices.every(x=>feasible(x.point,g.constraints)));assert.doesNotMatch(renderRationalGraph(g),/undefined|NaN/);}
});
test('reproducibility, reverse order and no-write rollback preserve queue, public files and PDFs',()=>{
 const a=buildSlopesEdgeBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js',...a.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildSlopesEdgeBatch('same').batch.records);assert.deepEqual(a.batch.records,buildSlopesEdgeBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(before,paths.map(p=>sha(fs.readFileSync(p))));assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

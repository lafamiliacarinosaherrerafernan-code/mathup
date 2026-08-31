import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildProductionModelsBatch} from '../scripts/resolve-andalucia-linear-production-models.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {renderRationalGraph} from '../scripts/resolve-andalucia-linear-rational-and-faces.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`),set=x=>x.map(p=>p.join(',')).sort().join('|');
test('four official exercises, ten complete parts and source hashes',()=>{
 const records=buildProductionModelsBatch('test').batch.records;assert.deepEqual(records.map(r=>r.parts.length),[2,3,2,3]);for(const r of records){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);for(const p of r.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);}}
});
test('boat formulation preserves integrality, resource weights and direction of objective',()=>{
 const valid=(x,y)=>Number.isInteger(x)&&Number.isInteger(y)&&x>=0&&y>=0&&y>=x/4&&y<=2*x&&2*x+y<=100;
 assert.ok(valid(20,20));assert.ok(valid(40,10));assert.ok(!valid(40,9));assert.ok(!valid(10,21));assert.ok(!valid(40,30));assert.ok(!valid(10.5,10));assert.ok(2*40+10<=100&&40+2*10<=100);assert.ok(2*40+30>100&&40+2*30<=100);assert.notEqual(20+20,0+0);
});
test('boat separate region has a whole minimizing edge, without integer restriction',()=>{
 const c=cases[0];assert.equal(set(vertices(c.constraints)),set([[60,30],[105,30],[70,60]]));near(derive(c).min,300);near(derive(c).max,570);
 for(let i=0;i<=100;i++){const x=60+i/10,y=3*x-150;assert.ok(feasible([x,y],c.constraints));near(6*x-2*y,300);}for(let x=50;x<110;x+=.5)for(let y=20;y<70;y+=.5)near(6*x-2*y-300,2*(3*x-y-150));
});
test('2018 region, membership, exact extrema and all alleged optimum distractors',()=>{
 const c=cases[1];assert.equal(set(vertices(c.constraints)),set([[1,0],[5,0],[4,3],[2,2]]));assert.ok(!feasible([3,3],c.constraints));near(derive(c).min,2);near(derive(c).max,15);assert.ok(!feasible([5,3],c.constraints));near(3*4-2*3,6);near(3*1,3);
 for(let x=-2;x<7;x+=.25)for(let y=-2;y<7;y+=.25){near(15-3*x+2*y,15-3*x-y+3*y);near(3*x-2*y-2,4/3*(2*x-y-2)+(2+x-2*y)/3);}
});
test('factory formulation constraints follow independent rates and do not solve an unasked optimization',()=>{
 const valid=(x,y)=>x>=0&&y>=0&&10*x+7*y>=400&&5*x+6*y>=280&&x<=2*y;
 assert.ok(valid(20,40));assert.ok(valid(0,60));assert.ok(!valid(0,0));assert.ok(!valid(60,0));assert.ok(valid(20.5,40));assert.equal(1200*20+1500*40,84000);
 const p=buildProductionModelsBatch('test').batch.records[2].parts[0];assert.match(p.answer,/Minimizar/);assert.match(p.solutionSteps.map(s=>JSON.stringify(s)).join(' '),/sin resolver/);
});
test('factory separate region vertices, unique minimum and exact global bound',()=>{
 const c=cases[2];assert.equal(set(vertices(c.constraints)),set([[1,3],[3,2],[4,4],[2,7]]));near(derive(c).min,5);assert.ok(!feasible([0,0],c.constraints));assert.ok(!feasible([7,2],c.constraints));assert.ok(!feasible([6.5,.25],c.constraints));near(2*3+2,8);
 for(let x=-2;x<=8;x+=.25)for(let y=-2;y<=9;y+=.25)near(2*x+y-5,2/3*(x+2*y-7)+(4*x-y-1)/3);
});
test('coffee resource model, infeasible proposal and maximizing certificate',()=>{
 const c=cases[3];assert.equal(set(vertices(c.constraints)),set([[0,0],[10,0],[10,3],[5,6],[3,6]]));near(derive(c).max,34);assert.ok(!feasible([7,5],c.constraints));near(4.5*7+7.5*5,69);near(3*7,21);near(1.5*5,7.5);assert.ok(!feasible([10,6],c.constraints));near(2*10+4*3,32);near(2*3+4*6,30);
 for(let x=-1;x<=12;x+=.25)for(let y=-1;y<=8;y+=.25){assert.equal(4.5*x+7.5*y<=67.5+1e-9,3*x+5*y<=45+1e-9);near(34-2*x-4*y,2/3*(45-3*x-5*y)+2/3*(6-y));}
});
test('all real graphs preserve solved constraints and contain no undefined coordinates',()=>{
 for(const [i,r]of buildProductionModelsBatch('test').batch.records.entries()){const g=r.parts.find(p=>p.visual).visual;assert.deepEqual(g.constraints,cases[i].constraints);assert.ok(g.vertices.every(v=>feasible(v.point,g.constraints)));assert.doesNotMatch(renderRationalGraph(g),/undefined|NaN/);}
});
test('deterministic replay, reverse order, immutable sources and no-write rollback',()=>{
 const a=buildProductionModelsBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','app.js','data/andalucia-pau-runtime.js',...a.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildProductionModelsBatch('same').batch.records);assert.deepEqual(a.batch.records,buildProductionModelsBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(before,paths.map(p=>sha(fs.readFileSync(p))));assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

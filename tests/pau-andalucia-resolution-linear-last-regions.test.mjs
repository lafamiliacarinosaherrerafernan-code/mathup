import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildLastRegionsBatch} from '../scripts/resolve-andalucia-linear-last-intact-regions.mjs';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
const key=([x,y])=>`${x.toFixed(7)},${y.toFixed(7)}`;
const F=(c,x,y)=>c.objective[0]*x+c.objective[1]*y+c.objective[2];
const feasible=(c,x,y)=>c.constraints.every(([a,b,d])=>a*x+b*y<=d+1e-8);
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
test('four official regions: pairwise boundaries independently recover every feasible vertex',()=>{
 for(const c of cases){const vertices=[];for(let i=0;i<c.constraints.length;i++)for(let j=i+1;j<c.constraints.length;j++){
 const [a,b,d]=c.constraints[i],[e,f,g]=c.constraints[j],det=a*f-b*e;if(!det)continue;
 const x=(d*f-b*g)/det,y=(a*g-d*e)/det;if(feasible(c,x,y))vertices.push([x,y]);}
 assert.deepEqual([...new Set(vertices.map(key))].sort(),c.V.map(key).sort());
 const values=c.V.map(([x,y])=>F(c,x,y));const expected={1469:[8.5,16],1535:[-6,13],1636:[0,14],934:[6,14]}[c.index];
 near(Math.min(...values),expected[0]);near(Math.max(...values),expected[1]);
 for(const a of c.V)for(const b of c.V)for(let k=0;k<=100;k++){const t=k/100,x=t*a[0]+(1-t)*b[0],y=t*a[1]+(1-t)*b[1];assert.ok(feasible(c,x,y));assert.ok(F(c,x,y)>=expected[0]-1e-8&&F(c,x,y)<=expected[1]+1e-8);}
 }
});
test('global dual certificates are polynomial identities, independent of vertex enumeration',()=>{
 for(let x=-4;x<=22;x+=.5)for(let y=-5;y<=16;y+=.5){
 near(5*x+4*y-8.5,2.5*(2*x+y-4)+1.5*(y+1));near(16-5*x-4*y,5*(3-x-y)+(y+1));
 near(3*x-2*y+9,19/32*(6*x-y+9)+9/32*(13-2*x-5*y));near(10-3*x+2*y,5/16*(13-2*x-5*y)+19/16*(5-2*x+3*y));
 near(.6*x+y,(3*x+5*y)/5);near(8-x+y,4/9*(20-x-y)+1/9*(13*y-5*x-8));
 }
});
test('optimal edges contain infinitely many minimizers/maximizers, not just their endpoints',()=>{
 const a=cases.find(c=>c.index===1636),b=cases.find(c=>c.index===934);
 for(let k=0;k<=100;k++){const t=k/100,x=15*t,y=14-9*t;assert.ok(feasible(a,x,y));near(F(a,x,y),14);
 const u=1+9*t;assert.ok(feasible(b,u,u));near(F(b,u,u),6);}
});
test('membership and the level-nine witness satisfy or violate the exact official constraints',()=>{
 const a=cases.find(c=>c.index===1469),b=cases.find(c=>c.index===1636),c=cases.find(c=>c.index===934);
 assert.ok(feasible(a,2,1));assert.ok(feasible(a,13/5,-1));near(F(a,13/5,-1),9);assert.ok(!feasible(a,1,1));
 assert.ok(!feasible(b,4.1,11.7));near(3*4.1+5*11.7,70.8);assert.ok(feasible(c,3,2.5));
});
test('source hashes, thirteen subparts, graph bounds and four distinct options',()=>{
 const records=buildLastRegionsBatch('test').batch.records;assert.equal(records.length,4);assert.equal(records.reduce((n,r)=>n+r.parts.length,0),13);
 for(const r of records){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);for(const p of r.parts){assert.ok(p.solutionSteps.length>=5);assert.equal(new Set([p.answer,...p.distractors]).size,4);}}
 for(const c of cases)for(const [x,y]of c.V){assert.ok(x>=c.domain.x[0]&&x<=c.domain.x[1]);assert.ok(y>=c.domain.y[0]&&y<=c.domain.y[1]);}
});
test('replay, reversed order and read-only rollback leave queue and runtime intact',()=>{
 const paths=['app.js','data/andalucia-pau-runtime.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p)));
 const normalize=xs=>[...xs].sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));
 assert.deepEqual(normalize(buildLastRegionsBatch('same').batch.records),normalize(buildLastRegionsBatch('same',[...cases].reverse()).batch.records));assert.deepEqual(before,paths.map(p=>sha(fs.readFileSync(p))));
});

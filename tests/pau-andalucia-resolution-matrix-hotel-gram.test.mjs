import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildHotelGramBatch} from '../scripts/resolve-andalucia-matrix-hotel-and-gram.mjs';
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const eq=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((x,j)=>Math.abs(x-B[i][j])<1e-10));
const det3=A=>A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const rows=()=>buildHotelGramBatch('hotel-gram-test').batch.records;
const e=(rr,index,p)=>rr.find(r=>r.correctionEvidence.parameters.index===index).parts[p].verification.numericalEvidence;
test('hotel source quantities preserve rows/columns and independently reproduce all six costs',()=>{
 const rr=rows(),c=cases[0];assert.deepEqual(e(rr,82,0).A,[[65,85,104],[78,83,106]]);assert.deepEqual(e(rr,82,0).D,[[3,15,2],[2,12,5],[1,16,7]]);
 const costs=mul(c.D,T(c.A));assert.deepEqual(costs,e(rr,82,1).costs);assert.deepEqual(costs,[[1678,1691],[1670,1682],[2153,2148]]);
 assert.deepEqual(costs.map(r=>r[0]<r[1]?1:2),e(rr,82,1).preferred);assert.deepEqual(costs.map(r=>r[1]-r[0]),[13,12,-5]);
 for(const w of e(rr,82,1).wrongCosts)assert.notDeepEqual(w,costs);
 assert.deepEqual(mul(c.D,[[65,78],[104,106],[85,83]]),e(rr,82,1).wrongCosts[0]);
 assert.deepEqual(c.D.map(r=>[r[0]*65,r[0]*78]),e(rr,82,1).wrongCosts[1]);
});
test('hotel inversibility proved by determinant and independent row reduction, rectangular A not invertible',()=>{
 const c=cases[0],rr=rows();assert.equal(det3(c.D),-83);assert.equal(e(rr,82,2).detD,-83);assert.deepEqual(e(rr,82,2).orderA,[2,3]);
 const D=c.D.map(r=>r.slice());let product=1;for(let i=0;i<3;i++){const pivot=D[i][i];assert.notEqual(pivot,0);product*=pivot;for(let j=i+1;j<3;j++){const k=D[j][i]/pivot;for(let z=i;z<3;z++)D[j][z]-=k*D[i][z];}}
 assert.ok(Math.abs(product+83)<1e-10);assert.notEqual(det3(c.D),187);assert.notEqual(c.A.length,c.A[0].length);
});
test('Gram matrix determinant polynomial derived from exact polynomial operations for all real parameters',()=>{
 const padd=(a,b,k=1)=>Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]??0)+k*(b[i]??0));
 const pmul=(a,b)=>{const r=Array(a.length+b.length-1).fill(0);a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y));return r;};
 const A=[[[1],[0],[-2]],[[0,1],[1],[0]]];const B=A.map(r=>A.map(s=>r.reduce((v,x,i)=>padd(v,pmul(x,s[i])),[0])));
 assert.deepEqual(B,[[[5],[0,1]],[[0,1],[1,0,1]]]);const determinant=padd(pmul(B[0][0],B[1][1]),pmul(B[0][1],B[1][0]),-1);
 assert.deepEqual(determinant,[5,0,4]);assert.deepEqual(e(rows(),406,0).determinantCoefficients,determinant);assert.equal(e(rows(),406,0).minimum,5);
 // 5 + 4a² > 0 algebraically, not just a finite numerical sample.
 assert.ok(determinant[0]>0&&determinant[1]===0&&determinant[2]>0);
});
test('inverse and original equation residuals reject every matrix distractor',()=>{
 const rr=rows(),c=cases[1],B=mul(c.Aat1,T(c.Aat1)),I=[[1,0],[0,1]],inv=e(rr,406,1);
 assert.deepEqual(B,[[5,1],[1,2]]);assert.ok(eq(mul(B,inv.inverse),I));assert.ok(eq(mul(inv.inverse,B),I));for(const wrong of inv.wrong)assert.equal(eq(mul(B,wrong),I),false);
 const x=e(rr,406,2),rhs=c.C.map(r=>r.map(v=>-9*v));assert.ok(eq(mul(T(B),x.X),rhs));for(const w of x.wrong)assert.equal(eq(mul(T(B),w),rhs),false);
 assert.equal(new Set([x.X,...x.wrong].map(JSON.stringify)).size,4);
});
test('six complete source-read subparts and official PDF/page hashes',()=>{
 const png={82:'b1ca5d4a8a8dcea1b9d0e818978252e43ca281d7c0bb5338b08aed87fab68add',406:'5d98e840cee9678b9e285b967b6255afc31b50740ee0aef1f1f6cbd183e74aa1'};
 for(const r of rows()){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),png[i]);assert.equal(r.parts.length,3);
  for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(x=>x.explanation&&x.math));}}
});
test('hotel/Gram deterministic generation, reversed order and read-only rollback',()=>{
 const files=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','math-renderer.js'];const before=files.map(f=>sha(fs.readFileSync(f)));
 const sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildHotelGramBatch('hotel-gram-test',[...cases].reverse()).batch.records));assert.deepEqual(files.map(f=>sha(fs.readFileSync(f))),before);
});

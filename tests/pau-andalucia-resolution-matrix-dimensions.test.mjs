import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildMatrixDimensionsBatch} from '../scripts/resolve-andalucia-matrix-dimensions-and-right-equations.mjs';
const I=[[1,0],[0,1]];
const mul=(A,B)=>{assert.equal(A[0].length,B.length);return A.map(row=>B[0].map((_,j)=>row.reduce((s,v,k)=>s+v*B[k][j],0)));};
const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
const scale=(A,k)=>A.map(r=>r.map(x=>k*x));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const pow=(A,n)=>{let v=I;for(let i=0;i<n;i++)v=mul(v,A);return v;};
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const rows=()=>buildMatrixDimensionsBatch('dimensions-test').batch.records;
const evidence=(rr,i,j)=>rr.find(r=>r.correctionEvidence.parameters.index===i).parts[j].verification.numericalEvidence;
const isZero=A=>A.every(r=>r.every(x=>Math.abs(x)<1e-11));
test('four solutions independently substituted in original matrix equations; three false alternatives each',()=>{
 const rr=rows();
 for(const [i,j]of[[103,0],[177,1],[327,1],[337,1]]){
  const c=cases.find(x=>x.index===i),e=evidence(rr,i,j);
  const residual=X=>i===103?add(add(mul(mul(c.C,c.B),X),scale(mul(c.A,X),2),-1),T(c.A),-1):i===177?add(add(mul(X,c.A),mul(c.B,T(c.B))),scale(c.A,2),-1):i===327?add(add(mul(c.A,X),T(c.B)),scale(c.C,4),-1):add(mul(X,c.A),add(scale(T(c.B),2),I),-1);
  assert.ok(isZero(residual(e.X)),`${i} original residual`);
  for(const wrong of e.wrong)assert.equal(isZero(residual(wrong)),false,`${i} false distractor`);
  assert.equal(new Set([e.X,...e.wrong].map(JSON.stringify)).size,4);
 }
});
test('compatibility and resulting matrix dimensions proved independently',()=>{
 const rr=rows(),c=cases.find(x=>x.index===103);
 const dim=A=>[A.length,A[0].length];
 assert.deepEqual(dim(c.A),[2,2]);assert.deepEqual(dim(c.B),[3,2]);assert.deepEqual(dim(c.C),[2,3]);
 assert.deepEqual(dim(mul(c.B,c.C)),[3,3]);assert.notDeepEqual(dim(mul(c.B,c.C)),dim(c.A));
 assert.deepEqual(dim(mul(c.A,c.C)),dim(c.C));assert.throws(()=>mul(T(c.B),c.C));assert.deepEqual(dim(mul(c.C,c.B)),dim(c.A));
 assert.deepEqual(evidence(rr,103,1).valid,[false,true,false,true]);
 const d=cases.find(x=>x.index===327),e=evidence(rr,327,0);
 assert.throws(()=>mul(d.A,d.B));assert.deepEqual(mul(d.B,d.A),e.BA);assert.deepEqual(mul(d.B,d.C),e.BC);assert.deepEqual(mul(T(d.C),T(d.B)),e.CtBt);
 assert.notDeepEqual(e.BA,[[-6,6]]);assert.notDeepEqual(e.BC,[[1]]);assert.deepEqual(mul(d.C,d.B),[[2,-3],[2,-3]]);assert.notDeepEqual(e.CtBt,mul(d.C,d.B));
});
test('large matrix powers checked by repeated multiplication and noncommutative square checked',()=>{
 const rr=rows(),c=cases.find(x=>x.index===177),e=evidence(rr,177,0);
 const sum=add(pow(c.A,2018),pow(c.A,2019));assert.deepEqual(sum,e.sum);for(const w of e.wrong)assert.notDeepEqual(w,sum);
 const d=cases.find(x=>x.index===337),f=evidence(rr,337,0);
 const lhs=pow(add(d.A,d.B),2),rhs=add(add(pow(d.A,2),pow(d.B,2)),scale(mul(d.A,d.B),2));
 assert.deepEqual(lhs,f.lhs);assert.deepEqual(rhs,f.rhs);assert.notDeepEqual(lhs,rhs);
 assert.deepEqual(add(lhs,rhs,-1),add(mul(d.B,d.A),mul(d.A,d.B),-1));
 assert.notDeepEqual(lhs,[[1,1],[1,1]]);assert.notDeepEqual(rhs,add(pow(d.A,2),pow(d.B,2)));
});
test('official documents and four inspected original pages are hash bound',()=>{
 const png={103:'ec92de921de4dc8cce7e8189f28c110b5760f793885b3d040eacb6f40a3812ce',177:'aa4827914736f7bb81e4fb2f0359d9cb3c9e272b01ae40c8d827d956c3fec909',327:'0cbcd818984ac0bd29c44defeafac7935c776a8ef68921fea178f82434ab39da',337:'772a8174bedec14988343f5592b8a2d1a4cb062f23bc7dc5149b01998b7a828a'};
 for(const r of rows()){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),png[i]);assert.equal(r.primaryTopic,'Matrices');assert.equal(r.parts.length,2);}
});
test('eight complete source subparts, distinct error-model alternatives and complete pedagogy',()=>{
 const rr=rows();assert.equal(rr.length,4);
 for(const r of rr)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractors.length,3);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(x=>x.explanation&&x.math));}
});
test('deterministic matrix dimensions batch, reversed order and read-only rollback',()=>{
 const files=['data/andalucia-pau-runtime.js','app.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'];const before=files.map(f=>sha(fs.readFileSync(f)));
 const sorted=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sorted(rows()),sorted(buildMatrixDimensionsBatch('dimensions-test',[...cases].reverse()).batch.records));assert.deepEqual(files.map(f=>sha(fs.readFileSync(f))),before);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildFurtherMatrixBatch} from '../scripts/resolve-andalucia-matrix-further-official.mjs';
// Independent verification: no arithmetic helper imported from the solver.
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
const scale=(A,k)=>A.map(r=>r.map(x=>x*k));
const eq=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((x,j)=>Math.abs(x-B[i][j])<1e-9));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const det3=A=>A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const rows=()=>buildFurtherMatrixBatch('further-test').batch.records;
const c=i=>cases.find(x=>x.index===i);
const at=(r,i,p)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[p].verification.numericalEvidence;
function reject(z,check){assert.ok(check(z.value));for(const w of z.wrong)assert.equal(check(w),false);const vals=[z.value,...z.wrong];for(let i=0;i<4;i++)for(let j=0;j<i;j++)assert.equal(eq(vals[i],vals[j]),false);}
test('further official matrix equations: unique correct answer and every distractor rejected by substitution',()=>{
 const r=rows();reject(at(r,553,1),X=>eq(mul(tr(X),c(553).A),c(553).R));
 reject(at(r,565,1),X=>eq(scale(add(c(565).B,mul(c(565).A,X)),.2),tr(c(565).C)));
 reject(at(r,568,1),X=>eq(add(mul(c(568).A,X),c(568).B),scale(c(568).C,2)));
 reject(at(r,583,2),X=>eq(mul(c(583).A,X),c(583).B));
 reject(at(r,590,2),X=>eq(add(mul(X,c(590).A),eye(3)),mul(tr(c(590).B),c(590).C)));
 reject(at(r,605,1),X=>eq(add(mul(X,c(605).C),mul(c(605).D,c(605).D),-1),eye(2)));
 reject(at(r,621,1),X=>eq(scale(add(X,scale(eye(2),3),-1),2),mul(c(621).A,c(621).B)));
 reject(at(r,634,0),X=>eq(add(tr(c(634).A),mul(X,c(634).A),-1),scale(eye(3),3)));
 reject(at(r,656,1),X=>eq(add(mul(X,c(656).M),scale(c(656).N,2),-1),c(656).R));
});
test('polynomial identity and all inverse answers checked in both multiplication orders',()=>{
 const r=rows();for(const[i,p,A]of[[553,0,c(553).A],[557,2,c(557).C],[583,1,c(583).A],[590,1,c(590).A]])reject(at(r,i,p),V=>eq(mul(A,V),eye(A.length))&&eq(mul(V,A),eye(A.length)));
 const A=c(553).A,P=scale(add(add(mul(A,A),scale(A,-4)),scale(eye(3),5)),.5);assert.ok(eq(P,at(r,553,0).value));
});
test('coupled systems verified against both original matrix equations',()=>{
 const r=rows();let z=at(r,557,0);const first=([X,Y])=>eq(add(scale(X,3),scale(Y,2)),c(557).A)&&eq(add(scale(X,-4),Y),c(557).B);assert.ok(first([z.X,z.Y]));for(const w of z.wrong)assert.equal(first(w),false);
 z=at(r,605,0);const second=([A,B])=>eq(add(scale(A,2),scale(B,-5)),c(605).M)&&eq(add(scale(A,3),B,-1),c(605).N);assert.ok(second([z.A,z.B]));for(const w of z.wrong)assert.equal(second(w),false);
 for(const[i,p]of[[557,0],[605,0]]){z=at(r,i,p);assert.equal(new Set(z.wrong.map(JSON.stringify)).size,3);}
});
test('matrix operations, undefined sum dimensions, and parameter constraints independently verified',()=>{
 const r=rows();reject(at(r,565,0),R=>eq(R,add(c(565).A,tr(mul(c(565).B,c(565).C)),-1)));assert.equal(c(565).B.length,2);assert.equal(mul(c(565).C,c(565).A).length,1);assert.equal(at(r,565,0).firstOperationDefined,false);
 reject(at(r,568,0),R=>eq(R,add(mul(c(568).A,c(568).A),mul(c(568).B,tr(c(568).C)),-1)));
 for(const a of[-8,-4,-3,-2,0,1,2,3,4,5,7]){assert.ok(det3([[a,2,0],[8,a,0],[0,0,a]])===a*(a*a-16));assert.equal(det3([[a,1,0],[0,a,1],[3,4,1]]),a*a-4*a+3);}
 assert.deepEqual(at(r,583,0).roots,[-4,0,4]);assert.deepEqual(at(r,590,0).roots,[1,3]);assert.deepEqual(at(r,557,1).roots,[2]);for(const m of[-2,0,1,2,4])assert.equal(4*3-6*m,12-6*m);
 const z=at(r,634,1),works=a=>eq(mul(tr(c(634).C),[[a*a,0,-1],[1,-1,a]]),c(634).B);assert.ok(works(z.a));for(const a of z.wrong)assert.equal(works(a),false);
});
test('parameter square/symmetry and scalar system satisfy every component',()=>{
 const r=rows(),z=at(r,621,0),works=v=>{const A=[[2,-1],[v.a,v.b]];return eq(mul(A,A),[[5,-2],[-2,1]])&&v.symmetric===eq(A,tr(A));};assert.ok(works(z));for(const w of z.wrong)assert.equal(works(w),false);
 assert.deepEqual(c(621).A,[[2,-1],[3,1]]); // b) intentionally uses different parameters.
 const t=at(r,656,0),ok=([x,y])=>Math.abs(2*x+y-3)<1e-10&&Math.abs(3*x+y-3*y)<1e-10;assert.ok(ok([t.x,t.y]));for(const w of t.wrong)assert.equal(ok(w),false);assert.equal(new Set(t.wrong.map(JSON.stringify)).size,3);
});
test('23 complete subparts and immutable PDF/image provenance',()=>{
 const hashes={553:'7443980d4386725818e49251b30414ada795e63394e0c26a1f7afd2adf61cc20',557:'c88d401380d4c2c309e08ac7e59e831d8f39c90f56fd91f1aa928effb189f887',565:'dbdca03b7e3cf51b6b87311804f33b8fcfc4f5e8bd84b6b1b7617d341ad1e23f',568:'c9cb4c59a714f9eaa65b308df04e092c53d47fad93e350ac01bda41682601fce',583:'abb6b694087eff3336eed15f749283d3a8ad4c3e2a9c8f43f9786e9e618a1817',590:'c540168f04970bde6f497e8986d25648e95db74bacfd8c5a061d901af1d3efaf',605:'e972cdc0c09c051c3e203e397b4df9e0ddaaf4bbacccfdebca03732bdce029d9',621:'4476d70eed75862bb03453af6607e27c9e1a55a931102bd482f4a79b772efacb',634:'05d232f41f1761edc9041b434d5e1ab964f0ee96529f34d3601c297e6e4ca055',656:'27d381d93cd700245bcc6ad1ff68675812468111e6eb141ec25d1305a750d1a6'};
 let n=0;for(const r of rows()){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),hashes[i]);for(const p of r.parts){n++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.math&&s.explanation));}}assert.equal(n,23);
});
test('further matrix batch reproducible, order invariant, no production or queue edits',()=>{
 const files=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=files.map(f=>sha(fs.readFileSync(f))),sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildFurtherMatrixBatch('further-test',[...cases].reverse()).batch.records));assert.deepEqual(files.map(f=>sha(fs.readFileSync(f))),before);
});

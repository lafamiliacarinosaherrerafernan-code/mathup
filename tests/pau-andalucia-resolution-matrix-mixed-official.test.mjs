import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildMixedMatrixBatch} from '../scripts/resolve-andalucia-matrix-mixed-official.mjs';
import {matrixMixedObservations} from '../scripts/andalucia-matrix-mixed-pdf-evidence.mjs';
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
const sc=(A,k)=>A.map(r=>r.map(x=>x*k));
const eq=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((x,j)=>Math.abs(x-B[i][j])<1e-8));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const determinant=A=>A.length===1?A[0][0]:A[0].reduce((s,x,j)=>s+(-1)**j*x*determinant(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const rows=()=>buildMixedMatrixBatch('mixed-matrix-test').batch.records;
const c=i=>cases.find(x=>x.index===i),at=(r,i,p)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[p].verification.numericalEvidence;
function reject(z,check){assert.ok(check(z.value));for(const w of z.wrong)assert.equal(check(w),false);const v=[z.value,...z.wrong];for(let i=0;i<4;i++)for(let j=0;j<i;j++)assert.equal(eq(v[i],v[j]),false);}
test('mixed equations: all numerical options tested by independent substitution',()=>{
 const r=rows();reject(at(r,1408,1),X=>eq(add(mul(c(1408).A,X),c(1408).B),c(1408).C));
 reject(at(r,1475,2),X=>eq(mul(c(1475).B,X),c(1475).C));
 reject(at(r,1485,1),X=>eq(add(mul(X,c(1485).A),mul(c(1485).A,c(1485).A),-1),I(3)));
 reject(at(r,1565,0),X=>eq(mul(c(1565).A,X),c(1565).B));
 reject(at(r,1565,1),X=>eq(sc(X,2),mul(mul(c(1565).M,c(1565).M),c(1565).V)));
 const z=at(r,1524,0),A=c(1524).A,valid=([X,Y])=>eq(add(mul(add(A,I(3)),X),Y),add(A,I(3),-1))&&eq(add(X,Y,-1),I(3));assert.ok(valid([z.X,z.Y]));for(const w of z.wrong)assert.equal(valid(w),false);
});
test('numbers satisfy both divisions, sum and order; options match computed final answer',()=>{
 const r=rows(),z=at(r,1335,0),valid=([x,y,t])=>x+y+t===113&&t===6*x+4&&t===2*y+6&&4<x&&6<y&&x<y&&y<t;assert.ok(valid(z.value));for(const w of z.wrong)assert.equal(valid(w),false);
 assert.equal(r.find(x=>x.correctionEvidence.parameters.index===1335).parts[0].answer,'11, 32 y 70.');
 const S=add(c(1335).A,c(1335).B),j=at(r,1335,1);assert.ok(eq(mul(S,j.inverseSum),I(2)));assert.equal(eq(j.inverseSum,j.sumInverses),false);assert.equal(eq(S,j.inverseSum),false);
});
test('economic interpretation preserves kg/cents scale and rejects all three wrong options',()=>{
 const r=rows(),z=at(r,1408,0),R=mul(c(1408).Q,tr(c(1408).P)),total=10*(R[0][0]+R[1][1]);assert.deepEqual(R,[[4990,4580],[4590,4420]]);assert.ok(eq(z.value,R));assert.equal(z.total,total);for(const [w,t]of z.wrong)assert.equal(eq(w,R)&&t===total,false);
});
test('matrix powers and inverse parameter condition independently verified',()=>{
 const r=rows(),A=c(1475).A;let P=I(3);for(let n=1;n<=10;n++){P=mul(P,A);const k=2**(n-1);assert.deepEqual(P,[[k,0,k],[0,1,0],[k,0,k]]);}assert.equal(determinant(c(1475).B),-1);assert.equal(at(r,1475,1).determinant,-1);
 assert.match(r.find(x=>x.correctionEvidence.parameters.index===1475).parts[1].answer,/det\(B\)=−1/);
 for(const m of [-5,-1,0,1,2,2.5,5,7]){const D=determinant([[1,-1,m],[0,2,-3],[m,1,1]]);assert.equal(D,(m+1)*(5-2*m));assert.equal(D===0,[-1,2.5].includes(m));}
 const U=add(c(1524).A,I(3)),V=add(c(1524).A,I(3),-1);assert.equal(determinant(U),10);assert.equal(determinant(V),0);assert.equal(determinant([[V[0][0],V[0][2]],[V[1][0],V[1][2]]]),2);
});
test('six source pages preserved and 13 official parts fully resolved',()=>{
 const obs=new Map(matrixMixedObservations.map(o=>[o[0],o]));let n=0;for(const r of rows()){const i=r.correctionEvidence.parameters.index,o=obs.get(i);assert.equal(sha(fs.readFileSync(r.officialSource.path)),o[1]);assert.equal(r.officialSource.range.page,o[2]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),o[4]);for(const p of r.parts){n++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.math&&s.explanation));}}assert.equal(n,13);
});
test('mixed batch reproducible, order invariant and does not mutate input banks',()=>{
 const paths=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p))),sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildMixedMatrixBatch('mixed-matrix-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);
});

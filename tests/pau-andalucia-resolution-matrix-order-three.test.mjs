import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildOrderThreeBatch} from '../scripts/resolve-andalucia-matrix-order-three.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
const scale=(A,k)=>A.map(r=>r.map(x=>x*k));
const eq=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((x,j)=>Math.abs(x-B[i][j])<1e-9));
// Independent elimination, not the constructor's cofactor algorithm.
function gauss(A,B){const n=A.length,r=A.map((v,i)=>[...v,...B[i]]);for(let j=0;j<n;j++){const pivot=r.findIndex((v,i)=>i>=j&&Math.abs(v[j])>1e-12);assert.ok(pivot>=j);[r[pivot],r[j]]=[r[j],r[pivot]];const d=r[j][j];r[j]=r[j].map(x=>x/d);for(let k=0;k<n;k++)if(k!==j){const s=r[k][j];r[k]=r[k].map((x,z)=>x-s*r[j][z]);}}return r.map(x=>x.slice(n));}
const rows=()=>buildOrderThreeBatch('order-three-test').batch.records;
const evidence=(r,i,p)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[p].verification.numericalEvidence;
// Polynomial coefficients are ascending. The determinant is expanded formally,
// not inferred from a handful of sampled parameter values.
const pa=(a,b,k=1)=>Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]??0)+k*(b[i]??0));
const pm=(a,b)=>{const r=Array(a.length+b.length-1).fill(0);a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y));return r;};
const pd=A=>A.length===1?A[0][0]:A[0].reduce((s,x,j)=>pa(s,pm(x,pd(A.slice(1).map(r=>r.filter((_,k)=>k!==j)))),(-1)**j),[0]);
test('formal source determinant polynomials and excluded roots, including singular idempotent matrix',()=>{
 const r=rows(),p96=pd([[[2],[0],[0,1]],[[1],[1],[1]],[[0,1],[3],[5]]]),p309=pd([[[2],[-3],[-1,-1]],[[-1],[0,1],[1,1]],[[1],[-3],[0,-1]]]);
 while(p96.at(-1)===0)p96.pop();while(p309.at(-1)===0)p309.pop();
 assert.deepEqual(p96,[4,3,-1]);assert.deepEqual(p309,[0,4,-1]);assert.deepEqual(evidence(r,96,0).determinantCoefficients,p96);assert.deepEqual(evidence(r,309,0).determinantCoefficients,p309);
 for(const[i,p]of[[96,p96],[309,p309]]){const e=evidence(r,i,0);assert.equal(e.excluded.length,2);for(const x of e.excluded)assert.equal(p.reduce((s,c,j)=>s+c*x**j,0),0);}
 const w=evidence(r,96,0).wrongExcluded;for(const roots of w)assert.ok(roots.some(x=>p96.reduce((s,c,j)=>s+c*x**j,0)!==0));
});
test('right-sided matrix equations verified independently; every distractor fails the original equation',()=>{
 const r=rows();for(const index of[96,144,309,365]){
  const c=cases.find(x=>x.index===index),e=evidence(r,index,index===96?1:2);let A,expected,residual;
  if(index===96){A=c.A;const rhs=mul(A,T(A));expected=T(gauss(T(A),T(rhs)));residual=X=>eq(mul(X,A),rhs);}
  if(index===144){A=c.A;const rhs=add(mul(A,A),I(3),3);expected=scale(T(gauss(T(A),T(rhs))),.5);residual=X=>eq(add(add(scale(mul(X,A),2),mul(A,A),-1),I(3),-3),scale(A,0));}
  if(index===309){A=c.A3;expected=gauss(A,I(3));residual=X=>eq(mul(X,A),I(3));}
  if(index===365){A=add(scale(I(3),10),c.A,-1);expected=gauss(A,c.B);residual=X=>eq(mul(A,X),c.B);}
  assert.ok(eq(e.X,expected),`case ${index}`);assert.ok(residual(e.X));for(const wrong of e.wrong)assert.equal(residual(wrong),false,`false option ${index}`);
  for(let i=0;i<e.wrong.length;i++)for(let j=0;j<i;j++)assert.equal(eq(e.wrong[i],e.wrong[j]),false);
 }
});
test('asymmetry, exact inverse, dimension and arbitrary right-hand-side existence',()=>{
 const r=rows(),A=cases.find(c=>c.index===144).A,e=evidence(r,144,1);assert.equal(A[1][2],-1);assert.equal(A[2][1],1);assert.equal(eq(A,T(A)),false);
 assert.ok(eq(e.inverse,gauss(A,I(3))));assert.ok(eq(mul(A,e.inverse),I(3)));for(const w of e.wrong)assert.equal(eq(mul(A,w),I(3)),false);
 assert.deepEqual(evidence(r,365,0).shape,[3,1]);const C=evidence(r,365,1).coefficient;assert.ok(eq(mul(C,gauss(C,I(3))),I(3)));assert.equal(evidence(r,365,1).determinant,5*(8*8-4));
});
test('idempotent source matrix powers checked through 2022 products; no zero/identity shortcut',()=>{
 const r=rows(),c=cases.find(x=>x.index===309),e=evidence(r,309,1);assert.deepEqual(mul(c.A,c.A),c.A);let v=I(3);for(let k=0;k<2022;k++)v=mul(v,c.A);assert.deepEqual(v,e.A2022);assert.deepEqual(e.A2,c.A);assert.deepEqual(e.A3,c.A);for(const w of e.wrong)assert.equal(eq(w,v),false);
});
test('eleven complete subparts bound to official PDF bytes and individually inspected pages',()=>{
 const hashes={96:'78828f645f94446d04496f5775f9f7a8ed38b7877c84509c62ce0fdd6c13ae25',144:'ec5f494cc100dc39fa8c7c6131170e117fea5e69a218fb975d822c973b950eab',309:'27df2e1a7204f634a43efb7f96276f24dde4e35cad687a5a7d634e05f16c10fc',365:'4a91890b73760d6c68a77bd2cc13e9231036b7934fe438ae5cc41f7283a6f68f'};let n=0;
 for(const r of rows()){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),hashes[i]);n+=r.parts.length;for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.explanation&&s.math));}}
 assert.equal(n,11);
});
test('order-three outputs reproducible, invariant to enumeration and rollback leaves sources untouched',()=>{
 const paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','math-renderer.js'];const before=paths.map(f=>sha(fs.readFileSync(f)));const sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildOrderThreeBatch('order-three-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(f=>sha(fs.readFileSync(f))),before);
});

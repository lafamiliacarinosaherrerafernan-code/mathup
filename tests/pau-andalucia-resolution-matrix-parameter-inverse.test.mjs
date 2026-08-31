import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildParameterInverseBatch} from '../scripts/resolve-andalucia-matrix-parameter-inverse.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const I=[[1,0,0],[0,1,0],[0,0,1]];
const eq=(A,B)=>A.every((r,i)=>r.every((v,j)=>Math.abs(v-B[i][j])<1e-10));
const add=(A,B,k=1)=>A.map((r,i)=>r.map((v,j)=>v+k*B[i][j]));
const pa=(a,b,k=1)=>Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]??0)+k*(b[i]??0));
const pm=(a,b)=>{const r=Array(a.length+b.length-1).fill(0);a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y));return r;};
const pd=A=>A.length===1?A[0][0]:A[0].reduce((s,x,j)=>pa(s,pm(x,pd(A.slice(1).map(r=>r.filter((_,k)=>k!==j)))),(-1)**j),[0]);
const rows=()=>buildParameterInverseBatch('parameter-inverse-test').batch.records;
const e=(r,i,p)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[p].verification.numericalEvidence;
test('both parameter determinants derived formally from source matrices',()=>{
 const r=rows(),p=pd([[[2],[1],[-1]],[[0,1],[-1],[-1]],[[3],[0],[0,-2]]]),q=pd([[[1],[-1],[0]],[[0],[0,1],[-2]],[[1],[0,1],[4]]]);
 while(p.at(-1)===0)p.pop();while(q.at(-1)===0)q.pop();assert.deepEqual(p,[-6,4,2]);assert.deepEqual(q,[2,6]);assert.deepEqual(e(r,97,0).determinantCoefficients,p);assert.deepEqual(e(r,211,0).determinantCoefficients,q);assert.equal(q[0]+q[1]*(-1/3),0);assert.equal(p[0]+p[1]+p[2],0);assert.equal(p[0]-3*p[1]+9*p[2],0);
 for(const roots of e(r,97,0).wrongExcluded)assert.ok(roots.some(x=>p.reduce((s,c,j)=>s+c*x**j,0)!==0));
});
test('inverses checked on both sides and all inverse distractors independently rejected',()=>{
 const r=rows();for(const index of[97,211]){const A=index===97?cases[0].A2:cases[1].A1,z=e(r,index,index===97?1:0);assert.ok(eq(mul(A,z.inverse),I));assert.ok(eq(mul(z.inverse,A),I));for(const wrong of z.wrong??z.wrongInverses)assert.equal(eq(mul(A,wrong),I),false);}
});
test('right equation is checked without trusting an inverse implementation',()=>{
 const r=rows(),c=cases[0],z=e(r,97,2),BBt=mul(c.B,T(c.B)),R=add(I,BBt);assert.deepEqual(z.B2,BBt);assert.deepEqual(z.R,R);assert.deepEqual(z.X,mul(R,c.A0));
 // XA^-1=R iff X=RA since A is invertible (formal determinant at zero=-6).
 for(const wrong of z.wrong)assert.equal(eq(wrong,mul(R,c.A0)),false);assert.equal(new Set([z.X,...z.wrong].map(JSON.stringify)).size,4);
});
test('nested a1/a2 tasks are both answered; abstract B-I identity proven symbolically',()=>{
 const r=rows(),z=e(r,211,0),p=r.find(x=>x.correctionEvidence.parameters.index===211).parts;assert.deepEqual(z.nestedTasks,['a1','a2']);assert.match(p[0].prompt,/a1\)/);assert.match(p[0].prompt,/a2\)/);assert.match(p[0].answer,/m≠/);assert.match(p[0].answer,/A⁻¹=/);
 // Polynomial in B: (B-I)B-B²+B = 0, coefficient by coefficient.
 assert.deepEqual(pa(pa(pm([-1,1],[0,1]),[0,0,1],-1),[0,1]),[0,0,0]);
 const B=[[2,0],[0,3]],zero=[[0,0],[0,0]],id=[[1,0],[0,1]],right=add(B,id,-1);const residual=X=>add(add(mul(X,B),mul(B,B),-1),B);
 assert.deepEqual(residual(right),zero);for(const wrong of[add(B,id),B,add(id,B,-1)])assert.equal(eq(residual(wrong),zero),false);
});
test('five subparts have complete solutions, four distinct answers and official hashes',()=>{
 const hashes={97:'6c80375e66ffe4bf985ffecc7a02b2259d798de569ba90e0c2e21d0c3b21a6a2',211:'2709f18041fa1cc79feebda079c34ca0d5eef66d4b410191531dfa9fde2c34e9'};let count=0;
 for(const r of rows()){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),hashes[i]);for(const p of r.parts){count++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.explanation&&s.math));}}assert.equal(count,5);
});
test('parameter/nested question construction is reproducible, order independent and read-only',()=>{
 const files=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','math-renderer.js'];const before=files.map(f=>sha(fs.readFileSync(f)));const sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildParameterInverseBatch('parameter-inverse-test',[...cases].reverse()).batch.records));assert.deepEqual(files.map(f=>sha(fs.readFileSync(f))),before);
});

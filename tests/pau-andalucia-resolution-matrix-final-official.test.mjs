import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildFinalMatrixBatch} from '../scripts/resolve-andalucia-matrix-final-official.mjs';
// Separate direct-arithmetic checker; no solver arithmetic is imported.
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
const sc=(A,k)=>A.map(r=>r.map(x=>x*k));
const eq=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((x,j)=>Math.abs(x-B[i][j])<1e-9));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const power=(A,n)=>{let R=I(A.length);for(let k=0;k<n;k++)R=mul(R,A);return R;};
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const rows=()=>buildFinalMatrixBatch('matrix-final-test').batch.records;
const c=i=>cases.find(x=>x.index===i);
const at=(r,i,p)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[p].verification.numericalEvidence;
function reject(z,check){assert.ok(check(z.value));for(const w of z.wrong)assert.equal(check(w),false);const v=[z.value,...z.wrong];for(let i=0;i<4;i++)for(let j=0;j<i;j++)assert.equal(eq(v[i],v[j]),false);}
test('final matrix equations: every answer substituted into its official equation, all distractors false',()=>{
 const r=rows();reject(at(r,745,1),X=>eq(add(I(2),sc(X,2),-1),mul(c(745).A,add(c(745).A,tr(c(745).B),-1))));
 reject(at(r,840,0),X=>eq(add(mul(c(840).M,X),c(840).N),I(2)));
 reject(at(r,872,1),X=>eq(add(mul(c(872).A,X),c(872).B),sc(c(872).C,2)));
 reject(at(r,878,0),X=>eq(mul(X,mul(c(878).B,tr(c(878).B))),add(sc(c(878).A,.5),sc(tr(c(878).A),2),-1)));
 reject(at(r,912,1),X=>eq(add(c(912).A,sc(X,2)),c(912).B));
 reject(at(r,912,2),Y=>eq(mul(c(912).B,Y),c(912).v));
 reject(at(r,941,1),X=>eq(mul(mul(c(941).A,tr(c(941).A)),X),c(941).B));
 reject(at(r,1000,2),X=>eq(mul(add(tr(c(1000).A),I(2)),X),add(tr(c(1000).A),I(2),-1)));
});
test('parameters satisfy every matrix component, not just a selected equation',()=>{
 const r=rows();let z=at(r,840,1),works=([a,b])=>eq(mul([[0,1],[1,0]],[[a,b],[2,1]]),[[a,b],[2,1]]);assert.ok(works([z.a,z.b]));for(const w of z.wrong)assert.equal(works(w),false);
 z=at(r,861,0);works=a=>eq(mul(tr(c(861).M),[[5-a*a],[a-1],[a*a]]),[[5],[1],[5]]);assert.ok(works(z.a));for(const w of z.wrong)assert.equal(works(w),false);
 z=at(r,948,1);works=([a,b,cc,d])=>eq(sc(mul([[1,2],[a,0]],[[1,1,5],[8,4,b]]),2),[[cc,d,6],[10,10,50]]);assert.ok(works([z.a,z.b,z.c,z.d]));for(const w of z.wrong)assert.equal(works(w),false);
 z=at(r,1022,1);works=([a,b])=>eq(mul([[1,a],[b,3]],[[-1],[3]]),[[5],[10]]);assert.ok(works([z.a,z.b]));for(const w of z.wrong)assert.equal(works(w),false);
});
test('inverse and power tasks verified independently, including joint answers',()=>{
 const r=rows(),z=at(r,861,1),ok=(V,X)=>eq(mul(c(861).M,V),I(3))&&eq(mul(V,c(861).M),I(3))&&eq(add(mul(X,c(861).M),I(3),-1),c(861).N);assert.ok(ok(z.inverse,z.value));for(let j=0;j<3;j++)assert.equal(ok(z.invWrong[j],z.wrong[j]),false);
 const t=at(r,1000,0),valid=([A,B])=>eq(A,power(c(1000).A,40))&&eq(B,power(tr(c(1000).A),30));assert.ok(valid([t.A40,t.At30]));for(const w of t.wrong)assert.equal(valid(w),false);
 const invA=[[1,0],[1,1]];assert.ok(eq(mul(invA,c(1000).A),I(2)));reject(at(r,1000,1),X=>eq(X,power(add(invA,c(1000).A),2)));
 reject(at(r,1022,0),X=>eq(X,power(add(I(3),c(1022).A,-1),3)));
});
test('products and parameter polynomials are independently checked',()=>{
 const r=rows();reject(at(r,872,0),X=>eq(X,add(power(c(872).A,2),mul(c(872).B,tr(c(872).C)),-1)));
 reject(at(r,912,0),X=>eq(X,mul(c(912).A,tr(c(912).B))));
 const z=at(r,941,0),K=mul(c(941).A,tr(c(941).A)),L=mul(tr(c(941).A),c(941).A);assert.ok(eq(z.K,K)&&eq(z.L,L));for(const [k,l] of z.wrong)assert.equal(eq(k,K)&&eq(l,L),false);
 for(const [a,b] of [[1,1],[2,-3],[-4,7]]){const expected=mul([[1,2],[a,0]],[[1,1,5],[8,4,b]]);assert.ok(eq(expected,[[17,9,5+2*b],[a,a,5*a]]));for(const w of [[[17,9,5+b],[a,a,5*a]],[[17,9,5+2*b],[a,a,a]],[[17,9,5+2*b],[2*a,2*a,10*a]]])assert.equal(eq(w,expected),false);}
 assert.deepEqual(at(r,948,0).wrongKind,['OMIT_FACTOR_TWO','OMIT_FACTOR_FIVE','DOUBLE_SECOND_ROW']);
});
test('dimensions verified including undefined products and invalid sums',()=>{
 const r=rows(),z=at(r,745,0),ok=([a,b,c])=>a[0]===2&&b[0]===3&&c[0]===2&&a[1]===b[0]&&b[1]===c[0]&&c[1]===4;assert.ok(ok(z.dimensions));for(const w of z.wrong)assert.equal(ok(w),false);
 assert.equal(at(r,861,2).firstDefined,false);assert.deepEqual(at(r,861,2).secondDimension,[3,1]);assert.equal(at(r,941,0).ABDefined,false);assert.equal(at(r,948,0).QPDefined,false);
 const t=at(r,878,1);assert.deepEqual(t.defined,[true,false,false,false]);assert.deepEqual(t.dimensions,[[2,3],null,null,null]);assert.equal(c(878).A[0].length,c(878).B.length);assert.notEqual(c(878).A[0].length,tr(c(878).B).length);assert.notEqual(c(878).B[0].length,c(878).A.length);assert.notEqual(mul(tr(c(878).B),c(878).A).length,c(878).A.length);
});
test('10 official documents, 23 complete subparts, answer equals final result and immutable source hashes',()=>{
 const hashes={745:'239f57757f741939907a8a9eb32dc11a552251aab0c534ebc463246d02400171',840:'8f026d99b0e0fcfab1f4eaffba0ed1028ca1594d8f749ba69470a251a1063e8d',861:'611e073fa058cd159ff7c2a52cc101a4eb1041f05a15ca33c9d9dc764cb52032',872:'5ef505f97e1ea14427f8b166c64e400b9e140ff10fa78a4fc8492ad3a1967501',878:'fd0f755f1855a8a59d87185302e0251e651bfa8a66bad8a10b80f6403e31d4b1',912:'0af4794f75586094cf4ac6fcd33ecd71d122b8fa627565cc62b8bd4758a1b14f',941:'abaa434685268517815dd105703064ae7d2f3db53fd0e10938d33267267aa8f1',948:'b2ed291f16ddc0fcc6060b9477aebc10b2ed838ec3fa157e9b92ac1fb781a154',1000:'08957986bb6035fef5ddc9225e41a3f8928a2e7e3fc1c785f51a9934b4b1a65e',1022:'20c668b065aeebeea65ea4ff655d2dd0634e85a28d82846cfe70e30a346b3c88'};
 let n=0;for(const r of rows()){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),hashes[i]);for(const p of r.parts){n++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.math&&s.explanation));}}assert.equal(n,23);
});
test('final matrix batch deterministic, order invariant and read-only outside its own outputs',()=>{
 const files=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=files.map(f=>sha(fs.readFileSync(f))),sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildFinalMatrixBatch('matrix-final-test',[...cases].reverse()).batch.records));assert.deepEqual(files.map(f=>sha(fs.readFileSync(f))),before);
});

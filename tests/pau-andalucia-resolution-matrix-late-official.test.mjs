import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildLateMatrixBatch} from '../scripts/resolve-andalucia-matrix-late-official.mjs';
// Independent direct arithmetic, with no imported solver operations.
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
const sc=(A,k)=>A.map(r=>r.map(x=>x*k));
const eq=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((x,j)=>Math.abs(x-B[i][j])<1e-8));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const power=(A,n)=>{let R=I(A.length);for(let k=0;k<n;k++)R=mul(R,A);return R;};
const determinant=A=>A.length===2?A[0][0]*A[1][1]-A[0][1]*A[1][0]:A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const rows=()=>buildLateMatrixBatch('matrix-late-test').batch.records;
const c=i=>cases.find(x=>x.index===i);
const at=(r,i,p)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[p].verification.numericalEvidence;
function reject(z,check){assert.ok(check(z.value));for(const w of z.wrong)assert.equal(check(w),false);const v=[z.value,...z.wrong];for(let i=0;i<4;i++)for(let j=0;j<i;j++)assert.equal(eq(v[i],v[j]),false);}
test('late matrix equations: correct answers satisfy every original entry, all distractors fail',()=>{
 const r=rows();
 reject(at(r,1065,1),X=>eq(mul(mul(c(1065).A,c(1065).B),X),c(1065).C));
 reject(at(r,1076,1),X=>eq(add(mul(c(1076).A,X),mul(c(1076).B,c(1076).A)),c(1076).B));
 reject(at(r,1128,1),X=>eq(mul(c(1128).A,X),add(c(1128).B,c(1128).C,-1)));
 reject(at(r,1146,1),X=>eq(add(c(1146).A,sc(X,2)),c(1146).B));
 reject(at(r,1146,2),X=>eq(mul(c(1146).B,X),c(1146).v));
 reject(at(r,1150,1),X=>eq(add(mul(c(1150).A,X),mul(c(1150).B,c(1150).C)),c(1150).D));
 reject(at(r,1154,0),X=>eq(mul(mul(mul(c(1154).A,c(1154).B),X),c(1154).C),c(1154).R));
 reject(at(r,1159,1),X=>eq(add(mul(c(1159).B,X),c(1159).A),c(1159).C));
});
test('similarity and cubing verified without the inverse implementation',()=>{
 const r=rows(),q=c(1127);reject(at(r,1127,0),A=>eq(mul(A,q.P),mul(q.P,q.J)));
 const A=at(r,1127,0).value;reject(at(r,1127,1),A3=>eq(A3,power(A,3))&&eq(mul(A3,q.P),mul(q.P,power(q.J,3))));
});
test('determinant parameter, inverse and singularity assertions independently checked',()=>{
 const r=rows(),z=at(r,1086,1),f=k=>determinant([[1,0,1],[k,-3,2],[1,k,1]]);
 for(const k of [-4,-1,0,.5,1,2,3,6])assert.ok(Math.abs(f(k)-(k*k-2*k))<1e-10);
 assert.deepEqual(z.excluded,[0,2]);for(const k of z.excluded)assert.equal(f(k),0);
 for(const wrong of z.wrongExcluded)assert.ok(wrong.some(k=>f(k)!==0));assert.equal(z.wrongOnlyRoots,true);
 reject(at(r,1086,2),V=>eq(mul(c(1086).A,V),I(3))&&eq(mul(V,c(1086).A),I(3)));
 const t=at(r,1159,0),K=mul(c(1159).A,tr(c(1159).A)),L=add(K,c(1159).B);assert.ok(eq(t.K,K)&&eq(t.L,L));assert.ok(eq(tr(K),K));assert.equal(determinant(L),0);assert.equal(t.symmetric,true);assert.equal(t.invertible,false);
});
test('products, simultaneous equations and nilpotent powers have four distinct alternatives',()=>{
 const r=rows();reject(at(r,1076,0),X=>eq(X,add(mul(tr(c(1076).A),c(1076).B),mul(c(1076).A,tr(c(1076).B)),-1)));
 reject(at(r,1146,0),X=>eq(X,mul(c(1146).A,tr(c(1146).B))));
 reject(at(r,1150,0),X=>eq(X,power(c(1150).A,3)));
 const z=at(r,1155,0),ok=([X,Y])=>eq(add(sc(X,2),Y,-1),sc(c(1155).A,4))&&eq(add(X,Y),c(1155).B);assert.ok(ok([z.X,z.Y]));for(const w of z.wrongPairs)assert.equal(ok(w),false);const all=[[z.X,z.Y],...z.wrongPairs];for(let i=0;i<4;i++)for(let j=0;j<i;j++)assert.equal(eq(all[i][0],all[j][0])&&eq(all[i][1],all[j][1]),false);
 reject(at(r,1155,1),X=>eq(X,power(c(1155).C,2024)));
});
test('dimension decisions follow matrix shape compatibility, including invalid sums',()=>{
 const r=rows(),product=(a,b)=>a&&b&&a[1]===b[0]?[a[0],b[1]]:null,sum=(a,b)=>a&&b&&a[0]===b[0]&&a[1]===b[1]?a:null;
 let actual=[product([2,3],[2,3]),sum([3,2],[2,2]),product([2,2],[2,3]),sum(product([2,3],[3,2]),[2,2])];assert.deepEqual(actual,at(r,1065,0).dimensions);
 actual=[product([3,2],[3,3]),product([2,2],[2,3]),sum(product([2,3],[3,3]),[2,3]),product([2,3],[2,3])];assert.deepEqual(actual,at(r,1086,0).dimensions);
 assert.deepEqual([sum(product([2,2],[2,3]),product([2,2],[2,2])),sum(product([3,2],[2,2]),[2,2])],[null,null]);assert.deepEqual(at(r,1128,0).defined,[false,false]);
 const z=at(r,1154,1),ok=([D,E])=>Boolean(sum(product([2,3],D),product(E,[3,2])));assert.ok(ok([z.D,z.E]));for(const w of z.wrong)assert.equal(ok(w),false);
 actual=[sum(product([2,2],[2,2]),product([2,3],[3,2])),sum(product([2,3],[2,2]),[2,2]),sum(product([3,2],[2,2]),[2,3])];assert.deepEqual(actual,at(r,1155,2).dimensions);
});
test('10 inspected official pages, 23 subparts, hashes intact and complete solution records',()=>{
 const hashes={1065:'271ee311f015c9f84114c891f91aad908a99d7512e1857f00590e4308787aa73',1076:'b852fb8add044f158fae465c6582ac69d6b8aa87cff829b0263383a8d7d11e07',1086:'682d9b1690b9a89f7b5ac9181c092ec7693e5f3427b6a12146c94a11ddc3e20c',1127:'cf7ddd7376ab912fe542f6b9f5b02b746da09b140b859958cd7ca9fad10498e3',1128:'5b74a93bc857a55b03855316140f7501f0bb24467d74042c75dbe2c7eaca8dd0',1146:'1ad8a452b9bc46971e5f4e55f9f2feb367778a8b893bb22c9b5c17f3bc5e69df',1150:'4b1ea4849c5989913a0f83745da5136785b0f5b153d6176880d19c4ef5aa8334',1154:'3ed71a6825ea8ca6eea556e9b7573dcf6f6a30555b432fdb95281db3e69df043',1155:'e80da75dfdee0599ff2a2cb2095312d0a43412353b6f287af2a4417f158d6242',1159:'30d7eb4bdf8c1769f22897ec6bac9a0d6502c5607e75fab1cc9d25efee2a8e1a'};
 let n=0;for(const r of rows()){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),hashes[i]);for(const p of r.parts){n++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.math&&s.explanation));}}assert.equal(n,23);
});
test('late batch reproducible and order invariant without changing sources or runtime',()=>{
 const files=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=files.map(f=>sha(fs.readFileSync(f))),sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildLateMatrixBatch('matrix-late-test',[...cases].reverse()).batch.records));assert.deepEqual(files.map(f=>sha(fs.readFileSync(f))),before);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildExpandedMatrixBatch} from '../scripts/resolve-andalucia-matrix-expanded-official.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
// Verification deliberately does not import determinant/inverse helpers from the solver.
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
const scale=(A,k)=>A.map(r=>r.map(x=>x*k));
const eq=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((v,j)=>Math.abs(v-B[i][j])<1e-10));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const det3=A=>A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
const rows=()=>buildExpandedMatrixBatch('expanded-test').batch.records;
const at=(r,i,p)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[p].verification.numericalEvidence;
const c=i=>cases.find(x=>x.index===i);
function unique(z,wrong){for(const w of wrong)assert.equal(eq(z,w),false);for(let i=0;i<wrong.length;i++)for(let j=0;j<i;j++)assert.equal(eq(wrong[i],wrong[j]),false);}
function reject(result,wrong,check){assert.equal(check(result),true);for(const w of wrong)assert.equal(check(w),false);unique(result,wrong);}
test('two parameter determinants independently checked, including singular excluded values',()=>{
 const r=rows();for(const a of[-10,-8,-1,0,1,2,5,9]){assert.equal(det3([[1,1,-2],[a-3,a-1,1],[0,2,a]]),10-2*a);assert.equal(det3([[2,1,0],[1,0,2],[0,2,a]]),-8-a);}
 assert.deepEqual(at(r,430,0).polynomial,[10,-2]);assert.deepEqual(at(r,503,0).polynomial,[-8,-1]);assert.equal(at(r,430,0).root,5);assert.equal(at(r,503,0).root,-8);
});
test('matrix equations verified by direct substitution, all numerical distractors rejected',()=>{
 const r=rows();let z=at(r,430,1);reject(z.X,z.wrong,X=>eq(add(mul(X,c(430).A),c(430).B,-1),mul(c(430).C,c(430).A)));
 z=at(r,440,1);reject(z.X,z.wrong,X=>eq(add(mul(mul(c(440).A,c(440).B),X),mul(c(440).C,X),-1),tr(c(440).C)));
 z=at(r,460,0);reject(z.X,z.wrong,X=>eq(mul(c(460).B,X),add(scale(c(460).A,3),tr(c(460).A))));
 z=at(r,460,1);reject(z.Y,z.wrong,Y=>eq(mul(c(460).M,Y),c(460).v));
 z=at(r,486,1);reject(z.Z,z.wrong,Z=>eq(add(mul(c(486).B,Z),tr(c(486).B)),scale(eye(2),2)));
 z=at(r,503,2);reject(z.X,z.wrong,X=>eq(mul(c(503).A,X),tr(c(503).B)));
 z=at(r,521,0);reject(z.X,z.wrong,X=>eq(add(mul(mul(c(521).A,c(521).A),X),c(521).C),scale(c(521).B,2)));
 z=at(r,524,1);reject(z.A,z.wrong,A=>eq(mul(A,c(524).B),scale(tr(c(524).C),2))&&A[2][0]===2&&A[0][1]===-3&&A[1][1]===1);
});
test('coupled matrix equations use both equations, not only their difference',()=>{
 const z=at(rows(),486,0),A=c(486).A,B=c(486).B;const works=([X,Y])=>eq(add(X,Y),A)&&eq(add(scale(X,3),Y),B);
 assert.ok(works([z.X,z.Y]));for(const w of z.wrong)assert.equal(works(w),false);assert.equal(new Set([[z.X,z.Y],...z.wrong].map(JSON.stringify)).size,4);
});
test('all inverses and Gram matrix products verified on both sides',()=>{
 const r=rows();for(const index of[440,474,503]){const z=at(r,index,index===440?0:1),A=index===440?add(mul(c(index).A,c(index).B),c(index).C,-1):index===474?mul(tr(c(index).A),c(index).A):c(index).A;reject(z.inverse,z.wrong,X=>eq(mul(A,X),eye(A.length))&&eq(mul(X,A),eye(A.length)));}
 const z=at(r,474,2),A=c(474).A;reject(z.R,z.wrong,X=>eq(X,mul(A,mul(tr(A),A))));
});
test('dimension answers follow all inner and outer dimension constraints',()=>{
 const r=rows();let z=at(r,430,2);const check=([m,n])=>n===3&&m===1;assert.ok(check(z.dimension));for(const d of z.wrongDimensions)assert.equal(check(d),false);
 z=at(r,521,1);const dims=([P,Q])=>P[0]===3&&P[1]===2&&Q[0]===3&&Q[1]===3;assert.ok(dims([z.P,z.Q]));for(const w of z.wrongDimensions)assert.equal(dims(w),false);
 z=at(r,524,0);assert.deepEqual(z.dimension,[3,2]);for(const w of z.wrongDimensions)assert.notDeepEqual(w,[3,2]);
 z=at(r,474,0);assert.equal(z.dimension,'n×n');assert.equal(new Set([z.dimension,...z.wrongDimensions]).size,4);
});
test('19 complete subparts, four distinct responses, official PDF and image provenance',()=>{
 const png={430:'54a8557c27718da2595ada92a75c26ccaeb1332b6027c111c79f3ce7247a9905',440:'87759c25156bfe54258c7926a17fe1e1f9fee0324c262188cb71b8c854ff824b',460:'ef213e1900de4ef3c85bccd8041ff9ab76b211ebad2c2a74dfdee9e32c8cc4bd',474:'1a070a8489429ec2e9fe8a42e5e39f596d2e0caf83e7554430ee7bbb75276e86',486:'fd9bd3f0e5223f2c7de006477ab057c25a0ee2ef2610e96936b4634f5df9c4cf',503:'6cf551a75ab45ef849e4972531c5d613910522acbaa5e93342ff75831b321b6a',521:'ff9feb1c17209fa24dfe59e4ae6ea8d0cb935778967517c034c538db1f69f57d',524:'6f22a0eb38d90d8f3cd543bf96b57a46843834e0afb2a6a696615885a956f85b'};
 let count=0;for(const r of rows()){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${r.correctionEvidence.parameters.index}.png`)),png[r.correctionEvidence.parameters.index]);for(const p of r.parts){count++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.explanation&&s.math));}}assert.equal(count,19);
});
test('eight official questions reproducible, reverse-order invariant and read-only',()=>{
 const files=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','math-renderer.js'];const before=files.map(f=>sha(fs.readFileSync(f)));const sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildExpandedMatrixBatch('expanded-test',[...cases].reverse()).batch.records));assert.deepEqual(files.map(f=>sha(fs.readFileSync(f))),before);
});

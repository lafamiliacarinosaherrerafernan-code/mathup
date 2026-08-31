import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildExtendedMatrixBatch} from '../scripts/resolve-andalucia-matrix-extended-official.mjs';
import {matrixExtendedObservations,matrixExtendedReplacements} from '../scripts/andalucia-matrix-extended-pdf-evidence.mjs';
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
const sc=(A,k)=>A.map(r=>r.map(x=>x*k));
const eq=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((x,j)=>Math.abs(x-B[i][j])<1e-8));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const power=(A,n)=>{let R=I(A.length);for(let k=0;k<n;k++)R=mul(R,A);return R;};
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const rows=()=>buildExtendedMatrixBatch('matrix-extended-test').batch.records;
const c=i=>cases.find(x=>x.index===i);
const at=(r,i,p)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[p].verification.numericalEvidence;
function reject(z,check){assert.ok(check(z.value));for(const w of z.wrong)assert.equal(check(w),false);const v=[z.value,...z.wrong];for(let i=0;i<4;i++)for(let j=0;j<i;j++)assert.equal(eq(v[i],v[j]),false);}
test('extended source equations: independently substitute each answer; all three distractors fail',()=>{
 const r=rows();reject(at(r,1171,2),X=>eq(add(mul(c(1171).A,X),c(1171).B),[[0,0],[0,0]]));
 reject(at(r,1173,1),X=>eq(mul(X,c(1173).A),c(1173).B));
 reject(at(r,1195,0),A=>eq(mul(A,c(1195).B),tr(c(1195).C)));
 reject(at(r,1200,1),X=>eq(mul(X,add(c(1200).A,I(2))),sc(tr(c(1200).B),3)));
 reject(at(r,1207,1),X=>eq(mul(power(c(1207).A,3),X),sc(c(1207).B,4)));
 reject(at(r,1226,0),X=>eq(mul(add(sc(c(1226).A,2),c(1226).B),X),add(sc(c(1226).A,3),c(1226).B,-1)));
 reject(at(r,1254,1),X=>eq(add(mul(c(1254).A,X),sc(mul(c(1254).B,tr(c(1254).C)),-2)),power(c(1254).A,2)));
 reject(at(r,1262,0),X=>eq(mul(power(c(1262).A,4),X),add(power(c(1262).B,2),I(2))));
 reject(at(r,1288,0),X=>eq(mul(c(1288).A,X),mul(power(c(1288).B,2),c(1288).C)));
 reject(at(r,1308,1),X=>eq(mul(c(1308).A,X),add(mul(c(1308).B,X),c(1308).C)));
});
test('parameters and impossible null Gram product are checked independently',()=>{
 const r=rows(),ok=([a,b])=>eq(add(add([[a,1],[0,2]],[[1,b],[0,3]],-1),mul([[a,1],[0,2]],tr([[1,b],[0,3]]))),c(1171).C),z=at(r,1171,0);
 assert.ok(ok(z.value));for(const w of z.wrong)assert.equal(ok(w),false);
 const valid=a=>eq(tr(mul([[-1,1]],[[1,a],[0,1]])),mul([[1,a],[0,1]],[[-1],[1]]));assert.ok(valid(0));assert.equal(valid(1),false);assert.equal(valid(-1),false);assert.equal(valid(2),false);
 for(const b of [-5,-1,0,.5,1,10])assert.equal(mul([[1,b],[0,3]],tr([[1,b],[0,3]]))[1][1],9);
});
test('powers, all entries, singularity and sum-product answers are independently recomputed',()=>{
 const r=rows();reject(at(r,1195,1),R=>eq(R,sc(power(c(1195).D,2),2)));
 for(const a of [-3,-1,0,.5,2,4])for(const n of [1,2,3,7,2014])assert.ok(eq(power([[1,a],[0,1]],n),[[1,n*a],[0,1]]));
 for(const a of [.5,2])assert.equal(eq(power([[1,a],[0,1]],2014),[[1,a**2014],[0,1]]),false);
 assert.ok(eq(power(c(1262).A,2),sc(I(2),-1)));assert.ok(eq(mul(c(1262).C,[[1],[1],[1]]),[[0],[0],[0]]));
 assert.ok(eq(at(r,1200,0).U,add(mul(c(1200).A,c(1200).C),mul(c(1200).B,tr(c(1200).D)))));
 assert.ok(eq(at(r,1200,0).V,add(power(c(1200).B,2),mul(c(1200).C,c(1200).D))));
 assert.ok(eq(at(r,1308,0).U,add(c(1308).A,c(1308).B)));assert.ok(eq(at(r,1308,0).V,tr(mul(c(1308).B,c(1308).C))));
});
test('dimension answers checked by shape algebra; invalid matrix plus scalar is not an identity shift',()=>{
 const r=rows(),product=(a,b)=>a&&b&&a[1]===b[0]?[a[0],b[1]]:null,sum=(a,b)=>a&&b&&a[0]===b[0]&&a[1]===b[1]?a:null;
 assert.deepEqual([sum([2,2],product([2,2],[2,1])),sum([2,2],product([1,2],[2,1]))],[null,null]);
 const z=at(r,1226,1);assert.deepEqual(z.dimensions,[[3,2],[2,2],['m',3],[3,3]]);
 for(const m of [1,2,5])assert.deepEqual(product([m,3],[3,2]),[m,2]);
 assert.deepEqual(product(product([3,2],[2,2]),[2,3]),[3,3]);assert.deepEqual(product(product([2,3],[3,3]),[3,2]),[2,2]);
 const t=at(r,1254,0);assert.deepEqual(product(product([2,2],t.P),[3,2]),[2,2]);assert.deepEqual(product(product(t.Q,[2,2]),[2,3]),[3,3]);
 assert.deepEqual(at(r,1288,1),{B:[3,2],C:[3,3],D:[2,'n']});
});
test('ten official PNG/PDF hashes match; 21 parts with complete ordered solutions',()=>{
 const obs=new Map(matrixExtendedObservations.map(o=>[o[0],o]));let n=0;for(const r of rows()){const i=r.correctionEvidence.parameters.index,o=obs.get(i);assert.equal(sha(fs.readFileSync(r.officialSource.path)),o[1]);assert.equal(r.officialSource.range.page,o[2]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),o[4]);for(const p of r.parts){n++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.math&&s.explanation));}}assert.equal(n,21);
});
test('editorial missegmentation retained as evidence, not as phantom learner subparts',()=>{
 const r=rows();for(const i of [1200,1262]){const x=r.find(x=>x.correctionEvidence.parameters.index===i);assert.match(x.sourceLiteral,/OPCIÓN B/);assert.deepEqual(x.parts.map(p=>p.partId),['a','b']);assert.equal(matrixExtendedObservations.find(o=>o[0]===i)[3],'B.1');const replacements=matrixExtendedReplacements({...x,queueIndex:i});assert.ok(replacements.some(z=>z[2]==='PDF_MATRIX_PREFIX_AND_EXCLUDED_PREVIOUS_EDITORIAL_INSTRUCTION'));}
});
test('extended matrix build is reproducible, order invariant and nonmutating',()=>{
 const files=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=files.map(f=>sha(fs.readFileSync(f))),sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildExtendedMatrixBatch('matrix-extended-test',[...cases].reverse()).batch.records));assert.deepEqual(files.map(f=>sha(fs.readFileSync(f))),before);
});

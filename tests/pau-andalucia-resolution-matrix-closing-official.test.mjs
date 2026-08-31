import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildClosingMatrixBatch} from '../scripts/resolve-andalucia-matrix-closing-official.mjs';
import {matrixClosingObservations} from '../scripts/andalucia-matrix-closing-pdf-evidence.mjs';
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
const sc=(A,k)=>A.map(r=>r.map(x=>x*k));
const eq=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((x,j)=>Math.abs(x-B[i][j])<1e-8));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const rows=()=>buildClosingMatrixBatch('matrix-closing-test').batch.records;
const c=i=>cases.find(x=>x.index===i);
const at=(r,i,p)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[p].verification.numericalEvidence;
function reject(z,check){assert.ok(check(z.value));for(const w of z.wrong)assert.equal(check(w),false);const v=[z.value,...z.wrong];for(let i=0;i<4;i++)for(let j=0;j<i;j++)assert.equal(eq(v[i],v[j]),false);}
test('closing matrix equations: correct answers independently substituted; every numerical distractor rejected',()=>{
 const r=rows();reject(at(r,1395,1),X=>eq(add(X,sc(mul(c(1395).B,c(1395).A),2)),sc(mul(mul(tr(c(1395).C),c(1395).D),c(1395).A),3)));
 reject(at(r,1395,2),R=>eq(R,add(mul(c(1395).A,tr(c(1395).B)),sc(mul(mul(c(1395).A,tr(c(1395).D)),c(1395).C),2),-1)));
 reject(at(r,1396,0),R=>eq(R,mul(c(1396).A,c(1396).A)));
 reject(at(r,1396,1),X=>eq(add(mul(c(1396).A,X),sc(c(1396).B,4)),tr(c(1396).C)));
 reject(at(r,1411,0),R=>eq(R,mul(c(1411).A,c(1411).B)));
 reject(at(r,1411,1),X=>eq(add(tr(c(1411).A),mul(c(1411).B,X)),sc(c(1411).B,3)));
 reject(at(r,1423,0),R=>eq(R,mul(c(1423).A,tr(c(1423).B))));
 reject(at(r,1454,0),X=>eq(add(mul(c(1454).A,X),c(1454).B),mul(mul(c(1454).A,c(1454).A),c(1454).C)));
 reject(at(r,1529,0),J=>eq(mul(c(1529).A,J),I(3))&&eq(mul(J,c(1529).A),I(3)));
 reject(at(r,1529,1),X=>eq(mul(c(1529).A,X),c(1529).B));
 reject(at(r,1596,1),X=>eq(add(mul(X,c(1596).A),mul(X,c(1596).B),-1),c(1596).C));
});
test('inverse identity has a general proof; noncommuting numerical case rejects three false universal claims',()=>{
 const r=rows(),z=at(r,1355,1),{A,B}=c(1355),valid=(X,Y)=>eq(mul(A,X),B)&&eq(mul(B,Y),A);
 assert.ok(valid(z.X,z.Y));assert.ok(eq(mul(z.X,z.Y),I(2)));assert.ok(eq(mul(z.Y,z.X),I(2)));
 for(const [X,Y]of z.wrong)assert.equal(valid(X,Y),false);
 assert.equal(eq(mul(z.Y,tr(z.X)),I(2)),false);assert.equal(eq(mul(z.Y,sc(z.X,-1)),I(2)),false);assert.equal(eq(mul(z.Y,z.Y),I(2)),false);
});
test('singular parameter, powers and both shoppers verified separately',()=>{
 const r=rows(),z=at(r,1596,0),det=a=>8*a-24;assert.equal(det(z.value),0);for(const w of z.wrong)assert.notEqual(det(w),0);
 let P=I(2);for(let n=1;n<=8;n++){P=mul(P,c(1596).A);assert.ok(eq(P,sc(c(1596).A,11**(n-1))));}
 assert.ok(eq(P,sc(c(1596).A,at(r,1596,2).coefficient)));for(const w of at(r,1596,2).wrong)assert.equal(eq(P,sc(c(1596).A,w)),false);
 const costs=mul(c(1423).A,tr(c(1423).B)),s=at(r,1423,1),best=[0,1].map(j=>costs[0][j]<costs[1][j]?1:2);assert.deepEqual(s.shops,best);for(const w of s.wrongShops)assert.notDeepEqual(w,best);
 assert.deepEqual(costs,[[115,160],[122,157]]);
});
test('dimension results and every dimension distractor checked with shape algebra',()=>{
 const r=rows(),product=(a,b)=>a&&b&&a[1]===b[0]?[a[0],b[1]]:null;
 const dims=[product([3,3],[3,2]),product([2,1],[1,3]),product([3,2],[1,3]),product([1,3],[3,2])];assert.deepEqual(dims,at(r,1395,0).dimensions);
 for(const wrong of [[[2,3],[2,3],null,[1,2]],[[3,2],[3,2],null,[1,2]],[[3,2],[2,3],[3,3],[1,2]]])assert.notDeepEqual(wrong,dims);
 const valid=([p,q])=>JSON.stringify(product([3,3],[p[1],p[0]]))==='[3,2]'&&JSON.stringify(product([3,2],product(q,[3,2])))==='[3,2]';
 assert.ok(valid([[2,3],[2,3]]));for(const w of [[[3,2],[2,3]],[[2,3],[3,2]],[[3,3],[2,2]]])assert.equal(valid(w),false);
});
test('8 official documents and page hashes; 18 fully resolved parts',()=>{
 const obs=new Map(matrixClosingObservations.map(o=>[o[0],o]));let n=0;for(const r of rows()){const i=r.correctionEvidence.parameters.index,o=obs.get(i);assert.equal(sha(fs.readFileSync(r.officialSource.path)),o[1]);assert.equal(r.officialSource.range.page,o[2]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),o[4]);for(const p of r.parts){n++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.math&&s.explanation));}}assert.equal(n,18);
});
test('closing matrix batch deterministic, order invariant, original banks and queue untouched',()=>{
 const paths=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p))),sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildClosingMatrixBatch('matrix-closing-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);
});

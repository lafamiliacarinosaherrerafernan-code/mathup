import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildMatrixPowersBatch} from '../scripts/resolve-andalucia-matrix-powers-and-equations.mjs';
const I=[[1,0],[0,1]],zero=[[0,0],[0,0]];
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,v,k)=>s+v*B[k][j],0)));
const add=(A,B,scale=1)=>A.map((row,i)=>row.map((v,j)=>v+scale*B[i][j]));
const scale=(A,k)=>A.map(row=>row.map(x=>x*k));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const pow=(A,n)=>{let r=I;for(let i=0;i<n;i++)r=mul(r,A);return r;};
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const batch=()=>buildMatrixPowersBatch('matrix-test').batch.records;
const at=(rows,i)=>rows.find(r=>r.correctionEvidence.parameters.index===i);
const v=(rows,i,j)=>at(rows,i).parts[j].verification.numericalEvidence;
test('official matrix powers are independently multiplied, not scalar-entry powers',()=>{
 const rows=batch();
 const c=cases[0],value=add(pow(c.A,2),pow(c.B,3));assert.deepEqual(value,[[-19,4],[1,6]]);assert.deepEqual(v(rows,129,0).result,value);
 assert.deepEqual(v(rows,129,0).wrong,[add(c.A.map(row=>row.map(x=>x*x)),pow(c.B,3)),add(pow(c.A,2),pow(c.B,2)),add(pow(c.A,2),[[27,0],[0,1]])]);
 for(const wrong of v(rows,129,0).wrong)assert.notDeepEqual(wrong,value);
 for(const [i,part] of [[217,1],[253,0],[336,0]]){const c=cases.find(x=>x.index===i);for(const [n,M] of Object.entries(v(rows,i,part).powers))assert.deepEqual(pow(c.A,Number(n)),M);}
 assert.deepEqual(pow(cases[1].A,2),[[-1,0],[0,-1]]);assert.deepEqual(pow(cases[2].A,2),I);assert.deepEqual(pow(cases[3].A,2),I);
});
test('three matrix equations satisfy the original equations and each distractor fails',()=>{
 const rows=batch();
 for(const [i,j]of[[129,1],[217,0],[253,1]]){
  const c=cases.find(c=>c.index===i),e=v(rows,i,j);
  const residual=X=>i===129?add(mul(add(c.A,c.B),X),add(c.A,c.B,-1),-1):i===217?add(add(mul(c.A,X),mul(c.B,X)),c.C,-1):add(add(mul(c.A,X),I),add(scale(transpose(c.B),5),pow(c.A,2),-1),-1);
  assert.deepEqual(residual(e.X),zero);assert.equal(new Set([e.X,...e.wrong].map(JSON.stringify)).size,4);
  for(const wrong of e.wrong)assert.notDeepEqual(residual(wrong),zero);
  const coef=i===253?c.A:add(c.A,c.B);assert.notEqual(coef[0][0]*coef[1][1]-coef[0][1]*coef[1][0],0);
 }
});
test('difference of squares rejects noncommutation and verifies both members',()=>{
 const rows=batch(),c=cases.find(x=>x.index===336),e=v(rows,336,1);
 const lhs=mul(add(c.B,c.A),add(c.B,c.A,-1)),rhs=add(pow(c.B,2),pow(c.A,2),-1);
 assert.deepEqual(e.left,lhs);assert.deepEqual(e.right,rhs);assert.notDeepEqual(lhs,rhs);
 const commutator=add(mul(c.A,c.B),mul(c.B,c.A),-1);assert.deepEqual(commutator,[[0,-4],[0,0]]);assert.deepEqual(add(lhs,rhs,-1),commutator);
 // False alternatives: commuting, reversed commutator, adding A² instead.
 assert.notDeepEqual(lhs,rhs);assert.notDeepEqual(lhs,add(rhs,commutator,-1));assert.notDeepEqual(rhs,add(pow(c.B,2),pow(c.A,2)));
});
test('source identities, PDF and inspected page hashes remain exact',()=>{
 const png={129:'ebfa1cd09620dc02c668583fc19cdf2870df485c4491ace8501b1953027e2fb7',217:'cd426b3d82f9b902f3df53110fa38ce4547c725536e0704c9c5cfc4a9ca16ba1',253:'d6a59cbafe0e875e9c98ce755006e71d1eaee8d53d9f1cfd81566f7b8c32d2c2',336:'8e55363fc7fbd1ea67f48f5ed1cb7bec26b34a352c688e48ef916db1b0e49ba8'};
 for(const r of batch()){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),png[i]);assert.equal(r.primaryTopic,'Matrices');assert.equal(r.examSlot,1);assert.equal(r.parts.length,2);}
});
test('eight complete solutions with plausible distinct alternatives; no source mutation',()=>{
 const rows=batch();assert.equal(rows.length,4);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.explanation&&s.math));assert.ok(p.verification.verified);}
});
test('matrix batch reproducibility, inverse order and read-only rollback',()=>{
 const files=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','math-renderer.js'];const before=files.map(p=>sha(fs.readFileSync(p)));
 const stable=rows=>rows.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));
 assert.deepEqual(batch(),batch());assert.deepEqual(stable(batch()),stable(buildMatrixPowersBatch('matrix-test',[...cases].reverse()).batch.records));
 assert.deepEqual(files.map(p=>sha(fs.readFileSync(p))),before);
});

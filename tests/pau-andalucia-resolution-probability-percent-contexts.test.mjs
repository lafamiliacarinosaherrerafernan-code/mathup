import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildPercentContextBatch} from '../scripts/resolve-andalucia-probability-percent-contexts.mjs';
import {percentContextObservations,projectPercentContext} from '../scripts/andalucia-probability-percent-context-pdf-evidence.mjs';
const read=p=>fs.readFileSync(p,'utf8').trim().split(/\r?\n/).map(JSON.parse),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
test('three institutional pages bind words and all parameters to original PDF bytes',()=>{
 const q=read('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'),c=read('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl');
 for(const[i,doc,page,,png]of percentContextObservations){const s=c.find(x=>x.exerciseId===q[i].exerciseId);assert.equal(sha(fs.readFileSync(s.provenance.localPath)),doc);assert.equal(s.sourceRange.page,page);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),png);assert.ok(!projectPercentContext(i,s.officialPrompt).includes('�'));}
});
test('independent weighted insurance and inclusion-exclusion checks',()=>{
 assert.deepEqual(cases[0].cells.map(x=>x[2]),[20*10/100,20*90/100,80*15/100,80*85/100]);
 assert.deepEqual(cases[1].cells.map(x=>x[2]),[20,50-20,40-20,100-50-40+20]);
 assert.deepEqual(cases[2].cells.map(x=>x[2]),[6,11-6,13-6,100-11-13+6]);
 const r=buildPercentContextBatch().batch.records;assert.deepEqual(r.map(x=>x.parts.map(p=>p.answer)),[['14%','frac{3400}{43}%'],['70%','20%','50%'],['7%','82%','frac{600}{11}%']]);
});
test('eight percentages have three pairwise distinct false distractors and complete derivation',()=>{
 const r=buildPercentContextBatch().batch.records;assert.equal(r.reduce((n,x)=>n+x.parts.length,0),8);
 for(const x of r){assert.equal(x.primaryTopic,'Probabilidad');for(const p of x.parts){const v=p.verification.numericalEvidence;assert.ok(p.solutionSteps.length>=6);assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);for(const[n,d]of v.wrong)assert.notEqual(n*v.denominator,d*v.numerator);for(let i=0;i<3;i++)for(let j=0;j<i;j++)assert.notEqual(v.wrong[i][0]*v.wrong[j][1],v.wrong[j][0]*v.wrong[i][1]);}}
});
test('permutation leaves source and mathematical records identical',()=>{
 const a=buildPercentContextBatch('stable').batch.records,b=buildPercentContextBatch('stable',[...cases].reverse()).batch.records;for(const r of a)assert.deepEqual(r,b.find(x=>x.exerciseId===r.exerciseId));
});

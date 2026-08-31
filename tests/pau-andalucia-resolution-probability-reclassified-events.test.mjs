import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildReclassifiedEventBatch} from '../scripts/resolve-andalucia-probability-reclassified-events.mjs';
import {eventObservations,projectEventText} from '../scripts/andalucia-reclassified-event-pdf-evidence.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const read=p=>fs.readFileSync(p,'utf8').trim().split(/\r?\n/).map(JSON.parse);
const queue=read('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl');
const canonical=read('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl');
const by=i=>cases.find(c=>c.index===i);
test('eight official PDF/PNG sources and hashes, with original queue unchanged',()=>{
 assert.equal(cases.length,8);assert.equal(eventObservations.length,8);
 assert.equal(sha(fs.readFileSync('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl')),'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
 for(const [i,doc,page,,png]of eventObservations){const s=canonical.find(x=>x.exerciseId===queue[i].exerciseId);assert.equal(s.documentHash,doc);assert.equal(sha(fs.readFileSync(s.provenance.localPath)),doc);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),png);assert.ok(page>0);}
});
test('independently reconstruct exact four-cell partitions from official constraints',()=>{
 for(const c of cases){assert.equal(c.cells.reduce((s,x)=>s+x[2],0),c.scale);assert.ok(c.cells.every(x=>x[2]>=0));}
 assert.equal(by(280).cells[0][2],(.5-.3)*20);
 assert.equal(by(627).cells[3][2]*100,7*by(627).scale);
 assert.equal((by(627).cells[2][2]+by(627).cells[3][2])*28,7*100);
 assert.equal(by(627).cells[0][2]*100,36*(by(627).cells[0][2]+by(627).cells[1][2]));
 assert.deepEqual(by(1013).cells.map(x=>x[2]),[2,6-2,5-2,10-6-5+2]);
 assert.deepEqual(by(1238).cells.map(x=>x[2]),[1,4-1,3-1,10-4-3+1]);
 assert.deepEqual(by(1603).cells.map(x=>x[2]),[4/4,4,4-1,10-1-4-3]);
 assert.deepEqual(by(952).cells.map(x=>x[2]),[5/5,3-1,5-1,10-3-5+1]);
 assert.deepEqual(by(542).cells.map(x=>x[2]),[66*71,6600-66*71,3400-1786,1786]);
 assert.deepEqual(by(1074).cells.map(x=>x[2]),[320*30/100,320-96,680-646,646]);
});
test('every numeric distractor differs rationally and no options duplicate',()=>{
 const r=buildReclassifiedEventBatch().batch.records;assert.equal(r.length,8);assert.equal(r.reduce((n,x)=>n+x.parts.length,0),25);
 for(const x of r){assert.equal(x.primaryTopic,'Probabilidad');assert.equal(x.examSlot,4);for(const p of x.parts){assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=6);const v=p.verification.numericalEvidence;
 if(v.wrong){for(const[n,d]of v.wrong)assert.notEqual(n*v.denominator,d*v.numerator);for(let a=0;a<3;a++)for(let b=0;b<a;b++)assert.notEqual(v.wrong[a][0]*v.wrong[b][1],v.wrong[b][0]*v.wrong[a][1]);}
 if(v.values){const all=[v.values,...v.bad];for(let a=0;a<4;a++)for(let b=0;b<a;b++)assert.ok(all[a].some(([n,d],k)=>n*all[b][k][1]!==d*all[b][k][0]));}
 if(v.claims&&v.N){assert.equal(v.independent,v.J*v.N===v.R*v.C);assert.ok(v.J>0);assert.equal(v.compatible,true);}
 }}
});
test('PDF nonzero signs restore the theorem, not an invented zero-probability problem',()=>{
 const s=canonical.find(x=>x.exerciseId===queue[952].exerciseId),p=projectEventText(952,s.officialPrompt);assert.ok(s.officialPrompt.includes('P (A) = 0 y P (B) = 0'));assert.ok(p.includes('P (A) ≠ 0 y P (B) ≠ 0'));
 const a=buildReclassifiedEventBatch().batch.records.find(x=>x.exerciseId===s.exerciseId).parts[0];assert.ok(a.answer.startsWith('No:'));assert.equal(a.verification.numericalEvidence.officialNotEqualSigns,2);
 for(const A of [1/100,.3,.5,1])for(const B of [.01,.4,1])assert.ok(A*B>0);
});
test('official missing percentages and displaced word are recovered explicitly, never from answers',()=>{
 const source=i=>canonical.find(x=>x.exerciseId===queue[i].exerciseId).officialPrompt;
 for(const x of ['66%','71%','17.86%'])assert.ok(projectEventText(542,source(542)).includes(x));
 for(const x of ['32%','64.6%','30%'])assert.ok(projectEventText(1074,source(1074)).includes(x));
 assert.ok(projectEventText(627,source(627)).startsWith('El 7%'));assert.ok(projectEventText(627,source(627)).includes('36% tienen\nmoto'));
});
test('reversed batch ordering preserves every solved record and nested roman questions',()=>{
 const a=buildReclassifiedEventBatch('stable',cases).batch.records,b=buildReclassifiedEventBatch('stable',[...cases].reverse()).batch.records;for(const x of a)assert.deepEqual(x,b.find(y=>y.exerciseId===x.exerciseId));
 const x=a.find(r=>r.correctionEvidence.parameters.index===1013);assert.equal(x.parts.length,2);for(const t of ['i)','ii)','iii)'])assert.ok(x.parts[0].answer.includes(t));
});

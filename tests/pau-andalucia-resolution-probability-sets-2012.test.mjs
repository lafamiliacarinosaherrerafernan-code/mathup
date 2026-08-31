import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildSetBatch} from '../scripts/resolve-andalucia-probability-sets-2012.mjs';
const rows=buildSetBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12);
test('six fully solved subparts and eighteen distinct documented incorrect answers',()=>{assert.equal(rows.length,2);assert.equal(rows.flatMap(r=>r.parts).length,6);for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=7);assert.equal(p.distractorEvidence.length,3);}});
test('independence, conditional probability and De Morgan independently counted in 100 equiprobable atoms',()=>{
 // 56 both, 24 only A, 14 only B, 6 neither, reconstructed from .8/.7/.94.
 const atoms=Array.from({length:100},(_,i)=>({A:i<80,B:i<56||i>=80&&i<94})),count=f=>atoms.filter(f).length;
 const joint=count(x=>x.A&&x.B)/100,product=count(x=>x.A)*count(x=>x.B)/10000;
 near(joint,product);assert.equal(count(x=>!x.A||!x.B),44);near(count(x=>x.A&&x.B)/count(x=>x.B),.8);
 const ps=at(8).parts;near(ps[0].verification.numericalEvidence.joint,joint);assert.equal(ps[0].verification.numericalEvidence.independent,true);near(ps[1].verification.numericalEvidence.value,.8);near(ps[2].verification.numericalEvidence.value,.44);
 for(const [index,answer]of[[1,.8],[2,.44]])assert.equal([ps[index].answer,...ps[index].distractors].filter(s=>+s.replace(',','.')===answer).length,1);
 const assertions=[joint===product,.94===joint,0===joint,.06===joint];assert.deepEqual(assertions,[true,false,false,false]);
});
test('all scenario answers satisfy their own condition and marginal constraints; no distractor does',()=>{
 const ps=at(26).parts;
 const valid=(u,j,k)=>{const cells=[j,.6-j,.25-j,1-u];return Math.abs(u-(.85-j))<1e-12&&cells.every(x=>x>=0)&&Math.abs(cells.reduce((a,b)=>a+b)-1)<1e-12&&(k===0?j===0:k===1?Math.abs(j-.6*.25)<1e-12:Math.abs(j/.25-.4)<1e-12);};
 for(const [i,p]of ps.entries()){const parse=s=>[...s.matchAll(/=([\d,]+)[;.]/g)].map(m=>+m[1].replace(',','.'));
  const options=[p.answer,...p.distractors].map(parse);assert.ok(options.every(a=>a.length===2));assert.deepEqual(options.map(([u,j])=>valid(u,j,i)),[true,false,false,false]);
  const v=p.verification.numericalEvidence;assert.ok(valid(v.union,v.intersection,i));
 }
});
test('five human-validated native objects retain their source hashes and no new human decisions',()=>{
 const hash=b=>crypto.createHash('sha256').update(b).digest('hex');assert.equal(rows.flatMap(r=>r.equationEvidence).length,5);
 for(const r of rows){assert.equal(hash(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);for(const e of r.equationEvidence){assert.equal(e.validationStatus,'EQUATION3_HUMAN_VALIDATED');assert.equal(e.documentHash,r.officialSource.documentHash);assert.match(e.mathAstSha256,/^[a-f0-9]{64}$/);}}
 assert.match(at(8).sourceLiteral,/A\^\{C\}∪B\^\{C\}/);
});
test('same inputs and reversed order preserve mathematical outputs',()=>{const norm=rs=>rs.map(r=>[r.exerciseId,r.parts,r.equationEvidence]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(norm(rows),norm(buildSetBatch().batch.records));assert.deepEqual(norm(rows),norm(buildSetBatch('batch-0260',[...cases].reverse()).batch.records));});

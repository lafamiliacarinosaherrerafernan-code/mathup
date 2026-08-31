import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {buildBinomialFactoryBatch,cases} from '../scripts/resolve-andalucia-probability-binomial-factory.mjs';
const rows=buildBinomialFactoryBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
test('two source-read tasks have six parts and eighteen false alternatives',()=>{
 assert.equal(rows.length,2);assert.equal(rows.flatMap(r=>r.parts).length,6);for(const r of rows)for(const p of r.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);}
});
test('enumerating all 32 binary configurations independently verifies the binomial masses',()=>{
 const masses=Array(6).fill(0);for(let mask=0;mask<32;mask++){let prob=1,k=0;for(let j=0;j<5;j++){const success=!!(mask&(1<<j));if(success)k++;prob*=success?.6:.4;}masses[k]+=prob;}
 near(masses.reduce((a,b)=>a+b),1);near(masses[4],at(1114).parts[0].verification.numericalEvidence.value);near(masses.slice(2).reduce((a,b)=>a+b),at(1114).parts[1].verification.numericalEvidence.value);near(masses.reduce((s,p,k)=>s+k*p,0),3);
 const claims=at(1114).parts[0].verification.numericalEvidence.optionClaims;assert.deepEqual(claims.map(x=>x.n===5&&x.p===.6&&Math.abs(x.value-masses[4])<1e-12),[true,false,false,false]);
});
test('expectation threshold is minimal, not a probability guarantee',()=>{
 const e=at(1114).parts[3].verification.numericalEvidence;assert.equal(e.minimum,20);assert.ok(20*.6>=12);assert.ok(19*.6<12);assert.match(at(1114).parts[3].solutionSteps.at(-1).explanation,/no una garantía/);
 for(const w of e.wrong)assert.notEqual(w,e.minimum);
});
test('exact integer factory population independently checks Bayes and the common rate',()=>{
 // 260000 pieces: A=65000, B=91000, C=104000. Defects: 1700,910,2720.
 const all=260000,bad=1700+910+2720,good=all-bad;
 near(bad/all,.0205);near(910/91000,.01);near(1700/65000,2720/104000);
 near((91000-910)/good,at(1134).parts[0].verification.numericalEvidence.value);near(1700/bad,at(1134).parts[1].verification.numericalEvidence.value);near(1700/65000,at(1134).parts[1].verification.numericalEvidence.commonRate);
 near(170/533+7/41+272/533,1);
});
test('numeric alternatives are neither correct nor equivalent to each other',()=>{
 for(const [i,j]of[[1114,1],[1114,2],[1134,0],[1134,1]]){const e=at(i).parts[j].verification.numericalEvidence,x=[e.value,...e.wrong];assert.equal(new Set(x.map(v=>v.toFixed(12))).size,4);assert.ok(e.wrong.every(v=>Math.abs(v-e.value)>1e-5));}
});
test('originals, part scopes, official hashes and scoring evidence remain unchanged',()=>{
 const src=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const c of cases){const r=at(c.index),s=src.find(x=>x.exerciseId===r.exerciseId);assert.equal(r.sourceLiteral,s.officialPrompt);assert.deepEqual(r.sourceSubparts,s.subparts);assert.deepEqual(r.scoreEvidence,s.scoreEvidence);assert.equal(r.parts.length,s.subparts.length);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);}
});
test('repeated and reversed generation retain exact answers and pedagogical steps',()=>{
 const sig=rs=>rs.map(r=>[r.exerciseId,r.sourceLiteral,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildBinomialFactoryBatch().batch.records));assert.deepEqual(sig(rows),sig(buildBinomialFactoryBatch('batch-0274',[...cases].reverse()).batch.records));
});

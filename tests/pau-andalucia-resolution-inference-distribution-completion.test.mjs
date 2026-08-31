import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildDistributionCompletionBatch} from '../scripts/resolve-andalucia-inference-distribution-completion.mjs';
const rows=buildDistributionCompletionBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('two complete official tasks contain five parts and fifteen plausible errors',()=>{
 assert.equal(rows.length,2);assert.equal(rows.flatMap(r=>r.parts).length,5);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);}
});
test('distribution parameters follow expectation and sum-of-variances independently',()=>{
 for(const c of cases){const e=at(c.index).parts[0].verification.numericalEvidence;near(e.variance,Array(c.n).fill(c.sigma*c.sigma).reduce((a,b)=>a+b)/(c.n*c.n));near(e.sd*e.sd,e.variance);assert.equal(e.mean,c.knownMean?50:null);}
 assert.match(at(1433).parts[0].answer,/media μ/);assert.doesNotMatch(at(1433).parts[0].answer,/110/);
});
test('probability and interval agree with Python NormalDist independent references',()=>{
 const p=at(1253).parts[1].verification.numericalEvidence;near(p.value,.9875806693484477);near(p.lo,-2.5);near(p.hi,2.5);
 const e=at(1433).parts[1].verification.numericalEvidence;near(e.interval[0],106.71029274609705);near(e.interval[1],113.28970725390295);
});
test('sample minimum is 271 and 270 exceeds the allowed two-euro margin',()=>{
 const e=at(1433).parts[2].verification.numericalEvidence;near(e.bound,270.5543454095411);assert.equal(e.minimum,271);assert.ok(e.marginAtMinimum<=2);assert.ok(e.marginAtPrevious>2);assert.ok(e.wrong.every(n=>n!==271));
});
test('four distribution options stay distinct even when variance and deviation both equal one',()=>{
 for(const r of rows){const p=r.parts[0],v=p.verification.numericalEvidence,mu=v.mean===null?'μ':String(v.mean);const all=[{mean:mu,sd:v.sd},...v.alternatives];assert.equal(new Set(all.map(x=>`${x.mean}:${x.sd}`)).size,4);assert.ok(v.alternatives.every(x=>x.mean!==mu||x.sd!==v.sd));}
 const p=at(1253).parts[1].verification.numericalEvidence;for(const w of p.wrong){assert.ok(w>=0&&w<=1);assert.ok(Math.abs(w-p.value)>1e-5);}assert.equal(new Set(p.wrong.map(x=>x.toFixed(5))).size,3);
});
test('official literal, every source parameter and document bytes are auditable',()=>{
 const canonical=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const c of cases){const r=at(c.index),s=canonical.find(x=>x.exerciseId===r.exerciseId);for(const literal of c.literals)assert.ok(r.sourceLiteral.includes(literal));assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);assert.deepEqual(r.scoreEvidence,s.scoreEvidence);assert.equal(r.sourceLiteral,s.officialPrompt);}
});
test('repeated generation and reversed input retain exact mathematical content',()=>{
 const sig=rs=>rs.map(r=>[r.exerciseId,r.sourceLiteral,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildDistributionCompletionBatch().batch.records));assert.deepEqual(sig(rows),sig(buildDistributionCompletionBatch('batch-0273',[...cases].reverse()).batch.records));
});

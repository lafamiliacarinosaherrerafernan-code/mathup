import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildRecoveredDesignBatch} from '../scripts/resolve-andalucia-inference-recovered-designs.mjs';
import {recoveredDesignObservations,recoveredDesignStatements} from '../scripts/andalucia-inference-recovered-design-pdf-evidence.mjs';
const records=buildRecoveredDesignBatch().batch.records;
const at=i=>records.find(r=>r.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
// References computed independently with Python statistics.NormalDist.
test('four official exercises and all ten parts have developments and four distinct options',()=>{
 assert.equal(records.length,4);assert.equal(records.flatMap(r=>r.parts).length,10);
 for(const r of records)for(const p of r.parts){assert.ok(p.solutionSteps.length>=5);assert.equal(p.finalAnswer,p.answer);assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.doesNotMatch(p.prompt,/\([\d.,]+\s+puntos?\)/i);}
});
test('upper-tail null boundary is ten, with one-sided 2.5% rejection and no proof of null',()=>{
 const r=at(988),v=r.parts[2].verification.numericalEvidence;
 near(v.z,1.9599639845400536);near(v.limit,10.01239590064609);near(v.observed,.5850213671311502);near(v.pvalue,.27926667481157663);
 assert.ok(v.pvalue>v.alpha);assert.ok(v.center<v.limit);assert.match(r.parts[0].answer,/μ ≤ 10; H₁: μ > 10/);assert.match(r.parts[2].answer,/No se rechaza/);
 assert.ok(r.parts[2].distractors.some(x=>x.includes('queda demostrado')));assert.match(r.parts[2].solutionSteps.at(-1).explanation,/no prueba/);
});
test('pet proportion uses the recovered 240 of 600, not the proposed one half',()=>{
 const r=at(612),v=r.parts[0].verification.numericalEvidence;
 near(v.interval[0],.36080072030919896);near(v.interval[1],.4391992796908011);assert.equal(v.p,.4);assert.equal(v.inside,false);assert.ok(.5>v.interval[1]);
 assert.equal(r.parts[1].verification.numericalEvidence.minimum,1476);
 assert.equal(r.parts[2].verification.numericalEvidence.relativeWidth,.5);assert.equal(r.parts[2].verification.numericalEvidence.relativeN,4);
 // First distractor has the right interval but a false compatibility verdict.
 assert.deepEqual(v.distractorIntervals[0],v.interval);assert.equal(v.distractorCompatibility[0],true);
 for(let i=1;i<3;i++)assert.notDeepEqual(v.distractorIntervals[i],v.interval);
});
test('electricity uses reference interval in b, not the different error found in a',()=>{
 const r=at(691),a=r.parts[0].verification.numericalEvidence,b=r.parts[1].verification.numericalEvidence;
 near(a.interval[0],95.25961211676922);near(a.interval[1],98.74038788323078);assert.equal(b.error,.5);assert.equal(b.minimum,3830);assert.equal(b.variance,18.25**2);
 assert.match(r.parts[1].solutionSteps[0].math,/98,5 − 95,5/);
});
test('donor error is recalculated at 95%, with correct monotone direction',()=>{
 const r=at(851),a=r.parts[0].verification.numericalEvidence,b=r.parts[1].verification.numericalEvidence;
 near(a.interval[0],.11735733909763302);near(a.interval[1],.202642660902367);near(b.margin,.03592673327416821);assert.ok(b.margin<b.previousMargin);
 assert.equal(b.wrongMargins[0],b.margin);assert.equal(b.wrongDirection[0],'increase');assert.notEqual(b.wrongMargins[1],b.margin);assert.notEqual(b.wrongMargins[2],b.margin);
});
test('both sample sizes are minimal and their distractors are false and distinct',()=>{
 for(const index of [612,691]){const v=at(index).parts[1].verification.numericalEvidence;const e=n=>v.z*Math.sqrt(v.variance/n);
  assert.ok(e(v.minimum)<=v.error);assert.ok(e(v.minimum-1)>v.error);assert.equal(new Set([v.minimum,...v.distractorSampleSizes]).size,4);
  for(const n of v.distractorSampleSizes)assert.notEqual(n,v.minimum);
 }
});
test('official PDFs and inspected pages are unchanged; restored numerals have explicit evidence',()=>{
 const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
 for(const c of cases){const r=at(c.index),ob=recoveredDesignObservations.find(o=>o[0]===c.index);assert.equal(sha(fs.readFileSync(r.officialSource.path)),ob[1]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${c.index}.png`)),ob[4]);for(const l of c.literals)assert.ok(r.sourceLiteral.includes(l));}
 assert.match(recoveredDesignStatements[612],/600 familias/);assert.match(recoveredDesignStatements[691],/361/);assert.match(recoveredDesignStatements[851],/64 son/);
});
test('repeat and reverse preserve source literals and the full mathematical outputs',()=>{
 const stable=a=>a.map(r=>[r.exerciseId,r.sourceLiteral,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(stable(records),stable(buildRecoveredDesignBatch().batch.records));assert.deepEqual(stable(records),stable(buildRecoveredDesignBatch('batch-0369',[...cases].reverse()).batch.records));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildReturnedIntervalBatch} from '../scripts/resolve-andalucia-inference-returned-intervals.mjs';
import {compute,critical} from '../scripts/resolve-andalucia-inference-2012.mjs';
import {returnedInferenceObservations,projectReturnedInference} from '../scripts/andalucia-inference-returned-pdf-evidence.mjs';
const records=buildReturnedIntervalBatch().batch.records;
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
// Independent Python statistics.NormalDist calculations, not the JS quadrature.
const reference=[
 [1064,.6835548234899268,.8164451765100732,737],
 [1341,.24979086386841018,.3502091361315898,114],
 [1372,.08884221037826669,.23115778962173333,191],
 [1453,33.686985446560875,36.313014553439125,49],
 [1542,10282.780464300733,13717.219535699267,62],
 [1544,101355.6756070887,114422.10217068908,25],
 [1284,983.9513288462598,999.0486711537402,18],
 [1528,.2941206881128126,.42587931188718736,612],
];
test('eight official exercises, sixteen didactic resolutions and forty-eight distinct distractors',()=>{
 assert.equal(records.length,8);assert.equal(records.flatMap(r=>r.parts).length,16);
 for(const r of records)for(const p of r.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);}
});
for(const[index,lo,hi,n]of reference)test(`official q${index}: independent normal quantile and integer minimality`,()=>{
 const c=cases.find(c=>c.index===index),v=compute(c);near(v.interval[0],lo);near(v.interval[1],hi);assert.equal(v.minimum,n);
 const error=k=>v.zn*Math.sqrt(v.variance/k);
 assert.ok(c.strict?error(n)<c.error:error(n)<=c.error);
 assert.ok(c.strict?error(n-1)>=c.error:error(n-1)>c.error);
 const wrong=[n-1,Math.ceil(critical(.8)**2*v.variance/c.error**2),Math.ceil(v.bound*4)];assert.equal(new Set([n,...wrong]).size,4);
 // Even a larger sample is not the requested MINIMUM; it is a false answer to this question.
 for(const k of wrong)assert.notEqual(k,n);
});
test('sample sums, variance roots and event complement are explicit',()=>{
 for(const c of cases.filter(c=>c.sample))near(c.sample.reduce((a,b)=>a+b,0)/c.n,c.center);
 assert.equal(cases.find(c=>c.index===1453).sigma,6);assert.equal(cases.find(c=>c.index===1284).sigma,11);
 assert.equal(cases.find(c=>c.index===1372).center,20/125);
 for(const c of cases.filter(c=>c.kind==='proportion'))assert.equal(c.center,c.successes/c.n);
});
test('document and inspected page hashes bind every parameter set; source bytes are preserved',()=>{
 const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
 for(const c of cases){const r=records.find(r=>r.correctionEvidence.parameters.index===c.index),ob=returnedInferenceObservations.find(o=>o[0]===c.index);
  assert.equal(sha(fs.readFileSync(r.officialSource.path)),ob[1]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${c.index}.png`)),ob[4]);
  for(const l of c.literals)assert.ok(r.sourceLiteral.includes(l));assert.doesNotMatch(projectReturnedInference(c.index,r.sourceLiteral),/[\u001c¾]/);
 }
});
test('repeat and reversed processing preserve exercise identity and all mathematics',()=>{
 const sig=rs=>rs.map(r=>[r.exerciseId,r.sourceLiteral,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));
 assert.deepEqual(sig(records),sig(buildReturnedIntervalBatch().batch.records));assert.deepEqual(sig(records),sig(buildReturnedIntervalBatch('batch-0367',[...cases].reverse()).batch.records));
});

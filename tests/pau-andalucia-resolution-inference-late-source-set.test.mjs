import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildLateSourceBatch} from '../scripts/resolve-andalucia-inference-late-source-set.mjs';
import {normalCDF,critical} from '../scripts/resolve-andalucia-inference-2012.mjs';
const rows=buildLateSourceBatch().batch.records,at=i=>rows.find(x=>x.correctionEvidence.parameters.index===i);
// Independent oracle: Python statistics.NormalDist.inv_cdf, not the builder's quadrature.
const expected=[[1294,1.184624383149819,1.4198200612946257,19.447385279764,20],[1343,.16513106994428714,.33486893005571283,563.5650261398791,564],[1362,.6572052406322432,.7427947593677567,1098.8348576065232,1099],[1366,797.3739708931217,802.6260291068783,172.40072175429503,173],[1374,47.02001800772997,48.97998199227003,384.1458820694124,385],[1494,.3098813012251085,.39011869877489147,2011.887489238103,2012]];
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
test('six official exercises, twelve parts, thirty-six false alternatives',()=>{
 assert.equal(rows.length,6);assert.equal(rows.flatMap(x=>x.parts).length,12);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=7);}
});
test('independent NormalDist reference verifies intervals and exact integer sizes',()=>{
 for(const[i,lo,hi,bound,n]of expected){const[a,b]=at(i).parts.map(p=>p.verification.numericalEvidence);near(a.interval[0],lo);near(a.interval[1],hi);near(b.bound,bound);assert.equal(b.minimum,n);assert.equal(at(i).parts[1].answer,`n = ${n}`);}
});
test('minimality tests n and n-1, including strict versus non-strict official restrictions',()=>{
 for(const c of cases){const e=at(c.index).parts[1].verification.numericalEvidence,p=c.planningProportion??c.center,variance=c.kind==='mean'?c.sigma**2:p*(1-p),z=critical(c.nextConfidence),margin=n=>z*Math.sqrt(variance/n);assert.equal(e.strict,!!c.strict);assert.ok(c.strict?margin(e.minimum)<c.error:margin(e.minimum)<=c.error);assert.ok(c.strict?margin(e.minimum-1)>=c.error:margin(e.minimum-1)>c.error);}
});
test('changed planning proportion is explicit and never silently reuses the first sample',()=>{
 const r=at(1343),p=r.parts[1];assert.equal(r.correctionEvidence.parameters.center,.25);assert.equal(p.verification.numericalEvidence.planningProportion,.2);assert.match(p.solutionSteps[0].explanation,/distinta/);assert.match(p.solutionSteps[0].math,/0,2/);assert.doesNotMatch(p.solutionSteps[0].math,/0,25/);
 const oldBound=critical(.925)**2*.25*.75/.03**2;assert.notEqual(Math.ceil(oldBound),564);
});
test('all alternatives are numerically distinct, intervals fail the requested target and sizes fail minimality',()=>{
 const parse=s=>s.slice(1,-1).split(';').map(x=>Number(x.trim().replace(',','.')));
 for(const c of cases){const r=at(c.index),opts=[r.parts[0].answer,...r.parts[0].distractors].map(parse);assert.ok(opts.flat().every(Number.isFinite));assert.equal(new Set(opts.map(x=>JSON.stringify(x))).size,4);for(const wrong of opts.slice(1)){assert.ok(Math.abs(wrong[0]-opts[0][0])>1e-6||Math.abs(wrong[1]-opts[0][1])>1e-6);}
 const e=r.parts[1].verification.numericalEvidence;assert.ok(e.distractorSampleSizes.every(n=>n!==e.minimum));assert.equal(new Set(e.distractorSampleSizes).size,3);
 const z=critical(c.confidence);near(normalCDF(z)-normalCDF(-z),c.confidence,1e-10);}
});
test('literal sources, official hashes, scoring and actual sample arithmetic are preserved',()=>{
 const cs=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const c of cases){const r=at(c.index),s=cs.find(x=>x.exerciseId===r.exerciseId);assert.equal(r.sourceLiteral,s.officialPrompt);assert.deepEqual(r.scoreEvidence,s.scoreEvidence);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);if(c.sample)near(c.sample.reduce((a,b)=>a+b)/c.n,c.center);if(c.kind==='proportion')near(c.successes/c.n,c.center);}
});
test('repeated and reverse generation retain identical mathematical content',()=>{
 const sig=rs=>rs.map(x=>[x.exerciseId,x.sourceLiteral,x.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildLateSourceBatch().batch.records));assert.deepEqual(sig(rows),sig(buildLateSourceBatch('batch-0271',[...cases].reverse()).batch.records));
});

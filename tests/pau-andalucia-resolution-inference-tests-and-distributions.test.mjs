import test from 'node:test';
import assert from 'node:assert/strict';
import {cases,buildExtendedBatch,testValues} from '../scripts/resolve-andalucia-inference-tests-and-distributions.mjs';
import {normalCDF,critical} from '../scripts/resolve-andalucia-inference-2012.mjs';
const r=buildExtendedBatch().batch.records,at=i=>r.find(x=>x.correctionEvidence.parameters.index===i),close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const numeric=s=>[...s.matchAll(/-?\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace(',','.')));
test('six independently source-read exercises retain all sixteen official subparts',()=>{
 assert.equal(r.length,6);assert.equal(r.reduce((n,x)=>n+x.parts.length,0),16);
 for(const x of r){assert.equal(x.parts.length,x.sourceSubparts.length);assert.deepEqual(x.parts.map(p=>p.partId+')'),x.sourceSubparts.map(p=>p.label));}
});
test('mean hypothesis changes decision at 5% and 15%; independent Python NormalDist reference',()=>{
 const c=cases.find(x=>x.index===51),a=testValues(c,.05),b=testValues(c,.15);
 close(a.z,1.317615691736825);close(a.cut,1.6448536269514715);close(b.cut,1.0364333894937894);close(a.pValue,.09381616499744205);
 assert.equal(a.rejected,false);assert.equal(b.rejected,true);assert.equal(c.sample.reduce((a,b)=>a+b,0),55);
 for(const [i,v] of [a,b].entries()){const p=at(51).parts[i],valid=s=>{const n=numeric(s);return Math.abs(n[2]-v.cut)<1e-5&&Math.abs(n[3]-v.z)<1e-5&&s.includes('no se rechaza')===!v.rejected;};assert.equal([p.answer,...p.distractors].filter(valid).length,1);assert.ok(valid(p.answer));}
});
test('proportion hypotheses use null variance and the correct left tails',()=>{
 const c=cases.find(x=>x.index===60),a=testValues(c,.1),b=testValues(c,.01);
 close(a.z,-1.8705968155914472);close(a.cut,-1.2815515655446008);close(b.cut,-2.3263478740408408);assert.equal(a.rejected,true);assert.equal(b.rejected,false);
 const d=testValues(cases.find(x=>x.index===171));close(d.z,-1.9518001458970655);close(d.cut,-1.5981931399228173);assert.equal(d.rejected,true);
 for(const v of[a,b,d])close(normalCDF(v.cut),v.alpha);
});
test('sample mean distribution and probabilities independently match NormalDist reference',()=>{
 const a=at(212),b=at(273);assert.equal(a.parts[0].answer,'n = 166');close(a.parts[1].verification.numericalEvidence.se,.5);close(a.parts[2].verification.numericalEvidence.value,.022750131948179098);
 assert.equal(a.parts[1].verification.numericalEvidence.mean,null);close(b.parts[0].verification.numericalEvidence.se,8);close(b.parts[1].verification.numericalEvidence.value,.33272079663422316);assert.equal(b.parts[2].answer,'P = 0,5');
 for(const p of[a.parts[2],b.parts[1]]){const expected=p.verification.numericalEvidence.value;assert.equal([p.answer,...p.distractors].filter(x=>Math.abs(numeric(x)[0]-expected)<1e-5).length,1);}
});
test('proportion interval, confidence direction and previous-integer minimality',()=>{
 const [a,b,c]=at(223).parts,v=a.verification.numericalEvidence;close(v.interval[0],.591329133351145);close(v.interval[1],.7420041999821883);assert.ok(b.verification.numericalEvidence.errorAfter>b.verification.numericalEvidence.errorBefore);
 assert.equal(c.answer,'n = 922');const error=n=>critical(.99)*Math.sqrt((2/9)/n);assert.ok(error(922)<=.04);assert.ok(error(921)>.04);
 assert.equal([c.answer,...c.distractors].filter(x=>numeric(x)[0]===922).length,1);
 for(const other of a.distractors)assert.notDeepEqual(numeric(other),numeric(a.answer));
});
test('options are distinct, all requested parts have detailed solutions and no blanket certainty',()=>{
 for(const x of r)for(const p of x.parts){assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=5);assert.equal(p.finalAnswer,p.answer);}
 assert.ok(at(51).parts[0].solutionSteps.some(s=>s.explanation.includes('No rechazar no demuestra')));
});
test('source anchors fail closed; constructor reproduces the same semantics in reversed order',()=>{
 assert.throws(()=>buildExtendedBatch('never-consumed',[{...cases[0],literals:['sample of 11 pupils']}]))
 const normalized=a=>a.map(x=>[x.exerciseId,x.parts]).sort((a,b)=>a[0].localeCompare(b[0]));
 assert.deepEqual(normalized(r),normalized(buildExtendedBatch('batch-0249',[...cases].reverse()).batch.records));
});

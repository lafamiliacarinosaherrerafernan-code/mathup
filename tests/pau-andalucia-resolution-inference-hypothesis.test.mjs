import test from 'node:test';
import assert from 'node:assert/strict';
import {buildHypothesisBatch,buildHypothesisParts,cases,computeTest} from '../scripts/resolve-andalucia-inference-hypothesis.mjs';
import {normalCDF} from '../scripts/resolve-andalucia-inference-2012.mjs';
const close=(a,b,t=1e-7)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const r=buildHypothesisBatch().batch.records[0],c=cases[0];
test('official whole exercise retains every word and no fabricated subparts',()=>{
 assert.equal(r.sourceSubparts.length,0);assert.equal(r.parts.length,1);assert.equal(r.parts[0].partId,'whole');assert.equal(r.parts[0].prompt,r.sourceLiteral);assert.equal(r.deliveryScope,'WHOLE_OFFICIAL_EXERCISE');
 assert.throws(()=>buildHypothesisParts(c,'a) invented split'));
});
test('null variance, left tail, critical proportion and independent tabulated quantile',()=>{
 const v=computeTest(c);close(v.se,Math.sqrt(.2475/200));close(v.z,-2.842676218074805);close(v.cut,-2.3263478740408408);close(v.proportionCut,.368163459515753);
 close(v.pValue,.002236824628306,1e-9);close(normalCDF(v.cut),.01);assert.equal(v.rejected,true);
});
test('rejection is equivalent in counts, observed proportions and standardized values',()=>{
 const v=computeTest(c);for(let x=0;x<=200;x++)assert.equal((x/200-.45)/v.se<v.cut,x/200<v.proportionCut);
 assert.equal(73/200<v.proportionCut,true);assert.equal(74/200<v.proportionCut,false);
});
test('four plausible options are distinct and exactly one states the correct test and decision',()=>{
 const p=r.parts[0],v=computeTest(c),numbers=s=>[...s.matchAll(/−?\-?\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace('−','-').replace(',','.')));
 const valid=s=>{const a=numbers(s);return Math.abs(a[0]-v.cut)<1e-5&&Math.abs(a[1]-v.proportionCut)<1e-5&&Math.abs(a[2]-v.z)<1e-5&&!s.includes('no se rechaza');};
 assert.equal([p.answer,...p.distractors].filter(valid).length,1);assert.ok(valid(p.answer));assert.equal(new Set([p.answer,...p.distractors]).size,4);
 assert.equal(p.distractorEvidence.length,3);assert.equal(p.solutionSteps.length,11);assert.ok(p.solutionSteps.some(s=>s.explanation.includes('no demuestra')));
});
test('hypothesis batch is reproducible and rejects changed documentary anchors',()=>{
 assert.deepEqual(r,buildHypothesisBatch().batch.records[0]);assert.throws(()=>buildHypothesisBatch('never-consumed',[{...c,literals:['exactly 201 births']}]))
});

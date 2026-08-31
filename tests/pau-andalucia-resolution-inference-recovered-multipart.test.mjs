import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,sourceImages,buildRecoveredBatch} from '../scripts/resolve-andalucia-inference-recovered-multipart.mjs';
const rows=buildRecoveredBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i),close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`),num=s=>Number(s.replace(',','.'));
test('four source-bound exercises, ten complete parts, thirty distractors',()=>{
 assert.equal(rows.length,4);assert.equal(rows.reduce((n,r)=>n+r.parts.length,0),10);
 for(const r of rows)for(const p of r.parts){assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=6);assert.equal(p.answer,p.finalAnswer);assert.doesNotMatch(p.prompt,/\([^)]*puntos?\)/);assert.doesNotMatch(p.prompt,/\n\s*[bc]\)/);}
});
test('school allocations verify all six proportions, not merely the total',()=>{
 const strata=[160,120,120,80,240,200];for(const [i,fraction,total]of[[0,.05,46],[1,.075,69]]){
  const p=at(631).parts[i],options=[p.answer,...p.distractors].map(s=>s.match(/\(([^)]+)\)/)[1].split(';').map(Number));
  const valid=xs=>xs.reduce((a,b)=>a+b,0)===total&&xs.every((x,j)=>Math.abs(x/strata[j]-fraction)<1e-12);
  assert.ok(valid(options[0]));assert.equal(options.filter(valid).length,1);
 }
});
test('job interval, strict minimum and sample-mean tail independently match NormalDist',()=>{
 const [a,b,c]=at(1054).parts;close(a.verification.numericalEvidence.error,.651027113275368);assert.equal(b.verification.numericalEvidence.minimum,28);close(b.verification.numericalEvidence.bound,27.584115480687206);
 const z=1.7506860712521692;assert.ok(z*3/Math.sqrt(28)<1);assert.ok(z*3/Math.sqrt(27)>=1);
 close(c.verification.numericalEvidence.se,.5);close(c.verification.numericalEvidence.probability,.21769543758573318);
 const valid=s=>{const m=s.match(/media ([\d,]+); desviación ([\d,]+).*≈ ([\d,]+)$/).slice(1).map(num);return Math.abs(m[0]-7.61)<1e-7&&Math.abs(m[1]-.5)<1e-7&&Math.abs(m[2]-.21769543758573318)<.000006;};assert.ok(valid(c.answer));assert.equal([c.answer,...c.distractors].filter(valid).length,1);
});
test('mortgage inversion and new individual distribution remain distinct',()=>{
 const [a,b,c]=at(1080).parts;close(a.verification.numericalEvidence.center,534.8);close(a.verification.numericalEvidence.estimate,255.990591966289,1e-6);assert.equal(a.verification.numericalEvidence.nearest,256);assert.match(a.answer,/estimado ≈ 256/);
 close(b.verification.numericalEvidence.margin,34.4000089518004);close(c.verification.numericalEvidence.probability,.20151706619416687);assert.equal(c.verification.numericalEvidence.randomVariable,'individual');
 for(const [p,expected]of[[b,34.4000089518004],[c,.20151706619416687]]){const opts=[p.answer,...p.distractors].map(s=>num(s.match(/≈ ([\d,]+)/)[1]));assert.ok(Math.abs(opts[0]-expected)<.000006);assert.equal(opts.filter(x=>Math.abs(x-expected)<.000006).length,1);assert.equal(new Set(opts).size,4);}
 const opts=[a.answer,...a.distractors].map(s=>s.match(/≈ ([\d,]+).*≈ (\d+)$/).slice(1).map(num));assert.equal(opts.filter(x=>x[0]===534.8&&x[1]===256).length,1);
});
test('antipyretic interval interpretation and later individual probability both answered',()=>{
 const [a,b]=at(1149).parts;close(a.verification.numericalEvidence.sum,270);close(a.verification.numericalEvidence.error,3.678278955929777);assert.equal(a.verification.numericalEvidence.interpretation.upperBelowThreshold,true);
 const valid=s=>{const [l,u]=s.match(/\[([\d,]+); ([\d,]+)\]/).slice(1).map(num);return Math.abs(l-23.321721044070223)<.000006&&Math.abs(u-30.678278955929777)<.000006&&s.includes('no es compatible');};assert.ok(valid(a.answer));assert.equal([a.answer,...a.distractors].filter(valid).length,1);
 close(b.verification.numericalEvidence.probability,.925066300465673);assert.equal(b.verification.numericalEvidence.randomVariable,'individual');assert.equal(b.verification.numericalEvidence.se,5);
 const probs=[b.answer,...b.distractors].map(s=>num(s.match(/≈ ([\d,]+)$/)[1]));assert.equal(probs.filter(x=>Math.abs(x-.925066300465673)<.000006).length,1);assert.equal(new Set(probs).size,4);
});
test('all numeric interval and minimum-size choices are independently exclusive',()=>{
 const a=at(1054).parts[0],bounds=[8.1-.651027113275368,8.1+.651027113275368],options=[a.answer,...a.distractors].map(s=>s.match(/\[([\d,]+); ([\d,]+)\]/).slice(1).map(num));assert.equal(options.filter(x=>x.every((v,i)=>Math.abs(v-bounds[i])<.000006)).length,1);
 const b=at(1054).parts[1],ns=[b.answer,...b.distractors].map(s=>Number(s.split('=')[1]));assert.equal(ns.filter(n=>n===28).length,1);assert.equal(new Set(ns).size,4);
});
test('official bytes and all inspected PDF pages remain unchanged',()=>{
 const sha=x=>crypto.createHash('sha256').update(x).digest('hex');for(const r of rows){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),sourceImages[i]);}
});
test('repeated/reversed generation and strict source anchors',()=>{
 const norm=rs=>rs.map(r=>[r.exerciseId,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(norm(rows),norm(buildRecoveredBatch().batch.records));assert.deepEqual(norm(rows),norm(buildRecoveredBatch('batch-0256',[...cases].reverse()).batch.records));assert.throws(()=>buildRecoveredBatch('not-consumed',[{...cases[0],literals:['No source evidence']}]))
});

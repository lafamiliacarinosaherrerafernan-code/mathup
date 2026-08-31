import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,sourceImages,buildMixedBatch,inverseValues} from '../scripts/resolve-andalucia-inference-mixed-final.mjs';
const rows=buildMixedBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i),close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`),num=s=>Number(s.replace(',','.'));
test('five official exercises preserve eleven subparts and 33 distractors',()=>{
 assert.equal(rows.length,5);assert.equal(rows.reduce((s,r)=>s+r.parts.length,0),11);
 for(const r of rows){assert.equal(r.parts.length,r.correctionEvidence.parameters.index===1018?3:2);for(const p of r.parts){assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.doesNotMatch(p.prompt,/\([^)]*puntos?\)/);assert.equal(p.answer,p.finalAnswer);}}
 assert.doesNotMatch(at(1018).parts[1].prompt,/c\)/);
});
test('proportion interval and strict n minimum verified with independent NormalDist values',()=>{
 const a=at(1018).parts[0],b=at(1018).parts[1],v=a.verification.numericalEvidence;
 close(v.margin,.017402890950170453);assert.equal(b.verification.numericalEvidence.minimum,9283);
 const tuples=[a.answer,...a.distractors].map(s=>s.match(/\[([\d,]+); ([\d,]+)\]/).slice(1).map(num));
 const valid=t=>Math.abs(t[0]-(.73-.017402890950170453))<.000051&&Math.abs(t[1]-(.73+.017402890950170453))<.000051;
 assert.equal(tuples.filter(valid).length,1);assert.ok(valid(tuples[0]));
 const ns=[b.answer,...b.distractors].map(s=>Number(s.split('=')[1]));assert.equal(ns.filter(n=>n===9283).length,1);
 close(2.17009037758456*Math.sqrt(.73*.27/9283),b.verification.numericalEvidence.marginAtMinimum);
 assert.ok(2.17009037758456*Math.sqrt(.73*.27/9282)>=.01);assert.ok(2.17009037758456*Math.sqrt(.73*.27/9283)<.01);
});
test('inverse rounded intervals explicitly do not assert a unique integer; reconstruction is compatible',()=>{
 const refs=[[1104,25.45,143.99470798103755,144],[1161,18500,225.44078206981294,225]];
 for(const [i,center,n,nearest]of refs){const c=cases.find(c=>c.index===i),v=inverseValues(c);close(v.center,center);close(v.estimate,n,1e-6);assert.equal(v.nearest,nearest);assert.ok(v.compatible.includes(nearest));assert.ok(v.compatible.length>1);
  const p=at(i).parts[0];assert.match(p.answer,/n estimado ≈/);assert.match(JSON.stringify(p.solutionSteps),/no una deducción de un entero único/);
  for(const k of v.compatible){const e=v.z*c.sigma/Math.sqrt(k);assert.ok(Math.abs(e-v.error)<=v.roundingUnit/2+1e-9);}
  const tuples=[p.answer,...p.distractors].map(s=>s.match(/≈ ([\d,]+).*≈ (\d+)$/).slice(1).map(num));const valid=t=>Math.abs(t[0]-center)<1e-5&&t[1]===nearest;assert.ok(valid(tuples[0]));assert.equal(tuples.filter(valid).length,1);
 }
});
test('changed sample margins and pipe variance/full width have independent numerical values',()=>{
 close(at(1104).parts[1].verification.numericalEvidence.margin,1.8600774665010515);
 close(at(1161).parts[1].verification.numericalEvidence.margin,31.801075346132254);
 const r=at(1135),a=r.parts[0].verification.numericalEvidence,b=r.parts[1].verification.numericalEvidence;close(a.error,.14539674212755255);close(b.bound,1.3529736077635848);assert.equal(b.minimum,2);assert.ok(b.amplitudeAtMinimum<2);assert.ok(b.amplitudeAtPrevious>=2);
 for(const i of[1104,1161]){const p=at(i).parts[1],expected=p.verification.numericalEvidence.margin,opts=[p.answer,...p.distractors].map(s=>num(s.match(/≈ ([\d,]+)/)[1]));assert.equal(opts.filter(x=>Math.abs(x-expected)<.000006).length,1);assert.equal(new Set(opts).size,4);}
});
test('tables and doors stay separate and the door answer includes both interval and margin',()=>{
 const r=at(1227),a=r.parts[0],b=r.parts[1];close(a.verification.numericalEvidence.probability,.9772498680518209);close(b.verification.numericalEvidence.error,8.68036151033824);
 const opts=[a.answer,...a.distractors].map(s=>num(s.match(/≈ ([\d,]+)/)[1]));assert.equal(opts.filter(x=>Math.abs(x-.9772498680518209)<.000006).length,1);
 const tuples=[b.answer,...b.distractors].map(s=>s.match(/\[(-?[\d,]+); (-?[\d,]+)\].*E ≈ ([\d,]+)/).slice(1).map(num));const valid=t=>Math.abs(t[0]-(40-8.68036151033824))<.000006&&Math.abs(t[1]-(40+8.68036151033824))<.000006&&Math.abs(t[2]-8.68036151033824)<.000006;
 assert.ok(valid(tuples[0]));assert.equal(tuples.filter(valid).length,1);assert.equal(new Set(tuples.map(JSON.stringify)).size,4);
 assert.match(JSON.stringify(b.solutionSteps),/población distinta/);assert.match(b.answer,/E ≈ 8,68036/);
});
test('original official PDF and inspected images remain hash-bound',()=>{
 const sha=x=>crypto.createHash('sha256').update(x).digest('hex');for(const r of rows){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),sourceImages[i]);}
});
test('repeat and reverse order produce identical solutions; inconsistent counts rejected',()=>{
 const norm=rs=>rs.map(r=>[r.exerciseId,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(norm(rows),norm(buildMixedBatch().batch.records));assert.deepEqual(norm(rows),norm(buildMixedBatch('batch-0255',[...cases].reverse()).batch.records));assert.throws(()=>buildMixedBatch('not-consumed',[{...cases[0],successes:1824}]));assert.throws(()=>buildMixedBatch('not-consumed',[{...cases[0],literals:['1824 realizan']}]));
});

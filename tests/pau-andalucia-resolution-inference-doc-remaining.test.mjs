import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildDocBatch} from '../scripts/resolve-andalucia-inference-doc-remaining.mjs';
const rows=buildDocBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i),close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t),num=s=>Number(s.replace(',','.'));
const refs={18:[-.42426406871192696,.33568662027043683,9.903349095244542,false],21:[5.298129428260175,5.849751405495596e-8,.07069728758956367,true],29:[-1.4418745018211823,.07466889028536067,.23718451051219902,false],34:[.20825497803671772,.4175149416086983,.26192916847343334,false],46:[-2.809757434745083,.002478942540635354,.22689180146302845,true]};
test('six DOC exercises preserve ten tasks and thirty independently distinct distractors',()=>{
 assert.equal(rows.length,6);assert.equal(rows.reduce((s,r)=>s+r.parts.length,0),10);
 for(const r of rows)for(const p of r.parts){assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.answer,p.finalAnswer);assert.ok(p.solutionSteps.length>=6);assert.doesNotMatch(JSON.stringify(p.solutionSteps),/undefined|NaN/);}
 for(const i of[18,46]){assert.equal(at(i).deliveryScope,'WHOLE_OFFICIAL_EXERCISE');assert.equal(at(i).sourceSubparts.length,0);assert.equal(at(i).parts[0].prompt,at(i).sourceLiteral);}
 assert.doesNotMatch(at(34).parts[1].prompt,/OPCIÓN/);
});
test('five tests independently match NormalDist, null variance and correct one-sided direction',()=>{
 for(const [s,[z,p,bound,reject]]of Object.entries(refs)){
  const i=Number(s),r=at(i),c=cases.find(c=>c.index===i),v=r.parts.at(-1).verification.numericalEvidence;
  close(v.z,z);close(v.pValue,p);close(c.tail==='left'?v.lower:v.upper,bound);assert.equal(v.rejected,reject);assert.equal(p<c.levels[0],reject);
  const correct=[r.parts.at(-1).answer,...r.parts.at(-1).distractors].filter(text=>{const numbers=text.match(/Z [<>] (-?[\d,]+)\. Z ≈ (-?[\d,]+)/).slice(1).map(num),nonReject=text.includes('no se rechaza');return Math.abs(numbers[0]-(c.tail==='left'?-v.cut:v.cut))<.000006&&Math.abs(numbers[1]-z)<.000006&&nonReject===!reject;});assert.deepEqual(correct,[r.parts.at(-1).answer]);
 }
});
test('proportion regions explicitly contain hypotheses, and the correct proportion scale',()=>{
 for(const i of[21,29,34]){
  const p=at(i).parts[0],c=cases.find(c=>c.index===i),v=p.verification.numericalEvidence,bound=refs[i][2],cut=c.tail==='left'?-1.6448536269514715:1.6448536269514715;
  assert.match(p.answer,/H₀: p/);assert.match(p.answer,/H₁: p/);assert.match(p.answer,/p̂/);assert.doesNotMatch(p.answer,/x̄|undefined/);
  const opt=[p.answer,...p.distractors].map(s=>s.match(/Z [<>≤≥] (-?[\d,]+); p̂ [<>≤≥] (-?[\d,]+)/).slice(1).map(num));assert.equal(opt.filter(x=>Math.abs(x[0]-cut)<.000006&&Math.abs(x[1]-bound)<.000006).length,1);
  assert.equal(v.sign,i===21?'>':i===29?'<':'≤');
  assert.match(JSON.stringify(p.solutionSteps),/var|frecuencias esperadas|frontera/);
 }
});
test('strict pumpkin minimum and fixed-confidence monotonicity',()=>{
 const [a,b]=at(43).parts,v=a.verification.numericalEvidence;close(v.bound,27.317040502713766);assert.equal(v.minimum,28);assert.ok(v.marginAtMinimum<450);assert.ok(v.marginAtPrevious>=450);
 assert.equal([a.answer,...a.distractors].filter(s=>Number(s.split('=')[1])===28).length,1);assert.equal(b.verification.numericalEvidence.relativeMargin,.5);
});
test('native official source bytes, CP provenance, immutable queue and deterministic reverse run',()=>{
 const sha=x=>crypto.createHash('sha256').update(x).digest('hex');for(const r of rows){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.ok(r.officialSource.range.endCp>r.officialSource.range.startCp);assert.ok(r.officialSource.path.endsWith('.doc'));}
 assert.equal(sha(fs.readFileSync('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl')),'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
 const norm=rs=>rs.map(r=>[r.exerciseId,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(norm(rows),norm(buildDocBatch().batch.records));assert.deepEqual(norm(rows),norm(buildDocBatch('batch-0257',[...cases].reverse()).batch.records));assert.throws(()=>buildDocBatch('not-consumed',[{...cases[0],literals:['invented parameter']}]))
});

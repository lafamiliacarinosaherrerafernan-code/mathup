import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildMultipartBatch,officialParts} from '../scripts/resolve-andalucia-inference-multipart.mjs';
const records=buildMultipartBatch().batch.records;
const row=i=>records.find(r=>r.correctionEvidence.parameters.index===i);
const close=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const numbers=s=>[...s.matchAll(/-?\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace(',','.')));
// Independent midpoint integration, not the generator's Simpson/bisection code.
function cdf(x){let area=0;const n=50000,h=Math.abs(x)/n;for(let i=0;i<n;i++)area+=Math.exp(-(((i+.5)*h)**2)/2);return .5+Math.sign(x)*area*h/Math.sqrt(2*Math.PI);}
test('five official literals/hashes, exact 12 subparts, no score text or lost prompt',()=>{
 assert.equal(records.length,5);assert.equal(records.reduce((n,r)=>n+r.parts.length,0),12);
 for(const r of records){
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);
  const prompts=officialParts(r.sourceLiteral);
  assert.deepEqual(r.parts.map(p=>({id:p.partId,prompt:p.prompt})),prompts);
  assert.equal(r.sourceSubparts.length,r.parts.length);
  assert.ok(r.sourceSubparts.every(p=>p.scoreEvidence.literal));
  for(const p of r.parts){assert.doesNotMatch(p.prompt,/\(\s*\d+(?:[,.]\d+)?\s*puntos?\s*\)|OPCIÓN B/);assert.equal(p.answer,p.finalAnswer);assert.equal(p.solutionSteps.length>=4,true);assert.equal(new Set([p.answer,...p.distractors]).size,4);}
 }
});
test('puppy weights: sum 8.3, correct CI, error and width law; false distractors',()=>{
 const r=row(514),[a,b,c]=r.parts,mean=8.3/8,z=1.959963984540054,err=z*.25/Math.sqrt(8);
 close(a.verification.numericalEvidence.sum,8.3);close(a.verification.numericalEvidence.mean,mean);
 close(numbers(a.answer)[0],mean-err,6e-6);close(numbers(a.answer)[1],mean+err,6e-6);close(numbers(b.answer)[0],err,6e-6);
 for(const d of a.distractors){const [l,h]=numbers(d);assert.ok(Math.abs((h-l)/2-err)>1e-3);}
 for(const d of b.distractors)assert.ok(Math.abs(numbers(d)[0]-err)>1e-3);
 assert.match(c.answer,/disminuye al aumentar n/);close((2*z*.25/Math.sqrt(32))/(2*z*.25/Math.sqrt(8)),.5);
 assert.equal(c.verification.numericalEvidence.relativeAmplitude,.5);
});
test('stratified 60/75: all four candidates total 135 but only one proportional',()=>{
 const p=row(551).parts[0],options=[p.answer,...p.distractors].map(numbers);
 assert.deepEqual(options[0],[60,75]);
 for(const [m,w]of options)assert.equal(m+w,135);
 assert.equal(options.filter(([m,w])=>m*2500===w*2000).length,1);
});
test('unknown population value: exact linear equation plus exhaustive enumeration with/without replacement',()=>{
 const p=row(551).parts[1];close(numbers(p.answer)[0],16.2);
 const population=[6,8,11,16.2],without=[],withReplacement=[];
 for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++){
  withReplacement.push((population[i]+population[j]+population[k])/3);
  if(i<j&&j<k)without.push((population[i]+population[j]+population[k])/3);
 }
 assert.equal(without.length,4);assert.equal(withReplacement.length,64);
 for(const list of[without,withReplacement])close(list.reduce((a,b)=>a+b,0)/list.length,10.3);
 for(const d of p.distractors)assert.ok(Math.abs((25+numbers(d)[0])/4-10.3)>.01);
});
test('bread: inverse interval needs no inferred confidence; 96% size precisely minimal',()=>{
 const [a,b]=row(591).parts;assert.deepEqual(numbers(a.answer),[32.3,1.1]);
 for(const d of a.distractors){const [m,e]=numbers(d);assert.ok(Math.abs(m-e-31.2)>.01||Math.abs(m+e-33.4)>.01);}
 const z=2.053748910631823,n=numbers(b.answer)[0];assert.equal(n,47);
 assert.ok(z*5/Math.sqrt(n)<=1.5);assert.ok(z*5/Math.sqrt(n-1)>1.5);
 for(const d of b.distractors){const k=numbers(d)[0];assert.ok(k<n||k>n);assert.ok(k<n?z*5/Math.sqrt(k)>1.5:z*5/Math.sqrt(k-1)<=1.5);}
});
test('price: normal parameter remains μ, all ten observations, 97% CI and strict n=30',()=>{
 const [a,b,c]=row(663).parts;
 assert.match(a.answer,/media μ/);assert.match(a.answer,/frac\{5\}\{√\(10\)\}/);close(a.verification.numericalEvidence.variance,2.5);
 assert.equal(a.distractors.filter(d=>d.includes('media 102')).length,1);
 const z=2.17009037758456,e=z*5/Math.sqrt(10);assert.equal(b.verification.numericalEvidence.sum,1020);
 close(numbers(b.answer)[0],102-e,6e-6);close(numbers(b.answer)[1],102+e,6e-6);
 assert.equal(numbers(c.answer)[0],30);assert.ok(z*5/Math.sqrt(30)<2);assert.ok(z*5/Math.sqrt(29)>=2);
});
test('yeast: 98% width independent of mean; exact 89.84/9 sample and interval',()=>{
 const [a,b]=row(680).parts,z=2.32634787404084,e=z*.1,mean=89.84/9;
 close(numbers(a.answer)[0],2*e,6e-6);close(numbers(b.answer)[0],mean-e,6e-6);close(numbers(b.answer)[1],mean+e,6e-6);
 close(b.verification.numericalEvidence.sum,89.84);
 for(const d of a.distractors)assert.ok(Math.abs(numbers(d)[0]-2*e)>1e-3);
 for(const d of b.distractors){const [l,h]=numbers(d);assert.ok(Math.abs((h-l)/2-e)>1e-3);}
});
test('independent CDF, step result equality, finite numerical evidence and reverse-order invariance',()=>{
 for(const r of records)for(const p of r.parts){
  const ev=p.verification.numericalEvidence;
  if(ev.z&&ev.confidence)close(cdf(ev.z),(1+ev.confidence)/2,2e-9);
  const check=v=>{if(typeof v==='number')assert.ok(Number.isFinite(v));else if(v&&typeof v==='object')Object.values(v).forEach(check);};check(ev);
  assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractorEvidence.length,3);
 }
 const reversed=buildMultipartBatch('batch-0243',[...cases].reverse()).batch.records;
 assert.deepEqual(records,[...reversed].reverse());
 assert.deepEqual(records,buildMultipartBatch().batch.records);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildPdfCheckedBatch} from '../scripts/resolve-andalucia-inference-pdf-checked.mjs';
import {officialParts} from '../scripts/resolve-andalucia-inference-multipart.mjs';
const records=buildPdfCheckedBatch().batch.records;
const row=i=>records.find(r=>r.correctionEvidence.parameters.index===i);
const numbers=s=>[...s.matchAll(/-?\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace(',','.')));
const close=(a,b,tol=6e-6)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const z97=2.170090377584560,z95=1.959963984540054,z92=1.750686071252169;
function independentCDF(x){const n=40000,h=Math.abs(x)/n;let sum=0;for(let i=0;i<n;i++)sum+=Math.exp(-(((i+.5)*h)**2)/2);return .5+Math.sign(x)*h*sum/Math.sqrt(2*Math.PI);}
test('three real PDF sources and seven exact part scopes preserved',()=>{
 assert.equal(records.length,3);assert.equal(records.reduce((n,r)=>n+r.parts.length,0),7);
 for(const r of records){
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);
  assert.deepEqual(r.parts.map(p=>({id:p.partId,prompt:p.prompt})),officialParts(r.sourceLiteral));
  assert.equal(r.parts.length,r.sourceSubparts.length);
  for(const p of r.parts){assert.doesNotMatch(p.prompt,/\(\s*\d+(?:[.,]\d+)?\s*puntos?\s*\)/i);assert.equal(p.answer,p.finalAnswer);assert.ok(p.solutionSteps.length>=5);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);}
 }
});
test('raspberries: variance not SD, unknown mean retained, sum 110, 97% interval',()=>{
 const [a,b]=row(554).parts;
 assert.match(a.answer,/media μ/);assert.match(a.answer,/frac\{3\}\{√\(10\)\}/);
 close(a.verification.numericalEvidence.variance,.9);close(a.verification.numericalEvidence.sd,Math.sqrt(.9));
 assert.equal(a.distractors.filter(d=>d.includes('media 11')).length,1);
 close(b.verification.numericalEvidence.sum,110);close(numbers(b.answer)[0],11-z97*3/Math.sqrt(10));close(numbers(b.answer)[1],11+z97*3/Math.sqrt(10));
});
test('bus: negative observation included, variance 4 means SD 2, 97% interval',()=>{
 const [a,b]=row(793).parts;
 close(a.verification.numericalEvidence.sum,30.9);close(numbers(a.answer)[0],3.09-z97*2/Math.sqrt(10));close(numbers(a.answer)[1],3.09+z97*2/Math.sqrt(10));
 assert.match(b.solutionSteps[0].math,/30.*60.*0,5/);assert.equal(numbers(b.answer)[0],62);
 assert.match(b.answer,/no disminuye/);assert.ok(b.distractors.every(d=>d.split(';')[1]===b.answer.split(';')[1]));
 const n95=Math.floor((z95*2/.5)**2)+1,n97=Math.floor((z97*2/.5)**2)+1;
 assert.equal(n95,62);assert.equal(n97,76);
 assert.equal(b.verification.numericalEvidence.confidenceEffect.minimumAt97,n97);
 assert.equal(Math.floor(((z95+1e-8)*2/.5)**2)+1,n95,'A tiny confidence increase need not raise the integer minimum');
});
test('hospital: observed mean preserved and independent 97% interval',()=>{
 const [a,b]=row(1009).parts;
 close(numbers(a.answer)[0],8.1-z97*.3);close(numbers(a.answer)[1],8.1+z97*.3);
 assert.equal(numbers(b.answer)[0],28);assert.equal(a.verification.numericalEvidence.sum,undefined,'Do not invent 100 observations');
});
test('all size answers are strict minimal integers; every distractor is false for the asked minimum',()=>{
 for(const [index,partIndex,z,sigma,error,expected]of[[554,2,z97,3,1.5,19],[793,1,z95,2,.5,62],[1009,1,z92,3,1,28]]){
  const p=row(index).parts[partIndex],n=numbers(p.answer)[0];assert.equal(n,expected);
  assert.ok(z*sigma/Math.sqrt(n)<error);assert.ok(z*sigma/Math.sqrt(n-1)>=error);
  const options=[p.answer,...p.distractors].map(x=>numbers(x)[0]);assert.equal(new Set(options).size,4);
  for(const d of options.slice(1))assert.ok(d<n?z*sigma/Math.sqrt(d)>=error:z*sigma/Math.sqrt(d-1)<error);
 }
});
test('all interval distractors are numerically distinct, incorrect and have identical units/format',()=>{
 for(const [index,pi,mean,se,z]of[[554,1,11,3/Math.sqrt(10),z97],[793,0,3.09,2/Math.sqrt(10),z97],[1009,0,8.1,.3,z97]]){
  const p=row(index).parts[pi],options=[p.answer,...p.distractors],pairs=options.map(numbers);
  assert.equal(new Set(pairs.map(JSON.stringify)).size,4);
  assert.ok(options.every(x=>/^\[[^;]+;[^\]]+\] (euros|minutos|días)$/.test(x)));
  close(pairs[0][0],mean-z*se);close(pairs[0][1],mean+z*se);
  for(const [l,u]of pairs.slice(1)){close((l+u)/2,mean);assert.ok(Math.abs((u-l)/2-z*se)>.005);}
 }
});
test('independent midpoint quadrature confirms confidence, evidence finite and reproducible under reversed order',()=>{
 for(const r of records)for(const p of r.parts){const ev=p.verification.numericalEvidence;
  if(ev.z&&ev.confidence)close(2*independentCDF(ev.z)-1,ev.confidence,2e-9);
  const finite=v=>{if(typeof v==='number')assert.ok(Number.isFinite(v));else if(v&&typeof v==='object')Object.values(v).forEach(finite);};finite(ev);
 }
 assert.deepEqual(records,buildPdfCheckedBatch().batch.records);
 assert.deepEqual(records,buildPdfCheckedBatch('batch-0245',[...cases].reverse()).batch.records.reverse());
});

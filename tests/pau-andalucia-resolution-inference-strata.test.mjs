import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildStrataBatch} from '../scripts/resolve-andalucia-inference-strata.mjs';
import {officialParts} from '../scripts/resolve-andalucia-inference-multipart.mjs';
const rows=buildStrataBatch().batch.records,row=i=>rows.find(r=>r.correctionEvidence.parameters.index===i);
const nums=s=>[...s.matchAll(/−?\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace('−','-').replace(',','.')));
const close=(a,b,t=6e-6)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
test('three independently source-read official exercises retain six exact part scopes and PDF hashes',()=>{
 assert.equal(rows.length,3);assert.equal(rows.reduce((n,r)=>n+r.parts.length,0),6);
 for(const r of rows){assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);
  assert.deepEqual(r.parts.map(p=>({id:p.partId,prompt:p.prompt})),officialParts(r.sourceLiteral));
  assert.equal(r.parts.length,r.sourceSubparts.length);
  for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=5);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.doesNotMatch(p.prompt,/\([\d.,]+ puntos?\)/);}
 }
});
test('five engineering strata: all options total 40 but only the correct allocation preserves each proportion',()=>{
 const p=row(63).parts[0],sizes=[60,40,30,50,20];
 const options=[p.answer,...p.distractors].map(x=>nums(x).slice(1));
 assert.deepEqual(options[0],[12,8,6,10,4]);
 for(const v of options){assert.equal(v.reduce((a,b)=>a+b,0),40);assert.equal(v.length,5);}
 assert.equal(options.filter(v=>v.every((n,i)=>n/sizes[i]===.2)).length,1);
 assert.ok([p.answer,...p.distractors].every(x=>x.startsWith('Estratificado proporcional; n = 40;')));
});
test('unknown population value checked by all 10 samples without replacement and all 125 with replacement',()=>{
 const p=row(63).parts[1],a=nums(p.answer)[0],pop=[a,10,12,11,18];let sum=0,count=0;
 for(let i=0;i<5;i++)for(let j=i+1;j<5;j++)for(let k=j+1;k<5;k++){sum+=(pop[i]+pop[j]+pop[k])/3;count++;}
 assert.equal(a,15);assert.equal(count,10);close(sum,132);close(sum/count,13.2);
 sum=0;for(const x of pop)for(const y of pop)for(const z of pop)sum+=(x+y+z)/3;
 close(sum/125,13.2);for(const d of p.distractors)assert.notEqual((nums(d)[0]+51)/5,13.2);
 assert.equal(new Set([p.answer,...p.distractors].map(x=>nums(x)[0])).size,4);
});
test('inverse proportional allocation: ten selected from third stratum gives total forty, not ten',()=>{
 const p=row(1001).parts[0],n=nums(p.answer)[0];assert.equal(n,40);assert.equal(n*250/1000,10);
 assert.deepEqual([150,400,250,200].map(x=>n*x/1000),[6,16,10,8]);
 for(const d of p.distractors)assert.notEqual(nums(d)[0]*250/1000,10);
});
test('all sample sizes are the smallest valid integer; three distractors fail the minimum requirement',()=>{
 for(const [index,z,sigma,error,expected]of[[1001,1.959963984540054,6,1,139],[1563,1.6448536269514722,2,.3,121]]){
  const p=row(index).parts[1],n=nums(p.answer)[0],margin=k=>z*sigma/Math.sqrt(k);assert.equal(n,expected);
  assert.ok(margin(n)<=error);assert.ok(margin(n-1)>error);
  assert.equal(new Set([p.answer,...p.distractors].map(x=>nums(x)[0])).size,4);
  for(const d of p.distractors){const k=nums(d)[0];assert.ok(k<n?margin(k)>error:margin(k-1)<=error);}
 }
});
test('waiting times: sum 144, variance 4, mean 9, and independent 97.5 percent normal quantile',()=>{
 const p=row(1563).parts[0],z=2.241402727604947;
 const sample=[8,9.2,10,8.5,12,9,11.3,7,8.5,8.3,7.6,9,9.4,10.5,8.9,6.8];
 close(sample.reduce((a,b)=>a+b,0),144);close(p.verification.numericalEvidence.sum,144);
 const pairs=[p.answer,...p.distractors].map(nums);close(pairs[0][0],9-z*.5);close(pairs[0][1],9+z*.5);
 assert.equal(new Set(pairs.map(JSON.stringify)).size,4);
 for(const [l,u]of pairs.slice(1)){close((l+u)/2,9);assert.ok(Math.abs((u-l)/2-z*.5)>.01);}
 const n=40000,h=z/n;let sum=0;for(let i=0;i<n;i++)sum+=Math.exp(-(((i+.5)*h)**2)/2);
 close(2*h*sum/Math.sqrt(2*Math.PI),.975,2e-9);
 assert.ok([p.answer,...p.distractors].every(x=>/^\[[^;]+;[^\]]+\] minutos$/.test(x)));
});
test('source unchanged, all evidence finite, repeat and reversed order identical',()=>{
 assert.deepEqual(rows,buildStrataBatch().batch.records);
 assert.deepEqual(rows,buildStrataBatch('batch-0246',[...cases].reverse()).batch.records.reverse());
 const finite=v=>{if(typeof v==='number')assert.ok(Number.isFinite(v));else if(v&&typeof v==='object')Object.values(v).forEach(finite);};rows.forEach(r=>r.parts.forEach(p=>finite(p.verification)));
});

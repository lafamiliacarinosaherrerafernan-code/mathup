import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildRecoveredBatch} from '../scripts/resolve-andalucia-inference-numeral-recovery.mjs';
import {sourceProjection,restoreText} from '../scripts/project-andalucia-inference-source-glyphs.mjs';
const rows=buildRecoveredBatch().batch.records;
const nums=s=>[...s.matchAll(/\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace(',','.')));
const close=(a,b,t=6e-5)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
test('both restored datasets are page-bound, checksummed and reversible without canonical edits',()=>{
 assert.equal(rows.length,2);
 for(let i=0;i<rows.length;i++){
  const r=rows[i],c=cases[i],p=sourceProjection({...r,queueIndex:c.index});
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);
  assert.equal(p.evidence.humanApproval,false);assert.equal(restoreText(p.text,p.changes),r.sourceLiteral);
  assert.equal(p.changes.length,c.index===403?5:4);
  assert.ok(p.changes.every(x=>x.rule==='PDF_VISIBLE_NUMERALS_OMITTED_BY_EXTRACTION'));
  assert.equal(r.parts.length,2);assert.equal(r.sourceSubparts.length,2);
  for(const literal of c.recoveredLiterals)assert.ok(p.text.includes(literal));
 }
});
test('La Palma: 325/500, 97 percent interval and compatibility of 64 percent verified independently',()=>{
 const a=rows[0].parts[0],z=2.17009037758456,center=325/500,margin=z*Math.sqrt(.65*.35/500),[l,u]=nums(a.answer);
 close(l,center-margin);close(u,center+margin);assert.ok(l<.64&&.64<u);assert.match(a.answer,/64% compatible/);
 assert.ok(a.solutionSteps.some(s=>s.explanation.includes('no demuestra')));
});
test('road assistance: 90/300, not the complementary proportion, with 97 percent interval',()=>{
 const [l,u]=nums(rows[1].parts[0].answer),e=2.17009037758456*Math.sqrt(.3*.7/300);
 close(l,.3-e);close(u,.3+e);assert.ok(Math.abs((l+u)/2-.7)>.3);
});
test('both sample sizes use the requested second confidence and checked n minus one',()=>{
 for(const [i,z,variance,error,expected]of[[0,1.750686071252169,.65*.35,.02,1744],[1,1.959963984540054,.3*.7,.03,897]]){
  const p=rows[i].parts[1],n=nums(p.answer)[0],margin=k=>z*Math.sqrt(variance/k);assert.equal(n,expected);
  assert.ok(margin(n)<=error);assert.ok(margin(n-1)>error);
  for(const s of p.distractors){const k=nums(s)[0];assert.ok(k<n?margin(k)>error:margin(k-1)<=error);}
  assert.equal(new Set([p.answer,...p.distractors].map(x=>nums(x)[0])).size,4);
 }
});
test('one correct interval only, distinct plausible distractors, no omitted second task',()=>{
 for(const r of rows){const a=r.parts[0],pairs=[a.answer,...a.distractors].map(s=>nums(s).slice(0,2));assert.equal(new Set(pairs.map(JSON.stringify)).size,4);
  for(const [l,u]of pairs.slice(1))assert.ok(Math.abs(l-pairs[0][0])>1e-4||Math.abs(u-pairs[0][1])>1e-4);
  for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.ok(p.solutionSteps.length>=7);}
 }
 for(const s of [rows[0].parts[0].answer,...rows[0].parts[0].distractors]){const [l,u]=nums(s);assert.equal(s.endsWith('64% compatible'),l<=.64&&.64<=u);}
});
test('repeat and reverse order reproduce exactly; damaged documentary anchors reject instead of guessing',()=>{
 assert.deepEqual(rows,buildRecoveredBatch().batch.records);
 assert.deepEqual(rows,buildRecoveredBatch('batch-0247',[...cases].reverse()).batch.records.reverse());
 const wrong={...cases[0],recoveredLiterals:['muestra de 501 casas']};assert.throws(()=>buildRecoveredBatch('never-consumed',[wrong]));
});

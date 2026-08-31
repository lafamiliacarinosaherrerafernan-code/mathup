import test from 'node:test';
import assert from 'node:assert/strict';
import {cases} from '../scripts/resolve-andalucia-inference-followup.mjs';
import {buildBatch} from '../scripts/resolve-andalucia-inference-2012.mjs';
const batch=buildBatch(cases,'batch-0239').batch;
const quantiles=new Map([[.90,1.6448536269514722],[.92,1.7506860712521692],[.935,1.845258116],[.95,1.959963984540054],[.97,2.17009037758456]]);
for(const c of cases)test(`q${c.index}: datos oficiales, intervalo, tamaño mínimo y cuatro opciones`,()=>{
 const r=batch.records.find(x=>x.correctionEvidence.parameters.index===c.index);
 const variance=c.kind==='mean'?c.sigma*c.sigma:c.successes/c.n*(1-c.successes/c.n);
 const z=quantiles.get(c.confidence),margin=z*Math.sqrt(variance/c.n);
 const values=r.parts[0].answer.match(/\[([^;]+); ([^\]]+)\]/).slice(1).map(x=>Number(x.replace(',','.')));
 [c.center-margin,c.center+margin].forEach((x,i)=>assert.ok(Math.abs(x-values[i])<.00006));
 const n=Number(r.parts[1].answer.split('=')[1]),zn=quantiles.get(c.nextConfidence);
 assert.ok(zn*Math.sqrt(variance/n)<=c.error);
 assert.ok(zn*Math.sqrt(variance/(n-1))>c.error);
 if(c.amplitude)assert.equal(c.amplitude,2*c.error);
 for(const p of r.parts){assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.answer,p.finalAnswer);assert.ok(p.solutionSteps.length>=7);assert.ok(!/\(\d+(?:[.,]\d+)? puntos?\)/.test(p.prompt));}
 assert.equal(r.primaryTopic,'Muestreo e inferencia estadística');assert.equal(r.examSlot,4);
});
test('orden invertido conserva exactamente las resoluciones por identidad',()=>{
 const inverted=buildBatch([...cases].reverse(),'batch-0239').batch;
 const sort=rs=>rs.slice().sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));
 assert.deepEqual(sort(inverted.records),sort(batch.records));
});

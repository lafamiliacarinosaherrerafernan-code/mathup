import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {evidenceCases,compute,buildBatch} from '../scripts/resolve-andalucia-inference-2012.mjs';
const {batch}=buildBatch();
// Independent midpoint integration (the producer uses Simpson + bisection).
function centralMass(z){const n=50000,h=2*z/n;let total=0;for(let i=0;i<n;i++){const x=-z+(i+.5)*h;total+=Math.exp(-x*x/2);}return total*h/Math.sqrt(2*Math.PI);}
const near=(a,b,tol=6e-5)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const bounds=s=>s.match(/\[([^;]+); ([^\]]+)\]/).slice(1).map(x=>Number(x.replace(',','.')));
const mean=z=>z.reduce((s,x)=>s+x,0)/z.length;
test('cinco fuentes oficiales conservan los datos reales (120; sigma 1.8 y n36)',()=>{
 assert.equal(batch.records.length,5);assert.equal(batch.records[2].correctionEvidence.parameters.n,120);
 assert.equal(batch.records[3].correctionEvidence.parameters.sigma,1.8);assert.equal(batch.records[3].correctionEvidence.parameters.n,36);
 assert.equal(mean(evidenceCases[1].sample),11);
 for(const r of batch.records){assert.ok(r.officialSource.documentHash);assert.ok(r.officialSource.range);assert.equal(r.parts.length,2);assert.ok(r.parts.every(p=>!p.prompt.includes('punto)')));}
});
for(const c of evidenceCases)test(`q${c.index}: respuesta bilateral, confianza y cuatro opciones comprobadas independientemente`,()=>{
 const r=batch.records.find(x=>x.correctionEvidence.parameters.index===c.index),v=compute(c),p=r.parts[0];
 const [lo,hi]=bounds(p.answer);near(mean([lo,hi]),c.center);
 const variance=c.kind==='proportion'?(105/120)*(15/120):c.sigma**2;
 const standardized=(hi-lo)/2*Math.sqrt(c.n/variance);near(centralMass(standardized),c.confidence,.00008);
 const intervals=[p.answer,...p.distractors].map(bounds);
 assert.equal(new Set(intervals.map(JSON.stringify)).size,4);
 const expected=[c.center-v.margin,c.center+v.margin];near(lo,expected[0]);near(hi,expected[1]);
 const errors=c.kind==='proportion'?[
  [c.center-1.959963984540054*Math.sqrt(variance/c.n),c.center+1.959963984540054*Math.sqrt(variance/c.n)],
  [1-c.center-v.margin,1-c.center+v.margin],
  [c.center-v.z*Math.sqrt(variance/105),c.center+v.z*Math.sqrt(variance/105)],
 ]:[1.959963984540054*Math.sqrt(variance/c.n),v.z*Math.sqrt(variance),v.z*Math.sqrt(variance)/c.n].map(e=>[c.center-e,c.center+e]);
 errors.forEach((pair,i)=>pair.forEach((x,j)=>near(intervals[i+1][j],x)));
 for(const pair of intervals.slice(1))assert.ok(pair.some((x,j)=>Math.abs(x-expected[j])>.0001));
 assert.ok(p.solutionSteps.length>=8);assert.ok(p.solutionSteps.some(s=>s.explanation.includes('No se asigna')));
});
test('tamaños mínimos 97,25,291,55 y tres errores plausibles por apartado',()=>{
 const expected=[97,25,291,55];
 evidenceCases.filter(c=>!c.errorOnly).forEach((c,i)=>{
  const v=compute(c),p=batch.records[i].parts[1],n=Number(p.answer.split('=')[1]);assert.equal(n,expected[i]);
  // Independently use published normal quantiles, not the producer inversion.
  const z={'.95':1.959963984540054,'.9':1.6448536269514722,'.99':2.5758293035489004,'.96':2.053748910631823}[String(c.nextConfidence).replace(/^0/,'')];
  const variance=c.kind==='proportion'?7/64:c.sigma*c.sigma;
  const e=k=>z*Math.sqrt(variance/k);assert.ok(e(n)<=c.error);assert.ok(e(n-1)>c.error);
  const wrong=[n-1,Math.ceil(1.2815515655446004**2*variance/c.error**2),Math.ceil(z*z*variance/(c.error/2)**2)];
  assert.deepEqual(p.distractors.map(x=>Number(x.split('=')[1])),wrong);
  assert.ok(p.solutionSteps.length>=7);assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([n,...wrong]).size,4);
 });
});
test('margen velocidad: no confundir semiamplitud con amplitud',()=>{
 const r=batch.records[4],v=compute(evidenceCases[4]);near(Number(r.parts[1].answer.match(/≈ ([\d,]+)/)[1].replace(',','.')),v.margin);
 const wrong=r.parts[1].distractors.map(s=>Number(s.match(/≈ ([\d,]+)/)[1].replace(',','.')));
 [2*v.margin,2,1.959963984540054*2].forEach((x,i)=>near(wrong[i],x));
});
test('construcción reproducible, sin tocar fuentes ni habilitar sin render',()=>{
 const again=buildBatch().batch;assert.deepEqual(batch,again);
 for(const r of batch.records){assert.equal(r.qualityGates.publication,'NOT_ENABLED');assert.equal(r.parts.length,2);}
});

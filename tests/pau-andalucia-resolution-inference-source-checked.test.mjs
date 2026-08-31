import test from 'node:test';
import assert from 'node:assert/strict';
import {cases} from '../scripts/resolve-andalucia-inference-source-checked.mjs';
import {buildBatch} from '../scripts/resolve-andalucia-inference-2012.mjs';
const z={'.8':1.2815515655446004,'.9':1.6448536269514722,'.92':1.7506860712521692,'.94':1.8807936081512509,'.95':1.959963984540054,'.97':2.1700903775845601,'.98':2.3263478740408408};
const critical=c=>z[String(c).replace(/^0/,'')];
const intervals=s=>s.match(/\[([^;]+); ([^\]]+)\]/).slice(1).map(x=>Number(x.replace(',','.')));
const near=(a,b)=>assert.ok(Math.abs(a-b)<.000051,`${a} != ${b}`);
const batch=buildBatch(cases,'test-source-checked').batch;
const minimums=[121,110,275,435,2237,1226,19,369];
for(const [i,c]of cases.entries())test(`q${c.index}: cálculo independiente desde datos oficiales y errores de distractores`,()=>{
 const r=batch.records[i],p=r.parts[0];
 const center=c.sample?c.sample.reduce((s,x)=>s+x,0)/c.sample.length:c.kind==='proportion'?c.successes/c.n:c.center;
 near(center,c.center);
 const variance=c.kind==='proportion'?center*(1-center):c.sigma**2;
 const se=Math.sqrt(variance/c.n),margin=critical(c.confidence)*se;
 const expected=[center-margin,center+margin];
 intervals(p.answer).forEach((x,j)=>near(x,expected[j]));
 const other=critical(c.confidence===.95?.9:.95);
 const wrong=c.kind==='proportion'?[
  [center-other*se,center+other*se],
  [1-center-margin,1-center+margin],
  [center-critical(c.confidence)*Math.sqrt(variance/c.successes),center+critical(c.confidence)*Math.sqrt(variance/c.successes)],
 ]:[other*se,critical(c.confidence)*Math.sqrt(variance),critical(c.confidence)*Math.sqrt(variance)/c.n].map(e=>[center-e,center+e]);
 p.distractors.forEach((s,j)=>{const pair=intervals(s);pair.forEach((x,k)=>near(x,wrong[j][k]));assert.ok(pair.some((x,k)=>Math.abs(x-expected[k])>.0001));});
 assert.equal(new Set([p.answer,...p.distractors]).size,4);
 if(c.includeError)for(const s of[p.answer,...p.distractors])assert.match(s,/; E ≈ /);
 const n=minimums[i],zNext=critical(c.nextConfidence),bound=zNext*zNext*variance/c.error**2;
 assert.equal(Number(r.parts[1].answer.split('=')[1]),n);
 assert.equal(c.strict?Math.floor(bound)+1:Math.ceil(bound),n);
 const errorAt=k=>zNext*Math.sqrt(variance/k);
 assert.ok(errorAt(n)<=c.error);assert.ok(errorAt(n-1)>c.error);
 const bad=[n-1,Math.ceil(critical(.8)**2*variance/c.error**2),Math.ceil(4*bound)];
 assert.deepEqual(r.parts[1].distractors.map(s=>Number(s.split('=')[1])),bad);
 assert.ok(r.parts.every(p=>p.solutionSteps.length>=7));
});
test('probabilidad conocida procede del enunciado y se distingue del estimador',()=>{
 const record=batch.records.find(r=>r.correctionEvidence.parameters.index===419);
 assert.match(record.parts[1].solutionSteps[0].explanation,/proporción poblacional/);
 assert.ok(record.sourceLiteral.includes('70 %'));
});
test('invariancia de orden, fuentes y puntuaciones conservadas sin publicación prematura',()=>{
 const reverse=buildBatch([...cases].reverse(),'test-source-checked').batch.records.reverse();
 assert.deepEqual(batch.records,reverse);
 for(const r of batch.records){assert.ok(r.officialSource.documentHash);assert.equal(r.qualityGates.publication,'NOT_ENABLED');assert.equal(r.parts.length,2);assert.ok(r.parts.every(p=>!/[0-9] puntos?\)/.test(p.prompt)));}
});

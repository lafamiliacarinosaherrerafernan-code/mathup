import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildSamplingBatch} from '../scripts/resolve-andalucia-inference-sampling.mjs';
const batch=buildSamplingBatch('test-sampling').batch;
const readNumber=s=>Number(s.replace(',','.'));
const interval=s=>s.match(/\[([^;]+); ([^\]]+)\]/).slice(1).map(readNumber);
const near=(a,b,t=.000051)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
// Independent midpoint quadrature/inversion, not the constructor's Simpson integration.
function cdf(z){let sum=0;const n=40000,h=z/n;for(let i=0;i<n;i++)sum+=Math.exp(-(((i+.5)*h)**2)/2);return .5+h*sum/Math.sqrt(2*Math.PI);}
function quantile(c){let lo=0,hi=4;for(let i=0;i<38;i++){const mid=(lo+hi)/2;if(cdf(mid)<(1+c)/2)lo=mid;else hi=mid;}return (lo+hi)/2;}
const levels=[...new Set([.8,.9,.95,...cases.flatMap(c=>[c.confidence,c.nextConfidence])])];
const z=new Map(levels.map(c=>[c,quantile(c)]));
const minimums={249:5607,668:1508,854:1080,933:107,938:10551,953:68,1037:1610,1047:3934,1077:49};
for(const [i,c]of cases.entries())test(`q${c.index}: resolución independiente y no equivalencia de opciones`,()=>{
 const r=batch.records[i],p=r.parts[0];
 const center=c.sample?c.sample.reduce((s,x)=>s+x,0)/c.sample.length:c.kind==='proportion'?c.successes/c.n:c.center;
 assert.equal(center,c.center);
 const variance=c.kind==='proportion'?center*(1-center):c.sigma**2,se=Math.sqrt(variance/c.n),margin=z.get(c.confidence)*se;
 interval(p.answer).forEach((x,j)=>near(x,center+(j?1:-1)*margin));
 const other=z.get(c.confidence===.95?.9:.95);
 const wrong=c.kind==='mean'?[other*se,z.get(c.confidence)*c.sigma,z.get(c.confidence)*c.sigma/c.n].map(e=>[center-e,center+e]):[
  [center-other*se,center+other*se],[1-center-margin,1-center+margin],[center-z.get(c.confidence)*Math.sqrt(variance/c.successes),center+z.get(c.confidence)*Math.sqrt(variance/c.successes)],
 ];
 p.distractors.forEach((s,j)=>interval(s).forEach((x,k)=>near(x,wrong[j][k])));
 assert.equal(new Set([p.answer,...p.distractors].map(s=>JSON.stringify(interval(s)))).size,4);
 if(c.includeError)for(const s of[p.answer,...p.distractors]){const [lo,hi]=interval(s);near(readNumber(s.match(/E ≈ ([\d,]+)/)[1]),(hi-lo)/2,.000101);}
 if(c.task==='sample-size-monotonicity')return;
 const planning=c.planningProportion??center,pVariance=c.kind==='proportion'?planning*(1-planning):variance;
 const bound=z.get(c.nextConfidence)**2*pVariance/c.error**2,n=minimums[c.index];
 assert.equal(c.strict?Math.floor(bound)+1:Math.ceil(bound),n);assert.equal(r.parts[1].answer,`n = ${n}`);
 const error=k=>z.get(c.nextConfidence)*Math.sqrt(pVariance/k);
 assert.ok(error(n)<=c.error);assert.ok(error(n-1)>c.error);
 assert.deepEqual(r.parts[1].distractors.map(s=>Number(s.split('=')[1])),[n-1,Math.ceil(z.get(.8)**2*pVariance/c.error**2),Math.ceil(bound*4)]);
});
test('q249: conserva 0,355 en a) y cambia a 0,37 únicamente en b)',()=>{
 const r=batch.records.find(x=>x.correctionEvidence.parameters.index===249);
 assert.match(r.parts[1].solutionSteps[0].explanation,/0,355 del apartado a/);
 assert.equal(r.parts[1].verification.numericalEvidence.planningProportion,.37);
 assert.equal(r.parts[1].verification.numericalEvidence.previousProportion,.355);
});
test('q374: comprueba ambos sentidos de amplitud contra tamaño, sin aprobación por parecido',()=>{
 const r=batch.records.find(x=>x.correctionEvidence.parameters.index===374),b=r.parts[1];
 assert.equal(b.answer,'Al aumentar n disminuye la amplitud; al disminuir n aumenta la amplitud.');
 assert.deepEqual(b.verification.numericalEvidence.relativeAmplitudes,[2,1,.5]);
 const k=2*z.get(.985)*Math.sqrt(.6*.4),width=n=>k/Math.sqrt(n);
 near(width(100),2*width(400));near(width(1600),width(400)/2);
 assert.equal(new Set([b.answer,...b.distractors]).size,4);
});
test('q668: compatibilidad no equivale a afirmar que el parámetro es 70%',()=>{
 const a=batch.records.find(x=>x.correctionEvidence.parameters.index===668).parts[0];
 assert.match(a.answer,/70% compatible$/);
 for(const s of[a.answer,...a.distractors]){const [lo,hi]=interval(s);assert.ok(s.endsWith(lo<=.7&&.7<=hi?'70% compatible':'70% no compatible'));}
 assert.ok(a.solutionSteps.some(x=>/no demuestra que sea la proporción verdadera/.test(x.explanation)));
});
test('trazabilidad, ausencia de modificación de fuentes e invariancia al orden',()=>{
 assert.deepEqual(buildSamplingBatch('test-sampling',cases.slice().reverse()).batch.records.reverse(),batch.records);
 for(const r of batch.records){
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);
  assert.equal(r.parts.length,2);assert.equal(r.qualityGates.publication,'NOT_ENABLED');
  r.parts.forEach((p,i)=>{assert.equal(p.prompt,r.sourceSubparts[i].officialPrompt);assert.ok(p.solutionSteps.length>=7);assert.ok(!/\(\d+(?:[.,]\d+)? puntos?\)/.test(p.prompt));});
 }
});

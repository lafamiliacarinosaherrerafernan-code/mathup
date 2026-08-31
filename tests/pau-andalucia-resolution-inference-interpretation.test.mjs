import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildInterpretationBatch} from '../scripts/resolve-andalucia-inference-interpretation.mjs';
const batch=buildInterpretationBatch('test-interpretation').batch;
const record=index=>batch.records.find(r=>r.correctionEvidence.parameters.index===index);
const num=s=>Number(s.replace(',','.'));
const interval=s=>s.match(/\[([^;]+); ([^\]]+)\]/).slice(1).map(num);
const near=(a,b,tol=.000051)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
// Independent midpoint integration; the production constructor uses Simpson's rule.
function cdf(z){const n=50000,h=z/n;let sum=0;for(let i=0;i<n;i++){const x=(i+.5)*h;sum+=Math.exp(-x*x/2);}return .5+sum*h/Math.sqrt(2*Math.PI);}
function z(c){let a=0,b=4;for(let i=0;i<38;i++){const m=(a+b)/2;if(cdf(m)<(1+c)/2)a=m;else b=m;}return (a+b)/2;}
const zs=new Map([.8,.9,.92,.925,.93,.95,.96,.98].map(c=>[c,z(c)]));
for(const c of cases)test(`q${c.index}: intervalo y tres errores calculados independientemente`,()=>{
 const p=record(c.index).parts[0],center=c.sample?c.sample.reduce((s,x)=>s+x,0)/c.sample.length:c.center;
 const variance=c.kind==='mean'?c.sigma**2:center*(1-center),se=Math.sqrt(variance/c.n),margin=zs.get(c.confidence)*se;
 interval(p.answer).forEach((x,i)=>near(x,center+(i?1:-1)*margin));
 const other=zs.get(c.confidence===.95?.9:.95);
 const wrong=c.kind==='mean'?[other*se,zs.get(c.confidence)*c.sigma,zs.get(c.confidence)*c.sigma/c.n].map(e=>[center-e,center+e]):[
  [center-other*se,center+other*se],[1-center-margin,1-center+margin],[center-zs.get(c.confidence)*Math.sqrt(variance/c.successes),center+zs.get(c.confidence)*Math.sqrt(variance/c.successes)],
 ];
 p.distractors.forEach((s,j)=>interval(s).forEach((x,i)=>near(x,wrong[j][i])));
 assert.equal(new Set([p.answer,...p.distractors].map(s=>JSON.stringify(interval(s)))).size,4);
 if(c.includeError)for(const s of[p.answer,...p.distractors]){const [lo,hi]=interval(s);near(num(s.match(/E ≈ ([\d,]+)/)[1]),(hi-lo)/2,.000101);}
});
test('q335: responde si basta la muestra, sin sustituir la pregunta por n mínimo',()=>{
 const b=record(335).parts[1],e=zs.get(.98)*.42/7;
 assert.match(b.answer,/^No;/);near(num(b.answer.match(/≈ ([\d,]+)/)[1]),e);assert.ok(e>.125);
 const wrong=[zs.get(.95)*.42/7,zs.get(.96)*.42/7,zs.get(.98)*.42/49];
 b.distractors.forEach((s,i)=>{assert.match(s,/^Sí;/);near(num(s.match(/≈ ([\d,]+)/)[1]),wrong[i]);assert.ok(wrong[i]<.125);});
 assert.equal(Math.floor((zs.get(.98)*.42/.125)**2)+1,62);
 assert.ok(zs.get(.98)*.42/Math.sqrt(62)<.125);assert.ok(zs.get(.98)*.42/Math.sqrt(61)>.125);
});
test('q465: nueva muestra p=0,25, sin contaminación de p=0,30 del primer apartado',()=>{
 const b=record(465).parts[1],bound=zs.get(.925)**2*.25*.75/.03**2;
 assert.equal(b.answer,'n = 661');assert.equal(Math.floor(bound)+1,661);
 assert.ok(zs.get(.925)*Math.sqrt(.25*.75/661)<.03);assert.ok(zs.get(.925)*Math.sqrt(.25*.75/660)>.03);
 assert.notEqual(Math.floor(zs.get(.925)**2*.3*.7/.03**2)+1,661);
 assert.match(b.solutionSteps[0].explanation,/otra muestra/);
 assert.deepEqual(b.distractors.map(s=>Number(s.split('=')[1])),[660,Math.ceil(zs.get(.8)**2*.25*.75/.03**2),Math.ceil(4*bound)]);
});
test('q496: interpreta el mínimo 88% y divide la amplitud entre dos',()=>{
 const r=record(496),[lo]=interval(r.parts[0].answer);
 assert.ok(lo>.88);assert.match(r.parts[0].answer,/se estima que cumple$/);
 for(const choice of[r.parts[0].answer,...r.parts[0].distractors]){const [a,b]=interval(choice);assert.ok(choice.endsWith(a>=.88?'se estima que cumple':b<.88?'se estima que no cumple':'no permite concluir que cumple'));}
 const bound=zs.get(.95)**2*.925*.075/.015**2;
 assert.equal(Math.floor(bound)+1,1185);assert.equal(r.parts[1].answer,'n = 1185');
 assert.ok(2*zs.get(.95)*Math.sqrt(.925*.075/1185)<.03);assert.ok(2*zs.get(.95)*Math.sqrt(.925*.075/1184)>.03);
 assert.deepEqual(r.parts[1].distractors.map(s=>Number(s.split('=')[1])),[1184,Math.ceil(zs.get(.8)**2*.925*.075/.015**2),Math.ceil(4*bound)]);
});
test('q669: n=40 exacto sin redondear el margen, ningún distractor equivalente',()=>{
 const b=record(669).parts[1];assert.equal(b.answer,'n = 40');assert.deepEqual(b.distractors,['n = 20','n = 5','n = 160']);
 assert.equal(Math.sqrt(10/40),.5);assert.ok(Math.sqrt(10/39)>.5);
 // 160 satisfies the inequality but is not the MINIMUM requested.
 assert.ok(Math.sqrt(10/20)>.5);assert.ok(Math.sqrt(10/5)>.5);assert.ok(160>40);
 assert.equal(b.verification.numericalEvidence.minimum,40);
 assert.ok(b.solutionSteps.some(s=>/se cancelan/.test(s.explanation)));
});
test('fuentes completas, hashes, apartados exactos y puntuaciones solo como evidencia',()=>{
 for(const r of batch.records){
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);
  assert.equal(r.parts.length,r.sourceSubparts.length);
  r.parts.forEach((p,i)=>{assert.equal(p.prompt,r.sourceSubparts[i].officialPrompt);assert.ok(!/\(\d+(?:[.,]\d+)? puntos?\)/.test(p.prompt));assert.ok(r.sourceSubparts[i].scoreEvidence);assert.ok(p.solutionSteps.length>=7);});
  assert.equal(r.qualityGates.publication,'NOT_ENABLED');
 }
});
test('orden invertido y regeneración determinista de la solución y evidencias',()=>{
 assert.deepEqual(buildInterpretationBatch('test-interpretation',cases.slice().reverse()).batch.records.reverse(),batch.records);
 assert.deepEqual(buildInterpretationBatch('test-interpretation').batch,batch);
 assert.equal(batch.executedChecks[1].parts[1].numericalEvidence.planningProportion,.25);
 assert.equal(batch.executedChecks[3].parts[1].numericalEvidence.minimum,40);
});

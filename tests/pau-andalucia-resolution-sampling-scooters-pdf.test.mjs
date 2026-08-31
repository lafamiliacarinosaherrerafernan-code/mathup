import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildSamplingScootersBatch,project} from '../scripts/resolve-andalucia-sampling-scooters-pdf.mjs';
import {officialParts} from '../scripts/resolve-andalucia-inference-multipart.mjs';
import {sourceProjection,restoreText} from '../scripts/project-andalucia-inference-source-glyphs.mjs';
const rows=buildSamplingScootersBatch().batch.records,row=i=>rows.find(r=>r.correctionEvidence.parameters.index===i),close=(a,b,t=2e-10)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const area=(a,b)=>{const n=50000,h=(b-a)/n;let s=0;for(let i=0;i<n;i++)s+=Math.exp(-((a+(i+.5)*h)**2)/2);return s*h/Math.sqrt(2*Math.PI);};
test('two source-read exercises keep all four official scopes and original PDF bytes',()=>{
 assert.equal(rows.length,2);assert.equal(rows.reduce((n,r)=>n+r.parts.length,0),4);
 for(const r of rows){const c=r.correctionEvidence.parameters;assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);assert.deepEqual(r.parts.map(p=>({id:p.partId,prompt:p.prompt})),officialParts(project(c,r.sourceLiteral)));
  for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);assert.doesNotMatch(p.prompt,/\([\d,.]+ puntos?\)/);}}
 assert.match(row(1459).parts[1].prompt,/b1\)/);assert.match(row(1459).parts[1].prompt,/b2\)/);
});
test('source projections recover only visually inspected parameters and are byte-reversible',()=>{
 for(const r of rows){const p=sourceProjection({...r,queueIndex:r.correctionEvidence.parameters.index});assert.equal(restoreText(p.text,p.changes),r.sourceLiteral);assert.equal(p.text,project(r.correctionEvidence.parameters,r.sourceLiteral));assert.equal(crypto.createHash('sha256').update(fs.readFileSync(p.evidence.pngPath)).digest('hex'),p.evidence.pngHash);}
});
test('normal duration checked by independent midpoint integration; all three alternatives fail',()=>{
 const e=row(437).parts[0].verification.numericalEvidence;close(e.z,-.75);close(e.value,.5-area(0,.75));close(e.value,.2266273523768682);assert.ok(e.value<.5);for(const x of e.wrong)assert.ok(Math.abs(x-e.value)>.005);assert.equal(new Set([e.value,...e.wrong].map(x=>x.toFixed(5))).size,4);
});
test('120 scooter outcomes: exact integer rational binomial tail and independent failure-count DP',()=>{
 const e=row(437).parts[1].verification.numericalEvidence;
 let choose=1n,total=0n,mass=0n;for(let k=0;k<=120;k++){if(k>=110)total+=choose*9n**BigInt(k);if(k===110)mass=choose*9n**BigInt(k);if(k<120)choose=choose*BigInt(120-k)/BigInt(k+1);}
 const expected=Number(total)/Number(10n**120n);close(e.value,expected);close(e.mass,Number(mass)/Number(10n**120n));
 let d=[1];for(let n=0;n<120;n++){const next=Array(n+2).fill(0);for(let k=0;k<=n;k++){next[k]+=d[k]*.9;next[k+1]+=d[k]*.1;}d=next;}
 close(d.slice(0,11).reduce((a,b)=>a+b,0),e.value);close(d.reduce((a,b)=>a+b,0),1);close(e.value,.3360868564301908);
 close(e.wrong[0],e.mass);close(e.wrong[1],1-e.value);close(e.wrong[2],e.value-e.mass);assert.equal(new Set([e.value,...e.wrong].map(x=>x.toFixed(5))).size,4);for(const x of e.wrong)assert.ok(Math.abs(x-e.value)>.05);
 assert.match(row(437).parts[1].solutionSteps[0].explanation,/hipótesis/);
});
test('stratified sampling: only one complete allocation preserves four ratios and given first sample',()=>{
 const e=row(1459).parts[0].verification.numericalEvidence,sizes=[250,300,400,350];assert.equal(e.N,1300);assert.equal(e.sample,104);assert.equal(e.rate,.08);
 assert.deepEqual(e.claims[0].allocation,[20,24,32,28]);assert.equal(e.claims.filter(c=>c.N===1300&&c.allocation[0]===20&&c.allocation.reduce((a,b)=>a+b,0)===c.n&&c.allocation.every((v,i)=>v/sizes[i]===c.n/1300)).length,1);
 assert.equal(new Set(e.claims.map(JSON.stringify)).size,4);
});
test('sample mean uses CLT approximation explicitly, not fabricated exact normality',()=>{
 const p=row(1459).parts[1],e=p.verification.numericalEvidence;assert.equal(e.approximatePopulationModel,true);close(e.sd,.1);close(e.lo,-1);close(e.hi,4);close(e.value,area(-1,4),3e-10);close(e.value,.8413130748267098);
 for(const s of [p.answer,...p.distractors])assert.match(s,/normal aproximada/);
 assert.match(p.solutionSteps[0].explanation,/No afirma que la población sea normal/);assert.match(p.solutionSteps.at(-1).explanation,/no se está afirmando normalidad exacta/);
 close(e.claims[1].value,area(-1/7,4/7));close(e.claims[2].value,.5+area(0,4));close(e.claims[3].value,area(-1,1));
 assert.equal(e.claims.filter(x=>Math.abs(x.sd-.1)<1e-12&&Math.abs(x.value-e.value)<1e-10).length,1);
});
test('repeat, reversed input and unchanged source queue give identical mathematical records',()=>{
 assert.deepEqual(rows,buildSamplingScootersBatch().batch.records);assert.deepEqual(rows,buildSamplingScootersBatch('batch-0289',[...cases].reverse()).batch.records.reverse());
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl')).digest('hex'),'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
 const finite=v=>{if(typeof v==='number')assert.ok(Number.isFinite(v));else if(v&&typeof v==='object')Object.values(v).forEach(finite);};rows.forEach(finite);
});

import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {cases,feedGraph,renderFeedGraph,buildResourcesMixturesBatch} from '../scripts/resolve-andalucia-linear-resources-mixtures.mjs';
import {resourcesMixturesObservations,resourcesMixturesReplacements} from '../scripts/andalucia-linear-resources-mixtures-pdf-evidence.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),rows=()=>buildResourcesMixturesBatch('resources-mixtures-test').batch.records;
for(const c of cases)test(`${c.index}: independent dual bound, feasibility, exhaustive integer or fractional checks`,()=>{
 const sign=c.minimize?-1:1;
 for(let j=0;j<2;j++)near(c.constraints.reduce((s,r,i)=>s+c.dual[i]*r[j],0),sign*c.objective[j]);
 near(c.constraints.reduce((s,r,i)=>s+c.dual[i]*r[2],0),sign*c.extreme);assert.ok(c.dual.every(x=>x>=0));
 assert.ok(feasible(c.optimum,c.constraints));near(c.objective[0]*c.optimum[0]+c.objective[1]*c.optimum[1],c.extreme);
 const d=derive(c);near(c.minimize?d.min:d.max,c.extreme);
 let best=c.minimize?Infinity:-Infinity,at=[];const step=c.continuous?1/3:1,limit=c.index===443?160:Math.max(...c.domain.x,...c.domain.y);
 for(let ix=0;ix<=limit/step;ix++)for(let iy=0;iy<=limit/step;iy++){const p=[ix*step,iy*step];if(!feasible(p,c.constraints))continue;const z=c.objective[0]*p[0]+c.objective[1]*p[1];assert.ok(sign*z<=sign*c.extreme+1e-8);if(sign*z>sign*best+1e-8){best=z;at=[p];}else if(Math.abs(z-best)<1e-8)at.push(p);}
 near(best,c.extreme);assert.equal(at.length,1);near(at[0][0],c.optimum[0]);near(at[0][1],c.optimum[1]);
});
test('24 distractors rejected mathematically, including extra feasibility question and minimum nutrient amounts',()=>{
 for(const r of rows()){const c=cases.find(c=>c.index===r.correctionEvidence.parameters.index),p=r.parts[0];assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);for(const xy of p.verification.numericalEvidence.wrongPoints){const z=c.objective[0]*xy[0]+c.objective[1]*xy[1];assert.ok(!feasible(xy,c.constraints)||Math.abs(z-c.extreme)>1e-8);}}
 const c=cases.find(c=>c.index===382);assert.ok(!feasible([40,20],c.constraints));assert.equal(20*40+10*20,1000);assert.equal(30*20+60*50,3600);
 near(2*(2/3)+2/3,2);assert.ok(2*.5+.5<2);assert.equal(0+2*2,4);
});
test('unbounded feed region never claims finite maximum; graph clips only viewport, both positive recession directions valid',()=>{
 const c=cases.at(-1),g=feedGraph();assert.equal(g.vertices.length,3);assert.deepEqual(g.viewportOnlyConstraints,[[1,0,4],[0,1,4]]);assert.equal(g.optima.maximum.unboundedAbove,true);assert.equal(g.optima.maximum.attained,false);
 for(const v of g.recessionDirections)for(const[a,b]of c.constraints)assert.ok(a*v[0]+b*v[1]<=0);for(const t of[1,10,100,10000]){assert.ok(feasible([2/3+t,2/3],c.constraints));assert.ok(feasible([2/3,2/3+t],c.constraints));}
 for(const p of g.polygon)assert.ok(feasible(p,c.constraints));const s=renderFeedGraph(g);assert.match(s,/Región no acotada/);assert.doesNotMatch(s,/NaN|undefined/);assert.equal(s,renderFeedGraph(structuredClone(g)));
});
test('8 whole official exercises, all questions addressed, complete pedagogy and chart payload',()=>{const r=rows();assert.equal(r.length,8);for(const x of r){assert.equal(x.deliveryScope,'WHOLE_OFFICIAL_EXERCISE');assert.equal(x.sourceSubparts.length,0);assert.equal(x.parts.length,1);const p=x.parts[0];assert.equal(p.answer,p.finalAnswer);assert.ok(p.solutionSteps.length>=10);assert.ok(p.visual);assert.equal(p.distractors.length,3);}assert.match(r.find(x=>x.correctionEvidence.parameters.index===382).parts[0].answer,/No es posible fabricar 40 A y 20 B/);assert.match(r.find(x=>x.correctionEvidence.parameters.index===1487).parts[0].answer,/2 unidades de calcio y 2 de hierro/);});
test('8 source PDFs and inspected pages hashed; source restoration reversible and editorial headers excluded',()=>{let count=0;for(const r of rows()){const i=r.correctionEvidence.parameters.index,o=resourcesMixturesObservations.find(o=>o[0]===i);assert.equal(sha(fs.readFileSync(r.officialSource.path)),o[1]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),o[4]);let t=r.sourceLiteral;const undo=[];for(const[b,a]of resourcesMixturesReplacements({...r,queueIndex:i})){const pos=t.indexOf(b);assert.ok(pos>=0,`${i}: ${b}`);t=t.slice(0,pos)+a+t.slice(pos+b.length);undo.push({pos,b,a});count++;}assert.doesNotMatch(t,/\u001c|¾|BLOQUE B|OPCIÓN A|Justiﬁque las respuestas|𝑚2/);if(i===1487)assert.match(t,/^Una granja/);for(const{pos,b,a}of undo.reverse())t=t.slice(0,pos)+b+t.slice(pos+a.length);assert.equal(t,r.sourceLiteral);}assert.equal(count,15);});
test('resource models reproducible, input order invariant and official/runtime sources unchanged',()=>{const paths=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p))),sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildResourcesMixturesBatch('resources-mixtures-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);});

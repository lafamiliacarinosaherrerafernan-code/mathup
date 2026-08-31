import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {cases,buildContinuityBatch,functions,graphSpecs,renderCalculusGraph} from '../scripts/resolve-andalucia-calculus-continuity-official.mjs';
import {continuityObservations,continuityReplacements} from '../scripts/andalucia-calculus-continuity-pdf-evidence.mjs';
const rows=()=>buildContinuityBatch('continuity-test').batch.records,find=(r,i)=>r.find(x=>x.correctionEvidence.parameters.index===i),ev=(r,i,j)=>find(r,i).parts[j].verification.numericalEvidence;
const close=(a,b,t=1e-6)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`),d=(f,x,h=1e-5)=>(f(x+h)-f(x-h))/(2*h),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
test('124: continuity parameter, unequal slopes, parameter reset, and the discontinuous join is not an extremum',()=>{
 const r=rows(),f=functions[124],a=ev(r,124,0);close(f(-1e-8,a.a),f(0,a.a));assert.equal(a.a,-1);for(const w of[1,0])assert.ok(Math.abs(f(-1e-8,w)-f(0,w))>.9);
 close((f(0,-1)-f(-1e-6,-1))/1e-6,4,1e-4);close((f(1e-6,-1)-f(0,-1))/1e-6,-1,1e-4);
 const b=ev(r,124,1);for(const [x,y]of b.signSamples)close(d(x=>f(x,2),x),y);close(f(b.minimum[0],2),b.minimum[1]);assert.ok(f(.5-.01,2)>f(.5,2)&&f(.5+.01,2)>f(.5,2));assert.ok(f(-.01,2)>f(0,2)&&f(.01,2)<f(0,2));assert.notEqual(f(.5,2),-2);
});
test('188: discontinuity rules out a false inflection despite opposite curvature',()=>{
 const r=rows(),f=functions[188],a=ev(r,188,0);close(f(-1e-8,a.a),f(0,a.a));for(const w of[0,1])assert.ok(Math.abs(f(-1e-8,w)-f(0,w))>.9);
 const b=ev(r,188,1);for(const [x,y]of b.firstSamples)close(d(x=>f(x,-2),x),y);for(const [x,y]of b.secondSamples)close(d(t=>d(z=>f(z,-2),t),x),y,1e-5);assert.ok(Math.abs(f(-1e-8,-2)-f(0,-2))>.99);assert.deepEqual(b.inflections,[]);
});
test('1354: genuine continuous join, corner, excluded pole, and one-sided horizontal asymptote',()=>{
 const r=rows(),f=functions[1354];close(f(1-1e-8),f(1));close(f(1+1e-8),f(1));assert.deepEqual(ev(r,1354,0).domainExclusions,[2]);
 close((f(1)-f(1-1e-7))/1e-7,7,1e-5);close((f(1+1e-7)-f(1))/1e-7,-1,1e-5);assert.deepEqual(ev(r,1354,1).at1,[7,-1]);
 assert.ok(f(2-1e-7)<-1e6&&f(2+1e-7)>1e6);close(f(1e9),1);assert.ok(f(-1e3)<-1e8);assert.equal(ev(r,1354,2).horizontal.left,null);
});
test('1477: all source branches, endpoint domain, maximum and exact graph points',()=>{
 const r=rows(),f=functions[1477],a=ev(r,1477,0);close(f(2-1e-8),f(2));close(f(2+1e-8),f(2));close((f(2)-f(2-1e-7))/1e-7,4/3,1e-5);close((f(2+1e-7)-f(2))/1e-7,-4/9,1e-5);
 for(const [x,y]of ev(r,1477,1).samplePoints)close(f(x),y);for(const x of[0,.5,1,1.9,2.1,3,10,100])assert.ok(f(x)<f(2));assert.equal(a.rightDerivative0,0);assert.notEqual(f(2),4);assert.notEqual(f(3),4/3);
});
test('1482: join slopes, source-bound graph and independently integrated positive area',()=>{
 const r=rows(),f=functions[1482];close(f(3-1e-8),f(3));close(f(3+1e-8),f(3));close((f(3)-f(3-1e-7))/1e-7,2,1e-5);close((f(3+1e-7)-f(3))/1e-7,-1,1e-5);
 const n=20000,h=2/n;let integral=0;for(let i=0;i<n;i++)integral+=h*f(2+(i+.5)*h);close(integral,5/6,1e-8);close(ev(r,1482,2).area,integral,1e-8);for(const w of[1/6,4/3,1])assert.ok(Math.abs(w-integral)>.1);
 assert.equal(f(2),0);assert.equal(f(3),1);assert.equal(f(4),0);assert.notEqual(-((1-2)**2),f(1));assert.notEqual(4-4,f(4.5));assert.notEqual((1+2)**2,f(1));
});
test('1502: three independent audience constraints reject every distractor',()=>{
 const r=rows(),z=ev(r,1502,0),valid=([c,b,a])=>c===20&&Math.abs(1600*a+40*b+c-36)<1e-10&&Math.abs(80*a+b)<1e-10&&a<0;assert.ok(valid(z.coefficients));for(const w of[[20,-.8,.01],[36,.8,-.01],[20,1.6,-.02]])assert.equal(valid(w),false);
 const f=functions[1502];close(f(0),20);close(f(40),36);close(f(60),32);assert.ok(d(f,20)>0&&d(f,50)<0);for(const [x,y]of[z.vertex,...z.endpoints])close(f(x),y);
});
test('1502 derivatives: source functions independently differentiated; three options false and non-equivalent',()=>{
 const g=x=>Math.log((x*x-1)/(x*x+1)),h=x=>(2*x-1)*Math.exp(x*x-x),dg=x=>4*x/(x**4-1),dh=x=>(2+(2*x-1)**2)*Math.exp(x*x-x);
 for(const x of[-2,-1.3,1.2,2])close(d(g,x),dg(x),1e-5);for(const x of[-.5,.2,.7,1.3])close(d(h,x),dh(x),1e-5);
 const wrong=[x=>[-dg(x),dh(x)],x=>[dg(x),(2-(2*x-1)**2)*Math.exp(x*x-x)],x=>[dg(x)/2,dh(x)]];
 const at=1.3,signatures=[[dg(at),dh(at)],...wrong.map(f=>f(at))];assert.equal(new Set(signatures.map(JSON.stringify)).size,4);for(const f of wrong)assert.ok(Math.abs(f(at)[0]-dg(at))+Math.abs(f(at)[1]-dh(at))>1e-4);
});
test('graphs are deterministic, source-bound, finite, and cannot substitute another geometry',()=>{
 for(const [i,s]of Object.entries(graphSpecs)){const svg=renderCalculusGraph(s);assert.equal(svg,renderCalculusGraph(structuredClone(s)));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);assert.equal((svg.match(/<polyline/g)||[]).length,s.pieces.length);for(const [x,y]of s.points)close(functions[i](x),y);assert.throws(()=>renderCalculusGraph({...s,xRange:[0,999]}));}
 assert.match(renderCalculusGraph(graphSpecs[1482]),/<polygon/);assert.match(renderCalculusGraph(graphSpecs[1482]),/5\/6/);
});
test('6 official pages, 14 complete parts, source replacements reversible and hashes unchanged',()=>{
 const r=rows();assert.equal(r.length,6);assert.equal(r.reduce((n,x)=>n+x.parts.length,0),14);for(const x of r){const i=x.correctionEvidence.parameters.index,o=continuityObservations.find(o=>o[0]===i);assert.equal(sha(fs.readFileSync(x.officialSource.path)),o[1]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),o[4]);const replacements=continuityReplacements({...x,queueIndex:i});for(const [before]of replacements)assert.ok(x.sourceLiteral.includes(before));for(const p of x.parts){assert.ok(p.solutionSteps.length>=5);assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);}}
});
test('repeated and reverse-order solutions identical; no source/bank writes',()=>{
 const paths=['math-renderer.js','data/andalucia-pau-runtime.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p))),sort=a=>a.sort((x,y)=>x.exerciseId.localeCompare(y.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildContinuityBatch('continuity-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);
});

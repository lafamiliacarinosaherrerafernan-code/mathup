import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildCalculusBatch,f138,f215,f391,f625,f727} from '../scripts/resolve-andalucia-calculus-official.mjs';
import {calculusObservations,calculusReplacements} from '../scripts/andalucia-calculus-pdf-evidence.mjs';
const rows=()=>buildCalculusBatch('calculus-test').batch.records;
const row=(r,i)=>r.find(x=>x.correctionEvidence.parameters.index===i);
const at=(r,i,k)=>row(r,i).parts[k].verification.numericalEvidence;
const close=(a,b,t=1e-7)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const d=(f,x,h=1e-5)=>(f(x+h)-f(x-h))/(2*h);
const evalPoly=(p,x)=>p.reduce((a,v,i)=>a+v*x**i,0);
const derivative=p=>p.slice(1).map((v,i)=>v*(i+1));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
test('cubic 138: sign table, extrema, slope-four equation and all numerical distractors',()=>{
 const r=rows(),z=at(r,138,0),df=x=>4*x-x*x;for(const [x,y]of z.signSamples){close(d(f138,x),y);close(df(x),y);}
 assert.deepEqual(z.critical,[0,4]);assert.deepEqual(at(r,138,1).points,[[0,0],[4,32/3]]);
 for(const [x,y]of at(r,138,1).points){close(f138(x),y);close(d(f138,x),0);}
 const valid=([x,y])=>Math.abs(f138(x)-y)<1e-9&&Math.abs(df(x)-4)<1e-9;
 assert.ok(valid(at(r,138,2).point));for(const q of [[2,8/3],[4,32/3],[0,0]])assert.equal(valid(q),false);
 // The alternate monotonicity claims are refuted at explicit interior points.
 assert.ok(df(-1)<0&&df(3)>0&&df(-.5)<0);
});
test('cubic 215: both tangents and constrained primitive independently verified',()=>{
 const r=rows(),a=at(r,215,0),df=x=>9*x*x-12*x;
 for(let i=0;i<2;i++){close(f215(a.abscissas[i]),a.ordinates[i]);close(df(a.abscissas[i]),-3);close(-3*a.abscissas[i]+a.intercepts[i],a.ordinates[i]);}
 const tangent=(m,b)=>[1/3,1].some(x=>Math.abs(df(x)-m)<1e-10&&Math.abs(m*x+b-f215(x))<1e-10);
 for(const pair of [[[ -3,40/9],[-3,2]],[[3,49/9],[3,5]],[[-3,5],[-3,1]]])assert.equal(pair.every(([m,b])=>tangent(m,b)),false);
 const p=at(r,215,1).primitiveCoefficients,valid=p=>JSON.stringify(derivative(p))===JSON.stringify([5,0,-6,3])&&Math.abs(evalPoly(p,2)-4)<1e-10;
 assert.ok(valid(p));for(const w of [[4,5,0,-2,.75],[2,5,0,-2,.75],[-6,5,0,-2,1]])assert.equal(valid(w),false);
 assert.equal(row(r,215).parts[1].answer,'F(x)=frac{3x⁴}{4}−2x³+5x−2');
});
test('cubic 391: first/second derivatives, full extrema coordinates, inflection and primitive',()=>{
 const r=rows(),df=x=>x*x-4*x+3;for(const [x,y]of at(r,391,0).signSamples){close(d(f391,x),y);close(df(x),y);}
 for(const [x,y]of at(r,391,0).extrema)close(f391(x),y);
 const [x,y]=at(r,391,1).inflection;close(f391(x),y);assert.equal(2*x-4,0);assert.ok(2*(x-1)-4<0&&2*(x+1)-4>0);
 close(at(r,391,2).slope,d(f391,0));for(const w of [1,-4,0])assert.notEqual(w,3);
 const p=at(r,391,3).primitiveCoefficients;assert.deepEqual(derivative(p),[1,3,-2,1/3]);
 for(const w of [[0,1,1.5,-2/3,1/4],[0,1,1.5,-2,1/12],[0,1,3,-2/3,1/12]])assert.notDeepEqual(derivative(w),[1,3,-2,1/3]);
 for(const w of [[2,0],[1,7/3]])assert.equal(Math.abs(2*w[0]-4)<1e-12&&Math.abs(f391(w[0])-w[1])<1e-12,false);
});
test('derivative-parabola sources: zeros, vertex, sign changes and tangent checks',()=>{
 const r=rows();for(const i of [487,640]){const z=at(r,i,0),f=x=>z.leading*(x-z.roots[0])*(x-z.roots[1]);for(const x of z.roots)close(f(x),0);close(f(z.vertex[0]),z.vertex[1]);assert.ok(f(-2)>0&&f(0)<0&&f(6)>0);}
 const a=at(r,487,1),g=x=>-2*Math.exp(3*x);close(d(g,0),a.slope,1e-6);close(g(0),a.intercept);
 for(const [m,b]of [[-2,-2],[6,-2],[-6,2]])assert.equal(m===-6&&b===g(0),false);
 const b=at(r,640,2);assert.equal(b.slope,-4);assert.equal(b.slope*2+b.intercept,5);
 for(const [m,k]of [[-4,5],[4,-3],[-4,-3]])assert.equal(m===-4&&m*2+k===5,false);
});
test('cesium exponential: half-life, chain-rule tangent, domain and asymptotic bound',()=>{
 const r=rows(),z=at(r,625,0);assert.equal(f625(z.time),z.half);for(const t of [15,60,5])assert.notEqual(f625(t),z.half);
 const a=at(r,625,1);close(d(f625,10),a.slope);close(f625(a.point[0]),a.point[1]);
 for(const [m,b]of [[-a.slope,a.point[1]+a.slope*10],[30*a.slope,a.point[1]-30*a.slope*10],[a.slope,a.point[1]]])assert.equal(Math.abs(m-a.slope)<1e-10&&Math.abs(m*10+b-f625(10))<1e-10,false);
 for(const t of [0,1,30,100,1000])assert.ok(Number.isFinite(f625(t))&&f625(t)>0);assert.ok(f625(3000)<1e-28);assert.deepEqual(at(r,625,2).vertical,[]);
});
test('quotient 727: derivative via independent differences, rational slope and horizontal points',()=>{
 const r=rows(),df=x=>1-4/(x+1)**2;for(const x of [-5,-3,-.5,0,2/3,1,3])close(d(f727,x),df(x),1e-6);
 const z=at(r,727,1);close(df(z.at),z.slope);for(const w of [11/25,-31/25,7/25])assert.ok(Math.abs(df(z.at)-w)>1e-8);
 const valid=([x,y])=>x!==-1&&Math.abs(df(x))<1e-10&&Math.abs(f727(x)-y)<1e-10;
 assert.ok(at(r,727,2).points.every(valid));for(const w of [[[1,0],[3,1]],[[1,0],[-3,8]],[[-1,0],[1,0]]])assert.equal(w.every(valid),false);
});
test('rational 826: parameter solution satisfies both constraints; asymptotes use a=b=1',()=>{
 const r=rows(),valid=([a,b])=>b!==1&&(-a)/(1-b)===1&&a===2,z=at(r,826,0);assert.ok(valid([z.a,z.b]));for(const w of [[2,-1],[-2,-1],[1,2]])assert.equal(valid(w),false);
 const f=x=>x/(x+1);assert.ok(f(-1-1e-6)>1e5&&f(-1+1e-6)<-1e5);close(f(1e9),1);assert.deepEqual(at(r,826,1),{vertical:-1,horizontal:1});
});
test('eight official PDF pages and hashes, 22 complete parts, four distinct options per part',()=>{
 const rr=rows();let n=0;for(const r of rr){const i=r.correctionEvidence.parameters.index,o=calculusObservations.find(o=>o[0]===i);assert.equal(sha(fs.readFileSync(r.officialSource.path)),o[1]);assert.equal(r.officialSource.range.page,o[2]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),o[4]);
 for(const p of r.parts){n++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.explanation&&s.math));}
 const changes=calculusReplacements({...r,queueIndex:i});assert.ok(changes.length>=r.parts.length);assert.ok(changes.every(([old])=>r.sourceLiteral.includes(old)));}assert.equal(n,22);
});
test('calculus resolution deterministic and order invariant; no bank mutation',()=>{
 const paths=['math-renderer.js','data/andalucia-pau-runtime.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p))),sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildCalculusBatch('calculus-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);
});

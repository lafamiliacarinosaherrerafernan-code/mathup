import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {cases,functions,buildBranchesBatch} from '../scripts/resolve-andalucia-calculus-three-branches.mjs';
import {branchesObservations,branchesReplacements} from '../scripts/andalucia-calculus-three-branches-pdf-evidence.mjs';
const rows=()=>buildBranchesBatch('branches-test').batch.records,ev=(r,i,k)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[k].verification.numericalEvidence;
const close=(a,b,t=1e-5)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`),d=(f,x,h=1e-5)=>(f(x+h)-f(x-h))/(2*h),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
test('107: two independent continuity equations, distinct corner slopes and smooth second join',()=>{
 const p=ev(rows(),107,0),[a,b]=p.parameters,f=x=>functions[107](x,a,b);assert.equal(4+2*a,-8-4*a);assert.equal(-8-4*a,-16+b);assert.notEqual(4+2*p.wrongParameters[0],-8-4*p.wrongParameters[0]);for(const x of p.joins){close(f(x-1e-8),f(x));close(f(x+1e-8),f(x));}for(const [j,x]of p.joins.entries()){close((f(x)-f(x-1e-6))/1e-6,p.slopes[j][0]);close((f(x+1e-6)-f(x))/1e-6,p.slopes[j][1]);}
});
test('107: sign table and closed-interval extrema reject inverted/global/local distractors',()=>{
 const p=ev(rows(),107,1),f=x=>functions[107](x,...p.parameters);for(const [x,y]of p.firstSamples)close(d(f,x),y);for(const [x,y]of p.candidateValues)close(f(x),y);assert.ok(f(-2.01)>f(-2)&&f(-1.99)>f(-2));assert.ok(f(-.01)<f(0)&&f(.01)<f(0));for(let k=0;k<=700;k++){const y=f(-4+k/100);assert.ok(y>=-8&&y<=8);}assert.ok(f(3)<f(-2));assert.notEqual(f(0),4);
});
test('107 and 120: numerical quadrature independent of polynomial antiderivative; all wrong values rejected',()=>{
 const r=rows();for(const i of[107,120]){const p=ev(r,i,2),f=i===107?x=>functions[i](x,-2,16):functions[i],[a,b]=p.interval,n=20000,h=(b-a)/n;let sum=0;for(let k=0;k<n;k++)sum+=h*f(a+(k+.5)*h);const target=p.area??p.integral;close(sum,target,1e-6);const H=x=>p.primitiveCoefficients.reduce((s,c,k)=>s+c*x**k,0);close(H(b)-H(a),target);for(const x of[a+.2,(a+b)/2,b-.2])close(d(H,x),f(x));for(const w of p.wrongAreas??p.wrongValues)assert.ok(Math.abs(w-sum)>.1);assert.equal(new Set([target,...p.wrongAreas??p.wrongValues]).size,4);}
});
test('120: full domain, corner at two and finite jump at four, not a false vertical asymptote',()=>{
 const p=ev(rows(),120,0),f=functions[120];assert.deepEqual(p.domainExclusions,[]);assert.equal(f(0),2);for(const [x,l,r]of p.joinLimits){close(f(x-1e-8),l);close(f(x+1e-8),r);}close((f(2)-f(2-1e-6))/1e-6,-1);close((f(2+1e-6)-f(2))/1e-6,2);assert.equal(f(4),.25);
});
test('120: all four monotonicity intervals independently verified',()=>{const p=ev(rows(),120,1);for(const [x,y]of p.firstSamples)close(d(functions[120],x),y);close(d(functions[120],p.critical),0);assert.ok(functions[120](2.9)<functions[120](3)&&functions[120](3.1)<functions[120](3));});
test('227: native branch limits and slopes determine exactly one parameter pair',()=>{
 const p=ev(rows(),227,0),res=([a,b])=>[2*a+b-2,-a-b];assert.deepEqual(res(p.parameters),[0,0]);for(const w of p.wrongParameters)assert.ok(res(w).some(x=>Math.abs(x)>0));const f=x=>functions[227](x,...p.parameters);close(f(-1e-8),f(0));close(f(1e-8),f(0));close((f(0)-f(-1e-6))/1e-6,-2);close((f(1e-6)-f(0))/1e-6,-2);
});
test('227: global decrease, absence of extrema, left-only asymptote and no spurious pole',()=>{
 const r=rows(),p=ev(r,227,1),f=x=>functions[227](x,...p.parameters);for(const [x,y]of p.firstSamples)close(d(f,x),y,5e-5);for(let i=-100;i<100;i++)assert.ok(f(i/10)>f((i+1)/10));close(f(-1e9),2);assert.ok(f(20)<-1e8);assert.ok(Number.isFinite(f(1)));assert.ok(f(100)/100<-1e40);assert.equal(ev(r,227,2).noVertical,true);
});
test('three official page hashes, 9 parts, 27 distractors, exact inverse mappings and independent source integrity',()=>{
 const r=rows();assert.equal(r.length,3);assert.equal(r.reduce((s,x)=>s+x.parts.length,0),9);for(const x of r){const i=x.correctionEvidence.parameters.index,o=branchesObservations.find(o=>o[0]===i);assert.equal(sha(fs.readFileSync(x.officialSource.path)),o[1]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),o[4]);let text=x.sourceLiteral;const ledger=[];for(const [before,after]of branchesReplacements({...x,queueIndex:i})){const offset=text.indexOf(before);assert.ok(offset>=0);ledger.push({offset,before,after});text=text.replace(before,after);}for(const c of ledger.reverse())text=text.slice(0,c.offset)+c.before+text.slice(c.offset+c.after.length);assert.equal(text,x.sourceLiteral);for(const p of x.parts){assert.ok(p.solutionSteps.length>=5);assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);}}
});
test('determinism, reversed order and no changes to sources or published bank',()=>{
 const paths=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p))),sort=x=>x.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildBranchesBatch('branches-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);
});

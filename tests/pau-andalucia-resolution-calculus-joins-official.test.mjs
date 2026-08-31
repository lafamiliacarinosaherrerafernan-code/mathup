import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {cases,functions,buildJoinsBatch} from '../scripts/resolve-andalucia-calculus-joins-official.mjs';
import {joinsObservations,joinsReplacements} from '../scripts/andalucia-calculus-joins-pdf-evidence.mjs';
const rows=()=>buildJoinsBatch('joins-test').batch.records,find=(r,i)=>r.find(x=>x.correctionEvidence.parameters.index===i),ev=(r,i,k)=>find(r,i).parts[k].verification.numericalEvidence;
const close=(a,b,t=1e-5)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`),d=(f,x,h=1e-5)=>(f(x+h)-f(x-h))/(2*h),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
test('five parameter joins: independent value/slope residuals reject all distractor parameter pairs',()=>{
 const r=rows(),residual={78:([a,b])=>[-a+1,-a+b],146:([a,b])=>[a-b-5,a-10],275:([a,b])=>[2-a,.5+b],404:([a,b])=>[a-6*b-30,-5*b+15],494:([a,b])=>[-a+4*b-10,a/2-b-2]};
 for(const i of[78,146,275,404,494]){const p=ev(r,i,0);assert.ok(residual[i](p.parameters).every(x=>Math.abs(x)<1e-12));for(const w of p.wrongParameters)assert.ok(residual[i](w).some(x=>Math.abs(x)>.1));const joins=p.joins||[p.join],f=x=>functions[i](x,...p.parameters);for(const x of joins){close(f(x-1e-8),f(x));close(f(x+1e-8),f(x));close((f(x)-f(x-1e-6))/1e-6,(f(x+1e-6)-f(x))/1e-6,1e-4);}}
});
test('78/494: source parameter resets and independent tangency verify exactly one line',()=>{
 const r=rows();for(const i of[78,494]){const p=ev(r,i,1),f=x=>functions[i](x,...p.parameters),[x,y]=p.point;close(f(x),y);close(d(f,x),p.line[0]);close(p.line[0]*x+p.line[1],y);for(const [m,b]of p.wrongLines)assert.ok(Math.abs(m-d(f,x))+Math.abs(m*x+b-y)>.1);assert.equal(new Set([p.line,...p.wrongLines].map(JSON.stringify)).size,4);}
});
test('146: independent first/second differences and corner test distinguish the four sign claims',()=>{
 const p=ev(rows(),146,1),f=x=>functions[146](x,...p.parameters);for(const [x,y]of p.firstSamples)close(d(f,x),y);for(const [x,y]of p.secondSamples)close(d(t=>d(f,t),x),y,2e-4);close(f(1-1e-8),f(1));close(f(1+1e-8),f(1));assert.ok(d(f,0)>0&&d(f,.75)<0&&d(f,2)>0);assert.deepEqual(p.joinSlopes,[-3,4]);
});
test('184: continuity fixes a=4, differentiability holds, reset a=1 has no pole',()=>{
 const r=rows(),p=ev(r,184,0),f=x=>functions[184](x,p.parameter);close(f(2+1e-8),f(2));close((f(2)-f(2-1e-6))/1e-6,1);close((f(2+1e-6)-f(2))/1e-6,1);for(const a of p.wrongParameters)assert.ok(Math.abs(functions[184](2+1e-8,a)-2)>.9);
 const g=x=>functions[184](x,1);assert.equal(g(0),4);close(g(2+1e-8),3.5);close(g(1e9),4);assert.ok(g(-1e3)>1e6);assert.equal(ev(r,184,1).noVertical,true);
});
test('219: both joins, corner at one, smooth join at five, and global maximum on [0,10]',()=>{
 const r=rows(),p=ev(r,219,0),f=t=>functions[219](t,...p.parameters);for(const j of p.joins){close(f(j-1e-8),f(j));close(f(j+1e-8),f(j));}for(const [a,b]of p.wrongParameters)assert.ok(Math.abs(7-(2+a))+Math.abs((10+a)-(35+b))>1);
 close((f(1)-f(1-1e-6))/1e-6,14,1e-4);close((f(1+1e-6)-f(1))/1e-6,2);close((f(5)-f(5-1e-6))/1e-6,2);close((f(5+1e-6)-f(5))/1e-6,2);for(const [x,y]of ev(r,219,1).candidateValues)close(f(x),y);for(let k=0;k<=1000;k++)assert.ok(f(k/100)<=16);assert.equal(f(6),16);assert.notEqual(f(5),16);
});
test('275: three positive derivatives and continuous joins imply global increase',()=>{
 const p=ev(rows(),275,1),f=x=>functions[275](x,...p.parameters);for(const [x,y]of p.firstSamples)close(d(f,x),y);for(let i=-100;i<100;i++)assert.ok(f(i/10)<f((i+1)/10));assert.equal(p.globallyIncreasing,true);
});
test('323: actual pole, continuous corner, monotonicity and positive curvature',()=>{
 const r=rows(),f=functions[323];assert.ok(!Number.isFinite(f(0)));close(f(2-1e-8),f(2));close(f(2+1e-8),f(2));close((f(2)-f(2-1e-6))/1e-6,-1);close((f(2+1e-6)-f(2))/1e-6,2);assert.deepEqual(ev(r,323,0).excluded,[0]);const p=ev(r,323,1);for(const [x,y]of p.firstSamples)close(d(f,x),y);for(const [x,y]of p.secondSamples)close(d(t=>d(f,t),x),y,1e-4);
});
test('404: the left critical point and global maximum are checked by values and signs',()=>{
 const p=ev(rows(),404,1),f=x=>functions[404](x,...p.parameters);for(const [x,y]of p.firstSamples)close(d(f,x),y);close(d(f,p.critical),0);close(f(p.maximum[0]),p.maximum[1]);assert.ok(f(-.6)<48.75&&f(-.4)<48.75);assert.ok(f(.5)<48.75);assert.ok(f(-1e3)<-1e6);close(f(1e9),0);assert.notEqual(f(-.5),48);
});
test('431: production domain, sign changes, extrema and euro units reject the distractors',()=>{
 const r=rows(),f=functions[431],p=ev(r,431,0);for(const [x,y]of p.firstSamples)close(d(f,x),y);assert.deepEqual(p.criticalInside,[1]);assert.deepEqual(p.criticalExcluded,[3]);assert.deepEqual(p.domain,[0,2]);for(const k of[1,2])for(const [x,y]of ev(r,431,k).candidateValues)close(f(x),y);assert.equal(ev(r,431,1).euros,1000*f(1));assert.equal(ev(r,431,2).euros,1000*f(0));for(let i=0;i<=1000;i++){const y=f(2*i/1000);assert.ok(y>=26&&y<=30);}assert.notEqual(f(2),30);assert.notEqual(f(1),30);
});
test('9 page hashes, 19 complete source parts, four distinct options and reversible inspected mappings',()=>{
 const r=rows();assert.equal(r.length,9);assert.equal(r.reduce((s,x)=>s+x.parts.length,0),19);for(const x of r){const i=x.correctionEvidence.parameters.index,o=joinsObservations.find(o=>o[0]===i);assert.equal(sha(fs.readFileSync(x.officialSource.path)),o[1]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),o[4]);let text=x.sourceLiteral;const ledger=[];for(const [before,after]of joinsReplacements({...x,queueIndex:i})){assert.ok(text.includes(before));const offset=text.indexOf(before);ledger.push({offset,before,after});text=text.replace(before,after);}for(const c of ledger.reverse())text=text.slice(0,c.offset)+c.before+text.slice(c.offset+c.after.length);assert.equal(text,x.sourceLiteral);for(const p of x.parts){assert.ok(p.solutionSteps.length>=5);assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);}}
});
test('repeated and inverse-order calculations preserve sources and baseline runtime',()=>{
 const paths=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p))),sort=x=>x.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildJoinsBatch('joins-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);
});

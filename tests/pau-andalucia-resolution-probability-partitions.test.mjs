import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildPartitionBatch} from '../scripts/resolve-andalucia-probability-partitions.mjs';
const rows=buildPartitionBatch().batch.records,at=i=>rows.find(x=>x.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
const val=s=>{const m=s.match(/^frac\{(-?\d+)\}\{(\d+)\}%?$/);return m?+m[1]/+m[2]:Number(s.replace('%',''));};
test('twelve complete official exercises, thirty-two parts, ninety-six distractors',()=>{
 assert.equal(rows.length,12);assert.equal(rows.flatMap(x=>x.parts).length,32);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);}
});
test('independent source calculations verify numerical answers and all three wrong alternatives',()=>{
 const expected=[[263,[90,60,100*.65*.5/(.65*.5+.35*.15)]],[279,[1-.045-.035+.01,.01/.045,null]],[281,[(45-45/3)/105,null,4/(45/3+42/3+4)]],[462,[.45*.7+.55*.8,.45*.7/(.45*.7+.55*.8),.45*.3/(.45*.3+.55*.2)]],[470,[1-.15,.65-(.65+.45-.85),(.45-(.65+.45-.85))/(1-.65)]],[483,[.7+.75-.5,(.75-.5)/(1-.7),null]],[490,[.8*.25+.2*.6,.2*.6/(.8*.25+.2*.6)]],[502,[4/10,2/6*6/14+4/6*5/10,(2/6*8/14)/(2/6*8/14+4/6*4/10)]],[510,[(40*.95+10*.98)/50,40*.05/(40*.05+10*.02)]],[540,[1-(.5*.05+.3*.15+.2*.20),.5*.05/(.5*.05+.3*.15+.2*.20)]],[548,[.4*.6+.6*.7,.4*.6/(.4*.6+.6*.7),.4+.4*.6+.6*.7-.4*.6]]];
 for(const[i,values]of expected)for(const[j,v]of values.entries()){if(v===null)continue;const p=at(i).parts[j],xs=[p.answer,...p.distractors].map(val);near(xs[0],v);assert.ok(xs.every(x=>Number.isFinite(x)&&x>=0&&x<=(p.answer.endsWith('%')?100:1)));assert.equal(xs.filter(x=>Math.abs(x-v)<1e-12).length,1);assert.equal(new Set(xs.map(x=>x.toFixed(12))).size,4);}
});
test('nested questions keep all four official results; distractor tuples differ',()=>{
 const e=at(213).parts[0].verification.numericalEvidence,expected=[.4,.05,.45,.2];
 e.values.forEach(([n,d],i)=>near(n/d,expected[i]));
 for(const vs of e.bad){assert.ok(vs.some(([n,d],i)=>Math.abs(n/d-expected[i])>1e-12));assert.ok(vs.every(([n,d])=>n/d>=0&&n/d<=1));}
 assert.match(at(213).parts[0].prompt,/iv\)/);
});
test('independence and incompatibility are separate exact claims',()=>{
 for(const[i,j,product]of[[213,.35,.75*.4],[279,.01,.045*.035],[483,.5,.7*.75]]){
  const p=at(i).parts.at(-1),v=p.verification.numericalEvidence;near(v.J/v.N,j);near(v.R*v.C/v.N**2,product);assert.equal(v.independent,false);
  const matches=v.optionClaims.map(x=>x.independent===false&&Math.abs(x.joint[0]/x.joint[1]-j)<1e-12&&Math.abs(x.product[0]/x.product[1]-product)<1e-12);assert.deepEqual(matches,[true,false,false,false]);
 }
 assert.equal(at(279).parts[2].verification.numericalEvidence.incompatible,false);assert.match(at(279).parts[2].answer,/Incompatibles: no/);
});
test('press percentage is checked against votes and is not treated as source answer',()=>{
 const p=at(281).parts[1],xs=[p.answer,...p.distractors].map(x=>({yes:x.startsWith('Sí'),value:val(x.replace(/^(Sí|No); aceptó /,''))}));
 near(xs[0].value,100*(30+28+14)/105);assert.equal(xs[0].yes,false);assert.equal(xs.filter(x=>!x.yes&&Math.abs(x.value-100*72/105)<1e-12).length,1);
 assert.equal(p.verification.numericalEvidence.claimValid,false);
});
test('all complete partitions preserve source literals, scores and PDF hashes',()=>{
 const canonical=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const c of cases){const r=at(c.index),s=canonical.find(x=>x.exerciseId===r.exerciseId);assert.equal(c.cells.reduce((n,x)=>n+x[2],0),c.scale);assert.ok(c.cells.every(x=>x[2]>=0));assert.equal(r.sourceLiteral,s.officialPrompt);assert.deepEqual(r.scoreEvidence,s.scoreEvidence);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);}
});
test('mathematical outputs reproduce exactly and are invariant to order',()=>{
 const sig=rs=>rs.map(x=>[x.exerciseId,x.sourceLiteral,x.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildPartitionBatch().batch.records));assert.deepEqual(sig(rows),sig(buildPartitionBatch('batch-0265',[...cases].reverse()).batch.records));
});

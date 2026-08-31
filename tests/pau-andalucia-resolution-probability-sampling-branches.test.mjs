import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildSamplingBranchesBatch} from '../scripts/resolve-andalucia-probability-sampling-branches.mjs';
const rows=buildSamplingBranchesBatch().batch.records,at=i=>rows.find(x=>x.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
const val=s=>{const m=s.match(/^frac\{(-?\d+)\}\{(\d+)\}$/);return m?+m[1]/+m[2]:Number(s);};
test('ten official exercises retain thirty-two parts with three wrong options each',()=>{
 assert.equal(rows.length,10);assert.equal(rows.flatMap(x=>x.parts).length,32);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);}
});
test('independent direct computations check thirty numerical answers and all alternatives',()=>{
 const expected=[[781,[2/3,2*(2/3)*(1/3),1-1/9,(4/9)/(8/9)]],[843,[(.75-.35)/.75,.75+.55-.35,1-(.75+.55-.35),.75/(.75+.55-.35)]],[846,[.7*.15+.3*.8,.3*.8/(.7*.15+.3*.8),.7*.85]],[853,[.47*.28,.47*.72+.53*.22,.47*.72/(.47*.72+.53*.22)]],[855,[(1500+1000)/3000,(150+200+250)/3000,800/(1350+800+250)]],[856,[.5+.4-.5*.4,(.5-.5*.4)/.5]],[859,[(220/5+208*.75+23)/520,208*.75/520,(220/5)/(220/5+208*.75+23)]],[893,[(180-180/3)/420,(420-180/3-(420-180-72)*2/3-16)/420,16/(180/3+(420-180-72)*2/3+16)]],[901,[.48*.3,.48*.7+.35*.95+.17*.94,.17*.06/(.48*.3+.35*.05+.17*.06)]],[903,[.4*.02+.6*.95,.4*.98/(.4*.98+.6*.05)]]];
 let count=0;for(const[i,values]of expected)for(const[j,v]of values.entries()){const p=at(i).parts[j],xs=[p.answer,...p.distractors].map(val);near(xs[0],v);assert.ok(xs.every(x=>Number.isFinite(x)&&x>=0&&x<=1));assert.equal(xs.filter(x=>Math.abs(x-v)<1e-12).length,1);assert.equal(new Set(xs.map(x=>x.toFixed(12))).size,4);count++;}assert.equal(count,30);
});
test('two independence questions are independently verified, including every false claim',()=>{
 for(const[i,j,joint,product,yes]of[[843,4,.35,.75*.55,false],[856,2,.2,.5*.4,true]]){const p=at(i).parts[j],e=p.verification.numericalEvidence;assert.equal(e.independent,yes);near(e.J/e.N,joint);near(e.R*e.C/(e.N*e.N),product);const valid=e.optionClaims.map(c=>c.independent===yes&&Math.abs(c.joint[0]/c.joint[1]-joint)<1e-12&&Math.abs(c.product[0]/c.product[1]-product)<1e-12);assert.deepEqual(valid,[true,false,false,false]);}
});
test('coin pairs retain ordering and all probabilities sum to one',()=>{
 const probabilities=[];for(const a of[2/3,1/3])for(const b of[2/3,1/3])probabilities.push(a*b);near(probabilities.reduce((a,b)=>a+b),1);near(probabilities[1]+probabilities[2],val(at(781).parts[1].answer));near(probabilities[0]/(1-probabilities[3]),val(at(781).parts[3].answer));
});
test('distractors reproduce their stated error rather than arbitrary values',()=>{
 near(val(at(781).parts[1].distractors[2]),1-4/9);
 near(val(at(853).parts[0].distractors[2]),.47*(1-.22));
 near(val(at(855).parts[1].distractors[0]),(.1+.2+.5)/3);
 near(val(at(859).parts[0].distractors[1]),(.2+.75+.25)/3);
 near(val(at(901).parts[1].distractors[2]),.17*.7+.35*.95+.48*.94);
});
test('source bytes, original scores and complete event partitions remain unchanged',()=>{
 const canonical=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const c of cases){const r=at(c.index),s=canonical.find(x=>x.exerciseId===r.exerciseId);assert.equal(c.cells.reduce((n,x)=>n+x[2],0),c.scale);assert.equal(r.sourceLiteral,s.officialPrompt);assert.deepEqual(r.scoreEvidence,s.scoreEvidence);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);for(const q of c.queries)if(!q.independence&&q.d!=='all')assert.ok(q.n.every(i=>q.d.includes(i)));}
});
test('repeat and reverse order preserve every exact mathematical output',()=>{
 const sig=rs=>rs.map(x=>[x.exerciseId,x.sourceLiteral,x.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildSamplingBranchesBatch().batch.records));assert.deepEqual(sig(rows),sig(buildSamplingBranchesBatch('batch-0267',[...cases].reverse()).batch.records));
});

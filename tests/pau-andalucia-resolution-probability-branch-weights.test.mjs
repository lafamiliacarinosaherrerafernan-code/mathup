import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildBranchBatch} from '../scripts/resolve-andalucia-probability-branch-weights.mjs';
const rows=buildBranchBatch().batch.records,at=i=>rows.find(x=>x.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
const val=s=>{const m=s.match(/^frac\{(-?\d+)\}\{(\d+)\}$/);return m?+m[1]/+m[2]:Number(s);};
test('nine official exercises retain twenty-two parts and sixty-six false options',()=>{
 assert.equal(rows.length,9);assert.equal(rows.flatMap(x=>x.parts).length,22);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);}
});
test('independent branch computations verify each answer and distinct alternatives',()=>{
 const expected=[[592,[.68+.2-(1-.27),.2-(.68+.2-(1-.27)),(.2-(.68+.2-(1-.27)))/(1-.68)]],[624,[.8*(1-.2),.8*.2+.2*(1-.1),.2*.1/(.8*.8+.2*.1)]],[644,[1-(.395-.6*.4-.3*.5)/.1,(.6*.4+.3*.5)/.395]],[664,[.7*.3+.3*.8,.7*.3/(.7*.3+.3*.8)]],[665,[.1*(1-.8),.9*.05/(.1*.8+.9*.05)]],[682,[.4*.05+.35*.03+.25*.02,.4*.05/(.4*.05+.35*.03+.25*.02)]],[724,[14*13/(22*21),2*14*8/(22*21),8*7/(22*21)]],[733,[(2/3)*.75+(1/3)*.2,(2/3)*.25/((2/3)*.25+(1/3)*.8)]],[744,[(50/250)*(20/250),(1-50/250)*(1-20/250),20/250]]];
 for(const[i,values]of expected)for(const[j,v]of values.entries()){const p=at(i).parts[j],xs=[p.answer,...p.distractors].map(val);near(xs[0],v);assert.ok(xs.every(x=>Number.isFinite(x)&&x>=0&&x<=1));assert.equal(xs.filter(x=>Math.abs(x-v)<1e-12).length,1);assert.equal(new Set(xs.map(x=>x.toFixed(12))).size,4);}
});
test('commission enumeration independently counts all unordered pairs without replacement',()=>{
 let mm=0,mh=0,hh=0;for(let i=0;i<22;i++)for(let j=i+1;j<22;j++){if(i<14&&j<14)mm++;else if(i>=14&&j>=14)hh++;else mh++;}
 assert.deepEqual([mm,mh,hh],[91,112,28]);for(const[n,j]of[[mm,0],[mh,1],[hh,2]])near(val(at(724).parts[j].answer),n/(mm+mh+hh));
});
test('unknown university branch is recovered from total probability, not invented',()=>{
 const nonEmploymentC=(.395-.6*.4-.3*.5)/.1;near(nonEmploymentC,.05);near(.6*.4+.3*.5+.1*nonEmploymentC,.395);near(val(at(644).parts[0].answer)+nonEmploymentC,1);
});
test('source bytes, editorial evidence, conditioned sets and partitions remain valid',()=>{
 const canonical=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const c of cases){const r=at(c.index),s=canonical.find(x=>x.exerciseId===r.exerciseId);assert.equal(c.cells.reduce((n,x)=>n+x[2],0),c.scale);assert.equal(r.sourceLiteral,s.officialPrompt);assert.deepEqual(r.scoreEvidence,s.scoreEvidence);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);for(const q of c.queries)if(q.d!=='all')assert.ok(q.n.every(i=>q.d.includes(i)));}
});
test('repeat and reverse order preserve exact mathematical outputs',()=>{
 const sig=rs=>rs.map(x=>[x.exerciseId,x.sourceLiteral,x.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildBranchBatch().batch.records));assert.deepEqual(sig(rows),sig(buildBranchBatch('batch-0266',[...cases].reverse()).batch.records));
});

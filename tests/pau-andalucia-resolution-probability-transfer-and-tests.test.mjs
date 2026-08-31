import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildTransferBatch} from '../scripts/resolve-andalucia-probability-transfer-and-tests.mjs';
const rows=buildTransferBatch().batch.records,at=i=>rows.find(x=>x.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
const val=s=>{const pct=s.endsWith('%'),text=s.replace(/%$/,''),m=text.match(/^frac\{(-?\d+)\}\{(\d+)\}$/);return (m?+m[1]/+m[2]:Number(text))/(pct?100:1);};
test('six official exercises, eighteen official parts, fifty-four false options',()=>{
 assert.equal(rows.length,6);assert.equal(rows.flatMap(x=>x.parts).length,18);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);}
});
test('seventeen numeric answers independently verified from official inputs',()=>{
 const expected=[[1333,[(4/7)*(5/9)+(3/7)*(6/9),(3/7)*(3/9)/((4/7)*(4/9)+(3/7)*(3/9))]],[1360,[.6-.04,.8-(.6-.04),(.6-.04)/.8]],[1365,[(2/7)*.25+(5/7)*.4,(2/7)*.25/((2/7)*.25+(5/7)*.4),(5/7)*.6]],[1388,[.25+.7-.1,.1/.7,.25+.7-2*.1]],[1438,[1-(.7+.25-.2),(1-(.7+.25-.2))/.3,(.25-.2)/.25]],[1492,[.05*.96/(.05*.96+.95*.1),.95*.9,.95*.9/(.05*.04+.95*.9)]]];
 let count=0;for(const[i,vs]of expected)for(const[j,v]of vs.entries()){const p=at(i).parts[j],xs=[p.answer,...p.distractors].map(val);near(xs[0],v);assert.ok(xs.every(x=>Number.isFinite(x)&&x>=0&&x<=1));assert.equal(xs.filter(x=>Math.abs(x-v)<1e-12).length,1);assert.equal(new Set(xs.map(x=>x.toFixed(12))).size,4);count++;}assert.equal(count,17);
});
test('joint and product show non-independence without confusing percentages and probabilities',()=>{
 const e=at(1360).parts[3].verification.numericalEvidence,j=.56,p=.6*.8;assert.equal(e.independent,false);near(e.J/e.N,j);near(e.R*e.C/e.N**2,p);
 assert.deepEqual(e.optionClaims.map(c=>!c.independent&&Math.abs(c.joint[0]/c.joint[1]-j)<1e-12&&Math.abs(c.product[0]/c.product[1]-p)<1e-12),[true,false,false,false]);
 assert.deepEqual(at(1360).parts.slice(0,3).map(p=>p.answer),['56%','24%','70%']);
});
test('transfer is checked by enumerating physical balls after each possible first selection',()=>{
 let black=0,white=0,firstBlackSecondWhite=0;
 for(const first of['B','B','B','B','N','N','N'])for(const second of['B','B','B','N','N','N','N','N',first]){if(second==='N')black++;else{white++;if(first==='N')firstBlackSecondWhite++;}}
 assert.equal(black+white,63);near(black/63,val(at(1333).parts[0].answer));near(firstBlackSecondWhite/white,val(at(1333).parts[1].answer));
});
test('wrong outcomes implement specific transfer, conditioning and independence mistakes',()=>{
 near(val(at(1333).parts[0].distractors[1]),(5/9+6/9)/2);near(val(at(1360).parts[0].distractors[0]),.6*.8);near(val(at(1360).parts[2].distractors[2]),.56/.6);
 near(val(at(1365).parts[0].distractors[0]),(.25+.4)/2);near(val(at(1388).parts[1].distractors[2]),.1/.25);
 near(val(at(1438).parts[0].distractors[0]),.3*.75);near(val(at(1492).parts[0].distractors[2]),.96/(.96+.1));near(val(at(1492).parts[2].distractors[2]),.9/(.9+.04));
});
test('official source and editorial evidence are immutable and every conditioned numerator belongs to its universe',()=>{
 const cs=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const c of cases){const r=at(c.index),s=cs.find(x=>x.exerciseId===r.exerciseId);assert.equal(c.cells.reduce((n,x)=>n+x[2],0),c.scale);assert.equal(r.sourceLiteral,s.officialPrompt);assert.deepEqual(r.scoreEvidence,s.scoreEvidence);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);for(const q of c.queries)if(!q.independence&&q.d!=='all')assert.ok(q.n.every(i=>q.d.includes(i)));}
});
test('generation is deterministic and independent of exercise order',()=>{
 const sig=rs=>rs.map(x=>[x.exerciseId,x.sourceLiteral,x.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildTransferBatch().batch.records));assert.deepEqual(sig(rows),sig(buildTransferBatch('batch-0270',[...cases].reverse()).batch.records));
});

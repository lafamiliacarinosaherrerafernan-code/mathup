import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildDiceSurveyBatch} from '../scripts/resolve-andalucia-probability-dice-and-surveys.mjs';
const rows=buildDiceSurveyBatch().batch.records,at=i=>rows.find(x=>x.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
const val=s=>{const m=s.match(/^frac\{(-?\d+)\}\{(\d+)\}$/);return m?+m[1]/+m[2]:Number(s);};
test('nine source-read exercises preserve twenty-five official parts and seventy-five false options',()=>{
 assert.equal(rows.length,9);assert.equal(rows.flatMap(x=>x.parts).length,25);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);}
});
test('independent direct computations verify twenty-four probabilities and all numeric options',()=>{
 const expected=[[1081,[.3*.95+.7*.6,.3*.95/(.3*.95+.7*.6)]],[1103,[(2/5)/3+(3/5)/2,2/5+(3/5)/2]],[1172,[(26/36)*(3/9),(10/36)*(4/9)+(26/36)*(6/9)]],[1198,[16/36,(20/36)*(6/36),16/36+(20/36)*(6/36)]],[1201,[.9+.6-.55,(.6-.55)/.1,1-(.9+.6-.55)]],[1214,[(3/6)**3,3*(2/6)**2*(1/6),6*(3/6)*(2/6)*(1/6)]],[1228,[.15*.92/(.15*.92+.85*.04),.15*.08,.15*.08/(.15*.08+.85*.96)]],[1271,[.4*.7+.6*.2,.4*.7/(.4*.7+.6*.2)]],[1272,[.85*.35,1-.15*.65,.15*.65,.35]]];
 let count=0;for(const[i,vs]of expected)for(const[j,v]of vs.entries()){const p=at(i).parts[j],xs=[p.answer,...p.distractors].map(val);near(xs[0],v);assert.ok(xs.every(x=>Number.isFinite(x)&&x>=0&&x<=1));assert.equal(xs.filter(x=>Math.abs(x-v)<1e-12).length,1);assert.equal(new Set(xs.map(x=>x.toFixed(12))).size,4);count++;}assert.equal(count,24);
});
test('independence conclusion checks the joint, product and every false claim',()=>{
 const e=at(1271).parts[2].verification.numericalEvidence,joint=.6*.8,product=.6*(.4*.3+.6*.8);near(e.J/e.N,joint);near(e.R*e.C/e.N**2,product);assert.equal(e.independent,false);
 assert.deepEqual(e.optionClaims.map(c=>!c.independent&&Math.abs(c.joint[0]/c.joint[1]-joint)<1e-12&&Math.abs(c.product[0]/c.product[1]-product)<1e-12),[true,false,false,false]);
});
test('dice probabilities independently enumerate physical faces, two rounds, and unequal labels',()=>{
 const pairs=[];for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)pairs.push(a+b);
 assert.equal(pairs.filter(x=>x>=9).length,10);assert.equal(pairs.filter(x=>x===2||x>7).length,16);assert.equal(pairs.filter(x=>x>9).length,6);
 let first=0,second=0,loss=0;for(const x of pairs)for(const y of pairs){if(x===2||x>7)first++;else if(y>9)second++;else loss++;}
 near(first/1296,val(at(1198).parts[0].answer));near(second/1296,val(at(1198).parts[1].answer));near((first+second)/1296,val(at(1198).parts[2].answer));assert.equal(first+second+loss,1296);
 const outcomes=[];for(const a of['1','1','1','X','X','2'])for(const b of['1','1','1','X','X','2'])for(const c of['1','1','1','X','X','2'])outcomes.push([a,b,c]);
 const predicates=[xs=>xs.every(x=>x==='1'),xs=>xs.filter(x=>x==='X').length===2&&xs.includes('2'),xs=>new Set(xs).size===3];
 for(const[i,predicate]of predicates.entries())near(outcomes.filter(predicate).length/216,val(at(1214).parts[i].answer));
});
test('distractors reproduce common direction, equiprobability, and missing branch errors',()=>{
 near(val(at(1081).parts[0].distractors[0]),(.95+.6)/2);near(val(at(1103).parts[1].distractors[0]),2/5+(2/5)/3+(3/5)/2);
 near(val(at(1172).parts[1].distractors[0]),(4/9+6/9)/2);near(val(at(1198).parts[1].distractors[1]),(16/36)*(6/36));
 near(val(at(1214).parts[1].distractors[2]),3*(2/6)*(1/6)**2);near(val(at(1214).parts[2].distractors[1]),6/27);
 near(val(at(1228).parts[2].distractors[2]),.08/(.08+.96));near(val(at(1272).parts[1].distractors[2]),1-.85*.65);
});
test('official statements, score evidence and source hashes are retained without inferred dates or subjects',()=>{
 const source=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const c of cases){const r=at(c.index),s=source.find(x=>x.exerciseId===r.exerciseId);assert.equal(c.cells.reduce((n,x)=>n+x[2],0),c.scale);assert.equal(r.sourceLiteral,s.officialPrompt);assert.deepEqual(r.scoreEvidence,s.scoreEvidence);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);for(const q of c.queries)if(!q.independence&&q.d!=='all')assert.ok(q.n.every(i=>q.d.includes(i)));}
});
test('source-bound results reproduce under repeated and reversed input order',()=>{
 const sig=rs=>rs.map(x=>[x.exerciseId,x.sourceLiteral,x.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildDiceSurveyBatch().batch.records));assert.deepEqual(sig(rows),sig(buildDiceSurveyBatch('batch-0269',[...cases].reverse()).batch.records));
});

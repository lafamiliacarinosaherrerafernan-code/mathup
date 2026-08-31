import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildEventBatch} from '../scripts/resolve-andalucia-probability-event-models.mjs';
const rows=buildEventBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i);
const number=s=>{const m=s.match(/^frac\{(-?\d+)\}\{(\d+)\}%?$/);return m?+m[1]/+m[2]:Number(s.replace('%',''));};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
test('nine official exercises, twenty-eight fully developed subparts, eighty-four plausible distractors',()=>{
 assert.equal(rows.length,9);assert.equal(rows.flatMap(r=>r.parts).length,28);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);assert.ok(!p.prompt.match(/\(\d+(?:[.,]\d+)? puntos?\)/));}
});
test('numerical answers and every distractor checked against independently calculated event probabilities',()=>{
 const answer=new Map([
  [409,[1-(1/7+1/8+1/5)/3,1/3/5,(1/7+1/5)/(1/7+1/8+1/5),(7/8+4/5)/(6/7+7/8+4/5)]],
  [451,[.3*.05+.7*.2,.3*.95/(.3*.95+.7*.8)]],
  [1088,[1-(.4+.3-.2),(.4-.2)/.4]],
  [1089,[100*.6*.5,1-(.45+.6-.6*.5),(.6-.6*.5)/(1-.45)]],
  [442,[(1-.35)+.55-((1-.35)-.3),(.55-((1-.35)-.3))/.35,1-((1-.35)+.55-((1-.35)-.3))]],
  [1090,[.7-.5+.4,(.4-(.4+.3-.5))/(1-.3),(1-.6)*(1-.8)]],
  [1490,[6*6]],
  [1497,[6/16,3/6,null,13/16]]
 ]);
 for(const[index,values]of answer)values.forEach((v,i)=>{if(v===null)return;const p=at(index).parts[i],numbers=[p.answer,...p.distractors].map(number);assert.ok(numbers.every(Number.isFinite));near(numbers[0],v);assert.equal(numbers.filter(x=>Math.abs(x-v)<1e-12).length,1);assert.equal(new Set(numbers.map(x=>x.toFixed(12))).size,4);});
});
test('independence conclusions and their numeric explanations have exactly one mathematically true option',()=>{
 const expected=new Map([[1088,[100,40,30,20]],[442,[100,65,55,35]],[1183,[100,80,50,40]],[1490,[36,9,18,6]],[1497,[16,6,10,3]]]);
 for(const [i,[N,R,C,J]] of expected){const p=at(i).parts.find(p=>p.verification.method==='EXACT_JOINT_PRODUCT_AND_CONDITIONAL_COMPARISON');assert.ok(p);const v=p.verification.numericalEvidence;
 assert.deepEqual([v.N,v.R,v.C,v.J],[N,R,C,J]);
 const truth=v.optionClaims.map(o=>o.independent===(J*N===R*C)&&Math.abs(o.joint[0]/o.joint[1]-J/N)<1e-12&&Math.abs(o.product[0]/o.product[1]-R*C/N/N)<1e-12);assert.deepEqual(truth,[true,false,false,false]);
 const signatures=v.optionClaims.map(o=>JSON.stringify([o.independent,o.joint[0]/o.joint[1],o.product[0]/o.product[1]]));assert.equal(new Set(signatures).size,4);
 }
});
test('nested official questions and two requested probabilities retain their labels and exact tuple answers',()=>{
 for(const[index,k,expected]of[[1183,0,[.9,.5]],[1490,1,[.25,.5]]]){
 const p=at(index).parts[k],v=p.verification.numericalEvidence;v.values.forEach(([n,d],j)=>near(n/d,expected[j]));
 const tuples=[v.values,...v.bad].map(t=>t.map(([n,d])=>n/d));assert.equal(new Set(tuples.map(t=>JSON.stringify(t))).size,4);assert.deepEqual(tuples.map(t=>t.every((x,j)=>Math.abs(x-expected[j])<1e-12)),[true,false,false,false]);
 }
 assert.match(at(1183).parts[0].prompt,/i\)/);assert.match(at(1183).parts[0].prompt,/ii\)/);
 assert.equal(at(1183).parts.length,2);assert.equal(at(1089).parts[0].answer,'30%');
});
test('physical dice and the sixteen official integers independently enumerate the source event sets',()=>{
 const dice=Array.from({length:36},(_,i)=>[Math.floor(i/6)+1,i%6+1]);assert.equal(dice.filter(([a,b])=>Math.max(a,b)<4).length,9);assert.equal(dice.filter(([a])=>a%2).length,18);assert.equal(dice.filter(([a,b])=>Math.max(a,b)<4&&a%2).length,6);
 const v=cases.find(c=>c.index===1497).values;assert.equal(new Set(v).size,16);
 assert.deepEqual(v.filter(x=>x%2),[225,201,193,167,215,171]);assert.deepEqual(v.filter(x=>x%5===0&&x>200),[225,210,215]);assert.equal(v.filter(x=>x>200||x%2===0).length,13);
});
test('official inputs and literal guards remain immutable; forward and reversed runs agree',()=>{
 const sha=b=>crypto.createHash('sha256').update(b).digest('hex');for(const r of rows){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);for(const t of r.correctionEvidence.parameters.literals)assert.ok(r.sourceLiteral.includes(t));}
 const normalize=rs=>rs.map(r=>[r.exerciseId,r.sourceLiteral,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(normalize(rows),normalize(buildEventBatch().batch.records));assert.deepEqual(normalize(rows),normalize(buildEventBatch('batch-0262',[...cases].reverse()).batch.records));
});

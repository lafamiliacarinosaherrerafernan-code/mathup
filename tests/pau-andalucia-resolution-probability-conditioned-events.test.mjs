import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildConditionedBatch} from '../scripts/resolve-andalucia-probability-conditioned-events.mjs';
import {sourceProjection,restoreText} from '../scripts/project-andalucia-inference-source-glyphs.mjs';
const rows=buildConditionedBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
const val=s=>{const m=s.match(/^frac\{(-?\d+)\}\{(\d+)\}%?$/);return m?+m[1]/+m[2]:Number(s.replace('%',''));};
test('eight source-bound exercises and twenty-one developed parts, with sixty-three distractors',()=>{
 assert.equal(rows.length,8);assert.equal(rows.flatMap(r=>r.parts).length,21);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);}
});
test('numeric answers and all alternatives independently checked from official event equations',()=>{
 const expected=[[74,0,.3*.01+.45*.03+.25*.02],[74,1,.45*.97/(.3*.99+.45*.97+.25*.98)],
 [109,0,4/6],[109,1,(4/6*3/5)/(4/6*3/5+2/6*4/5)],[121,0,9/36],
 [128,1,100*(1-.25-.10+.08)],[128,2,(.10-.08)/(1-.25)],
 [163,1,((1-.4)-.12)/(1-.4)],[178,0,.8+.6-.5],[178,1,(.6-.5)/(1-.8)],
 [405,2,1-.2],[411,1,1-3/7],[411,2,((1-2/3)-((1-5/7)+(1-2/3)-3/7))/(5/7)]];
 for(const [i,j,v]of expected){const p=at(i).parts[j],vs=[p.answer,...p.distractors].map(val);assert.ok(vs.every(Number.isFinite));near(vs[0],v);assert.equal(vs.filter(x=>Math.abs(x-v)<1e-12).length,1);assert.equal(new Set(vs.map(x=>x.toFixed(12))).size,4);}
});
test('all compound numeric answers and their distractors retain correct labelled scopes',()=>{
 for(const [i,j,expected]of[[163,0,[.6,.48]],[163,2,[.92,.52,.6]],[405,0,[.25,.35]]]){
  const v=at(i).parts[j].verification.numericalEvidence;
  const all=[v.values,...v.bad].map(t=>t.map(([n,d])=>n/d));all[0].forEach((x,k)=>near(x,expected[k]));
  assert.equal(new Set(all.map(x=>JSON.stringify(x))).size,4);assert.deepEqual(all.map(t=>t.every((x,k)=>Math.abs(x-expected[k])<1e-12)),[true,false,false,false]);
 }
});
test('independence and incompatibility are tested separately, with exactly one true complete claim',()=>{
 for(const [i,j,expected]of[[128,0,[100,25,10,8]],[178,2,[10,8,6,5]],[405,1,[20,7,5,4]]]){
  const v=at(i).parts[j].verification.numericalEvidence;assert.deepEqual([v.N,v.R,v.C,v.J],expected);const [N,R,C,J]=expected;
  assert.deepEqual(v.optionClaims.map(o=>o.independent===(J*N===R*C)&&Math.abs(o.joint[0]/o.joint[1]-J/N)<1e-12&&Math.abs(o.product[0]/o.product[1]-R*C/N/N)<1e-12),[true,false,false,false]);
 }
 const v=at(121).parts[1].verification.numericalEvidence;const joint=(1-.8)+(1-.7)-.5;near(joint,0);assert.deepEqual(v.claims.map(o=>o.yes&&Math.abs(o.joint-joint)<1e-12),[true,false,false,false]);
 const w=at(411).parts[0].verification.numericalEvidence;near(w.joint[0]/w.joint[1],4/21);near(w.product[0]/w.product[1],2/21);assert.deepEqual(w.claims.map(([ind,inc])=>!ind&&!inc),[true,false,false,false]);
});
test('physical card and dice enumerations independently reproduce reverse conditioning and sum counts',()=>{
 const cards=Array.from({length:6},(_,i)=>i),pairs=cards.flatMap(a=>cards.map(b=>[a,b]));
 for(const replacement of[true,false]){const possible=pairs.filter(([a,b])=>replacement||a!==b),conditioned=possible.filter(([,b])=>b<4),both=conditioned.filter(([a])=>a<4);near(both.length/conditioned.length,replacement?2/3:3/5);}
 const dice=Array.from({length:36},(_,i)=>[Math.floor(i/6)+1,i%6+1]);assert.equal(dice.filter(([a,b])=>(a+b)%4===0).length,9);
});
test('official formula recovery is source-hash-bound and reversible, without modifying source literals',()=>{
 const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
 for(const r of rows){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);for(const t of r.correctionEvidence.parameters.literals)assert.ok(r.sourceLiteral.includes(t));}
 for(const i of[74,121,163,405,411]){const r=at(i),p=sourceProjection({...r,queueIndex:i});assert.equal(restoreText(p.text,p.changes),r.sourceLiteral);assert.ok(p.evidence);}
 const projected=sourceProjection({...at(411),queueIndex:411});assert.match(projected.text,/P\(A∪B\) = frac\{3\}\{7\}/);assert.match(projected.text,/P\(Aᶜ\) = frac\{5\}\{7\}/);assert.match(projected.text,/P\(Bᶜ\) = frac\{2\}\{3\}/);
});
test('stable repeated and reversed processing leaves mathematical records unchanged',()=>{
 const signature=rs=>rs.map(r=>[r.exerciseId,r.sourceLiteral,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));
 assert.deepEqual(signature(rows),signature(buildConditionedBatch().batch.records));assert.deepEqual(signature(rows),signature(buildConditionedBatch('batch-0263',[...cases].reverse()).batch.records));
});

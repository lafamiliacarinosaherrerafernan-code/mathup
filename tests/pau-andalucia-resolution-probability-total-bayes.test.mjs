import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildTotalBayesBatch} from '../scripts/resolve-andalucia-probability-total-bayes.mjs';
const rows=buildTotalBayesBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
const val=s=>{const m=s.match(/^frac\{(-?\d+)\}\{(\d+)\}%?$/);return m?+m[1]/+m[2]:Number(s.replace('%',''));};
// Independent formulas use the actual source numbers, not solver cell weights.
const expected=[
 [229,[null,100*(1-.05-.20+.02),100*.02/.20]],
 [257,[.6*.3+.4*.6,.4*.4/(.6*.7+.4*.4)]],
 [268,[(250*.3+150*.32+100*.27)/500,250*.7/(250*.7+150*.68+100*.73),100*.27/500]],
 [312,[100*(1-.30-.13+.06),(.30-.06)/(1-.13)]],
 [313,[(46+34-16)/120,1-(46+34-16)/120,(46-16)/120,(46-16)/(120-34)]],
 [318,[(140*.05+100*.04+150*.02)/440,100*.96/(140*.95+100*.96+150*.98+50)]],
 [338,[.8*.95+.2*.98,.8*.05/(.8*.05+.2*.02)]],
 [342,[.45*.05+.55*.08,.45*.05/(.45*.05+.55*.08)]],
 [345,[1-.55-.17,.55/(.55+.17)]],
 [351,[.85*.9+.15*(1-.22),.85*.9/(.85*.9+.15*(1-.22))]],
 [379,[(5000*.95+10000*.2)/15000,5000*.95/15000,5000*.95/(5000*.95+10000*.2)]],
 [386,[.72*.64,.55+.72-.72*.64,(1-.55-.72+.72*.64)/(1-.55)]]
];
test('twelve complete official exercises, thirty developed parts and ninety distractors',()=>{
 assert.equal(rows.length,12);assert.equal(rows.flatMap(r=>r.parts).length,30);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.ok(p.solutionSteps.length>=6);assert.equal(p.distractorEvidence.length,3);}
});
test('all numerical results independently follow total probability and conditioned universe formulas',()=>{
 for(const [i,values]of expected){assert.equal(at(i).parts.length,values.length);for(const [j,v]of values.entries()){if(v===null)continue;const p=at(i).parts[j],all=[p.answer,...p.distractors].map(val);near(all[0],v);assert.ok(all.every(Number.isFinite));assert.equal(all.filter(x=>Math.abs(x-v)<1e-12).length,1);assert.equal(new Set(all.map(x=>x.toFixed(12))).size,4);}}
});
test('independence claim verifies both intersection and product; no answer key used as input',()=>{
 const v=at(229).parts[0].verification.numericalEvidence;assert.deepEqual([v.N,v.R,v.C,v.J],[100,5,20,2]);
 assert.deepEqual(v.optionClaims.map(o=>o.independent===false&&Math.abs(o.joint[0]/o.joint[1]-.02)<1e-12&&Math.abs(o.product[0]/o.product[1]-.01)<1e-12),[true,false,false,false]);
});
test('partitions are complete and each conditional numerator is inside its denominator',()=>{
 for(const c of cases){assert.equal(c.cells.reduce((n,x)=>n+x[2],0),c.scale);assert.ok(c.cells.every(x=>Number.isInteger(x[2])&&x[2]>=0));
  for(const q of c.queries){if(q.independence)continue;if(q.d!=='all')assert.ok(q.n.every(i=>q.d.includes(i)));const p=at(c.index).parts[c.queries.indexOf(q)];assert.ok(p.verification.numericalEvidence.denominator>0);}
 }
});
test('source hash, literal data and editorial scores remain immutable',()=>{
 const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
 const originals=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const r of rows){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);for(const s of r.correctionEvidence.parameters.literals)assert.ok(r.sourceLiteral.includes(s));assert.deepEqual(r.scoreEvidence,originals.find(x=>x.exerciseId===r.exerciseId).scoreEvidence);}
});
test('rerun and reverse order produce identical mathematical content',()=>{
 const sig=rs=>rs.map(r=>[r.exerciseId,r.sourceLiteral,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));
 assert.deepEqual(sig(rows),sig(buildTotalBayesBatch().batch.records));assert.deepEqual(sig(rows),sig(buildTotalBayesBatch('batch-0264',[...cases].reverse()).batch.records));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildBasketballDistanceBatch} from '../scripts/resolve-andalucia-source-read-basketball-distance.mjs';
const rows=buildBasketballDistanceBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('two official exercises include all six parts and eighteen false options',()=>{assert.equal(rows.length,2);assert.equal(rows.flatMap(r=>r.parts).length,6);for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractors.length,3);assert.ok(p.solutionSteps.length>=6);}});
test('independent 1000-match enumeration verifies total, Bayes and overtime jointly',()=>{
 const matches=Array.from({length:1000},(_,i)=>({home:i<400,win:i<240||(i>=400&&i<580),extra:i<24||(i>=400&&i<436)}));
 const num=fn=>matches.filter(fn).length;
 const refs=[num(x=>x.win)/1000,num(x=>x.home&&!x.win)/num(x=>!x.win),num(x=>x.win&&x.extra)/1000];
 const ps=at(1357).parts;refs.forEach((v,i)=>near(v,ps[i].verification.numericalEvidence.numerator/ps[i].verification.numericalEvidence.denominator));
 assert.deepEqual(refs,[.42,8/29,.06]);
 for(const p of ps){const v=p.verification.numericalEvidence,vals=[[v.numerator,v.denominator],...v.wrong];for(let i=0;i<4;i++){assert.ok(vals[i][0]>=0&&vals[i][0]<=vals[i][1]);for(let j=i+1;j<4;j++)assert.notEqual(vals[i][0]*vals[j][1],vals[j][0]*vals[i][1]);}}
});
test('official variance, not deviation, yields independently calculated NormalDist interval',()=>{
 const v=at(1376).parts[0].verification.numericalEvidence;near(v.se,15/7);near(v.interval[0],320.3498063337474);near(v.interval[1],329.6501936662526);assert.match(at(1376).parts[0].solutionSteps[0].math,/225 km²/);
});
test('310 is outside the 97-percent interval, not declared impossible',()=>{
 const p=at(1376).parts[1],v=p.verification.numericalEvidence;assert.equal(v.compatible,false);near(v.standardized,7);assert.ok(v.claim<v.interval[0]);assert.equal(new Set(v.optionClaims.map(x=>JSON.stringify(x))).size,4);assert.match(p.solutionSteps.at(-1).explanation,/no significa una imposibilidad/);
});
test('strict four-km width at 99 percent requires 374, not 373',()=>{
 const p=at(1376).parts[2],v=p.verification.numericalEvidence;near(v.bound,373.2129338074431);assert.equal(v.minimum,374);near(v.marginAtMinimum,1.9978944365903695);near(v.marginAtPrevious,2.0005707866671147);assert.ok(2*v.marginAtMinimum<4);assert.ok(2*v.marginAtPrevious>=4);assert.equal(v.strict,true);assert.match(p.solutionSteps[0].math,/2E < 4/);
});
test('every literal parameter and source document hash stays intact',()=>{
 for(const c of cases){const r=at(c.index);for(const l of c.literals)assert.ok(r.sourceLiteral.includes(l));assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);assert.equal(r.publicationState,'PARALLEL_VALIDATED_NOT_PUBLISHED');}
});
test('repeat and reverse preserve exact source and mathematical parts',()=>{const sig=rs=>rs.map(r=>[r.exerciseId,r.sourceLiteral,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildBasketballDistanceBatch().batch.records));assert.deepEqual(sig(rows),sig(buildBasketballDistanceBatch('batch-0275',[...cases].reverse()).batch.records));});

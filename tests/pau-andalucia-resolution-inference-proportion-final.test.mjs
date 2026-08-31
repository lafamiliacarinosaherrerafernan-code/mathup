import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,values,buildProportionBatch} from '../scripts/resolve-andalucia-inference-proportion-final.mjs';
const rows=buildProportionBatch().batch.records,at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i),close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
const refs={798:[1.9599639845400536,.040636770424652184,.05436322957534782,.1356367704246522],1435:[2.3263478740408408,.04351291928812958,.09934422356901326,.18637006214527244],1491:[1.8119106729525984,.034407606420205746,.20159239357979425,.2704076064202057]};
test('three official exercises have six complete parts with eighteen distinct plausible errors',()=>{
 assert.equal(rows.length,3);assert.equal(rows.flatMap(r=>r.parts).length,6);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=6);assert.doesNotMatch(JSON.stringify(p),/undefined|NaN/);}
});
test('intervals independently agree with Python statistics.NormalDist and all alternatives fail',()=>{
 for(const c of cases){const v=values(c),[z,e,l,u]=refs[c.index];close(v.z,z);close(v.margin,e);close(v.lower,l);close(v.upper,u);
 const options=[at(c.index).parts[0].answer,...at(c.index).parts[0].distractors];
 const displayTolerance=c.index===798?.000051:.000006;
 const correct=options.filter(s=>{const m=s.match(/\[([\d,.-]+);\s*([\d,.-]+)\]/);assert.ok(m);return Math.abs(Number(m[1].replace(',','.'))-l)<displayTolerance&&Math.abs(Number(m[2].replace(',','.'))-u)<displayTolerance;});assert.equal(correct.length,1);assert.equal(correct[0],options[0]);
 }
});
test('balance planning uses pilot estimate, ceil and prior-integer proof rather than universal guarantee',()=>{
 const p=at(798).parts[1],v=p.verification.numericalEvidence;close(v.bound,1426.0880881819965);assert.equal(v.minimum,1427);assert.ok(v.marginAtMinimum<=.02);assert.ok(v.marginAtPrevious>.02);
 assert.match(JSON.stringify(p.solutionSteps),/no una garantía uniforme/);assert.equal([p.answer,...p.distractors].filter(s=>Number(s.split('=')[1])===1427).length,1);
});
test('adult proportion is compatible, not proven; three false comparison mechanisms',()=>{
 const p=at(1435).parts[1],v=p.verification.numericalEvidence;assert.equal(v.target,2/15);assert.equal(v.compatible,true);assert.ok(v.target>v.lower&&v.target<v.upper);assert.ok(1-v.target>v.upper);
 assert.match(JSON.stringify(p.solutionSteps),/no prueba/);
 const assertions=[v.lower<v.target&&v.target<v.upper,v.target<v.lower,v.target>v.upper,v.lower<1-v.target&&1-v.target<v.upper];assert.deepEqual(assertions,[true,false,false,false]);
});
test('worker margin is half width, with no unknown true-error claim',()=>{
 const p=at(1491).parts[1],v=p.verification.numericalEvidence;close((v.upper-v.lower)/2,refs[1491][1]);
 assert.equal([p.answer,...p.distractors].filter(s=>Math.abs(Number(s.split('≈')[1].trim().replace(',','.'))-refs[1491][1])<.000006).length,1);
 assert.match(JSON.stringify(p.solutionSteps),/No conocemos el error real/);
});
test('official hashes, exact source parameters, reproducibility and reverse order remain intact',()=>{
 const sha=x=>crypto.createHash('sha256').update(x).digest('hex');for(const r of rows)assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);
 const norm=rs=>rs.map(r=>[r.exerciseId,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(norm(rows),norm(buildProportionBatch().batch.records));assert.deepEqual(norm(rows),norm(buildProportionBatch('batch-0258',[...cases].reverse()).batch.records));
 assert.throws(()=>buildProportionBatch('not-consumed',[{...cases[0],literals:['invented data']}]))
 assert.equal(sha(fs.readFileSync('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl')),'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

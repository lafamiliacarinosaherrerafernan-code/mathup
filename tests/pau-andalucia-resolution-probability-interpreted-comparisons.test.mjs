import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildComparisonBatch} from '../scripts/resolve-andalucia-probability-interpreted-comparisons.mjs';
const rows=buildComparisonBatch().batch.records,at=i=>rows.find(x=>x.correctionEvidence.parameters.index===i);
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-12,`${x} != ${y}`);
const val=s=>{const m=s.match(/^frac\{(\d+)\}\{(\d+)\}$/);return m?+m[1]/+m[2]:Number(s);};
test('three official exercises, eight parts and twenty-four plausible incorrect options',()=>{
 assert.equal(rows.length,3);assert.equal(rows.flatMap(r=>r.parts).length,8);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);}
});
test('numeric probabilities checked independently from the source totals and conditional constraints',()=>{
 const expected=[[1095,0,(20000-12000+25000-15000)/45000],[1401,0,(54-29-(19-(29-21)))/54],[1401,1,21/(54-19)],[1244,0,1-.3-.5],[1244,1,1-.3*.4/.25],[1244,2,.3+.3*.4/.25-2*.3*.4]];
 for(const[i,j,correct]of expected){const p=at(i).parts[j],xs=[p.answer,...p.distractors].map(val);near(xs[0],correct);assert.ok(xs.every(x=>Number.isFinite(x)&&x>=0&&x<=1));assert.equal(xs.filter(x=>Math.abs(x-correct)<1e-12).length,1);assert.equal(new Set(xs.map(x=>x.toFixed(12))).size,4);}
});
test('factory comparison checks both posteriors and the winning factory, never equal factory selection',()=>{
 const e=at(1095).parts[1].verification.numericalEvidence,expected=[12000/27000,15000/27000];
 assert.deepEqual(e.optionClaims.map(c=>c.winner===2&&c.posterior.every((v,i)=>Math.abs(v-expected[i])<1e-12)),[true,false,false,false]);
 const weights=new Array(12000).fill('1A').concat(new Array(8000).fill('1B'),new Array(15000).fill('2A'),new Array(10000).fill('2B'));
 near(weights.filter(x=>x[1]==='B').length/weights.length,val(at(1095).parts[0].answer));
 near(weights.filter(x=>x==='2A').length/weights.filter(x=>x[1]==='A').length,5/9);
});
test('accident table is uniquely reconstructed and the assertion is assessed within the study',()=>{
 const feasible=[];for(let jn=0;jn<=19;jn++)for(let sv=0;sv<=54;sv++){const jv=29-jn,sn=19-jn;if(jv===21&&jn+jv+sn+sv===54)feasible.push([jn,jv,sn,sv]);}
 assert.deepEqual(feasible,[[8,21,11,14]]);
 const e=at(1401).parts[2].verification.numericalEvidence;assert.deepEqual(e.cells.map(x=>x[2]),feasible[0]);
 assert.deepEqual(e.optionClaims.map(c=>c.assertion===false&&c.youngNew===8&&c.seniorNew===11),[true,false,false,false]);
 assert.match(at(1401).parts[2].solutionSteps.at(-1).explanation,/No concluimos/);
});
test('religion inference does not fabricate the sex distribution of the other religion categories',()=>{
 const cells=cases.find(x=>x.index===1244).cells;near((cells[0][2]/50)/.3,.4);near((cells[0][2]/50)/.48,.25);
 assert.equal(cells.reduce((n,x)=>n+x[2],0),50);assert.match(at(1244).parts[1].solutionSteps[0].explanation,/no inventamos/);
 near(val(at(1244).parts[2].distractors[0]),.3+.48-.12);near(val(at(1244).parts[2].distractors[1]),.3+.48);
});
test('official literals, subject and hashes remain source-bound',()=>{
 const source=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const r of rows){const c=source.find(x=>x.exerciseId===r.exerciseId);assert.equal(r.sourceLiteral,c.officialPrompt);assert.equal(r.parts.length,c.subparts.length);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);assert.deepEqual(r.sourceSubparts,c.subparts);}
});
test('source-read generation is reproducible under reversed order',()=>{
 const sig=rs=>rs.map(x=>[x.exerciseId,x.parts,x.sourceLiteral]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildComparisonBatch().batch.records));assert.deepEqual(sig(rows),sig(buildComparisonBatch('batch-0272',[...cases].reverse()).batch.records));
});

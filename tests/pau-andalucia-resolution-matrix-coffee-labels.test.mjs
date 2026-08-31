import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {cases,coffeeLabels,buildCoffeeBatch} from '../scripts/resolve-andalucia-matrix-coffee-labels.mjs';
import {coffeeMatrixAnchor} from '../scripts/andalucia-matrix-coffee-pdf-evidence.mjs';
const row=()=>buildCoffeeBatch('coffee-test').batch.records[0],sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
test('official coffee exercise: dimensions, sum and defined product independently recomputed',()=>{const e=row().parts[0].verification.numericalEvidence;
 assert.deepEqual(e.sum,[[2,6,-2],[0,1,-2]]);assert.deepEqual(e.MN,[[10,3],[4,-1]]);assert.deepEqual(mul(e.M,e.N),e.MN);
 assert.deepEqual(e.sum,e.M.map((r,i)=>r.map((x,j)=>x+e.Nt[i][j])));assert.notDeepEqual(e.wrongSum,e.sum);assert.equal(e.wrongMN.length,3);assert.equal(e.MN.length,2);
 // M transpose has two columns, whereas N has three rows.
 assert.equal(e.M.length,2);assert.equal(e.N.length,3);assert.notEqual(e.M.length,e.N.length);
});
test('coffee revenues use exact cents and distinct row/column roles',()=>{const e=row().parts[1].verification.numericalEvidence;
 const expected=[[291000,418400],[137200,197200]];
 const calc=e.P.map(r=>e.Qc.map(prices=>r.reduce((s,x,j)=>s+x*prices[j],0)));
 assert.deepEqual(calc,expected);assert.deepEqual(e.cents,expected);assert.deepEqual(e.R,[[2910,4184],[1372,1972]]);
 assert.notDeepEqual(e.swapped,e.R);assert.notDeepEqual(e.ignored,e.R);assert.notEqual(e.R[0][0],e.R[1][1]);
 assert.deepEqual(e.labels,coffeeLabels);for(const m of coffeeLabels.matrices){assert.deepEqual(m.rowHeaders,['natural','descafeinado']);assert.deepEqual(m.columnHeaders,['A','B','C']);assert.equal(m.values.length,2);assert.ok(m.values.every(r=>r.length===3));}
});
test('coffee evidence keeps both complete parts and six plausible distinct distractors without modifying the source',()=>{const r=row();assert.equal(sha(r.officialSource.path),r.officialSource.documentHash);assert.equal(r.parts.length,2);assert.deepEqual(r.parts.map(x=>x.partId),['a','b']);
 for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=7);}
 assert.deepEqual(r.statementLayout,{...coffeeLabels,anchor:coffeeMatrixAnchor,partId:'b'});assert.equal(r.examSlot,1);
});
test('coffee batch is reproducible and preserves official files, queue and runtime',()=>{const paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js',row().officialSource.path],before=paths.map(sha);
 assert.deepEqual(row(),row());assert.deepEqual(row(),buildCoffeeBatch('coffee-test',[...cases].reverse()).batch.records[0]);assert.deepEqual(paths.map(sha),before);
});

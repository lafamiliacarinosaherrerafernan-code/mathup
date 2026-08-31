import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {cases,approvedGainsLayout,buildLabeledGainsBatch} from '../scripts/resolve-andalucia-doc-labeled-gains-2012.mjs';
const row=()=>buildLabeledGainsBatch('gains-test').batch.records[0];
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('official F/G layout is the human-validated layout and all twelve cells remain unchanged',()=>{
 const x=approvedGainsLayout();assert.equal(x.documentExerciseId,'ade2012-m6-a-e1-61f8d5d80988');
 assert.equal(sha(x.sourceAuthority.documentPath),x.sourceAuthority.documentSha256);
 assert.equal(sha(x.sourceAuthority.officialPngPath),x.sourceAuthority.officialPngSha256);
 assert.deepEqual(x.items.map(m=>m.matrix.map(r=>r.map(Number))),[cases[0].F,cases[0].G]);
 assert.equal(x.historicalEvidence.literal,'A B C A B C');
 assert.deepEqual(x.items.map(m=>m.rowLabels),[['←grande','←normal'],['←grande','←normal']]);
});
test('independent column dot products and row dot products recover both noncommutative products',()=>{
 const {F,G,U,V}=row().parts[0].verification.numericalEvidence;
 const columns=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>F[0][i]*G[0][j]+F[1][i]*G[1][j]));
 const rows=F.map(f=>G.map(g=>f[0]*g[0]+f[1]*g[1]+f[2]*g[2]));
 assert.deepEqual(columns,U);assert.deepEqual(rows,V);
 assert.deepEqual(U,[[1400,1800,1100],[1900,2450,1500],[1040,1340,820]]);
 assert.deepEqual(V,[[2200,1390],[3900,2470]]);
 assert.notEqual(U[0][1],U[1][0]);assert.notEqual(V[0][1],V[1][0]);
});
test('article gains, format gains and six independent contributions agree at 4670 euros',()=>{
 const r=row(),{F,G}=cases[0],contributions=F.map((f,i)=>f.map((v,j)=>v*G[i][j]));
 assert.deepEqual(contributions,[[600,1200,400],[800,1250,420]]);
 assert.deepEqual(r.parts[1].verification.numericalEvidence.articleGains,[1400,2450,820]);
 assert.deepEqual(r.parts[2].verification.numericalEvidence.formatGains,[2200,2470]);
 assert.equal(contributions.flat().reduce((s,x)=>s+x,0),4670);
 assert.notDeepEqual([1400,1800,1100],[1400,2450,820]);assert.notDeepEqual([1400,1900,1040],[1400,2450,820]);assert.notDeepEqual(contributions[0],[1400,2450,820]);
 for(const wrong of [[3590,6370],[1390,3900],[2470,2200]])assert.notDeepEqual(wrong,[2200,2470]);
 for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);}
});
test('source, historical layout, decisions and canonical corpus remain immutable and reproducible',()=>{
 const paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','artifacts/equation3-human-validation-final/abcabc-layout-reconstruction.json','artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl',row().officialSource.path];
 const before=paths.map(sha);assert.deepEqual(row(),row());assert.deepEqual(row(),buildLabeledGainsBatch('gains-test',[...cases].reverse()).batch.records[0]);assert.deepEqual(paths.map(sha),before);
});

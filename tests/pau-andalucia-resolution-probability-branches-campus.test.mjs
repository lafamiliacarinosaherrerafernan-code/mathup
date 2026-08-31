import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildCampusBatch} from '../scripts/resolve-andalucia-probability-branches-campus.mjs';
const rows=buildCampusBatch().batch.records,at=i=>rows.find(x=>x.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);
const val=s=>{const m=s.match(/^frac\{(-?\d+)\}\{(\d+)\}$/);return m?+m[1]/+m[2]:Number(s);};
test('eight official exercises retain twenty parts and sixty false options',()=>{
 assert.equal(rows.length,8);assert.equal(rows.flatMap(x=>x.parts).length,20);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);}
});
test('independent calculations validate every result and exclude equivalent options',()=>{
 const expected=[[954,[.48*.85+.52*.82,.52*.82/(.48*.85+.52*.82)]],[972,[(2/6)*.5+(4/6)*.25,(4/6)*.75/((2/6)*.5+(4/6)*.75)]],[982,[1-(.5*.1+(1/3)*.08+(1/6)*.05),.5*.1/(.5*.1+(1/3)*.08+(1/6)*.05)]],[984,[30*.7/50,(40-21)/20,9/10,(9+19)/50]],[994,[.42*.65+.32*.75+.26*.8,.42*.35,.26*.2/(.42*.35+.32*.25+.26*.2)]],[1011,[(2/4)*(2/4),1-(1/4)*(2/4),3/4]],[1026,[.55*.35+.30*.70+.15*.48,.15*.48/(.55*.35+.30*.70+.15*.48)]],[1058,[1-(.3*.2+.2*.55+.5*.1),.3*.2/(.3*.2+.2*.55+.5*.1)]]];
 for(const[i,values]of expected)for(const[j,v]of values.entries()){const p=at(i).parts[j],xs=[p.answer,...p.distractors].map(val);near(xs[0],v);assert.ok(xs.every(x=>Number.isFinite(x)&&x>=0&&x<=1));assert.equal(xs.filter(x=>Math.abs(x-v)<1e-12).length,1);assert.equal(new Set(xs.map(x=>x.toFixed(12))).size,4);}
});
test('outfits are checked by direct enumeration of garments, not equiprobable colors',()=>{
 const outfits=['R','R','A','B'].flatMap(t=>['R','A','B','B'].map(s=>[t,s]));const count=f=>outfits.filter(f).length;
 assert.equal(outfits.length,16);near(val(at(1011).parts[0].answer),count(([t,s])=>t==='R'&&s==='B')/16);near(val(at(1011).parts[1].answer),count(([t,s])=>!(t==='B'&&s==='B'))/16);near(val(at(1011).parts[2].answer),count(([,s])=>s!=='R')/16);
});
test('wrong options exactly reproduce unweighted averages and wrong complements',()=>{
 near(val(at(954).parts[0].distractors[0]),(.85+.82)/2);near(val(at(972).parts[0].distractors[0]),(.5+.25)/2);
 near(val(at(982).parts[0].distractors[0]),1-(.1+.08+.05)/3);near(val(at(984).parts[3].distractors[1]),30/50+19/50);
 near(val(at(994).parts[0].distractors[0]),(.65+.75+.2)/3);near(val(at(994).parts[0].distractors[1]),(.65+.75+.8)/3);near(val(at(994).parts[0].distractors[2]),.42*.65+.32*.75+.26*.2);
 near(val(at(1026).parts[0].distractors[1]),.55*.65+.3*.7+.15*.48);near(val(at(1058).parts[0].distractors[0]),1-(.2+.55+.1)/3);
});
test('official sources, scores, partitions and conditioned universes are preserved',()=>{
 const canonical=fs.readFileSync('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 for(const c of cases){const r=at(c.index),s=canonical.find(x=>x.exerciseId===r.exerciseId);assert.equal(c.cells.reduce((n,x)=>n+x[2],0),c.scale);assert.equal(r.sourceLiteral,s.officialPrompt);assert.deepEqual(r.scoreEvidence,s.scoreEvidence);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(r.officialSource.path)).digest('hex'),r.officialSource.documentHash);for(const q of c.queries)if(q.d!=='all')assert.ok(q.n.every(i=>q.d.includes(i)));}
});
test('repeat and reverse order preserve all source-linked mathematical results',()=>{
 const sig=rs=>rs.map(x=>[x.exerciseId,x.sourceLiteral,x.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(sig(rows),sig(buildCampusBatch().batch.records));assert.deepEqual(sig(rows),sig(buildCampusBatch('batch-0268',[...cases].reverse()).batch.records));
});

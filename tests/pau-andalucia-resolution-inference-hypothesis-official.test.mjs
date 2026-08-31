import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,sourceImages,buildOfficialHypothesisBatch} from '../scripts/resolve-andalucia-inference-hypothesis-official.mjs';
import {hypothesisValues} from '../scripts/resolve-andalucia-inference-confidence-and-tests.mjs';
const records=buildOfficialHypothesisBatch().batch.records,at=i=>records.find(r=>r.correctionEvidence.parameters.index===i);
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const nums=s=>[...s.matchAll(/-?\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace(',','.')));
// Independently calculated using Python statistics.NormalDist and math.erfc.
const reference=[
 [232,0,-2.4,1.9599639845400536,.016395071849192273,true],
 [913,0,2.6666666666666665,2.3263478740408408,.0038303805675897395,true],
 [1025,0,-3.3333333333333335,1.6448536269514715,.0004290603331968374,true],
 [1093,0,-10,1.6448536269514715,7.619853024160595e-24,true],
 [1193,0,1.855202893965451,1.6448536269514715,.0317836292930276,true],
 [1193,1,1.855202893965451,1.8807936081512504,.0317836292930276,false],
 [1232,0,-.9759000729485288,2.5758293035489,.3291139859786103,false],
];
test('six official exercises retain seven scopes without inventing subparts',()=>{
 assert.equal(records.length,6);assert.equal(records.reduce((s,r)=>s+r.parts.length,0),7);
 assert.equal(records.filter(r=>r.deliveryScope==='WHOLE_OFFICIAL_EXERCISE').length,5);
 for(const r of records){if(r.parts.length===1){assert.equal(r.parts[0].partId,'whole');assert.equal(r.sourceSubparts.length,0);assert.equal(r.parts[0].prompt,r.sourceLiteral);}else assert.deepEqual(r.parts.map(p=>p.partId),['a','b']);}
});
test('independent tail probabilities and seven decisions agree',()=>{
 for(const [i,k,z,cut,p,rejected]of reference){const c=cases.find(c=>c.index===i),v=hypothesisValues(c,c.levels[k]);close(v.z,z);close(v.cut,cut);close(v.pValue,p);assert.equal(v.rejected,rejected);}
});
test('the sample is actually summed and variance is square-rooted',()=>{
 const c=cases.find(c=>c.index===1193);close(c.sample.reduce((a,b)=>a+b,0),125.8);close(c.center,12.58);assert.equal(c.sigma,Math.sqrt(2.25));
 for(const p of at(1193).parts){assert.ok(p.solutionSteps.some(s=>s.math.includes('125,8')));assert.ok(p.solutionSteps.some(s=>s.math.includes('√(2,25)')));assert.ok(!p.solutionSteps.some(s=>s.explanation.includes('ya está proporcionada')));}
 assert.ok(at(232).parts[0].solutionSteps.some(s=>s.math.includes('√(25)')));
});
test('each four-choice set has exactly one mathematically correct full answer',()=>{
 for(const [i,k,z,cut,_p,rejected]of reference){const c=cases.find(c=>c.index===i),p=at(i).parts[k];
  const valid=s=>{const [t,x]=nums(s);return Math.abs(t-(c.tail==='left'?-cut:cut))<1e-5&&Math.abs(x-z)<1e-5&&s.includes('no se rechaza')===!rejected;};
  assert.ok(valid(p.answer));assert.equal([p.answer,...p.distractors].filter(valid).length,1);
  assert.equal(new Set([p.answer,...p.distractors].map(s=>JSON.stringify([nums(s),s.includes('no se rechaza')]))).size,4);
  assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=9);assert.equal(p.finalAnswer,p.answer);
 }
});
test('each conclusion addresses the original claim without claiming H0 proven',()=>{
 assert.match(at(232).parts[0].solutionSteps.at(-1).explanation,/funcionamiento correcto/);
 assert.match(at(913).parts[0].solutionSteps.at(-1).explanation,/ha aumentado/);
 assert.match(at(1025).parts[0].solutionSteps.at(-1).explanation,/no demuestra por sí solo cuál es la causa/);
 assert.match(at(1093).parts[0].solutionSteps.at(-1).explanation,/Se rechaza la afirmación/);
 assert.match(at(1193).parts[0].solutionSteps.at(-1).explanation,/se rechaza la sospecha/);
 assert.match(at(1193).parts[1].solutionSteps.at(-1).explanation,/no confirma que sea verdadera/);
 assert.match(at(1232).parts[0].solutionSteps.at(-1).explanation,/No se puede concluir que sea cierta/);
});
test('six PDF page images and official bytes are unchanged',()=>{
 for(const r of records){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),sourceImages[i]);assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);}
});
test('official hypothesis construction is reproducible and order invariant',()=>{
 const norm=rs=>rs.map(r=>[r.exerciseId,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));
 assert.deepEqual(norm(records),norm(buildOfficialHypothesisBatch().batch.records));
 assert.deepEqual(norm(records),norm(buildOfficialHypothesisBatch('batch-0251',[...cases].reverse()).batch.records));
 assert.throws(()=>buildOfficialHypothesisBatch('not-consumed',[{...cases[0],literals:['varianza 26']}]),/Official source mismatch/);
 assert.throws(()=>buildOfficialHypothesisBatch('not-consumed',[{...cases[4],center:12.59}]));
});

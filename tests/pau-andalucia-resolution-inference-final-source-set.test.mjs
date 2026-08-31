import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,sourceImages,buildFinalBatch} from '../scripts/resolve-andalucia-inference-final-source-set.mjs';
import {compute} from '../scripts/resolve-andalucia-inference-2012.mjs';
import {hypothesisValues} from '../scripts/resolve-andalucia-inference-confidence-and-tests.mjs';
const records=buildFinalBatch().batch.records,at=i=>records.find(r=>r.correctionEvidence.parameters.index===i);
const nums=s=>[...s.matchAll(/-?\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace(',','.')));
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
// Independent values: Python statistics.NormalDist, rather than the JS quadrature.
const reference=[
 [1557,2.194259209509792,144.3057407904902,148.6942592095098,78],
 [1578,.022131109317847144,.12786889068215285,.17213110931784714,4898],
 [1580,.07523174432605002,.22476825567394998,.37523174432605,44],
 [1584,1.1418837854229371,21.858116214577063,24.141883785422937,158],
 [1587,.0884816939809138,.3715183060190862,.5484816939809138,783],
 [1637,1.0402967757511143,5.459703224248885,7.540296775751115,1083],
];
test('ten official exercises retain all nineteen answer scopes',()=>{
 assert.equal(records.length,10);assert.equal(records.reduce((n,r)=>n+r.parts.length,0),19);
 assert.equal(records.filter(r=>r.deliveryScope==='WHOLE_OFFICIAL_EXERCISE').length,2);
 for(const r of records){assert.deepEqual(r.parts.map(p=>p.partId),r.parts.length===1?['whole']:r.parts.length===3?['a','b','c']:['a','b']);for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.ok(p.solutionSteps.length>=5);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.doesNotMatch(p.prompt,/\(\s*\d+(?:[.,]\d+)?\s*puntos?\s*\)/i);}}
});
test('six confidence intervals, integer minima and all distractors checked independently',()=>{
 for(const [i,margin,l,u,n]of reference){const c=cases.find(c=>c.index===i),v=compute(c),r=at(i);
  close(v.margin,margin);close(v.interval[0],l);close(v.interval[1],u);assert.equal(v.minimum,n);
  const valid=s=>{const a=nums(s);return a.length===2&&Math.abs(a[0]-l)<.00006&&Math.abs(a[1]-u)<.00006;};
  assert.equal([r.parts[0].answer,...r.parts[0].distractors].filter(valid).length,1);assert.ok(valid(r.parts[0].answer));
  assert.equal(new Set([r.parts[0].answer,...r.parts[0].distractors].map(s=>JSON.stringify(nums(s)))).size,4);
  const sizes=[r.parts[1].answer,...r.parts[1].distractors].map(s=>nums(s)[0]);assert.equal(sizes[0],n);assert.equal(sizes.filter(k=>k===n).length,1);assert.equal(new Set(sizes).size,4);
  const error=k=>v.zn*Math.sqrt(v.variance/k);assert.ok(c.strict?error(n)<c.error:error(n)<=c.error);assert.ok(c.strict?error(n-1)>=c.error:error(n-1)>c.error);
 }
});
test('official totals, samples and amplitude are interpreted rather than invented',()=>{
 assert.match(at(1557).parts[0].solutionSteps[0].math,/5274.*36.*146,5/);
 assert.ok(at(1557).parts[1].solutionSteps.some(s=>s.math.includes('amplitud = 2E')&&s.math.includes('1,5')));
 const c=cases.find(c=>c.index===1637);assert.equal(c.sample.reduce((a,b)=>a+b,0),65);assert.equal(c.center,6.5);
 for(const i of[1578,1587]){const p=at(i).parts[1];assert.ok(p.solutionSteps.some(s=>/estimación para el diseño/.test(s.explanation)));}
});
test('two hypothesis tests independently checked, with only one correct complete choice',()=>{
 for(const [i,z,cut,p,rejected]of [[1550,-5.083911274417937,2.3263478740408408,1.8487035363667914e-7,true],[1555,1.5,1.6448536269514715,.06680720126885809,false]]){
  const c=cases.find(c=>c.index===i),v=hypothesisValues(c);close(v.z,z);close(v.cut,cut);close(v.pValue,p);assert.equal(v.rejected,rejected);
  const valid=s=>{const [t,x]=nums(s);return Math.abs(t-(c.tail==='left'?-cut:cut))<1e-5&&Math.abs(x-z)<1e-5&&s.includes('no se rechaza')===!rejected;};
  const ps=at(i).parts[0];assert.ok(valid(ps.answer));assert.equal([ps.answer,...ps.distractors].filter(valid).length,1);assert.equal(new Set([ps.answer,...ps.distractors].map(s=>JSON.stringify([nums(s),s.includes('no se rechaza')]))).size,4);
 }
 assert.match(at(1555).parts[0].solutionSteps.at(-1).explanation,/No rechazar no demuestra/);
});
test('three-part acidity problem uses unrounded ratio, not a false minimum of 21',()=>{
 const r=at(1612),c=cases.find(c=>c.index===1612),[a,b,s]=r.parts,e=.2303891768468512;
 close(c.sample.reduce((a,b)=>a+b,0),39.62);close(c.center,7.924);
 const expected=[[7.693610823153149,8.154389176846852],[e],[20]];
 for(const [k,p]of r.parts.entries()){const valid=x=>{const n=nums(x);return n.length===expected[k].length&&n.every((v,j)=>Math.abs(v-expected[k][j])<.00001);};assert.ok(valid(p.answer));assert.equal([p.answer,...p.distractors].filter(valid).length,1);assert.equal(new Set([p.answer,...p.distractors].map(x=>JSON.stringify(nums(x)))).size,4);}
 close(b.verification.numericalEvidence.margin,e);assert.equal(s.verification.numericalEvidence.minimum,20);assert.ok(s.verification.numericalEvidence.marginAtPrevious>e/2);close(s.verification.numericalEvidence.marginAtMinimum,e/2);
});
test('sample distributions do not create duplicate variance/SD options when both equal one',()=>{
 const [a,b]=at(1618).parts;
 assert.deepEqual(nums(a.answer),[65,1]);assert.deepEqual(a.verification.numericalEvidence,{mean:65,sd:1,variance:1});
 const d=[a.answer,...a.distractors].map(nums);assert.equal(new Set(d.map(JSON.stringify)).size,4);assert.equal(d.filter(x=>x[0]===65&&x[1]===1).length,1);
 close(b.verification.numericalEvidence.se,.8);close(b.verification.numericalEvidence.probability,.3943502263331447);
 const choices=[b.answer,...b.distractors].map(x=>nums(x)[0]);assert.equal(choices.filter(x=>Math.abs(x-.3943502263331447)<1e-5).length,1);assert.equal(new Set(choices).size,4);
 assert.ok(b.solutionSteps.some(x=>x.math.includes('−1,25 < Z < 0')));
});
test('ten inspected source PDF images and official files match their hashes',()=>{
 for(const r of records){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),sourceImages[i]);assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);}
});
test('all solutions are deterministic, order invariant and reject changed source parameters',()=>{
 const norm=rs=>rs.map(r=>[r.exerciseId,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));
 assert.deepEqual(norm(records),norm(buildFinalBatch().batch.records));assert.deepEqual(norm(records),norm(buildFinalBatch('batch-0252',[...cases].reverse()).batch.records));
 assert.throws(()=>buildFinalBatch('not-consumed',[{...cases[2],sum:5275}]));
 assert.throws(()=>buildFinalBatch('not-consumed',[{...cases[0],literals:['al menos del 36%']}]));
});

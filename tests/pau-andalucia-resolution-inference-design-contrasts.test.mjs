import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildDesignContrastBatch} from '../scripts/resolve-andalucia-inference-design-contrasts.mjs';
import {designInferenceObservations,projectDesignInference} from '../scripts/andalucia-inference-design-pdf-evidence.mjs';
const records=buildDesignContrastBatch().batch.records;
const at=i=>records.find(r=>r.correctionEvidence.parameters.index===i);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
// Independent statistics.NormalDist calculation; JS uses density quadrature.
const refs=[[563,.35245570193488135,.4475442980651187,425],[570,.4342303339834958,.4657696660165042,881],[759,.38766889938658067,.5123311006134194,2914],[868,.005248696250676357,.013751303749323643,625],[1215,.1290554026009727,.23094459739902728,null],[1461,.6218960809564602,.711437252376873,3007]];
test('nine complete official exercises, twenty complete parts; no historical answer used',()=>{
 assert.equal(records.length,9);assert.equal(records.flatMap(r=>r.parts).length,20);
 for(const r of records)for(const p of r.parts){assert.ok(p.solutionSteps.length>=5);assert.equal(p.finalAnswer,p.answer);assert.equal(p.distractors.length,3);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.doesNotMatch(p.prompt,/\([\d.,]+\s+puntos?\)/i);}
});
for(const[i,lo,hi,n]of refs)test(`q${i}: independent interval, margin and integer design`,()=>{
 const r=at(i),v=r.parts[0].verification.numericalEvidence;near(v.interval[0],lo);near(v.interval[1],hi);near(v.margin,(hi-lo)/2);
 if(n!==null)assert.equal(r.parts.at(-1).verification.numericalEvidence.minimum,n);
});
test('different proportions in a and b are not conflated; the symmetric p=.5 design has distinct choices',()=>{
 assert.equal(at(563).parts[0].verification.numericalEvidence.p,.4);assert.equal(at(563).parts[1].verification.numericalEvidence.planningP,.2);
 assert.equal(at(570).parts[0].verification.numericalEvidence.p,.45);assert.equal(at(570).parts[1].verification.numericalEvidence.planningP,.5);
});
test('all size answers are the minimum, not merely a sufficient sample size',()=>{
 for(const r of records)for(const p of r.parts){const v=p.verification.numericalEvidence;if(v.minimum===undefined)continue;
  const e=n=>v.z*Math.sqrt(v.variance/n);near(e(v.minimum),v.marginAtMinimum);near(e(v.minimum-1),v.marginAtPrevious);
  assert.ok(v.strict?e(v.minimum)<v.error:e(v.minimum)<=v.error);assert.ok(v.strict?e(v.minimum-1)>=v.error:e(v.minimum-1)>v.error);
  for(const n of v.distractorSampleSizes)assert.notEqual(n,v.minimum);assert.equal(new Set([v.minimum,...v.distractorSampleSizes]).size,4);
 }
});
test('numerical intervals are mutually distinct, except the explicitly false compatibility alternative',()=>{
 for(const[i]of refs){const v=at(i).parts[0].verification.numericalEvidence;
  for(let j=0;j<v.distractorIntervals.length;j++){const x=v.distractorIntervals[j];if(i===1461&&j===0){assert.equal(v.distractorCompatibility[j],false);assert.ok(.65>v.interval[0]&&.65<v.interval[1]);}else assert.ok(Math.abs(x[0]-v.interval[0])>1e-5||Math.abs(x[1]-v.interval[1])>1e-5);
  }
  for(let j=0;j<3;j++)for(let k=j+1;k<3;k++)assert.notDeepEqual(v.distractorIntervals[j],v.distractorIntervals[k]);
 }
});
test('variance 225 means sigma 15; width five means margin 2.5, not five',()=>{
 const r=at(1630),a=r.parts[0].verification.numericalEvidence,b=r.parts[1].verification.numericalEvidence;
 near(a.interval[0],170.0654391191456);near(a.interval[1],179.9345608808544);assert.equal(b.minimum,60);assert.equal(b.error,2.5);assert.equal(b.variance,225);
 assert.ok(2*b.marginAtMinimum<=5);assert.ok(2*b.marginAtPrevious>5);assert.match(r.parts[0].solutionSteps[0].math,/σ = √\(225\) = 15/);
});
test('stratified exact counts and inverse interval recover their requested data',()=>{
 assert.deepEqual(at(1162).parts[0].verification.numericalEvidence.allocation,[6,16,10,8]);assert.equal(at(1162).parts[1].verification.numericalEvidence.minimum,139);
 assert.equal(at(1265).parts[0].verification.numericalEvidence.center,.35);assert.equal(at(1265).parts[1].verification.numericalEvidence.count,175);assert.equal(at(1265).parts[2].verification.numericalEvidence.minimum,895);
});
test('official source and page images retain hashes and only evidenced glyphs are projected',()=>{
 const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
 for(const c of cases){const r=at(c.index),ob=designInferenceObservations.find(o=>o[0]===c.index);assert.equal(sha(fs.readFileSync(r.officialSource.path)),ob[1]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${c.index}.png`)),ob[4]);for(const l of c.literals)assert.ok(r.sourceLiteral.includes(l));assert.doesNotMatch(projectDesignInference(c.index,r.sourceLiteral),/[\u001c\u001d¾]/);}
});
test('repeat/reverse produce identical mathematics and official source literals',()=>{
 const stable=a=>a.map(r=>[r.exerciseId,r.sourceLiteral,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(stable(records),stable(buildDesignContrastBatch().batch.records));assert.deepEqual(stable(records),stable(buildDesignContrastBatch('batch-0368',[...cases].reverse()).batch.records));
});

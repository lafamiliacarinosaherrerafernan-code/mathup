import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildConfidenceBatch,hypothesisValues} from '../scripts/resolve-andalucia-inference-confidence-and-tests.mjs';
import {critical} from '../scripts/resolve-andalucia-inference-2012.mjs';
const records=buildConfidenceBatch().batch.records,at=i=>records.find(r=>r.correctionEvidence.parameters.index===i);
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const nums=s=>[...s.matchAll(/-?\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace(',','.')));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
test('ten official tasks retain twenty-one parts and five whole-exercise scopes',()=>{
 assert.equal(records.length,10);assert.equal(records.reduce((s,r)=>s+r.parts.length,0),21);
 assert.equal(records.filter(r=>r.deliveryScope==='WHOLE_OFFICIAL_EXERCISE').length,5);
 for(const r of records){if(r.deliveryScope==='WHOLE_OFFICIAL_EXERCISE'){assert.equal(r.parts[0].partId,'whole');assert.equal(r.sourceSubparts.length,0);assert.equal(r.parts[0].prompt,r.sourceLiteral);}
 else assert.deepEqual(r.parts.map(p=>p.partId+')'),r.sourceSubparts.map(p=>p.label));}
});
// Values calculated independently with Python statistics.NormalDist, not with the constructor.
const reference=[
 [317,-7.5,1.9599639845400536,6.38378239159465e-14,true],
 [378,3,1.6448536269514715,.0013498980316301035,true],
 [384,1.9047619047619042,1.7506860712521695,.05681102793472759,true],
 [456,-1.6858544608470485,1.6448536269514715,.04591191752661172,true],
 [485,-.9759000729485288,2.5758293035489,.3291139859786103,false],
 [535,2.0224719101123565,1.6448536269514715,.021563811339088856,true],
];
test('all six tests agree with independent statistics and tail probabilities',()=>{
 for(const [index,z,cut,p,reject] of reference){const v=hypothesisValues(cases.find(c=>c.index===index));close(v.z,z);close(v.cut,cut);close(v.pValue,p);assert.equal(v.rejected,reject);}
 const v=hypothesisValues(cases.find(c=>c.index===456),.01);close(v.cut,2.3263478740408408);assert.equal(v.rejected,false);
 assert.ok(at(317).parts[0].solutionSteps.some(s=>s.math.includes('σ² = 16')));
 assert.ok(at(317).parts[0].solutionSteps.some(s=>s.math.includes('valor p < 0,00001')));
 assert.ok(at(485).parts[0].solutionSteps.some(s=>s.explanation.includes('No rechazar no demuestra')));
});
test('hypothesis choices contain exactly one correct region, statistic and decision',()=>{
 for(const c of cases.filter(c=>c.task==='test'))at(c.index).parts.forEach((p,i)=>{
  const v=hypothesisValues(c,c.levels[i]),expectedCut=c.tail==='left'?-v.cut:v.cut;
  const valid=s=>{const [cut,z]=nums(s);return Math.abs(cut-expectedCut)<1e-5&&Math.abs(z-v.z)<1e-5&&s.includes('no se rechaza')===!v.rejected;};
  assert.ok(valid(p.answer));assert.equal([p.answer,...p.distractors].filter(valid).length,1);
  assert.equal(new Set([p.answer,...p.distractors].map(s=>JSON.stringify([nums(s),s.includes('no se rechaza')]))).size,4);
 });
});
test('fixed-center containment requires a maximum of 36; 37 fails',()=>{
 const p=at(320).parts[3],v=p.verification.numericalEvidence;
 close(v.bound,36.337131534607245);close(v.marginAtMaximum,1.8084086479871335);close(v.marginAtNext,1.7838033021800108);assert.equal(v.maximum,36);
 assert.ok(v.marginAtMaximum>=1.8&&v.marginAtNext<1.8);
 assert.equal([p.answer,...p.distractors].filter(s=>nums(s)[0]===36).length,1);
 assert.equal(at(320).parts[0].answer,'x̄ = 12 horas');
});
test('inverse intervals distinguish center, margin, variance and amplitude',()=>{
 const a=at(339).parts[0].verification.numericalEvidence;close(a.center,158);close(a.error,4.35);
 const b=at(340).parts;close(b[0].verification.numericalEvidence.center,7.02);close(b[1].verification.numericalEvidence.error,.98);close(b[2].verification.numericalEvidence.error,.8399845648028802);
 assert.equal(cases.find(c=>c.index===339).sigma,Math.sqrt(225));
 for(const [p,wanted] of [[at(339).parts[0],[158,4.35]],[b[0],[7.02]],[b[1],[.98]],[b[2],[.8399845648028802]]]){
  const equal=s=>nums(s).length===wanted.length&&nums(s).every((n,i)=>Math.abs(n-wanted[i])<1e-5);assert.ok(equal(p.answer));assert.equal([p.answer,...p.distractors].filter(equal).length,1);
 }
});
test('strict sample minima checked independently with the preceding integer',()=>{
 for(const [index,n,sigma,error,confidence,bound] of [[339,97,15,3,.95,96.03647051735308],[395,76,.8,.2,.97,75.34867595016158]]){
  const p=at(index).parts[2],v=p.verification.numericalEvidence;close(v.bound,bound);assert.equal(v.minimum,n);
  const margin=k=>critical(confidence)*sigma/Math.sqrt(k);assert.ok(margin(n)<error);assert.ok(margin(n-1)>=error);
  assert.equal([p.answer,...p.distractors].filter(s=>nums(s)[0]===n).length,1);
 }
});
test('official aggregate volume gives mean 120 and the independently checked 97% interval',()=>{
 const [a,b]=at(395).parts,v=b.verification.numericalEvidence;
 assert.equal(a.verification.numericalEvidence.sum,5400);assert.equal(a.verification.numericalEvidence.n,45);assert.equal(a.verification.numericalEvidence.mean,120);
 close(v.error,.258798378751854);close(v.interval[0],119.74120162124815);close(v.interval[1],120.25879837875185);
 const interval=s=>nums(s).slice(0,2),equal=s=>interval(s).every((n,i)=>Math.abs(n-v.interval[i])<1e-5);
 assert.ok(equal(b.answer));assert.equal([b.answer,...b.distractors].filter(equal).length,1);
});
test('qualitative options match mathematical monotonicity, not an invented content shortcut',()=>{
 assert.equal(at(320).parts[1].answer,'Disminuye: es inversamente proporcional a √(n).');
 assert.equal(at(320).parts[2].answer,'Debe reducirse el nivel de confianza.');
 assert.equal(at(340).parts[3].answer,'Aumenta el error al aumentar el nivel de confianza.');
 assert.ok(critical(.99)>critical(.95));close((1/Math.sqrt(4))/(1/Math.sqrt(1)),.5);
 for(const r of records)for(const p of r.parts){assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=5);assert.equal(p.finalAnswer,p.answer);}
});
test('official page inspection images and document hashes stay bound to their sources',()=>{
 const images={317:'5fdea249438e1d26d59f15f911e104c4b39205c512e8f7a844807da86fa0915f',320:'28d24e01288b05bf6ee3ff5b8c17419cf7e7f5bd5accfa74818c3a0c8f9de11f',339:'5a6ac7aa1938a48b9bf6c053cd16c5c8374e18bc7e2c476685489ae8e236d411',340:'dcf765afd81881aaa093c1fa4d0527931e26a72de4093bdb7ce32338b9b24e25',378:'dd9fd0ba69bf5d9bbeb68559a70a08f0570f76ebc320abc85be789d76f2ad6f3',384:'1f1dacb450a91fc8735e64d1f6b72edd6f1ec850b082ac1dd36e0436054d56f8',395:'267875229e75be1b54dc47f9a73f56e832fe4f6209781d3c86401d7bff06e728',456:'2f62ba385a28c40c12f86fb4e71180a9b6d56466695d5fef02d9c87c11462c86',485:'5e8ad40d2daa7bb18f7016a1834f52eb15353d2283eb38368a62af3d12f7b518',535:'067a702363e1c436b954b0f548a2040488a3323c47b5e815e1fee9d77cb5b77a'};
 for(const r of records){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),images[i]);assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);}
});
test('generation is reproducible, invariant to order and rejects altered source anchors',()=>{
 const normalize=rs=>rs.map(r=>[r.exerciseId,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));
 assert.deepEqual(normalize(records),normalize(buildConfidenceBatch('batch-0250',[...cases].reverse()).batch.records));
 assert.deepEqual(normalize(records),normalize(buildConfidenceBatch().batch.records));
 assert.throws(()=>buildConfidenceBatch('not-consumed',[{...cases[0],literals:['varianza 17']}]),/Official source mismatch/);
});

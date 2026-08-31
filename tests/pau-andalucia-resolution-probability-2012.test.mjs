import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildProbabilityBatch} from '../scripts/resolve-andalucia-probability-2012.mjs';
const rows=buildProbabilityBatch().batch.records;
const at=i=>rows.find(r=>r.correctionEvidence.parameters.index===i);
const expected={2:[[20,1],[1,2]],11:[[81,100],[19,100],[69,100],[46,65]],14:[[3,5],[7,15],[1,2]],16:[[31,200],[112,169]],22:[null,[3,20]],25:[[11,45],[5,11]],30:[[1,4],[3,10],[7,16],null],35:[[111,500],[224,389]],36:[[3,1000],[191,200],[114,191]],38:[[3,10],[7,10],[3,5]]};
const rational=s=>{const m=s.match(/^frac\{(-?\d+)\}\{(\d+)\}(?: alumnos)?$/);if(m)return [+m[1],+m[2]];assert.match(s,/^\d+(?: alumnos)?$/);return [parseInt(s),1];};
test('ten official probability exercises: 27 complete parts and 81 documented distractors',()=>{
 assert.equal(rows.length,10);assert.equal(rows.flatMap(r=>r.parts).length,27);
 for(const r of rows){assert.equal(r.primaryTopic,'Probabilidad');for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=7);assert.doesNotMatch(JSON.stringify(p),/undefined|NaN/);}}
});
test('independent exact rational answers and pairwise inequivalence of all four choices',()=>{
 for(const [index,answers]of Object.entries(expected))for(const [i,ref]of answers.entries())if(ref){
  const p=at(+index).parts[i],values=[p.answer,...p.distractors].map(rational);
  assert.equal(values[0][0]*ref[1],ref[0]*values[0][1]);
  for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)assert.notEqual(values[a][0]*values[b][1],values[b][0]*values[a][1]);
  const proof=p.verification.numericalEvidence;assert.equal(proof.numerator*ref[1],ref[0]*proof.denominator);
 }
});
test('contingencies independently reconstructed from source marginal/conditional data',()=>{
 const independent={2:[400*.25,400*(.90-.25),400*(.30-.25),400*(1-.90-.30+.25)],11:[12,58-12,35-12,100-58-35+12],14:[2*6,2*4,4*3,4*7].map(n=>n/2),16:[60*.95,60*.05,140*.80,140*.20],22:[650,50000-650,200,20000-200,150,30000-150],25:[45/3/3,45/3*2/3,45*2/3/5,45*2/3*4/5],30:[25,75,125,175],35:[1000*.44*.25,1000*.44*.75,1000*.56*.20,1000*.56*.80],36:[1000*.6*.05,1000*.6*.95,1000*.3*.04,1000*.3*.96,1000*.1*.03,1000*.1*.97],38:[84,120-84,200-120-24,24]};
 for(const c of cases)for(const [i,cell]of c.cells.entries())assert.ok(Math.abs(cell[2]-independent[c.index][i])<1e-9);
});
test('enumerated integer atoms check numerator, condition and complement independently',()=>{
 for(const r of rows)for(const p of r.parts)if(p.verification.method==='EXACT_CONTINGENCY_ENUMERATION_AND_COMPLEMENT'){
  const v=p.verification.numericalEvidence,atoms=v.weights.flatMap((cell,i)=>Array.from({length:cell[2]},()=>i));
  const universe=atoms.filter(i=>v.denominatorIndexes==='all'||v.denominatorIndexes.includes(i));
  const success=universe.filter(i=>v.numeratorIndexes.includes(i));assert.equal(success.length,v.numerator);
  assert.equal(v.denominator,v.count?1:universe.length);assert.equal(success.length+universe.filter(i=>!v.numeratorIndexes.includes(i)).length,universe.length);
  assert.ok(success.length<=universe.length);assert.equal(atoms.length,v.scale);
 }
});
test('minimum rate is conditional on brand, not the absolute accident count',()=>{
 const rates=[650/50000,200/20000,150/30000];assert.deepEqual(rates,[.013,.01,.005]);assert.equal(rates.indexOf(Math.min(...rates)),2);
 const p=at(22).parts[0];assert.deepEqual(p.verification.numericalEvidence.rates,rates);
 const values=[p.answer,...p.distractors].map(s=>Object.fromEntries([...s.matchAll(/([ABC]): ([\d,]+)%/g)].map(m=>[m[1],Number(m[2].replace(',','.'))/100])));
 assert.equal(values.filter(v=>['A','B','C'].every((k,i)=>Math.abs(v[k]-rates[i])<1e-12)).length,1);
});
test('independence rejected by both product rule and conditional test; false assertions do not pass',()=>{
 const joint=75/400,product=((25+75)/400)*((75+175)/400),conditional=75/(75+175);
 assert.notEqual(joint,product);assert.notEqual(conditional,100/400);
 const p=at(30).parts[3],v=p.verification.numericalEvidence;assert.equal(v.joint,joint);assert.equal(v.product,product);assert.equal(v.conditional,conditional);
 const opts=[p.answer,...p.distractors].map(s=>{const f=[...s.matchAll(/frac\{(\d+)\}\{(\d+)\}/g)].map(m=>+m[1]/+m[2]);return {yes:s.startsWith('Sí'),joint:f[0],product:f[1]};});
 assert.deepEqual(opts.map(v=>v.yes===(joint===product)&&v.joint===joint&&v.product===product),[true,false,false,false]);
});
test('source hashes, 2012 origin, stable identities, reproducibility and reversed ordering',()=>{
 const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
 for(const r of rows){assert.equal(r.year,2012);assert.equal(hash(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);}
 const norm=rs=>rs.map(r=>[r.exerciseId,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));
 assert.deepEqual(norm(rows),norm(buildProbabilityBatch().batch.records));assert.deepEqual(norm(rows),norm(buildProbabilityBatch('batch-0259',[...cases].reverse()).batch.records));
 assert.throws(()=>buildProbabilityBatch('not-consumed',[{...cases[0],literals:['invented official data']} ]));
 assert.equal(hash(fs.readFileSync('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl')),'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

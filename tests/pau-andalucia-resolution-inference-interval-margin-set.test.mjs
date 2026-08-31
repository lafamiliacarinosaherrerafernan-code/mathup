import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,sourceImages,buildIntervalMarginBatch} from '../scripts/resolve-andalucia-inference-interval-margin-set.mjs';
import {compute} from '../scripts/resolve-andalucia-inference-2012.mjs';
import {projectStatement} from '../scripts/prepare-andalucia-inference-delivery.mjs';
const records=buildIntervalMarginBatch().batch.records,at=i=>records.find(r=>r.correctionEvidence.parameters.index===i);
test('947 population follows the official social-network statement, not a gaming context',()=>{const r=at(947);assert.match(r.sourceLiteral,/usuarios de una determinada red social/);assert.match(JSON.stringify(r.parts),/usuarios de esa red social/);assert.doesNotMatch(JSON.stringify(r.parts),/videojuegos/);});
const nums=s=>[...s.matchAll(/-?\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace(',','.')));
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
// Python statistics.NormalDist quantiles, independent of JS quadrature.
const reference=[
 [914,4.6684961900057855,10.331503809994214,19.668496190005786,115],
 [947,.04144815812148574,.7185518418785143,.8014481581214857,1924],
 [977,30.989751615228073,579.4102483847719,641.3897516152281,null],
 [978,1.491504378606383,9.308495621393618,12.291504378606383,null],
 [980,1.1759783907240322,58.82402160927597,61.17597839072403,60],
 [1002,1.6236310749215388,16.37636892507846,19.62363107492154,27],
 [1004,2.5058045273285248,8.094195472671474,13.105804527328525,53],
 [1110,.04011869877489152,.3098813012251085,.39011869877489147,2679],
 [1124,2.1273527796904252,29.062647220309575,33.317352779690424,2012],
 [1163,5.134372276579556,224.86562772342043,235.13437227657957,660],
 [1286,1.4699729884050403,33.53002701159496,36.46997298840504,956],
];
function choices(p,expected){const values=[p.answer,...p.distractors].map(nums);const valid=x=>x.length===expected.length&&x.every((n,j)=>Math.abs(n-expected[j])<.00006);assert.ok(valid(values[0]));assert.equal(values.filter(valid).length,1);assert.equal(new Set(values.map(JSON.stringify)).size,4);}
test('eleven exercises retain all twenty-five official answer scopes and independent options',()=>{
 assert.equal(records.length,11);assert.equal(records.reduce((s,r)=>s+r.parts.length,0),25);
 for(const r of records){assert.deepEqual(r.parts.map(p=>p.partId),r.parts.length===3?['a','b','c']:['a','b']);for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=5);assert.doesNotMatch(p.prompt,/\([^)]*puntos?\)/);}}
});
test('eleven independent interval results and eight minimum sample sizes',()=>{
 for(const [i,e,l,u,n]of reference){const c=cases.find(c=>c.index===i),r=at(i),v=compute(c);close(v.margin,e);close(v.interval[0],l);close(v.interval[1],u);choices(r.parts[i===1004?1:0],[l,u]);
  if(n){const p=r.parts.at(-1),proof=p.verification.numericalEvidence;choices(p,[n]);assert.equal(proof.minimum,n);assert.ok(c.strict?proof.marginAtMinimum<c.error:proof.marginAtMinimum<=c.error);assert.ok(c.strict?proof.marginAtPrevious>=c.error:proof.marginAtPrevious>c.error);}
 }
});
test('margin is not width; new washing-machine sample uses n=50 and 99%',()=>{
 for(const [i,e]of[[977,30.989751615228073],[978,1.0199763659223313],[1002,1.6236310749215388],[1163,5.134372276579556]]){const p=at(i).parts[1];choices(p,[e]);close(p.verification.numericalEvidence.margin,e);}
 assert.equal(at(978).parts[1].verification.numericalEvidence.n,50);assert.equal(at(978).parts[1].verification.numericalEvidence.confidence,.99);
});
test('sample sums, variance roots and units follow the official data',()=>{
 const expected={914:135,977:6104,978:129.6,1002:180,1004:127.2,1124:311.9};for(const c of cases.filter(c=>c.sample)){close(c.sample.reduce((s,x)=>s+x,0),expected[c.index]);close(c.center,expected[c.index]/c.n);}
 for(const i of[978,1124]){const r=at(i),c=r.correctionEvidence.parameters;close(c.sigma*c.sigma,c.populationVariance);assert.match(r.parts[0].solutionSteps[0].explanation,/varianza/);}
 choices(at(1004).parts[0],[1.1547005383792517]);assert.doesNotMatch(JSON.stringify(at(1004).parts),/años/);
 assert.equal(at(1002).correctionEvidence.parameters.unit,'unidades de la variable');assert.doesNotMatch(JSON.stringify(at(1002).parts),/minutos|horas|años/);
 assert.match(JSON.stringify(at(914).parts),/desplazamiento/);assert.match(JSON.stringify(at(1110).parts),/transporte público/);
});
test('unusual editorial score is removed only from presentation, never from evidence',()=>{
 const r=at(1124);assert.match(r.sourceLiteral,/\(1\. punto\)/);const projected=projectStatement(r.sourceLiteral);assert.ok(projected.removed.some(s=>s.literal==='(1. punto)'));assert.doesNotMatch(projected.full,/\([^)]*puntos?\)/);assert.doesNotMatch(r.parts[1].prompt,/punto/);
});
test('official PDFs and individually inspected page images retain their hashes',()=>{
 const sha=x=>crypto.createHash('sha256').update(x).digest('hex');for(const r of records){const i=r.correctionEvidence.parameters.index;assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),sourceImages[i]);}
});
test('deterministic rebuild, reverse order and source-parameter tampering checks',()=>{
 const norm=rs=>rs.map(r=>[r.exerciseId,r.parts]).sort((a,b)=>a[0].localeCompare(b[0]));assert.deepEqual(norm(records),norm(buildIntervalMarginBatch().batch.records));assert.deepEqual(norm(records),norm(buildIntervalMarginBatch('batch-0253',[...cases].reverse()).batch.records));
 assert.throws(()=>buildIntervalMarginBatch('not-consumed',[{...cases[0],center:16}]));assert.throws(()=>buildIntervalMarginBatch('not-consumed',[{...cases[3],sigma:7.84}]));assert.throws(()=>buildIntervalMarginBatch('not-consumed',[{...cases[0],literals:['típica 9 minutos']}]));
});

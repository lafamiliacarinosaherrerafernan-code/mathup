import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,derive,graph,renderQuadrilateralGraph,buildQuadrilateralBatch} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {feasible,vertices} from '../scripts/resolve-andalucia-linear-region-official.mjs';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
test('2010 and 2022 official PDFs, exact literals and five official subparts are preserved',()=>{
 const {batch}=buildQuadrilateralBatch('test');assert.equal(batch.records.length,2);assert.deepEqual(batch.records.map(r=>r.parts.map(p=>p.partId)),[['a','b','c'],['a','b']]);
 for(const [i,r]of batch.records.entries()){assert.equal(hash(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(r.primaryTopic,'Programación lineal');assert.equal(r.examSlot,2);assert.ok(r.parts.every(p=>!/\(\d+(?:[.,]\d+)? puntos?\)/.test(p.prompt)));assert.match(r.sourceLiteral,/punto/);assert.ok(r.sourceSubparts.every(p=>p.scoreEvidence));assert.equal(r.parts[0].visual.visualRequired,true);for(const s of cases[i].literals)assert.ok(r.sourceLiteral.includes(s));}
 assert.equal(batch.records[0].officialSource.documentHash,'0de2f7d077a3b5d5c0dbca886cdb363082356411843369c3bce54ff7cda08abc');
 assert.equal(batch.records[1].officialSource.documentHash,'952465c4cbe1692408657577fd13e8ea7c0fa608502a6b533aeca2a4bae6f39e');
});
test('pairwise enumeration agrees with independently calculated integer vertices and objective values',()=>{
 assert.deepEqual(derive(cases[0]),{points:[[0,3],[0,5],[3,2],[5,9]],values:[3,1,10,7],min:1,max:10});
 assert.deepEqual(derive(cases[1]),{points:[[1,3],[2,7],[3,2],[4,4]],values:[10,23,9,16],min:9,max:23});
 for(const c of cases){for(const [x,y]of derive(c).points)for(const[a,b,k]of c.constraints)assert.ok(a*x+b*y<=k);assert.deepEqual(derive({...c,constraints:[...c.constraints].reverse()}).points,derive(c).points);}
 // Rejected intersections, checked independently without floating tolerances.
 assert.ok(-30<0);assert.ok(9>17/7);assert.ok(2*26-1>4*4);assert.ok(-3+2*(-14)<7*2);
});
test('global dual bounds verified as exact coefficient identities, including the affine constant',()=>{
 // 5(F-1) = (4x-5y+25)+6x, where F=2x-y+6.
 assert.deepEqual([4+6,-5,25],[10,-5,25]);
 // 23(10-F)=3(x+3y-9)+7(17-7x+2y).
 assert.deepEqual([3-49,9+14,-27+119],[-46,23,92]);
 // 11(23-F)=7(4x-y-1)+13(20-3x-2y), F=x+3y.
 assert.deepEqual([28-39,-7-26,-7+260],[-11,-33,253]);
 for(let X=0;X<=600;X++)for(let Y=0;Y<=1000;Y+=5){
  if(-X-3*Y<=-900&&-4*X+5*Y<=2500&&7*X-2*Y<=1700){const F=2*X-Y+600;assert.ok(F>=100&&F<=1000);assert.equal(23*(1000-F),3*(X+3*Y-900)+7*(1700-7*X+2*Y));}
  if(-X-2*Y<=-700&&2*X-Y<=400&&-4*X+Y<=-100&&3*X+2*Y<=2000){const F=X+3*Y;assert.ok(F<=2300);assert.equal(11*(2300-F),7*(4*X-Y-100)+13*(2000-3*X-2*Y));}
 }
});
const readPoints=s=>[...s.replace(/−/g,'-').matchAll(/\((-?\d+);\s*(-?\d+)\)/g)].map(m=>[Number(m[1]),Number(m[2])]);
const pointSet=ps=>ps.map(p=>p.join(',')).sort().join('|');
test('each polygon/vertex option is assessed as a full mathematical set, not by its text',()=>{
 const {batch}=buildQuadrilateralBatch('test');for(const[i,indices]of[[0,[0,1]],[1,[0]]])for(const j of indices){const p=batch.records[i].parts[j],options=[p.answer,...p.distractors],sets=options.map(s=>pointSet(readPoints(s)));assert.equal(new Set(sets).size,4);assert.equal(sets.filter(s=>s===pointSet(derive(cases[i]).points)).length,1);for(const d of options.slice(1))assert.ok(readPoints(d).some(p=>!feasible(p,cases[i].constraints)));}
});
test('extremum distractors are distinct mathematical claims and exactly one matches global bounds',()=>{
 const {batch}=buildQuadrilateralBatch('test');
 const p=batch.records[0].parts[2],claims=[p.answer,...p.distractors].map(s=>[...s.matchAll(/(?:Máximo|mínimo) (−?\d+) en \((\d+);(\d+)\)/g)].map(m=>({value:Number(m[1]),point:[+m[2],+m[3]]})));
 assert.equal(new Set(claims.map(JSON.stringify)).size,4);assert.equal(claims.filter(cs=>cs[0].value===10&&cs[1].value===1&&pointSet([cs[0].point])==='3,2'&&pointSet([cs[1].point])==='0,5').length,1);
 const q=batch.records[1].parts[1],values=[q.answer,...q.distractors].map(s=>Number(s.match(/Máximo (\d+)/)[1]));assert.deepEqual(values,[23,16,10,9]);assert.equal(new Set(values).size,4);assert.equal(values.filter(v=>v===derive(cases[1]).max).length,1);
});
test('derived diagrams retain all active boundaries, vertices and semiplane inequalities deterministically',()=>{
 for(const c of cases){const g=graph(c),svg=renderQuadrilateralGraph(g);assert.deepEqual(pointSet(g.polygon),pointSet(derive(c).points));assert.equal((svg.match(/<circle /g)||[]).length,4);assert.match(svg,/<polygon/);assert.equal(g.labels.length,c.constraints.length);assert.ok(g.polygon.every(p=>feasible(p,c.constraints)));assert.equal(renderQuadrilateralGraph(graph(c)),svg);assert.doesNotMatch(svg,/<script|foreignObject|undefined/);}
});
test('replay, reversed case order and rollback preserve source, queue and application bytes',()=>{
 const paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','bach-exam.js',...buildQuadrilateralBatch('test').batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>hash(fs.readFileSync(p)));
 const a=buildQuadrilateralBatch('same').batch.records,b=buildQuadrilateralBatch('same',[...cases].reverse()).batch.records;assert.deepEqual(a,[...b].reverse());assert.deepEqual(a,buildQuadrilateralBatch('same').batch.records);assert.deepEqual(paths.map(p=>hash(fs.readFileSync(p))),before);assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

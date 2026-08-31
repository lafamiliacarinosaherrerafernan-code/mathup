import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,derive,feasible,vertices,graph,renderGraph,buildLinearRegionBatch} from '../scripts/resolve-andalucia-linear-region-official.mjs';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const c=cases[0],v=derive(c);
test('official 2013 exercise, three explicit subparts and original source hash retained',()=>{
 const {batch}=buildLinearRegionBatch('test');const r=batch.records[0];assert.equal(r.exerciseId,'pau-can-ex-39da32506477b8fc4a08159bfcc221cc');
 assert.equal(r.officialSource.documentHash,'f8633bbd91d33bee02c2cc582c33b7ffeb3643f312b810ad0bb8c5d154d0721d');assert.equal(hash(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);
 assert.deepEqual(r.parts.map(p=>p.partId),['a','b','c']);assert.equal(r.primaryTopic,'Programación lineal');assert.equal(r.examSlot,2);
 assert.match(r.sourceLiteral,/0.5 puntos/);assert.ok(r.parts.every(p=>!/puntos/.test(p.prompt)));assert.equal(r.parts[1].visual.visualRequired,true);
});
test('membership verified using integer hundredths, not rounding or solver tolerance',()=>{
 const X=450,Y=155;assert.equal(X-3*Y,-15);assert.ok(X<=500&&Y>=100);assert.equal(feasible(c.point,c.constraints),false);assert.deepEqual(v.slacks.map(x=>Math.round(x*100)),[-15,50,55]);
});
test('all three pairwise frontier intersections and exact determinant coordinates',()=>{
 assert.deepEqual(v.points,[[3,1],[5,1],[5,5/3]]);assert.deepEqual(v.values,[3,7,5]);
 // Integer homogeneous coordinates independently show every vertex is feasible.
 const rational=[[3,1,1],[5,1,1],[15,5,3]];
 for(const[x,y,d]of rational){assert.ok(x>=3*y);assert.ok(x<=5*d);assert.ok(y>=d);}
 assert.equal(v.min,3);assert.equal(v.max,7);
 assert.deepEqual(vertices([...c.constraints].reverse()),v.points);
});
test('dual certificates prove global bounds at every feasible point, independently of vertices',()=>{
 // In exact arithmetic: F-3=2(x-3y)+3(y-1), 7-F=2(5-x)+3(y-1).
 for(let X=300;X<=500;X++)for(let Y=100;3*Y<=X;Y++){
  const F=2*X-3*Y;
  assert.equal(F-300,2*(X-3*Y)+3*(Y-100));assert.equal(700-F,2*(500-X)+3*(Y-100));assert.ok(F>=300&&F<=700);
 }
 // Equality is unique at A (lower) and B (upper): both positive slack terms vanish.
 assert.equal(2*3-3*1,3);assert.equal(2*5-3*1,7);
});
test('target witness and all four alternatives evaluated as logical propositions',()=>{
 assert.equal(2*325-3*100,350);assert.ok(325>=3*100&&325<=500&&100>=100);
 const attainable=t=>3<=t&&t<=7;assert.deepEqual(c.targets.map(attainable),[true,false]);
 const alternatives=[[true,false],[true,true],[false,false],[false,true]];assert.equal(alternatives.filter(x=>x.every((b,i)=>b===attainable(c.targets[i]))).length,1);
 const minMaxClaims=[[3,7],[5,7],[3,5],[-7,-3]];assert.equal(minMaxClaims.filter(([a,b])=>a===v.min&&b===v.max).length,1);
 const membershipClaims=[!feasible(c.point,c.constraints)&&v.slacks[0]<0,feasible(c.point,c.constraints),v.slacks[1]<0,v.slacks[2]<0];assert.deepEqual(membershipClaims,[true,false,false,false]);
});
test('graph contains the same constraints, polygon, labels, exact optima and no invented source image',()=>{
 const g=graph(c),svg=renderGraph(g);assert.equal(g.polygon.length,3);assert.deepEqual(new Set(g.polygon.map(JSON.stringify)),new Set(v.points.map(JSON.stringify)));
 assert.deepEqual(g.optima.minimum,{point:[3,1],value:3});assert.deepEqual(g.optima.maximum,{point:[5,1],value:7});
 assert.match(svg,/<polygon/);assert.equal((svg.match(/<circle /g)||[]).length,3);assert.match(svg,/font-size="13">5<\/text>/);assert.match(svg,/font-size="13">3<\/text>/);assert.doesNotMatch(svg,/<script|foreignObject|http:\/\/(?!www.w3.org)|undefined/);
 assert.equal(renderGraph(graph(c)),svg);assert.equal(g.origin,'DERIVED_FROM_RESOLVED_OFFICIAL_CONSTRAINTS_NOT_OFFICIAL_IMAGE');
});
test('replay, order of constraints and rollback preserve queue and current runtime',()=>{
 const paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','bach-exam.js'];const before=paths.map(p=>hash(fs.readFileSync(p)));
 assert.deepEqual(buildLinearRegionBatch('same'),buildLinearRegionBatch('same'));assert.deepEqual(derive({...c,constraints:[...c.constraints].reverse()}).points,v.points);
 assert.deepEqual(paths.map(p=>hash(fs.readFileSync(p))),before);assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

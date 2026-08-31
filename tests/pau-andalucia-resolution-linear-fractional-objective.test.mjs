import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildFractionalObjectiveBatch} from '../scripts/resolve-andalucia-linear-fractional-objective.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {renderRationalGraph} from '../scripts/resolve-andalucia-linear-rational-and-faces.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`),c=cases[0];
const set=p=>p.map(v=>v.join(',')).sort().join('|');
test('official Q2 hash, exact fraction coefficients, three subparts and no source mutation',()=>{
 const r=buildFractionalObjectiveBatch('test').batch.records[0];assert.equal(r.parts.length,3);assert.equal(r.officialSource.documentHash,'548f60ee334516c7fa918dba3c28fb3ea5fe753cf76eb05402d7b8acb5a3b560');assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);
 assert.deepEqual(c.pdfObjectiveEvidence.coefficients,[[-1,5],[5,2]]);assert.deepEqual(c.objective,[-.2,2.5,0]);for(const p of r.parts){assert.ok(p.solutionSteps.length>=6);assert.equal(new Set([p.answer,...p.distractors]).size,4);}
});
test('triangle vertices, redundant inequality and all three wrong vertex sets checked independently',()=>{
 assert.equal(set(vertices(c.constraints)),set([[-7,-2],[-3,1],[-7,5]]));assert.ok(!feasible([-7,-4],c.constraints));assert.ok(!feasible([7,-2],c.constraints));assert.ok(!feasible([3,-1],c.constraints));
 for(let i=0;i<=1000;i++){const x=-7+4*i/1000;assert.ok((3*x+13)/4>=(5*x+19)/4-1e-9);assert.ok((3*x+13)/4<=-x-2+1e-9);}
});
test('independent exact integer evaluations and dual identities certify both global extrema',()=>{
 near(derive(c).min,-18/5);near(derive(c).max,139/10);near(-(-3)/5+5/2,31/10);
 for(let i=-100;i<=10;i++)for(let j=-60;j<=80;j++){const x=i/10,y=j/10,g=-x/5+5*y/2;near(139/10-g,5/2*(-2-x-y)+27/10*(x+7));near(g+18/5,5/8*(4*y-3*x-13)+67/40*(x+7));if(feasible([x,y],c.constraints))assert.ok(g>=-18/5-1e-9&&g<=139/10+1e-9);}
 // Wrong minimum uses an infeasible point, other alternatives omit extrema.
 near(7/5-10,-43/5);assert.ok(!feasible([-7,-4],c.constraints));assert.ok(-18/5<31/10);assert.ok(139/10>31/10);
});
test('47/3 is outside the attained range; all three alternative explanations are false',()=>{
 assert.equal(47*10-139*3,53);near(47/3-139/10,53/30);assert.ok(47/3>139/10);assert.ok(!(47/3< -18/5));
 const outside=[0,(47/3)/(5/2)];near(-outside[0]/5+5*outside[1]/2,47/3);assert.equal(feasible(outside,c.constraints),false);
});
test('negative quadrant graph labels remain exact and rendering contains no unknown values',()=>{
 const r=buildFractionalObjectiveBatch('test').batch.records[0],g=r.parts[0].visual;assert.equal(g.vertices.length,3);assert.ok(g.vertices.every(v=>feasible(v.point,g.constraints)));assert.doesNotMatch(renderRationalGraph(g),/undefined|NaN/);
});
test('deterministic replay, order invariance and no-write rollback preserve queue and PDFs',()=>{
 const a=buildFractionalObjectiveBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js',a.batch.records[0].officialSource.path],before=paths.map(p=>sha(fs.readFileSync(p)));
 assert.deepEqual(a.batch.records,buildFractionalObjectiveBatch('same').batch.records);assert.deepEqual(a.batch.records,buildFractionalObjectiveBatch('same',[...cases].reverse()).batch.records.reverse());assert.deepEqual(before,paths.map(p=>sha(fs.readFileSync(p))));assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

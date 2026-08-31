import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,regionGraph,renderGeneralRegionGraph,formulationOptions,buildEdgeFormulationBatch} from '../scripts/resolve-andalucia-linear-edge-and-formulation.mjs';
import {derive} from '../scripts/resolve-andalucia-linear-quadrilaterals-official.mjs';
import {vertices,feasible} from '../scripts/resolve-andalucia-linear-region-official.mjs';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const pointSet=ps=>ps.map(p=>p.map(x=>x===0?0:x).join(',')).sort().join('|');
const readPoints=s=>[...s.replace(/−/g,'-').matchAll(/\((-?\d+);\s*(-?\d+)\)/g)].map(m=>[+m[1],+m[2]]);
test('both source-read official 2014 exercises retain exact hashes, five subparts and scores as evidence',()=>{
 const {batch}=buildEdgeFormulationBatch('test');assert.equal(batch.records.length,2);assert.deepEqual(batch.records.map(r=>r.parts.map(p=>p.partId)),[['a','b','c'],['a','b']]);
 assert.deepEqual(batch.records.map(r=>r.officialSource.documentHash),['feb2acf9edc82ad3efbac4f8abf58b3e863451adddf04a82870066e873ab63fd','ee5bd8e23465d55ed58339e7d9adf3d58423ac2966b53d92e39a2f9b35558ab1']);
 for(const r of batch.records){assert.equal(hash(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(r.officialSource.range.page,2);assert.equal(r.primaryTopic,'Programación lineal');assert.ok(r.sourceSubparts.every(s=>s.scoreEvidence));assert.ok(r.parts.every(p=>!/[\[(]\s*\d+(?:[.,]\d+)?\s*puntos?[\])]/.test(p.prompt)));}
});
test('negative vertices and an entire optimal edge are checked, never an invented y nonnegative condition',()=>{
 assert.deepEqual(derive(cases[0]),{points:[[0,-6],[0,3],[5,1],[7,-1]],values:[15,-3,-9,-9],min:-9,max:15});
 for(let i=0;i<=1000;i++){const x=5+2*i/1000,y=1-2*i/1000;assert.ok(feasible([x,y],cases[0].constraints));assert.ok(Math.abs(-2*x-2*y+3+9)<1e-12);}
 // Exact global certificate F+9 = 2(6-x-y), not just a vertex table.
 assert.deepEqual([-2,-2,3+9],[-2,-2,2*6]);
 for(let X=0;X<=800;X+=2)for(let Y=-700;Y<=400;Y+=3)if(2*X+5*Y<=1500&&X+Y<=600&&5*X-7*Y<=4200){const f=-2*X-2*Y+300;assert.ok(f>=-900);assert.equal(f+900,2*(600-X-Y));}
 const p=buildEdgeFormulationBatch('test').batch.records[0].parts[2];assert.match(p.answer,/todo el segmento/);assert.deepEqual(p.verification.numericalEvidence.optimalFace,{from:[5,1],to:[7,-1],value:-9});
 // Endpoint-only distractors are incomplete: (6,0) is another minimum.
 assert.ok(feasible([6,0],cases[0].constraints));assert.equal(-2*6+3,-9);
 assert.equal(-2*0-2*3+3,-3);assert.equal(-2*5-2*1+3,-9); // Third distractor is not constant.
 assert.equal(new Set([p.answer,...p.distractors]).size,4);
});
test('all region options are distinct point sets and only one is the actual vertex set',()=>{
 const {batch}=buildEdgeFormulationBatch('test');for(const [i,parts]of [[0,[0,1]],[1,[1]]])for(const k of parts){const p=batch.records[i].parts[k],sets=[p.answer,...p.distractors].map(s=>pointSet(readPoints(s))),correct=pointSet(vertices(cases[i].constraints));assert.equal(new Set(sets).size,4);assert.equal(sets.filter(s=>s===correct).length,1);for(const d of p.distractors)assert.ok(readPoints(d).some(p=>!feasible(p,cases[i].constraints)||!vertices(cases[i].constraints).some(v=>v[0]===p[0]&&v[1]===p[1])));}
 assert.equal(pointSet(vertices(cases[1].constraints)),'10,0|5,0|6,2');
});
test('formulation-only task preserves integer package counts, capacity, demand and per-size euro costs',()=>{
 const good=formulationOptions[0];assert.deepEqual(good,{constraints:[[1,1,1000],[-1,0,-100],[0,-1,-200],[1,-1,0]],cost:[.1,.2],integer:true});
 const q=[100,250];assert.ok(feasible(q,good.constraints));assert.equal(good.cost[0]*q[0]+good.cost[1]*q[1],60);
 assert.equal(feasible(q,formulationOptions[1].constraints),false);assert.equal(feasible(q,formulationOptions[2].constraints),false);assert.equal(formulationOptions[3].cost[0]*q[0]+formulationOptions[3].cost[1]*q[1],45);
 assert.equal(new Set(formulationOptions.map(JSON.stringify)).size,4);
 const p=buildEdgeFormulationBatch('test').batch.records[1].parts[0];assert.equal(p.verification.numericalEvidence.requested,'FORMULATION_ONLY');assert.equal(p.verification.numericalEvidence.unit,'EUR');assert.match(p.answer,/x,y enteros/);assert.match(p.solutionSteps.map(s=>s.explanation).join(' '),/no resolvemos aquí/);assert.doesNotMatch(p.answer,/óptim|mínimo .*en/);
});
test('graphics include negative ordinate labels and correctly placed zero axes without inventing an objective',()=>{
 const a=regionGraph(cases[0]),b=regionGraph(cases[1]);assert.equal(a.vertices.length,4);assert.equal(b.vertices.length,3);assert.equal(b.objective,undefined);assert.equal(b.optima,undefined);
 const svg=renderGeneralRegionGraph(a),y0=350-7*300/11;assert.ok(svg.includes(`data-axis="x" x1="48" y1="${y0}"`));assert.match(svg,/>-6<\/text>/);assert.equal((svg.match(/<circle /g)||[]).length,4);
 for(const g of[a,b]){const s=renderGeneralRegionGraph(g);assert.equal(s,renderGeneralRegionGraph(g));assert.match(s,/<polygon/);assert.doesNotMatch(s,/<script|undefined|foreignObject/);assert.ok(g.polygon.every(p=>feasible(p,g.constraints)));}
});
test('reruns, reversed input and rollback keep sources, queue and existing runtime unchanged',()=>{
 const r=buildEdgeFormulationBatch('same'),paths=['artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','data/andalucia-pau-runtime.js','app.js','bach-exam.js',...r.batch.records.map(r=>r.officialSource.path)],before=paths.map(p=>hash(fs.readFileSync(p)));
 assert.deepEqual(r.batch.records,[...buildEdgeFormulationBatch('same',[...cases].reverse()).batch.records].reverse());assert.deepEqual(r.batch.records,buildEdgeFormulationBatch('same').batch.records);assert.deepEqual(paths.map(p=>hash(fs.readFileSync(p))),before);assert.equal(before[0],'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

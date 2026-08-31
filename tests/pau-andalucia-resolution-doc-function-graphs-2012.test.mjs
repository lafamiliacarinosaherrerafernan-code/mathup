import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {cases,solve,graphSpecs,renderDocFunctionGraph,buildDocFunctionGraphsBatch} from '../scripts/resolve-andalucia-doc-function-graphs-2012.mjs';
import {polynomial} from '../scripts/resolve-andalucia-calculus-graph-branches.mjs';
const rows=()=>buildDocFunctionGraphsBatch('native-graph-test').batch.records,eps=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`),sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('DOC0 minimum and continuity determine parameters independently; all distractors fail original requirements',()=>{const r=rows().find(x=>x.correctionEvidence.parameters.index===0),e=r.parts[0].verification.numericalEvidence;
 const satisfies=([a,b])=>4*a-4===1-b&&2*a-2===0&&a>0;assert.ok(satisfies(e.parameters));for(const w of e.wrong)assert.equal(satisfies(w),false);
 const [left,right]=graphSpecs[0].pieces;eps(polynomial(left.coefficients,2/3),-2/3);eps(polynomial(left.coefficients,0),0);eps(polynomial(left.coefficients,4/3),0);assert.equal(polynomial(left.coefficients,2),2);assert.equal(polynomial(right.coefficients,2),.5);assert.ok(left.rightClosed&&right.leftOpen);
 assert.deepEqual(r.parts[1].verification.numericalEvidence.parameters,[1.5,.5]);assert.notDeepEqual(r.parts[1].verification.numericalEvidence.parameters,e.parameters);
});
test('DOC3 rational asymptotes require noncancellation and reject signs or swapped coefficients',()=>{const e=rows().find(x=>x.correctionEvidence.parameters.index===3).parts[0].verification.numericalEvidence;
 const ok=([a,b])=>-b===-2&&a===3&&a*(-b)!==0;assert.ok(ok(e.parameters));for(const w of e.wrong)assert.equal(ok(w),false);
 for(const x of [-100,-2.1,-1.9,0,2,100])eps(3*x/(x+2),3-6/(x+2));assert.ok(3*(-2-1e-6)/(-1e-6)>1e6);assert.ok(3*(-2+1e-6)/(1e-6)<-1e6);
});
test('DOC3 cubic derivative signs, critical points, inflexion and roots checked independently',()=>{const e=rows().find(x=>x.correctionEvidence.parameters.index===3).parts[1].verification.numericalEvidence,g=x=>polynomial(e.coefficients,x),d=x=>3*x*x-6*x;
 assert.deepEqual(e.critical,[0,2]);for(const x of e.critical)assert.equal(d(x),0);assert.deepEqual([g(0),g(2)],[2,-2]);for(const x of e.roots)eps(g(x),0);
 for(const x of [-4,-1,.5,1,1.5,3,5]){eps((g(x+1e-5)-g(x-1e-5))/2e-5,d(x));assert.equal(Math.sign(d(x)),x<0||x>2?1:-1);}
 assert.equal(g(1),0);assert.ok(g(-10)<g(-4));assert.ok(g(10)>g(4));assert.equal(d(1),-3);assert.equal(g(0),2);assert.equal(g(2),-2);
});
test('DOC28 continuity, corner and first-six-year maximum are distinct constraints',()=>{const r=rows().find(x=>x.correctionEvidence.parameters.index===28),e=r.parts[0].verification.numericalEvidence;
 assert.equal(6*e.parameter-36,12);for(const a of e.wrong)assert.notEqual(6*a-36,12);const [left,right]=graphSpecs[28].pieces;assert.equal(polynomial(left.coefficients,6),polynomial(right.coefficients,6));
 for(const [x,y]of r.parts[1].verification.numericalEvidence.points)eps(polynomial((x<=6?left:right).coefficients,x),y);
 for(const t of [0,1,3,4,5,6]){eps(polynomial(left.coefficients,t),16-(t-4)**2);assert.ok(polynomial(left.coefficients,t)<=16);}
 assert.deepEqual(r.parts[2].verification.numericalEvidence.interval,[0,6]);for(const [t,y]of r.parts[2].verification.numericalEvidence.wrong)assert.equal(t>=0&&t<=6&&t===4&&y===16,false);
 assert.equal(polynomial(right.coefficients,10),20);assert.equal(polynomial(left.coefficients,10),-20);assert.deepEqual(r.parts[1].verification.numericalEvidence.slopesAtJoin,[-4,2]);
});
test('native graphs preserve endpoint ownership and reject unverified geometry',()=>{for(const spec of Object.values(graphSpecs)){const svg=renderDocFunctionGraph(spec);assert.ok(svg.startsWith('<svg'));assert.equal((svg.match(/<polyline /g)||[]).length,spec.pieces.length);assert.ok(!/NaN|undefined|Infinity/.test(svg));assert.ok(svg.includes('viewBox="0 0 760 490"'));assert.throws(()=>renderDocFunctionGraph({...spec,yRange:[-100,100]}),/verified native graph/);}
 assert.ok(renderDocFunctionGraph(graphSpecs[0]).includes('fill="white"'));assert.ok(!graphSpecs[3].pieces[0].leftClosed);assert.ok(!graphSpecs[28].pieces[1].leftOpen); // shared included point is not erased by an open circle
});
test('three native exercises contain seven fully answered official parts with twenty-one distinct distractors',()=>{const rr=rows();assert.equal(rr.length,3);assert.equal(rr.reduce((s,r)=>s+r.parts.length,0),7);for(const r of rr){assert.equal(sha(r.officialSource.path),r.officialSource.documentHash);assert.equal(r.examSlot,3);assert.equal(r.block,'Análisis');for(const p of r.parts){assert.equal(p.finalAnswer,p.answer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=6);assert.ok(!/\(\s*\d+(?:[.,]\d+)?\s*puntos?\s*\)/i.test(p.prompt));}}
 for(const r of rr)assert.equal(solve(r.correctionEvidence.parameters,r.sourceLiteral).length,r.sourceSubparts.length);
});
test('source-native graph batch is reproducible, order invariant and nonmutating',()=>{const paths=['data/andalucia-pau-runtime.js','math-renderer.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(sha),sort=a=>a.sort((x,y)=>x.exerciseId.localeCompare(y.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildDocFunctionGraphsBatch('native-graph-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(sha),before);});

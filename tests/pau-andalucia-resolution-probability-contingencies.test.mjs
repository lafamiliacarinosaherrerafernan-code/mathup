import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,buildContingencyBatch} from '../scripts/resolve-andalucia-probability-contingencies.mjs';
const rows=buildContingencyBatch().batch.records;
const expected={62:[[171,250],[13,57]],68:[[1,9],[4,9],[1,3]],72:[[9,50],[13,100],[42,55]],86:[[47,50],[2,7]],119:[[489,1000],[280,511],[18,25]],122:[[3,14],[29,70],[15,29]],131:[[1,10],[1,3],[11,30]],186:[[38,63],[9,25]],191:[[447,500],[69,265]],200:[[19,200],[12,19]]};
const fraction=s=>{const m=s.match(/^frac\{(\d+)\}\{(\d+)\}$/);assert.ok(m,s);return [+m[1],+m[2]];};
test('ten probability exercises cover all 25 official parts with complete independent solutions',()=>{
 assert.equal(rows.length,10);assert.equal(rows.flatMap(r=>r.parts).length,25);
 for(const r of rows)for(const p of r.parts){assert.equal(p.answer,p.finalAnswer);assert.equal(p.distractors.length,3);assert.equal(p.distractorEvidence.length,3);assert.ok(p.solutionSteps.length>=8);assert.doesNotMatch(JSON.stringify(p),/undefined|NaN/);}
});
test('independent rational reference values: one true and three pairwise different false options',()=>{
 for(const r of rows)for(const [i,p]of r.parts.entries()){
  const ref=expected[r.correctionEvidence.parameters.index][i],opts=[p.answer,...p.distractors].map(fraction);
  assert.deepEqual(opts.map(([n,d])=>n*ref[1]===d*ref[0]),[true,false,false,false]);
  for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)assert.notEqual(opts[a][0]*opts[b][1],opts[b][0]*opts[a][1]);
  assert.ok(opts.every(([n,d])=>n>=0&&n<=d));
 }
});
test('source marginals and conditionals reconstruct cells independently of the solution constructor',()=>{
 const independent={62:[120*.75,120*.25,60*.65,60*.35,70*.6,70*.4],68:[20,100-20,60-20,180-100-(60-20)],72:[100*.6*.3,45-100*.6*.3,60-100*.6*.3,100-45-60+100*.6*.3],86:[50,20,100-50-20-6,6],119:[1000*.7*.6,1000*.7*.4,1000*.3*.23,1000*.3*.77],122:[70*.5*3/7,70*.5*4/7,70*.5*2/5,70*.5*3/5],131:[5000*.2,5000*.8,10000*.05,10000*.95],186:[63*4/7*4/9,63*4/7*5/9,63*3/7*3/9,63*3/7*6/9],191:[2500*.08*.98,2500*.08*.02,2500*.92*.03,2500*.92*.97],200:[1000*.7*.95,1000*.7*.05,1000*.3*.8,1000*.3*.2]};
 for(const c of cases){assert.equal(c.scale,c.cells.reduce((s,x)=>s+x[2],0));c.cells.forEach((x,i)=>assert.ok(Math.abs(x[2]-independent[c.index][i])<1e-8));}
});
test('event predicates independently enumerate conditional universes and favourable atoms',()=>{
 const predicates={
 62:[[x=>x[1]==='C',()=>true],[x=>x[0]==='T',x=>x[1]==='C']],
 68:[[x=>x[0]==='M'&&x[1]==='P',()=>true],[x=>x[0]!=='H'&&x[1]!=='P',()=>true],[x=>x[1]==='P',()=>true]],
 72:[[x=>x[0]==='H'&&x[1]==='F',()=>true],[x=>x[0]==='Hc'&&x[1]==='Fc',()=>true],[x=>x[1]==='F',x=>x[0]==='Hc']],
 86:[[x=>x[0]==='T'||x[1]==='P',()=>true],[x=>x[1]==='Pc',x=>x[0]==='T']],
 119:[[x=>x[1]==='L',()=>true],[x=>x[0]==='M',x=>x[1]==='Lc'],[x=>x[1]==='L'||x[0]==='J',()=>true]],
 122:[[x=>x[0]==='A'&&x[1]==='P',()=>true],[x=>x[1]==='P',()=>true],[x=>x[0]==='A',x=>x[1]==='P']],
 131:[[x=>x[1]==='M',()=>true],[x=>x[0]==='Tc',x=>x[1]==='M'],[x=>x[0]==='T'||x[1]==='M',()=>true]],
 186:[[x=>x[1]==='N2',()=>true],[x=>x[0]==='N1',x=>x[1]==='B2']],
 191:[[x=>x[1]==='Ac',()=>true],[x=>x[0]==='Rc',x=>x[1]==='A']],
 200:[[x=>x[1]==='Rc',()=>true],[x=>x[0]==='B',x=>x[1]==='Rc']],
 };
 for(const c of cases){const atoms=c.cells.flatMap(x=>Array.from({length:x[2]},()=>x));for(const [i,[event,condition]]of predicates[c.index].entries()){const universe=atoms.filter(condition),n=universe.filter(event).length,[a,b]=expected[c.index][i];assert.equal(n*b,universe.length*a);assert.equal(n+universe.filter(x=>!event(x)).length,universe.length);}}
});
test('urn transfer independently enumerates the seven by nine equiprobable physical choices',()=>{
 const first=['W','W','W','W','B','B','B'],second=['W','W','W','B','B','B','B','B'];
 const pairs=first.flatMap(a=>[...second,a].map(b=>[a,b]));assert.equal(pairs.length,63);
 assert.equal(pairs.filter(x=>x[1]==='B').length,38);
 const white=pairs.filter(x=>x[1]==='W');assert.equal(white.length,25);assert.equal(white.filter(x=>x[0]==='B').length,9);
});
test('official hashes, literal guards, deterministic rebuilding and reversed order',()=>{
 const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),norm=rs=>rs.map(r=>[r.exerciseId,r.parts,r.sourceLiteral]).sort((a,b)=>a[0].localeCompare(b[0]));
 for(const r of rows){assert.equal(sha(fs.readFileSync(r.officialSource.path)),r.officialSource.documentHash);assert.equal(r.primaryTopic,'Probabilidad');}
 assert.deepEqual(norm(rows),norm(buildContingencyBatch().batch.records));assert.deepEqual(norm(rows),norm(buildContingencyBatch('batch-0261',[...cases].reverse()).batch.records));
 assert.throws(()=>buildContingencyBatch('not-consumed',[{...cases[0],literals:['not an official datum']} ]));
 assert.equal(sha(fs.readFileSync('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl')),'64103b8ac81b8497b7940ec3908b1812f5d456d6baa2a2961a15d38d2b71c64b');
});

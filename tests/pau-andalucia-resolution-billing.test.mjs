import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8').trim().split(/\r?\n/).map(JSON.parse);
const all=read('../artifacts/pau-andalucia-resolution/completed-exercises.jsonl');
const r=all.find(x=>x.exerciseId==='pau-can-doc-ex-01e2a496032779ec72e9ea5b8db8df94');
const canonical=read('../artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl').find(x=>x.exerciseId===r.exerciseId);
const sum=(...ms)=>ms[0].map((row,i)=>row.map((_,j)=>ms.reduce((s,m)=>s+m[i][j],0)));
const bill=(m,prices)=>m.map(row=>row.reduce((s,n,j)=>s+n*prices[j],0));
const money=s=>{const m=s.match(/^Clientes: (\d+), (\d+) y (\d+) euros; total: (\d+) euros\.$/);assert.ok(m,'Los cuatro importes deben constar explícitamente');return m.slice(1).map(Number);};
const months=()=>Object.fromEntries(['Enero','Febrero','Marzo'].map(label=>{const m=r.parts[0].answer.match(new RegExp(label+'=(\\[\\[.*?\\]\\])'));assert.ok(m,`Matriz ${label} explícita`);return[label.toLowerCase(),JSON.parse(m[1])];}));
test('compras mensuales: datos oficiales, dimensiones y cuatro opciones distintas',()=>{
 assert.equal(canonical.documentHash,'c8688a19515dfeb348e8f8817d3f4a6c0a967723c270f2ec42e7f365d001e555');
 const text=canonical.learnerContent.map(x=>x.text||'').join('');
 for(const literal of ['9 unidades de A y 5 de B','3 de A y 7 de B','4 de A y 6 de B','80 y 100'])assert.ok(text.includes(literal));
 const enero=[[9,5],[3,7],[4,6]],febrero=enero.map((row,i)=>row.map(x=>i<2?2*x:x+1));
 const marzo=febrero.map((row,i)=>row.map(x=>i===0?0:x));
 assert.deepEqual(months(),{enero,febrero,marzo});
 for(const p of r.parts){assert.equal(new Set([p.answer,...p.distractors].map(JSON.stringify)).size,4);assert.deepEqual(p.answer,p.finalAnswer);}
});
test('suma trimestral y facturación recalculadas independientemente',()=>{
 const m=months(),total=sum(m.enero,m.febrero,m.marzo);
 assert.deepEqual(JSON.parse(r.parts[1].answer.slice(2)),total);
 const amounts=bill(total,[80,100]);assert.deepEqual(amounts,[3660,4700,3120]);
 assert.deepEqual(money(r.parts[2].answer),[...amounts,amounts.reduce((a,b)=>a+b,0)]);
});
test('cada distractor monetario reproduce exactamente su error didáctico',()=>{
 const m=months(),total=sum(m.enero,m.febrero,m.marzo);
 const wrong=[bill(total,[100,80]),bill(sum(m.enero,m.febrero),[80,100]),bill(total,[1,1])];
 wrong.forEach((amounts,i)=>assert.deepEqual(money(r.parts[2].distractors[i]),[...amounts,amounts.reduce((a,b)=>a+b,0)]));
 const correct=money(r.parts[2].answer);wrong.forEach(v=>assert.notDeepEqual(v,correct.slice(0,3)));
});

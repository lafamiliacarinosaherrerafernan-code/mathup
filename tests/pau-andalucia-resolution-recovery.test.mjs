import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
const rows=fs.readFileSync(new URL('../artifacts/pau-andalucia-resolution/completed-exercises.jsonl',import.meta.url),'utf8').trim().split(/\r?\n/).map(JSON.parse);
const get=i=>rows.find(x=>x.queueIndex===i);
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
test('1516: máximo global por certificado dual y mínimo no acotado',()=>{
 near(-.4+1.4,1);near(3*.4+2*1.4,4);near(.4*21+1.4*19,35);
 near(3+4*8,35);
 for(const t of [0,1,100,10000]){const x=0,y=-t;assert.ok(y-2*x<=7&&-x+3*y<=21&&x+2*y<=19&&x+y<=14);near(x+4*y,-4*t);}
 assert.match(get(1516).parts[1].answer,/no existe mínimo/);
 const plot=get(1516).parts[0].visual;
 assert.equal(plot.plotVersion,'linear-unbounded-region-v1');
 assert.deepEqual(plot.recessionWitness.direction,[0,-1]);
 assert.equal(plot.optima.minimum.unboundedBelow,true);
 assert.equal(plot.vertices.length,3);
});
test('1546: área del trapecio, derivada y máximo interior',()=>{
 const A=x=>(10+x)*Math.sqrt(100-x*x);
 const d=x=>(100-10*x-2*x*x)/Math.sqrt(100-x*x);
 for(const x of [1,3,5,7,9]){const h=1e-5;near((A(x+h)-A(x-h))/(2*h),d(x),1e-6);}
 near(d(5),0);assert.ok(d(1)>0&&d(9)<0);near(A(5),75*Math.sqrt(3));
 assert.ok(A(5)>A(0)&&A(5)>A(10));assert.equal(get(1546).parts.length,3);
});
test('1564: beneficio, gasto, raíces, dominio y vértice coherentes',()=>{
 const B=t=>-t*t+21*t-20,I=t=>-t*t+48*t;
 for(const t of [0,1,5,10.5,15]){near(I(t)-B(t),27*t+20);near(B(t),90.25-(t-10.5)**2);}
 near(B(1),0);assert.ok(B(.5)<0&&B(2)>0&&B(15)>0);near(B(10.5)*1000,90250);
 assert.deepEqual(get(1564).parts[3].graphicSpec.domain,[0,15]);
});
test('1565: sistema de las placas y cuadrado de la matriz contrastados',()=>{
 const M=[[2,1,3],[1,3,2],[3,2,1]],v=[450,500,520],b=[2960,2990,2870];
 const det=M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1])-M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0])+M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0]);
 near(det,-18);M.forEach((row,i)=>near(row.reduce((s,x,j)=>s+x*v[j],0),b[i]));
 const K=[[1,1],[0,-1]],Kv=x=>K.map(row=>row.reduce((s,a,j)=>s+a*x[j],0));
 assert.deepEqual(Kv(Kv([4,1])),[4,1]);assert.deepEqual([2,.5].map(x=>2*x),[4,1]);
 assert.match(get(1565).parts[0].answer,/(?:A=450 W, B=500 W, C=520 W|\(potencia A, potencia B, potencia C\) en W=\[\[450\],\[500\],\[520\]\])/);
});
test('1013: la resolución corresponde a ordenador/tablet y conserva los subapartados',()=>{
 const r=get(1013);assert.equal(r.year,2022);assert.deepEqual(r.parts.map(p=>p.partId),['a','b']);
 // The PDF groups the three probabilities under a), followed by b).
 // Preserve that scope rather than inventing four official lettered parts.
 assert.match(r.parts[0].answer,/9.*10/);
 assert.match(r.parts[0].answer,/1.*4/);
 assert.match(r.parts[0].answer,/2.*5/);
 assert.match(r.sourceLiteral,/ordenador/);assert.doesNotMatch(JSON.stringify(r.parts),/Marta|trajes|zapatos/);
 const counts={both:20,computerOnly:40,tabletOnly:30,neither:10};
 assert.equal(Object.values(counts).reduce((a,b)=>a+b),100);
 near((counts.both+counts.computerOnly+counts.tabletOnly)/100,.9);
 near(counts.neither/(counts.neither+counts.tabletOnly),.25);
 assert.notEqual(.6*.5,.2);
});
test('1228: los cuatro valores de Bayes son distintos y solo uno es la posterior solicitada',()=>{
 const trueValue=(.15*.92)/(.15*.92+.85*.04);
 const parse=x=>{const s=x.replace(',','.');const m=s.match(/^frac\{(\d+)\}\{(\d+)\}$/);return m?Number(m[1])/Number(m[2]):Number(s);};
 near(trueValue,69/86);const p=get(1228).parts.find(x=>x.partId==='a');near(parse(p.answer),trueValue);
 const incorrect=p.distractors.map(parse);
 assert.ok(incorrect.every(x=>Math.abs(x-trueValue)>.001));assert.equal(new Set(incorrect).size,3);
 // The source-read replacement uses exact sensitivity, prevalence and joint,
 // not the superseded rounded options from the early preparation pass.
 assert.deepEqual(incorrect,[.92,.15,.138]);
});
test('1587: umbral de tamaño muestral y redondeo estricto coherentes',()=>{
 const z=2.807033768343811,limit=z*z*.46*.54/.0025;
 near(limit,782.9010169732071,1e-5);assert.equal(Math.floor(limit)+1,783);
 assert.ok(z*Math.sqrt(.2484/782)>.05&&z*Math.sqrt(.2484/783)<.05);
 const evidence=get(1587).parts.find(p=>p.partId==='b').verification.numericalEvidence;
 near(evidence.bound,limit,1e-6);assert.equal(evidence.minimum,783);
 assert.ok(evidence.marginAtMinimum<.05&&evidence.marginAtPrevious>.05);
});

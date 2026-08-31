// Source-grounded linear programming. The graphic is derived from the verified
// constraints, not a replacement for the official statement or a stock picture.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[{index:376,kind:'linear-programming',constraints:[[-1,3,0],[1,0,5],[0,-1,-1]],objective:[2,-3],point:[4.5,1.55],targets:[3.5,7.5],literals:['x ≥ 3y, x ≤ 5, y ≥ 1','(4.5, 1.55)','2x − 3y','3.5. ¿Y 7.5?']}];
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
export const feasible=(p,cs)=>cs.every(([a,b,c])=>a*p[0]+b*p[1]<=c+1e-12);
export function vertices(cs){
 const result=[];
 for(let i=0;i<cs.length;i++)for(let j=i+1;j<cs.length;j++){
  const [a,b,c]=cs[i],[d,e,f]=cs[j],det=a*e-b*d;if(!det)continue;
  const p=[(c*e-b*f)/det,(a*f-c*d)/det];
  if(feasible(p,cs)&&!result.some(q=>q.every((v,k)=>Math.abs(v-p[k])<1e-12)))result.push(p);
 }
 return result.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
}
export function derive(c){const points=vertices(c.constraints),values=points.map(([x,y])=>c.objective[0]*x+c.objective[1]*y);return{points,values,min:Math.min(...values),max:Math.max(...values),slacks:c.constraints.map(([a,b,k])=>k-a*c.point[0]-b*c.point[1])};}
// Coordinates and labels are data. No absolute-position HTML or raster tracing.
export function graph(c){
 const v=derive(c),cx=v.points.reduce((s,p)=>s+p[0],0)/v.points.length,cy=v.points.reduce((s,p)=>s+p[1],0)/v.points.length;
 const polygon=[...v.points].sort((a,b)=>Math.atan2(a[1]-cy,a[0]-cx)-Math.atan2(b[1]-cy,b[0]-cx));
 return {schemaVersion:'mathup.linear-programming-visual.v1',visualRequired:true,visualType:'linear-programming-region',constraints:c.constraints,objective:c.objective,viewBox:[0,0,640,340],domain:{x:[0,6],y:[0,2.2]},polygon,vertices:v.points.map((p,i)=>({point:p,label:['A = (3; 1)','B = (5; 1)','C = (5; 5/3)'][i],objectiveValue:v.values[i]})),optima:{minimum:{point:v.points[v.values.indexOf(v.min)],value:v.min},maximum:{point:v.points[v.values.indexOf(v.max)],value:v.max}},origin:'DERIVED_FROM_RESOLVED_OFFICIAL_CONSTRAINTS_NOT_OFFICIAL_IMAGE'};
}
export function renderGraph(g){
 const X=x=>50+x*90,Y=y=>295-y*110;
 const line=(x1,y1,x2,y2,color)=>`<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${color}" stroke-width="2"/>`;
 const ticks=Array.from({length:7},(_,x)=>`<text x="${X(x)}" y="316" text-anchor="middle">${x}</text>`).join('');
 const ys=[1,2].map(y=>`<text x="35" y="${Y(y)+5}" text-anchor="end">${y}</text>`).join('');
 const points=g.vertices.map(({point:[x,y],label,objectiveValue},i)=>`<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="${objectiveValue===g.optima.maximum.value?'#b42318':'#14532d'}"/>${i===2?`<g transform="translate(${X(x)+12},${Y(y)-12})"><text x="0" y="0">C = (5;</text><text x="64" y="-7" text-anchor="middle" font-size="13">5</text><line x1="57" y1="-3" x2="71" y2="-3" stroke="currentColor"/><text x="64" y="12" text-anchor="middle" font-size="13">3</text><text x="76" y="0">)</text></g>`:`<text x="${X(x)+(x===3?-8:12)}" y="${Y(y)+23}" text-anchor="${x===3?'end':'start'}">${label}</text>`}`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340" role="img" aria-labelledby="title description"><title id="title">Región factible y vértices</title><desc id="description">Intersección x mayor o igual que 3y, x menor o igual que 5, y mayor o igual que 1. Triángulo A (3,1), B (5,1), C (5,5 tercios). F alcanza mínimo 3 en A y máximo 7 en B.</desc><rect width="640" height="340" fill="white"/><g font-family="Arial,sans-serif" font-size="15" fill="#16243a">${line(0,0,6,0,'#16243a')}${line(0,0,0,2.2,'#16243a')}${ticks}${ys}<text x="609" y="301">x</text><text x="44" y="39">y</text><polygon points="${g.polygon.map(([x,y])=>`${X(x)},${Y(y)}`).join(' ')}" fill="#c8ecdf" stroke="#217a59" stroke-width="2"/>${line(0,0,6,2,'#275dad')}${line(5,0,5,2.2,'#b42318')}${line(0,1,6,1,'#217a59')}<text x="240" y="75">x = 3y; región a la derecha</text><text x="600" y="35" text-anchor="end">x = 5; a la izquierda</text><text x="65" y="173">y = 1; por encima</text>${points}<text x="329" y="156">R</text></g></svg>`;
}
export function solve(c,text){
 const p=officialParts(text),v=derive(c);assert.equal(p.length,3);
 const a=part(p[0],'No: incumple x ≥ 3y.', ['Sí: satisface las tres restricciones.','No: incumple x ≤ 5.','No: incumple y ≥ 1.'], ['Comprobar solo dos restricciones.','Atribuir el fallo a la cota de x, que sí cumple.','Atribuir el fallo a la cota de y, que sí cumple.'],[
  ['Un punto pertenece a la región común únicamente si satisface simultáneamente las tres inecuaciones.','R: x ≥ 3y; x ≤ 5; y ≥ 1'],
  ['Sustituimos el punto, sin redondear 1,55 a 1,5.','x=4,5; y=1,55'],
  ['Comprobamos la primera restricción calculando el triple de la segunda coordenada.','3·1,55=4,65; 4,5<4,65'],
  ['Las otras dos restricciones sí se cumplen, pero no compensan el fallo anterior.','4,5≤5; 1,55≥1'],
  ['La diferencia exacta confirma que el punto está fuera del semiplano de la primera restricción.','4,5−3·1,55=−0,15<0'],
  ['Concluimos la pertenencia a partir de las tres comprobaciones.','El punto (4,5; 1,55) no pertenece a R.'],
 ],'LINEAR_FEASIBILITY_EXACT_SUBSTITUTION',{slacks:v.slacks,violations:[0]});
 const b=part(p[1],'Mínimo 3 en (3; 1); máximo 7 en (5; 1).',['Mínimo 5 en (5; frac{5}{3}); máximo 7 en (5; 1).','Mínimo 3 en (3; 1); máximo 5 en (5; frac{5}{3}).','Mínimo −7 en (5; 1); máximo −3 en (3; 1).'],['Omitir el vértice A al comparar.','Omitir el vértice B al comparar.','Optimizar la función opuesta en lugar de F.'],[
  ['Aplicamos el método gráfico. Las fronteras son rectas y el semiplano válido queda a la derecha de x=3y, a la izquierda de x=5 y por encima de y=1.','x=3y; x=5; y=1'],
  ['Intersecamos las dos primeras fronteras que fijan A: y=1 y x=3y.','y=1 ⇒ x=3 ⇒ A=(3; 1)'],
  ['Intersecamos x=5 con y=1 para obtener B.','B=(5; 1)'],
  ['Intersecamos x=5 con x=3y para obtener C.','5=3y ⇒ y=frac{5}{3} ⇒ C=(5; frac{5}{3})'],
  ['Los tres vértices satisfacen todas las restricciones. La región triangular sombreada es cerrada y acotada, y una función lineal alcanza sus extremos en sus vértices.','R: 3≤x≤5; 1≤y≤frac{x}{3}'],
  ['Evaluamos la función objetivo en A sin confundirla con la ecuación de frontera.','F(3;1)=2·3−3·1=3'],
  ['Evaluamos el segundo vértice.','F(5;1)=2·5−3·1=7'],
  ['Evaluamos el vértice fraccionario conservando el valor exacto.','F(5;frac{5}{3})=10−3·frac{5}{3}=5'],
  ['Comparamos los tres valores y localizamos el extremo sobre la gráfica.','3<5<7; mínimo 3 en A; máximo 7 en B'],
  ['Comprobación independiente: combinamos directamente las restricciones para acotar F, sin repetir la tabla de vértices.','F−3=2(x−3y)+3(y−1)≥0; 7−F=2(5−x)+3(y−1)≥0'],
 ],'LINEAR_VERTEX_ENUMERATION_AND_DUAL_BOUND_CERTIFICATES',{...v,lowerCertificate:[2,0,3],upperCertificate:[0,2,3]});
 b.visual=graph(c);
 const d=part(p[2],'F=3,5: sí; F=7,5: no.',['F=3,5: sí; F=7,5: sí.','F=3,5: no; F=7,5: no.','F=3,5: no; F=7,5: sí.'],['Olvidar el máximo global y admitir un valor superior.','Creer que F solo puede tomar los valores de los vértices.','Invertir qué valor está dentro del intervalo de extremos.'],[
  ['El apartado anterior acota todos los valores posibles de la función en la región.','3≤F(x,y)≤7'],
  ['Para demostrar que 3,5 es alcanzable, buscamos un punto en el borde horizontal y=1.','2x−3=3,5 ⇒ 2x=6,5 ⇒ x=3,25'],
  ['Comprobamos que el punto propuesto pertenece realmente a R.','3,25≥3·1; 3,25≤5; 1≥1'],
  ['Sustituimos en la función para comprobar el valor solicitado.','F(3,25;1)=6,5−3=3,5'],
  ['El valor 7,5 es superior al máximo de F en toda la región, no solo en el ejemplo elegido.','7,5>7 ⇒ no existe punto de R con F=7,5'],
  ['Una comprobación geométrica adicional: en el segmento de A a B, F recorre continuamente todos los valores entre 3 y 7.','(x,y)=(3+2t;1), 0≤t≤1 ⇒ F=3+4t; t=frac{1}{8} ⇒ F=3,5'],
 ],'LINEAR_TARGET_WITNESS_AND_GLOBAL_BOUND',{witness:[3.25,1],value:3.5,impossible:7.5,bound:7});
 return[a,b,d];
}
export function buildLinearRegionBatch(id='batch-0290',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_DETAILED_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const r=buildLinearRegionBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0290-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');
 fs.writeFileSync('tmp/batch-0290.json',JSON.stringify(r.batch,null,2)+'\n');
 const g=graph(cases[0]),svg=renderGraph(g),out='artifacts/pau-andalucia-resolution/linear-visuals';fs.mkdirSync(out,{recursive:true});fs.writeFileSync(out+'/q376.svg',svg);fs.writeFileSync(out+'/q376.json',JSON.stringify({graph:g,svgHash:sha(svg),pdfSha256:'f8633bbd91d33bee02c2cc582c33b7ffeb3643f312b810ad0bb8c5d154d0721d',sourcePage:1,publication:'NOT_ENABLED',humanApproval:false},null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:3,answers:r.batch.records[0].parts.map(p=>p.answer),graphic:out+'/q376.svg'}));
}

// Two complete source-read official exercises. A graphic is derived from the
// inequalities; it is not an official image or a replacement for the literal.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {vertices,feasible} from './resolve-andalucia-linear-region-official.mjs';
export const cases=[
 {index:150,kind:'linear-quadrilateral',constraints:[[-1,-3,-9],[-4,5,25],[7,-2,17],[-1,0,0],[0,-1,0]],objective:[2,-1,6],domain:{x:[0,6],y:[0,10]},labels:['x + 3y ≥ 9','4x − 5y + 25 ≥ 0','7x − 2y ≤ 17','x ≥ 0','y ≥ 0'],literals:['x + 3y ≥ 9','4x − 5y + 25 ≥ 0','7x − 2 y ≤ 17','x ≥ 0; y ≥ 0','2x − y + 6']},
 {index:394,kind:'linear-quadrilateral',constraints:[[-1,-2,-7],[2,-1,4],[-4,1,-1],[3,2,20]],objective:[1,3,0],domain:{x:[0,5],y:[0,9]},labels:['x + 2y ≥ 7','2x − y ≤ 4','4x − y ≥ 1','3x + 2y ≤ 20'],literals:['𝑥 + 2𝑦 ≥ 7','2𝑥 − 𝑦 ≤ 4','4𝑥 − 𝑦 ≥ 1','3𝑥 + 2𝑦 ≤ 20','𝐹(𝑥, 𝑦) = 𝑥 + 3𝑦']},
];
export function derive(c){const points=vertices(c.constraints).map(p=>p.map(v=>v===0?0:v)),values=points.map(([x,y])=>c.objective[0]*x+c.objective[1]*y+c.objective[2]);return{points,values,min:Math.min(...values),max:Math.max(...values)};}
export function graph(c){const v=derive(c),center=v.points.reduce((a,p)=>[a[0]+p[0]/v.points.length,a[1]+p[1]/v.points.length],[0,0]);
 const polygon=[...v.points].sort((a,b)=>Math.atan2(a[1]-center[1],a[0]-center[0])-Math.atan2(b[1]-center[1],b[0]-center[0]));
 return {schemaVersion:'mathup.linear-programming-visual.v1',plotVersion:'integer-quadrilateral-v1',visualRequired:true,visualType:'linear-programming-region',constraints:c.constraints,objective:c.objective,domain:c.domain,labels:c.labels,polygon,vertices:polygon.map((point,i)=>({point,label:String.fromCharCode(65+i)})),optima:{minimum:{point:v.points[v.values.indexOf(v.min)],value:v.min},maximum:{point:v.points[v.values.indexOf(v.max)],value:v.max}},origin:'DERIVED_FROM_RESOLVED_OFFICIAL_CONSTRAINTS_NOT_OFFICIAL_IMAGE'};
}
const xml=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export function renderQuadrilateralGraph(g){
 assert.equal(g.plotVersion,'integer-quadrilateral-v1');
 const [xmin,xmax]=g.domain.x,[ymin,ymax]=g.domain.y,X=x=>48+(x-xmin)*410/(xmax-xmin),Y=y=>350-(y-ymin)*300/(ymax-ymin);
 const colors=['#275dad','#ac3e24','#6750a4','#147a52','#7a520c'];
 const boundaries=g.constraints.map(([a,b,k],i)=>{
  const ends=[];if(b)for(const x of[xmin,xmax]){const y=(k-a*x)/b;if(y>=ymin&&y<=ymax)ends.push([x,y]);}
  if(a)for(const y of[ymin,ymax]){const x=(k-b*y)/a;if(x>=xmin&&x<=xmax&&!ends.some(p=>p[0]===x&&p[1]===y))ends.push([x,y]);}
  if(ends.length<2)return '';return `<line x1="${X(ends[0][0])}" y1="${Y(ends[0][1])}" x2="${X(ends[1][0])}" y2="${Y(ends[1][1])}" stroke="${colors[i%5]}" stroke-width="2"/>`;
 }).join('');
 const points=g.vertices.map(({point:[x,y],label})=>`<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="#15243b"/><text x="${X(x)+8}" y="${Y(y)-9}">${label}</text>`).join('');
 const ticksX=Array.from({length:xmax-xmin+1},(_,i)=>i+xmin).map(x=>`<text x="${X(x)}" y="373" text-anchor="middle">${x}</text>`).join('');
 const ticksY=Array.from({length:ymax-ymin+1},(_,i)=>i+ymin).filter(y=>y>0).map(y=>`<text x="37" y="${Y(y)+5}" text-anchor="end">${y}</text>`).join('');
 const legend=g.labels.map((s,i)=>`<text x="480" y="${65+i*29}" fill="${colors[i%5]}">${xml(s)}</text>`).join('');
 const coords=g.vertices.map(({label,point:[x,y]},i)=>`<text x="480" y="${245+i*25}">${label} = (${x}; ${y})</text>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 440" role="img" aria-labelledby="title description"><title id="title">Recinto factible y sus vértices</title><desc id="description">Región sombreada que satisface simultáneamente ${xml(g.labels.join('; '))}. ${xml(g.vertices.map(v=>v.label+' ('+v.point.join(', ')+')').join('; '))}.</desc><rect width="690" height="440" fill="white"/><g font-family="Arial,sans-serif" font-size="16" fill="#15243b"><line x1="48" y1="350" x2="466" y2="350" stroke="#15243b"/><line x1="48" y1="350" x2="48" y2="38" stroke="#15243b"/>${ticksX}${ticksY}<text x="465" y="370">x</text><text x="40" y="30">y</text><polygon points="${g.polygon.map(([x,y])=>`${X(x)},${Y(y)}`).join(' ')}" fill="#c8ecdf" stroke="#147a52" stroke-width="2"/>${boundaries}${points}${legend}${coords}<text x="48" y="408">La zona sombreada es la intersección de los semiplanos.</text></g></svg>`;
}
const proof=c=>({...derive(c),constraints:c.constraints,objective:c.objective});
export function solve(c,text){const p=officialParts(text),v=derive(c);
 if(c.index===150){assert.equal(p.length,3);
 const a=part(p[0],'Cuadrilátero con vértices (0;3), (3;2), (5;9), (0;5).',[
  'Cuadrilátero con vértices (0;3), (9;0), (5;9), (0;5).',
  'Cuadrilátero con vértices (0;3), (3;2), (5;9), (0;−5).',
  'Cuadrilátero con vértices (0;3), (3;2), (5;9), (0;0).'],[
  'Usar el corte de la primera recta con el eje x aunque incumple otra restricción.',
  'Cambiar el signo del término independiente en el corte con el eje y.',
  'Incluir el origen sin comprobar la primera desigualdad.'],[
  ['Dibujamos las rectas frontera sustituyendo cada desigualdad por igualdad. Las restricciones de signo limitan el trabajo al primer cuadrante.','x+3y=9; 4x−5y+25=0; 7x−2y=17; x=0; y=0'],
  ['Despejamos y en la primera restricción para elegir el semiplano superior.','y≥3−frac{x}{3}'],
  ['En la segunda, dividir por un coeficiente negativo cambia el sentido de la desigualdad.','−5y≥−4x−25 ⇒ y≤frac{4}{5}x+5'],
  ['En la tercera volvemos a cambiar el sentido al dividir por −2.','−2y≤17−7x ⇒ y≥frac{7x−17}{2}'],
  ['La región válida queda por encima de las dos cotas inferiores y por debajo de la superior, con coordenadas no negativas. El origen no pertenece a ella.','(0;0): 0+3·0<9'],
  ['Las intersecciones de las fronteras activas delimitan el cuadrilátero que aparece sombreado. El apartado siguiente detalla su cálculo.','A=(0;3); B=(3;2); C=(5;9); D=(0;5)'],
  ['Comprobamos un punto interior para verificar la elección simultánea de los semiplanos.','(2;4): 14≥9; 8−20+25=13≥0; 14−8=6≤17'],
 ],'LINEAR_HALFPLANE_AND_INTERSECTION_CHECK',proof(c));a.visual=graph(c);
 const b=part(p[1],'(0;3), (3;2), (5;9), (0;5).',[
  '(0;3), (9;0), (5;9), (0;5).','(0;3), (3;2), (5;9), (0;−5).','(0;3), (3;2), (5;9), (0;0).'],a.distractorEvidence,[
  ['Intersecamos x=0 con la primera recta.','3y=9 ⇒ A=(0;3)'],
  ['Para B resolvemos las dos fronteras inferiores. Multiplicamos la primera por 2 y la segunda por 3 para eliminar y.','x+3y=9; 7x−2y=17 ⇒ 2x+6y=18; 21x−6y=51'],
  ['Sumamos, despejamos x y sustituimos para obtener y.','23x=69 ⇒ x=3; 3+3y=9 ⇒ y=2 ⇒ B=(3;2)'],
  ['Para C intersecamos las fronteras segunda y tercera. Eliminamos y multiplicando por 2 y 5.','4x−5y=−25; 7x−2y=17 ⇒ 8x−10y=−50; 35x−10y=85'],
  ['Restamos ambas ecuaciones y sustituimos.','27x=135 ⇒ x=5; 35−2y=17 ⇒ y=9 ⇒ C=(5;9)'],
  ['La frontera superior corta el eje y en el último vértice.','x=0; −5y+25=0 ⇒ D=(0;5)'],
  ['Descartamos el cruce de las dos primeras rectas: su abscisa negativa incumple x≥0. Tampoco hay puntos de la región sobre y=0, pues exigiría simultáneamente x≥9 y x≤17/7.','x=−frac{30}{17}<0; 9>frac{17}{7}'],
  ['Sustituimos cada vértice en las tres expresiones de restricción. Todos cumplen las desigualdades y tienen coordenadas no negativas.','(x+3y;4x−5y+25;7x−2y): A=(9;10;−6), B=(9;27;17), C=(32;0;17), D=(15;0;−10)'],
 ],'LINEAR_PAIRWISE_INTERSECTIONS_AND_SUBSTITUTION',proof(c));
 const d=part(p[2],'Máximo 10 en (3;2); mínimo 1 en (0;5).',[
  'Máximo 7 en (5;9); mínimo 1 en (0;5).','Máximo 10 en (3;2); mínimo 3 en (0;3).','Máximo 1 en (0;5); mínimo 10 en (3;2).'],[
  'Elegir el vértice con coordenadas mayores sin evaluar correctamente la función.',
  'Omitir el vértice D al comparar los mínimos.','Intercambiar máximo y mínimo.'],[
  ['La región es un polígono cerrado y acotado. Una función lineal alcanza sus extremos en vértices; conservamos también el término independiente 6.','F(x,y)=2x−y+6'],
  ['Evaluamos A.','F(0,3)=0−3+6=3'],['Evaluamos B.','F(3,2)=6−2+6=10'],['Evaluamos C.','F(5,9)=10−9+6=7'],['Evaluamos D.','F(0,5)=0−5+6=1'],
  ['Comparamos todos los valores, no las coordenadas de los puntos.','1<3<7<10 ⇒ mínimo 1 en D; máximo 10 en B'],
  ['Verificación independiente del mínimo: esta combinación de restricciones es no negativa en todo el recinto. Solo se anula en x=0 e y=5.','F−1=frac{1}{5}(4x−5y+25)+frac{6}{5}x≥0'],
  ['Verificación independiente del máximo: ambas holguras son no negativas. La igualdad exige que se corten las dos fronteras en B.','10−F=frac{3}{23}(x+3y−9)+frac{7}{23}(17−7x+2y)≥0'],
 ],'LINEAR_OBJECTIVE_TABLE_AND_EXACT_DUAL_CERTIFICATES',proof(c));return[a,b,d];
 }
 assert.equal(c.index,394);assert.equal(p.length,2);
 const a=part(p[0],'Vértices (1;3), (3;2), (4;4), (2;7).',[
  'Vértices (1;3), (3;2), (4;4), (2;−7).','Vértices (1;3), (3;2), (0;4), (2;7).','Vértices (1;3), (0;0), (4;4), (2;7).'],[
  'Cambiar el signo de la ordenada al sustituir en una recta.',
  'Confundir el término independiente 4 con una coordenada de un vértice.',
  'Incluir el origen sin comprobar x+2y≥7.'],[
  ['Aplicamos el método gráfico. Cada restricción selecciona un semiplano; no añadimos condiciones x≥0 o y≥0 que no figuran en el enunciado.','y≥frac{7−x}{2}; y≥2x−4; y≤4x−1; y≤10−frac{3}{2}x'],
  ['Representamos las cuatro fronteras. La región común está por encima de las dos cotas inferiores y por debajo de las dos superiores.','x+2y=7; 2x−y=4; 4x−y=1; 3x+2y=20'],
  ['A es el cruce de la primera y la tercera. Sustituimos y=4x−1.','x+2(4x−1)=7 ⇒ 9x=9 ⇒ x=1; y=3 ⇒ A=(1;3)'],
  ['B es el cruce de las dos fronteras inferiores.','x+2(2x−4)=7 ⇒ 5x=15 ⇒ x=3; y=2 ⇒ B=(3;2)'],
  ['C es el cruce de la segunda y la cuarta.','3x+2(2x−4)=20 ⇒ 7x=28 ⇒ x=4; y=4 ⇒ C=(4;4)'],
  ['D es el cruce de las dos fronteras superiores.','3x+2(4x−1)=20 ⇒ 11x=22 ⇒ x=2; y=7 ⇒ D=(2;7)'],
  ['Los otros dos cruces no son vértices factibles. El primero incumple la segunda restricción y el segundo incumple la primera.','(frac{13}{2};frac{1}{4}): 2x−y>4; (−frac{3}{2};−7): x+2y<7'],
  ['Comprobamos los cuatro vértices en todas las restricciones. Sus holguras no negativas verifican la región sombreada.','(x+2y−7;4−2x+y;4x−y−1;20−3x−2y): A=(0;5;0;11), B=(0;0;9;7), C=(5;0;11;0), D=(9;7;0;0)'],
 ],'LINEAR_VERTEX_ENUMERATION_AND_FEASIBILITY',proof(c));a.visual=graph(c);
 const b=part(p[1],'Máximo 23 en (2;7).',['Máximo 16 en (4;4).','Máximo 10 en (1;3).','Máximo 9 en (3;2).'],[
  'Elegir la abscisa mayor sin considerar el coeficiente 3 de y.',
  'Evaluar solo el primer vértice.','Confundir el mínimo con el máximo.'],[
  ['La función objetivo es lineal y la región es cerrada y acotada: basta comparar sus valores en todos los vértices.','F(x,y)=x+3y'],
  ['Evaluamos en A.','F(1,3)=1+9=10'],['Evaluamos en B.','F(3,2)=3+6=9'],['Evaluamos en C.','F(4,4)=4+12=16'],['Evaluamos en D.','F(2,7)=2+21=23'],
  ['El mayor valor corresponde a D. No se comparan solamente las abscisas ni las ordenadas.','23>16>10>9 ⇒ máximo 23 en (2;7)'],
  ['Verificación independiente: las dos holguras superiores son no negativas y su combinación acota la función en cualquier punto factible.','23−F=frac{7}{11}(4x−y−1)+frac{13}{11}(20−3x−2y)≥0'],
  ['Para alcanzar la igualdad deben anularse ambas holguras. Las dos rectas se cortan en D, de modo que el máximo es único.','4x−y=1; 3x+2y=20 ⇒ (x,y)=(2;7)'],
 ],'LINEAR_GLOBAL_MAXIMUM_DUAL_CERTIFICATE',proof(c));return[a,b];
}
export function buildQuadrilateralBatch(id='batch-0291',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_DETAILED_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildQuadrilateralBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0291-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0291.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0),answers:r.batch.records.map(r=>r.parts.map(p=>p.answer))}));}

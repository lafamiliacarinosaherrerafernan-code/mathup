// Source-read complete exercises: an optimal edge, and a formulation-only task
// followed by a different geometric region. Neither source is rewritten.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {graph,derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
export const cases=[
 {index:358,kind:'linear-optimal-edge',constraints:[[2,5,15],[1,1,6],[5,-7,42],[-1,0,0]],objective:[-2,-2,3],domain:{x:[0,8],y:[-7,4]},labels:['2x + 5y ≤ 15','x + y ≤ 6','5x − 7y ≤ 42','x ≥ 0'],literals:['2x + 5 y ≤ 15','x + y ≤ 6','5x − 7 y ≤ 42','x ≥ 0','−2x − 2 y + 3']},
 {index:448,kind:'linear-formulation-and-region',constraints:[[-2,1,-10],[1,2,10],[-1,0,0],[0,-1,0]],domain:{x:[0,11],y:[0,4]},labels:['2x ≥ 10 + y','x ≤ 10 − 2y','x ≥ 0','y ≥ 0'],literals:['Plantee, sin resolver','1000 envases','100 envases pequeños y 200 envases grandes','igual o superior','10','20','2x ≥ 10 + y, x ≤ 2(5 − y), x ≥ 0, y ≥ 0']},
];
export function regionGraph(c){const g={...graph({...c,objective:c.objective??[0,0,0]}),plotVersion:'linear-polygon-general-v1'};if(!c.objective){delete g.objective;delete g.optima;}return g;}
const xml=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export function renderGeneralRegionGraph(g){
 assert.equal(g.plotVersion,'linear-polygon-general-v1');
 const [xmin,xmax]=g.domain.x,[ymin,ymax]=g.domain.y;
 assert.ok(xmin<=0&&xmax>=0&&ymin<=0&&ymax>=0);
 const X=x=>48+(x-xmin)*410/(xmax-xmin),Y=y=>350-(y-ymin)*300/(ymax-ymin),colors=['#275dad','#ac3e24','#6750a4','#147a52'];
 const boundaries=g.constraints.map(([a,b,k],i)=>{const ends=[];
  if(b)for(const x of[xmin,xmax]){const y=(k-a*x)/b;if(y>=ymin&&y<=ymax)ends.push([x,y]);}
  if(a)for(const y of[ymin,ymax]){const x=(k-b*y)/a;if(x>=xmin&&x<=xmax&&!ends.some(p=>p[0]===x&&p[1]===y))ends.push([x,y]);}
  if(ends.length<2)return '';return `<line x1="${X(ends[0][0])}" y1="${Y(ends[0][1])}" x2="${X(ends[1][0])}" y2="${Y(ends[1][1])}" stroke="${colors[i%4]}" stroke-width="2"/>`;
 }).join('');
 const points=g.vertices.map(({point:[x,y],label})=>`<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="#15243b"/><text x="${X(x)+9}" y="${Y(y)-9}">${label}</text>`).join('');
 // Keep existing small-domain diagrams identical. Large domains need a
 // graduated axis, not one overlapping text label for every integer.
 const ticks=(min,max)=>{const span=max-min,step=span<=20?1:10**Math.ceil(Math.log10(span/12));return Array.from({length:Math.floor((max-min)/step)+1},(_,i)=>min+i*step);};
 const ticksX=ticks(xmin,xmax).map(x=>`<text x="${X(x)}" y="${Y(0)+23}" text-anchor="middle">${x}</text>`).join('');
 const ticksY=ticks(ymin,ymax).filter(y=>y!==0).map(y=>`<text x="${X(0)-10}" y="${Y(y)+5}" text-anchor="end">${y}</text>`).join('');
 const legend=g.labels.map((s,i)=>`<text x="480" y="${65+i*29}" fill="${colors[i%4]}">${xml(s)}</text>`).join('');
 const coords=g.vertices.map(({label,point:[x,y]},i)=>`<text x="480" y="${225+i*27}">${label} = (${x}; ${y})</text>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 440" role="img" aria-labelledby="title description"><title id="title">Recinto factible con coordenadas y semiplanos</title><desc id="description">${xml(g.labels.join('; '))}. ${xml(g.vertices.map(v=>v.label+' ('+v.point.join('; ')+')').join('; '))}.</desc><rect width="690" height="440" fill="white"/><g font-family="Arial,sans-serif" font-size="16" fill="#15243b"><line data-axis="x" x1="48" y1="${Y(0)}" x2="466" y2="${Y(0)}" stroke="#15243b"/><line data-axis="y" x1="${X(0)}" y1="350" x2="${X(0)}" y2="38" stroke="#15243b"/>${ticksX}${ticksY}<text x="470" y="${Y(0)+20}">x</text><text x="${X(0)-8}" y="30">y</text><polygon points="${g.polygon.map(([x,y])=>`${X(x)},${Y(y)}`).join(' ')}" fill="#c8ecdf" fill-opacity="0.75" stroke="#147a52" stroke-width="2"/>${boundaries}${points}${legend}${coords}<text x="48" y="410">Todos los puntos de la zona sombreada cumplen las restricciones.</text></g></svg>`;
}
export const formulationOptions=[
 {constraints:[[1,1,1000],[-1,0,-100],[0,-1,-200],[1,-1,0]],cost:[.1,.2],integer:true},
 {constraints:[[-1,-1,-1000],[-1,0,-100],[0,-1,-200],[1,-1,0]],cost:[.1,.2],integer:true},
 {constraints:[[1,1,1000],[-1,0,-100],[0,-1,-200],[-1,1,0]],cost:[.1,.2],integer:true},
 {constraints:[[1,1,1000],[-1,0,-100],[0,-1,-200],[1,-1,0]],cost:[.2,.1],integer:true},
];
export function solve(c,text){const p=officialParts(text),derived=derive({...c,objective:c.objective??[0,0,0]}),v=c.objective?derived:{points:derived.points};
 if(c.index===358){assert.equal(p.length,3);
  const answer='Cuadrilátero con vértices (0;−6), (7;−1), (5;1), (0;3).';
  const wrong=['Cuadrilátero con vértices (0;6), (7;−1), (5;1), (0;3).','Cuadrilátero con vértices (0;−6), (7;1), (5;1), (0;3).','Cuadrilátero con vértices (0;−6), (7;−1), (5;−1), (0;3).'];
  const reasons=['Cambiar el signo del corte de la tercera recta con el eje y.','Cambiar el signo de la ordenada del vértice de las rectas segunda y tercera.','Cambiar el signo de la ordenada del vértice de las rectas primera y segunda.'];
  const a=part(p[0],answer,wrong,reasons,[
   ['Transformamos las desigualdades en rectas frontera y despejamos y para seleccionar cada semiplano.','y≤3−frac{2}{5}x; y≤6−x; y≥frac{5x−42}{7}; x≥0'],
   ['Las dos primeras imponen cotas superiores y la tercera una cota inferior. No imponemos y≥0, porque el documento no lo exige.','(0;−1): −5≤15; −1≤6; 7≤42; 0≥0'],
   ['Sobre el eje y, las cotas dan el segmento vertical que cierra el recinto por la izquierda.','x=0 ⇒ −6≤y≤3'],
   ['Las dos fronteras superiores se cortan en (5;1), donde cambia la recta que limita por arriba.','2x+5y=15; x+y=6 ⇒ (x,y)=(5;1)'],
   ['La frontera inferior alcanza la segunda superior en (7;−1). El recinto queda cerrado por los cuatro segmentos de la gráfica.','x+y=6; 5x−7y=42 ⇒ (x,y)=(7;−1)'],
   ['Comprobamos el origen, que está entre las cotas y sobre la frontera izquierda. La región sombreada incluye también ordenadas negativas.','(0;0): 0≤15; 0≤6; 0≤42; 0≥0'],
  ],'LINEAR_HALFPLANE_NEGATIVE_COORDINATES',v);a.visual=regionGraph(c);
  const b=part(p[1],answer.replace('Cuadrilátero con vértices ','Vértices '),wrong.map(s=>s.replace('Cuadrilátero con vértices ','Vértices ')),reasons,[
   ['Intersecamos x=0 con la tercera recta.','−7y=42 ⇒ A=(0;−6)'],
   ['Intersecamos x=0 con la primera recta. El cruce (0;6) de la segunda no cumple la primera restricción.','5y=15 ⇒ D=(0;3); 5·6=30>15'],
   ['Para B sustituimos y=6−x en la tercera frontera.','5x−7(6−x)=42 ⇒ 12x=84 ⇒ x=7; y=−1'],
   ['Para C sustituimos y=6−x en la primera frontera.','2x+5(6−x)=15 ⇒ −3x=−15 ⇒ x=5; y=1'],
   ['El cruce de las fronteras primera y tercera queda fuera de la segunda. No todo cruce de rectas es vértice válido.','(frac{105}{13};−frac{3}{13}): x+y=frac{102}{13}>6'],
   ['Verificamos en cada vértice las holguras de todas las restricciones. Ninguna es negativa.','(15−2x−5y;6−x−y;42−5x+7y;x): A=(45;12;0;0), B=(6;0;0;7), C=(0;0;24;5), D=(0;3;63;0)'],
  ],'LINEAR_VERTEX_ENUMERATION_AND_EXACT_SUBSTITUTION',v);
  const d=part(p[2],'Mínimo −9 en todo el segmento de (5;1) a (7;−1).',[
   'Mínimo −9 únicamente en (5;1).','Mínimo −9 únicamente en (7;−1).','Mínimo −3 en todo el segmento de (0;3) a (5;1).'],[
   'Elegir uno de los vértices empatados sin comprobar el segmento óptimo.','Elegir solo el otro vértice empatado.','Usar el valor de un vértice no óptimo y extenderlo a una arista donde la función cambia.'],[
   ['Conservamos el término independiente 3. La palabra posterior «y» es la conjunción de la pregunta, no otro sumando.','F(x,y)=−2x−2y+3'],
   ['Evaluamos los cuatro vértices del recinto cerrado y acotado.','F(0,−6)=15; F(7,−1)=−9; F(5,1)=−9; F(0,3)=−3'],
   ['Dos vértices consecutivos tienen el mínimo. Al ser lineal, la función toma ese mismo valor en todos los puntos del segmento que los une.','x+y=6 ⇒ F=−2·6+3=−9'],
   ['Damos todos los puntos óptimos, no solo los extremos de la arista.','(x,y)=(5+2t;1−2t), 0≤t≤1'],
   ['Comprobamos que ese segmento es factible: sus holguras son no negativas para todo t entre 0 y 1.','15−2x−5y=6t; 6−x−y=0; 42−5x+7y=24(1−t); x=5+2t'],
   ['Verificación global independiente: la segunda restricción proporciona una cota inferior y demuestra cuándo se alcanza.','F+9=2(6−x−y)≥0; F=−9 ⇔ x+y=6'],
  ],'LINEAR_OPTIMAL_FACE_AND_GLOBAL_DUAL_BOUND',{...v,optimalFace:{from:[5,1],to:[7,-1],value:-9}});
  return[a,b,d];
 }
 assert.equal(c.index,448);assert.equal(p.length,2);
 const a=part(p[0],'Minimizar C=0,10x+0,20y; x+y≤1000; x≥100; y≥200; y≥x; x,y enteros.',[
  'Minimizar C=0,10x+0,20y; x+y≥1000; x≥100; y≥200; y≥x; x,y enteros.',
  'Minimizar C=0,10x+0,20y; x+y≤1000; x≥100; y≥200; y≤x; x,y enteros.',
  'Minimizar C=0,20x+0,10y; x+y≤1000; x≥100; y≥200; y≥x; x,y enteros.'],[
  'Invertir el sentido de la capacidad máxima del congelador.','Invertir la comparación entre envases grandes y pequeños.','Intercambiar los costes de los dos tamaños.'],[
  ['Definimos las variables con su significado y unidad. Al contar envases, son números enteros.','x: envases pequeños; y: envases grandes; x,y≥0 enteros'],
  ['La capacidad total es un máximo, no un mínimo.','x+y≤1000'],
  ['Traducimos los dos mínimos de existencias por separado.','x≥100; y≥200'],
  ['La demanda de grandes es igual o superior a la de pequeños.','y≥x'],
  ['Pasamos los costes de céntimos a euros y asociamos cada coeficiente al tamaño correcto.','10 céntimos=0,10 euros; 20 céntimos=0,20 euros; C=0,10x+0,20y'],
  ['El objetivo es minimizar el coste total. Se solicita únicamente el planteamiento, por lo que no resolvemos aquí la optimización.','Min C sujeto a x+y≤1000, x≥100, y≥200, y≥x, x,y enteros'],
  ['Comprobamos la traducción con cantidades de prueba; esto no es una búsqueda de la solución óptima.','(100;250): 350≤1000; 100≥100; 250≥200; 250≥100; C=10+50=60 euros'],
 ],'LINEAR_WORD_PROBLEM_COEFFICIENT_AND_INEQUALITY_CHECK',{options:formulationOptions,variables:['small-packages','large-packages'],unit:'EUR',requested:'FORMULATION_ONLY'});
 const b=part(p[1],'Triángulo con vértices (5;0), (10;0), (6;2).',[
  'Triángulo con vértices (0;0), (10;0), (6;2).','Triángulo con vértices (5;0), (10;0), (6;−2).','Triángulo con vértices (5;0), (10;0), (2;6).'],[
  'Incluir el origen sin comprobar 2x≥10+y.','Cambiar el signo de la ordenada del cruce.','Intercambiar las coordenadas del cruce de las rectas oblicuas.'],[
  ['Este recinto es un problema distinto del apartado anterior. Usamos solo las cuatro restricciones que aparecen en este apartado.','2x−y≥10; x+2y≤10; x≥0; y≥0'],
  ['Despejamos y y seleccionamos los semiplanos inferiores a las rectas oblicuas.','y≤2x−10; y≤5−frac{x}{2}; y≥0'],
  ['Sobre el eje x, las restricciones determinan la base del triángulo.','y=0 ⇒ 5≤x≤10 ⇒ A=(5;0), B=(10;0)'],
  ['Igualamos las dos cotas superiores para calcular el vértice restante.','2x−10=5−frac{x}{2} ⇒ 5x=30 ⇒ x=6; y=2 ⇒ C=(6;2)'],
  ['Dibujamos los tres segmentos y sombreamos la zona común. El eje y no limita ningún segmento factible, porque x=0 incumpliría la primera restricción con y≥0.','x=0 ⇒ 0≥10+y imposible para y≥0'],
  ['Verificamos un punto interior y los vértices. No imponemos ni calculamos una función objetivo, pues este apartado no la pide.','(6;1): 12≥11; 6≤8; x,y≥0; A:10≥10,5≤10; B:20≥10,10≤10; C:12≥12,6≤6'],
 ],'LINEAR_TRIANGLE_INTERSECTIONS_AND_SEMIPLANE_CHECK',v);b.visual=regionGraph(c);
 return[a,b];
}
export function buildEdgeFormulationBatch(id='batch-0292',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildEdgeFormulationBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0292-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0292.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0),answers:r.batch.records.map(r=>r.parts.map(p=>p.answer))}));}

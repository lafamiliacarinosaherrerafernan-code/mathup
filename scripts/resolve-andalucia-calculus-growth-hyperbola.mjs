import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {renderRationalBranchPlot} from './resolve-andalucia-calculus-rational-plots.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:433,literals:['Trinidad','fondo de inversión','continuidad y derivabilidad']},{index:511,literals:['monotonía y curvatura','asíntotas','puntos de corte']}];
export const functions={433:t=>{assert.ok(t>=0);return t<=1?5000*(1+.05*t):5000*1.05**t;},511:x=>{assert.notEqual(x,-2);return (x-3)/(x+2);}};
export const graphSpecs={
433:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'growth-hyperbola-v1',index:433,xRange:[0,10],yRange:[4500,8500],step:[1,1000],pieces:[{range:[0,1],type:'linear',intercept:5000,slope:250,leftClosed:true,rightClosed:true},{range:[1,10],type:'exponential',factor:5000,base:1.05,leftOpen:true}],points:[{xy:[0,5000],label:'(0;5000)'},{xy:[1,5250],label:'(1;5250)'},{xy:[4,5000*1.05**4],label:'(4;6077,53)'},{xy:[10,5000*1.05**10],label:'continúa creciendo'}]},
511:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'growth-hyperbola-v1',index:511,xRange:[-7,8],yRange:[-7,8],step:[1,2],pieces:[{range:[-7,-2.1],numerator:[-3,1],denominator:[2,1],label:'x<−2: f(x)=1−5/(x+2)'},{range:[-1.9,8],numerator:[-3,1],denominator:[2,1],label:'x>−2: f(x)=1−5/(x+2)'}],asymptotes:[{axis:'x',value:-2},{axis:'y',value:1}],points:[{xy:[0,-1.5],label:'(0;−3/2)',dx:12,dy:23},{xy:[3,0],label:'(3;0)',dx:12,dy:-13}]},
};
export function evaluateGrowthPiece(p,t){return p.type==='linear'?p.intercept+p.slope*t:p.factor*p.base**t;}
export function renderGrowthHyperbolaGraph(s){assert.deepEqual(s,graphSpecs[s.index]);if(s.index===511)return renderRationalBranchPlot(s);
 const W=760,H=440,L=82,R=30,T=35,B=88,[xmin,xmax]=s.xRange,[ymin,ymax]=s.yRange,X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`;
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Capital oficial: tramo lineal inicial y crecimiento compuesto posterior"><rect width="760" height="440" fill="white"/>`;
 for(let x=0;x<=10;x++)svg+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)}" stroke="#e2e7ed"/><text x="${X(x)}" y="${H-B+24}" font-size="15" text-anchor="middle">${x}</text>`;
 for(let y=5000;y<=8000;y+=1000)svg+=`<path d="M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e2e7ed"/><text x="${L-10}" y="${Y(y)+5}" font-size="15" text-anchor="end">${y}</text>`;
 svg+=`<path d="M${pt(xmin,ymin)} L${pt(xmin,ymax)} M${pt(xmin,ymin)} L${pt(xmax,ymin)}" stroke="#333"/>`;
 for(const p of s.pieces){const points=Array.from({length:301},(_,k)=>{const x=p.range[0]+k*(p.range[1]-p.range[0])/300;return pt(x,evaluateGrowthPiece(p,x));}).join(' ');svg+=`<polyline points="${points}" stroke="#075597" stroke-width="3" fill="none"/>`;}
 s.points.forEach((p,k)=>{svg+=`<circle cx="${X(p.xy[0])}" cy="${Y(p.xy[1])}" r="4" fill="#075597"/><text x="${X(p.xy[0])+(k===3?-12:10)}" y="${Y(p.xy[1])+(k===1?25:-13)}" text-anchor="${k===3?'end':'start'}" font-size="15">${p.label}</text>`;});
 return svg+`<text x="82" y="23" font-size="16">Capital (€); eje vertical mostrado desde 4500 €</text><text x="730" y="${H-B+46}" font-size="16" text-anchor="end">t (años)</text><text x="82" y="410" font-size="15">0≤t≤1: 5000+250t; t>1: 5000·1,05ᵗ (sin límite superior de tiempo)</text></svg>`;
}
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reasons,steps,proof,graph=false)=>{const p=part(ps[k],a,w,reasons,steps,'OFFICIAL_CALCULUS_EXPONENTIAL_INVERSION_AND_RATIONAL_DERIVATIVE_CHECK',proof);if(graph)p.visual=structuredClone(graphSpecs[c.index]);return p;};
if(c.index===433)return[
 mk(0,`t=${F('ln(5931,10/5000)','ln(1,05)')}≈3,500127 años.`,[
 't=3,7244 años.','t≈0,170771 años.','t≈4,500127 años.'],['Prolongar indebidamente el interés simple del primer tramo.','Olvidar dividir por el logaritmo de la base del crecimiento.','Añadir otro año a un exponente que ya expresa el tiempo total.'],[
 ['Identificamos el capital inicial y el objetivo. La fórmula cambia después del primer año.','f(0)=5000 €; f(1)=5250 €; objetivo=5931,10 €'],
 ['Como el objetivo supera 5250 €, la solución debe pertenecer al tramo exponencial t>1.','5000·1,05^t=5931,10'],
 ['Dividimos por el capital inicial y tomamos logaritmos en ambos miembros.',`1,05^t=${F('5931,10',5000)}; t·ln(1,05)=ln(5931,10/5000)`],
 ['Despejamos el tiempo; el logaritmo del denominador es positivo y no nulo.',`t=${F('ln(5931,10/5000)','ln(1,05)')}≈3,5001272029 años`],
 ['La sustitución independiente recupera el capital solicitado y confirma que estamos en el tramo correcto.','t>1; 5000·1,05^(3,5001272029)≈5931,10 €'],
 ['No sustituimos el dato oficial por un capital distinto para obtener exactamente tres años y medio.','f(3,5)≈5931,063190 €; tiempo solicitado≈3,50 años, no exactamente 3,5'],
 ],{target:5931.10,time:Math.log(5931.10/5000)/Math.log(1.05),wrongTimes:[3.7244,Math.log(5931.10/5000),Math.log(5931.10/5000)/Math.log(1.05)+1]}),
 mk(1,'Intereses entre los años 2 y 4: 565,03125 € ≈ 565,03 €.',[
 'Intereses entre los años 2 y 4: 1077,53125 € ≈ 1077,53 €.','Intereses entre los años 2 y 4: 512,50 €.','Intereses entre los años 2 y 4: 500,00 €.'],['Restar el capital inicial en lugar del capital del año dos.','Aplicar dos años de interés compuesto solo al capital inicial.','Usar interés simple durante todo el intervalo.'],[
 ['La definición del enunciado pide una diferencia de capitales, no los intereses desde el depósito inicial.','I=f(4)−f(2)'],
 ['Ambos tiempos superan uno: utilizamos la segunda rama en los dos extremos.','f(2)=5000·1,05²; f(4)=5000·1,05⁴'],
 ['Calculamos los capitales sin redondearlos antes de restar.','f(2)=5512,50 €; f(4)=6077,53125 €'],
 ['Restamos y redondeamos solo el importe final a céntimos.','I=6077,53125−5512,50=565,03125 €≈565,03 €'],
 ['Comprobamos por otro camino: el capital del año dos crece dos años más al cinco por ciento compuesto.','I=5512,50·(1,05²−1) = 5512,50·0,1025 = 565,03125 €'],
 ],{capitals:[5512.5,6077.53125],interest:565.03125,wrong:[1077.53125,512.5,500]}),
 mk(2,'Continua para t≥0; no derivable en t=1: derivada izquierda 250 y derecha 5250·ln(1,05)≈256,14836.',[
 'Continua para t≥0; derivable en t=1: ambas derivadas laterales valen 250.','Discontinua en t=1: los límites laterales son 5250 y 5000.','Continua para t≥0; no derivable en t=1: derivada izquierda 250 y derecha 5000·ln(1,05)≈243,95082.'],['Confundir igualdad de valores con igualdad de pendientes.','Evaluar la exponencial con exponente cero en el empalme.','Olvidar el valor de la potencia al evaluar la derivada exponencial.'],[
 ['Cada rama es continua y derivable en el interior de su intervalo; comprobamos la unión t=1.','f(t)=5000+250t para 0≤t≤1; f(t)=5000·1,05^t para t>1'],
 ['Calculamos valor y límites laterales en el mismo instante.','f(1)=5250; lim_{t→1⁻}f(t)=5250; lim_{t→1⁺}f(t)=5000·1,05=5250'],
 ['La coincidencia prueba continuidad. En cero consideramos continuidad por la derecha dentro del dominio.','f continua en [0;+∞)'],
 ['Derivamos la rama lineal y la exponencial conservando el factor logarítmico.','f′(t)=250 si 0<t<1; f′(t)=5000·1,05^t·ln(1,05) si t>1'],
 ['Las pendientes laterales en uno son distintas, por lo que la unión no es derivable.','f′(1⁻)=250; f′(1⁺)=5250·ln(1,05)≈256,14836≠250'],
 ['Los cocientes incrementales desde cada lado confirman las dos pendientes; no deducimos derivabilidad de la sola continuidad.','Derivable en (0;1) y (1;+∞), no en t=1'],
 ],{join:1,value:5250,slopes:[250,5250*Math.log(1.05)],wrongRightSlope:5000*Math.log(1.05)}),
 mk(3,'Estrictamente creciente para t≥0: tramo lineal hasta (1;5250), después exponencial creciente; mínimo global (0;5000), sin máximo.',[
 'Crece hasta t=1 y decrece después: máximo global (1;5250).','Estrictamente creciente para t≥0: una recta de pendiente 250 durante todo el tiempo; mínimo global (0;5000).','Estrictamente creciente para t≥0 con salto de 5250 a 5000 en t=1; mínimo global (0;5000).'],['Cambiar el signo de la derivada exponencial.','Ignorar el cambio de ley después del primer año.','Confundir el coeficiente de la exponencial con su valor en t=1.'],[
 ['En el primer tramo la pendiente es positiva; el capital aumenta linealmente.','f′(t)=250>0 para 0<t<1'],
 ['En el segundo tramo todos los factores de la derivada son positivos.','5000>0; 1,05^t>0; ln(1,05)>0 ⇒ f′(t)>0 para t>1'],
 ['Las ramas se unen sin salto y ambas crecen: también hay crecimiento estricto al atravesar t=1.','f(1)=5250 €; f estrictamente creciente en [0;+∞)'],
 ['El comienzo del dominio da el mínimo global. La exponencial crece sin cota superior.','Mínimo f(0)=5000 €; lim_{t→∞}f(t)=∞; no existe máximo'],
 ['Esbozamos una recta inicial y una curva convexa posterior, sin confundir la esquina de pendientes con un extremo.','f″(t)=5000·1,05^t·[ln(1,05)]²>0 para t>1'],
 ['La gráfica adjunta representa el intervalo 0≤t≤10; el modelo sigue definido y creciente después.','f(2)=5512,50; f(4)=6077,53125; f(10)≈8144,47313'],
 ],{increasing:true,minimum:[0,5000],maximum:null,domain:[0,null],join:[1,5250]},true),
];
if(c.index===511)return[
 mk(0,'Dominio ℝ∖{−2}; creciente en (−∞;−2) y (−2;+∞); f″>0 a la izquierda y f″<0 a la derecha de −2; sin extremos ni inflexión.',[
 'Dominio ℝ∖{−2}; decreciente en (−∞;−2) y (−2;+∞); f″<0 a la izquierda y f″>0 a la derecha de −2; sin extremos ni inflexión.',
 'Dominio ℝ∖{3}; creciente en (−∞;3) y (3;+∞); f″>0 a la izquierda y f″<0 a la derecha de 3; sin extremos ni inflexión.',
 'Dominio ℝ∖{−2}; creciente en (−∞;−2) y (−2;+∞); f″>0 a la izquierda y f″<0 a la derecha de −2; inflexión en x=−2.'],['Cambiar el signo al derivar el cociente.','Excluir la raíz del numerador, no la del denominador.','Declarar inflexión en un punto que no pertenece al dominio.'],[
 ['El denominador se anula en menos dos y el numerador allí vale menos cinco.','f(x)=(x−3)/(x+2); D(f)=ℝ∖{−2}'],
 ['Derivamos por la regla del cociente y simplificamos el numerador.',`f′(x)=${F('(x+2)−(x−3)','(x+2)²')}=${F(5,'(x+2)²')}`],
 ['El denominador al cuadrado es positivo en cada rama: la derivada no se anula y no hay extremos relativos.','f′>0 en (−∞;−2) y (−2;+∞) ⇒ creciente en cada intervalo'],
 ['Derivamos de nuevo y estudiamos el signo de la potencia cúbica.',`f″(x)=−${F(10,'(x+2)³')}; f″>0 si x<−2; f″<0 si x>−2`],
 ['La gráfica es convexa hacia arriba en la rama izquierda y cóncava hacia abajo en la derecha. No hay punto de inflexión en la asíntota.','−2∉D(f); no hay inflexión'],
 ['Comprobamos independientemente las pendientes mediante cocientes incrementales en puntos de ambas ramas.','f′(−3)=5; f′(0)=5/4; ambas pendientes son positivas'],
 ],{excluded:-2,numeratorAtPole:-5,derivativeNumerator:5,secondDerivativeNumerator:-10,stationaryPoints:[],inflections:[]}),
 mk(1,'Asíntotas x=−2 e y=1; cortes (3;0) y (0;−3/2).',[
 'Asíntotas x=−2 e y=−1; cortes (3;0) y (0;−3/2).','Asíntotas x=2 e y=1; cortes (3;0) y (0;−3/2).','Asíntotas x=−2 e y=1; cortes (−3;0) y (0;3/2).'],['Cambiar el cociente de los coeficientes principales.','Cambiar el signo de la raíz del denominador.','Cambiar el signo del término independiente del numerador.'],[
 ['Dividimos el numerador entre el denominador para separar la constante.',`f(x)=1−${F(5,'x+2')}`],
 ['El término fraccionario diverge al acercarse a menos dos. Su signo cambia al cruzar el denominador.','lim_{x→−2⁻}f(x)=+∞; lim_{x→−2⁺}f(x)=−∞ ⇒ x=−2'],
 ['En ambos infinitos la fracción tiende a cero, dejando la asíntota horizontal.','lim_{x→±∞}f(x)=1 ⇒ y=1; no hay asíntota oblicua'],
 ['Para cortar OX el numerador debe ser cero y el denominador no debe serlo.','x−3=0 ⇒ x=3; x+2=5≠0; corte (3;0)'],
 ['Para cortar OY sustituimos x=0 y conservamos el signo negativo.','f(0)=−3/2; corte (0;−3/2)'],
 ['La identidad f(x)−1=−5/(x+2) confirma la posición de cada rama respecto a la horizontal.','x<−2 ⇒ f>1; x>−2 ⇒ f<1'],
 ],{vertical:-2,horizontal:1,xIntercept:[3,0],yIntercept:[0,-1.5],leftPoleSign:1,rightPoleSign:-1}),
 mk(2,'Dos ramas crecientes separadas por x=−2: la izquierda por encima de y=1 y la derecha por debajo; pasan por (3;0) y (0;−3/2).',[
 'Dos ramas decrecientes separadas por x=−2: la izquierda por debajo de y=1 y la derecha por encima; pasan por (−7;0) y (0;7/2).',
 'Dos ramas crecientes separadas por x=2: la izquierda por encima de y=1 y la derecha por debajo; pasan por (7;0) y (0;7/2).',
 'Dos ramas crecientes separadas por x=−2 y unidas mediante un punto en la asíntota; la izquierda por encima de y=1 y la derecha por debajo.'],['Cambiar el signo del término fraccionario.','Desplazar horizontalmente la función cuatro unidades.','Unir ramas a través de un punto inexistente del dominio.'],[
 ['Dibujamos primero las asíntotas como líneas auxiliares, no como parte de la función.','x=−2; y=1'],
 ['Situamos los dos cortes exactos calculados y puntos de control en ambas ramas.','f(−3)=6; f(−7)=2; f(0)=−3/2; f(3)=0'],
 ['La rama izquierda crece desde valores próximos a uno por arriba hacia infinito positivo.','x<−2: f>1, f′>0, f″>0'],
 ['La rama derecha crece desde infinito negativo hacia uno por debajo.','x>−2: f<1, f′>0, f″<0'],
 ['La gráfica adjunta mantiene las ramas separadas; no coloca punto alguno en la asíntota vertical.','D(f)=ℝ∖{−2}; centro de simetría (−2;1)'],
 ['Comprobamos la simetría mediante sustitución, sin añadir puntos al dominio.','f(−2+h)+f(−2−h)=2 para h≠0'],
 ],{center:[-2,1],controls:[[-3,6],[-7,2],[0,-1.5],[3,0]],disconnected:true},true),
];throw Error('Unverified growth/hyperbola source');}
export function buildGrowthHyperbolaBatch(id='batch-0335',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=x.correctionEvidence.parameters.index===433?['Continuidad','Monotonía','Gráficas','Funciones exponenciales']:['Monotonía','Curvatura','Asíntotas','Gráficas'];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_GROWTH_AND_HYPERBOLA_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildGrowthHyperbolaBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0335-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0335.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}

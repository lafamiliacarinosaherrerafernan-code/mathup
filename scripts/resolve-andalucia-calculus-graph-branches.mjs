import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:147,literals:['presente un máximo','recta tangente']},{index:155,literals:['continuidad y derivabilidad','Represente gráficamente']},{index:414,literals:['continua y derivable','esboce la gráfica']}];
// Polynomial coefficients in ascending order. Each branch is evaluated on its
// own interval, including its limiting endpoint, not with a neighbouring branch.
export const graphSpecs={
 147:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'piecewise-endpoints-v1',index:147,xRange:[-3,5],yRange:[-17,4],step:[1,5],pieces:[{range:[-3,5],coefficients:[-1,2,-1],label:'f(x)=−(x−1)²',color:'#075597'},{range:[-3,1],coefficients:[3,6],label:'Tangente y=6x+3',color:'#c45114',dashed:true}],points:[{xy:[1,0],label:'V(1;0)',dx:12,dy:-14},{xy:[-2,-9],label:'T(−2;−9)',dx:-12,dy:23},{xy:[0,-1],label:'(0;−1)',dx:-15,dy:24}]},
 155:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'piecewise-endpoints-v1',index:155,xRange:[-3.5,4],yRange:[-1,12],step:[1,2],pieces:[{range:[-3.5,-1],coefficients:[17,16,4],label:'x<−1: 4(x+2)²+1',rightOpen:true,color:'#075597'},{range:[-1,2],coefficients:[10/3,-5/3],label:'−1≤x≤2: (10−5x)/3',leftClosed:true,rightClosed:true,color:'#075597'},{range:[2,4],coefficients:[1.5],label:'x>2: 3/2',leftOpen:true,color:'#075597'}],points:[{xy:[-2,1],label:'V(−2;1)',dx:-12,dy:24},{xy:[-1,5],label:'(−1;5)',dx:10,dy:-13},{xy:[2,0],label:'(2;0)',dx:-12,dy:24},{xy:[2,1.5],label:'(2;3/2) abierto',open:true,dx:10,dy:-13}],area:[-2,2]},
 414:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'piecewise-endpoints-v1',index:414,xRange:[-3.5,2.5],yRange:[-1,7],step:[1,1],pieces:[{range:[-3,1],coefficients:[1,2,1],label:'−3≤x≤1: (x+1)²',leftClosed:true,rightClosed:true,color:'#075597'},{range:[1,2],coefficients:[2,0,1],label:'1<x≤2: x²+2',leftOpen:true,rightClosed:true,color:'#075597'}],points:[{xy:[-3,4],label:'(−3;4)',dx:10,dy:-12},{xy:[-1,0],label:'V(−1;0)',dx:-10,dy:23},{xy:[1,4],label:'(1;4)',dx:-10,dy:-15},{xy:[1,3],label:'(1;3) abierto',open:true,dx:12,dy:22},{xy:[2,6],label:'(2;6)',dx:-10,dy:-12}],area:[-2,1]},
};
export const polynomial=(coefficients,x)=>coefficients.reduceRight((s,c)=>s*x+c,0);
export const primitive=(coefficients,x)=>coefficients.reduce((s,c,k)=>s+c*x**(k+1)/(k+1),0);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function renderBranchGraph(spec){
 assert.deepEqual(spec,graphSpecs[spec.index],'Unverified graph specification');
 return renderPolynomialGraph(spec);
}
export function renderPolynomialGraph(spec){
 assert.ok(spec.pieces.length>0&&spec.pieces.every(p=>p.coefficients.every(Number.isFinite)&&p.range[0]<p.range[1]));
 const W=760,H=490,L=65,T=40,R=30,B=100,[xmin,xmax]=spec.xRange,[ymin,ymax]=spec.yRange;
 const X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`;
 const pts=(piece,a,b)=>Array.from({length:241},(_,i)=>{const x=a+(b-a)*i/240;return pt(x,polynomial(piece.coefficients,x));}).join(' ');
 let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfica oficial derivada, con ramas y extremos abiertos o cerrados"><rect width="760" height="490" fill="white"/><defs><clipPath id="plot"><rect x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}"/></clipPath></defs>`;
 for(let x=Math.ceil(xmin/spec.step[0])*spec.step[0];x<=xmax;x+=spec.step[0])s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)}" stroke="#e2e7ed"/><text x="${X(x)}" y="${H-B+22}" text-anchor="middle" font-size="15">${x}</text>`;
 for(let y=Math.ceil(ymin/spec.step[1])*spec.step[1];y<=ymax;y+=spec.step[1])s+=`<path d="M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e2e7ed"/><text x="${L-10}" y="${Y(y)+5}" text-anchor="end" font-size="15">${y}</text>`;
 s+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/><g clip-path="url(#plot)">`;
 if(spec.area)for(const p of spec.pieces){const a=Math.max(p.range[0],spec.area[0]),b=Math.min(p.range[1],spec.area[1]);if(b>a)s+=`<polygon points="${pt(a,0)} ${pts(p,a,b)} ${pt(b,0)}" fill="#c4e4ef"/>`;}
 if(spec.between){const {range:[a,b],lower,upper}=spec.between;const low=pts({coefficients:lower},a,b),high=pts({coefficients:upper},b,a);s+=`<polygon points="${low} ${high}" fill="#c4e4ef"/>`;for(const x of[a,b])s+=`<path d="M${pt(x,polynomial(lower,x))} L${pt(x,polynomial(upper,x))}" stroke="#c45114" stroke-dasharray="4 4"/>`;}
 for(const p of spec.pieces)s+=`<polyline points="${pts(p,...p.range)}" fill="none" stroke="${p.color}" stroke-width="3"${p.dashed?' stroke-dasharray="7 5"':''}/>`;
 s+='</g>';
 // Endpoint ownership is explicit; no connecting line is drawn across a jump.
 for(const p of spec.pieces)for(const [side,k]of[['left',0],['right',1]])if(p[side+'Open']||p[side+'Closed']){const x=p.range[k],y=polynomial(p.coefficients,x);s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="${p[side+'Open']?'white':p.color}" stroke="${p.color}" stroke-width="2"/>`;}
 for(const p of spec.points)s+=`<circle cx="${X(p.xy[0])}" cy="${Y(p.xy[1])}" r="5" fill="${p.open?'white':'#075597'}" stroke="#075597" stroke-width="2"/><text x="${X(p.xy[0])+p.dx}" y="${Y(p.xy[1])+p.dy}" text-anchor="${p.dx<0?'end':'start'}" font-size="15">${esc(p.label)}</text>`;
 s+=`<text x="${W-R}" y="${H-B+23}" text-anchor="end" font-size="16">${esc(spec.axisLabels?.[0]??'x')}</text><text x="${L}" y="23" font-size="16">${esc(spec.axisLabels?.[1]??'f(x)')}</text>`;
 spec.pieces.forEach((p,i)=>{s+=`<text x="65" y="${H-56+18*i}" fill="${p.color}" font-size="15">${esc(p.label)}</text>`;});
 return s+'</svg>';
}
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reason,steps,proof,graph=false)=>{const p=part(ps[k],a,w,reason,steps,'OFFICIAL_POLYNOMIAL_BRANCHES_WITH_INDEPENDENT_DIFFERENTIATION_AND_INTEGRATION',proof);if(graph)p.visual=structuredClone(graphSpecs[c.index]);return p;};
 if(c.index===147)return[
 mk(0,'p=−2; q=3; máximo f(−1)=4.',['p=2; q=19; f(−1)=16.','p=−2; q=−3; máximo f(−1)=−2.','p=−2; q=3; máximo f(−1)=3.'],['Perder el signo al imponer la abscisa del vértice.','Cambiar el signo al despejar q en el punto dado.','Confundir la ordenada en cero con el máximo.'],[
 ['La gráfica debe pasar por el punto oficial y tener derivada cero en −1.','f(x)=−x²+px+q; f(−4)=−5; f′(−1)=0'],
 ['Derivamos y usamos la abscisa del extremo.','f′(x)=−2x+p; 2+p=0 ⇒ p=−2'],
 ['Sustituimos el punto dado en el polinomio.','−16−4p+q=−5 ⇒ −16+8+q=−5 ⇒ q=3'],
 ['Comprobamos que el extremo es máximo mediante la segunda derivada.','f″(x)=−2<0'],
 ['Calculamos su ordenada.','f(−1)=−1+2+3=4'],
 ['Verificamos ambos datos con la función final.','f(x)=4−(x+1)²; f(−4)=−5; vértice (−1;4)'],
 ],{parameters:[-2,3],point:[-4,-5],vertex:[-1,4],secondDerivative:-2,wrongParameters:[[2,19],[-2,-3]]}),
 mk(1,'Parábola hacia abajo, vértice (1;0), corte OY (0;−1); tangente y=6x+3.',[
 'Parábola hacia abajo, vértice (1;0), corte OY (0;−1); tangente y=−6x−21.',
 'Parábola hacia abajo, vértice (1;0), corte OY (0;−1); tangente y=6x−9.',
 'Parábola hacia arriba, vértice (1;0), corte OY (0;1); tangente y=6x+3.'],['Cambiar el signo de la pendiente.','Usar la ordenada del punto como término independiente.','Cambiar el signo global de la parábola.'],[
 ['El apartado fija nuevos parámetros p=2 y q=−1, distintos del anterior.','f(x)=−x²+2x−1=−(x−1)²'],
 ['La forma de cuadrado proporciona el vértice y la concavidad.','V=(1;0); f″=−2; eje de simetría x=1'],
 ['Calculamos cortes y monotonía para dibujar la gráfica adjunta.','f(0)=−1; f(x)=0 ⇔ x=1; f′=2−2x: crece antes de 1 y decrece después'],
 ['Hallamos el punto de tangencia y la pendiente solicitados.','f(−2)=−9; f′(−2)=6'],
 ['Usamos la ecuación punto-pendiente.','y−(−9)=6(x−(−2)) ⇒ y=6x+3'],
 ['Comprobamos que pasa por el punto y tiene la misma pendiente. La gráfica muestra ambas curvas.','6(−2)+3=−9; pendiente de la recta=6=f′(−2)'],
 ],{parameters:[2,-1],vertex:[1,0],yIntercept:-1,tangent:[6,3],point:[-2,-9],wrongTangents:[[-6,-21],[6,-9]]},true)];
 if(c.index===155)return[
 mk(0,`Continua salvo en x=2; no derivable en x=−1 ni x=2. Salto en 2: 0 a ${F(3,2)}.`,[
 'Continua y derivable en todo ℝ.',`Continua salvo en x=2; derivable en x=−1. Salto en 2: 0 a ${F(3,2)}.`,
 `Discontinua en x=−1 y x=2; no derivable en ambos puntos. Salto en 2: 0 a ${F(3,2)}.`],['Ignorar las uniones entre ramas.','No comparar pendientes en −1.','Confundir una esquina con una discontinuidad.'],[
 ['Las tres fórmulas están definidas en sus tramos y cubren ℝ. Las uniones son −1 y 2.','f₁=4x²+16x+17; f₂=(10−5x)/3; f₃=3/2'],
 ['En menos uno coinciden los límites y el valor.','f₁(−1)=4−16+17=5; f₂(−1)=15/3=5=f(−1)'],
 ['Comparamos las pendientes en esa unión.',`f₁′=8x+16; f₂′=−${F(5,3)}; f′(−1⁻)=8≠−${F(5,3)}=f′(−1⁺)`],
 ['En dos, el valor pertenece al tramo lineal y el límite derecho a la constante.',`f(2)=lim f(2⁻)=0; lim f(2⁺)=${F(3,2)}`],
 ['El salto impide continuidad y, por tanto, derivabilidad en dos. En los interiores de las ramas no hay problemas.','Continua en ℝ∖{2}; derivable en ℝ∖{−1;2}'],
 ],{limits:[[-1,5,5],[2,0,1.5]],slopes:[[-1,8,-5/3],[2,-5/3,0]],domain:'R'}),
 mk(1,`Parábola con vértice (−2;1); segmento de (−1;5) a (2;0), ambos cerrados; semirrecta y=${F(3,2)} con (2;${F(3,2)}) abierto.`,[
 `Parábola con vértice (−2;1); segmento de (−1;5) a (2;0), abierto en 2; semirrecta y=${F(3,2)} cerrada en 2.`,
 `Parábola con vértice (2;1); segmento de (−1;5) a (2;0), ambos cerrados; semirrecta y=${F(3,2)} abierta en 2.`,
 `Parábola con vértice (−2;1); segmento de (−1;5) a (2;0), ambos cerrados; semirrecta y=${F(2,3)} abierta en 2.`],['Asignar x=2 a la rama equivocada.','Cambiar el signo de la abscisa del vértice.','Invertir la constante de la tercera rama.'],[
 ['Completamos el cuadrado en la primera rama para dibujar solo su tramo x<−1.','4x²+16x+17=4(x+2)²+1; vértice (−2;1)'],
 ['La parábola decrece hasta −2 y después crece hasta la unión.','f₁′=8(x+2); lim f(−1⁻)=5'],
 ['La segunda rama es el segmento recto entre dos puntos incluidos en el dominio.','f₂(−1)=5; f₂(2)=0; −1≤x≤2'],
 ['La tercera rama es horizontal; no incluye el extremo x=2.',`f₃=${F(3,2)}; x>2; círculo abierto en (2;${F(3,2)})`],
 ['La gráfica adjunta mantiene el punto lleno (2;0) y el hueco de la rama horizontal. No une el salto con un segmento.','f(2)=0; salto derecho=3/2'],
 ],{vertex:[-2,1],segment:[[-1,5],[2,0]],closedEndpoint:[2,0],openEndpoint:[2,1.5],horizontal:1.5},true),
 mk(2,`Área=${F(59,6)} u².`,[`Área=${F(31,6)} u².`,`Área=${F(59,3)} u².`,`Área=${F(15,2)} u².`],['Restar las dos áreas positivas en lugar de sumarlas.','Duplicar el área total.','Omitir el tramo parabólico.'],[
 ['Entre −2 y 2 intervienen dos ramas, separadas en −1.','A=∫_{−2}^{−1}(4x²+16x+17) dx+∫_{−1}^{2}(10−5x)/3 dx'],
 ['Ambas funciones son no negativas en esos intervalos; no hay que cambiar signos.','4(x+2)²+1≥1; (10−5x)/3≥0 para −1≤x≤2'],
 ['En el primer tramo usamos u=x+2, que recorre de cero a uno.',`A₁=∫_{0}^{1}(4u²+1) du=[${F(4,3)}u³+u]_{0}^{1}=${F(7,3)}`],
 ['El segundo recinto es un triángulo de base tres y altura cinco, comprobación independiente de su integral.',`A₂=${F('3·5',2)}=${F(15,2)}`],
 ['Por Barrow da el mismo valor usando una primitiva de la recta.',`H(x)=${F(10,3)}x−${F(5,6)}x²; H(2)−H(−1)=${F(15,2)}`],
 ['Sumamos las dos áreas con denominador común.',`A=${F(7,3)}+${F(15,2)}=${F(14,6)}+${F(45,6)}=${F(59,6)} u²`],
 ],{integrals:[7/3,15/2],area:59/6,wrongAreas:[31/6,59/3,15/2],intervals:[[-2,-1],[-1,2]]})];
 if(c.index===414)return[
 mk(0,'a=1; b=4.',['a=1; b=2.','a=2; b=4.','a=−1; b=−4.'],['Olvidar el factor 2x al derivar x².','Imponer b=2a en lugar de b=4a.','Cambiar el signo del término constante al resolver.'],[
 ['El dominio es [−3;2]. Solo se cambia de fórmula en x=1.','f₁=a(x+1)²; f₂=bx²/2+2'],
 ['Imponemos continuidad en uno.','f(1)=4a; lim f(1⁺)=b/2+2 ⇒ 4a=b/2+2'],
 ['Derivamos las ramas y comparamos pendientes.','f₁′=2a(x+1); f₂′=bx ⇒ 4a=b'],
 ['Sustituimos la condición de derivabilidad en la de continuidad.','4a=2a+2 ⇒ a=1; b=4'],
 ['Comprobamos ambas igualdades. En los extremos solo cabe derivación lateral.','f(1)=4; lim f(1⁺)=4; f′(1⁻)=f′(1⁺)=4'],
 ],{parameters:[1,4],join:1,value:4,slope:4,wrongParameters:[[1,2],[2,4],[-1,-4]]}),
 mk(1,'Vértice (−1;0); punto (1;4) cerrado, (1;3) abierto; rama derecha hasta (2;6) cerrado. Área=3 u².',[
 'Vértice (−1;0); punto (1;4) cerrado, (1;3) abierto; rama derecha hasta (2;6) cerrado. Área=9 u².',
 'Vértice (−1;0); punto (1;4) cerrado, (1;3) abierto; rama derecha hasta (2;6) cerrado. Área=−3 u².',
 'Vértice (−1;0); punto (1;4) abierto, (1;3) cerrado; rama derecha hasta (2;6) cerrado. Área=3 u².'],['Usar el rectángulo de altura tres en vez de integrar.','Invertir los límites de integración.','Invertir la pertenencia de x=1 a las ramas.'],[
 ['Ahora se fijan a=1,b=2. No usamos b=4 del apartado anterior.','f₁=(x+1)² en [−3;1]; f₂=x²+2 en (1;2]'],
 ['La primera parábola tiene vértice (−1;0) y pasa por los extremos del tramo.','f₁(−3)=4; f₁(1)=4; f₁′=2(x+1)'],
 ['La segunda rama comienza con un extremo abierto en uno y acaba cerrada en dos.','lim f(1⁺)=3; f(1)=4; f(2)=6; hay salto'],
 ['La gráfica adjunta conserva el salto. El recinto pedido solo usa la primera rama, entre −2 y 1.','A=∫_{−2}^{1}(x+1)² dx; (x+1)²≥0'],
 ['Integramos sin cambiar el sentido de los extremos y verificamos por derivación.',`H(x)=${F('(x+1)³',3)}; H′(x)=(x+1)²`],
 ['Aplicamos Barrow: el cero del vértice no cambia el signo de la función.',`A=${F(8,3)}−(−${F(1,3)})=3 u²`],
 ],{parameters:[1,2],vertex:[-1,0],closedEndpoint:[1,4],openEndpoint:[1,3],rightEndpoint:[2,6],area:3,interval:[-2,1]},true)];
 throw Error('Unreviewed graph branch case');
}
export function buildGraphBranchesBatch(id='batch-0327',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Continuidad','Derivabilidad','Representación gráfica',...(x.queueIndex===147?['Recta tangente']:['Integrales definidas y áreas'])];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_SOURCE_SUBPARTS_WITH_INDEPENDENT_BRANCH_GRAPHS_AND_POLYNOMIAL_CHECKS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildGraphBranchesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0327-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0327.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}

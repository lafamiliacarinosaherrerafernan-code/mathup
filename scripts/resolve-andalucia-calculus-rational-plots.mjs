import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:142,literals:['2𝑥 − 6','asíntotas','puntos de corte']},{index:291,literals:['continuidad, derivabilidad y monotonía','área del recinto']},{index:435,literals:['contracción del iris','décimas de milímetro','máxima contracción']}];
const poly=(a,x)=>a.reduceRight((s,c)=>s*x+c,0);
export function evaluatePiece(p,x){const n=poly(p.numerator,x),d=poly(p.denominator??[1],x);assert.notEqual(d,0,'A branch may not cross its pole');return n/d;}
export const graphSpecs={
 142:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'rational-branches-v1',index:142,xRange:[-3,7],yRange:[-8,5],step:[1,2],pieces:[{range:[-3,1.9],numerator:[-6,2],denominator:[2,-1],label:'x<2: f(x)=−2+2/(x−2)'},{range:[2.1,7],numerator:[-6,2],denominator:[2,-1],label:'x>2: f(x)=−2+2/(x−2)'}],asymptotes:[{axis:'x',value:2},{axis:'y',value:-2}],points:[{xy:[0,-3],label:'(0;−3)',dx:-12,dy:23},{xy:[3,0],label:'(3;0)',dx:12,dy:-13}]},
 291:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'rational-branches-v1',index:291,xRange:[-2,6],yRange:[-3.5,3],step:[1,1],pieces:[{range:[-2,2],numerator:[1,1,-.5],label:'x≤2: −x²/2+x+1',rightClosed:true},{range:[2,6],numerator:[1],denominator:[-1,1],label:'x>2: 1/(x−1)',leftOpen:true}],asymptotes:[{axis:'y',value:0,from:2}],points:[{xy:[1,1.5],label:'Máximo (1;3/2)',dx:12,dy:-13},{xy:[2,1],label:'Unión suave (2;1)',dx:12,dy:26},{xy:[0,1],label:'(0;1)',dx:-12,dy:25}],area:[0,4]},
 435:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'rational-branches-v1',index:435,xRange:[0,10],yRange:[0,5.5],step:[2,1],pieces:[{range:[0,2],numerator:[0,0,1],label:'0≤t≤2: f(t)=t²',leftClosed:true,rightClosed:true},{range:[2,10],numerator:[4],denominator:[-1,1],label:'t>2: f(t)=4/(t−1)',leftOpen:true}],asymptotes:[{axis:'y',value:0,from:2}],points:[{xy:[0,0],label:'(0;0)',dx:12,dy:-13},{xy:[2,4],label:'Máximo (2;4)',dx:12,dy:-13},{xy:[5,1],label:'(5;1)',dx:12,dy:24}],axisLabels:['t (segundos)','f(t), décimas de mm']},
};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
// Independent polylines per branch: no line is drawn across a vertical asymptote.
// This is a derived plot of the verified formula, not an original-document image.
export function renderRationalCalculusGraph(spec){
 assert.deepEqual(spec,graphSpecs[spec.index],'Unverified rational graph specification');
 return renderRationalBranchPlot(spec);
}
export function renderRationalBranchPlot(spec){
 const W=760,H=490,L=65,T=40,R=30,B=100,[xmin,xmax]=spec.xRange,[ymin,ymax]=spec.yRange;
 const X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`;
 const points=(p,a,b)=>Array.from({length:401},(_,i)=>{const x=a+(b-a)*i/400;return pt(x,evaluatePiece(p,x));}).join(' ');
 let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfica calculada de la función oficial con dominio por ramas"><rect width="760" height="490" fill="white"/><defs><clipPath id="rational-plot"><rect x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}"/></clipPath></defs>`;
 for(let x=Math.ceil(xmin/spec.step[0])*spec.step[0];x<=xmax;x+=spec.step[0])s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)}" stroke="#e2e7ed"/><text x="${X(x)}" y="${H-B+22}" text-anchor="middle" font-size="15">${x}</text>`;
 for(let y=Math.ceil(ymin/spec.step[1])*spec.step[1];y<=ymax;y+=spec.step[1])s+=`<path d="M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e2e7ed"/><text x="${L-10}" y="${Y(y)+5}" text-anchor="end" font-size="15">${y}</text>`;
 s+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/><g clip-path="url(#rational-plot)">`;
 if(spec.area)for(const p of spec.pieces){const a=Math.max(p.range[0],spec.area[0]),b=Math.min(p.range[1],spec.area[1]);if(b>a)s+=`<polygon points="${pt(a,0)} ${points(p,a,b)} ${pt(b,0)}" fill="#c4e4ef"/>`;}
 for(const a of spec.asymptotes)s+=`<path d="${a.axis==='x'?`M${pt(a.value,ymin)} L${pt(a.value,ymax)}`:`M${pt(a.from??xmin,a.value)} L${pt(xmax,a.value)}`}" stroke="#c45114" stroke-dasharray="7 5"/>`;
 for(const p of spec.pieces)s+=`<polyline points="${points(p,...p.range)}" fill="none" stroke="#075597" stroke-width="3"/>`;
 s+='</g>';
 for(const p of spec.pieces)for(const[side,k]of[['left',0],['right',1]])if(p[side+'Open']||p[side+'Closed']){const x=p.range[k];s+=`<circle cx="${X(x)}" cy="${Y(evaluatePiece(p,x))}" r="5" fill="${p[side+'Open']?'white':'#075597'}" stroke="#075597" stroke-width="2"/>`;}
 for(const p of spec.points)s+=`<circle cx="${X(p.xy[0])}" cy="${Y(p.xy[1])}" r="5" fill="#075597"/><text x="${X(p.xy[0])+p.dx}" y="${Y(p.xy[1])+p.dy}" text-anchor="${p.dx<0?'end':'start'}" font-size="15">${esc(p.label)}</text>`;
 s+=`<text x="${W-R}" y="${H-B+23}" text-anchor="end" font-size="16">${esc(spec.axisLabels?.[0]??'x')}</text><text x="${L}" y="23" font-size="16">${esc(spec.axisLabels?.[1]??'f(x)')}</text>`;
 spec.pieces.forEach((p,i)=>{s+=`<text x="65" y="${H-56+18*i}" fill="#075597" font-size="15">${esc(p.label)}</text>`;});
 return s+'</svg>';
}
export const functions={142:x=>(2*x-6)/(2-x),291:x=>x<=2?-.5*x*x+x+1:1/(x-1),435:t=>{assert.ok(t>=0);return t<=2?t*t:4/(t-1);}};
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reasons,steps,proof,graph=false)=>{const p=part(ps[k],a,w,reasons,steps,'RATIONAL_DOMAIN_BRANCH_DERIVATIVES_AND_INDEPENDENT_QUADRATURE',proof);if(graph)p.visual=structuredClone(graphSpecs[c.index]);return p;};
 if(c.index===142)return[
 mk(0,'Continua y derivable en ℝ∖{2}; asíntotas x=2 e y=−2.',[
 'Continua y derivable en ℝ∖{2}; asíntotas x=2 e y=2.','Continua y derivable en ℝ∖{3}; asíntotas x=3 e y=−2.','Continua en todo ℝ, no derivable en x=2; única asíntota y=−2.'],['Olvidar el signo del coeficiente del denominador.','Confundir cero del numerador con polo.','Suponer que el numerador también se anula en dos.'],[
 ['El denominador se anula en dos y el numerador no: ese punto queda fuera del dominio.',`f(x)=${F('2x−6','2−x')}; 2−x=0 ⇔ x=2; 2·2−6=−2≠0`],
 ['Un cociente de polinomios es continuo y derivable donde su denominador no es cero.','D(f)=ℝ∖{2}; continua y derivable en D(f)'],
 ['Dividimos para separar la constante del término que tiende a cero.',`f(x)=−2+${F(2,'x−2')}`],
 ['El signo del denominador determina los límites laterales en el polo.','lim_{x→2⁻}f(x)=−∞; lim_{x→2⁺}f(x)=+∞ ⇒ asíntota vertical x=2'],
 ['Al alejarnos hacia ambos infinitos, el cociente restante se anula.','lim_{x→±∞}f(x)=−2 ⇒ asíntota horizontal y=−2; no hay oblicua'],
 ],{domainExclusion:2,numeratorAtPole:-2,vertical:2,horizontal:-2,leftSign:-1,rightSign:1}),
 mk(1,'Decrece en (−∞;2) y (2;+∞); no tiene extremos relativos.',[
 'Crece en (−∞;2) y (2;+∞); no tiene extremos relativos.','Decrece en (−∞;2), crece en (2;+∞); mínimo relativo en x=2.','Decrece en (−∞;3), crece en (3;+∞); mínimo relativo en (3;0).'],['Perder el signo menos al derivar el cociente.','Usar un punto ajeno al dominio como extremo.','Confundir corte del eje horizontal con cero de la derivada.'],[
 ['Aplicamos la regla del cociente conservando el signo de la derivada del denominador.',`f′(x)=${F('2(2−x)+(2x−6)','(2−x)²')}`],
 ['Simplificamos el numerador.',`f′(x)=−${F(2,'(x−2)²')}`],
 ['El denominador cuadrado es positivo en todo el dominio y el numerador es negativo.','f′(x)<0 para x≠2'],
 ['Separar las ramas es imprescindible: no se afirma monotonía global a través de la discontinuidad.','Decrece en (−∞;2) y, por separado, en (2;+∞)'],
 ['La derivada nunca se anula y dos no pertenece al dominio; no hay extremos relativos.','f′(x)=0 no tiene solución; x=2 no es candidato'],
 ],{derivativeNumerator:-2,samples:[[-1,-2/9],[0,-.5],[3,-2],[4,-.5]],extrema:[],split:2}),
 mk(2,'Cortes (3;0) y (0;−3); dos ramas decrecientes con asíntotas x=2 e y=−2.',[
 'Cortes (−3;0) y (0;−3); dos ramas decrecientes con asíntotas x=2 e y=−2.','Cortes (3;0) y (0;3); dos ramas decrecientes con asíntotas x=2 e y=−2.','Cortes (3;0) y (0;−3); dos ramas crecientes con asíntotas x=2 e y=−2.'],['Cambiar el signo al despejar el cero del numerador.','Perder el signo en f(0).','Dibujar la orientación opuesta a la derivada calculada.'],[
 ['Para el corte horizontal anulamos el numerador, comprobando el denominador.','2x−6=0 ⇒ x=3; 2−3≠0 ⇒ (3;0)'],
 ['Para el corte vertical sustituimos x=0.','f(0)=−6/2=−3 ⇒ (0;−3)'],
 ['La rama izquierda está por debajo de y=−2 y cae hasta menos infinito cerca de dos.',`x<2 ⇒ ${F(2,'x−2')}<0; f(x)<−2`],
 ['La rama derecha baja desde más infinito y se aproxima a y=−2 por arriba.',`x>2 ⇒ ${F(2,'x−2')}>0; f(x)>−2`],
 ['La gráfica adjunta dibuja ramas separadas, los cortes y ambas asíntotas; no conecta el polo.','Puntos de comprobación: f(1)=−4; f(4)=−1'],
 ],{intercepts:[[3,0],[0,-3]],samples:[[1,-4],[4,-1]],vertical:2,horizontal:-2},true)];
 if(c.index===291)return[
 mk(0,`Continua y derivable en ℝ; crece hasta x=1 y decrece después; máximo (1;${F(3,2)}), unión suave (2;1).`,[
 `Continua en ℝ, no derivable en x=2; crece hasta x=1 y decrece después; máximo (1;${F(3,2)}).`,
 `Discontinua en x=2; crece hasta x=1 y decrece después; máximo (1;${F(3,2)}).`,
 'Continua y derivable en ℝ; crece hasta x=2 y decrece después; máximo (2;1).'],['Suponer una esquina por cambiar la fórmula.','Tomar x=2 como polo de la rama racional.','Confundir empalme y vértice.'],[
 ['La primera rama cubre x≤2 y la racional solo x>2; su denominador no se anula en ese tramo.',`f₁=−${F('x²',2)}+x+1; f₂=${F(1,'x−1')}; D(f)=ℝ`],
 ['Comprobamos la continuidad en la unión.','f₁(2)=−2+2+1=1; lim_{x→2⁺}f₂(x)=1=f(2)'],
 ['Derivamos por tramos y comparamos las pendientes.',`f₁′=1−x; f₂′=−${F(1,'(x−1)²')}; f₁′(2)=f₂′(2)=−1`],
 ['La derivada de la parábola cambia de positiva a negativa en uno; la racional siempre es negativa.','Crece en (−∞;1); decrece en (1;+∞)'],
 ['Hallamos el máximo y comprobamos la apertura de la parábola.',`f(1)=${F(3,2)}; f₁(x)=${F(3,2)}−${F('(x−1)²',2)}`],
 ['Para dibujar, conservamos solo el cero que pertenece al tramo parabólico y la asíntota derecha.','Corte OX: x=1−√3; corte OY: (0;1); lim_{x→+∞}f(x)=0'],
 ['La gráfica adjunta une ambas ramas con pendiente menos uno. No hay asíntota vertical en uno, pues allí se usa el polinomio.','Unión (2;1), máximo (1;3/2); x=1 sí pertenece al dominio'],
 ],{join:2,joinValues:[1,1],joinSlopes:[-1,-1],maximum:[1,1.5],root:1-Math.sqrt(3),horizontalRight:0,verticalAsymptotes:[]},true),
 mk(1,`Área=${F(8,3)}+ln 3≈3,76528 u².`,[
 `Área=${F(8,3)}−ln 3≈1,56805 u².`,`Área=${F(8,3)}+ln 4≈4,05296 u².`,`Área=${F(4,3)}+ln 3≈2,43195 u².`],['Restar una contribución positiva.','Usar ln x en vez de ln(x−1).','Perder la mitad del área del tramo polinómico.'],[
 ['El recinto va de cero a cuatro y cambia de fórmula en dos. Ambas ramas son positivas en su intervalo de integración.','En [0;2], f≥1; en (2;4], f>0'],
 ['El área es la suma de las integrales por ramas; la gráfica adjunta sombrea precisamente ese recinto.',`A=∫_{0}^{2}(−${F('x²',2)}+x+1) dx+∫_{2}^{4}${F(1,'x−1')} dx`],
 ['Obtenemos una primitiva del polinomio y verificamos derivando.',`H₁(x)=−${F('x³',6)}+${F('x²',2)}+x; H₁′=−${F('x²',2)}+x+1`],
 ['Evaluamos el primer tramo.',`A₁=H₁(2)−H₁(0)=−${F(4,3)}+2+2=${F(8,3)}`],
 ['En el segundo tramo x−1 es positivo y su logaritmo es una primitiva.',`H₂(x)=ln(x−1); H₂′=${F(1,'x−1')}; A₂=ln 3−ln 1=ln 3`],
 ['Sumamos y conservamos la expresión exacta antes de aproximar.',`A=${F(8,3)}+ln 3≈3,76528 u²`],
 ],{interval:[0,4],split:2,partialAreas:[8/3,Math.log(3)],area:8/3+Math.log(3),wrongAreas:[8/3-Math.log(3),8/3+Math.log(4),4/3+Math.log(3)]},true)];
 if(c.index===435)return[
 mk(0,'Continua en [0;+∞); derivable en (0;2) y (2;+∞), no en t=2: pendientes 4 y −4.',[
 'Continua en [0;+∞) y derivable en (0;+∞), incluida t=2: pendiente 4.','Discontinua en t=2 con salto de 4 a 2; no derivable allí.','Continua salvo en t=1 y derivable salvo en t=1 y t=2.'],['Comparar valores pero no derivadas laterales.','Dividir cuatro entre t en lugar de t−1.','Extrapolar el denominador de una rama fuera de su intervalo.'],[
 ['El tiempo es no negativo. Cada fórmula es regular dentro de su propio tramo.',`f₁=t², 0≤t≤2; f₂=${F(4,'t−1')}, t>2`],
 ['Calculamos el límite izquierdo, el valor y el límite derecho en dos.','lim_{t→2⁻}f(t)=f(2)=4; lim_{t→2⁺}f(t)=4/(2−1)=4'],
 ['La unión es continua. En cero el valor y el límite por la derecha también coinciden.','f(0)=lim_{t→0⁺}f(t)=0'],
 ['Derivamos las dos ramas.',`f₁′=2t; f₂′=−${F(4,'(t−1)²')}`],
 ['Las pendientes son distintas en dos: aparece una esquina, no un salto.','f′(2⁻)=4; f′(2⁺)=−4 ⇒ no derivable en 2'],
 ['En cero solo tiene sentido una derivada lateral dentro del dominio temporal.','D=[0;+∞); derivable en (0;2)∪(2;+∞)'],
 ],{domainStart:0,join:2,values:[4,4],slopes:[4,-4],rightDerivativeAtZero:0}),
 mk(1,'Crece en (0;2), decrece en (2;+∞); asíntota horizontal f=0, ninguna vertical.',[
 'Crece en (0;2), decrece en (2;+∞); asíntotas f=0 y t=1.','Decrece en (0;2), crece en (2;+∞); asíntota horizontal f=0.','Crece en (0;+∞); asíntota horizontal f=4, ninguna vertical.'],['Atribuir a la función un polo de una fórmula que no se usa allí.','Invertir el signo de las derivadas.','Confundir el máximo con el límite a tiempo infinito.'],[
 ['En el primer tramo la derivada es positiva salvo en el extremo inicial.','2t>0 para 0<t<2 ⇒ crece'],
 ['En el segundo tramo el numerador de la derivada es negativo y el denominador es positivo.',`−${F(4,'(t−1)²')}<0 para t>2 ⇒ decrece`],
 ['La función racional tiende a cero desde valores positivos cuando aumenta el tiempo.',`lim_{t→+∞}${F(4,'t−1')}=0 ⇒ asíntota horizontal f=0`],
 ['No hay asíntota vertical: en t=1 rige t² y vale uno; en dos los límites son finitos.','f(1)=1; f(2)=4; el dominio no tiene ningún polo'],
 ['La gráfica adjunta muestra el arco parabólico ascendente y la rama racional descendente, con unión cerrada en (2;4).','Puntos de control: (0;0), (1;1), (2;4), (3;2), (5;1)'],
 ],{increasing:[0,2],decreasing:[2,null],asymptote:0,verticalAsymptotes:[],points:[[0,0],[1,1],[2,4],[3,2],[5,1]]},true),
 mk(2,'Máxima contracción a los 2 s: 4 décimas de milímetro (0,4 mm).',[
 'Máxima contracción a los 2 s: 4 milímetros (4 mm).','Máxima contracción a los 1 s: 1 décima de milímetro (0,1 mm).','Máxima contracción a los 4 s: 4 décimas de milímetro (0,4 mm).'],['Olvidar la unidad décimas de milímetro.','Confundir el polo de una prolongación inexistente con el punto crítico.','Intercambiar tiempo y valor de la función.'],[
 ['En el primer tramo la función crece hasta dos; después decrece.','f′>0 antes de 2; f′<0 después de 2'],
 ['Por continuidad, el punto de unión alcanza el máximo, aunque no sea derivable allí.','t máximo=2 s'],
 ['Calculamos su valor con la rama que incluye el punto.','f(2)=2²=4 décimas de milímetro'],
 ['Comprobamos globalmente que ninguna rama supera cuatro.',`0≤t≤2 ⇒ t²≤4; t>2 ⇒ 0<${F(4,'t−1')}<4`],
 ['Convertimos la unidad sin cambiar la escala temporal.','4 décimas de mm=4·0,1 mm=0,4 mm'],
 ],{time:2,value:4,millimeters:.4,wrongTime:[1,4],wrongMillimeters:4})];
 throw Error('Unreviewed rational-plot case');
}
export function buildRationalPlotsBatch(id='batch-0332',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Continuidad','Monotonía','Gráficas',...(x.correctionEvidence.parameters.index===291?['Integrales definidas y áreas']:[])];if(x.correctionEvidence.parameters.index===291)x.integrationEvidence={scope:'IMMEDIATE_LOGARITHMIC_AND_POLYNOMIAL_AREA_EXPLICITLY_REQUESTED_BY_OFFICIAL_EXAM',advancedIntegrationMethods:false};x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_SUBPARTS_WITH_RATIONAL_DOMAIN_AND_BRANCH_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRationalPlotsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0332-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0332.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}

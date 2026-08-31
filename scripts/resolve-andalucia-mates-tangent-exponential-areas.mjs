import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[225,'7e01afbcbc60e470239ea2b816456c5e1681c9eacddee55c6b388fa3f235d19f',1,'A.2','a6868e4ed81fb01409e19ceafbb73935dc82a9b497b2605771a3fdeb6b36a5d4',0],
[233,'280faba61b350012aff8fac9e612d9e50230e298431f9b0a7bb50bb626f4ff94',2,'6','3b028086a440363a45648d60f93eb90be0086399a1dc695b39f876d1304ab453',0],
];
export const statements={
225:'Sea f:ℝ→ℝ la función definida por f(x)=x³−3x²−x+3.\na) [0,75 puntos] Halla, si existe, el punto de la gráfica de f en el que la recta tangente es y=3−x.\nb) [1,75 puntos] Calcula el área del recinto limitado por la gráfica de f y la recta del apartado anterior.',
233:'Considera las funciones f,g:ℝ→ℝ definidas por f(x)=−e^x y g(x)=−e^{−x}.\na) [1 punto] Esboza las gráficas de dichas funciones.\nb) [1,5 puntos] Calcula la suma de las áreas de los recintos acotados y limitados por las gráficas de dichas funciones y las rectas x=−1 y x=1.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_TANGENT_EXPONENTIAL_AREAS_SOURCE_LAYOUT']]:[];
export const cases=[{index:225,literals:['x3 − 3x2 − x + 3','y = 3 − x']},{index:233,literals:['−ex','x = −1 y x = 1']}];
export const curves={225:[x=>x**3-3*x*x-x+3,x=>3-x],233:[x=>-Math.exp(x),x=>-Math.exp(-x)]};
export const graphs={
225:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-tangent-exponential-areas-v1',index:225,xRange:[-.6,3.5],yRange:[-8,6],regions:[[0,3]],points:[[0,3],[3,0]],labels:['f(x)=x³−3x²−x+3','g(x)=3−x; tangencia en (0;3)']},
233:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-tangent-exponential-areas-v1',index:233,xRange:[-1.7,1.7],yRange:[-5.8,.6],regions:[[-1,0],[0,1]],points:[[0,-1],[-1,-Math.exp(-1)],[-1,-Math.E],[1,-Math.E],[1,-Math.exp(-1)]],labels:['f(x)=−eˣ; decreciente','g(x)=−e⁻ˣ; creciente; áreas entre x=−1 y x=1']},
};
export function renderTangentExponentialAreaGraph(g){assert.deepEqual(g,graphs[g.index]);const W=760,H=440,L=70,R=30,T=25,B=100,[xmin,xmax]=g.xRange,[ymin,ymax]=g.yRange,[f,h]=curves[g.index];
 const X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(fn,a,b)=>Array.from({length:601},(_,i)=>{const x=a+(b-a)*i/600;return pt(x,fn(x));}).join(' '),clip=`tangent-area-${g.index}`;
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Curvas del enunciado oficial y recintos de integración"><rect width="760" height="440" fill="white"/><defs><clipPath id="${clip}"><rect x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}"/></clipPath></defs>`;
 for(let i=0;i<=5;i++){const x=xmin+(xmax-xmin)*i/5,y=ymin+(ymax-ymin)*i/5;svg+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)} M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e2e7ed"/><text x="${X(x)}" y="${H-B+22}" text-anchor="middle" font-size="14">${Number(x.toFixed(2))}</text><text x="${L-10}" y="${Y(y)+4}" text-anchor="end" font-size="14">${Number(y.toFixed(2))}</text>`;}
 svg+=`<g clip-path="url(#${clip})">`;for(const[a,b]of g.regions)svg+=`<polygon points="${trace(f,a,b)} ${trace(h,b,a)}" fill="#c7e8ef"/><path d="M${pt(a,ymin)} L${pt(a,ymax)} M${pt(b,ymin)} L${pt(b,ymax)}" stroke="#999" stroke-dasharray="4 4"/>`;
 svg+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/>`;for(const[fn,color]of[[f,'#075597'],[h,'#a52d3c']])svg+=`<polyline points="${trace(fn,xmin,xmax)}" fill="none" stroke="${color}" stroke-width="3"/>`;
 for(const p of g.points)svg+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="4" fill="#202c40"/>`;svg+='</g>';g.labels.forEach((label,i)=>svg+=`<text x="70" y="${H-48+25*i}" fill="${i?'#a52d3c':'#075597'}" font-size="17">${label}</text>`);return svg+'</svg>';
}
export const proof=c=>c.index===225?{slopeCandidates:[0,2],tangency:[0,3],intersections:[[0,3],[3,0]],area:27/4}:{intersection:[0,-1],leftArea:Math.E+1/Math.E-2,rightArea:Math.E+1/Math.E-2,area:2*(Math.E+1/Math.E-2)};
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s,graph=false)=>{const p=part(ps[i],a,d,e,s,'DERIVATIVE_AND_INTERSECTION_CHECK_WITH_INDEPENDENT_AREA_QUADRATURE',proof(c));if(graph)p.visual=structuredClone(graphs[c.index]);return p;};
 if(c.index===225)return[mk(0,'Punto de tangencia: (0;3).',['Punto de tangencia: (2;−3).','Punto de tangencia: (3;0).','Punto de tangencia: (1;0).'],['Igualar solo pendientes, sin comprobar que el punto pertenece a la recta dada.','Confundir una intersección transversal con un punto de tangencia.','Elegir un cero de la función sin comprobar la recta ni la pendiente.'],[
 ['Para que la recta dada sea tangente hacen falta dos condiciones: misma pendiente y paso por el punto de la curva.','f′(a)=−1; f(a)=3−a'],
 ['Derivamos el polinomio y resolvemos la primera condición sin olvidar ninguna raíz.','f′(x)=3x²−6x−1; 3a²−6a−1=−1 ⇒ 3a(a−2)=0'],
 ['Los candidatos obtenidos de la pendiente son cero y dos; todavía no se ha demostrado la tangencia con la recta prescrita.','a=0 o a=2'],
 ['Comprobamos el paso por el punto para el primer candidato.','f(0)=3=3−0; f′(0)=−1 ⇒ P=(0;3)'],
 ['El segundo candidato da una tangente paralela, pero distinta de la recta requerida.','f(2)=−3≠3−2=1; tangente en dos: y=−x−1'],
 ['Verificamos mediante la fórmula punto-pendiente la única recta que cumple ambas condiciones.','y−f(0)=f′(0)(x−0) ⇒ y=3−x'],
 ]),mk(1,'Área=frac{27}{4} u².',['Área=−frac{27}{4} u².','Área=frac{27}{2} u².','Área=frac{189}{4} u².'],['Invertir el orden de superior menos inferior.','Duplicar un recinto único como si hubiera simetría.','Cambiar el signo del término cúbico al integrar la diferencia.'],[
 ['Igualamos la curva con la recta para encontrar todos los extremos del recinto.','x³−3x²−x+3=3−x ⇒ x²(x−3)=0 ⇒ x=0 o x=3'],
 ['La raíz doble en cero corresponde al contacto tangente. La otra intersección es (3;0).','P=(0;3); Q=(3;0)'],
 ['Entre las dos abscisas la recta queda por encima de la cúbica; comprobamos el signo de la diferencia factorizada.','(3−x)−f(x)=3x²−x³=x²(3−x)≥0 para 0≤x≤3'],
 ['El área es la integral de esa diferencia. No hay que sumar otro recinto no acotado.','A=∫_0^3(3x²−x³)dx'],
 ['Integramos conservando signos y aplicamos la regla de Barrow.','H(x)=x³−frac{x⁴}{4}; A=H(3)−H(0)=27−frac{81}{4}=frac{27}{4}'],
 ['Verificamos la primitiva por derivación y el área positiva con cuadratura independiente; el esbozo muestra el mismo recinto.','H′(x)=3x²−x³; A=6,75 u²'],
 ],true)];
 if(c.index===233)return[mk(0,'Ambas negativas; f decrece y g crece; corte (0;−1); simétricas respecto del eje vertical.',['Ambas negativas; f y g decrecen; corte (0;−1); simétricas respecto del eje vertical.','Ambas negativas; f decrece y g crece; corte (0;1); simétricas respecto del eje vertical.','f negativa y g positiva; f decrece y g crece; sin intersección; simétricas respecto del origen.'],['Omitir el signo de la derivada de −x al derivar la segunda exponencial.','Perder el signo exterior al evaluar las funciones en cero.','Confundir −e^{−x} con e^{−x} y cambiar la simetría.'],[
 ['Las exponenciales son estrictamente positivas y están definidas para toda abscisa real. El signo exterior hace negativas las dos funciones.','Dominio de ambas: ℝ; f(x)<0 y g(x)<0'],
 ['Derivamos aplicando la regla de la cadena en la segunda función.','f′(x)=−e^x<0; g′(x)=e^{−x}>0'],
 ['Las dos concavidades son hacia abajo; no aparecen máximos, mínimos ni cambios de concavidad.','f″(x)=−e^x<0; g″(x)=−e^{−x}<0'],
 ['Igualamos las expresiones. La exponencial real es inyectiva y ambas funciones pasan por la misma ordenada.','−e^x=−e^{−x} ⇒ x=−x ⇒ x=0; f(0)=g(0)=−1'],
 ['Identificamos simetría y comportamiento en los extremos para construir el esbozo completo.','g(x)=f(−x); f(x)→0⁻ si x→−∞; g(x)→0⁻ si x→+∞'],
 ['Las otras ramas descienden sin cota y ninguna corta el eje horizontal. El gráfico adjunto refleja estos datos y los límites del recinto.','f(x)→−∞ si x→+∞; g(x)→−∞ si x→−∞; asíntota horizontal y=0'],
 ],true),mk(1,'Área=2(e+frac{1}{e}−2) u².',['Área=2(e−frac{1}{e}) u².','Área=(e+frac{1}{e}−2) u².','Área=2(e+frac{1}{e}+2) u².'],['Sumar magnitudes hasta el eje horizontal en lugar del espacio entre curvas.','Contar solo uno de los dos recintos simétricos.','Sumar en vez de restar la evaluación de la primitiva en cero.'],[
 ['El punto de corte divide los recintos en dos intervalos; no integramos una diferencia con signo cambiante sin separarla.','Intervalos: [−1;0] y [0;1]'],
 ['En el intervalo negativo la primera función está por encima, y en el positivo lo está la segunda.','x<0 ⇒ f(x)>g(x); x>0 ⇒ g(x)>f(x)'],
 ['Planteamos las dos contribuciones de superior menos inferior.','A₁=∫_{−1}^0(e^{−x}−e^x)dx\nA₂=∫_0^1(e^x−e^{−x})dx'],
 ['Integramos en el tramo positivo y evaluamos ambos extremos, incluido el inferior.','H(x)=e^x+e^{−x}; A₂=H(1)−H(0)=e+frac{1}{e}−2'],
 ['La simetría da la misma área izquierda; lo comprobamos también con su primitiva.','A₁=[−e^{−x}−e^x]_{−1}^0=e+frac{1}{e}−2=A₂'],
 ['Sumamos las contribuciones positivas y comprobamos por derivación y cuadratura.','A=2(e+frac{1}{e}−2)≈2,172323 u²; H′(x)=e^x−e^{−x}'],
 ],true)];throw Error('Unknown area case');
}
export function buildTangentExponentialAreasBatch(id='batch-0396',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Integrales definidas y áreas';x.secondaryTopics=['Derivadas'];x.block='Análisis';x.examSlot=3;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_TANGENCY_AND_AREA_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildTangentExponentialAreasBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0396-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0396.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

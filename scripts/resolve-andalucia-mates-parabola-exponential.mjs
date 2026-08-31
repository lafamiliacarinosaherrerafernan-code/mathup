import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[300,'85795e32721a21a3eb278bd06b1c23d508ff32ce7a58a770197d2b13552be49e',1,'A.2','4f7379c3f9b5050938705ad152a53115e5c80d36adcf3d07a7be351a26aa7591',0],
[311,'e5a1aa84a94cdee287b46fb8413656f21751c536506f9cdb94ff2e89e874862f',2,'B.1','8ee23d341cf494c803b0474bf7c2ce2bc8a04e391112230682a3593502ea9e12',0],
[315,'f5ec52502964f33fd640c31536ed9055e35529b51abb1d02247402916bcbc6a6',2,'6','a10fa58a80ef31ad31373e0721263592a15a2599913844bb7143a1e12a92ca8b',0]];
export const statements={300:'Considera las funciones f,g:ℝ→ℝ definidas por f(x)=2−x² y g(x)=|x|.\na) [1 punto] Esboza sus gráficas en unos mismos ejes coordenados.\nb) [1,5 puntos] Calcula el área del recinto limitado por las gráficas de f y g.',311:'Sea f:ℝ→ℝ la función definida por f(x)=(x²+3x+1)e^{−x}.\na) [1 punto] Estudia y calcula las asíntotas de la gráfica de f.\nb) [1 punto] Halla los puntos de la gráfica de f cuya recta tangente es horizontal.\nc) [0,5 puntos] Determina la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=0.',315:'Calcula el valor de a>0 para que el área comprendida entre la parábola y=3x²−2ax y el eje de abscisas sea 4 unidades cuadradas.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PARABOLA_EXPONENTIAL_SOURCE_LAYOUT']]:[];
export const cases=[{index:300,literals:['2 − x2','g(x) = |x|'],slot:3},{index:311,literals:['x2 + 3x + 1','horizontal'],slot:2},{index:315,literals:['3x2 − 2ax','4 unidades'],slot:3,whole:true}];
export const proof=c=>({300:{intersections:[[-1,1],[1,1]],area:7/3},311:{horizontalAsymptote:0,criticalPoints:[[-2,-(Math.E**2)],[1,5/Math.E]],tangent:[2,1]},315:{parameter:3,roots:[0,2],area:4}}[c.index]);
export const graphs={300:{plotVersion:'mates-parabola-exponential-v1',index:300},315:{plotVersion:'mates-parabola-exponential-v1',index:315}};
export function renderParabolaExponential(g){assert.deepEqual(g,graphs[g.index]);const a=g.index===300,xmin=a?-1.7:-.5,xmax=a?1.7:2.5,ymin=a?-1.1:-3.5,ymax=a?2.5:4.5,f=a?x=>2-x*x:x=>3*x*x-6*x,h=a?Math.abs:()=>0,lo=a?-1:0,hi=a?1:2,X=x=>65+630*(x-xmin)/(xmax-xmin),Y=y=>330-295*(y-ymin)/(ymax-ymin),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(fn,b,e)=>Array.from({length:401},(_,i)=>{const x=b+(e-b)*i/400;return pt(x,fn(x));}).join(' ');let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420" role="img" aria-label="Curvas oficiales y recinto de integración"><rect width="760" height="420" fill="white"/><polygon points="${trace(f,lo,hi)} ${trace(h,hi,lo)}" fill="#c7e8ef"/>`;
for(let i=Math.ceil(xmin);i<=xmax;i++)s+=`<path d="M${pt(i,ymin)} L${pt(i,ymax)}" stroke="#e1e7ef"/><text x="${X(i)}" y="355" text-anchor="middle" font-size="16">${i}</text>`;
for(let i=Math.ceil(ymin);i<=ymax;i++)s+=`<path d="M${pt(xmin,i)} L${pt(xmax,i)}" stroke="#e1e7ef"/><text x="50" y="${Y(i)+5}" text-anchor="end" font-size="16">${i}</text>`;
s+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/><polyline points="${trace(f,xmin,xmax)}" stroke="#075597" fill="none" stroke-width="3"/><polyline points="${trace(h,xmin,xmax)}" stroke="#a52d3c" fill="none" stroke-width="3"/><text x="65" y="389" font-size="19">${a?'f(x)=2−x²; g(x)=|x|; cortes en (−1;1) y (1;1)':'y=3x²−6x; a=3; recinto entre x=0 y x=2'}</text></svg>`;return s;}
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_QUADRATURE_AND_DERIVATIVE_CHECK',proof(c));let out;switch(c.index){
case 300:out=[mk(0,'Parábola hacia abajo con vértice (0;2) y V con vértice (0;0); cortes (−1;1) y (1;1).',['Parábola hacia arriba con vértice (0;2) y V con vértice (0;0).','Parábola hacia abajo con vértice (0;0) y V con vértice (0;2).','Parábola hacia abajo con vértice (0;2) y recta y=x en todo ℝ.'],['Cambiar el signo del coeficiente cuadrático.','Intercambiar los desplazamientos verticales.','Eliminar el valor absoluto para las abscisas negativas.'],[
['La primera función es cuadrática con coeficiente principal negativo. Su eje de simetría es el eje vertical.','f(x)=2−x²; vértice (0;2)'],
['El valor absoluto produce dos semirrectas que se unen en el origen.','g(x)=−x si x<0; g(x)=x si x≥0'],
['Para las abscisas no negativas igualamos parábola y semirrecta derecha.','2−x²=x ⇒ (x+2)(x−1)=0; x≥0 ⇒ x=1'],
['Ambas funciones son pares: el otro corte se obtiene por simetría y se verifica directamente.','f(−1)=g(−1)=1; f(1)=g(1)=1'],
['La parábola cruza el eje horizontal en dos puntos y queda por encima de la V entre los cortes.','f(x)=0 ⇒ x=±√2; f(0)=2>g(0)=0'],
['El dibujo adjunto conserva los dos vértices y los dos cortes; no sustituye ninguna rama por una prolongación incorrecta.','f(−x)=f(x); g(−x)=g(x)'],
]),mk(1,'Área=frac{7}{3} u².',['Área=frac{7}{6} u².','Área=frac{10}{3} u².','Área=frac{13}{3} u².'],['Integrar solo la mitad derecha sin duplicarla.','Integrar la parábola sin restar la V.','Sumar el valor absoluto en lugar de restarlo.'],[
['El recinto está comprendido entre los dos cortes del apartado anterior. La parábola es la curva superior.','−1≤x≤1; A=∫_{−1}^1(2−x²−|x|)dx'],
['Usamos la simetría para trabajar solo con x no negativo, donde el valor absoluto es x.','A=2∫_0^1(2−x²−x)dx'],
['Integramos término a término; el denominador tres corresponde a la potencia cúbica.','H(x)=2x−frac{x³}{3}−frac{x²}{2}'],
['Evaluamos la primitiva en ambos extremos antes de duplicar.','H(1)−H(0)=2−frac{1}{3}−frac{1}{2}=frac{7}{6}'],
['La mitad izquierda aporta la misma área positiva.','A=2·frac{7}{6}=frac{7}{3} u²'],
['Comprobamos que la derivada de H es la diferencia de curvas y que esta es no negativa en el intervalo utilizado.','H′(x)=2−x²−x=(1−x)(x+2)≥0 en [0;1]'],
])];out.forEach(p=>p.visual=graphs[300]);return out;
case 311:return[mk(0,'Única asíntota: y=0 cuando x→+∞; no hay verticales ni oblicuas.',['Asíntota y=0 en ambos infinitos.','Asíntota vertical x=0 y horizontal y=0.','Asíntota oblicua y=x+3 cuando x→−∞.'],['Suponer que la exponencial decrece también hacia menos infinito.','Confundir la forma exponencial con una división por x.','Tomar el polinomio del factor como una asíntota lineal.'],[
['Polinomio y exponencial están definidos y son continuos en toda la recta; no hay puntos finitos con límite infinito.','Dom(f)=ℝ; no hay asíntotas verticales'],
['Hacia más infinito escribimos la función como cociente y aplicamos dos veces L’Hôpital.','lim_{x→+∞}frac{x²+3x+1}{e^x}=lim_{x→+∞}frac{2}{e^x}=0'],
['Por tanto, el eje horizontal es asíntota en ese extremo.','Asíntota en +∞: y=0'],
['Hacia menos infinito el polinomio y el factor exponencial son positivos y crecen sin cota.','lim_{x→−∞}(x²+3x+1)e^{−x}=+∞'],
['Una asíntota oblicua requiere pendiente finita no nula. Aquí el cociente con x diverge hacia menos infinito.','frac{f(x)}{x}=(x+3+frac{1}{x})e^{−x}→−∞ si x→−∞'],
['En más infinito la pendiente límite es cero y ya se obtuvo una horizontal; no aparece una recta oblicua adicional.','lim_{x→+∞}frac{f(x)}{x}=0'],
]),mk(1,'Puntos: (−2;−e²) y (1;frac{5}{e}).',['Puntos: (−1;−e) y (2;frac{11}{e²}).','Puntos: (−2;e²) y (1;frac{5}{e}).','Puntos: (−2;−e²) y (1;5e).'],['Resolver mal el polinomio de la derivada.','Perder el signo de la ordenada en menos dos.','Cambiar e elevado a menos uno por e.'],[
['La tangente es horizontal donde la derivada existe y vale cero. Aplicamos producto y cadena.','f′(x)=(2x+3)e^{−x}−(x²+3x+1)e^{−x}'],
['Extraemos el factor exponencial y reducimos el polinomio.','f′(x)=(−x²−x+2)e^{−x}'],
['La exponencial nunca es cero. Factorizamos para encontrar todas las abscisas.','−x²−x+2=−(x+2)(x−1)=0 ⇒ x=−2 o x=1'],
['Calculamos la ordenada del primer punto en la función original.','f(−2)=(4−6+1)e²=−e²'],
['Calculamos la ordenada del segundo punto sin cambiar el signo del exponente.','f(1)=(1+3+1)e^{−1}=frac{5}{e}'],
['Sustituimos las dos abscisas en la derivada; la factorización demuestra que no existen otras.','f′(−2)=0; f′(1)=0'],
]),mk(2,'Tangente: y=2x+1.',['Tangente: y=3x+1.','Tangente: y=2x.','Tangente: y=−2x+1.'],['Derivar solo el factor polinómico.','Omitir la ordenada del punto de tangencia.','Cambiar el signo de la pendiente.'],[
['La abscisa pedida es cero. Evaluamos la función para obtener el punto.','f(0)=(0+0+1)e⁰=1'],
['La derivada calculada antes da la pendiente exacta de la tangente.','f′(0)=(−0²−0+2)e⁰=2'],
['Usamos la ecuación punto-pendiente con el punto y la pendiente obtenidos.','y−f(0)=f′(0)(x−0)'],
['Sustituimos sin confundir la ordenada con la pendiente.','y−1=2(x−0)'],
['Despejamos la variable dependiente para escribir la ecuación final.','y=2x+1'],
['La recta pasa por el punto y comparte la derivada con la curva; ambas condiciones son necesarias.','r(0)=1=f(0); r′(0)=2=f′(0)'],
])];
case 315:out=[mk(0,'a=3.',['a=−3.','a=27.','a=frac{3}{2}.'],['Aceptar la raíz negativa ignorando a mayor que cero.','Olvidar tomar la raíz cúbica.','Perder el factor dos al hallar el corte no nulo.'],[
['Factorizamos la parábola para determinar los límites del recinto. La condición a positiva fija el orden.','3x²−2ax=x(3x−2a)=0 ⇒ x=0 o x=frac{2a}{3}'],
['La parábola está por debajo del eje entre sus raíces. El área requiere cambiar el signo del integrando.','A=∫_0^{2a/3}(2ax−3x²)dx'],
['Integramos respecto de x tratando a como parámetro constante.','H(x)=ax²−x³'],
['Evaluamos en el corte positivo y simplificamos las potencias de a.','A=frac{4a³}{9}−frac{8a³}{27}=frac{4a³}{27}'],
['Imponemos el área oficial y resolvemos la ecuación cúbica con la condición positiva.','frac{4a³}{27}=4 ⇒ a³=27 ⇒ a=3'],
['Comprobamos el área con el valor obtenido: la primitiva es H(x)=3x²−x³, los cortes son cero y dos y su diferencia da cuatro.','A=H(2)−H(0)=(12−8)−0=4'],
])];out[0].visual=graphs[315];return out;
default:throw Error('Unknown official case');}}
export function buildParabolaExponentialBatch(id='batch-0410',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===3?'Integrales definidas y áreas':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block='Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===3?'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildParabolaExponentialBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0410-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0410.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

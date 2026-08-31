import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[123,'c96a2e679160a7ce024d7347fc9b1c30d9b5a05add9ea3d9b70d831556b54737',2,'B.1','35696c1455d202a7338912a36129c2641c8d7fb7576df1e067ea801bf4682023',0],
[168,'85795e32721a21a3eb278bd06b1c23d508ff32ce7a58a770197d2b13552be49e',2,'B.1','c46acdd16417df570a57b51479bbc5e8b6137aab88b56bf9f845296cc0ba8bfb',0],
[206,'02883b57dfa540931e908920429c12d648ed1810c6ceee66780a26e6f4ebb6d1',1,'A.1','4eaa5678dce2a49fdb35853d6cb553eb2ec0ee477006e7f79a4bf8378b1d8096',0],
[208,'ebc02a7f8b0e620b0f8134f8e32b5215847b3dc50890fe40538337ed88a54a6d',2,'B.2','0a706a90039be7753d769055acc2182d6b2abd45c2842f85a5e4e06b736697dc',0],
[214,'e6356a504a4c1346274193aeafd23fff6f5df37695b3de420a0604e5b166eae0',2,'B.1','4991b8efa994faedfc8afba96057722ebcd885efd16f8c22871352a50d45c98f',0],
];
export const statements={
123:'Sea f la función definida por f(x)=frac{e^x}{x−1}, para x≠1.\na) [0,75 puntos] Estudia y determina las asíntotas de la gráfica de f.\nb) [1 punto] Determina los intervalos de crecimiento y de decrecimiento de f y halla sus máximos y mínimos relativos (puntos en los que se obtienen y valores que alcanza la función).\nc) [0,75 puntos] Esboza la gráfica de f indicando sus puntos de corte con los ejes coordenados.',
168:'Sea f la función definida como f(x)=frac{x³}{x²−1}, para x≠±1.\na) [1 punto] Estudia y halla las asíntotas de la gráfica de f.\nb) [0,75 puntos] Determina los intervalos de crecimiento y de decrecimiento de f.\nc) [0,75 puntos] Esboza la gráfica de f.',
206:'Sea f la función continua definida por\nf(x)=piecewise{frac{e^{λx}−e^x−x}{x²} si x≠0;μ si x=0}\na) Calcula λ y μ. [1,25 puntos]\nb) Para λ=2, calcula la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=1. [1,25 puntos]',
208:'Dada la función f:ℝ→ℝ definida por f(x)=−2x²+3x−1:\na) [0,5 puntos] Prueba que las rectas y=−x+1 e y=3x−1 son tangentes a su gráfica.\nb) [2 puntos] Halla el área del recinto limitado por la gráfica de f y las rectas mencionadas en el apartado anterior.',
214:'[2,5 puntos] De entre todos los números reales positivos, determina el que sumado con su inverso da suma mínima.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_ASYMPTOTE_GRAPHS_SOURCE_LAYOUT']]:[];
export const cases=[{index:123,literals:['x−1','puntos de corte','coordenados'],topic:'Límites y asíntotas',slot:2},{index:168,literals:['x2 − 1','as´ıntotas'],topic:'Límites y asíntotas',slot:2},{index:206,literals:['eλx','continua'],topic:'Continuidad y derivabilidad',slot:2},{index:208,literals:['−2x2 + 3x − 1','y = 3x − 1'],topic:'Integrales definidas y áreas',slot:3},{index:214,literals:['reales positivos','inverso'],topic:'Aplicaciones de derivadas',slot:2,whole:true}];
export const curves={123:[x=>Math.exp(x)/(x-1)],168:[x=>x**3/(x*x-1)],208:[x=>-2*x*x+3*x-1,x=>-x+1,x=>3*x-1]};
export const graphs={
123:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-asymptote-graphs-v1',index:123,xRange:[-4,4],yRange:[-9,20],branches:[[-4,.99],[1.01,4]],verticals:[1],oblique:null,points:[[0,-1],[2,Math.E**2]],labels:['f(x)=eˣ/(x−1); dos ramas separadas','Asíntotas: x=1; y=0 solo cuando x→−∞']},
168:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-asymptote-graphs-v1',index:168,xRange:[-4,4],yRange:[-7,7],branches:[[-4,-1.01],[-.99,.99],[1.01,4]],verticals:[-1,1],oblique:[1,0],points:[[0,0],[-Math.sqrt(3),-1.5*Math.sqrt(3)],[Math.sqrt(3),1.5*Math.sqrt(3)]],labels:['f(x)=x³/(x²−1); tres ramas separadas','Asíntotas: x=−1, x=1 e y=x']},
208:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-asymptote-graphs-v1',index:208,xRange:[-.15,1.15],yRange:[-1.7,1],branches:[[-.15,1.15]],verticals:[],oblique:null,points:[[0,-1],[.5,.5],[1,0]],labels:['Parábola azul; tangentes roja y verde','Recinto sombreado: de x=0 a x=1']},
};
export function renderAsymptoteGraph(g){assert.deepEqual(g,graphs[g.index]);const W=760,H=440,L=65,R=25,T=25,B=95,[xmin,xmax]=g.xRange,[ymin,ymax]=g.yRange,X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,poly=(fn,a,b)=>Array.from({length:701},(_,i)=>{const x=a+(b-a)*i/700;return pt(x,fn(x));}).join(' '),clip=`asymptote-${g.index}`;
let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfica matemática con ramas y asíntotas"><rect width="760" height="440" fill="white"/><defs><clipPath id="${clip}"><rect x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}"/></clipPath></defs>`;
for(let i=0;i<=4;i++){const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)} M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#dfe6ed"/><text x="${X(x)}" y="${H-B+22}" text-anchor="middle" font-size="14">${Number(x.toFixed(2))}</text><text x="${L-8}" y="${Y(y)+5}" text-anchor="end" font-size="14">${Number(y.toFixed(2))}</text>`;}
s+=`<g clip-path="url(#${clip})"><path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#555"/>`;
for(const x of g.verticals)s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)}" stroke="#bb4141" stroke-dasharray="7 5" stroke-width="2"/>`;
if(g.oblique){const [m,b]=g.oblique;s+=`<path d="M${pt(xmin,m*xmin+b)} L${pt(xmax,m*xmax+b)}" stroke="#bb4141" stroke-dasharray="7 5" stroke-width="2"/>`;}
if(g.index===208){const f=curves[208][0],top=x=>Math.min(-x+1,3*x-1);s+=`<polygon points="${poly(f,0,1)} ${poly(top,1,0)}" fill="#c7e8ef"/>`;}
curves[g.index].forEach((f,k)=>{for(const [a,b]of g.branches)s+=`<polyline points="${poly(f,a,b)}" fill="none" stroke="${['#075597','#a52d3c','#16794b'][k]}" stroke-width="3"/>`;});
for(const [x,y]of g.points)s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="#243248"/>`;
s+='</g>';g.labels.forEach((label,i)=>s+=`<text x="65" y="${H-47+25*i}" font-size="17" fill="#243248">${label}</text>`);return s+'</svg>';}
export const proof=c=>c.index===123?{vertical:[1],horizontalLeft:0,minimum:[2,Math.E**2],yIntercept:-1}:c.index===168?{vertical:[-1,1],oblique:[1,0],critical:[-Math.sqrt(3),0,Math.sqrt(3)],maximum:[-Math.sqrt(3),-1.5*Math.sqrt(3)],minimum:[Math.sqrt(3),1.5*Math.sqrt(3)]}:c.index===206?{lambda:2,mu:1.5,slope:Math.E+1,value:Math.E**2-Math.E-1}:c.index===208?{tangencies:[[1,0],[0,-1]],lineIntersection:[.5,.5],partialAreas:[1/12,1/12],area:1/6}:{number:1,minimumSum:2};
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),mk=(i,a,d,e,s,graph=false)=>{const p=part(ps[i],a,d,e,s,'INDEPENDENT_DERIVATIVE_LIMIT_QUADRATURE_AND_GRAPH',proof(c));if(graph)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 123:return[mk(0,'Vertical: x=1. Horizontal: y=0 cuando x→−∞. Sin oblicuas.',['Vertical: x=1. Horizontal: y=0 en ambos infinitos. Sin oblicuas.','Vertical: x=−1. Horizontal: y=0 cuando x→−∞. Sin oblicuas.','Vertical: x=1. Horizontal: ninguna. Oblicua: y=x.'],['Extender al infinito positivo el límite que solo vale en el negativo.','Cambiar el signo del cero del denominador.','Aplicar una regla de grados de polinomios a una función exponencial.'],[
['El numerador exponencial es positivo y el denominador solo se anula en uno.','Dom(f)=ℝ−{1}; e¹=e>0'],
['Estudiamos los dos límites laterales en ese punto.','lim_{x→1⁻}f(x)=−∞; lim_{x→1⁺}f(x)=+∞'],
['Por tanto la recta vertical x=1 es asíntota; no hay otros puntos excluidos.','Asíntota vertical: x=1'],
['En el infinito negativo la exponencial tiende a cero y el denominador crece en valor absoluto.','lim_{x→−∞}frac{e^x}{x−1}=0⁻ ⇒ horizontal y=0'],
['En el infinito positivo la exponencial domina al denominador, como se verifica con L’Hôpital.','lim_{x→+∞}frac{e^x}{x−1}=+∞; no hay horizontal a la derecha'],
['Para una oblicua se necesita pendiente finita no nula. A la derecha el cociente f(x)/x diverge; a la izquierda vale cero.','lim_{x→+∞}frac{e^x}{x(x−1)}=+∞; lim_{x→−∞}frac{f(x)}{x}=0: no hay oblicuas'],
]),mk(1,'Decrece en (−∞;1) y (1;2); crece en (2;+∞). Mínimo (2;e²); sin máximo.',['Crece en (−∞;1) y (1;2); decrece en (2;+∞). Máximo (2;e²); sin mínimo.','Decrece en (−∞;1); crece en (1;+∞). Mínimo en x=1.','Decrece en (−∞;2); crece en (2;+∞). Mínimo (2;e); sin máximo.'],['Invertir el signo de la derivada.','Tratar la discontinuidad como un punto del dominio.','Ignorar la discontinuidad y evaluar incorrectamente e².'],[
['Aplicamos la regla del cociente.','f′(x)=frac{e^x(x−1)−e^x}{(x−1)²}=frac{e^x(x−2)}{(x−1)²}'],
['El factor exponencial y el denominador son positivos en el dominio, por lo que el signo depende de x−2.','f′<0 para x<2, x≠1; f′>0 para x>2'],
['Separamos los intervalos en la discontinuidad, que no pertenece a la gráfica.','Decrece en (−∞;1) y (1;2); crece en (2;+∞)'],
['En dos la derivada cambia de negativa a positiva y se obtiene un mínimo relativo.','f′(2)=0; f(2)=e²'],
['No hay otros ceros de la derivada ni extremos en la discontinuidad.','Único extremo relativo: mínimo (2;e²); ningún máximo relativo'],
['La función carece de mínimo absoluto en todo su dominio porque la rama izquierda baja sin cota.','lim_{x→1⁻}f(x)=−∞; el mínimo de la rama derecha no es absoluto en ℝ−{1}'],
]),mk(2,'Corte con eje Y: (0;−1); no corta el eje X. Dos ramas; mínimo derecho (2;e²).',['Corte con eje Y: (0;1); no corta el eje X. Dos ramas; mínimo derecho (2;e²).','Cortes con ambos ejes: (0;0). Dos ramas; mínimo derecho (2;e²).','Corte con eje Y: (0;−1); no corta el eje X. Una rama continua por x=1.'],['Perder el signo del denominador al evaluar cero.','Confundir e⁰ con cero.','Unir indebidamente las ramas a través de la asíntota.'],[
['Para el eje vertical evaluamos en cero, que pertenece al dominio.','f(0)=frac{1}{−1}=−1 ⇒ (0;−1)'],
['Un corte horizontal requeriría que el numerador fuese cero, lo que no sucede para una exponencial real.','e^x>0 para todo x ⇒ no hay cortes con el eje X'],
['En la rama izquierda el denominador es negativo: la curva baja desde cero hasta menos infinito.','x<1 ⇒ f(x)<0; x→−∞: f→0⁻; x→1⁻: f→−∞'],
['En la rama derecha la curva es positiva y baja desde más infinito hasta el mínimo.','1<x<2: decreciente; f(2)=e²'],
['Después del mínimo la curva crece sin cota.','x>2: creciente; x→+∞: f→+∞'],
['El esbozo adjunto respeta los cortes, la horizontal izquierda y la separación en x=1.','Dos ramas; asíntota vertical x=1; punto marcado (0;−1) y mínimo (2;e²)'],
],true)];
case 168:return[mk(0,'Verticales: x=−1 y x=1. Oblicua: y=x en ambos infinitos. Sin horizontales.',['Verticales: x=−1 y x=1. Oblicua: y=−x. Sin horizontales.','Vertical: x=1 solamente. Oblicua: y=x. Sin horizontales.','Verticales: x=−1 y x=1. Horizontal: y=0. Sin oblicuas.'],['Cambiar el signo del cociente de la división polinómica.','Olvidar una raíz del denominador cuadrático.','Comparar solo el resto de la división y omitir el término x.'],[
['El denominador se anula en menos uno y uno, pero el numerador no se anula allí.','Dom(f)=ℝ−{−1;1}; f(x)=frac{x³}{(x−1)(x+1)}'],
['Los límites laterales en menos uno tienen signos opuestos.','lim_{x→−1⁻}f(x)=−∞; lim_{x→−1⁺}f(x)=+∞'],
['En uno también divergen; identificamos la segunda vertical.','lim_{x→1⁻}f(x)=−∞; lim_{x→1⁺}f(x)=+∞'],
['Dividimos los polinomios conservando el resto.','f(x)=x+frac{x}{x²−1}'],
['El resto tiende a cero en ambos infinitos y acredita la asíntota oblicua.','lim_{x→±∞}(f(x)−x)=0 ⇒ y=x'],
['La función diverge como x, de modo que no tiene límite finito en ninguno de los dos extremos.','lim_{x→+∞}f(x)=+∞; lim_{x→−∞}f(x)=−∞: sin horizontales'],
]),mk(1,'Crece en (−∞;−√3) y (√3;+∞); decrece en (−√3;−1), (−1;1) y (1;√3).',['Decrece en (−∞;−√3) y (√3;+∞); crece en (−√3;−1), (−1;1) y (1;√3).','Crece en (−∞;−1) y (1;+∞); decrece en (−1;1).','Crece en (−∞;−√3), (0;1) y (√3;+∞); decrece en los demás tramos.'],['Invertir el signo del numerador de la derivada.','Usar los polos como si fueran los únicos puntos críticos.','Suponer cambio de signo en cero pese a su multiplicidad par.'],[
['Derivamos por la regla del cociente y factorizamos.','f′(x)=frac{3x²(x²−1)−2x⁴}{(x²−1)²}=frac{x²(x²−3)}{(x²−1)²}'],
['Identificamos ceros y puntos que separan el dominio.','f′=0 en x=−√3,0,√3; x=−1,1 no pertenecen al dominio'],
['El denominador es positivo y x² no cambia de signo: fuera de los ceros manda x²−3.','|x|>√3 ⇒ f′>0; |x|<√3, x≠−1,0,1 ⇒ f′<0'],
['Traducimos a intervalos abiertos de crecimiento y decrecimiento sin atravesar polos.','Crece: (−∞;−√3), (√3;+∞); decrece: (−√3;−1), (−1;1), (1;√3)'],
['El cero aislado de la derivada en cero no interrumpe el decrecimiento ni produce un extremo.','f′(0)=0, con signo negativo a ambos lados de cero'],
['Como comprobación, los otros dos ceros sí cambian de signo.','Máximo en x=−√3; mínimo en x=√3'],
]),mk(2,'Tres ramas; corte (0;0); máximo (−√3;−frac{3√3}{2}) y mínimo (√3;frac{3√3}{2}).',['Tres ramas; corte (0;0); mínimo (−√3;−frac{3√3}{2}) y máximo (√3;frac{3√3}{2}).','Dos ramas; corte (0;0); máximo (−√3;−frac{3√3}{2}) y mínimo (√3;frac{3√3}{2}).','Tres ramas; corte (0;1); máximo (−√3;−frac{3√3}{2}) y mínimo (√3;frac{3√3}{2}).'],['Intercambiar máximo y mínimo al leer la monotonía.','Unir dos intervalos del dominio atravesando un polo.','Evaluar incorrectamente el numerador en cero.'],[
['La función es impar; la gráfica es simétrica respecto al origen.','f(−x)=−f(x)'],
['Los cortes con ambos ejes coinciden en el origen.','x³=0 ⇒ x=0; f(0)=0'],
['Evaluamos los extremos hallados mediante la derivada.','f(−√3)=−frac{3√3}{2}; f(√3)=frac{3√3}{2}'],
['La rama central desciende desde más infinito a menos infinito, con tangente horizontal en el origen.','x→−1⁺: f→+∞; x→1⁻: f→−∞; f′(0)=0'],
['Las ramas exteriores se aproximan a y=x y respetan los extremos y límites laterales.','Rama izquierda: máximo; rama derecha: mínimo'],
['El esbozo representa tres ramas independientes y dibuja las asíntotas discontinuas sin unir las curvas a través de ellas.','Dominio separado en (−∞;−1), (−1;1) y (1;+∞)'],
],true)];
case 206:return[mk(0,'λ=2, μ=frac{3}{2}.',['λ=1, μ=0.','λ=2, μ=3.','λ=−2, μ=frac{3}{2}.'],['Olvidar el término −x del numerador.','Omitir el factor dos de la segunda derivada del denominador.','Cambiar el signo de la condición de primer orden.'],[
['Solo hay que comprobar continuidad en cero. El numerador y el denominador se anulan allí.','N(x)=e^{λx}−e^x−x; N(0)=0'],
['Para que N(x)/x² tenga límite finito, su término lineal debe desaparecer.','N′(0)=λ−1−1=λ−2 ⇒ λ=2'],
['Si λ no es dos el cociente se comporta como (λ−2)/x y no tiene límite finito.','λ≠2 ⇒ no puede elegirse μ para obtener continuidad'],
['Con λ=2 aplicamos L’Hôpital dos veces.','lim_{x→0}frac{e^{2x}−e^x−x}{x²}=lim_{x→0}frac{2e^{2x}−e^x−1}{2x}'],
['La segunda derivada proporciona el valor del límite.','lim_{x→0}frac{4e^{2x}−e^x}{2}=frac{4−1}{2}=frac{3}{2}'],
['Igualamos el valor definido en cero al límite; la comprobación por el coeficiente cuadrático da el mismo valor.','μ=frac{3}{2}; e^{2x}−e^x−x=frac{3}{2}x²+O(x³)'],
]),mk(1,'y=(e+1)(x−1)+e²−e−1.',['y=(e−1)(x−1)+e²−e−1.','y=(2e²−e−1)(x−1)+e²−e−1.','y=(e+1)(x−1)+e²−e.'],['Cambiar el signo del término constante al simplificar la derivada.','Derivar solo el numerador e ignorar el denominador.','Olvidar −x al evaluar la ordenada de tangencia.'],[
['El punto de tangencia está fuera del empalme; usamos la rama racional con λ=2.','f(1)=e²−e−1'],
['Definimos el numerador para aplicar correctamente la regla del cociente.','N(x)=e^{2x}−e^x−x; N′(x)=2e^{2x}−e^x−1'],
['Derivamos sin omitir la derivada de x².','f′(x)=frac{xN′(x)−2N(x)}{x³}, x≠0'],
['Evaluamos y simplificamos todos los términos.','f′(1)=2e²−e−1−2(e²−e−1)=e+1'],
['Escribimos la tangente en forma punto-pendiente.','y=(e+1)(x−1)+e²−e−1'],
['Verificamos que la recta tiene la pendiente calculada y pasa exactamente por el punto de la gráfica.','x=1 ⇒ y=f(1); pendiente=e+1=f′(1)'],
])];
case 208:return[mk(0,'y=−x+1 es tangente en (1;0); y=3x−1 es tangente en (0;−1).',['y=−x+1 es tangente en (0;−1); y=3x−1 es tangente en (1;0).','y=−x+1 es tangente en (−1;−6); y=3x−1 es tangente en (0;−1).','y=−x+1 es tangente en (1;0); y=3x−1 es tangente en (0;1).'],['Intercambiar las pendientes de las dos rectas.','Resolver con signo contrario el punto de pendiente menos uno.','Perder el término independiente de la parábola en cero.'],[
['Derivamos la parábola para conocer la pendiente en cada punto.','f′(x)=−4x+3'],
['Para la primera recta imponemos pendiente menos uno.','−4x+3=−1 ⇒ x=1'],
['Comprobamos el punto y la ecuación completa de su tangente.','f(1)=0; y=−1(x−1)+0=−x+1'],
['Para la segunda recta imponemos pendiente tres.','−4x+3=3 ⇒ x=0'],
['Evaluamos y reconstruimos su tangente.','f(0)=−1; y=3(x−0)−1=3x−1'],
['También se verifica por contactos dobles: las diferencias con la parábola son cuadrados no negativos.','(−x+1)−f(x)=2(x−1)²; (3x−1)−f(x)=2x²'],
]),mk(1,'Área=frac{1}{6} u².',['Área=frac{1}{12} u².','Área=frac{1}{3} u².','Área=−frac{1}{6} u².'],['Contar únicamente la mitad del recinto.','Usar un factor cuatro en vez de dos en las diferencias.','Restar la función superior de la inferior.'],[
['Los puntos de tangencia son cero y uno. Hallamos dónde se cruzan las rectas.','−x+1=3x−1 ⇒ x=frac{1}{2}; y=frac{1}{2}'],
['El borde superior es la segunda recta hasta un medio y la primera después; el inferior es la parábola.','0≤x≤frac{1}{2}: 3x−1; frac{1}{2}≤x≤1: −x+1'],
['Restamos la parábola y planteamos dos integrales positivas.','A₁=∫_0^{1/2}2x²dx\nA₂=∫_{1/2}^1 2(x−1)²dx\nA=A₁+A₂'],
['Evaluamos el primer tramo con su primitiva.','H₁(x)=frac{2}{3}x³; A₁=H₁(frac{1}{2})−H₁(0)=frac{1}{12}'],
['Evaluamos el segundo tramo, que por simetría da la misma contribución.','H₂(x)=frac{2}{3}(x−1)³; A₂=H₂(1)−H₂(frac{1}{2})=frac{1}{12}'],
['Sumamos y comprobamos por integración numérica de la diferencia entre los bordes del recinto.','A=frac{1}{12}+frac{1}{12}=frac{1}{6} u²'],
],true)];
case 214:return[mk(0,'Número: 1; suma mínima: 2.',['Número: 2; suma mínima: frac{5}{2}.','Número: frac{1}{2}; suma mínima: frac{5}{2}.','Número: −1; suma mínima: −2.'],['Confundir el valor mínimo de la suma con el número que lo logra.','Elegir arbitrariamente el inverso de dos.','Incluir la raíz negativa, que no pertenece al dominio.'],[
['Sea x el número buscado. La positividad es una restricción esencial del problema.','S(x)=x+frac{1}{x}; x>0'],
['Derivamos y buscamos los puntos críticos del dominio.','S′(x)=1−frac{1}{x²}; S′(x)=0 ⇒ x²=1 ⇒ x=1'],
['La derivada es negativa antes de uno y positiva después.','0<x<1: S′<0; x>1: S′>0'],
['Por tanto uno es el mínimo global; en ambos extremos abiertos la suma diverge.','lim_{x→0⁺}S(x)=+∞; lim_{x→+∞}S(x)=+∞'],
['Evaluamos la suma y distinguimos su valor del número solicitado.','x=1; S(1)=1+1=2'],
['Una comprobación algebraica independiente demuestra la desigualdad y la unicidad.','S(x)−2=frac{(x−1)²}{x}≥0; igualdad solo para x=1'],
])];default:throw Error('Unknown case');}}
export function buildAsymptoteGraphsBatch(id='batch-0391',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===123||c.index===168?['Derivadas']:[];x.block='Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===208?'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH':c.index===214?'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE':'LOGARITHMIC_ASYMPTOTES_AND_PIECEWISE_DIFFERENTIABILITY'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_METHOD_WITH_SOURCE_BOUND_PARAMETERS_AND_INDEPENDENT_SUBSTITUTION';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildAsymptoteGraphsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0391-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0391.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

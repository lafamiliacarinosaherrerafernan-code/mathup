import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[49,'915e3de08a67887ee286773fac80c8a3a54dc62f3ddee5b1bd715b9b25069857',1,'A.3','a1ce6690ffcda83e92771b44715a873f91078fee47f22b2106c7d027acefeef2',0],
[61,'05fb83365c2d5a2e7fded533162b7b70e6837c2ac376874d949f0ea14651cde3',2,'B.2','7612f594bb614edf46a8bb3ddf5eae718358fa5ee5631f19f122de8838eea85c',0],
[66,'56a7eeb2e214c74b9aeb92347d4b6f860225bb0221675c04e5335a48a645bb74',2,'B.2','11698abf4f994fb1982eb63f6f9f0230a4fc4f4c2a4eeb7bdb8ebf5af0cb7811',0],
[105,'05f1dff88f530745b48de59f61e175687ca608ba013b8bf049b0c31f90301299',1,'A.4','df67feecd79fbe4ee98464a3f846a284b96bb1f26dd37fda6e41a2c4caddca88',0],
[130,'c32c32963d82d1ee57ab88a8a21a2a7b9559da905b42ecb11e094d10d95ce9e2',1,'A.2','afbeb66b96337ef1f3553601b5f7c8950cc0d751b8765f0fc24ea6766f646db8',0],
[134,'3bd9605e8f19071b210561d6f59ee83139cc5e20f4ffa7e29a17fa4f08d1752a',1,'A.2','bbcc24ea3631b7e20e21c647aa444b37871b501e7bf119234c1f98c7dcd32b80',0],
];
export const statements={
49:'Considera la función f:(0;+∞)→ℝ definida por f(x)=(ln(x))² (ln denota la función logaritmo neperiano).\na) Determina los intervalos de crecimiento y de decrecimiento de f, así como sus extremos relativos (abscisas donde se obtienen y valores que se alcanzan). (1 punto)\nb) Calcula el área de la región limitada por la gráfica de la función f y las rectas y=0, x=1, x=e. (1,5 puntos)',
61:'Se sabe que la función f:[0;+∞)→ℝ dada por f(x)=piecewise{√(ax) si 0≤x≤8;frac{x²−32}{x−4} si x>8} es continua.\na) [0,5 puntos] Determina a.\nb) [2 puntos] Para a=8, calcula ∫_0^{10}f(x)dx.',
66:'Considera la función f:ℝ→ℝ definida por f(x)=x|2−x|.\na) [1 punto] Esboza su gráfica.\nb) [1,5 puntos] Calcula el área del recinto limitado por la gráfica de f, el eje de abscisas y la recta de ecuación x=3.',
105:'Considera las funciones f,g:ℝ→ℝ definidas por f(x)=x³+2 y g(x)=−x²+2x+2.\na) Calcula los puntos de corte de las gráficas de f y g. Esboza sus gráficas. (1,25 puntos)\nb) Determina el área del recinto limitado por las gráficas de f y g en el primer cuadrante. (1,25 puntos)',
130:'Sea f:ℝ→ℝ la función definida por f(x)=x³−4x.\na) [0,75 puntos] Halla la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=1.\nb) [0,75 puntos] Esboza el recinto limitado por la gráfica de f y la recta y=−x−2, determinando los puntos de corte de ambas gráficas.\nc) [1 punto] Calcula el área del recinto anterior.',
134:'[2,5 puntos] Dado un número real a>0, considera la función f:ℝ→ℝ, dada por f(x)=x²−ax, y la recta y=2ax. Determina a sabiendo que el área del recinto limitado por la gráfica de f y la recta anterior es 36.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_SOURCE_AREAS_LAYOUT']]:[];
export const cases=[{index:49,literals:['ln (x)','x = e']},{index:61,literals:['es continua','Para a = 8']},{index:66,literals:['x|2 − x|','x = 3']},{index:105,literals:['x3 + 2','primer cuadrante']},{index:130,literals:['x3 − 4x','y = −x − 2']},{index:134,literals:['a > 0','36.'],whole:true}];
export const curves={49:[x=>Math.log(x)**2,x=>0],66:[x=>x*Math.abs(2-x),x=>0],105:[x=>x**3+2,x=>-x*x+2*x+2],130:[x=>x**3-4*x,x=>-x-2],134:[x=>x*x-2*x,x=>4*x],813:[x=>x*x-2*x,x=>-x*x+4*x],842:[x=>-x*x+3*x,x=>x],874:[x=>4-x*x/3,x=>x*x/6-2],876:[x=>5-x,x=>4/x],898:[x=>x*Math.exp(3*x),x=>0],902:[x=>Math.sqrt(Math.max(0,5-x*x)),x=>0],920:[x=>x<0?2*x+4:(x-2)**2,x=>0],925:[x=>Math.min(4*x,8-4*x),x=>2*x-x*x]};
curves[936]=[x=>x*(x-2)*(x-4),x=>0];
export const graphs=Object.fromEntries([
[49,[.2,3.2],[-.2,3],[1,Math.E],['f(x)=(ln x)²','Eje horizontal; recinto entre x=1 y x=e'],[[1,0],[Math.E,1]]],
[66,[-.7,3.4],[-2,5],[0,3],['f(x)=x|2−x|','Recinto sombreado entre x=0 y x=3'],[[0,0],[1,1],[2,0],[3,3]]],
[105,[-2.5,1.7],[-10,8],[0,1],['f(x)=x³+2','g(x)=−x²+2x+2; recinto del primer cuadrante'],[[-2,-6],[0,2],[1,3]]],
[130,[-2.4,1.7],[-6,5],[-2,1],['f(x)=x³−4x','g(x)=−x−2; contacto tangente en (1;−3)'],[[-2,0],[1,-3]]],
[134,[-.5,6.5],[-3,30],[0,6],['f(x)=x²−2x; valor obtenido a=2','g(x)=4x; área sombreada igual a 36'],[[0,0],[6,24]]],
[813,[-.6,3.6],[-2.5,6],[0,3],['f(x)=x²−2x; vértice (1;−1)','g(x)=−x²+4x; vértice (2;4); recinto 0≤x≤3'],[[0,0],[3,3],[1,-1],[2,4]]],
[842,[-.5,3.5],[-2,4],[0,2],['f(x)=−x²+3x; valor obtenido a=3','g(x)=x; área sombreada igual a 4/3'],[[0,0],[2,2],[1.5,2.25]]],
[874,[-4,4],[-3,5],[-Math.sqrt(12),Math.sqrt(12)],['f(x)=4−x²/3; rectángulo óptimo: base 4 y altura 4','g(x)=x²/6−2; los cuatro vértices están sobre las curvas'],[[-2,8/3],[2,8/3],[-2,-4/3],[2,-4/3]]],
[876,[.4,5],[-.5,7],[1,4],['f(x)=5−x; cortes (1;4) y (4;1)','g(x)=4/x; rama positiva y recinto cerrado'],[[1,4],[4,1]]],
[898,[-.1,.55],[-.2,3],[0,1/3],['f(x)=xe³ˣ; recta vertical x=1/3','Recinto sombreado entre la curva y el eje horizontal'],[[0,0],[1/3,Math.E/3]]],
[902,[-Math.sqrt(5),Math.sqrt(5)],[-.2,2.6],[-Math.sqrt(5),Math.sqrt(5)],['Semicircunferencia de radio √5; vértices superiores (±2;1)','Rectángulo óptimo: base 4 cm, altura 1 cm, perímetro 10 cm'],[[-2,1],[2,1],[0,Math.sqrt(5)]]],
[920,[-3,4],[-2.5,6],[-2,2],['f(x)=2x+4 para x<0; f(x)=(x−2)² para x≥0','Unión continua en (0;4), esquina; recinto sombreado entre −2 y 2'],[[-2,0],[0,4],[2,0]]],
[925,[-.3,2.3],[-.7,4.8],[0,2],['Frontera superior: y=4x hasta x=1; después y=8−4x','Frontera inferior: y=2x−x²; recinto del primer cuadrante'],[[0,0],[1,4],[2,0],[1,1]]],
[936,[-.4,4.4],[-5,5],[0,4],['f(x)=x³−6x²+8x; raíces 0, 2 y 4','Dos recintos de igual área, uno sobre el eje horizontal y otro debajo'],[[0,0],[2,0],[4,0],[2-2/Math.sqrt(3),16/(3*Math.sqrt(3))],[2+2/Math.sqrt(3),-16/(3*Math.sqrt(3))]]],
].map(([index,xRange,yRange,area,labels,points])=>[index,{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-source-areas-v1',index,xRange,yRange,area,labels,points}]));
graphs[874].rectangle={left:-2,right:2,bottom:-4/3,top:8/3};
graphs[902].rectangle={left:-2,right:2,bottom:0,top:1};
export function renderSourceAreaGraph(g){assert.deepEqual(g,graphs[g.index]);const W=760,H=440,L=70,R=30,T=30,B=100,[xmin,xmax]=g.xRange,[ymin,ymax]=g.yRange,[f,h]=curves[g.index];
const X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,points=(fn,a,b)=>Array.from({length:601},(_,i)=>{const x=a+(b-a)*i/600;return pt(x,fn(x));}).join(' '),clip=`area-${g.index}`,xml=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Curvas oficiales y recinto de integración"><rect width="760" height="440" fill="white"/><defs><clipPath id="${clip}"><rect x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}"/></clipPath></defs>`;
for(let i=0;i<=5;i++){const x=xmin+(xmax-xmin)*i/5,y=ymin+(ymax-ymin)*i/5;s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)} M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e2e7ed"/><text x="${X(x)}" y="${H-B+22}" text-anchor="middle" font-size="14">${Number(x.toFixed(2))}</text><text x="${L-10}" y="${Y(y)+4}" text-anchor="end" font-size="14">${Number(y.toFixed(2))}</text>`;}
s+=`<g clip-path="url(#${clip})"><polygon points="${points(f,...g.area)} ${points(h,g.area[1],g.area[0])}" fill="#c7e8ef"/><path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/>`;
for(const[fn,color]of[[f,'#075597'],[h,'#a52d3c']])s+=`<polyline points="${points(fn,xmin,xmax)}" fill="none" stroke="${color}" stroke-width="3"/>`;
if(g.rectangle){const r=g.rectangle;s+=`<rect data-role="optimal-inscribed-rectangle" x="${X(r.left)}" y="${Y(r.top)}" width="${X(r.right)-X(r.left)}" height="${Y(r.bottom)-Y(r.top)}" fill="#e5b933" fill-opacity=".24" stroke="#775400" stroke-width="3"/>`;}
for(const p of g.points)s+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="4" fill="#202c40"/>`;
s+='</g>';g.labels.forEach((label,i)=>s+=`<text x="70" y="${H-48+25*i}" fill="${i?'#a52d3c':'#075597'}" font-size="17">${xml(label)}</text>`);return s+'</svg>';}
export const proof=c=>c.index===49?{derivative:'2ln(x)/x',minimum:[1,0],area:Math.E-2}:c.index===61?{parameter:8,join:8,firstIntegral:128/3,secondIntegral:26-16*Math.log(1.5),total:206/3-16*Math.log(1.5)}:c.index===66?{maximum:[1,1],minimum:[2,0],joinSlopes:[-2,2],partialAreas:[4/3,4/3],area:8/3}:c.index===105?{intersections:[[-2,-6],[0,2],[1,3]],area:5/12}:c.index===130?{slope:-1,tangentIntercept:-2,intersections:[[-2,0],[1,-3]],area:27/4}:{parameter:2,areaCoefficient:9/2,area:36,intersections:[[0,0],[6,24]]};
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),mk=(i,a,d,e,s,graph=false)=>{const p=part(ps[i],a,d,e,s,'DERIVATIVE_SIGN_AND_INDEPENDENT_AREA_QUADRATURE',proof(c));if(graph)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 49:return[mk(0,'Decrece en (0;1), crece en (1;+∞); mínimo relativo y absoluto (1;0).',['Crece en (0;1), decrece en (1;+∞); máximo relativo (1;0).','Decrece en (0;e), crece en (e;+∞); mínimo relativo (e;1).','Crece en (0;+∞); no tiene extremos relativos.'],['Invertir el signo de la derivada.','Resolver ln(x)=1 en vez de ln(x)=0.','Olvidar que el logaritmo es negativo entre cero y uno.'],[
['El dominio oficial excluye cero y los números negativos. Derivamos por la regla de la cadena.','f′(x)=frac{2ln(x)}{x}, x>0'],
['El denominador es positivo; los puntos críticos dependen del numerador.','ln(x)=0 ⇔ x=1'],
['El logaritmo cambia de negativo a positivo en uno.','0<x<1 ⇒ f′<0; x>1 ⇒ f′>0'],
['Traducimos el signo de la derivada en monotonía.','Decrece en (0;1); crece en (1;+∞)'],
['El cambio de decrecimiento a crecimiento demuestra un mínimo; evaluamos su ordenada.','f(1)=(ln(1))²=0'],
['La expresión es un cuadrado y nunca es negativa, por lo que el mínimo también es absoluto. No hay otros puntos críticos.','f(x)≥0; mínimo (1;0); no hay máximos relativos'],
]),mk(1,'Área=(e−2) u².',['Área=e u².','Área=(2−e) u².','Área=(3e−2) u².'],['Omitir el valor de la primitiva en el extremo inferior.','Invertir el orden de la regla de Barrow.','Omitir el término −2xln(x) de la primitiva.'],[
['En el intervalo indicado el cuadrado del logaritmo es no negativo. El área coincide con la integral.','A=∫_1^e (ln(x))²dx'],
['Integramos por partes, derivando el logaritmo y tomando como primitiva de uno la variable.','u=(ln(x))²; dv=dx; du=frac{2ln(x)}{x}dx; v=x'],
['Sustituimos en la fórmula de integración por partes.','∫(ln(x))²dx=x(ln(x))²−2∫ln(x)dx'],
['Una segunda integración por partes proporciona la integral del logaritmo.','∫ln(x)dx=xln(x)−x+C'],
['Construimos la primitiva y verificamos su derivada.','H(x)=x(ln(x))²−2xln(x)+2x; H′(x)=(ln(x))²'],
['Evaluamos ambos extremos sin omitir el inferior, que no vale cero.','H(e)=e; H(1)=2 ⇒ A=e−2>0'],
],true)];
case 61:return[mk(0,'a=8.',['a=1.','a=64.','a=−8.'],['Omitir el cuadrado del segundo miembro al quitar la raíz.','No dividir por ocho después de elevar al cuadrado.','Introducir una raíz negativa incompatible con el radicando.'],[
['Para que la primera rama sea real en todo su intervalo se necesita a no negativo. Las ramas son continuas en sus respectivos tramos.','a≥0; 0≤x≤8; x−4≠0 cuando x>8'],
['El único empalme que debemos comprobar es x=8.','f(8)=√(8a)'],
['Calculamos el límite derecho usando la rama racional.','lim_{x→8⁺}f(x)=frac{64−32}{8−4}=8'],
['La continuidad exige que ambos valores coincidan.','√(8a)=8'],
['Los dos miembros son no negativos; podemos elevar al cuadrado sin introducir soluciones espurias.','8a=64 ⇒ a=8'],
['Sustituimos para verificar la igualdad original y la condición de dominio.','√(8·8)=8; a=8≥0'],
]),mk(1,'Integral=frac{206}{3}−16ln(frac{3}{2}).',['Integral=frac{206}{3}+16ln(frac{3}{2}).','Integral=26−16ln(frac{3}{2}).','Integral=frac{206}{3}−16ln(frac{5}{4}).'],['Cambiar el signo del resto en la división polinómica.','Omitir el tramo de cero a ocho.','Usar ln(x) en lugar de ln(x−4).'],[
['Con a=8 dividimos la integral en el punto donde cambia la fórmula.','I=∫_0^8 √(8x)dx+∫_8^{10}frac{x²−32}{x−4}dx'],
['Integramos la raíz como potencia y evaluamos el primer tramo.','H₁(x)=frac{4√2}{3}x^{3/2}; I₁=H₁(8)−H₁(0)=frac{128}{3}'],
['Dividimos el numerador de la segunda rama por su denominador.','x²−32=(x−4)(x+4)−16 ⇒ frac{x²−32}{x−4}=x+4−frac{16}{x−4}'],
['Como x−4 es positivo en ese intervalo, una primitiva usa el logaritmo sin valor absoluto.','H(x)=frac{x²}{2}+4x−16ln(x−4)'],
['Aplicamos Barrow al segundo tramo, conservando el cociente correcto dentro del logaritmo.','I₂=H(10)−H(8)=26−16ln(frac{6}{4})'],
['Sumamos las dos contribuciones y comprobamos por derivación ambas primitivas en sus dominios.','I=frac{128}{3}+26−16ln(frac{3}{2})=frac{206}{3}−16ln(frac{3}{2}); H′(x)=frac{x²−32}{x−4}'],
])];
case 66:return[mk(0,'Máximo relativo (1;1), mínimo angular (2;0); cortes (0;0) y (2;0).',['Mínimo relativo (1;1), máximo angular (2;0); cortes (0;0) y (2;0).','Máximo relativo (1;1), unión suave (2;0); cortes (0;0) y (2;0).','Máximo relativo (−1;1), mínimo angular (−2;0); cortes (0;0) y (−2;0).'],['Invertir los signos de crecimiento de las ramas.','Suponer derivabilidad solo porque los valores coinciden.','Cambiar el signo en 2−x al retirar el valor absoluto.'],[
['Retiramos el valor absoluto distinguiendo su signo, no el signo de x.','f(x)=piecewise{2x−x² si x≤2;x²−2x si x≥2}'],
['Calculamos los cortes con el eje horizontal y comprobamos el valor común en la unión.','f(x)=0 ⇒ x=0 o x=2; f(2)=0'],
['La rama izquierda es una parábola abierta hacia abajo, con vértice dentro de su tramo.','2x−x²=1−(x−1)²; máximo relativo (1;1)'],
['La rama derecha es la parte de otra parábola a partir de dos y es creciente en todo ese tramo.','f′(x)=2x−2>0 para x>2'],
['Las pendientes laterales en dos son distintas, con cambio de negativo a positivo.','f′(2⁻)=−2; f′(2⁺)=2 ⇒ mínimo angular (2;0)'],
['El esbozo adjunto conserva las dos ramas, los cortes y el punto (3;3).','Crece en (−∞;1) y (2;+∞); decrece en (1;2); f(3)=3'],
],true),mk(1,'Área=frac{8}{3} u².',['Área=frac{4}{3} u².','Área=0 u².','Área=−frac{8}{3} u².'],['Contar solo uno de los dos tramos del recinto.','Integrar sin retirar correctamente el valor absoluto y cancelar contribuciones.','Cambiar la orientación de ambas integrales.'],[
['La gráfica es no negativa entre cero y tres y cambia de expresión en dos.','f(x)≥0 en [0;3]'],
['Sumamos las áreas de los dos tramos que quedan entre la gráfica y el eje hasta la recta x=3.','A₁=∫_0^2(2x−x²)dx\nA₂=∫_2^3(x²−2x)dx\nA=A₁+A₂'],
['Integramos el primer polinomio y evaluamos sus extremos.','H₁(x)=x²−frac{x³}{3}; A₁=H₁(2)−H₁(0)=4−frac{8}{3}=frac{4}{3}'],
['Integramos el segundo polinomio, restando su valor en dos.','H₂(x)=frac{x³}{3}−x²; A₂=H₂(3)−H₂(2)=0−(frac{8}{3}−4)=frac{4}{3}'],
['Sumamos cantidades positivas, pues un área no debe cancelarse por una elección de fórmula.','A=frac{4}{3}+frac{4}{3}=frac{8}{3} u²'],
['Las derivadas de ambas primitivas recuperan exactamente las ramas originales; la gráfica muestra el recinto completo.','(x²−frac{x³}{3})′=2x−x²; (frac{x³}{3}−x²)′=x²−2x'],
],true)];
case 105:return[mk(0,'Cortes (−2;−6), (0;2) y (1;3).',['Cortes (2;10), (0;2) y (−1;1).','Cortes (−2;−2), (0;2) y (1;1).','Cortes (−2;−6) y (1;3); no hay corte en x=0.'],['Cambiar signos al factorizar el polinomio de intersección.','Sustituir las abscisas en una fórmula distinta de la oficial.','Dividir por x y perder la solución cero.'],[
['Igualamos las funciones y trasladamos todos los términos al mismo miembro.','x³+2=−x²+2x+2 ⇒ x³+x²−2x=0'],
['Factorizamos sin dividir por una expresión que podría anularse.','x(x²+x−2)=x(x+2)(x−1)=0'],
['Obtenemos las tres abscisas y calculamos sus ordenadas.','x=−2,0,1; f(−2)=−6; f(0)=2; f(1)=3'],
['La cúbica es creciente y tiene inflexión horizontal en el eje vertical.','f′=3x²≥0; f″=6x; inflexión (0;2)'],
['La segunda curva es una parábola abierta hacia abajo con vértice (1;3).','g(x)=3−(x−1)²; g′=2−2x'],
['La figura adjunta representa ambas curvas; verificamos las ordenadas también en g.','g(−2)=−6; g(0)=2; g(1)=3'],
],true),mk(1,'Área=frac{5}{12} u².',['Área=frac{11}{12} u².','Área=frac{3}{4} u².','Área=−frac{5}{12} u².'],['Cambiar el signo de la integral cúbica.','Omitir el término cuadrático al integrar.','Restar la curva superior de la inferior.'],[
['En el primer cuadrante el recinto acotado se encuentra entre las intersecciones de abscisas cero y uno.','0≤x≤1; f(x)≥2; g(x)≥2'],
['Determinamos cuál curva queda encima usando la diferencia factorizada.','g(x)−f(x)=−x(x+2)(x−1)=x(x+2)(1−x)≥0'],
['Planteamos el área como la integral de superior menos inferior.','A=∫_0^1(−x³−x²+2x)dx'],
['Integramos cada potencia con su signo.','H(x)=−frac{x⁴}{4}−frac{x³}{3}+x²'],
['Evaluamos la primitiva en ambos extremos.','A=H(1)−H(0)=−frac{1}{4}−frac{1}{3}+1=frac{5}{12}'],
['La derivada de H coincide con la diferencia de curvas; el resultado es positivo y se verifica por cuadratura independiente.','H′(x)=g(x)−f(x); A≈0,416667 u²'],
],true)];
case 130:return[mk(0,'Tangente: y=−x−2.',['Tangente: y=x−4.','Tangente: y=−x−3.','Tangente: y=−3x.'],['Cambiar el signo de la pendiente.','Confundir la ordenada del punto con la ordenada en el origen.','Usar f(1) como pendiente.'],[
['Calculamos el punto de tangencia con la función original.','f(1)=1−4=−3 ⇒ P=(1;−3)'],
['Derivamos para hallar la pendiente, no el valor de la función.','f′(x)=3x²−4'],
['Evaluamos la derivada en la abscisa indicada.','m=f′(1)=3−4=−1'],
['Usamos la ecuación punto-pendiente.','y−(−3)=−1(x−1)'],
['Simplificamos conservando los signos al distribuir.','y+3=−x+1 ⇒ y=−x−2'],
['Comprobamos que la recta pasa por el punto y tiene la pendiente correcta.','−1−2=−3=f(1); pendiente=−1=f′(1)'],
]),mk(1,'Cortes (−2;0) y (1;−3); tangencia en (1;−3), cúbica por encima en el recinto.',['Cortes (2;0) y (−1;−3); tangencia en (−1;−3).','Cortes (−2;0) y (1;−3); recta por encima en el recinto.','Cortes (−2;0) y (1;3); tangencia en (1;3).'],['Cambiar los signos de las raíces de la factorización.','Invertir el signo de la diferencia entre las curvas.','Cambiar el signo de la ordenada de tangencia.'],[
['Igualamos la función cúbica a la recta del enunciado.','x³−4x=−x−2 ⇒ x³−3x+2=0'],
['Factorizamos el polinomio; la raíz doble refleja la tangencia.','x³−3x+2=(x−1)²(x+2)'],
['Hallamos las abscisas distintas y sus ordenadas en la recta.','x=−2 ⇒ y=0; x=1 ⇒ y=−3'],
['Entre las intersecciones el cuadrado es no negativo y x+2 es positivo.','−2<x<1 ⇒ f(x)−(−x−2)>0'],
['Para el esbozo situamos además los extremos de la cúbica y su inflexión.','f′=3x²−4 ⇒ x=±frac{2}{√3}; f″=6x ⇒ inflexión en (0;0)'],
['La figura adjunta sombrea el único recinto y muestra el contacto sin cruce en uno.','f(1)=−3; f′(1)=−1, igual a la pendiente de la recta'],
],true),mk(2,'Área=frac{27}{4} u².',['Área=frac{3}{4} u².','Área=frac{27}{2} u².','Área=−frac{27}{4} u².'],['Omitir la contribución del término constante de la diferencia.','Duplicar el recinto por una simetría inexistente.','Invertir el orden de las curvas.'],[
['El apartado anterior muestra la cúbica por encima de la recta entre menos dos y uno.','A=∫_{−2}^1(f(x)−(−x−2))dx'],
['Simplificamos la diferencia antes de integrar.','f(x)−(−x−2)=x³−3x+2'],
['Integramos cada término y conservamos el término constante.','H(x)=frac{x⁴}{4}−frac{3x²}{2}+2x'],
['Evaluamos con cuidado el extremo negativo.','H(1)=frac{3}{4}; H(−2)=4−6−4=−6'],
['Restamos el valor inferior completo.','A=frac{3}{4}−(−6)=frac{27}{4} u²'],
['La derivación y la cuadratura independiente comprueban la misma área positiva.','H′(x)=x³−3x+2; A=6,75 u²'],
],true)];
case 134:return[mk(0,'a=2.',['a=8.','a=root{3}{24}.','a=−2.'],['Olvidar que el parámetro aparece elevado al cubo.','Perder un factor tres al evaluar el extremo superior.','Ignorar la condición a positivo.'],[
['Igualamos la parábola y la recta para hallar los límites en función del parámetro.','x²−ax=2ax ⇒ x(x−3a)=0 ⇒ x=0 o x=3a'],
['Como a es positivo, los extremos están ordenados. En su interior la recta queda por encima.','0<x<3a ⇒ 2ax−(x²−ax)=x(3a−x)>0'],
['Integramos la diferencia para obtener el área dependiente de a.','A(a)=∫_0^{3a}(3ax−x²)dx'],
['Evaluamos la primitiva sin perder las potencias del parámetro.','H(x)=frac{3a}{2}x²−frac{x³}{3}; A(a)=H(3a)−H(0)=frac{27a³}{2}−9a³=frac{9a³}{2}'],
['Imponemos el área oficial y resolvemos la ecuación cúbica real.','frac{9a³}{2}=36 ⇒ a³=8 ⇒ a=2>0'],
['Comprobamos con el parámetro obtenido: los cortes son cero y seis y la figura representa esa región.','A(2)=∫_0^6(6x−x²)dx=108−72=36'],
],true)];default:throw Error('Unknown');}}
export function buildSourceAreasBatch(id='batch-0387',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic='Integrales definidas y áreas';x.secondaryTopics=['Derivadas'];x.block='Análisis';x.examSlot=3;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SIGN_ANALYSIS_INTEGRALS_AND_DERIVED_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSourceAreasBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0387-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0387.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

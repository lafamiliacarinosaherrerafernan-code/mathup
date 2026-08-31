// Individually solved official exercises; page projections preserve the original evidence.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[52,'c1053dad9ef9e6ce58aeea7d171758b8b6aec6014f2dfbec91a9ace85f5136e5',2,'B.1','e5f32094bf11f28fa052bdcb95e5ac3ca93f5be474c7362f7e8f44e25f3638ef',0],
[71,'8948619c3f97deb0787e449297cc3904949ef86c8469df859e9d23c5636a08fb',1,'A.2','2c46b6e7b8a0600129ec2c3c68a3c34b748d5c027fe8496406709640622f79cf',0],
[81,'9a4a3ac92abc26f1ca18a7fc0bcf40c3075f1d1ab90ae5d116c8e4c81bdf4104',1,'4','6d096cc13c8881cd748926d1f179d72efb74a76aafba42ee4ac22588989bfe99',0],
[83,'85f493d821b1af6654edb4d55c3218802ea3170138b86a4a1f7224d212d397f9',2,'B.1','9ca3a3f15095d8f6027630e9f1a6f9e01af09998b2a842149e9027ce3c29abaf',0],
[90,'54d3d099a9d525046a68be3b9854c72445eb0b8d72ffb70d5a31ddd2ef6c04dc',1,'A.1','1225eb28afeb0d1e42cda28bd2b3041c1f32efa186eb590638832573512a019e',0],
[99,'e5a1aa84a94cdee287b46fb8413656f21751c536506f9cdb94ff2e89e874862f',2,'B.2','8ee23d341cf494c803b0474bf7c2ce2bc8a04e391112230682a3593502ea9e12',0],
[104,'85f493d821b1af6654edb4d55c3218802ea3170138b86a4a1f7224d212d397f9',1,'A.1','6a853d819da7c9a925b59a0da6d2b0e5153d4defdfde4be8a16fe8a78f1f7a68',0],
[106,'9a4a3ac92abc26f1ca18a7fc0bcf40c3075f1d1ab90ae5d116c8e4c81bdf4104',1,'3','6d096cc13c8881cd748926d1f179d72efb74a76aafba42ee4ac22588989bfe99',0],
[110,'05fb83365c2d5a2e7fded533162b7b70e6837c2ac376874d949f0ea14651cde3',2,'B.1','7612f594bb614edf46a8bb3ddf5eae718358fa5ee5631f19f122de8838eea85c',0],
];
export const statements={
52:'[2,5 puntos] Sea f:[1;+∞)→ℝ la función definida por f(x)=√(x−1). Determina el punto P de la gráfica de f que se encuentra a menor distancia del punto A(2;0). ¿Cuál es esa distancia?',
71:'a) [2 puntos] Determina la función f:ℝ→ℝ tal que f′(x)=(2x+1)e^{−x} y su gráfica pasa por el origen de coordenadas.\nb) [0,5 puntos] Calcula la recta tangente a la gráfica de f en el punto de abscisa x=0.',
81:'Considera la función f definida por f(x)=frac{x²+1}{x²−1} (para x≠−1, x≠1). Halla una primitiva de f cuya gráfica pase por el punto (2;4).',
83:'[2,5 puntos] Se sabe que la gráfica de la función f:ℝ→ℝ, dada por f(x)=2x³+ax²+bx+c, tiene un punto de inflexión para x=1 y que la ecuación de la recta tangente a dicha gráfica en ese punto es y=−6x+6. Calcula a, b y c.',
90:'Sea la función f:(0;+∞)→ℝ definida por f(x)=frac{1}{x}+ln(x) donde ln denota la función logaritmo neperiano.\na) [1,75 puntos] Halla los extremos absolutos de f (abscisas donde se obtienen y valores que se alcanzan) en el intervalo [frac{1}{e};e].\nb) [0,75 puntos] Determina la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=e.',
99:'[2,5 puntos] Calcula ∫ e^{2x} sen(x) dx.',
104:'Se considera la función f:(−2π;2π)→ℝ definida por f(x)=frac{cos(x)}{2+cos(x)}.\na) [1,5 puntos] Calcula sus intervalos de crecimiento y de decrecimiento.\nb) [1 punto] Halla sus máximos y mínimos relativos (abscisas en los que se obtienen y valores que se alcanzan).',
106:'Considera la función f:ℝ→ℝ definida por f(x)=1+∫_0^x t e^t dt. Determina los intervalos de concavidad y de convexidad de f y sus puntos de inflexión (abscisas donde se obtienen y valores que se alcanzan).',
110:'[2,5 puntos] Se desea construir una caja sin tapadera de base cuadrada. El precio del material es de 18 euros/m² para los laterales y de 24 euros/m² para la base. Halla las dimensiones de la caja de mayor volumen que se puede construir si disponemos de 50 euros.',
};
export const cases=[
{index:52,literals:['A(2, 0)','distancia'],topic:'Derivadas',whole:true},
{index:71,literals:['(2x + 1)','origen de coordenadas'],topic:'Integrales indefinidas'},
{index:81,literals:['x2 + 1','(2, 4)'],topic:'Integrales indefinidas',whole:true},
{index:83,literals:['2x3 + ax2 + bx + c','−6x + 6'],topic:'Derivadas',whole:true},
{index:90,literals:['logaritmo neperiano','x = e'],topic:'Derivadas'},
{index:99,literals:['e2x sen (x) dx'],topic:'Integrales indefinidas',whole:true},
{index:104,literals:['2 + cos(x)','crecimiento'],topic:'Derivadas'},
{index:106,literals:['tet dt','convexidad'],topic:'Derivadas',whole:true},
{index:110,literals:['18 euros/m2','24 euros/m2','50 euros'],topic:'Derivadas',whole:true},
];
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_EARLY_CALCULUS_SOURCE_LAYOUT']]:[];
export const derivative=(f,x,h=1e-5)=>(f(x+h)-f(x-h))/(2*h);
const near=(a,b,t=1e-6)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
export const functions={
71:x=>3-(2*x+3)*Math.exp(-x),81:x=>x+Math.log(Math.abs(x-1))-Math.log(Math.abs(x+1))+2+Math.log(3),
90:x=>1/x+Math.log(x),99:x=>Math.exp(2*x)*(2*Math.sin(x)-Math.cos(x))/5,
104:x=>Math.cos(x)/(2+Math.cos(x)),106:x=>(x-1)*Math.exp(x)+2,
};
export function proof(c){const i=c.index;
 if(i===52){const d2=x=>(x-2)**2+x-1;near(d2(1.5),.75);for(let k=0;k<=200;k++)assert.ok(d2(1+k/10)>=.75);return{vertex:[1.5,Math.SQRT1_2],distanceSquared:.75,wrongPoints:[[1,0],[2,1],[1.5,.5]],identity:'d²=(x−3/2)²+3/4'};}
 if(i===71){near(functions[71](0),0);for(const x of [-2,0,.7,2])near(derivative(functions[71],x),(2*x+1)*Math.exp(-x));return{constant:3,tangentSlope:1,sampleDerivativeResiduals:[-2,0,.7,2].map(x=>derivative(functions[71],x)-(2*x+1)*Math.exp(-x))};}
 if(i===81){near(functions[81](2),4);for(const x of [-3,-.5,0,2,3])near(derivative(functions[81],x),(x*x+1)/(x*x-1));return{constant:2+Math.log(3),atTwo:functions[81](2),componentContainingTwo:'(1,+infinity)',otherComponentConstants:'free; displayed expression is one valid choice'};}
 if(i===83){const a=-6,b=0,c0=4;assert.deepEqual([12+2*a,6+2*a+b,2+a+b+c0],[0,-6,0]);return{parameters:[a,b,c0],residuals:[0,0,0],thirdDerivative:12};}
 if(i===90){const x=[1/Math.E,1,Math.E],y=x.map(functions[90]);assert.ok(y[0]>y[2]&&y[2]>y[1]);for(const t of [.5,1,2])near(derivative(functions[90],t),(t-1)/t**2);return{candidates:x.map((t,j)=>[t,y[j]]),slope:(Math.E-1)/Math.E**2,intercept:2/Math.E};}
 if(i===99){for(const x of [-1,0,.5,1,2])near(derivative(functions[99],x),Math.exp(2*x)*Math.sin(x),1e-6);return{sinCoefficient:2/5,cosCoefficient:-1/5,coefficientEquations:[2*(2/5)-(-1/5),2*(-1/5)+2/5],derivativeResiduals:[-1,0,.5,1,2].map(x=>derivative(functions[99],x)-Math.exp(2*x)*Math.sin(x))};}
 if(i===104){const xs=[-1.5*Math.PI,-.5*Math.PI,.5*Math.PI,1.5*Math.PI],d=x=>-2*Math.sin(x)/(2+Math.cos(x))**2;for(const x of xs)near(derivative(functions[104],x),d(x));return{intervalDerivativeSigns:xs.map(x=>Math.sign(d(x))),maximum:[0,1/3],minima:[[-Math.PI,-1],[Math.PI,-1]]};}
 if(i===106){for(const x of [-2,-1,0,1])near(derivative(functions[106],x),x*Math.exp(x));near(functions[106](0),1);return{inflection:[-1,2-2/Math.E],secondDerivativeSigns:[-2,0].map(x=>Math.sign((x+1)*Math.exp(x)))};}
 assert.equal(i,110);const x=5/6,h=5/9,V=x*x*h;near(24*x*x+72*x*h,50);near((50-72*x*x)/72,0);near(V,125/324);return{baseSide:x,height:h,volume:V,cost:50,volumeDerivative:'(50−72x²)/72',domain:[0,Math.sqrt(50/24)]};
}
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]);const ev=proof(c),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'ANALYTIC_CALCULUS_AND_INDEPENDENT_DERIVATIVE_OR_CONSTRAINT_CHECK',ev);
 switch(c.index){
 case 52:return[mk(0,'P(frac{3}{2};frac{√(2)}{2}); distancia frac{√(3)}{2}.',['P(1;0); distancia 1.','P(2;1); distancia 1.','P(frac{3}{2};frac{√(2)}{2}); distancia frac{3}{4}.'],['Elegir únicamente el extremo del dominio.','Minimizar solo la separación horizontal.','Confundir la distancia con su cuadrado.'],[
 ['Un punto de la gráfica tiene coordenadas dependientes de una sola variable.','P=(x;√(x−1)); x≥1'],
 ['Aplicamos la distancia euclídea al punto oficial A.','d(x)=√((x−2)²+(√(x−1))²)'],
 ['La raíz cuadrada es creciente: minimizar la distancia equivale a minimizar su cuadrado.','D(x)=d(x)²=(x−2)²+x−1=x²−3x+3'],
 ['Derivamos la función objetivo y buscamos los candidatos interiores.','D′(x)=2x−3=0 ⇒ x=frac{3}{2}'],
 ['La derivada pasa de negativa a positiva; el candidato es el mínimo del dominio.','D′<0 en [1;frac{3}{2}); D′>0 en (frac{3}{2};+∞)'],
 ['Calculamos las dos coordenadas y recuperamos la distancia, no solo su cuadrado.','y=√(frac{1}{2})=frac{√(2)}{2}; D(frac{3}{2})=frac{3}{4}; d=frac{√(3)}{2}'],
 ['Comprobamos globalmente mediante un cuadrado no negativo, incluyendo el extremo x=1.','D(x)=(x−frac{3}{2})²+frac{3}{4}≥frac{3}{4}; D(1)=1'],
 ])];
 case 71:return[mk(0,'f(x)=3−(2x+3)e^{−x}.',['f(x)=−(2x+3)e^{−x}.','f(x)=3+(2x−3)e^{−x}.','f(x)=1−(2x+1)e^{−x}.'],['Omitir la constante que impone el paso por el origen.','Cambiar el signo de la integración por partes.','Omitir la segunda integral al integrar por partes.'],[
 ['Buscamos una primitiva de la derivada y después imponemos el punto dado.','f(x)=∫(2x+1)e^{−x} dx'],
 ['Usamos integración por partes, definiendo ambas funciones.','∫u dv=uv−∫v du; u=2x+1; du=2 dx; dv=e^{−x}dx; v=−e^{−x}'],
 ['Sustituimos manteniendo el signo de la segunda integral.','f(x)=−(2x+1)e^{−x}+2∫e^{−x}dx'],
 ['Integramos el término restante y agrupamos.','f(x)=−(2x+1)e^{−x}−2e^{−x}+C=−(2x+3)e^{−x}+C'],
 ['Pasar por el origen significa que la ordenada en cero vale cero.','f(0)=−3+C=0 ⇒ C=3'],
 ['La derivación del resultado y el valor inicial comprueban independientemente las dos condiciones.','f′(x)=−2e^{−x}+(2x+3)e^{−x}=(2x+1)e^{−x}; f(0)=0'],
 ]),mk(1,'y=x.',['y=−x.','y=3x.','y=x+3.'],['Cambiar el signo de la pendiente.','Confundir una constante de la primitiva con la pendiente.','Omitir que el punto de tangencia es el origen.'],[
 ['La tangente se determina por el punto y la derivada en su abscisa.','y−f(0)=f′(0)(x−0)'],
 ['La función pasa por el origen por condición del enunciado.','f(0)=0'],
 ['Evaluamos la derivada que se da directamente, sin volver a integrar.','f′(0)=(2·0+1)e⁰=1'],
 ['Sustituimos en la ecuación punto-pendiente.','y−0=1(x−0) ⇒ y=x'],
 ['Comprobamos que contiene el punto y tiene la pendiente exigida.','y(0)=0; pendiente=1'],
 ])];
 case 81:return[mk(0,'F(x)=x+ln|x−1|−ln|x+1|+2+ln(3).',['F(x)=x+ln|x−1|−ln|x+1|+2−ln(3).','F(x)=x−ln|x−1|+ln|x+1|+2−ln(3).','F(x)=x+2ln|x−1|−2ln|x+1|+2+2ln(3).'],['Cambiar el signo al despejar la constante.','Invertir los signos de las fracciones simples.','Duplicar el coeficiente de la parte racional.'],[
 ['Dividimos los polinomios antes de descomponer en fracciones simples.','frac{x²+1}{x²−1}=1+frac{2}{(x−1)(x+1)}'],
 ['Planteamos coeficientes constantes y comparamos los numeradores.','2=A(x+1)+B(x−1); A+B=0; A−B=2'],
 ['Resolviendo las dos ecuaciones obtenemos la descomposición.','A=1; B=−1; f(x)=1+frac{1}{x−1}−frac{1}{x+1}'],
 ['Integramos cada término, usando valor absoluto en las primitivas logarítmicas.','F(x)=x+ln|x−1|−ln|x+1|+C'],
 ['El punto indicado pertenece a la componente x>1; imponemos su ordenada.','F(2)=2+ln(1)−ln(3)+C=4 ⇒ C=2+ln(3)'],
 ['Esta expresión es una primitiva válida en todo el dominio excluyendo ±1. En las otras componentes podría elegirse otra constante: el punto no las determina.','D=ℝ∖{−1;1}; C=2+ln(3) es una elección válida'],
 ['Derivamos y comprobamos el punto para cerrar ambas condiciones.','F′(x)=1+frac{1}{x−1}−frac{1}{x+1}=frac{x²+1}{x²−1}; F(2)=4'],
 ])];
 case 83:return[mk(0,'a=−6; b=0; c=4.',['a=−6; b=6; c=−2.','a=−3; b=−6; c=7.','a=−6; b=0; c=10.'],['Tomar pendiente cero en lugar de la pendiente oficial.','Perder el factor dos al derivar ax².','Usar la ordenada en el origen de la tangente como valor de f(1).'],[
 ['Derivamos el polinomio manteniendo los parámetros.','f′(x)=6x²+2ax+b; f″(x)=12x+2a'],
 ['En un punto de inflexión de este polinomio, la segunda derivada se anula.','f″(1)=12+2a=0 ⇒ a=−6'],
 ['La pendiente de la recta dada es la derivada en el punto de contacto.','f′(1)=6+2a+b=−6'],
 ['Sustituimos el primer parámetro para determinar el segundo.','6−12+b=−6 ⇒ b=0'],
 ['La recta da la ordenada del punto al sustituir su abscisa, no al tomar su término independiente.','f(1)=−6·1+6=0'],
 ['Usamos el valor de la función para hallar el último parámetro.','2+a+b+c=0 ⇒ 2−6+0+c=0 ⇒ c=4'],
 ['Verificamos el cambio de concavidad y reconstruimos la tangente.','f″(x)=12(x−1) cambia de signo en 1; y=f(1)+f′(1)(x−1)=−6x+6'],
 ])];
 case 90:return[mk(0,'Mínimo: (1;1). Máximo: (frac{1}{e};e−1).',['Mínimo: (1;1). Máximo: (e;1+frac{1}{e}).','Mínimo: (frac{1}{e};e−1). Máximo: (e;1+frac{1}{e}).','Mínimo: (1;0). Máximo: (frac{1}{e};e+1).'],['Comparar solo la abscisa mayor, no los dos valores extremos.','Suponer crecimiento en todo el intervalo.','Evaluar con signos incorrectos el recíproco y el logaritmo.'],[
 ['La función es continua en el intervalo cerrado, por lo que alcanza máximo y mínimo absolutos.','I=[frac{1}{e};e]⊂(0;+∞)'],
 ['Derivamos cada sumando; el recíproco tiene derivada negativa.','f′(x)=−frac{1}{x²}+frac{1}{x}=frac{x−1}{x²}'],
 ['El denominador es positivo. La función decrece hasta uno y después crece.','f′<0 si x<1; f′(1)=0; f′>0 si x>1'],
 ['Calculamos todos los candidatos: punto crítico y ambos extremos del intervalo.','f(1)=1; f(frac{1}{e})=e−1; f(e)=1+frac{1}{e}'],
 ['El mínimo se obtiene en uno. Para el máximo comparamos los valores de los extremos.','e−1−(1+frac{1}{e})=e−2−frac{1}{e}>0'],
 ['La desigualdad es rigurosa: e>5/2 implica que la diferencia supera 1/10.','e−2−frac{1}{e}>frac{5}{2}−2−frac{2}{5}=frac{1}{10}'],
 ['Expresamos abscisas y ordenadas y verificamos los valores numéricos como control.','Mínimo (1;1); máximo (frac{1}{e};e−1); e−1≈1,71828>1+frac{1}{e}≈1,36788'],
 ]),mk(1,'y=frac{e−1}{e²}x+frac{2}{e}.',['y=frac{e+1}{e²}x.','y=frac{e−1}{e²}x+1+frac{1}{e}.','y=frac{e−1}{e}x+frac{2}{e}.'],['Derivar 1/x con signo positivo.','Usar f(e) como ordenada en el origen sin trasladar el punto.','Perder un factor e en el denominador de la pendiente.'],[
 ['Usamos la ecuación de la tangente en la abscisa indicada.','y−f(e)=f′(e)(x−e)'],
 ['Evaluamos la función oficial y la derivada obtenida.','f(e)=frac{1}{e}+1; f′(e)=frac{e−1}{e²}'],
 ['Sustituimos ambos datos antes de desarrollar.','y−(1+frac{1}{e})=frac{e−1}{e²}(x−e)'],
 ['Distribuimos la pendiente y simplificamos el término independiente.','1+frac{1}{e}−frac{e−1}{e}=frac{2}{e}'],
 ['Comprobamos que la recta contiene el punto y conserva la pendiente.','y(e)=frac{e−1}{e}+frac{2}{e}=1+frac{1}{e}; pendiente=frac{e−1}{e²}'],
 ])];
 case 99:return[mk(0,'I=frac{e^{2x}(2sen(x)−cos(x))}{5}+C.',['I=frac{e^{2x}(2sen(x)+cos(x))}{5}+C.','I=frac{e^{2x}(2sen(x)−cos(x))}{3}+C.','I=frac{e^{2x}(sen(x)−2cos(x))}{5}+C.'],['Cambiar el signo de la segunda integración por partes.','Pasar un cuarto de la integral al lado incorrecto.','Intercambiar los coeficientes del seno y del coseno.'],[
 ['Denotamos la integral por I y aplicamos partes a seno y exponencial.','I=∫e^{2x}sen(x)dx; u=sen(x); du=cos(x)dx; dv=e^{2x}dx; v=frac{e^{2x}}{2}'],
 ['La fórmula de partes introduce una segunda integral J.','I=frac{e^{2x}sen(x)}{2}−frac{J}{2}; J=∫e^{2x}cos(x)dx'],
 ['Aplicamos partes a J, mostrando la derivada negativa del coseno.','u=cos(x); du=−sen(x)dx; v=frac{e^{2x}}{2}; J=frac{e^{2x}cos(x)}{2}+frac{I}{2}'],
 ['Sustituimos J en la primera igualdad; aparece la misma integral inicial.','I=frac{e^{2x}sen(x)}{2}−frac{e^{2x}cos(x)}{4}−frac{I}{4}'],
 ['Reunimos las integrales y despejamos, añadiendo la constante arbitraria.','frac{5I}{4}=frac{e^{2x}(2sen(x)−cos(x))}{4}; I=frac{e^{2x}(2sen(x)−cos(x))}{5}+C'],
 ['Derivamos el producto para verificar sin repetir la integración.','I′=frac{e^{2x}[4sen(x)−2cos(x)+2cos(x)+sen(x)]}{5}=e^{2x}sen(x)'],
 ])];
 case 104:return[mk(0,'Crece: (−π;0) y (π;2π). Decrece: (−2π;−π) y (0;π).',['Crece: (−2π;−π) y (0;π). Decrece: (−π;0) y (π;2π).','Crece: (−2π;0). Decrece: (0;2π).','Crece: (0;2π). Decrece: (−2π;0).'],['Invertir el signo de la derivada del coseno.','Omitir los ceros de la derivada en ±π.','Omitir los ceros en ±π e invertir la monotonía.'],[
 ['El denominador nunca se anula, porque el coseno está entre menos uno y uno.','1≤2+cos(x)≤3'],
 ['Aplicamos la regla del cociente y simplificamos los términos cruzados.','f′(x)=frac{−sen(x)(2+cos(x))+cos(x)sen(x)}{(2+cos(x))²}=frac{−2sen(x)}{(2+cos(x))²}'],
 ['Los puntos críticos interiores son los ceros del seno. Los extremos ±2π no pertenecen al dominio.','x=−π,0,π'],
 ['El denominador cuadrado es positivo: el signo de la derivada es opuesto al del seno.','Signos de f′: − en (−2π;−π), + en (−π;0), − en (0;π), + en (π;2π)'],
 ['Traducimos los signos a intervalos de monotonía.','Crece en (−π;0)∪(π;2π); decrece en (−2π;−π)∪(0;π)'],
 ['Contrastamos los cuatro signos con valores interiores, sin confundir periodicidad con ausencia de cambios.','x=−frac{3π}{2},−frac{π}{2},frac{π}{2},frac{3π}{2} ⇒ signos −,+,−,+'],
 ]),mk(1,'Máximo: (0;frac{1}{3}). Mínimos: (−π;−1) y (π;−1).',['Mínimo: (0;frac{1}{3}). Máximos: (−π;−1) y (π;−1).','Máximo: (0;1). Mínimos: (−π;−1) y (π;−1).','Máximo: (0;frac{1}{3}). Mínimos: (−π;−frac{1}{3}) y (π;−frac{1}{3}).'],['Intercambiar la interpretación de los cambios de signo.','Omitir el denominador al evaluar en cero.','Usar cos(π)=1 en el denominador.'],[
 ['En cero la derivada pasa de positiva a negativa: hay máximo relativo.','f′: +→− en x=0'],
 ['Evaluamos la ordenada en la expresión original.','f(0)=frac{1}{2+1}=frac{1}{3}'],
 ['En menos pi y pi la derivada pasa de negativa a positiva: son mínimos relativos.','f′: −→+ en x=−π y x=π'],
 ['El coseno vale menos uno en los dos puntos.','f(±π)=frac{−1}{2−1}=−1'],
 ['No hay más puntos críticos interiores. Los extremos excluidos no pueden ser extremos alcanzados.','Máximo (0;frac{1}{3}); mínimos (−π;−1),(π;−1)'],
 ['Como control independiente, u/(2+u) es creciente para −1≤u≤1; su imagen es el intervalo indicado.','−1≤f(x)≤frac{1}{3}'],
 ])];
 case 106:return[mk(0,'Cóncava hacia abajo en (−∞;−1), hacia arriba en (−1;+∞); inflexión (−1;2−frac{2}{e}).',['Cóncava hacia arriba en (−∞;−1), hacia abajo en (−1;+∞); inflexión (−1;2−frac{2}{e}).','Cóncava hacia abajo en (−∞;0), hacia arriba en (0;+∞); inflexión (0;1).','Cóncava hacia abajo en (−∞;−1), hacia arriba en (−1;+∞); inflexión (−1;1−frac{2}{e}).'],['Invertir el significado del signo de la segunda derivada.','Usar el cero de f′ para localizar la inflexión.','Omitir la aportación del extremo inferior de la integral.'],[
 ['El integrando es continuo. El teorema fundamental del cálculo permite derivar la integral de extremo variable.','f′(x)=xe^x'],
 ['Derivamos de nuevo usando la regla del producto.','f″(x)=e^x+xe^x=(x+1)e^x'],
 ['La exponencial es positiva. El signo cambia únicamente en menos uno.','f″<0 en (−∞;−1); f″>0 en (−1;+∞)'],
 ['Describimos la orientación para evitar ambigüedad terminológica entre concavidad y convexidad.','Hacia abajo si x<−1; hacia arriba si x>−1; inflexión en x=−1'],
 ['Para hallar la ordenada necesitamos evaluar la integral. Integramos por partes.','u=t; du=dt; dv=e^t dt; v=e^t; ∫te^t dt=te^t−e^t+C'],
 ['Aplicamos Barrow en ambos extremos y conservamos la unidad exterior.','f(x)=1+((x−1)e^x−(0−1)e⁰)=1+(x−1)e^x+1=2+(x−1)e^x'],
 ['Sustituimos la abscisa de inflexión en la función ya evaluada.','f(−1)=2−frac{2}{e}'],
 ['Comprobamos la condición inicial y derivamos la expresión para recuperar el integrando.','f(0)=1; [2+(x−1)e^x]′=xe^x'],
 ])];
 case 110:return[mk(0,'Lado de la base frac{5}{6} m; altura frac{5}{9} m.',['Lado de la base frac{5}{6} m; altura frac{5}{6} m.','Lado de la base frac{5}{3} m; altura frac{5}{9} m.','Lado de la base frac{5}{6} m; altura frac{5}{18} m.'],['Imponer que la caja óptima sea un cubo pese a los costes distintos.','Confundir el lado con el doble del lado.','Contar ocho paredes laterales en vez de cuatro.'],[
 ['Definimos las dimensiones positivas y las superficies de una caja sin tapa.','x: lado de base en m; h: altura en m; base=x²; laterales=4xh'],
 ['Una caja de volumen máximo agota el presupuesto: con dinero sobrante podría aumentarse su altura.','24x²+18·4xh=50'],
 ['Despejamos la altura y delimitamos los lados que dejan altura positiva.','h=frac{50−24x²}{72x}; 0<x<√(frac{50}{24})'],
 ['Escribimos el volumen como función de una sola variable.','V(x)=x²h=frac{50x−24x³}{72}'],
 ['Derivamos y resolvemos la condición de extremo interior.','V′(x)=frac{50−72x²}{72}=0 ⇒ x²=frac{25}{36} ⇒ x=frac{5}{6}'],
 ['La derivada es positiva antes del candidato y negativa después; el volumen tiende a cero en los extremos del dominio.','V′>0 si x<frac{5}{6}; V′<0 si x>frac{5}{6}; máximo absoluto'],
 ['Sustituimos en la restricción para calcular la altura, sin suponer una caja cúbica.','h=frac{50−24·(25/36)}{72·(5/6)}=frac{100/3}{60}=frac{5}{9} m'],
 ['Comprobamos el coste total y el volumen positivo obtenido.','24·frac{25}{36}+72·frac{5}{6}·frac{5}{9}=frac{50}{3}+frac{100}{3}=50 €; V=frac{125}{324} m³'],
 ])];
 default:throw Error('Unsolved exercise');}
}
export function buildEarlyCalculusBatch(id='batch-0380',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===71?['Derivadas']:c.index===106?['Integrales indefinidas']:[];x.block='Análisis';x.examSlot=c.topic==='Integrales indefinidas'?3:2;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.topic==='Integrales indefinidas'?'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_METHOD_SIGNS_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildEarlyCalculusBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0380-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0380.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[957,'8bab92660a5a8eecfd54fa7be53b1c173e06c5a122d8c915e97ae36fc0e1dc78',2,'B.1','c4c6b90854b7f84e5284b0789c6e0a4a3b5f0381d8c910a3e77a4fa3aa7e012f',0],
[959,'05fb83365c2d5a2e7fded533162b7b70e6837c2ac376874d949f0ea14651cde3',1,'A.1','f7c7304da54cca2a7130d90b26c1df2bea79272cf6494df69d53ff61ef77df25',0],
[960,'4ed7fc44fe8d81fed98763864234427004d1dfa317b5d6657c1c2da31a4c902b',1,'A.2','6129cdf78de71be60df77d0b4278637ca24c2741502314360cefc1568addf5ab',0],
[963,'a1309415c80437b1f75d719c9d420d9f4bf895a58b248aad5ba544cdec0b746d',2,'OPTATIVIDAD2.4.1','dd3a570eebba030d125b13a9aa61ccbb4262985a5effaf5dc4d527819871f9e2',0],
[964,'9b43b63df1b76e5a1b95f77010ec0c24b3448817b7fbfaa1b397a9271c23e44f',2,'B.5','a12338e74f2c808b4d3ea62b4b5d8b4528399f663e42a8f223abfc6e77da679e',0]];
export const statements={957:'Sea f:ℝ→ℝ la función definida por f(x)=4−x².\na) Halla la ecuación de la recta normal a la gráfica de f en el punto de abscisa x=2.\nb) Determina el punto de la gráfica en el que la recta tangente es perpendicular a la recta x+2y−2=0.',959:'Calcula lim_{x→0}frac{tg(x)−x}{x−sen(x)}.',960:'Sea la función f:ℝ→ℝ dada por f(x)=(x−frac{1}{2})e^{−x²}.\na) Determina los intervalos de crecimiento y de decrecimiento de f.\nb) Halla los extremos absolutos de f (abscisas donde se obtienen y valores que se alcanzan).',963:'Determina para qué valores de a el límite lim_{x→0}frac{e^{−ax}−(1−ax)cos(2x)}{x²} vale 6.',964:'La suma de los seguidores en una determinada red social de Alberto, Begoña y Carlos es de 13000 personas. Aunque Carlos perdiera una tercera parte de sus seguidores, todavía seguiría teniendo el doble de seguidores que tiene Alberto. Por otro lado, los seguidores de Alberto más la quinta parte de los seguidores de Begoña, son tantos como la mitad de los de Carlos. Calcula cuántos seguidores tiene cada uno.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_NORMAL_LIMITS_GAUSSIAN_LAYOUT']]:[];
export const cases=[{index:957,slot:2,literals:['4 − x2','x + 2y − 2 = 0']},{index:959,slot:2,literals:['tg (x) − x','sen (x)']},{index:960,slot:2,literals:['extremos absolutos','de decrecimiento']},{index:963,slot:2,literals:['(1 − ax) cos(2x)','vale 6']},{index:964,slot:1,literals:['13000','quinta parte','tercera parte']}];
export const proof=c=>({957:{normalSlope:.25,normalPoint:[2,0],tangentPoint:[-1,3],tangentSlope:2},959:{limit:2,identity:'(1+cos(x))/cos(x)^2'},960:{critical:[-.5,1],signs:[-1,1,-1],min:[-.5,-Math.exp(-.25)],max:[1,1/(2*Math.E)],limits:[0,0]},963:{parameters:[-2*Math.sqrt(2),2*Math.sqrt(2)],limitFormula:'(a*a+4)/2'},964:{solution:[2000,5000,6000],matrix:[[1,1,1],[-3,0,1],[10,2,-5]],rhs:[13000,0,0]}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_DIFFERENTIATION_TRIG_IDENTITY_AND_GAUSS_CHECKS',proof(c));switch(c.index){
case 957:return[mk(0,'y=frac{x−2}{4}.',['y=−4(x−2).','y=−frac{x−2}{4}.','y=frac{x}{4}.'],['Dar la tangente en lugar de la normal.','Tomar la inversa sin cambiar el signo de la pendiente.','Olvidar que la recta pasa por (2,0).'],[
['Calculamos el punto de la gráfica correspondiente a la abscisa indicada.','f(2)=4−2²=0 ⇒ P=(2,0)'],
['La derivada da la pendiente de la recta tangente.','f′(x)=−2x ⇒ mₜ=f′(2)=−4'],
['La normal es perpendicular a la tangente; sus pendientes tienen producto menos uno.','mₙmₜ=−1 ⇒ mₙ=−frac{1}{−4}=frac{1}{4}'],
['Aplicamos la ecuación punto-pendiente por el punto P.','y−0=frac{1}{4}(x−2)'],
['Comprobamos que la recta obtenida pasa por P.','x=2 ⇒ y=0'],
['Verificamos la perpendicularidad, no solo la pertenencia del punto.','(−4)·frac{1}{4}=−1 ⇒ y=frac{x−2}{4} es la normal'],
]),mk(1,'P=(−1,3).',['P=(1,3).','P=(frac{1}{4},frac{63}{16}).','P=(−1,5).'],['Cambiar el signo al despejar la abscisa.','Igualar la pendiente a la de la recta dada, no a su perpendicular.','Sustituir el signo del cuadrado incorrectamente al obtener la ordenada.'],[
['Despejamos y para leer la pendiente de la recta dada.','x+2y−2=0 ⇒ y=−frac{1}{2}x+1; mᵣ=−frac{1}{2}'],
['La tangente buscada debe ser perpendicular a esa recta.','mₜmᵣ=−1 ⇒ mₜ=2'],
['La pendiente tangente a la gráfica es el valor de la derivada.','f′(x)=−2x ⇒ −2x=2'],
['Despejamos la abscisa y calculamos su ordenada con la función original.','x=−1; f(−1)=4−(−1)²=3'],
['Escribimos la tangente para comprobar el punto y la pendiente.','y−3=2(x+1) ⇒ y=2x+5'],
['La recta pasa por (−1,3) y es perpendicular a la dada.','2·(−frac{1}{2})=−1; P=(−1,3)'],
])];
case 959:return[mk(0,'El límite vale 2.',['El límite vale 1.','El límite vale −2.','El límite vale frac{1}{2}.'],['Sustituir tangente y seno por x cancelando los términos principales sin controlar su orden.','Invertir el signo del denominador x−sen(x).','Invertir el cociente final.'],[
['Al sustituir cero obtenemos una indeterminación; no podemos dividir cero entre cero.','tg(0)−0=0; 0−sen(0)=0 ⇒ forma 0/0'],
['En Matemáticas II aplicamos L’Hôpital: ambas funciones son derivables cerca de cero y 1−cos(x) no se anula en un entorno reducido salvo en cero.','L=lim_{x→0}frac{sec²(x)−1}{1−cos(x)}'],
['Usamos la identidad trigonométrica sec²(x)−1=tg²(x).','L=lim_{x→0}frac{sen²(x)}{cos²(x)(1−cos(x))}'],
['Factorizamos sen²(x) mediante la identidad pitagórica.','sen²(x)=1−cos²(x)=(1−cos(x))(1+cos(x))'],
['Cancelamos únicamente para x distinto de cero en ese entorno, lo que es válido al calcular el límite.','L=lim_{x→0}frac{1+cos(x)}{cos²(x)}=frac{2}{1}=2'],
['Como comprobación, el cociente simplificado es positivo y tiende al mismo valor por ambos lados.','cos(x)→1 ⇒ frac{1+cos(x)}{cos²(x)}→2'],
])];
case 960:return[mk(0,'Crece en (−frac{1}{2},1); decrece en (−∞,−frac{1}{2}) y (1,+∞).',['Crece en (−∞,−frac{1}{2}) y (1,+∞); decrece en (−frac{1}{2},1).','Crece en (−1,frac{1}{2}); decrece en (−∞,−1) y (frac{1}{2},+∞).','Crece en (−∞,1); decrece en (1,+∞).'],['Invertir el signo del factor cuadrático de la derivada.','Cambiar los signos al resolver las raíces.','Olvidar la raíz negativa de la derivada.'],[
['Aplicamos la regla del producto y la de la cadena conservando el factor completo del PDF.','f(x)=(x−frac{1}{2})e^{−x²}'],
['Derivamos y sacamos factor común la exponencial, que siempre es positiva.','f′(x)=e^{−x²}−2x(x−frac{1}{2})e^{−x²}=(1+x−2x²)e^{−x²}'],
['Factorizamos el polinomio para hallar sus dos ceros.','1+x−2x²=−(2x+1)(x−1) ⇒ x=−frac{1}{2},1'],
['Antes de la primera raíz, ambos factores lineales son negativos y el signo exterior vuelve negativa la derivada.','x<−frac{1}{2} ⇒ f′(x)<0'],
['Entre las raíces los factores tienen signos opuestos; después ambos son positivos.','−frac{1}{2}<x<1 ⇒ f′(x)>0; x>1 ⇒ f′(x)<0'],
['Concluimos los intervalos a partir de la tabla de signos, no del signo de la función.','f decrece, crece, decrece en los tres intervalos consecutivos'],
]),mk(1,'Mínimo absoluto en x=−frac{1}{2}, valor −e^{−1/4}; máximo absoluto en x=1, valor frac{1}{2e}.',['Mínimo absoluto en x=1, valor frac{1}{2e}; máximo absoluto en x=−frac{1}{2}, valor −e^{−1/4}.','Mínimo absoluto en x=−frac{1}{2}, valor −frac{1}{2}e^{−1/4}; máximo absoluto en x=1, valor frac{1}{2e}.','Mínimo absoluto en x=−frac{1}{2}, valor −e^{−1/4}; máximo absoluto en x=1, valor frac{1}{e}.'],['Intercambiar máximo y mínimo pese al cambio de signo de la derivada.','Olvidar la resta de un medio al evaluar el primer factor.','Omitir el factor un medio al evaluar en uno.'],[
['Los cambios de signo de f′ dan un mínimo relativo y un máximo relativo.','f′:−,+,− ⇒ mínimo en −frac{1}{2}; máximo en 1'],
['Evaluamos el mínimo en la función original.','f(−frac{1}{2})=(−frac{1}{2}−frac{1}{2})e^{−1/4}=−e^{−1/4}'],
['Evaluamos el máximo en la función original.','f(1)=(1−frac{1}{2})e^{−1}=frac{1}{2e}'],
['Para decidir si son absolutos comprobamos ambos extremos no acotados del dominio.','lim_{x→−∞}(x−frac{1}{2})e^{−x²}=lim_{x→+∞}(x−frac{1}{2})e^{−x²}=0'],
['La exponencial del denominador crece más que el factor lineal; también puede comprobarse el cociente mediante L’Hôpital, de forma ±∞/∞.','frac{x−1/2}{e^{x²}}; cociente de derivadas frac{1}{2xe^{x²}}→0'],
['La monotonía de los tres intervalos y el límite cero, entre los dos valores extremos, prueban que ambos son absolutos.','−e^{−1/4}≤f(x)≤frac{1}{2e} para todo x∈ℝ'],
])];
case 963:return[mk(0,'a=−2√2 o a=2√2.',['a=−2 o a=2.','a=2√2 únicamente.','a=−√6 o a=√6.'],['Perder el factor dos en la segunda derivada del denominador.','Omitir la raíz negativa al resolver una ecuación cuadrática.','Omitir el término procedente del coseno.'],[
['Para cualquier a fijo, la sustitución directa da cero en numerador y denominador.','N(x)=e^{−ax}−(1−ax)cos(2x); N(0)=0 ⇒ 0/0'],
['Aplicamos L’Hôpital y derivamos el producto con cuidado.','N′(x)=−ae^{−ax}+a cos(2x)+2(1−ax)sen(2x); (x²)′=2x'],
['La primera derivada sigue dando una indeterminación cero entre cero.','N′(0)=−a+a+0=0; 2·0=0'],
['Aplicamos de nuevo L’Hôpital, sumando las dos contribuciones con seno.','N″(x)=a²e^{−ax}−4a sen(2x)+4(1−ax)cos(2x); (2x)′=2'],
['Ahora sustituimos y exigimos el valor solicitado.','L=frac{a²+4}{2}=6 ⇒ a²=8'],
['Resolvemos ambas raíces y verificamos el límite para las dos.','a=±2√2; frac{8+4}{2}=6'],
])];
case 964:return[mk(0,'Alberto: 2000; Begoña: 5000; Carlos: 6000 seguidores.',['Alberto: 3000; Begoña: 4000; Carlos: 6000 seguidores.','Alberto: 2000; Begoña: 6000; Carlos: 5000 seguidores.','Alberto: 1000; Begoña: 9000; Carlos: 3000 seguidores.'],['Confundir los seguidores originales de Carlos con los que conserva tras perder un tercio.','Intercambiar las cantidades de Begoña y Carlos.','Cumplir el total y la segunda condición, pero no comprobar la tercera.'],[
['Llamamos x, y y z a los seguidores de Alberto, Begoña y Carlos. Traducimos las tres condiciones.','x+y+z=13000; frac{2z}{3}=2x; x+frac{y}{5}=frac{z}{2}'],
['Eliminamos denominadores y preparamos el sistema para el método de Gauss.','system{x+y+z=13000;−3x+z=0;10x+2y−5z=0}'],
['Eliminamos x de las filas segunda y tercera usando la primera.','F₂←F₂+3F₁; F₃←F₃−10F₁ ⇒ system{x+y+z=13000;3y+4z=39000;−8y−15z=−130000}'],
['Eliminamos y combinando ocho veces la segunda fila y tres veces la tercera.','8F₂+3F₃:−13z=−78000 ⇒ z=6000'],
['Sustituimos hacia atrás para recuperar las otras dos incógnitas.','3y+24000=39000 ⇒ y=5000; x=13000−5000−6000=2000'],
['Comprobamos total, pérdida y proporción en las condiciones originales.','2000+5000+6000=13000; frac{2}{3}·6000=4000=2·2000; 2000+frac{5000}{5}=3000=frac{6000}{2}'],
])];default:throw Error('Unknown normal-limits-gaussian case');}}
export function buildNormalLimitsGaussianBatch(id='batch-0453',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas de ecuaciones':'Derivadas y límites';x.block=c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x.secondaryTopics=[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_NORMAL_LIMITS_GAUSSIAN'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildNormalLimitsGaussianBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0453-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0453.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

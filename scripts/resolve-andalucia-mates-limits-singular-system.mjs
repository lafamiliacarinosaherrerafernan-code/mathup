// Read directly from the official PDFs; mathematical derivations are not inherited from old answers.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[53,'8cd46d9e803e35632ac299c603e2a3d3553404b6f62e87872d9fb2cf86471f3b',1,'A.1','a5bdfbca36d08af94931ee12182169f220153ffb89d5485fb53184ae8435dcef',0],
[56,'2200f6e11bca8b324a64d95f8b6b31c9e91afe914d1b929d65031e64575e2395',1,'1','f5545537a2e686b33d120f692c16c051778b5d7fd1a73c3c35d2a5c49044f29a',0],
[58,'f5ec52502964f33fd640c31536ed9055e35529b51abb1d02247402916bcbc6a6',1,'1','5e8b8036a722fe1a61f4e4d42b08bde71187b9c29c0feb4c93c16366ae0194fc',0],
[65,'7552fbca6211612f8e7009b2d2036dec3d7e33ceecbbd68eef88f6efe99c2007',1,'A.1','08a750d1ac3b816569f22bd4d0ee2904d7b487cca52d38f5389418cc31e1689a',0],
[70,'7552fbca6211612f8e7009b2d2036dec3d7e33ceecbbd68eef88f6efe99c2007',2,'B.3','af466404b9b74551c0c0b20184b77da18146575de025f11c178f4f7a71d6a4e8',0],
];
export const statements={
53:'[2,5 puntos] Sabiendo que lim_{x→1}(frac{x}{x−1}−frac{a}{ln(x)}) es finito, calcula a y el valor del límite (ln denota el logaritmo neperiano).',
56:'Calcula a sabiendo que lim_{x→0}(frac{1}{ln(1−x)}−frac{ax−1}{x})=frac{7}{2} (ln denota la función logaritmo neperiano).',
58:'Considera la función f definida por f(x)=frac{x³}{x²−1} para x≠1,−1.\na) Estudia y halla las asíntotas de la gráfica de f. (1,25 puntos)\nb) Determina los intervalos de crecimiento y de decrecimiento de f. (1,25 puntos)',
65:'[2,5 puntos] Considera la función f:ℝ→ℝ definida por\nf(x)={ax²+bx+c si x≤0;frac{e^x−e^{−x}−2x}{x−sen(x)} si x>0}\nDetermina a, b y c sabiendo que f es continua, alcanza un máximo relativo en x=−1 y la recta tangente a la gráfica de f en el punto de abscisa x=−2 tiene pendiente 2.',
70:'Considera el siguiente sistema de ecuaciones lineales\nsystem{x+y+mz=m²;y−z=m;x+my+z=m}\na) [1,5 puntos] Discute el sistema según los valores del parámetro m.\nb) [1 punto] Resuélvelo para m=1. Para dicho valor de m, calcula, si es posible, una solución en la que z=2.',
};
export const cases=[{index:53,literals:['es ﬁnito','logaritmo'],topic:'Límites y asíntotas',whole:true},{index:56,literals:['Calcula a sabiendo','ln(1 − x)'],topic:'Límites y asíntotas',whole:true},{index:58,literals:['asíntotas','crecimiento'],topic:'Límites y asíntotas'},{index:65,literals:['máximo relativo','pendiente 2'],topic:'Derivadas',whole:true},{index:70,literals:['sistema de ecuaciones','z = 2'],topic:'Sistemas con determinantes'}];
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_LIMITS_SINGULAR_SYSTEM_SOURCE_LAYOUT']]:[];
export const logLimit=(x,a)=>x/(x-1)-a/Math.log(x),secondLimit=(x,a)=>1/Math.log1p(-x)-(a*x-1)/x;
export const rational=x=>x**3/(x*x-1),rationalDerivative=x=>x*x*(x*x-3)/(x*x-1)**2;
export const rightBranch=x=>(Math.expm1(x)-Math.expm1(-x)-2*x)/(x-Math.sin(x));
export const system=m=>({A:[[1,1,m],[0,1,-1],[1,m,1]],b:[m*m,m,m]});
export function proof(c){switch(c.index){case 53:return{a:1,limit:.5,independentSeries:'x=1+h; 1/ln(1+h)=1/h+1/2+O(h)',checks:[-.001,-.0001,.0001,.001].map(h=>[h,logLimit(1+h,1)])};case 56:return{a:-3,limit:3.5,independentSeries:'1/ln(1−x)=−1/x+1/2+O(x)',checks:[-.001,-.0001,.0001,.001].map(x=>[x,secondLimit(x,-3)])};case 58:return{vertical:[-1,1],oblique:[1,0],stationary:[-Math.sqrt(3),0,Math.sqrt(3)],derivativeNumerator:[0,0,-3,0,1]};case 65:return{a:-1,b:-2,c:2,rightLimit:2,maximumPoint:[-1,3],slopeAtMinusTwo:2,seriesLeadingCoefficients:[1/3,1/6]};case 70:return{determinantIdenticallyZero:true,rankA:2,consistencyPolynomial:'2m(m−1)',consistent:[0,1],m1General:['-2t','1+t','t'],z2Solution:[-4,3,2]};default:throw Error('No proof');}}
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),ev=proof(c),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_LIMIT_AND_SINGULAR_SYSTEM_INDEPENDENT_CHECK',ev);switch(c.index){
case 53:return[mk(0,'a=1; límite=frac{1}{2}.',['a=1; límite=−frac{1}{2}.','a=1; límite=1.','a=−1; límite=frac{1}{2}.'],['Invertir el signo del término finito de la expansión.','Omitir el término constante de 1/ln(x).','Sumar en vez de cancelar los términos divergentes.'],[
['Unificamos los cocientes antes de evaluar el límite: la diferencia inicial es indeterminada.','frac{x}{x−1}−frac{a}{ln(x)}=frac{x ln(x)−a(x−1)}{(x−1)ln(x)}'],
['El numerador y el denominador se anulan en uno. Dividir ambos por x−1 permite exigir un límite finito.','lim_{x→1} frac{x ln(x)−a(x−1)}{x−1}=1−a; lim_{x→1} ln(x)=0'],
['Si 1−a no fuese cero, el cociente sería no acotado. Por tanto el único candidato es a=1.','1−a=0 ⇒ a=1'],
['Con a=1 aplicamos L’Hôpital a 0/0 y comprobamos la nueva indeterminación.','lim_{x→1} frac{x ln(x)−x+1}{(x−1)ln(x)}=lim_{x→1} frac{ln(x)}{ln(x)+frac{x−1}{x}}; numerador→0, denominador→0'],
['Aplicamos L’Hôpital una segunda vez y sustituimos.','lim_{x→1} frac{frac{1}{x}}{frac{1}{x}+frac{1}{x²}}=frac{1}{2}'],
['Verificamos por expansión independiente cerca de uno.','h=x−1: frac{x}{x−1}=frac{1}{h}+1; frac{1}{ln(1+h)}=frac{1}{h}+frac{1}{2}+O(h); diferencia→frac{1}{2}'],
])];
case 56:return[mk(0,'a=−3.',['a=3.','a=−4.','a=−frac{7}{2}.'],['Cambiar el signo de a al despejar.','Obtener −1/2 en vez de 1/2 para el término logarítmico.','Descartar el término finito 1/2.'],[
['Separamos el parámetro sin evaluar por separado los dos términos divergentes.','frac{1}{ln(1−x)}−frac{ax−1}{x}=frac{1}{ln(1−x)}+frac{1}{x}−a'],
['Unificamos las dos fracciones restantes; aparece una indeterminación 0/0.','L₀=lim_{x→0} frac{x+ln(1−x)}{x ln(1−x)}'],
['Aplicamos L’Hôpital y comprobamos que ambas primeras derivadas también tienden a cero.','L₀=lim_{x→0} frac{1−frac{1}{1−x}}{ln(1−x)−frac{x}{1−x}}'],
['Derivamos de nuevo y sustituimos, cuidando los signos de la derivada del logaritmo.','L₀=lim_{x→0} frac{−frac{1}{(1−x)²}}{−frac{1}{1−x}−frac{1}{(1−x)²}}=frac{−1}{−2}=frac{1}{2}'],
['Imponemos el valor oficial del límite y despejamos a.','frac{1}{2}−a=frac{7}{2} ⇒ a=−3'],
['La expansión independiente confirma el término constante y el valor final.','frac{1}{ln(1−x)}=−frac{1}{x}+frac{1}{2}+O(x); expresión=frac{1}{2}−a+O(x)→frac{7}{2}'],
])];
case 58:return[mk(0,'Verticales x=−1 y x=1; oblicua y=x; no hay horizontales.',['Verticales x=−1 y x=1; horizontal y=0; no hay oblicua.','Vertical x=1; oblicua y=x; no hay horizontales.','Verticales x=−1 y x=1; oblicua y=−x; no hay horizontales.'],['Comparar los grados como si el numerador tuviera grado menor.','Descartar una raíz del denominador.','Cambiar el signo del cociente de la división polinómica.'],[
['Factorizamos el denominador y localizamos los puntos excluidos del dominio.','x²−1=(x−1)(x+1); D=ℝ∖{−1;1}'],
['En ambos puntos el numerador no se anula, por lo que el cociente diverge.','f(−1⁻)→−∞; f(−1⁺)→+∞; f(1⁻)→−∞; f(1⁺)→+∞'],
['Estas divergencias proporcionan las dos asíntotas verticales.','x=−1; x=1'],
['Dividimos el polinomio del numerador entre el del denominador.','f(x)=x+frac{x}{x²−1}'],
['El resto tiende a cero tanto en más infinito como en menos infinito.','lim_{x→±∞}(f(x)−x)=lim_{x→±∞}frac{x}{x²−1}=0 ⇒ y=x'],
['No hay asíntotas horizontales porque f crece en valor absoluto en ambos extremos.','lim_{x→+∞}f(x)=+∞; lim_{x→−∞}f(x)=−∞'],
]),mk(1,'Crece en (−∞;−√(3)) y (√(3);+∞); decrece en (−√(3);−1), (−1;1) y (1;√(3)).',['Decrece en (−∞;−√(3)) y (√(3);+∞); crece en (−√(3);−1), (−1;1) y (1;√(3)).','Crece en (−∞;−1) y (1;+∞); decrece en (−1;1).','Crece en (−∞;−√(3)), (0;1) y (√(3);+∞); decrece en (−√(3);−1), (−1;0) y (1;√(3)).'],['Invertir el signo de la derivada.','Usar solo los puntos excluidos en lugar de las raíces de la derivada.','Asignar al cero doble un cambio de signo inexistente.'],[
['Derivamos con la regla del cociente, conservando el denominador al cuadrado.','f′(x)=frac{3x²(x²−1)−2x·x³}{(x²−1)²}'],
['Simplificamos y factorizamos el numerador.','f′(x)=frac{x²(x²−3)}{(x²−1)²}'],
['Los puntos críticos son −raíz de tres, cero y raíz de tres; −1 y 1 no pertenecen al dominio.','f′(x)=0 ⇔ x=−√(3),0,√(3); x≠−1,1'],
['El denominador es positivo y x² no cambia de signo; fuera de los ceros manda x²−3.','|x|>√(3) ⇒ f′>0; |x|<√(3), x≠0,±1 ⇒ f′<0'],
['Separamos siempre por las discontinuidades y no convertimos el cero doble en un extremo.','Crece: (−∞;−√(3)), (√(3);+∞). Decrece: (−√(3);−1), (−1;1), (1;√(3)).'],
['Comprobamos los signos con puntos de cada intervalo; a ambos lados de cero la función decrece.','f′(−2)>0; f′(−1,2)<0; f′(−0,5)<0; f′(0,5)<0; f′(1,2)<0; f′(2)>0'],
])];
case 65:return[mk(0,'a=−1; b=−2; c=2.',['a=−1; b=−2; c=1.','a=1; b=2; c=2.','a=−1; b=2; c=2.'],['Perder un factor dos en el límite de continuidad.','Cambiar el signo de la pendiente y confundir mínimo con máximo.','Cambiar el signo al imponer f′(−1)=0.'],[
['La continuidad solo necesita comprobarse en el punto de unión. El valor a la izquierda es c.','f(0)=c; c=lim_{x→0⁺} frac{e^x−e^{−x}−2x}{x−sen(x)}'],
['La sustitución da 0/0. Las dos primeras aplicaciones de L’Hôpital siguen dando 0/0.','N′=e^x+e^{−x}−2; D′=1−cos(x); N″=e^x−e^{−x}; D″=sen(x)'],
['Aplicamos una tercera vez y obtenemos el valor exigido de c.','c=lim_{x→0⁺} frac{e^x+e^{−x}}{cos(x)}=2'],
['En −1 y −2 rige el tramo polinómico, cuya derivada es 2ax+b.','f′(−1)=−2a+b=0 ⇒ b=2a'],
['La pendiente oficial de la tangente en −2 da una segunda ecuación.','f′(−2)=−4a+b=2; b=2a ⇒ −2a=2 ⇒ a=−1, b=−2'],
['Comprobamos que el punto estacionario es efectivamente un máximo, no solo un extremo candidato.','f″=2a=−2<0; f(−1)=−1+2+2=3'],
['Verificamos continuidad por series independientes y la pendiente por sustitución.','N(x)=frac{x³}{3}+O(x⁵); D(x)=frac{x³}{6}+O(x⁵); N/D→2; f′(−2)=4−2=2'],
])];
case 70:return[mk(0,'m=0 o m=1: compatible indeterminado; para cualquier otro m: incompatible; nunca compatible determinado.',['m=0 o m=1: incompatible; para cualquier otro m: compatible determinado.','Para todo m: compatible indeterminado.','m=−1 o m=1: compatible indeterminado; para cualquier otro m: incompatible.'],['Confundir el rango singular con determinante no nulo fuera de dos valores.','Anular solo el determinante e ignorar los términos independientes.','Cambiar m por m² al estudiar la condición de compatibilidad.'],[
['Escribimos las matrices de coeficientes y términos independientes.','A=[[1,1,m],[0,1,−1],[1,m,1]]; b=(m²;m;m)'],
['Las dos primeras filas son independientes: el menor de las dos primeras columnas vale uno.','det([[1,1],[0,1]])=1 ⇒ rg(A)≥2'],
['La tercera fila de coeficientes es combinación de las dos primeras para cualquier parámetro.','F₃=F₁+(m−1)F₂ ⇒ rg(A)=2 para todo m'],
['La misma combinación debe respetarse en los términos independientes para que exista solución.','m=m²+(m−1)m=2m²−m ⇒ 2m(m−1)=0'],
['Por Rouché–Frobenius, en los dos valores resultantes los rangos coinciden y son menores que tres.','m∈{0;1}: rg(A)=rg(A|b)=2<3 ⇒ compatible indeterminado'],
['Fuera de esos valores aparece una ecuación 0 igual a un número no nulo.','m∉{0;1}: rg(A)=2<rg(A|b)=3 ⇒ incompatible; nunca hay solución única'],
]),mk(1,'(x;y;z)=(−2t;1+t;t), t∈ℝ; con z=2: (−4;3;2).',['(x;y;z)=(−2t;1+t;t), t∈ℝ; con z=2: (−2;2;1).','(x;y;z)=(2t;1+t;t), t∈ℝ; con z=2: (4;3;2).','(x;y;z)=(−2t;1−t;t), t∈ℝ; con z=2: (−4;−1;2).'],['Confundir el valor del parámetro pedido.','Cambiar el signo al despejar x.','Cambiar el signo al despejar y de y−z=1.'],[
['Sustituimos m=1. La primera y la tercera ecuaciones coinciden.','system{x+y+z=1;y−z=1;x+y+z=1}'],
['Como el sistema es compatible indeterminado, elegimos z como parámetro libre.','z=t, t∈ℝ'],
['La segunda ecuación determina y en función del parámetro.','y−t=1 ⇒ y=1+t'],
['Sustituimos en la primera ecuación para recuperar x.','x+(1+t)+t=1 ⇒ x=−2t'],
['La familia completa y la condición adicional dan el punto solicitado.','(x;y;z)=(−2t;1+t;t); z=2 ⇒ t=2 ⇒ (−4;3;2)'],
['Comprobamos las tres ecuaciones originales y la condición adicional.','−4+3+2=1; 3−2=1; −4+3+2=1; z=2'],
])];
default:throw Error('Unsolved exercise');}}
export function buildLimitsSingularBatch(id='batch-0382',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===70?['Matrices','Determinantes']:c.index===58?['Derivadas']:c.index===65?['Límites y asíntotas']:[];x.block=c.index===70?'Álgebra':'Análisis';x.examSlot=c.index===70?1:2;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===70?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':c.index===65?'LOGARITHMIC_ASYMPTOTES_AND_PIECEWISE_DIFFERENTIABILITY':c.index===58?'RATIONAL_ASYMPTOTES_AND_NORMAL':'PARAMETER_LIMIT_WITH_INDEPENDENT_SERIES_CHECK'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLimitsSingularBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0382-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0382.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

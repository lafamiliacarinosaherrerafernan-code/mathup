import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[151,'85f493d821b1af6654edb4d55c3218802ea3170138b86a4a1f7224d212d397f9',2,'B.4','9ca3a3f15095d8f6027630e9f1a6f9e01af09998b2a842149e9027ce3c29abaf',0],
[154,'709f067c52eb7587dd9e7ca886e32e0417213d679ef7c084f3359d93290bb491',2,'B.4','7139f73abb048f68c3b5a4d4f43f681833a7949320a1d025dd4c65052f18d1a0',0],
[156,'85a6693892f29847142a74b342f143d4d263e44abb0bbce055536058043080eb',1,'A.2','ca158e5a5d523e3b0504c26e32c8898e9ffa0e156bb3e21bfd369593ddff85b9',0],
[176,'497e6d1a54cf3d5393bc8727864e641ec08a5aca088f46eb0e0ed8d8075d7b6d',1,'A.2','36dcacf425d176a590661bb04d8f2725fda026ccb96b6f5ef57d5d716718ebc7',0],
[180,'4ed7fc44fe8d81fed98763864234427004d1dfa317b5d6657c1c2da31a4c902b',1,'A.1','6129cdf78de71be60df77d0b4278637ca24c2741502314360cefc1568addf5ab',0],
[183,'2c5278437c9b39d12317034e63fd1a4e30b153d3926def7914bceb3390e42da6',2,'4.1','9b6c060e7d692b411e5035cd76b8688e238ac21d1a3a1a5f8909d2e47e2fc0b0',0],
];
export const statements={
151:'Considera el punto P(−5;3;1) y la recta r dada por frac{x}{2}=frac{y−3}{2}=frac{z−2}{−1}.\na) [1 punto] Calcula la ecuación general del plano que pasa por P y contiene a r.\nb) [1,5 puntos] Calcula la ecuación de la recta que pasa por P y corta perpendicularmente a r.',
154:'[2,5 puntos] Considera las rectas\nr: x=y=z\ns:\nsystem{x=2;y=1}\nt:\nsystem{x=1+2λ;y=3λ;z=−1+λ}\nHalla la recta que corta a r y a s y es paralela a t.',
156:'[2,5 puntos] Calcula el valor de b>0, sabiendo que el área de la región comprendida entre la curva y=√(x) y la recta y=bx es de frac{4}{3} unidades cuadradas.',
176:'Sabiendo que lim_{x→0}frac{sen(x)−ln(1+x)}{ax²−x+e^x−cos(2x)}=−frac{1}{7}, calcula a (ln denota la función logaritmo neperiano).',
180:'Sea f:ℝ→ℝ la función definida por f(x)=a+b cos(x)+c sen(x). Halla a, b y c sabiendo que su gráfica tiene en el punto de abscisa x=frac{π}{2} a la recta y=1 como recta tangente, y que la recta y=x−1 corta a la gráfica de f en el punto de abscisa x=0.',
183:'Dada la función f:ℝ→ℝ definida por f(x)=frac{8e^x−4e^{2x}}{1+e^x}, halla la primitiva de f cuya gráfica tiene por tangente a la recta y=2x+12ln(2) en el punto de abscisa x=0. (Sugerencia: puedes hacer el cambio e^x=t).',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_METRIC_PARAMETERS_SOURCE_LAYOUT']]:[];
export const cases=[
{index:151,literals:['P (−5, 3, 1)','perpendicularmente'],topic:'Problemas métricos',slot:4},
{index:154,literals:['paralela a t','corta a r'],topic:'Problemas métricos',slot:4,whole:true},
{index:156,literals:['b > 0','cuadradas'],topic:'Integrales definidas y áreas',slot:3,whole:true},
{index:176,literals:['sen(x)','ln (1 + x)','cos(2x)'],topic:'Límites y asíntotas',slot:2,whole:true},
{index:180,literals:['a + b cos(x) + c sen(x)','y = x − 1'],topic:'Derivadas',slot:2,whole:true},
{index:183,literals:['8ex','4e2x','2x + 12 ln(2)'],topic:'Integrales indefinidas',slot:3,whole:true},
];
export const proof=c=>c.index===151?{point:[-5,3,1],linePoint:[0,3,2],lineVector:[2,2,-1],normal:[-2,7,10],planeConstant:-41,foot:[-2,1,3],perpendicular:[3,-2,2]}:c.index===154?{rPoint:[4,4,4],sPoint:[2,1,3],direction:[2,3,1],connectingParameter:-1}:c.index===156?{parameter:.5,upperIntersection:4,area:4/3}:c.index===176?{parameter:-6,numeratorSecondDerivative:1,denominatorSecondDerivative:-7,limit:-1/7}:c.index===180?{parameters:[-1,0,2],point:[Math.PI/2,1],slope:0,otherPoint:[0,-1]}:{constant:4,valueAtZero:12*Math.log(2),derivativeAtZero:2};
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_METRIC_SUBSTITUTION_AND_INDEPENDENT_CALCULUS',proof(c));switch(c.index){
case 151:return[mk(0,'Plano: −2x+7y+10z−41=0.',['Plano: −2x+7y+10z+41=0.','Plano: 2x+7y+10z−41=0.','Plano: 2x+2y−z+5=0.'],['Cambiar el signo del término independiente.','Perder el signo de la primera componente del producto vectorial.','Usar el director de la recta como normal del plano que debe contenerla.'],[
['De la forma continua de la recta obtenemos un punto y un vector director.','Q=(0;3;2); u=(2;2;−1); r: Q+λu'],
['Un segundo vector contenido en el plano une Q al punto exterior dado.','QP=P−Q=(−5;0;−1)'],
['Calculamos una normal mediante producto vectorial, desarrollando las tres componentes.','u×QP=(2·(−1)−(−1)·0;(−1)·(−5)−2·(−1);2·0−2·(−5))=(−2;7;10)'],
['La normal no es nula; los dos vectores determinan un plano único. Usamos la ecuación punto-normal.','−2(x−0)+7(y−3)+10(z−2)=0'],
['Desarrollamos y reunimos los términos constantes.','−2x+7y+10z−41=0'],
['Verificamos el punto dado y que la dirección completa de r está contenida.','−2(−5)+7·3+10·1−41=0; n·u=−4+14−10=0; Q satisface el plano'],
]),mk(1,'Recta: (x;y;z)=(−5;3;1)+t(3;−2;2), t∈ℝ.',['Recta: (x;y;z)=(−5;3;1)+t(3;2;2), t∈ℝ.','Recta: (x;y;z)=(−5;3;1)+t(2;2;−1), t∈ℝ.','Recta: (x;y;z)=(0;3;2)+t(3;−2;2), t∈ℝ.'],['Perder el signo de la segunda componente del vector perpendicular.','Usar una dirección paralela a la recta original.','Elegir Q como punto base sin comprobar que la recta pasa por P.'],[
['Buscamos el pie H sobre la recta, manteniendo su parametrización.','H=(2λ;3+2λ;2−λ)'],
['El vector que une P con H debe ser perpendicular al director u.','PH=(2λ+5;2λ;1−λ); PH·u=0'],
['Desarrollamos el producto escalar y despejamos el parámetro.','2(2λ+5)+2(2λ)−(1−λ)=9λ+9=0 ⇒ λ=−1'],
['Sustituimos en la recta para obtener el pie y el vector de la perpendicular.','H=(−2;1;3); PH=(3;−2;2)'],
['La recta solicitada pasa por P y tiene ese vector director.','(x;y;z)=(−5;3;1)+t(3;−2;2)'],
['Comprobamos tanto el corte como la perpendicularidad.','t=1 ⇒ H; H=Q−u∈r; (3;−2;2)·(2;2;−1)=6−4−2=0'],
])];
case 154:return[mk(0,'Recta: (x;y;z)=(4;4;4)+t(2;3;1), t∈ℝ.',['Recta: (x;y;z)=(4;4;4)+t(3;2;1), t∈ℝ.','Recta: (x;y;z)=(2;1;4)+t(2;3;1), t∈ℝ.','Recta: (x;y;z)=(1;1;1)+t(2;3;1), t∈ℝ.'],['Intercambiar las primeras componentes del vector director.','Situar incorrectamente la altura del punto de corte con s.','Imponer un punto de r sin comprobar el corte con s.'],[
['Tomamos puntos generales de las dos rectas que la buscada debe cortar.','P=(k;k;k)∈r; Q=(2;1;z)∈s'],
['La recta t aporta solo su vector director, no obliga a pasar por su punto base.','v=(2;3;1)'],
['Exigimos que el vector PQ sea un múltiplo de v.','system{2−k=2μ;1−k=3μ;z−k=μ}'],
['Restamos las primeras ecuaciones y recuperamos k y z.','1=−μ ⇒ μ=−1; k=4; z=3'],
['Construimos la recta por P con la dirección acreditada.','(x;y;z)=(4;4;4)+t(2;3;1)'],
['Comprobamos las tres condiciones, sin confundir paralelismo con coincidencia.','t=0 ⇒ (4;4;4)∈r; t=−1 ⇒ (2;1;3)∈s; director=(2;3;1), paralelo a t'],
])];
case 156:return[mk(0,'b=frac{1}{2}.',['b=2.','b=frac{1}{8}.','b=−frac{1}{2}.'],['Invertir el cociente al despejar el cubo del parámetro.','Omitir la raíz cúbica al final.','Olvidar la condición b positivo.'],[
['La raíz solo está definida para x no negativo. Igualamos las curvas sin perder el corte en cero.','√(x)=bx; x=0 o, si x>0, 1=b√(x)'],
['Con b positivo obtenemos el otro extremo y el orden de las curvas en el intervalo.','x=frac{1}{b²}; 0<x<frac{1}{b²} ⇒ √(x)>bx'],
['El área es la integral de la curva superior menos la inferior.','A(b)=∫_0^{1/b²}(√(x)−bx)dx'],
['Integramos las dos potencias y evaluamos utilizando b>0.','H(x)=frac{2}{3}x^{3/2}−frac{b}{2}x²; A(b)=H(frac{1}{b²})−H(0)=frac{2}{3b³}−frac{1}{2b³}=frac{1}{6b³}'],
['Usamos el área cuatro tercios que consta en el documento oficial.','frac{1}{6b³}=frac{4}{3} ⇒ b³=frac{1}{8} ⇒ b=frac{1}{2}'],
['La sustitución da los cortes cero y cuatro y verifica el área positiva requerida.','∫_0^4(√(x)−frac{x}{2})dx=frac{16}{3}−4=frac{4}{3}'],
])];
case 176:return[mk(0,'a=−6.',['a=1.','a=−4.','a=−12.'],['Perder el signo negativo del límite prescrito.','Omitir la contribución de cos(2x) a la segunda derivada.','Olvidar el factor dos en la segunda derivada de ax².'],[
['El numerador y el denominador tienden a cero. Sus primeras derivadas también lo hacen.','N(0)=D(0)=0; N′(x)=cos(x)−frac{1}{1+x}; D′(x)=2ax−1+e^x+2sen(2x)'],
['Derivamos de nuevo, manteniendo los factores de las funciones compuestas.','N″(x)=−sen(x)+frac{1}{(1+x)²}; D″(x)=2a+e^x+4cos(2x)'],
['Si 2a+5 no es cero, dos aplicaciones de L’Hôpital dan el límite.','L=frac{N″(0)}{D″(0)}=frac{1}{2a+5}'],
['Igualamos al valor oficial y resolvemos sin invertir su signo.','frac{1}{2a+5}=−frac{1}{7} ⇒ 2a+5=−7 ⇒ a=−6'],
['Excluimos el caso excepcional: si a=−5/2 el numerador es de orden dos y el denominador de orden tres, por lo que no da un límite finito.','N(x)=frac{x²}{2}+O(x³); D(x)=frac{x³}{6}+O(x⁴) cuando a=−frac{5}{2}'],
['Verificamos el candidato por los coeficientes de orden dos y por evaluación numérica cerca de cero.','a=−6 ⇒ N(x)=frac{x²}{2}+O(x³), D(x)=−frac{7x²}{2}+O(x³) ⇒ L=−frac{1}{7}'],
])];
case 180:return[mk(0,'a=−1, b=0, c=2.',['a=1, b=0, c=0.','a=−1, b=2, c=2.','a=−1, b=0, c=−2.'],['Usar el punto de tangencia pero olvidar el corte en x=0.','Confundir el valor de la función con la pendiente de la tangente horizontal.','Cambiar el signo de sen(π/2).'],[
['La tangente horizontal y=1 impone a la vez un valor de la función y una pendiente nula.','f(frac{π}{2})=1; f′(frac{π}{2})=0'],
['Evaluamos el primer dato usando cos(π/2)=0 y sen(π/2)=1.','a+c=1'],
['Derivamos y aplicamos la condición de pendiente.','f′(x)=−b sen(x)+c cos(x); f′(frac{π}{2})=−b=0 ⇒ b=0'],
['El corte con y=x−1 en x=0 aporta una condición de valor, no de pendiente.','f(0)=−1 ⇒ a+b=−1'],
['Resolvemos el sistema de tres condiciones.','b=0; a=−1; c=1−a=2'],
['La función obtenida verifica de forma independiente ambos puntos y la tangente.','f(x)=−1+2sen(x); f(frac{π}{2})=1; f′(frac{π}{2})=0; f(0)=−1'],
])];
case 183:return[mk(0,'F(x)=−4e^x+12ln(1+e^x)+4.',['F(x)=−4e^x+12ln(1+e^x).','F(x)=4e^x+12ln(1+e^x)−4.','F(x)=−4e^x+12ln(1+e^x)−4.'],['Omitir la constante exigida por el punto de tangencia.','Cambiar el signo al dividir la función racional en t.','Cambiar el signo de la constante al despejarla.'],[
['Aplicamos la sustitución sugerida, incluyendo la transformación del diferencial.','t=e^x>0; dt=e^x dx=t dx; dx=frac{dt}{t}'],
['Simplificamos la integral en la nueva variable.','∫frac{8e^x−4e^{2x}}{1+e^x}dx=∫frac{8−4t}{1+t}dt'],
['Dividimos el numerador y obtenemos dos integrales inmediatas.','frac{8−4t}{1+t}=−4+frac{12}{1+t}'],
['Integramos y regresamos a x. El argumento del logaritmo es siempre positivo.','F(x)=−4e^x+12ln(1+e^x)+C'],
['La recta tangente indica F(0)=12ln(2); esto determina la constante.','−4+12ln(2)+C=12ln(2) ⇒ C=4'],
['Derivamos para verificar la primitiva y comprobamos la pendiente de la tangente.','F′(x)=−4e^x+frac{12e^x}{1+e^x}=frac{8e^x−4e^{2x}}{1+e^x}; F′(0)=2'],
['Comprobamos la ecuación completa de la tangente, no solo el punto.','y=F(0)+F′(0)x=12ln(2)+2x'],
])];default:throw Error('Unknown case');}}
export function buildMetricParametersBatch(id='batch-0388',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=[];x.block=c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.index===156?'POWER_AREA_WITH_INDEPENDENT_QUADRATURE':c.index===176?'PARAMETER_LIMIT_WITH_INDEPENDENT_SERIES_CHECK':c.index===180?'TRIGONOMETRIC_TANGENCY_PARAMETER_SYSTEM':'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_METHOD_WITH_SOURCE_BOUND_PARAMETERS_AND_INDEPENDENT_SUBSTITUTION';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMetricParametersBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0388-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0388.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

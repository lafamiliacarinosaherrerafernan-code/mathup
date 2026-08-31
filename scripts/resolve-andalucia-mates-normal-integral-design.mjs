import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[260,'ffc7b024ef2abe93472bbafd9a890f0f2da04f1e105a1fa378ee1e074ea7fd79',2,'B.1','6d18b6d0eb46c1b0da9c189b9dbead5a748fb64072d598a86e8c10d2f36cc8d0',0],
[261,'82a981b064c7c77fadf9faecac5c219a4144a7a58a86a02d0c2efc78dc52f59a',1,'3','25e8b9b1afa3bbcaf3e681a667bf5b40a657366fd22ac6baec8245e360893541',0],
[262,'8989ece1dc4d1fafd724f1b38fa92b3d562a6ca1c4bd9a7b6ffd8a1b75f129f0',1,'4','5da3d44b9334ca2e9f7ff8ed81e6346342795ab8c251b58f2a514b11d5f954b6',0],
[265,'83fb1553a0210c1a82e5760e2664d28df565127e870fef743346b4bb30953bd8',1,'A.2','493681cf926bddef124fac9b9a49919c1e6fc9c73acec1e016adfd38fa80ce2c',0],
[266,'551735d3638bd7718cd818aa38a9fa2ede41bc06b23840cb6b358e8356ef0ecd',1,'A.1','e8e984d0811cca1dd03acaf99072168c1e4cc60ef64b4de4a0aef842dfc26056',0],
[269,'709f067c52eb7587dd9e7ca886e32e0417213d679ef7c084f3359d93290bb491',1,'A.2','13b01977c52e633ddc053c415adf023e44a73a3370f712b8ae88fa74da4662b2',0],
];
export const statements={
260:'Considera la función f:ℝ→ℝ definida por f(x)=frac{e^x+e^{−x}}{2}.\na) [2 puntos] Estudia y determina los intervalos de crecimiento y los intervalos de decrecimiento de f. Calcula los extremos relativos de f (abscisas donde se obtienen y valores que se alcanzan).\nb) [0,5 puntos] Halla la ecuación de la recta normal a la gráfica de f en el punto de abscisa x=0.',
261:'Sean las funciones f:(−1,0)∪(0,1)→ℝ y g:ℝ→ℝ, definidas por f(x)=ln(frac{x²}{e}) y g(x)=x³+2.\na) [1,5 puntos] Calcula a≠0 de forma que en el punto (a;f(a)) la recta normal a la gráfica de la función f sea paralela a la recta tangente a la gráfica de g en el punto (a;g(a)).\nb) [1 punto] Determina los intervalos de crecimiento y de decrecimiento de la función f.',
262:'Calcula ∫_0^1 x arctg(x) dx (donde arctg denota la función arcotangente).',
265:'[2,5 puntos] Calcula ∫ ln(frac{x²+1}{x}) dx (ln denota la función logaritmo neperiano).',
266:'[2,5 puntos] Se quiere construir un depósito abierto de base cuadrada y paredes verticales con capacidad para 13,5 metros cúbicos. Para ello se dispone de una chapa de acero de grosor uniforme. Calcula las dimensiones del depósito para que el gasto en chapa sea el mínimo posible.',
269:'[2,5 puntos] De la función f:ℝ→ℝ definida por f(x)=ax³+bx²+cx+d se sabe que alcanza un máximo relativo en x=1, que la gráfica tiene un punto de inflexión en (0;0) y que ∫_0^1 f(x) dx=frac{5}{4}. Calcula a, b, c y d.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_NORMAL_INTEGRAL_DESIGN_SOURCE_LAYOUT']]:[];
export const cases=[{index:260,literals:['ex + e−x','recta normal'],slot:2},{index:261,literals:['g(x) = x3 + 2','paralela'],slot:2},{index:262,literals:['x arctg (x) dx'],slot:3,whole:true},{index:265,literals:['x2 + 1','logaritmo neperiano'],slot:3,whole:true},{index:266,literals:['dep´osito abierto','13’5 metros'],slot:2,whole:true},{index:269,literals:['ax3 + bx2 + cx + d','x = 1'],slot:2,whole:true}];
export const proof=c=>({260:{critical:0,minimum:[0,1],normal:'x=0'},261:{a:-1/6,commonSlope:1/12},262:{integral:Math.PI/4-.5},265:{domain:'x>0',primitive:'x*log((x*x+1)/x)-x+2*atan(x)'},266:{baseSide:3,height:1.5,volume:13.5,area:27},269:{a:-1,b:0,c:3,d:0,integral:1.25,secondDerivativeAt1:-6}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_FUNCTION_WITH_INDEPENDENT_DERIVATIVE_INTEGRAL_OR_SUBSTITUTION_CHECK',proof(c));switch(c.index){
case 260:return[mk(0,'Decrece en (−∞;0), crece en (0;+∞); mínimo en (0;1), sin máximos.',['Crece en (−∞;0), decrece en (0;+∞); máximo en (0;1), sin mínimos.','Decrece en (−∞;0), crece en (0;+∞); mínimo en (0;0), sin máximos.','Crece en todo ℝ; no tiene extremos relativos.'],['Cambiar el signo de la derivada.','Evaluar mal las dos exponenciales en cero.','Omitir el signo negativo al derivar e elevado a menos x.'],[
['Ambas exponenciales son derivables en toda la recta real; no hay discontinuidades ni puntos excluidos.','Dom(f)=ℝ'],
['Derivamos respetando la regla de la cadena en la segunda exponencial.','f′(x)=frac{e^x−e^{−x}}{2}'],
['Igualamos la derivada a cero y usamos la inyectividad de la exponencial.','e^x=e^{−x} ⇒ e^{2x}=1 ⇒ x=0'],
['Multiplicar por el número positivo 2e elevado a x no cambia el signo de la derivada.','signo(f′)=signo(e^{2x}−1): negativo si x<0; positivo si x>0'],
['La función decrece antes del cero y crece después: el punto crítico es un mínimo y no hay más extremos.','f(0)=frac{1+1}{2}=1; mínimo relativo: (0;1)'],
['Comprobamos además que ese mínimo es absoluto mediante una identidad no negativa.','f(x)−1=frac{(e^{x/2}−e^{−x/2})²}{2}≥0'],
]),mk(1,'Recta normal: x=0.',['Recta normal: y=1.','Recta normal: y=x+1.','Recta normal: y=−x+1.'],['Confundir la tangente horizontal con la normal.','Asignar pendiente uno a una perpendicular a la horizontal.','Asignar pendiente menos uno sin aplicar la perpendicularidad.'],[
['Calculamos el punto de la gráfica indicado por la abscisa.','P=(0;f(0))=(0;1)'],
['Evaluamos la derivada para obtener la dirección tangente.','f′(0)=frac{1−1}{2}=0'],
['La tangente tiene pendiente cero y pasa por P.','Tangente: y=1'],
['La normal es perpendicular a esa recta horizontal: debe ser vertical. No se puede dividir por una pendiente nula.','Dirección tangente: (1;0); normal: (0;1)'],
['La recta vertical por el punto P tiene abscisa constante cero.','Normal: x=0'],
['Verificamos simultáneamente el paso por P y la perpendicularidad de los vectores directores.','P cumple x=0; (1;0)·(0;1)=0'],
])];
case 261:return[mk(0,'a=−frac{1}{6}.',['a=frac{1}{6}.','a=0.','a=−frac{1}{3}.'],['Olvidar el signo negativo de la pendiente normal.','Conservar la raíz cero a pesar de estar excluida del dominio.','Perder el factor dos al calcular la pendiente normal.'],[
['Reescribimos la función para derivar sin perder el dominio: el valor absoluto es necesario para x negativo.','f(x)=2ln|x|−1; x∈(−1;0)∪(0;1)'],
['Calculamos la pendiente de la tangente a f y la de su normal, usando que a no es cero.','f′(a)=frac{2}{a}; m_N=−frac{a}{2}'],
['La pendiente tangente a g se obtiene de su derivada.','g′(x)=3x²; m_T=3a²'],
['Dos rectas son paralelas si sus pendientes coinciden. Resolvemos y descartamos el valor prohibido.','−frac{a}{2}=3a² ⇒ a(6a+1)=0; a≠0 ⇒ a=−frac{1}{6}'],
['Comprobamos que el resultado pertenece al dominio y que ambas pendientes coinciden.','−1<−frac{1}{6}<0; m_N=frac{1}{12}=3·frac{1}{36}=m_T'],
['La condición también equivale a que las tangentes sean perpendiculares en esas abscisas, lo que confirma el signo y el factor.','f′(−frac{1}{6})=−12; g′(−frac{1}{6})=frac{1}{12}; producto=−1'],
]),mk(1,'Decrece en (−1;0) y crece en (0;1).',['Crece en (−1;0) y decrece en (0;1).','Crece en (−1;0) y en (0;1).','Decrece en (−1;0) y en (0;1).'],['Cambiar el signo global de la derivada.','Sustituir x por su valor absoluto en la derivada sin regla de la cadena.','Suponer negativa la derivada a ambos lados del cero.'],[
['Conservamos exactamente los dos intervalos del dominio oficial. El cero no pertenece a ninguno.','D=(−1;0)∪(0;1)'],
['Derivamos el logaritmo compuesto, simplificando después.','f′(x)=frac{2x/e}{x²/e}=frac{2}{x}'],
['En el intervalo negativo el numerador es positivo y el denominador negativo.','−1<x<0 ⇒ f′(x)<0'],
['En el intervalo positivo ambos términos del cociente son positivos.','0<x<1 ⇒ f′(x)>0'],
['Aplicamos el criterio de monotonía por separado, sin unir intervalos a través de un punto donde no existe la función.','Decreciente: (−1;0); creciente: (0;1)'],
['Como verificación, x² disminuye hacia cero en el intervalo negativo y aumenta en el positivo; el logaritmo conserva esas ordenaciones.','f(−frac{1}{2})>f(−frac{1}{4}); f(frac{1}{4})<f(frac{1}{2})'],
])];
case 262:return[mk(0,'Integral=frac{π}{4}−frac{1}{2}.',['Integral=frac{π}{8}−frac{1}{2}.','Integral=frac{1}{2}.','Integral=frac{π}{4}+frac{1}{2}.'],['Omitir la contribución de arcotangente al integrar la fracción racional.','Cambiar el signo de la integral restante en la fórmula por partes.','Cambiar el signo del término lineal en la primitiva.'],[
['El integrando es continuo en el intervalo cerrado, por lo que podemos aplicar integración por partes y Barrow.','I=∫_0^1 x arctg(x) dx'],
['Elegimos como u la arcotangente para que su derivada sea racional.','u=arctg(x); dv=x dx; du=frac{dx}{1+x²}; v=frac{x²}{2}'],
['Aplicamos la fórmula por partes manteniendo el signo de resta.','I=frac{π}{8}−0−frac{1}{2}∫_0^1 frac{x²}{1+x²}dx'],
['Descomponemos la fracción racional y calculamos su integral definida.','frac{x²}{1+x²}=1−frac{1}{1+x²}\nG(x)=x−arctg(x); G(1)−G(0)=1−frac{π}{4}'],
['Sustituimos las evaluaciones y simplificamos sin perder el factor un medio.','I=frac{π}{8}−frac{1}{2}(1−frac{π}{4})=frac{π}{4}−frac{1}{2}'],
['Una primitiva alternativa reúne las dos arcotangentes. Su derivada vuelve al integrando y el resultado es positivo, como exige el intervalo.','H(x)=frac{x²+1}{2}arctg(x)−frac{x}{2}\nH′(x)=x arctg(x); I≈0,285398'],
])];
case 265:return[mk(0,'x ln(frac{x²+1}{x})−x+2arctg(x)+C, para x>0.',['x ln(frac{x²+1}{x})−x+arctg(x)+C, para x>0.','x ln(frac{x²+1}{x})−x−2arctg(x)+C, para x>0.','x ln(frac{x²+1}{x})+x+2arctg(x)+C, para x>0.'],['Perder el factor dos al separar la fracción racional.','Cambiar el signo de la integral de uno sobre uno más x cuadrado.','Cambiar el signo del término lineal al aplicar integración por partes.'],[
['El argumento del logaritmo debe ser positivo. Como el numerador siempre lo es, el dominio real es x positivo.','frac{x²+1}{x}>0 ⇔ x>0'],
['Integramos por partes: u es el logaritmo y dv es dx.','u=ln(frac{x²+1}{x}); dv=dx; v=x'],
['Calculamos du usando la diferencia de logaritmos válida en ese dominio.','u=ln(x²+1)−ln(x)\nu′=frac{2x}{x²+1}−frac{1}{x}=frac{x²−1}{x(x²+1)}'],
['El producto x por la derivada se simplifica en una constante y una fracción integrable.','∫u dx=xu−∫frac{x²−1}{x²+1}dx\nfrac{x²−1}{x²+1}=1−frac{2}{x²+1}'],
['Integramos los términos restantes y añadimos la constante arbitraria.','H(x)=x ln(frac{x²+1}{x})−x+2arctg(x)+C'],
['La comprobación por derivación cancela exactamente los términos racionales adicionales.','H′=u+frac{x²−1}{x²+1}−1+frac{2}{x²+1}=u'],
])];
case 266:return[mk(0,'Lado de la base: 3 m; altura: 1,5 m.',['Lado de la base: 1,5 m; altura: 6 m.','Lado de la base: 6 m; altura: 0,375 m.','Lado de la base: (13,5)^{1/3} m; altura: (13,5)^{1/3} m.'],['Intercambiar la relación óptima entre lado y altura manteniendo el volumen.','Duplicar el lado y compensar la altura sin minimizar la chapa.','Añadir una tapa inexistente y obtener un cubo.'],[
['Llamamos x al lado de la base e h a la altura. Ambas longitudes son positivas y el volumen está fijado.','x²h=13,5 ⇒ h=frac{13,5}{x²}; x>0'],
['El depósito no tiene tapa: la chapa cubre una base cuadrada y cuatro paredes.','S=x²+4xh=x²+frac{54}{x}'],
['Derivamos la superficie y buscamos el único punto crítico positivo.','S′=2x−frac{54}{x²}=frac{2x³−54}{x²}; S′=0 ⇒ x³=27 ⇒ x=3'],
['El denominador es positivo: la derivada es negativa antes de tres y positiva después. Es un mínimo global.','0<x<3: S′<0; x>3: S′>0'],
['Recuperamos la altura y comprobamos volumen y superficie.','h=frac{13,5}{9}=1,5 m\nV=9·1,5=13,5 m³; S=9+4·3·1,5=27 m²'],
['Como comprobación independiente, la superficie es estrictamente convexa y diverge en los dos extremos del dominio.','S″=2+frac{108}{x³}>0; lim_{x→0^+}S=+∞; lim_{x→+∞}S=+∞'],
])];
case 269:return[mk(0,'a=−1; b=0; c=3; d=0.',['a=1; b=0; c=−3; d=0.','a=−5; b=0; c=15; d=0.','a=−1; b=0; c=−3; d=0.'],['Cambiar el signo al resolver la ecuación de la integral y convertir el máximo en mínimo.','Perder el factor cinco al simplificar la integral.','Cambiar el signo al despejar c de la condición de estacionariedad.'],[
['El punto de inflexión pertenece a la gráfica y su abscisa anula la segunda derivada.','f(0)=0 ⇒ d=0; f″(x)=6ax+2b; f″(0)=0 ⇒ b=0'],
['El máximo relativo en uno exige derivada nula. Usamos b igual a cero.','f′(x)=3ax²+c; f′(1)=0 ⇒ c=−3a'],
['La integral definida proporciona la ecuación que falta; integramos el polinomio reducido.','∫_0^1(ax³+cx)dx=frac{a}{4}+frac{c}{2}=frac{5}{4}'],
['Sustituimos la relación entre c y a y resolvemos.','frac{a}{4}−frac{3a}{2}=−frac{5a}{4}=frac{5}{4} ⇒ a=−1; c=3'],
['Verificamos que el punto estacionario es realmente máximo y que hay cambio de concavidad en el origen.','f(x)=−x³+3x; f″(1)=−6<0\nf″(x)=−6x cambia de signo en 0; f(0)=0'],
['Comprobamos por sustitución la integral original y la derivada en uno.','∫_0^1(−x³+3x)dx=−frac{1}{4}+frac{3}{2}=frac{5}{4}; f′(1)=−3+3=0'],
])];default:throw Error('Unknown source case');}}
export function buildNormalIntegralDesignBatch(id='batch-0400',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===3?(c.index===265?'Integrales indefinidas':'Integrales definidas y áreas'):'Aplicaciones de derivadas';x.secondaryTopics=[];x.block='Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===265?'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION':c.slot===3?'DEFINITE_INTEGRAL_WITH_INDEPENDENT_QUADRATURE':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildNormalIntegralDesignBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0400-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0400.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

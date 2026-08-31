import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[226,'c8b05a337bf20174030e53cf793cfb12a4b4816f83b323c6b9e660adb65e0761',1,'A.2','8dbd8a6c8b8ce76785f2886cffea3f96cb7b4642689c4753580b40fe07949e36',0],
[228,'1a0767cc65a38fb4b848a65db6b624112758b901e6c99ef4da1ae1276214341f',1,'3','73cff0e29a30461fd38608c5b35fda4fde97843769df156c40404aa6eb058c49',0],
[231,'cffd05495fa4301b4e76dd5e5b7c988c832efe62e752189fc6d3d34042dd9516',2,'B.1','69225f7d3e89cd5e4768d2070412b2947461fffb124a68a52e24f9e40c030ac7',0],
[235,'ef4c082dc9a17eb27b09d51b09e1e41f1e7192efb6fd3b64b1b852471e928740',1,'1','9a983a6976a1f6eff443ed2769253b872451a8e46c7d74e25ad7f9cfb54e0f2f',0],
[238,'ef4c082dc9a17eb27b09d51b09e1e41f1e7192efb6fd3b64b1b852471e928740',2,'5','c722cce02a66e6e62eebbb59e0c3303ed782c145d6ec72bbddcd2d852945b728',0],
];
export const statements={
226:'Considera la función continua f:ℝ→ℝ definida por\nf(x)=piecewise{(3x−6)e^x si x≤0;frac{36(sen(x)−ax)}{x³} si x>0}\na) Calcula a. [1,5 puntos]\nb) Halla la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=−1. [1 punto]',
228:'Calcula el valor de k para que ∫_1^{3}e^{x−k}(x−2)dx=2.',
231:'Considera la función f:ℝ→ℝ dada por f(x)=ax³+bx²+cx+d. Calcula a, b, c y d sabiendo que f tiene un extremo relativo en (0;1) y su gráfica un punto de inflexión en (1;−1).',
235:'Sabiendo que lim_{x→0} frac{xe^x−ln(1+x)−(a+1)x}{x²} es finito, calcula a y el valor del límite (ln denota la función logaritmo neperiano).',
238:'Sea f la función definida por f(x)=frac{|x|}{2−x} para x≠2.\na) Estudia la derivabilidad de f. [1,25 puntos]\nb) Determina los intervalos de crecimiento y de decrecimiento de f. [1,25 puntos]',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CONTINUITY_TANGENCY_SOURCE_LAYOUT']]:[];
export const cases=[{index:226,literals:['36(sen(x) − ax)','x = −1'],topic:'Continuidad y derivabilidad',slot:2},{index:228,literals:['ex−k(x − 2)','= 2'],whole:true,topic:'Integrales definidas y áreas',slot:3},{index:231,literals:['extremo relativo en (0, 1)','inﬂexión en (1, −1)'],whole:true,topic:'Aplicaciones de derivadas',slot:2},{index:235,literals:['xex − ln(1 + x) − (a + 1)x','es ﬁnito'],whole:true,topic:'Límites y asíntotas',slot:2},{index:238,literals:['|x|','derivabilidad'],topic:'Continuidad y derivabilidad',slot:2}];
export const proof=c=>c.index===226?{a:1,rightLimit:-6,point:[-1,-9/Math.E],slope:-6/Math.E,intercept:-15/Math.E}:c.index===228?{k:1,value:2,primitive:'e^(x-k)*(x-3)'}:c.index===231?{a:1,b:-3,c:0,d:1,extremum:[0,1],inflection:[1,-1]}:c.index===235?{a:-1,limit:1.5,firstOrderCoefficient:'-(a+1)',secondOrderCoefficient:1.5}:{leftDerivative:-.5,rightDerivative:.5,excluded:[0,2],decreasing:[[-Infinity,0]],increasing:[[0,2],[2,Infinity]]};
export function solve(c,source=statements[c.index]){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_CALCULUS_WITH_INDEPENDENT_LIMIT_DERIVATIVE_QUADRATURE',proof(c));switch(c.index){
case 226:return[mk(0,'a=1.',['a=−1.','a=0.','a=6.'],['Cambiar el signo al cancelar el término lineal.','Ignorar el término de primer orden del seno.','Confundir el coeficiente con el valor absoluto de f(0).'],[
['La rama izquierda es continua y proporciona el valor y el límite por la izquierda.','f(0)=(−6)e^0=−6'],
['Para continuidad, la rama derecha debe tener límite finito igual a ese valor.','lim_{x→0+}frac{36(sen(x)−ax)}{x³}=−6'],
['Usamos el límite fundamental sen(x)/x→1: si a no es uno queda un término no nulo dividido por x al cuadrado.','frac{36(sen(x)−ax)}{x³}=frac{36}{x²}(frac{sen(x)}{x}−a); a=1 es necesario'],
['Con a=1 hay indeterminación cero entre cero. Aplicamos L’Hôpital tres veces, válido en un entorno derecho de cero.','lim_{x→0+}frac{sen(x)−x}{x³}=lim_{x→0+}frac{cos(x)−1}{3x²}=lim_{x→0+}frac{−sen(x)}{6x}=lim_{x→0+}frac{−cos(x)}{6}=−frac{1}{6}'],
['El factor 36 produce exactamente el valor de la rama izquierda.','36·(−frac{1}{6})=−6=f(0)'],
['Comprobación independiente por desarrollo local; las otras ramas ya son continuas en sus intervalos.','sen(x)−x=−frac{x³}{6}+o(x³); a=1 garantiza continuidad en todo ℝ'],
]),mk(1,'y=frac{−6x−15}{e}.',['y=frac{−9x−18}{e}.','y=frac{6x−3}{e}.','y=frac{−6x−9}{e}.'],['Tomar f(−1) como pendiente.','Cambiar el signo de la pendiente.','Olvidar trasladar la abscisa −1 en la fórmula punto-pendiente.'],[
['El punto x=−1 está en el interior de la rama izquierda: no se deriva la expresión trigonométrica.','f(x)=(3x−6)e^x en un entorno de −1'],
['Evaluamos la ordenada del punto de tangencia.','f(−1)=(−3−6)e^{−1}=−frac{9}{e}'],
['Aplicamos la regla del producto y reunimos términos.','f′(x)=3e^x+(3x−6)e^x=(3x−3)e^x'],
['Evaluamos la pendiente y escribimos la forma punto-pendiente.','m=f′(−1)=−frac{6}{e}; y+frac{9}{e}=−frac{6}{e}(x+1)'],
['Despejamos la ordenada sin perder el término de traslación.','y=frac{−6x−15}{e}'],
['Comprobamos ordenada y pendiente; ambas condiciones son necesarias para que sea la tangente.','y(−1)=−frac{9}{e}=f(−1); y′=−frac{6}{e}=f′(−1)'],
])];
case 228:return[mk(0,'k=1.',['k=0.','k=−1.','k=2.'],['Omitir el uno de la evaluación del exponente en el extremo inferior.','Cambiar el signo al despejar 1−k=0.','Confundir el valor de la integral con el parámetro.'],[
['k es constante respecto de x. La integranda es continua en el intervalo cerrado para cualquier k real.','I(k)=∫_1^{3}e^{x−k}(x−2)dx'],
['Integramos por partes: derivamos el factor lineal e integramos la exponencial.','u=x−2; du=dx; dv=e^{x−k}dx; v=e^{x−k}'],
['Obtenemos una primitiva y la verificamos mediante derivación.','F(x)=e^{x−k}(x−2)−e^{x−k}=e^{x−k}(x−3); F′(x)=e^{x−k}(x−2)'],
['Aplicamos Barrow; el extremo superior se anula y el inferior es negativo.','I(k)=0−e^{1−k}(1−3)=2e^{1−k}'],
['Igualamos a dos y utilizamos la inyectividad de la exponencial real.','2e^{1−k}=2 ⇒ e^{1−k}=1 ⇒ 1−k=0 ⇒ k=1'],
['Comprobación por sustitución y control numérico independiente de la integral con cambio de signo en x=2.','I(1)=2e^0=2; I(0)=2e; I(−1)=2e²; I(2)=frac{2}{e}'],
])];
case 231:return[mk(0,'a=1; b=−3; c=0; d=1.',['a=−1; b=3; c=0; d=1.','a=2; b=−6; c=0; d=1.','a=1; b=−3; c=1; d=1.'],['Cambiar el signo de la ordenada del punto de inflexión.','Duplicar a al resolver la condición de paso por el punto.','Confundir la ordenada del extremo con el valor de la primera derivada.'],[
['Un extremo relativo en (0;1) exige que la gráfica pase por el punto y que se anule su derivada.','f(0)=1 ⇒ d=1; f′(0)=0 ⇒ c=0'],
['Derivamos dos veces el polinomio con parámetros.','f′(x)=3ax²+2bx+c; f″(x)=6ax+2b'],
['El punto de inflexión pertenece a la gráfica y obliga a anular la segunda derivada, por ser un polinomio.','f(1)=−1 ⇒ a+b+c+d=−1; f″(1)=0 ⇒ 6a+2b=0'],
['Sustituimos las primeras condiciones y resolvemos el sistema restante.','b=−3a; a+b=−2 ⇒ −2a=−2 ⇒ a=1; b=−3'],
['Comprobamos las dos ordenadas y la existencia real del extremo, no solo la condición necesaria.','f(x)=x³−3x²+1; f(0)=1; f(1)=−1; f″(0)=−6<0: máximo relativo'],
['Verificamos cambio de concavidad en x=1 y descartamos un falso punto de inflexión.','f″(x)=6(x−1): negativa para x<1 y positiva para x>1; f‴(x)=6≠0'],
])];
case 235:return[mk(0,'a=−1; límite=frac{3}{2}.',['a=1; límite=frac{3}{2}.','a=−1; límite=frac{1}{2}.','a=−1; límite=2.'],['Cancelar incorrectamente el término lineal a+1.','Perder la contribución cuadrática de xe elevado a x.','Cambiar el signo del término cuadrático de ln(1+x).'],[
['La función está definida en un entorno de cero porque 1+x es positivo. El numerador vale cero al sustituir x=0.','N(x)=xe^x−ln(1+x)−(a+1)x; N(0)=0'],
['Si N(x)/x² tiene límite finito, entonces N(x)/x debe tender a cero; por derivabilidad, eso exige N′(0)=0.','N′(x)=(1+x)e^x−frac{1}{1+x}−(a+1); N′(0)=−(a+1)'],
['Despejamos el único parámetro posible antes de calcular el límite.','−(a+1)=0 ⇒ a=−1'],
['Con ese valor, numerador y denominador se anulan a primer orden; L’Hôpital produce otra indeterminación cero entre cero.','lim_{x→0}frac{xe^x−ln(1+x)}{x²}=lim_{x→0}frac{(1+x)e^x−frac{1}{1+x}}{2x}'],
['Aplicamos L’Hôpital por segunda vez y evaluamos una expresión ya continua.','lim_{x→0}frac{(2+x)e^x+frac{1}{(1+x)²}}{2}=frac{2+1}{2}=frac{3}{2}'],
['Comprobación independiente con los términos hasta segundo orden; cualquier otro a deja un término que diverge como uno entre x.','xe^x=x+x²+o(x²); ln(1+x)=x−frac{x²}{2}+o(x²); N(x)=−(a+1)x+frac{3x²}{2}+o(x²)'],
])];
case 238:return[mk(0,'Derivable en ℝ∖{0;2}; f′(0−)=−frac{1}{2}, f′(0+)=frac{1}{2}.',['Derivable en ℝ∖{2}; f′(0)=0.','Derivable en ℝ∖{0}; f′(2)=0.','Derivable en ℝ∖{0;2}; f′(0−)=frac{1}{2}, f′(0+)=−frac{1}{2}.'],['Confundir continuidad en cero con derivabilidad.','Olvidar la exclusión del denominador nulo.','Intercambiar los signos de las derivadas laterales.'],[
['El denominador se anula en dos, que queda fuera del dominio. Retiramos el valor absoluto según el signo de x.','f(x)=piecewise{frac{−x}{2−x} si x<0;frac{x}{2−x} si x≥0, x≠2}'],
['En los intervalos abiertos de cada rama derivamos mediante la regla del cociente.','f′(x)=piecewise{frac{−2}{(2−x)²} si x<0;frac{2}{(2−x)²} si x>0, x≠2}'],
['En cero las dos ramas se unen de forma continua, pero eso no basta para asegurar derivabilidad.','f(0)=0; lim_{x→0−}f(x)=lim_{x→0+}f(x)=0'],
['Calculamos los cocientes incrementales laterales directamente a partir de la definición.','frac{f(h)−f(0)}{h}=piecewise{frac{−1}{2−h} si h<0;frac{1}{2−h} si h>0}'],
['Los límites laterales son distintos; por tanto existe un punto anguloso en cero.','f′(0−)=−frac{1}{2}≠frac{1}{2}=f′(0+): f′(0) no existe'],
['Fuera de cero y dos cada rama es racional con denominador no nulo, por lo que es derivable.','Conjunto de derivabilidad: (−∞;0)∪(0;2)∪(2;+∞)'],
]),mk(1,'Decrece en (−∞;0); crece en (0;2) y (2;+∞).',['Crece en (−∞;0); decrece en (0;2) y (2;+∞).','Decrece en (−∞;0) y (2;+∞); crece en (0;2).','Decrece en (−∞;2); crece en (2;+∞).'],['Intercambiar los signos de las derivadas de ambas ramas.','Asignar signo negativo al denominador elevado al cuadrado cuando x es mayor que dos.','Ignorar el cambio de rama del valor absoluto en cero.'],[
['Separamos el dominio por el punto anguloso y por la discontinuidad; no unimos intervalos atravesando dos.','Intervalos: (−∞;0), (0;2), (2;+∞)'],
['El denominador al cuadrado siempre es positivo donde la función está definida.','(2−x)²>0 para x≠2'],
['En la rama negativa el numerador de la derivada es negativo.','f′(x)=frac{−2}{(2−x)²}<0 para x<0: decreciente'],
['En las dos componentes positivas del dominio el numerador de la derivada es positivo.','f′(x)=frac{2}{(2−x)²}>0 para 0<x<2 y para x>2: creciente'],
['El signo pasa de negativo a positivo al atravesar cero: hay un mínimo relativo aunque no exista derivada en ese punto.','f(0)=0; mínimo relativo en (0;0)'],
['Contrastamos la variación con valores de cada intervalo, sin considerar este muestreo sustituto del estudio de signo.','f(−2)=frac{1}{2}>f(−1)=frac{1}{3}; f(1)=1<f(frac{3}{2})=3; f(3)=−3<f(4)=−2'],
])];default:throw Error('Unknown calculus case');}}
export function buildContinuityTangencyBatch(id='batch-0395',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===226?['Límites y asíntotas','Derivadas']:[];x.block='Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===228?'DEFINITE_SUBSTITUTION_WITH_INDEPENDENT_QUADRATURE':c.index===231?'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE':c.index===238?'LOGARITHMIC_ASYMPTOTES_AND_PIECEWISE_DIFFERENTIABILITY':'PARAMETER_LIMIT_WITH_INDEPENDENT_SERIES_CHECK'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_CALCULUS_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildContinuityTangencyBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0395-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0395.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

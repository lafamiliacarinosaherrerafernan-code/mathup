import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[569,'67593e6ffe6b4e602cf2a0d3b68d10dd2038435a99caf87bc3c83a2f80b2785a',1,'A.1','8e557df5742037c799a66370bcfd5a77990749179d4b33ae82640f4bddb7711a',0],
[571,'2852db48391a57842be2fd949b4d1d8f1640f5a415cd5beb0691954ee488a191',2,'B.1','64e157b2e928dbb8a8724444e46012776205646cbec4059e08228ce1498d1481',0],
[575,'274813eec3b9f750ba00990349dadeb4d837e92c96633e2e02da4e99b2951b34',2,'B.2','d3e12e7c38cb0c974e0e83505ae5bc22c30a88c7c030fde7168eff3af4f5a5fd',0],
[577,'0ea3fd4fc59736e3847d6552e64377975175a3605c7742e73d7a41dbf219269c',2,'B.1','d31aa083a635f684d477cd32b8ae4c2a1a7ea3c592213e538aed4bef144719e1',0],
[578,'c1053dad9ef9e6ce58aeea7d171758b8b6aec6014f2dfbec91a9ace85f5136e5',2,'B.2','e5f32094bf11f28fa052bdcb95e5ac3ca93f5be474c7362f7e8f44e25f3638ef',0],
[598,'8f26bd61ad72286c9619dd2a285b762aa5a353de3a134f51beb40e7bde69c151',2,'B.1','150da6ef042299842f63b497790e6b1330efcec3a64132da015b8eff99bfc9a3',0]];
export const statements={
569:'Sea f:(−1,+∞)→ℝ la función definida por f(x)=frac{ln(x+1)+a}{3x+4} (ln denota la función logaritmo neperiano).\na) Determina a sabiendo que la pendiente de la recta tangente a la gráfica de la función f en el punto de abscisa x=0 es 1.\nb) Para a=0, estudia y calcula las asíntotas de f.',
571:'Considera la función f:ℝ→ℝ dada por f(x)=cases{−xe^{x−1}&si x≤0;xe^{x−1}&si 0<x≤1;xe^{1−x}&si 1<x}.\na) Estudia la derivabilidad de f en x=0 y en x=1.\nb) Estudia la existencia de asíntotas horizontales de la gráfica de f.',
575:'Calcula ∫₀^{π/2} x sen(2x) dx.',
577:'Determina a y b sabiendo que b>0 y que la función f:ℝ→ℝ definida como f(x)=cases{a cos(x)+2x&si x<0;a²ln(x+1)+frac{b}{x+1}&si x≥0} es derivable. (ln denota la función logaritmo neperiano).',
578:'Halla ∫ frac{e^x}{(e^{2x}−1)(e^x+1)} dx. Sugerencia: efectúa el cambio de variable t=e^x.',
598:'Sea f:ℝ→ℝ la función definida por f(x)=x³+bx²+cx+d. Halla b, c y d sabiendo que f tiene un máximo relativo en x=−1 y que lim_{x→1} frac{f(x)}{x−1}=4.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_LOG_GLUING_SOURCE_LAYOUT']]:[];
export const cases=[{index:569,slot:2,literals:['ln (x + 1) + a','3x + 4']},{index:571,slot:2,literals:['derivabilidad','asíntotas horizontales']},{index:575,slot:3,whole:true,literals:['x sen(2x)']},{index:577,slot:2,whole:true,literals:['b > 0','a cos(x) + 2x']},{index:578,slot:3,whole:true,literals:['e2x − 1','ex + 1']},{index:598,slot:2,whole:true,literals:['bx2 + cx + d','x = −1']}];
export const proof=c=>({569:{a:-4,vertical:-1,horizontal:0},571:{slopes0:[-1/Math.E,1/Math.E],slopes1:[2,0],limits:[0,0]},575:{integral:Math.PI/4},577:{parameters:[2,2],continuity:'a=b',derivative:'a^2-b=2'},578:{partialFractions:[.25,-.25,-.5],domain:'x!=0'},598:{coefficients:[1,-1,-1],derivativeAtMinusOne:0,secondDerivative:-4,limit:4}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_AND_INDEPENDENT_DERIVATIVE_OR_QUADRATURE',proof(c));switch(c.index){
case 569:return[mk(0,'a=−4.',['a=4.','a=−12.','a=0.'],['Cambiar el signo al despejar el parámetro.','Omitir la división por tres en la ecuación de la pendiente.','Suponer que la función pasa por el origen aunque solo se fija una pendiente.'],[
['La pendiente de la tangente es el valor de la derivada en la abscisa indicada.','f′(0)=1'],
['Aplicamos la regla del cociente al numerador logarítmico y al denominador lineal.','f′(x)=frac{frac{3x+4}{x+1}−3(ln(x+1)+a)}{(3x+4)²}'],
['Sustituimos x=0 usando ln(1)=0.','f′(0)=frac{4−3a}{16}'],
['Igualamos la expresión a la pendiente oficial.','frac{4−3a}{16}=1 ⇒ 4−3a=16'],
['Resolvemos la ecuación lineal.','−3a=12 ⇒ a=−4'],
['Sustituimos el parámetro obtenido para comprobar la pendiente.','f′(0)=frac{4−3(−4)}{16}=1'],
]),mk(1,'Asíntota vertical x=−1; horizontal y=0 en +∞; no hay oblicua.',['Asíntota vertical x=−frac{4}{3}; horizontal y=0 en +∞; no hay oblicua.','Asíntota vertical x=−1; horizontal y=frac{1}{3} en +∞; no hay oblicua.','No hay asíntota vertical; horizontal y=0 en +∞; no hay oblicua.'],['Usar un cero del denominador situado fuera del cierre del dominio real.','Tratar ln(x+1) como si creciera linealmente con pendiente uno.','Ignorar la divergencia del logaritmo en el extremo del dominio.'],[
['Con a=0 el dominio dado es x>−1 y en él el denominador no se anula.','f(x)=frac{ln(x+1)}{3x+4}; 3x+4>1'],
['El extremo finito accesible del dominio es −1; estudiamos el límite por la derecha.','x→−1⁺: ln(x+1)→−∞; 3x+4→1'],
['El límite infinito acredita la asíntota vertical.','lim_{x→−1⁺} f(x)=−∞ ⇒ x=−1'],
['Para el infinito positivo usamos que el logaritmo crece más despacio que una función lineal.','lim_{x→+∞} frac{ln(x+1)}{3x+4}=lim_{x→+∞} frac{1}{3(x+1)}=0'],
['Existe asíntota horizontal y, por ello, no una oblicua de pendiente no nula.','y=0 en +∞'],
['No añadimos asíntotas en puntos inaccesibles desde el dominio.','−frac{4}{3}<−1; no puede aproximarse desde x>−1; no hay rama en −∞'],
])];
case 571:return[mk(0,'No es derivable en 0 ni en 1: f′₋(0)=−frac{1}{e}, f′₊(0)=frac{1}{e}; f′₋(1)=2, f′₊(1)=0.',['Es derivable en 0 y en 1: f′(0)=frac{1}{e}, f′(1)=0.','Es derivable en 0, pero no en 1: f′(0)=0; f′₋(1)=2, f′₊(1)=0.','No es derivable en 0, pero sí en 1: f′₋(0)=−frac{1}{e}, f′₊(0)=frac{1}{e}; f′(1)=1.'],['Derivar únicamente la rama derecha e ignorar las derivadas izquierdas.','Promediar pendientes laterales opuestas en cero.','Promediar las pendientes laterales en uno.'],[
['Comprobamos primero la continuidad en las dos uniones.','f(0)=0; lim_{x→0⁻} f(x)=lim_{x→0⁺} f(x)=0; f(1)=1'],
['Las ramas vecinas a uno también coinciden en valor.','lim_{x→1⁻} xe^{x−1}=1; lim_{x→1⁺} xe^{1−x}=1'],
['Derivamos cada expresión usando la regla del producto.','f′(x)=cases{−(1+x)e^{x−1}&x<0;(1+x)e^{x−1}&0<x<1;(1−x)e^{1−x}&x>1}'],
['Evaluamos las pendientes laterales en cero; no coinciden.','f′₋(0)=−frac{1}{e}; f′₊(0)=frac{1}{e}'],
['Evaluamos las pendientes laterales en uno; tampoco coinciden.','f′₋(1)=2; f′₊(1)=0'],
['La continuidad no basta: los cocientes incrementales tienen distintos límites laterales.','f no es derivable ni en x=0 ni en x=1'],
]),mk(1,'y=0 es asíntota horizontal tanto en −∞ como en +∞.',['y=0 es asíntota horizontal solo en +∞.','y=0 es asíntota horizontal solo en −∞.','No hay asíntotas horizontales en ninguno de los dos extremos.'],['Confundir el crecimiento de −x con el del producto con una exponencial decreciente.','Confundir el crecimiento de x con el del producto con una exponencial decreciente.','Suponer que un factor lineal impide cualquier límite finito.'],[
['En cada infinito debemos seleccionar la rama que corresponde a ese intervalo.','x→−∞: f(x)=−xe^{x−1}; x→+∞: f(x)=xe^{1−x}'],
['Para el infinito negativo cambiamos la variable por t=−x, que tiende a positivo infinito.','−xe^{x−1}=frac{t}{e^{t+1}}'],
['El denominador exponencial domina al numerador lineal.','lim_{t→+∞} frac{t}{e^{t+1}}=0'],
['En el infinito positivo escribimos también el producto como cociente.','xe^{1−x}=frac{ex}{e^x}'],
['Por crecimiento comparado, o por una aplicación de L’Hôpital, el límite vuelve a ser cero.','lim_{x→+∞} frac{ex}{e^x}=lim_{x→+∞} frac{e}{e^x}=0'],
['Los dos límites finitos determinan la misma recta horizontal en ambos extremos.','y=0 en −∞ y en +∞'],
])];
case 575:return[mk(0,'La integral vale frac{π}{4}.',['La integral vale −frac{π}{4}.','La integral vale frac{π}{2}.','La integral vale 0.'],['Perder el signo de cos(π) al evaluar la primitiva.','Olvidar el factor un medio que introduce la regla de la cadena.','Evaluar solo el término seno y olvidar el término x cos(2x).'],[
['Elegimos integración por partes porque el integrando es un producto de un polinomio y un seno.','u=x; dv=sen(2x) dx'],
['Derivamos u e integramos dv, incluyendo el factor de la cadena.','du=dx; v=−frac{1}{2}cos(2x)'],
['Aplicamos la fórmula de integración por partes.','∫x sen(2x)dx=−frac{x}{2}cos(2x)+frac{1}{2}∫cos(2x)dx'],
['Integramos el término restante.','F(x)=−frac{x}{2}cos(2x)+frac{1}{4}sen(2x)'],
['Evaluamos entre los límites que aparecen en el documento oficial.','F(π/2)−F(0)=−frac{π}{4}cos(π)+frac{1}{4}sen(π)=frac{π}{4}'],
['Comprobamos la primitiva por derivación: los términos de coseno se cancelan.','F′(x)=−frac{1}{2}cos(2x)+x sen(2x)+frac{1}{2}cos(2x)=x sen(2x)'],
])];
case 577:return[mk(0,'a=2 y b=2.',['a=−1 y b=−1.','a=2 y b=4.','a=−2 y b=2.'],['Conservar la raíz algebraica que incumple b>0.','Confundir la continuidad con la igualdad b=a².','Cambiar el signo de a al resolver las condiciones.'],[
['Las ramas son derivables en sus intervalos; la condición pendiente está en x=0. La derivabilidad exige continuidad.','lim_{x→0⁻} f(x)=a; f(0)=b ⇒ a=b'],
['Derivamos la rama izquierda y evaluamos su pendiente en cero.','f′₋(0)=−a sen(0)+2=2'],
['Derivamos la rama derecha, conservando el signo negativo de la derivada del recíproco.','f′(x)=frac{a²}{x+1}−frac{b}{(x+1)²}; f′₊(0)=a²−b'],
['Igualamos pendientes e introducimos la condición de continuidad.','a²−b=2; b=a ⇒ a²−a−2=0'],
['Factorizamos y aplicamos la condición oficial de positividad.','(a−2)(a+1)=0; b>0 ⇒ a=b=2'],
['Comprobamos tanto el valor como la pendiente de las dos ramas.','f(0⁻)=f(0)=2; f′₋(0)=2=f′₊(0)=4−2'],
])];
case 578:return[mk(0,'frac{1}{4}ln|frac{e^x−1}{e^x+1}|+frac{1}{2(e^x+1)}+C, en cada intervalo con x≠0.',['frac{1}{4}ln|frac{e^x−1}{e^x+1}|−frac{1}{2(e^x+1)}+C, en cada intervalo con x≠0.','frac{1}{2}ln|frac{e^x−1}{e^x+1}|+frac{1}{e^x+1}+C, en cada intervalo con x≠0.','frac{1}{4}ln|(e^x−1)(e^x+1)|+frac{1}{2(e^x+1)}+C, en cada intervalo con x≠0.'],['Integrar el término de polo doble con el signo incorrecto.','Duplicar todos los coeficientes de la descomposición racional.','Cambiar una diferencia de logaritmos por una suma.'],[
['Usamos el cambio sugerido; su diferencial absorbe exactamente el numerador.','t=e^x; dt=e^x dx; ∫frac{dt}{(t−1)(t+1)²}'],
['Descomponemos en fracciones simples, incluyendo dos términos para el factor repetido.','frac{1}{(t−1)(t+1)²}=frac{A}{t−1}+frac{B}{t+1}+frac{D}{(t+1)²}'],
['Multiplicamos por el denominador y comparamos coeficientes.','1=A(t+1)²+B(t−1)(t+1)+D(t−1); A=frac{1}{4}, B=−frac{1}{4}, D=−frac{1}{2}'],
['Integramos los términos simples y el polo doble.','F=frac{1}{4}ln|t−1|−frac{1}{4}ln|t+1|+frac{1}{2(t+1)}+C'],
['Volvemos a x; t es positivo y el único punto real excluido es x=0.','F=frac{1}{4}ln|frac{e^x−1}{e^x+1}|+frac{1}{2(e^x+1)}+C; x≠0'],
['Verificamos derivando respecto a t y multiplicando por dt/dx.','frac{dF}{dt}=frac{1}{4(t−1)}−frac{1}{4(t+1)}−frac{1}{2(t+1)²}=frac{1}{(t−1)(t+1)²}'],
])];
case 598:return[mk(0,'b=1, c=−1 y d=−1.',['b=−1, c=1 y d=−1.','b=1, c=−1 y d=1.','b=1, c=1 y d=−3.'],['Cambiar signos al combinar las ecuaciones de las derivadas.','Resolver el término independiente con el signo equivocado.','Olvidar la condición de derivada nula en el máximo.'],[
['El límite finito con denominador que tiende a cero exige que el numerador también se anule.','f(1)=0 ⇒ 1+b+c+d=0'],
['Con f(1)=0, el límite dado es la derivada de f en uno.','f′(1)=4 ⇒ 3+2b+c=4'],
['Un extremo relativo interior de un polinomio requiere derivada nula.','f′(−1)=0 ⇒ 3−2b+c=0'],
['Restamos las ecuaciones de las derivadas y luego calculamos c.','4b=4 ⇒ b=1; 3−2+c=0 ⇒ c=−1'],
['Usamos f(1)=0 para obtener d y comprobamos que el extremo es un máximo.','d=−1; f″(−1)=6(−1)+2=−4<0'],
['La factorización permite comprobar el límite sin recurrir al sistema anterior.','f(x)=(x−1)(x+1)² ⇒ lim_{x→1}frac{f(x)}{x−1}=4'],
])];default:throw Error('Unknown logarithmic gluing case');}}
export function buildLogGluingBatch(id='batch-0429',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===3?'Integrales definidas':'Continuidad y derivabilidad';x.secondaryTopics=[];x.block='Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===3?'OFFICIAL_INTEGRAL_METHOD':'OFFICIAL_FUNCTION_DERIVATIVE_LIMIT_CONDITIONS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLogGluingBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0429-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0429.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const allObservedPages=[
[396,'9e05f4d8647530063d69251cbcbf13e7f990abe224aca9576f2e95d1342e4b1b',1,'A.2','044f0ab73c867fd6cbd6e20d1a6d3aaa8dfb986a6484f8126979ef3af2ebd246',0],
[401,'7552fbca6211612f8e7009b2d2036dec3d7e33ceecbbd68eef88f6efe99c2007',1,'A.2','08a750d1ac3b816569f22bd4d0ee2904d7b487cca52d38f5389418cc31e1689a',0],
[412,'8a4fbdb778e76f41bc69fd26b30707ae55040cbe14cb93df5155dde32ea745a0',1,'A.1','96a9578562b49f99141416b52be5335a5624340e754edc6edbbff92cbcfbb26f',0],
[413,'5feecf28b9fa5a5f948bccfd561e04d39ec91c87e40f27baca54281076136f87',2,'B.1','0e67abaa1c6ce13aaa563a780317d7cc333f0436d24ae6151550324f7ce4f0bf',0],
[421,'638c1decf68db7761653ce6239400acc00ca5aff6d558ac22705b9864b909625',1,'A.1','df0db489f46ca0da400eefa62bd3b3cfb119e430687ad4c7ce8e8e4160c91576',0],
[422,'85a6693892f29847142a74b342f143d4d263e44abb0bbce055536058043080eb',2,'B.2','c1500d3c66a98c8399ade13113a1784988a9334478c4fbe53f2fd335e9cdea28',0],
[428,'3bd9605e8f19071b210561d6f59ee83139cc5e20f4ffa7e29a17fa4f08d1752a',2,'B.2','92c47b64c5346e21cd247dda624a1dd25234a6a1cd77bc43ceb85afda9fb606d',0]];
export const statements={
396:'Halla la ecuación de la recta tangente a la gráfica de una función f en el punto de abscisa x=1 sabiendo que f(0)=0 y f′(x)=frac{(x−1)²}{x+1} para x>−1.',
401:'Considera la función f definida por f(x)=a x ln(x)−b x para x>0 (ln denota la función logaritmo neperiano). Determina a y b sabiendo que f tiene un extremo relativo en x=1 y que ∫_{1}^{2} f(x) dx = 8ln(2)−9.',
412:'Sabiendo que lim_{x→0} frac{x cos(x)+b sen(x)}{x³} es finito, calcula b y el valor del límite.',
413:'Sea f la función definida por f(x)=frac{3x⁴+1}{x³} para x≠0.\na) Estudia las asíntotas de la gráfica de la función.\nb) Halla los intervalos de crecimiento y de decrecimiento, y los extremos relativos (abscisas donde se obtienen y valores que se alcanzan).',
421:'Sabiendo que lim_{x→0} (frac{1}{e^x−1}−frac{m}{2x}) es finito, calcula m y el valor del límite.',
422:'Sea f:(0,+∞)→ℝ la función definida por f(x)=x(1−ln(x)), donde ln denota la función logaritmo neperiano. Determina la primitiva de f cuya gráfica pasa por el punto P(1,1).',
428:'Sea f:[0,frac{π}{6}]→ℝ una función continua y sea F la primitiva de f que cumple F(0)=frac{π}{3} y F(frac{π}{6})=π. Calcula:\na) ∫_{0}^{π/6} (3f(x)−cos(x)) dx.\nb) ∫_{0}^{π/6} sen(F(x))·f(x) dx.'};
export const observations=allObservedPages.filter(o=>o[0]!==428);export const replacements=r=>r.queueIndex!==428&&statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_LOG_FTC_LIMITS_SOURCE_LAYOUT']]:[];
export const cases=[{index:396,slot:2,whole:true,literals:['tangente','f (0) = 0']},{index:401,slot:3,whole:true,literals:['a x ln (x)','extremo relativo']},{index:412,slot:2,whole:true,literals:['x cos(x) + b sen(x)']},{index:413,slot:2,literals:['3x4 + 1','extremos relativos']},{index:421,slot:2,whole:true,literals:['calcula m','2x']},{index:422,slot:3,whole:true,literals:['x(1 − ln(x))','P (1, 1)']},].filter(Boolean);
export const proof=c=>({396:{slope:0,ordinate:4*Math.log(2)-2.5},401:{a:4,b:4,integral:8*Math.log(2)-9},412:{b:-1,limit:-1/3},413:{pole:0,obliqueSlope:3,critical:[-1,1],values:[-4,4]},421:{m:2,limit:-.5},422:{quadratic:.75,logQuadratic:-.5,constant:.25},428:{F0:Math.PI/3,Fb:Math.PI,first:2*Math.PI-.5,second:1.5}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_CALCULUS_CHECK',proof(c));switch(c.index){
case 396:return[mk(0,'y=4ln(2)−frac{5}{2}.',['y=2ln(2)−frac{5}{2}.','y=4ln(2)−frac{7}{2}.','y=frac{5}{2}−4ln(2).'],['Perder el factor cuatro al integrar el cociente.','Olvidar ajustar la constante de integración mediante f(0)=0.','Invertir los extremos al aplicar Barrow.'],[
['La tangente en x=1 tiene pendiente f′(1). Sustituimos en la derivada dada.','f′(1)=frac{(1−1)²}{1+1}=0'],
['Necesitamos la ordenada f(1). Dividimos el numerador por x+1 para integrar la derivada.','frac{x²−2x+1}{x+1}=x−3+frac{4}{x+1}'],
['Integramos y añadimos una constante. El dominio x>−1 permite usar ln(x+1) sin valor absoluto.','f(x)=frac{x²}{2}−3x+4ln(x+1)+C'],
['Aplicamos el dato inicial y calculamos la ordenada en el punto de tangencia.','f(0)=C=0; f(1)=frac{1}{2}−3+4ln(2)=4ln(2)−frac{5}{2}'],
['Usamos la ecuación punto-pendiente. La recta es horizontal porque la pendiente es cero.','y−f(1)=f′(1)(x−1) ⇒ y=4ln(2)−frac{5}{2}'],
['Verificamos por el teorema fundamental: el cambio de f entre 0 y 1 es la integral de su derivada no negativa.','f(1)−f(0)=∫_{0}^{1} frac{(x−1)²}{x+1} dx = 4ln(2)−frac{5}{2}>0'],
])];
case 401:return[mk(0,'a=4; b=4.',['a=2; b=2.','a=4; b=−4.','a=−4; b=−4.'],['Reducir a la mitad la condición integral.','Cambiar el signo al imponer f′(1)=0.','Cambiar el signo de la integral definida.'],[
['La función es derivable en x>0. Un extremo interior en 1 exige derivada nula.','f′(x)=a(ln(x)+1)−b; f′(1)=a−b=0 ⇒ b=a'],
['Integramos x ln(x) por partes, mostrando ambos factores y el diferencial.','u=ln(x), dv=x dx ⇒ du=frac{1}{x} dx, v=frac{x²}{2}\n∫ x ln(x) dx = frac{x²}{2}ln(x)−frac{x²}{4}+C'],
['Con b=a, obtenemos una primitiva y evaluamos de 1 a 2.','H(x)=a(frac{x²}{2}ln(x)−frac{3x²}{4})\nH(2)−H(1)=a(2ln(2)−frac{9}{4})'],
['Igualamos al valor oficial. El coeficiente no es cero, pues ln(2)<1.','a(2ln(2)−frac{9}{4})=8ln(2)−9=4(2ln(2)−frac{9}{4}) ⇒ a=4; b=4'],
['Comprobamos que la condición de extremo es suficiente mediante el cambio de signo de la derivada.','f′(x)=4ln(x)<0 si 0<x<1; f′(x)>0 si x>1 ⇒ mínimo en x=1'],
['Verificamos el dato integral y la derivada de la primitiva con los parámetros ya determinados.','f(x)=4xln(x)−4x; H′(x)=f(x)\n∫_{1}^{2} f(x) dx = 8ln(2)−9'],
])];
case 412:return[mk(0,'b=−1; límite=−frac{1}{3}.',['b=1; límite=−frac{1}{3}.','b=−1; límite=−1.','b=−1; límite=frac{1}{3}.'],['Perder el signo de la cancelación del término lineal.','Olvidar el factor tres al derivar x³.','Invertir el signo de la derivada del coseno.'],[
['Si el cociente tiene límite finito, al multiplicarlo por x² debe tender a cero. Esto da una condición necesaria para b.','cos(x)+b frac{sen(x)}{x} →1+b=0 ⇒ b=−1'],
['Sustituimos ese valor antes de calcular el límite. Numerador y denominador tienden a cero.','L=lim_{x→0} frac{x cos(x)−sen(x)}{x³}; indeterminación 0/0'],
['Aplicamos L’Hôpital, permitido en Matemáticas II tras verificar 0/0. Derivamos el producto completo.','(x cos(x)−sen(x))′=cos(x)−x sen(x)−cos(x)=−x sen(x)'],
['La derivada del denominador es 3x². Simplificamos un factor x para x distinto de cero.','L=lim_{x→0} frac{−x sen(x)}{3x²}=−frac{1}{3} lim_{x→0} frac{sen(x)}{x}'],
['Usamos el límite fundamental del seno. El resultado existe por ambos lados y es finito.','lim_{x→0} frac{sen(x)}{x}=1 ⇒ L=−frac{1}{3}'],
['Comprobamos la cancelación por otra identidad: el numerador es la integral de −t sen(t) desde cero. Su término cúbico es negativo.','x cos(x)−sen(x)=−∫_{0}^{x} t sen(t) dt\nfrac{x cos(x)−sen(x)}{x³}→−frac{1}{3}'],
])];
case 413:return[mk(0,'Vertical: x=0. Oblicua: y=3x. Sin horizontales.',['Vertical: x=0. Oblicua: y=x. Sin horizontales.','Vertical: x=0. Oblicua: y=3x+1. Sin horizontales.','Sin verticales. Oblicua: y=3x. Sin horizontales.'],['Interpretar erróneamente el denominador oficial como 3x³.','Confundir 1/x³ con un término constante al obtener la ordenada de la asíntota.','Cancelar un factor x inexistente en el numerador 3x⁴+1.'],[
['Dividimos cada término del numerador entre x³, respetando que el denominador oficial no tiene coeficiente tres.','f(x)=3x+frac{1}{x³}; D=ℝ∖{0}'],
['Cerca de cero domina 1/x³. Los límites laterales son infinitos con signos distintos.','x→0⁺:f(x)→+∞; x→0⁻:f(x)→−∞ ⇒ asíntota x=0'],
['Para la asíntota oblicua y=mx+n calculamos primero la pendiente en ambos infinitos.','m=lim_{x→±∞} frac{f(x)}{x}=lim_{x→±∞}(3+frac{1}{x⁴})=3'],
['Restamos mx y calculamos el término independiente.','n=lim_{x→±∞}(f(x)−3x)=lim_{x→±∞}frac{1}{x³}=0'],
['La diferencia entre la función y la recta tiende a cero. La función no tiene límite finito en ningún infinito.','y=3x; no hay asíntotas horizontales'],
['El único punto excluido del dominio es cero, por lo que no quedan otros candidatos a asíntota vertical.','D=ℝ∖{0}; x=0 y y=3x son todas las asíntotas'],
]),mk(1,'Crece: (−∞;−1), (1;+∞). Decrece: (−1;0), (0;1). Máximo: (−1;−4). Mínimo: (1;4).',['Crece: (−1;0), (0;1). Decrece: (−∞;−1), (1;+∞). Mínimo: (−1;−4). Máximo: (1;4).','Crece: (−∞;−1), (1;+∞). Decrece: (−1;0), (0;1). Máximo: (−1;−frac{4}{3}). Mínimo: (1;frac{4}{3}).','Crece: (−∞;−1), (1;+∞). Decrece: (−1;1). Máximo: (−1;−4). Mínimo: (1;4).'],['Cambiar el signo de la derivada y permutar los tipos de extremo.','Evaluar otra función con denominador 3x³ en lugar de x³.','Atravesar x=0, donde la función no existe, al unir intervalos.'],[
['Derivamos la forma simplificada y factorizamos el numerador para estudiar su signo.','f′(x)=3−frac{3}{x⁴}=frac{3(x⁴−1)}{x⁴}'],
['El denominador es positivo en el dominio. Los ceros reales del numerador son −1 y 1.','x⁴−1=(x−1)(x+1)(x²+1); x²+1>0'],
['Ordenamos los puntos críticos y la discontinuidad; comprobamos el signo en cada intervalo.','(−∞;−1):+; (−1;0):−; (0;1):−; (1;+∞):+'],
['Traducimos el cuadro de signos en intervalos sin atravesar la discontinuidad.','Crece: (−∞;−1), (1;+∞)\nDecrece: (−1;0), (0;1)'],
['En −1 pasa de creciente a decreciente; en 1 ocurre lo contrario. Calculamos ambas ordenadas.','f(−1)=−3−1=−4 ⇒ máximo relativo (−1;−4)\nf(1)=3+1=4 ⇒ mínimo relativo (1;4)'],
['Como control adicional, la segunda derivada confirma los tipos de extremo. Cero no es un extremo porque queda fuera del dominio.','f″(x)=frac{12}{x⁵}; f″(−1)=−12<0; f″(1)=12>0'],
])];
case 421:return[mk(0,'m=2; límite=−frac{1}{2}.',['m=1; límite=−frac{1}{2}.','m=2; límite=frac{1}{2}.','m=2; límite=−1.'],['Olvidar el factor dos del segundo denominador al cancelar el término singular.','Invertir el signo de la resta del numerador.','Omitir un factor dos en la segunda derivada del denominador.'],[
['Si el límite es finito, el producto por x debe tender a cero. El límite fundamental exponencial fija m.','frac{x}{e^x−1}−frac{m}{2}→1−frac{m}{2}=0 ⇒ m=2'],
['Sustituimos y reducimos a común denominador antes de aplicar ninguna regla de límites.','L=lim_{x→0} frac{x−(e^x−1)}{x(e^x−1)}'],
['Numerador y denominador tienden a cero. Aplicamos L’Hôpital al cociente 0/0.','L=lim_{x→0} frac{1−e^x}{e^x−1+x e^x}'],
['El nuevo cociente sigue siendo 0/0. Derivamos de nuevo, incluyendo ambos términos del producto.','L=lim_{x→0} frac{−e^x}{2e^x+x e^x}'],
['Ahora el denominador no se anula en cero; podemos sustituir directamente.','L=−frac{1}{2}'],
['El valor necesario m=2 también es suficiente. La comprobación numérica bilateral usa expm1 para evitar pérdida de precisión cerca de cero.','x→0⁻: L(x)→−0,5; x→0⁺: L(x)→−0,5'],
])];
case 422:return[mk(0,'F(x)=frac{3x²}{4}−frac{x²ln(x)}{2}+frac{1}{4}.',['F(x)=frac{3x²}{4}−frac{x²ln(x)}{2}−frac{1}{4}.','F(x)=frac{x²}{2}−frac{x²ln(x)}{2}+frac{1}{2}.','F(x)=frac{3x²}{4}+frac{x²ln(x)}{2}+frac{1}{4}.'],['Cambiar el signo de la constante al imponer F(1)=1.','Omitir el término que aparece al integrar por partes.','Cambiar el signo del producto logarítmico.'],[
['Separamos el integrando en dos términos y aplicamos linealidad.','f(x)=x−xln(x); F(x)=∫ x dx − ∫ xln(x) dx'],
['Para el segundo término usamos integración por partes con el logaritmo como u.','u=ln(x), dv=x dx; du=frac{1}{x} dx, v=frac{x²}{2}'],
['Aplicamos la fórmula y calculamos la integral restante.','∫ xln(x) dx = frac{x²}{2}ln(x)−frac{1}{2}∫ x dx = frac{x²}{2}ln(x)−frac{x²}{4}+C'],
['Reunimos términos y usamos el punto P(1,1) para determinar la constante de la primitiva.','F(x)=frac{3x²}{4}−frac{x²ln(x)}{2}+C; F(1)=frac{3}{4}+C=1 ⇒ C=frac{1}{4}'],
['Escribimos la primitiva particular, válida en todo el dominio x>0.','F(x)=frac{3x²}{4}−frac{x²ln(x)}{2}+frac{1}{4}'],
['Comprobamos mediante derivación y sustitución del punto. Ambas condiciones son necesarias.','F′(x)=frac{3x}{2}−xln(x)−frac{x}{2}=x(1−ln(x)); F(1)=1'],
])];
case 428:return[mk(0,'I=2π−frac{1}{2}.',['I=frac{2π}{3}−frac{1}{2}.','I=2π+frac{1}{2}.','I=2π−frac{√3}{2}.'],['Olvidar el factor tres que multiplica a f.','Cambiar el signo del término coseno.','Evaluar el seno de π/3 en lugar del seno de π/6.'],[
['Como F es una primitiva de la función continua f, el teorema fundamental permite evaluar la integral de f mediante los extremos.','F′=f; ∫_{0}^{π/6} f(x) dx = F(frac{π}{6})−F(0)'],
['Sustituimos los valores dados, sin necesitar conocer una fórmula explícita para f.','F(frac{π}{6})−F(0)=π−frac{π}{3}=frac{2π}{3}'],
['Aplicamos la linealidad y conservamos los coeficientes y signos del integrando.','I=3∫_{0}^{π/6} f(x) dx − ∫_{0}^{π/6} cos(x) dx'],
['La primitiva del coseno es el seno. Evaluamos en los límites oficiales.','∫_{0}^{π/6} cos(x) dx = sen(frac{π}{6})−sen(0)=frac{1}{2}'],
['Reunimos los dos resultados. Es una integral definida, por lo que no se añade constante.','I=3·frac{2π}{3}−frac{1}{2}=2π−frac{1}{2}'],
['La primitiva directa del integrando ofrece otra comprobación de los mismos extremos.','H(x)=3F(x)−sen(x); H′(x)=3f(x)−cos(x)\nH(frac{π}{6})−H(0)=2π−frac{1}{2}'],
]),mk(1,'J=frac{3}{2}.',['J=−frac{3}{2}.','J=frac{1}{2}.','J=2.'],['Olvidar el signo negativo en la primitiva del seno.','Sumar los valores del coseno en vez de restar la primitiva.','Usar cero como límite inferior de F, en lugar de F(0)=π/3.'],[
['Reconocemos una composición: el factor f(x) es la derivada de F(x).','F′(x)=f(x)'],
['La regla de la cadena identifica una primitiva del integrando; no requiere que F sea monótona.','(−cos(F(x)))′=sen(F(x))·F′(x)=sen(F(x))·f(x)'],
['Aplicamos Barrow usando los valores de F en los extremos, no los valores de x dentro del coseno.','J=−cos(F(frac{π}{6}))+cos(F(0))'],
['Sustituimos los datos oficiales de la primitiva.','J=−cos(π)+cos(frac{π}{3})'],
['Evaluamos los cosenos exactos y sumamos con sus signos.','J=−(−1)+frac{1}{2}=frac{3}{2}'],
['Comprobamos diferenciando la primitiva compuesta. El cálculo solo depende de los valores finales de F dados en el enunciado.','J=∫_{π/3}^{π} sen(u) du = frac{3}{2}'],
])];default:throw Error('Unknown official case');}}
export function buildLogFtcLimitsBatch(id='batch-0422',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===422?'Integrales indefinidas':c.slot===3?'Integrales definidas y áreas':c.index===396?'Aplicaciones de derivadas':'Límites y asíntotas';x.secondaryTopics=c.index===413?['Aplicaciones de derivadas']:c.index===422?['Integrales indefinidas']:[];x.block='Análisis';x.examSlot=c.slot;if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===422?'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION':c.slot===3?'DEFINITE_INTEGRAL_WITH_INDEPENDENT_QUADRATURE':c.index===396?'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE':'RATIONAL_ASYMPTOTES_AND_NORMAL'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLogFtcLimitsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0422-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0422.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

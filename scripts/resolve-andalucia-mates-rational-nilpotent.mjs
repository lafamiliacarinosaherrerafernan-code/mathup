import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[356,'74ab2c123d3df105640328a5953d165030deecf0873f4dfd65271d375ae8be25',1,'2','9b94a9876aeec6910cce6359c7d592214c2918fd7d08d6a62ee8a4714a1e3bb9',0],
[366,'915e3de08a67887ee286773fac80c8a3a54dc62f3ddee5b1bd715b9b25069857',1,'4','a1ce6690ffcda83e92771b44715a873f91078fee47f22b2106c7d027acefeef2',0],
[369,'0ae552bbdf80d1bddb44757bd8d302d6b215c73a92c352c129649990ed7a452c',1,'A.3','2f5f43b518dc5b7538aa97ef73e6cae5624838ad8beb3c53fb36ffb4f4a63b6a',0],
[371,'e5a1aa84a94cdee287b46fb8413656f21751c536506f9cdb94ff2e89e874862f',1,'A.3','ad34f37905ce7a1b0a2c82a76c85d3b97804f20e486c198e3c9cd3a5e387842c',0]];
export const statements={
356:'Considera la función f definida por f(x)=frac{x²−10}{x²+2x−3} (para x≠−3, x≠1).\na) Estudia y halla las asíntotas de la gráfica de f. (1,25 puntos)\nb) Determina los intervalos de crecimiento y de decrecimiento de f. (1,25 puntos)',
366:'Calcula ∫_{0}^{2} frac{1}{1+√(e^x)} dx. (Sugerencia: efectúa el cambio de variable t=√(e^x).)',
369:'Sea la matriz A=[[0,0,1],[2,1,2],[1,k,1]].\na) [1 punto] ¿Para qué valores del parámetro k no existe la inversa de la matriz A? Justifica la respuesta.\nb) [1,5 puntos] Para k=0, resuelve la ecuación matricial (X+I)·A=Aᵗ, donde I denota la matriz identidad y Aᵗ la matriz traspuesta de A.',
371:'Considera la matriz A=[[0,1,m],[m−1,0,2],[0,1−m,0]].\na) [1,75 puntos] Halla el valor, o valores, de m para los que la matriz A tiene rango 2.\nb) [0,75 puntos] Para m=1, determina A²⁰¹⁵.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_RATIONAL_NILPOTENT_SOURCE_LAYOUT']]:[];
export const cases=[{index:356,slot:2,literals:['x2 − 10','x2 + 2x − 3']},{index:366,slot:3,whole:true,literals:['Calcula','cambio de variable']},{index:369,slot:1,literals:['2 1 2','(X + I) · A = At']},{index:371,slot:1,literals:['m − 1','A2015']}];
export const proof=c=>({356:{excluded:[-3,1],horizontal:1,derivativeNumerator:[20,14,2],critical:[-5,-2]},366:{lower:0,upper:2,result:2*Math.log(2*Math.E/(1+Math.E))},369:{A:[[0,0,1],[2,1,2],[1,0,1]],inverse:[[-1,0,1],[0,1,-2],[1,0,0]],X:[[0,2,-4],[0,0,-2],[0,2,-4]],singular:.5},371:{exceptional:[0,1],A:[[0,1,1],[0,0,2],[0,0,0]],square:[[0,0,2],[0,0,0],[0,0,0]],power:[[0,0,0],[0,0,0],[0,0,0]]}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_DERIVATIVE_QUADRATURE_AND_MATRIX_CHECK',proof(c));switch(c.index){
case 356:return[mk(0,'Verticales: x=−3 y x=1. Horizontal: y=1. Sin oblicuas.',['Verticales: x=−3 y x=1. Horizontal: y=−1. Sin oblicuas.','Verticales: x=−1 y x=3. Horizontal: y=1. Sin oblicuas.','Verticales: x=−3 y x=1. Sin horizontal; oblicua y=x.'],['Cambiar el signo del cociente de coeficientes principales.','Cambiar los signos de las raíces del denominador.','Aplicar la regla de grados consecutivos a polinomios de igual grado.'],[
['Factorizamos el denominador y respetamos las exclusiones de dominio.','x²+2x−3=(x+3)(x−1); D=ℝ∖{−3;1}'],
['El numerador no se anula en ninguno de los puntos excluidos: no se pueden cancelar factores.','N(−3)=−1; N(1)=−9'],
['Estudiamos el signo del denominador a ambos lados de cada raíz para determinar los límites infinitos.','x→−3⁻: f→−∞; x→−3⁺: f→+∞\nx→1⁻: f→+∞; x→1⁺: f→−∞'],
['Por tanto, las dos rectas verticales son asíntotas verdaderas.','x=−3; x=1'],
['Dividimos numerador y denominador por x² y hacemos tender x a ambos infinitos.','f(x)=frac{1−10/x²}{1+2/x−3/x²} →1 ⇒ y=1'],
['La diferencia con la horizontal tiende a cero. Una pendiente oblicua no nula es imposible porque f tiene límite finito.','f(x)−1=frac{−2x−7}{x²+2x−3} →0\nNo hay asíntota oblicua.'],
]),mk(1,'Crece: (−∞;−5), (−2;1), (1;+∞). Decrece: (−5;−3), (−3;−2).',['Crece: (−5;−3), (−3;−2). Decrece: (−∞;−5), (−2;1), (1;+∞).','Crece: (−∞;−5), (−2;+∞). Decrece: (−5;−2).','Crece: (−∞;−2), (−1;1), (1;+∞). Decrece: (−2;−1).'],['Invertir el signo de la regla del cociente.','Unir intervalos atravesando puntos donde la función no existe.','Factorizar mal el numerador de la derivada y perder la discontinuidad x=−3.'],[
['Derivamos el cociente con el orden correcto de los productos.','f′(x)=frac{2x(x²+2x−3)−(x²−10)(2x+2)}{(x²+2x−3)²}'],
['Desarrollamos y factorizamos el numerador.','2x³+4x²−6x−2x³−2x²+20x+20=2(x+5)(x+2)'],
['El denominador al cuadrado es positivo en el dominio. Ordenamos ceros y discontinuidades.','−5<−3<−2<1; D=ℝ∖{−3;1}'],
['Los factores del numerador tienen el mismo signo fuera de [−5,−2] y signo distinto dentro.','f′>0 si x<−5 o x>−2; f′<0 si −5<x<−2, siempre en D'],
['Separamos los intervalos por las dos discontinuidades aunque no cambie el signo.','Crece: (−∞;−5), (−2;1), (1;+∞)\nDecrece: (−5;−3), (−3;−2)'],
['Verificamos el cuadro con un punto de cada intervalo; no se atribuye monotonicidad atravesando un polo.','signo f′(−6)=+; f′(−4)=−; f′(−2,5)=−; f′(0)=+; f′(2)=+'],
])];
case 366:return[mk(0,'I=2ln(frac{2e}{1+e}).',['I=ln(frac{2e}{1+e}).','I=2ln(frac{1+e}{2}).','I=2ln(frac{2e²}{1+e²}).'],['Olvidar el factor dos del diferencial.','Invertir la resta de logaritmos y omitir el término procedente de ln(t).','Cambiar los límites como si t=e^x, no t=e^{x/2}.'],[
['La raíz de e^x es positiva y equivale a e^{x/2}. Aplicamos la sustitución sugerida.','t=√(e^x)=e^{x/2}; t>0'],
['Despejamos x y derivamos. Cambiamos también ambos límites.','x=2ln(t); dx=frac{2}{t} dt\nx=0 ⇒ t=1; x=2 ⇒ t=e'],
['La integral queda racional en t. Descomponemos en fracciones simples.','I=2∫_{1}^{e} frac{1}{t(1+t)} dt\nfrac{1}{t(1+t)}=frac{1}{t}−frac{1}{1+t}'],
['Integramos los dos términos. No hacen falta valores absolutos en este intervalo positivo.','H(t)=2ln(t)−2ln(1+t)'],
['Evaluamos la primitiva en los límites, restando el valor inferior completo.','I=2(1−ln(1+e)+ln(2))=2ln(frac{2e}{1+e})'],
['Comprobamos derivando una primitiva en x. El integrando es positivo, así que el resultado también lo es.','F(x)=x−2ln(1+e^{x/2})\nF′(x)=1−frac{e^{x/2}}{1+e^{x/2}}=frac{1}{1+e^{x/2}}\nI≈0,759771'],
])];
case 369:return[mk(0,'La inversa no existe únicamente para k=frac{1}{2}.',['La inversa no existe únicamente para k=−frac{1}{2}.','La inversa no existe únicamente para k=2.','La inversa no existe únicamente para k=0.'],['Cambiar el signo del cofactor del primer renglón.','Invertir el cociente al resolver 2k=1.','Confundir el valor dado para el siguiente apartado con un valor singular.'],[
['Una matriz cuadrada tiene inversa exactamente cuando su determinante es no nulo.','A=[[0,0,1],[2,1,2],[1,k,1]]'],
['Expandimos por la primera fila, que contiene dos ceros. El único cofactor tiene signo positivo.','det(A)=1·det([[2,1],[1,k]])'],
['Calculamos el determinante de orden dos.','det(A)=2k−1'],
['Igualamos a cero y despejamos sin introducir restricciones adicionales.','2k−1=0 ⇔ k=frac{1}{2}'],
['Para cualquier otro valor, el determinante es no nulo y la inversa existe.','k≠frac{1}{2} ⇒ A invertible'],
['Verificamos el caso singular con la dependencia entre filas; la segunda es el doble de la tercera.','k=frac{1}{2}: (2;1;2)=2(1;frac{1}{2};1)'],
]),mk(1,'X=[[0,2,−4],[0,0,−2],[0,2,−4]].',['X=[[0,0,0],[−2,−4,−2],[0,2,0]].','X=[[1,2,−4],[0,1,−2],[0,2,−3]].','X=[[0,0,0],[2,0,2],[−4,−2,−4]].'],['Multiplicar por la inversa a la izquierda y cambiar el orden del producto.','No restar la identidad al terminar.','Trasponer el resultado aunque la incógnita no aparece traspuesta.'],[
['Sustituimos k=0. Como el determinante vale −1, podemos multiplicar por la inversa.','A=[[0,0,1],[2,1,2],[1,0,1]]; det(A)=−1'],
['Multiplicamos a la derecha por A⁻¹, respetando el orden de la ecuación.','(X+I)AA⁻¹=AᵗA⁻¹ ⇒ X=AᵗA⁻¹−I'],
['Obtenemos la inversa resolviendo Av=w. Las componentes son z=w₁, x=w₃−w₁ e y=w₂−2w₃.','A⁻¹=[[−1,0,1],[0,1,−2],[1,0,0]]'],
['Trasponemos A y calculamos el producto fila por columna.','Aᵗ=[[0,2,1],[0,1,0],[1,2,1]]\nAᵗA⁻¹=[[1,2,−4],[0,1,−2],[0,2,−3]]'],
['Restamos uno a cada entrada diagonal, sin alterar las restantes.','X=[[0,2,−4],[0,0,−2],[0,2,−4]]'],
['Verificamos la ecuación original multiplicando la matriz obtenida, no solo la fórmula despejada.','(X+I)A=[[0,2,1],[0,1,0],[1,2,1]]=Aᵗ'],
])];
case 371:return[mk(0,'rango(A)=2 exactamente para m=0 o m=1.',['rango(A)=2 exactamente para m=1.','rango(A)=2 exactamente para m=0 o m=−1.','rango(A)=2 para todo m distinto de 0 y 1.'],['Descartar m=0 al dividir por m.','Cambiar el signo de la raíz del factor repetido.','Confundir determinante no nulo con rango dos.'],[
['Para que una matriz de orden tres tenga rango dos, el determinante debe ser cero y algún menor de orden dos no nulo.','A=[[0,1,m],[m−1,0,2],[0,1−m,0]]'],
['Expandimos por la primera columna y simplificamos el producto.','det(A)=−(m−1)·det([[1,m],[1−m,0]])=−m(m−1)²'],
['Los únicos candidatos a rango menor que tres son cero y uno.','det(A)=0 ⇔ m=0 o m=1'],
['Para m=0, las filas primera y tercera coinciden, pero las dos primeras son independientes.','A₀=[[0,1,0],[−1,0,2],[0,1,0]]\ndet([[0,1],[−1,0]])=1 ⇒ rango(A₀)=2'],
['Para m=1, la tercera fila es cero y existe un menor de orden dos con determinante dos.','A₁=[[0,1,1],[0,0,2],[0,0,0]]\ndet([[1,1],[0,2]])=2 ⇒ rango(A₁)=2'],
['Fuera de esos valores, el determinante no nulo obliga a rango tres. Ambos candidatos y solo ellos cumplen.','m∉{0;1} ⇒ rango(A)=3'],
]),mk(1,'A²⁰¹⁵=[[0,0,0],[0,0,0],[0,0,0]].',['A²⁰¹⁵=[[1,0,0],[0,1,0],[0,0,1]].','A²⁰¹⁵=[[0,1,1],[0,0,2],[0,0,0]].','A²⁰¹⁵=[[0,0,2],[0,0,0],[0,0,0]].'],['Confundir una potencia positiva grande con la potencia cero.','Suponer idempotencia sin multiplicar A por sí misma.','Detener el cálculo en A² e ignorar que A³ ya es cero.'],[
['Sustituimos m=1 antes de calcular las potencias.','A=[[0,1,1],[0,0,2],[0,0,0]]'],
['Multiplicamos fila por columna. El único producto no nulo de longitud dos enlaza las posiciones 1,2 y 2,3.','A²=[[0,0,2],[0,0,0],[0,0,0]]'],
['Multiplicamos una vez más. La única entrada no nula de A² se multiplica por la tercera fila nula de A.','A³=A²A=[[0,0,0],[0,0,0],[0,0,0]]'],
['La matriz es nilpotente de índice tres, pues A² no es cero pero A³ sí.','A²≠0; A³=0'],
['Descomponemos cualquier exponente al menos tres y aplicamos la propiedad del producto por la matriz nula.','Aⁿ=A³A^{n−3}=0 para n≥3'],
['Como 2015 es mayor que tres, la conclusión se aplica directamente; no se requiere calcular miles de productos.','2015≥3 ⇒ A²⁰¹⁵=0'],
])];default:throw Error('Unknown official case');}}
export function buildRationalNilpotentBatch(id='batch-0419',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Matrices y determinantes':c.slot===3?'Integrales definidas y áreas':'Aplicaciones de derivadas';x.secondaryTopics=c.index===356?['Límites y asíntotas']:[];x.block=c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':c.slot===3?'DEFINITE_SUBSTITUTION_WITH_INDEPENDENT_QUADRATURE':'RATIONAL_ASYMPTOTES_AND_NORMAL'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRationalNilpotentBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0419-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0419.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

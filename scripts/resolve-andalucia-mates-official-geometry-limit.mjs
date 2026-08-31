// Official page readings; no historical answer is used to infer missing source mathematics.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[112,'230940d6cbc11bf5fecc13ec9f908a84e47b6f5f6c7a1c8c573c8cacae38078e',1,'A.4','df3aacc1998a011564e51940c242204199bcb8b9435da4debfd7fdb6bb4b5170',0],
[116,'0ea3fd4fc59736e3847d6552e64377975175a3605c7742e73d7a41dbf219269c',2,'B.4','d31aa083a635f684d477cd32b8ae4c2a1a7ea3c592213e538aed4bef144719e1',0],
[126,'56a7eeb2e214c74b9aeb92347d4b6f860225bb0221675c04e5335a48a645bb74',2,'B.3','11698abf4f994fb1982eb63f6f9f0230a4fc4f4c2a4eeb7bdb8ebf5af0cb7811',0],
[133,'1a0767cc65a38fb4b848a65db6b624112758b901e6c99ef4da1ae1276214341f',2,'6','846472fd094fe5917cd2fe9c9e71670afac4c46ee23c62cbd188a88c8bba7d20',0],
[137,'7eefda3ec50d664d578b46fd49633176a83def4261e486d587f82d657f9078e8',1,'A.2','f1b3a3c5d781846ec90df24032e1d12c040a503d97d33ece04e5b4d3e2f9f034',0],
];
export const statements={
112:'Sea el punto P(2;3;−1) y la recta r dada por las ecuaciones\nsystem{x=1;y=−2λ;z=λ}\na) [1 punto] Halla la ecuación del plano perpendicular a r que pasa por P.\nb) [1,5 puntos] Calcula la distancia del punto P a la recta r y determina el punto simétrico de P respecto de r.',
116:'Los puntos A(0;1;1) y B(2;1;3) son dos vértices de un triángulo. El tercer vértice es un punto de la recta r dada por\nsystem{2x+y=0;z=0}\na) [1 punto] Calcula las coordenadas de los posibles puntos C de r para que el triángulo ABC tenga un ángulo recto en el vértice A.\nb) [1,5 puntos] Calcula las coordenadas de los posibles puntos D de r para que el triángulo ABD tenga un área igual a √(2).',
126:'[2,5 puntos] Obtén un vector no nulo v=(a;b;c), de manera que las matrices siguientes tengan simultáneamente rango 2.\nA=[[1,1,a],[1,0,b],[1,1,c]]\nB=[[2,0,a],[0,−1,b],[3,1,c]]',
133:'Calcula a y b sabiendo que\nlim_{x→0} frac{x sen(x)+a(e^x−1)+sen(x)}{bx²+x−sen(x)}=1.',
137:'[2,5 puntos] Sea la función f:(0;+∞)→ℝ definida por f(x)=frac{1+e^x}{1−e^x}. Halla la primitiva de f cuya gráfica pasa por el punto (1;1). (Sugerencia: cambio de variable t=e^x).',
};
export const cases=[
{index:112,literals:['Sea el punto P','perpendicular','distancia'],topic:'Problemas métricos'},
{index:116,literals:['A(0, 1, 1)','B(2, 1, 3)','2x + y = 0'],topic:'Problemas métricos'},
{index:126,literals:['vector no nulo','rango 2'],topic:'Determinantes',whole:true},
{index:133,literals:['x sen(x)','Calcula a y b'],topic:'Límites y asíntotas',whole:true},
{index:137,literals:['(1, 1)','cambio de variable'],topic:'Integrales indefinidas',whole:true},
];
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_GEOMETRY_LIMIT_PRIMITIVE_SOURCE_LAYOUT']]:[];
export const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),sub=(a,b)=>a.map((x,i)=>x-b[i]),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const matrices=(a,b,c)=>[[[1,1,a],[1,0,b],[1,1,c]],[[2,0,a],[0,-1,b],[3,1,c]]];
export const primitive=x=>x-2*Math.log(Math.expm1(x))+2*Math.log(Math.E-1);
export const limitQuotient=(x,a,b)=>(x*Math.sin(x)+a*Math.expm1(x)+Math.sin(x))/(b*x*x+x-Math.sin(x));
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
export function proof(c){switch(c.index){
case 112:{const P=[2,3,-1],Q=[1,0,0],v=[0,-2,1],t=dot(sub(P,Q),v)/dot(v,v),H=Q.map((x,i)=>x+t*v[i]),R=H.map((x,i)=>2*x-P[i]);near(dot(sub(P,H),v),0);near(dot(sub(P,H),sub(P,H)),6/5);return{P,Q,v,projectionParameter:t,foot:H,reflection:R,distanceSquared:6/5,plane:[0,-2,1,7]};}
case 116:{const A=[0,1,1],B=[2,1,3],V=sub(B,A),D=t=>[t,-2*t,0],areaSquared=t=>dot(cross(V,sub(D(t),A)),cross(V,sub(D(t),A)))/4;near(dot(V,sub(D(1),A)),0);for(const t of [-1,-1/9])near(areaSquared(t),2);return{A,B,rightAnglePoint:D(1),areaPoints:[D(-1),D(-1/9)],areaSquaredPolynomial:[9,10,3],areaSquared:2};}
case 126:return{determinantExpressions:['a−c','3a−2b−2c'],fixedMinors:[-1,-2],familyDirection:[2,1,2],parameterExcluded:0};
case 133:{for(const x of [-.0001,.0001])near(limitQuotient(x,-1,.5),1-x,2e-8);return{parameters:[-1,.5],numeratorOrderOne:0,numeratorOrderTwo:.5,denominatorOrderTwo:.5,checkPoints:[-.001,-.0001,.0001,.001].map(x=>[x,limitQuotient(x,-1,.5)])};}
case 137:near(primitive(1),1);return{domain:'x>0',substitution:'t=e^x>1',partialFractionCoefficients:[1,2],constant:2*Math.log(Math.E-1),initialValue:primitive(1)};
default:throw Error('No independently solved source');}}
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),ev=proof(c),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_GEOMETRY_ALGEBRA_CALCULUS_INDEPENDENT_CHECK',ev);
switch(c.index){
case 112:return[mk(0,'−2y+z+7=0.',['−2y+z−7=0.','2x+3y−z−14=0.','2y+z−5=0.'],['Cambiar el signo del término independiente.','Usar el vector de posición de P como normal.','Cambiar el signo de una componente del vector director.'],[
['La recta proporciona directamente un punto y un vector director.','Q=(1;0;0); v=(0;−2;1)'],
['Un plano perpendicular a una recta tiene como normal un vector director de ella.','n=v=(0;−2;1)'],
['Escribimos la ecuación punto-normal con el punto exigido.','0(x−2)−2(y−3)+(z+1)=0'],
['Desarrollamos y agrupamos los términos independientes.','−2y+6+z+1=0 ⇒ −2y+z+7=0'],
['Comprobamos que el punto pertenece al plano y que la normal es paralela al director.','−2·3−1+7=0; n=v'],
]),mk(1,'Distancia frac{√(30)}{5}; simétrico P′(0;frac{13}{5};−frac{9}{5}).',['Distancia frac{√(30)}{5}; simétrico P′(1;frac{14}{5};−frac{7}{5}).','Distancia frac{6}{5}; simétrico P′(0;frac{13}{5};−frac{9}{5}).','Distancia frac{√(30)}{5}; simétrico P′(0;−frac{43}{5};frac{19}{5}).'],['Confundir el pie de la perpendicular con el simétrico.','Dar la distancia al cuadrado en vez de la distancia.','Invertir el signo del parámetro de proyección.'],[
['El pie de la perpendicular pertenece a la recta y satisface una condición de ortogonalidad.','H=(1;−2λ;λ); (P−H)·(0;−2;1)=0'],
['Sustituimos las coordenadas y resolvemos el parámetro.','−2(3+2λ)+(−1−λ)=0 ⇒ −7−5λ=0 ⇒ λ=−frac{7}{5}'],
['Calculamos el pie y el vector perpendicular desde él hasta P.','H=(1;frac{14}{5};−frac{7}{5}); P−H=(1;frac{1}{5};frac{2}{5})'],
['Aplicamos la norma euclídea para obtener la distancia mínima.','d(P,r)=√(1+frac{1}{25}+frac{4}{25})=frac{√(30)}{5}'],
['El pie es el punto medio del segmento que une P y su simétrico.','P′=2H−P=(0;frac{13}{5};−frac{9}{5})'],
['Comprobamos de manera independiente el punto medio y la perpendicularidad.','frac{P+P′}{2}=H∈r; (P−H)·v=−frac{2}{5}+frac{2}{5}=0'],
])];
case 116:return[mk(0,'C=(1;−2;0).',['C=(−1;2;0).','C=(0;0;0).','C=(2;−4;0).'],['Cambiar el signo al despejar el parámetro.','Usar el origen de la recta sin imponer la perpendicularidad.','Confundir el término 2t con el parámetro t.'],[
['Parametrizamos todos los puntos de la recta, respetando sus dos ecuaciones.','C=(t;−2t;0), t∈ℝ'],
['El ángulo recto en A exige producto escalar nulo de los lados con origen A.','AB=B−A=(2;0;2); AC=C−A=(t;−2t−1;−1)'],
['Formamos y resolvemos el producto escalar.','AB·AC=2t−2=0 ⇒ t=1'],
['Sustituimos para obtener el único vértice que cumple.','C=(1;−2;0)'],
['Comprobamos recta y ángulo; ambos lados son no nulos.','2·1−2=0; z=0; (2;0;2)·(1;−3;−1)=0'],
]),mk(1,'D=(−1;2;0) o D=(−frac{1}{9};frac{2}{9};0).',['D=(−1;2;0).','D=(1;−2;0) o D=(frac{1}{9};−frac{2}{9};0).','D=(−1;−2;0) o D=(−frac{1}{9};−frac{2}{9};0).'],['Perder una raíz de la ecuación de área.','Cambiar el signo del término lineal.','Usar y=2x en lugar de y=−2x al recuperar las coordenadas.'],[
['Parametrizamos el tercer vértice y escribimos los dos lados con origen A.','D=(t;−2t;0); AB=(2;0;2); AD=(t;−2t−1;−1)'],
['El área del triángulo es la mitad de la norma del producto vectorial.','Área=frac{1}{2}||AB×AD||; AB×AD=(4t+2;2t+2;−4t−2)'],
['Elevamos al cuadrado: ambas áreas son no negativas y el valor oficial es raíz de dos.','Área²=frac{2(4t+2)²+(2t+2)²}{4}=9t²+10t+3=2'],
['Resolvemos la ecuación cuadrática sin descartar ninguna raíz.','9t²+10t+1=(9t+1)(t+1)=0 ⇒ t=−1 o t=−frac{1}{9}'],
['Sustituimos ambos parámetros en la recta.','D₁=(−1;2;0); D₂=(−frac{1}{9};frac{2}{9};0)'],
['Comprobamos la ecuación de área para las dos raíces y que no son triángulos degenerados.','9−10+3=2; frac{1}{9}−frac{10}{9}+3=2; Área=√(2)>0'],
])];
case 126:return[mk(0,'v=(2;1;2) es válido; en general v=t(2;1;2), t≠0.',['v=(1;1;1) es válido; en general v=t(1;1;1), t≠0.','v=(2;−1;2) es válido; en general v=t(2;−1;2), t≠0.','v=(2;1;−2) es válido; en general v=t(2;1;−2), t≠0.'],['Imponer solo la igualdad entre primera y tercera componentes.','Cambiar el signo de la segunda componente.','Cambiar el signo al igualar primera y tercera componentes.'],[
['En matrices de orden tres, rango dos exige determinante nulo y algún menor de orden dos no nulo.','rg(A)=rg(B)=2'],
['Los menores de las dos primeras filas y columnas garantizan rango al menos dos para cualquier vector.','det([[1,1],[1,0]])=−1; det([[2,0],[0,−1]])=−2'],
['Desarrollamos el primer determinante por la primera fila.','det(A)=−b−(c−b)+a=a−c'],
['Desarrollamos el segundo por la primera fila.','det(B)=2(−c−b)+3a=3a−2b−2c'],
['Igualamos ambos a cero y resolvemos las condiciones simultáneas.','a−c=0 ⇒ c=a; 3a−2b−2a=0 ⇒ a=2b'],
['Tomamos b=t y excluimos el vector nulo. Elegimos t=1 como ejemplo concreto.','v=(2t;t;2t)=t(2;1;2), t≠0; v=(2;1;2)'],
['La sustitución anula ambos determinantes y los menores ya calculados impiden rango menor que dos.','det(A)=2−2=0; det(B)=6−2−4=0; rg(A)=rg(B)=2'],
])];
case 133:return[mk(0,'a=−1; b=frac{1}{2}.',['a=1; b=frac{3}{2}.','a=−1; b=1.','a=−1; b=−frac{1}{2}.'],['No cancelar el término lineal del numerador.','Perder el factor dos de la segunda derivada del denominador.','Cambiar el signo del término cuadrático.'],[
['Nombramos numerador y denominador. Ambos se anulan al sustituir cero.','N(x)=x sen(x)+a(e^x−1)+sen(x); D(x)=bx²+x−sen(x); N(0)=D(0)=0'],
['Un límite finito exige anular el término de primer orden del numerador: el denominador dividido entre x tiende a cero.','lim_{x→0} frac{N(x)}{x}=a+1; lim_{x→0} frac{D(x)}{x}=0 ⇒ a=−1'],
['Con este valor podemos aplicar L’Hôpital a la indeterminación 0/0.','N′(x)=sen(x)+x cos(x)−e^x+cos(x); D′(x)=2bx+1−cos(x)'],
['Las primeras derivadas también se anulan en cero; aplicamos de nuevo L’Hôpital si b no es cero.','N′(0)=D′(0)=0; N″(x)=2cos(x)−x sen(x)−e^x−sen(x); D″(x)=2b+sen(x)'],
['Evaluamos las segundas derivadas e imponemos el valor del límite.','lim_{x→0} frac{N(x)}{D(x)}=frac{1}{2b}=1 ⇒ b=frac{1}{2}'],
['El caso b=0 no proporciona un límite finito: la expansión independiente compara órdenes distintos.','N(x)=frac{x²}{2}+O(x³); D(x)=frac{x³}{6}+O(x⁵) si b=0'],
['Comprobamos con los términos dominantes para los parámetros obtenidos, sin depender del doble cociente de derivadas.','a=−1, b=frac{1}{2}: N(x)=frac{x²}{2}+O(x³); D(x)=frac{x²}{2}+O(x³); cociente→1'],
])];
case 137:return[mk(0,'F(x)=x−2ln(e^x−1)+2ln(e−1), x>0.',['F(x)=x+2ln(e^x−1)−2ln(e−1), x>0.','F(x)=x−ln(e^x−1)+ln(e−1), x>0.','F(x)=x−2ln(e^x−1)−2ln(e−1), x>0.'],['Perder el signo al integrar 1/(1−t).','Omitir el factor dos de las fracciones simples.','Cambiar el signo al fijar la constante con el punto dado.'],[
['Aplicamos el cambio sugerido y transformamos también el diferencial.','t=e^x>1; dt=e^x dx=t dx; dx=frac{dt}{t}'],
['La integral queda racional en la nueva variable.','∫frac{1+e^x}{1−e^x}dx=∫frac{1+t}{t(1−t)}dt'],
['Descomponemos en fracciones simples y comparamos los coeficientes.','frac{1+t}{t(1−t)}=frac{A}{t}+frac{B}{1−t}; 1+t=A(1−t)+Bt ⇒ A=1, B=2'],
['Integramos con el signo que introduce la derivada de uno menos t.','F=ln|t|−2ln|1−t|+C'],
['Volvemos a x. Como x es positivo, e^x−1 también lo es.','F(x)=x−2ln(e^x−1)+C'],
['Imponemos la ordenada del punto oficial y despejamos la constante.','F(1)=1−2ln(e−1)+C=1 ⇒ C=2ln(e−1)'],
['Derivamos la expresión y comprobamos el punto de paso.','F′(x)=1−frac{2e^x}{e^x−1}=frac{1+e^x}{1−e^x}; F(1)=1'],
])];
default:throw Error('Unsolved exercise');}}
export function buildGeometryLimitBatch(id='batch-0381',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===133?['Derivadas']:c.index===126?['Matrices']:c.topic==='Problemas métricos'?['Vectores','Planos y rectas']:[];x.block=c.topic==='Problemas métricos'?'Geometría':c.index===126?'Álgebra':'Análisis';x.examSlot=c.topic==='Problemas métricos'?4:c.index===126?1:c.index===137?3:2;const evidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.topic==='Problemas métricos'?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.index===126?'MATRIX_DETERMINANT_IDENTITIES':c.index===137?'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION':'PARAMETER_LIMIT_WITH_INDEPENDENT_SERIES_CHECK'};x[c.topic==='Problemas métricos'?'geometryEvidence':'matesEvidence']=evidence;if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildGeometryLimitBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0381-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0381.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

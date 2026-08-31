import fs from'node:fs';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{officialParts,part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1017,'c637bbde5c26c0b35b59202bd832ddc97990d3845365ce483fbf2a49832f73fe',2,'B.2','803fb257cb637487c8daaf2aac1f1a3e8d27ab97efe0039a53761b3e2554bd1b',0],
 [1019,'2852db48391a57842be2fd949b4d1d8f1640f5a415cd5beb0691954ee488a191',2,'B.4','64e157b2e928dbb8a8724444e46012776205646cbec4059e08228ce1498d1481',0],
 [1024,'4ed7fc44fe8d81fed98763864234427004d1dfa317b5d6657c1c2da31a4c902b',2,'5','b81163cefba2d1ee21767833fc909978ecd4331b5091a672b4ba215072511d1a',0],
];
export const statements={
1017:'Sea la función f(x)=cases{x²−4x+a,x<2;frac{1}{x−1},x≥2}.\na) Calcule el valor de a para que la función sea continua en x=2. Para ese valor de a obtenido, ¿es derivable la función en x=2?\nb) Para a=4, estudie la monotonía y calcule las ecuaciones de las asíntotas, si existen.',
1019:'Considera las rectas r y s dadas por r≡x−2=y−2=z y s≡cases{x=4+t;y=4+t;z=mt}.\na) Determina m para que r y s sean paralelas.\nb) Halla, si existe, un valor de m para el que ambas rectas sean la misma.\nc) Para m=1, calcula la ecuación del plano que contiene a r y a s.',
1024:'Considera la matriz A=matrix{−1,0;0,1}.\na) Halla todas las matrices X que cumplen XA=−AXᵗ y X²=I, donde I es la matriz identidad de orden 2.\nb) Halla todas las matrices Y que cumplen YA=AY, la suma de los elementos de su diagonal principal es cero y tienen determinante −1.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_JOIN_PARALLEL_INVOLUTIONS_LAYOUT']]:[];
export const cases=[{index:1017,subject:'ccss',slot:3,literals:['x = 2','Para a = 4','asíntotas']},{index:1019,slot:4,literals:['x−2=y−2=z','Para m = 1','ambas rectas sean la misma']},{index:1024,slot:1,literals:['XA = −AXt','Y A = AY','determinante −1']}];
export const branch=(x,a)=>x<2?x*x-4*x+a:1/(x-1);
export const proof=c=>({1017:{continuousParameter:5,joinValue:1,oneSidedDerivatives:[0,-1],a4Limits:[0,1],decreasingIntervals:[['-Infinity',2],[2,'Infinity']],horizontalAsymptote:0},1019:{rPoint:[2,2,0],rDirection:[1,1,1],sPoint:[4,4,0],parallelParameter:1,coincidentParameters:[],planeNormal:[1,-1,0],planeConstant:0},1024:{A:[[-1,0],[0,1]],X:[[[0,1],[1,0]],[[0,-1],[-1,0]]],Y:[[[1,0],[0,-1]],[[-1,0],[0,1]]]}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'INDEPENDENT_BRANCH_LIMIT_VECTOR_AND_MATRIX_IDENTITIES',proof(c));switch(c.index){
case 1017:return[mk(0,'a=5; continua en x=2, pero no derivable: f′₋(2)=0 y f′₊(2)=−1.',['a=4; continua en x=2, pero no derivable.','a=5; continua y derivable en x=2.','a=3; continua y derivable en x=2.'],['Igualar el límite izquierdo a cero en lugar de a f(2).','Confundir continuidad con derivabilidad.','Cambiar el signo al imponer la continuidad y omitir las derivadas laterales.'],[
 ['En el punto de unión, la rama derecha da el valor de la función.','f(2)=frac{1}{2−1}=1'],
 ['Calculamos los límites de las dos fórmulas en el punto de unión.','lim_{x→2⁻}f(x)=4−8+a=a−4; lim_{x→2⁺}f(x)=1'],
 ['La continuidad exige que ambos límites y el valor coincidan.','a−4=1 ⇒ a=5'],
 ['Derivamos cada rama en su intervalo.','f′(x)=2x−4 si x<2; f′(x)=−frac{1}{(x−1)²} si x>2'],
 ['Evaluamos las derivadas laterales: son finitas, pero diferentes.','f′₋(2)=0; f′₊(2)=−1 ⇒ f no es derivable en x=2'],
 ['Comprobamos directamente los cocientes incrementales con a=5.','frac{f(2+h)−1}{h}=h si h<0; =−frac{1}{1+h} si h>0; límites: 0,−1'],
 ]),mk(1,'Para a=4: decrece en (−∞,2) y en [2,∞), no en todo ℝ; asíntota horizontal y=0 cuando x→+∞; sin verticales ni oblicuas.',['Para a=4: decrece en todo ℝ; asíntota horizontal y=0 cuando x→+∞; sin verticales ni oblicuas.','Para a=4: decrece en (−∞,2) y [2,∞); asíntotas x=1 e y=0.','Para a=4: decrece en (−∞,2) y crece en [2,∞); asíntota horizontal y=1.'],['Extender el signo de las derivadas a través de un salto ascendente.','Asignar a la función completa la singularidad de una rama fuera de su intervalo.','Cambiar el signo de la derivada del cociente y confundir valor inicial con límite infinito.'],[
 ['Sustituimos a=4; cada fórmula se mantiene en su intervalo oficial.','f(x)=(x−2)² si x<2; f(x)=frac{1}{x−1} si x≥2'],
 ['La derivada es negativa en ambos tramos abiertos.','2x−4<0 si x<2; −frac{1}{(x−1)²}<0 si x>2'],
 ['El salto ascendente impide unir los dos intervalos decrecientes.','lim_{x→2⁻}f(x)=0; f(2)=1; f(1,9)=0,01<1=f(2)'],
 ['A la derecha el cociente tiende a cero: esa es la única asíntota horizontal.','lim_{x→+∞}frac{1}{x−1}=0 ⇒ y=0'],
 ['No hay límites infinitos en puntos finitos: x=1 pertenece a la rama polinómica; en x=2 ambos límites son finitos.','f(1)=1; x−1≥1 para la rama racional'],
 ['En el extremo izquierdo domina x² y no hay asíntota oblicua. Verificamos también que f no es constante en ningún tramo.','lim_{x→−∞}frac{(x−2)²}{x}=−∞; f′<0 en ambos tramos'],
 ])];
case 1019:return[mk(0,'m=1.',['m=0.','m=−1.','m=2.'],['Anular la componente vertical en vez de igualarla a las otras.','Cambiar el signo de una sola componente.','Confundir el desplazamiento entre puntos con un vector director.'],[
 ['Parametrizamos la primera recta usando un parámetro distinto del de s.','r:(x,y,z)=(2,2,0)+u(1,1,1)'],
 ['Leemos el punto y el vector director de la segunda.','s:(x,y,z)=(4,4,0)+t(1,1,m)'],
 ['El paralelismo exige que los vectores directores sean proporcionales.','(1,1,m)=k(1,1,1)'],
 ['Las primeras componentes fijan k; la tercera fija m.','1=k; m=k ⇒ m=1'],
 ['Comprobamos independientemente mediante el producto vectorial.','(1,1,1)×(1,1,m)=(m−1,1−m,0)'],
 ['Ese producto es cero exactamente con el valor obtenido.','(m−1,1−m,0)=(0,0,0) ⇔ m=1'],
 ]),mk(1,'No existe ningún valor de m.',['Solo m=1.','Solo m=0.','Todos los valores reales de m.'],['Confundir rectas paralelas con coincidentes.','Comprobar solo una coordenada de un punto.','Suponer que compartir dos relaciones entre coordenadas identifica una recta.'],[
 ['Dos rectas iguales deben ser paralelas; por a), el único candidato es m=1.','r=s ⇒ m=1'],
 ['La segunda recta contiene siempre su punto inicial, cualquiera que sea m.','Q=(4,4,0)∈s, tomando t=0'],
 ['Probamos si ese punto satisface las ecuaciones de r.','x−2=2; y−2=2; z=0'],
 ['Las tres cantidades no coinciden, por lo que Q no pertenece a r.','2=2≠0 ⇒ Q∉r'],
 ['Esta falta de pertenencia no depende del parámetro m.','Q∈s y Q∉r para todo m'],
 ['También para m=1, el desplazamiento entre puntos no es paralelo al director común.','(Q−P)×(1,1,1)=(2,2,0)×(1,1,1)=(2,−2,0)≠0'],
 ]),mk(2,'x−y=0.',['x+y−z−4=0.','x−y+z=0.','x−y−2=0.'],['Elegir una normal que no es perpendicular al director de las rectas.','Añadir una componente vertical que excluye puntos de las rectas.','Usar un término independiente que no permite la pertenencia de sus puntos iniciales.'],[
 ['Con m=1, las dos rectas son paralelas distintas y determinan un plano único.','P=(2,2,0); Q=(4,4,0); v=(1,1,1)'],
 ['Un segundo vector contenido en ese plano es el desplazamiento entre puntos.','w=Q−P=(2,2,0)'],
 ['Calculamos una normal mediante el producto vectorial.','v×w=(−2,2,0); podemos usar n=(1,−1,0)'],
 ['Aplicamos la ecuación punto-normal usando P.','(1,−1,0)·(x−2,y−2,z)=0'],
 ['Simplificamos y comprobamos todos los puntos de r.','x−y=0; (2+u)−(2+u)=0'],
 ['Comprobamos también todos los puntos de s, no solo su punto inicial.','(4+t)−(4+t)=0 para todo t'],
 ])];
case 1024:return[mk(0,'X=matrix{0,1;1,0} o X=matrix{0,−1;−1,0}.',['X=matrix{0,1;−1,0} o X=matrix{0,−1;1,0}.','X=matrix{1,0;0,1} o X=matrix{−1,0;0,−1}.','X=matrix{0,2;2,0} o X=matrix{0,−2;−2,0}.'],['Omitir la transposición y obtener matrices cuyo cuadrado es −I.','Imponer solo X²=I, olvidando la primera identidad.','Imponer solo la primera identidad, olvidando que el cuadrado debe ser I.'],[
 ['Escribimos una matriz general para no perder ninguna solución.','X=matrix{a,b;c,d}; Xᵗ=matrix{a,c;b,d}'],
 ['Calculamos los dos productos de la primera identidad, en su orden.','XA=matrix{−a,b;−c,d}; −AXᵗ=matrix{a,c;−b,−d}'],
 ['Igualamos entradas homólogas.','−a=a ⇒ a=0; d=−d ⇒ d=0; b=c'],
 ['Imponemos ahora la segunda condición a la familia obtenida.','X=matrix{0,b;b,0}; X²=matrix{b²,0;0,b²}=I'],
 ['Resolvemos la ecuación escalar y escribimos ambas matrices.','b²=1 ⇒ b=1 o b=−1; X=±matrix{0,1;1,0}'],
 ['Comprobamos ambas identidades para los dos signos; las restricciones anteriores prueban que no hay más soluciones.','Xᵗ=X; XA=matrix{0,b;−b,0}=−AXᵗ; X²=I cuando b=±1'],
 ]),mk(1,'Y=matrix{1,0;0,−1} o Y=matrix{−1,0;0,1}.',['Y=matrix{1,0;0,1} o Y=matrix{−1,0;0,−1}.','Y=matrix{0,1;1,0} o Y=matrix{0,−1;−1,0}.','Y=matrix{2,0;0,−2} o Y=matrix{−2,0;0,2}.'],['Olvidar la traza cero y el signo del determinante.','Satisfacer traza y determinante, pero no conmutar con A.','Satisfacer conmutación y traza, pero no el determinante exigido.'],[
 ['Tomamos una matriz general y calculamos ambos órdenes del producto.','Y=matrix{u,v;w,z}; YA=matrix{−u,v;−w,z}; AY=matrix{−u,−v;w,z}'],
 ['La igualdad de productos obliga a anular las entradas fuera de la diagonal.','v=−v ⇒ v=0; −w=w ⇒ w=0'],
 ['La suma de la diagonal es la traza y debe ser cero.','u+z=0 ⇒ z=−u; Y=matrix{u,0;0,−u}'],
 ['Imponemos el determinante sin perder su signo.','det(Y)=u(−u)=−u²=−1'],
 ['Resolvemos y obtenemos las dos matrices posibles.','u²=1 ⇒ u=±1; Y=±matrix{1,0;0,−1}'],
 ['Verificamos simultáneamente las tres condiciones.','YA=AY=matrix{−u,0;0,−u}; tr(Y)=u−u=0; det(Y)=−1'],
 ])];default:throw Error('Unknown join/parallel/involution source');}}
export function buildJoinParallelInvolutionsBatch(id='batch-0463',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Matrices':c.slot===4?'Planos y rectas':'Derivadas';x.secondaryTopics=[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x[c.subject==='ccss'?'calculusEvidence':c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.subject==='ccss'?'SOURCE_BOUND_DERIVATIVES_AND_CONTINUITY':c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':'MATRIX_DETERMINANT_IDENTITIES'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildJoinParallelInvolutionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0463-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0463.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

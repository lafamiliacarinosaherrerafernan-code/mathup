// Source layout established by direct reading of the six hash-bound official pages.
import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[85,'9e05f4d8647530063d69251cbcbf13e7f990abe224aca9576f2e95d1342e4b1b',1,'A.1','044f0ab73c867fd6cbd6e20d1a6d3aaa8dfb986a6484f8126979ef3af2ebd246',0],
[92,'8989ece1dc4d1fafd724f1b38fa92b3d562a6ca1c4bd9a7b6ffd8a1b75f129f0',1,'A.1','5da3d44b9334ca2e9f7ff8ed81e6346342795ab8c251b58f2a514b11d5f954b6',0],
[98,'a098cf97f26b5a80c2114b078958a9549efd8f87843d30465bf6b65e0deb3e8c',1,'A.2','ba4e27f303b1228693255f8c08971c8363c7d22a84d9980751707ff6b2ae826f',0],
[101,'57a94794707b1b7875c44400a89e0e02d964c61659e3e0531c40ff634f78104c',2,'B.7','a2aafefcd79a18e6a9db916b5660e53000b6a30cb614dbcdead7daab4c7de199',0],
[102,'54d3d099a9d525046a68be3b9854c72445eb0b8d72ffb70d5a31ddd2ef6c04dc',2,'B.4','b54b6d7752dce3fadb4ea01ccd7726766bc433d7f69756a32d51eddfedeade2d',0],
[114,'638c1decf68db7761653ce6239400acc00ca5aff6d558ac22705b9864b909625',1,'A.4','df0db489f46ca0da400eefa62bd3b3cfb119e430687ad4c7ce8e8e4160c91576',0],
];
export const statements={
85:'[2,5 puntos] Sabiendo que lim_{x→0}frac{ln(x+1)−a sen(x)+x cos(3x)}{x²} es finito, calcula a y el valor del límite (ln denota logaritmo neperiano).',
92:'Sea f la función continua definida por\nf(x)={x²+2 si x≤0;√(ax+b) si 0<x≤2;−frac{x}{2√(2)}+frac{3}{√(2)} si 2<x}\na) Calcula a y b. (1,25 puntos)\nb) Para a=−1 y b=4, estudia si existe la derivada de f en x=2. En caso afirmativo, calcula la ecuación de la recta tangente a la gráfica de f en dicho punto. (1,25 puntos)',
98:'Considera la función f(x)=frac{x²+a}{x−b}, para x≠b.\na) [1,5 puntos] Calcula a y b para que la gráfica de f pase por el punto (1;−2) y tenga a la recta y=x+4 como asíntota oblicua.\nb) [1 punto] En el caso a=5 y b=4, calcula la ecuación de la recta normal a la gráfica de f que pasa por el punto de abscisa x=0.',
101:'El plano perpendicular al segmento de extremos P(0;3;8) y Q(2;1;6) que pasa por su punto medio corta a los ejes coordenados en los puntos A, B y C. Halla el área del triángulo cuyos vértices son los puntos A, B y C.',
102:'[2,5 puntos] Calcula de manera razonada la distancia del eje OX a la recta r de ecuaciones\nsystem{2x−3y=4;2x−3y−z=0}',
114:'Considera el punto A(1;−1;1) y la recta r dada por\nsystem{x=1+2λ;y=1−λ;z=1}\na) [1,5 puntos] Calcula las coordenadas del punto simétrico de A respecto a r.\nb) [1 punto] Determina la ecuación del plano que contiene a r y pasa por A.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CONTINUITY_METRIC_SOURCE_LAYOUT']]:[];
export const cases=[{index:85,literals:['es ﬁnito','cos(3x)'],topic:'Límites y asíntotas',whole:true},{index:92,literals:['función continua','derivada'],topic:'Derivadas'},{index:98,literals:['asíntota oblicua','recta normal'],topic:'Límites y asíntotas'},{index:101,literals:['P (0, 3, 8)','Q(2, 1, 6)'],topic:'Problemas métricos',whole:true},{index:102,literals:['distancia del eje OX','2x − 3y'],topic:'Problemas métricos',whole:true},{index:114,literals:['A(1, −1, 1)','contiene a r'],topic:'Problemas métricos'}];
export const limitValue=(x,a)=>(Math.log1p(x)-a*Math.sin(x)+x*Math.cos(3*x))/(x*x);
export const rational=x=>(x*x+5)/(x-4),rationalDerivative=x=>(x*x-8*x-5)/(x-4)**2;
export const piecewise=x=>x<=0?x*x+2:x<=2?Math.sqrt(4-x):-x/(2*Math.SQRT2)+3/Math.SQRT2;
export function proof(c){switch(c.index){
case 85:return{a:2,limit:-.5,linearCoefficient:'2−a',quadraticCoefficient:-.5,checks:[-.001,-.0001,.0001,.001].map(x=>[x,limitValue(x,2)])};
case 92:return{a:-1,b:4,joins:[0,2],joinValues:[2,Math.SQRT2],leftDerivative:-1/(2*Math.SQRT2),rightDerivative:-1/(2*Math.SQRT2),tangent:[-1/(2*Math.SQRT2),3/Math.SQRT2]};
case 98:return{a:5,b:4,oblique:[1,4],point:[0,-1.25],tangentSlope:-5/16,normalSlope:16/5};
case 101:return{midpoint:[1,2,7],normal:[1,-1,-1],plane:[1,-1,-1,8],vertices:[[-8,0,0],[0,8,0],[0,0,8]],crossProduct:[64,-64,-64],areaSquared:3072};
case 102:return{pointOnLine:[2,0,4],direction:[3,2,0],axisDirection:[1,0,0],commonPerpendicularEndpoints:[[2,0,0],[2,0,4]],distance:4};
case 114:return{point:[1,-1,1],linePoint:[1,1,1],direction:[2,-1,0],projectionParameter:2/5,foot:[9/5,3/5,1],reflection:[13/5,11/5,1],plane:[0,0,1,-1]};
default:throw Error('No source-bound proof');}}
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),ev=proof(c),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_CONTINUITY_METRIC_INDEPENDENT_CHECK',ev);switch(c.index){
case 85:return[mk(0,'a=2; límite=−frac{1}{2}.',['a=2; límite=frac{1}{2}.','a=1; límite=−frac{1}{2}.','a=2; límite=−1.'],['Cambiar el signo de la segunda derivada del logaritmo.','Omitir el término lineal de x cos(3x).','Olvidar dividir por la segunda derivada de x².'],[
['Nombramos el numerador y comprobamos que se anula en cero.','N(x)=ln(1+x)−a sen(x)+x cos(3x); N(0)=0'],
['Si el cociente por x² tiene límite finito, el cociente N(x)/x debe tender a cero.','lim_{x→0}frac{N(x)}{x}=1−a+1=2−a ⇒ a=2'],
['Con este valor aparece una indeterminación 0/0; aplicamos L’Hôpital.','lim_{x→0}frac{N(x)}{x²}=lim_{x→0}frac{frac{1}{1+x}−2cos(x)+cos(3x)−3x sen(3x)}{2x}'],
['La primera derivada del numerador también se anula; derivamos otra vez.','N″(x)=−frac{1}{(1+x)²}+2sen(x)−6sen(3x)−9x cos(3x)'],
['Sustituimos en el cociente de segundas derivadas.','N″(0)=−1; (x²)″=2 ⇒ límite=−frac{1}{2}'],
['Verificamos independientemente con los términos dominantes.','ln(1+x)=x−frac{x²}{2}+O(x³); sen(x)=x+O(x³); x cos(3x)=x+O(x³); N(x)=−frac{x²}{2}+O(x³)'],
])];
case 92:return[mk(0,'a=−1; b=4.',['a=1; b=4.','a=0; b=2.','a=−1; b=2.'],['Cambiar el signo al despejar a.','Confundir el valor de la raíz con el radicando.','No elevar al cuadrado la condición de continuidad en cero.'],[
['Los únicos puntos de unión son cero y dos. En cada tramo la fórmula es continua donde está definida.','x=0; x=2'],
['Imponemos continuidad en cero usando el valor del primer tramo.','f(0)=2; lim_{x→0⁺}f(x)=√(b) ⇒ √(b)=2'],
['Como la raíz es no negativa, elevar al cuadrado conserva la igualdad.','b=4'],
['Calculamos el límite por la derecha en dos con el tercer tramo.','lim_{x→2⁺}f(x)=−frac{2}{2√(2)}+frac{3}{√(2)}=√(2)'],
['El segundo tramo incluye dos; igualamos los valores y despejamos.','√(2a+4)=√(2) ⇒ 2a+4=2 ⇒ a=−1'],
['Verificamos el dominio del tramo radical y ambos empalmes.','0<x≤2 ⇒ 4−x≥2>0; √(4)=2; √(4−2)=√(2)'],
]),mk(1,'f′(2)=−frac{1}{2√(2)}; tangente y=−frac{x}{2√(2)}+frac{3}{√(2)}.',['f′(2)=frac{1}{2√(2)}; tangente y=frac{x}{2√(2)}+frac{1}{√(2)}.','f′(2)=−frac{1}{√(2)}; tangente y=−frac{x}{√(2)}+2√(2).','No existe f′(2); no hay tangente única.'],['Perder el signo de la derivada del radicando.','Omitir el factor dos al derivar la raíz.','Confundir el cambio de fórmula con falta de derivabilidad.'],[
['Primero comprobamos continuidad en el punto, requisito de derivabilidad.','f(2)=√(2)=lim_{x→2⁺}f(x)'],
['Derivamos el segundo tramo mediante la regla de la cadena.','f′(x)=−frac{1}{2√(4−x)} si 0<x<2'],
['Derivamos el tramo lineal de la derecha y calculamos ambas pendientes laterales.','f′₋(2)=−frac{1}{2√(2)}; f′₊(2)=−frac{1}{2√(2)}'],
['Como las pendientes laterales coinciden, existe la derivada.','f′(2)=−frac{1}{2√(2)}'],
['Usamos la ecuación punto-pendiente de la tangente.','y−√(2)=−frac{1}{2√(2)}(x−2) ⇒ y=−frac{x}{2√(2)}+frac{3}{√(2)}'],
['Comprobamos con un cociente incremental independiente por la izquierda, racionalizando.','frac{√(2−h)−√(2)}{h}=−frac{1}{√(2−h)+√(2)}→−frac{1}{2√(2)}; h<0'],
])];
case 98:return[mk(0,'a=5; b=4.',['a=−5; b=4.','a=5; b=−4.','a=4; b=5.'],['Cambiar el signo al usar la ordenada del punto.','Cambiar el signo de b en la división polinómica.','Intercambiar los parámetros.'],[
['Dividimos el numerador por x−b para identificar la asíntota.','f(x)=x+b+frac{a+b²}{x−b}'],
['El resto tiende a cero en ambos infinitos; la asíntota es y=x+b.','lim_{x→±∞}frac{a+b²}{x−b}=0'],
['Comparamos con la recta oficial y fijamos b.','y=x+b=x+4 ⇒ b=4'],
['Imponemos que el punto (1;−2) pertenezca a la gráfica.','frac{1+a}{1−4}=−2 ⇒ 1+a=6'],
['Despejamos el parámetro restante y verificamos que el punto está en el dominio.','a=5; 1≠4'],
['Comprobamos ambas condiciones directamente.','f(1)=frac{6}{−3}=−2; f(x)−(x+4)=frac{21}{x−4}→0'],
]),mk(1,'y=frac{16}{5}x−frac{5}{4}.',['y=−frac{5}{16}x−frac{5}{4}.','y=−frac{16}{5}x−frac{5}{4}.','y=frac{16}{5}x+frac{5}{4}.'],['Dar la tangente en vez de la normal.','Tomar el recíproco sin cambiar el signo.','Cambiar el signo de la ordenada del punto.'],[
['Calculamos el punto de la curva correspondiente a x=0.','f(0)=frac{5}{−4}=−frac{5}{4}; P=(0;−frac{5}{4})'],
['Derivamos aplicando la regla del cociente.','f′(x)=frac{2x(x−4)−(x²+5)}{(x−4)²}=frac{x²−8x−5}{(x−4)²}'],
['La pendiente de la tangente es la derivada en cero.','mₜ=f′(0)=−frac{5}{16}'],
['La normal es perpendicular a la tangente; sus pendientes tienen producto menos uno.','mₙ mₜ=−1 ⇒ mₙ=frac{16}{5}'],
['Escribimos la recta normal por P.','y+frac{5}{4}=frac{16}{5}x ⇒ y=frac{16}{5}x−frac{5}{4}'],
['La división polinómica comprueba independientemente la pendiente y la perpendicularidad.','f(x)=x+4+frac{21}{x−4}; f′(0)=1−frac{21}{16}=−frac{5}{16}; mₜmₙ=−1'],
])];
case 101:return[mk(0,'Área=32√(3).',['Área=64√(3).','Área=32.','Área=16√(3).'],['No dividir por dos el área del paralelogramo.','No incluir las tres componentes del producto vectorial en su norma.','Dividir por dos dos veces.'],[
['Calculamos el punto medio y un vector director del segmento.','M=frac{P+Q}{2}=(1;2;7); PQ=(2;−2;−2)'],
['El plano tiene como normal un vector paralelo al segmento y pasa por M.','n=(1;−1;−1); (x−1)−(y−2)−(z−7)=0 ⇒ x−y−z+8=0'],
['Cortamos el plano con cada eje anulando las otras dos coordenadas.','A=(−8;0;0); B=(0;8;0); C=(0;0;8)'],
['Formamos dos lados y calculamos su producto vectorial.','AB=(8;8;0); AC=(8;0;8); AB×AC=(64;−64;−64)'],
['El área del triángulo es la mitad de la norma del producto vectorial.','Área=frac{1}{2}√(64²+64²+64²)=32√(3)'],
['Comprobamos por una vía independiente: los tres lados miden lo mismo.','|AB|=|AC|=|BC|=8√(2); Área=frac{√(3)}{4}(8√(2))²=32√(3)'],
])];
case 102:return[mk(0,'Distancia=4.',['Distancia=2.','Distancia=frac{4}{√(13)}.','Distancia=0.'],['Tomar la coordenada x de un punto como distancia al eje.','Confundir la distancia a un plano con la distancia entre rectas.','Suponer intersección ignorando z=4.'],[
['Restamos las ecuaciones de r para determinar la tercera coordenada.','2x−3y=4; 2x−3y−z=0 ⇒ z=4'],
['Parametrizamos r y el eje OX.','r:(x;y;z)=(2;0;4)+t(3;2;0); OX:(s;0;0)'],
['Escribimos el cuadrado de la distancia entre dos puntos cualesquiera de ambas rectas.','d²=(2+3t−s)²+4t²+16'],
['Los dos primeros sumandos son no negativos; la distancia nunca puede ser menor que cuatro.','d²≥16 ⇒ d≥4'],
['La cota se alcanza con t=0 y s=2; identificamos los puntos más próximos.','R=(2;0;4)∈r; S=(2;0;0)∈OX; |RS|=4'],
['Comprobamos que el segmento mínimo es perpendicular a ambos directores.','RS=(0;0;−4); RS·(3;2;0)=0; RS·(1;0;0)=0'],
])];
case 114:return[mk(0,'A′=(frac{13}{5};frac{11}{5};1).',['A′=(frac{9}{5};frac{3}{5};1).','A′=(−frac{3}{5};frac{19}{5};1).','A′=(frac{13}{5};−frac{11}{5};1).'],['Confundir el pie de la perpendicular con el simétrico.','Cambiar el signo del parámetro de proyección.','Cambiar el signo de la segunda coordenada al reflejar.'],[
['Un punto de r y su vector director se leen de las ecuaciones paramétricas.','Q=(1;1;1); v=(2;−1;0)'],
['El pie H pertenece a r y el vector A−H es perpendicular a su director.','H=(1+2λ;1−λ;1); (A−H)·v=0'],
['Sustituimos y resolvemos la condición.','(−2λ;−2+λ;0)·(2;−1;0)=2−5λ=0 ⇒ λ=frac{2}{5}'],
['Obtenemos el pie de la perpendicular.','H=(frac{9}{5};frac{3}{5};1)'],
['El pie es el punto medio entre A y su simétrico.','A′=2H−A=(frac{13}{5};frac{11}{5};1)'],
['Verificamos el punto medio en la recta y la ortogonalidad del segmento.','frac{A+A′}{2}=H∈r; (A′−A)·v=frac{8}{5}·2−frac{16}{5}=0'],
]),mk(1,'Plano z=1.',['Plano z=0.','Plano x+2y−3=0.','Plano 2x−y−3=0.'],['Omitir el término independiente del plano.','Usar solo la recta sin comprobar el punto A.','Usar el director de r como normal sin exigir que r esté contenida.'],[
['El plano debe contener el director de r y el vector que une Q con A.','v=(2;−1;0); QA=A−Q=(0;−2;0)'],
['Calculamos un normal mediante el producto vectorial.','v×QA=(0;0;−4)'],
['El producto no es nulo, por lo que los dos vectores son independientes y determinan un plano único.','n=(0;0;1)'],
['Usamos el punto Q y la ecuación punto-normal.','0(x−1)+0(y−1)+(z−1)=0 ⇒ z=1'],
['Comprobamos que todos los puntos de r y también A pertenecen al plano.','r: z=1 para todo λ; A: z=1'],
['Verificamos además que A no pertenece a r, evitando una falsa indeterminación.','x=1 ⇒ λ=0 ⇒ y=1≠−1; A∉r'],
])];
default:throw Error('Unsolved source');}}
export function buildContinuityMetricBatch(id='batch-0383',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===98?['Derivadas']:[];x.block=c.index>=101?'Geometría':'Análisis';x.examSlot=c.index>=101?4:2;x[c.index>=101?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index>=101?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.index===85?'PARAMETER_LIMIT_WITH_INDEPENDENT_SERIES_CHECK':c.index===98?'RATIONAL_ASYMPTOTES_AND_NORMAL':'LOGARITHMIC_ASYMPTOTES_AND_PIECEWISE_DIFFERENTIABILITY'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildContinuityMetricBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0383-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0383.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

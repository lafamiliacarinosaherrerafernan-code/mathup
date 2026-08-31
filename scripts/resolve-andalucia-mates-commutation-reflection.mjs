import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[321,'7eefda3ec50d664d578b46fd49633176a83def4261e486d587f82d657f9078e8',1,'A.3','f1b3a3c5d781846ec90df24032e1d12c040a503d97d33ece04e5b4d3e2f9f034',0],
[322,'4aa4c2d71811ca346af7cfd770227925f526cbe73dfa4a591abc027bcfca6884',2,'7','b86d627ca03e0583de2a31229a21af0a90b024435c0b294645545294fc8ddf7d',0],
[324,'ef4c082dc9a17eb27b09d51b09e1e41f1e7192efb6fd3b64b1b852471e928740',1,'2','9a983a6976a1f6eff443ed2769253b872451a8e46c7d74e25ad7f9cfb54e0f2f',0],
[329,'1e4f531b5628e8a28245106f3c6fabe999a180d01408f83dbb02d7a79a9c179e',2,'7','eb011903d29bddbdfd5f4ae07d3aa1c183e6619e4a5fa86d08ea96035813ed44',0]];
export const statements={
321:'Calcula todas las matrices X=[[a,b],[c,d]] tales que a+d=1, tienen determinante 1 y cumplen AX=XA, siendo A=[[0,−1],[1,0]].',
322:'Considera las rectas r≡{x=2+3λ; y=−1+2λ; z=3+λ} y s≡{2x−y−2=0; y+2z−4=0}.\na) Halla el plano que contiene a r y es paralelo a s. (1.5 puntos)\nb) Deduce razonadamente que ningún plano perpendicular a s contiene a r. (1 punto)',
324:'Determina la función f:(−1,+∞)→ℝ, sabiendo que es dos veces derivable, su gráfica pasa por el punto (0,1), f′(0)=0 y f″(x)=frac{1}{x+1}.',
329:'Determina el punto simétrico de A(2,−4,−3) con respecto al plano que contiene a los puntos B(1,1,2), C(0,frac{1}{3},1) y D(−3,0,3).'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_COMMUTATION_REFLECTION_SOURCE_LAYOUT']]:[];
export const cases=[{index:321,whole:true,slot:1,literals:['a + d = 1','determinante 1','AX = XA']},{index:322,slot:4,literals:['x = 2 + 3','perpendicular']},{index:324,whole:true,slot:3,literals:['dos veces derivable','(0, 1)']},{index:329,whole:true,slot:4,literals:['A(2, −4, −3)','D(−3, 0, 3)']}];
export const proof=c=>({321:{a:.5,bSquared:.75,cOppositeB:true,determinant:1},322:{rPoint:[2,-1,3],rDirection:[3,2,1],sPoint:[1,0,2],sDirection:[1,2,-1],normal:[-1,1,1],offset:0,dot:6},324:{valueAtZero:1,firstAtZero:0,second:'1/(x+1)',constants:[0,2]},329:{normal:[-1,3,-1],offset:0,foot:[1,-1,-4],reflection:[0,2,-5]}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_ALGEBRA_GEOMETRY_AND_DERIVATIVES',proof(c));switch(c.index){
case 321:return[mk(0,'X=[[frac{1}{2},b],[−b,frac{1}{2}]], con b=±frac{√3}{2}.',['X=[[frac{1}{2},b],[b,frac{1}{2}]], con b=±frac{√3}{2}.','X=[[1,b],[−b,1]], con b=±frac{√3}{2}.','X=[[frac{1}{2},b],[−b,frac{1}{2}]], con b=±frac{1}{2}.'],['Perder el signo menos en la relación entre los elementos no diagonales.','Confundir la traza uno con que cada diagonal sea uno.','Restar incorrectamente al imponer el determinante.'],[
['Multiplicamos en ambos órdenes: la igualdad se exige entrada por entrada.','AX=[[-c,-d],[a,b]]; XA=[[b,-a],[d,-c]]'],
['Las cuatro igualdades se reducen a dos condiciones independientes.','−c=b; −d=−a; a=d; b=−c ⇒ c=−b, d=a'],
['La suma de los elementos de la diagonal es uno.','a+d=2a=1 ⇒ a=d=frac{1}{2}'],
['Aplicamos el determinante dos por dos, conservando el signo del producto no diagonal.','det(X)=ad−bc=frac{1}{4}+b²=1'],
['Despejamos y conservamos ambas raíces reales. Cada valor de b determina c con signo opuesto.','b²=frac{3}{4} ⇒ b=±frac{√3}{2}; c=−b'],
['Ambas matrices tienen traza uno, determinante uno y los productos en ambos órdenes iguales; no hay más posibilidades.','tr(X)=1; det(X)=frac{1}{4}+frac{3}{4}=1; AX=XA'],
])];
case 322:return[mk(0,'π: −x+ y+z=0.',['π: x+y+z=4.','π: −x+y+z=1.','π: −x+y−z=−6.'],['Elegir una normal que no es perpendicular a las direcciones.','Usar un punto de s en lugar de un punto de r.','Cambiar el signo de la tercera componente normal.'],[
['Extraemos un punto y la dirección de r directamente de su parametrización.','P=(2;−1;3); u=(3;2;1)'],
['Parametrizamos s tomando x=1+t y usando las dos ecuaciones del enunciado.','s: (x;y;z)=(1;0;2)+t(1;2;−1); v=(1;2;−1)'],
['La normal del plano debe ser perpendicular a u y v. Calculamos su producto vectorial.','u×v=(−4;4;4); n=(−1;1;1)'],
['Escribimos la ecuación del plano por P con esa normal.','−(x−2)+(y+1)+(z−3)=0 ⇒ −x+y+z=0'],
['Sustituir r da cero para todo λ, de modo que toda la recta está contenida.','−(2+3λ)+(−1+2λ)+(3+λ)=0'],
['La dirección v es paralela al plano y su punto Q no está en él: s no corta el plano.','n·v=−1+2−1=0; Q=(1;0;2); −1+0+2=1≠0'],
]),mk(1,'No existe: u·v=6≠0.',['Sí existe: u·v=0.','Sí existe: basta con que u×v≠0.','No existe: u y v son paralelos.'],['Confundir la suma de productos con cero.','Usar independencia de direcciones en lugar de perpendicularidad.','Confundir direcciones no ortogonales con paralelas.'],[
['Un plano perpendicular a s tiene un vector normal paralelo a la dirección de s.','n=k(1;2;−1), k≠0'],
['Si contiene r, su normal debe ser perpendicular a la dirección de r.','n·u=0, u=(3;2;1)'],
['Sustituimos las direcciones oficiales y calculamos el producto escalar.','v·u=1·3+2·2+(−1)·1=6'],
['Ningún múltiplo no nulo de esa normal satisface la condición necesaria.','n·u=6k≠0'],
['La contradicción es de orientación y no puede resolverse trasladando el plano.','n·(P+λu)=n·P+6kλ'],
['Por tanto no hay plano de la familia requerida que contenga todos los puntos de r.','Perpendicular a s y conteniendo r: imposible'],
])];
case 324:return[mk(0,'f(x)=(x+1)ln(x+1)−x+1, para x>−1.',['f(x)=(x+1)ln(x+1)+1, para x>−1.','f(x)=(x+1)ln(x+1)−x, para x>−1.','f(x)=ln(x+1)+1, para x>−1.'],['Omitir el término lineal de la primitiva del logaritmo.','Omitir la constante fijada por el punto de la gráfica.','Integrar una vez y confundir f con su derivada.'],[
['El dominio hace positivo x+1. Integramos la segunda derivada para hallar la primera.','f′(x)=∫frac{1}{x+1}dx=ln(x+1)+C₁'],
['La condición sobre la tangente en cero determina la primera constante.','f′(0)=ln1+C₁=0 ⇒ C₁=0'],
['Integramos el logaritmo por partes: u es el logaritmo y dv es dx.','u=ln(x+1); du=frac{dx}{x+1}; v=x+1'],
['El producto v·du es dx. Restamos su integral y conservamos una nueva constante.','f(x)=(x+1)ln(x+1)−(x+1)+C₂'],
['La gráfica pasa por (0,1), así que f(0)=1 fija C₂.','−1+C₂=1 ⇒ C₂=2; f(x)=(x+1)ln(x+1)−x+1'],
['Derivamos dos veces y comprobamos también los dos datos iniciales.','f′=ln(x+1); f″=frac{1}{x+1}; f(0)=1; f′(0)=0'],
])];
case 329:return[mk(0,'A′=(0;2;−5).',['A′=(1;−1;−4).','A′=(4;−10;−1).','A′=(−2;8;−7).'],['Confundir el pie de la perpendicular con el punto simétrico.','Proyectar en el sentido contrario al requerido.','Duplicar dos veces el desplazamiento al pie.'],[
['Formamos dos vectores del plano. Multiplicar uno por tres evita fracciones en el producto vectorial.','3(C−B)=(−3;−2;−3); D−B=(−4;−1;1)'],
['El producto vectorial no nulo determina una normal; sustituimos B para hallar la ecuación.','3(C−B)×(D−B)=(−5;15;−5); n=(−1;3;−1); π:−x+3y−z=0'],
['La perpendicular al plano por A tiene dirección n. Su intersección H con el plano es el punto medio buscado.','H=A+tn=(2−t;−4+3t;−3−t)'],
['Imponemos la ecuación del plano para calcular t.','−(2−t)+3(−4+3t)−(−3−t)=−11+11t=0 ⇒ t=1'],
['Calculamos el pie y prolongamos el segmento por la misma distancia.','H=(1;−1;−4); A′=2H−A=(0;2;−5)'],
['El punto medio pertenece al plano, el segmento es perpendicular y ambos extremos están a igual distancia.','−1+3(−1)−(−4)=0; A′−A=2n; |A−H|=|A′−H|=√11'],
])];default:throw Error('Unknown source case');}}
export function buildCommutationReflectionBatch(id='batch-0413',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Planos y rectas':c.slot===1?'Matrices y determinantes':'Integrales indefinidas';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildCommutationReflectionBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0413-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0413.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

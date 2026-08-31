import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[354,'e5a1aa84a94cdee287b46fb8413656f21751c536506f9cdb94ff2e89e874862f',2,'B.3','8ee23d341cf494c803b0474bf7c2ce2bc8a04e391112230682a3593502ea9e12',0],
[359,'58876c8435308697c784c8326eba10d1b8b9696efc401c51bf3386c90eba4643',1,'A.4','d97704b869dc35db191ac2562f82cbca004bb15fc6ed09e2fbb413d5e4ee5eb1',0],
[372,'5feecf28b9fa5a5f948bccfd561e04d39ec91c87e40f27baca54281076136f87',1,'A.4','2c18d0fa99079e4fa633fb2cc7637b4df55dc19dafdaf6b9f5acf289f429480e',0],
[373,'3c73d7569c1433d92a94cc59d448ac36b1ef461888db782ababda36489d9f359',2,'8','b719c51aadb997b270d189c8519c0638586dbbd5577bbece9e339014d4f9c9d9',0]];
export const statements={
354:'Considera el siguiente sistema de ecuaciones\nsystem{x+αz=2;2x+αy=α+4;3x+y+(α+4)z=7}\na) [1,75 puntos] Discute el sistema según los valores de α.\nb) [0,75 puntos] Resuelve el sistema para α=2.',
359:'Halla la ecuación del plano que es paralelo a la recta r de ecuaciones\nr:\nsystem{x−2y+11=0;2y+z−19=0}\ny contiene a la recta s definida por\ns:\nsystem{x=1−5λ;y=−2+3λ;z=2+2λ}',
372:'Considera los puntos A(−1,k,3), B(k+1,0,2), C(1,2,0) y D(2,0,1).\na) [1,25 puntos] ¿Existe algún valor de k para el que los vectores AB, BC y CD sean linealmente dependientes?\nb) [1,25 puntos] Calcula los valores de k para los que los puntos A, B, C y D forman un tetraedro de volumen 1.',
373:'Calcula el volumen del tetraedro que limita el plano determinado por los puntos A(0,2,−2), B(3,2,1) y C(2,3,2) con los planos cartesianos.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_RANK_TETRAHEDRA_SOURCE_LAYOUT']]:[];
export const cases=[{index:354,slot:1,literals:['x + αz = 2','α = 2']},{index:359,slot:4,whole:true,literals:['x − 2y + 11 = 0','z = 2 + 2λ']},{index:372,slot:4,literals:['A(−1, k, 3)','volumen 1']},{index:373,slot:4,whole:true,literals:['A(0, 2, −2)','planos cartesianos']}];
export const proof=c=>({354:{exceptional:[0,3],determinantCoefficients:[0,6,-2],solution:[2,1,0]},359:{normal:[8,6,11],constant:18,rDirection:[2,1,-2],sDirection:[-5,3,2],point:[1,-2,2]},372:{tripleProductCoefficients:[-2,-2,-1],roots:[-1-Math.sqrt(5),-1+Math.sqrt(5)]},373:{normal:[1,2,-1],constant:6,intercepts:[6,3,-6],volume:18}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_RANK_AND_TRIPLE_PRODUCT_CHECK',proof(c));switch(c.index){
case 354:return[mk(0,'SCI si α=0 o α=3; SCD en los demás casos. Nunca SI.',['SI si α=0 o α=3; SCD en los demás casos. Nunca SCI.','SCI si α=0 o α=−3; SCD en los demás casos. Nunca SI.','SCI solo si α=0; SCD en los demás casos. Nunca SI.'],['Confundir determinante nulo con incompatibilidad sin comparar rangos.','Cambiar el signo de la raíz no nula del determinante.','Dividir por α−3 y perder un caso excepcional.'],[
['Formamos la matriz de coeficientes y la ampliada. La compatibilidad se decide comparando sus rangos.','M=[[1,0,α],[2,α,0],[3,1,α+4]]; b=[[2],[α+4],[7]]'],
['Calculamos el determinante y localizamos todos los valores excepcionales antes de dividir.','det(M)=α(α+4)+α(2−3α)=−2α(α−3)'],
['Para α distinto de cero y tres, el rango de M y de la ampliada es tres: hay solución única.','α∉{0;3} ⇒ rango(M)=rango(M|b)=3 ⇒ SCD'],
['Para α=0, la segunda ecuación es el doble de la primera. La tercera deja una variable libre. Un menor de orden dos vale uno.','x=2; y+4z=1\n(x;y;z)=(2;1−4t;t)\nrango(M)=rango(M|b)=2 ⇒ SCI'],
['Para α=3, restamos dos veces la primera a la segunda y tres veces a la tercera. Ambas resultan equivalentes.','x+3z=2; y−2z=1\n(x;y;z)=(2−3t;1+2t;t)\nrango(M)=rango(M|b)=2 ⇒ SCI'],
['La sustitución de ambas familias verifica las tres ecuaciones para todo t. Ningún caso produce una fila contradictoria.','α=0: 3·2+(1−4t)+4t=7\nα=3: 3(2−3t)+(1+2t)+7t=7'],
]),mk(1,'(x;y;z)=(2;1;0).',['(x;y;z)=(1;2;0).','(x;y;z)=(2;0;1).','(x;y;z)=(0;1;2).'],['Intercambiar x e y después de resolver.','Asignar el parámetro libre de un caso singular al caso α=2.','Intercambiar x y z en la sustitución.'],[
['Sustituimos α=2 en las tres ecuaciones y comprobamos que no es un valor singular.','system{x+2z=2;2x+2y=6;3x+y+6z=7}\ndet(M)=4≠0'],
['Dividimos la segunda ecuación por dos para despejar y.','x+y=3 ⇒ y=3−x'],
['Sustituimos en la tercera y simplificamos.','3x+(3−x)+6z=7 ⇒ x+3z=2'],
['Restamos la primera ecuación para obtener z. Después recuperamos x e y.','(x+3z)−(x+2z)=0 ⇒ z=0\nx=2; y=1'],
['La sustitución independiente verifica las tres igualdades originales para α=2.','2+2·0=2; 2·2+2·1=6; 3·2+1+6·0=7'],
['Al ser el determinante no nulo, esta solución verificada es la única.','(x;y;z)=(2;1;0)'],
])];
case 359:return[mk(0,'π: 8x+6y+11z=18.',['π: 8x+6y+11z=121.','π: 8x−6y+11z=42.','π: 8x+6y−11z=−26.'],['Usar un punto de r en lugar de uno de s.','Cambiar el signo de una componente normal manteniendo solo el paso por el punto.','Cambiar el signo de la tercera componente normal.'],[
['Parametrizamos r tomando y=t. Leemos también un punto y la dirección de s.','r: (x;y;z)=(−11;0;19)+t(2;1;−2)\ns: (x;y;z)=(1;−2;2)+λ(−5;3;2)'],
['El plano contiene s y es paralelo a r, así que su normal es perpendicular a ambas direcciones.','u=(2;1;−2); v=(−5;3;2)'],
['Calculamos el producto vectorial, que no es nulo.','u×v=(8;6;11)=n'],
['Usamos el punto de s para escribir la ecuación punto-normal.','8(x−1)+6(y+2)+11(z−2)=0'],
['Simplificamos y verificamos que todo punto de s satisface la ecuación.','8x+6y+11z=18\n8(1−5λ)+6(−2+3λ)+11(2+2λ)=18'],
['La dirección de r es paralela al plano y su punto base no está contenido: no se confunde con un plano que contenga r.','n·u=16+6−22=0; n·v=−40+18+22=0\n8(−11)+6·0+11·19=121≠18'],
])];
case 372:return[mk(0,'No existe ningún k real: det(AB,BC,CD)=−[(k+1)²+1]≠0.',['Sí: k=−1−√2 o k=−1+√2.','Sí: únicamente k=−1.','Sí: cualquier k real hace el determinante cero.'],['Cambiar el signo del término constante al completar el cuadrado.','Confundir el mínimo del módulo con que sea cero.','Suponer que los vectores consecutivos siempre son dependientes.'],[
['Calculamos cada vector como extremo menos origen, manteniendo el orden pedido.','AB=(k+2;−k;−1)\nBC=(−k;2;−2)\nCD=(1;−2;1)'],
['Tres vectores de ℝ³ son dependientes si y solo si su producto mixto es cero.','det(AB,BC,CD)=AB·(BC×CD)'],
['Calculamos primero el producto vectorial.','BC×CD=(−2;k−2;2k−2)'],
['Multiplicamos escalarmente y reducimos términos.','det=−2(k+2)−k(k−2)−(2k−2)=−k²−2k−2'],
['Completamos el cuadrado para demostrar el signo para todo número real.','−k²−2k−2=−[(k+1)²+1]<0'],
['El término entre corchetes es al menos uno. Nunca hay determinante cero ni dependencia real.','|det|≥1 ⇒ AB, BC y CD son independientes para todo k∈ℝ'],
]),mk(1,'k=−1−√5 o k=−1+√5.',['k=−1−√7 o k=−1+√7.','k=−1−√2 o k=−1+√2.','k=1−√5 o k=1+√5.'],['Cambiar el signo del término constante en la ecuación de volumen.','Usar un factor de volumen incorrecto para el tetraedro.','Cambiar el signo del término lineal al completar el cuadrado.'],[
['El volumen de un tetraedro es la sexta parte del módulo del producto mixto de tres aristas desde un mismo vértice.','V=frac{|det(AB,AC,AD)|}{6}'],
['Relacionamos esas aristas con los vectores ya calculados usando sumas consecutivas.','AC=AB+BC; AD=AB+BC+CD'],
['Restar columnas no cambia el determinante; por eso sirve el producto mixto anterior.','det(AB,AC,AD)=det(AB,BC,CD)=−[(k+1)²+1]'],
['Imponemos el volumen uno, conservando el módulo y el factor seis.','frac{(k+1)²+1}{6}=1 ⇒ (k+1)²=5'],
['Extraemos las dos raíces reales y despejamos k.','k=−1±√5'],
['Para ambas raíces el módulo del producto mixto es seis, y los cuatro puntos no son coplanarios.','|det|=5+1=6 ⇒ V=frac{6}{6}=1'],
])];
case 373:return[mk(0,'Volumen=18 u³.',['Volumen=108 u³.','Volumen=−18 u³.','Volumen=36 u³.'],['Olvidar dividir por seis el producto de los interceptos.','No tomar el valor absoluto del producto mixto.','Usar el factor de una pirámide sin calcular antes la mitad del área triangular.'],[
['Calculamos dos direcciones del plano a partir de los tres puntos oficiales.','AB=(3;0;3); AC=(2;1;4)'],
['El producto vectorial da una normal no nula. Simplificamos por un factor común.','AB×AC=(−3;−6;3); n=(1;2;−1)'],
['Usamos el punto A para escribir el plano y comprobamos los otros dos puntos.','x+2(y−2)−(z+2)=0 ⇒ x+2y−z=6\nB: 3+4−1=6; C: 2+6−2=6'],
['Hallamos los cortes con los ejes anulando las otras dos coordenadas en cada caso.','X=(6;0;0); Y=(0;3;0); Z=(0;0;−6)'],
['El tetraedro tiene vértices O, X, Y, Z. Su volumen es el módulo del determinante dividido por seis.','V=frac{|6·3·(−6)|}{6}=18 u³'],
['Comprobamos con base por altura: la base OXY es un triángulo rectángulo y la altura es positiva.','Área(OXY)=frac{6·3}{2}=9\nV=frac{1}{3}·9·6=18 u³'],
])];default:throw Error('Unknown official case');}}
export function buildRankTetrahedraBatch(id='batch-0418',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas con determinantes':'Problemas métricos';x.secondaryTopics=c.slot===4?['Planos y rectas']:[];x.block=c.slot===1?'Álgebra':'Geometría';x.examSlot=c.slot;if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRankTetrahedraBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0418-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0418.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[566,'6897f4f853125d94016aa7c2498820eb7bcce4c5a134dc5f2773fde6ebc404a3',1,'A.4','078298ac1b57d840fb55a92edc80b0e8a184e3881984fe1fa28e8936489ef2ba',0],
[579,'8948619c3f97deb0787e449297cc3904949ef86c8469df859e9d23c5636a08fb',1,'A.4','2c46b6e7b8a0600129ec2c3c68a3c34b748d5c027fe8496406709640622f79cf',0],
[587,'9e05f4d8647530063d69251cbcbf13e7f990abe224aca9576f2e95d1342e4b1b',1,'A.4','044f0ab73c867fd6cbd6e20d1a6d3aaa8dfb986a6484f8126979ef3af2ebd246',0],
[588,'05fb83365c2d5a2e7fded533162b7b70e6837c2ac376874d949f0ea14651cde3',2,'B.4','7612f594bb614edf46a8bb3ddf5eae718358fa5ee5631f19f122de8838eea85c',0],
[596,'e5a1aa84a94cdee287b46fb8413656f21751c536506f9cdb94ff2e89e874862f',1,'A.4','ad34f37905ce7a1b0a2c82a76c85d3b97804f20e486c198e3c9cd3a5e387842c',0]];
export const statements={
566:'Se sabe que los puntos A(−1,2,6) y B(1,4,−2) son simétricos respecto de un plano π.\na) Calcula la distancia de A a π.\nb) Determina la ecuación general del plano π.',
579:'Considera el plano π de ecuación 2x+y+3z−6=0.\na) Calcula el área del triángulo cuyos vértices son los puntos de corte del plano π con los ejes coordenados.\nb) Calcula el volumen del tetraedro determinado por el plano π y los planos coordenados.',
587:'Considera el punto P(1,0,5) y la recta r dada por system{y+2z=0;x=1}.\na) Determina la ecuación del plano que pasa por P y es perpendicular a r.\nb) Calcula la distancia de P a la recta r y el punto simétrico de P respecto a r.',
588:'a) Determina la ecuación del plano que pasa por el punto A(0,1,0) y es perpendicular a la recta r dada por x+1=frac{y+2}{2}=z−1.\nb) Calcula el área del triángulo cuyos vértices son los puntos de corte del plano de ecuación 2x+3y+4z=12 con los ejes coordenados.',
596:'Sean los planos π≡x+3y+2z−5=0 y π′≡−2x+y+3z+3=0.\na) Determina el ángulo que forman π y π′.\nb) Calcula el volumen del tetraedro limitado por π y los planos coordenados.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PLANE_METRICS_SOURCE_LAYOUT']]:[];
export const cases=[{index:566,slot:4,literals:['simétricos','B(1, 4, −2)']},{index:579,slot:4,literals:['2x + y + 3z − 6','tetraedro']},{index:587,slot:4,literals:['(1, 0, 5)','y + 2z = 0']},{index:588,slot:4,literals:['A(0, 1, 0)','2x + 3y + 4z = 12']},{index:596,slot:4,literals:['x + 3y + 2z − 5','−2x + y + 3z + 3']}];
export const proof=c=>({566:{midpoint:[0,3,2],normal:[1,1,-4],plane:[1,1,-4,5],distance:3*Math.SQRT2},579:{vertices:[[3,0,0],[0,6,0],[0,0,2]],cross:[12,6,18],area:3*Math.sqrt(14),volume:6},587:{base:[1,0,0],direction:[0,-2,1],foot:[1,-2,1],mirror:[1,-4,-3],distance:2*Math.sqrt(5),plane:[0,-2,1,-5]},588:{plane:[1,2,1,-2],vertices:[[6,0,0],[0,4,0],[0,0,3]],cross:[12,18,24],area:3*Math.sqrt(29)},596:{normals:[[1,3,2],[-2,1,3]],cosine:.5,angleDegrees:60,vertices:[[5,0,0],[0,5/3,0],[0,0,2.5]],volume:125/36}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_PLANE_VECTOR_METRICS_WITH_INDEPENDENT_SUBSTITUTION',proof(c));switch(c.index){
case 566:return[mk(0,'d(A,π)=3√2.',['d(A,π)=6√2.','d(A,π)=18.','d(A,π)=√2.'],['Dar la distancia entre los dos puntos simétricos, sin dividir por dos.','Confundir la distancia con su cuadrado.','Olvidar el factor tres al simplificar la raíz.'],[
['En una simetría respecto de un plano, el segmento que une los puntos es perpendicular al plano.','AB=B−A=(2,2,−8)'],
['El punto medio pertenece al plano de simetría.','M=(A+B)/2=(0,3,2)'],
['La distancia pedida es la mitad de la longitud del segmento.','d(A,π)=|AB|/2'],
['Calculamos la norma euclídea, sumando los cuadrados de las tres componentes.','|AB|=√(2²+2²+(−8)²)=√72=6√2'],
['Dividimos por dos para obtener la distancia desde un extremo al plano.','d(A,π)=3√2'],
['Comprobamos con el vector desde A al punto medio, que es el pie de la perpendicular.','AM=(1,1,−4); |AM|=√18=3√2'],
]),mk(1,'π: x+y−4z+5=0.',['π: x+y−4z−5=0.','π: x+y+4z−11=0.','π: 2x+2y−8z+5=0.'],['Cambiar el signo del término independiente.','Cambiar solo el signo de la tercera componente normal.','Escalar el normal sin escalar el término independiente.'],[
['El plano mediador tiene por normal la dirección entre los puntos simétricos.','n=AB/2=(1,1,−4)'],
['El punto de paso es el punto medio, no uno de los extremos.','M=(0,3,2)'],
['Escribimos la ecuación punto-normal.','1(x−0)+1(y−3)−4(z−2)=0'],
['Desarrollamos y agrupamos el término independiente.','π: x+y−4z+5=0'],
['Comprobamos que M satisface la ecuación y que AB es paralelo al normal.','0+3−8+5=0; AB=2n'],
['Los valores de la ecuación en A y B son opuestos, confirmando la simetría.','L(A)=−18; L(B)=18; d=18/√18=3√2'],
])];
case 579:return[mk(0,'Área=3√14 unidades cuadradas.',['Área=6√14 unidades cuadradas.','Área=9 unidades cuadradas.','Área=3√13 unidades cuadradas.'],['Omitir el factor un medio del área del triángulo.','Usar una proyección sobre un plano coordenado en vez del triángulo espacial.','Perder una componente al sumar los cuadrados.'],[
['Para obtener cada corte con un eje anulamos las otras dos coordenadas.','A=(3,0,0); B=(0,6,0); C=(0,0,2)'],
['Elegimos dos lados que salgan del mismo vértice.','AB=(−3,6,0); AC=(−3,0,2)'],
['El producto vectorial determina el área del paralelogramo de esos lados.','AB×AC=(12,6,18)'],
['Calculamos su norma sin descartar la tercera dimensión.','|AB×AC|=√(144+36+324)=6√14'],
['El triángulo tiene la mitad del área de dicho paralelogramo.','Área=frac{1}{2}·6√14=3√14'],
['Verificamos con la identidad de Gram, independiente de la expansión vectorial.','|AB|²|AC|²−(AB·AC)²=45·13−9²=504=(6√14)²'],
]),mk(1,'Volumen=6 unidades cúbicas.',['Volumen=36 unidades cúbicas.','Volumen=18 unidades cúbicas.','Volumen=12 unidades cúbicas.'],['Omitir el factor un sexto para el tetraedro.','Usar un medio en lugar de un sexto.','Usar un tercio sin tener en cuenta la base triangular.'],[
['Los vértices son el origen y los tres puntos de corte con los ejes.','O=(0,0,0); A=(3,0,0); B=(0,6,0); C=(0,0,2)'],
['Usamos la base triangular situada en el plano z=0.','Área(OAB)=frac{3·6}{2}=9'],
['La altura desde C a esa base es la distancia al plano z=0.','h=2'],
['El volumen de una pirámide es un tercio del área de su base por la altura.','V=frac{1}{3}·9·2=6'],
['Como segunda comprobación utilizamos el determinante de los tres vectores desde O.','|det(OA,OB,OC)|=3·6·2=36'],
['Ese determinante es el volumen del paralelepípedo, seis veces el del tetraedro.','V=frac{36}{6}=6'],
])];
case 587:return[mk(0,'π: −2y+z−5=0.',['π: y+2z−10=0.','π: −2y+z+5=0.','π: x−1=0.'],['Usar el normal de uno de los planos que definen la recta en vez de su vector director.','Cambiar el signo del término independiente.','Confundir un plano que contiene la recta con uno perpendicular.'],[
['Parametrizamos la recta tomando z como parámetro.','r: (x,y,z)=(1,−2t,t)'],
['El vector director de la recta debe ser normal al plano solicitado.','d=(0,−2,1)=n'],
['El plano pasa por el punto oficial P.','P=(1,0,5)'],
['Aplicamos la ecuación punto-normal.','0(x−1)−2(y−0)+(z−5)=0'],
['Simplificamos para obtener su ecuación general.','π: −2y+z−5=0'],
['Comprobamos pertenencia y perpendicularidad con los datos originales.','L(P)=0; n=d ⇒ r⊥π'],
]),mk(1,'d(P,r)=2√5; P′=(1,−4,−3).',['d(P,r)=2√5; P′=(1,4,3).','d(P,r)=4√5; P′=(1,−4,−3).','d(P,r)=5; P′=(1,0,−5).'],['Cambiar los signos de la imagen al reflejar.','Dar la distancia de P a su simétrico en lugar de la distancia a la recta.','Reflejar respecto de un eje equivocado e ignorar la inclinación de r.'],[
['Buscamos el pie H de la perpendicular como punto de la recta.','H=(1,−2t,t)'],
['La perpendicularidad impone que el vector P−H sea ortogonal al director.','(P−H)·(0,−2,1)=(0,2t,5−t)·(0,−2,1)=5−5t=0'],
['Despejamos y obtenemos el pie.','t=1; H=(1,−2,1)'],
['La distancia es la norma del segmento perpendicular, no la distancia entre los puntos simétricos.','P−H=(0,2,4); d(P,r)=√20=2√5'],
['H debe ser el punto medio de P y de su simétrico.','P′=2H−P=(1,−4,−3)'],
['Comprobamos que H pertenece a r y que PP′ es perpendicular a ella.','−2+2·1=0; x_H=1; (P′−P)·(0,−2,1)=8−8=0'],
])];
case 588:return[mk(0,'π: x+2y+z−2=0.',['π: x+2y+z+2=0.','π: 2x+y+z−1=0.','π: x+2y−z−2=0.'],['Cambiar el signo al trasladar el punto A.','Invertir el coeficiente que determina la componente y del director.','Cambiar el signo de la componente z sin evidencia.'],[
['Igualamos las expresiones continuas a un parámetro.','x=−1+t; y=−2+2t; z=1+t'],
['Leemos el vector director de la recta.','d=(1,2,1)'],
['Un plano perpendicular a r tiene normal paralelo a d.','n=(1,2,1)'],
['Imponemos que pase por A=(0,1,0).','(x−0)+2(y−1)+(z−0)=0'],
['Desarrollamos la ecuación general.','π: x+2y+z−2=0'],
['Verificamos las dos condiciones solicitadas.','L(A)=0+2+0−2=0; n=d ⇒ r⊥π'],
]),mk(1,'Área=3√29 unidades cuadradas.',['Área=6√29 unidades cuadradas.','Área=12 unidades cuadradas.','Área=3√13 unidades cuadradas.'],['Dar el área del paralelogramo en lugar de la mitad.','Usar solo la proyección sobre el plano z=0.','Omitir una componente del producto vectorial.'],[
['Hallamos los cortes del plano con cada eje coordenado.','U=(6,0,0); V=(0,4,0); W=(0,0,3)'],
['Formamos dos lados del triángulo con origen en U.','UV=(−6,4,0); UW=(−6,0,3)'],
['Calculamos el producto vectorial.','UV×UW=(12,18,24)'],
['Calculamos la norma del vector obtenido.','|UV×UW|=√(144+324+576)=6√29'],
['Dividimos por dos para pasar del paralelogramo al triángulo.','Área=3√29'],
['Comprobamos la norma al cuadrado mediante productos escalares.','|UV|²|UW|²−(UV·UW)²=52·45−36²=1044=(6√29)²'],
])];
case 596:return[mk(0,'El ángulo entre los planos es 60°.',['El ángulo entre los planos es 120°.','El ángulo entre los planos es 30°.','El ángulo entre los planos es 90°.'],['Dar el suplementario en vez del ángulo no obtuso entre planos.','Confundir el ángulo con su complementario.','Suponer perpendicularidad sin comprobar el producto escalar.'],[
['El ángulo no obtuso entre planos coincide con el de sus normales, usando valor absoluto.','n=(1,3,2); n′=(−2,1,3)'],
['Calculamos el producto escalar.','n·n′=−2+3+6=7'],
['Calculamos las dos normas.','|n|=√14; |n′|=√14'],
['Aplicamos la fórmula del coseno del ángulo entre planos.','cos α=frac{|n·n′|}{|n||n′|}=frac{7}{14}=frac{1}{2}'],
['Elegimos el ángulo comprendido entre cero y noventa grados.','α=60°'],
['Comprobamos que los normales no son proporcionales ni ortogonales.','n×n′=(7,−7,7)≠0; n·n′=7≠0'],
]),mk(1,'Volumen=frac{125}{36} unidades cúbicas.',['Volumen=frac{125}{6} unidades cúbicas.','Volumen=frac{125}{12} unidades cúbicas.','Volumen=frac{125}{18} unidades cúbicas.'],['Usar el producto de interceptos sin dividir por seis.','Dividir por dos, no por seis.','Usar un tercio del producto e ignorar que la base es triangular.'],[
['El tetraedro está limitado por π y los planos coordenados.','π: x+3y+2z=5'],
['Obtenemos sus tres vértices no nulos.','A=(5,0,0); B=(0,frac{5}{3},0); C=(0,0,frac{5}{2})'],
['El producto de interceptos es el volumen del paralelepípedo asociado.','V_par=5·frac{5}{3}·frac{5}{2}=frac{125}{6}'],
['El tetraedro ocupa un sexto de dicho volumen.','V=frac{1}{6}·frac{125}{6}=frac{125}{36}'],
['Verificamos con la base OAB y la altura de C.','Área(OAB)=frac{1}{2}·5·frac{5}{3}=frac{25}{6}; h=frac{5}{2}'],
['La fórmula de la pirámide produce el mismo resultado.','V=frac{1}{3}·frac{25}{6}·frac{5}{2}=frac{125}{36}'],
])];default:throw Error('Unknown plane metric case');}}
export function buildPlaneMetricsBatch(id='batch-0428',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Propiedades métricas';x.secondaryTopics=[];x.block='Geometría';x.examSlot=4;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EXPLICIT_SPATIAL_METRIC_METHOD'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPlaneMetricsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0428-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0428.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

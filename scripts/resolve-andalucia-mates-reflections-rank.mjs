import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[288,'b47a8d292833a7006d37cfe870ba36821b3bcd14b4d9c4214c46cd89145eaa56',2,'B.4','a60792407d2fe70030aefedc94d60190444ed92185b71949febdf0b52d1c714c',0],
[292,'a098cf97f26b5a80c2114b078958a9549efd8f87843d30465bf6b65e0deb3e8c',2,'6','2f02d9e1a6e48c0493430eb14e738a73e5a4759167c7abcbbac486e841ce1c01',0],
[294,'9b43b63df1b76e5a1b95f77010ec0c24b3448817b7fbfaa1b397a9271c23e44f',2,'8','a12338e74f2c808b4d3ea62b4b5d8b4528399f663e42a8f223abfc6e77da679e',0],
[297,'91c7db7efdbb93cf3f8763fcfd275431e641c6293dd58cfffa42a740afe5d4cd',1,'3','c4d14c6711d24850dd065c3ce6a483dddf5fc8e42d54286b4cd3bd4df1aaf46f',0],
];
export const statements={
288:'Considera el punto P(1;0;2) y la recta r dada por las ecuaciones\nsystem{2x−y−4=0;y+2z−8=0}\na) [1 punto] Calcula la ecuación del plano que pasa por P y es perpendicular a r.\nb) [1,5 puntos] Calcula el punto simétrico de P respecto de la recta r.',
292:'Dadas las matrices A=[[1,1,0],[1,0,1],[0,1,1]] y B=[[0,0,1],[0,1,0],[1,0,0]], se define la matriz M=A+(λ−1)B.\na) [1,5 puntos] Halla los valores de λ para los que la matriz M tiene rango menor que 3.\nb) [1 punto] Para λ=−1, resuelve el sistema lineal homogéneo cuya matriz de coeficientes es M.',
294:'Considera el punto P(2;0;−4) y el plano π:\nsystem{x=9α+3β;y=−1+2α;z=3+4α+β}\na) Halla el punto simétrico del punto P respecto del plano π. [1,75 puntos]\nb) Calcula la distancia del punto P al plano π. [0,75 puntos]',
297:'Considera la matriz A=[[1,−1,m+2],[0,1,m+1],[m,0,5]].\na) Estudia el rango de A según los valores de m. [1,5 puntos]\nb) Para m=2, calcula la inversa de 2020A. [1 punto]',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_REFLECTIONS_RANK_SOURCE_LAYOUT']]:[];
export const cases=[{index:288,literals:['2x − y − 4','y + 2z − 8'],slot:4},{index:292,literals:['M = A + (λ − 1)B','rango menor que 3'],slot:1},{index:294,literals:['x = 9α + 3β','P (2, 0, −4)'],slot:4},{index:297,literals:['m + 2','inversa de 2020A'],slot:1}];
export const proof=c=>({288:{direction:[1,2,-1],plane:[1,2,-1,1],foot:[13/6,1/3,23/6],reflection:[10/3,2/3,17/3]},292:{singular:[-1,2],ranks:[2,1],nullVector:[1,1,1]},294:{normal:[2,3,-6],planeConstant:21,foot:[0,-3,2],reflection:[-2,-6,8],distance:7},297:{singular:[1,-2.5],rankAtSingular:2,detAt2:-9,inverseNumerator:[[-5,-5,7],[-6,3,3],[2,2,-1]],inverseDenominator:18180}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_MATRIX_AND_PROJECTION_CHECK',proof(c));switch(c.index){
case 288:return[mk(0,'Plano: x+2y−z+1=0.',['Plano: x+2y−z−1=0.','Plano: 2x−y−2=0.','Plano: x−2y−z+1=0.'],['Cambiar el signo del término independiente.','Usar la normal de uno de los planos que definen r en vez del director de r.','Cambiar el signo de la componente central del director.'],[
['Despejamos la recta usando x como parámetro para obtener su dirección.','y=2x−4; z=6−x'],
['Tomamos un punto de la recta y un vector director.','Q=(2;0;4); d=(1;2;−1)'],
['Un plano perpendicular a la recta tiene como vector normal un director de ella.','n=d=(1;2;−1)'],
['Imponemos que pase por el punto P mediante la ecuación punto-normal.','(x−1)+2(y−0)−(z−2)=0'],
['Simplificamos la ecuación del plano pedido.','x+2y−z+1=0'],
['Comprobamos pertenencia y perpendicularidad: P satisface la ecuación y la normal es paralela a r.','1+2·0−2+1=0; n=d'],
]),mk(1,'P′=(frac{10}{3};frac{2}{3};frac{17}{3}).',['P′=(frac{13}{6};frac{1}{3};frac{23}{6}).','P′=(3;0;6).','P′=(frac{8}{3};−frac{2}{3};frac{19}{3}).'],['Dar el pie de la perpendicular en lugar del simétrico.','Reflejar respecto de Q en lugar de usar el pie perpendicular.','Cambiar el signo del parámetro de la proyección.'],[
['El punto medio entre P y su simétrico debe ser su proyección ortogonal H sobre r.','H=Q+td=(2+t;2t;4−t)'],
['La perpendicularidad de PH con r determina t de manera única.','(P−H)·d=0; P−Q=(−1;0;−2)'],
['Calculamos el parámetro de la proyección con productos escalares.','t=frac{(P−Q)·d}{d·d}=frac{−1+2}{1+4+1}=frac{1}{6}'],
['Sustituimos el parámetro en la recta.','H=(frac{13}{6};frac{1}{3};frac{23}{6})'],
['Despejamos el simétrico de la ecuación del punto medio.','P′=2H−P=(frac{10}{3};frac{2}{3};frac{17}{3})'],
['Verificamos que H está en r y que el segmento hacia P es perpendicular a su dirección.','2H_x−H_y−4=0; H_y+2H_z−8=0; (P−H)·d=0'],
])];
case 292:return[mk(0,'λ=−1 (rango 2) o λ=2 (rango 1).',['λ=1 (rango 2) o λ=−2 (rango 1).','λ=−1 (rango 1) o λ=2 (rango 2).','λ=2 únicamente (rango 1).'],['Cambiar los signos de las raíces del determinante.','Intercambiar los rangos de los dos valores singulares.','Omitir la raíz simple del determinante.'],[
['Construimos la matriz antes de calcular el determinante.','M=[[1,1,λ−1],[1,λ−1,1],[λ−1,1,1]]'],
['Abreviamos t=λ−1 y expandimos por la primera fila.','det(M)=(t−1)−(1−t)+t(1−t²)'],
['Factorizamos: el rango de una matriz cuadrada es menor que tres exactamente si se anula su determinante.','det(M)=−t³+3t−2=−(t−1)²(t+2)'],
['Recuperamos el parámetro original y resolvemos los factores.','det(M)=−(λ−2)²(λ+1)=0 ⇒ λ=2 o λ=−1'],
['En λ=2 todas las entradas son uno. Hay una fila no nula y todas son iguales.','M=[[1,1,1],[1,1,1],[1,1,1]] ⇒ rango=1'],
['En λ=−1 el menor superior izquierdo no se anula; junto al determinante nulo demuestra rango dos.','det([[1,1],[1,−2]])=−3≠0 ⇒ rango=2'],
]),mk(1,'(x;y;z)=(t;t;t), t∈ℝ.',['(x;y;z)=(t;t;−t), t∈ℝ.','(x;y;z)=(t;−t;t), t∈ℝ.','Únicamente (x;y;z)=(0;0;0).'],['Cambiar el signo de la última variable.','Cambiar el signo de la segunda variable.','Suponer rango tres pese a que el determinante es cero.'],[
['Sustituimos λ=−1 y escribimos el sistema homogéneo.','system{x+y−2z=0;x−2y+z=0;−2x+y+z=0}'],
['El rango de coeficientes es dos y agregar la columna nula no lo cambia. Aplicamos Rouché–Frobenius.','rango(M)=rango(M*)=2<3 ⇒ compatible indeterminado'],
['Restamos la segunda ecuación de la primera para relacionar dos incógnitas.','3y−3z=0 ⇒ y=z'],
['Sustituimos en la primera ecuación y elegimos una variable libre.','x+z−2z=0 ⇒ x=z; z=t'],
['Expresamos toda la familia de soluciones con un parámetro real.','(x;y;z)=(t;t;t), t∈ℝ'],
['Cada ecuación se anula para cualquier t. Existe un parámetro porque hay tres incógnitas y rango dos.','t+t−2t=0; t−2t+t=0; −2t+t+t=0'],
])];
case 294:return[mk(0,'P′=(−2;−6;8).',['P′=(0;−3;2).','P′=(6;6;−16).','P′=(−12;−21;38).'],['Dar la proyección en el plano en lugar del simétrico.','Reflejar en el sentido contrario del normal.','Dividir por la norma en lugar de por su cuadrado.'],[
['La parametrización proporciona un punto y dos vectores del plano.','Q=(0;−1;3); u=(9;2;4); v=(3;0;1)'],
['El producto vectorial proporciona una normal y la ecuación implícita.','n=u×v=(2;3;−6); 2x+3y−6z+21=0'],
['Buscamos la proyección H=P−tn imponiendo que pertenezca al plano.','t=frac{2·2+3·0−6·(−4)+21}{2²+3²+(−6)²}=frac{49}{49}=1'],
['Obtenemos el pie y reflejamos usando la condición de punto medio.','H=(0;−3;2); P′=2H−P'],
['Calculamos las tres coordenadas del punto simétrico.','P′=(−2;−6;8)'],
['Verificamos que H está en el plano y PP′ es normal a él; ambos puntos están a igual distancia de H.','3·(−3)−6·2+21=0; P′−P=−2n; |P−H|=|P′−H|=7'],
]),mk(1,'Distancia: 7 unidades.',['Distancia: 14 unidades.','Distancia: 1 unidad.','Distancia: 49 unidades.'],['Usar la distancia entre P y su simétrico.','Dar el parámetro de proyección sin multiplicar por la norma.','No dividir el valor de la ecuación por la norma del normal.'],[
['Para un plano ax+by+cz+d=0 utilizamos la distancia punto-plano.','d(P,π)=frac{|ax_P+by_P+cz_P+d|}{sqrt{a²+b²+c²}}'],
['La ecuación del plano y el punto fijan todos los coeficientes.','π:2x+3y−6z+21=0; P=(2;0;−4)'],
['Evaluamos el numerador, manteniendo el signo de la coordenada z.','|2·2+3·0−6·(−4)+21|=49'],
['Calculamos la longitud del vector normal.','|n|=sqrt{4+9+36}=7'],
['Dividimos y expresamos la distancia con su unidad.','d(P,π)=frac{49}{7}=7 unidades'],
['Comprobamos independientemente la distancia al pie calculado en el apartado anterior.','|P−H|=sqrt{2²+3²+(−6)²}=7'],
])];
case 297:return[mk(0,'Rango 2 si m=1 o m=−frac{5}{2}; rango 3 en otro caso.',['Rango 2 si m=−1 o m=frac{5}{2}; rango 3 en otro caso.','Rango 1 si m=1 o m=−frac{5}{2}; rango 3 en otro caso.','Rango 2 solo si m=1; rango 3 en otro caso.'],['Cambiar los signos al factorizar el determinante.','Omitir un menor de orden dos no nulo.','Perder la segunda raíz del determinante.'],[
['El rango es tres cuando el determinante de la matriz cuadrada no se anula. Expandimos por la primera fila.','det(A)=5−m(m+1)−m(m+2)'],
['Simplificamos y factorizamos el polinomio resultante.','det(A)=5−2m²−3m=−(2m+5)(m−1)'],
['Identificamos todos los valores excepcionales.','m=1 o m=−frac{5}{2}'],
['Fuera de esos valores el determinante no es cero, por lo que las tres filas son independientes.','m∉{1;−frac{5}{2}} ⇒ rango(A)=3'],
['En ambos valores excepcionales usamos el menor de las primeras dos filas y columnas.','det([[1,−1],[0,1]])=1≠0'],
['El menor garantiza rango al menos dos; el determinante nulo lo limita a dos.','m∈{1;−frac{5}{2}} ⇒ rango(A)=2'],
]),mk(1,'(2020A)^{−1}=frac{1}{18180}[[-5,-5,7],[-6,3,3],[2,2,-1]].',['(2020A)^{−1}=frac{2020}{9}[[-5,-5,7],[-6,3,3],[2,2,-1]].','(2020A)^{−1}=frac{1}{18180}[[-5,-6,2],[-5,3,2],[7,3,-1]].','(2020A)^{−1}=frac{1}{18180}[[5,5,-7],[6,-3,-3],[-2,-2,1]].'],['Multiplicar la inversa por el escalar en lugar de dividir.','Transponer indebidamente la inversa.','Cambiar el signo global de la inversa.'],[
['Sustituimos m=2 y comprobamos que la matriz es invertible.','A=[[1,−1,4],[0,1,3],[2,0,5]]; det(A)=−9≠0'],
['Para calcular la inversa resolvemos AX=b con un segundo miembro general b=(u;v;w).','system{x−y+4z=u;y+3z=v;2x+5z=w}'],
['Despejamos y, después x, y sustituimos en la tercera ecuación.','y=v−3z; x=u+v−7z; 2u+2v−9z=w'],
['Recuperamos las tres incógnitas y leemos los coeficientes de la matriz inversa.','z=frac{2u+2v−w}{9}; y=frac{−6u+3v+3w}{9}; x=frac{−5u−5v+7w}{9}'],
['Aplicamos la inversa de un múltiplo escalar: el escalar también se invierte.','(2020A)^{−1}=frac{1}{2020}A^{−1}=frac{1}{18180}[[-5,-5,7],[-6,3,3],[2,2,-1]]'],
['Comprobamos por producto matricial: la matriz numeradora N cumple AN=NA=9I.','(2020A)(frac{N}{18180})=frac{2020·9}{18180}I=I'],
])];default:throw Error('Unknown official case');}}
export function buildReflectionsRankBatch(id='batch-0404',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Problemas métricos':'Matrices y determinantes';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':'Álgebra';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':'MATRIX_DETERMINANT_IDENTITIES'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildReflectionsRankBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0404-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0404.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

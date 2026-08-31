import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[210,'0fa1c3912eac6e5af10e80bbdfd579032d29e008b33880c6bd4e8f86334d9db6',1,'A.4','780f481cf9a579273a952b3182cb6ae8352db6d3eda1c74b25da488f33487d2f',0],
[222,'0ea3fd4fc59736e3847d6552e64377975175a3605c7742e73d7a41dbf219269c',1,'A.4','13deead994c6e05eaadb352bbd34931e96b8e0a4d903ceb777f888efbf6ddc65',0],
[224,'709f067c52eb7587dd9e7ca886e32e0417213d679ef7c084f3359d93290bb491',1,'A.3','13b01977c52e633ddc053c415adf023e44a73a3370f712b8ae88fa74da4662b2',0],
];
export const statements={
210:'Considera los puntos B(1;2;−3), C(9;−1;2), D(5;0;−1) y la recta r:\nsystem{x+y+1=0;y−z=0}\na) [1,25 puntos] Calcula el área del triángulo cuyos vértices son B, C y D.\nb) [1,25 puntos] Halla un punto A en la recta r de forma que el triángulo ABC sea rectángulo en A.',
222:'Considera el punto P(−3;1;6) y la recta r dada por\nsystem{2x−y−5=0;y−z+2=0}\na) [1,25 puntos] Determina la ecuación del plano que pasa por P y es perpendicular a r.\nb) [1,25 puntos] Calcula las coordenadas del punto simétrico de P respecto de la recta r.',
224:'Considera las matrices\nA=[[−1,1,0],[2,0,0],[1,0,1]]\nB=[[0,2,1],[1,2,0]]\nC=[[1,2],[−1,6]]\na) [0,75 puntos] Halla A^{−1}.\nb) [1,25 puntos] Calcula la matriz X que satisface AX=B^tC (B^t es la matriz traspuesta de B).\nc) [0,5 puntos] Halla el determinante de A^{2013}B^tB(A^{−1})^{2013}.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_ORTHOGONAL_PROJECTIONS_SOURCE_LAYOUT']]:[];
export const cases=[{index:210,literals:['B(1, 2, −3)','rect´angulo en A'],topic:'Problemas métricos',slot:4},{index:222,literals:['(−3, 1, 6)','sim´etrico'],topic:'Problemas métricos',slot:4},{index:224,literals:['AX = BtC','A2013BtB'],topic:'Matrices',slot:1}];
export const proof=c=>c.index===210?{B:[1,2,-3],C:[9,-1,2],D:[5,0,-1],cross:[4,4,-4],area:2*Math.sqrt(3),parameter:-2,A:[1,-2,-2]}:c.index===222?{P:[-3,1,6],direction:[1,2,2],plane:[1,2,2,-11],foot:[3,1,3],symmetric:[9,1,0]}:{A:[[-1,1,0],[2,0,0],[1,0,1]],B:[[0,2,1],[1,2,0]],C:[[1,2],[-1,6]],inverse:[[0,.5,0],[1,.5,0],[0,-.5,1]],X:[[0,8],[-1,14],[1,-6]],determinant:0};
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_LINEAR_ALGEBRA_AND_INDEPENDENT_SUBSTITUTION',proof(c));switch(c.index){
case 210:return[mk(0,'Área = 2√(3).',['Área = 4√(3).','Área = 2√(6).','Área = √(3).'],['Omitir el factor un medio del triángulo.','Sumar incorrectamente los cuadrados del producto vectorial.','Dividir dos veces por dos.'],[
['Tomamos dos lados con origen común en B.','BC=(8;−3;5); BD=(4;−2;2)'],
['El producto vectorial da una normal cuyo módulo es el área del paralelogramo.','BC×BD=((−3)·2−5(−2);5·4−8·2;8(−2)−(−3)·4)'],
['Calculamos sus tres componentes conservando los signos.','BC×BD=(4;4;−4)'],
['Obtenemos el módulo mediante la suma de cuadrados.','|BC×BD|=√(16+16+16)=4√(3)'],
['El triángulo ocupa la mitad del paralelogramo construido con los mismos lados.','Área=frac{1}{2}·4√(3)=2√(3)'],
['Comprobación independiente con el determinante de Gram.','|BC|²=98; |BD|²=24; BC·BD=48; 98·24−48²=48; Área=frac{√(48)}{2}'],
]),mk(1,'A=(1;−2;−2).',['A=(−1;0;0).','A=(0;−1;−1).','A=(2;−3;−3).'],['Tomar el punto de parámetro cero sin exigir ángulo recto.','Omitir un término al resolver la ecuación cuadrática.','Cambiar la raíz del cuadrado perfecto.'],[
['Las ecuaciones de r permiten tomar y=z=t y despejar x.','A(t)=(−t−1;t;t)'],
['Para que el ángulo en A sea recto imponemos producto escalar cero entre AB y AC.','AB=(t+2;2−t;−3−t); AC=(t+10;−1−t;2−t)'],
['Sustituimos las componentes sin usar como vértice otro punto del triángulo.','AB·AC=(t+2)(t+10)+(2−t)(−1−t)+(−3−t)(2−t)=0'],
['Desarrollamos y factorizamos; solo hay una raíz real distinta.','3t²+12t+12=3(t+2)²=0 ⇒ t=−2'],
['Recuperamos el punto y comprobamos las dos ecuaciones originales de la recta.','A=(1;−2;−2); 1−2+1=0; −2−(−2)=0'],
['Comprobamos el ángulo y que los lados no son nulos, de modo que el triángulo no es degenerado.','AB=(0;4;−1); AC=(8;1;4); AB·AC=4−4=0; |AB|²=17; |AC|²=81'],
])];
case 222:return[mk(0,'Plano: x+2y+2z−11=0.',['Plano: x+2y+2z+11=0.','Plano: 2x−y−5=0.','Plano: x−2y−2z+17=0.'],['Cambiar el signo de la constante al sustituir P.','Confundir uno de los planos que definen r con el plano perpendicular pedido.','Cambiar signos del director al formar la normal.'],[
['Despejamos y y z en función de x a partir del sistema que define r.','y=2x−5; z=y+2=2x−3'],
['Leemos un punto y el vector director de la recta.','r(t)=(t;2t−5;2t−3); u=(1;2;2)'],
['La normal de un plano perpendicular a r es paralela a u.','n=(1;2;2)'],
['Usamos P=(−3;1;6) en la ecuación punto-normal.','(x+3)+2(y−1)+2(z−6)=0'],
['Simplificamos las constantes y comprobamos pertenencia de P.','x+2y+2z−11=0; −3+2+12−11=0'],
['La normal no es nula y coincide con el director; queda verificada la perpendicularidad.','n=u; |u|²=9>0'],
]),mk(1,'P′=(9;1;0).',['P′=(3;1;3).','P′=(−9;−1;0).','P′=(9;1;6).'],['Dar el pie de la perpendicular en lugar del punto simétrico.','Invertir el signo al calcular dos veces el pie menos P.','Reflejar solo una coordenada y conservar indebidamente z.'],[
['El punto medio de P y su simétrico es el pie H de la perpendicular a r.','H∈r; PH perpendicular a u=(1;2;2)'],
['Hallamos H intersectando r con el plano perpendicular por P del apartado anterior.','t+2(2t−5)+2(2t−3)−11=0'],
['Resolvemos la ecuación lineal y evaluamos la parametrización.','9t−27=0 ⇒ t=3; H=(3;1;3)'],
['La simetría axial exige que H sea el punto medio; despejamos el simétrico.','P′=2H−P=(6;2;6)−(−3;1;6)=(9;1;0)'],
['Comprobamos que H pertenece a las dos ecuaciones oficiales de r.','2·3−1−5=0; 1−3+2=0'],
['Comprobamos perpendicularidad, punto medio y equidistancia.','P−H=(−6;0;3); (P−H)·u=−6+6=0; P′−H=(6;0;−3)=−(P−H)'],
])];
case 224:return[mk(0,'A^{−1}=frac{1}{2}[[0,1,0],[2,1,0],[0,−1,2]].',['A^{−1}=frac{1}{2}[[0,2,0],[1,1,−1],[0,0,2]].','A^{−1}=[[0,1,0],[2,1,0],[0,−1,2]].','A^{−1}=frac{1}{2}[[0,−1,0],[−2,−1,0],[0,1,−2]].'],['Trasponer indebidamente la matriz inversa.','Omitir el factor uno entre dos.','Cambiar el signo global al usar el determinante.'],[
['Calculamos el determinante para comprobar que la inversa existe.','det(A)=det([[−1,1],[2,0]])=−2≠0'],
['Resolvemos A(x;y;z)=(u;v;w) para cualquier vector del segundo miembro.','system{−x+y=u;2x=v;x+z=w}'],
['La segunda ecuación da x; las otras dos permiten recuperar y y z.','x=frac{v}{2}; y=u+frac{v}{2}; z=w−frac{v}{2}'],
['Leemos los coeficientes de u,v,w por filas de la inversa.','A^{−1}=frac{1}{2}[[0,1,0],[2,1,0],[0,−1,2]]'],
['Multiplicamos A por la propuesta para verificar todas las entradas.','AA^{−1}=[[1,0,0],[0,1,0],[0,0,1]]=I'],
['Comprobamos también el producto en orden inverso.','A^{−1}A=I'],
]),mk(1,'X=[[0,8],[−1,14],[1,−6]].',['X=[[0,16],[−2,28],[2,−12]].','X=[[0,−8],[1,−14],[−1,6]].','X=[[−1,6],[0,16],[1,2]].'],['Omitir el factor un medio de la inversa.','Cambiar el signo global del producto.','Dar B traspuesta por C sin multiplicar por A inversa.'],[
['Comprobamos dimensiones antes de multiplicar: B es 2 por 3 y C es 2 por 2.','B^t:3×2; B^tC:3×2; X:3×2'],
['Trasponemos B, intercambiando filas y columnas.','B^t=[[0,1],[2,2],[1,0]]'],
['Multiplicamos fila por columna para obtener el segundo miembro.','B^tC=[[−1,6],[0,16],[1,2]]'],
['Multiplicamos por A inversa a la izquierda, sin cambiar el orden.','X=A^{−1}B^tC'],
['Evaluamos el producto con la inversa del apartado anterior.','X=[[0,8],[−1,14],[1,−6]]'],
['Sustituimos la matriz obtenida en la ecuación original; la invertibilidad garantiza unicidad.','AX=[[−1,6],[0,16],[1,2]]=B^tC'],
]),mk(2,'Determinante = 0.',['Determinante = 1.','Determinante = −2.','Determinante = 4.'],['Suponer que B traspuesta por B es la identidad.','Conservar solo el determinante de A.','Tomar el cuadrado del determinante de A e ignorar la singularidad.'],[
['B tiene dos filas, por lo que no puede alcanzar rango tres.','rg(B)≤2'],
['El producto B traspuesta por B es cuadrado de orden tres pero sigue teniendo rango como máximo dos.','rg(B^tB)≤rg(B)≤2 ⇒ det(B^tB)=0'],
['Denotamos las matrices por P y M y el determinante no nulo de P por D. Aplicamos multiplicatividad a los tres factores cuadrados, sin calcular las potencias.','P=A^{2013}; M=B^tB; D=det(P)\ndet(PMP^{−1})=D·det(M)·frac{1}{D}'],
['Los factores de A y su inversa son recíprocos y el factor intermedio es cero.','(−2)^{2013}·0·(−frac{1}{2})^{2013}=0'],
['Comprobación independiente: construimos explícitamente el producto intermedio.','B^tB=[[1,2,0],[2,8,2],[0,2,1]]'],
['Tiene un vector no nulo en su núcleo; multiplicar por matrices invertibles no elimina la singularidad.','B(−2;1;−2)=(0;0); B^tB(−2;1;−2)=(0;0;0)'],
])];default:throw Error('Unknown case');}}
export function buildOrthogonalProjectionsBatch(id='batch-0393',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===224?['Determinantes']:[];x.block=c.slot===4?'Geometría':'Álgebra';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':'MATRIX_DETERMINANT_IDENTITIES'};x.qualityGates.pedagogical='FULL_METHOD_WITH_SOURCE_BOUND_PARAMETERS_AND_INDEPENDENT_SUBSTITUTION';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildOrthogonalProjectionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0393-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0393.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

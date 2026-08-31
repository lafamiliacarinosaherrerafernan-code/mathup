import fs from'node:fs';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{officialParts,part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1036,'15c3470cfea7d61b997f1f400cd8e1ecd8baee17b80f43cf5388e1693d2b5a77',2,'B.4','786722e97ced8b558da2429321390a3c613cbe0da254ab1b2c0f307e72fad089',0],
 [1038,'757725a20faff347660e0d616729eb9219db76a4d18297e2896526290649ec77',2,'B.4','4a4f506bbc35c9d2318c757ab186bb5a83b74d7c60e88831a96f5f3ced48906d',0],
 [1043,'230940d6cbc11bf5fecc13ec9f908a84e47b6f5f6c7a1c8c573c8cacae38078e',1,'A.1','df3aacc1998a011564e51940c242204199bcb8b9435da4debfd7fdb6bb4b5170',0],
];
export const statements={1036:'Sea r la recta de ecuación frac{x+2}{3}=frac{y+1}{4}=z.\na) Halla el punto de r que equidista del origen de coordenadas y del punto P(4,−2,2).\nb) Determina el punto de la recta r más próximo al origen de coordenadas.',1038:'Considera los puntos A(1,2,3) y B(−1,0,4).\na) Calcula las coordenadas de los puntos que dividen al segmento AB en tres partes iguales.\nb) Halla la ecuación del plano que pasa por el punto A y es perpendicular al segmento AB.',1043:'Dada la función f:ℝ→ℝ definida por f(x)=ax³+bx²+cx, determina a, b y c sabiendo que su gráfica tiene un punto de inflexión en (1,0), y que la recta tangente en ese punto tiene por ecuación y=−3x+3.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_DISTANCE_TRISECTION_INFLECTION_LAYOUT']]:[];
export const cases=[{index:1036,slot:4,literals:['P (4, −2, 2)','equidista']},{index:1038,slot:4,literals:['A(1, 2, 3)','B(−1, 0, 4)','tres partes']},{index:1043,slot:2,literals:['ax3 + bx2 + cx','(1,0)','y = −3x + 3']}];
export const line1036=t=>[-2+3*t,-1+4*t,t];
export const proof=c=>({1036:{point:[7,11,3],equalSquaredDistances:[179,179],nearest:[-11/13,7/13,5/13],minimumSquared:15/13,nearestParameter:5/13},1038:{A:[1,2,3],B:[-1,0,4],direction:[-2,-2,1],trisections:[[1/3,4/3,10/3],[-1/3,2/3,11/3]],plane:[2,2,-1,-3]},1043:{coefficients:[3,-9,6],point:[1,0],slope:-3,thirdDerivative:18}}[c.index]);
export function solve(c){const ps=c.index===1043?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'INDEPENDENT_COORDINATE_RESIDUALS_DOT_PRODUCTS_AND_DERIVATIVES',proof(c));switch(c.index){
case 1036:return[mk(0,'Q=(7,11,3).',['Q=(4,7,2).','Q=(1,3,1).','Q=(−11,−13,−3).'],['Usar la mitad del término independiente al comparar distancias.','Omitir la norma al cuadrado del punto P.','Cambiar el signo del parámetro obtenido.'],[
 ['Parametrizamos la recta respetando los dos denominadores oficiales.','Q(t)=(−2+3t,−1+4t,t)'],
 ['Igualamos cuadrados de distancias; así evitamos raíces sin alterar la igualdad.','|Q|²=|Q−P|² ⇒ 2Q·P=|P|²'],
 ['Calculamos el término independiente y el producto escalar.','|P|²=16+4+4=24; Q·P=4(−2+3t)−2(−1+4t)+2t=−6+6t'],
 ['Resolvemos la ecuación lineal que determina el único punto.','2(−6+6t)=24 ⇒ t=3'],
 ['Sustituimos el parámetro en la recta.','Q=(−2+9,−1+12,3)=(7,11,3)'],
 ['Verificamos por separado las dos distancias y la pertenencia a r.','|Q|²=49+121+9=179; |Q−P|²=9+169+1=179; frac{7+2}{3}=frac{11+1}{4}=3'],
 ]),mk(1,'H=(−frac{11}{13},frac{7}{13},frac{5}{13}).',['H=(−frac{41}{13},−frac{33}{13},−frac{5}{13}).','H=(−frac{5}{4},0,frac{1}{4}).','H=(1,3,1).'],['Cambiar el signo del parámetro de la proyección.','Imponer y=0 en vez de perpendicularidad al vector director.','Elegir un punto de la recta sin minimizar su distancia.'],[
 ['El punto más cercano es el pie de la perpendicular desde el origen a r.','v=(3,4,1); H=Q(t)'],
 ['Imponemos que el vector desde el origen al pie sea perpendicular a la recta.','Q(t)·v=0'],
 ['Desarrollamos el producto escalar y despejamos el parámetro.','3(−2+3t)+4(−1+4t)+t=−10+26t=0 ⇒ t=frac{5}{13}'],
 ['Sustituimos en las tres coordenadas.','H=(−2+frac{15}{13},−1+frac{20}{13},frac{5}{13})=(−frac{11}{13},frac{7}{13},frac{5}{13})'],
 ['Una comprobación independiente minimiza la distancia al cuadrado completando el cuadrado.','|Q(t)|²=26t²−20t+5=26(t−frac{5}{13})²+frac{15}{13}'],
 ['El coeficiente positivo demuestra mínimo global único; verificamos la ortogonalidad.','3(−frac{11}{13})+4(frac{7}{13})+frac{5}{13}=0'],
 ])];
case 1038:return[mk(0,'C=(frac{1}{3},frac{4}{3},frac{10}{3}); D=(−frac{1}{3},frac{2}{3},frac{11}{3}).',['C=(−frac{2}{3},−frac{2}{3},frac{1}{3}); D=(−frac{4}{3},−frac{4}{3},frac{2}{3}).','C=(frac{5}{3},frac{8}{3},frac{8}{3}); D=(frac{7}{3},frac{10}{3},frac{7}{3}).','C=(frac{1}{2},frac{3}{2},frac{13}{4}); D=(−frac{1}{2},frac{1}{2},frac{15}{4}).'],['Dar los vectores de desplazamiento sin sumar el punto A.','Usar BA en lugar de AB y salir fuera del segmento.','Dividir en cuartos en vez de tercios.'],[
 ['Calculamos el vector desde A hasta B.','AB=B−A=(−2,−2,1)'],
 ['Los puntos interiores de trisección corresponden a parámetros un tercio y dos tercios.','C=A+frac{1}{3}AB; D=A+frac{2}{3}AB'],
 ['Evaluamos el primero coordenada a coordenada.','C=(1−frac{2}{3},2−frac{2}{3},3+frac{1}{3})=(frac{1}{3},frac{4}{3},frac{10}{3})'],
 ['Evaluamos el segundo con el mismo vector director.','D=(1−frac{4}{3},2−frac{4}{3},3+frac{2}{3})=(−frac{1}{3},frac{2}{3},frac{11}{3})'],
 ['Comprobamos que los tres desplazamientos consecutivos son iguales.','AC=CD=DB=(−frac{2}{3},−frac{2}{3},frac{1}{3})'],
 ['La igualdad de vectores demuestra colinealidad, orden y longitudes iguales.','|AB|=3; |AC|=|CD|=|DB|=1'],
 ]),mk(1,'2x+2y−z−3=0.',['2x+2y−z+3=0.','x+2y+3z−14=0.','2x−2y−z+5=0.'],['Cambiar el signo del término independiente.','Usar las coordenadas de A como normal en vez del vector AB.','Cambiar una componente de la normal.'],[
 ['Un plano perpendicular al segmento tiene como normal su vector director.','n=AB=(−2,−2,1)'],
 ['Usamos el punto A en la forma punto-normal.','n·((x,y,z)−(1,2,3))=0'],
 ['Escribimos los productos componente a componente.','−2(x−1)−2(y−2)+(z−3)=0'],
 ['Desarrollamos y, si se desea, multiplicamos por menos uno.','−2x−2y+z+3=0 ⇔ 2x+2y−z−3=0'],
 ['Comprobamos que A satisface la ecuación.','2·1+2·2−3−3=0'],
 ['La normal del resultado es paralela a AB, por lo que la perpendicularidad también queda verificada.','(2,2,−1)=−AB'],
 ])];
case 1043:return[mk(0,'a=3, b=−9, c=6.',['a=−3, b=9, c=−6.','a=3, b=−3, c=0.','a=1, b=−3, c=2.'],['Invertir el signo de la pendiente tangente.','Perder el factor tres al imponer la segunda derivada nula.','Satisfacer punto e inflexión, pero no la pendiente de la tangente.'],[
 ['El punto dado pertenece a la gráfica y la tangente tiene pendiente menos tres.','f(1)=0; f′(1)=−3'],
 ['Derivamos dos veces y añadimos la condición necesaria de inflexión.','f′=3ax²+2bx+c; f″=6ax+2b; f″(1)=0'],
 ['Traducimos las tres condiciones a un sistema lineal.','a+b+c=0; 3a+2b+c=−3; 6a+2b=0'],
 ['La última ecuación da b y la primera fija c en función de a.','b=−3a; c=2a; 3a−6a+2a=−3 ⇒ a=3'],
 ['Recuperamos coeficientes y verificamos que hay cambio de concavidad, no solo segunda derivada nula.','b=−9; c=6; f″(x)=18(x−1), negativo antes de 1 y positivo después'],
 ['Comprobamos el punto y la recta tangente completos.','f(1)=3−9+6=0; f′(1)=9−18+6=−3; y=−3(x−1)=−3x+3'],
 ])];default:throw Error('Unknown distance/trisection/inflection source');}}
export function buildDistanceTrisectionInflectionBatch(id='batch-0467',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Planos y rectas':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDistanceTrisectionInflectionBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0467-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0467.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

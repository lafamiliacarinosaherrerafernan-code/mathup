import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[573,'8f26bd61ad72286c9619dd2a285b762aa5a353de3a134f51beb40e7bde69c151',1,'A.3','f1cf95af3a1da124fc1272d1f0c598e2591ef96e9d9baf0ce8a480e20f8da94a',0],
[574,'02883b57dfa540931e908920429c12d648ed1810c6ceee66780a26e6f4ebb6d1',2,'NONE.6','255362523916bded7fd19a038d28ca70a9f49f84ab9bfd8ffed67b18dbc41cef',0],
[582,'1a0767cc65a38fb4b848a65db6b624112758b901e6c99ef4da1ae1276214341f',2,'NONE.5','846472fd094fe5917cd2fe9c9e71670afac4c46ee23c62cbd188a88c8bba7d20',0],
[584,'7552fbca6211612f8e7009b2d2036dec3d7e33ceecbbd68eef88f6efe99c2007',1,'A.4','08a750d1ac3b816569f22bd4d0ee2904d7b487cca52d38f5389418cc31e1689a',0]];
export const statements={
573:'Considera el siguiente sistema de ecuaciones lineales\nsystem{x+(m+1)y+2z=−1;mx+y+z=m;(1−m)x+2y+z=−m−1}.\na) Discute el sistema según los valores del parámetro m.\nb) Resuélvelo para m=2. Para dicho valor de m, calcula, si es posible, una solución en la que z=2.',
574:'Considera el sistema:\nsystem{x−my−2z=m;x+y+z=2m;x+2y+mz=3m}.\na) Discute el sistema según los valores de m.\nb) Para m=1 resuelve el sistema, si es posible.',
582:'Sean las rectas r≡frac{x+1}{4}=frac{y+2}{3}=frac{z−2}{−1} y s≡system{x=1−λ;y=2+λ;z=−3−2λ}.\na) Estudia la posición relativa de las rectas r y s.\nb) Halla la ecuación de un plano que contiene a r y a una recta perpendicular a las rectas r y s.',
584:'Considera las rectas r≡frac{x+1}{2}=frac{y}{1}=frac{z+1}{3} y s≡system{2x−3y=−5;y−2z=−1}.\na) Estudia y determina la posición relativa de r y s.\nb) Calcula la distancia entre r y s.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_RANK_SKEW_LINES_SOURCE_LAYOUT']]:[];
export const cases=[{index:573,slot:1,literals:['(m + 1)y','z = 2']},{index:574,slot:1,literals:['3m','m = 1']},{index:582,slot:4,literals:['perpendicular','z = −3 − 2λ']},{index:584,slot:4,literals:['2x − 3y','distancia']}];
export const proof=c=>({573:{roots:[.5,2],augmentedMinorAtHalf:-1.5,solutionAtTwo:[1,-2,2]},574:{roots:[-2,2],solution:[4/3,1,-1/3]},582:{P:[-1,-2,2],Q:[1,2,-3],d:[4,3,-1],e:[-1,1,-2],cross:[-5,9,7],triple:-9,plane:[30,-23,51,-118]},584:{P:[-1,0,-1],Q:[-4,-1,0],d:[2,1,3],e:[3,2,1],cross:[-5,7,1],triple:9,distance:3*Math.sqrt(3)/5}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_RANK_AND_VECTOR_SUBSTITUTION',proof(c));switch(c.index){
case 573:return[mk(0,'m≠frac{1}{2},2: compatible determinado; m=2: compatible indeterminado; m=frac{1}{2}: incompatible.',['m≠frac{1}{2},2: compatible determinado; m=frac{1}{2},2: incompatible.','m≠frac{1}{2},2: compatible determinado; m=frac{1}{2},2: compatible indeterminado.','m≠frac{1}{2},2: compatible determinado; m=frac{1}{2}: compatible indeterminado; m=2: incompatible.'],['Suponer que todo determinante nulo implica incompatibilidad.','Suponer que todo determinante nulo implica infinitas soluciones.','Intercambiar las conclusiones de los valores singulares.'],[
['Escribimos la matriz de coeficientes y calculamos el determinante por la primera fila.','det A=−1−(m+1)(2m−1)+2(3m−1)=−2m²+5m−2'],
['Factorizamos; fuera de las raíces ambos rangos son tres por Rouché–Frobenius.','det A=−(2m−1)(m−2); m≠frac{1}{2},2 ⇒ rg A=rg(A|b)=3'],
['Para m=2, la tercera ecuación es la primera menos la segunda, incluidos sus términos independientes.','F₃=F₁−F₂; −3=−1−2'],
['Un menor de orden dos no nulo demuestra que los dos rangos son exactamente dos.','det[[1,3],[2,1]]=−5≠0; rg A=rg(A|b)=2<3 ⇒ compatible indeterminado'],
['Para m=1/2, la tercera columna es el doble de la primera; un menor de orden dos demuestra rango dos.','C₃=2C₁; det[[1,frac{3}{2}],[frac{1}{2},1]]=frac{1}{4}≠0'],
['La matriz ampliada tiene un menor de orden tres no nulo; los rangos difieren.','det(C₁,C₂,b)=−frac{3}{2}≠0; rg A=2<rg(A|b)=3 ⇒ incompatible'],
]),mk(1,'(x,y,z)=(frac{7−t}{5},frac{−4−3t}{5},t), t∈ℝ; para z=2: (1,−2,2).',['(x,y,z)=(frac{7+t}{5},frac{−4−3t}{5},t), t∈ℝ; para z=2: (frac{9}{5},−2,2).','(x,y,z)=(frac{7−t}{5},frac{−4+3t}{5},t), t∈ℝ; para z=2: (1,frac{2}{5},2).','(x,y,z)=(frac{7−t}{5},frac{−4−3t}{5},t), t∈ℝ; no existe solución con z=2.'],['Cambiar el signo de z al despejar x.','Cambiar el signo de tres z al despejar y.','Imponer una restricción inexistente al parámetro libre.'],[
['Sustituimos m=2 y usamos las dos ecuaciones independientes.','x+3y+2z=−1; 2x+y+z=2'],
['Tomamos la tercera incógnita como parámetro libre.','z=t; y=2−t−2x'],
['Sustituimos en la primera ecuación y despejamos x.','x+3(2−t−2x)+2t=−1 ⇒ −5x−t=−7 ⇒ x=frac{7−t}{5}'],
['Recuperamos y y escribimos la familia completa.','y=2−t−frac{14−2t}{5}=frac{−4−3t}{5}; z=t'],
['Para obtener la solución solicitada basta fijar t=2.','(x,y,z)=(1,−2,2)'],
['Comprobamos las tres ecuaciones originales para m=2, incluida la redundante.','1+3(−2)+4=−1; 2−2+2=2; −1−4+2=−3'],
])];
case 574:return[mk(0,'m≠−2,2: compatible determinado; m=−2 o m=2: incompatible; nunca compatible indeterminado.',['m≠−2,2: compatible determinado; m=−2 o m=2: compatible indeterminado.','m≠−2,2: compatible determinado; m=2: compatible indeterminado; m=−2: incompatible.','m≠−2,2: compatible determinado; m=−2: compatible indeterminado; m=2: incompatible.'],['Concluir infinitas soluciones únicamente por determinante nulo.','No comprobar la incompatibilidad para m=2.','No comprobar la incompatibilidad para m=−2.'],[
['Calculamos el determinante de la matriz de coeficientes.','det A=(m−2)+m(m−1)−2=m²−4=(m−2)(m+2)'],
['Para valores no singulares el rango es tres y la solución es única.','m≠−2,2 ⇒ rg A=rg(A|b)=3'],
['Para m=2 restamos la primera ecuación a la segunda y a la tercera.','3y+3z=2; 4y+4z=4'],
['Las dos ecuaciones exigen valores distintos para y+z; el menor en x,z acredita rango dos.','y+z=frac{2}{3} y y+z=1; det[[1,−2],[1,1]]=3≠0 ⇒ rg A=2<rg(A|b)=3'],
['Para m=−2, las ecuaciones primera y tercera tienen el mismo lado izquierdo y diferentes términos independientes.','x+2y−2z=−2; x+2y−2z=−6 ⇒ 0=−4'],
['El mismo menor no nulo fija rango dos; por Rouché–Frobenius también es incompatible.','rg A=2<rg(A|b)=3; en ningún valor hay infinitas soluciones'],
]),mk(1,'(x,y,z)=(frac{4}{3},1,−frac{1}{3}).',['(x,y,z)=(frac{4}{3},1,frac{1}{3}).','(x,y,z)=(frac{2}{3},1,frac{1}{3}).','(x,y,z)=(frac{4}{3},−1,−frac{1}{3}).'],['Perder el signo negativo de z.','Usar x−z=1 en lugar de x+z=1.','Cambiar el signo al restar ecuaciones para obtener y.'],[
['Sustituimos m=1 en las tres ecuaciones.','x−y−2z=1; x+y+z=2; x+2y+z=3'],
['Restamos la segunda ecuación a la tercera.','y=3−2=1'],
['Sustituimos ese valor en las dos primeras ecuaciones.','x−2z=2; x+z=1'],
['Restamos las ecuaciones reducidas para despejar z.','−3z=1 ⇒ z=−frac{1}{3}'],
['Recuperamos x usando x+z=1.','x=1+frac{1}{3}=frac{4}{3}'],
['Verificamos todos los términos independientes originales.','frac{4}{3}−1+frac{2}{3}=1; frac{4}{3}+1−frac{1}{3}=2; frac{4}{3}+2−frac{1}{3}=3'],
])];
case 582:return[mk(0,'Las rectas r y s se cruzan.',['Las rectas r y s son secantes.','Las rectas r y s son paralelas distintas.','Las rectas r y s son coincidentes.'],['Suponer coplanaridad sin comprobar el producto mixto.','Confundir directores no proporcionales con paralelos.','Confundir cualquier representación paramétrica con la misma recta.'],[
['Tomamos un punto y un director de cada recta, respetando los signos.','P=(−1,−2,2); d=(4,3,−1); Q=(1,2,−3); e=(−1,1,−2)'],
['El producto vectorial de los directores detecta si son paralelos.','d×e=(−5,9,7)'],
['Como el producto vectorial no es nulo, no pueden ser paralelas ni coincidentes.','(−5,9,7)≠(0,0,0)'],
['Para decidir si se cortan comprobamos la coplanaridad usando un vector entre sus puntos.','PQ=Q−P=(2,4,−5)'],
['Calculamos el producto mixto.','PQ·(d×e)=−10+36−35=−9≠0'],
['El producto mixto no nulo demuestra que no son coplanarias: se cruzan en el espacio.','r y s: rectas cruzadas'],
]),mk(1,'π: 30x−23y+51z−118=0.',['π: 30x−23y+51z+118=0.','π: −5x+9y+7z−1=0.','π: 30x+23y+51z−26=0.'],['Cambiar el signo del término independiente al imponer el punto de paso.','Tomar como normal el director de la perpendicular en vez de incorporarlo como dirección del plano.','Cambiar solo el signo de la componente y del normal.'],[
['Una dirección perpendicular a las dos rectas es el producto vectorial de sus directores.','w=d×e=(−5,9,7)'],
['El plano buscado contiene la dirección de r y la dirección w.','d=(4,3,−1); w=(−5,9,7)'],
['Su normal es perpendicular a esas dos direcciones, por lo que calculamos otro producto vectorial.','n=d×w=(30,−23,51)'],
['Imponemos el paso por P, que pertenece a r.','30(x+1)−23(y+2)+51(z−2)=0'],
['Desarrollamos y verificamos las dos direcciones del plano.','30x−23y+51z−118=0; n·d=120−69−51=0; n·w=−150−207+357=0'],
['La perpendicular común a las rectas tiene dirección w y corta r; por tanto también está contenida en este plano.','w·d=−20+27−7=0; w·e=5+9−14=0'],
])];
case 584:return[mk(0,'Las rectas r y s se cruzan.',['Las rectas r y s son secantes.','Las rectas r y s son paralelas distintas.','Las rectas r y s son coincidentes.'],['Suponer que se cortan sin comprobar coplanaridad.','Comparar solo una componente de sus vectores directores.','Ignorar que sus direcciones son distintas.'],[
['Parametrizamos r y tomamos z=t en las ecuaciones de s.','r: (−1,0,−1)+u(2,1,3); s: (−4,−1,0)+t(3,2,1)'],
['En s, y=2t−1 y 2x=−5+3(2t−1), de donde x=3t−4.','P=(−1,0,−1); Q=(−4,−1,0)'],
['Calculamos el producto vectorial para comprobar si los directores son paralelos.','d×e=(2,1,3)×(3,2,1)=(−5,7,1)≠0'],
['Formamos el vector que une un punto de cada recta.','PQ=Q−P=(−3,−1,1)'],
['El producto mixto prueba si ambas rectas pertenecen a un plano.','PQ·(d×e)=15−7+1=9≠0'],
['No son paralelas ni coplanarias, por lo que no se cortan: se cruzan.','r y s: rectas cruzadas'],
]),mk(1,'d(r,s)=frac{3√3}{5}.',['d(r,s)=frac{9}{5}.','d(r,s)=frac{3}{25}.','d(r,s)=√11.'],['Omitir la raíz de tres al calcular la norma del vector perpendicular.','Dividir por la norma al cuadrado.','Usar la distancia entre dos puntos arbitrarios de las rectas.'],[
['Para dos rectas cruzadas usamos la componente de PQ sobre la dirección perpendicular a ambas.','d(r,s)=frac{|PQ·(d×e)|}{|d×e|}'],
['Los datos vectoriales obtenidos del sistema original son los siguientes.','PQ=(−3,−1,1); d×e=(−5,7,1)'],
['Calculamos el numerador como producto mixto en valor absoluto.','|PQ·(d×e)|=|15−7+1|=9'],
['La norma del producto vectorial es la raíz de la suma de cuadrados.','|d×e|=√(25+49+1)=√75=5√3'],
['Dividimos y racionalizamos sin cambiar el valor.','d(r,s)=frac{9}{5√3}=frac{3√3}{5}'],
['Comprobamos mediante la distancia desde Q al plano paralelo a s que contiene r.','π: −5x+7y+z−4=0; L(Q)=20−7−4=9; d(Q,π)=frac{9}{√75}'],
])];default:throw Error('Unknown rank/skew case');}}
export function buildRankSkewLinesBatch(id='batch-0430',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Propiedades métricas':'Sistemas con determinantes';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':'Álgebra';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EXPLICIT_SPATIAL_METRIC_METHOD':'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRankSkewLinesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0430-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0430.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[716,'cffd05495fa4301b4e76dd5e5b7c988c832efe62e752189fc6d3d34042dd9516',1,'A.1','c19133641ace7e8d6c35d04176804da31f10ae377899aa13306c7760d55fc74b',0],
[717,'ebc02a7f8b0e620b0f8134f8e32b5215847b3dc50890fe40538337ed88a54a6d',2,'NONE.3','0a706a90039be7753d769055acc2182d6b2abd45c2842f85a5e4e06b736697dc',0],
[719,'3c73d7569c1433d92a94cc59d448ac36b1ef461888db782ababda36489d9f359',2,'B.7','b719c51aadb997b270d189c8519c0638586dbbd5577bbece9e339014d4f9c9d9',0],
[720,'8948619c3f97deb0787e449297cc3904949ef86c8469df859e9d23c5636a08fb',2,'NONE.3','89802b1b23944044f42be3477af9723f9bd4d837e83afc0ab4749a55da43ea6d',0]];
export const statements={
716:'Se necesita construir un depósito cilíndrico, con tapas inferior y superior, con capacidad de 20π m³. El material para las tapas cuesta 10 euros cada m² y el material para el resto del cilindro 8 euros cada m². Calcula, si existe, el radio de las tapas y la altura del cilindro que hace que el coste total sea mínimo.',
717:'Dada la matriz A=matrix{−1,1;2,−1}.\na) Demuestra que A²+2A=I y que A⁻¹=A+2I, siendo I la matriz identidad de orden 2.\nb) Calcula la matriz X que verifica la ecuación A²+XA+5A=4I.',
719:'Considera los planos π₁≡x−y+z=0 y π₂≡x+y=2.\na) Calcula la distancia entre la recta intersección de π₁ y π₂ y el punto P(2,6,−2).\nb) Halla el ángulo que forman π₁ y π₂.',
720:'Considera el siguiente sistema de ecuaciones lineales,\nsystem{2x−4y+6z=6;my+2z=m+1;−3x+6y−3mz=−9}.\na) Discute el sistema según los valores del parámetro m.\nb) Resuélvelo para m=3. Para dicho valor de m, calcula, si es posible, una solución en la que y=0.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_TANK_INVERSE_DISTANCE_LAYOUT']]:[];
export const cases=[{index:716,slot:2,literals:['con tapas inferior y superior','20π m3','10 euros','8 euros']},{index:717,slot:1,literals:['−1 1 2 −1','A2 + XA + 5A = 4I']},{index:719,slot:4,literals:['x − y + z = 0','x + y = 2','P (2, 6, −2)']},{index:720,slot:1,literals:['my + 2z = m + 1','−3x + 6y − 3mz = −9']}];
export const proof=c=>({716:{volume:20*Math.PI,capCost:10,sideCost:8,radius:2,height:5,cost:240*Math.PI},717:{A:[[-1,1],[2,-1]],square:[[3,-2],[-4,3]],inverse:[[1,1],[2,1]],X:[[0,3],[6,0]]},719:{normals:[[1,-1,1],[1,1,0]],Q:[0,2,2],direction:[1,-1,-2],P:[2,6,-2],projectionParameter:1,H:[1,1,0],distance:Math.sqrt(30),angle:Math.PI/2},720:{singular:[0,3],incompatible:0,infinite:3,particularAtThree:[-3,0,2],determinantCoefficients:[0,18,-6]}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_COST_MATRIX_PRODUCT_PROJECTION_AND_RANK_CHECK',proof(c));switch(c.index){
case 716:return[mk(0,'Radio r=2 m y altura h=5 m.',['Radio r=∛16 m y altura h=frac{20}{∛256} m.','Radio r=∛4 m y altura h=frac{20}{∛16} m.','Radio r=2 m y altura h=frac{5}{2} m.'],['Contar una sola tapa, en vez de la inferior y la superior.','Omitir el factor dos del área lateral del cilindro.','Introducir un factor dos inexistente en la fórmula del volumen.'],[
['El depósito está cerrado por dos tapas. Definimos radio y altura positivos y usamos el volumen como restricción.','r>0; h>0; πr²h=20π ⇒ h=frac{20}{r²}'],
['El coste de las dos bases y el coste lateral tienen precios distintos por metro cuadrado.','C=10·2πr²+8·2πrh=20πr²+16πrh'],
['Sustituimos la altura para trabajar con una sola variable y derivamos.','C(r)=20πr²+frac{320π}{r}; C′(r)=40πr−frac{320π}{r²}'],
['Igualamos a cero; al ser r positivo, el único radio crítico es la raíz positiva.','40πr³−320π=0 ⇒ r³=8 ⇒ r=2 m'],
['La derivada es negativa antes de dos y positiva después; además el coste tiende a infinito en ambos extremos del dominio, por lo que el mínimo es absoluto.','C′=frac{40π(r³−8)}{r²}; C→+∞ si r→0⁺ o r→+∞'],
['Recuperamos la altura, comprobamos capacidad y coste, y damos las dimensiones con unidades.','h=frac{20}{4}=5 m; V=π·2²·5=20π m³; C_min=240π euros; (r,h)=(2,5) m'],
])];
case 717:return[mk(0,'A²+2A=I; A⁻¹=A+2I=matrix{1,1;2,1}.',['A²−2A=I; A⁻¹=A−2I=matrix{−3,1;2,−3}.','A²+2A=I; A⁻¹=−A−2I=matrix{−1,−1;−2,−1}.','A²+2A=I; A⁻¹=A+I=matrix{0,1;2,0}.'],['Cambiar el signo del término lineal y de la inversa propuesta.','Confundir el inverso con su opuesto.','Omitir una identidad al factorizar el polinomio matricial.'],[
['Multiplicamos A por sí misma, respetando el producto fila por columna.','A²=matrix{(−1)(−1)+1·2,(−1)·1+1·(−1);2·(−1)+(−1)·2,2·1+(−1)(−1)}=matrix{3,−2;−4,3}'],
['Calculamos el doble de A y sumamos elemento a elemento.','2A=matrix{−2,2;4,−2}; A²+2A=matrix{1,0;0,1}=I'],
['Factorizamos la igualdad, sin sustituir multiplicación matricial por división escalar.','A²+2A=A(A+2I)=I'],
['Al tratarse de un polinomio en A, también puede factorizarse por la derecha.','(A+2I)A=I'],
['Una matriz que verifica ambos productos identidad es la inversa.','A⁻¹=A+2I=matrix{1,1;2,1}'],
['Comprobamos directamente las cuatro entradas del producto con la candidata.','A·matrix{1,1;2,1}=matrix{−1+2,−1+1;2−2,2−1}=I'],
]),mk(1,'X=matrix{0,3;6,0}.',['X=matrix{−6,3;6,−6}.','X=matrix{6,−3;−6,6}.','X=matrix{0,1;2,0}.'],['Cambiar el signo de la contribución de la identidad tras usar la inversa.','Invertir los signos al despejar XA.','Omitir el factor tres de la ecuación simplificada.'],[
['Usamos la identidad demostrada en el apartado anterior para reducir A².','A²=I−2A'],
['Sustituimos en la ecuación original y agrupamos sin permutar X y A.','I−2A+XA+5A=4I ⇒ XA+3A=3I'],
['Despejamos XA y multiplicamos por la inversa a la derecha.','XA=3I−3A ⇒ X=(3I−3A)A⁻¹=3A⁻¹−3I'],
['Sustituimos A⁻¹=A+2I.','X=3(A+2I)−3I=3A+3I'],
['Calculamos la matriz pedida.','X=matrix{−3,3;6,−3}+matrix{3,0;0,3}=matrix{0,3;6,0}'],
['Verificamos la ecuación original por multiplicación independiente.','XA=matrix{6,−3;−6,6}; A²+XA+5A=matrix{4,0;0,4}=4I'],
])];
case 719:return[mk(0,'d(P,r)=√30.',['d(P,r)=6.','d(P,r)=√26.','d(P,r)=√6.'],['Medir hasta un punto arbitrario de la recta en lugar de usar el pie perpendicular.','Omitir la contribución de la coordenada z al calcular la norma.','Usar la longitud del vector director como distancia.'],[
['Parametrizamos la intersección de los dos planos resolviendo ambas ecuaciones.','x=t; y=2−t; z=y−x=2−2t ⇒ r(t)=(t,2−t,2−2t)'],
['Identificamos un punto base y la dirección. El pie de la perpendicular tendrá la forma H=Q+td.','Q=(0,2,2); d=(1,−1,−2); P=(2,6,−2)'],
['La ortogonalidad de PH con la recta determina el parámetro.','t=frac{(P−Q)·d}{d·d}=frac{(2,4,−4)·(1,−1,−2)}{6}=1'],
['Sustituimos para obtener el pie y calculamos el vector perpendicular.','H=(1,1,0); P−H=(1,5,−2)'],
['La distancia es la norma de ese vector.','d(P,r)=√(1²+5²+(−2)²)=√30'],
['Comprobamos el pie en ambos planos y la condición que hace mínima la distancia.','1−1+0=0; 1+1=2; (1,5,−2)·(1,−1,−2)=1−5+4=0'],
]),mk(1,'El ángulo entre los planos es frac{π}{2} rad = 90°.',['El ángulo entre los planos es frac{π}{4} rad = 45°.','El ángulo entre los planos es frac{π}{3} rad = 60°.','El ángulo entre los planos es frac{π}{6} rad = 30°.'],['Confundir el ángulo entre planos con el de una normal respecto a un eje.','Usar un producto escalar uno en vez de cero.','Confundir el ángulo buscado con un ángulo complementario no calculado.'],[
['Las normales se leen de los coeficientes de x, y y z de cada plano.','n₁=(1,−1,1); n₂=(1,1,0)'],
['El ángulo no orientado entre planos se obtiene del ángulo agudo o recto entre sus normales.','cosθ=frac{|n₁·n₂|}{‖n₁‖‖n₂‖}; 0≤θ≤frac{π}{2}'],
['Calculamos el producto escalar con el signo negativo de la segunda entrada de n₁.','n₁·n₂=1·1+(−1)·1+1·0=0'],
['Las dos normales son no nulas y sus módulos no anulan el denominador.','‖n₁‖=√3; ‖n₂‖=√2 ⇒ cosθ=0'],
['El único ángulo del intervalo indicado con coseno cero es recto.','θ=frac{π}{2} rad =90°'],
['Comprobamos la ortogonalidad sin depender de un redondeo decimal.','n₁·n₂=0 ⇒ π₁⊥π₂'],
])];
case 720:return[mk(0,'m∉{0,3}: compatible determinado; m=3: compatible indeterminado; m=0: incompatible.',['m∉{0,3}: compatible determinado; m=0: compatible indeterminado; m=3: incompatible.','m≠3: compatible determinado; m=3: compatible indeterminado; ningún caso incompatible.','m∉{0,3}: compatible determinado; m∈{0,3}: incompatible; ningún caso indeterminado.'],['Intercambiar el valor incompatible y el de infinitas soluciones.','Dividir por m sin analizar el caso m=0.','Suponer que cualquier determinante nulo implica incompatibilidad.'],[
['Formamos la matriz ampliada y eliminamos x e y de la tercera fila sumándole tres medios de la primera.','F₃←F₃+frac{3}{2}F₁ ⇒ (0,0,9−3m | 0)'],
['El sistema escalonado permite leer el determinante y localizar los parámetros singulares.','det A=2m(9−3m)=6m(3−m); valores singulares:0 y 3'],
['Si m no es singular, resolvemos hacia atrás y obtenemos una única solución.','m≠0,3: z=0; y=frac{m+1}{m}; x=5+frac{2}{m} ⇒ compatible determinado'],
['Si m=0, la segunda ecuación exige z=1/2 y la tercera reducida exige z=0: hay contradicción.','m=0:2z=1 y 9z=0 ⇒ rg A=2<rg(A|b)=3 ⇒ incompatible'],
['Si m=3, la última fila es nula también en el término independiente. Las dos primeras filas son independientes.','m=3: rg A=rg(A|b)=2<3 ⇒ compatible indeterminado'],
['Un menor no nulo de las dos primeras filas acredita rango dos en ambos casos singulares y completa la discusión.','det[[2,6],[0,2]]=4≠0; SCD:m∉{0,3}; SCI:m=3; SI:m=0'],
]),mk(1,'(x,y,z)=(frac{17−13t}{3},frac{4−2t}{3},t), t∈ℝ; con y=0: (−3,0,2).',['(x,y,z)=(frac{17−5t}{3},frac{4−2t}{3},t), t∈ℝ; con y=0: (frac{7}{3},0,2).','(x,y,z)=(frac{17−13t}{3},frac{4+2t}{3},t), t∈ℝ; con y=0: (frac{43}{3},0,−2).','(x,y,z)=(frac{17−13t}{3},frac{4−2t}{3},t), t∈ℝ; con y=0: (3,0,2).'],['Distribuir incorrectamente el término −3z al despejar x.','Cambiar el signo de 2z al despejar y.','Cambiar el signo de x en la solución particular aunque la familia sea correcta.'],[
['Sustituimos m=3. La tercera ecuación es −3/2 veces la primera y no añade una restricción.','2x−4y+6z=6; 3y+2z=4; −3x+6y−9z=−9'],
['Tomamos z=t libre y despejamos y de la segunda ecuación.','z=t; y=frac{4−2t}{3}'],
['Sustituimos en la primera ecuación dividida por dos para obtener x.','x=3+2y−3z=3+frac{8−4t}{3}−3t=frac{17−13t}{3}'],
['La condición adicional y=0 fija el valor del parámetro.','frac{4−2t}{3}=0 ⇒ t=2'],
['Sustituimos t=2 para obtener las tres coordenadas.','x=frac{17−26}{3}=−3; y=0; z=2'],
['Comprobamos el punto solicitado en las tres ecuaciones oficiales.','2(−3)+6·2=6; 3·0+2·2=4; −3(−3)−9·2=−9 ⇒ (−3,0,2)'],
])];
default:throw Error('Unknown tank/inverse/distance case');}}
export function buildTankInverseDistanceBatch(id='batch-0436',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===716?'Aplicaciones de derivadas':c.index===717?'Matrices':c.slot===4?'Propiedades métricas':'Sistemas mediante determinantes';x.secondaryTopics=c.slot===4?['Planos y rectas en el espacio']:[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'CLOSED_CYLINDER_MATRIX_IDENTITY_PROJECTION_AND_SINGULAR_RANKS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildTankInverseDistanceBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0436-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0436.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

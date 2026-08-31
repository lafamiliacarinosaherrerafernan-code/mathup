import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[516,'d178e5a4f53fdde351fb047b350393b1a2fcdf04f1f23a23ebd71625431061fd',2,'B.4','4dbfe39ff32dbd9d5b219ffc29a9f91a540df4c6c3b7bc41a25b7de2cbec7f5a',0],
[517,'a1309415c80437b1f75d719c9d420d9f4bf895a58b248aad5ba544cdec0b746d',2,'3.2','dd3a570eebba030d125b13a9aa61ccbb4262985a5effaf5dc4d527819871f9e2',0],
[520,'12862714b2e47a390cc175a51fc4582d522f804e03290abc96be4761fec7e5ae',1,'A.4','1859f171cf015ab1f4433cb4736ee5e775e65aff91a70d105015f6f662d8f844',0],
[522,'a54a5b52abe3cf59c81e26bac758d93baa6dfdde0be1df1a3691c9a3436173cb',2,'B.4','6d7f1090c5237c82542a620eadef05716305c5b9af87b1ce98a1612eab4a267d',0],
[523,'230940d6cbc11bf5fecc13ec9f908a84e47b6f5f6c7a1c8c573c8cacae38078e',2,'B.2','2c07e01a9b9dee03b45b4c6a0fb672b5060a9bf3ed028d070dced44e7af40057',0],
[527,'b47a8d292833a7006d37cfe870ba36821b3bcd14b4d9c4214c46cd89145eaa56',2,'B.1','a60792407d2fe70030aefedc94d60190444ed92185b71949febdf0b52d1c714c',0],
[531,'8bab92660a5a8eecfd54fa7be53b1c173e06c5a122d8c915e97ae36fc0e1dc78',2,'B.4','c4c6b90854b7f84e5284b0789c6e0a4a3b5f0381d8c910a3e77a4fa3aa7e012f',0],
[534,'a236b382afd7ddbc35f4e83791a322bcf96c07c5859fa715a0b6e74f5e2921e1',2,'B.4','a309106149fe960b34b2578dd84add0b083b019fbebce2fd7e15eec6414c043b',0]];
export const statements={
516:'Considera los puntos A(0,5,3), B(−1,4,3), C(1,2,1) y D(2,3,1).\na) Comprueba que los cuatro puntos son coplanarios y que ABCD es un rectángulo.\nb) Calcula el área de dicho rectángulo.',
517:'Considera los planos π₁: 2x−y−z=7, π₂: x−2y+z=3 y el punto P(1,1,0).\na) Determina la ecuación de la recta que pasa por el punto P y es paralela a ambos planos.\nb) Halla la ecuación del plano que pasa por el punto P y es perpendicular a π₁ y a π₂.',
520:'Considera las rectas dadas por\nr: system{x−y+1=0;x−z+1=0} y s: system{x=1−t;y=t;z=2}.\na) Determina la ecuación de la recta que corta perpendicularmente a r y a s.\nb) Halla la distancia entre las rectas r y s.',
522:'Los puntos P(2,0,0) y Q(−1,12,4) son dos vértices de un triángulo. El tercer vértice S pertenece a la recta r de ecuación\nsystem{4x+3z=33;y=0}.\na) Calcula las coordenadas del punto S sabiendo que r es perpendicular a la recta que pasa por P y S.\nb) Comprueba si el triángulo es rectángulo.',
523:'Calcula ∫_{0}^{π/2} x cos(x) dx.',
527:'De entre todos los triángulos rectángulos de hipotenusa 10 unidades, determina las dimensiones del de área máxima.',
531:'Considera los planos π₁, π₂ y π₃ dados respectivamente por las ecuaciones 3x−y+z−4=0, x−2y+z−1=0 y x+z−4=0. Halla la ecuación de la recta que pasa por el punto P(3,1,−1), es paralela al plano π₁ y corta a la recta intersección de los planos π₂ y π₃.',
534:'Considera el plano π de ecuación 6x−my+2z=1 y la recta r dada por\nfrac{x−1}{−3}=frac{y+1}{2}=frac{z+2}{−1}.\na) Calcula m en el caso en que la recta r es perpendicular al plano π.\nb) ¿Existe algún valor de m para el que la recta r esté contenida en el plano π?'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PERPENDICULAR_OPTIMUM_SOURCE_LAYOUT']]:[];
export const cases=[{index:516,slot:4,literals:['A(0, 5, 3)','D(2, 3, 1)']},{index:517,slot:4,literals:['2x − y − z = 7','P (1, 1, 0)']},{index:520,slot:4,literals:['x−y+1 = 0','perpendicularmente']},{index:522,slot:4,literals:['P (2, 0, 0)','4x + 3z = 33']},{index:523,slot:3,whole:true,literals:['x cos(x)dx']},{index:527,slot:2,whole:true,literals:['hipotenusa 10 unidades']},{index:531,slot:4,whole:true,literals:['P (3, 1, −1)','3x − y + z − 4 = 0']},{index:534,slot:4,literals:['6x − my + 2z = 1']}];
export const proof=c=>({516:{plane:[1,-1,2,-1],sideA:[-1,-1,0],sideB:[2,-2,-2],area:2*Math.sqrt(6)},517:{direction:[1,1,1],plane:[1,1,1,-2]},520:{r:[1/3,4/3,4/3],s:[0,1,2],direction:[1,1,-2],distance:Math.sqrt(6)/3},522:{S:[6,0,3],angleVertex:'P',squaredSides:[25,169,194]},523:{integral:Math.PI/2-1},527:{legs:[5*Math.sqrt(2),5*Math.sqrt(2)],hypotenuse:10,area:25},531:{point:[3,1,-1],direction:[-3,2,11],intersection:[9/4,3/2,7/4]},534:{perpendicular:4,parallel:-10,pointMembership:-1,contained:false}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_PAGE_WITH_INDEPENDENT_VECTOR_OR_CALCULUS_CHECK',proof(c));switch(c.index){
case 516:return[mk(0,'Son coplanarios en x−y+2z−1=0; ABCD es un rectángulo.',['Son coplanarios en x−y+2z+1=0; ABCD es un rectángulo.','Son coplanarios en x−y+2z−1=0; ABCD es un cuadrado.','No son coplanarios y ABCD no es un rectángulo.'],['Cambiar el término independiente del plano.','Confundir ángulos rectos con igualdad de todos los lados.','No comprobar la dependencia entre los lados opuestos.'],[
['Calculamos dos lados consecutivos restando coordenadas en el orden indicado.','AB=(−1,−1,0); BC=(2,−2,−2)'],
['Los lados opuestos son los mismos vectores recorridos en sentido contrario. Esto demuestra que el cuadrilátero es un paralelogramo.','CD=(1,1,0)=−AB; DA=(−2,2,2)=−BC'],
['El producto escalar de lados consecutivos es cero, de modo que forman un ángulo recto.','AB·BC=(−1)·2+(−1)·(−2)+0·(−2)=0'],
['Un paralelogramo con un ángulo recto es un rectángulo. Hallamos además un normal no nulo al plano.','AB×BC=(2,−2,4)=2(1,−1,2)'],
['El plano que pasa por A y tiene ese normal contiene los cuatro puntos.','x−(y−5)+2(z−3)=0 ⇒ x−y+2z−1=0'],
['Verificamos directamente las cuatro sustituciones y la no degeneración.','A:0−5+6−1=0; B:−1−4+6−1=0; C:1−2+2−1=0; D:2−3+2−1=0; |AB|²=2, |BC|²=12'],
]),mk(1,'Área = 2√6 unidades cuadradas.',['Área = √6 unidades cuadradas.','Área = 24 unidades cuadradas.','Área = 2√3 unidades cuadradas.'],['Dividir por dos como si se pidiera un triángulo.','Dar el cuadrado del producto de longitudes.','Omitir una componente al medir un lado.'],[
['Como los lados consecutivos son perpendiculares, el área es el producto de sus longitudes.','A=|AB|·|BC|'],
['Calculamos la longitud del primer lado mediante la distancia euclídea.','|AB|=√((−1)²+(−1)²+0²)=√2'],
['Calculamos el segundo lado usando las tres componentes.','|BC|=√(2²+(−2)²+(−2)²)=√12=2√3'],
['Multiplicamos las longitudes y simplificamos el radical.','A=√2·2√3=2√6'],
['Comprobamos de manera independiente con el módulo del producto vectorial.','|AB×BC|=|(2,−2,4)|=√(4+4+16)=√24=2√6'],
['El resultado corresponde al rectángulo entero: no se aplica el factor un medio de un triángulo.','A≈4,898979 unidades cuadradas'],
])];
case 517:return[mk(0,'(x,y,z)=(1,1,0)+t(1,1,1), t∈ℝ.',['(x,y,z)=(1,1,0)+t(1,−1,1), t∈ℝ.','(x,y,z)=(1,1,0)+t(2,−1,−1), t∈ℝ.','(x,y,z)=(1,0,0)+t(1,1,1), t∈ℝ.'],['Cambiar un signo del producto vectorial.','Usar el normal de un plano como director de una recta paralela.','Conservar el director pero perder el punto de paso.'],[
['Una recta paralela a ambos planos tiene un director ortogonal a los dos normales.','n₁=(2,−1,−1); n₂=(1,−2,1)'],
['Calculamos el producto vectorial para satisfacer simultáneamente ambas condiciones.','n₁×n₂=(−3,−3,−3)'],
['Podemos simplificar por un factor no nulo sin cambiar la dirección.','v=(1,1,1)'],
['La recta se obtiene sumando al punto de paso un múltiplo del director.','(x,y,z)=(1,1,0)+t(1,1,1)'],
['Verificamos los dos productos escalares y el paso por P cuando t=0.','v·n₁=2−1−1=0; v·n₂=1−2+1=0'],
['Los valores de las ecuaciones de los planos permanecen constantes sobre la recta; no coincide con ninguno de ellos.','2x−y−z=1≠7; x−2y+z=−1≠3'],
]),mk(1,'x+y+z−2=0.',['x+y+z+2=0.','2x−y−z−1=0.','x−2y+z+1=0.'],['Cambiar el signo al imponer el punto P.','Usar el primer normal en lugar de uno ortogonal a ambos.','Usar el segundo normal en lugar de uno ortogonal a ambos.'],[
['Dos planos son perpendiculares cuando sus normales tienen producto escalar cero.','n·n₁=0; n·n₂=0'],
['El producto vectorial de los normales dados proporciona la dirección del normal buscado.','n₁×n₂=(−3,−3,−3) ⇒ n=(1,1,1)'],
['Usamos la ecuación punto-normal con P(1,1,0).','(1,1,1)·(x−1,y−1,z)=0'],
['Desarrollamos y agrupamos el término independiente.','x+y+z−2=0'],
['Comprobamos que P pertenece al plano.','1+1+0−2=0'],
['Verificamos independientemente las dos perpendicularidades. La dirección común calculada es única salvo escala.','(1,1,1)·(2,−1,−1)=0; (1,1,1)·(1,−2,1)=0'],
])];
case 520:return[mk(0,'(x,y,z)=(0,1,2)+λ(1,1,−2), λ∈ℝ.',['(x,y,z)=(0,1,2)+λ(1,−1,0), λ∈ℝ.','(x,y,z)=(0,1,2)+λ(1,1,2), λ∈ℝ.','(x,y,z)=(0,0,2)+λ(1,1,−2), λ∈ℝ.'],['Usar la dirección de s en lugar de la perpendicular común.','Cambiar el signo de la componente vertical.','Elegir un origen que pierde la intersección con s.'],[
['Parametrizamos ambas rectas con parámetros distintos.','R=(u,u+1,u+1)∈r; S=(1−v,v,2)∈s'],
['El segmento entre los puntos de corte debe ser perpendicular a los dos directores.','S−R=(1−v−u,v−u−1,1−u); dᵣ=(1,1,1); dₛ=(−1,1,0)'],
['Imponemos los dos productos escalares nulos.','(S−R)·dᵣ=1−3u=0; (S−R)·dₛ=2v−2=0'],
['Resolvemos los parámetros y calculamos los pies de la perpendicular.','u=frac{1}{3}; v=1; R=(frac{1}{3},frac{4}{3},frac{4}{3}); S=(0,1,2)'],
['El vector entre los pies es proporcional a (1,1,−2); escribimos la recta entera.','(x,y,z)=(0,1,2)+λ(1,1,−2)'],
['Verificamos las intersecciones para λ=0 y λ=1/3, además de las perpendicularidades.','(1,1,−2)·(1,1,1)=0; (1,1,−2)·(−1,1,0)=0'],
]),mk(1,'d(r,s)=frac{√6}{3} unidades.',['d(r,s)=√6 unidades.','d(r,s)=frac{2}{3} unidades.','d(r,s)=frac{√6}{6} unidades.'],['Omitir el factor un tercio del vector entre los pies.','Confundir distancia con distancia al cuadrado.','Dividir dos veces por el factor del normal.'],[
['Usamos los puntos de corte de la perpendicular común, no puntos cualesquiera.','R=(frac{1}{3},frac{4}{3},frac{4}{3}); S=(0,1,2)'],
['Calculamos su diferencia componente a componente.','S−R=(−frac{1}{3},−frac{1}{3},frac{2}{3})'],
['El módulo de ese vector es la distancia mínima entre las rectas.','d=√(frac{1}{9}+frac{1}{9}+frac{4}{9})=frac{√6}{3}'],
['Comprobamos por el producto mixto tomando puntos sencillos.','Pᵣ=(0,1,1); Pₛ=(1,0,2); Pₛ−Pᵣ=(1,−1,1)'],
['Un normal a ambos directores es (−1,−1,2), cuyo módulo es √6.','(1,1,1)×(−1,1,0)=(−1,−1,2)'],
['La segunda fórmula coincide con el módulo del segmento perpendicular.','d=frac{|(1,−1,1)·(−1,−1,2)|}{√6}=frac{2}{√6}=frac{√6}{3}'],
])];
case 522:return[mk(0,'S=(6,0,3).',['S=(3,0,7).','S=(6,0,−3).','S=(3,0,−4).'],['Elegir un punto de r sin imponer perpendicularidad.','Cambiar el signo al resolver el sistema.','Confundir el director de r con el vértice buscado.'],[
['El vértice S debe satisfacer las dos ecuaciones de la recta.','S=(x,0,z); 4x+3z=33'],
['Un director de r debe ser ortogonal a (4,0,3) y tener componente y nula.','v=(3,0,−4)'],
['La recta PS tiene director S−P; imponemos que sea perpendicular a r.','S−P=(x−2,0,z); (S−P)·v=3(x−2)−4z=0'],
['Resolvemos conjuntamente pertenencia y perpendicularidad.','system{4x+3z=33;3x−4z=6}'],
['Eliminando z: multiplicamos la primera por cuatro y la segunda por tres; sumamos.','25x=150 ⇒ x=6; 24+3z=33 ⇒ z=3'],
['Verificamos ambas condiciones en el documento original.','S=(6,0,3); 4·6+3·3=33; (4,0,3)·(3,0,−4)=12−12=0'],
]),mk(1,'Sí: es rectángulo en P.',['Sí: es rectángulo en Q.','Sí: es rectángulo en S.','No: ninguno de sus ángulos es recto.'],['Asignar el ángulo recto al extremo incorrecto.','Confundir la perpendicularidad a r con un ángulo recto en S.','No calcular el producto escalar de los lados que salen de P.'],[
['Calculamos los dos lados que parten de P.','PQ=(−3,12,4); PS=(4,0,3)'],
['El producto escalar decide si el ángulo de P es recto.','PQ·PS=(−3)·4+12·0+4·3=0'],
['Ambos vectores son no nulos; por tanto, el ángulo entre ellos es de noventa grados.','|PQ|=13; |PS|=5 ⇒ ángulo P=90°'],
['Calculamos el lado opuesto para realizar una comprobación independiente.','QS=(7,−12,−1); |QS|²=49+144+1=194'],
['El teorema de Pitágoras confirma que QS es la hipotenusa.','|PQ|²+|PS|²=169+25=194=|QS|²'],
['Los otros vértices no son rectos: sus productos escalares son positivos y no nulos.','QP·QS=169; SP·SQ=25'],
])];
case 523:return[mk(0,'frac{π}{2}−1.',['frac{π}{2}+1.','1−frac{π}{2}.','frac{π}{2}.'],['Cambiar el signo al evaluar el extremo inferior.','Invertir el orden de evaluación de los extremos.','Omitir el valor de la primitiva en cero.'],[
['El integrando es un producto de una función polinómica y una trigonométrica. Elegimos integración por partes.','u=x; dv=cos(x)dx; du=dx; v=sen(x)'],
['Aplicamos la fórmula conservando el signo de la integral restante.','∫x cos(x)dx=x sen(x)−∫sen(x)dx'],
['Integramos el seno y obtenemos una primitiva.','F(x)=x sen(x)+cos(x)'],
['Verificamos derivando: los dos términos con seno se cancelan.','F′(x)=sen(x)+x cos(x)−sen(x)=x cos(x)'],
['Evaluamos en los dos límites oficiales de integración.','F(π/2)=π/2; F(0)=1'],
['Restamos el valor inferior del superior. El resultado es positivo, coherente con el integrando en este intervalo.','∫_{0}^{π/2}x cos(x)dx=F(π/2)−F(0)=frac{π}{2}−1'],
])];
case 527:return[mk(0,'Catetos 5√2 y 5√2; hipotenusa 10; área máxima 25.',['Catetos 5 y 5; hipotenusa 10; área máxima 12,5.','Catetos 6 y 8; hipotenusa 10; área máxima 24.','Catetos 5√2 y 5√2; hipotenusa 10; área máxima 50.'],['Dividir la hipotenusa por dos sin usar Pitágoras.','Elegir un triángulo válido pero no el de área máxima.','Omitir el factor un medio del área del triángulo.'],[
['Llamamos x e y a los catetos positivos y usamos Pitágoras para imponer la hipotenusa fija.','x²+y²=100; y=√(100−x²); 0<x<10'],
['Expresamos el área en una variable; es la mitad del producto de los catetos.','A(x)=frac{x√(100−x²)}{2}'],
['Derivamos mediante producto y cadena, con el radical positivo en el dominio.','A′(x)=frac{100−2x²}{2√(100−x²)}'],
['El único punto crítico interior anula el numerador y tiene cateto positivo.','100−2x²=0 ⇒ x=√50=5√2; y=5√2'],
['La derivada es positiva antes del punto crítico y negativa después. Los extremos degenerados tienen área cero.','A′>0 si 0<x<√50; A′<0 si √50<x<10; A máxima=frac{50}{2}=25'],
['Verificamos globalmente sin derivadas: el cuadrado de la diferencia de catetos no puede ser negativo. La igualdad exige catetos iguales.','(x−y)²≥0 ⇒ 2xy≤x²+y²=100 ⇒ A=frac{xy}{2}≤25'],
])];
case 531:return[mk(0,'(x,y,z)=(3,1,−1)+t(−3,2,11), t∈ℝ.',['(x,y,z)=(3,1,−1)+t(−3,2,7), t∈ℝ.','(x,y,z)=(3,1,−1)+t(1,0,−3), t∈ℝ.','(x,y,z)=(3,0,−1)+t(−3,2,11), t∈ℝ.'],['Cambiar una componente del director al calcular el punto de corte.','Imponer solo paralelismo sin asegurar que la recta corte la intersección.','Perder el punto P manteniendo la dirección.'],[
['Primero parametrizamos la intersección de π₂ y π₃. Restamos sus ecuaciones.','x+z=4; x−2y+z=1 ⇒ y=frac{3}{2}'],
['Un punto genérico de esa intersección queda descrito con un parámetro.','Q=(u,frac{3}{2},4−u)'],
['La recta buscada une P con Q y debe tener director ortogonal al normal de π₁.','Q−P=(u−3,frac{1}{2},5−u); n₁=(3,−1,1)'],
['Imponemos paralelismo y despejamos el parámetro del punto de corte.','3(u−3)−frac{1}{2}+5−u=0 ⇒ 2u=frac{9}{2} ⇒ u=frac{9}{4}'],
['Calculamos Q y multiplicamos el director por cuatro para evitar fracciones.','Q=(frac{9}{4},frac{3}{2},frac{7}{4}); 4(Q−P)=(−3,2,11)'],
['Comprobamos el punto de paso, el paralelismo y la intersección para t=1/4.','(x,y,z)=P+t(−3,2,11); (−3,2,11)·n₁=0; Q∈π₂∩π₃'],
])];
case 534:return[mk(0,'m=4.',['m=−4.','m=−10.','m=2.'],['Olvidar que la componente y del normal es −m.','Imponer paralelismo de la recta con el plano en vez de perpendicularidad.','No mantener el mismo factor de proporcionalidad en las tres componentes.'],[
['La forma continua proporciona un punto de r y su vector director.','P=(1,−1,−2); v=(−3,2,−1)'],
['El vector normal al plano se obtiene de los coeficientes de x, y, z.','n=(6,−m,2)'],
['Para que recta y plano sean perpendiculares, el director debe ser paralelo al normal.','n=k v'],
['Las componentes x y z determinan el mismo factor de escala.','6=−3k; 2=−k ⇒ k=−2'],
['La componente y permite despejar el parámetro solicitado.','−m=2k=−4 ⇒ m=4'],
['Verificamos las tres componentes conjuntamente.','n=(6,−4,2)=−2(−3,2,−1)'],
]),mk(1,'No existe ningún valor de m.',['Existe únicamente m=−10.','Existe únicamente m=−1.','Existe únicamente m=4.'],['Comprobar solo que el director sea paralelo al plano.','Comprobar solo que un punto pertenezca al plano.','Confundir recta contenida con recta perpendicular.'],[
['Una recta contenida debe tener director paralelo al plano y al menos un punto en él. Son dos condiciones simultáneas.','n·v=0 y P∈π'],
['La condición sobre el director da un primer valor del parámetro.','(6,−m,2)·(−3,2,−1)=−20−2m=0 ⇒ m=−10'],
['Sustituimos el punto P en la ecuación del plano para obtener la segunda condición.','6·1−m·(−1)+2·(−2)=1 ⇒ m+2=1 ⇒ m=−1'],
['Los dos valores son distintos, por lo que no pueden cumplirse las dos condiciones a la vez.','m=−10 y m=−1 son incompatibles'],
['Lo confirmamos sustituyendo toda la recta parametrizada, sin separar condiciones.','x=1−3t; y=−1+2t; z=−2−t'],
['Para que la igualdad valga para todo t deben anularse ambos coeficientes, lo que exige los dos valores incompatibles.','6x−my+2z−1=(m+1)+(−20−2m)t'],
])];default:throw Error('Unknown official case');}}
export function buildPerpendicularOptimumBatch(id='batch-0425',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Problemas métricos':c.slot===3?'Integrales definidas':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.slot===3?'DEFINITE_SUBSTITUTION_WITH_INDEPENDENT_QUADRATURE':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPerpendicularOptimumBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0425-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0425.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

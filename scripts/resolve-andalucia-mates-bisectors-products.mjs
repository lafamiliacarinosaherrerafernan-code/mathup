import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[355,'83fb1553a0210c1a82e5760e2664d28df565127e870fef743346b4bb30953bd8',1,'A.4','493681cf926bddef124fac9b9a49919c1e6fc9c73acec1e016adfd38fa80ce2c',0],
[360,'cffd05495fa4301b4e76dd5e5b7c988c832efe62e752189fc6d3d34042dd9516',1,'A.4','c19133641ace7e8d6c35d04176804da31f10ae377899aa13306c7760d55fc74b',0],
[362,'cffd05495fa4301b4e76dd5e5b7c988c832efe62e752189fc6d3d34042dd9516',1,'A.3','c19133641ace7e8d6c35d04176804da31f10ae377899aa13306c7760d55fc74b',0],
[370,'a1309415c80437b1f75d719c9d420d9f4bf895a58b248aad5ba544cdec0b746d',1,'2','67841959b2a3c76cf6f6565310e205dbe88a30c4d315c5e1c3b3bbd8537180f1',0]];
export const statements={
355:'Considera el punto A(2,1,0) y los planos π₁≡x+y+z=0 y π₂≡x−y+z=0.\na) [1,25 puntos] Calcula la recta que pasa por A y es paralela a π₁ y a π₂.\nb) [1,25 puntos] Calcula los puntos de la recta s≡frac{x−1}{2}=frac{y−2}{3}=frac{z}{2} que equidistan de π₁ y π₂.',
360:'Considera los puntos A(−1,−2,−1) y B(1,0,1).\na) [1,25 puntos] Determina la ecuación del plano respecto del cual los puntos A y B son simétricos.\nb) [1,25 puntos] Calcula la distancia de P(−1,0,1) a la recta que pasa por los puntos A y B.',
362:'Considera la matriz A=[[2,−1],[−1,0]].\na) [0,5 puntos] Comprueba que AAᵗ−2A=I (Aᵗ denota la traspuesta de A e I la matriz identidad).\nb) [0,75 puntos] Calcula A⁻¹.\nc) [1,25 puntos] Determina, si existe, la matriz X que verifica XA+I=3A.',
370:'Una empresa produce tres tipos de productos, A, B y C. Si el precio del producto A tuviera un 10% de descuento y el de los productos B y C tuviera un 20% de descuento cada uno, la suma de los precios de tres productos, uno de cada tipo, sería 66€. El precio total sin descuento de 3 productos del tipo A y 4 productos del tipo B es 140€.\na) [1,25 puntos] ¿Cuánto valdrán 3 productos de tipo A más 8 productos de tipo C?\nb) [1,25 puntos] Determina el precio, sin descuento, de cada tipo de producto, sabiendo además que el precio del producto de tipo C es el doble que el de tipo A.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_BISECTORS_PRODUCTS_SOURCE_LAYOUT']]:[];
export const cases=[{index:355,slot:4,literals:['A(2, 1, 0)','x − y + z = 0']},{index:360,slot:4,literals:['A(−1, −2, −1)','P (−1, 0, 1)']},{index:362,slot:1,literals:['2 −1','XA + I = 3A']},{index:370,slot:1,literals:['66e','140e']}];
export const proof=c=>({355:{direction:[1,0,-1],point:[2,1,0],parameters:[-2/3,-1/4],equidistant:[[-1/3,0,-4/3],[.5,1.25,-.5]]},360:{normal:[1,1,1],offset:1,midpoint:[0,-1,0],distance:Math.sqrt(8/3)},362:{A:[[2,-1],[-1,0]],I:[[1,0],[0,1]],inverse:[[0,-1],[-1,-2]],X:[[3,1],[1,5]]},370:{coefficients:[[.9,.8,.8],[3,4,0],[-2,0,1]],rhs:[66,140,0],requestedPrice:380,prices:[20,20,40]}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_VECTOR_MATRIX_AND_PRICE_VERIFICATION',proof(c));switch(c.index){
case 355:return[mk(0,'r: (x;y;z)=(2;1;0)+t(1;0;−1).',['r: (x;y;z)=(2;1;0)+t(1;0;1).','r: (x;y;z)=t(1;0;−1).','r: (x;y;z)=(2;1;0)+t(1;1;1).'],['Cambiar el signo de la tercera componente al calcular el producto vectorial.','Omitir el punto oficial por el que debe pasar.','Usar una normal de los planos como dirección paralela.'],[
['Extraemos las normales de los dos planos del enunciado.','n₁=(1;1;1); n₂=(1;−1;1)'],
['Una dirección paralela a ambos planos debe ser perpendicular a sus dos normales.','u·n₁=0; u·n₂=0'],
['El producto vectorial proporciona esa dirección y no es nulo.','n₁×n₂=(2;0;−2); u=(1;0;−1)'],
['Usamos el punto A y la dirección calculada para parametrizar la recta.','r: (x;y;z)=(2;1;0)+t(1;0;−1)'],
['Verificamos tanto el paso por A como la orientación exigida.','t=0 ⇒ A; u·n₁=1−1=0; u·n₂=1−1=0'],
['Las sustituciones en los planos dan constantes no nulas, por lo que la recta no corta ninguno.','x+y+z=3; x−y+z=1'],
]),mk(1,'P=(−frac{1}{3};0;−frac{4}{3}), Q=(frac{1}{2};frac{5}{4};−frac{1}{2}).',['Únicamente P=(−frac{1}{3};0;−frac{4}{3}).','Únicamente Q=(frac{1}{2};frac{5}{4};−frac{1}{2}).','P=(frac{7}{3};4;frac{4}{3}), Q=(frac{3}{2};frac{11}{4};frac{1}{2}).'],['Omitir el caso de distancias con signos opuestos.','Omitir el caso de expresiones con el mismo signo.','Cambiar los signos de los dos parámetros obtenidos.'],[
['Parametrizamos s igualando sus tres cocientes al mismo parámetro.','s: (x;y;z)=(1+2t;2+3t;2t)'],
['Las normales tienen la misma longitud. Igualar distancias equivale a igualar los valores absolutos.','frac{|x+y+z|}{√3}=frac{|x−y+z|}{√3}'],
['Separamos los dos signos posibles; ninguno puede omitirse.','x+y+z=x−y+z ⇒ y=0\nx+y+z=−x+y−z ⇒ x+z=0'],
['Sustituimos s en las dos condiciones para hallar los parámetros.','2+3t=0 ⇒ t=−frac{2}{3}\n1+4t=0 ⇒ t=−frac{1}{4}'],
['Calculamos cada punto en la parametrización de la recta.','P=(−frac{1}{3};0;−frac{4}{3})\nQ=(frac{1}{2};frac{5}{4};−frac{1}{2})'],
['Ambos puntos pertenecen a s y dan el mismo valor absoluto en los dos planos.','P: |−frac{5}{3}|=|−frac{5}{3}|\nQ: |frac{5}{4}|=|−frac{5}{4}|'],
])];
case 360:return[mk(0,'π: x+y+z+1=0.',['π: x+y+z−1=0.','π: x+y+z+4=0.','π: x−y+z−1=0.'],['Cambiar el signo del término independiente.','Usar A en lugar del punto medio.','Cambiar una componente de la normal.'],[
['El plano de simetría pasa por el punto medio del segmento AB.','M=frac{A+B}{2}=(0;−1;0)'],
['También es perpendicular al segmento, cuya dirección puede usarse como normal.','B−A=(2;2;2); n=(1;1;1)'],
['Escribimos la ecuación punto-normal usando M.','(x−0)+(y+1)+(z−0)=0'],
['Simplificamos para obtener la ecuación general.','x+y+z+1=0'],
['Las sustituciones de A y B dan valores opuestos: sus distancias al plano coinciden.','A: −1−2−1+1=−3\nB: 1+0+1+1=3'],
['El punto medio está en el plano y AB es paralelo a su normal, por lo que la simetría es exacta.','0−1+0+1=0; B−A=2n'],
]),mk(1,'d(P;AB)=frac{2√6}{3}.',['d(P;AB)=2√2.','d(P;AB)=frac{2√6}{9}.','d(P;AB)=2√6.'],['Confundir la distancia a A con la distancia a la recta.','Dividir otra vez por el cuadrado de la norma de la dirección.','Omitir la normalización del producto vectorial.'],[
['Tomamos una dirección de la recta y el vector desde A hasta P.','u=(1;1;1); v=P−A=(0;2;2)'],
['La distancia a una recta es la altura del paralelogramo determinado por esos vectores.','d=frac{|v×u|}{|u|}'],
['Calculamos el producto vectorial y las dos normas.','v×u=(0;2;−2); |v×u|=2√2; |u|=√3'],
['Dividimos y racionalizamos para obtener una distancia positiva.','d=frac{2√2}{√3}=frac{2√6}{3}'],
['Comprobamos mediante la proyección ortogonal de v sobre u.','t=frac{v·u}{u·u}=frac{4}{3}\nH=A+tu=(frac{1}{3};−frac{2}{3};frac{1}{3})'],
['PH es perpendicular a u y su longitud reproduce la distancia calculada.','(P−H)·u=0; |P−H|²=frac{8}{3}'],
])];
case 362:return[mk(0,'AAᵗ−2A=[[1,0],[0,1]]=I.',['AAᵗ−2A=[[9,−4],[−4,1]].','AAᵗ−2A=[[1,0],[0,−1]].','AAᵗ−2A=[[0,0],[0,0]].'],['Sumar 2A en lugar de restarlo.','Cambiar el signo del producto de los dos elementos negativos.','Confundir A²−2A con la matriz nula.'],[
['La matriz es simétrica, por lo que su traspuesta coincide con ella.','Aᵗ=A=[[2,−1],[−1,0]]'],
['Calculamos el producto fila por columna, sin elevar cada entrada al cuadrado por separado.','AAᵗ=[[4+1,−2+0],[−2+0,1+0]]'],
['Reducimos las sumas del producto.','AAᵗ=[[5,−2],[−2,1]]'],
['Multiplicamos todas las entradas de A por dos.','2A=[[4,−2],[−2,0]]'],
['Restamos entrada por entrada para verificar la identidad pedida.','AAᵗ−2A=[[1,0],[0,1]]=I'],
['La comprobación equivalente A²=2A+I reproduce todas las entradas del producto.','2A+I=[[5,−2],[−2,1]]=A²'],
]),mk(1,'A⁻¹=[[0,−1],[−1,−2]].',['A⁻¹=[[0,1],[1,2]].','A⁻¹=[[2,−1],[−1,0]].','A⁻¹=[[4,−1],[−1,2]].'],['Omitir el signo del determinante al dividir la adjunta.','Confundir simetría con ser su propia inversa.','Sumar 2I en vez de restarlo en la identidad del apartado anterior.'],[
['Comprobamos que el determinante no es cero antes de buscar la inversa.','det(A)=2·0−(−1)(−1)=−1≠0'],
['La identidad ya demostrada permite factorizar A por la izquierda.','A²−2A=A(A−2I)=I'],
['Por tanto A−2I es la inversa de A.','A⁻¹=A−2I'],
['Restamos dos a los elementos diagonales, no a todos los elementos.','A⁻¹=[[0,−1],[−1,−2]]'],
['Multiplicamos A por la candidata para verificar el producto identidad.','AA⁻¹=[[1,0],[0,1]]'],
['La multiplicación en el orden inverso también da la identidad.','A⁻¹A=[[1,0],[0,1]]'],
]),mk(2,'X=[[3,1],[1,5]].',['X=[[5,−1],[−1,3]].','X=[[6,−3],[−3,0]].','X=[[1,1],[1,3]].'],['Usar A⁻¹ con signo cambiado al calcular 3I−A⁻¹.','Omitir la identidad y confundir X con 3A.','Confundir 3I con la identidad antes de restar la inversa.'],[
['Aislamos XA pasando la identidad al otro miembro.','XA=3A−I'],
['Como A es invertible, multiplicamos por A⁻¹ a la derecha para cancelar A.','X=(3A−I)A⁻¹'],
['Distribuimos manteniendo el orden correcto de los productos.','X=3I−A⁻¹'],
['Usamos A⁻¹=A−2I para simplificar la expresión de X.','X=3I−(A−2I)=5I−A'],
['Calculamos las entradas de la solución única.','X=[[3,1],[1,5]]'],
['Sustituimos en la ecuación original y verificamos todas las entradas.','XA=[[5,−3],[−3,−1]]\nXA+I=[[6,−3],[−3,0]]=3A'],
])];
case 370:return[mk(0,'3 productos A y 8 productos C cuestan 380€.',['3 productos A y 8 productos C cuestan 520€.','3 productos A y 8 productos C cuestan 66€.','3 productos A y 8 productos C cuestan 280€.'],['Restar una sola vez la segunda ecuación en vez del doble.','Confundir el precio descontado de tres productos con la combinación pedida.','Tomar el doble de la segunda compra sin eliminar B.'],[
['Llamamos a, b y c a los precios sin descuento en euros. Aplicamos cada descuento a su producto.','frac{9}{10}a+frac{8}{10}b+frac{8}{10}c=66'],
['Eliminamos decimales multiplicando por diez y escribimos la segunda compra.','9a+8b+8c=660; 3a+4b=140'],
['No necesitamos hallar cada precio: buscamos una combinación que elimine b.','2(3a+4b)=6a+8b=280'],
['Restamos esa igualdad de la primera ecuación.','(9a+8b+8c)−(6a+8b)=660−280'],
['La combinación restante coincide exactamente con la compra solicitada.','3a+8c=380€'],
['La identidad de coeficientes demuestra que el resultado es fijo para cualquier terna compatible.','(9;8;8)−2(3;4;0)=(3;0;8)'],
]),mk(1,'A: 20€; B: 20€; C: 40€.',['A: 40€; B: 20€; C: 20€.','A: 20€; B: 40€; C: 40€.','A: 10€; B: 27,5€; C: 20€.'],['Invertir la relación entre C y A.','Duplicar también el precio B sin que lo pida el enunciado.','Dividir por dos el precio A antes de usar C=2A.'],[
['Incorporamos la relación adicional entre los dos precios sin descuento.','c=2a'],
['La combinación del apartado anterior permite despejar a directamente.','3a+8(2a)=380 ⇒ 19a=380'],
['Hallamos a y después c.','a=20€; c=40€'],
['Sustituimos en la segunda compra para recuperar b.','3·20+4b=140 ⇒ 4b=80 ⇒ b=20€'],
['Verificamos la compra con descuentos del enunciado.','0,9·20+0,8·20+0,8·40=18+16+32=66€'],
['Las otras dos condiciones también se cumplen, sin confundir precios y precios descontados.','3·20+4·20=140€; 40=2·20'],
])];default:throw Error('Unknown official case');}}
export function buildBisectorsProductsBatch(id='batch-0417',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Planos y rectas':c.index===370?'Sistemas con determinantes':'Matrices y determinantes';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':'Álgebra';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.index===370?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':'MATRIX_DETERMINANT_IDENTITIES'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildBisectorsProductsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0417-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0417.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

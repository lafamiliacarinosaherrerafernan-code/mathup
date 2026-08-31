import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {graphs} from './resolve-andalucia-mates-source-areas.mjs';
export const observations=[
[931,'7552fbca6211612f8e7009b2d2036dec3d7e33ceecbbd68eef88f6efe99c2007',2,'B.4','af466404b9b74551c0c0b20184b77da18146575de025f11c178f4f7a71d6a4e8',0],
[932,'709f067c52eb7587dd9e7ca886e32e0417213d679ef7c084f3359d93290bb491',2,'B.3','7139f73abb048f68c3b5a4d4f43f681833a7949320a1d025dd4c65052f18d1a0',0],
[936,'a23cb9ae7edcd859afee53690780388850c71ff86362f0faf67c5c9e78634241',1,'B.3','ff36ecb8dbb5678530f5cffaada33337fe7fe12bdea42ef87f9a72664950984d',0],
[937,'e9cdab8c67f3149fd8325f98321a2a7c369958dad473274c0c62f60db905ca7a',2,'B.5','01921cf4ad8e23b00b6047cbb038b7946bc3113e75268c5958b345c9eb0b8655',0],
[939,'230940d6cbc11bf5fecc13ec9f908a84e47b6f5f6c7a1c8c573c8cacae38078e',2,'B.4','2c07e01a9b9dee03b45b4c6a0fb672b5060a9bf3ed028d070dced44e7af40057',0],
[940,'0ae552bbdf80d1bddb44757bd8d302d6b215c73a92c352c129649990ed7a452c',2,'B.4','ce6a56ff1fb5205f603f03fabf862fd54e22fee00e7f5d6a680ad99db5779c7a',0]];
export const statements={
931:'Considera las rectas r≡frac{x−1}{2}=frac{y+1}{m}=z y s≡system{x+nz=−2;y−z=−3}.\na) Halla los valores de m y n para los que r y s se cortan perpendicularmente.\nb) Para m=3 y n=1, calcula la ecuación general del plano que contiene a r y a s.',
932:'Sabiendo que el determinante de una matriz A=matrix{a,b,c;d,e,f;p,q,r} es 4, calcula los siguientes determinantes indicando, en cada caso, las propiedades que utilizas:\na) det(−2A) y det(A⁻¹).\nb) det matrix{a,−b,c;2d,−2e,2f;p,−q,r} y det matrix{−3d,−3e,−3f;a,b,c;−p,−q,−r}.',
936:'Considera la función f:ℝ→ℝ definida por f(x)=x³−6x²+8x.\na) Calcula los puntos de corte de la gráfica de f con los ejes de coordenadas y esboza dicha gráfica.\nb) Calcula la suma de las áreas de los recintos acotados y limitados por la gráfica de f y el eje de abscisas.',
937:'Considera el sistema system{x−y+mz=−3;−mx+3y−z=1;x−4y+mz=−6}.\na) Discute el sistema según los valores de m.\nb) Para m=2 resuelve el sistema, si es posible.',
939:'Considera los planos π₁ y π₂ dados respectivamente por las ecuaciones (x,y,z)=(−2,0,7)+λ(1,−2,0)+μ(0,1,−1) y 2x+y−z+5=0. Determina los puntos de la recta r definida por x=y+1=frac{z−1}{−3} que equidistan de π₁ y π₂.',
940:'Sean r y s las rectas dadas por r≡system{x+y−z=6;x+z=3} y s≡frac{x−1}{−1}=frac{y+1}{6}=frac{z}{2}.\na) Determina el punto de intersección de ambas rectas.\nb) Calcula la ecuación general del plano que las contiene.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_DETERMINANTS_INTERSECTIONS_LAYOUT']]:[];
export const cases=[{index:931,slot:4,literals:['x + nz = −2','m = 3 y n = 1']},{index:932,slot:1,literals:['es 4','−3d −3e −3f']},{index:936,slot:3,literals:['6x2 + 8x','suma de las áreas']},{index:937,slot:1,literals:['−mx + 3y − z = 1','m = 2']},{index:939,slot:4,literals:['(−2, 0, 7)','2x + y − z + 5 = 0']},{index:940,slot:4,literals:['x+y−z = 6','x+z  =3']}];
export const proof=c=>({931:{m:4,n:2.5,intersection:[-1/3,-11/3,-2/3],plane:[2,-3,5,-5]},932:{detA:4,scaled:-32,inverse:.25,first:-8,second:-12},936:{roots:[0,2,4],area:8,signedParts:[4,-4],critical:[2-2/Math.sqrt(3),2+2/Math.sqrt(3)]},937:{singular:[-1,1],infinite:-1,incompatible:1,solution:[2,1,-2]},939:{n1:[2,1,1],n2:[2,1,-1],parameters:[0,-1],points:[[0,-1,1],[-1,-2,4]]},940:{t:2,intersection:[-1,11,4],plane:[2,-1,4,-3]}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s,visual=false)=>{const p=part(ps[i],a,d,e,s,'INDEPENDENT_DETERMINANT_ELIMINATION_INCIDENCE_AND_QUADRATURE_CHECKS',proof(c));if(visual)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 931:return[mk(0,'m=4 y n=frac{5}{2}.',['m=3 y n=1.','m=4 y n=−frac{5}{2}.','m=−4 y n=frac{5}{2}.'],['Imponer solo intersección usando los parámetros del siguiente apartado.','Cambiar el signo al despejar n.','Cambiar el signo al obtener m de la perpendicularidad.'],[
['Parametrizamos ambas rectas con parámetros independientes y leemos sus vectores directores.','r:(1+2t,−1+mt,t), u=(2,m,1); s:(−2−nv,−3+v,v), w=(−n,1,1)'],
['Para que sean perpendiculares, su producto escalar debe ser cero. Esto por sí solo no asegura que se corten.','u·w=−2n+m+1=0 ⇒ m=2n−1'],
['En el punto de corte las terceras coordenadas obligan a t=v; las otras dos dan ecuaciones adicionales.','(2+n)t=−3; (m−1)t=−2'],
['El valor n=−2 es imposible por la primera igualdad. Eliminamos t sin perder esa condición.','frac{m−1}{n+2}=frac{2}{3} ⇒ 3(m−1)=2(n+2)'],
['Sustituimos la condición de perpendicularidad y resolvemos los dos parámetros.','3(2n−2)=2n+4 ⇒ 4n=10 ⇒ n=frac{5}{2}, m=4'],
['Verificamos ambas propiedades en los parámetros encontrados.','t=v=−frac{2}{3}; P=(−frac{1}{3},−frac{11}{3},−frac{2}{3}); (2,4,1)·(−frac{5}{2},1,1)=0'],
]),mk(1,'π:2x−3y+5z−5=0.', ['π:2x−3y+5z+5=0.','π:2x+3y+5z+1=0.','π:2x−3y−5z−5=0.'],['Cambiar el signo de la constante al imponer el punto.','Cambiar un signo del normal aunque el plano siga pasando por un punto.','Cambiar el signo de la tercera componente del normal.'],[
['Usamos ahora los parámetros de este apartado, que son diferentes a los anteriores.','m=3,n=1; u=(2,3,1); w=(−1,1,1)'],
['Hallamos un punto común para confirmar que existe plano que contenga ambas rectas.','t=v=−1 ⇒ P=(−1,−4,−1)'],
['El producto vectorial da un normal perpendicular a las dos direcciones.','u×w=(2,−3,5)'],
['El plano puede escribirse con el punto común y el normal.','2(x+1)−3(y+4)+5(z+1)=0'],
['Simplificamos la ecuación y comprobamos las direcciones.','π:2x−3y+5z−5=0; (2,−3,5)·u=0; (2,−3,5)·w=0'],
['Sustituimos las dos parametrizaciones completas; las igualdades son identidades.','2(1+2t)−3(−1+3t)+5t−5=0; 2(−2−v)−3(−3+v)+5v−5=0'],
])];
case 932:return[mk(0,'det(−2A)=−32; det(A⁻¹)=frac{1}{4}.',['det(−2A)=−8; det(A⁻¹)=frac{1}{4}.','det(−2A)=32; det(A⁻¹)=frac{1}{4}.','det(−2A)=−32; det(A⁻¹)=4.'],['Multiplicar el determinante solo una vez por el escalar.','Perder el signo de la potencia impar del escalar.','Conservar el determinante al invertir la matriz.'],[
['El documento muestra una matriz cuadrada de orden tres cuyo determinante es no nulo.','A=matrix{a,b,c;d,e,f;p,q,r}; det A=4≠0'],
['Multiplicar toda una matriz por un escalar multiplica cada una de sus tres filas.','det(kA)=k³ det A'],
['Aplicamos la propiedad manteniendo el signo de la potencia impar.','det(−2A)=(−2)³·4=−8·4=−32'],
['La inversa existe porque det A no es cero. Usamos la identidad de producto.','AA⁻¹=I ⇒ det A·det(A⁻¹)=det I=1'],
['Despejamos el determinante de la inversa.','det(A⁻¹)=frac{1}{det A}=frac{1}{4}'],
['Comprobamos el producto y distinguimos entre multiplicar una fila y toda la matriz.','4·frac{1}{4}=1; (−2)(−2)(−2)·4=−32'],
]),mk(1,'Primer determinante: −8; segundo determinante: −12.',['Primer determinante: 8; segundo determinante: −12.','Primer determinante: −8; segundo determinante: 12.','Primer determinante: −4; segundo determinante: −12.'],['Ignorar el cambio de signo de la segunda columna.','Olvidar el signo de la permutación de dos filas.','Omitir el factor dos de la segunda fila.'],[
['En el primer determinante la segunda columna cambia de signo y la segunda fila se multiplica por dos.','D₁=det matrix{a,−b,c;2d,−2e,2f;p,−q,r}'],
['Aplicamos las dos propiedades de multiplicación sin contar dos veces la entrada común.','D₁=(−1)·2·det A=−8'],
['En el segundo determinante identificamos las filas originales y sus factores.','D₂=det matrix{−3d,−3e,−3f;a,b,c;−p,−q,−r}=det(−3F₂,F₁,−F₃)'],
['Extraemos los factores de las filas primera y tercera.','D₂=(−3)(−1)det(F₂,F₁,F₃)=3det(F₂,F₁,F₃)'],
['Intercambiar las dos primeras filas cambia el signo del determinante.','det(F₂,F₁,F₃)=−det A=−4 ⇒ D₂=−12'],
['Reunimos los factores para verificar el signo final de cada caso.','D₁=−2·4=−8; D₂=(−3)(−1)(−1)·4=−12'],
])];
case 936:return[mk(0,'Cortes: (0,0), (2,0), (4,0); gráfica cúbica positiva en (0,2) y negativa en (2,4).',['Cortes: (0,0), (−2,0), (−4,0); gráfica cúbica positiva en (−4,−2) y negativa en (−2,0).','Cortes: (0,0), (2,0), (4,0); gráfica cúbica negativa en (0,2) y positiva en (2,4).','Cortes: (0,0), (2,0), (8,0); gráfica cúbica positiva en (0,2) y negativa en (2,8).'],['Cambiar el signo de las raíces al factorizar.','Invertir el signo de la función entre las raíces.','Confundir el coeficiente ocho con una raíz.'],[
['Factorizamos el polinomio para obtener todos los cortes con el eje horizontal.','f(x)=x(x²−6x+8)=x(x−2)(x−4)'],
['Cada factor lineal puede anularse. El corte con el eje vertical es el origen.','x=0,2,4 ⇒ (0,0),(2,0),(4,0); f(0)=0'],
['Estudiamos el signo entre raíces para orientar correctamente los dos recintos.','f<0 en (−∞,0); f>0 en (0,2); f<0 en (2,4); f>0 en (4,+∞)'],
['La derivada localiza los dos extremos del esbozo.','f′(x)=3x²−12x+8=0 ⇒ x=2±frac{2}{√3}'],
['La segunda derivada distingue máximo y mínimo, y fija la inflexión central.','f″(x)=6x−12; máximo en 2−frac{2}{√3}; mínimo en 2+frac{2}{√3}; inflexión (2,0)'],
['La gráfica adjunta respeta raíces, extremos, signos y comportamiento de la cúbica.','f(2+u)=u³−4u; f(2−frac{2}{√3})=frac{16}{3√3}; f(2+frac{2}{√3})=−frac{16}{3√3}'],
],true),mk(1,'Suma de áreas=8 u².', ['Suma de áreas=0 u².','Suma de áreas=4 u².','Suma de áreas=−8 u².'],['Sumar integrales firmadas y cancelar recintos de signos opuestos.','Calcular únicamente uno de los dos recintos.','No tomar el valor positivo de las áreas.'],[
['Las raíces dividen los recintos acotados en dos intervalos, con signos opuestos.','S=∫₀²f(x)dx−∫₂⁴f(x)dx'],
['Calculamos una primitiva integrando término a término.','F(x)=frac{x⁴}{4}−2x³+4x²; F′(x)=x³−6x²+8x'],
['Evaluamos los tres extremos antes de restar.','F(0)=0; F(2)=4−16+16=4; F(4)=64−128+64=0'],
['Obtenemos las integrales firmadas y convertimos cada una en área.','∫₀²f=4; ∫₂⁴f=−4; S₁=4, S₂=4'],
['Sumamos áreas positivas, no integrales que se cancelarían.','S=4+|−4|=8'],
['Comprobamos por la simetría de la cúbica alrededor de (2,0).','f(2+u)=−f(2−u); los dos recintos tienen igual área; 2·4=8'],
],true)];
case 937:return[mk(0,'m≠−1,1: SCD; m=−1: SCI; m=1: SI.',['m≠−1,1: SCD; m=−1: SI; m=1: SCI.','m≠−1,1: SCD; m=−1,1: SCI.','m≠1: SCD; m=1: SI.'],['Intercambiar el valor compatible y el incompatible al estudiar los rangos.','Suponer que todo determinante nulo da infinitas soluciones.','Omitir una de las raíces del determinante.'],[
['Restar la primera ecuación de la tercera elimina x y z sin dividir entre el parámetro.','−3y=−3 ⇒ y=1'],
['Sustituimos y=1 y conservamos un sistema equivalente de dos ecuaciones.','x+mz=−2; −mx−z=−2'],
['El determinante de la matriz original se obtiene con la misma eliminación.','det M=3 det matrix{1,m;−m,−1}=3(m²−1)'],
['Fuera de los dos valores singulares los rangos son tres y la solución es única.','m≠±1 ⇒ rg M=rg(M|b)=3; z=−frac{2}{m−1}, x=frac{2}{m−1}, y=1'],
['En m=1 las dos ecuaciones reducidas exigen valores contradictorios. Un menor constante garantiza rango dos de M.','m=1:x+z=−2, −x−z=−2 ⇒ 0=−4; det matrix{1,−1;1,−4}=−3≠0; rg M=2<rg(M|b)=3 ⇒ SI'],
['En m=−1 las dos ecuaciones reducidas coinciden. Aplicamos Rouché–Frobenius y exhibimos la familia.','m=−1:x−z=−2; rg M=rg(M|b)=2<3 ⇒ SCI; (x,y,z)=(t−2,1,t), t∈ℝ'],
]),mk(1,'(x,y,z)=(2,1,−2).',['(x,y,z)=(−2,1,2).','(x,y,z)=(2,−1,−2).','(x,y,z)=(−2,1,−2).'],['Invertir el signo al resolver el sistema reducido.','Cambiar el signo obtenido al restar las ecuaciones primera y tercera.','Perder el término 2z al despejar x.'],[
['El determinante para el valor solicitado es distinto de cero.','m=2 ⇒ det M=3(4−1)=9≠0'],
['Restamos ecuaciones primera y tercera igual que en la discusión.','−3y=−3 ⇒ y=1'],
['Sustituimos en las dos primeras ecuaciones.','x+2z=−2; −2x−z=−2'],
['Eliminamos x sumando el doble de la primera a la segunda.','3z=−6 ⇒ z=−2'],
['Recuperamos x en una de las ecuaciones.','x+2(−2)=−2 ⇒ x=2'],
['Verificamos las tres ecuaciones originales, no solo las reducidas.','2−1+2(−2)=−3; −2·2+3·1−(−2)=1; 2−4·1+2(−2)=−6'],
])];
case 939:return[mk(0,'P=(0,−1,1) y Q=(−1,−2,4).',['P=(0,−1,1) y Q=(1,0,−2).','Únicamente P=(−frac{1}{2},−frac{3}{2},frac{5}{2}).','Únicamente P=(0,−1,1).'],['Cambiar el signo de una solución de la igualdad de valores absolutos.','Imponer pertenencia al segundo plano en lugar de igual distancia.','Olvidar una de las dos posibilidades del valor absoluto.'],[
['Calculamos el normal del plano paramétrico mediante el producto vectorial de sus direcciones.','(1,−2,0)×(0,1,−1)=(2,1,1)'],
['Usamos el punto (−2,0,7) para obtener la ecuación implícita. Los dos normales tienen el mismo módulo.','π₁:2x+y+z−3=0; π₂:2x+y−z+5=0; |n₁|=|n₂|=√6'],
['Parametrizamos la recta manteniendo el denominador negativo de z.','(x,y,z)=(t,t−1,1−3t)'],
['Sustituimos en las fórmulas de distancia. La distancia al primer plano es constante en toda la recta.','d₁=frac{|−3|}{√6}; d₂=frac{|6t+3|}{√6}'],
['Igualamos distancias y resolvemos las dos posibilidades del valor absoluto.','|6t+3|=3 ⇒ 6t+3=3 o 6t+3=−3 ⇒ t=0 o t=−1'],
['Recuperamos ambos puntos y comprobamos las distancias.','P=(0,−1,1); Q=(−1,−2,4); d(P,π₁)=d(P,π₂)=d(Q,π₁)=d(Q,π₂)=frac{3}{√6}'],
])];
case 940:return[mk(0,'P=(−1,11,4).',['P=(3,−13,−4).','P=(0,5,2).','P=(−1,11,2).'],['Cambiar el signo del parámetro común en s.','Tomar t=1 en vez de resolver las ecuaciones de r.','Olvidar el factor dos de la coordenada z.'],[
['La recta s proporciona una parametrización directa al igualar sus tres cocientes a t.','s:(x,y,z)=(1−t,−1+6t,2t)'],
['Para pertenecer también a r debe verificarse la segunda ecuación de esta recta.','x+z=3 ⇒ 1−t+2t=3 ⇒ t=2'],
['Comprobamos que la primera ecuación de r da el mismo parámetro.','x+y−z=6 ⇒ 1−t−1+6t−2t=6 ⇒ 3t=6'],
['Sustituimos el valor en las tres coordenadas.','P=(1−2,−1+12,4)=(−1,11,4)'],
['Verificamos la pertenencia a r.','−1+11−4=6; −1+4=3'],
['Comprobamos también los tres cocientes de s.','frac{−1−1}{−1}=frac{11+1}{6}=frac{4}{2}=2'],
]),mk(1,'π:2x−y+4z−3=0.',['π:2x−y+4z+3=0.','π:2x+y+4z−25=0.','π:2x−y−4z+29=0.'],['Cambiar el signo del término independiente.','Elegir un normal incorrecto aunque pase por el punto de corte.','Cambiar el signo de la coordenada z del normal.'],[
['Parametrizamos r tomando z=q y despejando las otras coordenadas.','r:(x,y,z)=(3−q,3+2q,q); u=(−1,2,1)'],
['Leemos la dirección de s y calculamos un normal común.','w=(−1,6,2); u×w=(−2,1,−4)'],
['Podemos cambiar el signo del normal completo sin cambiar el plano.','n=(2,−1,4)'],
['Usamos el punto de intersección del apartado anterior.','2(x+1)−(y−11)+4(z−4)=0 ⇒ 2x−y+4z−3=0'],
['Verificamos que el normal es perpendicular a ambas direcciones.','n·u=−2−2+4=0; n·w=−2−6+8=0'],
['Las parametrizaciones completas satisfacen la ecuación del plano.','2(3−q)−(3+2q)+4q−3=0; 2(1−t)−(−1+6t)+8t−3=0'],
])];default:throw Error('Unknown determinants-intersections case');}}
export function buildDeterminantsIntersectionsBatch(id='batch-0451',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Determinantes y sistemas',3:'Primitivas y áreas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=c.index===936?['Representación gráfica']:[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_DETERMINANTS_INTERSECTIONS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDeterminantsIntersectionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0451-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0451.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[852,'6310687a476bbab9ad2de1ded1dc24f8cf176cd6faea573873b4c4abefddf6f4',1,'A.1','398492ffdac4f4a9b667b941c6cc8e400761ef404b7139b76da9d69025bef6da',0],
[857,'a098cf97f26b5a80c2114b078958a9549efd8f87843d30465bf6b65e0deb3e8c',2,'B.7','2f02d9e1a6e48c0493430eb14e738a73e5a4759167c7abcbbac486e841ce1c01',0],
[863,'3e3680996f6975a212fbb2b33f5105e444c7be584e0bcaee89f5405cd6fff1ac',1,'A.3','16f720e395e0215c0f7f428287b70a6433bb8eed5557b6d8253f1b0e708b1883',0],
[866,'638c1decf68db7761653ce6239400acc00ca5aff6d558ac22705b9864b909625',2,'B.3','ddb6ea48261c46c35e4fad16df40424046d337ff37d682209ecbdc0988edc6a2',0],
[867,'b47a8d292833a7006d37cfe870ba36821b3bcd14b4d9c4214c46cd89145eaa56',1,'A.3','58af78b11a2546ff738856daba0839cb8923e8e1b028ebf490dba977882c4eaa',0],
[869,'faa99db49ea6996077e64bcc83a8f7c0a39af31d3043cb323b178e5d73a511b7',1,'A.2','abb17cb23bb00cb826a426730cc34d5439be0d55e064b72ecf34856028b7e1d4',0]];
export const statements={
852:'Halla los valores a, b y c sabiendo que la gráfica de la función f(x)=frac{ax²+b}{x+c} tiene una asíntota vertical en x=1, una asíntota oblicua de pendiente 2, y un extremo local en el punto de abscisa x=3.',
857:'Considera el plano π, determinado por los puntos A(−1,0,0), B(0,1,1) y C(2,1,0), y la recta r: system{x−2z−3=0;y−z−2=0}. Halla los puntos de r cuya distancia a π es √14 unidades.',
863:'Considera el siguiente sistema de ecuaciones lineales: system{x+y+2z=0;(m+2)x+y−z=m;3x+(m+2)y+z=m}.\na) Discute el sistema según los valores de m.\nb) Resuelve el sistema, si es posible, para m=0.',
866:'Considera A=matrix{1;−1;0}, B=matrix{1;1;1} y C=matrix{1,1,1;−1,−1,−1;0,0,0}.\na) Calcula el rango de ABᵀ+λI según los valores de λ (Bᵀ es la matriz traspuesta de B, I es la matriz identidad de orden 3).\nb) Calcula la matriz X que verifica CX−X=2I.',
867:'Un estudiante ha gastado 57 euros en una papelería por la compra de un libro, una calculadora y un estuche. Sabemos que el libro cuesta el doble que el total de la calculadora y el estuche juntos.\na) ¿Es posible determinar de forma única el precio del libro? ¿Y el de la calculadora? Razona las respuestas.\nb) Si el precio del libro, la calculadora y el estuche hubieran sufrido un 50 %, un 20 % y un 25 % de descuento respectivamente, el estudiante habría pagado un total de 34 euros. Calcula el precio de cada artículo.',
869:'Sea f:(−2,+∞)→ℝ la función definida por f(x)=ln(x+2). Halla una primitiva F de f que verifique F(0)=0. (ln denota el logaritmo neperiano).'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_RATIONAL_DISTANCE_NILPOTENT_LAYOUT']]:[];
export const cases=[{index:852,slot:2,literals:['x+c','abscisa x = 3']},{index:857,slot:4,literals:['A(−1, 0, 0)','14 unidades']},{index:863,slot:1,literals:['(m + 2)x','m = 0']},{index:866,slot:1,literals:['CX − X = 2I','ABT']},{index:867,slot:1,literals:['57 euros','34 euros']},{index:869,slot:3,literals:['ln(x + 2)','F (0) = 0']}];
export const proof=c=>({852:{a:2,b:6,c:-1,asymptote:[2,2],localMinimum:[3,12]},857:{plane:[-1,3,-2,-1],parameters:[-12,16],points:[[-21,-10,-12],[35,18,16]],distance:Math.sqrt(14)},863:{determinant:[0,8,2],singular:[0,-4],incompatible:-4,zeroDirection:[3,-5,1]},866:{C:[[1,1,1],[-1,-1,-1],[0,0,0]],rankZero:1,rankOther:3,X:[[-4,-2,-2],[2,0,2],[0,0,-2]]},867:{total:57,book:38,calculator:15,case:4,discountedTotal:34},869:{F0:0,domainLowerBound:-2,constant:2-2*Math.log(2)}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_DERIVATION_SUBSTITUTION_MATRIX_AND_METRIC_CHECKS',proof(c));switch(c.index){
case 852:return[mk(0,'a=2, b=6, c=−1.',['a=2, b=−6, c=−1.','a=2, b=30, c=1.','a=1, b=3, c=−1.'],['Cambiar el signo al despejar b en la ecuación de la derivada.','Confundir x+c=0 con x=c al situar la asíntota.','Confundir el coeficiente de la asíntota oblicua.'],[
['Una asíntota vertical solo puede aparecer donde se anula el denominador; después comprobaremos que no se cancela.','1+c=0 ⇒ c=−1'],
['Dividimos los polinomios para leer la pendiente de la asíntota oblicua.','f(x)=ax−ac+frac{b+ac²}{x+c}; pendiente=a=2'],
['Derivamos mediante la regla del cociente para imponer el extremo en x=3.','f′(x)=frac{2ax(x+c)−(ax²+b)}{(x+c)²}=frac{ax²+2acx−b}{(x+c)²}'],
['El punto x=3 pertenece al dominio. Igualamos el numerador de la derivada a cero.','18−12−b=0 ⇒ b=6'],
['Comprobamos la asíntota vertical y la oblicua con los parámetros obtenidos.','f(x)=2x+2+frac{8}{x−1}; numerador en x=1: 8≠0; asíntota oblicua y=2x+2'],
['La derivada cambia de negativa a positiva al atravesar tres, por lo que sí hay un extremo local, no solo un punto estacionario.','f′(x)=frac{2(x−3)(x+1)}{(x−1)²}; mínimo local en (3,12)'],
])];
case 857:return[mk(0,'P₁=(−21,−10,−12), P₂=(35,18,16).',[
'P₁=(−21,−10,−12), P₂=(31,16,14).',
'P₁=(−25,−12,−14), P₂=(31,16,14).',
'P₁=(−7,−3,−5), P₂=(21,11,9).'],['Olvidar el término independiente en una de las dos ramas del valor absoluto.','Olvidar el término independiente en ambas ramas.','Introducir un factor dos incorrecto en la fórmula de distancia.'],[
['Construimos dos vectores del plano y calculamos su producto vectorial.','AB=(1,1,1); AC=(3,1,0); n=AB×AC=(−1,3,−2)'],
['Usamos el punto A para obtener la ecuación del plano.','−(x+1)+3y−2z=0 ⇒ π: −x+3y−2z−1=0'],
['Parametrizamos la recta tomando z=t. Así todos los puntos candidatos pertenecen a ella.','r: P(t)=(2t+3,t+2,t)'],
['Sustituimos en la fórmula de distancia de punto a plano, conservando el valor absoluto y la norma de la normal.','d(P(t),π)=frac{|−(2t+3)+3(t+2)−2t−1|}{√14}=frac{|2−t|}{√14}'],
['Igualamos a la distancia pedida y resolvemos las dos posibilidades.','|2−t|=14 ⇒ t=−12 o t=16'],
['Obtenemos las coordenadas y comprobamos la distancia en ambos casos.','P₁=(−21,−10,−12), P₂=(35,18,16); d(P₁,π)=d(P₂,π)=frac{14}{√14}=√14'],
])];
case 863:return[mk(0,'m∉{0,−4}: compatible determinado; m=0: compatible indeterminado; m=−4: incompatible.',[
'm∉{0,−4}: compatible determinado; m=0: incompatible; m=−4: compatible indeterminado.',
'm∉{0,−4}: compatible determinado; m=0: compatible indeterminado; m=−4: compatible indeterminado.',
'm≠0: compatible determinado; m=0: compatible indeterminado.'],['Intercambiar la clasificación de los dos valores singulares.','Suponer que todo determinante nulo implica infinitas soluciones.','Perder el factor m+4 del determinante.'],[
['Escribimos la matriz ampliada y aplicamos eliminación sin dividir por expresiones que puedan anularse.','R₂←R₂−(m+2)R₁; R₃←R₃−3R₁'],
['Las dos últimas ecuaciones permiten calcular el determinante.','−(m+1)y−(2m+5)z=m; (m−1)y−5z=m; det A=2m(m+4)'],
['Para los valores no singulares ambos rangos son tres y la solución es única.','m≠0,−4 ⇒ rango A=rango(A|b)=3 ⇒ compatible determinado'],
['En m=0 las dos últimas filas coinciden y el sistema es homogéneo. Un menor de orden dos vale −1.','−y−5z=0; rango A=rango(A|b)=2<3 ⇒ compatible indeterminado'],
['En m=−4 las filas de coeficientes reducidas son proporcionales, pero los términos independientes no.','3y+3z=−4; −5y−5z=−4; 5R₂+3R₃ ⇒ 0=−32'],
['La contradicción aumenta el rango ampliado y termina la discusión sin perder ningún valor del parámetro.','m=−4 ⇒ rango A=2<rango(A|b)=3 ⇒ incompatible'],
]),mk(1,'(x,y,z)=(3t,−5t,t), t∈ℝ.',[
'(x,y,z)=(−3t,−5t,t), t∈ℝ.',
'(x,y,z)=(3t,5t,t), t∈ℝ.',
'(x,y,z)=(5t,−3t,t), t∈ℝ.'],['Cambiar el signo de x al despejar en la primera ecuación.','Cambiar el signo de y en la ecuación reducida.','Intercambiar los coeficientes de la dirección de soluciones.'],[
['Sustituimos m=0 antes de resolver para conservar correctamente los segundos miembros.','x+y+2z=0; 2x+y−z=0; 3x+2y+z=0'],
['La tercera ecuación es la suma de las dos primeras; solo hay dos condiciones independientes.','R₃=R₁+R₂'],
['Restamos dos veces la primera ecuación de la segunda.','−y−5z=0 ⇒ y=−5z'],
['Sustituimos en la primera y dejamos z como parámetro libre.','x−5z+2z=0 ⇒ x=3z; z=t'],
['Escribimos la familia completa; el parámetro recorre todos los números reales.','(x,y,z)=(3t,−5t,t), t∈ℝ'],
['Verificamos todas las ecuaciones originales para cualquier valor de t.','3t−5t+2t=0; 6t−5t−t=0; 9t−10t+t=0'],
])];
case 866:return[mk(0,'λ=0: rango 1; λ≠0: rango 3.',[
'λ=0: rango 2; λ≠0: rango 3.',
'λ=0: rango 0; λ≠0: rango 3.',
'λ∈{0,1}: rango 1; λ∉{0,1}: rango 3.'],['Concluir rango dos únicamente porque el determinante es cero.','Confundir una matriz no nula con una matriz de cuadrado nulo.','Introducir un valor propio uno que no tiene la matriz.'],[
['La traspuesta de B es una fila; el producto de la columna A por esa fila es una matriz de orden tres.','ABᵀ=matrix{1,1,1;−1,−1,−1;0,0,0}=C'],
['Sumamos λ en la diagonal sin cambiar las demás entradas.','C+λI=matrix{1+λ,1,1;−1,−1+λ,−1;0,0,λ}'],
['Desarrollamos por la última fila y calculamos el menor restante.','det(C+λI)=λ((1+λ)(λ−1)+1)=λ³'],
['Cuando λ no es cero, el determinante no se anula.','λ≠0 ⇒ rango(C+λI)=3'],
['Cuando λ=0, la segunda fila es la opuesta de la primera y la tercera es nula. La primera fila sí es no nula.','λ=0 ⇒ rango C=1'],
['Como comprobación, el producto BᵀA vale cero y explica que C sea nilpotente, pero no nula.','BᵀA=1−1+0=0 ⇒ C²=A(BᵀA)Bᵀ=0; C≠0'],
]),mk(1,'X=matrix{−4,−2,−2;2,0,2;0,0,−2}.',[
'X=matrix{4,2,2;−2,0,−2;0,0,2}.',
'X=matrix{0,2,2;−2,−4,−2;0,0,−2}.',
'X=matrix{−2,−1,−1;1,0,1;0,0,−1}.'],['Perder el signo negativo de C−I.','Usar I−C donde la inversa exige I+C.','Olvidar el factor dos del segundo miembro.'],[
['Factorizamos por la derecha el factor común X; la identidad tiene el mismo orden que C.','CX−X=(C−I)X=2I'],
['El producto directo o la factorización C=ABᵀ demuestra que C² es la matriz nula.','C²=0'],
['Construimos la inversa a partir de esa identidad, conservando el signo.','(C−I)(−I−C)=I−C²=I ⇒ (C−I)⁻¹=−I−C'],
['Multiplicamos por la izquierda y obtenemos la única solución.','X=2(C−I)⁻¹=−2(I+C)'],
['Sumamos la identidad a C y multiplicamos todas las entradas por menos dos.','X=matrix{−4,−2,−2;2,0,2;0,0,−2}'],
['La sustitución verifica la ecuación completa, no solo una entrada de la matriz.','CX−X=−2C−2C²+2I+2C=2I'],
])];
case 867:return[mk(0,'El libro cuesta 38 € de forma única; el precio de la calculadora no es único (calculadora+estuche=19 €).',[
'El libro cuesta 19 € de forma única; el precio de la calculadora no es único (calculadora+estuche=38 €).',
'El libro cuesta 38 € y la calculadora 9,50 € de forma única (estuche=9,50 €).',
'El libro cuesta 28,50 € de forma única; el precio de la calculadora no es único (calculadora+estuche=28,50 €).'],['Invertir la relación doble entre libro y suma de los otros dos.','Suponer sin dato que calculadora y estuche cuestan lo mismo.','Confundir el doble con la igualdad entre libro y suma restante.'],[
['Definimos L, C y E como los precios originales del libro, calculadora y estuche. Traducimos las dos condiciones.','L+C+E=57; L=2(C+E)'],
['Sustituimos la segunda ecuación en la primera para hallar la suma de los otros dos precios.','3(C+E)=57 ⇒ C+E=19'],
['La relación doble fija de manera única el precio del libro.','L=2·19=38 €'],
['No hay otra ecuación que distinga calculadora y estuche. Podemos parametrizar sus precios positivos.','C=t, E=19−t, con 0<t<19'],
['Exhibimos dos compras distintas que satisfacen todos los datos iniciales, por lo que la calculadora no queda determinada.','(L,C,E)=(38,10,9) y (38,15,4)'],
['En ambas compras el total vale 57 y el libro cuesta el doble de la suma restante. Eso demuestra unicidad parcial, no de todos los precios.','38+19=57; 38=2·19; L único, C no único'],
]),mk(1,'Libro: 38 €; calculadora: 15 €; estuche: 4 €.',[
'Libro: 38 €; calculadora: 4 €; estuche: 15 €.',
'Libro: 38 €; calculadora: 10 €; estuche: 9 €.',
'Libro: 38 €; calculadora: 9,50 €; estuche: 9,50 €.'],['Intercambiar los descuentos de calculadora y estuche.','Utilizar una solución del sistema inicial sin imponer el pago rebajado.','Repartir por igual los 19 euros sin comprobar los descuentos diferentes.'],[
['Conservamos las condiciones iniciales y añadimos el importe realmente pagado tras las rebajas.','L=38; C+E=19; 0,50L+0,80C+0,75E=34'],
['Los porcentajes que multiplican cada precio son los restantes tras el descuento, no los porcentajes descontados.','19+0,80C+0,75E=34 ⇒ 0,80C+0,75E=15'],
['Sustituimos el estuche en función de la calculadora.','E=19−C ⇒ 0,80C+0,75(19−C)=15'],
['Resolvemos la ecuación lineal y recuperamos el tercer precio.','0,05C=0,75 ⇒ C=15 €; E=19−15=4 €'],
['Comprobamos los datos originales con los tres precios positivos.','38+15+4=57; 38=2(15+4)'],
['Comprobamos de forma independiente el pago después de aplicar los descuentos.','0,50·38+0,80·15+0,75·4=19+12+3=34 €'],
])];
case 869:return[mk(0,'F(x)=(x+2)ln(x+2)−x−2ln(2), x>−2.',[
'F(x)=(x+2)ln(x+2)−x−2, x>−2.',
'F(x)=(x+2)ln(x+2)−2ln(2), x>−2.',
'F(x)=frac{(ln(x+2))²−(ln 2)²}{2}, x>−2.'],['Fijar la constante como si ln(2) valiera uno.','Omitir el término lineal procedente de la integración por partes.','Integrar como si existiera el factor 1/(x+2) en el integrando.'],[
['En el dominio x>−2 el argumento del logaritmo es positivo. Integramos por partes con una elección que simplifica el factor restante.','u=ln(x+2), dv=dx; du=frac{dx}{x+2}, v=x+2'],
['Aplicamos la identidad de integración por partes.','∫ln(x+2)dx=(x+2)ln(x+2)−∫1dx'],
['Obtenemos la familia de primitivas con una constante libre.','F(x)=(x+2)ln(x+2)−x+K'],
['Imponemos el valor dado en el origen para determinar la constante.','F(0)=2ln(2)+K=0 ⇒ K=−2ln(2)'],
['Verificamos la derivada por la regla del producto.','F′(x)=ln(x+2)+1−1=ln(x+2)=f(x)'],
['Verificamos también la condición inicial; en el intervalo conexo del dominio fija una sola primitiva.','F(0)=2ln(2)−2ln(2)=0; F(x)=(x+2)ln(x+2)−x−2ln(2)'],
])];default:throw Error('Unknown rational-distance-nilpotent case');}}
export function buildRationalDistanceNilpotentBatch(id='batch-0446',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Matrices y sistemas',2:'Asíntotas y extremos',3:'Primitivas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_RATIONAL_DISTANCE_NILPOTENT'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRationalDistanceNilpotentBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0446-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0446.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

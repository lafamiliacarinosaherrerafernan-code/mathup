import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[961,'0538bf48150a21cab4ec323355fa0eb68c26f4397e554f2d14328f1609399b2f',2,'NONE.5','5d489d2971b00c4904e08696620a7e4cc20a46b628aa931fab1d8b42f50d8c24',0],
[965,'c5a19b8d41952be5e070bc6d9a83948f6dc8e1eb323dd5b6a57f0e88559b9db3',2,'A.5','e819fd645b8d06ddd9832345fa52bc2cb1817bc8f73e1e3b6586c66673cd8f9b',0],
[966,'62a1d9074de55299d71cdeb9a0ce1c0bd8d749e8b1baa30fb379ef400b4e7387',2,'B.2','be9006d94f1e72d993bb2c379ea1dfb08ecc89ffc651ec8d398eff5317e6e167',0],
[968,'8948619c3f97deb0787e449297cc3904949ef86c8469df859e9d23c5636a08fb',2,'NONE.4','89802b1b23944044f42be3477af9723f9bd4d837e83afc0ab4749a55da43ea6d',0],
[969,'bcc0f5d10e7ba4afb5526c30934e6d5202e410eb02006f53611566d004cd16dc',2,'B.3','9962e965dc2a999ccb82620978600309acfd94fe4628b9ef5c8d6f98b3c92259',0]];
export const statements={
961:'Considera la matriz A=matrix{1,2,1;1,1,1;1,−1,−1}.\na) Calcula A⁻¹.\nb) Calcula la matriz X de orden tres que verifica AX+(A−X)²=X²+I, siendo I la matriz identidad de orden tres.',
965:'Considera la matriz A=matrix{1,frac{1}{8},frac{1}{8};0,1,0;0,0,1}.\na) Calcula A²⁰²⁴.\nb) Halla la matriz X, si es posible, que verifica A²XA+I=O, donde I y O son la matriz identidad y la matriz nula de orden 3, respectivamente.',
966:'Sea f:ℝ→ℝ la función definida por f(x)=x arctan(x). Determina la primitiva de f cuya gráfica pasa por el punto (0,π).',
968:'Considera los puntos A(1,0,2), B(−1,3,1), C(2,1,2) y D(1,0,4).\na) Halla la ecuación del plano que contiene a A, B y C.\nb) Halla el punto simétrico de D respecto del plano x−y−5z+9=0.',
969:'a) Justifica que es posible hacer un pago de 34,50 euros cumpliendo las siguientes restricciones:\n• utilizando únicamente monedas de 50 céntimos de euro, de 1 euro y de 2 euros;\n• se tienen que utilizar exactamente un total de 30 monedas;\n• tiene que haber igual número de monedas de 1 euro como de 50 céntimos y 2 euros juntas.\n¿De cuántas maneras y con cuántas monedas de cada tipo se puede hacer el pago?\nb) Si se redondea la cantidad a pagar a 35 euros, justifica si es posible o no seguir haciendo el pago bajo las mismas condiciones que en el apartado anterior.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_MATRIX_PRIMITIVES_COINS_LAYOUT']]:[];
export const cases=[{index:961,slot:1,literals:['Considera la matriz','orden tres']},{index:965,slot:1,literals:['1/8','2024','identidad']},{index:966,slot:3,literals:['x arctan(x)','(0, π)']},{index:968,slot:4,literals:['A(1, 0, 2)','D(1, 0, 4)','5z + 9']},{index:969,slot:1,literals:['34, 50','30 monedas','35 euros']}];
export const proof=c=>({961:{A:[[1,2,1],[1,1,1],[1,-1,-1]],inverse:[[0,.5,.5],[1,-1,0],[-1,1.5,-.5]],X:[[1,1.5,.5],[0,2,1],[2,-2.5,-.5]],determinant:2},965:{A:[[1,.125,.125],[0,1,0],[0,0,1]],exponent:2024,power:[[1,253,253],[0,1,0],[0,0,1]],X:[[-1,.375,.375],[0,-1,0],[0,0,-1]],nilpotence:2},966:{primitive:'(x*x+1)/2*atan(x)-x/2+pi',atZero:Math.PI},968:{normal:[1,-1,-5],constant:9,D:[1,0,4],projection:[37/27,-10/27,58/27],reflection:[47/27,-20/27,8/27]},969:{coins:[7,15,8],totalCents:3450,roundedRealSolution:[20/3,15,25/3],roundedIntegerSolutions:0}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/(?:^|\n)a\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_MATRIX_PRODUCT_DERIVATIVE_GEOMETRY_INTEGER_CHECKS',proof(c));switch(c.index){
case 961:return[mk(0,'A⁻¹=frac{1}{2}matrix{0,1,1;2,−2,0;−2,3,−1}.',['A⁻¹=frac{1}{2}matrix{0,2,−2;1,−2,3;1,0,−1}.','A⁻¹=matrix{0,1,1;2,−2,0;−2,3,−1}.','A⁻¹=frac{1}{2}matrix{0,−1,−1;−2,2,0;2,−3,1}.'],['No trasponer la matriz de cofactores.','Olvidar dividir entre el determinante.','Cambiar el signo del determinante.'],[
['Calculamos el determinante por la primera fila para comprobar la existencia de inversa.','det A=1(−1+1)−2(−1−1)+1(−1−1)=2≠0'],
['Calculamos los cofactores de la primera fila, incluidos sus signos alternos.','C₁₁=0; C₁₂=−(−1−1)=2; C₁₃=−1−1=−2'],
['Completamos la matriz de cofactores con los menores de las otras dos filas.','C=matrix{0,2,−2;1,−2,3;1,0,−1}'],
['Trasponemos los cofactores y dividimos entre el determinante.','A⁻¹=frac{Cᵗ}{det A}=frac{1}{2}matrix{0,1,1;2,−2,0;−2,3,−1}'],
['Verificamos por producto, evitando confundir una inversa con la traspuesta.','A·matrix{0,1,1;2,−2,0;−2,3,−1}=matrix{2,0,0;0,2,0;0,0,2}'],
['El producto en ambos órdenes confirma la identidad.','AA⁻¹=A⁻¹A=I'],
]),mk(1,'X=frac{1}{2}matrix{2,3,1;0,4,2;4,−5,−1}.',['X=frac{1}{2}matrix{2,5,3;4,0,2;0,1,−3}.','X=frac{1}{2}matrix{−2,−3,−1;0,−4,−2;−4,5,1}.','X=matrix{0,2,1;1,0,1;1,−1,−2}.'],['Sumar A⁻¹ en lugar de restarla.','Invertir el orden de la resta A−A⁻¹.','Sustituir indebidamente A⁻¹ por I.'],[
['Desarrollamos el cuadrado respetando el orden de multiplicación: las matrices no conmutan en general.','(A−X)²=A²−AX−XA+X²'],
['Sustituimos en la ecuación y cancelamos únicamente términos idénticos.','AX+A²−AX−XA+X²=X²+I ⇒ A²−XA=I'],
['Aislamos XA y multiplicamos por la inversa a la derecha.','XA=A²−I ⇒ X=(A²−I)A⁻¹=A−A⁻¹'],
['Restamos entrada a entrada usando la inversa del primer apartado.','X=frac{1}{2}matrix{2,4,2;2,2,2;2,−2,−2}−frac{1}{2}matrix{0,1,1;2,−2,0;−2,3,−1}'],
['Obtenemos la matriz y comprobamos la ecuación reducida.','X=frac{1}{2}matrix{2,3,1;0,4,2;4,−5,−1}; XA=A²−I'],
['La expansión anterior es una equivalencia; sustituir verifica también la ecuación inicial.','AX+(A−X)²−X²=A²−XA=I'],
])];
case 965:return[mk(0,'A²⁰²⁴=matrix{1,253,253;0,1,0;0,0,1}.',['A²⁰²⁴=matrix{1,frac{2023}{8},frac{2023}{8};0,1,0;0,0,1}.','A²⁰²⁴=matrix{2024,253,253;0,2024,0;0,0,2024}.','A²⁰²⁴=matrix{1,2024,2024;0,1,0;0,0,1}.'],['Usar n−1 en vez de n en las entradas no diagonales.','Multiplicar toda la matriz por el exponente.','Omitir el factor un octavo en las entradas no diagonales.'],[
['Separamos la identidad de la parte no diagonal.','A=I+N; N=matrix{0,frac{1}{8},frac{1}{8};0,0,0;0,0,0}'],
['Multiplicamos N por sí misma: sus únicas entradas no nulas están en la primera fila y las filas segunda y tercera son nulas.','N²=O'],
['Comprobamos las primeras potencias para establecer la fórmula.','A²=(I+N)²=I+2N; A³=(I+2N)(I+N)=I+3N'],
['Justificamos por inducción que no hay términos de orden superior, porque N²=O.','Aⁿ=I+nN ⇒ Aⁿ⁺¹=(I+nN)(I+N)=I+(n+1)N'],
['Sustituimos el exponente solicitado y calculamos las dos entradas.','A²⁰²⁴=I+2024N; frac{2024}{8}=253'],
['La diagonal sigue siendo uno; únicamente crecen las entradas de la primera fila.','A²⁰²⁴=matrix{1,253,253;0,1,0;0,0,1}'],
]),mk(1,'X=matrix{−1,frac{3}{8},frac{3}{8};0,−1,0;0,0,−1}.',['X=matrix{1,−frac{3}{8},−frac{3}{8};0,1,0;0,0,1}.','X=matrix{−1,frac{1}{8},frac{1}{8};0,−1,0;0,0,−1}.','X=matrix{−1,frac{1}{4},frac{1}{4};0,−1,0;0,0,−1}.'],['Olvidar el signo menos al pasar I al otro miembro.','Cancelar solo uno de los tres factores de A.','Cancelar A² pero olvidar el factor A de la derecha.'],[
['El determinante triangular es uno, por lo que A y A² son invertibles.','det A=1·1·1=1; A²XA=−I'],
['Multiplicamos por las inversas en los lados correspondientes.','X=−A⁻²IA⁻¹=−A⁻³'],
['Calculamos la inversa aprovechando N²=O, sin dividir matrices.','(I+N)(I−N)=I−N²=I ⇒ A⁻¹=I−N'],
['Elevamos la inversa al cubo; los productos con N² desaparecen.','A⁻³=(I−N)³=I−3N ⇒ X=−I+3N'],
['Escribimos todas las entradas, incluidas las diagonales negativas.','X=matrix{−1,frac{3}{8},frac{3}{8};0,−1,0;0,0,−1}'],
['Verificamos la ecuación original multiplicando en el orden indicado.','(I+2N)(−I+3N)(I+N)=−I ⇒ A²XA+I=O'],
])];
case 966:return[mk(0,'F(x)=frac{x²+1}{2}arctan(x)−frac{x}{2}+π.',['F(x)=frac{x²}{2}arctan(x)−frac{x}{2}+π.','F(x)=frac{x²+1}{2}arctan(x)+frac{x}{2}+π.','F(x)=frac{x²+1}{2}arctan(x)−frac{x}{2}.'],['Perder la primitiva de 1/(1+x²) tras dividir el integrando.','Cambiar el signo de la integral que se resta en integración por partes.','Olvidar imponer el paso por el punto dado.'],[
['Para integrar el producto elegimos u=arctan(x) y dv=x dx.','du=frac{1}{1+x²}dx; v=frac{x²}{2}; ∫u dv=uv−∫v du'],
['Aplicamos integración por partes manteniendo el factor un medio.','∫x arctan(x)dx=frac{x²}{2}arctan(x)−frac{1}{2}∫frac{x²}{1+x²}dx'],
['Dividimos el cociente para obtener dos primitivas inmediatas.','frac{x²}{1+x²}=1−frac{1}{1+x²}; ∫frac{x²}{1+x²}dx=x−arctan(x)'],
['Reagrupamos los términos de arctangente y conservamos la constante.','F(x)=frac{x²+1}{2}arctan(x)−frac{x}{2}+C'],
['La gráfica pasa por (0,π); esta condición determina la constante de la primitiva.','F(0)=C=π'],
['Derivamos la expresión completa como comprobación independiente.','F′(x)=x arctan(x)+frac{x²+1}{2(1+x²)}−frac{1}{2}=x arctan(x)=f(x)'],
])];
case 968:return[mk(0,'π: x−y−5z+9=0.',['π: x−y−5z−9=0.','π: x+y−5z+9=0.','π: x−y+5z−11=0.'],['Cambiar el signo del término independiente.','Perder el signo de la componente y del producto vectorial.','Cambiar solo el signo de la componente z y ajustar únicamente el paso por A.'],[
['Construimos dos vectores del plano usando los puntos oficiales.','AB=(−2,3,−1); AC=(1,1,0)'],
['El producto vectorial proporciona un vector perpendicular a ambos.','AB×AC=(3·0−(−1)·1,(−1)·1−(−2)·0,(−2)·1−3·1)=(1,−1,−5)'],
['Este vector no es nulo, por lo que A, B y C no están alineados y determinan un único plano.','n=(1,−1,−5)≠0'],
['Usamos la ecuación punto-normal por A.','(x−1)−(y−0)−5(z−2)=0'],
['Desarrollamos la ecuación cartesiana.','x−y−5z+9=0'],
['Verificamos por sustitución los tres puntos, no solo el punto usado para construirla.','A:1−0−10+9=0; B:−1−3−5+9=0; C:2−1−10+9=0'],
]),mk(1,'D′=(frac{47}{27},−frac{20}{27},frac{8}{27}).',['D′=(frac{37}{27},−frac{10}{27},frac{58}{27}).','D′=(frac{7}{27},frac{20}{27},frac{208}{27}).','D′=(frac{83}{27},−frac{56}{27},−frac{172}{27}).'],['Dar la proyección ortogonal en lugar del punto simétrico.','Cambiar el signo de la corrección normal.','Usar −9 en lugar del término independiente +9.'],[
['El simétrico se obtiene a través del pie H de la perpendicular al plano.','n=(1,−1,−5); H=D+tn=(1+t,−t,4−5t)'],
['Imponemos que H pertenezca al plano y despejamos el parámetro.','(1+t)−(−t)−5(4−5t)+9=0 ⇒ −10+27t=0 ⇒ t=frac{10}{27}'],
['Sustituimos para obtener el punto medio entre D y su simétrico.','H=(frac{37}{27},−frac{10}{27},frac{58}{27})'],
['Aplicamos D′=2H−D y calculamos cada coordenada.','D′=(frac{74}{27}−1,−frac{20}{27},frac{116}{27}−4)=(frac{47}{27},−frac{20}{27},frac{8}{27})'],
['Comprobamos que el segmento DD′ es perpendicular al plano.','D′−D=frac{20}{27}(1,−1,−5)'],
['El punto medio pertenece al plano; además los valores con signo de su ecuación son opuestos.','frac{D+D′}{2}=H∈π; π(D)=−10; π(D′)=10'],
])];
case 969:return[mk(0,'Una única manera: 7 monedas de 50 céntimos, 15 de 1 euro y 8 de 2 euros.',['Una única manera: 8 monedas de 50 céntimos, 15 de 1 euro y 7 de 2 euros.','Una única manera: 15 monedas de 50 céntimos, 7 de 1 euro y 8 de 2 euros.','Una única manera: 7 monedas de 50 céntimos, 8 de 1 euro y 15 de 2 euros.'],['Intercambiar las monedas de 50 céntimos y de 2 euros.','Intercambiar las cantidades de monedas de 50 céntimos y de 1 euro.','Intercambiar las cantidades de monedas de 1 y 2 euros.'],[
['Llamamos x, y y z al número de monedas de 50 céntimos, 1 euro y 2 euros. Deben ser enteros no negativos.','x+y+z=30; y=x+z; frac{x}{2}+y+2z=frac{69}{2}'],
['Eliminamos denominadores y expresamos el sistema para resolverlo por Gauss.','system{x+y+z=30;−x+y−z=0;x+2y+4z=69}'],
['Eliminamos x de las filas segunda y tercera con la primera.','F₂←F₂+F₁; F₃←F₃−F₁ ⇒ system{x+y+z=30;2y=30;y+3z=39}'],
['De la segunda fila sale y; al eliminarla en la tercera queda z.','y=15; 15+3z=39 ⇒ z=8'],
['Sustituimos hacia atrás y comprobamos el pago y las restricciones.','x=30−15−8=7; 7·0,50+15+8·2=34,50; 15=7+8'],
['Los tres pivotes son no nulos y las cantidades son enteras no negativas; no hay otra solución.','(x,y,z)=(7,15,8); una única manera'],
]),mk(1,'No es posible: la única solución real exige frac{20}{3} monedas de 50 céntimos y frac{25}{3} de 2 euros.',['Sí es posible con frac{20}{3} monedas de 50 céntimos, 15 de 1 euro y frac{25}{3} de 2 euros.','Sí es posible con 6 monedas de 50 céntimos, 15 de 1 euro y 9 de 2 euros.','No es posible porque el sistema de ecuaciones no tiene ninguna solución real.'],['Aceptar fracciones de monedas aunque el número de monedas deba ser entero.','Redondear los resultados sin comprobar el importe del pago.','Confundir la falta de solución entera con incompatibilidad sobre los reales.'],[
['Se conservan el total de monedas y la condición de igualdad; solo cambia el importe.','x+y+z=30; y=x+z; x+2y+4z=70'],
['Las dos primeras ecuaciones siguen obligando a usar quince monedas de un euro.','2y=30 ⇒ y=15; x+z=15'],
['Sustituimos y en la ecuación monetaria.','x+4z=40'],
['Restamos x+z=15 para obtener las cantidades determinadas por el sistema.','3z=25 ⇒ z=frac{25}{3}; x=15−frac{25}{3}=frac{20}{3}'],
['Una solución real no es suficiente: las monedas son objetos indivisibles.','frac{25}{3}∉ℤ y frac{20}{3}∉ℤ ⇒ no hay pago admisible'],
['Comprobamos también que redondear incumple el importe, aunque conserve las otras condiciones.','(6,15,9):6·0,50+15+9·2=36≠35'],
])];default:throw Error('Unknown matrix-primitives-coins case');}}
export function buildMatrixPrimitivesCoinsBatch(id='batch-0455',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===969?'Sistemas de ecuaciones':({1:'Ecuaciones matriciales',3:'Primitivas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_MATRIX_PRIMITIVES_COINS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatrixPrimitivesCoinsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0455-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0455.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

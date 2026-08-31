import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[771,'1e4f531b5628e8a28245106f3c6fabe999a180d01408f83dbb02d7a79a9c179e',2,'A.5','eb011903d29bddbdfd5f4ae07d3aa1c183e6619e4a5fa86d08ea96035813ed44',0],
[783,'484da7ba05f38869d6934dae372158991418ca8556e3a834a80895bfca1b117e',1,'NONE.2','063b7e1d1509447966497fa8bbf83a6380534f2290e0f232e7e8eff78cd38511',0],
[784,'c96a2e679160a7ce024d7347fc9b1c30d9b5a05add9ea3d9b70d831556b54737',1,'A.3','d0d87f018961f34279c5e137336418ed4093e60243d42f27116653eb10151da8',0],
[786,'3c73d7569c1433d92a94cc59d448ac36b1ef461888db782ababda36489d9f359',2,'B.5','b719c51aadb997b270d189c8519c0638586dbbd5577bbece9e339014d4f9c9d9',0],
[790,'fda0d38e4ae5dc84aca1154cbe3fb0c5c7c74cb9d32b6ded6aaf94c6ee056755',2,'A.5','07beed4dc9fff014da103054120724eafb7d323530504a2c4bce120cbb6512b3',0],
[794,'e57bc2d094c8120f546b4dd3c69e3372e9fcc93f38875e052f536867901cc5be',2,'B.3','125df25af957752ee5ec84b1733d9893a90c9cb7082837e03d95f6a51ae099ee',0]];
export const statements={
771:'Sean las matrices A=matrix{m+1,1,m−1;1,1,1;m−1,1,m+1}, B=matrix{0,4,2;0,0,4;2,2,1} y C=matrix{0,0,1;0,1,0;1,0,0}.\na) Calcula m para que la matriz A tenga inversa.\nb) Para m=0, resuelve, si es posible, la ecuación matricial frac{1}{2}AX+C⁴=B.',
783:'De la función f:ℝ→ℝ definida por f(x)=ae^x−bx, donde a,b∈ℝ, se sabe que su gráfica tiene tangente horizontal en x=0 y que ∫₀¹ f(x) dx=e−frac{3}{2}. Halla los valores de a y b.',
784:'Considera las matrices A=matrix{1,1,1;0,1,0;0,0,1}, B=matrix{0;1;−1} y C=matrix{1,1,2}.\na) Calcula A²⁰¹⁸.\nb) Determina, si existe, la matriz X que verifica A(X+2I)=BC, donde I es la matriz identidad.',
786:'Sea la matriz A=matrix{1,1,1;1,1,1;1,1,1} e I la matriz identidad de orden 3.\na) Halla los valores de m para que la matriz A−mI no tenga inversa.\nb) Halla x, distinto de cero, para que A−xI sea la inversa de la matriz frac{1}{x}(A−I).',
790:'Sabiendo que det(matrix{a,b,c;x,y,z;u,v,w})=1, calcula razonadamente:\na) det(matrix{a+x,b+y,c+z;a,b,c;2a+u,2b+v,2c+w}).\nb) det(matrix{z,c,w;x,a,u;y,b,v}).',
794:'Considera las matrices A=matrix{1,0,m−1;0,m−1,2−m;0,−1,2−m} y B=matrix{−1,0,1;1,−1,0;0,1,−1}.\na) Determina los valores de m para los que la matriz A no tiene inversa.\nb) Para m=1, calcula, si existe, la matriz X que verifica la igualdad A⁻¹XA+I=B, siendo I la matriz identidad.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_MATRIX_OPERATOR_IDENTITIES_LAYOUT']]:[];
export const cases=[{index:771,slot:1,literals:['m+1','m−1','C4 = B']},{index:783,slot:3,literals:['tangente horizontal en x = 0','aex − bx']},{index:784,slot:1,literals:['Calcula A2018','A(X + 2I) = BC']},{index:786,slot:1,literals:['matriz A − mI no tenga inversa','Halla x, distinto de cero']},{index:790,slot:1,literals:['a+x','2a + u','z cw']},{index:794,slot:1,literals:['A−1XA + I = B','Para m = 1']}];
export const proof=c=>({771:{mExcluded:[1],inverseAt0:[[0,.5,-.5],[.5,0,.5],[-.5,.5,0]],X:[[-2,-3,4],[1,6,2],[1,-5,2]]},783:{a:1,b:1,integral:Math.E-1.5},784:{historicalPage:7,verifiedPdfPage:1,verifiedOfficialKey:'A.3',power:2018,X:[[-2,0,0],[1,-1,2],[-1,-1,-4]]},786:{singular:[0,3],x:2},790:{a:-1,b:-1},794:{singular:[0,2],inverseAt1:[[1,0,0],[0,1,-1],[0,1,0]],X:[[-2,1,0],[0,-1,-1],[-1,1,-3]]}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'INDEPENDENT_MATRIX_PRODUCTS_DETERMINANTS_AND_CALCULUS_CHECK',proof(c));switch(c.index){
case 771:return[mk(0,'A tiene inversa si y solo si m≠1.',['A tiene inversa si y solo si m≠−1.','A tiene inversa si y solo si m≠0.','A tiene inversa para todo m∈ℝ.'],['Cambiar el signo de la raíz del determinante.','Confundir el valor particular del apartado siguiente con una singularidad.','No comprobar cuándo se anula el determinante.'],[
['Una matriz cuadrada es invertible exactamente cuando su determinante no se anula.','A invertible ⇔ det A≠0'],
['Restamos la tercera fila a la primera; esta operación no cambia el determinante.','F₁←F₁−F₃ ⇒ matrix{2,0,−2;1,1,1;m−1,1,m+1}'],
['Desarrollamos por la primera fila y calculamos los menores de orden dos.','det A=2[(m+1)−1]−2[1−(m−1)]'],
['Simplificamos antes de resolver la condición.','det A=2m−2(2−m)=4(m−1)'],
['El único valor singular es uno.','det A≠0 ⇔ m≠1'],
['Comprobamos la excepción y un valor regular: para uno las columnas primera y tercera coinciden.','m=1 ⇒ C₁=C₃; m=0 ⇒ det A=−4≠0'],
]),mk(1,'X=matrix{−2,−3,4;1,6,2;1,−5,2}.',['X=matrix{−1,−3/2,2;1/2,3,1;1/2,−5/2,1}.','X=matrix{−2,−2,3;2,6,3;0,−4,2}.','X=matrix{2,1,5;−5,4,−1;2,2,0}.'],['Omitir el factor dos al despejar AX.','Olvidar restar C⁴=I.','Multiplicar la inversa de A por el lado derecho en lugar del izquierdo.'],[
['C intercambia la primera y tercera coordenadas; dos aplicaciones restituyen el vector original.','C²=I ⇒ C⁴=I'],
['Para m=0 la matriz A es invertible; aislamos AX respetando el orden de los factores.','frac{1}{2}AX+I=B ⇒ AX=2(B−I) ⇒ X=2A⁻¹(B−I)'],
['Calculamos la inversa mediante operaciones elementales, o la comprobamos multiplicándola por A.','A⁻¹=frac{1}{2}matrix{0,1,−1;1,0,1;−1,1,0}'],
['Restamos la identidad a B antes de multiplicar.','B−I=matrix{−1,4,2;0,−1,4;2,2,0}'],
['El producto fila por columna da la única solución.','X=matrix{−2,−3,4;1,6,2;1,−5,2}'],
['Verificamos la ecuación original, no solo el despeje.','AX=matrix{−2,8,4;0,−2,8;4,4,0}=2(B−I) ⇒ frac{1}{2}AX+C⁴=B'],
])];
case 783:return[mk(0,'a=1, b=1.',['a=−1, b=−1.','a=1, b=−1.','a=frac{e−3}{2e−3}, b=frac{e−3}{2e−3}.'],['Cambiar el signo de la igualdad integral.','Cambiar el signo al imponer la pendiente horizontal.','Interpretar e−3/2 como (e−3)/2.'],[
['La pendiente horizontal en cero exige que la derivada sea nula allí.','f′(x)=ae^x−b; f′(0)=a−b=0 ⇒ a=b'],
['Integramos cada sumando y evaluamos entre los límites oficiales cero y uno.','∫₀¹(ae^x−bx)dx=[ae^x−frac{b}{2}x²]₀¹=a(e−1)−frac{b}{2}'],
['Sustituimos la relación a=b en la condición del área con signo.','a(e−frac{3}{2})=e−frac{3}{2}'],
['El factor no es cero, por lo que podemos dividir; e es mayor que dos.','e−frac{3}{2}>0 ⇒ a=1 ⇒ b=1'],
['La función obtenida cumple la condición de tangencia.','f(x)=e^x−x; f′(0)=1−1=0'],
['Recalculamos la integral para verificar también el segundo dato.','[e^x−frac{x²}{2}]₀¹=e−frac{1}{2}−1=e−frac{3}{2}'],
])];
case 784:return[mk(0,'A²⁰¹⁸=matrix{1,2018,2018;0,1,0;0,0,1}.',['A²⁰¹⁸=matrix{1,2017,2017;0,1,0;0,0,1}.','A²⁰¹⁸=matrix{1,2019,2019;0,1,0;0,0,1}.','A²⁰¹⁸=matrix{1,4036,4036;0,1,0;0,0,1}.'],['Usar n−1 en lugar de n en el término nilpotente.','Contar una multiplicación de más.','Duplicar el coeficiente del término nilpotente.'],[
['Separamos la identidad del resto de la matriz.','A=I+N; N=matrix{0,1,1;0,0,0;0,0,0}'],
['Al multiplicar N por sí misma todos los productos fila por columna son cero.','N²=0'],
['El binomio matricial es aplicable porque I y N conmutan; los términos de grado dos o mayor se anulan.','(I+N)^n=I+nN, n∈ℕ'],
['Sustituimos el exponente solicitado.','A²⁰¹⁸=I+2018N'],
['Escribimos todas las entradas, manteniendo unos en la diagonal.','A²⁰¹⁸=matrix{1,2018,2018;0,1,0;0,0,1}'],
['La identidad se verifica también por inducción al multiplicar una potencia por A.','(I+nN)(I+N)=I+(n+1)N+nN²=I+(n+1)N'],
]),mk(1,'X=matrix{−2,0,0;1,−1,2;−1,−1,−4}.',['X=matrix{−1,0,0;1,0,2;−1,−1,−3}.','X=matrix{2,0,0;1,3,2;−1,−1,0}.','X=matrix{−3,0,0;0,−3,0;0,0,−3}.'],['Restar I en lugar de 2I.','Sumar 2I en lugar de restarlo.','Confundir el producto exterior BC con el escalar CB.'],[
['El producto de una matriz 3×1 por otra 1×3 produce una matriz 3×3.','BC=matrix{0,0,0;1,1,2;−1,−1,−2}'],
['Como N²=0, la inversa de I+N es I−N.','A⁻¹=matrix{1,−1,−1;0,1,0;0,0,1}'],
['Multiplicamos por la izquierda para aislar la incógnita.','A(X+2I)=BC ⇒ X=A⁻¹BC−2I'],
['Las filas segunda y tercera de BC suman cero; por eso la primera fila no cambia al aplicar A⁻¹.','A⁻¹BC=BC'],
['Restamos dos a cada entrada diagonal.','X=matrix{−2,0,0;1,−1,2;−1,−1,−4}'],
['Verificamos la ecuación matricial y la unicidad por invertibilidad de A.','X+2I=BC; A(BC)=BC ⇒ A(X+2I)=BC; det A=1'],
])];
case 786:return[mk(0,'m∈{0,3}.',['m∈{0,1}.','m∈{0,−3}.','m∈{1,3}.'],['Usar uno en lugar de la suma de las tres entradas de cada fila.','Cambiar el signo del valor no nulo que anula el determinante.','Olvidar que A ya es singular para m=0.'],[
['Escribimos la matriz cuyo determinante debe anularse.','A−mI=matrix{1−m,1,1;1,1−m,1;1,1,1−m}'],
['Desarrollamos el determinante de orden tres.','det(A−mI)=(1−m)³+2−3(1−m)'],
['Simplificamos y factorizamos.','det(A−mI)=3m²−m³=m²(3−m)'],
['Aplicamos el criterio de invertibilidad.','m²(3−m)=0 ⇔ m=0 o m=3'],
['Para cero las filas son iguales, de modo que hay rango uno.','m=0 ⇒ rango A=1<3'],
['Para tres el vector no nulo (1,1,1) está en el núcleo, confirmando el segundo valor singular.','(A−3I)matrix{1;1;1}=matrix{0;0;0}'],
]),mk(1,'x=2.',['x=1.','x=3.','x=−2.'],['Olvidar la contribución A²=3A.','Confundir el valor singular del apartado a con el valor que da la inversa pedida.','Cambiar el signo al anular el coeficiente de A.'],[
['En el cuadrado de A, cada entrada es la suma de tres unos.','A²=3A'],
['Para que las matrices sean inversas, su producto debe ser la identidad; x no puede ser cero.','(A−xI)·frac{1}{x}(A−I)=I; x≠0'],
['Desarrollamos el producto sin alterar el orden. Aquí ambos factores son polinomios en A y conmutan.','frac{1}{x}[A²−(1+x)A+xI]=I'],
['Sustituimos A² y simplificamos.','I+frac{2−x}{x}A=I'],
['A no es la matriz nula; por tanto el coeficiente debe anularse.','2−x=0 ⇒ x=2'],
['Comprobamos por multiplicación en ambos órdenes y respetamos la restricción inicial.','(A−2I)·frac{1}{2}(A−I)=I=frac{1}{2}(A−I)·(A−2I); 2≠0'],
])];
case 790:return[mk(0,'El determinante vale −1.',['El determinante vale 1.','El determinante vale −2.','El determinante vale 2.'],['Olvidar que intercambiar dos filas cambia el signo.','Tratar la suma 2R₁+R₃ como multiplicar toda una fila por dos.','Multiplicar por dos e ignorar el intercambio de filas.'],[
['Denotamos por R₁,R₂,R₃ las filas del determinante conocido.','D=det(R₁,R₂,R₃)=1'],
['La matriz pedida tiene como filas combinaciones de las originales.','D₁=det(R₁+R₂,R₁,2R₁+R₃)'],
['Restar a una fila un múltiplo de otra no cambia el determinante.','F₁←F₁−F₂; F₃←F₃−2F₂'],
['Después de esas operaciones quedan las filas originales con las dos primeras intercambiadas.','D₁=det(R₂,R₁,R₃)'],
['Un único intercambio cambia el signo.','D₁=−D=−1'],
['La multilinealidad confirma que los demás términos contienen filas repetidas y se anulan.','det(R₁+R₂,R₁,2R₁+R₃)=det(R₂,R₁,R₃)=−1'],
]),mk(1,'El determinante vale −1.',['El determinante vale 1.','El determinante vale −3.','El determinante vale 3.'],['Ignorar el intercambio de las dos primeras columnas tras transponer.','Multiplicar por tres por haber tres filas, sin que exista un factor común.','Multiplicar por tres y perder el signo de la permutación.'],[
['La transpuesta de una matriz conserva su determinante.','Mᵗ=matrix{a,x,u;b,y,v;c,z,w}; det Mᵗ=1'],
['Intercambiamos las columnas primera y segunda de la transpuesta.','N=matrix{x,a,u;y,b,v;z,c,w}; det N=−1'],
['La matriz pedida se obtiene colocando las filas de N en el orden 3,1,2.','T=matrix{z,c,w;x,a,u;y,b,v}'],
['Esa permutación cíclica de tres filas equivale a dos intercambios y no cambia el signo.','signo(3,1,2)=(−1)²=1'],
['Combinamos las dos propiedades.','det T=det N=−det Mᵗ=−1'],
['El signo total procede de un intercambio de columnas y dos de filas: tres en total.','(−1)³·det M=−1'],
])];
case 794:return[mk(0,'m∈{0,2}.',['m∈{1,2}.','m∈{0,−2}.','m∈{0,1}.'],['Confundir m−1=0 con la anulación del determinante completo.','Cambiar el signo de la raíz que procede de 2−m.','Ignorar el término que aparece al desarrollar el menor.'],[
['Desarrollamos por la primera columna, que solo tiene un elemento no nulo.','det A=det(matrix{m−1,2−m;−1,2−m})'],
['Aplicamos la fórmula de orden dos con sus signos.','det A=(m−1)(2−m)−(−1)(2−m)'],
['Extraemos el factor común.','det A=(2−m)[(m−1)+1]=m(2−m)'],
['La matriz no tiene inversa exactamente en las raíces.','m(2−m)=0 ⇒ m=0 o m=2'],
['Comprobamos las dos singularidades directamente.','m=0 ⇒ F₂=F₃; m=2 ⇒ F₃=−F₂'],
['El valor del apartado siguiente no es singular.','m=1 ⇒ det A=1≠0'],
]),mk(1,'X=matrix{−2,1,0;0,−1,−1;−1,1,−3}.',['X=matrix{−2,−1,1;1,−2,−1;1,0,−2}.','X=matrix{−1,1,0;0,0,−1;−1,1,−2}.','X=matrix{−2,−1,1;0,2,−1;−1,2,1}.'],['Conjugar en el orden contrario: A⁻¹(B−I)A.','Olvidar restar la identidad antes de despejar.','Multiplicar por A en la derecha en vez de por A⁻¹.'],[
['Sustituimos m=1 y usamos que el determinante es uno.','A=matrix{1,0,0;0,0,1;0,−1,1}; A⁻¹=matrix{1,0,0;0,1,−1;0,1,0}'],
['Restamos la identidad; después multiplicamos por A a la izquierda y por A⁻¹ a la derecha.','A⁻¹XA=B−I ⇒ X=A(B−I)A⁻¹'],
['Calculamos el primer producto conservando el orden.','B−I=matrix{−2,0,1;1,−2,0;0,1,−2}; A(B−I)=matrix{−2,0,1;0,1,−2;−1,3,−2}'],
['Multiplicamos ese resultado por la inversa de A.','X=matrix{−2,1,0;0,−1,−1;−1,1,−3}'],
['La invertibilidad de A garantiza que el despeje da una única solución.','det A=1 ⇒ X única'],
['Sustituimos de nuevo en la ecuación original como verificación independiente.','A⁻¹XA=matrix{−2,0,1;1,−2,0;0,1,−2}=B−I ⇒ A⁻¹XA+I=B'],
])];
default:throw Error('Unknown matrix-operator case');}}
export function buildMatrixOperatorIdentitiesBatch(id='batch-0441',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Matrices y determinantes':'Primitivas e integrales';x.secondaryTopics=c.index===783?['Tangente horizontal']:[];x.block=c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_MATRIX_OPERATOR_IDENTITIES'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';if(c.index===784){x.matesEvidence.documentLocationCorrection={historicalRange:structuredClone(x.officialSource.range),verifiedPdfPage:1,officialOption:'A',officialExercise:'3',reason:'Historical page 7 is outside this two-page PDF; exercise read directly on PDF page 1. Original canonical evidence retained.'};}}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatrixOperatorIdentitiesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0441-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0441.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[530,'faa99db49ea6996077e64bcc83a8f7c0a39af31d3043cb323b178e5d73a511b7',2,'B.3','929d6fc9be6b43a51274779a86f16f3c5028991693a82baa5ff9f41eb8321ee7',0],
[532,'0538bf48150a21cab4ec323355fa0eb68c26f4397e554f2d14328f1609399b2f',1,'A.1','985b0a8fcdd91efb82883175158a8e0471dd9ceae21253abbd1a2d5de6971ab3',0],
[539,'484da7ba05f38869d6934dae372158991418ca8556e3a834a80895bfca1b117e',2,'B.3','c54f399478269a48b7bdd21a4849ab0279a0827a99f50d90fa9d21cdc7a49fad',0],
[541,'74ab2c123d3df105640328a5953d165030deecf0873f4dfd65271d375ae8be25',2,'B.5','2fb1bfca16b0c8c62dbf6940623752b6d960cfe19845cb230bc7324f5f40d3d1',0]];
export const statements={
530:'Sean las matrices A=[[1,2,3],[α,1,3],[0,2,α]] y B=[[-2],[3],[4]].\na) Determina los valores de α para los que A tiene inversa.\nb) Calcula la inversa de A para α=1.\nc) Resuelve, para α=1, el sistema de ecuaciones AX=B.',
532:'Sea f la función continua definida por\nf(x)=piecewise{frac{x²+1}{x−1} si x≤0;frac{a x+b}{(x+1)²} si x>0}.\na) Determina a y b sabiendo que f tiene un extremo relativo en el punto de abscisa x=2.\nb) Para a=2 y b=−1, estudia la derivabilidad de f.',
539:'Considera el siguiente sistema de ecuaciones lineales\nsystem{x+(λ+1)y+z=1;λy+z=0;λy+λz=λ}.\na) Discútelo según los valores de λ.\nb) Resuélvelo para λ=0.\nc) Determina, si existe, el valor de λ para el que hay una solución en la que z=2. Calcula esa solución.',
541:'Considera la matriz A=[[a,2,1],[b,-1,1],[c,1,1]], con determinante igual a 5.\na) Calcula razonadamente el determinante de 2A³.\nb) Calcula razonadamente los determinantes de las matrices [[2a,-1,3],[2b,1/2,3],[2c,-1/2,3]] y [[a,b,c],[a+4,b-2,c+2],[a+1,b+1,c+1]].'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_INVERSE_PARAMETRIC_SOURCE_LAYOUT']]:[];
export const cases=[{index:530,slot:1,literals:['Calcula la inversa','AX = B']},{index:532,slot:2,literals:['extremo relativo','a = 2 y b = −1']},{index:539,slot:1,literals:['λy + z = 0','z = 2']},{index:541,slot:1,literals:['determinante igual a 5','2A3']}];
export const proof=c=>({530:{detCoefficients:[-6,7,-2],roots:[1.5,2],inverse:[[5,-4,-3],[1,-1,0],[-2,2,1]],solution:[-34,-5,14]},532:{a:2,b:-1,leftSlope:-1,rightSlope:4,extremum:[2,1/3]},539:{singular:[0,1],lambdaZero:{point:[1,0,0],direction:[-1,1,0]},zTwo:{parameter:2,solution:[2,-1,2]}},541:{detA:5,scaledCube:1000,first:-15,second:10}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_PAGE_WITH_INDEPENDENT_MATRIX_OR_ONE_SIDED_DERIVATIVE_CHECK',proof(c));switch(c.index){
case 530:return[mk(0,'A es invertible si α∈ℝ excepto α=frac{3}{2} y α=2.',['A es invertible si α∈ℝ excepto α=−frac{3}{2} y α=−2.','A es invertible si α∈ℝ excepto α=frac{3}{2}.','A es invertible si α∈ℝ excepto α=2.'],['Cambiar signos al factorizar el determinante.','Omitir una de las raíces del determinante.','Omitir la raíz fraccionaria del determinante.'],[
['Una matriz cuadrada tiene inversa exactamente cuando su determinante es no nulo.','A⁻¹ existe ⇔ det(A)≠0'],
['Desarrollamos el determinante por la primera fila, con los signos alternados de los cofactores.','det(A)=1(α−6)−2(α²−0)+3(2α−0)'],
['Agrupamos las potencias del parámetro.','det(A)=−2α²+7α−6'],
['Factorizamos el polinomio para localizar todos sus ceros.','−2α²+7α−6=−(2α−3)(α−2)'],
['Excluimos ambos valores singulares; no imponemos ninguna otra restricción real.','α≠frac{3}{2}, α≠2'],
['Comprobamos los ceros y un caso regular directamente en el polinomio.','det(A(3/2))=0; det(A(2))=0; det(A(1))=−1≠0'],
]),mk(1,'A⁻¹=[[5,-4,-3],[1,-1,0],[-2,2,1]].',['A⁻¹=[[-5,4,3],[-1,1,0],[2,-2,-1]].','A⁻¹=[[5,1,-2],[-4,-1,2],[-3,0,1]].','A⁻¹=[[1,2,3],[1,1,3],[0,2,1]].'],['Olvidar dividir la adjunta por el determinante negativo.','No transponer la matriz de cofactores.','Usar la matriz original como su propia inversa.'],[
['Sustituimos el parámetro antes de calcular los menores.','A=[[1,2,3],[1,1,3],[0,2,1]]; det(A)=−1'],
['Calculamos la primera fila de cofactores incluyendo los signos.','C₁₁=−5; C₁₂=−1; C₁₃=2'],
['Completamos la matriz de cofactores con las dos filas restantes.','C=[[-5,-1,2],[4,1,-2],[3,0,-1]]'],
['Transponemos para obtener la adjunta y dividimos por el determinante.','A⁻¹=frac{1}{−1}Cᵀ'],
['La división cambia el signo de todos los elementos.','A⁻¹=[[5,-4,-3],[1,-1,0],[-2,2,1]]'],
['Verificamos multiplicando en ambos órdenes; se obtiene la identidad completa.','AA⁻¹=A⁻¹A=[[1,0,0],[0,1,0],[0,0,1]]'],
]),mk(2,'(x,y,z)=(−34,−5,14).',['(x,y,z)=(34,5,−14).','(x,y,z)=(−15,13,10).','(x,y,z)=(16,13,10).'],['Usar la adjunta sin dividir por el determinante.','Multiplicar la inversa transpuesta por B.','Usar AB en lugar de A⁻¹B.'],[
['El sistema tiene solución única porque para α=1 el determinante vale −1.','AX=B ⇒ X=A⁻¹B'],
['Escribimos el producto con el vector columna oficial.','X=[[5,-4,-3],[1,-1,0],[-2,2,1]]·[[-2],[3],[4]]'],
['La primera fila da la primera incógnita.','x=5(−2)−4·3−3·4=−34'],
['Calculamos las dos componentes restantes.','y=−2−3=−5; z=(−2)(−2)+2·3+4=14'],
['Expresamos el resultado respetando el orden de las incógnitas.','(x,y,z)=(−34,−5,14)'],
['Sustituimos en las tres ecuaciones originales, una comprobación independiente del despeje matricial.','−34−10+42=−2; −34−5+42=3; −10+14=4'],
])];
case 532:return[mk(0,'a=2 y b=−1; el extremo en x=2 es un máximo relativo.',['a=−2 y b=1; el extremo en x=2 es un máximo relativo.','a=−2 y b=−1; el extremo en x=2 es un máximo relativo.','a=2 y b=1; el extremo en x=2 es un máximo relativo.'],['Cambiar el signo del valor de la rama izquierda en cero.','Cambiar el signo en la condición de derivada nula.','Imponer solo el valor de a sin respetar la continuidad.'],[
['La continuidad en cero iguala el valor de la rama izquierda con el límite de la derecha.','f(0)=frac{1}{−1}=−1; lim_{x→0⁺}frac{a x+b}{(x+1)²}=b ⇒ b=−1'],
['En x=2 se usa la rama derecha, que es derivable alrededor de ese punto. Un extremo interior exige derivada nula.','f′(x)=frac{a(x+1)−2(ax+b)}{(x+1)³}=frac{a−ax−2b}{(x+1)³}'],
['Sustituimos x=2 y el valor de b.','f′(2)=frac{−a+2}{27}=0 ⇒ a=2'],
['La derivada resultante permite comprobar que el punto crítico sí es un extremo.','f′(x)=frac{4−2x}{(x+1)³}, x>0'],
['El denominador es positivo: la derivada cambia de positiva a negativa al atravesar dos.','0<x<2: f′>0; x>2: f′<0 ⇒ máximo relativo en x=2'],
['Verificamos valor y continuidad con los parámetros calculados.','f(2)=frac{3}{9}=frac{1}{3}; f(0)=−1=lim_{x→0⁺}f(x)'],
]),mk(1,'Derivable en ℝ excepto en 0; f′₋(0)=−1 y f′₊(0)=4.',['Derivable en todo ℝ; f′(0)=−1.','Derivable en ℝ excepto en 0; f′₋(0)=−1 y f′₊(0)=−4.','Derivable en ℝ excepto en −1 y 1; derivable en 0.'],['Confundir continuidad con derivabilidad.','Cambiar el signo de la derivada de la rama derecha.','Excluir ceros de denominadores que quedan fuera de la rama donde se usan.'],[
['Cada rama es racional con denominador no nulo en su intervalo de uso; solo debemos comprobar el empalme.','x<0: x−1≠0; x>0: x+1≠0'],
['Derivamos la rama izquierda con la regla del cociente.','f′(x)=frac{2x(x−1)−(x²+1)}{(x−1)²}=frac{x²−2x−1}{(x−1)²}, x<0'],
['Derivamos la rama derecha con los parámetros del apartado.','f′(x)=frac{4−2x}{(x+1)³}, x>0'],
['La función es continua en cero, pero las pendientes laterales no coinciden.','f′₋(0)=−1; f′₊(0)=4'],
['Concluimos el dominio de derivabilidad sin excluir puntos por expresiones de ramas que no les corresponden.','f es derivable en (−∞,0)∪(0,+∞), no en 0'],
['Comprobamos las pendientes con los cocientes incrementales desde f(0)=−1.','h<0: frac{f(h)+1}{h}=frac{h+1}{h−1}→−1; h>0: frac{f(h)+1}{h}=frac{h+4}{(h+1)²}→4'],
])];
case 539:return[mk(0,'λ≠0,1: compatible determinado; λ=0: compatible indeterminado; λ=1: incompatible.',['λ≠0,1: compatible determinado; λ=0: incompatible; λ=1: compatible indeterminado.','λ≠0,1: compatible determinado; λ=0 y λ=1: compatibles indeterminados.','Para todo λ: compatible determinado.'],['Intercambiar los dos casos singulares sin reducir sus ecuaciones.','Suponer que determinante nulo implica infinitas soluciones.','Omitir los valores singulares del determinante.'],[
['Escribimos la matriz de coeficientes en el orden x, y, z.','A=[[1,λ+1,1],[0,λ,1],[0,λ,λ]]'],
['Desarrollamos por la primera columna para hallar cuándo hay solución única.','det(A)=λ²−λ=λ(λ−1)'],
['Para λ distinto de cero y uno el determinante es no nulo.','λ≠0,1 ⇒ rg(A)=rg(A|B)=3 ⇒ compatible determinado'],
['Para λ=0 las ecuaciones se reducen a dos restricciones independientes.','system{x+y+z=1;z=0;0=0} ⇒ rg(A)=rg(A|B)=2 ⇒ compatible indeterminado'],
['Para λ=1 las dos últimas ecuaciones tienen el mismo lado izquierdo y términos independientes distintos.','system{x+2y+z=1;y+z=0;y+z=1} ⇒ incompatible'],
['La resta de las dos últimas ecuaciones confirma la clasificación sin depender solo del determinante.','(λ−1)z=λ; para λ=1 resulta 0=1'],
]),mk(1,'(x,y,z)=(1−t,t,0), t∈ℝ.',['(x,y,z)=(1+t,t,0), t∈ℝ.','(x,y,z)=(1−t,0,t), t∈ℝ.','(x,y,z)=(0,t,0), t∈ℝ.'],['Cambiar el signo al despejar x.','Elegir z libre pese a que debe ser cero.','Omitir el término independiente de la primera ecuación.'],[
['Sustituimos λ=0 en las tres ecuaciones, antes de dividir por expresiones que podrían anularse.','system{x+y+z=1;z=0;0=0}'],
['La segunda ecuación fija z; la tercera no aporta una condición nueva.','z=0'],
['La primera ecuación relaciona las dos incógnitas restantes.','x+y=1'],
['Elegimos y=t como parámetro libre real y despejamos x.','y=t; x=1−t'],
['La solución general es una recta afín en el espacio de las incógnitas.','(x,y,z)=(1,0,0)+t(−1,1,0)'],
['Comprobamos las tres ecuaciones para cualquier valor del parámetro.','(1−t)+t+0=1; 0=0; 0=0'],
]),mk(2,'λ=2 y (x,y,z)=(2,−1,2).',['λ=2 y (x,y,z)=(2,1,2).','λ=−2 y (x,y,z)=(2,1,2).','λ=0 y (x,y,z)=(−1,0,2).'],['Perder el signo negativo al despejar y.','Cambiar el signo en la ecuación que fija λ.','Usar el caso singular sin comprobar que obliga a z=0.'],[
['Imponemos z=2 en las dos últimas ecuaciones originales.','λy+2=0; λy+2λ=λ'],
['La primera de ellas da λy=−2; la segunda da λy=−λ.','−2=−λ ⇒ λ=2'],
['El valor obtenido no es singular. Despejamos y sin dividir por cero.','2y=−2 ⇒ y=−1'],
['Sustituimos en la primera ecuación con λ=2.','x+3(−1)+2=1 ⇒ x=2'],
['Presentamos parámetro y solución, ya que el enunciado pide ambos.','λ=2; (x,y,z)=(2,−1,2)'],
['Verificamos las tres igualdades por sustitución independiente.','2−3+2=1; 2(−1)+2=0; 2(−1)+2·2=2'],
])];
case 541:return[mk(0,'det(2A³)=1000.',['det(2A³)=250.','det(2A³)=40.','det(2A³)=125.'],['Multiplicar el determinante por dos en lugar de por dos al cubo.','No elevar det(A) al cubo.','Omitir el factor escalar dos.'],[
['La matriz es de orden tres; un escalar multiplica cada una de sus tres filas.','det(kM)=k³det(M)'],
['Usamos la propiedad multiplicativa en la potencia de A.','det(A³)=det(A)³'],
['Sustituimos el dato documental det(A)=5.','det(A³)=5³=125'],
['Aplicamos el factor escalar a la matriz completa A³.','det(2A³)=2³det(A³)'],
['Realizamos el producto numérico.','det(2A³)=8·125=1000'],
['La cuenta también puede verse como tres factores de determinantes y tres factores escalares, uno por fila.','2·2·2·5·5·5=1000'],
]),mk(1,'Primer determinante = −15; segundo determinante = 10.',['Primer determinante = 15; segundo determinante = 10.','Primer determinante = −15; segundo determinante = 5.','Primer determinante = −30; segundo determinante = 10.'],['Omitir el signo negativo del factor de la segunda columna.','No conservar el factor dos de la segunda fila transformada.','Ignorar el factor un medio de la segunda columna.'],[
['Denotamos C₁, C₂, C₃ las columnas de A. La primera matriz modifica cada columna por un factor explícito.','M₁=(2C₁,−frac{1}{2}C₂,3C₃)'],
['Extraemos los tres factores del determinante y usamos el dato de A.','det(M₁)=2·(−frac{1}{2})·3·5=−15'],
['Para la segunda matriz trabajamos con las filas de Aᵀ: U=(a,b,c), V=(2,−1,1), W=(1,1,1).','det(Aᵀ)=det(A)=5'],
['Las filas de la segunda matriz se escriben exactamente en términos de esas tres filas.','M₂ tiene filas U, U+2V, U+W'],
['Restamos la primera fila a las otras dos, operaciones que no cambian el determinante.','det(M₂)=det(U,2V,W)=2det(Aᵀ)=10'],
['Comprobamos con una elección válida a=−5/2, b=c=0: det(A)=5; ambos cálculos directos reproducen los valores.','det(M₁)=−15; det(M₂)=10'],
])];default:throw Error('Unknown official case');}}
export function buildInverseParametricBatch(id='batch-0426',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===539?'Sistemas con determinantes':c.slot===1?'Matrices y determinantes':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block=c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===539?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildInverseParametricBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0426-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0426.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[943,'4ed7fc44fe8d81fed98763864234427004d1dfa317b5d6657c1c2da31a4c902b',2,'D.7','b81163cefba2d1ee21767833fc909978ecd4331b5091a672b4ba215072511d1a',0],
[944,'82a981b064c7c77fadf9faecac5c219a4144a7a58a86a02d0c2efc78dc52f59a',1,'OPTATIVIDAD1.2','25e8b9b1afa3bbcaf3e681a667bf5b40a657366fd22ac6baec8245e360893541',0],
[945,'274813eec3b9f750ba00990349dadeb4d837e92c96633e2e02da4e99b2951b34',2,'B.3','d3e12e7c38cb0c974e0e83505ae5bc22c30a88c7c030fde7168eff3af4f5a5fd',0],
[950,'ffc7b024ef2abe93472bbafd9a890f0f2da04f1e105a1fa378ee1e074ea7fd79',1,'A.2','83592f16d89a715aca0964b4e905457c46cb0d80be2de3eec17111acac906385',0],
[951,'96fdec633441fe992d97edda8660bad8bbd44a7d78978f8a56264112791c65e3',2,'D.7','90d40a456011cd10e1cc12506f6e22bcf8cd1cdc30e998313826c8aada278e4f',0]];
export const statements={
943:'Considera el plano π≡x−2y+z−2=0 y la recta r≡system{x=1+2λ;y=λ;z=1}, λ∈ℝ.\na) Estudia la posición relativa de π y r.\nb) Calcula la ecuación de la recta contenida en π que pasa por el punto P(2,−1,−2) y es perpendicular a r.',
944:'Considera la función f:(−1,1)→ℝ definida por f(x)=frac{1}{(1−|x|)²}.\na) Estudia la continuidad y derivabilidad de la función f.\nb) Halla, si existen, sus extremos absolutos (abscisas donde se obtienen y valores que se alcanzan).',
945:'Sean A y B las matrices A=matrix{2,−3;−3,5} y B=matrix{1,−4;−9,5}.\na) Calcula las matrices X e Y para las que 2X−Y=A y X−3Y=B.\nb) Halla la matriz Z que verifica B²+ZA+Bᵗ=3I (I denota la matriz identidad y Bᵗ la matriz traspuesta de B).',
950:'Determina la función f:ℝ→ℝ tal que f″(x)=xeˣ, cuya gráfica pasa por el origen de coordenadas y tiene un extremo relativo en x=1.',
951:'Considera las rectas r≡x=y+a=frac{z+1}{2} y s≡system{x−2y=3a;x+z=2}.\na) Calcula a para que las rectas se corten.\nb) Para a=−1, halla la recta que corta perpendicularmente a r y s.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CONTAINED_CUSPS_MATRIX_LAYOUT']]:[];
export const cases=[{index:943,slot:4,literals:['x − 2y + z − 2 = 0','P (2, −1, −2)']},{index:944,slot:2,literals:['(−1, 1)','extremos absolutos']},{index:945,slot:1,literals:['2X − Y = A','X − 3Y = B']},{index:950,slot:3,literals:['origen','x = 1']},{index:951,slot:4,literals:['x − 2y = 3a','a = −1']}];
export const proof=c=>({943:{contained:true,point:[2,-1,-2],direction:[1,-2,-5],intersection:[1.4,.2,1]},944:{domain:[-1,1],leftDerivative:-2,rightDerivative:2,minimum:[0,1],maximum:null},945:{X:[[1,-1],[0,2]],Y:[[0,1],[3,-1]],Z:[[-76,-39],[101,48]]},950:{C:0,D:2,minimum:[1,2-Math.E]},951:{a:-1,intersection:[1,2,1],direction:[4,-6,1]}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_INCIDENCE_MATRIX_PRODUCT_AND_DERIVATIVE_CHECKS',proof(c));switch(c.index){
case 943:return[mk(0,'La recta r está contenida en el plano π.',['La recta r es paralela a π y no está contenida en él.','La recta r corta a π en un único punto.','La recta r es perpendicular al plano π.'],['Comprobar solo perpendicularidad entre normal y director, sin comprobar un punto.','Confundir una identidad al sustituir con una ecuación de solución única.','Confundir el vector normal del plano con una dirección contenida en él.'],[
['Leemos un punto y el vector director de la recta, y el normal del plano.','R=(1,0,1); u=(2,1,0); n=(1,−2,1)'],
['Comprobamos si la dirección de la recta es paralela al plano.','n·u=2−2+0=0'],
['Esta condición permite dos posibilidades: paralela exterior o contenida. Para distinguirlas comprobamos R.','1−2·0+1−2=0 ⇒ R∈π'],
['Un punto de la recta pertenece al plano y su dirección es paralela a este, por lo que está contenida.','r⊂π'],
['Verificamos directamente sustituyendo un punto genérico de r.','(1+2λ)−2λ+1−2=0 para todo λ∈ℝ'],
['No hay un único punto de intersección: todos los puntos de r pertenecen a π.','r∩π=r'],
]),mk(1,'(x,y,z)=(2,−1,−2)+t(1,−2,−5), t∈ℝ.',['(x,y,z)=(2,−1,−2)+t(2,1,0), t∈ℝ.','(x,y,z)=(2,−1,−2)+t(1,−2,5), t∈ℝ.','(x,y,z)=(2,−1,2)+t(1,−2,−5), t∈ℝ.'],['Usar la dirección de r en lugar de una perpendicular.','Cambiar solo el signo de la componente vertical.','Usar un punto incorrecto aunque la dirección sea válida.'],[
['Comprobamos que el punto dado pertenece al plano.','2−2(−1)−2−2=0 ⇒ P∈π'],
['La dirección buscada debe ser perpendicular tanto al normal del plano como al director de r.','n=(1,−2,1), u=(2,1,0); n×u=(−1,2,5)'],
['Elegimos el vector opuesto, que define la misma dirección, y escribimos la recta por P.','v=(1,−2,−5); ℓ:P+tv'],
['Comprobamos perpendicularidad y pertenencia de la dirección al plano.','v·u=2−2=0; v·n=1+4−5=0'],
['Para asegurar que corta a r, igualamos las parametrizaciones.','2+t=1+2λ; −1−2t=λ; −2−5t=1 ⇒ t=−frac{3}{5}, λ=frac{1}{5}'],
['Las tres coordenadas coinciden, de modo que no se trata de rectas cruzadas.','Q=(frac{7}{5},frac{1}{5},1)∈r∩ℓ; ℓ⊂π'],
])];
case 944:return[mk(0,'Continua en (−1,1); derivable en (−1,0)∪(0,1), no derivable en 0.',['Continua y derivable en todo (−1,1).','Discontinua en 0 y derivable en (−1,0)∪(0,1).','Continua en (−1,1), pero no derivable en ningún punto.'],['Derivar el valor absoluto en cero como si tuviera derivada.','Confundir falta de derivabilidad con falta de continuidad.','Extender a todo el dominio la singularidad del valor absoluto.'],[
['Deshacemos el valor absoluto según el signo de x, respetando el dominio abierto.','f(x)=(1+x)⁻² si −1<x<0; f(x)=(1−x)⁻² si 0≤x<1'],
['En ambos intervalos el denominador es no nulo; en cero coinciden los valores laterales y el de la función.','lim_{x→0⁻}f(x)=lim_{x→0⁺}f(x)=f(0)=1 ⇒ f continua en (−1,1)'],
['Derivamos cada rama mediante la regla de la cadena.','f′(x)=−frac{2}{(1+x)³} si x<0; f′(x)=frac{2}{(1−x)³} si x>0'],
['Comprobamos las derivadas laterales en cero con cocientes incrementales.','frac{(1+h)⁻²−1}{h}=frac{−2−h}{(1+h)²}→−2; frac{(1−h)⁻²−1}{h}=frac{2−h}{(1−h)²}→2'],
['Las derivadas laterales son distintas; existe un punto angular, no una discontinuidad.','f′₋(0)=−2≠2=f′₊(0) ⇒ f no derivable en 0'],
['Los extremos −1 y 1 no pertenecen al dominio y no se consideran puntos de continuidad o derivabilidad de f.','Conjunto de derivabilidad: (−1,0)∪(0,1)'],
]),mk(1,'Mínimo absoluto en x=0, valor 1; no existe máximo absoluto.',['Máximo absoluto en x=0, valor 1; no existe mínimo absoluto.','Mínimo absoluto en x=0, valor 0; no existe máximo absoluto.','No existe mínimo absoluto ni máximo absoluto.'],['Invertir el signo de la derivada en las dos ramas.','Confundir la abscisa del mínimo con su valor.','Descartar un mínimo porque la función no sea derivable allí.'],[
['En la rama negativa el denominador de la derivada es positivo, por lo que f decrece.','−1<x<0 ⇒ f′(x)=−frac{2}{(1+x)³}<0'],
['En la rama positiva f crece; por tanto cero es candidato a mínimo aunque no tenga derivada.','0<x<1 ⇒ f′(x)=frac{2}{(1−x)³}>0'],
['Calculamos el valor de la función en el punto de cambio.','f(0)=frac{1}{(1−0)²}=1'],
['Demostramos que el mínimo es absoluto con una desigualdad válida en todo el dominio.','0<1−|x|≤1 ⇒ f(x)≥1, con igualdad solo si x=0'],
['Examinamos los extremos abiertos para decidir si existe máximo.','lim_{x→−1⁺}f(x)=lim_{x→1⁻}f(x)=+∞'],
['La función no está acotada superiormente, por lo que no alcanza máximo absoluto.','Mínimo absoluto: (0,1); máximo absoluto: no existe'],
])];
case 945:return[mk(0,'X=matrix{1,−1;0,2}; Y=matrix{0,1;3,−1}.',['X=matrix{0,1;3,−1}; Y=matrix{1,−1;0,2}.','X=matrix{1,−1;0,2}; Y=matrix{0,−1;−3,1}.','X=matrix{−1,1;0,−2}; Y=matrix{0,1;3,−1}.'],['Intercambiar las matrices desconocidas.','Cambiar el signo al despejar Y.','Cambiar el signo al despejar X.'],[
['Tratamos las dos ecuaciones matriciales como un sistema lineal, conservando el orden de las sumas.','2X−Y=A; X−3Y=B'],
['Despejamos Y de la primera ecuación y sustituimos en la segunda.','Y=2X−A; X−3(2X−A)=B'],
['Agrupamos X y despejamos.','−5X+3A=B ⇒ X=frac{1}{5}(3A−B)'],
['Realizamos la resta entrada a entrada.','3A−B=matrix{5,−5;0,10} ⇒ X=matrix{1,−1;0,2}'],
['Recuperamos Y y comprobamos la primera ecuación.','Y=2X−A=matrix{0,1;3,−1}; 2X−Y=matrix{2,−3;−3,5}=A'],
['Comprobamos también la segunda ecuación original.','X−3Y=matrix{1,−4;−9,5}=B'],
]),mk(1,'Z=matrix{−76,−39;101,48}.',['Z=matrix{−1,−24;11,−27}.','Z=matrix{−98,−54;96,46}.','Z=matrix{−91,−49;126,63}.'],['Multiplicar por A⁻¹ a la izquierda en vez de a la derecha.','Omitir la matriz traspuesta Bᵗ.','Sustituir Bᵗ por B.'],[
['Aislamos ZA y respetamos el orden de multiplicación matricial.','ZA=3I−B²−Bᵗ ⇒ Z=(3I−B²−Bᵗ)A⁻¹'],
['Calculamos el determinante y la inversa de A.','det A=2·5−(−3)(−3)=1; A⁻¹=matrix{5,3;3,2}'],
['Multiplicamos B por sí misma, no sus entradas al cuadrado, y calculamos su traspuesta.','B²=matrix{37,−24;−54,61}; Bᵗ=matrix{1,−9;−4,5}'],
['Restamos las matrices entrada a entrada.','3I−B²−Bᵗ=matrix{−35,33;58,−63}'],
['Multiplicamos a la derecha por la inversa.','Z=matrix{−175+99,−105+66;290−189,174−126}=matrix{−76,−39;101,48}'],
['Verificamos la ecuación completa mediante el producto obtenido.','ZA=matrix{−35,33;58,−63}; B²+ZA+Bᵗ=matrix{3,0;0,3}=3I'],
])];
case 950:return[mk(0,'f(x)=(x−2)eˣ+2.',['f(x)=(x−1)eˣ+1.','f(x)=(x−2)eˣ.','f(x)=(x−2)eˣ+x+2.'],['Confundir una primitiva de f″ con f.','Omitir la constante impuesta por el origen.','Añadir un término lineal que incumple la condición de extremo.'],[
['El PDF da la segunda derivada; necesitamos integrar dos veces y usar las dos condiciones.','f″(x)=xeˣ; f(0)=0; f′(1)=0'],
['Integramos por partes: u=x y dv=eˣdx.','∫xeˣdx=xeˣ−∫eˣdx=(x−1)eˣ ⇒ f′(x)=(x−1)eˣ+C'],
['Como f es derivable y tiene un extremo en uno, su primera derivada se anula allí.','f′(1)=0·e+C=0 ⇒ C=0'],
['Integramos nuevamente, separando los dos términos y usando la primitiva anterior.','f(x)=∫(x−1)eˣdx=(x−1)eˣ−eˣ+D=(x−2)eˣ+D'],
['La gráfica pasa por el origen; esto fija la segunda constante.','f(0)=−2+D=0 ⇒ D=2; f(x)=(x−2)eˣ+2'],
['Verificamos la segunda derivada y que el punto estacionario sea realmente extremo.','f′=(x−1)eˣ; f″=xeˣ; f″(1)=e>0 ⇒ mínimo relativo en (1,2−e); f(0)=0'],
])];
case 951:return[mk(0,'a=−1.',['a=1.','a=0.','a=−2.'],['Cambiar el signo al relacionar el parámetro de r con a.','Olvidar la constante de la ecuación x+z=2.','Omitir el coeficiente dos de z en la parametrización.'],[
['Igualamos las expresiones de r a un parámetro t.','r:(x,y,z)=(t,t−a,2t−1)'],
['Un punto de r estará en s si satisface simultáneamente sus dos ecuaciones.','t−2(t−a)=3a; t+2t−1=2'],
['La primera igualdad relaciona t con a.','−t+2a=3a ⇒ t=−a'],
['La segunda fija el parámetro del punto de intersección.','3t=3 ⇒ t=1'],
['Ambas condiciones solo son compatibles con un valor de a.','1=−a ⇒ a=−1; P=(1,2,1)'],
['Sustituimos el punto en las ecuaciones originales de ambas rectas.','1=2−1=frac{1+1}{2}; 1−2·2=−3=3a; 1+1=2'],
]),mk(1,'(x,y,z)=(1,2,1)+λ(4,−6,1), λ∈ℝ.',['(x,y,z)=(1,2,1)+λ(1,1,2), λ∈ℝ.','(x,y,z)=(1,1,1)+λ(4,−6,1), λ∈ℝ.','(x,y,z)=(1,2,1)+λ(4,6,1), λ∈ℝ.'],['Elegir la dirección de r en lugar de la perpendicular común.','Usar un punto distinto al de corte.','Cambiar solo un signo del producto vectorial.'],[
['Para a=−1 las rectas se cortan en el punto ya comprobado.','P=(1,2,1)'],
['Leemos el vector director de r y obtenemos uno de s tomando y como parámetro.','u=(1,1,2); s:(2q−3,q,5−2q); v=(2,1,−2)'],
['Una dirección perpendicular a ambas se obtiene mediante el producto vectorial.','u×v=(−4,6,−1); w=(4,−6,1)'],
['La perpendicular común debe pasar por la intersección. Escribimos su ecuación vectorial.','ℓ:(x,y,z)=(1,2,1)+λ(4,−6,1)'],
['Verificamos los dos productos escalares.','w·u=4−6+2=0; w·v=8−6−2=0'],
['En λ=0 la recta pasa por P, perteneciente a ambas, por lo que las corta y no solo tiene dirección ortogonal.','P∈r∩s∩ℓ; ℓ⊥r y ℓ⊥s'],
])];default:throw Error('Unknown contained-cusps-matrix case');}}
export function buildContainedCuspsMatrixBatch(id='batch-0452',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Ecuaciones matriciales',2:'Continuidad y extremos',3:'Primitivas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_CONTAINED_CUSPS_MATRIX'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildContainedCuspsMatrixBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0452-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0452.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {graphs} from './resolve-andalucia-mates-source-areas.mjs';
export const observations=[
[839,'3c73d7569c1433d92a94cc59d448ac36b1ef461888db782ababda36489d9f359',1,'A.2','1417b2e78c78910487a29d5dd444c01fc8d4ff8bb7c80f22d0b18f661ca86a62',0],
[842,'0fa1c3912eac6e5af10e80bbdfd579032d29e008b33880c6bd4e8f86334d9db6',1,'A.2','780f481cf9a579273a952b3182cb6ae8352db6d3eda1c74b25da488f33487d2f',0],
[844,'638c1decf68db7761653ce6239400acc00ca5aff6d558ac22705b9864b909625',2,'B.4','ddb6ea48261c46c35e4fad16df40424046d337ff37d682209ecbdc0988edc6a2',0],
[845,'2852db48391a57842be2fd949b4d1d8f1640f5a415cd5beb0691954ee488a191',1,'A.3','cb96caf3d3bfe99d1ea8d9f1b071a416be4005ef1ff262e6088faba2a6f68526',0],
[847,'2c5278437c9b39d12317034e63fd1a4e30b153d3926def7914bceb3390e42da6',1,'NONE.2','5b1b015693870ef1ceddbf3f32eeb578da6947858448ccfee9f60a931ca3a5cf',0],
[850,'1e4f531b5628e8a28245106f3c6fabe999a180d01408f83dbb02d7a79a9c179e',2,'B.8','eb011903d29bddbdfd5f4ae07d3aa1c183e6619e4a5fa86d08ea96035813ed44',0]];
export const statements={
839:'Sea f:(0,+∞)→ℝ la función definida por f(x)=x(ln(x))² (ln denota la función logaritmo neperiano).\na) Calcula, si existen, sus extremos relativos (abscisas donde se obtienen y valores que se alcanzan).\nb) Calcula, si existen, sus extremos absolutos (abscisas donde se obtienen y valores que se alcanzan).',
842:'Calcula el valor de a>1 sabiendo que el área del recinto comprendido entre la parábola y=−x²+ax y la recta y=x es frac{4}{3}.',
844:'Calcula la distancia entre las rectas dadas por las siguientes ecuaciones: r: x=y=z y s: system{x=1+μ;y=3+μ;z=−μ}.',
845:'Considera las matrices A=matrix{2,−1,λ;2,−λ,1;2λ,−1,1}, B=matrix{−1;1;0} y X=matrix{x;y;z}.\na) Discute el rango de A según los valores del parámetro λ.\nb) Para λ=−2, estudia y resuelve el sistema dado por AX=B.',
847:'Considera los puntos A(1,2,0), B(2,m,1), C(3,4,2) y D(1,−1,m).\na) Halla los valores de m para los cuales los puntos anteriores son coplanarios.\nb) Para m=1, calcula el área del triángulo de vértices A, B, C y el volumen del tetraedro de vértices A, B, C, D.',
850:'Dados los puntos O(0,0,0), A(2,−1,0), B(3,0,x) y C(−x,1,−1), los vectores OA, OB y OC determinan un paralelepípedo.\na) Calcula los posibles valores de x sabiendo que el volumen del paralelepípedo es 5 unidades cúbicas.\nb) Para x=1, halla el área de la cara del paralelepípedo que contiene a los vértices O, A y B.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_LOG_RANK_VOLUME_LAYOUT']]:[];
export const cases=[{index:839,slot:2,literals:['ln (x)','extremos absolutos']},{index:842,slot:3,literals:['a > 1','43']},{index:844,slot:4,literals:['x=y=z','−µ']},{index:845,slot:1,literals:['2λ','λ = −2']},{index:847,slot:4,literals:['B(2, m, 1)','D(1, −1, m)']},{index:850,slot:4,literals:['A(2, −1, 0)','5 unidades','x = 1']}];
export const proof=c=>({839:{relativeMaximum:[Math.exp(-2),4*Math.exp(-2)],minimum:[1,0],absoluteMaximum:null},842:{a:3,area:4/3,intersections:[[0,0],[2,2]]},844:{u:[1,1,1],v:[1,1,-1],cross:[-2,2,0],distance:Math.sqrt(2),feet:[[1,1,1],[0,2,1]]},845:{determinant:[4,-6,0,2],rankAt1:1,rankAtMinus2:2,particular:[-1/6,2/3,0],direction:[.5,-1,1]},847:{coplanar:[0,3],mixedProduct:[0,6,-2],triangleArea:2*Math.sqrt(2),tetrahedronVolume:2/3},850:{mixedProduct:[-3,-2,1],roots:[-2,4],faceArea:Math.sqrt(14)}}[c.index]);
export function solve(c){const t=statements[c.index],ps=/\na\)/.test(t)?officialParts(t):[{id:'whole',prompt:t}],mk=(i,a,d,e,s)=>{const p=part(ps[i],a,d,e,s,'INDEPENDENT_DERIVATIVES_QUADRATURE_RANK_AND_VECTOR_CHECKS',proof(c));if(c.index===842)p.visual=graphs[842];return p;};switch(c.index){
case 839:return[mk(0,'Máximo relativo en x=e⁻², valor frac{4}{e²}; mínimo relativo en x=1, valor 0.',[
'Mínimo relativo en x=e⁻², valor frac{4}{e²}; máximo relativo en x=1, valor 0.',
'Máximo relativo en x=e², valor 4e²; mínimo relativo en x=1, valor 0.',
'Máximo relativo en x=e⁻¹, valor frac{1}{e}; mínimo relativo en x=1, valor 0.'],['Invertir el signo de la derivada.','Cambiar el signo al resolver ln(x)=−2.','Omitir el factor dos al derivar el cuadrado del logaritmo.'],[
['Trabajamos en el dominio positivo, donde la función es derivable. Aplicamos producto y cadena.','f′(x)=(ln x)²+2ln x=ln x(ln x+2)'],
['Igualamos cada factor a cero; el logaritmo es estrictamente creciente.','ln x=−2 ⇒ x=e⁻²; ln x=0 ⇒ x=1'],
['Estudiamos signos en los tres intervalos separados por los puntos críticos.','f′>0 en (0,e⁻²); f′<0 en (e⁻²,1); f′>0 en (1,+∞)'],
['El primer cambio pasa de crecer a decrecer; el segundo, de decrecer a crecer.','Máximo relativo en e⁻²; mínimo relativo en 1'],
['Evaluamos la función, no la derivada, para hallar los valores alcanzados.','f(e⁻²)=e⁻²(−2)²=frac{4}{e²}; f(1)=0'],
['La segunda derivada proporciona una comprobación adicional de la clasificación.','f″(x)=frac{2ln x+2}{x}; f″(e⁻²)<0; f″(1)=2>0'],
]),mk(1,'Mínimo absoluto en x=1, valor 0; no existe máximo absoluto.',[
'Mínimo absoluto en x=1, valor 0; máximo absoluto en x=e⁻², valor frac{4}{e²}.',
'Mínimo absoluto en x=0, valor 0; no existe máximo absoluto.',
'Mínimo absoluto en x=e⁻², valor frac{4}{e²}; no existe máximo absoluto.'],['Confundir máximo relativo con máximo absoluto.','Incluir un extremo que está excluido del dominio.','Confundir un máximo local con mínimo global.'],[
['Como x es positivo y el logaritmo está elevado al cuadrado, la función nunca es negativa.','f(x)=x(ln x)²≥0 para x>0'],
['La igualdad se alcanza cuando el logaritmo vale cero.','f(x)=0 ⇔ x=1'],
['Por tanto existe un mínimo absoluto y se alcanza en un punto del dominio.','Mínimo absoluto: f(1)=0'],
['Para decidir si hay máximo global, estudiamos el comportamiento en infinito.','lim_{x→+∞}x(ln x)²=+∞'],
['La función no está acotada superiormente; su máximo local no puede ser absoluto.','No existe máximo absoluto'],
['El límite en el extremo abierto cero también vale cero, pero cero no es una abscisa permitida.','x=e^{−u}: x(ln x)²=u²e^{−u}→0 cuando u→+∞; x=0∉D'],
])];
case 842:return[mk(0,'a=3.',['a=9.','a=2.','a=1+root{3}{frac{4}{3}}.'],['Resolver la ecuación cúbica como si el exponente fuera uno.','Olvidar sumar uno después de hallar a−1.','Omitir el divisor seis al calcular el área.'],[
['Igualamos la parábola y la recta para localizar las intersecciones en función del parámetro.','−x²+ax=x ⇒ x(a−1−x)=0 ⇒ x=0 o x=a−1'],
['La condición a>1 ordena los extremos y hace positiva la diferencia dentro del recinto.','0<x<a−1 ⇒ (−x²+ax)−x=x(a−1−x)>0'],
['Planteamos el área con la curva superior menos la inferior.','A(a)=∫_0^{a−1}((a−1)x−x²)dx'],
['Integramos y evaluamos sin perder la potencia del extremo.','A(a)=[frac{a−1}{2}x²−frac{x³}{3}]_0^{a−1}=frac{(a−1)³}{6}'],
['Igualamos al área que demuestra la fracción del PDF oficial y resolvemos.','frac{(a−1)³}{6}=frac{4}{3} ⇒ (a−1)³=8 ⇒ a=3>1'],
['Comprobamos con ese valor; la figura adjunta muestra las dos curvas y el recinto entre cero y dos.','A(3)=∫_0²(2x−x²)dx=[x²−frac{x³}{3}]_0²=frac{4}{3}'],
])];
case 844:return[mk(0,'d(r,s)=√2.',[
'd(r,s)=2.','d(r,s)=4.','d(r,s)=√(frac{14}{3}).'],['Dar el cuadrado de la distancia.','Omitir la normalización del producto mixto.','Calcular distancia de un punto arbitrario de s a r en vez de distancia entre rectas.'],[
['Parametrizamos la primera recta y elegimos un punto y un vector director en cada una.','r: P(t)=(t,t,t), u=(1,1,1); s: Q(μ)=(1+μ,3+μ,−μ), v=(1,1,−1)'],
['Calculamos un vector perpendicular a ambas direcciones; no son paralelas.','u×v=(−2,2,0); ||u×v||=√8'],
['Tomamos el vector que une los puntos de parámetros cero. El producto mixto no es nulo, luego las rectas se cruzan.','Q(0)−P(0)=(1,3,0); (1,3,0)·(−2,2,0)=4≠0'],
['La distancia es la proyección absoluta sobre la normal común.','d=frac{|4|}{√8}=√2'],
['Comprobamos buscando puntos cuya unión sea perpendicular a ambas direcciones.','(Q−P)·u=4+μ−3t=0; (Q−P)·v=4+3μ−t=0 ⇒ μ=−1,t=1'],
['Esos puntos realizan la distancia mínima y confirman el resultado.','P=(1,1,1), Q=(0,2,1); Q−P=(−1,1,0); ||Q−P||=√2'],
])];
case 845:return[mk(0,'λ∉{1,−2}: rango 3; λ=−2: rango 2; λ=1: rango 1.',[
'λ∉{1,−2}: rango 3; λ=−2: rango 2; λ=1: rango 2.',
'λ∉{1,−2}: rango 3; λ=−2: rango 1; λ=1: rango 1.',
'λ≠1: rango 3; λ=1: rango 1.'],['Suponer rango dos en todo determinante nulo sin revisar menores.','Confundir los dos valores singulares.','Perder el factor λ+2 del determinante.'],[
['Desarrollamos el determinante de la matriz oficial manteniendo los signos.','det A=2(1−λ)+(2−2λ)+λ(2λ²−2)=2λ³−6λ+4'],
['Factorizamos; solo en esos ceros puede bajar el rango de tres.','det A=2(λ−1)²(λ+2)'],
['Si el determinante no se anula hay tres filas independientes.','λ≠1,−2 ⇒ rango A=3'],
['Para λ=1 todas las filas son iguales y ninguna es nula.','A(1)=matrix{2,−1,1;2,−1,1;2,−1,1} ⇒ rango A=1'],
['Para λ=−2 el determinante se anula, pero existe un menor de orden dos no nulo.','det matrix{2,−1;2,2}=6≠0 ⇒ rango A(−2)=2'],
['Los menores aportan las cotas inferiores y el determinante las superiores, cerrando todos los casos.','Rangos: 3 si λ∉{1,−2}; 2 si λ=−2; 1 si λ=1'],
]),mk(1,'Compatible indeterminado: (x,y,z)=(−frac{1}{6}+frac{t}{2},frac{2}{3}−t,t), t∈ℝ.',[
'Compatible indeterminado: (x,y,z)=(frac{1}{6}+frac{t}{2},frac{2}{3}−t,t), t∈ℝ.',
'Compatible indeterminado: (x,y,z)=(−frac{1}{6}+frac{t}{2},frac{2}{3}+t,t), t∈ℝ.',
'Compatible indeterminado: (x,y,z)=(−frac{1}{6}−frac{t}{2},frac{2}{3}−t,t), t∈ℝ.'],['Cambiar el signo del término independiente de x.','Cambiar el signo al despejar y.','Cambiar el signo del término paramétrico de x.'],[
['Sustituimos el parámetro y escribimos la matriz ampliada con el segundo miembro oficial.','2x−y−2z=−1; 2x+2y+z=1; −4x−y+z=0'],
['La tercera fila es la opuesta de la suma de las dos primeras, incluidos los términos independientes.','F₃=−F₁−F₂; 0=−(−1)−1'],
['El menor de orden dos vale seis; ambos rangos valen dos y hay tres incógnitas.','rango A=rango(A|B)=2<3 ⇒ compatible indeterminado'],
['Restamos las dos primeras ecuaciones y despejamos una incógnita en función de z.','3y+3z=2 ⇒ y=frac{2}{3}−z'],
['Sustituimos en la primera ecuación y elegimos z=t libre.','2x−frac{2}{3}−t=−1 ⇒ x=−frac{1}{6}+frac{t}{2}; z=t'],
['La sustitución completa produce los tres términos independientes para cualquier t real.','A(−2)matrix{−frac{1}{6}+frac{t}{2};frac{2}{3}−t;t}=matrix{−1;1;0}'],
])];
case 847:return[mk(0,'m∈{0,3}.',['m∈{0,−3}.','m∈{0,2}.','m=3 únicamente.'],['Cambiar el signo del término lineal del producto mixto.','Restar mal la ordenada de A al formar AB.','Dividir por m y perder el caso m=0.'],[
['Cuatro puntos son coplanarios si los tres vectores con origen común tienen producto mixto nulo.','AB=(1,m−2,1); AC=(2,2,2); AD=(0,−3,m)'],
['Calculamos el producto vectorial de los dos primeros.','AB×AC=(2m−6,0,6−2m)'],
['Su producto escalar con AD es el determinante que decide la coplanaridad.','(AB×AC)·AD=(6−2m)m=2m(3−m)'],
['Igualamos a cero sin dividir por ningún factor dependiente del parámetro.','2m(3−m)=0 ⇒ m=0 o m=3'],
['Para m=0 los tres vectores satisfacen la ecuación z=x de un plano por el origen vectorial.','AB=(1,−2,1), AC=(2,2,2), AD=(0,−3,0)'],
['Para m=3 los puntos A,B,C están alineados; junto a D pertenecen a un plano. Ambos casos quedan incluidos.','AC=2AB cuando m=3 ⇒ producto mixto cero'],
]),mk(1,'Área ABC=2√2 u²; volumen ABCD=frac{2}{3} u³.',[
'Área ABC=4√2 u²; volumen ABCD=4 u³.',
'Área ABC=2√2 u²; volumen ABCD=frac{4}{3} u³.',
'Área ABC=√2 u²; volumen ABCD=frac{2}{3} u³.'],['Dar área de paralelogramo y volumen de paralelepípedo sin factores geométricos.','Dividir por tres en vez de seis el producto mixto.','Dividir por dos una segunda vez al calcular el área.'],[
['Sustituimos m=1 en los vectores con origen A.','AB=(1,−1,1); AC=(2,2,2); AD=(0,−3,1)'],
['El producto vectorial da el área del paralelogramo de base AB,AC.','AB×AC=(−4,0,4); ||AB×AC||=4√2'],
['El triángulo es la mitad de ese paralelogramo.','Área ABC=frac{4√2}{2}=2√2 u²'],
['El valor absoluto del producto mixto es el volumen del paralelepípedo de los tres vectores.','|(−4,0,4)·(0,−3,1)|=4'],
['Un tetraedro ocupa una sexta parte de ese volumen.','Volumen ABCD=frac{4}{6}=frac{2}{3} u³'],
['Verificamos con la distancia de D al plano ABC y la fórmula de la pirámide triangular.','h=frac{4}{4√2}=frac{1}{√2}; V=frac{1}{3}(2√2)frac{1}{√2}=frac{2}{3}'],
])];
case 850:return[mk(0,'x∈{−2,4}.',['x∈{−4,2}.','x∈{1−√6,1+√6}.','x∈{−1,3}.'],['Cambiar el signo del término lineal al calcular el determinante.','Omitir el término constante menos tres del producto mixto.','Resolver volumen cero en vez de volumen cinco.'],[
['Los tres vectores parten del origen, por lo que coinciden con las coordenadas de los puntos.','OA=(2,−1,0); OB=(3,0,x); OC=(−x,1,−1)'],
['El volumen es el valor absoluto del producto mixto, no el determinante con signo.','OB×OC=(−x,3−x²,3); OA·(OB×OC)=x²−2x−3'],
['El valor absoluto exige plantear las dos posibilidades de signo del producto mixto.','V=|x²−2x−3|=5'],
['Resolvemos la rama positiva y la negativa por separado.','x²−2x−3=5 ⇒ x²−2x−8=0; x²−2x−3=−5 ⇒ x²−2x+2=0'],
['La primera rama factoriza y la segunda no tiene raíces reales.','(x−4)(x+2)=0; Δ=4−8=−4<0'],
['Comprobamos las dos raíces reales sustituyendo en el valor absoluto del producto mixto.','V(−2)=|4+4−3|=5; V(4)=|16−8−3|=5'],
]),mk(1,'Área de la cara OAB=√14 u².',['Área de la cara OAB=frac{√14}{2} u².','Área de la cara OAB=14 u².','Área de la cara OAB=√50 u².'],['Calcular el triángulo OAB en vez de la cara completa del paralelepípedo.','Usar la norma al cuadrado del producto vectorial.','Multiplicar longitudes suponiendo perpendicularidad inexistente.'],[
['Para x=1 sustituimos en los dos vectores que generan la cara.','OA=(2,−1,0); OB=(3,0,1)'],
['La cara es un paralelogramo, no un triángulo; usamos la norma del producto vectorial completo.','Área=||OA×OB||'],
['Calculamos las tres componentes con sus signos.','OA×OB=(−1,−2,3)'],
['Sumamos los cuadrados y extraemos la raíz.','Área=√(1+4+9)=√14 u²'],
['Comprobamos mediante el determinante de Gram.','||OA||²=5; ||OB||²=10; OA·OB=6'],
['La identidad de Gram confirma el mismo resultado y descarta multiplicar directamente las longitudes.','Área=√(5·10−6²)=√14'],
])];default:throw Error('Unknown log-rank-volume case');}}
export function buildLogRankVolumeBatch(id='batch-0445',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Rangos y sistemas',2:'Extremos de funciones',3:'Integrales definidas y áreas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=c.index===842?['Representación gráfica']:[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_LOG_RANK_VOLUME'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLogRankVolumeBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0445-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0445.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

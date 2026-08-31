import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [995,'e57bc2d094c8120f546b4dd3c69e3372e9fcc93f38875e052f536867901cc5be',1,'A.1','8c3a95b0771d3436c61fd5c80bb229137dfd32bcc31504d8b46af880864c8624',0],
 [996,'8f26bd61ad72286c9619dd2a285b762aa5a353de3a134f51beb40e7bde69c151',2,'B.4','150da6ef042299842f63b497790e6b1330efcec3a64132da015b8eff99bfc9a3',0],
 [1003,'fda0d38e4ae5dc84aca1154cbe3fb0c5c7c74cb9d32b6ded6aaf94c6ee056755',2,'A.4','07beed4dc9fff014da103054120724eafb7d323530504a2c4bce120cbb6512b3',0],
 [1006,'1ae1a1173683cbcf7a9e46bb22d7f4a8de35f57e67ec4beb8bc11283c1ceb2c5',2,'B.3','af71568db1c71eecc336ecf79cfaa22af0c65866a466425aee25f16be9f1b326',0],
 [1007,'8a4fbdb778e76f41bc69fd26b30707ae55040cbe14cb93df5155dde32ea745a0',2,'B.1','ae57c99177fffc0b6fad2aa77c28685d9a68bca0b6b6b574a724b0e086573e17',0],
 [1008,'bebc339cfd8f69c7c4fae160fd165eaef5f6bc93cfd6d15cb9ce289b7029d167',1,'A.2','cc0460014d57eee31a024f4220800f8dcb71e50e0e42b43de10f8a84fd26ad16',0],
];
export const statements={
 995:'Calcula la función polinómica, de grado 3, de la que se sabe que tiene un extremo relativo en el punto (0,2) y que la tangente a su gráfica en el punto de abscisa x=1 es la recta x+y=3.',
 996:'Considera el punto P(2,−2,0) y la recta r dada por system{x+z−2=0;y+z−1=0}.\na) Halla la ecuación del plano que contiene a P y es perpendicular a r.\nb) Calcula la distancia de P a r.',
 1003:'Considera la matriz A=matrix{0,3,4;1,−4,−5;−1,3,4}.\na) Comprueba que A³+I=O, siendo I la matriz identidad y O la matriz nula. Calcula A⁻¹.\nb) Calcula A²⁰²⁵.',
 1006:'Considera el siguiente sistema de ecuaciones system{mx−2y+z=1;x−2my+z=−2;x−2y+mz=1}.\na) Discute el sistema según los valores del parámetro m.\nb) Si es posible, resuelve el sistema para m=−2.',
 1007:'Sea f:(−∞,1)→ℝ la función definida por f(x)=cases{x+2e^{−x},x≤0;a√{b−x},0<x<1}.\na) Determina a y b sabiendo que f es derivable en todo su dominio.\nb) Halla la ecuación de la recta tangente y de la recta normal a la gráfica de f en el punto de abscisa x=0.',
 1008:'a) Calcule los valores de a y b para que la función f(x)=cases{frac{b}{2−x},x≤1;ax²−3x+1,x>1} sea derivable en el punto de abscisa x=1.\nb) Para a=1 y b=2, estudie su monotonía y determine las ecuaciones de sus asíntotas, si existen.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CUBIC_MATRIX_GLUING_SCOPE_AND_LAYOUT']]:[];
export const cases=[
 {index:995,slot:2,literals:['grado 3','(0, 2)','x + y = 3']},
 {index:996,slot:4,literals:['P (2, −2, 0)','x+z−2=0','distancia']},
 {index:1003,slot:1,literals:['A2025','A3 + I = O']},
 {index:1006,slot:1,literals:['mx − 2y + z = 1','m = −2']},
 {index:1007,slot:2,literals:['(−∞, 1)','recta normal']},
 {index:1008,slot:3,ccss:true,literals:['sea derivable','Para a = 1 y b = 2']},
];
export const proof=c=>({
 995:{polynomial:[-1,1,0,2],contact:[1,2],slope:-1,extremum:[0,2],secondDerivativeAtZero:2},
 996:{point:[2,-2,0],linePoint:[2,1,0],direction:[-1,-1,1],foot:[1,0,1],plane:[1,1,-1,0],distanceSquared:6},
 1003:{A:[[0,3,4],[1,-4,-5],[-1,3,4]],A2:[[-1,0,1],[1,4,4],[-1,-3,-3]],inverse:[[1,0,-1],[-1,-4,-4],[1,3,3]],power2025:[[-1,0,0],[0,-1,0],[0,0,-1]]},
 1006:{singular:[-2,1],determinantCoefficients:[-2,0,6,-4],atMinus2:{coefficientRank:2,augmentedRank:2,base:[-1,0,-1],direction:[-2,1,-2]},atOne:{coefficientRank:1,augmentedRank:2}},
 1007:{parameters:[2,1],value:2,derivative:-1,tangent:[-1,2],normal:[1,2]},
 1008:{parameters:[1,-1],breakpoint:1,stationary:1.5,leftValue:2,rightLimit:-1,minimum:-1.25,horizontalAtMinusInfinity:0},
}[c.index]);
export function solve(c){
 const text=statements[c.index],ps=c.index===995?[{id:'whole',prompt:text}]:officialParts(text);
 const mk=(i,a,d,reasons,steps)=>part(ps[i],a,d,reasons,steps,'DIRECT_SUBSTITUTION_MATRIX_PRODUCTS_RANKS_AND_DERIVATIVE_CHECKS',proof(c));
 switch(c.index){
 case 995:return[mk(0,'f(x)=−x³+x²+2.',['f(x)=x³−x²+2.','f(x)=−x³+2x²+2.','f(x)=−x³+x²+2x+2.'],['Cambiar el signo de la pendiente de la tangente.','Usar una condición de valor errónea en x=1.','Omitir que la derivada se anula en el extremo x=0.'],[
 ['Escribimos el polinomio general y su derivada para traducir todas las condiciones.','f(x)=ax³+bx²+cx+d; f′(x)=3ax²+2bx+c'],
 ['El extremo es el punto (0,2): proporciona tanto el valor como la derivada nula.','f(0)=2 ⇒ d=2; f′(0)=0 ⇒ c=0'],
 ['La recta x+y=3 equivale a y=−x+3; en x=1 da el punto de tangencia y su pendiente.','f(1)=2; f′(1)=−1'],
 ['Sustituimos c y d y resolvemos las dos ecuaciones restantes.','a+b=0; 3a+2b=−1 ⇒ b=−a ⇒ a=−1, b=1'],
 ['Comprobamos que el punto estacionario es realmente un extremo y no una inflexión horizontal.','f″(x)=−6x+2; f″(0)=2>0 ⇒ mínimo relativo en (0,2)'],
 ['Verificamos la tangencia y que el coeficiente cúbico es distinto de cero.','f(1)=2; f′(1)=−1 ⇒ y−2=−(x−1) ⇒ x+y=3; a=−1≠0'],
 ])];
 case 996:return[mk(0,'x+y−z=0.',['x+y+z=0.','x+y−z−3=0.','x−y−z−4=0.'],['Cambiar un signo del vector normal.','Usar un punto de la recta en vez de P.','Tomar un vector normal que no es paralelo a la recta.'],[
 ['Parametrizamos la recta tomando z=t.','r:(x,y,z)=(2−t,1−t,t)'],
 ['Leemos un punto y su vector director.','Q=(2,1,0); u=(−1,−1,1)'],
 ['Un plano perpendicular a una recta tiene por normal un director de esa recta.','n=u=(−1,−1,1)'],
 ['Imponemos que el plano pase por P mediante la ecuación punto-normal.','−(x−2)−(y+2)+(z−0)=0'],
 ['Simplificamos la ecuación multiplicando por −1.','x+y−z=0'],
 ['Verificamos el punto y la perpendicularidad.','2+(−2)−0=0; (1,1,−1)=−u'],
 ]),mk(1,'d(P,r)=√6.',['d(P,r)=3.','d(P,r)=√3.','d(P,r)=6.'],['Medir la distancia a Q en vez de al pie perpendicular.','Confundir la componente paralela con la distancia perpendicular.','Dar la distancia al cuadrado.'],[
 ['Buscamos H=Q+tu en la recta de modo que PH sea perpendicular a u.','Q=(2,1,0); P−Q=(0,−3,0); u=(−1,−1,1)'],
 ['La condición de proyección proporciona el parámetro.','(P−Q−tu)·u=0 ⇒ t=frac{(P−Q)·u}{u·u}=frac{3}{3}=1'],
 ['Sustituimos para obtener el pie perpendicular.','H=(2,1,0)+(−1,−1,1)=(1,0,1)'],
 ['Calculamos la longitud del segmento perpendicular.','P−H=(1,−2,−1); d=√{1²+(−2)²+(−1)²}=√6'],
 ['Comprobamos que H está en ambas ecuaciones de la recta y que PH es perpendicular.','1+1−2=0; 0+1−1=0; (1,−2,−1)·(−1,−1,1)=0'],
 ['Como contraste, usamos el producto vectorial para la misma distancia.','(P−Q)×u=(−3,0,−3); d=frac{√18}{√3}=√6'],
 ])];
 case 1003:return[mk(0,'A³=−I; A⁻¹=matrix{1,0,−1;−1,−4,−4;1,3,3}.',['A³=−I; A⁻¹=matrix{−1,0,1;1,4,4;−1,−3,−3}.','A³=−I; A⁻¹=matrix{0,3,4;1,−4,−5;−1,3,4}.','A³=−I; A⁻¹=matrix{0,1,−1;3,−4,3;4,−5,4}.'],['Olvidar el signo negativo al aislar la inversa.','Confundir la matriz con su inversa.','Usar la traspuesta como si la matriz fuera ortogonal.'],[
 ['Multiplicamos filas por columnas para obtener A².','A²=matrix{−1,0,1;1,4,4;−1,−3,−3}'],
 ['Por ejemplo, la primera fila se calcula sin intercambiar el orden de los factores.','(A²)₁₁=0+3−4=−1; (A²)₁₂=0−12+12=0; (A²)₁₃=0−15+16=1'],
 ['Multiplicamos A² por A para verificar la identidad pedida.','A³=matrix{−1,0,0;0,−1,0;0,0,−1}=−I ⇒ A³+I=O'],
 ['La identidad muestra directamente una inversa a ambos lados.','A(−A²)=−A³=I; (−A²)A=I'],
 ['Cambiamos el signo de todos los elementos de A².','A⁻¹=−A²=matrix{1,0,−1;−1,−4,−4;1,3,3}'],
 ['La comprobación independiente consiste en multiplicar en ambos órdenes.','AA⁻¹=A⁻¹A=I'],
 ]),mk(1,'A²⁰²⁵=−I.',['A²⁰²⁵=I.','A²⁰²⁵=A.','A²⁰²⁵=−A.'],['Perder la paridad impar del exponente de −I.','Reducir erróneamente el exponente como si el resto fuera uno.','Conservar un factor A que no queda al dividir 2025 entre tres.'],[
 ['Usamos la identidad A³=−I ya comprobada mediante multiplicación.','A³=−I'],
 ['Dividimos el exponente por tres y comprobamos que no hay resto.','2025=3·675'],
 ['Agrupamos las potencias de la misma matriz.','A²⁰²⁵=(A³)⁶⁷⁵=(−I)⁶⁷⁵'],
 ['La potencia impar de −I conserva el signo negativo.','675 impar ⇒ (−I)⁶⁷⁵=−I'],
 ['Presentamos la matriz resultante.','A²⁰²⁵=matrix{−1,0,0;0,−1,0;0,0,−1}'],
 ['También A⁶=I y 2025 deja resto tres al dividir por seis.','2025=6·337+3 ⇒ A²⁰²⁵=A³=−I'],
 ])];
 case 1006:return[mk(0,'SCD si m≠−2,1; SCI si m=−2; incompatible si m=1.',['SCD si m≠−2,1; incompatible si m=−2; SCI si m=1.','SCD si m≠−2,1; SCI si m=−2 o m=1.','SCD si m≠−2,1; incompatible si m=−2 o m=1.'],['Intercambiar las dos discusiones singulares.','No comprobar la contradicción de los términos independientes en m=1.','Interpretar todo determinante nulo como incompatibilidad.'],[
 ['Formamos la matriz de coeficientes y la ampliada; el término independiente es (1,−2,1).','A=matrix{m,−2,1;1,−2m,1;1,−2,m}; B=matrix{1;−2;1}'],
 ['Sacamos −2 de la segunda columna y calculamos el determinante.','det A=−2(m³−3m+2)=−2(m−1)²(m+2)'],
 ['Para los valores no singulares aplicamos Rouché–Frobenius.','m≠−2,1 ⇒ rg A=rg(A|B)=3 ⇒ SCD'],
 ['En m=1 los tres miembros izquierdos son iguales, pero no los derechos.','x−2y+z=1 y x−2y+z=−2 ⇒ rg A=1, rg(A|B)=2 ⇒ SI'],
 ['En m=−2 la suma de las filas de la ampliada es cero; un menor de orden dos es no nulo.','det matrix{−2,−2;1,4}=−6≠0; F₁+F₂+F₃=0 ⇒ rg A=rg(A|B)=2'],
 ['Hay tres incógnitas y dos ecuaciones independientes en el último caso.','m=−2 ⇒ SCI, una variable libre; m=1 ⇒ SI; restantes ⇒ SCD'],
 ]),mk(1,'(x,y,z)=(−1−2t,t,−1−2t), t∈ℝ.',['(x,y,z)=(−1+2t,t,−1−2t), t∈ℝ.','(x,y,z)=(−1−2t,t,−1+2t), t∈ℝ.','(x,y,z)=(1−2t,t,1−2t), t∈ℝ.'],['Cambiar el signo al despejar x.','Cambiar el signo de z sin comprobar la tercera ecuación.','Cambiar los términos independientes de la familia.'],[
 ['Sustituimos el parámetro oficial m=−2.','−2x−2y+z=1; x+4y+z=−2; x−2y−2z=1'],
 ['Restamos la primera ecuación de la segunda para eliminar z.','3x+6y=−3 ⇒ x+2y=−1'],
 ['Tomamos y=t y despejamos x.','y=t ⇒ x=−1−2t'],
 ['Volvemos a la primera ecuación para despejar z.','z=1+2x+2y=1+2(−1−2t)+2t=−1−2t'],
 ['La tercera ecuación se cumple con cualquier valor real del parámetro.','(−1−2t)−2t−2(−1−2t)=1'],
 ['Verificamos también las otras dos ecuaciones y expresamos la familia completa.','−2(−1−2t)−2t−1−2t=1; −1−2t+4t−1−2t=−2'],
 ])];
 case 1007:return[mk(0,'a=2, b=1.',['a=−2, b=1.','a=1, b=4.','a=4, b=frac{1}{4}.'],['Cambiar el signo al derivar la raíz.','Imponer solo continuidad sin igualdad de derivadas.','Usar una raíz que no está definida en todo el dominio oficial.'],[
 ['Cada rama es derivable donde está definida; la unión debe verificarse en cero. La raíz debe existir para 0<x<1.','b≥1; f(0)=0+2e⁰=2'],
 ['La continuidad en cero impone igualdad del límite derecho y del valor.','a√b=2'],
 ['Derivamos ambas ramas respetando el signo interior.','f′₋(x)=1−2e^{−x}; f′₊(x)=−frac{a}{2√{b−x}}'],
 ['Igualamos sus derivadas en cero.','−1=−frac{a}{2√b} ⇒ a=2√b'],
 ['Sustituimos en la condición de continuidad.','2√b·√b=2 ⇒ b=1; a=2'],
 ['Comprobamos ambas condiciones y el dominio de la raíz.','a√b=2; −frac{a}{2√b}=−1; 1−x>0 si 0<x<1'],
 ]),mk(1,'Tangente: y=−x+2; normal: y=x+2.',['Tangente: y=x+2; normal: y=−x+2.','Tangente: y=−x; normal: y=x.','Tangente: y=−x+2; normal: y=−x+2.'],['Intercambiar las pendientes de tangente y normal.','Olvidar la ordenada del punto de contacto.','Confundir normal con paralela a la tangente.'],[
 ['El punto de contacto se obtiene evaluando la rama que contiene x=0.','P=(0,f(0))=(0,2)'],
 ['La derivabilidad demostrada permite usar la derivada común.','mₜ=f′(0)=1−2=−1'],
 ['Escribimos la tangente en forma punto-pendiente.','y−2=−1(x−0) ⇒ y=−x+2'],
 ['La pendiente de una normal es la opuesta de la inversa de la pendiente tangente no nula.','mₙ=−frac{1}{mₜ}=1'],
 ['Escribimos la normal pasando por el mismo punto.','y−2=1(x−0) ⇒ y=x+2'],
 ['Ambas rectas pasan por P y sus pendientes tienen producto −1.','yₜ(0)=yₙ(0)=2; mₜmₙ=−1'],
 ])];
 case 1008:return[mk(0,'a=1, b=−1.',['a=1, b=2.','a=2, b=0.','a=1, b=1.'],['Usar los parámetros del apartado b como solución de a.','Imponer solo continuidad, sin igualdad de derivadas.','Perder el signo de b al resolver las condiciones.'],[
 ['La derivabilidad exige primero continuidad en x=1.','f(1)=frac{b}{2−1}=b; lim_{x→1⁺}f(x)=a−2 ⇒ b=a−2'],
 ['Derivamos ambas ramas; la derivada del recíproco tiene aquí signo positivo.','f′₋(x)=frac{b}{(2−x)²}; f′₊(x)=2ax−3'],
 ['La igualdad de derivadas laterales añade una segunda ecuación.','f′₋(1)=b; f′₊(1)=2a−3 ⇒ b=2a−3'],
 ['Igualamos ambas expresiones de b y despejamos a.','a−2=2a−3 ⇒ a=1'],
 ['Calculamos b usando la ecuación de continuidad.','b=1−2=−1'],
 ['Verificamos por separado continuidad y derivabilidad.','f(1)=−1=1−2; f′₋(1)=−1=2·1−3=f′₊(1)'],
 ]),mk(1,'Crece en (−∞,1] y (frac{3}{2},∞); decrece en (1,frac{3}{2}); asíntota y=0 cuando x→−∞; no hay verticales ni oblicuas.',['Crece en (−∞,1] y (frac{3}{2},∞); decrece en (1,frac{3}{2}); asíntotas y=0 y x=2.','Crece en (−∞,frac{3}{2}); decrece en (frac{3}{2},∞); asíntota y=0 cuando x→−∞.','Crece en (−∞,1] y (frac{3}{2},∞); decrece en (1,frac{3}{2}); no tiene asíntotas.'],['Usar fuera de su tramo el denominador de la primera rama.','Invertir el signo de la derivada de la parábola y olvidar el salto.','Olvidar el límite de la rama racional en −∞.'],[
 ['En este apartado usamos expresamente a=1 y b=2, distintos de los obtenidos en a.','f(x)=cases{frac{2}{2−x},x≤1;x²−3x+1,x>1}'],
 ['Derivamos por tramos y estudiamos signos, sin usar L’Hôpital.','f′(x)=cases{frac{2}{(2−x)²}>0,x<1;2x−3,x>1}'],
 ['El único cero de la derivada de la segunda rama es 3/2; separamos además la unión.','f′<0 en (1,frac{3}{2}); f′>0 en (frac{3}{2},∞); f′>0 en (−∞,1)'],
 ['El salto impide unir los intervalos de monotonía a través de x=1.','f(1)=2; lim_{x→1⁺}f(x)=−1; f(frac{3}{2})=−frac{5}{4}'],
 ['Calculamos los límites al infinito en la rama que realmente corresponde.','lim_{x→−∞}frac{2}{2−x}=0 ⇒ y=0; lim_{x→∞}frac{x²−3x+1}{x}=+∞ ⇒ sin oblicua'],
 ['No hay límites infinitos en puntos finitos: x=2 pertenece a la rama polinómica.','f(2)=−1; en x=1 ambos límites son finitos ⇒ sin asíntotas verticales'],
 ])];
 default:throw Error('Unknown cubic/matrix/gluing source');
 }
}
export function buildCubicMatrixGluingBatch(id='batch-0459',selected=cases){
 const r=buildBatch(selected,id,solve,proof);
 for(const x of r.batch.records){const c=x.correctionEvidence.parameters;
  x.primaryTopic=c.slot===1?(c.index===1006?'Sistemas con determinantes':'Matrices'):c.slot===4?'Planos y rectas':'Derivadas';
  x.secondaryTopics=c.index===1008?['Derivadas']:[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;
  x[c.slot===4?'geometryEvidence':c.ccss?'calculusEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?(c.index===1006?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':'MATRIX_DETERMINANT_IDENTITIES'):c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.ccss?'PIECEWISE_CONTINUITY_DIFFERENTIABILITY_AND_ASYMPTOTES':'SOURCE_BOUND_DERIVATIVES_AND_CONTINUITY'};
  x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';
 }
 return r;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildCubicMatrixGluingBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0459-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0459.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

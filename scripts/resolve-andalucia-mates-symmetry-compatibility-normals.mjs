import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[769,'274813eec3b9f750ba00990349dadeb4d837e92c96633e2e02da4e99b2951b34',1,'NONE.4','9a02aa971546b3f8dac71c2ff75fd1b93c67c34696932eebe1b7de2929bae99d',0],
[772,'7e01afbcbc60e470239ea2b816456c5e1681c9eacddee55c6b388fa3f235d19f',1,'NONE.3','a6868e4ed81fb01409e19ceafbb73935dc82a9b497b2605771a3fdeb6b36a5d4',0],
[773,'a7aef3a7a20bf486085bab45f78721b97e95ce8000d362fda65851d9ec3a7941',2,'NONE.4','516e1076b987f59f91c42fc608fc60539463d6c1bb0343b9e48fd71d65e00b05',0],
[774,'a236b382afd7ddbc35f4e83791a322bcf96c07c5859fa715a0b6e74f5e2921e1',2,'B.2','a309106149fe960b34b2578dd84add0b083b019fbebce2fd7e15eec6414c043b',0],
[778,'a6eb3a790229e9010e2add3d5742fe55ab4447f4ebec72a4c01d131f0baf4d92',2,'B.7','d6b9af6e5a647eb5d619eff2951ea0af9bdb292819c5bf666ad93032f1464e71',0],
[779,'3bd9605e8f19071b210561d6f59ee83139cc5e20f4ffa7e29a17fa4f08d1752a',1,'A.4','bbcc24ea3631b7e20e21c647aa444b37871b501e7bf119234c1f98c7dcd32b80',0],
[780,'915e3de08a67887ee286773fac80c8a3a54dc62f3ddee5b1bd715b9b25069857',1,'NONE.2','a1ce6690ffcda83e92771b44715a873f91078fee47f22b2106c7d027acefeef2',0]];
export const statements={
769:'Considera los puntos A(1,2,1), B(−1,0,2) y C(3,2,0) y el plano π determinado por ellos.\na) Halla la ecuación de la recta r que está contenida en π y tal que A y B son simétricos respecto de r.\nb) Calcula la distancia de A a r.',
772:'Considera el siguiente sistema de ecuaciones con incógnitas x, y, z: system{λy+(λ+1)z=λ;λx+z=λ;x+λz=λ}.\na) Discute el sistema según los valores del parámetro λ.\nb) Resuelve el sistema para λ=1.\nc) Para λ=0, si es posible, da tres soluciones distintas.',
773:'Halla el punto simétrico de P(2,1,−5) respecto de la recta r definida por system{x−z=0;x+y+2=0}.',
774:'Determina la función f:ℝ→ℝ tal que f″(x)=−2sen(2x), f(0)=1 y f(π/2)=0.',
778:'Considera el plano π≡x−y=0 y la recta r≡frac{x−1}{2}=frac{y}{3}=z−2.\na) Calcula, si es posible, el plano perpendicular a π que contiene a r.\nb) Calcula, si es posible, la recta perpendicular a r, contenida en π y que pasa por el origen.',
779:'Considera la recta r≡system{x+y+2=0;−y+z+5=0} y el plano π≡2x+y−mz=1.\na) Calcula m sabiendo que r y π son paralelos.\nb) Para m=−1, calcula la distancia entre r y π.',
780:'Halla a, b y c sabiendo que la función f:ℝ→ℝ dada por f(x)=a+b sen(x)+c sen(2x) tiene un punto crítico de abscisa x=π y la recta y=−frac{1}{2}x+3 es normal a la gráfica de f en el punto de abscisa x=0.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_SYMMETRY_COMPATIBILITY_NORMALS_LAYOUT']]:[];
export const cases=[{index:769,slot:4,literals:['A(1, 2, 1)','B(−1, 0, 2)','C(3, 2, 0)','sim´etricos']},{index:772,slot:1,literals:['λy + (λ + 1)z = λ','λx + z = λ','x + λz = λ']},{index:773,slot:4,literals:['P (2, 1, −5)','x+y+2 = 0']},{index:774,slot:3,literals:['−2 sen(2x)','f (0) = 1']},{index:778,slot:4,literals:['x − y = 0','perpendicular a r','por el origen']},{index:779,slot:4,literals:['x+y+2 = 0','−y + z + 5 = 0','m = −1']},{index:780,slot:2,literals:['a + b sen(x) + c sen(2x)','normal a la gráﬁca']}];
export const proof=c=>({769:{A:[1,2,1],B:[-1,0,2],C:[3,2,0],midpoint:[0,1,1.5],direction:[4,-5,-2],planeNormal:[1,0,2],distance:1.5},772:{singular:[-1,0,1],incompatible:[-1],infinite:[0,1],lambda1Direction:[-1,-2,1],lambda1Point:[1,1,0]},773:{P:[2,1,-5],Q:[0,-2,0],direction:[1,-1,1],parameter:-2,foot:[-2,0,-2],reflection:[-6,-1,1]},774:{sineCoefficient:.5,linearCoefficient:-2/Math.PI,constant:1},778:{rPoint:[1,0,2],rDirection:[2,3,1],planeNormal:[1,1,-5],planeConstant:9,intersectionWithPi:[3,3,3],originLineDirection:[1,1,-5],perpendicularIntersection:false},779:{m:-1,point:[-2,0,-5],direction:[-1,1,1],normal:[2,1,1],distance:10/Math.sqrt(6)},780:{a:3,b:1,c:.5,tangentSlope:2,normalSlope:-.5}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'INDEPENDENT_PROJECTION_RANK_SUBSTITUTION_AND_DERIVATIVE_CHECK',proof(c));switch(c.index){
case 769:return[mk(0,'r: (x,y,z)=(0,1,3/2)+t(4,−5,−2).',['r: (x,y,z)=(0,1,3/2)+t(4,5,−2).','r: (x,y,z)=(1,2,1)+t(4,−5,−2).','r: (x,y,z)=(0,1,3/2)+t(4,−5,2).'],['Cambiar el signo de la segunda componente de la perpendicular.','Situar el eje en A en vez del punto medio de AB.','Cambiar el signo de la tercera componente y salir del plano.'],[
['El eje de simetría debe pasar por el punto medio y ser perpendicular al segmento AB.','M=frac{A+B}{2}=(0,1,3/2); AB=(−2,−2,1)'],
['Obtenemos una normal al plano utilizando dos vectores no paralelos de sus puntos.','AC=(2,0,−1); AB×AC=(2,0,4) ⇒ nπ=(1,0,2)'],
['La ecuación del plano se obtiene por el punto A.','(x−1)+2(z−1)=0 ⇒ π: x+2z=3'],
['Una dirección del eje debe ser perpendicular a la normal del plano y a AB.','d=nπ×AB=(4,−5,−2)'],
['Construimos la recta con M y esa dirección.','r: (x,y,z)=(0,1,3/2)+t(4,−5,−2)'],
['Verificamos que permanece en π y que M es el pie de la perpendicular de A. Entonces su reflejo es B.','d·nπ=0; d·AB=0; M∈π; 2M−A=(−1,0,2)=B'],
]),mk(1,'d(A,r)=3/2.',['d(A,r)=3.','d(A,r)=√5/2.','d(A,r)=9/4.'],['Usar toda la longitud de AB en vez de la mitad.','Omitir una diferencia de coordenadas en la norma.','Dar el cuadrado de la distancia en vez de su raíz.'],[
['El pie de la perpendicular desde A al eje es el punto medio de A y B.','M=(0,1,3/2)'],
['La distancia punto–recta es la norma del segmento perpendicular.','AM=M−A=(−1,−1,1/2)'],
['Sumamos los cuadrados de las tres componentes.','‖AM‖²=1+1+1/4=9/4'],
['Tomamos la raíz positiva, pues la distancia es no negativa.','d(A,r)=√(9/4)=3/2'],
['Comprobamos usando la longitud completa del segmento entre simétricos.','‖AB‖=√(4+4+1)=3 ⇒ ‖AB‖/2=3/2'],
['La perpendicularidad demuestra que no se está midiendo un segmento oblicuo.','AM·(4,−5,−2)=−4+5−1=0'],
])];
case 772:return[mk(0,'λ∉{−1,0,1}: SCD; λ∈{0,1}: SCI; λ=−1: SI.',['λ∉{−1,0,1}: SCD; λ∈{−1,1}: SCI; λ=0: SI.','λ∉{−1,0,1}: SCD; λ∈{−1,0,1}: SCI; nunca SI.','λ∉{−1,0,1}: SCD; λ=0: SCI; λ∈{−1,1}: SI.'],['Intercambiar la compatibilidad en cero y menos uno.','Suponer que determinante nulo siempre implica infinitas soluciones.','Ignorar que las ecuaciones repetidas para λ=1 tienen el mismo término independiente.'],[
['Escribimos la matriz de coeficientes y su ampliada antes de discutir por rangos.','A=matrix{0,λ,λ+1;λ,0,1;1,0,λ}; b=matrix{λ;λ;λ}'],
['Expandimos el determinante por la segunda columna, que solo tiene una entrada no nula.','det A=−λ(λ²−1)=λ(1−λ)(1+λ)'],
['Fuera de las tres raíces los rangos son tres y la solución es única.','λ∉{−1,0,1} ⇒ rango A=rango(A|b)=3 ⇒ SCD'],
['Para cero quedan x=0 y z=0, con y libre; para uno quedan x+z=1 e y+2z=1.','λ=0 o λ=1 ⇒ rango A=rango(A|b)=2<3 ⇒ SCI'],
['Para menos uno la segunda y tercera ecuaciones se contradicen.','−x+z=−1; x−z=−1 ⇒ 0=−2; rango A=2; rango(A|b)=3 ⇒ SI'],
['Reunimos los casos sin confundir singularidad con incompatibilidad.','λ∉{−1,0,1}: SCD; λ∈{0,1}: SCI; λ=−1: SI'],
]),mk(1,'(x,y,z)=(1−t,1−2t,t), t∈ℝ.',['(x,y,z)=(1−t,1+2t,t), t∈ℝ.','(x,y,z)=(1+t,1−2t,t), t∈ℝ.','Única solución: (x,y,z)=(1,1,0).'],['Cambiar el signo al despejar y.','Cambiar el signo al despejar x.','Confundir una solución particular con todas las soluciones.'],[
['Sustituimos λ=1 en las tres ecuaciones.','system{y+2z=1;x+z=1;x+z=1}'],
['La tercera repite exactamente la segunda, por lo que solo hay dos restricciones independientes.','rango A=rango(A|b)=2'],
['Tomamos z como parámetro libre y despejamos las otras dos incógnitas.','z=t; x=1−t; y=1−2t'],
['Escribimos la familia completa con su dominio paramétrico.','(x,y,z)=(1−t,1−2t,t), t∈ℝ'],
['Sustituimos en las dos ecuaciones distintas para comprobar que todo t sirve.','(1−2t)+2t=1; (1−t)+t=1'],
['Dos valores distintos prueban que la solución particular t=0 no es la única.','t=0 ⇒ (1,1,0); t=1 ⇒ (0,−1,1)'],
]),mk(2,'Tres soluciones: (0,0,0), (0,1,0) y (0,−1,0).',['Tres soluciones: (0,0,0), (1,0,0) y (−1,0,0).','Tres soluciones: (0,0,0), (0,0,1) y (0,0,−1).','Tres soluciones: (0,0,0), (1,1,1) y (−1,−1,−1).'],['Elegir x como libre aunque la tercera ecuación lo fija en cero.','Elegir z como libre aunque la primera ecuación lo fija en cero.','Suponer iguales las tres coordenadas sin justificarlo.'],[
['Sustituimos λ=0 sin dividir por el parámetro.','system{z=0;z=0;x=0}'],
['Las ecuaciones fijan x y z pero no contienen y.','x=0; z=0; y libre'],
['La familia completa permite elegir tantos ejemplos distintos como se necesiten.','(x,y,z)=(0,t,0), t∈ℝ'],
['Elegimos tres valores diferentes del parámetro.','t=0,1,−1 ⇒ (0,0,0), (0,1,0), (0,−1,0)'],
['En cada uno de ellos las tres ecuaciones se verifican exactamente.','z=0; z=0; x=0'],
['Los tres puntos son distintos porque cambia y; no son tres notaciones del mismo punto.','0≠1; 0≠−1; 1≠−1'],
])];
case 773:return[mk(0,'P′=(−6,−1,1).',['P′=(−2,0,−2).','P′=(6,1,−1).','P′=(−2,−5,5).'],['Dar el pie de la perpendicular en lugar del simétrico.','Cambiar globalmente el signo del simétrico.','Reflejar respecto del punto base de la recta, no del pie perpendicular.'],[
['Parametrizamos la intersección de los dos planos que define la recta.','x=z=t; y=−t−2 ⇒ r: (x,y,z)=(0,−2,0)+t(1,−1,1)'],
['El pie H es un punto de r y el vector PH debe ser perpendicular a su dirección.','H=(t,−t−2,t); H−P=(t−2,−t−3,t+5)'],
['Imponemos el producto escalar nulo y resolvemos t.','(H−P)·(1,−1,1)=3t+6=0 ⇒ t=−2'],
['Obtenemos H y usamos que es el punto medio entre P y su simétrico.','H=(−2,0,−2); P′=2H−P'],
['Realizamos la operación coordenada a coordenada.','P′=(−4−2,0−1,−4+5)=(−6,−1,1)'],
['Comprobamos tanto el punto medio sobre r como la perpendicularidad.','(P+P′)/2=H; Hₓ−H_z=0; Hₓ+H_y+2=0; (P′−P)·(1,−1,1)=0'],
])];
case 774:return[mk(0,'f(x)=frac{1}{2}sen(2x)−frac{2}{π}x+1.',['f(x)=−frac{1}{2}sen(2x)−frac{2}{π}x+1.','f(x)=sen(2x)−frac{2}{π}x+1.','f(x)=frac{1}{2}sen(2x)−frac{2}{π}x−1.'],['Cambiar el signo de la primitiva trigonométrica.','Olvidar el factor un medio al integrar cos(2x).','Fijar mal la constante que determina f(0).'],[
['Integramos la segunda derivada aplicando la regla inversa de la cadena.','f″(x)=−2sen(2x) ⇒ f′(x)=cos(2x)+C₁'],
['Integramos otra vez y conservamos dos constantes independientes.','f(x)=frac{1}{2}sen(2x)+C₁x+C₂'],
['La condición en cero fija la constante aditiva.','f(0)=C₂=1'],
['La condición en π/2 fija el coeficiente lineal.','f(π/2)=frac{1}{2}sen π+C₁frac{π}{2}+1=0 ⇒ C₁=−frac{2}{π}'],
['Sustituimos los valores sin añadir ninguna hipótesis sobre la función.','f(x)=frac{1}{2}sen(2x)−frac{2}{π}x+1'],
['Verificamos por doble derivación y en los dos puntos prescritos.','f′(x)=cos(2x)−frac{2}{π}; f″(x)=−2sen(2x); f(0)=1; f(π/2)=0'],
])];
case 778:return[mk(0,'Plano: x+y−5z+9=0.',['Plano: x+y−5z−9=0.','Plano: x−y+z−3=0.','Plano: x+y+5z−11=0.'],['Cambiar el signo de la constante al imponer el punto de r.','Confundir el normal requerido con uno no ortogonal al normal de π.','Cambiar el signo de la componente vertical del normal.'],[
['Extraemos un punto y una dirección de r, y el normal de π.','r: (x,y,z)=(1,0,2)+t(2,3,1); nπ=(1,−1,0)'],
['El normal n del plano buscado debe ser perpendicular a la dirección de r y al normal de π.','n·(2,3,1)=0; n·(1,−1,0)=0'],
['Si n=(a,b,c), la segunda condición da a=b y la primera c=−5a.','n=(a,a,−5a); a≠0 ⇒ n=(1,1,−5)'],
['Utilizamos el punto (1,0,2) de r para fijar el término independiente.','(x−1)+y−5(z−2)=0 ⇒ x+y−5z+9=0'],
['Sustituimos la parametrización para comprobar que contiene toda r.','(1+2t)+3t−5(2+t)+9=0'],
['Comprobamos la perpendicularidad entre los dos planos mediante sus normales.','(1,1,−5)·(1,−1,0)=0'],
]),mk(1,'No existe: la única dirección ortogonal compatible da una recta que no corta a r.',['Recta: (x,y,z)=t(1,1,−5).','Recta: (x,y,z)=t(1,1,1).','Recta: (x,y,z)=t(1,−1,1).'],['Comprobar solo direcciones ortogonales sin exigir que las rectas se corten.','Unir el origen al punto r∩π sin comprobar perpendicularidad.','Ignorar la condición x=y del plano π.'],[
['Una recta perpendicular a r debe cortarla, además de tener dirección ortogonal. Al estar contenida en π, el corte debe ser r∩π.','x−y=(1+2t)−3t=1−t=0 ⇒ t=1'],
['El único punto posible de intersección es Q.','Q=(3,3,3)'],
['Si pasa por el origen y Q, la única recta candidata tiene dirección (1,1,1).','s: (x,y,z)=u(1,1,1)'],
['Esta dirección no es perpendicular a la de r, por lo que la candidata no sirve.','(1,1,1)·(2,3,1)=6≠0'],
['Si se exige solo ortogonalidad de direcciones y permanencia en π, resulta otra recta, pero es cruzada con r.','d=(a,a,c); 5a+c=0 ⇒ d=(1,1,−5); Q∉{u(1,1,−5)}'],
['No confundimos rectas cruzadas de direcciones ortogonales con rectas perpendiculares que se cortan.','No existe recta que reúna simultáneamente las tres condiciones.'],
])];
case 779:return[mk(0,'m=−1.',['m=1.','m=−3.','m=0.'],['Cambiar el signo al resolver la condición de paralelismo.','Cambiar el signo de la componente x de la dirección de r.','Omitir una contribución en el producto escalar.'],[
['Parametrizamos la recta fijando y=t.','r: (x,y,z)=(−2,0,−5)+t(−1,1,1)'],
['El vector normal del plano se lee de sus coeficientes.','nπ=(2,1,−m)'],
['Una recta paralela al plano tiene dirección ortogonal a su normal.','(−1,1,1)·(2,1,−m)=0'],
['Desarrollamos y despejamos el parámetro.','−2+1−m=0 ⇒ m=−1'],
['Comprobamos que la recta no está contenida: su punto base no satisface el plano.','2(−2)+0+(−5)=−9≠1'],
['La dirección sí es paralela y, al no haber pertenencia, recta y plano no se cortan.','(−1,1,1)·(2,1,1)=0; m=−1'],
]),mk(1,'d(r,π)=frac{10}{√6}.',['d(r,π)=√6.','d(r,π)=10.','d(r,π)=frac{5}{√6}.'],['Confundir la distancia con la norma del normal.','Omitir la división por la norma del normal.','Dividir erróneamente por dos el numerador de la distancia.'],[
['Para m=−1 la recta es paralela al plano, de modo que cualquier punto de r tiene la misma distancia.','π: 2x+y+z−1=0; P=(−2,0,−5)∈r'],
['Aplicamos la distancia punto–plano con el término independiente trasladado.','d=frac{|2Pₓ+P_y+P_z−1|}{√(2²+1²+1²)}'],
['Sustituimos y conservamos el signo hasta tomar el valor absoluto.','2(−2)+0−5−1=−10'],
['La norma del normal vale √6.','d(r,π)=frac{10}{√6}=frac{5√6}{3}'],
['Comprobamos que el numerador permanece constante para cualquier punto de r.','2(−2−t)+t+(t−5)−1=−10'],
['La proyección ortogonal proporciona una segunda comprobación geométrica.','H=P+frac{10}{6}(2,1,1); 2Hₓ+H_y+H_z=1; ‖H−P‖=frac{10}{√6}'],
])];
case 780:return[mk(0,'a=3, b=1, c=1/2.',['a=3, b=−1, c=−1/2.','a=−3, b=1, c=1/2.','a=3, b=1/2, c=1/4.'],['Cambiar el signo de la pendiente tangente al partir de la normal.','Tomar el opuesto de la ordenada en el origen de la normal.','Olvidar que la pendiente tangente es dos, no uno.'],[
['La normal en x=0 pasa por (0,f(0)); su ordenada en el origen es tres.','f(0)=a=3'],
['La pendiente de la normal es −1/2; la de la tangente debe ser su opuesta recíproca.','mₜ·(−1/2)=−1 ⇒ f′(0)=2'],
['Derivamos con la regla de la cadena en sen(2x).','f′(x)=b cos x+2c cos(2x) ⇒ b+2c=2'],
['Un punto crítico en x=π satisface f′(π)=0.','−b+2c=0'],
['Sumamos las dos ecuaciones y recuperamos los dos coeficientes.','4c=2 ⇒ c=1/2; b=2c=1'],
['Sustituimos para comprobar las tres condiciones originales.','f(0)=3; f′(0)=1+1=2; f′(π)=−1+1=0; normal: y=−frac{1}{2}x+3'],
])];
default:throw Error('Unknown symmetry/compatibility/normal case');}}
export function buildSymmetryCompatibilityNormalsBatch(id='batch-0440',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas con parámetros':c.slot===2?'Tangente y normal':c.slot===3?'Primitivas e integrales':'Propiedades métricas';x.secondaryTopics=[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_SYMMETRY_COMPATIBILITY_NORMALS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSymmetryCompatibilityNormalsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0440-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0440.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

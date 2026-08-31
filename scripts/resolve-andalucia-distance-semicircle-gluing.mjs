import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1057,'57a94794707b1b7875c44400a89e0e02d964c61659e3e0531c40ff634f78104c',2,'B.8','a2aafefcd79a18e6a9db916b5660e53000b6a30cb614dbcdead7daab4c7de199',0],
 [1059,'497e6d1a54cf3d5393bc8727864e641ec08a5aca088f46eb0e0ed8d8075d7b6d',1,'A.1','36dcacf425d176a590661bb04d8f2725fda026ccb96b6f5ef57d5d716718ebc7',0],
 [1060,'74ab2c123d3df105640328a5953d165030deecf0873f4dfd65271d375ae8be25',1,'A.4','9b94a9876aeec6910cce6359c7d592214c2918fd7d08d6a62ee8a4714a1e3bb9',0],
 [1062,'915e3de08a67887ee286773fac80c8a3a54dc62f3ddee5b1bd715b9b25069857',1,'A.1','a1ce6690ffcda83e92771b44715a873f91078fee47f22b2106c7d027acefeef2',0],
 [1063,'bcc0f5d10e7ba4afb5526c30934e6d5202e410eb02006f53611566d004cd16dc',2,'B.1','9962e965dc2a999ccb82620978600309acfd94fe4628b9ef5c8d6f98b3c92259',0],
];
export const statements={1057:'Considera el punto A(−1,1,3) y la recta r determinada por los puntos B(2,1,1) y C(0,1,−1).\na) Halla la distancia del punto A a la recta r.\nb) Calcula el área del triángulo cuyos vértices son A, B y C.',1059:'Determina las longitudes de los lados de un rectángulo de área máxima que está inscrito en una semicircunferencia de 6 cm de radio, teniendo uno de sus lados sobre el diámetro de ella.',1060:'Calcula ∫_{1}^{3}|x²−3x+2|dx.',1062:'Sea la función derivable f:ℝ→ℝ definida por f(x)=cases{frac{ax+b}{x−1},x≤0;ln(1+x),x>0} (ln denota la función logaritmo neperiano).\na) Determina a y b.\nb) Halla las ecuaciones de las rectas tangente y normal a la gráfica de f en el punto de abscisa x=2.',1063:'Determina k≠0 sabiendo que la función f:ℝ→ℝ definida por f(x)=cases{3−kx²,x≤1;frac{2}{kx},x>1} es derivable.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_DISTANCE_SEMICIRCLE_GLUING_LAYOUT']]:[];
export const cases=[{index:1057,slot:4,literals:['A(−1, 1, 3)','B(2, 1, 1)','C(0, 1, −1)']},{index:1059,slot:2,literals:['semicircunferencia','6 cm','diámetro']},{index:1060,slot:3,literals:['|x2 − 3x + 2|']},{index:1062,slot:2,literals:['ax + b','ln(1 + x)','x − 1']},{index:1063,slot:2,literals:['3 − kx2','kx','derivable']}];
export const proof=c=>({1057:{cross:[0,10,0],distance:5/Math.sqrt(2),foot:[1.5,1,.5],area:5},1059:{radius:6,halfBase:3*Math.sqrt(2),base:6*Math.sqrt(2),height:3*Math.sqrt(2),area:36},1060:{roots:[1,2],negativeContribution:1/6,positiveContribution:5/6,integral:1,signedIntegral:2/3},1062:{a:-1,b:0,point:[2,Math.log(3)],tangentSlope:1/3,normalSlope:-3},1063:{continuityCandidates:[1,2],formalDerivativeCandidates:[-1,1],common:1}}[c.index]);
export function solve(c){const ps=[1057,1062].includes(c.index)?officialParts(statements[c.index]):[{id:'whole',prompt:statements[c.index]}],mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'INDEPENDENT_COORDINATES_QUADRATURE_BOUNDARIES_AND_DERIVATIVES',proof(c));switch(c.index){
case 1057:return[mk(0,'d(A,r)=frac{5√2}{2}.',['d(A,r)=5.','d(A,r)=frac{5}{4}.','d(A,r)=5√2.'],['Dividir la norma del producto vectorial solo por 2 y omitir la raíz.','Dividir por la norma al cuadrado en lugar de la norma.','Olvidar el factor 2 del vector director BC.'],[
 ['Tomamos un vector director de la recta y el vector desde su punto B hasta A.','v=C−B=(−2,0,−2); BA=A−B=(−3,0,2)'],
 ['La altura del paralelogramo proporciona la distancia punto-recta.','d(A,r)=frac{|BA×v|}{|v|}'],
 ['Calculamos el producto vectorial por componentes.','BA×v=(0,−10,0); |BA×v|=10'],
 ['Calculamos la norma del director y simplificamos el cociente.','|v|=√8=2√2; d=frac{10}{2√2}=frac{5√2}{2}'],
 ['Verificamos de forma independiente mediante la proyección ortogonal.','H=B+t·v; t=frac{BA·v}{|v|²}=frac{2}{8}=frac{1}{4}; H=(frac{3}{2},1,frac{1}{2})'],
 ['La diferencia es perpendicular a v y su norma reproduce la distancia.','(A−H)·v=0; |A−H|²=frac{25}{4}+frac{25}{4}=frac{25}{2} ⇒ |A−H|=frac{5√2}{2}'],
 ]),mk(1,'Área=5.',['Área=10.','Área=frac{5}{2}.','Área=5√2.'],['Dar el área del paralelogramo sin dividir por dos.','Dividir dos veces por dos.','Multiplicar una altura sin el factor de racionalización correcto.'],[
 ['El área del triángulo es la mitad del área del paralelogramo determinado por dos lados.','S=frac{1}{2}|AB×AC|'],
 ['Calculamos los dos lados con origen común en A.','AB=(3,0,−2); AC=(1,0,−4)'],
 ['Desarrollamos el producto vectorial.','AB×AC=(0,(−2)·1−3·(−4),0)=(0,10,0)'],
 ['Tomamos su norma y aplicamos el factor del triángulo.','S=frac{1}{2}√(0²+10²+0²)=5'],
 ['Comprobamos usando la base BC y la altura del apartado anterior.','S=frac{1}{2}|BC|·d(A,r)=frac{1}{2}·2√2·frac{5√2}{2}'],
 ['Los dos procedimientos coinciden y el área es positiva.','S=5'],
 ])];
case 1059:return[mk(0,'Base=6√2 cm; altura=3√2 cm.',['Base=3√2 cm; altura=3√2 cm.','Base=6 cm; altura=3√3 cm.','Base=6√3 cm; altura=3 cm.'],['Confundir la semibase con la base completa del rectángulo.','Elegir semibase igual a la mitad del radio sin optimizar.','Elegir altura igual a la mitad del radio sin optimizar.'],[
 ['Situamos el centro en el origen; la semibase x y altura y del rectángulo satisfacen la circunferencia.','x²+y²=36; 0≤x≤6; y=√(36−x²); base=2x'],
 ['Expresamos el área con una sola variable. Los extremos degenerados sirven para comprobar el máximo global.','S(x)=2x√(36−x²); S(0)=S(6)=0'],
 ['Derivamos con las reglas de producto y cadena en el interior del intervalo.','S′(x)=2√(36−x²)−frac{2x²}{√(36−x²)}=frac{72−4x²}{√(36−x²)}'],
 ['El denominador es positivo; el numerador determina crecimiento y decrecimiento.','S′=0 ⇔ x=3√2; S′>0 si 0<x<3√2; S′<0 si 3√2<x<6'],
 ['Recuperamos las longitudes completas y el área máxima.','base=2x=6√2 cm; y=√18=3√2 cm; S=36 cm²'],
 ['Verificación independiente: la desigualdad (x−y)²≥0 impone una cota alcanzada exactamente por nuestra elección.','S=2xy≤x²+y²=36; igualdad ⇔ x=y=3√2'],
 ])];
case 1060:return[mk(0,'∫_{1}^{3}|x²−3x+2|dx=1.',['∫_{1}^{3}|x²−3x+2|dx=frac{2}{3}.','∫_{1}^{3}|x²−3x+2|dx=−frac{2}{3}.','∫_{1}^{3}|x²−3x+2|dx=frac{1}{3}.'],['Integrar el polinomio sin cambiar su signo negativo entre 1 y 2.','Negar la integral completa en lugar de separar intervalos.','Duplicar la primera región suponiendo una simetría inexistente.'],[
 ['Factorizamos para localizar todos los cambios de signo dentro del intervalo.','x²−3x+2=(x−1)(x−2); raíces: 1 y 2'],
 ['Entre 1 y 2 el producto es negativo y entre 2 y 3 es positivo.','I=−∫_{1}^{2}(x²−3x+2)dx+∫_{2}^{3}(x²−3x+2)dx'],
 ['Integramos el polinomio y comprobamos la primitiva por derivación.','F(x)=frac{x³}{3}−frac{3x²}{2}+2x; F′=x²−3x+2'],
 ['Evaluamos los extremos exactos antes de realizar las diferencias.','F(1)=frac{5}{6}; F(2)=frac{2}{3}; F(3)=frac{3}{2}'],
 ['Sumamos las dos contribuciones positivas del valor absoluto.','I=frac{5}{6}−frac{2}{3}+frac{3}{2}−frac{2}{3}=frac{1}{6}+frac{5}{6}=1'],
 ['Comprobación independiente: la cuadratura de Simpson es exacta para cada tramo cuadrático.','I₁=frac{1}{6}(0+4·frac{1}{4}+0)=frac{1}{6}; I₂=frac{1}{6}(0+4·frac{3}{4}+2)=frac{5}{6}'],
 ])];
case 1062:return[mk(0,'a=−1, b=0.',['a=1, b=0.','a=−1, b=1.','a=0, b=0.'],['Perder el signo del denominador al evaluar la derivada izquierda.','Asignar ln(1)=1 en vez de 0 al imponer continuidad.','Imponer continuidad sin imponer igualdad de derivadas.'],[
 ['Cada rama es derivable en su intervalo: el único punto de unión que debemos estudiar es cero.','f(0)=frac{b}{−1}=−b; límite derecho=ln(1)=0'],
 ['La derivabilidad exige primero continuidad.','−b=0 ⇒ b=0'],
 ['Derivamos la rama racional mediante la regla del cociente, conservando el denominador.','f′ izquierda(x)=frac{a(x−1)−(ax+b)}{(x−1)²}=frac{−a−b}{(x−1)²}'],
 ['Derivamos la rama logarítmica y comparamos los valores laterales.','f′ izquierda(0)=−a−b; f′ derecha(0)=1'],
 ['Usamos b=0 para determinar a.','−a=1 ⇒ a=−1'],
 ['Comprobamos con el cociente incremental de la función resultante, no solo con las fórmulas derivadas.','frac{f(h)−f(0)}{h}=frac{−1}{h−1}→1 si h<0; frac{ln(1+h)}{h}→1 si h>0'],
 ]),mk(1,'Tangente: y=ln(3)+frac{x−2}{3}; normal: y=ln(3)−3(x−2).',['Tangente: y=ln(3)+3(x−2); normal: y=ln(3)−frac{x−2}{3}.','Tangente: y=ln(3)+frac{x−2}{3}; normal: y=ln(3)+3(x−2).','Tangente: y=ln(3)+frac{x}{3}; normal: y=ln(3)−3x.'],['Invertir la pendiente de la tangente.','Olvidar el signo negativo en la pendiente de la normal.','Omitir el desplazamiento por la abscisa del punto de contacto.'],[
 ['La abscisa dos pertenece a la rama logarítmica, independientemente de la expresión de la otra rama.','f(2)=ln(3); P=(2,ln(3))'],
 ['La pendiente tangente es la derivada en ese punto.','f′(x)=frac{1}{1+x}; m tangente=frac{1}{3}'],
 ['Aplicamos la ecuación punto-pendiente para la tangente.','y−ln(3)=frac{1}{3}(x−2)'],
 ['La normal es perpendicular a la tangente; su pendiente es la opuesta de la inversa.','m normal=−frac{1}{1/3}=−3'],
 ['Construimos la normal por el mismo punto.','y−ln(3)=−3(x−2)'],
 ['Comprobamos paso por P y perpendicularidad sin confundir la normal con otra tangente.','x=2 ⇒ y=ln(3) en ambas; (1,1/3)·(1,−3)=1−1=0'],
 ])];
case 1063:return[mk(0,'k=1.',['k=2.','k=−1.','k=0.'],['Imponer solo continuidad y no igualdad de derivadas.','Imponer solo la igualdad formal de derivadas sin continuidad.','Ignorar la restricción k≠0 y el denominador de la rama derecha.'],[
 ['Con k distinto de cero ambas ramas son derivables en sus intervalos; estudiamos la unión en uno.','f(1)=3−k; límite derecho=frac{2}{k}'],
 ['Imponemos continuidad multiplicando por el parámetro no nulo.','3−k=frac{2}{k} ⇒ k²−3k+2=0 ⇒ k∈{1,2}'],
 ['Calculamos las derivadas laterales de las ramas.','f′ izquierda(x)=−2kx; f′ derecha(x)=−frac{2}{kx²}'],
 ['En una unión continua deben coincidir esas derivadas.','−2k=−frac{2}{k} ⇒ k²=1 ⇒ k∈{−1,1}'],
 ['Intersectamos las dos condiciones; ninguna puede omitirse.','{1,2}∩{−1,1}={1}'],
 ['Verificamos continuidad y derivadas para el único candidato admitido.','k=1: f(1)=2=límite derecho; f′ izquierda(1)=−2=f′ derecha(1)'],
 ])];default:throw Error('Unknown distance/semicircle/gluing source');}}
export function buildDistanceSemicircleGluingBatch(id='batch-0469',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Planos y rectas':c.slot===3?'Integrales definidas y áreas':c.index===1059?'Aplicaciones de derivadas':'Derivadas';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.slot===3?'DEFINITE_INTEGRAL_WITH_INDEPENDENT_QUADRATURE':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDistanceSemicircleGluingBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0469-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0469.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

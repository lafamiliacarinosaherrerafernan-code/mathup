import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1046,'bcc0f5d10e7ba4afb5526c30934e6d5202e410eb02006f53611566d004cd16dc',1,'A.4','96acbfc2bfab15a4eee9fbb9f3757153cd645dfcb43f3ed9ec1af1f67a8c5265',0],
 [1048,'7eefda3ec50d664d578b46fd49633176a83def4261e486d587f82d657f9078e8',2,'B.1','ddf5f2f7088f53bd84d52feba52484cc35a8c53b07c41dc94194c314525c0ec9',0],
 [1049,'96fdec633441fe992d97edda8660bad8bbd44a7d78978f8a56264112791c65e3',2,'B.8','90d40a456011cd10e1cc12506f6e22bcf8cd1cdc30e998313826c8aada278e4f',0],
 [1051,'a7aef3a7a20bf486085bab45f78721b97e95ce8000d362fda65851d9ec3a7941',2,'B.3','516e1076b987f59f91c42fc608fc60539463d6c1bb0343b9e48fd71d65e00b05',0],
];
export const statements={
 1046:'Considera los puntos P(1,0,−1), Q(2,1,1) y la recta r dada por x−5=y=frac{z+2}{−2}.\na) Determina el punto simétrico de P respecto de r.\nb) Calcula el punto de r que equidista de P y Q.',
 1048:'Considera la función f:ℝ→ℝ definida por f(x)=(x−a)eˣ.\na) Determina a sabiendo que la función tiene un punto crítico en x=0.\nb) Para a=1, calcula los puntos de inflexión de la gráfica de f.',
 1049:'Considera los vectores ⃗u=(1,a,2) y ⃗v=(−2,1,a).\na) Calcula a para que ambos vectores formen un ángulo de frac{π}{3} radianes.\nb) Calcula a para que el vector (⃗u×⃗v)−⃗v sea ortogonal a ⃗u.',
 1051:'Considera el sistema de ecuaciones con tres incógnitas\nsystem{x−y=λ;2λy+λz=λ;−x−y+λz=0}\na) Clasifícalo según los distintos valores del parámetro λ.\nb) Resuélvelo para λ=0 y λ=−1.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_REFLECTION_ANGLE_COMPATIBLE_LAYOUT']]:[];
export const cases=[
 {index:1046,slot:4,literals:['P (1, 0, −1)','Q(2, 1, 1)','x−5 = y =']},
 {index:1048,slot:2,literals:['(x − a)ex','punto crítico en x = 0']},
 {index:1049,slot:4,literals:['(1, a, 2)','(−2, 1, a)','π/3']},
 {index:1051,slot:1,literals:['2λy + λz = λ','−x − y + λz = 0']},
];
export const line1046=t=>[5+t,t,-2-2*t];
export const system1051=l=>({A:[[1,-1,0],[0,2*l,l],[-1,-1,l]],b:[l,l,0]});
export const proof=c=>({1046:{foot:[4,-1,0],reflected:[7,-2,1],equidistant:[4.5,-.5,-1],squaredDistances:[12.5,12.5]},1048:{a:1,inflection:[-1,-2/Math.E],secondDerivative:'(x+1)*exp(x)'},1049:{angleParameter:3,orthogonalParameter:2/3,dot:'3*a-2',squaredNorm:'a*a+5'},1051:{determinantCoefficients:[0,2,2],singular:[0,-1],ranks:[[0,2,2],[-1,2,2]],generic:['lambda',0,1],zero:['0','0','t'],minusOne:['t-1','t','1-2*t']}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'INDEPENDENT_SUBSTITUTION_DOT_PRODUCTS_DERIVATIVES_AND_RANKS',proof(c));switch(c.index){
case 1046:return[mk(0,'P′=(7,−2,1).',['P′=(4,−1,0).','P′=(11,2,−7).','P′=(9,0,−3).'],['Confundir el pie de la perpendicular con el simétrico.','Cambiar el signo del parámetro del pie.','Reflejar respecto del punto base de r en vez de la recta.'],[
 ['Parametrizamos la recta e identificamos su dirección.','R(t)=(5+t,t,−2−2t); v=(1,1,−2)'],
 ['El pie H de la perpendicular pertenece a r y satisface PH perpendicular a v.','(P−R(t))·v=0'],
 ['Desarrollamos el producto escalar y obtenemos el parámetro del pie.','(−4−t,−t,1+2t)·(1,1,−2)=−6−6t=0 ⇒ t=−1'],
 ['Calculamos el pie y usamos que es el punto medio de P y de su simétrico.','H=(4,−1,0); P′=2H−P'],
 ['Operamos componente a componente.','P′=(8−1,−2−0,0−(−1))=(7,−2,1)'],
 ['Comprobamos independientemente punto medio, pertenencia a r y perpendicularidad.','(P+P′)/2=(4,−1,0)=R(−1); (P′−P)·v=(6,−2,2)·(1,1,−2)=0'],
 ]),mk(1,'T=(frac{9}{2},−frac{1}{2},−1).',['T=(frac{11}{2},frac{1}{2},−3).','T=(4,−1,0).','T=(5,0,−2).'],['Cambiar el signo al despejar el parámetro.','Usar el pie del apartado anterior sin comprobar equidistancia.','Elegir el punto base de r sin imponer las dos distancias.'],[
 ['Todo punto buscado tiene la parametrización de la recta.','T=(5+t,t,−2−2t)'],
 ['La equidistancia se expresa mediante cuadrados y permite cancelar |T|².','|T−P|²=|T−Q|² ⇒ 2T·(Q−P)=|Q|²−|P|²'],
 ['Calculamos los datos de la ecuación del plano mediador.','Q−P=(1,1,2); |Q|²−|P|²=6−2=4'],
 ['Sustituimos la recta en el plano y resolvemos.','T·(1,1,2)=1−2t=2 ⇒ t=−frac{1}{2}'],
 ['Evaluamos las coordenadas del punto.','T=(frac{9}{2},−frac{1}{2},−1)'],
 ['Verificamos ambas distancias por cálculo separado, además de la pertenencia a r.','|T−P|²=frac{49}{4}+frac{1}{4}=frac{25}{2}; |T−Q|²=frac{25}{4}+frac{9}{4}+4=frac{25}{2}'],
 ])];
case 1048:return[mk(0,'a=1.',['a=0.','a=−1.','a=2.'],['Anular la función en vez de la derivada.','Cambiar el signo de la condición 1−a=0.','Contar dos veces el término procedente de derivar x−a.'],[
 ['Un punto crítico interior de esta función derivable tiene derivada nula.','f′(0)=0'],
 ['Aplicamos la regla del producto, derivando sus dos factores.','f′(x)=1·eˣ+(x−a)eˣ'],
 ['Sacamos factor común para simplificar la condición.','f′(x)=(x−a+1)eˣ'],
 ['Evaluamos en el punto especificado por el examen.','f′(0)=(1−a)e⁰=1−a'],
 ['Resolvemos la ecuación que determina el parámetro.','1−a=0 ⇒ a=1'],
 ['Comprobamos en la derivada resultante; su signo cambia alrededor de cero.','f′(x)=xeˣ; f′(0)=0; f′<0 si x<0 y f′>0 si x>0'],
 ]),mk(1,'Único punto de inflexión: (−1,−frac{2}{e}).',['Único punto de inflexión: (0,−1).','Único punto de inflexión: (1,0).','Único punto de inflexión: (−1,frac{2}{e}).'],['Confundir el punto crítico con el de inflexión.','Anular la función en vez de la segunda derivada.','Perder el signo al evaluar x−1 en x=−1.'],[
 ['Fijamos el parámetro antes de estudiar la concavidad.','f(x)=(x−1)eˣ'],
 ['Derivamos una y dos veces mediante la regla del producto.','f′(x)=xeˣ; f″(x)=(x+1)eˣ'],
 ['La exponencial nunca se anula: la única candidata procede del factor lineal.','f″(x)=0 ⇔ x+1=0 ⇔ x=−1'],
 ['Verificamos un cambio real de concavidad, condición indispensable de inflexión.','f″<0 en (−∞,−1); f″>0 en (−1,+∞)'],
 ['Calculamos la ordenada usando la función, no su derivada.','f(−1)=(−1−1)e⁻¹=−frac{2}{e}'],
 ['No hay otras raíces de f″ ni discontinuidades en el dominio; comprobamos la coordenada.','I=(−1,−frac{2}{e}); f″(−1)=0; eˣ>0 para todo x∈ℝ'],
 ])];
case 1049:return[mk(0,'a=3.',['a=−3.','a=frac{2}{3}.','a=1.'],['Cambiar el signo del término lineal en la ecuación del coseno.','Imponer ortogonalidad en lugar del ángulo pedido.','Olvidar una componente al calcular las normas.'],[
 ['Relacionamos el ángulo con el producto escalar; ambos vectores son no nulos.','cos(π/3)=frac{u·v}{|u||v|}=frac{1}{2}'],
 ['Calculamos producto escalar y normas usando las tres componentes.','u·v=−2+a+2a=3a−2; |u|²=|v|²=a²+5'],
 ['El producto de las normas es positivo y se simplifica exactamente.','frac{3a−2}{a²+5}=frac{1}{2}'],
 ['Multiplicamos sin elevar al cuadrado, evitando raíces extrañas.','6a−4=a²+5 ⇒ a²−6a+9=0'],
 ['Factorizamos la ecuación del parámetro.','(a−3)²=0 ⇒ a=3'],
 ['Comprobamos el signo y el valor del coseno en los vectores originales.','u·v=7; |u||v|=14; cos θ=7/14=1/2 ⇒ θ=π/3'],
 ]),mk(1,'a=frac{2}{3}.',['a=−frac{2}{3}.','a=3.','a=2.'],['Cambiar el signo al resolver el producto escalar nulo.','Reutilizar el ángulo del apartado anterior.','Omitir la contribución 2a del tercer componente.'],[
 ['Para imponer ortogonalidad usamos el producto escalar con u.','((u×v)−v)·u=0'],
 ['El producto vectorial es perpendicular a cada factor, en particular a u.','(u×v)·u=0'],
 ['Distribuimos el producto escalar y simplificamos con esa propiedad.','((u×v)−v)·u=−v·u=−(3a−2)'],
 ['Resolvemos la ecuación lineal necesaria y suficiente.','−3a+2=0 ⇒ a=frac{2}{3}'],
 ['Comprobamos independientemente calculando el producto vectorial explícito.','u×v=(a²−2,−4−a,1+2a); (u×v)·u=(a²−2)+a(−4−a)+2(1+2a)=0'],
 ['Sustituimos el parámetro en el producto restante.','v·u=3·frac{2}{3}−2=0 ⇒ ((u×v)−v)·u=0'],
 ])];
case 1051:return[mk(0,'λ∉{0,−1}: SCD; λ=0 o λ=−1: SCI; no hay SI.',['λ∉{0,−1}: SCD; λ=0: SCI; λ=−1: SI.','λ∉{0,−1}: SCD; λ=0: SI; λ=−1: SCI.','λ∉{0,1}: SCD; λ=0 o λ=1: SCI; no hay SI.'],['Confundir la fila dependiente compatible de λ=−1 con una contradicción.','Tratar la fila nula de λ=0 como incompatible.','Cambiar el signo de la raíz singular no nula.'],[
 ['Aplicamos Rouché–Frobenius: comparamos rango de coeficientes y rango ampliado con tres incógnitas.','A=matrix{1,−1,0;0,2λ,λ;−1,−1,λ}; b=(λ,λ,0)'],
 ['Calculamos el determinante por la primera fila para localizar los valores singulares.','det A=(2λ²+λ)+λ=2λ(λ+1)'],
 ['Cuando no se anula el determinante, ambos rangos son tres.','λ∉{0,−1}: rg A=rg(A|b)=3 ⇒ SCD'],
 ['Para λ=0 la segunda ecuación es 0=0 y las otras dos son independientes.','system{x−y=0;−x−y=0}; menor=−2≠0; rg A=rg(A|b)=2 ⇒ SCI'],
 ['Para λ=−1 sumamos la primera ecuación a la tercera y obtenemos exactamente la segunda, incluido el término independiente.','system{x−y=−1;−2y−z=−1;−x−y−z=0}; F₃+F₁=F₂; menor de filas 1,2 y columnas x,y=−2'],
 ['El rango ampliado tampoco aumenta: quedan dos ecuaciones independientes y una incógnita libre.','λ=−1: rg A=rg(A|b)=2 ⇒ SCI; ningún λ produce rangos distintos'],
 ]),mk(1,'λ=0: (x,y,z)=(0,0,t); λ=−1: (x,y,z)=(t−1,t,1−2t), t∈ℝ.',['λ=0: (x,y,z)=(t,t,0); λ=−1: (x,y,z)=(t−1,t,1−2t), t∈ℝ.','λ=0: (x,y,z)=(0,0,t); λ=−1: (x,y,z)=(t+1,t,1−2t), t∈ℝ.','λ=0: (x,y,z)=(0,0,t); λ=−1: (x,y,z)=(t−1,t,1+2t), t∈ℝ.'],['Omitir la tercera ecuación cuando λ=0.','Cambiar el signo de λ en la primera ecuación.','Cambiar el signo al despejar z en la segunda ecuación.'],[
 ['Sustituimos λ=0 sin dividir por el parámetro.','x−y=0; 0=0; −x−y=0'],
 ['Sumando las dos ecuaciones no nulas resulta y=0 y entonces x=0; z es libre.','−2y=0 ⇒ (x,y,z)=(0,0,t), t∈ℝ'],
 ['Para λ=−1 escribimos las dos ecuaciones independientes acreditadas.','x−y=−1; −2y−z=−1'],
 ['Elegimos y=t y despejamos las otras dos incógnitas.','x=t−1; z=1−2t'],
 ['Comprobamos las tres ecuaciones originales para cualquier valor real de t.','(t−1)−t=−1; −2t−(1−2t)=−1; −(t−1)−t−(1−2t)=0'],
 ['Para λ=0 también la sustitución es válida para todo t, y cada familia tiene una sola libertad, conforme a rango dos.','0−0=0; 0·0+0·t=0; −0−0+0·t=0'],
 ])];
default:throw Error('Unknown reflection/angle/compatible source');}}
export function buildReflectionAngleCompatibleBatch(id='batch-0468',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Planos y rectas':c.slot===1?'Sistemas con determinantes':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.slot===1?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildReflectionAngleCompatibleBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0468-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0468.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

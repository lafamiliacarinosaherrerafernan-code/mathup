import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[117,'a236b382afd7ddbc35f4e83791a322bcf96c07c5859fa715a0b6e74f5e2921e1',2,'B.3','a309106149fe960b34b2578dd84add0b083b019fbebce2fd7e15eec6414c043b',0],
[136,'58876c8435308697c784c8326eba10d1b8b9696efc401c51bf3386c90eba4643',1,'A.3','d97704b869dc35db191ac2562f82cbca004bb15fc6ed09e2fbb413d5e4ee5eb1',0],
[140,'280faba61b350012aff8fac9e612d9e50230e298431f9b0a7bb50bb626f4ff94',1,'2','bec1ac18c3ac4538d5549d136b727f109121d1ff73af9db93e7bf0d18f3d8ec7',0],
[143,'95771746eae60ab5a61f193ea7de9fe116e865cd0c5989fdcc4b32368976ce77',1,'2','721023997cd71bf8d694e6a8b50e96369ce5b586e4e435e125a015f80031b18d',0],
[145,'e57bc2d094c8120f546b4dd3c69e3372e9fcc93f38875e052f536867901cc5be',1,'A.2','8c3a95b0771d3436c61fd5c80bb229137dfd32bcc31504d8b46af880864c8624',0],
];
export const statements={
117:'Considera la matriz A=[[1,0,λ+1],[λ,1,−1],[0,0,1]].\na) [1,5 puntos] Determina, si existen, los valores de λ para los que A^{−1}=2I−A (siendo I la matriz identidad de orden 3).\nb) [1 punto] Determina, si existen, los valores de λ para los que la matriz A+A^T no tiene inversa (A^T es la matriz traspuesta de A).',
136:'a) [1,75 puntos] Discute, según los valores del parámetro λ, el siguiente sistema de ecuaciones\nsystem{−x+λy+z=λ;λx+2y+(λ+2)z=4;x+3y+2z=6−λ}\nb) [0,75 puntos] Resuelve el sistema anterior para λ=0.',
140:'Un náufrago se encuentra en una isla situada en el punto de coordenadas (2;0) de un plano. Se sabe que un ferry navega en el mismo plano siempre en la trayectoria dada por la gráfica de la función f(x)=√(x+1). ¿Hacia qué punto de la trayectoria debe nadar el náufrago para recorrer la menor distancia posible? Calcula dicha distancia.',
143:'Considera la función f:ℝ→ℝ definida por f(t)=frac{1}{1+e^t}.\na) Calcula ∫f(t)dt (Sugerencia: efectúa el cambio de variable x=1+e^t). (1,5 puntos)\nb) Se define g(x)=∫_0^x f(t)dt. Calcula lim_{x→0}frac{g(x)}{x}. (1 punto)',
145:'[2,5 puntos] Calcula ∫_0^3 frac{1}{1+root{3}{x}}dx (sugerencia t=root{3}{x}).',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_MATRIX_PRIMITIVE_SOURCE_LAYOUT']]:[];
export const cases=[{index:117,literals:['Considera la matriz','2I − A'],topic:'Matrices'},{index:136,literals:['λx + 2y','λ = 0'],topic:'Sistemas con determinantes'},{index:140,literals:['náufrago','menor distancia'],topic:'Derivadas',whole:true},{index:143,literals:['Sugerencia','g(x)'],topic:'Integrales indefinidas'},{index:145,literals:['Calcula','1+ x'],topic:'Integrales definidas y áreas',whole:true}];
export const matrix=l=>[[1,0,l+1],[l,1,-1],[0,0,1]],system=l=>({A:[[-1,l,1],[l,2,l+2],[1,3,2]],b:[l,4,6-l]});
export const primitive=t=>t-Math.log1p(Math.exp(t)),cubePrimitive=t=>1.5*t*t-3*t+3*Math.log1p(t);
export function proof(c){switch(c.index){case 117:return{determinant:1,inverseIdentityParameters:[0,-1],symmetricDeterminantCoefficients:[4,-6,-6],singularParameters:[(-3-Math.sqrt(33))/6,(-3+Math.sqrt(33))/6]};case 136:return{determinantCoefficients:[0,8,-1],regularExcept:[0,8],infiniteAt:0,incompatibleAt:8,zeroSolution:['t','2-t','t']};case 140:return{domain:'x≥−1',minimumX:1.5,minimumY:Math.sqrt(2.5),distanceSquared:11/4,completedSquare:'(x−3/2)²+11/4'};case 143:return{primitive:'t−ln(1+e^t)',derivative:'1/(1+e^t)',limit:.5,FTC:true};case 145:return{substitution:'t=cuberoot(x)',upper:Math.cbrt(3),lower:0,result:cubePrimitive(Math.cbrt(3)),polynomialDivision:[1,-1,1]};default:throw Error('Unknown');}}
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_MATRIX_PRIMITIVE_INDEPENDENT_CHECK',proof(c));switch(c.index){
case 117:return[mk(0,'λ=0 o λ=−1.',['λ=0 o λ=1.','Solo λ=0.','Todos los valores reales de λ.'],['Cambiar el signo al resolver λ+1=0.','Perder una raíz del producto.','Confundir invertibilidad con la identidad adicional solicitada.'],[
['Calculamos el determinante para justificar que la inversa existe para cualquier parámetro.','det(A)=1·1·1=1≠0'],
['Multiplicamos la identidad pedida por A y trasladamos todos los términos.','A^{−1}=2I−A ⇔ I=2A−A² ⇔ (A−I)²=O'],
['Restamos la identidad, lo que simplifica notablemente el producto.','N=A−I=[[0,0,λ+1],[λ,0,−1],[0,0,0]]'],
['Multiplicamos filas por columnas; solo una entrada puede no ser cero.','N²=[[0,0,0],[0,0,λ(λ+1)],[0,0,0]]'],
['Igualamos esa entrada a cero y conservamos las dos raíces.','λ(λ+1)=0 ⇒ λ=0 o λ=−1'],
['Comprobamos la suficiencia: en ambos casos N²=O y el producto con 2I−A es la identidad.','A(2I−A)=I−N²=I; (2I−A)A=I'],
]),mk(1,'λ=frac{−3−√(33)}{6} o λ=frac{−3+√(33)}{6}.',['λ=frac{3−√(33)}{6} o λ=frac{3+√(33)}{6}.','λ=frac{−3−√(33)}{3} o λ=frac{−3+√(33)}{3}.','λ=0 o λ=−1.'],['Cambiar el signo del coeficiente lineal al aplicar la fórmula.','Olvidar el factor dos del denominador de la fórmula cuadrática.','Reutilizar los parámetros del apartado anterior para otra matriz.'],[
['Escribimos la suma con la traspuesta sin confundirla con A².','S=A+A^T=[[2,λ,λ+1],[λ,2,−1],[λ+1,−1,2]]'],
['Una matriz cuadrada no tiene inversa exactamente cuando su determinante se anula.','det(S)=0'],
['Desarrollamos por la primera fila.','det(S)=2(4−1)−λ(2λ+λ+1)+(λ+1)(−λ−2(λ+1))'],
['Simplificamos los términos y reducimos la ecuación cuadrática.','det(S)=4−6λ²−6λ=−2(3λ²+3λ−2)'],
['Aplicamos la fórmula de segundo grado; el discriminante es positivo.','Δ=9+24=33; λ=frac{−3±√(33)}{6}'],
['Comprobamos la factorización por las relaciones entre raíces.','λ₁+λ₂=−1; λ₁λ₂=−frac{2}{3}; 3(λ−λ₁)(λ−λ₂)=3λ²+3λ−2'],
])];
case 136:return[mk(0,'λ≠0,8: compatible determinado; λ=0: compatible indeterminado; λ=8: incompatible.',['λ≠0,8: compatible determinado; λ=0: incompatible; λ=8: compatible indeterminado.','λ≠0,8: compatible determinado; λ=0 o λ=8: incompatible.','λ≠0,−8: compatible determinado; λ=0: compatible indeterminado; λ=−8: incompatible.'],['Intercambiar las compatibilidades excepcionales.','Suponer que todo determinante nulo implica incompatibilidad.','Cambiar el signo de la raíz no nula del determinante.'],[
['Formamos la matriz de coeficientes y la columna independiente.','A=[[-1,λ,1],[λ,2,λ+2],[1,3,2]]; b=(λ;4;6−λ)'],
['Desarrollamos el determinante y localizamos los valores excepcionales.','det(A)=3λ+2−λ(λ−2)+3λ−2=λ(8−λ)'],
['Si el determinante es distinto de cero, los rangos son tres y la solución es única.','λ≠0,8 ⇒ rg(A)=rg(A|b)=3'],
['Para λ=0 el menor superior izquierdo vale −2; la tercera fila completa depende de las dos primeras.','F₃=−F₁+frac{3}{2}F₂; 6=−0+frac{3}{2}·4 ⇒ rg(A)=rg(A|b)=2'],
['Para λ=8 el mismo menor vale −66, pero la dependencia de coeficientes no se cumple en la columna independiente.','F₃=frac{1}{3}F₁+frac{1}{6}F₂ en A; −2≠frac{8}{3}+frac{4}{6}=frac{10}{3}'],
['Aplicamos Rouché–Frobenius a los casos excepcionales.','λ=0: dos rangos iguales a 2<3 ⇒ infinitas soluciones; λ=8: rg(A)=2<rg(A|b)=3 ⇒ ninguna solución'],
]),mk(1,'(x;y;z)=(t;2−t;t), t∈ℝ.',['(x;y;z)=(t;2+t;t), t∈ℝ.','(x;y;z)=(−t;2−t;t), t∈ℝ.','(x;y;z)=(t;4−t;t), t∈ℝ.'],['Cambiar el signo al despejar y.','Cambiar el signo en −x+z=0.','No dividir la segunda ecuación entre dos.'],[
['Sustituimos λ=0 en las tres ecuaciones originales.','system{−x+z=0;2y+2z=4;x+3y+2z=6}'],
['La primera ecuación permite expresar x en función de z.','x=z'],
['La segunda determina y; dejamos z libre porque el rango es dos.','y+z=2 ⇒ z=t, y=2−t'],
['Recuperamos las tres coordenadas de la familia completa.','(x;y;z)=(t;2−t;t), t∈ℝ'],
['La tercera ecuación debe quedar satisfecha para cualquier parámetro.','t+3(2−t)+2t=6'],
['Comprobamos también las dos primeras para asegurar que no hemos perdido ninguna condición.','−t+t=0; 2(2−t)+2t=4'],
])];
case 140:return[mk(0,'P=(frac{3}{2};frac{√(10)}{2}); distancia=frac{√(11)}{2}.',['P=(2;√(3)); distancia=√(3).','P=(frac{3}{2};frac{√(10)}{2}); distancia=frac{11}{4}.','P=(−1;0); distancia=3.'],['Elegir el punto verticalmente alineado sin minimizar la distancia.','Dar el cuadrado de la distancia en vez de la distancia.','Suponer que el extremo del dominio es el mínimo global.'],[
['Parametrizamos la trayectoria y establecemos su dominio real.','P(x)=(x;√(x+1)), x≥−1; N=(2;0)'],
['Aplicamos la distancia euclídea y minimizamos su cuadrado, pues la raíz es creciente.','D(x)=d²=(x−2)²+(√(x+1))²=x²−3x+5'],
['Derivamos y calculamos el único punto crítico dentro del dominio.','D′(x)=2x−3=0 ⇒ x=frac{3}{2}≥−1'],
['La segunda derivada positiva y la forma cuadrática garantizan un mínimo global.','D″(x)=2>0; D(x)=(x−frac{3}{2})²+frac{11}{4}'],
['Sustituimos para obtener el punto y la distancia mínima solicitados.','P=(frac{3}{2};√(frac{5}{2}))=(frac{3}{2};frac{√(10)}{2}); d=frac{√(11)}{2}'],
['Comprobamos directamente la distancia y el extremo del dominio.','d²=(−frac{1}{2})²+(frac{√(10)}{2})²=frac{11}{4}; D(−1)=9>frac{11}{4}'],
])];
case 143:return[mk(0,'∫f(t)dt=t−ln(1+e^t)+C.',['∫f(t)dt=t+ln(1+e^t)+C.','∫f(t)dt=−t+ln(1+e^t)+C.','∫f(t)dt=ln(1+e^t)+C.'],['Cambiar el signo de la segunda fracción simple.','Invertir el signo de toda la primitiva.','Omitir la parte lineal al deshacer el cambio.'],[
['Aplicamos el cambio sugerido, transformando también el diferencial.','x=1+e^t>1; dx=e^t dt=(x−1)dt; dt=frac{dx}{x−1}'],
['La integral se convierte en una función racional.','∫frac{dt}{1+e^t}=∫frac{dx}{x(x−1)}'],
['Descomponemos en fracciones simples e igualamos coeficientes.','frac{1}{x(x−1)}=frac{A}{x}+frac{B}{x−1}; 1=A(x−1)+Bx ⇒ A=−1, B=1'],
['Integramos teniendo en cuenta x>1.','F=−ln(x)+ln(x−1)+C'],
['Volvemos a la variable original y simplificamos ln(e^t)=t.','F(t)=−ln(1+e^t)+t+C'],
['Verificamos derivando la expresión obtenida.','F′(t)=1−frac{e^t}{1+e^t}=frac{1}{1+e^t}=f(t)'],
]),mk(1,'Límite=frac{1}{2}.',['Límite=1.','Límite=0.','Límite=−frac{1}{2}.'],['Omitir el uno adicional del denominador de f(0).','Confundir el valor g(0) con el límite del cociente.','Invertir la orientación de la integral.'],[
['La función f es continua en toda la recta porque su denominador siempre es positivo.','1+e^t>0'],
['La integral con extremos iguales es cero; el cociente presenta 0/0.','g(0)=∫_0^0 f(t)dt=0'],
['El teorema fundamental del cálculo proporciona la derivada de g.','g′(x)=f(x)=frac{1}{1+e^x}'],
['El límite pedido es, por definición, la derivada de g en cero.','lim_{x→0}frac{g(x)}{x}=lim_{x→0}frac{g(x)−g(0)}{x−0}=g′(0)'],
['Sustituimos el valor de la función integranda.','g′(0)=frac{1}{1+e⁰}=frac{1}{2}'],
['La primitiva del apartado anterior permite una comprobación independiente por expansión.','g(x)=x−ln(1+e^x)+ln(2)=frac{x}{2}+O(x²); g(x)/x→frac{1}{2}'],
])];
case 145:return[mk(0,'I=frac{3}{2}root{3}{9}−3root{3}{3}+3ln(1+root{3}{3}).',['I=frac{1}{2}root{3}{9}−root{3}{3}+ln(1+root{3}{3}).','I=frac{3}{2}root{3}{9}−3root{3}{3}−3ln(1+root{3}{3}).','I=frac{3}{2}·9−9+3ln(4).'],['Omitir el factor tres del diferencial.','Cambiar el signo del resto de la división.','Mantener el extremo superior tres después del cambio de variable.'],[
['Aplicamos el cambio sugerido y transformamos los límites y el diferencial.','t=root{3}{x}; x=t³; dx=3t²dt; x=0⇒t=0; x=3⇒t=root{3}{3}'],
['Sustituimos en la integral definida.','I=3∫_0^{root{3}{3}}frac{t²}{1+t}dt'],
['Dividimos polinomios para separar una parte inmediata y una logarítmica.','frac{t²}{1+t}=t−1+frac{1}{1+t}; (1+t)(t−1)+1=t²'],
['Integramos la expresión transformada, válida para t≥0.','H(t)=frac{3}{2}t²−3t+3ln(1+t)'],
['Aplicamos la regla de Barrow con los extremos transformados; H(0)=0.','I=H(root{3}{3})−H(0)=frac{3}{2}root{3}{9}−3root{3}{3}+3ln(1+root{3}{3})'],
['Comprobamos por derivación la primitiva y la identidad algebraica empleada.','H′(t)=3t−3+frac{3}{1+t}=frac{3t²}{1+t}; I>0'],
])];default:throw Error('No solution');}}
export function buildMatrixPrimitiveBatch(id='batch-0384',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===143?['Límites y asíntotas']:[];x.block=c.index===117||c.index===136?'Álgebra':'Análisis';x.examSlot=c.index===117||c.index===136?1:c.index===140?2:3;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===117?'MATRIX_DETERMINANT_IDENTITIES':c.index===136?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':c.index===140?'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE':c.index===145?'DEFINITE_SUBSTITUTION_WITH_INDEPENDENT_QUADRATURE':'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatrixPrimitiveBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0384-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0384.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

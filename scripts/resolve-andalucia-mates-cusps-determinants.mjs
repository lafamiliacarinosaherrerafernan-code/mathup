import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
const allObservedPages=[
[385,'0fa1c3912eac6e5af10e80bbdfd579032d29e008b33880c6bd4e8f86334d9db6',2,'B.1','4fbd959601a729b2eb43ec7293141ce3f19d6387342102372bc07487dcf863a9',0],
[387,'a7aef3a7a20bf486085bab45f78721b97e95ce8000d362fda65851d9ec3a7941',1,'A.2','6919f249fb23b500129821d59188f228f64c9926b99f42aaf012d50188b373b2',0],
[399,'5feecf28b9fa5a5f948bccfd561e04d39ec91c87e40f27baca54281076136f87',1,'A.3','2c18d0fa99079e4fa633fb2cc7637b4df55dc19dafdaf6b9f5acf289f429480e',0],
[416,'e6356a504a4c1346274193aeafd23fff6f5df37695b3de420a0604e5b166eae0',2,'B.3','4991b8efa994faedfc8afba96057722ebcd885efd16f8c22871352a50d45c98f',0],
[426,'85a6693892f29847142a74b342f143d4d263e44abb0bbce055536058043080eb',1,'A.4','ca158e5a5d523e3b0504c26e32c8898e9ffa0e156bb3e21bfd369593ddff85b9',0]];
export const statements={
385:'Sea f:ℝ→ℝ la función definida por f(x)=x²−|x|.\na) Estudia la derivabilidad de f.\nb) Determina los intervalos de crecimiento y de decrecimiento de f.\nc) Calcula los extremos relativos de f (abscisas donde se obtienen y valores que se alcanzan).',
387:'Sea I=∫_{0}^{1} frac{x}{1+√(1−x)} dx.\na) Expresa la integral I aplicando el cambio de variable t=√(1−x).\nb) Calcula el valor de I.',
399:'Dadas las matrices\nA=[[α,1,−1],[1,α,−1],[−1,−1,α]] y B=[[0],[1],[1]].\na) Calcula el rango de A dependiendo de los valores de α.\nb) Para α=2, resuelve la ecuación matricial AX=B.',
416:'Sabiendo que el determinante de la matriz\nA=[[x,y,z],[1,0,1],[1,2,3]]\nes 2, calcula los siguientes determinantes indicando, en cada caso, las propiedades que utilices:\na) det(3A).\nb) det(A⁻¹).\nc) det([[3,0,1],[3x,2y,z],[3,4,3]]).\nd) det([[1,2,3],[x+2,y+4,z+6],[−1,0,−1]]).',
426:'Dados los puntos A(1,0,0), B(0,0,1) y P(1,−1,1), y la recta r definida por\nsystem{x−y−2=0;z=0}.\na) Halla los puntos de la recta r cuya distancia al punto P es de 3 unidades.\nb) Calcula el área del triángulo ABP.'};
export const observations=allObservedPages.filter(o=>o[0]!==426);
export const replacements=r=>r.queueIndex!==426&&statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CUSPS_DETERMINANTS_SOURCE_LAYOUT']]:[];
export const cases=[{index:385,slot:2,literals:['x2 − |x|','derivabilidad']},{index:387,slot:3,literals:['Sea  I=','Calcula el valor de I.']},{index:399,slot:1,literals:['rango de A','AX = B']},{index:416,slot:1,literals:['det(3A)','det(A−1)']}];
export const proof=c=>({385:{leftSlope:1,rightSlope:-1,minima:[[-.5,-.25],[.5,-.25]],maximum:[0,0]},387:{transformed:[0,2,-2],value:1/3},399:{determinantPolynomial:[2,-3,0,1],exceptionalRanks:[[1,1],[-2,2]],solution:[0,1,1]},416:{determinant:2,answers:[54,.5,-12,-2]},426:{points:[[3,1,0],[-1,-3,0]],cross:[1,1,1],area:Math.sqrt(3)/2}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_ALGEBRA_CALCULUS_OR_METRIC_CHECK',proof(c));switch(c.index){
case 385:return[mk(0,'Derivable en ℝ excepto en x=0; f′(0⁻)=1 y f′(0⁺)=−1.',['Derivable en todo ℝ, con f′(0)=0.','Derivable en ℝ excepto en x=0; f′(0⁻)=−1 y f′(0⁺)=1.','No derivable en x=−frac{1}{2} ni en x=frac{1}{2}; sí en x=0.'],['Derivar el valor absoluto como si fuera una potencia suave.','Intercambiar las ramas del valor absoluto.','Confundir los ceros de la derivada con puntos no derivables.'],[
['Separamos el valor absoluto según el signo de x. Fuera de cero cada rama es un polinomio.','f(x)=x²+x si x<0; f(x)=x²−x si x≥0'],
['Comprobamos la continuidad en el único punto de unión antes de estudiar las pendientes.','f(0)=0; lim_{x→0⁻}f(x)=lim_{x→0⁺}f(x)=0'],
['Calculamos directamente el cociente incremental por la izquierda.','frac{f(h)−f(0)}{h}=h+1 si h<0 ⇒ f′(0⁻)=1'],
['Calculamos el mismo cociente por la derecha, donde cambia el signo del término lineal.','frac{f(h)−f(0)}{h}=h−1 si h>0 ⇒ f′(0⁺)=−1'],
['Las derivadas laterales son distintas: la continuidad no basta para asegurar derivabilidad.','1≠−1 ⇒ f no es derivable en x=0'],
['En los demás puntos derivamos la rama polinómica correspondiente. Esto verifica que no hay otras excepciones.','f′(x)=2x+1 si x<0; f′(x)=2x−1 si x>0'],
]),mk(1,'Crece en (−frac{1}{2},0) y (frac{1}{2},+∞); decrece en (−∞,−frac{1}{2}) y (0,frac{1}{2}).',['Crece en (−∞,−frac{1}{2}) y (0,frac{1}{2}); decrece en (−frac{1}{2},0) y (frac{1}{2},+∞).','Crece en (0,+∞); decrece en (−∞,0).','Crece en (−frac{1}{2},frac{1}{2}); decrece en (−∞,−frac{1}{2}) y (frac{1}{2},+∞).'],['Invertir el signo de la derivada.','Omitir el término lineal de cada rama.','Unir intervalos a través del punto angular e invertir el último signo.'],[
['Usamos la derivada adecuada en cada semieje y conservamos cero como separación.','f′(x)=2x+1 para x<0; f′(x)=2x−1 para x>0'],
['Resolvemos los ceros de la derivada y comprobamos que cada uno pertenece a su rama.','2x+1=0 ⇒ x=−frac{1}{2}; 2x−1=0 ⇒ x=frac{1}{2}'],
['A la izquierda de −1/2 la primera expresión es negativa; entre −1/2 y cero es positiva.','2x+1<0 si x<−frac{1}{2}; 2x+1>0 si −frac{1}{2}<x<0'],
['En el semieje positivo aplicamos la segunda expresión.','2x−1<0 si 0<x<frac{1}{2}; 2x−1>0 si x>frac{1}{2}'],
['Traducimos los signos a monotonía. La función es continua, pero en cero cambia de creciente a decreciente.','Signos de f′ por intervalos ordenados: −, +, −, +'],
['Comprobamos un punto en cada intervalo sin usar los ceros como sustituto del estudio de signos.','f′(−1)=−1; f′(−frac{1}{4})=frac{1}{2}; f′(frac{1}{4})=−frac{1}{2}; f′(1)=1'],
]),mk(2,'Mínimos en x=±frac{1}{2}, con f=−frac{1}{4}; máximo en x=0, con f=0.',['Mínimos en x=±frac{1}{2}, con f=frac{1}{4}; máximo en x=0, con f=0.','Mínimos en x=±frac{1}{2}, con f=−frac{1}{4}; ningún máximo relativo.','Máximos en x=±frac{1}{2}, con f=−frac{1}{4}; mínimo en x=0, con f=0.'],['Olvidar restar el valor absoluto al evaluar la función.','Buscar extremos únicamente donde la derivada existe y se anula.','Invertir la interpretación del cambio de signo.'],[
['Los candidatos son los dos ceros de la derivada y el punto angular de la función continua.','x=−frac{1}{2}, x=0, x=frac{1}{2}'],
['En −1/2 la derivada pasa de negativa a positiva; por ello hay un mínimo.','f(−frac{1}{2})=frac{1}{4}−frac{1}{2}=−frac{1}{4}'],
['En 1/2 ocurre el mismo cambio de decrecimiento a crecimiento.','f(frac{1}{2})=frac{1}{4}−frac{1}{2}=−frac{1}{4}'],
['En cero la función pasa de creciente a decreciente. Un extremo puede existir aunque no exista derivada.','f(0)=0 ⇒ máximo relativo en (0,0)'],
['No hay más cambios de monotonía ni puntos no derivables. Los tres extremos anteriores agotan las posibilidades.','f′: −, +, −, + en los cuatro intervalos determinados'],
['Verificamos los mínimos completando el cuadrado y el máximo comparando valores próximos a cero.','f(x)=(|x|−frac{1}{2})²−frac{1}{4}; 0<|x|<1 ⇒ f(x)<f(0)'],
])];
case 387:return[mk(0,'I=∫_{0}^{1} 2t(1−t) dt.',['I=∫_{0}^{1} 2t(1+t) dt.','I=∫_{0}^{1} t(1−t) dt.','I=∫_{0}^{1} −2t(1−t) dt.'],['Factorizar 1−t² con signo incorrecto.','Perder el factor dos del diferencial.','No invertir los límites al eliminar el signo negativo.'],[
['El cambio solicitado despeja x de manera unívoca en el intervalo de integración.','t=√(1−x) ⇒ x=1−t²'],
['Derivamos para transformar también el diferencial, no solamente el integrando.','dx=−2t dt'],
['Transformamos ambos límites y comprobamos el denominador.','x=0 ⇒ t=1; x=1 ⇒ t=0; 1+√(1−x)=1+t'],
['Sustituimos todos los elementos y factorizamos el numerador.','I=∫_{1}^{0} frac{(1−t²)(−2t)}{1+t} dt; 1−t²=(1−t)(1+t)'],
['En 0≤t≤1, el factor 1+t no se anula. Simplificamos e invertimos los límites.','I=∫_{1}^{0} −2t(1−t) dt = ∫_{0}^{1} 2t(1−t) dt'],
['Verificamos el signo: el integrando original es no negativo y el nuevo también. La transformación conserva la orientación.','2t(1−t)≥0 para 0≤t≤1'],
]),mk(1,'I=frac{1}{3}.',['I=frac{5}{3}.','I=frac{1}{6}.','I=−frac{1}{3}.'],['Usar 1+t en lugar de 1−t después del cambio.','Omitir el factor dos del diferencial.','Conservar erróneamente el signo negativo del cambio.'],[
['Partimos de la integral polinómica obtenida con los límites ya ordenados.','I=∫_{0}^{1} (2t−2t²) dt'],
['Integramos cada potencia y distinguimos la primitiva del valor de la integral definida.','H(t)=t²−frac{2t³}{3}; H′(t)=2t−2t²'],
['Evaluamos la primitiva en el extremo superior.','H(1)=1−frac{2}{3}=frac{1}{3}'],
['Evaluamos el extremo inferior y aplicamos la regla de Barrow.','I=H(1)−H(0)=frac{1}{3}−0=frac{1}{3}'],
['Como comprobación independiente racionalizamos directamente el integrando original. La identidad se extiende por continuidad a cero.','frac{x}{1+√(1−x)}=1−√(1−x)'],
['Integramos esta expresión sin utilizar el cambio anterior y obtenemos el mismo resultado.','∫_{0}^{1} (1−√(1−x)) dx = 1−frac{2}{3}=frac{1}{3}'],
])];
case 399:return[mk(0,'rg(A)=1 si α=1; rg(A)=2 si α=−2; rg(A)=3 en los demás casos.',['rg(A)=2 si α=1; rg(A)=1 si α=−2; rg(A)=3 en los demás casos.','rg(A)=2 si α=1 o α=−2; rg(A)=3 en los demás casos.','rg(A)=1 si α=−1; rg(A)=2 si α=2; rg(A)=3 en los demás casos.'],['Intercambiar los rangos de los dos valores singulares.','Concluir rango dos por el solo hecho de que el determinante sea cero.','Cambiar los signos de las raíces del determinante.'],[
['La matriz es cuadrada de orden tres. Un determinante no nulo asegura rango tres. Calculamos por la primera fila.','det(A)=α(α²−1)−(α−1)−(α−1)=α³−3α+2'],
['Factorizamos el polinomio y localizamos todos los valores excepcionales.','det(A)=(α−1)²(α+2); det(A)=0 ⇔ α=1 o α=−2'],
['Fuera de esos dos valores el rango es máximo. En los valores excepcionales hay que estudiar menores, no suponer el rango.','α∉{1,−2} ⇒ rg(A)=3'],
['Para α=1 las dos primeras filas coinciden y la tercera es su opuesta; la matriz no es nula.','A(1)=[[1,1,−1],[1,1,−1],[−1,−1,1]] ⇒ rg(A)=1'],
['Para α=−2 el determinante es cero, pero un menor de orden dos es no nulo.','det([[-2,1],[1,-2]])=4−1=3≠0 ⇒ rg(A)=2'],
['Comprobamos la factorización expandiéndola. La multiplicidad de una raíz no sustituye el cálculo de menores.','(α²−2α+1)(α+2)=α³−3α+2'],
]),mk(1,'X=[[0],[1],[1]].',['X=[[0],[−1],[−1]].','X=[[1],[0],[1]].','X=[[0],[frac{1}{2}],[frac{1}{2}]].'],['Cambiar el signo del término independiente.','Intercambiar las dos primeras incógnitas.','Dividir por dos todos los términos al resolver una sola ecuación.'],[
['Escribimos X como columna de incógnitas y sustituimos α=2 en la matriz oficial.','X=[[x],[y],[z]]; system{2x+y−z=0;x+2y−z=1;−x−y+2z=1}'],
['El determinante no es cero; por tanto, la solución que encontremos será única.','det(A(2))=(2−1)²(2+2)=4≠0'],
['Restamos la primera ecuación a la segunda para relacionar x e y.','−x+y=1 ⇒ y=x+1'],
['Sustituimos en la primera ecuación para despejar z.','2x+(x+1)−z=0 ⇒ z=3x+1'],
['Usamos la tercera ecuación para hallar x y recuperamos las otras dos incógnitas.','−x−(x+1)+2(3x+1)=1 ⇒ 4x=0 ⇒ x=0, y=1, z=1'],
['Verificamos por multiplicación en la ecuación matricial original, incluyendo sus tres componentes.','[[2,1,−1],[1,2,−1],[−1,−1,2]]·[[0],[1],[1]]=[[0],[1],[1]]=B'],
])];
case 416:return[mk(0,'det(3A)=54.',['det(3A)=6.','det(3A)=18.','det(3A)=−54.'],['Multiplicar solo una fila por tres.','Multiplicar solo dos filas por tres.','Introducir un cambio de signo que no corresponde.'],[
['La matriz A tiene tres filas y tres columnas; usamos su orden, no el número de entradas.','A es de orden 3; det(A)=2'],
['Multiplicar toda la matriz por tres multiplica cada una de sus filas por tres.','3A tiene filas 3R₁, 3R₂, 3R₃'],
['El determinante es lineal en cada fila por separado. Extraemos el primer factor.','det(3R₁,3R₂,3R₃)=3det(R₁,3R₂,3R₃)'],
['Extraemos los factores de las otras dos filas; no se permuta ninguna fila.','det(3A)=3·3·3·det(A)=27det(A)'],
['Sustituimos el determinante conocido para calcular el valor pedido.','det(3A)=27·2=54'],
['Comprobamos también por columnas: cada una aporta exactamente el mismo factor tres.','det(kA)=k³det(A) para matrices de orden 3'],
]),mk(1,'det(A⁻¹)=frac{1}{2}.',['det(A⁻¹)=2.','det(A⁻¹)=−2.','det(A⁻¹)=−frac{1}{2}.'],['Confundir la inversa con la traspuesta.','Confundir inversa y cambio de signo.','Cambiar el signo al invertir el determinante.'],[
['Primero justificamos que A tiene inversa usando el dato del enunciado.','det(A)=2≠0 ⇒ existe A⁻¹'],
['Por definición, el producto de la matriz y su inversa es la identidad.','AA⁻¹=I₃'],
['Tomamos determinantes y aplicamos la propiedad del producto.','det(A)·det(A⁻¹)=det(I₃)'],
['La identidad tiene determinante uno. Sustituimos el determinante de A.','2det(A⁻¹)=1'],
['Despejamos sin introducir ningún signo adicional.','det(A⁻¹)=frac{1}{2}'],
['Verificamos el resultado en la igualdad multiplicativa que lo define.','2·frac{1}{2}=1'],
]),mk(2,'El determinante vale −12.',['El determinante vale 12.','El determinante vale −6.','El determinante vale −4.'],['Olvidar el cambio de signo por intercambio de filas.','Olvidar el determinante original, que vale dos.','Omitir el factor tres de la primera columna.'],[
['Identificamos las filas originales antes de extraer factores.','R₁=(x,y,z), R₂=(1,0,1), R₃=(1,2,3)'],
['Intercambiamos las dos primeras filas de A y conservamos la tercera.','A*=[[1,0,1],[x,y,z],[1,2,3]]; det(A*)=−det(A)=−2'],
['La matriz del apartado resulta de multiplicar la primera columna de A* por tres y la segunda por dos.','C₁→3C₁; C₂→2C₂; C₃→C₃'],
['Usamos la multilinealidad por columnas, contabilizando ambos factores.','D=3·2·det(A*)'],
['Sustituimos el valor con el signo producido por la permutación.','D=6(−2)=−12'],
['Verificamos la transformación comparando cada fila con la matriz solicitada.','(1,0,1)→(3,0,1); (x,y,z)→(3x,2y,z); (1,2,3)→(3,4,3)'],
]),mk(3,'El determinante vale −2.',['El determinante vale 2.','El determinante vale −4.','El determinante vale 0.'],['Olvidar el signo menos de la tercera fila.','Confundir sumar dos veces una fila con multiplicar el determinante por dos.','Suponer que la suma de filas hace dependiente la matriz completa.'],[
['Expresamos las filas del determinante mediante las filas originales de A.','D=det(R₃,R₁+2R₃,−R₂)'],
['Restamos dos veces la primera fila a la segunda. Esta operación no cambia el determinante.','D=det(R₃,R₁,−R₂)'],
['Extraemos el signo negativo de la tercera fila.','D=−det(R₃,R₁,R₂)'],
['La permutación cíclica de tres filas equivale a dos intercambios; su signo es positivo.','det(R₃,R₁,R₂)=(−1)²det(R₁,R₂,R₃)=det(A)'],
['Aplicamos el dato del enunciado y obtenemos el valor final.','D=−det(A)=−2'],
['Comprobamos por multilinealidad que el sumando adicional no contribuye porque repite la fila R₃.','det(R₃,R₁+2R₃,−R₂)=det(R₃,R₁,−R₂)+2det(R₃,R₃,−R₂); det(R₃,R₃,−R₂)=0'],
])];
case 426:return[mk(0,'Los puntos son (3,1,0) y (−1,−3,0).',['Los puntos son (2,0,0) y (−2,−4,0).','Los puntos son (4,2,0) y (−2,−4,0).','Los puntos son (3,1,1) y (−1,−3,1).'],['Confundir el valor del parámetro con su desplazamiento respecto a P.','Tomar tres como desplazamiento sin considerar las dos componentes variables.','Olvidar la condición z=0 de la recta.'],[
['Parametrizamos la recta usando y=t; así se cumplen sus dos ecuaciones.','Q=(t+2,t,0), t∈ℝ'],
['Formamos el vector entre el punto variable y P, incluyendo la componente vertical.','Q−P=(t+1,t+1,−1)'],
['Elevamos al cuadrado la distancia, que debe valer tres, y sumamos los cuadrados de las tres componentes.','(t+1)²+(t+1)²+(−1)²=3²'],
['Resolvemos la ecuación cuadrática conservando sus dos raíces.','2(t+1)²+1=9 ⇒ (t+1)²=4 ⇒ t=1 o t=−3'],
['Sustituimos ambos parámetros en la recta para obtener puntos, no solo valores de t.','Q₁=(3,1,0); Q₂=(−1,−3,0)'],
['Verificamos pertenencia y distancia en las condiciones originales.','3−1−2=0; −1−(−3)−2=0; z=0; d(Q₁,P)²=d(Q₂,P)²=4+4+1=9'],
]),mk(1,'Área=frac{√3}{2} unidades cuadradas.',['Área=√3 unidades cuadradas.','Área=frac{3}{2} unidades cuadradas.','Área=frac{√2}{2} unidades cuadradas.'],['Dar el área del paralelogramo en vez de la del triángulo.','Omitir la raíz al calcular el módulo del producto vectorial.','Perder una componente del producto vectorial.'],[
['Tomamos dos vectores con origen común en A para representar los lados del triángulo.','u=B−A=(−1,0,1); v=P−A=(0,−1,1)'],
['Calculamos las tres componentes del producto vectorial con sus signos.','u×v=(0·1−1·(−1),1·0−(−1)·1,(−1)·(−1)−0·0)=(1,1,1)'],
['Su módulo es el área del paralelogramo generado por los dos vectores.','|u×v|=√(1²+1²+1²)=√3'],
['El triángulo ocupa la mitad del paralelogramo; incluimos unidades cuadradas.','Área(ABP)=frac{1}{2}|u×v|=frac{√3}{2}'],
['Verificamos independientemente con la identidad de Gram basada en productos escalares.','|u|²=2; |v|²=2; u·v=1 ⇒ |u×v|²=2·2−1²=3'],
['La identidad confirma el módulo y el área; el producto vectorial no nulo descarta puntos alineados.','4·Área(ABP)²=3; Área(ABP)>0'],
])];default:throw Error('Unknown official case');}}
export function buildCuspsDeterminantsBatch(id='batch-0423',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Problemas métricos':c.slot===1?'Matrices y determinantes':c.slot===3?'Integrales definidas y áreas':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':c.slot===3?'DEFINITE_SUBSTITUTION_WITH_INDEPENDENT_QUADRATURE':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildCuspsDeterminantsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0423-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0423.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

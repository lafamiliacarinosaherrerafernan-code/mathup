import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[827,'3bd9605e8f19071b210561d6f59ee83139cc5e20f4ffa7e29a17fa4f08d1752a',1,'A.1','bbcc24ea3631b7e20e21c647aa444b37871b501e7bf119234c1f98c7dcd32b80',0],
[828,'a7aef3a7a20bf486085bab45f78721b97e95ce8000d362fda65851d9ec3a7941',1,'A.1','6919f249fb23b500129821d59188f228f64c9926b99f42aaf012d50188b373b2',0],
[830,'85795e32721a21a3eb278bd06b1c23d508ff32ce7a58a770197d2b13552be49e',1,'A.4','4f7379c3f9b5050938705ad152a53115e5c80d36adcf3d07a7be351a26aa7591',0],
[831,'497e6d1a54cf3d5393bc8727864e641ec08a5aca088f46eb0e0ed8d8075d7b6d',2,'B.5','8700d757a546447507c3c10ee46ae1d89613adc305c1a636e5759c99ae838d10',0],
[833,'2bdbfb6be1200bf23a70ed00a0521ffec7928ef3bcd07fb34daab4b4f27e33fc',2,'B.1','4058a88f7d58c59edf26971024dcfff986e362c3f8bbdd2fc16ae7341b74f43d',0],
[834,'67593e6ffe6b4e602cf2a0d3b68d10dd2038435a99caf87bc3c83a2f80b2785a',2,'B.7','77fed55538731ac512c81fd844981adbee06a18a3bd4144a19eb5987d9bb9e5a',0],
[835,'74ab2c123d3df105640328a5953d165030deecf0873f4dfd65271d375ae8be25',2,'B.6','2fb1bfca16b0c8c62dbf6940623752b6d960cfe19845cb230bc7324f5f40d3d1',0],
[837,'484da7ba05f38869d6934dae372158991418ca8556e3a834a80895bfca1b117e',2,'B.4','c54f399478269a48b7bdd21a4849ab0279a0827a99f50d90fa9d21cdc7a49fad',0]];
export const statements={
827:'Según un determinado modelo, la concentración en sangre de cierto medicamento viene dada por la función C(t)=t e^{−t/2} mg/ml, siendo t el tiempo en horas transcurridas desde que se le administra el medicamento al enfermo.\na) Determina, si existe, el valor máximo absoluto de la función y en qué momento se alcanza.\nb) Sabiendo que la máxima concentración sin peligro para el paciente es 1 mg/ml, señala si en algún momento del tratamiento hay riesgo para el paciente.',
828:'Sea la función continua f:ℝ→ℝ definida por f(x)=cases{x+k si x≤0;frac{e^{x²}−1}{x²} si x>0}.\na) Calcula el valor de k.\nb) Halla la ecuación de la recta tangente a la gráfica de la función f en el punto de abscisa x=1.',
830:'Calcula el área del triángulo cuyos vértices son los puntos de intersección del plano 6x+3y+2z=6 con los ejes de coordenadas.',
831:'Una fábrica dispone de tres líquidos L₁, L₂ y L₃, en los que se encuentran disueltas dos sustancias: sodio y magnesio. Cada litro del líquido L₁ contiene 120 mg de sodio y 90 mg de magnesio, cada litro del líquido L₂ contiene 100 mg de sodio y 90 mg de magnesio y cada litro del líquido L₃ contiene 60 mg de sodio y 180 mg de magnesio. ¿Es posible obtener un litro de un líquido mezclando distintas cantidades de L₁, L₂ y L₃ en el que la cantidad de sodio y de magnesio sea de 100 mg cada una? En caso afirmativo, calcula dichas cantidades.',
833:'Considera la función f definida por f(x)=frac{x²}{x−1} para x≠1.\na) Estudia y determina las asíntotas de la gráfica de f.\nb) Estudia y determina los intervalos de crecimiento y los intervalos de decrecimiento de f. Calcula los extremos relativos de f (abscisas donde se obtienen y valores que se alcanzan).',
834:'Determina los puntos de la recta r: system{x−y+z=0;x+3y−1=0} que son equidistantes de los planos cartesianos OYZ y OXZ.',
835:'Considera el siguiente sistema de ecuaciones lineales: system{x+my+mz=1;x+2my+(m+1)z=1;2x+my+mz=2}.\na) Discute el sistema según los valores de m.\nb) Resuelve el sistema, si es posible, para m=1.',
837:'Considera un rectángulo de vértices consecutivos A, B, C y D siendo A(1,1,0) y B(2,2,1). Sabiendo que la recta r que contiene a los puntos C y D pasa por el origen de coordenadas se pide:\na) Halla unas ecuaciones paramétricas de r.\nb) Calcula el área del triángulo ABC.\nc) Determina las coordenadas del punto D.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_SOURCE_MODELS_GEOMETRY_LAYOUT']]:[];
export const cases=[{index:827,slot:2,literals:['C(t) = te−t/2','1 mg/ml']},{index:828,slot:2,literals:['x + k','abscisa x = 1']},{index:830,slot:4,literals:['6x + 3y + 2z = 6','ejes de coordenadas']},{index:831,slot:1,literals:['120 mg','180 mg','100 mg cada una']},{index:833,slot:2,literals:['x−1','extremos relativos']},{index:834,slot:4,literals:['x − y + z = 0','x + 3y − 1 = 0','OXZ']},{index:835,slot:1,literals:['(m + 1)z = 1','m = 1']},{index:837,slot:4,literals:['A(1, 1, 0)','B(2, 2, 1)','origen de coordenadas']}];
export const proof=c=>({827:{maximum:2/Math.E,time:2,domain:[0,'infinity'],threshold:1},828:{k:1,slope:2,intercept:Math.E-3,valueAt1:Math.E-1},830:{intercepts:[[1,0,0],[0,2,0],[0,0,3]],cross:[6,3,2],area:3.5},831:{liters:[2/9,2/3,1/9],sodium:100,magnesium:100,volume:1},833:{vertical:1,oblique:[1,1],maximum:[0,0],minimum:[2,4]},834:{points:[[.25,.25,0],[-.5,.5,1]]},835:{determinantCoefficients:[0,1,-1],regular:[1,0,0],singularParameters:[0,1],m0Direction:[0,1,0],m1Direction:[0,1,-1]},837:{direction:[1,1,1],D:[2/3,2/3,2/3],C:[5/3,5/3,5/3],area:Math.sqrt(2)/2}}[c.index]);
export function solve(c){const t=statements[c.index],ps=/\na\)/.test(t)?officialParts(t):[{id:'whole',prompt:t}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'DERIVATIVES_SOURCE_MODELS_AND_VECTOR_SUBSTITUTION',proof(c));switch(c.index){
case 827:return[mk(0,'Máximo absoluto: frac{2}{e} mg/ml, alcanzado a las 2 horas.',[
'Máximo absoluto: frac{1}{√e} mg/ml, alcanzado a la hora 1.',
'Máximo absoluto: 2e mg/ml, alcanzado a las 2 horas.',
'Máximo absoluto: frac{4}{e²} mg/ml, alcanzado a las 4 horas.'],['Derivar la exponencial omitiendo el factor 1/2 de la cadena.','Cambiar el signo del exponente al evaluar el punto crítico.','Aplicar dos veces el factor 1/2 en la condición de punto crítico.'],[
['El tiempo transcurrido no es negativo; ese es el dominio del modelo.','t≥0; C(t)=t e^{−t/2}'],
['Aplicamos producto y regla de la cadena.','C′(t)=e^{−t/2}−frac{t}{2}e^{−t/2}=e^{−t/2}(1−frac{t}{2})'],
['La exponencial es positiva; el signo depende del factor lineal.','C′(t)=0 ⇔ t=2; C′>0 si 0≤t<2; C′<0 si t>2'],
['La concentración aumenta hasta dos horas y disminuye después. Evaluamos el candidato.','C(2)=2e⁻¹=frac{2}{e} mg/ml'],
['Comparamos el extremo del dominio y el comportamiento lejano. La exponencial domina al factor lineal.','C(0)=0; lim_{t→+∞}t e^{−t/2}=0'],
['El cambio de signo y los valores de frontera demuestran máximo absoluto, no solo relativo.','C(t)≤frac{2}{e}≈0,735759 mg/ml para todo t≥0'],
]),mk(1,'No hay riesgo según el modelo: máximo frac{2}{e}<1 mg/ml.',[
'Sí hay riesgo según el modelo: máximo frac{2}{e}>1 mg/ml.',
'Sí hay riesgo según el modelo: máximo 2e>1 mg/ml.',
'No hay riesgo según el modelo: máximo frac{4}{e²}<1 mg/ml.'],['Invertir la comparación con el umbral.','Cambiar el signo del exponente en el máximo.','Usar el valor en cuatro horas como si fuera el máximo global.'],[
['El enunciado proporciona un umbral para este modelo matemático, no una pauta clínica general.','Umbral=1 mg/ml'],
['Del apartado anterior conocemos la cota global de toda la concentración.','0≤C(t)≤frac{2}{e}, t≥0'],
['Comparamos sin depender del redondeo: el número e es mayor que dos.','e>2 ⇒ frac{2}{e}<1'],
['El máximo se sitúa estrictamente por debajo del límite dado.','frac{2}{e}≈0,735759<1'],
['Por tanto tampoco puede superarse el umbral antes ni después del punto de máximo.','No existe t≥0 con C(t)>1'],
['La conclusión se refiere exclusivamente a las hipótesis del ejercicio.','Según este modelo y ese umbral, no hay momento de riesgo'],
])];
case 828:return[mk(0,'k=1.',['k=0.','k=e−1.','k=2.'],['Sustituir cero en el numerador sin resolver la indeterminación.','Evaluar en x=1 en vez de tomar el límite en el empalme.','No simplificar el factor 2x después de aplicar l’Hôpital.'],[
['Cada rama es continua en su intervalo; el único punto de empalme es cero.','f(0)=k; lim_{x→0⁻}(x+k)=k'],
['El límite derecho presenta la indeterminación cero entre cero.','lim_{x→0⁺}frac{e^{x²}−1}{x²}'],
['Hacemos u=x²; u tiende a cero por valores positivos.','lim_{u→0⁺}frac{eᵘ−1}{u}=1'],
['El límite fundamental equivale también a derivar numerador y denominador una vez respecto de u.','lim_{u→0⁺}frac{eᵘ}{1}=1'],
['La continuidad exige igualdad del valor, del límite izquierdo y del derecho.','k=1'],
['Verificamos que el valor hallado hace coincidir las tres cantidades.','lim_{x→0⁻}f(x)=f(0)=lim_{x→0⁺}f(x)=1'],
]),mk(1,'y=2x+e−3.',[
'y=2ex−e−1.','y=2x+e−1.','y=2x+3−e.'],['Derivar solo el numerador y olvidar la derivada del denominador.','Olvidar restar la abscisa del punto en la fórmula punto-pendiente.','Invertir el signo de la ordenada en el origen al simplificar.'],[
['En x=1 se utiliza la rama de abscisas positivas.','f(1)=frac{e−1}{1}=e−1'],
['Aplicamos la regla del cociente y la cadena a e elevado a x².','f′(x)=frac{2x e^{x²}·x²−2x(e^{x²}−1)}{x⁴}, x>0'],
['Evaluamos la pendiente sin redondear e.','f′(1)=2e−2(e−1)=2'],
['La tangente pasa por (1,e−1) y tiene pendiente dos.','y−(e−1)=2(x−1)'],
['Despejamos la ordenada.','y=2x+e−3'],
['Comprobamos por separado el punto de paso y la pendiente.','y(1)=e−1=f(1); pendiente=2=f′(1)'],
])];
case 830:return[mk(0,'Área=frac{7}{2} u².',['Área=7 u².','Área=3 u².','Área=frac{49}{2} u².'],['Dar el área del paralelogramo sin dividir por dos.','Multiplicar los tres interceptos en lugar de usar un producto vectorial.','Utilizar la norma al cuadrado del producto vectorial.'],[
['Hallamos los cortes poniendo a cero las dos coordenadas de cada eje.','A=(1,0,0), B=(0,2,0), C=(0,0,3)'],
['Construimos dos lados con el mismo origen.','AB=(−1,2,0); AC=(−1,0,3)'],
['El producto vectorial da un vector cuya norma es el área del paralelogramo.','AB×AC=(6,3,2)'],
['Calculamos su norma euclídea, no su cuadrado.','||AB×AC||=√(36+9+4)=7'],
['El triángulo es la mitad del paralelogramo formado por los dos lados.','A_triángulo=frac{1}{2}||AB×AC||=frac{7}{2} u²'],
['Verificamos con el determinante de Gram de los dos lados.','||AB||²||AC||²−(AB·AC)²=5·10−1²=49; A=frac{√49}{2}'],
])];
case 831:return[mk(0,'Sí: L₁=frac{2}{9} l, L₂=frac{2}{3} l, L₃=frac{1}{9} l.',[
'Sí: L₁=frac{2}{3} l, L₂=frac{2}{9} l, L₃=frac{1}{9} l.',
'Sí: L₁=frac{2}{9} l, L₂=frac{7}{9} l, L₃=frac{1}{9} l.',
'Sí: L₁=frac{1}{5} l, L₂=frac{7}{10} l, L₃=frac{1}{10} l.'],['Intercambiar los volúmenes de los dos primeros líquidos, que tienen distinto sodio.','Calcular el segundo volumen sin descontar el tercero del total.','Usar 100z en lugar de 90z al reducir la ecuación de magnesio.'],[
['Llamamos x,y,z a los litros de cada líquido. Deben ser no negativos y sumar uno.','x+y+z=1; x,y,z≥0'],
['El contenido de cada sustancia se obtiene multiplicando concentración por volumen.','120x+100y+60z=100; 90x+90y+180z=100'],
['Restamos noventa veces la ecuación de volumen a la de magnesio.','90z=10 ⇒ z=frac{1}{9}'],
['Restamos cien veces la ecuación de volumen a la de sodio.','20x−40z=0 ⇒ x=2z=frac{2}{9}'],
['El volumen restante fija y. Todos los volúmenes son positivos.','y=1−frac{2}{9}−frac{1}{9}=frac{2}{3}'],
['Sustituimos en las tres ecuaciones, conservando unidades.','x+y+z=1 l; 120x+100y+60z=100 mg; 90x+90y+180z=100 mg'],
])];
case 833:return[mk(0,'Asíntota vertical x=1; oblicua y=x+1; ninguna horizontal.',[
'Asíntota vertical x=1; oblicua y=x−1; ninguna horizontal.',
'Asíntota vertical x=−1; oblicua y=x+1; ninguna horizontal.',
'Asíntota vertical x=1; horizontal y=1; ninguna oblicua.'],['Cambiar el signo del término independiente al dividir polinomios.','Resolver x−1=0 con el signo opuesto.','Confundir el cociente f(x)/x con el límite de f(x).'],[
['El dominio excluye x=1; el numerador no se anula allí.','D=ℝ∖{1}; x²→1 cuando x→1'],
['El denominador cambia de signo a ambos lados del punto excluido.','lim_{x→1⁻}f(x)=−∞; lim_{x→1⁺}f(x)=+∞ ⇒ x=1'],
['Dividimos los polinomios para separar la parte lineal y el resto.','frac{x²}{x−1}=x+1+frac{1}{x−1}'],
['La diferencia respecto a la recta tiende a cero en ambos infinitos.','lim_{x→±∞}[f(x)−(x+1)]=0'],
['Concluimos la asíntota oblicua; la función no tiene límite finito en ninguno de los infinitos.','y=x+1; no hay asíntotas horizontales'],
['Los únicos posibles polos proceden del denominador y ya se han estudiado.','Única vertical: x=1; oblicua en ambas ramas: y=x+1'],
]),mk(1,'Crece en (−∞,0) y (2,+∞); decrece en (0,1) y (1,2); máximo relativo (0,0), mínimo relativo (2,4).',[
'Decrece en (−∞,0) y (2,+∞); crece en (0,1) y (1,2); mínimo relativo (0,0), máximo relativo (2,4).',
'Crece en (−∞,0) y (2,+∞); decrece en (0,1) y (1,2); mínimo relativo (0,0), máximo relativo (2,4).',
'Crece en (−∞,0) y (2,+∞); decrece en (0,1) y (1,2); máximo relativo (0,0), mínimo relativo (2,2).'],['Invertir el signo de la derivada.','Intercambiar máximo y mínimo pese al cambio de monotonía.','Confundir la abscisa del mínimo con su ordenada.'],[
['Derivamos por cociente y factorizamos el numerador.','f′(x)=frac{2x(x−1)−x²}{(x−1)²}=frac{x(x−2)}{(x−1)²}'],
['Los ceros de la derivada son cero y dos. El punto uno no pertenece al dominio y divide el estudio.','Puntos a separar: 0,1,2'],
['El denominador es positivo. El producto x(x−2) es positivo fuera de [0,2] y negativo entre cero y dos.','Signos de f′: + en (−∞,0); − en (0,1); − en (1,2); + en (2,+∞)'],
['Traducimos esos signos a intervalos de monotonía, sin atravesar la discontinuidad.','Crece en (−∞,0),(2,+∞); decrece en (0,1),(1,2)'],
['En cero pasa de crecer a decrecer; en dos de decrecer a crecer. Calculamos los valores alcanzados.','Máximo relativo f(0)=0; mínimo relativo f(2)=4'],
['El punto uno no es un extremo porque está fuera del dominio; no hay más puntos críticos.','Extremos relativos: (0,0) máximo; (2,4) mínimo'],
])];
case 834:return[mk(0,'P=(frac{1}{4},frac{1}{4},0) y Q=(−frac{1}{2},frac{1}{2},1).',[
'P=(frac{1}{4},frac{1}{4},0) y Q=(−frac{1}{2},frac{1}{2},−1).',
'P=(frac{1}{4},frac{1}{4},0) y Q=(frac{1}{2},−frac{1}{2},−1).',
'P=(frac{1}{2},frac{1}{2},0) y Q=(−frac{1}{2},frac{1}{2},1).'],['Cambiar el signo al despejar z=y−x.','Invertir los signos de x e y en la rama x=−y.','Resolver 4y=1 como si fuera 2y=1.'],[
['Las distancias a los planos coordenados son los valores absolutos de las coordenadas perpendiculares.','d(P,OYZ)=|x|; d(P,OXZ)=|y|'],
['Igualarlas equivale a estudiar dos ramas, no solo x=y.','|x|=|y| ⇔ x=y o x=−y'],
['En la primera rama, la segunda ecuación de r fija las dos coordenadas.','x=y; x+3y=1 ⇒ x=y=frac{1}{4}'],
['La primera ecuación fija z. En la segunda rama repetimos el cálculo.','P=(frac{1}{4},frac{1}{4},0); x=−y ⇒ 2y=1 ⇒ x=−frac{1}{2}, y=frac{1}{2}'],
['Calculamos la tercera coordenada de la segunda rama.','z=y−x=1 ⇒ Q=(−frac{1}{2},frac{1}{2},1)'],
['Ambos puntos verifican las dos ecuaciones de r y tienen iguales valores absolutos de x e y.','P: x−y+z=0, x+3y=1, |x|=|y|=frac{1}{4}; Q: x−y+z=0, x+3y=1, |x|=|y|=frac{1}{2}'],
])];
case 835:return[mk(0,'m∉{0,1}: compatible determinado; m∈{0,1}: compatible indeterminado; nunca incompatible.',[
'm∉{0,1}: compatible determinado; m∈{0,1}: incompatible; nunca indeterminado.',
'm≠0: compatible determinado; m=0: compatible indeterminado; nunca incompatible.',
'm≠1: compatible determinado; m=1: compatible indeterminado; nunca incompatible.'],['Confundir determinante nulo con incompatibilidad sin comparar rangos.','Perder el factor 1−m del determinante.','Perder el factor m del determinante.'],[
['Restamos la primera ecuación a la tercera; se obtiene una coordenada sin dividir por el parámetro.','x=1'],
['Sustituimos x en las otras dos ecuaciones.','m(y+z)=0; 2my+(m+1)z=0'],
['El determinante del sistema reducido, igual al del original, identifica los valores singulares.','det A=m(m+1)−2m²=m(1−m)'],
['Si m no es cero ni uno, el sistema reducido tiene solución única nula.','m≠0,1 ⇒ (x,y,z)=(1,0,0); rango A=rango(A|b)=3'],
['Para m=0 queda z=0 con y libre; para m=1 queda y+z=0. En ambos casos los rangos coinciden y valen dos.','m=0: (1,t,0); m=1: (1,t,−t), t∈ℝ'],
['El punto (1,0,0) verifica el sistema para cualquier m, lo que descarta incompatibilidad en todos los casos.','A(m)(1,0,0)ᵗ=(1,1,2)ᵗ para todo m∈ℝ'],
]),mk(1,'S={(1,t,−t):t∈ℝ}.',[
'S={(1,t,t):t∈ℝ}.','S={(1,0,0)}.','S={(t,1,−1):t∈ℝ}.'],['Cambiar el signo al despejar z=−y.','Dar solo una solución particular y perder las infinitas restantes.','Elegir como libre x cuando el sistema lo fija en uno.'],[
['Sustituimos m=1 antes de reducir las ecuaciones.','x+y+z=1; x+2y+2z=1; 2x+y+z=2'],
['La resta de la tercera y primera fija x.','x=1'],
['Sustituimos en la primera ecuación.','y+z=0'],
['La segunda ecuación es el doble de esta restricción y no añade otra condición.','2y+2z=0'],
['Tomamos y=t y despejamos z, conservando todos los valores reales del parámetro.','(x,y,z)=(1,t,−t), t∈ℝ'],
['La sustitución en las tres ecuaciones confirma toda la familia y la existencia de infinitas soluciones.','1+t−t=1; 1+2t−2t=1; 2+t−t=2'],
])];
case 837:return[mk(0,'r: x=t, y=t, z=t, t∈ℝ.',[
'r: x=t, y=t, z=0, t∈ℝ.','r: x=−t, y=−t, z=2t, t∈ℝ.','r: x=1+t, y=1+t, z=t, t∈ℝ.'],['Usar el vector de posición de A como dirección.','Usar la dirección perpendicular AD en vez de la dirección del lado CD.','Trasladar la recta al lado AB y perder el paso por el origen.'],[
['En un rectángulo los lados opuestos son paralelos; CD tiene la dirección de AB.','AB=B−A=(1,1,1)'],
['La recta que contiene C y D pasa por el origen, dato explícito del enunciado.','O=(0,0,0)∈r'],
['Una recta queda determinada por un punto y un vector director no nulo.','r: (x,y,z)=O+t(1,1,1)'],
['Escribimos las tres coordenadas paramétricas.','x=t, y=t, z=t; t∈ℝ'],
['La dirección coincide con AB y el valor t=0 da el origen.','v_r=(1,1,1)=AB; r(0)=O'],
['A no pertenece a esta recta, de modo que se trata del lado opuesto y el rectángulo no es degenerado.','A=(1,1,0) no cumple x=y=z'],
]),mk(1,'Área del triángulo ABC=frac{√2}{2} u².',[
'Área del triángulo ABC=√2 u².','Área del triángulo ABC=frac{√6}{2} u².','Área del triángulo ABC=frac{√3}{2} u².'],['Dar el área del rectángulo completo en lugar de la mitad.','Usar el cuadrado de la longitud de AB en la fórmula base por altura.','Tomar la altura como una unidad sin calcular la distancia al lado opuesto.'],[
['El triángulo ocupa la mitad del rectángulo, con base AB y altura igual a la distancia de A a r.','|AB|=√3; A_triángulo=frac{1}{2}|AB|·d(A,r)'],
['El pie D pertenece a r y AD es perpendicular a su dirección.','D=(t,t,t); (D−A)·(1,1,1)=3t−2=0'],
['Obtenemos el pie y la altura.','D=(frac{2}{3},frac{2}{3},frac{2}{3}); AD=(−frac{1}{3},−frac{1}{3},frac{2}{3}); |AD|=frac{√6}{3}'],
['Sustituimos las longitudes, manteniendo la mitad del área.','A_triángulo=frac{1}{2}√3·frac{√6}{3}=frac{√2}{2} u²'],
['Para una comprobación independiente, el cuarto vértice es C=D+AB.','C=(frac{5}{3},frac{5}{3},frac{5}{3}); AC=(frac{2}{3},frac{2}{3},frac{5}{3})'],
['El producto vectorial de los lados del triángulo reproduce su área.','AB×AC=(1,−1,0); A_triángulo=frac{||AB×AC||}{2}=frac{√2}{2}'],
]),mk(2,'D=(frac{2}{3},frac{2}{3},frac{2}{3}).',[
'D=(frac{5}{3},frac{5}{3},frac{5}{3}).','D=(2,2,2).','D=(frac{1}{3},frac{1}{3},frac{1}{3}).'],['Proyectar B y obtener C en lugar de proyectar A para hallar D.','Omitir la división por la norma al cuadrado del vector director.','Omitir una de las dos coordenadas no nulas de A en el producto escalar.'],[
['D está en el lado opuesto r, por lo que sus tres coordenadas son iguales.','D=(t,t,t)'],
['Los lados consecutivos AD y AB del rectángulo son perpendiculares.','(D−A)·AB=0'],
['Sustituimos las coordenadas sin omitir la tercera componente.','(t−1)+(t−1)+t=0 ⇒ 3t−2=0'],
['Despejamos el parámetro.','t=frac{2}{3}'],
['Obtenemos el vértice correspondiente a A.','D=(frac{2}{3},frac{2}{3},frac{2}{3})'],
['Verificamos pertenencia, perpendicularidad y cierre del rectángulo con C=D+B−A.','D∈r; AD·AB=0; C=(frac{5}{3},frac{5}{3},frac{5}{3})∈r; DC=AB'],
])];default:throw Error('Unknown source-models-geometry case');}}
export function buildSourceModelsGeometryBatch(id='batch-0444',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Sistemas de ecuaciones',2:'Límites, continuidad y derivadas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=c.index===831?['Modelización de mezclas']:c.index===837?['Proyección ortogonal','Área de triángulos']:[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_MODELS_GEOMETRY',...([828,833].includes(c.index)?{segmentation:'NEXT_EXERCISE_EXCLUDED_USING_OFFICIAL_RULED_BOUNDARY'}:{})};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSourceModelsGeometryBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0444-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0444.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

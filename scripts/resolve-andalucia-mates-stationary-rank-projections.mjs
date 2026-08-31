import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {graphs} from './resolve-andalucia-mates-source-areas.mjs';
export const observations=[
[911,'bcc0f5d10e7ba4afb5526c30934e6d5202e410eb02006f53611566d004cd16dc',1,'A.1','96acbfc2bfab15a4eee9fbb9f3757153cd645dfcb43f3ed9ec1af1f67a8c5265',0],
[915,'12862714b2e47a390cc175a51fc4582d522f804e03290abc96be4761fec7e5ae',2,'B.3','ca7fc61b187cf0846b0f4c8b6516b4e8d64ee4f1195eb21129d4df3030931d62',0],
[917,'569e3c5e5f840eb7e58db9d62685b3629690bbbacba51f9b0058b0d0bac88c19',2,'NONE.8','d1022a1ddb7cff7be3424c855cafa7ebd1b60fa88432bf8e434c45de3447a6cf',0],
[918,'f5ec52502964f33fd640c31536ed9055e35529b51abb1d02247402916bcbc6a6',2,'NONE.8','a10fa58a80ef31ad31373e0721263592a15a2599913844bb7143a1e12a92ca8b',0],
[919,'12862714b2e47a390cc175a51fc4582d522f804e03290abc96be4761fec7e5ae',1,'A.1','1859f171cf015ab1f4433cb4736ee5e775e65aff91a70d105015f6f662d8f844',0],
[920,'e9cdab8c67f3149fd8325f98321a2a7c369958dad473274c0c62f60db905ca7a',1,'A.3','80cd319ea8e48cdd06de8ba51478a1f45f3773d4c42733986ca2749ac2f59752',0],
[921,'3bd9605e8f19071b210561d6f59ee83139cc5e20f4ffa7e29a17fa4f08d1752a',2,'B.4','92c47b64c5346e21cd247dda624a1dd25234a6a1cd77bc43ceb85afda9fb606d',0]];
export const statements={
911:'Halla los coeficientes a, b y c sabiendo que la función f:ℝ→ℝ definida por f(x)=x³+ax²+bx+c tiene en x=1 un punto de derivada nula que no es extremo relativo y que la gráfica de f pasa por el punto (1,1).',
915:'Considera el siguiente sistema de ecuaciones system{3x+ky=1;2x−y+kz=1;x−3y+2z=1} del que se sabe que para un cierto valor de k es compatible indeterminado.\na) Determina el valor de k.\nb) Resuelve el sistema para k=1.',
917:'Considera el plano π≡x−y+z=2 y la recta r≡frac{x}{2}=frac{y+1}{1}=frac{z+2}{−1}.\na) Calcula la distancia entre r y π.\nb) Halla la ecuación general del plano perpendicular a π que contiene a r.',
918:'Considera el punto A(0,1,−2) y los planos π₁≡2x−y−z+5=0 y π₂≡x+5y−6z−4=0.\na) Halla el punto simétrico de A respecto de π₁.\nb) Determina la recta que pasa por A y es paralela a π₁ y π₂.',
919:'Se considera la función f dada por f(x)=frac{−3x²+2}{x−1} para x≠1.\na) Estudia y calcula las asíntotas de la gráfica de f.\nb) Determina los intervalos de crecimiento y de decrecimiento de f.',
920:'Sea f la función definida por f(x)=piecewise{2x+4 si x<0;(x−2)² si x≥0}.\na) Calcula los puntos de corte de la gráfica de f con el eje de abscisas y esboza la gráfica de la función.\nb) Halla el área del recinto limitado por la gráfica de f y por el eje de abscisas.',
921:'Halla cada uno de los puntos de la recta r≡system{x−y=0;y−z=0} de manera que junto con los puntos A(1,1,0), B(1,0,1) y C(0,1,1) formen un tetraedro de volumen frac{5}{6}.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_STATIONARY_RANK_PROJECTIONS_LAYOUT']]:[];
export const cases=[{index:911,slot:2,literals:['x3 + ax2 + bx + c','(1, 1)']},{index:915,slot:1,literals:['3x + ky','k = 1']},{index:917,slot:4,literals:['x − y + z = 2','perpendicular']},{index:918,slot:4,literals:['A(0, 1, −2)','x + 5y − 6z − 4']},{index:919,slot:2,literals:['−3x2 + 2','crecimiento']},{index:920,slot:3,literals:['2x + 4','(x − 2)2']},{index:921,slot:4,literals:['A(1, 1, 0)','tetraedro']}];
export const proof=c=>({911:{a:-3,b:3,c:0},915:{singular:[-6,1],indeterminate:1,solutionOrigin:[1/3,0,1/3],solutionDirection:[-1/3,1,5/3]},917:{Q:[0,-1,-2],u:[2,1,-1],n:[1,-1,1],distance:Math.sqrt(3),plane:[0,1,1,3]},918:{A:[0,1,-2],n:[2,-1,-1],foot:[-2,2,-1],reflection:[-4,3,0],direction:[1,1,1]},919:{pole:1,oblique:[-3,-3],critical:[1-1/Math.sqrt(3),1+1/Math.sqrt(3)]},920:{roots:[-2,2],join:[0,4],areas:[4,8/3],area:20/3},921:{parameters:[-1,7/3],volume:5/6}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s,visual=false)=>{const p=part(ps[i],a,d,e,s,'INDEPENDENT_RANK_SUBSTITUTION_VECTOR_DERIVATIVE_AND_QUADRATURE_CHECKS',proof(c));if(visual)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 911:return[mk(0,'a=−3, b=3 y c=0.',['a=−3, b=3 y c=1.','a=3, b=−9 y c=6.','a=−2, b=1 y c=1.'],['Confundir la ordenada del punto con el término independiente.','Cambiar el signo al imponer la condición de inflexión estacionaria.','Imponer solo el paso por el punto y la derivada nula, obteniendo un extremo.'],[
['Traducimos el paso por el punto y la tangente horizontal en dos ecuaciones.','f(1)=1 ⇒ a+b+c=0; f′(1)=0 ⇒ 3+2a+b=0'],
['La segunda derivada no puede ser distinta de cero, porque entonces el criterio de la segunda derivada daría un extremo relativo.','f′(x)=3x²+2ax+b; f″(x)=6x+2a; f″(1)=0'],
['Resolvemos primero la condición necesaria de segunda derivada.','6+2a=0 ⇒ a=−3'],
['Sustituimos sucesivamente en las otras dos ecuaciones.','3−6+b=0 ⇒ b=3; −3+3+c=0 ⇒ c=0'],
['Verificamos también la ausencia de extremo: la derivada no cambia de signo al pasar por uno.','f′(x)=3(x−1)²>0 para x<1 y para x>1; f′(1)=0'],
['La expresión trasladada comprueba el punto y muestra una inflexión con tangente horizontal, no un máximo ni un mínimo.','f(x)=(x−1)³+1; f(1)=1; f″(x)=6(x−1) cambia de signo'],
])];
case 915:return[mk(0,'Únicamente k=1: sistema compatible indeterminado.', ['k=1 o k=−6: ambos compatibles indeterminados.','Únicamente k=−6: sistema compatible indeterminado.','Únicamente k=0: sistema compatible indeterminado.'],['Dar todas las raíces del determinante sin comparar rangos.','Confundir el valor singular incompatible con el indeterminado.','Anular el parámetro en lugar de calcular el determinante.'],[
['Por Rouché–Frobenius necesitamos igualdad de rangos y rango menor que tres. Primero localizamos los valores singulares.','M=matrix{3,k,0;2,−1,k;1,−3,2}; b=matrix{1;1;1}'],
['Desarrollamos el determinante por la primera fila.','det M=3(−2+3k)−k(4−k)=k²+5k−6=(k−1)(k+6)'],
['Solo hay que estudiar k=1 y k=−6; para los demás valores el rango es tres y la solución es única.','det M=0 ⇔ k=1 o k=−6'],
['Para k=1 la tercera fila ampliada es tres veces la segunda menos la primera. Un menor de orden dos no nulo garantiza rango dos.','F₃=3F₂−F₁, incluido el término independiente; det matrix{3,1;2,−1}=−5≠0; rg M=rg(M|b)=2<3'],
['Para k=−6, despejar x de la primera ecuación y sustituir en las otras dos produce condiciones incompatibles.','x=frac{1}{3}+2y; y−2z=frac{1}{9}; y−2z=−frac{2}{3}'],
['El menor de las dos primeras filas y columnas vale nueve para k=−6, mientras que la contradicción eleva el rango ampliado a tres.','k=−6: rg M=2<rg(M|b)=3; por tanto el único valor pedido es k=1'],
]),mk(1,'(x,y,z)=(frac{1−t}{3},t,frac{1+5t}{3}), t∈ℝ.',[
'(x,y,z)=(frac{1+t}{3},t,frac{1+5t}{3}), t∈ℝ.',
'(x,y,z)=(frac{1−t}{3},t,frac{1−5t}{3}), t∈ℝ.',
'(x,y,z)=(1−t,t,1+5t), t∈ℝ.'],['Cambiar el signo al despejar la primera incógnita.','Cambiar el signo del término del parámetro en la tercera incógnita.','Omitir la división entre tres al resolver.'],[
['Escribimos el sistema particular. Su tercera ecuación depende de las dos primeras, según el análisis de rangos.','3x+y=1; 2x−y+z=1; x−3y+2z=1'],
['Hay tres incógnitas y rango dos: elegimos una incógnita libre.','y=t, t∈ℝ'],
['Despejamos x en la primera ecuación.','3x+t=1 ⇒ x=frac{1−t}{3}'],
['Sustituimos en la segunda para obtener z.','z=1−2x+y=1−frac{2(1−t)}{3}+t=frac{1+5t}{3}'],
['Reunimos la familia completa de soluciones, sin fijar arbitrariamente el parámetro.','(x,y,z)=(frac{1−t}{3},t,frac{1+5t}{3}), t∈ℝ'],
['Comprobamos la ecuación restante; las dos primeras ya se han satisfecho al despejar.','x−3y+2z=frac{1−t−9t+2+10t}{3}=1'],
])];
case 917:return[mk(0,'d(r,π)=√3 u.',['d(r,π)=0 u.','d(r,π)=frac{1}{√3} u.','d(r,π)=3 u.'],['Suponer que cualquier recta corta al plano.','Omitir el término independiente del plano al calcular la distancia.','No dividir entre el módulo del vector normal.'],[
['Pasamos la recta a paramétricas e identificamos un punto, su dirección y el normal del plano.','r:(x,y,z)=(0,−1,−2)+t(2,1,−1); n=(1,−1,1)'],
['Comprobamos el paralelismo antes de usar la distancia desde un punto.','u·n=2−1−1=0'],
['El punto de la recta no pertenece al plano: la recta es paralela y disjunta.','0−(−1)+(−2)−2=−3≠0'],
['Todos los puntos de una recta paralela están a la misma distancia del plano.','d(r,π)=d((0,−1,−2),π)=frac{|−3|}{√(1²+(−1)²+1²)}'],
['Simplificamos la distancia, que es siempre no negativa.','d(r,π)=frac{3}{√3}=√3'],
['Verificamos con un punto genérico: la expresión del plano no depende del parámetro.','2t−(−1+t)+(−2−t)−2=−3 para todo t'],
]),mk(1,'y+z+3=0.', ['y−z−1=0.','y+z−3=0.','x−y+z+1=0.'],['Elegir un normal no ortogonal a la dirección de la recta.','Cambiar el signo al imponer el paso por el punto.','Tomar un plano paralelo al original que contiene la recta, no uno perpendicular.'],[
['El normal del plano buscado debe ser perpendicular a la dirección de la recta y al normal del plano dado.','u=(2,1,−1); n=(1,−1,1); n′·u=0 y n′·n=0'],
['Obtenemos ese normal con el producto vectorial.','u×n=(0,−3,−3)'],
['Podemos dividir por menos tres para simplificar la ecuación sin cambiar el plano.','n′=(0,1,1)'],
['Imponemos el paso por el punto Q de la recta.','n′·((x,y,z)−(0,−1,−2))=0 ⇒ y+z+3=0'],
['Comprobamos que contiene todos los puntos de r.','(−1+t)+(−2−t)+3=0 para todo t'],
['Verificamos la perpendicularidad de los planos y la unicidad de la dirección normal.','n′·n=0−1+1=0; u×n≠0'],
])];
case 918:return[mk(0,'A′=(−4,3,0).',['A′=(−2,2,−1).','A′=(4,−1,−4).','A′=(−24,13,10).'],['Dar la proyección ortogonal en lugar del punto simétrico.','Desplazarse en el sentido opuesto al que lleva hasta el plano.','Omitir la división entre el cuadrado del módulo del normal.'],[
['El segmento entre un punto y su simétrico es perpendicular al plano; su punto medio es la proyección ortogonal.','n₁=(2,−1,−1); H=A−tn₁'],
['Imponemos que H pertenezca al plano para determinar el desplazamiento.','n₁·A+5=6; |n₁|²=6; 6−6t=0 ⇒ t=1'],
['Calculamos la proyección, que no es todavía el simétrico.','H=(0,1,−2)−(2,−1,−1)=(−2,2,−1)'],
['El punto H es el punto medio de A y A′.','A′=2H−A=2(−2,2,−1)−(0,1,−2)=(−4,3,0)'],
['Comprobamos que el punto medio está en el plano y que el desplazamiento es normal.','2(−2)−2−(−1)+5=0; A′−A=(−4,2,2)=−2n₁'],
['Las expresiones firmadas del plano en ambos puntos son opuestas, por lo que sus distancias son iguales.','π₁(A)=6; π₁(A′)=−6; d(A,π₁)=d(A′,π₁)=√6'],
]),mk(1,'r:(x,y,z)=(0,1,−2)+t(1,1,1), t∈ℝ.',[
'r:(x,y,z)=(0,1,−2)+t(2,−1,−1), t∈ℝ.',
'r:(x,y,z)=(0,1,−2)+t(1,1,−1), t∈ℝ.',
'r:(x,y,z)=(0,0,0)+t(1,1,1), t∈ℝ.'],['Usar el normal de un plano como dirección paralela.','Equivocar un signo del producto vectorial.','Omitir el punto por el que debe pasar la recta.'],[
['Buscamos una dirección perpendicular a los dos normales.','n₁=(2,−1,−1); n₂=(1,5,−6)'],
['Calculamos el producto vectorial componente a componente.','n₁×n₂=(6+5,−1+12,10+1)=(11,11,11)'],
['Simplificamos la dirección mediante un factor común no nulo.','u=(1,1,1)'],
['Usamos el punto A exigido en el enunciado.','r:(x,y,z)=(0,1,−2)+t(1,1,1)'],
['Los dos productos escalares son cero, como corresponde a una dirección paralela a ambos planos.','u·n₁=2−1−1=0; u·n₂=1+5−6=0'],
['Comprobamos el paso por A y que la recta no corta ninguno de los planos.','r(0)=A; π₁(r(t))=6; π₂(r(t))=13 para todo t'],
])];
case 919:return[mk(0,'Asíntota vertical x=1; asíntota oblicua y=−3x−3; no hay horizontal.',[
'Asíntota vertical x=1; asíntota oblicua y=−3x+3; no hay horizontal.',
'Asíntota vertical x=−1; asíntota oblicua y=−3x−3; no hay horizontal.',
'Asíntota vertical x=1; asíntota horizontal y=−3; no hay oblicua.'],['Cambiar el signo del cociente constante en la división de polinomios.','Confundir el cero del denominador.','Tratar un cociente de grados dos y uno como si ambos tuvieran el mismo grado.'],[
['El dominio excluye x=1. Allí el numerador vale menos uno, por lo que el cero del denominador no se cancela.','D_f=ℝ∖{1}; −3·1²+2=−1'],
['Analizamos los límites laterales con los signos de numerador y denominador.','lim_(x→1⁻)f(x)=+∞; lim_(x→1⁺)f(x)=−∞ ⇒ x=1'],
['Dividimos el polinomio para separar una recta y un resto que tiende a cero.','−3x²+2=(x−1)(−3x−3)−1'],
['La diferencia entre la función y la recta se anula en ambos infinitos.','f(x)=−3x−3−frac{1}{x−1}; lim_(x→±∞)(f(x)−(−3x−3))=0'],
['Así obtenemos la oblicua. No hay horizontal porque la función diverge, con pendiente no nula.','y=−3x−3; lim_(x→+∞)f(x)=−∞; lim_(x→−∞)f(x)=+∞'],
['Verificamos por las fórmulas de pendiente y ordenada de la asíntota.','m=lim_(x→±∞)frac{f(x)}{x}=−3; b=lim_(x→±∞)(f(x)+3x)=−3'],
]),mk(1,'Crece en (1−frac{1}{√3},1) y (1,1+frac{1}{√3}); decrece en (−∞,1−frac{1}{√3}) y (1+frac{1}{√3},+∞).',[
'Decrece en (1−frac{1}{√3},1) y (1,1+frac{1}{√3}); crece en (−∞,1−frac{1}{√3}) y (1+frac{1}{√3},+∞).',
'Crece en (1−frac{1}{√3},1+frac{1}{√3}); decrece en (−∞,1−frac{1}{√3}) y (1+frac{1}{√3},+∞).',
'Crece en (1−√3,1) y (1,1+√3); decrece en (−∞,1−√3) y (1+√3,+∞).'],['Invertir el signo de la derivada.','Unir intervalos a través de una asíntota que no pertenece al dominio.','Invertir la raíz del umbral al resolver la desigualdad.'],[
['Derivamos la forma simplificada obtenida por división.','f′(x)=−3+frac{1}{(x−1)²}=frac{1−3(x−1)²}{(x−1)²}'],
['Localizamos los ceros de la derivada y conservamos el punto excluido del dominio.','1−3(x−1)²=0 ⇒ x=1±frac{1}{√3}; x=1 excluido'],
['El denominador es positivo donde existe la función. Basta estudiar el signo del numerador.','f′(x)>0 ⇔ |x−1|<frac{1}{√3}, x≠1'],
['Separamos los dos tramos de crecimiento a ambos lados de la asíntota.','Crece en (1−frac{1}{√3},1) y (1,1+frac{1}{√3})'],
['Fuera de esos umbrales la derivada es negativa.','Decrece en (−∞,1−frac{1}{√3}) y (1+frac{1}{√3},+∞)'],
['Comprobamos signos en los cuatro intervalos; no se puede afirmar crecimiento sobre un intervalo que contiene un punto fuera del dominio.','f′(0)=−2; f′(frac{3}{4})=13; f′(frac{5}{4})=13; f′(2)=−2'],
])];
case 920:return[mk(0,'Cortes: (−2,0) y (2,0). Recta creciente hasta (0,4); después parábola de vértice (2,0).',[
'Cortes: (2,0) únicamente. Recta creciente hasta (0,4); después parábola de vértice (2,0).',
'Cortes: (−2,0) y (2,0). Recta creciente hasta (0,4); después parábola de vértice (−2,0).',
'Cortes: (−4,0) y (2,0). Recta creciente hasta (0,4); después parábola de vértice (2,0).'],['Ignorar la raíz correspondiente al primer tramo.','Cambiar el signo de la traslación horizontal de la parábola.','Resolver 2x+4=0 sin dividir entre dos.'],[
['Buscamos ceros en cada tramo, aceptándolos solo si pertenecen a su intervalo.','x<0: 2x+4=0 ⇒ x=−2; x≥0: (x−2)²=0 ⇒ x=2'],
['El primer tramo es una recta de pendiente positiva que se aproxima a cuatro cuando x se aproxima a cero por la izquierda.','y=2x+4 para x<0; lim_(x→0⁻)f(x)=4'],
['El segundo tramo es una parábola trasladada dos unidades a la derecha. Incluye el punto de unión.','y=(x−2)² para x≥0; f(0)=4; vértice (2,0)'],
['La función es continua en cero, pero presenta una esquina porque las pendientes laterales son distintas.','f′(0⁻)=2; f′(0⁺)=−4'],
['La parábola decrece hasta el vértice y crece después. La figura muestra ambos tramos y los dos cortes.','Decrece en (0,2); crece en (−∞,0) y (2,+∞)'],
['Comprobamos los puntos notables directamente en la definición.','f(−2)=0; f(0)=4; f(2)=0; f(3)=1'],
],true),mk(1,'Área=frac{20}{3} u².', ['Área=frac{8}{3} u².','Área=4 u².','Área=frac{4}{3} u².'],['Calcular únicamente la parte parabólica.','Calcular únicamente la parte triangular.','Restar las dos áreas aunque ambas están por encima del eje.'],[
['El recinto cerrado está entre los dos ceros. La función es no negativa en todo ese intervalo.','S=∫_(−2)^2 f(x)dx'],
['Separamos la integral en cero, donde cambia la fórmula.','S=∫_(−2)^0(2x+4)dx+∫₀²(x−2)²dx'],
['La contribución lineal coincide también con un triángulo de base dos y altura cuatro.','S₁=[x²+4x]_(−2)^0=0−(4−8)=4'],
['Calculamos la contribución parabólica con una primitiva inmediata.','S₂=[frac{(x−2)³}{3}]₀²=0−frac{−8}{3}=frac{8}{3}'],
['Sumamos, sin restar ni tomar solo uno de los tramos.','S=4+frac{8}{3}=frac{20}{3}'],
['La derivación de ambas primitivas y una cuadratura independiente verifican el área; la figura delimita el recinto.','(x²+4x)′=2x+4; (frac{(x−2)³}{3})′=(x−2)²; S≈6,666667'],
],true)];
case 921:return[mk(0,'D₁=(−1,−1,−1) y D₂=(frac{7}{3},frac{7}{3},frac{7}{3}).',[
'D₁=(−frac{1}{3},−frac{1}{3},−frac{1}{3}) y D₂=(frac{5}{3},frac{5}{3},frac{5}{3}).',
'D₁=(frac{7}{18},frac{7}{18},frac{7}{18}) y D₂=(frac{17}{18},frac{17}{18},frac{17}{18}).',
'D₁=(frac{1}{3},frac{1}{3},frac{1}{3}) y D₂=(frac{11}{3},frac{11}{3},frac{11}{3}).'],['Usar un volumen distinto al olvidar parte del factor seis.','Igualar directamente el producto mixto al volumen sin multiplicarlo por seis.','Cambiar el término constante al desarrollar el determinante.'],[
['Las dos ecuaciones de la recta obligan a que las tres coordenadas sean iguales.','D=(t,t,t), t∈ℝ'],
['El volumen de un tetraedro es la sexta parte del valor absoluto del producto mixto de tres aristas con origen común.','V=frac{|(AB×AC)·AD|}{6}'],
['Calculamos los vectores desde A.','AB=(0,−1,1); AC=(−1,0,1); AD=(t−1,t−1,t)'],
['Desarrollamos el producto vectorial y después el escalar.','AB×AC=(−1,−1,−1); (AB×AC)·AD=2−3t'],
['Imponemos el volumen y resolvemos las dos posibilidades del valor absoluto.','frac{|2−3t|}{6}=frac{5}{6} ⇒ 2−3t=±5 ⇒ t=−1 o t=frac{7}{3}'],
['Ambos puntos satisfacen la recta y producen productos mixtos opuestos con el mismo módulo.','D₁=(−1,−1,−1); D₂=(frac{7}{3},frac{7}{3},frac{7}{3}); |2−3(−1)|=|2−3·frac{7}{3}|=5'],
])];default:throw Error('Unknown stationary-rank-projections case');}}
export function buildStationaryRankProjectionsBatch(id='batch-0449',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Sistemas con parámetros',2:'Estudio de funciones',3:'Primitivas y áreas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=c.index===920?['Representación gráfica']:[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_STATIONARY_RANK_PROJECTIONS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildStationaryRankProjectionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0449-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0449.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}

import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[679,'02883b57dfa540931e908920429c12d648ed1810c6ceee66780a26e6f4ebb6d1',2,'NONE.7','255362523916bded7fd19a038d28ca70a9f49f84ab9bfd8ffed67b18dbc41cef',0],
[688,'0538bf48150a21cab4ec323355fa0eb68c26f4397e554f2d14328f1609399b2f',2,'NONE.8','5d489d2971b00c4904e08696620a7e4cc20a46b628aa931fab1d8b42f50d8c24',0],
[690,'497e6d1a54cf3d5393bc8727864e641ec08a5aca088f46eb0e0ed8d8075d7b6d',2,'A.8','8700d757a546447507c3c10ee46ae1d89613adc305c1a636e5759c99ae838d10',0],
[693,'15c3470cfea7d61b997f1f400cd8e1ecd8baee17b80f43cf5388e1693d2b5a77',1,'NONE.1','8c86d3f25d65a6d0304843d3110d44408f44add14ab648ffe1f8020766d26ff2',0],
[694,'569e3c5e5f840eb7e58db9d62685b3629690bbbacba51f9b0058b0d0bac88c19',2,'NONE.7','d1022a1ddb7cff7be3424c855cafa7ebd1b60fa88432bf8e434c45de3447a6cf',0],
[699,'757725a20faff347660e0d616729eb9219db76a4d18297e2896526290649ec77',1,'NONE.3','199532170f0043d3147cdf5f9012583e9a100546d087a5b0b1621e237423788e',0],
[701,'2200f6e11bca8b324a64d95f8b6b31c9e91afe914d1b929d65031e64575e2395',2,'NONE.6','f933ed7ab6fe17786bf21acfa0077202b7a687761fa27fda4762d963309810b3',0]];
export const statements={
679:'Sea el plano π≡2x+y−2z−2=0.\na) Halla las ecuaciones de los planos paralelos a π que distan 2 unidades de dicho plano.\nb) Calcula el volumen del tetraedro cuyos vértices son el origen de coordenadas y los puntos de corte del plano π con los ejes coordenados.',
688:'Considera los planos π₁≡x+y+2=0 y π₂≡x−z−1=0, así como la recta r≡system{2x+z=1;y=1}.\na) Calcula los puntos de la recta r que equidistan de los planos π₁ y π₂.\nb) Halla el ángulo que forman los planos π₁ y π₂.',
690:'Considera el plano π≡x+y+z=0 y la recta r≡x−1=frac{y}{2}=frac{z+1}{2}. Halla la ecuación de un plano π′, paralelo a π, tal que si Q y Q′ son respectivamente los puntos de corte de la recta r con los planos π y π′, entonces la distancia entre Q y Q′ sea de 2 unidades.',
693:'Sea f la función definida por f(x)=frac{e^x}{x−1} para x≠1.\na) Estudia y calcula las asíntotas de la gráfica de f.\nb) Halla los intervalos de crecimiento y de decrecimiento y los extremos relativos (abscisas donde se obtienen y valores que se alcanzan) de f.',
694:'Considera A=matrix{1,2,3;0,0,2;0,1,1} y X=matrix{x;y;z}.\na) Halla los valores de λ tales que |A−λI|=0, donde I es la matriz identidad de orden 3.\nb) Para λ=1, resuelve el sistema dado por (A−λI)X=0. ¿Existe alguna solución tal que z=1? En caso afirmativo, calcúlala. En caso negativo, justifica la respuesta.',
699:'Considera el siguiente sistema de ecuaciones lineales\nsystem{x−y+z=0;2x+3y−z=3}.\na) Determina el valor de m para el que al añadir la ecuación x+my+4z=−3 al sistema anterior se obtenga un sistema con las mismas soluciones.\nb) Calcula la solución del sistema para la que la suma de los valores de las incógnitas sea 6.',
701:'Calcula integral ln(x²+2x+2) dx donde ln denota la función logaritmo neperiano. (Sugerencia: efectúa el cambio de variable t=x+1).'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PLANE_EXPONENTIAL_LOG_LAYOUT']]:[];
export const cases=[{index:679,slot:4,literals:['2x + y − 2z − 2 = 0','tetraedro']},{index:688,slot:4,literals:['2x+z = 1','x − z − 1 = 0','equidistan']},{index:690,slot:4,literals:['x + y + z = 0','2 unidades']},{index:693,slot:2,literals:['x−1','extremos relativos']},{index:694,slot:1,literals:['|A − λI| = 0','z = 1']},{index:699,slot:1,literals:['x + my + 4z = −3','mismas soluciones']},{index:701,slot:3,literals:['ln(x2 + 2x + 2) dx','t = x + 1']}];
export const proof=c=>({
679:{normal:[2,1,-2],constants:[4,-8],intercepts:[[1,0,0],[0,2,0],[0,0,-1]],volume:1/3},
688:{normals:[[1,1,0],[1,0,-1]],parameters:[2.5,-.25],points:[[2.5,1,-4],[-.25,1,1.5]],angle:Math.PI/3},
690:{Q:[1,0,-1],direction:[1,2,2],parameters:[2/3,-2/3],planeConstants:[10,-10]},
693:{domainException:1,derivative:'exp(x)*(x-2)/(x-1)^2',minimum:[2,Math.exp(2)],asymptotes:{vertical:1,horizontalAtNegativeInfinity:0,oblique:false}},
694:{A:[[1,2,3],[0,0,2],[0,1,1]],roots:[-1,1,2],kernelAtOne:[1,0,0],rankAtOne:2},
699:{A:[[1,-1,1],[2,3,-1]],b:[0,3],combination:[3,-1],m:-6,particular:[-1,3,4]},
701:{domain:'all real',primitive:'u*ln(u^2+1)-2*u+2*atan(u), u=x+1',derivative:'ln(x^2+2*x+2)'}
}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_GEOMETRY_ELIMINATION_AND_DIFFERENTIATION',proof(c));switch(c.index){
case 679:return[mk(0,'2x+y−2z+4=0 y 2x+y−2z−8=0.',['2x+y−2z=0 y 2x+y−2z−4=0.','2x+y−2z+2=0 y 2x+y−2z−6=0.','2x+y−2z+8=0 y 2x+y−2z−4=0.'],['No dividir la diferencia de constantes por el módulo de la normal.','Usar el coeficiente de x como si fuese el módulo completo de la normal.','Cambiar el signo de la constante del plano dado.'],[
['Los planos paralelos tienen normales proporcionales; fijamos la misma normal para comparar sus constantes.','π_d:2x+y−2z+d=0; n=(2,1,−2)'],
['Calculamos el módulo de la normal con sus tres componentes.','‖n‖=√(4+1+4)=3'],
['La distancia entre planos con idéntica normal es el valor absoluto de la diferencia de constantes dividido por su módulo.','d(π_d,π)=frac{|d−(−2)|}{3}=frac{|d+2|}{3}'],
['Imponemos la distancia solicitada y conservamos ambas posibilidades del valor absoluto.','|d+2|=6 ⇒ d+2=6 o d+2=−6'],
['Resolvemos y escribimos las dos ecuaciones, una a cada lado del plano original.','d=4 o d=−8 ⇒ 2x+y−2z+4=0; 2x+y−2z−8=0'],
['Comprobamos por separado las dos distancias.','frac{|4+2|}{3}=2; frac{|−8+2|}{3}=2'],
]),mk(1,'V=frac{1}{3} unidades cúbicas.',['V=2 unidades cúbicas.','V=1 unidad cúbica.','V=−frac{1}{3} unidades cúbicas.'],['Dar el volumen del paralelepípedo sin dividir entre seis.','Dividir entre dos, como si bastara calcular una base triangular.','No tomar el valor absoluto del producto mixto.'],[
['Para obtener cada corte con un eje anulamos las otras dos coordenadas.','y=z=0 ⇒ x=1; x=z=0 ⇒ y=2; x=y=0 ⇒ z=−1'],
['Los tres vértices no nulos y el origen determinan el tetraedro.','A=(1,0,0); B=(0,2,0); C=(0,0,−1); O=(0,0,0)'],
['El valor absoluto del producto mixto da el volumen del paralelepípedo asociado.','|det(OA,OB,OC)|=|1·2·(−1)|=2'],
['Un tetraedro con esos tres vectores tiene la sexta parte de dicho volumen.','V=frac{|det(OA,OB,OC)|}{6}=frac{2}{6}'],
['Simplificamos; el volumen geométrico no puede ser negativo.','V=frac{1}{3} unidades cúbicas'],
['Verificación independiente por base y altura: la base OAB es un triángulo rectángulo y la altura desde C vale uno.','área(OAB)=frac{1·2}{2}=1; h=1; V=frac{1·1}{3}=frac{1}{3}'],
])];
case 688:return[mk(0,'P₁=(frac{5}{2},1,−4) y P₂=(−frac{1}{4},1,frac{3}{2}).',['P₁=(frac{5}{2},1,−4) y P₂=(frac{1}{4},1,frac{1}{2}).','P₁=(−frac{5}{2},1,6) y P₂=(−frac{1}{4},1,frac{3}{2}).','P₁=(frac{5}{2},1,4) y P₂=(−frac{1}{4},1,frac{3}{2}).'],['Cambiar el signo en la segunda ecuación del valor absoluto.','Cambiar el signo al despejar la primera ecuación.','Cambiar el signo de z y salir de la recta oficial.'],[
['Parametrizamos la recta usando x=t y sus dos ecuaciones oficiales.','P(t)=(t,1,1−2t)'],
['Ambas normales tienen módulo raíz de dos, aunque sus componentes son diferentes.','n₁=(1,1,0); n₂=(1,0,−1); ‖n₁‖=‖n₂‖=√2'],
['Sustituimos P(t) en las fórmulas de distancia a los dos planos.','d(P,π₁)=frac{|t+3|}{√2}; d(P,π₂)=frac{|3t−2|}{√2}'],
['La igualdad de valores absolutos se resuelve mediante dos ecuaciones lineales.','t+3=3t−2 ⇒ t=frac{5}{2}; t+3=−3t+2 ⇒ t=−frac{1}{4}'],
['Sustituimos cada parámetro en las tres coordenadas, no solo en x.','P₁=(frac{5}{2},1,−4); P₂=(−frac{1}{4},1,frac{3}{2})'],
['Comprobamos pertenencia a r e igualdad de distancias en ambos puntos.','2x+z=1; y=1; P₁:|t+3|=|3t−2|=frac{11}{2}; P₂: ambos valores=frac{11}{4}'],
]),mk(1,'El ángulo entre los planos es frac{π}{3}=60°.',['El ángulo entre los planos es frac{π}{6}=30°.','El ángulo entre los planos es frac{π}{4}=45°.','El ángulo entre los planos es frac{π}{2}=90°.'],['Usar seno en vez de coseno para el cociente entre producto escalar y módulos.','Olvidar uno de los factores raíz de dos del denominador.','Suponer normales ortogonales sin calcular el producto escalar.'],[
['El ángulo no obtuso entre dos planos es el de sus normales tomando valor absoluto.','cos θ=frac{|n₁·n₂|}{‖n₁‖‖n₂‖}'],
['Leemos las normales a partir de los coeficientes de las ecuaciones.','n₁=(1,1,0); n₂=(1,0,−1)'],
['Calculamos el producto escalar, que no es cero.','n₁·n₂=1·1+1·0+0·(−1)=1'],
['Calculamos los dos módulos y su producto.','‖n₁‖=√2; ‖n₂‖=√2; ‖n₁‖‖n₂‖=2'],
['El coseno determina el ángulo solicitado en el intervalo de cero a noventa grados.','cos θ=frac{1}{2} ⇒ θ=frac{π}{3}=60°'],
['Verificamos con el producto vectorial: su módulo dividido entre los módulos es el seno del mismo ángulo.','n₁×n₂=(−1,1,−1); sen θ=frac{√3}{2}'],
])];
case 690:return[mk(0,'Son válidos 3x+3y+3z−10=0 y 3x+3y+3z+10=0.',['Son válidos x+y+z−2=0 y x+y+z+2=0.','Son válidos x+y+z−2√3=0 y x+y+z+2√3=0.','Son válidos x+y+z−10=0 y x+y+z+10=0.'],['Confundir distancia entre puntos con la constante de la ecuación del plano.','Imponer distancia dos entre planos en vez de entre sus cortes con la recta.','Olvidar dividir por el módulo tres del vector director.'],[
['Igualamos las tres expresiones continuas a un parámetro y recuperamos la recta completa.','r(t)=(1+t,2t,−1+2t); d=(1,2,2); ‖d‖=3'],
['Hallamos el punto Q donde la recta corta al plano dado.','x+y+z=5t=0 ⇒ t=0 ⇒ Q=(1,0,−1)'],
['La distancia desde Q hasta otro punto r(t) depende del módulo del vector director.','‖r(t)−Q‖=‖t(1,2,2)‖=3|t|'],
['Imponemos distancia dos; hay un punto admisible en cada sentido de la recta.','3|t|=2 ⇒ t=±frac{2}{3}'],
['Los planos paralelos tienen ecuación x+y+z=k; en los dos puntos encontrados k=5t.','k=±frac{10}{3} ⇒ 3x+3y+3z−10=0 o 3x+3y+3z+10=0'],
['Comprobamos: ambos planos son paralelos a π y cada corte está a dos unidades de Q. El enunciado pide uno; cualquiera de los dos sirve.','‖(±frac{2}{3})(1,2,2)‖=2; normales (3,3,3)=3(1,1,1)'],
])];
case 693:return[mk(0,'Asíntota vertical x=1; horizontal y=0 cuando x→−∞; no hay horizontal en +∞ ni oblicuas.',['Asíntota vertical x=1; horizontal y=0 en ambos infinitos; no hay oblicuas.','Asíntota vertical x=−1; horizontal y=0 cuando x→−∞; no hay horizontal en +∞ ni oblicuas.','Asíntota vertical x=1; horizontal y=1 cuando x→−∞; no hay horizontal en +∞ ni oblicuas.'],['Trasladar al infinito positivo el límite del infinito negativo.','Anular incorrectamente el denominador x−1.','Confundir el cociente con una función de igual grado en numerador y denominador.'],[
['La exponencial existe para todo real y nunca se anula; el único punto excluido es el cero del denominador.','Dom f=ℝ∖{1}'],
['En torno a uno el numerador tiende a e>0 y el denominador cambia de signo.','lim_{x→1⁻} f(x)=−∞; lim_{x→1⁺} f(x)=+∞ ⇒ AV:x=1'],
['En el infinito negativo el numerador tiende a cero y el denominador crece en módulo.','lim_{x→−∞} frac{e^x}{x−1}=0⁻ ⇒ AH:y=0'],
['En el infinito positivo la exponencial domina al polinomio lineal.','lim_{x→+∞} frac{e^x}{x−1}=+∞ ⇒ no hay asíntota horizontal en +∞'],
['Para una oblicua necesitamos una pendiente finita no nula; comprobamos f(x)/x.','lim_{x→+∞} frac{e^x}{x(x−1)}=+∞; lim_{x→−∞} frac{e^x}{x(x−1)}=0'],
['La pendiente infinita en +∞ impide una oblicua, y en −∞ la pendiente cero corresponde a la horizontal ya hallada.','Asíntotas: x=1 e y=0 solo hacia −∞; ninguna oblicua'],
]),mk(1,'Decrece en (−∞,1) y (1,2); crece en (2,+∞); mínimo relativo (2,e²), sin máximos relativos.',['Crece en (−∞,1) y (1,2); decrece en (2,+∞); máximo relativo (2,e²), sin mínimos relativos.','Decrece en (−∞,1) y (1,2); crece en (2,+∞); mínimo relativo (2,e), sin máximos relativos.','Decrece en (−∞,1) y (1,2); crece en (2,+∞); máximo relativo (2,e²), sin mínimos relativos.'],['Invertir el signo de la derivada al aplicar la regla del cociente.','Evaluar incorrectamente la exponencial en la abscisa dos.','Confundir el cambio de decrecimiento a crecimiento con un máximo.'],[
['Derivamos mediante la regla del cociente y simplificamos sin cambiar el dominio.','f′(x)=frac{e^x(x−1)−e^x}{(x−1)²}=frac{e^x(x−2)}{(x−1)²}'],
['La exponencial y el cuadrado del denominador son positivos en el dominio; el signo depende de x−2.','signo f′(x)=signo(x−2), x≠1'],
['Separamos también el punto fuera del dominio al describir los intervalos.','f′<0 en (−∞,1) y (1,2); f′>0 en (2,+∞)'],
['El único cero de la derivada está en dos; allí pasa de negativa a positiva.','x=2 ⇒ mínimo relativo; x=1 no es un extremo porque no pertenece al dominio'],
['Calculamos la ordenada del extremo en la función original.','f(2)=frac{e²}{2−1}=e² ⇒ mínimo (2,e²)'],
['Verificación adicional con segunda derivada en el punto crítico; no hay otros ceros que puedan originar máximos.','f″(x)=frac{e^x(x²−4x+5)}{(x−1)³}; f″(2)=e²>0'],
])];
case 694:return[mk(0,'λ∈{−1,1,2}.',['λ∈{−2,1,2}.','λ∈{0,1,2}.','λ∈{−1,0,2}.'],['Cambiar una raíz del factor cuadrático al resolverlo.','Usar las entradas diagonales como valores propios de una matriz que no es triangular.','Olvidar el uno de la primera entrada diagonal.'],[
['Restamos λ únicamente en las entradas de la diagonal principal.','A−λI=matrix{1−λ,2,3;0,−λ,2;0,1,1−λ}'],
['Expandimos por la primera columna, que contiene dos ceros.','det(A−λI)=(1−λ)det[[−λ,2],[1,1−λ]]'],
['Calculamos el determinante de orden dos.','det[[−λ,2],[1,1−λ]]=−λ(1−λ)−2=λ²−λ−2'],
['Factorizamos el polinomio cuadrático.','det(A−λI)=(1−λ)(λ−2)(λ+1)'],
['El producto se anula exactamente cuando se anula uno de sus factores.','λ=1, λ=2 o λ=−1'],
['Comprobamos raíces y coeficiente principal: el polinomio cúbico tiene tres raíces distintas y no puede haber otras.','det(A−λI)=−λ³+2λ²+λ−2; raíces {−1,1,2}'],
]),mk(1,'X=matrix{t;0;0}, t∈ℝ; no existe solución con z=1.',['X=matrix{t;0;0}, t∈ℝ; sí existe solución con z=1.','X=matrix{0;t;0}, t∈ℝ; no existe solución con z=1.','X=matrix{0;0;t}, t∈ℝ; sí existe solución con z=1.'],['Ignorar que toda la familia tiene tercera coordenada cero.','Intercambiar la variable libre con la segunda variable.','Tomar z como libre sin respetar la segunda ecuación.'],[
['Sustituimos λ=1 antes de formar las ecuaciones del sistema.','A−I=matrix{0,2,3;0,−1,2;0,1,0}'],
['Multiplicamos por la columna X para obtener las tres condiciones.','2y+3z=0; −y+2z=0; y=0'],
['La tercera ecuación fija y; al sustituir en la segunda queda fijada z.','y=0 ⇒ 2z=0 ⇒ z=0'],
['Ninguna ecuación impone una condición a x; por tanto x es el parámetro libre.','X=matrix{t;0;0}, t∈ℝ'],
['La condición adicional z=1 contradice z=0, no es una elección válida del parámetro.','z=0 para toda solución ⇒ no existe solución con z=1'],
['Comprobamos la familia por multiplicación y el rango con un menor no nulo.','(A−I)matrix{t;0;0}=matrix{0;0;0}; det[[2,3],[−1,2]]=7≠0 ⇒ rango 2'],
])];
case 699:return[mk(0,'m=−6.',['m=6.','m=−2.','m=0.'],['Cambiar el signo del coeficiente total de y.','Sumar, en lugar de restar, la contribución de la segunda fila.','Ignorar los términos en y al combinar las ecuaciones.'],[
['Las dos filas de coeficientes son independientes: el menor de x e y vale cinco.','det[[1,−1],[2,3]]=5≠0'],
['Para mantener todas las soluciones, la nueva ecuación debe ser una combinación de las dos originales, también en el término independiente.','α(x−y+z)+β(2x+3y−z)=α·0+β·3'],
['Igualamos los coeficientes de x y z con los de la nueva ecuación.','α+2β=1; α−β=4'],
['Restando obtenemos β y después α.','3β=−3 ⇒ β=−1; α=3'],
['El coeficiente de y determina m y el término independiente queda verificado.','m=−α+3β=−3−3=−6; α·0+β·3=−3'],
['Verificamos la combinación completa: añadir esta igualdad no quita ni añade soluciones.','3(x−y+z)−(2x+3y−z)=x−6y+4z=−3'],
]),mk(1,'(x,y,z)=(−1,3,4).',['(x,y,z)=(1,3,2).','(x,y,z)=(−1,4,3).','(x,y,z)=(3,−1,4).'],['Cambiar el signo de x al resolver la suma de incógnitas.','Intercambiar los valores de y y z.','Intercambiar los valores de x e y.'],[
['Añadimos al sistema original exactamente la condición de suma solicitada.','x−y+z=0; 2x+3y−z=3; x+y+z=6'],
['Restamos la primera ecuación a la condición adicional.','(x+y+z)−(x−y+z)=6−0 ⇒ 2y=6 ⇒ y=3'],
['La primera ecuación da la suma de las otras dos incógnitas.','x+z=y=3 ⇒ z=3−x'],
['Sustituimos en la segunda ecuación para fijar x.','2x+9−(3−x)=3 ⇒ 3x=−3 ⇒ x=−1'],
['Recuperamos z y escribimos la terna en el orden de las incógnitas.','z=3−(−1)=4 ⇒ (x,y,z)=(−1,3,4)'],
['Comprobamos las tres igualdades; los despejes han determinado una única terna.','−1−3+4=0; −2+9−4=3; −1+3+4=6'],
])];
case 701:return[mk(0,'(x+1)ln(x²+2x+2)−2(x+1)+2arctan(x+1)+C.',['(x+1)ln(x²+2x+2)−2(x+1)−2arctan(x+1)+C.','(x+1)ln(x²+2x+2)−2(x+1)+arctan(x+1)+C.','(x+1)ln(x²+2x+2)+2arctan(x+1)+C.'],['Cambiar el signo del término arco tangente al descomponer la fracción.','Perder el factor dos de la integral racional.','Omitir el término lineal procedente de integrar la constante.'],[
['Completamos el cuadrado y aplicamos el cambio sugerido; el argumento del logaritmo siempre es positivo.','t=x+1; x²+2x+2=t²+1>0; dx=dt'],
['La integral queda preparada para integración por partes tomando el logaritmo como factor a derivar.','integral ln(t²+1) dt; u=ln(t²+1), dv=dt; du=frac{2t}{t²+1}dt, v=t'],
['Aplicamos la fórmula de integración por partes.','integral ln(t²+1) dt=t ln(t²+1)−2 integral frac{t²}{t²+1} dt'],
['Dividimos la fracción racional en una constante y una fracción elemental.','frac{t²}{t²+1}=1−frac{1}{t²+1} ⇒ F=t ln(t²+1)−2t+2arctan(t)+C'],
['Volvemos a la variable original y mantenemos la constante arbitraria.','F(x)=(x+1)ln(x²+2x+2)−2(x+1)+2arctan(x+1)+C'],
['Derivamos la primitiva completa: los términos racionales y la constante se cancelan, recuperando el integrando.','F′=ln(t²+1)+frac{2t²}{t²+1}−2+frac{2}{t²+1}=ln(t²+1)=ln(x²+2x+2)'],
])];
default:throw Error('Unknown plane/exponential/log case');}}
export function buildPlaneExponentialLogBatch(id='batch-0434',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas con determinantes':c.slot===4?'Propiedades métricas':c.slot===3?'Integrales indefinidas':'Aplicaciones de la derivada';x.secondaryTopics=c.index===694?['Matrices']:c.index===693?['Límites y asíntotas']:[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'PLANE_SUBSTITUTION_RANK_AND_DERIVATIVE_CHECK'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPlaneExponentialLogBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0434-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0434.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

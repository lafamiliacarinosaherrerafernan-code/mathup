import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[754,'ebc02a7f8b0e620b0f8134f8e32b5215847b3dc50890fe40538337ed88a54a6d',2,'NONE.4','0a706a90039be7753d769055acc2182d6b2abd45c2842f85a5e4e06b736697dc',0],
[755,'85f493d821b1af6654edb4d55c3218802ea3170138b86a4a1f7224d212d397f9',2,'B.3','9ca3a3f15095d8f6027630e9f1a6f9e01af09998b2a842149e9027ce3c29abaf',0],
[756,'8bab92660a5a8eecfd54fa7be53b1c173e06c5a122d8c915e97ae36fc0e1dc78',2,'NONE.3','c4c6b90854b7f84e5284b0789c6e0a4a3b5f0381d8c910a3e77a4fa3aa7e012f',0],
[758,'12862714b2e47a390cc175a51fc4582d522f804e03290abc96be4761fec7e5ae',1,'A.3','1859f171cf015ab1f4433cb4736ee5e775e65aff91a70d105015f6f662d8f844',0],
[761,'f5ec52502964f33fd640c31536ed9055e35529b51abb1d02247402916bcbc6a6',1,'NONE.2','5e8b8036a722fe1a61f4e4d42b08bde71187b9c29c0feb4c93c16366ae0194fc',0],
[763,'551735d3638bd7718cd818aa38a9fa2ede41bc06b23840cb6b358e8356ef0ecd',1,'NONE.2','e8e984d0811cca1dd03acaf99072168c1e4cc60ef64b4de4a0aef842dfc26056',0],
[764,'83fb1553a0210c1a82e5760e2664d28df565127e870fef743346b4bb30953bd8',1,'A.1','493681cf926bddef124fac9b9a49919c1e6fc9c73acec1e016adfd38fa80ce2c',0]];
export const statements={
754:'Dada la recta r definida por frac{x+7}{2}=frac{y−7}{−1}=z y la recta s definida por system{x=2;y=−5;z=λ}.\na) Halla la ecuación de la recta que corta perpendicularmente a ambas.\nb) Calcula la distancia entre r y s.',
755:'Dadas las matrices A=matrix{a,1,1;1,a,1;1,1,a} y X=matrix{x;y;z}.\na) Encuentra los valores de a para los que el sistema dado por AX=2X tiene infinitas soluciones.\nb) Para a=0, si es posible, resuelve AX=2X.',
756:'Dada la matriz A=matrix{0,3,4;1,−4,−5;−1,3,4}.\na) Demuestra que se verifica la igualdad A³=−I, siendo I la matriz identidad de orden 3.\nb) Justifica que A es invertible y halla su inversa.\nc) Calcula razonadamente A¹⁰⁰.',
758:'Considera las matrices A=matrix{−1,1,2;−2,2,4;1,−1,−2}, B=matrix{1;2;−1}, M=matrix{−1,1,2} y X=matrix{x;y;z}.\na) Calcula BM.\nb) Razona si el sistema dado por AX=B tiene solución o no y, en caso afirmativo, cuántas soluciones tiene.\nc) Resuelve AX=B.',
761:'Determina la única función derivable f:ℝ→ℝ que cumple que f(0)=1, f′(0)=1 y f″(x)=e^x(x+2).',
763:'Calcula ∫ frac{−x²}{x²+x−2} dx.',
764:'Calcula lim_{x→0} frac{cos(x)−e^{−2x}−2x}{sen²(x)}.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_EIGENPOWERS_RATIONAL_LIMITS_LAYOUT']]:[];
export const cases=[{index:754,slot:4,literals:['x+7','y−7','x=2','y = −5','corta perpendicularmente']},{index:755,slot:1,literals:['AX = 2X','a = 0','inﬁnitas soluciones']},{index:756,slot:1,literals:['A3 = −I','A100','−4 −5']},{index:758,slot:1,literals:['Calcula BM','AX = B','Resuelve']},{index:761,slot:3,literals:['f (0) = 1','ex(x + 2)']},{index:763,slot:3,literals:['−x2 dx','x2 + x − 2']},{index:764,slot:2,literals:['cos(x) − e−2 x − 2 x','sen (x)2']}];
export const proof=c=>({754:{R:[5,1,6],S:[2,-5,6],direction:[1,2,0],distance:3*Math.sqrt(5)},755:{singular:[0,3],kernelAtZero:[1,1,1]},756:{A:[[0,3,4],[1,-4,-5],[-1,3,4]],square:[[-1,0,1],[1,4,4],[-1,-3,-3]],inverse:[[1,0,-1],[-1,-4,-4],[1,3,3]],power100:[[0,-3,-4],[-1,4,5],[1,-3,-4]]},758:{A:[[-1,1,2],[-2,2,4],[1,-1,-2]],B:[[1],[2],[-1]],M:[[-1,1,2]],rank:1},761:{firstConstant:0,secondConstant:1},763:{quotient:-1,poleMinus2Coefficient:4/3,pole1Coefficient:-1/3,excluded:[-2,1]},764:{numeratorSecond:-5,denominatorSecond:2,limit:-2.5}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'INDEPENDENT_EXACT_MATRIX_PROJECTION_AND_DERIVATIVE_CHECK',proof(c));switch(c.index){
case 754:return[mk(0,'Recta: (x,y,z)=(5,1,6)+t(1,2,0).',['Recta: (x,y,z)=(5,1,6)+t(2,−1,0).','Recta: (x,y,z)=(5,1,6)+t(1,2,1).','Recta: (x,y,z)=(−7,7,0)+t(1,2,0).'],['Usar una dirección paralela a la proyección de r, no perpendicular.','Introducir una componente vertical incompatible con perpendicularidad a s.','Tomar el punto base de r sin imponer que la recta corte también a s.'],[
['Parametrizamos ambas rectas y tomamos un punto genérico en cada una.','R(t)=(−7+2t,7−t,t); S(u)=(2,−5,u)'],
['El segmento que une los pies debe ser perpendicular a las dos direcciones.','RS=(9−2t,t−12,u−t); dᵣ=(2,−1,1); dₛ=(0,0,1)'],
['Imponemos primero perpendicularidad a la vertical y después a r.','RS·dₛ=u−t=0; RS·dᵣ=2(9−2t)−(t−12)+(u−t)=0'],
['Sustituimos u=t y resolvemos la ecuación restante.','30−5t=0 ⇒ t=u=6; R=(5,1,6); S=(2,−5,6)'],
['La diferencia de los pies es proporcional a una dirección más sencilla.','S−R=(−3,−6,0)=−3(1,2,0) ⇒ (x,y,z)=(5,1,6)+v(1,2,0)'],
['Comprobamos las intersecciones y las dos perpendicularidades.','v=0 ⇒ R∈r; v=−3 ⇒ S∈s; (1,2,0)·(2,−1,1)=0; (1,2,0)·(0,0,1)=0'],
]),mk(1,'d(r,s)=3√5.',['d(r,s)=√5.','d(r,s)=15.','d(r,s)=3√6.'],['Olvidar el factor tres del segmento entre los pies.','Omitir la norma del producto vectorial en el denominador.','Usar la norma de dᵣ en vez de la norma de la perpendicular.'],[
['Usamos los pies de la perpendicular común hallados en el apartado anterior.','R=(5,1,6); S=(2,−5,6)'],
['La distancia mínima es la longitud de ese segmento.','d(r,s)=‖S−R‖'],
['Calculamos la norma a partir de las tres diferencias de coordenadas.','S−R=(−3,−6,0) ⇒ d=√(9+36)=√45=3√5'],
['Comprobamos independientemente mediante el producto mixto de las direcciones y los puntos base.','P=(−7,7,0); Q=(2,−5,0); Q−P=(9,−12,0)'],
['El producto vectorial de las direcciones es perpendicular a ambas.','dᵣ×dₛ=(−1,−2,0); (Q−P)·(dᵣ×dₛ)=−9+24=15'],
['Dividimos el valor absoluto del producto mixto entre la norma de la normal común.','d=frac{|15|}{√5}=3√5'],
])];
case 755:return[mk(0,'Infinitas soluciones exactamente para a=0 o a=3.',['Infinitas soluciones exactamente para a=1 o a=−2.','Infinitas soluciones exactamente para a=0 o a=−3.','Infinitas soluciones exactamente para a=2 o a=3.'],['Anular det A en vez de det(A−2I).','Cambiar el signo de la raíz repetida.','Olvidar el efecto de las entradas no diagonales en una raíz.'],[
['Trasladamos 2X al primer miembro: el sistema es homogéneo.','(A−2I)X=0; A−2I=matrix{a−2,1,1;1,a−2,1;1,1,a−2}'],
['La matriz ampliada tiene columna nula, por lo que los rangos siempre coinciden. Habrá infinitas soluciones cuando el rango sea menor que tres.','rango(A−2I)=rango(A−2I|0); infinitas soluciones ⇔ det(A−2I)=0'],
['Expandimos el determinante de la matriz con diagonal d=a−2.','det=d(d²−1)−(d−1)+(1−d)=d³−3d+2'],
['Factorizamos y volvemos al parámetro original.','d³−3d+2=(d−1)²(d+2) ⇒ det(A−2I)=(a−3)²a'],
['Las únicas raíces reales son cero y tres. En cero un menor de orden dos vale tres; en tres todas las entradas son uno.','a=0 ⇒ rango=2; a=3 ⇒ rango=1'],
['Aplicamos Rouché–Frobenius a los valores singulares y al resto.','a∈{0,3} ⇒ infinitas soluciones; a∉{0,3} ⇒ solución única X=0'],
]),mk(1,'Soluciones: (x,y,z)=t(1,1,1), t∈ℝ.',['Soluciones: (x,y,z)=t(1,−1,1), t∈ℝ.','Soluciones: (x,y,z)=t(1,1,−1), t∈ℝ.','Solución única: (x,y,z)=(0,0,0).'],['Cambiar el signo de la segunda coordenada de la dirección del núcleo.','Cambiar el signo de la tercera coordenada.','Perder las soluciones no nulas del sistema homogéneo singular.'],[
['Sustituimos a=0 y escribimos el sistema homogéneo completo.','system{−2x+y+z=0;x−2y+z=0;x+y−2z=0}'],
['Restamos la segunda ecuación de la primera.','−3x+3y=0 ⇒ y=x'],
['Restamos la tercera de la segunda.','−3y+3z=0 ⇒ z=y'],
['Las tres coordenadas son iguales; elegimos una como parámetro libre.','x=y=z=t ⇒ (x,y,z)=t(1,1,1)'],
['La sustitución en las tres ecuaciones da identidades para cualquier t.','−2t+t+t=0; t−2t+t=0; t+t−2t=0'],
['Comprobamos directamente el problema original, no solo el sistema trasladado.','A·matrix{t;t;t}=matrix{2t;2t;2t}=2X; t∈ℝ'],
])];
case 756:return[mk(0,'A²=matrix{−1,0,1;1,4,4;−1,−3,−3}; A³=−I.',['A²=matrix{1,0,−1;−1,−4,−4;1,3,3}; A³=I.','A²=matrix{−1,0,1;1,4,4;−1,−3,−3}; A³=I.','A²=matrix{−1,1,−1;0,4,−3;1,4,−3}; A³=−I.'],['Cambiar el signo del producto cuadrado y del cubo.','Perder el signo negativo del cubo.','Transponer el cuadrado al confundir filas con columnas.'],[
['Multiplicamos filas de A por columnas de A para calcular el cuadrado.','(A²)ᵢⱼ=Σₖ aᵢₖaₖⱼ'],
['La primera fila del cuadrado sale de tres productos escalares.','(0,3,4)·(0,1,−1)=−1; (0,3,4)·(3,−4,3)=0; (0,3,4)·(4,−5,4)=1'],
['Completamos las restantes filas del cuadrado.','A²=matrix{−1,0,1;1,4,4;−1,−3,−3}'],
['Multiplicamos A² por A. Las dos primeras filas dan las filas primera y segunda de −I.','(−1,0,1)A=(−1,0,0); (1,4,4)A=(0,−1,0)'],
['Calculamos también la tercera fila sin inferirla por el resultado pedido.','(−1,−3,−3)A=(0,0,−1)'],
['Reunimos las tres filas: se demuestra la identidad mediante el producto completo.','A³=matrix{−1,0,0;0,−1,0;0,0,−1}=−I'],
]),mk(1,'A⁻¹=matrix{1,0,−1;−1,−4,−4;1,3,3}.',['A⁻¹=matrix{−1,0,1;1,4,4;−1,−3,−3}.','A⁻¹=matrix{0,−3,−4;−1,4,5;1,−3,−4}.','A⁻¹=matrix{1,−1,1;0,−4,3;−1,−4,3}.'],['Usar A² sin cambiar su signo.','Confundir −A con −A².','Transponer la inversa encontrada.'],[
['Partimos de la identidad ya demostrada por multiplicación.','A³=−I'],
['Cambiamos de signo y agrupamos los factores a ambos lados.','A(−A²)=−A³=I; (−A²)A=I'],
['La matriz −A² es una inversa bilateral, luego A es invertible.','A⁻¹=−A²'],
['Cambiamos el signo de cada entrada del cuadrado calculado.','A⁻¹=matrix{1,0,−1;−1,−4,−4;1,3,3}'],
['Otra comprobación de invertibilidad utiliza determinantes.','(det A)³=det(−I)=−1 ⇒ det A=−1≠0'],
['La verificación por producto descarta confundir inversa y traspuesta.','A·A⁻¹=A⁻¹·A=matrix{1,0,0;0,1,0;0,0,1}'],
]),mk(2,'A¹⁰⁰=matrix{0,−3,−4;−1,4,5;1,−3,−4}.',['A¹⁰⁰=matrix{0,3,4;1,−4,−5;−1,3,4}.','A¹⁰⁰=matrix{1,0,0;0,1,0;0,0,1}.','A¹⁰⁰=matrix{1,0,−1;−1,−4,−4;1,3,3}.'],['Olvidar que el cociente 33 es impar.','Eliminar el factor A del resto uno.','Usar resto dos en vez de uno al dividir 100 entre tres.'],[
['La identidad A³=−I reduce cualquier potencia a un exponente pequeño.','100=3·33+1'],
['Separamos el exponente en múltiplo de tres y resto.','A¹⁰⁰=(A³)³³A'],
['Sustituimos la potencia conocida.','A¹⁰⁰=(−I)³³A'],
['El exponente 33 es impar: queda −I multiplicando a A.','(−I)³³=−I ⇒ A¹⁰⁰=−A'],
['Escribimos la matriz resultado cambiando todos los signos.','A¹⁰⁰=matrix{0,−3,−4;−1,4,5;1,−3,−4}'],
['Comprobamos usando el periodo seis, obtenido al elevar A³ al cuadrado.','A⁶=I; 100=6·16+4 ⇒ A¹⁰⁰=A⁴=A³A=−A'],
])];
case 758:return[mk(0,'BM=matrix{−1,1,2;−2,2,4;1,−1,−2}.',['BM=matrix{−1,−2,1;1,2,−1;2,4,−2}.','BM=matrix{1,−1,−2;2,−2,−4;−1,1,2}.','BM=matrix{−1,1,2;−2,2,4;−1,1,2}.'],['Transponer el producto exterior.','Cambiar globalmente el signo del producto.','Usar +1 en la tercera entrada de B en vez de −1.'],[
['B es una columna y M una fila, por lo que BM es de orden tres.','B:3×1; M:1×3 ⇒ BM:3×3'],
['Cada fila del producto es M multiplicada por la entrada correspondiente de B.','(BM)ᵢⱼ=Bᵢ₁M₁ⱼ'],
['Calculamos la primera fila.','1·(−1,1,2)=(−1,1,2)'],
['Calculamos la segunda y tercera, conservando el signo de −1.','2·(−1,1,2)=(−2,2,4); −1·(−1,1,2)=(1,−1,−2)'],
['Reunimos las filas en una matriz y reconocemos A.','BM=matrix{−1,1,2;−2,2,4;1,−1,−2}=A'],
['Comprobamos por columnas: son −B, B y 2B.','BM=(−B | B | 2B)'],
]),mk(1,'Compatible indeterminado: rango(A)=rango(A|B)=1; dos parámetros libres.',['Compatible determinado: rango(A)=rango(A|B)=3; sin parámetros libres.','Incompatible: rango(A)=1 y rango(A|B)=2.','Compatible indeterminado: rango(A)=rango(A|B)=2; un parámetro libre.'],['Contar el número de filas como rango.','No comprobar que B conserva las dependencias entre filas.','Contar dos filas proporcionales como independientes.'],[
['Escribimos la matriz ampliada para discutir el sistema mediante Rouché–Frobenius.','(A|B)=matrix{−1,1,2,1;−2,2,4,2;1,−1,−2,−1}'],
['Las filas segunda y tercera son múltiplos de la primera, también en la columna independiente.','F₂=2F₁; F₃=−F₁'],
['Anulamos esas dos filas por operaciones elementales.','F₂←F₂−2F₁; F₃←F₃+F₁ ⇒ matrix{−1,1,2,1;0,0,0,0;0,0,0,0}'],
['La primera fila no es nula. Ambos rangos valen exactamente uno.','rango(A)=rango(A|B)=1'],
['Los rangos coinciden y son menores que el número de incógnitas: hay infinitas soluciones.','1<3 ⇒ compatible indeterminado; parámetros libres=3−1=2'],
['El vector (−1,0,0) confirma directamente la compatibilidad.','A·matrix{−1;0;0}=matrix{1;2;−1}=B'],
]),mk(2,'(x,y,z)=(s+2t−1,s,t), s,t∈ℝ.',['(x,y,z)=(s+2t+1,s,t), s,t∈ℝ.','(x,y,z)=(s−2t−1,s,t), s,t∈ℝ.','(x,y,z)=(−s−2t+1,s,t), s,t∈ℝ.'],['Cambiar el signo del término independiente al despejar x.','Cambiar el signo de la contribución de z.','No cambiar todos los signos al dividir por −1.'],[
['La reducción del apartado anterior deja una sola ecuación independiente.','−x+y+2z=1'],
['Elegimos y y z como parámetros libres; no añadimos condiciones inexistentes.','y=s; z=t; s,t∈ℝ'],
['Despejamos x de la ecuación restante.','−x=1−s−2t ⇒ x=s+2t−1'],
['Expresamos todas las soluciones, no solo un ejemplo.','(x,y,z)=(s+2t−1,s,t)'],
['Verificamos la primera ecuación con los dos parámetros.','−(s+2t−1)+s+2t=1'],
['Las restantes son el doble y el opuesto de la primera; se cumplen con los términos independientes correctos.','−2x+2y+4z=2; x−y−2z=−1'],
])];
case 761:return[mk(0,'f(x)=xe^x+1.',['f(x)=(x+1)e^x.','f(x)=xe^x.','f(x)=xe^x+x+1.'],['Integrar dos veces sin reducir correctamente el factor lineal.','Olvidar la segunda condición inicial.','No imponer f′(0)=1 a la primera constante de integración.'],[
['El PDF indica f″, además de dos condiciones iniciales distintas. Integramos primero la segunda derivada.','f″(x)=e^x(x+2); f(0)=1; f′(0)=1'],
['Para ∫xe^x dx usamos partes: u=x, dv=e^x dx. Añadimos ∫2e^x dx.','∫xe^x dx=xe^x−e^x ⇒ f′(x)=e^x(x+1)+C₁'],
['Aplicamos la condición sobre la primera derivada.','f′(0)=1+C₁=1 ⇒ C₁=0'],
['Integramos otra vez; las primitivas de xe^x y e^x cancelan sus términos constantes exponenciales.','f(x)=xe^x−e^x+e^x+C₂=xe^x+C₂'],
['Aplicamos la condición sobre la función.','f(0)=C₂=1 ⇒ f(x)=xe^x+1'],
['La derivación verifica ambas condiciones y la ecuación; las dos constantes fijadas prueban unicidad.','f′(x)=(x+1)e^x; f″(x)=(x+2)e^x; f(0)=f′(0)=1'],
])];
case 763:return[mk(0,'−x+frac{4}{3}ln|x+2|−frac{1}{3}ln|x−1|+C.',['−x−frac{4}{3}ln|x+2|+frac{1}{3}ln|x−1|+C.','x+frac{4}{3}ln|x+2|−frac{1}{3}ln|x−1|+C.','−x+frac{1}{3}ln|x+2|−frac{4}{3}ln|x−1|+C.'],['Cambiar el signo del resto al dividir polinomios.','Usar +1 como cociente en lugar de −1.','Intercambiar los coeficientes de las fracciones simples.'],[
['El dominio excluye los ceros del denominador. Dividimos porque los grados son iguales.','x²+x−2=(x+2)(x−1); frac{−x²}{x²+x−2}=−1+frac{x−2}{(x+2)(x−1)}'],
['Descomponemos el resto en fracciones simples con constantes A y B.','frac{x−2}{(x+2)(x−1)}=frac{A}{x+2}+frac{B}{x−1}'],
['Igualamos coeficientes del numerador y resolvemos las dos ecuaciones.','x−2=A(x−1)+B(x+2) ⇒ A+B=1; −A+2B=−2 ⇒ A=frac{4}{3}; B=−frac{1}{3}'],
['Integramos los tres sumandos con valores absolutos en los logaritmos.','∫(−1+frac{4}{3(x+2)}−frac{1}{3(x−1)})dx=−x+frac{4}{3}ln|x+2|−frac{1}{3}ln|x−1|+C'],
['La constante es independiente en cada intervalo conexo del dominio.','x∈(−∞,−2), (−2,1) o (1,+∞)'],
['Comprobamos derivando y reuniendo los términos en el denominador original.','−1+frac{4}{3(x+2)}−frac{1}{3(x−1)}=frac{−(x²+x−2)+(x−2)}{x²+x−2}=frac{−x²}{x²+x−2}'],
])];
case 764:return[mk(0,'Límite=−frac{5}{2}.',['Límite=frac{3}{2}.','Límite=−5.','Límite=−frac{3}{2}.'],['Cambiar el signo de la segunda derivada del término exponencial negativo.','Omitir el factor dos de la segunda derivada del denominador.','Cambiar el signo de la segunda derivada del coseno.'],[
['Sustituimos cero para identificar la indeterminación antes de usar L’Hôpital, permitido en Matemáticas II.','cos 0−e⁰−0=0; sen²0=0 ⇒ 0/0'],
['Derivamos numerador y denominador por separado, aplicando la regla de la cadena.','N′(x)=−sen x+2e^{−2x}−2; D′(x)=2sen x cos x'],
['La primera aplicación vuelve a producir una indeterminación demostrada.','N′(0)=0+2−2=0; D′(0)=0 ⇒ 0/0'],
['Derivamos de nuevo; el signo y el factor de la exponencial son esenciales.','N″(x)=−cos x−4e^{−2x}; D″(x)=2(cos²x−sen²x)'],
['El denominador de la segunda razón tiende a dos y no se anula cerca de cero. Evaluamos el límite.','lim_{x→0}frac{N″(x)}{D″(x)}=frac{−1−4}{2(1−0)}=−frac{5}{2}'],
['Comprobamos independientemente con los términos cuadráticos: los términos lineales del numerador se cancelan.','cos x=1−frac{x²}{2}+o(x²); e^{−2x}=1−2x+2x²+o(x²); N(x)=−frac{5}{2}x²+o(x²); sen²x=x²+o(x²)'],
])];
default:throw Error('Unknown eigenpowers/rational/limits case');}}
export function buildEigenpowersRationalLimitsBatch(id='batch-0439',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Matrices y sistemas':c.slot===2?'Límites de funciones':c.slot===4?'Propiedades métricas':'Primitivas e integrales';x.secondaryTopics=[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_EIGENPOWERS_RATIONAL_LIMITS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildEigenpowersRationalLimitsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0439-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0439.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}

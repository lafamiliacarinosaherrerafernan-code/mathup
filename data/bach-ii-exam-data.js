// Ejercicios exactos extraídos de los bancos corregidos entregados por la usuaria.
// Solo se publican aquí los ejercicios cuya solución y cuatro opciones han sido revisadas.
(function () {
  const matesAnswers = {
    "mates2-algebra-f09b31d6e92e": {
      "Resultado": {
        options: [
          "Si a=10, el sistema es compatible determinado y (x,y,z)=(11,6,4). Si a≠10, es incompatible.",
          "Si a=10, el sistema es compatible indeterminado. Si a≠10, es compatible determinado.",
          "Para todo a, el sistema es compatible determinado y (x,y,z)=(11,6,4).",
          "Si a=10, el sistema es incompatible. Si a≠10, es compatible determinado."
        ],
        correct: 0,
        solution: `Resolución mediante el teorema de Rouché-Frobenius:
1. Escribimos la matriz de coeficientes y la matriz ampliada. Las matrices se representan con paréntesis:
A=[[1,-1,0],[0,1,1],[1,0,-2],[2,0,-3]],
A*=[[1,-1,0,5],[0,1,1,a],[1,0,-2,3],[2,0,-3,a]].

2. Calculamos el rango de A. Elegimos el menor de orden 3 formado por las tres primeras filas:
D=det [[1,-1,0],[0,1,1],[1,0,-2]].
Aplicamos la regla de Sarrus:
D=[1·1·(-2)+(-1)·1·1+0·0·1]-[0·1·1+1·1·0+(-2)·0·(-1)]
=(-2-1+0)-(0+0+0)=-3.
Como D=-3≠0 y A tiene tres columnas, rango(A)=3 para cualquier valor de a.

3. Calculamos el rango de la matriz ampliada. Para hallar det(A*) hacemos cero el elemento de la segunda fila y segunda columna mediante la operación:
F₂←F₂+F₁.
Esta operación no cambia el valor del determinante:
det(A*)=det [[1,-1,0,5],[1,0,1,a+5],[1,0,-2,3],[2,0,-3,a]].
Ahora desarrollamos por la segunda columna, que tiene un único elemento distinto de cero:
det(A*)=(-1)·(-1)^(1+2)·det [[1,1,a+5],[1,-2,3],[2,-3,a]]=det [[1,1,a+5],[1,-2,3],[2,-3,a]].
Aplicamos Sarrus al determinante de orden 3:
det(A*)=[1·(-2)·a+1·3·2+(a+5)·1·(-3)]
-[(a+5)·(-2)·2+1·1·a+1·3·(-3)]
=(-5a-9)-(-3a-29)=-2a+20=-2(a-10).

4. Discusión por Rouché-Frobenius:
• Si a≠10, det(A*)≠0 y rango(A*)=4. Como rango(A)=3≠rango(A*), el sistema es incompatible: no tiene solución.
• Si a=10, det(A*)=0. Como ya existe un menor de orden 3 no nulo, rango(A*)=rango(A)=3. Este rango coincide con el número de incógnitas, por lo que el sistema es compatible determinado: tiene una única solución.

5. Para a=10, la cuarta ecuación es combinación lineal de las tres primeras:
3E₄=E₁+E₂+5E₃.
Por tanto, resolvemos el sistema independiente:
{x-y=5; y+z=10; x-2z=3}.

6. Resolución por la regla de Cramer. Escribimos cada determinante en una sola línea y, justo debajo, la incógnita que calcula:
[[cramer-system-2000]]

También puede comprobarse por Gauss. Colocamos una matriz detrás de otra e indicamos entre ellas la operación elemental realizada:
[[gauss-system-2000]]

7. Comprobación en la ecuación que no hemos utilizado:
2x-3z=2·11-3·4=22-12=10=a.

Resultado final: si a=10, (x,y,z)=(11,6,4); si a≠10, el sistema no tiene solución.`
      }
    },
    "mates2-algebra-6c6f339e8058": {
      "Resultado": {
        options: [
          "X=[[1,-2,1],[0,-2,1],[0,-2,2]]",
          "X=[[1,0,0],[-2,-2,-2],[1,1,2]]",
          "X=[[-1,2,-1],[0,2,-1],[0,2,-2]]",
          "X=[[0,-2,1],[1,-2,1],[0,-2,2]]"
        ],
        correct: 0,
        solution: `Resolución:
1. Despejamos la matriz X respetando el orden de los productos. Partimos de:
A+BX=C.
Pasamos A al segundo miembro:
BX=C-A.
La incógnita X ya aparece en un único término y B es el factor que la multiplica por la izquierda. Por eso debemos multiplicar los dos miembros por B⁻¹ también por la izquierda:
B⁻¹BX=B⁻¹(C-A).
Como B⁻¹B=I:
IX=B⁻¹(C-A),
X=B⁻¹(C-A).
No podemos colocar B⁻¹ a la derecha porque el producto de matrices no es conmutativo.

2. Comprobamos que B tiene inversa calculando su determinante:
B=[[-1,1,0],[2,0,0],[-1,0,1]].
det B=det [[-1,1,0],[2,0,0],[-1,0,1]].
Aplicamos la regla de Sarrus:
det B=(-1)·0·1+1·0·(-1)+0·2·0-[0·0·(-1)+1·2·1+(-1)·0·0]=-2.
Como det B=-2≠0, existe B⁻¹.

3. Calculamos B⁻¹ mediante determinantes usando la nomenclatura del curso. Adj(B) es la matriz de adjuntos de B. En lugar de hallar los nueve adjuntos en una lista, colocamos cada uno en su posición dentro de la matriz. Cada entrada se obtiene mediante la fórmula Aᵢⱼ=(-1)^(i+j)·det(Mᵢⱼ), donde Mᵢⱼ es el menor que resulta de eliminar la fila i y la columna j:
[[cofactor-matrix-b]]
Así se ven simultáneamente el signo (-1)^(i+j), el menor de cada elemento, la matriz Adj(B) ya calculada y su traspuesta. En esta nomenclatura, Adj(B^T)=Adj(B)^T.
Aplicamos la fórmula de la inversa:
B⁻¹=frac{Adj(B^T)}{det B}=frac{1}{det B}·Adj(B^T)=frac{1}{-2}·[[0,-1,0],[-2,-1,0],[0,-1,-2]]
=[[0,frac{1}{2},0],[1,frac{1}{2},0],[0,frac{1}{2},1]].

4. Calculamos la diferencia C-A:
C-A=[[0,2,1],[1,2,0],[0,-1,3]]-[[1,2,1],[-1,6,-2],[1,-1,2]]
=[[-1,0,0],[2,-4,2],[-1,0,1]].

5. Sustituimos en X=B⁻¹(C-A) y efectuamos el producto fila por columna:
X=[[0,frac{1}{2},0],[1,frac{1}{2},0],[0,frac{1}{2},1]]·[[-1,0,0],[2,-4,2],[-1,0,1]]
=[[0·(-1)+frac{1}{2}·2+0·(-1),0·0+frac{1}{2}·(-4)+0·0,0·0+frac{1}{2}·2+0·1],
[1·(-1)+frac{1}{2}·2+0·(-1),1·0+frac{1}{2}·(-4)+0·0,1·0+frac{1}{2}·2+0·1],
[0·(-1)+frac{1}{2}·2+1·(-1),0·0+frac{1}{2}·(-4)+1·0,0·0+frac{1}{2}·2+1·1]]
=[[1,-2,1],[0,-2,1],[0,-2,2]].

6. Comprobamos la solución en la ecuación original:
BX=[[-1,1,0],[2,0,0],[-1,0,1]]·[[1,-2,1],[0,-2,1],[0,-2,2]]
=[[-1,0,0],[2,-4,2],[-1,0,1]]=C-A.
Por tanto:
A+BX=[[1,2,1],[-1,6,-2],[1,-1,2]]+[[-1,0,0],[2,-4,2],[-1,0,1]]
=[[0,2,1],[1,2,0],[0,-1,3]]=C.

Resultado final:
X=[[1,-2,1],[0,-2,1],[0,-2,2]].`
      }
    },
    "mates2-analisis-1b8a2884eef5": {
      "Resultado": {
        options: [
          "a=0 y b=3; es continua en ℝ y no es derivable en x=0 ni en x=1.",
          "a=0 y b=3; es derivable en x=0 y en x=1.",
          "a=3 y b=0; no es derivable en x=0.",
          "a=1 y b=2; no es continua en x=1."
        ],
        correct: 0,
        solution: `Resolución:
1. Cada una de las tres ramas es continua en el interior de su intervalo. Por tanto, solo debemos estudiar la continuidad y la derivabilidad en los puntos donde cambia la expresión: x=0 y x=1.

2. Estudiamos la continuidad en x=0.
Calculamos el límite por la izquierda usando la primera rama:
lim x→0- f(x)=lim x→0- x^2=0.
Calculamos el valor de la función. Como la primera rama incluye x=0:
f(0)=0^2=0.
Calculamos el límite por la derecha usando la segunda rama:
lim x→0+ f(x)=lim x→0+ (a+bx)=a.
Para que f sea continua en x=0 deben coincidir los tres valores:
lim x→0- f(x)=f(0)=lim x→0+ f(x).
Sustituimos los resultados obtenidos:
0=0=a.
Por tanto:
a=0.

3. Estudiamos la continuidad en x=1 de la misma forma.
Calculamos el límite por la izquierda usando la segunda rama:
lim x→1- f(x)=lim x→1- (a+bx)=a+b.
Calculamos el valor de la función. Como la segunda rama incluye x=1:
f(1)=a+b.
Calculamos el límite por la derecha usando la tercera rama:
lim x→1+ f(x)=lim x→1+ 3=3.
Para que f sea continua en x=1 deben coincidir los tres valores:
lim x→1- f(x)=f(1)=lim x→1+ f(x).
Sustituimos los resultados obtenidos:
a+b=a+b=3.
Por tanto:
a+b=3.
Como a=0:
0+b=3 ⇒ b=3.

4. Sustituimos a=0 y b=3. La función continua queda:
f(x)={x^2 si x≤0; 3x si 0<x≤1; 3 si x>1}.

5. Derivamos cada rama en el interior de su intervalo:
(x^2)'=2x,
(3x)'=3,
(3)'=0.
Por tanto, la función derivada por tramos es:
f'(x)={2x si x<0; 3 si 0<x<1; 0 si x>1}.

6. Estudiamos la derivabilidad en x=0 sustituyendo en la rama derivada correspondiente a cada lado:
f'(0-)=lim x→0- 2x=0,
f'(0+)=lim x→0+ 3=3.
Como f'(0-)≠f'(0+), la función no es derivable en x=0.

7. Estudiamos la derivabilidad en x=1 de la misma forma:
f'(1-)=lim x→1- 3=3,
f'(1+)=lim x→1+ 0=0.
Como f'(1-)≠f'(1+), la función no es derivable en x=1.

Resultado final:
a=0 y b=3. La función es continua en ℝ y es derivable en ℝ excepto en los puntos x=0 y x=1.`
      }
    },
    "mates2-analisis-d1eb1bbc2b2e": {
      "Resultado": {
        options: ["1/3", "1", "0", "3"],
        correct: 0,
        solution: `Resolución:
1. Sustituimos x=0:
frac{0-sen 0}{tg 0-sen 0}=frac{0}{0}.
Es una indeterminación 0/0, por lo que aplicamos la regla de L'Hôpital.
2. Derivamos por separado el numerador y el denominador. En este cociente resulta más claro usar la identidad:
(tg x)'=1+tg^2 x.
Por tanto:
lim x→0 frac{1-cos x}{1+tg^2 x-cos x}.
Al sustituir x=0 vuelve a aparecer la indeterminación 0/0.
3. Aplicamos L'Hôpital por segunda vez. Derivamos tg^2 x mediante la regla de la cadena:
(tg^2 x)'=2·tg x·(tg x)'=2·tg x·(1+tg^2 x).
Así obtenemos:
lim x→0 frac{sen x}{2·tg x·(1+tg^2 x)+sen x}.
Al sustituir x=0 aparece de nuevo 0/0.
4. Para evitar fracciones innecesarias, desarrollamos el producto del denominador antes de volver a derivar:
2·tg x·(1+tg^2 x)+sen x=2·tg x+2·tg^3 x+sen x.
5. Como todavía tenemos 0/0, aplicamos L'Hôpital por tercera vez. Derivamos cada término del denominador:
(2·tg x)'=2·(1+tg^2 x),
(2·tg^3 x)'=6·tg^2 x·(1+tg^2 x),
(sen x)'=cos x.
Por tanto:
lim x→0 frac{cos x}{2·(1+tg^2 x)+6·tg^2 x·(1+tg^2 x)+cos x}
=lim x→0 frac{cos x}{2+8·tg^2 x+6·tg^4 x+cos x}.
6. Sustituimos x=0:
frac{cos 0}{2+8·tg^2 0+6·tg^4 0+cos 0}=frac{1}{2+0+0+1}=frac{1}{3}.
Resultado final: el límite vale frac{1}{3}.`
      }
    },
    "mates2-analisis-f0d400cde4db": {
      "Resultado": {
        options: [
          "-1/6·ln|x|-2/15·ln|x+3|+3/10·ln|x-2|+C",
          "1/6·ln|x|+2/15·ln|x+3|-3/10·ln|x-2|+C",
          "-1/6·ln|x|-2/15·ln|x-3|+3/10·ln|x+2|+C",
          "ln|x^3+x^2-6x|+C"
        ],
        correct: 0,
        solution: `Resolución:
1. Factorizamos el denominador:
x^3+x^2-6x=x(x^2+x-6)=x(x+3)(x-2).
2. Descomponemos en fracciones simples:
frac{x+1}{x(x+3)(x-2)}=frac{A}{x}+frac{B}{x+3}+frac{C}{x-2}.
Multiplicamos toda la igualdad por x(x+3)(x-2) para eliminar los denominadores:
x+1=A(x+3)(x-2)+Bx(x-2)+Cx(x+3).
3. Calculamos los coeficientes sustituyendo valores que anulan dos de los tres términos.
Para x=0:
0+1=A(0+3)(0-2)+B·0·(0-2)+C·0·(0+3),
1=-6A,
A=-frac{1}{6}.
Para x=-3:
-3+1=A·0·(-5)+B·(-3)·(-5)+C·(-3)·0,
-2=15B,
B=-frac{2}{15}.
Para x=2:
2+1=A·5·0+B·2·0+C·2·5,
3=10C,
C=frac{3}{10}.
4. Sustituimos los coeficientes en la descomposición:
frac{x+1}{x(x+3)(x-2)}=-frac{1}{6}·frac{1}{x}-frac{2}{15}·frac{1}{x+3}+frac{3}{10}·frac{1}{x-2}.
5. Calculamos las tres integrales por separado usando ∫frac{1}{x-a}dx=ln|x-a|+C:
Primera integral:
-frac{1}{6}·∫frac{1}{x}dx=-frac{1}{6}·ln|x|.
Segunda integral:
-frac{2}{15}·∫frac{1}{x+3}dx=-frac{2}{15}·ln|x+3|.
Tercera integral:
frac{3}{10}·∫frac{1}{x-2}dx=frac{3}{10}·ln|x-2|.
6. Sumamos las tres primitivas y añadimos una única constante de integración:
I=-frac{1}{6}·ln|x|-frac{2}{15}·ln|x+3|+frac{3}{10}·ln|x-2|+C.
Comprobación: al derivar la expresión obtenida se recupera frac{x+1}{x^3+x^2-6x}.
Resultado final:
I=-frac{1}{6}·ln|x|-frac{2}{15}·ln|x+3|+frac{3}{10}·ln|x-2|+C.`
      }
    },
    "mates2-analisis-6ce41777cc5a": {
      "Resultado": {
        options: ["1/3 unidades cuadradas", "2/3 unidades cuadradas", "1/6 unidades cuadradas", "1 unidad cuadrada"],
        correct: 0,
        solution: `Resolución:
1. Buscamos los puntos de corte resolviendo x^2=|x|.
Para x≥0: x^2=x ⇒ x=0 o x=1.
Para x<0: x^2=-x ⇒ x=-1.
2. El recinto está entre x=-1 y x=1. En ese intervalo |x| queda por encima de x^2.
3. Planteamos el área como función superior menos función inferior. Como y=|x| e y=x^2 son funciones pares, el recinto es simétrico respecto del eje OY:
[[area-graph-abs-parabola]]
[[area-equation-abs-parabola]]
4. Calculamos una primitiva:
∫ (x-x^2) dx=frac{x^2}{2}-frac{x^3}{3}.
5. Aplicamos la regla de Barrow:
Área=2·[frac{x^2}{2}-frac{x^3}{3}]_{0}^{1}
=2·(frac{1}{2}-frac{1}{3})=2·frac{1}{6}=frac{1}{3}.
6. Para dibujar el recinto, representamos y=x^2 y las dos semirrectas de y=|x|; se cortan en (-1,1), (0,0) y (1,1).
Resultado final: el área es frac{1}{3} unidades cuadradas.`
      }
    },
    "mates2-geometria-fc225200bdd9": {
      "Resultado": {
        options: [
          "d(P,π)=2 y el punto más próximo es Q=(frac{20}{13},frac{44}{13},-frac{11}{13})",
          "d(P,π)=26 y Q=(frac{20}{13},frac{44}{13},-frac{11}{13})",
          "d(P,π)=2 y Q=(frac{26}{13},frac{52}{13},frac{13}{13})",
          "d(P,π)=13 y Q=(2,4,1)"
        ],
        correct: 0,
        solution: `Resolución:
1. El plano es π:3x+4y+12z-8=0 y P=(2,4,1).
[[point-plane-distance plane="π: 3x+4y+12z-8=0" p="P(2,4,1)" q="Q(20/13,44/13,-11/13)"]]
2. Aplicamos la fórmula de la distancia de un punto a un plano:
d(P,π)=frac{|Ax_0+By_0+Cz_0+D|}{sqrt(A^2+B^2+C^2)}.
Sustituimos los datos:
d(P,π)=frac{|3·2+4·4+12·1-8|}{sqrt(3^2+4^2+12^2)}.
3. El numerador es |6+16+12-8|=26 y el denominador es sqrt(169)=13. Por tanto:
d(P,π)=frac{26}{13}=2.
4. El vector normal es n=(3,4,12). La recta perpendicular al plano que pasa por P es
r:(x,y,z)=(2,4,1)+t(3,4,12).
5. Sustituimos en el plano:
3(2+3t)+4(4+4t)+12(1+12t)-8=0.
Así, 26+169t=0 y t=-2/13.
6. El pie de la perpendicular es
Q=(2,4,1)-frac{2}{13}(3,4,12)=(frac{20}{13},frac{44}{13},-frac{11}{13}).
Comprobación: Q pertenece al plano y PQ es paralelo al vector normal.
Resultado final: d(P,π)=2 y Q=(frac{20}{13},frac{44}{13},-frac{11}{13}).`
      }
    },
    "mates2-geometria-802ade71bfe8": {
      "Resultado": {
        options: ["A′=(-2,9,-11)", "A′=(0,3,-3)", "A′=(2,-9,11)", "A′=(-2,3,-11)"],
        correct: 0,
        solution: `Resolución:
1. El plano es π:x-3y+4z+21=0 y su vector normal es n=(1,-3,4).
[[reflection-plane plane="π: x−3y+4z+21=0" a="A(2,−3,5)" q="Q(0,3,−3)" ap="A′(−2,9,−11)"]]
2. La recta perpendicular al plano que pasa por A=(2,-3,5) tiene como vector director n=(1,-3,4). Su ecuación en forma paramétrica es el sistema:
x=2+t
y=-3-3t
z=5+4t
3. Sustituimos las tres expresiones paramétricas de la recta en el plano:
(2+t)-3(-3-3t)+4(5+4t)+21=0.
2+t+9+9t+20+16t+21=0,
52+26t=0,
t=-2.
4. Sustituimos t=-2 en la recta para hallar su punto de corte con el plano:
Q=(2-2,-3-3(-2),5+4(-2))=(0,3,-3).
Este punto Q pertenece al plano y es el punto medio entre A y su simétrico A′.
5. Sea A′=(x,y,z). Como Q=(0,3,-3) es el punto medio de A=(2,-3,5) y A′, obtenemos el sistema de coordenadas:
frac{2+x}{2}=0
frac{-3+y}{2}=3
frac{5+z}{2}=-3
6. Despejamos cada coordenada por separado:
2+x=0, por tanto x=-2.
-3+y=6, por tanto y=9.
5+z=-6, por tanto z=-11.
Así, A′=(-2,9,-11).
Comprobación: Q=frac{A+A′}{2}=(0,3,-3), Q pertenece a π y el segmento AA′ es paralelo a n=(1,-3,4); por tanto, AA′ es perpendicular al plano.
Resultado final: A′=(-2,9,-11).`
      }
    },
    "mates2-probabilidad-estadistica-a1e0260fef2f": {
      "a)": {
        options: ["0,058", "0,038", "0,062", "0,094"],
        correct: 0,
        solution: `Resolución:
1. Sean N, C y S los sistemas de navegación, comunicaciones y soporte vital; K significa que la alerta es crítica.
2. Aplicamos la fórmula de la probabilidad total:
P(K)=P(N)P(K|N)+P(C)P(K|C)+P(S)P(K|S).
3. Sustituimos:
P(K)=0,50·0,04+0,30·0,06+0,20·0,10.
4. Calculamos: P(K)=0,020+0,018+0,020=0,058.
Resultado final: la probabilidad de que la alerta sea crítica es 0,058, es decir, un 5,8 %.`
      },
      "b)": {
        options: ["30/157≈0,1911", "10/47≈0,2128", "9/50=0,18", "1/5=0,20"],
        correct: 0,
        solution: `Resolución:
1. Queremos P(S|no K). Usamos la probabilidad condicionada:
P(S|no K)=P(S∩no K)/P(no K).
2. Del apartado anterior, P(no K)=1-0,058=0,942.
3. P(S∩no K)=P(S)P(no K|S)=0,20·0,90=0,18.
4. Dividimos:
P(S|no K)=0,18/0,942=180/942=30/157≈0,1911.
Resultado final: la probabilidad es 30/157, aproximadamente un 19,11 %.`
      }
    },
    "mates2-probabilidad-estadistica-3b5e40ab9b78": {
      "a)": {
        options: ["0,8186", "0,6827", "0,8413", "0,9545"],
        correct: 0,
        solution: `Resolución:
1. X sigue una distribución normal N(34,6). Para tipificar, introducimos directamente dentro de la probabilidad Z=frac{X−34}{6}:
P(28≤X≤46)=P(frac{28−34}{6}≤Z≤frac{46−34}{6}).
2. Simplificamos los dos extremos:
P(frac{28−34}{6}≤Z≤frac{46−34}{6})=P(−1≤Z≤2).
3. Expresamos el intervalo mediante probabilidades acumuladas:
P(−1≤Z≤2)=P(Z≤2)−P(Z≤−1).
4. Buscamos ambos valores en la tabla de la normal típica:
P(Z≤2)=0,9772 y P(Z≤−1)=0,1587.
5. Restamos:
P(28≤X≤46)=0,9772−0,1587=0,8185≈0,8186.
Resultado final: la probabilidad es aproximadamente 0,8186, es decir, un 81,86 %.`
      },
      "b)": {
        options: ["K=40 años", "K=28 años", "K=34 años", "K=46 años"],
        correct: 0,
        solution: `Resolución:
1. Se pide P(X>K)=0,1587; por tanto, P(X≤K)=1-0,1587=0,8413.
2. Llamamos k al valor tipificado que corresponde a K. Entonces:
P(Z≤k)=0,8413.
Buscamos 0,8413 en la tabla de la normal típica y obtenemos k=1.
3. Igualamos ese valor con la tipificación de K:
frac{K−34}{6}=k=1.
4. Despejamos:
K−34=6 y K=40.
Resultado final: K=40 años.`
      }
    },
    "ccss2-algebra-ed4a21357666": {
      "Resultado": {
        options: [
          "a=5 y b=1",
          "a=1 y b=5",
          "a=5 y b=-1",
          "a=-5 y b=1"
        ],
        correct: 0,
        solution: `Resolución:
1. Las matrices son A=[[1,3],[3,1]] y B=[[1,5],[a,b]]. Para que conmuten debe cumplirse AB=BA.
2. Calculamos ambos productos:
AB=[[1+3a,5+3b],[3+a,15+b]].
BA=[[16,8],[a+3b,3a+b]].
3. Igualamos los elementos que ocupan la misma posición. De 1+3a=16 obtenemos 3a=15 y a=5.
4. De 5+3b=8 obtenemos 3b=3 y b=1.
5. Comprobamos las otras dos igualdades:
3+a=a+3b ⇒ 3=3b, que se cumple para b=1.
15+b=3a+b ⇒ 15=3a, que se cumple para a=5.
Resultado final: a=5 y b=1.`
      }
    }
  };

  const ccssExtraAnswers = {
    "ccss2-algebra-09a8f9e9f584": {
      "a)": {
        options: [
          "(A-B)^2=[[9,8],[0,25]]",
          "(A-B)^2=[[9,1],[0,25]]",
          "(A-B)^2=[[3,8],[0,5]]",
          "(A-B)^2=[[9,0],[8,25]]"
        ],
        correct: 0,
        solution: `Resolución:
1. Restamos las matrices elemento a elemento:
A-B=[[2-(-1),4-3],[1-1,0-(-5)]]=[[3,1],[0,5]].
2. Elevamos al cuadrado multiplicando la matriz por sí misma:
(A-B)^2=[[3,1],[0,5]]·[[3,1],[0,5]].
3. Calculamos por filas y columnas:
(A-B)^2=[[3·3+1·0,3·1+1·5],[0·3+5·0,0·1+5·5]].
4. Simplificamos:
(A-B)^2=[[9,8],[0,25]].
Resultado final: (A-B)^2=[[9,8],[0,25]].`
      },
      "b)": {
        options: [
          "Sí, porque det((A-B)^2)=225≠0.",
          "No, porque det((A-B)^2)=0.",
          "No, porque la matriz no es cuadrada.",
          "Sí, porque todas las matrices cuadradas tienen inversa."
        ],
        correct: 0,
        solution: `Resolución:
1. Una matriz cuadrada tiene inversa si y solo si su determinante es distinto de cero.
2. Calculamos:
det([[9,8],[0,25]])=9·25-8·0=225.
3. Como 225≠0, la matriz es regular y tiene inversa.
Resultado final: sí se puede calcular la inversa de (A-B)^2.`
      },
      "c)": {
        options: [
          "Deben conmutar: AB=BA.",
          "Deben tener determinante cero.",
          "Deben ser matrices diagonales necesariamente.",
          "Deben cumplir A+B=0."
        ],
        correct: 0,
        solution: `Resolución:
1. Desarrollamos el cuadrado sin suponer que el producto de matrices es conmutativo:
(A-B)^2=(A-B)(A-B)=A^2-AB-BA+B^2.
2. Para que esta expresión sea A^2-2AB+B^2 necesitamos que -AB-BA=-2AB.
3. Sumando AB en ambos miembros se obtiene -BA=-AB; por tanto, BA=AB.
Resultado final: las matrices deben conmutar, es decir, AB=BA.`
      }
    },
    "ccss2-algebra-037ec10f1415": {
      "a)": {
        options: [
          "Vértices: (-1,-1), (1,1), (4,1) y (4,-1).",
          "Vértices: (-4,-1), (-1,1), (4,1) y (4,-1).",
          "Vértices: (-1,-1), (1,1), (4,4) y (4,-1).",
          "Vértices: (0,0), (1,1), (4,1) y (4,0)."
        ],
        correct: 0,
        solution: `Resolución:
1. La restricción x-y≥0 equivale a y≤x. Las otras restricciones forman el rectángulo -4≤x≤4, -1≤y≤1.
2. Dentro de ese rectángulo conservamos los puntos situados por debajo de la recta y=x.
3. La recta y=x corta a y=-1 en (-1,-1) y a y=1 en (1,1).
4. Los dos vértices derechos del rectángulo, (4,-1) y (4,1), también cumplen y≤x.
5. La región factible es el cuadrilátero limitado por esos cuatro puntos.
Resultado final: los vértices son (-1,-1), (1,1), (4,1) y (4,-1).`
      },
      "b)": {
        options: [
          "Máximo 16 en (-1,-1) y mínimo 1 en (4,1).",
          "Máximo 11 en (4,-1) y mínimo 4 en (1,1).",
          "Máximo 16 en (1,1) y mínimo 1 en (-1,-1).",
          "Máximo 10 en (0,0) y mínimo 1 en (4,1)."
        ],
        correct: 0,
        solution: `Resolución:
1. Una función lineal alcanza sus extremos en algún vértice de la región factible.
2. Evaluamos f(x,y)=-x-5y+10:
f(-1,-1)=1+5+10=16.
f(1,1)=-1-5+10=4.
f(4,1)=-4-5+10=1.
f(4,-1)=-4+5+10=11.
3. Comparamos los cuatro valores.
Resultado final: el máximo es 16 en (-1,-1) y el mínimo es 1 en (4,1).`
      }
    }
  };

  ccssExtraAnswers["ccss2-algebra-ed4a21357666"] = matesAnswers["ccss2-algebra-ed4a21357666"];
  delete matesAnswers["ccss2-algebra-ed4a21357666"];
  window.MATES_II_EXAM_ANSWERS = matesAnswers;
  window.CCSS_II_BLOCK_ANSWERS = Object.assign(window.CCSS_II_BLOCK_ANSWERS || {}, ccssExtraAnswers);

  window.BACH_II_EXAM_CATALOG = {
    "2bach-mates": [
      { id: "mates2-algebra-f09b31d6e92e", block: "algebra", slot: 1, topics: [2] },
      { id: "mates2-algebra-6c6f339e8058", block: "algebra", slot: 1, topics: [0] },
      { id: "mates2-analisis-1b8a2884eef5", block: "analisis", slot: 2, topics: [7] },
      { id: "mates2-analisis-d1eb1bbc2b2e", block: "analisis", slot: 2, topics: [6] },
      { id: "mates2-analisis-f0d400cde4db", block: "analisis", slot: 3, topics: [10] },
      { id: "mates2-analisis-6ce41777cc5a", block: "analisis", slot: 3, topics: [11] },
      { id: "mates2-geometria-fc225200bdd9", block: "geometria", slot: 4, topics: [5] },
      { id: "mates2-geometria-802ade71bfe8", block: "geometria", slot: 4, topics: [5] },
      { id: "mates2-probabilidad-estadistica-a1e0260fef2f", block: "probabilidad-estadistica", slot: 5, topics: [12] },
      { id: "mates2-probabilidad-estadistica-3b5e40ab9b78", block: "probabilidad-estadistica", slot: 5, topics: [13] }
    ],
    "2bach-ccss": [
      { id: "ccss2-algebra-09a8f9e9f584", block: "algebra", slot: 1, topics: [0, 1] },
      { id: "ccss2-algebra-ed4a21357666", block: "algebra", slot: 1, topics: [0] },
      { id: "ccss2-algebra-e0c84e299fdc", block: "algebra", slot: 2, topics: [2] },
      { id: "ccss2-algebra-61d437e45a08", block: "algebra", slot: 2, topics: [2] },
      { id: "ccss2-algebra-c94f122fdea2", block: "algebra", slot: 2, topics: [2] },
      { id: "ccss2-algebra-d0d6b2a0f325", block: "algebra", slot: 2, topics: [2] },
      { id: "ccss2-algebra-037ec10f1415", block: "algebra", slot: 2, topics: [3] },
      { id: "ccss2-analisis-0f120e33fdda", block: "analisis", slot: 3, topics: [4] },
      { id: "ccss2-analisis-f6a8553df127", block: "analisis", slot: 3, topics: [5] },
      { id: "ccss2-analisis-767a8fb58506", block: "analisis", slot: 3, topics: [5] },
      { id: "ccss2-analisis-c34c65435289", block: "analisis", slot: 3, topics: [4, 5] },
      { id: "ccss2-probabilidad-5dc6ba7677cb", block: "probabilidad", slot: 4, topics: [8] },
      { id: "ccss2-probabilidad-d607c653c127", block: "probabilidad", slot: 4, topics: [8] },
      { id: "ccss2-probabilidad-6c5a846b3808", block: "probabilidad", slot: 4, topics: [8] },
      { id: "ccss2-probabilidad-e2438921b46c", block: "probabilidad", slot: 4, topics: [8] },
      { id: "ccss2-estadistica-b3229d8f9e13", block: "estadistica", slot: 5, topics: [10] },
      { id: "ccss2-estadistica-d1efc37d092e", block: "estadistica", slot: 5, topics: [10] },
      { id: "ccss2-estadistica-08846d68a2a8", block: "estadistica", slot: 5, topics: [10] },
      { id: "ccss2-estadistica-82c5844e2523", block: "estadistica", slot: 5, topics: [10] }
    ]
  };
})();

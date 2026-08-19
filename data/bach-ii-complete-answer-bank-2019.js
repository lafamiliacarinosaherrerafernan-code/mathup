// Banco operativo verificado de ejercicios oficiales de 2019.
// Se completa por bloques y se valida antes de avanzar al año siguiente.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};
  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-algebra-ab93184173bc": {
      "b)": {
        options: [
          "El sistema es incompatible: no tiene solución",
          "(x,y,z)=(1,0,4)",
          "El sistema es compatible indeterminado",
          "(x,y,z)=(-1,1,5)"
        ],
        correct: 0,
        solution: `Resolución:
1. Para a=1, el sistema queda
{ x+2y=1
  -x+y+z=5
  x-y-z=-3 }.
2. Sumamos las dos últimas ecuaciones:
(-x+y+z)+(x-y-z)=5+(-3)
0=2.
3. Ha aparecido una igualdad imposible. En la matriz ampliada esto equivale a una fila (0,0,0|2), por lo que
rg(A)=2 y rg(A*)=3.
4. Por el teorema de Rouché-Frobenius, como rg(A)≠rg(A*), el sistema es incompatible.
Resultado final: para a=1 el sistema no tiene solución.`
      }
    },

    "mates2-algebra-719a42f0ac16": {
      "a)": {
        options: [
          "A⁻¹=[[0,1,1],[0,2,1],[-1,-3,-2]]",
          "A⁻¹=[[0,0,-1],[1,2,-3],[1,1,-2]]",
          "A⁻¹=[[0,1,-1],[0,2,-3],[1,1,-2]]",
          "A no tiene inversa"
        ],
        correct: 0,
        solution: `Resolución:
1. La matriz es
A=[[-1,-1,-1],[-1,1,0],[2,-1,0]].
2. Calculamos su determinante mediante Sarrus:
det(A)=1≠0.
Por tanto, A es invertible.
3. Usamos la fórmula
A⁻¹=frac{Adj(A^T)}{det(A)}.
4. Calculamos la matriz de adjuntos:
Adj(A)=[[0,0,-1],[1,2,-3],[1,1,-2]].
5. La trasponemos:
Adj(A^T)=Adj(A)^T=[[0,1,1],[0,2,1],[-1,-3,-2]].
6. Como det(A)=1:
A⁻¹=frac{1}{1}·[[0,1,1],[0,2,1],[-1,-3,-2]]
=[[0,1,1],[0,2,1],[-1,-3,-2]].
Comprobación: A·A⁻¹=I₃.
Resultado final: A⁻¹=[[0,1,1],[0,2,1],[-1,-3,-2]].`
      },
      "b)": {
        options: [
          "X=[[3,2,8],[4,5,10],[-9,-12,-23]]",
          "X=[[3,4,-9],[2,5,-12],[8,10,-23]]",
          "X=[[1,2,2],[0,1,1],[1,-1,2]]",
          "X=[[-3,-2,-8],[-4,-5,-10],[9,12,23]]"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de A·X-2B=C y aislamos el término que contiene X:
A·X=C+2B.
2. Multiplicamos por A⁻¹ a la izquierda en ambos miembros:
A⁻¹A·X=A⁻¹(C+2B)
X=A⁻¹(C+2B).
3. Del apartado anterior:
A⁻¹=[[0,1,1],[0,2,1],[-1,-3,-2]].
4. Calculamos primero
C+2B=[[2,5,5],[1,3,2],[2,-1,6]].
5. Efectuamos el producto fila por columna:
X=[[0,1,1],[0,2,1],[-1,-3,-2]]·[[2,5,5],[1,3,2],[2,-1,6]]
=[[3,2,8],[4,5,10],[-9,-12,-23]].
Comprobación: al sustituir esta matriz, A·X-2B=C.
Resultado final: X=[[3,2,8],[4,5,10],[-9,-12,-23]].`
      }
    },

    "mates2-algebra-ae705f2ea550": {
      "b)": {
        options: [
          "(x,y,z)=(-6,-3,-4)",
          "(x,y,z)=(6,3,4)",
          "(x,y,z)=(-4,-3,-6)",
          "El sistema es incompatible"
        ],
        correct: 0,
        solution: `Resolución:
1. Para a=3, reunimos las tres ecuaciones:
{ x-2y-z=4
  x-2y+z=-4
  x-3y+3z=-9 }.
2. Aplicamos Gauss a la matriz ampliada:
[[1,-2,-1,4],[1,-2,1,-4],[1,-3,3,-9]].
3. Hacemos F₂←F₂-F₁ y F₃←F₃-F₁:
[[1,-2,-1,4],[0,0,2,-8],[0,-1,4,-13]].
4. De la segunda fila:
2z=-8 ⇒ z=-4.
5. De la tercera fila:
-y+4z=-13
-y-16=-13 ⇒ y=-3.
6. Sustituimos en la primera:
x-2(-3)-(-4)=4
x+10=4 ⇒ x=-6.
Comprobación: (-6,-3,-4) verifica las tres ecuaciones.
Resultado final: (x,y,z)=(-6,-3,-4).`
      }
    },

    "mates2-algebra-b3c3ddf90914": {
      "a)": {
        options: [
          "rg(A)=3 si a≠0,-2; rg(A)=2 si a=0 o a=-2",
          "rg(A)=3 para todo a",
          "rg(A)=2 si a=0; rg(A)=1 si a=-2",
          "rg(A)=3 si a≠2; rg(A)=2 si a=2"
        ],
        correct: 0,
        solution: `Resolución:
1. La matriz es
A=[[a,0,0],[0,1,a],[1,0,a+2]].
2. Calculamos su determinante. Al desarrollar por la primera fila:
det(A)=a·det[[1,a],[0,a+2]]
=a(a+2).
3. Si a≠0 y a≠-2, det(A)≠0 y, por tanto, rg(A)=3.
4. Si a=0:
A=[[0,0,0],[0,1,0],[1,0,2]].
El menor det[[0,1],[1,0]]=-1≠0, así que rg(A)=2.
5. Si a=-2:
A=[[-2,0,0],[0,1,-2],[1,0,0]].
El menor det[[-2,0],[0,1]]=-2≠0, pero det(A)=0; luego rg(A)=2.
Resultado final:
rg(A)=3 si a∉{0,-2}, y rg(A)=2 si a=0 o a=-2.`
      },
      "b)": {
        options: [
          "X=[[3/8,0,1/4],[1/16,1/2,-1/8]]",
          "X=[[1/2,0,0],[1/16,1/2,-1/8]]",
          "X=[[3/8,1/16],[0,1/2],[1/4,-1/8]]",
          "No existe una matriz X"
        ],
        correct: 0,
        solution: `Resolución:
1. Para a=1:
A=[[1,0,0],[0,1,1],[1,0,3]],
B=[[1,0,1],[0,1,0]].
2. Partimos de X·A=B-X y reunimos los términos con X:
X·A+X=B.
3. Sacamos X como factor común por la derecha:
X·(A+I₃)=B.
4. Multiplicamos por (A+I₃)⁻¹ a la derecha:
X·(A+I₃)·(A+I₃)⁻¹=B·(A+I₃)⁻¹
X=B·(A+I₃)⁻¹.
5. Tenemos
A+I₃=[[2,0,0],[0,2,1],[1,0,4]],
det(A+I₃)=16≠0.
6. Mediante la fórmula de la inversa:
(A+I₃)⁻¹=frac{Adj((A+I₃)^T)}{det(A+I₃)}
=[[1/2,0,0],[1/16,1/2,-1/8],[-1/8,0,1/4]].
7. Multiplicamos fila por columna:
X=[[1,0,1],[0,1,0]]·[[1/2,0,0],[1/16,1/2,-1/8],[-1/8,0,1/4]]
=[[3/8,0,1/4],[1/16,1/2,-1/8]].
Comprobación: X·A=B-X.
Resultado final: X=[[3/8,0,1/4],[1/16,1/2,-1/8]].`
      }
    }
  });

  // Matemáticas Aplicadas a las CCSS II · Análisis · 2019.
  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-analisis-e384dc7c5a83": {
      "a)": {
        options: [
          "t=7",
          "t=1",
          "t=-7",
          "No existe ningún valor de t"
        ],
        correct: 0,
        solution: `Resolución:
La función es:
f(x)={ x+t, si x≤-3
       4, si -3<x<3
       (x-4)²-5, si x≥3 }.

Para que sea continua en x=-3 deben coincidir el límite por la izquierda, el límite por la derecha y el valor de la función:

lim[x→-3⁻] f(x)=f(-3)=-3+t,
lim[x→-3⁺] f(x)=4.

Igualamos:
-3+t=4
t=7.

Resultado final: la función es continua en x=-3 cuando t=7.`
      },
      "b)": {
        options: [
          "Recta y=x+3 para x≤-3; tramo y=4 para -3<x<3; parábola y=(x-4)²-5 para x≥3",
          "Recta y=x-3 para x≤-3; tramo y=4; parábola y=(x+4)²-5 para x≥3",
          "Recta y=x+3 para x<-3; tramo y=-4; parábola y=(x-4)²+5 para x≥3",
          "Una única recta y=x+3 en todo ℝ"
        ],
        correct: 0,
        solution: `Resolución:
Para t=3:
f(x)={ x+3, si x≤-3
       4, si -3<x<3
       (x-4)²-5, si x≥3 }.

1. Primer tramo: y=x+3, para x≤-3.
Es una recta de pendiente 1. En x=-3 toma el valor 0, por lo que se marca el punto cerrado (-3,0).

2. Segundo tramo: y=4, para -3<x<3.
Es un segmento horizontal con puntos abiertos en (-3,4) y (3,4).

3. Tercer tramo: y=(x-4)²-5, para x≥3.
Es una parábola abierta hacia arriba, con vértice (4,-5). En x=3 toma el valor:
f(3)=(3-4)²-5=-4,
por lo que se marca el punto cerrado (3,-4).

La representación muestra saltos en x=-3 y x=3.
Resultado final: recta y=x+3, segmento y=4 y rama de la parábola y=(x-4)²-5 en los intervalos indicados.`
      }
    },

    "ccss2-analisis-b836d331db84": {
      "Resultado": {
        options: [
          "a=3, b=-6, c=4",
          "a=-3, b=6, c=4",
          "a=3, b=-3, c=1",
          "a=1, b=-2, c=4"
        ],
        correct: 0,
        solution: `Resolución:
Sea f(x)=ax²+bx+c.

1. La gráfica corta al eje de ordenadas en 4:
f(0)=4.
Como f(0)=c, obtenemos:
c=4.

2. El punto (1,1) pertenece a la gráfica:
f(1)=1.
Por tanto:
a+b+c=1.
Sustituyendo c=4:
a+b=-3.   (1)

3. Como en x=1 hay un mínimo, la primera derivada se anula:
f'(x)=2ax+b,
f'(1)=2a+b=0.   (2)

4. Resolvemos el sistema:
{ a+b=-3
  2a+b=0 }

Restando la primera ecuación de la segunda:
a=3.
Entonces:
b=-6.

5. Comprobamos que es un mínimo:
f''(x)=2a=6>0.

Resultado final: a=3, b=-6 y c=4.`
      }
    },

    "ccss2-analisis-e384dc7c5a83--ccss-ii-analisis-2": {
      "a)": {
        options: [
          "c=-1",
          "c=1",
          "c=-3",
          "No existe ningún valor de c"
        ],
        correct: 0,
        solution: `Resolución:
La función es:
f(x)={ -x-4, si x<c
       -3, si c≤x≤0
       x²-10x, si x>0 }.

Para estudiar la continuidad en x=c comparamos las dos ramas que se unen en ese punto:

lim[x→c⁻] f(x)=-c-4,
lim[x→c⁺] f(x)=f(c)=-3.

Igualamos:
-c-4=-3
-c=1
c=-1.

Comprobación:
lim[x→-1⁻] f(x)=-(-1)-4=-3
y f(-1)=-3.

Resultado final: c=-1.`
      },
      "b)": {
        options: [
          "Mínimo relativo en (5,-25)",
          "Máximo relativo en (5,-25)",
          "Mínimo relativo en (10,0)",
          "No tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
En el intervalo (0,+∞) la función es:
f(x)=x²-10x.

1. Derivamos:
f'(x)=2x-10.

2. Buscamos los puntos críticos:
2x-10=0
x=5.

3. Estudiamos el signo de f' en la recta real:

(0,5): tomamos x=1 ⇒ f'(1)=-8<0, la función decrece.
(5,+∞): tomamos x=6 ⇒ f'(6)=2>0, la función crece.

El signo cambia de negativo a positivo, luego en x=5 hay un mínimo relativo.

4. Calculamos la ordenada:
f(5)=5²-10·5=25-50=-25.

Resultado final: mínimo relativo en (5,-25).`
      },
      "c)": {
        options: [
          "Decrece en (0,5) y crece en (5,+∞)",
          "Crece en (0,5) y decrece en (5,+∞)",
          "Crece en todo (0,+∞)",
          "Decrece en todo (0,+∞)"
        ],
        correct: 0,
        solution: `Resolución:
En (0,+∞):
f(x)=x²-10x,
f'(x)=2x-10.

La derivada se anula en x=5. Marcamos ese valor en la recta real y comprobamos el signo:

0 ─────── 5 ───────── +∞
     −     0      +
     ↓            ↑

• En (0,5), por ejemplo x=1:
f'(1)=2-10=-8<0.
Por tanto, f decrece.

• En (5,+∞), por ejemplo x=6:
f'(6)=12-10=2>0.
Por tanto, f crece.

Resultado final: decrece en (0,5) y crece en (5,+∞).`
      }
    },

    "ccss2-analisis-b836d331db84--ccss-ii-analisis-2": {
      "a)": {
        options: [
          "Coste mínimo con 300 vehículos y máximo con 2700 vehículos",
          "Coste máximo con 300 vehículos y mínimo con 2700 vehículos",
          "Coste mínimo con 100 vehículos y máximo con 300 vehículos",
          "Ambos costes se alcanzan con 1500 vehículos"
        ],
        correct: 0,
        solution: `Resolución:
La variable x representa cientos de vehículos y:
C(x)=-x³+45x²-243x+500, 1≤x≤27.

1. Derivamos:
C'(x)=-3x²+90x-243
=-3(x²-30x+81)
=-3(x-3)(x-27).

2. Los puntos críticos del intervalo son:
x=3 y x=27.
Además, debemos estudiar los extremos x=1 y x=27.

3. Estudiamos el signo de C':

• En (1,3), tomamos x=2:
C'(2)=-3(2-3)(2-27)<0.
La función decrece.

• En (3,27), tomamos x=10:
C'(10)=-3(10-3)(10-27)>0.
La función crece.

Por tanto, en x=3 se alcanza el mínimo y en x=27, extremo derecho donde termina creciendo, se alcanza el máximo absoluto.

4. Pasamos a número de vehículos:
x=3 ⇒ 300 vehículos.
x=27 ⇒ 2700 vehículos.

Resultado final: coste mínimo con 300 vehículos y coste máximo con 2700 vehículos.`
      },
      "b)": {
        options: [
          "Mínimo: 149000 €; máximo: 7061000 €",
          "Mínimo: 301000 €; máximo: 7061000 €",
          "Mínimo: 149000 €; máximo: 4096000 €",
          "Mínimo: 7061000 €; máximo: 149000 €"
        ],
        correct: 0,
        solution: `Resolución:
Los costes vienen expresados en miles de euros.

1. Coste mínimo, para x=3:
C(3)=-(3)³+45(3)²-243·3+500
=-27+405-729+500
=149.

Por tanto:
149 miles de euros =149000 €.

2. Coste máximo, para x=27:
C(27)=-(27)³+45(27)²-243·27+500
=-19683+32805-6561+500
=7061.

Por tanto:
7061 miles de euros =7061000 €.

3. Comprobamos también el otro extremo:
C(1)=-1+45-243+500=301,
que queda entre los dos valores anteriores.

Resultado final: coste mínimo de 149000 € y coste máximo de 7061000 €.`
      }
    },

    "ccss2-analisis-d2c33b7d9bf9": {
      "a)": {
        options: [
          "c=1 o c=7",
          "Solo c=1",
          "Solo c=7",
          "c=-1 o c=-7"
        ],
        correct: 0,
        solution: `Resolución:
La función es:
f(x)={ 4x-frac{3}{2}, si x≤c
       (x-2)²+frac{3}{2}, si x>c }.

Para que sea continua en x=c igualamos las dos expresiones:

4c-frac{3}{2}=(c-2)²+frac{3}{2}.

Desarrollamos:
4c-frac{3}{2}=c²-4c+4+frac{3}{2}
4c-frac{3}{2}=c²-4c+frac{11}{2}.

Pasamos todos los términos al mismo miembro:
c²-8c+7=0.

Factorizamos:
(c-1)(c-7)=0.

Por tanto:
c=1 o c=7.

Resultado final: la función es continua para c=1 y para c=7.`
      },
      "b)": {
        options: [
          "Recta y=4x-3/2 para x≤1 y parábola y=(x-2)²+3/2 para x>1",
          "Recta y=4x+3/2 para x≤1 y parábola y=(x+2)²-3/2 para x>1",
          "Parábola para x≤1 y recta para x>1",
          "Una única recta y=4x-3/2"
        ],
        correct: 0,
        solution: `Resolución:
Para c=1:
f(x)={ 4x-frac{3}{2}, si x≤1
       (x-2)²+frac{3}{2}, si x>1 }.

1. La primera rama es la recta:
y=4x-frac{3}{2}.
Tiene pendiente 4 y corta al eje OY en (0,-frac{3}{2}). En x=1:
f(1)=4-frac{3}{2}=frac{5}{2}.
Se marca el punto cerrado (1,frac{5}{2}).

2. La segunda rama es la parábola:
y=(x-2)²+frac{3}{2}.
Está abierta hacia arriba y tiene vértice (2,frac{3}{2}). En x=1 también daría frac{5}{2}, pero esta rama solo se toma para x>1, así que su extremo es abierto.

3. Las dos ramas se unen en (1,frac{5}{2}), por lo que la gráfica es continua.

Resultado final: recta y=4x-frac{3}{2} para x≤1 y rama de la parábola y=(x-2)²+frac{3}{2} para x>1.`
      }
    },

    "ccss2-analisis-2e0a240c914e": {
      "a)": {
        options: [
          "A las 24 horas",
          "A las 16 horas",
          "A las 12 horas",
          "El virus no deja de propagarse"
        ],
        correct: 0,
        solution: `Resolución:
El número de ordenadores afectados es:
v(t)=48t²-2t³.

El virus deja de propagarse cuando ya no quedan ordenadores afectados según el modelo, es decir, cuando v(t)=0 después del instante inicial:

48t²-2t³=0
2t²(24-t)=0.

Las soluciones son:
t=0 y t=24.

t=0 es el instante en que se localiza el primer ordenador. El instante posterior buscado es:
t=24.

Resultado final: el virus deja de propagarse a las 24 horas.`
      },
      "b)": {
        options: [
          "Aumenta entre 0 y 16 h y disminuye entre 16 y 24 h",
          "Disminuye entre 0 y 16 h y aumenta entre 16 y 24 h",
          "Aumenta durante las 24 horas",
          "Disminuye durante las 24 horas"
        ],
        correct: 0,
        solution: `Resolución:
Consideramos el intervalo físico 0≤t≤24.

1. Derivamos:
v'(t)=96t-6t²
=6t(16-t).

2. La derivada se anula en:
t=0 y t=16.

3. Estudiamos su signo en la recta real:

0 ───────── 16 ───────── 24
       +      0       −
       ↑              ↓

• Para 0<t<16, tomamos t=1:
v'(1)=6·1·15>0.
La propagación aumenta.

• Para 16<t<24, tomamos t=20:
v'(20)=6·20·(-4)<0.
La propagación disminuye.

Resultado final: aumenta entre 0 y 16 horas y disminuye entre 16 y 24 horas.`
      },
      "c)": {
        options: [
          "A las 16 h, con 4096 ordenadores afectados",
          "A las 24 h, con 4096 ordenadores afectados",
          "A las 16 h, con 2048 ordenadores afectados",
          "A las 8 h, con 4096 ordenadores afectados"
        ],
        correct: 0,
        solution: `Resolución:
Del estudio del signo de la derivada:

• v crece antes de t=16.
• v decrece después de t=16.

Por tanto, en t=16 se alcanza el máximo.

Calculamos el número de ordenadores:
v(16)=48·16²-2·16³
=48·256-2·4096
=12288-8192
=4096.

Comprobación en los extremos:
v(0)=0,
v(24)=0.

Resultado final: el máximo se produce a las 16 horas y es de 4096 ordenadores afectados.`
      }
    },

    "ccss2-analisis-d2c33b7d9bf9--ccss-ii-analisis-2": {
      "a)": {
        options: [
          "t=-1 o t=0",
          "Solo t=3",
          "t=1 o t=0",
          "No existe ningún valor de t"
        ],
        correct: 0,
        solution: `Resolución:
La función es:
f(x)={ |x+2|+t, si x≤-1
       (x-t)², si x>-1 }.

Para que sea continua en x=-1:

f(-1)=|-1+2|+t=1+t,
lim[x→-1⁺] f(x)=(-1-t)²=(t+1)².

Igualamos:
1+t=(t+1)².

Llamamos u=t+1:
u=u²
u(u-1)=0.

Así:
u=0 ⇒ t=-1,
u=1 ⇒ t=0.

Resultado final: t=-1 o t=0.`
      },
      "b)": {
        options: [
          "Mínimo relativo en (3,0)",
          "Máximo relativo en (3,0)",
          "Mínimo relativo en (-3,0)",
          "No tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
Para t=3 y en el intervalo (-1,+∞), la función viene dada por:
f(x)=(x-3)².

1. Derivamos:
f'(x)=2(x-3).

2. Igualamos a cero:
2(x-3)=0
x=3.

3. Estudiamos el signo:
• En (-1,3), tomamos x=0:
f'(0)=-6<0, luego decrece.
• En (3,+∞), tomamos x=4:
f'(4)=2>0, luego crece.

El signo cambia de negativo a positivo: hay un mínimo relativo.

4. Calculamos la ordenada:
f(3)=(3-3)²=0.

Resultado final: mínimo relativo en (3,0).`
      },
      "c)": {
        options: [
          "Decrece en (-1,3) y crece en (3,+∞)",
          "Crece en (-1,3) y decrece en (3,+∞)",
          "Crece en todo (-1,+∞)",
          "Decrece en todo (-1,+∞)"
        ],
        correct: 0,
        solution: `Resolución:
Para t=3 y x>-1:
f(x)=(x-3)²,
f'(x)=2(x-3).

La derivada se anula en x=3. Estudiamos su signo:

-1 ───────── 3 ───────── +∞
       −       0      +
       ↓              ↑

• Si -1<x<3, por ejemplo x=0:
f'(0)=-6<0.
La función decrece.

• Si x>3, por ejemplo x=4:
f'(4)=2>0.
La función crece.

Resultado final: decrece en (-1,3) y crece en (3,+∞).`
      }
    },

    "ccss2-analisis-2e0a240c914e--ccss-ii-analisis-2": {
      "Resultado": {
        options: [
          "a=-3, b=4, c=0",
          "a=3, b=-4, c=0",
          "a=-3, b=4, c=1",
          "a=4, b=-3, c=0"
        ],
        correct: 0,
        solution: `Resolución:
Sea:
f(x)=ax⁴+bx³+cx+1.

1. Derivamos:
f'(x)=4ax³+3bx²+c.

2. Presenta un punto extremo en x=0, por lo que:
f'(0)=0
c=0.   (1)

3. Presenta un máximo en x=1, así que necesariamente:
f'(1)=0
4a+3b+c=0.
Como c=0:
4a+3b=0.   (2)

4. La pendiente de la tangente en x=-1 es 24:
f'(-1)=24
-4a+3b+c=24.
Como c=0:
-4a+3b=24.   (3)

5. Resolvemos el sistema:
{ 4a+3b=0
  -4a+3b=24 }

Sumando:
6b=24
b=4.

Sustituimos en 4a+3b=0:
4a+12=0
a=-3.

6. Comprobamos que x=1 es un máximo:
f''(x)=12ax²+6bx.
f''(1)=12(-3)+6·4=-36+24=-12<0.

Resultado final: a=-3, b=4 y c=0.`
      }
    }
  });

  // Matemáticas Aplicadas a las CCSS II · Probabilidad · 2019.
  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-probabilidad-3faa1c8d25e4": {
      "a)": {
        options: [
          "0,20",
          "0,30",
          "0,70",
          "0,90"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos:
L={le gusta la lectura},
C={le gusta el cine}.

Datos:
P(L)=0,40,
P(C)=0,50,
P(L∪C)=0,70.

Usamos la fórmula de la unión:
P(L∪C)=P(L)+P(C)-P(L∩C).

Sustituimos:
0,70=0,40+0,50-P(L∩C).

Despejamos:
P(L∩C)=0,40+0,50-0,70=0,20.

Resultado final: P(L∩C)=0,20, es decir, un 20 %.`
      },
      "b)": {
        options: [
          "0,50",
          "0,20",
          "0,40",
          "0,70"
        ],
        correct: 0,
        solution: `Resolución:
Se pide la probabilidad de que le guste el cine sabiendo que le gusta la lectura:

P(C|L)=frac{P(C∩L)}{P(L)}.

Del apartado anterior:
P(C∩L)=0,20
y P(L)=0,40.

Sustituimos:
P(C|L)=frac{0,20}{0,40}=0,50.

Resultado final: la probabilidad es 0,50, es decir, un 50 %.`
      }
    },

    "ccss2-probabilidad-3faa1c8d25e4--ccss-ii-probabilidad-2": {
      "a)": {
        options: [
          "0,14275",
          "0,15000",
          "0,00500",
          "0,00750"
        ],
        correct: 0,
        solution: `Resolución:
Definimos:
D={el alumno es deportista aficionado},
S={el alumno suspende}.

Datos:
P(D)=0,05,
P(no D)=0,95,
P(S|D)=0,005,
P(S|no D)=0,15.

Aplicamos el teorema de la probabilidad total:

P(S)=P(D)·P(S|D)+P(no D)·P(S|no D).

Sustituimos:
P(S)=0,05·0,005+0,95·0,15
=0,00025+0,14250
=0,14275.

Resultado final: P(S)=0,14275, es decir, un 14,275 %.`
      },
      "b)": {
        options: [
          "frac{1}{571}≈0,00175",
          "0,05",
          "0,005",
          "frac{1}{20}=0,05"
        ],
        correct: 0,
        solution: `Resolución:
Se pide P(D|S). Aplicamos el teorema de Bayes:

P(D|S)=frac{P(D)·P(S|D)}{P(S)}.

Sustituimos:
P(D|S)=frac{0,05·0,005}{0,14275}
=frac{0,00025}{0,14275}.

Multiplicando numerador y denominador por 100000:
P(D|S)=frac{25}{14275}
=frac{1}{571}
≈0,00175.

Resultado final: P(D|S)=frac{1}{571}≈0,00175, aproximadamente un 0,175 %.`
      }
    },

    "ccss2-probabilidad-203a52ea5c88": {
      "a)": {
        options: [
          "0,115",
          "0,500",
          "0,095",
          "0,020"
        ],
        correct: 0,
        solution: `Resolución:
Definimos:
C={crédito para comprar una casa},
I={crédito impagado}.

Datos:
P(C)=0,05,
P(no C)=0,95,
P(I|C)=0,40,
P(I|no C)=0,10.

Aplicamos la probabilidad total:

P(I)=P(C)·P(I|C)+P(no C)·P(I|no C).

Sustituimos:
P(I)=0,05·0,40+0,95·0,10
=0,020+0,095
=0,115.

Resultado final: la probabilidad de impago es 0,115, es decir, un 11,5 %.`
      },
      "b)": {
        options: [
          "frac{2}{59}≈0,0339",
          "frac{3}{20}=0,15",
          "frac{2}{23}≈0,0870",
          "0,40"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos P={el crédito se ha pagado}.

1. Calculamos la probabilidad de pago:
P(P)=1-P(I)=1-0,115=0,885.

2. Calculamos la probabilidad de que sea para una casa y esté pagado:
P(C∩P)=P(C)·P(P|C)
=0,05·(1-0,40)
=0,05·0,60
=0,03.

3. Aplicamos probabilidad condicionada:
P(C|P)=frac{P(C∩P)}{P(P)}
=frac{0,03}{0,885}
=frac{30}{885}
=frac{2}{59}
≈0,0339.

Resultado final: P(C|P)=frac{2}{59}≈0,0339, aproximadamente un 3,39 %.`
      }
    },

    "ccss2-probabilidad-203a52ea5c88--ccss-ii-probabilidad-2": {
      "a)": {
        options: [
          "frac{169}{729}≈0,2318",
          "frac{13}{27}≈0,4815",
          "frac{13}{27}·frac{12}{26}≈0,2222",
          "frac{196}{729}≈0,2689"
        ],
        correct: 0,
        solution: `Resolución:
Hay:
27 alumnos en total,
14 de Albacete,
27-14=13 que no son de Albacete.

Como las dos entradas pueden tocarle al mismo alumno, los dos sorteos se realizan con reposición: en ambos hay 27 posibles alumnos.

La probabilidad de que una entrada toque a alguien que no es de Albacete es:
frac{13}{27}.

Por independencia:
P(ambas para no Albacete)
=frac{13}{27}·frac{13}{27}
=frac{169}{729}
≈0,2318.

Resultado final: frac{169}{729}≈0,2318, aproximadamente un 23,18 %.`
      },
      "b)": {
        options: [
          "frac{1}{80730}≈0,00001239",
          "frac{5}{27}≈0,1852",
          "left(frac{5}{27}right)⁵≈0,0002177",
          "frac{5}{27}·frac{4}{26}≈0,02849"
        ],
        correct: 0,
        solution: `Resolución:
Hay 5 alumnos de Cuenca. Se sortean las entradas sin reposición, porque quien gana una entrada deja de participar.

Para que las cinco entradas sean para alumnos de Cuenca:

P=frac{5}{27}·frac{4}{26}·frac{3}{25}·frac{2}{24}·frac{1}{23}.

Multiplicamos:
P=frac{5·4·3·2·1}{27·26·25·24·23}
=frac{120}{9687600}.

Simplificamos:
P=frac{1}{80730}
≈0,00001239.

Resultado final: P=frac{1}{80730}≈0,00001239.`
      }
    }
  });

  // Matemáticas Aplicadas a las CCSS II · Estadística · 2019.
  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-estadistica-09d0edb875eb": {
      "a)": {
        options: [
          "(1,8911; 2,1089) horas",
          "(1,6733; 2,3267) horas",
          "(1,9456; 2,0544) horas",
          "(1,8000; 2,2000) horas"
        ],
        correct: 0,
        solution: `Resolución:
Datos:
x̄=2 horas,
σ=20 minutos=frac{20}{60}=frac{1}{3} hora,
n=36,
nivel de confianza=95 %.

1. Para un 95 % de confianza:
z_{α/2}=1,96.

2. Calculamos el error máximo admisible:
E=z_{α/2}·frac{σ}{sqrt{n}}
=1,96·frac{frac{1}{3}}{sqrt{36}}
=1,96·frac{1}{18}
≈0,1089 horas.

3. Construimos el intervalo:
IC=(x̄-E, x̄+E)
=(2-0,1089, 2+0,1089)
=(1,8911, 2,1089).

Resultado final: el intervalo de confianza es (1,8911; 2,1089) horas.`
      },
      "b)": {
        options: [
          "No; 2,3 queda fuera. La amplitud disminuye aumentando n y aumenta elevando el nivel de confianza",
          "Sí; 2,3 pertenece al intervalo. La amplitud no depende de n",
          "No; 2,3 queda fuera. La amplitud aumenta aumentando n",
          "Sí; toda media positiva es admisible con un 95 %"
        ],
        correct: 0,
        solution: `Resolución:
El intervalo obtenido al 95 % es:
(1,8911; 2,1089) horas.

1. Comprobamos μ=2,3:
2,3∉(1,8911; 2,1089).

Por tanto, con estos datos y este nivel de confianza, no se admite que la media poblacional sea 2,3 horas.

2. La amplitud del intervalo es:
A=2E=2z_{α/2}·frac{σ}{sqrt{n}}.

De esta fórmula se deduce:
• Para disminuir la amplitud, se puede aumentar el tamaño de la muestra n o disminuir el nivel de confianza.
• Para aumentar la amplitud, se puede disminuir n o aumentar el nivel de confianza.

Resultado final: no se admite μ=2,3 horas; la amplitud disminuye al aumentar la muestra y aumenta al elevar el nivel de confianza.`
      },
      "c)": {
        options: [
          "3,86 minutos",
          "1,93 minutos",
          "6,43 minutos",
          "3,92 minutos"
        ],
        correct: 0,
        solution: `Resolución:
Datos:
σ=20 minutos,
n=100,
nivel de confianza=94,64 %.

1. Calculamos:
1-α=0,9464
α=0,0536
frac{α}{2}=0,0268.

En la tabla buscamos:
P(Z≤z)=1-0,0268=0,9732.

El valor correspondiente es:
z=1,93.

2. Calculamos el error:
E=z·frac{σ}{sqrt{n}}
=1,93·frac{20}{sqrt{100}}
=1,93·frac{20}{10}
=3,86 minutos.

Resultado final: el error máximo admisible es 3,86 minutos.`
      }
    },

    "ccss2-estadistica-09d0edb875eb--ccss-ii-estadistica-2": {
      "a)": {
        options: [
          "0,700 g/l",
          "0,682 g/l",
          "0,718 g/l",
          "1,400 g/l"
        ],
        correct: 0,
        solution: `Resolución:
El intervalo de confianza tiene la forma:
(x̄-E, x̄+E).

Su centro es la media muestral:

x̄=frac{0,682+0,718}{2}
=frac{1,400}{2}
=0,700 g/l.

Resultado final: el contenido medio de grasas saturadas de la muestra es 0,700 g/l.`
      },
      "b)": {
        options: [
          "92,82 %",
          "95 %",
          "90 %",
          "97,32 %"
        ],
        correct: 0,
        solution: `Resolución:
Datos:
IC=(0,682;0,718),
x̄=0,700,
σ=0,1,
n=100.

1. Calculamos el error:
E=0,718-0,700=0,018.

2. Usamos:
E=z_{α/2}·frac{σ}{sqrt{n}}.

Despejamos z:
z_{α/2}=frac{E·sqrt{n}}{σ}
=frac{0,018·10}{0,1}
=1,8.

3. En la tabla:
P(Z≤1,8)=0,9641.

El nivel de confianza es el área central:
1-α=2·0,9641-1
=0,9282.

Resultado final: el nivel de confianza es 0,9282, es decir, 92,82 %.`
      },
      "c)": {
        options: [
          "IC=(0,6804;0,7196) g/l y tamaño mínimo n=385",
          "IC=(0,6820;0,7180) g/l y tamaño mínimo n=384",
          "IC=(0,6902;0,7098) g/l y tamaño mínimo n=196",
          "IC=(0,6804;0,7196) g/l y tamaño mínimo n=100"
        ],
        correct: 0,
        solution: `Resolución:
Este apartado reúne las preguntas c) y d) del enunciado.

c) Intervalo de confianza del 95 %

Datos:
x̄=0,700,
σ=0,1,
n=100,
z_{α/2}=1,96.

Calculamos el error:
E=1,96·frac{0,1}{sqrt{100}}
=1,96·frac{0,1}{10}
=0,0196.

Por tanto:
IC=(0,700-0,0196, 0,700+0,0196)
=(0,6804;0,7196) g/l.

d) Tamaño mínimo para que E<0,01

Partimos de:
1,96·frac{0,1}{sqrt{n}}<0,01.

Despejamos:
sqrt{n}>frac{1,96·0,1}{0,01}=19,6,
n>19,6²=384,16.

El menor número entero que cumple la desigualdad es:
n=385.

Resultado final: IC=(0,6804;0,7196) g/l y tamaño mínimo n=385.`
      }
    },

    "ccss2-estadistica-8b549c3ba390": {
      "a)": {
        options: [
          "(77,14; 90,86) gramos",
          "(80,90; 87,10) gramos",
          "(74,00; 94,00) gramos",
          "(78,80; 89,20) gramos"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos la media muestral:

x̄=frac{60+80+120+95+65+70+75+85+100+90}{10}
=frac{840}{10}
=84 gramos.

2. Para un nivel de confianza del 97 %:
1-α=0,97,
frac{α}{2}=0,015.

Buscamos en la tabla:
P(Z≤z)=0,985.
Obtenemos:
z_{α/2}≈2,17.

3. Calculamos el error:
E=2,17·frac{10}{sqrt{10}}
≈6,86 gramos.

4. Construimos el intervalo:
IC=(84-6,86,84+6,86)
=(77,14;90,86).

Resultado final: el intervalo de confianza del 97 % es (77,14;90,86) gramos.`
      },
      "b)": {
        options: [
          "Aumentar el tamaño de la muestra",
          "Disminuir el tamaño de la muestra",
          "Aumentar la desviación típica",
          "No se puede modificar la amplitud"
        ],
        correct: 0,
        solution: `Resolución:
La amplitud del intervalo es:

A=2E=2z_{α/2}·frac{σ}{sqrt{n}}.

El nivel de confianza debe mantenerse, por lo que z_{α/2} no cambia. La desviación típica poblacional σ=10 también es un dato fijo.

Para reducir la amplitud hay que reducir el error E. Como sqrt{n} aparece en el denominador, esto se consigue aumentando el tamaño de la muestra n.

Resultado final: se debe tomar una muestra de mayor tamaño.`
      },
      "c)": {
        options: [
          "Sí; 85 g pertenece al intervalo de confianza del 98,5 %",
          "No; 85 g queda por debajo del intervalo",
          "No; 85 g queda por encima del intervalo",
          "No se puede estudiar con una distribución normal"
        ],
        correct: 0,
        solution: `Resolución:
La media muestral es x̄=84 g, σ=10 g y n=10.

1. Para una confianza del 98,5 %:
1-α=0,985,
frac{α}{2}=0,0075.

Buscamos:
P(Z≤z)=1-0,0075=0,9925.
En la tabla obtenemos:
z≈2,43.

2. Calculamos el error:
E=2,43·frac{10}{sqrt{10}}
≈7,68 g.

3. El intervalo es:
IC=(84-7,68,84+7,68)
=(76,32;91,68).

4. Comprobamos:
85∈(76,32;91,68).

Por tanto, el valor μ=85 g es compatible con la muestra al nivel de confianza del 98,5 %.

Resultado final: sí, se puede admitir μ=85 gramos con ese nivel de confianza.`
      }
    },

    "ccss2-estadistica-8b549c3ba390--ccss-ii-estadistica-2": {
      "a)": {
        options: [
          "(9,06; 11,54) minutos",
          "(8,34; 12,26) minutos",
          "(10,10; 10,50) minutos",
          "(9,30; 11,30) minutos"
        ],
        correct: 0,
        solution: `Resolución:
Datos:
σ=2 minutos,
n=10,
nivel de confianza=95 %,
z_{α/2}=1,96.

1. Calculamos la media muestral:

x̄=frac{5+6+7+8+9+11+12+14+15+16}{10}
=frac{103}{10}
=10,3 minutos.

2. Calculamos el error:
E=1,96·frac{2}{sqrt{10}}
≈1,24 minutos.

3. Construimos el intervalo:
IC=(10,3-1,24,10,3+1,24)
=(9,06;11,54).

Resultado final: el intervalo de confianza es (9,06;11,54) minutos.`
      },
      "b)": {
        options: [
          "n=16",
          "n=15",
          "n=10",
          "n=17"
        ],
        correct: 0,
        solution: `Resolución:
Se mantiene el nivel de confianza del 95 %, por lo que:
z_{α/2}=1,96.

Queremos:
E=1,96·frac{2}{sqrt{n}}<1.

Despejamos:
frac{3,92}{sqrt{n}}<1,
sqrt{n}>3,92,
n>3,92²,
n>15,3664.

El menor número entero que cumple la desigualdad es:
n=16.

Comprobación:
E=1,96·frac{2}{sqrt{16}}
=frac{3,92}{4}
=0,98<1.

Resultado final: el tamaño mínimo de la muestra es n=16.`
      }
    }
  });
})();

// Matemáticas Aplicadas a las CCSS II · Álgebra · 2019.
(() => {
  "use strict";

  const answers = window.CCSS_II_EXAM_ANSWERS =
    window.CCSS_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-algebra-5156a66b00a7": {
      "a)": {
        options: [
          "{x+y+z=40; 2,75x+3y+2,50z=111,5; x+y=3z}",
          "{x+y+z=111,5; 2,75x+3y+2,50z=40; x+y=z}",
          "{x+y+z=40; 2,75x+3y+2,50z=111,5; 3x+3y=z}",
          "{x+y+z=40; 3x+2,75y+2,50z=111,5; x+y=3z}"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x a los kilogramos de judías blancas, y a los de judías canela y z a los de judías pintas.
2. En total se vendieron 40 kg:
x+y+z=40.
3. El importe total fue 111,5 €:
2,75x+3y+2,50z=111,5.
4. La suma de blancas y canela fue el triple de las pintas:
x+y=3z.
Resultado final:
{ x+y+z=40
  2,75x+3y+2,50z=111,5
  x+y=3z }.`
      },
      "b)": {
        options: [
          "14 kg de blancas, 16 kg de canela y 10 kg de pintas",
          "16 kg de blancas, 14 kg de canela y 10 kg de pintas",
          "10 kg de blancas, 16 kg de canela y 14 kg de pintas",
          "15 kg de blancas, 15 kg de canela y 10 kg de pintas"
        ],
        correct: 0,
        solution: `Resolución:
1. Resolvemos el sistema:
{ x+y+z=40
  2,75x+3y+2,50z=111,5
  x+y=3z }.
2. De x+y=3z y x+y+z=40:
3z+z=40 ⇒ 4z=40 ⇒ z=10.
3. Entonces:
x+y=30.
4. Sustituimos z=10 en la ecuación del importe:
2,75x+3y+25=111,5
2,75x+3y=86,5.
5. Multiplicamos x+y=30 por 3 y restamos:
3x+3y=90
2,75x+3y=86,5
0,25x=3,5 ⇒ x=14.
6. Finalmente:
y=30-14=16.
Comprobación: 2,75·14+3·16+2,50·10=111,5.
Resultado final: 14 kg de blancas, 16 kg de canela y 10 kg de pintas.`
      }
    },

    "ccss2-algebra-b40fe67bb135": {
      "a)": {
        options: [
          "Maximizar G(x,y)=250x+350y",
          "Minimizar G(x,y)=250x+350y",
          "Maximizar G(x,y)=160x+240y",
          "Maximizar G(x,y)=350x+250y"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x al número de conjuntos con chaqueta y falda, e y al número de conjuntos con cazadora y pantalón.
2. Cada conjunto del primer tipo aporta 250 € y cada conjunto del segundo tipo aporta 350 €.
3. Como se desean obtener las máximas ganancias, la función objetivo es:
G(x,y)=250x+350y.
Resultado final: maximizar G(x,y)=250x+350y.`
      },
      "b)": {
        options: [
          "{2x+y≤160; 2x+3y≤240; x≥0; y≥0}",
          "{2x+y≥160; 2x+3y≥240; x≥0; y≥0}",
          "{x+2y≤160; 3x+2y≤240; x≥0; y≥0}",
          "{2x+2y≤160; x+3y≤240; x≥0; y≥0}"
        ],
        correct: 0,
        solution: `Resolución:
1. El primer conjunto consume 2 m² de T1 y el segundo 1 m². Como hay 160 m²:
2x+y≤160.
2. El primer conjunto consume 2 m² de T2 y el segundo 3 m². Como hay 240 m²:
2x+3y≤240.
3. Las cantidades fabricadas no pueden ser negativas:
x≥0, y≥0.
4. El recinto factible queda en el primer cuadrante y por debajo de las rectas 2x+y=160 y 2x+3y=240.
Sus vértices son:
(0,0), (80,0), (60,40) y (0,80).
Resultado final:
{2x+y≤160; 2x+3y≤240; x≥0; y≥0}.`
      },
      "c)": {
        options: [
          "60 conjuntos con falda y 40 con pantalón; ganancia máxima 29000 €",
          "80 conjuntos con falda y ninguno con pantalón; ganancia máxima 20000 €",
          "Ninguno con falda y 80 con pantalón; ganancia máxima 28000 €",
          "40 conjuntos con falda y 60 con pantalón; ganancia máxima 31000 €"
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos G(x,y)=250x+350y en los vértices del recinto:
G(0,0)=0.
G(80,0)=250·80=20000.
G(60,40)=250·60+350·40=15000+14000=29000.
G(0,80)=350·80=28000.
2. El valor mayor es 29000 y se alcanza en (60,40).
Resultado final: deben fabricar 60 conjuntos con falda y 40 con pantalón; la ganancia máxima es 29000 €.`
      }
    },

    "ccss2-algebra-5156a66b00a7--ccss-ii-algebra-2": {
      "a)": {
        options: [
          "[[7,3,15],[4,3,8],[6,6,16]]",
          "[[5,3,15],[4,1,12],[8,2,24]]",
          "[[7,4,6],[3,3,6],[15,8,16]]",
          "[[-7,-3,-15],[-4,-3,-8],[-6,-6,-16]]"
        ],
        correct: 0,
        solution: `Resolución:
1. Las matrices son:
A=[[3],[2],[4]], B=[[2,1,5]],
C=[[-1,0,2],[0,-1,-2],[0,2,4]].
2. Calculamos el producto:
A·B=[[6,3,15],[4,2,10],[8,4,20]].
3. Trasponemos C:
C^T=[[-1,0,0],[0,-1,2],[2,-2,4]].
4. Restamos elemento a elemento:
A·B-C^T
=[[6,3,15],[4,2,10],[8,4,20]]-[[-1,0,0],[0,-1,2],[2,-2,4]]
=[[7,3,15],[4,3,8],[6,6,16]].
Resultado final: [[7,3,15],[4,3,8],[6,6,16]].`
      },
      "b)": {
        options: [
          "det(C)=0; D² es 2×2 y B es 1×3, por lo que no coinciden las dimensiones interiores",
          "det(C)=1; D²·B no existe porque ambas matrices son cuadradas",
          "det(C)=0; D²·B sí puede realizarse",
          "det(C)=-1; D²·B no existe porque el resultado no sería cuadrado"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos el determinante de
C=[[-1,0,2],[0,-1,-2],[0,2,4]].
2. Desarrollamos por la primera columna:
det(C)=(-1)·det[[-1,-2],[2,4]]
=(-1)[(-1)·4-(-2)·2]
=(-1)(-4+4)=0.
3. Como det(C)=0, C no es invertible.
4. La matriz D es 2×2; por tanto, D² también es 2×2. La matriz B es 1×3.
5. Para multiplicar D²·B, el número de columnas de D² tendría que coincidir con el número de filas de B. Aquí 2≠1.
Resultado final: C no tiene inversa y D²·B no está definido por incompatibilidad de dimensiones.`
      }
    },

    "ccss2-algebra-b40fe67bb135--ccss-ii-algebra-2": {
      "a)": {
        options: [
          "{150m+30d+270t=15900; t-m=frac{d}{2}; d+t=2m}",
          "{150m+30d+270t=15900; t+m=frac{d}{2}; d+t=m}",
          "{m+d+t=15900; 150m+30d+270t=450; t-m=2d}",
          "{150m+30d+270t=15900; m-t=frac{d}{2}; d+t=2m}"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos m, d y t a los precios de mañana, mediodía y tarde.
2. La recaudación total proporciona:
150m+30d+270t=15900.
3. La diferencia entre tarde y mañana es la mitad del precio de mediodía:
t-m=frac{d}{2}.
4. La suma de mediodía y tarde es el doble del precio de mañana:
d+t=2m.
Resultado final:
{150m+30d+270t=15900; t-m=frac{d}{2}; d+t=2m}.`
      },
      "b)": {
        options: [
          "Mañana 30 €, mediodía 20 € y tarde 40 €",
          "Mañana 20 €, mediodía 30 € y tarde 40 €",
          "Mañana 40 €, mediodía 20 € y tarde 30 €",
          "Mañana 30 €, mediodía 40 € y tarde 20 €"
        ],
        correct: 0,
        solution: `Resolución:
1. Simplificamos la ecuación de recaudación dividiendo entre 30:
5m+d+9t=530.
2. De t-m=frac{d}{2}:
d=2t-2m.
3. Sustituimos en d+t=2m:
2t-2m+t=2m
3t=4m
t=frac{4m}{3}.
4. Entonces:
d=2·frac{4m}{3}-2m=frac{2m}{3}.
5. Sustituimos en 5m+d+9t=530:
5m+frac{2m}{3}+12m=530
frac{53m}{3}=530
m=30.
6. Por tanto:
d=20, t=40.
Resultado final: mañana 30 €, mediodía 20 € y tarde 40 €.`
      }
    },

    "ccss2-algebra-ed4a21357666": {
      "a)": {
        options: [
          "{20p+14m+6g=1800; 2p+3m=2g; g=4p}",
          "{20p+14m+6g=1800; 2p+3m=g; 4g=p}",
          "{p+m+g=1800; 20p+14m+6g=3; g=4p}",
          "{20p+14m+6g=1800; 2p+2m=3g; p=4g}"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos p, m y g al peso, en kg, de un saco pequeño, mediano y grande.
2. El peso total del pedido es:
20p+14m+6g=1800.
3. Dos pequeños y tres medianos pesan lo mismo que dos grandes:
2p+3m=2g.
4. Un saco grande pesa cuatro veces uno pequeño:
g=4p.
Resultado final:
{20p+14m+6g=1800; 2p+3m=2g; g=4p}.`
      },
      "b)": {
        options: [
          "Pequeño 25 kg, mediano 50 kg y grande 100 kg",
          "Pequeño 50 kg, mediano 25 kg y grande 100 kg",
          "Pequeño 25 kg, mediano 100 kg y grande 50 kg",
          "Pequeño 20 kg, mediano 40 kg y grande 80 kg"
        ],
        correct: 0,
        solution: `Resolución:
1. De g=4p y 2p+3m=2g:
2p+3m=8p
3m=6p
m=2p.
2. Sustituimos m=2p y g=4p en la primera ecuación:
20p+14(2p)+6(4p)=1800.
3. Operamos:
20p+28p+24p=1800
72p=1800
p=25.
4. Entonces:
m=2p=50,
g=4p=100.
Comprobación: 20·25+14·50+6·100=1800.
Resultado final: 25 kg, 50 kg y 100 kg, respectivamente.`
      }
    },

    "ccss2-algebra-cd6178793438": {
      "a)": {
        options: [
          "Triángulo limitado por x+y≥2, x≤y, y≤2 y x≥0",
          "Triángulo limitado por x+y≤2, x≥y, y≤2 y x≥0",
          "Región no acotada del primer cuadrante",
          "Rectángulo 0≤x≤2, 0≤y≤2"
        ],
        correct: 0,
        solution: `Resolución:
1. Dibujamos las fronteras:
x+y=2, x=y, y=0, y=2 y x=0.
2. Elegimos los semiplanos que cumplen:
x+y≥2, x≤y, 0≤y≤2, x≥0.
3. La intersección es un triángulo:
- por encima de x+y=2;
- por encima de y=x;
- por debajo de y=2;
- en el primer cuadrante.
Sus vértices son (0,2), (1,1) y (2,2).
Resultado final: la región factible es el triángulo de vértices (0,2), (1,1) y (2,2).`
      },
      "b)": {
        options: [
          "(0,2), (1,1) y (2,2)",
          "(0,0), (0,2) y (2,0)",
          "(0,2), (2,0) y (2,2)",
          "(0,0), (1,1) y (2,2)"
        ],
        correct: 0,
        solution: `Resolución:
1. Intersección de x=0 con x+y=2:
(0,2).
2. Intersección de x=y con x+y=2:
2x=2 ⇒ x=1, y=1.
3. Intersección de x=y con y=2:
x=2, y=2.
Resultado final: los vértices son (0,2), (1,1) y (2,2).`
      },
      "c)": {
        options: [
          "Mínimo 7 en (1,1) y máximo 14 en (2,2)",
          "Mínimo 0 en (0,0) y máximo 14 en (2,2)",
          "Mínimo 8 en (0,2) y máximo 14 en (2,2)",
          "Mínimo 7 en (1,1) y máximo 8 en (0,2)"
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos f(x,y)=3x+4y en cada vértice:
f(0,2)=3·0+4·2=8.
f(1,1)=3·1+4·1=7.
f(2,2)=3·2+4·2=14.
2. Comparamos los valores:
7<8<14.
Resultado final: el mínimo es 7 en (1,1) y el máximo es 14 en (2,2).`
      }
    },

    "ccss2-algebra-ed4a21357666--ccss-ii-algebra-2": {
      "Resultado": {
        options: [
          "a=5, b=1",
          "a=1, b=5",
          "a=-5, b=1",
          "a=5, b=-1"
        ],
        correct: 0,
        solution: `Resolución:
1. Las matrices son:
A=[[1,3],[3,1]], B=[[1,5],[a,b]].
2. Calculamos:
A·B=[[1+3a,5+3b],[3+a,15+b]].
3. Calculamos:
B·A=[[16,8],[a+3b,3a+b]].
4. Para que conmuten, igualamos las entradas correspondientes:
{ 1+3a=16
  5+3b=8
  3+a=a+3b
  15+b=3a+b }.
5. De las dos primeras:
3a=15 ⇒ a=5,
3b=3 ⇒ b=1.
6. Estos valores también verifican las otras dos ecuaciones.
Resultado final: a=5 y b=1.`
      }
    },

    "ccss2-algebra-cd6178793438--ccss-ii-algebra-2": {
      "a)": {
        options: [
          "{x+y+z=145; 400x+160y+200z=43400; x=5y}",
          "{x+y+z=43400; 400x+160y+200z=145; y=5x}",
          "{x+y+z=145; 400x+160y+200z=43400; y=5x}",
          "{x+y+z=145; 400x+200y+160z=43400; x=5y}"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x, y, z al número de personas que reciben B1, B2 y B3.
2. Hay 145 personas becadas:
x+y+z=145.
3. El importe total es:
400x+160y+200z=43400.
4. Las personas con B1 son cinco veces las que reciben B2:
x=5y.
Resultado final:
{x+y+z=145; 400x+160y+200z=43400; x=5y}.`
      },
      "b)": {
        options: [
          "75 personas con B1, 15 con B2 y 55 con B3",
          "15 personas con B1, 75 con B2 y 55 con B3",
          "75 personas con B1, 55 con B2 y 15 con B3",
          "70 personas con B1, 14 con B2 y 61 con B3"
        ],
        correct: 0,
        solution: `Resolución:
1. De x=5y y x+y+z=145:
z=145-6y.
2. Sustituimos en la ecuación del dinero:
400(5y)+160y+200(145-6y)=43400.
3. Operamos:
2000y+160y+29000-1200y=43400
960y=14400
y=15.
4. Entonces:
x=5y=75,
z=145-75-15=55.
Comprobación: 400·75+160·15+200·55=43400.
Resultado final: 75 personas reciben B1, 15 reciben B2 y 55 reciben B3.`
      }
    }
  });
})();

// Matemáticas II · Análisis · 2019.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-analisis-1b48bfe13b2f": {
      "b)": {
        options: [
          "Sí; cumple las hipótesis y el punto de Rolle es c=0",
          "No; no es continua en [-3,3]",
          "No; f(-3)≠f(3)",
          "Sí; cumple las hipótesis y el punto de Rolle es c=3"
        ],
        correct: 0,
        solution: `Resolución:
1. La función f(x)=x²-4 es un polinomio. Por tanto, es continua en el intervalo cerrado [-3,3] y derivable en el intervalo abierto (-3,3).
2. Comprobamos los valores de los extremos:
f(-3)=(-3)²-4=9-4=5,
f(3)=3²-4=9-4=5.
Luego f(-3)=f(3).
3. Se verifican las tres hipótesis del teorema de Rolle. Por ello, existe al menos un punto c∈(-3,3) tal que f'(c)=0.
4. Derivamos:
f'(x)=2x.
5. Igualamos a cero:
2c=0 ⇒ c=0.
Resultado final: sí verifica las hipótesis del teorema de Rolle y el punto correspondiente es c=0.`
      }
    },

    "mates2-analisis-1b48bfe13b2f--mates-ii-analisis-2": {
      "b)": {
        options: [
          "y=frac{x}{6}-frac{17}{3}",
          "y=-6x+19",
          "y=-frac{x}{6}-frac{13}{3}",
          "y=frac{x}{6}-5"
        ],
        correct: 0,
        solution: `Resolución:
1. La función es g(x)=-x²+2x+3.
2. Hallamos el punto de la gráfica de abscisa x=4:
g(4)=-4²+2·4+3=-16+8+3=-5.
El punto es P(4,-5).
3. Derivamos:
g'(x)=-2x+2.
La pendiente de la tangente en x=4 es:
m=g'(4)=-8+2=-6.
4. La pendiente mₙ de la recta normal cumple:
m·mₙ=-1.
Sustituimos:
(-6)mₙ=-1
mₙ=frac{1}{6}.
5. Usamos la ecuación punto-pendiente:
y-(-5)=frac{1}{6}(x-4).
6. Despejamos:
y+5=frac{x}{6}-frac{2}{3}
y=frac{x}{6}-frac{17}{3}.
Resultado final: la recta normal es y=frac{x}{6}-frac{17}{3}.`
      }
    },

    "mates2-analisis-db4fb75c79cb": {
      "a)": {
        options: [
          "√e",
          "e",
          "frac{1}{√e}",
          "1"
        ],
        correct: 0,
        solution: `Resolución:
1. Sustituimos x=1 en la base:
frac{2e^(x-1)}{x+1}→frac{2}{2}=1,
y el exponente frac{x}{x-1} tiende a infinito. Aparece la indeterminación 1^∞.
2. Aplicamos la fórmula del número e. Sea
L=lim_(x→1)(frac{2e^(x-1)}{x+1})^(x/(x-1)).
Tomamos logaritmos:
ln L=lim_(x→1)frac{x}{x-1}·ln(frac{2e^(x-1)}{x+1}).
3. Escribimos:
ln(frac{2e^(x-1)}{x+1})=ln2+x-1-ln(x+1).
4. Entonces:
ln L=lim_(x→1)x·frac{ln2+x-1-ln(x+1)}{x-1}.
El cociente es 0/0, por lo que aplicamos L'Hôpital:
ln L=lim_(x→1)x·(1-frac{1}{x+1})
=1·frac{1}{2}
=frac{1}{2}.
5. Deshacemos el logaritmo:
L=e^(1/2)=√e.
Resultado final: el límite vale √e.`
      },
      "b)": {
        options: [
          "frac{1}{2}",
          "-frac{1}{2}",
          "1",
          "0"
        ],
        correct: 0,
        solution: `Resolución:
1. Sustituimos x=-1:
frac{-e^(x²-1)-x}{x²+4x+3}
→frac{-e^0+1}{1-4+3}
=frac{0}{0}.
Es una indeterminación 0/0.
2. Aplicamos la regla de L'Hôpital y derivamos numerador y denominador:
lim_(x→-1)frac{-2xe^(x²-1)-1}{2x+4}.
3. Sustituimos x=-1:
frac{-2(-1)e^0-1}{2(-1)+4}
=frac{2-1}{2}
=frac{1}{2}.
Resultado final: el límite vale frac{1}{2}.`
      }
    },

    "mates2-analisis-db4fb75c79cb--mates-ii-analisis-2": {
      "a)": {
        options: [
          "f tiene un máximo relativo en (0,1) y g un mínimo relativo en (0,0)",
          "f tiene un mínimo relativo en (0,1) y g un máximo relativo en (0,0)",
          "Ambas tienen un máximo relativo en x=0",
          "Ninguna de las dos funciones tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
1. Para f(x)=frac{1}{1+x²}:
f'(x)=frac{-2x}{(1+x²)²}.
El denominador es siempre positivo, así que el signo depende de -2x.
2. Resolvemos f'(x)=0:
-2x=0 ⇒ x=0.
3. Estudiamos el signo en la recta real:
si x<0, f'(x)>0  ↗;
si x>0, f'(x)<0  ↘.
Por tanto, f tiene un máximo relativo en x=0:
f(0)=1.
El máximo es (0,1).
4. Para g(x)=frac{x²}{2}:
g'(x)=x.
Se anula en x=0.
5. Estudiamos el signo:
si x<0, g'(x)<0  ↘;
si x>0, g'(x)>0  ↗.
Por tanto, g tiene un mínimo relativo en x=0:
g(0)=0.
Resultado final: f tiene un máximo relativo en (0,1) y g un mínimo relativo en (0,0).`
      },
      "b)": {
        options: [
          "A=frac{π}{2}-frac{1}{3}",
          "A=frac{π}{2}+frac{1}{3}",
          "A=π-frac{1}{3}",
          "A=frac{2}{3}"
        ],
        correct: 0,
        solution: `Resolución:
1. Buscamos los puntos de corte:
frac{1}{1+x²}=frac{x²}{2}.
Multiplicamos por 2(1+x²):
2=x²(1+x²)
x⁴+x²-2=0.
2. Hacemos t=x²:
t²+t-2=0
(t+2)(t-1)=0.
Como t=x²≥0, queda t=1 y, por tanto, x=-1 o x=1.
Los puntos de corte son (-1,frac{1}{2}) y (1,frac{1}{2}).
3. Entre -1 y 1, f(x)=frac{1}{1+x²} está por encima de g(x)=frac{x²}{2}. El recinto es simétrico respecto del eje OY.
4. Planteamos el área:
A=∫_(-1)^1(frac{1}{1+x²}-frac{x²}{2})dx
=2∫_0^1(frac{1}{1+x²}-frac{x²}{2})dx.
5. Calculamos una primitiva:
∫(frac{1}{1+x²}-frac{x²}{2})dx
=arctan x-frac{x³}{6}.
6. Aplicamos la regla de Barrow:
A=2[arctan x-frac{x³}{6}]_0^1
=2(frac{π}{4}-frac{1}{6})
=frac{π}{2}-frac{1}{3}.
Resultado final: A=frac{π}{2}-frac{1}{3} unidades cuadradas.`
      }
    },

    "mates2-analisis-27926536398d": {
      "a)": {
        options: [
          "Discontinuidad evitable en x=1 e infinita en x=-1",
          "Discontinuidad infinita en x=1 y evitable en x=-1",
          "Discontinuidades evitables en x=-1 y x=1",
          "La función es continua en ℝ"
        ],
        correct: 0,
        solution: `Resolución:
1. La función es
f(x)=frac{2x³-x²-x}{x²-1}.
Los posibles puntos de discontinuidad son los ceros del denominador:
x²-1=0 ⇒ x=-1,1.
2. Factorizamos:
2x³-x²-x=x(2x²-x-1)=x(2x+1)(x-1),
x²-1=(x-1)(x+1).
3. Para x≠-1,1:
f(x)=frac{x(2x+1)}{x+1}.
4. En x=1 se ha simplificado el factor que anulaba numerador y denominador:
lim_(x→1)f(x)=frac{1(2+1)}{1+1}=frac{3}{2}.
El límite es finito, pero la función no está definida en x=1. Es una discontinuidad evitable.
5. En x=-1 el numerador original vale:
2(-1)³-(-1)²-(-1)=-2-1+1=-2≠0,
mientras que el denominador se anula. Los límites laterales son infinitos y x=-1 es una asíntota vertical.
Resultado final: discontinuidad evitable en x=1 y discontinuidad infinita en x=-1.`
      },
      "b)": {
        options: [
          "Máximo relativo en (1,frac{1}{e})",
          "Mínimo relativo en (1,frac{1}{e})",
          "Máximo relativo en (0,0)",
          "No tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
1. La función es g(x)=xe^(-x).
2. Derivamos con la regla del producto:
g'(x)=e^(-x)-xe^(-x)
=e^(-x)(1-x).
3. Como e^(-x)>0 para todo x, la derivada se anula cuando:
1-x=0 ⇒ x=1.
4. Estudiamos el signo en la recta real:
si x<1, g'(x)>0  ↗;
si x>1, g'(x)<0  ↘.
La función pasa de creciente a decreciente, así que hay un máximo relativo en x=1.
5. Calculamos la ordenada:
g(1)=1·e^(-1)=frac{1}{e}.
Resultado final: máximo relativo en (1,frac{1}{e}).`
      }
    },

    "mates2-analisis-27926536398d--mates-ii-analisis-2": {
      "a)": {
        options: [
          "A=frac{320}{3}",
          "A=frac{160}{3}",
          "A=80",
          "A=frac{640}{3}"
        ],
        correct: 0,
        solution: `Resolución:
1. Las funciones son:
f(x)=16-x²,
g(x)=(frac{x}{2})²-4=frac{x²}{4}-4.
2. Calculamos los puntos de corte:
16-x²=frac{x²}{4}-4.
Multiplicamos por 4:
64-4x²=x²-16
80=5x²
x²=16
x=-4 o x=4.
En ambos casos, y=0. Los puntos de corte son (-4,0) y (4,0).
3. En [-4,4], f está por encima de g. La región es simétrica respecto del eje OY.
4. Planteamos el área:
A=∫_(-4)^4[(16-x²)-(frac{x²}{4}-4)]dx
=∫_(-4)^4(20-frac{5x²}{4})dx
=2∫_0^4(20-frac{5x²}{4})dx.
5. Aplicamos la regla de Barrow:
A=2[20x-frac{5x³}{12}]_0^4
=2(80-frac{80}{3})
=frac{320}{3}.
Resultado final: A=frac{320}{3} unidades cuadradas.`
      },
      "b)": {
        options: [
          "y=-2x+17",
          "y=2x+13",
          "y=-2x+15",
          "y=2x+17"
        ],
        correct: 0,
        solution: `Resolución:
1. La función es f(x)=16-x².
2. Calculamos el punto de tangencia para x=1:
f(1)=16-1=15.
El punto es P(1,15).
3. Derivamos:
f'(x)=-2x.
La pendiente en x=1 es:
m=f'(1)=-2.
4. Aplicamos la ecuación punto-pendiente:
y-15=-2(x-1).
5. Despejamos:
y-15=-2x+2
y=-2x+17.
Resultado final: la recta tangente es y=-2x+17.`
      }
    },

    "mates2-analisis-f0a042796457": {
      "b)": {
        options: [
          "Exactamente una solución",
          "Exactamente dos soluciones",
          "Exactamente 400 soluciones",
          "Ninguna solución"
        ],
        correct: 0,
        solution: `Resolución:
1. Consideramos:
h(x)=sen x-2x+1.
La ecuación dada equivale a h(x)=0.
2. Derivamos:
h'(x)=cos x-2.
3. Como -1≤cos x≤1, se cumple:
-3≤cos x-2≤-1.
Por tanto, h'(x)<0 para todo x∈ℝ y h es estrictamente decreciente.
4. Una función estrictamente decreciente puede cortar al eje OX como máximo una vez.
5. Además:
h(0)=1>0,
h(π)=senπ-2π+1=1-2π<0.
Por el teorema de Bolzano existe una solución en (0,π).
6. Como existe al menos una y no puede haber más de una, la ecuación tiene exactamente una solución real. Esa solución pertenece a [-200,200].
Resultado final: en [-200,200] hay exactamente una solución.`
      }
    },

    "mates2-analisis-f0a042796457--mates-ii-analisis-2": {
      "a)": {
        options: [
          "2-frac{3}{e}",
          "1-frac{2}{e}",
          "frac{3}{e}",
          "2+frac{3}{e}"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos:
I=∫_0^1(x+1)e^(-x)dx.
2. Separamos:
I=∫_0^1xe^(-x)dx+∫_0^1e^(-x)dx.
3. En la primera integral usamos integración por partes:
u=x ⇒ du=dx,
dv=e^(-x)dx ⇒ v=-e^(-x).
Entonces:
∫xe^(-x)dx=-xe^(-x)+∫e^(-x)dx
=-xe^(-x)-e^(-x).
4. Sumando la segunda integral:
∫(x+1)e^(-x)dx
=-xe^(-x)-2e^(-x)
=-(x+2)e^(-x).
5. Aplicamos la regla de Barrow:
I=[-(x+2)e^(-x)]_0^1
=-frac{3}{e}-(-2)
=2-frac{3}{e}.
Resultado final: I=2-frac{3}{e}.`
      },
      "b)": {
        options: [
          "2 arctan(√x)+C",
          "arctan(√x)+C",
          "2 ln(1+√x)+C",
          "frac{2}{1+x}+C"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de:
I=∫frac{1}{√x(1+x)}dx.
2. Hacemos el cambio indicado:
t=√x.
Entonces:
x=t²,
dx=2t dt.
3. Sustituimos toda la integral:
I=∫frac{1}{t(1+t²)}·2t dt
=∫frac{2}{1+t²}dt.
4. Integramos:
I=2 arctan t+C.
5. Deshacemos el cambio t=√x:
I=2 arctan(√x)+C.
Resultado final: 2 arctan(√x)+C.`
      }
    }
  });
})();

// Matemáticas II · Geometría · 2019.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-geometria-5cd3a8ccee6e": {
      "a)": {
        options: [
          "x-y-z+1=0",
          "x+y-z-3=0",
          "x-y+z-1=0",
          "2x-y-z+1=0"
        ],
        correct: 0,
        solution: `Resolución:
1. Tomamos un vector director de la recta que pasa por A y B:
→AB=B-A=(0,-1,2)-(1,2,0)=(-1,-3,2).
2. Como el plano debe ser paralelo a la recta que pasa por C y D, también contiene un vector paralelo a
→CD=D-C=(1,0,1)-(2,-1,3)=(-1,1,-2).
3. Un vector normal del plano es el producto vectorial:
→n=→AB×→CD=
det[[i,j,k],[-1,-3,2],[-1,1,-2]]
=(4,-4,-4).
Podemos simplificarlo y usar →n=(1,-1,-1).
4. El plano pasa por A(1,2,0). Aplicamos la ecuación punto-normal:
1(x-1)-1(y-2)-1(z-0)=0.
5. Simplificamos:
x-1-y+2-z=0
x-y-z+1=0.
Comprobación: A y B pertenecen al plano, y →n·→CD=0.
Resultado final: el plano es x-y-z+1=0.`
      },
      "b)": {
        options: [
          "V=frac{2}{3} unidades cúbicas",
          "V=frac{4}{3} unidades cúbicas",
          "V=2 unidades cúbicas",
          "V=4 unidades cúbicas"
        ],
        correct: 0,
        solution: `Resolución:
1. Formamos tres vectores con origen en A:
→AB=(-1,-3,2),
→AC=C-A=(1,-3,3),
→AD=D-A=(0,-2,1).
2. El volumen del tetraedro es la sexta parte del valor absoluto del producto mixto:
V=frac{1}{6}|det(→AB,→AC,→AD)|.
3. Calculamos el determinante:
det[[-1,-3,2],[1,-3,3],[0,-2,1]]=-4.
4. Por tanto:
V=frac{1}{6}|-4|
=frac{4}{6}
=frac{2}{3}.
Resultado final: V=frac{2}{3} unidades cúbicas.`
      }
    },

    "mates2-geometria-00825360d37b": {
      "a)": {
        options: [
          "d(P,r)=frac{√6}{2}",
          "d(P,r)=√6",
          "d(P,r)=frac{√14}{2}",
          "d(P,r)=frac{3√6}{2}"
        ],
        correct: 0,
        solution: `Resolución:
1. Escribimos la recta en forma paramétrica:
r≡{ x=1+3t
     y=t
     z=-1+2t }, t∈ℝ.
Así, un punto de r es R₀=(1,0,-1) y un vector director es →v=(3,1,2).
2. Formamos el vector desde R₀ hasta P(3,1,-1):
→R₀P=P-R₀=(2,1,0).
3. Aplicamos la fórmula de la distancia de un punto a una recta:
d(P,r)=frac{|→R₀P×→v|}{|→v|}.
4. Calculamos:
→R₀P×→v=(2,-4,-1),
|→R₀P×→v|=√21,
|→v|=√14.
5. Entonces:
d(P,r)=frac{√21}{√14}
=√(frac{3}{2})
=frac{√6}{2}.
Resultado final: d(P,r)=frac{√6}{2}.`
      },
      "b)": {
        options: [
          "{ x=3+t; y=1; z=-1+2t }, t∈ℝ",
          "{ x=3+2t; y=1+t; z=-1 }, t∈ℝ",
          "{ x=4+t; y=1; z=1+2t }, t∈ℝ",
          "{ x=3+t; y=1+t; z=-1+2t }, t∈ℝ"
        ],
        correct: 0,
        solution: `Resolución:
1. El plano π tiene vector normal →n=(2,1,-1). El plano paralelo a π que contiene a P(3,1,-1) tiene ecuación:
2(x-3)+(y-1)-(z+1)=0,
es decir,
2x+y-z-8=0.
2. Escribimos r en forma paramétrica:
r≡{ x=1+3t
     y=t
     z=-1+2t }.
3. Sustituimos estas coordenadas en el plano:
2(1+3t)+t-(-1+2t)-8=0
2+6t+t+1-2t-8=0
5t-5=0
t=1.
4. Hallamos el punto de corte:
Q=(1+3,1,-1+2)=(4,1,1).
5. La recta pedida pasa por P y Q. Su vector director es
→PQ=Q-P=(1,0,2).
Por tanto:
{ x=3+t
  y=1
  z=-1+2t }, t∈ℝ.
Resultado final: la recta pedida es {x=3+t, y=1, z=-1+2t}.`
      }
    },

    "mates2-geometria-b771e22f630e": {
      "a)": {
        options: [
          "La recta r corta al plano π en (frac{3}{2},-frac{1}{2},-1)",
          "La recta r es paralela y exterior al plano π",
          "La recta r está contenida en el plano π",
          "La recta r es perpendicular al plano π"
        ],
        correct: 0,
        solution: `Resolución:
1. La recta tiene forma paramétrica:
r≡{ x=1-t
     y=t
     z=2t }, t∈ℝ,
con vector director →v=(-1,1,2).
2. El plano π pasa por P₀=(1,0,-1) y tiene vectores directores
→u=(1,1,2), →w=(1,-1,0).
3. Calculamos un vector normal:
→n=→u×→w=(2,2,-2),
que podemos simplificar a →n=(1,1,-1).
La ecuación general de π es:
(x-1)+y-(z+1)=0
x+y-z-2=0.
4. Sustituimos la recta en el plano:
(1-t)+t-2t-2=0
-1-2t=0
t=-frac{1}{2}.
5. Como existe un único valor del parámetro, la recta es secante al plano. El punto de corte es:
x=1-(-frac{1}{2})=frac{3}{2},
y=-frac{1}{2},
z=2(-frac{1}{2})=-1.
Resultado final: r corta a π en (frac{3}{2},-frac{1}{2},-1).`
      },
      "b)": {
        options: [
          "3x-y+2z-3=0",
          "x+y-z-2=0",
          "x-y-2z-1=0",
          "3x+y-2z-3=0"
        ],
        correct: 0,
        solution: `Resolución:
1. Un vector director de r es →v=(-1,1,2).
2. Del apartado anterior, un vector normal de π es →nπ=(1,1,-1).
3. El plano β buscado contiene a r, por lo que su vector normal →nβ debe ser perpendicular a →v. Además, β es perpendicular a π, de modo que →nβ también debe ser perpendicular a →nπ.
4. Podemos obtenerlo mediante:
→nβ=→v×→nπ
=det[[i,j,k],[-1,1,2],[1,1,-1]]
=(-3,1,-2).
5. El plano β pasa por el punto R₀=(1,0,0) de la recta:
-3(x-1)+y-2z=0.
6. Multiplicamos por -1 y ordenamos:
3x-y+2z-3=0.
Comprobación: la recta r está contenida en β y →nβ·→nπ=0.
Resultado final: β≡3x-y+2z-3=0.`
      }
    },

    "mates2-geometria-3624ca0ec2b3": {
      "b)": {
        options: [
          "r≡{x=-1+t; y=3+t; z=1+2t}; Q pertenece y R no pertenece",
          "r≡{x=-1+t; y=3+t; z=1+2t}; Q y R pertenecen",
          "r≡{x=-1+2t; y=3+t; z=1+t}; R pertenece y Q no pertenece",
          "r≡{x=-1-t; y=3+t; z=1-2t}; ni Q ni R pertenecen"
        ],
        correct: 0,
        solution: `Resolución:
1. El plano es π≡x+y+2z-3=0, por lo que un vector normal, con su notación vectorial, es:
→nπ=(1,1,2).
2. Una recta perpendicular a un plano tiene como vector director un vector paralelo al normal del plano. Como debe pasar por P(-1,3,1):
r≡{ x=-1+t
     y=3+t
     z=1+2t }, t∈ℝ.
3. Comprobamos Q(1,5,5). De la primera coordenada:
-1+t=1 ⇒ t=2.
Con t=2:
y=3+2=5, z=1+2·2=5.
Las tres coordenadas coinciden, luego Q pertenece a r.
4. Comprobamos R(0,4,2). De la primera coordenada:
-1+t=0 ⇒ t=1.
Con t=1:
y=3+1=4, pero z=1+2·1=3≠2.
Por tanto, R no pertenece a r.
Resultado final:
r≡{x=-1+t, y=3+t, z=1+2t}; Q∈r y R∉r.`
      }
    }
  });
})();

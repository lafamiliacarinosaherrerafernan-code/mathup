(function () {
  "use strict";

  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};
  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};

  // Banco completo de respuestas de las convocatorias oficiales de 2018.

  // Matemáticas II · Álgebra · 2018.
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-f3a44f69bbf5": {
      "b)": {
        options: [
          "(x,y,z)=(-2-7t, 2+3t, t), t∈ℝ",
          "(x,y,z)=(-2+7t, 2-3t, t), t∈ℝ",
          "(x,y,z)=(-2,2,0), única solución",
          "El sistema es incompatible"
        ],
        correct: 0,
        solution: `Resolución:
Para a=2 el sistema es:
{ x+3y-2z=4
  x+2y+z=2
  x+4y-5z=6 }.

Aplicamos Gauss a la matriz ampliada:

[[1,3,-2,4],
 [1,2,1,2],
 [1,4,-5,6]]

F₂←F₂-F₁, F₃←F₃-F₁:

[[1,3,-2,4],
 [0,-1,3,-2],
 [0,1,-3,2]]

F₃←F₃+F₂:

[[1,3,-2,4],
 [0,-1,3,-2],
 [0,0,0,0]].

Hay dos ecuaciones independientes y tres incógnitas:
rango(A)=rango(A*)=2<3.
El sistema es compatible indeterminado.

Tomamos z=t. De la segunda ecuación:
-y+3t=-2
y=2+3t.

De la primera:
x+3(2+3t)-2t=4
x=-2-7t.

Resultado final:
(x,y,z)=(-2-7t, 2+3t, t), t∈ℝ.`
      }
    },

    "mates2-algebra-bee54afe33a9": {
      "a)": {
        options: [
          "a≠1 y a≠frac{4}{3}",
          "a≠1 y a≠2",
          "a=1 o a=frac{4}{3}",
          "Para todo a∈ℝ"
        ],
        correct: 0,
        solution: `Resolución:
Una matriz cuadrada tiene inversa si y solo si su determinante es distinto de cero.

A=[[a-1,1,-1],
   [0,a-2,1],
   [a,0,2]].

Calculamos el determinante:

det(A)
=(a-1)·det[[a-2,1],[0,2]]
-1·det[[0,1],[a,2]]
-1·det[[0,a-2],[a,0]]

=2(a-1)(a-2)+a+a(a-2)
=3a²-7a+4
=(3a-4)(a-1).

Por tanto:
det(A)≠0 ⇔ (3a-4)(a-1)≠0.

Resultado final: A tiene inversa para a≠1 y a≠frac{4}{3}.`
      },
      "b)": {
        options: [
          "A⁻¹=[[0,-1,frac{1}{2}],[1,2,-frac{1}{2}],[0,1,0]]",
          "A⁻¹=[[0,1,frac{1}{2}],[-1,2,frac{1}{2}],[0,-1,0]]",
          "A⁻¹=[[1,0,0],[0,1,0],[0,0,1]]",
          "A no tiene inversa para a=2"
        ],
        correct: 0,
        solution: `Resolución:
Para a=2:

A=[[1,1,-1],
   [0,0,1],
   [2,0,2]].

Su determinante es:
det(A)=2≠0.

Usamos la nomenclatura del curso:
A⁻¹=frac{Adj(Aᵀ)}{det(A)}.

La matriz de adjuntos de Aᵀ es:
Adj(Aᵀ)=[[0,-2,1],
         [2,4,-1],
         [0,2,0]].

Dividimos cada elemento por det(A)=2:

A⁻¹=[[0,-1,frac{1}{2}],
     [1,2,-frac{1}{2}],
     [0,1,0]].

Comprobación:
A·A⁻¹=[[1,0,0],[0,1,0],[0,0,1]]=I₃.

Resultado final:
A⁻¹=[[0,-1,frac{1}{2}],[1,2,-frac{1}{2}],[0,1,0]].`
      },
      "c)": {
        options: [
          "det(A⁻¹)=frac{1}{4} y det(2A)=32",
          "det(A⁻¹)=4 y det(2A)=8",
          "det(A⁻¹)=frac{1}{4} y det(2A)=16",
          "det(A⁻¹)=-frac{1}{4} y det(2A)=-32"
        ],
        correct: 0,
        solution: `Resolución:
Para a=0:

A=[[-1,1,-1],
   [0,-2,1],
   [0,0,2]].

Es triangular, por lo que:
det(A)=(-1)(-2)(2)=4.

1. Determinante de la inversa:
det(A⁻¹)=frac{1}{det(A)}
=frac{1}{4}.

2. Determinante de 2A:
Como A es de orden 3:
det(2A)=2³det(A)
=8·4
=32.

Resultado final:
det(A⁻¹)=frac{1}{4} y det(2A)=32.`
      }
    },

    "mates2-algebra-7ece49c1c635": {
      "b)": {
        options: [
          "(x,y,z)=(-frac{2}{3}+t, -frac{5}{3}-2t, 3t), t∈ℝ",
          "(x,y,z)=(-frac{2}{3}-t, -frac{5}{3}+2t, 3t), t∈ℝ",
          "(x,y,z)=(-frac{2}{3},-frac{5}{3},0), única solución",
          "El sistema es incompatible"
        ],
        correct: 0,
        solution: `Resolución:
Para a=-3:
a²-3=9-3=6.

El sistema queda:
{ x-y-z=1
  x+2y+z=-4
  x-4y-3z=6 }.

Aplicamos Gauss:

[[1,-1,-1,1],
 [1,2,1,-4],
 [1,-4,-3,6]]

F₂←F₂-F₁, F₃←F₃-F₁:

[[1,-1,-1,1],
 [0,3,2,-5],
 [0,-3,-2,5]]

F₃←F₃+F₂:

[[1,-1,-1,1],
 [0,3,2,-5],
 [0,0,0,0]].

rango(A)=rango(A*)=2<3: sistema compatible indeterminado.

Tomamos z=3t. Entonces:
3y+2(3t)=-5
y=-frac{5}{3}-2t.

En la primera ecuación:
x-y-z=1
x=1+y+z
=1-frac{5}{3}-2t+3t
=-frac{2}{3}+t.

Resultado final:
(x,y,z)=(-frac{2}{3}+t,-frac{5}{3}-2t,3t), t∈ℝ.`
      }
    },

    "mates2-algebra-adef7c810043": {
      "a)": {
        options: [
          "a=2, b=-1",
          "a=1, b=0",
          "a=-2, b=1",
          "a=2, b=1"
        ],
        correct: 0,
        solution: `Resolución:

A=[[1,-3],[0,1]],
I=[[1,0],[0,1]].

1. Calculamos:
A²=[[1,-3],[0,1]]·[[1,-3],[0,1]]
=[[1,-6],[0,1]].

2. Planteamos:
aA+bI
=a[[1,-3],[0,1]]+b[[1,0],[0,1]]
=[[a+b,-3a],[0,a+b]].

3. Igualamos con A²:
{ a+b=1
  -3a=-6 }.

De la segunda ecuación:
a=2.

Entonces:
2+b=1
b=-1.

Resultado final: a=2 y b=-1.`
      },
      "b)": {
        options: [
          "X=[[p,q],[0,p]], con p,q∈ℝ",
          "Solo X=I",
          "X=[[p,0],[q,p]], con p,q∈ℝ",
          "Cualquier matriz cuadrada X de orden 2"
        ],
        correct: 0,
        solution: `Resolución:
Desarrollamos respetando el orden de los productos:

(A-X)(A+X)
=A²+AX-XA-X².

Para que sea igual a A²-X² debe cumplirse:
AX-XA=0,
es decir:
AX=XA.

Sea:
X=[[p,q],[r,s]].

Calculamos:

AX=[[1,-3],[0,1]]·[[p,q],[r,s]]
=[[p-3r,q-3s],[r,s]],

XA=[[p,q],[r,s]]·[[1,-3],[0,1]]
=[[p,-3p+q],[r,-3r+s]].

Igualamos elemento a elemento:
p-3r=p ⇒ r=0,
q-3s=-3p+q ⇒ s=p.

Los parámetros p y q quedan libres.

Resultado final:
X=[[p,q],[0,p]], con p,q∈ℝ.`
      }
    }
  });

  // Matemáticas II · Análisis · 2018.
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-analisis-18b1ff6e8760": {
      "b)": [
        {
          options: [
            "Tiene exactamente dos puntos de corte",
            "Tiene exactamente un punto de corte",
            "No corta al eje OX",
            "Tiene exactamente quince puntos de corte"
          ],
          correct: 1,
          solution: `Resolución:
Buscamos el número exacto de soluciones reales de:
x¹⁵+x+1=0.

Derivamos:
f'(x)=15x¹⁴+1.

Como x¹⁴≥0 para todo x∈ℝ:
f'(x)=15x¹⁴+1>0.

Por tanto, f es estrictamente creciente en toda la recta real y puede cortar al eje OX como máximo una vez.

Además:
f(-1)=-1-1+1=-1<0,
f(0)=1>0.

Como f es continua, por el teorema de Bolzano existe al menos una raíz en (-1,0). Al ser estrictamente creciente, esa raíz es única.

Resultado final: la gráfica corta al eje OX exactamente una vez.`
        },
        {
          options: [
            "frac{1}{3}ln|frac{eˣ-1}{eˣ+2}|+C",
            "ln|e²ˣ+eˣ-2|+C",
            "frac{1}{3}ln|frac{eˣ+2}{eˣ-1}|+C",
            "frac{eˣ}{e²ˣ+eˣ-2}+C"
          ],
          correct: 0,
          solution: `Resolución:
I=∫frac{eˣ}{e²ˣ+eˣ-2} dx.

Hacemos el cambio:
t=eˣ,
dt=eˣ dx.

Entonces:
I=∫frac{1}{t²+t-2} dt.

Factorizamos:
t²+t-2=(t-1)(t+2).

Descomponemos en fracciones simples:
frac{1}{(t-1)(t+2)}
=frac{A}{t-1}+frac{B}{t+2}.

1=A(t+2)+B(t-1).

Para t=1:
1=3A ⇒ A=frac{1}{3}.

Para t=-2:
1=-3B ⇒ B=-frac{1}{3}.

Por tanto:
I=frac{1}{3}∫frac{1}{t-1}dt-frac{1}{3}∫frac{1}{t+2}dt

=frac{1}{3}ln|t-1|-frac{1}{3}ln|t+2|+C

=frac{1}{3}ln|frac{t-1}{t+2}|+C.

Volvemos a t=eˣ:

Resultado final:
I=frac{1}{3}ln|frac{eˣ-1}{eˣ+2}|+C.`
        }
      ],
      "a)": {
        options: [
          "-2π",
          "2π",
          "0",
          "π"
        ],
        correct: 0,
        solution: `Resolución:
I=∫₀^π(x²-1)cos x dx
=∫₀^πx²cos x dx-∫₀^πcos x dx.

La segunda integral es:
∫₀^πcos x dx=[sen x]₀^π=0.

Para la primera integral integramos dos veces por partes:
u=x²,  dv=cos x dx,
du=2x dx,  v=sen x.

∫x²cos x dx=x²sen x-∫2x sen x dx.

En la integral restante:
u=2x,  dv=sen x dx,
du=2 dx,  v=-cos x.

Así:
∫x²cos x dx
=x²sen x+2x cos x-2sen x.

Aplicamos la regla de Barrow:
I=[x²sen x+2x cos x-2sen x]₀^π
=2π cos π
=-2π.

Resultado final: I=-2π.`
      }
    },

    "mates2-analisis-50b182e82d8b": {
      "b)": {
        options: [
          "c=frac{7}{3}",
          "c=1",
          "c=3",
          "c=frac{5}{3}"
        ],
        correct: 0,
        solution: `Resolución:
La función es:
f(x)=x³-5x²+7x+a.

El punto cuya existencia asegura el teorema de Rolle debe cumplir:
f'(c)=0, con c∈(1,3).

Derivamos:
f'(x)=3x²-10x+7.

Resolvemos:
3x²-10x+7=0.

x=frac{10±√(100-84)}{6}
=frac{10±4}{6}.

Las soluciones son:
x=1,
x=frac{7}{3}.

El valor x=1 no pertenece al intervalo abierto (1,3). En cambio:
frac{7}{3}∈(1,3).

Resultado final: c=frac{7}{3}.`
      },
      "c)": {
        options: [
          "Puntos (frac{1}{3},frac{49}{27}) y (3,3); área 4e⁻²",
          "Puntos (frac{1}{3},frac{49}{27}) y (3,3); área 2e⁻²",
          "Puntos (1,3) y (3,3); área 4e⁻²",
          "Un único punto (3,3); área 4e⁻²"
        ],
        correct: 0,
        solution: `Resolución:
Primera cuestión: puntos cuya tangente tiene pendiente 4.

f(x)=x³-5x²+7x,
f'(x)=3x²-10x+7.

Igualamos la derivada a la pendiente de y=4x+2:
3x²-10x+7=4
3x²-10x+3=0.

x=frac{10±√(100-36)}{6}
=frac{10±8}{6}.

Por tanto:
x=frac{1}{3} o x=3.

Calculamos las ordenadas:

f(frac{1}{3})
=frac{1}{27}-frac{5}{9}+frac{7}{3}
=frac{49}{27}.

f(3)=27-45+21=3.

Los puntos son:
(frac{1}{3},frac{49}{27}) y (3,3).

Segunda cuestión: área entre
f(x)=2xe⁻ˣ y g(x)=x²e⁻ˣ.

Buscamos los puntos de corte:
2xe⁻ˣ=x²e⁻ˣ.

Como e⁻ˣ>0:
x(2-x)=0,
x=0 o x=2.

En (0,2), f(x)>g(x). Por tanto:

A=∫₀²(2x-x²)e⁻ˣ dx.

Observamos que:
(x²e⁻ˣ)'=(2x-x²)e⁻ˣ.

Aplicamos Barrow:
A=[x²e⁻ˣ]₀²
=4e⁻².

Resultado final:
los puntos son (frac{1}{3},frac{49}{27}) y (3,3), y el área es 4e⁻² unidades cuadradas.`
      }
    },

    "mates2-analisis-6c069147729c": {
      "a)": [
        {
          options: [
            "a=frac{1}{4}, b=1",
            "a=1, b=frac{1}{4}",
            "a=frac{e²}{4}, b=1",
            "a=frac{1}{2}, b=2"
          ],
          correct: 0,
          solution: `Resolución:
C(t)=at²e⁻ᵇᵗ.

El punto (2,e⁻²) pertenece a la gráfica:
C(2)=e⁻².

Por tanto:
4ae⁻²ᵇ=e⁻².  (1)

Además, t=2 es un extremo relativo, luego:
C'(2)=0.

Derivamos:
C'(t)=a[2te⁻ᵇᵗ-bt²e⁻ᵇᵗ]
=at e⁻ᵇᵗ(2-bt).

Sustituimos t=2:
C'(2)=2ae⁻²ᵇ(2-2b)=0.

Como a>0 y e⁻²ᵇ>0:
2-2b=0
b=1.

Sustituimos b=1 en (1):
4ae⁻²=e⁻²
4a=1
a=frac{1}{4}.

Resultado final: a=frac{1}{4} y b=1.`
        },
        {
          options: [
            "a=1, b=-1",
            "a=-1, b=1",
            "a=1, b=1",
            "a=0, b=-1"
          ],
          correct: 0,
          solution: `Resolución:
La función es:

f(x)={(x²+a)/(x-1), si x<0;
      bx-1, si x≥0}.

Cada rama es derivable en su intervalo. Solo estudiamos x=0.

1. Continuidad en x=0.

Límite por la izquierda:
lim(x→0⁻)frac{x²+a}{x-1}
=frac{a}{-1}
=-a.

Límite por la derecha y valor de la función:
lim(x→0⁺)(bx-1)=f(0)=-1.

Para que sea continua:
-a=-1
a=1.

2. Derivabilidad en x=0.

Derivamos la primera rama:

[frac{x²+a}{x-1}]'
=frac{2x(x-1)-(x²+a)}{(x-1)²}.

Con a=1:
f'(0⁻)=frac{-1}{1}=-1.

La derivada de la segunda rama es:
f'(x)=b,
luego f'(0⁺)=b.

Para que sea derivable:
b=-1.

Resultado final: a=1 y b=-1.`
        }
      ],
      "b)": [
        {
          options: [
            "La concentración tiende a 0",
            "La concentración tiende a frac{1}{4}",
            "La concentración tiende a +∞",
            "La concentración tiende a e⁻²"
          ],
          correct: 0,
          solution: `Resolución:
Con los valores obtenidos:
C(t)=frac{1}{4}t²e⁻ᵗ
=frac{t²}{4eᵗ}.

Calculamos:
lim(t→+∞)frac{t²}{4eᵗ}.

Es una indeterminación ∞/∞, por lo que aplicamos la regla de L'Hôpital:

lim(t→+∞)frac{2t}{4eᵗ}.

Sigue siendo ∞/∞. Aplicamos L'Hôpital de nuevo:

lim(t→+∞)frac{2}{4eᵗ}=0.

Interpretación: al transcurrir mucho tiempo, el organismo elimina el fármaco y su concentración en sangre se aproxima a cero.

Resultado final: la concentración tiende a 0.`
        },
        {
          options: [
            "b=frac{10}{3}",
            "b=3",
            "b=frac{8}{3}",
            "b=4"
          ],
          correct: 0,
          solution: `Resolución:
En el intervalo [1,2] se cumple x≥0, por lo que:
f(x)=bx-1.

La condición es:
∫₁²f(x)dx=4.

Sustituimos:
∫₁²(bx-1)dx=4.

Una primitiva es:
frac{b}{2}x²-x.

Aplicamos la regla de Barrow:

[frac{b}{2}x²-x]₁²=4.

(2b-2)-(frac{b}{2}-1)=4.

2b-2-frac{b}{2}+1=4.

frac{3b}{2}-1=4.

frac{3b}{2}=5.

b=frac{10}{3}.

Resultado final: b=frac{10}{3}.`
        }
      ]
    },

    "mates2-analisis-955dffd3f9be": {
      "b)": [
        {
          options: [
            "y=x+frac{7}{4}",
            "y=-x+frac{3}{4}",
            "y=x+frac{5}{4}",
            "y=-x+frac{7}{4}"
          ],
          correct: 0,
          solution: `Resolución:
La parábola es:
y=x²+1.

En x=-frac{1}{2}:
y=(-frac{1}{2})²+1
=frac{1}{4}+1
=frac{5}{4}.

El punto es:
P=(-frac{1}{2},frac{5}{4}).

La pendiente de la tangente es:
m=f'(x)=2x.

En x=-frac{1}{2}:
m=-1.

La pendiente mₙ de la normal cumple:
m·mₙ=-1.

Sustituimos:
(-1)mₙ=-1
mₙ=1.

Usamos la ecuación punto-pendiente:
y-frac{5}{4}=1(x+frac{1}{2}).

Despejamos:
y=x+frac{1}{2}+frac{5}{4}
=x+frac{7}{4}.

Resultado final: y=x+frac{7}{4}.`
        },
        {
          options: [
            "3-e",
            "e-3",
            "e-1",
            "3+e"
          ],
          correct: 0,
          solution: `Resolución:
I=∫₁²(2x-3)eˣ⁻¹dx.

Hacemos el cambio:
u=x-1,
du=dx.

Cuando x=1, u=0.
Cuando x=2, u=1.

Además:
2x-3=2(u+1)-3=2u-1.

Por tanto:
I=∫₀¹(2u-1)eᵘdu.

Una primitiva es:
(2u-3)eᵘ,
porque:
[(2u-3)eᵘ]'=2eᵘ+(2u-3)eᵘ=(2u-1)eᵘ.

Aplicamos Barrow:
I=[(2u-3)eᵘ]₀¹

=(-1)e-(-3)
=3-e.

Resultado final: I=3-e.`
        }
      ],
      "a)": {
        options: [
          "x²+x-2ln|x|+3ln|x-1|+C",
          "x²-x+2ln|x|-3ln|x-1|+C",
          "2x²+x-ln|x|+ln|x-1|+C",
          "x²+x+2ln|x|+3ln|x-1|+C"
        ],
        correct: 0,
        solution: `Resolución:
I=∫frac{2x³-x²+2}{x²-x}dx.

Dividimos:
frac{2x³-x²+2}{x²-x}
=2x+1+frac{x+2}{x(x-1)}.

Planteamos:
frac{x+2}{x(x-1)}
=frac{A}{x}+frac{B}{x-1}.

x+2=A(x-1)+Bx.

Con x=0:
2=-A ⇒ A=-2.

Con x=1:
3=B.

Por tanto:
I=∫(2x+1-frac{2}{x}+frac{3}{x-1})dx

=x²+x-2ln|x|+3ln|x-1|+C.

Resultado final:
I=x²+x-2ln|x|+3ln|x-1|+C.`
      }
    }
  });

  // Matemáticas II · Geometría · 2018.
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-geometria-d869c8c00f74": {
      "a)": {
        options: [
          "frac{3}{2}",
          "3",
          "frac{9}{2}",
          "frac{1}{2}"
        ],
        correct: 0,
        solution: `Resolución:
El plano es:
α≡4x+2y+4z-15=0,
y el punto:
A=(2,-3,1).

La distancia de un punto a un plano es:

d(A,α)=frac{|4·2+2·(-3)+4·1-15|}{√(4²+2²+4²)}.

Calculamos el numerador:
|8-6+4-15|=|-9|=9.

Calculamos el denominador:
√(16+4+16)=√36=6.

Por tanto:
d(A,α)=frac{9}{6}=frac{3}{2}.

Resultado final: d(A,α)=frac{3}{2}.`
      },
      "b)": {
        options: [
          "Los planos 2x+y+2z-12=0 y 2x+y+2z-3=0",
          "El único plano 4x+2y+4z-15=0",
          "Una esfera de centro A y radio frac{3}{2}",
          "Los planos 2x+y+2z-9=0 y 2x+y+2z+9=0"
        ],
        correct: 0,
        solution: `Resolución:
Sea P=(x,y,z) un punto cualquiera del lugar geométrico.

Debe cumplirse:
d(P,α)=d(A,α)=frac{3}{2}.

Aplicamos la fórmula:

frac{|4x+2y+4z-15|}{√(4²+2²+4²)}=frac{3}{2}.

Como el denominador es 6:
frac{|4x+2y+4z-15|}{6}=frac{3}{2}.

Multiplicamos por 6:
|4x+2y+4z-15|=9.

Se presentan dos casos:

4x+2y+4z-15=9
⇒ 4x+2y+4z-24=0
⇒ 2x+y+2z-12=0.

4x+2y+4z-15=-9
⇒ 4x+2y+4z-6=0
⇒ 2x+y+2z-3=0.

Resultado final: el lugar geométrico está formado por los dos planos paralelos
2x+y+2z-12=0 y 2x+y+2z-3=0.`
      }
    },

    "mates2-geometria-0d7e6b1f7af7": {
      "a)": {
        options: [
          "λ=-3",
          "λ=3",
          "λ=-frac{3}{2}",
          "λ=0"
        ],
        correct: 0,
        solution: `Resolución:
Los vectores son:
u⃗=(0,1,1),
v⃗=(1,1,-1),
w⃗=(2,0,3).

Calculamos:
u⃗-λv⃗
=(0,1,1)-λ(1,1,-1)
=(-λ,1-λ,1+λ).

Para que sea perpendicular a w⃗, su producto escalar debe ser cero:

(u⃗-λv⃗)·w⃗=0.

Sustituimos:
(-λ,1-λ,1+λ)·(2,0,3)=0.

-2λ+0+3(1+λ)=0.

-2λ+3+3λ=0.

λ+3=0.

Resultado final: λ=-3.`
      },
      "b)": {
        options: [
          "Son linealmente independientes porque su determinante vale -7",
          "Son linealmente dependientes porque w⃗=2u⃗+v⃗",
          "Son linealmente dependientes porque su determinante vale 0",
          "Solo u⃗ y v⃗ son dependientes"
        ],
        correct: 0,
        solution: `Resolución:
Colocamos los tres vectores como filas de un determinante:

D=det[[0,1,1],
      [1,1,-1],
      [2,0,3]].

Desarrollamos por la primera fila:

D
=-det[[1,-1],[2,3]]
+det[[1,1],[2,0]].

D=-(3+2)+(0-2)
=-5-2
=-7.

Como D≠0, los tres vectores son linealmente independientes.

Resultado final: u⃗, v⃗ y w⃗ son linealmente independientes.`
      },
      "c)": {
        options: [
          "{ x+2y-2=0; y+z-2=0 }",
          "{ x-2y-2=0; y-z+2=0 }",
          "{ x+y-2=0; z=2 }",
          "{ 2x+y-4=0; y+z-2=0 }"
        ],
        correct: 0,
        solution: `Resolución:
La recta debe ser perpendicular simultáneamente a:
u⃗=(0,1,1) y v⃗=(1,1,-1).

Por tanto, un vector director es el producto vectorial:

d⃗=u⃗×v⃗
=det[[i⃗,j⃗,k⃗],
     [0,1,1],
     [1,1,-1]]
=(-2,1,-1).

La recta pasa por P=(2,0,2), luego sus ecuaciones paramétricas son:

{ x=2-2t
  y=t
  z=2-t }, t∈ℝ.

Para obtener las ecuaciones implícitas eliminamos t.

Como t=y:
x=2-2y ⇒ x+2y-2=0,
z=2-y ⇒ y+z-2=0.

Resultado final:

{ x+2y-2=0
  y+z-2=0 }.`
      }
    },

    "mates2-geometria-868b276a07e2": {
      "a)": {
        options: [
          "frac{√401}{3}",
          "frac{√401}{9}",
          "frac{20}{3}",
          "√401"
        ],
        correct: 0,
        solution: `Resolución:
La recta r es la intersección de:

α≡x-2y-6=0,
β≡2y+z=0.

Tomamos y=t. Entonces:
x=6+2t,
z=-2t.

Por tanto:
r:{ x=6+2t
     y=t
     z=-2t }, t∈ℝ.

Un punto de r es R=(6,0,0) y un vector director es:
d⃗=(2,1,-2).

El punto dado es A=(-1,3,0). Entonces:
RA⃗=A-R=(-7,3,0).

La distancia de un punto a una recta es:

d(A,r)=frac{|RA⃗×d⃗|}{|d⃗|}.

Calculamos:
RA⃗×d⃗=(-7,3,0)×(2,1,-2)
=(-6,-14,-13).

Su módulo es:
√(36+196+169)=√401.

Además:
|d⃗|=√(4+1+4)=3.

Resultado final:
d(A,r)=frac{√401}{3}.`
      },
      "b)": {
        options: [
          "Q=(frac{32}{9},-frac{11}{9},frac{22}{9})",
          "Q=(frac{32}{9},frac{11}{9},-frac{22}{9})",
          "Q=(6,0,0)",
          "Q=(-1,3,0)"
        ],
        correct: 0,
        solution: `Resolución:
La recta es:

r:{ x=6+2t
     y=t
     z=-2t }.

El punto genérico de la recta es:
Q(t)=(6+2t,t,-2t).

El punto de r más próximo a A=(-1,3,0) es el pie de la perpendicular. Por tanto:
AQ⃗·d⃗=0,
donde d⃗=(2,1,-2).

AQ⃗=Q-A=(7+2t,t-3,-2t).

Planteamos:
(7+2t,t-3,-2t)·(2,1,-2)=0.

14+4t+t-3+4t=0.

11+9t=0.

t=-frac{11}{9}.

Sustituimos en Q(t):

x=6+2(-frac{11}{9})=frac{32}{9},
y=-frac{11}{9},
z=-2(-frac{11}{9})=frac{22}{9}.

Resultado final:
Q=(frac{32}{9},-frac{11}{9},frac{22}{9}).`
      },
      "c)": {
        options: [
          "7x+4y+9z-5=0",
          "7x-4y+9z+5=0",
          "2x+y-2z-1=0",
          "3x-3y-z+12=0"
        ],
        correct: 0,
        solution: `Resolución:
El plano debe contener los puntos:
A=(-1,3,0), B=(2,0,-1),
y ser paralelo a la recta r.

Calculamos:
AB⃗=B-A=(3,-3,-1).

Un vector director de r es:
d⃗=(2,1,-2).

Un vector normal del plano es:

n⃗=AB⃗×d⃗
=(3,-3,-1)×(2,1,-2)
=(7,4,9).

La ecuación del plano que pasa por A es:

7(x+1)+4(y-3)+9(z-0)=0.

Desarrollamos:
7x+7+4y-12+9z=0.

Resultado final:
7x+4y+9z-5=0.`
      }
    },

    "mates2-geometria-dcc48e2b5237": {
      "a)": {
        options: [
          "C=(3,-2,1)",
          "C=(-1,2,0)",
          "C=(1,0,3)",
          "C=(-3,4,5)"
        ],
        correct: 0,
        solution: `Resolución:
El lado desigual es AB. Por tanto, los lados iguales deben ser:
CA=CB.

Un punto genérico de r es:
C(λ)=(1-λ,λ,3+λ).

Con A=(-1,2,0):

CA⃗=A-C=(-2+λ,2-λ,-3-λ).

Con B=(1,0,-4):

CB⃗=B-C=(λ,-λ,-7-λ).

Igualamos los cuadrados de las longitudes:

|CA⃗|²=|CB⃗|².

(2-λ)²+(λ-2)²+(λ+3)²
=λ²+λ²+(λ+7)².

Desarrollamos:
3λ²-2λ+17=3λ²+14λ+49.

-16λ=32.

λ=-2.

Sustituimos en la recta:
C=(1-(-2),-2,3-2).

Resultado final:
C=(3,-2,1).`
      },
      "b)": {
        options: [
          "{ x=-1+t; y=2+t; z=0 }, t∈ℝ",
          "{ x=-1-t; y=2+t; z=t }, t∈ℝ",
          "{ x=-1+2t; y=2-2t; z=-4t }, t∈ℝ",
          "{ x=t; y=t; z=t }, t∈ℝ"
        ],
        correct: 0,
        solution: `Resolución:
La recta r tiene vector director:
d⃗ᵣ=(-1,1,1).

Además:
AB⃗=B-A=(2,-2,-4).

La recta pedida debe ser perpendicular a ambos vectores. Por tanto, tomamos como vector director:

d⃗=d⃗ᵣ×AB⃗.

d⃗
=(-1,1,1)×(2,-2,-4)
=(-2,-2,0).

Podemos usar el vector proporcional:
d⃗=(1,1,0).

La recta pasa por A=(-1,2,0). Sus ecuaciones paramétricas son:

{ x=-1+t
  y=2+t
  z=0 }, t∈ℝ.

Comprobación:
(1,1,0)·(-1,1,1)=0,
(1,1,0)·(2,-2,-4)=0.

Resultado final:
{ x=-1+t; y=2+t; z=0 }, t∈ℝ.`
      }
    }
  });

  // Matemáticas II · Probabilidad y Estadística · 2018.
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-probabilidad-estadistica-77aff8b55067": {
      "b)": {
        options: [
          "Media frac{5}{3}, desviación típica frac{√10}{3}; P(X≥4)=frac{11}{243}",
          "Media frac{5}{2}, desviación típica frac{√5}{2}; P(X≥4)=frac{6}{32}",
          "Media frac{5}{3}, desviación típica frac{√10}{3}; P(X≥4)=frac{10}{243}",
          "Media frac{1}{3}, desviación típica frac{√2}{3}; P(X≥4)=frac{11}{81}"
        ],
        correct: 0,
        solution: `Resolución:
En un dado hay dos múltiplos de tres: 3 y 6.

Por tanto, en cada lanzamiento:
p=frac{2}{6}=frac{1}{3},
q=1-p=frac{2}{3}.

Como se realizan cinco lanzamientos independientes:
X∼B(5,frac{1}{3}).

b1) Media y desviación típica.

La media de una binomial es:
μ=np.

μ=5·frac{1}{3}=frac{5}{3}.

La desviación típica es:
σ=√(npq).

σ=√(5·frac{1}{3}·frac{2}{3})
=√(frac{10}{9})
=frac{√10}{3}.

b2) Probabilidad de obtener cuatro o más múltiplos de tres.

P(X≥4)=P(X=4)+P(X=5).

P(X=4)
=C(5,4)(frac{1}{3})⁴(frac{2}{3})
=5·frac{1}{81}·frac{2}{3}
=frac{10}{243}.

P(X=5)
=C(5,5)(frac{1}{3})⁵
=frac{1}{243}.

P(X≥4)=frac{10}{243}+frac{1}{243}
=frac{11}{243}.

Resultado final:
μ=frac{5}{3}, σ=frac{√10}{3} y P(X≥4)=frac{11}{243}.`
      }
    },

    "mates2-probabilidad-estadistica-4ff268147ad7": {
      "b)": {
        options: [
          "Aproximadamente 352 opositores; nota de corte 5,15",
          "Aproximadamente 648 opositores; nota de corte 5,15",
          "Aproximadamente 352 opositores; nota de corte 4,49",
          "Aproximadamente 330 opositores; nota de corte 6,55"
        ],
        correct: 0,
        solution: `Resolución:
Sea X la nota de un opositor:
X∼N(4,05; 2,5).

b1) Opositores que han superado el 5.

Tipificamos dentro de la probabilidad:

P(X>5)
=P(Z>frac{5-4,05}{2,5})
=P(Z>0,38).

Usamos el suceso complementario:
P(Z>0,38)=1-P(Z≤0,38).

En la tabla:
P(Z≤0,38)=0,6480.

Por tanto:
P(X>5)=1-0,6480=0,3520.

Entre 1000 opositores:
1000·0,3520=352.

Han superado el 5 aproximadamente 352 opositores.

b2) Nota de corte para adjudicar 330 plazas.

Sea K la nota de corte. Debe cumplirse:
P(X≥K)=frac{330}{1000}=0,33.

Entonces:
P(X≤K)=1-0,33=0,67.

Llamamos a al valor tipificado:
P(Z≤a)=0,67.

Buscamos 0,67 en la tabla de la normal y obtenemos:
a≈0,44.

Igualamos con la tipificación de K:

frac{K-4,05}{2,5}=0,44.

Despejamos:
K-4,05=1,10,
K=5,15.

Resultado final:
aproximadamente 352 opositores han superado el 5 y la nota de corte es 5,15.`
      }
    },

    "mates2-probabilidad-estadistica-b42c9f7ff2b3": {
      "b)": {
        options: [
          "Con 2 ítems: frac{1}{2}; con 4 ítems: frac{53}{512}",
          "Con 2 ítems: frac{1}{2}; con 4 ítems: frac{1}{4}",
          "Con 2 ítems: frac{5}{16}; con 4 ítems: frac{53}{512}",
          "Con 2 ítems: frac{11}{16}; con 4 ítems: frac{27}{256}"
        ],
        correct: 0,
        solution: `Resolución:
Se aprueba si se aciertan al menos tres de las cinco preguntas.

b1) Dos ítems por pregunta.

La probabilidad de acertar al azar es:
p=frac{1}{2}.

Sea X∼B(5,frac{1}{2}). Entonces:

P(X≥3)=P(X=3)+P(X=4)+P(X=5).

=C(5,3)(frac{1}{2})⁵
+C(5,4)(frac{1}{2})⁵
+C(5,5)(frac{1}{2})⁵.

=frac{10+5+1}{32}
=frac{16}{32}
=frac{1}{2}.

b2) Cuatro ítems por pregunta.

Ahora:
p=frac{1}{4},
q=frac{3}{4}.

Sea Y∼B(5,frac{1}{4}). Entonces:

P(Y≥3)=P(Y=3)+P(Y=4)+P(Y=5).

P(Y=3)
=C(5,3)(frac{1}{4})³(frac{3}{4})²
=frac{90}{1024}.

P(Y=4)
=C(5,4)(frac{1}{4})⁴(frac{3}{4})
=frac{15}{1024}.

P(Y=5)
=(frac{1}{4})⁵
=frac{1}{1024}.

Sumamos:
P(Y≥3)=frac{90+15+1}{1024}
=frac{106}{1024}
=frac{53}{512}.

Resultado final:
con dos ítems, P=frac{1}{2}; con cuatro ítems, P=frac{53}{512}.`
      }
    },

    "mates2-probabilidad-estadistica-9bd2effe19c2": {
      "b)": {
        options: [
          "P(22≤X≤28)=0,8664; capacidad mínima 29 cl",
          "P(22≤X≤28)=0,9332; capacidad mínima 28 cl",
          "P(22≤X≤28)=0,8664; capacidad mínima 30 cl",
          "P(22≤X≤28)=0,6826; capacidad mínima 29 cl"
        ],
        correct: 0,
        solution: `Resolución:
La cantidad dispensada sigue una distribución normal de media 25 cl y varianza 4.

Por tanto:
X∼N(25;2),
ya que σ=√4=2.

b1) Probabilidad de descargar entre 22 y 28 cl.

Tipificamos dentro de la probabilidad:

P(22≤X≤28)
=P(frac{22-25}{2}≤Z≤frac{28-25}{2})

=P(-1,5≤Z≤1,5).

Por simetría:
P(Z≤-1,5)=1-P(Z≤1,5).

En la tabla:
P(Z≤1,5)=0,9332.

Entonces:
P(-1,5≤Z≤1,5)
=0,9332-(1-0,9332)
=0,9332-0,0668
=0,8664.

b2) Capacidad mínima del vaso.

Sea K la capacidad. Queremos:
P(X>K)<0,025.

En el límite:
P(X≤K)=1-0,025=0,975.

Llamamos a al valor tipificado:
P(Z≤a)=0,975.

Buscamos en la tabla:
a=1,96.

Por tanto:
frac{K-25}{2}=1,96.

K-25=3,92.

K=28,92 cl.

Redondeando a centímetros cúbicos enteros y asegurando que no se derrame:
K=29 cl.

Resultado final:
P(22≤X≤28)=0,8664 y la capacidad mínima es 29 cl.`
      }
    }
  });
})();

// Banco operativo verificado de ejercicios oficiales de 2022.
// Cada apartado dispone de cuatro opciones, una respuesta correcta y resolución.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-algebra-509a0ef7125b": {
      "b)": {
        options: [
          "Sí: X=2I o X=-2I",
          "Sí: únicamente X=2I",
          "Sí: X=((0,2),(2,0)) o X=((0,-2),(-2,0))",
          "No existe ninguna"
        ],
        correct: 0,
        solution: `Resolución:
1. Escribimos una matriz cualquiera de orden 2:
X=((p,q),(r,s)).
2. Calculamos ambos productos:
A·X=((2p,2q),(p-r,q-s)),
X·A=((2p+q,-q),(2r+s,-s)).
3. Igualamos las entradas porque A·X=X·A:
q=0,
p-r=2r+s, es decir, p=3r+s.
Por tanto, todas las matrices que conmutan con A son
X=((3r+s,0),(r,s)), con r,s∈ℝ.
4. Para que X sea simétrica, sus elementos situados a ambos lados de la diagonal principal deben coincidir. Como q=0, necesitamos r=0.
Entonces X=sI=((s,0),(0,s)).
5. Imponemos que el determinante valga 4:
det(X)=s²=4.
De aquí, s=2 o s=-2.
Resultado final: existen dos matrices simétricas: X=2I y X=-2I.`
      }
    },
    "mates2-algebra-509a0ef7125b--mates-ii-algebra-2": {
      "Resultado": {
        options: [
          "Sí: tapiz 0,50 €, cuaderno 1,50 € y agenda 2 €",
          "Sí: tapiz 1 €, cuaderno 3 € y agenda 2 €",
          "No; existen infinitas posibilidades válidas",
          "No existe ninguna solución con precios positivos"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos t al precio de un tapiz, c al de un cuaderno y a al de una agenda, expresados en euros.
2. Traducimos el enunciado:
3t+c+a=5,
2c+a=5.
3. Restamos la segunda ecuación a la primera:
3t-c=0,
por tanto, c=3t.
4. Como los precios son múltiplos de 0,50 €, escribimos t=0,50n, con n entero positivo. Entonces:
c=1,50n,
a=5-2c=5-3n.
5. Todos los precios deben ser positivos. Por tanto:
5-3n>0.
Como n es entero positivo, necesariamente n=1.
6. Sustituimos:
t=0,50 €, c=1,50 €, a=2 €.
7. Comprobamos:
3·0,50+1,50+2=5,
2·1,50+2=5.
Resultado final: sí podemos saberlos; un tapiz cuesta 0,50 €, un cuaderno 1,50 € y una agenda 2 €.`
      }
    },
    "mates2-algebra-509a0ef7125b--mates-ii-algebra-3": {
      "Resultado": {
        options: [
          "rango(M)=2 si m=1 y rango(M)=3 si m≠1",
          "rango(M)=2 si m=0 y rango(M)=3 si m≠0",
          "rango(M)=2 si m∈{0,1} y rango(M)=3 en otro caso",
          "rango(M)=3 para todo m∈ℝ"
        ],
        correct: 0,
        solution: `Resolución:
1. La matriz M tiene 3 filas, de modo que su rango no puede ser mayor que 3.
2. Estudiamos menores de orden 3. Tomando las columnas 1, 2 y 3:
D₁=|((2,m,0),(2,1,0),(4,1,m))|=2m(1-m).
3. Tomando las columnas 1, 2 y 4:
D₂=|((2,m,1),(2,1,m),(4,1,2))|
=4m²-6m+2
=2(2m-1)(m-1).
4. Si m≠1, al menos uno de estos dos menores es distinto de cero:
- si m≠0 y m≠1, D₁≠0;
- si m=0, D₂=2≠0.
Por tanto, rango(M)=3 para m≠1.
5. Si m=1, todos los menores de orden 3 se anulan y
M=((2,1,0,1),(2,1,0,1),(4,1,1,2)).
Las dos primeras filas coinciden, pero la tercera no es proporcional a ellas. Por ejemplo,
|((2,1),(4,1))|=2-4=-2≠0.
Así, rango(M)=2.
Resultado final: rango(M)=2 si m=1 y rango(M)=3 si m≠1.`
      }
    },
    "mates2-algebra-e78a0fa831e5": {
      "b)": {
        options: [
          "(x,y,z)=(-t,1-t,t), con t∈ℝ",
          "(x,y,z)=(t,1-t,-t), con t∈ℝ",
          "(x,y,z)=(0,1,0), única solución",
          "El sistema es incompatible para a=1"
        ],
        correct: 0,
        solution: `Resolución:
1. Para a=1, el sistema queda:
{ x+2y+3z=2
{ x+z=0
{ x+y+2z=1.
2. La primera ecuación es combinación lineal de las otras dos:
E₁=2E₃-E₂.
Por tanto,
rango(A)=rango(A*)=2<3,
y el sistema es compatible indeterminado.
3. Tomamos z=t como parámetro libre.
4. De x+z=0:
x=-t.
5. Sustituimos en x+y+2z=1:
-t+y+2t=1,
y=1-t.
Resultado final:
(x,y,z)=(-t,1-t,t), con t∈ℝ.`
      }
    },
    "mates2-algebra-e78a0fa831e5--mates-ii-algebra-2": {
      "Resultado": {
        options: ["-4", "4", "-2", "8"],
        correct: 0,
        solution: `Resolución:
1. Denotamos por R₁, R₂ y R₃ las filas del determinante dado:
|((x,y,z),(a,b,c),(1,2,3))|=2.
2. El determinante que se pide tiene por filas:
R₃,
R₂-2R₃,
2R₁.
3. Sumar a una fila un múltiplo de otra no cambia el determinante. Por tanto, sustituir R₂ por R₂-2R₃ no modifica su valor.
4. Sacamos el factor 2 de la tercera fila:
|((R₃),(R₂-2R₃),(2R₁))|
=2|((R₃),(R₂),(R₁))|.
5. Para pasar del orden (R₁,R₂,R₃) al orden (R₃,R₂,R₁) intercambiamos R₁ y R₃ una vez; el determinante cambia de signo:
|((R₃),(R₂),(R₁))|=-2.
6. Por tanto:
2·(-2)=-4.
Resultado final: el determinante vale -4.`
      }
    },
    "mates2-algebra-e78a0fa831e5--mates-ii-algebra-3": {
      "Resultado": {
        options: [
          "X=((-3/2,-1),(-1,-2))",
          "X=((3/2,1),(1,2))",
          "X=((-1,-3/2),(-2,-1))",
          "X=((-2,-1),(-1,-3/2))"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de:
A·X+B=X.
2. Reunimos los términos que contienen X y sacamos factor común por la izquierda:
A·X-X=-B,
(A-I)X=-B.
3. Para aislar X multiplicamos por la izquierda por (A-I)⁻¹:
X=-(A-I)⁻¹B.
4. Calculamos:
A-I=((2,-1),(0,1)).
Su determinante es:
det(A-I)=2·1-0·(-1)=2≠0.
5. Calculamos la inversa mediante determinantes:
(A-I)⁻¹=1/2·((1,1),(0,2))
=((1/2,1/2),(0,1)).
6. Sustituimos y multiplicamos:
X=-((1/2,1/2),(0,1))·((2,0),(1,2))
=-((3/2,1),(1,2))
=((-3/2,-1),(-1,-2)).
7. Comprobación:
A·X+B=((-3/2,-1),(-1,-2))=X.
Resultado final: X=((-3/2,-1),(-1,-2)).`
      }
    },
    "mates2-analisis-7c48d547cb2d": {
      "Resultado": {
        options: ["e", "1", "e²", "+∞"],
        correct: 0,
        solution: `Resolución:
1. El límite es de la forma 1^∞:
lim(x→+∞) ((x+1)/x)^((x²+1)/x)
=lim(x→+∞) (1+1/x)^(x+1/x).
2. Aplicamos la fórmula del número e. Sea L el límite y tomamos logaritmos:
ln L=lim(x→+∞) (x+1/x)·ln(1+1/x).
3. Separamos:
ln L=lim(x→+∞) x·ln(1+1/x)
+lim(x→+∞) ln(1+1/x)/x.
4. El primer límite vale 1 por la definición de e y el segundo vale 0.
Por tanto, ln L=1.
5. Deshacemos el logaritmo:
L=e¹=e.
Resultado final: el límite vale e.`
      }
    },
    "mates2-analisis-7c48d547cb2d--mates-ii-analisis-2": {
      "a.1)": {
        options: ["a>0", "a≥0", "a<0", "a∈ℝ"],
        correct: 0,
        solution: `Resolución:
1. Los puntos de corte con el eje OX cumplen:
a-x²=0.
2. Despejamos:
x²=a,
x=±√a.
3. Para que existan dos puntos de corte distintos necesitamos que √a sea real y distinto de cero.
Esto ocurre exactamente cuando a>0.
Resultado final: la curva delimita un recinto cerrado con el eje OX para a>0.`
      },
      "a.2)": {
        options: [
          "a=9; ∫2x/√(1+3x²) dx=(2/3)√(1+3x²)+C",
          "a=6; ∫2x/√(1+3x²) dx=2√(1+3x²)+C",
          "a=9; ∫2x/√(1+3x²) dx=(1/3)√(1+3x²)+C",
          "a=27; ∫2x/√(1+3x²) dx=(2/3)√(1+3x²)+C"
        ],
        correct: 0,
        solution: `Resolución:
Apartado a.2)
1. Como a>0, los puntos de corte son x=-√a y x=√a. La parábola queda por encima del eje OX entre ambos puntos.
2. El área es:
A=∫(-√a→√a) (a-x²) dx.
3. Por simetría:
A=2∫(0→√a) (a-x²) dx
=2[a·x-x³/3]₀^(√a)
=2(a√a-a√a/3)
=4a√a/3.
4. Imponemos A=36:
4a√a/3=36,
a√a=27,
a^(3/2)=27.
5. Elevamos ambos miembros a 2/3:
a=27^(2/3)=9.

Apartado b)
1. Calculamos:
∫ 2x/√(1+3x²) dx.
2. Hacemos el cambio t=1+3x²:
dt=6x dx,
2x dx=dt/3.
3. Sustituimos:
∫ 2x/√(1+3x²) dx
=1/3∫t^(-1/2)dt
=1/3·2t^(1/2)+C.
4. Volvemos a x:
∫ 2x/√(1+3x²) dx=(2/3)√(1+3x²)+C.
Resultado final: a=9 y la primitiva es (2/3)√(1+3x²)+C.`
      }
    },
    "mates2-analisis-7c48d547cb2d--mates-ii-analisis-3": {
      "Resultado": {
        options: ["c=√3", "c=3/2", "c=2", "c=3"],
        correct: 0,
        solution: `Resolución:
1. Teorema del valor medio del cálculo integral:
si f es continua en [a,b], existe al menos un punto c∈(a,b) tal que
∫(a→b) f(x) dx=f(c)·(b-a).
Equivalentemente,
f(c)=1/(b-a)·∫(a→b)f(x)dx.
2. La función f(x)=3/x² es continua en [1,3], así que podemos aplicar el teorema.
3. Calculamos su valor medio:
1/(3-1)·∫(1→3) 3/x² dx
=1/2·[-3/x]₁³
=1/2·(-1+3)
=1.
4. Buscamos c∈(1,3) tal que f(c)=1:
3/c²=1,
c²=3.
Como c debe pertenecer a (1,3), tomamos c=√3.
5. Interpretación geométrica: el área bajo y=3/x² entre x=1 y x=3 coincide con el área del rectángulo de base 2 y altura f(√3)=1.
Resultado final: el punto al que alude el teorema tiene abscisa c=√3.`
      }
    },
    "mates2-analisis-977272ec7c51": {
      "a)": {
        options: ["a=4, b=-2", "a=2, b=-2", "a=4, b=2", "a=-4, b=-2"],
        correct: 0,
        solution: `Resolución:
1. La función es:
f(x)=(ax+1)/(2x+b).
2. Para que tenga una discontinuidad de salto infinito en x=1, el denominador debe anularse en ese punto:
2·1+b=0,
b=-2.
3. Además, el numerador no debe anularse en x=1:
a+1≠0.
4. Cuando x→+∞, como numerador y denominador tienen el mismo grado:
lim(x→+∞)(ax+1)/(2x+b)=a/2.
5. Imponemos que el límite sea 2:
a/2=2,
a=4.
6. Comprobamos el numerador en x=1:
a+1=5≠0.
Resultado final: a=4 y b=-2.`
      },
      "b)": {
        options: [
          "x·sen(2x)/2+cos(2x)/4+C",
          "x·sen(2x)/2-cos(2x)/4+C",
          "x·cos(2x)/2+sen(2x)/4+C",
          "x·sen(2x)+cos(2x)/2+C"
        ],
        correct: 0,
        solution: `Resolución:
1. Integramos por partes:
u=x, dv=cos(2x)dx.
Entonces:
du=dx, v=sen(2x)/2.
2. Aplicamos ∫u·dv=u·v-∫v·du:
∫x·cos(2x)dx
=x·sen(2x)/2-1/2∫sen(2x)dx.
3. Como:
∫sen(2x)dx=-cos(2x)/2,
obtenemos:
∫x·cos(2x)dx
=x·sen(2x)/2+cos(2x)/4+C.
4. Comprobamos derivando la expresión obtenida:
sen(2x)/2+x·cos(2x)-sen(2x)/2=x·cos(2x).
Resultado final: x·sen(2x)/2+cos(2x)/4+C.`
      }
    },
    "mates2-analisis-977272ec7c51--mates-ii-analisis-2": {
      "Resultado": {
        options: [
          "Continua en ℝ\\{0,2}; discontinuidad infinita en x=0 y evitable en x=2, con límite 18",
          "Continua en ℝ\\{0,2}; discontinuidad evitable en x=0 e infinita en x=2",
          "Continua en ℝ\\{0}; solo tiene discontinuidad infinita en x=0",
          "Continua en todo ℝ"
        ],
        correct: 0,
        solution: `Resolución:
1. La función es:
f(x)=(2e^(x²-4)-8x+14)/(x²-2x).
El denominador es x(x-2), por lo que solo debemos estudiar x=0 y x=2.
2. En x=0, el denominador vale 0 y el numerador:
2e^(-4)+14>0.
Como el numerador no se anula, existe una discontinuidad infinita en x=0.
3. En x=2 obtenemos:
(2e⁰-16+14)/(4-4)=0/0.
Aplicamos la regla de L’Hôpital:
lim(x→2) (4x·e^(x²-4)-8)/(2x-2).
4. Al sustituir x=2 vuelve a aparecer 0/0. Aplicamos L’Hôpital por segunda vez:
lim(x→2) (4e^(x²-4)+8x²e^(x²-4))/2.
5. Sustituimos:
(4+8·4)/2=36/2=18.
Por tanto, en x=2 existe una discontinuidad evitable y podría hacerse continua definiendo f(2)=18.
Resultado final: f es continua en ℝ\\{0,2}; en x=0 tiene una discontinuidad infinita y en x=2 una discontinuidad evitable con límite 18.`
      }
    },
    "mates2-analisis-977272ec7c51--mates-ii-analisis-3": {
      "Resultado": {
        options: ["1/6 unidades cuadradas", "1/3 unidades cuadradas", "1/2 unidades cuadradas", "1 unidad cuadrada"],
        correct: 0,
        solution: `Resolución:
1. Las curvas son:
f(x)=x²-4x+5,
g(x)=3-x.
2. Calculamos los puntos de corte:
x²-4x+5=3-x,
x²-3x+2=0,
(x-1)(x-2)=0.
Por tanto, se cortan en x=1 y x=2.
3. En el intervalo [1,2], por ejemplo en x=3/2:
g(3/2)=3/2>f(3/2)=5/4.
Así, g es la función superior y f la inferior.
4. La gráfica debe mostrar ambas curvas, los cortes x=1 y x=2 y la región coloreada exclusivamente entre g y f.
5. Calculamos el área:
A=∫(1→2)[g(x)-f(x)]dx
=∫(1→2)(-x²+3x-2)dx.
6. Aplicamos la regla de Barrow:
A=[-x³/3+3x²/2-2x]₁²
=(-8/3+6-4)-(-1/3+3/2-2)
=-2/3-(-5/6)
=1/6.
Resultado final: el área es 1/6 de unidad cuadrada.`
      }
    },
    "mates2-analisis-977272ec7c51--mates-ii-analisis-4": {
      "Resultado": {
        options: [
          "Tiene al menos una raíz en (-1,0)",
          "Tiene al menos una raíz en (0,1)",
          "No puede aplicarse Bolzano porque no es continua",
          "No corta al eje OX"
        ],
        correct: 0,
        solution: `Resolución:
1. Teorema de Bolzano:
si una función es continua en [a,b] y f(a)·f(b)<0, entonces existe al menos un c∈(a,b) tal que f(c)=0.
2. La función
f(x)=(2e^x-8x-3)/(x²+2)
es continua en ℝ, pues el numerador es continuo y x²+2>0 para todo x.
3. Evaluamos en x=-1:
f(-1)=(2/e+8-3)/3=(2/e+5)/3>0.
4. Evaluamos en x=0:
f(0)=(2-3)/2=-1/2<0.
5. Como f es continua en [-1,0] y:
f(-1)·f(0)<0,
por el teorema de Bolzano existe al menos un c∈(-1,0) tal que f(c)=0.
Resultado final: la gráfica corta al eje de abscisas al menos una vez entre x=-1 y x=0.`
      }
    },
    "mates2-geometria-2ad11ab20643": {
      "a)": {
        options: [
          "Si a=-5/2, las rectas se cortan; si a≠-5/2, se cruzan",
          "Si a=-5/2, son paralelas; si a≠-5/2, se cortan",
          "Se cortan para todo valor de a",
          "Se cruzan para todo valor de a"
        ],
        correct: 0,
        solution: `Resolución:
1. Escribimos las rectas en forma vectorial:
r:(x,y,z)=(0,0,a)+λ(2,-1,0),
s:(x,y,z)=(-1,0,0)+μ(0,1,-5).
2. Sus vectores directores son:
u⃗=(2,-1,0), v⃗=(0,1,-5).
No son proporcionales, por lo que las rectas no pueden ser paralelas ni coincidentes.
3. Tomamos el vector que une un punto de r con uno de s:
w⃗=(-1,0,-a).
Las rectas son coplanarias si:
[u⃗,v⃗,w⃗]=0.
4. Calculamos:
u⃗×v⃗=(5,10,2),
(u⃗×v⃗)·w⃗=-5-2a.
Por tanto:
-5-2a=0 ⟺ a=-5/2.
5. Para a=-5/2 resolvemos:
2λ=-1, -λ=μ, a=-5μ.
Se obtiene λ=-1/2 y μ=1/2, luego las rectas se cortan.
6. Si a≠-5/2, el producto mixto no es cero: las rectas no son coplanarias y se cruzan.
Resultado final: si a=-5/2, r y s son secantes; si a≠-5/2, se cruzan.`
      },
      "b)": {
        options: [
          "π:5x+10y+2z+5=0",
          "π:2x-y+5z+2=0",
          "π:x+5y+10z+1=0",
          "π:5x-10y+2z+5=0"
        ],
        correct: 0,
        solution: `Resolución:
1. El plano debe contener la recta s, así que contiene su vector director:
v⃗=(0,1,-5).
2. Además, debe ser paralelo a r, por lo que también contiene:
u⃗=(2,-1,0).
3. Un vector normal del plano es:
n⃗=u⃗×v⃗=(5,10,2).
4. Tomamos el punto S=(-1,0,0) de la recta s. La ecuación punto-normal es:
5(x+1)+10(y-0)+2(z-0)=0.
5. Simplificamos:
5x+10y+2z+5=0.
Resultado final: π:5x+10y+2z+5=0.`
      }
    },
    "mates2-geometria-2ad11ab20643--mates-ii-geometria-2": {
      "Resultado": {
        options: [
          "x=6-2t, y=5-2t, z=t",
          "x=6+2t, y=5-2t, z=t",
          "x=1+t, y=t, z=(5-t)/2",
          "x=5-2t, y=6-2t, z=t"
        ],
        correct: 0,
        solution: `Resolución:
1. La recta intersección está formada por los puntos que verifican simultáneamente:
x=y+1,
y+2z=5.
2. Elegimos z=t como parámetro.
3. De la segunda ecuación:
y+2t=5 ⟹ y=5-2t.
4. Sustituimos en la primera:
x=y+1=6-2t.
5. Por tanto, la recta en forma paramétrica es:
x=6-2t,
y=5-2t,
z=t, con t∈ℝ.
Resultado final: r:(x,y,z)=(6,5,0)+t(-2,-2,1).`
      }
    },
    "mates2-geometria-2ad11ab20643--mates-ii-geometria-3": {
      "Resultado": {
        options: [
          "Si m≠0,1 se cortan en un punto; si m=1 tienen una recta común y si m=0 no tienen punto común",
          "Se cortan en un único punto para todo m",
          "Si m=0 tienen una recta común y si m=1 no tienen punto común",
          "Si m≠0,1 no tienen punto común; si m=0 o 1 se cortan en un punto"
        ],
        correct: 0,
        solution: `Resolución:
1. Los tres planos determinan el sistema:
2x+my=1,
2x+y=m,
4x+y+mz=2.
2. La matriz de coeficientes es:
A=((2,m,0),(2,1,0),(4,1,m)).
Calculamos su determinante:
det(A)=2m(1-m).
3. Si m≠0 y m≠1, det(A)≠0. El sistema es compatible determinado y los tres planos se cortan en un único punto.
4. Si m=1, los dos primeros planos coinciden:
2x+y=1.
El tercero es:
4x+y+z=2.
Dos planos distintos se cortan en una recta; esa recta es común a los tres.
5. Si m=0, el sistema queda:
2x=1,
2x+y=0,
4x+y=2.
De las dos primeras ecuaciones se obtiene x=1/2 e y=-1, pero la tercera exigiría 4(1/2)-1=2, es decir 1=2. Es incompatible.
Resultado final: para m≠0,1 se cortan en un punto; para m=1 comparten una recta; para m=0 no existe punto común.`
      }
    },
    "mates2-geometria-2ad11ab20643--mates-ii-geometria-4": {
      "Resultado": {
        options: [
          "π:x-z+1=0",
          "π:x+z-1=0",
          "π:x-y-z+1=0",
          "π:x-z-1=0"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos el producto vectorial:
u⃗×v⃗=((1,1,1)×(1,0,1))=(1,0,-1).
2. Este vector es normal al plano:
n⃗=(1,0,-1).
3. El plano pasa por A=(0,0,1). Usamos la ecuación punto-normal:
1(x-0)+0(y-0)-1(z-1)=0.
4. Simplificamos:
x-z+1=0.
Resultado final: π:x-z+1=0.`
      }
    },
    "mates2-geometria-35d6d220a7b1": {
      "a)": {
        options: [
          "r:x=1+t, y=t, z=1+t; corta a π en Q=(3,2,3)",
          "r:x=1+t, y=t, z=1-t; corta a π en Q=(3,2,-1)",
          "r:x=1+2t, y=t, z=1+t; corta a π en Q=(5,2,3)",
          "r:x=1-t, y=t, z=1-t; corta a π en Q=(-1,2,-1)"
        ],
        correct: 0,
        solution: `Resolución:
1. El vector normal del plano π:x+y+z=8 es:
n⃗=(1,1,1).
2. La recta perpendicular al plano que pasa por A=(1,0,1) tiene como vector director n⃗. En forma paramétrica:
x=1+t,
y=t,
z=1+t.
3. Sustituimos la recta en el plano:
(1+t)+t+(1+t)=8.
4. Resolvemos:
2+3t=8 ⟹ t=2.
5. Sustituimos en la recta:
Q=(1+2,2,1+2)=(3,2,3).
Resultado final: r:x=1+t, y=t, z=1+t y r∩π={Q=(3,2,3)}.`
      },
      "b)": {
        options: [
          "A'=(5,4,5)",
          "A'=(-3,-4,-3)",
          "A'=(3,2,3)",
          "A'=(4,4,4)"
        ],
        correct: 0,
        solution: `Resolución:
1. Del apartado anterior, el punto de corte de la perpendicular con el plano es:
Q=(3,2,3).
2. Q es el punto medio del segmento que une A con su simétrico A'. Por coordenadas:
(1+x')/2=3,
(0+y')/2=2,
(1+z')/2=3.
3. Despejamos:
x'=5,
y'=4,
z'=5.
4. Por tanto:
A'=(5,4,5).
Comprobación: Q=(A+A')/2=(3,2,3) pertenece a π y AA' es paralelo a n⃗.
Resultado final: el simétrico de A respecto de π es A'=(5,4,5).`
      }
    },
    "mates2-geometria-35d6d220a7b1--mates-ii-geometria-2": {
      "Resultado": {
        options: [
          "σ:7x+y-4z-4=0",
          "σ:x-3y+z+1=0",
          "σ:7x-y+4z+4=0",
          "σ:x+y+2z+2=0"
        ],
        correct: 0,
        solution: `Resolución:
1. El plano buscado contiene A=(0,0,-1) y B=(1,1,1), por lo que contiene:
AB⃗=B-A=(1,1,2).
2. El vector normal del plano dado es:
n⃗π=(1,-3,1).
3. Como los planos son perpendiculares, el plano buscado puede contener también la dirección n⃗π. Su vector normal es:
n⃗σ=AB⃗×n⃗π=(1,1,2)×(1,-3,1)=(7,1,-4).
4. Escribimos la ecuación punto-normal pasando por A:
7(x-0)+(y-0)-4(z+1)=0.
5. Simplificamos:
7x+y-4z-4=0.
Comprobación: n⃗σ·n⃗π=7-3-4=0 y tanto A como B pertenecen a σ.
Resultado final: σ:7x+y-4z-4=0.`
      }
    },
    "mates2-geometria-35d6d220a7b1--mates-ii-geometria-3": {
      "Resultado": {
        options: [
          "a=-5/2 o a=7/2",
          "a=-7/2 o a=5/2",
          "a=-5 o a=7",
          "a=1/2"
        ],
        correct: 0,
        solution: `Resolución:
1. El volumen de un tetraedro es:
V=(1/6)|det(AB⃗,AC⃗,AD⃗)|.
2. Desde A=(a,0,1):
AB⃗=(1-a,3,-1),
AC⃗=(-a,1,-1),
AD⃗=(1-a,1,0).
3. Calculamos el determinante:
det((1-a,3,-1),(-a,1,-1),(1-a,1,0))=2a-1.
4. Como el volumen debe ser 1:
(1/6)|2a-1|=1.
5. Multiplicamos por 6:
|2a-1|=6.
Por tanto:
2a-1=6 ⟹ a=7/2,
o bien
2a-1=-6 ⟹ a=-5/2.
Resultado final: a=-5/2 o a=7/2.`
      }
    },
    "mates2-probabilidad-estadistica-122b4087122a": {
      "b.1)": {
        options: ["0,84", "0,78", "0,72", "0,90"],
        correct: 0,
        solution: `Resolución:
1. Definimos los sucesos:
B: Benceno juega,
G: el equipo gana.
2. Los datos son:
P(B)=0,80, P(B̄)=0,20,
P(G|B)=0,90, P(G|B̄)=0,60.
3. Aplicamos el teorema de la probabilidad total:
P(G)=P(G|B)·P(B)+P(G|B̄)·P(B̄).
4. Sustituimos:
P(G)=0,90·0,80+0,60·0,20
=0,72+0,12
=0,84.
Resultado final: la probabilidad de que el EVAU C.F. gane es 0,84, es decir, un 84 %.`
      },
      "b.2)": {
        options: ["6/7≈0,8571", "4/5=0,80", "5/6≈0,8333", "3/4=0,75"],
        correct: 0,
        solution: `Resolución:
1. Se pide la probabilidad de que Benceno haya jugado sabiendo que el equipo ha ganado:
P(B|G).
2. Aplicamos el teorema de Bayes:
P(B|G)=P(G|B)·P(B)/P(G).
3. Del apartado anterior:
P(G)=0,84.
4. Sustituimos:
P(B|G)=(0,90·0,80)/0,84
=0,72/0,84
=6/7≈0,8571.
Resultado final: la probabilidad es 6/7, aproximadamente un 85,71 %.`
      }
    },
    "mates2-probabilidad-estadistica-122b4087122a--mates-ii-probabilidad-estadistica-2": {
      "a.1)": {
        options: ["0,5904", "0,4096", "0,8000", "0,2000"],
        correct: 0,
        solution: `Resolución:
1. Sea X el número de niños con intolerancia en una mesa de 4. Entonces:
X~B(4,1/5).
2. Se pide que haya algún niño con intolerancia:
P(X≥1).
3. Usamos el suceso contrario:
P(X≥1)=1-P(X=0).
4. Calculamos:
P(X=0)=(4/5)⁴=0,8⁴=0,4096.
5. Por tanto:
P(X≥1)=1-0,4096=0,5904.
Resultado final: la probabilidad es 0,5904, es decir, un 59,04 %.`
      },
      "a.2)": {
        options: ["1-0,8³²≈0,9992", "0,5904⁸≈0,0148", "0,4096⁸≈0,0008", "8·0,5904=4,7232"],
        correct: 0,
        solution: `Resolución:
1. Para que no haya que servir pan sin gluten en ninguna de las 8 mesas, ninguno de los 32 niños puede presentar intolerancia.
2. La probabilidad de que un niño no presente intolerancia es:
1-1/5=4/5=0,8.
3. Por independencia:
P(ningún niño con intolerancia)=0,8³².
4. Usamos el suceso contrario:
P(alguna mesa con pan sin gluten)=1-0,8³².
5. Calculamos:
1-0,8³²≈1-0,0007923≈0,9992.
Resultado final: la probabilidad es aproximadamente 0,9992, es decir, un 99,92 %.`
      },
      "b.1)": {
        options: ["0,2743", "0,7257", "0,3446", "0,2257"],
        correct: 0,
        solution: `Resolución:
1. Sea X el peso de un paquete:
X~N(985,25).
2. Se pide:
P(X>1000).
Tipificamos dentro de la probabilidad:
P(X>1000)=P((X-985)/25>(1000-985)/25)
=P(Z>0,6).
3. La tabla proporciona:
P(Z≤0,6)=0,7257.
4. Por tanto:
P(Z>0,6)=1-0,7257=0,2743.
Resultado final: la proporción de paquetes que pesan más de 1 kg es 0,2743, es decir, un 27,43 %.`
      },
      "b.2)": {
        options: ["Aproximadamente 972 g", "Aproximadamente 998 g", "Aproximadamente 985 g", "Aproximadamente 960 g"],
        correct: 0,
        solution: `Resolución:
1. Sea K el peso del más ligero del 70 % de los paquetes que más pesan. Entonces:
P(X>K)=0,70.
2. Pasamos a probabilidad acumulada:
P(X≤K)=1-0,70=0,30.
3. Llamamos a al valor tipificado correspondiente a K:
P(Z≤a)=0,30.
Buscamos 0,30 en la tabla de la normal típica y obtenemos aproximadamente:
a=-0,52.
4. Igualamos con la tipificación:
(K-985)/25=-0,52.
5. Despejamos:
K-985=-13,
K=972.
Resultado final: el más ligero del 70 % de los paquetes que más pesan pesa aproximadamente 972 g.`
      }
    },
    "mates2-probabilidad-estadistica-4348d4d62bd7": {
      "Resultado": {
        options: ["0,8208", "0,4752", "0,1792", "0,3456"],
        correct: 0,
        solution: `Resolución:
1. Sea X el número de carreras ganadas:
X~B(4,0,6).
2. Se pide:
P(X≥2).
3. Usamos el suceso contrario:
P(X≥2)=1-P(X=0)-P(X=1).
4. Calculamos:
P(X=0)=0,4⁴=0,0256,
P(X=1)=(4 sobre 1)·0,6·0,4³
=4·0,6·0,064
=0,1536.
5. Por tanto:
P(X≥2)=1-0,0256-0,1536=0,8208.
Resultado final: la probabilidad de que gane al menos dos carreras es 0,8208, es decir, un 82,08 %.`
      }
    },
    "mates2-probabilidad-estadistica-4348d4d62bd7--mates-ii-probabilidad-estadistica-2": {
      "a.1)": {
        options: ["0,77", "0,72", "0,75", "0,80"],
        correct: 0,
        solution: `Resolución:
1. Definimos:
C: el alumno va a clase,
A: el alumno aprueba.
2. Los datos son:
P(C)=0,90, P(C̄)=0,10,
P(A|C)=0,80, P(A|C̄)=0,50.
3. Aplicamos el teorema de la probabilidad total:
P(A)=P(A|C)·P(C)+P(A|C̄)·P(C̄).
4. Sustituimos:
P(A)=0,80·0,90+0,50·0,10
=0,72+0,05
=0,77.
Resultado final: la probabilidad de aprobar es 0,77, es decir, un 77 %.`
      },
      "a.2)": {
        options: ["5/23≈0,2174", "1/10=0,10", "1/2=0,50", "5/77≈0,0649"],
        correct: 0,
        solution: `Resolución:
1. Se pide:
P(C̄|Ā).
2. Primero calculamos la probabilidad de suspender:
P(Ā)=1-P(A)=1-0,77=0,23.
3. Aplicamos Bayes:
P(C̄|Ā)=P(Ā|C̄)·P(C̄)/P(Ā).
4. Como P(A|C̄)=0,50:
P(Ā|C̄)=1-0,50=0,50.
5. Sustituimos:
P(C̄|Ā)=(0,50·0,10)/0,23
=0,05/0,23
=5/23≈0,2174.
Resultado final: la probabilidad de que no haya ido a clase es aproximadamente un 21,74 %.`
      },
      "b.1)": {
        options: ["0,3446", "0,6554", "0,4207", "0,5793"],
        correct: 0,
        solution: `Resolución:
1. Sea X la cantidad de agua:
X~N(150,5).
2. Se pide:
P(X>152).
Tipificamos dentro de la probabilidad:
P(X>152)=P((X-150)/5>(152-150)/5)
=P(Z>0,4).
3. La tabla proporciona:
P(Z≤0,4)=0,6554.
4. Usamos el suceso contrario:
P(Z>0,4)=1-0,6554=0,3446.
Resultado final: la proporción es 0,3446, es decir, un 34,46 %.`
      },
      "b.2)": {
        options: ["0,2347", "0,6554", "0,4207", "0,0761"],
        correct: 0,
        solution: `Resolución:
1. Se pide:
P(149<X<152).
2. Tipificamos dentro de la probabilidad:
P((149-150)/5<Z<(152-150)/5)
=P(-0,2<Z<0,4).
3. Expresamos mediante probabilidades acumuladas:
P(-0,2<Z<0,4)=P(Z<0,4)-P(Z<-0,2).
4. La tabla proporciona:
P(Z<0,4)=0,6554.
Para el valor negativo usamos la simetría:
P(Z<-0,2)=1-P(Z<0,2)=1-0,5793=0,4207.
5. Restamos:
0,6554-0,4207=0,2347.
Resultado final: la proporción es 0,2347, es decir, un 23,47 %.`
      }
    }
  });
})();

(() => {
  "use strict";

  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-algebra-59de40716fa5": {
      "a)": {
        options: [
          "Vértices: (0,1), (0,3), (1/2,3) y (2,0)",
          "Vértices: (0,0), (0,3), (1,3) y (2,0)",
          "Vértices: (0,1), (0,4), (1/2,3) y (3,0)",
          "La región factible es vacía"
        ],
        correct: 0,
        solution: `Resolución:
1. Despejamos y en las restricciones:
y≤-2x+4,
y≥1-x/2,
y≤3,
x≥0.
2. Representamos las rectas frontera y elegimos los semiplanos indicados.
3. Calculamos los cortes que delimitan la región:
x=0 con y=1-x/2 ⟹ (0,1);
x=0 con y=3 ⟹ (0,3);
y=3 con y=-2x+4 ⟹ x=1/2, luego (1/2,3);
-2x+4=1-x/2 ⟹ x=2, y=0, luego (2,0).
Resultado final: la región factible tiene vértices (0,1), (0,3), (1/2,3) y (2,0).`
      },
      "b)": {
        options: [
          "Mínimo 3 en (0,1) y máximo 16 en (2,0)",
          "Mínimo 9 en (0,3) y máximo 13 en (1/2,3)",
          "Mínimo 0 en (0,0) y máximo 16 en (2,0)",
          "Mínimo 3 en (0,1) y máximo 13 en (1/2,3)"
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos f(x,y)=8x+3y en todos los vértices:
f(0,1)=3,
f(0,3)=9,
f(1/2,3)=8·(1/2)+3·3=13,
f(2,0)=16.
2. Comparamos los valores.
Resultado final: el mínimo es 3 en (0,1) y el máximo es 16 en (2,0).`
      }
    },
    "ccss2-algebra-0d6f272750cf": {
      "a)": {
        options: [
          "I+C+E=15, I+1=3E, E=3C/4",
          "I+C+E=15, I=3E+1, C=3E/4",
          "I+C+E=15, I+1=3C, E=4C/3",
          "I+C+E=16, I+1=3E, C=3E/4"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos I, C y E al número de premios de Isabel, Carmen y Enma.
2. El total es 15:
I+C+E=15.
3. Al aumentar en uno los premios de Isabel se obtiene el triple de los de Enma:
I+1=3E.
4. Los premios de Enma son las tres cuartas partes de los de Carmen:
E=3C/4.
Resultado final: el sistema es {I+C+E=15, I+1=3E, E=3C/4}.`
      },
      "b)": {
        options: [
          "Isabel 8, Carmen 4 y Enma 3",
          "Isabel 7, Carmen 5 y Enma 3",
          "Isabel 8, Carmen 3 y Enma 4",
          "Isabel 9, Carmen 4 y Enma 2"
        ],
        correct: 0,
        solution: `Resolución:
1. Resolvemos el sistema:
I+C+E=15,
I+1=3E,
E=3C/4.
2. Despejamos:
I=3E-1,
C=4E/3.
3. Sustituimos en la primera ecuación:
3E-1+4E/3+E=15.
4. Multiplicamos por 3:
9E-3+4E+3E=45,
16E=48,
E=3.
5. Calculamos:
C=4 y I=8.
Comprobación: 8+4+3=15, 8+1=3·3 y 3=3·4/4.
Resultado final: Isabel recibió 8 Goyas, Carmen 4 y Enma 3.`
      }
    },
    "ccss2-algebra-f19197740f13": {
      "a)": {
        options: [
          "10D+6F+3M=851000, D-F=2000, 5D-6M=13000",
          "10D+6F+3M=851000, D+F=2000, 5D+6M=13000",
          "10D+6F+3M=851000, F-D=2000, 6D-5M=13000",
          "10D+6F+3M=851000, D-F=13000, 5D-6M=2000"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos D, F y M a los precios del deportivo, familiar y monovolumen.
2. La recaudación del mes fue:
10D+6F+3M=851000.
3. El deportivo cuesta 2000 euros más:
D-F=2000.
4. Cinco deportivos producen 13000 euros más que seis monovolúmenes:
5D-6M=13000.
Resultado final: {10D+6F+3M=851000, D-F=2000, 5D-6M=13000}.`
      },
      "b)": {
        options: [
          "Deportivo 47000 €, familiar 45000 € y monovolumen 37000 €",
          "Deportivo 45000 €, familiar 43000 € y monovolumen 36000 €",
          "Deportivo 47000 €, familiar 45000 € y monovolumen 39000 €",
          "Deportivo 49000 €, familiar 47000 € y monovolumen 40000 €"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos del sistema:
10D+6F+3M=851000,
D-F=2000,
5D-6M=13000.
2. De la segunda ecuación:
F=D-2000.
3. De la tercera:
M=(5D-13000)/6.
4. Sustituimos ambas expresiones en la primera y resolvemos:
10D+6(D-2000)+3(5D-13000)/6=851000,
D=47000.
5. Entonces:
F=45000,
M=(235000-13000)/6=37000.
Comprobación: 10·47000+6·45000+3·37000=851000.
Resultado final: deportivo 47000 €, familiar 45000 € y monovolumen 37000 €.`
      }
    },
    "ccss2-algebra-7b180856a3de": {
      "a)": {
        options: [
          "X=((-28,18),(-86,56))",
          "X=((-28,-18),(86,56))",
          "X=((-10,-8),(-30,-26))",
          "X=((28,-18),(86,-56))"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de:
X+(1/2)XA=AB.
2. Sacamos X como factor común por la derecha:
X(I+(1/2)A)=AB.
3. Aislamos X multiplicando por la inversa correspondiente, también por la derecha:
X=AB(I+(1/2)A)⁻¹.
4. Calculamos:
I+(1/2)A=((1,-1),(1,-2)),
det(I+(1/2)A)=-1.
Su inversa, mediante determinante y matriz adjunta, es:
(I+(1/2)A)⁻¹=((2,-1),(1,-1)).
5. Además:
AB=((-10,-8),(-30,-26)).
6. Multiplicamos:
X=((-10,-8),(-30,-26))((2,-1),(1,-1))
=((-28,18),(-86,56)).
Resultado final: X=((-28,18),(-86,56)).`
      },
      "b)": {
        options: [
          "((0,0),(4,0))",
          "((0,4),(0,0))",
          "((0,0),(-4,0))",
          "((0,9),(3,5))"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos por separado:
-(1/2)A=((0,1),(-1,3)).
2. Trasponemos B:
Bᵀ=((0,5),(-1,4)),
-2Bᵀ=((0,-10),(2,-8)).
3. Sumamos toda la expresión:
-(1/2)A-2Bᵀ+C
=((0,1),(-1,3))+((0,-10),(2,-8))+((0,9),(3,5))
=((0,0),(4,0)).
Resultado final: ((0,0),(4,0)).`
      }
    },
    "ccss2-algebra-15ac887305eb": {
      "a)": {
        options: [
          "B=30x+28y; 100≤x≤600, y≥400, x+y≤1200",
          "B=28x+30y; x≥100, y≤400, x+y≥1200",
          "B=30x+28y; x≤600, y≤400, x+y≤1200",
          "B=58(x+y); 100≤x≤600, y≥400"
        ],
        correct: 0,
        solution: `Resolución:
1. Sea x el número de pares de hombre e y el de mujer.
2. El beneficio es:
B(x,y)=30x+28y.
3. Las restricciones son:
100≤x≤600,
y≥400,
x+y≤1200.
4. La región factible se obtiene representando x=100, x=600, y=400 y x+y=1200 y tomando la intersección de los semiplanos.
Sus vértices son:
(100,400), (600,400), (600,600) y (100,1100).
Resultado final: B=30x+28y con 100≤x≤600, y≥400 y x+y≤1200.`
      },
      "b)": {
        options: [
          "600 pares de hombre y 600 de mujer",
          "100 pares de hombre y 1100 de mujer",
          "600 pares de hombre y 400 de mujer",
          "400 pares de hombre y 600 de mujer"
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos B(x,y)=30x+28y en los vértices:
B(100,400)=14200,
B(600,400)=29200,
B(600,600)=34800,
B(100,1100)=33800.
2. El valor mayor es 34800.
Resultado final: debe fabricar 600 pares de hombre y 600 pares de mujer; el beneficio máximo es 34800 €.`
      }
    },
    "ccss2-algebra-1a6d592f5310": {
      "a)": {
        options: [
          "12N+6L+6B=51, N=L+1, L=B-0,5",
          "12N+6L+6B=51, N=L-1, L=B+0,5",
          "12N+6L+6B=51, N=B+1, B=L-0,5",
          "N+L+B=51, N=L+1, L=B-0,5"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos N, L y B al precio de un bombón negro, con leche y blanco.
2. El precio total da:
12N+6L+6B=51.
3. El negro cuesta un euro más que el de leche:
N=L+1.
4. El de leche cuesta 0,50 euros menos que el blanco:
L=B-0,5.
Resultado final: {12N+6L+6B=51, N=L+1, L=B-0,5}.`
      },
      "b)": {
        options: [
          "Negro 2,50 €, con leche 1,50 € y blanco 2,00 €",
          "Negro 2,00 €, con leche 1,50 € y blanco 2,50 €",
          "Negro 2,50 €, con leche 2,00 € y blanco 1,50 €",
          "Negro 3,00 €, con leche 2,00 € y blanco 2,50 €"
        ],
        correct: 0,
        solution: `Resolución:
1. Sustituimos N=L+1 y B=L+0,5 en:
12N+6L+6B=51.
2. Obtenemos:
12(L+1)+6L+6(L+0,5)=51.
3. Operamos:
12L+12+6L+6L+3=51,
24L=36,
L=1,50.
4. Entonces:
N=2,50,
B=2,00.
Resultado final: negro 2,50 €, con leche 1,50 € y blanco 2,00 €.`
      }
    },
    "ccss2-algebra-21560fb148a2": {
      "a)": {
        options: [
          "H=M+5, M+H=N/4, M+H+N=115",
          "H=M-5, M+H=4N, M+H+N=115",
          "M=H+5, M+H=N/4, M+H+N=60",
          "H=M+5, 4(M+H)=N, M+H+N=55"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos M, H y N a los minutos de magia, humor y noticias.
2. Humor dura cinco minutos más:
H=M+5.
3. Magia y humor ocupan la cuarta parte de noticias:
M+H=N/4.
4. Una hora y 55 minutos son 115 minutos:
M+H+N=115.
Resultado final: {H=M+5, M+H=N/4, M+H+N=115}.`
      },
      "b)": {
        options: [
          "Magia 9 min, humor 14 min y noticias 92 min",
          "Magia 14 min, humor 19 min y noticias 82 min",
          "Magia 10 min, humor 15 min y noticias 90 min",
          "Magia 23 min, humor 28 min y noticias 64 min"
        ],
        correct: 0,
        solution: `Resolución:
1. Como M+H=N/4, tenemos N=4(M+H).
2. Sustituimos en la duración total:
M+H+4(M+H)=115,
5(M+H)=115,
M+H=23.
3. Con H=M+5:
M+(M+5)=23,
2M=18,
M=9.
4. Entonces:
H=14,
N=4·23=92.
Resultado final: magia 9 minutos, humor 14 y noticias 92.`
      }
    },
    "ccss2-algebra-b7aa8fa0a5ae": {
      "a)": {
        options: [
          "No en general: AX=B da X=A⁻¹B y XA=B da X=BA⁻¹; la multiplicación no es conmutativa",
          "Sí siempre, porque AX=XA para matrices cuadradas",
          "Sí, porque la suma de matrices es conmutativa",
          "No, porque ninguna matriz cuadrada puede tener inversa"
        ],
        correct: 0,
        solution: `Resolución:
1. En AX=B, multiplicamos por A⁻¹ a la izquierda:
A⁻¹AX=A⁻¹B,
X=A⁻¹B.
2. En XA=B, multiplicamos por A⁻¹ a la derecha:
XAA⁻¹=BA⁻¹,
X=BA⁻¹.
3. En general A⁻¹B≠BA⁻¹.
Resultado final: no se obtiene necesariamente el mismo resultado; se debe a que el producto de matrices no es conmutativo.`
      },
      "b)": {
        options: [
          "m=2, p=5 y el resultado es 3×5",
          "m=3, p=2 y el resultado es 3×2",
          "m=5, p=2 y el resultado es 2×5",
          "m=2, p=3 y el resultado es 3×3"
        ],
        correct: 0,
        solution: `Resolución:
1. M tiene dimensión 3×m y N tiene dimensión 2×5. Para poder calcular MN, las dimensiones interiores deben coincidir:
m=2.
2. Entonces MN tiene dimensión 3×5.
3. P es cuadrada de orden p, es decir, p×p. Para calcular (MN)P:
p=5.
4. El producto final tiene las dimensiones exteriores:
3×5.
Resultado final: m=2, p=5 y MNP es una matriz 3×5.`
      },
      "c)": {
        options: [
          "X=((-81,-296),(19,68))",
          "X=((-81,296),(-19,68))",
          "X=((81,296),(-19,-68))",
          "X=((-4,11),(1,-3))"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de:
XC-D²=(1/3)Eᵀ.
2. Aislamos el término que contiene X:
XC=D²+(1/3)Eᵀ.
3. Multiplicamos por C⁻¹ a la derecha:
X=[D²+(1/3)Eᵀ]C⁻¹.
4. Calculamos:
D²=((25,0),(-7,4)),
(1/3)Eᵀ=((3,-3),(-1,1)),
D²+(1/3)Eᵀ=((28,-3),(-8,5)).
5. Para C=((-4,11),(1,-3)):
det(C)=12-11=1,
C⁻¹=((-3,-11),(-1,-4)).
6. Multiplicamos:
X=((28,-3),(-8,5))((-3,-11),(-1,-4))
=((-81,-296),(19,68)).
Resultado final: X=((-81,-296),(19,68)).`
      }
    },
    "ccss2-analisis-ad149b7d054d": {
      "a)": {
        options: ["t=3", "t=1", "t=-3", "No existe"],
        correct: 0,
        solution: `Resolución:
1. Estudiamos la continuidad en x=-1:
lim(x→-1⁻)f(x)=-2+2t,
f(-1)=lim(x→-1⁺)f(x)=t+1.
2. Igualamos:
-2+2t=t+1.
3. Despejamos:
t=3.
Resultado final: f es continua en x=-1 para t=3.`
      },
      "b)": {
        options: ["Máximo relativo en (3,17)", "Mínimo relativo en (3,17)", "Máximo relativo en (1,5)", "No tiene extremos relativos"],
        correct: 0,
        solution: `Resolución:
1. En (1,∞):
f(x)=-x³+4x²+3x-1.
2. Derivamos:
f'(x)=-3x²+8x+3.
3. Resolvemos f'(x)=0:
-3x²+8x+3=0 ⟹ x=-1/3 o x=3.
En (1,∞) solo pertenece x=3.
4. En la recta real, f'(2)>0 y f'(4)<0: la función pasa de creciente a decreciente, luego x=3 es un máximo.
5. Calculamos:
f(3)=-27+36+9-1=17.
Resultado final: máximo relativo en (3,17).`
      },
      "c)": {
        options: ["Crece en (1,3) y decrece en (3,∞)", "Decrece en (1,3) y crece en (3,∞)", "Crece en todo (1,∞)", "Decrece en todo (1,∞)"],
        correct: 0,
        solution: `Resolución:
1. La derivada es:
f'(x)=-3x²+8x+3=-3(x-3)(x+1/3).
2. Marcamos x=3 en la recta real del dominio (1,∞).
3. Probamos un valor de cada intervalo:
f'(2)=7>0 ⟹ ↑ en (1,3),
f'(4)=-13<0 ⟹ ↓ en (3,∞).
Resultado final: f crece en (1,3) y decrece en (3,∞).`
      }
    },
    "ccss2-analisis-a83abfd5dc76": {
      "Resultado": {
        options: ["a=1, b=-12, c=17", "a=-1, b=-12, c=33", "a=1, b=12, c=-31", "a=2, b=-12, c=9"],
        correct: 0,
        solution: `Resolución:
1. La función es f(x)=ax³+bx+c y pasa por (2,1):
8a+2b+c=1.
2. Derivamos:
f'(x)=3ax²+b.
La pendiente en x=0 es -12:
f'(0)=b=-12.
3. Como hay un mínimo en x=2:
f'(2)=12a+b=0.
Sustituyendo b=-12:
12a-12=0 ⟹ a=1.
4. Sustituimos en la primera ecuación:
8-24+c=1 ⟹ c=17.
5. Comprobamos:
f''(x)=6ax, f''(2)=12>0; por tanto, el punto es un mínimo.
Resultado final: a=1, b=-12 y c=17.`
      }
    },
    "ccss2-analisis-e4da25f9c7b3": {
      "a)": {
        options: ["Sí, para t=2", "Sí, para t=0", "Sí, para t=3", "No existe ningún valor"],
        correct: 0,
        solution: `Resolución:
1. Continuidad en x=-1:
lim(x→-1⁻)f(x)=(-1+2)²+t=1+t,
f(-1)=lim(x→-1⁺)f(x)=3.
Así:
1+t=3 ⟹ t=2.
2. Continuidad en x=2:
f(2)=lim(x→2⁻)f(x)=3,
lim(x→2⁺)f(x)=2²-6·2+9+t=1+t.
De nuevo:
1+t=3 ⟹ t=2.
Resultado final: sí existe un único valor, t=2, que hace continua la función en ambos puntos.`
      },
      "b)": {
        options: [
          "y=(x+2)² si x<-1; y=3 si -1≤x≤2; y=(x-3)² si x>2",
          "y=(x+2)² si x≤-1; y=3 si -1<x<2; y=(x-3)² si x≥2",
          "y=x²+2 si x<-1; y=3 si -1≤x≤2; y=x²-3 si x>2",
          "Una única parábola y=(x-3)²"
        ],
        correct: 0,
        solution: `Resolución:
1. Para t=0:
f(x)=(x+2)² si x<-1,
f(x)=3 si -1≤x≤2,
f(x)=(x-3)² si x>2.
2. La primera parábola tiene vértice (-2,0) y un punto abierto en (-1,1).
3. El tramo horizontal y=3 tiene puntos cerrados en (-1,3) y (2,3).
4. La última parábola tiene vértice (3,0) y un punto abierto en (2,1).
Resultado final: la gráfica está formada por esos tres tramos, respetando los extremos abiertos y cerrados indicados.`
      }
    },
    "ccss2-analisis-b62abf6d5c57": {
      "a)": {
        options: ["58,5 minutos", "62 minutos", "48,5 minutos", "74,5 minutos"],
        correct: 0,
        solution: `Resolución:
S(3)=3³-(21/2)·3²+30·3+36
=27-94,5+90+36
=58,5.
Resultado final: el tercer día se emiten 58,5 minutos de publicidad.`
      },
      "b)": {
        options: ["El día 7, con 74,5 minutos", "El día 2, con 62 minutos", "El día 5, con 48,5 minutos", "El día 3, con 58,5 minutos"],
        correct: 0,
        solution: `Resolución:
1. Derivamos:
S'(x)=3x²-21x+30=3(x-2)(x-5).
2. Los puntos críticos del intervalo [1,7] son x=2 y x=5.
3. Para hallar el máximo absoluto evaluamos extremos y puntos críticos:
S(1)=56,5,
S(2)=62,
S(5)=48,5,
S(7)=74,5.
4. El mayor valor es 74,5.
Resultado final: el séptimo día se emite más publicidad, 74,5 minutos.`
      },
      "c)": {
        options: ["El día 5, con 48,5 minutos", "El día 1, con 56,5 minutos", "El día 2, con 62 minutos", "El día 7, con 74,5 minutos"],
        correct: 0,
        solution: `Resolución:
1. Evaluamos la función en los extremos del intervalo y en sus puntos críticos:
S(1)=56,5,
S(2)=62,
S(5)=48,5,
S(7)=74,5.
2. El menor valor es 48,5.
Resultado final: el quinto día se emite menos publicidad, 48,5 minutos.`
      }
    },
    "ccss2-analisis-7b17adb08474": {
      "a)": {
        options: ["c=1 o c=3", "Solo c=1", "Solo c=3", "c=-1 o c=-3"],
        correct: 0,
        solution: `Resolución:
1. Para la continuidad en x=c igualamos las dos ramas:
2c-4=-(c-3)²+2.
2. Desarrollamos:
2c-4=-c²+6c-7.
3. Pasamos todo al mismo miembro:
c²-4c+3=0.
4. Factorizamos:
(c-1)(c-3)=0.
Resultado final: la función es continua para c=1 o c=3.`
      },
      "b)": {
        options: [
          "Recta y=2x-4 para x≤1 y parábola y=-(x-3)²+2 para x>1, unidas en (1,-2)",
          "Recta y=2x+4 para x≤1 y parábola y=(x-3)²+2 para x>1",
          "Recta y=2x-4 para x<1 y parábola y=-(x-3)²+2 para x≥1, separadas",
          "Solo la parábola y=-(x-3)²+2"
        ],
        correct: 0,
        solution: `Resolución:
1. Para c=1:
f(x)=2x-4 si x≤1,
f(x)=-(x-3)²+2 si x>1.
2. La recta llega al punto:
f(1)=2-4=-2, que se representa cerrado.
3. La parábola, cóncava hacia abajo y con vértice (3,2), tendría en x=1 el valor:
-(1-3)²+2=-2, que se representa abierto para esa rama.
4. Ambas ramas se unen sin salto en (1,-2).
Resultado final: recta y=2x-4 hasta x=1 y parábola y=-(x-3)²+2 para x>1.`
      }
    },
    "ccss2-analisis-2a27ef4d4deb": {
      "Resultado": {
        options: ["a=1, b=-2, c=1", "a=-1, b=2, c=1", "a=1, b=2, c=-1", "a=2, b=-1, c=1"],
        correct: 0,
        solution: `Resolución:
1. Como corta al eje OY en y=1:
f(0)=c=1.
2. El punto (-1,0) pertenece a la gráfica:
f(-1)=a+b+c=0.
Por tanto:
a+b=-1.
3. Derivamos:
f'(x)=4ax³+2bx.
Como en x=-1 hay un mínimo:
f'(-1)=-4a-2b=0,
2a+b=0.
4. Resolvemos el sistema:
a+b=-1,
2a+b=0.
Restando, a=1; entonces b=-2.
5. Comprobamos:
f''(x)=12ax²+2b,
f''(-1)=12-4=8>0.
Resultado final: a=1, b=-2 y c=1.`
      }
    },
    "ccss2-analisis-fd3248e29c67": {
      "a)": {
        options: ["t=1", "t=-1", "t=0", "No existe"],
        correct: 0,
        solution: `Resolución:
1. En x=-1, f(-1)=1.
2. Límite por la izquierda:
lim(x→-1⁻)(x+t+1)²=t².
Para que coincida con f(-1):
t²=1.
3. Límite por la derecha:
lim(x→-1⁺)[-x²+(t+2)x+5]
=-1-(t+2)+5=2-t.
Para que coincida con f(-1):
2-t=1 ⟹ t=1.
4. Este valor también verifica t²=1.
Resultado final: t=1.`
      },
      "b)": {
        options: ["Máximo relativo en (1,6)", "Mínimo relativo en (1,6)", "Máximo relativo en (-1,2)", "No tiene extremos"],
        correct: 0,
        solution: `Resolución:
1. Para t=0 y x∈(-1,∞):
f(x)=-x²+2x+5.
2. Derivamos:
f'(x)=-2x+2.
3. Igualamos a cero:
-2x+2=0 ⟹ x=1.
4. En la recta real:
f'(0)=2>0 y f'(2)=-2<0.
Pasa de creciente a decreciente, luego hay un máximo.
5. f(1)=-1+2+5=6.
Resultado final: máximo relativo en (1,6).`
      },
      "c)": {
        options: ["Crece en (-1,1) y decrece en (1,∞)", "Decrece en (-1,1) y crece en (1,∞)", "Crece en todo (-1,∞)", "Decrece en todo (-1,∞)"],
        correct: 0,
        solution: `Resolución:
1. La derivada es:
f'(x)=-2x+2.
2. Se anula en x=1.
3. Probamos valores en la recta real:
f'(0)=2>0 ⟹ ↑ en (-1,1),
f'(2)=-2<0 ⟹ ↓ en (1,∞).
Resultado final: crece en (-1,1) y decrece en (1,∞).`
      }
    },
    "ccss2-analisis-c95549b6f485": {
      "a)": {
        options: ["Disminuye en (1,3) y aumenta en (3,5)", "Aumenta en (1,3) y disminuye en (3,5)", "Aumenta en todo (1,5)", "Disminuye en todo (1,5)"],
        correct: 0,
        solution: `Resolución:
1. Derivamos:
P'(x)=3x²-12x+9=3(x-1)(x-3).
2. En el intervalo (1,5), el único cero interior es x=3.
3. Probamos valores:
P'(2)=-3<0 ⟹ ↓ en (1,3),
P'(4)=9>0 ⟹ ↑ en (3,5).
Resultado final: el número de socios disminuye entre los años 1 y 3 y aumenta entre los años 3 y 5.`
      },
      "b)": {
        options: ["En el año 5, con 24 socios", "En el año 1, con 8 socios", "En el año 3, con 4 socios", "En el año 4, con 8 socios"],
        correct: 0,
        solution: `Resolución:
1. Para buscar el máximo absoluto en [1,5], evaluamos extremos y punto crítico:
P(1)=8,
P(3)=4,
P(5)=24.
2. El mayor valor es 24.
Resultado final: hay más socios en el quinto año, con 24 socios.`
      },
      "c)": {
        options: ["En el año 3, con 4 socios", "En el año 1, con 8 socios", "En el año 5, con 24 socios", "En el año 2, con 6 socios"],
        correct: 0,
        solution: `Resolución:
1. Evaluamos la función en extremos y punto crítico:
P(1)=8,
P(3)=4,
P(5)=24.
2. El menor valor es 4.
Resultado final: el mínimo se alcanza en el tercer año, con 4 socios.`
      }
    },
    "ccss2-probabilidad-5be035f9124b": {
      "c)": {
        options: [
          "P(A)=0,40, P(B)=0,25, P(C)=0,35; P(S|A)=0,50, P(S|B)=0,55 y P(S|C)=0,60",
          "P(A)=0,40, P(B)=0,25, P(C)=0,45; P(S|B)=0,45",
          "P(A)=0,50, P(B)=0,25, P(C)=0,25",
          "P(A)=0,40, P(B)=0,35, P(C)=0,25"
        ],
        correct: 0,
        solution: `Preparación de los datos:
1. Las probabilidades de elección son:
P(A)=0,40,
P(B)=0,25,
P(C)=1-0,40-0,25=0,35.
2. Las probabilidades de superar cada prueba son:
P(S|A)=0,50,
P(S|B)=1-0,45=0,55,
P(S|C)=0,60.
Estos son los datos que se utilizan en los apartados siguientes.`
      },
      "a)": {
        options: ["0,5475", "0,4525", "0,6000", "0,5000"],
        correct: 0,
        solution: `Resolución:
1. Aplicamos el teorema de la probabilidad total:
P(S)=P(S|A)P(A)+P(S|B)P(B)+P(S|C)P(C).
2. Sustituimos:
P(S)=0,50·0,40+0,55·0,25+0,60·0,35
=0,20+0,1375+0,21
=0,5475.
Resultado final: la probabilidad de superar la prueba es 0,5475, es decir, un 54,75 %.`
      },
      "b)": {
        options: ["80/181≈0,4420", "40/109≈0,3670", "1/2=0,5000", "20/181≈0,1105"],
        correct: 0,
        solution: `Resolución:
1. Se pide P(A|S̄).
2. Calculamos:
P(S̄)=1-0,5475=0,4525.
3. Aplicamos Bayes:
P(A|S̄)=P(S̄|A)P(A)/P(S̄).
4. Sustituimos:
P(A|S̄)=(0,50·0,40)/0,4525
=0,20/0,4525
=80/181≈0,4420.
Resultado final: aproximadamente un 44,20 %.`
      }
    },
    "ccss2-probabilidad-a7396ef50adc": {
      "a)": {
        options: ["1-C(18,4)/C(40,4)≈0,9665", "C(22,4)/C(40,4)≈0,0767", "22/40=0,55", "C(18,4)/C(40,4)≈0,0335"],
        correct: 0,
        solution: `Resolución:
1. Aprueba si entre los cuatro temas aparece al menos uno de los 22 preparados.
2. Usamos el suceso contrario: que los cuatro pertenezcan a los 18 no preparados.
3. Por tanto:
P(aprobar)=1-C(18,4)/C(40,4).
4. Calculamos:
P(aprobar)≈0,9665.
Resultado final: la probabilidad de aprobar es aproximadamente un 96,65 %.`
      },
      "b)": {
        options: ["C(22,1)C(18,3)/C(40,4)≈0,1964", "C(22,3)C(18,1)/C(40,4)≈0,4430", "C(22,1)/C(40,4)≈0,0002", "22/40=0,55"],
        correct: 0,
        solution: `Resolución:
1. Para conocer exactamente uno de los cuatro temas debemos elegir:
un tema de los 22 preparados y tres de los 18 no preparados.
2. Los casos favorables son:
C(22,1)·C(18,3).
3. Los grupos posibles de cuatro temas distintos son:
C(40,4).
4. Por tanto:
P=C(22,1)C(18,3)/C(40,4)≈0,1964.
Resultado final: la probabilidad es aproximadamente un 19,64 %.`
      }
    },
    "ccss2-probabilidad-0de0ed16329e": {
      "a)": {
        options: ["0,54", "0,46", "0,60", "0,42"],
        correct: 0,
        solution: `Resolución:
1. Sea C alojarse en el centro y H hacerlo en un hotel de 3 o más estrellas.
2. Aplicamos la probabilidad total:
P(H)=P(H|C)P(C)+P(H|C̄)P(C̄).
3. Sustituimos:
P(H)=0,60·0,70+0,40·0,30
=0,42+0,12
=0,54.
Resultado final: la probabilidad es 0,54, es decir, un 54 %.`
      },
      "b)": {
        options: ["14/23≈0,6087", "7/10=0,70", "6/10=0,60", "9/23≈0,3913"],
        correct: 0,
        solution: `Resolución:
1. Sea L alojarse en un establecimiento de menor calidad. Se pide P(C|L).
2. Calculamos:
P(L|C)=0,40,
P(L|C̄)=0,60.
3. Probabilidad total:
P(L)=0,40·0,70+0,60·0,30=0,28+0,18=0,46.
4. Bayes:
P(C|L)=0,40·0,70/0,46
=0,28/0,46
=14/23≈0,6087.
Resultado final: aproximadamente un 60,87 %.`
      }
    },
    "ccss2-probabilidad-609db040afef": {
      "a)": {
        options: ["0,60", "0,70", "0,50", "0,12"],
        correct: 0,
        solution: `Resolución:
1. Sea D acudir para diagnóstico y R acudir para solicitar recetas.
2. Se pide la unión D∪R:
P(D∪R)=P(D)+P(R)-P(D∩R).
3. Sustituimos:
P(D∪R)=0,40+0,30-0,10=0,60.
Resultado final: la probabilidad es 0,60, es decir, un 60 %.`
      },
      "b)": {
        options: ["0,25", "0,10", "0,40", "1/3≈0,3333"],
        correct: 0,
        solution: `Resolución:
1. Se pide:
P(R|D).
2. Aplicamos la definición de probabilidad condicionada:
P(R|D)=P(R∩D)/P(D).
3. Sustituimos:
P(R|D)=0,10/0,40=0,25.
Resultado final: la probabilidad es 0,25, es decir, un 25 %.`
      }
    },
    "ccss2-estadistica-c432c4f5a561": {
      "a)": {
        options: ["(5,37;14,63) minutos", "(6,08;13,92) minutos", "(4,51;15,49) minutos", "(7,87;12,13) minutos"],
        correct: 0,
        solution: `Resolución:
1. La media muestral es:
x̄=(12+11+10+9+7+12+11+8+10)/9=10.
2. Para un 97 % de confianza:
α=0,03, α/2=0,015,
z(1-α/2)=z0,985≈2,17.
3. Con σ=6,4 y n=9, el error es:
E=2,17·6,4/√9≈4,63.
4. Intervalo:
(x̄-E,x̄+E)=(10-4,63,10+4,63).
Resultado final: IC97%≈(5,37;14,63) minutos.`
      },
      "b)": {
        options: ["n=22", "n=21", "n=20", "n=23"],
        correct: 0,
        solution: `Resolución:
1. El error debe cumplir:
E=z·σ/√n<3.
2. Sustituimos z=2,17 y σ=6,4:
2,17·6,4/√n<3.
3. Despejamos:
n>(2,17·6,4/3)²≈21,43.
4. El menor entero que lo cumple es:
n=22.
Resultado final: se necesitan al menos 22 personas.`
      }
    },
    "ccss2-estadistica-9ee2da0d6663": {
      "a)": {
        options: ["(2,1236;2,4764) bares", "(2,1530;2,4470) bares", "(2,2100;2,3900) bares", "(2,0354;2,5646) bares"],
        correct: 0,
        solution: `Resolución:
1. σ=√0,81=0,9, x̄=2,3 y n=100.
2. Para un 95 % de confianza, z=1,96.
3. Error:
E=1,96·0,9/√100=0,1764.
4. Intervalo:
(2,3-0,1764,2,3+0,1764).
Resultado final: IC95%=(2,1236;2,4764) bares.`
      },
      "b)": {
        options: ["La amplitud aumenta", "La amplitud disminuye", "La amplitud no cambia", "El intervalo desaparece"],
        correct: 0,
        solution: `Resolución:
La amplitud es:
2E=2z·σ/√n.
Con el mismo nivel de confianza, z y σ permanecen constantes. Si disminuye n, disminuye √n en el denominador y aumenta el error E.
Resultado final: al disminuir el tamaño muestral, el intervalo se hace más amplio.`
      },
      "c)": {
        options: ["No; 2 queda fuera del IC90%≈(2,152;2,448)", "Sí; 2 pertenece al IC90%", "Sí; el IC90% es (1,90;2,70)", "No; porque la media muestral siempre debe ser 2"],
        correct: 0,
        solution: `Resolución:
1. Para un 90 % de confianza, z=1,645.
2. Error:
E=1,645·0,9/10=0,14805.
3. Intervalo:
(2,3-0,14805,2,3+0,14805)
≈(2,152;2,448).
4. El valor 2 no pertenece al intervalo.
Resultado final: no puede aceptarse la afirmación al 90 % de confianza.`
      }
    },
    "ccss2-estadistica-e19f9cbd8264": {
      "a)": {
        options: ["(302,4;341,6) pacientes", "(312,2;331,8) pacientes", "(296,24;347,76) pacientes", "(272;372) pacientes"],
        correct: 0,
        solution: `Resolución:
1. x̄=322, σ=50, n=25 y z=1,96.
2. Error:
E=1,96·50/√25=19,6.
3. Intervalo:
(322-19,6,322+19,6).
Resultado final: IC95%=(302,4;341,6) pacientes.`
      },
      "b)": {
        options: ["La amplitud disminuye", "La amplitud aumenta", "No cambia", "Se duplica siempre"],
        correct: 0,
        solution: `Resolución:
La amplitud es 2E=2z·σ/√n. Manteniendo el nivel de confianza, al aumentar n crece el denominador y disminuye el error.
Resultado final: al aumentar el tamaño muestral, el intervalo se hace más estrecho.`
      },
      "c)": {
        options: ["Sí; 330 pertenece al IC99%=(296,24;347,76)", "No; 330 queda fuera del IC99%", "Sí; porque 330 coincide con la media muestral", "No; porque el IC99% es (302,4;341,6)"],
        correct: 0,
        solution: `Resolución:
1. Para un 99 % de confianza, z≈2,576.
2. Error:
E=2,576·50/5=25,76.
3. Intervalo:
(322-25,76,322+25,76)
=(296,24;347,76).
4. El valor 330 pertenece al intervalo.
Resultado final: sí puede aceptarse la afirmación con un 99 % de confianza.`
      }
    },
    "ccss2-estadistica-b327d56604ea": {
      "a)": {
        options: ["(3,82;7,18) libros", "(4,18;6,82) libros", "(3,10;7,90) libros", "(5,00;6,00) libros"],
        correct: 0,
        solution: `Resolución:
1. La media muestral es:
x̄=(4+8+2+9+3+7+5+6+7+4)/10=5,5.
2. σ=√6, n=10 y, para un 97 % de confianza, z≈2,17.
3. Error:
E=2,17·√6/√10≈1,68.
4. Intervalo:
(5,5-1,68,5,5+1,68).
Resultado final: IC97%≈(3,82;7,18) libros.`
      },
      "b)": {
        options: ["Disminuir el tamaño de la muestra", "Aumentar el tamaño de la muestra", "Mantener siempre el mismo tamaño", "Reducir la desviación típica poblacional"],
        correct: 0,
        solution: `Resolución:
Para el mismo nivel de confianza:
amplitud=2z·σ/√n.
Como z y σ no cambian, para conseguir mayor amplitud debemos disminuir n.
Resultado final: se puede usar una muestra de menor tamaño.`
      },
      "c)": {
        options: ["E≈0,628 libros", "E≈0,306 libros", "E≈1,225 libros", "E≈0,750 libros"],
        correct: 0,
        solution: `Resolución:
1. Un 95,96 % de confianza deja:
α=0,0404, α/2=0,0202.
Por tanto z0,9798≈2,05.
2. Con σ=√6 y n=64:
E=z·σ/√n
=2,05·√6/8
≈0,628.
Resultado final: el error máximo admisible es aproximadamente 0,628 libros.`
      }
    }
  });
})();

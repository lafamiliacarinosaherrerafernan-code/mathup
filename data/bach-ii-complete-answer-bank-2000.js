(() => {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};

  const answer = (correctText, distractors, solution) => ({
    options: [correctText, ...distractors],
    correct: 0,
    solution: `Resolución:\n${solution}`,
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-f09b31d6e92e": {
      "Resultado": answer(
        "Si a=10, SCD y (x,y,z)=(11,6,4); si a≠10, SI",
        [
          "Si a=10, SCI; si a≠10, SCD",
          "SCD para todo a y (x,y,z)=(11,6,4)",
          "Si a=10, SI; si a≠10, SCD",
        ],
        `Aplicamos el teorema de Rouché-Frobenius. Las matrices de coeficientes y ampliada son

A=((1,−1,0),
   (0,1,1),
   (1,0,−2),
   (2,0,−3)),

A*=((1,−1,0,5),
    (0,1,1,a),
    (1,0,−2,3),
    (2,0,−3,a)).

Tomamos el menor formado por las tres primeras filas:

D=|1,−1,0; 0,1,1; 1,0,−2|=−3≠0.

Por tanto, rango(A)=3 para todo valor de a.

En la matriz ampliada hacemos F₂←F₂−F₁ y desarrollamos el determinante de orden 4 por la segunda columna. Se obtiene

det(A*)=−2(a−10).

Si a≠10, rango(A*)=4>rango(A)=3. El sistema es incompatible.

Si a=10, rango(A*)=rango(A)=3, que coincide con el número de incógnitas. El sistema es compatible determinado.

Para a=10 resolvemos las tres primeras ecuaciones:

{x−y=5
 y+z=10
 x−2z=3}

Por la regla de Cramer:

D=−3,  Dₓ=−33,  Dᵧ=−18,  D_z=−12.

x=frac{Dₓ}{D}=frac{−33}{−3}=11,  y=frac{Dᵧ}{D}=frac{−18}{−3}=6,  z=frac{D_z}{D}=frac{−12}{−3}=4.

La cuarta ecuación se verifica: 2·11−3·4=10.

Resultado final: si a=10, el sistema es compatible determinado y (x,y,z)=(11,6,4); si a≠10, es incompatible.`
      ),
    },

    "mates2-algebra-c0ea99403ce1": {
      "Resultado": answer(
        "X=((3,3),(4,6)) e Y=((1,3),(−2,7))",
        [
          "X=((1,3),(−2,7)) e Y=((3,3),(4,6))",
          "X=((3,9),(−6,21)) e Y=((1,3),(−2,7))",
          "X=((6,12),(−2,27)) e Y=((7,3),(16,4))",
        ],
        `Llamamos

M=((7,3),(16,4)),  N=((6,12),(−2,27)).

El sistema es

{3X−2Y=M
 X+3Y=N}

Multiplicamos la segunda ecuación por 2 y la sumamos a la primera:

3X−2Y+2X+6Y=M+2N,

5X+4Y=M+2N.

Es más directo eliminar una incógnita desde las ecuaciones originales. Multiplicamos la primera por 3 y la segunda por 2:

9X−6Y=3M,
2X+6Y=2N.

Al sumar:

11X=3M+2N,

X=frac{3M+2N}{11}
 =frac{1}{11}((33,33),(44,66))
 =((3,3),(4,6)).

Ahora multiplicamos la segunda ecuación original por 3 y restamos la primera:

3X+9Y−(3X−2Y)=3N−M,

11Y=3N−M.

Y=frac{3N−M}{11}
 =frac{1}{11}((11,33),(−22,77))
 =((1,3),(−2,7)).

Comprobación: al sustituir estas matrices se recuperan las dos matrices de los segundos miembros.

Resultado final:

X=((3,3),(4,6)),  Y=((1,3),(−2,7)).`
      ),
    },

    "mates2-algebra-6c6f339e8058": {
      "Resultado": answer(
        "X=((1,−2,1),(0,−2,1),(0,−2,2))",
        [
          "X=((−1,2,−1),(0,2,−1),(0,2,−2))",
          "X=((0,−2,1),(1,−2,1),(0,−2,2))",
          "X=((1,0,0),(−2,−2,−2),(1,1,2))",
        ],
        `Partimos de A+BX=C y aislamos el término que contiene X:

BX=C−A.

Calculamos la diferencia:

C−A=((-1,0,0),
     (2,−4,2),
     (−1,0,1)).

Como B multiplica a X por la izquierda, multiplicamos ambos miembros por B⁻¹ también por la izquierda:

B⁻¹BX=B⁻¹(C−A),

X=B⁻¹(C−A).

Calculamos B⁻¹ mediante determinantes. Para

B=((−1,1,0),
   (2,0,0),
   (−1,0,1)),

det(B)=−2≠0.

Formamos la matriz de adjuntos, colocando cada menor con su signo (−1)^(i+j):

Adj(B)=((0,−2,0),
        (−1,−1,−1),
        (0,0,−2)).

Con la nomenclatura del curso:

B⁻¹=frac{Adj(Bᵀ)}{det(B)}
   =frac{1}{−2}((0,−1,0),
                (−2,−1,0),
                (0,−1,−2))
   =((0,1/2,0),
     (1,1/2,0),
     (0,1/2,1)).

Finalmente:

X=((0,1/2,0),
   (1,1/2,0),
   (0,1/2,1))
  ·((−1,0,0),
    (2,−4,2),
    (−1,0,1))

 =((1,−2,1),
   (0,−2,1),
   (0,−2,2)).

Comprobación: A+BX=C.

Resultado final: X=((1,−2,1),(0,−2,1),(0,−2,2)).`
      ),
    },

    "mates2-algebra-aaa935001c0f": {
      "Resultado": answer(
        "Si a≠0, los tres planos se cortan en un punto; si a=0, forman una posición prismática",
        [
          "Los tres planos son paralelos para todo a",
          "Si a=0, se cortan en un punto; si a≠0, no tienen puntos comunes",
          "Los tres planos coinciden únicamente cuando a=1",
        ],
        `Estudiamos el sistema formado por las ecuaciones de los tres planos:

{x+y=1
 ax+z=0
 x+y+z=2}

La matriz de coeficientes es

A=((1,1,0),
   (a,0,1),
   (1,1,1)).

Por Sarrus:

det(A)=−a.

Si a≠0, det(A)≠0. Los tres planos se cortan en un único punto. Restando la primera ecuación de la tercera obtenemos z=1. En la segunda:

ax+1=0 ⇒ x=−frac{1}{a}.

En la primera:

y=1−x=1+frac{1}{a}.

El punto común es

P=(−frac{1}{a},1+frac{1}{a},1).

Si a=0, la segunda ecuación es z=0. Sin embargo, al restar la primera ecuación de la tercera se obtiene z=1. Por tanto, no existe un punto común a los tres planos.

Cada pareja de planos sí se corta en una recta y las tres rectas de intersección son paralelas. Es una posición prismática.

Resultado final: para a≠0 son concurrentes en un punto; para a=0 forman una posición prismática y no existe intersección común.`
      ),
    },

    "mates2-algebra-f7c3e512b235": {
      "Resultado": answer(
        "Si a≠2, SCD; si a=2, SI",
        [
          "Si a=2, SCI; si a≠2, SCD",
          "SCD para todo a",
          "Si a≠2, SI; si a=2, SCD",
        ],
        `La matriz de coeficientes es

A=((2,−1,2),
   (1,4,1),
   (2,−5,a)).

Calculamos su determinante por Sarrus:

det(A)=9(a−2).

Si a≠2, det(A)≠0 y el sistema es compatible determinado.

Resolvemos las dos primeras ecuaciones. De la segunda:

x=1−4y−z.

Sustituimos en la primera:

2(1−4y−z)−y+2z=1,

2−9y=1,

y=frac{1}{9}.

Entonces

x=frac{5}{9}−z.

Sustituimos en la tercera:

2(frac{5}{9}−z)−frac{5}{9}+az=−2,

frac{5}{9}+(a−2)z=−2,

z=−frac{23}{9(a−2)}.

Por tanto:

x=frac{5a+13}{9(a−2)},  y=frac{1}{9},  z=−frac{23}{9(a−2)}.

Si a=2, la última igualdad se convierte en

frac{5}{9}=−2,

que es imposible. Por Rouché-Frobenius, rango(A)=2 y rango(A*)=3: el sistema es incompatible.

Resultado final: si a≠2, SCD con la solución anterior; si a=2, SI.`
      ),
    },

    "mates2-algebra-f92004b193db": {
      "Resultado": answer(
        "X=((0,2),(−4,16),(10/3,−40/3))",
        [
          "X=((0,−2),(4,−16),(−10/3,40/3))",
          "X=((2,0),(16,−4),(−40/3,10/3))",
          "La ecuación no tiene solución",
        ],
        `Partimos de

ABX−CX=2A.

Sacamos X como factor común por la derecha:

(AB−C)X=2A.

Calculamos

AB=((7,−1,3),
    (8,1,3),
    (2,−1,1)),

AB−C=((6,−3,−3),
      (9,−1,0),
      (1,0,0)).

Su determinante es

det(AB−C)=−3≠0.

Por tanto, existe la inversa y multiplicamos por ella a la izquierda:

X=(AB−C)⁻¹·2A.

Al efectuar el cálculo mediante

(AB−C)⁻¹=frac{Adj((AB−C)ᵀ)}{det(AB−C)},

se obtiene

X=((0,2),
   (−4,16),
   (10/3,−40/3)).

Comprobación:

(AB−C)X=2A
 =((2,4),
   (4,2),
   (0,2)).

Resultado final: X=((0,2),(−4,16),(10/3,−40/3)).`
      ),
    },

    "mates2-analisis-942fa34add8d": {
      "Resultado": answer(
        "325 unidades",
        ["300 unidades", "650 unidades", "1 000 unidades"],
        `El coste de producir x unidades es

C(x)=x²−300x+100.

El precio de venta de cada unidad es U(x)=1000−x, de modo que los ingresos son

I(x)=x·U(x)=x(1000−x)=1000x−x².

El beneficio es la diferencia entre ingresos y costes:

B(x)=I(x)−C(x)
    =(1000x−x²)−(x²−300x+100)
    =−2x²+1300x−100.

Derivamos:

B′(x)=−4x+1300.

Buscamos el punto crítico:

−4x+1300=0 ⇒ x=325.

Como

B″(x)=−4<0,

el punto crítico corresponde a un máximo.

Resultado final: deben venderse 325 unidades para que el beneficio sea máximo.`
      ),
    },

    "mates2-analisis-f0d400cde4db": {
      "Resultado": answer(
        "−1/6·ln|x|−2/15·ln|x+3|+3/10·ln|x−2|+C",
        [
          "1/6·ln|x|−2/15·ln|x+3|+3/10·ln|x−2|+C",
          "−1/6·ln|x|+2/15·ln|x+3|+3/10·ln|x−2|+C",
          "−1/6·ln|x|−2/15·ln|x−3|+3/10·ln|x+2|+C",
        ],
        `Factorizamos el denominador:

x³+x²−6x=x(x²+x−6)=x(x+3)(x−2).

Descomponemos en fracciones simples:

frac{x+1}{x(x+3)(x−2)}
=frac{A}{x}+frac{B}{x+3}+frac{C}{x−2}.

Multiplicamos por x(x+3)(x−2):

x+1=A(x+3)(x−2)+Bx(x−2)+Cx(x+3).

Para x=0:

1=A·3·(−2) ⇒ 1=−6A ⇒ A=−frac{1}{6}.

Para x=−3:

−2=B·(−3)·(−5) ⇒ −2=15B ⇒ B=−frac{2}{15}.

Para x=2:

3=C·2·5 ⇒ 3=10C ⇒ C=frac{3}{10}.

Por tanto:

I=−frac{1}{6}∫frac{1}{x}dx
  −frac{2}{15}∫frac{1}{x+3}dx
  +frac{3}{10}∫frac{1}{x−2}dx.

Integramos cada fracción:

I=−frac{1}{6}ln|x|
  −frac{2}{15}ln|x+3|
  +frac{3}{10}ln|x−2|+C.

La derivada del resultado recupera el integrando original.`
      ),
    },

    "mates2-analisis-1b8a2884eef5": {
      "Resultado": answer(
        "a=0, b=3; continua en ℝ y no derivable en x=0 ni en x=1",
        [
          "a=3, b=0; continua y derivable en ℝ",
          "a=0, b=3; derivable en x=0 y en x=1",
          "a=1, b=2; no continua en x=1",
        ],
        `Cada rama es continua en su intervalo. Solo debemos estudiar x=0 y x=1.

Continuidad en x=0:

lim_{x→0−}f(x)=lim_{x→0−}x²=0,

lim_{x→0+}f(x)=lim_{x→0+}(a+bx)=a,

f(0)=0.

Para que los tres valores coincidan, a=0.

Continuidad en x=1:

lim_{x→1−}f(x)=a+b,

lim_{x→1+}f(x)=3,

f(1)=a+b.

La continuidad exige a+b=3. Como a=0, obtenemos b=3.

La función queda

f(x)={x² si x≤0;
      3x si 0<x≤1;
      3 si x>1}.

Las funciones derivadas de cada rama son

f′(x)={2x si x<0;
       3 si 0<x<1;
       0 si x>1}.

En x=0:

f′(0−)=0,  f′(0+)=3.

No coinciden, luego no es derivable en x=0.

En x=1:

f′(1−)=3,  f′(1+)=0.

No coinciden, luego no es derivable en x=1.

Resultado final: a=0, b=3; la función es continua en ℝ y no es derivable en x=0 ni en x=1.`
      ),
    },

    "mates2-analisis-51f5f2059f7b": {
      "Resultado": answer(
        "116/3 unidades cuadradas",
        ["76/3 unidades cuadradas", "64/3 unidades cuadradas", "32 unidades cuadradas"],
        `Buscamos los puntos que delimitan el recinto.

La parábola corta al eje OX cuando

x²−1=0 ⇒ x=−1 o x=1.

La recta corta al eje OX cuando

11−x=0 ⇒ x=11.

Calculamos el corte entre la parábola y la recta:

x²−1=11−x,

x²+x−12=0,

(x+4)(x−3)=0.

Los cortes tienen abscisas x=−4 y x=3. El que delimita este recinto es x=3, con y=8.

[[area-graph-parabola-line]]

Como muestra la gráfica, de x=1 a x=3 el borde superior es la parábola; de x=3 a x=11 es la recta:

[[area-equation-parabola-line]]

Aplicamos la regla de Barrow en cada integral:

[[barrow-equation-parabola]]

[[barrow-equation-line]]

Sumamos las dos áreas:

A=frac{20}{3}+32
 =frac{20}{3}+frac{96}{3}
 =frac{116}{3}.

Resultado final: A=frac{116}{3} unidades cuadradas.`
      ),
    },

    "mates2-analisis-6ce41777cc5a": {
      "Resultado": answer(
        "1/3 unidades cuadradas",
        ["2/3 unidades cuadradas", "1/6 unidades cuadradas", "1 unidad cuadrada"],
        `Calculamos los puntos de corte:

x²=|x|.

Si x≥0:

x²=x ⇒ x(x−1)=0 ⇒ x=0 o x=1.

Si x<0:

x²=−x ⇒ x(x+1)=0 ⇒ x=−1.

El recinto está entre x=−1 y x=1. En todo ese intervalo, y=|x| es la función superior e y=x² es la inferior.

[[area-graph-abs-parabola]]

Por la simetría respecto del eje OY:

[[area-equation-abs-parabola]]

Calculamos:

A=2·[frac{x²}{2}−frac{x³}{3}]_{0}^{1}
 =2·(frac{1}{2}−frac{1}{3})
 =2·frac{1}{6}
 =frac{1}{3}.

Resultado final: A=frac{1}{3} unidades cuadradas.`
      ),
    },

    "mates2-analisis-d1eb1bbc2b2e": {
      "Resultado": answer(
        "1/3",
        ["0", "1/2", "1"],
        `Sustituimos x=0:

frac{0−sen 0}{tg 0−sen 0}=frac{0}{0}.

Es una indeterminación 0/0, por lo que aplicamos la regla de L’Hôpital.

Primera aplicación:

lim_{x→0}frac{1−cos x}{1+tg²x−cos x}.

Al sustituir vuelve a aparecer 0/0.

Segunda aplicación:

lim_{x→0}frac{sen x}{2·tg x·(1+tg²x)+sen x}.

La fracción ocupa todo el denominador anterior. Antes de derivar otra vez, desarrollamos:

2·tg x·(1+tg²x)+sen x
=2·tg x+2·tg³x+sen x.

Al sustituir x=0 vuelve a aparecer 0/0. Aplicamos L’Hôpital por tercera vez:

lim_{x→0}frac{cos x}{2(1+tg²x)+6tg²x(1+tg²x)+cos x}.

Sustituimos x=0:

frac{1}{2+0+1}=frac{1}{3}.

Resultado final: el límite vale frac{1}{3}.`
      ),
    },

    "mates2-analisis-b2cf32bb0462": {
      "Resultado": answer(
        "Continua en ℝ y derivable en ℝ excepto en x=1",
        [
          "Discontinua en x=1 y no derivable en x=1",
          "Continua y derivable en todo ℝ",
          "Continua en ℝ y no derivable en x=2",
        ],
        `Cada rama es continua en su intervalo. Estudiamos el punto de unión x=1.

Límite por la izquierda:

lim_{x→1−}frac{1}{2−x}=1.

Límite por la derecha:

lim_{x→1+}(−x²+4x−2)=−1+4−2=1.

Valor de la función:

f(1)=frac{1}{2−1}=1.

Los tres valores coinciden, por lo que f es continua en x=1 y, en consecuencia, en todo ℝ.

Derivamos cada rama:

f′(x)={frac{1}{(2−x)²} si x<1;
       −2x+4 si x>1}.

Calculamos las derivadas laterales:

f′(1−)=1,

f′(1+)=2.

Como no coinciden, f no es derivable en x=1.

Resultado final: f es continua en ℝ y derivable en ℝ excepto en x=1.`
      ),
    },

    "mates2-analisis-5d13a8a4789b": {
      "Resultado": answer(
        "3/2·ln(x²+2x+3)−3/√2·arctg((x+1)/√2)+C",
        [
          "3·ln(x²+2x+3)−3/√2·arctg((x+1)/√2)+C",
          "3/2·ln(x²+2x+3)+3/√2·arctg((x+1)/√2)+C",
          "3/2·ln|x|−3·arctg(x)+C",
        ],
        `Queremos relacionar el numerador con la derivada del denominador:

(x²+2x+3)′=2x+2.

Escribimos

3x=frac{3}{2}(2x+2)−3.

Por tanto:

I=frac{3}{2}∫frac{2x+2}{x²+2x+3}dx
 −3∫frac{1}{x²+2x+3}dx.

La primera integral es inmediata:

frac{3}{2}ln(x²+2x+3).

En la segunda completamos el cuadrado:

x²+2x+3=(x+1)²+2.

Usamos

∫frac{1}{u²+a²}du=frac{1}{a}arctg(frac{u}{a}).

Así:

∫frac{1}{(x+1)²+2}dx
=frac{1}{sqrt{2}}arctg(frac{x+1}{sqrt{2}}).

Resultado final:

I=frac{3}{2}ln(x²+2x+3)
 −frac{3}{sqrt{2}}arctg(frac{x+1}{sqrt{2}})+C.`
      ),
    },

    "mates2-analisis-635b0439746f": {
      "Resultado": answer(
        "6 cm de base y 9 cm de altura",
        [
          "9 cm de base y 6 cm de altura",
          "12 cm de base y 9 cm de altura",
          "6 cm de base y 18 cm de altura",
        ],
        `Llamamos h a la altura del rectángulo y b a su base.

Por semejanza de triángulos, la anchura disponible disminuye linealmente desde 12 cm cuando h=0 hasta 0 cuando h=18:

frac{b}{12}=frac{18−h}{18}.

Despejamos:

b=12·frac{18−h}{18}
 =12−frac{2}{3}h.

El área del rectángulo es

A(h)=b·h
    =(12−frac{2}{3}h)h
    =12h−frac{2}{3}h².

Derivamos:

A′(h)=12−frac{4}{3}h.

Igualamos a cero:

12−frac{4}{3}h=0 ⇒ h=9.

Entonces:

b=12−frac{2}{3}·9=6.

Además,

A″(h)=−frac{4}{3}<0,

por lo que se trata de un máximo.

Resultado final: el rectángulo debe medir 6 cm de base y 9 cm de altura.`
      ),
    },

    "mates2-analisis-e09dbd3ffdfc": {
      "Resultado": answer(
        "Continua y derivable en x=−1; discontinua y no derivable en x=4",
        [
          "Continua y derivable en x=−1 y x=4",
          "Discontinua en x=−1 y continua en x=4",
          "Continua en ambos puntos, pero no derivable en ninguno",
        ],
        `Cada rama es continua en el interior de su intervalo. Estudiamos x=−1 y x=4.

En x=−1:

lim_{x→−1−}f(x)=frac{2}{2(−1)+1}=−2,

lim_{x→−1+}f(x)=(−1)²−2(−1)−5=−2,

f(−1)=−2.

La función es continua en x=−1.

Derivamos las dos ramas implicadas:

(frac{2}{2x+1})′=−frac{4}{(2x+1)²},

(x²−2x−5)′=2x−2.

En x=−1:

f′(−1−)=−4,  f′(−1+)=−4.

También es derivable en x=−1.

En x=4:

lim_{x→4−}f(x)=4²−2·4−5=3,

lim_{x→4+}f(x)=5,

f(4)=3.

Los límites laterales no coinciden. La función es discontinua en x=4 y, por tanto, tampoco es derivable allí.

Resultado final: continua y derivable en x=−1; discontinua y no derivable en x=4.`
      ),
    },

    "mates2-analisis-fbee225361a9": {
      "Resultado": answer(
        "64 unidades cuadradas",
        ["32 unidades cuadradas", "128/3 unidades cuadradas", "96 unidades cuadradas"],
        `Calculamos los puntos de corte con la recta y=12:

|x²−4x|=12.

La ecuación x²−4x=12 da

x²−4x−12=0 ⇒ (x−6)(x+2)=0,

por lo que x=−2 y x=6.

La ecuación x²−4x=−12 no tiene soluciones reales.

El valor absoluto cambia de expresión en x=0 y x=4:

|x²−4x|={x²−4x si x≤0 o x≥4;
         −x²+4x si 0≤x≤4}.

La región queda entre y=12 y la curva desde x=−2 hasta x=6. La representación muestra los cortes (−2,12) y (6,12), y los cambios de rama en x=0 y x=4.

Dividimos el área:

A=∫_{−2}^{0}[12−(x²−4x)]dx
 +∫_{0}^{4}[12−(−x²+4x)]dx
 +∫_{4}^{6}[12−(x²−4x)]dx.

Calculando las tres integrales se obtiene:

A=frac{40}{3}+frac{112}{3}+frac{40}{3}
 =frac{192}{3}
 =64.

Resultado final: A=64 unidades cuadradas.`
      ),
    },

    "mates2-analisis-cc81ce0c055e": {
      "Resultado": answer(
        "x²/2−2x+ln|x|−8/3·ln|x−2|+5/3·ln|x+1|+C",
        [
          "x²/2−2x−ln|x|+8/3·ln|x−2|−5/3·ln|x+1|+C",
          "x²/2−3x+ln|x(x−2)(x+1)|+C",
          "x²−2x+ln|x|−8/3·ln|x−2|+5/3·ln|x+1|+C",
        ],
        `Como el grado del numerador es mayor que el del denominador, dividimos:

frac{x⁴−3x³−3x−2}{x³−x²−2x}
=x−2+frac{−7x−2}{x³−x²−2x}.

Factorizamos:

x³−x²−2x=x(x−2)(x+1).

Descomponemos:

frac{−7x−2}{x(x−2)(x+1)}
=frac{A}{x}+frac{B}{x−2}+frac{C}{x+1}.

Multiplicamos por el denominador común:

−7x−2=A(x−2)(x+1)+Bx(x+1)+Cx(x−2).

Para x=0:

−2=−2A ⇒ A=1.

Para x=2:

−16=6B ⇒ B=−frac{8}{3}.

Para x=−1:

5=3C ⇒ C=frac{5}{3}.

El integrando queda

x−2+frac{1}{x}−frac{8}{3(x−2)}+frac{5}{3(x+1)}.

Integramos término a término:

I=frac{x²}{2}−2x+ln|x|
 −frac{8}{3}ln|x−2|
 +frac{5}{3}ln|x+1|+C.

La derivación del resultado confirma la expresión original.`
      ),
    },

    "mates2-geometria-fc225200bdd9": {
      "Resultado": answer(
        "d(P,π)=2 y Q=(20/13,44/13,−11/13)",
        [
          "d(P,π)=26 y Q=(20/13,44/13,−11/13)",
          "d(P,π)=2 y Q=(26/13,52/13,13/13)",
          "d(P,π)=13 y Q=(2,4,1)",
        ],
        `El plano es π:3x+4y+12z−8=0 y P=(2,4,1).

[[point-plane-distance plane="π: 3x+4y+12z−8=0" p="P(2,4,1)" q="Q(20/13,44/13,−11/13)"]]

Aplicamos la fórmula de la distancia de un punto a un plano:

d(P,π)=frac{|Ax₀+By₀+Cz₀+D|}{sqrt{A²+B²+C²}}.

Sustituimos:

d(P,π)=frac{|3·2+4·4+12·1−8|}{sqrt{3²+4²+12²}}
      =frac{26}{13}
      =2.

El vector normal es vector{n}=(3,4,12). La recta perpendicular al plano que pasa por P se expresa en forma paramétrica:

r:{x=2+3t;
   y=4+4t;
   z=1+12t}.

Sustituimos en el plano:

3(2+3t)+4(4+4t)+12(1+12t)−8=0,

26+169t=0,

t=−frac{2}{13}.

El pie de la perpendicular es

Q=(2−frac{6}{13},4−frac{8}{13},1−frac{24}{13})
 =(frac{20}{13},frac{44}{13},−frac{11}{13}).

Resultado final: d(P,π)=2 y Q=(frac{20}{13},frac{44}{13},−frac{11}{13}).`
      ),
    },

    "mates2-geometria-975f12d54c66": {
      "Resultado": answer(
        "P=(7/3,10/3,5/3)",
        [
          "P=(5/3,8/3,7/3)",
          "P=(−7/3,−10/3,−5/3)",
          "P=(1,2,3)",
        ],
        `Escribimos la recta r en forma paramétrica. Tomamos y=t:

x−y+1=0 ⇒ x=t−1,

2x−z−1=0 ⇒ z=2t−3.

Por tanto:

r:{x=−1+t;
   y=t;
   z=−3+2t}.

Un punto es R₀=(−1,0,−3) y un vector director es vector{v}=(1,1,2).

Sea Q el pie de la perpendicular trazada desde A=(1,2,3) a r. Un punto genérico de r es

Q=(−1+t,t,−3+2t).

La perpendicularidad exige

vector{AQ}·vector{v}=0.

vector{AQ}=Q−A=(t−2,t−2,2t−6).

(t−2)+(t−2)+2(2t−6)=0,

6t−16=0,

t=frac{8}{3}.

Así:

Q=(frac{5}{3},frac{8}{3},frac{7}{3}).

Q es el punto medio entre A y su simétrico P. Por tanto:

P=2Q−A
 =(frac{10}{3},frac{16}{3},frac{14}{3})−(1,2,3)
 =(frac{7}{3},frac{10}{3},frac{5}{3}).

Resultado final: P=(frac{7}{3},frac{10}{3},frac{5}{3}).`
      ),
    },

    "mates2-geometria-887b0f0c01da": {
      "Resultado": answer(
        "No existe: la recta AB y la recta r se cruzan",
        [
          "Sí existe y coincide con la recta AB",
          "Existen infinitas rectas que contienen A y B",
          "Sí existe porque A pertenece a r",
        ],
        `Por dos puntos distintos A y B pasa una única recta. Por tanto, la única candidata es la recta AB.

Calculamos un vector director:

vector{AB}=B−A=(4,10,8)=2(2,5,4).

La recta s que contiene A y B es

s:{x=−2+2t;
   y=−4+5t;
   z=−3+4t}.

Para comprobar si corta a r, sustituimos estas expresiones en las dos ecuaciones que definen r.

En x−y+z=1:

(−2+2t)−(−4+5t)+(−3+4t)=1,

−1+t=1,

t=2.

En 2x+y−3z=2:

2(−2+2t)+(−4+5t)−3(−3+4t)=2,

1−3t=2,

t=−frac{1}{3}.

Para que existiera un punto común, el mismo valor de t tendría que satisfacer las dos ecuaciones. Como obtenemos valores distintos, s no corta a r.

Resultado final: no existe una recta que contenga simultáneamente A y B y corte a r.`
      ),
    },

    "mates2-geometria-802ade71bfe8": {
      "Resultado": answer(
        "A′=(−2,9,−11)",
        ["A′=(0,3,−3)", "A′=(2,−9,11)", "A′=(−2,3,−11)"],
        `El plano es π:x−3y+4z+21=0 y su vector normal es vector{n}=(1,−3,4).

[[reflection-plane plane="π: x−3y+4z+21=0" a="A(2,−3,5)" q="Q(0,3,−3)" ap="A′(−2,9,−11)"]]

La recta perpendicular al plano que pasa por A tiene como vector director vector{n}. En forma paramétrica:

r:{x=2+t;
   y=−3−3t;
   z=5+4t}.

Sustituimos en el plano:

(2+t)−3(−3−3t)+4(5+4t)+21=0,

52+26t=0,

t=−2.

El punto de corte de la recta con el plano es

Q=(2−2,−3+6,5−8)=(0,3,−3).

Q es el punto medio entre A y A′. Si A′=(x,y,z):

frac{2+x}{2}=0,

frac{−3+y}{2}=3,

frac{5+z}{2}=−3.

Despejamos:

x=−2,  y=9,  z=−11.

Resultado final: A′=(−2,9,−11).`
      ),
    },

    "mates2-geometria-54f714a8fba2": {
      "Resultado": answer(
        "π′:3x+y−2=0; distancia √10/5",
        [
          "π′:3x+y−4=0; distancia 0",
          "π′:x−3y−4=0; distancia √10",
          "π′:3x+y+2=0; distancia 2√10",
        ],
        `El plano determinado por A=(1,1,2), B=(1,1,1) y C=(2,−2,1) contiene los vectores

vector{AB}=(0,0,−1),

vector{AC}=(1,−3,−1).

Un vector normal se obtiene mediante el producto vectorial:

vector{n}=vector{AB}×vector{AC}=(−3,−1,0).

Podemos tomar vector{n}=(3,1,0).

La ecuación del plano que pasa por A es

3(x−1)+(y−1)=0,

π:3x+y−4=0.

El plano buscado es paralelo a π, por lo que tiene el mismo vector normal, y pasa por P=(1,−1,3):

3(x−1)+(y+1)=0,

π′:3x+y−2=0.

La distancia entre dos planos paralelos

Ax+By+Cz+D₁=0,

Ax+By+Cz+D₂=0

es

d=frac{|D₂−D₁|}{sqrt{A²+B²+C²}}.

Por tanto:

d(π,π′)=frac{|−2−(−4)|}{sqrt{3²+1²}}
        =frac{2}{sqrt{10}}
        =frac{sqrt{10}}{5}.

Resultado final: π′:3x+y−2=0 y la distancia es frac{sqrt{10}}{5}.`
      ),
    },

    "mates2-geometria-e11396745935": {
      "Resultado": answer(
        "p:(x,y,z)=(2,−3,8/5)+λ(1,2,0)",
        [
          "p:(x,y,z)=(2,−3,0)+λ(0,0,1)",
          "p:(x,y,z)=(7,0,3)+λ(−2,1,−1)",
          "p:(x,y,z)=(21/5,7/5,8/5)+λ(0,0,1)",
        ],
        `Escribimos ambas rectas en forma paramétrica.

Para r tomamos y=t:

x+2y=7 ⇒ x=7−2t,

x+y−z=4 ⇒ z=3−t.

r:{x=7−2t;
   y=t;
   z=3−t},

con vector director vector{v_r}=(−2,1,−1).

La recta s es

s:{x=2;
   y=−3;
   z=u},

con vector director vector{v_s}=(0,0,1).

Sean

R=(7−2t,t,3−t)∈r,

S=(2,−3,u)∈s.

El vector vector{RS}=S−R debe ser perpendicular a los dos vectores directores.

La condición vector{RS}·vector{v_s}=0 da

u−(3−t)=0 ⇒ u=3−t.

Entonces

vector{RS}=(−5+2t,−3−t,0).

La condición vector{RS}·vector{v_r}=0 da

(−5+2t)(−2)+(−3−t)=0,

7−5t=0,

t=frac{7}{5}.

Así:

R=(frac{21}{5},frac{7}{5},frac{8}{5}),

S=(2,−3,frac{8}{5}).

Un vector director de la perpendicular común es

vector{RS}=(−frac{11}{5},−frac{22}{5},0),

que es paralelo a (1,2,0).

Resultado final:

p:(x,y,z)=(2,−3,frac{8}{5})+λ(1,2,0).`
      ),
    },
  });
})();

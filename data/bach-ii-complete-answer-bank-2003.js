(() => {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};

  const answer = (correctText, distractors, solution) => ({
    options: [correctText, ...distractors],
    correct: 0,
    solution: `Resolución:\n${solution}`,
  });
  const copy = (value) => JSON.parse(JSON.stringify(value || []));
  const makePart = (label, paragraphs = []) => ({ label, paragraphs });
  const paragraph = (plain, html = plain) => ({ plain, html });
  const block = (name) => window.MATES_II_BLOCK_EXERCISES?.[name] || [];

  // Dos documentos oficiales traen los apartados c) y d) dentro del mismo nodo.
  {
    const exercise = block("analisis").find(
      (item) => item.id === "mates2-analisis-072978380ff5"
    );
    if (exercise?.parts?.[2]?.paragraphs?.length > 1) {
      const paragraphs = copy(exercise.parts[2].paragraphs);
      exercise.parts = [
        exercise.parts[0],
        exercise.parts[1],
        makePart("c)", paragraphs.slice(0, 1)),
        makePart("d)", paragraphs.slice(1, 2)),
      ];
    }
  }
  {
    const exercise = block("geometria").find(
      (item) => item.id === "mates2-geometria-34fd77e168b9"
    );
    if (exercise?.parts?.[2]?.paragraphs?.length > 1) {
      const paragraphs = copy(exercise.parts[2].paragraphs);
      exercise.parts = [
        exercise.parts[0],
        exercise.parts[1],
        makePart("c)", paragraphs.slice(0, 1)),
        makePart("d)", paragraphs.slice(1, 2)),
      ];
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-d83425fe8b43": {
      "Resultado": answer(
        "D=0",
        ["D=x", "D=2x", "D=4x²"],
        `Restamos la primera fila a la segunda y a la tercera. Esta operación no modifica el determinante:

D=|x  2x+1  3x+2;
   0     2       2;
   0     4       4|.

En la nueva matriz, la tercera fila es el doble de la segunda. Un determinante que tiene dos filas proporcionales vale cero.

Resultado: D=0.`
      ),
    },
    "mates2-algebra-3f13643831be": {
      "Resultado": answer(
        "λ≠1/2 y λ≠−2",
        ["λ=1/2 o λ=−2", "λ≠1 y λ≠−2", "Para todo λ real"],
        `Calculamos primero el producto:

AB=((1+2λ, 3+2λ),
    (1−λ,       1)).

La matriz AB es invertible si su determinante no es cero:

det(AB)=(1+2λ)·1−(3+2λ)(1−λ)
=2λ²+3λ−2
=(2λ−1)(λ+2).

Por tanto:
det(AB)≠0
⇔ λ≠1/2 y λ≠−2.

Resultado: AB es invertible para λ∈ℝ\\{1/2,−2}.`
      ),
    },
    "mates2-algebra-fdb72826878e": {
      "a)": answer(
        "A³=−I, por lo que A³+I=O",
        ["A³=I", "A²=−I", "A³=O"],
        `Multiplicamos la matriz A por sí misma:

A²=((−1,  0,  1),
    ( 1,  4,  4),
    (−1, −3, −3)).

Volvemos a multiplicar:

A³=A²A
=((−1,0,0),
   (0,−1,0),
   (0,0,−1))
=−I.

Por tanto:
A³+I=−I+I=O.

Resultado: se verifica A³+I=O.`
      ),
      "b)": answer(
        "Sí; A⁻¹=−A²",
        ["No tiene inversa", "Sí; A⁻¹=A²", "Sí; A⁻¹=−A"],
        `Del apartado anterior:
A³=−I.

Multiplicamos A por −A²:
A(−A²)=−A³=I.

También:
(−A²)A=−A³=I.

Por tanto, −A² es la inversa de A:
A⁻¹=−A²
=((1,0,−1),
   (−1,−4,−4),
   (1,3,3)).

Resultado: A es invertible y A⁻¹=−A².`
      ),
    },
    "mates2-algebra-9e9a9f41e8fa": {
      "Resultado": answer(
        "SCD si a∉{−1,0,1}; incompatible si a∈{−1,0,1}; ningún valor lo hace indeterminado",
        [
          "SCD para todo a",
          "SCI si a=0 y SCD en los demás casos",
          "SCI si a=1 e incompatible si a=−1",
        ],
        `La matriz de coeficientes es:

A=((a,1,−1),
   (1,a,1),
   (1,1,a)).

Calculamos:
det(A)=a³−a
=a(a−1)(a+1).

Si a∉{−1,0,1}, det(A)≠0 y el sistema es compatible determinado.

Estudiamos los valores singulares con Rouché-Frobenius:

• a=0:
y−z=1,
x+z=1
implican x+y=2, pero la tercera ecuación exige x+y=−2. Es incompatible.

• a=1:
las dos primeras ecuaciones implican z=0 y x+y=1, mientras la tercera exige x+y+z=−2. Es incompatible.

• a=−1:
los primeros miembros de las dos primeras ecuaciones son opuestos, pero ambos segundos miembros valen 1. Es incompatible.

Con el sistema escrito en el enunciado no existe ningún valor que lo haga compatible indeterminado; esa última petición es incompatible con los datos.

Resultado: SCD fuera de {−1,0,1} e incompatible en esos tres valores.`
      ),
    },
    "mates2-algebra-6f4118e6f4a9": {
      "a)": answer(
        "A es invertible y B no es invertible",
        [
          "A y B son invertibles",
          "A no es invertible y B sí",
          "Ninguna de las dos es invertible",
        ],
        `Calculamos los determinantes:

det(A)=−3≠0.

La tercera fila de B es nula, luego:
det(B)=0.

Por tanto, A tiene inversa y B no tiene inversa.

Resultado: A es invertible; B no lo es.`
      ),
      "b)": answer(
        "X=((2,1,1),(1,2,0),(−2,0,2))",
        [
          "X=((2,1,1),(0,2,1),(−1,0,2))",
          "X=((1,2,2),(1,1,1),(−1,0,0))",
          "X=((0,0,0),(0,0,0),(0,0,0))",
        ],
        `Partimos de:
BA−A²=AB−X.

Despejamos X:
X=AB−BA+A².

Calculamos:
AB=((1,2,2),(1,1,1),(−1,0,0)),
BA=((1,2,2),(0,1,2),(0,0,0)),
A²=((2,1,1),(0,2,1),(−1,0,2)).

Sustituimos:

X=((1,2,2),(1,1,1),(−1,0,0))
 −((1,2,2),(0,1,2),(0,0,0))
 +((2,1,1),(0,2,1),(−1,0,2))

=((2,1,1),(1,2,0),(−2,0,2)).

Resultado: X=((2,1,1),(1,2,0),(−2,0,2)).`
      ),
    },
    "mates2-algebra-ca4c38561244": {
      "Resultado": answer(
        "SCI para todo k; si k=1: (x,y,z)=(t−1,1−2t,t)",
        [
          "SCD para todo k",
          "Incompatible para k≠1",
          "SCI solo para k=0",
        ],
        `La tercera fila de la matriz de coeficientes es la suma de las dos primeras:
(2,3,4)=(1,1,1)+(1,2,3).

En los términos independientes también se cumple:
k=0+k.

Por tanto:
rango(A)=rango(A*)=2<3
para cualquier k.

El sistema es compatible indeterminado para todo k.

Para k=1:
x+y+z=0,
x+2y+3z=1.

Restamos la primera ecuación de la segunda:
y+2z=1.

Tomamos z=t:
y=1−2t,
x=−y−z=t−1.

Resultado:
(x,y,z)=(t−1,1−2t,t), t∈ℝ.`
      ),
    },
    "mates2-algebra-8463b0c48a56": {
      "a)": answer(
        "λ=−2 o λ=1",
        ["λ=0 o λ=1", "λ=−1 o λ=2", "Solo λ=1"],
        `Calculamos el determinante:

det(A)=2(λ+2)(λ−1).

La matriz no tiene inversa cuando su determinante es cero:
2(λ+2)(λ−1)=0.

Por tanto:
λ=−2 o λ=1.

Resultado: A no es invertible para λ∈{−2,1}.`
      ),
      "b)": answer(
        "(x,y,z)=t(−5,1,1)",
        ["(x,y,z)=(0,0,0) únicamente", "(x,y,z)=t(5,1,−1)", "(x,y,z)=t(−1,1,5)"],
        `Para λ=1:

((1,2,3),
 (1,1,4),
 (0,1,−1))
(x,y,z)ᵀ=(0,0,0)ᵀ.

El sistema es:
x+2y+3z=0,
x+y+4z=0,
y−z=0.

De la tercera ecuación:
y=z.

Sustituimos en la primera:
x+5z=0
⇒ x=−5z.

La segunda queda satisfecha automáticamente. Tomamos z=t:

(x,y,z)=t(−5,1,1).

Resultado: infinitas soluciones, con t∈ℝ.`
      ),
    },
    "mates2-algebra-0fbb00b26b49": {
      "a)": answer(
        "k=2 o k=4",
        ["k=−2 o k=−4", "k=2 o k=3", "Solo k=4"],
        `Calculamos:

det(A)=3(k−2)(k−4).

La matriz no tiene inversa cuando:
det(A)=0
⇒ 3(k−2)(k−4)=0.

Por tanto:
k=2 o k=4.`
      ),
      "b)": answer(
        "A⁻¹=((-1/3,1/3,−1/3),(1,0,−2),(0,−1,4))",
        [
          "A⁻¹=((1/3,−1/3,1/3),(−1,0,2),(0,1,−4))",
          "A⁻¹=((-1/3,1/3,0),(1,0,−2),(−1,0,4))",
          "A no tiene inversa para k=3",
        ],
        `Para k=3:

A=((6,3,2),(12,4,3),(3,1,1)).

Su determinante es:
det(A)=−3≠0.

Calculamos la matriz de adjuntos y la trasponemos:
Adj(Aᵀ)=((1,−1,1),(−3,0,6),(0,3,−12)).

Usamos la fórmula del curso:
A⁻¹=Adj(Aᵀ)/det(A).

Por tanto:

A⁻¹=(1/−3)((1,−1,1),(−3,0,6),(0,3,−12))

=((-1/3,1/3,−1/3),
  (1,0,−2),
  (0,−1,4)).

Resultado: la matriz indicada.`
      ),
    },
    "mates2-analisis-07e43b1dcab1": {
      "Resultado": answer(
        "Los dos lados iguales miden 3−3√2/2 m y los otros dos lados miden 3√2/2 m",
        ["Todos los lados miden 3/2 m", "Los lados iguales miden 3−√2 m y los otros dos √2 m", "Los lados iguales miden 3√2/2 m y los otros dos 3−3√2/2 m"],
        `Sean x los dos lados iguales que forman la parte superior y sea y la longitud de cada uno de los otros dos lados.

Como los dos lados superiores forman un ángulo de 90°, la base del triángulo superior mide x√2. Por tanto, el ancho del rectángulo es x√2.

El perímetro total es 6:
2x+2y+x√2=6
⇒ y=3−x−x√2/2.

El área de la ventana es:
A(x)=x√2·y+x²/2
=3√2x−(3/2+√2)x².

Derivamos:
A'(x)=3√2−(3+2√2)x.

Igualamos a cero:
x=3√2/(3+2√2)=3−3√2/2.

Como A''(x)=−(3+2√2)<0, se obtiene un máximo.

Finalmente:
y=3−x−x√2/2=3√2/2.

Resultado: los lados superiores iguales miden 3−3√2/2 m y los otros dos lados miden 3√2/2 m.`
      ),
    },
    "mates2-analisis-11ac2b328445": {
      "Resultado": answer(
        "1/2",
        ["0", "1", "−1/2"],
        `Unificamos la diferencia:
1/ln(1+x)−1/x=[x−ln(1+x)]/[x·ln(1+x)].

Al sustituir x=0 aparece 0/0. Aplicamos L'Hôpital:

lim[1−1/(1+x)]/[ln(1+x)+x/(1+x)].

Vuelve a aparecer 0/0. Aplicamos L'Hôpital una segunda vez:

lim [1/(1+x)²]/
[1/(1+x)+1/(1+x)²].

Sustituimos x=0:
1/(1+1)=1/2.

Resultado: el límite vale 1/2.`
      ),
    },
    "mates2-analisis-4eb03bb5bb48": {
      "a)": answer(
        "Se cortan en (1,−3) y (6,12); la recta queda por encima entre x=1 y x=6",
        ["Se cortan en (−1,3) y (6,12)", "Se cortan en (1,−3) y (5,9)", "No delimitan ningún recinto cerrado"],
        `Igualamos las funciones:
x²−4x=3x−6
⇒ x²−7x+6=0
⇒ (x−1)(x−6)=0.

Así, x=1 o x=6. Las ordenadas son:
y(1)=−3, y(6)=12.

Los puntos de corte son (1,−3) y (6,12).

La parábola tiene vértice en (2,−4). En x=2, la recta vale 0 y la parábola −4; por tanto, la recta es la función superior en [1,6].

La representación muestra el recinto comprendido entre ambas curvas desde x=1 hasta x=6.`
      ),
      "b)": answer(
        "125/6 unidades cuadradas",
        ["25/6 unidades cuadradas", "125/3 unidades cuadradas", "18 unidades cuadradas"],
        `Según la representación anterior:

A=∫₁⁶[(3x−6)−(x²−4x)] dx
=∫₁⁶(−x²+7x−6) dx.

Una primitiva es:
F(x)=−x³/3+7x²/2−6x.

Aplicamos la regla de Barrow:

A=[−x³/3+7x²/2−6x]₁⁶
=18−(−17/6)
=125/6.

Resultado: 125/6 unidades cuadradas.`
      ),
    },
    "mates2-analisis-e8dc4e93192d": {
      "Resultado": answer(
        "Tangente: y=2x−1/2; normal: y=−x/2−1/2",
        ["Tangente: y=2x+1/2; normal: y=−x/2+1/2", "Tangente: y=−2x−1/2; normal: y=x/2−1/2", "Tangente: y=x−1/2; normal: y=−x−1/2"],
        `La función es f(x)=2xeˣ+(x³−2)/(x²+4).

Calculamos el punto:
f(0)=−2/4=−1/2.

Derivamos:
f'(x)=2eˣ+2xeˣ+
{3x²(x²+4)−2x(x³−2)}/(x²+4)².

Sustituimos:
f'(0)=2.

La tangente por (0,−1/2) es:
y+1/2=2x
⇒ y=2x−1/2.

Para la normal usamos m·mₙ=−1:
2mₙ=−1
⇒ mₙ=−1/2.

La normal es:
y+1/2=−x/2
⇒ y=−x/2−1/2.`
      ),
    },
    "mates2-analisis-05537b514c88": {
      "Resultado": answer(
        "Base 10√2 y altura 5√2",
        ["Base 10 y altura 10", "Base 5√2 y altura 10√2", "Base 20 y altura 0"],
        `Sea x la mitad de la base y sea y la altura.

Por pertenecer a la semicircunferencia de radio 10:
x²+y²=100
⇒ y=√(100−x²).

El área es:
A(x)=2x√(100−x²).

Maximizamos A², que tiene el mismo máximo:
A²=4x²(100−x²).

Derivamos la parte variable:
[x²(100−x²)]'=200x−4x³
=4x(50−x²).

El punto crítico interior cumple x=5√2.
Entonces y=√50=5√2.

La base completa es 2x=10√2.

Resultado: base 10√2 y altura 5√2.`
      ),
    },
    "mates2-analisis-618fcad8ca36": {
      "Resultado": answer(
        "4",
        ["2", "8", "3"],
        `I=∫ₑ^{e³}(ln x)/x dx.

Hacemos u=ln x, du=dx/x.

Los límites se transforman:
x=e ⇒ u=1,
x=e³ ⇒ u=3.

I=∫₁³u du
=[u²/2]₁³
=9/2−1/2
=4.

Resultado: I=4.`
      ),
    },
    "mates2-analisis-c6b50e490668": {
      "a)": answer(
        "Punto de inflexión: (2,−6)",
        ["(0,0)", "(1,0)", "(2,6)"],
        `f'(x)=3x²−12x+5,
f''(x)=6x−12.

f''(x)=0 ⇒ x=2.

La segunda derivada es negativa si x<2 y positiva si x>2, por lo que cambia la curvatura.

f(2)=8−24+10=−6.

Resultado: el punto de inflexión es (2,−6).`
      ),
      "b)": answer(
        "Corta al eje OX en (0,0), (1,0) y (5,0)",
        ["Corta en (−1,0), (0,0) y (5,0)", "Corta solo en (0,0)", "Corta en (0,0), (2,0) y (5,0)"],
        `Imponemos f(x)=0:
x³−6x²+5x=0
⇒ x(x²−6x+5)=0
⇒ x(x−1)(x−5)=0.

Por tanto, x=0, x=1 o x=5.

Resultado: (0,0), (1,0) y (5,0).`
      ),
      "c)": answer(
        "En (2,−6): y=−7x+8; en el origen: y=5x",
        ["En (2,−6): y=7x−20; en el origen: y=−5x", "En (2,−6): y=−7x−8; en el origen: y=5x", "En (2,−6): y=−6x+6; en el origen: y=x"],
        `La pendiente es f'(x)=3x²−12x+5.

En x=2:
f'(2)=−7.

La tangente por (2,−6) es:
y+6=−7(x−2)
⇒ y=−7x+8.

En x=0:
f'(0)=5.

La tangente por el origen es:
y=5x.

Resultado: y=−7x+8 e y=5x.`
      ),
    },
    "mates2-analisis-072978380ff5": {
      "a)": answer(
        "f es continua en a si lim x→a f(x)=f(a)",
        ["f es continua si f'(a)=0", "f es continua si los límites laterales son distintos", "f es continua si f(a)=0"],
        `Una función f es continua en x=a cuando se cumplen las tres condiciones:

1. Existe f(a).
2. Existe lim x→a f(x), es decir, coinciden los límites laterales.
3. lim x→a f(x)=f(a).

Esta es la definición de continuidad en un punto.`
      ),
      "b)": answer(
        "Es discontinua únicamente en x=3",
        ["Es continua en todo ℝ", "Es discontinua únicamente en x=1", "Es discontinua en x=0 y x=3"],
        `Cada expresión polinómica es continua en su intervalo. Solo hay que estudiar el punto de unión x=3.

Valor de la función:
f(3)=3²−4·3+3=0.

Límite por la izquierda:
lim x→3⁻(x²−4x+3)=0.

Límite por la derecha:
lim x→3⁺(2x−4)=2.

Como los límites laterales no coinciden, no existe el límite en x=3.

Resultado: f es discontinua únicamente en x=3.`
      ),
      "c)": answer(
        "Es derivable en ℝ excepto en x=3",
        ["Es derivable en todo ℝ", "No es derivable en ningún punto", "Es derivable solo si x<3"],
        `En los intervalos x<3 y x>3 la función es polinómica, por lo que es derivable.

En x=3 la función no es continua. Como toda función derivable en un punto debe ser continua en él, f no puede ser derivable en x=3.

Resultado: f es derivable en (−∞,3)∪(3,+∞).`
      ),
      "d)": answer(
        "No; ser derivable implica ser continua",
        ["Sí, siempre", "Sí, si la derivada vale cero", "Solo para funciones polinómicas"],
        `Supongamos que f es derivable en x=a. Entonces existe:

lim h→0 [f(a+h)−f(a)]/h=f'(a).

Escribimos:
f(a+h)−f(a)
=h·[f(a+h)−f(a)]/h.

Al tomar límites:
lim h→0[f(a+h)−f(a)]
=0·f'(a)=0.

Por tanto:
lim h→0 f(a+h)=f(a),
que es precisamente la continuidad en a.

Resultado: no puede existir una función derivable en un punto y discontinua en ese mismo punto.`
      ),
    },
    "mates2-analisis-8d1e5170d389": {
      "Resultado": answer(
        "a=−1, b=0, c=3, d=0",
        ["a=1, b=0, c=−3, d=0", "a=−1, b=1, c=3, d=0", "a=−5, b=0, c=15, d=0"],
        `Sea f(x)=ax³+bx²+cx+d.

El punto (0,0) es de inflexión:
f(0)=0 ⇒ d=0.

Además:
f''(x)=6ax+2b,
f''(0)=0 ⇒ b=0.

Hay un máximo relativo en x=1, luego:
f'(x)=3ax²+2bx+c,
f'(1)=3a+c=0
⇒ c=−3a.

La condición integral es:
∫₀¹f(x)dx=5/4.

Como b=d=0:
∫₀¹(ax³+cx)dx
=a/4+c/2=5/4.

Sustituimos c=−3a:
a/4−3a/2=5/4
⇒ −5a/4=5/4
⇒ a=−1.

Entonces c=3. Se comprueba:
f''(1)=−6<0,
por lo que en x=1 hay un máximo.

Resultado: a=−1, b=0, c=3, d=0.`
      ),
    },
    "mates2-analisis-9dce0ad60050": {
      "a)": answer(
        "Es continua en x=1",
        ["Tiene una discontinuidad de salto en x=1", "Tiene una discontinuidad infinita en x=1", "No está definida en x=1"],
        `Estudiamos los límites laterales y el valor de la función.

Por la izquierda:
lim x→1⁻(x−1)=0.

Por la derecha:
lim x→1⁺(x²−1)=0.

Valor en el punto:
f(1)=1−1=0.

Como:
lim x→1⁻f(x)=lim x→1⁺f(x)=f(1)=0,

la función es continua en x=1.`
      ),
      "b)": answer(
        "Tiene una discontinuidad de salto en x=2",
        ["Es continua en x=2", "Tiene una discontinuidad infinita en x=2", "No existen límites laterales finitos"],
        `Por la izquierda, se utiliza la rama x²−1:

lim x→2⁻f(x)=2²−1=3.

Además:
f(2)=3.

Por la derecha, se utiliza la rama x²:

lim x→2⁺f(x)=2²=4.

Como 3≠4, los límites laterales son distintos.

Resultado: existe una discontinuidad de salto en x=2.`
      ),
    },
    "mates2-analisis-08be07cb7771": {
      "Resultado": answer(
        "(4/9)ln|x−1|−2/[3(x−1)]+(5/9)ln|x+2|+C",
        ["ln|x³−3x+2|+C", "(4/9)ln|x−1|+2/[3(x−1)]+(5/9)ln|x+2|+C", "(1/3)ln|x−1|+(2/3)ln|x+2|+C"],
        `Factorizamos el denominador:
x³−3x+2=(x−1)²(x+2).

Descomponemos en fracciones simples:

(x²+1)/[(x−1)²(x+2)]
=A/(x−1)+B/(x−1)²+C/(x+2).

Multiplicamos por el denominador común:

x²+1=A(x−1)(x+2)+B(x+2)+C(x−1)².

Tomamos x=1:
2=3B ⇒ B=2/3.

Tomamos x=−2:
5=9C ⇒ C=5/9.

Comparando el coeficiente de x²:
1=A+C ⇒ A=4/9.

Integramos término a término:

I=(4/9)∫dx/(x−1)
+(2/3)∫dx/(x−1)²
+(5/9)∫dx/(x+2).

Por tanto:

I=(4/9)ln|x−1|
−2/[3(x−1)]
+(5/9)ln|x+2|+C.`
      ),
    },
    "mates2-analisis-88cfdaa70d39": {
      "a)": answer(
        "Crece en [0,1] y decrece en [1,2]",
        ["Decrece en [0,1] y crece en [1,2]", "Crece en todo [0,2]", "Decrece en todo [0,2]"],
        `r(t)=75t(2−t)=150t−75t².

Derivamos:
r'(t)=150−150t=150(1−t).

La derivada se anula en t=1.

Recta de signos:
en (0,1), r'(t)>0, luego r crece;
en (1,2), r'(t)<0, luego r decrece.

Resultado: crece en [0,1] y decrece en [1,2].`
      ),
      "b)": answer(
        "El máximo es 75 y se alcanza en t=1",
        ["El máximo es 150 y se alcanza en t=1", "El máximo es 75 y se alcanza en t=2", "No existe máximo"],
        `Según el estudio del signo de r', la función pasa de creciente a decreciente en t=1; por tanto, allí alcanza el máximo.

r(1)=75·1·(2−1)=75.

Resultado: el valor máximo es 75 y se obtiene en t=1.`
      ),
      "c)": answer(
        "r(t)=0 en t=0 y t=2",
        ["Solo en t=0", "Solo en t=2", "En t=1"],
        `Resolvemos:
75t(2−t)=0.

Un producto es cero cuando alguno de sus factores es cero:
t=0
o
2−t=0 ⇒ t=2.

Resultado: r(t)=0 en t=0 y t=2.`
      ),
    },
    "mates2-analisis-a685e6796d17": {
      "a)": answer(
        "20 vendedores",
        ["10 vendedores", "30 vendedores", "40 vendedores"],
        `B(x)=−9x²+360x+1875.

Es una parábola cóncava porque el coeficiente de x² es negativo.

Derivamos:
B'(x)=−18x+360.

Igualamos a cero:
−18x+360=0
⇒ x=20.

Además, B''(x)=−18<0, por lo que se trata de un máximo.

Resultado: deben emplearse 20 vendedores.`
      ),
      "b)": answer(
        "5475 miles de euros",
        ["3600 miles de euros", "1875 miles de euros", "9075 miles de euros"],
        `Sustituimos x=20 en la función de beneficios:

B(20)=−9·20²+360·20+1875
=−3600+7200+1875
=5475.

Como B está expresada en miles de euros:

Resultado: el beneficio máximo es 5475 miles de euros.`
      ),
    },
    "mates2-analisis-5ab171fce00c": {
      "a)": answer(
        "Crece en (−∞,1) y (2,+∞); decrece en (1,2)",
        ["Crece solo en (1,2)", "Decrece en (−∞,1) y (2,+∞)", "Crece en todo ℝ"],
        `f'(x)=6x²−18x+12
=6(x−1)(x−2).

Los puntos críticos son x=1 y x=2.

Estudiamos el signo:
si x<1, f'(x)>0;
si 1<x<2, f'(x)<0;
si x>2, f'(x)>0.

Resultado: f crece en (−∞,1) y (2,+∞), y decrece en (1,2).`
      ),
      "b)": answer(
        "Máximo (1,8), mínimo (2,7) e inflexión (3/2,15/2)",
        ["Máximo (2,7), mínimo (1,8) e inflexión (0,3)", "Máximo (1,7), mínimo (2,8) e inflexión (3/2,15/2)", "No tiene extremos ni inflexión"],
        `Por el cambio de signo de f':
en x=1 pasa de + a −, luego hay máximo;
en x=2 pasa de − a +, luego hay mínimo.

Calculamos las ordenadas:
f(1)=2−9+12+3=8,
f(2)=16−36+24+3=7.

Para el punto de inflexión:
f''(x)=12x−18.

f''(x)=0
⇒ x=3/2.

La segunda derivada cambia de signo en ese punto. Su ordenada es:
f(3/2)=15/2.

Resultado: máximo (1,8), mínimo (2,7) e inflexión (3/2,15/2).`
      ),
      "c)": answer(
        "Gráfica cúbica que pasa por (0,3), con máximo (1,8), inflexión (3/2,15/2) y mínimo (2,7)",
        ["Parábola con vértice (1,8)", "Recta creciente que pasa por (0,3)", "Cúbica con mínimo (1,8) y máximo (2,7)"],
        `Para representar la función usamos los datos obtenidos:

1. f(0)=3, por lo que pasa por (0,3).
2. Crece hasta el máximo (1,8).
3. Decrece desde x=1 hasta el mínimo (2,7).
4. Cambia de curvatura en (3/2,15/2).
5. A partir de x=2 vuelve a crecer.

Como el término principal es 2x³:
f(x)→−∞ cuando x→−∞,
f(x)→+∞ cuando x→+∞.

Estos datos determinan el esbozo correcto.`
      ),
    },
    "mates2-analisis-ffc97e2b713f": {
      "Resultado": answer(
        "a=4 y b=6",
        ["a=6 y b=4", "a=2 y b=6", "a=4 y b=3"],
        `Para que la función sea continua en x=0 deben coincidir el límite por la izquierda, el límite por la derecha y f(0)=6.

Por la izquierda:

lim x→0⁻[a eˣ·sin(x²)/x+b cos x].

Como sin(x²)/x=x·[sin(x²)/x²]→0:
lim x→0⁻f(x)=b.

Por la derecha:

lim x→0⁺[3a·sin x/x+b(x−1)]
=3a−b.

Imponemos:
b=6,
3a−b=6.

Sustituimos b=6:
3a−6=6
⇒ a=4.

Resultado: a=4 y b=6.`
      ),
    },
    "mates2-analisis-bb2f31f90df0": {
      "a)": answer(
        "Se cortan en (0,0) y (9,27)",
        ["Se cortan en (0,0) y (3,9)", "Se cortan solo en (0,0)", "Se cortan en (−9,−27) y (0,0)"],
        `Igualamos:
3x=x²/3.

Multiplicamos por 3:
9x=x²
⇒ x(x−9)=0.

Por tanto, x=0 o x=9.

Las ordenadas son:
y(0)=0,
y(9)=27.

Resultado: los puntos de corte son (0,0) y (9,27).`
      ),
      "b)": answer(
        "El recinto queda entre y=3x, arriba, e y=x²/3, abajo, para 0≤x≤9",
        ["La parábola queda arriba en 0≤x≤9", "No hay recinto cerrado", "El recinto está entre x=−9 y x=0"],
        `Tomamos un valor interior, por ejemplo x=3:

Recta:
y=3·3=9.

Parábola:
y=3²/3=3.

Por tanto, en [0,9] la recta queda por encima de la parábola.

La representación debe mostrar ambas curvas, los cortes (0,0) y (9,27), y la zona sombreada comprendida exclusivamente entre ellas.`
      ),
      "c)": answer(
        "81/2 unidades cuadradas",
        ["81 unidades cuadradas", "27/2 unidades cuadradas", "243/2 unidades cuadradas"],
        `A=∫₀⁹[3x−x²/3] dx.

Calculamos una primitiva:

F(x)=3x²/2−x³/9.

Aplicamos la regla de Barrow:

A=[3x²/2−x³/9]₀⁹
=243/2−81
=81/2.

Resultado: el área es 81/2 unidades cuadradas.`
      ),
    },
    "mates2-geometria-5ceb40bc726c": {
      "a)": answer(
        "r: (x,y,z)=(7,0,3)+t(−2,1,−1); s: (x,y,z)=(2,−5,0)+u(0,0,1)",
        [
          "r: (x,y,z)=(4,0,0)+t(1,1,1); s: (x,y,z)=(2,−5,0)+u(1,0,0)",
          "r: (x,y,z)=(7,0,3)+t(2,1,1); s: (x,y,z)=(2,5,0)+u(0,0,1)",
          "r: (x,y,z)=(0,7,3)+t(1,−2,−1); s: (x,y,z)=(2,−5,1)",
        ],
        `Para r tomamos y=t. De x+2y=7:
x=7−2t.

En x+y−z=4:
z=x+y−4=3−t.

Así:
r: (x,y,z)=(7−2t,t,3−t)
=(7,0,3)+t(−2,1,−1).

Para s tenemos x=2, y=−5 y z libre. Tomamos z=u:

s: (x,y,z)=(2,−5,u)
=(2,−5,0)+u(0,0,1).`
      ),
      "b)": answer(
        "R=(5,1,2) en r y S=(2,−5,2) en s",
        ["R=(7,0,3) y S=(2,−5,0)", "R=(5,1,2) y S=(2,−5,3)", "R=(3,2,1) y S=(2,−5,1)"],
        `Un punto genérico de r es:
R(t)=(7−2t,t,3−t).

Un punto genérico de s es:
S(u)=(2,−5,u).

El vector que los une es:
RS=S−R=(−5+2t,−5−t,u−3+t).

Los vectores directores son:
dᵣ=(−2,1,−1),
dₛ=(0,0,1).

Imponemos perpendicularidad:

RS·dₛ=0
⇒ u−3+t=0.

RS·dᵣ=0
⇒ −2(−5+2t)+(−5−t)−(u−3+t)=0.

Usando u−3+t=0:
10−4t−5−t=0
⇒ t=1.

Entonces u=2.

Por tanto:
R=(5,1,2),
S=(2,−5,2).

Comprobación:
RS=(−3,−6,0),
RS·dᵣ=0 y RS·dₛ=0.`
      ),
    },
    "mates2-geometria-fec65498d188": {
      "a)": answer(
        "α: x+2y−2z−9=0",
        ["α: x−2y+2z+7=0", "α: 4x+y+3z−8=0", "α: x+2y−2z+9=0"],
        `Parametrizamos r tomando y=t:

x=4t−9,
z=3t−9.

Por tanto:
r: (x,y,z)=(−9,0,−9)+t(4,1,3).

Tomamos A=(−9,0,−9)∈r y dᵣ=(4,1,3).
El plano también pasa por P=(1,4,0), de modo que:

AP=(10,4,9).

Un vector normal es:

n=dᵣ×AP
=(4,1,3)×(10,4,9)
=(−3,−6,6),

que podemos simplificar a n=(1,2,−2).

La ecuación por P es:

(x−1)+2(y−4)−2(z−0)=0.

Resultado:
α: x+2y−2z−9=0.`
      ),
      "b)": answer(
        "Sí, para todo λ",
        ["Solo para λ=0", "Solo para λ=1", "No, para ningún λ"],
        `La recta r es la intersección de los planos:

P₁: x−4y+9=0,
P₂: 3y−z−9=0.

Todo punto de r verifica simultáneamente P₁=0 y P₂=0.

Por tanto, también verifica cualquier combinación lineal:

P₁+λP₂=0.

Esta combinación es precisamente:

π: x−4y+9+λ(3y−z−9)=0.

Resultado: π contiene a r para cualquier valor real de λ.`
      ),
      "c)": answer(
        "λ=2 o λ=4",
        ["λ=−2 o λ=−4", "λ=1 o λ=3", "Solo λ=2"],
        `Escribimos el plano:

π: x+(−4+3λ)y−λz+9−9λ=0.

La distancia del origen O=(0,0,0) a π es:

d(O,π)=|9−9λ|/
√[1+(−4+3λ)²+λ²].

Imponemos d=3 y elevamos al cuadrado:

81(1−λ)²
=9[1+(−4+3λ)²+λ²].

Dividimos entre 9 y desarrollamos:

9(1−2λ+λ²)=1+(9λ²−24λ+16)+λ².

Simplificamos:

λ²−6λ+8=0
⇒ (λ−2)(λ−4)=0.

Resultado: λ=2 o λ=4.`
      ),
    },
    "mates2-geometria-34fd77e168b9": {
      "a)": answer(
        "Una recta es paralela a un plano si su vector director es perpendicular al vector normal del plano",
        ["Si ambos vectores son paralelos", "Si la recta tiene un punto en el plano necesariamente", "Si sus ecuaciones tienen los mismos coeficientes"],
        `Sea d el vector director de la recta y n el vector normal del plano.

La dirección de una recta paralela al plano debe estar contenida en una dirección del propio plano. Por ello:

d·n=0.

Si, además, un punto de la recta pertenece al plano, la recta está contenida en él; si no pertenece, son paralelos sin puntos comunes.`
      ),
      "b)": answer(
        "No son paralelos, porque (2,−1,1)·(3,−2,−6)=2≠0",
        ["Sí, porque el producto escalar vale 0", "Sí, porque los vectores son proporcionales", "La recta está contenida en el plano"],
        `El vector director de r es:
d=(2,−1,1).

El vector normal de π es:
n=(3,−2,−6).

Calculamos:

d·n=2·3+(−1)(−2)+1(−6)
=6+2−6
=2.

Como el producto escalar no es cero, la recta no es paralela al plano.`
      ),
      "c)": answer(
        "Una recta es perpendicular a un plano si su vector director es paralelo al vector normal del plano",
        ["Si el producto escalar de ambos vectores es cero", "Si la recta no corta al plano", "Si la recta está contenida en el plano"],
        `Una recta es perpendicular a un plano cuando avanza en la dirección normal al plano.

Por tanto, si d es el vector director de la recta y n el normal del plano, debe existir un número k tal que:

d=k·n.

Es decir, ambos vectores han de ser proporcionales.`
      ),
      "d)": answer(
        "No son perpendiculares, porque (2,−1,1) y (3,−2,−6) no son proporcionales",
        ["Sí son perpendiculares", "Sí, porque su producto escalar no es cero", "La recta pertenece al plano"],
        `Comparamos:

d=(2,−1,1),
n=(3,−2,−6).

Para ser proporcionales deberían coincidir las razones:

2/3, (−1)/(−2)=1/2, 1/(−6)=−1/6.

Como estas razones son distintas, los vectores no son paralelos.

Resultado: r no es perpendicular a π.`
      ),
    },
    "mates2-geometria-b68464b3aa75": {
      "a)": answer(
        "90°",
        ["60°", "45°", "30°"],
        `Los vectores normales son:

n=(1,1,1),
n'=(1,−1,0).

El ángulo de dos planos es el ángulo agudo de sus normales:

cos θ=|n·n'|/(|n|·|n'|).

Calculamos:
n·n'=1−1+0=0.

Por tanto:
cos θ=0
⇒ θ=90°.

Resultado: los planos son perpendiculares.`
      ),
      "b)": answer(
        "r: x=1+t, y=2+t, z=3+t",
        ["r: x=1+t, y=2−t, z=3", "r: x=1+2t, y=2−t, z=3", "r: x=1, y=2, z=3+t"],
        `El plano π tiene vector normal:

n=(1,1,1).

Una recta perpendicular al plano debe tener como vector director un vector paralelo a n.

Como pasa por P=(1,2,3), su forma paramétrica es:

r:
x=1+t,
y=2+t,
z=3+t,

con t∈ℝ.`
      ),
    },
    "mates2-geometria-0a06267f3daa": {
      "Resultado": answer(
        "Plano: 15x−7y+11z−30=0; P(2,1,4) no pertenece",
        ["Plano: 15x−7y+11z+30=0; P sí pertenece", "Plano: x+y+z−4=0; P no pertenece", "Plano: 4x+7y−z−9=0; P sí pertenece"],
        `La recta r tiene vector director:
dᵣ=(−1,1,2).

La recta s es intersección de los planos con normales:
n₁=(2,−1,1),
n₂=(−1,1,3).

Su vector director es:

dₛ=n₁×n₂=(−4,−7,1).

El plano buscado es paralelo a ambas rectas, por lo que un vector normal es:

n=dᵣ×dₛ
=(−1,1,2)×(−4,−7,1)
=(15,−7,11).

El plano pasa por A=(1,1,2):

15(x−1)−7(y−1)+11(z−2)=0.

Simplificamos:

15x−7y+11z−30=0.

Comprobamos P=(2,1,4):

15·2−7·1+11·4−30=37≠0.

Resultado: P no pertenece al plano.`
      ),
    },
    "mates2-geometria-2cc999840987": {
      "a)": answer(
        "I=(2,0,2)",
        ["I=(2,0,4)", "I=(0,2,2)", "I=(4,0,0)"],
        `La recta r verifica:
x+z=4,
y=0.

Para que un punto de r pertenezca también a π:
x+y=2.

Como y=0:
x=2.

Entonces:
z=4−x=2.

Resultado: el punto de intersección es I=(2,0,2).`
      ),
      "b)": answer(
        "x−y+z−4=0",
        ["x+y+z−4=0", "x−y−z+4=0", "x+y−2=0"],
        `La recta r es la intersección de:

P₁: x+z−4=0,
P₂: y=0.

El haz de planos que contiene a r es:

σ: a(x+z−4)+by=0.

Su vector normal es:
nσ=(a,b,a).

El vector normal de π: x+y−2=0 es:
nπ=(1,1,0).

Para que los planos sean perpendiculares:

nσ·nπ=0
⇒ a+b=0
⇒ b=−a.

Tomando a=1:

σ: x+z−4−y=0.

Resultado: x−y+z−4=0.`
      ),
    },
    "mates2-geometria-5c058205fb68": {
      "a)": answer(
        "a=3 y b=−23",
        ["a=−3 y b=23", "a=3 y b=23", "a=4 y b=−21"],
        `La recta tiene:

P=(3,1,−3),
d=(4,−4,1).

El plano tiene vector normal:
n=(a,2,−4).

Para que r esté contenida en π, primero su dirección debe ser paralela al plano:

n·d=0
⇒ 4a−8−4=0
⇒ a=3.

Además, P debe pertenecer al plano:

3a+2·1−4(−3)+b=0.

Sustituimos a=3:
9+2+12+b=0
⇒ b=−23.

Resultado: a=3 y b=−23.`
      ),
      "b)": answer(
        "No existen valores de a y b",
        ["a=3 y b=−23", "a=8 y b=0", "a=−2 y b=4"],
        `Para que la recta sea perpendicular al plano, su vector director debe ser paralelo al normal:

(a,2,−4)=k(4,−4,1).

De la segunda componente:
2=−4k
⇒ k=−1/2.

Pero la tercera componente exigiría:
−4=k·1=−1/2,

lo cual es imposible.

El parámetro b no modifica el vector normal del plano.

Resultado: no existen valores de a y b que hagan r perpendicular a π.`
      ),
    },
    "mates2-geometria-bcb962be3335": {
      "Resultado": answer(
        "C=1 o C=−17",
        ["C=1 o C=17", "C=−1 o C=17", "Solo C=1"],
        `Los vectores normales son:

n=(1,2,−1),
n'=(2,1,C).

El ángulo agudo entre los planos cumple:

cos 60°=|n·n'|/(|n|·|n'|).

Calculamos:
n·n'=2+2−C=4−C,
|n|=√6,
|n'|=√(5+C²).

Por tanto:

1/2=|4−C|/[√6·√(5+C²)].

Elevamos al cuadrado:

4(4−C)²=6(5+C²).

Desarrollamos:

4(C²−8C+16)=30+6C²
⇒ C²+16C−17=0
⇒ (C−1)(C+17)=0.

Resultado: C=1 o C=−17.`
      ),
    },
  });
})();

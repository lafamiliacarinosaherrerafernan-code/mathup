(() => {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};
  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};

  const answer = (correctText, distractors, solution) => ({
    options: [correctText, ...distractors],
    correct: 0,
    solution: `Resolución:\n${solution}`,
  });

  const copy = (value) => JSON.parse(JSON.stringify(value || []));
  const makePart = (label, paragraphs) => ({ label, paragraphs });
  const paragraph = (plain, html = plain) => ({ plain, html });
  const matesBlock = (block) => window.MATES_II_BLOCK_EXERCISES?.[block] || [];
  const ccssBlock = (block) => window.CCSS_II_BLOCK_EXERCISES?.[block] || [];

  // Algunos apartados a) de 2012 quedaron incluidos en el enunciado común
  // durante la importación. Se separan para que cada pregunta oficial tenga
  // sus propias cuatro opciones, puntuación y resolución.
  for (const id of [
    "mates2-algebra-4a7be021e8c8",
    "mates2-algebra-483621554b12",
    "mates2-algebra-04b7b2a213e1",
  ]) {
    const exercise = matesBlock("algebra").find((item) => item.id === id);
    if (exercise && exercise.parts?.length === 1 && exercise.parts[0].label === "b)") {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
  }

  {
    const exercise = matesBlock("algebra").find(
      (item) => item.id === "mates2-algebra-81f200bb68dc"
    );
    if (exercise && exercise.parts?.length === 1) {
      exercise.parts.unshift(
        makePart("a.1)", [
          paragraph(
            "a.1) Si |A|=3, razona cuánto vale |B|.",
            "a.1) Si <math class=\"native-math\"><mrow><mo>|</mo><mi>A</mi><mo>|</mo></mrow><mo>=</mo><mn>3</mn></math>, razona cuánto vale <math class=\"native-math\"><mrow><mo>|</mo><mi>B</mi><mo>|</mo></mrow></math>."
          ),
        ]),
        makePart("a.2)", [paragraph("a.2) ¿Cuál es el rango de B?")])
      );
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-4a7be021e8c8": {
      "a)": answer(
        "Si m=2, SCD; si m≠2, SI",
        [
          "Si m=2, SCI; si m≠2, SCD",
          "SCD para todo m∈R",
          "Si m=2, SI; si m≠2, SCI",
        ],
        `Aplicamos el teorema de Rouché-Frobenius. De las dos primeras ecuaciones:
x+y+z=0,
x+2y+3z=0.
Al restarlas obtenemos y+2z=0, luego y=−2z y, sustituyendo en la primera, x=z.

La tercera ecuación queda:
mz+(m+1)(−2z)+(m−1)z=m−2
⇒ −3z=m−2
⇒ z=(2−m)/3.

La cuarta ecuación exige:
(1−2m)z=m−2.
Sustituimos z=(2−m)/3:
(1−2m)(2−m)/3=m−2
⇒ 2(2−m)²=0
⇒ m=2.

Para m=2, rg(A)=rg(A*)=3, igual al número de incógnitas: el sistema es compatible determinado.
Para m≠2, rg(A*)>rg(A): el sistema es incompatible.`
      ),
      "b)": answer(
        "(x,y,z)=(0,0,0)",
        ["(1,−2,1)", "(2,−4,2)", "Infinitas soluciones"],
        `El sistema es compatible determinado únicamente para m=2.
Sustituimos m=2. De la reducción anterior:
z=(2−m)/3=0,
y=−2z=0,
x=z=0.
Por tanto, la solución única es (x,y,z)=(0,0,0).`
      ),
    },

    "mates2-algebra-81f200bb68dc": {
      "a.1)": answer(
        "|B|=1/3",
        ["|B|=3", "|B|=−3", "|B|=1/9"],
        `Como B=A⁻¹, se cumple A·B=I. Tomamos determinantes:
|A|·|B|=|I|=1.
Sustituimos |A|=3:
3|B|=1
⇒ |B|=1/3.`
      ),
      "a.2)": answer(
        "rg(B)=n",
        ["rg(B)=n−1", "rg(B)=1", "rg(B)=0"],
        `B es la inversa de una matriz cuadrada A de orden n, por lo que B también es invertible.
Toda matriz cuadrada invertible tiene determinante distinto de cero y rango máximo.
Por tanto, rg(B)=n.`
      ),
      "b)": answer(
        "|X|=1",
        ["|X|=21", "|X|=1/21", "|X|=−1"],
        `Llamamos M a la matriz que multiplica a X y D=diag(1,3,7). La ecuación es M·X=D.
Tomamos determinantes:
|M|·|X|=|D|.

Desarrollando |M| por la primera columna:
|M|=1·vmatrix{10&−3\\7&0}=21.
Además, por ser D diagonal:
|D|=1·3·7=21.
Por tanto:
21|X|=21
⇒ |X|=1.`
      ),
    },

    "mates2-algebra-8868a842cb11": {
      "Resultado": answer(
        "Los determinantes valen −10 y 5",
        [
          "Los determinantes valen 10 y 5",
          "Los determinantes valen −5 y 10",
          "Los dos determinantes valen 5",
        ],
        `Sea D=vmatrix{a&b&c\\d&e&f\\g&h&i}=5.

Primer determinante. Sus columnas son C₂, C₂+C₁ y 2C₃. Restamos la primera columna a la segunda:
vmatrix{C₂&C₂+C₁&2C₃}=vmatrix{C₂&C₁&2C₃}.
Extraemos el factor 2 de la tercera columna y permutamos las dos primeras:
2·vmatrix{C₂&C₁&C₃}=−2·vmatrix{C₁&C₂&C₃}=−2·5=−10.

Segundo determinante. Sus filas son F₁+F₂+F₃, F₂+F₃ y F₃.
Hacemos F₁←F₁−F₂ y después F₂←F₂−F₃. Estas operaciones no cambian el determinante y recuperamos las filas F₁,F₂,F₃.
Por tanto, el segundo determinante vale D=5.`
      ),
    },

    "mates2-algebra-483621554b12": {
      "a)": answer(
        "SCD si a≠1,−3; SCI si a=1; SI si a=−3",
        [
          "SCD para todo a",
          "SCI si a=−3; SI si a=1; SCD en los demás casos",
          "SI si a=0; SCD en los demás casos",
        ],
        `La matriz de coeficientes es
A=pmatrix{1&1&2\\a&0&−3\\2&a&−1}.
Calculamos su determinante:
|A|=2a²+4a−6=2(a−1)(a+3).

Si a≠1 y a≠−3, |A|≠0 y rg(A)=rg(A*)=3: sistema compatible determinado.

Si a=1, al reducir la matriz ampliada se obtiene rg(A)=rg(A*)=2<3: sistema compatible indeterminado.

Si a=−3, las dos primeras ecuaciones implican x+z=1, mientras que la tercera exigiría 5(x+z)=−3. Es una contradicción, luego rg(A*)>rg(A): sistema incompatible.`
      ),
      "b)": answer(
        "(x,y,z)=(1+3t,−1−5t,t), t∈R",
        [
          "(x,y,z)=(1,−1,0) únicamente",
          "(x,y,z)=(t,1−t,0), t∈R",
          "El sistema no tiene solución",
        ],
        `Para a=1 el sistema queda:
cases{x+y+2z=0\\x−3z=1\\2x+y−z=1}.
De la segunda ecuación:
x=1+3z.
Sustituimos en la primera:
y=−x−2z=−1−5z.
La tercera ecuación queda automáticamente satisfecha, por lo que z es libre.
Llamamos z=t:
(x,y,z)=(1+3t,−1−5t,t), t∈R.`
      ),
    },

    "mates2-algebra-92100b325d2a": {
      "a)": answer(
        "Aⁿ=I₃ para todo n par",
        ["Aⁿ=A para todo n par", "Aⁿ=0", "Aⁿ=−I₃ para todo n par"],
        `Multiplicamos A por sí misma:
A²=pmatrix{0&0&1\\0&1&0\\1&0&0}·pmatrix{0&0&1\\0&1&0\\1&0&0}
=pmatrix{1&0&0\\0&1&0\\0&0&1}=I₃.
Si n es par, n=2k:
Aⁿ=A²ᵏ=(A²)ᵏ=I₃ᵏ=I₃.`
      ),
      "b)": answer(
        "X=pmatrix{2/3&0&−1/3\\0&1/3&0\\−1/3&0&2/3}",
        [
          "X=I₃/3",
          "X=pmatrix{2&0&−1\\0&1&0\\−1&0&2}",
          "X=pmatrix{1/3&0&1/3\\0&2/3&0\\1/3&0&1/3}",
        ],
        `Como 20 es par, A²⁰=I₃. Además B=3I₃. La ecuación queda:
6X=3I₃−3AX.
Pasamos los términos con X al primer miembro y sacamos factor común por la derecha:
6X+3AX=3I₃
⇒ 3(2I₃+A)X=3I₃
⇒ (2I₃+A)X=I₃.
Multiplicamos por la izquierda por (2I₃+A)⁻¹:
X=(2I₃+A)⁻¹.

2I₃+A=pmatrix{2&0&1\\0&3&0\\1&0&2},
|(2I₃+A)|=9≠0.
Calculando la inversa mediante determinantes:
X=pmatrix{2/3&0&−1/3\\0&1/3&0\\−1/3&0&2/3}.`
      ),
    },

    "mates2-algebra-04b7b2a213e1": {
      "a)": answer(
        "SCD si m≠0,−3; SCI si m=−3; SI si m=0",
        [
          "SCD para todo m",
          "SCI si m=0; SI si m=−3",
          "SCD si m≠0; SI si m=0",
        ],
        `La matriz de coeficientes es
A=pmatrix{m&0&1\\0&m&1\\−m&−m&m+1}.
Su determinante es:
|A|=m²(m+3).

Si m≠0 y m≠−3, |A|≠0: sistema compatible determinado.

Si m=0, las dos primeras ecuaciones quedan z=1 y z=0. Son incompatibles, por lo que el sistema es incompatible.

Si m=−3, al reducir se obtiene rg(A)=rg(A*)=2<3: sistema compatible indeterminado.`
      ),
      "b)": answer(
        "(x,y,z)=((t−1)/3,1+t/3,t), t∈R",
        [
          "(x,y,z)=(−1/3,1,0) únicamente",
          "(x,y,z)=(t,t,−3t), t∈R",
          "No tiene solución",
        ],
        `El sistema es compatible indeterminado para m=−3. Sustituimos:
cases{−3x+z=1\\−3y+z=−3\\3x+3y−2z=2}.
Tomamos z=t como parámetro.
De la primera ecuación:
−3x=1−t ⇒ x=(t−1)/3.
De la segunda:
−3y=−3−t ⇒ y=1+t/3.
La tercera queda satisfecha con estos valores.
Por tanto:
(x,y,z)=((t−1)/3,1+t/3,t), t∈R.`
      ),
    },

    "mates2-algebra-fe482eaf78de": {
      "a)": answer(
        "A·Aᵀ=(a²+b²)I₄",
        ["A·Aᵀ=(a²−b²)I₄", "A·Aᵀ=I₄", "A·Aᵀ=0"],
        `Trasponemos A y efectuamos el producto fila por columna. Cada fila de A tiene producto escalar consigo misma a²+b².
Dos filas distintas tienen producto escalar cero; por ejemplo:
(a,0,0,−b)·(0,a,b,0)=0,
(a,0,0,−b)·(b,0,0,a)=ab−ab=0.
Por tanto:
A·Aᵀ=pmatrix{a²+b²&0&0&0\\0&a²+b²&0&0\\0&0&a²+b²&0\\0&0&0&a²+b²}
=(a²+b²)I₄.`
      ),
      "b)": answer(
        "A⁻¹=Aᵀ/(a²+b²), que siempre existe",
        [
          "A no tiene inversa",
          "A⁻¹=Aᵀ/(a²−b²)",
          "A⁻¹=A/(a²+b²)",
        ],
        `Del apartado anterior:
A·Aᵀ=(a²+b²)I₄.
Como a≠0 y b≠0, se cumple a²+b²>0. Dividimos por a²+b²:
A·[Aᵀ/(a²+b²)]=I₄.
Por definición de matriz inversa:
A⁻¹=Aᵀ/(a²+b²).
Por tanto, A es invertible para todos los valores permitidos de a y b.`
      ),
    },

    "mates2-algebra-37d8fd5fa0be": {
      "a)": answer(
        "cases{4x+6y+2z=15,40\\5x+4y+3z=14,40\\3x+8y+z=18}",
        [
          "cases{4x+5y+3z=15,40\\6x+4y+8z=14,40\\2x+3y+z=18}",
          "cases{x+y+z=15,40\\x+y+z=14,40\\x+y+z=18}",
          "cases{4x+6y+2z=18\\5x+4y+3z=15,40\\3x+8y+z=14,40}",
        ],
        `Sean x, y, z los precios, en euros, de un café, un refresco y una infusión.
Traducimos cada sábado:
4x+6y+2z=15,40,
5x+4y+3z=14,40,
3x+8y+z=18.
Ese es el sistema que recoge todos los datos del enunciado.`
      ),
      "b)": answer(
        "La cuenta correcta sería 16,40 €, no 18 €",
        [
          "La cuenta correcta es 18 €",
          "La cuenta correcta sería 15,40 €",
          "No puede comprobarse con los datos",
        ],
        `Observamos que el vector de consumiciones de hoy es combinación lineal de los dos anteriores:
(3,8,1)=2(4,6,2)−(5,4,3).
Por linealidad, el importe correcto debe cumplir la misma combinación:
2·15,40−14,40=30,80−14,40=16,40 €.
El camarero ha pedido 18 €, que no coincide con 16,40 €. Por tanto, hay un error de 1,60 € en la cuenta de este sábado.`
      ),
    },
  });

  // En las propuestas de Análisis de 2012 se importaron dos ejercicios
  // oficiales dentro de una sola ficha. Los separamos conservando literalmente
  // los párrafos y la notación matemática de origen.
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-ed0e90be2ccc"
    );
    if (exercise) {
      exercise.parts = [
        makePart("1º)", copy(exercise.statement.slice(0, 1))),
        makePart("2º.a)", copy(exercise.statement.slice(1, 2))),
        makePart("2º.b)", copy(exercise.parts[0]?.paragraphs)),
      ];
    }
  }
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-e2a3ad2d6f98"
    );
    if (exercise) {
      const old = copy(exercise.parts);
      exercise.parts = [
        makePart("1º.a)", old[0]?.paragraphs || []),
        makePart("1º.b)", copy(old[1]?.paragraphs?.slice(0, 1))),
        makePart("2º)", copy(old[1]?.paragraphs?.slice(1, 2))),
      ];
    }
  }
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-59975a154d9c"
    );
    if (exercise) {
      const old = copy(exercise.parts);
      exercise.parts = [
        makePart("1º.a)", copy(exercise.statement)),
        makePart("1º.b)", old[0]?.paragraphs || []),
        makePart("1º.c)", copy(old[1]?.paragraphs?.slice(0, 1))),
        makePart("2º)", copy(old[1]?.paragraphs?.slice(1, 2))),
      ];
    }
  }
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-c543e1c0746b"
    );
    if (exercise) {
      exercise.parts = [
        makePart("1º)", copy(exercise.statement.slice(0, 3))),
        makePart("2º)", copy(exercise.statement.slice(3, 4))),
      ];
    }
  }
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-324cf90e6987"
    );
    if (exercise) {
      const old = copy(exercise.parts[0]?.paragraphs);
      exercise.parts = [
        makePart("1A.a)", copy(exercise.statement)),
        makePart("1A.b)", copy(old.slice(0, 1))),
        makePart("2A)", copy(old.slice(1, 2))),
      ];
    }
  }
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-208bccad2b5d"
    );
    if (exercise) {
      exercise.parts = [
        makePart("1B", copy(exercise.statement.slice(0, 1))),
        makePart("2B.a)", copy(exercise.statement.slice(1, 2))),
        makePart("2B.b)", copy(exercise.parts[0]?.paragraphs)),
      ];
    }
  }
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-7ed30ecb492b"
    );
    if (exercise) {
      const old = copy(exercise.parts[0]?.paragraphs);
      exercise.parts = [
        makePart("1A.a)", copy(exercise.statement)),
        makePart("1A.b)", copy(old.slice(0, 1))),
        makePart("2A)", copy(old.slice(1, 2))),
      ];
    }
  }
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-c80e286c16c6"
    );
    if (exercise) {
      exercise.parts = [
        makePart("1B", copy(exercise.statement.slice(0, 2))),
        makePart("2B.a)", copy(exercise.statement.slice(2, 3))),
        makePart("2B.b)", copy(exercise.parts[0]?.paragraphs)),
      ];
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-analisis-ed0e90be2ccc": {
      "1º)": answer(
        "a=−3, b=−12, c=16",
        ["a=3, b=0, c=1", "a=−3, b=12, c=−8", "a=1, b=−3, c=2"],
        `La función es f(x)=x³+ax²+bx+c.
Derivamos:
f'(x)=3x²+2ax+b,
f''(x)=6x+2a.

La pendiente de la tangente en x=−1 es −3:
f'(−1)=−3
⇒ 3−2a+b=−3
⇒ −2a+b=−6.

Como (1,2) es punto de inflexión:
f''(1)=0 ⇒ 6+2a=0 ⇒ a=−3.
Sustituimos en −2a+b=−6:
6+b=−6 ⇒ b=−12.

Además, el punto (1,2) pertenece a la gráfica:
f(1)=2
⇒ 1−3−12+c=2
⇒ c=16.
Por tanto, a=−3, b=−12 y c=16.`
      ),
      "2º.a)": answer(
        "Los cortes son (−3,8) y (2,3); la recta queda por encima",
        [
          "Los cortes son (−2,7) y (3,2)",
          "Solo se cortan en (1,4)",
          "La parábola queda por encima entre los cortes",
        ],
        `Igualamos las dos funciones:
x²−1=5−x
⇒ x²+x−6=0
⇒ (x+3)(x−2)=0.
Los puntos de corte tienen abscisas x=−3 y x=2:
f(−3)=8 y f(2)=3.
Son (−3,8) y (2,3).

Probamos x=0, situado entre ambos cortes:
g(0)=5 y f(0)=−1, luego la recta y=5−x queda por encima de la parábola y=x²−1. La región es la comprendida entre ambas desde x=−3 hasta x=2.`
      ),
      "2º.b)": answer(
        "A=125/6 unidades cuadradas",
        ["A=25/6", "A=125/3", "A=20"],
        `Según la representación, la función superior es g(x)=5−x y la inferior f(x)=x²−1, entre x=−3 y x=2:
A=integral_{−3}^{2}[(5−x)−(x²−1)]dx
=integral_{−3}^{2}(6−x−x²)dx.

Aplicamos la regla de Barrow:
A=[6x−x²/2−x³/3]_{−3}^{2}
=22/3−(−27/2)
=44/6+81/6
=125/6.
El área es 125/6 unidades cuadradas.`
      ),
    },

    "mates2-analisis-e2a3ad2d6f98": {
      "1º.a)": answer(
        "Crece para t≥0 y su mínimo es N(0)=20 %",
        [
          "Decrece y su mínimo es 0 %",
          "Crece y su mínimo es 60 %",
          "Es constante e igual a 20 %",
        ],
        `N(t)=60/(1+2e^(−t)). Derivamos con la regla de la cadena:
N'(t)=120e^(−t)/(1+2e^(−t))².
Para todo t≥0, e^(−t)>0 y el denominador es positivo; por tanto, N'(t)>0 y N es estrictamente creciente.

Al ser creciente en [0,+∞), su mínimo se alcanza en el extremo t=0:
N(0)=60/(1+2)=20.
La concentración mínima es del 20 % y se obtiene en t=0 segundos.`
      ),
      "1º.b)": answer(
        "Tiende al 60 %",
        ["Tiende al 20 %", "Tiende a 0 %", "Crece sin límite"],
        `Calculamos:
lim_{t→+∞} 60/(1+2e^(−t)).
Como e^(−t)→0:
lim_{t→+∞}N(t)=60/(1+0)=60.
La concentración se aproxima al 60 %.`
      ),
      "2º)": answer(
        "I₁=(1/6) arctan(3x/2)+C; I₂=ln|tan x|+C",
        [
          "I₁=arctan(3x/2)+C; I₂=tan x+C",
          "I₁=(1/3)ln|4+9x²|+C; I₂=x+C",
          "I₁=(1/6)arctan(2x/3)+C; I₂=ln|sin x+cos x|+C",
        ],
        `Primera integral:
I₁=integral dx/(4+9x²)
=1/4 integral dx/[1+(3x/2)²].
Tomamos u=3x/2, du=3dx/2:
I₁=1/6 arctan(u)+C
=1/6 arctan(3x/2)+C.

Segunda integral:
I₂=integral(tan x+1/tan x)dx
=integral tan x dx+integral cot x dx
=−ln|cos x|+ln|sin x|+C
=ln|tan x|+C.`
      ),
    },

    "mates2-analisis-59975a154d9c": {
      "1º.a)": answer(
        "Bolzano garantiza una raíz por cambio de signo; Rolle, un punto con f'(c)=0 entre extremos de igual valor",
        [
          "Bolzano y Rolle solo se aplican a funciones discontinuas",
          "Rolle garantiza siempre una raíz de f",
          "Bolzano afirma que f'(c)=0",
        ],
        `Teorema de Bolzano: si f es continua en [a,b] y f(a)·f(b)<0, existe al menos un c∈(a,b) tal que f(c)=0.

Teorema de Rolle: si f es continua en [a,b], derivable en (a,b) y f(a)=f(b), existe al menos un c∈(a,b) tal que f'(c)=0.

Geométricamente, Rolle asegura una tangente horizontal entre dos puntos de la gráfica con la misma ordenada.`
      ),
      "1º.b)": answer(
        "Hay raíces en (−2,−1), (0,1) y (1,2)",
        [
          "Solo hay una raíz en (0,1)",
          "Hay raíces en (−1,0), (2,3) y (3,4)",
          "Bolzano no puede aplicarse",
        ],
        `Sea f(x)=x⁵−5x+3, continua en R por ser un polinomio.
Calculamos:
f(−2)=−19 y f(−1)=7 ⇒ f(−2)·f(−1)<0;
f(0)=3 y f(1)=−1 ⇒ f(0)·f(1)<0;
f(1)=−1 y f(2)=25 ⇒ f(1)·f(2)<0.

Por el teorema de Bolzano existe al menos una raíz en cada uno de los intervalos disjuntos:
(−2,−1), (0,1) y (1,2).
Por tanto, existen al menos tres raíces reales distintas.`
      ),
      "1º.c)": answer(
        "No puede tener más de tres raíces reales distintas",
        [
          "Puede tener cinco raíces reales distintas",
          "Tiene exactamente una raíz",
          "Rolle no permite obtener ninguna conclusión",
        ],
        `Derivamos:
f'(x)=5x⁴−5=5(x⁴−1)=5(x−1)(x+1)(x²+1).
Como x²+1>0, f' solo tiene dos raíces reales: x=−1 y x=1.

Si f tuviera cuatro raíces reales distintas r₁<r₂<r₃<r₄, por Rolle existiría al menos una raíz de f' en cada intervalo:
(r₁,r₂), (r₂,r₃) y (r₃,r₄).
Eso obligaría a f' a tener al menos tres raíces reales distintas, contradiciendo que solo tiene dos.
Luego f no puede tener más de tres raíces reales distintas. Junto con el apartado anterior, tiene exactamente tres.`
      ),
      "2º)": answer(
        "I₁=sen³x/3+C; I₂=2e^(√x)+C",
        [
          "I₁=sen²x/2+C; I₂=e^(√x)+C",
          "I₁=−cos³x/3+C; I₂=2√x·e^x+C",
          "I₁=cos³x/3+C; I₂=ln x+C",
        ],
        `Para I₁=integral sen²x·cos x dx, tomamos u=sen x, du=cos x dx:
I₁=integral u²du=u³/3+C=sen³x/3+C.

Para I₂=integral e^(√x)/√x dx, tomamos u=√x. Entonces x=u² y dx=2u du:
I₂=integral [e^u/u]·2u du
=2integral e^u du
=2e^u+C
=2e^(√x)+C.`
      ),
    },

    "mates2-analisis-c543e1c0746b": {
      "1º)": answer(
        "a=4 y b=0",
        ["a=2 y b=0", "a=4 y b=6", "a=−4 y b=0"],
        `f(x)=(ax²+b)/(2x+6).
La pendiente de la asíntota oblicua es el cociente de los coeficientes principales:
m=a/2.
Como la pendiente vale 2:
a/2=2 ⇒ a=4.

Derivamos:
f'(x)=[2ax(2x+6)−2(ax²+b)]/(2x+6)².
Para que haya un extremo relativo en x=0 debe cumplirse f'(0)=0:
f'(0)=−2b/36=0 ⇒ b=0.

Con a=4 y b=0, el signo de f' pasa de negativo a positivo en x=0, por lo que se trata de un mínimo.`
      ),
      "2º)": answer(
        "A=1/2 unidad cuadrada",
        ["A=1/4", "A=1", "A=2"],
        `Los puntos de corte se obtienen de:
x³−3x²+2x+1=1
⇒ x(x−1)(x−2)=0.
Por tanto, x=0,1,2.

En [0,1], la cúbica queda por encima de y=1; en [1,2], queda por debajo. La representación muestra dos recintos:
A=integral_0^1(x³−3x²+2x)dx
+integral_1^2(−x³+3x²−2x)dx.

Una primitiva del primer integrando es F(x)=x⁴/4−x³+x².
F(1)−F(0)=1/4 y F(1)−F(2)=1/4.
Luego A=1/4+1/4=1/2 unidad cuadrada.`
      ),
    },

    "mates2-analisis-324cf90e6987": {
      "1A.a)": answer(
        "Existe c∈(a,b) con f'(c)=[f(b)−f(a)]/(b−a)",
        [
          "Existe c con f(c)=0",
          "Existe c con f''(c)=0",
          "La función debe ser discontinua",
        ],
        `Teorema del valor medio de Lagrange: si f es continua en [a,b] y derivable en (a,b), existe al menos un c∈(a,b) tal que
f'(c)=(f(b)−f(a))/(b−a).

Interpretación geométrica: existe un punto de la gráfica en el que la recta tangente es paralela a la cuerda que une (a,f(a)) y (b,f(b)).`
      ),
      "1A.b)": answer(
        "El punto es (1,6)",
        ["(0,1)", "(2,17)", "(1,8)"],
        `f(x)=3x²+2x+1 es continua en [0,2] y derivable en (0,2).
La pendiente de la cuerda es:
m=[f(2)−f(0)]/(2−0)
=(17−1)/2=8.
Buscamos f'(c)=8:
f'(x)=6x+2,
6c+2=8 ⇒ c=1.
La ordenada es f(1)=3+2+1=6.
El punto pedido es (1,6).`
      ),
      "2A)": answer(
        "ln|(x+1)/x|−2/x+C",
        [
          "ln|x(x+1)|+2/x+C",
          "ln|(x+1)/x|+2/x+C",
          "1/(x²+x)+C",
        ],
        `Factorizamos el denominador:
x³+x²=x²(x+1).
Descomponemos en fracciones simples:
(x+2)/[x²(x+1)]=A/x+B/x²+C/(x+1).
Multiplicamos por x²(x+1):
x+2=A x(x+1)+B(x+1)+C x².

Para x=0: 2=B.
Comparando coeficientes:
A+B=1 ⇒ A=−1,
A+C=0 ⇒ C=1.

Integramos término a término:
integral(−1/x+2/x²+1/(x+1))dx
=−ln|x|−2/x+ln|x+1|+C
=ln|(x+1)/x|−2/x+C.`
      ),
    },

    "mates2-analisis-208bccad2b5d": {
      "1B": answer(
        "a=2, b=0 y (1,1) es un máximo relativo",
        [
          "a=0, b=2 y es un mínimo",
          "a=1, b=1 y no es extremo",
          "a=−2, b=0 y es un mínimo",
        ],
        `Como (1,1) pertenece a la gráfica:
f(1)=1 ⇒ (a+b)/2=1 ⇒ a+b=2.

Derivamos:
f'(x)=[a(x²+1)−2x(ax+b)]/(x²+1)².
Como x=1 es crítico:
f'(1)=0 ⇒ [2a−2(a+b)]/4=0 ⇒ b=0.
Entonces a=2.

Con esos valores:
f'(x)=2(1−x²)/(x²+1)².
En la recta de signos, f'(x)>0 para −1<x<1 y f'(x)<0 para x>1. Al pasar por x=1 el signo cambia de + a −:
↗  +  |x=1|  −  ↘
Por tanto, (1,1) es un máximo relativo.`
      ),
      "2B.a)": answer(
        "La región está sobre OX, bajo x² en [0,1] y bajo (x−2)² en [1,2]",
        [
          "La región está entre x=−1 y x=1",
          "Las parábolas no encierran región con OX",
          "La región está por encima de ambas parábolas",
        ],
        `Las parábolas son f(x)=x² y g(x)=(x−2)².
Sus cortes con OX son:
f(x)=0 ⇒ x=0,
g(x)=0 ⇒ x=2.
Se cortan entre sí cuando:
x²=(x−2)² ⇒ x=1, y=1.

La región cerrada queda limitada por OX desde x=0 hasta x=2; por f(x)=x² entre 0 y 1; y por g(x)=(x−2)² entre 1 y 2.`
      ),
      "2B.b)": answer(
        "A=2/3 unidades cuadradas",
        ["A=1/3", "A=4/3", "A=2"],
        `De la gráfica:
A=integral_0^1 x²dx+integral_1^2(x−2)²dx.
Los dos recintos son simétricos:
A=2integral_0^1 x²dx
=2[x³/3]_0^1
=2/3.
El área es 2/3 unidades cuadradas.`
      ),
    },

    "mates2-analisis-7ed30ecb492b": {
      "1A.a)": answer(
        "f'(a) es la pendiente de la recta tangente a y=f(x) en (a,f(a))",
        [
          "f'(a) es siempre la ordenada del punto",
          "f'(a) es el área bajo la curva",
          "f'(a) es la pendiente de una recta vertical",
        ],
        `La derivada de f en a es:
f'(a)=lim_{h→0}[f(a+h)−f(a)]/h.
Geométricamente, es el límite de las pendientes de las rectas secantes cuando el segundo punto se aproxima a (a,f(a)). Por tanto, f'(a) es la pendiente de la recta tangente a la gráfica en ese punto.
La tangente se escribe:
y−f(a)=f'(a)(x−a).`
      ),
      "1A.b)": answer(
        "Pendiente mínima en (3,118) y máxima en (1,42)",
        [
          "Mínima en (1,42) y máxima en (3,118)",
          "Mínima en (0,1) y máxima en (2,93)",
          "No existen extremos de la pendiente",
        ],
        `La pendiente de la tangente es f'(x):
f'(x)=4x³−24x²+36x+30.
Buscamos los extremos relativos de f', por lo que derivamos de nuevo:
f''(x)=12x²−48x+36=12(x−1)(x−3).
Los candidatos son x=1 y x=3.

Estudiamos el signo de f'':
f''>0 en (−∞,1), f''<0 en (1,3) y f''>0 en (3,+∞).
Así, f' pasa de crecer a decrecer en x=1: pendiente máxima relativa.
En x=3 pasa de decrecer a crecer: pendiente mínima relativa.

Calculamos las ordenadas:
f(1)=42,
f(3)=118.
La pendiente es mínima en (3,118) y máxima en (1,42).`
      ),
      "2A)": answer(
        "F(x)=e^x(x²−2x+3)+2",
        [
          "F(x)=e^x(x²+1)+4",
          "F(x)=e^x(x²−2x+3)",
          "F(x)=e^x(x²+2x−1)+2",
        ],
        `Buscamos una primitiva de (x²+1)e^x. Por integración por partes repetida:
integral(x²+1)e^x dx=e^x(x²−2x+3)+C.

Imponemos F(0)=5:
F(0)=1·3+C=5
⇒ C=2.
Por tanto:
F(x)=e^x(x²−2x+3)+2.`
      ),
    },

    "mates2-analisis-c80e286c16c6": {
      "1B": answer(
        "a=1/2",
        ["a=1", "a=2", "a=1/4"],
        `Primer límite. Estudiamos el exponente:
L=lim_{x→0}[√(1−x)−√(1+x)]/x.
Es una indeterminación 0/0; aplicamos L'Hôpital:
L=lim_{x→0}[−1/(2√(1−x))−1/(2√(1+x))]=−1.
Por tanto, el primer límite vale e^(−1).

Segundo límite, de tipo 1^∞:
lim_{x→0}(cos 2x)^(a/x²)
=exp(lim_{x→0}[a ln(cos 2x)/x²]).
Aplicando L'Hôpital dos veces, el exponente vale −2a; luego el límite es e^(−2a).

Igualamos:
e^(−1)=e^(−2a)
⇒ −1=−2a
⇒ a=1/2.`
      ),
      "2B.a)": answer(
        "Los cortes son (1,4) y (7,16), y la recta queda por encima",
        [
          "Los cortes son (−1,0) y (3,8)",
          "Solo se cortan en (4,10)",
          "La parábola queda por encima entre x=1 y x=7",
        ],
        `Igualamos:
x²−6x+9=2x+2
⇒ x²−8x+7=0
⇒ (x−1)(x−7)=0.
Los cortes son:
x=1 ⇒ y=4,
x=7 ⇒ y=16.

Probamos x=4:
g(4)=10 y f(4)=1, de modo que la recta queda por encima de la parábola entre x=1 y x=7. Esa es la región que debe sombrearse.`
      ),
      "2B.b)": answer(
        "A=36 unidades cuadradas",
        ["A=18", "A=24", "A=72"],
        `Según la gráfica:
A=integral_1^7[(2x+2)−(x²−6x+9)]dx
=integral_1^7(−x²+8x−7)dx.

Aplicamos Barrow:
A=[−x³/3+4x²−7x]_1^7
=98/3−(−10/3)
=108/3
=36.
El área es 36 unidades cuadradas.`
      ),
    },
  });

  // Geometría de Matemáticas II, 2012. En la propuesta A de junio, el
  // apartado a) quedó importado dentro del enunciado común; se registra
  // también como apartado evaluable independiente.
  {
    const exercise = matesBlock("geometria").find(
      (item) => item.id === "mates2-geometria-48c141215833"
    );
    if (exercise && exercise.parts?.length === 1 && exercise.parts[0].label === "b)") {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-geometria-48c141215833": {
      "a)": answer(
        "Área=3√11/2 unidades cuadradas",
        [
          "Área=3√11 unidades cuadradas",
          "Área=√11/2 unidades cuadradas",
          "Área=9√11/2 unidades cuadradas",
        ],
        `Hallamos los cortes del plano π:x−y+3z=−3 con los ejes.

Eje OX: y=z=0 ⇒ x=−3. Por tanto, A=(−3,0,0).
Eje OY: x=z=0 ⇒ −y=−3 ⇒ y=3. Por tanto, B=(0,3,0).
Eje OZ: x=y=0 ⇒ 3z=−3 ⇒ z=−1. Por tanto, C=(0,0,−1).

Construimos dos vectores con origen en A:
AB=(3,3,0),  AC=(3,0,−1).

El área del triángulo es la mitad del módulo del producto vectorial:
AB×AC=(−3,3,−9),
|AB×AC|=√(9+9+81)=√99=3√11.

Por tanto:
Área=|AB×AC|/2=3√11/2 unidades cuadradas.

Comprobación: los tres puntos satisfacen x−y+3z=−3.`
      ),
      "b)": answer(
        "λ=−1/2",
        ["λ=1/2", "λ=−1", "λ=1"],
        `El volumen del tetraedro es:
V=(1/3)·Área(ABC)·d(D,π).

Como el área de ABC es constante, el volumen será mínimo cuando sea mínima la distancia de
D=(−λ²,2+λ,−3)
al plano π:x−y+3z+3=0.

Aplicamos la fórmula de la distancia:
d(D,π)=|−λ²−(2+λ)+3(−3)+3|/√(1²+(−1)²+3²)
=|−λ²−λ−8|/√11.

El polinomio λ²+λ+8 es siempre positivo, pues su discriminante es:
Δ=1−32=−31<0.
Así:
d(D,π)=(λ²+λ+8)/√11.

Completamos el cuadrado:
λ²+λ+8=(λ+1/2)²+31/4.
Esta expresión alcanza su mínimo cuando:
λ+1/2=0 ⇒ λ=−1/2.

Por tanto, el tetraedro tiene volumen mínimo para λ=−1/2.`
      ),
    },

    "mates2-geometria-86e6090cfd22": {
      "a)": answer(
        "a=−3/2",
        ["a=3/2", "a=−1/2", "a=−3"],
        `El vector normal del plano π:2x−z=6 es:
n⃗π=(2,0,−1).

La recta r es la intersección de:
y+z=0,
x−y+az=4.
Sus vectores normales son n⃗₁=(0,1,1) y n⃗₂=(1,−1,a). Un vector director de r es:
v⃗r=n⃗₁×n⃗₂=(a+1,1,−1).

Para que la recta sea paralela al plano, su vector director debe ser perpendicular al vector normal:
v⃗r·n⃗π=0.

Sustituimos:
(a+1,1,−1)·(2,0,−1)=2(a+1)+1=0
⇒ 2a+3=0
⇒ a=−3/2.

Comprobación: para a=−3/2, v⃗r=(−1/2,1,−1) y v⃗r·n⃗π=0.`
      ),
      "b)": answer(
        "π′:2x+5y+4z−8=0",
        [
          "π′:2x−5y+4z−8=0",
          "π′:x+2y−2z−4=0",
          "π′:2x+5y−4z−8=0",
        ],
        `Para a=−3/2, tomamos como vector director de r:
v⃗r=(−1,2,−2).

Un punto de r se obtiene tomando y=0. Entonces z=0 y x=4:
P=(4,0,0).

El plano π′ contiene a r, luego su vector normal n⃗′ debe ser perpendicular a v⃗r. Además, π′ es perpendicular a π, por lo que n⃗′ también debe ser perpendicular a n⃗π=(2,0,−1).

Podemos tomar:
n⃗′=v⃗r×n⃗π=(−2,−5,−4),
equivalente a n⃗′=(2,5,4).

Usamos la ecuación punto-normal:
2(x−4)+5(y−0)+4(z−0)=0.

Desarrollamos:
π′:2x+5y+4z−8=0.

Comprobación: P pertenece a π′, v⃗r·n⃗′=0 y n⃗π·n⃗′=0.`
      ),
    },

    "mates2-geometria-a62c9ef41cbd": {
      "a)": answer(
        "Q=(2,1,2)",
        ["Q=(0,−1,−2)", "Q=(3,2,4)", "Q=(1,1,2)"],
        `El punto del plano que minimiza la distancia a P es el pie de la perpendicular.

El vector normal del plano π:x+y+2z=7 es:
n⃗=(1,1,2).

La recta perpendicular a π que pasa por P=(1,0,0) tiene forma paramétrica:
x=1+t,
y=t,
z=2t.

Sustituimos en el plano:
(1+t)+t+2(2t)=7
⇒ 1+6t=7
⇒ t=1.

Por tanto:
Q=(1+1,1,2)=(2,1,2).

Comprobación:
2+1+2·2=7, luego Q∈π, y PQ⃗=(1,1,2) es paralelo a n⃗.`
      ),
      "b)": answer(
        "P′=(3,2,4)",
        ["P′=(2,1,2)", "P′=(−1,−2,−4)", "P′=(1,2,4)"],
        `El punto Q=(2,1,2) es el punto medio del segmento PP′.
Sea P′=(x,y,z). Aplicamos la fórmula del punto medio coordenada a coordenada:

(1+x)/2=2 ⇒ 1+x=4 ⇒ x=3,
(0+y)/2=1 ⇒ y=2,
(0+z)/2=2 ⇒ z=4.

Así:
P′=(3,2,4).

Comprobación:
el punto medio de P=(1,0,0) y P′=(3,2,4) es Q=(2,1,2), que pertenece a π. Además, PP′⃗=(2,2,4)=2n⃗, luego PP′ es perpendicular al plano.`
      ),
    },

    "mates2-geometria-7797da3125f6": {
      "a)": answer(
        "s:(x,y,z)=(1,0,0)+μ(−7,14,−5)",
        [
          "s:(x,y,z)=(1,0,0)+μ(2,1,0)",
          "s:(x,y,z)=(0,3,−1)+μ(−7,14,−5)",
          "s:(x,y,z)=(1,0,0)+μ(7,14,5)",
        ],
        `La recta r tiene forma:
R(λ)=(2λ,3+λ,−1)
y vector director v⃗r=(2,1,0).

Sea Q=R(λ) el punto en el que la perpendicular desde P=(1,0,0) corta a r. Debe cumplirse:
PQ⃗·v⃗r=0.

Tenemos:
PQ⃗=Q−P=(2λ−1,3+λ,−1).
Por tanto:
(2λ−1,3+λ,−1)·(2,1,0)=0
⇒ 4λ−2+3+λ=0
⇒ 5λ+1=0
⇒ λ=−1/5.

El pie es:
Q=(−2/5,14/5,−1).
Un vector director de s es:
PQ⃗=Q−P=(−7/5,14/5,−1),
que podemos multiplicar por 5:
v⃗s=(−7,14,−5).

Así:
s:(x,y,z)=(1,0,0)+μ(−7,14,−5).

Comprobación: v⃗s·v⃗r=−14+14=0.`
      ),
      "b)": answer(
        "d(P,r)=3√30/5",
        ["d(P,r)=√30/5", "d(P,r)=3√5/5", "d(P,r)=√270"],
        `La distancia de P a r es la longitud del segmento perpendicular PQ.

P=(1,0,0),  Q=(−2/5,14/5,−1).
Por tanto:
PQ⃗=Q−P=(−7/5,14/5,−1).

d(P,r)=|PQ⃗|
=√[(−7/5)²+(14/5)²+(−1)²]
=√(49/25+196/25+25/25)
=√(270/25)
=√270/5
=3√30/5.

La distancia es d(P,r)=3√30/5.`
      ),
    },

    "mates2-geometria-fa987b57db53": {
      "a)": answer(
        "a=1 y el punto de corte es (−1,0,1)",
        [
          "a=−1 y el punto de corte es (1,0,−1)",
          "a=1 y el punto de corte es (0,−1,1)",
          "a=0 y el punto de corte es (−1,1,0)",
        ],
        `Parametrizamos r tomando:
(x+1)/2=y=(z−1)/3=t.
Entonces:
r:(x,y,z)=(−1+2t,t,1+3t).

La recta s es:
s:(x,y,z)=(λ,a+λ,−λ).

Para que se corten, igualamos coordenadas:
−1+2t=λ,
t=a+λ,
1+3t=−λ.

De la primera, λ=−1+2t. Sustituimos en la tercera:
1+3t=−(−1+2t)=1−2t
⇒ 5t=0
⇒ t=0.

Entonces λ=−1. En la segunda:
0=a−1 ⇒ a=1.

El punto de corte es:
r(0)=(−1,0,1).

Comprobación: s(−1)=(−1,1−1,1)=(−1,0,1).`
      ),
      "b)": answer(
        "π:−4x+5y+z−5=0",
        [
          "π:4x+5y+z+5=0",
          "π:−4x−5y+z−5=0",
          "π:2x+y+3z−1=0",
        ],
        `Para a=1, las rectas se cortan en P=(−1,0,1).

Sus vectores directores son:
u⃗r=(2,1,3),
u⃗s=(1,1,−1).

El vector normal del plano que contiene ambas rectas es:
n⃗=u⃗r×u⃗s=(−4,5,1).

Usamos la ecuación punto-normal:
−4(x+1)+5(y−0)+(z−1)=0.

Desarrollamos:
π:−4x+5y+z−5=0.

Comprobación: P pertenece al plano y n⃗ es perpendicular a los dos vectores directores.`
      ),
    },

    "mates2-geometria-2edbeaff5b7b": {
      "a)": answer(
        "La recta r es paralela al plano π y no está contenida en él",
        [
          "La recta r corta al plano π en un punto",
          "La recta r está contenida en el plano π",
          "La recta r es perpendicular al plano π",
        ],
        `El plano π:y−z=3 tiene vector normal:
n⃗π=(0,1,−1).

La recta r tiene vector director:
v⃗r=(2,1,1).

Calculamos:
v⃗r·n⃗π=(2,1,1)·(0,1,−1)=1−1=0.
Por tanto, r es paralela a π o está contenida en él.

Tomamos el punto de r correspondiente a λ=0:
P=(0,1,−1).
Sustituimos en el plano:
y−z=1−(−1)=2≠3.

Por tanto, r es paralela a π y no está contenida en él.`
      ),
      "b)": answer(
        "s:(x,y,z)=(0,1,−1)+μ(−1,1,1)",
        [
          "s:(x,y,z)=(0,1,−1)+μ(2,1,1)",
          "s:(x,y,z)=(0,1,−1)+μ(1,1,−1)",
          "s:(x,y,z)=(0,1,−1)+μ(−1,1,−1)",
        ],
        `La recta s debe pasar por P=(0,1,−1), ser paralela al plano π y perpendicular a r.

Sea w⃗=(u,v,w) su vector director.
Para que s sea paralela a π:
w⃗·n⃗π=0
⇒ (u,v,w)·(0,1,−1)=v−w=0
⇒ v=w.

Para que s sea perpendicular a r:
w⃗·v⃗r=0
⇒ (u,v,w)·(2,1,1)=2u+v+w=0.

Tomamos v=w=1. Entonces:
2u+2=0 ⇒ u=−1.
Así, w⃗=(−1,1,1).

Por tanto:
s:(x,y,z)=(0,1,−1)+μ(−1,1,1).

Comprobación: w⃗·n⃗π=0 y w⃗·v⃗r=0.`
      ),
    },

    "mates2-geometria-d71dea6fff2b": {
      "a)": answer(
        "λ=4",
        ["λ=−4", "λ=2", "λ=−2"],
        `Los vectores normales son:
n⃗₁=(1,−2,−1),
n⃗₂=(2,−1,λ).

Dos planos son perpendiculares cuando sus vectores normales son perpendiculares:
n⃗₁·n⃗₂=0.

Sustituimos:
(1,−2,−1)·(2,−1,λ)=2+2−λ=0
⇒ 4−λ=0
⇒ λ=4.`
      ),
      "b)": answer(
        "r:(x,y,z)=(1,2,3)+t(3,2,−1)",
        [
          "r:(x,y,z)=(1,2,3)+t(1,−2,−1)",
          "r:(x,y,z)=(1,2,3)+t(2,−1,4)",
          "r:(x,y,z)=(1,2,3)+t(3,−2,1)",
        ],
        `Para λ=4:
n⃗₁=(1,−2,−1),
n⃗₂=(2,−1,4).

Una recta paralela a ambos planos debe tener un vector director perpendicular a los dos vectores normales. Tomamos:
v⃗=n⃗₁×n⃗₂=(−9,−6,3).

Simplificamos dividiendo entre −3:
v⃗=(3,2,−1).

Como la recta pasa por P=(1,2,3):
r:(x,y,z)=(1,2,3)+t(3,2,−1).

Comprobación:
(3,2,−1)·(1,−2,−1)=3−4+1=0,
(3,2,−1)·(2,−1,4)=6−2−4=0.`
      ),
    },

    "mates2-geometria-ecbc59536693": {
      "a)": answer(
        "Las rectas se cruzan: son alabeadas",
        [
          "Las rectas se cortan en un punto",
          "Las rectas son paralelas distintas",
          "Las rectas coinciden",
        ],
        `Parametrizamos:
r:(x,y,z)=(0,−1,1)+t(2,1,3),
s:(x,y,z)=(0,0,1)+λ(1,1,−1).

Sus vectores directores son:
u⃗=(2,1,3),  v⃗=(1,1,−1).
No son proporcionales, así que las rectas no son paralelas.

Comprobamos si se cortan. Igualamos x e y:
2t=λ,
t−1=λ.
Sustituyendo λ=2t:
t−1=2t ⇒ t=−1 y λ=−2.

En la coordenada z:
r: 1+3(−1)=−2,
s: 1−(−2)=3.
No coinciden.

Por tanto, no son paralelas ni se cortan: las rectas se cruzan y son alabeadas.`
      ),
      "b)": answer(
        "d(r,s)=5/√42",
        ["d(r,s)=1/√42", "d(r,s)=5/42", "d(r,s)=√42/5"],
        `Tomamos:
P=(0,−1,1)∈r,
Q=(0,0,1)∈s,
u⃗=(2,1,3),
v⃗=(1,1,−1).

La distancia entre dos rectas alabeadas es:
d(r,s)=|PQ⃗·(u⃗×v⃗)|/|u⃗×v⃗|.

Calculamos:
PQ⃗=Q−P=(0,1,0),
u⃗×v⃗=(−4,5,1).

Entonces:
|PQ⃗·(u⃗×v⃗)|=|(0,1,0)·(−4,5,1)|=5,
|u⃗×v⃗|=√(16+25+1)=√42.

Por tanto:
d(r,s)=5/√42.

Comprobación: la distancia es positiva y las rectas son alabeadas, por lo que no puede ser cero.`
      ),
    },
  });

  // CCSS II, Álgebra 2012. Cada propuesta contiene dos ejercicios oficiales.
  // Se separan sus apartados para que cada uno tenga opciones y puntuación propias.
  for (const id of [
    "ccss2-algebra-53925103a320",
    "ccss2-algebra-14a1bb34b6d2",
    "ccss2-algebra-dc7c6c7f39ee",
    "ccss2-algebra-4b6d30f3eaab",
    "ccss2-algebra-51d5813d637c",
    "ccss2-algebra-5a27fabaeff9",
    "ccss2-algebra-d985026c28bf",
    "ccss2-algebra-47d60e7ae55b",
  ]) {
    const exercise = ccssBlock("algebra").find((item) => item.id === id);
    if (!exercise || exercise.parts?.[0]?.label === "1.a)") continue;

    const statement1 = copy(exercise.statement);
    const old = copy(exercise.parts);
    const secondAt = old.findIndex((part) =>
      part.paragraphs?.some((item) => /^2\.\s/.test(item.plain || ""))
    );
    if (secondAt < 0) continue;

    const markerAt = old[secondAt].paragraphs.findIndex((item) =>
      /^2\.\s/.test(item.plain || "")
    );
    const statement2 = copy(old[secondAt].paragraphs.slice(markerAt));
    const firstPartParagraphs = copy(old[secondAt].paragraphs.slice(0, markerAt));

    if (/^\s*1\.\s+a\)/.test(statement1[0]?.plain || "")) {
      exercise.statement = [];
      exercise.parts = [
        makePart("1.a)", statement1),
        makePart("1.b)", firstPartParagraphs),
        makePart("2.a)", [...statement2, ...copy(old[secondAt + 1]?.paragraphs)]),
        makePart("2.b)", [...statement2, ...copy(old[secondAt + 2]?.paragraphs)]),
      ];
    } else {
      exercise.statement = [];
      exercise.parts = [
        makePart("1.a)", [...statement1, ...copy(old[0]?.paragraphs)]),
        makePart("1.b)", [...statement1, ...firstPartParagraphs]),
        makePart("2.a)", [...statement2, ...copy(old[secondAt + 1]?.paragraphs)]),
        makePart("2.b)", [...statement2, ...copy(old[secondAt + 2]?.paragraphs)]),
      ];
    }
  }

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-53925103a320": {
      "1.a)": answer(
        "X=(A−2I)⁻¹(B−7I)",
        [
          "X=(B−7I)(A−2I)⁻¹",
          "X=(A+2I)⁻¹(B+7I)",
          "X=(B−7I)⁻¹(A−2I)",
        ],
        `Partimos de:
7I−2X+AX=B.
Pasamos 7I al segundo miembro:
−2X+AX=B−7I.

Sacamos X como factor común por la derecha:
(A−2I)X=B−7I.

Si A−2I es invertible, multiplicamos ambos miembros por su inversa a la izquierda:
(A−2I)⁻¹(A−2I)X=(A−2I)⁻¹(B−7I).

Como (A−2I)⁻¹(A−2I)=I:
X=(A−2I)⁻¹(B−7I).

El orden de los factores es esencial porque, en general, el producto de matrices no es conmutativo.`
      ),
      "1.b)": answer(
        "X=((1/3,0),(−7/3,1))",
        [
          "X=((3,0),(7,1))",
          "X=((1/3,0),(7/3,1))",
          "X=((1,0),(−7,3))",
        ],
        `La ecuación AX=I indica que X=A⁻¹.

A=((3,0),(7,1)).
Calculamos el determinante:
det(A)=3·1−0·7=3≠0.

Para una matriz de orden 2:
A⁻¹=(1/det(A))·((d,−b),(−c,a)).

Sustituimos:
X=A⁻¹=(1/3)·((1,0),(−7,3))
=((1/3,0),(−7/3,1)).

Comprobación:
A·X=((1,0),(0,1))=I.`
      ),
      "2.a)": answer(
        "r+l+p=120; r=3(p−l); p=(r+l)/2",
        [
          "r+l+p=120; r=3(p+l); p=(r−l)/2",
          "r+l+p=120; p=3(r−l); r=(p+l)/2",
          "r+l+p=120; r=p−3l; 2p=r−l",
        ],
        `Definimos:
r=número de votos para Roma,
l=número de votos para Londres,
p=número de votos para París.

Traducimos cada dato:

Total de votos:
r+l+p=120.

Roma es el triple de la diferencia entre París y Londres:
r=3(p−l).

París es la mitad de la suma de Roma y Londres:
p=(r+l)/2.

Por tanto, el sistema pedido es:
r+l+p=120,
r−3p+3l=0,
r+l−2p=0.`
      ),
      "2.b)": answer(
        "Roma: 60; Londres: 20; París: 40",
        [
          "Roma: 40; Londres: 20; París: 60",
          "Roma: 60; Londres: 40; París: 20",
          "Roma: 50; Londres: 30; París: 40",
        ],
        `Resolvemos:
r+l+p=120,
r=3(p−l),
2p=r+l.

De 2p=r+l y r+l+p=120:
2p+p=120 ⇒ 3p=120 ⇒ p=40.

Entonces:
r+l=80.
Además:
r=3(40−l)=120−3l.

Sustituimos en r+l=80:
120−3l+l=80
⇒ −2l=−40
⇒ l=20.

Finalmente:
r=80−20=60.

Resultado: Roma 60, Londres 20 y París 40.
Comprobación: 60+20+40=120, 60=3(40−20) y 40=(60+20)/2.`
      ),
    },

    "ccss2-algebra-14a1bb34b6d2": {
      "1.a)": answer(
        "3x+y≤3000; x+2y≤2000; x≥0; y≥0",
        [
          "3x+y≥3000; x+2y≥2000; x,y≥0",
          "x+3y≤3000; 2x+y≤2000; x,y≥0",
          "3x+2y≤3000; x+y≤2000; x,y≥0",
        ],
        `Sea x el número de lotes A e y el número de lotes B.

Restricción de bolsas de ajo:
3x+y≤3000.

Restricción de botellas de aceite:
x+2y≤2000.

No negatividad:
x≥0, y≥0.

La región factible está en el primer cuadrante y bajo las rectas 3x+y=3000 y x+2y=2000.
Sus vértices son:
(0,0), (1000,0), (800,600) y (0,1000).
El punto (800,600) se obtiene resolviendo conjuntamente las dos rectas frontera.`
      ),
      "1.b)": answer(
        "800 lotes A y 600 lotes B; recaudación máxima 88000 €",
        [
          "1000 lotes A y 0 lotes B; 50000 €",
          "0 lotes A y 1000 lotes B; 80000 €",
          "600 lotes A y 800 lotes B; 94000 €",
        ],
        `La función objetivo es:
F(x,y)=50x+80y.

Evaluamos en los vértices de la región factible:
F(0,0)=0,
F(1000,0)=50000,
F(800,600)=50·800+80·600=40000+48000=88000,
F(0,1000)=80000.

El valor máximo es 88000 € y se alcanza en (800,600).

Por tanto, debe preparar 800 lotes de tipo A y 600 de tipo B.
Comprobación: se consumen 3·800+600=3000 bolsas de ajo y 800+2·600=2000 botellas de aceite.`
      ),
      "2.a)": answer(
        "3a+4b+2c=430; 2a+2b+c=240; a+b+c=150",
        [
          "3a+2b+c=430; 4a+2b+c=240; 2a+b+c=150",
          "a+b+c=430; 2a+2b+c=240; 3a+4b+2c=150",
          "3a+4b+2c=240; 2a+2b+c=430; a+b+c=150",
        ],
        `Definimos a, b y c como el número de lavadoras de los modelos A, B y C.

Horas de montaje:
3a+4b+2c=430.

Horas de acabado:
2a+2b+c=240.

Horas de comprobación:
a+b+c=150.

Este es el sistema que traduce exactamente las tres cantidades de horas empleadas.`
      ),
      "2.b)": answer(
        "50 del modelo A, 40 del B y 60 del C",
        [
          "40 del modelo A, 50 del B y 60 del C",
          "50 del modelo A, 60 del B y 40 del C",
          "60 del modelo A, 40 del B y 50 del C",
        ],
        `Resolvemos:
3a+4b+2c=430,
2a+2b+c=240,
a+b+c=150.

Restamos la tercera ecuación de la segunda:
a+b=90.
De la tercera:
c=150−90=60.

Sustituimos c=60 en la primera:
3a+4b+120=430
⇒ 3a+4b=310.

Multiplicamos a+b=90 por 3:
3a+3b=270.
Restamos:
b=40.
Entonces:
a=90−40=50.

Resultado: A=50, B=40 y C=60.
Comprobación: 150+160+120=430; 100+80+60=240; 50+40+60=150.`
      ),
    },

    "ccss2-algebra-dc7c6c7f39ee": {
      "1.a)": answer(
        "M=((2,−2,−2),(−1,5,10),(−1,−1,4))",
        [
          "M=((−1,−2,−2),(−1,2,10),(−1,−1,1))",
          "M=((4,−2,−2),(−1,7,10),(−1,−1,6))",
          "M=((2,2,−2),(1,5,10),(−1,1,4))",
        ],
        `Calculamos primero A·B:
A=((1,−1),(1,3),(1,0)),
B=((−1,−1,1),(0,1,3)).

Producto fila por columna:
A·B=((−1,−2,−2),(−1,2,10),(−1,−1,1)).

Como 3I=((3,0,0),(0,3,0),(0,0,3)):
M=3I+A·B
=((2,−2,−2),(−1,5,10),(−1,−1,4)).

Comprobación: A·B y M son matrices de orden 3, como exige la suma.`
      ),
      "1.b)": answer(
        "X=((0,1/5),(1,−1/5))",
        [
          "X=((1,1),(5,0))",
          "X=((0,−1/5),(−1,1/5))",
          "X=((1/5,0),(−1/5,1))",
        ],
        `La ecuación X·C=I implica X=C⁻¹.

C=((1,1),(5,0)).
Su determinante es:
det(C)=1·0−1·5=−5≠0.

Aplicamos la fórmula de la inversa de orden 2:
C⁻¹=(1/−5)·((0,−1),(−5,1))
=((0,1/5),(1,−1/5)).

Por tanto:
X=((0,1/5),(1,−1/5)).

Comprobación: X·C=I.`
      ),
      "2.a)": answer(
        "10x+40y+20z=20; 20x+30y+20z=22; 70x+30y+60z=58",
        [
          "10x+20y+70z=20; 40x+30y+30z=22; 20x+20y+60z=58",
          "x+y+z=1; 10x+40y+20z=22; 70x+30y+60z=20",
          "20x+40y+10z=20; 20x+30y+20z=22; 60x+30y+70z=58",
        ],
        `Sean x, y y z las cantidades tomadas de los paquetes A, B y C.

Café de Colombia:
10x+40y+20z=20.

Café de Brasil:
20x+30y+20z=22.

Café de Kenia:
70x+30y+60z=58.

Estas tres ecuaciones forman el sistema pedido.`
      ),
      "2.b)": answer(
        "x=0,4; y=0,2; z=0,4",
        [
          "x=0,2; y=0,4; z=0,4",
          "x=0,4; y=0,4; z=0,2",
          "x=0,5; y=0,2; z=0,3",
        ],
        `Dividimos las ecuaciones entre 10:
x+4y+2z=2,
2x+3y+2z=2,2,
7x+3y+6z=5,8.

Restamos dos veces la primera a la segunda:
−5y−2z=−1,8
⇒ 5y+2z=1,8.

Restamos siete veces la primera a la tercera:
−25y−8z=−8,2
⇒ 25y+8z=8,2.

Multiplicamos 5y+2z=1,8 por 4:
20y+8z=7,2.
Restamos a la otra ecuación:
5y=1 ⇒ y=0,2.

Entonces 1+2z=1,8 ⇒ z=0,4.
En la primera: x+0,8+0,8=2 ⇒ x=0,4.

Resultado: x=0,4, y=0,2, z=0,4.`
      ),
    },

    "ccss2-algebra-4b6d30f3eaab": {
      "1.a)": answer(
        "3x+y≤150; x+2y≤100; x≥0; y≥0",
        [
          "3x+y≥150; x+2y≥100; x,y≥0",
          "x+3y≤150; 2x+y≤100; x,y≥0",
          "3x+2y≤150; x+y≤100; x,y≥0",
        ],
        `Sea x el número de lotes A e y el número de lotes B.

Quesos:
3x+y≤150.

Botes de berenjenas:
x+2y≤100.

No negatividad:
x≥0, y≥0.

La región factible tiene vértices:
(0,0), (50,0), (40,30) y (0,50).
El punto (40,30) es la intersección de las dos rectas frontera.`
      ),
      "1.b)": answer(
        "40 lotes A y 30 lotes B; máximo 11000 €",
        [
          "50 lotes A y 0 lotes B; 10000 €",
          "0 lotes A y 50 lotes B; 5000 €",
          "30 lotes A y 40 lotes B; 10000 €",
        ],
        `La función objetivo es:
F(x,y)=200x+100y.

Evaluamos en los vértices:
F(0,0)=0,
F(50,0)=10000,
F(40,30)=8000+3000=11000,
F(0,50)=5000.

El máximo se alcanza en (40,30).
Debe preparar 40 lotes A y 30 lotes B, con una recaudación máxima de 11000 €.

Comprobación: 3·40+30=150 quesos y 40+2·30=100 botes.`
      ),
      "2.a)": answer(
        "t+p+c=220; 100t+160p+200c=30800; c=2(t−p)",
        [
          "t+p+c=220; 100t+160p+200c=30800; c=2(t+p)",
          "t+p+c=30800; 100t+160p+200c=220; c=t−2p",
          "t+p+c=220; 100t+200p+160c=30800; p=2(t−c)",
        ],
        `Definimos:
t=billetes turista,
p=billetes preferente,
c=billetes club.

Número total:
t+p+c=220.

Recaudación:
100t+160p+200c=30800.

La tarifa club es el doble de la diferencia entre turista y preferente:
c=2(t−p).

Este es el sistema pedido.`
      ),
      "2.b)": answer(
        "100 turista, 80 preferente y 40 club",
        [
          "80 turista, 100 preferente y 40 club",
          "100 turista, 40 preferente y 80 club",
          "120 turista, 60 preferente y 40 club",
        ],
        `Resolvemos:
t+p+c=220,
100t+160p+200c=30800,
c=2(t−p).

Dividimos la segunda entre 20:
5t+8p+10c=1540.

Sustituimos c=2t−2p en la primera:
3t−p=220 ⇒ p=3t−220.

En la ecuación de recaudación:
5t+8(3t−220)+10(2t−2(3t−220))=1540.
Simplificamos:
−11t+2640=1540
⇒ t=100.

Entonces:
p=300−220=80,
c=2(100−80)=40.

Comprobación: 100+80+40=220 y 10000+12800+8000=30800.`
      ),
    },

    "ccss2-algebra-51d5813d637c": {
      "1.a)": answer(
        "40x+60y≥220; 0≤x≤4; 0≤y≤3",
        [
          "40x+60y≤220; 0≤x≤4; 0≤y≤3",
          "60x+40y≥220; 0≤x≤3; 0≤y≤4",
          "40x+60y=220; x≥4; y≥3",
        ],
        `Sea x el número de autobuses pequeños, de 40 plazas, e y el número de autobuses grandes, de 60 plazas.

Para transportar al menos a 220 personas:
40x+60y≥220.

Como hay disponibles como máximo 4 autobuses pequeños y 3 grandes:
0≤x≤4,
0≤y≤3.

Además, x e y deben tomar valores enteros.

Por tanto, la región factible es la parte del rectángulo 0≤x≤4, 0≤y≤3 situada por encima de la recta 40x+60y=220.`
      ),
      "1.b)": answer(
        "1 autobús pequeño y 3 grandes; coste mínimo 3000 €",
        [
          "4 autobuses pequeños y 1 grande; coste 3200 €",
          "3 autobuses pequeños y 2 grandes; coste 3400 €",
          "2 autobuses pequeños y 3 grandes; coste 3600 €",
        ],
        `La función de coste es:
C(x,y)=600x+800y.

Como x e y son números enteros, comprobamos las combinaciones factibles próximas a la frontera:

(4,1): 40·4+60·1=220 plazas; C=600·4+800=3200 €.

(3,2): 40·3+60·2=240 plazas; C=600·3+800·2=3400 €.

(2,3): 40·2+60·3=260 plazas; C=600·2+800·3=3600 €.

(1,3): 40·1+60·3=220 plazas; C=600+2400=3000 €.

El menor coste es 3000 €.

Resultado: se debe contratar 1 autobús pequeño y 3 grandes.`
      ),
      "2.a)": answer(
        "a+b+c=105; 150a+250b+400c=21500; a=2(b+c)",
        [
          "a+b+c=21500; 150a+250b+400c=105; a=b+c",
          "a+b+c=105; 150a+250b+400c=21500; 2a=b+c",
          "a+b+c=105; 400a+250b+150c=21500; a=2(b−c)",
        ],
        `Sean:
a = libros electrónicos del primer tipo,
b = libros electrónicos del segundo tipo,
c = libros electrónicos del tercer tipo.

El número total de libros es:
a+b+c=105.

El coste total es:
150a+250b+400c=21500.

Los libros del primer tipo son el doble que los de los otros dos tipos juntos:
a=2(b+c).

El sistema pedido es:
a+b+c=105,
150a+250b+400c=21500,
a−2b−2c=0.`
      ),
      "2.b)": answer(
        "70 del primer tipo, 20 del segundo y 15 del tercero",
        [
          "70 del primer tipo, 15 del segundo y 20 del tercero",
          "60 del primer tipo, 30 del segundo y 15 del tercero",
          "50 del primer tipo, 35 del segundo y 20 del tercero",
        ],
        `Resolvemos el sistema:
a+b+c=105,
150a+250b+400c=21500,
a=2(b+c).

Sustituimos a=2(b+c) en la primera ecuación:
2(b+c)+b+c=105
⇒ 3b+3c=105
⇒ b+c=35.

Por tanto:
a=2·35=70.

Sustituimos a=70 en la ecuación del coste:
150·70+250b+400c=21500
⇒ 250b+400c=11000.

Dividimos entre 50:
5b+8c=220.

Reunimos las dos ecuaciones:
b+c=35,
5b+8c=220.

Multiplicamos la primera por 5 y restamos:
3c=45
⇒ c=15.

Entonces:
b=35−15=20.

Resultado: 70, 20 y 15 libros, respectivamente.
Comprobación: 150·70+250·20+400·15=21500.`
      ),
    },

    "ccss2-algebra-5a27fabaeff9": {
      "1.a)": answer(
        "M=((4,−1,2),(−2,0,−11),(0,1,5))",
        [
          "M=((2,−1,2),(−2,−2,−11),(0,1,3))",
          "M=((4,1,2),(2,0,−11),(0,−1,5))",
          "M=((6,−1,2),(−2,2,−11),(0,1,7))",
        ],
        `Calculamos el producto A·B:
A=((−1,0),(1,−3),(0,1)),
B=((−2,1,−2),(0,1,3)).

Producto fila por columna:
A·B=((2,−1,2),(−2,−2,−11),(0,1,3)).

La matriz identidad de orden 3 es:
I=((1,0,0),(0,1,0),(0,0,1)).

Por tanto:
2I=((2,0,0),(0,2,0),(0,0,2)).

Sumamos:
M=2I+A·B
=((4,−1,2),(−2,0,−11),(0,1,5)).

Comprobación: las dos matrices sumadas son de orden 3.`
      ),
      "1.b)": answer(
        "X=((0,1),(1,−3))",
        [
          "X=((3,1),(1,0))",
          "X=((0,−1),(−1,3))",
          "X=((1,0),(−3,1))",
        ],
        `La ecuación X·C=I implica:
X=C⁻¹.

C=((3,1),(1,0)).

Calculamos su determinante:
det(C)=3·0−1·1=−1≠0.

Aplicamos la fórmula de la inversa de una matriz de orden 2:
C⁻¹=(1/det(C))·((d,−b),(−c,a)).

Sustituimos:
X=C⁻¹=(1/−1)·((0,−1),(−1,3))
=((0,1),(1,−3)).

Comprobación:
X·C=((1,0),(0,1))=I.`
      ),
      "2.a)": answer(
        "a+b+c=300; 2a+5b+8c=1020; a=2(b+c)",
        [
          "a+b+c=1020; 2a+5b+8c=300; a=b+c",
          "a+b+c=300; 2a+5b+8c=1020; 2a=b+c",
          "a+b+c=300; 8a+5b+2c=1020; a=2(b−c)",
        ],
        `Sean:
a = entradas del primer tipo,
b = entradas del segundo tipo,
c = entradas del tercer tipo.

El número total de entradas es:
a+b+c=300.

La recaudación total es:
2a+5b+8c=1020.

Las entradas del primer tipo son el doble que las de los otros dos tipos juntas:
a=2(b+c).

Este es el sistema que traduce el enunciado.`
      ),
      "2.b)": answer(
        "a=200; b=60; c=40",
        [
          "a=200; b=40; c=60",
          "a=180; b=80; c=40",
          "a=150; b=90; c=60",
        ],
        `Resolvemos:
a+b+c=300,
2a+5b+8c=1020,
a=2(b+c).

Sustituimos a=2(b+c) en la primera:
2(b+c)+b+c=300
⇒ 3b+3c=300
⇒ b+c=100.

Entonces:
a=2·100=200.

Sustituimos en la ecuación de la recaudación:
2·200+5b+8c=1020
⇒ 5b+8c=620.

Reunimos:
b+c=100,
5b+8c=620.

Multiplicamos la primera por 5:
5b+5c=500.

Restamos:
3c=120
⇒ c=40.

Por tanto:
b=100−40=60.

Resultado: a=200, b=60 y c=40.
Comprobación: 200+60+40=300 y 400+300+320=1020.`
      ),
    },

    "ccss2-algebra-d985026c28bf": {
      "1.a)": answer(
        "x≤10000; y≤8000; x+y≤15000; x≥0; y≥0",
        [
          "x≥10000; y≥8000; x+y≥15000",
          "x≤8000; y≤10000; x+y≤15000",
          "x≤10000; y≤8000; x+y≥15000",
        ],
        `Sea x la cantidad invertida en el primer producto e y la invertida en el segundo.

No se pueden invertir más de 10000 € en el primero:
x≤10000.

No se pueden invertir más de 8000 € en el segundo:
y≤8000.

La inversión total no supera 15000 €:
x+y≤15000.

Además:
x≥0, y≥0.

La región factible está limitada por los ejes, las rectas x=10000, y=8000 y x+y=15000.`
      ),
      "1.b)": answer(
        "7000 € en el primer producto y 8000 € en el segundo; beneficio 470 €",
        [
          "10000 € en el primero y 5000 € en el segundo; beneficio 350 €",
          "8000 € en el primero y 7000 € en el segundo; beneficio 430 €",
          "10000 € en el primero y 8000 € en el segundo; beneficio 500 €",
        ],
        `La función objetivo, que representa el beneficio, es:
B(x,y)=0,01x+0,05y.

Como el segundo producto ofrece mayor rentabilidad, conviene alcanzar primero su máximo permitido:
y=8000.

La restricción x+y≤15000 obliga entonces a:
x≤15000−8000=7000.

Tomamos x=7000.

Calculamos el beneficio:
B(7000,8000)=0,01·7000+0,05·8000
=70+400
=470 €.

Resultado: invertir 7000 € en el primer producto y 8000 € en el segundo.
Comprobación: la inversión total es 15000 € y se respetan ambos máximos.`
      ),
      "2.a)": answer(
        "a+b+r=900; a+2b+3r=1600; b=(r+a)/2",
        [
          "a+b+r=1600; a+2b+3r=900; b=r+a",
          "a+b+r=900; 3a+2b+r=1600; a=(r+b)/2",
          "a+b+r=900; a+2b+3r=1600; 2b=r−a",
        ],
        `Sean:
a = flores amarillas,
b = flores blancas,
r = flores rojas.

Número total de flores:
a+b+r=900.

Coste total:
a+2b+3r=1600.

El número de flores blancas es la mitad de la suma de rojas y amarillas:
b=(r+a)/2.

Equivalentemente:
2b−r−a=0.`
      ),
      "2.b)": answer(
        "400 amarillas, 300 blancas y 200 rojas",
        [
          "300 amarillas, 400 blancas y 200 rojas",
          "400 amarillas, 200 blancas y 300 rojas",
          "350 amarillas, 300 blancas y 250 rojas",
        ],
        `Resolvemos:
a+b+r=900,
a+2b+3r=1600,
2b=a+r.

De la tercera ecuación:
a+r=2b.

Sustituimos en la primera:
2b+b=900
⇒ 3b=900
⇒ b=300.

Entonces:
a+r=600.

En la ecuación del coste:
a+600+3r=1600
⇒ a+3r=1000.

Restamos a+r=600:
2r=400
⇒ r=200.

Por tanto:
a=600−200=400.

Resultado: 400 amarillas, 300 blancas y 200 rojas.
Comprobación: 400+300+200=900 y 400+600+600=1600.`
      ),
    },

    "ccss2-algebra-47d60e7ae55b": {
      "1.a)": answer(
        "X=(B−2I)(3I+A)⁻¹",
        [
          "X=(3I+A)⁻¹(B−2I)",
          "X=(B+2I)(3I−A)⁻¹",
          "X=(B−2I)⁻¹(3I+A)",
        ],
        `Partimos de:
2I+3X+XA=B.

Pasamos 2I al segundo miembro:
3X+XA=B−2I.

Sacamos X como factor común por la izquierda:
X(3I+A)=B−2I.

Si 3I+A es invertible, multiplicamos ambos miembros por (3I+A)⁻¹ a la derecha:
X(3I+A)(3I+A)⁻¹=(B−2I)(3I+A)⁻¹.

Como (3I+A)(3I+A)⁻¹=I:
X=(B−2I)(3I+A)⁻¹.

El inverso debe multiplicar por la derecha; cambiar el orden alteraría el resultado.`
      ),
      "1.b)": answer(
        "X=((1/2,0),(−5/6,1/3))",
        [
          "X=((2,0),(5,3))",
          "X=((1/2,0),(5/6,1/3))",
          "X=((1/3,0),(−5/6,1/2))",
        ],
        `La ecuación A·X=I implica:
X=A⁻¹.

A=((2,0),(5,3)).

Calculamos:
det(A)=2·3−0·5=6≠0.

Aplicamos la fórmula de la inversa de orden 2:
A⁻¹=(1/det(A))·((d,−b),(−c,a)).

Sustituimos:
X=A⁻¹=(1/6)·((3,0),(−5,2))
=((1/2,0),(−5/6,1/3)).

Comprobación:
A·X=I.`
      ),
      "2.a)": answer(
        "r+p+l=30; p=2(r+l); l=(r+p)/4",
        [
          "r+p+l=30; p=2(r−l); l=(r+p)/2",
          "r+p+l=30; r=2(p+l); p=(r+l)/4",
          "r+p+l=30; 2p=r+l; 4l=r−p",
        ],
        `Sean:
r = autobuses con destino Roma,
p = autobuses con destino París,
l = autobuses con destino Londres.

Número total:
r+p+l=30.

Los autobuses a París son el doble de los que van a Roma y Londres juntos:
p=2(r+l).

Los autobuses a Londres son la cuarta parte de los que van a Roma y París juntos:
l=(r+p)/4.

El sistema equivalente es:
r+p+l=30,
2r−p+2l=0,
r+p−4l=0.`
      ),
      "2.b)": answer(
        "Roma: 4; París: 20; Londres: 6",
        [
          "Roma: 6; París: 20; Londres: 4",
          "Roma: 4; París: 18; Londres: 8",
          "Roma: 10; París: 16; Londres: 4",
        ],
        `Resolvemos:
r+p+l=30,
p=2(r+l),
4l=r+p.

Como r+l=30−p, la segunda ecuación queda:
p=2(30−p)
⇒ p=60−2p
⇒ 3p=60
⇒ p=20.

Entonces:
r+l=10.

De 4l=r+p:
4l=r+20.

Sustituimos r=10−l:
4l=10−l+20
⇒ 5l=30
⇒ l=6.

Por tanto:
r=10−6=4.

Resultado: 4 autobuses a Roma, 20 a París y 6 a Londres.
Comprobación: 4+20+6=30, 20=2(4+6) y 6=(4+20)/4.`
      ),
    },
  });

  // CCSS II, Análisis 2012. Separamos los ejercicios 3 y 4 que la
  // conversión original dejó unidos en una misma propuesta.
  function splitAtOfficialExercise4(item) {
    const marker = "4. Se considera";
    const plain = item?.plain || "";
    const html = item?.html || plain;
    const plainAt = plain.indexOf(marker);
    const htmlAt = html.indexOf(marker);
    if (plainAt < 0 || htmlAt < 0) return null;
    return [
      {
        plain: plain.slice(0, plainAt).trim(),
        html: html.slice(0, htmlAt).trim(),
      },
      {
        plain: plain.slice(plainAt).trim(),
        html: html.slice(htmlAt).trim(),
      },
    ];
  }

  for (const id of [
    "ccss2-analisis-7fe8f0a641ec",
    "ccss2-analisis-35acc85274ba",
    "ccss2-analisis-ccc962dd8847",
    "ccss2-analisis-02964d0189ed",
    "ccss2-analisis-dc771113bc1b",
    "ccss2-analisis-7fb45c0730c0",
    "ccss2-analisis-7b3562002bf4",
    "ccss2-analisis-6aeb15b68196",
  ]) {
    const exercise = ccssBlock("analisis").find((item) => item.id === id);
    if (!exercise || /^3[.)]/.test(exercise.parts?.[0]?.label || "")) continue;

    const originalStatement = copy(exercise.statement);
    const originalParts = copy(exercise.parts);
    let statement3 = [];
    let statement4 = [];
    const parts3 = [];
    const parts4 = [];
    let reached4 = false;

    for (const item of originalStatement) {
      const split = splitAtOfficialExercise4(item);
      if (split) {
        if (split[0].plain) statement3.push(split[0]);
        statement4.push(split[1]);
        reached4 = true;
      } else if (reached4) {
        statement4.push(item);
      } else {
        statement3.push(item);
      }
    }

    for (const part of originalParts) {
      const before = [];
      const after = [];
      for (const item of part.paragraphs || []) {
        const split = splitAtOfficialExercise4(item);
        if (split) {
          if (split[0].plain) before.push(split[0]);
          after.push(split[1]);
          reached4 = true;
        } else if (reached4) {
          after.push(item);
        } else {
          before.push(item);
        }
      }
      if (before.length) parts3.push(makePart(`3.${part.label}`, before));
      if (after.length) {
        if (/^4\.\s/.test(after[0].plain || "")) {
          statement4.push(...after);
        } else {
          parts4.push(makePart(`4.${part.label}`, after));
        }
      }
    }

    // En junio B y septiembre B, el ejercicio 3 no tenía apartados.
    if (!parts3.length && statement3.length) {
      parts3.push(makePart("3)", statement3));
      statement3 = [];
    }

    exercise.statement = [];
    exercise.parts = [
      ...parts3.map((part) =>
        makePart(part.label, [...copy(statement3), ...copy(part.paragraphs)])
      ),
      ...parts4.map((part) =>
        makePart(part.label, [...copy(statement4), ...copy(part.paragraphs)])
      ),
    ];
  }

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-analisis-7fe8f0a641ec": {
      "3.a)": answer(
        "44 decibelios",
        ["42 decibelios", "46 decibelios", "48 decibelios"],
        `Sustituimos t=1 en la función:
R(1)=1³−9·1²+24·1+28
=1−9+24+28
=44.

Resultado: en la primera hora se registraron 44 decibelios.`
      ),
      "3.b)": answer(
        "A las 2 horas; 48 decibelios",
        [
          "A las 4 horas; 44 decibelios",
          "A las 3 horas; 46 decibelios",
          "A las 4,5 horas; 48 decibelios",
        ],
        `Derivamos:
R′(t)=3t²−18t+24
=3(t²−6t+8)
=3(t−2)(t−4).

Los puntos críticos son t=2 y t=4.

Estudiamos el signo de R′:
en (0,2), R′>0; en (2,4), R′<0; en (4,4,5), R′>0.

Por tanto, en t=2 la función pasa de creciente a decreciente y alcanza un máximo.

Calculamos:
R(2)=2³−9·2²+24·2+28
=8−36+48+28
=48.

Resultado: el mayor ruido se produce a las 2 horas y es de 48 decibelios.`
      ),
      "4.a)": answer(
        "No es continua en x=1",
        ["Es continua en x=1", "Solo es continua por la izquierda", "No está definida en x=1"],
        `La función está definida por:
f(x)=x²−x si x≤1,
f(x)=(x−2)²+1 si x>1.

En x=1:
f(1)=1²−1=0.

Límite por la izquierda:
lim[x→1⁻]f(x)=1²−1=0.

Límite por la derecha:
lim[x→1⁺]f(x)=(1−2)²+1=2.

Como los límites laterales no coinciden, f no es continua en x=1.`
      ),
      "4.b)": answer(
        "Mínimo relativo en (2,1)",
        ["Máximo relativo en (2,1)", "Mínimo relativo en (1,2)", "No tiene extremos relativos"],
        `En el intervalo (1,4) se utiliza:
f(x)=(x−2)²+1.

Derivamos:
f′(x)=2(x−2).

Se anula en:
2(x−2)=0 ⇒ x=2.

Si 1<x<2, f′(x)<0; si 2<x<4, f′(x)>0.
La función pasa de decreciente a creciente, luego hay un mínimo relativo.

f(2)=(2−2)²+1=1.

Resultado: mínimo relativo en (2,1).`
      ),
      "4.c)": answer(
        "Decrece en (1,2) y crece en (2,∞)",
        [
          "Crece en (1,2) y decrece en (2,∞)",
          "Crece en todo (1,∞)",
          "Decrece en todo (1,∞)",
        ],
        `Para x>1:
f′(x)=2(x−2).

Tomamos un valor de cada intervalo:
f′(1,5)=−1<0,
f′(3)=2>0.

Por tanto:
f decrece en (1,2),
f crece en (2,∞).

En x=2 cambia de signo negativo a positivo, confirmando el mínimo relativo.`
      ),
    },

    "ccss2-analisis-35acc85274ba": {
      "3)": answer(
        "a=6; b=9; c=4",
        ["a=−6; b=−9; c=4", "a=6; b=−9; c=4", "a=3; b=6; c=4"],
        `La función es:
f(x)=x³+ax²+bx+c.

Como pasa por (0,4):
f(0)=4 ⇒ c=4.

Derivamos:
f′(x)=3x²+2ax+b,
f″(x)=6x+2a.

Tiene un punto de inflexión en x=−2:
f″(−2)=0
⇒ −12+2a=0
⇒ a=6.

Tiene un mínimo relativo en x=−1:
f′(−1)=0
⇒ 3−2a+b=0.

Sustituimos a=6:
3−12+b=0
⇒ b=9.

Comprobamos el mínimo:
f″(−1)=−6+12=6>0.

Resultado: a=6, b=9 y c=4.`
      ),
      "4.a)": answer(
        "t=0",
        ["t=−2", "t=1", "t=2"],
        `Para que f sea continua en x=2 deben coincidir el valor de la rama izquierda y el límite de la derecha.

Valor en x=2:
f(2)=2²−2+t=2+t.

Límite por la derecha:
lim[x→2⁺]f(x)=(2−3)²+1=2.

Igualamos:
2+t=2
⇒ t=0.

Resultado: f es continua en x=2 cuando t=0.`
      ),
      "4.b)": answer(
        "Parábola y=x²−x para x≤2 y parábola y=(x−3)²+1 para x>2, unidas en (2,2)",
        [
          "Dos rectas que se cortan en (2,0)",
          "Una única parábola y=x²−x en todo ℝ",
          "Dos parábolas con un salto en x=2",
        ],
        `Para t=0:
f(x)=x²−x si x≤2,
f(x)=(x−3)²+1 si x>2.

Primera rama:
y=x²−x=x(x−1).
Corta al eje OX en x=0 y x=1, y su vértice está en x=1/2.

Segunda rama:
y=(x−3)²+1.
Su vértice es (3,1).

En x=2 ambas expresiones valen 2, por lo que las dos ramas se unen en (2,2).`
      ),
    },

    "ccss2-analisis-ccc962dd8847": {
      "3.a)": answer(
        "a=−3; b=0",
        ["a=3; b=0", "a=−3; b=2", "a=0; b=−3"],
        `f(x)=x³+ax²+bx+5.

Derivamos:
f′(x)=3x²+2ax+b.

Como hay un máximo relativo en x=0:
f′(0)=0 ⇒ b=0.

Como hay un mínimo relativo en x=2:
f′(2)=0
⇒ 12+4a+b=0.

Sustituimos b=0:
12+4a=0
⇒ a=−3.

Comprobación:
f″(x)=6x−6.
f″(0)=−6<0, máximo; f″(2)=6>0, mínimo.`
      ),
      "3.b)": answer(
        "Punto de inflexión (1,3)",
        ["Punto de inflexión (−1,1)", "Punto de inflexión (1,5)", "No tiene punto de inflexión"],
        `Con a=−3 y b=0:
f(x)=x³−3x²+5.

Calculamos la segunda derivada:
f″(x)=6x−6.

Buscamos dónde se anula:
6x−6=0
⇒ x=1.

La segunda derivada cambia de signo al pasar por x=1, por lo que hay un punto de inflexión.

Calculamos su ordenada:
f(1)=1−3+5=3.

Resultado: el punto de inflexión es (1,3).`
      ),
      "4.a)": answer(
        "t=1",
        ["t=−1", "t=0", "t=2"],
        `En x=2, la rama central vale:
f(2)=t.

El límite por la derecha es:
lim[x→2⁺](x−3)²=(2−3)²=1.

Para que haya continuidad:
t=1.

Resultado: t=1.`
      ),
      "4.b)": answer(
        "Dos arcos de parábola unidos por el tramo horizontal y=1 entre x=−2 y x=2",
        [
          "Una única parábola con vértice en (0,1)",
          "Dos rectas y un tramo horizontal",
          "Tres ramas con saltos en x=−2 y x=2",
        ],
        `Para t=1:
f(x)=(x+3)² si x≤−2,
f(x)=1 si −2<x≤2,
f(x)=(x−3)² si x>2.

La primera parábola tiene vértice en (−3,0) y llega al punto (−2,1).
El tramo central es horizontal: y=1.
La tercera parábola tiene vértice en (3,0) y parte del punto límite (2,1).

Las tres ramas se unen sin saltos.`
      ),
    },

    "ccss2-analisis-02964d0189ed": {
      "3.a)": answer(
        "14 %",
        ["10 %", "16 %", "19 %"],
        `Mayo corresponde a t=0, por lo que junio corresponde a t=1.

Sustituimos:
C(1)=1²−6·1+19
=1−6+19
=14.

Resultado: en junio el agua ocupaba el 14 % de la capacidad del pantano.`
      ),
      "3.b)": answer(
        "En agosto; 10 %",
        ["En julio; 11 %", "En septiembre; 10 %", "En noviembre; 19 %"],
        `C(t)=t²−6t+19, con 0≤t≤6.

Derivamos:
C′(t)=2t−6.

Se anula en:
2t−6=0
⇒ t=3.

Como C″(t)=2>0, se trata de un mínimo.

Desde mayo, t=3 corresponde a agosto.

Calculamos:
C(3)=3²−6·3+19
=9−18+19
=10.

Resultado: el mínimo se alcanzó en agosto y fue del 10 %.`
      ),
      "4.a)": answer(
        "No es continua en x=−2",
        ["Es continua en x=−2", "No está definida en x=−2", "Solo existe el límite derecho"],
        `En x=−2:
f(−2)=(−(−2)−3)²=(−1)²=1.

Límite por la izquierda:
lim[x→−2⁻]f(x)=1.

Límite por la derecha:
lim[x→−2⁺]f(x)=0.

Como los límites laterales no coinciden, f no es continua en x=−2.`
      ),
      "4.b)": answer(
        "No tiene extremos relativos en (0,4)",
        ["Mínimo en x=1", "Máximo en x=1", "Mínimo en x=2"],
        `Para x>0:
f(x)=(x⁻¹)²=1/x².

Derivamos:
f′(x)=−2/x³.

En todo el intervalo (0,4), x³>0 y, por tanto:
f′(x)<0.

La función es estrictamente decreciente y no tiene puntos críticos interiores.

Resultado: no tiene extremos relativos en (0,4).`
      ),
      "4.c)": answer(
        "Decrece en (0,∞)",
        ["Crece en (0,∞)", "Crece en (0,1) y decrece en (1,∞)", "Decrece en (0,1) y crece en (1,∞)"],
        `Para x>0:
f(x)=1/x²,
f′(x)=−2/x³.

Como x³>0 para todo x>0:
f′(x)<0.

Por tanto, f decrece en todo el intervalo (0,∞).`
      ),
    },

    "ccss2-analisis-dc771113bc1b": {
      "3.a)": answer(
        "a=−6; b=9",
        ["a=6; b=9", "a=−6; b=−9", "a=3; b=−6"],
        `Sea f(x)=x³+ax²+bx.

Derivamos:
f′(x)=3x²+2ax+b.

Como tiene extremos relativos en x=1 y x=3:
f′(1)=0 ⇒ 3+2a+b=0,
f′(3)=0 ⇒ 27+6a+b=0.

Resolvemos el sistema:
{2a+b=−3
 6a+b=−27}

Restando ambas ecuaciones:
4a=−24 ⇒ a=−6.

Sustituyendo:
2(−6)+b=−3 ⇒ b=9.

Resultado: a=−6 y b=9.`
      ),
      "3.b)": answer(
        "Crece en (−∞,1) y (3,∞); decrece en (1,3)",
        [
          "Decrece en (−∞,1) y (3,∞); crece en (1,3)",
          "Crece en todo ℝ",
          "Decrece en todo ℝ",
        ],
        `Con a=−6 y b=9:
f(x)=x³−6x²+9x.

Su derivada es:
f′(x)=3x²−12x+9=3(x−1)(x−3).

Los puntos que anulan la derivada son x=1 y x=3. Estudiamos el signo:

(−∞,1): tomamos x=0 ⇒ f′(0)=9>0, luego f crece.
(1,3): tomamos x=2 ⇒ f′(2)=−3<0, luego f decrece.
(3,∞): tomamos x=4 ⇒ f′(4)=9>0, luego f crece.

Por tanto, hay un máximo relativo en x=1 y un mínimo relativo en x=3.`
      ),
      "4.a)": answer(
        "t=1",
        ["t=−1", "t=0", "t=2"],
        `Para que la función sea continua en x=2 deben coincidir los límites laterales y el valor de la función.

Por la izquierda:
lim[x→2⁻](|x−2|−t)=−t.

Por la derecha:
lim[x→2⁺]((x−3)²−2)=1−2=−1.

Igualamos:
−t=−1 ⇒ t=1.

Resultado: t=1.`
      ),
      "4.b)": answer(
        "Para t=2: recta y=−x hasta x=2 y parábola y=(x−3)²−2 para x>2, con salto en x=2",
        [
          "Dos ramas unidas en (2,−1)",
          "Una sola parábola con vértice en (3,−2)",
          "Recta y=x−4 y parábola, continuas en x=2",
        ],
        `Para t=2 y x≤2:
|x−2|=2−x,
por lo que |x−2|−2=−x.

La rama izquierda es la recta y=−x y contiene el punto (2,−2).

Para x>2:
f(x)=(x−3)²−2,
una parábola con vértice (3,−2).

Su límite cuando x→2⁺ es −1. Como −2≠−1, la gráfica presenta un salto en x=2.`
      ),
    },

    "ccss2-analisis-7fb45c0730c0": {
      "3.a)": answer(
        "10 %",
        ["8 %", "12 %", "14 %"],
        `Sustituimos t=3 en f(t)=t²−6t+19:
f(3)=3²−6·3+19
=9−18+19
=10.

Resultado: al cabo de tres meses el porcentaje era del 10 %.`
      ),
      "3.b)": answer(
        "El máximo es 14 % y se alcanza para t=1",
        [
          "El máximo es 10 % y se alcanza para t=3",
          "El máximo es 19 % y se alcanza para t=0",
          "El máximo es 12 % y se alcanza para t=2",
        ],
        `En el intervalo indicado derivamos:
f′(t)=2t−6.

El único punto crítico es:
2t−6=0 ⇒ t=3.

Como f″(t)=2>0, en t=3 hay un mínimo. Por tanto, el máximo absoluto del intervalo cerrado se busca en los extremos.

f(1)=1−6+19=14,
f(5)=25−30+19=14.

El valor máximo es 14 %. En particular, el primer instante en que se alcanza es t=1.`
      ),
      "4.a)": answer(
        "No es continua en x=2",
        ["Es continua en x=2", "No está definida en x=2", "Solo existe el límite izquierdo"],
        `En x=2 comparamos las dos ramas.

Por la izquierda:
lim[x→2⁻]f(x)=|2−2|−2=−2.

Por la derecha:
lim[x→2⁺]f(x)=(2−3)²−2=−1.

Como −2≠−1, los límites laterales no coinciden.

Resultado: la función no es continua en x=2.`
      ),
      "4.b)": answer(
        "Mínimo relativo en (3,−2)",
        ["Máximo relativo en (3,−2)", "Mínimo relativo en (2,−1)", "No tiene extremos relativos"],
        `Para x>2:
f(x)=(x−3)²−2.

Derivamos:
f′(x)=2(x−3).

Se anula en x=3. Además:
f′(x)<0 si 2<x<3,
f′(x)>0 si x>3.

La función pasa de decreciente a creciente, luego hay un mínimo relativo.

f(3)=−2.

Resultado: mínimo relativo en (3,−2).`
      ),
      "4.c)": answer(
        "Decrece en (2,3) y crece en (3,∞)",
        [
          "Crece en (2,3) y decrece en (3,∞)",
          "Crece en todo (2,∞)",
          "Decrece en todo (2,∞)",
        ],
        `Para x>2:
f′(x)=2(x−3).

Tomamos un valor de cada intervalo:
f′(2,5)=−1<0,
f′(4)=2>0.

Por tanto, f decrece en (2,3) y crece en (3,∞).`
      ),
    },

    "ccss2-analisis-7b3562002bf4": {
      "3.a)": answer(
        "8 miles de euros",
        ["4 miles de euros", "6 miles de euros", "10 miles de euros"],
        `Sustituimos t=2 en la función de gastos:
G(2)=2²−8·2+20
=4−16+20
=8.

Resultado: los gastos fueron de 8 miles de euros.`
      ),
      "3.b)": answer(
        "El mínimo se alcanza en t=4 y vale 4 miles de euros",
        [
          "El mínimo se alcanza en t=2 y vale 8 miles de euros",
          "El mínimo se alcanza en t=5 y vale 5 miles de euros",
          "El mínimo se alcanza en t=8 y vale 20 miles de euros",
        ],
        `G(t)=t²−8t+20.

Derivamos:
G′(t)=2t−8.

Igualamos a cero:
2t−8=0 ⇒ t=4.

Como G″(t)=2>0, se trata de un mínimo.

G(4)=16−32+20=4.

Resultado: el gasto mínimo se alcanza para t=4 y es de 4 miles de euros.`
      ),
      "4.a)": answer(
        "t=2",
        ["t=−2", "t=0", "t=3"],
        `Estudiamos la continuidad en x=0.

Valor y límite por la izquierda:
f(0)=(0+1)²−t=1−t.

Límite por la derecha:
lim[x→0⁺](|x−2|−3)=2−3=−1.

Igualamos:
1−t=−1
⇒ t=2.

Resultado: t=2.`
      ),
      "4.b)": answer(
        "Para t=3: parábola y=(x+1)²−3 si x≤0 y V y=|x−2|−3 si x>0, con salto en x=0",
        [
          "Las dos ramas son continuas en x=0",
          "Una única parábola con vértice (−1,−3)",
          "Dos rectas que se cortan en (0,−1)",
        ],
        `Para t=3:
f(x)=(x+1)²−3 si x≤0,
f(x)=|x−2|−3 si x>0.

La primera rama es una parábola con vértice (−1,−3) y f(0)=−2.

La segunda rama es una función valor absoluto con vértice (2,−3). Su límite en 0 por la derecha vale −1.

Como −2≠−1, existe un salto en x=0.`
      ),
    },

    "ccss2-analisis-6aeb15b68196": {
      "3)": answer(
        "a=−1; b=−3; c=−6",
        ["a=1; b=−3; c=−6", "a=−1; b=3; c=−6", "a=−3; b=−1; c=6"],
        `Sea:
f(x)=⅓x³+ax²+bx+c.

Como pasa por (0,−6):
f(0)=−6 ⇒ c=−6.

Derivamos:
f′(x)=x²+2ax+b,
f″(x)=2x+2a.

Tiene un máximo relativo en x=−1:
f′(−1)=0
⇒ 1−2a+b=0.

Tiene un punto de inflexión en x=1:
f″(1)=0
⇒ 2+2a=0
⇒ a=−1.

Sustituimos en la primera ecuación:
1−2(−1)+b=0
⇒ 3+b=0
⇒ b=−3.

Además, f″(−1)=−4<0, por lo que el extremo es efectivamente un máximo.

Resultado: a=−1, b=−3 y c=−6.`
      ),
      "4.a)": answer(
        "No es continua en x=0",
        ["Es continua en x=0", "No está definida en x=0", "Solo existe el límite derecho"],
        `En x=0:
f(0)=(0+3)²=9.

Límite por la izquierda:
lim[x→0⁻]f(x)=9.

Límite por la derecha:
lim[x→0⁺](|2x³−2|−3)
=|−2|−3
=−1.

Como 9≠−1, los límites laterales no coinciden.

Resultado: la función no es continua en x=0.`
      ),
      "4.b)": answer(
        "Mínimo relativo en (−3,0)",
        ["Máximo relativo en (−3,0)", "Mínimo relativo en (0,9)", "No tiene extremos relativos"],
        `En el intervalo (−6,0):
f(x)=(x+3)².

Derivamos:
f′(x)=2(x+3).

Se anula en x=−3.

Si x<−3, f′(x)<0; si x>−3, f′(x)>0. Por tanto, la función pasa de decreciente a creciente y tiene un mínimo relativo.

f(−3)=0.

Resultado: mínimo relativo en (−3,0).`
      ),
      "4.c)": answer(
        "Decrece en (−∞,−3) y crece en (−3,0)",
        [
          "Crece en (−∞,−3) y decrece en (−3,0)",
          "Crece en todo (−∞,0)",
          "Decrece en todo (−∞,0)",
        ],
        `Para x<0:
f′(x)=2(x+3).

Tomamos un valor de cada intervalo:
f′(−4)=−2<0,
f′(−2)=2>0.

Por tanto, f decrece en (−∞,−3) y crece en (−3,0).`
      ),
    },

    "ccss2-probabilidad-82102f09d9a0": {
      "a)": answer(
        "0,05",
        ["0,15", "0,20", "0,50"],
        `Sea F el suceso «juega al fútbol» y B el suceso «juega al baloncesto».

Usamos:
P(F∪B)=P(F)+P(B)−P(F∩B).

Despejamos:
P(F∩B)=0,25+0,30−0,50=0,05.

Resultado: la probabilidad es 0,05, es decir, un 5 %.`
      ),
      "b)": answer(
        "1/6≈0,1667",
        ["1/5=0,20", "1/4=0,25", "1/2=0,50"],
        `Se pide una probabilidad condicionada:

P(F|B)=P(F∩B)/P(B).

Sustituimos:
P(F|B)=0,05/0,30=1/6≈0,1667.

Resultado: la probabilidad de que juegue al fútbol sabiendo que juega al baloncesto es 1/6.`
      ),
    },

    "ccss2-probabilidad-4bff742746ac": {
      "a)": answer(
        "0,08",
        ["0,05", "0,075", "0,10"],
        `La proporción 2 a 3 significa:
P(A)=2/5 y P(B)=3/5.

Aplicamos el teorema de la probabilidad total:
P(D)=P(A)·P(D|A)+P(B)·P(D|B)
=(2/5)·0,05+(3/5)·0,10
=0,02+0,06
=0,08.

Resultado: la probabilidad de que el mueble sea defectuoso es 0,08.`
      ),
      "b)": answer(
        "27/46≈0,5870",
        ["3/5=0,60", "23/50=0,46", "9/10=0,90"],
        `Se pide P(B|D̄).

Calculamos:
P(B∩D̄)=P(B)·P(D̄|B)
=(3/5)·0,90=0,54.

Además:
P(D̄)=1−P(D)=1−0,08=0,92.

Por tanto:
P(B|D̄)=0,54/0,92=54/92=27/46≈0,5870.

Resultado: 27/46.`
      ),
    },

    "ccss2-probabilidad-dcbfa631e4f5": {
      "a)": answer(
        "0,115",
        ["0,10", "0,15", "0,25"],
        `Sea C «el crédito es para un coche» e I «el crédito resulta impagado».

Aplicamos la probabilidad total:
P(I)=P(C)·P(I|C)+P(C̄)·P(I|C̄)
=0,10·0,25+0,90·0,10
=0,025+0,09
=0,115.

Resultado: la probabilidad de impago es 0,115, es decir, un 11,5 %.`
      ),
      "b)": answer(
        "5/59≈0,0847",
        ["3/40=0,075", "1/10=0,10", "15/177≈0,8475"],
        `Sea P el suceso «el crédito se ha pagado».

Calculamos:
P(C∩P)=P(C)·P(P|C)
=0,10·0,75=0,075.

La probabilidad de pago es:
P(P)=1−P(I)=1−0,115=0,885.

Por tanto:
P(C|P)=0,075/0,885=75/885=5/59≈0,0847.

Resultado: 5/59.`
      ),
    },

    "ccss2-probabilidad-5d893cd81da4": {
      "a)": answer(
        "16/81≈0,1975",
        ["4/9≈0,4444", "25/81≈0,3086", "64/81≈0,7901"],
        `A 10 de los 18 alumnos les gusta el baloncesto. Por tanto, a 8 no les gusta.

Como una misma persona puede recibir las dos entradas, los sorteos se consideran independientes:

P(ningún premiado aficionado al baloncesto)
=(8/18)·(8/18)
=(4/9)²
=16/81≈0,1975.

Resultado: 16/81.`
      ),
      "b)": answer(
        "1/8568≈0,0001167",
        ["(5/18)⁵", "5/18≈0,2778", "1/1028160"],
        `Hay 5 aficionados al fútbol entre 18 alumnos. Como quien obtiene una entrada deja de participar, las extracciones son sin reemplazamiento:

P=(5/18)·(4/17)·(3/16)·(2/15)·(1/14).

Multiplicamos y simplificamos:
P=120/1028160
=1/8568
≈0,0001167.

Resultado: 1/8568.`
      ),
    },

    "ccss2-probabilidad-540883b71686": {
      "a)": answer(
        "0,2565",
        ["0,015", "0,255", "0,30"],
        `Sea F «el alumno es fumador» y S «obtiene sobresaliente».

Aplicamos la probabilidad total:
P(S)=P(F)·P(S|F)+P(F̄)·P(S|F̄)
=0,15·0,01+0,85·0,30
=0,0015+0,255
=0,2565.

Resultado: la probabilidad de sobresaliente es 0,2565.`
      ),
      "b)": answer(
        "1/171≈0,00585",
        ["0,0015", "0,15", "10/171≈0,0585"],
        `Aplicamos la fórmula de Bayes:

P(F|S)=P(F∩S)/P(S).

El numerador es:
P(F∩S)=0,15·0,01=0,0015.

Por tanto:
P(F|S)=0,0015/0,2565
=15/2565
=1/171
≈0,00585.

Resultado: 1/171.`
      ),
    },

    "ccss2-probabilidad-4a46d06e950b": {
      "a)": answer(
        "4/9≈0,4444",
        ["1/3≈0,3333", "2/3≈0,6667", "5/9≈0,5556"],
        `Hay 300 personas en total y 100 son de Toledo. Por tanto, 200 no son toledanas.

Como los dos ordenadores pueden tocarle a la misma persona, los sorteos son independientes:

P(ningún toledano)
=(200/300)²
=(2/3)²
=4/9≈0,4444.

Resultado: 4/9.`
      ),
      "b)": answer(
        "(50/300)·(49/299)·(48/298)≈0,00440",
        [
          "(50/300)³≈0,00463",
          "(50/300)·(50/299)·(50/298)",
          "3·50/300=0,5",
        ],
        `Hay 50 personas de Ciudad Real entre 300. La elección se hace sin repetición:

P=(50/300)·(49/299)·(48/298).

Al retirar una persona en cada elección disminuyen tanto el número de ciudadrealeños disponibles como el total.

Calculando:
P≈0,00440.

Resultado: aproximadamente 0,00440.`
      ),
    },

    "ccss2-probabilidad-a7e5c0b82377": {
      "a)": answer(
        "0,50",
        ["0,15", "0,25", "0,30"],
        `Sea C «la familia va al cine regularmente» y L «lee regularmente».

Se pide:
P(L|C)=P(L∩C)/P(C).

Sustituimos:
P(L|C)=0,15/0,30=0,50.

Resultado: la probabilidad es 0,50.`
      ),
      "b)": answer(
        "0,40",
        ["0,15", "0,55", "0,70"],
        `Usamos la probabilidad de la unión:

P(C∪L)=P(C)+P(L)−P(C∩L).

Sustituimos:
P(C∪L)=0,30+0,25−0,15=0,40.

Resultado: la probabilidad es 0,40.`
      ),
    },

    "ccss2-probabilidad-7f653a09b6ca": {
      "a)": answer(
        "0,011",
        ["0,005", "0,013", "0,025"],
        `Sea D «el artículo es defectuoso».

Aplicamos la probabilidad total:
P(D)=0,60·0,005+0,40·0,02
=0,003+0,008
=0,011.

Resultado: la probabilidad de defecto es 0,011, es decir, un 1,1 %.`
      ),
      "b)": answer(
        "8/11≈0,7273",
        ["3/11≈0,2727", "0,40", "0,80"],
        `Aplicamos la fórmula de Bayes:

P(L₂|D)=P(L₂∩D)/P(D).

Calculamos el numerador:
P(L₂∩D)=0,40·0,02=0,008.

Por tanto:
P(L₂|D)=0,008/0,011
=8/11
≈0,7273.

Resultado: 8/11.`
      ),
    },

    "ccss2-estadistica-4bb5158aab13": {
      "a)": answer(
        "IC₉₇%≈(738,86; 751,14) gramos",
        [
          "IC₉₇%≈(739,46; 750,54) gramos",
          "IC₉₇%≈(725; 765) gramos",
          "IC₉₇%≈(742,17; 747,83) gramos",
        ],
        `Datos: x̄=745, σ=20, n=50 y nivel de confianza 0,97.

α=0,03 y α/2=0,015. En la tabla de la normal:
P(Z≤z)=0,985 ⇒ z≈2,17.

El intervalo de confianza es:
IC=x̄±z·σ/√n.

Calculamos el error:
E=2,17·20/√50≈6,14.

Por tanto:
IC≈(745−6,14; 745+6,14)
=(738,86; 751,14) gramos.`
      ),
      "b)": answer(
        "Aumentar el tamaño de la muestra o disminuir el nivel de confianza",
        [
          "Disminuir el tamaño de la muestra",
          "Aumentar el nivel de confianza",
          "Aumentar simultáneamente σ y el nivel de confianza",
        ],
        `La amplitud del intervalo es:
A=2·z·σ/√n.

Para disminuirla podemos:
1. Aumentar n, porque √n aparece en el denominador.
2. Disminuir el nivel de confianza, lo que reduce el valor crítico z.

Con el mismo nivel de confianza y la misma desviación típica, la medida adecuada es aumentar el tamaño de la muestra.`
      ),
    },

    "ccss2-estadistica-e74920d44e8e": {
      "a)": answer(
        "IC₉₅%≈(87,90; 106,50)",
        ["IC₉₅%≈(82,20; 112,20)", "IC₉₅%≈(94,20; 100,20)", "IC₉₅%≈(95,24; 99,16)"],
        `Calculamos la media muestral:
x̄=(80+96+87+104+105+99+112+89+90+110)/10
=972/10
=97,2.

Datos: σ=15, n=10 y z=1,96 para un 95 % de confianza.

El error es:
E=1,96·15/√10≈9,30.

Por tanto:
IC≈(97,2−9,30; 97,2+9,30)
=(87,90; 106,50).`
      ),
      "b)": answer(
        "Aumentar el tamaño de la muestra",
        [
          "Disminuir el tamaño de la muestra",
          "Aumentar la desviación típica",
          "Aumentar el nivel de confianza",
        ],
        `Con el mismo nivel de confianza:
A=2·1,96·σ/√n.

Como σ y el valor crítico permanecen constantes, para reducir la amplitud debemos aumentar n.

Resultado: hay que estudiar un número mayor de alumnos.`
      ),
    },

    "ccss2-estadistica-52064284c1a3": {
      "a)": answer(
        "IC₉₅%≈(38,34; 41,66) meses",
        [
          "IC₉₅%≈(34; 46) meses",
          "IC₉₅%≈(39,15; 40,85) meses",
          "IC₉₅%≈(37,23; 42,77) meses",
        ],
        `Datos: x̄=40, σ=6, n=50 y z=1,96.

El error de estimación es:
E=1,96·6/√50≈1,66.

Por tanto:
IC≈(40−1,66; 40+1,66)
=(38,34; 41,66) meses.`
      ),
      "b)": answer(
        "Aumentar n o reducir el nivel de confianza",
        [
          "Reducir n",
          "Aumentar el nivel de confianza",
          "Aumentar σ",
        ],
        `La amplitud es:
A=2·z·σ/√n.

Puede disminuirse aumentando el tamaño muestral n o utilizando un nivel de confianza menor.

Si se desea conservar el 95 % de confianza, debe aumentarse el número de impresoras estudiadas.`
      ),
    },

    "ccss2-estadistica-f7ae441e911c": {
      "a)": answer(
        "IC₉₇%≈(4,29; 7,17) horas",
        ["IC₉₇%≈(3,63; 7,83) horas", "IC₉₇%≈(5,07; 6,39) horas", "IC₉₇%≈(4,73; 6,73) horas"],
        `Primero calculamos la media:
x̄=(4,2+4,6+5+5,7+5,8+5,9+6,1+6,2+6,5+7,3)/10
=57,3/10
=5,73.

Para un 97 % de confianza, z≈2,17. Además, σ=2,1 y n=10.

E=2,17·2,1/√10≈1,44.

Por tanto:
IC≈(5,73−1,44; 5,73+1,44)
=(4,29; 7,17) horas.`
      ),
      "b)": answer(
        "Aumentar el tamaño de la muestra",
        [
          "Disminuir el tamaño de la muestra",
          "Aumentar el nivel de confianza",
          "Aumentar la desviación típica",
        ],
        `Con el nivel de confianza fijado en el 97 %, la amplitud es:
A=2·2,17·2,1/√n.

Al aumentar n, el denominador crece y la amplitud disminuye.

Resultado: debe seleccionarse una muestra mayor.`
      ),
    },

    "ccss2-estadistica-fd970c401af7": {
      "a)": answer(
        "IC₉₇%≈(0,771; 0,909) euros",
        ["IC₉₇%≈(0,74; 0,94) euros", "IC₉₇%≈(0,808; 0,872) euros", "IC₉₇%≈(0,84; 0,94) euros"],
        `Calculamos la media:
x̄=(0,60+0,80+1,20+0,95+0,65+0,70+0,75+0,85+1+0,90)/10
=8,40/10
=0,84.

Para un 97 % de confianza, z≈2,17. Con σ=0,10 y n=10:
E=2,17·0,10/√10≈0,0686.

Por tanto:
IC≈(0,84−0,0686; 0,84+0,0686)
=(0,771; 0,909) euros.`
      ),
      "b)": answer(
        "Aumentar el número de establecimientos de la muestra",
        [
          "Reducir el número de establecimientos",
          "Aumentar el nivel de confianza",
          "Aumentar la desviación típica",
        ],
        `Manteniendo el mismo nivel de confianza:
A=2·2,17·0,10/√n.

La única cantidad que podemos modificar es n. Al aumentar n disminuye la amplitud.

Resultado: hay que tomar precios de un número mayor de establecimientos.`
      ),
    },

    "ccss2-estadistica-fa3b6d237f9f": {
      "a)": answer(
        "IC₉₅%≈(179,46; 190,54) litros",
        [
          "IC₉₅%≈(165; 205) litros",
          "IC₉₅%≈(182,23; 187,77) litros",
          "IC₉₅%≈(181,08; 188,92) litros",
        ],
        `Datos: x̄=185, σ=20, n=50 y z=1,96.

Calculamos el error:
E=1,96·20/√50≈5,54.

Por tanto:
IC≈(185−5,54; 185+5,54)
=(179,46; 190,54) litros.`
      ),
      "b)": answer(
        "Aumentar el tamaño de la muestra",
        [
          "Disminuir el tamaño de la muestra",
          "Aumentar el nivel de confianza",
          "Aumentar σ",
        ],
        `Con un nivel de confianza del 95 %:
A=2·1,96·20/√n.

La amplitud disminuye cuando aumenta n.

Resultado: debemos seleccionar un número mayor de personas.`
      ),
    },

    "ccss2-estadistica-f546cc317815": {
      "a)": answer(
        "IC₉₅%=(81,08; 88,92) mg/dl",
        [
          "IC₉₅%=(65; 105) mg/dl",
          "IC₉₅%=(83,04; 86,96) mg/dl",
          "IC₉₅%=(80,66; 89,34) mg/dl",
        ],
        `Datos: x̄=85, σ=20, n=100 y z=1,96.

E=1,96·20/√100
=1,96·20/10
=3,92.

Por tanto:
IC=(85−3,92; 85+3,92)
=(81,08; 88,92) mg/dl.`
      ),
      "b)": answer(
        "Al aumentar la confianza aumenta la amplitud; al disminuirla, la amplitud disminuye",
        [
          "Al aumentar la confianza disminuye la amplitud",
          "El nivel de confianza no afecta a la amplitud",
          "La amplitud disminuye en ambos casos",
        ],
        `La amplitud es:
A=2·z·σ/√n.

Si aumenta el nivel de confianza, aumenta el valor crítico z y el intervalo se hace más ancho.

Si disminuye el nivel de confianza, z disminuye y el intervalo se hace más estrecho.

Existe, por tanto, un compromiso entre confianza y precisión.`
      ),
    },

    "ccss2-estadistica-29f93837506b": {
      "a)": answer(
        "IC₉₇%≈(18,80; 28,40) minutos",
        [
          "IC₉₇%≈(16,60; 30,60) minutos",
          "IC₉₇%≈(21,43; 25,77) minutos",
          "IC₉₇%≈(19,26; 27,94) minutos",
        ],
        `Calculamos la media:
x̄=(15+20+28+21+26+30+16+18+35+27)/10
=236/10
=23,6.

Para un 97 % de confianza, z≈2,17. Con σ=7 y n=10:
E=2,17·7/√10≈4,80.

Por tanto:
IC≈(23,6−4,80; 23,6+4,80)
=(18,80; 28,40) minutos.`
      ),
      "b)": answer(
        "n=58 clientes",
        ["n=49 clientes", "n=57 clientes", "n=59 clientes"],
        `Queremos que el error sea inferior a 2:
E=z·σ/√n<2.

Sustituimos z≈2,17 y σ=7:
2,17·7/√n<2.

Despejamos:
√n>(2,17·7)/2,
n>((2,17·7)/2)²≈57,69.

El tamaño debe ser entero y cumplir estrictamente la desigualdad. Tomamos el entero siguiente:
n=58.

Resultado: se necesitan como mínimo 58 clientes.`
      ),
    },
  });
})();

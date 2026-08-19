(() => {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};

  const answer = (correctText, distractors, solution) => ({
    options: [correctText, ...distractors],
    correct: 0,
    solution: `Resolución:\n${solution}`,
  });
  const copy = (value) => JSON.parse(JSON.stringify(value || []));
  const makePart = (label, paragraphs) => ({ label, paragraphs });
  const paragraph = (plain, html = plain) => ({ plain, html });
  const matesBlock = (block) => window.MATES_II_BLOCK_EXERCISES?.[block] || [];
  const insertAfter = (list, referenceId, exercise) => {
    if (!exercise || list.some((item) => item.id === exercise.id)) return;
    const index = list.findIndex((item) => item.id === referenceId);
    list.splice(index < 0 ? list.length : index + 1, 0, exercise);
  };

  // En las convocatorias de 2007 varias alternativas oficiales quedaron
  // agrupadas en una sola ficha durante la importación. Cada alternativa se
  // convierte aquí en una unidad independiente del historial de variedad.
  {
    const list = matesBlock("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-01585defe9a5");
    if (exercise && exercise.statement?.length >= 3) {
      const statements = copy(exercise.statement);
      exercise.statement = [paragraph("3º-A)")];
      exercise.parts = [
        makePart("a)", statements.slice(0, 1)),
        makePart("b)", statements.slice(1, 2)),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: statements.slice(2, 3),
        parts: [makePart("Resultado", [])],
      });
    }
  }

  {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-ea9fbb465ba0");
    if (exercise) {
      const firstStatement = copy(exercise.statement);
      const firstC = copy(exercise.parts?.[1]?.paragraphs || []);
      const firstBStatement = firstC.slice(1, 2);
      const firstBParts = [
        copy(exercise.parts?.[2]),
        makePart("b)", copy(exercise.parts?.[3]?.paragraphs?.slice(0, 1) || [])),
      ];
      const integralStatement = copy(exercise.parts?.[3]?.paragraphs?.slice(1, 2) || []);
      const areaStatement = copy(exercise.parts?.[3]?.paragraphs?.slice(2, 3) || []);
      const areaParts = copy(exercise.parts?.slice(4) || []);

      exercise.statement = [paragraph("1º-A)")];
      exercise.parts = [
        makePart("a)", firstStatement),
        copy(exercise.parts?.[0]),
        makePart("c)", firstC.slice(0, 1)),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-1b`,
        statement: firstBStatement,
        parts: firstBParts,
      });
      insertAfter(list, `${exercise.id}-1b`, {
        ...copy(exercise),
        id: `${exercise.id}-2a`,
        statement: integralStatement,
        parts: [makePart("Resultado", [])],
      });
      insertAfter(list, `${exercise.id}-2a`, {
        ...copy(exercise),
        id: `${exercise.id}-2b`,
        statement: areaStatement,
        parts: areaParts,
      });
    }
  }

  {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-07029fe0c9fd");
    if (exercise && exercise.statement?.length >= 2) {
      const statements = copy(exercise.statement);
      const embedded = copy(exercise.parts?.[1]?.paragraphs || []);
      const firstBParts = [
        copy(exercise.parts?.[0]),
        makePart("b)", embedded.slice(0, 1)),
      ];
      exercise.statement = statements.slice(0, 1);
      exercise.parts = [makePart("Resultado", [])];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-1b`,
        statement: statements.slice(1, 2),
        parts: firstBParts,
      });
      insertAfter(list, `${exercise.id}-1b`, {
        ...copy(exercise),
        id: `${exercise.id}-2a`,
        statement: embedded.slice(1, 2),
        parts: [makePart("Resultado", [])],
      });
      insertAfter(list, `${exercise.id}-2a`, {
        ...copy(exercise),
        id: `${exercise.id}-2b`,
        statement: embedded.slice(2, 3),
        parts: [makePart("Resultado", [])],
      });
    }
  }

  {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-07af7c78fa22");
    if (exercise) {
      exercise.statement = [paragraph("SEGUNDO BLOQUE A. Considera la parábola f(x)=−x²+4.")];
      exercise.parts = [
        makePart("a)", [paragraph("a) Calcula las ecuaciones de las rectas tangentes a f(x) en x=2 y en x=−2, esbozando una gráfica con la parábola y las dos rectas tangentes.")]),
        makePart("b)", [paragraph("b) Calcula el área comprendida entre la parábola y dichas rectas tangentes.")]),
      ];
    }
  }

  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-ec013ba1d3d8");
    if (exercise) {
      const optionBStatement = copy(exercise.parts?.[1]?.paragraphs?.slice(1) || []);
      const optionBParts = copy(exercise.parts?.slice(2) || []);
      exercise.parts = [
        copy(exercise.parts?.[0]),
        makePart("b)", copy(exercise.parts?.[1]?.paragraphs?.slice(0, 1) || [])),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: optionBStatement,
        parts: optionBParts,
      });
    }
  }

  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-fcc34b36cf17");
    if (exercise) {
      const optionBStatement = copy(exercise.parts?.[1]?.paragraphs?.slice(1) || []);
      const optionBParts = copy(exercise.parts?.slice(2) || []);
      exercise.parts = [
        copy(exercise.parts?.[0]),
        makePart("b)", copy(exercise.parts?.[1]?.paragraphs?.slice(0, 1) || [])),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: optionBStatement,
        parts: optionBParts,
      });
    }
  }

  {
    const list = matesBlock("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-3f5fc3b1d4e0");
    if (exercise) {
      const embedded = copy(exercise.parts?.[1]?.paragraphs?.slice(1) || []);
      const secondParts = copy(exercise.parts?.slice(2) || []);
      exercise.parts = [
        copy(exercise.parts?.[0]),
        makePart("b)", copy(exercise.parts?.[1]?.paragraphs?.slice(0, 1) || [])),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: embedded,
        parts: secondParts,
      });
    }
  }

  {
    const list = matesBlock("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-96b820c9ff52");
    if (exercise && exercise.statement?.length >= 2) {
      const statements = copy(exercise.statement);
      exercise.statement = [paragraph("TERCER BLOQUE A.")];
      exercise.parts = [
        makePart("a)", statements.slice(0, 1)),
        makePart("b)", statements.slice(1, 2)),
      ];
    }
  }

  {
    const list = matesBlock("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-bcdf444cb323");
    if (exercise && exercise.statement?.length) {
      const original = copy(exercise.statement);
      exercise.statement = [paragraph("TERCER BLOQUE B.")];
      exercise.parts = [
        makePart("a)", original),
        ...copy(exercise.parts),
      ];
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-01585defe9a5": {
      "a)": answer(
        "rango(A)=3 si λ≠0,1/2; rango(A)=2 si λ=0 o λ=1/2",
        [
          "rango(A)=3 para todo λ",
          "rango(A)=2 si λ≠0,1/2; rango(A)=3 en los demás casos",
          "rango(A)=1 si λ=0 y rango(A)=2 en los demás casos",
        ],
        `Calculamos el determinante mediante Sarrus:
det(A)=2λ(2λ−1).
Si λ≠0 y λ≠1/2, det(A)≠0 y, por tanto, rango(A)=3.
Para λ=0 y para λ=1/2 el determinante se anula. En ambos casos existe un menor de orden 2 no nulo; por ejemplo, el formado por las dos primeras filas y las dos primeras columnas. Por ello:
rango(A)=2 si λ=0 o λ=1/2.`
      ),
      "b)": answer(
        "A tiene inversa si y solo si λ≠0 y λ≠1/2",
        [
          "A tiene inversa para todo λ",
          "A tiene inversa solo si λ=0 o λ=1/2",
          "A tiene inversa si y solo si λ≠1/2",
        ],
        `Una matriz cuadrada tiene inversa si y solo si su determinante es distinto de cero. Como:
det(A)=2λ(2λ−1),
se cumple det(A)≠0 exactamente cuando λ≠0 y λ≠1/2.`
      ),
    },
    "mates2-algebra-01585defe9a5-opcion-b": {
      "Resultado": answer(
        "Si a≠0, (x,y,z)=(0,0,0); si a=0, (x,y,z)=(0,0,t), t∈R",
        [
          "Si a≠0 hay infinitas soluciones; si a=0 solo existe la trivial",
          "El sistema es incompatible para a=0",
          "Para todo a, (x,y,z)=(t,0,0)",
        ],
        `Es un sistema homogéneo, por lo que nunca puede ser incompatible. La matriz de coeficientes es:
A=((a,1,0),(0,−1,2a),(−1,a,0)).
Su determinante, calculado mediante Sarrus, es:
det(A)=−2a(a²+1).
Como a²+1>0 para todo a∈R, el determinante solo se anula para a=0.
Si a≠0, rango(A)=3 y el sistema es compatible determinado: (x,y,z)=(0,0,0).
Si a=0, las ecuaciones dan y=0 y x=0, mientras que z queda libre. Tomando z=t:
(x,y,z)=(0,0,t), t∈R.`
      ),
    },
    "mates2-algebra-3f5fc3b1d4e0": {
      "a)": answer(
        "No; todo sistema homogéneo es compatible",
        [
          "Sí, cuando el determinante de A es cero",
          "Sí, cuando hay más incógnitas que ecuaciones",
          "Solo si rango(A)=rango(A*)",
        ],
        `El teorema de Rouché-Frobenius establece que A·X=B es compatible si rango(A)=rango(A*). En un sistema homogéneo B=0, la columna ampliada es nula y no aumenta el rango:
rango(A)=rango(A*).
Además, X=0 siempre es solución. Por tanto, un sistema homogéneo nunca puede ser incompatible.`
      ),
      "b)": answer(
        "No; rango(A)≤2<3 y no puede haber solución única",
        [
          "Sí, si rango(A)=2",
          "Sí, siempre que el sistema sea homogéneo",
          "No, porque necesariamente es incompatible",
        ],
        `La matriz A tiene 2 filas y 3 columnas, de modo que el sistema tiene 2 ecuaciones y 3 incógnitas. Entonces:
rango(A)≤2<3.
Para que el sistema fuera compatible determinado, Rouché-Frobenius exigiría rango(A)=rango(A*)=3, lo cual es imposible. Si es compatible, será indeterminado.`
      ),
    },
    "mates2-algebra-3f5fc3b1d4e0-opcion-b": {
      "a)": answer(
        "X=((1,−7),(0,3))",
        [
          "X=((1,7),(0,3))",
          "X=((5,−2),(−2,1))",
          "X=((−1,7),(0,−3))",
        ],
        `Partimos de A·X+X=B y sacamos X como factor común por la derecha:
(A+I₂)X=B.
Calculamos:
A+I₂=((1,2),(2,5)),   det(A+I₂)=1.
Por tanto:
(A+I₂)⁻¹=((5,−2),(−2,1)).
Multiplicamos por la izquierda:
X=(A+I₂)⁻¹B
=((5,−2),(−2,1))·((1,−1),(2,1))
=((1,−7),(0,3)).
La comprobación directa verifica A·X+X=B.`
      ),
      "b)": answer(
        "X=((1,−4),(−1,−5)); Y=((−1,5),(2,7))",
        [
          "X=((−1,5),(2,7)); Y=((1,−4),(−1,−5))",
          "X=((1,4),(1,5)); Y=((−1,−5),(−2,−7))",
          "X=A e Y=B",
        ],
        `Resolvemos el sistema matricial como un sistema lineal. Multiplicamos la primera ecuación por 2:
4X+4Y=2A.
Restamos la segunda ecuación, 4X+3Y=B:
Y=2A−B=((−1,5),(2,7)).
Sustituimos en 2X+2Y=A:
2X=A−2Y,
X=(A−2Y)/2=B−(3/2)A=((1,−4),(−1,−5)).
Al sustituir ambas matrices se cumplen las dos ecuaciones.`
      ),
    },
    "mates2-algebra-96b820c9ff52": {
      "a)": answer(
        "Sí; A⁻¹=((1,−1,0),(0,1,0),(2,−2,−1))",
        [
          "No existe porque det(A)=0",
          "A⁻¹=((1,1,0),(0,1,0),(−2,0,−1))",
          "A⁻¹=A",
        ],
        `Calculamos el determinante mediante Sarrus:
det(A)=−1≠0.
Por tanto, A es invertible. Usamos la nomenclatura del curso:
A⁻¹=Adj(Aᵀ)/det(A).
Al calcular los adjuntos y trasponer obtenemos:
A⁻¹=((1,−1,0),(0,1,0),(2,−2,−1)).
La comprobación A·A⁻¹=I₃ confirma el resultado.`
      ),
      "b)": answer(
        "X=((−1,−1,0),(0,−1,0),(2,−2,−3))",
        [
          "X=((1,−1,0),(0,1,0),(2,−2,−1))",
          "X=((−1,1,0),(0,−1,0),(−2,2,−3))",
          "X=−2I₃",
        ],
        `Partimos de:
A·X+2A=I₃.
Sacamos A como factor común por la izquierda:
A(X+2I₃)=I₃.
Multiplicamos ambos miembros por A⁻¹ por la izquierda:
X+2I₃=A⁻¹.
Por tanto:
X=A⁻¹−2I₃
=((1,−1,0),(0,1,0),(2,−2,−1))−((2,0,0),(0,2,0),(0,0,2))
=((−1,−1,0),(0,−1,0),(2,−2,−3)).`
      ),
    },
    "mates2-algebra-6b602ef2ed12": {
      "Resultado": answer(
        "Compatible determinado solo si a=4, con (x,y)=(2,2); incompatible si a≠4",
        [
          "Compatible determinado para todo a≠−1",
          "Compatible indeterminado si a=4",
          "Compatible determinado si a=−1, con (x,y)=(2,2)",
        ],
        `De la primera ecuación obtenemos y=4−x. Sustituimos en las otras dos:
(a+1)x=10,
(a+1)x=4a−6.
Para que ambas ecuaciones sean compatibles debe cumplirse:
10=4a−6,
de donde a=4.
Para a=4:
5x=10 ⇒ x=2,   y=4−2=2.
Por tanto, rango(A)=rango(A*)=2 y el sistema es compatible determinado.
Si a≠4, las dos ecuaciones obtenidas para (a+1)x son contradictorias. En particular, para a=−1 aparece −4=6. Luego el sistema es incompatible para todo a≠4.`
      ),
    },
    "mates2-algebra-8db034ac72e7": {
      "a)": answer(
        "M=((k²−2,k−2,2k),(k−2,−1,2),(2k,2,−4))",
        [
          "M=((k²+2,k+2,2k),(k+2,1,2),(2k,2,12))",
          "M=((k²−2,k−2,2k),(k−2,−1,2),(2k,2,4))",
          "La operación no es posible por las dimensiones",
        ],
        `B es de orden 3×1, luego B·Bᵀ es de orden 3×3. A es de orden 2×3, por lo que Aᵀ·A también es de orden 3×3; la resta sí es posible.
B·Bᵀ=((k²,k,2k),(k,1,2),(2k,2,4)),
Aᵀ·A=((2,2,0),(2,2,0),(0,0,8)).
Restando elemento a elemento:
M=((k²−2,k−2,2k),(k−2,−1,2),(2k,2,−4)).`
      ),
      "b)": answer(
        "rango(M)=3 si k≠1; rango(M)=1 si k=1",
        [
          "rango(M)=3 para todo k",
          "rango(M)=2 si k=1 y 3 en los demás casos",
          "rango(M)=1 para todo k",
        ],
        `Calculamos el determinante de M mediante Sarrus y factorizamos:
det(M)=16(k−1)².
Si k≠1, det(M)≠0 y rango(M)=3.
Para k=1:
M=((−1,−1,2),(−1,−1,2),(2,2,−4)).
La segunda fila coincide con la primera y la tercera es −2 veces la primera. Como la matriz no es nula, rango(M)=1.`
      ),
    },
    "mates2-algebra-bcdf444cb323": {
      "a)": answer(
        "SCD si λ∉{−2,0,2}; SCI si λ∈{−2,0,2}; nunca es incompatible",
        [
          "SCD para todo λ",
          "Incompatible si λ∈{−2,0,2}; SCD en los demás casos",
          "SCI solo si λ=0; SCD en los demás casos",
        ],
        `Es un sistema homogéneo, de modo que siempre es compatible. La matriz de coeficientes es:
A=((λ,1,1),(1,λ,0),(3,0,λ)).
Calculamos el determinante mediante Sarrus:
det(A)=λ³−4λ=λ(λ−2)(λ+2).
Si λ∉{−2,0,2}, det(A)≠0, rango(A)=3 y el sistema es compatible determinado, con la solución trivial.
Si λ∈{−2,0,2}, det(A)=0 y rango(A)<3. Al ser homogéneo, rango(A)=rango(A*) y el sistema es compatible indeterminado.`
      ),
      "b)": answer(
        "Para λ=−2: (x,y,z)=(2t,t,3t); para λ=−3: (0,0,0)",
        [
          "Para λ=−2 solo existe la solución trivial; para λ=−3 hay infinitas",
          "Para λ=−2: (t,2t,3t); para λ=−3: (0,0,0)",
          "El sistema es incompatible para λ=−2 y para λ=−3",
        ],
        `La matriz de coeficientes es:
A=((λ,1,1),(1,λ,0),(3,0,λ)).
Su determinante, calculado mediante Sarrus, es:
det(A)=λ(λ−2)(λ+2).
Así, el sistema homogéneo es compatible indeterminado para λ∈{−2,0,2} y compatible determinado, con la solución trivial, para los demás valores.
Para λ=−2:
x−2y=0 ⇒ x=2y,
3x−2z=0 ⇒ z=3y.
Tomando y=t:
(x,y,z)=(2t,t,3t).
Para λ=−3, det(A)≠0, luego la única solución es (0,0,0).`
      ),
    },
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-analisis-ea9fbb465ba0": {
      "a)": answer(
        "f es continua en a si lim(x→a)f(x)=f(a)",
        [
          "f es continua en a si f'(a)=0",
          "f es continua en a si existen los límites laterales, aunque sean distintos",
          "f es continua en a si f(a) no existe",
        ],
        `Una función f es continua en x=a cuando se cumplen simultáneamente tres condiciones:
1. Existe f(a).
2. Existe lim(x→a)f(x), es decir, los límites laterales existen y coinciden.
3. lim(x→a)f(x)=f(a).
De forma equivalente:
lim(x→a⁻)f(x)=lim(x→a⁺)f(x)=f(a).`
      ),
      "b)": answer(
        "No está definida en a=0",
        ["No está definida en a=1", "No está definida en a=−1", "Está definida para todo x∈R"],
        `La función es:
f(x)=(e^(3x)−e^(−3x))/(4x).
Las exponenciales están definidas para todo número real. La única restricción procede del denominador:
4x=0 ⇒ x=0.
Por tanto, f no está definida en a=0.`
      ),
      "c)": answer(
        "b=3/2",
        ["b=0", "b=3", "b=−3/2"],
        `Para que g sea continua en a=0 debe cumplirse:
b=lim(x→0)f(x).
Al sustituir aparece la indeterminación 0/0, por lo que aplicamos la regla de L'Hôpital:
b=lim(x→0)(3e^(3x)+3e^(−3x))/4
=(3+3)/4=3/2.
Así, g(0)=b=3/2 y los dos límites laterales coinciden con el valor de la función.`
      ),
    },
    "mates2-analisis-ea9fbb465ba0-1b": {
      "a)": answer(
        "P₁=(−1,−4) y P₂=(2,26)",
        [
          "P₁=(−1,4) y P₂=(2,26)",
          "P₁=(1,14) y P₂=(−2,−10)",
          "Solo P=(2,26)",
        ],
        `La pendiente de la tangente es f'(x). Derivamos:
f'(x)=9+12x−4x³.
Pedimos que la pendiente sea 1:
9+12x−4x³=1
⇒ x³−3x−2=0
⇒ (x−2)(x+1)²=0.
Por tanto, x=−1 y x=2.
Calculamos las ordenadas:
f(−1)=−9+6−1=−4,
f(2)=18+24−16=26.
Los puntos son (−1,−4) y (2,26).`
      ),
      "b)": answer(
        "Los puntos de inflexión son (−1,−4) y (1,14)",
        [
          "Los puntos de inflexión son (−1,4) y (1,−14)",
          "El único punto de inflexión es (0,0)",
          "No tiene puntos de inflexión",
        ],
        `Calculamos la segunda derivada:
f''(x)=12−12x²=12(1−x²).
Se anula para x=−1 y x=1. En la recta real, f'' es negativa en (−∞,−1), positiva en (−1,1) y negativa en (1,+∞); por tanto, cambia la curvatura en ambos valores.
Además, f'''(x)=−24x no se anula en x=±1.
Las ordenadas son:
f(−1)=−4,   f(1)=9+6−1=14.
Luego los puntos de inflexión son (−1,−4) y (1,14).`
      ),
    },
    "mates2-analisis-ea9fbb465ba0-2a": {
      "Resultado": answer(
        "I=4√x−4ln(1+√x)+C",
        [
          "I=2ln(1+√x)+C",
          "I=4√x+4ln(1+√x)+C",
          "I=2x/(1+√x)+C",
        ],
        `Calculamos:
I=∫ 2/(1+√x) dx.
Hacemos el cambio t=√x. Entonces x=t² y dx=2t dt:
I=∫ 4t/(1+t) dt.
Dividimos:
t/(1+t)=1−1/(1+t).
Por tanto:
I=4∫1 dt−4∫1/(1+t) dt
=4t−4ln|1+t|+C.
Como t=√x≥0:
I=4√x−4ln(1+√x)+C.
La derivación del resultado devuelve el integrando.`
      ),
    },
    "mates2-analisis-ea9fbb465ba0-2b": {
      "a)": answer(
        "Se cortan en x=1/2 y x=2; la recta queda por encima de 1/x entre ambos puntos",
        [
          "Se cortan en x=−1/2 y x=−2",
          "Solo se cortan en x=1",
          "1/x queda por encima de la recta en todo [1/2,2]",
        ],
        `Igualamos las funciones:
1/x=−x+5/2.
Multiplicamos por 2x:
2=−2x²+5x
⇒ 2x²−5x+2=0
⇒ (2x−1)(x−2)=0.
Así, x=1/2 y x=2. En x=1:
g(1)=3/2>f(1)=1,
por lo que la recta es la función superior en [1/2,2]. Con estos puntos, las dos curvas y el recinto comprendido entre ellas se representan sin ambigüedad.`
      ),
      "b)": answer(
        "A=15/8−2ln 2",
        ["A=15/8+2ln 2", "A=2ln 2−15/8", "A=3/2−ln 2"],
        `Según la gráfica, los límites de integración son x=1/2 y x=2, y la función superior es g(x)=−x+5/2:
A=∫[1/2,2](−x+5/2−1/x) dx.
Una primitiva es:
F(x)=−x²/2+5x/2−ln x.
Aplicamos la regla de Barrow:
A=[−x²/2+5x/2−ln x]_[1/2]^2
=(3−ln2)−(9/8+ln2)
=15/8−2ln2.`
      ),
    },
    "mates2-analisis-07029fe0c9fd": {
      "Resultado": answer(
        "Los números son 6,31 y 1,69, aproximadamente",
        [
          "Los números son 4 y 4",
          "Los números son 6 y 2",
          "Los números son 7,46 y 0,54",
        ],
        `Sean x≥y≥0 los números. Como x+y=8, ponemos y=8−x, con 4≤x≤8. Debemos maximizar:
P(x)=xy(x−y)=x(8−x)(2x−8).
Derivamos:
P'(x)=−6x²+48x−64.
La ecuación P'(x)=0 da:
x=4±4√3/3.
En [4,8] queda x=4+4√3/3≈6,31. Entonces:
y=8−x=4−4√3/3≈1,69.
La derivada cambia de positiva a negativa en ese punto, por lo que es un máximo.`
      ),
    },
    "mates2-analisis-07029fe0c9fd-1b": {
      "a)": answer(
        "a=6 y b=4",
        ["a=−6 y b=4", "a=6 y b=−4", "a=2 y b=6"],
        `Dividimos el polinomio del numerador entre a−x. El término dominante del cociente es −ax, por lo que la pendiente de la asíntota oblicua es −a.
Como dicha pendiente vale −6:
−a=−6 ⇒ a=6.
La gráfica pasa por P(1,2):
f(1)=(a+b)/(a−1)=2.
Sustituimos a=6:
(6+b)/5=2 ⇒ 6+b=10 ⇒ b=4.`
      ),
      "b)": answer(
        "La asíntota vertical es x=6",
        ["La asíntota vertical es x=−6", "No existen asíntotas verticales", "Las asíntotas verticales son x=1 y x=6"],
        `Con a=6 y b=4:
f(x)=(6x²+4)/(6−x).
El denominador se anula para x=6. El numerador en ese punto vale:
6·6²+4=220≠0.
Por tanto, los límites laterales son infinitos y la asíntota vertical es x=6.`
      ),
    },
    "mates2-analisis-07029fe0c9fd-2a": {
      "Resultado": answer(
        "I=−1/(x+1)+1/[2(x+1)²]+C",
        [
          "I=1/(x+1)−1/[2(x+1)²]+C",
          "I=ln|x+1|+C",
          "I=−x/(x+1)²+C",
        ],
        `Calculamos:
I=∫ x/(x+1)³ dx.
Hacemos u=x+1; entonces x=u−1 y du=dx:
I=∫(u−1)/u³ du
=∫(u⁻²−u⁻³)du
=−u⁻¹+(1/2)u⁻²+C.
Volvemos a x:
I=−1/(x+1)+1/[2(x+1)²]+C.`
      ),
    },
    "mates2-analisis-07029fe0c9fd-2b": {
      "Resultado": answer(
        "El recinto está entre x=−1 y x=1 y su área es 4",
        [
          "El recinto está entre x=0 y x=1 y su área es 2",
          "El recinto está entre x=−1 y x=1 y su área es 2",
          "Las parábolas no encierran ningún recinto",
        ],
        `Buscamos los puntos de corte:
2x²=−x²+3
⇒ 3x²=3
⇒ x=−1 o x=1.
En ambos puntos y=2. En el intervalo [−1,1], la función superior es g(x)=−x²+3 y la inferior f(x)=2x². La gráfica muestra el recinto entre ambas parábolas.
A=∫[−1,1][(−x²+3)−2x²]dx
=∫[−1,1](3−3x²)dx.
Aplicamos Barrow:
A=[3x−x³]_[−1]^1
=(3−1)−(−3+1)=4.`
      ),
    },
    "mates2-analisis-59bdaddbdc86": {
      "Resultado": answer(
        "Existe al menos una solución en (0,π/2)",
        [
          "No existe ninguna solución real",
          "La única solución es x=0",
          "Bolzano garantiza una solución en (−π,−π/2)",
        ],
        `Teorema de Bolzano: si una función h es continua en [a,b] y h(a)·h(b)<0, entonces existe al menos un c∈(a,b) tal que h(c)=0.
Definimos:
h(x)=sen x−x²+1.
Es continua en [0,π/2]. Calculamos:
h(0)=1>0,
h(π/2)=2−π²/4<0.
Como cambia de signo, el teorema de Bolzano garantiza un c∈(0,π/2) con h(c)=0; es decir, sen c=c²−1.`
      ),
    },
    "mates2-analisis-8eda370b8447": {
      "Resultado": answer(
        "Los dos catetos miden 3/√2 m",
        ["Los catetos miden 1 m y 2√2 m", "Los dos catetos miden 3/2 m", "Los catetos miden 1,5 m y √6 m"],
        `Sean x e y los catetos. Por Pitágoras:
x²+y²=9.
El área es A=xy/2. Como (x−y)²≥0:
x²+y²≥2xy
⇒ 9≥2xy
⇒ A=xy/2≤9/4.
La igualdad se alcanza cuando x=y. Entonces:
2x²=9 ⇒ x=y=3/√2.
Por tanto, el triángulo rectángulo de área máxima es isósceles y sus dos catetos miden 3/√2 metros.`
      ),
    },
    "mates2-analisis-e38db2e9f578": {
      "Resultado": answer(
        "a=3",
        ["a=−3", "a=3/2", "a=6"],
        `La parábola es f(x)=a(x²−4), por lo que corta al eje OX en x=−2 y x=2. Para que sea cóncava hacia arriba debe cumplirse:
f''(x)=2a>0 ⇒ a>0.
En [−2,2] la parábola queda por debajo del eje. Según la gráfica:
A=∫[−2,2][0−a(x²−4)]dx
=a∫[−2,2](4−x²)dx.
Aplicamos Barrow:
A=a[4x−x³/3]_[−2]^2=32a/3.
Imponemos A=32:
32a/3=32 ⇒ a=3,
que además cumple a>0.`
      ),
    },
    "mates2-analisis-285232b2f1a1": {
      "Resultado": answer(
        "F(x)=−x²cos x+2x sen x+2cos x−2",
        [
          "F(x)=x²cos x−2x sen x+2cos x−2",
          "F(x)=−x²cos x+2x sen x+2cos x",
          "F(x)=x²sen x−2",
        ],
        `Calculamos ∫x²sen x dx por partes dos veces.
Primera integración por partes, u=x² y dv=sen x dx:
∫x²sen x dx=−x²cos x+2∫x cos x dx.
Segunda integración por partes:
∫x cos x dx=x sen x+cos x.
Por tanto:
F(x)=−x²cos x+2x sen x+2cos x+C.
Como la primitiva pasa por el origen, F(0)=0:
2+C=0 ⇒ C=−2.
Así:
F(x)=−x²cos x+2x sen x+2cos x−2.`
      ),
    },
    "mates2-analisis-646ddab07219": {
      "a)": answer(
        "No, porque f no es continua en [1,6]",
        [
          "Sí, porque f es derivable en todo R",
          "Sí, y el valor de la tesis es c=2",
          "No, porque los extremos tienen la misma imagen",
        ],
        `El teorema del valor medio de Lagrange exige que f sea continua en el intervalo cerrado y derivable en el abierto. La función:
f(x)=(1+x)/(2−x)
no está definida en x=2. Como 2∈[1,6], no es continua en todo el intervalo y no puede aplicarse el teorema.`
      ),
      "b)": answer(
        "Sí, porque f es continua en [3,11] y derivable en (3,11)",
        [
          "No, porque x=2 pertenece a [3,11]",
          "No, porque f(3)≠f(11)",
          "Sí, pero solo si f'(x)=0",
        ],
        `El único punto en el que la función no está definida es x=2. Como 2∉[3,11], f es continua en [3,11] y derivable en (3,11). Se cumplen las hipótesis del teorema del valor medio de Lagrange.`
      ),
      "c)": answer(
        "c=5",
        ["c=−1", "c=2", "c=7"],
        `Aplicamos la tesis en [3,11]:
f'(c)=[f(11)−f(3)]/(11−3).
Calculamos:
f(11)=−4/3,   f(3)=−4,
[f(11)−f(3)]/8=(8/3)/8=1/3.
Derivamos:
f'(x)=3/(2−x)².
Igualamos:
3/(2−c)²=1/3
⇒ (2−c)²=9
⇒ c=−1 o c=5.
Como c debe pertenecer a (3,11), el único valor válido es c=5.`
      ),
    },
    "mates2-analisis-f0848734ca05": {
      "a)": answer(
        "Máximo en (0,2) y mínimo en (2,2−4/e²)",
        [
          "Mínimo en (0,2) y máximo en (2,2−4/e²)",
          "Máximo en (−2,2−4e²) y mínimo en (0,2)",
          "No tiene extremos relativos",
        ],
        `Derivamos:
f'(x)=e^(−x)(x²−2x)=e^(−x)x(x−2).
Como e^(−x)>0, el signo depende de x(x−2). En la recta real:
f'>0 en (−∞,0), f'<0 en (0,2) y f'>0 en (2,+∞).
Por tanto, en x=0 la función pasa de creciente a decreciente: máximo relativo.
En x=2 pasa de decreciente a creciente: mínimo relativo.
Calculamos las ordenadas:
f(0)=2,
f(2)=2−4/e².`
      ),
      "b)": answer(
        "La asíntota horizontal por la derecha es y=2",
        ["La asíntota es y=0", "La asíntota es x=2", "No existe asíntota horizontal"],
        `Calculamos el límite:
lim(x→+∞)[2−x²e^(−x)]
=2−lim(x→+∞)x²/e^x.
La última expresión es ∞/∞. Aplicamos la regla de L'Hôpital dos veces:
lim 2x/e^x=lim 2/e^x=0.
Por tanto, lim(x→+∞)f(x)=2 y la asíntota horizontal por la derecha es y=2.`
      ),
    },
    "mates2-analisis-07af7c78fa22": {
      "a)": answer(
        "En x=2: y=−4x+8; en x=−2: y=4x+8",
        [
          "En x=2: y=4x−8; en x=−2: y=−4x−8",
          "Las dos tangentes son y=4",
          "En x=2: y=−2x+4; en x=−2: y=2x+4",
        ],
        `La función es f(x)=−x²+4 y su derivada f'(x)=−2x.
En x=2:
f(2)=0, f'(2)=−4,
y−0=−4(x−2) ⇒ y=−4x+8.
En x=−2:
f(−2)=0, f'(−2)=4,
y−0=4(x+2) ⇒ y=4x+8.
La gráfica muestra la parábola y las dos tangentes, que se cortan en (0,8).`
      ),
      "b)": answer(
        "A=16/3",
        ["A=8/3", "A=32/3", "A=4"],
        `El recinto es simétrico respecto del eje OY. En [0,2], la recta superior es y=−4x+8 y la parábola inferior y=−x²+4. Por simetría:
A=2∫[0,2][(−4x+8)−(−x²+4)]dx
=2∫[0,2](x²−4x+4)dx.
Aplicamos Barrow:
A=2[x³/3−2x²+4x]_[0]^2
=2·(8/3)=16/3.`
      ),
    },
    "mates2-analisis-49d16e4dd728": {
      "Resultado": answer(
        "−(1/8)ln(4x²+9)+(1/2)arctan(2x/3)+C",
        [
          "(1/8)ln(4x²+9)+(1/2)arctan(2x/3)+C",
          "−ln(4x²+9)+arctan(2x/3)+C",
          "−(1/8)ln(4x²+9)−(1/2)arctan(2x/3)+C",
        ],
        `Separamos:
I=∫[−x/(4x²+9)]dx+∫[3/(4x²+9)]dx.
Para la primera integral tomamos u=4x²+9, du=8x dx:
∫−x/(4x²+9)dx=−(1/8)ln(4x²+9).
En la segunda usamos la forma de la arcotangente:
∫3/(4x²+9)dx=(1/2)arctan(2x/3).
Por tanto:
I=−(1/8)ln(4x²+9)+(1/2)arctan(2x/3)+C.`
      ),
    },
    "mates2-geometria-ec013ba1d3d8": {
      "a)": answer(
        "Se cortan en P=(4,1,1)",
        [
          "Se cortan en P=(1,4,1)",
          "Son paralelas y no se cortan",
          "Se cruzan y su distancia es 1",
        ],
        `Escribimos ambas rectas en forma paramétrica.
Para r₁ tomamos y=t:
r₁: x=5−t, y=t, z=2−t.
Para r₂ tomamos x=s:
r₂: x=s, y=1, z=5−s.
En un punto común deben coincidir sus tres coordenadas. De y=t=1 obtenemos t=1. Entonces, en r₁:
x=5−1=4, z=2−1=1.
En r₂, x=s=4 y z=5−4=1.
Por tanto, las dos rectas se cortan en P=(4,1,1).`
      ),
      "b)": answer(
        "(x−4)/1=(y−1)/1=(z−1)/1",
        [
          "(x−4)/(−1)=(y−1)/1=(z−1)/(−1)",
          "x/1=y/1=z/1",
          "(x−1)/4=(y−1)/1=(z−4)/1",
        ],
        `La recta pedida pasa por el punto de intersección P=(4,1,1).
La recta r₃ viene dada por:
x−y=1, y−z=3.
Tomando y=λ:
x=1+λ, y=λ, z=λ−3.
Por tanto, un vector director de r₃ es v⃗=(1,1,1).
La recta s que pasa por P y es paralela a r₃ tiene forma paramétrica:
x=4+λ, y=1+λ, z=1+λ.
Su forma continua es:
(x−4)/1=(y−1)/1=(z−1)/1.`
      ),
    },
    "mates2-geometria-ec013ba1d3d8-opcion-b": {
      "a)": answer(
        "Son planos paralelos distintos",
        [
          "Son coincidentes",
          "Se cortan en una recta",
          "Son planos perpendiculares",
        ],
        `El plano α tiene ecuación:
α: x+y−z=1,
y vector normal n⃗α=(1,1,−1).
El plano β está dado paramétricamente por:
(x,y,z)=(1,1,2)+t(1,−1,0)+s(1,0,1).
Sus vectores directores son u⃗=(1,−1,0) y v⃗=(1,0,1). Un vector normal es:
u⃗×v⃗=(−1,−1,1),
que es paralelo a n⃗α.
Usando el punto (1,1,2), la ecuación de β es:
x+y−z=0.
Tienen el mismo vector normal pero distintos términos independientes; por tanto, son planos paralelos distintos.`
      ),
      "b)": answer(
        "d(α,β)=1/√3=√3/3",
        [
          "d(α,β)=1",
          "d(α,β)=√3",
          "d(α,β)=0",
        ],
        `Escribimos los planos con el mismo primer miembro:
α: x+y−z−1=0,
β: x+y−z=0.
La distancia entre dos planos paralelos Ax+By+Cz+D₁=0 y Ax+By+Cz+D₂=0 es:
d=|D₂−D₁|/√(A²+B²+C²).
Sustituimos:
d(α,β)=|0−(−1)|/√(1²+1²+(−1)²)
=1/√3=√3/3.`
      ),
    },
    "mates2-geometria-fcc34b36cf17": {
      "a)": answer(
        "Los tres planos se cortan en un único punto",
        [
          "Los tres planos son paralelos",
          "Los tres planos se cortan en una recta",
          "Dos son coincidentes y el tercero es paralelo",
        ],
        `Tomamos los vectores normales:
n⃗₁=(1,2,−1), n⃗₂=(3,0,−1), n⃗₃=(−1,2,1).
Calculamos el determinante de la matriz de coeficientes mediante Sarrus:
D=|1  2  −1; 3  0  −1; −1  2  1|=−8.
Como D≠0, el sistema formado por las ecuaciones de los tres planos es compatible determinado. Por tanto, los tres planos se cortan en un único punto.`
      ),
      "b)": answer(
        "α=arccos(2/√15)",
        [
          "α=arccos(1/√15)",
          "α=90°",
          "α=arccos(4/15)",
        ],
        `El ángulo entre dos planos es el ángulo agudo entre sus vectores normales:
cos α=|n⃗₁·n⃗₂|/(|n⃗₁|·|n⃗₂|).
Calculamos:
n⃗₁·n⃗₂=1·3+2·0+(−1)(−1)=4,
|n⃗₁|=√(1²+2²+(−1)²)=√6,
|n⃗₂|=√(3²+0²+(−1)²)=√10.
Así:
cos α=4/(√6·√10)=4/√60=2/√15.
Por tanto, α=arccos(2/√15).`
      ),
    },
    "mates2-geometria-fcc34b36cf17-opcion-b": {
      "a)": answer(
        "π: y−z=0",
        [
          "π: x+y+z−5=0",
          "π: y+z−2=0",
          "π: 2x−3y+7z−10=0",
        ],
        `Formamos dos vectores del plano:
AB⃗=B−A=(−3,1,1),
AC⃗=C−A=(−4,−2,−2).
Un vector normal es el producto vectorial:
AB⃗×AC⃗=(0,−10,10),
que podemos simplificar a n⃗=(0,−1,1).
La ecuación del plano que pasa por A=(3,1,1) es:
0(x−3)−(y−1)+(z−1)=0.
Simplificando:
π: y−z=0.`
      ),
      "b)": answer(
        "d(P,π)=2√2",
        [
          "d(P,π)=4",
          "d(P,π)=√2",
          "d(P,π)=2",
        ],
        `El plano es π: y−z=0 y P=(0,0,4).
Aplicamos la fórmula de la distancia de un punto a un plano:
d(P,π)=|0·0+1·0−1·4+0|/√(0²+1²+(−1)²)
=4/√2=2√2.`
      ),
    },
    "mates2-geometria-ced5240c492d": {
      "a)": answer(
        "Las rectas se cruzan y sus direcciones son perpendiculares",
        [
          "Las rectas se cortan en (1,1,0)",
          "Las rectas son paralelas",
          "Las rectas son coincidentes",
        ],
        `Escribimos las rectas en forma paramétrica:
r: (x,y,z)=(t,t,4), con vector director u⃗=(1,1,0),
s: (x,y,z)=(λ,2−λ,0), con vector director v⃗=(1,−1,0).
Los vectores directores no son proporcionales, por lo que no son paralelas.
Además, en r siempre z=4 y en s siempre z=0; por tanto, no pueden cortarse.
Luego las rectas se cruzan.
Como u⃗·v⃗=1−1=0, sus direcciones son perpendiculares.`
      ),
      "b)": answer(
        "R=(1,1,4), S=(1,1,0) y la distancia mínima es 4",
        [
          "R=(0,0,4), S=(0,2,0) y la distancia es 2√5",
          "R=(1,1,0), S=(1,1,4) y la distancia es 1",
          "R=(2,2,4), S=(2,0,0) y la distancia es 2",
        ],
        `Sean:
R=(t,t,4)∈r, S=(λ,2−λ,0)∈s.
El segmento de mínima distancia debe ser perpendicular a ambas rectas. Por tanto:
RS⃗=(λ−t,2−λ−t,−4).
Imponemos RS⃗·u⃗=0:
(λ−t)+(2−λ−t)=0 ⇒ 2−2t=0 ⇒ t=1.
Imponemos RS⃗·v⃗=0:
(λ−t)−(2−λ−t)=0 ⇒ 2λ−2=0 ⇒ λ=1.
Así:
R=(1,1,4), S=(1,1,0).
La distancia mínima es |RS⃗|=|(0,0,−4)|=4.`
      ),
    },
    "mates2-geometria-c96dfd0f65be": {
      "a)": answer(
        "No existe un plano paralelo a π que contenga a r₁",
        [
          "Sí; es x+y+z=1",
          "Sí; es x+y+z=3",
          "Sí; cualquier plano paralelo a π contiene a r₁",
        ],
        `El plano π tiene vector normal n⃗=(1,1,1).
La recta r₁ tiene vector director u⃗₁=(1,−1,2).
Para que una recta esté contenida en un plano paralelo a π, su vector director debe ser perpendicular a n⃗.
Calculamos:
u⃗₁·n⃗=1−1+2=2≠0.
Por tanto, r₁ no puede estar contenida en ningún plano paralelo a π.`
      ),
      "b)": answer(
        "Sí existe un plano paralelo a π que contiene a r₂",
        [
          "No existe porque r₂ corta a π",
          "No existe porque su vector director es paralelo al normal",
          "Solo existe si s=0",
        ],
        `La recta r₂ tiene vector director u⃗₂=(1,−1,0).
Comprobamos:
u⃗₂·n⃗=1−1+0=0.
Por tanto, la dirección de r₂ es paralela al plano π y sí existe un plano paralelo a π que contiene a r₂.`
      ),
      "c)": answer(
        "El plano es x+y+z=3",
        [
          "El plano es x+y+z=2",
          "El plano es x+y+z=1",
          "El plano es x−y+z=3",
        ],
        `Todo plano paralelo a π tiene la forma:
x+y+z=d.
Tomamos un punto de r₂. Para s=0 obtenemos P=(1,0,2).
Sustituimos P:
1+0+2=d ⇒ d=3.
Por tanto, el plano paralelo a π que contiene a r₂ es:
x+y+z=3.`
      ),
    },
    "mates2-geometria-3f1c4984d38e": {
      "a)": answer(
        "π: x+2z−5=0",
        [
          "π: x−2z+3=0",
          "π: 2x+y−4=0",
          "π: x+y+z−4=0",
        ],
        `Pasamos la recta a forma paramétrica:
(x−1)/2=y+2=(z−2)/(−1)=t,
de donde:
x=1+2t, y=−2+t, z=2−t.
Un punto de r es A=(1,−2,2) y un vector director v⃗=(2,1,−1).
El punto dado es P=(1,1,2), por lo que:
AP⃗=P−A=(0,3,0).
Un vector normal del plano es:
n⃗=v⃗×AP⃗=(3,0,6), que simplificamos a (1,0,2).
El plano que pasa por A es:
(x−1)+2(z−2)=0,
es decir, π: x+2z−5=0.`
      ),
      "b)": answer(
        "d(P,r)=√30/2",
        [
          "d(P,r)=3",
          "d(P,r)=√5",
          "d(P,r)=3√6",
        ],
        `Usamos A=(1,−2,2)∈r, P=(1,1,2), AP⃗=(0,3,0) y v⃗=(2,1,−1).
La distancia de un punto a una recta es:
d(P,r)=|AP⃗×v⃗|/|v⃗|.
Calculamos:
AP⃗×v⃗=(−3,0,−6),
|AP⃗×v⃗|=3√5,
|v⃗|=√6.
Por tanto:
d(P,r)=3√5/√6=√30/2.`
      ),
    },
    "mates2-geometria-ccae15a1a68b": {
      "a)": answer(
        "Área=√62/2",
        [
          "Área=√62",
          "Área=62/2",
          "Área=7/2",
        ],
        `Formamos:
AB⃗=B−A=(−2,1,1),
AC⃗=C−A=(−3,−2,0).
El área del triángulo es la mitad del módulo del producto vectorial:
AB⃗×AC⃗=(2,−3,7),
|AB⃗×AC⃗|=√(2²+(−3)²+7²)=√62.
Por tanto:
Área=|AB⃗×AC⃗|/2=√62/2.`
      ),
      "b)": answer(
        "Sí forman un tetraedro y su volumen es 7/2",
        [
          "No forman un tetraedro porque son coplanarios",
          "Sí forman un tetraedro y su volumen es 7",
          "Sí forman un tetraedro y su volumen es 21",
        ],
        `Añadimos el vector:
AD⃗=D−A=(−3,−2,−3).
Calculamos el producto mixto:
[AB⃗,AC⃗,AD⃗]=(AB⃗×AC⃗)·AD⃗
=(2,−3,7)·(−3,−2,−3)=−21.
Como el producto mixto es distinto de cero, los cuatro puntos no son coplanarios y forman un tetraedro.
Su volumen es:
V=|[AB⃗,AC⃗,AD⃗]|/6=21/6=7/2.`
      ),
    },
  });
})();

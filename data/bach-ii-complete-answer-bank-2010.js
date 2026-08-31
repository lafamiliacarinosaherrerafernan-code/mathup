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
  const insertCcssAfter = (block, referenceId, exercise) => {
    const list = ccssBlock(block);
    if (list.some((item) => item.id === exercise.id)) return;
    const index = list.findIndex((item) => item.id === referenceId);
    list.splice(index < 0 ? list.length : index + 1, 0, exercise);
  };

  // Recuperamos apartados que quedaron absorbidos por el enunciado al importar.
  for (const id of [
    "mates2-algebra-198234da684f",
    "mates2-algebra-4f7d267572f4",
    "mates2-algebra-fb5c41919964",
    "mates2-algebra-9b42223deea8",
  ]) {
    const exercise = matesBlock("algebra").find((item) => item.id === id);
    if (exercise && !exercise.parts?.some((part) => part.label === "a)")) {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
  }

  // El último enunciado de Álgebra contiene tres determinantes independientes.
  {
    const exercise = matesBlock("algebra").find(
      (item) => item.id === "mates2-algebra-1de299cf15a0"
    );
    if (exercise) {
      exercise.parts = [
        makePart("a)", [
          paragraph("a) Calcula el primer determinante indicado en el enunciado."),
        ]),
        makePart("b)", [
          paragraph("b) Calcula el segundo determinante indicado en el enunciado."),
        ]),
        makePart("c)", [
          paragraph("c) Calcula el tercer determinante indicado en el enunciado."),
        ]),
      ];
    }
  }

  const insertAfter = (block, referenceId, exercise) => {
    const list = matesBlock(block);
    if (list.some((item) => item.id === exercise.id)) return;
    const index = list.findIndex((item) => item.id === referenceId);
    list.splice(index < 0 ? list.length : index + 1, 0, exercise);
  };

  // En Análisis 2010 cada página importada reunía los ejercicios 1º y 2º.
  // Los separamos para que el historial de variedad los trate como ejercicios
  // oficiales independientes.
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-2b38356d1326"
    );
    if (exercise) {
      if (!exercise.parts.some((part) => part.label === "a)")) {
        exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
      }
      const partC = exercise.parts.find((part) => part.label === "c)");
      const areaStatement = copy(partC?.paragraphs?.slice(1) || []);
      if (partC) partC.paragraphs = copy(partC.paragraphs.slice(0, 1));
      const areaPart = copy(exercise.parts.findLast((part) => part.label === "b)"));
      exercise.parts = copy(exercise.parts.slice(0, 3));
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-area`,
        statement: areaStatement,
        parts: [
          makePart("a)", areaStatement),
          makePart("b)", copy(areaPart?.paragraphs || [])),
        ],
      });
    }
  }

  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-e1a5e5443263"
    );
    const merged = exercise?.parts?.find((part) => part.label === "b)");
    if (exercise && merged?.paragraphs?.length > 1) {
      const integralStatement = copy(merged.paragraphs.slice(1));
      merged.paragraphs = copy(merged.paragraphs.slice(0, 1));
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-integral`,
        statement: integralStatement,
        parts: [makePart("Resultado", [])],
      });
    }
  }

  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-22b9f23eb671"
    );
    if (exercise) {
      if (!exercise.parts.some((part) => part.label === "a)")) {
        exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
      }
      const firstB = exercise.parts.find((part) => part.label === "b)");
      const secondStatement = copy(firstB?.paragraphs?.slice(1) || []);
      if (firstB) firstB.paragraphs = copy(firstB.paragraphs.slice(0, 1));
      const secondB = copy(exercise.parts.findLast((part) => part.label === "b)"));
      exercise.parts = copy(exercise.parts.slice(0, 2));
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-integral`,
        statement: secondStatement,
        parts: [
          makePart("a)", secondStatement),
          makePart("b)", copy(secondB?.paragraphs || [])),
        ],
      });
    }
  }

  for (const [id, suffix] of [
    ["mates2-analisis-8faf38c754c2", "integral"],
    ["mates2-analisis-1211c99a0439", "integral"],
    ["mates2-analisis-0e5ccf371575", "area"],
  ]) {
    const exercise = matesBlock("analisis").find((item) => item.id === id);
    const merged = exercise?.parts?.find((part) => part.label === "b)");
    if (exercise && merged?.paragraphs?.length > 1) {
      const splitAt = merged.paragraphs.findIndex((item) =>
        String(item.plain || "").trim().startsWith("2")
      );
      if (splitAt >= 0) {
        const secondStatement = copy(merged.paragraphs.slice(splitAt));
        merged.paragraphs = copy(merged.paragraphs.slice(0, splitAt));
        insertAfter("analisis", exercise.id, {
          ...copy(exercise),
          id: `${exercise.id}-${suffix}`,
          statement: secondStatement,
          parts: [makePart("Resultado", [])],
        });
      }
    }
  }

  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-13961a5043be"
    );
    const merged = exercise?.parts?.find((part) => part.label === "b)");
    if (exercise && merged?.paragraphs?.length > 1) {
      const areaStatement = copy(merged.paragraphs.slice(1));
      merged.paragraphs = copy(merged.paragraphs.slice(0, 1));
      const areaB = copy(exercise.parts.findLast((part) => part.label === "b)"));
      exercise.parts = copy(exercise.parts.slice(0, 2));
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-area`,
        statement: areaStatement,
        parts: [
          makePart("a)", areaStatement),
          makePart("b)", copy(areaB?.paragraphs || [])),
        ],
      });
    }
  }

  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-0d9f00f8848d"
    );
    if (exercise?.statement?.length > 1) {
      const integralStatement = copy(exercise.statement.slice(1));
      exercise.statement = copy(exercise.statement.slice(0, 1));
      exercise.parts = [makePart("Resultado", [])];
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-integral`,
        statement: integralStatement,
        parts: [makePart("Resultado", [])],
      });
    }
  }

  for (const [id, text] of [
    [
      "mates2-geometria-04150d72d1c7",
      "a) Estudia la posición relativa de la recta r y el plano π.",
    ],
    [
      "mates2-geometria-6e15005dc8ce",
      "a) Comprueba que las direcciones de las rectas r y r' son perpendiculares.",
    ],
  ]) {
    const exercise = matesBlock("geometria").find((item) => item.id === id);
    if (exercise && !exercise.parts.some((part) => part.label === "a)")) {
      exercise.parts.unshift(makePart("a)", [paragraph(text)]));
    }
  }

  // En CCSS II varias páginas reunían el ejercicio 1 (matrices) y el 3
  // (programación lineal). Los convertimos en entradas independientes.
  for (const [id, matrixPartCount] of [
    ["ccss2-algebra-9b3472a31daa", 2],
    ["ccss2-algebra-baf1e75afa96", 3],
    ["ccss2-algebra-39db5c93d880", 3],
    ["ccss2-algebra-8fabffdf94d9", 3],
  ]) {
    const exercise = ccssBlock("algebra").find((item) => item.id === id);
    if (!exercise || exercise.parts.length <= matrixPartCount) continue;
    const merged = exercise.parts[matrixPartCount - 1];
    const programStatement = copy(merged?.paragraphs?.slice(1) || []);
    if (merged) merged.paragraphs = copy(merged.paragraphs.slice(0, 1));
    const programParts = copy(exercise.parts.slice(matrixPartCount));
    exercise.parts = copy(exercise.parts.slice(0, matrixPartCount));
    insertCcssAfter("algebra", id, {
      ...copy(exercise),
      id: `${id}-programacion`,
      statement: programStatement,
      parts: programParts,
    });
  }

  // Recuperamos apartados finales que estaban unidos al apartado c).
  for (const [id, labels] of [
    ["ccss2-analisis-b5a433aeacad", ["d)", "e)"]],
    ["ccss2-analisis-14945b522519", ["d)"]],
    ["ccss2-analisis-c2cb3b5fe7e3", ["d)", "e)"]],
  ]) {
    const exercise = ccssBlock("analisis").find((item) => item.id === id);
    const partC = exercise?.parts?.find((part) => part.label === "c)");
    if (!exercise || !partC || partC.paragraphs.length < 2) continue;
    const extra = copy(partC.paragraphs.slice(1));
    partC.paragraphs = copy(partC.paragraphs.slice(0, 1));
    labels.forEach((label, index) => {
      if (!exercise.parts.some((part) => part.label === label) && extra[index]) {
        exercise.parts.push(makePart(label, [extra[index]]));
      }
    });
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-198234da684f": {
      "a)": answer(
        "Si k≠1 y k≠−2 es SCD; si k=1 es SCI; si k=−2 es SI",
        [
          "Si k≠1 es SCD y si k=1 es SCI",
          "Si k=−2 es SCI y en los demás casos es SCD",
          "Es compatible determinado para todo k",
        ],
        `La matriz de coeficientes es
A=(k 1 1; 1 k 1; 1 1 k).

Calculamos su determinante mediante Sarrus:
det(A)=k³−3k+2=(k−1)²(k+2).

Por tanto, si k≠1 y k≠−2, det(A)≠0 y
rg(A)=rg(A*)=3.
Por Rouché-Frobenius, el sistema es compatible determinado.

Si k=1, las tres ecuaciones coinciden:
x+y+z=1.
Entonces rg(A)=rg(A*)=1<3 y el sistema es compatible indeterminado.

Si k=−2, al sumar las tres ecuaciones el primer miembro vale 0, pero el segundo vale −6. Aparece la contradicción 0=−6, de modo que
rg(A)<rg(A*) y el sistema es incompatible.`
      ),
      "b)": answer(
        "(x,y,z)=(s,t,1−s−t), con s,t∈ℝ",
        [
          "(x,y,z)=(1,1,1)",
          "(x,y,z)=(t,1−t,0), con t∈ℝ",
          "No tiene solución",
        ],
        `Para k=1 las tres ecuaciones se reducen a:
x+y+z=1.

Tomamos dos incógnitas libres:
x=s, y=t.

Despejamos la tercera:
z=1−s−t.

Resultado:
(x,y,z)=(s,t,1−s−t), con s,t∈ℝ.`
      ),
    },

    "mates2-algebra-2bd5d9c32d30": {
      Resultado: answer(
        "a=1, b=−2, c=4",
        ["a=−1, b=2, c=4", "a=1, b=−2, c=5", "a=2, b=−1, c=4"],
        `Sean
A=(2 1; 0 1),
B=(2 a−3; b+2 c).

Calculamos AB y BA y comparamos sus entradas. De AB=BA obtenemos:
b=−2,
c=5−a.

Como b+2=0, el determinante de B es:
det(B)=2c−(a−3)(b+2)=2c.

Imponemos det(B)=8:
2c=8 ⇒ c=4.

Sustituimos en c=5−a:
4=5−a ⇒ a=1.

Resultado: a=1, b=−2, c=4.`
      ),
    },

    "mates2-algebra-093420513872": {
      "a)": answer(
        "Existe M⁻¹ si λ≠−1 y λ≠−2",
        [
          "Existe M⁻¹ para todo λ",
          "Existe M⁻¹ solo si λ=−1 o λ=−2",
          "Existe M⁻¹ si λ≠0",
        ],
        `Calculamos el determinante de M mediante la regla de Sarrus:

det(M)=λ²+3λ+2
=(λ+1)(λ+2).

Una matriz cuadrada posee inversa exactamente cuando su determinante es distinto de cero:
(λ+1)(λ+2)≠0.

Resultado: existe M⁻¹ para λ≠−1 y λ≠−2.`
      ),
      "b)": answer(
        "X=(−2 0 0; 12 2 −4; −9 −1 3)",
        [
          "X=(2 0 0; 12 −2 4; 9 1 −3)",
          "X=(−2 0 0; 6 1 −2; −9 −1 3)",
          "La ecuación no tiene solución",
        ],
        `Para λ=0:
M=(0 0 −1; 4 3 0; 2 1 −3).

Como det(M)=2≠0, podemos multiplicar a la derecha por M⁻¹:
X·M=2F
⇒ X=2F·M⁻¹.

Calculamos M⁻¹ mediante determinantes y efectuamos el producto. Se obtiene:
X=(−2 0 0; 12 2 −4; −9 −1 3).

Comprobación:
X·M=(0 0 2; 0 2 0; 2 0 0)=2F.

Por tanto, la matriz indicada es la solución única.`
      ),
    },

    "mates2-algebra-4f7d267572f4": {
      "a)": answer(
        "Si λ≠2 es SCD; si λ=2 es SI",
        [
          "Si λ=2 es SCI; si λ≠2 es SCD",
          "Es SCD para todo λ",
          "Si λ=−2 es SI; si λ≠−2 es SCD",
        ],
        `La matriz de coeficientes es:
A=(2 1 λ; 1 −2 1; 1 3 1).

Calculamos mediante Sarrus:
det(A)=5(λ−2).

Si λ≠2, det(A)≠0, por lo que
rg(A)=rg(A*)=3.
El sistema es compatible determinado.

Para λ=2, la tercera fila de coeficientes cumple:
F₃=F₁−F₂.
Sin embargo, en la columna de términos independientes sería necesario
10=0−0, lo cual es falso.

Así, rg(A)<rg(A*) y el sistema es incompatible.

Resultado: SCD si λ≠2 y SI si λ=2.`
      ),
      "b)": answer(
        "(x,y,z)=(2,2,2)",
        ["(x,y,z)=(1,2,3)", "(x,y,z)=(2,−2,2)", "No tiene solución"],
        `Para λ=−3 el sistema es:
{ 2x+y−3z=0
  x−2y+z=0
  x+3y+z=10 }.

Restamos la segunda ecuación de la tercera:
5y=10 ⇒ y=2.

Sustituimos en la segunda:
x−4+z=0 ⇒ x+z=4.

Sustituimos y=2 en la primera:
2x+2−3z=0 ⇒ 2x−3z=−2.

Con x=4−z:
2(4−z)−3z=−2
⇒ 8−5z=−2
⇒ z=2,
y entonces x=2.

Resultado: (x,y,z)=(2,2,2).`
      ),
    },

    "mates2-algebra-fb5c41919964": {
      "a)": answer(
        "Si k≠−4 es SCD; si k=−4 es SCI",
        [
          "Si k=−4 es SI; si k≠−4 es SCD",
          "Es SCD para todo k",
          "Si k=4 es SCI; si k≠4 es SCD",
        ],
        `La matriz de coeficientes es:
A=(1 100 −1; 1 −100 2; 1 300 k).

Hacemos:
F₂←F₂−F₁,
F₃←F₃−F₁.

Entonces:
det(A)=−200(k+4).

Si k≠−4, det(A)≠0 y el sistema es compatible determinado.

Si k=−4, en la matriz de coeficientes se cumple:
F₃=2F₁−F₂.
La misma relación se cumple en los términos independientes:
200=2·100−0.

Por tanto,
rg(A)=rg(A*)=2<3,
y el sistema es compatible indeterminado.`
      ),
      "b)": answer(
        "(x,y,z)=(50−t/2, 1/2+3t/200, t), t∈ℝ",
        [
          "(x,y,z)=(50+t/2, 1/2−3t/200, t)",
          "(x,y,z)=(50,1/2,0) únicamente",
          "No tiene solución",
        ],
        `El caso compatible indeterminado corresponde a k=−4. Tomamos z=t.

Usamos las dos ecuaciones independientes:
{ x+100y−z=100
  x−100y+2z=0 }.

Restamos la segunda de la primera:
200y−3z=100.

Sustituimos z=t:
200y=100+3t
⇒ y=1/2+3t/200.

De la segunda ecuación:
x=100y−2t
=100(1/2+3t/200)−2t
=50−t/2.

Resultado:
(x,y,z)=(50−t/2, 1/2+3t/200, t), t∈ℝ.`
      ),
    },

    "mates2-algebra-9b42223deea8": {
      "a)": answer(
        "X=B(A+2I)⁻¹, si A+2I es invertible",
        [
          "X=(A+2I)⁻¹B",
          "X=B−2A",
          "X=A⁻¹(B−2I)",
        ],
        `Partimos de:
X·A=B−2X.

Pasamos los términos con X al mismo miembro:
X·A+2X=B.

Escribimos 2X=X·(2I) y sacamos factor común por la derecha:
X(A+2I)=B.

Si A+2I es invertible, multiplicamos a la derecha por su inversa:
X(A+2I)(A+2I)⁻¹=B(A+2I)⁻¹.

Por tanto:
X=B(A+2I)⁻¹.`
      ),
      "b)": answer(
        "X=(1 0 1; 0 1 2; 0 2 1)",
        [
          "X=(1 0 0; 0 1 0; 0 0 1)",
          "X=(1 0 1; 0 2 1; 0 1 2)",
          "X=(0 1 1; 1 0 2; 2 1 0)",
        ],
        `Calculamos:
A+2I=(3 1 0; 0 2 1; 1 0 2).

Su determinante es 13≠0, así que tiene inversa. La calculamos mediante:
(A+2I)⁻¹=Adj((A+2I)ᵀ)/det(A+2I).

Después efectuamos el producto indicado en el apartado anterior:
X=B(A+2I)⁻¹.

El resultado es:
X=(1 0 1; 0 1 2; 0 2 1).

Comprobamos sustituyendo:
X·A=B−2X.
Ambos miembros dan la misma matriz, por lo que la solución es correcta.`
      ),
    },

    "mates2-algebra-f1ed56e9f8b7": {
      "a)": answer(
        "rg(M−λN)=3 si λ≠1",
        [
          "rg(M−λN)=3 para todo λ",
          "rg(M−λN)=3 solo si λ=1",
          "rg(M−λN)=3 si λ≠−1",
        ],
        `Como M−λN es una matriz cuadrada de orden 3, tiene rango 3 exactamente cuando su determinante no es cero.

Calculamos:
det(M−λN)=6(λ−1)².

Por tanto:
6(λ−1)²≠0 ⇔ λ≠1.

Resultado: rg(M−λN)=3 si λ≠1.`
      ),
      "b)": answer(
        "X=(0 1 1; 0 1 1; −1 0 1), Y=(1 −1 −1; 0 −1 0; 3 0 0)",
        [
          "X=M−N, Y=2N−M",
          "X=(M+N)/2, Y=(N−M)/2",
          "El sistema matricial no tiene solución",
        ],
        `Escribimos juntas las dos ecuaciones:
{ 3X+Y=M
  X+Y=N }.

Restamos la segunda de la primera:
2X=M−N
⇒ X=(M−N)/2.

Sustituimos en X+Y=N:
Y=N−X
=N−(M−N)/2
=(3N−M)/2.

Calculamos las matrices:
X=(0 1 1; 0 1 1; −1 0 1),
Y=(1 −1 −1; 0 −1 0; 3 0 0).

Comprobación:
3X+Y=M y X+Y=N.`
      ),
    },

    "mates2-algebra-1de299cf15a0": {
      "a)": answer(
        "3",
        ["10", "30", "1"],
        `El determinante original vale 10.

En el nuevo determinante:
- la primera fila es tres veces la primera original;
- la segunda fila es la mitad de la segunda original;
- la tercera fila es la quinta parte de la tercera original.

Por la propiedad de linealidad:
D₁=3·(1/2)·(1/5)·10=3.

Resultado: D₁=3.`
      ),
      "b)": answer(
        "10",
        ["−10", "20", "5"],
        `Partimos del determinante original, que vale 10.

Intercambiamos las columnas primera y segunda: el determinante cambia de signo y vale −10.

Después intercambiamos las dos primeras filas: vuelve a cambiar de signo.

Por tanto:
D₂=−(−10)=10.

Resultado: D₂=10.`
      ),
      "c)": answer(
        "10",
        ["15", "50", "0"],
        `En la primera fila se ha sumado (1,1,1).

Como la tercera fila original es (5,5,5), se cumple:
(1,1,1)=(1/5)F₃.

Sumar a una fila un múltiplo de otra fila no cambia el determinante:
F₁←F₁+(1/5)F₃.

Por tanto, el nuevo determinante conserva el valor original:
D₃=10.`
      ),
    },

    "mates2-analisis-2b38356d1326": {
      "a)": answer(
        "Si f es continua en [a,b] y f(a)·f(b)<0, existe c∈(a,b) con f(c)=0",
        [
          "Si f es derivable, alcanza siempre un máximo en (a,b)",
          "Si f(a)=f(b), existe c con f′(c)=0",
          "Toda función continua tiene una única raíz",
        ],
        `Teorema de Bolzano:
si una función f es continua en el intervalo cerrado [a,b] y toma valores de signo contrario en sus extremos, es decir,
f(a)·f(b)<0,
entonces existe al menos un punto c∈(a,b) tal que f(c)=0.

El teorema garantiza existencia, pero no afirma que la raíz sea única.`
      ),
      "b)": answer(
        "No, porque f(x)=1/(1+x²)>0 para todo x∈ℝ",
        [
          "Sí, en cualquier intervalo",
          "Sí, únicamente en [−1,1]",
          "No, porque la función no es continua",
        ],
        `La función
f(x)=1/(1+x²)
es continua en todo ℝ, ya que 1+x²>0.

Además:
f(x)>0 para todo x∈ℝ.

Por tanto, no existen extremos a y b para los que f(a) y f(b) tengan signos contrarios. No puede aplicarse Bolzano para asegurar un cero de esta función; de hecho, f no se anula nunca.`
      ),
      "c)": answer(
        "Se cortan al menos una vez en (0,1)",
        [
          "No se cortan",
          "Solo se cortan en x=0",
          "Se cortan al menos una vez en (−1,0)",
        ],
        `Buscamos los puntos de corte de
f(x)=1/(1+x²)
y g(x)=2x−1.

Definimos:
h(x)=f(x)−g(x).
La función h es continua en [0,1].

Calculamos:
h(0)=1−(−1)=2>0,
h(1)=1/2−1=−1/2<0.

Como h cambia de signo, por el teorema de Bolzano existe al menos un c∈(0,1) tal que h(c)=0. En ese punto f(c)=g(c), por lo que las gráficas se cortan.`
      ),
    },

    "mates2-analisis-2b38356d1326-area": {
      "a)": answer(
        "Se cortan en (−1,1) y (3,5)",
        [
          "Se cortan en (0,5) y (2,5)",
          "Se cortan solo en (1,7)",
          "No se cortan",
        ],
        `Igualamos las parábolas:
−x²+3x+5=x²−x−1.

Pasamos todos los términos a un miembro:
2x²−4x−6=0
⇒ x²−2x−3=0
⇒ (x−3)(x+1)=0.

Así, x=−1 o x=3.

Sustituyendo en cualquiera de las funciones:
f(−1)=1,
f(3)=5.

Los puntos de corte son (−1,1) y (3,5). Para representarlas se usan también sus vértices y ejes de simetría.`
      ),
      "b)": answer(
        "A=64/3 unidades cuadradas",
        ["A=32/3", "A=64", "A=16/3"],
        `Entre x=−1 y x=3, la función superior es
f(x)=−x²+3x+5,
y la inferior es
g(x)=x²−x−1.

Por tanto:
A=∫₋₁³[f(x)−g(x)]dx
=∫₋₁³(−2x²+4x+6)dx.

Una primitiva es:
F(x)=−(2/3)x³+2x²+6x.

Aplicamos la regla de Barrow:
A=F(3)−F(−1)
=18−(−10/3)
=64/3.

Resultado: A=64/3 unidades cuadradas. La región se representa sombreando exclusivamente el recinto entre ambas parábolas desde x=−1 hasta x=3.`
      ),
    },

    "mates2-analisis-e1a5e5443263": {
      "a)": answer(
        "En t=√2 segundos",
        ["En t=0", "En t=2", "En t=3"],
        `La velocidad es:
v(t)=(t²+2t)e^(−t).

Derivamos:
v′(t)=e^(−t)(2t+2)−e^(−t)(t²+2t)
=e^(−t)(2−t²).

Como e^(−t)>0, el signo depende de 2−t²:
- v′(t)>0 si 0≤t<√2;
- v′(t)<0 si t>√2.

La recta de signos cambia de + a − en t=√2, luego allí hay un máximo. La comparación con los extremos 0 y 3 confirma que es el máximo del intervalo.

Resultado: t=√2 segundos.`
      ),
      "b)": answer(
        "El límite es 0 m/s: la partícula tiende a detenerse",
        [
          "El límite es 1 m/s",
          "El límite es +∞",
          "El límite es 2 m/s",
        ],
        `Calculamos:
lim(t→∞)(t²+2t)e^(−t)
=lim(t→∞)(t²+2t)/e^t.

Es una indeterminación ∞/∞. Aplicamos L'Hôpital:
lim (2t+2)/e^t.

Sigue siendo ∞/∞; aplicamos L'Hôpital otra vez:
lim 2/e^t=0.

Resultado: la velocidad tiende a 0 m/s. Interpretación: con el paso del tiempo la partícula se aproxima al reposo.`
      ),
    },

    "mates2-analisis-e1a5e5443263-integral": {
      Resultado: answer(
        "arctg(sen x)+C",
        [
          "ln|1+sen²x|+C",
          "arctg(cos x)+C",
          "sen x/(1+sen²x)+C",
        ],
        `Calculamos:
I=∫ cos x/(1+sen²x) dx.

Hacemos el cambio:
y=sen x,
dy=cos x dx.

Entonces:
I=∫ 1/(1+y²) dy
=arctg(y)+C.

Deshacemos el cambio:
I=arctg(sen x)+C.

Comprobación: al derivar se obtiene cos x/(1+sen²x).`
      ),
    },

    "mates2-analisis-22b9f23eb671": {
      "a)": answer(
        "f′(a)=lim(h→0)[f(a+h)−f(a)]/h, si el límite existe y es finito",
        [
          "f′(a)=f(a)/a",
          "f′(a)=lim(x→∞)f(x)",
          "f′(a)=f(a+h)−f(a)",
        ],
        `La derivada de f en el punto a se define mediante el límite:
f′(a)=lim(h→0) [f(a+h)−f(a)]/h,
si dicho límite existe y es finito.

Geométricamente, f′(a) es la pendiente de la recta tangente a la gráfica de f en el punto (a,f(a)).`
      ),
      "b)": answer(
        "a=1/2, b=−1/4, c=3/4",
        [
          "a=1, b=−1/2, c=1",
          "a=−1/2, b=1/4, c=1/4",
          "a=1/2, b=1/4, c=3/4",
        ],
        `Estudiamos primero la continuidad en x=0.

Límite por la izquierda:
lim(x→0⁻)(ax+sen x)/(2x−x²)
=lim(x→0⁻)(a+cos x)/(2−2x)
=(a+1)/2,
donde hemos aplicado L'Hôpital a la forma 0/0.

Por la derecha y en el punto:
lim(x→0⁺)(bx+c)=c=f(0).

Luego:
c=(a+1)/2.  (1)

Continuidad en x=1:
lim(x→1⁻)(bx+c)=b+c,
lim(x→1⁺)1/(1+x)=1/2=f(1).
Por tanto:
b+c=1/2.  (2)

Derivabilidad en x=1:
la derivada de bx+c es b y la de 1/(1+x) es −1/(1+x)².
Así:
b=−1/4.  (3)

Resolvemos conjuntamente (1), (2) y (3):
b=−1/4,
c=3/4,
a=1/2.

Resultado: a=1/2, b=−1/4, c=3/4.`
      ),
    },

    "mates2-analisis-22b9f23eb671-integral": {
      "a)": answer(
        "Dom(f)=[−1/2,+∞)",
        [
          "Dom(f)=ℝ",
          "Dom(f)=(−1/2,+∞)",
          "Dom(f)=(−∞,−1/2]",
        ],
        `La función es:
f(x)=√(2x+1).

El radicando de una raíz cuadrada debe ser no negativo:
2x+1≥0
⇒ 2x≥−1
⇒ x≥−1/2.

Resultado:
Dom(f)=[−1/2,+∞).`
      ),
      "b)": answer(
        "I=1/3",
        ["I=2/3", "I=1/2", "I=1"],
        `Calculamos:
I=∫₋₁⁄₂⁰ √(2x+1) dx.

Hacemos u=2x+1, du=2dx. Los límites cambian:
x=−1/2 ⇒ u=0,
x=0 ⇒ u=1.

Entonces:
I=(1/2)∫₀¹u^(1/2)du
=(1/2)[(2/3)u^(3/2)]₀¹
=1/3.

Resultado: I=1/3.`
      ),
    },

    "mates2-analisis-8faf38c754c2": {
      "a)": answer(
        "f(x)=3x³−18x²−1",
        [
          "f(x)=3x³−18x²+1",
          "f(x)=3x²−18x−1",
          "f(x)=3x³−6x−1",
        ],
        `Desarrollamos el determinante por la primera fila:
f(x)=3x·|x 1; 0 x−6|−1·|0 1; −1 x−6|.

Calculamos los menores:
|x 1; 0 x−6|=x(x−6),
|0 1; −1 x−6|=1.

Por tanto:
f(x)=3x·x(x−6)−1
=3x³−18x²−1.`
      ),
      "b)": answer(
        "Punto de inflexión (2,−49); ∩ en (−∞,2) y ∪ en (2,+∞)",
        [
          "Punto de inflexión (0,−1); ∪ en todo ℝ",
          "Punto de inflexión (2,49); ∪ en (−∞,2)",
          "No tiene punto de inflexión",
        ],
        `Partimos de:
f(x)=3x³−18x²−1.

Calculamos:
f′(x)=9x²−36x,
f″(x)=18x−36=18(x−2).

La segunda derivada se anula en x=2.

Comprobamos el signo:
f″(0)=−36<0, por lo que la gráfica es cóncava hacia abajo (∩) en (−∞,2).
f″(3)=18>0, por lo que es cóncava hacia arriba (∪) en (2,+∞).

Como cambia el signo, x=2 es abscisa de un punto de inflexión:
f(2)=3·8−18·4−1=−49.

Resultado: punto de inflexión (2,−49).`
      ),
    },

    "mates2-analisis-8faf38c754c2-integral": {
      Resultado: answer(
        "(x²/2)ln x−x²/4+C",
        [
          "x²ln x+C",
          "(x²/2)ln x+x²/4+C",
          "x ln x−x+C",
        ],
        `Aplicamos integración por partes:
u=ln x, dv=x dx.

Entonces:
du=dx/x,
v=x²/2.

Por tanto:
∫x ln x dx
=(x²/2)ln x−∫(x²/2)(1/x)dx
=(x²/2)ln x−(1/2)∫x dx
=(x²/2)ln x−x²/4+C.

        La derivada del resultado recupera x ln x.`
      ),
    },

    "mates2-analisis-13961a5043be": {
      "a)": answer(
        "Máximo relativo (−2,50) y mínimo relativo (2,−46)",
        [
          "Mínimo relativo (−2,50) y máximo relativo (2,−46)",
          "Máximo relativo (0,2)",
          "No tiene extremos relativos",
        ],
        `La función es:
f(x)=3x³−36x+2.

Derivamos:
f′(x)=9x²−36=9(x−2)(x+2).

Los puntos críticos son x=−2 y x=2.

Estudiamos el signo con valores de prueba:
- si x=−3, f′(−3)=45>0;
- si x=0, f′(0)=−36<0;
- si x=3, f′(3)=45>0.

La recta de signos es:
(−∞,−2): + ↑; (−2,2): − ↓; (2,+∞): + ↑.

En x=−2 cambia de + a −: máximo.
En x=2 cambia de − a +: mínimo.

Calculamos las ordenadas:
f(−2)=50,
f(2)=−46.

Resultado: máximo relativo (−2,50) y mínimo relativo (2,−46).`
      ),
      "b)": answer(
        "Se aplica y la tesis se verifica en c=±2/√3",
        [
          "No se puede aplicar porque f no es continua",
          "Se verifica únicamente en c=0",
          "Se verifica en c=±2",
        ],
        `Teorema del valor medio de Lagrange:
si f es continua en [a,b] y derivable en (a,b), existe al menos un c∈(a,b) tal que
f′(c)=[f(b)−f(a)]/(b−a).

Como f es un polinomio, es continua en [−2,2] y derivable en (−2,2), por lo que el teorema se puede aplicar.

Calculamos la pendiente media:
[f(2)−f(−2)]/[2−(−2)]
=(−46−50)/4
=−24.

Buscamos f′(c)=−24:
9c²−36=−24
⇒ 9c²=12
⇒ c²=4/3
⇒ c=±2/√3.

Ambos valores pertenecen a (−2,2).`
      ),
    },

    "mates2-analisis-13961a5043be-area": {
      "a)": answer(
        "A=1/[a(a+1)]",
        ["A=1/a", "A=1/(a+1)", "A=ln(a+1)−ln a"],
        `La función es positiva para x>0. El recinto está comprendido entre x=a y x=a+1, por encima del eje OX.

Por tanto:
A=∫ₐᵃ⁺¹ 1/x² dx.

Una primitiva es:
F(x)=−1/x.

Aplicamos Barrow:
A=[−1/x]ₐᵃ⁺¹
=−1/(a+1)+1/a
=[(a+1)−a]/[a(a+1)]
=1/[a(a+1)].

Resultado: A=1/[a(a+1)]. La gráfica debe mostrar la franja bajo y=1/x² entre las dos rectas verticales.`
      ),
      "b)": answer(
        "El área tiende a 0",
        [
          "El área tiende a 1",
          "El área tiende a +∞",
          "El área tiende a −1",
        ],
        `Del apartado anterior:
A(a)=1/[a(a+1)].

Calculamos:
lim(a→∞) 1/[a(a+1)]
=lim(a→∞) 1/(a²+a)
=0.

El denominador crece sin límite mientras el numerador permanece igual a 1. Por tanto, el área del recinto tiende a cero.`
      ),
    },

    "mates2-analisis-1211c99a0439": {
      "a)": answer(
        "A=2, B=8, C=6",
        [
          "A=1, B=8, C=6",
          "A=2, B=6, C=8",
          "A=4, B=2, C=6",
        ],
        `El espacio es:
e(t)=At²+B ln(t+1)+C.

Primera condición:
e(0)=C=6.  (1)

La velocidad es:
v(t)=e′(t)=2At+B/(t+1).

Como v(0)=8:
B=8.  (2)

La aceleración es:
a(t)=e″(t)=2A−B/(t+1)².

Como a(1)=2:
2A−8/4=2
⇒ 2A−2=2
⇒ A=2.  (3)

Resultado: A=2, B=8 y C=6.`
      ),
      "b)": answer(
        "El límite vale 2",
        ["El límite vale 0", "El límite vale 8", "El límite es +∞"],
        `Con los valores obtenidos:
e(t)=2t²+8ln(t+1)+6.

Dividimos entre t²:
e(t)/t²
=2+8ln(t+1)/t²+6/t².

El último término tiende a cero.

Para el término logarítmico aparece ∞/∞; aplicamos L'Hôpital:
lim ln(t+1)/t²
=lim [1/(t+1)]/(2t)
=lim 1/[2t(t+1)]
=0.

Por tanto:
lim(t→∞) e(t)/t²=2.`
      ),
    },

    "mates2-analisis-1211c99a0439-integral": {
      Resultado: answer(
        "ln|(x+1)/x|−1/x+C",
        [
          "ln|x(x+1)|+1/x+C",
          "ln|(x+1)/x|+1/x+C",
          "1/[x²(x+1)]+C",
        ],
        `Factorizamos:
x³+x²=x²(x+1).

Descomponemos:
1/[x²(x+1)]=A/x+B/x²+C/(x+1).

Multiplicamos por x²(x+1):
1=Ax(x+1)+B(x+1)+Cx².

Comparando coeficientes:
B=1,
A+B=0 ⇒ A=−1,
A+C=0 ⇒ C=1.

Así:
I=−∫dx/x+∫dx/x²+∫dx/(x+1)
=−ln|x|−1/x+ln|x+1|+C
=ln|(x+1)/x|−1/x+C.

Comprobamos derivando la primitiva.`
      ),
    },

    "mates2-analisis-0e5ccf371575": {
      "a)": answer(
        "f′(x)=1/[2x√(x−1)], para x>1",
        [
          "f′(x)=1/[1+(x−1)²]",
          "f′(x)=1/[2√(x−1)]",
          "f′(x)=2x√(x−1)",
        ],
        `Sea:
f(x)=arctg(√(x−1)).

Tomamos u(x)=√(x−1). Entonces:
u′(x)=1/[2√(x−1)].

Como (arctg u)′=u′/(1+u²):
f′(x)=1/{2√(x−1)[1+(√(x−1))²]}
=1/{2√(x−1)[1+x−1]}
=1/[2x√(x−1)].

Esta expresión es válida para x>1.`
      ),
      "b)": answer(
        "No hay tangentes horizontales porque f′(x)>0 para todo x>1",
        [
          "Hay una tangente horizontal en x=1",
          "Hay una tangente horizontal en x=2",
          "Todas las tangentes son horizontales",
        ],
        `Una tangente es horizontal cuando f′(x)=0.

Para x>1:
f′(x)=1/[2x√(x−1)].

El numerador es 1 y el denominador es positivo, por lo que:
f′(x)>0.

La derivada nunca se anula. En x=1 la expresión no tiene derivada finita, por lo que tampoco existe allí una tangente horizontal.

Resultado: no hay ningún punto de la gráfica con tangente horizontal.`
      ),
    },

    "mates2-analisis-0e5ccf371575-area": {
      Resultado: answer(
        "a=10",
        ["a=20", "a=100", "a=∛2000"],
        `El recinto está bajo la parábola y=6x², sobre el eje OX y entre x=0 y x=a.

Su área es:
A=∫₀ᵃ6x²dx
=[2x³]₀ᵃ
=2a³.

Imponemos que el área sea 2000:
2a³=2000
⇒ a³=1000
⇒ a=10,
ya que a>0.

Resultado: a=10. La representación debe sombrear el recinto entre x=0 y x=10.`
      ),
    },

    "mates2-analisis-0d9f00f8848d": {
      Resultado: answer(
        "a=3, b=−6, c=1",
        [
          "a=−3, b=6, c=1",
          "a=3, b=6, c=−1",
          "a=1, b=−2, c=−1",
        ],
        `La función es:
f(x)=ax²+bx+c.

Como pasa por (3,10):
9a+3b+c=10.  (1)

Como tiene un extremo en (1,−2), el punto pertenece a la gráfica:
a+b+c=−2.  (2)

Además, en un extremo f′(1)=0. Como:
f′(x)=2ax+b,
obtenemos:
2a+b=0.  (3)

Reunimos las tres ecuaciones:
{ 9a+3b+c=10
  a+b+c=−2
  2a+b=0 }.

De (3), b=−2a. Restando (2) de (1):
8a+2b=12.

Sustituimos b=−2a:
8a−4a=12 ⇒ a=3.

Entonces b=−6 y, usando (2), c=1.

Resultado: a=3, b=−6, c=1.`
      ),
    },

    "mates2-analisis-0d9f00f8848d-integral": {
      Resultado: answer(
        "(2/3)(x+4)√(x+1)+C",
        [
          "2(x+1)√(x+1)+C",
          "(2/3)(x+1)√(x+4)+C",
          "2√(x+1)+C",
        ],
        `Calculamos:
I=∫(x+2)/√(x+1) dx.

Hacemos el cambio:
u=x+1,
du=dx,
x+2=u+1.

Entonces:
I=∫(u+1)/√u du
=∫[u^(1/2)+u^(−1/2)]du
=(2/3)u^(3/2)+2u^(1/2)+C.

Sacamos factor común:
I=(2/3)√u(u+3)+C.

Deshacemos el cambio:
I=(2/3)(x+4)√(x+1)+C.`
      ),
    },
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-geometria-04150d72d1c7": {
      "a)": answer(
        "La recta es secante al plano y se cortan en Q=(−3,0,4)",
        [
          "La recta está contenida en el plano",
          "La recta es paralela al plano",
          "La recta es perpendicular al plano y se cortan en (0,0,1)",
        ],
        `Escribimos la recta en forma vectorial:
r:(x,y,z)=(0,0,1)+λ(−1,0,1).

Su vector director es v⃗=(−1,0,1). El vector normal del plano
π:2x−y+3z=6
es n⃗=(2,−1,3).

Calculamos:
v⃗·n⃗=−2+3=1≠0.

Por tanto, la recta no es paralela al plano: lo corta en un único punto.

Sustituimos las ecuaciones paramétricas de r en π:
2(−λ)−0+3(1+λ)=6
⇒ −2λ+3+3λ=6
⇒ λ=3.

El punto de corte es:
Q=(−3,0,4).

Conclusión: r es secante a π.`
      ),
      "b)": answer(
        "π': x+5y+z−1=0",
        [
          "π': 2x−y+3z−3=0",
          "π': x−5y+z+1=0",
          "π': x+y+z−1=0",
        ],
        `El plano π' debe contener a r. Por ello, su vector normal n⃗' ha de ser perpendicular al vector director
v⃗=(−1,0,1).

Además, π' debe ser perpendicular a π, cuyo vector normal es
n⃗=(2,−1,3).

Un vector normal adecuado es el producto vectorial:
n⃗'=v⃗×n⃗=(1,5,1).

Tomamos el punto A=(0,0,1) de la recta r. La ecuación punto-normal es:
1(x−0)+5(y−0)+1(z−1)=0.

Por tanto:
π':x+5y+z−1=0.

Comprobación:
n⃗'·n⃗=2−5+3=0,
así que los dos planos son perpendiculares.`
      ),
    },

    "mates2-geometria-0a035246abae": {
      "a)": answer(
        "π': x+z=1",
        [
          "π': x+z=4",
          "π': x+y+z=2",
          "π': x−z=1",
        ],
        `El plano dado es:
π:x+z=4,
con vector normal n⃗=(1,0,1).

Todo plano paralelo tiene el mismo vector normal, por lo que su ecuación es:
π':x+z=d.

Como debe pasar por P=(1,1,0), sustituimos:
1+0=d ⇒ d=1.

Así:
π':x+z=1.`
      ),
      "b)": answer(
        "r: x=1+t, y=1, z=t",
        [
          "r: x=1+t, y=1+t, z=t",
          "r: x=1, y=1+t, z=t",
          "r: x=1−t, y=1, z=t",
        ],
        `Una recta perpendicular a un plano tiene como vector director un vector normal del plano.

Para
π:x+z=4,
tomamos n⃗=(1,0,1).

La recta debe pasar por P=(1,1,0). Su forma vectorial es:
r:(x,y,z)=(1,1,0)+t(1,0,1).

Por tanto, sus ecuaciones paramétricas son:
x=1+t,
y=1,
z=t.`
      ),
    },

    "mates2-geometria-26c358136685": {
      "a)": answer(
        "d(P,r)=2/√3=2√3/3",
        [
          "d(P,r)=√2",
          "d(P,r)=2√3",
          "d(P,r)=√6/3",
        ],
        `La recta viene dada por:
x+y+z=3,
x−y=0.

De x=y tomamos x=y=t. Entonces z=3−2t y obtenemos:
r:(x,y,z)=(0,0,3)+t(1,1,−2).

Así, A=(0,0,3) es un punto de r y v⃗=(1,1,−2) es su vector director.

Con P=(0,0,1):
AP⃗=P−A=(0,0,−2).

Aplicamos la fórmula:
d(P,r)=|AP⃗×v⃗|/|v⃗|.

Calculamos:
AP⃗×v⃗=(2,−2,0),
|AP⃗×v⃗|=2√2,
|v⃗|=√6.

Por tanto:
d(P,r)=2√2/√6=2/√3=2√3/3.`
      ),
      "b)": answer(
        "s: x=t, y=t, z=1+t",
        [
          "s: x=t, y=−t, z=1+t",
          "s: x=t, y=t, z=1−2t",
          "s: x=0, y=t, z=1+t",
        ],
        `Buscamos primero el pie Q de la perpendicular desde P a r.

Un punto genérico de r es:
Q(t)=(t,t,3−2t).

La condición de perpendicularidad es:
(P−Q)·v⃗=0,
donde P=(0,0,1) y v⃗=(1,1,−2).

Entonces:
(−t,−t,−2+2t)·(1,1,−2)=0
⇒ −t−t+4−4t=0
⇒ t=2/3.

Por tanto:
Q=(2/3,2/3,5/3).

El vector PQ⃗ es proporcional a (1,1,1). La recta pedida, que pasa por P, es:
s:(x,y,z)=(0,0,1)+u(1,1,1).

Ecuaciones paramétricas:
x=u, y=u, z=1+u.

Además, (1,1,1)·(1,1,−2)=0, de modo que s corta perpendicularmente a r.`
      ),
    },

    "mates2-geometria-36b2219f6e65": {
      "a)": answer(
        "a=6 y b=−3",
        [
          "a=2 y b=−1",
          "a=−6 y b=3",
          "a=3 y b=−6",
        ],
        `Los vectores normales son:
n⃗π=(a,b,3),
n⃗π'=(2,−1,1).

Para que los planos sean paralelos, sus vectores normales deben ser proporcionales:
(a,b,3)=k(2,−1,1).

De la tercera componente:
3=k.

Por tanto:
a=2·3=6,
b=−1·3=−3.

Resultado: a=6 y b=−3.`
      ),
      "b)": answer(
        "Si c=12, r está contenida en π; si c≠12, r es paralela a π",
        [
          "Si c=0, r está contenida en π; en otro caso es secante",
          "r es secante a π para todo c",
          "r es perpendicular a π para todo c",
        ],
        `Con a=6 y b=−3, el plano es:
π:6x−3y+3z=c.

Parametrizamos la recta r. Tomamos z=t en:
2x+3z=0,
y+2z=−4.

Obtenemos:
x=−3t/2,
y=−4−2t,
z=t.

Un vector director es v⃗=(−3,−4,2), y el vector normal del plano es
n⃗=(6,−3,3).

Calculamos:
v⃗·n⃗=−18+12+6=0.

La recta es paralela al plano o está contenida en él. Tomamos el punto A=(0,−4,0) de r:
6·0−3(−4)+3·0=12.

Por tanto:
- si c=12, A∈π y toda la recta está contenida en π;
- si c≠12, la recta es paralela al plano y no lo corta.`
      ),
    },
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-geometria-6e15005dc8ce": {
      "a)": answer(
        "Las direcciones son perpendiculares porque (0,−1,1)·(2,1,1)=0",
        [
          "No son perpendiculares porque el producto escalar vale 2",
          "Son paralelas porque sus vectores directores son proporcionales",
          "Se cortan formando un ángulo de 45°",
        ],
        `Parametrizamos la primera recta:
r:(x,y,z)=(0,1,0)+t(0,−1,1).

Por tanto, un vector director es:
v⃗=(0,−1,1).

La segunda recta ya está en forma paramétrica:
r':(x,y,z)=(1,2,0)+λ(2,1,1),
con vector director
v⃗'=(2,1,1).

Calculamos el producto escalar:
v⃗·v⃗'=0·2+(−1)·1+1·1=0.

Como el producto escalar es cero, las direcciones de r y r' son perpendiculares.`
      ),
      "b)": answer(
        "π: x−y−z+1=0",
        [
          "π: x+y+z−1=0",
          "π: 2x+y+z−3=0",
          "π: x−y+z+1=0",
        ],
        `El plano debe contener a r y ser paralelo a r'. Por ello contiene las direcciones:
v⃗=(0,−1,1),
v⃗'=(2,1,1).

Un vector normal del plano es:
n⃗=v⃗×v⃗'=(−2,2,2),
que podemos simplificar a
n⃗=(1,−1,−1).

Tomamos A=(0,1,0), punto de r. La ecuación punto-normal es:
1(x−0)−1(y−1)−1(z−0)=0.

Así:
π:x−y−z+1=0.`
      ),
    },

    "mates2-geometria-fcda4d757dab": {
      Resultado: answer(
        "a=−2, b=1 y c=0; π: −2x+y+z=0",
        [
          "a=2, b=−1 y c=0",
          "a=−2, b=1 y c=3",
          "a=1, b=−2 y c=0",
        ],
        `El plano es:
π:ax+y+bz=c.

Como pasa por el origen O=(0,0,0):
c=0.

Su vector normal es:
n⃗=(a,1,b).

El plano π es perpendicular a
π':x+2y=3,
cuyo vector normal es n⃗'=(1,2,0). Por tanto:
n⃗·n⃗'=0
⇒ a+2=0
⇒ a=−2.

La recta contenida en π es:
r:(x,y,z)=(1,1,1)+λ(1,1,1).

Su vector director (1,1,1) debe ser perpendicular a n⃗:
(a,1,b)·(1,1,1)=0
⇒ a+1+b=0.

Sustituimos a=−2:
−2+1+b=0
⇒ b=1.

También el punto (1,1,1) verifica:
−2+1+1=0.

Resultado:
a=−2, b=1, c=0,
π:−2x+y+z=0.`
      ),
    },

    "mates2-geometria-685bbc884243": {
      "a)": answer(
        "No existe ningún valor de a",
        [
          "a=1",
          "a=−1",
          "a=2",
        ],
        `Los vectores normales son:
n⃗π=(2,a,−1),
n⃗π'=(1,1,1).

Para que los planos sean paralelos tendría que existir k tal que:
(2,a,−1)=k(1,1,1).

De la primera componente se obtiene k=2, mientras que de la tercera se obtiene k=−1.

Estas dos condiciones son incompatibles. Por tanto, no existe ningún valor real de a para el que los planos sean paralelos.`
      ),
      "b)": answer(
        "a=3/2",
        [
          "a=−3/2",
          "a=1/2",
          "a=3",
        ],
        `El vector normal del plano es:
n⃗=(2,a,−1).

La recta tiene vector director:
v⃗=(−1,2,1).

Para que una recta sea paralela a un plano, su vector director debe ser perpendicular al vector normal:
n⃗·v⃗=0.

Sustituimos:
2(−1)+a·2+(−1)·1=0
⇒ −2+2a−1=0
⇒ 2a=3
⇒ a=3/2.

Para a=3/2, el punto (1,0,2) de la recta no pertenece al plano:
2·1+(3/2)·0−2=0≠4.

Por tanto, la recta es estrictamente paralela al plano.`
      ),
    },

    "mates2-geometria-427b42fc3a01": {
      "a)": answer(
        "Se cortan en P=(1,2,3)",
        [
          "Se cortan en P=(2,0,2)",
          "Son paralelas y no se cortan",
          "Se cortan en P=(3,−2,5)",
        ],
        `Igualamos las coordenadas de ambas rectas:
2−λ=2+μ,
2λ=−2μ,
2+λ=4+μ.

De la primera ecuación:
μ=−λ.

La segunda queda entonces verificada. Sustituimos μ=−λ en la tercera:
2+λ=4−λ
⇒ 2λ=2
⇒ λ=1,
μ=−1.

Sustituimos en cualquiera de las rectas:
P=(2−1,2·1,2+1)=(1,2,3).

Por tanto, las rectas se cortan en P=(1,2,3).`
      ),
      "b)": answer(
        "α=arccos(2/3)≈48,19°",
        [
          "α=arccos(1/3)≈70,53°",
          "α=90°",
          "α=arccos(√6/3)≈35,26°",
        ],
        `Los vectores directores son:
v⃗=(−1,2,1),
w⃗=(1,−2,1).

El ángulo de corte es el menor ángulo entre las dos rectas, por lo que usamos el valor absoluto:
cos α=|v⃗·w⃗|/(|v⃗|·|w⃗|).

Calculamos:
v⃗·w⃗=−1−4+1=−4,
|v⃗|=√6,
|w⃗|=√6.

Entonces:
cos α=|−4|/(√6·√6)=4/6=2/3.

Por tanto:
α=arccos(2/3)≈48,19°.`
      ),
    },
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-probabilidad-221789801bce": {
      "a)": answer(
        "0,016",
        ["0,03", "0,012", "0,004"],
        `Llamamos G al suceso «paquete grande», P a «paquete pequeño» y R a «se rompe».

Aplicamos el teorema de la probabilidad total:
P(R)=P(G)·P(R|G)+P(P)·P(R|P)
=0,6·0,02+0,4·0,01
=0,012+0,004
=0,016.

Por tanto, la probabilidad de que se rompa un paquete elegido al azar es 0,016, es decir, un 1,6 %.`
      ),
      "b)": answer(
        "0,25",
        ["0,75", "0,60", "0,02"],
        `Aplicamos el teorema de Bayes:
P(G|R)=P(G∩R)/P(R)
=[P(G)·P(R|G)]/P(R)
=(0,6·0,02)/0,016
=0,012/0,016
=0,25.

Por tanto, si el paquete se ha roto, la probabilidad de que sea grande es 0,25, es decir, un 25 %.`
      ),
      "c)": answer(
        "0,345744",
        ["0,9604", "0,588", "0,2304"],
        `La probabilidad de que un envío sea un paquete pequeño y no se rompa es:
P(P∩R̄)=P(P)·P(R̄|P)
=0,6·(1−0,02)
=0,6·0,98
=0,588.

Para dos envíos independientes:
P[(P∩R̄) en ambos]=0,588²=0,345744.

Por tanto, la probabilidad pedida es 0,345744.`
      ),
    },

    "ccss2-probabilidad-f6d080c27971": {
      "a)": answer(
        "25/64=0,390625",
        ["5/8=0,625", "15/64=0,234375", "25/78≈0,3205"],
        `Hay 40 estudiantes, de los cuales 25 no son de Albacete.

Como una misma persona puede ganar los dos ordenadores, los dos sorteos son independientes:
P(ningún ganador de Albacete)
=(25/40)·(25/40)
=(5/8)²
=25/64
=0,390625.`
      ),
      "b)": answer(
        "1/9880",
        ["1/988", "3/40", "1/760"],
        `Hay 3 estudiantes de Cuenca. Al adjudicarse tres premios sin reposición:
P(los tres de Cuenca)
=(3/40)·(2/39)·(1/38)
=6/59280
=1/9880.

La probabilidad es aproximadamente 0,0001012.`
      ),
      "c)": answer(
        "15/37≈0,4054",
        ["15/40=0,375", "25/37≈0,6757", "12/37≈0,3243"],
        `Condicionamos a que el estudiante no sea de Cuenca.

Fuera de Cuenca quedan:
40−3=37 estudiantes.

De ellos, 15 son de Albacete. Por tanto:
P(Albacete | no Cuenca)=15/37≈0,4054.`
      ),
    },

    "ccss2-probabilidad-c51efe34ed26": {
      "a)": answer(
        "0,22",
        ["0,18", "0,05", "0,95"],
        `Sea E el suceso «existe error» y + el suceso «el test da positivo».

Aplicamos la probabilidad total:
P(+)=P(E)·P(+|E)+P(Ē)·P(+|Ē)
=0,2·0,9+0,8·0,05
=0,18+0,04
=0,22.`
      ),
      "b)": answer(
        "9/11≈0,8182",
        ["0,90", "0,20", "2/11≈0,1818"],
        `Aplicamos Bayes:
P(E|+)=P(E∩+)/P(+)
=[P(E)·P(+|E)]/P(+)
=(0,2·0,9)/0,22
=0,18/0,22
=9/11≈0,8182.`
      ),
      "c)": answer(
        "No son independientes",
        ["Sí son independientes", "Son incompatibles", "Son equiprobables"],
        `Comprobamos la condición de independencia:
P(E∩+)=P(E)·P(+|E)=0,2·0,9=0,18.

En cambio:
P(E)·P(+)=0,2·0,22=0,044.

Como 0,18≠0,044, los sucesos E y + no son independientes. Tampoco son incompatibles, porque P(E∩+)>0.`
      ),
    },

    "ccss2-probabilidad-27acf146ad7b": {
      "a)": answer(
        "0,60",
        ["0,40", "0,54", "0,72"],
        `Sean A₁, A₂ y A₃ los tres grupos y S el suceso «aprobar».

Aplicamos la probabilidad total:
P(S)=0,3·0,4+0,5·0,6+0,2·0,9
=0,12+0,30+0,18
=0,60.`
      ),
      "b)": answer(
        "0,45",
        ["0,30", "0,60", "0,18"],
        `La probabilidad de suspender es:
P(S̄)=1−0,60=0,40.

En el grupo de preparación escasa suspende el 60 %. Aplicamos Bayes:
P(A₁|S̄)
=[P(A₁)·P(S̄|A₁)]/P(S̄)
=(0,3·0,6)/0,4
=0,18/0,4
=0,45.`
      ),
      "c)": answer(
        "0,216",
        ["0,064", "0,784", "0,60"],
        `En el grupo de preparación escasa:
P(suspender)=1−0,4=0,6.

Para tres estudiantes elegidos independientemente:
P(ninguno aprueba)=0,6³=0,216.

Por tanto, la probabilidad pedida es 0,216, es decir, un 21,6 %.`
      ),
    },
  });

  const confidenceAnswers = ({
    id,
    mean,
    sigma,
    n,
    confidence,
    z,
    lower,
    upper,
    unit,
    third,
  }) => {
    const margin = z * sigma / Math.sqrt(n);
    window.CCSS_II_EXAM_ANSWERS[id] = {
      "a)": answer(
        `[${lower}; ${upper}] ${unit}`,
        [
          `[${mean - sigma}; ${mean + sigma}] ${unit}`,
          `[${(mean - margin / 2).toFixed(3)}; ${(mean + margin / 2).toFixed(3)}] ${unit}`,
          `[${(mean - 2 * margin).toFixed(3)}; ${(mean + 2 * margin).toFixed(3)}] ${unit}`,
        ],
        `Como la desviación típica poblacional es conocida, usamos:
IC=${mean}±z·σ/√n.

Para un nivel de confianza del ${confidence} %, el valor crítico es z=${z}.

El error máximo es:
E=${z}·${sigma}/√${n}
=${margin.toFixed(4)}.

Por tanto:
IC=[${mean}−${margin.toFixed(4)}; ${mean}+${margin.toFixed(4)}]
=[${lower}; ${upper}] ${unit}.`
      ),
      "b)": answer(
        `Con una confianza del ${confidence} %, la media poblacional está entre ${lower} y ${upper} ${unit}`,
        [
          `El ${confidence} % de los datos individuales está entre ${lower} y ${upper}`,
          `La media muestral tiene probabilidad ${confidence / 100} de ser ${mean}`,
          `La desviación típica está entre ${lower} y ${upper}`,
        ],
        `La interpretación correcta se refiere al procedimiento de estimación:

si repitiéramos muchas veces el muestreo y construyéramos cada intervalo del mismo modo, aproximadamente el ${confidence} % de esos intervalos contendría la verdadera media poblacional.

Para esta muestra, estimamos que la media poblacional se encuentra entre ${lower} y ${upper} ${unit}.`
      ),
      "c)": answer(
        third.correct,
        third.wrong,
        third.solution
      ),
    };
  };

  confidenceAnswers({
    id: "ccss2-estadistica-1823ff1a306e",
    mean: 40, sigma: 10, n: 36, confidence: 97, z: 2.1701,
    lower: "36,38", upper: "43,62", unit: "años",
    third: {
      correct: "No sería válido: responder primero puede introducir sesgo de selección",
      wrong: ["Sí, porque el tamaño muestral no cambia", "Sí, porque la distribución es normal", "No, porque la media es 40"],
      solution: `El intervalo exige una muestra aleatoria y representativa. Elegir a quienes respondan primero puede seleccionar personas con características distintas del conjunto de clientes.

Al no garantizarse la aleatoriedad, puede aparecer sesgo de selección y el intervalo no sería fiable para toda la población.`,
    },
  });
  confidenceAnswers({
    id: "ccss2-estadistica-9eacef0c0b2c",
    mean: 7.5, sigma: 1, n: 100, confidence: 97.8, z: 2.29,
    lower: "7,271", upper: "7,729", unit: "horas",
    third: {
      correct: "Aumentar el tamaño muestral o disminuir el nivel de confianza",
      wrong: ["Disminuir la muestra", "Aumentar el nivel de confianza", "Aumentar la desviación típica"],
      solution: `La amplitud depende del error:
E=z·σ/√n.

Para estrechar el intervalo podemos aumentar n, porque aumenta √n en el denominador, o disminuir el nivel de confianza, porque entonces disminuye z. No podemos modificar artificialmente σ.`,
    },
  });
  confidenceAnswers({
    id: "ccss2-estadistica-aa44508bc7da",
    mean: 363.5, sigma: 10, n: 100, confidence: 97, z: 2.1701,
    lower: "361,33", upper: "365,67", unit: "días",
    third: {
      correct: "No sería válido: seleccionar los hogares de mayor consumo no es un muestreo aleatorio",
      wrong: ["Sí, porque hay 100 hogares", "Sí, porque σ es conocida", "No, porque falta calcular la mediana"],
      solution: `Elegir los hogares de mayor consumo produce una muestra sesgada hacia valores altos. El requisito de aleatoriedad no se cumple, por lo que el intervalo no puede generalizarse a todos los hogares.`,
    },
  });
  confidenceAnswers({
    id: "ccss2-estadistica-8090fe962a98",
    mean: 20, sigma: 2, n: 100, confidence: 95, z: 1.96,
    lower: "19,608", upper: "20,392", unit: "minutos",
    third: {
      correct: "Aumentar el tamaño muestral o disminuir el nivel de confianza",
      wrong: ["Reducir el tamaño muestral", "Aumentar z", "Aumentar σ"],
      solution: `El error es E=z·σ/√n. Para obtener menor ancho se aumenta n o se reduce el nivel de confianza y, por tanto, z.`,
    },
  });
  confidenceAnswers({
    id: "ccss2-estadistica-3056165ec545",
    mean: 2.6, sigma: 0.3, n: 36, confidence: 97, z: 2.1701,
    lower: "2,4915", upper: "2,7085", unit: "segundos",
    third: {
      correct: "Aumentar el tamaño muestral o disminuir el nivel de confianza",
      wrong: ["Disminuir n", "Aumentar el nivel de confianza", "Aumentar σ"],
      solution: `Como E=z·σ/√n, el intervalo se hace más estrecho aumentando el tamaño de la muestra o reduciendo el nivel de confianza.`,
    },
  });
  confidenceAnswers({
    id: "ccss2-estadistica-406c7726b11f",
    mean: 87.3, sigma: 5, n: 100, confidence: 97.8, z: 2.29,
    lower: "86,155", upper: "88,445", unit: "kg de CO₂",
    third: {
      correct: "No sería válido: elegir los conjuntos más potentes sesga la muestra",
      wrong: ["Sí, porque n=100", "Sí, porque la variable es normal", "No, porque σ=5"],
      solution: `Los conjuntos más potentes no representan al conjunto de aparatos. Esa selección elevaría sistemáticamente el consumo y el ahorro, por lo que el intervalo estaría sesgado.`,
    },
  });
  confidenceAnswers({
    id: "ccss2-estadistica-60c551aa9e3b",
    mean: 65, sigma: 2, n: 100, confidence: 95, z: 1.96,
    lower: "64,608", upper: "65,392", unit: "kg",
    third: {
      correct: "Aumentar el tamaño muestral o disminuir el nivel de confianza",
      wrong: ["Disminuir el tamaño muestral", "Aumentar el nivel de confianza", "Aumentar σ"],
      solution: `La semiamplitud es E=z·σ/√n. Aumentar n o disminuir el nivel de confianza reduce E y estrecha el intervalo.`,
    },
  });
  confidenceAnswers({
    id: "ccss2-estadistica-f62d032255f7",
    mean: 800, sigma: 50, n: 400, confidence: 95, z: 1.96,
    lower: "795,1", upper: "804,9", unit: "m³",
    third: {
      correct: "No sería válido: las viviendas próximas al encuestador no forman una muestra aleatoria",
      wrong: ["Sí, porque n=400", "Sí, porque σ es conocida", "No, porque la media es 800"],
      solution: `La proximidad al encuestador puede estar relacionada con barrios y tipos de vivienda concretos. La muestra dejaría de ser aleatoria y representativa, por lo que el intervalo no sería válido para toda la ciudad.`,
    },
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-analisis-b5a433aeacad": {
      "a)": answer(
        "Sube en (0,1) y (3,5)",
        ["Sube en (1,3)", "Sube en (0,3)", "Sube en (1,5)"],
        `La altura es f(x)=x³−6x²+9x+2, con x∈[0,5].

Derivamos:
f'(x)=3x²−12x+9
=3(x²−4x+3)
=3(x−1)(x−3).

Los puntos que anulan la derivada son x=1 y x=3. Estudiamos el signo:

0<x<1: tomamos x=0,5 y f'(0,5)>0 ↑
1<x<3: tomamos x=2 y f'(2)<0 ↓
3<x<5: tomamos x=4 y f'(4)>0 ↑

Por tanto, la mosca sube en (0,1) y (3,5).`
      ),
      "b)": answer(
        "Baja en (1,3)",
        ["Baja en (0,1)", "Baja en (3,5)", "Baja en (0,5)"],
        `Con f'(x)=3(x−1)(x−3), el signo es negativo entre las dos raíces.

En la recta real:
(0,1): + ↑
(1,3): − ↓
(3,5): + ↑

Por tanto, la mosca baja en (1,3).`
      ),
      "c)": answer(
        "Máximo relativo en x=1, f(1)=6; mínimo relativo en x=3, f(3)=2",
        [
          "Máximo en x=3 y mínimo en x=1",
          "Máximo en x=2 y mínimo en x=4",
          "No hay extremos relativos",
        ],
        `La derivada cambia de signo:
en x=1, de + a −, luego hay un máximo relativo;
en x=3, de − a +, luego hay un mínimo relativo.

Calculamos las alturas:
f(1)=1−6+9+2=6.
f(3)=27−54+27+2=2.

Resultado: máximo relativo (1,6) y mínimo relativo (3,2).`
      ),
      "d)": answer(
        "2 metros",
        ["0 metros", "6 metros", "12 metros"],
        `Al comenzar el vuelo, x=0:
f(0)=0³−6·0²+9·0+2=2.

La mosca estaba a 2 metros de altura.`
      ),
      "e)": answer(
        "22 metros, en x=5 segundos",
        ["6 metros, en x=1", "2 metros, en x=3", "12 metros, en x=5"],
        `Para hallar el máximo absoluto en [0,5] comparamos extremos y puntos críticos:
f(0)=2,
f(1)=6,
f(3)=2,
f(5)=125−150+45+2=22.

El mayor valor es 22. Por tanto, la altura máxima es 22 metros y se alcanza a los 5 segundos.`
      ),
    },

    "ccss2-analisis-9f13e2764907": {
      "a)": answer(
        "Es discontinua en x=−1 y en x=1",
        ["Es continua en ambos puntos", "Solo es discontinua en x=−1", "Solo es discontinua en x=1"],
        `Estudiamos los límites laterales y el valor de la función.

En x=−1:
lim(x→−1⁻) f(x)=−(−1)²+2=1,
f(−1)=1,
lim(x→−1⁺) f(x)=(−1)²+2=3.
Como 1≠3, es discontinua en x=−1.

En x=1:
lim(x→1⁻) f(x)=1²+2=3,
f(1)=3,
lim(x→1⁺) f(x)=(1/2)²=1/4.
Como 3≠1/4, es discontinua en x=1.`
      ),
      "b)": answer(
        "Tres tramos parabólicos con saltos en x=−1 y x=1",
        ["Una única parábola continua", "Tres rectas", "Una función constante"],
        `Se representan por separado:

1. y=−x²+2 para x≤−1, con punto cerrado en (−1,1).
2. y=x²+2 para −1<x≤1, con punto abierto en (−1,3) y cerrado en (1,3).
3. y=(x/2)² para x>1, con punto abierto en (1,1/4).

Los puntos abiertos y cerrados muestran claramente los dos saltos.`
      ),
      "c)": answer(
        "Mínimo absoluto en x=−1, f(−1)=1; máximo absoluto en x=1, f(1)=3; mínimo relativo en x=0, f(0)=2",
        [
          "Máximo en x=0 y mínimo en x=1",
          "No hay extremos",
          "Máximo en x=−1 y mínimo en x=0",
        ],
        `En [−1,1], el valor en x=−1 procede del primer tramo:
f(−1)=1.

Para −1<x≤1 se tiene f(x)=x²+2. Esta parábola alcanza su mínimo en:
x=0, f(0)=2,
y su mayor valor de ese tramo en x=1:
f(1)=3.

Comparando, el mínimo absoluto es f(−1)=1 y el máximo absoluto es f(1)=3. Además, (0,2) es un mínimo relativo.`
      ),
    },

    "ccss2-analisis-0ba089ff5255": {
      "a)": answer(
        "Las condiciones escritas son incompatibles; no existe tal función",
        [
          "a=0, b=−3, c=3",
          "a=0, b=3, c=−3",
          "a=−3, b=0, c=1",
        ],
        `Sea f(x)=x³+ax²+bx+c. Entonces:
f'(x)=3x²+2ax+b.

Para que x=1 y x=−1 sean puntos críticos:
f'(1)=3+2a+b=0,
f'(−1)=3−2a+b=0.

Restando ambas ecuaciones:
4a=0 ⇒ a=0.
Entonces b=−3.

Así:
f'(x)=3(x²−1)=3(x−1)(x+1).

Su signo es + para x<−1, − para −1<x<1 y + para x>1. Por tanto, x=−1 es máximo y x=1 es mínimo, justo al contrario de lo indicado.

Con el enunciado tal como está escrito no existe ninguna función que cumpla simultáneamente todas las condiciones.`
      ),
      "b)": answer(
        "No puede determinarse porque las condiciones del apartado a) son incompatibles",
        [
          "y=3x+1",
          "y=−3x+5",
          "y=x−2",
        ],
        `La recta tangente en el punto de inflexión solo puede calcularse después de obtener una función que satisfaga el apartado a).

Como las condiciones de máximo en x=1 y mínimo en x=−1 son incompatibles con el coeficiente principal +1 de x³, no existe esa función y, por tanto, tampoco existe la recta solicitada bajo esas condiciones.`
      ),
    },

    "ccss2-analisis-d6fddca6c6c7": {
      "a)": answer(
        "Es continua en x=1 y en x=2",
        ["Es discontinua en ambos", "Solo es continua en x=1", "Solo es continua en x=2"],
        `En x=1:
lim(x→1⁻)f(x)=1³=1,
f(1)=1,
lim(x→1⁺)f(x)=−1²+2=1.

En x=2:
lim(x→2⁻)f(x)=−2²+2=−2,
f(2)=−2,
lim(x→2⁺)f(x)=−2.

En ambos puntos coinciden límite izquierdo, límite derecho y valor de la función. Por tanto, es continua en x=1 y x=2.`
      ),
      "b)": answer(
        "y=x³ en [−2,1], y=−x²+2 en (1,2] y y=−2 para x>2",
        ["Una recta", "Una única parábola", "Una función con saltos en 1 y 2"],
        `Se dibujan los tres tramos respetando sus extremos:

- y=x³ desde x=−2 hasta x=1.
- y=−x²+2 desde x=1 hasta x=2.
- la semirrecta horizontal y=−2 para x>2.

Los tramos se unen en (1,1) y (2,−2), por lo que no aparecen saltos.`
      ),
      "c)": answer(
        "Máximo absoluto y relativo en (1,1); mínimo absoluto en (−2,−8)",
        [
          "Máximo en (2,−2) y mínimo en (1,1)",
          "No hay extremos",
          "Máximo en (−2,−8) y mínimo en (1,1)",
        ],
        `En [−2,1], x³ es creciente: pasa de −8 a 1.
En (1,2], −x²+2 es decreciente: pasa de valores próximos a 1 hasta −2.

Por tanto, al llegar a x=1 la función pasa de crecer a decrecer:
f(1)=1 es máximo relativo y absoluto.

Comparamos los valores extremos:
f(−2)=−8,
f(2)=−2.

El mínimo absoluto es f(−2)=−8.`
      ),
    },

    "ccss2-analisis-f557f7aae6b3": {
      "a)": answer(
        "Discontinua en x=0 y continua en x=3",
        ["Continua en ambos", "Continua en x=0 y discontinua en x=3", "Discontinua en ambos"],
        `En x=0:
lim(x→0⁻)f(x)=(0/2)²=0,
f(0)=0,
lim(x→0⁺)f(x)=−0+2=2.
Como 0≠2, es discontinua en x=0.

En x=3:
lim(x→3⁻)f(x)=−3+2=−1,
f(3)=−1,
lim(x→3⁺)f(x)=3−4=−1.

Por tanto, es continua en x=3.`
      ),
      "b)": answer(
        "Parábola para x≤0 y dos rectas que se unen en (3,−1)",
        ["Una función constante", "Una única recta", "Tres parábolas"],
        `Representamos:
- y=(x/2)² para x≤0, con punto cerrado en (0,0).
- y=−x+2 para 0<x≤3, con punto abierto en (0,2) y cerrado en (3,−1).
- y=x−4 para x>3, que parte con punto abierto en (3,−1).

Los dos últimos tramos se unen en (3,−1).`
      ),
      "c)": answer(
        "Máximo absoluto en x=−3, f=9/4; mínimo absoluto y relativo en x=3, f=−1; mínimo relativo en x=0, f=0",
        [
          "Máximo en x=0 y mínimo en x=4",
          "Máximo en x=3 y mínimo en x=−3",
          "No hay extremos",
        ],
        `En [−3,0], (x/2)² decrece desde 9/4 hasta 0.
En (0,3], −x+2 decrece desde valores próximos a 2 hasta −1.
En (3,4], x−4 crece desde −1 hasta 0.

Así, x=3 es mínimo relativo y absoluto, con f(3)=−1. El punto x=0 es también mínimo relativo por el salto: f(0)=0 y los valores próximos de ambos lados son mayores o iguales.

El mayor valor del intervalo es f(−3)=9/4.`
      ),
    },

    "ccss2-analisis-14945b522519": {
      "a)": answer(
        "Rectángulo de lados x e y con un rombo que une los cuatro puntos medios",
        ["Un círculo inscrito", "Un triángulo equilátero", "Dos rectángulos sin rombo"],
        `Llamamos x e y a los lados del rectángulo. Como hay 100 m de valla:
2x+2y=100 ⇒ x+y=50.

Al unir los puntos medios de lados consecutivos aparece un rombo central cuyas diagonales miden x e y. En las esquinas quedan cuatro triángulos rectángulos congruentes dos a dos.`
      ),
      "b)": answer(
        "S(x)=x(50−x)/2",
        ["S(x)=x(50−x)", "S(x)=2x(50−x)", "S(x)=50x"],
        `Las diagonales del rombo son los lados del rectángulo:
D=x, d=y.

El área de un rombo es:
S=D·d/2.

Como y=50−x:
S(x)=x(50−x)/2
=(50x−x²)/2.`
      ),
      "c)": answer(
        "25 m × 25 m",
        ["10 m × 40 m", "20 m × 30 m", "15 m × 35 m"],
        `Maximizamos:
S(x)=(50x−x²)/2.

S'(x)=25−x.
S'(x)=0 ⇒ x=25.

En la recta real:
x<25: S'(x)>0 ↑
x>25: S'(x)<0 ↓

Luego hay un máximo en x=25. Como y=50−25=25, la parcela debe ser un cuadrado de 25 m de lado.`
      ),
      "d)": answer(
        "312,5 m²",
        ["625 m²", "1250 m²", "156,25 m²"],
        `El rectángulo mide 25×25, así que su superficie total es:
25·25=625 m².

El rombo ocupa:
(25·25)/2=312,5 m².

La zona de riego son los cuatro triángulos, es decir, el área total menos el rombo:
625−312,5=312,5 m².`
      ),
    },

    "ccss2-analisis-0aa0aac7a965": {
      "a)": answer(
        "Es discontinua en x=1",
        ["Es continua en x=1", "No existe f(1)", "Es derivable en x=1"],
        `Para x≤1 se tiene f(x)=x²/2 y para x>1, f(x)=−x²+4.

lim(x→1⁻)f(x)=1/2,
f(1)=1/2,
lim(x→1⁺)f(x)=−1+4=3.

Como 1/2≠3, la función es discontinua en x=1.`
      ),
      "b)": answer(
        "Dos arcos parabólicos con un salto en x=1",
        ["Una recta continua", "Una sola parábola", "Dos rectas paralelas"],
        `Se representa y=x²/2 para x≤1, con punto cerrado en (1,1/2).

Después se representa y=−x²+4 para x>1, con punto abierto en (1,3).

La diferencia entre ambos puntos muestra el salto en x=1.`
      ),
      "c)": answer(
        "Máximo absoluto en x=−3, f=9/2; mínimo absoluto en x=3, f=−5; mínimo relativo en x=0, f=0",
        [
          "Máximo en x=1 y mínimo en x=0",
          "Máximo en x=3 y mínimo en x=−3",
          "No hay extremos",
        ],
        `En [−3,1], f(x)=x²/2: decrece hasta x=0 y después crece. Por tanto, (0,0) es mínimo relativo.

Para 1<x≤3, f(x)=−x²+4 es decreciente.

Comparamos:
f(−3)=9/2,
f(0)=0,
f(1)=1/2,
f(3)=−5.

El máximo absoluto es 9/2 en x=−3 y el mínimo absoluto es −5 en x=3.`
      ),
    },

    "ccss2-analisis-c2cb3b5fe7e3": {
      "a)": answer(
        "5 litros/100 km",
        ["0,2 litros/100 km", "13,8 litros/100 km", "19 litros/100 km"],
        `El consumo es C(t)=0,2t(26−t)−19.

Al conectar el ordenador, t=6:
C(6)=0,2·6·(26−6)−19
=0,2·6·20−19
=24−19
=5 litros/100 km.`
      ),
      "b)": answer(
        "Aumenta en (6,13)",
        ["Aumenta en (13,20)", "Aumenta en todo [6,20]", "No aumenta"],
        `Desarrollamos y derivamos:
C(t)=5,2t−0,2t²−19,
C'(t)=5,2−0,4t.

C'(t)=0 ⇒ 5,2−0,4t=0 ⇒ t=13.

En (6,13), tomamos t=10:
C'(10)=1,2>0 ↑.

Por tanto, el consumo aumenta entre los minutos 6 y 13.`
      ),
      "c)": answer(
        "Disminuye en (13,20)",
        ["Disminuye en (6,13)", "Disminuye en todo [6,20]", "No disminuye"],
        `Con C'(t)=5,2−0,4t, para t>13 la derivada es negativa.

Tomamos t=15:
C'(15)=5,2−6=−0,8<0 ↓.

Por tanto, el consumo disminuye en (13,20).`
      ),
      "d)": answer(
        "En t=13 minutos; consumo máximo 14,8 litros/100 km",
        [
          "En t=6; máximo 5",
          "En t=20; máximo 5",
          "En t=10; máximo 13",
        ],
        `La derivada cambia de positiva a negativa en t=13, por lo que allí hay un máximo.

C(13)=0,2·13·(26−13)−19
=0,2·169−19
=33,8−19
=14,8.

El consumo máximo es 14,8 litros/100 km y se alcanza a los 13 minutos.`
      ),
      "e)": answer(
        "Sí: el aumento y posterior descenso puede corresponder a una subida seguida de una bajada",
        [
          "No puede existir ninguna relación",
          "La carretera debe ser completamente llana",
          "El vehículo estuvo parado todo el tiempo",
        ],
        `El consumo crece hasta t=13 y después decrece. Un trazado con pendiente ascendente durante la primera parte exigiría más combustible, mientras que una bajada posterior permitiría reducirlo.

Esta es una interpretación posible, no una conclusión única: también influyen velocidad, marchas, tráfico y forma de conducción.`
      ),
    },
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-9b3472a31daa": {
      "a)": answer(
        "X=(3I+A)⁻¹B",
        ["X=B(3I+A)⁻¹", "X=(3I−A)⁻¹B", "X=A⁻¹B"],
        `Partimos de:
3X−AX=B−2AX.

Sumamos 2AX en ambos miembros:
3X+AX=B.

Sacamos X como factor común por la derecha:
(3I+A)X=B.

Si det(3I+A)≠0, multiplicamos por la izquierda por su inversa:
X=(3I+A)⁻¹B.`
      ),
      "b)": answer(
        "X=((1,−1,1),(−2,1,0))",
        [
          "X=((1,1,−1),(−2,0,1))",
          "X=((2,−1,1),(−1,1,0))",
          "X=((1,−2,0),(−1,1,1))",
        ],
        `Calculamos:
3I+A=((5,1),(1,5)).

Su determinante es:
|3I+A|=5·5−1·1=24≠0.

Por la fórmula de la inversa:
(3I+A)⁻¹=(1/24)((5,−1),(−1,5)).

Multiplicamos:
X=(1/24)((5,−1),(−1,5))·((3,−4,5),(−9,4,1))
=((1,−1,1),(−2,1,0)).

Comprobación: (3I+A)X=B.`
      ),
    },
    "ccss2-algebra-9b3472a31daa-programacion": {
      "a)": answer(
        "x≥2y, x≤50, y≥10, 300x+1000y≤28000, x≥0, y≥0",
        [
          "x≤2y, x≥50, y≤10",
          "x+y≤28, x≥50",
          "300x+1000y≥28000",
        ],
        `Sea x el número de ordenadores básicos e y el de lujo.

Las restricciones son:
300x+1000y≤28000,
x≥2y,
x≤50,
y≥10,
x≥0, y≥0.

La función que se desea maximizar es:
N=x+y.

La región factible se obtiene en el primer cuadrante, por encima de y=10, por debajo de x=50, a la derecha de x=2y y por debajo de 300x+1000y=28000.`
      ),
      "b)": answer(
        "50 básicos y 13 de lujo",
        ["50 básicos y 10 de lujo", "40 básicos y 16 de lujo", "20 básicos y 10 de lujo"],
        `Maximizamos N=x+y sobre los vértices de la región factible.

Con x=50, el presupuesto impone:
300·50+1000y≤28000
⇒ 15000+1000y≤28000
⇒ y≤13.

El punto (50,13) cumple x≥2y, pues 50≥26. En él:
N=50+13=63.

La comparación con los demás vértices confirma que es el máximo. Deben fabricarse 50 básicos y 13 de lujo.`
      ),
      "c)": answer(
        "Sí, agota exactamente los 28000 €",
        ["No; sobran 3000 €", "No; sobran 1000 €", "Gasta 25000 €"],
        `Para la solución óptima (50,13):
300·50+1000·13
=15000+13000
=28000 €.

Por tanto, se agota exactamente el presupuesto disponible.`
      ),
    },

    "ccss2-algebra-49813911cbc7": {
      "a)": answer(
        "x=3y+r; 2x=7y+r−1; x+y+r=17",
        [
          "x=3y−r; 2x=7y+r+1; x+y=15",
          "x=7y+r; 2x=3y+r−1",
          "x=3r+y; 2x=7r+y",
        ],
        `Por el algoritmo de la división:
dividendo=divisor·cociente+resto.

Primera división:
x=3y+r.

Segunda división:
2x=7y+(r−1).

Además, la suma del dividendo, divisor y resto de la primera división excede en 2 al quíntuplo de su cociente:
x+y+r=5·3+2=17.

El sistema queda:
{ x−3y−r=0
  2x−7y−r=−1
  x+y+r=17 }.`
      ),
      "b)": answer(
        "x=35/3, y=19/6, r=13/6",
        [
          "x=12, y=3, r=3",
          "x=10, y=3, r=1",
          "x=11, y=4, r=−1",
        ],
        `Resolvemos el sistema.

De x=3y+r y 2x=7y+r−1:
2(3y+r)=7y+r−1
⇒ r=y−1.

Entonces:
x=3y+(y−1)=4y−1.

Sustituimos en x+y+r=17:
(4y−1)+y+(y−1)=17
⇒ 6y=19
⇒ y=19/6.

r=y−1=19/6−6/6=13/6.

x=3y+r=57/6+13/6=70/6=35/3.`
      ),
    },

    "ccss2-algebra-baf1e75afa96": {
      "a)": answer(
        "X=(A²−2I)⁻¹B",
        ["X=B(A²−2I)⁻¹", "X=(A−2I)⁻¹B", "X=A⁻²B"],
        `Partimos de:
A²X−2X=B.

Escribimos 2X=2IX y sacamos X como factor común por la derecha:
(A²−2I)X=B.

Si det(A²−2I)≠0:
X=(A²−2I)⁻¹B.`
      ),
      "b)": answer(
        "A²=((2,−2,2),(−2,2,−1),(0,0,1))",
        [
          "A²=((1,−1,1),(−1,1,0),(0,0,1))",
          "A²=((2,2,0),(2,2,1),(0,0,1))",
          "A²=((0,−2,2),(−2,0,−1),(0,0,−1))",
        ],
        `Multiplicamos A por A, fila por columna:

A²=((1,−1,1),(−1,1,0),(0,0,1))
·((1,−1,1),(−1,1,0),(0,0,1))
=((2,−2,2),(−2,2,−1),(0,0,1)).`
      ),
      "c)": answer(
        "X=((−1,−3),(−3,0),(0,2))",
        [
          "X=((1,3),(3,0),(0,−2))",
          "X=((−1,−3),(0,−3),(2,0))",
          "X=((−3,−1),(0,−3),(2,0))",
        ],
        `Calculamos:
A²−2I=((0,−2,2),(−2,0,−1),(0,0,−1)).

Resolvemos:
(A²−2I)X=B.

De la tercera fila:
−F₃(X)=(0,−2) ⇒ F₃(X)=(0,2).

De la primera:
−2F₂(X)+2F₃(X)=(6,4)
⇒ F₂(X)=(−3,0).

De la segunda:
−2F₁(X)−F₃(X)=(2,4)
⇒ F₁(X)=(−1,−3).

Por tanto:
X=((−1,−3),(−3,0),(0,2)).`
      ),
    },
    "ccss2-algebra-baf1e75afa96-programacion": {
      "a)": answer(
        "0,6x+0,5y≤9; y≤0,6x; x≥5; x,y≥0",
        ["0,6x+0,5y≥9; y≥0,6x", "x+y≤9; x≤5", "y≥x+5"],
        `Sea x el número de cajas grandes e y el de pequeñas.

Restricciones:
0,6x+0,5y≤9,
y≤0,6x,
x≥5,
x≥0, y≥0.

La función objetivo es:
B=25x+22y.

Se representan las rectas frontera y se toma la intersección de los semiplanos.`
      ),
      "b)": answer(
        "10 cajas grandes y 6 pequeñas",
        ["15 grandes y 0 pequeñas", "5 grandes y 12 pequeñas", "9 grandes y 7 pequeñas"],
        `El máximo se alcanza en la intersección:
y=0,6x,
0,6x+0,5y=9.

Sustituimos:
0,6x+0,5(0,6x)=9
⇒ 0,9x=9
⇒ x=10,
y=6.

La comparación del beneficio en los vértices confirma que (10,6) es la solución óptima.`
      ),
      "c)": answer(
        "382 €",
        ["375 €", "257 €", "352 €"],
        `Sustituimos (x,y)=(10,6) en la función objetivo:
B=25x+22y
=25·10+22·6
=250+132
=382 €.

El beneficio máximo es 382 €.`
      ),
    },

    "ccss2-algebra-20c8f93549c2": {
      "a)": answer(
        "x+y+z=22; −x+y−2z=−13; 2x−z=15",
        [
          "x+y+z=22; x−y+2z=13; x−2z=15",
          "x+y+z=10; −x+y−z=3",
          "x+y=22; z=2x+1",
        ],
        `Sean x, y, z las edades en junio de 2000, de mayor a menor.

Primera condición:
x+y+z=22.

En 2010:
(y+10)+(z+10)−(x+10)=3z−3
⇒ −x+y−2z=−13.

En 2016:
z+16=2x+1
⇒ 2x−z=15.

Ese es el sistema pedido.`
      ),
      "b)": answer(
        "10, 7 y 5 años",
        ["12, 6 y 4 años", "11, 8 y 3 años", "9, 8 y 5 años"],
        `Resolvemos:
{ x+y+z=22
  −x+y−2z=−13
  2x−z=15 }.

De la tercera:
z=2x−15.

De la primera:
y=22−x−z=37−3x.

Sustituimos en la segunda:
−x+(37−3x)−2(2x−15)=−13
⇒ 67−8x=−13
⇒ x=10.

Entonces z=5 e y=7.`
      ),
    },

    "ccss2-algebra-b646f40a339e": {
      "a)": answer(
        "5x+2y+z=23; x+y=3z; x+z=y+2",
        [
          "50x+20y+10z=23; x+y=z",
          "5x+2y+z=230; x+y=3z",
          "x+y+z=23; x+z=y−2",
        ],
        `Sean x, y, z las cantidades de monedas de 50, 20 y 10 céntimos.

Valor total:
50x+20y+10z=230
⇒ 5x+2y+z=23.

Número de monedas:
x+y=3z.

Última condición:
x+z=y+2.

El sistema es:
{5x+2y+z=23
 x+y=3z
 x+z=y+2}.`
      ),
      "b)": answer(
        "3 monedas de 50 cts, 3 de 20 cts y 2 de 10 cts",
        [
          "2, 3 y 3 monedas",
          "3, 2 y 3 monedas",
          "4, 2 y 1 monedas",
        ],
        `De x+z=y+2:
y=x+z−2.

En x+y=3z:
x+x+z−2=3z
⇒ x−z=1
⇒ x=z+1.

Entonces y=2z−1. Sustituimos:
5(z+1)+2(2z−1)+z=23
⇒ 10z+3=23
⇒ z=2.

Así x=3 e y=3. La comprobación económica es:
3·50+3·20+2·10=230 céntimos.`
      ),
    },

    "ccss2-algebra-39db5c93d880": {
      "a)": answer(
        "X=(AB+I)⁻¹C",
        ["X=C(AB+I)⁻¹", "X=(AB−I)⁻¹C", "X=B⁻¹A⁻¹C"],
        `Partimos de:
ABX+X=C.

Escribimos X=IX y sacamos factor común:
(AB+I)X=C.

Si det(AB+I)≠0:
X=(AB+I)⁻¹C.`
      ),
      "b)": answer(
        "AB=((2,0,−1),(2,0,1),(0,0,2))",
        [
          "AB=((2,0,1),(0,0,2),(2,0,−1))",
          "AB=((1,−1),(1,0),(0,1))",
          "AB=((2,0,1),(2,0,−1),(0,0,2))",
        ],
        `Multiplicamos A, de orden 3×2, por B, de orden 2×3:

AB=((1,−1),(1,0),(0,1))
·((2,0,1),(0,0,2))
=((2,0,−1),(2,0,1),(0,0,2)).`
      ),
      "c)": answer(
        "X=((−2/9,1/9,0),(1/9,22/9,0),(1/3,1/3,0))",
        [
          "X=((2/9,−1/9,0),(−1/9,22/9,0),(1/3,1/3,0))",
          "X=((−2,1,0),(1,22,0),(3,3,0))",
          "X=((−2/9,1/9,1),(1/9,22/9,1),(1/3,1/3,1))",
        ],
        `Calculamos:
AB+I=((3,0,−1),(2,1,1),(0,0,3)).

Resolvemos (AB+I)X=C por filas.

De la tercera:
3F₃(X)=(1,1,0)
⇒ F₃(X)=(1/3,1/3,0).

De la primera:
3F₁(X)−F₃(X)=(−1,0,0)
⇒ F₁(X)=(−2/9,1/9,0).

De la segunda:
2F₁(X)+F₂(X)+F₃(X)=(0,3,0)
⇒ F₂(X)=(1/9,22/9,0).

Por tanto:
X=((−2/9,1/9,0),(1/9,22/9,0),(1/3,1/3,0)).`
      ),
    },
    "ccss2-algebra-39db5c93d880-programacion": {
      "a)": answer(
        "x+y≤9; x≥y+3; y≥2; y<2x; x,y≥0",
        ["x+y≥9; x≤y+3", "x≤y−3; y≤2", "y≥2x"],
        `Sea x la superficie de viñedo e y la de pistachos.

Restricciones:
x+y≤9,
x≥y+3,
y≥2,
y<2x,
x≥0, y≥0.

La función objetivo es:
B=300x+400y.

La condición y<2x no modifica el vértice óptimo, aunque se mantiene como restricción del enunciado.`
      ),
      "b)": answer(
        "6 ha de vid y 3 ha de pistachos",
        ["7 ha de vid y 2 de pistachos", "5 ha de vid y 4 de pistachos", "9 ha de vid y 0 de pistachos"],
        `El vértice común a las restricciones activas es:
x+y=9,
x=y+3.

Sustituimos:
y+3+y=9
⇒ 2y=6
⇒ y=3,
x=6.

Comparando la función objetivo en todos los vértices, el máximo se alcanza en (6,3).`
      ),
      "c)": answer(
        "3000 €",
        ["2900 €", "2700 €", "3300 €"],
        `Sustituimos:
B=300·6+400·3
=1800+1200
=3000 €.

El beneficio máximo es 3000 €.`
      ),
    },

    "ccss2-algebra-663d1730bd4d": {
      "a)": answer(
        "−x+y+z=2; x−y+z=8; x+y−5z=−8",
        [
          "x+y+z=2; x−y−z=8",
          "−x+y+z=2; x+y+5z=8",
          "x−y+z=2; x+y−5z=8",
        ],
        `Sean x, y, z los coches azules, rojos y verdes al comienzo.

Primera condición:
y+z=x+2
⇒ −x+y+z=2.

Tras salir 3 azules y llegar 3 rojos:
(x−3)+z=(y+3)+2
⇒ x−y+z=8.

Tras salir 2 verdes:
x+y=5(z−2)+2
⇒ x+y−5z=−8.`
      ),
      "b)": answer(
        "10 azules, 7 rojos y 5 verdes",
        ["7 azules, 10 rojos y 5 verdes", "10 azules, 5 rojos y 7 verdes", "8 azules, 6 rojos y 4 verdes"],
        `Resolvemos:
{−x+y+z=2
 x−y+z=8
 x+y−5z=−8}.

Sumando las dos primeras:
2z=10 ⇒ z=5.

De la primera:
−x+y=−3 ⇒ x−y=3.

De la tercera:
x+y=17.

Resolviendo:
x=10, y=7, z=5.`
      ),
    },

    "ccss2-algebra-8fabffdf94d9": {
      "a)": answer(
        "X=(A−A²)⁻¹(B−I)",
        ["X=(B−I)(A−A²)⁻¹", "X=(A+A²)⁻¹(B+I)", "X=A⁻¹B"],
        `Partimos de:
I+AX−A²X=B.

Pasamos I al segundo miembro:
AX−A²X=B−I.

Sacamos X como factor común por la derecha:
(A−A²)X=B−I.

Por tanto:
X=(A−A²)⁻¹(B−I).`
      ),
      "b)": answer(
        "A−A²=((2,−2),(1,2))",
        [
          "A−A²=((−2,2),(−1,−2))",
          "A−A²=((1,2),(−1,1))",
          "A−A²=((2,1),(−2,2))",
        ],
        `Primero calculamos:
A²=((1,2),(−1,1))·((1,2),(−1,1))
=((−1,4),(−2,−1)).

Restamos:
A−A²
=((1,2),(−1,1))−((−1,4),(−2,−1))
=((2,−2),(1,2)).`
      ),
      "c)": answer(
        "X=((1,2),(3,4))",
        ["X=((1,3),(2,4))", "X=((−1,−2),(−3,−4))", "X=((2,1),(4,3))"],
        `Tenemos:
A−A²=((2,−2),(1,2)),
B−I=((−4,−4),(7,10)).

El determinante es:
|A−A²|=2·2−(−2)·1=6.

Por tanto:
(A−A²)⁻¹=(1/6)((2,2),(−1,2)).

Multiplicamos:
X=(1/6)((2,2),(−1,2))·((−4,−4),(7,10))
=((1,2),(3,4)).`
      ),
    },
    "ccss2-algebra-8fabffdf94d9-programacion": {
      "a)": answer(
        "x≤y+1; x≥y−5; 2x+y≤14; x,y≥0",
        ["x≥y+1; x≤y−5", "2x+y≥14", "x+y≤5"],
        `Sea x el número de anuncios de radio e y el de televisión.

Restricciones:
x≤y+1,
x≥y−5,
2x+y≤14,
x≥0, y≥0.

La función objetivo es:
B=15x+17y.

La región factible es la intersección de esos semiplanos en el primer cuadrante.`
      ),
      "b)": answer(
        "3 anuncios de radio y 8 de televisión",
        ["5 de radio y 4 de televisión", "0 de radio y 5 de televisión", "7 de radio y 0 de televisión"],
        `El vértice que maximiza el beneficio se obtiene de:
x=y−5,
2x+y=14.

Como y=x+5:
2x+x+5=14
⇒ 3x=9
⇒ x=3,
y=8.

La comparación con los demás vértices confirma que (3,8) es óptimo.`
      ),
      "c)": answer(
        "181 €",
        ["143 €", "170 €", "136 €"],
        `Calculamos:
B=15·3+17·8
=45+136
=181 €.

El beneficio máximo es 181 €.`
      ),
    },
  });
})();

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

  // Se recuperan los apartados que la importación dejó dentro del enunciado.
  for (const id of ["mates2-algebra-d6c6ccfca681", "mates2-algebra-50adfe390f26"]) {
    const exercise = matesBlock("algebra").find((item) => item.id === id);
    if (exercise && !exercise.parts?.some((part) => part.label === "a)")) {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
  }

  for (const id of ["mates2-algebra-0b098c0bd0db", "mates2-algebra-f1846d71c786"]) {
    const exercise = matesBlock("algebra").find((item) => item.id === id);
    if (exercise && !exercise.parts?.some((part) => part.label === "a)")) {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
  }

  {
    const exercise = matesBlock("algebra").find(
      (item) => item.id === "mates2-algebra-f1846d71c786"
    );
    const merged = exercise?.parts?.find((part) => part.label === "c)");
    if (merged?.paragraphs?.length) {
      const dParagraph = merged.paragraphs.find((item) =>
        String(item.plain || "").trim().startsWith("d)")
      );
      merged.paragraphs = merged.paragraphs.filter(
        (item) => item !== dParagraph && String(item.plain || "").trim()
      );
      if (dParagraph && !exercise.parts.some((part) => part.label === "d)")) {
        exercise.parts.push(makePart("d)", [dParagraph]));
      }
    }
  }

  const insertAfter = (block, referenceId, exercise) => {
    const list = matesBlock(block);
    if (list.some((item) => item.id === exercise.id)) return;
    const index = list.findIndex((item) => item.id === referenceId);
    list.splice(index < 0 ? list.length : index + 1, 0, exercise);
  };

  // En 2011 algunas páginas del documento de origen contenían dos ejercicios.
  // Se separan para conservar cada enunciado oficial como una unidad independiente.
  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-53bf2027a1fb"
    );
    if (exercise && exercise.parts?.length > 2) {
      const integralParts = copy(exercise.parts.slice(2));
      exercise.parts = copy(exercise.parts.slice(0, 2));
      exercise.parts[1].paragraphs = copy(exercise.parts[1].paragraphs.slice(0, 1));
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-integrales`,
        statement: [paragraph("2º) Calcula las siguientes integrales:")],
        parts: integralParts,
      });
    }
  }

  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-61c5ddfb9d4e"
    );
    if (exercise && !exercise.parts?.some((part) => part.label === "a)")) {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
    const merged = exercise?.parts?.find((part) => part.label === "b)");
    if (merged?.paragraphs?.length > 1) {
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
      (item) => item.id === "mates2-analisis-8fe7e19a50ad"
    );
    if (exercise && !exercise.parts?.some((part) => part.label === "a)")) {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
    const merged = exercise?.parts?.find((part) => part.label === "c)");
    if (merged?.paragraphs?.length > 1) {
      const areaStatement = copy(merged.paragraphs.slice(1));
      merged.paragraphs = copy(merged.paragraphs.slice(0, 1));
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-area`,
        statement: areaStatement,
        parts: [makePart("Resultado", [])],
      });
    }
  }

  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-e09054d12b66"
    );
    if (exercise?.parts?.length >= 3) {
      const continuityPart = exercise.parts.find(
        (part) => part.label === "b)" &&
          part.paragraphs?.some((item) => String(item.plain || "").includes("Determina"))
      );
      const integralA = exercise.parts.find((part) => part.label === "a)");
      const integralB = [...exercise.parts].reverse().find(
        (part) => part.label === "b)" && part !== continuityPart
      );
      const integralParts = copy([integralA, integralB].filter(Boolean));
      exercise.parts = [
        makePart("a)", copy(exercise.statement)),
        makePart("b)", copy(continuityPart?.paragraphs || []).slice(0, 3)),
      ];
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-integrales`,
        statement: [paragraph("2A. Calcula las siguientes integrales indefinidas:")],
        parts: integralParts,
      });
    }
  }

  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-4e9fc164be4e"
    );
    const merged = exercise?.parts?.find(
      (part) => part.label === "b)" && part.paragraphs?.length > 1
    );
    if (merged) {
      const areaStatement = copy(merged.paragraphs.slice(1));
      merged.paragraphs = copy(merged.paragraphs.slice(0, 1));
      const areaPart = copy(exercise.parts.at(-1));
      exercise.parts = copy(exercise.parts.slice(0, 2));
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-area`,
        statement: areaStatement,
        parts: [areaPart],
      });
    }
  }

  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-6efe8826bd3f"
    );
    if (exercise?.statement?.length > 1) {
      const integralStatement = copy(exercise.statement.slice(1));
      const integralParts = copy(exercise.parts);
      exercise.statement = copy(exercise.statement.slice(0, 1));
      exercise.parts = [makePart("Resultado", [])];
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-integrales`,
        statement: integralStatement,
        parts: integralParts,
      });
    }
  }

  {
    const exercise = matesBlock("analisis").find(
      (item) => item.id === "mates2-analisis-daab52a3bd45"
    );
    const merged = exercise?.parts?.find(
      (part) => part.label === "b)" && part.paragraphs?.length > 1
    );
    if (merged) {
      const areaStatement = copy(merged.paragraphs.slice(1));
      merged.paragraphs = copy(merged.paragraphs.slice(0, 1));
      const areaPart = copy(exercise.parts.at(-1));
      exercise.parts = copy(exercise.parts.slice(0, 2));
      insertAfter("analisis", exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-area`,
        statement: areaStatement,
        parts: [areaPart],
      });
    }
  }

  for (const id of [
    "mates2-geometria-0b94c2d3d5af",
    "mates2-geometria-3c267d60c69a",
  ]) {
    const exercise = matesBlock("geometria").find((item) => item.id === id);
    if (exercise && !exercise.parts?.some((part) => part.label === "a)")) {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-12033d53b3a8": {
      "a)": answer(
        "X=((−4,−2),(6,4)); Y=((4,3),(−5,−4))",
        [
          "X=A−2B; Y=3B−A",
          "X=((4,2),(−6,−4)); Y=((−4,−3),(5,4))",
          "X=B−A; Y=A+B",
        ],
        `Partimos del sistema matricial:
2X+3Y=A,
X+Y=B.

De la segunda ecuación:
X=B−Y.

Sustituimos en la primera:
2(B−Y)+3Y=A
⇒ 2B+Y=A
⇒ Y=A−2B.

Entonces:
X=B−(A−2B)=3B−A.

Sustituyendo las matrices:
X=((−4,−2),(6,4)),
Y=((4,3),(−5,−4)).

La comprobación verifica simultáneamente las dos ecuaciones.`
      ),
      "b)": answer(
        "Bⁿ=I si n es par y Bⁿ=B si n es impar",
        ["Bⁿ=B para todo n", "Bⁿ=I para todo n", "Bⁿ=nB"],
        `Calculamos las primeras potencias:
B²=((0,1),(1,0))·((0,1),(1,0))=I.

Por tanto:
B³=B²·B=B,
B⁴=B²·B²=I.

El ciclo se repite cada dos potencias. Así:
Bⁿ=I si n es par,
Bⁿ=B si n es impar.`
      ),
    },

    "mates2-algebra-d6c6ccfca681": {
      "a)": answer(
        "Si λ≠2, SCD; si λ=2, SCI",
        ["Si λ=2, SI; si λ≠2, SCD", "SCI para todo λ", "SCD para todo λ"],
        `La matriz de coeficientes es:
A=((λ,2,−1),(3,−1,−1),(5,1,−2)).

Calculamos su determinante:
det(A)=3λ−6=3(λ−2).

Si λ≠2, det(A)≠0 y el sistema es compatible determinado.

Si λ=2, la tercera ecuación es la suma de las dos primeras, también en los términos independientes. Por tanto:
rg(A)=rg(A*)=2<3.

Según Rouché-Frobenius, para λ=2 el sistema es compatible indeterminado.`
      ),
      "b)": answer(
        "(x,y,z)=((4+3t)/8,(4+t)/8,t), t∈ℝ",
        ["(x,y,z)=(1,0,0)", "No tiene solución", "(x,y,z)=(t,t,t)"],
        `Para λ=2 tomamos z=t.

De la segunda ecuación:
3x−y−z=1
⇒ y=3x−t−1.

Sustituimos en la primera:
2x+2(3x−t−1)−t=2
⇒ 8x−3t=4
⇒ x=(4+3t)/8.

Después:
y=3(4+3t)/8−t−1=(4+t)/8.

Resultado:
(x,y,z)=((4+3t)/8,(4+t)/8,t), t∈ℝ.`
      ),
    },

    "mates2-algebra-d7d35def930f": {
      "a)": answer(
        "rg(A)=3 si k≠±1; rg(A)=2 si k=±1",
        [
          "rg(A)=3 para todo k",
          "rg(A)=2 si k=0 y 3 en otro caso",
          "rg(A)=1 si k=±1 y 3 en otro caso",
        ],
        `A tiene 3 columnas, luego rg(A)≤3.

Tomamos el menor formado por las filas 1, 2 y 4:
D=det((1,−1,0),(2,3,k),(0,5k,1))
=5(1−k²).

Si k≠±1, D≠0 y rg(A)=3.

Si k=±1, todos los menores de orden 3 se anulan. Sin embargo, el menor de orden 2:
det((1,−1),(2,3))=5≠0.

Por tanto, rg(A)=2 cuando k=±1.`
      ),
      "b)": answer(
        "Es compatible para todo k∈ℝ",
        [
          "Solo es compatible para k=1",
          "Solo es compatible para k=±1",
          "No es compatible para ningún k",
        ],
        `El sistema A·X=O es homogéneo.

Todo sistema homogéneo tiene al menos la solución trivial:
X=((0),(0),(0)).

Por tanto, es compatible para cualquier valor real de k.`
      ),
      "c)": answer(
        "Es SCI para k=−1 y k=1",
        ["Es SCI para k=0", "Es SCI para todo k", "Nunca es SCI"],
        `El sistema es homogéneo con 3 incógnitas.

Es compatible indeterminado cuando:
rg(A)<3.

Del apartado anterior:
rg(A)=2 exactamente para k=±1.

Resultado: el sistema es compatible indeterminado para k=−1 y k=1.`
      ),
    },

    "mates2-algebra-50adfe390f26": {
      "a)": answer(
        "Si m≠7, SCD; si m=7, SCI",
        ["Si m=7, SI", "SCD para todo m", "SCI para todo m"],
        `La matriz de coeficientes es:
A=((1,−1,1),(2,−3,0),(1,2,m)).

Su determinante es:
det(A)=7−m.

Si m≠7, det(A)≠0 y el sistema es compatible determinado.

Para m=7, la tercera ecuación es combinación lineal de las anteriores y la misma relación se cumple en los términos independientes:
rg(A)=rg(A*)=2<3.

Por tanto, para m=7 el sistema es compatible indeterminado.`
      ),
      "b)": answer(
        "(x,y,z)=((3t−1)/2,t,(3−t)/2), t∈ℝ",
        ["(x,y,z)=(1,1,1)", "No tiene solución", "(x,y,z)=(t,0,t)"],
        `Para m=7 tomamos y=t.

De:
2x−3y=−1
obtenemos:
x=(3t−1)/2.

De:
x−y+z=1
resulta:
z=1−x+t=(3−t)/2.

La tercera ecuación queda automáticamente satisfecha.

Resultado:
(x,y,z)=((3t−1)/2,t,(3−t)/2), t∈ℝ.`
      ),
    },

    "mates2-algebra-4ac02a46a7dc": {
      "a)": answer(
        "El sistema planteado es compatible determinado",
        [
          "Es compatible indeterminado",
          "Es incompatible",
          "Tiene dos soluciones",
        ],
        `Llamamos x, y, z a los tres números. El enunciado proporciona:
x+y=z,
3x−2y=z,
2x−y/2=z,
2x−y+1=z.

Al reducir el sistema obtenemos dos relaciones independientes:
2x=3y,
x=2y−1.

Estas determinan un único par (x,y), y después z=x+y.

Por tanto, el sistema es compatible determinado.`
      ),
      "b)": answer(
        "(x,y,z)=(3,2,5)",
        ["(2,3,5)", "(1,2,3)", "(3,5,8)"],
        `De las tres primeras igualdades obtenemos:
x=3y/2.

De la primera y la cuarta:
x+y=2x−y+1
⇒ x=2y−1.

Igualamos:
3y/2=2y−1
⇒ 3y=4y−2
⇒ y=2.

Entonces:
x=3,
z=x+y=5.

Resultado: los números son 3, 2 y 5.`
      ),
    },

    "mates2-algebra-f4c01938a1f5": {
      "Resultado": answer(
        "rg(A·Aᵗ)=rg(Aᵗ·A)=rg(A) para todo k",
        [
          "Ambos rangos son siempre distintos",
          "La igualdad solo se cumple para k=0",
          "La igualdad solo se cumple para k=±1",
        ],
        `Para cualquier matriz real A se cumple:
N(AᵗA)=N(A).

En efecto, si AᵗA·x=0, entonces:
xᵗAᵗAx=(Ax)ᵗ(Ax)=||Ax||²=0,
de donde Ax=0. La implicación contraria es inmediata.

Por el teorema rango-nulidad:
rg(AᵗA)=rg(A).

Aplicando el mismo razonamiento a Aᵗ:
rg(AAᵗ)=rg(Aᵗ)=rg(A).

Por tanto:
rg(AAᵗ)=rg(AᵗA)
para cualquier valor de k.`
      ),
    },

    "mates2-algebra-0b098c0bd0db": {
      "a)": answer(
        "X=(I+A)(B−A)⁻¹",
        [
          "X=(B−A)⁻¹(I+A)",
          "X=(I−A)(B+A)⁻¹",
          "X=(B−A)(I+A)⁻¹",
        ],
        `Partimos de:
XB−I=XA+A.

Pasamos los términos:
XB−XA=I+A.

Sacamos X como factor común por la izquierda:
X(B−A)=I+A.

Multiplicamos por (B−A)⁻¹ a la derecha:
X(B−A)(B−A)⁻¹=(I+A)(B−A)⁻¹.

Por tanto:
X=(I+A)(B−A)⁻¹.`
      ),
      "b)": answer(
        "X=((2,2,1),(0,3,−2),(0,0,2))",
        [
          "X=((2,2,1),(0,3,1),(0,0,2))",
          "X=((1,0,1),(0,1,−1),(0,0,1))",
          "X=((2,0,1),(0,3,2),(0,0,2))",
        ],
        `Calculamos:
B−A=((1,0,−1),(0,1,1),(0,0,1)),
I+A=((2,2,1),(0,3,1),(0,0,2)).

La inversa de B−A es:
(B−A)⁻¹=((1,0,1),(0,1,−1),(0,0,1)).

Aplicamos la fórmula del apartado anterior:
X=(I+A)(B−A)⁻¹.

Multiplicando:
X=((2,2,1),(0,3,−2),(0,0,2)).

La sustitución en XB−I=XA+A confirma el resultado.`
      ),
    },

    "mates2-algebra-f1846d71c786": {
      "a)": answer(
        "Compatible ⇔ rg(A)=rg(A*); determinado si ese rango es el número de incógnitas",
        [
          "Compatible ⇔ det(A)=0",
          "Siempre es compatible",
          "Incompatible ⇔ rg(A)=rg(A*)",
        ],
        `El teorema de Rouché-Frobenius establece:

Un sistema es compatible si y solo si:
rg(A)=rg(A*).

Si ese rango común coincide con el número de incógnitas, el sistema es compatible determinado.

Si el rango común es menor que el número de incógnitas, es compatible indeterminado.

Si rg(A)≠rg(A*), el sistema es incompatible.`
      ),
      "b)": answer(
        "B tiene dimensión 3×1",
        ["B tiene dimensión 4×1", "B tiene dimensión 3×4", "B tiene dimensión 1×3"],
        `A es 3×4 y X es 4×1.

El producto A·X tiene dimensión:
(3×4)·(4×1)=3×1.

Como A·X=B, la matriz B debe tener dimensión 3×1.`
      ),
      "c)": answer(
        "No puede ser compatible determinado",
        [
          "Sí, siempre",
          "Sí, si rg(A)=3",
          "Sí, si rg(A*)=4",
        ],
        `El sistema tiene 4 incógnitas, pero:
rg(A)≤3
porque A tiene solo 3 filas.

Para que fuera compatible determinado necesitaríamos:
rg(A)=rg(A*)=4.

Esto es imposible. Por tanto, el sistema no puede ser compatible determinado.`
      ),
      "d)": answer(
        "rg(A*)=3",
        ["rg(A*)=1", "rg(A*)=2", "rg(A*)=4"],
        `El sistema es incompatible, luego:
rg(A*)>rg(A).

Como rg(A)=2 y la matriz ampliada A* tiene 3 filas:
2<rg(A*)≤3.

La única posibilidad es:
rg(A*)=3.`
      ),
    },

    "mates2-analisis-53bf2027a1fb": {
      "a)": answer(
        "Asíntota vertical x=0 y asíntota oblicua y=2x+3/2",
        [
          "Asíntota vertical x=2 y horizontal y=0",
          "Asíntota vertical x=0 y oblicua y=2x−3/2",
          "No tiene asíntotas",
        ],
        `Escribimos la función mediante división:
f(x)=(4x²+3x+4)/(2x)=2x+3/2+2/x.

El denominador se anula en x=0 y el numerador no, luego x=0 es una asíntota vertical.

Además:
f(x)−(2x+3/2)=2/x → 0 cuando x→±∞.

Por tanto, la asíntota oblicua es:
y=2x+3/2.`
      ),
      "b)": answer(
        "Máximo relativo (−1,−5/2) y mínimo relativo (1,11/2)",
        [
          "Mínimo (−1,−5/2) y máximo (1,11/2)",
          "Máximo (0,3/2) y mínimo (1,11/2)",
          "No tiene extremos relativos",
        ],
        `Derivamos:
f'(x)=2−2/x²=2(x²−1)/x².

Los puntos críticos son x=−1 y x=1. En la recta real:

(-∞,−1): f'(−2)>0, la función crece.
(−1,0): f'(−1/2)<0, la función decrece.
(0,1): f'(1/2)<0, la función decrece.
(1,∞): f'(2)>0, la función crece.

Así, en x=−1 cambia de + a − y hay un máximo; en x=1 cambia de − a + y hay un mínimo.

f(−1)=−5/2, f(1)=11/2.

Resultado: máximo relativo (−1,−5/2) y mínimo relativo (1,11/2).`
      ),
    },

    "mates2-analisis-53bf2027a1fb-integrales": {
      "a)": answer(
        "I=(1/2)sen(2x)+(1/2)sen²x+C",
        [
          "I=2sen(2x)+sen²x+C",
          "I=(1/2)cos(2x)+(1/2)cos²x+C",
          "I=sen(2x)+sen²x+C",
        ],
        `Separamos la integral:
I=∫cos(2x) dx+∫sen x·cos x dx.

Para la primera:
∫cos(2x) dx=(1/2)sen(2x).

Para la segunda tomamos u=sen x, du=cos x dx:
∫sen x·cos x dx=∫u du=u²/2=sen²x/2.

Por tanto:
I=(1/2)sen(2x)+(1/2)sen²x+C.`
      ),
      "b)": answer(
        "I=x³/3−x²+4x−9ln|x+2|+C",
        [
          "I=x³/3−x²+4x+9ln|x+2|+C",
          "I=x⁴/4−x−9ln|x+2|+C",
          "I=x²−2x+4−9/(x+2)+C",
        ],
        `Dividimos los polinomios:
(x³−1)/(x+2)=x²−2x+4−9/(x+2).

Integramos término a término:
I=∫x² dx−2∫x dx+4∫dx−9∫dx/(x+2).

Así:
I=x³/3−x²+4x−9ln|x+2|+C.`
      ),
    },

    "mates2-analisis-61c5ddfb9d4e": {
      "a)": answer(
        "a=1; el mínimo absoluto es (0,−1)",
        [
          "a=−1; el mínimo es (0,1)",
          "a=0; no existe mínimo",
          "a=2; el mínimo es (0,−2)",
        ],
        `f(x)=(x−a)eˣ.

Derivamos:
f'(x)=(x−a+1)eˣ.

Para que x=0 sea un punto crítico:
f'(0)=1−a=0 ⇒ a=1.

Entonces f'(x)=xeˣ. Como eˣ>0:
si x<0, f'(x)<0 y la función decrece;
si x>0, f'(x)>0 y la función crece.

Por tanto, x=0 es un mínimo. Además, f(0)=−1, lim(x→−∞)f(x)=0 y lim(x→∞)f(x)=∞, de modo que es mínimo absoluto.

Resultado: a=1 y el mínimo absoluto es (0,−1).`
      ),
      "b)": answer(
        "Punto de inflexión (−1,−2/e)",
        [
          "Punto de inflexión (0,−1)",
          "Punto de inflexión (1,0)",
          "No tiene puntos de inflexión",
        ],
        `Para a=1:
f(x)=(x−1)eˣ.

La primera derivada es f'(x)=xeˣ y la segunda:
f''(x)=(x+1)eˣ.

Como eˣ>0, f''(x)=0 únicamente cuando x=−1.

En la recta real:
si x<−1, f''(x)<0;
si x>−1, f''(x)>0.

La curvatura cambia y, por tanto, existe un punto de inflexión.

f(−1)=(−2)e⁻¹=−2/e.

Resultado: (−1,−2/e).`
      ),
    },

    "mates2-analisis-61c5ddfb9d4e-integral": {
      "Resultado": answer(
        "I=−ln|x−1|+2ln|x−2|+1/(x−2)+C",
        [
          "I=ln|x−1|−2ln|x−2|−1/(x−2)+C",
          "I=−ln|x−1|+2ln|x−2|−1/(x−2)+C",
          "I=ln|x−1|+ln|x−2|+C",
        ],
        `Factorizamos el denominador:
x³−5x²+8x−4=(x−1)(x−2)².

Descomponemos:
(x²−3x+1)/[(x−1)(x−2)²]
=A/(x−1)+B/(x−2)+C/(x−2)².

Multiplicando por el denominador:
x²−3x+1=A(x−2)²+B(x−1)(x−2)+C(x−1).

Con x=1: −1=A, luego A=−1.
Con x=2: −1=C, luego C=−1.
Comparando coeficientes resulta B=2.

Integramos:
I=−∫dx/(x−1)+2∫dx/(x−2)−∫dx/(x−2)².

Resultado:
I=−ln|x−1|+2ln|x−2|+1/(x−2)+C.`
      ),
    },

    "mates2-analisis-8fe7e19a50ad": {
      "a)": answer(
        "Bolzano garantiza un cero con cambio de signo; Rolle garantiza un punto con f'(c)=0",
        [
          "Ambos teoremas afirman que toda función tiene máximo",
          "Bolzano exige derivabilidad y Rolle no exige continuidad",
          "Rolle garantiza siempre una raíz de la función",
        ],
        `Teorema de Bolzano: si f es continua en [a,b] y f(a)·f(b)<0, existe al menos un c∈(a,b) tal que f(c)=0.

Teorema de Rolle: si f es continua en [a,b], derivable en (a,b) y f(a)=f(b), existe al menos un c∈(a,b) tal que f'(c)=0.`
      ),
      "b)": answer(
        "Existe al menos una solución en (−1,0)",
        [
          "Existe al menos una solución en (0,1)",
          "No existe ninguna solución real",
          "La única solución es x=0",
        ],
        `Definimos h(x)=eˣ+x⁷. Es continua en ℝ.

Calculamos:
h(−1)=e⁻¹−1<0,
h(0)=1>0.

Como cambia de signo en [−1,0], el teorema de Bolzano garantiza que existe al menos un c∈(−1,0) con h(c)=0.`
      ),
      "c)": answer(
        "La solución es única porque h'(x)=eˣ+7x⁶>0",
        [
          "Hay dos soluciones porque h' se anula dos veces",
          "Es única porque h''(x)=0",
          "No puede decidirse con la derivada",
        ],
        `Derivamos:
h'(x)=eˣ+7x⁶.

Para todo x∈ℝ se cumple eˣ>0 y 7x⁶≥0. Por tanto:
h'(x)>0.

La función h es estrictamente creciente en toda la recta real y no puede cortar dos veces al eje de abscisas.

Como Bolzano ya garantiza una solución, esa solución es única.`
      ),
    },

    "mates2-analisis-8fe7e19a50ad-area": {
      "Resultado": answer(
        "a=4",
        ["a=2", "a=8", "a=16"],
        `Las curvas son y=x² e y=a, con a>0. Se cortan cuando:
x²=a ⇒ x=±√a.

En [−√a,√a] la recta y=a queda por encima de la parábola. El área es:
A=∫ desde −√a hasta √a de (a−x²) dx.

Por simetría:
A=2∫ desde 0 hasta √a de (a−x²) dx
=2[a x−x³/3] desde 0 hasta √a
=4a^(3/2)/3.

Imponemos A=32/3:
4a^(3/2)/3=32/3
⇒ a^(3/2)=8
⇒ a=4.`
      ),
    },

    "mates2-analisis-e09054d12b66": {
      "a)": answer(
        "f es continua en x₀ si lim(x→x₀)f(x)=f(x₀)",
        [
          "f es continua si f'(x₀)=0",
          "f es continua si solo existe el límite por la derecha",
          "f es continua si f(x₀)=0",
        ],
        `Una función f es continua en x₀ cuando:
1. existe f(x₀);
2. existe lim(x→x₀)f(x);
3. ambos valores coinciden.

Equivalentemente:
lim(x→x₀−)f(x)=lim(x→x₀+)f(x)=f(x₀).`
      ),
      "b)": answer(
        "a=1/36",
        ["a=1/4", "a=1/9", "a=4"],
        `Estudiamos la continuidad en x=3.

Por la izquierda y en el punto:
lim(x→3−)f(x)=f(3)=a·3²=9a.

Por la derecha racionalizamos:
lim(x→3+) (√(x+1)−2)/(x−3)
=lim(x→3+) 1/(√(x+1)+2)=1/4.

Para que sea continua:
9a=1/4
⇒ a=1/36.`
      ),
    },

    "mates2-analisis-e09054d12b66-integrales": {
      "a)": answer(
        "arctg(x)+4ln(1+x²)+C",
        [
          "arctg(x)+8ln(1+x²)+C",
          "ln(1+x²)+4arctg(x)+C",
          "1/(1+x²)+4ln|x|+C",
        ],
        `Separamos:
∫(1+8x)/(1+x²) dx
=∫dx/(1+x²)+8∫x/(1+x²) dx.

La primera integral es arctg(x).

En la segunda, u=1+x² y du=2x dx:
8∫x/(1+x²) dx=4∫du/u=4ln(1+x²).

Resultado:
arctg(x)+4ln(1+x²)+C.`
      ),
      "b)": answer(
        "(x²+x−2)sen x+(2x+1)cos x+C",
        [
          "(x²+x)sen x+(2x+1)cos x+C",
          "(x²+x−2)cos x−(2x+1)sen x+C",
          "(2x+1)sen x+(x²+x)cos x+C",
        ],
        `Aplicamos integración por partes:
u=x²+x, dv=cos x dx.

Entonces du=(2x+1)dx y v=sen x:
I=(x²+x)sen x−∫(2x+1)sen x dx.

En la integral restante volvemos a integrar por partes:
u=2x+1, dv=sen x dx,
du=2dx, v=−cos x.

∫(2x+1)sen x dx=−(2x+1)cos x+2sen x.

Por tanto:
I=(x²+x−2)sen x+(2x+1)cos x+C.`
      ),
    },

    "mates2-analisis-4e9fc164be4e": {
      "a)": answer(
        "e^(1/3)",
        ["e", "e³", "1/3"],
        `La base tiende a 1 y el exponente a +∞: es una indeterminación 1^∞.

Aplicamos la fórmula del número e:
L=e^K,
donde
K=lim(x→1+) [1/(x−1)]·[(2x+1)/(x+2)−1].

Simplificamos:
[(2x+1)/(x+2)−1]=(x−1)/(x+2).

Así:
K=lim(x→1+)1/(x+2)=1/3.

Por tanto:
L=e^(1/3).`
      ),
      "b)": answer(
        "1/6",
        ["1/3", "0", "1/2"],
        `Al sustituir x=0 aparece 0/0, por lo que aplicamos L'Hôpital.

Derivamos numerador y denominador:
lim(x→0) [cos x−(cos x−x sen x)]/(6x²)
=lim(x→0) x sen x/(6x²)
=lim(x→0) sen x/(6x).

Todavía aparece 0/0. Aplicamos L'Hôpital de nuevo:
lim(x→0) cos x/6=1/6.`
      ),
    },

    "mates2-analisis-4e9fc164be4e-area": {
      "b)": answer(
        "4/3 unidades cuadradas",
        ["1 unidad cuadrada", "2/3 unidades cuadradas", "e−1/3 unidades cuadradas"],
        `Las curvas y=x² e y=1/x se cortan en el primer cuadrante cuando:
x²=1/x ⇒ x³=1 ⇒ x=1.

La región queda limitada por el eje OX, la parábola desde x=0 hasta x=1, la curva 1/x desde x=1 hasta x=e y la recta x=e.

Por tanto:
A=∫ desde 0 hasta 1 de x² dx + ∫ desde 1 hasta e de 1/x dx.

Aplicando la regla de Barrow:
A=[x³/3] de 0 a 1 + [ln x] de 1 a e
=1/3+1=4/3.

Resultado: 4/3 unidades cuadradas.`
      ),
    },

    "mates2-analisis-6efe8826bd3f": {
      "Resultado": answer(
        "a=2",
        ["a=3", "a=1/2", "a=4"],
        `La base y la altura del triángulo son:
b=a/(a−1), h=a.

Su área es:
A(a)=a²/[2(a−1)], con a>1.

Derivamos:
A'(a)=a(a−2)/[2(a−1)²].

En el dominio a>1, el único punto crítico es a=2.

En la recta real del dominio:
si 1<a<2, A'(a)<0;
si a>2, A'(a)>0.

El área decrece y después crece, por lo que alcanza su mínimo en a=2.`
      ),
    },

    "mates2-analisis-6efe8826bd3f-integrales": {
      "a)": answer(
        "(x²/2)ln x−x²/4+C",
        [
          "x²ln x−x²/2+C",
          "(x²/2)ln x+x²/4+C",
          "xln x−x+C",
        ],
        `Integramos por partes:
u=ln x, dv=x dx.

Entonces:
du=dx/x, v=x²/2.

I=(x²/2)ln x−∫(x²/2)(1/x) dx
=(x²/2)ln x−(1/2)∫x dx
=(x²/2)ln x−x²/4+C.`
      ),
      "b)": answer(
        "x−2√x+2ln(1+√x)+C",
        [
          "x+2√x+2ln(1+√x)+C",
          "x−2√x−2ln(1+√x)+C",
          "2√x−ln(1+√x)+C",
        ],
        `Hacemos el cambio u=√x. Entonces x=u² y dx=2u du.

I=∫[u/(1+u)]·2u du
=∫2u²/(u+1) du.

Dividimos:
2u²/(u+1)=2u−2+2/(u+1).

Integramos:
I=u²−2u+2ln|u+1|+C.

Volviendo a x:
I=x−2√x+2ln(1+√x)+C.`
      ),
    },

    "mates2-analisis-daab52a3bd45": {
      "a)": answer(
        "Decrece en (−∞,0) y (4,∞); crece en (0,2) y (2,4)",
        [
          "Crece en todo su dominio",
          "Decrece en (−∞,2) y crece en (2,∞)",
          "Crece en (−∞,0) y (4,∞); decrece en (0,4)",
        ],
        `El dominio es ℝ\\{2}.

Derivamos:
f'(x)=[2x(2−x)+x²]/(2−x)²
=x(4−x)/(2−x)².

El denominador es positivo en el dominio. Marcamos x=0, x=2 y x=4 en la recta real:

(-∞,0): f'(−1)<0, decrece.
(0,2): f'(1)>0, crece.
(2,4): f'(3)>0, crece.
(4,∞): f'(5)<0, decrece.

Resultado: decrece en (−∞,0) y (4,∞), y crece en (0,2) y (2,4).`
      ),
      "b)": answer(
        "Asíntota vertical x=2 y oblicua y=−x−2",
        [
          "Asíntota vertical x=0 y oblicua y=x+2",
          "Asíntota horizontal y=0",
          "Asíntota vertical x=2 y oblicua y=x−2",
        ],
        `El denominador se anula en x=2 y el numerador vale 4, luego x=2 es una asíntota vertical.

Dividimos:
x²/(2−x)=−x−2−4/(x−2).

Como:
f(x)−(−x−2)=−4/(x−2)→0
cuando x→±∞, la asíntota oblicua es:
y=−x−2.`
      ),
    },

    "mates2-analisis-daab52a3bd45-area": {
      "b)": answer(
        "8/3 unidades cuadradas",
        ["4/3 unidades cuadradas", "16/3 unidades cuadradas", "2 unidades cuadradas"],
        `Igualamos las funciones:
x²−2x−2=−x²+2x−2
⇒ 2x²−4x=0
⇒ 2x(x−2)=0.

Los puntos de corte tienen abscisas x=0 y x=2.

Entre 0 y 2, g(x)=−x²+2x−2 queda por encima de f(x)=x²−2x−2.

El área es:
A=∫ desde 0 hasta 2 de [g(x)−f(x)] dx
=∫ desde 0 hasta 2 de (−2x²+4x) dx.

Aplicamos Barrow:
A=[−(2/3)x³+2x²] de 0 a 2
=−16/3+8=8/3.

Resultado: 8/3 unidades cuadradas.`
      ),
    },

    "mates2-geometria-e1d60d4cfeb7": {
      "a)": answer(
        "a=2",
        ["a=−2", "a=1", "a=0"],
        `El vector director de la recta es v⃗=(a,−1,2) y un vector normal del plano es n⃗=(1,0,−1).

Para que la recta sea paralela al plano:
v⃗·n⃗=0.

Sustituimos:
(a,−1,2)·(1,0,−1)=a−2=0.

Por tanto, a=2.`
      ),
      "b)": answer(
        "r': x=1+λ, y=1+4λ, z=λ",
        [
          "r': x=1+λ, y=1−λ, z=2λ",
          "r': x=1+λ, y=1+λ, z=−λ",
          "r': x=1+2λ, y=1−λ, z=2λ",
        ],
        `Para a=2, el vector director de r es v⃗=(2,−1,2). Buscamos un vector w⃗=(u,v,w) que:
1. sea paralelo al plano: w⃗·(1,0,−1)=0;
2. sea perpendicular a r: w⃗·(2,−1,2)=0.

La primera condición da u=w. Sustituyendo en la segunda:
2u−v+2u=0 ⇒ v=4u.

Tomamos u=1 y obtenemos w⃗=(1,4,1).

Como r' pasa por P(1,1,0), sus ecuaciones paramétricas son:
x=1+λ,
y=1+4λ,
z=λ.`
      ),
    },

    "mates2-geometria-5d622c02fa40": {
      "a)": answer(
        "√6/2 unidades cuadradas",
        ["√6 unidades cuadradas", "3/2 unidades cuadradas", "√3/2 unidades cuadradas"],
        `Formamos:
AB⃗=(1,1,3), AC⃗=(0,1,1).

El producto vectorial es:
AB⃗×AC⃗=(−2,−1,1).

Su módulo vale:
|AB⃗×AC⃗|=√(4+1+1)=√6.

El área del triángulo es la mitad del área del paralelogramo:
A=|AB⃗×AC⃗|/2=√6/2.`
      ),
      "b)": answer(
        "k=−29/2 o k=31/2",
        ["k=−15 o k=15", "k=−31/2 o k=29/2", "k=1/2"],
        `Tomamos AD⃗=(k,0,1).

El volumen del tetraedro es:
V=|(AB⃗×AC⃗)·AD⃗|/6.

Sustituimos:
5=|(-2,−1,1)·(k,0,1)|/6
=|1−2k|/6.

Entonces:
|1−2k|=30.

Resolvemos los dos casos:
1−2k=30 ⇒ k=−29/2,
1−2k=−30 ⇒ k=31/2.

Resultado: k=−29/2 o k=31/2.`
      ),
    },

    "mates2-geometria-b897b867d0a4": {
      "a)": answer(
        "Las rectas son secantes y se cortan en (1,0,1)",
        ["Son paralelas", "Son coincidentes", "Se cruzan sin cortarse"],
        `1. Parametrizamos r tomando y=λ:
r: (x,y,z)=(1+λ,λ,1−λ).

Por tanto, un punto y un vector director de r son:
P=(1,0,1),  u⃗=(1,1,−1).

De s obtenemos:
Q=(0,1,0),  v⃗=(1,−1,1).

El vector que une un punto de r con un punto de s es:
PQ⃗=Q−P=(−1,1,−1).

2. Calculamos el rango de los vectores directores. El menor

det [[1,1],[1,−1]]=1·(−1)−1·1=−2≠0

prueba que rg(u⃗,v⃗)=2. Los vectores no son proporcionales, así que las rectas no son paralelas ni coincidentes.

3. Añadimos el vector PQ⃗ y calculamos:

det [[1,1,−1],[1,−1,1],[−1,1,−1]]=0.

Por ello rg(u⃗,v⃗,PQ⃗)=2=rg(u⃗,v⃗). Los tres vectores son coplanarios. Como los directores no son proporcionales, las rectas son secantes.

4. Hallamos el punto de corte igualando las parametrizaciones:
1+λ=t,
λ=1−t,
1−λ=t.

Se obtiene λ=0 y t=1. El punto común es (1,0,1).

Conclusión: las rectas son secantes y se cortan en (1,0,1).`
      ),
      "b)": answer(
        "α=arccos(1/3)",
        ["α=90°", "α=arccos(2/3)", "α=60°"],
        `1. Los vectores directores son:
u⃗=(1,1,−1),
v⃗=(1,−1,1).

2. Calculamos el producto escalar componente a componente:
u⃗·v⃗=1·1+1·(−1)+(−1)·1=−1.

3. Calculamos por separado los módulos:
|u⃗|=sqrt{1²+1²+(−1)²}=sqrt{3},
|v⃗|=sqrt{1²+(−1)²+1²}=sqrt{3}.

4. Sustituimos en la fórmula del ángulo menor entre rectas:

cos α=frac{|u⃗·v⃗|}{|u⃗|·|v⃗|}
=frac{|−1|}{sqrt{3}·sqrt{3}}
=frac{1}{3}.

5. Despejamos el ángulo:
α=arccos(frac{1}{3})≈70,53°.`
      ),
    },

    "mates2-geometria-507baa5cb4a0": {
      "a)": answer(
        "k=1",
        ["k=−1", "k=0", "k=2"],
        `La recta es intersección de los planos con normales:
n⃗₁=(1,1,−1), n⃗₂=(1,−1,0).

Un vector director de r es:
v⃗=n⃗₁×n⃗₂=(1,1,2).

El plano π tiene normal n⃗=(1,−k,0). Para que r sea paralela a π:
v⃗·n⃗=0.

Así:
1−k=0 ⇒ k=1.`
      ),
      "b)": answer(
        "d(r,π)=1/√2",
        ["d(r,π)=√2", "d(r,π)=1", "d(r,π)=0"],
        `Para k=1, π: x−y=0.

Obtenemos un punto de r. Tomando y=0 en:
x−y=1,
x+y−z=3,
resulta P=(1,0,−2).

Como la recta es paralela al plano, su distancia es la distancia de P al plano:

d(r,π)=|1−0|/√(1²+(−1)²)=1/√2.`
      ),
    },

    "mates2-geometria-51fcf10fc8e3": {
      "a)": answer(
        "a=3 y b=1",
        ["a=−3 y b=1", "a=3 y b=−1", "a=1 y b=3"],
        `Los vectores directores son:
v⃗r=(−a,1,2),
v⃗s=(1,−1,2).

Para que sean perpendiculares:
v⃗r·v⃗s=0
⇒ −a−1+4=0
⇒ a=3.

Escribimos s en forma paramétrica:
x=2+u, y=2−u, z=−6+2u.

Igualamos con r:
1−3t=2+u,
b+t=2−u,
2t=−6+2u.

De la tercera, u=t+3. En la primera:
1−3t=5+t ⇒ t=−1, u=2.

En la segunda:
b−1=0 ⇒ b=1.`
      ),
      "b)": answer(
        "P=(4,0,−2)",
        ["P=(2,0,−2)", "P=(4,1,−2)", "P=(−2,0,4)"],
        `Con a=3, b=1 y t=−1 en la recta r:
x=1−3(−1)=4,
y=1+(−1)=0,
z=2(−1)=−2.

Por tanto, el punto de corte es:
P=(4,0,−2).

Al sustituir u=2 en s se obtiene el mismo punto.`
      ),
    },

    "mates2-geometria-0b94c2d3d5af": {
      "a)": answer(
        "r': x=−λ, y=1−9λ, z=3λ",
        [
          "r': x=λ, y=1+λ, z=2λ",
          "r': x=−3λ, y=1+λ, z=2λ",
          "r': x=−λ, y=1−3λ, z=9λ",
        ],
        `Parametrizamos r. Tomando y=t:
x=−3t−1,
y=t,
z=2t+1.

Su vector director es v⃗=(−3,1,2).

Sea H el punto de corte perpendicular. Escribimos:
H=(−3t−1,t,2t+1).

La perpendicularidad exige (P−H)·v⃗=0:
(1+3t,1−t,−1−2t)·(−3,1,2)=0.

De aquí:
−4−14t=0 ⇒ t=−2/7.

H=(−1/7,−2/7,3/7). El vector PH⃗ es proporcional a (−1,−9,3).

La recta buscada, en forma paramétrica, es:
x=−λ,
y=1−9λ,
z=3λ.`
      ),
      "b)": answer(
        "P'=(-2/7,−11/7,6/7)",
        [
          "P'=(−1/7,−2/7,3/7)",
          "P'=(2/7,11/7,−6/7)",
          "P'=(−2/7,−4/7,6/7)",
        ],
        `El punto H de corte con r es el punto medio de P y su simétrico P'.

Por tanto:
H=(P+P')/2
⇒ P'=2H−P.

Sustituimos:
P'=2(−1/7,−2/7,3/7)−(0,1,0)
=(-2/7,−11/7,6/7).

Resultado: P'=(-2/7,−11/7,6/7).`
      ),
    },

    "mates2-geometria-3c267d60c69a": {
      "a)": answer(
        "Si m≠−2 se cortan en un punto; si m=−2 no tienen punto común",
        [
          "Se cortan en una recta para todo m",
          "Si m=−2 se cortan en un punto",
          "Son paralelos los tres planos para todo m",
        ],
        `La matriz de coeficientes tiene filas:
(2,−1,1), (0,1,1), (m,1,−1).

Su determinante es:
D=−2(m+2).

Si m≠−2, D≠0 y los tres planos se cortan en un único punto.

Si m=−2, el normal de π₃ es:
n⃗₃=(−2,1,−1)=−n⃗₁.

Sin embargo, π₁ tiene término independiente 0 y π₃ tiene término independiente 8. Son planos paralelos distintos, por lo que los tres planos no tienen ningún punto común.`
      ),
      "b)": answer(
        "π₂ y π₃ son perpendiculares para todo m",
        [
          "Solo son perpendiculares si m=0",
          "Son paralelos para todo m",
          "Solo son perpendiculares si m=−2",
        ],
        `Los vectores normales son:
n⃗₂=(0,1,1),
n⃗₃=(m,1,−1).

Su producto escalar es:
n⃗₂·n⃗₃=0·m+1·1+1·(−1)=0.

Como los normales son perpendiculares independientemente de m, los planos π₂ y π₃ son perpendiculares para todo m∈ℝ.`
      ),
    },

    "mates2-geometria-122e46500a0e": {
      "a)": answer(
        "π: 3x+4y−2z−3=0",
        [
          "π: 3x−4y+2z−3=0",
          "π: x+2y+z−1=0",
          "π: 2x−y+z−2=0",
        ],
        `Parametrizamos la recta r tomando y=t:
x=1−2t,
y=t,
z=−t.

Un punto de r es R=(1,0,0) y su vector director es v⃗=(−2,1,−1).

Otro vector contenido en el plano es:
RP⃗=P−R=(0,1,2).

Un vector normal del plano es:
n⃗=v⃗×RP⃗=(3,4,−2).

Usando el punto R:
3(x−1)+4y−2z=0.

Resultado:
π: 3x+4y−2z−3=0.`
      ),
      "b)": answer(
        "d(M,π)=2/√29",
        ["d(M,π)=1/√29", "d(M,π)=2/29", "d(M,π)=√29/2"],
        `El punto medio de P(1,1,2) y Q(1,1,0) es:
M=((1+1)/2,(1+1)/2,(2+0)/2)=(1,1,1).

Aplicamos la fórmula de distancia de un punto a un plano:

d(M,π)=|3·1+4·1−2·1−3|/√(3²+4²+(−2)²)
=2/√29.

Resultado: d(M,π)=2/√29.`
      ),
    },
  });
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-analisis-df640c5905c9": {
      "b)": answer(
        "A=ln 2−frac{1}{2} unidades cuadradas",
        [
          "A=ln 2+frac{1}{2} unidades cuadradas",
          "A=frac{1}{2} unidades cuadradas",
          "A=2ln 2−1 unidades cuadradas",
        ],
        `Representamos las dos curvas en el primer cuadrante:

f(x)=frac{1}{x},
g(x)=frac{1}{x²},
y la recta x=2.

Buscamos el punto de corte:

frac{1}{x}=frac{1}{x²}, con x>0.

Multiplicamos por x² y obtenemos x=1. Por tanto, las curvas se cortan en P=(1,1).

La recta x=2 corta a las curvas en

Q=(2,frac{1}{2})

y

R=(2,frac{1}{4}).

En [1,2] se cumple frac{1}{x}>frac{1}{x²}. Por ello:

A=∫₁²(frac{1}{x}−frac{1}{x²})dx.

Una primitiva es

ln x+frac{1}{x}.

Aplicamos la regla de Barrow:

A=[ln x+frac{1}{x}]₁²

=(ln 2+frac{1}{2})−(ln 1+1)

=ln 2−frac{1}{2}.

Resultado final: A=ln 2−frac{1}{2} unidades cuadradas.`
      ),
    },
  });
})();

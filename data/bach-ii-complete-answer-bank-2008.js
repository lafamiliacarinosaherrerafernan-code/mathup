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
  const insertAfter = (list, referenceId, exercise) => {
    if (!exercise || list.some((item) => item.id === exercise.id)) return;
    const index = list.findIndex((item) => item.id === referenceId);
    list.splice(index < 0 ? list.length : index + 1, 0, exercise);
  };

  // MATEMÁTICAS II. En 2008 las convocatorias ordinarias reunían varias
  // alternativas en una sola página. Las separamos para que cada alternativa
  // sea una unidad independiente del historial de variedad.
  {
    const list = matesBlock("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-ebcf577b1b42");
    if (exercise) {
      const embedded = copy(exercise.parts?.[1]?.paragraphs?.slice(1) || []);
      const secondParts = copy(exercise.parts?.slice(2) || []);
      exercise.parts = [
        copy(exercise.parts[0]),
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
    const exercise = list.find((item) => item.id === "mates2-algebra-8ecc736a73d6");
    if (exercise && exercise.statement?.length > 1) {
      const statements = copy(exercise.statement);
      exercise.statement = statements.slice(0, 1);
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: statements.slice(1, 2),
        parts: [makePart("Resultado", [])],
      });
    }
  }

  {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-eb36ab0cea06");
    if (exercise) {
      const firstLimit = copy(exercise.parts?.[0]);
      const merged = copy(exercise.parts?.[1]?.paragraphs || []);
      const statements = merged.slice(1, 4);
      exercise.parts = [
        firstLimit,
        makePart("b)", merged.slice(0, 1)),
      ];
      let referenceId = exercise.id;
      for (const [index, suffix] of ["1b", "2a", "2b"].entries()) {
        const cloneId = `${exercise.id}-${suffix}`;
        insertAfter(list, referenceId, {
          ...copy(exercise),
          id: cloneId,
          statement: statements.slice(index, index + 1),
          parts: [makePart("Resultado", [])],
        });
        referenceId = cloneId;
      }
    }
  }

  {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-6f2ba6d6a0dc");
    if (exercise) {
      const firstA = copy(exercise.parts?.[0]);
      const merged = copy(exercise.parts?.[1]?.paragraphs || []);
      const statements = merged.slice(1, 4);
      const lastParts = copy(exercise.parts?.slice(2) || []);
      exercise.parts = [
        firstA,
        makePart("b)", merged.slice(0, 1)),
      ];
      let referenceId = exercise.id;
      for (const [index, suffix] of ["1b", "2a", "2b"].entries()) {
        const cloneId = `${exercise.id}-${suffix}`;
        insertAfter(list, referenceId, {
          ...copy(exercise),
          id: cloneId,
          statement: statements.slice(index, index + 1),
          parts: index === 2 ? lastParts : [makePart("Resultado", [])],
        });
        referenceId = cloneId;
      }
    }
  }

  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-2d82aece9e2c");
    if (exercise && exercise.statement?.length > 1) {
      const statements = copy(exercise.statement);
      const secondParts = copy(exercise.parts);
      exercise.statement = statements.slice(0, 1);
      exercise.parts = [makePart("Resultado", [])];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: statements.slice(1, 2),
        parts: secondParts,
      });
    }
  }

  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-df133f2d7c1b");
    if (exercise) {
      const embedded = copy(exercise.parts?.[1]?.paragraphs?.slice(1) || []);
      const secondParts = copy(exercise.parts?.slice(2) || []);
      exercise.parts = [
        copy(exercise.parts[0]),
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

  // CCSS II. Álgebra mezcla el bloque matricial/sistemas y el problema de
  // programación lineal; Análisis y Probabilidad contienen dos alternativas.
  for (const id of [
    "ccss2-algebra-c7f1e2e57365",
    "ccss2-algebra-48f2e0c828be",
    "ccss2-algebra-b52ead5592cb",
    "ccss2-algebra-993a37b68f24",
  ]) {
    const list = ccssBlock("algebra");
    const exercise = list.find((item) => item.id === id);
    if (!exercise) continue;
    const matrixParagraphs = copy(exercise.parts?.[0]?.paragraphs || []);
    const systemParagraphs = copy(exercise.parts?.[1]?.paragraphs || []);
    const programParagraphs = copy(exercise.parts?.[2]?.paragraphs || []);
    const programHeading = copy(systemParagraphs.slice(1));
    exercise.parts = [
      makePart("a1)", matrixParagraphs.slice(1, 2)),
      makePart("a2)", matrixParagraphs.slice(2)),
      makePart("B)", systemParagraphs.slice(0, 1)),
    ];
    insertAfter(list, exercise.id, {
      ...copy(exercise),
      id: `${exercise.id}-programacion`,
      statement: programHeading.length ? programHeading : [paragraph("BLOQUE 2.")],
      parts: [makePart("Resultado", programParagraphs)],
    });
  }

  for (const id of [
    "ccss2-analisis-c8e5c3f336a7",
    "ccss2-analisis-ecd5e8146f8d",
    "ccss2-analisis-45e50bb73784",
    "ccss2-analisis-d11db64fd7f3",
  ]) {
    const list = ccssBlock("analisis");
    const exercise = list.find((item) => item.id === id);
    if (!exercise) continue;
    const first = copy(exercise.parts?.[0]?.paragraphs || []);
    const second = copy(exercise.parts?.[1]?.paragraphs || []);
    exercise.statement = first.slice(0, 1);
    exercise.parts = [makePart("Resultado", first.slice(1))];
    insertAfter(list, exercise.id, {
      ...copy(exercise),
      id: `${exercise.id}-opcion-b`,
      statement: second.slice(0, 1),
      parts: [makePart("Resultado", second.slice(1))],
    });
  }

  for (const id of [
    "ccss2-probabilidad-baf36687068b",
    "ccss2-probabilidad-1273eb597601",
    "ccss2-probabilidad-8d50c988cbf0",
    "ccss2-probabilidad-9ae579c64585",
  ]) {
    const list = ccssBlock("probabilidad");
    const exercise = list.find((item) => item.id === id);
    if (!exercise) continue;
    const first = copy(exercise.parts?.[0]?.paragraphs || []);
    const second = copy(exercise.parts?.[1]?.paragraphs || []);
    const splitAt = first.findIndex((item) =>
      String(item.plain || "").trim().startsWith("BLOQUE 4")
    );
    exercise.statement = first.slice(0, 1);
    exercise.parts = [makePart("Resultado", first.slice(1, splitAt < 0 ? first.length : splitAt))];
    insertAfter(list, exercise.id, {
      ...copy(exercise),
      id: `${exercise.id}-bloque-4`,
      statement: splitAt < 0 ? [paragraph("BLOQUE 4.")] : first.slice(splitAt),
      parts: [makePart("Resultado", second)],
    });
  }

  // Las respuestas se incorporan por bloques debajo. El fichero solo se
  // activa en index.html cuando la auditoría confirma cuatro opciones únicas
  // y una solución completa para todos los apartados de 2008.
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-ebcf577b1b42": {
      "a)": answer(
        "Aⁿ=((1,0,0),(n,1,0),(0,0,1))",
        ["Aⁿ=((1,0,0),(1,n,0),(0,0,1))", "Aⁿ=((1,0,0),(n−1,1,0),(0,0,1))", "Aⁿ=((1,0,0),(n,n,0),(0,0,1))"],
        `Escribimos A=I+N, donde N=((0,0,0),(1,0,0),(0,0,0)). Como N²=0, el binomio de Newton da:
Aⁿ=(I+N)ⁿ=I+nN=((1,0,0),(n,1,0),(0,0,1)).`
      ),
      "b)": answer(
        "(Aⁿ)⁻¹=((1,0,0),(−n,1,0),(0,0,1))",
        ["(Aⁿ)⁻¹=((1,0,0),(n,−1,0),(0,0,1))", "(Aⁿ)⁻¹=((1,0,0),(−n,0,0),(0,0,1))", "(Aⁿ)⁻¹=((1,0,0),(n,1,0),(0,0,1))"],
        `Como N²=0:
(I+nN)(I−nN)=I−n²N²=I.
Por tanto:
(Aⁿ)⁻¹=I−nN=((1,0,0),(−n,1,0),(0,0,1)).
La multiplicación Aⁿ·(Aⁿ)⁻¹=I₃ comprueba el resultado.`
      ),
    },
    "mates2-algebra-ebcf577b1b42-opcion-b": {
      "a)": answer(
        "No existe ningún valor de a para el que sea compatible determinado",
        ["Es compatible determinado si a=3", "Es compatible determinado si a≠3", "Es compatible determinado para todo a"],
        `La tercera fila de coeficientes es la suma de las dos primeras: F₃=F₁+F₂. Por ello rango(A)=2<3 para cualquier a. Según Rouché-Frobenius, con tres incógnitas solo habría solución única si rango(A)=rango(A*)=3. Por tanto, no existe ningún valor de a que haga el sistema compatible determinado.`
      ),
      "b)": answer(
        "Si a=3, el sistema es compatible indeterminado",
        ["Si a=3, el sistema es incompatible", "Si a=3, el sistema es compatible determinado", "Si a≠3, el sistema es compatible indeterminado"],
        `El primer miembro de la tercera ecuación es la suma de los dos primeros:
(x+y−z)+(x−y+2z)=2x+z.
Para que la misma relación se cumpla en los términos independientes debe ser a=1+2=3. En ese caso:
rango(A)=rango(A*)=2<3.
Por Rouché-Frobenius, el sistema es compatible indeterminado.`
      ),
      "c)": answer(
        "Si a≠3, el sistema es incompatible",
        ["Si a≠3, el sistema es compatible determinado", "Si a≠3, el sistema es compatible indeterminado", "El sistema nunca es incompatible"],
        `Si a≠3, la relación F₃=F₁+F₂ se mantiene en los coeficientes, pero no en los términos independientes. Entonces rango(A)=2 y rango(A*)=3. Como los rangos son distintos, el sistema es incompatible.`
      ),
    },
    "mates2-algebra-8ecc736a73d6": {
      "Resultado": answer(
        "Los determinantes pedidos valen −9 y 12, respectivamente",
        ["Los determinantes pedidos valen 9 y 12", "Los determinantes pedidos valen −9 y −12", "Los determinantes pedidos valen 6 y 12"],
        `Sea D=|((x,−3,1),(y,0,1),(z,7,1))|=6.
En el primer determinante sacamos 1/2 de la primera columna y 3 de la tercera:
D₁=(3/2)|((z,z+7,1),(y,y,1),(x,x−3,1))|.
La segunda columna se obtiene sumando la primera a la segunda y las filas aparecen en orden inverso. El cambio F₁↔F₃ cambia el signo:
D₁=(3/2)(−D)=−9.
En el determinante de orden cuatro hacemos C₄←C₄−2C₃. Al desarrollar por la cuarta columna queda D₂=2D=12.`
      ),
    },
    "mates2-algebra-8ecc736a73d6-opcion-b": {
      "Resultado": answer(
        "SCD si a≠−2,3; SCI si a=−2 o a=3. Para a=−2: (x,y,z)=(0,−t,t)",
        ["SCD para todo a; para a=−2: (0,0,0)", "SCI solo si a=3; para a=−2 es SCD", "SI si a=−2 o a=3; SCD en los demás casos"],
        `Es un sistema homogéneo, por lo que siempre es compatible. Un menor de orden 3 es:
D=a²−a−6=(a−3)(a+2).
Si a≠−2,3, rango(A)=3 y el sistema es compatible determinado, con la solución trivial.
Si a=−2 o a=3, rango(A)<3 y el sistema es compatible indeterminado.
Para a=−2, de y+z=0 obtenemos y=−z y, al sustituir, x=0. Tomando z=t:
(x,y,z)=(0,−t,t), t∈R.`
      ),
    },
    "mates2-algebra-e25b2b017607": {
      "a)": answer(
        "rango(A·B)=2 para todo λ∈R",
        ["rango(A·B)=1 para todo λ", "rango(A·B)=3 para todo λ", "rango(A·B)=2 solo si λ≠0"],
        `Las dos columnas de A son linealmente independientes, luego rango(A)=2. Las dos filas de B son independientes para cualquier λ porque sus segundas componentes son 0 y −1; así, rango(B)=2. Como A define una aplicación inyectiva sobre R², al multiplicar A·B no se pierde el rango de B. Por tanto, rango(A·B)=2 para todo λ∈R.`
      ),
      "b)": answer(
        "(B·A)⁻¹=((1,−λ/3),(1,−(λ+1)/3))",
        ["(B·A)⁻¹=((1,λ/3),(−1,(λ+1)/3))", "(B·A)⁻¹=((λ+1,−λ),(3,−3))", "(B·A)⁻¹=((1,−λ),(1,−λ−1))"],
        `Multiplicamos:
B·A=((λ+1,−λ),(3,−3)).
Su determinante es:
det(B·A)=(λ+1)(−3)−(−λ)·3=−3≠0.
Por tanto, es invertible para todo λ. Aplicando la fórmula de la inversa de una matriz de orden 2:
(B·A)⁻¹=(1/−3)((−3,λ),(−3,λ+1))
=((1,−λ/3),(1,−(λ+1)/3)).`
      ),
    },
    "mates2-algebra-3b21985d6b8c": {
      "a)": answer(
        "SCD si a≠1/2; incompatible si a=1/2",
        ["SCD para todo a", "SCI si a=1/2; SCD en los demás casos", "Incompatible si a≠1/2; SCD si a=1/2"],
        `Calculamos el determinante de la matriz de coeficientes mediante Sarrus:
det(A)=3−6a=3(1−2a).
Si a≠1/2, det(A)≠0 y rango(A)=rango(A*)=3: el sistema es compatible determinado.
Si a=1/2, al reducir aparecen simultáneamente (1/2)y−z=2 y (1/2)y−z=0. Son contradictorias, por lo que rango(A)<rango(A*) y el sistema es incompatible.`
      ),
      "b)": answer(
        "X=(5/3,10/3,4/3)ᵀ",
        ["X=(5/3,−10/3,4/3)ᵀ", "X=(1,2,3)ᵀ", "X=(4/3,10/3,5/3)ᵀ"],
        `Para a=0, det(A)=3. Calculamos la adjunta de la traspuesta:
Adj(Aᵀ)=((0,1,1),(−3,−1,5),(0,−1,2)).
Entonces:
A⁻¹=Adj(Aᵀ)/det(A)=(1/3)((0,1,1),(−3,−1,5),(0,−1,2)).
Finalmente:
X=A⁻¹B=(1/3)((0,1,1),(−3,−1,5),(0,−1,2))·((1),(2),(3))
=((5/3),(10/3),(4/3)).`
      ),
    },
    "mates2-algebra-676cfc737e63": {
      "a)": answer(
        "A²=A",
        ["A²=I₃", "A²=2A", "A²=0"],
        `Multiplicamos A por sí misma, fila por columna:
A²=((1/2,0,1/2),(0,1,0),(1/2,0,1/2))=A.
La matriz es idempotente y Aⁿ=A para todo entero n≥1.`
      ),
      "b)": answer(
        "X=((0,0,1/3),(0,1/3,0),(1/3,0,0))",
        ["X=((1/3,0,0),(0,1/3,0),(0,0,1/3))", "X=((0,0,3),(0,3,0),(3,0,0))", "X=((0,1/3,0),(1/3,0,0),(0,0,1/3))"],
        `Como A¹⁰=A, la ecuación queda 6AX=3X+I₃. Sacamos X como factor común por la derecha:
(6A−3I₃)X=I₃.
Calculamos:
6A−3I₃=((0,0,3),(0,3,0),(3,0,0)).
Multiplicamos por la izquierda por su inversa:
X=(6A−3I₃)⁻¹
=((0,0,1/3),(0,1/3,0),(1/3,0,0)).`
      ),
    },
    "mates2-algebra-469600ad459d": {
      "a)": answer(
        "No; si n>m, rango(A)≤m<n y no puede haber solución única",
        ["Sí, siempre que rango(A)=m", "Sí, porque hay más incógnitas que ecuaciones", "No, porque el sistema siempre es incompatible"],
        `Rouché-Frobenius establece que el sistema es compatible si rango(A)=rango(A*) y es compatible determinado si, además, ese rango coincide con el número n de incógnitas. Cuando n>m, rango(A)≤m<n. Por tanto, el rango no puede alcanzar n y el sistema nunca puede ser compatible determinado.`
      ),
      "b)": answer(
        "rango(A*)=n y el sistema es compatible determinado",
        ["rango(A*)=n−1 y el sistema es compatible indeterminado", "rango(A*)=n+1 y el sistema es incompatible", "No puede determinarse el rango de A*"],
        `Si n=m y det(A)≠0, A es invertible y rango(A)=n. La matriz ampliada contiene a A, de modo que rango(A*)≥n; como tiene n filas, rango(A*)≤n. Por tanto:
rango(A*)=rango(A)=n.
Según Rouché-Frobenius, el sistema es compatible determinado y su única solución es X=A⁻¹B.`
      ),
    },
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-analisis-eb36ab0cea06": {
      "a)": answer(
        "−7",
        ["7", "−1", "No existe"],
        `Al sustituir x=0 aparece la indeterminación 0/0, por lo que aplicamos la regla de L'Hôpital:
lim(x→0) (3x²−16x+7)/(2x−1)=7/(−1)=−7.
Por tanto, el límite vale −7.`
      ),
      "b)": answer(
        "e^(1−2/π)",
        ["e^(2/π−1)", "1−2/π", "e"],
        `La base tiende a 1 y el exponente a infinito. Usamos la fórmula del número e:
L=e^K,
K=lim(x→π/2)[(2x/π+cos x)−1]/cos x.
Al sustituir aparece 0/0. Aplicamos L'Hôpital:
K=lim(x→π/2)(2/π−sen x)/(−sen x)=1−2/π.
Por tanto:
L=e^(1−2/π).`
      ),
    },
    "mates2-analisis-eb36ab0cea06-1b": {
      "Resultado": answer(
        "a=2 y b=−e",
        ["a=−2 y b=e", "a=2 y b=e", "a=1 y b=−e"],
        `Sea f(x)=(x²−a)eˣ+bx. Derivamos:
f'(x)=(x²+2x−a)eˣ+b,
f''(x)=(x²+4x+2−a)eˣ.
Para que x=0 sea punto de inflexión debe cumplirse f''(0)=0:
2−a=0, luego a=2.
Para que x=1 sea extremo relativo:
f'(1)=e+b=0, luego b=−e.
Además, f''(1)=5e>0, por lo que el extremo de x=1 es un mínimo.`
      ),
    },
    "mates2-analisis-eb36ab0cea06-2a": {
      "Resultado": answer(
        "x²+x−4 ln|x−2|+6 ln|x−3|+C",
        ["x²−x+4 ln|x−2|−6 ln|x−3|+C", "2x²+x−4 ln|x−2|+6 ln|x−3|+C", "x²+x+2 ln|x²−5x+6|+C"],
        `Dividimos los polinomios:
(2x³−9x²+9x+6)/(x²−5x+6)=2x+1+2x/((x−2)(x−3)).
Descomponemos en fracciones simples:
2x/((x−2)(x−3))=A/(x−2)+B/(x−3).
Entonces 2x=A(x−3)+B(x−2). Para x=2, A=−4; para x=3, B=6.
Integramos término a término:
I=∫(2x+1−4/(x−2)+6/(x−3))dx
=x²+x−4 ln|x−2|+6 ln|x−3|+C.`
      ),
    },
    "mates2-analisis-eb36ab0cea06-2b": {
      "Resultado": answer(
        "(e^π+1)/2",
        ["(e^π−1)/2", "e^π+1", "1/2"],
        `Integramos por partes dos veces, o usamos la primitiva conocida:
∫eˣ sen x dx=(eˣ/2)(sen x−cos x)+C.
Aplicamos la regla de Barrow:
I=[(eˣ/2)(sen x−cos x)]₀^π
=e^π/2−(−1/2)
=(e^π+1)/2.`
      ),
    },
    "mates2-analisis-6f2ba6d6a0dc": {
      "a)": answer(
        "Dom(f)=(−1,1) y Dom(g)=R",
        ["Dom(f)=R y Dom(g)=(−1,1)", "Dom(f)=[−1,1] y Dom(g)=R", "Ambos dominios son R"],
        `Para que exista un logaritmo, su argumento debe ser positivo.
Para f(x)=ln(1−x²):
1−x²>0 ⇔ x²<1 ⇔ −1<x<1.
Por tanto, Dom(f)=(−1,1).
Para g(x)=ln(1+x²), se cumple 1+x²>0 para todo x real. Así, Dom(g)=R.`
      ),
      "b)": answer(
        "f no tiene puntos de inflexión; g los tiene en (−1,ln 2) y (1,ln 2)",
        ["f y g tienen puntos de inflexión en x=0", "f los tiene en x=±1 y g no tiene", "Ninguna de las dos tiene puntos de inflexión"],
        `Calculamos las segundas derivadas:
f''(x)=−2(1+x²)/(1−x²)²<0 en (−1,1).
Su signo no cambia, por lo que f no tiene puntos de inflexión.
Para g:
g''(x)=2(1−x²)/(1+x²)².
Se anula en x=−1 y x=1. Su signo es negativo en (−∞,−1), positivo en (−1,1) y negativo en (1,∞), por lo que cambia la curvatura en ambos valores.
Como g(±1)=ln 2, los puntos son (−1,ln 2) y (1,ln 2).`
      ),
    },
    "mates2-analisis-6f2ba6d6a0dc-1b": {
      "Resultado": answer(
        "a=−2, b=3; la tangente en x=0 es y=3x",
        ["a=2, b=−1; y=−x", "a=−2, b=3; y=3x−1", "a=3, b=−2; y=−2x"],
        `La función es f(x)=(ax²+bx)e^(−x). Como pasa por P(1,e^(−1)):
(a+b)e^(−1)=e^(−1) ⇒ a+b=1.
Derivamos:
f'(x)=e^(−x)[−ax²+(2a−b)x+b].
El extremo en x=3 exige f'(3)=0:
−3a−2b=0.
Resolvemos el sistema {a+b=1; 3a+2b=0} y obtenemos a=−2, b=3.
En x=0, f(0)=0 y f'(0)=b=3. La recta tangente es:
y−0=3(x−0), es decir, y=3x.`
      ),
    },
    "mates2-analisis-6f2ba6d6a0dc-2a": {
      "Resultado": answer(
        "a=π",
        ["a=π/2", "a=2π", "a=3π"],
        `Sea f(x)=(a+x)sen x. Su derivada es:
f'(x)=sen x+(a+x)cos x,
de modo que la pendiente en x=0 es f'(0)=a.
Calculamos la integral:
∫₀^π(a+x)sen x dx=2a+π.
El enunciado dice que la integral es tres veces la pendiente:
2a+π=3a.
Por tanto, a=π.`
      ),
    },
    "mates2-analisis-6f2ba6d6a0dc-2b": {
      "a)": answer(
        "f(x)=2xe^(x²) es estrictamente creciente en R",
        ["f(x)=e^(x²) es decreciente", "f(x)=2xe^(x²) solo crece si x>0", "f(x)=x²eˣ es creciente"],
        `Como F(x)=e^(x²) es una primitiva de f, se cumple:
f(x)=F'(x)=2xe^(x²).
Derivamos para estudiar su crecimiento:
f'(x)=2e^(x²)(1+2x²).
Los dos factores son positivos para todo x∈R. Por tanto, f'(x)>0 en R y f es estrictamente creciente en todo R.`
      ),
      "b)": answer(
        "2(e−1) unidades cuadradas",
        ["e−1 unidades cuadradas", "2e unidades cuadradas", "e²−1 unidades cuadradas"],
        `La función f(x)=2xe^(x²) es impar y se anula en x=0. Es negativa en [−1,0] y positiva en [0,1].
Por simetría, el área es:
A=2∫₀¹2xe^(x²)dx.
Una primitiva es e^(x²). Aplicamos Barrow:
A=2[e^(x²)]₀¹=2(e−1).
Por tanto, el área vale 2(e−1) unidades cuadradas.`
      ),
    },
    "mates2-analisis-b6c890885621": {
      "Resultado": answer(
        "k=−2 y p=1",
        ["k=2 y p=−1", "k=−1 y p=0", "k=0 y p=1"],
        `El teorema de Lagrange exige continuidad en [−1,3] y derivabilidad en (−1,3). Solo debemos estudiar la unión x=0.
Continuidad:
f(0)=−k,
lim(x→0⁺)f(x)=1+p.
Luego −k=1+p.
Derivabilidad:
f'₋(0)=−1−k,
f'₊(0)=1.
Igualamos: −1−k=1, de donde k=−2.
Sustituyendo en la continuidad: 2=1+p, luego p=1.`
      ),
    },
    "mates2-analisis-4efe5254b567": {
      "Resultado": answer(
        "a=7, b=−5 y f^(2008)(x)=7 sen x−5 cos x",
        ["a=−5, b=7 y f^(2008)(x)=−5 sen x+7 cos x", "a=7, b=−5 y f^(2008)(x)=−7 sen x+5 cos x", "a=2, b=0 y f^(2008)(x)=2 sen x"],
        `Como f(π/4)=√2:
(a+b)√2/2=√2 ⇒ a+b=2.
Derivamos: f'(x)=a cos x−b sen x. La pendiente en π/2 es:
f'(π/2)=−b=5 ⇒ b=−5.
Así, a=7.
Las derivadas de seno y coseno se repiten cada cuatro órdenes:
f, f', f'', f'''; f^(IV)=f.
Como 2008=4·502+0, el resto es 0 y f^(2008)=f.
Por tanto:
f^(2008)(x)=7 sen x−5 cos x.`
      ),
    },
    "mates2-analisis-bfa6708472a9": {
      "Resultado": answer(
        "e−1",
        ["e+1", "2e−1", "1"],
        `Buscamos una primitiva por integración por partes. Se comprueba que:
∫(x²+x)eˣdx=eˣ(x²−x+1)+C,
porque al derivar el segundo miembro resulta (x²+x)eˣ.
Aplicamos la regla de Barrow:
I=[eˣ(x²−x+1)]₀¹=e−1.`
      ),
    },
    "mates2-analisis-dcef9f8036c1": {
      "Resultado": answer(
        "(1/2)ln(1+e^(2x))+arctan(eˣ)+C",
        ["ln(1+eˣ)+arctan(e^(2x))+C", "(1/2)ln(1+e^(2x))−arctan(eˣ)+C", "ln(1+e^(2x))+C"],
        `Hacemos el cambio t=eˣ, por lo que dt=eˣdx y dx=dt/t:
∫(e^(2x)+eˣ)/(1+e^(2x))dx
=∫(t+1)/(1+t²)dt
=∫t/(1+t²)dt+∫1/(1+t²)dt.
Por tanto:
I=(1/2)ln(1+t²)+arctan t+C.
Volviendo a x:
I=(1/2)ln(1+e^(2x))+arctan(eˣ)+C.`
      ),
    },
    "mates2-analisis-f984bda4f17b": {
      "Resultado": answer(
        "k=10",
        ["k=5", "k=20", "k=−10"],
        `En el primer límite aparece 0/0. Aplicamos L'Hôpital dos veces:
L₁=lim(x→0)(ke^(kx)−k)/(2kx)
=lim(x→0)k²e^(kx)/(2k)=k/2.
En el segundo límite también aparece 0/0. Aplicamos L'Hôpital:
L₂=lim(x→0)(8cos x+2sec²x)/(1+cos x)=10/2=5.
Igualamos ambos valores:
k/2=5.
Como k≠0, obtenemos k=10.`
      ),
    },
    "mates2-analisis-e11322ebed10": {
      "Resultado": answer(
        "a=2, b=−2, c=−4; normal: y=−x/4−15/4",
        ["a=2, b=2, c=−4; y=x/4−15/4", "a=−2, b=2, c=4; y=−4x", "a=1, b=1, c=6; y=−x/4+15/4"],
        `La función es f(x)=ax³+bx+c y f'(x)=3ax²+b.
Como pasa por P(2,8):
8a+2b+c=8.
El mínimo en x=√3/3 exige f'(√3/3)=0:
a+b=0.
La pendiente en x=1 es 4:
3a+b=4.
Resolvemos el sistema y obtenemos a=2, b=−2, c=−4. Además, f''(√3/3)>0, luego es mínimo.
En x=1, f(1)=−4 y la pendiente tangente es m=4. Para la normal, m·mₙ=−1:
4mₙ=−1 ⇒ mₙ=−1/4.
Así:
y+4=−(1/4)(x−1),
y=−x/4−15/4.`
      ),
    },
    "mates2-analisis-2e8270bf68db": {
      "Resultado": answer(
        "81/2 unidades cuadradas",
        ["81/4 unidades cuadradas", "81 unidades cuadradas", "27/2 unidades cuadradas"],
        `Hallamos los cortes con el eje OX:
x³−9x=x(x−3)(x+3)=0,
por lo que x=−3,0,3.
La función es impar; es positiva en (−3,0) y negativa en (0,3). El área total es:
A=2∫₀³(9x−x³)dx.
Aplicando Barrow:
A=2[(9/2)x²−x⁴/4]₀³
=2(81/2−81/4)=81/2.
Por tanto, el área es 81/2 unidades cuadradas.`
      ),
    },
    "mates2-analisis-aef8e741a8cb": {
      "Resultado": answer(
        "∫ln x dx=x ln x−x+C; ∫tan x dx=−ln|cos x|+C",
        ["∫ln x dx=(ln x)²/2+C; ∫tan x dx=ln|sen x|+C", "∫ln x dx=x ln x+C; ∫tan x dx=ln|cos x|+C", "∫ln x dx=1/x+C; ∫tan x dx=sec²x+C"],
        `Para la primera integral aplicamos integración por partes:
u=ln x, dv=dx,
du=dx/x, v=x.
Entonces:
∫ln x dx=x ln x−∫1dx=x ln x−x+C.
Para la segunda usamos tan x=sen x/cos x y el cambio t=cos x, dt=−sen x dx:
∫tan x dx=−∫dt/t=−ln|t|+C
=−ln|cos x|+C.`
      ),
    },
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-geometria-2d82aece9e2c": {
      "Resultado": answer(
        "a=3/5, b=1/5, c=−5; u y v forman 90°",
        ["a=−3/5, b=1/5, c=5; forman 60°", "a=3/5, b=−1/5, c=−5; forman 45°", "a=1, b=1, c=−5; forman 90°"],
        `La perpendicularidad de v=(−3,4,1) y w=(1,2,c) exige:
v·w=−3+8+c=0 ⇒ c=−5.
Ahora imponemos u×w=v:
(a,b,1)×(1,2,−5)=(−5b−2,1+5a,2a−b)=(−3,4,1).
De las dos primeras componentes:
−5b−2=−3 ⇒ b=1/5,
1+5a=4 ⇒ a=3/5.
La tercera componente verifica 2a−b=1.
Finalmente:
u·v=(3/5)(−3)+(1/5)4+1=0.
Por tanto, u y v son perpendiculares y forman un ángulo de 90°.`
      ),
    },
    "mates2-geometria-2d82aece9e2c-opcion-b": {
      "a)": answer(
        "AB·AC=0 para todo λ, luego forman 90°",
        ["AB·AC=λ, luego solo forman 90° si λ=0", "AB×AC=0 para todo λ", "El ángulo depende de λ"],
        `Calculamos los vectores con origen en A:
AB=(λ,1,−λ),
AC=(λ,λ,1+λ).
Su producto escalar es:
AB·AC=λ²+λ−λ(1+λ)
=λ²+λ−λ−λ²=0.
Como ambos vectores tienen producto escalar nulo, son perpendiculares para cualquier valor de λ y forman un ángulo de 90°.`
      ),
      "b)": answer(
        "λ=1 o λ=−7/5",
        ["λ=1 únicamente", "λ=−1 o λ=7/5", "λ=0 o λ=3"],
        `El ángulo recto está en A, por lo que la hipotenusa es BC:
BC=C−B=(0,λ−1,1+2λ).
Imponemos que su longitud sea 3:
|BC|²=(λ−1)²+(1+2λ)²=9.
Desarrollamos:
5λ²+2λ+2=9,
5λ²+2λ−7=0.
Aplicando la fórmula de la ecuación de segundo grado:
λ=(−2±√144)/10.
Por tanto, λ=1 o λ=−7/5.`
      ),
    },
    "mates2-geometria-df133f2d7c1b": {
      "a)": answer(
        "La recta es paralela al plano para todo k∈R",
        ["Solo es paralela si k=−4", "Solo es paralela si k=0", "Nunca es paralela"],
        `Escribimos la recta en forma paramétrica:
x=3+2t,
y=−1+t,
z=−t.
Su vector director es v=(2,1,−1). El vector normal del plano es n=(1,−1,1).
Calculamos:
v·n=2−1−1=0.
Como el vector director es perpendicular al vector normal, la recta es paralela al plano. El parámetro k solo cambia el término independiente del plano, no su vector normal; por ello la afirmación vale para todo k∈R.`
      ),
      "b)": answer(
        "k=−4",
        ["k=4", "k=0", "k=−1"],
        `Para que una recta paralela a un plano esté contenida en él basta comprobar que uno de sus puntos pertenece al plano.
Tomamos t=0 en la recta:
P=(3,−1,0).
Sustituimos en π:
3−(−1)+0+k=0,
4+k=0.
Por tanto, k=−4.`
      ),
    },
    "mates2-geometria-df133f2d7c1b-opcion-b": {
      "a)": answer(
        "d(P,π)=√6/3",
        ["d(P,π)=2", "d(P,π)=√6", "d(P,π)=1/3"],
        `Los vectores directores del plano son u=(1,−1,1) y v=(1,1,0). Su producto vectorial proporciona un vector normal:
n=u×v=(−1,1,2).
Como el plano pasa por (1,1,0), su ecuación general es:
−(x−1)+(y−1)+2z=0,
−x+y+2z=0.
Aplicamos la fórmula de la distancia:
d(P,π)=|−2+2+2|/√(1+1+4)
=2/√6=√6/3.`
      ),
      "b)": answer(
        "r: x+y−4=0, 2x+z−5=0",
        ["r: x−y=0, x+z−3=0", "r: x+y+4=0, 2x+z+5=0", "r: x−2y=0, y+z−3=0"],
        `La recta perpendicular al plano tiene como vector director el vector normal n=(−1,1,2) y pasa por P=(2,2,1). Su forma paramétrica es:
x=2−t,
y=2+t,
z=1+2t.
Eliminamos t. De las dos primeras ecuaciones:
x+y=4.
Además:
2x+z=2(2−t)+(1+2t)=5.
Por tanto, unas ecuaciones generales de la recta son:
r: {x+y−4=0; 2x+z−5=0}.`
      ),
    },
    "mates2-geometria-bcfd77f1e7db": {
      "a)": answer(
        "k=√11",
        ["k=√5", "k=11", "k=2"],
        `Los vectores normales son n₁=(2,1,k) y n₂=(3,4,0). Para un ángulo de 60°:
|n₁·n₂|/(|n₁||n₂|)=cos60°=1/2.
Sustituimos:
10/(5√(5+k²))=1/2.
Así, √(5+k²)=4, luego k²=11. Como k>0:
k=√11.`
      ),
      "b)": answer(
        "No existe ningún valor de k",
        ["k=0", "k=−10", "k=√11"],
        `Dos planos son perpendiculares si sus vectores normales tienen producto escalar nulo:
n₁·n₂=(2,1,k)·(3,4,0)=6+4=10.
Este producto no depende de k y nunca es cero. Por tanto, no existe ningún valor de k para el que los planos sean perpendiculares.`
      ),
    },
    "mates2-geometria-2485ea46a716": {
      "a)": answer(
        "D=(2,3,7)",
        ["D=(0,1,5)", "D=(4,5,9)", "D=(1,2,6)"],
        `Parametrizamos la recta tomando y=t:
D=(t−1,t,t+4).
Usamos AB=(2,4,2), AC=(−1,−3,4) y AD=(t−2,t−2,t+3). Los cuatro puntos son coplanarios si el producto mixto es cero:
[AB,AC,AD]=(AB×AC)·AD.
Calculamos AB×AC=(22,−10,−2), de modo que:
[AB,AC,AD]=10t−30.
Igualamos a cero: 10t−30=0 ⇒ t=3.
Por tanto, D=(2,3,7).`
      ),
      "b)": answer(
        "D'=(0,1,5) o D'=(4,5,9)",
        ["D'=(2,3,7) únicamente", "D'=(−1,0,4) o D'=(5,6,10)", "D'=(1,2,6) o D'=(3,4,8)"],
        `El volumen del tetraedro es:
V=|[AB,AC,AD']|/6.
Para D'=(t−1,t,t+4), el producto mixto vale 10t−30. Imponemos V=10/3:
|10t−30|/6=10/3.
Entonces |10t−30|=20, es decir, |t−3|=2.
Obtenemos t=1 o t=5. Los puntos correspondientes son:
D'=(0,1,5) o D'=(4,5,9).`
      ),
    },
    "mates2-geometria-a6ae293282c2": {
      "a)": answer(
        "Si k≠−5 se cortan en un punto; si k=−5 se cortan en una recta",
        ["Si k=−5 no tienen puntos comunes", "Para todo k se cortan en una recta", "Si k≠−5 son paralelos"],
        `Formamos la matriz de coeficientes y calculamos su determinante:
D=|((1,1,−1),(2,0,2),(1,3,k))|=−2(k+5).
Si k≠−5, D≠0 y el sistema formado por los tres planos es compatible determinado: se cortan en un único punto.
Si k=−5, la tercera ecuación es combinación lineal de las dos primeras:
π₃=3π₁−π₂.
Por tanto, rango(A)=rango(A*)=2<3 y los tres planos se cortan en una recta.`
      ),
      "b)": answer(
        "x=t, y=1−2t, z=−t",
        ["x=t, y=1+2t, z=t", "x=−t, y=1−t, z=t", "x=1+t, y=−2t, z=t"],
        `La intersección es una recta cuando k=−5. Resolvemos las dos ecuaciones independientes:
x+y−z=1,
2x+2z=0.
De la segunda, z=−x. Sustituimos en la primera:
x+y+x=1 ⇒ y=1−2x.
Tomando x=t, obtenemos:
x=t,
y=1−2t,
z=−t.`
      ),
    },
    "mates2-geometria-27c0fa9beae6": {
      "Resultado": answer(
        "a=6",
        ["a=4", "a=8", "a=−6"],
        `El vector normal del plano es n=(2,1,−1). Como P' es la proyección ortogonal de P, el vector PP' debe ser paralelo a n:
PP'=(8−a,13−2a,17−3a)=λ(2,1,−1).
De las dos primeras componentes:
8−a=2λ,
13−2a=λ.
Sustituimos la segunda en la primera:
8−a=2(13−2a),
3a=18,
a=6.
La tercera componente también se verifica: P=(6,12,18), PP'=(2,1,−1)=n.`
      ),
    },
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-c7f1e2e57365": {
      "a1)": answer(
        "X=(2I−A)⁻¹B",
        ["X=B(2I−A)⁻¹", "X=(A−2I)⁻¹B", "X=2I−A−B"],
        `Partimos de 2X−B=AX y agrupamos los términos que contienen X:
2X−AX=B.
Sacamos factor común por la izquierda:
(2I−A)X=B.
Si 2I−A es invertible, multiplicamos por su inversa a la izquierda:
(2I−A)⁻¹(2I−A)X=(2I−A)⁻¹B.
Por tanto, X=(2I−A)⁻¹B.`
      ),
      "a2)": answer(
        "X=((1,−1),(−1,1),(0,1))",
        ["X=((1,1),(−1,1),(0,−1))", "X=((0,−1),(1,1),(1,0))", "X=((1,−1),(0,1),(−1,1))"],
        `Calculamos primero:
2I−A=((1,0,−1),(−2,1,0),(1,−3,1)).
Su determinante vale −2, por lo que la matriz es invertible. Aplicando la fórmula
(2I−A)⁻¹=Adj((2I−A)ᵀ)/det(2I−A)
y efectuando el producto X=(2I−A)⁻¹B, obtenemos:
X=((1,−1),(−1,1),(0,1)).
Comprobación: (2I−A)X=B, luego 2X−B=AX.`
      ),
      "B)": answer(
        "5 cajas grandes, 3 medianas y 2 pequeñas",
        ["3 grandes, 5 medianas y 2 pequeñas", "4 grandes, 2 medianas y 4 pequeñas", "5 grandes, 2 medianas y 3 pequeñas"],
        `Sean g, m y p los números de cajas grandes, medianas y pequeñas. Las condiciones forman el sistema:
g+m+p=10,
50g+30m+25p=390,
g−1=m+1.
De la tercera ecuación, g−m=2. Resolviendo el sistema se obtiene m=3, g=5 y p=2.
Comprobación: 5+3+2=10 y 50·5+30·3+25·2=390.`
      ),
    },
    "ccss2-algebra-c7f1e2e57365-programacion": {
      "Resultado": answer(
        "4 mensajes, 7 llamadas y un beneficio máximo de 2,35 €",
        ["5 mensajes, 2 llamadas y 1,25 €", "3 mensajes, 0 llamadas y 0,45 €", "0 mensajes, 3 llamadas y 0,75 €"],
        `Llamamos x al número de mensajes e y al número de llamadas. La función objetivo es:
B(x,y)=0,15x+0,25y.
Las restricciones son:
y≤x+3, y≥x−3, 5x+y≤27, x≥0, y≥0.
Los vértices de la región factible son (0,0), (0,3), (4,7), (5,2) y (3,0).
Evaluamos B en todos ellos:
B(0,0)=0; B(0,3)=0,75; B(4,7)=2,35; B(5,2)=1,25; B(3,0)=0,45.
El máximo se alcanza en (4,7). Por tanto, deben enviarse 4 mensajes y realizarse 7 llamadas; el beneficio máximo es 2,35 €.`
      ),
    },
    "ccss2-algebra-48f2e0c828be": {
      "a1)": answer(
        "X=B(A−I)⁻¹",
        ["X=(A−I)⁻¹B", "X=B(I−A)⁻¹", "X=A⁻¹(B+I)"],
        `Partimos de XA−X=B. Como X=XI, sacamos factor común por la derecha:
X(A−I)=B.
Para aislar X debemos multiplicar por la derecha por la inversa de A−I:
X(A−I)(A−I)⁻¹=B(A−I)⁻¹.
Por tanto, X=B(A−I)⁻¹. El orden de los factores no se puede intercambiar.`
      ),
      "a2)": answer(
        "X=((1,2,0),(−1,−2,1))",
        ["X=((1,−2,0),(−1,2,1))", "X=((0,2,1),(1,−2,−1))", "X=((1,2,−1),(0,−2,1))"],
        `Calculamos:
A−I=((0,−1,2),(0,0,3),(−1,1,−2)).
Su determinante es 3≠0, luego tiene inversa. Mediante
(A−I)⁻¹=Adj((A−I)ᵀ)/det(A−I)
y respetando el producto por la derecha:
X=B(A−I)⁻¹=((1,2,0),(−1,−2,1)).
Comprobación: X(A−I)=B, equivalente a XA−X=B.`
      ),
      "B)": answer(
        "150 alumnos, 80 profesores y 40 acompañantes",
        ["150 alumnos, 40 profesores y 80 acompañantes", "160 alumnos, 75 profesores y 35 acompañantes", "140 alumnos, 85 profesores y 45 acompañantes"],
        `Hay 5·54=270 viajeros, porque cada autobús reserva una plaza para el conductor. Sean A, P y C los alumnos, profesores y acompañantes:
A+P+C=270.
La segunda condición da 0,1P+0,2C=0,1A+1, es decir, P+2C=A+10.
La última condición es A=2(P−5).
Reunimos las tres ecuaciones en un sistema y lo resolvemos. Se obtiene:
A=150, P=80, C=40.
Comprobación: 150+80+40=270 y 8+8=15+1.`
      ),
    },
    "ccss2-algebra-48f2e0c828be-programacion": {
      "Resultado": answer(
        "10 frigoríficos, 6 lavavajillas y 382 €",
        ["15 frigoríficos, 0 lavavajillas y 375 €", "5 frigoríficos, 3 lavavajillas y 191 €", "5 frigoríficos, 0 lavavajillas y 125 €"],
        `Sean x los frigoríficos e y los lavavajillas. Maximizamos:
B=25x+22y,
sujeto a 0,6x+0,5y≤9, y≤0,6x, x≥5, y≥0.
Los vértices de la región factible son (5,0), (5,3), (10,6) y (15,0).
Evaluamos la función objetivo:
B(5,0)=125; B(5,3)=191; B(10,6)=382; B(15,0)=375.
El máximo es 382 €, transportando 10 frigoríficos y 6 lavavajillas.`
      ),
    },
    "ccss2-algebra-b52ead5592cb": {
      "a1)": answer(
        "X=(A−2I)⁻¹B",
        ["X=B(A−2I)⁻¹", "X=(2I−A)⁻¹B", "X=A⁻¹(B+2I)"],
        `Partimos de AX−2X=B y escribimos 2X=2IX:
(A−2I)X=B.
Multiplicamos por la izquierda por (A−2I)⁻¹:
(A−2I)⁻¹(A−2I)X=(A−2I)⁻¹B.
Por tanto, X=(A−2I)⁻¹B.`
      ),
      "a2)": answer(
        "X=((−1,0),(0,−1),(1,1))",
        ["X=((1,0),(0,1),(−1,−1))", "X=((−1,1),(0,−1),(1,0))", "X=((0,−1),(−1,0),(1,1))"],
        `Calculamos:
A−2I=((−4,1,1),(1,−2,1),(−1,−1,−2)).
Como det(A−2I)=−18≠0, existe la inversa. Usamos:
(A−2I)⁻¹=Adj((A−2I)ᵀ)/det(A−2I).
Al multiplicar por B resulta:
X=((−1,0),(0,−1),(1,1)).
La sustitución verifica (A−2I)X=B.`
      ),
      "B)": answer(
        "62 en Merengue, 53 en Tango y 32 en Samba",
        ["53 en Merengue, 62 en Tango y 32 en Samba", "62 en Merengue, 32 en Tango y 53 en Samba", "57 en Merengue, 53 en Tango y 37 en Samba"],
        `Sean M, T y S los inscritos en Merengue, Tango y Samba:
M+T+S=147,
M−15=S+15,
M+2S=2T+20.
La segunda ecuación equivale a M−S=30. Resolviendo el sistema obtenemos:
M=62, T=53, S=32.
Comprobación: si 15 alumnos pasan de Merengue a Samba quedan 47 y 47.`
      ),
    },
    "ccss2-algebra-b52ead5592cb-programacion": {
      "Resultado": answer(
        "8 lotes A, 6 lotes B y 324 €",
        ["12 lotes A, 0 lotes B y 288 €", "4 lotes A, 9 lotes B y 294 €", "0 lotes A, 9 lotes B y 198 €"],
        `Sean x e y los lotes A y B. Maximizamos B=24x+22y con:
3x+2y≤36,
3x+4y≤48,
y≤9,
x≥0, y≥0.
Los vértices factibles son (0,0), (0,9), (4,9), (8,6) y (12,0).
Los beneficios respectivos son 0, 198, 294, 324 y 288 euros.
El máximo se obtiene en (8,6): deben venderse 8 lotes A y 6 lotes B, con un beneficio de 324 €.`
      ),
    },
    "ccss2-algebra-993a37b68f24": {
      "a1)": answer(
        "X=(A+3I)⁻¹B",
        ["X=B(A+3I)⁻¹", "X=(A−3I)⁻¹B", "X=A⁻¹(B−3I)"],
        `Partimos de AX−B=−3X. Pasamos los términos con X al mismo miembro:
AX+3X=B.
Sacamos factor común por la izquierda:
(A+3I)X=B.
Multiplicando por (A+3I)⁻¹ a la izquierda obtenemos:
X=(A+3I)⁻¹B.`
      ),
      "a2)": answer(
        "X=((1,0),(0,1),(−1,0))",
        ["X=((1,0),(0,−1),(1,0))", "X=((0,1),(1,0),(0,−1))", "X=((1,1),(0,1),(−1,−1))"],
        `Calculamos:
A+3I=((3,1,1),(1,3,−1),(1,1,4)).
Su determinante es 24≠0. Aplicamos:
(A+3I)⁻¹=Adj((A+3I)ᵀ)/det(A+3I).
El producto X=(A+3I)⁻¹B da:
X=((1,0),(0,1),(−1,0)).
Comprobación: (A+3I)X=B.`
      ),
      "B)": answer(
        "5 € el de 1 GB, 8 € el de 2 GB y 15 € el de 4 GB",
        ["8 €, 5 € y 15 €", "5 €, 10 € y 13 €", "6 €, 8 € y 13 €"],
        `Sean x, y, z los precios de los Pen Drive de 1, 2 y 4 GB:
2x+y+z=33,
x+2y−z=6.
Con la rebaja, dos unidades de 1 GB cuestan lo mismo que una de 2 GB:
2·0,8x=y.
El sistema completo es:
2x+y+z=33,
x+2y−z=6,
1,6x=y.
Resolviendo: x=5, y=8, z=15 euros.`
      ),
    },
    "ccss2-algebra-993a37b68f24-programacion": {
      "Resultado": answer(
        "8 lotes A, 3 lotes B y 30,20 €",
        ["6 lotes A, 4 lotes B y 27,20 €", "9 lotes A, 0 lotes B y 25,20 €", "2 lotes A, 4 lotes B y 16 €"],
        `Sean x e y los lotes A y B. Maximizamos:
B=2,8x+2,6y,
con 3x+y≤27, x+2y≤14, y≤4, y≤2x, x≥0, y≥0.
Los vértices son (0,0), (2,4), (6,4), (8,3) y (9,0).
Los beneficios son 0; 16; 27,20; 30,20 y 25,20 euros.
El máximo se alcanza en (8,3): 8 lotes A, 3 lotes B y 30,20 €.`
      ),
    },
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-analisis-c8e5c3f336a7": {
      "Resultado": answer(
        "k=1; el área limitada por la gráfica y el eje OX es 17/6",
        ["k=0; área 5/2", "k=1; área 7/3", "k=2; área 17/6"],
        `Para que la función sea continua en x=−1:
lim(x→−1⁻)f(x)=1, lim(x→−1⁺)f(x)=k y f(−1)=1; por tanto, k=1.
En x=1 se obtiene también lim(x→1⁻)f(x)=1=lim(x→1⁺)f(x)=f(1).
Los cortes con OX son x=−2 y x=2. El área es:
A=∫_{−2}^{−1}(x+2)dx+∫_{−1}^{1}1dx+∫_{1}^{2}(x−2)²dx
=1/2+2+1/3=17/6.
La gráfica debe mostrar los tres tramos y el recinto sombreado entre x=−2 y x=2.`
      ),
    },
    "ccss2-analisis-c8e5c3f336a7-opcion-b": {
      "Resultado": answer(
        "Máximo del 75 % cuando t=1/2",
        ["Máximo del 100 % cuando t=1", "Mínimo del 75 % cuando t=1/2", "Máximo del 50 % cuando t=1/2"],
        `R(t)=300t(1−t)=300t−300t², con 0≤t≤1.
R'(t)=300−600t. Igualamos a cero:
300−600t=0 ⇒ t=1/2.
La derivada es positiva antes de 1/2 y negativa después, por lo que hay un máximo.
R(1/2)=300·(1/2)·(1/2)=75.
El rendimiento máximo es del 75 % a la media hora.`
      ),
    },
    "ccss2-analisis-ecd5e8146f8d": {
      "Resultado": answer(
        "Es continua en x=0; corta al eje OX en x=−3 y x=3; área 27/2",
        ["No es continua en x=0; área 9", "Es continua; cortes −1 y 3; área 27/2", "Es continua; cortes −3 y 3; área 9"],
        `En x=0:
lim(x→0⁻)(−x²−2x+3)=3,
lim(x→0⁺)|x−3|=3 y f(0)=3.
Por tanto, es continua. Los cortes con OX son x=−3 en la primera rama y x=3 en la segunda.
Entre −3 y 0 la función es −x²−2x+3; entre 0 y 3 es 3−x. Así:
A=∫_{−3}^{0}(−x²−2x+3)dx+∫_{0}^{3}(3−x)dx
=9+9/2=27/2.`
      ),
    },
    "ccss2-analisis-ecd5e8146f8d-opcion-b": {
      "Resultado": answer(
        "El coste es 175 para x=30 y x=70; el coste mínimo es 75 para x=50",
        ["x=20 y x=80; mínimo 75", "x=30 y x=70; máximo 75", "x=50 únicamente; mínimo 175"],
        `La función de costes es C(x)=0,25x²−25x+700.
Para C(x)=175:
0,25x²−25x+525=0.
Multiplicamos por 4: x²−100x+2100=0, cuyas soluciones son x=30 y x=70.
Para hallar el mínimo:
C'(x)=0,5x−25=0 ⇒ x=50.
Como C''(x)=0,5>0, es un mínimo y C(50)=75.`
      ),
    },
    "ccss2-analisis-45e50bb73784": {
      "Resultado": answer(
        "Es continua en x=0; corta al eje OX en x=−1 y x=1; área 5/6",
        ["No es continua en x=0; área 1", "Es continua; cortes 0 y 1; área 5/6", "Es continua; cortes −1 y 1; área 3/2"],
        `En x=0 ambas ramas valen 1, luego la función es continua.
Los cortes con OX son x=−1 para |x+1| y x=1 para (x−1)².
En el recinto considerado:
A=∫_{−1}^{0}(x+1)dx+∫_{0}^{1}(x−1)²dx
=1/2+1/3=5/6.
La gráfica debe mostrar el tramo lineal, la parábola y el área situada entre ambas ramas y el eje OX.`
      ),
    },
    "ccss2-analisis-45e50bb73784-opcion-b": {
      "Resultado": answer(
        "La rentabilidad máxima es 625 para una inversión de 2500 €",
        ["La rentabilidad máxima es 600 para 3000 €", "La rentabilidad máxima es 400 para 4000 €", "La rentabilidad mínima es 625 para 2500 €"],
        `Para 0<x<4000:
R(x)=−0,0001x²+0,5x.
R'(x)=−0,0002x+0,5. Igualamos a cero:
x=2500.
La derivada cambia de positiva a negativa, por lo que es un máximo:
R(2500)=625.
En el tramo x≥4000 la rentabilidad es 400, menor que 625. Por tanto, el máximo global es 625 para 2500 €.`
      ),
    },
    "ccss2-analisis-d11db64fd7f3": {
      "Resultado": answer(
        "Discontinuidad evitable en x=2, continuidad en x=3 y área 35/6",
        ["Continuidad en x=2 y x=3; área 35/6", "Discontinuidad de salto en x=2; área 16/3", "Discontinuidad evitable en x=3; área 19/6"],
        `En x=2 la función no está definida, pero:
lim(x→2⁻)(−x²+4)=0=lim(x→2⁺)(x−2).
Hay una discontinuidad evitable.
En x=3:
lim(x→3⁻)(x−2)=1=lim(x→3⁺)(x−4)²=f(3),
luego es continua.
El área limitada por la gráfica, los ejes y x=3 es:
A=∫_{0}^{2}(4−x²)dx+∫_{2}^{3}(x−2)dx
=16/3+1/2=35/6.`
      ),
    },
    "ccss2-analisis-d11db64fd7f3-opcion-b": {
      "Resultado": answer(
        "Para 10 coches el beneficio es 11 000 €; el máximo es 16 000 € al fabricar 20 coches",
        ["11 000 € y máximo 12 000 € con 10 coches", "10 000 € y máximo 16 000 € con 20 coches", "11 000 € y máximo 20 000 € con 16 coches"],
        `El beneficio, en miles de euros, es B(x)=1,2x−0,001x³.
B(10)=12−1=11, es decir, 11 000 €.
Derivamos:
B'(x)=1,2−0,003x².
B'(x)=0 ⇒ x²=400 ⇒ x=20, pues x representa coches.
La derivada cambia de positiva a negativa, luego hay un máximo:
B(20)=24−8=16.
El beneficio máximo es 16 000 € fabricando 20 coches.`
      ),
    },
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-probabilidad-baf36687068b": {
      "Resultado": answer(
        "P(cara)=11/18; P(una cara y una cruz con la moneda trucada)=4/9",
        ["P(cara)=1/2; segunda probabilidad 2/9", "P(cara)=7/18; segunda probabilidad 4/9", "P(cara)=11/18; segunda probabilidad 2/3"],
        `Las tres monedas se eligen con probabilidad 1/3. Por la probabilidad total:
P(cara)=1/3·1/2+1/3·1+1/3·1/3=11/18.
Con la moneda trucada, P(cara)=1/3 y P(cruz)=2/3. Una cara y una cruz puede aparecer en dos órdenes:
P=2·1/3·2/3=4/9.`
      ),
    },
    "ccss2-probabilidad-baf36687068b-bloque-4": {
      "Resultado": answer(
        "P(H∪O)=0,60; P(O|H)=0,75",
        ["0,55 y 0,20", "0,60 y 0,15", "0,75 y 0,60"],
        `Sean O=«tener obesidad» y H=«ser hipertenso».
P(H∪O)=P(H)+P(O)−P(H∩O)=0,20+0,55−0,15=0,60.
La probabilidad condicionada es:
P(O|H)=P(O∩H)/P(H)=0,15/0,20=0,75.`
      ),
    },
    "ccss2-probabilidad-1273eb597601": {
      "Resultado": answer(
        "P(blanca)=14/37; P(urna A y no roja)=17/111",
        ["15/37 y 17/37", "14/37 y 20/111", "17/37 y 14/111"],
        `La moneda lleva a A con probabilidad 1/3 y a B con probabilidad 2/3. Ambas urnas tienen 37 bolas.
Por la probabilidad total:
P(blanca)=1/3·12/37+2/3·15/37=42/111=14/37.
En A hay 17 bolas que no son rojas. Por tanto:
P(A∩no roja)=1/3·17/37=17/111.`
      ),
    },
    "ccss2-probabilidad-1273eb597601-bloque-4": {
      "Resultado": answer(
        "P(legal)=0,4575; P(Iberoamérica|ilegal)=81/217≈0,3733",
        ["0,5425 y 0,45", "0,4575 y 0,2025", "0,50 y 0,3733"],
        `La proporción iberoamericana es 1−0,30−0,25=0,45.
P(legal)=0,30·0,45+0,25·0,30+0,45·0,55=0,4575.
La probabilidad de ilegalidad es 1−0,4575=0,5425. La probabilidad de ser iberoamericano e ilegal es:
0,45·0,45=0,2025.
Así:
P(Iberoamérica|ilegal)=0,2025/0,5425=81/217≈0,3733.`
      ),
    },
    "ccss2-probabilidad-8d50c988cbf0": {
      "Resultado": answer(
        "P(dos azules y urna B)=1/9; P(dos azules)=7/45",
        ["1/3 y 7/45", "1/9 y 1/3", "2/45 y 1/9"],
        `Se llega a A con probabilidad 4/6=2/3 y a B con probabilidad 2/6=1/3.
En B:
P(dos azules|B)=6/10·5/9=1/3,
luego P(B∩dos azules)=1/3·1/3=1/9.
En A, P(dos azules|A)=3/10·2/9=1/15. Por la probabilidad total:
P(dos azules)=2/3·1/15+1/3·1/3=2/45+5/45=7/45.`
      ),
    },
    "ccss2-probabilidad-8d50c988cbf0-bloque-4": {
      "Resultado": answer(
        "P(difícil)=0,34; P(verdadero-falso|fácil)=6/11",
        ["0,50 y 0,40", "0,34 y 0,36", "0,66 y 6/11"],
        `P(elección múltiple)=0,60 y P(verdadero-falso)=0,40.
P(difícil)=0,60·0,50+0,40·0,10=0,34.
Por tanto, P(fácil)=0,66. Además:
P(verdadero-falso∩fácil)=0,40·0,90=0,36.
Así:
P(verdadero-falso|fácil)=0,36/0,66=6/11.`
      ),
    },
    "ccss2-probabilidad-9ae579c64585": {
      "Resultado": answer(
        "P(ningún americano)=729/1600; P(tres americanos)=11/380",
        ["27/40 y 13/40", "729/1600 y 143/1600", "27/40 y 11/380"],
        `Hay 40 alumnos, de los que 27 no son americanos.
Como un mismo alumno puede recibir los dos regalos, las elecciones son independientes:
P(ningún americano)=(27/40)²=729/1600.
Para extraer tres americanos sin reemplazamiento:
P=13/40·12/39·11/38=11/380.`
      ),
    },
    "ccss2-probabilidad-9ae579c64585-bloque-4": {
      "Resultado": answer(
        "P(cuenta propia y secundarios)=0,30; P(superiores|cuenta ajena)=0,225",
        ["0,50 y 0,09", "0,30 y 0,09", "0,60 y 0,225"],
        `Hay 60 trabajadores por cuenta propia y 40 por cuenta ajena, en total 100.
Treinta trabajan por cuenta propia y tienen estudios secundarios:
P(cuenta propia∩secundarios)=30/100=0,30.
Entre los 40 trabajadores por cuenta ajena, 9 tienen estudios superiores:
P(superiores|cuenta ajena)=9/40=0,225.`
      ),
    },
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-estadistica-59653e32af1a": {
      "b)": answer(
        "IC₉₉,₂%≈[92,58;101,42] horas",
        ["[93,67;100,33]", "[87,00;107,00]", "[94,83;99,17]"],
        `Para una media con desviación típica conocida:
IC=(x̄−z_{α/2}·σ/√n, x̄+z_{α/2}·σ/√n).
El nivel es 0,992, luego α=0,008 y z_{α/2}=z_{0,996}≈2,65.
El margen es:
E=2,65·10/√36=2,65·10/6≈4,42.
Así, IC≈[97−4,42;97+4,42]=[92,58;101,42] horas.
Con un 99,2 % de confianza, la media poblacional está contenida en ese intervalo.`
      ),
    },
    "ccss2-estadistica-d62726051e26": {
      "b)": answer(
        "IC₉₇%≈[62,05;65,95] pulsaciones",
        ["[61,83;66,17]", "[63,10;64,90]", "[55,00;73,00]"],
        `Para un nivel de confianza del 97 %, α=0,03 y z_{0,985}≈2,17.
El margen de error es:
E=2,17·9/√100=2,17·9/10=1,953.
Por tanto:
IC≈[64−1,953;64+1,953]=[62,05;65,95].
Interpretación: con un 97 % de confianza, la media de pulsaciones de la población se encuentra en este intervalo.`
      ),
    },
    "ccss2-estadistica-e93daf4be88a": {
      "b)": answer(
        "IC₉₇%≈[2227,93;2412,07] horas",
        ["[2235,15;2404,85]", "[2020;2620]", "[2290;2350]"],
        `Usamos la desviación típica de las lámparas, σ=300, la media muestral x̄=2320 y n=50.
Para un 97 % de confianza, z_{0,985}≈2,17.
E=2,17·300/√50≈92,07.
Así:
IC≈[2320−92,07;2320+92,07]=[2227,93;2412,07] horas.
Aunque el enunciado conserva literalmente una referencia errónea a pulsaciones y deportistas, el intervalo corresponde a la duración media de las lámparas.`
      ),
    },
    "ccss2-estadistica-5c6bf49f99c3": {
      "b)": answer(
        "IC₉₇%≈[18,03;22,37] años",
        ["[19,20;21,20]", "[10,20;30,20]", "[18,25;22,15]"],
        `Tenemos x̄=20,2, σ=10 y n=100. Para un 97 % de confianza:
α=0,03 y z_{0,985}≈2,17.
El margen es:
E=2,17·10/√100=2,17.
Por tanto:
IC=[20,2−2,17;20,2+2,17]=[18,03;22,37] años.
Con un 97 % de confianza, la edad media de todos los aspirantes está dentro de ese intervalo.`
      ),
    },
  });

})();

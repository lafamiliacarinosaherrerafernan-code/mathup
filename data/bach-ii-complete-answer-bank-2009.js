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

  // Las páginas oficiales de 2009 agrupaban varias alternativas de examen.
  // Cada alternativa se convierte en un ejercicio independiente para que el
  // historial de variedad pueda agotarlas una a una sin repetir páginas.
  for (const id of [
    "mates2-algebra-f2fde0a28337",
    "mates2-algebra-a2773d25e6b7",
  ]) {
    const list = matesBlock("algebra");
    const exercise = list.find((item) => item.id === id);
    if (!exercise || exercise.id.endsWith("-opcion-b")) continue;
    const firstMerged = exercise.parts?.[0]?.paragraphs || [];
    const secondStatement = copy(firstMerged.slice(1));
    const secondB = copy(exercise.parts?.[1]?.paragraphs || []);
    exercise.statement = copy(exercise.statement.slice(0, 1));
    exercise.parts = [
      makePart("a)", copy(exercise.statement)),
      makePart("b)", copy(firstMerged.slice(0, 1))),
    ];
    insertAfter(list, exercise.id, {
      ...copy(exercise),
      id: `${exercise.id}-opcion-b`,
      statement: secondStatement,
      parts: [
        makePart("a)", secondStatement),
        makePart("b)", secondB),
      ],
    });
  }

  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-98dbfce7b679");
    if (exercise) {
      const firstMerged = exercise.parts?.[0]?.paragraphs || [];
      const secondStatement = copy(firstMerged.slice(1));
      const secondB = copy(exercise.parts?.[1]?.paragraphs || []);
      exercise.parts = [
        makePart("a)", copy(exercise.statement)),
        makePart("b)", copy(firstMerged.slice(0, 1))),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: secondStatement,
        parts: [
          makePart("a)", secondStatement),
          makePart("b)", secondB),
        ],
      });
    }
  }

  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-2515d514f083");
    if (exercise) {
      const secondStatement = copy(exercise.parts?.[1]?.paragraphs?.slice(1) || []);
      const secondParts = copy(exercise.parts?.slice(2) || []);
      exercise.parts = [
        copy(exercise.parts[0]),
        makePart("b)", copy(exercise.parts?.[1]?.paragraphs?.slice(0, 1) || [])),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: secondStatement,
        parts: secondParts,
      });
    }
  }

  for (const [id, suffixes] of [
    ["mates2-analisis-c2d332ee45c3", ["1a", "1b", "2a", "2b"]],
    ["mates2-analisis-38c00b3160fa", ["1a", "1b", "2a", "2b"]],
  ]) {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === id);
    if (!exercise || !Array.isArray(exercise.statement) || exercise.statement.length < 4) continue;
    const statements = copy(exercise.statement.slice(0, 4));
    const finalExtra = copy(exercise.parts?.[0]?.paragraphs || []);
    exercise.statement = [statements[0]];
    exercise.parts = [makePart("Resultado", [])];
    let referenceId = exercise.id;
    for (let index = 1; index < statements.length; index += 1) {
      const cloneId = `${exercise.id}-${suffixes[index]}`;
      const parts =
        index === 3 && finalExtra.length
          ? [
              makePart("a)", [statements[index]]),
              makePart("b)", finalExtra.slice(0, 1)),
            ]
          : [makePart("Resultado", [])];
      insertAfter(list, referenceId, {
        ...copy(exercise),
        id: cloneId,
        statement: [statements[index]],
        parts,
      });
      referenceId = cloneId;
    }
  }

  // En CCSS II, Álgebra incluía en la misma página el bloque algebraico y el
  // problema de programación lineal. Los separamos y recuperamos a1), a2) y B).
  for (const id of [
    "ccss2-algebra-70d1d3108b63",
    "ccss2-algebra-4b92649fc36e",
    "ccss2-algebra-33f6cfdefe6d",
    "ccss2-algebra-98de5b7e048f",
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

  // En Análisis y Probabilidad de CCSS II cada página reunía dos alternativas.
  for (const id of [
    "ccss2-analisis-e05cbab633d7",
    "ccss2-analisis-4619aeaaa112",
    "ccss2-analisis-3084db422c17",
    "ccss2-analisis-940206c50b32",
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
    "ccss2-probabilidad-2154a11aaa1d",
    "ccss2-probabilidad-d1178aa457d6",
    "ccss2-probabilidad-5dd12eb505f1",
    "ccss2-probabilidad-26da01377b05",
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

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-f2fde0a28337": {
      "a)": answer(
        "X=A⁻¹B",
        ["X=BA⁻¹", "X=A⁻¹B²", "X=B"],
        `Partimos de A·X·B=B². Como las matrices A y B son invertibles, multiplicamos por la izquierda por A⁻¹ y por la derecha por B⁻¹:
A⁻¹·A·X·B·B⁻¹=A⁻¹·B²·B⁻¹.

Por tanto:
X=A⁻¹·B.`
      ),
      "b)": answer(
        "X=((0,1,2),(-1,1,1),(-1,0,-2))",
        [
          "X=((0,-1,-2),(1,-1,-1),(1,0,2))",
          "X=((1,0,2),(0,1,3),(1,0,1))",
          "X=((0,1,2),(1,-1,-1),(-1,0,2))",
        ],
        `Calculamos primero la inversa de A. Como det(A)=1≠0, A es invertible:
A⁻¹=((-1,1,1),(-1,1,0),(-1,0,0)).

Aplicamos el resultado del apartado anterior:
X=A⁻¹B
=((-1,1,1),(-1,1,0),(-1,0,0))·((1,0,2),(0,1,3),(1,0,1))
=((0,1,2),(-1,1,1),(-1,0,-2)).

La comprobación A·X·B=B² verifica la matriz obtenida.`
      ),
    },
    "mates2-algebra-f2fde0a28337-opcion-b": {
      "a)": answer(
        "Si a>−6, x=3±√(a+6); si a=−6, x=3; si a<−6, no hay soluciones reales",
        [
          "Para todo a, x=3±√(a+6)",
          "Si a≥−6, x=−3±√(a+6)",
          "Si a>−6, x=6±√(a−3)",
        ],
        `Aplicamos la regla de Sarrus a los dos determinantes:
D₁=−6x+3,
D₂=a−x².

La ecuación D₁−D₂=0 queda:
−6x+3−(a−x²)=0,
x²−6x+3−a=0.

Su discriminante es:
Δ=(−6)²−4(3−a)=24+4a=4(a+6).

Por tanto:
• si a>−6, hay dos soluciones: x=3±√(a+6);
• si a=−6, hay una solución doble: x=3;
• si a<−6, no hay soluciones reales.`
      ),
      "b)": answer(
        "a=−6",
        ["a=6", "a=−3", "a=0"],
        `La ecuación de segundo grado tiene una única solución real cuando su discriminante es cero:
4(a+6)=0.

Así:
a=−6.

En ese caso la ecuación es (x−3)²=0 y la única solución es x=3.`
      ),
    },
    "mates2-algebra-a2773d25e6b7": {
      "a)": answer(
        "X=(A−2I)⁻¹B²",
        ["X=A⁻¹(B²+2I)", "X=(2I−A)⁻¹B", "X=B²(A−2I)⁻¹"],
        `Partimos de A·X=2X+B². Pasamos los términos que contienen X al mismo miembro:
A·X−2X=B².

Sacamos X como factor común por la derecha:
(A−2I)X=B².

Multiplicamos por la izquierda por (A−2I)⁻¹:
X=(A−2I)⁻¹B².`
      ),
      "b)": answer(
        "X=((-6,-18,-8),(0,-16,0),(-2,-6,-8))",
        [
          "X=((6,18,8),(0,16,0),(2,6,8))",
          "X=((-6,-8,-18),(0,0,-16),(-2,-8,-6))",
          "X=((-2,-6,-8),(0,-16,0),(-6,-18,-8))",
        ],
        `Calculamos:
A−2I=((-1,0,1),(0,-1,0),(1,0,-3)),
det(A−2I)=−2≠0.

También:
B²=((4,12,0),(0,16,0),(0,0,16)).

Por tanto:
X=(A−2I)⁻¹B²
=((-6,-18,-8),(0,-16,0),(-2,-6,-8)).

Al sustituir en A·X=2X+B² coinciden los dos miembros.`
      ),
    },
    "mates2-algebra-a2773d25e6b7-opcion-b": {
      "a)": answer(
        "SCD si λ≠1,8/3; SCI si λ=1; SI si λ=8/3",
        [
          "SCD para todo λ",
          "SCI si λ=8/3; SI si λ=1; SCD en los demás casos",
          "SI si λ=1 o λ=8/3; SCD en los demás casos",
        ],
        `La matriz de coeficientes es
A=((λ,1,−1),(5,3,3),(3,2,λ)).

Aplicando Sarrus:
det(A)=3λ²−11λ+8=(λ−1)(3λ−8).

Si λ≠1 y λ≠8/3, det(A)≠0 y, por Rouché-Frobenius,
rg(A)=rg(A*)=3: sistema compatible determinado.

Para λ=1:
rg(A)=rg(A*)=2<3,
por lo que el sistema es compatible indeterminado.

Para λ=8/3:
rg(A)=2 y rg(A*)=3,
por lo que el sistema es incompatible.`
      ),
      "b)": answer(
        "(x,y,z)=(−3/4,13/8,−3/8)",
        [
          "(x,y,z)=(3/4,−13/8,3/8)",
          "(x,y,z)=(−3/4,−13/8,−3/8)",
          "(x,y,z)=(−3/8,13/8,−3/4)",
        ],
        `Para λ=0 el sistema es
{ y−z=2,
  5x+3y+3z=0,
  3x+2y=1 }.

Como det(A)=8≠0, es compatible determinado. Al resolverlo mediante Gauss se obtiene:
y=z+2,
3x+2z+4=1,
5x+6z+6=0.

De las dos últimas ecuaciones resulta z=−3/8. Entonces:
y=13/8,
x=−3/4.

Solución: (x,y,z)=(−3/4,13/8,−3/8).`
      ),
    },
    "mates2-algebra-18a8a3fbb232": {
      "Resultado": answer(
        "rg(A)=3 si a≠3; rg(A)=2 si a=3",
        [
          "rg(A)=3 para todo a",
          "rg(A)=2 si a=0; rg(A)=3 si a≠0",
          "rg(A)=1 si a=3; rg(A)=3 si a≠3",
        ],
        `La matriz tiene tres filas, luego su rango máximo es 3. Calculamos menores de orden 3. Por ejemplo:
D₁=a(a−3),
D₂=3−a.

Para a≠3, al menos uno de estos menores es distinto de cero, así que rg(A)=3.

Para a=3 se anulan todos los menores de orden 3. Sin embargo, el menor de orden 2 formado por las dos primeras filas y las dos primeras columnas vale
|1 2; 2 −1|=−5≠0.

Por tanto, rg(A)=2 cuando a=3.`
      ),
    },
    "mates2-algebra-3fed204b2656": {
      "b)": answer(
        "SCD únicamente si k=11; entonces (x,y,z)=(3,0,−2). Para k≠11 es SI",
        [
          "SCD para todo k y (x,y,z)=(3,0,−2)",
          "SCI si k=11; SI si k≠11",
          "SCD únicamente si k=−11; entonces (x,y,z)=(3,0,−2)",
        ],
        `La matriz de coeficientes tiene rango 3. Las ecuaciones primera, segunda y cuarta forman un sistema independiente:
{ x+2y+z=1,
  2x−y+z=4,
  y+z=−2 }.

Al resolverlo se obtiene:
(x,y,z)=(3,0,−2).

La tercera ecuación exige:
3x+y−z=k,
3·3+0−(−2)=k,
k=11.

Por Rouché-Frobenius:
• si k=11, rg(A)=rg(A*)=3 y el sistema es compatible determinado;
• si k≠11, rg(A)=3<rg(A*)=4 y el sistema es incompatible.

Para k=11, la solución es (3,0,−2).`
      ),
    },
    "mates2-algebra-d977e7654b9a": {
      "Resultado": answer(
        "rg(A)=3 si m≠1,−2; rg(A)=2 si m=1 o m=−2",
        [
          "rg(A)=3 para todo m",
          "rg(A)=2 si m=1; rg(A)=1 si m=−2",
          "rg(A)=3 si m≠2,−1; rg(A)=2 si m=2 o m=−1",
        ],
        `Calculamos los menores de orden 3. Los no nulos se reducen al factor:
−6(m+2)(m−1).

Si m≠1 y m≠−2, existe un menor de orden 3 distinto de cero y rg(A)=3.

Para m=1 y para m=−2 se anulan todos los menores de orden 3. En ambos casos queda algún menor de orden 2 distinto de cero, por ejemplo uno formado por las dos primeras filas y columnas adecuadas.

Por tanto:
rg(A)=2 para m=1 o m=−2.`
      ),
    },
    "mates2-algebra-97a439591cd3": {
      "a)": answer(
        "El sistema homogéneo A·X=O es compatible indeterminado",
        [
          "Es incompatible",
          "Es compatible determinado",
          "No puede clasificarse",
        ],
        `Teorema de Rouché-Frobenius: un sistema es compatible si y solo si rg(A)=rg(A*). Es determinado cuando ese rango coincide con el número de incógnitas e indeterminado cuando es menor.

Si A·X=B es incompatible, entonces rg(A)<rg(A|B). Como A tiene tres columnas, necesariamente rg(A)<3.

Todo sistema homogéneo A·X=O es compatible porque admite X=O. Además, como rg(A)<3, tiene variables libres.

Por tanto, A·X=O es compatible indeterminado.`
      ),
      "b)": answer(
        "El sistema A·X=B es compatible determinado",
        [
          "Es incompatible",
          "Es compatible indeterminado",
          "Solo es compatible si B=O",
        ],
        `Si A tiene inversa, det(A)≠0 y rg(A)=3.

La matriz ampliada no puede tener rango mayor que 3 porque tiene tres filas. Por ello:
rg(A)=rg(A|B)=3,
que coincide con el número de incógnitas.

Por Rouché-Frobenius, el sistema es compatible determinado. Su única solución es:
        X=A⁻¹B.`
      ),
    },
    "mates2-analisis-c2d332ee45c3": {
      "Resultado": answer(
        "P=(2,2)",
        ["P=(0,4)", "P=(4,0)", "P=(1,3)"],
        `De la recta x+y=4 despejamos y=4−x. La suma de cuadrados es:
S(x)=x²+(4−x)²=2x²−8x+16.

Derivamos:
S′(x)=4x−8.

El único punto crítico cumple 4x−8=0, luego x=2. Como S″(x)=4>0, es un mínimo.

Entonces y=4−2=2. El punto pedido es P=(2,2).`
      ),
    },
    "mates2-analisis-c2d332ee45c3-1b": {
      "Resultado": answer(
        "Las gráficas se cortan al menos una vez en (0,1)",
        [
          "No se cortan en (0,1)",
          "Solo se cortan en x=0",
          "El teorema de Bolzano no puede aplicarse",
        ],
        `Teorema de Bolzano: si una función h es continua en [a,b] y h(a)·h(b)<0, existe c∈(a,b) tal que h(c)=0.

Consideramos:
h(x)=e^(x²)−2cos(x²).

Es continua en [0,1]. Además:
h(0)=1−2=−1<0,
h(1)=e−2cos(1)>0.

Como cambia de signo, Bolzano garantiza un c∈(0,1) con h(c)=0. Por tanto, e^(c²)=2cos(c²) y las dos gráficas se cortan al menos en ese punto.`
      ),
    },
    "mates2-analisis-c2d332ee45c3-2a": {
      "Resultado": answer(
        "(1/18)ln(4+9x²)+6·arctan(3x/2)+C",
        [
          "(1/9)ln(4+9x²)+3·arctan(3x/2)+C",
          "(1/18)ln(4+9x²)+4·arctan(3x/2)+C",
          "ln(4+9x²)+6·arctan(3x/2)+C",
        ],
        `Separamos:
∫(x+36)/(4+9x²) dx
=∫x/(4+9x²) dx+36∫1/(4+9x²) dx.

En la primera integral hacemos u=4+9x², du=18x dx:
∫x/(4+9x²) dx=(1/18)ln(4+9x²).

En la segunda usamos ∫dx/(a²+b²x²)=(1/ab)arctan(bx/a):
36∫dx/(4+9x²)=6·arctan(3x/2).

Resultado:
(1/18)ln(4+9x²)+6·arctan(3x/2)+C.`
      ),
    },
    "mates2-analisis-c2d332ee45c3-2b": {
      "Resultado": answer(
        "3+2(e²−e)",
        ["3+e²−e", "6+2(e²−e)", "2(e²−e)"],
        `La integral es:
I=∫₁⁴ (√x+e^√x)/√x dx
=∫₁⁴1 dx+∫₁⁴ e^√x/√x dx.

La primera integral vale 4−1=3.

En la segunda hacemos u=√x. Entonces x=u² y dx=2u du:
∫₁⁴ e^√x/√x dx
=2∫₁²e^u du
=2[e^u]₁²
=2(e²−e).

Por tanto, I=3+2(e²−e).`
      ),
    },
    "mates2-analisis-38c00b3160fa": {
      "Resultado": answer(
        "r=h=(27/π)^(1/3) m",
        [
          "r=(27/π)^(1/3) m y h=2(27/π)^(1/3) m",
          "r=3 m y h=3/π m",
          "r=h=3 m",
        ],
        `El depósito no tiene tapa. Su superficie es:
S=πr²+2πrh.

El volumen cumple πr²h=27, de donde:
h=27/(πr²).

Sustituimos:
S(r)=πr²+54/r.

Derivamos:
S′(r)=2πr−54/r².

S′(r)=0 implica 2πr³=54, luego r³=27/π:
r=(27/π)^(1/3).

Además S″(r)=2π+108/r³>0, por lo que es mínimo. Finalmente:
h=27/(πr²)=r.

Así, r=h=(27/π)^(1/3) m.`
      ),
    },
    "mates2-analisis-38c00b3160fa-1b": {
      "Resultado": answer(
        "a=1/9; asíntotas verticales x=−6 y x=6; no tiene oblicuas",
        [
          "a=9; asíntota vertical x=0",
          "a=1/9; no tiene asíntotas verticales",
          "a=−1/9; asíntotas verticales x=±6",
        ],
        `Para f(x)=x²/(ax²−4), la asíntota horizontal es el cociente de los coeficientes principales:
y=1/a.

Como la asíntota es y=9:
1/a=9, luego a=1/9.

Entonces:
f(x)=x²/(x²/9−4)=9x²/(x²−36).

El denominador se anula en x=−6 y x=6, sin anularse el numerador. Por tanto, ambas son asíntotas verticales.

Como los grados del numerador y del denominador son iguales, existe asíntota horizontal y no puede haber asíntota oblicua.`
      ),
    },
    "mates2-analisis-38c00b3160fa-2a": {
      "Resultado": answer(
        "a) −ln|cos x|+C; b) tg x+C; c) x·arctg x−(1/2)ln(1+x²)+C",
        [
          "a) ln|cos x|+C; b) arctg x+C; c) x·arctg x+C",
          "a) −ln|sen x|+C; b) tg²x+C; c) arctg x−ln(1+x²)+C",
          "a) tg x+C; b) −ln|cos x|+C; c) (1/2)ln(1+x²)+C",
        ],
        `a) Como tg x=sen x/cos x, tomamos u=cos x, du=−sen x dx:
∫tg x dx=−ln|cos x|+C.

b) Recordamos que (tg x)′=1+tg²x:
∫(1+tg²x)dx=tg x+C.

c) Integramos por partes con u=arctg x y dv=dx:
du=dx/(1+x²), v=x.

∫arctg x dx=x·arctg x−∫x/(1+x²)dx
=x·arctg x−(1/2)ln(1+x²)+C.`
      ),
    },
    "mates2-analisis-38c00b3160fa-2b": {
      "a)": answer(
        "Es continua y derivable en x=−1",
        [
          "Es continua pero no derivable en x=−1",
          "No es continua en x=−1",
          "Es derivable pero no continua en x=−1",
        ],
        `Cada rama es polinómica; solo estudiamos x=−1.

Límite por la izquierda:
lim(x→−1⁻)(x²+4x+3)=1−4+3=0.

Límite por la derecha y valor:
lim(x→−1⁺)(1−x²)=0,
f(−1)=0.

Los tres valores coinciden, por lo que es continua.

Derivadas laterales:
f′(x)=2x+4 si x<−1, y f′(x)=−2x si x>−1.

f′(−1⁻)=2 y f′(−1⁺)=2. Coinciden, así que también es derivable en x=−1.`
      ),
      "b)": answer(
        "8/3 unidades cuadradas",
        ["4/3 unidades cuadradas", "2 unidades cuadradas", "16/3 unidades cuadradas"],
        `Los ceros de la primera rama son x=−3 y x=−1; los de la segunda son x=−1 y x=1. La función queda por encima del eje OX entre −3 y 1.

El área es:
A=∫₋₃⁻¹(x²+4x+3)dx+∫₋₁¹(1−x²)dx.

Aplicando la regla de Barrow:
∫₋₃⁻¹(x²+4x+3)dx=4/3,
∫₋₁¹(1−x²)dx=4/3.

Por tanto:
A=8/3 unidades cuadradas.`
      ),
    },
    "mates2-analisis-cc335e861a6d": {
      "Resultado": answer(
        "θ=arccos(1/3)",
        ["θ=π/3", "θ=arccos(2/3)", "θ=π/6"],
        `La parte variable del área es:
g(θ)=(3−cosθ)/senθ.

Derivamos:
g′(θ)=[sen²θ−(3−cosθ)cosθ]/sen²θ
=(1−3cosθ)/sen²θ.

Como θ∈(0,π/2), sen²θ>0. Igualamos el numerador a cero:
1−3cosθ=0,
cosθ=1/3.

El signo de g′ cambia de negativo a positivo, por lo que se alcanza un mínimo.

Así, θ=arccos(1/3).`
      ),
    },
    "mates2-analisis-6086c2a947a6": {
      "Resultado": answer(
        "a=−3; asíntota oblicua y=x−3; no tiene horizontal",
        [
          "a=3; asíntota oblicua y=x+3",
          "a=−3; asíntota horizontal y=1",
          "a=3; no tiene asíntotas",
        ],
        `La función es f(x)=x²/(x−a). Para que x=−3 sea asíntota vertical debe anular el denominador:
−3−a=0,
a=−3.

Entonces:
f(x)=x²/(x+3).

Dividimos:
x²=(x+3)(x−3)+9,
f(x)=x−3+9/(x+3).

Como 9/(x+3)→0 cuando x→±∞, la asíntota oblicua es y=x−3. No tiene asíntota horizontal.`
      ),
    },
    "mates2-analisis-034285af7350": {
      "Resultado": answer(
        "−4/9",
        ["4/9", "−2/9", "0"],
        `La fórmula de integración por partes es:
∫u dv=u·v−∫v du.

La función x²ln(x²) es par:
I=2∫₀¹x²ln(x²)dx.

Tomamos u=ln(x²) y dv=x²dx. Entonces du=2dx/x y v=x³/3:
∫x²ln(x²)dx=(x³/3)ln(x²)−(2/3)∫x²dx
=(x³/3)ln(x²)−2x³/9.

Al aplicar Barrow entre 0 y 1 obtenemos −2/9. Por tanto:
I=2·(−2/9)=−4/9.`
      ),
    },
    "mates2-analisis-e4a9cc8ea5e8": {
      "Resultado": answer(
        "f(x)=3eˣ+x³/3+2x²+2/3",
        [
          "f(x)=3eˣ+x³/3+2x²",
          "f(x)=3eˣ+x³/3+2x²−2/3",
          "f(x)=eˣ+x³+2x²+2/3",
        ],
        `Integramos sucesivamente.

De f‴(x)=3eˣ+2:
f″(x)=3eˣ+2x+C₁.

Como f″(0)=7:
3+C₁=7, luego C₁=4.

Integramos:
f′(x)=3eˣ+x²+4x+C₂.

Como f′(0)=3:
3+C₂=3, luego C₂=0.

Integramos de nuevo:
f(x)=3eˣ+x³/3+2x²+C₃.

Usando f(1)=3(e+1):
3e+1/3+2+C₃=3e+3,
C₃=2/3.

Por tanto, f(x)=3eˣ+x³/3+2x²+2/3.`
      ),
    },
    "mates2-analisis-f60541ece3ff": {
      "Resultado": answer(
        "P=(−1/3,20/27)",
        [
          "P=(1/3,40/27)",
          "P=(−1/3,−20/27)",
          "P=(0,1)",
        ],
        `La pendiente de la tangente es:
m(x)=f′(x)=3x²+2x+1.

Buscamos el mínimo de m. Derivamos:
m′(x)=6x+2.

m′(x)=0 implica x=−1/3. Como m″(x)=6>0, la pendiente es mínima allí.

Calculamos la ordenada:
f(−1/3)=−1/27+1/9−1/3+1=20/27.

El punto pedido es P=(−1/3,20/27).`
      ),
    },
    "mates2-analisis-bf2070836657": {
      "a)": answer(
        "Dominio: (0,1)∪(1,∞); asíntota vertical x=1 y horizontal y=0",
        [
          "Dominio: (0,∞); asíntota vertical x=0",
          "Dominio: ℝ\\{1}; asíntota horizontal y=1",
          "Dominio: (1,∞); no tiene asíntotas",
        ],
        `Para f(x)=1/ln x necesitamos x>0 y ln x≠0. Como ln 1=0:
Dom(f)=(0,1)∪(1,∞).

Cuando x→1, ln x→0 y |f(x)|→∞; por tanto x=1 es asíntota vertical.

Cuando x→∞, ln x→∞ y f(x)→0; por tanto y=0 es asíntota horizontal.

En x→0⁺ también f(x)→0, pero x=0 es un extremo del dominio, no una asíntota vertical.`
      ),
      "b)": answer(
        "Es estrictamente decreciente en (0,1) y en (1,∞)",
        [
          "Es creciente en todo su dominio",
          "Decrece solo en (1,∞)",
          "Crece en (0,1) y decrece en (1,∞)",
        ],
        `Derivamos:
f′(x)=−1/[x(ln x)²].

En todo el dominio se cumple x>0 y (ln x)²>0. Por ello:
f′(x)<0.

Así, f es estrictamente decreciente en cada intervalo de su dominio: (0,1) y (1,∞).`
      ),
    },
    "mates2-analisis-810ef7c260ca": {
      "Resultado": answer(
        "x²+x−4ln|x−2|+6ln|x−3|+C",
        [
          "x²+x+4ln|x−2|−6ln|x−3|+C",
          "2x²+x−4ln|x−2|+6ln|x−3|+C",
          "x²+x−4/(x−2)+6/(x−3)+C",
        ],
        `Dividimos el polinomio:
(2x³−9x²+9x+6)/(x²−5x+6)
=2x+1+(−4x)/(x²−5x+6).

Factorizamos x²−5x+6=(x−2)(x−3) y descomponemos:
−4x/[(x−2)(x−3)]=−4/(x−2)+6/(x−3).

Por tanto:
∫(2x+1)dx−4∫dx/(x−2)+6∫dx/(x−3)
=x²+x−4ln|x−2|+6ln|x−3|+C.

Al derivar se recupera el integrando original.`
      ),
    },
    "mates2-analisis-f4c387c08e2b": {
      "Resultado": answer(
        "F(x)=2x⁴+x²+2",
        [
          "F(x)=2x⁴+x²+1/5",
          "F(x)=2x⁴+x²+41/15",
          "F(x)=8x⁴+2x²+2",
        ],
        `Una primitiva de f(x)=8x³+2x es:
F(x)=2x⁴+x²+C.

Como 2x⁴+x²≥0 para todo x, la condición F(x)≥0 exige C≥0.

El área entre x=0 y x=1 es, al ser F no negativa:
∫₀¹F(x)dx
=∫₀¹(2x⁴+x²+C)dx
=[2x⁵/5+x³/3+Cx]₀¹
=2/5+1/3+C
=11/15+C.

El enunciado fija esta área en 41/15:
11/15+C=41/15,
C=2.

        Por tanto, F(x)=2x⁴+x²+2.`
      ),
    },
    "mates2-geometria-98dbfce7b679": {
      "a)": answer(
        "k=1: coincidentes; k=−1: paralelos distintos; k≠±1: secantes",
        [
          "k=±1: coincidentes; en los demás casos paralelos",
          "k=1: paralelos distintos; k=−1: coincidentes; en los demás casos secantes",
          "Para todo k son secantes",
        ],
        `Los vectores normales son:
n₁=(1,1,−1), n₂=(1,1,−k²).

Para que los planos sean paralelos, sus normales deben ser proporcionales. Como las dos primeras coordenadas coinciden, el factor de proporcionalidad debe ser 1:
−k²=−1,
k=±1.

Si k=1, las ecuaciones son iguales y los planos coinciden.

Si k=−1, los primeros miembros son iguales pero los términos independientes son 1 y −1; son paralelos distintos.

Si k≠±1, los normales no son proporcionales y los planos son secantes.`
      ),
      "b)": answer(
        "No existe ningún valor real de k",
        ["k=0", "k=1", "k=±√2"],
        `Dos planos son perpendiculares cuando sus vectores normales son ortogonales:
n₁·n₂=0.

Calculamos:
(1,1,−1)·(1,1,−k²)=1+1+k²=2+k².

La ecuación 2+k²=0 no tiene soluciones reales. Por tanto, no existe ningún k∈ℝ para el que los planos sean perpendiculares.`
      ),
    },
    "mates2-geometria-98dbfce7b679-opcion-b": {
      "a)": answer(
        "π: y+z=0",
        ["π: x+z=0", "π: x+y−z=0", "π: x+y+z=1"],
        `Parametrizamos la recta r tomando z=t:
r: (x,y,z)=(1−t,−t,t)
=(1,0,0)+t(−1,−1,1).

El plano debe contener el vector director u=(−1,−1,1) y el vector desde el origen hasta un punto de r, v=(1,0,0).

Un vector normal es:
n=u×v=(0,1,1).

Como el plano pasa por el origen:
π: y+z=0.`
      ),
      "b)": answer(
        "r′: (x,y,z)=(1,0,0)+λ(−2,1,−1)",
        [
          "r′: (x,y,z)=(1,0,0)+λ(−1,−1,1)",
          "r′: (x,y,z)=(0,0,0)+λ(−2,1,−1)",
          "r′: (x,y,z)=(1,0,0)+λ(0,1,1)",
        ],
        `La nueva recta debe estar contenida en π, pasar por P=(1,0,0) y ser perpendicular a r.

Sea w=(w₁,w₂,w₃) su vector director. Debe cumplir:
w·(0,1,1)=0,
w·(−1,−1,1)=0.

Una solución no nula es w=(−2,1,−1).

Por tanto:
r′: (x,y,z)=(1,0,0)+λ(−2,1,−1),
o, en forma paramétrica,
{ x=1−2λ,
  y=λ,
  z=−λ }.`
      ),
    },
    "mates2-geometria-2515d514f083": {
      "a)": answer(
        "Falsa: existen infinitos planos perpendiculares a π que pasan por P",
        [
          "Verdadera: existe exactamente uno",
          "Falsa: no existe ninguno",
          "Verdadera solo si P∈π",
        ],
        `Sea n el vector normal de π. Un plano es perpendicular a π cuando su vector normal m cumple m·n=0.

Hay infinitos vectores m no proporcionales entre sí que son ortogonales a n. Cada uno determina, junto con el punto P, un plano diferente.

Por tanto, la afirmación es falsa: existen infinitos planos perpendiculares a π que pasan por P.`
      ),
      "b)": answer(
        "Verdadera: existe un único plano perpendicular a r que pasa por P",
        [
          "Falsa: existen infinitos",
          "Falsa: no existe ninguno",
          "Verdadera solo si P∈r",
        ],
        `Un plano perpendicular a una recta tiene como vector normal un vector paralelo al director de la recta.

La dirección de r fija, por tanto, el vector normal del plano. Un vector normal y un punto P determinan un único plano.

La afirmación es verdadera.`
      ),
    },
    "mates2-geometria-2515d514f083-opcion-b": {
      "a)": answer(
        "a=1 y el plano es π: z−y−1=0",
        [
          "a=0 y π: y+z=0",
          "a=−1 y π: z−y+1=0",
          "a=2 y π: x−y−z=0",
        ],
        `La primera recta tiene punto P=(0,0,1) y director u=(1,−1,−1). La segunda tiene Q=(2,0,a) y director v=(1,1,1).

Para que dos rectas no paralelas sean coplanarias:
(Q−P)·(u×v)=0.

Calculamos:
u×v=(0,−2,2),
Q−P=(2,0,a−1).

Entonces:
(2,0,a−1)·(0,−2,2)=2(a−1)=0,
a=1.

Con normal (0,−1,1) y pasando por P:
π: z−y−1=0.`
      ),
      "b)": answer(
        "π: (0,0,1)+s(1,−1,−1)+t(1,1,1); π′: (2,0,0)+s(1,−1,−1)+t(1,1,1)",
        [
          "π y π′ deben coincidir",
          "π: z−y−1=0; π′: z+y=0",
          "No existen dos planos paralelos con esas condiciones",
        ],
        `Para a=0, tomamos como direcciones comunes de ambos planos:
u=(1,−1,−1), v=(1,1,1).

El plano que contiene r puede escribirse:
π: (x,y,z)=(0,0,1)+s(1,−1,−1)+t(1,1,1).

El plano paralelo que contiene r′ es:
π′: (x,y,z)=(2,0,0)+s(1,−1,−1)+t(1,1,1).

Ambos tienen el mismo espacio director y, por tanto, son paralelos. Sus ecuaciones generales equivalentes son z−y−1=0 y z−y=0.`
      ),
    },
    "mates2-geometria-3bb27528fb05": {
      "a)": answer(
        "a=−4, b=2; los planos son paralelos distintos",
        [
          "a=4, b=−2; los planos coinciden",
          "a=−4, b=2; los planos coinciden",
          "a=−2, b=1; los planos son secantes",
        ],
        `Los normales son n₁=(1,−2,1) y n₂=(2,a,b).

Para que sean paralelos, n₂ debe ser proporcional a n₁. La primera coordenada fija el factor 2:
(2,a,b)=2(1,−2,1).

Por tanto:
a=−4, b=2.

Con esos valores, π₂ es 2x−4y+2z=24, es decir, x−2y+z=12. Como π₁ es x−2y+z=0, son paralelos distintos, no coincidentes.`
      ),
      "b)": answer(
        "π₃: x−2y+z=6",
        ["π₃: x−2y+z=12", "π₃: x−2y+z=3", "π₃: 2x−4y+2z=6"],
        `Escribimos los planos con el mismo primer miembro:
π₁: x−2y+z=0,
π₂: x−2y+z=12.

El plano equidistante queda exactamente a mitad de camino entre ambos términos independientes:
(0+12)/2=6.

Por tanto:
π₃: x−2y+z=6.`
      ),
    },
    "mates2-geometria-df1ce056e7d4": {
      "a)": answer(
        "π: y−z+1=0",
        ["π: y+z+1=0", "π: x+y−z=0", "π: y−z−1=0"],
        `La recta r tiene vector director u=(0,1,−1). Un plano perpendicular a r tiene un vector normal paralelo a u.

Usamos el punto P=(0,−1,0):
0(x−0)+1(y+1)−1(z−0)=0.

Así:
π: y−z+1=0.`
      ),
      "b)": answer(
        "Q=(1,1/2,3/2) y d(P,r)=√22/2",
        [
          "Q=(1,−1/2,1/2) y d(P,r)=√6/2",
          "Q=(1,2,0) y d(P,r)=√10",
          "Q=(0,1/2,3/2) y d(P,r)=3/2",
        ],
        `Un punto de r es Q(t)=(1,2+t,−t). Para que Q sea el pie de la perpendicular, el vector PQ debe ser perpendicular al director u=(0,1,−1).

PQ=(1,3+t,−t).

Imponemos:
PQ·u=(3+t)+t=3+2t=0,
t=−3/2.

Entonces:
Q=(1,1/2,3/2).

La distancia es:
d(P,r)=|PQ|
=√[1²+(3/2)²+(3/2)²]
=√(11/2)=√22/2.`
      ),
    },
    "mates2-geometria-9757260cb157": {
      "a)": answer(
        "No existe ningún valor de a",
        ["a=0", "a=1", "a=−1"],
        `Calculamos:
AB=(1,1,−1),
AC=(0,1,a−1).

Para que A, B y C estén alineados, los vectores AB y AC deben ser proporcionales. Sin embargo, la primera coordenada de AB es 1 y la de AC es 0, mientras que AC nunca es el vector nulo porque su segunda coordenada es 1.

Por tanto, no existe ningún valor de a para el que los tres puntos estén alineados.`
      ),
      "b)": answer(
        "a=−2",
        ["a=2", "a=−1", "a=3"],
        `Un vector normal del plano que contiene A, B y C es:
n=AB×AC=(a,1−a,1).

El plano 4x−6y−2z=7 tiene normal m=(4,−6,−2).

Para que sean paralelos:
(a,1−a,1)=λ(4,−6,−2).

De la tercera coordenada, 1=−2λ, luego λ=−1/2. Entonces:
a=4(−1/2)=−2.

Además, 1−a=3=(−6)(−1/2), por lo que se verifican las tres coordenadas.`
      ),
    },
    "mates2-geometria-a60e6b2a5be7": {
      "a)": answer(
        "Si a=−1 se cortan; si a≠−1 se cruzan",
        [
          "Si a=−1 son paralelas; si a≠−1 se cortan",
          "Se cortan para todo a",
          "Son paralelas para todo a",
        ],
        `Parametrizamos r tomando y=t:
r: (x,y,z)=(1+2t,t,1+t),
con director u=(2,1,1).

La otra recta es:
r′: (x,y,z)=(a−s,a+s,s),
con director v=(−1,1,1).

Los directores no son proporcionales. Para que sean coplanarias debe cumplirse:
(Q−P)·(u×v)=0.

Con P=(1,0,1), Q=(a,a,0) y u×v=(0,−3,3):
(a−1,a,−1)·(0,−3,3)=−3(a+1).

Se anula solo para a=−1. En ese caso las rectas se cortan; para a≠−1 son rectas cruzadas.`
      ),
      "b)": answer(
        "P=(−1,−1,0); s: (x,y,z)=(−1,−1,0)+λ(0,−1,1)",
        [
          "P=(1,1,0); s: (1,1,0)+λ(0,−1,1)",
          "P=(−1,−1,0); s: (−1,−1,0)+λ(2,1,1)",
          "P=(0,−1,−1); s: (0,−1,−1)+λ(0,1,1)",
        ],
        `Para a=−1 igualamos las parametrizaciones:
(1+2t,t,1+t)=(−1−s,−1+s,s).

De z se obtiene s=1+t. La ecuación de x queda:
1+2t=−1−(1+t),
3t=−3,
t=−1,
s=0.

Así, el punto de corte es P=(−1,−1,0).

Una recta perpendicular a ambas debe tener por director el producto vectorial:
u×v=(0,−3,3),
que simplificamos a (0,−1,1).

Por tanto:
s: (x,y,z)=(−1,−1,0)+λ(0,−1,1).`
      ),
    },
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-70d1d3108b63": {
      "a1)": answer(
        "X=(2I+A)⁻¹",
        ["X=I−A", "X=(I+A)⁻¹", "X=2I+A"],
        `Partimos de 2X+AX=I. Sacamos X como factor común por la derecha:
(2I+A)X=I.

Como det(2I+A)≠0, multiplicamos por la izquierda por su inversa:
X=(2I+A)⁻¹I=(2I+A)⁻¹.`
      ),
      "a2)": answer(
        "X=((0,−1/2,1),(−1,−1,3),(1,3/2,−3))",
        [
          "X=((1,0,0),(0,1,0),(0,0,1))",
          "X=((0,1/2,1),(1,−1,3),(1,3/2,3))",
          "X=((3,0,1),(0,2,2),(1,1,1))",
        ],
        `La matriz que debemos invertir es
2I+A=((3,0,1),(0,2,2),(1,1,1)).

Calculamos su determinante y obtenemos det(2I+A)=−2≠0. Aplicando
(2I+A)⁻¹=Adj((2I+A)ᵀ)/det(2I+A),
resulta:
X=((0,−1/2,1),(−1,−1,3),(1,3/2,−3)).

La comprobación (2I+A)X=I confirma el resultado.`
      ),
      "B)": answer(
        "3 monedas de 50 céntimos, 4 de 20 y 5 de 10",
        [
          "4 monedas de 50, 3 de 20 y 5 de 10",
          "2 monedas de 50, 5 de 20 y 5 de 10",
          "3 monedas de 50, 5 de 20 y 4 de 10",
        ],
        `Sean x, y, z las cantidades de monedas de 50, 20 y 10 céntimos.

Planteamos:
{ x+y+z=12
  50x+20y+10z=280
  y+1=z }

Dividimos la segunda ecuación entre 10:
{ x+y+z=12
  5x+2y+z=28
  y−z=−1 }

Resolviendo el sistema obtenemos x=3, y=4, z=5. La suma es 12 y su valor es 280 céntimos.`
      ),
    },
    "ccss2-algebra-70d1d3108b63-programacion": {
      "Resultado": answer(
        "9 lotes A y 5 lotes B; ganancia máxima 101 €",
        [
          "8 lotes A y 6 lotes B; 103 €",
          "10 lotes A y 4 lotes B; 99 €",
          "7 lotes A y 6 lotes B; 96,5 €",
        ],
        `Sean x los lotes A e y los lotes B. Las restricciones son:
{ 3x+5y≤52
  5x+3y≤60
  y≤x+4
  x≥0, y≥0 }

La función objetivo es G=6,5x+8,5y. El vértice de intersección de
3x+5y=52 y 5x+3y=60 se obtiene resolviendo el sistema:
{ 3x+5y=52
  5x+3y=60 }
⇒ x=9, y=5.

Al comparar G en todos los vértices de la región factible, el máximo se alcanza en (9,5):
G(9,5)=6,5·9+8,5·5=101 €.

Por tanto, debe vender 9 lotes A y 5 lotes B.`
      ),
    },

    "ccss2-algebra-4b92649fc36e": {
      "a1)": answer(
        "X=A⁻¹(B−A²)",
        ["X=B−A", "X=(B−A²)A", "X=A(B−A²)"],
        `De A²+AX=B despejamos el término que contiene X:
AX=B−A².

Multiplicamos por la izquierda por A⁻¹:
A⁻¹AX=A⁻¹(B−A²).

Por tanto, X=A⁻¹(B−A²). El orden de los factores es imprescindible.`
      ),
      "a2)": answer(
        "X=((−1,0,0),(0,0,−1),(0,−1,−1))",
        [
          "X=((1,0,0),(0,0,1),(0,1,1))",
          "X=((−1,0,0),(0,−1,0),(0,0,−1))",
          "X=((0,−1,0),(−1,0,0),(0,0,−1))",
        ],
        `Calculamos primero:
A²=((1,2,1),(1,1,2),(2,1,1)),
B−A²=((−1,0,−1),(0,−1,−2),(−1,−1,−1)).

Como det(A)=2≠0, hallamos A⁻¹ mediante determinantes y aplicamos
X=A⁻¹(B−A²).

El producto da:
X=((−1,0,0),(0,0,−1),(0,−1,−1)).

Comprobación: A²+AX=B.`
      ),
      "B)": answer(
        "15 monedas de 1 céntimo, 7 de 2 y 4 de 5",
        [
          "14 monedas de 1, 8 de 2 y 4 de 5",
          "15 monedas de 1, 6 de 2 y 5 de 5",
          "16 monedas de 1, 7 de 2 y 3 de 5",
        ],
        `Sean x, y, z las cantidades de monedas de 1, 2 y 5 céntimos.

Las condiciones proporcionan:
{ x−y−z=4
  y=(2/5)x+1
  (x+1)+2y+5z=50 }

La segunda ecuación se escribe −2x+5y=5 y la tercera, x+2y+5z=49:
{ x−y−z=4
  −2x+5y=5
  x+2y+5z=49 }

Al resolver obtenemos x=15, y=7, z=4. Con una moneda adicional de 1 céntimo, el valor sería 50 céntimos.`
      ),
    },
    "ccss2-algebra-4b92649fc36e-programacion": {
      "Resultado": answer(
        "11 lotes A y 5 lotes B; beneficio máximo 265 €",
        [
          "10 lotes A y 5 lotes B; 250 €",
          "9 lotes A y 6 lotes B; 255 €",
          "12 lotes A y 4 lotes B; 260 €",
        ],
        `Sean x los lotes A e y los lotes B. De la tabla:
{ 2x+5y≤55
  5x+4y≤75
  2x+3y≤37
  x≥0, y≥0 }

La función objetivo es G=15x+20y. Las fronteras
5x+4y=75 y 2x+3y=37 se cortan en:
{ 5x+4y=75
  2x+3y=37 }
⇒ x=11, y=5.

Al evaluar G en los vértices de la región factible:
G(11,5)=15·11+20·5=265 €,
que es el valor máximo.`
      ),
    },

    "ccss2-algebra-33f6cfdefe6d": {
      "a1)": answer(
        "X=(A−B)⁻¹A",
        ["X=A⁻¹(A−B)", "X=(A+B)⁻¹A", "X=A−B"],
        `De A+BX=AX pasamos los términos con X al mismo miembro:
AX−BX=A.

Sacamos X como factor común por la derecha:
(A−B)X=A.

Multiplicando por la izquierda por (A−B)⁻¹:
X=(A−B)⁻¹A.`
      ),
      "a2)": answer(
        "X=((0,−1,1),(−3,−2,1),(2,2,0))",
        [
          "X=((0,1,1),(3,−2,1),(2,−2,0))",
          "X=((1,0,0),(0,1,0),(0,0,1))",
          "X=((0,−1,−1),(−3,2,1),(−2,2,0))",
        ],
        `Formamos:
A−B=((1,−1,−1),(0,−1,−1),(1,0,1)).

Su determinante no es cero, por lo que existe la inversa. Calculamos
(A−B)⁻¹=Adj((A−B)ᵀ)/det(A−B)
y multiplicamos por A.

Así:
X=(A−B)⁻¹A=((0,−1,1),(−3,−2,1),(2,2,0)).

Comprobación: A+BX=AX.`
      ),
      "B)": answer(
        "15 años, 10 años y 7 años",
        ["14, 11 y 7 años", "16, 9 y 7 años", "15, 9 y 8 años"],
        `Sean x, y, z las edades del mayor, mediano y pequeño.

Planteamos:
{ x+y+z=32
  x=2z+1
  z=(1/5)x+(2/5)y }

Eliminando denominadores:
{ x+y+z=32
  x−2z=1
  −x−2y+5z=0 }

Al resolver el sistema se obtiene x=15, y=10, z=7. Se comprueba que 15=2·7+1 y que 7=0,2·15+0,4·10.`
      ),
    },
    "ccss2-algebra-33f6cfdefe6d-programacion": {
      "Resultado": answer(
        "1200 € en A y 300 € en B; beneficio máximo 53,25 €",
        [
          "600 € en A y 800 € en B; 51 €",
          "1200 € en A y 0 € en B; 42 €",
          "0 € en A y 800 € en B; 30 €",
        ],
        `Sean x e y los euros depositados en A y B:
{ 0≤x≤1200
  0≤y≤800
  5x+6y≤7800 }

La función objetivo es I=0,035x+0,0375y. En el vértice con x=1200:
5·1200+6y=7800
⇒ 6000+6y=7800
⇒ y=300.

Evaluando la función objetivo en los vértices:
I(1200,300)=0,035·1200+0,0375·300=53,25 €,
que supera los restantes valores.`
      ),
    },

    "ccss2-algebra-98de5b7e048f": {
      "a1)": answer(
        "X=(2I−A)⁻¹B",
        ["X=(I−A)⁻¹B", "X=B(2I−A)⁻¹", "X=2I−A+B"],
        `Partimos de X−AX=B−X. Sumamos X a ambos miembros:
2X−AX=B.

Sacamos X como factor común por la derecha:
(2I−A)X=B.

Como det(2I−A)≠0, multiplicamos por la izquierda por su inversa:
X=(2I−A)⁻¹B.`
      ),
      "a2)": answer(
        "X=((1,0),(0,1),(1,1))",
        [
          "X=((1,0),(1,0),(0,1))",
          "X=((0,1),(1,0),(1,1))",
          "X=((1,1),(0,1),(1,0))",
        ],
        `Calculamos:
2I−A=((1,−1,0),(−1,2,−1),(0,0,1)).

Su determinante es 1, de modo que existe la inversa. Aplicando
X=(2I−A)⁻¹B obtenemos:
X=((1,0),(0,1),(1,1)).

La matriz X es 3×2, igual que B, y la comprobación (2I−A)X=B verifica el resultado.`
      ),
      "B)": answer(
        "20 de menta, 15 de café y 25 de limón",
        [
          "20 de menta, 20 de café y 20 de limón",
          "25 de menta, 15 de café y 20 de limón",
          "15 de menta, 20 de café y 25 de limón",
        ],
        `Sean m, c, l las cantidades de caramelos de menta, café y limón. Como cada uno cuesta 0,05 €, hay 3/0,05=60 caramelos.

Las condiciones forman el sistema:
{ m+c+l=60
  0,3m=0,1(c+l)+2
  m+l=3c }

Multiplicando la segunda ecuación por 10:
{ m+c+l=60
  3m−c−l=20
  m−3c+l=0 }

La solución es m=20, c=15, l=25.`
      ),
    },
    "ccss2-algebra-98de5b7e048f-programacion": {
      "Resultado": answer(
        "5 h en casa y 7/3 h en la biblioteca; aprovechamiento máximo 4,05 h",
        [
          "5 h en casa y 2 h en biblioteca; 3,9 h",
          "4 h en casa y 8/3 h en biblioteca; 3,6 h",
          "2 h en casa y 10/3 h en biblioteca; 2,7 h",
        ],
        `Sean x las horas en casa e y las horas en la biblioteca:
{ 0≤x≤5
  0≤y≤10/3
  x+3y≤12 }

La función objetivo es A=0,60x+0,45y. En el vértice con x=5:
5+3y=12 ⇒ y=7/3.

Evaluamos:
A(5,7/3)=0,60·5+0,45·(7/3)=3+1,05=4,05 horas efectivas.

La comparación con los demás vértices confirma que es el máximo.`
      ),
    },

    "ccss2-analisis-e05cbab633d7": {
      "Resultado": answer(
        "Continua en x=−2 y discontinua en x=3; el área pedida es 16/3",
        [
          "Discontinua en x=−2 y continua en x=3; el área es 8/3",
          "Continua en x=−2 y x=3; el área es 16/3",
          "Discontinua en x=−2 y x=3; el área es 4",
        ],
        `Cada expresión es continua en el interior de su intervalo, por lo que estudiamos los puntos de unión.

En x=−2:
lim_(x→−2⁻)f(x)=0,  lim_(x→−2⁺)f(x)=(−2)²−4=0  y  f(−2)=0.
Los tres valores coinciden; por tanto, f es continua en x=−2.

En x=3:
lim_(x→3⁻)f(x)=3²−4=5,
lim_(x→3⁺)f(x)=3²/4=9/4  y  f(3)=9/4.
Como los límites laterales no coinciden, f es discontinua en x=3.

La rama x²−4 corta al eje OX en x=−2 y x=2. En [−2,2] la función queda por debajo del eje:
A=∫_(−2)^2 [0−(x²−4)] dx
 =[4x−x³/3]_(−2)^2
 =16/3.

Resultado: continua en x=−2, discontinua en x=3 y área 16/3 unidades cuadradas.`
      ),
    },
    "ccss2-analisis-e05cbab633d7-opcion-b": {
      "Resultado": answer(
        "E(t)=2 para t=6 y t=12; el mínimo se alcanza en t=9 y vale 1",
        [
          "E(t)=2 solo para t=9; el mínimo vale 2",
          "E(t)=2 para t=3 y t=15; el mínimo vale 1",
          "E(t)=2 para t=6 y t=12; el máximo se alcanza en t=9",
        ],
        `La función es E(t)=t²/9−2t+10.

Para hallar cuándo vale 2:
t²/9−2t+10=2
⇒ t²−18t+72=0
⇒ (t−6)(t−12)=0.
Por tanto, t=6 o t=12.

Como el coeficiente de t² es positivo, la parábola tiene un mínimo. Su abscisa es
t=−b/(2a)=2/[2·(1/9)]=9.

E(9)=81/9−18+10=1.

Resultado: E(t)=2 para t=6 y t=12; el mínimo es E(9)=1.`
      ),
    },
    "ccss2-analisis-4619aeaaa112": {
      "Resultado": answer(
        "Continua en x=−2 y discontinua en x=1; el área entre x=1 y x=2 es 7/12",
        [
          "Discontinua en x=−2 y continua en x=1; el área es 7/12",
          "Continua en ambos puntos; el área es 1/2",
          "Discontinua en ambos puntos; el área es 5/12",
        ],
        `Estudiamos los puntos en los que cambia la expresión.

En x=−2:
lim_(x→−2⁻)f(x)=−(−2)−2=0,
lim_(x→−2⁺)f(x)=(−2+2)/3=0
y f(−2)=0.
Luego f es continua en x=−2.

En x=1:
lim_(x→1⁻)f(x)=(1+2)/3=1,
lim_(x→1⁺)f(x)=−1²/4=−1/4
y f(1)=−1/4.
Como los límites laterales son distintos, hay discontinuidad en x=1.

En [1,2], f(x)=−x²/4 está bajo el eje OX:
A=∫_1^2 x²/4 dx
 =[x³/12]_1^2
 =(8−1)/12=7/12.

Resultado: continua en x=−2, discontinua en x=1 y área 7/12.`
      ),
    },
    "ccss2-analisis-4619aeaaa112-opcion-b": {
      "Resultado": answer(
        "7 300 000 € para 500 y 1000 unidades; beneficio máximo de 8 300 000 € con 750 unidades",
        [
          "7 300 000 € solo con 750 unidades; máximo de 8 300 000 €",
          "7 300 000 € con 500 y 1000 unidades; máximo con 1000 unidades",
          "8 300 000 € con 500 y 1000 unidades; máximo con 750 unidades",
        ],
        `La función de beneficios es B(x)=−16x²+24000x−700000.

Para obtener 7 300 000 €:
−16x²+24000x−700000=7300000
⇒ x²−1500x+500000=0
⇒ x=500 o x=1000.

La parábola abre hacia abajo, así que su vértice proporciona el máximo:
x=−b/(2a)=−24000/[2·(−16)]=750.

B(750)=−16·750²+24000·750−700000=8300000.

Resultado: 7 300 000 € con 500 o 1000 unidades y máximo de 8 300 000 € con 750 unidades.`
      ),
    },
    "ccss2-analisis-3084db422c17": {
      "Resultado": answer(
        "Discontinua en x=−3 y continua en x=1; el área del recinto es 14/3",
        [
          "Continua en x=−3 y discontinua en x=1; el área es 14/3",
          "Discontinua en ambos puntos; el área es 8/3",
          "Continua en ambos puntos; el área es 2",
        ],
        `La función es
f(x)=1 si x≤−3,
f(x)=(x+1)² si −3<x<1,
f(x)=−4x+8 si x≥1.

Continuidad en x=−3:
lim_(x→−3⁻)f(x)=1 y f(−3)=1,
lim_(x→−3⁺)f(x)=(−3+1)²=4.
Como los límites laterales son distintos, f es discontinua en x=−3.

Continuidad en x=1:
lim_(x→1⁻)f(x)=(1+1)²=4,
lim_(x→1⁺)f(x)=−4·1+8=4
y f(1)=4.
Por tanto, f es continua en x=1.

El recinto cerrado con el eje OX comienza donde (x+1)²=0, es decir, en x=−1, y termina donde −4x+8=0, es decir, en x=2. La función cambia de expresión en x=1:

A=∫_(−1)^1 (x+1)² dx+∫_1^2 (−4x+8) dx
 =[ (x+1)³/3 ]_(−1)^1+[−2x²+8x]_1^2
 =8/3+2
 =14/3.

Resultado: f es discontinua en x=−3, continua en x=1 y el área del recinto es 14/3 unidades cuadradas.`
      ),
    },
    "ccss2-analisis-3084db422c17-opcion-b": {
      "Resultado": answer(
        "Con 6 ordenadores el beneficio es 13 400 €; el máximo se obtiene con 5 y vale 41 000/3 €",
        [
          "Con 6 ordenadores el beneficio es 13 400 €; el máximo se obtiene con 6",
          "Con 6 ordenadores el beneficio es 134 €; el máximo vale 410/3 €",
          "Con 6 ordenadores el beneficio es 14 000 €; el máximo se obtiene con 5",
        ],
        `Los beneficios, en cientos de euros, son
B(x)=x³/3−8x²+55x+20.

Para x=6:
B(6)=216/3−8·36+55·6+20=134.
Como la unidad son cientos de euros, el beneficio es 13 400 €.

Derivamos:
B′(x)=x²−16x+55=(x−5)(x−11).
En el intervalo del enunciado, B′ cambia de positivo a negativo en x=5, por lo que allí hay un máximo.

B(5)=125/3−200+275+20=410/3 cientos de euros
=41000/3 €≈13 666,67 €.

Resultado: B(6)=13 400 € y el máximo se alcanza con 5 ordenadores.`
      ),
    },
    "ccss2-analisis-940206c50b32": {
      "Resultado": answer(
        "Continua en x=−4; el área comprendida entre x=−1 y x=1 es 17/6",
        [
          "Discontinua en x=−4; el área es 17/6",
          "Continua en x=−4; el área es 7/3",
          "Discontinua en x=0; el área es 3",
        ],
        `En x=−4:
lim_(x→−4⁻)f(x)=0,
lim_(x→−4⁺)f(x)=(−4)²+4(−4)=0
y f(−4)=0.
Por tanto, f es continua en x=−4.

En x=0:
lim_(x→0⁻)(x²+4x)=0,
lim_(x→0⁺)(x²−3x)=0
y f(0)=0; también es continua.

En [−1,0], x²+4x≤0; en [0,1], x²−3x≤0. Luego:
A=−∫_(−1)^0(x²+4x)dx−∫_0^1(x²−3x)dx
=5/3+7/6=17/6.

Resultado: continuidad en los puntos de unión y área 17/6 unidades cuadradas.`
      ),
    },
    "ccss2-analisis-940206c50b32-opcion-b": {
      "Resultado": answer(
        "Cierra a las 2:00; el máximo es 90 clientes a las 23:00; hay 50 clientes a las 21:00 y a la 1:00",
        [
          "Cierra a medianoche; el máximo es 90 clientes a las 23:00",
          "Cierra a las 2:00; el máximo es 60 clientes a las 22:00",
          "Cierra a las 3:00; hay 50 clientes solo a la 1:00",
        ],
        `El número de clientes es f(t)=60t−10t², donde t son las horas transcurridas desde las 20:00.

El restaurante queda vacío cuando
60t−10t²=0
⇒ 10t(6−t)=0.
Además de t=0, se obtiene t=6: cierra a las 2:00.

El máximo está en el vértice:
t=−60/[2·(−10)]=3,
f(3)=180−90=90.
Tres horas después de las 20:00 son las 23:00.

Para 50 clientes:
60t−10t²=50
⇒ t²−6t+5=0
⇒ t=1 o t=5.
Corresponden a las 21:00 y a la 1:00.

Resultado: cierra a las 2:00, máximo de 90 a las 23:00 y 50 clientes a las 21:00 y 1:00.`
      ),
    },

    "ccss2-probabilidad-2154a11aaa1d": {
      "Resultado": answer(
        "P(mismo color)=58/145=0,4; P(al menos un rubio)=22/29≈0,7586",
        [
          "P(mismo color)=2/5; P(al menos un rubio)=1/2",
          "P(mismo color)=87/145; P(al menos un rubio)=7/29",
          "P(mismo color)=58/145; P(al menos un rubio)=15/29",
        ],
        `Hay 3 pelirrojos, 15 rubios y 12 morenos.

Sin reemplazamiento:
P(mismo color)=[C(3,2)+C(15,2)+C(12,2)]/C(30,2)
=(3+105+66)/435=174/435=58/145=0,4.

Para “al menos un rubio” usamos el complementario:
P(al menos un rubio)=1−P(ningún rubio)
=1−C(15,2)/C(30,2)
=1−105/435=330/435=22/29≈0,7586.`
      ),
    },
    "ccss2-probabilidad-2154a11aaa1d-bloque-4": {
      "Resultado": answer(
        "P(ordenador)=0,42; P(ordenador∩Informática)=0,32; P(Informática|ordenador)=16/21≈0,7619",
        [
          "0,42; 0,10; 8/21",
          "0,32; 0,42; 21/16",
          "0,58; 0,32; 8/29",
        ],
        `Aplicamos la información del enunciado y la fórmula de la probabilidad condicionada.

La probabilidad de usar ordenador es
P(O)=0,42.

La probabilidad conjunta indicada es
P(O∩I)=0,32.

Por tanto:
P(I|O)=P(I∩O)/P(O)
=(0,32)/(0,42)=32/42=16/21≈0,7619.

Resultado: 0,42; 0,32 y 16/21, respectivamente.`
      ),
    },
    "ccss2-probabilidad-d1178aa457d6": {
      "Resultado": answer(
        "P(blanca|dado=5)=1/4; P(dado=5 y roja)=1/8",
        [
          "P(blanca|dado=5)=3/4; P(dado=5 y roja)=1/4",
          "P(blanca|dado=5)=2/7; P(dado=5 y roja)=1/6",
          "P(blanca|dado=5)=1/4; P(dado=5 y roja)=3/4",
        ],
        `Si el dado muestra 5, se utiliza la urna U₂, que contiene 2 bolas blancas y 6 rojas:
P(B|5)=2/8=1/4.

Para que ocurra “dado 5 y bola roja” deben suceder ambos hechos:
P(5∩R)=P(5)·P(R|5)
=(1/6)·(6/8)=1/8.

Resultado: 1/4 y 1/8.`
      ),
    },
    "ccss2-probabilidad-d1178aa457d6-bloque-4": {
      "Resultado": answer(
        "P(error)=17/180≈0,0944; P(primera|sin error)=85/326≈0,2607",
        [
          "P(error)=1/10; P(primera|sin error)=1/3",
          "P(error)=17/180; P(primera|sin error)=17/180",
          "P(error)=163/180; P(primera|sin error)=5/18",
        ],
        `Aplicamos la fórmula de la probabilidad total a las distintas ediciones:
P(E)=Σ P(edición_i)·P(E|edición_i)=17/180≈0,0944.

Luego:
P(no E)=1−17/180=163/180.

Por Bayes, para la primera edición:
P(primera|no E)
=P(primera∩no E)/P(no E)
=85/326≈0,2607.

Resultado: P(error)=17/180 y P(primera edición|sin error)=85/326.`
      ),
    },
    "ccss2-probabilidad-5dd12eb505f1": {
      "Resultado": answer(
        "P(ambos)=2/5; P(solo Luis)=1/5; P(al menos uno)=13/15",
        [
          "P(ambos)=3/5; P(solo Luis)=2/5; P(al menos uno)=1",
          "P(ambos)=2/5; P(solo Luis)=1/3; P(al menos uno)=11/15",
          "P(ambos)=2/15; P(solo Luis)=1/5; P(al menos uno)=13/15",
        ],
        `Sean L y R los sucesos “Luis termina sin repetir” y “Roberto termina sin repetir”. El enunciado da P(L)=3/5 y P(R)=2/3 y se consideran independientes.

P(L∩R)=(3/5)(2/3)=2/5.

P(solo L)=P(L)P(no R)=(3/5)(1/3)=1/5.

P(L∪R)=1−P(no L)P(no R)
=1−(2/5)(1/3)=1−2/15=13/15.`
      ),
    },
    "ccss2-probabilidad-5dd12eb505f1-bloque-4": {
      "Resultado": answer(
        "P(no falla y es A)=57/160=0,35625; P(B|falla)=10/13≈0,7692",
        [
          "57/160 y 3/13",
          "19/40 y 10/13",
          "3/8 y 3/10",
        ],
        `Sea F el suceso “la máquina falla”. Con los porcentajes del enunciado:
P(no F∩A)=P(A)·P(no F|A)=57/160=0,35625.

La probabilidad total de fallo es
P(F)=P(A)P(F|A)+P(B)P(F|B)=13/160.

Aplicamos Bayes:
P(B|F)=P(B∩F)/P(F)
=(10/160)/(13/160)=10/13≈0,7692.

Resultado: 57/160 y 10/13.`
      ),
    },
    "ccss2-probabilidad-26da01377b05": {
      "Resultado": answer(
        "P(contesta ambas)=0,04; P(solo la segunda)=0,16; P(al menos una)=0,36",
        [
          "0,4; 0,2; 0,6",
          "0,04; 0,32; 0,36",
          "0,16; 0,04; 0,20",
        ],
        `Para cada carta, p=0,2 y q=0,8. Suponemos independientes las respuestas.

P(ambas)=0,2·0,2=0,04.

P(solo la segunda)=0,8·0,2=0,16.

P(al menos una)=1−P(ninguna)
=1−0,8²=1−0,64=0,36.`
      ),
    },
    "ccss2-probabilidad-26da01377b05-bloque-4": {
      "Resultado": answer(
        "P(menor de 22)=0,36; P(no español y al menos 22)=0,28",
        [
          "0,64 y 0,28",
          "0,36 y 0,72",
          "0,28 y 0,36",
        ],
        `Organizamos las frecuencias de la tabla del enunciado.

La probabilidad de tener menos de 22 años es
P(M)=0,36.

La intersección “no español y edad mayor o igual que 22” corresponde a su casilla conjunta:
P(no E∩no M)=0,28.

Resultado: 0,36 y 0,28.`
      ),
    },

    "ccss2-estadistica-a0dc621d24e7": {
      "b)": answer(
        "IC₉₇%≈[50,421; 51,579] cm",
        [
          "IC₉₇%≈[48,600; 53,400] cm",
          "IC₉₇%≈[50,733; 51,267] cm",
          "IC₉₇%≈[49,830; 52,170] cm",
        ],
        `Datos: x̄=51 cm, σ=2,4 cm, n=81 y nivel de confianza 97 %.

Para α=0,03, α/2=0,015 y z_(1−α/2)≈2,170.

El error máximo es
E=z_(1−α/2)·σ/√n
=2,170·2,4/9≈0,579.

Por tanto:
IC₉₇%=[51−0,579;51+0,579]
≈[50,421;51,579] cm.`
      ),
    },
    "ccss2-estadistica-06adb84a049d": {
      "b)": answer(
        "IC₉₇%≈[5,971; 8,029]",
        [
          "IC₉₇%≈[4;10]",
          "IC₉₇%≈[6,526;7,474]",
          "IC₉₇%≈[5,500;8,500]",
        ],
        `Datos: x̄=7, σ=3, n=40 y confianza 97 %.

Con z_(0,985)≈2,170:
E=2,170·3/√40≈1,029.

Así:
IC₉₇%=[7−1,029;7+1,029]
≈[5,971;8,029].

Interpretación: el procedimiento empleado produce intervalos que contienen la media poblacional en el 97 % de las muestras del mismo tamaño.`
      ),
    },
    "ccss2-estadistica-c57568a37e1c": {
      "b)": answer(
        "IC₉₀%≈[501,694; 505,806] g",
        [
          "IC₉₀%≈[498,750;508,750] g",
          "IC₉₀%≈[502,500;505,000] g",
          "IC₉₀%≈[500,460;507,040] g",
        ],
        `La media muestral es x̄=503,75 g, la desviación típica poblacional σ=5 g y n=16.

Para confianza 90 %, z_(0,95)≈1,645.

E=1,645·5/√16=1,645·5/4≈2,056.

IC₉₀%=[503,75−2,056;503,75+2,056]
≈[501,694;505,806] g.`
      ),
    },
    "ccss2-estadistica-b675eb301d9f": {
      "b)": answer(
        "IC₉₈%≈[25,847; 26,093]",
        [
          "IC₉₈%≈[22,380;29,560]",
          "IC₉₈%≈[25,917;26,023]",
          "IC₉₈%≈[25,724;26,216]",
        ],
        `Datos: x̄=25,97, σ=3,59, n=4624 y confianza 98 %.

Para α=0,02, z_(0,99)≈2,326.

Como √4624=68:
E=2,326·3,59/68≈0,123.

IC₉₈%=[25,97−0,123;25,97+0,123]
≈[25,847;26,093].`
      ),
    },
  });
})();

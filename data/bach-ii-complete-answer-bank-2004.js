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
  const insertAfter = (list, referenceId, exercise) => {
    if (!exercise || list.some((item) => item.id === exercise.id)) return;
    const index = list.findIndex((item) => item.id === referenceId);
    list.splice(index < 0 ? list.length : index + 1, 0, exercise);
  };
  const splitParagraph = (source, markers) => {
    if (!source) return [];
    const splitValue = (value) => {
      const positions = [0, ...markers
        .map((marker) => String(value || "").indexOf(marker))
        .filter((index) => index > 0)]
        .sort((a, b) => a - b);
      return positions.map((start, index) =>
        String(value || "").slice(start, positions[index + 1] ?? undefined).trim()
      );
    };
    const plainParts = splitValue(source.plain);
    const htmlParts = splitValue(source.html);
    return plainParts.map((plain, index) =>
      paragraph(plain, htmlParts[index] || plain)
    );
  };

  // Junio: las opciones A y B llegaron agrupadas.
  {
    const list = block("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-fe1862e55f34");
    if (exercise) {
      const embedded = copy(exercise.parts?.[0]?.paragraphs || []);
      const bParts = copy(exercise.parts || []).slice(1);
      exercise.parts = [makePart("a)"), makePart("b)", embedded.slice(0, 1))];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: embedded.slice(1, 2),
        parts: bParts,
      });
    }
  }
  // Septiembre: la opción A es el rango de A+λB y la B contiene dos apartados.
  {
    const list = block("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-875b0ef3bcbe");
    if (exercise) {
      const statements = copy(exercise.statement || []);
      const bParts = copy(exercise.parts || []);
      exercise.statement = statements.slice(0, 1);
      exercise.parts = [makePart("Resultado")];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: statements.slice(1, 2),
        parts: bParts,
      });
    }
  }
  {
    const exercise = block("algebra").find(
      (item) => item.id === "mates2-algebra-af918aa4bac9"
    );
    if (exercise && exercise.parts?.[0]?.label !== "a)") {
      exercise.parts = [makePart("a)"), ...copy(exercise.parts || [])];
    }
  }

  // Junio de Análisis contiene cuatro ejercicios oficiales.
  {
    const list = block("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-1d3c41960c30");
    if (exercise) {
      const parts = copy(exercise.parts || []);
      const embeddedB = copy(parts[1]?.paragraphs || []);
      const cSplit = splitParagraph(parts[4]?.paragraphs?.[0], ["d)", "e)", "2º-B)"]);

      exercise.parts = [parts[0], makePart("b)", embeddedB.slice(0, 1))];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-1b`,
        statement: embeddedB.slice(1, 2),
        parts: [makePart("Resultado")],
      });
      insertAfter(list, `${exercise.id}-1b`, {
        ...copy(exercise),
        id: `${exercise.id}-2a`,
        statement: embeddedB.slice(2, 3),
        parts: [
          parts[2],
          parts[3],
          makePart("c)", cSplit.slice(0, 1)),
          makePart("d)", cSplit.slice(1, 2)),
          makePart("e)", cSplit.slice(2, 3)),
        ],
      });
      insertAfter(list, `${exercise.id}-2a`, {
        ...copy(exercise),
        id: `${exercise.id}-2b`,
        statement: cSplit.slice(3, 4),
        parts: [parts[5], parts[6]],
      });
    }
  }

  // Septiembre de Análisis también contiene cuatro ejercicios.
  {
    const list = block("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-319602a35fa3");
    if (exercise) {
      const parts = copy(exercise.parts || []);
      const firstSplit = splitParagraph(parts[1]?.paragraphs?.[0], ["1º-B)"]);
      const middleSplit = splitParagraph(parts[4]?.paragraphs?.[0], ["d)", "2º-A)", "2º-B)"]);

      exercise.parts = [parts[0], makePart("b)", firstSplit.slice(0, 1))];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-1b`,
        statement: firstSplit.slice(1, 2),
        parts: [
          parts[2],
          parts[3],
          makePart("c)", middleSplit.slice(0, 1)),
          makePart("d)", middleSplit.slice(1, 2)),
        ],
      });
      insertAfter(list, `${exercise.id}-1b`, {
        ...copy(exercise),
        id: `${exercise.id}-2a`,
        statement: middleSplit.slice(2, 3),
        parts: [makePart("Resultado")],
      });
      insertAfter(list, `${exercise.id}-2a`, {
        ...copy(exercise),
        id: `${exercise.id}-2b`,
        statement: middleSplit.slice(3, 4),
        parts: [parts[5], parts[6]],
      });
    }
  }
  for (const id of [
    "mates2-analisis-c8070096fa96",
    "mates2-analisis-44f5fd04c357",
  ]) {
    const exercise = block("analisis").find((item) => item.id === id);
    if (exercise && exercise.parts?.[0]?.label !== "a)") {
      exercise.parts = [makePart("a)"), ...copy(exercise.parts || [])];
    }
  }
  {
    const exercise = block("analisis").find(
      (item) => item.id === "mates2-analisis-8223e6a650c0"
    );
    if (exercise) {
      const parts = copy(exercise.parts || []);
      const cSplit = splitParagraph(parts[2]?.paragraphs?.[0], ["d)"]);
      exercise.parts = [
        parts[0],
        parts[1],
        makePart("c)", cSplit.slice(0, 1)),
        makePart("d)", cSplit.slice(1, 2)),
      ];
    }
  }

  // Geometría: separamos las opciones de cada convocatoria ordinaria.
  {
    const list = block("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-d0f9e5056e6f");
    if (exercise) {
      const parts = copy(exercise.parts || []);
      const cParagraphs = copy(parts[2]?.paragraphs || []);
      exercise.parts = [parts[0], parts[1], makePart("c)", cParagraphs.slice(0, 1))];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: cParagraphs.slice(1, 2),
        parts: [parts[3], parts[4]],
      });
    }
  }
  {
    const list = block("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-17c18a82fc49");
    if (exercise) {
      const statements = copy(exercise.statement || []);
      const bParts = copy(exercise.parts || []);
      exercise.statement = statements.slice(0, 1);
      exercise.parts = [makePart("Resultado")];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: statements.slice(1, 2),
        parts: bParts,
      });
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-fe1862e55f34": {
      "a)": answer(
        "X=C⁻¹B⁻¹−A",
        ["X=B⁻¹C⁻¹−A", "X=C⁻¹AB⁻¹", "X=A−C⁻¹B⁻¹"],
        `Partimos de:
C(A+X)B=I.

Como C tiene inversa, multiplicamos por C⁻¹ a la izquierda:
C⁻¹C(A+X)B=C⁻¹I
⇒ (A+X)B=C⁻¹.

Como B tiene inversa, multiplicamos por B⁻¹ a la derecha:
(A+X)BB⁻¹=C⁻¹B⁻¹
⇒ A+X=C⁻¹B⁻¹.

Despejamos:
X=C⁻¹B⁻¹−A.

El orden de los factores no puede cambiarse porque, en general, el producto de matrices no es conmutativo.

Resultado: X=C⁻¹B⁻¹−A.`
      ),
      "b)": answer(
        "X=((−2,−5),(−2,0))",
        [
          "X=((−2,−2),(−5,0))",
          "X=((2,5),(2,0))",
          "X=((−1,−1),(−1,2))",
        ],
        `Usamos:
X=C⁻¹B⁻¹−A.

Las matrices son:
A=((3,4),(1,2)),
B=((1,1),(0,1)),
C=((1,0),(1,1)).

Calculamos las inversas mediante determinantes:
det(B)=1,
B⁻¹=((1,−1),(0,1)).

det(C)=1,
C⁻¹=((1,0),(−1,1)).

Multiplicamos en el orden correcto:
C⁻¹B⁻¹
=((1,0),(−1,1))·((1,−1),(0,1))
=((1,−1),(−1,2)).

Restamos A:
X=((1,−1),(−1,2))−((3,4),(1,2))
=((−2,−5),(−2,0)).

Comprobación:
C(A+X)B=I.

Resultado: X=((−2,−5),(−2,0)).`
      ),
    },
    "mates2-algebra-fe1862e55f34-opcion-b": {
      "a)": answer(
        "m≠0,−1: SCD; m=0 o m=−1: incompatible",
        [
          "m≠0,−1: SCI; m=0 o m=−1: SCD",
          "m=0: SCI; para el resto: SCD",
          "Para todo m es incompatible",
        ],
        `Aplicamos el teorema de Rouché-Frobenius. La matriz de coeficientes es:
A=((m+2,m−1,−1),(m,−1,1),(1,m,−1)).

Calculamos su determinante:
det(A)=−m(m+1).

Si m≠0 y m≠−1:
det(A)≠0
⇒ rango(A)=3.
Como hay tres incógnitas, el sistema es compatible determinado.

Estudiamos m=0. El sistema queda:
{ 2x−y−z=3
{ −y+z=2
{ x−z=0

De x−z=0 obtenemos z=x. De −y+z=2 resulta y=x−2. Al sustituir en la primera ecuación:
2x−(x−2)−x=3
⇒ 2=3,
que es una contradicción. Por tanto, es incompatible.

Estudiamos m=−1:
{ x−2y−z=−3
{ −x−y+z=2
{ x−y−z=0

De la tercera, z=x−y. Sustituyendo en la segunda:
−x−y+x−y=2
⇒ y=−1.
Al sustituir en la primera se obtiene 1=−3, otra contradicción. También es incompatible.

Resultado:
m≠0,−1: sistema compatible determinado.
m=0 o m=−1: sistema incompatible.`
      ),
      "b)": answer(
        "(x,y,z)=(1,−1,0)",
        [
          "(x,y,z)=(1,0,−1)",
          "(x,y,z)=(0,−1,1)",
          "(x,y,z)=(−1,1,0)",
        ],
        `Para m=1, el sistema es:
{ 3x−z=3
{ x−y+z=2
{ x+y−z=0

Sumamos las dos últimas ecuaciones:
2x=2
⇒ x=1.

En la primera:
3·1−z=3
⇒ z=0.

En la tercera:
1+y−0=0
⇒ y=−1.

Comprobación:
3·1−0=3,
1−(−1)+0=2,
1+(−1)−0=0.

Resultado: (x,y,z)=(1,−1,0).`
      ),
    },
    "mates2-algebra-875b0ef3bcbe": {
      "Resultado": answer(
        "Rango 3 si λ≠−1,1; rango 2 si λ=−1 o λ=1",
        [
          "Rango 3 para todo λ",
          "Rango 2 si λ=0; rango 3 en los demás casos",
          "Rango 1 si λ=−1 o λ=1; rango 2 en los demás casos",
        ],
        `Formamos:
A+λB
=((1,λ,1+λ),(λ,2+λ,0),(1,1,2λ)).

Calculamos el determinante:
det(A+λB)
=−2(λ−1)²(λ+1).

Si λ≠1 y λ≠−1, el determinante es distinto de cero:
rango(A+λB)=3.

Para λ=1:
A+B=((1,1,2),(1,3,0),(1,1,2)).
La primera y la tercera fila coinciden, pero el menor:
|1 1; 1 3|=2≠0.
Por tanto, el rango es 2.

Para λ=−1:
A−B=((1,−1,0),(−1,1,0),(1,1,−2)).
La segunda fila es la opuesta de la primera y hay un menor de orden 2 no nulo. Luego el rango es 2.

Resultado:
• rango 3 si λ≠−1,1;
• rango 2 si λ=−1 o λ=1.`
      ),
    },
    "mates2-algebra-875b0ef3bcbe-opcion-b": {
      "a)": answer(
        "(A−I)⁻¹=((−1,3,0),(1,−2,1),(1,−2,0))",
        [
          "(A−I)⁻¹=((1,−3,0),(−1,2,−1),(−1,2,0))",
          "(A−I)⁻¹=((−1,1,1),(3,−2,−2),(0,1,0))",
          "A−I no tiene inversa",
        ],
        `Calculamos:
A−I=((2,0,3),(1,0,1),(0,1,−1)).

Su determinante es:
det(A−I)=1≠0.
Por tanto, tiene inversa.

Usamos la fórmula de la inversa:
(A−I)⁻¹=Adj((A−I)ᵀ)/det(A−I).

Al calcular los adjuntos y trasponer, obtenemos:
Adj((A−I)ᵀ)=((−1,3,0),(1,−2,1),(1,−2,0)).

Como el determinante vale 1:
(A−I)⁻¹=((−1,3,0),(1,−2,1),(1,−2,0)).

Comprobación:
(A−I)(A−I)⁻¹=I.

Resultado: (A−I)⁻¹=((−1,3,0),(1,−2,1),(1,−2,0)).`
      ),
      "b)": answer(
        "X=((0,4,2),(−2,6,0),(−2,6,−2))",
        [
          "X=((0,−4,−2),(2,−6,0),(2,−6,2))",
          "X=((0,2,4),(−2,0,6),(−2,−2,6))",
          "X=((2,1,1),(1,0,0),(1,−1,1))",
        ],
        `Partimos de:
XA−2B=X.

Agrupamos los términos que contienen X:
XA−X=2B.

Sacamos factor común por la derecha:
X(A−I)=2B.

Multiplicamos por (A−I)⁻¹ a la derecha:
X=2B(A−I)⁻¹.

Ya sabemos que:
(A−I)⁻¹=((−1,3,0),(1,−2,1),(1,−2,0)).

Entonces:
X=2((2,1,1),(1,0,0),(1,−1,1))
·((−1,3,0),(1,−2,1),(1,−2,0))

=((0,4,2),(−2,6,0),(−2,6,−2)).

Comprobación: al sustituir esta matriz, XA−2B=X.

Resultado: X=((0,4,2),(−2,6,0),(−2,6,−2)).`
      ),
    },
    "mates2-algebra-af918aa4bac9": {
      "a)": answer(
        "a≠3,−3/2: SCD; a=3: SCI; a=−3/2: incompatible",
        [
          "a≠3,−3/2: SCI; a=3: SCD; a=−3/2: incompatible",
          "a=3 o a=−3/2: SCD; en los demás casos: incompatible",
          "Para todo a es SCD",
        ],
        `La matriz de coeficientes es:
A=((1,−2,−1),(a,−1,2),(1,2,a)).

Calculamos:
det(A)=2a²−3a−9
=(2a+3)(a−3).

Si a≠3 y a≠−3/2:
det(A)≠0,
por lo que el sistema es compatible determinado.

Para a=3, al escalonar la matriz ampliada se obtiene:
((1,0,1|1),(0,1,1|1),(0,0,0|0)).
Así:
rango(A)=rango(A*)=2<3.
El sistema es compatible indeterminado.

Para a=−3/2, el escalonamiento produce una fila:
(0,0,0|9/2).
Por tanto:
rango(A)=2<rango(A*)=3,
y el sistema es incompatible.

Resultado:
a≠3,−3/2: SCD;
a=3: SCI;
a=−3/2: incompatible.`
      ),
      "b)": answer(
        "(x,y,z)=(1−t,1−t,t), t∈ℝ",
        [
          "(x,y,z)=(1+t,1−t,t)",
          "(x,y,z)=(t,t,1−t)",
          "(x,y,z)=(1,1,0) únicamente",
        ],
        `Para a=3, el sistema escalonado es:
{ x+z=1
{ y+z=1.

Como hay tres incógnitas y dos ecuaciones independientes, elegimos:
z=t, con t∈ℝ.

Entonces:
x=1−t,
y=1−t.

Por tanto:
(x,y,z)=(1−t,1−t,t), t∈ℝ.

Comprobación: al sustituir esta expresión en las tres ecuaciones del sistema con a=3, todas se cumplen.

Resultado: (x,y,z)=(1−t,1−t,t), t∈ℝ.`
      ),
    },
    "mates2-algebra-c932e9687d88": {
      "Resultado": answer(
        "X=(t,t−2,6−2t), con t∈ℤ",
        [
          "X=(10,6,2)",
          "X=(t,t+2,6+2t), con t∈ℤ",
          "No existe ninguna solución",
        ],
        `Sea:
X=(x,y,z).

La condición XA=(10,6,2) conduce al sistema:
{ 4x−2y+z=10
{ 2x+z=6
{ 2y+z=2.

De la segunda ecuación:
z=6−2x.

De la tercera:
2y+6−2x=2
⇒ y=x−2.

Al sustituir en la primera:
4x−2(x−2)+(6−2x)=10
⇒ 10=10.
Por tanto, queda un parámetro libre.

Tomamos x=t. Entonces:
y=t−2,
z=6−2t.

Como se pide que los elementos de X sean enteros, elegimos t∈ℤ.

Resultado: X=(t,t−2,6−2t), con t∈ℤ.`
      ),
    },
    "mates2-algebra-55b209cb415f": {
      "Resultado": answer(
        "X=((3,1,−4,0),(−11,−1,14,−2))",
        [
          "X=((3,1,−4,0),(1,−1,14,−2))",
          "X=((−3,−1,4,0),(11,1,−14,2))",
          "X=((1,3,−2,−2),(−3,−1,4,0))",
        ],
        `Partimos de:
AX−B+C=0.

Despejamos:
AX=B−C.

Multiplicamos por A⁻¹ a la izquierda:
X=A⁻¹(B−C).

Calculamos la inversa de:
A=((4,1),(−1,0)).

det(A)=4·0−1·(−1)=1.
Por tanto:
A⁻¹=((0,−1),(1,4)).

Restamos:
B−C
=((1,2,0,−1),(−2,−1,1,0))
−((0,−1,2,1),(1,0,−3,0))

=((1,3,−2,−2),(−3,−1,4,0)).

Multiplicamos:
X=((0,−1),(1,4))
·((1,3,−2,−2),(−3,−1,4,0))

=((3,1,−4,0),(−11,−1,14,−2)).

Resultado: X=((3,1,−4,0),(−11,−1,14,−2)).`
      ),
    },
    "mates2-algebra-50a998df9441": {
      "a)": answer(
        "c=−1 o c=6",
        ["c=−6 o c=1", "c=0", "c=−1 únicamente"],
        `Formamos:
A+cB
=((1+c,−1),(4+4c,2−c)).

Para que una matriz cuadrada de orden 2 no tenga rango 2, su determinante debe ser cero:

det(A+cB)
=(1+c)(2−c)−(−1)(4+4c)
=6+5c−c².

Igualamos a cero:
6+5c−c²=0
⇒ c²−5c−6=0
⇒ (c−6)(c+1)=0.

Por tanto:
c=6 o c=−1.

Resultado: c=−1 o c=6.`
      ),
      "b)": answer(
        "Para c=6: ((−21,3),(84,−12)), rango 1; para c=−1: ((0,−4),(0,2)), rango 1",
        [
          "En ambos casos se obtiene la matriz nula, de rango 0",
          "Para c=6 el rango es 2 y para c=−1 es 1",
          "Para c=6: ((21,−3),(−84,12)); para c=−1: ((0,4),(0,−2))",
        ],
        `Para c=6:
A+6B=((7,−1),(28,−4)).

Multiplicamos:
A(A+6B)
=((1,−1),(4,2))·((7,−1),(28,−4))
=((−21,3),(84,−12)).

La segunda fila es −4 veces la primera y la matriz no es nula. Por tanto, su rango es 1.

Para c=−1:
A−B=((0,−1),(0,3)).

Multiplicamos:
A(A−B)
=((1,−1),(4,2))·((0,−1),(0,3))
=((0,−4),(0,2)).

La matriz no es nula y sus columnas son dependientes. Su rango es 1.

Resultado:
• c=6: A(A+6B)=((−21,3),(84,−12)), rango 1.
• c=−1: A(A−B)=((0,−4),(0,2)), rango 1.`
      ),
    },
    "mates2-analisis-1d3c41960c30": {
      "a)": answer(
        "La parábola y=x² divide el cuadrado unidad en las regiones 0≤y≤x² y x²≤y≤1",
        [
          "La recta y=x divide el cuadrado en dos triángulos",
          "La parábola y=1−x² queda fuera del cuadrado",
          "La curva divide el cuadrado en dos regiones iguales",
        ],
        `El cuadrado tiene vértices:
O=(0,0), A=(1,0), B=(1,1), C=(0,1).

En el intervalo 0≤x≤1, la curva y=x² parte de O=(0,0) y llega a B=(1,1).

La región inferior queda limitada por:
y=0, x=1 e y=x².

La región superior queda limitada por:
x=0, y=1 e y=x².

Para representarlas, dibujamos los ejes, el cuadrado unidad y la rama de la parábola y=x² comprendida entre O y B. La parábola queda por debajo de la recta y=x en el interior del cuadrado.`
      ),
      "b)": answer(
        "Áreas 1/3 y 2/3",
        ["Áreas 1/2 y 1/2", "Áreas 1/4 y 3/4", "Áreas 2/5 y 3/5"],
        `El área situada debajo de la parábola dentro del cuadrado es:

A₁=∫₀¹ x² dx.

Aplicamos la regla de Barrow:
A₁=[x³/3]₀¹
=1/3.

El área total del cuadrado unidad es:
A_cuadrado=1·1=1.

Por tanto, el área de la otra región es:
A₂=1−A₁
=1−1/3
=2/3.

En la representación se debe sombrear cada región con un color distinto: la comprendida entre y=0 e y=x² tiene área 1/3; la comprendida entre y=x² e y=1 tiene área 2/3.

Resultado: las áreas son 1/3 y 2/3 unidades cuadradas.`
      ),
    },
    "mates2-analisis-1d3c41960c30-1b": {
      "Resultado": answer(
        "Cuadrado: 400/(π+4) m; circunferencia: 100π/(π+4) m",
        [
          "50 m para cada figura",
          "Cuadrado: 100π/(π+4) m; circunferencia: 400/(π+4) m",
          "Cuadrado: 25 m; circunferencia: 75 m",
        ],
        `Sea x la longitud, en metros, destinada a formar el cuadrado. Para la circunferencia quedan 100−x metros.

El lado del cuadrado es:
l=x/4.
Su área es:
A_c=x²/16.

Si r es el radio de la circunferencia:
2πr=100−x
⇒ r=(100−x)/(2π).

El área del círculo es:
A_o=πr²
=(100−x)²/(4π).

La suma de áreas es:
S(x)=x²/16+(100−x)²/(4π).

Derivamos:
S'(x)=x/8−(100−x)/(2π).

Igualamos a cero:
x/8=(100−x)/(2π)
⇒ 2πx=8(100−x)
⇒ πx=4(100−x)
⇒ x(π+4)=400
⇒ x=400/(π+4).

La segunda derivada es:
S''(x)=1/8+1/(2π)>0,
por lo que se trata de un mínimo.

La longitud restante es:
100−x
=100−400/(π+4)
=100π/(π+4).

Resultado:
• para el cuadrado: 400/(π+4) m;
• para la circunferencia: 100π/(π+4) m.`
      ),
    },
    "mates2-analisis-1d3c41960c30-2a": {
      "a)": answer(
        "Dominio ℝ; cortes (−1,0), (1,0) y (0,−1)",
        [
          "Dominio ℝ\\{−1,1}; único corte (0,1)",
          "Dominio (−1,1); cortes (−1,0) y (1,0)",
          "Dominio ℝ; no corta ningún eje",
        ],
        `La función es:
f(x)=(x²−1)/(x²+1).

El denominador cumple:
x²+1>0
para todo x∈ℝ.
Por tanto, el dominio es ℝ.

Cortes con el eje OX:
f(x)=0
⇒ x²−1=0
⇒ x=−1 o x=1.
Los puntos son (−1,0) y (1,0).

Corte con el eje OY:
x=0
⇒ f(0)=−1.
El punto es (0,−1).

Resultado: dominio ℝ y cortes (−1,0), (1,0) y (0,−1).`
      ),
      "b)": answer(
        "Asíntota horizontal y=1; no hay asíntotas verticales ni oblicuas",
        [
          "Asíntotas verticales x=−1 y x=1",
          "Asíntota horizontal y=−1",
          "Asíntota oblicua y=x",
        ],
        `No existen asíntotas verticales porque el denominador x²+1 nunca se anula.

Para estudiar las asíntotas horizontales:

lim(x→±∞) (x²−1)/(x²+1)
=lim(x→±∞) (1−1/x²)/(1+1/x²)
=1.

Por tanto, la asíntota horizontal es:
y=1.

Al existir una asíntota horizontal cuando x→±∞, no hay asíntota oblicua.

Resultado: y=1 es la única asíntota.`
      ),
      "c)": answer(
        "Decrece en (−∞,0) y crece en (0,∞)",
        [
          "Crece en (−∞,0) y decrece en (0,∞)",
          "Crece en todo ℝ",
          "Decrece en todo ℝ",
        ],
        `Derivamos mediante la regla del cociente:

f'(x)=[2x(x²+1)−(x²−1)2x]/(x²+1)²
=4x/(x²+1)².

El denominador es siempre positivo. Por ello, el signo de f' es el signo de x.

Recta de signos:
• En (−∞,0), tomamos x=−1: f'(−1)<0, luego f decrece.
• En (0,∞), tomamos x=1: f'(1)>0, luego f crece.

Resultado: decrece en (−∞,0) y crece en (0,∞).`
      ),
      "d)": answer(
        "Mínimo relativo y absoluto en (0,−1); no tiene máximo",
        [
          "Máximo en (0,−1); no tiene mínimo",
          "Máximos en (−1,0) y (1,0)",
          "No tiene extremos",
        ],
        `La derivada se anula en:
f'(x)=0
⇒ x=0.

La recta de signos de f' muestra:
• antes de 0, f'<0;
• después de 0, f'>0.

La función pasa de decrecer a crecer, por lo que en x=0 hay un mínimo.

Su ordenada es:
f(0)=−1.

Además:
f(x)=1−2/(x²+1),
de modo que f(x)≥−1 para todo x. Por tanto, también es mínimo absoluto.

La función se aproxima a 1, pero no lo alcanza; no tiene máximo.

Resultado: mínimo en (0,−1) y ningún máximo.`
      ),
      "e)": answer(
        "Gráfica par, simétrica respecto de OY, con mínimo (0,−1) y asíntota y=1",
        [
          "Gráfica impar con asíntota x=0",
          "Recta creciente que pasa por el origen",
          "Parábola con vértice (0,1)",
        ],
        `Para representar la función reunimos los resultados:
• dominio ℝ;
• es par porque f(−x)=f(x), así que es simétrica respecto del eje OY;
• corta OX en (−1,0) y (1,0);
• corta OY en (0,−1);
• decrece hasta (0,−1) y después crece;
• tiene asíntota horizontal y=1.

La gráfica queda siempre por debajo de y=1 porque:
f(x)=1−2/(x²+1)<1.

Dibujamos primero la asíntota y=1, marcamos los tres puntos de corte y trazamos dos ramas simétricas que se aproximan a la asíntota cuando x→±∞.`
      ),
    },
    "mates2-analisis-1d3c41960c30-2b": {
      "a)": answer(
        "b=16 y c=−20",
        [
          "b=−16 y c=20",
          "b=12 y c=−16",
          "b=4 y c=0",
        ],
        `La función es:
f(x)=x³, si x≤2,
f(x)=−x²+bx+c, si x>2.

Cada rama es derivable en su intervalo. Solo estudiamos x=2.

Continuidad en x=2:
lim(x→2⁻)f(x)=f(2)=2³=8.

lim(x→2⁺)f(x)=−2²+2b+c
=−4+2b+c.

Igualamos:
−4+2b+c=8
⇒ 2b+c=12.  (1)

Derivadas:
f'(x)=3x², si x<2,
f'(x)=−2x+b, si x>2.

Derivabilidad en x=2:
f'(2⁻)=3·2²=12,
f'(2⁺)=−4+b.

Igualamos:
−4+b=12
⇒ b=16.

Sustituimos en (1):
2·16+c=12
⇒ c=−20.

Resultado: b=16 y c=−20.`
      ),
      "b)": answer(
        "y=3x−2",
        ["y=3x+2", "y=x", "y=12x−11"],
        `El punto de abscisa 1 pertenece a la primera rama:
f(x)=x³.

Calculamos el punto:
f(1)=1.
Por tanto, P=(1,1).

La pendiente de la tangente es:
f'(x)=3x²,
f'(1)=3.

Usamos la ecuación punto-pendiente:
y−1=3(x−1).

Desarrollamos:
y−1=3x−3
⇒ y=3x−2.

Resultado: la recta tangente es y=3x−2.`
      ),
    },
    "mates2-analisis-319602a35fa3": {
      "a)": answer(
        "a=1 y b=−1",
        ["a=−1 y b=1", "a=1 y b=0", "a=0 y b=−1"],
        `La función es:
f(x)=x³−x², si x≤1,
f(x)=ax+b, si x>1.

Continuidad en x=1:
f(1)=1³−1²=0,
lim(x→1⁺)f(x)=a+b.

Igualamos:
a+b=0.  (1)

Derivamos cada rama:
f'(x)=3x²−2x, si x<1,
f'(x)=a, si x>1.

Derivabilidad en x=1:
f'(1⁻)=3−2=1,
f'(1⁺)=a.

Igualamos:
a=1.

Sustituimos en (1):
1+b=0
⇒ b=−1.

Resultado: a=1 y b=−1.`
      ),
      "b)": answer(
        "y=x³−x² para x≤1 e y=x−1 para x>1, unidas en (1,0)",
        [
          "y=x³−x² para todo x",
          "y=x−1 para todo x",
          "Las dos ramas presentan un salto en x=1",
        ],
        `Con a=1 y b=−1:
f(x)=x³−x²=x²(x−1), si x≤1,
f(x)=x−1, si x>1.

Las dos ramas se unen en (1,0) y tienen allí la misma pendiente, igual a 1.

Para esbozar la rama cúbica:
f'(x)=x(3x−2).
Sus puntos críticos son x=0 y x=2/3.

Signos de f':
• crece en (−∞,0);
• decrece en (0,2/3);
• crece en (2/3,1].

Los puntos destacados son:
(0,0),
(2/3,−4/27),
(1,0).

A partir de x=1 continúa la recta y=x−1. La unión es suave porque tanto el valor como la derivada coinciden.`
      ),
    },
    "mates2-analisis-319602a35fa3-1b": {
      "a)": answer(
        "Corta OX en (0,0) y (4,0), y OY en (0,0)",
        [
          "Corta OX únicamente en (3,0)",
          "Corta OX en (−4,0) y (0,0)",
          "No corta los ejes",
        ],
        `Factorizamos:
f(x)=−x⁴+4x³
=x³(4−x).

Cortes con OX:
f(x)=0
⇒ x³(4−x)=0
⇒ x=0 o x=4.

Los puntos son (0,0) y (4,0).

Corte con OY:
x=0
⇒ f(0)=0.
Es el punto (0,0).

Resultado: corta OX en (0,0) y (4,0), y OY en (0,0).`
      ),
      "b)": answer(
        "Máximo relativo y absoluto en (3,27); no tiene mínimo",
        [
          "Mínimo en (3,27); no tiene máximo",
          "Máximo en (0,0) y mínimo en (4,0)",
          "No tiene extremos",
        ],
        `Derivamos:
f'(x)=−4x³+12x²
=4x²(3−x).

Se anula en x=0 y x=3.

Estudiamos el signo en la recta real:
• En (−∞,0), por ejemplo x=−1: f'(−1)>0.
• En (0,3), por ejemplo x=1: f'(1)>0.
• En (3,∞), por ejemplo x=4: f'(4)<0.

En x=0 no cambia el signo, así que no hay extremo.
En x=3 pasa de + a −, luego hay un máximo.

Calculamos:
f(3)=−3⁴+4·3³
=−81+108
=27.

Como f(x)→−∞ cuando x→±∞, este máximo también es absoluto y no existe mínimo.

Resultado: máximo en (3,27); no tiene mínimo.`
      ),
      "c)": answer(
        "Puntos de inflexión (0,0) y (2,16)",
        [
          "Único punto de inflexión (3,27)",
          "Puntos de inflexión (0,0) y (4,0)",
          "No tiene puntos de inflexión",
        ],
        `Calculamos la segunda derivada:
f''(x)=−12x²+24x
=12x(2−x).

Se anula en:
x=0 y x=2.

Estudiamos su signo:
• En (−∞,0), tomamos x=−1: f''(−1)<0.
• En (0,2), tomamos x=1: f''(1)>0.
• En (2,∞), tomamos x=3: f''(3)<0.

La curvatura cambia en ambos valores.

Ordenadas:
f(0)=0,
f(2)=−16+32=16.

Resultado: los puntos de inflexión son (0,0) y (2,16).`
      ),
      "d)": answer(
        "256/5 unidades cuadradas",
        ["128/5 unidades cuadradas", "64 unidades cuadradas", "256 unidades cuadradas"],
        `La función corta el eje OX en x=0 y x=4. Entre ambos valores:
f(x)=x³(4−x)≥0.

La región encerrada es la situada entre la curva y el eje OX desde x=0 hasta x=4. En la gráfica debe sombrearse exactamente esa zona.

El área es:
A=∫₀⁴(−x⁴+4x³) dx.

Calculamos una primitiva:
∫(−x⁴+4x³) dx
=−x⁵/5+x⁴.

Aplicamos la regla de Barrow:
A=[−x⁵/5+x⁴]₀⁴
=−4⁵/5+4⁴
=−1024/5+256
=256/5.

Resultado: A=256/5 unidades cuadradas.`
      ),
    },
    "mates2-analisis-319602a35fa3-2a": {
      "Resultado": answer(
        "Los números son 40/3, 80/3 y 20; producto máximo 64000/9",
        [
          "Los números son 10,20 y 30; producto 6000",
          "Los números son 15,30 y 15; producto 6750",
          "Los números son 20,40 y 0; producto 0",
        ],
        `Sea x el primer número. El segundo debe ser 2x. Como la suma es 60, el tercero es:
60−x−2x=60−3x.

Los tres números deben ser positivos:
0<x<20.

El producto es:
P(x)=x·2x·(60−3x)
=120x²−6x³.

Derivamos:
P'(x)=240x−18x²
=6x(40−3x).

En el intervalo (0,20), el punto crítico es:
40−3x=0
⇒ x=40/3.

Recta de signos:
• antes de 40/3, P'>0;
• después de 40/3, P'<0.
Por tanto, el producto es máximo.

Los números son:
x=40/3,
2x=80/3,
60−3x=20.

El producto máximo es:
(40/3)(80/3)·20
=64000/9.

Resultado: 40/3, 80/3 y 20; producto máximo 64000/9.`
      ),
    },
    "mates2-analisis-319602a35fa3-2b": {
      "a)": answer(
        "Dos arcos parabólicos unidos en (1,1): y=x² a la izquierda e y=−x²+2x a la derecha",
        [
          "Dos rectas que se cortan en (1,0)",
          "Una única parábola y=x²",
          "Dos ramas discontinuas en x=1",
        ],
        `La función es:
f(x)=x², si x<1,
f(x)=−x²+2x=1−(x−1)², si x≥1.

Primera rama:
y=x², parábola abierta hacia arriba. Para x<1 pasa por (0,0) y se aproxima a (1,1).

Segunda rama:
y=1−(x−1)², parábola abierta hacia abajo, con vértice en (1,1). Para x≥1 corta OX en (2,0).

En x=1:
lim(x→1⁻)f(x)=1,
f(1)=1.
Las ramas se unen en (1,1).

Para el dibujo marcamos (0,0), (1,1) y (2,0), y trazamos los dos arcos parabólicos correspondientes.`
      ),
      "b)": answer(
        "1 unidad cuadrada",
        ["1/2 unidad cuadrada", "2/3 de unidad cuadrada", "2 unidades cuadradas"],
        `La región cerrada con el eje OX va desde x=0 hasta x=2. La función que limita superiormente cambia en x=1, por lo que dividimos el área.

En la gráfica se sombrean con colores distintos:
• desde x=0 hasta x=1, el área bajo y=x²;
• desde x=1 hasta x=2, el área bajo y=−x²+2x.

A=∫₀¹x² dx+∫₁²(−x²+2x) dx.

Primera integral:
∫₀¹x² dx=[x³/3]₀¹=1/3.

Segunda integral:
∫₁²(−x²+2x) dx
=[−x³/3+x²]₁²
=(−8/3+4)−(−1/3+1)
=4/3−2/3
=2/3.

Sumamos:
A=1/3+2/3=1.

Resultado: el área encerrada es 1 unidad cuadrada.`
      ),
    },
    "mates2-analisis-c8070096fa96": {
      "a)": answer(
        "Es continua si b=a+3; es derivable si, además, a=1",
        [
          "Es continua para cualquier a y b, pero nunca es derivable",
          "Es continua si b=a+3 y derivable si a=0",
          "Es continua y derivable solamente si a=3 y b=1",
        ],
        `Cada rama es un polinomio, por lo que solo debemos estudiar el punto de unión x=1.

Continuidad:
lim(x→1⁻)f(x)=5·1+b=5+b,
lim(x→1⁺)f(x)=f(1)=a·1²+3·1+5=a+8.

La función es continua cuando:
5+b=a+8
⇒ b=a+3.

Derivabilidad:
f'(x)=5, si x<1,
f'(x)=2ax+3, si x>1.

Por tanto:
f'(1⁻)=5,
f'(1⁺)=2a+3.

Igualamos:
5=2a+3
⇒ a=1.

Además debe cumplirse la continuidad, de modo que b=a+3=4.

Resultado: es continua si b=a+3 y es derivable si a=1, b=4.`
      ),
      "b)": answer(
        "a=1 y b=4",
        ["a=4 y b=1", "a=1 y b=3", "a=0 y b=3"],
        `Del apartado anterior, la derivabilidad exige:
a=1.

La continuidad exige:
b=a+3.

Sustituimos a=1:
b=1+3=4.

Resultado: a=1 y b=4.`
      ),
    },
    "mates2-analisis-018ce0509802": {
      "a)": answer(
        "Se cortan en (1,7) y (4,16); entre x=1 y x=4, g queda por encima de f",
        [
          "Se cortan únicamente en (0,8)",
          "No se cortan y f queda siempre por encima de g",
          "Se cortan en (1,16) y (4,7)",
        ],
        `Las funciones son:
f(x)=x²−2x+8=(x−1)²+7,
g(x)=−x²+8x=−(x−4)²+16.

Por tanto, f es una parábola abierta hacia arriba con vértice (1,7), y g es una parábola abierta hacia abajo con vértice (4,16).

Calculamos los puntos de corte:
x²−2x+8=−x²+8x
⇒ 2x²−10x+8=0
⇒ x²−5x+4=0
⇒ (x−1)(x−4)=0.

Así:
x=1 ⇒ y=7,
x=4 ⇒ y=16.

Para saber cuál queda arriba entre los cortes, tomamos x=2:
f(2)=8,
g(2)=12.

Luego g está por encima de f en [1,4]. La gráfica debe mostrar ambas parábolas y sombrear exclusivamente la región comprendida entre ellas desde x=1 hasta x=4.`
      ),
      "b)": answer(
        "9 unidades cuadradas",
        ["6 unidades cuadradas", "27/2 unidades cuadradas", "18 unidades cuadradas"],
        `Según la gráfica, los límites de integración son x=1 y x=4, y la función superior es g.

A=∫₁⁴[g(x)−f(x)] dx
=∫₁⁴[(−x²+8x)−(x²−2x+8)] dx
=∫₁⁴(−2x²+10x−8) dx.

Una primitiva es:
−2x³/3+5x²−8x.

Aplicamos la regla de Barrow:
A=[−2x³/3+5x²−8x]₁⁴
=(16/3)−(−11/3)
=27/3
=9.

Resultado: el área encerrada es 9 unidades cuadradas.`
      ),
    },
    "mates2-analisis-4aac7caf8258": {
      "Resultado": answer(
        "Un cuadrado de 5 dm de lado; premio máximo de 25 euros",
        [
          "Un rectángulo de 4 dm por 6 dm; premio de 24 euros",
          "Un cuadrado de 10 dm de lado; premio de 100 euros",
          "Un rectángulo de 2 dm por 8 dm; premio de 16 euros",
        ],
        `La cuerda mide 2 m=20 dm.

Sean x e y los lados del rectángulo. Su perímetro es:
2x+2y=20
⇒ x+y=10
⇒ y=10−x.

El área, que coincide numéricamente con el premio, es:
A(x)=x(10−x)=10x−x²,
con 0<x<10.

Derivamos:
A'(x)=10−2x.

Se anula cuando:
10−2x=0
⇒ x=5.

Además:
A''(x)=−2<0,
por lo que se trata de un máximo.

y=10−5=5.

Área máxima:
A(5)=5·5=25 dm².

Resultado: debe formar un cuadrado de 5 dm de lado y recibirá 25 euros.`
      ),
    },
    "mates2-analisis-b9ae7dfe3d6e": {
      "a)": answer(
        "Es continua en [0,3], pero no es derivable en x=2; no cumple todas las hipótesis",
        [
          "Es continua y derivable en todo [0,3]",
          "No es continua en x=2",
          "Es derivable en x=2, pero no continua",
        ],
        `Cada rama es polinómica. Comprobamos la unión x=2:

lim(x→2⁻)f(x)=2³=8,
lim(x→2⁺)f(x)=−2²+6·2=8,
f(2)=8.

Por tanto, f es continua en x=2 y, en consecuencia, en [0,3].

Derivamos cada rama:
f'(x)=3x², si x<2,
f'(x)=−2x+6, si x>2.

Derivadas laterales:
f'(2⁻)=3·2²=12,
f'(2⁺)=−2·2+6=2.

Como no coinciden, f no es derivable en x=2.

El teorema del valor medio exige continuidad en [0,3] y derivabilidad en (0,3). La segunda condición falla.

Resultado: no cumple todas las hipótesis del teorema del valor medio.`
      ),
      "b)": answer(
        "x=1, es decir, el punto (1,1)",
        ["x=2, es decir, el punto (2,8)", "x=3, es decir, el punto (3,9)", "No existe ningún punto"],
        `La pendiente de la secante que une los extremos del intervalo es:
m=[f(3)−f(0)]/(3−0)
=(9−0)/3
=3.

Buscamos los puntos donde f'(x)=3.

En la primera rama:
3x²=3
⇒ x²=1
⇒ x=±1.

Dentro de (0,2) solo sirve x=1.

En la segunda rama:
−2x+6=3
⇒ x=3/2,
pero este valor no pertenece a la rama x>2.

Por tanto, el único punto pedido es:
x=1,
f(1)=1.

Resultado: el punto es (1,1).`
      ),
    },
    "mates2-analisis-44f5fd04c357": {
      "a)": answer(
        "Si aparece 0/0 o ∞/∞, puede derivarse numerador y denominador y estudiar de nuevo el límite",
        [
          "La regla de L'Hôpital se aplica a cualquier cociente sin comprobar la indeterminación",
          "La regla consiste en integrar numerador y denominador",
          "Solo puede utilizarse cuando el límite inicial ya es finito",
        ],
        `La regla de L'Hôpital se utiliza, bajo sus hipótesis de derivabilidad, cuando un cociente produce una indeterminación de tipo 0/0 o ∞/∞.

Si:
lim f(x)/g(x)
presenta una de esas indeterminaciones, se estudia:
lim f'(x)/g'(x).

Si vuelve a aparecer una indeterminación admisible, la regla puede aplicarse de nuevo.`
      ),
      "b)": answer(
        "−2",
        ["2", "−1/2", "0"],
        `Sustituimos x=0:
(e⁰−1)/(cos 0−1)=0/0.

Aplicamos L'Hôpital:
lim(x→0) [2x·e^(x²)]/(−sen x).

Al sustituir vuelve a aparecer 0/0. Aplicamos L'Hôpital otra vez:
lim(x→0) [2e^(x²)+4x²e^(x²)]/(−cos x).

Ahora sustituimos x=0:
[2·1+0]/(−1)=−2.

Resultado: el límite vale −2.`
      ),
    },
    "mates2-analisis-1c34bb5dcd34": {
      "Resultado": answer(
        "60 m, 100 m y 120 m",
        ["40 m, 120 m y 160 m", "70 m, 70 m y 140 m", "80 m, 80 m y 120 m"],
        `Sea x el lado del campo cuadrado más pequeño. El mayor tiene lado 2x. Llamamos y al lado del tercero.

Como cada campo se cerca por separado y hay 1120 m:
4x+4(2x)+4y=1120.

Simplificamos:
12x+4y=1120
⇒ 3x+y=280
⇒ y=280−3x.

La superficie total es:
S(x)=x²+(2x)²+(280−3x)²
=14x²−1680x+78400.

Derivamos:
S'(x)=28x−1680.

S'(x)=0
⇒ 28x=1680
⇒ x=60.

Como S''(x)=28>0, la superficie es mínima.

Los lados son:
x=60,
y=280−3·60=100,
2x=120.

Resultado: 60 m, 100 m y 120 m.`
      ),
    },
    "mates2-analisis-4b615b77c2be": {
      "Resultado": answer(
        "P(x)=5x²/4−5x/2+1",
        [
          "P(x)=x²−2x+1",
          "P(x)=−5x²/4+5x/2+1",
          "P(x)=5x²/2−5x+1",
        ],
        `Escribimos:
P(x)=ax²+bx+c.

De P(0)=1 obtenemos:
c=1.

De P(2)=1:
4a+2b+1=1
⇒ 4a+2b=0
⇒ 2a+b=0.

La condición integral es:
∫₀²P(x) dx=1/3.

Sustituimos el polinomio:
∫₀²(ax²+bx+1) dx
=[ax³/3+bx²/2+x]₀²
=8a/3+2b+2
=1/3.

Reunimos las dos ecuaciones:
2a+b=0,
8a/3+2b=−5/3.

De la primera, b=−2a. Sustituimos:
8a/3−4a=−5/3
⇒ −4a/3=−5/3
⇒ a=5/4.

Entonces:
b=−5/2,
c=1.

Resultado: P(x)=5x²/4−5x/2+1.`
      ),
    },
    "mates2-analisis-8223e6a650c0": {
      "a)": answer(
        "Asíntota vertical x=0 y asíntota oblicua y=x",
        [
          "Asíntota vertical x=1 y horizontal y=0",
          "Solo tiene la asíntota y=x+1",
          "Asíntotas x=−1 e y=1",
        ],
        `Escribimos:
f(x)=(x²+1)/x=x+1/x,
con dominio ℝ\\{0}.

Asíntota vertical:
cuando x→0, el término 1/x diverge, por lo que x=0 es asíntota vertical.

Asíntota oblicua:
f(x)−x=1/x.

Como 1/x→0 cuando x→±∞, la recta y=x es asíntota oblicua.

Resultado: x=0 e y=x.`
      ),
      "b)": answer(
        "Crece en (−∞,−1) y (1,∞); decrece en (−1,0) y (0,1); máximo (−1,−2) y mínimo (1,2)",
        [
          "Crece en todo su dominio y no tiene extremos",
          "Decrece en (−∞,0) y crece en (0,∞), sin extremos",
          "Máximo en (1,2) y mínimo en (−1,−2)",
        ],
        `Derivamos:
f'(x)=1−1/x²
=(x²−1)/x².

Se anula en x=−1 y x=1. El valor x=0 no pertenece al dominio.

Recta de signos de f':
• En (−∞,−1), tomamos x=−2: f'(−2)>0, luego crece.
• En (−1,0), tomamos x=−1/2: f'(−1/2)<0, luego decrece.
• En (0,1), tomamos x=1/2: f'(1/2)<0, luego decrece.
• En (1,∞), tomamos x=2: f'(2)>0, luego crece.

En x=−1 cambia de + a −: máximo relativo.
f(−1)=−1−1=−2.

En x=1 cambia de − a +: mínimo relativo.
f(1)=1+1=2.

Resultado: máximo (−1,−2) y mínimo (1,2), con los intervalos indicados.`
      ),
      "c)": answer(
        "Cóncava hacia abajo en (−∞,0), convexa hacia arriba en (0,∞) y sin puntos de inflexión",
        [
          "Convexa en todo su dominio",
          "Tiene un punto de inflexión en (0,0)",
          "Cóncava hacia arriba en (−∞,0) y hacia abajo en (0,∞)",
        ],
        `Calculamos la segunda derivada:
f''(x)=2/x³.

Estudiamos su signo:
• Si x<0, f''(x)<0: la gráfica es cóncava hacia abajo.
• Si x>0, f''(x)>0: la gráfica es convexa hacia arriba.

La curvatura cambia al atravesar x=0, pero x=0 no pertenece al dominio. Por tanto, no existe punto de inflexión.

Resultado: cóncava hacia abajo en (−∞,0), convexa hacia arriba en (0,∞), sin puntos de inflexión.`
      ),
      "d)": answer(
        "Dos ramas separadas por x=0, con asíntota y=x, máximo (−1,−2) y mínimo (1,2)",
        [
          "Una parábola con vértice en (0,1)",
          "Una sola rama creciente que corta ambos ejes",
          "Dos rectas paralelas sin extremos",
        ],
        `Reunimos toda la información:
• dominio: ℝ\\{0};
• asíntota vertical: x=0;
• asíntota oblicua: y=x;
• máximo relativo: (−1,−2);
• mínimo relativo: (1,2);
• curvatura negativa a la izquierda de 0 y positiva a la derecha.

Además, f es impar:
f(−x)=−f(x),
por lo que la gráfica es simétrica respecto del origen.

La rama izquierda se aproxima a y=x cuando x→−∞, alcanza el máximo (−1,−2) y baja hacia −∞ al acercarse a 0 por la izquierda.

La rama derecha baja desde +∞ al acercarse a 0 por la derecha, alcanza el mínimo (1,2) y se aproxima a y=x cuando x→+∞.`
      ),
    },
    "mates2-geometria-d0f9e5056e6f": {
      "a)": answer(
        "Son paralelos porque el vector director de r es perpendicular al vector normal de π",
        [
          "Son secantes porque tienen un único punto común",
          "Son perpendiculares",
          "La recta está contenida en el plano",
        ],
        `Tomamos z=t en la recta r:
x+2t=3 ⇒ x=3−2t,
y+4t=5 ⇒ y=5−4t.

Por tanto:
r: (x,y,z)=(3,5,0)+t(−2,−4,1).

Un vector director de r es:
v⃗=(−2,−4,1).

El vector normal del plano π: 3x−y+2z=1 es:
n⃗=(3,−1,2).

Calculamos el producto escalar:
v⃗·n⃗=(−2)·3+(−4)·(−1)+1·2
=−6+4+2
=0.

Como el vector director de r es perpendicular al normal del plano, r es paralela a π.`
      ),
      "b)": answer(
        "3/√14 unidades",
        ["1/√14 unidades", "3/14 unidades", "√14 unidades"],
        `Como r y π son paralelos, la distancia entre ambos es la distancia de cualquier punto de r al plano.

Tomamos P=(3,5,0), que corresponde a t=0.

Escribimos el plano como:
3x−y+2z−1=0.

Aplicamos la fórmula:
d(P,π)=|3·3−5+2·0−1|/√(3²+(−1)²+2²)
=|9−5−1|/√14
=3/√14.

Resultado: d(r,π)=3/√14 unidades.`
      ),
      "c)": answer(
        "Por ejemplo, l₁:(1/3,0,0)+t(−2,−4,1) y l₂:(0,−1,0)+t(−2,−4,1)",
        [
          "l₁:(0,0,0)+t(3,−1,2) y l₂:(1,1,1)+t(3,−1,2)",
          "Solo existe una recta de π paralela a r",
          "l₁:(3,5,0)+t(−2,−4,1) y l₂:r",
        ],
        `Toda recta paralela a r debe tener como vector director:
v⃗=(−2,−4,1).

Necesitamos dos puntos distintos del plano π: 3x−y+2z=1.

Si y=0 y z=0:
3x=1 ⇒ P₁=(1/3,0,0).

Si x=0 y z=0:
−y=1 ⇒ P₂=(0,−1,0).

Construimos:
l₁: (x,y,z)=(1/3,0,0)+t(−2,−4,1),
l₂: (x,y,z)=(0,−1,0)+s(−2,−4,1).

Ambas están contenidas en π porque sus puntos pertenecen al plano y su dirección es perpendicular al normal de π. Además son distintas porque P₂ no pertenece a l₁.`
      ),
    },
    "mates2-geometria-d0f9e5056e6f-opcion-b": {
      "a)": answer(
        "4/3 unidades cúbicas",
        ["8 unidades cúbicas", "2/3 unidades cúbicas", "4 unidades cúbicas"],
        `Tomamos:
A=(2,0,0), B=(0,2,0), C=(2,2,1), D=(1,1,2).

Vectores con origen en A:
AB⃗=(−2,2,0),
AC⃗=(0,2,1),
AD⃗=(−1,1,2).

El volumen del tetraedro es:
V=|det(AB⃗,AC⃗,AD⃗)|/6.

El determinante vale −8, por lo que:
V=|−8|/6
=8/6
=4/3.

Resultado: 4/3 unidades cúbicas.`
      ),
      "b)": answer(
        "β: x+y−2z+2=0",
        [
          "β: x+y−2z−2=0",
          "β: x+y+z−4=0",
          "β: 3x+y−2z=0",
        ],
        `Calculamos dos vectores del plano ABC:
AB⃗=(−2,2,0),
AC⃗=(0,2,1).

Un vector normal es:
n⃗=AB⃗×AC⃗=(2,2,−4),
que podemos simplificar como:
n⃗=(1,1,−2).

El plano ABC es:
x+y−2z−2=0,
pues A, B y C lo verifican.

El plano β debe ser paralelo, por lo que tiene el mismo normal, y pasa por D=(1,1,2):
(x−1)+(y−1)−2(z−2)=0.

Simplificamos:
β: x+y−2z+2=0.

Resultado: β: x+y−2z+2=0.`
      ),
    },
    "mates2-geometria-17c18a82fc49": {
      "Resultado": answer(
        "1/(2√30) unidades",
        ["1/√30 unidades", "1/2 unidad", "√30/2 unidades"],
        `El plano π₂ está dado por:
(x,y,z)=λ(2,1,1)+μ(3,1,−1).

Sus vectores directores son:
u⃗=(2,1,1),
v⃗=(3,1,−1).

Un vector normal es:
u⃗×v⃗=(−2,5,−1),
equivalente a (2,−5,1).

Como π₂ pasa por el origen:
π₂: 2x−5y+z=0.

Dividimos la ecuación de π₁ entre 2:
π₁: 2x−5y+z=−1/2.

Los planos son paralelos. Su distancia es:
d=|0−(−1/2)|/√(2²+(−5)²+1²)
=(1/2)/√30
=1/(2√30).

Resultado: 1/(2√30) unidades.`
      ),
    },
    "mates2-geometria-17c18a82fc49-opcion-b": {
      "a)": answer(
        "45°",
        ["30°", "60°", "90°"],
        `Un vector director de r es:
AB⃗=(−4−2,−2−1,0−0)=(−6,−3,0)∼(2,1,0).

El vector director de s es:
v⃗=(1,3,0).

El ángulo entre rectas es el ángulo agudo entre sus vectores:
cos α=|u⃗·v⃗|/(|u⃗|·|v⃗|)
=|2·1+1·3|/(√5·√10)
=5/√50
=1/√2.

Por tanto:
α=45°.`
      ),
      "b)": answer(
        "5 unidades",
        ["1 unidad", "√5 unidades", "10 unidades"],
        `Las dos rectas tienen vectores directores con tercera coordenada cero. La recta r está contenida en el plano z=0 y s en el plano z=5.

Sus proyecciones sobre el plano OXY no son paralelas, pues (2,1) y (1,3) no son proporcionales. Por tanto, esas proyecciones se cortan.

En el punto de corte de las proyecciones, el segmento que une ambas rectas es vertical:
w⃗=(0,0,5).

Este vector es perpendicular a los dos vectores directores:
(0,0,5)·(2,1,0)=0,
(0,0,5)·(1,3,0)=0.

La distancia es la longitud de ese segmento:
d=|(0,0,5)|=5.

Resultado: d(r,s)=5 unidades.`
      ),
    },
    "mates2-geometria-c92fd29e11d8": {
      "Resultado": answer(
        "Nunca son paralelas y se cortan únicamente para a=2, en (5,2,1)",
        [
          "Son paralelas para a=2 y nunca se cortan",
          "Se cortan para cualquier a",
          "Son paralelas para a=−1 y se cortan para a=3",
        ],
        `Para rₐ, los planos tienen normales (1,−a,0) y (0,1,−1). Un vector director es:
u⃗=(a,1,1).

Para s, los normales son (1,−2,−1) y (1,1,1). Un vector director es:
v⃗=(−1,−2,3).

Si fueran paralelas, existiría k tal que:
(a,1,1)=k(−1,−2,3).

De la segunda coordenada, k=−1/2; de la tercera, k=1/3. Es imposible. Luego nunca son paralelas.

Buscamos ahora el punto de corte. De las ecuaciones de s:
x−2y−z=0,
x+y+z=8.

Obtenemos:
y=2x−8,
z=16−3x.

Imponemos y−z=1, ecuación de rₐ:
(2x−8)−(16−3x)=1
⇒ 5x=25
⇒ x=5.

Entonces:
y=2,
z=1.

Usamos x−ay=1:
5−2a=1
⇒ a=2.

Resultado: solo se cortan para a=2, en el punto (5,2,1).`
      ),
    },
    "mates2-geometria-fc0892b0e4b5": {
      "Resultado": answer(
        "r:(x,y,z)=(2,−1,3)+t(4,5,7); volumen 5/2",
        [
          "r:(x,y,z)=(2,−1,3)+t(1,1,1); volumen 5",
          "r:(x,y,z)=(1,1,0)+t(4,5,7); volumen 15",
          "r:(x,y,z)=(2,−1,3)+t(−4,5,−7); volumen 3/2",
        ],
        `Tomamos B=(1,1,0), C=(0,−1,2) y D=(−2,2,1).

Vectores del plano:
BC⃗=(−1,−2,2),
BD⃗=(−3,1,1).

Un vector normal es:
n⃗=BC⃗×BD⃗=(−4,−5,−7)∼(4,5,7).

La recta perpendicular al plano que pasa por A=(2,−1,3) tiene ese vector director:
r:
x=2+4t,
y=−1+5t,
z=3+7t.

Para el volumen usamos los vectores con origen en A:
AB⃗=(−1,2,−3),
AC⃗=(−2,0,−1),
AD⃗=(−4,3,−2).

V=|det(AB⃗,AC⃗,AD⃗)|/6
=|15|/6
=5/2.

Resultado: r:(x,y,z)=(2,−1,3)+t(4,5,7) y V=5/2.`
      ),
    },
    "mates2-geometria-6fe866bcef0c": {
      "a)": answer(
        "s:(x,y,z)=(2,−1,0)+λ(−2,0,−1)",
        [
          "s:(x,y,z)=(2,−1,0)+λ(1,1,−2)",
          "s:(x,y,z)=(0,−1,−1)+λ(1,1,−2)",
          "s:(x,y,z)=(2,−1,0)+λ(2,0,1) sin restricción",
        ],
        `Parametrizamos r. Tomamos x=t. De x−y=1:
y=t−1.

De 3x−y+z=0:
3t−(t−1)+z=0
⇒ z=−2t−1.

Así:
r:(x,y,z)=(0,−1,−1)+t(1,1,−2).

Sea O=r(t). Para que PO sea perpendicular a r:
[P−O]·(1,1,−2)=0.

P=(2,−1,0) y O=(t,t−1,−2t−1), luego:
(2−t,−t,2t+1)·(1,1,−2)=0
⇒ 2−t−t−4t−2=0
⇒ −6t=0
⇒ t=0.

O=(0,−1,−1).

Un vector de s es:
PO⃗=O−P=(−2,0,−1).

Resultado:
s:(x,y,z)=(2,−1,0)+λ(−2,0,−1).`
      ),
      "b)": answer(
        "O=(0,−1,−1)",
        ["O=(2,−1,0)", "O=(1,0,−1)", "O=(0,1,1)"],
        `En el apartado anterior impusimos la perpendicularidad y obtuvimos t=0 en la parametrización de r:
r(t)=(t,t−1,−2t−1).

Por tanto:
O=r(0)=(0,−1,−1).

Comprobación: O también pertenece a s para λ=1.`
      ),
      "c)": answer(
        "P'=(-2,−1,−2)",
        ["P'=(0,−1,−1)", "P'=(−2,1,−2)", "P'=(2,−1,0)"],
        `El punto O es el punto medio de P y su simétrico P':
O=(P+P')/2.

Despejamos:
P'=2O−P.

Sustituimos O=(0,−1,−1) y P=(2,−1,0):
P'=2(0,−1,−1)−(2,−1,0)
=(0,−2,−2)−(2,−1,0)
=(−2,−1,−2).

Resultado: P'=(−2,−1,−2).`
      ),
    },
    "mates2-geometria-1768736a1cdb": {
      "a)": answer(
        "k=1",
        ["k=0", "k=2", "k=−1"],
        `Tomamos:
A=(1,0,1), B=(1,1,0), C=(0,1,1), D=(1,k,k−1).

Vectores con origen en A:
AB⃗=(0,1,−1),
AC⃗=(−1,1,0),
AD⃗=(0,k,k−2).

Los cuatro puntos son coplanarios cuando:
det(AB⃗,AC⃗,AD⃗)=0.

El determinante vale:
2k−2.

Igualamos:
2k−2=0
⇒ k=1.

Resultado: k=1.`
      ),
      "b)": answer(
        "k=91 o k=−89",
        ["k=31 o k=−29", "k=90 o k=−90", "k=16 o k=−14"],
        `El volumen del tetraedro es:
V=|det(AB⃗,AC⃗,AD⃗)|/6.

Como el determinante es 2k−2:
V=|2k−2|/6
=|k−1|/3.

Imponemos V=30:
|k−1|/3=30
⇒ |k−1|=90.

Resolvemos los dos casos:
k−1=90 ⇒ k=91,
k−1=−90 ⇒ k=−89.

Resultado: k=91 o k=−89.`
      ),
    },
  });
})();

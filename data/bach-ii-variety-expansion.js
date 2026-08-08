// Ampliación revisada de los bancos oficiales de 2.º de Bachillerato.
// Los enunciados y la notación visual se toman del banco importado; aquí solo
// se incorporan opciones y resoluciones comprobadas para poder publicarlos.
(() => {
  const rawText = (paragraphs) => (paragraphs || [])
    .map((paragraph) => paragraph?.plain || "")
    .filter((value) => String(value).trim())
    .join("\n");
  const rawHtml = (paragraphs) => (paragraphs || [])
    .map((paragraph) => `<p>${paragraph?.html || paragraph?.plain || ""}</p>`)
    .filter((value) => value !== "<p></p>")
    .join("");
  const cleanLabel = (value, label) => String(value || "")
    .replace(new RegExp(`^\\s*${String(label || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`, "i"), "")
    .trim();
  const partPayload = (part, authored) => {
    const text = rawText(part?.paragraphs);
    const html = (part?.paragraphs || []).map((paragraph) => paragraph?.html || paragraph?.plain || "").join("<br>");
    return {
      label: part?.label || "Resultado",
      text: cleanLabel(text, part?.label),
      html: cleanLabel(html, part?.label),
      ...authored
    };
  };
  const findExercise = (bank, predicate) => (bank || []).find((exercise) => predicate(
    `${rawText(exercise?.statement)}\n${(exercise?.parts || []).map((part) => rawText(part.paragraphs)).join("\n")}`
  ));
  const makeQuestion = ({ id, blockId, exercise, statement, parts }) => exercise ? {
    id,
    rawBaseId: `${id}|${exercise.source}|${rawText(statement || exercise.statement)}`,
    source: exercise.source,
    blockId,
    text: rawText(statement || exercise.statement),
    statementHtml: rawHtml(statement || exercise.statement),
    parts,
    type: "corrected-official-exercise"
  } : null;

  window.MATES_II_EXTRA_BLOCK_QUESTIONS = window.MATES_II_EXTRA_BLOCK_QUESTIONS || {};
  const matesBanks = window.MATES_II_BLOCK_EXERCISES || {};

  const matrices2026 = findExercise(
    matesBanks.algebra,
    (text) => /Pregunta 3\.[\s\S]*matrices A y B cumplan que A·B=I/i.test(text)
  );
  const matrices2026Question = makeQuestion({
    id: "mates2-algebra-ampliacion-matrices-junio-2026",
    blockId: "algebra",
    exercise: matrices2026,
    parts: [
      partPayload(matrices2026?.parts?.[0], {
        options: [
          "a=1 y b=2.",
          "a=2 y b=1.",
          "a=1 y b=1.",
          "a=-1 y b=2."
        ],
        correct: 0,
        solution: `Resolución:
1. Multiplicamos las matrices A y B y exigimos que el resultado sea la identidad:
A·B=[[2-a,a-1,0],[0,1,0],[2-b,0,b-1]].
2. Igualamos los elementos correspondientes con:
I=[[1,0,0],[0,1,0],[0,0,1]].
3. De la primera fila obtenemos:
2-a=1 y a-1=0.
Las dos ecuaciones dan a=1.
4. De la tercera fila obtenemos:
2-b=0 y b-1=1.
Las dos ecuaciones dan b=2.
5. Sustituimos a=1 y b=2 en A y comprobamos que A·B=I.
Resultado final: a=1 y b=2.`
      }),
      partPayload(matrices2026?.parts?.[1], {
        options: [
          "X=[[-1,-1],[-1,0]] e Y=[[2,1],[3,3]].",
          "X=[[2,1],[3,3]] e Y=[[-1,-1],[-1,0]].",
          "X=[[1,0],[2,3]] e Y=[[2,1],[3,3]].",
          "X=[[-2,-1],[-3,-3]] e Y=[[1,1],[1,0]]."
        ],
        correct: 0,
        solution: `Resolución:
1. Escribimos el sistema matricial:
X+Y=[[1,0],[2,3]],
2X+3Y=[[4,1],[7,9]].
2. Multiplicamos la primera ecuación por 2:
2X+2Y=[[2,0],[4,6]].
3. Restamos esta igualdad a la segunda ecuación:
Y=[[4,1],[7,9]]-[[2,0],[4,6]]=[[2,1],[3,3]].
4. Sustituimos Y en la primera ecuación:
X=[[1,0],[2,3]]-[[2,1],[3,3]]=[[-1,-1],[-1,0]].
5. Comprobamos ambos resultados en las dos ecuaciones originales.
Resultado final: X=[[-1,-1],[-1,0]] e Y=[[2,1],[3,3]].`
      })
    ]
  });

  const antibiotic2026 = findExercise(
    matesBanks.analisis,
    (text) => /toma de un antibiótico vía oral/i.test(text)
  );
  const antibiotic2026Question = makeQuestion({
    id: "mates2-analisis-ampliacion-antibiotico-julio-2026",
    blockId: "analisis",
    exercise: antibiotic2026,
    parts: [
      partPayload(antibiotic2026?.parts?.[0], {
        options: [
          "A las 2 horas; la concentración máxima es 3 mg/l.",
          "A las 4 horas; la concentración máxima es 2,4 mg/l.",
          "A la hora; la concentración máxima es 12/5 mg/l.",
          "A las 6 horas; la concentración máxima es 9/5 mg/l."
        ],
        correct: 0,
        solution: `Resolución:
1. La concentración es C(t)=frac{12t}{t²+4}, con t≥0.
2. Derivamos mediante la regla del cociente:
C'(t)=frac{12(t²+4)-12t·2t}{(t²+4)²}
=frac{12(4-t²)}{(t²+4)²}.
3. El denominador es siempre positivo. Igualamos el numerador a cero:
4-t²=0 ⇒ t=2 o t=-2.
Como t≥0, solo admitimos t=2.
4. Estudiamos el signo de C'(t) en la recta real:
si 0<t<2, C'(t)>0 y C crece;
si t>2, C'(t)<0 y C decrece.
Por tanto, en t=2 hay un máximo.
5. Calculamos la concentración:
C(2)=frac{12·2}{2²+4}=frac{24}{8}=3.
Resultado final: la concentración es máxima a las 2 horas y vale 3 mg/l.`
      }),
      partPayload(antibiotic2026?.parts?.[1], {
        options: [
          "ln 10 mg/l.",
          "2 ln 10 mg/l.",
          "ln 5 mg/l.",
          "3 mg/l."
        ],
        correct: 0,
        solution: `Resolución:
1. Aplicamos la fórmula de la concentración media en [0,6]:
C_media=frac{1}{6-0}·∫_0^6 frac{12t}{t²+4} dt.
2. Calculamos una primitiva. Tomamos u=t²+4, de modo que du=2t dt:
∫frac{12t}{t²+4}dt=6∫frac{1}{u}du=6 ln|u|+C
=6 ln(t²+4)+C.
3. Aplicamos la regla de Barrow:
C_media=frac{1}{6}·[6 ln(t²+4)]_0^6
=ln(40)-ln(4)
=ln paren{frac{40}{4}}
=ln 10.
Resultado final: la concentración media entre 0 y 6 horas es ln 10 mg/l.`
      })
    ]
  });

  const perpendicularLine2024 = findExercise(
    matesBanks.geometria,
    (text) => /recta que contiene al punto A\(1,0,0\)[\s\S]*perpendicular a los vectores/i.test(text)
  );
  const perpendicularLineQuestion = makeQuestion({
    id: "mates2-geometria-ampliacion-recta-junio-2024",
    blockId: "geometria",
    exercise: perpendicularLine2024,
    parts: [{
      label: "Resultado",
      text: "Selecciona la ecuación correcta de la recta.",
      html: "Selecciona la ecuación correcta de la recta.",
      options: [
        "r:{x=1; y=t; z=-2t}.",
        "r:{x=1+t; y=2t; z=t}.",
        "r:{x=t; y=1+t; z=-2t}.",
        "r:{x=1; y=2t; z=t}."
      ],
      correct: 0,
      solution: `Resolución:
1. La recta debe pasar por A=(1,0,0).
2. Su vector director debe ser perpendicular a vector{u}=(1,2,1) y a vector{v}=(1,0,0). Lo calculamos mediante el producto vectorial:
vector{d}=vector{u}×vector{v}=(0,1,-2).
3. Comprobamos:
vector{d}·vector{u}=0·1+1·2+(-2)·1=0,
vector{d}·vector{v}=0·1+1·0+(-2)·0=0.
4. Escribimos la recta en forma paramétrica:
r:{x=1+0t; y=0+t; z=0-2t}.
Resultado final: r:{x=1; y=t; z=-2t}.`
    }]
  });

  const photocopiers2025 = findExercise(
    matesBanks["probabilidad-estadistica"],
    (text) => /tres fotocopiadoras A, B y C/i.test(text)
  );
  const photocopiersStatement = photocopiers2025?.statement?.slice(0, 2);
  const photocopiersQuestion = makeQuestion({
    id: "mates2-probabilidad-ampliacion-fotocopiadoras-julio-2025",
    blockId: "probabilidad-estadistica",
    exercise: photocopiers2025,
    statement: photocopiersStatement,
    parts: [
      partPayload({
        ...photocopiers2025?.parts?.[0],
        paragraphs: photocopiers2025?.parts?.[0]?.paragraphs?.slice(0, 1)
      }, {
        options: ["0,96.", "0,04.", "0,95.", "0,97."],
        correct: 0,
        solution: `Resolución:
1. Como el estudiante elige una fotocopiadora al azar:
P(A)=P(B)=P(C)=frac{1}{3}.
2. Las probabilidades de no tener fallo son:
P(F̄|A)=0,97, P(F̄|B)=0,95 y P(F̄|C)=0,96.
3. Aplicamos el teorema de la probabilidad total:
P(F̄)=frac{1}{3}·0,97+frac{1}{3}·0,95+frac{1}{3}·0,96
=frac{2,88}{3}=0,96.
Resultado final: la probabilidad de fotocopiar sin fallos es 0,96.`
      }),
      partPayload({
        ...photocopiers2025?.parts?.[1],
        paragraphs: photocopiers2025?.parts?.[1]?.paragraphs?.slice(0, 1)
      }, {
        options: ["frac{5}{12}≈0,4167.", "frac{1}{3}≈0,3333.", "frac{3}{8}=0,375.", "frac{1}{2}=0,5."],
        correct: 0,
        solution: `Resolución:
1. Calculamos primero la probabilidad total de fallo:
P(F)=frac{1}{3}·0,03+frac{1}{3}·0,05+frac{1}{3}·0,04
=frac{0,12}{3}=0,04.
2. Aplicamos el teorema de Bayes:
P(B|F)=frac{P(B)·P(F|B)}{P(F)}
=frac{frac{1}{3}·0,05}{0,04}
=frac{0,05}{0,12}
=frac{5}{12}.
Resultado final: P(B|F)=frac{5}{12}≈0,4167.`
      })
    ]
  });

  const addMatesQuestion = (blockId, question) => {
    if (!question) return;
    const pool = window.MATES_II_EXTRA_BLOCK_QUESTIONS[blockId] || [];
    if (!pool.some((item) => item.id === question.id)) pool.push(question);
    window.MATES_II_EXTRA_BLOCK_QUESTIONS[blockId] = pool;
  };

  const selfInverseMatrix2024 = findExercise(
    matesBanks.algebra,
    (text) => /matriz A[\s\S]*su inversa sean iguales/i.test(text)
  );
  const selfInverseMatrixQuestion = makeQuestion({
    id: "mates2-algebra-ampliacion-inversa-junio-2024",
    blockId: "algebra",
    exercise: selfInverseMatrix2024,
    parts: [{
      label: "Resultado",
      text: "Selecciona el resultado correcto.",
      html: "Selecciona el resultado correcto.",
      options: [
        "Sí, para a=0.",
        "Sí, para a=1.",
        "Sí, para a=-1.",
        "No existe ningún valor real de a."
      ],
      correct: 0,
      solution: `Resolución:
1. La condición A=A⁻¹ equivale a A²=I.
2. Calculamos:
A²=[[a,1],[1,0]]·[[a,1],[1,0]]
=[[a²+1,a],[a,1]].
3. Igualamos con la matriz identidad:
[[a²+1,a],[a,1]]=[[1,0],[0,1]].
4. De los elementos no diagonales obtenemos a=0. Para este valor también se cumple a²+1=1.
5. Comprobamos:
A=[[0,1],[1,0]] y A²=I; por tanto, A=A⁻¹.
Resultado final: sí existe y el valor es a=0.`
    }]
  });

  const threePlanes2024 = findExercise(
    matesBanks.geometria,
    (text) => /posición relativa[\s\S]*π1[\s\S]*x\+y=1[\s\S]*π3[\s\S]*z=0/i.test(text)
  );
  const threePlanesQuestion = makeQuestion({
    id: "mates2-geometria-ampliacion-tres-planos-julio-2024",
    blockId: "geometria",
    exercise: threePlanes2024,
    parts: [{
      label: "Resultado",
      text: "Selecciona la posición relativa correcta.",
      html: "Selecciona la posición relativa correcta.",
      options: [
        "No tienen ningún punto común y se cortan dos a dos en rectas paralelas.",
        "Se cortan los tres en una única recta.",
        "Se cortan en un único punto.",
        "Los tres planos son paralelos."
      ],
      correct: 0,
      solution: `Resolución:
1. Los planos son:
π₁:x+y=1, π₂:x+y+z=2 y π₃:z=0.
2. Si un punto perteneciera a los tres planos, de π₃ obtendríamos z=0.
3. Al sustituir z=0 en π₂ resulta x+y=2, pero π₁ exige x+y=1. Es imposible; no existe un punto común a los tres.
4. Estudiamos las intersecciones por parejas:
π₁∩π₃:{x+y=1; z=0},
π₁∩π₂:{x+y=1; z=1},
π₂∩π₃:{x+y=2; z=0}.
5. Las tres intersecciones son rectas con vector director vector{d}=(1,-1,0), por lo que son paralelas.
Resultado final: no tienen punto común y se cortan dos a dos en rectas paralelas.`
    }]
  });

  const parallelLine2024 = findExercise(
    matesBanks.geometria,
    (text) => /recta que es paralela a la recta[\s\S]*contiene al punto A\(0,1,0\)/i.test(text)
  );
  const parallelLine2024Question = makeQuestion({
    id: "mates2-geometria-ampliacion-paralela-julio-2024",
    blockId: "geometria",
    exercise: parallelLine2024,
    parts: [{
      label: "Resultado",
      text: "Selecciona la ecuación correcta de la recta.",
      html: "Selecciona la ecuación correcta de la recta.",
      options: [
        "s:{x=t; y=1+t; z=t}.",
        "s:{x=1+t; y=1+t; z=2+t}.",
        "s:{x=t; y=1-t; z=t}.",
        "s:{x=0; y=1+t; z=t}."
      ],
      correct: 0,
      solution: `Resolución:
1. Leemos en la ecuación continua de la recta dada un vector director:
vector{d}=(1,1,1).
2. Toda recta paralela debe tener un vector director proporcional a vector{d}.
3. La recta pedida contiene al punto A=(0,1,0). Usamos la forma vectorial:
(x,y,z)=(0,1,0)+t(1,1,1).
4. Escribimos sus ecuaciones paramétricas:
s:{x=t; y=1+t; z=t}.
Resultado final: s:{x=t; y=1+t; z=t}.`
    }]
  });

  const pointPlaneDistance2023 = findExercise(
    matesBanks.geometria,
    (text) => /punto A[\s\S]*\(1,2,1\)[\s\S]*plano[\s\S]*x-y=1[\s\S]*distancia/i.test(text)
  );
  const pointPlaneDistanceQuestion = makeQuestion({
    id: "mates2-geometria-ampliacion-distancia-julio-2023",
    blockId: "geometria",
    exercise: pointPlaneDistance2023,
    parts: [{
      label: "Resultado",
      text: "Selecciona el resultado correcto.",
      html: "Selecciona el resultado correcto.",
      options: ["√2.", "2.", "frac{1}{√2}.", "2√2."],
      correct: 0,
      solution: `Resolución:
1. Escribimos el plano como π:x-y-1=0 y el punto A=(1,2,1).
2. Aplicamos la fórmula de la distancia de un punto a un plano:
d(A,π)=frac{|1·1+(-1)·2+0·1-1|}{√(1²+(-1)²+0²)}.
3. Operamos:
d(A,π)=frac{|-2|}{√2}=frac{2}{√2}=√2.
Resultado final: d(A,π)=√2.`
    }]
  });

  const vectorAngleJuly2023 = findExercise(
    matesBanks.geometria,
    (text) => /Calcula el ángulo que forman los vectores[\s\S]*\(1,1,1\)[\s\S]*\(3,2,3\)/i.test(text)
  );
  const vectorAngleJuly2023Question = makeQuestion({
    id: "mates2-geometria-ampliacion-angulo-vectores-julio-2023",
    blockId: "geometria",
    exercise: vectorAngleJuly2023,
    parts: [{
      label: "Resultado",
      text: "Selecciona el resultado correcto.",
      html: "Selecciona el resultado correcto.",
      options: [
        "α=arccos(8/√66).",
        "α=arccos(7/√66).",
        "α=60°.",
        "α=90°."
      ],
      correct: 0,
      solution: `Resolución:
1. Sean u⃗=(1,1,1) y v⃗=(3,2,3).
2. Calculamos el producto escalar:
u⃗·v⃗=1·3+1·2+1·3=8.
3. Calculamos los módulos:
|u⃗|=√(1²+1²+1²)=√3,
|v⃗|=√(3²+2²+3²)=√22.
4. Aplicamos la fórmula del ángulo entre dos vectores:
cos α=frac{u⃗·v⃗}{|u⃗|·|v⃗|}
=frac{8}{√3·√22}
=frac{8}{√66}.
5. Despejamos:
α=arccos(frac{8}{√66})≈10,0°.
Resultado final: α=arccos(frac{8}{√66}).`
    }]
  });

  const eventOperations2024 = findExercise(
    matesBanks["probabilidad-estadistica"],
    (text) => /dos sucesos[\s\S]*P\(A∩B\)=0,1[\s\S]*P\(A∪B\)=0,3/i.test(text)
  );
  const eventOperationsQuestion = makeQuestion({
    id: "mates2-probabilidad-ampliacion-sucesos-junio-2024",
    blockId: "probabilidad-estadistica",
    exercise: eventOperations2024,
    parts: [
      partPayload(eventOperations2024?.parts?.[0], {
        options: [
          "P(B)=0,2 y P(A∩B̄)=0,1.",
          "P(B)=0,3 y P(A∩B̄)=0,2.",
          "P(B)=0,1 y P(A∩B̄)=0,1.",
          "P(B)=0,2 y P(A∩B̄)=0,2."
        ],
        correct: 0,
        solution: `Resolución:
1. Aplicamos P(A∪B)=P(A)+P(B)-P(A∩B):
0,3=0,2+P(B)-0,1.
2. Despejamos P(B)=0,2.
3. Descomponemos A en dos sucesos incompatibles:
P(A)=P(A∩B)+P(A∩B̄).
4. Por tanto:
P(A∩B̄)=0,2-0,1=0,1.
Resultado final: P(B)=0,2 y P(A∩B̄)=0,1.`
      }),
      partPayload(eventOperations2024?.parts?.[1], {
        options: [
          "P(A|B)=frac{1}{2} y P(B|A)=frac{1}{2}.",
          "P(A|B)=frac{1}{3} y P(B|A)=frac{1}{2}.",
          "P(A|B)=frac{1}{2} y P(B|A)=frac{1}{3}.",
          "P(A|B)=1 y P(B|A)=1."
        ],
        correct: 0,
        solution: `Resolución:
1. Usamos la definición de probabilidad condicionada:
P(A|B)=frac{P(A∩B)}{P(B)}
=frac{0,1}{0,2}=frac{1}{2}.
2. Del mismo modo:
P(B|A)=frac{P(A∩B)}{P(A)}
=frac{0,1}{0,2}=frac{1}{2}.
Resultado final: P(A|B)=P(B|A)=frac{1}{2}.`
      })
    ]
  });

  const markedCards2024 = findExercise(
    matesBanks["probabilidad-estadistica"],
    (text) => /mazo hay 40 cartas[\s\S]*4 están marcadas solo con un punto verde/i.test(text)
  );
  const markedCardsQuestion = makeQuestion({
    id: "mates2-probabilidad-ampliacion-cartas-julio-2024",
    blockId: "probabilidad-estadistica",
    exercise: markedCards2024,
    parts: [
      partPayload(markedCards2024?.parts?.[0], {
        options: [
          "frac{11}{156}≈0,0705.",
          "frac{7}{40}=0,175.",
          "frac{11}{40}=0,275.",
          "frac{11}{160}=0,06875."
        ],
        correct: 0,
        solution: `Resolución:
1. Tienen punto verde las 4 cartas marcadas solo en verde y las 7 marcadas en verde y rojo:
4+7=11 cartas.
2. Extraemos dos cartas sin reemplazamiento:
P(V₁∩V₂)=frac{11}{40}·frac{10}{39}
=frac{110}{1560}
=frac{11}{156}.
Resultado final: P(V₁∩V₂)=frac{11}{156}≈0,0705.`
      }),
      partPayload(markedCards2024?.parts?.[1], {
        options: ["frac{7}{11}≈0,6364.", "frac{7}{12}≈0,5833.", "frac{11}{40}=0,275.", "frac{7}{40}=0,175."],
        correct: 0,
        solution: `Resolución:
1. Entre las 11 cartas que tienen punto verde, 7 tienen además punto rojo.
2. Aplicamos la probabilidad condicionada:
P(R|V)=frac{P(R∩V)}{P(V)}
=frac{7/40}{11/40}
=frac{7}{11}.
Resultado final: P(R|V)=frac{7}{11}≈0,6364.`
      })
    ]
  });

  const numberedBalls2023 = findExercise(
    matesBanks["probabilidad-estadistica"],
    (text) => /urna contiene cuatro bolas numeradas del 1 al 4/i.test(text)
  );
  const numberedBallsQuestion = makeQuestion({
    id: "mates2-probabilidad-ampliacion-bolas-junio-2023",
    blockId: "probabilidad-estadistica",
    exercise: numberedBalls2023,
    parts: [
      partPayload(numberedBalls2023?.parts?.[0], {
        options: ["frac{1}{6}.", "frac{1}{4}.", "frac{1}{3}.", "frac{1}{12}."],
        correct: 0,
        solution: `Resolución:
1. Las parejas no ordenadas posibles son:
{1,2}, {1,3}, {1,4}, {2,3}, {2,4}, {3,4}.
Son 6 resultados equiprobables.
2. Solo la pareja {1,2} suma 3.
Resultado final: P(S=3)=frac{1}{6}.`
      }),
      partPayload(numberedBalls2023?.parts?.[1], {
        options: ["frac{5}{6}.", "frac{2}{3}.", "frac{1}{2}.", "frac{1}{6}."],
        correct: 0,
        solution: `Resolución:
1. De las 6 parejas posibles, únicamente {1,2} no tiene suma mayor que 3.
2. Las otras cinco parejas tienen suma 4, 5, 5, 6 y 7.
Resultado final: P(S>3)=frac{5}{6}.`
      })
    ]
  });

  const benceno2022 = findExercise(
    matesBanks["probabilidad-estadistica"],
    (text) => /EVAU club de futbol[\s\S]*probabilidad del 90%[\s\S]*Benceno/i.test(text)
  );
  const benceno2022Question = makeQuestion({
    id: "mates2-probabilidad-ampliacion-benceno-junio-2022",
    blockId: "probabilidad-estadistica",
    exercise: benceno2022,
    parts: [
      partPayload(benceno2022?.parts?.[0], {
        options: ["0,84.", "0,72.", "0,60.", "0,78."],
        correct: 0,
        solution: `Resolución:
1. Sean B: «Benceno juega» y G: «el EVAU C.F. gana».
2. Escribimos los datos:
P(B)=0,80, P(B̄)=0,20,
P(G|B)=0,90 y P(G|B̄)=0,60.
3. Aplicamos el teorema de la probabilidad total:
P(G)=P(B)·P(G|B)+P(B̄)·P(G|B̄).
4. Sustituimos:
P(G)=0,80·0,90+0,20·0,60
=0,72+0,12
=0,84.
Resultado final: la probabilidad de que el EVAU C.F. gane un partido cualquiera es 0,84.`
      }),
      partPayload(benceno2022?.parts?.[1], {
        options: ["frac{6}{7}≈0,8571.", "frac{5}{6}≈0,8333.", "0,72.", "0,90."],
        correct: 0,
        solution: `Resolución:
1. Se pide la probabilidad de que Benceno haya jugado sabiendo que el equipo ha ganado:
P(B|G).
2. Aplicamos el teorema de Bayes:
P(B|G)=frac{P(B∩G)}{P(G)}
=frac{P(B)·P(G|B)}{P(G)}.
3. Sustituimos P(G)=0,84, calculada en el apartado anterior:
P(B|G)=frac{0,80·0,90}{0,84}
=frac{0,72}{0,84}
=frac{6}{7}
≈0,8571.
Resultado final: la probabilidad de que Benceno haya jugado es frac{6}{7}≈0,8571.`
      })
    ]
  });

  const determinantPowers2024 = findExercise(
    matesBanks.algebra,
    (text) => /Calcula el determinante de A y de A·A[\s\S]*producto de n veces A/i.test(text)
  );
  const determinantPowers2024Question = makeQuestion({
    id: "mates2-algebra-ampliacion-potencias-determinante-julio-2024",
    blockId: "algebra",
    exercise: determinantPowers2024,
    parts: [{
      label: "Resultado",
      text: "Selecciona el resultado correcto.",
      html: "Selecciona el resultado correcto.",
      options: [
        "det(A)=a, det(A·A)=a² y det(Aⁿ)=aⁿ.",
        "det(A)=a, det(A·A)=2a y det(Aⁿ)=na.",
        "det(A)=1, det(A·A)=a y det(Aⁿ)=aⁿ.",
        "det(A)=a², det(A·A)=a⁴ y det(Aⁿ)=a²ⁿ."
      ],
      correct: 0,
      solution: `Resolución:
1. La matriz es triangular:
A=[[a,2],[0,1]].
El determinante de una matriz triangular es el producto de los elementos de su diagonal:
det(A)=a·1=a.
2. Aplicamos la propiedad del determinante de un producto:
det(A·A)=det(A)·det(A)=a·a=a².
3. El producto de n veces la matriz A es Aⁿ. Aplicando repetidamente la misma propiedad:
det(Aⁿ)=det(A)ⁿ=aⁿ.
Resultado final: det(A)=a, det(A·A)=a² y det(Aⁿ)=aⁿ.`
    }]
  });

  const exponentialLimit2024 = findExercise(
    matesBanks.analisis,
    (text) => /Calcula el siguiente límite:[\s\S]*x→\+∞[\s\S]*ex-1x2\+3/i.test(text)
  );
  const exponentialLimit2024Question = makeQuestion({
    id: "mates2-analisis-ampliacion-limite-exponencial-junio-2024",
    blockId: "analisis",
    exercise: exponentialLimit2024,
    parts: [{
      label: "Resultado",
      text: "Selecciona el resultado correcto.",
      html: "Selecciona el resultado correcto.",
      options: ["+∞.", "0.", "1.", "−∞."],
      correct: 0,
      solution: `Resolución mediante la regla de L'Hôpital:
1. Sustituimos x→+∞:
frac{eˣ-1}{x²+3} presenta la indeterminación frac{∞}{∞}.
2. Aplicamos L'Hôpital por primera vez:
lim_(x→+∞) frac{eˣ-1}{x²+3}
=lim_(x→+∞) frac{eˣ}{2x}.
Al sustituir vuelve a aparecer la indeterminación frac{∞}{∞}.
3. Aplicamos L'Hôpital por segunda vez:
lim_(x→+∞) frac{eˣ}{2x}
=lim_(x→+∞) frac{eˣ}{2}
=+∞.
Resultado final: el límite vale +∞.`
    }]
  });

  const roofBeam2024 = findExercise(
    matesBanks.geometria,
    (text) => /Carla está diseñando el tejado[\s\S]*placa metálica triangular/i.test(text)
  );
  const roofBeam2024Question = makeQuestion({
    id: "mates2-geometria-ampliacion-viga-junio-2024",
    blockId: "geometria",
    exercise: roofBeam2024,
    parts: [
      partPayload(roofBeam2024?.parts?.[0], {
        options: [
          "r:(x,y,z)=(2,-1,3)+t(-4,5,2).",
          "r:(x,y,z)=(2,-1,3)+t(4,-5,-2).",
          "r:(x,y,z)=(-2,4,5)+t(-4,5,2).",
          "r:(x,y,z)=(2,-1,3)+t(-2,3,1)."
        ],
        correct: 0,
        solution: `Resolución:
1. Tomamos A=(2,-1,3) y B=(-2,4,5).
2. Calculamos un vector director de la viga:
vector{AB}=B-A=(-2-2,4-(-1),5-3)=(-4,5,2).
3. Escribimos la recta en forma paramétrica:
r:{x=2-4t; y=-1+5t; z=3+2t}, con t∈R.
Resultado final: r:(x,y,z)=(2,-1,3)+t(-4,5,2).`
      }),
      partPayload(roofBeam2024?.parts?.[1], {
        options: ["3√5 unidades.", "5√3 unidades.", "√29 unidades.", "9 unidades."],
        correct: 0,
        solution: `Resolución:
1. La longitud de la viga es la distancia entre sus extremos:
d(A,B)=√((-2-2)²+(4-(-1))²+(5-3)²).
2. Sustituimos y operamos:
d(A,B)=√((-4)²+5²+2²)
=√(16+25+4)
=√45
=3√5.
Resultado final: la longitud de la viga es 3√5 unidades.`
      }),
      partPayload(roofBeam2024?.parts?.[2], {
        options: ["9 unidades cuadradas.", "18 unidades cuadradas.", "6√5 unidades cuadradas.", "frac{9}{2} unidades cuadradas."],
        correct: 0,
        solution: `Resolución:
1. Tomamos los vectores con origen en A:
vector{AB}=(-4,5,2),
vector{AC}=C-A=(0-2,0-(-1),1-3)=(-2,1,-2).
2. Calculamos el producto vectorial:
vector{AB}×vector{AC}=(-12,-12,6).
3. Calculamos su módulo:
|vector{AB}×vector{AC}|=√((-12)²+(-12)²+6²)
=√324
=18.
4. El área del triángulo es la mitad del área del paralelogramo:
Área=frac{1}{2}·18=9.
Resultado final: el área de la placa triangular es 9 unidades cuadradas.`
      })
    ]
  });

  const formulaOne2022 = findExercise(
    matesBanks["probabilidad-estadistica"],
    (text) => /piloto de Fórmula 1[\s\S]*próximas 4 carreras[\s\S]*al menos dos/i.test(text)
  );
  const formulaOne2022Question = makeQuestion({
    id: "mates2-probabilidad-ampliacion-formula-uno-julio-2022",
    blockId: "probabilidad-estadistica",
    exercise: formulaOne2022,
    parts: [{
      label: "Resultado",
      text: "Selecciona el resultado correcto.",
      html: "Selecciona el resultado correcto.",
      options: ["0,8208.", "0,4752.", "0,3456.", "0,1296."],
      correct: 0,
      solution: `Resolución:
1. Sea X el número de carreras ganadas. Como participa en 4 carreras y la probabilidad de ganar cada una es 0,6:
X sigue una distribución binomial B(4;0,6).
2. Se pide:
P(X≥2).
Calculamos por el suceso contrario:
P(X≥2)=1-P(X=0)-P(X=1).
3. Calculamos cada probabilidad:
P(X=0)=paren{4 sobre 0}·0,6⁰·0,4⁴=0,0256,
P(X=1)=paren{4 sobre 1}·0,6¹·0,4³=4·0,6·0,064=0,1536.
4. Restamos:
P(X≥2)=1-0,0256-0,1536=0,8208.
Resultado final: la probabilidad de que gane al menos dos carreras es 0,8208.`
    }]
  });

  const rankMatrixJune2024 = findExercise(
    matesBanks.algebra,
    (text) => /Ejercicio 4, apartado b\)[\s\S]*Estudia el rango de la matriz[\s\S]*10102021a101/i.test(text)
  );
  const rankMatrixJune2024Question = makeQuestion({
    id: "mates2-algebra-ampliacion-rango-matriz-junio-2024",
    blockId: "algebra",
    exercise: rankMatrixJune2024,
    parts: [{
      label: "Resultado",
      text: "Selecciona el resultado correcto.",
      html: "Selecciona el resultado correcto.",
      options: [
        "El rango de A es 3 para todo valor real de a.",
        "El rango de A es 2 para todo valor real de a.",
        "El rango de A es 2 si a=1 y 3 si a≠1.",
        "El rango de A es 1 si a=0 y 2 en los demás casos."
      ],
      correct: 0,
      solution: `Resolución:
1. La matriz tiene tres filas, por lo que su rango no puede ser mayor que 3.
2. Elegimos el menor de orden 3 formado por las columnas primera, segunda y cuarta:
|1  0  0;
 2  0  1;
 a  1  1|.
3. Desarrollamos el determinante por la primera fila:
D=1·|0  1;
     1  1|=1·(0·1-1·1)=-1.
4. Como D=-1≠0 para cualquier valor real de a, existe siempre un menor de orden 3 no nulo. Por tanto, rg(A)≥3.
5. Como A solo tiene tres filas, rg(A)≤3.
Resultado final: rg(A)=3 para todo a∈R.`
    }]
  });

  const determinantRowsJuly2024 = findExercise(
    matesBanks.algebra,
    (text) => /Ejercicio 7, apartado a\)[\s\S]*Sea el determinante[\s\S]*x\+ay\+bz\+c2a2b2c321/i.test(text)
  );
  const determinantRowsJuly2024Question = makeQuestion({
    id: "mates2-algebra-ampliacion-propiedades-determinantes-julio-2024",
    blockId: "algebra",
    exercise: determinantRowsJuly2024,
    parts: [{
      label: "Resultado",
      text: "Selecciona el resultado correcto.",
      html: "Selecciona el resultado correcto.",
      options: ["2.", "1.", "−2.", "0."],
      correct: 0,
      solution: `Resolución:
1. Llamamos D al determinante dado. Por el enunciado, D=1.
2. En el determinante pedido, la primera fila es F₁+F₂, la segunda es 2F₂ y la tercera es F₃.
3. Sacamos el factor 2 de la segunda fila:
D'=2·det(F₁+F₂,F₂,F₃).
4. Aplicamos la linealidad del determinante respecto de la primera fila:
D'=2·[det(F₁,F₂,F₃)+det(F₂,F₂,F₃)].
5. El segundo determinante vale 0 porque tiene dos filas iguales. Por tanto:
D'=2·(D+0)=2·1=2.
Resultado final: el determinante pedido vale 2.`
    }]
  });

  addMatesQuestion("algebra", matrices2026Question);
  addMatesQuestion("algebra", selfInverseMatrixQuestion);
  addMatesQuestion("algebra", determinantPowers2024Question);
  addMatesQuestion("algebra", rankMatrixJune2024Question);
  addMatesQuestion("algebra", determinantRowsJuly2024Question);
  addMatesQuestion("analisis", antibiotic2026Question);
  addMatesQuestion("analisis", exponentialLimit2024Question);
  addMatesQuestion("geometria", perpendicularLineQuestion);
  addMatesQuestion("geometria", threePlanesQuestion);
  addMatesQuestion("geometria", parallelLine2024Question);
  addMatesQuestion("geometria", pointPlaneDistanceQuestion);
  addMatesQuestion("geometria", vectorAngleJuly2023Question);
  addMatesQuestion("geometria", roofBeam2024Question);
  addMatesQuestion("probabilidad-estadistica", photocopiersQuestion);
  addMatesQuestion("probabilidad-estadistica", eventOperationsQuestion);
  addMatesQuestion("probabilidad-estadistica", markedCardsQuestion);
  addMatesQuestion("probabilidad-estadistica", numberedBallsQuestion);
  addMatesQuestion("probabilidad-estadistica", benceno2022Question);
  addMatesQuestion("probabilidad-estadistica", formulaOne2022Question);

  const ccssAnswers = window.CCSS_II_BLOCK_ANSWERS = window.CCSS_II_BLOCK_ANSWERS || {};
  Object.assign(ccssAnswers, {
    "ccss2-algebra-c7f1e8e27894": {
      "Resultado": {
        options: [
          "k=2.",
          "k=−2.",
          "k=4.",
          "Las matrices conmutan para cualquier valor de k."
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de
A=(3 −1; 1 2)
y
B=(−4 −2; k −6).
2. Para que conmuten debe cumplirse A·B=B·A.
3. Calculamos ambos productos:
A·B=(−12−k  0; −4+2k  −14),
B·A=(−14  0; 3k−6  −k−12).
4. Igualamos los elementos correspondientes. Obtenemos el sistema:
−12−k=−14,
−4+2k=3k−6,
−14=−k−12.
5. Las tres ecuaciones proporcionan el mismo valor:
k=2.
6. Comprobamos sustituyendo k=2:
A·B=B·A=(−14  0; 0  −14).
Resultado final: k=2.`
      }
    },
    "ccss2-algebra-c94f122fdea2": {
      "Resultado": {
        options: [
          "Primera pregunta: 1,4 puntos; segunda: 1 punto; tercera: 4,8 puntos.",
          "Primera pregunta: 1 punto; segunda: 1,4 puntos; tercera: 4,8 puntos.",
          "Primera pregunta: 2 puntos; segunda: 1 punto; tercera: 4,2 puntos.",
          "Primera pregunta: 1,4 puntos; segunda: 2 puntos; tercera: 3,8 puntos."
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x, y, z a las puntuaciones de la primera, segunda y tercera pregunta, respectivamente.
2. Traducimos las condiciones del enunciado:
x+y+z=7,2,
x=1,4y,
z=2(x+y).
3. Reunimos las tres ecuaciones en un sistema:
{x+y+z=7,2;
 x-1,4y=0;
 z-2x-2y=0}.
4. Sustituimos z=2(x+y) en la primera ecuación:
x+y+2(x+y)=7,2,
3(x+y)=7,2,
x+y=2,4.
5. Como x=1,4y:
1,4y+y=2,4,
2,4y=2,4,
y=1.
6. Calculamos las otras puntuaciones:
x=1,4·1=1,4,
z=2·(1,4+1)=4,8.
7. Comprobamos:
1,4+1+4,8=7,2.
Resultado final: 1,4 puntos en la primera pregunta, 1 punto en la segunda y 4,8 puntos en la tercera.`
      }
    },
    "ccss2-analisis-a94478e91aed": {
      "b.3)": {
        options: [
          "a=1 y b=45.",
          "a=−1 y b=45.",
          "a=1 y b=27.",
          "a=2 y b=36."
        ],
        correct: 0,
        solution: `Resolución:
1. La función es A(t)=at³−12t²+bt.
2. Como en la tercera hora el precio es 54 €:
A(3)=54,
27a−108+3b=54,
9a+b=54.
3. Derivamos:
A'(t)=3at²−24t+b.
Como en t=3 se alcanza un máximo:
A'(3)=0,
27a−72+b=0,
27a+b=72.
4. Reunimos las dos ecuaciones en un sistema:
{9a+b=54;
 27a+b=72}.
5. Restamos la primera ecuación a la segunda:
18a=18,
a=1.
6. Sustituimos en 9a+b=54:
9+b=54,
b=45.
7. Comprobamos que el punto crítico es un máximo:
A''(t)=6at−24,
A''(3)=6·1·3−24=−6<0.
Resultado final: a=1 y b=45.`
      }
    },
    "ccss2-algebra-f6e4d8280bd0": {
      "a.1)": {
        options: [
          "B(x,y)=35x+43y, con x+y≤400, y≤x, x≤240, x≥0, y≥0.",
          "B(x,y)=43x+35y, con x+y≥400, y≤x, x≤240.",
          "B(x,y)=35x+43y, con x+y≤400, x≤y, y≤240.",
          "B(x,y)=78(x+y), con x+y=400 y x=y."
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x al número de conejos e y al número de perdices.
2. El beneficio total es:
B(x,y)=35x+43y.
3. Traducimos cada condición:
número máximo de piezas: x+y≤400;
conejos en número mayor o igual que perdices: x≥y, es decir, y≤x;
máximo de conejos: x≤240;
además, x≥0 e y≥0.
4. Para representar el recinto dibujamos las rectas frontera x+y=400, y=x, x=240, x=0 e y=0 y conservamos la zona que satisface todas las inecuaciones.
5. Los vértices del recinto son:
(0,0), (240,0), (240,160) y (200,200).
Resultado final: B(x,y)=35x+43y con x+y≤400, y≤x, x≤240, x≥0, y≥0.`
      },
      "a.2)": {
        options: [
          "200 conejos y 200 perdices; beneficio máximo de 15 600 €.",
          "240 conejos y 160 perdices; beneficio máximo de 15 280 €.",
          "240 conejos y ninguna perdiz; beneficio máximo de 8 400 €.",
          "160 conejos y 240 perdices; beneficio máximo de 15 920 €."
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos la función objetivo B(x,y)=35x+43y en todos los vértices del recinto:
B(0,0)=0,
B(240,0)=35·240=8 400,
B(240,160)=35·240+43·160=15 280,
B(200,200)=35·200+43·200=15 600.
2. El mayor valor se alcanza en el vértice (200,200).
Resultado final: se deben cazar 200 conejos y 200 perdices, con un beneficio máximo de 15 600 €.`
      }
    },
    "ccss2-analisis-abc671ec5609": {
      "b.4)": {
        options: [
          "a=-299 y b=448.",
          "a=299 y b=-448.",
          "a=-149 y b=298.",
          "a=-300 y b=449."
        ],
        correct: 0,
        solution: `Resolución:
1. La función es:
V(t)=at³+bt²+t.
2. Como en t=1 la velocidad es 150 m/min:
V(1)=150
a+b+1=150
a+b=149.
3. Derivamos:
V'(t)=3at²+2bt+1.
Como en t=1 hay un máximo:
V'(1)=0
3a+2b+1=0
3a+2b=-1.
4. Reunimos las ecuaciones en un sistema:
{a+b=149;
3a+2b=-1}.
5. Multiplicamos la primera ecuación por 2 y restamos:
3a+2b-(2a+2b)=-1-298,
a=-299.
6. Sustituimos en a+b=149:
-299+b=149,
b=448.
7. Comprobamos que se trata de un máximo:
V''(t)=6at+2b,
V''(1)=6·(-299)+2·448=-898<0.
Resultado final: a=-299 y b=448.`
      }
    },
    "ccss2-probabilidad-79d8b7219d16": {
      "a)": {
        options: ["0,355.", "0,180.", "0,525.", "0,425."],
        correct: 0,
        solution: `Resolución:
1. Sean P: «le gusta la piña» y A: «le gustan las anchoas».
2. Escribimos los datos:
P(P)=0,30, P(P̄)=0,70,
P(A|P)=0,60.
Como P(Ā|P̄)=0,75, entonces P(A|P̄)=1-0,75=0,25.
3. Aplicamos el teorema de la probabilidad total:
P(A)=P(P)·P(A|P)+P(P̄)·P(A|P̄).
4. Sustituimos:
P(A)=0,30·0,60+0,70·0,25
=0,18+0,175
=0,355.
Resultado final: la probabilidad de que le gusten las anchoas es 0,355.`
      },
      "b)": {
        options: ["frac{8}{43}≈0,1860.", "frac{12}{35}≈0,3429.", "frac{6}{25}=0,24.", "frac{3}{10}=0,30."],
        correct: 0,
        solution: `Resolución:
1. Se pide P(P|Ā).
2. Calculamos la intersección:
P(P∩Ā)=P(P)·P(Ā|P)
=0,30·(1-0,60)
=0,30·0,40
=0,12.
3. Como P(A)=0,355:
P(Ā)=1-0,355=0,645.
4. Aplicamos la probabilidad condicionada:
P(P|Ā)=frac{P(P∩Ā)}{P(Ā)}
=frac{0,12}{0,645}
=frac{120}{645}
=frac{8}{43}
≈0,1860.
Resultado final: P(P|Ā)=frac{8}{43}≈0,1860.`
      }
    },
    "ccss2-probabilidad-08e07f563580": {
      "a)": {
        options: ["0,04.", "0,23.", "0,05.", "0,19."],
        correct: 0,
        solution: `Resolución:
1. Sean R: «el paquete llega con retraso» y D: «el paquete llega defectuoso».
2. Aplicamos la fórmula de la unión:
P(R∪D)=P(R)+P(D)-P(R∩D).
3. Sustituimos:
0,19=0,09+0,14-P(R∩D).
4. Despejamos:
P(R∩D)=0,09+0,14-0,19=0,04.
Resultado final: la probabilidad de que llegue defectuoso y con retraso es 0,04.`
      },
      "b)": {
        options: ["frac{4}{9}≈0,4444.", "frac{2}{7}≈0,2857.", "frac{9}{14}≈0,6429.", "0,04."],
        correct: 0,
        solution: `Resolución:
1. Se pide la probabilidad condicionada P(D|R).
2. Aplicamos la fórmula:
P(D|R)=frac{P(D∩R)}{P(R)}.
3. Sustituimos los datos:
P(D|R)=frac{0,04}{0,09}
=frac{4}{9}
≈0,4444.
Resultado final: P(D|R)=frac{4}{9}≈0,4444.`
      }
    },
    "ccss2-estadistica-bb1c3212bc5e": {
      "a)": {
        options: [
          "[146,47;159,53] kg.",
          "[147,12;158,88] kg.",
          "[143,20;162,80] kg.",
          "[150,06;155,94] kg."
        ],
        correct: 0,
        solution: `Resolución:
1. Los datos son:
x̄=153, σ=30, n=81 y nivel de confianza 0,95.
2. Para un 95 % de confianza:
z_(α/2)=1,96.
3. Calculamos el error máximo:
E=z_(α/2)·frac{σ}{√n}
=1,96·frac{30}{√81}
=1,96·frac{30}{9}
≈6,53.
4. El intervalo de confianza es:
IC=paren{x̄-E,x̄+E}
=paren{153-6,53,153+6,53}
=[146,47;159,53].
Resultado final: [146,47;159,53] kg.`
      },
      "b)": {
        options: ["5,46 kg.", "5,88 kg.", "6,53 kg.", "1,82 kg."],
        correct: 0,
        solution: `Resolución:
1. Para un nivel de confianza del 93,12 %:
1-α=0,9312,
α=0,0688,
1-frac{α}{2}=0,9656.
2. Buscamos 0,9656 en la tabla de la normal típica:
P(Z≤z)=0,9656 ⇒ z=1,82.
3. Con n=100 y σ=30:
E=z·frac{σ}{√n}
=1,82·frac{30}{10}
=5,46.
Resultado final: el error máximo admisible es 5,46 kg.`
      },
      "c)": {
        options: [
          "No; 145 kg queda fuera del intervalo de confianza del 92 %.",
          "Sí; 145 kg pertenece al intervalo de confianza del 92 %.",
          "Sí; cualquier valor menor que 153 kg es admisible.",
          "No puede decidirse sin aumentar la muestra."
        ],
        correct: 0,
        solution: `Resolución:
1. Para un nivel de confianza del 92 %:
1-α=0,92,
α=0,08,
1-frac{α}{2}=0,96.
2. Buscamos 0,96 en la tabla de la normal típica:
P(Z≤z)=0,96 ⇒ z≈1,75.
3. Calculamos el error:
E=1,75·frac{30}{√81}
=1,75·frac{30}{9}
≈5,83.
4. Construimos el intervalo:
IC=paren{153-5,83,153+5,83}
=[147,17;158,83].
5. El valor 145 kg no pertenece al intervalo.
Resultado final: no se puede aceptar la afirmación del fabricante con un nivel de confianza del 92 %.`
      }
    },
    "ccss2-algebra-3ff54ef0992a": {
      "b.3)": {
        options: [
          "X=[[-1,-1],[8,5]].",
          "X=[[7,4],[8,5]].",
          "X=[[1,-1],[0,1]].",
          "X=[[-1,1],[-8,5]]."
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de A·X·A⁻¹=B.
2. Multiplicamos a la izquierda por A⁻¹ y a la derecha por A:
A⁻¹·A·X·A⁻¹·A=A⁻¹·B·A,
por tanto, X=A⁻¹·B·A.
3. Calculamos la inversa de A mediante determinantes:
det(A)=1·1-1·0=1,
A⁻¹=frac{Adj(A^T)}{det(A)}=[[1,-1],[0,1]].
4. Calculamos primero:
B·A=[[7,-3],[8,-3]]·[[1,1],[0,1]]=[[7,4],[8,5]].
5. Multiplicamos:
X=[[1,-1],[0,1]]·[[7,4],[8,5]]=[[-1,-1],[8,5]].
6. Comprobamos que A·X·A⁻¹=B.
Resultado final: X=[[-1,-1],[8,5]].`
      }
    },
    "ccss2-analisis-bb8f05461b0e": {
      "a.1)": {
        options: ["k=1.", "k=-1.", "k=2.", "No existe ningún valor real."],
        correct: 0,
        solution: `Resolución:
1. Cada rama es continua en su intervalo; solo estudiamos x=k.
2. Calculamos el límite por la izquierda:
lim x→k⁻ f(x)=2k²+4.
3. Calculamos el límite por la derecha:
lim x→k⁺ f(x)=-2k²+8k.
4. Para que sea continua, ambos límites y f(k) deben coincidir:
2k²+4=-2k²+8k.
5. Resolvemos:
4k²-8k+4=0,
4(k-1)²=0.
Resultado final: k=1.`
      },
      "a.2)": {
        options: [
          "Mínimo relativo en (0,4) y máximo relativo en (2,8).",
          "Máximo relativo en (0,4) y mínimo relativo en (2,8).",
          "Solo tiene un mínimo relativo en (1,6).",
          "No tiene extremos relativos."
        ],
        correct: 0,
        solution: `Resolución:
1. Para k=1:
f(x)=2x²+4 si x≤1 y f(x)=-2x²+8x si x>1.
2. Derivamos cada rama:
f'(x)=4x si x<1,
f'(x)=-4x+8 si x>1.
3. Los valores que anulan la derivada son x=0 y x=2.
4. Estudiamos el signo de f' en la recta real:
en (-∞,0), f'<0; en (0,1), f'>0; en (1,2), f'>0; en (2,+∞), f'<0.
5. En x=0 el signo cambia de negativo a positivo: hay un mínimo.
f(0)=4.
En x=2 cambia de positivo a negativo: hay un máximo.
f(2)=8.
Resultado final: mínimo relativo en (0,4) y máximo relativo en (2,8).`
      },
      "a.3)": {
        options: [
          "Convexa en (-∞,1) y cóncava en (1,+∞).",
          "Cóncava en (-∞,1) y convexa en (1,+∞).",
          "Convexa en todo ℝ.",
          "Cóncava en todo ℝ."
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos la segunda derivada en cada rama:
f''(x)=4 si x<1,
f''(x)=-4 si x>1.
2. Representamos el signo en la recta real:
en (-∞,1), f''>0, por lo que la función es convexa;
en (1,+∞), f''<0, por lo que es cóncava.
3. La función es continua en x=1 y cambia de curvatura, por lo que (1,6) es un punto de inflexión.
Resultado final: convexa en (-∞,1), cóncava en (1,+∞) y punto de inflexión en (1,6).`
      }
    },
    "ccss2-probabilidad-faaa6bf3f0ba": {
      "a)": {
        options: ["22 %.", "18 %.", "32 %.", "12 %."],
        correct: 0,
        solution: `Resolución:
1. Sean S=«ver series» y D=«ver documentales».
2. Aplicamos la fórmula de la unión:
P(S∪D)=P(S)+P(D)-P(S∩D)
=0,70+0,20-0,12=0,78.
3. Calculamos el suceso contrario:
P(S̄∩D̄)=1-P(S∪D)=1-0,78=0,22.
Resultado final: el 22 % no ve ni series ni documentales.`
      },
      "b)": {
        options: [
          "frac{6}{35}≈0,1714.",
          "frac{3}{5}=0,6.",
          "frac{12}{20}=0,6.",
          "frac{7}{10}=0,7."
        ],
        correct: 0,
        solution: `Resolución:
1. Se pide una probabilidad condicionada:
P(D|S)=frac{P(D∩S)}{P(S)}.
2. Sustituimos los datos:
P(D|S)=frac{0,12}{0,70}=frac{12}{70}=frac{6}{35}.
Resultado final: P(D|S)=frac{6}{35}≈0,1714.`
      }
    },
    "ccss2-estadistica-49aee87aaeea": {
      "a)": {
        options: [
          "IC≈(15,63;18,37) años.",
          "IC≈(16,38;17,62) años.",
          "IC≈(14,83;19,17) años.",
          "IC≈(15;19) años."
        ],
        correct: 0,
        solution: `Resolución:
1. La varianza es σ²=4, luego σ=2 años.
2. Calculamos la media muestral:
x̄=frac{16+19+21+15+14+18+20+15+14+18}{10}
=frac{170}{10}=17.
3. Para un nivel de confianza del 97 %:
α=0,03, α/2=0,015 y 1-α/2=0,985.
Buscamos 0,985 en la tabla de la normal y obtenemos z_{α/2}≈2,17.
4. Calculamos el error:
E=z_{α/2}·frac{σ}{√n}
=2,17·frac{2}{√10}≈1,37.
5. Construimos el intervalo:
IC=(x̄-E,x̄+E)=(17-1,37,17+1,37).
Resultado final: IC≈(15,63;18,37) años.`
      },
      "b)": {
        options: [
          "Aumentar el tamaño de la muestra.",
          "Disminuir el tamaño de la muestra.",
          "Aumentar la desviación típica.",
          "Mantener todos los datos sin cambios."
        ],
        correct: 0,
        solution: `Resolución:
1. La amplitud del intervalo es:
2E=2·z_{α/2}·frac{σ}{√n}.
2. Para el mismo nivel de confianza, z_{α/2} no cambia; y σ es un dato de la población.
3. Al aumentar n, aumenta √n y disminuyen el error E y la amplitud 2E.
Resultado final: se debe aumentar el tamaño de la muestra.`
      },
      "c)": {
        options: [
          "E=frac{4}{9}≈0,4444 años.",
          "E=frac{2}{9}≈0,2222 años.",
          "E=frac{8}{9}≈0,8889 años.",
          "E=2 años."
        ],
        correct: 0,
        solution: `Resolución:
1. Para un nivel de confianza del 95,44 %:
α=1-0,9544=0,0456,
1-α/2=0,9772.
2. Buscamos 0,9772 en la tabla de la normal y obtenemos z_{α/2}=2.
3. Con σ=2 y n=81:
E=z_{α/2}·frac{σ}{√n}
=2·frac{2}{√81}
=frac{4}{9}.
Resultado final: E=frac{4}{9}≈0,4444 años.`
      }
    }
  });

  Object.assign(ccssAnswers, {
    "ccss2-analisis-ae18b6cdc5f1": {
      "a)": {
        options: [
          "El máximo se alcanza a las 12 horas y es de 3456 visitantes.",
          "El máximo se alcanza a las 8 horas y es de 3392 visitantes.",
          "El máximo se alcanza a las 20 horas y es de 640 visitantes.",
          "El máximo se alcanza a las 16 horas y es de 2816 visitantes."
        ],
        correct: 0,
        solution: `Resolución:
1. La función es P(t)=432t-t³, con 8≤t≤20.
2. Derivamos:
P'(t)=432-3t²=3(144-t²).
3. Buscamos los puntos críticos:
P'(t)=0 ⇔ 144-t²=0 ⇔ t=±12.
Como t∈[8,20], solamente consideramos t=12.
4. Comparamos el valor en los extremos y en el punto crítico:
P(8)=432·8-8³=2944,
P(12)=432·12-12³=3456,
P(20)=432·20-20³=640.
Resultado final: el máximo se alcanza a las 12 horas y es de 3456 visitantes.`
      },
      "b)": {
        options: [
          "P crece en [8,12] y decrece en [12,20].",
          "P decrece en [8,12] y crece en [12,20].",
          "P crece en todo [8,20].",
          "P decrece en todo [8,20]."
        ],
        correct: 0,
        solution: `Resolución:
1. Estudiamos el signo de P'(t)=3(144-t²).
2. Marcamos t=12 en la recta real del intervalo [8,20].
3. En (8,12), por ejemplo para t=10:
P'(10)=3(144-100)>0, luego P crece.
4. En (12,20), por ejemplo para t=16:
P'(16)=3(144-256)<0, luego P decrece.
Resultado final: P crece en [8,12] y decrece en [12,20].`
      }
    },
    "ccss2-analisis-697d10ca5d82": {
      "Resultado": {
        options: [
          "a=-1 y b=12.",
          "a=1 y b=-12.",
          "a=-2 y b=24.",
          "a=1 y b=12."
        ],
        correct: 0,
        solution: `Resolución:
1. La función f(x)=ax²+bx-20 tiene un máximo en el punto (6,16). Por tanto:
f(6)=16 y f'(6)=0.
2. Sustituimos el punto en la función:
36a+6b-20=16 ⇔ 6a+b=6.
3. Derivamos:
f'(x)=2ax+b.
Como f'(6)=0:
12a+b=0.
4. Reunimos las dos ecuaciones:
system{6a+b=6;12a+b=0}.
Restamos la primera ecuación de la segunda:
6a=-6 ⇔ a=-1.
5. Sustituimos en 6a+b=6:
-6+b=6 ⇔ b=12.
6. Comprobamos que es un máximo:
f''(x)=2a=-2<0.
Resultado final: a=-1 y b=12.`
      }
    },
    "ccss2-analisis-455511ef43ff": {
      "a)": {
        options: [
          "El máximo es 54 y se alcanza para x=3 y x=6.",
          "El máximo es 50 y se alcanza para x=5.",
          "El máximo es 45 y se alcanza para x=1.",
          "El máximo es 36 y se alcanza para x=6."
        ],
        correct: 0,
        solution: `Resolución:
1. La función es C(x)=x³-12x²+45x, con 0≤x≤6.
2. Derivamos:
C'(x)=3x²-24x+45=3(x-3)(x-5).
3. Los puntos críticos del intervalo son x=3 y x=5.
4. Comparamos los valores en los extremos y en los puntos críticos:
C(0)=0,
C(3)=27-108+135=54,
C(5)=125-300+225=50,
C(6)=216-432+270=54.
Resultado final: el máximo es 54 y se alcanza para x=3 y x=6.`
      },
      "b)": {
        options: [
          "C decrece en (3,5).",
          "C decrece en (0,3).",
          "C decrece en (5,6).",
          "C decrece en todo (0,6)."
        ],
        correct: 0,
        solution: `Resolución:
1. Los valores que anulan C'(x)=3(x-3)(x-5) son x=3 y x=5.
2. Los situamos en una recta real y comprobamos un valor de cada intervalo:
En (0,3), C'(1)=3(-2)(-4)>0: C crece.
En (3,5), C'(4)=3(1)(-1)<0: C decrece.
En (5,6), C'(5,5)=3(2,5)(0,5)>0: C crece.
Resultado final: C decrece en (3,5).`
      }
    },
    "ccss2-probabilidad-3f2ad5badeb7": {
      "a)": {
        options: [
          "0,39.",
          "0,61.",
          "0,49.",
          "0,29."
        ],
        correct: 0,
        solution: `Resolución:
1. Aplicamos el teorema de la probabilidad total:
P(S)=0,10·0,20+0,70·0,60+0,20·0,85
=0,02+0,42+0,17=0,61.
2. La probabilidad de que no tenga seguro es:
P(S̄)=1-P(S)=1-0,61=0,39.
Resultado final: P(S̄)=0,39.`
      },
      "b)": {
        options: [
          "frac{2}{61}≈0,0328.",
          "frac{1}{10}=0,1.",
          "frac{1}{5}=0,2.",
          "frac{20}{61}≈0,3279."
        ],
        correct: 0,
        solution: `Resolución:
1. Se pide la probabilidad condicionada de que sea una motocicleta sabiendo que tiene seguro:
P(M|S)=frac{P(M∩S)}{P(S)}.
2. Calculamos la intersección:
P(M∩S)=0,10·0,20=0,02.
3. Como P(S)=0,61:
P(M|S)=frac{0,02}{0,61}=frac{2}{61}.
Resultado final: P(M|S)=frac{2}{61}≈0,0328.`
      }
    },
    "ccss2-probabilidad-b6191d80e563": {
      "a)": {
        options: [
          "frac{13}{22}≈0,5909.",
          "frac{9}{22}≈0,4091.",
          "frac{3}{11}≈0,2727.",
          "frac{7}{10}=0,7."
        ],
        correct: 0,
        solution: `Resolución:
1. Hay 10 analistas y 12 desarrolladores, en total 22 personas:
P(A)=frac{10}{22}=frac{5}{11}, P(D)=frac{12}{22}=frac{6}{11}.
2. Aplicamos la probabilidad total al suceso de no utilizar Mac:
P(M̄)=P(A)P(M̄|A)+P(D)P(M̄|D).
3. Sustituimos:
P(M̄)=frac{5}{11}·0,7+frac{6}{11}·0,5
=frac{7}{22}+frac{3}{11}
=frac{13}{22}.
Resultado final: P(M̄)=frac{13}{22}≈0,5909.`
      },
      "b)": {
        options: [
          "frac{2}{3}≈0,6667.",
          "frac{1}{3}≈0,3333.",
          "frac{6}{11}≈0,5455.",
          "frac{3}{11}≈0,2727."
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos:
P(D∩M)=frac{6}{11}·0,5=frac{3}{11}.
2. La probabilidad total de utilizar Mac es:
P(M)=frac{5}{11}·0,3+frac{6}{11}·0,5
=frac{3}{22}+frac{3}{11}=frac{9}{22}.
3. Aplicamos la probabilidad condicionada:
P(D|M)=frac{P(D∩M)}{P(M)}
=frac{frac{3}{11}}{frac{9}{22}}
=frac{2}{3}.
Resultado final: P(D|M)=frac{2}{3}≈0,6667.`
      }
    },
    "ccss2-probabilidad-b7af4d79c492": {
      "a)": {
        options: [
          "0,42.",
          "0,58.",
          "0,22.",
          "0,36."
        ],
        correct: 0,
        solution: `Resolución:
1. Sean M: aprobar Matemáticas e I: aprobar Inglés.
2. Calculamos la probabilidad de aprobar ambas:
P(M∩I)=P(M)+P(I)-P(M∪I)
=0,64+0,72-0,78=0,58.
3. Suspender alguna de las dos asignaturas es el suceso complementario de aprobar ambas:
P((M∩I)̄)=1-0,58=0,42.
Resultado final: la probabilidad es 0,42.`
      },
      "b)": {
        options: [
          "No son independientes, porque 0,64·0,72≠0,58.",
          "Son independientes, porque 0,64+0,72=1,36.",
          "Son independientes, porque P(M∩I)=0,58.",
          "No se puede decidir con los datos dados."
        ],
        correct: 0,
        solution: `Resolución:
1. Dos sucesos M e I son independientes si:
P(M∩I)=P(M)·P(I).
2. Comparamos:
P(M)·P(I)=0,64·0,72=0,4608,
mientras que P(M∩I)=0,58.
3. Como 0,4608≠0,58, no se cumple la condición de independencia.
Resultado final: aprobar Matemáticas y aprobar Inglés no son sucesos independientes.`
      }
    },
    "ccss2-estadistica-e1837c5e72e6": {
      "a)": {
        options: [
          "IC≈(6,72;9,08).",
          "IC≈(7,33;8,47).",
          "IC≈(5,90;9,90).",
          "IC≈(7,00;8,80)."
        ],
        correct: 0,
        solution: `Resolución:
1. Tenemos x̄=7,9, σ=2 y n=12.
2. Para un nivel de confianza del 95,96 %:
α=1-0,9596=0,0404,
1-α/2=0,9798.
Buscamos 0,9798 en la tabla de la normal y obtenemos z_{α/2}≈2,05.
3. Calculamos el error:
E=z_{α/2}·frac{σ}{√n}
=2,05·frac{2}{√12}≈1,18.
4. Construimos el intervalo:
IC=(7,9-1,18;7,9+1,18).
Resultado final: IC≈(6,72;9,08).`
      },
      "b)": {
        options: [
          "E≈0,53.",
          "E≈1,06.",
          "E≈0,26.",
          "E=2."
        ],
        correct: 0,
        solution: `Resolución:
1. Para un nivel de confianza del 96,52 %:
α=1-0,9652=0,0348,
1-α/2=0,9826.
Buscamos 0,9826 en la tabla de la normal y obtenemos z_{α/2}≈2,11.
2. Con σ=2 y n=64:
E=z_{α/2}·frac{σ}{√n}
=2,11·frac{2}{8}
=0,5275.
Resultado final: el error máximo es aproximadamente 0,53.`
      }
    },
    "ccss2-estadistica-c90910dce59e": {
      "a)": {
        options: [
          "IC≈(206,34;239,66).",
          "IC≈(214,67;231,33).",
          "IC≈(172;274).",
          "IC≈(203,40;242,60)."
        ],
        correct: 0,
        solution: `Resolución:
1. Tenemos x̄=223, σ=51 y n=36.
2. Para un nivel de confianza del 95 %, z_{α/2}=1,96.
3. Calculamos el error:
E=1,96·frac{51}{√36}
=1,96·frac{51}{6}
=16,66.
4. Construimos el intervalo:
IC=(223-16,66;223+16,66).
Resultado final: IC≈(206,34;239,66).`
      },
      "b)": {
        options: [
          "Como mínimo, 97 individuos.",
          "Como mínimo, 96 individuos.",
          "Como mínimo, 98 individuos.",
          "Como mínimo, 100 individuos."
        ],
        correct: 0,
        solution: `Resolución:
1. Para un nivel de confianza del 94,64 %:
α=1-0,9464=0,0536,
1-α/2=0,9732.
Buscamos 0,9732 en la tabla y obtenemos z_{α/2}≈1,93.
2. Imponemos que el error sea menor que 10:
1,93·frac{51}{√n}<10.
3. Despejamos:
√n>frac{1,93·51}{10}
⇒ n>paren{frac{1,93·51}{10}}²≈96,90.
4. El tamaño muestral debe ser entero y superar ese valor.
Resultado final: como mínimo, n=97 individuos.`
      }
    },
    "ccss2-estadistica-13ffb60bf9ba": {
      "a)": {
        options: [
          "IC≈(32,77;47,23).",
          "IC≈(35;45).",
          "IC≈(30;50).",
          "IC≈(37,83;42,17)."
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos la media muestral:
x̄=frac{360}{9}=40.
2. Para un nivel de confianza del 97 %:
α=0,03,
1-α/2=0,985.
Buscamos 0,985 en la tabla y obtenemos z_{α/2}≈2,17.
3. Con σ=10 y n=9:
E=2,17·frac{10}{√9}
=frac{21,7}{3}≈7,23.
4. Construimos el intervalo:
IC=(40-7,23;40+7,23).
Resultado final: IC≈(32,77;47,23).`
      },
      "b)": {
        options: [
          "Como mínimo, 118 donaciones.",
          "Como mínimo, 117 donaciones.",
          "Como mínimo, 119 donaciones.",
          "Como mínimo, 100 donaciones."
        ],
        correct: 0,
        solution: `Resolución:
1. Mantenemos el nivel de confianza del 97 %, por lo que z_{α/2}≈2,17.
2. Queremos un error menor que 2:
2,17·frac{10}{√n}<2.
3. Despejamos:
√n>frac{2,17·10}{2}=10,85
⇒ n>10,85²=117,7225.
4. Tomamos el primer entero que supera ese valor.
Resultado final: como mínimo, n=118 donaciones.`
      }
    }
  });
})();

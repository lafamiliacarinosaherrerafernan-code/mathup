// Reparaciones revisadas de ejercicios oficiales cuya conversión original unió dos enunciados.
(function repairMatesIIImportedExercises() {
  const bank = window.MATES_II_BLOCK_EXERCISES?.analisis;
  if (!Array.isArray(bank)) return;

  const originalId = "mates2-analisis-df640c5905c9";
  const waterId = `${originalId}-agua`;
  const index = bank.findIndex((exercise) => exercise.id === originalId);
  if (index < 0) return;
  const imported = bank[index];

  const waterExercise = {
    id: waterId,
    source: imported.source,
    statement: [
      {
        plain: "1º) En cierto experimento la cantidad de agua en estado líquido C(t), medida en litros, está determinada en función del tiempo t, medido en horas, por la siguiente expresión:",
        html: "1º) En cierto experimento la cantidad de agua en estado líquido <em>C(t)</em>, medida en litros, está determinada en función del tiempo <em>t</em>, medido en horas, por la siguiente expresión:"
      },
      {
        plain: "C(t)=2/3+10t+10/t+240/t³, t∈[1,10].",
        html: '<span class="official-display-formula"><em>C(t)</em>=<span class="math-fraction"><span>2</span><span>3</span></span>+10<em>t</em>+<span class="math-fraction"><span>10</span><span><em>t</em></span></span>+<span class="math-fraction"><span>240</span><span><em>t</em><sup>3</sup></span></span>, <em>t</em>∈[1,10]</span>'
      },
      {
        plain: "Halla cuál es la cantidad mínima de agua en estado líquido y en qué instante de tiempo se obtiene, en el intervalo comprendido entre t=1 hora y t=10 horas.",
        html: "Halla cuál es la cantidad mínima de agua en estado líquido y en qué instante de tiempo se obtiene, en el intervalo comprendido entre <em>t</em>=1 hora y <em>t</em>=10 horas."
      }
    ],
    parts: [{ label: "Resultado", paragraphs: [] }]
  };

  const areaExercise = {
    ...imported,
    statement: [{
      plain: "2º) a) Representa gráficamente la región del primer cuadrante limitada por las gráficas de las funciones f(x)=1/x y g(x)=1/x², y la recta x=2.",
      html: '2º) a) Representa gráficamente la región del primer cuadrante limitada por las gráficas de las funciones <em>f(x)</em>=<span class="math-fraction"><span>1</span><span><em>x</em></span></span> y <em>g(x)</em>=<span class="math-fraction"><span>1</span><span><em>x</em><sup>2</sup></span></span>, y la recta <em>x</em>=2.'
    }],
    parts: imported.parts
  };

  bank.splice(index, 1, waterExercise, areaExercise);

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};
  window.MATES_II_EXAM_ANSWERS[waterId] = {
    Resultado: {
      options: [
        "El mínimo es C(3)=386/9 litros y se obtiene en t=3 horas.",
        "El mínimo es C(1)=782/3 litros y se obtiene en t=1 hora.",
        "El mínimo es C(10)=7643/75 litros y se obtiene en t=10 horas.",
        "El mínimo es C(2)=167/3 litros y se obtiene en t=2 horas."
      ],
      correct: 0,
      solution: `Resolución:
1. La función es continua en el intervalo cerrado [1,10], por lo que el mínimo absoluto puede aparecer en un punto crítico o en uno de los extremos.
2. Derivamos término a término:
C'(t)=10-frac{10}{t²}-frac{720}{t⁴}.
3. Buscamos los puntos críticos. Como t>0, multiplicamos C'(t)=0 por t⁴:
10t⁴-10t²-720=0.
Dividimos entre 10 y hacemos u=t²:
u²-u-72=0 ⇒ (u-9)(u+8)=0.
Como u=t²≥0, queda t²=9 y, dentro de [1,10], t=3.
4. Comprobamos el signo de C'(t) a ambos lados de t=3. Por ejemplo:
C'(2)=10-frac{10}{4}-frac{720}{16}<0,
C'(4)=10-frac{10}{16}-frac{720}{256}>0.
[[signchart points="1|3|10" signs="-|+" arrows="↓|↑"]]
La función decrece hasta t=3 y crece después; por tanto, en t=3 alcanza un mínimo.
5. Calculamos el valor de la función:
C(3)=frac{2}{3}+10·3+frac{10}{3}+frac{240}{3³}
=frac{2}{3}+30+frac{10}{3}+frac{80}{9}=frac{386}{9}.
6. Comprobamos también los extremos:
C(1)=frac{782}{3},
C(10)=frac{7643}{75}.
Ambos valores son mayores que frac{386}{9}.
Resultado final: la cantidad mínima es frac{386}{9} litros y se obtiene a las 3 horas.`
    }
  };
  window.MATES_II_EXAM_ANSWERS[originalId] = {
    "b)": {
      options: [
        "A=ln 2-1/2 unidades cuadradas.",
        "A=ln 2+1/2 unidades cuadradas.",
        "A=1/2 unidades cuadradas.",
        "A=2 ln 2-1 unidades cuadradas."
      ],
      correct: 0,
      solution: `Resolución:
1. Las curvas se cortan cuando frac{1}{x}=frac{1}{x²}. En el primer cuadrante, x>0, así que multiplicamos por x² y obtenemos x=1.
2. La recta x=2 cierra el recinto. En [1,2] se cumple frac{1}{x}>frac{1}{x²}.
3. El área es la integral de la función superior menos la inferior:
A=∫_{1}^{2} paren{frac{1}{x}-frac{1}{x²}} dx.
4. Una primitiva es:
ln x+frac{1}{x}.
5. Aplicamos la regla de Barrow:
A=[ln x+frac{1}{x}]_{1}^{2}=paren{ln 2+frac{1}{2}}-paren{ln 1+1}=ln 2-frac{1}{2}.
Resultado final: A=ln 2-frac{1}{2} unidades cuadradas.`
    }
  };

  const catalog = window.BACH_II_EXAM_CATALOG?.["2bach-mates"];
  if (Array.isArray(catalog)) {
    if (!catalog.some((entry) => entry.id === waterId)) catalog.push({ id: waterId, block: "analisis", slot: 2, topics: [9] });
    if (!catalog.some((entry) => entry.id === originalId)) catalog.push({ id: originalId, block: "analisis", slot: 3, topics: [11] });
  }

  // Tres ejercicios literales adicionales del banco corregido de Álgebra.
  // Se publican como preguntas completas para que cada reto tenga cinco ejercicios
  // oficiales distintos, sin recurrir a preguntas genéricas ni mezclar CCSS II.
  const algebraBank = window.MATES_II_BLOCK_EXERCISES?.algebra || [];
  const rawText = (exercise) => (exercise?.statement || []).map((paragraph) => paragraph.plain || "").join("\n");
  const rawHtml = (exercise) => (exercise?.statement || []).map((paragraph) => `<p>${paragraph.html || paragraph.plain || ""}</p>`).join("");
  const findAlgebraExercise = (predicate) => algebraBank.find((exercise) => predicate(rawText(exercise)));
  const makeOfficialQuestion = (id, exercise, options, correct, solution) => exercise ? {
    id,
    rawBaseId: `${id}|${exercise.source}|${rawText(exercise)}`,
    source: exercise.source,
    blockId: "algebra",
    text: rawText(exercise),
    statementHtml: rawHtml(exercise),
    parts: [{
      label: "Resultado",
      text: "Selecciona el resultado correcto.",
      html: "<p>Selecciona el resultado correcto.</p>",
      options,
      correct,
      solution
    }],
    type: "corrected-official-exercise"
  } : null;
  const makeMultipartOfficialQuestion = (id, exercise, answers) => exercise ? {
    id,
    rawBaseId: `${id}|${exercise.source}|${rawText(exercise)}`,
    source: exercise.source,
    blockId: "algebra",
    text: rawText(exercise),
    statementHtml: rawHtml(exercise),
    parts: (exercise.parts || []).map((part) => {
      const answer = answers[part.label];
      const plain = (part.paragraphs || []).map((paragraph) => paragraph.plain || "").join("\n")
        .replace(/^\s*[a-d](?:\.\d+)?\)\s*/i, "");
      const html = (part.paragraphs || []).map((paragraph) => paragraph.html || paragraph.plain || "").join("<br>")
        .replace(/^\s*[a-d](?:\.\d+)?\)\s*/i, "");
      return { label: part.label, text: plain, html, ...answer };
    }),
    type: "corrected-official-exercise"
  } : null;

  const rankExercise = findAlgebraExercise((text) => /Ejercicio 4, apartado b\).*Estudia el rango de la matriz/i.test(text));
  const inverseEqualityExercise = findAlgebraExercise((text) => /Ejercicio 7, apartado a\).*matriz[\s\S]*¿Existe algún valor de a/i.test(text));
  const determinantPowerExercise = findAlgebraExercise((text) => /Ejercicio 4, apartado b\).*Calcula el determinante de A y de A·A/i.test(text));
  const matrices2026Exercise = findAlgebraExercise((text) => /Pregunta 3\.[\s\S]*matrices A y B cumplan que A·B=I/i.test(text));
  const rank2026Exercise = findAlgebraExercise((text) => /Pregunta 3\.[\s\S]*Estudia el rango de la siguiente matriz/i.test(text));
  const system2024Exercise = findAlgebraExercise((text) => /Ejercicio 1\.[\s\S]*ax\+2y\+z=1/i.test(text));
  const iceCreamExercise = findAlgebraExercise((text) => /heladería vende helados de una, dos y tres bolas/i.test(text));
  const rank2023Exercise = findAlgebraExercise((text) => /Ejercicio 8, apartado a\).[\s\S]*Calcula el rango de A/i.test(text));

  window.MATES_II_EXTRA_BLOCK_QUESTIONS = window.MATES_II_EXTRA_BLOCK_QUESTIONS || {};
  window.MATES_II_EXTRA_BLOCK_QUESTIONS.algebra = [
    makeOfficialQuestion(
      "mates2-algebra-extra-rango-2024-junio",
      rankExercise,
      [
        "rango(A)=3 para todo a∈ℝ.",
        "rango(A)=2 si a=0 y rango(A)=3 si a≠0.",
        "rango(A)=2 para todo a∈ℝ.",
        "rango(A)=1 si a=1 y rango(A)=2 en otro caso."
      ],
      0,
      `Resolución:
1. La matriz tiene tres filas, por lo que su rango no puede ser mayor que 3.
2. Elegimos el menor de orden 3 formado por las columnas primera, segunda y cuarta:
D=det [[1,0,0],[2,0,1],[a,1,1]].
3. Desarrollamos por la primera fila:
D=1·det [[0,1],[1,1]]=1·paren{0·1-1·1}=-1.
4. Como este menor vale -1≠0 para cualquier valor de a, siempre existe un menor de orden 3 no nulo. Por tanto, rango(A)≥3.
5. Al tener solo tres filas, rango(A)≤3. Reuniendo ambas desigualdades:
rango(A)=3.
Resultado final: rango(A)=3 para todo a∈ℝ.`
    ),
    makeOfficialQuestion(
      "mates2-algebra-extra-inversa-2024-junio",
      inverseEqualityExercise,
      [
        "Sí, únicamente para a=0.",
        "Sí, para a=1 y a=-1.",
        "No existe ningún valor real de a.",
        "Sí, para cualquier a∈ℝ."
      ],
      0,
      `Resolución:
1. La matriz es A=[[a,1],[1,0]]. Calculamos su determinante:
det(A)=a·0-1·1=-1≠0.
Por tanto, A tiene inversa para todo a∈ℝ.
2. Usamos la nomenclatura del curso:
A⁻¹=frac{Adj(A^T)}{det(A)}.
Como A es simétrica, A^T=A. La matriz de adjuntos traspuesta es:
Adj(A^T)=[[0,-1],[-1,a]].
3. Sustituimos det(A)=-1:
A⁻¹=frac{1}{-1}[[0,-1],[-1,a]]=[[0,1],[1,-a]].
4. Imponemos A=A⁻¹ y comparamos los elementos que ocupan la misma posición:
[[a,1],[1,0]]=[[0,1],[1,-a]].
De la posición (1,1), a=0; y de la posición (2,2), 0=-a, que confirma a=0.
5. Comprobamos:
si a=0, A=[[0,1],[1,0]] y A²=I, luego A=A⁻¹.
Resultado final: sí existe, y el único valor es a=0.`
    ),
    makeOfficialQuestion(
      "mates2-algebra-extra-determinante-2024-julio",
      determinantPowerExercise,
      [
        "det(A)=a, det(A·A)=a² y el determinante del producto de n matrices A es aⁿ.",
        "det(A)=a+2, det(A·A)=2a y el determinante del producto de n matrices A es n·a.",
        "det(A)=1, det(A·A)=1 y todos los productos tienen determinante 1.",
        "det(A)=2a, det(A·A)=4a² y el determinante del producto de n matrices A es 2ⁿa."
      ],
      0,
      `Resolución:
1. La matriz A=[[a,2],[0,1]] es triangular. Su determinante es el producto de los elementos de la diagonal:
det(A)=a·1=a.
2. Para el producto A·A aplicamos la propiedad del determinante de un producto:
det(A·A)=det(A)·det(A)=a·a=a².
3. Si multiplicamos n veces la matriz A, aplicamos repetidamente la misma propiedad:
det(paren{A·A·…·A})=det(A)·det(A)·…·det(A).
Hay n factores iguales a a, por lo que:
det(Aⁿ)=aⁿ.
4. La expresión también es válida cuando a=0: en ese caso todos los determinantes anteriores valen 0.
Resultado final: det(A)=a, det(A·A)=a² y det(Aⁿ)=aⁿ.`
    ),
    makeMultipartOfficialQuestion(
      "mates2-algebra-extra-matrices-2026-junio",
      matrices2026Exercise,
      {
        "a)": {
          options: ["a=1 y b=2.", "a=2 y b=1.", "a=1 y b=1.", "a=2 y b=2."],
          correct: 0,
          solution: `Resolución:
1. Multiplicamos A·B fila por columna y conservamos la disposición matricial:
A·B=[[2-a,a-1,0],[0,1,0],[2-b,0,b-1]].
2. Para que A·B sea la identidad de orden 3 debe cumplirse:
[[2-a,a-1,0],[0,1,0],[2-b,0,b-1]]=[[1,0,0],[0,1,0],[0,0,1]].
3. Igualamos los elementos que ocupan la misma posición. De la primera fila:
2-a=1 y a-1=0, luego a=1.
4. De la tercera fila:
2-b=0 y b-1=1, luego b=2.
5. Comprobación:
para a=1 y b=2, A·B=I₃.
Resultado final: a=1 y b=2.`
        },
        "b)": {
          options: ["X=[[-1,-1],[-1,0]] e Y=[[2,1],[3,3]].", "X=[[2,1],[3,3]] e Y=[[-1,-1],[-1,0]].", "X=[[1,0],[2,3]] e Y=[[4,1],[7,9]].", "X=[[0,-1],[-1,1]] e Y=[[1,1],[3,2]]."],
          correct: 0,
          solution: `Resolución:
1. Escribimos el sistema:
X+Y=[[1,0],[2,3]],
2X+3Y=[[4,1],[7,9]].
2. Multiplicamos la primera ecuación por 2:
2X+2Y=[[2,0],[4,6]].
3. Restamos esta ecuación de la segunda:
Y=[[4,1],[7,9]]-[[2,0],[4,6]]=[[2,1],[3,3]].
4. Sustituimos en la primera ecuación:
X=[[1,0],[2,3]]-Y
=[[1,0],[2,3]]-[[2,1],[3,3]]=[[-1,-1],[-1,0]].
5. Comprobamos ambas ecuaciones sustituyendo las matrices obtenidas.
Resultado final: X=[[-1,-1],[-1,0]] e Y=[[2,1],[3,3]].`
        }
      }
    ),
    makeMultipartOfficialQuestion(
      "mates2-algebra-extra-rango-2026-julio",
      rank2026Exercise,
      {
        "a)": {
          options: ["rango(A)=2 si a=0 o a=2; rango(A)=3 si a≠0,2.", "rango(A)=3 para todo a.", "rango(A)=1 si a=0 y rango(A)=3 en otro caso.", "rango(A)=2 para todo a."],
          correct: 0,
          solution: `Resolución:
1. Calculamos el determinante de A. Restamos la segunda fila a la tercera:
F₃←F₃-F₂.
Queda una tercera fila (0,0,-1), por lo que desarrollamos por ella:
det(A)=-det [[a,a-1],[a,1]]=a²-2a=a(a-2).
2. Si a≠0 y a≠2, det(A)≠0 y rango(A)=3.
3. Para a=0, la matriz tiene dos columnas independientes y su rango es 2.
4. Para a=2, las dos primeras filas coinciden, pero la tercera es independiente de ellas; por tanto, el rango también es 2.
Resultado final: rango(A)=2 para a=0 o a=2, y rango(A)=3 para a≠0,2.`
        },
        "b)": {
          options: ["A tiene inversa si a≠0 y a≠2.", "A tiene inversa para todo a.", "A tiene inversa solo si a=0 o a=2.", "A no tiene inversa para ningún a."],
          correct: 0,
          solution: `Resolución:
1. Una matriz cuadrada tiene inversa exactamente cuando su determinante es distinto de cero.
2. Del apartado anterior:
det(A)=a(a-2).
3. Este producto es distinto de cero cuando a≠0 y a≠2.
Resultado final: A tiene inversa para a∈ℝ\{0,2}.`
        }
      }
    ),
    makeMultipartOfficialQuestion(
      "mates2-algebra-extra-sistema-2024-junio",
      system2024Exercise,
      {
        "a)": {
          options: ["SCD si a≠2,5; SI si a=2; SCI si a=5.", "SCD para todo a.", "SCI si a=2; SI si a=5; SCD en otro caso.", "SI si a=2 o a=5; SCD en otro caso."],
          correct: 0,
          solution: `Resolución mediante Rouché-Frobenius:
1. La matriz de coeficientes es A=[[a,2,1],[2,a,1],[5,2,1]].
2. Calculamos su determinante:
det(A)=(a-5)(a-2).
3. Si a≠2,5, det(A)≠0, luego rango(A)=rango(A*)=3, igual al número de incógnitas: sistema compatible determinado.
4. Si a=2, las dos primeras ecuaciones tienen el mismo primer miembro y distintos términos independientes, 1 y 2. Por tanto, rango(A)<rango(A*): sistema incompatible.
5. Si a=5, la primera y la tercera ecuación coinciden. Las dos ecuaciones independientes son compatibles, de modo que rango(A)=rango(A*)=2<3: sistema compatible indeterminado.
Resultado final: SCD si a≠2,5; SI si a=2; SCI si a=5.`
        },
        "b)": {
          options: ["Para a=1, (x,y,z)=(0,0,1).", "Para a=1, (x,y,z)=(1,0,0).", "Para a=1, (x,y,z)=(0,1,0).", "Para a=1, el sistema es incompatible."],
          correct: 0,
          solution: `Resolución:
1. Para a=1 el sistema es:
{x+2y+z=1; 2x+y+z=1; 5x+2y+z=1}.
2. Restamos la primera ecuación de la segunda: x-y=0, luego x=y.
3. Restamos la primera ecuación de la tercera: 4x=0, luego x=0.
4. Entonces y=0 y, en la primera ecuación, z=1.
5. Comprobación: las tres ecuaciones se verifican con (0,0,1).
Resultado final: (x,y,z)=(0,0,1).`
        }
      }
    ),
    makeMultipartOfficialQuestion(
      "mates2-algebra-extra-heladeria-2024-julio",
      iceCreamExercise,
      {
        "a)": {
          options: ["x+y+z=157; x+2y+3z=278; x=kz.", "x+y+z=278; x+2y+3z=157; z=kx.", "x+y+z=157; x+2y+3z=278; y=kz.", "x+y+z=157; 3x+2y+z=278; x=ky."],
          correct: 0,
          solution: `Resolución:
1. Llamamos x, y, z al número de helados de una, dos y tres bolas, respectivamente.
2. El número total de helados da x+y+z=157.
3. La recaudación da x+2y+3z=278.
4. Los helados de una bola son k veces los de tres bolas: x=kz.
Resultado final: {x+y+z=157; x+2y+3z=278; x=kz}.`
        },
        "b)": {
          options: ["Hay solución única si k≠1; en ningún caso con solución única se venden los mismos de una y tres bolas.", "Hay solución única solo si k=1 y entonces x=z.", "Hay solución única para todo k>0.", "No hay solución única para ningún k."],
          correct: 0,
          solution: `Resolución:
1. Restamos la primera ecuación de la segunda:
y+2z=121, luego y=121-2z.
2. Sustituimos en x+y+z=157:
x+121-2z+z=157, luego x-z=36.
3. Como x=kz:
(k-1)z=36.
4. Si k≠1, obtenemos un único valor z=frac{36}{k-1}, y después valores únicos de x e y. El sistema tiene solución única.
5. Si k=1, la igualdad x=z contradice x-z=36; el sistema es incompatible.
6. Vender el mismo número de helados de una y tres bolas exigiría x=z y, por tanto, k=1, precisamente el caso sin solución.
Resultado final: solución única si k≠1; nunca se cumple x=z en un caso con solución única.`
        }
      }
    ),
    makeOfficialQuestion(
      "mates2-algebra-extra-rango-2023-junio",
      rank2023Exercise,
      ["rango(A)=2.", "rango(A)=3.", "rango(A)=1.", "rango(A)=4."],
      0,
      `Resolución:
1. La matriz tiene tres filas, por lo que su rango es como máximo 3.
2. Observamos la relación entre las filas:
F₃=2F₁-F₂.
Por tanto, las tres filas son linealmente dependientes y rango(A)≤2.
3. Las filas F₁=(1,1,1,1) y F₂=(0,1,2,1) no son proporcionales; luego son linealmente independientes y rango(A)≥2.
4. Reuniendo ambas desigualdades:
rango(A)=2.
Resultado final: rango(A)=2.`
    )
  ].filter(Boolean);

  const makeSinglePartQuestion = (id, blockId, exercise, partIndex, options, correct, solution) => {
    const part = exercise?.parts?.[partIndex];
    if (!exercise || !part) return null;
    const promptText = (part.paragraphs || []).map((paragraph) => paragraph.plain || "").join("\n")
      .replace(/^\s*[a-d](?:\.\d+)?\)\s*/i, "");
    const promptHtml = (part.paragraphs || []).map((paragraph) => paragraph.html || paragraph.plain || "").join("<br>")
      .replace(/^\s*[a-d](?:\.\d+)?\)\s*/i, "");
    return {
      id,
      rawBaseId: `${id}|${exercise.source}|${rawText(exercise)}|${part.label}`,
      source: exercise.source,
      blockId,
      text: rawText(exercise),
      statementHtml: rawHtml(exercise),
      parts: [{ label: part.label, text: promptText, html: promptHtml, options, correct, solution }],
      type: "corrected-official-exercise"
    };
  };

  const geometryBank = window.MATES_II_BLOCK_EXERCISES?.geometria || [];
  const geometry2026 = geometryBank.find((exercise) => /Dados los vectores/i.test(rawText(exercise)));
  const geometryBeam2024 = geometryBank.find((exercise) => /Carla está diseñando el tejado/i.test(rawText(exercise)));
  const geometryQuestions = [
    makeSinglePartQuestion("mates2-geometria-extra-coplanarios-2026", "geometria", geometry2026, 0,
      ["a=-2 o a=1.", "a=-1 o a=2.", "Solo a=1.", "No existe ningún valor real."], 0,
      `Resolución:
1. Tres vectores son coplanarios cuando su producto mixto es cero.
2. Formamos el determinante con sus coordenadas:
D=det [[1,-1,a],[2,a,1],[-1,1,-1]].
3. Desarrollamos el determinante:
D=a²+a-2=(a+2)(a-1).
4. Igualamos a cero:
(a+2)(a-1)=0.
Resultado final: a=-2 o a=1.`),
    makeSinglePartQuestion("mates2-geometria-extra-volumen-2026", "geometria", geometry2026, 1,
      ["a=3 o a=-4.", "a=4 o a=-3.", "a=-2 o a=1.", "Solo a=3."], 0,
      `Resolución:
1. El volumen del paralelepípedo es el valor absoluto del producto mixto:
V=|det [[1,-1,a],[2,a,1],[-1,1,-1]]|=|a²+a-2|.
2. Imponemos que el volumen sea 10:
|a²+a-2|=10.
3. Primer caso:
a²+a-2=10 ⇒ a²+a-12=0 ⇒ (a+4)(a-3)=0.
Así, a=-4 o a=3.
4. Segundo caso:
a²+a-2=-10 ⇒ a²+a+8=0. Su discriminante es 1-32<0, por lo que no tiene soluciones reales.
Resultado final: a=3 o a=-4.`),
    makeSinglePartQuestion("mates2-geometria-extra-simetrico-2026", "geometria", geometry2026, 2,
      ["P'=(-1,0,4).", "P'=(3,4,8).", "P'=(0,1,5).", "P'=(-2,-1,3)."], 0,
      `Resolución:
1. El plano es π:x+y+z-6=0 y su vector normal es n=(1,1,1).
2. La recta perpendicular al plano que pasa por P=(1,2,6), en forma paramétrica, es:
r:{x=1+t; y=2+t; z=6+t}.
3. Sustituimos en el plano:
(1+t)+(2+t)+(6+t)-6=0 ⇒ 3+3t=0 ⇒ t=-1.
El punto de corte es Q=(0,1,5).
4. Q es el punto medio de P y P'. Calculamos coordenada a coordenada:
frac{1+x'}{2}=0 ⇒ x'=-1,
frac{2+y'}{2}=1 ⇒ y'=0,
frac{6+z'}{2}=5 ⇒ z'=4.
Resultado final: P'=(-1,0,4).`)
    ,
    makeSinglePartQuestion("mates2-geometria-extra-distancia-sensores-2026", "geometria", geometry2026, 3,
      ["2√3 unidades.", "3√2 unidades.", "6 unidades.", "√3 unidades."], 0,
      `Resolución:
1. Del apartado anterior, los sensores están situados en P=(1,2,6) y P'=(-1,0,4).
2. Aplicamos la fórmula de la distancia entre dos puntos, escrita como una raíz completa:
d(P,P')=√{paren{1-(-1)}²+paren{2-0}²+paren{6-4}²}.
3. Sustituimos y operamos:
d(P,P')=√{2²+2²+2²}=√{12}=2√3.
Resultado final: la distancia entre los dos sensores es 2√3 unidades.`),
    makeSinglePartQuestion("mates2-geometria-extra-longitud-viga-2024", "geometria", geometryBeam2024, 1,
      ["3√5 unidades.", "5√3 unidades.", "√29 unidades.", "9 unidades."], 0,
      `Resolución:
1. Los extremos de la viga son A=(2,-1,3) y B=(-2,4,5).
2. Calculamos el vector que une los extremos:
vector{AB}=B-A=(-2-2,4-(-1),5-3)=(-4,5,2).
3. La longitud de la viga es el módulo de ese vector:
|vector{AB}|=√{(-4)²+5²+2²}=√{16+25+4}=√45=3√5.
Resultado final: la longitud de la viga es 3√5 unidades.`)
  ].filter(Boolean);
  const symmetricQuestion = geometryQuestions.find((question) => question.id === "mates2-geometria-extra-simetrico-2026");
  const symmetricContext = geometry2026?.parts?.[1]?.paragraphs?.[1];
  if (symmetricQuestion && symmetricContext) {
    symmetricQuestion.text = `${symmetricQuestion.text}\n${symmetricContext.plain || ""}`.trim();
    symmetricQuestion.statementHtml = `${symmetricQuestion.statementHtml || ""}<p>${symmetricContext.html || symmetricContext.plain || ""}</p>`;
    symmetricQuestion.rawBaseId = `${symmetricQuestion.rawBaseId}|${symmetricContext.plain || ""}`;
  }
  window.MATES_II_EXTRA_BLOCK_QUESTIONS.geometria = geometryQuestions;

  const probabilityBank = window.MATES_II_BLOCK_EXERCISES?.["probabilidad-estadistica"] || [];
  const eventsExercise = probabilityBank.find((exercise) => /P\(A∪B\)=0,3/i.test(rawText(exercise)));
  const cardsExercise = probabilityBank.find((exercise) => /40 cartas[\s\S]*punto verde/i.test(rawText(exercise)));
  window.MATES_II_EXTRA_BLOCK_QUESTIONS["probabilidad-estadistica"] = [
    makeSinglePartQuestion("mates2-prob-extra-sucesos-1-2024", "probabilidad-estadistica", eventsExercise, 0,
      ["P(B)=0,2 y P(A∩B̄)=0,1.", "P(B)=0,3 y P(A∩B̄)=0,2.", "P(B)=0,1 y P(A∩B̄)=0,1.", "P(B)=0,4 y P(A∩B̄)=0,3."], 0,
      `Resolución:
1. Usamos P(A∪B)=P(A)+P(B)-P(A∩B).
2. Sustituimos:
0,3=0,2+P(B)-0,1.
Por tanto, P(B)=0,2.
3. El suceso A se descompone en A∩B y A∩B̄:
P(A∩B̄)=P(A)-P(A∩B)=0,2-0,1=0,1.
Resultado final: P(B)=0,2 y P(A∩B̄)=0,1.`),
    makeSinglePartQuestion("mates2-prob-extra-sucesos-2-2024", "probabilidad-estadistica", eventsExercise, 1,
      ["P(A|B)=1/2 y P(B|A)=1/2.", "P(A|B)=1/3 y P(B|A)=2/3.", "Ambas probabilidades valen 1.", "P(A|B)=0,2 y P(B|A)=0,1."], 0,
      `Resolución:
1. Aplicamos la definición de probabilidad condicionada:
P(A|B)=frac{P(A∩B)}{P(B)}=frac{0,1}{0,2}=frac{1}{2}.
2. De la misma forma:
P(B|A)=frac{P(A∩B)}{P(A)}=frac{0,1}{0,2}=frac{1}{2}.
Resultado final: P(A|B)=P(B|A)=1/2.`),
    makeSinglePartQuestion("mates2-prob-extra-cartas-1-2024", "probabilidad-estadistica", cardsExercise, 0,
      ["11/156.", "11/160.", "7/40.", "21/156."], 0,
      `Resolución:
1. Tienen punto verde las 4 cartas solo verdes y las 7 que llevan ambos puntos: 11 cartas.
2. Sin reemplazamiento, después de sacar una verde quedan 10 verdes entre 39 cartas.
3. Multiplicamos:
P=frac{11}{40}·frac{10}{39}=frac{110}{1560}=frac{11}{156}.
Resultado final: 11/156.`),
    makeSinglePartQuestion("mates2-prob-extra-cartas-2-2024", "probabilidad-estadistica", cardsExercise, 1,
      ["7/11.", "7/40.", "11/40.", "4/11."], 0,
      `Resolución:
1. Condicionamos a que la carta tenga punto verde. Hay 11 cartas verdes en total.
2. De esas 11, las 7 cartas con los dos puntos también tienen punto rojo.
3. Por tanto:
P(rojo|verde)=frac{7}{11}.
Resultado final: 7/11.`)
  ].filter(Boolean);
})();

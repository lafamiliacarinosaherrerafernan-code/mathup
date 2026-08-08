(function () {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};
  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};

  const para = (plain, html = plain) => ({ plain, html });
  const part = (label, paragraphs) => ({ label, paragraphs });
  const copy = (paragraphs) => (paragraphs || []).map((p) => ({ ...p }));
  const byYear = (bank, block) => (bank?.[block] || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2014"));
  const mates = (block) => byYear(window.MATES_II_BLOCK_EXERCISES, block);
  const ccss = (block) => byYear(window.CCSS_II_BLOCK_EXERCISES, block);

  // Reconstrucción estructural: cada apartado oficial pasa a ser una pregunta
  // independiente, conservando el enunciado y la convocatoria originales.
  for (const id of ["mates2-algebra-fcf8bfc9f471", "mates2-algebra-a1d5209c3fe7", "mates2-algebra-829598f18a66"]) {
    const exercise = mates("algebra").find((e) => e.id === id);
    if (exercise?.parts?.length === 1) exercise.parts.unshift(part("a)", copy(exercise.statement)));
  }

  const mAnA = mates("analisis").find((e) => e.id === "mates2-analisis-565395de74d3");
  if (mAnA?.parts?.length === 2) {
    const secondExercise = mAnA.parts[1].paragraphs.splice(1);
    mAnA.parts[0].label = "1A a)";
    mAnA.parts[1].label = "1A b)";
    mAnA.parts.push(part("2A", secondExercise));
  }
  const mAnB = mates("analisis").find((e) => e.id === "mates2-analisis-c1bd298a3533");
  if (mAnB?.parts?.length === 3) {
    const setup = mAnB.parts[0].paragraphs.splice(1);
    mAnB.parts.unshift(part("1B a)", copy(mAnB.statement)));
    mAnB.parts[1].label = "1B b)";
    mAnB.parts[2].label = "2B a)";
    mAnB.parts[2].paragraphs = [...setup, ...mAnB.parts[2].paragraphs];
    mAnB.parts[3].label = "2B b)";
  }
  const mAnSeptA = mates("analisis").find((e) => e.id === "mates2-analisis-cf4f1e3eed37");
  if (mAnSeptA?.parts?.length === 2) {
    const setup = mAnSeptA.parts[0].paragraphs.splice(1);
    mAnSeptA.parts.unshift(part("1A a)", copy(mAnSeptA.statement)));
    mAnSeptA.parts[1].label = "1A b)";
    mAnSeptA.parts.splice(2, 0, part("2A a)", setup));
    mAnSeptA.parts[3].label = "2A b)";
  }
  const mAnSeptB = mates("analisis").find((e) => e.id === "mates2-analisis-8ac86b8260ce");
  if (mAnSeptB?.parts?.length === 2) {
    const integralText = mAnSeptB.parts[1].paragraphs.splice(1);
    mAnSeptB.parts[0].label = "1B a)";
    mAnSeptB.parts[1].label = "1B b)";
    mAnSeptB.parts.push(
      part("2B A", [integralText[0], integralText[1]]),
      part("2B B", [para("Calcula B = ∫ 2/(4+x²) dx.")])
    );
  }

  function splitCcss(exercise, labels) {
    if (!exercise || exercise.__split2014) return;
    const original = exercise.parts;
    const markerIndex = original.findIndex((p) => p.paragraphs.some((q) => /^2\./.test(q.plain)));
    if (markerIndex < 0) return;
    const markerPart = original[markerIndex];
    const markerPos = markerPart.paragraphs.findIndex((q) => /^2\./.test(q.plain));
    const setup2 = markerPart.paragraphs.splice(markerPos);
    original.forEach((p, i) => { p.label = labels[i] || p.label; });
    const insertAt = markerIndex + 1;
    original[insertAt].paragraphs = [...setup2, ...original[insertAt].paragraphs];
    exercise.__split2014 = true;
  }
  splitCcss(ccss("algebra").find((e) => e.id === "ccss2-algebra-02b4b2820926"), ["1 a)", "1 b)", "2 a)", "2 b)"]);
  splitCcss(ccss("algebra").find((e) => e.id === "ccss2-algebra-e879270a5fbb"), ["1 a)", "1 b)", "1 c)", "2 a)", "2 b)"]);
  splitCcss(ccss("algebra").find((e) => e.id === "ccss2-algebra-a49ab60cb1cd"), ["1 b)", "2 a)", "2 b)"]);
  splitCcss(ccss("algebra").find((e) => e.id === "ccss2-algebra-4a990f1f5867"), ["1 a)", "1 b)", "1 c)", "2 a)", "2 b)"]);

  const cAlgSeptA = ccss("algebra").find((e) => e.id === "ccss2-algebra-a49ab60cb1cd");
  if (cAlgSeptA && !cAlgSeptA.parts.some((p) => p.label === "1 a)")) {
    cAlgSeptA.parts.unshift(part("1 a)", [copy(cAlgSeptA.statement)[0]]));
  }

  function splitAnalysis(exercise, labels) {
    if (!exercise || exercise.__split2014) return;
    const original = exercise.parts;
    const markerIndex = original.findIndex((p) => p.paragraphs.some((q) => /^4\./.test(q.plain)));
    if (markerIndex < 0) return;
    const markerPart = original[markerIndex];
    const markerPos = markerPart.paragraphs.findIndex((q) => /^4\./.test(q.plain));
    const setup4 = markerPart.paragraphs.splice(markerPos);
    original.forEach((p, i) => { p.label = labels[i] || p.label; });
    if (original[markerIndex + 1]) original[markerIndex + 1].paragraphs = [...setup4, ...original[markerIndex + 1].paragraphs];
    else original.push(part("4", setup4));
    exercise.__split2014 = true;
  }
  splitAnalysis(ccss("analisis").find((e) => e.id === "ccss2-analisis-25ab9896f672"), ["3 a)", "3 b)", "3 c)", "4"]);
  splitAnalysis(ccss("analisis").find((e) => e.id === "ccss2-analisis-29cc935ae7df"), ["3 a)", "3 b)", "4 a)", "4 b)"]);
  splitAnalysis(ccss("analisis").find((e) => e.id === "ccss2-analisis-503ce56f1d1b"), ["3 a)", "3 b)", "4 a)", "4 b)"]);
  splitAnalysis(ccss("analisis").find((e) => e.id === "ccss2-analisis-0b11fed64004"), ["3 a)", "3 b)", "3 c)", "4"]);

  const ans = (correctText, distractors, solution) => ({
    options: [correctText, ...distractors],
    correct: 0,
    solution: `Resolución:\n${solution}`
  });
  const graph = (text) => ans(text, ["La región indicada no cumple todas las restricciones.", "Solo se representa una de las fronteras.", "La región factible es vacía."], `Representamos cada frontera, comprobamos con un punto de prueba qué semiplano satisface cada desigualdad y señalamos la intersección común.\n${text}`);

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-fcf8bfc9f471": {
      "a)": ans("|−A|=5, |AA⁻¹|=1, |Aᵗ|=5 y |A³|=125", ["−5, 5, −5 y 15", "5, 1, −5 y 25", "−5, 1, 5 y 125"], `Como A es de orden 2, |−A|=(−1)²|A|=5.\nAA⁻¹=I ⇒ |AA⁻¹|=|I|=1.\nLa trasposición no altera el determinante: |Aᵗ|=|A|=5.\nPor la propiedad del producto: |A³|=|A|³=5³=125.`),
      "b)": ans("Los determinantes valen −6 y −800", ["6 y 800", "−3 y −400", "10 y −80"], `Sea D=|r₁,r₂,r₃|=2.\nEl primer determinante tiene filas r₃−r₁, r₂+r₁ y 3r₁. La matriz de transformación de filas tiene determinante −3; por tanto, D₁=−3D=−6.\nEn el segundo desarrollamos por la primera fila. Sale el factor 5 y, después, el factor 2 de la primera fila del menor:\nD₂=10·|r₁,10r₃,4r₂|=10·40·|r₁,r₃,r₂|=400·(−D)=−800.`)
    },
    "mates2-algebra-a1d5209c3fe7": {
      "a)": ans("a=8; (x,y,z)=(4+t,5t,3t), t∈ℝ", ["a=−8; solución única", "a=8; sistema incompatible", "a=6; (x,y,z)=(t,2t,3t)"], `La matriz de coeficientes es A=pmatrix{1&−2&3\\2&−1&1\\1&−5&a}.\nCalculamos por Sarrus: det(A)=3a−24=3(a−8).\nPara que sea compatible indeterminado debe ser det(A)=0, luego a=8.\nCon a=8, al reducir por Gauss obtenemos 3y−5z=0. Tomamos z=3t, de donde y=5t y, usando la primera ecuación, x=4+t.\nPor tanto, (x,y,z)=(4+t,5t,3t).`),
      "b)": ans("(x,y,z)=(5,5,3)", ["(4,4,3)", "(5,5,1)", "(3,3,5)"], `Partimos de la solución general (x,y,z)=(4+t,5t,3t).\nImponemos x=y:\n4+t=5t ⇒ 4=4t ⇒ t=1.\nSustituimos: x=5, y=5, z=3. Comprobando en las tres ecuaciones se verifican todas.`)
    },
    "mates2-algebra-829598f18a66": {
      "a)": ans("rango(A)=3 si m≠0,6; rango(A)=2 si m=0 o m=6", ["rango 3 para todo m", "rango 2 si m=0 y rango 1 si m=6", "rango 2 si m≠0,6"], `Calculamos el determinante de la matriz:\ndet(A)=m²−6m=m(m−6).\nSi m≠0,6, el determinante es distinto de cero y rango(A)=3.\nSi m=0 o m=6, el determinante se anula. En ambos casos existe un menor de orden 2 no nulo; por tanto, rango(A)=2.`),
      "b)": ans("A tiene inversa si m≠0 y m≠6", ["Solo si m=0", "Solo si m=6", "Para todo m∈ℝ"], `Una matriz cuadrada tiene inversa exactamente cuando su determinante no es cero.\ndet(A)=m(m−6)≠0 ⇔ m≠0 y m≠6.`)
    },
    "mates2-algebra-059ea1b6822c": {
      "Resultado": ans("A=pmatrix{2/3&7\\14/3&10}, B=pmatrix{17/3&4\\8/3&11}", ["A=pmatrix{7&18\\12&31}, B=pmatrix{−5&3\\2&−1}", "A=pmatrix{1&3\\2&5}, B=I", "A=pmatrix{17/3&4\\8/3&11}, B=pmatrix{2/3&7\\14/3&10}"], `Del sistema 2A+B=C² y A−B=C⁻¹, sumamos ambas ecuaciones:\n3A=C²+C⁻¹ ⇒ A=(C²+C⁻¹)/3.\nComo C=pmatrix{1&3\\2&5}, det(C)=−1,\nC⁻¹=pmatrix{−5&3\\2&−1} y C²=pmatrix{7&18\\12&31}.\nAsí,\nA=pmatrix{2/3&7\\14/3&10}.\nFinalmente, B=C²−2A=pmatrix{17/3&4\\8/3&11}.\nLa sustitución en las dos ecuaciones confirma el resultado.`)
    },
    "mates2-analisis-565395de74d3": {
      "1A a)": ans("a=1 y b=−2", ["a=3 y b=0", "a=−1 y b=2", "a=1 y b=2"], `Continuidad en x=0:\nlim_{x→0⁻}f(x)=a,  f(0)=a,  lim_{x→0⁺}f(x)=b+3.\nPor tanto, a=b+3.\nDerivamos cada rama:\nf₁'(x)=2x−2 y f₂'(x)=2x+b eˣ.\nDerivabilidad en x=0: f₁'(0)=−2=f₂'(0)=b, luego b=−2.\nSustituyendo en a=b+3 obtenemos a=1.`),
      "1A b)": ans("y=−2x+1", ["y=2x+1", "y=−2x−1", "y=x+1"], `Con a=1 y b=−2 tenemos f(0)=1 y f'(0)=−2.\nUsamos y−f(0)=f'(0)(x−0):\ny−1=−2x ⇒ y=−2x+1.`),
      "2A": ans("I=4−8/e", ["I=4+8/e", "I=8/e", "I=1−2/e"], `Buscamos una primitiva por partes o por identificación:\n∫(x²+x+1)e⁻ˣ dx=−(x²+3x+4)e⁻ˣ+C.\nAplicamos la regla de Barrow:\nI=[−(x²+3x+4)e⁻ˣ]₀¹=−8/e−(−4)=4−8/e.`)
    },
    "mates2-analisis-c1bd298a3533": {
      "1B a)": ans("Máximos en x=±1, mínimo en x=0", ["Máximo en x=0", "Mínimos en x=±1", "No tiene extremos"], `f(x)=1+x²e⁻ˣ².\nf'(x)=2x(1−x²)e⁻ˣ².\nLos puntos críticos son x=−1,0,1. Estudiamos el signo en la recta real:\n(+)\u00a0en (−∞,−1), (−)\u00a0en (−1,0), (+)\u00a0en (0,1), (−)\u00a0en (1,∞).\nPor tanto hay máximos relativos en x=−1 y x=1, de valor 1+1/e, y mínimo relativo en x=0, de valor 1.`),
      "1B b)": ans("Asíntota horizontal y=1 cuando x→±∞", ["Asíntota horizontal y=0", "Asíntota oblicua y=x", "No tiene asíntotas"], `Como x²e⁻ˣ²→0 cuando x→±∞,\nlim_{x→±∞}f(x)=1.\nPor ello y=1 es asíntota horizontal en ambos extremos. No hay asíntotas verticales porque la función está definida para todo x, ni oblicuas al existir horizontal.`),
      "2B a)": ans("A(c)=4/3−1/c−1/(3c³)", ["A(c)=1/c+1/(3c³)", "A(c)=4/3+1/c", "A(c)=c³/3+c"], `La función es positiva para x≥1, así que\nA(c)=∫₁ᶜ (1+x²)/x⁴ dx=∫₁ᶜ(x⁻⁴+x⁻²)dx.\nUna primitiva es −1/(3x³)−1/x.\nPor Barrow:\nA(c)=[−1/(3x³)−1/x]₁ᶜ=4/3−1/c−1/(3c³).`),
      "2B b)": ans("lim_{c→∞}A(c)=4/3", ["0", "1/3", "+∞"], `Usamos A(c)=4/3−1/c−1/(3c³).\nCuando c→∞, 1/c→0 y 1/(3c³)→0. Por tanto, el límite vale 4/3.`)
    },
    "mates2-analisis-cf4f1e3eed37": {
      "1A a)": ans("Convexa en (−∞,−1), cóncava en (−1,∞); sin puntos de inflexión", ["Cóncava en todo ℝ", "Convexa en todo su dominio", "Punto de inflexión en x=−1"], `El dominio excluye x=−1.\nf'(x)=1/(x+1)² y f''(x)=−2/(x+1)³.\nEn (−∞,−1), f''>0: la función es convexa. En (−1,∞), f''<0: es cóncava.\nAunque cambia la curvatura en x=−1, ese valor no pertenece al dominio; por tanto, no es punto de inflexión.`),
      "1A b)": ans("En P₁=(−2,−3/2) y P₂=(0,−1/2)", ["Solo en (0,−1/2)", "En x=−1", "No existe ningún punto"], `La recta y=x−2 tiene pendiente 1. Buscamos f'(x)=1:\n1/(x+1)²=1 ⇒ (x+1)²=1 ⇒ x=−2 o x=0.\nCalculamos las ordenadas:\nf(−2)=−3/2 y f(0)=−1/2.\nLos puntos son (−2,−3/2) y (0,−1/2).`),
      "2A a)": graph("La región queda entre y=sen x e y=−sen x, desde x=π/2 hasta x=3π/2, con corte en x=π."),
      "2A b)": ans("Área=4", ["Área=2", "Área=π", "Área=1"], `Las curvas se cortan cuando sen x=−sen x, es decir, sen x=0; dentro del intervalo ocurre en x=π.\nEn [π/2,π], sen x está arriba; en [π,3π/2], −sen x está arriba.\nÁrea=∫_{π/2}^{π}2sen x dx+∫_{π}^{3π/2}(−2sen x)dx=2+2=4.`)
    },
    "mates2-analisis-8ac86b8260ce": {
      "1B a)": ans("Decrece en (−∞,−1/2), crece en (−1/2,∞) y tiene mínimo (−1/2,√3/2)", ["Máximo en x=−1/2", "Crece en todo ℝ", "Mínimo en x=1/2"], `El radicando x²+x+1 es siempre positivo.\nf'(x)=(2x+1)/(2√(x²+x+1)).\nEl denominador es positivo y 2x+1 se anula en x=−1/2. En la recta real el signo es negativo antes y positivo después.\nAsí, decrece en (−∞,−1/2), crece en (−1/2,∞) y presenta un mínimo en (−1/2,√3/2).`),
      "1B b)": ans("Sí: y=x+1/2", ["Sí: y=x−1/2", "Sí: y=−x", "No tiene asíntota oblicua"], `Para x→+∞:\nm=lim f(x)/x=1.\nn=lim[f(x)−x]. Racionalizamos:\n√(x²+x+1)−x=(x+1)/(√(x²+x+1)+x)→1/2.\nLa asíntota oblicua es y=x+1/2.`),
      "2B A": ans("A=(1/2)ln|e²ˣ−1|+C", ["ln|eˣ−e⁻ˣ|+C", "arctan(eˣ)+C", "eˣ/(eˣ−e⁻ˣ)+C"], `Hacemos t=eˣ, dt=eˣdx.\nA=∫dt/(t−1/t)=∫t/(t²−1)dt.\nCon u=t²−1, du=2t dt:\nA=(1/2)ln|t²−1|+C=(1/2)ln|e²ˣ−1|+C.`),
      "2B B": ans("B=arctan(x/2)+C", ["B=2arctan x+C", "B=ln(4+x²)+C", "B=x/(4+x²)+C"], `B=∫2/(4+x²)dx.\nUsamos ∫dx/(a²+x²)=(1/a)arctan(x/a)+C con a=2:\nB=2·(1/2)arctan(x/2)+C=arctan(x/2)+C.`)
    }
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-02b4b2820926": {
      "1 a)": ans("M=pmatrix{1&−1&1\\−1&3&5\\1&5&37}", ["pmatrix{0&1&0\\1&−1&1\\0&1&6}", "pmatrix{1&1&1\\1&3&5\\1&5&36}", "pmatrix{2&−1&1\\−1&2&5\\1&5&37}"], `Primero calculamos 2I+A=pmatrix{0&1&0\\1&−1&1\\0&1&6}.\nElevamos al cuadrado multiplicando fila por columna:\nM=(2I+A)²=pmatrix{1&−1&1\\−1&3&5\\1&5&37}.`),
      "1 b)": ans("X=pmatrix{0&1\\−1/2&−1/2}", ["pmatrix{−1&−2\\1&0}", "pmatrix{0&−1\\1/2&1/2}", "No existe X"], `De X·B=I se deduce X=B⁻¹.\ndet(B)=(−1)·0−(−2)·1=2≠0, luego existe inversa.\nB⁻¹=1/2·pmatrix{0&2\\−1&−1}=pmatrix{0&1\\−1/2&−1/2}.\nComprobamos que X·B=I.`),
      "2 a)": ans("system{T+A+C=45;2C=T+A;T=2(A−C)}", ["system{T+A+C=45;C=T+A;T=A−C}", "system{T+A=45;2C=T−A;T=2A}", "system{T+A+C=45;C=2(T+A);A=2(T−C)}"], `Llamamos T, A y C a las pólizas de Toledo, Albacete y Cuenca.\nTotal: T+A+C=45.\nCuenca es la media: C=(T+A)/2 ⇒ 2C=T+A.\nToledo es el doble de Albacete menos Cuenca: T=2(A−C).`),
      "2 b)": ans("Toledo 10, Albacete 20 y Cuenca 15", ["15, 15 y 15", "20, 10 y 15", "10, 15 y 20"], `Resolvemos system{T+A+C=45;2C=T+A;T=2(A−C)}.\nDe las dos primeras: 3C=45 ⇒ C=15.\nEntonces T+A=30 y T=2A−30.\nSustituyendo: 3A−30=30 ⇒ A=20 y T=10.`)
    },
    "ccss2-algebra-e879270a5fbb": {
      "1 a)": graph("La región factible está en el primer cuadrante y por debajo de −x+3y=5 y 2x+y=4."),
      "1 b)": ans("(0,0), (0,5/3), (1,2) y (2,0)", ["(0,0), (0,5), (2,4)", "(0,0), (1,1), (4,0)", "(0,5/3), (1,2) solamente"], `Cortes con los ejes: (0,0), (0,5/3) y (2,0).\nIntersección de −x+3y=5 y 2x+y=4:\ny=4−2x; −x+3(4−2x)=5 ⇒ x=1, y=2.\nLos vértices son (0,0), (0,5/3), (1,2) y (2,0).`),
      "1 c)": ans("Mínimo en (1,2), con z=−8", ["Mínimo en (0,0), z=0", "Mínimo en (2,0), z=−4", "Mínimo en (0,5/3), z=−5"], `Evaluamos z=−2x−3y en los vértices:\nz(0,0)=0; z(0,5/3)=−5; z(1,2)=−8; z(2,0)=−4.\nEl valor mínimo es −8 y se alcanza en (1,2).`),
      "2 a)": ans("system{x+y+z=10;80x+150y+200z=1250;80x=200z}", ["system{x+y+z=1250;80x+150y+200z=10;x=z}", "system{x+y+z=10;80x+150y+200z=1250;x=z}", "system{x+y+z=10;80x+150y+200z=1250;150y=200z}"], `Sean x,y,z los empleados de grados 1,2,3.\nNúmero total: x+y+z=10.\nCoste: 80x+150y+200z=1250.\nIgual gasto en grados 1 y 3: 80x=200z.`),
      "2 b)": ans("5 empleados de grado 1, 3 de grado 2 y 2 de grado 3", ["3, 5 y 2", "5, 2 y 3", "4, 4 y 2"], `Resolvemos el sistema. De 80x=200z obtenemos 2x=5z.\nLa solución entera compatible con x+y+z=10 y el coste total es x=5, y=3, z=2.\nComprobación: 5+3+2=10 y 80·5+150·3+200·2=1250.`)
    },
    "ccss2-algebra-a49ab60cb1cd": {
      "1 a)": ans("X=(B−I)(A−2I)⁻¹", ["X=(A−2I)⁻¹(B−I)", "X=(B+I)(A+2I)⁻¹", "X=B−I−A"], `I³=I. Partimos de I−2X+XA=B.\nPasamos I: −2X+XA=B−I.\nSacamos factor común X por la izquierda: X(A−2I)=B−I.\nMultiplicamos a la derecha por (A−2I)⁻¹:\nX=(B−I)(A−2I)⁻¹.`),
      "1 b)": ans("X=pmatrix{−2&0\\2&3}", ["pmatrix{2&0\\−2&3}", "pmatrix{−2&0\\0&3}", "pmatrix{−1&0\\1&1}"], `Sea L=pmatrix{−1&0\\1&1} y D=pmatrix{2&0\\0&3}. De L·X=D:\nX=L⁻¹D.\ndet(L)=−1 y L⁻¹=pmatrix{−1&0\\1&1}.\nMultiplicando: X=pmatrix{−2&0\\2&3}.`),
      "2 a)": ans("system{3x+4y+5z=320;y=3z;2y=x+z}", ["system{x+y+z=320;y=3z;y=x+z}", "system{3x+4y+5z=320;x=3z;2x=y+z}", "system{3x+4y+5z=320;y=z;2y=x+z}"], `Sean x,y,z los menús A,B,C.\nIngreso: 3x+4y+5z=320.\nSe venden tres veces más B que C: y=3z.\nB es la media de A y C: y=(x+z)/2 ⇒ 2y=x+z.`),
      "2 b)": ans("A: 50, B: 30, C: 10", ["A: 30, B: 50, C: 10", "A: 40, B: 30, C: 20", "A: 50, B: 10, C: 30"], `De y=3z y 2y=x+z resulta x=5z.\nSustituimos en el ingreso:\n3(5z)+4(3z)+5z=320 ⇒ 32z=320 ⇒ z=10.\nEntonces y=30 y x=50.`)
    },
    "ccss2-algebra-4a990f1f5867": {
      "1 a)": ans("Maximizar B=18000x+12000y", ["Minimizar B=18000x+12000y", "Maximizar B=18000x−12000y", "Maximizar B=x+y"], `Si x e y son los trayectos de los camiones A y B, cada trayecto aporta respectivamente 18000 y 12000 euros. La función objetivo es maximizar B=18000x+12000y.`),
      "1 b)": graph("Restricciones: x≥y, x≤4, x≥0, y≥0. El recinto triangular tiene vértices (0,0), (4,0) y (4,4)."),
      "1 c)": ans("A hace 4 trayectos y B hace 4; beneficio 120000 €", ["A 4 y B 0; 72000 €", "A 0 y B 4; 48000 €", "A 2 y B 2; 60000 €"], `Evaluamos la función en los vértices:\nB(0,0)=0; B(4,0)=72000; B(4,4)=120000.\nEl máximo se alcanza en (4,4): ambos camiones realizan 4 trayectos y el beneficio es 120000 €.`),
      "2 a)": ans("system{5x+6y+7z=53;2x+3y+2z=20;x+y+z=9}", ["system{x+y+z=53;5x+6y+7z=20;2x+3y+2z=9}", "system{5x+2y+z=53;6x+3y+z=20;7x+2y+z=9}", "system{5x+6y+7z=53;2x+3y+2z=20;x+y+z=20}"], `Sean x,y,z los paneles A,B,C.\nMontaje: 5x+6y+7z=53.\nPintura: 2x+3y+2z=20.\nAcabado: x+y+z=9.`),
      "2 b)": ans("4 paneles A, 2 paneles B y 3 paneles C", ["3, 2 y 4", "4, 3 y 2", "2, 4 y 3"], `Restamos dos veces la tercera ecuación a la segunda: y=2.\nEntonces x+z=7.\nEn la primera: 5x+12+7z=53 ⇒ 5x+7z=41.\nCon x=7−z: 35−5z+7z=41 ⇒ z=3 y x=4.`)
    },
    "ccss2-analisis-25ab9896f672": {
      "3 a)": ans("t=0", ["t=1", "t=−1", "Cualquier t"], `La rama izquierda es |x−t|. Para continuidad en 0:\nlim_{x→0⁻}f(x)=|−t|=|t|, f(0)=|t| y lim_{x→0⁺}f(x)=0.\nIgualamos |t|=0, luego t=0.`),
      "3 b)": ans("Mínimo relativo en (1,−1)", ["Máximo en (1,−1)", "Mínimo en (0,0)", "No tiene extremos"], `En (0,∞), f(x)=x²−2x.\nf'(x)=2x−2=0 ⇒ x=1.\nf''(x)=2>0, por lo que es mínimo. f(1)=−1.`),
      "3 c)": ans("Decrece en (0,1) y crece en (1,∞)", ["Crece en todo (0,∞)", "Decrece en todo (0,∞)", "Crece en (0,1) y decrece después"], `f'(x)=2x−2. En la recta real, f'<0 si 0<x<1 y f'>0 si x>1. Por tanto, decrece en (0,1) y crece en (1,∞).`),
      "4": ans("a=1, b=−2, c=0", ["a=−1,b=2,c=0", "a=1,b=2,c=0", "a=2,b=−1,c=0"], `Como pasa por (0,0), c=0.\nf'(x)=4ax³+2bx. Mínimo en x=1: f'(1)=4a+2b=0 ⇒ 2a+b=0.\nPendiente 24 en x=2: f'(2)=32a+4b=24 ⇒ 8a+b=6.\nResolvemos system{2a+b=0;8a+b=6}: a=1, b=−2. Además f''(1)=12a+2b=8>0, luego realmente es mínimo.`)
    },
    "ccss2-analisis-29cc935ae7df": {
      "3 a)": ans("t=2", ["t=0", "t=−2", "t=1"], `En x=2, la rama izquierda vale |2|−t=2−t. El límite derecho es 2²−6·2+8=0.\nPara continuidad: 2−t=0 ⇒ t=2.`),
      "3 b)": graph("Para t=1: y=|x|−1 hasta x=2 y y=x²−6x+8 para x>2, ambas ramas unidas en (2,1) solo si se representa el valor correspondiente a t=1."),
      "4 a)": ans("Máximo a la hora t=1, con 86 %", ["t=4, 59 %", "t=2, 79 %", "t=5, 70 %"], `f'(t)=6t²−30t+24=6(t−1)(t−4).\nEl signo cambia de positivo a negativo en t=1: máximo.\nf(1)=2−15+24+75=86.`),
      "4 b)": ans("Mínimo a la hora t=4, con 59 %", ["t=1, 86 %", "t=3, 66 %", "t=5, 70 %"], `En t=4 el signo de f' cambia de negativo a positivo: mínimo.\nf(4)=2·64−15·16+24·4+75=59.`)
    },
    "ccss2-analisis-503ce56f1d1b": {
      "3 a)": ans("t=−1", ["t=0", "t=1", "t=−2"], `En x=1, f(1)=t. El límite por la derecha es 1²−2·1=−1. Para continuidad t=−1.`),
      "3 b)": graph("Para t=0: y=x²+2x si x<−1; y=0 en [−1,1]; y=x²−2x si x>1."),
      "4 a)": ans("Semana 16; concentración 904/3", ["Semana 28; 40/3", "Semana 22; 200", "Semana 12; 0"], `f'(t)=t²−44t+448=(t−16)(t−28).\nEl signo pasa de positivo a negativo en t=16, luego allí hay máximo.\nf(16)=16³/3−22·16²+448·16−2600=904/3.`),
      "4 b)": ans("Semana 28; concentración 40/3", ["Semana 16; 904/3", "Semana 22; 0", "Semana 32; 200"], `En t=28 el signo de f' pasa de negativo a positivo: mínimo.\nf(28)=28³/3−22·28²+448·28−2600=40/3.`)
    },
    "ccss2-analisis-0b11fed64004": {
      "3 a)": ans("No es continua: límite izquierdo 1 y f(−1)=2", ["Es continua", "Límite izquierdo 2 y valor 1", "Tiene discontinuidad infinita"], `lim_{x→−1⁻}(x+2)²=1.\nComo −1 pertenece a la rama central, f(−1)=2, y el límite derecho también vale 2.\nLos límites laterales no coinciden; existe discontinuidad de salto.`),
      "3 b)": ans("Mínimo relativo en (2,0)", ["Máximo en (2,0)", "Mínimo en (1,2)", "No hay extremos"], `En (1,4), f(x)=(x−2)². f'(x)=2(x−2), que cambia de negativo a positivo en x=2. Por tanto, (2,0) es un mínimo relativo.`),
      "3 c)": ans("Decrece en (1,2) y crece en (2,∞)", ["Crece en todo", "Decrece en todo", "Crece en (1,2) y decrece después"], `f'(x)=2(x−2). Es negativa en (1,2) y positiva en (2,∞).`),
      "4": ans("a=1, b=−3, c=0, d=2", ["a=−1,b=3,c=0,d=2", "a=1,b=−2,c=0,d=1", "a=2,b=−3,c=1,d=0"], `Máximo en (0,2): f(0)=d=2 y f'(0)=c=0; además necesitaremos b<0.\nInflexión en (1,0): f(1)=a+b+c+d=0 ⇒ a+b=−2; f''(1)=6a+2b=0 ⇒ 3a+b=0.\nResolvemos system{a+b=−2;3a+b=0}: a=1, b=−3. Como f''(0)=−6<0, (0,2) es máximo.`)
    },
    "ccss2-probabilidad-e61544a8b3f8": {
      "a)": ans("0,49", ["0,50", "0,41", "0,04"], `Sea T “ve televisión” y L “lee”.\nP(T∪L)=P(T)+P(L)−P(T∩L)=0,40+0,10−0,01=0,49.`),
      "b)": ans("0,025", ["0,10", "0,01", "0,40"], `P(L|T)=P(L∩T)/P(T)=0,01/0,40=0,025.`)
    },
    "ccss2-probabilidad-0a29b51e1d4c": {
      "a)": ans("0,0155", ["0,0200", "0,0100", "0,0255"], `Por la probabilidad total:\nP(D)=0,15·0,02+0,20·0,03+0,65·0,01=0,0155.`),
      "b)": ans("P(A|D)=6/31≈0,1935", ["0,15", "0,02", "3/20"], `Aplicamos Bayes:\nP(A|D)=P(A)P(D|A)/P(D)=(0,15·0,02)/0,0155=0,003/0,0155=6/31≈0,1935.`)
    },
    "ccss2-probabilidad-86b5befd5feb": {
      "a)": ans("0,81", ["0,90", "0,18", "0,99"], `Como son independientes, P(aprueba ambas)=0,9·0,9=0,81.`),
      "b)": ans("0,99", ["0,81", "0,90", "0,19"], `Usamos el complementario: P(al menos una)=1−P(ninguna)=1−0,1²=0,99.`),
      "c)": ans("0,18", ["0,81", "0,09", "0,20"], `Puede aprobar la primera y suspender la segunda o al revés:\nP=0,9·0,1+0,1·0,9=0,18.`)
    },
    "ccss2-probabilidad-70424d2f1553": {
      "a)": ans("18/19≈0,9474", ["15/20", "14/19", "1/38"], `Es más sencillo usar el complementario. Hay 5 temas que no sabe:\nP(no sabe ninguno de los dos)=5/20·4/19=1/19.\nP(sabe al menos uno)=1−1/19=18/19.`),
      "b)": ans("21/38≈0,5526", ["15/20", "14/19", "7/19"], `Sin reemplazamiento:\nP(sabe los dos)=15/20·14/19=210/380=21/38.`)
    },
    "ccss2-estadistica-d2fde0c5012b": {
      "a)": ans("1080 píxeles", ["1076,08", "1083,92", "1078"], `La media muestral es el centro del intervalo:\nx̄=(1076,08+1083,92)/2=1080.`),
      "b)": ans("95 %", ["90 %", "99 %", "92 %"], `El error es E=1083,92−1080=3,92.\nE=z_{α/2}·σ/√n=z·20/10=2z.\nAsí, z=3,92/2=1,96, que corresponde a un nivel de confianza del 95 %.`),
      "c)": ans("Mayor n reduce amplitud; mayor confianza la aumenta; 1076,08 no se admite al 90 %", ["Mayor n aumenta amplitud", "1076,08 siempre se admite", "La amplitud no depende de n"], `E=z_{α/2}σ/√n. Aumentar n disminuye la amplitud; aumentar el nivel de confianza aumenta z y la amplitud.\nAl 90 %, E=1,645·20/10=3,29, intervalo (1076,71,1083,29). Como 1076,08 queda fuera, no se admite.`)
    },
    "ccss2-estadistica-4df969ff5d7b": {
      "a)": ans("(16,17; 17,83) minutos, aproximadamente", ["(14;20)", "(16,5;17,5)", "(15,04;18,96)"], `IC del 95 %: x̄±1,96·σ/√n.\n17±1,96·3/√50=17±0,8316.\nIntervalo aproximado: (16,17;17,83).`),
      "b)": ans("No se admite μ=16; para reducir amplitud hay que aumentar n", ["Sí se admite; disminuir n", "No se admite; aumentar confianza", "Sí se admite; no puede reducirse"], `El valor 16 no pertenece al intervalo (16,17;17,83), por lo que no se admite al 95 %.\nSin variar la confianza ni σ, E=1,96σ/√n disminuye si aumentamos el tamaño muestral.`)
    },
    "ccss2-estadistica-b9b45ff4340b": {
      "a)": ans("(30,95; 39,05) μg/m³, aproximadamente", ["(27;43)", "(35;43)", "(31,08;38,92)"], `IC del 95 %:\n35±1,96·8/√15=35±4,048.\nPor tanto, (30,95;39,05) μg/m³, aproximadamente.`),
      "b)": ans("No se admite μ=40; mayor confianza produce mayor amplitud", ["Sí se admite; mayor confianza reduce amplitud", "No se admite; la amplitud no cambia", "Sí se admite; menor confianza aumenta amplitud"], `40 no pertenece al intervalo obtenido, luego no se admite al 95 %.\nAl aumentar la confianza aumenta z_{α/2} y se ensancha el intervalo; al disminuirla, se estrecha.`)
    },
    "ccss2-estadistica-f0b314eab872": {
      "a)": ans("(18,00; 30,40) minutos, aproximadamente", ["(14,2;34,2)", "(20,2;28,2)", "(22,24;26,16)"], `La media muestral es x̄=(15+19+20+22+24+25+27+28+30+32)/10=24,2.\nIC del 95 %:\n24,2±1,96·10/√10=24,2±6,198.\nResultado aproximado: (18,00;30,40).`),
      "b)": ans("n mínimo=385", ["n=384", "n=196", "n=100"], `Queremos E<1:\n1,96·10/√n<1.\n√n>19,6 ⇒ n>384,16.\nEl menor entero que lo cumple es n=385.`)
    }
  });
})();

// Respuestas verificadas que completan progresivamente los bancos oficiales
// suministrados por la usuaria. Este archivo se carga después de las
// ampliaciones anteriores para no sustituir respuestas ya revisadas.
(function completeBachIiAnswerBank() {
  "use strict";

  const ccssAnswers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};
  const matesAnswers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  function findMatesExercise(block, id) {
    const rows = window.MATES_II_BLOCK_EXERCISES?.[block] || [];
    return rows.find((row) => row.id === id);
  }

  function findCcssExercise(block, id) {
    const rows = window.CCSS_II_BLOCK_EXERCISES?.[block] || [];
    return rows.find((row) => row.id === id);
  }

  function relabelParts(exercise, labels) {
    if (!exercise?.parts || exercise.parts.length !== labels.length) return;
    exercise.parts.forEach((part, index) => {
      part.label = labels[index];
    });
  }

  function splitEmbeddedPart(exercise, newLabel, marker) {
    const sourcePart = exercise?.parts?.[1];
    if (!sourcePart?.paragraphs?.length) return;
    const markerIndex = sourcePart.paragraphs.findIndex((paragraph) =>
      marker.test(String(paragraph.plain || ""))
    );
    if (markerIndex < 0) return;
    const paragraphs = sourcePart.paragraphs.splice(markerIndex);
    exercise.parts.push({ label: newLabel, paragraphs });
  }

  // Algunos Word oficiales agruparon dos preguntas distintas dentro del
  // mismo apartado. Las separamos antes de asignar las respuestas para que
  // cada pregunta conserve su enunciado, opciones, corrección y puntuación.
  const matesJuneAnalysis5 = findMatesExercise(
    "analisis",
    "mates2-analisis-dbf12dd0701b--mates-ii-analisis-2"
  );
  splitEmbeddedPart(matesJuneAnalysis5, "5.2)", /^5\.2\./);
  relabelParts(matesJuneAnalysis5, ["5.1 a)", "5.1 b)", "5.2)"]);

  const matesJulyAnalysis5 = findMatesExercise(
    "analisis",
    "mates2-analisis-e8e0f1e5cd5f--mates-ii-analisis-2"
  );
  relabelParts(matesJulyAnalysis5, [
    "5.1 a)",
    "5.1 b)",
    "5.2 a)",
    "5.2 b)"
  ]);

  relabelParts(
    findMatesExercise("geometria", "mates2-geometria-0ee5256a5650"),
    ["4.1 a)", "4.1 b)", "4.2 a)", "4.2 b)"]
  );
  relabelParts(
    findMatesExercise("geometria", "mates2-geometria-6cda366b826b"),
    ["4.1 a)", "4.1 b)", "4.2 a)", "4.2 b)"]
  );

  function replacePartText(block, id, label, plain, html = plain) {
    const exercise = findCcssExercise(block, id);
    const part = exercise?.parts?.find((item) => item.label === label);
    if (!part) return;
    const figures = (part.paragraphs || []).filter((paragraph) =>
      /<img\b/i.test(String(paragraph.html || ""))
    );
    part.paragraphs = [{ plain, html }, ...figures];
  }

  // Los dos últimos apartados de 2026 quedaron cortados durante la
  // importación del Word. Se recupera aquí el enunciado oficial completo.
  replacePartText(
    "estadistica",
    "ccss2-estadistica-275fe58b005c",
    "b.3)",
    "b.3) Si se desea que una duración media de 14 días del efecto no esté contenida en el intervalo del apartado b.1), justifique si se debe aumentar o disminuir el nivel de confianza. (0,75 puntos)"
  );
  replacePartText(
    "estadistica",
    "ccss2-estadistica-16fd3245db2c",
    "b.3)",
    "b.3) Si se desea que una duración media de 230 segundos no esté contenida en el intervalo del apartado b.1), justifique si se debe aumentar o disminuir el nivel de confianza. (0,75 puntos)"
  );

  Object.assign(matesAnswers, {
    "mates2-algebra-b9ed20a447e7": {
      "a)": {
        options: [
          "a=1 y b=2.",
          "a=2 y b=1.",
          "a=1 y b=1.",
          "a=2 y b=2."
        ],
        correct: 0,
        solution: `Resolución:
1. Multiplicamos las matrices
A=[[1,a,1],[1,2,1],[1,1,b]]
y
B=[[3,-1,-1],[-1,1,0],[-1,0,1]].
2. El producto es
A·B=[[2-a,a-1,0],[0,1,0],[2-b,0,b-1]].
3. Como debe cumplirse A·B=I, comparamos con
I=[[1,0,0],[0,1,0],[0,0,1]].
4. De la primera fila:
2-a=1 y a-1=0, de donde a=1.
5. De la tercera fila:
2-b=0 y b-1=1, de donde b=2.
6. Comprobación:
para a=1 y b=2,
A·B=[[1,0,0],[0,1,0],[0,0,1]]=I.
Resultado final: a=1 y b=2.`
      },
      "b)": {
        options: [
          "X=[[-1,-1],[-1,0]] e Y=[[2,1],[3,3]].",
          "X=[[2,1],[3,3]] e Y=[[-1,-1],[-1,0]].",
          "X=[[1,1],[1,0]] e Y=[[0,-1],[1,3]].",
          "X=[[-2,-1],[-3,-3]] e Y=[[1,1],[1,0]]."
        ],
        correct: 0,
        solution: `Resolución:
1. Escribimos el sistema matricial:
X+Y=[[1,0],[2,3]],
2X+3Y=[[4,1],[7,9]].
2. Multiplicamos la primera ecuación por 2:
2X+2Y=[[2,0],[4,6]].
3. Restamos esta ecuación a la segunda:
Y=[[4,1],[7,9]]-[[2,0],[4,6]]
=[[2,1],[3,3]].
4. Sustituimos en la primera ecuación:
X=[[1,0],[2,3]]-[[2,1],[3,3]]
=[[-1,-1],[-1,0]].
5. Comprobación:
2X+3Y=[[4,1],[7,9]].
Resultado final:
X=[[-1,-1],[-1,0]] e Y=[[2,1],[3,3]].`
      }
    },
    "mates2-algebra-43aa8d27d039": {
      "a)": {
        options: [
          "rango(A)=3 si a≠0,2; rango(A)=2 si a=0 o a=2.",
          "rango(A)=3 para todo a∈ℝ.",
          "rango(A)=2 si a≠0,2; rango(A)=1 si a=0 o a=2.",
          "rango(A)=3 si a≠0; rango(A)=2 si a=0."
        ],
        correct: 0,
        solution: `Resolución mediante rangos:
1. La matriz es
A=[[a,a-1,a²-a],[a,1,a],[a,1,a-1]].
2. Calculamos su determinante:
det(A)=a(a-2).
3. Si a≠0 y a≠2, det(A)≠0 y rango(A)=3.
4. Para a=0:
A=[[0,-1,0],[0,1,0],[0,1,-1]].
El menor |[-1,0],[1,-1]|=1≠0, luego rango(A)=2.
5. Para a=2:
A=[[2,1,2],[2,1,2],[2,1,1]].
El menor |[2,2],[2,1]|=-2≠0, luego rango(A)=2.
Resultado final:
rango(A)=3 si a≠0,2, y rango(A)=2 si a=0 o a=2.`
      },
      "b)": {
        options: [
          "A tiene inversa si y solo si a≠0 y a≠2.",
          "A tiene inversa para todo a∈ℝ.",
          "A tiene inversa únicamente para a=0 o a=2.",
          "A tiene inversa si y solo si a≠2."
        ],
        correct: 0,
        solution: `Resolución:
1. Una matriz cuadrada tiene inversa si y solo si su determinante es distinto de cero.
2. Hemos obtenido det(A)=a(a-2).
3. Imponemos a(a-2)≠0.
4. Por tanto, a≠0 y a≠2.
Resultado final: A es invertible para a∈ℝ\\{0,2}.`
      }
    },
    "mates2-analisis-dbf12dd0701b": {
      "a)": {
        options: [
          "Crece en [0,2], decrece para x>2 y alcanza un máximo en x=2 de 160/e cientos de euros.",
          "Decrece en [0,2], crece para x>2 y alcanza un mínimo en x=2.",
          "Crece para todo x≥0 y no tiene máximo.",
          "Crece en [0,1], decrece para x>1 y su máximo es 80/e cientos de euros."
        ],
        correct: 0,
        solution: `Resolución:
1. B(x)=80x·e^(-x/2), x≥0.
2. Derivamos:
B'(x)=80e^(-x/2)(1-x/2).
3. Como e^(-x/2)>0, B'(x)=0 cuando x=2.
4. En la recta real:
para 0≤x<2, tomamos x=1 y B'(1)>0: B crece;
para x>2, tomamos x=3 y B'(3)<0: B decrece.
5. Hay un máximo en x=2.
6. B(2)=160/e cientos de euros, aproximadamente 5886,07 €.
Resultado final: crece en [0,2], decrece en (2,+∞) y el máximo se alcanza a los 2 días.`
      },
      "b)": {
        options: [
          "El beneficio diario tiende a 0 euros.",
          "El beneficio diario tiende a 8000 euros.",
          "El beneficio diario tiende a 160/e euros.",
          "El beneficio diario crece sin límite."
        ],
        correct: 0,
        solution: `Resolución:
1. Estudiamos
lim(x→+∞)80x/e^(x/2).
2. Aparece ∞/∞, por lo que aplicamos L'Hôpital:
lim(x→+∞)80/(e^(x/2)/2)
=lim(x→+∞)160/e^(x/2)=0.
Resultado final: a largo plazo el beneficio diario se estabiliza en 0 euros.`
      }
    },
    "mates2-analisis-dbf12dd0701b--mates-ii-analisis-2": {
      "5.1 a)": {
        options: ["e².", "e.", "e⁴.", "1."],
        correct: 0,
        solution: `Resolución:
1. lim(x→+∞)((2x+1)/(2x-3))^x.
2. La base es 1+4/(2x-3).
3. Es una indeterminación 1^∞. Aplicamos la fórmula del número e:
L=e^[lim(x→+∞)4x/(2x-3)].
4. El exponente vale 2.
Resultado final: L=e².`
      },
      "5.1 b)": {
        options: [
          "(e^x/2)(sen x-cos x)+C.",
          "(e^x/2)(sen x+cos x)+C.",
          "e^x·sen x+C.",
          "-(e^x/2)(sen x-cos x)+C."
        ],
        correct: 0,
        solution: `Resolución por partes:
1. I=∫e^x·sen x dx.
Tomamos u=sen x y dv=e^x dx:
I=e^x·sen x-∫e^x·cos x dx.
2. Para J=∫e^x·cos x dx:
J=e^x·cos x+I.
3. Sustituimos:
I=e^x·sen x-e^x·cos x-I.
4. Despejamos:
2I=e^x(sen x-cos x).
Resultado final:
I=(e^x/2)(sen x-cos x)+C.`
      },
      "5.2)": {
        options: ["a=1 y b=1.", "a=1 y b=0.", "a=2 y b=0.", "a=0 y b=2."],
        correct: 0,
        solution: `Resolución:
1. Para x<1:
(x²-1)/(x-1)=x+1.
2. Continuidad en x=1:
lim(x→1⁻)f(x)=2,
lim(x→1⁺)f(x)=f(1)=a+b.
Por tanto, a+b=2.
3. Las derivadas son 1 en la primera rama y a en la segunda.
4. Derivabilidad en x=1:
f'(1⁻)=1=f'(1⁺)=a, luego a=1.
5. En a+b=2:
1+b=2, luego b=1.
Resultado final: a=1 y b=1.`
      }
    },
    "mates2-analisis-e8e0f1e5cd5f": {
      "a)": {
        options: [
          "A las 2 horas; la concentración máxima es 3 mg/L.",
          "A las 4 horas; la concentración máxima es 2 mg/L.",
          "A la hora; la concentración máxima es 12/5 mg/L.",
          "La concentración crece siempre y no tiene máximo."
        ],
        correct: 0,
        solution: `Resolución:
1. C(t)=12t/(t²+4), t≥0.
2. C'(t)=12(4-t²)/(t²+4)².
3. C'(t)=0 para t=2.
4. En la recta real:
si 0<t<2, por ejemplo t=1, C'(1)>0;
si t>2, por ejemplo t=3, C'(3)<0.
Hay un máximo en t=2.
5. C(2)=24/8=3 mg/L.
Resultado final: a las 2 horas, con 3 mg/L.`
      },
      "b)": {
        options: ["ln(10) mg/L.", "2ln(10) mg/L.", "3 mg/L.", "ln(40) mg/L."],
        correct: 0,
        solution: `Resolución:
1. C̄=1/6·∫₀⁶ 12t/(t²+4)dt.
2. Con u=t²+4:
∫12t/(t²+4)dt=6ln(t²+4).
3. Por Barrow:
C̄=1/6·[6ln(t²+4)]₀⁶
=ln40-ln4
=ln10.
Resultado final: ln(10) mg/L.`
      }
    },
    "mates2-analisis-e8e0f1e5cd5f--mates-ii-analisis-2": {
      "5.1 a)": {
        options: [
          "a=-11/2, b=8 y c=1/2.",
          "a=11/2, b=-8 y c=1/2.",
          "a=-11/2, b=3 y c=9/2.",
          "a=-5, b=8 y c=0."
        ],
        correct: 0,
        solution: `Resolución:
1. Como (1,4) pertenece a f:
a+b+c=3.
2. f'(x)=3x²+2ax+b.
El extremo en x=1 exige:
2a+b=-3.
3. La tangente en x=3 es paralela a y=2x-1:
6a+b=-25.
4. Reunimos:
{a+b+c=3,
 2a+b=-3,
 6a+b=-25}.
5. Resolviendo el sistema:
a=-11/2, b=8, c=1/2.
Resultado final: a=-11/2, b=8 y c=1/2.`
      },
      "5.1 b)": {
        options: ["y=-x/8+1/2.", "y=8x+1/2.", "y=x/8-1/2.", "y=-8x+1/2."],
        correct: 0,
        solution: `Resolución:
1. f(0)=1/2, por lo que P=(0,1/2).
2. La pendiente tangente es m=f'(0)=8.
3. La pendiente normal cumple m·mₙ=-1:
8mₙ=-1, luego mₙ=-1/8.
4. Ecuación punto-pendiente:
y-1/2=(-1/8)(x-0).
Resultado final: y=-x/8+1/2.`
      },
      "5.2 a)": {
        options: [
          "4-3ln(3) unidades cuadradas.",
          "4+3ln(3) unidades cuadradas.",
          "2-3ln(3) unidades cuadradas.",
          "3ln(3)-4 unidades cuadradas."
        ],
        correct: 0,
        solution: `Resolución:
1. Puntos de corte:
3/x=-x+4 ⇒ x²-4x+3=0 ⇒ x=1,3.
2. En [1,3], la recta queda por encima de la hipérbola.
3. A=∫₁³[(-x+4)-3/x]dx.
4. Una primitiva es -x²/2+4x-3lnx.
5. Por Barrow:
A=[-x²/2+4x-3lnx]₁³
=4-3ln3.
Resultado final: 4-3ln(3) unidades cuadradas.`
      },
      "5.2 b)": {
        options: ["1/2.", "0.", "1.", "-1/2."],
        correct: 0,
        solution: `Resolución mediante L'Hôpital:
1. Al sustituir x=0 aparece 0/0.
2. Primera aplicación:
lim(x→0)(e^x-cosx)/(2x), que vuelve a ser 0/0.
3. Segunda aplicación:
lim(x→0)(e^x+senx)/2.
4. Sustituimos x=0:
(1+0)/2=1/2.
Resultado final: 1/2.`
      }
    }
  });

  Object.assign(matesAnswers, {
    "mates2-geometria-0ee5256a5650": {
      "4.1 a)": {
        options: [
          "a=-2 o a=1.",
          "a=-1 o a=2.",
          "a=0 o a=2.",
          "a=-2 o a=-1."
        ],
        correct: 0,
        solution: `Resolución:
1. Tres vectores de ℝ³ son coplanarios si su producto mixto es cero.
2. Formamos el determinante con
u⃗=(1,-1,a), v⃗=(2,a,1), w⃗=(-1,1,-1):
det[[1,-1,a],[2,a,1],[-1,1,-1]].
3. Desarrollando obtenemos
a²+a-2.
4. Imponemos
a²+a-2=0.
5. Factorizamos:
(a+2)(a-1)=0.
Resultado final: los vectores son coplanarios para a=-2 o a=1.`
      },
      "4.1 b)": {
        options: [
          "a=3 o a=-4.",
          "a=4 o a=-3.",
          "a=2 o a=-5.",
          "a=1 o a=-2."
        ],
        correct: 0,
        solution: `Resolución:
1. El volumen del paralelepípedo es el valor absoluto del producto mixto:
V=|a²+a-2|.
2. Imponemos V=10:
|a²+a-2|=10.
3. Primer caso:
a²+a-2=10 ⇒ a²+a-12=0
⇒ (a+4)(a-3)=0
⇒ a=-4 o a=3.
4. Segundo caso:
a²+a-2=-10 ⇒ a²+a+8=0.
Su discriminante es 1-32=-31<0, por lo que no tiene soluciones reales.
Resultado final: a=3 o a=-4.`
      },
      "4.2 a)": {
        options: [
          "P'=(-1,0,4).",
          "P'=(1,0,4).",
          "P'=(-1,2,4).",
          "P'=(3,4,8)."
        ],
        correct: 0,
        solution: `Resolución:
1. El plano es π:x+y+z-6=0 y su vector normal es n⃗=(1,1,1).
2. La recta perpendicular a π que pasa por P=(1,2,6), en forma paramétrica, es
r:{x=1+t, y=2+t, z=6+t}.
3. Sustituimos en el plano:
(1+t)+(2+t)+(6+t)-6=0
⇒ 3+3t=0
⇒ t=-1.
4. El punto de corte es
Q=(0,1,5).
5. Como Q es el punto medio de P y P':
(1+x')/2=0 ⇒ x'=-1,
(2+y')/2=1 ⇒ y'=0,
(6+z')/2=5 ⇒ z'=4.
Resultado final: P'=(-1,0,4).`
      },
      "4.2 b)": {
        options: [
          "d(P,π)=2√3.",
          "d(P,π)=2.",
          "d(P,π)=√3.",
          "d(P,π)=6/√3."
        ],
        correct: 0,
        solution: `Resolución:
1. Aplicamos la fórmula de la distancia de un punto a un plano:
d(P,π)=|A·x₀+B·y₀+C·z₀+D|/√(A²+B²+C²).
2. Para P=(1,2,6) y π:x+y+z-6=0:
d(P,π)=|1+2+6-6|/√(1²+1²+1²)
=3/√3.
3. Racionalizamos:
3/√3=√3.
4. La distancia entre P y su simétrico es el doble:
d(P,P')=2d(P,π)=2√3.
Resultado final: la distancia entre el punto y su simétrico es 2√3.`
      }
    },
    "mates2-geometria-6cda366b826b": {
      "4.1 a)": {
        options: [
          "π:x+y-2=0.",
          "π:x-y=0.",
          "π:x+y+z-2=0.",
          "π:x-y+2z=0."
        ],
        correct: 0,
        solution: `Resolución:
1. Tomamos A=(1,1,0), B=(2,0,1) y C=(0,2,1).
2. Formamos dos vectores del plano:
AB⃗=(1,-1,1),
AC⃗=(-1,1,1).
3. Calculamos un vector normal:
n⃗=AB⃗×AC⃗=(-2,-2,0), que podemos simplificar a (1,1,0).
4. La ecuación del plano que pasa por A es
1(x-1)+1(y-1)+0(z-0)=0.
5. Simplificamos:
x+y-2=0.
Resultado final: π:x+y-2=0.`
      },
      "4.1 b)": {
        options: [
          "a=10 o a=-8.",
          "a=8 o a=-10.",
          "a=4 o a=-2.",
          "a=1 o a=-1."
        ],
        correct: 0,
        solution: `Resolución:
1. El volumen del tetraedro ABCD es
V=|det(AB⃗,AC⃗,AD⃗)|/6.
2. AD⃗=(a-1,0,2).
3. El producto mixto vale
det(AB⃗,AC⃗,AD⃗)=2(a-1).
4. Por tanto:
V=|2(a-1)|/6=|a-1|/3.
5. Imponemos V=3:
|a-1|/3=3
⇒ |a-1|=9.
6. Entonces:
a-1=9 ⇒ a=10,
o a-1=-9 ⇒ a=-8.
Resultado final: a=10 o a=-8.`
      },
      "4.2 a)": {
        options: [
          "m=0.",
          "m=1.",
          "m=-1.",
          "m=2."
        ],
        correct: 0,
        solution: `Resolución:
1. A=(1,2,-1), B=(3,6,1) y C=(m,m,m-2).
2. Los tres puntos están alineados si AB⃗ y AC⃗ son proporcionales.
3. AB⃗=(2,4,2)=2(1,2,1).
AC⃗=(m-1,m-2,m-1).
4. Igualamos AC⃗=λ(1,2,1).
De la primera y tercera coordenadas se obtiene λ=m-1.
5. En la segunda:
m-2=2(m-1)
⇒ m-2=2m-2
⇒ m=0.
6. Para m=0:
AC⃗=(-1,-2,-1)=-1(1,2,1).
Resultado final: A, B y C están alineados para m=0.`
      },
      "4.2 b)": {
        options: [
          "√(53/6).",
          "√53/6.",
          "√(53/3).",
          "53/6."
        ],
        correct: 0,
        solution: `Resolución:
1. Para m=0, una dirección de la recta ABC es
v⃗=(1,2,1).
2. Tomamos A=(1,2,-1) y P=(2,0,1):
AP⃗=(1,-2,2).
3. La distancia de P a la recta es
d(P,r)=|AP⃗×v⃗|/|v⃗|.
4. Calculamos:
AP⃗×v⃗=(-6,1,4),
|AP⃗×v⃗|=√(36+1+16)=√53,
|v⃗|=√(1+4+1)=√6.
5. Por tanto:
d(P,r)=√53/√6=√(53/6).
Resultado final: d(P,r)=√(53/6).`
      }
    }
  });

  Object.assign(ccssAnswers, {
    "ccss2-analisis-b25affbff36b": {
      "a.1)": {
        options: [
          "La función es continua en t=1.",
          "La función tiene una discontinuidad de salto en t=1.",
          "La función solo es continua por la izquierda en t=1.",
          "La función solo es continua por la derecha en t=1."
        ],
        correct: 0,
        solution: `Resolución:
1. Cada rama es continua en su intervalo; solo estudiamos t=1.
2. Límite por la izquierda:
lim(t→1⁻)P(t)=2+1²=3.
3. Límite por la derecha:
lim(t→1⁺)P(t)=(8·1²-1-1)/(2·1²)=6/2=3.
4. Valor de la función:
P(1)=2+1²=3.
5. Como
lim(t→1⁻)P(t)=lim(t→1⁺)P(t)=P(1)=3,
la función es continua en t=1.
Resultado final: P es continua en t=1.`
      },
      "a.2)": {
        options: [
          "P(t) no decrece en ningún instante de su dominio.",
          "P(t) decrece para 0<t<1.",
          "P(t) decrece para t>1.",
          "P(t) decrece únicamente en t=1."
        ],
        correct: 0,
        solution: `Resolución:
1. Para 0≤t≤1:
P(t)=2+t²,
P'(t)=2t≥0.
2. Para t>1:
P(t)=(8t²-t-1)/(2t²)
=4-1/(2t)-1/(2t²).
3. Derivamos:
P'(t)=1/(2t²)+1/t³
=(t+2)/(2t³).
4. Si t>1, el numerador y el denominador son positivos, luego P'(t)>0.
5. Por tanto, P es creciente en ambas ramas y no decrece.
Resultado final: la proporción no decrece en ningún instante.`
      },
      "a.3)": {
        options: [
          "No es necesario elevar la pasarela: P(t)<4 para t>1 y lim(t→∞)P(t)=4.",
          "Sí, porque P(t) supera 4 para todo t>1.",
          "Sí, porque lim(t→∞)P(t)=8.",
          "No, porque P(t) disminuye hasta 0."
        ],
        correct: 0,
        solution: `Resolución:
1. Para t>1:
P(t)=4-(t+1)/(2t²).
2. Como t>1, se cumple
(t+1)/(2t²)>0.
Por tanto:
P(t)<4.
3. Además:
lim(t→+∞)P(t)
=4-lim(t→+∞)(t+1)/(2t²)
=4.
4. La proporción se aproxima a 4, pero no la supera.
Resultado final: no es necesario elevar la pasarela.`
      }
    },
    "ccss2-algebra-c5283d53af75": {
      "b.4)": {
        options: [
          "X=[[14,15],[-12,-13]].",
          "X=[[16,17],[12,13]].",
          "X=[[7,8],[-6,-7]].",
          "X=[[-14,-15],[12,13]]."
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de la ecuación matricial
A·X·A⁻¹=B.
2. Para aislar X, multiplicamos a la izquierda por A⁻¹ y a la derecha por A:
A⁻¹·A·X·A⁻¹·A=A⁻¹·B·A.
Como A⁻¹·A=I, queda
X=A⁻¹·B·A.
3. Calculamos la inversa de A mediante determinantes:
A=[[2,1],[0,-1]],
det(A)=2·(-1)-1·0=-2≠0.
Con la nomenclatura del curso,
A⁻¹=Adj(Aᵀ)/det(A)
=1/(-2)·[[-1,-1],[0,2]]
=[[1/2,1/2],[0,-1]].
4. Calculamos primero B·A:
B·A=[[8,-9],[6,-7]]·[[2,1],[0,-1]]
=[[16,17],[12,13]].
5. Multiplicamos por A⁻¹:
X=[[1/2,1/2],[0,-1]]·[[16,17],[12,13]]
=[[14,15],[-12,-13]].
6. Comprobación:
A·X·A⁻¹=[[8,-9],[6,-7]]=B.
Resultado final: X=[[14,15],[-12,-13]].`
      }
    },
    "ccss2-algebra-455736e66014": {
      "a.1)": {
        options: [
          "B(x,y)=1,8x+1,7y; 2x+3y≤150, x+2y≤90, x+y≤70, x≥0, y≥0.",
          "B(x,y)=3x+3y; 2x+3y≥150, x+2y≤90, x+y=70.",
          "B(x,y)=1,2x+1,3y; 2x+3y≤150, x+2y≥90, x+y≤70.",
          "B(x,y)=1,8x+1,7y; 2x+3y≤3000, x+2y≤7200, x+y≥70."
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x al número de abanicos del modelo A e y al número de abanicos del modelo B.
2. El beneficio por unidad es la diferencia entre el precio de venta y el coste:
modelo A: 3-1,20=1,80 €;
modelo B: 3-1,30=1,70 €.
Por tanto, la función objetivo es
B(x,y)=1,8x+1,7y.
3. Restricción de papel:
40x+60y≤3000.
Dividimos entre 20:
2x+3y≤150.
4. Restricción de lámina de madera:
80x+160y≤7200.
Dividimos entre 80:
x+2y≤90.
5. Restricción de enganches:
x+y≤70.
6. Añadimos las condiciones de no negatividad:
x≥0, y≥0.
7. Las rectas frontera determinan los vértices
(0,0), (0,45), (30,30), (60,10) y (70,0).
Resultado final: B(x,y)=1,8x+1,7y, con 2x+3y≤150, x+2y≤90, x+y≤70, x≥0 e y≥0.`
      },
      "a.2)": {
        options: [
          "70 abanicos A y 0 abanicos B; beneficio máximo de 126 €.",
          "60 abanicos A y 10 abanicos B; beneficio máximo de 125 €.",
          "30 abanicos A y 30 abanicos B; beneficio máximo de 105 €.",
          "0 abanicos A y 45 abanicos B; beneficio máximo de 76,50 €."
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos B(x,y)=1,8x+1,7y en todos los vértices del recinto:
B(0,0)=0 €;
B(0,45)=1,7·45=76,50 €;
B(30,30)=1,8·30+1,7·30=105 €;
B(60,10)=1,8·60+1,7·10=125 €;
B(70,0)=1,8·70=126 €.
2. El mayor valor es 126 y se alcanza en (70,0).
3. Comprobamos las existencias para (70,0):
2·70+3·0=140≤150;
70+2·0=70≤90;
70+0=70.
Resultado final: deben fabricarse 70 abanicos del modelo A y ninguno del modelo B; el beneficio máximo es 126 €.`
      }
    },
    "ccss2-estadistica-275fe58b005c": {
      "b.1)": {
        options: [
          "[13,06;18,94] días.",
          "[10,12;21,88] días.",
          "[14,53;17,47] días.",
          "[12,08;19,92] días."
        ],
        correct: 0,
        solution: `Resolución:
1. Datos: x̄=16 días, σ=6 días, n=16 y nivel de confianza 0,95.
2. α=1-0,95=0,05 y 1-α/2=0,975.
En la tabla de la normal típica: P(Z≤1,96)=0,975.
3. El error máximo es
E=1,96·(σ/√n)
=1,96·(6/√16)
=1,96·(6/4)
=2,94 días.
4. Construimos el intervalo:
IC=(x̄-E, x̄+E)
=(16-2,94, 16+2,94)
=(13,06,18,94).
Resultado final: el intervalo de confianza del 95 % es [13,06;18,94] días.`
      },
      "b.2)": {
        options: [
          "La amplitud sería 2,94 días.",
          "La amplitud seguiría siendo 5,88 días.",
          "La amplitud sería 1,47 días.",
          "La amplitud sería 11,76 días."
        ],
        correct: 0,
        solution: `Resolución:
1. Mantenemos σ=6 y el nivel de confianza del 95 %, por lo que z=1,96.
2. Con n=64, el nuevo error máximo es
E=1,96·(6/√64)=1,96·(6/8)=1,47 días.
3. La amplitud de un intervalo es el doble de su error:
A=2E=2·1,47=2,94 días.
Resultado final: la nueva amplitud sería 2,94 días.`
      },
      "b.3)": {
        options: [
          "Se debe disminuir el nivel de confianza.",
          "Se debe aumentar el nivel de confianza.",
          "El nivel de confianza no influye en el intervalo.",
          "Es imposible excluir 14 días modificando el nivel de confianza."
        ],
        correct: 0,
        solution: `Resolución:
1. El intervalo obtenido en b.1 es [13,06;18,94], que contiene el valor 14.
2. Para que 14 quede fuera y la media muestral siga siendo x̄=16, el extremo inferior debe ser mayor que 14.
3. El intervalo tiene la forma
(x̄-z·σ/√n, x̄+z·σ/√n).
4. Si disminuimos el nivel de confianza, disminuye z y, por tanto, disminuyen el error y la amplitud del intervalo.
5. Un intervalo más estrecho puede hacer que el extremo inferior supere 14.
Resultado final: se debe disminuir el nivel de confianza.`
      }
    },
    "ccss2-estadistica-16fd3245db2c": {
      "b.1)": {
        options: [
          "[220,4;259,6] segundos.",
          "[230,2;249,8] segundos.",
          "[180;300] segundos.",
          "[216,48;263,52] segundos."
        ],
        correct: 0,
        solution: `Resolución:
1. Datos: x̄=240 segundos, σ=60 segundos, n=36 y nivel de confianza 0,95.
2. α=1-0,95=0,05 y 1-α/2=0,975.
En la tabla de la normal típica: P(Z≤1,96)=0,975.
3. El error máximo es
E=1,96·(σ/√n)
=1,96·(60/√36)
=1,96·(60/6)
=19,6 segundos.
4. Construimos el intervalo:
IC=(240-19,6, 240+19,6)
=(220,4,259,6).
Resultado final: el intervalo de confianza del 95 % es [220,4;259,6] segundos.`
      },
      "b.2)": {
        options: [
          "La amplitud sería 23,52 segundos.",
          "La amplitud sería 11,76 segundos.",
          "La amplitud seguiría siendo 39,2 segundos.",
          "La amplitud sería 120 segundos."
        ],
        correct: 0,
        solution: `Resolución:
1. Mantenemos σ=60 y el nivel de confianza del 95 %, por lo que z=1,96.
2. Para n=100:
E=1,96·(60/√100)=1,96·(60/10)=11,76 segundos.
3. La amplitud del intervalo es
A=2E=2·11,76=23,52 segundos.
Resultado final: la nueva amplitud sería 23,52 segundos.`
      },
      "b.3)": {
        options: [
          "Se debe disminuir el nivel de confianza.",
          "Se debe aumentar el nivel de confianza.",
          "Se debe mantener el 95 % y aumentar σ.",
          "El nivel de confianza no modifica los extremos."
        ],
        correct: 0,
        solution: `Resolución:
1. El intervalo del apartado b.1 es [220,4;259,6], que contiene 230.
2. Para que 230 quede fuera, manteniendo x̄=240, necesitamos que el extremo inferior del intervalo sea mayor que 230.
3. El error es E=z·σ/√n. Si disminuye el nivel de confianza, disminuye z y el intervalo se hace más estrecho.
4. Al estrecharse suficientemente, el extremo inferior puede superar 230.
Resultado final: se debe disminuir el nivel de confianza.`
      }
    }
  });

  // Las cuatro preguntas de 2026 ya están completas en el banco oficial.
  // Retiramos las copias auxiliares que se habían creado mientras la
  // importación estaba incompleta, evitando que el alumno vea dos veces el
  // mismo ejercicio con identificadores distintos.
  const supersededExtraIds = new Set([
    "mates2-analisis-extra-pregunta-5-1-2026",
    "mates2-analisis-extra-pregunta-5-2-2026",
    "mates2-geometria-extra-pregunta-4-1-2026",
    "mates2-geometria-extra-pregunta-4-2-2026"
  ]);
  ["analisis", "geometria"].forEach((block) => {
    const extras = window.MATES_II_EXTRA_BLOCK_QUESTIONS?.[block] || [];
    window.MATES_II_EXTRA_BLOCK_QUESTIONS[block] = extras.filter(
      (question) => !supersededExtraIds.has(question.id)
    );
  });
})();

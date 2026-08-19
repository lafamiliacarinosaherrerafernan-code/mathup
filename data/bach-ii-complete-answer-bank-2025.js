// Banco oficial verificado de 2025 para Matemáticas II y CCSS II.
// Se carga después de la normalización general y del banco de 2026.
(function completeBachIiAnswerBank2025() {
  "use strict";

  const mates = window.MATES_II_BLOCK_EXERCISES || {};
  const ccss = window.CCSS_II_BLOCK_EXERCISES || {};
  const matesAnswers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};
  const ccssAnswers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  function findExercise(bank, block, id) {
    return (bank[block] || []).find((exercise) => exercise.id === id);
  }

  function setStatement(bank, block, id, lines) {
    const exercise = findExercise(bank, block, id);
    if (!exercise) return;
    exercise.statement = lines.map((text) => ({ plain: text, html: text }));
  }

  function setPart(bank, block, id, label, text) {
    const exercise = findExercise(bank, block, id);
    const part = exercise?.parts?.find((item) => item.label === label);
    if (!part) return;
    const figures = (part.paragraphs || []).filter((paragraph) =>
      /<img\b/i.test(String(paragraph.html || ""))
    );
    part.paragraphs = [{ plain: text, html: text }, ...figures];
  }

  // -----------------------------------------------------------------------
  // Enunciados oficiales de Matemáticas II (junio y julio de 2025).
  // Cada apartado queda autocontenido para que no se mezclen las dos
  // alternativas de un mismo ejercicio.
  // -----------------------------------------------------------------------
  setStatement(mates, "algebra", "mates2-algebra-eaee12b428eb", [
    "EJERCICIO 3. Elige y resuelve solo uno de los dos apartados siguientes."
  ]);
  setPart(
    mates,
    "algebra",
    "mates2-algebra-eaee12b428eb",
    "a.1)",
    "Apartado a) Considera el sistema x+y+az=1, x-2z=a, 2x+y+z=3, donde a∈ℝ. a.1) Discute el sistema de ecuaciones según los valores de a e identifica el número de soluciones en cada caso."
  );
  setPart(
    mates,
    "algebra",
    "mates2-algebra-eaee12b428eb",
    "a.2)",
    "Apartado a) Considera el sistema x+y+az=1, x-2z=a, 2x+y+z=3, donde a∈ℝ. a.2) Resuelve, razonadamente, el sistema de ecuaciones para a=0."
  );
  setPart(
    mates,
    "algebra",
    "mates2-algebra-eaee12b428eb",
    "b.1)",
    "Apartado b) Sea la ecuación matricial A·X-B=X, con A=[[2,1],[1,m]], B=[[1,1],[1,0]], m∈ℝ, y X de dimensión 2×2. b.1) ¿Para qué valores del parámetro m la ecuación anterior tiene solución única?"
  );
  setPart(
    mates,
    "algebra",
    "mates2-algebra-eaee12b428eb",
    "b.2)",
    "Apartado b) Sea la ecuación matricial A·X-B=X, con A=[[2,1],[1,m]], B=[[1,1],[1,0]], m∈ℝ, y X de dimensión 2×2. b.2) Para m=1, resuelve la ecuación y obtén el valor de X."
  );

  setStatement(mates, "algebra", "mates2-algebra-e22eda066bed", [
    "EJERCICIO 3. Elige y resuelve solo uno de los dos apartados siguientes."
  ]);
  setPart(
    mates,
    "algebra",
    "mates2-algebra-e22eda066bed",
    "a.1)",
    "Apartado a) Dado el sistema x+y-z=2, 4x+2y=a, ax+y+z=1, con a∈ℝ. a.1) Discute la resolución del sistema según los valores que pueda tomar el parámetro a e indica el número de soluciones en cada caso."
  );
  setPart(
    mates,
    "algebra",
    "mates2-algebra-e22eda066bed",
    "a.2)",
    "Apartado a) Dado el sistema x+y-z=2, 4x+2y=a, ax+y+z=1, con a∈ℝ. a.2) Para a=0, resuelve el sistema de ecuaciones, de forma razonada."
  );
  setPart(
    mates,
    "algebra",
    "mates2-algebra-e22eda066bed",
    "b.1)",
    "Apartado b) Dadas A=[[1,2,a],[1,-1,-1]] y B=[[1,3],[a,0],[0,2]], con a∈ℝ. b.1) Calcula los valores del parámetro a para que A·B sea invertible. Justifica tu respuesta."
  );
  setPart(
    mates,
    "algebra",
    "mates2-algebra-e22eda066bed",
    "b.2)",
    "Apartado b) Dadas A=[[1,2,a],[1,-1,-1]] y B=[[1,3],[a,0],[0,2]], con a∈ℝ. b.2) Calcula la inversa de A·B en función de a."
  );

  setStatement(mates, "analisis", "mates2-analisis-435f38f7d6e2", [
    "EJERCICIO 1. La concentración de virus activos en una muestra de sangre, en un tiempo t desde que se tomó la muestra, se modeliza mediante f(t)=5(t+1)e^(-t), con t≥0."
  ]);
  setPart(
    mates,
    "analisis",
    "mates2-analisis-435f38f7d6e2",
    "a)",
    "a) La pendiente de la recta tangente a la gráfica de f(t) mide cómo cambia la concentración de virus activos. Calcula el tiempo en el que este cambio toma el valor más pequeño posible, es decir, el tiempo en el que el valor de la derivada de f(t) es mínimo."
  );
  setPart(
    mates,
    "analisis",
    "mates2-analisis-435f38f7d6e2",
    "b)",
    "b) ¿Cuál sería el valor de la concentración de virus a largo plazo? Es decir, calcula lim(t→+∞) f(t)."
  );
  setPart(
    mates,
    "analisis",
    "mates2-analisis-34ee6210ea28",
    "c)",
    "c) Para poder transportar la caja cómodamente, se van a realizar dos aberturas. El área de cada una de ellas está encerrada por las curvas f(t)=t²-4t y g(t)=2t-5. Calcula el área de una de las aberturas."
  );

  setStatement(mates, "geometria", "mates2-geometria-2a4ebcc775a7", [
    "EJERCICIO 2. Elige y resuelve solo uno de los dos apartados siguientes."
  ]);
  setPart(
    mates,
    "geometria",
    "mates2-geometria-2a4ebcc775a7",
    "a.1)",
    "Apartado a) Sean r₁≡(x+2)/1=(y-1)/(-1)=(z+1)/1 y r₂≡(x-1)/2=(y-1)/1=(z-1)/(-1). a.1) Determina la ecuación de la recta r₃ cuyo vector director es perpendicular a los vectores directores de r₁ y r₂ y que pasa por A(0,0,0)."
  );
  setPart(
    mates,
    "geometria",
    "mates2-geometria-2a4ebcc775a7",
    "a.2)",
    "Apartado a) Sean r₁≡(x+2)/1=(y-1)/(-1)=(z+1)/1 y r₂≡(x-1)/2=(y-1)/1=(z-1)/(-1). a.2) Calcula la distancia de la recta r₂ al punto B(-1,-1,2)."
  );
  setPart(
    mates,
    "geometria",
    "mates2-geometria-2a4ebcc775a7",
    "b.1)",
    "Apartado b) Sea r≡x/1=y/(-1)=z/2 y el plano π≡x-y+3z=0. b.1) Determina la ecuación del plano que contiene a la recta r y es perpendicular al plano π."
  );
  setPart(
    mates,
    "geometria",
    "mates2-geometria-2a4ebcc775a7",
    "b.2)",
    "Apartado b) Sea r≡x/1=y/(-1)=z/2 y el plano π≡x-y+3z=0. b.2) Calcula el ángulo entre la recta r y el plano π, teniendo en cuenta que se cortan en A(0,0,0)."
  );

  setStatement(mates, "geometria", "mates2-geometria-9b20402deeca", [
    "EJERCICIO 2. Elige y resuelve solo uno de los dos apartados siguientes."
  ]);
  setPart(
    mates,
    "geometria",
    "mates2-geometria-9b20402deeca",
    "a.1)",
    "Apartado a) Para las fiestas del Corpus Christi se colocan los puntos de apoyo A(0,1,-2), B(1,2,0), C(0,0,1) y D(1,0,m), con m∈ℝ. a.1) Calcula m para que los cuatro puntos sean coplanarios."
  );
  setPart(
    mates,
    "geometria",
    "mates2-geometria-9b20402deeca",
    "a.2)",
    "Apartado a) Para las fiestas del Corpus Christi se colocan los puntos de apoyo A(0,1,-2), B(1,2,0), C(0,0,1) y D(1,0,m), con m∈ℝ. a.2) Determina la ecuación del plano π que contiene el toldo."
  );
  setPart(
    mates,
    "geometria",
    "mates2-geometria-9b20402deeca",
    "a.3)",
    "Apartado a) Los adornos florales deben estar como mínimo a 1 metro del toldo determinado por A(0,1,-2), B(1,2,0), C(0,0,1) y D(1,0,6). Si se coloca un adorno en P(1,2,3), ¿estará correctamente ubicado?"
  );
  setPart(
    mates,
    "geometria",
    "mates2-geometria-9b20402deeca",
    "b.1)",
    "Apartado b) Calcula la ecuación del plano π′ que pasa por C(1,1,-2), es paralelo a la recta que pasa por A(1,0,3) y B(0,4,-1), y es perpendicular al plano π≡-x+y+2z-1=0."
  );
  setPart(
    mates,
    "geometria",
    "mates2-geometria-9b20402deeca",
    "b.2)",
    "Apartado b) Determina los valores reales de m∈ℝ para que A(-1,2,3), B(-1,0,-1), C(2,-1,1) y D(2,3,m) formen un tetraedro de volumen 8 unidades cúbicas."
  );

  setStatement(
    mates,
    "probabilidad-estadistica",
    "mates2-probabilidad-estadistica-d0757e695467",
    ["EJERCICIO 4. Elige y resuelve solo uno de los dos apartados siguientes."]
  );
  setPart(
    mates,
    "probabilidad-estadistica",
    "mates2-probabilidad-estadistica-d0757e695467",
    "a.1)",
    "Apartado a) Una baraja española tiene 40 cartas, entre ellas 4 ases. Un jugador extrae cartas sin reemplazamiento hasta encontrar un as. a.1) Calcula las probabilidades de que el as salga al sacar 1, 2 y 3 cartas, respectivamente."
  );
  setPart(
    mates,
    "probabilidad-estadistica",
    "mates2-probabilidad-estadistica-d0757e695467",
    "a.2)",
    "Apartado a) Dos jugadores extraen cartas, cada uno desde la baraja completa, hasta encontrar un as. Gana quien haya extraído más cartas y hay empate si extraen el mismo número. a.2) Si el primer jugador ha sacado dos cartas contando el as, ¿cuál es la probabilidad de que el segundo le gane?"
  );
  ["b.1)", "b.2)", "b.3)"].forEach((label, index) => {
    const prompts = [
      "b.1) ¿Cuál es la probabilidad de que la medición del aparato sea de más de 2,1 m?",
      "b.2) ¿Cuál es la probabilidad de que la medición del aparato sea superior a 0,9 m?",
      "b.3) ¿Cuál es el valor de la distancia tal que el 80,51 % de las mediciones estarían por encima de él?"
    ];
    setPart(
      mates,
      "probabilidad-estadistica",
      "mates2-probabilidad-estadistica-d0757e695467",
      label,
      `Apartado b) Las mediciones de un aparato siguen una distribución normal de media 1,5 m y varianza 0,64 m². ${prompts[index]}`
    );
  });

  setStatement(
    mates,
    "probabilidad-estadistica",
    "mates2-probabilidad-estadistica-0290f796295a",
    ["EJERCICIO 4. Elige y resuelve solo uno de los dos apartados siguientes."]
  );
  setPart(
    mates,
    "probabilidad-estadistica",
    "mates2-probabilidad-estadistica-0290f796295a",
    "a.1)",
    "Apartado a) En la entrada del instituto hay tres fotocopiadoras A, B y C con porcentajes de fallos del 3 %, 5 % y 4 %, respectivamente. Un estudiante elige una de las tres al azar. a.1) ¿Cuál es la probabilidad de que fotocopie sin fallos?"
  );
  setPart(
    mates,
    "probabilidad-estadistica",
    "mates2-probabilidad-estadistica-0290f796295a",
    "a.2)",
    "Apartado a) En la entrada del instituto hay tres fotocopiadoras A, B y C con porcentajes de fallos del 3 %, 5 % y 4 %, respectivamente. Un estudiante elige una de las tres al azar. a.2) Si observa que una página es defectuosa, ¿qué probabilidad hay de que haya utilizado la fotocopiadora B?"
  );
  ["b.1)", "b.2)", "b.3)"].forEach((label, index) => {
    const prompts = [
      "b.1) Probabilidad de que tres restaurantes no pasen la inspección.",
      "b.2) Probabilidad de que todos los restaurantes pasen la inspección.",
      "b.3) Probabilidad de que al menos dos restaurantes pasen la inspección."
    ];
    setPart(
      mates,
      "probabilidad-estadistica",
      "mates2-probabilidad-estadistica-0290f796295a",
      label,
      `Apartado b) Una inspectora sabe que el 5 % de los restaurantes no pasará una inspección y elige 8 restaurantes al azar. ${prompts[index]}`
    );
  });

  // -----------------------------------------------------------------------
  // Enunciados oficiales de CCSS II (junio y julio de 2025).
  // -----------------------------------------------------------------------
  // Los enunciados matriciales y de análisis de 2025 se conservan directamente
  // del banco corregido: contienen las matrices completas en MathML y todas las
  // condiciones originales. No se sustituyen por resúmenes.
  // Se elimina el encabezado de 2024 que quedó pegado al último apartado.
  setPart(
    ccss,
    "algebra",
    "ccss2-algebra-2ca61377583d",
    "a.3)",
    "a.3) ¿Cuánto vale dicho mínimo?"
  );

  // -----------------------------------------------------------------------
  // Respuestas verificadas de Matemáticas II.
  // -----------------------------------------------------------------------
  Object.assign(matesAnswers, {
    "mates2-algebra-eaee12b428eb": {
      "a.1)": {
        options: [
          "Si a≠3, SCD con una solución; si a=3, SI y no tiene solución.",
          "Si a≠3, SCI; si a=3, SCD.",
          "SCD para todo a∈ℝ.",
          "Si a=3, SCI con infinitas soluciones."
        ],
        correct: 0,
        solution: `Resolución mediante el teorema de Rouché-Frobenius:
1. La matriz de coeficientes es A=[[1,1,a],[1,0,-2],[2,1,1]].
2. Calculamos det(A)=a-3.
3. Si a≠3, det(A)≠0, por lo que rango(A)=rango(A*)=3, igual al número de incógnitas. El sistema es compatible determinado y tiene una única solución.
4. Si a=3, rango(A)=2. En la matriz ampliada aparece un menor de orden 3 distinto de cero, de modo que rango(A*)=3.
5. Como rango(A)≠rango(A*), el sistema es incompatible y no tiene solución.
Resultado final: una solución si a≠3 y ninguna solución si a=3.`
      },
      "a.2)": {
        options: [
          "(x,y,z)=(4/3,-1/3,2/3).",
          "(x,y,z)=(2/3,1/3,4/3).",
          "(x,y,z)=(1,-1,1).",
          "(x,y,z)=(-4/3,1/3,-2/3)."
        ],
        correct: 0,
        solution: `Resolución:
1. Para a=0 queda x+y=1, x-2z=0 y 2x+y+z=3.
2. De x-2z=0 obtenemos x=2z.
3. De x+y=1, y=1-2z.
4. Sustituimos en la tercera:
2(2z)+(1-2z)+z=3
⇒3z=2
⇒z=2/3.
5. Entonces x=4/3 e y=-1/3.
6. Comprobación:
4/3-1/3=1; 4/3-2(2/3)=0; 8/3-1/3+2/3=3.
Resultado final: (x,y,z)=(4/3,-1/3,2/3).`
      },
      "b.1)": {
        options: ["m≠2.", "m=2.", "m≠1.", "Para todo m∈ℝ."],
        correct: 0,
        solution: `Resolución:
1. A·X-B=X ⇒ A·X-X=B.
2. Sacamos X como factor común por la derecha:
(A-I)X=B.
3. A-I=[[1,1],[1,m-1]].
4. La solución es única si A-I tiene inversa:
det(A-I)=m-2.
5. Por tanto, det(A-I)≠0 si y solo si m≠2.
Resultado final: existe una única solución para m≠2.`
      },
      "b.2)": {
        options: [
          "X=[[1,0],[0,1]].",
          "X=[[0,1],[1,0]].",
          "X=[[1,1],[1,0]].",
          "X=[[-1,0],[0,-1]]."
        ],
        correct: 0,
        solution: `Resolución:
1. Para m=1:
A-I=[[1,1],[1,0]].
2. De (A-I)X=B:
X=(A-I)⁻¹B.
3. Calculamos la inversa mediante determinantes:
det(A-I)=-1.
Con la nomenclatura del curso,
(A-I)⁻¹=Adj((A-I)ᵀ)/det(A-I)
=[[0,1],[1,-1]].
4. Multiplicamos:
X=[[0,1],[1,-1]]·[[1,1],[1,0]]
=[[1,0],[0,1]].
5. Comprobación: A·I-B=I.
Resultado final: X=I₂.`
      }
    },
    "mates2-algebra-e22eda066bed": {
      "a.1)": {
        options: [
          "Si a≠3, SCD; si a=3, SCI.",
          "Si a≠3, SI; si a=3, SCD.",
          "SCD para todo a∈ℝ.",
          "Si a=3, SI."
        ],
        correct: 0,
        solution: `Resolución mediante Rouché-Frobenius:
1. A=[[1,1,-1],[4,2,0],[a,1,1]].
2. det(A)=2a-6=2(a-3).
3. Si a≠3, det(A)≠0, luego rango(A)=rango(A*)=3. Es SCD y tiene una solución.
4. Si a=3, det(A)=0. Al reducir las matrices se obtiene rango(A)=rango(A*)=2.
5. Como el rango común es menor que el número de incógnitas, el sistema es SCI y tiene infinitas soluciones.
Resultado final: SCD si a≠3 y SCI si a=3.`
      },
      "a.2)": {
        options: [
          "(x,y,z)=(-1,2,-1).",
          "(x,y,z)=(1,-2,1).",
          "(x,y,z)=(0,2,0).",
          "(x,y,z)=(-1,1,-2)."
        ],
        correct: 0,
        solution: `Resolución:
1. Para a=0:
x+y-z=2, 4x+2y=0, y+z=1.
2. Simplificamos la segunda: 2x+y=0 ⇒ y=-2x.
3. De y+z=1: z=1-y=1+2x.
4. Sustituimos en la primera:
x-2x-(1+2x)=2
⇒-3x=3
⇒x=-1.
5. Así, y=2 y z=-1.
6. Comprobamos las tres ecuaciones.
Resultado final: (x,y,z)=(-1,2,-1).`
      },
      "b.1)": {
        options: [
          "a∈ℝ\\{-2,1/2}.",
          "a∈{-2,1/2}.",
          "a≠0.",
          "Para todo a∈ℝ."
        ],
        correct: 0,
        solution: `Resolución:
1. Multiplicamos:
A·B=[[1+2a,3+2a],[1-a,1]].
2. Calculamos:
det(A·B)=(1+2a)·1-(3+2a)(1-a)
=2a²+3a-2.
3. Factorizamos:
2a²+3a-2=(2a-1)(a+2).
4. A·B es invertible si su determinante no se anula.
Resultado final: a≠1/2 y a≠-2.`
      },
      "b.2)": {
        options: [
          "(A·B)⁻¹=1/(2a²+3a-2)·[[1,-3-2a],[-1+a,1+2a]].",
          "(A·B)⁻¹=1/(2a²+3a-2)·[[1,3+2a],[1-a,1+2a]].",
          "(A·B)⁻¹=[[1+2a,3+2a],[1-a,1]].",
          "(A·B)⁻¹=1/(a-3)·[[1,-3],[-1,1]]."
        ],
        correct: 0,
        solution: `Resolución:
1. A·B=[[1+2a,3+2a],[1-a,1]].
2. Su determinante es 2a²+3a-2, que debe ser distinto de cero.
3. Usamos la fórmula:
(A·B)⁻¹=Adj((A·B)ᵀ)/det(A·B).
4. Para una matriz 2×2 resulta:
Adj((A·B)ᵀ)=[[1,-(3+2a)],[-(1-a),1+2a]]
=[[1,-3-2a],[-1+a,1+2a]].
Resultado final:
(A·B)⁻¹=1/(2a²+3a-2)·[[1,-3-2a],[-1+a,1+2a]],
para a≠1/2,-2.`
      }
    },
    "mates2-analisis-435f38f7d6e2": {
      "a)": {
        options: ["t=1.", "t=0.", "t=2.", "No existe mínimo."],
        correct: 0,
        solution: `Resolución:
1. f(t)=5(t+1)e^(-t).
2. Derivamos:
f'(t)=-5t e^(-t).
3. Para buscar el mínimo de f' estudiamos su derivada:
f''(t)=5e^(-t)(t-1).
4. f''(t)=0 si t=1.
5. Recta real para f':
si 0≤t<1, tomamos t=0 y f''(0)<0: f' decrece;
si t>1, tomamos t=2 y f''(2)>0: f' crece.
6. Por tanto, f' alcanza su mínimo en t=1.
Resultado final: el cambio es mínimo una hora después de tomar la muestra.`
      },
      "b)": {
        options: ["0.", "5.", "+∞.", "5/e."],
        correct: 0,
        solution: `Resolución:
1. Escribimos:
lim(t→+∞)5(t+1)e^(-t)
=lim(t→+∞)5(t+1)/e^t.
2. Aparece la indeterminación ∞/∞; aplicamos L'Hôpital:
lim(t→+∞)5/e^t=0.
Resultado final: la concentración de virus activos tiende a 0.`
      }
    },
    "mates2-analisis-34ee6210ea28": {
      "a)": {
        options: [
          "V(x)=x(48-2x)(30-2x), 0<x<15.",
          "V(x)=x(48-x)(30-x), 0<x<30.",
          "V(x)=2x(48-2x)(30-2x).",
          "V(x)=(48-2x)(30-2x)."
        ],
        correct: 0,
        solution: `Resolución:
1. Al recortar cuadrados de lado x, la altura es x.
2. El largo de la base es 48-2x y el ancho 30-2x.
3. Volumen=área de la base·altura:
V(x)=x(48-2x)(30-2x).
4. Para que todas las dimensiones sean positivas:
x>0, 48-2x>0 y 30-2x>0.
La condición más restrictiva es x<15.
Resultado final: V(x)=x(48-2x)(30-2x), con 0<x<15.`
      },
      "b)": {
        options: [
          "36 cm × 18 cm × 6 cm.",
          "24 cm × 12 cm × 12 cm.",
          "42 cm × 24 cm × 3 cm.",
          "28 cm × 10 cm × 10 cm."
        ],
        correct: 0,
        solution: `Resolución:
1. Desarrollamos:
V(x)=4x³-156x²+1440x.
2. Derivamos:
V'(x)=12x²-312x+1440
=12(x-6)(x-20).
3. Los puntos críticos son x=6 y x=20, pero x=20 no pertenece a (0,15).
4. V''(x)=24x-312 y V''(6)=-168<0; por tanto, x=6 da un máximo.
5. Dimensiones:
largo=48-12=36 cm,
ancho=30-12=18 cm,
altura=6 cm.
Resultado final: 36 cm × 18 cm × 6 cm.`
      },
      "c)": {
        options: ["32/3 u².", "16/3 u².", "32 u².", "64/3 u²."],
        correct: 0,
        solution: `Resolución:
1. Puntos de corte:
t²-4t=2t-5
⇒t²-6t+5=0
⇒t=1 o t=5.
2. Entre 1 y 5, la recta g(t)=2t-5 queda por encima de la parábola f(t)=t²-4t.
3. El área es:
A=∫[1,5](g(t)-f(t))dt
=∫[1,5](-t²+6t-5)dt.
4. Aplicamos Barrow:
A=[-t³/3+3t²-5t]₁⁵
=32/3.
5. En la representación, el recinto queda sombreado entre ambas curvas desde t=1 hasta t=5.
Resultado final: A=32/3 unidades cuadradas.`
      }
    },
    "mates2-geometria-2a4ebcc775a7": {
      "a.1)": {
        options: [
          "r₃:(x,y,z)=(0,0,0)+λ(0,1,1).",
          "r₃:(x,y,z)=(0,0,0)+λ(1,1,0).",
          "r₃:(x,y,z)=(0,0,0)+λ(1,-1,1).",
          "r₃:(x,y,z)=(0,0,0)+λ(2,1,-1)."
        ],
        correct: 0,
        solution: `Resolución:
1. Los vectores directores son v⃗₁=(1,-1,1) y v⃗₂=(2,1,-1).
2. Un vector perpendicular a ambos es:
v⃗₁×v⃗₂=(0,3,3)=3(0,1,1).
3. Como r₃ pasa por A(0,0,0):
r₃:(x,y,z)=(0,0,0)+λ(0,1,1).
4. Comprobación:
(0,1,1)·(1,-1,1)=0 y
(0,1,1)·(2,1,-1)=0.
Resultado final: r₃:(x,y,z)=λ(0,1,1).`
      },
      "a.2)": {
        options: ["√30/6.", "√5.", "√6/5.", "5/√6."],
        correct: 0,
        solution: `Resolución:
1. Tomamos Q=(1,1,1)∈r₂ y su vector director v⃗=(2,1,-1).
2. Con B=(-1,-1,2):
QB⃗=B-Q=(-2,-2,1).
3. La distancia de un punto a una recta es:
d(B,r₂)=|QB⃗×v⃗|/|v⃗|.
4. QB⃗×v⃗=(1,0,2), de módulo √5; |v⃗|=√6.
5. d=√5/√6=√30/6.
Resultado final: d(B,r₂)=√30/6.`
      },
      "b.1)": {
        options: [
          "(x,y,z)=λ(1,-1,2)+μ(1,-1,3).",
          "x-y+3z=0.",
          "(x,y,z)=λ(1,-1,2)+μ(0,1,1).",
          "x+y+z=0."
        ],
        correct: 0,
        solution: `Resolución:
1. r tiene vector director v⃗=(1,-1,2).
2. El plano π tiene vector normal n⃗=(1,-1,3).
3. El plano buscado contiene r, por lo que contiene v⃗.
4. Además es perpendicular a π, de modo que también puede tomar n⃗ como vector director.
5. Pasa por el origen:
π′:(x,y,z)=λ(1,-1,2)+μ(1,-1,3).
Resultado final: esa es una ecuación paramétrica del plano pedido.`
      },
      "b.2)": {
        options: ["arcsen(8/√66)≈79,96°.", "arccos(8/√66)≈10,04°.", "45°.", "90°."],
        correct: 0,
        solution: `Resolución:
1. v⃗=(1,-1,2) y n⃗=(1,-1,3).
2. Si θ es el ángulo entre la recta y el plano:
sen θ=|v⃗·n⃗|/(|v⃗||n⃗|).
3. v⃗·n⃗=1+1+6=8.
4. |v⃗|=√6 y |n⃗|=√11.
5. sen θ=8/√66.
6. θ=arcsen(8/√66)≈79,96°.
Resultado final: el ángulo es aproximadamente 79,96°.`
      }
    },
    "mates2-geometria-9b20402deeca": {
      "a.1)": {
        options: ["m=6.", "m=-6.", "m=1.", "m=0."],
        correct: 0,
        solution: `Resolución:
1. AB⃗=(1,1,2), AC⃗=(0,-1,3), AD⃗=(1,-1,m+2).
2. Los cuatro puntos son coplanarios si su producto mixto es cero:
det[[1,1,2],[0,-1,3],[1,-1,m+2]]=6-m.
3. 6-m=0 ⇒ m=6.
Resultado final: m=6.`
      },
      "a.2)": {
        options: ["5x-3y-z+1=0.", "x-y+3z=0.", "5x+3y-z-1=0.", "x+y+z-1=0."],
        correct: 0,
        solution: `Resolución:
1. Usamos C(0,0,1), AB⃗=(1,1,2) y AC⃗=(0,-1,3).
2. Un vector normal es:
n⃗=AB⃗×AC⃗=(5,-3,-1).
3. Ecuación por C:
5(x-0)-3(y-0)-(z-1)=0.
4. Simplificamos:
5x-3y-z+1=0.
Resultado final: π≡5x-3y-z+1=0.`
      },
      "a.3)": {
        options: [
          "No; d(P,π)=3/√35<1.",
          "Sí; d(P,π)=3/√35>1.",
          "Sí; d(P,π)=√35/3.",
          "No; P pertenece al plano."
        ],
        correct: 0,
        solution: `Resolución:
1. π≡5x-3y-z+1=0 y P=(1,2,3).
2. Aplicamos la fórmula, escrita como fracción:
d(P,π)=|5·1-3·2-1·3+1|/√(5²+(-3)²+(-1)²).
3. d(P,π)=|-3|/√35=3/√35≈0,507 m.
4. Como 0,507<1, no se respeta la distancia mínima.
Resultado final: el adorno no está correctamente ubicado.`
      },
      "b.1)": {
        options: ["4x+2y+z-4=0.", "x-y+2z-1=0.", "4x-2y+z+4=0.", "x+4y-4z-11=0."],
        correct: 0,
        solution: `Resolución:
1. La recta AB tiene vector director v⃗=B-A=(-1,4,-4).
2. El plano π tiene vector normal n⃗=(-1,1,2).
3. El plano buscado es paralelo a v⃗ y perpendicular a π, por lo que puede tomar v⃗ y n⃗ como directores.
4. Un normal del plano buscado es:
v⃗×n⃗=(12,6,3)=3(4,2,1).
5. Por C(1,1,-2):
4(x-1)+2(y-1)+(z+2)=0.
6. Simplificamos:
4x+2y+z-4=0.
Resultado final: π′≡4x+2y+z-4=0.`
      },
      "b.2)": {
        options: ["m=1 o m=17.", "m=-1 o m=17.", "m=8.", "m=3 o m=11."],
        correct: 0,
        solution: `Resolución:
1. AB⃗=(0,-2,-4), AC⃗=(3,-3,-2), AD⃗=(3,1,m-3).
2. Volumen del tetraedro:
V=|det(AB⃗,AC⃗,AD⃗)|/6.
3. El determinante es 6m-54.
4. Imponemos:
|6m-54|/6=8
⇒|6m-54|=48.
5. Casos:
6m-54=48 ⇒ m=17;
6m-54=-48 ⇒ m=1.
Resultado final: m=1 o m=17.`
      }
    },
    "mates2-probabilidad-estadistica-d0757e695467": {
      "a.1)": {
        options: [
          "P₁=0,1; P₂≈0,0923; P₃≈0,0850.",
          "P₁=0,1; P₂=0,1; P₃=0,1.",
          "P₁=0,9; P₂≈0,8077; P₃≈0,7227.",
          "P₁=0,04; P₂=0,08; P₃=0,12."
        ],
        correct: 0,
        solution: `Resolución:
1. Primera carta:
P₁=4/40=0,1.
2. Segunda carta: primero no sale as y después sí:
P₂=(36/40)(4/39)=6/65≈0,0923.
3. Tercera carta:
P₃=(36/40)(35/39)(4/38)=21/247≈0,0850.
Resultado final: 0,1; 0,0923; 0,0850.`
      },
      "a.2)": {
        options: ["21/26≈0,8077.", "5/26≈0,1923.", "6/65≈0,0923.", "1/2."],
        correct: 0,
        solution: `Resolución:
1. El segundo jugador gana si su primer as aparece después de la segunda extracción.
2. Usamos el complementario:
P(X>2)=1-P(X=1)-P(X=2).
3. P(X=1)=4/40=0,1.
4. P(X=2)=(36/40)(4/39)=6/65.
5. P(X>2)=1-1/10-6/65=21/26≈0,8077.
Resultado final: 21/26≈0,8077.`
      },
      "b.1)": {
        options: ["0,2266.", "0,7734.", "0,1587.", "0,8413."],
        correct: 0,
        solution: `Resolución:
1. X~N(1,5;0,8), porque σ=√0,64=0,8.
2. Tipificamos dentro de la probabilidad:
P(X>2,1)=P((X-1,5)/0,8>(2,1-1,5)/0,8)
=P(Z>0,75).
3. En la tabla: P(Z≤0,75)=0,7734.
4. P(Z>0,75)=1-0,7734=0,2266.
Resultado final: 0,2266.`
      },
      "b.2)": {
        options: ["0,7734.", "0,2266.", "0,8413.", "0,1587."],
        correct: 0,
        solution: `Resolución:
1. Tipificamos:
P(X>0,9)=P(Z>(0,9-1,5)/0,8)=P(Z>-0,75).
2. Por simetría:
P(Z>-0,75)=P(Z<0,75).
3. En la tabla:
P(Z<0,75)=0,7734.
Resultado final: 0,7734.`
      },
      "b.3)": {
        options: ["d≈0,812 m.", "d≈2,188 m.", "d=1,5 m.", "d≈0,9 m."],
        correct: 0,
        solution: `Resolución:
1. Buscamos d tal que P(X>d)=0,8051.
2. Entonces P(X≤d)=1-0,8051=0,1949.
3. Llamamos a al valor tipificado:
P(Z≤a)=0,1949.
4. Por simetría, P(Z≤-0,86)=0,1949; luego a=-0,86.
5. Igualamos:
(d-1,5)/0,8=-0,86.
6. d=1,5-0,86·0,8=0,812.
Resultado final: d≈0,812 m.`
      }
    },
    "mates2-probabilidad-estadistica-0290f796295a": {
      "a.1)": {
        options: ["0,96.", "0,04.", "0,95.", "0,97."],
        correct: 0,
        solution: `Resolución:
1. La máquina se elige al azar:
P(A)=P(B)=P(C)=1/3.
2. Probabilidad total de fallo:
P(F)=1/3·0,03+1/3·0,05+1/3·0,04=0,04.
3. Fotocopiar sin fallos es el suceso contrario:
P(F̄)=1-0,04=0,96.
Resultado final: 0,96.`
      },
      "a.2)": {
        options: ["5/12≈0,4167.", "1/3.", "1/20.", "5/9."],
        correct: 0,
        solution: `Resolución mediante Bayes:
1. P(B)=1/3 y P(F|B)=0,05.
2. P(F)=0,04.
3. P(B|F)=P(B)P(F|B)/P(F).
4. Sustituimos:
P(B|F)=(1/3·0,05)/0,04=5/12≈0,4167.
Resultado final: 5/12≈0,4167.`
      },
      "b.1)": {
        options: ["0,0054.", "0,0515.", "0,6634.", "0,2793."],
        correct: 0,
        solution: `Resolución:
1. X=número de restaurantes que no pasan; X~Bin(8;0,05).
2. P(X=3)=C(8,3)(0,05)³(0,95)⁵.
3. Calculamos:
P(X=3)≈0,0054.
Resultado final: 0,0054.`
      },
      "b.2)": {
        options: ["0,6634.", "0,3366.", "0,2793.", "0,9500."],
        correct: 0,
        solution: `Resolución:
1. Todos pasan equivale a que ninguno falle: X=0.
2. P(X=0)=C(8,0)(0,05)⁰(0,95)⁸.
3. P(X=0)=0,95⁸≈0,6634.
Resultado final: 0,6634.`
      },
      "b.3)": {
        options: ["Aproximadamente 1.", "0,6634.", "0,3366.", "0,0054."],
        correct: 0,
        solution: `Resolución:
1. Sea Y el número que pasa; Y~Bin(8;0,95).
2. Se pide P(Y≥2).
3. Usamos el complementario:
P(Y≥2)=1-P(Y=0)-P(Y=1).
4. P(Y=0)=0,05⁸.
5. P(Y=1)=C(8,1)0,95·0,05⁷.
6. Por tanto:
P(Y≥2)=1-0,05⁸-8·0,95·0,05⁷≈0,99999994.
Resultado final: aproximadamente 1.`
      }
    }
  });

  // -----------------------------------------------------------------------
  // Respuestas verificadas de CCSS II.
  // -----------------------------------------------------------------------
  Object.assign(ccssAnswers, {
    "ccss2-algebra-06b15b069078": {
      "b.2)": {
        options: [
          "X=[[0,1/2],[1/2,1/2]].",
          "X=[[1/2,-1],[2,1]].",
          "X=[[-2,2],[2,0]].",
          "X=[[1,0],[0,1]]."
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de A·B·X=C·X+I y reunimos los términos que contienen X:
A·B·X-C·X=I
⇒(A·B-C)X=I.
2. Calculamos el producto:
A·B=[[-5,3],[4,4]].
3. Restamos las matrices:
A·B-C=[[-2,2],[2,0]].
4. Su determinante es:
det(A·B-C)=(-2)·0-2·2=-4≠0.
Por tanto, la matriz es invertible.
5. Multiplicamos por la izquierda por su inversa:
X=(A·B-C)⁻¹.
6. Con la nomenclatura del curso:
(A·B-C)⁻¹=Adj((A·B-C)ᵀ)/det(A·B-C)
=[[0,1/2],[1/2,1/2]].
7. Comprobación:
[[-2,2],[2,0]]·[[0,1/2],[1/2,1/2]]
=[[1,0],[0,1]]=I.
Resultado final: X=[[0,1/2],[1/2,1/2]].`
      }
    },
    "ccss2-algebra-c9ffcce398b6": {
      "a.1)": {
        options: [
          "B=20x+17y; x+2y≤170, 9x+4y≤900, x+y≥100, x,y≥0.",
          "B=30x+60y; x+2y≥170, 9x+4y≤900, x+y≤100.",
          "B=20x+17y; x+2y≤85, 9x+4y≤75, x+y≥100.",
          "B=17x+20y; x+2y≤170, 9x+4y≥900."
        ],
        correct: 0,
        solution: `Resolución:
1. x=paquetes A; y=paquetes B.
2. Función objetivo: B(x,y)=20x+17y.
3. Trabajo manual:
30x+60y≤85·60=5100
⇒x+2y≤170.
4. Máquinas:
45x+20y≤75·60=4500
⇒9x+4y≤900.
5. Deben enviarse al menos 100:
x+y≥100.
6. No negatividad: x≥0, y≥0.
7. Las rectas frontera dan los vértices factibles (30,70), (80,45) y (100,0).
Resultado final: B=20x+17y con las restricciones indicadas.`
      },
      "a.2)": {
        options: [
          "80 paquetes A y 45 B; beneficio 2365 €.",
          "30 paquetes A y 70 B; beneficio 1790 €.",
          "100 paquetes A y 0 B; beneficio 2000 €.",
          "45 paquetes A y 80 B; beneficio 2260 €."
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos B(x,y)=20x+17y en todos los vértices:
B(30,70)=600+1190=1790 €.
B(80,45)=1600+765=2365 €.
B(100,0)=2000 €.
2. El mayor valor es 2365 €.
3. Se alcanza en (80,45).
Resultado final: 80 paquetes A y 45 paquetes B; beneficio máximo 2365 €.`
      }
    },
    "ccss2-algebra-6e3b2e8fb9d8": {
      "b.2)": {
        options: [
          "X=[[1/2,-1],[2,1]].",
          "X=[[0,1/2],[1/2,1/2]].",
          "X=[[5,0],[2,1]].",
          "X=[[2,2],[0,1]]."
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de C·X=A·B+X.
2. Pasamos X al primer miembro y sacamos factor común:
C·X-X=A·B
⇒(C-I)X=A·B.
3. Calculamos:
A·B=[[5,0],[2,1]]
y
C-I=[[2,2],[0,1]].
4. Como det(C-I)=2≠0, existe su inversa. Multiplicamos por la izquierda:
X=(C-I)⁻¹A·B.
5. Con la nomenclatura del curso:
(C-I)⁻¹=Adj((C-I)ᵀ)/det(C-I)
=[[1/2,-1],[0,1]].
6. Efectuamos el producto:
X=[[1/2,-1],[0,1]]·[[5,0],[2,1]]
=[[1/2,-1],[2,1]].
7. Comprobación:
(C-I)X=[[5,0],[2,1]]=A·B.
Resultado final: X=[[1/2,-1],[2,1]].`
      }
    },
    "ccss2-algebra-2ca61377583d": {
      "a.1)": {
        options: [
          "No; (1,2) no cumple 2x+y≥6.",
          "Sí; (1,2) es un vértice factible.",
          "Sí; F(1,2)=10 es el mínimo.",
          "No; porque F(1,2)=16."
        ],
        correct: 0,
        solution: `Resolución:
1. Comprobamos (1,2) en todas las restricciones.
2. Primera:
2·1+2=4, y debería cumplirse 4≥6.
3. La desigualdad es falsa; por tanto, (1,2) no pertenece a la región factible.
Resultado final: la respuesta de Laura no es correcta.`
      },
      "a.2)": {
        options: [
          "El mínimo se alcanza en todo el segmento entre (3,0) y (0,6), no solo en (3,0).",
          "El mínimo se alcanza únicamente en (3,0).",
          "(3,0) no pertenece al recinto.",
          "El mínimo se alcanza en (1,2)."
        ],
        correct: 0,
        solution: `Resolución:
1. F(x,y)=6x+3y-2=3(2x+y)-2.
2. La región exige 2x+y≥6.
3. Por tanto:
F(x,y)≥3·6-2=16.
4. La igualdad se alcanza en los puntos factibles de la recta 2x+y=6.
5. Dentro del recinto, esos puntos forman el segmento entre (3,0) y (0,6).
Resultado final: (3,0) es un punto de mínimo, pero no es el único.`
      },
      "a.3)": {
        options: ["16.", "18.", "10.", "0."],
        correct: 0,
        solution: `Resolución:
1. En el segmento de mínimos se cumple 2x+y=6.
2. Sustituimos en:
F=6x+3y-2=3(2x+y)-2.
3. F=3·6-2=16.
Resultado final: el valor mínimo es 16.`
      }
    },
    "ccss2-analisis-ef3faa073aff": {
      "b.1)": {
        options: [
          "a=1, b=-3, c=1.",
          "a=1, b=-3, c=-9.",
          "a=-1, b=3, c=1.",
          "a=2, b=-6, c=1."
        ],
        correct: 0,
        solution: `Resolución:
1. f(x)=ax³+bx²+c.
2. f'(x)=3ax²+2bx y f''(x)=6ax+2b.
3. Mínimo en (2,-3):
f'(2)=0 ⇒12a+4b=0.
f(2)=-3 ⇒8a+4b+c=-3.
4. Inflexión en (1,-1):
f''(1)=0 ⇒6a+2b=0.
f(1)=-1 ⇒a+b+c=-1.
5. Las ecuaciones independientes forman el sistema:
12a+4b=0,
6a+2b=0,
8a+4b+c=-3,
a+b+c=-1.
6. Resolviendo: a=1, b=-3, c=1.
7. f''(2)=6>0, por lo que el extremo es mínimo.
Resultado final: a=1, b=-3, c=1.`
      }
    },
    "ccss2-analisis-c1fefc343cb7": {
      "b.1)": {
        options: [
          "Las ecuaciones dan a=1, b=-3 y c=-9, pero (-1,2) es un máximo; no existe una función que cumpla literalmente todas las condiciones.",
          "a=1, b=-3, c=1.",
          "a=-1, b=3, c=-9.",
          "a=2, b=-6, c=-18."
        ],
        correct: 0,
        solution: `Resolución:
1. Sea f(x)=ax³+bx²+cx-3. Sus dos primeras derivadas son:
f'(x)=3ax²+2bx+c,
f''(x)=6ax+2b.
2. Si (-1,2) es un extremo, debe cumplirse:
f(-1)=2 ⇒ -a+b-c=5,
f'(-1)=0 ⇒ 3a-2b+c=0.
3. Si (1,-14) es un punto de inflexión, debe cumplirse:
f(1)=-14 ⇒ a+b+c=-11,
f''(1)=0 ⇒ 6a+2b=0.
4. Reunimos las ecuaciones:
{-a+b-c=5,
 3a-2b+c=0,
 a+b+c=-11,
 6a+2b=0}.
5. Al resolver el sistema obtenemos:
a=1, b=-3, c=-9.
6. Es imprescindible comprobar la naturaleza del extremo:
f''(-1)=6·1·(-1)+2·(-3)=-12<0.
Por tanto, (-1,2) es un máximo relativo, no un mínimo.
Conclusión: la terna determinada por los datos es a=1, b=-3 y c=-9, pero no existe ninguna función que satisfaga literalmente la palabra «mínimo» del enunciado. El enunciado oficial contiene una incompatibilidad.`
      }
    }
  });
})();

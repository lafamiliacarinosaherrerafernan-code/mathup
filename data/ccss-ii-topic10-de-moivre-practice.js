(function () {
  "use strict";

  const SOURCE_DOCUMENT = "documentos/2º BACHILLERATO MATES II/14-Distribución de probabilidad. Distribución Binomial Ejercicios.doc";
  const SOURCE_COURSE = "2bach-mates";
  const SOURCE_COURSE_LABEL = "2.º Bachillerato · Matemáticas II";
  const USED_FOR = "Práctica por temas CCSS II";

  function deMoivreQuestion({ id, sourceExercise, structureId, text, options, solution }) {
    return Object.freeze({
      id,
      rawBaseId: `ccss-ii-topic10|mates-ii|${id}`,
      exerciseId: id,
      partId: `${id}|part-1`,
      courseId: "2bach-ccss",
      practiceCourseId: "2bach-ccss",
      sourceCourse: SOURCE_COURSE,
      sourceCourseLabel: SOURCE_COURSE_LABEL,
      sourceDocument: SOURCE_DOCUMENT,
      source: SOURCE_DOCUMENT,
      sourceExercise,
      sourceType: "cross-course-practice",
      sourceOriginalType: "didactic-source-document",
      officialStatus: "didactic",
      usedFor: USED_FOR,
      topicIndex: 9,
      topicIndexes: [9],
      primaryTopicIndex: 9,
      topic: "Distribución binomial y normal",
      subtopic: "Aproximación binomial-normal",
      exerciseType: "de-moivre-continuity-correction",
      structureId,
      reasoningTypes: ["de-moivre", "correccion-de-continuidad", structureId],
      difficulty: "ordinary",
      classificationStatus: "classified",
      classificationVersion: "ccss-ii-topic10-de-moivre-v1",
      practiceOnly: true,
      availableForTopicPractice: true,
      availableForExamByBlocks: false,
      availableForExam: false,
      text,
      options,
      correct: 0,
      solution
    });
  }

  const questions = [
    deMoivreQuestion({
      id: "ccss-ii-topic10-de-moivre-dado-420-cola-derecha",
      sourceExercise: "Se lanza un dado 420 veces · obtener un cuatro más de 80 veces",
      structureId: "de-moivre-right-tail",
      text: "Se lanza un dado 420 veces. ¿Cuál es la probabilidad de obtener un cuatro mas de 80 veces?",
      options: ["P(X>80) ≈ 0,0853", "P(X>80) ≈ 0,9147", "P(X>80) ≈ 0,1003", "P(X>80) ≈ 0,0668"],
      solution: `Resolución:
1. Sea X el número de veces que aparece el cuatro. Entonces X∼B(420, 1/6), con n=420, p=1/6 y q=5/6.
2. Comprobamos las condiciones de De Moivre: np=420·1/6=70≥5 y nq=420·5/6=350≥5.
3. Aproximamos mediante Y∼N(μ, σ), donde μ=np=70 y σ=√(npq)=√(175/3)≈7,64.
4. El suceso original es P(X>80). Con corrección de continuidad: P(X>80)≈P(Y>80,5).
5. Tipificamos dentro de la probabilidad: P((Y−70)/7,64>(80,5−70)/7,64)=P(Z>1,37).
6. Como Φ(z)=P(Z≤z), P(Z>1,37)=1−Φ(1,37)=1−0,9147=0,0853.
7. Se cumple 0≤0,0853≤1.
Resultado final: la probabilidad es aproximadamente 0,0853 (8,53 %).`
    }),
    deMoivreQuestion({
      id: "ccss-ii-topic10-de-moivre-dado-trucado-420-cola-derecha",
      sourceExercise: "Dado trucado, 420 lanzamientos · obtener un cuatro más de 160 veces",
      structureId: "de-moivre-right-tail-parameter",
      text: "Si el dado estuviese trucado y la probabilidad de sacar el cuatro fuera de 0,4, ¿cuál sería la probabilidad de obtener un cuatro más de 160 veces?",
      options: ["P(X>160) ≈ 0,7734", "P(X>160) ≈ 0,2266", "P(X>160) ≈ 0,6554", "P(X>160) ≈ 0,8413"],
      solution: `Resolución:
1. Sea X el número de cuatros. Entonces X∼B(420, 0,4), con n=420, p=0,4 y q=0,6.
2. Comprobamos De Moivre: np=168≥5 y nq=252≥5.
3. Calculamos μ=np=168 y σ=√(npq)=√100,8≈10,04. La normal aproximante es Y∼N(168, √100,8).
4. El suceso original es P(X>160). Con corrección de continuidad: P(X>160)≈P(Y>160,5).
5. Tipificamos: P(Z>(160,5−168)/10,04)=P(Z>−0,75).
6. Como Φ(z)=P(Z≤z), por simetría P(Z>−0,75)=Φ(0,75)=0,7734.
7. Se cumple 0≤0,7734≤1.
Resultado final: la probabilidad es aproximadamente 0,7734 (77,34 %).`
    }),
    deMoivreQuestion({
      id: "ccss-ii-topic10-de-moivre-tiro-120-exacta",
      sourceExercise: "Competición de tiro · 100 aciertos en 120 tiros",
      structureId: "de-moivre-exact",
      text: "En una competición de tiro el ganador es capaz de acertar 8 dianas de cada diez. ¿Cuál sería la probabilidad de que en 120 tiros acierte 100?",
      options: ["P(X=100) ≈ 0,0604", "P(X=100) ≈ 0,1515", "P(X=100) ≈ 0,7881", "P(X=100) ≈ 0,8485"],
      solution: `Resolución:
1. Sea X el número de aciertos. X∼B(120, 0,8), con n=120, p=0,8 y q=0,2.
2. Comprobamos De Moivre: np=96≥5 y nq=24≥5.
3. Calculamos μ=np=96 y σ=√(npq)=√19,2≈4,38. Aproximamos por Y∼N(96, √19,2).
4. El suceso original es P(X=100). La corrección de continuidad da P(99,5<Y<100,5).
5. Tipificamos dentro de la probabilidad: P((99,5−96)/4,38<Z<(100,5−96)/4,38)=P(0,80<Z<1,03).
6. Como Φ(z)=P(Z≤z), P(0,80<Z<1,03)=Φ(1,03)−Φ(0,80)=0,8485−0,7881=0,0604.
7. Se cumple 0≤0,0604≤1.
Resultado final: la probabilidad es aproximadamente 0,0604 (6,04 %).`
    }),
    deMoivreQuestion({
      id: "ccss-ii-topic10-de-moivre-ojos-1200-cola-derecha",
      sourceExercise: "Ojos azules, 1200 nacimientos · más de 200",
      structureId: "de-moivre-right-tail-large-n",
      text: "La probabilidad de que un niño tenga los ojos azules es de 0,2. Si en el año 2012 en Illescas hubo 1200 nacimientos, ¿cuál es la probabilidad de que halla más de 200 niños con ojos azules?",
      options: ["P(X>200) ≈ 0,9978", "P(X>200) ≈ 0,0022", "P(X>200) ≈ 0,9772", "P(X>200) ≈ 0,5000"],
      solution: `Resolución:
1. Sea X el número de niños con ojos azules. X∼B(1200, 0,2), con p=0,2 y q=0,8.
2. Comprobamos De Moivre: np=240≥5 y nq=960≥5.
3. Calculamos μ=np=240 y σ=√(npq)=√192≈13,86. La normal aproximante es Y∼N(240, √192).
4. El suceso original es P(X>200). Con corrección de continuidad: P(X>200)≈P(Y>200,5).
5. Tipificamos: P(Z>(200,5−240)/13,86)=P(Z>−2,85).
6. Como Φ(z)=P(Z≤z), por simetría P(Z>−2,85)=Φ(2,85)=0,9978.
7. Se cumple 0≤0,9978≤1.
Resultado final: la probabilidad es aproximadamente 0,9978 (99,78 %).`
    }),
    deMoivreQuestion({
      id: "ccss-ii-topic10-de-moivre-test-40-cola-derecha",
      sourceExercise: "Examen tipo test de 40 preguntas · más de 15 aciertos",
      structureId: "de-moivre-right-tail-context",
      text: "Beatriz quiere aprobar un examen de sociología y sabe que el examen consta de 40 preguntas tipo test y en cada pregunta hay tres opciones y que aprueba con más de 15 aciertos. Se quiere presentar sin haber estudiado nada y va a responder al azar . La probabilidad que tiene de aprobar.",
      options: ["P(X>15) ≈ 0,2327", "P(X>15) ≈ 0,7673", "P(X>15) ≈ 0,1587", "P(X>15) ≈ 0,2734"],
      solution: `Resolución:
1. Sea X el número de aciertos. Al responder al azar, X∼B(40, 1/3), con n=40, p=1/3 y q=2/3.
2. Comprobamos De Moivre: np=40/3≈13,33≥5 y nq=80/3≈26,67≥5.
3. Calculamos μ=np=40/3≈13,33 y σ=√(npq)=√(80/9)≈2,98. Aproximamos por Y∼N(40/3, √(80/9)).
4. El suceso original es P(X>15). Con corrección de continuidad: P(X>15)≈P(Y>15,5).
5. Tipificamos: P(Z>(15,5−13,33)/2,98)=P(Z>0,73).
6. Como Φ(z)=P(Z≤z), P(Z>0,73)=1−Φ(0,73)=1−0,7673=0,2327.
7. Se cumple 0≤0,2327≤1.
Resultado final: la probabilidad de aprobar es aproximadamente 0,2327 (23,27 %).`
    }),
    deMoivreQuestion({
      id: "ccss-ii-topic10-de-moivre-dado-250-cola-izquierda",
      sourceExercise: "Dado trucado, media 13,5 en 15 lanzamientos · menos de 210 seises en 250 lanzamientos",
      structureId: "de-moivre-left-tail",
      text: "Tenemos un dado trucado donde p es la probabilidad de que salga el seis que es superior al resto. Si lo lanzamos 15 veces y la media es de 13,5, calcula: Si lo lanzamos 250 veces, ¿cuál sería la probabilidad de obtener menos de 210 seises?",
      options: ["P(X<210) ≈ 0,0005", "P(X<210) ≈ 0,9995", "P(X<210) ≈ 0,0250", "P(X<210) ≈ 0,0500"],
      solution: `Resolución:
1. En los 15 primeros lanzamientos, la media binomial cumple np=13,5. Por tanto, 15p=13,5 y p=0,9; luego q=0,1.
2. Para 250 lanzamientos, X∼B(250, 0,9).
3. Comprobamos De Moivre: np=225≥5 y nq=25≥5.
4. Calculamos μ=np=225 y σ=√(npq)=√22,5≈4,74. Aproximamos por Y∼N(225, √22,5).
5. El suceso original es P(X<210). Con corrección de continuidad: P(X<210)≈P(Y<209,5).
6. Tipificamos: P(Z<(209,5−225)/4,74)=P(Z<−3,27).
7. Como Φ(z)=P(Z≤z), por simetría Φ(−3,27)=1−Φ(3,27)=1−0,9995=0,0005.
8. Se cumple 0≤0,0005≤1.
Resultado final: la probabilidad es aproximadamente 0,0005 (0,05 %).`
    })
  ];

  window.CCSS_II_TOPIC10_DE_MOIVRE_PRACTICE = Object.freeze(questions);
})();

(function () {
  "use strict";

  // Enunciados completos recuperados del documento original
  // "12-Combinatoria Ejercicios". Las expresiones ilegibles del documento
  // (Newton y números combinatorios) no se reconstruyen ni se inventan aquí.
  window.CCSS_I_ORIGINAL_COMBINATORICS_BANK = [
    {
      id: "ccss-i-comb-original-variaciones-8-5",
      text: "¿Cuántos números de cinco cifras diferentes se pueden formar con los dígitos 1, 2, 3, 4, 5, 6, 7 y 8?",
      options: ["6720", "32768", "40320", "56"],
      correct: 0,
      solution: "Importan el orden y no se repiten cifras. Son variaciones sin repetición: V_{8,5}=8·7·6·5·4=6720.",
      source: "Documento original · 10-Combinatoria Ejercicios · Variaciones"
    },
    {
      id: "ccss-i-comb-original-variaciones-repeticion-8-5",
      text: "¿Cuántos números de cinco cifras se pueden formar con los dígitos 1, 2, 3, 4, 5, 6, 7 y 8 si se pueden repetir?",
      options: ["32768", "6720", "40320", "40"],
      correct: 0,
      solution: "Importan el orden y se pueden repetir cifras. Son variaciones con repetición: VR_{8,5}=8^5=32768.",
      source: "Documento original · 10-Combinatoria Ejercicios · Variaciones con repetición"
    },
    {
      id: "ccss-i-comb-original-permutaciones-8",
      text: "¿Cuántos números de ocho cifras se pueden formar ordenando una vez los dígitos 1, 2, 3, 4, 5, 6, 7 y 8?",
      options: ["40320", "32768", "6720", "64"],
      correct: 0,
      solution: "Se ordenan los ocho elementos distintos: P_8=8!=40320.",
      source: "Documento original · 10-Combinatoria Ejercicios · Permutaciones"
    },
    {
      id: "ccss-i-comb-original-permutaciones-caaass",
      text: "¿Cuántas palabras distintas se pueden formar con las letras de CAAASS?",
      options: ["60", "720", "120", "20"],
      correct: 0,
      solution: "Hay 6 letras, con A repetida 3 veces y S repetida 2 veces. P_6^{3,2}=6!/(3!·2!)=60.",
      source: "Documento original · 10-Combinatoria Ejercicios · Permutaciones con repetición"
    },
    {
      id: "ccss-i-comb-original-combinaciones-baraja",
      text: "¿Cuántos grupos de 5 cartas pueden extraerse de una baraja española de 40 cartas sin reposición?",
      options: ["658008", "1086008", "78960960", "40^5"],
      correct: 0,
      solution: "No importa el orden y no hay reposición: C_{40,5}=40!/(5!·35!)=658008.",
      source: "Documento original · 10-Combinatoria Ejercicios · Combinaciones"
    },
    {
      id: "ccss-i-comb-original-combinaciones-examen",
      text: "Un estudiante tiene que responder 8 de las 10 preguntas de un examen. ¿De cuántas formas distintas puede elegirlas?",
      options: ["45", "80", "90", "252"],
      correct: 0,
      solution: "El orden de las preguntas elegidas no importa: C_{10,8}=C_{10,2}=45.",
      source: "Documento original · 10-Combinatoria Ejercicios · Combinaciones"
    },
    {
      id: "ccss-i-comb-original-combinaciones-examen-obligatorias",
      text: "Un estudiante responde 8 de 10 preguntas. Si las tres primeras son obligatorias, ¿de cuántas formas puede elegir el examen?",
      options: ["21", "35", "45", "7"],
      correct: 0,
      solution: "Fijadas las 3 obligatorias, debe elegir otras 5 de las 7 restantes: C_{7,5}=21.",
      source: "Documento original · 10-Combinatoria Ejercicios · Combinaciones"
    },
    {
      id: "ccss-i-comb-original-combinaciones-repeticion-baraja",
      text: "¿Cuántos grupos de 5 cartas pueden obtenerse al elegir entre 40 cartas con reposición?",
      options: ["1086008", "658008", "102400000", "44"],
      correct: 0,
      solution: "No importa el orden y se admite repetición: CR_{40,5}=C_{40+5-1,5}=C_{44,5}=1086008.",
      source: "Documento original · 10-Combinatoria Ejercicios · Combinaciones con repetición"
    },
    {
      id: "ccss-i-comb-original-combinaciones-repeticion-contenedores",
      text: "Un capitán puede cargar 5 contenedores y elegir para cada uno entre fruta, muebles y electrodomésticos, con cantidad suficiente de las tres mercancías. ¿Cuántas composiciones distintas puede cargar?",
      options: ["21", "15", "243", "10"],
      correct: 0,
      solution: "Se eligen 5 elementos entre 3 tipos, sin importar el orden y permitiendo repetición: CR_{3,5}=C_{7,5}=21.",
      source: "Documento original · 10-Combinatoria Ejercicios · Combinaciones con repetición"
    }
  ].map((question, index) => ({
    ...question,
    courseId: "1bach-ccss",
    topicIndex: 11,
    subtopic: question.source.split("·").at(-1).trim(),
    exerciseType: question.id.replace("ccss-i-comb-original-", ""),
    structureId: question.id.replace("ccss-i-comb-original-", "combinatorics-"),
    difficulty: index < 3 ? "basic" : "ordinary",
    sourceType: "original-ccss-i",
    sourceDocument: "documentos/1º BACHILLERATO CCSSI/12-Combinatoria Ejercicios.doc",
    sourceExercise: `Enunciado recuperado ${index + 1}`,
    source: `Documento original del profesor · 12-Combinatoria Ejercicios · Enunciado ${index + 1}`,
    solutionNeedsReview: true
  }));
})();

(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 1 y 2/Simulacro und 1 y 2.pdf";
  const banks = {
    "3eso::numeros reales": [
      q("3eso-numeros-reales-83b54252a008", source, "3. Ejercicio (0,5 puntos): Representa en la recta: c) −√29.", ["Entre −6 y −5, aproximadamente en −5,385", "Entre −5 y −4, aproximadamente en −4,385", "Entre 5 y 6, aproximadamente en 5,385", "Exactamente en −29"], "Resolución:\n1. 5²=25 y 6²=36; por tanto, 5<√29<6.\n2. Al cambiar de signo, −6<−√29<−5.\n3. √29≈5,38516, luego −√29≈−5,38516.\nComprobación: (−5,385)²≈29.\nResultado final: −√29≈−5,385, entre −6 y −5."),
      q("3eso-numeros-reales-4d599e2b110c", source, "2. Ejercicio (1,5 puntos): Realiza y simplifica: b) 2:(2/3−2)⁻²·2:(−2/3)⁻¹.", ["−128/27", "128/27", "−27/128", "64/27"], "Resolución:\n1. 2/3−2=−4/3 y (−4/3)⁻²=9/16.\n2. (−2/3)⁻¹=−3/2.\n3. Operamos de izquierda a derecha: 2:(9/16)·2:(−3/2)=32/9·2·(−2/3)=−128/27.\nComprobación: los dos exponentes negativos se han convertido tomando los inversos antes de operar.\nResultado final: −128/27."),
      q("3eso-simulacro-und-1-2-ejercicio-8-d", source, "8. Ejercicio (1 punto): Calcula y simplifica: d) ∛(−125/8).", ["−5/2", "5/2", "−25/4", "−∛125/8"], "Resolución:\n1. ∛(−125/8)=−∛(125/8).\n2. 125=5³ y 8=2³.\n3. ∛(125/8)=5/2.\nComprobación: (−5/2)³=−125/8.\nResultado final: −5/2.")
    ],
    "3eso::potencias y raices": [
      q("3eso-numeros-reales-b5a21cf08188-b", source, "6. Ejercicio (1,5 puntos): Expresa en forma de única potencia positiva y calcula: b) (54·8⁻³)/(729⁻²·64⁻³).", ["108⁵=14 693 280 768", "108³=1 259 712", "54⁵=459 165 024", "6¹⁰=60 466 176"], "Resolución:\n1. 54·8⁻³=(2·3³)·2⁻⁹=3³·2⁻⁸.\n2. 729⁻²·64⁻³=(3⁶)⁻²·(2⁶)⁻³=3⁻¹²·2⁻¹⁸.\n3. Al dividir: 3³⁻⁽⁻¹²⁾·2⁻⁸⁻⁽⁻¹⁸⁾=3¹⁵·2¹⁰.\n4. 3¹⁵·2¹⁰=(3³·2²)⁵=108⁵.\nComprobación: 108⁵=14 693 280 768.\nResultado final: 108⁵=14 693 280 768.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

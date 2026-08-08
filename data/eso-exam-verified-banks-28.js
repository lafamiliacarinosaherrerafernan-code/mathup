(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const exam = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 5 Expresiones algebraicas/Examen Und 5   2º ES0.pdf";
  const simulacro = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 5 Expresiones algebraicas/Simulacro  Und 5 - 2 ESO.pdf";
  const banks = {
    "2eso::expresiones algebraicas": [
      q("2eso-expresiones-algebraicas-47224551d9ff", exam, "4. Ejercicio (2 puntos): Calcula: d) (5x/2+2x³)².", ["4x⁶+10x⁴+25x²/4", "4x⁶+25x²/4", "4x⁶+5x⁴+25x²/4", "2x⁶+10x⁴+5x²/2"], "Resolución:\n1. Aplicamos (a+b)²=a²+2ab+b² con a=5x/2 y b=2x³.\n2. a²=25x²/4; 2ab=2·5x/2·2x³=10x⁴; b²=4x⁶.\n3. Ordenamos por grado: 4x⁶+10x⁴+25x²/4.\nComprobación: multiplicar el binomio por sí mismo produce los mismos tres términos.\nResultado final: 4x⁶+10x⁴+25x²/4."),
      q("2eso-expresiones-algebraicas-8b2ed6911c44-a", exam, "3. Ejercicio (2 puntos): Dados P(x)=−2x³+3x²+5 y Q(x)=5x²−x+4, calcula: a) P(x)−2Q(x).", ["−2x³−7x²+2x−3", "−2x³+13x²−2x+13", "−2x³−2x²+x+1", "−4x³−7x²+2x−3"], "Resolución:\n1. 2Q(x)=10x²−2x+8.\n2. P(x)−2Q(x)=−2x³+3x²+5−10x²+2x−8.\n3. Reducimos términos semejantes: −2x³−7x²+2x−3.\nComprobación: para x=1, P(1)=6, Q(1)=8 y 6−2·8=−10; el polinomio obtenido también vale −10.\nResultado final: −2x³−7x²+2x−3."),
      q("2eso-expresiones-algebraicas-8b2ed6911c44-b", exam, "3. Ejercicio (2 puntos): Dados P(x)=−2x³+3x²+5 y Q(x)=5x²−x+4, calcula: b) P(x)·Q(x).", ["−10x⁵+17x⁴−11x³+37x²−5x+20", "−10x⁵+2x⁴−8x³+20", "−10x⁵+17x⁴+11x³+37x²−5x+20", "10x⁵−17x⁴+11x³−37x²+5x−20"], "Resolución:\n1. Multiplicamos −2x³ por Q: −10x⁵+2x⁴−8x³.\n2. Multiplicamos 3x² por Q: 15x⁴−3x³+12x².\n3. Multiplicamos 5 por Q: 25x²−5x+20.\n4. Sumamos: −10x⁵+17x⁴−11x³+37x²−5x+20.\nComprobación: en x=1, P(1)Q(1)=6·8=48 y el resultado vale 48.\nResultado final: −10x⁵+17x⁴−11x³+37x²−5x+20."),
      q("2eso-expresiones-algebraicas-4cf51b8ba9a8-a", simulacro, "3. Ejercicio (2 puntos): Dados P(x)=−2x²+3x+5 y Q(x)=5x²−x+4, calcula: a) P(x)−2x·Q(x).", ["−10x³−5x+5", "−10x³−4x²−5x+5", "10x³−5x+5", "−2x²−7x+1"], "Resolución:\n1. 2xQ(x)=10x³−2x²+8x.\n2. Restamos: −2x²+3x+5−10x³+2x²−8x.\n3. Los términos en x² se anulan y queda −10x³−5x+5.\nComprobación: para x=1, P(1)=6, Q(1)=8 y 6−2·8=−10; el resultado también vale −10.\nResultado final: −10x³−5x+5."),
      q("2eso-expresiones-algebraicas-4cf51b8ba9a8-b", simulacro, "3. Ejercicio (2 puntos): Dados P(x)=−2x²+3x+5 y Q(x)=5x²−x+4, calcula: b) P(x)·Q(x).", ["−10x⁴+17x³+14x²+7x+20", "−10x⁴+2x³−8x²+20", "−10x⁴+17x³−14x²+7x+20", "10x⁴−17x³−14x²−7x−20"], "Resolución:\n1. (−2x²)Q=−10x⁴+2x³−8x².\n2. (3x)Q=15x³−3x²+12x.\n3. 5Q=25x²−5x+20.\n4. Sumamos: −10x⁴+17x³+14x²+7x+20.\nComprobación: para x=1, P(1)Q(1)=6·8=48 y el polinomio obtenido vale 48.\nResultado final: −10x⁴+17x³+14x²+7x+20.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

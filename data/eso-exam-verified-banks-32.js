(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const exam = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 3 Polinomios/examen und 3 4º ESO C.pdf";
  const simulacro = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 3 Polinomios/Simulacro  und 3 4º ESO C.pdf";
  const banks = {
    "4eso-b::expresiones algebraicas": [
      q("4eso-b-expresiones-algebraicas-4a1a14793f88", exam, "3. Ejercicio: Dado P(x)=2x²+mx+1, determina m para que al dividirlo por x−1 su resto sea 2.", ["m=−1", "m=1", "m=−3", "m=2"], "Resolución:\n1. Por el teorema del resto, al dividir por x−1 el resto es P(1).\n2. P(1)=2+m+1=m+3.\n3. Exigimos m+3=2, luego m=−1.\nComprobación: con m=−1, P(1)=2−1+1=2.\nResultado final: m=−1."),
      q("4eso-b-expresiones-algebraicas-9ab522e7bbc5", exam, "4. Ejercicio: Opera y simplifica: a) x/(x−1)+3/(x²−1)+2/(x²−2x+1).", ["(x³+4x−1)/[(x−1)²(x+1)]", "(x³+4x+1)/[(x−1)²(x+1)]", "(x²+4x−1)/(x²−1)", "(x³−1)/[(x−1)²(x+1)]"], "Resolución:\n1. x²−1=(x−1)(x+1) y x²−2x+1=(x−1)².\n2. El denominador común es (x−1)²(x+1).\n3. El numerador es x(x−1)(x+1)+3(x−1)+2(x+1).\n4. Simplificando: x³−x+3x−3+2x+2=x³+4x−1.\nComprobación: dominio x≠±1.\nResultado final: (x³+4x−1)/[(x−1)²(x+1)]."),
      q("4eso-b-expresiones-algebraicas-10c3d81ea8d7", exam, "4. Ejercicio: Opera y simplifica: b) (2x²+x)/(x²−1):(2x+1)/(4x²−4).", ["4x", "x/4", "4x/(x²−1)", "2x+1"], "Resolución:\n1. Factorizamos: 2x²+x=x(2x+1), x²−1=(x−1)(x+1) y 4x²−4=4(x²−1).\n2. Multiplicamos por la inversa de la segunda fracción.\n3. Se cancelan 2x+1 y x²−1, y queda 4x.\nComprobación: restricciones x≠−1, 1 y −1/2.\nResultado final: 4x."),
      q("4eso-b-expresiones-algebraicas-35b71dd309c3", exam, "4. Ejercicio: Opera y simplifica: c) 1+1/x²−(x+1)/(x²+x).", ["(x²−x+1)/x²", "(x²+x+1)/x²", "1/x²", "(x−1)/x"], "Resolución:\n1. x²+x=x(x+1), por lo que (x+1)/(x²+x)=1/x.\n2. 1+1/x²−1/x.\n3. Con denominador x²: (x²+1−x)/x²=(x²−x+1)/x².\nComprobación: restricciones x≠0 y x≠−1.\nResultado final: (x²−x+1)/x²."),
      q("4eso-b-expresiones-algebraicas-faa7ccb1cfc5", simulacro, "4. Ejercicio: Opera y simplifica: a) x/(x−1)+3/(x³−x)+2/x².", ["(x⁴+x³+2x²+3x−2)/[x²(x−1)(x+1)]", "(x³+2x²+3x−2)/[x²(x−1)(x+1)]", "(x⁴+x³−2x²+3x+2)/[x²(x−1)(x+1)]", "(x²+3x+2)/(x³−x)"], "Resolución:\n1. x³−x=x(x−1)(x+1).\n2. El denominador común es x²(x−1)(x+1).\n3. El numerador es x·x²(x+1)+3x+2(x−1)(x+1).\n4. Resulta x⁴+x³+2x²+3x−2.\nComprobación: dominio x≠−1,0,1.\nResultado final: (x⁴+x³+2x²+3x−2)/[x²(x−1)(x+1)]."),
      q("4eso-b-expresiones-algebraicas-6c0c71c3a271", simulacro, "4. Ejercicio: Opera y simplifica: b) (3x+3)/(x³−9x)·(3x²−9x)/(x²−1).", ["9/[(x+3)(x−1)]", "9/[(x−3)(x+1)]", "9x/[(x+3)(x−1)]", "3/[(x+3)(x−1)]"], "Resolución:\n1. Factorizamos: 3x+3=3(x+1), x³−9x=x(x−3)(x+3).\n2. 3x²−9x=3x(x−3) y x²−1=(x−1)(x+1).\n3. Cancelamos x, x−3 y x+1.\n4. Queda 9/[(x+3)(x−1)].\nComprobación: se mantienen las restricciones originales x≠0,±3,±1.\nResultado final: 9/[(x+3)(x−1)]."),
      q("4eso-b-expresiones-algebraicas-0e6e968be427", simulacro, "4. Ejercicio: Opera y simplifica: c) 1/(4x)+1/x²−(x+1)/(x³+x²).", ["1/(4x)", "5/(4x)", "1/x²", "(x+4)/(4x²)"], "Resolución:\n1. x³+x²=x²(x+1).\n2. (x+1)/(x³+x²)=1/x².\n3. Los términos +1/x² y −1/x² se anulan.\n4. Queda 1/(4x).\nComprobación: restricciones x≠0 y x≠−1.\nResultado final: 1/(4x).")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

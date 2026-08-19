(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const exam = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 1 y 2/Examen 3 und 1 y 2.pdf";
  const simulacro = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 1 y 2/Simulacro und 1 y 2.pdf";
  const banks = {
    "3eso::potencias y raices": [
      q("3eso-numeros-reales-f6310cffcd87-a", exam, "6. Ejercicio (1,5 puntos): Expresa con exponentes positivos y calcula: a) {[(9/4)²:(2/3)⁻¹·(6/4)³]}/{[(4/6)⁻³·(3/2)²]}.", ["3/2", "2/3", "9/4", "27/8"], "Resolución:\n1. En el numerador: (9/4)²:(2/3)⁻¹·(6/4)³=81/16:(3/2)·(3/2)³=729/64.\n2. En el denominador: (4/6)⁻³·(3/2)²=(2/3)⁻³·(3/2)²=(3/2)⁵=243/32.\n3. Dividimos: 729/64·32/243=3/2.\nComprobación: 729/243=3 y 32/64=1/2.\nResultado final: 3/2."),
      q("3eso-numeros-reales-34564e54729c-b", exam, "6. Ejercicio (1,5 puntos): Expresa como una única potencia positiva y calcula: b) (18·8⁻³)/(54⁻²·4⁻³).", ["3⁸=6561", "3⁻⁸=1/6561", "2⁸=256", "6⁸=1 679 616"], "Resolución:\n1. 18·8⁻³=(2·3²)·2⁻⁹=3²·2⁻⁸.\n2. 54⁻²·4⁻³=(2·3³)⁻²·2⁻⁶=2⁻⁸·3⁻⁶.\n3. El cociente es 3⁸.\n4. 3⁸=6561.\nComprobación: al simplificar las potencias de 2 se cancelan.\nResultado final: 3⁸=6561."),
      q("3eso-numeros-reales-6650cb644d3a", exam, "8. Ejercicio (1 punto): Calcula y simplifica: d) ∛(−64/27).", ["−4/3", "4/3", "−8/3", "−2/3"], "Resolución:\n1. La raíz cúbica conserva el signo negativo.\n2. 64=4³ y 27=3³.\n3. ∛(−64/27)=−4/3.\nComprobación: (−4/3)³=−64/27.\nResultado final: −4/3.")
    ],
    "3eso::numeros reales": [
      q("3eso-numeros-reales-a6a2d4b7a409", simulacro, "4. Ejercicio: Pasa a fracción generatriz y calcula: a) 0,06̅−0,6:3,05̅.", ["−107/825", "107/825", "1/15", "−54/275"], "Resolución:\n1. 0,06̅=1/15, 0,6=3/5 y 3,05̅=55/18.\n2. (3/5):(55/18)=3/5·18/55=54/275.\n3. 1/15−54/275=55/825−162/825=−107/825.\nComprobación: −107/825≈−0,129697.\nResultado final: −107/825.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

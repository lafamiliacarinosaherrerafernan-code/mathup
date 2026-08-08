(function () {
  const DIDACTIC_SOURCE = "Banco didáctico · CCSS II";
  const PRACTICE_USE = "Práctica por temas CCSS II";

  function question(id, templateId, text, options, solution, extra = {}) {
    return {
      id,
      exerciseId: id,
      templateId,
      text,
      options,
      correct: 0,
      solution,
      source: DIDACTIC_SOURCE,
      sourceType: "didactic-topic-bank",
      usedFor: PRACTICE_USE,
      ...extra
    };
  }

  const indefinite = [
    question("ccss2-ind-01", "ccss2-ind-power", "Calcula la primitiva ∫ 3x² dx.", ["x³ + C", "6x + C", "3x³ + C", "x² + C"], "Aplicamos la regla de la potencia: ∫3x² dx = 3·x³/3 = x³ + C.\nResultado final: x³ + C."),
    question("ccss2-ind-02", "ccss2-ind-power", "Calcula la primitiva ∫ 5x⁴ dx.", ["x⁵ + C", "20x³ + C", "5x⁵ + C", "x⁴ + C"], "∫5x⁴ dx = 5·x⁵/5.\nResultado final: x⁵ + C."),
    question("ccss2-ind-03", "ccss2-ind-power", "Calcula la primitiva ∫ 8x³ dx.", ["2x⁴ + C", "24x² + C", "8x⁴ + C", "4x⁴ + C"], "∫8x³ dx = 8·x⁴/4.\nResultado final: 2x⁴ + C."),
    question("ccss2-ind-04", "ccss2-ind-negative-power", "Calcula ∫ 4/x³ dx.", ["−2/x² + C", "4 ln|x| + C", "−4/x⁴ + C", "2/x² + C"], "Escribimos 4/x³ = 4x⁻³. Entonces ∫4x⁻³ dx = 4x⁻²/(−2).\nResultado final: −2/x² + C."),
    question("ccss2-ind-05", "ccss2-ind-root", "Calcula ∫ √x dx.", ["(2/3)x√x + C", "2√x + C", "x√x + C", "1/(2√x) + C"], "√x=x^(1/2). Al aumentar el exponente queda 3/2 y dividimos por 3/2.\nResultado final: (2/3)x√x + C."),
    question("ccss2-ind-06", "ccss2-ind-root", "Calcula ∫ 1/√x dx.", ["2√x + C", "−2/√x + C", "ln|x| + C", "√x/2 + C"], "1/√x=x^(−1/2). Aplicamos la regla de la potencia.\nResultado final: 2√x + C."),
    question("ccss2-ind-07", "ccss2-ind-polynomial", "Calcula ∫ (6x² − 4x + 3) dx.", ["2x³ − 2x² + 3x + C", "6x³ − 4x² + 3x + C", "12x − 4 + C", "2x³ − 4x² + 3 + C"], "Integramos término a término: ∫6x²dx=2x³, ∫−4xdx=−2x² y ∫3dx=3x.\nResultado final: 2x³−2x²+3x+C."),
    question("ccss2-ind-08", "ccss2-ind-polynomial", "Calcula ∫ (4x³ + 2x − 5) dx.", ["x⁴ + x² − 5x + C", "12x² + 2 + C", "4x⁴ + 2x² − 5x + C", "x⁴ + 2x² − 5 + C"], "Integramos cada sumando.\nResultado final: x⁴+x²−5x+C."),
    question("ccss2-ind-09", "ccss2-ind-polynomial", "Halla una primitiva de f(x)=9x²−8x+1.", ["F(x)=3x³−4x²+x+C", "F(x)=18x−8", "F(x)=9x³−8x²+x+C", "F(x)=3x³−8x²+1+C"], "Integramos término a término y añadimos la constante.\nResultado final: F(x)=3x³−4x²+x+C."),
    question("ccss2-ind-10", "ccss2-ind-exp", "Calcula ∫ 4eˣ dx.", ["4eˣ + C", "e⁴ˣ + C", "4xeˣ + C", "eˣ/4 + C"], "La primitiva de eˣ es eˣ; el factor 4 se conserva.\nResultado final: 4eˣ+C."),
    question("ccss2-ind-11", "ccss2-ind-exp-linear", "Calcula ∫ e^(3x) dx.", ["e^(3x)/3 + C", "3e^(3x) + C", "e^(3x) + C", "xe^(3x) + C"], "Como la derivada de 3x es 3, compensamos dividiendo entre 3.\nResultado final: e^(3x)/3+C."),
    question("ccss2-ind-12", "ccss2-ind-exp-linear", "Calcula ∫ 5e^(2x) dx.", ["(5/2)e^(2x) + C", "10e^(2x) + C", "5e^(2x) + C", "(2/5)e^(2x) + C"], "La primitiva de e^(2x) es e^(2x)/2.\nResultado final: (5/2)e^(2x)+C."),
    question("ccss2-ind-13", "ccss2-ind-log", "Calcula ∫ 1/x dx, con x≠0.", ["ln|x| + C", "−1/x² + C", "x ln|x| + C", "1/x² + C"], "Es la integral inmediata logarítmica.\nResultado final: ln|x|+C."),
    question("ccss2-ind-14", "ccss2-ind-log-linear", "Calcula ∫ 1/(x+4) dx.", ["ln|x+4| + C", "ln|x|+4+C", "−1/(x+4)² + C", "x/(x+4) + C"], "El denominador x+4 tiene derivada 1.\nResultado final: ln|x+4|+C."),
    question("ccss2-ind-15", "ccss2-ind-log-linear", "Calcula ∫ 3/(3x−2) dx.", ["ln|3x−2| + C", "3ln|3x−2| + C", "ln|x−2| + C", "−1/(3x−2)² + C"], "El numerador es la derivada del denominador.\nResultado final: ln|3x−2|+C."),
    question("ccss2-ind-16", "ccss2-ind-linear-combination", "Calcula ∫ (2eˣ + 3/x) dx.", ["2eˣ + 3ln|x| + C", "2eˣ + 3/x² + C", "e^(2x) + ln|3x| + C", "2xeˣ + 3ln|x| + C"], "Usamos la linealidad y dos primitivas inmediatas.\nResultado final: 2eˣ+3ln|x|+C."),
    question("ccss2-ind-17", "ccss2-ind-simplify", "Simplifica primero y calcula ∫ (x³+x²)/x² dx, con x≠0.", ["x²/2 + x + C", "x² + x + C", "3x² + 2x + C", "ln|x| + x + C"], "Simplificamos (x³+x²)/x²=x+1. Después integramos.\nResultado final: x²/2+x+C."),
    question("ccss2-ind-18", "ccss2-ind-simplify", "Simplifica primero y calcula ∫ (6x²−3x)/x dx, con x≠0.", ["3x² − 3x + C", "6x − 3 + C", "2x³ − 3x²/2 + C", "3x² − 3ln|x| + C"], "Simplificamos (6x²−3x)/x=6x−3. Integramos término a término.\nResultado final: 3x²−3x+C."),
    question("ccss2-ind-19", "ccss2-ind-verify", "¿Cuál de estas funciones es una primitiva de f(x)=4x³−2x?", ["F(x)=x⁴−x²+7", "F(x)=12x²−2", "F(x)=4x⁴−2x²", "F(x)=x⁴−2x+7"], "Derivamos la primera opción: F′(x)=4x³−2x. La constante 7 desaparece.\nResultado final: F(x)=x⁴−x²+7."),
    question("ccss2-ind-20", "ccss2-ind-condition", "Halla la primitiva de f(x)=2x que cumple F(1)=5.", ["F(x)=x²+4", "F(x)=x²+5", "F(x)=2x²+3", "F(x)=x²−4"], "La familia es F(x)=x²+C. Como F(1)=1+C=5, C=4.\nResultado final: F(x)=x²+4."),
    question("ccss2-ind-21", "ccss2-ind-condition", "Halla la primitiva de f(x)=3x²+2 que cumple F(0)=−1.", ["F(x)=x³+2x−1", "F(x)=x³+2x+1", "F(x)=3x³+2x−1", "F(x)=6x+2"], "F(x)=x³+2x+C y F(0)=C=−1.\nResultado final: F(x)=x³+2x−1."),
    question("ccss2-ind-22", "ccss2-ind-constant", "Calcula ∫ (7−2x) dx.", ["7x−x²+C", "7−x²+C", "7x−2x²+C", "−2+C"], "La primitiva de 7 es 7x y la de −2x es −x².\nResultado final: 7x−x²+C."),
    question("ccss2-ind-23", "ccss2-ind-fractional-power", "Calcula ∫ x^(3/2) dx.", ["(2/5)x^(5/2)+C", "(3/2)x^(1/2)+C", "(5/2)x^(5/2)+C", "x^(5/2)+C"], "Aumentamos 3/2 en una unidad: 5/2, y dividimos por 5/2.\nResultado final: (2/5)x^(5/2)+C."),
    question("ccss2-ind-24", "ccss2-ind-linear-combination", "Calcula ∫ (2x³−6/x+eˣ) dx.", ["x⁴/2−6ln|x|+eˣ+C", "6x²+6/x²+eˣ+C", "2x⁴−6ln|x|+xeˣ+C", "x⁴/2−6/x²+eˣ+C"], "Integramos cada término mediante primitivas inmediatas.\nResultado final: x⁴/2−6ln|x|+eˣ+C.")
  ].map((item) => ({ ...item, integrationMethod: "immediate" }));

  const definite = [
    question("ccss2-def-01", "ccss2-def-barrow-polynomial", "Calcula ∫₀² 3x² dx.", ["8", "4", "12", "6"], "Una primitiva es x³. Aplicamos Barrow: 2³−0³=8.\nResultado final: 8."),
    question("ccss2-def-02", "ccss2-def-barrow-polynomial", "Calcula ∫₁³ 2x dx.", ["8", "4", "6", "10"], "Una primitiva es x². Aplicamos Barrow: 3²−1²=8.\nResultado final: 8."),
    question("ccss2-def-03", "ccss2-def-barrow-linear", "Calcula ∫₀⁴ (x+1) dx.", ["12", "10", "8", "16"], "Una primitiva es x²/2+x. Su valor entre 0 y 4 es 8+4=12.\nResultado final: 12."),
    question("ccss2-def-04", "ccss2-def-barrow-exp", "Calcula ∫₀¹ eˣ dx.", ["e−1", "e", "1", "e+1"], "Una primitiva de eˣ es eˣ. Aplicamos Barrow: e¹−e⁰=e−1.\nResultado final: e−1."),
    question("ccss2-def-05", "ccss2-def-barrow-log", "Calcula ∫₁ᵉ 1/x dx.", ["1", "e−1", "ln(e−1)", "e"], "Una primitiva es ln|x|. Entonces ln e−ln 1=1−0.\nResultado final: 1."),
    question("ccss2-def-06", "ccss2-def-area-line", "Calcula el área limitada por y=2x, el eje X y las rectas x=0 y x=3.", ["9", "6", "3", "12"], "Como 2x≥0 en [0,3], el área es ∫₀³2x dx=[x²]₀³=9.\nResultado final: 9 unidades cuadradas."),
    question("ccss2-def-07", "ccss2-def-area-parabola", "Calcula el área bajo y=4−x² entre x=0 y x=2.", ["16/3", "8/3", "4", "20/3"], "La función es no negativa en [0,2]. ∫₀²(4−x²)dx=[4x−x³/3]₀²=8−8/3.\nResultado final: 16/3."),
    question("ccss2-def-08", "ccss2-def-average", "El valor de ∫₀² (3x+1) dx es...", ["8", "7", "6", "10"], "Una primitiva es 3x²/2+x. Al evaluar en 2 y 0 obtenemos 6+2.\nResultado final: 8."),
    question("ccss2-def-09", "ccss2-def-symmetry", "Calcula ∫₋₂² x³ dx.", ["0", "8", "16", "−8"], "x³ es impar y el intervalo es simétrico respecto de 0; las áreas con signo se cancelan.\nResultado final: 0."),
    question("ccss2-def-10", "ccss2-def-constant", "Calcula ∫₂⁵ 4 dx.", ["12", "20", "7", "4"], "Es el área de un rectángulo de base 5−2=3 y altura 4.\nResultado final: 12."),
    question("ccss2-def-11", "ccss2-def-property", "Si ∫₁⁴ f(x)dx=7, ¿cuánto vale ∫₄¹ f(x)dx?", ["−7", "7", "0", "14"], "Al intercambiar los límites de integración cambia el signo.\nResultado final: −7."),
    question("ccss2-def-12", "ccss2-def-property", "Si ∫₀² f(x)dx=3 y ∫₂⁵ f(x)dx=4, calcula ∫₀⁵ f(x)dx.", ["7", "1", "12", "−1"], "Por aditividad de intervalos: ∫₀⁵f=∫₀²f+∫₂⁵f=3+4.\nResultado final: 7.")
  ];

  function compatibleMatesIIDefinedQuestions() {
    const matesCourse = typeof courseById === "function" ? courseById("2bach-mates") : null;
    const source = matesCourse && window.MargaritaBachExam?.buildTopicQuestions
      ? window.MargaritaBachExam.buildTopicQuestions(matesCourse, 11)
      : [];
    const advanced = /por partes|fracciones simples|cambio de variable complejo|sustituci[oó]n trigonom[eé]trica/i;
    return source.filter((item) => !advanced.test(`${item.text || ""} ${item.solution || ""}`)).map((item) => ({
      ...item,
      exerciseId: `ccss2-practice-from-mates2:${item.exerciseId || item.rawBaseId || item.id}`,
      sourceCourseId: "2bach-mates",
      sourceCourseLabel: "PAU Matemáticas II",
      sourceType: "official-pau-cross-course-practice",
      usedFor: PRACTICE_USE
    }));
  }

  function build(bankKey) {
    if (bankKey === "ccss-ii-integrales-indefinidas-inmediatas") return indefinite.map((item) => ({ ...item }));
    if (bankKey === "ccss-ii-integrales-definidas") return [...definite.map((item) => ({ ...item })), ...compatibleMatesIIDefinedQuestions()];
    return [];
  }

  window.MargaritaTopicPracticeBanks = { build, indefinite, definite };
})();

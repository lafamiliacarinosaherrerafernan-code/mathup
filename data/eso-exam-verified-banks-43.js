(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const exam = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 1 y 2/Examen 3 und 1 y 2.pdf";
  const simulacro = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 1 y 2/Simulacro und 1 y 2.pdf";
  const banks = {
    "3eso::numeros reales": [
      q(
        "3eso-numeros-reales-062bb412b019",
        exam,
        "2. Ejercicio (1,5 punto): Realiza las siguientes operaciones y simplifica: a) √[(-3)⁻²+3/9]−(1/3)·2:(−4/3−1)+1.",
        ["41/21", "20/21", "13/21", "−1/21"],
        "Resolución:\n1. Dentro de la raíz: (−3)⁻²=1/9 y 3/9=1/3=3/9. Por tanto, √[1/9+3/9]=√(4/9)=2/3.\n2. En el paréntesis: −4/3−1=−4/3−3/3=−7/3.\n3. Conservando la expresión completa: (2/3)−(1/3)·2:(−7/3)+1.\n4. Multiplicamos y dividimos de izquierda a derecha: (1/3)·2:(−7/3)=(2/3)·(−3/7)=−2/7.\n5. Entonces 2/3−(−2/7)+1=2/3+2/7+1=14/21+6/21+21/21=41/21.\nComprobación: 41/21≈1,95238; la operación original da el mismo valor.\nResultado final: 41/21."
      ),
      q(
        "3eso-numeros-reales-00b4786f39c2",
        exam,
        "8. Ejercicio (1 punto): Calcula y simplifica: b) ⁵√(5⁴)·√[⁵√(5²)].",
        ["5", "√5", "25", "⁵√5"],
        "Resolución:\n1. Expresamos cada radical como potencia: ⁵√(5⁴)=5^(4/5).\n2. El segundo factor es √[⁵√(5²)]=[5^(2/5)]^(1/2)=5^(1/5).\n3. Multiplicamos potencias de la misma base: 5^(4/5)·5^(1/5)=5^(5/5)=5.\nComprobación: al elevar el producto a la quinta potencia se obtiene 5⁵.\nResultado final: 5."
      ),
      q(
        "3eso-numeros-reales-64ca0db98d2d",
        exam,
        "8. Ejercicio (1 punto): Calcula y simplifica: c) 5x²z³·∛(243x¹¹z¹⁵).",
        ["15x⁵z⁸∛(9x²)", "15x³z⁵∛(9x²)", "5x⁵z⁸∛(9x²)", "45x⁵z⁸∛(3x²)"],
        "Resolución:\n1. Extraemos cubos perfectos del radicando: 243=27·9=3³·9, x¹¹=x⁹·x²=(x³)³·x² y z¹⁵=(z⁵)³.\n2. Por tanto, ∛(243x¹¹z¹⁵)=3x³z⁵∛(9x²).\n3. Multiplicamos por el factor exterior: 5x²z³·3x³z⁵∛(9x²)=15x⁵z⁸∛(9x²).\nComprobación: (3x³z⁵)³·9x²=27x⁹z¹⁵·9x²=243x¹¹z¹⁵.\nResultado final: 15x⁵z⁸∛(9x²)."
      ),
      q(
        "3eso-numeros-reales-f86e2163d1a9",
        simulacro,
        "1. Ejercicio (0,5 puntos): Clasifica los siguientes números: −3/4; −0,5; −√9; −√25; √3; 112,0018̅; 14/7.",
        ["−3/4∈Q; −0,5∈Q; −√9∈Z; −√25∈Z; √3∈I; 112,0018̅∈Q; 14/7∈N", "Todos pertenecen a Q", "−3/4∈Z; −0,5∈Z; −√9∈N; −√25∈N; √3∈Q; 112,0018̅∈I; 14/7∈Q", "Solo √3 y 112,0018̅ son irracionales"],
        "Resolución:\n1. −3/4 y −0,5=−1/2 son racionales no enteros: pertenecen a Q.\n2. −√9=−3 y −√25=−5 son enteros: pertenecen a Z.\n3. √3 no es raíz exacta de un cuadrado perfecto: es irracional, I.\n4. 112,0018̅ es decimal periódico y, por ello, racional: pertenece a Q.\n5. 14/7=2 es natural: pertenece a N.\nComprobación: N⊂Z⊂Q⊂R y todos salvo √3 pueden escribirse como cociente de enteros.\nResultado final: Q, Q, Z, Z, I, Q y N, respectivamente."
      ),
      q(
        "3eso-numeros-reales-33787a3c3e24",
        simulacro,
        "2. Ejercicio (1,5 punto): Realiza las siguientes operaciones y simplifica: a) √[(-4)²+3²]−(1/3):2·(−1/3−1)+2.",
        ["65/9", "61/9", "20/9", "7"],
        "Resolución:\n1. La raíz contiene solamente la suma de cuadrados: √[(-4)²+3²]=√(16+9)=√25=5.\n2. En el otro paréntesis: −1/3−1=−1/3−3/3=−4/3.\n3. Sustituimos en la expresión completa: 5−(1/3):2·(−4/3)+2.\n4. División y multiplicación se realizan de izquierda a derecha: (1/3):2·(−4/3)=(1/6)·(−4/3)=−2/9.\n5. Entonces 5−(−2/9)+2=7+2/9=65/9.\nComprobación: 65/9≈7,222 y coincide al evaluar la expresión original.\nResultado final: 65/9."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

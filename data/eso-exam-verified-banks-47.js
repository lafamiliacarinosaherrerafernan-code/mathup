(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 2/Simulacro 4º ESO ACAD und 2.pdf";
  const banks = {
    "4eso-b::radicales y logaritmos": [
      q(
        "4eso-b-radicales-y-logaritmos-dcd3a340daa8",
        source,
        "1. Ejercicio: Calcula y simplifica: b) √[a·√(a·∛(a²))]·∜(a³), para a≥0.",
        ["a∛(a²)", "a∛a", "a²∛a", "a√a"],
        "Resolución:\n1. Escribimos los radicales como potencias, suponiendo a≥0: ∛(a²)=a^(2/3).\n2. El radical cuadrado interior vale √[a·a^(2/3)]=√[a^(5/3)]=a^(5/6).\n3. El radical cuadrado exterior es √[a·a^(5/6)]=√[a^(11/6)]=a^(11/12).\n4. Además, ∜(a³)=a^(3/4)=a^(9/12).\n5. Multiplicamos: a^(11/12)·a^(9/12)=a^(20/12)=a^(5/3)=a·a^(2/3)=a∛(a²).\nComprobación: al elevar a la potencia 12, tanto la expresión simplificada como la original producen a²⁰.\nResultado final: a∛(a²)."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

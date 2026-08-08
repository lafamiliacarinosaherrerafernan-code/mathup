(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 1/SIMULACRO UNID 1.pdf";
  const banks = {
    "1eso::numeros naturales": [
      q(
        "1eso-numeros-naturales-9605488b2313",
        source,
        "Ejercicio 7. (2,5 puntos) Realiza las siguientes operaciones combinadas con potencias y raíces: a) √196:(9−2)−1².",
        ["1", "3", "−1", "13"],
        "Resolución:\n1. Resolvemos la raíz, el paréntesis y la potencia: √196=14, 9−2=7 y 1²=1.\n2. Sustituimos en la expresión completa: √196:(9−2)−1²=14:7−1.\n3. Realizamos primero la división: 14:7−1=2−1=1.\nComprobación: 7·2=14 y 1²=1, por lo que la jerarquía de operaciones se ha respetado.\nResultado final: 1."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

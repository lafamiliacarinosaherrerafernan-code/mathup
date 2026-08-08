(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 3 Nº Enteros/Examen UNID 3 Nº Enteros.pdf";
  const banks = {
    "1eso::potencias y raices cuadradas": [
      q(
        "1eso-numeros-enteros-21188cff6190",
        source,
        "1. Ejercicio (1 punto): Calcula el valor de las siguientes potencias: a) −2^(3²).",
        ["−512", "512", "−64", "−729"],
        "Resolución:\n1. En una potencia de potencia escrita en torre se comienza por el exponente superior: 3²=9.\n2. La expresión es −2^(3²)=−2⁹.\n3. La potencia se calcula antes que el signo que queda fuera: −2⁹=−512.\nComprobación: 2⁹=512 y no hay paréntesis que incluyan el signo negativo en la base.\nResultado final: −512."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

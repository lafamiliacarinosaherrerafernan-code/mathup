(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 3 y 4/Examen unida 3 4.pdf";
  const banks = {
    "2eso::fracciones": [
      q(
        "2eso-fracciones-165758d41d69",
        source,
        "4. Ejercicio (1,5 puntos): Calcula: a) √(4²+3²)−3·(2²−3²).",
        ["20", "−10", "−20", "8"],
        "Resolución:\n1. Resolvemos potencias y raíz manteniendo la expresión completa:\n√(4²+3²)−3·(2²−3²)=√(16+9)−3·(4−9).\n2. Simplificamos las agrupaciones:\n=√25−3·(−5).\n3. Calculamos la raíz y el producto:\n=5−(−15)=5+15=20.\nComprobación: 3²+4²=5² y restar un producto negativo equivale a sumar 15.\nResultado final: 20."
      ),
      q(
        "2eso-fracciones-6be8bc00f61d",
        source,
        "4. Ejercicio (1,5 puntos): Calcula: c) [(3²−4)²·√(13−2²)]/[5+3·(−5)].",
        ["−15/2", "15/2", "−15", "−3/2"],
        "Resolución:\n1. Resolvemos las potencias dentro de la fracción completa:\n[(3²−4)²·√(13−2²)]/[5+3·(−5)]=[(9−4)²·√(13−4)]/[5−15].\n2. Simplificamos numerador y denominador:\n=[5²·√9]/(−10)=[25·3]/(−10).\n3. Dividimos y reducimos:\n75/(−10)=−15/2.\nComprobación: −15/2=−7,5 y 75:(−10)=−7,5.\nResultado final: −15/2."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

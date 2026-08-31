(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const sphereSource = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 11 Cuerpos geométricos/Examen und  11 Cuerpos geométricos.pdf";
  const intervalSource = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 1-2/examen und 1-2.pdf";
  const banks = {
    "2eso::cuerpos geometricos": [
      q(
        "2eso-cuerpos-geometricos-5353232fdc4a",
        sphereSource,
        "3. Ejercicio (3 puntos): Se quiere construir 300 balones de cuero con un diámetro de 35 cm. Si el metro cuadrado de cuero cuesta 5,2 €, ¿cuánto dinero costarán todos los balones?",
        ["191,1π € (aproximadamente 600,36 €)", "63,7π € (aproximadamente 200,12 €)", "382,2π € (aproximadamente 1200,72 €)", "36,75π € (aproximadamente 115,45 €)"],
        "Resolución:\n1. Cada balón es una esfera de radio 35/2=17,5 cm=0,175 m.\n2. Su superficie es A=4πr²=4π·(0,175)²=0,1225π m².\n3. Para 300 balones se necesitan 300·0,1225π=36,75π m² de cuero.\n4. Multiplicamos por 5,2 €/m²: 36,75π·5,2=191,1π €, aproximadamente 600,36 €.\nComprobación: el cálculo utiliza metros antes de aplicar el precio por metro cuadrado y 300·0,3848≈115,45 m².\nResultado final: 191,1π €, aproximadamente 600,36 €."
      )
    ],
    "4eso-a::numeros reales": [
      q(
        "4eso-a-numeros-reales-09b455827ebc",
        intervalSource,
        "2. Ejercicio: Representa gráficamente este conjunto: a) I₁={x∈N / x≤5}.",
        [
          "Puntos aislados en cada número natural menor o igual que 5; se incluye 0 solo si la convención adoptada para N lo contiene",
          "Todos los puntos de la semirrecta continua (−∞,5]",
          "Todos los puntos del intervalo continuo [0,5]",
          "Puntos aislados en todos los números enteros menores o iguales que 5"
        ],
        "Resolución:\n1. La condición x∈N obliga a que x sea natural; por ello no se representa una franja continua de la recta.\n2. La desigualdad x≤5 conserva únicamente los naturales que no superan 5.\n3. Se marcan, por tanto, puntos aislados en 1, 2, 3, 4 y 5. Si en el curso se usa N={0,1,2,…}, también se marca 0; si se usa N={1,2,3,…}, no se marca.\nComprobación: cualquier punto no entero, cualquier entero negativo y cualquier natural mayor que 5 incumplen al menos una de las dos condiciones.\nResultado final: los puntos naturales menores o iguales que 5, respetando la convención adoptada para la inclusión de 0 en N."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

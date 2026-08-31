(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 6 Ecuaciones/examen und 6-1 ESO A-B.pdf";
  const banks = {
    "1eso::expresiones algebraicas": [
      q(
        "1eso-expresiones-algebraicas-fcd1e902991e",
        source,
        "1. Ejercicio (1 punto): Completa la tabla indicando coeficiente, parte literal y grado de los monomios −3xy², ax/2, −5⁴bx y 8x.",
        [
          "−3xy²: (−3, xy², 3); ax/2: (1/2, ax, 2); −5⁴bx: (−625, bx, 2); 8x: (8, x, 1)",
          "−3xy²: (−3, xy², 2); ax/2: (1/2, ax, 1); −5⁴bx: (−5, bx, 6); 8x: (8, x, 0)",
          "−3xy²: (3, xy², 3); ax/2: (2, ax, 2); −5⁴bx: (625, bx, 2); 8x: (−8, x, 1)",
          "−3xy²: (−3, xy², 3); ax/2: (a/2, x, 1); −5⁴bx: (−625b, x, 1); 8x: (8x, sin parte literal, 0)"
        ],
        "Resolución:\n1. El coeficiente es el factor numérico; la parte literal contiene las letras con sus exponentes; el grado es la suma de esos exponentes.\n2. −3xy²: coeficiente −3, parte literal xy² y grado 1+2=3.\n3. ax/2=(1/2)ax: coeficiente 1/2, parte literal ax y grado 1+1=2.\n4. −5⁴bx=−625bx: coeficiente −625, parte literal bx y grado 1+1=2.\n5. 8x: coeficiente 8, parte literal x y grado 1.\nComprobación: al multiplicar cada coeficiente por su parte literal se recupera el monomio original.\nResultado final: (−3,xy²,3), (1/2,ax,2), (−625,bx,2) y (8,x,1)."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

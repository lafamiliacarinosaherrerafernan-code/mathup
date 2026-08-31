(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 9-10/Simulacro REv I und 9-10.docx.pdf";
  const banks = {
    "4eso-a::funciones": [
      q(
        "4eso-a-areas-y-cuerpos-geometricos-96eae9e78546",
        source,
        "2. Ejercicio: Representa las siguientes funciones indicando los elementos más característicos. b) h(x)=3ˣ. ¿Qué descripción permite representarla correctamente?",
        [
          "Dominio R, recorrido (0,+∞), pasa por (0,1), es estrictamente creciente y tiene asíntota horizontal y=0",
          "Dominio (0,+∞), recorrido R, pasa por (1,0), es decreciente y tiene asíntota vertical x=0",
          "Dominio R, recorrido [0,+∞), pasa por (0,0), es creciente y no tiene asíntotas",
          "Dominio R, recorrido R, pasa por (0,3), es una recta de pendiente 3"
        ],
        "Resolución:\n1. Al ser una función exponencial de base 3>1, h(x)=3ˣ está definida para todo número real y es estrictamente creciente.\n2. Sus valores son siempre positivos, de modo que el dominio es R y el recorrido es (0,+∞).\n3. Corte con el eje vertical: h(0)=3⁰=1, por lo que pasa por (0,1). No corta el eje horizontal porque 3ˣ nunca vale 0.\n4. Cuando x tiende a −∞, 3ˣ tiende a 0 sin alcanzarlo; por ello y=0 es una asíntota horizontal.\n5. Puntos útiles para la representación: (−1,1/3), (0,1), (1,3) y (2,9).\nComprobación: todos esos puntos cumplen y=3ˣ y sus ordenadas aumentan al aumentar x.\nResultado final: dominio R, recorrido (0,+∞), corte (0,1), función estrictamente creciente y asíntota horizontal y=0."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

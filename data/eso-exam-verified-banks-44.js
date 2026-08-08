(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 1-2/examen und 1-2.pdf";
  const banks = {
    "4eso-a::numeros reales": [
      q(
        "4eso-a-numeros-reales-392e13b21728",
        source,
        "3. Ejercicio: Convierte en fracciones y calcula: a) 0,9 + (1/10) : 0,0̅6̅, donde la barra indica que 06 es el período.",
        ["51/20", "9/20", "3/2", "33/20"],
        "Resolución:\n1. Convertimos los decimales en fracciones: 0,9=9/10.\n2. Para el decimal periódico, sea x=0,0̅6̅. Entonces 100x=6,0̅6̅ y, al restar, 99x=6; por tanto, x=6/99=2/33.\n3. Sustituimos en la operación completa: 9/10+(1/10):(2/33).\n4. Dividir por 2/33 equivale a multiplicar por 33/2: 9/10+(1/10)·(33/2)=9/10+33/20.\n5. Reducimos a común denominador: 18/20+33/20=51/20.\nComprobación: 51/20=2,55 y 0,9+0,1:0,060606…=0,9+1,65=2,55.\nResultado final: 51/20."
      ),
      q(
        "4eso-a-numeros-reales-fbbb23c0f693",
        source,
        "3. Ejercicio: b) Calcula: C(18,16) − C(8,1) − C(28,0).",
        ["144", "145", "152", "136"],
        "Resolución:\n1. Aplicamos la fórmula C(n,k)=n!/[k!(n−k)!].\n2. Por simetría, C(18,16)=C(18,2)=(18·17)/2=153.\n3. Además, C(8,1)=8 y C(28,0)=1.\n4. Sustituimos: 153−8−1=144.\nComprobación: desarrollar directamente 18!/(16!·2!) también da (18·17)/2=153.\nResultado final: 144."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

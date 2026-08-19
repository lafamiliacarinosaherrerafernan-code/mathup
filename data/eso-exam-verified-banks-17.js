(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const eq = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 4 Ecuaciones/Examen und 4 3º ESO.pdf";
  const eqSim = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 4 Ecuaciones/Simuacro und 4 - 3 ESO.pdf";
  const geo = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 7 Relaciones geométricas/Examen 3 ESO und 7 Relaciones geométricas.pdf";
  const algSim = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 3/Simulacro und 3.pdf";
  const real = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 1 y 2/Examen 3 und 1 y 2.pdf";
  const realSim = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 1 y 2/Simulacro und 1 y 2.pdf";
  const seq = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 6 Sucesiones/Examen 3 ESO und 6 sucesiones.pdf";
  const banks = {
    "3eso::ecuaciones y sistemas de ecuaciones": [
      q("3eso-ecuaciones-y-sistemas-de-ecuaciones-5822bec2b568", eq, "1. Ejercicio (1 punto): Resuelve las siguientes ecuaciones: a) (x+1)/4+x/16=10", ["x=156/5", "x=32", "x=36", "x=40"], "Resolución:\n1. (x+1)/4+x/16=10.\n2. Multiplicamos toda la ecuación por 16: 4(x+1)+x=160.\n3. 4x+4+x=160; 5x=156; x=156/5.\nComprobación: (156/5+1)/4+(156/5)/16=10.\nResultado final: x=156/5."),
      q("3eso-ecuaciones-y-sistemas-de-ecuaciones-7da13e638601", eq, "3. Ejercicio (2 puntos): Resuelve: b) (x−1)²/3+(x+1)/5=5", ["x=(7±√1389)/10", "x=(−7±√1389)/10", "x=1 o x=5", "x=(7±√1369)/10"], "Resolución:\n1. (x−1)²/3+(x+1)/5=5.\n2. Multiplicamos por 15: 5(x−1)²+3(x+1)=75.\n3. 5x²−10x+5+3x+3−75=0; 5x²−7x−67=0.\n4. x=[7±√(49+1340)]/10=(7±√1389)/10.\nComprobación: las raíces sustituidas satisfacen la ecuación cuadrática equivalente.\nResultado final: x=(7±√1389)/10."),
      q("3eso-ecuaciones-y-sistemas-de-ecuaciones-4d89015746a2", eq, "1. Ejercicio (1 punto): Resuelve las siguientes ecuaciones: b) 9(x−1)/4−5(5−x)/7=9", ["x=5", "x=−5", "x=83/5", "x=415"], "Resolución:\n1. 9(x−1)/4−5(5−x)/7=9.\n2. Multiplicamos por 28: 63(x−1)−20(5−x)=252.\n3. 63x−63−100+20x=252; 83x=415; x=5.\nComprobación: 9·4/4−5·0/7=9.\nResultado final: x=5."),
      q("3eso-ecuaciones-y-sistemas-de-ecuaciones-045b26414589", eqSim, "1. Ejercicio (1 punto): Resuelve las siguientes ecuaciones: a) (x−2)/3=x/2−(3x+4)/4", ["x=−4/7", "x=4/7", "x=−7/4", "x=4"], "Resolución:\n1. (x−2)/3=x/2−(3x+4)/4.\n2. Multiplicamos por 12: 4(x−2)=6x−3(3x+4).\n3. 4x−8=6x−9x−12=−3x−12.\n4. 7x=−4; x=−4/7.\nComprobación: ambos miembros valen −6/7.\nResultado final: x=−4/7."),
      q("3eso-ecuaciones-y-sistemas-de-ecuaciones-a6c22d5f5f42", eqSim, "1. Ejercicio (1 punto): Resuelve las siguientes ecuaciones: b) x−(2−x)=(x−1)/3+7", ["x=26/5", "x=5", "x=−26/5", "x=13/5"], "Resolución:\n1. x−(2−x)=(x−1)/3+7.\n2. Eliminamos el paréntesis: 2x−2=(x−1)/3+7.\n3. Multiplicamos por 3: 6x−6=x−1+21=x+20.\n4. 5x=26; x=26/5.\nComprobación: ambos miembros valen 42/5.\nResultado final: x=26/5."),
      q("3eso-cuerpos-geometricos-8fd20c0de7d4", geo, "1. Ejercicio (6 puntos): Resuelve las siguientes ecuaciones: a) 9(x−1)/4−5(5−x)/8=5", ["x=83/23", "x=23/83", "x=5", "x=−83/23"], "Resolución:\n1. 9(x−1)/4−5(5−x)/8=5.\n2. Multiplicamos por 8: 18(x−1)−5(5−x)=40.\n3. 18x−18−25+5x=40; 23x=83.\n4. x=83/23.\nComprobación: al sustituir x=83/23, el miembro izquierdo vale 5.\nResultado final: x=83/23.")
    ],
    "3eso::expresiones algebraicas": [
      q("3eso-expresiones-algebraicas-328b8dfad38b", algSim, "4. Ejercicio (1,5 puntos): Resuelve: a) (x−3b²)·(x−3b²)−2(2x+3b²)(2x+3b²)", ["−7x²−30xb²−9b⁴", "−x²−18xb²+27b⁴", "7x²+30xb²+9b⁴", "−7x²+18xb²−9b⁴"], "Resolución:\n1. (x−3b²)²=x²−6xb²+9b⁴.\n2. 2(2x+3b²)²=2(4x²+12xb²+9b⁴)=8x²+24xb²+18b⁴.\n3. Restamos: x²−6xb²+9b⁴−8x²−24xb²−18b⁴=−7x²−30xb²−9b⁴.\nComprobación: para x=0, b=1, la expresión original y la reducida valen −9.\nResultado final: −7x²−30xb²−9b⁴.")
    ],
    "3eso::numeros reales": [
      q("3eso-numeros-reales-643206b1cd1a", real, "3. Ejercicio (0,5 puntos): Representa en la recta: b) −22/3", ["Entre −8 y −7, aproximadamente en −7,333", "Entre −7 y −6, aproximadamente en −6,333", "Exactamente en −22", "Entre 7 y 8, aproximadamente en 7,333"], "Resolución:\n1. −22/3=−7−1/3=−7,333….\n2. Por tanto, está entre −8 y −7.\n3. En la recta se marca un tercio de unidad a la izquierda de −7.\nComprobación: −8=−24/3<−22/3<−21/3=−7.\nResultado final: −22/3≈−7,333."),
      q("3eso-numeros-reales-773d87a4c9c1", real, "3. Ejercicio (0,5 puntos): Representa en la recta: a) 3/9", ["En 1/3, entre 0 y 1", "En 3, a la derecha del 0", "En 9/3=3", "En −1/3, entre −1 y 0"], "Resolución:\n1. Simplificamos 3/9 dividiendo entre 3: 3/9=1/3.\n2. 1/3=0,333…, así que está entre 0 y 1.\n3. Se marca a un tercio de unidad a la derecha del origen.\nComprobación: 0<1/3<1.\nResultado final: punto en x=1/3."),
      q("3eso-numeros-reales-1a590aca1a50", realSim, "3. Ejercicio (0,5 puntos): Representa en la recta: a) −5/7", ["Entre −1 y 0, aproximadamente en −0,714", "Entre −6 y −5, aproximadamente en −5,7", "Entre 0 y 1, aproximadamente en 0,714", "Exactamente en −5"], "Resolución:\n1. −5/7≈−0,714285….\n2. Como −1<−5/7<0, se sitúa entre −1 y 0.\n3. Está más cerca de −1 que de 0.\nComprobación: −7/7<−5/7<0/7.\nResultado final: −5/7≈−0,714."),
      q("3eso-numeros-reales-75ee5e1ff123", realSim, "3. Ejercicio (0,5 puntos): Representa en la recta: b) 17/7", ["Entre 2 y 3, aproximadamente en 2,429", "Entre 1 y 2, aproximadamente en 1,429", "Exactamente en 17", "Entre −3 y −2, aproximadamente en −2,429"], "Resolución:\n1. 17/7=2+3/7≈2,428571….\n2. Por tanto, está entre 2 y 3.\n3. Se marca algo a la izquierda de 2,5.\nComprobación: 14/7<17/7<21/7.\nResultado final: 17/7≈2,429."),
      q("3eso-numeros-reales-90e6f637c149", real, "5. Ejercicio (1 punto): Calcula el error relativo y absoluto que se comete al utilizar una aproximación a la decena por redondeo del número 3/7.", ["Error absoluto 3/7; error relativo 1=100 %", "Error absoluto 4/7; error relativo 4/3", "Error absoluto 0,03; error relativo 7 %", "Error absoluto 0; error relativo 0 %"], "Resolución:\n1. 3/7≈0,4286. Redondeado a la decena más próxima resulta 0.\n2. Error absoluto: |3/7−0|=3/7.\n3. Error relativo: (3/7)/(3/7)=1=100 %.\nComprobación: al aproximar por 0 se pierde todo el valor respecto del número original.\nResultado final: error absoluto 3/7; error relativo 100 %.")
    ],
    "3eso::sucesiones": [
      q("3eso-sucesiones-dfb10dd95a68", seq, "1. Ejercicio (2 puntos): Indica el tipo de sucesión y el término general: b) 1, 1, 2, 3, 5, 8, …", ["Sucesión de Fibonacci: a₁=a₂=1 y aₙ=aₙ₋₁+aₙ₋₂ para n≥3", "Aritmética de diferencia 1: aₙ=n", "Geométrica de razón 2: aₙ=2ⁿ⁻¹", "Alternada: aₙ=(−1)ⁿ"], "Resolución:\n1. Desde el tercer término, cada término es la suma de los dos anteriores.\n2. Es la sucesión de Fibonacci.\n3. Su definición recurrente es a₁=a₂=1 y aₙ=aₙ₋₁+aₙ₋₂ para n≥3.\nComprobación: 3+5=8 y el siguiente término sería 5+8=13.\nResultado final: Fibonacci; a₁=a₂=1, aₙ=aₙ₋₁+aₙ₋₂."),
      q("3eso-cuerpos-geometricos-b696243e6b33", geo, "6. Ejercicio (3 puntos): Indica el tipo de sucesión y el término general, y suma los infinitos términos: b) 4, 2, 1, 1/2, …", ["Geométrica, aₙ=4·(1/2)ⁿ⁻¹; S∞=8", "Aritmética, aₙ=5−n; S∞=0", "Geométrica, aₙ=2ⁿ; S∞ no converge", "Geométrica, aₙ=4·2ⁿ⁻¹; S∞=8"], "Resolución:\n1. Es geométrica porque cada término se obtiene multiplicando por r=1/2.\n2. aₙ=4·(1/2)ⁿ⁻¹.\n3. Como |r|<1, S∞=4/(1−1/2)=8.\nComprobación: las sumas parciales 4, 6, 7, 7,5,… se acercan a 8.\nResultado final: aₙ=4·(1/2)ⁿ⁻¹; S∞=8.")
    ]
  };
  Object.entries(banks).forEach(([key, items]) => {
    if (!key.startsWith("3eso::")) return;
    const slug = key.split("::")[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    items.forEach((item, index) => {
      item.originalRawBaseId = item.rawBaseId;
      const stableSuffix = item.originalRawBaseId.match(/([a-f0-9]{12}(?:-[a-z0-9]+)?)$/)?.[1] || String(index + 1).padStart(3, "0");
      item.rawBaseId = `3eso-${slug}-${stableSuffix}`;
    });
  });
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

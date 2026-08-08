(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 3 y 4/Examen unida 3 4.pdf";
  const banks = {
    "2eso::potencias y raices cuadradas": [
      q("2eso-examen-unidad-3-4-ejercicio-1-c", source, "1. Ejercicio (1 punto): Resuelve: c) 6⁴/6⁻⁶.", ["6¹⁰", "6⁻²", "6⁻¹⁰", "1"], "Resolución:\n1. Al dividir potencias de la misma base se restan exponentes.\n2. 6⁴/6⁻⁶=6⁴⁻⁽⁻⁶⁾=6¹⁰.\nComprobación: dividir por 6⁻⁶ equivale a multiplicar por 6⁶.\nResultado final: 6¹⁰."),
      q("2eso-examen-unidad-3-4-ejercicio-1-d", source, "1. Ejercicio (1 punto): Resuelve: d) 4⁻³:4⁵.", ["1/4⁸", "4²", "4⁸", "1/4²"], "Resolución:\n1. 4⁻³:4⁵=4⁻³⁻⁵=4⁻⁸.\n2. Con exponente positivo, 4⁻⁸=1/4⁸.\nComprobación: (1/4³):4⁵=1/4⁸.\nResultado final: 1/4⁸."),
      q("2eso-examen-unidad-3-4-ejercicio-1-g", source, "1. Ejercicio (1 punto): Resuelve: g) 2/2⁻³.", ["2⁴=16", "2⁻²=1/4", "2²=4", "2⁻⁴=1/16"], "Resolución:\n1. Escribimos 2 como 2¹.\n2. 2¹/2⁻³=2¹⁻⁽⁻³⁾=2⁴.\n3. 2⁴=16.\nComprobación: 2:(1/8)=16.\nResultado final: 16."),
      q("2eso-examen-unidad-3-4-ejercicio-1-h", source, "1. Ejercicio (1 punto): Resuelve: h) 5⁻⁵:5⁻⁷.", ["5²=25", "5⁻¹²", "5⁻²=1/25", "5¹²"], "Resolución:\n1. Restamos exponentes: 5⁻⁵:5⁻⁷=5⁻⁵⁻⁽⁻⁷⁾.\n2. −5+7=2.\n3. 5²=25.\nComprobación: (1/5⁵):(1/5⁷)=5².\nResultado final: 25."),
      q("2eso-fracciones-523206c086ec", source, "2. Ejercicio (1 punto): Expresa como una sola potencia de exponente positivo: a) [2⁻²·(2³)⁻²:2]/[2³:2⁻²].", ["(1/2)¹⁴", "2¹⁴", "(1/2)⁴", "2⁴"], "Resolución:\n1. En el numerador: 2⁻²·(2³)⁻²:2=2⁻²·2⁻⁶:2¹=2⁻⁹.\n2. En el denominador: 2³:2⁻²=2⁵.\n3. El cociente es 2⁻⁹:2⁵=2⁻¹⁴=(1/2)¹⁴.\nComprobación: todos los factores se han reducido a base 2.\nResultado final: (1/2)¹⁴."),
      q("2eso-fracciones-84ae397898a6", source, "2. Ejercicio (1 punto): Expresa como una sola potencia de exponente positivo: b) (3⁴:3⁻²:3)/3⁻⁵.", ["3¹⁰", "3⁰=1", "3⁶", "3⁻¹⁰"], "Resolución:\n1. En el numerador: 3⁴:3⁻²:3=3⁴⁻⁽⁻²⁾⁻¹=3⁵.\n2. Dividimos entre 3⁻⁵: 3⁵:3⁻⁵=3¹⁰.\nComprobación: 5−(−5)=10.\nResultado final: 3¹⁰."),
      q("2eso-fracciones-13a1905afc35", source, "2. Ejercicio (1 punto): Expresa como una sola potencia de exponente positivo: c) [25⁻³:125⁻²·625]/(5⁻⁶)³.", ["5²²", "5⁴", "5¹⁴", "5⁻²²"], "Resolución:\n1. 25⁻³=5⁻⁶, 125⁻²=5⁻⁶ y 625=5⁴.\n2. El numerador es 5⁻⁶:5⁻⁶·5⁴=5⁴.\n3. El denominador es (5⁻⁶)³=5⁻¹⁸.\n4. 5⁴:5⁻¹⁸=5²².\nComprobación: 4−(−18)=22.\nResultado final: 5²²."),
      q("2eso-fracciones-6bb2c2789fbe", source, "2. Ejercicio (1 punto): Expresa como una sola potencia de exponente positivo: d) (10⁴·100:10000)/10⁻⁴.", ["10⁶", "10²", "10⁻⁶", "10¹⁰"], "Resolución:\n1. 100=10² y 10000=10⁴.\n2. El numerador es 10⁴·10²:10⁴=10².\n3. 10²:10⁻⁴=10²⁻⁽⁻⁴⁾=10⁶.\nComprobación: 100:0,0001=1 000 000.\nResultado final: 10⁶.")
    ],
    "2eso::fracciones": [
      q("2eso-fracciones-82eba4723457", source, "1. Ejercicio (4 puntos): Realiza y simplifica: a) (4/5:3·2):(5/7−5/2).", ["−112/375", "112/375", "−375/112", "8/15"], "Resolución:\n1. Dentro del primer paréntesis operamos de izquierda a derecha: 4/5:3·2=4/15·2=8/15.\n2. En el segundo: 5/7−5/2=10/14−35/14=−25/14.\n3. Dividimos: (8/15):(−25/14)=8/15·(−14/25)=−112/375.\nComprobación: 112 y 375 no tienen factores comunes.\nResultado final: −112/375.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

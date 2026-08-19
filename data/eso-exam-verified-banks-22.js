(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const eso3Real = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 1 y 2/Examen 3 und 1 y 2.pdf";
  const eso4aRealSim = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 1-2/SIMULACRO examen und 1-2.docx";
  const banks = {
    "3eso::numeros reales": [
      q("3eso-numeros-reales-4f844fa21a61", eso3Real, "1. Ejercicio (0,5 puntos): Clasifica los siguientes números: −3; −2,5; √4; −√16; √2; 2,1̅8̅; −11/7.", ["Z, Q, N, Z, I, Q, Q, respectivamente", "Z, Q, Z, Z, Q, I, Q, respectivamente", "Q, I, N, N, I, Q, Z, respectivamente", "Z, Q, N, Z, I, I, Q, respectivamente"], "Resolución:\n1. −3 pertenece a los enteros. −2,5=−5/2 es racional.\n2. √4=2 es natural y −√16=−4 es entero.\n3. √2 es irracional. Todo decimal periódico, como 2,1̅8̅, es racional. −11/7 también es racional.\nComprobación: los conjuntos mínimos son Z, Q, N, Z, I, Q y Q.\nResultado final: Z, Q, N, Z, I, Q, Q, respectivamente."),
      q("3eso-numeros-reales-29d01667614b", eso3Real, "3. Ejercicio (0,5 puntos): Representa en la recta: c) √13.", ["Entre 3 y 4, aproximadamente en 3,606", "Entre 2 y 3, aproximadamente en 2,606", "Entre 4 y 5, aproximadamente en 4,123", "Exactamente en 3,5"], "Resolución:\n1. 3²=9 y 4²=16. Como 9<13<16, se cumple 3<√13<4.\n2. √13≈3,60555.\n3. En la recta se marca entre 3 y 4, algo a la derecha de 3,6.\nComprobación: 3,606²≈13,003.\nResultado final: √13≈3,606."),
      q("3eso-examen-und-1-2-ejercicio-4-a", eso3Real, "4. Ejercicio (1 punto): Resuelve y simplifica, expresando previamente los números decimales como fracciones: 0,06̅ − 0,6 + 3,5̅.", ["136/45", "127/45", "109/45", "151/45"], "Resolución:\n1. 0,06̅=1/15, 0,6=3/5 y 3,5̅=32/9.\n2. Con denominador 45: 3/45−27/45+160/45.\n3. El numerador es 136.\nComprobación: 136/45=3,0222…, igual que 0,0666…−0,6+3,5555….\nResultado final: 136/45."),
      q("3eso-examen-und-1-2-ejercicio-7-a", eso3Real, "7. Ejercicio (1 punto): Realiza esta operación y expresa el resultado en notación científica: a) (50·10⁻⁴)·(2,6·10⁻³).", ["1,3·10⁻⁵", "1,3·10⁻⁶", "13·10⁻⁵", "1,3·10⁵"], "Resolución:\n1. 50·2,6=130.\n2. 10⁻⁴·10⁻³=10⁻⁷.\n3. 130·10⁻⁷=1,3·10⁻⁵.\nComprobación: 0,005·0,0026=0,000013.\nResultado final: 1,3·10⁻⁵."),
      q("3eso-examen-und-1-2-ejercicio-7-b", eso3Real, "7. Ejercicio (1 punto): Realiza esta operación y expresa el resultado en notación científica: b) 2,04·10²+0,18·10⁵.", ["1,8204·10⁴", "2,22·10⁷", "1,8204·10³", "2,04·10⁷"], "Resolución:\n1. 2,04·10²=0,0204·10⁴ y 0,18·10⁵=1,8·10⁴.\n2. (0,0204+1,8)·10⁴=1,8204·10⁴.\nComprobación: 204+18 000=18 204.\nResultado final: 1,8204·10⁴.")
    ],
    "4eso-a::numeros reales": [
      q("4eso-a-numeros-reales-c9a5dc5c5f70", eso4aRealSim, "Ejercicio: Clasifica estos números según el menor conjunto al que pertenecen: −√2; 0,1̅6̅3̅; √25; −12/4; √2; 4/7; −4.", ["I, Q, N, Z, I, Q, Z, respectivamente", "I, I, N, Q, I, Z, N, respectivamente", "Q, Q, Z, Z, Q, Q, Z, respectivamente", "I, Q, N, Q, I, I, Z, respectivamente"], "Resolución:\n1. −√2 y √2 son irracionales.\n2. 0,1̅6̅3̅ es periódico y racional; √25=5 es natural.\n3. −12/4=−3 y −4 son enteros; 4/7 es racional no entero.\nComprobación: se asigna a cada número el conjunto más pequeño.\nResultado final: I, Q, N, Z, I, Q, Z, respectivamente.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

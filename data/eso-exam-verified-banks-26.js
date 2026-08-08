(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 1 y 2/examen und 1-2.pdf";
  const banks = {
    "2eso::fracciones": [
      q("2eso-numeros-enteros-2b04094b3478", source, "3. Ejercicio (1 punto): Pasa previamente a fracción generatriz y calcula: a) 0,333…+0,07̅:0,46̅.", ["1/2", "691/1380", "7/15", "5/6"], "Resolución:\n1. 0,333…=1/3; 0,07̅=7/90; 0,46̅=7/15.\n2. Primero dividimos: (7/90):(7/15)=7/90·15/7=1/6.\n3. 1/3+1/6=1/2.\nComprobación: 0,333…+0,0777…/0,4666…=0,333…+0,1666…=0,5.\nResultado final: 1/2."),
      q("2eso-examen-und-1-2-ejercicio-3-b", source, "3. Ejercicio (1 punto): Pasa previamente a fracción generatriz y calcula: b) 0,05·4/5+2,02̅−1,01̅.", ["473/450", "91/90", "1/25", "437/450"], "Resolución:\n1. 0,05=1/20, 2,02̅=91/45 y 1,01̅=91/90.\n2. 1/20·4/5=1/25.\n3. 1/25+91/45−91/90=1/25+91/90.\n4. Con denominador 450: 18/450+455/450=473/450.\nComprobación: 473/450≈1,05111….\nResultado final: 473/450."),
      q("2eso-numeros-enteros-db2b66327671-a", source, "5. Ejercicio (2,25 puntos): Juan gasta 1/9 de sus ahorros el lunes, 1/6 el martes y 1/4 el miércoles. a) ¿Qué fracción de los ahorros gasta?", ["19/36", "17/36", "11/19", "7/12"], "Resolución:\n1. Sumamos 1/9+1/6+1/4.\n2. El mínimo común múltiplo de 9, 6 y 4 es 36.\n3. 4/36+6/36+9/36=19/36.\nComprobación: 19/36≈0,5278, algo más de la mitad.\nResultado final: 19/36."),
      q("2eso-numeros-enteros-db2b66327671-b", source, "5. Ejercicio (2,25 puntos): Juan gasta 1/9 de sus ahorros el lunes, 1/6 el martes y 1/4 el miércoles. b) ¿Qué fracción queda de sus ahorros?", ["17/36", "19/36", "5/12", "1/36"], "Resolución:\n1. La fracción gastada es 1/9+1/6+1/4=19/36.\n2. Restamos al total: 1−19/36=17/36.\nComprobación: 19/36+17/36=1.\nResultado final: 17/36.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

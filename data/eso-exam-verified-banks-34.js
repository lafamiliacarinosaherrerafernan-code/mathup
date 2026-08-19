(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const realExam = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 1/examen 4º ESO UNID 1.pdf";
  const realSim = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 1/Simulacro 4º ESO ACAD UNID 1.pdf";
  const ineq = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 6 Inecuaciones y sistemas de inecuaciones/Examen und 6  inecuaciones y sistemas.pdf";
  const geo = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 9 Geometría analítica/Examen und 9  4º ESO.pdf";
  const banks = {
    "4eso-b::numeros reales": [
      q("4eso-b-numeros-reales-0f246ceeac63", realExam, "1. Ejercicio: Para 1/7, √3, 10,0102030405… y −√4, indica el menor conjunto; aproxima a centésimas por defecto y redondea a décimas.", ["Q: 0,14 y 0,1; I: 1,73 y 1,7; I: 10,01 y 10,0; Z: −2,00 y −2,0", "Q: 0,15 y 0,2; Q: 1,73 y 1,7; I: 10,02 y 10,1; N: −2 y −2", "I: 0,14 y 0,1; I: 1,74 y 1,8; Q: 10,01 y 10,0; Z: −2 y −2", "Q: 0,14 y 0,1; I: 1,73 y 1,7; Q: 10,01 y 10,0; N: −2 y −2"], "Resolución:\n1. 1/7 es racional: 0,142857…, por defecto a centésimas 0,14 y a décimas 0,1.\n2. √3 es irracional: 1,732…, por defecto 1,73 y redondeado 1,7.\n3. 10,0102030405… es no periódico e irracional: 10,01 y 10,0.\n4. −√4=−2 es entero y sus aproximaciones son exactas.\nComprobación: todas las aproximaciones tienen la precisión pedida.\nResultado final: Q; I; I; Z, con las aproximaciones indicadas."),
      q("4eso-b-numeros-reales-3805407939e8", realSim, "1. Ejercicio: Para 1/9, √5 y 0,2131415161…, indica el menor conjunto; redondea a milésimas y trunca a décimas.", ["Q: 0,111 y 0,1; I: 2,236 y 2,2; I: 0,213 y 0,2", "Q: 0,112 y 0,1; Q: 2,236 y 2,2; I: 0,214 y 0,2", "I: 0,111 y 0,1; I: 2,235 y 2,3; Q: 0,213 y 0,2", "Q: 0,111 y 0,2; I: 2,236 y 2,3; I: 0,213 y 0,3"], "Resolución:\n1. 1/9=0,111… es racional: a milésimas 0,111; truncado a décimas 0,1.\n2. √5≈2,236067 es irracional: redondeo 2,236; truncamiento 2,2.\n3. 0,2131415161… es no periódico e irracional: redondeo 0,213; truncamiento 0,2.\nComprobación: el redondeo usa la cifra siguiente y el truncamiento simplemente corta.\nResultado final: Q; I; I, con las aproximaciones indicadas.")
    ],
    "4eso-b::inecuaciones y sistemas de inecuaciones": [
      q("4eso-b-inecuaciones-y-sistemas-de-inecuaciones-d6da59f1a18c", ineq, "2. Ejercicio: Resuelve el sistema: (x−1)/2+(2x+2)/3>(3x−7)/6; (2x−1)/4+2x<(2x−9)/4.", ["(−2,−1)", "[−2,−1]", "(−∞,−2)∪(−1,∞)", "(−1,2)"], "Resolución:\n1. Primera inecuación por 6: 3x−3+4x+4>3x−7, de donde x>−2.\n2. Segunda por 4: 2x−1+8x<2x−9, de donde x<−1.\n3. Intersecamos ambas condiciones: −2<x<−1.\nComprobación: x=−1,5 cumple las dos; los extremos no.\nResultado final: (−2,−1).")
    ],
    "4eso-b::geometria analitica": [
      q("4eso-b-geometria-analitica-0d9dbcacaee9", geo, "3. Ejercicio: Estudia la posición relativa y, si son secantes, calcula el corte: r≡2x−4y−1=0; s≡(x−2)/10+y/5=0.", ["Secantes en (5/4,3/8)", "Paralelas a distancia 1/√20", "Coincidentes", "Secantes en (3/8,5/4)"], "Resolución:\n1. La segunda recta equivale a x+2y−2=0.\n2. Sus vectores normales (2,−4) y (1,2) no son proporcionales; son secantes.\n3. Resolvemos 2x−4y=1 y x+2y=2. Sumando la primera con el doble de la segunda: 4x=5.\n4. x=5/4 y y=3/8.\nComprobación: el punto satisface ambas ecuaciones.\nResultado final: secantes en (5/4,3/8).")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

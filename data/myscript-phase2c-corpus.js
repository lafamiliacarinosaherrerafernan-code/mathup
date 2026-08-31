(function initializeMyScriptPhase2CCorpus(global) {
  "use strict";

  const families = {
    "enteros-decimales": [
      ["5", "5", "number"], ["-7", "-7", "number"], ["120", "120", "number"],
      ["-125", "-125", "number"], ["3,5", "3,5", "number"], ["0,75", "0,75", "number"],
      ["-0,25", "-0,25", "number"], ["12,04", "12,04", "number"],
      ["1000", "1000", "number"], ["-3,1416", "-3,1416", "number"]
    ],
    fracciones: [
      ["1/2", "1/2", "fraction"], ["3/4", "3/4", "fraction"], ["-3/4", "-3/4", "fraction"],
      ["7/12", "7/12", "fraction"], ["12/5", "12/5", "fraction"], ["2/3", "2/3", "fraction"],
      ["5/8", "5/8", "fraction"], ["-7/10", "-7/10", "fraction"], ["11/6", "11/6", "fraction"],
      ["(x+1)/2", "(x+1)/2", "expression"], ["(2x-3)/(x+4)", "(2x-3)/(x+4)", "expression"],
      ["(3x+1)/5", "(3x+1)/5", "expression"], ["(x-2)/(x+2)", "(x-2)/(x+2)", "expression"],
      ["4/(x-1)", "4/(x-1)", "expression"], ["(a+b)/(a-b)", "(a+b)/(a-b)", "expression"]
    ],
    potencias: [
      ["2³", "2^3", "power"], ["5²", "5^2", "power"], ["x²", "x^2", "expression"],
      ["x³", "x^3", "expression"], ["(-3)²", "(-3)^2", "power"], ["-x²", "-x^2", "expression"],
      ["2^(x+1)", "2^(x+1)", "expression"], ["(x+1)²", "(x+1)^2", "expression"],
      ["3x²", "3x^2", "expression"], ["(2x-1)³", "(2x-1)^3", "expression"]
    ],
    raices: [
      ["√9", "sqrt(9)", "root"], ["√5", "sqrt(5)", "root"], ["√2", "sqrt(2)", "root"],
      ["√(x+1)", "sqrt(x+1)", "expression"], ["√(x²+1)", "sqrt(x^2+1)", "expression"],
      ["2√3", "2sqrt(3)", "expression"], ["-√5", "-sqrt(5)", "expression"],
      ["√16", "sqrt(16)", "root"], ["3√2", "3sqrt(2)", "expression"],
      ["√(2x-1)", "sqrt(2x-1)", "expression"]
    ],
    algebra: [
      ["2x+3", "2x+3", "expression"], ["3x-7", "3x-7", "expression"], ["3(x-2)", "3(x-2)", "expression"],
      ["2(x+1)+3", "2(x+1)+3", "expression"], ["x²+5x-6", "x^2+5x-6", "expression"],
      ["2x²-3x+1", "2x^2-3x+1", "expression"], ["(x+1)(x-2)", "(x+1)(x-2)", "expression"],
      ["a²-b²", "a^2-b^2", "expression"], ["4x-2y", "4x-2y", "expression"],
      ["5a+3b-2", "5a+3b-2", "expression"], ["x(x+3)", "x(x+3)", "expression"],
      ["(2x-1)(x+4)", "(2x-1)(x+4)", "expression"], ["3x²+2x-8", "3x^2+2x-8", "expression"],
      ["2a(a-b)", "2a(a-b)", "expression"], ["x³-4x", "x^3-4x", "expression"]
    ],
    ecuaciones: [
      ["x=4", "x=4", "equation"], ["2x+3=7", "2x+3=7", "equation"], ["3(x-2)=9", "3(x-2)=9", "equation"],
      ["x²-5x+6=0", "x^2-5x+6=0", "equation"], ["x²=9", "x^2=9", "equation"],
      ["2x²+3x-2=0", "2x^2+3x-2=0", "equation"], ["5x-4=11", "5x-4=11", "equation"],
      ["2(x+1)=3x-4", "2(x+1)=3x-4", "equation"], ["x/2+3=7", "x/2+3=7", "equation"],
      ["3x²-12=0", "3x^2-12=0", "equation"], ["(x-1)(x+2)=0", "(x-1)(x+2)=0", "equation"],
      ["x³-4x=0", "x^3-4x=0", "equation"], ["4-2x=10", "4-2x=10", "equation"],
      ["(2x-3)/5=1", "(2x-3)/5=1", "equation"], ["x²+x=6", "x^2+x=6", "equation"]
    ],
    "desigualdades-intervalos": [
      ["x<3", "x<3", "interval"], ["x>-2", "x>-2", "interval"], ["x≤5", "x<=5", "interval"],
      ["x≥-1", "x>=-1", "interval"], ["-2<x<4", "-2<x<4", "interval"],
      ["x∈(-∞,3)", "x in (-infinity,3)", "interval"], ["x∈[-1,5]", "x in [-1,5]", "interval"],
      ["x∈(0,4]", "x in (0,4]", "interval"], ["2x-1≥7", "2x-1>=7", "interval"],
      ["3-x<5", "3-x<5", "interval"]
    ],
    coordenadas: [
      ["(2,3)", "(2,3)", "coordinates"], ["(-1,4)", "(-1,4)", "coordinates"],
      ["(0,-3)", "(0,-3)", "coordinates"], ["(5/2,1)", "(5/2,1)", "coordinates"],
      ["(-2,-5)", "(-2,-5)", "coordinates"]
    ],
    combinadas: [
      ["(x²+1)/2", "(x^2+1)/2", "expression"], ["√(x+2)/3", "sqrt(x+2)/3", "expression"],
      ["2³+√9", "2^3+sqrt(9)", "expression"], ["(x+1)²/(x-1)", "(x+1)^2/(x-1)", "expression"],
      ["-√5/2", "-sqrt(5)/2", "expression"], ["(2x-3)²", "(2x-3)^2", "expression"],
      ["√(x²+4)", "sqrt(x^2+4)", "expression"], ["(3x+1)/(2x-5)", "(3x+1)/(2x-5)", "expression"],
      ["2√3+x²", "2sqrt(3)+x^2", "expression"], ["(x²-1)/(x+1)", "(x^2-1)/(x+1)", "expression"]
    ]
  };

  const samples = [];
  Object.entries(families).forEach(([family, entries]) => {
    entries.forEach(([display, expectedExpression, validationType], index) => {
      samples.push(Object.freeze({
        sampleId: `phase2c-${family}-${String(index + 1).padStart(2, "0")}`,
        family,
        display,
        expectedExpression,
        validationType
      }));
    });
  });

  global.MARGARITA_MYSCRIPT_PHASE2C_CORPUS = Object.freeze(samples);
})(typeof window !== "undefined" ? window : globalThis);

(function () {
  "use strict";

  const algebraSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 6 Ecuaciones/examen und 6-1 ESO A-B.pdf";
  const recoverySource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 6 Ecuaciones/Recuperación examen und 6-1 ESO A-B.pdf";
  const simulationSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 6 Ecuaciones/Simulacro 6-1 ESO A-B.pdf";
  const q = (rawBaseId, source, text, options, solution) => ({
    rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution
  });

  const banks = {
    "1eso::expresiones algebraicas": [
      q("1eso-expresiones-algebraicas-f5517f0075be", algebraSource,
        "3. Ejercicio (1,5 puntos): Calcula e indica el grado del resultado: a) x³+5x³+x.",
        ["6x³+x; grado 3", "6x⁶+x; grado 6", "7x³; grado 3", "5x³+x; grado 3"],
        "Resolución:\n1. Sumamos los términos semejantes de grado tres: x³+5x³=6x³.\n2. El término x no es semejante y se conserva: 6x³+x.\n3. El mayor exponente es 3, así que el polinomio es de grado 3.\nComprobación: para x=1, la expresión original vale 1+5+1=7 y la reducida 6+1=7.\nResultado final: 6x³+x, grado 3."),
      q("1eso-expresiones-algebraicas-df3078697852", algebraSource,
        "3. Ejercicio (1,5 puntos): Calcula e indica el grado del monomio del resultado: c) 2x−4x−3x.",
        ["−5x; grado 1", "−9x; grado 1", "5x; grado 1", "−5x³; grado 3"],
        "Resolución:\n1. Todos los términos son semejantes.\n2. Operamos sus coeficientes: 2−4−3=−5.\n3. Resultado: −5x, cuyo grado es 1.\nComprobación: para x=2, 4−8−6=−10 y −5·2=−10.\nResultado final: −5x, grado 1."),
      q("1eso-expresiones-algebraicas-4713026071b3", algebraSource,
        "3. Ejercicio (1,5 puntos): Calcula e indica el grado del monomio del resultado: b) 15x²−18x².",
        ["−3x²; grado 2", "3x²; grado 2", "−3x⁴; grado 4", "−33x²; grado 2"],
        "Resolución:\n1. Son monomios semejantes.\n2. Restamos los coeficientes: (15−18)x²=−3x².\n3. El exponente de x es 2, por lo que el grado es 2.\nComprobación: para x=2, 15·4−18·4=−12 y −3·4=−12.\nResultado final: −3x², grado 2."),
      q("1eso-expresiones-algebraicas-c6acde16a386", algebraSource,
        "3. Ejercicio (1,5 puntos): Calcula e indica el grado del monomio del resultado: d) 2x³b·(−5x³)·(3x).",
        ["−30x⁷b; grado 8", "−30x⁷b; grado 7", "30x⁷b; grado 8", "−10x⁶b; grado 7"],
        "Resolución:\n1. Multiplicamos coeficientes: 2·(−5)·3=−30.\n2. Sumamos exponentes de x: x³·x³·x=x⁷.\n3. Conservamos b: −30x⁷b. Su grado total es 7+1=8.\nComprobación: para x=1 y b=1, el producto original es 2·(−5)·3=−30.\nResultado final: −30x⁷b, grado 8."),
      q("1eso-expresiones-algebraicas-5a64f7860ad1", algebraSource,
        "3. Ejercicio (1,5 puntos): Calcula e indica el grado del monomio del resultado: e) −3b·(−2b²)·(−b).",
        ["−6b⁴; grado 4", "6b⁴; grado 4", "−6b³; grado 3", "−5b⁴; grado 4"],
        "Resolución:\n1. Multiplicamos coeficientes: (−3)(−2)(−1)=−6.\n2. Sumamos exponentes: b·b²·b=b⁴.\n3. El resultado es −6b⁴ y su grado es 4.\nComprobación: para b=1, ambos productos valen −6.\nResultado final: −6b⁴, grado 4."),
      q("1eso-expresiones-algebraicas-33d94d681c03", recoverySource,
        "2. Ejercicio (1 punto): Calcula e indica el grado del resultado: a) −3x³−3x³+x.",
        ["−6x³+x; grado 3", "−6x⁶+x; grado 6", "−7x³; grado 3", "6x³+x; grado 3"],
        "Resolución:\n1. Sumamos términos semejantes: −3x³−3x³=−6x³.\n2. Conservamos el término x: −6x³+x.\n3. El mayor exponente es 3.\nComprobación: para x=1, la expresión original y la reducida valen −5.\nResultado final: −6x³+x, grado 3."),
      q("1eso-expresiones-algebraicas-3e512773693d", recoverySource,
        "2. Ejercicio (1 punto): Calcula e indica el grado del monomio del resultado: c) 2x−5x−x.",
        ["−4x; grado 1", "−2x; grado 1", "4x; grado 1", "−4x³; grado 3"],
        "Resolución:\n1. Operamos los coeficientes de los términos semejantes: 2−5−1=−4.\n2. Resultado: −4x. Su grado es 1.\nComprobación: para x=3, 6−15−3=−12 y −4·3=−12.\nResultado final: −4x, grado 1."),
      q("1eso-expresiones-algebraicas-c1e04d3c6b03", recoverySource,
        "2. Ejercicio (1 punto): Calcula e indica el grado del monomio del resultado: b) −5x²−18x².",
        ["−23x²; grado 2", "13x²; grado 2", "−23x⁴; grado 4", "−13x²; grado 2"],
        "Resolución:\n1. Sumamos los coeficientes: (−5−18)x²=−23x².\n2. El exponente es 2, por lo que el grado es 2.\nComprobación: para x=1, ambos miembros valen −23.\nResultado final: −23x², grado 2."),
      q("1eso-expresiones-algebraicas-b83cdd2606fc", recoverySource,
        "2. Ejercicio (1 punto): Calcula e indica el grado del monomio del resultado: d) −x³b·(−3x³)·(2x).",
        ["6x⁷b; grado 8", "−6x⁷b; grado 8", "6x⁶b; grado 7", "6x⁷b; grado 7"],
        "Resolución:\n1. Coeficientes: (−1)(−3)·2=6.\n2. Potencias: x³·x³·x=x⁷. Conservamos b.\n3. Resultado: 6x⁷b, de grado 7+1=8.\nComprobación: para x=b=1, ambos productos valen 6.\nResultado final: 6x⁷b, grado 8."),
      q("1eso-expresiones-algebraicas-2a7d444c2040", recoverySource,
        "2. Ejercicio (1 punto): Calcula e indica el grado del monomio del resultado: f) x·(−2x)·(−5x).",
        ["10x³; grado 3", "−10x³; grado 3", "10x²; grado 2", "7x³; grado 3"],
        "Resolución:\n1. Coeficientes: 1·(−2)·(−5)=10.\n2. Potencias: x·x·x=x³.\n3. Resultado: 10x³, de grado 3.\nComprobación: para x=2, el producto original es 2·(−4)·(−10)=80 y 10·2³=80.\nResultado final: 10x³, grado 3."),
      q("1eso-expresiones-algebraicas-8273df55efa2", algebraSource,
        "4. Ejercicio (2,5 puntos): Resuelve y comprueba: 4x−5x+10=3x+15−5.",
        ["x=0", "x=5/2", "x=−5/2", "No tiene solución"],
        "Resolución:\n1. Reducimos ambos miembros: −x+10=3x+10.\n2. Restamos 10: −x=3x.\n3. Restamos 3x: −4x=0, luego x=0.\nComprobación: para x=0, ambos miembros valen 10.\nResultado final: x=0."),
      q("1eso-expresiones-algebraicas-caa88b8481c4", simulationSource,
        "4. Ejercicio (2,5 puntos): Resuelve: 2(2x−3)−12=5−3(x−2).",
        ["x=29/7", "x=7/29", "x=−29/7", "x=4"],
        "Resolución:\n1. Quitamos paréntesis: 4x−6−12=5−3x+6.\n2. Reducimos: 4x−18=11−3x.\n3. Sumamos 3x y 18: 7x=29.\n4. Despejamos x=29/7.\nComprobación: al sustituir x=29/7, ambos miembros valen −10/7.\nResultado final: x=29/7."),
      q("1eso-expresiones-algebraicas-2e509a178199", simulationSource,
        "6. Ejercicio (2 puntos): Si a un número le sumo 5 y el resultado lo multiplico por tres me da 36, ¿cuál es ese número?",
        ["7", "12", "17", "5"],
        "Resolución:\n1. Sea x el número.\n2. Traducimos el enunciado: 3(x+5)=36.\n3. Dividimos entre 3: x+5=12.\n4. Restamos 5: x=7.\nComprobación: (7+5)·3=12·3=36.\nResultado final: 7."),
      q("1eso-expresiones-algebraicas-0c0cabe0ece0", simulationSource,
        "4. Ejercicio (2,5 puntos): Resuelve y comprueba: 4x−5x−10=−3x−15+5.",
        ["x=0", "x=5", "x=−5", "Infinitas soluciones"],
        "Resolución:\n1. Reducimos: −x−10=−3x−10.\n2. Sumamos 3x: 2x−10=−10.\n3. Sumamos 10: 2x=0, luego x=0.\nComprobación: para x=0, ambos miembros valen −10.\nResultado final: x=0."),
      q("1eso-expresiones-algebraicas-28a92091ce30", algebraSource,
        "6. Ejercicio (2 puntos): El perímetro de un cuadro es de 64 cm. Averigua lo que mide el lado del cuadrado transformando el enunciado en una ecuación.",
        ["16 cm", "8 cm", "32 cm", "256 cm"],
        "Resolución:\n1. Sea x la longitud del lado.\n2. El perímetro de un cuadrado es P=4x.\n3. Planteamos 4x=64 y dividimos entre 4: x=16 cm.\nComprobación: 4·16=64 cm.\nResultado final: 16 cm.")
    ],
    "1eso::fracciones": [
      q("1eso-fracciones-6e8509d5bfb4", "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 4 Fracciones/examen und 4-1ESO A.pdf",
        "2. Ejercicio (1 punto): Encuentra la fracción irreducible: b) 108/450.",
        ["6/25", "12/50", "25/6", "9/40"],
        "Resolución:\n1. Descomponemos: 108=2²·3³ y 450=2·3²·5².\n2. El MCD es 2·3²=18.\n3. Dividimos: frac{108}{450}=frac{6}{25}.\nComprobación: mcd(6,25)=1 y 6·450=25·108=2700.\nResultado final: 6/25.")
    ],
    "1eso::medida, angulos, rectas y circunferencias": [
      q("1eso-medida-angulos-rectas-y-circunferencias-5d6c62dbe60f", "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 8 y 9 rectas ángulso Polígonos/examen und 8,9 Rectas ángulos Polígonos.pdf",
        "1. Ejercicio (1 punto): Realiza la operación en sistema sexagesimal: a) 33° 23′ 54′′+34° 43′ 6′′.",
        ["68° 7′ 0′′", "67° 66′ 60′′", "68° 6′ 0′′", "67° 7′ 0′′"],
        "Resolución:\n1. Sumamos segundos: 54′′+6′′=60′′=1′.\n2. Sumamos minutos: 23′+43′+1′=67′=1°+7′.\n3. Sumamos grados: 33°+34°+1°=68°.\nComprobación: en segundos, ambas cantidades suman 245220′′, que equivalen a 68° 7′ 0′′.\nResultado final: 68° 7′ 0′′."),
      q("1eso-medida-angulos-rectas-y-circunferencias-8089450d9203", "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 8 y 9 rectas ángulso Polígonos/examen und 8,9 Rectas ángulos Polígonos.pdf",
        "1. Ejercicio (1 punto): Realiza la operación en sistema sexagesimal: b) 343° 23′ 4′′−12° 43′ 9′′.",
        ["330° 39′ 55′′", "331° 20′ 5′′", "330° 40′ 5′′", "329° 39′ 55′′"],
        "Resolución:\n1. Pedimos 1 minuto: 343° 22′ 64′′.\n2. Como 22′<43′, pedimos 1 grado: 342° 82′ 64′′.\n3. Restamos: segundos 64−9=55; minutos 82−43=39; grados 342−12=330.\nComprobación: 330°39′55′′+12°43′9′′=343°23′4′′.\nResultado final: 330° 39′ 55′′.")
    ],
    "1eso::numeros naturales": [
      q("1eso-numeros-naturales-92ce7656640d", "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 2 Divisibilidad/Examen Und 2.pdf",
        "4. Ejercicio (1 punto): Calcula el MCM y el MCD de 64, 108 y 147.",
        ["MCM=84672 y MCD=1", "MCM=42336 y MCD=2", "MCM=84672 y MCD=3", "MCM=9408 y MCD=1"],
        "Resolución:\n1. Factorizamos: 64=2⁶; 108=2²·3³; 147=3·7².\n2. No hay ningún factor primo común a los tres, luego MCD=1.\n3. MCM=2⁶·3³·7²=64·27·49=84672.\nComprobación: 84672/64=1323, 84672/108=784 y 84672/147=576.\nResultado final: MCM=84672 y MCD=1.")
    ],
    "1eso::proporcionalidad": [
      q("1eso-proporcionalidad-981b006ab5fb", "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 7 Proporcionalidad/examen und 7 proporcinalidad.pdf",
        "4. Ejercicio (1,5 puntos): Una bufanda tiene un descuento del 20 %. Si me he ahorrado 25 €, ¿cuánto costaba la bufanda?",
        ["125 €", "100 €", "120 €", "145 €"],
        "Resolución:\n1. Ordenamos los datos:\nPrecio original (€) | x | 100\nDescuento (€) | 25 | 20\n2. Es proporcionalidad directa: el 20 % del precio corresponde a 25 €.\n3. Planteamos frac{20}{100}=frac{25}{x}.\n4. Multiplicamos en cruz: 20x=2500 ⇒ x=125 €.\nComprobación: 125·0,20=25 €.\nResultado final: 125 €.")
    ]
  };

  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = {
    build(courseId, theme) {
      return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))];
    },
    count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0)
  };
})();

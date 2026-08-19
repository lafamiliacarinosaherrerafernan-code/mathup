(function () {
  "use strict";

  const COURSE_ID = "4eso-a";
  const SOURCES = {
    reals: "documentos/4 ESO A/Temas mios/1-Nº Reales.pdf",
    radicals: "documentos/4 ESO A/Temas mios/2-Radicales.pdf",
    proportionality: "documentos/4 ESO A/Temas mios/3-Proporcionalidad.pdf",
    algebra: "documentos/4 ESO A/Temas mios/4-Expresiones algebraicas.pdf",
    equations: "documentos/4 ESO A/Temas mios/5-Ecuaciones e inecuaciones.pdf",
    systems: "documentos/4 ESO A/Temas mios/6-Sistemas de ecuaciones.pdf",
    trigonometry: "documentos/4 ESO A/Temas mios/7-Semejanza y Trigonometría.pdf",
    geometry: "documentos/4 ESO A/Temas mios/8-Áreas y Cuerpos geométricos Ejercicios.doc",
    functions: "documentos/4 ESO A/Temas mios/9-Funciones Ejercicio.pdf"
  };

  const TOPICS = {
    reals: [0, "numeros-reales", "Números reales"],
    radicals: [1, "radicales", "Radicales"],
    proportionality: [2, "proporcionalidad", "Proporcionalidad"],
    algebra: [3, "expresiones-algebraicas", "Expresiones algebraicas"],
    equations: [4, "ecuaciones-e-inecuaciones", "Ecuaciones e inecuaciones"],
    systems: [5, "sistemas-de-ecuaciones-e-inecuaciones", "Sistemas de ecuaciones e inecuaciones"],
    trigonometry: [6, "semejanza-y-trigonometria", "Semejanza y trigonometría"],
    geometry: [7, "areas-y-cuerpos-geometricos", "Áreas y cuerpos geométricos"],
    functions: [8, "funciones", "Funciones"]
  };

  function q(topic, id, subtopic, exerciseType, structureId, sourceReference, text, options, solution, level = "apprentice", extra = {}) {
    const [topicIndex, slug] = TOPICS[topic];
    return {
      rawBaseId: `4eso-a-${slug}-${id}`,
      courseId: COURSE_ID,
      topicId: `${COURSE_ID}:${slug}`,
      topicIndex,
      subtopic,
      exerciseType,
      structureId,
      sourceDocument: SOURCES[topic],
      sourceReference,
      source: `Material original de 4.º ESO A · ${sourceReference}`,
      sourceKind: "teacher-material",
      sourceType: "original-4eso-a",
      difficulty: level === "master" ? "hard" : "easy",
      challengeLevel: level,
      practiceEligible: true,
      examEligible: false,
      requiresVisual: false,
      solutionNeedsReview: false,
      text,
      options,
      correct: 0,
      solution,
      ...extra
    };
  }

  const originalBanks = {
    "4eso-a::numeros reales": [
      q("reals", "clasificacion-01", "clasificación", "clasificar-numeros", "classify-mixed-real-numbers", "p. 1, clasificación de números", "Clasifica en el conjunto más pequeño posible: −√2; 0,1̅6̅3̅; √25; −12/4; √2; 4/7; −4.", ["I, Q, N, Z, I, Q, Z", "I, I, N, Q, I, Z, N", "Q, Q, Z, Z, Q, Q, Z", "I, Q, N, Q, I, I, Z"], "Resolución:\n1. −√2 y √2 son irracionales.\n2. El decimal periódico 0,1̅6̅3̅ y 4/7 son racionales.\n3. √25=5 es natural.\n4. −12/4=−3 y −4 son enteros.\nResultado final: I, Q, N, Z, I, Q, Z."),
      q("reals", "intervalo-01", "intervalos", "representar-intervalo", "neighborhood-to-open-interval", "p. 2, intervalos", "Escribe como intervalo el entorno E(−1,4).", ["(−5,3)", "[−5,3]", "(−1,4)", "[−1,4]"], "Resolución:\n1. E(a,r)=(a−r,a+r).\n2. E(−1,4)=(−1−4,−1+4).\nResultado final: (−5,3)."),
      q("reals", "notacion-01", "notación científica", "operar-notacion-cientifica", "scientific-notation-multiply-normalize", "p. 4, notación científica", "Calcula y expresa en notación científica: (32,5·10⁻⁴)·(5,2·10⁻¹⁴).", ["1,69·10⁻¹⁶", "1,69·10⁻¹⁸", "16,9·10⁻¹⁶", "1,69·10¹⁶"], "Resolución:\n1. Multiplicamos las mantisas: 32,5·5,2=169.\n2. Sumamos exponentes: 10⁻⁴·10⁻¹⁴=10⁻¹⁸.\n3. Normalizamos: 169·10⁻¹⁸=1,69·10⁻¹⁶.\nResultado final: 1,69·10⁻¹⁶.", "master"),
      q("reals", "errores-01", "aproximaciones y errores", "calcular-errores", "rounding-absolute-relative-error", "p. 5, error absoluto y relativo", "Redondea 1/7 a la milésima y calcula los errores absoluto y relativo.", ["Eₐ=1/7000 y Eᵣ=0,001", "Eₐ=0,001 y Eᵣ=1/7000", "Eₐ=1/1000 y Eᵣ=0,1", "Eₐ=Eᵣ=0"], "Resolución:\n1. 1/7=0,142857… y a la milésima es 0,143.\n2. Eₐ=|1/7−143/1000|=1/7000.\n3. Eᵣ=(1/7000)/(1/7)=1/1000=0,001.\nResultado final: Eₐ=1/7000 y Eᵣ=0,001.", "master")
    ],

    "4eso-a::radicales": [
      q("radicals", "agrupa-01", "suma y resta", "agrupar-radicales", "combine-similar-square-roots", "p. 2, ejercicio 1", "Agrupa las raíces y simplifica: 2√9+3√75−2√3−√27.", ["6+10√3", "6−10√3", "10√3", "12+√3"], "Resolución:\n1. 2√9=6, √75=5√3 y √27=3√3.\n2. 6+15√3−2√3−3√3=6+10√3.\nResultado final: 6+10√3."),
      q("radicals", "agrupa-02", "suma y resta", "agrupar-raices-cubicas", "combine-similar-cube-roots", "p. 2, ejercicio 2", "Agrupa y simplifica: ∛2+∛8−∛2²+∛4.", ["2+∛2", "2+2∛2", "4", "∛12"], "Resolución:\n1. ∛8=2 y ∛2²=∛4.\n2. Los términos ∛4 se anulan.\nResultado final: 2+∛2."),
      q("radicals", "anidada-01", "raíces anidadas", "calcular-raiz-anidada", "nested-square-roots-perfect-power", "p. 3, raíces anidadas", "Calcula: (√(√(√64)))^(2/3).", ["√2", "2", "4", "2√2"], "Resolución:\n1. √(√(√64))=64^(1/8)=2^(6/8)=2^(3/4).\n2. [2^(3/4)]^(2/3)=2^(1/2).\nResultado final: √2.", "master"),
      q("radicals", "variables-01", "extracción de factores", "simplificar-con-variables", "extract-perfect-powers-with-variables", "p. 3, radicales con variables", "Simplifica: ¹⁵√(a¹⁸/b³⁶), suponiendo a,b>0.", ["(a/b²)·⁵√(a³/b⁶)", "a¹⁸/b³⁶", "a/b", "⁵√(a/b²)"], "Resolución:\n1. Separamos potencias múltiplos de 15: a¹⁸=a¹⁵·a³ y b³⁶=b³⁰·b⁶.\n2. Extraemos ¹⁵√a¹⁵=a y ¹⁵√b³⁰=b².\nResultado final: (a/b²)·¹⁵√(a³/b⁶).", "master"),
      q("radicals", "equivalentes-01", "radicales equivalentes", "comprobar-equivalencia", "compare-roots-by-rational-exponents", "p. 4, ejercicio 1", "¿Son equivalentes ∛8 y √4?", ["Sí, ambas valen 2", "No, la primera vale 4", "No, la segunda vale √2", "Solo si el índice es igual"], "Resolución:\n1. ∛8=2 porque 2³=8.\n2. √4=2 porque 2²=4.\nResultado final: sí, ambas valen 2."),
      q("radicals", "producto-01", "productos", "operar-productos", "multiply-several-radicals-same-index", "p. 4, operaciones", "Calcula: 4√4·5√8·√2.", ["160", "80", "40√2", "20"], "Resolución:\n1. Multiplicamos coeficientes: 4·5=20.\n2. √4·√8·√2=√64=8.\n3. 20·8=160.\nResultado final: 160."),
      q("radicals", "cociente-01", "cocientes", "operar-cocientes", "quotient-products-square-roots", "p. 4, operaciones", "Simplifica: (√2·2√3·√4):(√6·√8).", ["√2", "2", "1/√2", "2√3"], "Resolución:\n1. Numerador: √2·2√3·2=4√6.\n2. Denominador: √6·√8=√48=4√3.\n3. 4√6/(4√3)=√2.\nResultado final: √2.", "master"),
      q("radicals", "combinada-01", "operaciones combinadas", "operar-potencias-y-raices", "mixed-negative-fractional-exponents", "p. 5, ejercicio 2", "Calcula: (1/5)⁻³·125:5^(3/6).", ["5^(11/2)", "5^(5/2)", "5⁶", "5^(−11/2)"], "Resolución:\n1. (1/5)⁻³=5³ y 125=5³.\n2. Dividimos por 5^(1/2): 5^(3+3−1/2)=5^(11/2).\nResultado final: 5^(11/2).", "master"),
      q("radicals", "racionaliza-01", "racionalización", "racionalizar-raiz-cuadrada", "rationalize-single-square-root", "p. 7, ejercicio 1", "Racionaliza y simplifica: 6/√2.", ["3√2", "6√2", "√2/3", "3"], "Resolución:\n1. Multiplicamos por √2/√2.\n2. 6√2/2=3√2.\nResultado final: 3√2."),
      q("radicals", "racionaliza-02", "racionalización", "racionalizar-indice-superior", "rationalize-higher-index-root", "p. 7, índice superior", "Racionaliza: 3/∛6.", ["∛36/2", "3∛6/6", "∛18/2", "∛36"], "Resolución:\n1. Para completar un cubo multiplicamos por ∛36.\n2. 3∛36/∛216=3∛36/6.\n3. Simplificamos entre 3.\nResultado final: ∛36/2.", "master"),
      q("radicals", "racionaliza-03", "racionalización", "racionalizar-conjugado", "rationalize-binomial-conjugate", "p. 8, conjugado", "Racionaliza: 3/(√2−√3).", ["−3√2−3√3", "3√2+3√3", "√6", "3/(√2+√3)"], "Resolución:\n1. Multiplicamos por el conjugado √2+√3.\n2. El denominador es 2−3=−1.\n3. 3(√2+√3)/(−1)=−3√2−3√3.\nResultado final: −3√2−3√3.", "master"),
      q("radicals", "ecuacion-01", "potencias y raíces", "ecuacion-elemental", "solve-elementary-root-equation", "p. 8, valor de x", "Calcula x: ⁵√x=−2.", ["x=−32", "x=32", "x=−10", "x=4"], "Resolución:\n1. Elevamos ambos miembros a 5.\n2. x=(−2)⁵=−32.\nComprobación: ⁵√(−32)=−2.\nResultado final: x=−32.")
    ],

    "4eso-a::proporcionalidad": [
      q("proportionality", "reparto-01", "repartos", "reparto-directo", "direct-proportional-sharing", "sección repartos directos", "Reparte 1.080 € de forma directamente proporcional a 2, 3 y 4.", ["240 €, 360 € y 480 €", "180 €, 360 € y 540 €", "270 €, 360 € y 450 €", "120 €, 360 € y 600 €"], "Resolución:\n1. Sumamos los índices: 2+3+4=9.\n2. Cada unidad vale 1080/9=120 €.\n3. Las partes son 240 €, 360 € y 480 €.\nComprobación: suman 1.080 €.\nResultado final: 240 €, 360 € y 480 €."),
      q("proportionality", "inversa-01", "proporcionalidad inversa", "obreros-y-tiempo", "inverse-workers-time", "sección proporcionalidad inversa", "Seis trabajadores terminan una obra en 15 días. ¿Cuánto tardarán 10 trabajadores al mismo ritmo?", ["9 días", "25 días", "6 días", "12 días"], "Resolución:\n1. Trabajadores y días son inversamente proporcionales.\n2. 6·15=10·d.\n3. d=90/10=9.\nResultado final: 9 días."),
      q("proportionality", "compuesta-01", "proporcionalidad compuesta", "directa-directa", "compound-direct-direct", "sección proporcionalidad compuesta DD", "Tres máquinas fabrican 1.200 piezas en 5 horas. ¿Cuántas fabricarán 5 máquinas en 8 horas al mismo ritmo?", ["3.200 piezas", "2.000 piezas", "1.920 piezas", "800 piezas"], "Resolución:\n1. Las piezas son directamente proporcionales a máquinas y horas.\n2. x=1200·(5/3)·(8/5).\n3. x=3.200.\nResultado final: 3.200 piezas.", "master"),
      q("proportionality", "compuesta-02", "proporcionalidad compuesta", "directa-inversa", "compound-direct-inverse", "sección proporcionalidad compuesta DI", "Cuatro grifos llenan 3 depósitos iguales en 6 horas. ¿Cuánto tardarán 6 grifos en llenar 5 depósitos al mismo ritmo?", ["20/3 h, es decir, 6 h 40 min", "10 h", "4 h", "15 h"], "Resolución:\n1. El tiempo es directamente proporcional al número de depósitos e inversamente proporcional al número de grifos.\n2. t=6·(5/3)·(4/6)=20/3 h.\nResultado final: 20/3 h, es decir, 6 h 40 min.", "master"),
      q("proportionality", "compuesta-03", "proporcionalidad compuesta", "inversa-inversa", "compound-inverse-inverse", "sección proporcionalidad compuesta II", "Doce trabajadores, a 8 horas diarias, realizan una obra en 15 días. ¿Cuántos días necesitarán 10 trabajadores trabajando 9 horas diarias?", ["16 días", "12,5 días", "18 días", "20,25 días"], "Resolución:\n1. Los días son inversamente proporcionales al número de trabajadores y a las horas diarias.\n2. d=15·(12/10)·(8/9)=16.\nResultado final: 16 días.", "master"),
      q("proportionality", "no-proporcional-01", "relaciones entre magnitudes", "identificar-no-proporcional", "distinguish-non-proportional-affine-cost", "sección directa, inversa o no proporcional", "Un taxi cobra 4 € de bajada de bandera y 1,20 € por kilómetro. ¿Es el coste directamente proporcional a los kilómetros?", ["No, porque existe una cantidad fija inicial de 4 €", "Sí, porque siempre aumenta", "Es inversamente proporcional", "Solo es proporcional para 4 km"], "Resolución:\n1. En una proporcionalidad directa, para 0 km el coste tendría que ser 0.\n2. Aquí C(k)=4+1,20k y C(0)=4.\nResultado final: no es directamente proporcional."),
      q("proportionality", "porcentaje-inverso-01", "porcentajes inversos", "recuperar-cantidad-inicial", "reverse-percentage-after-discount", "sección porcentajes inversos", "Después de un descuento del 20 %, un artículo cuesta 144 €. ¿Cuál era su precio?", ["180 €", "172,80 €", "115,20 €", "164 €"], "Resolución:\n1. Tras descontar el 20 % queda el 80 %.\n2. 0,80·P=144.\n3. P=144/0,80=180.\nResultado final: 180 €."),
      q("proportionality", "encadenados-01", "porcentajes encadenados", "descuentos-y-aumento", "successive-percent-changes", "p. 2, ejemplo porcentajes encadenados", "Una prenda de 240 € baja un 25 %, después otro 10 % y finalmente sube un 15 %. ¿Precio final?", ["186,30 €", "192 €", "180 €", "204,70 €"], "Resolución:\n1. Aplicamos los factores sucesivos: 0,75; 0,90 y 1,15.\n2. 240·0,75·0,90·1,15=186,30.\nResultado final: 186,30 €.", "master"),
      q("proportionality", "interes-simple-anos", "interés simple", "calcular-interes", "simple-interest-years-n1", "p. 2, interés simple", "Calcula el interés producido por 2.000 € al 4 % anual durante 3 años mediante la convención de 4.º ESO A.", ["240 €", "2.240 €", "80 €", "24 €"], "Resolución:\n1. Utilizamos I=C·r·t/(n·100).\n2. Como t está en años, n=1.\n3. I=2000·4·3/(1·100)=240 €.\nResultado final: 240 €."),
      q("proportionality", "interes-simple-meses", "interés simple", "calcular-interes", "simple-interest-months-n12", "p. 2, interés simple", "Calcula el interés producido por 1.500 € al 6 % anual durante 8 meses mediante la convención de 4.º ESO A.", ["60 €", "720 €", "90 €", "1.560 €"], "Resolución:\n1. I=C·r·t/(n·100).\n2. Como t está en meses, n=12.\n3. I=1500·6·8/(12·100)=60 €.\nResultado final: 60 €.", "master"),
      q("proportionality", "interes-simple-dias", "interés simple", "calcular-interes", "simple-interest-days-n360", "p. 2, interés simple", "Calcula el interés producido por 3.600 € al 5 % anual durante 72 días mediante la convención de 4.º ESO A.", ["36 €", "35,51 €", "180 €", "3.636 €"], "Resolución:\n1. I=C·r·t/(n·100).\n2. Como t está en días, en 4.º ESO A usamos n=360.\n3. I=3600·5·72/(360·100)=36 €.\nResultado final: 36 €.", "master"),
      q("proportionality", "interes-compuesto-01", "interés compuesto", "capital-final", "compound-interest-annual-capital", "p. 2, interés compuesto", "Calcula el capital final de 1.000 € al 2 % anual compuesto durante 5 años.", ["1.104,08 €", "1.100 €", "104,08 €", "1.020 €"], "Resolución:\n1. C_F=C_I(1+r/(100n))^(nt).\n2. Para años, n=1: C_F=1000(1+2/100)^5.\n3. C_F=1000·1,02⁵≈1.104,08 €.\nResultado final: 1.104,08 €.", "master")
    ],

    "4eso-a::expresiones algebraicas": [
      q("algebra", "resto-01", "teorema del resto", "determinar-parametro", "remainder-theorem-parameter", "ejercicio 6.a", "Calcula a para que el resto de (3x⁴+2x²−ax+5):(x+2) sea −3.", ["a=−32", "a=32", "a=−29", "a=−3"], "Resolución:\n1. El resto es P(−2).\n2. P(−2)=48+8+2a+5=61+2a.\n3. 61+2a=−3; 2a=−64.\nResultado final: a=−32.", "master"),
      q("algebra", "factor-01", "teorema del factor", "comprobar-divisibilidad", "factor-theorem-high-degree", "ejercicio 6.b", "Indica si P(x)=x¹⁵⁴−11x⁸²+10 es divisible por x−1.", ["Sí, porque P(1)=0", "No, porque P(1)=20", "Sí, porque P(−1)=0", "No, por tener grado par"], "Resolución:\n1. x−1 divide a P si P(1)=0.\n2. P(1)=1−11+10=0.\nResultado final: sí es divisible por x−1."),
      q("algebra", "fraccion-01", "fracciones algebraicas", "simplificar-fraccion", "factor-cancel-with-domain", "sección fracciones algebraicas", "Simplifica (x²−9)/(x²−3x), indicando las restricciones.", ["(x+3)/x, con x≠0,3", "(x−3)/x", "x+3", "(x+3)/(x−3)"], "Resolución:\n1. Factorizamos: x²−9=(x−3)(x+3) y x²−3x=x(x−3).\n2. Simplificamos x−3, conservando las restricciones del original x≠0,3.\nResultado final: (x+3)/x, con x≠0,3.", "master"),
      q("algebra", "identidad-01", "identidades notables", "desarrollar-y-reducir", "difference-of-squares-and-square", "sección identidades notables", "Simplifica (2x−3)²−(2x−3)(2x+3).", ["−12x+18", "8x²+18", "−6", "12x−18"], "Resolución:\n1. (2x−3)²=4x²−12x+9.\n2. (2x−3)(2x+3)=4x²−9.\n3. Restamos: 4x²−12x+9−4x²+9=−12x+18.\nResultado final: −12x+18.")
    ],

    "4eso-a::ecuaciones e inecuaciones": [
      q("equations", "lineal-01", "ecuaciones de primer grado", "fracciones-y-parentesis", "linear-fractions-parentheses-both-sides", "p. 3, ecuaciones", "Resuelve: (3x+1)/6−2x/12=5−(4x−5)/8.", ["x=131/20", "x=20/131", "x=5", "x=−131/20"], "Resolución:\n1. Multiplicamos toda la ecuación por 24.\n2. 4(3x+1)−4x=120−3(4x−5).\n3. 8x+4=135−12x; 20x=131.\nComprobación: la sustitución verifica la igualdad original.\nResultado final: x=131/20.", "master"),
      q("equations", "bicuadrada-01", "ecuaciones bicuadradas", "cambio-variable", "biquadratic-substitution-four-solutions", "p. 8, bicuadradas", "Resuelve x⁴−5x²+4=0.", ["x=−2,−1,1,2", "x=1,2", "x=±√5", "x=−4,−1,1,4"], "Resolución:\n1. Hacemos y=x².\n2. y²−5y+4=(y−1)(y−4)=0.\n3. x²=1 o x²=4.\nResultado final: x=−2,−1,1,2.", "master"),
      q("equations", "polinomica-01", "ecuaciones polinómicas", "ruffini-factorizacion", "polynomial-repeated-roots-ruffini", "p. 9, factorización", "Resuelve x⁴−10x³+33x²−40x+16=0.", ["x=1 y x=4, ambas dobles", "x=1 y x=4 simples", "x=2 y x=8", "x=−1 y x=−4"], "Resolución:\n1. Probamos raíces enteras y aplicamos Ruffini.\n2. El polinomio factoriza como (x−1)²(x−4)².\n3. Igualamos cada factor a cero.\nResultado final: x=1 y x=4, ambas raíces dobles.", "master"),
      q("equations", "radical-01", "ecuaciones radicales", "aislar-elevar-comprobar", "radical-equation-extraneous-check", "p. 10, ecuaciones radicales", "Resuelve √(x+4)=x−2.", ["x=5", "x=0 y x=5", "x=0", "x=−4"], "Resolución:\n1. La raíz ya está aislada y exige x−2≥0.\n2. Elevamos: x+4=(x−2)²=x²−4x+4.\n3. x²−5x=0; x=0 o x=5.\n4. Comprobamos en la original: x=0 no cumple; x=5 sí cumple.\nResultado final: x=5.", "master"),
      q("equations", "inecuacion-01", "inecuaciones de una incógnita", "parentesis-y-ambos-miembros", "linear-inequality-parentheses-both-sides", "p. 14, representación", "Resuelve y expresa como intervalo: 4(x−2)−5x<−10.", ["(2,+∞)", "(−∞,2)", "[2,+∞)", "(−∞,−2)"], "Resolución:\n1. 4x−8−5x<−10.\n2. −x<−2.\n3. Al dividir por −1 se invierte el signo: x>2.\nResultado final: (2,+∞)."),
      q("equations", "inecuacion-02", "inecuaciones de una incógnita", "fracciones", "linear-inequality-different-denominators", "p. 12, inecuaciones", "Resuelve y expresa como intervalo: 1/3+x−2(x−1)≤(x−1)/2.", ["[17/9,+∞)", "(−∞,17/9]", "[−17/9,+∞)", "(17/9,+∞)"], "Resolución:\n1. Multiplicamos por 6: 2+6x−12(x−1)≤3(x−1).\n2. 14−6x≤3x−3.\n3. 17≤9x, luego x≥17/9.\nResultado final: [17/9,+∞).", "master"),
      q("equations", "problema-ineq-01", "problemas con inecuaciones", "cuota-y-horas", "contextual-linear-inequality-threshold", "p. 19, club de pádel", "En un club se paga una cuota de 90 € y 5 € por cada hora de pista. ¿Cuántas horas como mínimo se han alquilado si se han pagado más de 150 €?", ["Más de 12 horas; como mínimo 13 horas enteras", "12 horas exactamente", "Más de 30 horas", "Como máximo 12 horas"], "Resolución:\n1. Sea h el número de horas: 90+5h>150.\n2. 5h>60; h>12.\n3. Si las horas se cuentan enteras, la mínima es 13.\nResultado final: más de 12 horas; como mínimo 13 horas enteras.", "master")
    ],

    "4eso-a::sistemas de ecuaciones e inecuaciones": [
      q("systems", "lineal-01", "sistemas lineales", "reduccion-y-grafica", "linear-system-reduction-graph", "p. 3, reducción y gráfica", "Resuelve por reducción: {−x+y=7; 4x−y=−4}.", ["x=1, y=8", "x=−1, y=6", "x=3, y=10", "x=8, y=1"], "Resolución:\n1. Sumamos las ecuaciones: 3x=3; x=1.\n2. En −x+y=7: −1+y=7; y=8.\n3. Gráficamente, y=x+7 e y=4x+4 se cortan en (1,8).\nResultado final: x=1, y=8."),
      q("systems", "metodo-01", "elección de método", "seleccionar-metodo", "choose-substitution-isolated-variable", "p. 6, elección de método", "Si una ecuación del sistema ya está escrita como y=3x−2, ¿qué método aprovecha directamente esa forma?", ["Sustitución", "Reducción", "Ruffini", "Factorización"], "Resolución:\nLa variable y ya está aislada, por lo que se sustituye 3x−2 en la otra ecuación.\nResultado final: sustitución."),
      q("systems", "no-lineal-01", "sistemas no lineales", "recta-y-cuadratica", "nonlinear-line-parabola-two-solutions", "p. 9, sistemas no lineales", "Resuelve {y=x+2; x²+y²=10}.", ["(1,3) y (−3,−1)", "(1,3)", "(3,1) y (−1,−3)", "(−1,1) y (1,−1)"], "Resolución:\n1. Sustituimos y=x+2: x²+(x+2)²=10.\n2. 2x²+4x−6=0; x²+2x−3=0.\n3. x=1 o x=−3.\n4. y=x+2: y=3 o y=−1.\nResultado final: (1,3) y (−3,−1).", "master"),
      q("systems", "problema-01", "problemas de sistemas", "mezclas", "system-mixture-total-and-value", "examen Unidad 5-6, ejercicio 3", "Se mezclan aceites de 3 €/L y 1 €/L para obtener 40 L a 2,5 €/L. ¿Cuántos litros hay de cada clase?", ["30 L y 10 L", "20 L y 20 L", "10 L y 30 L", "35 L y 5 L"], "Resolución:\n1. Sean x e y los litros: x+y=40.\n2. Por el valor: 3x+y=40·2,5=100.\n3. Restamos: 2x=60; x=30 e y=10.\nResultado final: 30 L del aceite de 3 €/L y 10 L del de 1 €/L.", "master")
    ],

    "4eso-a::semejanza y trigonometria": [
      q("trigonometry", "semejanza-01", "razón de semejanza", "areas-a-lados", "area-ratio-to-linear-ratio", "ejercicio 2", "Los lados de un triángulo miden 3, 4 y 5 cm. Halla los de otro semejante cuya razón de áreas es 36.", ["18, 24 y 30 cm", "108, 144 y 180 cm", "6, 8 y 10 cm", "9, 12 y 15 cm"], "Resolución:\n1. La razón de áreas es el cuadrado de la razón lineal: k²=36.\n2. k=6.\n3. Multiplicamos los lados por 6.\nResultado final: 18, 24 y 30 cm.", "master"),
      q("trigonometry", "pitagoras-01", "Pitágoras y semejanza", "triangulos-semejantes", "similar-right-triangles-pythagoras-scale", "ejercicio 3", "Las hipotenusas de dos triángulos rectángulos semejantes miden 13 y 26 cm. Un cateto del menor mide 5 cm. Halla los restantes catetos.", ["12 cm en el menor; 10 y 24 cm en el mayor", "8 cm en el menor; 10 y 16 cm en el mayor", "12 cm en el menor; 5 y 24 cm en el mayor", "18 cm en el menor; 10 y 36 cm en el mayor"], "Resolución:\n1. En el menor, b²=13²−5²=144, luego b=12.\n2. La razón de semejanza es 26/13=2.\n3. Los catetos mayores son 10 y 24 cm.\nResultado final: 12 cm; 10 y 24 cm.", "master"),
      q("trigonometry", "razon-01", "razones trigonométricas", "elegir-razon", "identify-sine-cosine-tangent-from-sides", "sección razones trigonométricas", "En un triángulo rectángulo, respecto de α conocemos el cateto opuesto y la hipotenusa. ¿Qué razón usamos?", ["sen α", "cos α", "tg α", "Teorema de Tales"], "Resolución:\n1. Identificamos los lados respecto de α.\n2. sen α=cateto opuesto/hipotenusa.\nResultado final: sen α."),
      q("trigonometry", "altura-01", "resolución de triángulos", "altura-con-tangente", "right-triangle-height-from-distance-angle", "problemas de trigonometría", "Desde un punto situado a 20 m de un edificio se observa su parte superior con un ángulo de 35°. Calcula la altura, sin considerar la altura del observador.", ["20·tg35°≈14,00 m", "20·sen35°≈11,47 m", "20/tg35°≈28,56 m", "20·cos35°≈16,38 m"], "Resolución:\n1. Dibujo: 20 m es el cateto adyacente y la altura h el opuesto.\n2. tg35°=h/20.\n3. h=20·tg35°≈14,00 m.\nResultado final: aproximadamente 14,00 m.", "master")
    ],

    "4eso-a::areas y cuerpos geometricos": [
      q("geometry", "cono-01", "conos", "volumen-desde-generatriz", "cone-volume-from-slant-height-diameter", "ejercicio 4.b", "Calcula el volumen de un cono cuya generatriz mide 5 cm y cuya base tiene 3 cm de diámetro.", ["3π√91/8 cm³", "9π√91/8 cm³", "15π/4 cm³", "3π√91/4 cm³"], "Resolución:\n1. r=3/2 cm.\n2. Por Pitágoras, h=√(5²−(3/2)²)=√91/2.\n3. V=πr²h/3=3π√91/8 cm³.\nResultado final: 3π√91/8 cm³.", "master"),
      q("geometry", "cilindro-coste-01", "cilindros", "area-total-y-coste", "cylinder-packaging-weekly-cost", "problema quesería", "Un queso cilíndrico tiene 22 cm de diámetro y 15 cm de altura. El plástico cuesta 1,30 €/m². ¿Cuánto cuesta envasar 300 quesos diarios durante una semana?", ["Aproximadamente 490,58 €", "Aproximadamente 70,08 €", "Aproximadamente 981,16 €", "Aproximadamente 343,41 €"], "Resolución:\n1. r=0,11 m y h=0,15 m.\n2. Área total: A=2πr(r+h)=0,0572π m².\n3. Hay 300·7=2.100 quesos.\n4. Coste=0,0572π·2100·1,30≈490,58 €.\nResultado final: aproximadamente 490,58 €.", "master"),
      q("geometry", "esfera-01", "esferas", "volumen", "sphere-volume-given-radius", "sección esferas", "Calcula el volumen de una esfera de radio 6 cm.", ["288π cm³", "144π cm³", "216π cm³", "864π cm³"], "Resolución:\n1. V=4πr³/3.\n2. V=4π·6³/3=4π·216/3=288π.\nResultado final: 288π cm³."),
      q("geometry", "refuerzo-euler-01", "prerrequisitos geométricos", "relacion-euler", "initial-reinforcement-euler", "cuestionario elemental", "En un poliedro convexo, ¿qué relación cumplen caras C, aristas A y vértices V?", ["C+V=A+2", "C+A=V+2", "C+V=A−2", "C·V=A+2"], "Resolución:\nLa relación de Euler es C+V=A+2. En un cubo, 6+8=12+2.\nResultado final: C+V=A+2.", "apprentice", { reinforcementOnly: true, progressionStage: "initial" })
    ],

    "4eso-a::funciones": [
      q("functions", "afin-01", "función afín", "dominio-recorrido", "affine-domain-range-nonconstant", "p. 5, dominio y recorrido", "Calcula el dominio y el recorrido de y=3x−5.", ["Dominio ℝ y recorrido ℝ", "Dominio ℝ\\{5} y recorrido ℝ", "Dominio [−5,+∞) y recorrido ℝ", "Dominio ℝ y recorrido [−5,+∞)"], "Resolución:\n1. Una función afín no constante está definida para todo real.\n2. Al variar x en ℝ, 3x−5 toma cualquier valor real.\nResultado final: dominio ℝ y recorrido ℝ."),
      q("functions", "cuadratica-01", "función cuadrática", "representacion-razonada", "quadratic-vertex-axis-intercepts", "p. 16, representación", "Representa razonadamente f(x)=2x²−8.", ["Vértice (0,−8), eje x=0, cortes x=±2, abre hacia arriba", "Vértice (0,8), cortes x=±4, abre hacia abajo", "Vértice (2,0), eje x=2", "No corta el eje X"], "Resolución:\n1. a=2>0: abre hacia arriba.\n2. No hay término lineal: eje x=0 y vértice (0,−8).\n3. 2x²−8=0; x²=4; x=±2.\nResultado final: vértice (0,−8), eje x=0 y cortes x=±2.", "master"),
      q("functions", "racional-01", "función racional", "asintotas-y-cortes", "rational-domain-asymptotes-intercepts", "p. 15, representación", "Estudia los elementos principales de g(x)=(2x+1)/(x−2).", ["Dom ℝ\\{2}; asíntotas x=2, y=2; cortes (−1/2,0), (0,−1/2)", "Dom ℝ; asíntota x=−2", "Dom ℝ\\{−2}; asíntota y=−2", "Dom (2,+∞); sin cortes"], "Resolución:\n1. x−2≠0: dominio ℝ\\{2} y asíntota vertical x=2.\n2. g(x)=2+5/(x−2): asíntota horizontal y=2.\n3. Cortes: 2x+1=0 da x=−1/2; g(0)=−1/2.\nResultado final: dominio ℝ\\{2}, asíntotas x=2 e y=2 y los cortes indicados.", "master"),
      q("functions", "exponencial-01", "función exponencial", "dominio-recorrido-comportamiento", "exponential-domain-range-growth", "p. 9, dominio y recorrido", "Indica dominio, recorrido y comportamiento de y=2ˣ.", ["Dominio ℝ, recorrido (0,+∞), creciente", "Dominio (0,+∞), recorrido ℝ, decreciente", "Dominio ℝ, recorrido ℝ, creciente", "Dominio [0,+∞), recorrido [0,+∞)"], "Resolución:\n1. 2ˣ existe para todo x real.\n2. Sus valores son siempre positivos.\n3. Como la base 2>1, es creciente.\nResultado final: dominio ℝ, recorrido (0,+∞) y creciente."),
      q("functions", "logaritmica-01", "función logarítmica", "dominio-recorrido", "logarithmic-domain-range", "p. 9, dominio y recorrido", "Indica el dominio y recorrido de y=log x.", ["Dominio (0,+∞) y recorrido ℝ", "Dominio ℝ y recorrido (0,+∞)", "Dominio [0,+∞) y recorrido ℝ", "Dominio ℝ\\{0} y recorrido ℝ"], "Resolución:\n1. El argumento del logaritmo debe ser positivo: x>0.\n2. log x puede tomar cualquier valor real.\nResultado final: dominio (0,+∞) y recorrido ℝ."),
      q("functions", "composicion-01", "composición", "calcular-composicion", "compose-affine-quadratic", "p. 19, operaciones y composición", "Dadas f(x)=x+2 y g(x)=x²−3x+1, calcula (g∘f)(x).", ["x²+x−1", "x²−3x+3", "x²+4x+4", "2x²−x+1"], "Resolución:\n1. (g∘f)(x)=g(x+2).\n2. (x+2)²−3(x+2)+1=x²+4x+4−3x−6+1.\n3. Reducimos.\nResultado final: x²+x−1.", "master"),
      q("functions", "inversa-01", "función inversa", "calcular-inversa", "inverse-affine-function", "p. 19, función recíproca", "Calcula la función inversa de f(x)=3x−4.", ["f⁻¹(x)=(x+4)/3", "f⁻¹(x)=3x+4", "f⁻¹(x)=(x−4)/3", "f⁻¹(x)=1/(3x−4)"], "Resolución:\n1. Escribimos y=3x−4.\n2. Intercambiamos x e y: x=3y−4.\n3. Despejamos y=(x+4)/3.\nComprobación: f(f⁻¹(x))=x.\nResultado final: f⁻¹(x)=(x+4)/3.", "master"),
      q("functions", "tvm-01", "tasa de variación media", "calcular-tvm", "average-rate-quadratic-two-intervals", "p. 18, TVM", "Para g(x)=(x−5)², calcula la TVM en [1,5].", ["−4", "4", "−16", "0"], "Resolución:\n1. TVM=[g(5)−g(1)]/(5−1).\n2. g(5)=0 y g(1)=16.\n3. TVM=(0−16)/4=−4.\nResultado final: −4.", "master"),
      q("functions", "modelo-01", "modelización", "comparar-funciones-afines", "compare-two-linear-cost-models", "p. 18, problema de técnicos", "Un técnico cobra C₁(t)=20+15t y otro C₂(t)=18t, con t en horas. ¿A partir de qué tiempo el segundo resulta más caro?", ["t>20/3 h, es decir, más de 6 h 40 min", "t>3 h", "Desde el inicio", "Nunca"], "Resolución:\n1. Comparamos: 18t>20+15t.\n2. 3t>20; t>20/3.\n3. 20/3 h=6 h 40 min.\nResultado final: para trabajos de más de 6 h 40 min.", "master")
    ]
  };

  function graphSvg({ boundary = [], region = "", caption = "Representación gráfica" }) {
    const lines = boundary.map((line) => `<line x1="${line[0]}" y1="${line[1]}" x2="${line[2]}" y2="${line[3]}" class="${line[4] === "dashed" ? "ineq-boundary dashed" : "ineq-boundary"}"/>`).join("");
    return `<figure class="geometry-question-figure inequality-graph"><svg class="geometry-question-svg" viewBox="0 0 260 180" role="img" aria-label="${caption}"><defs><pattern id="grid4a" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" class="ineq-grid"/></pattern></defs><rect x="20" y="10" width="220" height="150" fill="url(#grid4a)"/><path d="M20 85H240M130 10V160" class="ineq-axis"/>${region}${lines}<text x="238" y="80">x</text><text x="136" y="18">y</text></svg><figcaption>${caption}</figcaption></figure>`;
  }

  function generatedQ(id, subtopic, exerciseType, structureId, text, options, solution, level = "apprentice", statementHtml = "") {
    return q("systems", `practice-${id}`, subtopic, exerciseType, structureId, "Ejercicio nuevo autorizado para Práctica por temas", text, options, solution, level, {
      source: "Diseño didáctico autorizado · 4.º ESO A · solo Práctica por temas",
      sourceKind: "teacher-authorized-generated-practice",
      sourceType: "generated-4eso-a-inequalities",
      examEligible: false,
      challengeEligible: true,
      adventureEligible: false,
      generatedForCoverage: true,
      statementHtml: statementHtml ? `<div class="question-text">${text}</div>${statementHtml}` : undefined
    });
  }

  const inequalityPractice = [
    generatedQ("sys1-01", "sistemas de inecuaciones de una incógnita", "interseccion-acotada", "one-variable-system-bounded-closed-open", "Resuelve el sistema {2x−3≥1; 5−x>0}.", ["[2,5)", "(2,5]", "(−∞,2]", "[5,+∞)"], "Resolución:\n1. 2x−3≥1 da 2x≥4, luego x≥2.\n2. 5−x>0 da −x>−5, luego x<5.\n3. Intersecamos [2,+∞) y (−∞,5).\nResultado final: [2,5)."),
    generatedQ("sys1-02", "sistemas de inecuaciones de una incógnita", "interseccion-vacia", "one-variable-system-empty-intersection", "Resuelve el sistema {3(x−1)>6; 2x+1≤5}.", ["∅", "(3,+∞)", "(−∞,2]", "(2,3)"], "Resolución:\n1. 3(x−1)>6 da x>3.\n2. 2x+1≤5 da x≤2.\n3. (3,+∞)∩(−∞,2]=∅.\nResultado final: no tiene solución; ∅."),
    generatedQ("sys1-03", "sistemas de inecuaciones de una incógnita", "fracciones", "one-variable-system-fractions-different-denominators", "Resuelve el sistema {x/2−1/3≥1; (x−1)/3<2}.", ["[8/3,7)", "(7,+∞)", "[2/3,5)", "(−∞,8/3]"], "Resolución:\n1. x/2≥4/3, luego x≥8/3.\n2. (x−1)/3<2 da x−1<6, luego x<7.\n3. Intersecamos.\nResultado final: [8/3,7).", "master"),
    generatedQ("sys1-04", "sistemas de inecuaciones de una incógnita", "signos", "one-variable-system-sign-reversal-unbounded", "Resuelve el sistema {−2x+4≤10; 3−x<8}.", ["[−3,+∞)", "(−5,+∞)", "(−∞,−5)", "(−5,−3]"], "Resolución:\n1. −2x≤6; al dividir por −2, x≥−3.\n2. −x<5; al dividir por −1, x>−5.\n3. [−3,+∞) está contenido en (−5,+∞).\nResultado final: [−3,+∞)."),
    generatedQ("sys1-05", "sistemas de inecuaciones de una incógnita", "varios parentesis", "one-variable-system-multiple-parentheses-single-point", "Resuelve el sistema {2(x−1)≤x+3; 3(x+1)≥2x+8}.", ["{5}", "[5,+∞)", "(−∞,5]", "∅"], "Resolución:\n1. 2x−2≤x+3 da x≤5.\n2. 3x+3≥2x+8 da x≥5.\n3. La intersección es un único punto.\nResultado final: {5}.", "master"),
    generatedQ("sys1-06", "sistemas de inecuaciones de una incógnita", "intervalos disjuntos", "one-variable-system-disjoint-intervals-empty", "Resuelve el sistema {4−3x≥10; (x+2)/2>1}.", ["∅", "(0,+∞)", "(−∞,−2]", "(−2,0)"], "Resolución:\n1. −3x≥6; x≤−2.\n2. x+2>2; x>0.\n3. No hay números que cumplan ambas.\nResultado final: ∅.", "master"),

    generatedQ("ineq2-01", "inecuaciones lineales de dos incógnitas", "semiplano-inferior-incluido", "two-variable-below-solid-oblique", "Representa 2x+y≤4.", ["Semiplano y≤4−2x, incluida la recta", "Semiplano y≥4−2x, sin recta", "Solo la recta y=4−2x", "Semiplano x≤2"], "Resolución:\n1. Recta frontera: 2x+y=4, es decir, y=4−2x.\n2. Es continua porque aparece ≤.\n3. El punto (0,0) cumple 0≤4, así que se sombrea su semiplano.\nResultado final: y≤4−2x, incluida la frontera.", "apprentice", graphSvg({ boundary:[[40,25,220,145,"solid"]], region:'<path d="M40 25L220 145L220 160H20V25Z" class="ineq-region"/>', caption:"y≤4−2x: frontera incluida y semiplano inferior" })),
    generatedQ("ineq2-02", "inecuaciones lineales de dos incógnitas", "semiplano-superior-excluido", "two-variable-above-dashed-oblique", "Representa y>x−1.", ["Semiplano superior a y=x−1, sin incluir la recta", "Semiplano inferior, incluida la recta", "Solo y=x−1", "x>−1"], "Resolución:\n1. La frontera es y=x−1.\n2. Se dibuja discontinua porque la desigualdad es estricta.\n3. El punto (0,0) cumple 0>−1, por lo que se sombrea el semiplano que lo contiene.\nResultado final: semiplano superior, frontera excluida.", "apprentice", graphSvg({ boundary:[[45,145,215,25,"dashed"]], region:'<path d="M20 10H240V10L215 25L45 145L20 160Z" class="ineq-region"/>', caption:"y>x−1: frontera discontinua y semiplano superior" })),
    generatedQ("ineq2-03", "inecuaciones lineales de dos incógnitas", "recta-vertical", "two-variable-vertical-boundary", "Representa x≥2.", ["Semiplano derecho de x=2, incluida la recta", "Semiplano izquierdo de x=2, sin recta", "Semiplano superior de y=2", "Solo x=2"], "Resolución:\n1. La frontera es la recta vertical x=2.\n2. Como aparece ≥, la frontera se incluye.\n3. Se toman los puntos situados a su derecha.\nResultado final: x≥2.", "apprentice", graphSvg({ boundary:[[170,10,170,160,"solid"]], region:'<rect x="170" y="10" width="70" height="150" class="ineq-region"/>', caption:"x≥2: semiplano derecho y frontera incluida" })),
    generatedQ("ineq2-04", "inecuaciones lineales de dos incógnitas", "recta-horizontal", "two-variable-horizontal-boundary", "Representa y<−1.", ["Semiplano inferior a y=−1, sin incluir la recta", "Semiplano superior, incluida la recta", "Semiplano derecho de x=−1", "Solo y=−1"], "Resolución:\n1. La frontera es la recta horizontal y=−1.\n2. Se dibuja discontinua por ser <.\n3. Se sombrea debajo.\nResultado final: y<−1.", "apprentice", graphSvg({ boundary:[[20,115,240,115,"dashed"]], region:'<rect x="20" y="115" width="220" height="45" class="ineq-region"/>', caption:"y<−1: semiplano inferior y frontera excluida" })),
    generatedQ("ineq2-05", "inecuaciones lineales de dos incógnitas", "punto-de-prueba", "two-variable-test-point-origin-fails", "Representa 3x−2y>6.", ["y<(3/2)x−3, frontera excluida", "y>(3/2)x−3, frontera incluida", "y<3x−6, frontera incluida", "x>2 únicamente"], "Resolución:\n1. Frontera: 3x−2y=6, o y=(3/2)x−3.\n2. Al despejar: −2y>6−3x; dividimos por −2 e invertimos: y<(3/2)x−3.\n3. (0,0) no cumple 0>6; se sombrea el lado opuesto.\nResultado final: y<(3/2)x−3, frontera discontinua.", "master", graphSvg({ boundary:[[45,145,195,25,"dashed"]], region:'<path d="M45 145L195 25H240V160H20V160Z" class="ineq-region"/>', caption:"3x−2y>6: semiplano solución y frontera excluida" })),
    generatedQ("ineq2-06", "inecuaciones lineales de dos incógnitas", "forma-equivalente", "two-variable-parentheses-simplify-before-graph", "Representa 2(x−1)+y≥x+3.", ["y≥5−x, incluida la recta", "y≤5−x, incluida la recta", "y>3−2x, sin recta", "x+y≥3"], "Resolución:\n1. 2x−2+y≥x+3.\n2. y≥5−x.\n3. La frontera y=5−x se incluye y se sombrea encima.\nResultado final: y≥5−x.", "master", graphSvg({ boundary:[[45,25,215,145,"solid"]], region:'<path d="M20 10H240V160L215 145L45 25L20 10Z" class="ineq-region"/>', caption:"y≥5−x: semiplano superior y frontera incluida" })),

    generatedQ("sys2-01", "sistemas de inecuaciones de dos incógnitas", "cuña", "two-variable-system-wedge", "Representa el sistema {y≥x−1; y≤−x+5}.", ["Región entre ambas rectas, con vértice (3,2), fronteras incluidas", "Región exterior, sin fronteras", "Solo el punto (3,2)", "Región vacía"], "Resolución:\n1. Representamos y=x−1 y y=−x+5 con línea continua.\n2. Sombreamos encima de la primera y debajo de la segunda.\n3. Se cortan en x−1=−x+5; x=3, y=2.\nResultado final: la cuña común situada a la izquierda de (3,2), con fronteras incluidas.", "master", graphSvg({ boundary:[[45,145,215,25,"solid"],[45,25,215,145,"solid"]], region:'<path d="M45 25L130 85L45 145Z" class="ineq-region strong"/>', caption:"Intersección: y≥x−1 e y≤−x+5" })),
    generatedQ("sys2-02", "sistemas de inecuaciones de dos incógnitas", "banda", "two-variable-system-horizontal-band", "Representa el sistema {y>−2; y≤3}.", ["Banda −2<y≤3", "Banda −2≤y<3", "y>3", "Región vacía"], "Resolución:\n1. y=−2 es frontera discontinua y se toma por encima.\n2. y=3 es frontera continua y se toma por debajo.\n3. Intersección: −2<y≤3.\nResultado final: banda horizontal −2<y≤3.", "apprentice", graphSvg({ boundary:[[20,125,240,125,"dashed"],[20,45,240,45,"solid"]], region:'<rect x="20" y="45" width="220" height="80" class="ineq-region strong"/>', caption:"Banda horizontal −2<y≤3" })),
    generatedQ("sys2-03", "sistemas de inecuaciones de dos incógnitas", "franja-vertical", "two-variable-system-vertical-strip", "Representa el sistema {x≥−1; x<4}.", ["Franja −1≤x<4", "Franja −1<x≤4", "x≥4", "Región vacía"], "Resolución:\n1. x=−1 es continua y se toma a la derecha.\n2. x=4 es discontinua y se toma a la izquierda.\n3. Intersección: −1≤x<4.\nResultado final: franja vertical −1≤x<4.", "apprentice", graphSvg({ boundary:[[90,10,90,160,"solid"],[200,10,200,160,"dashed"]], region:'<rect x="90" y="10" width="110" height="150" class="ineq-region strong"/>', caption:"Franja vertical −1≤x<4" })),
    generatedQ("sys2-04", "sistemas de inecuaciones de dos incógnitas", "region-no-acotada", "two-variable-system-unbounded-corner", "Representa el sistema {x≥0; y≥2}.", ["Región a la derecha de x=0 y por encima de y=2, fronteras incluidas", "Región x≤0, y≤2", "Solo (0,2)", "Región vacía"], "Resolución:\n1. x=0 delimita el semiplano derecho.\n2. y=2 delimita el semiplano superior.\n3. La intersección es una región no acotada con vértice (0,2).\nResultado final: x≥0 e y≥2.", "apprentice", graphSvg({ boundary:[[130,10,130,160,"solid"],[20,55,240,55,"solid"]], region:'<rect x="130" y="10" width="110" height="45" class="ineq-region strong"/>', caption:"Región común x≥0, y≥2" })),
    generatedQ("sys2-05", "sistemas de inecuaciones de dos incógnitas", "region-vacia", "two-variable-system-parallel-empty", "Representa el sistema {y≥x+2; y<x−1}.", ["Región vacía", "Banda entre dos paralelas", "Semiplano superior", "Solo la recta y=x"], "Resolución:\n1. La primera exige estar por encima de y=x+2.\n2. La segunda exige estar por debajo de y=x−1.\n3. Como x+2>x−1 para todo x, no existe punto común.\nResultado final: ∅.", "master", graphSvg({ boundary:[[45,125,185,25,"solid"],[75,145,215,45,"dashed"]], region:'', caption:"Fronteras paralelas sin región común" })),
    generatedQ("sys2-06", "sistemas de inecuaciones de dos incógnitas", "triangulo-no-acotado", "two-variable-system-oblique-and-axis", "Representa el sistema {y≤2x+2; y≥0}.", ["Región sobre el eje X y bajo y=2x+2, fronteras incluidas", "Región bajo el eje X", "Región sobre ambas rectas", "Región vacía"], "Resolución:\n1. Dibujamos y=2x+2 y el eje y=0 con línea continua.\n2. Tomamos debajo de la primera y encima del eje X.\n3. Las fronteras se cortan en (−1,0).\nResultado final: región común no acotada desde (−1,0).", "master", graphSvg({ boundary:[[55,145,160,25,"solid"],[20,85,240,85,"solid"]], region:'<path d="M55 145L108 85H240V160H55Z" class="ineq-region strong"/>', caption:"Intersección y≤2x+2, y≥0" }))
  ];

  originalBanks["4eso-a::sistemas de ecuaciones e inecuaciones"].push(...inequalityPractice);

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const previous = window.MargaritaEsoOriginalPractice;
  const ownBuild = (courseId, theme) => originalBanks[`${courseId}::${normalize(theme)}`] || [];
  window.MargaritaEsoOriginalPractice = {
    ...previous,
    build(courseId, theme, level = "apprentice") {
      return [
        ...(previous?.build?.(courseId, theme, level) || []),
        ...ownBuild(courseId, theme).filter((item) => item.challengeLevel === level).map((item) => ({ ...item }))
      ];
    },
    all(courseId, theme) {
      return [
        ...(previous?.all?.(courseId, theme) || []),
        ...ownBuild(courseId, theme).map((item) => ({ ...item }))
      ];
    },
    count: (previous?.count || 0) + Object.values(originalBanks).reduce((sum, items) => sum + items.length, 0)
  };

  const ownFunctions = originalBanks["4eso-a::funciones"].map((item) => ({ ...item }));
  window.MargaritaFourEsoAOwnBanks = {
    model(name) {
      return normalize(name) === "funciones" ? ownFunctions.map((item) => ({ ...item })) : [];
    },
    all(theme) {
      return ownBuild(COURSE_ID, theme).map((item) => ({ ...item }));
    },
    stats: {
      originals: Object.values(originalBanks).flat().filter((item) => !item.generatedForCoverage).length,
      generated: inequalityPractice.length,
      total: Object.values(originalBanks).flat().length
    }
  };
})();

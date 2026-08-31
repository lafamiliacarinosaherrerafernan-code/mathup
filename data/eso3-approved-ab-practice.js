(function () {
  "use strict";

  const ROOT = "documentos/3º ESO/Fuentes de ejercicios/Ampliación banco 2026-08-09/";
  const TOPICS = {
    real: [0, "numeros-reales"], powers: [1, "potencias-raices"],
    algebra: [2, "expresiones-algebraicas"], equations: [3, "ecuaciones-sistemas"],
    proportionality: [4, "proporcionalidad"], sequences: [5, "sucesiones"],
    geometry: [6, "cuerpos-geometricos"], functions: [7, "funciones"],
    statistics: [8, "estadistica"], probability: [9, "probabilidad"]
  };
  const SOURCES = {
    NRPR: "eJERCIOS DE NUEMROS REALES POTENCIAS Y RAICES 3 eso.pdf",
    PR: "potencias_raices_3_eso.pdf",
    EAR: "ejercicios-de-refuerzo-expresiones-algebraicas-polinomios-3 ESO.pdf",
    EAII: "Expresiones algebraicas 3 ESO II.pdf",
    EAI: "Expresiones algebraicas 3 ESO.pdf",
    ESII: "Ecuaciones y sistemas 3 ESO II.pdf",
    PS: "Problemas_sistemas_3eso III.pdf",
    PC: "problemas_proporc_comp 3 eso iii.pdf",
    PROPII: "problemas-de-proporcionalidad 3 eso ii.pdf",
    PROPL: "PROPORCINALIDAD 3 eso.pdf",
    PROPIII: "pROPORCINALIDAD 3 eso iii.pdf",
    SR: "resueltos-sucesiones 3 ESO III.pdf",
    SI: "Sucesiones 3 ESO.pdf",
    CGI: "Cuerpos Geometricos 3 ESO I.pdf",
    CGII: "Cuerpos geometricos 3 ESO.pdf",
    FR: "ejercicios-de-repaso-de-funciones 3 ESO.pdf",
    FII: "funciones 3 Eso ii.pdf",
    STI: "ejercicios-estadistica-3eso..pdf",
    STII: "estadistica 3 ESO II.pdf",
    PI: "probabilidad_3_eso I.pdf",
    PII: "Probabilidad 3 ESO.pdf"
  };
  // La idoneidad para examen se decide ejercicio a ejercicio. No se deriva
  // automáticamente de la etiqueta Aprendiz/Maestro.
  const EXAM_REFS = new Set([
    "NRPR:14", "NRPR:60(a)", "NRPR:61(a)", "NRPR:62(a)",
    "NRPR:72", "NRPR:74", "PR:7(a)", "PR:8(a)", "PR:10(a)",
    "EAR:2(a)", "EAR:9(a)", "EAR:13", "EAR:18(a)",
    "EAII:Ficha 6, 4(a)", "EAII:Ficha 6, 6(a)", "EAII:Repaso 6(a)",
    "EAI:19", "EAI:20", "EAI:32", "EAI:45(a)"
  ]);

  const clean = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const slug = (value) => clean(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const solution = (steps, result, check = "") => [
    "Resolución:", ...steps.map((step, index) => `${index + 1}. ${step}`),
    ...(check ? [`Comprobación: ${check}`] : []), `Resultado final: ${result}.`
  ].join("\n");
  function q(topic, sourceKey, ref, level, subtopic, type, structure, text, options, steps, check = "") {
    const [topicIndex, topicSlug] = TOPICS[topic];
    const document = SOURCES[sourceKey];
    return {
      rawBaseId: `3eso-ab-${slug(sourceKey)}-${slug(ref)}`,
      courseId: "3eso", topicId: `3eso:${topicSlug}`, topicIndex,
      subtopic, exerciseType: type, structureId: structure,
      sourceDocument: `${ROOT}${document}`, sourceReference: ref,
      source: `Material original · ${document} · ${ref}`,
      sourceKind: "teacher-provided-pdf", sourceType: "approved-ab-3eso",
      difficulty: level === "master" ? "hard" : "easy", challengeLevel: level,
      practiceEligible: true, challengeEligible: true, adventureEligible: true,
      examEligible: EXAM_REFS.has(`${sourceKey}:${ref}`),
      examByBlocksEligible: EXAM_REFS.has(`${sourceKey}:${ref}`),
      requiresVisual: false,
      solutionNeedsReview: false, text, options, correct: 0,
      solution: solution(steps, options[0], check)
    };
  }

  const banks = {
    "3eso::numeros reales": [
      q("real","NRPR","10(a)","apprentice","intervalos","representar-intervalo","closed-interval-from-verbal-bounds","Escribe como intervalo los números reales comprendidos entre −1 y 3, ambos incluidos.",["[−1,3]","(−1,3)","[−1,3)","(−∞,3]"],["Al estar incluidos los dos extremos, usamos corchetes en −1 y en 3."],"−1 y 3 pertenecen al intervalo"),
      q("real","NRPR","11(a)","apprentice","intervalos","conjunto-a-intervalo","set-builder-to-half-open-interval","Escribe como intervalo {x∈ℝ | 3≤x<5}.",["[3,5)","(3,5]","[3,5]","(−∞,5)"],["El 3 está incluido y el 5 no: corchete en 3 y paréntesis en 5."],"3 pertenece y 5 no pertenece"),
      q("real","NRPR","12(a)","apprentice","intervalos","intervalo-a-desigualdad","half-open-interval-to-inequality","Escribe mediante desigualdades el intervalo (−1,4].",["−1<x≤4","−1≤x<4","x≤−1 o x>4","−1<x<4"],["El paréntesis excluye −1 y el corchete incluye 4."],"x=4 cumple y x=−1 no cumple"),
      q("real","NRPR","14","master","operaciones con intervalos","interseccion","intersection-two-unbounded-intervals","Sean A=(−∞,2] y B=[−2,∞). Calcula A∩B.",["[−2,2]","(−∞,∞)","(−∞,−2]","[2,∞)"],["La intersección contiene los números que pertenecen a ambos intervalos.","Deben ser a la vez mayores o iguales que −2 y menores o iguales que 2."],"los dos extremos pertenecen a ambos")
    ],

    "3eso::potencias y raices": [
      q("powers","NRPR","24(a)","apprentice","potencias","calcular-potencia","negative-base-odd-exponent","Calcula (−3)³.",["−27","27","−9","9"],["El exponente 3 es impar, por lo que el resultado conserva el signo negativo.","3³=27."],"(−3)(−3)(−3)=−27"),
      q("powers","NRPR","25(a)","apprentice","potencias","expresar-como-potencia","integer-as-power-base-two","Expresa 64 como una potencia de base 2.",["2⁶","2⁵","4²","8²"],["Multiplicamos 2 sucesivamente: 2·2·2·2·2·2=64."],"2⁶=64"),
      q("powers","NRPR","60(a)","master","radicales","operar-radicales","simplify-and-combine-square-roots","Simplifica √18+√50−√2−√8.",["5√2","6√2","4√2","√58"],["Extraemos cuadrados: √18=3√2, √50=5√2 y √8=2√2.","Sumamos los coeficientes: (3+5−1−2)√2=5√2."],"(5√2)²=50"),
      q("powers","NRPR","61(a)","master","radicales","producto-conjugados","product-radical-conjugates","Calcula (√2+√3)(√2−√3).",["−1","1","5","√6"],["Aplicamos (a+b)(a−b)=a²−b².","(√2)²−(√3)²=2−3=−1."],"el producto de conjugados elimina los radicales cruzados"),
      q("powers","NRPR","62(a)","master","radicales","racionalizar","single-square-root-denominator","Racionaliza 1/√2.",["√2/2","1/2","2/√2","2√2"],["Multiplicamos numerador y denominador por √2.","√2/(√2·√2)=√2/2."],"√2/2·√2=1"),
      q("powers","NRPR","64(a)","apprentice","notación científica","pasar-a-decimal","scientific-to-integer-positive-exponent","Escribe 4·10⁷ en forma decimal.",["40 000 000","4 000 000","400 000 000","0,0000004"],["El exponente 7 desplaza la coma siete lugares a la derecha."],"40 000 000=4·10⁷"),
      q("powers","NRPR","67(a)","apprentice","notación científica","hallar-exponente","decimal-to-scientific-find-exponent","Completa 3 570 000=3,57·10ⁿ. ¿Cuánto vale n?",["6","5","7","−6"],["Para pasar de 3,57 a 3 570 000 desplazamos la coma seis lugares a la derecha."],"3,57·10⁶=3 570 000"),
      q("powers","NRPR","72","master","notación científica","problema-de-escala","circumference-count-microscopic-units","Un virus mide 5·10⁻⁴ mm y la Tierra tiene radio 6370 km. Aproximando la Tierra por una circunferencia, ¿cuántos virus cabrían alineados alrededor del ecuador?",["≈8,00·10¹³","≈8,00·10¹⁰","≈1,27·10¹⁰","≈4,00·10¹³"],["La longitud ecuatorial es 2π·6370≈4,0024·10⁴ km.","Pasamos a milímetros: 4,0024·10¹⁰ mm.","Dividimos entre 5·10⁻⁴ mm: ≈8,00·10¹³."],"el cociente no tiene unidades"),
      q("powers","NRPR","74","master","notación científica","distancia-astronómica","light-years-to-kilometres","Una estrella está a 4,3 años luz. Si la luz recorre 300 000 km cada segundo, calcula la distancia en kilómetros usando 365 días por año.",["≈4,07·10¹³ km","≈1,29·10¹³ km","≈4,07·10¹⁰ km","≈9,46·10¹² km"],["Un año tiene 365·24·3600=31 536 000 s.","Un año luz son 300 000·31 536 000=9,4608·10¹² km.","Multiplicamos por 4,3: 4,068144·10¹³ km."],"el orden de magnitud es 10¹³ km"),
      q("powers","PR","2(a)","apprentice","potencias","producto-misma-base","signed-powers-same-base-product","Calcula (−2)²·(−2)³·(−2)⁴.",["−512","512","−64","2⁹"],["Sumamos exponentes porque la base es la misma: (−2)²⁺³⁺⁴=(−2)⁹.","El exponente es impar: (−2)⁹=−512."],"(−2)⁹=−512"),
      q("powers","PR","3(a)","apprentice","potencias","signo-de-potencia","negative-base-even-exponent-sign","¿Qué signo tiene (−3)¹²?",["Positivo","Negativo","Cero","No está definido"],["Una base negativa elevada a un exponente par produce un número positivo."],"12 es par"),
      q("powers","PR","6(a)","apprentice","potencias","producto-misma-base","literal-powers-same-base","Simplifica x⁴·x⁶.",["x¹⁰","x²⁴","x²","2x¹⁰"],["Con la misma base se suman los exponentes: 4+6=10."],"x⁴·x⁶=x¹⁰"),
      q("powers","PR","7(a)","master","potencias","operacion-encadenada","nested-literal-power-products","Simplifica (a²·a³·a)³·(a²·a³·a⁰).",["a²³","a¹⁸","a²⁴","a¹¹"],["En el primer paréntesis: a²·a³·a=a⁶; al cubo resulta a¹⁸.","En el segundo: a²·a³·a⁰=a⁵.","Multiplicamos: a¹⁸·a⁵=a²³."],"los exponentes totales suman 23"),
      q("powers","PR","8(a)","master","potencias","cociente-de-potencias","quotient-power-of-power","Calcula (5⁸·5⁴)/(5²)⁵.",["25","5²⁰","5⁶","1"],["El numerador es 5¹² y el denominador es 5¹⁰.","Dividimos: 5¹²⁻¹⁰=5²=25."],"25=5²"),
      q("powers","PR","10(a)","master","potencias","operacion-con-bases-relacionadas","combine-two-and-five-powers","Calcula [2⁹:(2³)²]·5³.",["1000","100","10 000","125"],["(2³)²=2⁶, por tanto 2⁹:2⁶=2³.","2³·5³=(2·5)³=10³=1000."],"10³=1000"),
      q("powers","PR","11(a)","apprentice","raíces","raiz-cuadrada-exacta","exact-square-root","Calcula √49.",["7","−7","±7","24,5"],["Buscamos el número no negativo cuyo cuadrado es 49: 7²=49."],"la raíz cuadrada principal es no negativa"),
      q("powers","PR","12(a)","apprentice","raíces","raiz-cubica-exacta","exact-cube-root","Calcula ∛1.",["1","−1","0","3"],["1³=1, por tanto su raíz cúbica es 1."],"1³=1")
    ],

    "3eso::expresiones algebraicas": [
      q("algebra","EAR","1(a)","apprentice","valor numérico","evaluar-polinomio-dos-variables","substitute-two-variables-mixed-powers","Calcula el valor de x²+y³−2xy² para x=2, y=−3.",["−59","−31","23","59"],["Sustituimos: 2²+(−3)³−2·2·(−3)².","Calculamos 4−27−36=−59."],"4−27−36=−59"),
      q("algebra","EAR","2(a)","master","polinomios","operacion-lineal","linear-combination-three-polynomials","Sean A=x⁴+3x²+5x−2, B=5x³−3x+1 y C=3x⁴−7x³−8x. Calcula 2A−B+3C.",["11x⁴−26x³+6x²−11x−5","11x⁴−16x³+6x²−11x−3","5x⁴−26x³+3x²−8x−5","11x⁴−26x³+6x²+11x−5"],["Desarrollamos 2A, −B y 3C.","Agrupamos los términos del mismo grado: x⁴, x³, x², x y término independiente."],"los coeficientes por grados son 11, −26, 6, −11 y −5"),
      q("algebra","EAR","5(a)","apprentice","polinomios","producto-monomio-polinomio","distribute-monomial-over-trinomial","Desarrolla x³(2x²−6x+7).",["2x⁵−6x⁴+7x³","2x⁶−6x⁴+7x³","2x⁵−6x³+7x","2x⁵+6x⁴+7x³"],["Multiplicamos x³ por cada término y sumamos los exponentes de x."],"x³·2x²=2x⁵"),
      q("algebra","EAR","9(a)","apprentice","factorización","factor-comun","common-factor-variable-mixed-terms","Saca factor común en 2x²+4ax+5x³+x.",["x(2x+4a+5x²+1)","x²(2+4a+5x+1)","x(2x+4ax+5x²+1)","2x(x+2a+5x²+1)"],["Todos los términos contienen x.","Dividimos cada término entre x: 2x, 4a, 5x² y 1."],"al distribuir x se recupera el polinomio"),
      q("algebra","EAR","13","apprentice","identidades notables","reconocer-trinomio","detect-not-perfect-square-trinomial","¿Es x²+10x−25 el cuadrado de un binomio?",["No; (x+5)² sería x²+10x+25","Sí; es (x+5)²","Sí; es (x−5)²","No; ningún trinomio puede ser un cuadrado"],["Comparamos con (x+5)²=x²+10x+25.","El término independiente del polinomio dado es −25, no +25."],"al desarrollar la opción correcta no aparece −25"),
      q("algebra","EAR","14","apprentice","identidades notables","cuadrado-de-suma","expand-square-sum-integer","Desarrolla (x+6)².",["x²+12x+36","x²+36","x²+6x+36","x²−12x+36"],["Aplicamos (a+b)²=a²+2ab+b².","x²+2·x·6+6²=x²+12x+36."],"el término central es el doble producto"),
      q("algebra","EAR","18(a)","apprentice","identidades notables","reconocer-cuadrado","factor-perfect-square-two-variables","Factoriza g²+2gh+h².",["(g+h)²","(g−h)²","g(g+2h)+h","(g+h)(g−h)"],["Reconocemos a²+2ab+b² con a=g y b=h."],"(g+h)²=g²+2gh+h²"),
      q("algebra","EAR","24(a)","apprentice","factorización","factor-comun","common-factor-number-two-terms","Saca factor común en 2a+2b.",["2(a+b)","2ab","4(a+b)","a(2+2b)"],["El factor numérico común es 2.","Al dividir cada sumando por 2 quedan a y b."],"2(a+b)=2a+2b"),
      q("algebra","EAII","Ficha 6, 1(a)","apprentice","valor numérico","evaluar-polinomio","substitute-one-in-polynomial","Si P(x)=x²+1, calcula P(1).",["2","1","0","3"],["Sustituimos x por 1: P(1)=1²+1=2."],"1²+1=2"),
      q("algebra","EAII","Ficha 6, 2(a)","apprentice","monomios","reducir-terminos-semejantes","combine-four-like-linear-terms","Reduce 2x−5x+7x+x.",["5x","4x","15x","5x²"],["Sumamos los coeficientes: 2−5+7+1=5."],"todos los términos tienen la misma parte literal x"),
      q("algebra","EAII","Ficha 6, 4(a)","master","polinomios","suma-de-polinomios","sum-three-polynomials","Sean P=2x³+5x²−x+3, Q=x³+4x²+2x−1 y R=3x³+4x²−6x+9. Calcula P+Q+R.",["6x³+13x²−5x+11","6x³+13x²−3x+11","5x³+13x²−5x+10","6x³+9x²−5x+11"],["Agrupamos términos del mismo grado.","Coeficientes: x³:2+1+3=6; x²:5+4+4=13; x:−1+2−6=−5; constantes:3−1+9=11."],"la suma de los términos independientes es 11"),
      q("algebra","EAII","Ficha 6, 6(a)","master","factorización","factor-comun-y-trinomio","extract-common-factor-then-factor-quadratic","Factoriza 4x²−6x+2x³ completamente.",["2x(x−1)(x+3)","2x(x²+2x−3)","2(x³+2x²−3x)","x(2x−3)(x+2)"],["Ordenamos y sacamos 2x: 2x(x²+2x−3).","Factorizamos x²+2x−3=(x−1)(x+3)."],"al desarrollar se obtiene 2x³+4x²−6x"),
      q("algebra","EAII","Ficha 6, 9(a)","apprentice","identidades notables","cuadrado-de-suma","expand-square-sum-two","Desarrolla (x+2)².",["x²+4x+4","x²+4","x²+2x+4","x²−4x+4"],["Aplicamos x²+2·x·2+2²."],"el término central es 4x"),
      q("algebra","EAII","Repaso 6(a)","apprentice","identidades notables","factorizar-cuadrado-perfecto","factor-perfect-square-minus","Factoriza x²−8x+16.",["(x−4)²","(x+4)²","(x−8)(x+2)","x(x−8)+16"],["Es a²−2ab+b² con a=x y b=4."],"(x−4)²=x²−8x+16"),
      q("algebra","EAI","1","apprentice","lenguaje algebraico","traducir-expresion","triple-of-number","Expresa algebraicamente «el triple de un número x».",["3x","x+3","x³","3+x"],["Multiplicar el número x por tres se escribe 3x."],"si x=2, el triple es 6"),
      q("algebra","EAI","2","apprentice","monomios","identificar-elementos","coefficient-literal-degree-monomial","En el monomio 8a, indica coeficiente, parte literal y grado.",["Coeficiente 8; parte literal a; grado 1","Coeficiente a; parte literal 8; grado 1","Coeficiente 8; parte literal a; grado 8","Coeficiente 1; parte literal 8a; grado 2"],["El número que multiplica es 8.","La variable es a y su exponente implícito es 1."],"8a=8·a¹"),
      q("algebra","EAI","10","apprentice","polinomios","grado-y-termino-independiente","identify-degree-and-constant-term","En P(x)=−2x³+3x−5, indica el grado y el término independiente.",["Grado 3 y término independiente −5","Grado 2 y término independiente 5","Grado 3 y término independiente 3","Grado −2 y término independiente −5"],["El mayor exponente de x es 3.","El término sin x es −5."],"−2x³ determina el grado"),
      q("algebra","EAI","12(a)","apprentice","identidades notables","cuadrado-de-suma","expand-square-sum-scaled-variable","Desarrolla (2x+4)².",["4x²+16x+16","4x²+16","2x²+16x+16","4x²+8x+16"],["Aplicamos a²+2ab+b² con a=2x y b=4.","(2x)²+2·2x·4+4²=4x²+16x+16."],"el término central es 16x"),
      q("algebra","EAI","16","apprentice","polinomios","grado-de-producto","degree-product-polynomials","Un polinomio de grado 2 se multiplica por otro de grado 4 y sus coeficientes principales no son cero. ¿Cuál es el grado del producto?",["6","8","4","2"],["El grado de un producto no nulo es la suma de los grados: 2+4=6."],"los términos principales se multiplican"),
      q("algebra","EAI","19","master","polinomios","producto-de-polinomios","binomial-times-trinomial","Desarrolla (3x−2)(2x²+1).",["6x³−4x²+3x−2","6x³+4x²+3x−2","6x³−4x²+x−2","5x³−4x²+3x−2"],["Distribuimos 3x y después −2 sobre el segundo paréntesis.","Sumamos: 6x³+3x−4x²−2."],"ordenado queda 6x³−4x²+3x−2"),
      q("algebra","EAI","20","master","polinomios","division-de-polinomios","find-remainder-from-division-data","Al dividir P(x)=9x³−9x²−10x−4 entre 3x²+2x, el cociente es 3x−5. ¿Cuál es el resto?",["−4","4","−10x−4","−6x−4"],["Usamos P=divisor·cociente+resto.","(3x²+2x)(3x−5)=9x³−9x²−10x.","Restamos a P y queda −4."],"divisor·cociente−4=P"),
      q("algebra","EAI","26","apprentice","identidades notables","corregir-error","correct-square-binomial-error","Corrige el desarrollo de (x+3)².",["x²+6x+9","x²+9","x²+3x+9","x²−6x+9"],["Aplicamos x²+2·x·3+3²."],"el doble producto es 6x"),
      q("algebra","EAI","32","master","polinomios","parametro-por-valor-numerico","find-parameter-from-polynomial-value","Sea P(x)=2x⁵−4x⁴+3x²−(m+5)x+18. Si P(3)=60, calcula m.",["44","−44","39","49"],["Sustituimos x=3: 486−324+27−3(m+5)+18=60.","Simplificamos: 192−3m=60.","−3m=−132, luego m=44."],"P(3)=60 al sustituir m=44"),
      q("algebra","EAI","45(a)","master","teorema del factor","condicion-de-divisibilidad","factor-theorem-divisibility-condition","Si la división P(x):(x−2) es exacta, ¿qué igualdad debe cumplirse?",["P(2)=0","P(−2)=0","P(0)=2","P(2)=2"],["Por el teorema del factor, x−a divide exactamente a P si y solo si P(a)=0.","Aquí a=2."],"el resto de dividir entre x−2 es P(2)")
    ]
  };

  const ownBuild = (courseId, theme, level) => (banks[`${courseId}::${clean(theme)}`] || [])
    .filter((item) => item.challengeLevel === level).map((item) => ({ ...item }));
  window.MargaritaEso3ApprovedABPractice = Object.freeze({
    build: ownBuild,
    buildTopicPractice: ownBuild,
    buildChallenge: ownBuild,
    buildAdventure: ownBuild,
    buildExam(courseId, theme) {
      return (banks[`${courseId}::${clean(theme)}`] || [])
        .filter((item) => item.examEligible === true)
        .map((item) => ({ ...item }));
    },
    buildExamByBlocks(courseId, theme) {
      return (banks[`${courseId}::${clean(theme)}`] || [])
        .filter((item) => item.examByBlocksEligible === true)
        .map((item) => ({ ...item }));
    },
    all(courseId, theme) { return (banks[`${courseId}::${clean(theme)}`] || []).map((item) => ({ ...item })); },
    count: Object.values(banks).reduce((sum, items) => sum + items.length, 0)
  });
})();

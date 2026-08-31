(function () {
  "use strict";

  const q = (rawBaseId, source, text, options, solution, statementHtml = "") => ({
    rawBaseId,
    source,
    sourceKind: "exam",
    difficulty: "hard",
    text,
    ...(statementHtml ? { statementHtml } : {}),
    options,
    correct: 0,
    solution
  });

  const algebraSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 6 Ecuaciones/Simulacro 6-1 ESO A-B.pdf";
  const integersSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 3 Nº Enteros/Examen UNID 3 Nº Enteros.pdf";
  const proportionSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 7 Proporcionalidad/examen und 7 proporcinalidad.pdf";
  const fractionsSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 4 Fracciones/examen und 4-1ESO A.pdf";
  const areaSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 10 y 11 Circunferencia y Áreas y Perimetros/examen und 10 y 11 Circunferencia y Areas.pdf";
  const centersSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 8 y 9 rectas ángulso Polígonos/examen und 8,9 Rectas ángulos Polígonos.pdf";
  const romanExamSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 1/Examen Und 1.pdf";
  const romanMockSource = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 1/SIMULACRO UNID 1.pdf";

  const figure = (label, svg) => `<figure class="geometry-question-figure" role="img" aria-label="${label}">${svg}<figcaption>${label}</figcaption></figure>`;
  const barFigure = (filled) => figure(
    `Barra dividida en cinco partes iguales, con ${filled} partes coloreadas`,
    `<svg viewBox="0 0 260 48" width="100%" style="max-width:360px" aria-hidden="true"><g stroke="#243047" stroke-width="2">${Array.from({ length: 5 }, (_, index) => `<rect x="${5 + index * 50}" y="5" width="50" height="34" fill="${index < filled ? "#8296b5" : "#fff"}"/>`).join("")}</g></svg>`
  );

  const banks = {
    "1eso::expresiones algebraicas": [
      q(
        "1eso-expresiones-algebraicas-e1bdd1fb83bc",
        algebraSource,
        "1. Ejercicio (1 punto): Completa la tabla indicando coeficiente, parte literal y grado de los monomios −xy²b, (ax³)/3, −3⁴bzx y −8x.",
        [
          "(−1, xy²b, 4); (1/3, ax³, 4); (−81, bzx, 3); (−8, x, 1)",
          "(−1, xy²b, 3); (1/3, ax³, 3); (−3, bzx, 7); (−8, x, 0)",
          "(1, xy²b, 4); (3, ax³, 4); (81, bzx, 3); (8, x, 1)",
          "(−1, xy²b, 4); (a/3, x³, 3); (−81b, zx, 2); (−8x, sin parte literal, 0)"
        ],
        "Resolución:\n1. El coeficiente es el factor numérico, la parte literal reúne las letras y el grado es la suma de sus exponentes.\n2. En −xy²b, el coeficiente es −1 y el grado es 1+2+1=4.\n3. (ax³)/3=(1/3)ax³ tiene coeficiente 1/3 y grado 1+3=4.\n4. −3⁴bzx=−81bzx tiene coeficiente −81 y grado 1+1+1=3.\n5. −8x tiene coeficiente −8 y grado 1.\nComprobación: al multiplicar cada coeficiente por su parte literal se recupera exactamente el monomio inicial.\nResultado final: (−1,xy²b,4), (1/3,ax³,4), (−81,bzx,3) y (−8,x,1)."
      ),
      q(
        "1eso-expresiones-algebraicas-a241d0787335",
        algebraSource,
        "3. Ejercicio (1,5 puntos): Calcula e indica el grado del monomio del resultado: a) −x³ − 5x³ + x.",
        [
          "−6x³+x; no es un monomio, sino un polinomio de grado 3",
          "−6x⁴; es un monomio de grado 4",
          "−5x³; es un monomio de grado 3",
          "−6x³; es un monomio de grado 3"
        ],
        "Resolución:\n1. Solo se pueden sumar los términos semejantes −x³ y −5x³.\n2. Sus coeficientes suman −1−5=−6, por lo que queda −6x³+x.\n3. El término x no es semejante a x³ y no puede reducirse con él. El resultado tiene dos términos: no es un monomio, sino un polinomio, cuyo grado es 3.\nComprobación: para x=2, la expresión original vale −8−40+2=−46 y la simplificada vale −6·8+2=−46.\nResultado final: −6x³+x, polinomio de grado 3."
      )
    ],

    "1eso::numeros enteros": [
      q(
        "1eso-numeros-enteros-59379849e9cb",
        integersSource,
        "2. Ejercicio (1 punto): Escribe los números que faltan en la igualdad: d) (⋆)^⋆ = −1.000.000.000. ¿Qué pareja de base y exponente completa correctamente la igualdad?",
        ["Base −10 y exponente 9", "Base 10 y exponente 9", "Base −10 y exponente 8", "Base −1000 y exponente 2"],
        "Resolución:\n1. 1.000.000.000 es 10⁹.\n2. Para que una potencia tenga resultado negativo, su base debe ser negativa y el exponente impar.\n3. Por ello (−10)⁹=−10⁹=−1.000.000.000.\nComprobación: (−10)⁹ tiene nueve factores negativos, así que su signo es negativo, y su valor absoluto es 1 seguido de nueve ceros.\nResultado final: base −10 y exponente 9."
      )
    ],

    "1eso::proporcionalidad": [
      q(
        "1eso-proporcionalidad-d21804e4df98-a",
        proportionSource,
        "5. Ejercicio (1,5 puntos), tabla 1: Completa la tabla, halla la constante e indica el tipo de proporcionalidad. Kg: 3, 5, 7, __, 10; €: 9, __, 21, 24, __.",
        [
          "Faltan 15 €, 8 kg y 30 €; proporcionalidad directa con constante 3 €/kg",
          "Faltan 12 €, 8 kg y 27 €; proporcionalidad directa con constante 4 kg/€",
          "Faltan 15 €, 9 kg y 30 €; proporcionalidad inversa con producto constante 27",
          "Faltan 18 €, 8 kg y 33 €; no existe proporcionalidad"
        ],
        "Resolución:\n1. Calculamos el cociente precio/peso en los pares completos: 9/3=3 y 21/7=3.\n2. La constante es 3 €/kg, luego se trata de proporcionalidad directa.\n3. Para 5 kg: 5·3=15 €. Para 24 €: 24/3=8 kg. Para 10 kg: 10·3=30 €.\nComprobación: todos los pares cumplen €/kg=3: 9/3=15/5=21/7=24/8=30/10=3.\nResultado final: 15 €, 8 kg y 30 €; proporcionalidad directa, k=3 €/kg."
      ),
      q(
        "1eso-proporcionalidad-d21804e4df98-b",
        proportionSource,
        "5. Ejercicio (1,5 puntos), tabla 2: Completa la tabla, halla la constante e indica el tipo de proporcionalidad. Nº de trabajadores: 2, 3, __, 6, 10; tiempo empleado: 30, __, 15, __, 6.",
        [
          "Faltan 20, 4 y 10; proporcionalidad inversa con producto constante 60",
          "Faltan 45, 4 y 90; proporcionalidad directa con cociente constante 15",
          "Faltan 20, 5 y 10; proporcionalidad inversa con producto constante 75",
          "Faltan 10, 4 y 20; proporcionalidad directa con constante 5"
        ],
        "Resolución:\n1. En los pares completos, trabajadores·tiempo es 2·30=60 y 10·6=60.\n2. La constante es el producto 60, por lo que la proporcionalidad es inversa.\n3. Con 3 trabajadores: 60/3=20. Para tardar 15 unidades de tiempo: 60/15=4 trabajadores. Con 6 trabajadores: 60/6=10.\nComprobación: 2·30=3·20=4·15=6·10=10·6=60.\nResultado final: 20, 4 y 10; proporcionalidad inversa, k=60."
      )
    ],

    "1eso::fracciones y numeros decimales": [
      q(
        "1eso-fracciones-aecbc33f4bd5-a",
        fractionsSource,
        "1. Ejercicio (0,5 puntos): Indica la fracción que representa la parte coloreada de la figura a).",
        ["17/5", "3/5", "15/5", "18/5"],
        "Resolución:\n1. Cada barra está dividida en 5 partes iguales.\n2. Hay 3 barras completas coloreadas, equivalentes a 3·5=15 quintos, y 2 quintos más.\n3. En total hay 15+2=17 partes coloreadas del tamaño de un quinto.\nComprobación: 17/5=3+2/5, exactamente las tres barras completas y dos partes de la cuarta.\nResultado final: 17/5.",
        `<p>1. Ejercicio (0,5 puntos): Indica la fracción que representa la parte coloreada de la figura a).</p><div style="display:grid;gap:4px">${barFigure(5)}${barFigure(5)}${barFigure(5)}${barFigure(2)}</div>`
      ),
      q(
        "1eso-fracciones-aecbc33f4bd5-b",
        fractionsSource,
        "1. Ejercicio (0,5 puntos): Indica la fracción que representa la parte coloreada de la figura b).",
        ["1/10", "1/8", "9/10", "1/5"],
        "Resolución:\n1. El círculo está dividido en 10 sectores iguales.\n2. Solo uno de esos sectores está coloreado.\nComprobación: partes coloreadas/partes totales=1/10.\nResultado final: 1/10.",
        `<p>1. Ejercicio (0,5 puntos): Indica la fracción que representa la parte coloreada de la figura b).</p>${figure("Círculo dividido en diez sectores iguales, con un sector coloreado", `<svg viewBox="0 0 180 180" width="180" aria-hidden="true"><path d="M90 90 L90 15 A75 75 0 0 1 134.08 29.32 Z" fill="#8296b5"/><circle cx="90" cy="90" r="75" fill="none" stroke="#243047" stroke-width="2"/>${Array.from({ length: 10 }, (_, index) => { const angle = (-90 + index * 36) * Math.PI / 180; return `<line x1="90" y1="90" x2="${90 + 75 * Math.cos(angle)}" y2="${90 + 75 * Math.sin(angle)}" stroke="#243047" stroke-width="2"/>`; }).join("")}</svg>`)}`
      ),
      q(
        "1eso-fracciones-aecbc33f4bd5-c",
        fractionsSource,
        "1. Ejercicio (0,5 puntos): Indica la fracción que representa la parte resaltada de la figura c).",
        ["5/6", "5/7", "1/6", "6/5"],
        "Resolución:\n1. El segmento completo está dividido por sus marcas en 6 intervalos iguales.\n2. De esos 6 intervalos, 5 aparecen resaltados.\nComprobación: partes resaltadas/partes totales=5/6.\nResultado final: 5/6.",
        `<p>1. Ejercicio (0,5 puntos): Indica la fracción que representa la parte resaltada de la figura c).</p>${figure("Segmento dividido en seis intervalos iguales, con cinco resaltados", `<svg viewBox="0 0 330 70" width="100%" style="max-width:440px" aria-hidden="true"><line x1="15" y1="35" x2="265" y2="35" stroke="#415c83" stroke-width="9"/><line x1="265" y1="35" x2="315" y2="35" stroke="#c8ced8" stroke-width="9"/>${Array.from({ length: 7 }, (_, index) => `<line x1="${15 + index * 50}" y1="22" x2="${15 + index * 50}" y2="48" stroke="#243047" stroke-width="2"/>`).join("")}</svg>`)}`
      ),
      q(
        "1eso-fracciones-aecbc33f4bd5-d",
        fractionsSource,
        "1. Ejercicio (0,5 puntos): Indica la fracción que representa la parte coloreada de la figura d).",
        ["12/8=3/2", "8/12=2/3", "4/8=1/2", "16/8=2"],
        "Resolución:\n1. Cada círculo está dividido en 8 sectores iguales.\n2. El primer círculo aporta 8 octavos coloreados y el segundo aporta 4 octavos.\n3. En total son 8/8+4/8=12/8, que se simplifica a 3/2.\nComprobación: 3/2=1+1/2, es decir, un círculo completo y medio círculo.\nResultado final: 12/8=3/2.",
        `<p>1. Ejercicio (0,5 puntos): Indica la fracción que representa la parte coloreada de la figura d).</p>${figure("Dos círculos divididos en ocho sectores: el primero completo y la mitad del segundo están coloreados", `<svg viewBox="0 0 370 180" width="100%" style="max-width:470px" aria-hidden="true"><circle cx="90" cy="90" r="72" fill="#8296b5"/><path d="M280 18 A72 72 0 0 1 280 162 L280 90 Z" fill="#8296b5"/><g fill="none" stroke="#243047" stroke-width="2"><circle cx="90" cy="90" r="72"/><circle cx="280" cy="90" r="72"/>${[0,45,90,135,180,225,270,315].map((degree) => { const a=degree*Math.PI/180; return `<line x1="90" y1="90" x2="${90+72*Math.cos(a)}" y2="${90+72*Math.sin(a)}"/><line x1="280" y1="90" x2="${280+72*Math.cos(a)}" y2="${90+72*Math.sin(a)}"/>`; }).join("")}</g></svg>`)}`
      )
    ],

    "1eso::medida, angulos, rectas y circunferencias": [
      q(
        "1eso-semejanza-pitagoras-y-areas-eddca7919518-a",
        areaSource,
        "2. Ejercicio (3 puntos): Calcula el área y el perímetro de la figura a), una circunferencia de radio 5 cm.",
        ["Área=25π cm² y perímetro=10π cm", "Área=10π cm² y perímetro=25π cm", "Área=100π cm² y perímetro=20π cm", "Área=5π cm² y perímetro=25π cm"],
        "Resolución:\n1. El radio es r=5 cm.\n2. Área: A=πr²=π·5²=25π cm².\n3. Perímetro o longitud de la circunferencia: L=2πr=2π·5=10π cm.\nComprobación: el área queda en cm² y el perímetro en cm; además, L²/(4π)=25π=A.\nResultado final: A=25π cm² y P=10π cm.",
        `<p>2. Ejercicio (3 puntos): Calcula el área y el perímetro de la figura a).</p>${figure("Circunferencia de radio 5 centímetros", `<svg viewBox="0 0 210 180" width="210" aria-hidden="true"><circle cx="95" cy="90" r="70" fill="none" stroke="#243047" stroke-width="3"/><line x1="95" y1="90" x2="165" y2="90" stroke="#415c83" stroke-width="3"/><circle cx="95" cy="90" r="3" fill="#243047"/><text x="116" y="80" font-size="17" fill="#243047">5 cm</text></svg>`)}`
      ),
      q(
        "1eso-medida-angulos-rectas-y-circunferencias-3be9c8d3f10e",
        centersSource,
        "4. Ejercicio (1,5 puntos): Indica dónde se encuentra el ortocentro y el baricentro del triángulo de la figura.",
        ["El ortocentro está fuera del triángulo y el baricentro está dentro", "Ambos están fuera del triángulo", "El ortocentro está dentro y el baricentro fuera", "Ambos están sobre el lado mayor"],
        "Resolución:\n1. La figura es un triángulo obtusángulo: uno de sus ángulos supera 90°.\n2. En un triángulo obtusángulo, las alturas se cortan fuera; por tanto, el ortocentro está fuera.\n3. El baricentro es la intersección de las medianas y siempre queda dentro de cualquier triángulo.\nComprobación: al prolongar las dos alturas correspondientes a los lados del ángulo obtuso, su intersección aparece en el exterior; las medianas, en cambio, atraviesan el interior.\nResultado final: ortocentro fuera y baricentro dentro.",
        `<p>4. Ejercicio (1,5 puntos): Indica dónde se encuentra el ortocentro y el baricentro del triángulo de la figura.</p>${figure("Triángulo escaleno obtusángulo", `<svg viewBox="0 0 350 220" width="100%" style="max-width:430px" aria-hidden="true"><polygon points="82,25 45,190 315,190" fill="#eef2f7" stroke="#243047" stroke-width="4"/><text x="59" y="211" font-size="15" fill="#243047">ángulo obtuso</text></svg>`)}`
      )
    ],

    "1eso::semejanza, pitagoras y areas": [
      q(
        "1eso-semejanza-pitagoras-y-areas-eddca7919518-b",
        areaSource,
        "2. Ejercicio (3 puntos): Calcula el área y el perímetro de la figura b), un hexágono regular de lado 6 cm y apotema 5,2 cm.",
        ["Área=93,6 cm² y perímetro=36 cm", "Área=187,2 cm² y perímetro=31,2 cm", "Área=62,4 cm² y perímetro=36 cm", "Área=93,6 cm² y perímetro=12 cm"],
        "Resolución:\n1. Un hexágono tiene 6 lados: P=6·6=36 cm.\n2. En un polígono regular, A=P·a/2.\n3. A=36·5,2/2=93,6 cm².\nComprobación: también puede dividirse en 6 triángulos de base 6 y altura 5,2: 6·(6·5,2/2)=93,6 cm².\nResultado final: A=93,6 cm² y P=36 cm.",
        `<p>2. Ejercicio (3 puntos): Calcula el área y el perímetro de la figura b).</p>${figure("Hexágono regular de lado 6 centímetros y apotema 5,2 centímetros", `<svg viewBox="0 0 280 230" width="280" aria-hidden="true"><polygon points="75,25 205,25 260,115 205,205 75,205 20,115" fill="#eef2f7" stroke="#243047" stroke-width="3"/><line x1="140" y1="115" x2="205" y2="115" stroke="#415c83" stroke-width="3"/><text x="155" y="104" font-size="16">5,2 cm</text><text x="108" y="220" font-size="16">6 cm</text></svg>`)}`
      ),
      q(
        "1eso-semejanza-pitagoras-y-areas-eddca7919518-c",
        areaSource,
        "2. Ejercicio (3 puntos): Calcula el área y el perímetro de la figura c), un triángulo equilátero de lado 8 cm y altura 7 cm.",
        ["Área=28 cm² y perímetro=24 cm", "Área=56 cm² y perímetro=24 cm", "Área=28 cm² y perímetro=15 cm", "Área=24 cm² y perímetro=28 cm"],
        "Resolución:\n1. Al ser equilátero, sus tres lados miden 8 cm: P=3·8=24 cm.\n2. A=b·h/2=8·7/2=28 cm².\nComprobación: dos copias del triángulo forman un paralelogramo de base 8 y altura 7, área 56 cm²; la mitad es 28 cm².\nResultado final: A=28 cm² y P=24 cm.",
        `<p>2. Ejercicio (3 puntos): Calcula el área y el perímetro de la figura c).</p>${figure("Triángulo equilátero de lado 8 centímetros y altura 7 centímetros", `<svg viewBox="0 0 300 230" width="300" aria-hidden="true"><polygon points="150,20 30,205 270,205" fill="#eef2f7" stroke="#243047" stroke-width="3"/><line x1="150" y1="20" x2="150" y2="205" stroke="#415c83" stroke-width="3" stroke-dasharray="7 5"/><text x="158" y="120" font-size="16">7 cm</text><text x="125" y="223" font-size="16">8 cm</text></svg>`)}`
      ),
      q(
        "1eso-semejanza-pitagoras-y-areas-a173a41ffaa8",
        areaSource,
        "3. Ejercicio (2 puntos): Calcula el área de la figura compuesta mostrada.",
        ["204 cm²", "150 cm²", "246 cm²", "300 cm²"],
        "Resolución:\n1. En el triángulo rectángulo de la derecha, el cateto común mide √(25²−20²)=√225=15 cm.\n2. En el triángulo rectángulo de la izquierda, el otro cateto mide √(15²−12²)=√81=9 cm.\n3. Área derecha: 20·15/2=150 cm². Área izquierda: 12·9/2=54 cm².\n4. Área total: 150+54=204 cm².\nComprobación: 15²+20²=25² y 9²+12²=15²; ambas ternas pitagóricas verifican las longitudes usadas.\nResultado final: 204 cm².",
        `<p>3. Ejercicio (2 puntos): Calcula el área de la figura siguiente.</p>${figure("Cuadrilátero dividido por una diagonal vertical en dos triángulos rectángulos; aparecen las medidas 12, 20 y 25 centímetros", `<svg viewBox="0 0 470 300" width="100%" style="max-width:560px" aria-hidden="true"><polygon points="180,30 55,210 180,260 430,260" fill="#eef2f7" stroke="#243047" stroke-width="4"/><line x1="180" y1="30" x2="180" y2="260" stroke="#415c83" stroke-width="3"/><path d="M180 242 h18 v18" fill="none" stroke="#243047" stroke-width="2"/><path d="M162 242 h18 v18" fill="none" stroke="#243047" stroke-width="2"/><text x="92" y="132" font-size="18">12 cm</text><text x="287" y="282" font-size="18">20 cm</text><text x="310" y="139" font-size="18">25 cm</text></svg>`)}`
      )
    ],

    "1eso::numeros naturales": [
      q(
        "1eso-numeros-naturales-828e0478495a",
        romanExamSource,
        "Ejercicio 5 (0,5 puntos): Escribe el número 5499 en numeración romana.",
        ["V̅CDXCIX", "V̅DXCIX", "I̅V̅CDXCIX", "MMMMMCDXCIX"],
        "Resolución:\n1. Usamos la convención escolar de la barra superior, que multiplica por 1000 el valor del símbolo: V̅=5000.\n2. 499=400+90+9=CD+XC+IX=CDXCIX.\n3. Por tanto, 5499=5000+499=V̅CDXCIX.\nComprobación: 5000+400+90+9=5499.\nResultado final: V̅CDXCIX."
      ),
      q(
        "1eso-numeros-naturales-771bf1cc7463",
        romanExamSource,
        "Ejercicio 5 (0,5 puntos): Escribe el número 4942 en numeración romana.",
        ["I̅V̅CMXLII", "I̅V̅CMLXII", "V̅CMXLII", "MMMMCMXLII"],
        "Resolución:\n1. Con la convención de barra superior, I̅V̅ representa 4000.\n2. 942=900+40+2=CM+XL+II=CMXLII.\n3. Así, 4942=4000+942=I̅V̅CMXLII.\nComprobación: 4000+900+40+2=4942.\nResultado final: I̅V̅CMXLII."
      ),
      q(
        "1eso-numeros-naturales-a1d0220d61c9",
        romanMockSource,
        "Ejercicio 5 (0,5 puntos): Escribe el número 9800 en numeración romana.",
        ["I̅X̅DCCC", "X̅DCCC", "I̅X̅CM", "V̅I̅I̅I̅DCCC"],
        "Resolución:\n1. Con una barra superior, I̅X̅ representa 9000.\n2. 800=DCCC.\n3. Por tanto, 9800=9000+800=I̅X̅DCCC.\nComprobación: 9000+500+100+100+100=9800.\nResultado final: I̅X̅DCCC."
      )
    ]
  };

  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = {
    build(courseId, theme) {
      return [
        ...(previous?.build?.(courseId, theme) || []),
        ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))
      ];
    },
    count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0)
  };
})();

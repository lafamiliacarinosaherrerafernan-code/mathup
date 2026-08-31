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
  const figure = (label, svg) => `<figure class="geometry-question-figure" role="img" aria-label="${label}">${svg}<figcaption>${label}</figcaption></figure>`;

  const functions2Source = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 8 Funciones/Examen und  8 funiones-2ESO A.pdf";
  const functions3Source = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 10 Funciones y gráficas/Examen 3 ESO und 10 Funciones y gráficas.pdf";
  const elementary3Source = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 11 Funciones Elementales/Examen 3 ESO und 11 Funciones elementales.pdf";
  const algebra3Source = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 3/Simulacro und 3.pdf";
  const geometry3Source = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 7 Relaciones geométricas/Examen 3 ESO und 7 Relaciones geométricas.pdf";
  const geometry3MockSource = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 7 Relaciones geométricas/Simulacro 3 ESO und 7 Relaciones geométricas.pdf";
  const functions4ASource = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 9-10/Simulacro REv I und 9-10.docx.pdf";
  const polynomials4BSource = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 3 Polinomios/Simulacro  und 3 4º ESO C.pdf";
  const equations4BSource = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 4 Ecuaciones/Simulacro und 4  4º ESO.pdf";

  const piecewiseSvg = (endY) => `<svg viewBox="0 0 520 430" width="100%" style="max-width:610px" aria-hidden="true"><g stroke="#c7ced8" stroke-width="1">${Array.from({length:23},(_,i)=>`<line x1="${40+i*20}" y1="20" x2="${40+i*20}" y2="410"/><line x1="30" y1="${20+i*18}" x2="490" y2="${20+i*18}"/>`).join("")}</g><g stroke="#243047" stroke-width="3"><line x1="260" y1="20" x2="260" y2="410"/><line x1="30" y1="200" x2="490" y2="200"/></g><path d="M40 70 C55 150 55 265 100 272 C145 278 145 182 200 182 C225 182 235 ${endY === -1 ? 204 : 246} 200 ${endY === -1 ? 218 : 254}" fill="none" stroke="#263d5a" stroke-width="5"/><line x1="200" y1="146" x2="400" y2="326" stroke="#263d5a" stroke-width="4"/><circle cx="200" cy="146" r="7" fill="#fff" stroke="#263d5a" stroke-width="3"/><circle cx="200" cy="${endY === -1 ? 218 : 254}" r="7" fill="#263d5a"/><circle cx="400" cy="326" r="7" fill="#263d5a"/><g font-size="17" fill="#243047"><text x="470" y="190">X</text><text x="269" y="35">Y</text></g></svg>`;

  const banks = {
    "2eso::funciones": [
      q(
        "2eso-funciones-c6d0cbb12ec2",
        functions2Source,
        "4. Ejercicio (1 punto): Estudia la continuidad y discontinuidad, los puntos de corte, el crecimiento o decrecimiento, máximos y mínimos, dominio y rango de la función representada.",
        [
          "Dominio (−∞,7], rango [−7,∞), salto en x=−3; cortes con OX en x≈−10, −6, −4 y 0, y con OY en (0,0); decrece hasta x=−8, crece hasta x=−5 y vuelve a decrecer por tramos; mínimo absoluto (7,−7), sin máximo absoluto",
          "Dominio [−10,7], rango [−4,3], continua; solo corta ambos ejes en (0,0); siempre decrece",
          "Dominio R, rango R, salto en x=0; máximo absoluto (−5,1) y mínimo absoluto (−8,−4)",
          "Dominio (−∞,3], rango [−7,3), salto en x=7; crece en todo su dominio"
        ],
        "Resolución:\n1. La rama izquierda continúa hacia la izquierda y llega al punto cerrado (−3,−1); la recta parte del punto abierto (−3,3) y termina en (7,−7). Por eso el dominio es (−∞,7].\n2. En x=−3 los límites laterales son distintos (−1 y 3): hay discontinuidad de salto.\n3. La rama curva baja hasta (−8,−4), sube hasta (−5,1) y vuelve a bajar hasta x=−3. La recta y=−x decrece para −3<x≤7.\n4. Los cortes leídos en la cuadrícula son aproximadamente (−10,0), (−6,0), (−4,0) y (0,0); este último es también el corte con OY.\n5. La recta aporta valores desde −7 hasta 3 sin incluir 3; la rama curva aporta desde −4 y no está acotada superiormente. El rango conjunto es [−7,∞).\n6. Hay un mínimo relativo en (−8,−4), un máximo relativo en (−5,1) y mínimo absoluto en (7,−7); no existe máximo absoluto.\nComprobación: el punto abierto en (−3,3) no se incluye, mientras el punto cerrado (−3,−1) fija f(−3).\nResultado final: corresponde a la primera descripción.",
        `<p>4. Ejercicio (1 punto): Estudia la continuidad y discontinuidad, los puntos de corte, el crecimiento o decrecimiento, máximos y mínimos, dominio y rango, de la siguiente función.</p>${figure("Función a trozos: rama curva hasta el punto cerrado menos tres coma menos uno y recta desde el punto abierto menos tres coma tres hasta siete coma menos siete", piecewiseSvg(-1))}`
      )
    ],

    "3eso::funciones": [
      q(
        "3eso-funciones-ab023f27a842",
        functions3Source,
        "1. Ejercicio (3 puntos): Estudia la continuidad y discontinuidad, los puntos de corte, el crecimiento o decrecimiento, máximos y mínimos, dominio, rango, simetría y periodicidad de la función representada.",
        [
          "Dominio (−∞,7], rango [−7,∞), salto en x=−3; cortes con OX en x≈−10, −6, −4 y 0; decrece, crece y vuelve a decrecer por los tramos indicados; no es simétrica ni periódica",
          "Dominio [−10,7], rango [−4,3], es continua, par y periódica de periodo 10",
          "Dominio R, rango R, es impar y solo tiene un mínimo en (−8,−4)",
          "Dominio (−∞,−3]∪[−3,7], rango [−4,3], discontinuidad evitable en x=0"
        ],
        "Resolución:\n1. La rama curva llega al punto cerrado (−3,−3); la recta comienza en el punto abierto (−3,3) y acaba en (7,−7). El dominio es (−∞,7].\n2. En x=−3 hay un salto, pues el valor lateral izquierdo es −3 y el derecho tiende a 3.\n3. Cortes con OX: aproximadamente (−10,0), (−6,0), (−4,0) y (0,0). Corte con OY: (0,0).\n4. Decrece en (−∞,−8), crece en (−8,−5), decrece en (−5,−3] y vuelve a decrecer en (−3,7].\n5. Presenta mínimo relativo en (−8,−4), máximo relativo en (−5,1) y mínimo absoluto en (7,−7); no tiene máximo absoluto.\n6. La unión de valores de las dos ramas da rango [−7,∞). La gráfica no es simétrica respecto del eje Y ni del origen, y no repite un patrón: no es periódica.\nComprobación: el círculo abierto (−3,3) no pertenece a la función y el cerrado (−3,−3) sí.\nResultado final: corresponde a la primera descripción.",
        `<p>1. Ejercicio (3 puntos): Estudia la continuidad y discontinuidad, los puntos de corte, el crecimiento o decrecimiento, máximos y mínimos, dominio, rango, simetría y periodicidad (y su periodo si lo tiene) de la siguiente función.</p>${figure("Función a trozos: rama curva hasta menos tres coma menos tres y recta desde un punto abierto en menos tres coma tres hasta siete coma menos siete", piecewiseSvg(-3))}`
      ),
      q(
        "3eso-funciones-cc82e5e96787",
        elementary3Source,
        "2. Ejercicio (1 punto): Encuentra la ecuación de la recta que representa la gráfica. Exprésala en su forma general. La recta pasa por los puntos marcados (−5,5) y (6,2).",
        ["3x+11y−40=0", "3x−11y+70=0", "11x+3y+40=0", "3x+11y+40=0"],
        "Resolución:\n1. Pendiente: m=(2−5)/(6−(−5))=−3/11.\n2. Usamos y=mx+n y el punto (−5,5): 5=(−3/11)(−5)+n, de donde n=40/11.\n3. Forma explícita: y=−3x/11+40/11. Multiplicando por 11 y pasando todo al primer miembro: 3x+11y−40=0.\nComprobación: con (−5,5), −15+55−40=0; con (6,2), 18+22−40=0.\nResultado final: 3x+11y−40=0.",
        `<p>2. Ejercicio (1 punto): Encuentra la ecuación de la recta que representa a la gráfica. Exprésala en su forma general.</p>${figure("Recta decreciente que pasa por los puntos menos cinco coma cinco y seis coma dos", `<svg viewBox="0 0 460 360" width="100%" style="max-width:550px" aria-hidden="true"><g stroke="#ccd2dc">${Array.from({length:21},(_,i)=>`<line x1="${30+i*20}" y1="20" x2="${30+i*20}" y2="340"/><line x1="30" y1="${20+i*16}" x2="430" y2="${20+i*16}"/>`).join("")}</g><g stroke="#243047" stroke-width="3"><line x1="230" y1="20" x2="230" y2="340"/><line x1="30" y1="180" x2="430" y2="180"/></g><line x1="70" y1="74" x2="390" y2="162" stroke="#263d5a" stroke-width="4"/><circle cx="130" cy="100" r="7" fill="#263d5a"/><circle cx="350" cy="148" r="7" fill="#263d5a"/></svg>`)}`
      )
    ],

    "3eso::expresiones algebraicas": [
      q(
        "3eso-expresiones-algebraicas-5919e8003311",
        algebra3Source,
        "1. Ejercicio (2 puntos): Realiza la operación y simplifica: a) √[(−3)⁻²+3/9] − (1/3)·2:(−4/3−1)+1.",
        ["41/21", "13/21", "5/3", "20/21"],
        "Resolución:\n1. (−3)⁻²=1/(−3)²=1/9; dentro de la raíz queda 1/9+3/9=4/9.\n2. √(4/9)=2/3.\n3. En el paréntesis, −4/3−1=−7/3.\n4. (1/3)·2:(−7/3)=(2/3)·(−3/7)=−2/7.\n5. La expresión completa es 2/3−(−2/7)+1=2/3+2/7+1=(14+6+21)/21=41/21.\nComprobación: 41/21≈1,95238, igual al valor decimal obtenido respetando la raíz, el producto y la división.\nResultado final: 41/21."
      )
    ],

    "3eso::cuerpos geometricos": [
      q(
        "3eso-cuerpos-geometricos-864fff330a0a",
        geometry3Source,
        "1. Ejercicio (2 puntos): Calcula los lados que faltan. En dos triángulos semejantes, el grande tiene base 27 cm, lado derecho 12 cm y lado inclinado b; el pequeño correspondiente tiene base 9 cm, lado derecho a y lado inclinado 8 cm.",
        ["a=4 cm y b=24 cm", "a=3 cm y b=16 cm", "a=6 cm y b=18 cm", "a=36 cm y b=8/3 cm"],
        "Resolución:\n1. La razón pequeño/grande es 9/27=1/3.\n2. Para los lados derechos: a/12=1/3, luego a=4 cm.\n3. Para los lados inclinados: 8/b=1/3, luego b=24 cm.\nComprobación: 9/27=4/12=8/24=1/3.\nResultado final: a=4 cm y b=24 cm.",
        `<p>1. Ejercicio (2 puntos): Calcula los lados que faltan.</p>${figure("Triángulo grande y triángulo semejante interior con bases 27 y 9, lados derechos 12 y a, y lados inclinados b y 8 centímetros", `<svg viewBox="0 0 500 250" width="100%" style="max-width:590px" aria-hidden="true"><polygon points="35,210 430,210 385,35" fill="#eef2f7" stroke="#243047" stroke-width="4"/><polygon points="295,210 430,210 415,152" fill="#dce5f0" stroke="#415c83" stroke-width="4"/><g font-size="19"><text x="185" y="235">27 cm</text><text x="345" y="232">9 cm</text><text x="420" y="108">12 cm</text><text x="432" y="184">a</text><text x="190" y="112">b</text><text x="353" y="174">8 cm</text></g></svg>`)}`
      ),
      q(
        "3eso-cuerpos-geometricos-dfb6035001e2",
        geometry3Source,
        "2. Ejercicio (2 puntos): Pedro está a 2 m de un precipicio y ve alineado un pueblo con el borde del precipicio. ¿A qué distancia está el pueblo del precipicio? Sus ojos están a 1,6 m sobre el borde y el precipicio mide 450 m.",
        ["562,5 m", "360 m", "225 m", "900 m"],
        "Resolución:\n1. La línea de visión forma dos triángulos rectángulos semejantes.\n2. En el pequeño, la caída vertical es 1,6 m y la distancia horizontal 2 m. En el grande, la caída es 450 m y la distancia buscada x.\n3. 1,6/2=450/x. Por productos cruzados, 1,6x=900 y x=562,5 m.\nComprobación: 1,6/2=0,8 y 450/562,5=0,8.\nResultado final: 562,5 m.",
        `<p>2. Ejercicio (2 puntos): Pedro está a 2 m de un precipicio y ve alineado un pueblo con el borde del precipicio. ¿A qué distancia está el pueblo del precipicio?</p>${figure("Línea de visión desde una altura de 1,6 metros, a dos metros del borde de un precipicio de 450 metros, hasta un pueblo", `<svg viewBox="0 0 560 300" width="100%" style="max-width:650px" aria-hidden="true"><path d="M40 65 H180 V245 H520" fill="none" stroke="#6a513b" stroke-width="8"/><line x1="40" y1="25" x2="520" y2="245" stroke="#263d5a" stroke-width="4"/><g font-size="19"><text x="55" y="55">1,6 m</text><text x="100" y="88">2 m</text><text x="190" y="170">450 m</text><text x="330" y="270">x</text></g></svg>`)}`
      ),
      q(
        "3eso-cuerpos-geometricos-d1993985e79d",
        geometry3MockSource,
        "3. Ejercicio (1,5 puntos): Un triángulo tiene lados que miden 6 cm, 8 cm y 10 cm. En otro triángulo semejante al primero, el lado que corresponde al de 3 cm mide 9 cm. Halla: a) Los otros lados del segundo triángulo.",
        ["No puede determinarse: el primer triángulo no tiene ningún lado de 3 cm", "18 cm, 24 cm y 30 cm", "12 cm, 16 cm y 20 cm", "6 cm, 8 cm y 9 cm"],
        "Resolución:\n1. Para hallar los lados de un triángulo semejante necesitamos una pareja de lados correspondientes que fije la razón de semejanza.\n2. El primer triángulo declarado tiene lados 6, 8 y 10 cm.\n3. El enunciado afirma después que un lado del segundo corresponde a «el de 3 cm», pero ese lado no existe entre 6, 8 y 10.\n4. No sabemos si los 9 cm corresponden al lado 6, al 8 o al 10; cada elección produce una razón distinta.\nComprobación: las razones posibles serían 9/6, 9/8 o 9/10, y generan ternas diferentes.\nResultado final: los datos del original son incompatibles y no determinan una respuesta única."
      ),
      q(
        "3eso-cuerpos-geometricos-bdbce5be93a3",
        geometry3MockSource,
        "3. Ejercicio (1,5 puntos): Un triángulo tiene lados que miden 6 cm, 8 cm y 10 cm. En otro triángulo semejante al primero, el lado que corresponde al de 3 cm mide 9 cm. Halla: b) La razón de los perímetros y de las áreas.",
        ["No puede determinarse: no existe un lado de 3 cm en el primer triángulo y falta la razón de semejanza", "Razón de perímetros 3 y de áreas 9", "Razón de perímetros 3/2 y de áreas 9/4", "Razón de perímetros 9/10 y de áreas 81/100"],
        "Resolución:\n1. La razón de los perímetros coincide con la razón de semejanza k; la razón de las áreas es k².\n2. El texto no permite calcular k porque el lado de referencia de 3 cm no pertenece al triángulo de lados 6, 8 y 10 cm.\n3. Si 9 correspondiera a 6, 8 o 10, k sería respectivamente 3/2, 9/8 o 9/10; también cambiaría k².\nComprobación: se obtienen tres parejas distintas, por lo que ninguna puede seleccionarse sin alterar el enunciado.\nResultado final: las razones no pueden determinarse con los datos escritos."
      )
    ],

    "4eso-a::funciones": [
      q(
        "4eso-a-areas-y-cuerpos-geometricos-815bbacd4626",
        functions4ASource,
        "7. Ejercicio: Indica dominio, recorrido, monotonía, máximos y mínimos y puntos de corte de la función representada.",
        [
          "Dominio [−9,9], recorrido [−3,5]; crece en [−9,−6], (−2,0] y (2,6], y decrece en [−6,−2], [0,2) y [6,9]; máximo absoluto (0,5), mínimos absolutos (−9,−3) y (9,−3)",
          "Dominio R, recorrido R; función siempre creciente y sin extremos",
          "Dominio [−6,6], recorrido [−1,3]; máximo absoluto en (0,3) y mínimo en (0,−1)",
          "Dominio [−9,9] salvo −2 y 2; recorrido [−3,3]; es decreciente en todo el dominio"
        ],
        "Resolución:\n1. Los extremos cerrados están en x=−9 y x=9. En x=−2 y x=2 hay círculos abiertos en y=−1, pero también puntos cerrados en y=0; por ello ambos valores pertenecen al dominio. Dominio: [−9,9].\n2. El menor valor es −3 en los extremos y el mayor es 5 en el vértice central: recorrido [−3,5].\n3. Crece de −9 a −6, decrece de −6 a −2; crece de −2 a 0, decrece de 0 a 2; crece de 2 a 6 y decrece de 6 a 9.\n4. Máximos relativos: (−6,3), (0,5) y (6,3); el de (0,5) es absoluto. Mínimos absolutos: (−9,−3) y (9,−3).\n5. Corte con OY: (0,5). Cortes con OX: (−8,0), (−4,0), los puntos cerrados (−2,0) y (2,0), dos cruces centrales aproximados x≈±1,83 y (4,0), (8,0).\nComprobación: los puntos abiertos en (±2,−1) no se cuentan, pero los cerrados en (±2,0) sí.\nResultado final: corresponde a la primera descripción.",
        `<p>7. Ejercicio: Indica dominio, recorrido, monotonía, máximos y mínimos y puntos de corte.</p>${figure("Tres arcos parabólicos con dominio de menos nueve a nueve, puntos abiertos en menos dos coma menos uno y dos coma menos uno, y puntos cerrados en menos dos coma cero y dos coma cero", `<svg viewBox="0 0 620 360" width="100%" style="max-width:720px" aria-hidden="true"><g stroke="#cbd1da">${Array.from({length:21},(_,i)=>`<line x1="${50+i*26}" y1="20" x2="${50+i*26}" y2="340"/><line x1="40" y1="${20+i*16}" x2="580" y2="${20+i*16}"/>`).join("")}</g><g stroke="#243047" stroke-width="3"><line x1="310" y1="20" x2="310" y2="340"/><line x1="40" y1="180" x2="580" y2="180"/></g><path d="M76 228 Q154 84 258 180" fill="none" stroke="#263d5a" stroke-width="5"/><path d="M258 196 Q310 20 362 196" fill="none" stroke="#263d5a" stroke-width="5"/><path d="M362 196 Q466 84 544 228" fill="none" stroke="#263d5a" stroke-width="5"/><g stroke="#263d5a" stroke-width="3"><circle cx="258" cy="196" r="7" fill="#fff"/><circle cx="362" cy="196" r="7" fill="#fff"/></g><g fill="#263d5a"><circle cx="76" cy="228" r="7"/><circle cx="258" cy="180" r="7"/><circle cx="362" cy="180" r="7"/><circle cx="544" cy="228" r="7"/></g></svg>`)}`
      )
    ],

    "4eso-b::expresiones algebraicas": [
      q(
        "4eso-b-expresiones-algebraicas-04c5fa02f596",
        polynomials4BSource,
        "5. Ejercicio: Escribe en forma de polinomio en una variable: c) El cuadrado de dos números consecutivos.",
        ["El texto es ambiguo y no determina un único polinomio sin indicar qué se eleva al cuadrado", "x²+(x+1)²=2x²+2x+1", "[x+(x+1)]²=4x²+4x+1", "[x(x+1)]²=x⁴+2x³+x²"],
        "Resolución:\n1. Dos números consecutivos pueden representarse por x y x+1.\n2. La frase «el cuadrado de dos números consecutivos» no especifica si pide la suma de sus cuadrados, el cuadrado de su suma o el cuadrado de su producto.\n3. Esas tres lecturas producen, respectivamente, 2x²+2x+1; 4x²+4x+1; y x⁴+2x³+x².\nComprobación: para x=1 se obtienen 5, 9 y 4, valores distintos a partir del mismo texto.\nResultado final: el enunciado original necesita precisar la operación; no existe un único polinomio determinado."
      )
    ],

    "4eso-b::ecuaciones y sistemas de ecuaciones": [
      q(
        "4eso-b-ecuaciones-y-sistemas-de-ecuaciones-1321332a3014",
        equations4BSource,
        "1. Ejercicio: Resuelve la ecuación b) (x+3)/(x+1)+(3x−7)/(x²−1)−1/(x−4)=(15−4x)/(x³−4x²−x+4).",
        ["x≈−5,540129; x≈1,043731; x≈4,496398", "x=−1, 1 y 4", "x=−2, 1 y 13", "x≈−4,496398; x≈−1,043731; x≈5,540129"],
        "Resolución:\n1. Restricciones: x≠−1, x≠1 y x≠4. Además, x³−4x²−x+4=(x−4)(x²−1).\n2. Multiplicamos por (x−4)(x²−1): (x+3)(x−1)(x−4)+(3x−7)(x−4)−(x²−1)=15−4x.\n3. Al desarrollar y reducir queda x³−26x+26=0.\n4. El polinomio no tiene raíces racionales entre los divisores enteros de 26. Resolviéndolo numéricamente se obtienen x≈−5,5401291827, x≈1,0437313445 y x≈4,4963978382.\n5. Ninguna coincide con −1, 1 o 4, así que las tres son admisibles.\nComprobación: al sustituirlas en x³−26x+26, el residuo es menor que 10⁻⁹; las expresiones racionales están definidas en las tres.\nResultado final: x≈−5,540129; 1,043731; 4,496398."
      )
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

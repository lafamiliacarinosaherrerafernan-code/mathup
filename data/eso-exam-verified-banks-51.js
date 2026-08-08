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

  const similaritySource = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 10 Semejanza/Examen und  10 Semejanza.pdf";
  const solidsSource = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 11 Cuerpos geométricos/Examen und  11 Cuerpos geométricos B.pdf";
  const fractionsSource = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 3 y 4/Examen unida 3 4.pdf";
  const functionsSource = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 8 Funciones/Examen und  8 funiones-2ESO B.pdf";
  const pythagorasASource = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 9 Medidas Teorema de Pitágoras/Examen und  9 Medida Pitagoras-2ESO A.pdf";
  const pythagorasBSource = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 9 Medidas Teorema de Pitágoras/Examen und  9 Medida Pitagoras-2ESO B.pdf";

  const banks = {
    "2eso::figuras planas": [
      q(
        "2eso-figuras-planas-93c9b2ef26b2-a",
        similaritySource,
        "1. Ejercicio (2 puntos): Calcula los datos que faltan en la figura a). Los segmentos paralelos determinan, sobre dos transversales, longitudes correspondientes 25 cm y 20 cm; a−2 y 8 cm; b−3 y 32 cm.",
        ["a=12 y b=43", "a=10 y b=40", "a=8,4 y b=28,6", "a=27 y b=35"],
        "Resolución:\n1. Por el teorema de Tales, los segmentos correspondientes son proporcionales.\n2. La razón entre la transversal inclinada y la vertical es 25/20=5/4.\n3. (a−2)/8=5/4, luego a−2=10 y a=12.\n4. (b−3)/32=5/4, luego b−3=40 y b=43.\nComprobación: 25/20=10/8=40/32=5/4.\nResultado final: a=12 y b=43.",
        `<p>1. Ejercicio (2 puntos): Calcula los datos que faltan en la figura a).</p>${figure("Cuatro rectas paralelas cortadas por dos transversales; los tramos correspondientes son 25 y 20, a menos 2 y 8, b menos 3 y 32 centímetros", `<svg viewBox="0 0 430 310" width="100%" style="max-width:520px" aria-hidden="true"><line x1="80" y1="280" x2="235" y2="25" stroke="#243047" stroke-width="4"/><line x1="325" y1="280" x2="325" y2="25" stroke="#243047" stroke-width="4"/><g stroke="#415c83" stroke-width="4"><line x1="213" y1="60" x2="325" y2="60"/><line x1="180" y1="115" x2="325" y2="115"/><line x1="165" y1="140" x2="325" y2="140"/><line x1="95" y1="255" x2="325" y2="255"/></g><g font-size="18" fill="#243047"><text x="130" y="79">25 cm</text><text x="335" y="90">20 cm</text><text x="123" y="127">a−2</text><text x="335" y="135">8 cm</text><text x="78" y="205">b−3</text><text x="335" y="205">32 cm</text></g></svg>`)}`
      ),
      q(
        "2eso-figuras-planas-4797d66818cd",
        similaritySource,
        "2. Ejercicio (2 puntos): Aplica los teoremas de la altura y del cateto y halla las medidas desconocidas que separan los pueblos A, B y C. El triángulo ABC es rectángulo en A; la altura a la hipotenusa mide 12 y divide CB en los segmentos n y 9. Los catetos se indican con b y c.",
        ["n=16, b=20 y c=15", "n=9, b=15 y c=12", "n=16, b=25 y c=20", "n=7, b=√193 y c=15"],
        "Resolución:\n1. Teorema de la altura: h²=m·n. Así, 12²=9n y n=144/9=16.\n2. La hipotenusa completa mide 16+9=25.\n3. Teorema del cateto: b²=25·16=400, luego b=20; c²=25·9=225, luego c=15.\nComprobación: 15²+20²=225+400=625=25² y 12²=16·9.\nResultado final: n=16, b=20 y c=15.",
        `<p>2. Ejercicio (2 puntos): Aplica los teoremas de la altura y del cateto y halla las medidas desconocidas que separan los pueblos A, B y C.</p>${figure("Triángulo ABC rectángulo en A, con altura 12 a la hipotenusa; las proyecciones son n y 9", `<svg viewBox="0 0 480 250" width="100%" style="max-width:570px" aria-hidden="true"><polygon points="245,25 35,220 445,220" fill="#eef2f7" stroke="#243047" stroke-width="4"/><line x1="245" y1="25" x2="245" y2="220" stroke="#415c83" stroke-width="3" stroke-dasharray="8 5"/><path d="M245 42 l14 14 l-14 14" fill="none" stroke="#243047" stroke-width="2"/><g font-size="19" fill="#243047"><text x="246" y="20">A</text><text x="12" y="229">C</text><text x="450" y="229">B</text><text x="145" y="237">n</text><text x="338" y="237">9</text><text x="216" y="145">12</text><text x="120" y="112">b</text><text x="350" y="115">c</text></g></svg>`)}`
      ),
      q(
        "2eso-figuras-planas-7a9d224efde4",
        pythagorasASource,
        "4. Ejercicio (2 puntos): Una antena de teléfono está sujeta al suelo con dos cables de acero de igual longitud, tal como se describe en la figura. Si los anclajes están separados 8 metros y la antena mide 25 metros, ¿cuánto miden los dos cables? Con la misma longitud de los cables, ¿cuál sería la distancia que los separa si la altura de la antena fuera 40 metros?",
        ["Cada cable mide √641≈25,32 m; con 40 m de altura no existe una separación real posible", "Cada cable mide 33 m; con 40 m de altura los anclajes se separan 14 m", "Cada cable mide 29 m; con 40 m de altura los anclajes se separan 18 m", "Cada cable mide √689≈26,25 m; con 40 m de altura se separan 8 m"],
        "Resolución:\n1. Por simetría, la antena divide los 8 m entre anclajes en dos tramos de 4 m.\n2. Cada cable es la hipotenusa de un triángulo rectángulo: L=√(25²+4²)=√641≈25,32 m.\n3. Si la antena midiera 40 m y se conservara L, el semiancho d tendría que cumplir d²=L²−40²=641−1600=−959.\n4. Un cuadrado real no puede ser negativo: el segundo montaje es imposible con cables de esa longitud.\nComprobación: √641<40, de modo que el cable ni siquiera alcanza verticalmente la parte superior de una antena de 40 m.\nResultado final: √641≈25,32 m cada cable; la segunda situación no tiene solución real.",
        `<p>4. Ejercicio (2 puntos): Una antena de teléfono está sujeta al suelo con dos cables de acero de igual longitud tal como se describe en la figura. Si los anclajes están separados 8 metros y la antena mide 25 metros, ¿cuánto miden los dos cables? Con la misma longitud de los cables, ¿cuál sería la distancia que los separa si la altura de la antena fuera de 40 metros?</p>${figure("Antena vertical centrada entre dos anclajes separados ocho metros, unida a ambos por cables iguales", `<svg viewBox="0 0 430 300" width="100%" style="max-width:510px" aria-hidden="true"><line x1="55" y1="260" x2="375" y2="260" stroke="#a45b28" stroke-width="8"/><line x1="215" y1="260" x2="215" y2="40" stroke="#243047" stroke-width="8"/><line x1="55" y1="260" x2="215" y2="40" stroke="#415c83" stroke-width="4"/><line x1="375" y1="260" x2="215" y2="40" stroke="#415c83" stroke-width="4"/><text x="185" y="290" font-size="18">8 m</text><text x="224" y="150" font-size="18">25 m</text></svg>`)}`
      ),
      q(
        "2eso-figuras-planas-093d18d63994",
        pythagorasBSource,
        "1. Ejercicio (2 puntos): Peter ha comprado 13,5 metros de alambre. Llega a su casa y mide y le da una medida de 13,45 gramos. Calcula los errores absoluto y relativo que comete.",
        ["Error absoluto 0,05 m y error relativo 1/270≈0,003704, es decir, 0,3704 %", "Error absoluto 0,05 m y error relativo 0,05, es decir, 5 %", "Error absoluto 0,5 m y error relativo 1/27≈3,704 %", "Error absoluto 26,95 m y error relativo 199,63 %"],
        "Resolución:\n1. El original mezcla metros y gramos; para que la comparación tenga sentido, interpretamos 13,45 como una medición de longitud en metros.\n2. Error absoluto: |13,5−13,45|=0,05 m.\n3. Tomando 13,5 m como valor de referencia, error relativo=0,05/13,5=1/270≈0,003704.\n4. En porcentaje: 0,003704·100≈0,3704 %.\nComprobación: 13,45+0,05=13,50.\nResultado final: error absoluto 0,05 m; error relativo 1/270≈0,003704=0,3704 %."
      )
    ],

    "2eso::cuerpos geometricos": [
      q(
        "2eso-cuerpos-geometricos-2629e60c98e7-a",
        solidsSource,
        "2. Ejercicio (4 puntos): Calcula el área lateral, el área de la base y el volumen de la figura a), una pirámide regular pentagonal con lado de la base 10 cm, apotema de la base 8,5 cm y apotema de la pirámide 15 cm.",
        ["A_lateral=375 cm²; A_base=212,5 cm²; V≈875,44 cm³", "A_lateral=750 cm²; A_base=425 cm²; V=1062,5 cm³", "A_lateral=375 cm²; A_base=85 cm²; V=425 cm³", "A_lateral=212,5 cm²; A_base=375 cm²; V≈1544,90 cm³"],
        "Resolución:\n1. Perímetro de la base pentagonal: P=5·10=50 cm.\n2. Área lateral: A_L=P·15/2=375 cm².\n3. Área de la base: A_B=P·8,5/2=212,5 cm².\n4. La altura cumple h²+8,5²=15²; h=√152,75≈12,359 cm.\n5. Volumen: V=A_B·h/3=212,5·√152,75/3≈875,44 cm³.\nComprobación: √(12,359²+8,5²)≈15 y las unidades son cm² para áreas y cm³ para volumen.\nResultado final: 375 cm², 212,5 cm² y aproximadamente 875,44 cm³.",
        `<p>2. Ejercicio (4 puntos): Calcula el área lateral, área de las bases y el volumen de la figura a).</p>${figure("Pirámide regular pentagonal; lado de base 10 centímetros, apotema de base 8,5 y apotema lateral 15", `<svg viewBox="0 0 410 310" width="100%" style="max-width:500px" aria-hidden="true"><polygon points="205,25 70,235 155,285 310,260 340,190" fill="#eef2f7" stroke="#243047" stroke-width="3"/><g stroke="#415c83" stroke-width="2"><line x1="205" y1="25" x2="155" y2="285"/><line x1="205" y1="25" x2="310" y2="260"/><line x1="205" y1="25" x2="340" y2="190"/><line x1="205" y1="25" x2="205" y2="228" stroke-dasharray="7 5"/></g><g font-size="18"><text x="272" y="125">15 cm</text><text x="225" y="236">8,5 cm</text><text x="205" y="286">10 cm</text></g></svg>`)}`
      ),
      q(
        "2eso-cuerpos-geometricos-2629e60c98e7-b",
        solidsSource,
        "2. Ejercicio (4 puntos): Calcula el área lateral exterior, el área de la base circular común y el volumen de la figura b), formada por una semiesfera sobre un cono, ambos de radio 4 cm, siendo 10 cm la altura del cono.",
        ["A_lateral exterior=(32+8√29)π cm²; A_base común=16π cm²; V=96π cm³", "A_lateral exterior=(16+40)π cm²; A_base común=8π cm²; V=64π cm³", "A_lateral exterior=(32+4√29)π cm²; A_base común=32π cm²; V=160π/3 cm³", "A_lateral exterior=48π cm²; A_base común=16π cm²; V=288π cm³"],
        "Resolución:\n1. La generatriz del cono es g=√(10²+4²)=√116=2√29 cm.\n2. Área lateral del cono: πrg=π·4·2√29=8√29π cm².\n3. Área curva de la semiesfera: 2πr²=2π·16=32π cm². El área lateral exterior total es (32+8√29)π cm².\n4. El círculo común de unión tiene área πr²=16π cm²; no queda expuesto al exterior.\n5. Volumen: V_cono=π·4²·10/3=160π/3 y V_semiesfera=2π·4³/3=128π/3. Total=96π cm³.\nComprobación: 160π/3+128π/3=288π/3=96π.\nResultado final: A_L=(32+8√29)π cm², A_base común=16π cm² y V=96π cm³.",
        `<p>2. Ejercicio (4 puntos): Calcula el área lateral, área de las bases y el volumen de la figura b).</p>${figure("Semiesfera apoyada sobre un cono; radio común cuatro centímetros y altura del cono diez centímetros", `<svg viewBox="0 0 360 350" width="100%" style="max-width:430px" aria-hidden="true"><path d="M70 125 A110 105 0 0 1 290 125" fill="#eef2f7" stroke="#243047" stroke-width="4"/><ellipse cx="180" cy="125" rx="110" ry="28" fill="none" stroke="#243047" stroke-width="3" stroke-dasharray="8 5"/><line x1="70" y1="125" x2="180" y2="315" stroke="#243047" stroke-width="4"/><line x1="290" y1="125" x2="180" y2="315" stroke="#243047" stroke-width="4"/><line x1="180" y1="125" x2="290" y2="125" stroke="#415c83" stroke-width="3"/><text x="226" y="112" font-size="18">4 cm</text><text x="194" y="235" font-size="18">10 cm</text></svg>`)}`
      ),
      q(
        "2eso-cuerpos-geometricos-1596721ad77a",
        solidsSource,
        "3. Ejercicio (3 puntos): Se quiere construir 300 piscinas con forma cilíndrica de aluminio con un diámetro de 2,35 m y 1,5 m de alto. Si el metro cuadrado de aluminio cuesta 5,2 €, ¿cuánto dinero costará fabricar todas las piscinas?",
        ["7652,775π €≈24.041,90 €", "9806,55π €≈30.808,18 €", "4130,625π €≈12.976,74 €", "1471,6875π €≈4623,44 €"],
        "Resolución:\n1. Una piscina está abierta por arriba, por lo que necesita la pared lateral y una base. Radio: r=2,35/2=1,175 m; altura h=1,5 m.\n2. Superficie por piscina: A=2πrh+πr²=2π·1,175·1,5+π·1,175²=4,905625π m².\n3. Para 300 piscinas: 300·4,905625π=1471,6875π m².\n4. Coste: 1471,6875π·5,2=7652,775π €≈24.041,90 €.\nComprobación: las unidades se convierten en m² antes de aplicar 5,2 €/m². Si se cerrara también la parte superior —algo que no corresponde a una piscina— se obtendría otro coste.\nResultado final: 7652,775π €, aproximadamente 24.041,90 €."
      )
    ],

    "2eso::fracciones": [
      q(
        "2eso-fracciones-4c073ecb46fa",
        fractionsSource,
        "1. Ejercicio (4 puntos): Realiza la operación, teniendo en cuenta la jerarquía y simplificando al máximo: b) 3/5 : 2 − 2·(3/4)·[7/6 − (5/6)·(1/2 − 1)]².",
        ["−1661/480", "−1733/480", "−1661/240", "−343/480"],
        "Resolución:\n1. Paréntesis: 1/2−1=−1/2.\n2. Corchete: 7/6−(5/6)(−1/2)=7/6+5/12=14/12+5/12=19/12.\n3. Cuadrado: (19/12)²=361/144.\n4. Producto: 2·(3/4)·(361/144)=(3/2)(361/144)=361/96.\n5. División inicial: 3/5:2=3/10.\n6. Resta: 3/10−361/96=144/480−1805/480=−1661/480.\nComprobación: −1661/480≈−3,46042, igual al valor decimal de la expresión original. 1661 no comparte factores con 480.\nResultado final: −1661/480."
      )
    ],

    "2eso::funciones": [
      q(
        "2eso-funciones-3d5369dd390e",
        functionsSource,
        "3. Ejercicio (2 puntos): Halla la ecuación de la recta que pasa por los puntos A(−3, 2) y B(−2, −1).",
        ["y=−3x−7", "y=3x+11", "y=−x−1", "y=−3x+7"],
        "Resolución:\n1. Pendiente: m=(−1−2)/(−2−(−3))=−3/1=−3.\n2. En y=mx+n, sustituimos A: 2=−3(−3)+n=9+n, luego n=−7.\n3. La recta es y=−3x−7.\nComprobación: para x=−3 da y=9−7=2; para x=−2 da y=6−7=−1.\nResultado final: y=−3x−7."
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

(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 3 y 4/Simulacro und 3-4.pdf";
  const banks = {
    "2eso::potencias y raices cuadradas": [
      q("2eso-fracciones-34270995c60b", source, "1. Ejercicio (1 punto): Resuelve: c) 6⁴/6⁶.", ["1/36", "36", "6¹⁰", "1/6¹⁰"], "Resolución:\n1. 6⁴/6⁶=6⁴⁻⁶=6⁻².\n2. Con exponente positivo, 6⁻²=1/6².\n3. 1/6²=1/36.\nComprobación: 1296/46656=1/36.\nResultado final: 1/36."),
      q("2eso-fracciones-dfed77cd6e6c", source, "1. Ejercicio (1 punto): Resuelve: g) 2/2³.", ["1/4", "4", "1/8", "2⁴"], "Resolución:\n1. Escribimos 2 como 2¹.\n2. 2¹/2³=2¹⁻³=2⁻².\n3. 2⁻²=1/2²=1/4.\nComprobación: 2/8=1/4.\nResultado final: 1/4."),
      q("2eso-fracciones-f098804c1c93-e", source, "2. Ejercicio (1 punto): Expresa como una sola potencia positiva: e) (10⁴:100⁻²)/10⁴.", ["10⁴", "10⁸", "10⁻⁴", "10¹²"], "Resolución:\n1. 100⁻²=(10²)⁻²=10⁻⁴.\n2. El numerador es 10⁴:10⁻⁴=10⁸.\n3. 10⁸:10⁴=10⁴.\nComprobación: 10 000:0,0001:10 000=10 000.\nResultado final: 10⁴."),
      q("2eso-fracciones-f098804c1c93-i", source, "2. Ejercicio (1 punto): Expresa como una sola potencia positiva: i) [81⁻⁴:27⁻²·9]/(9⁻⁶)³.", ["3²⁸", "3⁸", "3⁻²⁸", "9¹⁰"], "Resolución:\n1. 81⁻⁴=3⁻¹⁶, 27⁻²=3⁻⁶ y 9=3².\n2. El numerador es 3⁻¹⁶:3⁻⁶·3²=3⁻⁸.\n3. El denominador es (9⁻⁶)³=(3⁻¹²)³=3⁻³⁶.\n4. 3⁻⁸:3⁻³⁶=3²⁸.\nComprobación: −8−(−36)=28.\nResultado final: 3²⁸."),
      q("2eso-fracciones-f098804c1c93-j", source, "2. Ejercicio (1 punto): Expresa como una sola potencia positiva: j) (25⁴·125:625)/5⁻⁴.", ["5¹¹", "5⁷", "5³", "5⁻¹¹"], "Resolución:\n1. 25⁴=5⁸, 125=5³ y 625=5⁴.\n2. El numerador es 5⁸·5³:5⁴=5⁷.\n3. 5⁷:5⁻⁴=5¹¹.\nComprobación: 7−(−4)=11.\nResultado final: 5¹¹.")
    ],
    "2eso::fracciones": [
      q("2eso-fracciones-727b0e23d665", source, "4. Ejercicio (1,5 puntos): Calcula: a) (3√625−10²+10⁵):√400.", ["19 995/4=4 998,75", "3 995/4=998,75", "4 995", "99 975"], "Resolución:\n1. √625=25, √400=20, 10²=100 y 10⁵=100 000.\n2. El numerador es 3·25−100+100 000=99 975.\n3. 99 975:20=19 995/4=4 998,75.\nComprobación: 4 998,75·20=99 975.\nResultado final: 19 995/4=4 998,75."),
      q("2eso-fracciones-5b5990179895", source, "5. Ejercicio (2 puntos): Inventa un problema con los siguientes datos: 1500 €, 15 % e IVA (21 %). Después resuélvelo. ¿Cuál es una resolución válida si se aplica primero un descuento del 15 % y después el IVA?", ["1 542,75 €", "1 815 €", "1 275 €", "1 500 €"], "Resolución:\n1. Un problema válido es: «Un artículo cuesta 1500 €, tiene un descuento del 15 % y después se aplica el 21 % de IVA. ¿Precio final?».\n2. Tras el descuento: 1500·0,85=1275 €.\n3. Con IVA: 1275·1,21=1542,75 €.\nComprobación: descuento 225 € e IVA 267,75 €; 1500−225+267,75=1542,75 €.\nResultado final: 1 542,75 €."),
      q("2eso-fracciones-8b4a7aed10f9-k", source, "1. Ejercicio (4 puntos): Realiza y simplifica: k) (4/3−3)²+7/12−17/18.", ["29/12", "−29/12", "87/12", "25/9"], "Resolución:\n1. 4/3−3=−5/3 y su cuadrado es 25/9.\n2. Con denominador 36: 25/9+7/12−17/18=100/36+21/36−34/36.\n3. El resultado es 87/36=29/12.\nComprobación: 29/12≈2,4167.\nResultado final: 29/12."),
      q("2eso-fracciones-8b4a7aed10f9-l", source, "1. Ejercicio (4 puntos): Realiza y simplifica: l) (−5/6−1/4):(7/9−1/4).", ["−39/19", "39/19", "−19/39", "−13/12"], "Resolución:\n1. −5/6−1/4=−10/12−3/12=−13/12.\n2. 7/9−1/4=28/36−9/36=19/36.\n3. (−13/12):(19/36)=−13/12·36/19=−39/19.\nComprobación: el primer paréntesis es negativo y el segundo positivo.\nResultado final: −39/19."),
      q("2eso-fracciones-8b4a7aed10f9-m", source, "1. Ejercicio (4 puntos): Realiza y simplifica: m) (4/5:3·2):(5/7:5/2).", ["28/15", "15/28", "−28/15", "8/15"], "Resolución:\n1. 4/5:3·2=4/15·2=8/15.\n2. 5/7:5/2=5/7·2/5=2/7.\n3. (8/15):(2/7)=8/15·7/2=28/15.\nComprobación: 28/15≈1,8667.\nResultado final: 28/15."),
      q("2eso-fracciones-8b4a7aed10f9-n", source, "1. Ejercicio (4 puntos): Realiza y simplifica: n) 3/5:2/7−2/5·3/4·[7/6−5/6·(1/2−1)]².", ["647/480", "1008/480", "361/480", "−647/480"], "Resolución:\n1. 3/5:2/7=21/10.\n2. 1/2−1=−1/2; por tanto, 7/6−5/6·(−1/2)=7/6+5/12=19/12.\n3. 2/5·3/4·(19/12)²=3/10·361/144=361/480.\n4. 21/10−361/480=1008/480−361/480=647/480.\nComprobación: 647 y 480 no tienen factores comunes.\nResultado final: 647/480.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

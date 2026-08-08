(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const eso3Exam = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 3/Examen und 3.pdf";
  const eso3Sim = "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 3/Simulacro und 3.pdf";
  const eso4aSys = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 5-6/Simulacro und 5-6.pdf";
  const eso4aGeo = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 7-8/examen und 7-8.pdf";
  const banks = {
    "3eso::numeros reales": [
      q("3eso-expresiones-algebraicas-88bffe64fc85", eso3Exam, "Recuperación. Realiza y simplifica: b) 2+[(1/2+2/5)⁻²]/[(3/4)²+2⁻⁴].", ["322/81", "160/81", "241/81", "81/322"], "Resolución:\n1. 1/2+2/5=9/10; elevado a −2 da (10/9)²=100/81.\n2. (3/4)²+2⁻⁴=9/16+1/16=10/16=5/8.\n3. (100/81):(5/8)=160/81.\n4. Sumamos 2=162/81 y obtenemos 322/81.\nComprobación: 322/81≈3,9753.\nResultado final: 322/81."),
      q("3eso-expresiones-algebraicas-0cfea3a469a9", eso3Sim, "Recuperación. Realiza y simplifica: b) 2:(2/5−1)⁻²:2−(−2/3)⁻¹.", ["93/50", "−93/50", "9/25", "3/2"], "Resolución:\n1. 2/5−1=−3/5 y (−3/5)⁻²=25/9.\n2. 2:(25/9):2=18/25:2=9/25.\n3. (−2/3)⁻¹=−3/2.\n4. 9/25−(−3/2)=18/50+75/50=93/50.\nComprobación: 93/50=1,86.\nResultado final: 93/50."),
      q("3eso-expresiones-algebraicas-d5968b22a2f7", eso3Sim, "Recuperación. Pasa a fracción generatriz y calcula: 0,416̅−0,09̅:3,15̅.", ["82/213", "5/12", "73/213", "59/426"], "Resolución:\n1. 0,416̅=5/12, 0,09̅=1/10 y 3,15̅=142/45.\n2. (1/10):(142/45)=1/10·45/142=9/284.\n3. 5/12−9/284=355/852−27/852=328/852=82/213.\nComprobación: 82/213≈0,38498.\nResultado final: 82/213.")
    ],
    "4eso-a::sistemas de ecuaciones e inecuaciones": [
      q("4eso-a-ecuaciones-e-inecuaciones-0700a2036207", eso4aSys, "3. Ejercicio: En un garaje hay 260 coches y motos y 920 ruedas. ¿Cuántos vehículos hay de cada tipo? Plantea y resuelve un sistema.", ["200 coches y 60 motos", "60 coches y 200 motos", "180 coches y 80 motos", "230 coches y 30 motos"], "Resolución:\n1. Sea c el número de coches y m el de motos. c+m=260.\n2. Las ruedas dan 4c+2m=920; dividiendo entre 2, 2c+m=460.\n3. Restamos la primera ecuación: c=200; entonces m=60.\nComprobación: 200+60=260 y 4·200+2·60=920.\nResultado final: 200 coches y 60 motos."),
      q("4eso-a-ecuaciones-e-inecuaciones-4419b2ee5edc", eso4aSys, "4. Ejercicio: El doble de la edad de Ana es el triple de la de su hermana. Hace cuatro años Ana tenía el doble que su hermana. ¿Qué edades tienen?", ["Ana 12 años y su hermana 8", "Ana 18 años y su hermana 12", "Ana 8 años y su hermana 4", "Ana 16 años y su hermana 12"], "Resolución:\n1. Sean A y H las edades actuales. 2A=3H.\n2. Hace cuatro años: A−4=2(H−4), es decir, A=2H−4.\n3. Sustituimos: 2(2H−4)=3H; H=8 y A=12.\nComprobación: 2·12=3·8 y hace cuatro años 8=2·4.\nResultado final: Ana 12 años y su hermana 8.")
    ],
    "4eso-a::areas y cuerpos geometricos": [
      q("4eso-a-cono-unidad-7-8-ejercicio-4-b", eso4aGeo, "4. Ejercicio: b) Calcula el volumen de un cono cuya generatriz mide 5 cm y cuya base tiene 3 cm de diámetro.", ["3π√91/8 cm³", "9π√91/8 cm³", "15π/4 cm³", "3π√91/4 cm³"], "Resolución:\n1. El radio es r=3/2 cm.\n2. Por Pitágoras, h=√(5²−(3/2)²)=√(91/4)=√91/2.\n3. V=(1/3)πr²h=(1/3)π·9/4·√91/2=3π√91/8.\nComprobación: V≈11,24 cm³.\nResultado final: 3π√91/8 cm³.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

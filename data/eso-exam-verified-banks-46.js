(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const source = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 7-8/examen und 7-8.pdf";
  const banks = {
    "4eso-a::areas y cuerpos geometricos": [
      q(
        "4eso-a-semejanza-y-trigonometria-3a2785953110-a",
        source,
        "4. Ejercicio: Responde: a) Calcula el área lateral del prisma recto de la figura. Su base es una figura escalonada formada por dos tramos horizontales consecutivos de 6 cm; las alturas exterior izquierda y derecha son 2 cm y 6 cm, respectivamente, y la longitud del prisma es 3 cm.",
        ["108 cm²", "144 cm²", "72 cm²", "96 cm²"],
        "Resolución:\n1. La base del prisma es el perfil escalonado. El desnivel interior mide 6−2=4 cm.\n2. Su perímetro es 12+6+6+4+6+2=36 cm: base total, lado derecho, tramo superior derecho, desnivel, tramo superior izquierdo y lado izquierdo.\n3. El área lateral de un prisma recto es el perímetro de la base por la longitud del prisma.\n4. Sustituimos: A_L=36·3=108 cm².\nComprobación: sumando las seis caras laterales se obtiene 12·3+6·3+6·3+4·3+6·3+2·3=108 cm².\nResultado final: 108 cm²."
      ),
      q(
        "4eso-a-semejanza-y-trigonometria-3a2785953110-b",
        source,
        "4. Ejercicio: Responde: b) Calcula el volumen de un cono cuya generatriz mide 5 cm y cuya base tiene un diámetro de 3 cm.",
        ["(3π√91)/8 cm³", "15π/4 cm³", "3π√91/4 cm³", "9π√91/8 cm³"],
        "Resolución:\n1. El radio de la base es la mitad del diámetro: r=3/2 cm.\n2. En la sección axial, radio, altura y generatriz forman un triángulo rectángulo. Por Pitágoras: h=√(5²−(3/2)²)=√(25−9/4)=√(91/4)=√91/2 cm.\n3. Aplicamos V=(1/3)πr²h: V=(1/3)π·(9/4)·(√91/2)=(3π√91)/8 cm³.\nComprobación: h≈4,770 cm y V≈11,24 cm³, valores coherentes con r=1,5 cm y g=5 cm.\nResultado final: (3π√91)/8 cm³."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

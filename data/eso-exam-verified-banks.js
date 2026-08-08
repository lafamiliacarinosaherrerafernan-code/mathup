(function () {
  "use strict";

  const banks = {
    "1eso::proporcionalidad": [
      {
        rawBaseId: "1eso-proporcionalidad-854be651eaf4",
        source: "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 7 Proporcionalidad/examen und 7 proporcinalidad.pdf",
        sourceKind: "exam",
        difficulty: "hard",
        text: "1. Ejercicio (1 punto): Un televisor cuesta 350 €. Si le hacen un descuento del 12 %, ¿cuánto dinero vale el televisor?",
        options: ["308 €", "338 €", "392 €", "42 €"],
        correct: 0,
        solution: "Resolución:\n1. En un descuento del 12 % permanece 100 %−12 %=88 %.\n2. Convertimos el porcentaje en factor: 88 %=frac{88}{100}=0,88.\n3. Aplicamos el factor al precio inicial: 350·0,88=308.\nComprobación: el descuento es 350·0,12=42 € y 350−42=308 €.\nResultado final: 308 €."
      },
      {
        rawBaseId: "1eso-proporcionalidad-84796e06a041",
        source: "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 7 Proporcionalidad/examen und 7 proporcinalidad.pdf",
        sourceKind: "exam",
        difficulty: "hard",
        text: "2. Ejercicio (1 punto): Una factura asciende a 78 € sin incluir el 21 % de IVA. ¿A cuánto ascenderá si se incluye el IVA?",
        options: ["94,38 €", "99 €", "81,78 €", "61,62 €"],
        correct: 0,
        solution: "Resolución:\n1. Al añadir un 21 % resulta 100 %+21 %=121 %.\n2. Convertimos el porcentaje en factor: 121 %=frac{121}{100}=1,21.\n3. Calculamos el precio final: 78·1,21=94,38.\nComprobación: el IVA es 78·0,21=16,38 € y 78+16,38=94,38 €.\nResultado final: 94,38 €."
      }
    ],
    "2eso::sistemas de ecuaciones": [
      {
        rawBaseId: "2eso-sistemas-de-ecuaciones-e4debcf15e83",
        source: "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 7 Sistemas/Simulacro und 7-2ESO.pdf",
        sourceKind: "exam",
        difficulty: "hard",
        text: "1. Ejercicio (3 puntos): Resuelve por sustitución el sistema: 2x+3y=1; 4x−y=−5.",
        options: ["x=−1, y=1", "x=1, y=−1", "x=−1, y=−1", "x=1, y=1"],
        correct: 0,
        solution: "Resolución:\n1. Despejamos y en la segunda ecuación: 4x−y=−5 ⇒ y=4x+5.\n2. Sustituimos en la primera: 2x+3(4x+5)=1.\n3. Resolvemos: 2x+12x+15=1 ⇒ 14x=−14 ⇒ x=−1.\n4. Sustituimos: y=4(−1)+5=1.\nComprobación: 2(−1)+3·1=1 y 4(−1)−1=−5.\nResultado final: x=−1, y=1."
      },
      {
        rawBaseId: "2eso-sistemas-de-ecuaciones-d11fdc95fb45",
        source: "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 7 Sistemas/Simulacro und 7-2ESO.pdf",
        sourceKind: "exam",
        difficulty: "hard",
        text: "1. Ejercicio (3 puntos): Resuelve por igualación y comprueba el sistema: 2x+3y=4; 5x−7y=10.",
        options: ["x=2, y=0", "x=0, y=2", "x=−2, y=0", "x=2, y=1"],
        correct: 0,
        solution: "Resolución:\n1. Despejamos x: x=frac{4−3y}{2} y x=frac{10+7y}{5}.\n2. Igualamos: frac{4−3y}{2}=frac{10+7y}{5}.\n3. Multiplicamos en cruz: 20−15y=20+14y ⇒ −29y=0 ⇒ y=0.\n4. Sustituimos: x=frac{4−3·0}{2}=2.\nComprobación: 2·2+3·0=4 y 5·2−7·0=10.\nResultado final: x=2, y=0."
      }
    ],
    "3eso::ecuaciones y sistemas de ecuaciones": [
      {
        rawBaseId: "3eso-ecuaciones-y-sistemas-padre-hijo-30",
        source: "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 5 Sistemas/Examen 3 ESO und 5 sistemas.docx",
        sourceKind: "exam",
        difficulty: "hard",
        text: "Ejercicio (2 puntos): Un padre tiene 30 años más que su hijo y dentro de 15 años tendrá el doble. Calcula la edad actual del padre y del hijo.",
        options: ["Padre: 45 años; hijo: 15 años", "Padre: 60 años; hijo: 30 años", "Padre: 50 años; hijo: 20 años", "Padre: 40 años; hijo: 10 años"],
        correct: 0,
        solution: "Resolución:\n1. Sea p la edad del padre y h la edad del hijo.\n2. La diferencia actual da p=h+30.\n3. Dentro de 15 años: p+15=2(h+15).\n4. Sustituimos: h+30+15=2h+30 ⇒ h=15.\n5. Entonces p=15+30=45.\nComprobación: dentro de 15 años tendrán 60 y 30 años, y 60=2·30.\nResultado final: el padre tiene 45 años y el hijo 15 años."
      }
    ],
    "4eso-a::ecuaciones e inecuaciones": [
      {
        rawBaseId: "4eso-a-ecuaciones-e-inecuaciones-950f78024be2",
        source: "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 5-6/Examen 4-5.pdf",
        sourceKind: "exam",
        difficulty: "hard",
        text: "3. Ejercicio: Se mezcla aceite de oliva que cuesta a 3 € el litro con aceite de girasol que cuesta a 1 € el litro. Si tenemos 40 litros de mezcla a un precio de 2,5 € el litro, ¿cuántos litros de aceite de cada clase se han mezclado? (Plantea un sistema de ecuaciones y resuelve).",
        options: ["30 L de oliva y 10 L de girasol", "20 L de cada clase", "10 L de oliva y 30 L de girasol", "35 L de oliva y 5 L de girasol"],
        correct: 0,
        solution: "Resolución:\n1. Sea x la cantidad de aceite de oliva e y la de girasol, en litros.\n2. Por el volumen total: x+y=40.\n3. El valor de la mezcla es 40·2,5=100 €, así que 3x+y=100.\n4. Sistema: x+y=40; 3x+y=100. Restamos la primera ecuación de la segunda: 2x=60 ⇒ x=30.\n5. Sustituimos: y=40−30=10.\nComprobación: 30+10=40 L y 3·30+1·10=100 €, que son 100/40=2,5 €/L.\nResultado final: 30 L de oliva y 10 L de girasol."
      },
      {
        rawBaseId: "4eso-a-ecuaciones-e-inecuaciones-9909de07487e",
        source: "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 5-6/Examen 4-5.pdf",
        sourceKind: "exam",
        difficulty: "hard",
        text: "4. Ejercicio: La suma de las edades de un padre y su hija es de 70 años. Dentro de 10 años la edad del padre será el doble de la edad de su hija. ¿Qué edad tiene ahora cada uno? (Plantea un sistema de ecuaciones y resuelve).",
        options: ["Padre: 50 años; hija: 20 años", "Padre: 45 años; hija: 25 años", "Padre: 40 años; hija: 30 años", "Padre: 55 años; hija: 15 años"],
        correct: 0,
        solution: "Resolución:\n1. Sea p la edad del padre y h la edad de la hija.\n2. Planteamos el sistema: p+h=70; p+10=2(h+10).\n3. Simplificamos la segunda ecuación: p=2h+10.\n4. Sustituimos en la primera: 2h+10+h=70 ⇒ 3h=60 ⇒ h=20.\n5. Entonces p=70−20=50.\nComprobación: ahora 50+20=70; dentro de 10 años tendrán 60 y 30 años, y 60=2·30.\nResultado final: el padre tiene 50 años y la hija 20 años."
      }
    ],
    "4eso-b::expresiones algebraicas": [
      {
        rawBaseId: "4eso-b-expresiones-algebraicas-09f949d3e2a8",
        source: "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 3 Polinomios/Simulacro  und 3 4º ESO C.pdf",
        sourceKind: "exam",
        difficulty: "hard",
        text: "3. Ejercicio: Dado el polinomio x⁴+2x²+3x−k, determina el valor de k para que sea múltiplo del polinomio x−2.",
        options: ["k=30", "k=18", "k=−30", "k=24"],
        correct: 0,
        solution: "Resolución:\n1. Por el teorema del factor, x−2 es factor si P(2)=0.\n2. Sustituimos: P(2)=2⁴+2·2²+3·2−k.\n3. Calculamos: P(2)=16+8+6−k=30−k.\n4. Imponemos 30−k=0, luego k=30.\nComprobación: con k=30, P(2)=16+8+6−30=0.\nResultado final: k=30."
      },
      {
        rawBaseId: "4eso-b-expresiones-algebraicas-25d6b0a334d5",
        source: "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 3 Polinomios/Simulacro  und 3 4º ESO C.pdf",
        sourceKind: "exam",
        difficulty: "hard",
        text: "3. Ejercicio: Dado el polinomio 5x³+mx−6, determina el valor de m para que al dividirlo por x+1 su resto sea 3.",
        options: ["m=−14", "m=−8", "m=14", "m=−2"],
        correct: 0,
        solution: "Resolución:\n1. Por el teorema del resto, al dividir entre x+1 el resto es P(−1).\n2. Sustituimos: P(−1)=5(−1)³+m(−1)−6=−5−m−6=−11−m.\n3. Imponemos el resto indicado: −11−m=3.\n4. Despejamos: −m=14 ⇒ m=−14.\nComprobación: P(−1)=−5+14−6=3.\nResultado final: m=−14."
      }
    ]
  };

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }

  window.MargaritaEsoExamVerified = {
    build(courseId, theme) {
      return (banks[`${courseId}::${normalize(theme)}`] || []).map((question) => ({ ...question }));
    },
    count: Object.values(banks).reduce((total, questions) => total + questions.length, 0)
  };
})();

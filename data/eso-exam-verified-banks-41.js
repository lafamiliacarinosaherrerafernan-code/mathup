(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const exam = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 2/examen 4º ESO ACAD und 2.pdf";
  const simulacro = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 2/Simulacro 4º ESO ACAD und 2.pdf";
  const banks = {
    "4eso-b::radicales y logaritmos": [
      q(
        "4eso-b-radicales-y-logaritmos-936686c5272d",
        exam,
        "1. Ejercicio: Calcula y simplifica: a) (2√6−(1/6)√6)·3−(2/3)(⁴√36−6√6).",
        ["(53/6)√6", "(13/6)√6", "(19/2)√6", "(43/6)√6"],
        "Resolución:\n1. ⁴√36=√6 porque 36=(√6)⁴.\n2. En el primer término: (2√6−(1/6)√6)·3=((12/6−1/6)√6)·3=(11/2)√6.\n3. En el segundo paréntesis: ⁴√36−6√6=√6−6√6=−5√6.\n4. Sustituimos en la expresión completa: (11/2)√6−(2/3)(−5√6)=(11/2)√6+(10/3)√6.\n5. Sumamos coeficientes: (33/6+20/6)√6=(53/6)√6.\nComprobación: todos los radicales quedan reducidos al mismo radical √6 y 53/6≈8,833.\nResultado final: (53/6)√6."
      ),
      q(
        "4eso-b-radicales-y-logaritmos-c84bc153f5dc",
        exam,
        "1. Ejercicio: Calcula y simplifica: b) √(2³·∛(2²))·⁴√8.",
        ["4·¹²√128", "4·¹²√32", "2·¹²√128", "8·¹²√2"],
        "Resolución:\n1. Escribimos los radicales como potencias de base 2: ∛(2²)=2^(2/3) y ⁴√8=2^(3/4).\n2. Dentro de la raíz cuadrada: 2³·2^(2/3)=2^(11/3).\n3. Al aplicar la raíz cuadrada: √(2^(11/3))=2^(11/6).\n4. Multiplicamos por el último radical: 2^(11/6)·2^(3/4)=2^(22/12+9/12)=2^(31/12).\n5. Extraemos la parte entera del exponente: 2^(31/12)=2²·2^(7/12)=4·¹²√(2⁷)=4·¹²√128.\nComprobación: elevar el resultado a la potencia 12 produce 4¹²·128=2²⁴·2⁷=2³¹.\nResultado final: 4·¹²√128."
      ),
      q(
        "4eso-b-radicales-y-logaritmos-5cb70bfba222",
        simulacro,
        "1. Ejercicio: Calcula y simplifica: a) 5·∛(81/8)−3·⁶√9−5·⁴√243.",
        ["(9/2)∛3−15·⁴√3", "(21/2)∛3−15·⁴√3", "(9/2)∛3−5·⁴√3", "15∛3−(9/2)·⁴√3"],
        "Resolución:\n1. ∛(81/8)=∛(3⁴/2³)=(3/2)∛3; por tanto, 5·∛(81/8)=(15/2)∛3.\n2. ⁶√9=⁶√(3²)=∛3; por tanto, −3·⁶√9=−3∛3.\n3. ⁴√243=⁴√(3⁵)=3·⁴√3; por tanto, −5·⁴√243=−15·⁴√3.\n4. Reducimos los radicales semejantes de índice 3: (15/2)∛3−3∛3=(15/2−6/2)∛3=(9/2)∛3.\n5. Los radicales de índice 3 y 4 no son semejantes y no se pueden sumar.\nComprobación: las potencias extraídas cumplen 81=3³·3, 9=3² y 243=3⁴·3.\nResultado final: (9/2)∛3−15·⁴√3."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

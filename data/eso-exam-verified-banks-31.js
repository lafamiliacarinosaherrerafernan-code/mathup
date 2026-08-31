(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const exam = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 2/examen 4º ESO ACAD und 2.pdf";
  const simulacro = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 2/Simulacro 4º ESO ACAD und 2.pdf";
  const banks = {
    "4eso-b::radicales y logaritmos": [
      q("4eso-b-radicales-y-logaritmos-aa3eba2da306", exam, "3. Ejercicio: Calcula usando propiedades: log(0,0001·10⁻³)+log₁⁄₃(∛81)−log₄(1/64)−logₐ(1/a⁵).", ["−1/3", "1/3", "−4/3", "1"], "Resolución:\n1. log(0,0001·10⁻³)=log(10⁻⁷)=−7.\n2. ∛81=3⁴⁄³ y 1/3=3⁻¹, luego log₁⁄₃(∛81)=−4/3.\n3. log₄(1/64)=−3 y logₐ(1/a⁵)=−5.\n4. −7−4/3−(−3)−(−5)=1−4/3=−1/3.\nComprobación: cada logaritmo se ha convertido en una potencia de su base.\nResultado final: −1/3."),
      q("4eso-b-radicales-y-logaritmos-1bfb5d624df3-a", exam, "4. Ejercicio: Sabiendo que log 2=0,301, calcula: a) log√1,25.", ["0,0485", "0,097", "0,3495", "−0,0485"], "Resolución:\n1. log√1,25=(1/2)log(5/4).\n2. log5=log(10/2)=1−0,301=0,699 y log4=2log2=0,602.\n3. (1/2)(0,699−0,602)=0,097/2=0,0485.\nComprobación: √1,25≈1,118 y su logaritmo es pequeño y positivo.\nResultado final: 0,0485."),
      q("4eso-b-radicales-y-logaritmos-90fdf0ef8f7d", exam, "5. Ejercicio: Transforma en expresión logarítmica: B=(a²·b)/(∛z·c⁴).", ["log B=2log a+log b−(1/3)log z−4log c", "log B=2log a+log b+(1/3)log z+4log c", "log B=log a²b−log z−log c", "log B=2a+b−z/3−4c"], "Resolución:\n1. El logaritmo de un cociente es la diferencia de logaritmos.\n2. log(a²b)=2log a+log b.\n3. log(∛z·c⁴)=(1/3)log z+4log c.\n4. Restamos ambas expresiones.\nComprobación: se requieren argumentos positivos.\nResultado final: log B=2log a+log b−(1/3)log z−4log c."),
      q("4eso-b-radicales-y-logaritmos-4d86b233b2f2", simulacro, "3. Ejercicio: Resuelve: a) logₐ(1/a⁵)=x.", ["x=−5", "x=5", "x=−1/5", "x=a⁻⁵"], "Resolución:\n1. 1/a⁵=a⁻⁵.\n2. Por definición, logₐ(a⁻⁵)=−5, con a>0 y a≠1.\nComprobación: aˣ=a⁻⁵ implica x=−5.\nResultado final: x=−5."),
      q("4eso-b-radicales-y-logaritmos-3a0286377510", simulacro, "3. Ejercicio: Resuelve: c) log₁⁄₂(⁵√8)=x.", ["x=−3/5", "x=3/5", "x=−5/3", "x=3"], "Resolución:\n1. ⁵√8=(2³)¹⁄⁵=2³⁄⁵.\n2. La base 1/2 es 2⁻¹.\n3. (2⁻¹)ˣ=2³⁄⁵, luego −x=3/5.\nComprobación: (1/2)⁻³⁄⁵=2³⁄⁵.\nResultado final: x=−3/5."),
      q("4eso-b-radicales-y-logaritmos-4bef6f502caf", simulacro, "4. Ejercicio: Sabiendo que log2=0,301 y log3=0,477, calcula: b) log[(27·4)/∛5].", ["1,800", "2,266", "1,566", "0,800"], "Resolución:\n1. log[(27·4)/∛5]=log27+log4−(1/3)log5.\n2. log27=3log3=1,431; log4=2log2=0,602; log5=1−log2=0,699.\n3. 1,431+0,602−0,699/3=2,033−0,233=1,800.\nComprobación: (27·4)/∛5≈63,16 y log63,16≈1,800.\nResultado final: 1,800.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

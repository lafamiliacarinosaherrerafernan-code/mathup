(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const eso1eq = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 6 Ecuaciones/examen und 6-1 ESO A-B.pdf";
  const eso2eq = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 6 Ecuaciones/Examen 2 ESO und 6 ecuaciones.pdf";
  const eso4aAlg = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 3-4/SIMULACRO und 3-4.docx.pdf";
  const eso4aReal = "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 1-2/examen und 1-2.pdf";
  const eso4bFun = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 10 Funciones/Examen Funciones und 10,11  4º ESO B.pdf";
  const eso4bIneq = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 6 Inecuaciones y sistemas de inecuaciones/Simulacro und 6  inecuaciones y sistemas.pdf";
  const eso4bLog = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 2/examen 4º ESO ACAD und 2.pdf";
  const eso4bLogSim = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 2/Simulacro 4º ESO ACAD und 2.pdf";
  const banks = {
    "1eso::expresiones algebraicas": [
      q("1eso-expresiones-algebraicas-60d2c8defcc1", eso1eq, "4. Ejercicio (2,5 puntos): Resuelve las siguientes ecuaciones: c) 2x/3−x/5−3=−2/3", ["x=5", "x=−5", "x=35", "x=5/7"], "Resolución:\n1. 2x/3−x/5−3=−2/3.\n2. Multiplicamos toda la ecuación por 15: 10x−3x−45=−10.\n3. 7x−45=−10; 7x=35; x=5.\nComprobación: 10/3−1−3=−2/3.\nResultado final: x=5.")
    ],
    "2eso::sistemas de ecuaciones": [
      q("2eso-sistemas-de-ecuaciones-3ad242cd20a6", eso2eq, "1. Ejercicio (2 puntos): Resuelve y comprueba: a) (x−2)/3−(x−4)/5=(x−3)/4", ["x=53/7", "x=7/53", "x=5", "x=−53/7"], "Resolución:\n1. (x−2)/3−(x−4)/5=(x−3)/4.\n2. Multiplicamos por 60: 20(x−2)−12(x−4)=15(x−3).\n3. 20x−40−12x+48=15x−45; 8x+8=15x−45.\n4. 53=7x; x=53/7.\nComprobación: al sustituir x=53/7, ambos miembros valen 8/7.\nResultado final: x=53/7.")
    ],
    "4eso-a::expresiones algebraicas": [
      q("4eso-a-expresiones-algebraicas-3094c3988d21", eso4aAlg, "4. Ejercicio: Opera. a) (−2x⁵+3x⁴−x²+8):(x²−2x+1)", ["Cociente −2x³−x²; resto 8", "Cociente −2x³+x²; resto 8", "Cociente −2x³−x²+8; resto 0", "Cociente −2x³; resto −x²+8"], "Resolución:\n1. Dividimos −2x⁵+3x⁴+0x³−x²+0x+8 entre x²−2x+1.\n2. Primer término: −2x⁵/x²=−2x³. Restamos (−2x⁵+4x⁴−2x³) y queda −x⁴+2x³−x²+8.\n3. Siguiente: −x⁴/x²=−x². Restamos (−x⁴+2x³−x²) y queda 8.\nComprobación: (x²−2x+1)(−2x³−x²)+8=−2x⁵+3x⁴−x²+8.\nResultado final: cociente −2x³−x²; resto 8."),
      q("4eso-a-expresiones-algebraicas-975e13c3169e", eso4aAlg, "3. Ejercicio: Resuelve la identidad notable: a) (3x³−y)(3x³−y)", ["9x⁶−6x³y+y²", "9x⁶−y²", "6x³−2y", "9x⁶+6x³y+y²"], "Resolución:\n1. Es el cuadrado de una diferencia: (a−b)²=a²−2ab+b².\n2. a=3x³ y b=y.\n3. (3x³)²−2(3x³)y+y²=9x⁶−6x³y+y².\nComprobación: multiplicando término a término se obtiene el mismo polinomio.\nResultado final: 9x⁶−6x³y+y²."),
      q("4eso-a-expresiones-algebraicas-22098d13f5ef", eso4aAlg, "2. Ejercicio: Realiza y simplifica: a) 2√12−4√27+√8", ["2√2−8√3", "−6√3", "8√3+2√2", "−8√2+2√3"], "Resolución:\n1. √12=2√3, √27=3√3 y √8=2√2.\n2. 2√12−4√27+√8=2·2√3−4·3√3+2√2.\n3. =4√3−12√3+2√2=2√2−8√3.\nComprobación: solo se suman radicales semejantes.\nResultado final: 2√2−8√3."),
      q("4eso-a-expresiones-algebraicas-22098d13f5ef-d", eso4aAlg, "2. Ejercicio: Realiza y simplifica: d) √6·√6·√6", ["6√6", "18", "6", "√216"], "Resolución:\n1. √6·√6=6.\n2. 6·√6=6√6.\nComprobación: (√6)³=6^{3/2}=6√6.\nResultado final: 6√6.")
    ],
    "4eso-a::numeros reales": [
      q("4eso-a-numeros-reales-e4634d33817b", eso4aReal, "1. Ejercicio: b) Representa en la recta real 7/3 y √11.", ["7/3≈2,333 entre 2 y 3; √11≈3,317 entre 3 y 4", "7/3≈3,5; √11≈2,2", "Ambos están entre 2 y 3", "Ambos están entre 3 y 4"], "Resolución:\n1. 7/3=2,333…, por lo que se sitúa entre 2 y 3.\n2. Como 3²=9<11<16=4², √11 está entre 3 y 4; √11≈3,317.\n3. Marcamos primero 7/3 y después √11, que queda a su derecha.\nComprobación: 2,333<3,317.\nResultado final: 7/3≈2,333 y √11≈3,317."),
      q("4eso-a-numeros-reales-e893ac6eb103", eso4aReal, "1. Ejercicio: a) Clasifica según el menor conjunto: −2; 3,1666…; √49; −3/4; √12; 14/7.", ["−2 entero; 3,1666… racional; √49 natural; −3/4 racional; √12 irracional; 14/7 natural", "Todos son racionales", "−2 natural; √49 irracional; √12 racional", "Solo −3/4 es racional"], "Resolución:\n1. −2 es entero. Todo decimal periódico, como 3,1666…, es racional.\n2. √49=7 es natural; −3/4 es racional no entero.\n3. √12=2√3 es irracional; 14/7=2 es natural.\nComprobación: cada número se ha colocado en el conjunto más pequeño que lo contiene.\nResultado final: Z, Q, N, Q, I, N, respectivamente.")
    ],
    "4eso-b::funciones": [
      q("4eso-b-funciones-f7079b2dc9e5", eso4bFun, "2. Ejercicio: Dada f(x)=2/x, representa f(x)=2/(x−1)+3.", ["Traslada y=2/x una unidad a la derecha y tres hacia arriba; asíntotas x=1, y=3", "Una unidad a la izquierda y tres abajo; asíntotas x=−1, y=−3", "Tres a la derecha y una arriba; asíntotas x=3, y=1", "No hay traslación; asíntotas x=0, y=0"], "Resolución:\n1. Sustituir x por x−1 desplaza la gráfica de 2/x una unidad a la derecha.\n2. Sumar 3 desplaza tres unidades hacia arriba.\n3. Las asíntotas pasan de x=0, y=0 a x=1, y=3.\nComprobación: el centro de simetría de la hipérbola es (1,3).\nResultado final: traslación (1,3); asíntotas x=1 e y=3.")
    ],
    "4eso-b::inecuaciones y sistemas de inecuaciones": [
      q("4eso-b-inecuaciones-y-sistemas-de-inecuaciones-37f9db00a300", eso4bIneq, "1. Ejercicio: Resuelve: b) x²/(x−5)−1≥0", ["(5,∞)", "[5,∞)", "(−∞,5)", "R\\{5}"], "Resolución:\n1. Unificamos: x²/(x−5)−1=[x²−(x−5)]/(x−5)=(x²−x+5)/(x−5).\n2. El numerador tiene discriminante 1−20=−19<0 y coeficiente principal positivo, así que siempre es positivo.\n3. El signo depende de x−5; el cociente es no negativo cuando x>5. x=5 no pertenece al dominio.\nComprobación: x=6 da un valor positivo y x=0 da uno negativo.\nResultado final: (5,∞).")
    ],
    "4eso-b::radicales y logaritmos": [
      q("4eso-b-radicales-y-logaritmos-356e2476fbe4", eso4bLog, "5. Ejercicio: Transforma a expresión exponencial: b) log A=2−(1/2)log a.", ["A=100/√a", "A=2−√a", "A=100√a", "A=10²⁻ᵃᐟ²"], "Resolución:\n1. 2=log100 y (1/2)log a=log√a.\n2. log A=log100−log√a=log(100/√a).\n3. Por igualdad de logaritmos, A=100/√a, con a>0.\nComprobación: log(100/√a)=2−(1/2)log a.\nResultado final: A=100/√a."),
      q("4eso-b-radicales-y-logaritmos-8611702521f4", eso4bLogSim, "5. Ejercicio: Transforma a expresión logarítmica: a) A=c³a²b.", ["log A=3log c+2log a+log b", "log A=log c+log a+log b", "log A=3c+2a+b", "log A=(log c)³(log a)²log b"], "Resolución:\n1. Aplicamos el logaritmo: log A=log(c³a²b).\n2. El logaritmo de un producto es la suma: log(c³)+log(a²)+log b.\n3. Bajamos exponentes: 3log c+2log a+log b.\nComprobación: se requieren A,c,a,b>0.\nResultado final: log A=3log c+2log a+log b."),
      q("4eso-b-radicales-y-logaritmos-9812e87ead82", eso4bLogSim, "4. Ejercicio: Sabiendo que log2=0,301 y log3=0,477, calcula log∛3,2.", ["0,1683 aproximadamente", "0,505", "0,602", "1,1683"], "Resolución:\n1. log∛3,2=(1/3)log3,2.\n2. 3,2=32/10=2⁵/10, luego log3,2=5log2−1.\n3. log3,2=5·0,301−1=0,505. Dividimos entre 3: 0,1683…\nComprobación: ∛3,2≈1,473 y su logaritmo es aproximadamente 0,168.\nResultado final: 0,1683 aproximadamente.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

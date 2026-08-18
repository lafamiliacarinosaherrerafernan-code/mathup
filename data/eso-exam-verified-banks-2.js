(function () {
  "use strict";

  const banks = {
    "1eso::fracciones": [
      {
        rawBaseId: "1eso-fracciones-02ccdbf718cf",
        source: "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 4 Fracciones/examen und 4-1ESO A.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. Ejercicio (1 punto): Encuentra la fracción irreducible: a) 720/420.",
        options: ["12/7", "72/42", "7/12", "24/14"], correct: 0,
        solution: "Resolución:\n1. Descomponemos: 720=2⁴·3²·5 y 420=2²·3·5·7.\n2. El máximo común divisor es 2²·3·5=60.\n3. Dividimos numerador y denominador entre 60: frac{720}{420}=frac{12}{7}.\nComprobación: mcd(12,7)=1, por lo que la fracción es irreducible; además, 12·420=7·720=5040.\nResultado final: 12/7."
      }
    ],
    "1eso::numeros naturales": [
      {
        rawBaseId: "1eso-numeros-naturales-5d3f772b8980",
        source: "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 2 Divisibilidad/Examen Und 2.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. Ejercicio (1 punto): Indica todos los divisores y cuatro múltiplos de 220.",
        options: [
          "Divisores: 1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110 y 220; múltiplos: 220, 440, 660 y 880",
          "Divisores: 1, 2, 4, 5, 10, 20, 22, 44, 55 y 220; múltiplos: 220, 420, 620 y 820",
          "Divisores: 1, 2, 5, 10, 11, 22, 55, 110 y 220; múltiplos: 110, 220, 330 y 440",
          "Divisores: 1, 2, 4, 5, 10, 11, 20, 22, 40, 55, 110 y 220; múltiplos: 220, 440, 660 y 880"
        ], correct: 0,
        solution: "Resolución:\n1. Descomponemos 220=2²·5·11.\n2. Sus divisores se forman combinando 2⁰,2¹,2² con 5⁰,5¹ y 11⁰,11¹. Ordenados son 1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110 y 220.\n3. Los múltiplos tienen la forma 220·n. Para n=1,2,3,4 obtenemos 220, 440, 660 y 880.\nComprobación: cada divisor divide 220 exactamente y cada múltiplo es 220 por un número natural.\nResultado final: los indicados en la primera opción."
      },
      {
        rawBaseId: "1eso-numeros-naturales-ce5292834b8a",
        source: "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 2 Divisibilidad/Examen Und 2.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "4. Ejercicio (1 punto): Calcula el MCM y el MCD de 550, 66 y 99.",
        options: ["MCM=4950 y MCD=11", "MCM=9900 y MCD=11", "MCM=4950 y MCD=22", "MCM=990 y MCD=11"], correct: 0,
        solution: "Resolución:\n1. Factorizamos: 550=2·5²·11; 66=2·3·11; 99=3²·11.\n2. Para el MCD tomamos los factores comunes con menor exponente: MCD=11.\n3. Para el MCM tomamos todos los factores con mayor exponente: MCM=2·3²·5²·11=4950.\nComprobación: 4950 es divisible entre 550, 66 y 99; 11 divide a los tres números.\nResultado final: MCM=4950 y MCD=11."
      }
    ],
    "1eso::semejanza, pitagoras y areas": [
      {
        rawBaseId: "1eso-semejanza-pitagoras-y-areas-4fa97c1f8231",
        source: "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 10 y 11 Circunferencia y Áreas y Perimetros/examen und 10 y 11 Circunferencia y Areas.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "4. Ejercicio (2 puntos): ¿Cuál es el área de un trapecio isósceles que tiene una base de 20 metros, otra de 10 metros y uno de sus lados mide 6 metros?",
        options: ["15√11 m²", "90 m²", "30√11 m²", "60 m²"], correct: 0,
        solution: "Resolución:\n1. Al ser isósceles, la diferencia de las bases se reparte en dos: (20−10)/2=5 m.\n2. Cada lado oblicuo, la altura y 5 m forman un triángulo rectángulo. Por Pitágoras: h²+5²=6².\n3. h²=36−25=11, luego h=√11 m.\n4. Área del trapecio: A=frac{B+b}{2}·h=frac{20+10}{2}·√11=15√11 m².\nComprobación: √11≈3,317, así que A≈49,75 m², coherente con una altura menor que 6 m.\nResultado final: 15√11 m²."
      }
    ],
    "2eso::expresiones algebraicas": [
      {
        rawBaseId: "2eso-expresiones-algebraicas-925afd97b9f0",
        source: "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 5 Expresiones algebraicas/Examen Und 5   2º ES0.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. Ejercicio (2 puntos): Realiza la operación de monomios: b) 21x³−4x+12x³+9x.",
        options: ["33x³+5x", "42x³+5x", "33x³−13x", "38x³"], correct: 0,
        solution: "Resolución:\n1. Agrupamos términos semejantes: (21x³+12x³)+(−4x+9x).\n2. Sumamos sus coeficientes: (21+12)x³+(−4+9)x.\n3. Simplificamos: 33x³+5x.\nComprobación: para x=1, la expresión original vale 21−4+12+9=38 y 33+5=38.\nResultado final: 33x³+5x."
      },
      {
        rawBaseId: "2eso-expresiones-algebraicas-c84a824a9b59",
        source: "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 5 Expresiones algebraicas/Examen Und 5   2º ES0.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. Ejercicio (2 puntos): Realiza la operación de monomios: a) 5x²−13x−13x².",
        options: ["−8x²−13x", "−8x²", "18x²−13x", "−21x²"], correct: 0,
        solution: "Resolución:\n1. Agrupamos los términos de grado dos: (5x²−13x²)−13x.\n2. Restamos los coeficientes: (5−13)x²−13x.\n3. Simplificamos: −8x²−13x.\nComprobación: para x=1, la expresión original vale 5−13−13=−21 y la reducida −8−13=−21.\nResultado final: −8x²−13x."
      }
    ],
    "2eso::fracciones": [
      {
        rawBaseId: "2eso-numeros-enteros-864484bcd3e9",
        source: "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 1 y 2/examen und 1-2.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "4. Ejercicio (2,25 puntos): De un depósito de agua se gasta la primera semana tres quintos del total y la segunda un cuarto del resto. Si quedan 140 metros cúbicos, ¿cuál es la capacidad del depósito?",
        options: ["1400/3 m³", "350 m³", "560 m³", "700/3 m³"], correct: 0,
        solution: "Resolución:\n1. Sea C la capacidad. Tras gastar 3/5 queda 2/5 de C.\n2. La segunda semana se gasta 1/4 de ese resto, por lo que permanece 3/4.\n3. Cantidad final: frac{3}{4}·frac{2}{5}C=frac{3}{10}C.\n4. Planteamos frac{3}{10}C=140 y despejamos C=140·frac{10}{3}=frac{1400}{3} m³.\nComprobación: 3/10 de 1400/3 es 140.\nResultado final: 1400/3 m³, aproximadamente 466,67 m³."
      }
    ],
    "2eso::sistemas de ecuaciones": [
      {
        rawBaseId: "2eso-sistemas-de-ecuaciones-41d79c90ea36",
        source: "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 6 Ecuaciones/Examen 2 ESO und 6 ecuaciones.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "3. Ejercicio (2 puntos): Una madre tiene 35 años más que su hijo y dentro de 15 años su edad será el doble de la del hijo. ¿Cuántos años tienen en la actualidad?",
        options: ["Madre: 55 años; hijo: 20 años", "Madre: 50 años; hijo: 15 años", "Madre: 65 años; hijo: 30 años", "Madre: 45 años; hijo: 10 años"], correct: 0,
        solution: "Resolución:\n1. Sea m la edad de la madre y h la del hijo.\n2. Planteamos m=h+35 y m+15=2(h+15).\n3. Sustituimos: h+35+15=2h+30 ⇒ h=20.\n4. Entonces m=20+35=55.\nComprobación: dentro de 15 años tendrán 70 y 35 años, y 70=2·35.\nResultado final: madre 55 años e hijo 20 años."
      }
    ],
    "3eso::ecuaciones y sistemas de ecuaciones": [
      {
        rawBaseId: "3eso-ecuaciones-y-sistemas-de-ecuaciones-17f5e7caef5c",
        source: "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 4 Ecuaciones/Examen und 4 3º ESO.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "4. Ejercicio (2 puntos): Calcula el área de un cuadrado sabiendo que, si aumentamos la longitud de sus lados en 3 cm, el área aumenta 52 cm².",
        options: ["1849/36 cm²", "52 cm²", "1849/6 cm²", "49 cm²"], correct: 0,
        solution: "Resolución:\n1. Sea x>0 el lado original. El área original es x² y la nueva (x+3)².\n2. Planteamos (x+3)²−x²=52.\n3. Desarrollamos: x²+6x+9−x²=52 ⇒ 6x=43 ⇒ x=43/6 cm.\n4. El área es A=x²=(43/6)²=1849/36 cm².\nComprobación: (61/6)²−(43/6)²=(3721−1849)/36=1872/36=52.\nResultado final: 1849/36 cm²."
      },
      {
        rawBaseId: "3eso-ecuaciones-y-sistemas-de-ecuaciones-bb18f4013f5d",
        source: "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 4 Ecuaciones/Simuacro und 4 - 3 ESO.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "4. Ejercicio (2 puntos): ¿Cuánto mide el lado de un cuadrado si, al aumentar el lado en 9 cm, el área resulta incrementada en 657 cm²?",
        options: ["32 cm", "36 cm", "64 cm", "27 cm"], correct: 0,
        solution: "Resolución:\n1. Sea x>0 el lado original.\n2. El aumento de área cumple (x+9)²−x²=657.\n3. Desarrollamos: x²+18x+81−x²=657 ⇒ 18x=576.\n4. Despejamos: x=32 cm.\nComprobación: 41²−32²=1681−1024=657 cm².\nResultado final: 32 cm."
      }
    ],
    "3eso::sucesiones": [
      {
        rawBaseId: "3eso-sucesiones-1f308209a464",
        source: "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 6 Sucesiones/Examen 3 ESO und 6 sucesiones.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "4. Ejercicio (2 puntos): Calcula la suma de los números pares comprendidos entre 54 y 120.",
        options: ["2958", "2871", "3045", "5916"], correct: 0,
        solution: "Resolución:\n1. Es una progresión aritmética con a₁=54, aₙ=120 y diferencia d=2.\n2. Calculamos el número de términos: n=frac{120−54}{2}+1=34.\n3. Aplicamos Sₙ=frac{n(a₁+aₙ)}{2}: S₃₄=frac{34(54+120)}{2}=17·174=2958.\nComprobación: hay 34 términos y su media es (54+120)/2=87; 34·87=2958.\nResultado final: 2958."
      }
    ],
    "3eso::funciones": [
      {
        rawBaseId: "3eso-funciones-a48b3725ba03",
        source: "documentos/3º ESO/Exámenes tipo/2020-2021/Tema 10 Funciones y gráficas/Examen 3 ESO und 10 Funciones y gráficas.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. Ejercicio (2 puntos): Esta tabla recoge los euros en función de los kg de patatas compradas. Expresa la función de forma algebraica y represéntala. Euros: 2, 4, 6, 8, 10; kg: 6, 12, 18, 24, 30.",
        options: ["E(x)=x/3", "E(x)=3x", "E(x)=x+4", "E(x)=2x/3"], correct: 0,
        solution: "Resolución:\n1. Llamamos x a los kilogramos y E(x) al precio en euros.\n2. Calculamos el cociente euros/kg: 2/6=4/12=6/18=1/3.\n3. Es una proporcionalidad directa y la función es E(x)=frac{1}{3}x.\n4. Su gráfica es una recta que pasa por el origen y tiene pendiente 1/3; contiene, por ejemplo, los puntos (6,2), (12,4) y (30,10).\nComprobación: E(24)=24/3=8 €, como indica la tabla.\nResultado final: E(x)=x/3."
      }
    ],
    "4eso-a::sistemas de ecuaciones e inecuaciones": [
      {
        rawBaseId: "4eso-a-sistemas-de-ecuaciones-e-inecuaciones-439df3a1bb75",
        source: "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 5-6/Examen 4-5.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. Ejercicio: Resuelve por reducción y por el método gráfico y clasifica según el número de soluciones el sistema: 2x+y=3; x−3y=5.",
        options: ["x=2, y=−1; compatible determinado", "x=−2, y=1; compatible determinado", "Infinitas soluciones", "No tiene solución"], correct: 0,
        solution: "Resolución:\n1. Sistema: 2x+y=3; x−3y=5.\n2. Multiplicamos la primera ecuación por 3: 6x+3y=9.\n3. Sumamos la segunda: 7x=14 ⇒ x=2.\n4. Sustituimos en 2x+y=3: 4+y=3 ⇒ y=−1.\n5. Gráficamente son dos rectas con pendientes distintas que se cortan en (2,−1); es compatible determinado.\nComprobación: 2·2+(−1)=3 y 2−3(−1)=5.\nResultado final: (2,−1), sistema compatible determinado."
      }
    ],
    "4eso-a::expresiones algebraicas": [
      {
        rawBaseId: "4eso-a-expresiones-algebraicas-f5df142ebac0-a",
        source: "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 3-4/examen und 3-4.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "5. Ejercicio: Factoriza y encuentra las soluciones: a) x³+6x²+9x.",
        options: ["x(x+3)²; raíces 0 y −3 (doble)", "x(x−3)²; raíces 0 y 3", "x(x+3)(x−3); raíces 0, −3 y 3", "(x+3)³; raíz −3 triple"], correct: 0,
        solution: "Resolución:\n1. Sacamos factor común x: x³+6x²+9x=x(x²+6x+9).\n2. Reconocemos un cuadrado perfecto: x²+6x+9=(x+3)².\n3. Factorización: x(x+3)².\n4. Igualando cada factor a cero: x=0 o x=−3, esta última raíz doble.\nComprobación: x(x+3)²=x(x²+6x+9)=x³+6x²+9x.\nResultado final: x(x+3)²; raíces 0 y −3 (doble)."
      },
      {
        rawBaseId: "4eso-a-expresiones-algebraicas-f5df142ebac0-b",
        source: "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 3-4/examen und 3-4.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "5. Ejercicio: Factoriza y encuentra las soluciones: b) 7x³−28x⁵.",
        options: ["7x³(1−2x)(1+2x); raíces 0 (triple), −1/2 y 1/2", "7x³(1−4x); raíces 0 y 1/4", "7x³(1−2x)²; raíces 0 y 1/2", "7x³(1−4x²); raíces 0, −2 y 2"], correct: 0,
        solution: "Resolución:\n1. Sacamos factor común 7x³: 7x³−28x⁵=7x³(1−4x²).\n2. Aplicamos diferencia de cuadrados: 1−4x²=(1−2x)(1+2x).\n3. Factorización: 7x³(1−2x)(1+2x).\n4. Raíces: x=0 (triple), x=1/2 y x=−1/2.\nComprobación: (1−2x)(1+2x)=1−4x² y 7x³(1−4x²)=7x³−28x⁵.\nResultado final: 7x³(1−2x)(1+2x)."
      },
      {
        rawBaseId: "4eso-a-expresiones-algebraicas-f5df142ebac0-c",
        source: "documentos/4 ESO A/Exámenes tipo/2017-2018/Unidad 3-4/examen und 3-4.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "5. Ejercicio: Factoriza y encuentra las soluciones: c) x³−4x²+x+6=0.",
        options: ["(x−2)(x−3)(x+1)=0; raíces 2, 3 y −1", "(x+2)(x−3)(x−1)=0; raíces −2, 3 y 1", "(x−2)(x²−2x+3)=0; única raíz 2", "(x+1)(x²−3x+6)=0; única raíz −1"], correct: 0,
        solution: "Resolución:\n1. Probamos divisores de 6. Para x=2: 8−16+2+6=0, por lo que x−2 es factor.\n2. Dividimos entre x−2 mediante Ruffini y obtenemos x²−2x−3.\n3. Factorizamos x²−2x−3=(x−3)(x+1).\n4. Por tanto, x³−4x²+x+6=(x−2)(x−3)(x+1).\nComprobación: al desarrollar se recupera x³−4x²+x+6; las tres raíces anulan el polinomio.\nResultado final: raíces x=2, x=3 y x=−1."
      }
    ],
    "4eso-b::ecuaciones y sistemas de ecuaciones": [
      {
        rawBaseId: "4eso-b-ecuaciones-y-sistemas-de-ecuaciones-8724e0302689",
        source: "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 4 Ecuaciones/Examen und 4  4 ESO.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "3. Ejercicio: Una finca rectangular tiene una superficie de 4000 m². Si un lado tiene 30 m más que el otro, calcula sus dimensiones.",
        options: ["50 m y 80 m", "40 m y 100 m", "20 m y 200 m", "65 m y 95 m"], correct: 0,
        solution: "Resolución:\n1. Sea x>0 el lado menor; el mayor mide x+30.\n2. Planteamos x(x+30)=4000 ⇒ x²+30x−4000=0.\n3. Fórmula cuadrática: x=frac{−30±√(30²+4·4000)}{2}=frac{−30±130}{2}.\n4. Obtenemos x=50 o x=−80; descartamos la negativa. El otro lado es 80 m.\nComprobación: 50·80=4000 m² y 80−50=30 m.\nResultado final: 50 m y 80 m."
      },
      {
        rawBaseId: "4eso-b-ecuaciones-y-sistemas-de-ecuaciones-a9ecee598c21",
        source: "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 4 Ecuaciones/Examen und 4  4 ESO.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. Ejercicio: María tiene 12 años y su madre 40. ¿Cuántos años deben transcurrir para que la edad de la madre sea el triple que la de María?",
        options: ["2 años", "4 años", "6 años", "8 años"], correct: 0,
        solution: "Resolución:\n1. Sea t el número de años que deben transcurrir.\n2. Entonces María tendrá 12+t y su madre 40+t.\n3. Planteamos 40+t=3(12+t).\n4. Resolvemos: 40+t=36+3t ⇒ 4=2t ⇒ t=2.\nComprobación: dentro de 2 años tendrán 14 y 42 años, y 42=3·14.\nResultado final: 2 años."
      },
      {
        rawBaseId: "4eso-b-ecuaciones-y-sistemas-de-ecuaciones-57d0ca77d411",
        source: "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 4 Ecuaciones/Simulacro und 4  4º ESO.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. Ejercicio: Calcula los lados de un rectángulo sabiendo que su área es de 56 cm² y la diferencia entre su altura y su base es de 1 cm.",
        options: ["7 cm y 8 cm", "6 cm y 9 cm", "4 cm y 14 cm", "5 cm y 11 cm"], correct: 0,
        solution: "Resolución:\n1. Sea x>0 la base; la altura mide x+1.\n2. Planteamos x(x+1)=56 ⇒ x²+x−56=0.\n3. Factorizamos: (x+8)(x−7)=0.\n4. Las soluciones son x=7 y x=−8; descartamos la negativa. La altura es 8 cm.\nComprobación: 7·8=56 cm² y 8−7=1 cm.\nResultado final: 7 cm y 8 cm."
      }
    ],
    "4eso-b::expresiones algebraicas": [
      {
        rawBaseId: "4eso-b-expresiones-algebraicas-bc0ee0717806",
        source: "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 3 Polinomios/examen und 3 4º ESO C.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. b) Dado el polinomio x³+2x−k, determina el valor de k para que sea múltiplo de x+2.",
        options: ["k=−12", "k=12", "k=−4", "k=4"], correct: 0,
        solution: "Resolución:\n1. Por el teorema del factor, x+2 es factor si P(−2)=0.\n2. P(−2)=(−2)³+2(−2)−k=−8−4−k=−12−k.\n3. Imponemos −12−k=0 y despejamos k=−12.\nComprobación: con k=−12, P(−2)=−8−4+12=0.\nResultado final: k=−12."
      },
      {
        rawBaseId: "4eso-b-expresiones-algebraicas-56b918093ae1",
        source: "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 3 Polinomios/examen und 3 4º ESO C.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "2. Ejercicio: ¿El polinomio −x¹⁵¹−11x⁸²+10 es divisible por x+1?",
        options: ["Sí, porque P(−1)=0", "No, porque P(−1)=−22", "Sí, porque P(1)=0", "No, porque el grado es impar"], correct: 0,
        solution: "Resolución:\n1. Por el teorema del factor, comprobamos P(−1).\n2. Como 151 es impar, (−1)¹⁵¹=−1; como 82 es par, (−1)⁸²=1.\n3. P(−1)=−(−1)−11·1+10=1−11+10=0.\n4. Por tanto, x+1 divide exactamente al polinomio.\nComprobación: el resto de la división entre x+1 es P(−1)=0.\nResultado final: sí es divisible por x+1."
      },
      {
        rawBaseId: "4eso-b-expresiones-algebraicas-0fb51386a787",
        source: "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 3 Polinomios/examen und 3 4º ESO C.pdf",
        sourceKind: "exam", difficulty: "hard",
        text: "1. Ejercicio: Encuentra las soluciones reales y factoriza: b) 625x⁴−1.",
        options: ["(5x−1)(5x+1)(25x²+1); x=±1/5", "(25x−1)(25x+1); x=±1/25", "(5x−1)²(5x+1)²; x=±1/5", "(25x²−1)²; x=±1/5 dobles"], correct: 0,
        solution: "Resolución:\n1. Aplicamos diferencia de cuadrados: 625x⁴−1=(25x²−1)(25x²+1).\n2. Volvemos a factorizar 25x²−1=(5x−1)(5x+1).\n3. Sobre los reales, 25x²+1 no tiene raíces.\n4. Las soluciones reales son 5x−1=0 ⇒ x=1/5 y 5x+1=0 ⇒ x=−1/5.\nComprobación: para x=±1/5, 625(1/5)⁴−1=625/625−1=0.\nResultado final: (5x−1)(5x+1)(25x²+1), con x=±1/5."
      }
    ]
  };

  const previous = window.MargaritaEsoExamVerified;
  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }
  window.MargaritaEsoExamVerified = {
    build(courseId, theme) {
      return [
        ...(previous?.build?.(courseId, theme) || []),
        ...(banks[`${courseId}::${normalize(theme)}`] || []).map((question) => ({ ...question }))
      ];
    },
    count: (previous?.count || 0) + Object.values(banks).reduce((total, questions) => total + questions.length, 0)
  };
})();

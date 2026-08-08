(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const exam = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 4 Fracciones/examen und 4-1ESO A.pdf";
  const simulacro = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 4 Fracciones/Simulacro und 4-1ESO A.pdf";
  const banks = {
    "1eso::fracciones y numeros decimales": [
      q("1eso-fracciones-8564e88b33f7", exam, "3. Ejercicio (1 punto): Ordena de menor a mayor: 5/8, 2/3, 11/24, 1, 3/4, −1/2.", ["−1/2<11/24<5/8<2/3<3/4<1", "−1/2<5/8<11/24<2/3<3/4<1", "11/24<−1/2<5/8<3/4<2/3<1", "−1/2<11/24<2/3<5/8<3/4<1"], "Resolución:\n1. Usamos denominador 24: 5/8=15/24, 2/3=16/24, 11/24=11/24, 3/4=18/24 y −1/2=−12/24.\n2. Además, 1=24/24.\n3. Ordenamos los numeradores: −12<11<15<16<18<24.\nComprobación: los valores decimales aumentan en el mismo orden.\nResultado final: −1/2<11/24<5/8<2/3<3/4<1."),
      q("1eso-fracciones-4b18acb72e12", exam, "5. Ejercicio (1,5 puntos): Calcula y simplifica: a) 1/2+1/5−3/4.", ["−1/20", "1/20", "19/20", "−3/20"], "Resolución:\n1. El mínimo común múltiplo de 2, 5 y 4 es 20.\n2. 1/2+1/5−3/4=10/20+4/20−15/20.\n3. (10+4−15)/20=−1/20.\nComprobación: 0,5+0,2−0,75=−0,05.\nResultado final: −1/20."),
      q("1eso-fracciones-6895a5c9b395", simulacro, "3. Ejercicio (1 punto): Ordena de menor a mayor: 7/6, 13/12, 5/4, 1, 9/8, 1/18, −1/3.", ["−1/3<1/18<1<13/12<9/8<7/6<5/4", "−1/3<1/18<1<9/8<13/12<7/6<5/4", "1/18<−1/3<1<13/12<7/6<9/8<5/4", "−1/3<1<1/18<13/12<9/8<7/6<5/4"], "Resolución:\n1. Tomamos denominador común 72: −1/3=−24/72, 1/18=4/72, 1=72/72.\n2. 13/12=78/72, 9/8=81/72, 7/6=84/72 y 5/4=90/72.\n3. Ordenamos los numeradores.\nComprobación: −0,333<0,056<1<1,083<1,125<1,167<1,25.\nResultado final: −1/3<1/18<1<13/12<9/8<7/6<5/4."),
      q("1eso-fracciones-ea0dc3c4c550", simulacro, "5. Ejercicio (1,5 puntos): Calcula y simplifica: d) 5/14:10/7.", ["1/4", "4", "5/28", "7/20"], "Resolución:\n1. Dividir por una fracción equivale a multiplicar por su inversa.\n2. 5/14:10/7=5/14·7/10.\n3. Simplificamos y obtenemos 1/4.\nComprobación: 5/14=0,3571… y 10/7=1,4286…; el cociente es 0,25.\nResultado final: 1/4."),
      q("1eso-fracciones-50a7f5583685", simulacro, "5. Ejercicio (1,5 puntos): Calcula y simplifica: b) 11/12−7/40−2.", ["−151/120", "151/120", "−109/120", "89/120"], "Resolución:\n1. Usamos denominador común 120.\n2. 11/12−7/40−2=110/120−21/120−240/120.\n3. (110−21−240)/120=−151/120.\nComprobación: −151/120≈−1,2583.\nResultado final: −151/120."),
      q("1eso-fracciones-7b04a96ce839", simulacro, "5. Ejercicio (1,5 puntos): Calcula y simplifica: c) (2/5−1/3):(3/4−4/5).", ["−4/3", "4/3", "−3/4", "1/15"], "Resolución:\n1. 2/5−1/3=6/15−5/15=1/15.\n2. 3/4−4/5=15/20−16/20=−1/20.\n3. (1/15):(−1/20)=1/15·(−20)=−4/3.\nComprobación: un positivo dividido por un negativo debe ser negativo.\nResultado final: −4/3."),
      q("1eso-fracciones-31034999e5a0", exam, "4. Ejercicio (1 punto): Convierte la fracción decimal en número decimal: 5/1000.", ["0,005", "0,05", "0,5", "0,0005"], "Resolución:\n1. El denominador 1000 indica tres cifras decimales.\n2. Escribimos 5 como 005 milésimas: 5/1000=0,005.\nComprobación: 0,005·1000=5.\nResultado final: 0,005."),
      q("1eso-fracciones-439043597819", simulacro, "4. Ejercicio (1 punto): Convierte el número decimal en fracción decimal y simplifica: 0,122.", ["61/500", "122/100", "11/100", "122/10000"], "Resolución:\n1. 0,122 tiene tres cifras decimales: 0,122=122/1000.\n2. Simplificamos entre 2: 122/1000=61/500.\nComprobación: 61:500=0,122.\nResultado final: 61/500.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

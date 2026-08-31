(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const eso1 = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 3 Nº Enteros/Simulacro resuelto números enteros.pdf";
  const eso2 = "documentos/2º ESO/Exámenes tipo/2020-2021/Unidad 9 Medidas Teorema de Pitágoras/Examen und  9 Medida Pitagoras-2ESO A.pdf";
  const banks = {
    "1eso::potencias y raices cuadradas": [
      q("1eso-numeros-enteros-0e9ad68b360f", eso1, "7. Ejercicio (2 puntos): Sara tiene 3 baúles; cada baúl contiene 3 cajas, cada caja 3 bolsas y cada bolsa 3 canicas. Escribe en forma de potencia el número de canicas y resuelve.", ["3⁴=81 canicas", "3³=27 canicas", "4³=64 canicas", "3⁵=243 canicas"], "Resolución:\n1. Hay cuatro niveles con factor 3: baúles, cajas por baúl, bolsas por caja y canicas por bolsa.\n2. Total: 3·3·3·3=3⁴.\n3. 3⁴=81.\nComprobación: 3 baúles contienen 9 cajas, 27 bolsas y 81 canicas.\nResultado final: 3⁴=81 canicas.")
    ],
    "1eso::numeros enteros": [
      q("1eso-numeros-enteros-cc4319da140a", eso1, "7. Ejercicio (2 puntos): El ascensor está en el piso 34. Sube 7 plantas, baja 12, sube 9 y baja 18. ¿En qué planta termina? Exprésalo en una sola operación con enteros.", ["Piso 20", "Piso 18", "Piso 32", "Piso 48"], "Resolución:\n1. La operación es 34+7−12+9−18.\n2. 34+7=41; 41−12=29; 29+9=38; 38−18=20.\nComprobación: el cambio total es 7−12+9−18=−14 y 34−14=20.\nResultado final: piso 20.")
    ],
    "1eso::numeros naturales": [
      q("1eso-numeros-enteros-cd4a01952d90", eso1, "Recuperación unidad 2. Calcula el MCM y el MCD de 550, 66 y 99.", ["MCM=4950; MCD=11", "MCM=9900; MCD=1", "MCM=495; MCD=11", "MCM=4950; MCD=22"], "Resolución:\n1. 550=2·5²·11; 66=2·3·11; 99=3²·11.\n2. MCD: factores comunes con menor exponente, 11.\n3. MCM: 2·3²·5²·11=4950.\nComprobación: 4950 es divisible por los tres números y 11 divide a los tres.\nResultado final: MCM=4950; MCD=11."),
      q("1eso-numeros-enteros-a18a3d9455b1-ejercicio-1", eso1, "Recuperación unidad 2. Calcula el MCM y el MCD de 64, 108 y 147.", ["MCM=84 672; MCD=1", "MCM=42336; MCD=2", "MCM=10 584; MCD=1", "MCM=84 672; MCD=3"], "Resolución:\n1. 64=2⁶; 108=2²·3³; 147=3·7².\n2. No existe ningún factor primo común a los tres, luego MCD=1.\n3. MCM=2⁶·3³·7²=64·27·49=84 672.\nComprobación: 84 672/64=1323, /108=784 y /147=576.\nResultado final: MCM=84 672; MCD=1."),
      q("1eso-numeros-enteros-a18a3d9455b1-ejercicio-2", eso1, "Recuperación unidad 2. Dos taxis coinciden en una parada a las 13:15. Uno vuelve cada 15 minutos y el otro cada 20. ¿A qué hora volverán a coincidir?", ["A las 14:15", "A las 13:50", "A las 14:00", "A las 14:35"], "Resolución:\n1. Buscamos el mínimo común múltiplo de 15 y 20.\n2. 15=3·5 y 20=2²·5; MCM=2²·3·5=60 minutos.\n3. Sesenta minutos después de las 13:15 son las 14:15.\nComprobación: en una hora el primer taxi hace 4 ciclos y el segundo 3.\nResultado final: 14:15.")
    ],
    "2eso::figuras planas": [
      q("2eso-figuras-planas-1aa7ac88a8f2", eso2, "3. Ejercicio (2 puntos): En un triángulo equilátero de 6 cm de lado, calcula su altura.", ["3√3 cm", "6√3 cm", "3 cm", "2√6 cm"], "Resolución:\n1. La altura divide el triángulo equilátero en dos triángulos rectángulos con hipotenusa 6 y base 3.\n2. Por Pitágoras: h²=6²−3²=36−9=27.\n3. h=√27=3√3 cm.\nComprobación: 3²+(3√3)²=9+27=36=6².\nResultado final: 3√3 cm.")
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

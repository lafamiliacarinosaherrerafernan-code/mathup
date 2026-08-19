(function () {
  "use strict";

  const banks = {
    "1eso::proporcionalidad": [
      {
        rawBaseId: "1eso-proporcionalidad-625db68ebd2b",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "10.- Una máquina embotelladora llena 240 botellas en 20 minutos. ¿Cuántas botellas llenará en hora y media?",
        options: ["1080 botellas", "720 botellas", "960 botellas", "1200 botellas"],
        correct: 0,
        solution: "Resolución:\n1. Ordenamos los datos:\nBotellas | 240 | x\nTiempo (min) | 20 | 90\n2. Es proporcionalidad directa: al aumentar el tiempo, aumenta el número de botellas en la misma razón.\n3. Igualamos razones: frac{240}{20}=frac{x}{90}.\n4. Multiplicamos en cruz: 20x=240·90.\n5. Despejamos: x=frac{240·90}{20}=1080.\nComprobación: 240/20=12 botellas por minuto y 12·90=1080.\nResultado final: 1080 botellas."
      },
      {
        rawBaseId: "1eso-proporcionalidad-7310aaf89ecf",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "8.- Un camión a 60 km/h tarda 40 minutos en cubrir cierto recorrido. ¿Cuánto tardará un coche a 120 km/h?",
        options: ["20 minutos", "80 minutos", "40 minutos", "30 minutos"],
        correct: 0,
        solution: "Resolución:\n1. Ordenamos los datos:\nVelocidad (km/h) | 60 | 120\nTiempo (min) | 40 | x\n2. Es proporcionalidad inversa: al duplicarse la velocidad, el tiempo se reduce en la misma razón.\n3. Igualamos los productos: 60·40=120·x.\n4. Despejamos: x=frac{60·40}{120}=20.\nComprobación: 60·40=2400 y 120·20=2400.\nResultado final: 20 minutos."
      },
      {
        rawBaseId: "1eso-proporcionalidad-8f20401205c1",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "6.- Tres obreros descargan un camión en dos horas. ¿Cuánto tardarán dos obreros?",
        options: ["3 horas", "frac{4}{3} horas", "2 horas", "4 horas"],
        correct: 0,
        solution: "Resolución:\n1. Ordenamos los datos:\nObreros | 3 | 2\nTiempo (h) | 2 | x\n2. Es proporcionalidad inversa: si disminuye el número de obreros, aumenta el tiempo.\n3. Igualamos los productos: 3·2=2·x.\n4. Despejamos: x=frac{3·2}{2}=3.\nComprobación: en ambos casos se necesitan 6 horas de trabajo de un obrero.\nResultado final: 3 horas."
      },
      {
        rawBaseId: "1eso-proporcionalidad-f7ced70bca5f",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "7.- Trescientos gramos de queso cuestan 6€ ¿Cuánto podré comprar con 4,50€?",
        options: ["225 g", "200 g", "250 g", "275 g"],
        correct: 0,
        solution: "Resolución:\n1. Ordenamos los datos:\nPrecio (€) | 6 | 4,50\nQueso (g) | 300 | x\n2. Es proporcionalidad directa: con menos dinero se compra menos queso.\n3. Igualamos razones: frac{300}{6}=frac{x}{4,50}.\n4. Multiplicamos en cruz y despejamos: x=frac{300·4,50}{6}=225.\nComprobación: 225 g cuestan 225·frac{6}{300}=4,50 €.\nResultado final: 225 g."
      },
      {
        rawBaseId: "1eso-proporcionalidad-c9988181eccf",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "9.- Por 5 días de trabajo he ganado 390 euros. ¿Cuánto ganaré por 18 días?",
        options: ["1404 euros", "1170 euros", "1560 euros", "1350 euros"],
        correct: 0,
        solution: "Resolución:\n1. Ordenamos los datos:\nDías | 5 | 18\nGanancia (€) | 390 | x\n2. Es proporcionalidad directa: al aumentar los días trabajados, aumenta la ganancia.\n3. Igualamos razones: frac{390}{5}=frac{x}{18}.\n4. Despejamos: x=frac{390·18}{5}=1404.\nComprobación: 390/5=78 € diarios y 78·18=1404 €.\nResultado final: 1404 euros."
      },
      {
        rawBaseId: "1eso-proporcionalidad-887e7cf0da73",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "13.- Un camión que carga 3 toneladas necesita 15 viajes para transportar cierta cantidad de arena. ¿Cuántos viajes necesitará para hacer transportar la misma arena un camión que carga 5 toneladas?",
        options: ["9 viajes", "25 viajes", "12 viajes", "7 viajes"],
        correct: 0,
        solution: "Resolución:\n1. Ordenamos los datos:\nCarga (t) | 3 | 5\nViajes | 15 | x\n2. Es proporcionalidad inversa: al aumentar la carga por viaje, disminuye el número de viajes.\n3. Igualamos los productos: 3·15=5·x.\n4. Despejamos: x=frac{3·15}{5}=9.\nComprobación: 3·15=45 t y 5·9=45 t.\nResultado final: 9 viajes."
      },
      {
        rawBaseId: "1eso-proporcionalidad-58ffcd5cb7fe",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "12.- Un corredor de maratón ha avanzado 2,4 km en los 8 primeros minutos de su recorrido. Si mantiene la velocidad, ¿cuánto tardará en completar los 42 km del recorrido?",
        options: ["140 minutos", "126 minutos", "168 minutos", "150 minutos"],
        correct: 0,
        solution: "Resolución:\n1. Ordenamos los datos:\nDistancia (km) | 2,4 | 42\nTiempo (min) | 8 | x\n2. Es proporcionalidad directa: a velocidad constante, una distancia mayor exige más tiempo.\n3. Igualamos razones: frac{2,4}{8}=frac{42}{x}.\n4. Multiplicamos en cruz: 2,4x=8·42.\n5. Despejamos: x=frac{8·42}{2,4}=140.\nComprobación: recorre 2,4/8=0,3 km por minuto y 0,3·140=42 km.\nResultado final: 140 minutos, es decir, 2 horas y 20 minutos."
      },
      {
        rawBaseId: "1eso-proporcionalidad-57aa8d4516bd",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "16.- En un campamento de 25 niños hay provisiones para 30 días. ¿Para cuántos días habrá comida si se incorporan 5 niños a la acampada?",
        options: ["25 días", "36 días", "24 días", "20 días"],
        correct: 0,
        solution: "Resolución:\n1. Tras incorporarse 5 niños habrá 25+5=30 niños.\n2. Ordenamos los datos:\nNiños | 25 | 30\nDías | 30 | x\n3. Es proporcionalidad inversa: al aumentar los niños, disminuyen los días que duran las provisiones.\n4. Igualamos los productos: 25·30=30·x.\n5. Despejamos: x=frac{25·30}{30}=25.\nComprobación: hay 750 raciones diarias individuales; 750/30=25 días.\nResultado final: 25 días."
      },
      {
        rawBaseId: "1eso-proporcionalidad-c1848c19ab72",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "15.- Un ganadero tiene 20 vacas y pienso para alimentarlas durante 30 días. ¿Cuánto tiempo le durará el pienso si se mueren 5 vacas?",
        options: ["40 días", "25 días", "35 días", "45 días"],
        correct: 0,
        solution: "Resolución:\n1. Quedan 20−5=15 vacas.\n2. Ordenamos los datos:\nVacas | 20 | 15\nDías | 30 | x\n3. Es proporcionalidad inversa: al disminuir el número de vacas, el pienso dura más días.\n4. Igualamos los productos: 20·30=15·x.\n5. Despejamos: x=frac{20·30}{15}=40.\nComprobación: 20·30=600 y 15·40=600 raciones.\nResultado final: 40 días."
      },
      {
        rawBaseId: "1eso-proporcionalidad-e310ba1f7c13",
        source: "documentos/1º ESO/Ejercicios/proporcionalidad1_eso.pdf",
        text: "20.- En el aparcamiento de unos grandes almacenes hay 280 coches, de los que el 35 % son blancos. ¿Cuántos coches hay no blancos?",
        options: ["182 coches", "98 coches", "196 coches", "245 coches"],
        correct: 0,
        solution: "Resolución:\n1. Si el 35 % son blancos, el porcentaje de coches no blancos es 100 %−35 %=65 %.\n2. Convertimos el porcentaje en factor: 65 %=frac{65}{100}=0,65.\n3. Calculamos: 280·0,65=182.\nComprobación: los blancos son 280·0,35=98 y 98+182=280.\nResultado final: 182 coches no blancos."
      }
    ],
    "1bach-mates::aplicacion de derivadas": [
      {
        rawBaseId: "1bach-mates-aplicacion-de-derivadas-6abc077e12e9",
        source: "documentos/1º Bachillerato Mates I/Fuentes de ejercicios/Ejercicios derivadas 1º BAchillerato más.pdf",
        text: "EJERCICIO 14 - Halla la ecuación de la recta de pendiente −4 que sea tangente a la curva y = x⁴ + 2.",
        options: ["y=−4x−1", "y=−4x+3", "y=4x+7", "y=−x−2"],
        correct: 0,
        solution: "Resolución:\n1. La pendiente de la tangente es f'(x). Como f(x)=x⁴+2, f'(x)=4x³.\n2. Imponemos la pendiente indicada: 4x³=−4.\n3. Dividimos entre 4: x³=−1, luego x=−1.\n4. Calculamos el punto de tangencia: f(−1)=(−1)⁴+2=3; por tanto, P=(−1,3).\n5. Usamos la ecuación punto-pendiente: y−3=−4(x+1).\n6. Simplificamos: y−3=−4x−4, luego y=−4x−1.\nComprobación: la recta pasa por (−1,3) y f'(−1)=−4.\nResultado final: y=−4x−1."
      },
      {
        rawBaseId: "1bach-mates-aplicacion-de-derivadas-2bda21216d63",
        source: "documentos/1º Bachillerato Mates I/Fuentes de ejercicios/Ejercicios derivadas 1º BAchillerato más.pdf",
        text: "EJERCICIO 26 : Halla los intervalos de crecimiento y de decrecimiento de las funciones:\na) f(x)=8x−x²",
        options: ["Crece en (−∞,4) y decrece en (4,+∞)", "Decrece en (−∞,4) y crece en (4,+∞)", "Crece en todo ℝ", "Decrece en todo ℝ"],
        correct: 0,
        solution: "Resolución:\n1. Derivamos: f'(x)=8−2x.\n2. Buscamos los puntos críticos: 8−2x=0, luego x=4.\n3. Probamos x=0 en (−∞,4): f'(0)=8>0.\n4. Probamos x=5 en (4,+∞): f'(5)=−2<0.\n[[signchart points=\"−∞|4|+∞\" signs=\"+|−\" arrows=\"↑|↓\"]]\n5. Como f'(x)>0 antes de 4, la función crece en (−∞,4). Como f'(x)<0 después de 4, decrece en (4,+∞).\n6. La derivada cambia de + a −; por tanto, hay un máximo relativo en x=4. Su ordenada es f(4)=8·4−4²=16.\nComprobación: f'(3)=2>0 y f'(5)=−2<0.\nResultado final: crece en (−∞,4), decrece en (4,+∞) y tiene un máximo relativo en (4,16)."
      }
    ],
    "1bach-ccss::distribucion normal": [
      {
        rawBaseId: "1bach-ccss-distribucion-normal-ab6c78758dba",
        source: "documentos/1º BACHILLERATO CCSSI/4-Distribuciones continuas. Distribuición normal Ejercicios.doc",
        text: "19. La altura de las alumnas de la ESO sigue una distribución normal de 165 cm de media y una desviación típica de 15 cm.\na) ¿Cuál es la probabilidad de que una persona mida más de 180 centímetros?.",
        options: ["0,1587", "0,8413", "0,6826", "0,3413"],
        correct: 0,
        solution: "Resolución:\n1. Sea X~N(165,15). Tipificamos dentro del suceso:\nP(X>180)=Pparen{Z>frac{180−165}{15}}=P(Z>1).\n2. La tabla proporciona P(Z≤1)=0,8413.\n3. Usamos el complemento: P(Z>1)=1−0,8413=0,1587.\nComprobación: 0≤0,1587≤1. En porcentaje es 15,87 %.\nResultado final: 0,1587, es decir, 15,87 %."
      },
      {
        rawBaseId: "1bach-ccss-distribucion-normal-6009f48bbd10",
        source: "documentos/1º BACHILLERATO CCSSI/4-Distribuciones continuas. Distribuición normal Ejercicios.doc",
        text: "19. La altura de las alumnas de la ESO sigue una distribución normal de 165 cm de media y una desviación típica de 15 cm.\nb) Si en el instituto hay 350 alumnas que cursan la ESO, ¿cuántas alumnas se espera que midan más de 180 cm?.",
        options: ["Aproximadamente 56 alumnas", "Aproximadamente 294 alumnas", "Aproximadamente 119 alumnas", "Aproximadamente 159 alumnas"],
        correct: 0,
        solution: "Resolución:\n1. Sea X~N(165,15). Tipificamos dentro del suceso:\nP(X>180)=Pparen{Z>frac{180−165}{15}}=P(Z>1).\n2. P(Z>1)=1−P(Z≤1)=1−0,8413=0,1587.\n3. Multiplicamos la probabilidad por el número de alumnas: 350·0,1587=55,545.\n4. Como se pide un número de personas, redondeamos a la alumna más próxima.\nComprobación: 56/350=0,16, próximo a 0,1587.\nResultado final: aproximadamente 56 alumnas."
      },
      {
        rawBaseId: "1bach-ccss-distribucion-normal-49744f72101d",
        source: "documentos/1º BACHILLERATO CCSSI/4-Distribuciones continuas. Distribuición normal Ejercicios.doc",
        text: "9. Un taller ha observado que la permanencia de los coches hasta ser reparados y salir del taller sigue una distribución normal de media 9 días y desviación típica 2,5.\nb) ¿Cuál la probabilidad de que un coche permanezca más de cinco días?.",
        options: ["0,9452", "0,0548", "0,8904", "0,4452"],
        correct: 0,
        solution: "Resolución:\n1. Sea X~N(9;2,5). Tipificamos dentro del suceso:\nP(X>5)=Pparen{Z>frac{5−9}{2,5}}=P(Z>−1,6).\n2. Por simetría, P(Z>−1,6)=P(Z<1,6).\n3. Consultamos la tabla: P(Z<1,6)=0,9452.\nComprobación: como 5 está 1,6 desviaciones por debajo de la media, la probabilidad de superar 5 debe ser alta; 0,9452 es coherente.\nResultado final: 0,9452, es decir, 94,52 %."
      },
      {
        rawBaseId: "1bach-ccss-distribucion-normal-220c6896a6a0",
        source: "documentos/1º BACHILLERATO CCSSI/4-Distribuciones continuas. Distribuición normal Ejercicios.doc",
        text: "9. Un taller ha observado que la permanencia de los coches hasta ser reparados y salir del taller sigue una distribución normal de media 9 días y desviación típica 2,5.\nc) ¿Cuál la probabilidad de que un coches esté comprendido entre siete y diez días?.",
        options: ["0,4435", "0,2119", "0,6554", "0,8673"],
        correct: 0,
        solution: "Resolución:\n1. Sea X~N(9;2,5). Tipificamos los dos extremos dentro del suceso:\nP(7≤X≤10)=Pparen{frac{7−9}{2,5}≤Z≤frac{10−9}{2,5}}=P(−0,8≤Z≤0,4).\n2. La tabla da P(Z≤0,4)=0,6554 y P(Z≤0,8)=0,7881.\n3. Por simetría, P(Z≤−0,8)=1−0,7881=0,2119.\n4. Restamos las probabilidades acumuladas: 0,6554−0,2119=0,4435.\nComprobación: 0≤0,4435≤1.\nResultado final: 0,4435, es decir, 44,35 %."
      }
    ]
  };

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function build(courseId, theme) {
    return [...(banks[`${courseId}::${normalize(theme)}`] || [])];
  }

  window.MargaritaSourceVerified = { build };
})();

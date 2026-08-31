(function () {
  "use strict";

  const WORKBOOK_SOURCE = "Formas de contar · cuadernillo 2022 · enunciado original";
  const EXERCISES_SOURCE = "Ejercicios de combinatoria · enunciado original";

  function item(id, source, difficulty, text, correct, distractors, solution) {
    return {
      id: `combinatoria-fuente-${id}`,
      source,
      difficulty,
      text,
      options: [String(correct), ...distractors.map(String)],
      correct: 0,
      solution: `Resolución:\n${solution}\nResultado final: ${correct}.`
    };
  }

  // Solo se incorporan los enunciados y sus apartados. Las soluciones
  // editoriales de los PDF no forman parte de este banco.
  const questions = [
    item(
      "capicuas-cinco-cifras",
      WORKBOOK_SOURCE,
      "easy",
      "¿Cuántos números capicúas de cinco cifras podemos formar?",
      900,
      [1000, 810, 90],
      "1. Un capicúa de cinco cifras tiene la forma abcba.\n2. Para a hay 9 posibilidades, porque no puede ser 0.\n3. Para b y c hay 10 posibilidades en cada caso.\n4. Aplicamos el principio multiplicativo: 9·10·10=900."
    ),
    item(
      "tres-pesas",
      WORKBOOK_SOURCE,
      "easy",
      "Con tres pesas de 1, 2 y 3 kg, ¿cuántas pesadas distintas podemos hacer?",
      7,
      [6, 8, 9],
      "1. Podemos elegir una, dos o las tres pesas.\n2. Sumamos las combinaciones: C(3,1)+C(3,2)+C(3,3).\n3. Calculamos: 3+3+1=7."
    ),
    item(
      "palabra-roma",
      WORKBOOK_SOURCE,
      "easy",
      "¿Cuántas palabras distintas, tengan o no sentido, se pueden formar con todas las letras de la palabra ROMA?",
      24,
      [16, 12, 20],
      "1. Las cuatro letras son distintas y se utilizan todas.\n2. Por tanto, contamos permutaciones de 4 elementos.\n3. P₄=4!=4·3·2·1=24."
    ),
    item(
      "cine-chicas-juntas",
      WORKBOOK_SOURCE,
      "medium",
      "Cinco amigos, dos chicas y tres chicos van al cine y se sientan en una fila en la que hay cinco butacas. ¿De cuántas formas distintas se pueden sentar si las chicas se sientan juntas?",
      48,
      [24, 72, 120],
      "1. Consideramos a las dos chicas como un solo bloque.\n2. Ordenamos el bloque y los tres chicos: 4! formas.\n3. Dentro del bloque, las dos chicas pueden intercambiarse: 2! formas.\n4. Total: 4!·2!=24·2=48."
    ),
    item(
      "dados-sumas-6-8-10",
      WORKBOOK_SOURCE,
      "easy",
      "Si lanzamos al aire 2 dados y sumamos los resultados de las caras superiores, ¿de cuántas formas se puede obtener que el resultado de la suma sea 6, 8 o 10?",
      13,
      [15, 12, 11],
      "1. Para suma 6 hay 5 parejas ordenadas.\n2. Para suma 8 hay 5 parejas ordenadas.\n3. Para suma 10 hay 3 parejas ordenadas.\n4. Los casos son incompatibles, así que sumamos: 5+5+3=13."
    ),
    item(
      "turistas-habitaciones",
      WORKBOOK_SOURCE,
      "easy",
      "Llegan 3 turistas a la recepción de un hotel. Existen 5 habitaciones libres. ¿De cuántas maneras posibles pueden acomodarse los 3 turistas, uno en cada habitación?",
      60,
      [10, 15, 125],
      "1. Importa qué habitación ocupa cada turista y no se puede repetir habitación.\n2. Son variaciones sin repetición de 5 elementos tomados de 3 en 3.\n3. V(5,3)=5·4·3=60."
    ),
    item(
      "numeros-012-total",
      WORKBOOK_SOURCE,
      "easy",
      "Halla la cantidad de números de cinco cifras que no empiecen por cero que podemos formar con las cifras 0, 1 y 2.",
      162,
      [243, 81, 160],
      "1. La primera cifra puede ser 1 o 2: 2 posibilidades.\n2. Cada una de las otras cuatro posiciones admite 0, 1 o 2: 3 posibilidades.\n3. Total: 2·3⁴=2·81=162."
    ),
    item(
      "numeros-012-extremos",
      WORKBOOK_SOURCE,
      "medium",
      "Halla la cantidad de números de cinco cifras que no empiecen por cero que podemos formar con las cifras 0, 1 y 2.\nApartado: ¿Cuántos de ellos empiezan y terminan por la misma cifra?",
      54,
      [27, 81, 108],
      "1. La primera y la última cifra deben ser las dos 1 o las dos 2: 2 casos.\n2. En las tres posiciones interiores puede aparecer cualquiera de las 3 cifras.\n3. Total: 2·3³=2·27=54."
    ),
    item(
      "urna-reemplazamiento-total",
      WORKBOOK_SOURCE,
      "easy",
      "Una urna contiene 8 bolas numeradas del 1 al 8. Se extraen de la urna, una a una, 3 bolas y se anota el número que se forma. Si la extracción se hace con reemplazamiento:\nApartado a) ¿Cuántos números podemos formar?",
      512,
      [336, 256, 24],
      "1. Al haber reemplazamiento, en cada extracción vuelven a estar disponibles las 8 bolas.\n2. Hay 8 posibilidades para cada una de las 3 posiciones.\n3. VR(8,3)=8³=512."
    ),
    item(
      "urna-reemplazamiento-pares",
      WORKBOOK_SOURCE,
      "medium",
      "Una urna contiene 8 bolas numeradas del 1 al 8. Se extraen de la urna, una a una, 3 bolas y se anota el número que se forma. Si la extracción se hace con reemplazamiento:\nApartado b) ¿Cuántos son pares?",
      256,
      [512, 128, 64],
      "1. Las dos primeras cifras tienen 8 posibilidades cada una.\n2. La última debe ser 2, 4, 6 u 8: 4 posibilidades.\n3. Total: 8·8·4=256."
    ),
    item(
      "urna-reemplazamiento-capicuas",
      WORKBOOK_SOURCE,
      "medium",
      "Una urna contiene 8 bolas numeradas del 1 al 8. Se extraen de la urna, una a una, 3 bolas y se anota el número que se forma. Si la extracción se hace con reemplazamiento:\nApartado c) ¿Cuántos son capicúa?",
      64,
      [56, 128, 512],
      "1. El número capicúa tiene la forma aba.\n2. Elegimos a de 8 maneras y b de 8 maneras.\n3. La tercera cifra queda determinada por la primera.\n4. Total: 8·8=64."
    ),
    item(
      "sirena-cuatro-sin-repetir",
      WORKBOOK_SOURCE,
      "medium",
      "Con las letras de la palabra SIRENA:\nApartado a) ¿Cuántas palabras, con o sin sentido, de 4 letras sin repetir se pueden confeccionar?",
      360,
      [1296, 120, 720],
      "1. Hay 6 letras distintas, importa el orden y no se repiten.\n2. Son variaciones sin repetición de 6 elementos tomados de 4 en 4.\n3. V(6,4)=6·5·4·3=360."
    ),
    item(
      "sirena-cinco-repeticion",
      WORKBOOK_SOURCE,
      "medium",
      "Con las letras de la palabra SIRENA:\nApartado b) ¿Cuántas palabras de cinco letras, con o sin sentido, se pueden confeccionar?",
      7776,
      [720, 360, 3125],
      "1. El enunciado no prohíbe repetir letras.\n2. Para cada una de las 5 posiciones hay 6 posibilidades.\n3. VR(6,5)=6⁵=7776."
    ),
    item(
      "sirena-menos-cuatro",
      WORKBOOK_SOURCE,
      "hard",
      "Con las letras de la palabra SIRENA:\nApartado c) ¿Cuántas palabras de menos de cuatro letras, con o sin sentido, se pueden confeccionar?",
      258,
      [216, 252, 1296],
      "1. Contamos palabras de 1, 2 y 3 letras y se permite repetir.\n2. Sumamos VR(6,1)+VR(6,2)+VR(6,3).\n3. Calculamos: 6+6²+6³=6+36+216=258."
    ),
    item(
      "seis-amigas-cine",
      WORKBOOK_SOURCE,
      "easy",
      "La tarde del sábado, 6 amigas deciden ir al cine.\nApartado a) ¿De cuántas formas pueden sentarse en 6 butacas contiguas?",
      720,
      [120, 36, 240],
      "1. Se ordenan 6 personas distintas en 6 asientos.\n2. Son permutaciones de 6 elementos.\n3. P₆=6!=720."
    ),
    item(
      "seis-amigas-dos-juntas",
      WORKBOOK_SOURCE,
      "medium",
      "La tarde del sábado, 6 amigas deciden ir al cine.\nApartado b) Si Ángela y Beatriz tienen que estar sentadas una al lado de la otra, ¿de cuántas formas pueden sentarse las 6 amigas?",
      240,
      [120, 720, 48],
      "1. Tratamos a Ángela y Beatriz como un bloque.\n2. Ordenamos el bloque y las otras cuatro amigas: 5! formas.\n3. Ángela y Beatriz pueden permutarse dentro del bloque: 2! formas.\n4. Total: 5!·2!=120·2=240."
    ),
    item(
      "codigo-tres-cincos-dos-ochos",
      WORKBOOK_SOURCE,
      "hard",
      "Una persona ha olvidado el código de su caja fuerte. Sólo recuerda que el código de cinco cifras que abre su caja fuerte tiene 3 cincos y 2 ochos. ¿Cuántos son los posibles códigos de su caja fuerte?",
      10,
      [20, 120, 6],
      "1. Se ordenan 5 cifras, pero hay 3 cincos iguales y 2 ochos iguales.\n2. Aplicamos permutaciones con repetición.\n3. P₅^(3,2)=frac{5!}{3!·2!}=frac{120}{12}=10."
    ),
    item(
      "triangulos-seis-puntos",
      WORKBOOK_SOURCE,
      "medium",
      "¿Cuántos triángulos se pueden formar con 6 puntos del plano si tres de ellos nunca están alineados?",
      20,
      [18, 24, 120],
      "1. Un triángulo queda determinado al elegir 3 puntos.\n2. El orden de elección no importa.\n3. C(6,3)=frac{6!}{3!·3!}=20."
    ),
    item(
      "examen-ocho-de-diez",
      EXERCISES_SOURCE,
      "medium",
      "Un estudiante tiene que contestar 8 de las 10 preguntas de un examen. ¿De cuántas formas diferentes puede contestar?",
      45,
      [80, 90, 10],
      "1. Debe elegir 8 preguntas entre 10 y el orden no importa.\n2. Calculamos C(10,8)=C(10,2).\n3. C(10,2)=frac{10·9}{2}=45."
    ),
    item(
      "examen-tres-obligatorias",
      EXERCISES_SOURCE,
      "hard",
      "Un estudiante tiene que contestar 8 de las 10 preguntas de un examen.\nApartado: ¿De cuántas formas puede contestar si las tres primeras son obligatorias?",
      21,
      [35, 45, 10],
      "1. Las 3 primeras ya están elegidas.\n2. Faltan 5 preguntas entre las otras 7.\n3. C(7,5)=C(7,2)=frac{7·6}{2}=21."
    ),
    item(
      "examen-cuatro-primeras-cinco",
      EXERCISES_SOURCE,
      "hard",
      "Un estudiante tiene que contestar 8 de las 10 preguntas de un examen.\nApartado: ¿De cuántas formas puede contestar si de las cinco primeras ha de contestar a cuatro?",
      25,
      [20, 45, 10],
      "1. Elegimos 4 de las 5 primeras: C(5,4).\n2. Para completar 8 respuestas, elegimos también 4 de las 5 últimas: C(5,4).\n3. Aplicamos el principio multiplicativo: C(5,4)·C(5,4)=5·5=25."
    ),
    item(
      "domino-siete-fichas",
      EXERCISES_SOURCE,
      "medium",
      "Para jugar al dominó, siete fichas hacen un juego. Sabiendo que tiene 28 fichas, ¿cuántos juegos diferentes se pueden hacer?",
      1184040,
      [376740, 2598960, 196],
      "1. Elegimos 7 fichas entre 28 y el orden no importa.\n2. Calculamos C(28,7)=frac{28!}{7!·21!}.\n3. Al simplificar obtenemos 1184040."
    ),
    item(
      "iniciales-ciudad",
      EXERCISES_SOURCE,
      "hard",
      "Hallar el número mínimo de habitantes que debe tener una ciudad para que sea inevitable que al menos dos habitantes tengan las mismas iniciales de su nombre y dos apellidos. (Se supone que el alfabeto tiene 28 letras.)",
      21953,
      [21952, 2352, 784],
      "1. Una terna de iniciales tiene 28 posibilidades para cada posición.\n2. Hay 28³=21952 ternas posibles.\n3. Por el principio del palomar, con una persona más alguna terna debe repetirse.\n4. Mínimo: 21952+1=21953."
    ),
    item(
      "baraja-cinco-cartas",
      EXERCISES_SOURCE,
      "medium",
      "Con una baraja de 52 cartas, ¿cuántos grupos diferentes de cinco cartas se pueden hacer?",
      2598960,
      [1184040, 311875200, 270725],
      "1. Elegimos 5 cartas entre 52 y el orden no importa.\n2. Calculamos C(52,5)=frac{52!}{5!·47!}.\n3. Al simplificar se obtiene 2598960."
    ),
    item(
      "quiniela-cinco-resultados",
      EXERCISES_SOURCE,
      "medium",
      "¿Cuántas apuestas hay que rellenar en las quinielas de fútbol para tener la seguridad de acertar cinco resultados?",
      243,
      [15, 125, 729],
      "1. Cada resultado admite tres signos: 1, X o 2.\n2. Las cinco elecciones son independientes y se permite repetir signo.\n3. Aplicamos el principio multiplicativo: 3⁵=243."
    ),
    item(
      "doce-alumnos-tres-equipos",
      EXERCISES_SOURCE,
      "hard",
      "De un grupo de 12 alumnos deben formarse tres equipos de cuatro participantes para que asistan a tres pruebas diferentes. ¿Cuántas clasificaciones distintas pueden realizarse?",
      34650,
      [5775, 11880, 495],
      "1. Las tres pruebas son diferentes, por lo que los equipos quedan identificados por la prueba.\n2. Elegimos 4 alumnos para la primera, 4 de los 8 restantes para la segunda y los 4 últimos para la tercera.\n3. C(12,4)·C(8,4)·C(4,4)=495·70·1=34650."
    ),
    item(
      "tetraedros-ocho-puntos",
      EXERCISES_SOURCE,
      "medium",
      "¿Cuántos tetraedros determinan ocho puntos del espacio de forma que cuatro cualesquiera de ellos no sean coplanarios?",
      70,
      [56, 1680, 28],
      "1. Cada tetraedro queda determinado por 4 puntos.\n2. El orden no importa y cualquier elección es válida por la condición dada.\n3. C(8,4)=frac{8!}{4!·4!}=70."
    ),
    item(
      "foto-hombres-mujeres-bloques",
      EXERCISES_SOURCE,
      "hard",
      "En un departamento de una empresa trabajan cuatro hombres y tres mujeres. Desean que les hagan una fotografía de forma que estén todos los hombres juntos y también las mujeres. ¿De cuántas formas distintas pueden colocarse?",
      288,
      [144, 5040, 72],
      "1. Consideramos dos bloques: hombres y mujeres.\n2. Los bloques pueden ordenarse de 2! formas.\n3. Dentro de ellos hay 4! y 3! ordenaciones, respectivamente.\n4. Total: 2!·4!·3!=2·24·6=288."
    ),
    item(
      "tres-dados-iguales",
      EXERCISES_SOURCE,
      "hard",
      "¿Cuántos resultados distintos se obtienen al lanzar tres dados iguales a la vez?",
      56,
      [216, 120, 36],
      "1. Al ser iguales, el orden de los tres resultados no distingue casos.\n2. Contamos combinaciones con repetición de 6 valores tomados de 3 en 3.\n3. CR(6,3)=C(6+3−1,3)=C(8,3)=56."
    ),
    item(
      "tres-dados-distintos",
      EXERCISES_SOURCE,
      "medium",
      "¿Cuántos resultados distintos se obtienen al lanzar tres dados distintos a la vez?",
      216,
      [56, 18, 36],
      "1. Cada dado se distingue de los otros.\n2. Para cada uno hay 6 resultados posibles.\n3. Total: 6·6·6=6³=216."
    ),
    item(
      "diagonales-poligono-doce",
      EXERCISES_SOURCE,
      "medium",
      "Calcula el número de diagonales que tiene un polígono de 12 lados.",
      54,
      [66, 60, 48],
      "1. Cada par de vértices determina un segmento: C(12,2)=66.\n2. De esos segmentos, 12 son lados.\n3. Diagonales: 66−12=54."
    ),
    item(
      "diagonales-poligono-n",
      EXERCISES_SOURCE,
      "hard",
      "Calcula el número de diagonales que tiene un polígono de n lados.",
      "frac{n(n−3)}{2}",
      ["frac{n(n−1)}{2}", "n(n−3)", "frac{(n−2)(n−3)}{2}"],
      "1. Los pares de vértices son C(n,2)=frac{n(n−1)}{2}.\n2. Restamos los n lados.\n3. frac{n(n−1)}{2}−n=frac{n(n−3)}{2}."
    ),
    item(
      "ocho-monedas-cuatro-cuatro",
      EXERCISES_SOURCE,
      "medium",
      "Se disponen ocho monedas en una fila. La mitad de ellas son de duro y la otra mitad de 100 pesetas. ¿De cuántas formas distintas se pueden ordenar?",
      70,
      [40320, 1680, 35],
      "1. Ordenamos 8 monedas con dos grupos de 4 monedas iguales.\n2. Aplicamos permutaciones con repetición.\n3. P₈^(4,4)=frac{8!}{4!·4!}=70."
    ),
    item(
      "cola-cinco-personas",
      EXERCISES_SOURCE,
      "easy",
      "¿De cuántas maneras pueden formarse cinco personas para tomar el autobús?",
      120,
      [25, 60, 720],
      "1. Se ordenan 5 personas distintas.\n2. Son permutaciones de 5 elementos.\n3. P₅=5!=120."
    ),
    item(
      "cola-cinco-dos-no-juntas",
      EXERCISES_SOURCE,
      "hard",
      "¿De cuántas maneras pueden formarse cinco personas para tomar el autobús si dos de las personas se niegan a hacerlo una detrás de otra?",
      72,
      [48, 96, 120],
      "1. Sin restricción hay 5!=120 filas.\n2. Si las dos personas están juntas, formamos un bloque: 4!·2!=48 filas.\n3. Restamos los casos prohibidos: 120−48=72."
    ),
    item(
      "statistics-todas",
      EXERCISES_SOURCE,
      "hard",
      "¿Cuántas permutaciones diferentes hay de las letras de la palabra «statistics»?",
      50400,
      [3628800, 100800, 3360],
      "1. La palabra tiene 10 letras, con s repetida 3 veces, t repetida 3 veces e i repetida 2 veces.\n2. Aplicamos permutaciones con repetición.\n3. frac{10!}{3!·3!·2!}=50400."
    ),
    item(
      "statistics-extremos-s",
      EXERCISES_SOURCE,
      "hard",
      "¿Cuántas permutaciones diferentes de las letras de la palabra «statistics» comienzan y terminan con la letra s?",
      3360,
      [50400, 6720, 560],
      "1. Fijamos una s en cada extremo.\n2. Quedan 8 letras, con t repetida 3 veces e i repetida 2 veces.\n3. frac{8!}{3!·2!}=3360."
    ),
    item(
      "test-veinte-siete-correctas",
      EXERCISES_SOURCE,
      "medium",
      "En un test de 20 preguntas con dos opciones:\nApartado a) ¿De cuántas formas pueden marcarse las preguntas para que siete estén correctas y 13 equivocadas?",
      77520,
      [184756, 1351, 390700800],
      "1. Basta elegir cuáles son las 7 preguntas correctas; las demás quedan determinadas como incorrectas.\n2. El orden de elección no importa.\n3. C(20,7)=77520."
    ),
    item(
      "test-veinte-diez-correctas",
      EXERCISES_SOURCE,
      "medium",
      "En un test de 20 preguntas con dos opciones:\nApartado b) ¿De cuántas formas pueden marcarse las preguntas para que 10 estén correctas y 10 equivocadas?",
      184756,
      [77520, 1351, 1024],
      "1. Elegimos las 10 preguntas correctas entre las 20.\n2. Las otras 10 quedan determinadas como incorrectas.\n3. C(20,10)=184756."
    ),
    item(
      "test-veinte-al-menos-diecisiete",
      EXERCISES_SOURCE,
      "hard",
      "En un test de 20 preguntas con dos opciones:\nApartado c) ¿De cuántas formas pueden marcarse las preguntas para que cuando menos 17 estén correctas?",
      1351,
      [1140, 184756, 211],
      "1. «Cuando menos 17» significa 17, 18, 19 o 20 aciertos.\n2. Sumamos C(20,17)+C(20,18)+C(20,19)+C(20,20).\n3. Calculamos: 1140+190+20+1=1351."
    ),
    item(
      "naturales-menores-mil-cifras-distintas",
      EXERCISES_SOURCE,
      "hard",
      "¿Cuántos números naturales, incluido el cero, hay que sean menores que 1000, si cada número está constituido por cifras diferentes?",
      739,
      [648, 738, 820],
      "1. De una cifra, incluido el 0, hay 10 números.\n2. De dos cifras: 9 opciones para la primera y 9 para la segunda, en total 81.\n3. De tres cifras: 9·9·8=648.\n4. Sumamos: 10+81+648=739."
    )
  ];

  function courseAccepts(courseId, theme) {
    const lower = String(theme || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    if (courseId === "4eso-b") return lower.includes("combinatoria");
    if (courseId === "1bach-ccss") return lower.includes("combinatoria");
    if (courseId === "1bach-mates") return lower.includes("probabilidad");
    return false;
  }

  function build(courseId, theme, difficulty = null) {
    if (!courseAccepts(courseId, theme)) return [];
    if (!difficulty || courseId !== "4eso-b") return questions.map((question) => ({ ...question }));
    const accepted = difficulty === "easy"
      ? new Set(["easy"])
      : difficulty === "medium"
        ? new Set(["easy", "medium"])
        : new Set(["medium", "hard"]);
    return questions
      .filter((question) => accepted.has(question.difficulty))
      .map((question) => ({ ...question }));
  }

  function pick(courseId, theme, difficulty, seed) {
    const bank = build(courseId, theme, difficulty);
    if (!bank.length) return null;
    return { ...bank[Math.abs(Number(seed) || 0) % bank.length] };
  }

  window.COMBINATORICS_SOURCE_BANK = questions;
  window.MargaritaCombinatoricsSupplied = { build, pick };
})();

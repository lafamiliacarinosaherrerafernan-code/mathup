(function () {
  "use strict";
  const q = (rawBaseId, source, text, options, solution) => ({ rawBaseId, source, sourceKind: "exam", difficulty: "hard", text, options, correct: 0, solution });
  const rhombusExam = "documentos/1º ESO/Exámenes tipo/2020-2021/Unidad 8 y 9 rectas ángulso Polígonos/examen und 8,9 Rectas ángulos Polígonos.pdf";
  const flatExam = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 1/examen 4º ESO UNID 1.pdf";
  const salaryExam = "documentos/4º ESO B/Exámenes tipo/2021-2022/Unidad 1/Simulacro 4º ESO ACAD UNID 1.pdf";
  const banks = {
    "1eso::medida, angulos, rectas y circunferencias": [
      q(
        "1eso-medida-angulos-rectas-y-circunferencias-0add0fc8e9e8",
        rhombusExam,
        "6. Ejercicio (1,5 puntos): En un rombo cuya diagonal mayor mide 16 centímetros y su lado es de 20 cm, ¿cuánto mide su diagonal menor?",
        ["8√21 cm ≈ 36,66 cm", "4√21 cm ≈ 18,33 cm", "32 cm", "12 cm"],
        "Resolución:\n1. Las diagonales de un rombo son perpendiculares y se cortan en sus puntos medios. La mitad de la diagonal mayor mide 16:2=8 cm.\n2. Si d es la diagonal menor, sus semidiagonales y un lado forman un triángulo rectángulo: 20²=8²+(d/2)².\n3. (d/2)²=400−64=336, por lo que d/2=√336=4√21 cm.\n4. d=2·4√21=8√21 cm≈36,66 cm.\nComprobación: 8²+(4√21)²=64+336=400=20².\nResultado final: 8√21 cm≈36,66 cm."
      )
    ],
    "4eso-b::numeros reales": [
      q(
        "4eso-b-numeros-reales-2778528729bf",
        flatExam,
        "4. Ejercicio: Un piso cuesta 80.000 € a comienzos del año 2000. Si durante 10 años ha sufrido los siguientes descensos y aumentos cual será el precio del piso al finalizar el año 2010: 2000 ↑20%; 2001 ↑10%; 2002 ↑13%; 2003 ↓3%; 2004 ↑5%; 2005 ↑2%; 2006 ↓12%; 2007 ↓16%; 2008 ↓7%; 2009 ↓5%.",
        ["80.960,29 €", "81.600,00 €", "101.200,00 €", "80.000,00 €"],
        "Resolución:\n1. Un aumento del p % se representa con el factor 1+p/100 y un descenso con 1−p/100.\n2. Aplicamos los factores sucesivos al precio inicial:\n80.000·1,20·1,10·1,13·0,97·1,05·1,02·0,88·0,84·0,93·0,95=80.960,294416522752.\n3. Redondeando a céntimos, el precio es 80.960,29 €.\nComprobación: cada flecha ascendente se ha convertido en un factor mayor que 1 y cada flecha descendente en uno menor que 1; los porcentajes no se han sumado porque se aplican a cantidades sucesivas.\nResultado final: 80.960,29 €."
      ),
      q(
        "4eso-b-numeros-reales-1ef49a8995d7",
        salaryExam,
        "4. Ejercicio: Natalia, la nueva directora de RRHH, debe ver el salario final de dos trabajadores que comenzaron ganando 850 €, con los siguientes aumentos y disminuciones de salario a lo largo de los años. Como no asistió a la clase de mates, no sabe hacerlo. Le podrías indicar quien cobra más al finalizar el año 2016. David: 2008 ↑5%; 2009 ↑3%; 2010 ↓3%; 2011 ↑5%; 2012 ↑2%; 2013 ↓2%; 2014 ↑11%; 2015 ↓7%; 2016 ↓5%. Eduardo: 2008 ↓2%; 2009 ↓3%; 2010 ↓5%; 2011 ↓1%; 2012 ↑5%; 2013 ↓1%; 2014 ↑12%; 2015 ↑15%; 2016 ↓1%.",
        ["Eduardo: 1.007,28 €; David: 917,83 €", "David: 1.007,28 €; Eduardo: 917,83 €", "Eduardo: 935,00 €; David: 926,50 €", "David y Eduardo: 850,00 €"],
        "Resolución:\n1. Sustituimos cada aumento por 1+p/100 y cada descenso por 1−p/100.\n2. Salario de David:\n850·1,05·1,03·0,97·1,05·1,02·0,98·1,11·0,93·0,95=917,830029713982525≈917,83 €.\n3. Salario de Eduardo:\n850·0,98·0,97·0,95·0,99·1,05·0,99·1,12·1,15·0,99=1.007,2820315772522≈1.007,28 €.\n4. Comparamos: 1.007,28>917,83.\nComprobación: se han aplicado en orden las nueve flechas de cada fila; no se suman porcentajes sucesivos.\nResultado final: Eduardo cobra más; 1.007,28 € frente a 917,83 € de David."
      )
    ]
  };
  const previous = window.MargaritaEsoExamVerified;
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  window.MargaritaEsoExamVerified = { build(courseId, theme) { return [...(previous?.build?.(courseId, theme) || []), ...(banks[`${courseId}::${normalize(theme)}`] || []).map((item) => ({ ...item }))]; }, count: (previous?.count || 0) + Object.values(banks).reduce((sum, items) => sum + items.length, 0) };
})();

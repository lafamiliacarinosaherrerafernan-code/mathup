(function () {
  "use strict";

  const SOURCE_COURSE = "2bach-mates";
  const SOURCE_COURSE_LABEL = "Matemáticas II";
  const TARGET_COURSE = "2bach-ccss";
  const USED_FOR = "Práctica por temas CCSS II";
  const LAPLACE_RANK_EXERCISE_ID = "mates2-algebra-d7d35def930f";
  const LAPLACE_RANK_SOLUTION = `Resolución:
1. La matriz tiene 3 columnas, luego rg(A)≤3.
2. Tomamos el menor de orden 3 formado por las filas 1, 2 y 4:
D=det [[1,-1,0],[2,3,k],[0,5k,1]].
3. Desarrollamos por cofactores de la primera fila:
D=1·det [[3,k],[5k,1]]-(-1)·det [[2,k],[0,1]]+0
=(3-5k²)+2=5(1-k²).
4. Si k≠±1, D≠0 y rg(A)=3.
5. Si k=±1, todos los menores de orden 3 se anulan. Buscamos un menor de orden 2:
det [[1,-1],[2,3]]=5≠0.
Por tanto, rg(A)=2 cuando k=±1.
Resultado final: rg(A)=3 si k≠±1 y rg(A)=2 si k=±1.`;

  function normalize(value) {
    return String(value || "")
      .replace(/<[^>]+>/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function partText(part) {
    return (part?.paragraphs || []).map((paragraph) => paragraph?.plain || "").join(" ").trim();
  }

  function determinantSubtypes(text) {
    const value = normalize(text);
    if (!/determinant|menor|rango|invertib|singular|cofactor|laplace|sarrus/.test(value)) return [];
    if (/\bsistema\b|compatible|incompatible|rouche/.test(value) && !/rango de la matriz|matriz.*rango/.test(value)) return [];
    const subtypes = new Set();
    if (/calcula|hallar|valor de los determinantes|determinante de/.test(value)) subtypes.add("calculo");
    if (/propiedad|razona|sabiendo que|sin calcular|potencia|traspuest|producto/.test(value)) subtypes.add("propiedades");
    if (/rango|menor no nulo/.test(value)) subtypes.add("rango");
    if (/parametr|segun los valores|en funcion de|\ba\s*[\u2208=]|\bm\s*[\u2208=]|\bk\s*[\u2208=]/.test(value)) subtypes.add("parametros");
    if (/invertib|inversa|singular/.test(value)) subtypes.add("invertibilidad");
    if (/cofactor|laplace|desarrolla.*fila|desarrolla.*columna/.test(value)) subtypes.add("cofactores");
    if (/sarrus/.test(value)) subtypes.add("sarrus");
    return [...subtypes];
  }

  function systemSubtypes(text) {
    const raw = String(text || "");
    const value = normalize(raw);
    if (!/\bsistema\b|compatible|incompatible|rouche|cramer|gauss|discute|numero de soluciones/.test(value)) return [];
    // Los sistemas de ecuaciones matriciales con incógnitas X e Y pertenecen
    // al tema de Matrices, no a los sistemas algebraicos de CCSS II.
    if (/\bX\b.*\bY\b/.test(raw) && !/\bx\b.*\by\b/.test(raw)) return [];
    const subtypes = new Set();
    const parameter = /parametr|segun los valores|en funcion de|\ba\s*∈|\bm\s*∈|\bk\s*∈/.test(value);
    if (parameter) subtypes.add("parametros");
    if (/discute|compatible|incompatible|numero de soluciones|rouche|rango/.test(value)) subtypes.add("discusion");
    if (/rouche|rango/.test(value)) subtypes.add("rouche-frobenius");
    if (/\bx\b.*\by\b.*\bz\b|tres incognit|3\s*[x×]\s*3/.test(value)) subtypes.add("3x3");
    if (/resuelve|resolver/.test(value) && !parameter) subtypes.add("ordinarios");
    if (/empresa|helados|personas|alumnos|precio|vendid|fabric|monedas|edades|produccion/.test(value)) subtypes.add("contextualizados");
    if (/gauss/.test(value)) subtypes.add("gauss");
    if (/cramer/.test(value)) subtypes.add("cramer");
    return [...subtypes];
  }

  function recordsFor(targetTopicIndex) {
    if (targetTopicIndex !== 1 && targetTopicIndex !== 2) return [];
    const exercises = window.MATES_II_BLOCK_EXERCISES?.algebra || [];
    const records = [];
    exercises.forEach((exercise) => {
      (exercise.parts || []).forEach((part, partIndex) => {
        const text = partText(part);
        const subtypes = targetTopicIndex === 1 ? determinantSubtypes(text) : systemSubtypes(text);
        if (!subtypes.length) return;
        const laplaceRankExercise = targetTopicIndex === 1
          && exercise.id === LAPLACE_RANK_EXERCISE_ID
          && partIndex === 0;
        if (laplaceRankExercise && !subtypes.includes("cofactores")) subtypes.push("cofactores");
        records.push({
          exercise,
          part,
          partIndex,
          blockId: "algebra",
          targetTopicIndex,
          sourceTopicIndex: targetTopicIndex,
          subtypes,
          sourceCourse: SOURCE_COURSE,
          sourceCourseLabel: SOURCE_COURSE_LABEL,
          targetCourse: TARGET_COURSE,
          usedFor: USED_FOR,
          solutionOverride: laplaceRankExercise ? LAPLACE_RANK_SOLUTION : ""
        });
      });
    });
    return records;
  }

  window.MargaritaCcssIICrossCoursePractice = {
    SOURCE_COURSE,
    SOURCE_COURSE_LABEL,
    TARGET_COURSE,
    USED_FOR,
    determinantSubtypes,
    systemSubtypes,
    recordsFor
  };
})();

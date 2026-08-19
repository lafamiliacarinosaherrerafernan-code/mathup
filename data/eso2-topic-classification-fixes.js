(function () {
  "use strict";

  const previous = window.MargaritaEsoExamVerified;
  if (!previous || typeof previous.build !== "function") return;

  const disabledDuplicates = new Set([
    // Repite literalmente la misma operación que 2eso-fracciones-7e5ca613770b.
    "2eso-fracciones-ace2ca809574"
  ]);

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const moves = [
    {
      from: "Fracciones",
      to: "Potencias y raíces cuadradas",
      reason: "El objetivo matemático real es operar con potencias, raíces o notación científica.",
      ids: new Set([
        "2eso-fracciones-054ada7bb22a",
        "2eso-fracciones-1253956ed8aa",
        "2eso-fracciones-bf5c38894f0b",
        "2eso-fracciones-8b5fbb76ef5e",
        "2eso-fracciones-2558951a7401",
        "2eso-fracciones-69cb44fc714c",
        "2eso-fracciones-7f42556b6232",
        "2eso-fracciones-002f19da33c3",
        "2eso-fracciones-068b92e2233e",
        "2eso-fracciones-7e5ca613770b",
        "2eso-fracciones-ace2ca809574",
        "2eso-fracciones-b251a9580bf8",
        "2eso-fracciones-727b0e23d665",
        "2eso-fracciones-165758d41d69",
        "2eso-fracciones-6be8bc00f61d"
      ])
    },
    {
      from: "Fracciones",
      to: "Proporcionalidad",
      reason: "El objetivo matemático real es una proporcionalidad compuesta.",
      ids: new Set([
        "2eso-fracciones-6ea7422c7674",
        "2eso-fracciones-fbb494f7a098",
        "2eso-fracciones-5b5990179895"
      ])
    },
    {
      from: "Números enteros",
      to: "Fracciones",
      reason: "El objetivo matemático real es operar con fracciones, decimales o recuperar un total fraccionario.",
      ids: new Set([
        "2eso-numeros-enteros-db2b66327671",
        "2eso-numeros-enteros-db2b66327671-a",
        "2eso-numeros-enteros-db2b66327671-b",
        "2eso-numeros-enteros-c982f00e2394",
        "2eso-numeros-enteros-318566070438",
        "2eso-numeros-enteros-6952bfc9a497",
        "2eso-numeros-enteros-a9879655f05d",
        "2eso-numeros-enteros-a9879655f05d-a",
        "2eso-numeros-enteros-a9879655f05d-b",
        "2eso-numeros-enteros-2b04094b3478",
        "2eso-numeros-enteros-f0563835c718",
        "2eso-numeros-enteros-e2468345049c",
        "2eso-numeros-enteros-cda7f2effca6",
        "2eso-numeros-enteros-62d1edc59ca3"
      ])
    }
  ];

  const buildPrevious = (theme) => previous.build("2eso", theme) || [];
  const idOf = (question) => String(question?.rawBaseId || question?.exerciseId || question?.id || "");

  function build(courseId, theme) {
    const base = previous.build(courseId, theme) || [];
    if (courseId !== "2eso") return base;

    const themeKey = normalize(theme);
    const removed = new Set(
      moves
        .filter((move) => normalize(move.from) === themeKey)
        .flatMap((move) => [...move.ids])
    );
    const result = base.filter((question) => !removed.has(idOf(question)) && !disabledDuplicates.has(idOf(question)));
    const seen = new Set(result.map(idOf));

    moves
      .filter((move) => normalize(move.to) === themeKey)
      .forEach((move) => {
        buildPrevious(move.from).forEach((question) => {
          const id = idOf(question);
          if (!move.ids.has(id) || disabledDuplicates.has(id) || seen.has(id)) return;
          result.push({
            ...question,
            reclassifiedFrom: move.from,
            classificationReason: move.reason
          });
          seen.add(id);
        });
      });

    return result;
  }

  window.MargaritaEsoExamVerified = {
    ...previous,
    build,
    disabledDuplicates2Eso: [...disabledDuplicates],
    classificationFixes2Eso: moves.map((move) => ({
      from: move.from,
      to: move.to,
      ids: [...move.ids]
    }))
  };
})();

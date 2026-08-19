// Inventario de cobertura del banco oficial de 2.º de Bachillerato.
// Se ejecuta después de cargar respuestas y ampliaciones revisadas.
(() => {
  const rawText = (paragraphs) => (paragraphs || [])
    .map((paragraph) => String(paragraph?.plain || "").trim())
    .filter(Boolean)
    .join("\n");
  const authoredMaps = [
    window.MATES_II_EXAM_ANSWERS || {},
    window.CCSS_II_BLOCK_ANSWERS || {}
  ];
  const extrasByCourse = {
    "mates-ii": window.MATES_II_EXTRA_BLOCK_QUESTIONS || {},
    "ccss-ii": window.CCSS_II_EXTRA_BLOCK_QUESTIONS || {}
  };
  const courses = [
    { courseId: "mates-ii", banks: window.MATES_II_BLOCK_EXERCISES || {} },
    { courseId: "ccss-ii", banks: window.CCSS_II_BLOCK_EXERCISES || {} }
  ];

  const hasCompletePayload = (payload) => (
    Array.isArray(payload?.options)
    && payload.options.length === 4
    && Number.isInteger(payload.correct)
    && payload.correct >= 0
    && payload.correct < 4
    && String(payload.solution || "").trim().length > 0
  );
  const answerFor = (exercise) => authoredMaps
    .map((map) => map[exercise.id] || map[exercise.importedId])
    .find(Boolean);

  const blocks = {};
  courses.forEach(({ courseId, banks }) => {
    Object.entries(banks).forEach(([blockId, exercises]) => {
      const key = `${courseId}:${blockId}`;
      const parts = (exercises || []).flatMap((exercise) => (
        (exercise.parts || []).length
          ? exercise.parts.map((part) => ({ exercise, part }))
          : [{ exercise, part: { label: "Resultado", paragraphs: exercise.statement || [] } }]
      ));
      const verifiedParts = parts.filter(({ exercise, part }, partIndex) => {
        const authored = answerFor(exercise);
        const payload = typeof officialPartAnswer === "function"
          ? officialPartAnswer(authored, exercise.parts, part, exercise.parts.indexOf(part))
          : authored?.[part.label] || authored?.Resultado;
        return hasCompletePayload(payload);
      }).length;
      const extras = Object.values(extrasByCourse[courseId] || {}).flat()
        .filter((question) => question?.blockId === blockId || !question?.blockId);
      const verifiedExtraParts = extras.reduce(
        (sum, question) => sum + (question?.parts || []).filter(hasCompletePayload).length,
        0
      );
      blocks[key] = {
        exercises: (exercises || []).length,
        parts: parts.length,
        verifiedImportedParts: verifiedParts,
        verifiedExtraParts,
        pendingImportedParts: Math.max(0, parts.length - verifiedParts),
        emptyStatements: (exercises || []).filter((exercise) => (
          !rawText(exercise.statement) && !(exercise.parts || []).some((part) => rawText(part.paragraphs))
        )).length
      };
    });
  });

  window.BACH_II_BANK_COVERAGE = {
    generatedAt: "2026-07-26",
    identity: window.BACH_II_BANK_ID_AUDIT || null,
    blocks,
    totals: Object.values(blocks).reduce((totals, block) => ({
      exercises: totals.exercises + block.exercises,
      parts: totals.parts + block.parts,
      verifiedImportedParts: totals.verifiedImportedParts + block.verifiedImportedParts,
      verifiedExtraParts: totals.verifiedExtraParts + block.verifiedExtraParts,
      pendingImportedParts: totals.pendingImportedParts + block.pendingImportedParts
    }), {
      exercises: 0,
      parts: 0,
      verifiedImportedParts: 0,
      verifiedExtraParts: 0,
      pendingImportedParts: 0
    })
  };
})();

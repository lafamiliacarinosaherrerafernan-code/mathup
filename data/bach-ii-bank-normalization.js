// Identidad estable de los bancos oficiales de 2.º de Bachillerato.
//
// Los documentos de origen contienen convocatorias diferentes que, durante la
// importación, recibieron alguna vez el mismo `id`. Conservamos el primer id
// (para no invalidar respuestas ya revisadas) y hacemos únicos los posteriores.
// El enunciado, la convocatoria y la notación importada no se modifican.
(() => {
  const courses = [
    {
      courseId: "mates-ii",
      banks: window.MATES_II_BLOCK_EXERCISES || {}
    },
    {
      courseId: "ccss-ii",
      banks: window.CCSS_II_BLOCK_EXERCISES || {}
    }
  ];
  const occurrences = new Map();

  courses.forEach(({ courseId, banks }) => {
    Object.entries(banks).forEach(([blockId, exercises]) => {
      (exercises || []).forEach((exercise, index) => {
        const importedId = String(exercise?.id || `${courseId}-${blockId}-${index + 1}`);
        const occurrence = (occurrences.get(importedId) || 0) + 1;
        occurrences.set(importedId, occurrence);

        exercise.importedId = importedId;
        exercise.bankKey = `${courseId}:${blockId}:${index + 1}`;
        exercise.id = occurrence === 1
          ? importedId
          : `${importedId}--${courseId}-${blockId}-${occurrence}`;
      });
    });
  });

  window.BACH_II_BANK_ID_AUDIT = {
    totalExercises: courses.reduce(
      (sum, { banks }) => sum + Object.values(banks).reduce(
        (blockSum, exercises) => blockSum + (exercises || []).length,
        0
      ),
      0
    ),
    duplicatedImportedIds: [...occurrences.values()].filter((count) => count > 1).length,
    uniqueRuntimeIds: new Set(
      courses.flatMap(({ banks }) => Object.values(banks).flat().map((exercise) => exercise.id))
    ).size
  };
})();

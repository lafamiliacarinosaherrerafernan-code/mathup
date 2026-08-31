// Integra en el registro de retos y exámenes las respuestas oficiales de
// Ciencias Sociales II que ya estaban preparadas para los años 2020-2024.
(() => {
  "use strict";

  const exercisesByBlock = window.CCSS_II_BLOCK_EXERCISES || {};
  const preparedAnswers = window.CCSS_II_BLOCK_ANSWERS || {};
  const examAnswers = window.CCSS_II_EXAM_ANSWERS =
    window.CCSS_II_EXAM_ANSWERS || {};
  const includedYears = new Set(["2020", "2021", "2022", "2023", "2024"]);

  const exercises = Object.values(exercisesByBlock).flat();
  const eligibleIds = exercises
    .filter((exercise) => {
      const year = String(exercise.source || "").match(/20\d{2}/)?.[0];
      return includedYears.has(year);
    })
    .map((exercise) => exercise.id);

  let optionPosition = 0;

  const rotateOptions = (answer) => {
    if (
      !answer ||
      !Array.isArray(answer.options) ||
      answer.options.length !== 4 ||
      !Number.isInteger(answer.correct)
    ) {
      return answer;
    }

    const copy = {
      ...answer,
      options: answer.options.slice()
    };
    const shift = optionPosition % 4;
    optionPosition += 1;

    if (shift) {
      copy.options =
        copy.options.slice(-shift).concat(copy.options.slice(0, -shift));
      copy.correct = (copy.correct + shift) % 4;
    }

    return copy;
  };

  eligibleIds.forEach((id) => {
    const preparedExercise = preparedAnswers[id];
    if (!preparedExercise) return;

    const integratedExercise = {};
    Object.entries(preparedExercise).forEach(([part, answer]) => {
      integratedExercise[part] = Array.isArray(answer)
        ? answer.map(rotateOptions)
        : rotateOptions(answer);
    });
    examAnswers[id] = integratedExercise;
  });
})();

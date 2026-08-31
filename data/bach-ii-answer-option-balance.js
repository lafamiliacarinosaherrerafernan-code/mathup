// Reparte de forma determinista las respuestas correctas entre A, B, C y D.
// Solo cambia la posición visual de las opciones; no altera su contenido.
(() => {
  "use strict";

  const balanceBank = (bank) => {
    let position = 0;

    const balanceAnswer = (answer) => {
      if (
        !answer ||
        !Array.isArray(answer.options) ||
        answer.options.length !== 4 ||
        !Number.isInteger(answer.correct)
      ) {
        return;
      }

      const target = position % 4;
      position += 1;
      const shift = (target - answer.correct + 4) % 4;
      if (!shift) return;

      answer.options =
        answer.options.slice(-shift).concat(answer.options.slice(0, -shift));
      answer.correct = target;
    };

    Object.values(bank || {}).forEach((exercise) => {
      Object.values(exercise || {}).forEach((answer) => {
        if (Array.isArray(answer)) {
          answer.forEach(balanceAnswer);
        } else {
          balanceAnswer(answer);
        }
      });
    });
  };

  balanceBank(window.MATES_II_EXAM_ANSWERS);
  balanceBank(window.CCSS_II_EXAM_ANSWERS);
})();

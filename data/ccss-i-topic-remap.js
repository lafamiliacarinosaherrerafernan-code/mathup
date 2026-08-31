(function () {
  "use strict";

  const explanations = window.TOPIC_BOOK_EXPLANATIONS;
  if (!explanations) return;

  // Combinatoria ocupaba el índice 9. Al insertar Derivadas y Aplicación de
  // derivadas se desplaza al 11, pero conserva íntegra su explicación previa.
  const legacyCombinatorics = explanations["1bach-ccss-9"];
  if (legacyCombinatorics && !explanations["1bach-ccss-11"]) {
    explanations["1bach-ccss-11"] = legacyCombinatorics;
  }
  delete explanations["1bach-ccss-9"];
})();

(function () {
  "use strict";

  const previous = window.MargaritaEsoExamVerified;
  if (!previous?.build) return;

  const TOPICS = {
    "numeros reales": [0, "numeros-reales"],
    "radicales": [1, "radicales"],
    "proporcionalidad": [2, "proporcionalidad"],
    "expresiones algebraicas": [3, "expresiones-algebraicas"],
    "ecuaciones e inecuaciones": [4, "ecuaciones-e-inecuaciones"],
    "sistemas de ecuaciones e inecuaciones": [5, "sistemas-de-ecuaciones-e-inecuaciones"],
    "semejanza y trigonometria": [6, "semejanza-y-trigonometria"],
    "areas y cuerpos geometricos": [7, "areas-y-cuerpos-geometricos"],
    "funciones": [8, "funciones"]
  };

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  function suffixOf(rawBaseId, index) {
    return String(rawBaseId || "").match(/([a-f0-9]{12}(?:-[a-z0-9-]+)?)$/)?.[1]
      || String(index + 1).padStart(3, "0");
  }

  function normalizeQuestion(question, theme, index) {
    const topic = TOPICS[normalize(theme)];
    if (!topic) return { ...question };
    const [topicIndex, slug] = topic;
    const originalRawBaseId = question.originalRawBaseId || question.rawBaseId || "";
    return {
      ...question,
      originalRawBaseId,
      rawBaseId: `4eso-a-${slug}-${suffixOf(originalRawBaseId, index)}`,
      courseId: "4eso-a",
      topicId: `4eso-a:${slug}`,
      topicIndex,
      originalSource: question.originalSource || question.source || "",
      classificationStatus: "normalized-4eso-a-topic",
      classificationReason: "Tema asignado por el objetivo matemático real y el catálogo cerrado de 4.º ESO A."
    };
  }

  window.MargaritaEsoExamVerified = {
    ...previous,
    build(courseId, theme) {
      const questions = previous.build(courseId, theme) || [];
      if (courseId !== "4eso-a") return questions;
      return questions.map((question, index) => normalizeQuestion(question, theme, index));
    }
  };
})();

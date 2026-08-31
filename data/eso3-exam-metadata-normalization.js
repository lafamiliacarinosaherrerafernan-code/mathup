(function () {
  "use strict";

  const previous = window.MargaritaEsoExamVerified;
  if (!previous?.build) return;

  const TOPICS = {
    "numeros reales": [0, "numeros-reales"],
    "potencias y raices": [1, "potencias-raices"],
    "expresiones algebraicas": [2, "expresiones-algebraicas"],
    "ecuaciones y sistemas de ecuaciones": [3, "ecuaciones-sistemas"],
    "proporcionalidad": [4, "proporcionalidad"],
    "sucesiones": [5, "sucesiones"],
    "cuerpos geometricos": [6, "cuerpos-geometricos"],
    "funciones": [7, "funciones"],
    "estadistica": [8, "estadistica"],
    "probabilidad": [9, "probabilidad"]
  };

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  // Estos enunciados oficiales se conservan intactos para las modalidades de
  // examen, pero son geometría plana pura. No deben inflar el banco de
  // Práctica por temas de Cuerpos geométricos.
  const PLANE_GEOMETRY_EXCLUDED_FROM_SOLIDS_PRACTICE = new Set([
    "3eso-cuerpos-geometricos-000f6f6f3d29",
    "3eso-cuerpos-geometricos-1306a0380b7c",
    "3eso-cuerpos-geometricos-864fff330a0a",
    "3eso-cuerpos-geometricos-dfb6035001e2",
    "3eso-cuerpos-geometricos-d1993985e79d",
    "3eso-cuerpos-geometricos-bdbce5be93a3"
  ]);

  function normalizeQuestion(question, theme, index) {
    const topic = TOPICS[normalize(theme)];
    if (!topic) return { ...question };
    const [topicIndex, slug] = topic;
    const expectedPrefix = `3eso-${slug}-`;
    const originalRawBaseId = question.originalRawBaseId || question.rawBaseId || "";
    const suffix = originalRawBaseId.match(/([a-f0-9]{12}(?:-[a-z0-9]+)?)$/)?.[1]
      || originalRawBaseId.replace(/^3eso-/, "").replace(/[^a-z0-9-]+/gi, "-").slice(-48)
      || String(index + 1).padStart(3, "0");
    const normalizedQuestion = {
      ...question,
      originalRawBaseId,
      rawBaseId: originalRawBaseId.startsWith(expectedPrefix)
        ? originalRawBaseId
        : `${expectedPrefix}${suffix}`,
      courseId: "3eso",
      topicId: `3eso:${slug}`,
      topicIndex
    };
    if (slug === "cuerpos-geometricos" && PLANE_GEOMETRY_EXCLUDED_FROM_SOLIDS_PRACTICE.has(originalRawBaseId)) {
      return {
        ...normalizedQuestion,
        practiceEligible: false,
        classificationStatus: "plane-geometry-not-solid-practice",
        classificationReason: "El objetivo matemático es semejanza, Tales, Pitágoras o perímetro plano sin un cuerpo tridimensional."
      };
    }
    return normalizedQuestion;
  }

  window.MargaritaEsoExamVerified = {
    ...previous,
    build(courseId, theme) {
      const questions = previous.build(courseId, theme) || [];
      if (courseId !== "3eso") return questions;
      return questions.map((question, index) => normalizeQuestion(question, theme, index));
    }
  };
})();

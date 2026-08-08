(function () {
  const DEFAULT_RULE = Object.freeze({
    availableForTopicPractice: true,
    availableForExamByBlocks: true,
    availableForExam: true
  });

  const CCSS_INTEGRALS_BLOCK_WARNING = "Este contenido está disponible para practicar por temas, pero hasta la fecha no se han incluido ejercicios específicos de integrales en los exámenes PAU de Matemáticas Aplicadas a las Ciencias Sociales II de Castilla-La Mancha. Por este motivo, no puede seleccionarse para Examen por bloques.";
  const CCSS_INTEGRALS_EXAM_WARNING = "Este contenido está disponible para practicar por temas, pero hasta la fecha no se han incluido ejercicios específicos de integrales en los exámenes PAU de Matemáticas Aplicadas a las Ciencias Sociales II de Castilla-La Mancha. Por este motivo, no puede incluirse en esta modalidad de examen.";

  const rules = Object.freeze({
    "2bach-ccss:topic-6": Object.freeze({
      courseId: "2bach-ccss",
      topicIndex: 6,
      topicId: "integrales_indefinidas",
      availableForTopicPractice: true,
      availableForExamByBlocks: false,
      availableForExam: false,
      practiceBank: "ccss-ii-integrales-indefinidas-inmediatas",
      practicePolicy: "immediate-only",
      warningExamByBlocks: CCSS_INTEGRALS_BLOCK_WARNING,
      warningExam: CCSS_INTEGRALS_EXAM_WARNING
    }),
    "2bach-ccss:topic-7": Object.freeze({
      courseId: "2bach-ccss",
      topicIndex: 7,
      topicId: "integrales_definidas",
      availableForTopicPractice: true,
      availableForExamByBlocks: false,
      availableForExam: false,
      practiceBank: "ccss-ii-integrales-definidas",
      practicePolicy: "compatible-mates-ii-pau-allowed",
      warningExamByBlocks: CCSS_INTEGRALS_BLOCK_WARNING,
      warningExam: CCSS_INTEGRALS_EXAM_WARNING
    })
  });

  function key(courseId, topicIndex) {
    return `${courseId}:topic-${Number(topicIndex)}`;
  }

  function get(courseId, topicIndex) {
    return rules[key(courseId, topicIndex)] || DEFAULT_RULE;
  }

  function propertyForMode(mode) {
    return mode === "topicPractice"
      ? "availableForTopicPractice"
      : mode === "examByBlocks"
        ? "availableForExamByBlocks"
        : "availableForExam";
  }

  function isAvailable(courseId, topicIndex, mode) {
    return get(courseId, topicIndex)[propertyForMode(mode)] !== false;
  }

  function partition(courseId, topicIndexes, mode) {
    const valid = [];
    const excluded = [];
    [...new Set(topicIndexes || [])].forEach((topicIndex) => {
      (isAvailable(courseId, topicIndex, mode) ? valid : excluded).push(topicIndex);
    });
    return { valid, excluded };
  }

  function warning(courseId, topicIndexes, mode) {
    const firstExcluded = (topicIndexes || []).find((topicIndex) => !isAvailable(courseId, topicIndex, mode));
    if (!Number.isInteger(firstExcluded)) return "";
    const rule = get(courseId, firstExcluded);
    return mode === "examByBlocks" ? rule.warningExamByBlocks || "" : rule.warningExam || "";
  }

  window.MARGARITA_CONTENT_AVAILABILITY = rules;
  window.MargaritaContentAvailability = { get, isAvailable, partition, warning, propertyForMode };
})();

(function () {
  const EXAM_HISTORY_KEY = "margarita-bach-ii-exam-history-v1";

  const slotLabels = {
    "2bach-mates": [
      "Álgebra",
      "Límites, continuidad y derivadas",
      "Integrales",
      "Geometría",
      "Probabilidad y estadística"
    ],
    "2bach-ccss": [
      "Matrices",
      "Sistemas y programación lineal",
      "Análisis",
      "Probabilidad o estadística"
    ]
  };

  const CCSS_II_EXAM_FAMILIES = {
    2: [
      { id: "sistemas", label: "Sistemas", blockId: "algebra", topicIndexes: [2] },
      { id: "programacion-lineal", label: "Programación lineal", blockId: "algebra", topicIndexes: [3] }
    ],
    4: [
      { id: "probabilidad", label: "Probabilidad", blockId: "probabilidad", topicIndexes: [8] },
      { id: "estadistica", label: "Estadística", blockId: "estadistica", topicIndexes: [9, 10] }
    ]
  };

  function rawBanks(courseId) {
    return courseId === "2bach-mates"
      ? window.MATES_II_BLOCK_EXERCISES || {}
      : window.CCSS_II_BLOCK_EXERCISES || {};
  }

  function answerBank(courseId) {
    return courseId === "2bach-mates"
      ? window.MATES_II_EXAM_ANSWERS || {}
      : window.CCSS_II_EXAM_ANSWERS || {};
  }

  function catalog(courseId) {
    return window.BACH_II_EXAM_CATALOG?.[courseId] || [];
  }

  function findRawExercise(courseId, entry) {
    return (rawBanks(courseId)[entry.block] || []).find((exercise) => exercise.id === entry.id) || null;
  }

  function exerciseIsComplete(courseId, entry) {
    const raw = findRawExercise(courseId, entry);
    const authored = answerBank(courseId)[entry.id];
    return Boolean(raw && authored && raw.parts?.length && raw.parts.every((part, partIndex) => {
      const answer = officialPartAnswer(authored, raw.parts, part, partIndex);
      return answer?.options?.length === 4
        && new Set(answer.options.map(String)).size === 4
        && Number.isInteger(answer.correct)
        && answer.correct >= 0
        && answer.correct < 4
        && String(answer.solution || "").trim();
    }));
  }

  function studentExamKey(courseId) {
    const student = state.student || {};
    const studentIdentity = student.id || student.userId || student.username || student.email || student.name || "alumno";
    return [state.academicYear, courseId, student.group || student.groupLabel, studentIdentity].filter(Boolean).join("|");
  }

  function legacyStudentExamKey(courseId) {
    const student = state.student || {};
    return [state.academicYear, courseId, student.group || student.groupLabel, student.name].filter(Boolean).join("|");
  }

  function readExamHistory() {
    try {
      return JSON.parse(localStorage.getItem(EXAM_HISTORY_KEY) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function writeExamHistory(history) {
    try {
      localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history));
    } catch (_) {
      // El examen sigue funcionando aunque el almacenamiento local no esté disponible.
    }
  }

  function examBlocksForSlot(courseId, slot) {
    if (courseId === "2bach-mates") {
      return [slot === 1
        ? "algebra"
        : slot === 2 || slot === 3
          ? "analisis"
          : slot === 4
            ? "geometria"
            : "probabilidad-estadistica"];
    }
    if (slot === 1 || slot === 2) return ["algebra"];
    if (slot === 3) return ["analisis"];
    if (slot === 4) return ["probabilidad", "estadistica"];
    return [];
  }

  function examBlockForSlot(courseId, slot) {
    return examBlocksForSlot(courseId, slot)[0] || null;
  }

  function examSearchableText(question) {
    return normalizeDisplayText([
      question?.source || "",
      question?.text || "",
      question?.statementHtml || "",
      ...(question?.parts || []).map((part) => part?.text || part?.html || "")
    ].join(" "))
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function examTopicIndexesForSlot(courseId, slot) {
    if (courseId !== "2bach-ccss") return [];
    if (slot === 1) return [0];
    if (slot === 2) return [2, 3];
    if (slot === 3) return [4, 5];
    if (slot === 4) return [8, 9, 10];
    return [];
  }

  function questionBelongsToExamSlot(courseId, slot, question) {
    const allowedBlocks = examBlocksForSlot(courseId, slot);
    const blockId = question?.blockId || allowedBlocks[0];
    if (!allowedBlocks.includes(blockId)) return false;
    if (courseId === "2bach-ccss") {
      const allowedTopics = new Set(examTopicIndexesForSlot(courseId, slot));
      const questionTopics = Array.isArray(question?.topicIndexes) ? question.topicIndexes : [];
      return questionTopics.length > 0 && questionTopics.some((topicIndex) => allowedTopics.has(topicIndex));
    }
    const text = examSearchableText(question);
    if (courseId === "2bach-mates" && blockId === "analisis") {
      const isIntegral = /\bintegral|primitiv|barrow|área|area|recinto|región limitada|region limitada/.test(text);
      return slot === 3 ? isIntegral : !isIntegral;
    }
    return true;
  }

  function ccssIIExamFamilyForQuestion(slot, question) {
    const topics = new Set(question?.topicIndexes || []);
    return (CCSS_II_EXAM_FAMILIES[slot] || []).find((family) => (
      family.blockId === question?.blockId
      && family.topicIndexes.some((topicIndex) => topics.has(topicIndex))
    )) || null;
  }

  function filterExamSlotPoolByFamily(courseId, slot, pool, familyId = null) {
    if (courseId !== "2bach-ccss" || !familyId) return pool;
    return pool.filter((question) => ccssIIExamFamilyForQuestion(slot, question)?.id === familyId);
  }

  function officialPauMetadata(courseId, question) {
    const source = String(question?.source || officialExerciseSource(question) || "");
    const year = String(question?.year || source.match(/\b(20\d{2})\b/)?.[1] || "");
    const official = hasOfficialConvocation(question)
      && question?.sourceType !== "legacy-unverified"
      && question?.officialStatus !== "legacy-unverified";
    return {
      official,
      year,
      pauEra: courseId === "2bach-ccss" && (year === "2025" || year === "2026")
        ? "current"
        : "historical"
    };
  }

  function questionAvailableForMode(courseId, question, mode) {
    const availability = window.MargaritaContentAvailability;
    if (!availability?.isAvailable) return true;
    const topicIndexes = Array.isArray(question?.topicIndexes) ? question.topicIndexes : [];
    // En CCSS II un apartado sin clasificación no puede entrar por accidente
    // en Práctica por temas ni en Examen por bloques. El examen completo puede
    // conservar el ejercicio oficial mediante su slot fiable.
    if (courseId === "2bach-ccss" && mode !== "exam" && !topicIndexes.length) return false;
    return topicIndexes.every((topicIndex) => availability.isAvailable(courseId, topicIndex, mode));
  }

  function rotateExamPart(part, amount) {
    if (!part?.options || part.options.length !== 4
      || new Set(part.options.map(String)).size !== 4
      || !Number.isInteger(part.correct)
      || !String(part.solution || "").trim()) return null;
    const rotation = Math.abs(amount) % part.options.length;
    return {
      ...part,
      text: part.text || "Selecciona el resultado correcto.",
      html: part.html || formatMathText(part.text || "Selecciona el resultado correcto."),
      options: rotate(part.options, rotation),
      correct: (part.correct - rotation + part.options.length) % part.options.length
    };
  }

  function asPreparedExamQuestion(question, slot, blockId, rotationSeed = 0, courseId = state.courseId) {
    if (!question) return null;
    const expanded = expandCompositeQuestionParts(question);
    const sourceParts = expanded.parts?.length
      ? expanded.parts
      : questionHasCoherentOptions(expanded)
        ? [{
          label: "Resultado",
          text: "Selecciona el resultado correcto.",
          html: "Selecciona el resultado correcto.",
          options: expanded.options,
          correct: expanded.correct,
          solution: expanded.solution
        }]
        : [];
    const parts = sourceParts.map((part, index) => rotateExamPart(part, rotationSeed + index));
    if (!parts.length || parts.some((part) => !part)) return null;
    const identity = challengeQuestionIdentity(expanded);
    const pauMetadata = officialPauMetadata(expanded.courseId || courseId, expanded);
    return {
      ...expanded,
      ...pauMetadata,
      id: expanded.id || `exam-${blockId}-${Math.abs(hashExamText(identity))}`,
      rawBaseId: expanded.rawBaseId || identity,
      source: expanded.source || officialExerciseSource(expanded),
      slot,
      blockId,
      text: expanded.text || "",
      statementHtml: expanded.statementHtml || formatMathText(expanded.text || ""),
      parts,
      type: expanded.type || "official-exam-exercise"
    };
  }

  function hashExamText(value) {
    let hash = 2166136261;
    String(value || "").split("").forEach((character) => {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    });
    return hash >>> 0;
  }

  function completeRawExercise(courseId, raw, blockId, rotationSeed) {
    const authored = answerBank(courseId)[raw?.id];
    if (!raw || !authored || !raw.parts?.length) return null;
    const parts = raw.parts.map((part, partIndex) => {
      const answer = officialPartAnswer(authored, raw.parts, part, partIndex);
      return rotateExamPart({
        label: part.label,
        text: exercisePartPrompt(part),
        html: exercisePartPrompt(part, true),
        options: answer?.options,
        correct: answer?.correct,
        solution: answer?.solution
      }, rotationSeed + partIndex);
    });
    if (parts.some((part) => !part)) return null;
    return {
      id: raw.id,
      rawBaseId: `${raw.id}|${raw.source}|${joinExerciseParagraphs(raw.statement)}`,
      source: raw.source,
      topicIndexes: Array.isArray(raw.topicIndexes) ? [...raw.topicIndexes] : [],
      blockId,
      text: joinExerciseParagraphs(raw.statement),
      statementHtml: joinExerciseParagraphs(raw.statement, true),
      parts,
      type: "corrected-official-exercise"
    };
  }

  function completeRawPartExercise(courseId, raw, part, partIndex, blockId, rotationSeed) {
    const authored = answerBank(courseId)[raw?.id];
    if (!raw || !part || !authored) return null;
    const answer = officialPartAnswer(authored, raw.parts, part, partIndex);
    const preparedPart = rotateExamPart({
      label: part.label,
      text: exercisePartPrompt(part),
      html: exercisePartPrompt(part, true),
      options: answer?.options,
      correct: answer?.correct,
      solution: answer?.solution
    }, rotationSeed);
    if (!preparedPart) return null;
    const topicIndexes = Array.isArray(part.topicIndexes) ? [...part.topicIndexes] : [];
    return {
      id: part.partId || `${raw.id}:part-${partIndex + 1}`,
      rawBaseId: `${raw.id}|${part.partId || partIndex}|${raw.source}`,
      exerciseId: raw.id,
      partId: part.partId || `${raw.id}:part-${partIndex + 1}`,
      source: raw.source,
      sourceType: part.sourceType || raw.sourceType || "official-pau",
      officialStatus: part.officialStatus || raw.officialStatus || "official",
      sourceCourseLabel: part.sourceCourseLabel || raw.sourceCourseLabel || "2.º Bachillerato · Matemáticas Aplicadas a las CCSS II",
      year: part.year || raw.year || "",
      convocatoria: part.convocatoria || raw.convocatoria || "",
      topicIndexes,
      primaryTopicIndex: part.primaryTopicIndex,
      subtopic: part.subtopic,
      reasoningTypes: Array.isArray(part.reasoningTypes) ? [...part.reasoningTypes] : [],
      blockId,
      text: joinExerciseParagraphs(raw.statement),
      statementHtml: joinExerciseParagraphs(raw.statement, true),
      parts: [preparedPart],
      type: "corrected-official-part"
    };
  }

  function prepareDidacticTopicQuestion(question, topicIndex, rotationSeed) {
    if (!question?.options?.length || question.options.length !== 4 || !String(question.solution || "").trim()) return null;
    const amount = Math.abs(rotationSeed) % question.options.length;
    return {
      ...question,
      topicIndexes: [topicIndex],
      options: rotate(question.options, amount),
      correct: (question.correct - amount + question.options.length) % question.options.length,
      type: question.type || "didactic-original"
    };
  }

  function crossCourseContentKey(question) {
    return normalizeDisplayText([
      question?.text || "",
      ...(question?.parts || []).map((part) => part?.text || part?.html || "")
    ].join(" "))
      .replace(/<[^>]+>/g, " ")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\b(?:apartado|ejercicio|propuesta|opcion)\s*[a-z0-9.\-]*/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function prepareCcssIICrossCourseQuestion(record, topicIndex, rotationSeed) {
    const suppliedQuestion = record.question;
    const basePrepared = suppliedQuestion
      ? (() => {
        if (suppliedQuestion.options?.length !== 4
          || !Number.isInteger(suppliedQuestion.correct)
          || !String(suppliedQuestion.solution || "").trim()) return null;
        const amount = Math.abs(rotationSeed) % suppliedQuestion.options.length;
        return {
          ...suppliedQuestion,
          options: rotate(suppliedQuestion.options, amount),
          correct: (suppliedQuestion.correct - amount + suppliedQuestion.options.length) % suppliedQuestion.options.length
        };
      })()
      : completeRawPartExercise(
        "2bach-mates",
        record.exercise,
        record.part,
        record.partIndex,
        record.blockId,
        rotationSeed
      );
    const prepared = record.solutionOverride && basePrepared?.parts?.length
      ? {
        ...basePrepared,
        parts: basePrepared.parts.map((part, index) => index === 0 ? { ...part, solution: record.solutionOverride } : part)
      }
      : basePrepared;
    if (!prepared) return null;
    const searchable = normalizeDisplayText([
      record.part?.paragraphs?.map((paragraph) => paragraph?.plain || "").join(" ") || "",
      prepared.text || "",
      prepared.solution || "",
      ...(prepared.parts || []).map((part) => part?.solution || "")
    ].join(" ")).toLowerCase();
    // En CCSS II los sistemas con parámetros se discuten mediante rangos y
    // Rouché-Frobenius. No reutilizamos un ejercicio de Matemáticas II si su
    // solución disponible no acredita ese procedimiento didáctico.
    if (topicIndex === 2
      && (record.subtypes || []).includes("discusion")
      && !/rouch|rango/.test(searchable)) return null;
    const subtypes = new Set(record.subtypes || []);
    if (topicIndex === 1) {
      if (/sarrus/.test(searchable)) subtypes.add("sarrus");
      if (/cofactor|laplace|desarrollamos? por (?:la )?(?:fila|columna)/.test(searchable)) subtypes.add("cofactores");
      if (/orden 2|2\s*[x×]\s*2/.test(searchable)) subtypes.add("2x2");
      if (/orden 3|3\s*[x×]\s*3/.test(searchable)) subtypes.add("3x3");
      if (/menor.*no nulo|rango/.test(searchable)) subtypes.add("rango");
    } else {
      if (/rouch/.test(searchable)) subtypes.add("rouche-frobenius");
      if (/matriz ampliada|a\*/.test(searchable)) subtypes.add("discusion");
      if (/gauss/.test(searchable)) subtypes.add("gauss");
      if (/cramer/.test(searchable)) subtypes.add("cramer");
      if (/\bx\b.*\by\b.*\bz\b|tres incognit/.test(searchable)) subtypes.add("3x3");
      if (subtypes.has("discusion") && !/rouch|rango/.test(searchable)) return null;
    }
    if (!subtypes.size) return null;
    const sourceLabel = record.sourceCourseLabel || "Matemáticas II";
    return {
      ...prepared,
      id: `ccss-ii-practice|${prepared.id}`,
      rawBaseId: `ccss-ii-topic-${topicIndex}|mates-ii|${prepared.rawBaseId || prepared.id || prepared.source}`,
      exerciseId: prepared.exerciseId || prepared.id,
      courseId: "2bach-ccss",
      practiceCourseId: "2bach-ccss",
      sourceCourse: "2bach-mates",
      sourceCourseLabel: sourceLabel,
      sourceOriginalType: prepared.sourceType || "official-pau",
      sourceType: "cross-course-practice",
      officialStatus: prepared.officialStatus || "official",
      usedFor: "Práctica por temas CCSS II",
      topicIndexes: [topicIndex],
      primaryTopicIndex: topicIndex,
      subtopic: topicIndex === 1 ? "Determinantes compatibles con CCSS II" : "Sistemas compatibles con CCSS II",
      reasoningTypes: [...subtypes],
      practiceOnly: true,
      availableForTopicPractice: true,
      availableForExamByBlocks: false,
      availableForExam: false,
      statementHtml: `<div class="official-source">Procedencia: ${escapeHtml(sourceLabel)} · ${escapeHtml(prepared.source)}</div>${prepared.statementHtml || `<p>${escapeHtml(prepared.text || "")}</p>`}`,
      type: "cross-course-official-part"
    };
  }

  function officialLegacyBlockPool(course, blockId) {
    const block = (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === blockId);
    if (!block) return [];
    return block.topics.flatMap((topicIndex) => {
      const theme = course.themes[topicIndex] || "";
      return pickExerciseBank(theme.toLowerCase(), course.id)
        .map((question) => question.options?.length ? question : withPauTestOptions(question))
        .filter(hasOfficialConvocation)
        .filter(questionHasCoherentOptions);
    });
  }

  function buildExamSlotPool(courseId, slot, rotationSeed = 0) {
    const course = courseById(courseId);
    const blockIds = examBlocksForSlot(courseId, slot);
    if (!course || !blockIds.length) return [];
    ensurePauTopicMetadata(courseId);

    const curatedEntries = catalog(courseId)
      .filter((entry) => entry.slot === slot && exerciseIsComplete(courseId, entry))
      .map((entry, index) => prepareExercise(courseId, entry, rotationSeed + index))
      .filter(Boolean);
    const corrected = blockIds.flatMap((blockId) => buildCorrectedBlockQuestions(course, blockId));
    const completeRaw = courseId === "2bach-ccss"
      ? []
      : blockIds.flatMap((blockId) => (rawBanks(courseId)[blockId] || [])
          .map((raw, index) => completeRawExercise(courseId, raw, blockId, rotationSeed + index))
          .filter(Boolean));
    const suppliedExtras = courseId === "2bach-mates"
      ? blockIds.flatMap((blockId) => window.MATES_II_EXTRA_BLOCK_QUESTIONS?.[blockId] || [])
      : [];
    const seen = new Set();
    // En los exámenes solo utilizamos los bancos oficiales corregidos de la
    // modalidad elegida. El banco histórico genérico puede contener temas con
    // nombres coincidentes de Matemáticas II y CCSS II, por lo que no debe
    // incorporarse aquí: así evitamos mezclar enunciados entre modalidades.
    return [...curatedEntries, ...corrected, ...completeRaw, ...suppliedExtras]
      .filter((question) => hasOfficialConvocation(question))
      .filter((question) => officialPauMetadata(courseId, question).official)
      .filter((question) => questionAvailableForMode(courseId, question, "exam"))
      .filter((question) => questionBelongsToExamSlot(courseId, slot, question))
      .map((question, index) => asPreparedExamQuestion(
        question,
        slot,
        question.blockId || blockIds[0],
        rotationSeed + index,
        courseId
      ))
      .filter(Boolean)
      .filter((question) => {
        const identity = officialQuestionDedupKey(question);
        if (!identity || seen.has(identity)) return false;
        seen.add(identity);
        return true;
      });
  }

  function filterExamSlotPoolByTopics(courseId, slot, pool, selectedTopicIndexes = null) {
    if (!Array.isArray(selectedTopicIndexes)) return pool;
    const selected = new Set(selectedTopicIndexes);
    const permitted = examTopicIndexesForSlot(courseId, slot)
      .filter((topicIndex) => selected.has(topicIndex));
    if (!permitted.length) return [];
    const permittedSet = new Set(permitted);
    return pool.filter((question) => {
      const topics = question.topicIndexes || [];
      return topics.length > 0 && topics.every((topicIndex) => permittedSet.has(topicIndex));
    });
  }

  function buildFilteredExamSlotPool(courseId, slot, selectedTopicIndexes = null, rotationSeed = 0) {
    return filterExamSlotPoolByTopics(
      courseId,
      slot,
      buildExamSlotPool(courseId, slot, rotationSeed),
      selectedTopicIndexes
    );
  }

  function chooseWithoutRepeating(courseId, slot, seed, selectedTopicIndexes = null, familyId = null) {
    const filteredPool = filterExamSlotPoolByFamily(courseId, slot, buildFilteredExamSlotPool(
      courseId,
      slot,
      selectedTopicIndexes,
      hashExamText(`${seed}|${slot}`)
    ), familyId);
    // El examen completo de CCSS II prioriza el modelo vigente. El banco
    // histórico solo actúa como alternativa cuando el filtro solicitado no
    // dispone de ejercicios actuales compatibles.
    const currentPool = courseId === "2bach-ccss"
      ? filteredPool.filter((question) => question.pauEra === "current")
      : [];
    const pool = currentPool.length ? currentPool : filteredPool;
    return chooseFromExamPoolWithoutRepeating(courseId, slot, seed, pool);
  }

  function alternatingFamilyHistoryKey(courseId, slot) {
    return `${studentExamKey(courseId)}|slot-${slot}|last-family`;
  }

  function chooseAlternatingExamFamily(courseId, slot, seed, selectedTopicIndexes = null) {
    if (courseId !== "2bach-ccss" || !CCSS_II_EXAM_FAMILIES[slot]) return null;
    const completePool = buildFilteredExamSlotPool(
      courseId,
      slot,
      selectedTopicIndexes,
      hashExamText(`${seed}|family-${slot}`)
    );
    const availableFamilies = CCSS_II_EXAM_FAMILIES[slot].filter((family) => (
      filterExamSlotPoolByFamily(courseId, slot, completePool, family.id).length > 0
    ));
    if (!availableFamilies.length) return null;
    const history = readExamHistory();
    const key = alternatingFamilyHistoryKey(courseId, slot);
    const lastFamily = history[key];
    const opposite = availableFamilies.find((family) => family.id !== lastFamily);
    const selected = lastFamily
      ? opposite || availableFamilies.find((family) => family.id === lastFamily)
      : seededShuffle(availableFamilies, `${seed}|first-family-${slot}`)[0];
    if (!selected) return null;
    if (lastFamily && selected.id === lastFamily && availableFamilies.length === 1) {
      const fallbackKey = `${key}|fallbacks`;
      const fallbacks = Array.isArray(history[fallbackKey]) ? history[fallbackKey] : [];
      history[fallbackKey] = [...fallbacks.slice(-19), {
        at: new Date().toISOString(),
        unavailableAlternative: (CCSS_II_EXAM_FAMILIES[slot] || []).find((family) => family.id !== lastFamily)?.id || ""
      }];
    }
    history[key] = selected.id;
    writeExamHistory(history);
    return selected;
  }

  function chooseFromExamPoolWithoutRepeating(courseId, slot, seed, pool) {
    if (!pool.length) return null;
    const history = readExamHistory();
    const key = `${studentExamKey(courseId)}|slot-${slot}`;
    const legacyKey = `${legacyStudentExamKey(courseId)}|slot-${slot}`;
    const identityOf = (question) => officialQuestionDedupKey(question);
    const aliasesOf = (question) => new Set([
      identityOf(question),
      legacyOfficialQuestionDedupKey(question),
      challengeQuestionIdentity(question),
      question?.id,
      question?.rawBaseId,
      question?.id ? `id:${question.id}` : "",
      question?.rawBaseId ? `raw:${question.rawBaseId}` : ""
    ].filter(Boolean));
    const stored = [
      ...(Array.isArray(history[key]) ? history[key] : []),
      ...(legacyKey !== key && Array.isArray(history[legacyKey]) ? history[legacyKey] : [])
    ];
    let used = [...new Set(stored.flatMap((storedIdentity) => {
      const matchingQuestion = pool.find((question) => aliasesOf(question).has(storedIdentity));
      return matchingQuestion ? [identityOf(matchingQuestion)] : [];
    }))];
    history[key] = used;
    writeExamHistory(history);
    let available = pool.filter((question) => !used.includes(identityOf(question)));
    if (!available.length) {
      const lastIdentity = used.at(-1);
      used = lastIdentity && pool.length > 1 ? [lastIdentity] : [];
      available = pool.filter((question) => !used.includes(identityOf(question)));
      history[key] = used;
      writeExamHistory(history);
    }
    return seededShuffle(available, `${seed}|${slot}|${used.length}`)[0];
  }

  function markExamExerciseAnswered(courseId, question) {
    if (!courseId || !question?.slot) return;
    const history = readExamHistory();
    const key = `${studentExamKey(courseId)}|slot-${question.slot}`;
    const legacyKey = `${legacyStudentExamKey(courseId)}|slot-${question.slot}`;
    const answered = new Set(Array.isArray(history[key]) ? history[key] : []);
    if (legacyKey !== key && Array.isArray(history[legacyKey])) {
      history[legacyKey].forEach((identity) => answered.add(identity));
    }
    answered.add(officialQuestionDedupKey(question));
    history[key] = [...answered];
    writeExamHistory(history);
  }

  function prepareExercise(courseId, entry, rotationSeed = 0) {
    const raw = findRawExercise(courseId, entry);
    const authored = answerBank(courseId)[entry.id];
    if (!raw || !authored) return null;
    const parts = raw.parts.map((part, partIndex) => {
      const answer = officialPartAnswer(authored, raw.parts, part, partIndex);
      if (!answer?.options || answer.options.length !== 4) return null;
      const amount = Math.abs(rotationSeed + partIndex) % answer.options.length;
      return {
        label: part.label,
        text: exercisePartPrompt(part),
        html: exercisePartPrompt(part, true),
        options: rotate(answer.options, amount),
        correct: (answer.correct - amount + answer.options.length) % answer.options.length,
        solution: answer.solution
      };
    });
    if (parts.some((part) => !part)) return null;
    return {
      id: raw.id,
      rawBaseId: `${raw.id}|${raw.source}|${joinExerciseParagraphs(raw.statement)}`,
      source: raw.source,
      topicIndexes: Array.isArray(raw.topicIndexes) ? [...raw.topicIndexes] : [],
      slot: entry.slot,
      blockId: entry.block,
      text: joinExerciseParagraphs(raw.statement),
      statementHtml: joinExerciseParagraphs(raw.statement, true),
      parts,
      type: "corrected-official-exercise"
    };
  }

  const matchedPoolCache = new Map();

  function normalizedMatchTokens(value) {
    const stop = new Set(["para", "como", "este", "esta", "estas", "estos", "donde", "siendo", "calcula", "calcular", "halla", "hallar", "determina", "determinar", "ejercicio", "apartado", "bloque", "junio", "julio", "septiembre", "convocatoria", "resultado", "castilla", "mancha"]);
    return normalizeDisplayText(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .match(/[a-zñ]{4,}/g)?.filter((token) => !stop.has(token)) || [];
  }

  function rawExerciseText(raw) {
    return [
      joinExerciseParagraphs(raw.statement),
      ...(raw.parts || []).map((part) => joinExerciseParagraphs(part.paragraphs))
    ].join("\n");
  }

  function normalizedPauExerciseText(raw) {
    return normalizeDisplayText(rawExerciseText(raw))
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ");
  }

  // Clasificación determinista que se convierte en metadatos topicIndex antes
  // de seleccionar. La selección posterior nunca decide por semejanza textual.
  function classifiedPauTopicIndexes(courseId, blockId, raw) {
    const text = normalizedPauExerciseText(raw);
    const topics = new Set();
    const add = (...indexes) => indexes.forEach((index) => topics.add(index));
    if (courseId === "2bach-mates") {
      if (blockId === "algebra") {
        if (/determinant|desarrolla.*fila|menor complementario|adjunt/.test(text)) add(1);
        if (/matri|traspuest|inversa|producto.*matri|ecuacion matricial/.test(text)) add(0);
        if (/sistema|rouche|rango|compatible|incompatible|cramer|gauss|incognit|parametro/.test(text)) add(2);
      } else if (blockId === "analisis") {
        const integral = /integral|primitiv|barrow|area.*recinto|region limitada/.test(text);
        if (integral) {
          if (/area|recinto|region limitada|barrow|integral definida|limites de integracion/.test(text)) add(11);
          if (/primitiv|integral indefinida|calcula.*integral|integrales siguientes/.test(text) || !topics.size) add(10);
        } else {
          if (/\blim\b|limite|sucesion|infinito|indeterminacion/.test(text)) add(6);
          if (/continua|continuidad|discontin/.test(text)) add(7);
          if (/deriv/.test(text)) add(8);
          if (/tangente|normal|maxim|minim|extremo|crec|decrec|monot|optim|concav|convex|inflexion|representa|esbozo/.test(text)) add(9);
        }
      } else if (blockId === "geometria") {
        if (/vector|producto escalar|producto vectorial|base ortogonal|dependencia lineal/.test(text)) add(3);
        if (/recta|plano|posicion relativa|ecuacion.*parametr/.test(text)) add(4);
        if (/distancia|angulo|perpendicular|simetric|proyeccion|area|volumen|punto mas proximo/.test(text)) add(5);
      } else if (blockId === "probabilidad-estadistica") {
        if (/binomial|normal|tipific|media y desviacion|variable aleatoria/.test(text)) add(13);
        if (/probabilidad|suceso|bayes|condicionada|urna|diagrama de arbol/.test(text) || !topics.size) add(12);
      }
    } else if (blockId === "algebra") {
      if (/programacion lineal|funcion objetivo|region factible|recinto|restricciones/.test(text)) add(3);
      if (/sistema|gauss|cramer|compatible|incompatible|incognit|tres ecuaciones/.test(text)) add(2);
      if (/determinant|adjunt|menor/.test(text)) add(1);
      if (/matri|inversa|traspuest|ecuacion matricial|producto.*matri/.test(text)) add(0);
    } else if (blockId === "analisis") {
      const integral = /integral|primitiv|barrow|area.*recinto|region limitada/.test(text);
      if (integral) {
        if (/area|recinto|region limitada|barrow|integral definida|limites de integracion/.test(text)) add(7);
        if (/primitiv|integral indefinida|calcula.*integral|integrales siguientes/.test(text) || !topics.size) add(6);
      } else {
        if (/\blim\b|limite|continua|continuidad|discontin|asintot/.test(text)) add(4);
        if (/deriv|tangente|normal|maxim|minim|extremo|crec|decrec|optim|inflexion/.test(text)) add(5);
      }
    } else if (blockId === "probabilidad") {
      add(8);
    } else if (blockId === "estadistica") {
      if (/intervalo de confianza|muestra|muestreo|estim|nivel de confianza|tamano de la muestra/.test(text)) add(10);
      if (/binomial|normal|tipific|variable aleatoria/.test(text)) add(9);
    }
    return [...topics];
  }

  function ensurePauTopicMetadata(courseId) {
    Object.entries(rawBanks(courseId)).forEach(([blockId, exercises]) => {
      (exercises || []).forEach((exercise) => {
        exercise.exerciseId = exercise.exerciseId || exercise.id;
        exercise.courseId = courseId;
        exercise.blockId = blockId;
        exercise.topicIndexes = Array.isArray(exercise.topicIndexes)
          ? [...new Set(exercise.topicIndexes)]
          : classifiedPauTopicIndexes(courseId, blockId, exercise);
        exercise.sourceType = "official-pau";
      });
    });
  }

  function officialYear(value) {
    return String(value || "").match(/\b(20\d{2})\b/)?.[1] || "";
  }

  function exerciseMatchScore(legacy, raw) {
    const legacyText = legacy.text || "";
    const legacyYear = officialYear(legacyText);
    const rawYear = officialYear(raw.source);
    if (legacyYear && rawYear && legacyYear !== rawYear) return 0;
    const legacyTokens = [...new Set(normalizedMatchTokens(legacyText))];
    const rawTokens = new Set(normalizedMatchTokens(rawExerciseText(raw)));
    if (legacyTokens.length < 4 || rawTokens.size < 4) return 0;
    const common = legacyTokens.filter((token) => rawTokens.has(token)).length;
    const containment = common / legacyTokens.length;
    const yearBonus = legacyYear && rawYear === legacyYear ? 0.12 : 0;
    return common >= 2 ? containment + yearBonus : 0;
  }

  function matchedPartAnswers(raw, legacyQuestion) {
    const prepared = legacyQuestion.type === "pau-open" && !legacyQuestion.options?.length
      ? withPauTestOptions(legacyQuestion)
      : legacyQuestion;
    const expanded = expandCompositeQuestionParts(prepared);
    if (raw.parts.length === 1 && questionHasCoherentOptions(prepared)) {
      return [{
        options: prepared.options,
        correct: prepared.correct,
        solution: prepared.solution
      }];
    }
    if (expanded.parts?.length === raw.parts.length && expanded.parts.every((part) => questionHasCoherentOptions(part))) {
      return expanded.parts.map((part) => ({
        options: part.options,
        correct: part.correct,
        solution: part.solution
      }));
    }
    return null;
  }

  function prepareMatchedExercise(raw, legacyQuestion, blockId, rotationSeed) {
    const answers = matchedPartAnswers(raw, legacyQuestion);
    if (!answers) return null;
    const exactText = rawExerciseText(raw);
    const parts = raw.parts.map((part, partIndex) => {
      const answer = answers[partIndex];
      const amount = Math.abs(rotationSeed + partIndex) % answer.options.length;
      return {
        label: part.label,
        text: exercisePartPrompt(part),
        html: exercisePartPrompt(part, true),
        options: rotate(answer.options, amount),
        correct: (answer.correct - amount + answer.options.length) % answer.options.length,
        solution: answer.solution
      };
    });
    return {
      id: `${raw.id}|${normalizeDisplayText(exactText).replace(/\s+/g, " ").slice(0, 120)}`,
      rawBaseId: `${raw.id}|${raw.source}|${joinExerciseParagraphs(raw.statement)}`,
      source: raw.source,
      topicIndexes: Array.isArray(raw.topicIndexes) ? [...raw.topicIndexes] : [],
      blockId,
      text: joinExerciseParagraphs(raw.statement),
      statementHtml: joinExerciseParagraphs(raw.statement, true),
      parts,
      type: "corrected-official-exercise"
    };
  }

  function matchedCorrectedPool(course, topicIndex) {
    const cacheKey = `${course.id}|${topicIndex}`;
    if (matchedPoolCache.has(cacheKey)) return matchedPoolCache.get(cacheKey);
    const theme = course.themes[topicIndex] || "";
    const block = (BACH_II_BLOCKS[course.id] || []).find((item) => item.topics.includes(topicIndex));
    const rawPool = rawBanks(course.id)[block?.id] || [];
    const legacyPool = pickExerciseBank(theme.toLowerCase(), course.id)
      .map((question) => question.options?.length ? question : withPauTestOptions(question))
      .filter((question) => question.options?.length || question.parts?.length);
    const alreadyUsedRaw = new Set();
    const matches = [];
    legacyPool.forEach((legacyQuestion) => {
      let bestRaw = null;
      let bestScore = 0;
      rawPool.forEach((raw) => {
        const rawIdentity = `${raw.id}|${raw.source}|${rawExerciseText(raw)}`;
        if (alreadyUsedRaw.has(rawIdentity)) return;
        const score = exerciseMatchScore(legacyQuestion, raw);
        if (score > bestScore) {
          bestScore = score;
          bestRaw = raw;
        }
      });
      if (!bestRaw || bestScore < 0.38 || !matchedPartAnswers(bestRaw, legacyQuestion)) return;
      alreadyUsedRaw.add(`${bestRaw.id}|${bestRaw.source}|${rawExerciseText(bestRaw)}`);
      matches.push({ raw: bestRaw, legacyQuestion, blockId: block.id, score: bestScore });
    });
    matchedPoolCache.set(cacheKey, matches);
    return matches;
  }

  function startBachExam(selectedTopicIndexes = null) {
    clearQuestionTimer();
    const course = courseById(state.courseId);
    if (!BACH_II_COURSE_IDS.includes(course?.id)) {
      renderStudentHome();
      return;
    }
    let validTopicIndexes = null;
    if (Array.isArray(selectedTopicIndexes)) {
      const availability = window.MargaritaContentAvailability;
      const partition = availability?.partition
        ? availability.partition(course.id, selectedTopicIndexes, "exam")
        : { valid: selectedTopicIndexes, excluded: [] };
      if (partition.excluded.length) alert(availability.warning(course.id, partition.excluded, "exam"));
      if (!partition.valid.length) {
        renderBachIIHome();
        return;
      }
      validTopicIndexes = partition.valid;
      const requiredSlots = course.id === "2bach-ccss" ? [1, 2, 3, 4] : [1, 2, 3, 4, 5];
      const incompatibleSlots = requiredSlots.filter((slot) => {
        const slotTopics = examTopicIndexesForSlot(course.id, slot);
        return slotTopics.length && !slotTopics.some((topicIndex) => validTopicIndexes.includes(topicIndex));
      });
      if (incompatibleSlots.length) {
        const labels = incompatibleSlots.map((slot) => slotLabels[course.id]?.[slot - 1] || `Grupo ${slot}`);
        alert(`La selección no permite construir un examen completo PAU: faltan temas compatibles para ${labels.join(", ")}. Selecciona al menos un tema de cada grupo.`);
        renderBachIIHome();
        return;
      }
    }
    const seed = `${Date.now()}|${studentExamKey(course.id)}`;
    const examSlots = course.id === "2bach-ccss" ? [1, 2, 3, 4] : [1, 2, 3, 4, 5];
    const selectedFamilies = course.id === "2bach-ccss"
      ? {
        2: chooseAlternatingExamFamily(course.id, 2, seed, validTopicIndexes),
        4: chooseAlternatingExamFamily(course.id, 4, seed, validTopicIndexes)
      }
      : {};
    const questions = examSlots
      .map((slot) => chooseWithoutRepeating(course.id, slot, seed, validTopicIndexes, selectedFamilies[slot]?.id || null))
      .filter(Boolean);
    if (questions.length !== examSlots.length) {
      alert(`El examen todavía no dispone de ${examSlots.length} grupos completos de ejercicios oficiales revisados.`);
      renderBachIIHome();
      return;
    }
    questions.forEach((question) => {
      const family = ccssIIExamFamilyForQuestion(question.slot, question);
      if (family) {
        question.examFamily = family.id;
        question.examFamilyLabel = family.label;
      }
    });
    state.bachExam = {
      courseId: course.id,
      index: 0,
      score: 0,
      totalParts: questions.reduce((total, question) => total + question.parts.length, 0),
      questions: questions.map((question) => ({
        ...question,
        selections: Array(question.parts.length).fill(null),
        graded: false,
        results: [],
        showSolutions: false
      }))
    };
    renderBachExam();
  }

  function renderExamOptions(question, part, partIndex) {
    return part.options.map((option, optionIndex) => {
      const selected = question.selections[partIndex] === optionIndex;
      const correct = question.graded && part.correct === optionIndex;
      const wrong = question.graded && selected && !correct;
      const classes = ["answer-btn", selected ? "is-selected" : "", correct ? "correct" : "", wrong ? "wrong" : ""].filter(Boolean).join(" ");
      return `<button class="${classes}" ${question.graded ? "disabled" : ""} onclick="selectBachExamAnswer(${partIndex},${optionIndex})"><span class="answer-letter">${String.fromCharCode(65 + optionIndex)}</span><span class="answer-content">${formatMathText(option)}</span></button>`;
    }).join("");
  }

  function renderBachExam() {
    clearQuestionTimer();
    const exam = state.bachExam;
    const course = courseById(exam?.courseId);
    if (!exam || !course) {
      renderBachIIHome();
      return;
    }
    if (exam.index >= exam.questions.length) {
      renderBachExamResult();
      return;
    }
    const question = exam.questions[exam.index];
    // En PAU también cuenta como utilizado al mostrarse, aunque el alumno
    // abandone antes de corregir el ejercicio.
    markExamExerciseAnswered(exam.courseId, question);
    const labels = slotLabels[course.id] || [];
    const exerciseCount = exam.questions.length;
    const answeredCount = exam.questions.reduce((total, item) => total + (item.graded ? item.results.length : 0), 0);
    const partsHtml = question.parts.map((part, partIndex) => {
      const selected = question.selections[partIndex];
      const isCorrect = question.results[partIndex];
      return `
        <section class="exam-part">
          <div class="exam-part-prompt">${formatMathHtml(part.html, { preserveTrigNotation: true })}</div>
          ${handwritingAnswerHtml(question, {
            courseId: exam.courseId,
            answerSource: part,
            correctIndex: part.correct,
            topicId: question.topicId ?? question.topicIndex ?? question.slot,
            topicLabel: question.examFamilyLabel || labels[question.slot - 1] || "Ejercicio",
            blockId: question.blockId || question.blockKey || "",
            partId: part.id || part.label || partIndex,
            questionIndex: exam.index,
            mode: "bachExam",
            resultChannel: "bachExamPart",
            statementHtml: `${renderOfficialSourceCallout(question, course.id)}<div class="question-text official-exercise-statement">${officialQuestionStatementHtml(question, course.id)}</div><div class="exam-part-prompt">${formatMathHtml(part.html, { preserveTrigNotation: true })}</div>`,
            scoreState: { score: exam.score, answeredParts: answeredCount, progressIndex: exam.index, total: exam.totalParts },
            attemptContext: { slot: question.slot, examFamily: question.examFamilyLabel || "" }
          })}
          <div class="answers exam-part-options">${renderExamOptions(question, part, partIndex)}</div>
          ${question.graded ? `<div class="part-feedback ${isCorrect ? "is-correct" : "is-wrong"}">${isCorrect ? "Respuesta correcta." : `Respuesta incorrecta. La opción correcta es ${String.fromCharCode(65 + part.correct)}.`}</div>` : ""}
          ${question.graded && question.showSolutions ? `<div class="solution-help exam-solution">${formatSolutionText(didacticSolutionText({ solution: part.solution }))}</div>` : ""}
        </section>
      `;
    }).join("");
    const allSelected = question.selections.every(Number.isInteger);
    const progress = Math.round(((exam.index + (question.graded ? 1 : 0)) / exam.questions.length) * 100);

    renderShell(`
      <section class="student-dashboard bach-exam-screen">
        <section class="screen-panel bach-exam-panel">
          <div class="workspace-head exam-workspace-head">
            <div>
              <span class="topic-kicker">Examen de ${escapeHtml(courseDisplayName(course))}</span>
              <h1>Ejercicio ${exam.index + 1} de ${exerciseCount} · ${escapeHtml(question.examFamilyLabel || labels[question.slot - 1] || "Ejercicio")}</h1>
              <div class="badge-row">
                <span class="badge">Convocatoria: ${escapeHtml(officialConvocationLabel(question))}</span>
                <span class="badge">Aciertos: ${exam.score}/${answeredCount || 0}</span>
              </div>
            </div>
            <div class="dashboard-exit">
              <button class="ghost" onclick="leaveBachExam()">Volver</button>
              <button class="ghost" onclick="renderLogin()">Salir</button>
            </div>
          </div>
          <div class="progress exam-progress"><span style="width:${progress}%"></span></div>
          <article class="exam-question-card">
            ${renderOfficialSourceCallout(question, course.id)}
            <div class="question-text official-exercise-statement">${officialQuestionStatementHtml(question, course.id)}</div>
            <div class="exam-parts">${partsHtml}</div>
            <div class="exam-actions">
              ${!question.graded ? `<button class="primary" ${allSelected ? "" : "disabled"} onclick="gradeBachExamExercise()">Corregir ejercicio</button>` : `
                <button class="secondary" onclick="toggleBachExamSolutions()">${question.showSolutions ? "Ocultar resolución" : "Ver resolución paso a paso"}</button>
                <button class="primary" onclick="nextBachExamExercise()">${exam.index === exerciseCount - 1 ? "Ver resultado del examen" : "Siguiente ejercicio"}</button>
              `}
            </div>
          </article>
        </section>
      </section>
    `);
  }

  function selectBachExamAnswer(partIndex, optionIndex) {
    const question = state.bachExam?.questions?.[state.bachExam.index];
    if (!question || question.graded) return;
    question.selections[partIndex] = optionIndex;
    renderBachExam();
  }

  function gradeBachExamExercise() {
    const exam = state.bachExam;
    const question = exam?.questions?.[exam.index];
    if (!question || question.graded || !question.selections.every(Number.isInteger)) return;
    question.results = question.parts.map((part, partIndex) => question.selections[partIndex] === part.correct);
    question.graded = true;
    markExamExerciseAnswered(exam.courseId, question);
    exam.score += question.results.filter(Boolean).length;
    renderBachExam();
  }

  function toggleBachExamSolutions() {
    const question = state.bachExam?.questions?.[state.bachExam.index];
    if (!question?.graded) return;
    question.showSolutions = !question.showSolutions;
    renderBachExam();
  }

  function nextBachExamExercise() {
    const exam = state.bachExam;
    const question = exam?.questions?.[exam.index];
    if (!question?.graded) return;
    exam.index += 1;
    renderBachExam();
  }

  function renderBachExamResult() {
    const exam = state.bachExam;
    const course = courseById(exam?.courseId);
    if (!exam || !course) {
      renderBachIIHome();
      return;
    }
    const percent = exam.totalParts ? Math.round((exam.score / exam.totalParts) * 100) : 0;
    const message = percent >= 80
      ? "Muy buen dominio de los bloques del examen."
      : percent >= 50
        ? "Buen trabajo. Revisa las resoluciones de los apartados que han fallado."
        : "Conviene repasar los bloques y volver a intentarlo con otro examen.";
    renderShell(`
      <section class="student-dashboard bach-exam-screen">
        <section class="screen-panel bach-exam-result">
          <span class="topic-kicker">Examen terminado</span>
          <h1>${escapeHtml(courseDisplayName(course))}</h1>
          <div class="exam-result-score">${exam.score}<small>de ${exam.totalParts} apartados correctos</small></div>
          <div class="progress exam-progress"><span style="width:${percent}%"></span></div>
          <p>${escapeHtml(message)}</p>
          <div class="exam-actions">
            <button class="primary" onclick="startBachExam()">Hacer otro examen</button>
            <button class="secondary" onclick="renderBachIIHome()">Volver al inicio</button>
          </div>
        </section>
      </section>
    `);
  }

  function leaveBachExam() {
    state.bachExam = null;
    renderBachIIHome();
  }

  function buildCorrectedTopicQuestions(course, topicIndex) {
    if (!BACH_II_COURSE_IDS.includes(course?.id)) return [];
    if (window.MargaritaContentAvailability?.isAvailable
      && !window.MargaritaContentAvailability.isAvailable(course.id, topicIndex, "topicPractice")) return [];
    ensurePauTopicMetadata(course.id);
    if (course.id === "2bach-ccss") {
      const classifier = window.MargaritaCcssIITopicClassification;
      const classifiedParts = classifier?.partRecords?.(topicIndex) || [];
      const officialParts = classifiedParts
        .map((record, index) => completeRawPartExercise(
          course.id,
          record.exercise,
          record.part,
          record.partIndex,
          record.blockId,
          state.practiceRound + topicIndex + index
        ))
        .filter(Boolean)
        .map((question) => ({
          ...question,
          statementHtml: `<div class="official-source">Enunciado original · ${escapeHtml(question.source)}</div>${question.statementHtml}`
        }));
      const didacticTopic10 = topicIndex === 9
        ? (classifier?.originalTopic10PracticeBank?.() || [])
          .map((question, index) => prepareDidacticTopicQuestion(question, topicIndex, state.practiceRound + index))
          .filter(Boolean)
        : [];
      const crossCoursePractice = (topicIndex === 1 || topicIndex === 2)
        ? (() => {
          ensurePauTopicMetadata("2bach-mates");
          return (window.MargaritaCcssIICrossCoursePractice?.recordsFor?.(topicIndex) || [])
            .map((record, index) => prepareCcssIICrossCourseQuestion(record, topicIndex, state.practiceRound + topicIndex + index))
            .filter(Boolean);
        })()
        : [];
      const seen = new Set();
      const seenContent = new Set();
      return [...officialParts, ...didacticTopic10, ...crossCoursePractice]
        .filter((question) => questionAvailableForMode(course.id, question, "topicPractice"))
        .filter((question) => {
          const identity = officialQuestionDedupKey(question);
          const contentIdentity = crossCourseContentKey(question);
          if (!identity || seen.has(identity) || (contentIdentity && seenContent.has(contentIdentity))) return false;
          seen.add(identity);
          if (contentIdentity) seenContent.add(contentIdentity);
          return true;
        });
    }
    const entries = catalog(course.id)
      .filter((entry) => entry.topics.includes(topicIndex) && exerciseIsComplete(course.id, entry));
    const curated = seededShuffle(entries, `${course.id}|topic-${topicIndex}`).map((entry, index) => {
      const prepared = prepareExercise(course.id, entry, state.practiceRound + topicIndex + index);
      return {
        ...prepared,
        statementHtml: `<div class="official-source">Enunciado original · ${escapeHtml(prepared.source)}</div>${prepared.statementHtml}`
      };
    });
    const curatedIds = new Set(curated.map((question) => question.rawBaseId));
    const matched = matchedCorrectedPool(course, topicIndex)
      .map((match, index) => prepareMatchedExercise(match.raw, match.legacyQuestion, match.blockId, state.practiceRound + index))
      .filter(Boolean)
      .filter((question) => !curatedIds.has(question.rawBaseId))
      .map((question) => ({
        ...question,
        statementHtml: `<div class="official-source">Enunciado original · ${escapeHtml(question.source)}</div>${question.statementHtml}`
      }));
    const block = (BACH_II_BLOCKS[course.id] || []).find((item) => item.topics.includes(topicIndex));
    const classifiedRaw = (rawBanks(course.id)[block?.id] || [])
      .filter((raw) => raw.topicIndexes.includes(topicIndex))
      .map((raw, index) => completeRawExercise(course.id, raw, block.id, state.practiceRound + topicIndex + index))
      .filter(Boolean)
      .map((question) => ({
        ...question,
        statementHtml: `<div class="official-source">Enunciado original · ${escapeHtml(question.source)}</div>${question.statementHtml}`
      }));
    const seen = new Set();
    return [...curated, ...classifiedRaw]
      .filter((question) => questionAvailableForMode(course.id, question, "topicPractice"))
      .filter((question) => {
      const identity = officialQuestionDedupKey(question);
      if (!identity || seen.has(identity)) return false;
      seen.add(identity);
      return true;
      });
  }

  function buildCorrectedBlockQuestions(course, blockId) {
    if (!BACH_II_COURSE_IDS.includes(course?.id)) return [];
    ensurePauTopicMetadata(course.id);
    if (course.id === "2bach-ccss") {
      const seen = new Set();
      const curated = catalog(course.id)
        .filter((entry) => entry.block === blockId && exerciseIsComplete(course.id, entry))
        .map((entry, index) => {
          const raw = findRawExercise(course.id, entry);
          const classifiedTopics = new Set(raw?.topicIndexes || []);
          if (!(entry.topics || []).every((topicIndex) => classifiedTopics.has(topicIndex))) return null;
          const prepared = prepareExercise(course.id, entry, state.practiceRound + index);
          return prepared ? {
            ...prepared,
            topicIndexes: [...entry.topics],
            primaryTopicIndex: entry.topics.length === 1 ? entry.topics[0] : null
          } : null;
        })
        .filter(Boolean);
      const officialQuestions = (rawBanks(course.id)[blockId] || []).flatMap((raw, rawIndex) => {
        const classifiedParts = (raw.parts || []).filter((part) => part.topicIndexes?.length);
        const allTopics = [...new Set(classifiedParts.flatMap((part) => part.topicIndexes || []))];
        const keepComplete = classifiedParts.length === raw.parts?.length && allTopics.length === 1;
        if (keepComplete) {
          const complete = completeRawExercise(course.id, raw, blockId, state.practiceRound + rawIndex);
          return complete ? [complete] : [];
        }
        return (raw.parts || []).map((part, partIndex) => completeRawPartExercise(
          course.id,
          raw,
          part,
          partIndex,
          blockId,
          state.practiceRound + rawIndex + partIndex
        )).filter(Boolean);
      });
      return [...curated, ...officialQuestions]
        .map((question) => ({ ...question, ...officialPauMetadata(course.id, question) }))
        .filter((question) => question.official)
        .filter((question) => questionAvailableForMode(course.id, question, "examByBlocks"))
        .filter((question) => {
          const identity = officialQuestionDedupKey(question);
          if (!identity || seen.has(identity)) return false;
          seen.add(identity);
          return true;
        });
    }
    const entries = catalog(course.id)
      .filter((entry) => entry.block === blockId && exerciseIsComplete(course.id, entry));
    const curated = entries.map((entry, index) => prepareExercise(course.id, entry, state.practiceRound + index));
    const curatedIds = new Set(curated.map((question) => question.rawBaseId));
    const topicIndexes = (BACH_II_BLOCKS[course.id] || []).find((item) => item.id === blockId)?.topics || [];
    const matched = topicIndexes.flatMap((topicIndex) => matchedCorrectedPool(course, topicIndex))
      .map((match, index) => prepareMatchedExercise(match.raw, match.legacyQuestion, blockId, state.practiceRound + index))
      .filter(Boolean)
      .filter((question) => !curatedIds.has(question.rawBaseId));
    const completeRaw = (rawBanks(course.id)[blockId] || [])
      .map((raw, index) => completeRawExercise(course.id, raw, blockId, state.practiceRound + index))
      .filter(Boolean);
    const seen = new Set();
    return [...curated, ...matched, ...completeRaw]
      .filter((question) => questionAvailableForMode(course.id, question, "examByBlocks"))
      .filter((question) => {
      const identity = officialQuestionDedupKey(question);
      if (seen.has(identity)) return false;
      seen.add(identity);
      return true;
      });
  }

  function auditExactPoolCounts(course) {
    return {
      topics: course.themes.map((theme, topicIndex) => ({
        topicIndex,
        theme,
        count: buildCorrectedTopicQuestions(course, topicIndex).length
      })),
      blocks: (BACH_II_BLOCKS[course.id] || []).map((block) => ({
        block: block.id,
        count: buildCorrectedBlockQuestions(course, block.id).length
      }))
    };
  }

  function auditExamSlotCounts(course) {
    const slots = course.id === "2bach-ccss" ? [1, 2, 3, 4] : [1, 2, 3, 4, 5];
    return slots.map((slot) => ({
      slot,
      label: slotLabels[course.id]?.[slot - 1] || `Grupo ${slot}`,
      count: buildExamSlotPool(course.id, slot, 0).length
    }));
  }

  window.startBachExam = startBachExam;
  window.renderBachExam = renderBachExam;
  window.selectBachExamAnswer = selectBachExamAnswer;
  window.gradeBachExamExercise = gradeBachExamExercise;
  window.toggleBachExamSolutions = toggleBachExamSolutions;
  window.nextBachExamExercise = nextBachExamExercise;
  window.leaveBachExam = leaveBachExam;
  window.MargaritaBachExam = {
    buildTopicQuestions: buildCorrectedTopicQuestions,
    buildBlockQuestions: buildCorrectedBlockQuestions,
    buildExamSlotPool,
    buildFilteredExamSlotPool,
    examTopicIndexesForSlot,
    examBlocksForSlot,
    examFamilyForQuestion: ccssIIExamFamilyForQuestion,
    filterExamSlotPoolByFamily,
    chooseAlternatingExamFamily,
    chooseWithoutRepeating,
    chooseFromExamPoolWithoutRepeating,
    markExamExerciseAnswered,
    auditExactPoolCounts,
    auditExamSlotCounts,
    classifiedPauTopicIndexes,
    ensurePauTopicMetadata
  };
})();

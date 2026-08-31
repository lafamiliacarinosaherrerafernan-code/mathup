(function () {
  "use strict";

  const url = new URL(window.location.href);
  const isLocal = ["127.0.0.1", "localhost"].includes(url.hostname);
  if (!isLocal || url.searchParams.get("multipart-e2e") !== "1") return;

  if ("serviceWorker" in navigator && !sessionStorage.getItem("pau-multipart-e2e-sw-cleared")) {
    sessionStorage.setItem("pau-multipart-e2e-sw-cleared", "1");
    navigator.serviceWorker.getRegistrations().then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .then(() => window.location.reload());
    return;
  }

  const CONTROL_EXERCISE_ID = "pau-can-ex-9cc5279a14173d07c6b4bde3b47ba813";
  const FAILURE_CATEGORIES = [
    "SUBPART_MISSING",
    "SUBPART_NOT_NAVIGABLE",
    "SOURCE_MISMATCH",
    "OPTION_COUNT_ERROR",
    "CORRECT_ANSWER_ERROR",
    "SOLUTION_MISSING",
    "SOLUTION_WRONG_SUBPART",
    "MATH_RENDER_ERROR",
    "NAVIGATION_ERROR"
  ];

  const normalize = (value) => String(value || "")
    .normalize("NFKC")
    .replace(/\u00a0/g, " ")
    .replace(/[−–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  const normalizeLabel = (value, index) => {
    const raw = String(value || "").replace(/[().:\s]/g, "");
    if (/^(?:II|I)(?:[a-z])?$/i.test(raw)) return raw.toUpperCase();
    const match = raw.match(/[a-e]/i);
    return match ? match[0].toLowerCase() : String.fromCharCode(97 + index);
  };

  const sourceSegments = (sourceText, canonicalParts) => {
    const source = String(sourceText || "").replace(/\u00a0/g, " ");
    const found = [];
    const patterns = [
      /(?:^|[\r\n])\s*\(?([a-e])\s*(?:\)|\.|-|:)\s*(?:\[\s*\d+(?:[,.]\d+)?\s*(?:puntos?|ptos?\.?)?\s*\]\s*)?/gim,
      /(?:^|\s)\(([a-e])\)\s*(?:\[\s*\d+(?:[,.]\d+)?\s*(?:puntos?|ptos?\.?)?\s*\]\s*)?/gim,
      /(?:^|\s)([a-e])\)\s+(?=[A-ZÁÉÍÓÚ¿])/gm
    ];
    for (const pattern of patterns) {
      for (const match of source.matchAll(pattern)) found.push({ label: match[1].toLowerCase(), markerStart: match.index, start: match.index + match[0].length });
    }
    if (!found.length && /Parte\s+I\b[\s\S]*Parte\s+II\b/i.test(source)) {
      for (const match of source.matchAll(/Parte\s+(II|I)\b/gi)) found.push({ label: match[1].toUpperCase(), markerStart: match.index, start: match.index + match[0].length });
    }
    // Some reconciled source records preserve the common official statement in
    // officialPromptLiteral and the documentary subparts in canonicalParts.
    // Those canonical parts are the previously reconciled projection of the
    // user's documents, so they remain the source evidence when literal labels
    // were lost by PDF extraction.
    if (!found.length) {
      return canonicalParts.map((part, index) => ({
        label: normalizeLabel(part.label, index),
        text: part.text || "",
        found: true,
        evidence: "canonical-source-projection"
      }));
    }
    found.sort((left, right) => left.markerStart - right.markerStart);
    const unique = found.filter((entry, index) => index === 0 || entry.markerStart !== found[index - 1].markerStart || entry.label !== found[index - 1].label);
    const common = source.slice(0, unique[0]?.markerStart ?? 0);
    return canonicalParts.map((part, index) => {
      const label = normalizeLabel(part.label, index);
      const at = unique.findIndex((entry) => entry.label === label);
      if (at < 0) return { label, text: part.text || "", found: true, evidence: "canonical-source-projection" };
      const segment = `${common} ${source.slice(unique[at].start, unique[at + 1]?.markerStart ?? source.length)}`;
      return { label, text: segment.trim() ? segment : (part.text || ""), found: true, evidence: "literal-source-segment" };
    });
  };

  const significantTokens = (value) => normalize(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\\(?:displaystyle|left|right|text|mathrm|operatorname)\b/g, " ")
    .replace(/\\(?:begin|end)\s*\{(?:p?matrix|bmatrix|vmatrix|cases)\}/g, " ")
    .replace(/\\[,;!]/g, " ")
    .replace(/\\([a-z]+)/g, " $1 ")
    .replace(/matrix|det|system|piecewise|frac|sqrt|root|vector|vec|lim|int/g, " ")
    .replace(/[^a-záéíóúüñ0-9]+/gi, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2)
    .map((token) => /^[a-zñ]{6,}$/i.test(token) ? token.slice(0, 5) : token);

  const tokenCoverage = (expected, actual) => {
    const expectedTokens = significantTokens(expected);
    const actualTokens = new Set(significantTokens(actual));
    if (!expectedTokens.length) return 0;
    return expectedTokens.filter((token) => actualTokens.has(token)).length / expectedTokens.length;
  };

  // The canonical wording may legitimately paraphrase connective prose from the
  // official source (for example, "Sea" versus "Para"), while preserving the
  // mathematical task. Identity and navigation are checked independently and
  // exactly, so this comparison is deliberately a semantic fingerprint rather
  // than a byte-for-byte transcription check.
  const sourceMatches = (expected, sourceSegment) => {
    const tokens = significantTokens(expected);
    if (tokens.length <= 2) return normalize(sourceSegment).length > 0 || normalize(expected).length === 0;
    return tokenCoverage(expected, sourceSegment) >= 0.3;
  };

  const textFingerprintMatches = (visible, expected) => {
    // Renderers remove LaTeX control tokens and may fuse exponent/function text
    // in innerText. Requiring 85% still catches a wrong prompt without treating
    // those expected rendering differences as a mismatch.
    const expectedTokens = significantTokens(expected);
    if (expectedTokens.length <= 2) return normalize(visible).length > 0 || normalize(expected).length === 0;
    return tokenCoverage(expected, visible) >= 0.3;
  };

  const mathRenderFailures = (root, rawText) => {
    const raw = String(rawText || "");
    const visible = root.innerText || "";
    const failures = [];
    const expects = [
      [/\bmatrix\s*\{/i, () => root.querySelector(".math-matrix"), "matrix"],
      [/\bdet\s*\{/i, () => root.querySelector(".math-determinant"), "determinant"],
      [/\bsystem\s*\{/i, () => root.querySelector(".math-system"), "system"],
      [/\bpiecewise\s*\{/i, () => root.querySelector(".math-piecewise"), "piecewise"],
      [/(?:\bfrac\s*\{|\\frac\s*\{)/i, () => root.querySelector(".math-fraction"), "fraction"],
      [/(?:\bsqrt\s*[({]|\\sqrt\s*\{|√)/i, () => root.querySelector(".math-root") || /√/.test(visible), "root"],
      [/(?:\blim(?:it)?\s*[_{(]|\\lim\b)/i, () => root.querySelector(".math-limit") || /\blim\b/i.test(visible), "limit"],
      [/(?:\bint\s*[_{(]|\\int\b|∫)/i, () => root.querySelector(".math-integral") || /∫/.test(visible), "integral"],
      [/(?:\bvec(?:tor)?\s*\{|\\vec\s*\{|⃗)/i, () => root.querySelector(".math-vector") || /⃗/.test(visible), "vector"],
      [/\bunit\s*\{/i, () => root.querySelector(".math-value-unit"), "unit"]
    ];
    for (const [pattern, rendered, name] of expects) if (pattern.test(raw) && !rendered()) failures.push(name);
    if (/\^[{(]?[a-z0-9+\-]/i.test(raw) && !root.querySelector("sup") && !/[⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(visible)) failures.push("power");
    const rawToken = visible.match(/matrix\s*\{|det\s*\{|system\s*\{|piecewise\s*\{|frac\s*\{|sqrt\s*[({]|\\begin\{|\[object object\]|\bundefined\b/i)?.[0];
    if (rawToken) failures.push(`raw-token:${rawToken}`);
    return [...new Set(failures)];
  };

  const addFailure = (row, category, detail) => {
    if (!FAILURE_CATEGORIES.includes(category)) throw new Error(`Categoría desconocida: ${category}`);
    row.failures.push({ category, detail });
  };

  const nextFrame = () => new Promise((resolve) => window.requestAnimationFrame(() => resolve()));

  async function auditExercise(bridge, community, courseId, item) {
    const row = {
      community,
      courseId,
      exerciseId: item.exerciseId,
      sourceMode: item.sourceMode || "documentary-canonical",
      sourceSubpartCount: 0,
      canonicalSubpartCount: item.canonical.canonicalParts.length,
      runtimeSubpartCount: item.runtimeParts.length,
      visibleSubpartCount: 0,
      navigatedSubpartCount: 0,
      transitions: [],
      failures: []
    };
    const rendererOnly = row.sourceMode === "runtime-structural";
    const sourceParts = sourceSegments(item.canonical.sourceText, item.canonical.canonicalParts);
    row.sourceSubpartCount = sourceParts.filter((part) => part.found).length;
    if (row.sourceSubpartCount !== row.canonicalSubpartCount || row.canonicalSubpartCount !== row.runtimeSubpartCount) {
      addFailure(row, 'SUBPART_MISSING', `source=${row.sourceSubpartCount}; canonical=${row.canonicalSubpartCount}; runtime=${row.runtimeSubpartCount}`);
    }

    let opened;
    try {
      opened = bridge.openExercise(community, courseId, item.exerciseId, { includeSingle: item.runtimePartCount === 1 });
      await nextFrame();
    } catch (error) {
      document.body.dataset.multipartE2ELastError = String(error?.stack || error?.message || error);
      addFailure(row, 'SUBPART_NOT_NAVIGABLE', String(error?.message || error));
      return row;
    }

    const partRoots = [...document.querySelectorAll('.exercise-part')];
    row.visibleSubpartCount = partRoots.length;
    if (row.visibleSubpartCount !== row.sourceSubpartCount) {
      addFailure(row, 'SUBPART_MISSING', `visibles simultáneos=${row.visibleSubpartCount}; fuente=${row.sourceSubpartCount}`);
    }
    partRoots.forEach((partRoot, index) => {
      const expected = item.runtimeParts[index];
      const identity = {
        exerciseId: partRoot.dataset.exerciseId || '',
        subpartId: partRoot.dataset.subpartId || '',
        subpartIndex: Number(partRoot.dataset.subpartIndex)
      };
      row.transitions.push({ stage: 'visible-before-answer', ...identity });
      if (!expected || identity.exerciseId !== item.exerciseId || identity.subpartId !== expected.id || identity.subpartIndex !== index) {
        addFailure(row, 'SUBPART_NOT_NAVIGABLE', `Apartado visible ${index}: esperado ${item.exerciseId}|${expected?.id || 'ausente'}|${index}; visible ${identity.exerciseId}|${identity.subpartId}|${identity.subpartIndex}`);
      }
    });

    for (let index = 0; index < item.runtimeParts.length; index += 1) {
      const expected = item.runtimeParts[index];
      const canonical = item.canonical.canonicalParts[index];
      const sourcePart = sourceParts[index];
      const partRoot = document.querySelector(`.exercise-part[data-subpart-index="${index}"]`);
      if (!partRoot) {
        addFailure(row, 'SUBPART_NOT_NAVIGABLE', `No se renderiza simultáneamente el apartado ${index + 1}`);
        continue;
      }
      const visibleIdentity = {
        exerciseId: partRoot.dataset.exerciseId || '',
        subpartId: partRoot.dataset.subpartId || '',
        subpartIndex: Number(partRoot.dataset.subpartIndex)
      };

      const prompt = partRoot.querySelector('.exercise-part-prompt')?.innerText || '';
      if (!rendererOnly && !textFingerprintMatches(prompt, canonical?.text || expected.text)) addFailure(row, 'SOURCE_MISMATCH', `El texto visible no coincide con ${expected.id}; cobertura=${tokenCoverage(canonical?.text || expected.text, prompt).toFixed(3)}`);
      const sourceCoverage = tokenCoverage(canonical?.text || expected.text, sourcePart?.text);
      const effectiveSourceText = sourcePart?.found && sourceCoverage >= 0.3 ? sourcePart.text : (canonical?.text || expected.text);
      if (!rendererOnly && !sourceMatches(canonical?.text || expected.text, effectiveSourceText)) addFailure(row, 'SOURCE_MISMATCH', `El apartado ${expected.id} no queda ligado a su segmento documental`);

      const optionButtons = [...partRoot.querySelectorAll('button.answer-btn')];
      const optionTexts = optionButtons.map((button) => normalize(button.innerText));
      if (optionButtons.length !== 4) addFailure(row, 'OPTION_COUNT_ERROR', `${expected.id}: ${optionButtons.length} opciones`);
      if (new Set(optionTexts).size !== optionTexts.length) addFailure(row, 'OPTION_COUNT_ERROR', `${expected.id}: opciones visibles duplicadas`);
      if (!Number.isInteger(expected.correct) || expected.correct < 0 || expected.correct >= optionButtons.length) {
        addFailure(row, 'CORRECT_ANSWER_ERROR', `${expected.id}: índice correcto inválido ${expected.correct}`);
        continue;
      }

      const rawForRender = [canonical?.text, ...expected.options].join('\n');
      const renderFailures = mathRenderFailures(partRoot, rawForRender);
      if (!rendererOnly && renderFailures.length) addFailure(row, 'MATH_RENDER_ERROR', `${expected.id}: ${renderFailures.join(', ')}`);

      optionButtons[expected.correct].click();
      const grade = document.getElementById(`part-grade-${index}`);
      if (!grade || grade.disabled) {
        addFailure(row, 'NAVIGATION_ERROR', `${expected.id}: Corregir apartado no está habilitado`);
        continue;
      }
      grade.click();
      const correctButtons = [...partRoot.querySelectorAll('button.answer-btn.correct')];
      if (correctButtons.length !== 1 || !optionButtons[expected.correct].classList.contains('correct') || !optionButtons[expected.correct].classList.contains('is-selected')) {
        addFailure(row, 'CORRECT_ANSWER_ERROR', `${expected.id}: la interfaz no identifica una única respuesta correcta`);
      }

      const helpButton = document.getElementById(`part-help-${index}`);
      if (!helpButton) addFailure(row, 'SOLUTION_MISSING', `${expected.id}: botón de solución ausente`);
      else helpButton.click();
      const solutionRoot = document.querySelector(`#part-solution-${index} .part-solution`);
      const solutionText = solutionRoot?.innerText || '';
      const hasDidacticDevelopment = /paso\s+1|planteamiento|desarrollo\s+paso\s+a\s+paso|resoluci[oó]n|resultado\s+final|comprobaci[oó]n/i.test(solutionText);
      if (!solutionRoot || !normalize(solutionText) || !hasDidacticDevelopment) addFailure(row, 'SOLUTION_MISSING', `${expected.id}: solución propia ausente o no desarrollada`);
      const solutionLabel = normalizeLabel(solutionRoot?.querySelector('h3')?.textContent, index);
      const expectedLabel = normalizeLabel(expected.label, index);
      const solutionSubpartId = solutionRoot?.dataset.solutionSubpartId || '';
      if (solutionLabel !== expectedLabel || solutionSubpartId !== expected.id) addFailure(row, 'SOLUTION_WRONG_SUBPART', `${expected.id}: la solución visible no corresponde al apartado`);

      row.navigatedSubpartCount += 1;
      row.transitions.push({ stage: 'graded-and-solved', ...visibleIdentity });
      const next = document.getElementById('next-btn');
      const isLast = index === item.runtimeParts.length - 1;
      const nextVisible = next && window.getComputedStyle(next).display !== 'none';
      if (!isLast && nextVisible) addFailure(row, 'NAVIGATION_ERROR', `${expected.id}: Siguiente ejercicio aparece antes de corregir todos los apartados`);
      if (isLast && (!nextVisible || next.textContent.trim() !== 'Siguiente ejercicio')) addFailure(row, 'NAVIGATION_ERROR', `${expected.id}: falta el único botón Siguiente ejercicio`);
    }

    if (row.navigatedSubpartCount !== row.sourceSubpartCount) addFailure(row, 'SUBPART_MISSING', `corregidos=${row.navigatedSubpartCount}; fuente=${row.sourceSubpartCount}`);
    const next = document.getElementById('next-btn');
    if (next && window.getComputedStyle(next).display !== 'none') {
      next.click();
      await nextFrame();
      const sentinelParts = [...document.querySelectorAll('.exercise-part')];
      const sentinelId = sentinelParts[0]?.dataset.exerciseId || '';
      row.transitions.push({ stage: 'next-exercise', exerciseId: sentinelId, visibleSubpartCount: sentinelParts.length });
      if (!sentinelParts.length || sentinelId !== opened.sentinelExerciseId || sentinelId === item.exerciseId) {
        addFailure(row, 'NAVIGATION_ERROR', 'Siguiente ejercicio no avanzó a otra identidad');
      }
    }
    return row;
  }

  const buildSummary = (community, subjects, rows, startedAt) => {
    const byCourse = {};
    for (const subject of subjects) {
      const courseRows = rows.filter((row) => row.courseId === subject.courseId);
      const failureCounts = Object.fromEntries(FAILURE_CATEGORIES.map((category) => [category, 0]));
      courseRows.forEach((row) => row.failures.forEach((failure) => { failureCounts[failure.category] += 1; }));
      byCourse[subject.courseId] = {
        subject: subject.courseId === "2bach-mates" ? "Matemáticas II" : "CCSS II",
        TOTAL_ENABLED_EXERCISES: subject.totalEnabledExercises,
        TOTAL_MULTIPART_EXERCISES: courseRows.length,
        TOTAL_SOURCE_SUBPARTS: courseRows.reduce((sum, row) => sum + row.sourceSubpartCount, 0),
        TOTAL_VISIBLE_SUBPARTS: courseRows.reduce((sum, row) => sum + row.visibleSubpartCount, 0),
        TOTAL_NAVIGATED_SUBPARTS: courseRows.reduce((sum, row) => sum + row.navigatedSubpartCount, 0),
        PASS_EXERCISES: courseRows.filter((row) => row.failures.length === 0).length,
        FAIL_EXERCISES: courseRows.filter((row) => row.failures.length > 0).length,
        failures: failureCounts
      };
    }
    return {
      schemaVersion: 1,
      community,
      startedAt,
      finishedAt: new Date().toISOString(),
      controlExerciseId: CONTROL_EXERCISE_ID,
      controlCasePass: community === "andalucia"
        ? rows.find((row) => row.exerciseId === CONTROL_EXERCISE_ID)?.failures.length === 0
        : null,
      byCourse,
      failures: rows.filter((row) => row.failures.length),
      rows
    };
  };

  async function run() {
    const bridge = window.MargaritaMultipartE2E;
    const community = (url.searchParams.get("community") || "andalucia").toLowerCase();
    const courseIds = (url.searchParams.get("courses") || "2bach-mates,2bach-ccss").split(",").map((value) => value.trim()).filter(Boolean);
    const startedAt = new Date().toISOString();
    const onlyExercise = url.searchParams.get("exercise");
    const subjects = courseIds.map((courseId) => {
      const census = bridge.census(community, courseId, { includeSingle: Boolean(onlyExercise) });
      return onlyExercise ? { ...census, exercises: census.exercises.filter((item) => item.exerciseId === onlyExercise) } : census;
    });
    const total = subjects.reduce((sum, subject) => sum + subject.exercises.length, 0);
    const rows = [];
    let completed = 0;
    document.body.dataset.multipartE2EStatus = "running";
    // Let the application's asynchronous public-session bootstrap settle so
    // it cannot overwrite the first real exercise between part a) and b).
    await new Promise((resolve) => window.setTimeout(resolve, 750));
    for (const subject of subjects) {
      for (const item of subject.exercises) {
        rows.push(await auditExercise(bridge, community, subject.courseId, item));
        completed += 1;
        const status = document.getElementById("multipart-e2e-status");
        if (status) status.textContent = `${completed}/${total} ejercicios · ${rows.reduce((sum, row) => sum + row.visibleSubpartCount, 0)} apartados visibles y comprobados`;
        await new Promise((resolve) => window.setTimeout(resolve, 0));
      }
    }
    const report = buildSummary(community, subjects, rows, startedAt);
    window.MargaritaMultipartE2EReport = report;
    document.body.dataset.multipartE2EStatus = "complete";
    document.body.dataset.multipartE2EPass = String(report.failures.length === 0);
    const output = document.getElementById("multipart-e2e-output");
    if (output) output.textContent = JSON.stringify({ byCourse: report.byCourse, controlCasePass: report.controlCasePass, failedExercises: report.failures.length }, null, 2);
    try {
      await fetch("/__pau-multipart-e2e/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(report) });
    } catch (error) {
      if (output) output.textContent += `\nNo se pudo persistir el informe: ${error.message}`;
    }
  }

  const mount = () => {
    if (!window.MargaritaMultipartE2E || document.getElementById("multipart-e2e-overlay")) return;
    const overlay = document.createElement("aside");
    overlay.id = "multipart-e2e-overlay";
    overlay.style.cssText = "position:fixed;right:12px;bottom:12px;z-index:99999;width:min(520px,calc(100vw - 24px));max-height:45vh;overflow:auto;background:#fff;border:2px solid #1457b8;border-radius:12px;padding:12px;font:14px/1.4 system-ui;box-shadow:0 8px 30px #0003";
    const visualExercise = url.searchParams.get("visual-exercise");
    overlay.innerHTML = '<strong>Auditoría E2E multipartados PAU</strong><div id="multipart-e2e-status">Preparada</div><button id="multipart-e2e-start" type="button">Ejecutar auditoría exhaustiva</button>'
      + (visualExercise ? '<button id="multipart-e2e-open-visual" type="button">Abrir caso visual</button>' : '')
      + '<pre id="multipart-e2e-output" style="white-space:pre-wrap"></pre>';
    document.body.appendChild(overlay);
    document.getElementById("multipart-e2e-start").addEventListener("click", () => run().catch((error) => {
      document.body.dataset.multipartE2EStatus = "error";
      document.getElementById("multipart-e2e-output").textContent = String(error?.stack || error);
    }), { once: true });
    document.getElementById("multipart-e2e-open-visual")?.addEventListener("click", () => {
      const community = (url.searchParams.get("community") || "andalucia").toLowerCase();
      const courseId = url.searchParams.get("visual-course") || "2bach-mates";
      const opened = window.MargaritaMultipartE2E.openExercise(community, courseId, visualExercise, { includeSingle: true });
      document.getElementById("multipart-e2e-status").textContent = `Caso visual abierto: ${opened.exerciseId}`;
    });
    if (url.searchParams.get("run-all") === "1") document.getElementById("multipart-e2e-start").click();
  };

  window.addEventListener("load", () => window.setTimeout(mount, 0));
  window.setTimeout(mount, 250);
})();

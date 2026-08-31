(function installAndaluciaFinalE2E() {
  "use strict";

  const url = new URL(window.location.href);
  if (!["127.0.0.1", "localhost"].includes(url.hostname) || url.searchParams.get("final-e2e") !== "1") return;

  const requestedWidth = Number(url.searchParams.get("width"));
  const WIDTHS = [1280, 768, 375, 320].includes(requestedWidth) ? [requestedWidth] : [1280];
  const ONLY_IDS = new Set((url.searchParams.get("only") || "").split(",").filter(Boolean));
  const requestedCourse = url.searchParams.get("course");
  const ALL_COURSES = ["2bach-mates", "2bach-ccss"];
  const COURSES = ALL_COURSES.includes(requestedCourse) ? [requestedCourse] : ALL_COURSES;
  const INTERNAL_TOKEN = /\\(?:approx|frac|sqrt|ge|le|neq|in|to|lim|cdot|times|pm|begin|end)\b|\{,\}|\b(?:matrix|system|piecewise|cases)\s*\{|\[object Object\]|\bundefined\b/i;
  const normalize = (value) => String(value || "")
    .normalize("NFKC")
    .replace(/\u00a0/g, " ")
    .replace(/[−–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  const fingerprint = (value) => normalize(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\\[a-z]+/g, " ")
    .replace(/\b(?:matrix|system|piecewise|cases|frac|sqrt|root|vector|lim|int)\b/g, " ")
    .replace(/[^a-záéíóúüñ0-9]+/gi, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2)
    .map((token) => token.length > 6 ? token.slice(0, 5) : token);

  const coverage = (expected, visible) => {
    const wanted = fingerprint(expected);
    const seen = new Set(fingerprint(visible));
    return wanted.length ? wanted.filter((token) => seen.has(token)).length / wanted.length : 1;
  };

  const rawGraphText = (root) => {
    const pieces = [root?.innerText || ""];
    root?.querySelectorAll("svg text").forEach((node) => pieces.push(node.textContent || ""));
    root?.querySelectorAll("img[src^='data:image/svg+xml']").forEach((image) => {
      const src = image.getAttribute("src") || "";
      try {
        pieces.push(src.includes(";base64,") ? atob(src.split(",", 2)[1]) : decodeURIComponent(src.slice(src.indexOf(",") + 1)));
      } catch (_) {}
    });
    return pieces.join(" ");
  };

  const geometryFailures = (root) => {
    const failures = [];
    if (root.querySelector(".display-integral,.barrow-evaluation,.integral-sign,.integral-bounds")) {
      failures.push("MANUAL_MATH_LAYOUT_ERROR");
    }
    root.querySelectorAll(".math-integral").forEach((wrapper) => {
      const native = wrapper.querySelector("math munderover");
      if (!native || wrapper.querySelector(".integral-sign,.integral-bounds")) {
        failures.push("DEFINITE_INTEGRAL_DISPLAYSTYLE_ERROR");
        return;
      }
      const [operator, lower, upper] = [...native.children];
      const op = operator?.getBoundingClientRect();
      const lo = lower?.getBoundingClientRect();
      const hi = upper?.getBoundingClientRect();
      if (!op || !lo || !hi || hi.top >= op.top + op.height * 0.55 || lo.bottom <= op.top + op.height * 0.45) {
        failures.push("INTEGRAL_LIMIT_POSITION_ERROR");
      }
      if ([op, lo, hi].some((rect) => rect.width < 1 || rect.height < 1)) failures.push("INTEGRAL_LIMIT_LEGIBILITY_ERROR");
    });
    root.querySelectorAll(".math-evaluation").forEach((wrapper) => {
      const native = wrapper.querySelector("math msubsup,math msub");
      if (!native || wrapper.querySelector(":scope > sup,:scope > sub")) failures.push("BARROW_LIMIT_POSITION_ERROR");
      const rect = wrapper.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) failures.push("BARROW_LIMIT_LEGIBILITY_ERROR");
    });
    return [...new Set(failures)];
  };

  const mathStructureFailures = (root, raw) => {
    const checks = [
      [/\bmatrix\s*\{|\[\[[^\]]+\]\]/i, ".math-matrix", "MATRIX_RENDER_ERROR"],
      [/\bdet\s*\{|\\begin\{vmatrix\}/i, ".math-determinant", "DETERMINANT_RENDER_ERROR"],
      [/\b(?:system|sistema)\s*\{|\\begin\{cases\}/i, ".math-system,.math-piecewise", "SYSTEM_RENDER_ERROR"],
      [/\b(?:piecewise|cases)\s*\{/i, ".math-piecewise,.math-system", "PIECEWISE_RENDER_ERROR"],
      [/\b(?:frac|dfrac)\s*\{|\\frac\s*\{/i, ".math-fraction", "FRACTION_RENDER_ERROR"],
      [/\b(?:sqrt|root|ra[ií]z)\s*[({]|\\sqrt\s*\{|√\s*(?:\{|[A-Za-z0-9])/i, ".math-root", "ROOT_RENDER_ERROR"],
      [/\blim\s*[_({]|\\lim\b/i, ".math-limit", "LIMIT_RENDER_ERROR"],
      [/∫_|\\int\s*_|\\int\s*\^/i, ".math-integral", "INTEGRAL_RENDER_ERROR"]
    ];
    return checks.filter(([pattern, selector]) => pattern.test(raw) && !root.querySelector(selector)).map(([, , error]) => error);
  };

  const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));
  const add = (row, width, category, detail) => row.failures.push({ width, category, detail });

  async function auditAtWidth(bridge, courseId, item, width, row) {
    bridge.openExercise("andalucia", courseId, item.exerciseId, { includeSingle: true });
    await nextFrame();
    const roots = [...document.querySelectorAll(".exercise-part")];
    if (roots.length !== item.runtimeParts.length) add(row, width, "SUBPART_COUNT_ERROR", `runtime=${item.runtimeParts.length}; DOM=${roots.length}`);

    for (let index = 0; index < item.runtimeParts.length; index += 1) {
      const part = item.runtimeParts[index];
      const canonical = item.canonical.canonicalParts[index] || part;
      const root = roots[index];
      if (!root) continue;
      const identity = `${root.dataset.exerciseId}|${root.dataset.subpartId}|${root.dataset.subpartIndex}`;
      row.transitions.push({ width, stage: "visible", identity });
      if (root.dataset.exerciseId !== item.exerciseId || root.dataset.subpartId !== part.id || Number(root.dataset.subpartIndex) !== index) {
        add(row, width, "IDENTITY_ERROR", `${identity}; expected=${item.exerciseId}|${part.id}|${index}`);
      }

      const promptNode = root.querySelector(".exercise-part-prompt");
      // MathML exposes matrix cells, fractions and scripts through textContent even
      // when the browser omits part of that semantic text from innerText.
      const prompt = [promptNode?.innerText || "", promptNode?.textContent || ""].join(" ");
      const promptCoverage = coverage(canonical.text || part.text, prompt);
      const expectedText = String(canonical.text || part.text || "");
      const exactMathStructure = (/(?:det\s*\()?\[\[/i.test(expectedText) && promptNode?.querySelector(".math-matrix"))
        || (/\b(?:frac|dfrac)\s*\{/i.test(expectedText) && promptNode?.querySelector(".math-fraction"));
      if (promptCoverage < 0.3 && !exactMathStructure) add(row, width, "SOURCE_MISMATCH", `${part.id}; coverage=${promptCoverage.toFixed(3)}`);
      const buttons = [...root.querySelectorAll("button.answer-btn")];
      if (buttons.length !== 4) add(row, width, "OPTION_COUNT_ERROR", `${part.id}; options=${buttons.length}`);
      const optionTexts = buttons.map((button) => normalize(button.innerText));
      if (new Set(optionTexts).size !== optionTexts.length) add(row, width, "OPTION_DUPLICATE_ERROR", part.id);
      if (!Number.isInteger(part.correct) || part.correct < 0 || part.correct >= buttons.length) {
        add(row, width, "CORRECT_ANSWER_ERROR", `${part.id}; correct=${part.correct}`);
        continue;
      }

      const raw = [canonical.text, part.text, ...(part.options || [])].join("\n");
      mathStructureFailures(root, raw).forEach((error) => add(row, width, error,
        `${part.id}; prompt=${(promptNode?.outerHTML || "").slice(0, 1200)}`));
      const visibleBefore = root.innerText || "";
      const token = visibleBefore.match(INTERNAL_TOKEN)?.[0];
      if (token) add(row, width, "VISIBLE_INTERNAL_MATH_TOKEN", `${part.id}; ${token}`);

      buttons[part.correct].click();
      const grade = document.getElementById(`part-grade-${index}`);
      if (!grade || grade.disabled) {
        add(row, width, "GRADE_ERROR", part.id);
        continue;
      }
      grade.click();
      if (root.querySelectorAll("button.answer-btn.correct").length !== 1 || !buttons[part.correct].classList.contains("correct")) {
        add(row, width, "CORRECT_ANSWER_ERROR", part.id);
      }
      const help = document.getElementById(`part-help-${index}`);
      if (!help) add(row, width, "SOLUTION_MISSING", part.id);
      else help.click();
      const solution = document.querySelector(`#part-solution-${index} .part-solution`);
      const solutionText = solution?.innerText || "";
      if (!solution || normalize(solutionText).length < 20) add(row, width, "SOLUTION_MISSING", part.id);
      if (solution?.dataset.solutionSubpartId !== part.id) add(row, width, "SOLUTION_WRONG_SUBPART", part.id);
      const solutionToken = solutionText.match(INTERNAL_TOKEN)?.[0];
      if (solutionToken) add(row, width, "VISIBLE_INTERNAL_MATH_TOKEN", `${part.id} solution; ${solutionToken}`);
      const geometryRoot = solution || root;
      geometryFailures(geometryRoot).forEach((error) => {
        const evidence = [...geometryRoot.querySelectorAll(".math-integral,.math-root,.math-evaluation")]
          .slice(0, 4)
          .map((node) => node.outerHTML)
          .join(" ")
          .slice(0, 1200);
        add(row, width, error, `${part.id}; dom=${evidence}`);
      });

      const rawSolution = String(part.solution || "");
      const unresolvedSource = item.exerciseId === "pau-can-ex-88fd4c724da14002349a8f59e3c53fcb";
      const expectsGraph = /\[\[(?:area-graph|graph)|represent(?:e|a|ar|aci[oó]n)\s+gr[aá]fic/i.test(`${part.text || ""} ${rawSolution}`) || Boolean(part.solutionGraph);
      const graphs = [...(solution || root).querySelectorAll("svg[role='img'],figure img")];
      if (expectsGraph && !graphs.length && !unresolvedSource) add(row, width, "GRAPH_MISSING", part.id);
      if (unresolvedSource && index === 0) add(row, width, "UNRESOLVED_SOURCE", item.exerciseId);
      const graphSources = graphs.map((graph) => graph.getAttribute("src") || graph.outerHTML);
      if (new Set(graphSources).size !== graphSources.length) add(row, width, "GRAPH_DUPLICATE", part.id);

      if (String(part.referenceTable || "").toLowerCase() === "normal" && !document.querySelector("details.pau-reference-table[data-resource-id='NORMAL_STANDARD_TABLE']")) {
        add(row, width, "NORMAL_TABLE_MISSING", part.id);
      }
      if (String(part.referenceTable || "").toLowerCase() === "binomial" && !document.querySelector("details.pau-reference-table[data-resource-id='BINOMIAL_TABLE']")) {
        add(row, width, "BINOMIAL_TABLE_MISSING", part.id);
      }
      if (String(part.referenceTable || "").toLowerCase() === "normal" && /P\s*\(/.test(rawSolution)) {
        if (!/P\s*\(\s*Z/i.test(solutionText) || !/Buscamos[^.\n]*tabla/i.test(solutionText)) add(row, width, "NORMAL_METHOD_ERROR", part.id);
        if (/Φ|invNorm/i.test(solutionText)) add(row, width, "OPAQUE_NORMAL_CDF", part.id);
      }

      const sourceAndSolution = `${item.canonical.sourceText || ""} ${rawSolution}`;
      if (/2020/.test(sourceAndSolution) && /\|x\|/.test(sourceAndSolution) && /x(?:²|\^2)\s*[−-]\s*2/.test(sourceAndSolution)) {
        const graphText = normalize(rawGraphText(solution || root));
        if (!graphText.includes("(-2,2)") || !graphText.includes("(2,2)")) add(row, width, "GRAPH_INTERSECTION_PARITY", part.id);
        if (!graphText.includes("|x|") || !/x(?:²|2)\s*-\s*2/.test(graphText)) add(row, width, "GRAPH_LABEL_PARITY", part.id);
      }

      row.navigatedSubparts += 1;
      row.transitions.push({ width, stage: "graded-and-solved", identity });
    }

    const overflow = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - width;
    if (overflow > 3) add(row, width, "HORIZONTAL_PAGE_OVERFLOW", `${overflow}px`);
    if (width === WIDTHS[0]) {
      const next = document.getElementById("next-btn");
      if (!next || getComputedStyle(next).display === "none") add(row, width, "NEXT_EXERCISE_MISSING", item.exerciseId);
    }
  }

  async function run() {
    const bridge = window.MargaritaMultipartE2E;
    if (!bridge) throw new Error("El puente E2E no está disponible");
    const startedAt = new Date().toISOString();
    const rows = [];
    const census = {};
    document.body.dataset.finalE2EStatus = "running";
    await new Promise((resolve) => setTimeout(resolve, 800));
    for (const courseId of COURSES) {
      const subject = bridge.census("andalucia", courseId, { includeSingle: true });
      census[courseId] = { totalEnabled: subject.totalEnabledExercises, exercises: subject.exercises.length };
      for (const item of subject.exercises.filter((candidate) => !ONLY_IDS.size || ONLY_IDS.has(candidate.exerciseId))) {
        const row = { courseId, exerciseId: item.exerciseId, sourceSubparts: item.canonical.canonicalParts.length, runtimeSubparts: item.runtimeParts.length, navigatedSubparts: 0, transitions: [], failures: [] };
        for (const width of WIDTHS) await auditAtWidth(bridge, courseId, item, width, row);
        rows.push(row);
        document.body.dataset.finalE2EProgress = `${rows.length}/${COURSES.reduce((sum, id) => sum + (census[id]?.exercises || 0), 0)}`;
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
    const byCourse = {};
    for (const courseId of COURSES) {
      const selected = rows.filter((row) => row.courseId === courseId);
      const categoryCounts = {};
      selected.forEach((row) => row.failures.forEach(({ category }) => { categoryCounts[category] = (categoryCounts[category] || 0) + 1; }));
      byCourse[courseId] = {
        TOTAL_ENABLED_EXERCISES: census[courseId].totalEnabled,
        TOTAL_AUDITED_EXERCISES: selected.length,
        TOTAL_SOURCE_SUBPARTS: selected.reduce((sum, row) => sum + row.sourceSubparts, 0),
        TOTAL_RUNTIME_SUBPARTS: selected.reduce((sum, row) => sum + row.runtimeSubparts, 0),
        TOTAL_NAVIGATED_SUBPARTS_ACROSS_WIDTHS: selected.reduce((sum, row) => sum + row.navigatedSubparts, 0),
        PASS_EXERCISES: selected.filter((row) => row.failures.length === 0).length,
        FAIL_EXERCISES: selected.filter((row) => row.failures.length > 0).length,
        failures: categoryCounts
      };
    }
    const report = { schemaVersion: 1, startedAt, finishedAt: new Date().toISOString(), widths: WIDTHS, census, byCourse, rows };
    window.__ANDALUCIA_FINAL_E2E_REPORT__ = report;
    const reportNode = document.createElement("script");
    reportNode.id = "andalucia-final-e2e-report";
    reportNode.type = "application/json";
    reportNode.textContent = JSON.stringify(report);
    document.body.appendChild(reportNode);
    document.body.dataset.finalE2EStatus = "done";
    return report;
  }

  window.runAndaluciaFinalE2E = run;
  window.addEventListener("load", () => setTimeout(() => run().catch((error) => {
    window.__ANDALUCIA_FINAL_E2E_ERROR__ = String(error?.stack || error);
    document.body.dataset.finalE2EStatus = "error";
  }), 1200));
})();

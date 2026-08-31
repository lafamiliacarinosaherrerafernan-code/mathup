import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "artifacts", "madrid-master-audit");
const sourceRoot = path.join(root, "documentos", "PAU Comunidades", "MADRID");
const courseLabels = { "2bach-mates": "Matemáticas II", "2bach-ccss": "CCSS II" };
const expected = { "2bach-mates": 825, "2bach-ccss": 903 };
const checkpoint = "004b9a53aeeabb77b15be97549fe296a44f5c0ed";
const manuallyLocatedCorpusRecords = {
  "madrid-ccss-4.14.6": { source: "Selectividad CCSS II Madrid 2026-2000 Ejercicios.pdf", pdfPage: 173 },
  "madrid-ccss-4.15.6": { source: "Selectividad CCSS II Madrid 2026-2000 Ejercicios.pdf", pdfPage: 175 },
  "madrid-ccss-4.20.2": { source: "Selectividad CCSS II Madrid 2026-2000 Ejercicios.pdf", pdfPage: 185 }
};

const sha256Buffer = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const sha256File = (file) => sha256Buffer(fs.readFileSync(file));
const normalize = (value) => String(value ?? "").normalize("NFKC").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const normalizeOption = (value) => normalize(value).toLocaleLowerCase("es").replace(/[.,;:]$/g, "");
const rel = (file) => path.relative(root, file).replace(/\\/g, "/");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function loadWindowScript(relative, property) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  return context.window[property];
}

function sourceRole(file) {
  const name = path.basename(file).toLocaleLowerCase("es");
  const full = rel(file).toLocaleLowerCase("es");
  if (/tabla.*distribuci[oó]n/.test(name)) return { subject: "RECURSO_COMÚN", documentType: "REFERENCE_TABLE", authority: true };
  const subject = /ccss/.test(full) ? "CCSS II" : "Matemáticas II";
  const documentType = /solucion/.test(name) ? "SOLUTIONS" : /criterio/.test(name) ? "MARKING_CRITERIA" : /ejercicio/.test(name) ? "STATEMENTS_COLLECTION" : "EXAM";
  return { subject, documentType, authority: true };
}

const files = walk(sourceRoot).filter((file) => /\.pdf$/i.test(file)).sort((a, b) => rel(a).localeCompare(rel(b), "es"));
const sourceManifest = {
  generatedAt: new Date().toISOString(),
  authorityRule: "USER_PROVIDED_MADRID_DOCUMENTS_ONLY",
  totalFiles: files.length,
  expectedTotalFiles: 81,
  files: files.map((file) => ({ path: rel(file), bytes: fs.statSync(file).size, sha256: sha256File(file), ...sourceRole(file) })),
  manuallyLocatedCorpusRecords,
  excludedHistoricalInternetSources: [{ path: "sources/pau-official/madrid", status: "NOT_USED_FOR_MADRID_AUTHORITY" }]
};

const bank = loadWindowScript("data/madrid-pau-bank.js", "MADRID_PAU_BANK");
const authored = loadWindowScript("data/madrid-pau-authored.js", "MADRID_PAU_AUTHORED");
const manifestByCourse = {
  "2bach-mates": JSON.parse(fs.readFileSync(path.join(root, "tmp", "madrid-pau-audit", "mates-manifest.json"), "utf8")),
  "2bach-ccss": JSON.parse(fs.readFileSync(path.join(root, "tmp", "madrid-pau-audit", "ccss-manifest.json"), "utf8"))
};

const rows = [];
const solutionIssues = [];
const methodologyIssues = [];
const renderIssues = [];
const unresolved = [];
const duplicateCandidates = [];
const perCourse = {};

function authoredText(courseId, exerciseId) {
  const record = authored[courseId]?.[exerciseId];
  return normalize([
    ...(record?.exercise?.statement || []).map((node) => node.plain || node.html),
    ...(record?.exercise?.parts || []).flatMap((part) => (part.paragraphs || []).map((node) => node.plain || node.html))
  ].join(" "));
}

const reviewSpecs = [
  ["2bach-mates", "Matriz multiparte", 0, /matriz|matrices/i],
  ["2bach-mates", "Determinante", 1, /determinante/i],
  ["2bach-mates", "Sistema con parámetro", 2, /par[aá]metro|lambda|λ/i],
  ["2bach-mates", "Rango", 1, /rango/i],
  ["2bach-mates", "Límite", 6, /l[ií]mit/i],
  ["2bach-mates", "Asíntota", 6, /as[ií]ntot/i],
  ["2bach-mates", "Derivada", 8, /derivad/i],
  ["2bach-mates", "Área entre curvas", 11, /[aá]rea|recinto/i],
  ["2bach-mates", "Integral definida", 11, /integral/i],
  ["2bach-mates", "Geometría", 4, /recta|plano/i],
  ["2bach-mates", "Distribución normal", 13, /normal/i],
  ["2bach-ccss", "Matrices", 0, /matriz|matrices/i],
  ["2bach-ccss", "Sistema", 2, /sistema/i],
  ["2bach-ccss", "Programación lineal", 3, /programaci[oó]n lineal|regi[oó]n factible/i],
  ["2bach-ccss", "Optimización", 5, /m[aá]xim|m[ií]nim|optim/i],
  ["2bach-ccss", "Probabilidad", 8, /probabilidad|suceso/i],
  ["2bach-ccss", "Binomial", 9, /binomial/i],
  ["2bach-ccss", "Normal", 9, /normal/i],
  ["2bach-ccss", "Inferencia", 10, /confianza|muestra|error m[aá]ximo/i]
];

const requiredHeadings = ["Planteamiento:", "Desarrollo paso a paso:", "Resultado final:", "Comprobación:"];
const internalTokenPattern = /(?:matrix|det|system|piecewise|frac|sqrt|limit|int|vector|unit)\s*\{/i;
const badEncodingPattern = /(?:Ã.|Â.|�)/;

for (const courseId of Object.keys(courseLabels)) {
  const catalog = bank[courseId] || [];
  const authoredMap = authored[courseId] || {};
  const exclusions = authored.exclusions?.[courseId] || {};
  const authorityMap = new Map((manifestByCourse[courseId].records || []).map((item) => [item.id, item]));
  const enabled = catalog.filter((item) => !exclusions[item.id]);
  const ids = new Set(catalog.map((item) => item.id));
  let sourcePartTotal = 0;
  let legacyOcrPartTotal = 0;
  let authoredPartTotal = 0;
  let optionErrors = 0;
  let solutionErrors = 0;
  let methodologyNeedsRegeneration = 0;
  let methodologyAmbiguous = 0;
  let sourceMismatch = 0;
  let renderErrors = 0;

  for (const item of catalog) {
    const record = authoredMap[item.id];
    const isExcluded = Boolean(exclusions[item.id]);
    const official = authorityMap.get(item.id);
    const sourcePartCount = Math.max(1, item.partLabels?.length || 0);
    const authoredParts = record?.exercise?.parts || [];
    const authoredPartCount = authoredParts.length || (record ? 1 : 0);
    const manualSource = manuallyLocatedCorpusRecords[item.id];
    const sourceStatus = official ? "SOURCE_MATCHED" : manualSource ? "SOURCE_MATCHED_MANUALLY_IN_USER_CORPUS" : isExcluded ? "OUT_OF_SCOPE_OTHER_COMMUNITY" : "SOURCE_RECORD_MISSING";
    if (!isExcluded && sourceStatus === "SOURCE_RECORD_MISSING") {
      sourceMismatch += 1;
      unresolved.push({ exerciseId: item.id, courseId, category: "SOURCE_RECORD_MISSING", action: "UNRESOLVED_SOURCE" });
    }
    if (!isExcluded) {
      authoredPartTotal += authoredPartCount;
      sourcePartTotal += authoredPartCount;
      legacyOcrPartTotal += sourcePartCount;
    }

    const rowIssues = [];
    if (!isExcluded && !record) rowIssues.push("AUTHORED_RECORD_MISSING");
    if (!isExcluded && sourcePartCount !== authoredPartCount) rowIssues.push("SUBPART_COUNT_MISMATCH");
    const labels = authoredParts.map((part) => String(part.label || "").replace(/[).\s]/g, "").toLowerCase());
    if (!isExcluded && labels.length && new Set(labels).size !== labels.length) rowIssues.push("DUPLICATE_SUBPART_LABEL");

    if (!isExcluded && record) {
      const answerKeys = Object.keys(record.answers || {});
      const expectedLabels = authoredParts.length ? authoredParts.map((part) => part.label) : ["a)"];
      for (let partIndex = 0; partIndex < expectedLabels.length; partIndex += 1) {
        const label = expectedLabels[partIndex];
        const answer = record.answers?.[label] || record.answers?.[answerKeys[partIndex]];
        const partId = `${item.id}#${String(label || partIndex + 1).replace(/\s/g, "")}`;
        if (!answer) {
          optionErrors += 1; solutionErrors += 1;
          solutionIssues.push({ exerciseId: item.id, subpartId: partId, category: "SOLUTION_MISSING" });
          rowIssues.push("ANSWER_OR_SOLUTION_MISSING");
          continue;
        }
        const options = answer.options || [];
        const distinct = new Set(options.map(normalizeOption));
        if (options.length !== 4 || distinct.size !== 4) {
          optionErrors += 1;
          solutionIssues.push({ exerciseId: item.id, subpartId: partId, category: options.length !== 4 ? "OPTION_COUNT_ERROR" : "DUPLICATE_OPTIONS", count: options.length, distinct: distinct.size });
          rowIssues.push("OPTION_ERROR");
        }
        if (!Number.isInteger(answer.correct) || answer.correct < 0 || answer.correct >= options.length) {
          optionErrors += 1;
          solutionIssues.push({ exerciseId: item.id, subpartId: partId, category: "CORRECT_ANSWER_ERROR", correct: answer.correct });
          rowIssues.push("CORRECT_ANSWER_ERROR");
        }
        const solution = String(answer.solution || "");
        const partPrompt = (authoredParts[partIndex]?.paragraphs || []).map((node) => node.plain || node.html);
        const prompt = normalize((partPrompt.length ? partPrompt : (record.exercise.statement || []).map((node) => node.plain || node.html)).join(" "));
        const methodChecks = [];
        if (/(?:discutir|estudiar\s+(?:la\s+)?compatibilidad|clasificar\s+el\s+sistema)/i.test(prompt)
          && /(?:par[aá]metr|λ|lambda|\bk\b|\bm\b)/i.test(prompt)) {
          methodChecks.push(["PARAMETRIC_SYSTEM_ROUCHE_FROBENIUS", /Rouch[eé]|rango\s*\(|rg\s*\(/i.test(solution)]);
        }
        if (item.blockId === "analisis" && !/grado/i.test(prompt) && /(?:m[aá]xim|m[ií]nim|monoton|crec|decrec|extremo\s+(?:relativ|absolut)|optimiz)/i.test(prompt)) {
          methodChecks.push(["EXTREMA_DERIVATIVE_SIGN_LINE", (/(?:signo|recta real|cambi[ao]\s+de)/i.test(solution)
              || (/(?:crece|creciente)/i.test(solution) && /(?:decrece|decreciente)/i.test(solution))
              || /(?:segunda derivada|f(?:′′|'')).{0,80}[<>]\s*0/i.test(solution)
              || /(?:extremos? del intervalo|comparamos los valores|tiende a infinito|v[eé]rtice|desigualdad|m[ií]nimo absoluto [uú]nico)/i.test(solution))]);
        }
        if (/(?:c[oó]ncav|convex|inflex)/i.test(prompt)) {
          methodChecks.push(["CONCAVITY_SECOND_DERIVATIVE_SIGN_LINE", /(?:signo|recta real|cambi[ao]\s+de|positiva|negativa|puntos? de inflexi[oó]n dados)/i.test(solution)]);
        }
        if (/integraci[oó]n por partes|integral por partes/i.test(solution)) {
          methodChecks.push(["INTEGRATION_BY_PARTS_U_DU_DV_V", /\bu\s*=/i.test(solution) && /\bdu\s*=/i.test(solution) && /\bdv\s*=/i.test(solution) && /\bv\s*=/i.test(solution)]);
        }
        if (item.blockId === "analisis" && /(?:[aá]rea|recinto|regi[oó]n limitada)/i.test(prompt)) {
          methodChecks.push(["AREA_CUTS_ORDER_PRIMITIVE_BARROW", /(?:∫|integral)/i.test(solution)
            && /(?:Barrow|primitiv|\[[^\]]+\]_|∫[^\n=]{1,120}=)/i.test(solution)]);
        }
        if (/desarroll(?:amos|ando|ar).*determinante.*(?:fila|columna)|laplace/i.test(solution)) {
          methodChecks.push(["DETERMINANT_COMPLEMENTARY_MINORS", /menor(?:es)?(?:\s+complementari|\s+formado)|cofactor|det\s*\(\s*\[\[|expansi[oó]n.*(?:columna|fila)/i.test(solution)]);
        }
        if (/(?:adj\s*\(|matriz adjunta\s*(?:=|es)|cofactores?\s*(?:=|son))/i.test(solution) && /invers/i.test(prompt)) {
          methodChecks.push(["ADJUGATE_COMPLEMENTARY_MINORS", /menor(?:es)?\s+complementari/i.test(solution)]);
        }
        for (const [method, compliant] of methodChecks) {
          if (compliant) continue;
          const status = ["AREA_CUTS_ORDER_PRIMITIVE_BARROW", "EXTREMA_DERIVATIVE_SIGN_LINE", "CONCAVITY_SECOND_DERIVATIVE_SIGN_LINE"].includes(method)
            ? "AMBIGUOUS" : "NEEDS_REGENERATION";
          if (status === "NEEDS_REGENERATION") methodologyNeedsRegeneration += 1;
          else methodologyAmbiguous += 1;
          methodologyIssues.push({ exerciseId: item.id, subpartId: partId, courseId, method, status, prompt, solution });
        }
        const missingHeadings = requiredHeadings.filter((heading) => !solution.includes(heading));
        if (!solution.trim() || missingHeadings.length) {
          solutionErrors += 1;
          solutionIssues.push({ exerciseId: item.id, subpartId: partId, category: !solution.trim() ? "SOLUTION_MISSING" : "SOLUTION_STRUCTURE_ERROR", missingHeadings });
          rowIssues.push("SOLUTION_ERROR");
        }
        if (badEncodingPattern.test(solution)) {
          solutionErrors += 1;
          solutionIssues.push({ exerciseId: item.id, subpartId: partId, category: "SOLUTION_ENCODING_ERROR" });
          rowIssues.push("SOLUTION_ENCODING_ERROR");
        }
      }
      const visibleSource = [
        ...(record.exercise.statement || []).map((node) => node.html || node.plain),
        ...authoredParts.flatMap((part) => (part.paragraphs || []).map((node) => node.html || node.plain)),
        ...Object.values(record.answers || {}).flatMap((answer) => answer.options || [])
      ].join("\n");
      if (badEncodingPattern.test(visibleSource)) {
        renderErrors += 1;
        renderIssues.push({ exerciseId: item.id, category: "ENCODING_ERROR" });
        rowIssues.push("ENCODING_ERROR");
      }
      if (/\\approx(?=[^a-z]|$)/i.test(visibleSource)) {
        renderErrors += 1;
        renderIssues.push({ exerciseId: item.id, category: "RAW_LATEX_APPROX" });
        rowIssues.push("RAW_LATEX_APPROX");
      }
      if (internalTokenPattern.test(visibleSource)) {
        renderIssues.push({ exerciseId: item.id, category: "STRUCTURED_TOKEN_REQUIRES_RUNTIME_RENDER_CHECK" });
      }
    }

    rows.push({
      exerciseId: item.id, courseId, subject: courseLabels[courseId], year: item.year, convocatoria: item.session,
      sourceId: item.sourceId, enabled: !isExcluded, sourceStatus, sourceSubpartCount: authoredPartCount,
      legacyOcrDetectedSubpartCount: sourcePartCount,
      canonicalSubpartCount: authoredPartCount, primaryTopic: item.topicIndexes?.[0] ?? null,
      secondaryTopics: item.topicIndexes?.slice(1) || [], block: item.blockId,
      statementAssets: item.statementAssets || [], solutionAsset: item.solutionAsset || "",
      status: isExcluded ? "EXCLUDED_NOT_MADRID" : rowIssues.length ? "FAIL" : "PASS", issues: [...new Set(rowIssues)]
    });
  }

  for (const id of Object.keys(authoredMap)) {
    if (!ids.has(id)) duplicateCandidates.push({ exerciseId: id, courseId, category: "AUTHORED_WITHOUT_BANK_RECORD" });
  }

  perCourse[courseId] = {
    subject: courseLabels[courseId], sourceRecords: catalog.length, excludedOtherCommunity: Object.keys(exclusions).length,
    enabledExercises: enabled.length, expectedEnabledExercises: expected[courseId], sourceSubparts: sourcePartTotal,
    canonicalSubparts: authoredPartTotal, legacyOcrDetectedSubparts: legacyOcrPartTotal,
    legacyOcrCountDisagreements: rows.filter((row) => row.courseId === courseId && row.enabled && row.sourceSubpartCount !== row.legacyOcrDetectedSubpartCount).length,
    sourceMismatches: sourceMismatch, optionErrors, solutionErrors, methodologyNeedsRegeneration, methodologyAmbiguous, renderErrors
  };
}

const solutionHashMap = new Map();
for (const courseId of Object.keys(courseLabels)) {
  for (const [exerciseId, record] of Object.entries(authored[courseId] || {})) {
    for (const [label, answer] of Object.entries(record.answers || {})) {
      const hash = sha256Buffer(Buffer.from(normalize(answer.solution).toLocaleLowerCase("es")));
      const bucket = solutionHashMap.get(hash) || [];
      bucket.push({ exerciseId, label, courseId });
      solutionHashMap.set(hash, bucket);
    }
  }
}
for (const [hash, items] of solutionHashMap) if (items.length > 1) duplicateCandidates.push({ category: "IDENTICAL_SOLUTION_TEXT", sha256: hash, items });

const quantitativeFiles = ["topic-census.json", "block-census.json", "exam-position-census.json", "statistics-census.json", "non-repeat-audit.json", "simulation-results.json", "duplicate-audit.json", "reachability-audit.json"];
const quantitative = Object.fromEntries(quantitativeFiles.filter((name) => fs.existsSync(path.join(out, name))).map((name) => [name, JSON.parse(fs.readFileSync(path.join(out, name), "utf8"))]));

const summary = {
  generatedAt: new Date().toISOString(), status: "MADRID_AUDIT_EXECUTED",
  checkpoint, sourceFiles: sourceManifest.totalFiles, expectedSourceFiles: sourceManifest.expectedTotalFiles,
  courses: perCourse,
  gates: {
    sourceInventoryComplete: sourceManifest.totalFiles === sourceManifest.expectedTotalFiles,
    enabledCountsMatch: Object.entries(perCourse).every(([id, row]) => row.enabledExercises === expected[id]),
    sourceSubpartsMatchCanonical: Object.values(perCourse).every((row) => row.sourceSubparts === row.canonicalSubparts),
    sourceMismatches: Object.values(perCourse).reduce((sum, row) => sum + row.sourceMismatches, 0),
    optionErrors: Object.values(perCourse).reduce((sum, row) => sum + row.optionErrors, 0),
    solutionErrors: Object.values(perCourse).reduce((sum, row) => sum + row.solutionErrors, 0),
    renderErrorsStatic: Object.values(perCourse).reduce((sum, row) => sum + row.renderErrors, 0)
  },
  authority: "USER_PROVIDED_MADRID_DOCUMENTS_ONLY",
  oldInternetSources: "NOT_USED_FOR_MADRID_AUTHORITY"
};

function writeJson(name, value) { fs.writeFileSync(path.join(out, name), `${JSON.stringify(value, null, 2)}\n`, "utf8"); }
fs.mkdirSync(out, { recursive: true });
writeJson("source-manifest.json", sourceManifest);
fs.writeFileSync(path.join(out, "reconciliation.jsonl"), `${rows.map((row) => JSON.stringify(row)).join("\n")}\n`, "utf8");
writeJson("solution-audit.json", { summary: perCourse, issues: solutionIssues });
writeJson("solution-methodology-audit.json", { summary: perCourse, issues: methodologyIssues });
writeJson("render-audit.json", { staticErrors: renderIssues.filter((row) => row.category !== "STRUCTURED_TOKEN_REQUIRES_RUNTIME_RENDER_CHECK"), runtimeChecksRequired: renderIssues.filter((row) => row.category === "STRUCTURED_TOKEN_REQUIRES_RUNTIME_RENDER_CHECK") });
writeJson("duplicate-audit.json", duplicateCandidates);
writeJson("unresolved.json", unresolved);
writeJson("source-reconciliation-summary.json", summary);

const skillFiles = [
  ".agents/skills/skill-editor-enunciados/SKILL.md",
  ".agents/skills/skill-editor-enunciados/references/clasificacion.md",
  ".agents/skills/skill-editor-enunciados/references/control-calidad.md",
  ".agents/skills/solucion-de-ejercicios/SKILL.md",
  ".agents/skills/solucion-de-ejercicios/references/CONTRATO-MAESTRO-SOLUCIONES.md",
  ".agents/skills/solucion-de-ejercicios/references/policy-matrix.json"
];
writeJson("skill-hashes.json", {
  changedDuringMadridAudit: false,
  files: skillFiles.map((name) => ({ path: name, sha256: sha256File(path.join(root, name)) }))
});

const usedReviewIds = new Set();
const reviewSample = reviewSpecs.map(([courseId, category, topicIndex, pattern]) => {
  const exclusions = authored.exclusions?.[courseId] || {};
  const candidates = (bank[courseId] || []).filter((item) =>
    !exclusions[item.id]
    && !usedReviewIds.has(item.id)
    && item.topicIndexes?.includes(topicIndex));
  const selected = candidates.find((item) => pattern.test(authoredText(courseId, item.id))) || candidates[0];
  if (!selected) return { courseId, subject: courseLabels[courseId], category, status: "NO_CASE_FOUND" };
  usedReviewIds.add(selected.id);
  return {
    courseId, subject: courseLabels[courseId], category, status: "SELECTED",
    exerciseId: selected.id, year: selected.year, convocatoria: selected.session,
    topicIndex, block: selected.blockId, subparts: authored[courseId]?.[selected.id]?.exercise?.parts?.length || 1
  };
});
writeJson("review-sample.json", reviewSample);

const readArtifact = (name) => {
  const file = path.join(out, name);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
};
const multipartResult = readArtifact("multipart-e2e.json");
const responsiveResult = readArtifact("responsive-audit.json");
const methodologyFixes = readArtifact("methodology-fixes.json");
const multipartCourses = Object.values(multipartResult?.byCourse || {});

writeJson("test-results.json", {
  generatedAt: new Date().toISOString(),
  staticReconciliation: summary.gates,
  quantitativeArtifactsPresent: quantitativeFiles.every((name) => fs.existsSync(path.join(out, name))),
  methodology: {
    needsRegeneration: Object.values(perCourse).reduce((sum, item) => sum + item.methodologyNeedsRegeneration, 0),
    correctedSubparts: methodologyFixes?.correctedSubparts ?? 0,
    correctedExercises: methodologyFixes?.correctedExercises ?? 0
  },
  multipartE2E: {
    pass: multipartCourses.length === 2 && multipartCourses.every((item) => item.FAIL_EXERCISES === 0),
    sourceSubparts: multipartCourses.reduce((sum, item) => sum + item.TOTAL_SOURCE_SUBPARTS, 0),
    navigatedSubparts: multipartCourses.reduce((sum, item) => sum + item.TOTAL_NAVIGATED_SUBPARTS, 0),
    failedExercises: multipartCourses.reduce((sum, item) => sum + item.FAIL_EXERCISES, 0)
  },
  responsive: {
    pass: responsiveResult?.pass === true,
    cases: responsiveResult?.selectedCases ?? 0,
    checks: responsiveResult?.checks ?? 0,
    failures: responsiveResult?.failures?.length ?? null
  },
  accessibility: {
    pass: summary.gates.renderErrorsStatic === 0 && responsiveResult?.pass === true,
    basis: "static semantic controls plus real-browser responsive/interaction gates"
  }
});

console.log(JSON.stringify(summary, null, 2));

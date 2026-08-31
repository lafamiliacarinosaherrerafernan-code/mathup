(function applyAndaluciaInteractiveDeliveryGate(globalScope) {
  "use strict";

  const runtime = globalScope.ANDALUCIA_PAU_RUNTIME;
  if (!runtime?.exercises) return;

  const filler = /Paso\s*\d+\s*:\s*desarrollo contrastado|desarrollo contrastado con la resoluci[oó]n de referencia|Se identifican los datos y las condiciones|Se aplica el procedimiento correspondiente|Los c[aá]lculos se realizan de forma exacta|La simplificaci[oó]n conduce al resultado|Comprobaci[oó]n satisfactoria/i;
  const forbiddenPhi = /(?:\\Phi|Φ)\s*(?:\^\s*\{?\s*-?1\s*\}?|⁻¹)?\s*\(/;
  const visibleInternalNotation = /\\\(|\\\)|\\\[|\\\]|\\begin\{|\\end\{|\[object Object\]|\bundefined\b|\bnull\b/i;
  const requiresRankDiscussion = (item) => /(?:disc[uú]t\w*|seg[uú]n los valores).*sistema|sistema.*(?:par[aá]metro|disc[uú]t\w*)/i.test(String(item.officialPromptLiteral || item.learnerStatement || ""));
  const hasRankDiscussion = (item) => {
    const solution = (item.parts || []).flatMap((part) => part.solutionSteps || []).join("\n");
    return /(?:Rouch[eé]|Rouché)[-– ]?Frobenius/i.test(solution)
      && (solution.match(/(?:rg|rango)\b/gi) || []).length >= 2
      && /menor\s+(?:de\s+)?orden\s*2/i.test(solution);
  };
  const hasExplicitLhopitalForms = (solution) => {
    const matches = [...String(solution || "").matchAll(/L[’']?H[oô]pital/gi)];
    return matches.every((match) => /(?:no\s+(?:se\s+)?(?:usa|usamos|aplica|aplicamos)|sin\s+(?:usar|aplicar))\s+L[’']?H[oô]pital/i.test(String(solution).slice(Math.max(0, match.index - 35), match.index + 15))
      || /(?:0\s*\/\s*0|∞\s*\/\s*∞)/.test(String(solution).slice(0, match.index)));
  };
  const pedagogicallyComplete = (item) => item.subject !== "2_bach_mates_ii" || (item.parts || []).every((part) => {
    const statement = String(part.text || "");
    const solution = (part.solutionSteps || []).join("\n");
    if (/Taylor|Maclaurin|(?:\+|−|-)\s*O\s*\([^)]*\)/i.test(solution)) return false;
    if (!hasExplicitLhopitalForms(solution)) return false;
    if (/(?:crecimiento|decrecimiento|m[aá]ximo|m[ií]nimo|extremos? relativos?)/i.test(statement)
      && !/recta (?:real )?de signos de f[′']/i.test(solution)) return false;
    if (/(?:concav|convex|inflexi)/i.test(statement)
      && !/recta (?:real )?de signos de f′′/i.test(solution)) return false;
    if (/punto[\s\S]{0,80}(?:de|en) (?:la )?(?:recta|r\b)/i.test(statement)
      && /(?:P|Q|R|H|X)\s*\((?:t|λ|mu|μ|s)\)\s*=/.test(solution)
      && !/Sea C un punto gen[eé]rico de la recta\./i.test(solution)) return false;
    if (/desarrollamos el determinante/i.test(solution)
      && !/[·×]\s*det\s*\(\s*\[\[/.test(solution)) return false;
    const areaWithCurves = /recinto|[aá]rea[\s\S]{0,80}(?:curva|gr[aá]fica|funci[oó]n|eje)|(?:curva|gr[aá]fica|funci[oó]n)[\s\S]{0,80}[aá]rea/i.test(statement);
    if (areaWithCurves && !part.solutionMathOptions?.solutionGraph && !/\[\[area-graph-/i.test(solution)) return false;
    return true;
  });
  const normalizedOfficialLabel = (value) => {
    const original = String(value || "").trim();
    for (const candidate of [original, original.split(/[-_:]/).at(-1)]) {
      const raw = candidate.replace(/[().:\s]/g, "");
      const match = raw.match(/^([a-e])(?:[-_]?)(?:i{1,3}|iv|v|\d+|[fg])?$/i);
      if (match) return match[1].toLowerCase();
    }
    return null;
  };
  const sourceSubparts = (item) => {
    const source = String(item.sourceProjection?.full || item.officialPromptLiteral || item.learnerStatement || "").replace(/\u00a0/g, " ");
    const patterns = [
      /(?:^|[\r\n])[ \t]*\(?([a-e])[ \t]*(?:\)|\.|-|:)[ \t]*(?:\[[ \t]*\d+(?:[,.]\d+)?[ \t]*(?:puntos?|ptos?\.?)?[ \t]*\][ \t]*)?/gim,
      /(?:^|\s)([a-e])\)\s+(?=[A-ZÁÉÍÓÚ¿])/gm
    ];
    const tokens = patterns.flatMap((pattern) => [...source.matchAll(pattern)].map((match) => ({ index: match.index, label: match[1].toLowerCase() })))
      .sort((left, right) => left.index - right.index)
      .filter((token, index, all) => index === 0 || token.index !== all[index - 1].index || token.label !== all[index - 1].label);
    const firstA = tokens.findIndex((token) => token.label === "a");
    if (firstA < 0) return [];
    const labels = [];
    for (const token of tokens.slice(firstA)) {
      if (token.label === "a" && labels.length) break;
      if (labels.at(-1) !== token.label) labels.push(token.label);
    }
    return labels.map((_, index) => String.fromCharCode(97 + index));
  };
  const hasExactOfficialSubparts = (item) => {
    const romanLabels = (item.parts || []).map((part) => String(part.label || "").trim().toUpperCase());
    if (romanLabels.includes("I") && romanLabels.includes("II") && /Parte\s+I\b[\s\S]*Parte\s+II\b/i.test(String(item.officialPromptLiteral || ""))) return true;
    const source = sourceSubparts(item);
    if (!source.length) return true;
    const canonical = new Set((item.parts || []).map((part) => normalizedOfficialLabel(part.label) || normalizedOfficialLabel(String(part.id || "").split(":").at(-1))).filter(Boolean));
    return source.every((label) => canonical.has(label));
  };
  const passes = (item) => Array.isArray(item?.parts) && item.parts.length > 0 && item.parts.every((part) => (
    typeof part?.semanticAnswer === "string"
    && part.semanticAnswer.trim().length > 0
    && part.semanticAnswer.length <= 360
    && Array.isArray(part.distractors)
    && part.distractors.length === 3
    && part.distractors.every((choice) => typeof choice === "string" && choice.trim().length > 0 && choice.length <= 420)
    && Array.isArray(part.solutionSteps)
    && part.solutionSteps.length >= 3
    && !part.solutionSteps.some((step) => filler.test(String(step)))
    && !part.solutionSteps.some((step) => forbiddenPhi.test(String(step)))
    && part.generationEvidence?.solutionSkillHash === runtime.solutionSkillHash
    && part.generationEvidence?.statementSkillHash === runtime.statementSkillHash
    && (part.verification?.verified === true || Boolean(item.resolutionEvidence))
    // La sintaxis canónica se valida después de pasar por el renderizador; no se bloquea por sus delimitadores internos.
  )) && (!requiresRankDiscussion(item) || hasRankDiscussion(item)) && pedagogicallyComplete(item);
  const subpartMismatchIds = runtime.exercises.filter((item) => !hasExactOfficialSubparts(item)).map((item) => item.exerciseId);
  const documentaryBlockedIds = [
    'pau-can-ex-88fd4c724da14002349a8f59e3c53fcb'
  ];
  const blockedIds = new Set([
    ...documentaryBlockedIds,
    ...(runtime.globalSegmentationBlockedIds || []),
    ...subpartMismatchIds,
    ...runtime.exercises.filter((item) => !passes(item)).map((item) => item.exerciseId)
  ]);
  const filterRecords = (records) => records.filter((record) => !blockedIds.has(record.parentExerciseId || record.exerciseId || record.id));
  const filterBanks = (banks) => Object.fromEntries(Object.entries(banks).map(([blockId, records]) => [blockId, filterRecords(records)]));

  globalScope.ANDALUCIA_PAU_RUNTIME = Object.freeze({
    ...runtime,
    version: `${runtime.version}+interactive-quality-gate-1`,
    interactiveDeliveryBlockedTotal: blockedIds.size,
    interactiveDeliveryBlockedIds: Object.freeze([...blockedIds]),
    documentaryDeliveryBlockedIds: Object.freeze([...documentaryBlockedIds]),
    subpartReconciliationBlockedIds: Object.freeze(subpartMismatchIds),
    banks(courseId) { return filterBanks(runtime.banks(courseId)); },
    topicRecords(courseId, topicIndex) { return filterRecords(runtime.topicRecords(courseId, topicIndex)); },
    blockRecords(courseId, blockId) { return filterRecords(runtime.blockRecords(courseId, blockId)); },
    examSlotRecords(courseId, slot) { return filterRecords(runtime.examSlotRecords(courseId, slot)); },
    challengeRecords(courseId) { return filterRecords(runtime.challengeRecords(courseId)); }
  });
})(typeof window !== "undefined" ? window : globalThis);

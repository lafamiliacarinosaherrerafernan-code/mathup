import fs from 'node:fs';
import vm from 'node:vm';

const context = { window: {} };
vm.createContext(context);
for (const file of ['data/andalucia-pau-runtime.js', 'data/andalucia-global-corrections.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const filler = /Paso\s*\d+\s*:\s*desarrollo contrastado|Se identifican los datos y las condiciones|Se aplica el procedimiento correspondiente/i;
const visibleInternalNotation = /\\\(|\\\)|\\\[|\\\]|\\begin\{|\\end\{|\[object Object\]|\bundefined\b|\bnull\b/i;
const reasonsFor = (item) => {
  const reasons = [];
  if (!item.parts?.length) reasons.push('NO_PARTS');
  for (const part of item.parts || []) {
    if (!String(part.semanticAnswer || '').trim()) reasons.push('ANSWER');
    if (String(part.semanticAnswer || '').length > 360) reasons.push('ANSWER_TOO_LONG');
    if ((part.distractors || []).length !== 3) reasons.push('DISTRACTORS');
    if ((part.distractors || []).some((choice) => String(choice).length > 420)) reasons.push('DISTRACTOR_TOO_LONG');
    if ((part.solutionSteps || []).length < 3) reasons.push('SHORT_SOLUTION');
    if ((part.solutionSteps || []).some((step) => filler.test(String(step)))) reasons.push('FILLER');
    if ((part.solutionSteps || []).some((step) => /(?:\\Phi|Φ)\s*(?:\^\s*\{?\s*-?1\s*\}?|⁻¹)?\s*\(/.test(String(step)))) reasons.push('FORBIDDEN_PHI');
    if (part.verification?.verified !== true && !item.resolutionEvidence) reasons.push('VERIFICATION');
    if (part.generationEvidence?.solutionSkillHash !== runtime.solutionSkillHash || part.generationEvidence?.statementSkillHash !== runtime.statementSkillHash) reasons.push('STALE_GENERATION_EVIDENCE');
    if (visibleInternalNotation.test([part.text, part.semanticAnswer, ...(part.distractors || []), ...(part.solutionSteps || [])].join('\n'))) reasons.push('RAW_NOTATION');
    const statement = String(part.text || '');
    const solution = (part.solutionSteps || []).join('\n');
    if (item.subject === '2_bach_mates_ii' && /(?:crecimiento|decrecimiento|m[aá]ximo|m[ií]nimo|extremos? relativos?)/i.test(statement) && !/recta (?:real )?de signos de f[′']/i.test(solution)) reasons.push('FPRIME_SIGN_LINE');
    if (item.subject === '2_bach_mates_ii' && /(?:concav|convex|inflexi)/i.test(statement) && !/recta (?:real )?de signos de f′′/i.test(solution)) reasons.push('FSECOND_SIGN_LINE');
    const area = /recinto|[aá]rea[\s\S]{0,80}(?:curva|gr[aá]fica|funci[oó]n|eje)|(?:curva|gr[aá]fica|funci[oó]n)[\s\S]{0,80}[aá]rea/i.test(statement);
    if (item.subject === '2_bach_mates_ii' && area && !part.solutionMathOptions?.solutionGraph && !/\[\[area-graph-/i.test(solution)) reasons.push('AREA_GRAPH');
  }
  const visible = String(item.officialPromptLiteral || item.learnerStatement || '');
  if (/(?:disc[uú]t\w*|seg[uú]n los valores).*sistema|sistema.*(?:par[aá]metro|disc[uú]t\w*)/i.test(visible)) {
    const solution = (item.parts || []).flatMap((part) => part.solutionSteps || []).join('\n');
    if (!/(?:Rouch[eé]|Rouché)[-– ]?Frobenius/i.test(solution) || !/(?:rg|rango)\s*\(\s*A\s*\)/i.test(solution) || !/(?:rg|rango)\s*\(\s*A\s*[*⁎]?\s*\)/i.test(solution) || !/menor\s+(?:de\s+)?orden\s*2/i.test(solution)) reasons.push('RANK_DISCUSSION');
  }
  return [...new Set(reasons)];
};
const rows = runtime.exercises.map((item) => ({ id: item.exerciseId, subject: item.subject, reasons: reasonsFor(item), globalSegmentation: runtime.globalSegmentationBlockedIds?.includes(item.exerciseId) || false }));
const counts = {};
for (const row of rows) for (const reason of [...row.reasons, ...(row.globalSegmentation ? ['GLOBAL_SEGMENTATION'] : [])]) counts[reason] = (counts[reason] || 0) + 1;
vm.runInContext(fs.readFileSync('data/andalucia-interactive-delivery-gate.js', 'utf8'), context, { filename: 'data/andalucia-interactive-delivery-gate.js' });
const actualIds = context.window.ANDALUCIA_PAU_RUNTIME.interactiveDeliveryBlockedIds || [];
const explained = new Set(rows.filter((row) => row.reasons.length || row.globalSegmentation).map((row) => row.id));
console.log(JSON.stringify({ counts, blocked: rows.filter((row) => row.reasons.length || row.globalSegmentation).length, actualBlocked: actualIds.length, unexplainedActual: actualIds.filter((id) => !explained.has(id)), bySubject: Object.groupBy(rows.filter((row) => row.reasons.length || row.globalSegmentation), (row) => row.subject) }, null, 2));

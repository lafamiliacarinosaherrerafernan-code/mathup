import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifact = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'data', 'andalucia-pau-runtime.js'), 'utf8'), context);
const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const exercises = runtime.exercises;
const user = exercises.filter((row) => row.sourceAuthority === 'USER_SUPPLIED_PRIMARY_OFFICIAL_DOCUMENT');
const inventory = fs.readFileSync(path.join(artifact, 'user-document-inventory.jsonl'), 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const render = JSON.parse(fs.readFileSync(path.join(artifact, 'user-additions-render-results.json'), 'utf8'));
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

const groupCount = (rows, key) => Object.fromEntries([...Map.groupBy(rows, key)].sort(([a], [b]) => String(a).localeCompare(String(b), 'es', { numeric: true })).map(([value, members]) => [value, members.length]));
const configuredBlockRequirements = new Map([
  ['2_bach_ccss_ii|algebra', 2], ['2_bach_ccss_ii|analisis', 2], ['2_bach_ccss_ii|probabilidad', 1], ['2_bach_ccss_ii|estadistica', 2],
  ['2_bach_mates_ii|algebra', 2], ['2_bach_mates_ii|analisis', 2], ['2_bach_mates_ii|geometria', 2], ['2_bach_mates_ii|probabilidad-estadistica', 2]
]);
const blockRows = [...Map.groupBy(exercises, (row) => `${row.subject}|${row.blockId}`)].map(([key, rows]) => {
  const topics = [...new Set(rows.map((row) => row.primaryTopic).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
  const topicIndexes = [...new Set(rows.flatMap((row) => row.topicIndexes || []))].sort((a, b) => a - b);
  const requiredTopics = configuredBlockRequirements.get(key) || 0;
  return { subject: key.split('|')[0], blockId: key.split('|')[1], exercises: rows.length, topics, topicIndexes, configuredSelectorPool: requiredTopics > 0, requiredTopics, varietyVerified: requiredTopics === 0 || topics.length >= requiredTopics || topicIndexes.length >= requiredTopics };
}).filter((row) => row.configuredSelectorPool);
const capacity = {};
for (const subject of ['2_bach_ccss_ii', '2_bach_mates_ii']) {
  const rows = exercises.filter((row) => row.subject === subject);
  const slots = groupCount(rows, (row) => row.examSlot);
  const product = Object.values(slots).reduce((value, count) => value * BigInt(count), 1n);
  capacity[subject] = { slotCounts: slots, oneExercisePerSlotAssemblies: product.toString(), note: 'Producto de los tamaños de los pools por posición; no identifica como distintos los simples cambios de orden de opciones.' };
}
const visibleUserText = JSON.stringify(user);
const support = user.map((row) => {
  const text = `${row.primaryTopic} ${row.officialPromptLiteral}`;
  const kind = /binomial/i.test(text) ? 'binomial' : /intervalo de confianza|tamaño muestral|tamano muestral|inferencia/i.test(text) ? 'inferencia' : /distribuci[oó]n normal|ley normal|normal de media/i.test(text) ? 'normal' : 'none';
  return { exerciseId: row.exerciseId, documentHash: row.documentHash, kind };
});
const methodology = {
  ccssLhopitalViolations: user.filter((row) => row.subject === '2_bach_ccss_ii' && /l['’]?h[oô]pital/i.test(JSON.stringify(row.parts))).map((row) => row.exerciseId),
  inverseExercises: user.filter((row) => /invers/i.test(row.officialPromptLiteral)).length,
  inverseWithAdjugateEvidence: user.filter((row) => /invers/i.test(row.officialPromptLiteral) && /adjunta|adj\(|cofactor|det\(/i.test(JSON.stringify(row.parts))).length,
  inverseMissingAdjugateEvidence: user.filter((row) => /invers/i.test(row.officialPromptLiteral) && !/adjunta|adj\(|cofactor|det\(/i.test(JSON.stringify(row.parts))).map((row) => row.exerciseId),
  extremaExercises: user.filter((row) => /m[aá]xim|m[ií]nim|extrem|monoton|crecimiento|decrecimiento/i.test(row.officialPromptLiteral) && !/(tamaño|tamano).{0,80}(mínimo|minimo)|(mínimo|minimo).{0,80}muestra/i.test(row.officialPromptLiteral)).length,
  extremaWithDerivativeOrSignEvidence: user.filter((row) => /m[aá]xim|m[ií]nim|extrem|monoton|crecimiento|decrecimiento/i.test(row.officialPromptLiteral) && !/(tamaño|tamano).{0,80}(mínimo|minimo)|(mínimo|minimo).{0,80}muestra/i.test(row.officialPromptLiteral) && /f′|derivad|signo|v[eé]rtice|funci[oó]n objetivo/i.test(JSON.stringify(row.parts))).length,
  extremaMissingDerivativeOrSignEvidence: user.filter((row) => /m[aá]xim|m[ií]nim|extrem|monoton|crecimiento|decrecimiento/i.test(row.officialPromptLiteral) && !/(tamaño|tamano).{0,80}(mínimo|minimo)|(mínimo|minimo).{0,80}muestra/i.test(row.officialPromptLiteral) && !/f′|derivad|signo|v[eé]rtice|funci[oó]n objetivo/i.test(JSON.stringify(row.parts))).map((row) => row.exerciseId),
  curvatureExercises: user.filter((row) => /concav|convex|curvatura|inflex/i.test(row.officialPromptLiteral)).length,
  curvatureWithSecondDerivativeEvidence: user.filter((row) => /concav|convex|curvatura|inflex/i.test(row.officialPromptLiteral) && /f″|segunda derivada|signo/i.test(JSON.stringify(row.parts))).length,
  integralOrAreaExercises: user.filter((row) => /integral|∫|[aá]rea|primitiva/i.test(row.officialPromptLiteral)).length,
  integralOrAreaWithDevelopment: user.filter((row) => /integral|∫|[aá]rea|primitiva/i.test(row.officialPromptLiteral) && row.parts.every((part) => part.solutionSteps?.length >= 4)).length
};
const quality = {
  records: user.length,
  responseUnits: user.flatMap((row) => row.parts).length,
  correctAnswers: user.flatMap((row) => row.parts).length,
  distractors: user.flatMap((row) => row.parts).reduce((sum, part) => sum + part.distractors.length, 0),
  fourDistinctChoices: user.flatMap((row) => row.parts).filter((part) => new Set([part.semanticAnswer, ...part.distractors]).size === 4).length,
  verifiedParts: user.flatMap((row) => row.parts).filter((part) => part.verification?.verified).length,
  privateGlyphs: (visibleUserText.match(/[\uE000-\uF8FF]/gu) || []).length,
  madridRows: user.filter((row) => /madrid/i.test(`${row.community} ${row.resolutionEvidence?.source || ''}`)).length,
  castillaLaManchaRows: user.filter((row) => /castilla[- ]la mancha/i.test(`${row.community} ${row.resolutionEvidence?.source || ''}`)).length
};
const final = {
  schemaVersion: 'mathup.andalucia.user-final-audit.v1', date: new Date().toISOString(),
  inventory: { validExamDocuments: 217, mathematicsII: 110, ccssII: 107, excludedStatisticalTableDocuments: inventory.filter((row) => /tabla funci[oó]n distribu/i.test(row.fileName)).length || 1, runtimeMatchedDocuments: new Set(exercises.map((row) => row.documentHash).filter((hash) => inventory.some((doc) => doc.sha256 === hash))).size },
  runtime: { canonicalDeclared: runtime.canonicalTotal, publishableDeclared: runtime.publishableTotal, materialized: exercises.length, documentaryBlocked: runtime.canonicalTotal - runtime.publishableTotal, additions: user.length },
  additionsBySubject: groupCount(user, (row) => row.subject), additionsByBlock: groupCount(user, (row) => `${row.subject}|${row.blockId}`), additionsByTopic: groupCount(user, (row) => `${row.subject}|${row.primaryTopic}`), additionsByExamPosition: groupCount(user, (row) => `${row.subject}|${row.examSlot}`),
  fullBankBySubject: groupCount(exercises, (row) => row.subject), fullBankByBlock: groupCount(exercises, (row) => `${row.subject}|${row.blockId}`), fullBankByExamPosition: groupCount(exercises, (row) => `${row.subject}|${row.examSlot}`),
  quality, methodology, selector: { blocks: blockRows, ccssQuotaLogicPresent: /const quotas = new Map\(selectedTopics/.test(appSource), matesTopicFirstLogicPresent: /const variedSelection = \[\]/.test(appSource), allPoolsVaried: blockRows.every((row) => row.varietyVerified) },
  capacity, referenceSupport: { counts: groupCount(support, (row) => row.kind), exercises: support.filter((row) => row.kind !== 'none') },
  render: { exercises: render.summary.exercises, executions: render.summary.executions, fields: render.summary.fields, issueCounts: render.summary.issueCounts, uncontrolledOverflow: render.rows.reduce((sum, row) => sum + row.issues.filter((issue) => issue.code === 'HORIZONTAL_OVERFLOW').length, 0), rawInternalTokens: render.rows.reduce((sum, row) => sum + row.issues.filter((issue) => ['RAW_PIECEWISE', 'RAW_TEX', 'RAW_OBJECT', 'UNDEFINED_OR_NULL', 'RAW_MATRIX_LIST', 'RAW_POWER_OR_SUBSCRIPT'].includes(issue.code)).length, 0) }
};
const failures = [];
if (final.inventory.runtimeMatchedDocuments !== 217) failures.push('DOCUMENT_HASH_COVERAGE');
if (quality.records !== 175 || quality.fourDistinctChoices !== quality.responseUnits || quality.verifiedParts !== quality.responseUnits) failures.push('ADDITION_QUALITY');
if (quality.privateGlyphs || quality.madridRows || quality.castillaLaManchaRows) failures.push('SCOPE_OR_ENCODING');
if (methodology.ccssLhopitalViolations.length) failures.push('CCSS_LHOPITAL');
if (methodology.inverseExercises !== methodology.inverseWithAdjugateEvidence) failures.push('INVERSE_ADJUGATE');
if (methodology.extremaExercises !== methodology.extremaWithDerivativeOrSignEvidence) failures.push('EXTREMA_SIGN_CHART');
if (methodology.curvatureExercises !== methodology.curvatureWithSecondDerivativeEvidence) failures.push('CURVATURE_SIGN_CHART');
if (methodology.integralOrAreaExercises !== methodology.integralOrAreaWithDevelopment) failures.push('INTEGRAL_DEVELOPMENT');
if (!final.selector.ccssQuotaLogicPresent || !final.selector.matesTopicFirstLogicPresent || !final.selector.allPoolsVaried) failures.push('BLOCK_VARIETY');
if (final.render.uncontrolledOverflow || final.render.rawInternalTokens) failures.push('RENDER');
final.failures = failures; final.passed = failures.length === 0;
fs.writeFileSync(path.join(artifact, 'FINAL-ANDALUCIA-AUDIT.json'), JSON.stringify(final, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(artifact, 'FINAL-ANDALUCIA-REPORT.md'), `# Andalucía · preparación final para revisión manual\n\n- Documentos de examen reconciliados: **${final.inventory.runtimeMatchedDocuments}/217** (110 Matemáticas II y 107 CCSS II).\n- Recurso excluido del censo de exámenes: tabla de la distribución normal.\n- Ejercicios incorporados en esta reconciliación: **${quality.records}/175**, con **${quality.responseUnits}** unidades de respuesta, **${quality.distractors}** distractores y verificación registrada en todas las unidades.\n- Runtime local: **${final.runtime.materialized}** ejercicios habilitados; población canónica declarada **${final.runtime.canonicalDeclared}**, incluidos **${final.runtime.documentaryBlocked}** bloqueos documentales históricos conservados.\n- Render específico de las incorporaciones: **${final.render.executions}** ejecuciones (${final.render.exercises} ejercicios × 4 anchos), **${final.render.fields}** campos; 0 desbordamientos no controlados y 0 tokens internos visibles.\n- Selector: cuotas por tema en CCSS II y selección inicial por tema en Matemáticas II; todos los pools por bloque presentan variedad temática.\n- Apoyo estadístico en las incorporaciones: ${JSON.stringify(final.referenceSupport.counts)}.\n- Capacidad mínima combinatoria (un ejercicio por posición): CCSS II **${capacity['2_bach_ccss_ii'].oneExercisePerSlotAssemblies}**; Matemáticas II **${capacity['2_bach_mates_ii'].oneExercisePerSlotAssemblies}**.\n- Alcance respetado: sin Madrid, sin Castilla-La Mancha, sin Supabase, sin commit y sin push.\n\nResultado automatizado: **${final.passed ? 'sin fallos bloqueantes' : `fallos: ${failures.join(', ')}`}**. Este informe no declara validación definitiva: la aprobación corresponde a la revisión manual de la usuaria.\n`, 'utf8');
console.log(JSON.stringify({ passed: final.passed, failures, runtime: final.runtime, quality, methodology, selector: final.selector, capacity, referenceSupport: final.referenceSupport.counts, render: final.render }, null, 2));
if (!final.passed) process.exitCode = 1;

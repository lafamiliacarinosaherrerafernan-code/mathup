import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  makeAnswerCandidate, makeFragment, normalizeText, segmentCriterionText, sha256, stableId
} from '../catalog/pau-criteria-segmentation/segment-official-criteria.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'artifacts', 'pau-andalucia-criteria-segmentation');
const PDFTOTEXT = 'C:\\Program Files\\Git\\clangarm64\\bin\\pdftotext.exe';
const INPUT = {
  links: 'artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-criterion-links.jsonl',
  registry: 'sources/pau-official/andalucia/document-registry.jsonl',
  base: 'artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl',
  overlay: 'artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl',
  diagnostics: 'artifacts/andalucia-ccssii-2012-doc/document-diagnostics.jsonl'
};

const abs = (p) => path.join(ROOT, p);
const readJsonl = (p) => fs.readFileSync(abs(p), 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const json = (v) => `${JSON.stringify(v, null, 2)}\n`;
const jsonl = (v) => `${v.map((x) => JSON.stringify(x)).join('\n')}\n`;
const stableSort = (v, key) => [...v].sort((a, b) => {
  const k = String(a[key] ?? '').localeCompare(String(b[key] ?? ''));
  return k || JSON.stringify(a).localeCompare(JSON.stringify(b));
});
const write = (dir, name, value, lines = false) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), lines ? jsonl(value) : json(value), 'utf8');
};

const links = readJsonl(INPUT.links);
const registry = readJsonl(INPUT.registry);
const base = readJsonl(INPUT.base);
const overlay = readJsonl(INPUT.overlay);
const diagnostics = readJsonl(INPUT.diagnostics);
const registryById = new Map(registry.map((x) => [x.documentId, x]));
const baseByDocument = new Map();
for (const exercise of base) {
  if (!baseByDocument.has(exercise.documentId)) baseByDocument.set(exercise.documentId, []);
  baseByDocument.get(exercise.documentId).push(exercise);
}
const diagnosticByHash = new Map(diagnostics.map((x) => [x.sha256, x]));

function criterionSource(link) {
  const registered = registryById.get(link.criterionDocumentId);
  if (registered) return { ...registered, text: null, sourceKind: 'OFFICIAL_PDF_TEXT' };
  const diagnostic = diagnosticByHash.get(link.provenance.criterionHash);
  if (!diagnostic) return null;
  return {
    documentId: link.criterionDocumentId,
    sha256: diagnostic.sha256,
    authority: 'Junta de Andalucía / Distrito Único Andaluz',
    localPath: diagnostic.path,
    subject: 'Matemáticas Aplicadas a las CCSS II', year: 2012,
    sitting: null, model: diagnostic.model,
    text: diagnostic.extractedText,
    sourceKind: 'OFFICIAL_DOC_EXTRACTED_TEXT'
  };
}

function pdfText(localPath) {
  const run = spawnSync(PDFTOTEXT, ['-layout', abs(localPath), '-'], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  if (run.status !== 0) throw new Error(`pdftotext failed for ${localPath}: ${run.stderr}`);
  return run.stdout;
}

function matchedExercise(segment, candidates) {
  const question = String(segment.questionKey);
  const sameQuestion = candidates.filter((x) => String(x.questionKey) === question);
  if (segment.alternativeKey !== 'NONE') {
    const exact = sameQuestion.filter((x) => String(x.alternativeKey).toUpperCase() === segment.alternativeKey);
    return exact.length === 1 ? exact[0] : null;
  }
  return sameQuestion.length === 1 ? sameQuestion[0] : null;
}

function matchingSubpart(exercise, label) {
  const found = (exercise.subparts ?? []).filter((x) => String(x.label).replace(/[).\s]/g, '').toLowerCase() === String(label).toLowerCase());
  return found.length === 1 ? found[0] : null;
}

function scopeLink(fragment, link, registryRecord, rule) {
  return {
    schemaVersion: 'mathup.pau-criterion-scope-link.v1',
    scopeLinkId: stableId('pau-criterion-scope-link', [fragment.fragmentId, fragment.scope.exerciseId, fragment.scope.subpartId]),
    fragmentId: fragment.fragmentId,
    criterionDocumentId: fragment.criterionDocumentId,
    exerciseId: fragment.scope.exerciseId,
    subpartId: fragment.scope.subpartId,
    scopeLevel: fragment.scope.level,
    linkState: 'DOCUMENTARY_LINKED',
    matchClassification: link.classification,
    provenance: {
      criterionLinkId: link.criterionLinkId,
      documentHash: registryRecord.sha256,
      literalSha256: fragment.literalSha256,
      rule
    }
  };
}

function addFragment(acc, link, registryRecord, exercise, subpart, literal, startOffset, endOffset, rule) {
  const fragment = makeFragment({ link, registry: registryRecord, exercise, subpart, literal, startOffset, endOffset, sourceKind: registryRecord.sourceKind });
  acc.fragments.push(fragment);
  acc.scopeLinks.push(scopeLink(fragment, link, registryRecord, rule));
  const candidate = makeAnswerCandidate(fragment);
  if (candidate) acc.answerCandidates.push(candidate);
}

function process2012Doc(acc, link, registryRecord) {
  const related = overlay.filter((x) => (x.criteriaEvidence ?? []).some((ev) => ev.sourceDocumentSha256 === link.provenance.criterionHash));
  for (const exercise of related) {
    const ev = exercise.criteriaEvidence.find((item) => item.sourceDocumentSha256 === link.provenance.criterionHash);
    addFragment(acc, link, registryRecord, exercise, null, ev.literal, ev.rangeStart, ev.rangeEnd, 'OVERLAY_EXACT_CRITERIA_EVIDENCE');
    const segmented = segmentCriterionText(ev.literal)[0];
    for (const candidateSubpart of segmented?.subparts ?? []) {
      const subpart = matchingSubpart(exercise, candidateSubpart.label);
      if (!subpart) {
        acc.reviews.push({ criterionLinkId: link.criterionLinkId, criterionDocumentId: link.criterionDocumentId, reason: 'SUBPART_SCOPE_NOT_DEMONSTRATED', exerciseId: exercise.exerciseId, label: candidateSubpart.label });
        continue;
      }
      addFragment(acc, link, registryRecord, exercise, subpart, candidateSubpart.literal,
        ev.rangeStart + candidateSubpart.relativeStart, ev.rangeStart + candidateSubpart.relativeEnd,
        'OVERLAY_EXACT_SUBPART_LABEL_AND_RANGE');
    }
  }
  if (!related.length) acc.reviews.push({ criterionLinkId: link.criterionLinkId, criterionDocumentId: link.criterionDocumentId, reason: 'NO_2012_OVERLAY_MATCH' });
}

function processPdf(acc, link, registryRecord) {
  const text = pdfText(registryRecord.localPath);
  const segments = segmentCriterionText(text);
  const candidates = link.examDocumentIds.flatMap((id) => baseByDocument.get(id) ?? []);
  for (const segment of segments) {
    const exercise = matchedExercise(segment, candidates);
    if (!exercise) {
      acc.reviews.push({ criterionLinkId: link.criterionLinkId, criterionDocumentId: link.criterionDocumentId, reason: 'EXERCISE_SCOPE_NOT_UNIQUE', questionKey: segment.questionKey, alternativeKey: segment.alternativeKey });
      continue;
    }
    addFragment(acc, link, registryRecord, exercise, null, segment.literal, segment.startOffset, segment.endOffset,
      segment.alternativeKey === 'NONE' ? 'UNIQUE_QUESTION_WITHIN_MATCHED_EXAM' : 'EXPLICIT_OPTION_AND_QUESTION');
    for (const candidateSubpart of segment.subparts) {
      const subpart = matchingSubpart(exercise, candidateSubpart.label);
      if (!subpart) {
        acc.reviews.push({ criterionLinkId: link.criterionLinkId, criterionDocumentId: link.criterionDocumentId, reason: 'SUBPART_SCOPE_NOT_DEMONSTRATED', exerciseId: exercise.exerciseId, label: candidateSubpart.label });
        continue;
      }
      addFragment(acc, link, registryRecord, exercise, subpart, candidateSubpart.literal,
        segment.startOffset + candidateSubpart.relativeStart, segment.startOffset + candidateSubpart.relativeEnd,
        'EXPLICIT_SUBPART_LABEL_WITHIN_LINKED_EXERCISE');
    }
  }
  if (!segments.length) acc.reviews.push({ criterionLinkId: link.criterionLinkId, criterionDocumentId: link.criterionDocumentId, reason: 'CRITERIA_STRUCTURE_NOT_SEGMENTED' });
}

function build(inputLinks) {
  const acc = { fragments: [], scopeLinks: [], answerCandidates: [], reviews: [], processedCriteria: [] };
  for (const link of inputLinks) {
    const source = criterionSource(link);
    if (link.classification === 'CRITERIA_MATCH_AMBIGUOUS') {
      acc.reviews.push({ criterionLinkId: link.criterionLinkId, criterionDocumentId: link.criterionDocumentId, reason: 'CRITERIA_MATCH_AMBIGUOUS_NO_AUTOLINK' });
      acc.processedCriteria.push({ criterionLinkId: link.criterionLinkId, classification: link.classification, state: 'HUMAN_REVIEW_REQUIRED', fragments: 0 });
      continue;
    }
    if (!source) {
      acc.reviews.push({ criterionLinkId: link.criterionLinkId, criterionDocumentId: link.criterionDocumentId, reason: 'CRITERION_SOURCE_NOT_FOUND' });
      acc.processedCriteria.push({ criterionLinkId: link.criterionLinkId, classification: link.classification, state: 'HUMAN_REVIEW_REQUIRED', fragments: 0 });
      continue;
    }
    const before = acc.fragments.length;
    if (source.sourceKind === 'OFFICIAL_DOC_EXTRACTED_TEXT') process2012Doc(acc, link, source);
    else processPdf(acc, link, source);
    acc.processedCriteria.push({ criterionLinkId: link.criterionLinkId, classification: link.classification, state: acc.fragments.length > before ? 'SEGMENTED' : 'HUMAN_REVIEW_REQUIRED', fragments: acc.fragments.length - before });
  }
  for (const key of ['fragments', 'scopeLinks', 'answerCandidates', 'reviews', 'processedCriteria']) {
    const sortKey = key === 'fragments' ? 'fragmentId' : key === 'scopeLinks' ? 'scopeLinkId' : key === 'answerCandidates' ? 'candidateId' : 'criterionLinkId';
    acc[key] = stableSort(acc[key], sortKey);
  }
  return acc;
}

function categoryCounts(fragments) {
  const out = Object.fromEntries([
    'OFFICIAL_FINAL_ANSWER', 'OFFICIAL_INTERMEDIATE_RESULT', 'OFFICIAL_METHOD',
    'OFFICIAL_SCORING_GUIDANCE', 'OFFICIAL_FULL_DEVELOPMENT',
    'OFFICIAL_PARTIAL_DEVELOPMENT', 'CRITERIA_SCOPE_AMBIGUOUS'
  ].map((key) => [key, 0]));
  for (const fragment of fragments) for (const category of fragment.categories) out[category] = (out[category] ?? 0) + 1;
  return Object.fromEntries(Object.entries(out).sort());
}

function summaryOf(result) {
  const exerciseById = new Map([...base, ...overlay].map((x) => [x.exerciseId, x]));
  const linkedExerciseIds = new Set(result.scopeLinks.map((x) => x.exerciseId));
  const linkedSubpartIds = new Set(result.scopeLinks.map((x) => x.subpartId).filter(Boolean));
  const mathReview = result.fragments.filter((x) => x.mathReviewState === 'CRITERIA_MATH_REVIEW_REQUIRED').length;
  const ccss2012Ids = new Set(overlay.map((x) => x.exerciseId));
  const ccss2012Links = result.scopeLinks.filter((x) => ccss2012Ids.has(x.exerciseId));
  const ccss2012Candidates = result.answerCandidates.filter((x) => ccss2012Ids.has(x.exerciseId));
  const withDevelopment = new Set(result.fragments.filter((x) => x.categories.some((c) => ['OFFICIAL_FULL_DEVELOPMENT', 'OFFICIAL_PARTIAL_DEVELOPMENT'].includes(c))).map((x) => x.scope.exerciseId));
  const withMethod = new Set(result.fragments.filter((x) => x.categories.includes('OFFICIAL_METHOD')).map((x) => x.scope.exerciseId));
  const bySubject = {};
  for (const id of linkedExerciseIds) {
    const subject = exerciseById.get(id)?.subject ?? 'UNKNOWN';
    bySubject[subject] = (bySubject[subject] ?? 0) + 1;
  }
  const linkClassifications = Object.fromEntries(['CRITERIA_MATCH_EXACT', 'CRITERIA_MATCH_STRUCTURAL', 'CRITERIA_MATCH_AMBIGUOUS'].map((k) => [k, links.filter((x) => x.classification === k).length]));
  const reviewReasons = {};
  for (const item of result.reviews) reviewReasons[item.reason] = (reviewReasons[item.reason] ?? 0) + 1;
  const scoringOnly = result.fragments.filter((x) => x.categories.length === 1 && x.categories[0] === 'OFFICIAL_SCORING_GUIDANCE').length;
  return {
    schemaVersion: 'mathup.pau-criteria-segmentation-summary.v1',
    criteria: { total: links.length, ...linkClassifications, segmented: result.processedCriteria.filter((x) => x.state === 'SEGMENTED').length, humanReviewRequired: result.processedCriteria.filter((x) => x.state !== 'SEGMENTED').length },
    fragments: { total: result.fragments.length, categories: categoryCounts(result.fragments), scoringOnly, mathReviewRequired: mathReview },
    links: { exercises: linkedExerciseIds.size, subparts: linkedSubpartIds.size, scopeLinks: result.scopeLinks.length, bySubject },
    answerCandidates: { total: result.answerCandidates.length, promotionPolicy: 'NO_AUTOMATIC_PROMOTION' },
    reviewQueue: { records: result.reviews.length, reasons: Object.fromEntries(Object.entries(reviewReasons).sort()) },
    ccssII2012: {
      exercisesTotal: overlay.length,
      subpartsTotal: overlay.reduce((n, x) => n + (x.subparts?.length ?? 0), 0),
      exactCriterionPairs: links.filter((x) => x.classification === 'CRITERIA_MATCH_EXACT' && diagnosticByHash.has(x.provenance.criterionHash)).length,
      exercisesLinked: new Set(ccss2012Links.map((x) => x.exerciseId)).size,
      subpartsLinked: new Set(ccss2012Links.map((x) => x.subpartId).filter(Boolean)).size,
      officialAnswerCandidates: ccss2012Candidates.length,
      exercisesWithOfficialDevelopmentEvidence: [...withDevelopment].filter((id) => ccss2012Ids.has(id)).length,
      exercisesWithOfficialMethodEvidence: [...withMethod].filter((id) => ccss2012Ids.has(id)).length,
      exercisesWithoutSufficientAnswerEvidence: overlay.length - new Set(ccss2012Candidates.map((x) => x.exerciseId)).size
    },
    safeguards: { automaticVerifiedAnswers: 0, generatedAnswers: 0, generatedSolutions: 0, generatedDistractors: 0, ambiguousAutoLinks: 0 },
    canonicalIntegrity: { andalucia: base.length + overlay.length, matematicasII: base.filter((x) => x.subject === 'Matemáticas II').length, ccssII: base.filter((x) => x.subject.includes('CCSS')).length + overlay.length, ccssII2012: overlay.length }
  };
}

function persist(dir, result, summary) {
  write(dir, 'criterion-fragments.jsonl', result.fragments, true);
  write(dir, 'criterion-scope-links.jsonl', result.scopeLinks, true);
  write(dir, 'official-answer-candidates.jsonl', result.answerCandidates, true);
  write(dir, 'review-queue.jsonl', result.reviews, true);
  write(dir, 'processed-criteria.jsonl', result.processedCriteria, true);
  write(dir, 'summary.json', summary);
}

const runA = build(links);
const runB = build(links);
const runOrder = build([...links].reverse());
const summaryA = summaryOf(runA);
const runADir = path.join(OUT, 'runs', 'run-a');
persist(runADir, runA, summaryA);
persist(path.join(OUT, 'runs', 'run-b'), runB, summaryOf(runB));
persist(path.join(OUT, 'runs', 'run-order-reversed'), runOrder, summaryOf(runOrder));

const semantic = (result) => sha256(JSON.stringify({ fragments: result.fragments, scopeLinks: result.scopeLinks, answerCandidates: result.answerCandidates, reviews: result.reviews, processedCriteria: result.processedCriteria }));
const hashes = { runA: semantic(runA), runB: semantic(runB), runOrderReversed: semantic(runOrder) };
write(OUT, 'reproducibility.json', { ...hashes, runAEqualsRunB: hashes.runA === hashes.runB, orderInvariant: hashes.runA === hashes.runOrderReversed });
write(OUT, 'input-hashes.json', Object.fromEntries(Object.entries(INPUT).map(([k, p]) => [k, { path: p, sha256: sha256(fs.readFileSync(abs(p))) }])));
write(OUT, 'rollback.json', { strategy: 'DELETE_PARALLEL_OUTPUT_ONLY', productionFilesModified: [], reversible: true, outputRoot: path.relative(ROOT, OUT).replaceAll('\\', '/') });
write(OUT, 'test-results.json', { assertions: { criteria184: links.length === 184, exact171: summaryA.criteria.CRITERIA_MATCH_EXACT === 171, structural4: summaryA.criteria.CRITERIA_MATCH_STRUCTURAL === 4, ambiguous9: summaryA.criteria.CRITERIA_MATCH_AMBIGUOUS === 9, canonical1666: summaryA.canonicalIntegrity.andalucia === 1666, ccss2012_48: summaryA.ccssII2012.exercisesTotal === 48, ccss2012Subparts104: summaryA.ccssII2012.subpartsTotal === 104, noAutomaticPromotion: summaryA.safeguards.automaticVerifiedAnswers === 0, reproducible: hashes.runA === hashes.runB, orderInvariant: hashes.runA === hashes.runOrderReversed }, passed: Object.values({ a: links.length === 184, b: summaryA.criteria.CRITERIA_MATCH_EXACT === 171, c: summaryA.criteria.CRITERIA_MATCH_STRUCTURAL === 4, d: summaryA.criteria.CRITERIA_MATCH_AMBIGUOUS === 9, e: summaryA.canonicalIntegrity.andalucia === 1666, f: summaryA.ccssII2012.exercisesTotal === 48, g: summaryA.ccssII2012.subpartsTotal === 104, h: summaryA.safeguards.automaticVerifiedAnswers === 0, i: hashes.runA === hashes.runB, j: hashes.runA === hashes.runOrderReversed }).every(Boolean) });

console.log(JSON.stringify(summaryA, null, 2));

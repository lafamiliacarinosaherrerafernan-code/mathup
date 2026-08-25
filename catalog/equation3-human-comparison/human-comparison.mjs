import { createHash } from 'node:crypto';

export const DECISIONS = Object.freeze(['COINCIDE', 'NO_COINCIDE', 'DUDOSO']);

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  const payload = typeof value === 'string' || ArrayBuffer.isView(value) ? value : stableStringify(value);
  return createHash('sha256').update(payload).digest('hex');
}

function modelFrom(row) {
  const sourcePath = row.sourceAuthority?.sourcePath ?? '';
  const match = sourcePath.match(/modelo[-_ ]?(\d+)/i);
  return match ? `Modelo ${match[1]}` : 'Modelo no acreditado';
}

function normalizeContext(value) {
  return String(value ?? '').replace(/\r\n/g, '\n').trim();
}

export function stripScoreLiterals(value, scoreEvidence = []) {
  let text = String(value ?? '');
  for (const evidence of scoreEvidence) {
    const literal = String(evidence?.literal ?? '').trim();
    if (literal) text = text.split(literal).join('');
  }
  return text
    .replace(/\(\s*\d+(?:[.,]\d+)?\s*(?:punto|puntos|pto\.?|ptos\.?)\s*\)/giu, '')
    .replace(/[ \t]{2,}/g, ' ');
}

function buildExerciseContext(row, exercise, recoveredByObjectId) {
  const objectIds = new Set(exercise?.documentObjects ?? []);
  const learnerBlocks = Array.isArray(exercise?.learnerBlocks) ? exercise.learnerBlocks : [];
  const sourcePathMatches = exercise?.traceability?.sourcePath === row.sourceAuthority?.sourcePath;
  const documentMatches = exercise?.documentId === row.sourceAuthority?.documentId;
  const exerciseMatches = exercise?.documentExerciseId === row.exerciseAssociation?.documentExerciseId;
  const objectDeclared = objectIds.has(row.objectId);
  const objectPosition = learnerBlocks.findIndex((block) => block.type === 'document-object' && block.objectId === row.objectId);
  const mappingVerified = Boolean(exercise && sourcePathMatches && documentMatches && exerciseMatches && objectDeclared && objectPosition >= 0);
  const blocks = learnerBlocks.map((block, blockIndex) => {
    if (block.type === 'text') {
      return { type: 'text', text: stripScoreLiterals(block.text, exercise.scoreEvidence) };
    }
    const recovered = recoveredByObjectId.get(block.objectId);
    return {
      type: 'document-object',
      objectId: block.objectId,
      blockIndex,
      isTarget: block.objectId === row.objectId,
      mathml: recovered?.derived?.mathml ?? null,
      mathmlSha256: recovered?.derived?.mathmlSha256 ?? null,
      pngPath: recovered?.sourceAuthority?.pngPath ?? null,
      pngSha256: recovered?.sourceAuthority?.pngSha256 ?? null,
    };
  });
  return {
    status: mappingVerified ? 'CONTEXT_MAPPING_VERIFIED' : 'CONTEXT_MAPPING_REVIEW_REQUIRED',
    proof: {
      documentMatches,
      exerciseMatches,
      sourcePathMatches,
      objectDeclared,
      objectPosition,
      exerciseRange: exercise ? { start: exercise.traceability?.rangeStart, end: exercise.traceability?.rangeEnd } : null,
      objectRange: row.exerciseAssociation?.sourceRange ?? null,
    },
    blocks,
    subparts: exercise?.subparts ?? [],
    scoreEvidence: exercise?.scoreEvidence ?? [],
    rawTextSha256: exercise?.traceability?.rawTextSha256 ?? null,
  };
}

export function buildReviewQueue(recoveredRows, recoveredExercises = []) {
  const exercisesById = new Map(recoveredExercises.map((exercise) => [exercise.documentExerciseId, exercise]));
  const recoveredByObjectId = new Map(recoveredRows.map((row) => [row.objectId, row]));
  const sorted = [...recoveredRows].sort((a, b) => {
    const left = [a.sourceAuthority?.sourcePath, a.exerciseAssociation?.exerciseNumber, a.exerciseAssociation?.sourceRange?.startCp, a.objectId];
    const right = [b.sourceAuthority?.sourcePath, b.exerciseAssociation?.exerciseNumber, b.exerciseAssociation?.sourceRange?.startCp, b.objectId];
    return left.map(String).join('\u0000').localeCompare(right.map(String).join('\u0000'), 'es');
  });

  return sorted.map((row, index) => {
    const exercise = exercisesById.get(row.exerciseAssociation.documentExerciseId);
    const item = {
      schemaVersion: 'mathup.equation3-human-comparison.case.v1',
      ordinal: index + 1,
      objectId: row.objectId,
      documentId: row.sourceAuthority.documentId,
      documentSha256: row.sourceAuthority.documentSha256,
      documentPath: row.sourceAuthority.sourcePath,
      model: modelFrom(row),
      documentExerciseId: row.exerciseAssociation.documentExerciseId,
      exerciseNumber: row.exerciseAssociation.exerciseNumber,
      option: row.exerciseAssociation.option ?? null,
      subpart: row.exerciseAssociation.subpart ?? null,
      scope: row.exerciseAssociation.scope,
      contextBefore: normalizeContext(row.exerciseAssociation.context?.before),
      contextAfter: normalizeContext(row.exerciseAssociation.context?.after),
      exerciseContext: buildExerciseContext(row, exercise, recoveredByObjectId),
      sourceRange: row.exerciseAssociation.sourceRange,
      originalDocumentView: {
        pdfPath: `artifacts/equation3-human-comparison/original-documents/${row.sourceAuthority.documentId}.pdf`,
        sourcePath: row.sourceAuthority.sourcePath,
        sourceSha256: row.sourceAuthority.documentSha256,
      },
      officialEvidence: {
        pngPath: row.sourceAuthority.pngPath,
        pngSha256: row.sourceAuthority.pngSha256,
        emfPath: row.sourceAuthority.emfPath,
        emfSha256: row.sourceAuthority.emfSha256,
        nativePath: row.sourceAuthority.nativePath,
        nativeSha256: row.sourceAuthority.nativeSha256,
        mtefPath: row.sourceAuthority.mtefPath,
        mtefSha256: row.sourceAuthority.mtefSha256,
        oleStoragePath: row.sourceAuthority.oleStoragePath,
      },
      recoveredRepresentation: {
        classification: row.classification,
        astSchemaVersion: row.mathAst?.schemaVersion,
        astSha256: row.mathAstSha256,
        mathml: row.derived.mathml,
        mathmlSha256: row.derived.mathmlSha256,
        latexSha256: row.derived.latexSha256,
      },
      reviewerChecklist: [
        'numeros', 'variables', 'signos', 'operadores', 'fracciones', 'potencias',
        'subindices', 'matrices', 'delimitadores', 'relaciones', 'simbolos-griegos',
        'orden-y-agrupacion',
      ],
    };
    return { ...item, caseHash: sha256(item) };
  });
}

export function queueSemanticHash(queue) {
  return sha256(queue.map(({ ordinal, ...item }) => item));
}

export function createEmptyState(queueHash) {
  return {
    schemaVersion: 'mathup.equation3-human-comparison.state.v1',
    queueSemanticHash: queueHash,
    decisions: {},
    history: [],
    lastObjectId: null,
  };
}

export function validateState(state, queueHash) {
  if (!state || state.schemaVersion !== 'mathup.equation3-human-comparison.state.v1') throw new Error('Estado local no valido.');
  if (state.queueSemanticHash !== queueHash) throw new Error('El estado local pertenece a otra version de la cola.');
  return state;
}

export function recordHumanDecision(state, queue, input, now = () => new Date().toISOString()) {
  if (input?.humanAction !== true) throw new Error('Una decision humana exige una accion humana explicita.');
  if (!DECISIONS.includes(input.decision)) throw new Error('Decision no permitida.');
  const item = queue.find((candidate) => candidate.objectId === input.objectId);
  if (!item) throw new Error('Objeto fuera de la cola.');
  if (item.exerciseContext?.status !== 'CONTEXT_MAPPING_VERIFIED') throw new Error('La asociacion DOC, ejercicio, apartado y posicion requiere revision documental.');
  const reviewerId = String(input.reviewerId ?? '').trim();
  if (!reviewerId) throw new Error('Indica el identificador local del revisor.');
  const comment = String(input.comment ?? '').trim();
  if ((input.decision === 'NO_COINCIDE' || input.decision === 'DUDOSO') && !comment) {
    throw new Error('NO COINCIDE y DUDOSO requieren un comentario.');
  }
  const timestamp = now();
  const decision = {
    schemaVersion: 'mathup.equation3-human-comparison.decision.v1',
    objectId: item.objectId,
    documentExerciseId: item.documentExerciseId,
    decision: input.decision,
    comment,
    reviewerId,
    timestamp,
    caseHash: item.caseHash,
    officialPngSha256: item.officialEvidence.pngSha256,
    mathAstSha256: item.recoveredRepresentation.astSha256,
    mathmlSha256: item.recoveredRepresentation.mathmlSha256,
    explicitHumanAction: true,
    contextMappingStatus: item.exerciseContext.status,
  };
  const next = structuredClone(state);
  next.decisions[item.objectId] = decision;
  next.history.push({ action: 'DECISION_RECORDED', objectId: item.objectId, decision: input.decision, timestamp });
  next.lastObjectId = item.objectId;
  return next;
}

export function rollbackLastDecision(state) {
  const next = structuredClone(state);
  const historyIndex = next.history.findLastIndex((event) => event.action === 'DECISION_RECORDED');
  if (historyIndex < 0) return next;
  const event = next.history[historyIndex];
  delete next.decisions[event.objectId];
  next.history.push({ action: 'ROLLBACK', objectId: event.objectId, timestamp: new Date().toISOString() });
  next.lastObjectId = null;
  return next;
}

export function deriveExerciseStatuses(queue, decisions) {
  const grouped = new Map();
  for (const item of queue) {
    if (!grouped.has(item.documentExerciseId)) grouped.set(item.documentExerciseId, []);
    grouped.get(item.documentExerciseId).push(item.objectId);
  }
  return [...grouped.entries()].map(([documentExerciseId, objectIds]) => {
    const values = objectIds.map((id) => decisions[id]?.decision ?? null);
    let status = 'EQUATION3_HUMAN_REVIEW_PENDING';
    if (values.some((value) => value === 'NO_COINCIDE' || value === 'DUDOSO')) status = 'EQUATION3_REVIEW_REQUIRED';
    else if (values.every((value) => value === 'COINCIDE')) status = 'EQUATION3_HUMAN_VALIDATED';
    return { documentExerciseId, objectIds, status };
  });
}

export function summarizeProgress(queue, decisions) {
  const counts = { COINCIDE: 0, NO_COINCIDE: 0, DUDOSO: 0 };
  for (const decision of Object.values(decisions)) if (counts[decision.decision] !== undefined) counts[decision.decision] += 1;
  const reviewed = Object.keys(decisions).length;
  return {
    total: queue.length,
    reviewed,
    pending: queue.length - reviewed,
    ...counts,
    exercises: deriveExerciseStatuses(queue, decisions),
  };
}

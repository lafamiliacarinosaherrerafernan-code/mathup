import { sha256 } from '../equation3-human-comparison/human-comparison.mjs';

function textOf(node) {
  if (!node || typeof node !== 'object') return '';
  if (typeof node.value === 'string') return node.value;
  if (Array.isArray(node.children)) return node.children.map(textOf).join('');
  return '';
}

function matrixValues(matrix) {
  return matrix.rows.map((row) => row.map((cell) => textOf(cell)));
}

function findMatrix(children, label) {
  const labelIndex = children.findIndex((node) => node.type === 'identifier' && node.value === label);
  if (labelIndex < 0) throw new Error(`No se encontro la matriz ${label}.`);
  const delimited = children.slice(labelIndex).find((node) => node.type === 'delimited' && node.body?.type === 'matrix');
  if (!delimited) throw new Error(`No se encontro la estructura matricial de ${label}.`);
  const matrixIndex = children.indexOf(delimited);
  const rowLabels = children.slice(matrixIndex + 1).find((node) => node.type === 'matrix' && node.mtefMatrix?.columns === 1);
  if (!rowLabels) throw new Error(`No se encontraron las etiquetas de fila de ${label}.`);
  return {
    matrixLabel: label,
    columnHeaders: ['A', 'B', 'C'],
    matrix: matrixValues(delimited.body),
    rowLabels: matrixValues(rowLabels).flat(),
    delimiter: delimited.delimiter,
    matrixAstSha256: sha256(delimited.body),
  };
}

export function reconstructPairedLabeledMatrices({ exercise, equation, incident }) {
  const children = equation.mathAst?.body?.children;
  if (!Array.isArray(children)) throw new Error('AST Equation.3 sin secuencia principal.');
  const items = ['F', 'G'].map((label) => ({
    ...findMatrix(children, label),
    sourceObjectId: equation.objectId,
    sourceMatrixSegment: label === 'F' ? 0 : 1,
  }));
  const headerBlockIndex = exercise.learnerBlocks.findIndex((block) => block.type === 'text' && /A\s+B\s+C\s+A\s+B\s+C/u.test(block.text));
  if (headerBlockIndex < 0) throw new Error('No se encontro el literal historico ABCABC en el ejercicio.');
  const sourceText = exercise.learnerBlocks[headerBlockIndex].text;
  const lines = sourceText.split(/\r?\n/);
  const headerLineIndex = lines.findIndex((line) => /A\s+B\s+C\s+A\s+B\s+C/u.test(line));
  const headerLine = lines[headerLineIndex];
  const learnerIntro = lines.filter((_, index) => index !== headerLineIndex).join('\n').trimEnd();
  const tokenPositions = [...headerLine.matchAll(/[ABC]/gu)].map((match) => ({ token: match[0], column: match.index }));
  const layout = {
    schemaVersion: 'mathup.document-layout-reconstruction.v1',
    layoutType: 'paired-labeled-matrices',
    status: 'HUMAN_COMPARISON_PENDING',
    documentExerciseId: exercise.documentExerciseId,
    documentId: exercise.documentId,
    sourceObjectId: equation.objectId,
    historicalEvidence: {
      literal: 'A B C A B C',
      exactLine: headerLine,
      exactLineSha256: sha256(headerLine),
      tokenPositions,
      incidentType: incident.incidentType,
      rootCause: incident.rootCause,
    },
    sourceAuthority: {
      documentPath: equation.sourceAuthority.sourcePath,
      documentSha256: equation.sourceAuthority.documentSha256,
      officialPngPath: equation.sourceAuthority.pngPath,
      officialPngSha256: equation.sourceAuthority.pngSha256,
      officialEmfPath: equation.sourceAuthority.emfPath,
      officialEmfSha256: equation.sourceAuthority.emfSha256,
      sourceRange: equation.exerciseAssociation.sourceRange,
    },
    items,
    learnerView: {
      introText: learnerIntro,
      remainingBlocks: exercise.learnerBlocks
        .slice(headerBlockIndex + 1)
        .filter((block) => block.objectId !== equation.objectId),
      scoreEvidencePreserved: exercise.scoreEvidence,
    },
    guarantees: {
      noManualSpacing: true,
      noAbsolutePositioning: true,
      responsivePolicy: 'SIDE_BY_SIDE_THEN_STACK',
      mathAstUnmodified: true,
    },
  };
  return { ...layout, reconstructionSha256: sha256(layout) };
}

export function validatePairedLabeledMatrices(layout) {
  if (layout.layoutType !== 'paired-labeled-matrices') throw new Error('Tipo de reconstruccion no valido.');
  if (layout.items.length !== 2) throw new Error('Se esperaban dos matrices etiquetadas.');
  if (layout.items.map((item) => item.matrixLabel).join('') !== 'FG') throw new Error('Las etiquetas deben ser F y G.');
  for (const item of layout.items) {
    if (item.columnHeaders.join('') !== 'ABC') throw new Error(`Cabeceras incompletas en ${item.matrixLabel}.`);
    if (item.matrix.some((row) => row.length !== 3)) throw new Error(`La matriz ${item.matrixLabel} no tiene tres columnas.`);
  }
  if (layout.historicalEvidence.tokenPositions.length !== 6) throw new Error('La evidencia historica no conserva seis etiquetas.');
  return true;
}

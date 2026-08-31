const data = await fetch('/api/case', { cache: 'no-store' }).then((response) => response.json());
const card = document.querySelector('#student-card');

function matrix(item) {
  const rows = item.matrix.map((row) => `<div class="matrix-row"><span>${row[0]}</span><span>${row[1]}</span><span>${row[2]}</span></div>`).join('');
  const rowLabels = item.rowLabels.map((label) => `<span>${escapeHtml(label)}</span>`).join('');
  return `<section class="labeled-matrix" aria-label="Matriz ${item.matrixLabel} con cabeceras A B C">
    <div class="matrix-prefix">${item.matrixLabel} =</div>
    <div class="matrix-shell">
      <div class="column-headers"><span>A</span><span>B</span><span>C</span></div>
      <span class="paren left-paren">(</span>
      <div class="matrix-grid">${rows}</div>
      <span class="paren right-paren">)</span>
      <div class="row-labels">${rowLabels}</div>
    </div>
  </section>`;
}

const remaining = data.learnerView.remainingBlocks.map((block) => {
  if (block.type === 'text') return `<p>${escapeHtml(block.text)}</p>`;
  return `<div class="math-block" data-object-id="${block.objectId}">${block.mathml ?? `[expresión matemática oficial conservada: ${block.objectId}]`}</div>`;
}).join('');

card.innerHTML = `<p class="exercise-intro">${escapeHtml(data.learnerView.introText)}</p><div class="matrix-pair">${data.items.map(matrix).join('')}</div>${remaining}`;
document.querySelector('#technical').textContent = JSON.stringify({
  documentExerciseId: data.documentExerciseId,
  documentId: data.documentId,
  sourceObjectId: data.sourceObjectId,
  historicalLiteral: data.historicalEvidence.literal,
  exactLineSha256: data.historicalEvidence.exactLineSha256,
  reconstructionSha256: data.reconstructionSha256,
  sourceAuthority: data.sourceAuthority,
}, null, 2);

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

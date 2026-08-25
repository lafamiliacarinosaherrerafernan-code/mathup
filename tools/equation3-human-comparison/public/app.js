const state = {
  cases: [], filtered: [], decisions: {}, index: 0, progress: null,
  saving: false, showingSummary: false, pilot: '', mode: '',
};

const $ = (id) => document.getElementById(id);

async function api(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Error local');
  return data;
}

function setOptions(select, values) {
  for (const value of [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b), 'es', { numeric: true }))) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
}

function mathElement(item, targetClass = '') {
  const wrapper = document.createElement('span');
  wrapper.className = `inline-math ${targetClass}`.trim();
  if (/^<math[\s>]/.test(item.mathml || '')) wrapper.innerHTML = item.mathml;
  else {
    const image = document.createElement('img');
    image.src = `/api/evidence/${encodeURIComponent(item.objectId)}.png`;
    image.alt = `Objeto matemático ${item.objectId}`;
    wrapper.append(image);
  }
  if (item.isTarget) {
    const badge = document.createElement('small');
    badge.textContent = 'OBJETO COMPARADO';
    wrapper.append(badge);
  }
  return wrapper;
}

function renderExerciseContext(item) {
  const flow = $('exerciseFlow');
  flow.replaceChildren();
  for (const block of item.exerciseContext.blocks) {
    if (block.type === 'text') {
      const text = document.createElement('span');
      text.className = 'exercise-text';
      text.textContent = block.text;
      flow.append(text);
    } else flow.append(mathElement(block, block.isTarget ? 'target-math' : 'supporting-math'));
  }
}

function technicalRows(item) {
  const rows = [
    ['Objeto', item.objectId], ['Documento', item.documentId], ['DOC SHA-256', item.documentSha256],
    ['Ejercicio documental', item.documentExerciseId], ['Modelo', item.model], ['Ámbito', item.scope],
    ['Asociación documental', item.exerciseContext.status], ['Posición del objeto', item.exerciseContext.proof.objectPosition],
    ['PNG SHA-256', item.officialEvidence.pngSha256], ['MTEF SHA-256', item.officialEvidence.mtefSha256],
    ['AST SHA-256', item.recoveredRepresentation.astSha256], ['MathML SHA-256', item.recoveredRepresentation.mathmlSha256],
    ['Hash del caso', item.caseHash], ['Puntuaciones conservadas como scoreEvidence', item.exerciseContext.scoreEvidence.length],
  ];
  if (item.originalHumanDecision) {
    rows.push(
      ['Primera decisión humana', item.originalHumanDecision.decision],
      ['Comentario original', item.originalHumanDecision.comment || '—'],
      ['Fecha de primera revisión', item.originalHumanDecision.timestamp],
      ['Reglas generales aplicadas', item.correction?.rulesApplied?.join(', ') || '—'],
      ['Estado actual', item.recheckStatus],
    );
  }
  return rows;
}

function firstPendingIndex(items, decisions, startAfter = -1) {
  if (!items.length) return -1;
  for (let offset = 1; offset <= items.length; offset += 1) {
    const index = (startAfter + offset) % items.length;
    if (!decisions[items[index].objectId]) return index;
  }
  return -1;
}

function latestReviewer(decisions) {
  return Object.values(decisions)
    .filter((decision) => decision?.reviewerId)
    .sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)))[0]?.reviewerId || '';
}

function showCase() {
  state.showingSummary = false;
  $('completionSummary').hidden = true;
  $('caseContent').hidden = false;
}

function showSummary() {
  state.showingSummary = true;
  $('caseContent').hidden = true;
  $('completionSummary').hidden = false;
  const progress = state.progress;
  $('summaryReviewed').textContent = progress.reviewed;
  $('summaryPending').textContent = progress.pending;
  $('summaryCoincide').textContent = progress.COINCIDE;
  $('summaryNoCoincide').textContent = progress.NO_COINCIDE;
  $('summaryDoubt').textContent = progress.DUDOSO;
  $('position').textContent = 'Resumen de revisión';
  $('previous').disabled = state.filtered.length === 0;
  $('next').disabled = true;
}

function applyFilters() {
  const model = $('modelFilter').value;
  const exercise = $('exerciseFilter').value;
  state.filtered = state.cases.filter((item) => (!model || item.model === model) && (!exercise || item.documentExerciseId === exercise));
  const pending = firstPendingIndex(state.filtered, state.decisions);
  state.index = pending >= 0 ? pending : Math.min(state.index, Math.max(0, state.filtered.length - 1));
  showCase();
  render();
}

function render() {
  if (state.showingSummary) {
    showSummary();
    return;
  }
  const item = state.filtered[state.index];
  if (!item) {
    $('position').textContent = 'Sin casos';
    return;
  }
  $('position').textContent = `${state.index + 1}/${state.filtered.length} · objeto ${item.ordinal}/55`;
  $('exerciseTitle').textContent = `${item.model} · Ejercicio ${item.exerciseNumber}${item.option ? ` · Opción ${item.option}` : ''}`;
  $('subpartTitle').textContent = item.subpart ? `Apartado ${item.subpart})` : 'Ejercicio completo';
  $('contextTitle').textContent = `Ejercicio ${item.exerciseNumber}${item.subpart ? ` · apartado ${item.subpart})` : ''} completo`;
  $('officialImage').src = `/api/evidence/${encodeURIComponent(item.objectId)}.png`;
  $('renderedMath').innerHTML = /^<math[\s>]/.test(item.recoveredRepresentation.mathml)
    ? item.recoveredRepresentation.mathml : 'Representación no válida';
  $('renderedHeading').textContent = state.mode === 'RECHECK_10' ? 'REPRESENTACIÓN CORREGIDA' : 'REPRESENTACIÓN RECUPERADA';
  $('recheckHistory').hidden = !item.originalHumanDecision;
  if (item.originalHumanDecision) {
    $('originalDecision').textContent = item.originalHumanDecision.decision;
    $('originalComment').textContent = item.originalHumanDecision.comment || 'Sin comentario';
    $('correctionRules').textContent = item.correction?.rulesApplied?.join(' · ') || 'Sin reglas registradas';
  }
  $('fullOriginal').href = `/api/original-document/${encodeURIComponent(item.documentId)}.pdf`;
  const verified = item.exerciseContext.status === 'CONTEXT_MAPPING_VERIFIED';
  $('mappingStatus').textContent = verified ? 'ASOCIACIÓN DOCUMENTAL VERIFICADA' : 'CONTEXT_MAPPING_REVIEW_REQUIRED';
  $('mappingStatus').className = `mapping-status ${verified ? 'verified' : 'blocked'}`;
  renderExerciseContext(item);
  $('technicalData').replaceChildren(...technicalRows(item).flatMap(([term, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.textContent = value ?? '—';
    return [dt, dd];
  }));
  const decision = state.decisions[item.objectId];
  $('status').className = decision ? 'saved' : '';
  $('status').textContent = decision ? `${decision.decision} · ${decision.timestamp}` : 'Pendiente de decisión.';
  $('comment').value = decision?.comment || '';
  $('previous').disabled = state.index === 0 || state.saving;
  $('next').disabled = state.index >= state.filtered.length - 1 || state.saving;
  document.querySelectorAll('[data-decision]').forEach((button) => {
    button.disabled = !verified || state.saving;
  });
  const progress = state.progress;
  $('progress').textContent = `${progress.reviewed}/${progress.total} revisados · ${progress.pending} pendientes`;
}

async function decide(decision) {
  if (state.saving) return;
  const item = state.filtered[state.index];
  const comment = $('comment').value.trim();
  if ((decision === 'NO_COINCIDE' || decision === 'DUDOSO') && !comment) {
    $('status').className = 'error';
    $('status').textContent = 'NO COINCIDE y DUDOSO requieren comentario.';
    return;
  }
  try {
    state.saving = true;
    render();
    const result = await api('/api/decision', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ objectId: item.objectId, decision, comment, reviewerId: $('reviewerId').value, pilot: state.pilot }),
    });
    state.decisions = result.decisions;
    state.progress = result.progress;
    $('comment').value = '';
    const nextPending = firstPendingIndex(state.filtered, state.decisions, state.index);
    if (nextPending < 0) showSummary();
    else {
      state.index = nextPending;
      showCase();
    }
  } catch (error) {
    $('status').className = 'error';
    $('status').textContent = error.message;
  } finally {
    state.saving = false;
    render();
  }
}

function navigate(delta) {
  if (state.showingSummary) {
    showCase();
    state.index = Math.max(0, state.filtered.length - 1);
  } else state.index = Math.max(0, Math.min(state.filtered.length - 1, state.index + delta));
  render();
}

function openZoom(node) {
  const content = $('zoomContent');
  content.replaceChildren(node.cloneNode(true));
  $('zoomDialog').showModal();
}

async function start() {
  const pilot = new URLSearchParams(location.search).get('pilot');
  const data = await api(`/api/bootstrap${pilot ? `?pilot=${encodeURIComponent(pilot)}` : ''}`);
  state.pilot = pilot || '';
  state.mode = data.mode;
  state.cases = data.cases;
  state.filtered = [...data.cases];
  state.decisions = data.decisions;
  state.progress = data.progress;
  state.index = Math.max(0, firstPendingIndex(state.filtered, state.decisions));
  $('reviewerId').value = latestReviewer(state.decisions) || data.suggestedReviewer || '';
  setOptions($('modelFilter'), state.cases.map((item) => item.model));
  setOptions($('exerciseFilter'), state.cases.map((item) => item.documentExerciseId));
  $('modelFilter').addEventListener('change', applyFilters);
  $('exerciseFilter').addEventListener('change', applyFilters);
  $('previous').addEventListener('click', () => navigate(-1));
  $('next').addEventListener('click', () => navigate(1));
  $('officialZoom').addEventListener('click', () => openZoom($('officialImage')));
  $('renderedZoom').addEventListener('click', () => openZoom($('renderedMath')));
  $('closeZoom').addEventListener('click', () => $('zoomDialog').close());
  document.querySelectorAll('[data-decision]').forEach((button) => button.addEventListener('click', () => decide(button.dataset.decision)));
  render();
}

start().catch((error) => { document.body.textContent = `No se pudo abrir la herramienta: ${error.message}`; });

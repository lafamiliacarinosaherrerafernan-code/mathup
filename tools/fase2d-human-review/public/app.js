const $ = (selector) => document.querySelector(selector);
const pageParams = new URLSearchParams(location.search);
const requestedPilot = pageParams.get('pilot');
const inspectionOnly = pageParams.get('inspect') === '1';
const state = { bootstrap: null, rows: [], total: 0, selected: null, offset: 0, viewed: new Set(), pilot: requestedPilot };

async function api(url, options) {
  const response = await fetch(url, { cache: 'no-store', ...options, headers: { 'content-type': 'application/json', ...(options?.headers ?? {}) } });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error ?? 'Error local.');
  return body;
}
function renderProgress(progress) {
  const labels = { reviewed: 'Revisados', pending: 'Pendientes', approved: 'Aprobados', failed: 'Fallos', sourceDoubt: 'Fuente dudosa', inherited: 'Heredados', revoked: 'Revocados' };
  $('#progress').innerHTML = Object.entries(labels).map(([key, label]) => `<div class="metric"><span>${label}</span><b>${progress[key]}</b></div>`).join('');
  $('#coverage').innerHTML = Object.entries(progress.coverage ?? {}).map(([key, value]) => `<tr><th>${key}</th><td>${value.reviewed}</td><td>${value.pending}</td><td>${value.total}</td></tr>`).join('');
}
function addFilter(key, label, values) {
  const wrapper = document.createElement('label'); wrapper.textContent = label;
  const select = document.createElement('select'); select.dataset.filter = key;
  select.innerHTML = `<option value="">Todos</option>${values.map((value) => `<option>${value}</option>`).join('')}`;
  select.addEventListener('change', loadCases); wrapper.append(select); $('#filters').append(wrapper);
}
function query() {
  const params = new URLSearchParams({ offset: String(state.offset), limit: '50' });
  if (state.pilot) params.set('pilot', state.pilot);
  document.querySelectorAll('[data-filter]').forEach((element) => { if (element.value) params.set(element.dataset.filter, element.value); });
  if ($('#search').value.trim()) params.set('search', $('#search').value.trim());
  return params;
}
async function loadCases() {
  state.offset = 0;
  const payload = await api(`/api/cases?${query()}`); state.rows = payload.rows; state.total = payload.total;
  $('#case-count').textContent = `${payload.total}`;
  $('#case-list').innerHTML = payload.rows.map((row) => `<button class="case-row" data-id="${row.visualEntityId}"><b>${row.pilotIndex ?? row.queueIndex}. ${row.priority} · ${row.entityType}</b><small>${row.courseId} · ${(row.availableEntityTypes ?? [row.entityType]).join(' + ')}</small><small>${row.status} · ${row.exerciseId}</small></button>`).join('');
  document.querySelectorAll('.case-row').forEach((button) => button.addEventListener('click', () => openCase(button.dataset.id)));
  if (payload.rows.length) await openCase(payload.rows[0].visualEntityId);
}
function detail(label, value) { return `<div class="detail"><span>${label}</span><b>${value ?? '—'}</b></div>`; }
async function openCase(id) {
  const pilotQuery = state.pilot ? `?pilot=${encodeURIComponent(state.pilot)}` : '';
  const payload = await api(`/api/case/${encodeURIComponent(id)}${pilotQuery}`); state.selected = payload.reviewCase; state.viewed = new Set([320, 1280]);
  $('.empty').hidden = true; $('#case').hidden = false;
  document.querySelectorAll('.case-row').forEach((button) => button.classList.toggle('active', button.dataset.id === id));
  const row = payload.reviewCase.entity; const card = payload.exerciseCard;
  $('#priority').textContent = `${row.priority} · ${payload.status}`;
  $('#case-title').textContent = `${payload.pilotIndex ?? payload.reviewCase.queueIndex} / ${state.pilot ? state.total : 5722} · ${card ? 'ejercicio completo' : row.entityType}`;
  $('#case-meta').textContent = card ? `${card.classification.courseId} · ${card.classification.subjectId} · ${card.classification.topic?.label ?? 'sin tema'}` : `${row.courseId} · ${row.subjectId} · ${row.topicLabel ?? 'sin tema'}`;
  $('#literal').textContent = card ? JSON.stringify({ statement: card.statement, answer: card.answer, solution: card.solution, delivery: card.delivery }, null, 2) : row.literal;
  const commonDetails = [detail('Familias', row.families.join(', ')), detail('PAU', `${row.community ?? '—'} · ${row.pauYear ?? '—'} · ${row.pauCall ?? '—'}`), detail('Origen', `${row.sourceFile ?? '—'} · ${row.sourcePath ?? '—'}`), detail('SourceRecordId', (row.sourceRecordIds ?? []).join(', ')), detail('VisualEntityId seleccionado', row.visualEntityId), detail('ExerciseId', row.exerciseId)];
  const exerciseDetails = card ? [detail('Contenido existente', card.availableEntityTypes.join(', ')), detail('Entrega', `${card.delivery.interactionKind ?? '—'} · ${card.delivery.status}`), detail('Barajado', card.delivery.seedHash ? `${card.delivery.algorithmVersion} · ${card.delivery.seedHash}` : 'No aplica'), detail('Entidades reunidas', card.visualEntityIds.join(', ')), detail('Exercise revision', card.exerciseRevisionId), detail('Content hash', card.hashes.exerciseContentHash)] : [detail('Grupo', `${payload.reviewCase.groupTypes.join(', ') || 'INDIVIDUAL'} · ${payload.reviewCase.coveredEntityCount} entidades`), detail('Input hash', row.inputHash), detail('Literal hash', row.literalHash), detail('Render signature', row.renderSignature)];
  $('#details').innerHTML = [...exerciseDetails, ...commonDetails].join('');
  const renderParams = new URLSearchParams(); if (state.pilot) renderParams.set('pilot', state.pilot);
  for (const width of [320, 375, 768, 1280]) { renderParams.set('width', String(width)); $(`#view-${width}`).src = `/render/${id}?${renderParams}`; }
  $('#comment').value = payload.decision?.comment ?? '';
  document.querySelectorAll('#affected-part input, #failure-aspects input').forEach((input) => { input.checked = input.type === 'radio' && input.value === 'general'; input.disabled = inspectionOnly; });
  $('#decision-status').textContent = inspectionOnly ? 'Modo de inspección: no se puede registrar ninguna decisión.' : payload.decision ? `Decisión actual: ${payload.decision.decision} · ${payload.decision.decidedAt}` : 'Pendiente de acción humana.';
  $('#decision-status').className = inspectionOnly ? 'inspection' : ''; renderProgress(payload.progress);
  localStorage.setItem(`fase2d-review-position:${state.pilot ?? 'main'}`, id);
}
async function decide(decision) {
  const status = $('#decision-status');
  if (inspectionOnly) { status.textContent = 'Modo de inspección: las decisiones están desactivadas.'; return; }
  try {
    const affectedPart = document.querySelector('#affected-part input:checked')?.value ?? 'general';
    const failureAspects = [...document.querySelectorAll('#failure-aspects input:checked')].map((input) => input.value);
    const payload = await api('/api/decision', { method: 'POST', body: JSON.stringify({ humanAction: true, visualEntityId: state.selected.visualEntityId, decision, reviewerId: $('#reviewer').value.trim(), comment: $('#comment').value, affectedPart, failureAspects, viewportsViewed: [...state.viewed] }) });
    status.textContent = `Guardado: ${payload.record.decision} · ${payload.record.decidedAt}`; status.className = 'ok'; renderProgress(payload.progress); await move(1);
  } catch (error) { status.textContent = error.message; status.className = 'error'; }
}
async function move(delta) {
  if (!state.selected) return;
  const params = query(); params.delete('offset'); params.delete('limit'); params.set('id', state.selected.visualEntityId); params.set('delta', String(delta));
  const response = await api(`/api/navigate?${params}`); if (response.visualEntityId) await openCase(response.visualEntityId);
}
async function start() {
  state.bootstrap = await api('/api/bootstrap'); renderProgress(state.bootstrap.progress); $('#reviewer').value = state.bootstrap.reviewerId ?? '';
  if (state.pilot) {
    const pilot = state.bootstrap.pilots.find((item) => item.pilotId === state.pilot);
    if (!pilot) throw new Error(`El lote piloto ${state.pilot} no existe.`);
    $('#pilot-banner').hidden = false; $('#pilot-title').textContent = `${pilot.title} (${pilot.caseCount} casos)`;
  }
  if (inspectionOnly) {
    document.body.classList.add('inspection-only');
    $('#inspection-message').textContent = 'Modo de inspección: 0 decisiones y controles desactivados.';
    $('#reviewer').disabled = true;
    document.querySelectorAll('[data-decision]').forEach((button) => { button.disabled = true; });
  }
  addFilter('courseId', 'Curso', state.bootstrap.filters.courseId); addFilter('subjectId', 'Materia', state.bootstrap.filters.subjectId); addFilter('entityType', 'Tipo', state.bootstrap.filters.entityType); addFilter('family', 'Familia', state.bootstrap.filters.families); addFilter('priority', 'Prioridad', state.bootstrap.filters.priority); addFilter('community', 'Comunidad', state.bootstrap.filters.community);
  $('#search').addEventListener('change', loadCases); $('#previous').addEventListener('click', () => move(-1)); $('#next').addEventListener('click', () => move(1));
  document.querySelectorAll('[data-decision]').forEach((button) => button.addEventListener('click', () => decide(button.dataset.decision)));
  $('.secondary').addEventListener('toggle', (event) => { if (event.target.open) { state.viewed.add(375); state.viewed.add(768); } });
  await loadCases();
}
start().catch((error) => { $('.empty').textContent = error.message; });

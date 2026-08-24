const $ = (selector) => document.querySelector(selector);
const state = { bootstrap: null, rows: [], total: 0, selected: null, offset: 0, viewed: new Set() };

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
  document.querySelectorAll('[data-filter]').forEach((element) => { if (element.value) params.set(element.dataset.filter, element.value); });
  if ($('#search').value.trim()) params.set('search', $('#search').value.trim());
  return params;
}
async function loadCases() {
  state.offset = 0;
  const payload = await api(`/api/cases?${query()}`); state.rows = payload.rows; state.total = payload.total;
  $('#case-count').textContent = `${payload.total}`;
  $('#case-list').innerHTML = payload.rows.map((row) => `<button class="case-row" data-id="${row.visualEntityId}"><b>${row.queueIndex}. ${row.priority} · ${row.entityType}</b><small>${row.courseId} · ${row.families.join(', ')}</small><small>${row.status} · cubre ${row.coveredEntityCount}</small></button>`).join('');
  document.querySelectorAll('.case-row').forEach((button) => button.addEventListener('click', () => openCase(button.dataset.id)));
  if (payload.rows.length) await openCase(payload.rows[0].visualEntityId);
}
function detail(label, value) { return `<div class="detail"><span>${label}</span><b>${value ?? '—'}</b></div>`; }
async function openCase(id) {
  const payload = await api(`/api/case/${encodeURIComponent(id)}`); state.selected = payload.reviewCase; state.viewed = new Set([320, 1280]);
  $('.empty').hidden = true; $('#case').hidden = false;
  document.querySelectorAll('.case-row').forEach((button) => button.classList.toggle('active', button.dataset.id === id));
  const row = payload.reviewCase.entity;
  $('#priority').textContent = `${row.priority} · ${payload.status}`;
  $('#case-title').textContent = `${payload.reviewCase.queueIndex} / 5722 · ${row.entityType}`;
  $('#case-meta').textContent = `${row.courseId} · ${row.subjectId} · ${row.topicLabel ?? 'sin tema'}`;
  $('#literal').textContent = row.literal;
  $('#details').innerHTML = [detail('Familias', row.families.join(', ')), detail('Grupo', `${payload.reviewCase.groupTypes.join(', ') || 'INDIVIDUAL'} · ${payload.reviewCase.coveredEntityCount} entidades`), detail('PAU', `${row.community ?? '—'} · ${row.pauYear ?? '—'} · ${row.pauCall ?? '—'}`), detail('Origen', `${row.sourceFile ?? '—'} · ${row.sourcePath ?? '—'}`), detail('SourceRecordId', (row.sourceRecordIds ?? []).join(', ')), detail('VisualEntityId', row.visualEntityId), detail('ExerciseId', row.exerciseId), detail('Input hash', row.inputHash), detail('Literal hash', row.literalHash), detail('Render signature', row.renderSignature)].join('');
  for (const width of [320, 375, 768, 1280]) $(`#view-${width}`).src = `/render/${id}?width=${width}`;
  $('#comment').value = payload.decision?.comment ?? '';
  $('#decision-status').textContent = payload.decision ? `Decisión actual: ${payload.decision.decision} · ${payload.decision.decidedAt}` : 'Pendiente de acción humana.';
  $('#decision-status').className = ''; renderProgress(payload.progress);
  await api('/api/resume', { method: 'POST', body: JSON.stringify({ queueIndex: payload.reviewCase.queueIndex - 1, reviewerId: $('#reviewer').value }) });
}
async function decide(decision) {
  const status = $('#decision-status');
  try {
    const payload = await api('/api/decision', { method: 'POST', body: JSON.stringify({ humanAction: true, visualEntityId: state.selected.visualEntityId, decision, reviewerId: $('#reviewer').value.trim(), comment: $('#comment').value, viewportsViewed: [...state.viewed] }) });
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
  addFilter('courseId', 'Curso', state.bootstrap.filters.courseId); addFilter('subjectId', 'Materia', state.bootstrap.filters.subjectId); addFilter('entityType', 'Tipo', state.bootstrap.filters.entityType); addFilter('family', 'Familia', state.bootstrap.filters.families); addFilter('priority', 'Prioridad', state.bootstrap.filters.priority); addFilter('community', 'Comunidad', state.bootstrap.filters.community);
  $('#search').addEventListener('change', loadCases); $('#previous').addEventListener('click', () => move(-1)); $('#next').addEventListener('click', () => move(1));
  document.querySelectorAll('[data-decision]').forEach((button) => button.addEventListener('click', () => decide(button.dataset.decision)));
  $('.secondary').addEventListener('toggle', (event) => { if (event.target.open) { state.viewed.add(375); state.viewed.add(768); } });
  await loadCases();
  if (state.bootstrap.currentQueueIndex > 0) { const response = await api(`/api/cases?offset=${state.bootstrap.currentQueueIndex}&limit=1`); if (response.rows[0]) await openCase(response.rows[0].visualEntityId); }
}
start().catch((error) => { $('.empty').textContent = error.message; });

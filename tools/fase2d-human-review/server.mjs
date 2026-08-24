import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  applyDecision, createEmptyState, environmentDigest, invalidateChangedEnvironment,
  progressFor, readJson, readJsonl, recomputePropagation, rollbackLastDecision, stableStringify, writeJson,
} from '../../catalog/human-visual-review/fase2d-human-review.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const publicRoot = path.join(root, 'tools/fase2d-human-review/public');
const artifactRoot = path.join(root, 'artifacts/fase2d-human-review');
const stateRoot = path.join(artifactRoot, 'local-state');
const stateFile = path.join(stateRoot, 'review-state.json');
const port = Number(process.argv.find((arg) => arg.startsWith('--port='))?.split('=')[1] ?? 8824);

const manifest = readJson(path.join(artifactRoot, 'review-manifest.json'));
const queue = readJsonl(path.join(artifactRoot, 'review-queue.jsonl'));
const environment = readJson(path.join(artifactRoot, 'environment-lock.json'));
const queueById = new Map(queue.map((row) => [row.visualEntityId, row]));
let state = fs.existsSync(stateFile) ? readJson(stateFile) : createEmptyState(manifest);
const environmentWasInvalidated = invalidateChangedEnvironment(state, environmentDigest(Object.fromEntries(Object.entries(environment).filter(([key]) => key !== 'environmentDigest'))));
recomputePropagation(state);

function saveState() {
  writeJson(stateFile, state);
}
if (environmentWasInvalidated) saveState();

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(`${stableStringify(body)}\n`);
}

function text(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(body);
}

function escaped(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => { body += chunk; if (body.length > 1_000_000) reject(new Error('Cuerpo demasiado grande.')); });
    req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch (error) { reject(error); } });
    req.on('error', reject);
  });
}

function filtersFor(rows) {
  const values = (selector) => [...new Set(rows.flatMap(selector).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), 'es'));
  return {
    courseId: values((row) => [row.entity.courseId]), subjectId: values((row) => [row.entity.subjectId]),
    entityType: values((row) => [row.entity.entityType]), priority: values((row) => [row.entity.priority]),
    families: values((row) => row.entity.families), community: values((row) => [row.entity.community]),
  };
}

function statusFor(id) {
  return state.current[id]?.decision ?? state.propagation[id]?.status ?? 'PENDING_HUMAN_REVIEW';
}

function matches(row, params) {
  for (const key of ['courseId', 'subjectId', 'entityType', 'priority', 'community']) {
    if (params.get(key) && row.entity[key] !== params.get(key)) return false;
  }
  if (params.get('family') && !row.entity.families.includes(params.get('family'))) return false;
  if (params.get('status') && statusFor(row.visualEntityId) !== params.get('status')) return false;
  const search = params.get('search')?.trim().toLocaleLowerCase('es');
  if (search && !stableStringify(row).toLocaleLowerCase('es').includes(search)) return false;
  return true;
}

function renderPage(reviewCase, width) {
  const entity = reviewCase.entity;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=${width},initial-scale=1"><style>*{box-sizing:border-box}html,body{margin:0;background:#f5f8ff;color:#0c1d46}.audit-shell{width:100%;padding:12px}.audit-card{width:100%;background:#fff;border:1px solid #ccd8ed;border-radius:12px;padding:14px;overflow:visible}.label{font:12px Arial,sans-serif;color:#476080}.math-content{font-family:"Cambria Math","STIX Two Math","Times New Roman",serif;font-size:20px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere;min-height:1.45em}.meta{margin-top:8px;font:11px monospace;color:#567}</style></head><body><main class="audit-shell"><article class="audit-card"><div class="label">${escaped(entity.entityType)} · ${escaped(entity.courseId)} · ${escaped(entity.subjectId)}</div><div class="math-content">${escaped(entity.literal)}</div><div class="meta">${escaped(entity.visualEntityId)} · ${escaped(entity.families.join(', '))}</div></article></main></body></html>`;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (req.method === 'GET' && url.pathname === '/api/bootstrap') {
      json(res, 200, { manifest: { ...manifest, groups: undefined, witnessesByGroup: undefined }, progress: progressFor(state, queue), filters: filtersFor(queue), currentQueueIndex: state.currentQueueIndex, reviewerId: state.reviewerId, invalidatedAt: state.invalidatedAt ?? null }); return;
    }
    if (req.method === 'GET' && url.pathname === '/api/cases') {
      const filtered = queue.filter((row) => matches(row, url.searchParams));
      const offset = Math.max(0, Number(url.searchParams.get('offset') ?? 0));
      const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') ?? 30)));
      json(res, 200, { total: filtered.length, offset, rows: filtered.slice(offset, offset + limit).map((row) => ({ queueIndex: row.queueIndex, visualEntityId: row.visualEntityId, courseId: row.entity.courseId, subjectId: row.entity.subjectId, entityType: row.entity.entityType, priority: row.entity.priority, families: row.entity.families, status: statusFor(row.visualEntityId), groupTypes: row.groupTypes, coveredEntityCount: row.coveredEntityCount })) }); return;
    }
    if (req.method === 'GET' && url.pathname === '/api/navigate') {
      const filtered = queue.filter((row) => matches(row, url.searchParams));
      const currentId = url.searchParams.get('id');
      const delta = Math.sign(Number(url.searchParams.get('delta') ?? 1));
      const currentIndex = filtered.findIndex((row) => row.visualEntityId === currentId);
      const target = filtered[Math.max(0, Math.min(filtered.length - 1, currentIndex + delta))] ?? null;
      json(res, 200, { total: filtered.length, visualEntityId: target?.visualEntityId ?? null }); return;
    }
    if (req.method === 'GET' && url.pathname.startsWith('/api/case/')) {
      const id = decodeURIComponent(url.pathname.slice('/api/case/'.length));
      const reviewCase = queueById.get(id);
      if (!reviewCase) { json(res, 404, { error: 'Caso no encontrado.' }); return; }
      json(res, 200, { reviewCase, decision: state.current[id] ?? null, inherited: state.propagation[id] ?? null, status: statusFor(id), progress: progressFor(state, queue) }); return;
    }
    if (req.method === 'GET' && url.pathname.startsWith('/render/')) {
      const id = decodeURIComponent(url.pathname.slice('/render/'.length));
      const width = Number(url.searchParams.get('width'));
      if (![320, 375, 768, 1280].includes(width) || !queueById.has(id)) { text(res, 404, 'Vista no encontrada.'); return; }
      text(res, 200, renderPage(queueById.get(id), width), 'text/html; charset=utf-8'); return;
    }
    if (req.method === 'POST' && url.pathname === '/api/decision') {
      const body = await parseBody(req);
      if (body.humanAction !== true) { json(res, 403, { error: 'Se requiere una acción humana explícita.' }); return; }
      const reviewCase = queueById.get(body.visualEntityId);
      if (!reviewCase) { json(res, 404, { error: 'Caso no encontrado.' }); return; }
      const record = applyDecision(state, reviewCase, body);
      state.reviewerId = record.reviewerId;
      state.currentQueueIndex = Math.min(queue.length - 1, reviewCase.queueIndex);
      saveState();
      json(res, 200, { record, progress: progressFor(state, queue), propagation: state.propagation, revoked: state.revoked }); return;
    }
    if (req.method === 'POST' && url.pathname === '/api/resume') {
      const body = await parseBody(req);
      const index = Math.max(0, Math.min(queue.length - 1, Number(body.queueIndex ?? 0)));
      state.currentQueueIndex = index;
      if (String(body.reviewerId ?? '').trim()) state.reviewerId = String(body.reviewerId).trim();
      saveState(); json(res, 200, { ok: true, currentQueueIndex: index }); return;
    }
    if (req.method === 'POST' && url.pathname === '/api/rollback') {
      const body = await parseBody(req);
      if (body.confirm !== 'ROLLBACK_LAST_DECISION' || !state.history.length) { json(res, 400, { error: 'Confirmación de rollback inválida.' }); return; }
      const removed = rollbackLastDecision(state);
      saveState(); json(res, 200, { removedDecisionId: removed.decisionId, progress: progressFor(state, queue) }); return;
    }
    if (req.method === 'GET' && url.pathname === '/api/export') { json(res, 200, state); return; }

    const requested = url.pathname === '/' ? path.join(publicRoot, 'index.html') : path.resolve(publicRoot, `.${url.pathname}`);
    if (!requested.startsWith(publicRoot) || !fs.existsSync(requested) || fs.statSync(requested).isDirectory()) { text(res, 404, 'Not found'); return; }
    const type = requested.endsWith('.css') ? 'text/css; charset=utf-8' : requested.endsWith('.js') ? 'text/javascript; charset=utf-8' : 'text/html; charset=utf-8';
    text(res, 200, fs.readFileSync(requested), type);
  } catch (error) { json(res, 400, { error: error.message }); }
});

server.listen(port, '127.0.0.1', () => process.stdout.write(`FASE2D_HUMAN_REVIEW_READY http://127.0.0.1:${port}/\n`));

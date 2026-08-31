import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createEmptyState, queueSemanticHash, recordHumanDecision, rollbackLastDecision,
  summarizeProgress, validateState,
} from '../../catalog/equation3-human-comparison/human-comparison.mjs';

const toolDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(toolDir, '../..');
const publicDir = path.join(toolDir, 'public');
const artifactDir = path.join(root, 'artifacts/equation3-human-comparison');
const statePath = path.join(artifactDir, 'local-state/review-state.json');
const recheckDir = path.join(root, 'artifacts/equation3-post-human-correction');
const recheckStatePath = path.join(artifactDir, 'local-state/recheck-10-state.json');
const args = process.argv.slice(2);
const valueAfter = (flag, fallback) => { const index = args.indexOf(flag); return index >= 0 ? args[index + 1] : fallback; };
const port = Number(valueAfter('--port', '8846'));
const defaultPilot = valueAfter('--pilot', '');

const queue = fs.readFileSync(path.join(artifactDir, 'review-queue.jsonl'), 'utf8').trim().split(/\r?\n/).map(JSON.parse);
const queueHash = queueSemanticHash(queue);
const recheckQueue = fs.existsSync(path.join(recheckDir, 'recheck-10.jsonl'))
  ? fs.readFileSync(path.join(recheckDir, 'recheck-10.jsonl'), 'utf8').trim().split(/\r?\n/).map(JSON.parse)
  : [];
const recheckQueueHash = queueSemanticHash(recheckQueue);
const pilots = new Map(['first-3', 'object-1'].map((pilotId) => [
  pilotId,
  JSON.parse(fs.readFileSync(path.join(artifactDir, `pilot-${pilotId}.json`), 'utf8')),
]));

function modeFor(pilotId = '') {
  if (pilotId === 'recheck-10') return { queue: recheckQueue, queueHash: recheckQueueHash, statePath: recheckStatePath, recheck: true };
  return { queue, queueHash, statePath, recheck: false };
}

function loadState(mode) {
  if (!fs.existsSync(mode.statePath)) return createEmptyState(mode.queueHash);
  return validateState(JSON.parse(fs.readFileSync(mode.statePath, 'utf8')), mode.queueHash);
}

function saveState(mode, state) {
  fs.mkdirSync(path.dirname(mode.statePath), { recursive: true });
  const temporary = `${mode.statePath}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  fs.renameSync(temporary, mode.statePath);
}

function sendJson(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  response.end(JSON.stringify(body));
}

function safeStaticPath(urlPath) {
  const relative = urlPath === '/' ? 'index.html' : decodeURIComponent(urlPath.slice(1));
  const resolved = path.resolve(publicDir, relative);
  return resolved.startsWith(publicDir) ? resolved : null;
}

function contentType(filePath) {
  return ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.pdf': 'application/pdf' })[path.extname(filePath)] ?? 'application/octet-stream';
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (chunks.reduce((sum, chunk) => sum + chunk.length, 0) > 64 * 1024) throw new Error('Solicitud demasiado grande.');
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    if (request.method === 'GET' && url.pathname === '/api/bootstrap') {
      const requestedPilot = url.searchParams.get('pilot') || defaultPilot;
      const mode = modeFor(requestedPilot);
      const state = loadState(mode);
      const selectedPilot = pilots.get(requestedPilot);
      const visibleIds = selectedPilot ? new Set(selectedPilot.objectIds) : null;
      const cases = visibleIds ? mode.queue.filter((item) => visibleIds.has(item.objectId)) : mode.queue;
      return sendJson(response, 200, {
        mode: mode.recheck ? 'RECHECK_10' : selectedPilot ? `PILOT_${requestedPilot.toUpperCase().replaceAll('-', '_')}` : 'FULL_QUEUE',
        cases,
        decisions: state.decisions,
        lastObjectId: state.lastObjectId,
        progress: summarizeProgress(mode.queue, state.decisions),
        queueSemanticHash: mode.queueHash,
        statePersisted: fs.existsSync(mode.statePath),
        suggestedReviewer: mode.recheck ? 'reviewer-1' : '',
      });
    }
    if (request.method === 'GET' && url.pathname.startsWith('/api/evidence/')) {
      const objectId = decodeURIComponent(url.pathname.slice('/api/evidence/'.length)).replace(/\.png$/i, '');
      const item = [...queue, ...recheckQueue].find((candidate) => candidate.objectId === objectId);
      if (!item) return sendJson(response, 404, { error: 'Evidencia no encontrada.' });
      const filePath = path.resolve(root, item.officialEvidence.pngPath);
      if (!filePath.startsWith(root) || !fs.existsSync(filePath)) return sendJson(response, 404, { error: 'PNG oficial no disponible.' });
      response.writeHead(200, { 'content-type': 'image/png', 'cache-control': 'no-store' });
      return fs.createReadStream(filePath).pipe(response);
    }
    if (request.method === 'GET' && url.pathname.startsWith('/api/original-document/')) {
      const documentId = decodeURIComponent(url.pathname.slice('/api/original-document/'.length)).replace(/\.pdf$/i, '');
      const item = [...queue, ...recheckQueue].find((candidate) => candidate.documentId === documentId);
      if (!item) return sendJson(response, 404, { error: 'Documento oficial no encontrado.' });
      const pdfPath = path.resolve(root, item.originalDocumentView.pdfPath);
      const sourcePath = path.resolve(root, item.originalDocumentView.sourcePath);
      const filePath = fs.existsSync(pdfPath) ? pdfPath : sourcePath;
      if (!filePath.startsWith(root) || !fs.existsSync(filePath)) return sendJson(response, 404, { error: 'Documento oficial completo no disponible.' });
      const isPdf = path.extname(filePath).toLowerCase() === '.pdf';
      response.writeHead(200, {
        'content-type': isPdf ? 'application/pdf' : 'application/msword',
        'content-disposition': `${isPdf ? 'inline' : 'attachment'}; filename="${path.basename(filePath)}"`,
        'cache-control': 'no-store',
      });
      return fs.createReadStream(filePath).pipe(response);
    }
    if (request.method === 'POST' && url.pathname === '/api/decision') {
      const body = await readBody(request);
      const mode = modeFor(body.pilot || defaultPilot);
      const next = recordHumanDecision(loadState(mode), mode.queue, { ...body, humanAction: true });
      saveState(mode, next);
      return sendJson(response, 200, { decisions: next.decisions, progress: summarizeProgress(mode.queue, next.decisions) });
    }
    if (request.method === 'POST' && url.pathname === '/api/rollback') {
      const body = await readBody(request);
      const mode = modeFor(body.pilot || defaultPilot);
      const next = rollbackLastDecision(loadState(mode));
      saveState(mode, next);
      return sendJson(response, 200, { decisions: next.decisions, progress: summarizeProgress(mode.queue, next.decisions) });
    }
    if (request.method !== 'GET') return sendJson(response, 405, { error: 'Metodo no permitido.' });
    const filePath = safeStaticPath(url.pathname);
    if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return sendJson(response, 404, { error: 'No encontrado.' });
    response.writeHead(200, { 'content-type': contentType(filePath), 'cache-control': 'no-store' });
    fs.createReadStream(filePath).pipe(response);
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
});

server.listen(port, '127.0.0.1', () => {
  const suffix = pilots.has(defaultPilot) || defaultPilot === 'recheck-10' ? `?pilot=${defaultPilot}` : '';
  console.log(`Equation.3 human comparison: http://127.0.0.1:${port}/${suffix}`);
  console.log('Sin red, sin decisiones automaticas y sin conexion con produccion.');
});

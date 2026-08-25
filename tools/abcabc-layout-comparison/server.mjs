import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const toolDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(toolDir, '../..');
const publicDir = path.join(toolDir, 'public');
const artifactPath = path.join(root, 'artifacts/equation3-human-validation-final/abcabc-layout-reconstruction.json');
const originalPdfPath = path.join(root, 'artifacts/equation3-human-comparison/original-documents/ade2012-exam-m6-61f8d5d809881c49.pdf');
const originalDocPath = path.join(root, 'sources/pau-official/andalucia/ccss-ii/2012/official-doc/exam-modelo-6.doc');
const originalPngPath = path.join(root, 'artifacts/andalucia-ccssii-2012-doc/document-objects/adobj-61f8d5d809881c49-001.png');
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = Number(portIndex >= 0 ? args[portIndex + 1] : 8849);

function sendJson(response, status, value) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  response.end(JSON.stringify(value));
}

function sendFile(response, filePath, contentType, disposition) {
  if (!fs.existsSync(filePath)) return sendJson(response, 404, { error: 'Evidencia oficial no encontrada.' });
  const headers = { 'content-type': contentType, 'cache-control': 'no-store' };
  if (disposition) headers['content-disposition'] = disposition;
  response.writeHead(200, headers);
  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    if (!response.headersSent) sendJson(response, 500, { error: 'No se pudo leer la evidencia oficial.' });
    else response.destroy();
  });
  return stream.pipe(response);
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${port}`);
  if (request.method !== 'GET') return sendJson(response, 405, { error: 'Solo lectura.' });
  if (url.pathname === '/api/case') return sendJson(response, 200, JSON.parse(fs.readFileSync(artifactPath, 'utf8')));
  if (url.pathname === '/api/original') {
    if (fs.existsSync(originalPdfPath)) return sendFile(response, originalPdfPath, 'application/pdf');
    response.setHeader('x-mathup-original-view', 'official-equation-object-png-fallback');
    return sendFile(response, originalPngPath, 'image/png');
  }
  if (url.pathname === '/api/original-doc') {
    return sendFile(response, originalDocPath, 'application/msword', 'inline; filename="exam-modelo-6.doc"');
  }
  const relative = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
  const target = path.resolve(publicDir, relative);
  if (!target.startsWith(publicDir) || !fs.existsSync(target)) return sendJson(response, 404, { error: 'No encontrado.' });
  const type = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' }[path.extname(target)] ?? 'application/octet-stream';
  response.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
  fs.createReadStream(target).pipe(response);
});

server.listen(port, '127.0.0.1', () => console.log(`Comparacion ABCABC: http://127.0.0.1:${port}/`));

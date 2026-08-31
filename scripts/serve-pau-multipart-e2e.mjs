import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const port = Number(process.argv.find((value) => value.startsWith('--port='))?.split('=')[1] || 4187);
const reportDir = path.join(root, 'artifacts', 'pau-multipart-browser-e2e');
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.js', 'text/javascript; charset=utf-8'], ['.mjs', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'], ['.json', 'application/json; charset=utf-8'], ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'], ['.webp', 'image/webp'],
  ['.pdf', 'application/pdf'], ['.mp3', 'audio/mpeg'], ['.wav', 'audio/wav']
]);

function send(response, status, body, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(status, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
  response.end(body);
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url || '/', `http://127.0.0.1:${port}`);
  if (request.method === 'POST' && requestUrl.pathname === '/__pau-multipart-e2e/report') {
    const chunks = [];
    request.on('data', (chunk) => chunks.push(chunk));
    request.on('end', () => {
      try {
        const report = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        fs.mkdirSync(reportDir, { recursive: true });
        const stamp = String(report.finishedAt || new Date().toISOString()).replace(/[:.]/g, '-');
        const serialized = `${JSON.stringify(report, null, 2)}\n`;
        fs.writeFileSync(path.join(reportDir, `run-${stamp}.json`), serialized);
        fs.writeFileSync(path.join(reportDir, 'latest-report.json'), serialized);
        send(response, 200, JSON.stringify({ ok: true }), 'application/json; charset=utf-8');
      } catch (error) {
        send(response, 400, JSON.stringify({ ok: false, error: error.message }), 'application/json; charset=utf-8');
      }
    });
    return;
  }
  const relative = decodeURIComponent(requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname).replace(/^[/\\]+/, '');
  const absolute = path.resolve(root, relative);
  if (absolute !== root && !absolute.startsWith(`${root}${path.sep}`)) {
    send(response, 403, 'Forbidden');
    return;
  }
  fs.stat(absolute, (error, stat) => {
    if (error || !stat.isFile()) {
      send(response, 404, 'Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': mime.get(path.extname(absolute).toLowerCase()) || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(absolute).pipe(response);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`PAU multipart E2E server: http://127.0.0.1:${port}/?multipart-e2e=1&community=andalucia&run-all=1`);
});

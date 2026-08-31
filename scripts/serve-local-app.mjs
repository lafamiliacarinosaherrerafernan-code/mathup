import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.argv[2] || 8765);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };
http.createServer((request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${port}`);
  const relative = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname).replace(/^\/+/, '');
  const target = path.resolve(root, relative);
  if (target !== root && !target.startsWith(`${root}${path.sep}`)) { response.writeHead(403); return response.end(); }
  fs.stat(target, (error, stat) => {
    if (error || !stat.isFile()) { response.writeHead(404); return response.end('Not found'); }
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Type', types[path.extname(target).toLowerCase()] || 'application/octet-stream');
    fs.createReadStream(target).pipe(response);
  });
}).listen(port, '127.0.0.1', () => console.log(`Aplicación local: http://127.0.0.1:${port}/`));

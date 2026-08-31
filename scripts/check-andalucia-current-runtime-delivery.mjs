// Loopback-only visual review of the current, fully layered Andalucía runtime.
import http from 'node:http';
import fs from 'node:fs';
import vm from 'node:vm';
import { publicComponents } from './prepare-andalucia-inference-delivery.mjs';

const runtimeFiles = [
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-interactive-delivery-gate.js'
];
const runtimeSource = runtimeFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(runtimeSource, context);
const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const records = runtime.exercises;
const ids = new Set(records.map((record) => record.exerciseId));
const assets = new Map([
  ['/', ['tools/andalucia-inference-delivery/index.html', 'text/html']],
  ['/frame', ['tools/andalucia-inference-delivery/frame.html', 'text/html']],
  ['/frame.js', ['tools/andalucia-inference-delivery/frame.js', 'text/javascript']],
  ['/check.js', ['tools/andalucia-inference-delivery/check.js', 'text/javascript']],
  ...['math-renderer.js', 'styles.css', 'math-notation.css', 'mathup-brand.css']
    .map((file) => [`/${file}`, [file, file.endsWith('.js') ? 'text/javascript' : 'text/css']])
]);

const server = http.createServer((request, response) => {
  const origin = `http://127.0.0.1:${server.address().port}`;
  if (request.headers.host !== origin.slice(7)) { response.writeHead(403); return response.end(); }
  const url = new URL(request.url, origin);
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  if (request.method === 'GET' && url.pathname === '/data.json') {
    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify({ environment: { scope: 'CURRENT_LAYERED_RUNTIME' }, records }));
  }
  if (request.method === 'GET' && url.pathname === '/runtime.js') {
    response.setHeader('Content-Type', 'text/javascript');
    return response.end(runtimeSource);
  }
  if (request.method === 'GET' && url.pathname === '/components.js') {
    response.setHeader('Content-Type', 'text/javascript');
    return response.end(publicComponents());
  }
  if (request.method === 'GET' && url.pathname === '/frame') {
    const id = url.searchParams.get('id');
    if (!ids.has(id)) { response.writeHead(404); return response.end(); }
    response.setHeader('Content-Type', 'text/html');
    return response.end(fs.readFileSync('tools/andalucia-inference-delivery/frame.html', 'utf8'));
  }
  if (request.method === 'POST' && url.pathname === '/results') {
    response.writeHead(204);
    return response.end();
  }
  const asset = assets.get(url.pathname);
  if (request.method !== 'GET' || !asset) { response.writeHead(404); return response.end(); }
  response.setHeader('Content-Type', asset[1]);
  response.end(fs.readFileSync(asset[0]));
});

server.listen(0, '127.0.0.1', () => {
  console.log(`Current Andalucía runtime review: http://127.0.0.1:${server.address().port}/ ; ${records.length} exercises.`);
});

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation', 'user-additions-render-results.json');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'data', 'andalucia-pau-runtime.js'), 'utf8'), context);
const additions = context.window.ANDALUCIA_PAU_RUNTIME.exercises.filter((row) => row.sourceAuthority === 'USER_SUPPLIED_PRIMARY_OFFICIAL_DOCUMENT');
const sha = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');
const files = new Map([
  ['/', ['tools/pau-resolution-render-check/index.html', 'text/html']],
  ['/check.js', ['tools/pau-resolution-render-check/check.js', 'text/javascript']],
  ['/value-adapter.mjs', ['tools/pau-resolution-render-check/value-adapter.mjs', 'text/javascript']],
  ['/math-renderer.js', ['math-renderer.js', 'text/javascript']],
  ['/styles.css', ['styles.css', 'text/css']],
  ['/math-notation.css', ['math-notation.css', 'text/css']],
  ['/mathup-brand.css', ['mathup-brand.css', 'text/css']]
]);
const splitStep = (step) => {
  if (typeof step === 'object') return step;
  const [explanation, ...math] = String(step || '').split('\n');
  return { explanation, math: math.join('\n') };
};
const data = additions.map((row, queueIndex) => ({
  exerciseId: row.exerciseId, queueIndex, recordHash: sha(JSON.stringify(row)), subject: row.subject, primaryTopic: row.primaryTopic,
  source: row.officialPromptLiteral, sourceBlocks: null, sourceRepresentationAvailable: true,
  parts: row.parts.map((part) => ({ partId: part.id, prompt: part.text, answer: part.semanticAnswer, distractors: part.distractors,
    solutionSteps: part.solutionSteps.map(splitStep), finalAnswer: part.finalAnswer }))
}));
const environment = { input: sha(JSON.stringify(data)), engine: sha(fs.readFileSync(path.join(root, 'math-renderer.js'))), scope: '175_USER_SUPPLIED_ADDITIONS' };
const server = http.createServer((request, response) => {
  const origin = `http://127.0.0.1:${server.address().port}`;
  if (request.headers.host !== `127.0.0.1:${server.address().port}`) { response.writeHead(403); return response.end(); }
  const url = new URL(request.url, origin);
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  if (request.method === 'GET' && url.pathname === '/data.json') { response.setHeader('Content-Type', 'application/json'); return response.end(JSON.stringify({ environment, data })); }
  if (request.method === 'POST' && url.pathname === '/results' && request.headers.origin === origin) {
    let body = ''; let size = 0;
    request.on('data', (chunk) => { size += chunk.length; if (size > 30_000_000) request.destroy(); else body += chunk; });
    request.on('end', () => { try {
      const result = JSON.parse(body);
      if (result.environment.input !== environment.input || result.rows.length !== data.length * 4) throw new Error('Incomplete render run');
      fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n', 'utf8');
      response.setHeader('Content-Type', 'application/json'); response.end(JSON.stringify({ saved: true }));
      console.log(JSON.stringify({ saved: path.relative(root, output), summary: result.summary }));
    } catch (error) { response.writeHead(400); response.end(error.message); } });
    return;
  }
  const entry = files.get(url.pathname);
  if (request.method !== 'GET' || !entry) { response.writeHead(404); return response.end(); }
  response.setHeader('Content-Type', entry[1]); response.end(fs.readFileSync(path.join(root, entry[0])));
});
server.listen(0, '127.0.0.1', () => console.log(`User additions render check: http://127.0.0.1:${server.address().port}/`));

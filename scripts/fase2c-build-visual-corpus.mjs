import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serializeLatex, serializeMathML, sha256, validateDerivedMathML, validateMathNode } from '../catalog/normalization/canonical-math-ast.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'artifacts/fase2c/visual');
fs.mkdirSync(out, { recursive: true });
const real = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/fase2b-integrity-audit/representative-corpus.json'), 'utf8'));
const n = (value) => ({ type: 'number', value: String(value) });
const x = (value = 'x') => ({ type: 'identifier', value });
const eq = (left, right, operator = '=') => ({ type: 'equation', left, right, operator });
const add = (left, right, operator = '+') => ({ type: 'binary', left, right, operator });
const controls = [
  ['power', { type: 'power', base: x(), exponent: n(2) }],
  ['subscript', { type: 'subscript', base: x('a'), index: n(1) }],
  ['fraction', { type: 'fraction', numerator: add(x(), n(1)), denominator: add(x(), n(2), '−') }],
  ['root', { type: 'radical', radicand: add(x(), n(5)) }],
  ['absolute-value', { type: 'absolute', body: add(x(), n(3), '−') }],
  ['equation', eq(add(x(), n(2)), n(7))],
  ['system', { type: 'system', children: [eq(add(x(), x('y')), n(3)), eq(add(x(), x('y'), '−'), n(1))] }],
  ['inequality', { type: 'inequality', left: add(x(), n(2)), right: n(5), operator: '<' }],
  ['matrix', { type: 'matrix', rows: [[n(1), n(2)], [n(3), n(4)]] }],
  ['determinant', { type: 'determinant', rows: [[x('a'), x('b')], [x('c'), x('d')]] }],
  ['limit', { type: 'limit', variable: x(), lower: n(0), body: { type: 'fraction', numerator: { type: 'function-call', name: 'sin', children: [x()] }, denominator: x() } }],
  ['derivative', { type: 'derivative', variable: x(), body: { type: 'power', base: x(), exponent: n(3) } }],
  ['defined-integral', { type: 'integral', lower: n(0), upper: n(1), body: { type: 'power', base: x(), exponent: n(2) }, variable: x() }],
  ['indefinite-integral', { type: 'integral', body: { type: 'function-call', name: 'cos', children: [x()] }, variable: x() }],
  ['summation', { type: 'sum', lower: eq(x('i'), n(1)), upper: x('n'), body: x('i') }],
  ['product', { type: 'product', lower: eq(x('i'), n(1)), upper: x('n'), body: x('i') }],
  ['logarithm', { type: 'function-call', name: 'log', children: [x()] }],
  ['exponential', { type: 'power', base: x('e'), exponent: x() }],
  ['vector', { type: 'vector', body: x('v') }],
  ['coordinates', { type: 'coordinate', children: [n(2), n(-1)] }],
  ['interval', { type: 'interval', left: n(-2), right: n(4), openLeft: true, openRight: false }],
  ['set', { type: 'set', children: [n(1), n(2), n(3)] }],
  ['piecewise', { type: 'piecewise', branches: [
    { expression: { type: 'power', base: x(), exponent: n(2) }, condition: { type: 'inequality', left: x(), right: n(0), operator: '<' } },
    { expression: x(), condition: { type: 'inequality', left: x(), right: n(0), operator: '≥' } },
  ] }],
  ['multiline', { type: 'aligned', children: [eq(add(x(), n(1)), n(4)), eq(x(), n(3))] }],
  ['probability', { type: 'probability', body: { type: 'set', children: [x('A'), x('B')] } }],
  ['combinatorics', { type: 'combinatorial', upper: x('n'), lower: x('k') }],
  ['greek', { type: 'greek', value: 'λ' }],
  ['units', { type: 'unit', body: n(12), value: 'cm²' }],
];

const fixtures = controls.map(([family, math], index) => {
  const errors = validateMathNode(math);
  if (errors.length) throw new Error(`${family}: ${errors.join('; ')}`);
  const mathml = serializeMathML(math);
  if (!validateDerivedMathML(mathml)) throw new Error(`${family}: invalid derived MathML`);
  const sample = real[index % real.length];
  return {
    schemaVersion: 'mathup.visual-fixture.v1',
    fixtureId: `vf-${sha256({ family, math }).slice(0, 24)}`,
    family,
    profile: 'SYNTHETIC_CONTROL',
    entityContext: 'control',
    source: {
      status: 'VISUAL_CONTROL_NOT_CATALOG_CONTENT',
      linkedRealSample: {
        exerciseId: sample.exerciseId,
        courseId: sample.courseId,
        sourceStatement: sample.sourceStatement,
        answer: sample.answer ?? null,
        solution: sample.solution ?? null,
      },
    },
    math,
    derived: { latex: serializeLatex(math), mathml },
    resolutions: [320, 375, 768, 1280],
    expectations: ['NO_OVERLAP', 'NO_CLIPPING', 'NO_HIDDEN_CONTENT', 'NO_RAW_JSON', 'NO_RAW_LATEX'],
  };
});
fs.writeFileSync(path.join(out, 'visual-fixtures.json'), `${JSON.stringify(fixtures, null, 2)}\n`, 'utf8');

const escapedJson = JSON.stringify(fixtures).replaceAll('<', '\\u003c');
const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Corpus visual aislado · Fase 2C +MathUp</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f4f8ff;color:#10204b;font-family:system-ui,sans-serif}header{padding:20px;background:#102b70;color:white;position:sticky;top:0;z-index:2}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px;padding:16px}.fixture{background:#fff;border:1px solid #cad8ee;border-radius:16px;padding:14px;min-width:0;overflow:visible}.fixture h2{font-size:17px;margin:0 0 10px}.context{border-top:1px solid #e1e8f3;padding:10px 0}.context b{display:block;color:#087b69;font-size:12px;text-transform:uppercase}.math-wrap{font-size:clamp(18px,5vw,28px);overflow-x:auto;overflow-y:visible;padding:12px 4px;max-width:100%}math{font-family:'Cambria Math','STIX Two Math',serif}.source{font-size:12px;color:#53698f;overflow-wrap:anywhere;max-height:5.5em;overflow:auto}.meta{font-size:11px;color:#6b7892}.raw-proof{display:none}</style></head>
<body><header><strong>+MathUp · Corpus visual aislado Fase 2C</strong><div id="viewport"></div></header><main id="app"></main>
<script>const fixtures=${escapedJson};
const app=document.getElementById('app');document.getElementById('viewport').textContent='Ancho: '+innerWidth+' px';
for(const f of fixtures){const card=document.createElement('article');card.className='fixture';card.dataset.fixture=f.fixtureId;card.dataset.family=f.family;const contexts=['Enunciado','Respuesta','Solución'];card.innerHTML='<h2>'+f.family+'</h2>'+contexts.map((c,i)=>'<section class="context"><b>'+c+'</b><div class="math-wrap">'+f.derived.mathml+'</div></section>').join('')+'<p class="source">Muestra real vinculada (solo evidencia): '+String(f.source.linkedRealSample.sourceStatement??'').replace(/[&<>]/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[s]))+'</p><div class="meta">'+f.fixtureId+'</div>';app.appendChild(card)}
window.phase2cAudit=()=>{const all=[...document.querySelectorAll('.fixture,.context,.math-wrap,math')];const overflow=all.filter(e=>e.scrollWidth>e.clientWidth+2&&!e.classList.contains('math-wrap')).map(e=>({tag:e.tagName,class:e.className,fixture:e.closest('.fixture')?.dataset.fixture,sw:e.scrollWidth,cw:e.clientWidth}));const clipped=all.filter(e=>{const r=e.getBoundingClientRect();return r.width===0||r.height===0}).map(e=>e.closest('.fixture')?.dataset.fixture);const text=document.body.innerText;return {width:innerWidth,fixtures:fixtures.length,overflow,clipped,rawJson:/\\{\"(?:explanation|work)\"/.test(text),rawLatex:/\\\\(?:frac|sqrt|begin|int|lim)/.test(text),mathElements:document.querySelectorAll('math').length}};</script></body></html>`;
fs.writeFileSync(path.join(out, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(out, 'visual-corpus-summary.json'), `${JSON.stringify({ fixtures: fixtures.length, families: fixtures.map((f) => f.family), resolutions: [320, 375, 768, 1280], contextsPerFixture: ['statement', 'answer', 'solution'], realSamplesLinked: new Set(fixtures.map((f) => f.source.linkedRealSample.exerciseId)).size }, null, 2)}\n`, 'utf8');
process.stdout.write(`${JSON.stringify({ output: path.relative(root, out).replaceAll('\\', '/'), fixtures: fixtures.length })}\n`);

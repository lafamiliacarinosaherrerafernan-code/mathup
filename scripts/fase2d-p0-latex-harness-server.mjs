import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.argv.find((arg) => arg.startsWith('--port='))?.split('=')[1] ?? 8823);
const outputRoot = path.join(ROOT, 'artifacts/fase2d-p0-latex');
const representations = fs.readFileSync(path.join(outputRoot, 'representations.jsonl'), 'utf8')
  .split(/\r?\n/).filter(Boolean).map(JSON.parse);
const byId = new Map(representations.map((row) => [row.visualEntityId, row]));

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>+MathUp P0 LaTeX - Arnés aislado</title><style>
*{box-sizing:border-box}html,body{margin:0;background:#f5f8ff;color:#0c1d46;font-family:Arial,sans-serif}.audit-shell{width:100%;padding:12px}.audit-card{width:100%;max-width:100%;min-width:0;background:#fff;border:1px solid #ccd8ed;border-radius:12px;padding:14px;overflow:visible}.label{font-size:12px;color:#476080}.math-content{min-width:0;font-family:"Cambria Math","STIX Two Math","Times New Roman",serif;font-size:20px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;min-height:1.55em}.math-frac{display:inline-flex;vertical-align:-0.48em;flex-direction:column;align-items:center;line-height:1.02;margin:0 .08em;white-space:nowrap}.math-frac-num{display:block;padding:0 .14em .05em;border-bottom:.055em solid currentColor}.math-frac-den{display:block;padding:.05em .14em 0}.meta{margin-top:12px;font:11px monospace;color:#567;overflow-wrap:anywhere}.status{position:fixed;right:8px;bottom:8px;background:#0c1d46;color:white;padding:8px;border-radius:8px;z-index:5}
</style></head><body><main id="shell" class="audit-shell"><article id="card" class="audit-card"><div id="label" class="label"></div><div id="content" class="math-content"></div><div id="meta" class="meta"></div></article></main><div id="status" class="status">Preparando evidencia…</div><script>
const params=new URLSearchParams(location.search);const width=Number(params.get('width'));const entity=params.get('entity');
async function run(){const response=await fetch('/entity?entity='+encodeURIComponent(entity),{cache:'no-store'});if(!response.ok)throw new Error(await response.text());const row=await response.json();const card=document.getElementById('card'),content=document.getElementById('content');document.getElementById('label').textContent=row.entityType+' · corrección P0 aislada';document.getElementById('meta').textContent=row.visualEntityId+' · '+row.rule;
for(const segment of row.segments){if(segment.kind==='text'){content.append(document.createTextNode(segment.text));continue}const frac=document.createElement('span');frac.className='math-frac';frac.dataset.original=segment.original;const num=document.createElement('span');num.className='math-frac-num';num.textContent=segment.numerator;const den=document.createElement('span');den.className='math-frac-den';den.textContent=segment.denominator;frac.append(num,den);content.append(frac)}
await document.fonts.ready;const cr=card.getBoundingClientRect(),tr=content.getBoundingClientRect(),style=getComputedStyle(content);const visible=content.innerText;const slash=String.fromCharCode(92);const rawLatex=['frac','sqrt','begin','end','int','lim','vec','left','right'].some((command)=>visible.includes(slash+command))||((visible.match(/[$]/g)||[]).length>=2);const overflow=card.scrollWidth>card.clientWidth+1||content.scrollWidth>content.clientWidth+1;let clipped=tr.left<cr.left-1||tr.right>cr.right+1||tr.top<cr.top-1||tr.bottom>cr.bottom+1;const hidden=style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0||tr.width===0||tr.height===0;const rects=[...content.querySelectorAll('.math-frac')].map((node)=>node.getBoundingClientRect());let overlap=false;for(let i=0;i<rects.length;i++){const r=rects[i];if(r.left<cr.left-1||r.right>cr.right+1||r.top<cr.top-1||r.bottom>cr.bottom+1)clipped=true;for(let j=i+1;j<rects.length;j++){const s=rects[j];if(Math.min(r.right,s.right)-Math.max(r.left,s.left)>1&&Math.min(r.bottom,s.bottom)-Math.max(r.top,s.top)>1)overlap=true}}
window.auditResult={schemaVersion:'mathup.fase2d-p0.geometry-result.v1',visualEntityId:row.visualEntityId,entityId:row.entityId,exerciseId:row.exerciseId,viewport:width,overflow,clipped,overlap,hidden,rawLatex,rawJson:false,missingGlyph:false,resourceError:false,measurementError:false,clientWidth:card.clientWidth,scrollWidth:card.scrollWidth,contentWidth:Math.round(tr.width*100)/100,contentHeight:Math.round(tr.height*100)/100,fractionCount:rects.length,sourceLiteralHash:row.sourceLiteralHash,restoredLiteralHash:row.restoredLiteralHash};card.dataset.metrics=JSON.stringify(window.auditResult);document.body.dataset.complete='true';document.getElementById('status').textContent='Evidencia lista · '+width+' px';}
run().catch((error)=>{document.body.dataset.complete='error';document.getElementById('status').textContent=error.message;console.error(error)});
</script></body></html>`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
    res.end(html);
    return;
  }
  if (req.method === 'GET' && url.pathname === '/entity') {
    const row = byId.get(url.searchParams.get('entity'));
    if (!row) { res.writeHead(404); res.end('Entidad P0 no encontrada'); return; }
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
    res.end(JSON.stringify(row));
    return;
  }
  res.writeHead(404); res.end('Not found');
});
server.listen(port, '127.0.0.1', () => process.stdout.write(`FASE2D_P0_SERVER_READY http://127.0.0.1:${port}/\n`));

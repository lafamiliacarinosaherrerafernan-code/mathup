import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.argv.find((arg) => arg.startsWith('--port='))?.split('=')[1] ?? 8812);
const runId = process.argv.find((arg) => arg.startsWith('--run-id='))?.split('=')[1] ?? 'run-a';
const outputRoot = process.argv.find((arg) => arg.startsWith('--output-root='))?.split('=')[1] ?? 'artifacts/fase2d/runs';
const runRoot = path.join(ROOT, outputRoot, runId);
const populationPath = path.join(runRoot, 'population.jsonl');

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>+MathUp Fase 2D - Arnés aislado</title><style>
*{box-sizing:border-box}html,body{margin:0;background:#f5f8ff;color:#0c1d46;font-family:Arial,sans-serif}.audit-shell{width:100%;padding:12px}.audit-card{width:100%;max-width:100%;background:#fff;border:1px solid #ccd8ed;border-radius:12px;padding:14px;overflow:visible}.label{font-size:12px;color:#476080}.math-content{font-family:"Cambria Math","STIX Two Math","Times New Roman",serif;font-size:20px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere;min-height:1.45em}.meta{margin-top:8px;font:11px monospace;color:#567}.status{position:fixed;right:8px;bottom:8px;background:#0c1d46;color:white;padding:8px;border-radius:8px;z-index:5}
</style></head><body><main id="shell" class="audit-shell"><article id="card" class="audit-card"><div id="label" class="label"></div><div id="content" class="math-content"></div><div id="meta" class="meta"></div></article></main><div id="status" class="status">Preparando auditoría…</div><script>
const params=new URLSearchParams(location.search);const width=Number(params.get('width'));const requestedEntity=params.get('entity');const populationUrl='/population';
const latexCommands=['frac','sqrt','begin','end','int','lim','vec','left','right'];const slash=String.fromCharCode(92);const jsonKeys=['"steps"','"solution"','"answer"','"finalAnswer"','"explanation"','"work"'];const damagedTokens=['\uFFFD','Ã','Â','â€','âˆ','Î','ðŸ'];
async function run(){const text=await (await fetch(populationUrl,{cache:'no-store'})).text();const rows=text.trim().split(String.fromCharCode(10)).filter(Boolean).map(line=>JSON.parse(line.endsWith(String.fromCharCode(13))?line.slice(0,-1):line));const auditRows=requestedEntity?rows.filter(row=>row.visualEntityId===requestedEntity):rows;if(!auditRows.length)throw new Error('Entidad visual no encontrada');const card=document.getElementById('card'),content=document.getElementById('content'),label=document.getElementById('label'),meta=document.getElementById('meta'),status=document.getElementById('status');const results=[];
for(let i=0;i<auditRows.length;i++){const row=auditRows[i];label.textContent=row.entityType+' · '+row.courseId;content.textContent=row.literal;meta.textContent=row.visualEntityId+' · '+row.families.join(', ');const cr=card.getBoundingClientRect(),tr=content.getBoundingClientRect();const style=getComputedStyle(content);const lineHeight=parseFloat(style.lineHeight)||29;const childRects=[...content.getClientRects()];const overflow=card.scrollWidth>card.clientWidth+1||content.scrollWidth>content.clientWidth+1;const clipped=tr.left<cr.left-1||tr.right>cr.right+1||tr.top<cr.top-1||tr.bottom>cr.bottom+1;const hidden=style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0||tr.width===0||tr.height===0;const trimmed=row.literal.trim();const jsonShape=(trimmed.startsWith('{')&&trimmed.endsWith('}'))||(trimmed.startsWith('[')&&trimmed.endsWith(']'));const rawJson=jsonShape&&jsonKeys.some(key=>trimmed.includes(key));const rawLatex=latexCommands.some(command=>row.literal.includes(slash+command))||((row.literal.match(/[$]/g)||[]).length>=2);const missingGlyph=damagedTokens.some(token=>row.literal.includes(token));const metrics={schemaVersion:'mathup.fase2d.geometry-result.v1',visualEntityId:row.visualEntityId,entityId:row.entityId,viewport:width,overflow,clipped,overlap:false,hidden,rawJson,rawLatex,missingGlyph,resourceError:false,measurementError:false,clientWidth:card.clientWidth,scrollWidth:card.scrollWidth,contentWidth:Math.round(tr.width*100)/100,contentHeight:Math.round(tr.height*100)/100,lineCount:Math.max(1,Math.round(tr.height/lineHeight)),rectCount:childRects.length,renderFingerprint:[Math.round(tr.width),Math.round(tr.height),card.scrollWidth,card.scrollHeight,style.fontFamily,style.fontSize].join('|')};results.push(metrics);if(i%500===0)status.textContent='Midiendo '+i+'/'+auditRows.length+' a '+width+' px';}
if(!requestedEntity){const response=await fetch('/metrics',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({width,results})});if(!response.ok)throw new Error('No se pudieron guardar las métricas');}status.textContent=(requestedEntity?'Evidencia lista: ':'Completado: ')+results.length+' entidades a '+width+' px';document.body.dataset.complete='true';document.body.dataset.count=String(results.length);window.auditSummary={width,count:results.length,failures:results.filter(r=>r.overflow||r.clipped||r.hidden||r.rawJson||r.rawLatex||r.missingGlyph).length};}
run().catch(error=>{document.body.dataset.complete='error';document.getElementById('status').textContent=error.message;console.error(error)});
</script></body></html>`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  if (req.method === 'GET' && url.pathname === '/') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }); res.end(html); return; }
  if (req.method === 'GET' && url.pathname.startsWith('/contact-sheets/')) {
    const requested = path.resolve(runRoot, `.${url.pathname}`);
    const allowedRoot = path.resolve(runRoot, 'contact-sheets');
    if (!requested.startsWith(`${allowedRoot}${path.sep}`) || !fs.existsSync(requested)) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'content-type':'text/html; charset=utf-8', 'cache-control':'no-store' });
    fs.createReadStream(requested).pipe(res); return;
  }
  if (req.method === 'GET' && url.pathname === '/population') { res.writeHead(200, { 'content-type': 'application/x-ndjson; charset=utf-8', 'cache-control': 'no-store' }); fs.createReadStream(populationPath).pipe(res); return; }
  if (req.method === 'POST' && url.pathname === '/metrics') {
    let body=''; req.setEncoding('utf8'); req.on('data',(chunk)=>{body+=chunk}); req.on('end',()=>{try{const payload=JSON.parse(body);const file=path.join(runRoot,`geometry-${payload.width}.jsonl`);fs.writeFileSync(file,`${payload.results.map((row)=>JSON.stringify(row)).join('\n')}\n`,'utf8');res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({ok:true,count:payload.results.length}));}catch(error){res.writeHead(400);res.end(error.message)}}); return;
  }
  res.writeHead(404); res.end('Not found');
});
server.listen(port, '127.0.0.1', () => process.stdout.write(`FASE2D_SERVER_READY http://127.0.0.1:${port}/\n`));

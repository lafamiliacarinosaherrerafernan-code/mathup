// Local, isolated consumer of the public renderer. Never loads app.js or writes a bank.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const base=path.join(root,'artifacts/pau-andalucia-resolution');
const output=path.join(base,'audit/render-results.json');
const read=p=>fs.readFileSync(path.join(root,p),'utf8').trim().split(/\r?\n/).map(JSON.parse);
const completed=read('artifacts/pau-andalucia-resolution/completed-exercises.jsonl');
const canonical=new Map([...read('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl'),...read('artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl')].map(x=>[x.exerciseId,x]));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const files=new Map([
 ['/', ['tools/pau-resolution-render-check/index.html','text/html']],
 ['/check.js',['tools/pau-resolution-render-check/check.js','text/javascript']],
 ['/value-adapter.mjs',['tools/pau-resolution-render-check/value-adapter.mjs','text/javascript']],
 ['/math-renderer.js',['math-renderer.js','text/javascript']],
 ['/styles.css',['styles.css','text/css']],
 ['/math-notation.css',['math-notation.css','text/css']],
 ['/mathup-brand.css',['mathup-brand.css','text/css']],
]);
const environment={engine:sha(fs.readFileSync(path.join(root,'math-renderer.js'))),harness:Object.fromEntries([...files.values()].filter(([p])=>p.startsWith('tools/')).map(([p])=>[p,sha(fs.readFileSync(path.join(root,p)))])),canonicalSources:sha(JSON.stringify([...canonical.values()])),css:Object.fromEntries([...files.values()].filter(([,t])=>t==='text/css').map(([p])=>[p,sha(fs.readFileSync(path.join(root,p)))])),input:sha(fs.readFileSync(path.join(base,'completed-exercises.jsonl')))};
const data=completed.map(r=>{
 const c=canonical.get(r.exerciseId);
 const source=r.sourceLiteral||c?.officialPrompt||null;
 return {exerciseId:r.exerciseId,queueIndex:r.queueIndex,recordHash:r.recordHash,subject:r.subject,primaryTopic:r.primaryTopic,source,sourceBlocks:c?.learnerContent||null,sourceRepresentationAvailable:Boolean(source||c?.learnerContent),parts:r.parts};
});
const server=http.createServer((req,res)=>{
 const origin=`http://127.0.0.1:${server.address().port}`;
 if(req.headers.host!==`127.0.0.1:${server.address().port}`){res.writeHead(403);return res.end();}
 const u=new URL(req.url,origin);
 res.setHeader('Cache-Control','no-store');
 res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
 if(req.method==='GET'&&u.pathname==='/data.json'){res.setHeader('Content-Type','application/json');return res.end(JSON.stringify({environment,data}));}
 if(req.method==='POST'&&u.pathname==='/results'&&req.headers.origin===origin){
  let body='',size=0;req.on('data',chunk=>{size+=chunk.length;if(size>30_000_000){req.destroy();return;}body+=chunk;});
  req.on('end',()=>{try{
   const result=JSON.parse(body);
   if(result.environment.input!==environment.input||result.rows.length!==completed.length*4)throw Error('Incomplete render run');
   fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');
   res.setHeader('Content-Type','application/json');res.end(JSON.stringify({saved:true}));
   console.log(JSON.stringify({saved:'artifacts/pau-andalucia-resolution/audit/render-results.json',summary:result.summary}));
  }catch(e){res.writeHead(400);res.end(String(e.message));}});return;
 }
 const entry=files.get(u.pathname);
 if(req.method!=='GET'||!entry){res.writeHead(404);return res.end();}
 res.setHeader('Content-Type',entry[1]);res.end(fs.readFileSync(path.join(root,entry[0])));
});
server.listen(0,'127.0.0.1',()=>console.log(`Render check: http://127.0.0.1:${server.address().port}/ (local only; no human decisions)`));

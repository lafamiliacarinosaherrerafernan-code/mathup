// Loopback-only test of the actual application formatters and exam option component.
import http from 'node:http';
import fs from 'node:fs';
import {prepare,publicComponents,candidateRuntime,digest,output} from './prepare-andalucia-inference-delivery.mjs';
const prepared=prepare();
const runtime=candidateRuntime(prepared.records);
const byId=new Map(prepared.records.map(r=>[r.exerciseId,r]));
const assets=new Map([
 ['/', ['tools/andalucia-inference-delivery/index.html','text/html']],
 ['/frame',['tools/andalucia-inference-delivery/frame.html','text/html']],
 ['/frame.js',['tools/andalucia-inference-delivery/frame.js','text/javascript']],
 ['/check.js',['tools/andalucia-inference-delivery/check.js','text/javascript']],
 ...['math-renderer.js','styles.css','math-notation.css','mathup-brand.css'].map(p=>['/'+p,[p,p.endsWith('.js')?'text/javascript':'text/css']]),
]);
const environment={projectionHash:digest(JSON.stringify(prepared)),runtimeHash:digest(runtime),componentsHash:digest(publicComponents()),
 assets:Object.fromEntries([...assets.values(),['scripts/check-andalucia-inference-delivery.mjs']].map(([p])=>[p,digest(fs.readFileSync(p))])),
 caseRuntimeHashes:Object.fromEntries(prepared.records.map(r=>[r.exerciseId,digest(candidateRuntime([r]))]))};
const server=http.createServer((req,res)=>{
 const origin=`http://127.0.0.1:${server.address().port}`;
 if(req.headers.host!==origin.slice(7)){res.writeHead(403);return res.end();}
 const u=new URL(req.url,origin);res.setHeader('Cache-Control','no-store');
 res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
 if(req.method==='GET'&&u.pathname==='/data.json'){res.setHeader('Content-Type','application/json');return res.end(JSON.stringify({environment,records:prepared.records}));}
 if(req.method==='GET'&&u.pathname==='/runtime.js'){
  const r=byId.get(u.searchParams.get('id'));if(!r){res.writeHead(404);return res.end();}
  res.setHeader('Content-Type','text/javascript');return res.end(candidateRuntime([r]));
 }
 if(req.method==='GET'&&u.pathname==='/components.js'){res.setHeader('Content-Type','text/javascript');return res.end(publicComponents());}
 if(req.method==='GET'&&u.pathname==='/frame'){
  const id=u.searchParams.get('id');if(!byId.has(id)){res.writeHead(404);return res.end();}
  res.setHeader('Content-Type','text/html');return res.end(fs.readFileSync('tools/andalucia-inference-delivery/frame.html','utf8').replace('src="/runtime.js"',`src="/runtime.js?id=${encodeURIComponent(id)}"`));
 }
 if(req.method==='POST'&&u.pathname==='/results'&&req.headers.origin===origin){
  let body='';req.on('data',b=>{body+=b;if(body.length>50_000_000)req.destroy();});req.on('end',()=>{try{
   const r=JSON.parse(body);
   if(JSON.stringify(r.environment)!==JSON.stringify(environment)||r.rows.length!==prepared.records.length*4)throw Error('Incomplete or stale evidence');
   const expected=new Set(prepared.records.flatMap(x=>[320,375,768,1280].map(w=>`${x.exerciseId}:${w}`)));
   for(const row of r.rows)if(!expected.delete(`${row.exerciseId}:${row.width}`))throw Error('Duplicate or foreign measurement');
   if(expected.size)throw Error('Missing measurement');
   fs.mkdirSync(output,{recursive:true});fs.writeFileSync(`${output}/component-results.json`,JSON.stringify(r,null,2)+'\n');res.end('saved');
  }catch(e){res.writeHead(400);res.end(e.message);}});return;
 }
 const a=assets.get(u.pathname);if(req.method!=='GET'||!a){res.writeHead(404);return res.end();}
 res.setHeader('Content-Type',a[1]);res.end(fs.readFileSync(a[0]));
});
server.listen(0,'127.0.0.1',()=>console.log(`Application component check: http://127.0.0.1:${server.address().port}/ ; ${prepared.records.length} exercises; no decisions or student data.`));

const {environment,records}=await(await fetch('/data.json')).json();
const frame=document.querySelector('#frame'),progress=document.querySelector('#progress'),selector=document.querySelector('#case');
for(const r of records){const o=document.createElement('option');o.value=r.exerciseId;o.textContent=`Cola ${r.queueIndex} · ${r.year} · ${r.subject==='2_bach_mates_ii'?'Matemáticas II':'CCSS II'}`;selector.append(o);}
let running=false,pending=null;
addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==frame.contentWindow||e.data?.type!=='delivery-measurement')return;pending?.(e.data.result);pending=null;});
function showOnce(id,width,attempt){frame.width=width;frame.height=800;return new Promise((resolve,reject)=>{const timeout=setTimeout(()=>{pending=null;reject(Error(`Frame measurement timeout: ${id} at ${width}px (attempt ${attempt})`));},60000);pending=r=>{clearTimeout(timeout);resolve(r);};frame.src=`/frame?id=${encodeURIComponent(id)}&width=${width}&attempt=${attempt}`;});}
async function show(id,width){let firstError;for(const attempt of[1,2]){try{return await showOnce(id,width,attempt);}catch(error){firstError??=error;}}throw Error(`${firstError.message}; deterministic retry also failed`);}
document.querySelector('#show').onclick=async()=>{if(running)return;const r=await show(selector.value,Number(document.querySelector('#width').value));document.querySelector('#summary').textContent=JSON.stringify({exerciseId:r.exerciseId,width:r.width,issues:r.issues,layoutMeasurements:r.layoutMeasurements},null,2);};
document.querySelector('#run').onclick=async()=>{
 if(running)return;running=true;const rows=[];progress.textContent='Comprobando';
 try{for(const r of records)for(const w of[320,375,768,1280]){rows.push(await show(r.exerciseId,w));progress.textContent=`${rows.length}/${records.length*4}`;}
 const summary={exercises:records.length,executions:rows.length,withIssues:rows.filter(r=>r.issues.length).length,parts:rows.reduce((n,r)=>n+r.parts,0),humanApprovals:0};
 const response=await fetch('/results',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({environment,summary,rows})});if(!response.ok)throw Error(await response.text());
 document.querySelector('#summary').textContent=JSON.stringify(summary,null,2);progress.textContent='Finalizado y guardado';
 }catch(e){progress.textContent=e.message;}finally{running=false;}
};
progress.textContent=`${records.length} ejercicios disponibles para pruebas`;
await show(records[0].exerciseId,1280);

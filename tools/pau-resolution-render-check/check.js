const {environment,data}=await(await fetch('/data.json')).json();
const stage=document.querySelector('#stage'),progress=document.querySelector('#progress');
const renderer=window.MargaritaMathRenderer;
const patterns=[['RAW_PIECEWISE',/\bpiecewise\s*\{/i],['RAW_TEX',/\\(?:[a-zA-Z]+|[()[\]])/],['RAW_OBJECT',/\[object Object\]/],['UNDEFINED_OR_NULL',/\b(?:undefined|null)\b/],['RAW_MATRIX_LIST',/\[\[/],['RAW_POWER_OR_SUBSCRIPT',/[\^_][{(\w]/],['LINEAR_FRACTION_CANDIDATE',/\b\d+\s*\/\s*\d+\b/],['EDITORIAL_SCORE',/\(\s*\d+(?:[,.]\d+)?\s*puntos?\s*\)/i]];
function render(row,width){
 const card=document.createElement('article');card.className='audit-card';card.style.width=`${width}px`;
 const fields=[];
 function field(id,value){const el=document.createElement('div');el.className='audit-field';el.dataset.field=id;
  try{el.innerHTML=renderCandidateValue(renderer,value??'');}catch{el.textContent='Representación estructurada pendiente';el.dataset.adapterIssue='STRUCTURED_VALUE_ADAPTER_REQUIRED';}fields.push(el);card.append(el);return el;}
 if(row.sourceBlocks){
  for(const [i,block]of row.sourceBlocks.entries()){
   if(block.type==='text')field(`official-source.${i}`,separateEditorialScores(block.text).learnerText);
   else if(block.type==='math-equation3'){
    const el=field(`official-source.${i}`,'');
    const parsed=new DOMParser().parseFromString(block.derived?.mathml||'','application/xml');
    const math=parsed.documentElement;
    const tags=new Set(['math','mrow','mi','mn','mo','mtext','mspace','mfrac','msqrt','mroot','msup','msub','msubsup','mover','munder','munderover','mtable','mtr','mtd','mstyle','mpadded','mphantom','menclose']);
    const valid=math.localName==='math'&&math.namespaceURI==='http://www.w3.org/1998/Math/MathML'&&[math,...math.querySelectorAll('*')].every(n=>tags.has(n.localName)&&[...n.attributes].every(a=>!/^on|href|src|style$/i.test(a.name)));
    if(valid){
     const ranges=nativeRelationRanges(block.mathAst),body=math.firstElementChild;
     if(ranges&&math.children.length===1&&body?.localName==='mrow'&&body.children.length===block.mathAst.body.children.length){
      const children=[...body.children];el.replaceChildren();el.style.display='flex';el.style.flexWrap='wrap';el.style.alignItems='center';
      for(const [start,end]of ranges){const fragment=document.importNode(math,true);fragment.setAttribute('display','inline');fragment.firstElementChild.replaceChildren(...children.slice(start,end).map(n=>document.importNode(n,true)));el.append(fragment);}
      el.dataset.representationProjection='NATIVE_RELATION_CLAUSES_WRAPPED_AT_EXPLICIT_SEPARATORS';
     }else el.replaceChildren(document.importNode(math,true));
    }else{el.textContent='MathML requiere revisión';el.dataset.adapterIssue='MATHML_ADAPTER_REVIEW_REQUIRED';}
   }else{const el=field(`official-source.${i}`,'Estructura documental requiere adaptador específico');el.dataset.adapterIssue='DOCUMENT_LAYOUT_ADAPTER_REQUIRED';}
  }
 }else field('official-source',separateEditorialScores(row.source||'Fuente no disponible en el arnés').learnerText);
 for(const p of row.parts){
  field(`${p.partId}.prompt`,separateEditorialScores(p.prompt).learnerText);
  for(const [i,c]of[p.answer,...p.distractors].entries())field(`${p.partId}.choice.${i}`,c);
  for(const [i,s]of p.solutionSteps.entries()){
   field(`${p.partId}.step.${i}.explanation`,s.explanation);
   field(`${p.partId}.step.${i}.math`,s.math);
  }
  field(`${p.partId}.final`,p.finalAnswer);
 }
 stage.replaceChildren(card);return {card,fields};
}
function measure(row,width){
 const {card,fields}=render(row,width),issues=[];
 if(!row.sourceRepresentationAvailable)issues.push({code:'STRUCTURED_SOURCE_ADAPTER_REQUIRED',field:'official-source'});
 for(const el of fields){
  if(el.dataset.adapterIssue)issues.push({code:el.dataset.adapterIssue,field:el.dataset.field});
  const text=el.innerText;
  for(const [code,re]of patterns)if(re.test(text))issues.push({code,field:el.dataset.field,snippet:text.slice(0,220)});
  if(el.scrollWidth>el.clientWidth+1){
   const style=getComputedStyle(el),controlled=['auto','scroll'].includes(style.overflowX);
   issues.push({code:controlled?'CONTROLLED_HORIZONTAL_SCROLL':'HORIZONTAL_OVERFLOW',field:el.dataset.field,clientWidth:el.clientWidth,scrollWidth:el.scrollWidth});
  }
 }
 return {exerciseId:row.exerciseId,queueIndex:row.queueIndex,recordHash:row.recordHash,width,fieldCount:fields.length,height:Math.round(card.getBoundingClientRect().height*100)/100,issues};
}
let running=false;
document.querySelector('#show').onclick=()=>{if(running)return;const r=data.find(x=>x.queueIndex===Number(document.querySelector('#index').value));if(r)render(r,Number(document.querySelector('#width').value));};
document.querySelector('#run').onclick=async()=>{
 if(running)return;running=true;document.querySelector('#run').disabled=true;
 await document.fonts.ready;const rows=[];
 for(const [i,row]of data.entries()){
  for(const w of[320,375,768,1280])rows.push(measure(row,w));
  progress.textContent=`${i+1}/${data.length} ejercicios; ${(i+1)*4} ejecuciones`;
  if(i%4===0)await new Promise(r=>setTimeout(r,0));
 }
 const issueCounts={};for(const r of rows)for(const i of r.issues)issueCounts[i.code]=(issueCounts[i.code]||0)+1;
 const summary={exercises:data.length,executions:rows.length,fields:rows.reduce((n,r)=>n+r.fieldCount,0),executionsWithSignals:rows.filter(x=>x.issues.length).length,exercisesWithSignals:new Set(rows.filter(x=>x.issues.length).map(x=>x.exerciseId)).size,issueCounts,certifiedForPublication:0,projection:'EDITORIAL_SCORE_SEPARATION_AND_TYPED_MATRIX_VALUES; EXISTING_VALIDATED_MATHML_FOR_EQUATION3',limitations:['Signal detection, not mathematical or human certification.','Uses the unchanged production math renderer and styles plus an isolated input adapter, not the full application layout.','No certification of overlap, hidden glyphs or mathematical semantics from these metrics.','Linear fraction patterns are review signals and may include ordinary non-mathematical slashes.','Official source literals remain immutable; score removal is a reversible presentation projection.']};
 document.querySelector('#summary').textContent=JSON.stringify(summary,null,2);
 const saved=await fetch('/results',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({schemaVersion:'mathup.resolution-render-check.v1',environment:{...environment,userAgent:navigator.userAgent,fonts:document.fonts.status},summary,rows})});
 progress.textContent=saved.ok?'Finalizado y guardado':'Finalizado; fallo al guardar';running=false;document.querySelector('#run').disabled=false;
};
progress.textContent=`${data.length} ejercicios cargados. Sin decisiones humanas.`;
document.querySelector('#run').textContent=`Ejecutar ${data.length} × 4`;
render(data[0],320);
import {renderCandidateValue,separateEditorialScores,nativeRelationRanges} from './value-adapter.mjs';

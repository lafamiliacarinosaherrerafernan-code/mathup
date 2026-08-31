const id=new URL(location.href).searchParams.get('id');
const runtime=window.ANDALUCIA_PAU_RUNTIME;
const matches=[...runtime.examSlotRecords('2bach-ccss',1),...runtime.examSlotRecords('2bach-ccss',2),...runtime.examSlotRecords('2bach-ccss',3),...runtime.examSlotRecords('2bach-ccss',4),...[1,2,3,4,5].flatMap(slot=>runtime.examSlotRecords('2bach-mates',slot))].filter(r=>r.exerciseId===id);
if(matches.length!==1)throw Error('Exercise must occur in exactly one subject-specific exam pool');
const record=matches[0];
const q={...record,selections:record.parts.map(()=>null),graded:false};
const parts=q.parts.map(p=>runtime.materializePart(p,`component-check:${id}`));
const stage=document.querySelector('#stage');
// These class names and component calls are the ones used in renderBachExam.
function render(solutions){
 q.graded=solutions;
 stage.innerHTML=`<section class="student-dashboard bach-exam-screen"><section class="screen-panel bach-exam-panel"><article class="exam-question-card${q.community === 'andalucia' ? ' andalucia-exam-delivery' : ''}">
 <div class="official-source">${escapeHtml(q.source)}</div><div class="question-text official-exercise-statement">${q.statementHtml?formatMathHtml(q.statementHtml,{preserveTrigNotation:true}):formatMathText(q.text,{preserveTrigNotation:true})}</div>
 <div class="exam-parts">${parts.map((p,i)=>`<section class="exam-part"><div class="exam-part-prompt">${p.html?.trim()?formatMathHtml(p.html,{preserveTrigNotation:true}):formatMathText(p.text,{preserveTrigNotation:true})}</div><div class="answers exam-part-options">${renderExamOptions(q,p,i)}</div>${solutions?`<div class="solution-help exam-solution">${formatSolutionText(didacticSolutionText({solution:p.solution}),p.solutionMathOptions)}</div>`:''}</section>`).join('')}</div>
 </article></section></section>`;
}
await document.fonts.ready;
render(false);const preAnswer={solutions:document.querySelectorAll('.exam-solution').length,revealed:document.querySelectorAll('.answer-btn.correct').length};
render(true);
await Promise.all([...document.images].map(image=>image.decode().catch(()=>{})));
await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
const issues=[];
// A child can fit its own oversized grid while the whole grid is clipped by
// the viewport. Field scrollWidth alone is therefore not a sufficient gate.
const viewportWidth=document.documentElement.clientWidth;
const layoutMeasurements=[...document.querySelectorAll('#stage,.student-dashboard,.screen-panel,.exam-question-card,.exam-part,.answer-content,.exam-solution')].map(e=>{
 const b=e.getBoundingClientRect(),s=getComputedStyle(e);
 return {selector:e.id?`#${e.id}`:e.className,left:b.left,right:b.right,width:b.width,client:e.clientWidth,scroll:e.scrollWidth,overflowX:s.overflowX,minWidth:s.minWidth};
});
for(const b of layoutMeasurements)if(b.left < -1 || b.right > viewportWidth+1)issues.push({code:'VIEWPORT_CLIPPING',selector:b.selector,left:b.left,right:b.right,viewport:viewportWidth});
for(const image of document.querySelectorAll('.derived-solution-graph > img')){
 const box=image.getBoundingClientRect();
 if(!image.complete||!image.naturalWidth||!box.width||!box.height)issues.push({code:'MISSING_SOLUTION_GRAPH'});
}
const fields=[...document.querySelectorAll('.official-exercise-statement,.exam-part-prompt,.answer-content,.exam-solution')];
for(const [i,e]of fields.entries()){
 const text=e.innerText;
 if(/\\(?:[a-zA-Z]+|[()[\]])|frac\s*\{|\[object Object\]|\b(?:undefined|null)\b/.test(text))issues.push({code:'RAW_CONTENT',field:i,snippet:text.slice(0,200)});
 if(/\btgto\b|\bsen\s+embargo\b|\bsen\s+necesidad\b|\bsengulares\b/i.test(text))issues.push({code:'PROSE_CHANGED_AS_TRIGONOMETRY',field:i});
 // Inspect literal text nodes, not concatenated innerText: prose ending in
 // «sistema» followed by a correctly composed brace is not a raw command.
 const walker=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let node,rawStructured=false;
 while((node=walker.nextNode()))if(/\b(?:system|sistema|frac|vec|piecewise)\s*\{/i.test(node.nodeValue))rawStructured=true;
 if(rawStructured)issues.push({code:'RAW_STRUCTURED_MATH_VISIBLE',field:i});
 if(/<\s*\/?\s*span\b|class\s*=\s*["']?math-|&lt;\s*\/?\s*span\b/i.test(text))issues.push({code:'RAW_HTML_VISIBLE',field:i,snippet:text.slice(0,200)});
 if(/\(\s*\d+(?:[.,]\d+)?\s*puntos?\s*\)/i.test(text))issues.push({code:'EDITORIAL_SCORE',field:i});
 if(e.scrollWidth>e.clientWidth+1)issues.push({code:'HORIZONTAL_OVERFLOW',field:i,client:e.clientWidth,scroll:e.scrollWidth});
 for(const n of e.querySelectorAll('.math-frac,.math-sqrt,.math-sup,.math-sub')){const b=n.getBoundingClientRect();if(!b.width||!b.height)issues.push({code:'HIDDEN_MATH',field:i});}
}
if(preAnswer.solutions||preAnswer.revealed)issues.push({code:'ANSWER_LEAK'});
if(document.querySelectorAll('.exam-part-prompt').length!==parts.length||parts.some(p=>!String(p.html||p.text||'').trim()))issues.push({code:'MISSING_PART_PROMPT'});
const fractions=[...document.querySelectorAll('.math-frac')];
const result={exerciseId:id,width:innerWidth,parts:parts.length,source:q.provenance,fields:fields.length,preAnswer,issues,fractions:fractions.length,
 visibleText:fields.map(e=>e.innerText),height:document.documentElement.scrollHeight,
 layoutMeasurements,viewportWidth,fonts:[...new Set(fields.map(e=>getComputedStyle(e).fontFamily))],scope:'REAL_FORMATTERS_AND_EXAM_COMPONENTS_NOT_AUTHENTICATION_OR_STUDENT_HISTORY',humanApproval:false};
parent.postMessage({type:'delivery-measurement',result},location.origin);

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  applyDecision, createEmptyState, environmentDigest, invalidateChangedEnvironment,
  progressFor, readJson, readJsonl, recomputePropagation, rollbackLastDecision, stableStringify, writeJson,
} from '../../catalog/human-visual-review/fase2d-human-review.mjs';
import { materializeSessionExercise } from '../../catalog/v2/materialize-session-exercise.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const publicRoot = path.join(root, 'tools/fase2d-human-review/public');
const artifactRoot = path.join(root, 'artifacts/fase2d-human-review');
const stateRoot = path.join(artifactRoot, 'local-state');
const stateFile = path.join(stateRoot, 'review-state.json');
const fase2bRun = path.join(root, 'artifacts/fase2b/runs/run-a');
const port = Number(process.argv.find((arg) => arg.startsWith('--port='))?.split('=')[1] ?? 8824);

const manifest = readJson(path.join(artifactRoot, 'review-manifest.json'));
const queue = readJsonl(path.join(artifactRoot, 'review-queue.jsonl'));
const environment = readJson(path.join(artifactRoot, 'environment-lock.json'));
const queueById = new Map(queue.map((row) => [row.visualEntityId, row]));
const pilotsRoot = path.join(artifactRoot, 'pilots');
const pilotFiles = fs.existsSync(pilotsRoot) ? fs.readdirSync(pilotsRoot).filter((name) => name.endsWith('.json')).map((name) => readJson(path.join(pilotsRoot, name))) : [];
const pilots = new Map(pilotFiles.filter((pilot) => pilot.schemaVersion === 'mathup.fase2d.human-review-pilot.v1').map((pilot) => [pilot.pilotId, {
  ...pilot, entityIds: new Set(pilot.cases.map((item) => item.visualEntityId)),
}]));
const exercisePilots = new Map(pilotFiles.filter((pilot) => pilot.schemaVersion === 'mathup.fase2d.human-review-exercise-pilot.v1').map((pilot) => [pilot.pilotId, {
  ...pilot, bySelectedEntityId: new Map(pilot.cases.map((item) => [item.selectedVisualEntityId, item])),
}]));
const exerciseById = new Map(readJsonl(path.join(fase2bRun, 'exercise-v2.jsonl')).map((item) => [item.identity.exerciseId, item]));
const answerById = new Map(readJsonl(path.join(fase2bRun, 'answer-records.jsonl')).map((item) => [item.answerId, item]));
const solutionById = new Map(readJsonl(path.join(fase2bRun, 'solution-records.jsonl')).map((item) => [item.solutionId, item]));
const distractorById = new Map(readJsonl(path.join(fase2bRun, 'distractor-sets.jsonl')).map((item) => [item.distractorSetId, item]));
const templatesByExercise = new Map();
for (const template of readJsonl(path.join(fase2bRun, 'delivery-templates.jsonl'))) {
  if (!templatesByExercise.has(template.exerciseId)) templatesByExercise.set(template.exerciseId, []);
  templatesByExercise.get(template.exerciseId).push(template);
}
for (const templates of templatesByExercise.values()) templates.sort((left, right) => left.modality.localeCompare(right.modality) || left.templateId.localeCompare(right.templateId));
let state = fs.existsSync(stateFile) ? readJson(stateFile) : createEmptyState(manifest);
const environmentWasInvalidated = invalidateChangedEnvironment(state, environmentDigest(Object.fromEntries(Object.entries(environment).filter(([key]) => key !== 'environmentDigest'))));
recomputePropagation(state);

function saveState() {
  writeJson(stateFile, state);
}
if (environmentWasInvalidated) saveState();

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(`${stableStringify(body)}\n`);
}

function text(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(body);
}

function escaped(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function jsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => { body += chunk; if (body.length > 1_000_000) reject(new Error('Cuerpo demasiado grande.')); });
    req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch (error) { reject(error); } });
    req.on('error', reject);
  });
}

function filtersFor(rows) {
  const values = (selector) => [...new Set(rows.flatMap(selector).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), 'es'));
  return {
    courseId: values((row) => [row.entity.courseId]), subjectId: values((row) => [row.entity.subjectId]),
    entityType: values((row) => [row.entity.entityType]), priority: values((row) => [row.entity.priority]),
    families: values((row) => row.entity.families), community: values((row) => [row.entity.community]),
  };
}

function statusFor(id) {
  return state.current[id]?.decision ?? state.propagation[id]?.status ?? 'PENDING_HUMAN_REVIEW';
}

function matches(row, params) {
  const pilotId = params.get('pilot');
  if (pilotId && (!pilots.has(pilotId) || !pilots.get(pilotId).entityIds.has(row.visualEntityId))) return false;
  for (const key of ['courseId', 'subjectId', 'entityType', 'priority', 'community']) {
    if (params.get(key) && row.entity[key] !== params.get(key)) return false;
  }
  if (params.get('family') && !row.entity.families.includes(params.get('family'))) return false;
  if (params.get('status') && statusFor(row.visualEntityId) !== params.get('status')) return false;
  const search = params.get('search')?.trim().toLocaleLowerCase('es');
  if (search && !stableStringify(row).toLocaleLowerCase('es').includes(search)) return false;
  return true;
}

function pilotPosition(id, pilotId) {
  if (!pilotId || !pilots.has(pilotId)) return null;
  const index = pilots.get(pilotId).cases.findIndex((item) => item.visualEntityId === id);
  return index < 0 ? null : index + 1;
}

function exerciseCardFor(reviewCase, pilotId) {
  const pilotCase = exercisePilots.get(pilotId)?.bySelectedEntityId.get(reviewCase.visualEntityId);
  if (!pilotCase) return null;
  const exercise = exerciseById.get(pilotCase.exerciseId);
  if (!exercise) throw new Error(`No existe el ejercicio v2 ${pilotCase.exerciseId}.`);
  const answer = (exercise.links.answerRefs ?? []).map((id) => answerById.get(id)).find(Boolean) ?? null;
  const solution = (exercise.links.solutionRefs ?? []).map((id) => solutionById.get(id)).find(Boolean) ?? null;
  const templates = templatesByExercise.get(pilotCase.exerciseId) ?? [];
  const multipleChoice = templates.find((item) => item.interactionKind === 'multiple-choice' && item.eligibility?.eligible);
  const openResponse = templates.find((item) => item.interactionKind === 'open-response' && item.eligibility?.eligible);
  let delivery;
  if (multipleChoice) {
    const linkedAnswer = answerById.get(multipleChoice.answerRef);
    const distractors = distractorById.get(multipleChoice.distractorSetRef);
    if (!linkedAnswer || !distractors) {
      delivery = { interactionKind: 'multiple-choice', status: 'OPTIONS_PENDING', reason: 'Faltan una respuesta o distractores existentes vinculados de forma válida.' };
    } else {
      try {
        const session = materializeSessionExercise(multipleChoice, linkedAnswer, distractors, {
          attemptId: `fase2d-human-review:${pilotId}:${pilotCase.exerciseId}`,
          exerciseRevisionId: exercise.identity.revisionId,
        });
        delivery = {
          interactionKind: 'multiple-choice',
          status: 'OPTIONS_AVAILABLE',
          modality: multipleChoice.modality,
          sessionExerciseId: session.sessionExerciseId,
          seedHash: session.seedHash,
          algorithmVersion: session.algorithmVersion,
          correctOptionTrackedInternally: true,
          options: session.options.map(({ position, value, optionInstanceId }) => ({ position, value, optionInstanceId })),
        };
      } catch (error) {
        delivery = { interactionKind: 'multiple-choice', status: 'OPTIONS_PENDING', reason: error.message };
      }
    }
  } else if (openResponse) {
    delivery = { interactionKind: 'open-response', status: 'OPEN_RESPONSE', modality: openResponse.modality };
  } else {
    delivery = { interactionKind: null, status: 'DELIVERY_PENDING', reason: 'No existe una plantilla de entrega elegible.' };
  }
  return {
    schemaVersion: 'mathup.fase2d.human-review-exercise-card.v1',
    exerciseId: pilotCase.exerciseId,
    exerciseRevisionId: exercise.identity.revisionId,
    pilotIndex: pilotCase.pilotIndex,
    selectedVisualEntityId: pilotCase.selectedVisualEntityId,
    availableEntityTypes: pilotCase.availableEntityTypes,
    visualEntityIds: pilotCase.visualEntityIds,
    classification: exercise.classification,
    provenance: exercise.provenance,
    statement: {
      available: Boolean(exercise.content.statement?.blocks?.length),
      blocks: (exercise.content.statement?.blocks ?? []).map((block) => ({
        blockId: block.blockId,
        type: block.type,
        literal: block.value ?? block.sourceLiteral ?? '',
      })),
      plainText: exercise.content.statement?.plainText ?? '',
    },
    answer: answer ? {
      available: true,
      answerId: answer.answerId,
      revisionId: answer.revisionId,
      kind: answer.kind,
      value: answer.canonicalValue,
      evidenceStatus: answer.evidenceStatus,
    } : { available: false },
    solution: solution ? {
      available: true,
      solutionId: solution.solutionId,
      revisionId: solution.revisionId,
      parts: (solution.parts ?? []).map((part) => ({ part: part.part, text: part.text, finalAnswer: part.finalAnswer })),
    } : { available: false },
    delivery,
    hashes: {
      exerciseContentHash: exercise.identity.contentHash,
      selectedLiteralHash: reviewCase.entity.literalHash,
      selectedRenderSignature: reviewCase.entity.renderSignature,
    },
  };
}

function renderPage(reviewCase, width) {
  const entity = reviewCase.entity;
  const payload = jsonForHtml({ entityType: entity.entityType, literal: entity.literal });
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=${width},initial-scale=1">
<link rel="stylesheet" href="/runtime/styles.css"><link rel="stylesheet" href="/runtime/math-notation.css">
<style>
*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#eef5ff;color:#111827}body{padding:clamp(10px,2.2vw,24px);font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
.student-preview-shell{width:100%;max-width:1120px;margin:0 auto}.student-preview-label{margin:0 0 10px;color:#54709b;font-size:12px;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.student-card{padding:clamp(12px,2.5vw,28px);border:1px solid rgba(21,95,189,.13);border-radius:20px;background:rgba(255,255,255,.98);box-shadow:0 16px 42px rgba(20,43,88,.12)}.student-card .question-text{margin:0}
.student-answer-title,.student-solution-heading{margin:0 0 12px;color:#0b3474;font-size:clamp(1.05rem,2vw,1.35rem);font-weight:950}.student-answer .answer-btn{width:100%;pointer-events:none}.student-answer .answer-btn:hover{color:inherit;background:linear-gradient(180deg,#fff,#f4f8ff)}
.student-solution .solution-help{display:block;margin:0;padding:clamp(14px,2.4vw,24px);background:linear-gradient(135deg,rgba(255,255,255,.98),rgba(237,245,255,.98));border:1px solid rgba(21,95,189,.14);box-shadow:var(--shadow-tight)}.student-solution .solution-help-body{margin-top:0}
.solution-block+.solution-block{margin-top:24px;padding-top:22px;border-top:1px solid rgba(21,95,189,.18)}.solution-block-title{margin:0 0 12px;color:#0b3474;font-size:1.08em;font-weight:950}.solution-step{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;margin:12px 0;align-items:start}.solution-step-label{padding:3px 8px;border-radius:999px;background:#dceaff;color:#0b3474;font-size:.78em;font-weight:950;white-space:nowrap}.solution-step-content{min-width:0}.solution-final{margin-top:15px;padding:12px 14px;border-left:4px solid #078865;border-radius:10px;background:#ecfbf5}.solution-final-title{display:block;margin-bottom:5px;color:#087156;font-size:.85em;font-weight:950;text-transform:uppercase;letter-spacing:.04em}.source-intro{margin:0 0 12px}.render-error{padding:14px;border:2px solid #b42318;border-radius:10px;color:#8f1d14;background:#fff2f0;font-weight:800}
@media(max-width:420px){body{padding:8px}.student-card{padding:10px;border-radius:14px}.student-solution .solution-help{padding:12px}.solution-step{grid-template-columns:1fr;gap:4px}}
</style></head><body><main class="student-preview-shell"><p class="student-preview-label">Así lo verá el alumno</p><article id="student-card" class="student-card" aria-live="polite"></article></main>
<script id="entity-payload" type="application/json">${payload}</script><script src="/runtime/math-renderer.js"></script>
<script>
(() => {
 const data=JSON.parse(document.getElementById('entity-payload').textContent),card=document.getElementById('student-card'),renderer=window.MargaritaMathRenderer;
 const renderText=(value)=>renderer.text(String(value??''),{preserveTrigNotation:true});
 const splitSolutions=(literal)=>{const normalized=String(literal??'').replace(/\\r\\n?/g,'\\n').trim();const starts=[...normalized.matchAll(/(?:^|\\n|\\s)(Resolución|Planteamiento|Desarrollo paso a paso|Desarrollo):\\s*/gi)];if(!starts.length)return[{title:'Resolución',body:normalized,prefix:''}];const blocks=[],prefix=normalized.slice(0,starts[0].index).trim();for(let index=0;index<starts.length;index+=1){const start=starts[index],bodyStart=start.index+start[0].length,bodyEnd=starts[index+1]?.index??normalized.length;blocks.push({title:start[1],body:normalized.slice(bodyStart,bodyEnd).trim(),prefix:index===0?prefix:''});}return blocks;};
 const renderSolutionBlock=(block)=>{let body=block.body,final='';const finalMatch=body.match(/(?:^|\\n|\\s)Resultado final:\\s*/i);if(finalMatch){const at=finalMatch.index;final=body.slice(at+finalMatch[0].length).trim();body=body.slice(0,at).trim();}const markers=[...body.matchAll(/(?:^|\\n|\\s)(\\d+)\.\\s+/g)];let intro=body;const steps=[];if(markers.length){intro=body.slice(0,markers[0].index).trim();for(let index=0;index<markers.length;index+=1){const marker=markers[index],contentStart=marker.index+marker[0].length,contentEnd=markers[index+1]?.index??body.length;steps.push({number:marker[1],content:body.slice(contentStart,contentEnd).trim()});}}return '<section class="solution-block">'+(block.prefix?'<div class="source-intro">'+renderText(block.prefix)+'</div>':'')+'<h3 class="solution-block-title">'+block.title+'</h3>'+(intro?'<div class="source-intro">'+renderText(intro)+'</div>':'')+steps.map((step)=>'<div class="solution-step"><span class="solution-step-label">Paso '+step.number+'</span><div class="solution-step-content">'+renderText(step.content)+'</div></div>').join('')+(!steps.length&&body?'<div class="solution-step-content">'+renderText(body)+'</div>':'')+(final?'<div class="solution-final"><span class="solution-final-title">Resultado final</span>'+renderText(final)+'</div>':'')+'</section>';};
 try{if(!renderer||typeof renderer.text!=='function')throw new Error('El motor matemático de +MathUp no está disponible.');if(data.entityType==='solution'){card.classList.add('student-solution');card.innerHTML='<h2 class="student-solution-heading">Resolución</h2><section class="solution-help"><div class="solution-help-body">'+splitSolutions(data.literal).map(renderSolutionBlock).join('')+'</div></section>';}else if(data.entityType==='answer'){card.classList.add('student-answer');card.innerHTML='<h2 class="student-answer-title">Respuesta</h2><div class="answers"><button class="answer-btn correct" type="button" tabindex="-1"><span class="answer-content">'+renderText(data.literal)+'</span></button></div>';}else{card.classList.add('student-statement');card.innerHTML='<section class="question-box"><div class="question-text pau-open-statement">'+renderText(data.literal)+'</div></section>';}document.documentElement.dataset.studentRenderReady='true';}catch(error){card.innerHTML='<div class="render-error">No se pudo componer esta entidad con el motor real de +MathUp: '+String(error.message)+'</div>';document.documentElement.dataset.studentRenderReady='false';}
})();
<\/script></body></html>`;
}

function renderExercisePage(reviewCase, exerciseCard, width) {
  const payload = jsonForHtml(exerciseCard);
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=${width},initial-scale=1">
<link rel="stylesheet" href="/runtime/styles.css"><link rel="stylesheet" href="/runtime/math-notation.css">
<style>
*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#eef5ff;color:#111827}body{padding:clamp(8px,2vw,22px);font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
.student-preview-shell{width:100%;max-width:1120px;margin:0 auto}.student-preview-label{margin:0 0 9px;color:#54709b;font-size:11px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
.student-card{padding:clamp(12px,2.4vw,28px);border:1px solid rgba(21,95,189,.13);border-radius:20px;background:rgba(255,255,255,.98);box-shadow:0 16px 42px rgba(20,43,88,.12)}
.student-card-title{margin:0 0 16px;color:#0b3474;font-size:clamp(1.15rem,2vw,1.5rem);font-weight:950}.statement-block+.statement-block{margin-top:14px;padding-top:14px;border-top:1px solid rgba(21,95,189,.13)}
.delivery-section{margin-top:20px}.delivery-title{margin:0 0 10px;color:#0b3474;font-size:1rem;font-weight:950}.student-card .answers{display:grid;gap:9px}.student-card .answer-btn{width:100%;display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:center;text-align:left;pointer-events:none}.student-card .answer-btn:hover{color:inherit;background:linear-gradient(180deg,#fff,#f4f8ff)}.option-letter{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#dceaff;color:#0b3474;font-weight:950}.pending-box,.open-response-box{padding:12px 14px;border-radius:10px;font-weight:850}.pending-box{border:1px solid #e5bd54;background:#fff7dd;color:#6f4d00}.open-response-box{border:1px solid #9bbce8;background:#eef5ff;color:#174f9c}
.solution-disclosure{margin-top:20px;border:1px solid rgba(21,95,189,.16);border-radius:14px;background:linear-gradient(135deg,#fff,#edf5ff);overflow:hidden}.solution-disclosure>summary{cursor:pointer;padding:13px 16px;color:#0b3474;font-weight:950;list-style:none}.solution-disclosure>summary::-webkit-details-marker{display:none}.solution-disclosure>summary::after{content:'+';float:right;font-size:1.25em}.solution-disclosure[open]>summary::after{content:'−'}.solution-content{padding:0 16px 16px}.solution-part+.solution-part{margin-top:22px;padding-top:20px;border-top:1px solid rgba(21,95,189,.18)}.solution-part-title{margin:0 0 11px;color:#0b3474;font-size:1.04rem;font-weight:950}.solution-step{display:grid;grid-template-columns:auto minmax(0,1fr);gap:9px;margin:11px 0;align-items:start}.solution-step-label{padding:3px 8px;border-radius:999px;background:#dceaff;color:#0b3474;font-size:.76em;font-weight:950;white-space:nowrap}.solution-step-content{min-width:0}.solution-final,.expected-answer{margin-top:13px;padding:11px 13px;border-left:4px solid #078865;border-radius:9px;background:#ecfbf5}.solution-final-title,.expected-answer h3{display:block;margin:0 0 5px;color:#087156;font-size:.82em;font-weight:950;text-transform:uppercase;letter-spacing:.04em}.answer-part+.answer-part{margin-top:7px}.answer-part-label{font-weight:900;color:#0b3474}.render-error{padding:14px;border:2px solid #b42318;border-radius:10px;color:#8f1d14;background:#fff2f0;font-weight:800}
@media(max-width:420px){body{padding:7px}.student-card{padding:10px;border-radius:14px}.student-card .answer-btn{grid-template-columns:auto minmax(0,1fr);padding:9px}.solution-content{padding:0 11px 12px}.solution-step{grid-template-columns:1fr;gap:4px}}
</style></head><body><main class="student-preview-shell"><p class="student-preview-label">Así lo verá el alumno · ejercicio completo</p><article id="student-card" class="student-card" aria-live="polite"></article></main>
<script id="exercise-payload" type="application/json">${payload}</script><script src="/runtime/math-renderer.js"></script>
<script>
(() => {
 const data=JSON.parse(document.getElementById('exercise-payload').textContent),card=document.getElementById('student-card'),renderer=window.MargaritaMathRenderer;
 const renderText=(value)=>renderer.text(String(value??''),{preserveTrigNotation:true});
 const visibleSource=(value)=>{const text=String(value??'').trim();if(!text.startsWith('{'))return text;try{const parsed=JSON.parse(text);return parsed.explanation??parsed.work?.plainText??text;}catch{return text;}};
 const answerHtml=(value)=>{if(value===null||value===undefined)return'';if(typeof value==='string'||typeof value==='number')return renderText(value);if(Array.isArray(value))return value.map((item)=>'<div class="answer-part">'+answerHtml(item)+'</div>').join('');if(Array.isArray(value.parts))return value.parts.map((item)=>'<div class="answer-part">'+(item.part?'<span class="answer-part-label">'+String(item.part)+': </span>':'')+renderText(item.value??'')+'</div>').join('');return '<div class="pending-box">RESPUESTA CON ESTRUCTURA NO PRESENTABLE AUTOMÁTICAMENTE</div>';};
 const solutionPart=(part,index)=>{let body=visibleSource(part.text),final=part.finalAnswer??'';const finalMatch=body.match(/(?:^|\\n|\\s)Resultado final:\\s*/i);if(finalMatch){const at=finalMatch.index;if(!final)final=body.slice(at+finalMatch[0].length).trim();body=body.slice(0,at).trim();}const markers=[...body.matchAll(/(?:^|\\n|\\s)(\\d+)\.\\s+/g)];let intro=body;const steps=[];if(markers.length){intro=body.slice(0,markers[0].index).trim().replace(/^Resolución:\\s*/i,'');for(let i=0;i<markers.length;i+=1){const marker=markers[i],start=marker.index+marker[0].length,end=markers[i+1]?.index??body.length;steps.push({number:marker[1],content:body.slice(start,end).trim()});}}else intro=body.replace(/^Resolución:\\s*/i,'');const title=part.part&&part.part!=='whole'?'Apartado '+String(part.part):'Resolución'+(index>0?' '+(index+1):'');return '<section class="solution-part"><h3 class="solution-part-title">'+title+'</h3>'+(intro?'<div>'+renderText(intro)+'</div>':'')+steps.map((step)=>'<div class="solution-step"><span class="solution-step-label">Paso '+step.number+'</span><div class="solution-step-content">'+renderText(step.content)+'</div></div>').join('')+(final?'<div class="solution-final"><span class="solution-final-title">Resultado final</span>'+renderText(final)+'</div>':'')+'</section>';};
 try{
  if(!renderer||typeof renderer.text!=='function')throw new Error('El motor matemático de +MathUp no está disponible.');
  const statement=data.statement.available?data.statement.blocks.map((block)=>'<div class="statement-block question-text pau-open-statement">'+renderText(block.literal)+'</div>').join(''):'<div class="pending-box">ENUNCIADO NO DISPONIBLE / PENDIENTE</div>';
  let delivery='';
  if(data.delivery.status==='OPTIONS_AVAILABLE')delivery='<section class="delivery-section"><h3 class="delivery-title">Elige una respuesta</h3><div class="answers">'+data.delivery.options.map((option)=>'<button class="answer-btn" type="button" tabindex="-1"><span class="option-letter">'+option.position+'</span><span class="answer-content">'+renderText(option.value)+'</span></button>').join('')+'</div></section>';
  else if(data.delivery.interactionKind==='multiple-choice')delivery='<section class="delivery-section"><div class="pending-box">OPCIONES NO DISPONIBLES / PENDIENTES</div></section>';
  else if(data.delivery.status==='OPEN_RESPONSE')delivery='<section class="delivery-section"><div class="open-response-box">Respuesta abierta · este ejercicio no utiliza opciones A/B/C/D.</div></section>';
  else delivery='<section class="delivery-section"><div class="pending-box">MODALIDAD DE ENTREGA NO DISPONIBLE / PENDIENTE</div></section>';
  const solutionBody=data.solution.available?data.solution.parts.map(solutionPart).join(''):'<div class="pending-box">SOLUCIÓN NO DISPONIBLE / PENDIENTE</div>';
  const answerBody=data.answer.available?'<section class="expected-answer"><h3>Respuesta registrada</h3>'+answerHtml(data.answer.value)+'</section>':'';
  card.innerHTML='<h2 class="student-card-title">Ejercicio</h2><section class="question-box">'+statement+'</section>'+delivery+'<details class="solution-disclosure"><summary>Ver solución</summary><div class="solution-content">'+solutionBody+answerBody+'</div></details>';
  document.documentElement.dataset.studentRenderReady='true';
 }catch(error){card.innerHTML='<div class="render-error">No se pudo componer este ejercicio con el motor real de +MathUp: '+String(error.message)+'</div>';document.documentElement.dataset.studentRenderReady='false';}
})();
<\/script></body></html>`;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (req.method === 'GET' && url.pathname === '/api/bootstrap') {
      const { groups: _groups, witnessesByGroup: _witnessesByGroup, ...manifestSummary } = manifest;
      json(res, 200, { manifest: manifestSummary, pilots: [...pilots.values()].map(({ entityIds, ...pilot }) => {
        const exercisePilot = exercisePilots.get(pilot.pilotId);
        return exercisePilot ? { ...pilot, title: exercisePilot.title, fullExerciseCards: true, cardCount: exercisePilot.cardCount } : pilot;
      }), progress: progressFor(state, queue), filters: filtersFor(queue), currentQueueIndex: state.currentQueueIndex, reviewerId: state.reviewerId, invalidatedAt: state.invalidatedAt ?? null }); return;
    }
    if (req.method === 'GET' && url.pathname === '/api/cases') {
      const filtered = queue.filter((row) => matches(row, url.searchParams));
      const pilotId = url.searchParams.get('pilot');
      if (pilotId) filtered.sort((left, right) => pilotPosition(left.visualEntityId, pilotId) - pilotPosition(right.visualEntityId, pilotId));
      const offset = Math.max(0, Number(url.searchParams.get('offset') ?? 0));
      const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') ?? 30)));
      json(res, 200, { total: filtered.length, offset, fullExerciseCards: Boolean(pilotId && exercisePilots.has(pilotId)), rows: filtered.slice(offset, offset + limit).map((row) => {
        const card = pilotId ? exerciseCardFor(row, pilotId) : null;
        return { queueIndex: row.queueIndex, pilotIndex: pilotPosition(row.visualEntityId, pilotId), visualEntityId: row.visualEntityId, exerciseId: card?.exerciseId ?? row.entity.exerciseId, courseId: row.entity.courseId, subjectId: row.entity.subjectId, entityType: card ? 'ejercicio completo' : row.entity.entityType, availableEntityTypes: card?.availableEntityTypes ?? [row.entity.entityType], priority: row.entity.priority, families: row.entity.families, status: statusFor(row.visualEntityId), groupTypes: row.groupTypes, coveredEntityCount: card?.visualEntityIds.length ?? row.coveredEntityCount };
      }) }); return;
    }
    if (req.method === 'GET' && url.pathname === '/api/navigate') {
      const filtered = queue.filter((row) => matches(row, url.searchParams));
      const pilotId = url.searchParams.get('pilot');
      if (pilotId) filtered.sort((left, right) => pilotPosition(left.visualEntityId, pilotId) - pilotPosition(right.visualEntityId, pilotId));
      const currentId = url.searchParams.get('id');
      const delta = Math.sign(Number(url.searchParams.get('delta') ?? 1));
      const currentIndex = filtered.findIndex((row) => row.visualEntityId === currentId);
      const target = filtered[Math.max(0, Math.min(filtered.length - 1, currentIndex + delta))] ?? null;
      json(res, 200, { total: filtered.length, visualEntityId: target?.visualEntityId ?? null }); return;
    }
    if (req.method === 'GET' && url.pathname.startsWith('/api/case/')) {
      const id = decodeURIComponent(url.pathname.slice('/api/case/'.length));
      const reviewCase = queueById.get(id);
      if (!reviewCase) { json(res, 404, { error: 'Caso no encontrado.' }); return; }
      const pilotId = url.searchParams.get('pilot');
      json(res, 200, { reviewCase, exerciseCard: pilotId ? exerciseCardFor(reviewCase, pilotId) : null, pilotIndex: pilotPosition(id, pilotId), decision: state.current[id] ?? null, inherited: state.propagation[id] ?? null, status: statusFor(id), progress: progressFor(state, queue) }); return;
    }
    if (req.method === 'GET' && url.pathname.startsWith('/render/')) {
      const id = decodeURIComponent(url.pathname.slice('/render/'.length));
      const width = Number(url.searchParams.get('width'));
      if (![320, 375, 768, 1280].includes(width) || !queueById.has(id)) { text(res, 404, 'Vista no encontrada.'); return; }
      const reviewCase = queueById.get(id);
      const pilotId = url.searchParams.get('pilot');
      const card = pilotId ? exerciseCardFor(reviewCase, pilotId) : null;
      text(res, 200, card ? renderExercisePage(reviewCase, card, width) : renderPage(reviewCase, width), 'text/html; charset=utf-8'); return;
    }
    if (req.method === 'GET' && url.pathname.startsWith('/runtime/')) {
      const runtimeFiles = new Map([
        ['/runtime/styles.css', path.join(root, 'styles.css')],
        ['/runtime/math-notation.css', path.join(root, 'math-notation.css')],
        ['/runtime/math-renderer.js', path.join(root, 'math-renderer.js')],
      ]);
      const requestedRuntime = runtimeFiles.get(url.pathname);
      if (!requestedRuntime || !fs.existsSync(requestedRuntime)) { text(res, 404, 'Runtime asset not found.'); return; }
      const type = requestedRuntime.endsWith('.css') ? 'text/css; charset=utf-8' : 'text/javascript; charset=utf-8';
      text(res, 200, fs.readFileSync(requestedRuntime), type); return;
    }
    if (req.method === 'POST' && url.pathname === '/api/decision') {
      const body = await parseBody(req);
      if (body.humanAction !== true) { json(res, 403, { error: 'Se requiere una acción humana explícita.' }); return; }
      const reviewCase = queueById.get(body.visualEntityId);
      if (!reviewCase) { json(res, 404, { error: 'Caso no encontrado.' }); return; }
      const record = applyDecision(state, reviewCase, body);
      state.reviewerId = record.reviewerId;
      state.currentQueueIndex = Math.min(queue.length - 1, reviewCase.queueIndex);
      saveState();
      json(res, 200, { record, progress: progressFor(state, queue), propagation: state.propagation, revoked: state.revoked }); return;
    }
    if (req.method === 'POST' && url.pathname === '/api/resume') {
      const body = await parseBody(req);
      const index = Math.max(0, Math.min(queue.length - 1, Number(body.queueIndex ?? 0)));
      state.currentQueueIndex = index;
      if (String(body.reviewerId ?? '').trim()) state.reviewerId = String(body.reviewerId).trim();
      saveState(); json(res, 200, { ok: true, currentQueueIndex: index }); return;
    }
    if (req.method === 'POST' && url.pathname === '/api/rollback') {
      const body = await parseBody(req);
      if (body.confirm !== 'ROLLBACK_LAST_DECISION' || !state.history.length) { json(res, 400, { error: 'Confirmación de rollback inválida.' }); return; }
      const removed = rollbackLastDecision(state);
      saveState(); json(res, 200, { removedDecisionId: removed.decisionId, progress: progressFor(state, queue) }); return;
    }
    if (req.method === 'GET' && url.pathname === '/api/export') { json(res, 200, state); return; }

    const requested = url.pathname === '/' ? path.join(publicRoot, 'index.html') : path.resolve(publicRoot, `.${url.pathname}`);
    if (!requested.startsWith(publicRoot) || !fs.existsSync(requested) || fs.statSync(requested).isDirectory()) { text(res, 404, 'Not found'); return; }
    const type = requested.endsWith('.css') ? 'text/css; charset=utf-8' : requested.endsWith('.js') ? 'text/javascript; charset=utf-8' : 'text/html; charset=utf-8';
    text(res, 200, fs.readFileSync(requested), type);
  } catch (error) { json(res, 400, { error: error.message }); }
});

server.listen(port, '127.0.0.1', () => process.stdout.write(`FASE2D_HUMAN_REVIEW_READY http://127.0.0.1:${port}/\n`));

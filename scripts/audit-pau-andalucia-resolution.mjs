import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
export const semanticHash=x=>crypto.createHash('sha256').update(JSON.stringify(stable(x))).digest('hex');
const fileHash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const jsonl=p=>fs.readFileSync(p,'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const normalized=x=>JSON.stringify(x).normalize('NFKC').replace(/\s/g,'').replace(/−/g,'-').replace(/,/g,'.').toLowerCase();
const forbidden=/\b(?:undefined|null)\b|\\\(|\\\)|\\(?:frac|sqrt|begin|end|left|right|vec|int|sum|lim)\b/i;
const forbiddenBlockers=new Set(['NO_PREEXISTING_ANSWER','NO_PREEXISTING_SOLUTION','NO_PREEXISTING_DISTRACTORS']);

// Solo números racionales completos. No evalúa texto ni atribuye equivalencia a expresiones no analizadas.
export function rational(value){
 if(typeof value!=='string') return null;
 const s=value.normalize('NFKC').replace(/−/g,'-').replace(/\s/g,'');
 const m=s.match(/^([+-]?\d+(?:[.,]\d+)?)(?:\/([+-]?\d+(?:[.,]\d+)?))?(%)?$/);
 if(!m) return null;
 const decimal=t=>{const [i,f='']=t.replace(',','.').split('.');return [BigInt(i+f),10n**BigInt(f.length)];};
 const [a,b]=decimal(m[1]),[c,d]=m[2]?decimal(m[2]):[1n,1n];
 if(c===0n) return null;
 return [a*d,b*c*(m[3]?100n:1n)];
}
export function sameRational(a,b){const x=rational(a),y=rational(b);return x&&y?x[0]*y[1]===y[0]*x[1]:null;}

// La posición es la arquitectura histórica de cada materia, no la numeración del PDF.
export function historicalSlot(subject,block){
 const b=String(block).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 if(subject==='Matemáticas II'){
  if(b==='algebra')return 1;
  if(/limites.*derivadas/.test(b))return 2;
  if(b==='integrales')return 3;
  if(b==='geometria')return 4;
  if(b.startsWith('probabilidad'))return 5;
 }else if(subject==='Matemáticas Aplicadas a las CCSS II'){
  if(b==='matrices')return 1;
  if(b.startsWith('sistemas'))return 2;
  if(b==='analisis')return 3;
  if(b.startsWith('probabilidad'))return 4;
 }
 return null; // Un bloque genérico o mixto requiere clasificación, no una conjetura.
}

function blockerGroup(row){
 const s=row.blockerCodes.join('|');
 if(/NOT_AN_EXERCISE|NOT_MATHEMATICAL_EXERCISE|SCORING|CRITERIA|CRITERION|EDITORIAL_CONTENT_ONLY|MISSING_EXERCISE/.test(s)) return 'NON_EXERCISE_OR_SCORING_FRAGMENT';
 if(/SEGMENTATION|ALTERNATIVES_FUSED/.test(s)) return 'SEGMENTATION_REVIEW';
 if(/AMBIGUOUS|CORRUPTED|UNCERTAIN|STRUCTURE_LOST/.test(s)) return 'MATHEMATICAL_NOTATION_REVIEW';
 return 'MISSING_DOCUMENTARY_DATA';
}

export function auditResolution(projectRoot=root){
 const base=path.join(projectRoot,'artifacts/pau-andalucia-resolution');
 const qp=path.join(projectRoot,'artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl');
 const queue=jsonl(qp),completed=jsonl(path.join(base,'completed-exercises.jsonl')),blocked=jsonl(path.join(base,'blocked-exercises.jsonl'));
 const byId=new Map(queue.map((x,i)=>[x.exerciseId,{...x,queueIndex:i}]));
 const issues=[],ledger=[],seen=new Set(),coverage=new Map(),blockerCodes={},blockerGroups={};
 const add=(code,row,detail,partId)=>issues.push({code,exerciseId:row.exerciseId,queueIndex:row.queueIndex,...(partId?{partId}:{}),detail});
 let partCount=0,choiceCount=0,numericPairComparisons=0,numericSetsFullyComparable=0,legacyValidationLabels=0;
 for(const row of [...completed,...blocked].sort((a,b)=>a.queueIndex-b.queueIndex)){
  const q=byId.get(row.exerciseId),isBlocked=row.resolutionState==='BLOCKED';
  if(!q){add('NOT_IN_QUEUE',row,'Identidad no contenida en la cola inicial.');continue;}
  if(seen.has(row.exerciseId)) add('DUPLICATE_IDENTITY',row,'Más de un estado para la misma identidad.');
  seen.add(row.exerciseId);
  if(row.queueIndex!==q.queueIndex) add('QUEUE_INDEX_MISMATCH',row,'Posición no coincide con la cola inicial.');
  if(row.promptHash!==q.promptHash) add('PROMPT_HASH_MISMATCH',row,'Hash de enunciado distinto al congelado.');
  const key=`${q.subject}|${q.year}`;
  if(!coverage.has(key)) coverage.set(key,{subject:q.subject,year:q.year,total:0,generated:0,documentaryBlocked:0});
  const cell=coverage.get(key);cell.total++;cell[isBlocked?'documentaryBlocked':'generated']++;
  if(isBlocked){
   if(!row.blockerEvidence||!row.sourceLiteral) add('BLOCKER_EVIDENCE_MISSING',row,'Falta evidencia literal o explicación concreta.');
   for(const code of row.blockerCodes){blockerCodes[code]=(blockerCodes[code]||0)+1;if(forbiddenBlockers.has(code))add('INVALID_ABSENCE_BLOCKER',row,code);}
   const group=blockerGroup(row);blockerGroups[group]=(blockerGroups[group]||0)+1;
   ledger.push({exerciseId:row.exerciseId,queueIndex:q.queueIndex,subject:q.subject,year:q.year,promptHash:q.promptHash,sourceRecordHash:row.recordHash,state:'DOCUMENTARY_REVIEW_REQUIRED',blockerGroup:group,blockerCodes:row.blockerCodes,blockerEvidence:row.blockerEvidence,publicationAuthorized:false});
   continue;
  }
  if(row.resolutionState==='RESOLVED_AND_VALIDATED')legacyValidationLabels++;
  if(row.subject!==q.subject||row.year!==q.year)add('PROVENANCE_MISMATCH',row,'Materia/año no coincide con la cola.');
  if(!Number.isInteger(row.examSlot)||row.examSlot<1||row.examSlot>(q.subject==='Matemáticas II'?5:4))add('INVALID_EXAM_SLOT',row,'Fuera de la arquitectura histórica de la materia.');
  const requiredSlot=historicalSlot(row.subject,row.block);
  if(requiredSlot!==null&&row.examSlot!==requiredSlot)add('HISTORICAL_SLOT_MISMATCH',row,`Bloque ${row.block}: posición ${requiredSlot}, no ${row.examSlot}.`);
  if(!row.parts?.length)add('EMPTY_PARTS',row,'Sin apartados resueltos.');
  const partIds=new Set();
  for(const p of row.parts||[]){
   partCount++;
   if(partIds.has(p.partId))add('DUPLICATE_PART',row,'Apartado repetido.',p.partId);partIds.add(p.partId);
   const choices=[p.answer,...(p.distractors||[])];choiceCount+=choices.length;
   if(choices.length!==4)add('CHOICE_COUNT',row,'No hay exactamente cuatro opciones.',p.partId);
   if(new Set(choices.map(normalized)).size!==4)add('TEXTUAL_CHOICE_DUPLICATE',row,'Opciones normalizadas textualmente repetidas.',p.partId);
   if(choices.length===4&&choices.every(x=>rational(x)))numericSetsFullyComparable++;
   for(let i=0;i<choices.length;i++)for(let j=i+1;j<choices.length;j++){
    const equivalent=sameRational(choices[i],choices[j]);
    if(equivalent!==null)numericPairComparisons++;
    if(equivalent===true)add('RATIONAL_CHOICE_EQUIVALENCE',row,`Opciones ${i} y ${j} equivalentes exactamente.`,p.partId);
   }
   if(normalized(p.answer)!==normalized(p.finalAnswer))add('ANSWER_FINAL_MISMATCH',row,'Respuesta y resultado final no coinciden.',p.partId);
   if(!p.verification?.detail||!p.verification?.method)add('VERIFICATION_DESCRIPTION_MISSING',row,'No consta descripción de comprobación; verified=true no es una prueba.',p.partId);
   if(!p.solutionSteps||p.solutionSteps.length<2||p.solutionSteps.some(s=>!s.explanation||s.math===undefined))add('STEP_STRUCTURE_MISSING',row,'Faltan pasos con explicación y expresión.',p.partId);
   if(p.distractorEvidence?.length!==3)add('DISTRACTOR_RATIONALE_MISSING',row,'Faltan tres razones de error.',p.partId);
   if(forbidden.test(JSON.stringify({prompt:p.prompt,answer:p.answer,distractors:p.distractors,steps:p.solutionSteps})))add('INTERNAL_SYNTAX_IN_FIELDS',row,'Marcador interno en campos candidatos. No es una inspección de DOM.',p.partId);
  }
  ledger.push({exerciseId:row.exerciseId,queueIndex:q.queueIndex,subject:q.subject,year:q.year,promptHash:q.promptHash,sourceRecordHash:row.recordHash,state:'GENERATED_AWAITING_QUALITY_GATES',legacyResolutionLabel:row.resolutionState,partCount:row.parts.length,mathematicalCertification:'NOT_ESTABLISHED_BY_THIS_AUDIT',pedagogicalCertification:'NOT_ESTABLISHED_BY_THIS_AUDIT',renderCertification:'NOT_ESTABLISHED_BY_THIS_AUDIT',publicationAuthorized:false});
 }
 const pending=queue.filter(q=>!seen.has(q.exerciseId)).map(q=>q.exerciseId);
 const batchDir=path.join(base,'batches'),replay=new Map(),batchHashes=[];
 let executedCheckCount=0,failedExecutedChecks=0;
 for(const name of fs.readdirSync(batchDir).sort()){
  const dir=path.join(batchDir,name);
  if(!fs.statSync(dir).isDirectory())continue;
  for(const filename of ['resolved-exercises.jsonl','blocked-exercises.jsonl']){
   const full=path.join(dir,filename);if(!fs.existsSync(full))continue;
   batchHashes.push({path:`batches/${name}/${filename}`,sha256:fileHash(full)});
   for(const row of jsonl(full))replay.set(row.exerciseId,row);
  }
  const cp=path.join(dir,'executed-checks.json');
  if(fs.existsSync(cp)){
   const c=JSON.parse(fs.readFileSync(cp,'utf8'));executedCheckCount+=c.length;
   failedExecutedChecks+=c.filter(x=>x.result!=='PASS').length;
   batchHashes.push({path:`batches/${name}/executed-checks.json`,sha256:fileHash(cp)});
  }
 }
 const current=[...completed,...blocked].sort((a,b)=>a.queueIndex-b.queueIndex),replayed=[...replay.values()].sort((a,b)=>a.queueIndex-b.queueIndex);
 const replayMatches=semanticHash(current)===semanticHash(replayed);
 const issueCounts=issues.reduce((a,i)=>(a[i.code]=(a[i.code]||0)+1,a),{});
 const summary={schemaVersion:'mathup.andalucia.resolution-audit.v1',scope:'QUEUE_ACCOUNTING_AND_STRUCTURAL_CHECKS_NOT_PUBLICATION_CERTIFICATION',inputs:{queueSha256:fileHash(qp),completedSha256:fileHash(path.join(base,'completed-exercises.jsonl')),blockedSha256:fileHash(path.join(base,'blocked-exercises.jsonl'))},totals:{queue:queue.length,processed:seen.size,generated:completed.length,documentaryBlocked:blocked.length,pending:pending.length,parts:partCount,answers:partCount,distractors:choiceCount-partCount,solutions:partCount,enabledByThisPhase:0},legacyValidationLabels,blockerGroups,blockerCodes,coverage:[...coverage.values()].sort((a,b)=>a.subject.localeCompare(b.subject)||a.year-b.year),checks:{issueCounts,issues:issues.length,numericPairComparisons,numericSetsFullyComparable,executedCheckCount,failedExecutedChecks,replayMatches,replaySemanticHash:semanticHash(replayed),currentSemanticHash:semanticHash(current)},limitations:['El replay verifica contabilidad y contenido, no vuelve a resolver matemáticamente los ejercicios.','La comparación racional solo cubre opciones que son números/fracciones completos; no certifica expresiones, conjuntos, matrices ni texto.','Los campos verification.verified y las etiquetas históricas RESOLVED_AND_VALIDATED no constituyen certificación independiente.','No se han ejecutado aquí los controles pedagógicos ni el renderizado del corpus completo.'],pending};
 summary.auditSemanticHash=semanticHash(summary);
 return {summary,ledger,issues,batchHashes};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const out=path.join(root,'artifacts/pau-andalucia-resolution/audit');
 const result=auditResolution();fs.mkdirSync(out,{recursive:true});
 for(const [name,value] of [['summary.json',result.summary],['issues.json',result.issues],['batch-hashes.json',result.batchHashes]])fs.writeFileSync(path.join(out,name),JSON.stringify(value,null,2)+'\n');
 fs.writeFileSync(path.join(out,'quality-gate-ledger.jsonl'),result.ledger.map(x=>JSON.stringify(stable(x))).join('\n')+'\n');
 console.log(JSON.stringify({totals:result.summary.totals,checks:result.summary.checks,legacyValidationLabels:result.summary.legacyValidationLabels,blockerGroups:result.summary.blockerGroups},null,2));
}

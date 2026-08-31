// Numeric data come from the inspected official PDF, not a previous answer.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts,compute} from './resolve-andalucia-inference-2012.mjs';
import {sourceProjection} from './project-andalucia-inference-source-glyphs.mjs';
export const cases=[
 {index:403,kind:'proportion',n:500,successes:325,center:.65,confidence:.97,nextConfidence:.92,error:.02,hypothesized:.64,unit:'proporción',population:'proporción de casas afectadas por la erupción',literals:['El Paso en la Isla de La Palma','manteniendo la proporción muestral'],recoveredLiterals:['muestra de 500 casas','325 de ellas','confianza del 97 %','volcán es del 64 %','confianza del 92 %','estimación sea del 2 %']},
 {index:825,kind:'proportion',n:300,successes:90,center:.3,confidence:.97,nextConfidence:.95,error:.03,unit:'proporción',population:'proporción de asegurados que ha requerido asistencia en carretera',literals:['asistencia en carretera','Con la proporción muestral facilitada'],recoveredLiterals:['muestra aleatoria de 300 asegurados','resultando que 90','confianza al 97 %','confianza del 95 %','más de un 3 %']},
];
export function buildRecoveredParts(c,text){
 const p=buildParts(c,text);
 if(c.hypothesized!==undefined){
  const a=p[0],v=compute(c),suffix=raw=>{const [l,u]=raw.match(/\[([^;]+); ([^\]]+)\]/).slice(1).map(x=>Number(x.replace(',','.')));return `${raw}; 64% ${l<=c.hypothesized&&c.hypothesized<=u?'compatible':'no compatible'}`;};
  a.answer=a.finalAnswer=suffix(a.answer);a.distractors=a.distractors.map(suffix);
  a.solutionSteps.push(
   {explanation:'Comprobamos si la proporción propuesta pertenece al intervalo, no si coincide exactamente con la estimación puntual.',math:'0,64 pertenece al intervalo al 97%'},
   {explanation:'El 64% es compatible con estos datos al nivel indicado. Esta compatibilidad no demuestra que sea la proporción poblacional verdadera.',math:'64% compatible'},
  );
  a.verification.numericalEvidence.hypothesized=.64;a.verification.numericalEvidence.compatible=v.interval[0]<=.64&&.64<=v.interval[1];
 }
 return p;
}
export function buildRecoveredBatch(batchId='batch-0247',selected=cases){
 const r=buildBatch(selected,batchId,buildRecoveredParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));
 for(let i=0;i<r.batch.records.length;i++){
  const record=r.batch.records[i],c=selected[i],projection=sourceProjection({...record,queueIndex:c.index});
  for(const s of c.recoveredLiterals)assert.ok(projection.text.includes(s),'Missing page-proven numerical data: '+s);
  record.correctionEvidence.pdfParameterRecovery={evidence:projection.evidence,changes:projection.changes,recoveredLiterals:c.recoveredLiterals};
 }
 return r;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const batchId=process.argv[2]??'batch-0247',r=buildRecoveredBatch(batchId),archive=`artifacts/pau-andalucia-resolution/audit/correction-${batchId.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${batchId}.json`,JSON.stringify(r.batch,null,2)+'\n');
 console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));
}

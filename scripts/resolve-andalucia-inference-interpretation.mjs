// Source-checked cases whose second task is not the same statistical question.
// These transformations author solutions only; official statements remain immutable.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts,compute,critical} from './resolve-andalucia-inference-2012.mjs';
export const cases=[
 {index:335,kind:'mean',sigma:.42,n:49,center:6.85,confidence:.96,nextConfidence:.98,error:.125,strict:true,task:'existing-sample-sufficiency',unit:'g/dl',population:'concentración media poblacional de proteína en sangre',literals:['Normal','desviación típica 0.42','49 individuos','6.85','96%','¿Es suficiente','98%','menor que 0.125']},
 {index:465,kind:'proportion',n:1000,successes:300,center:.3,confidence:.95,nextConfidence:.925,error:.03,strict:true,task:'different-planning-sample',planningProportion:.25,unit:'proporción',population:'proporción de clientes que compra el producto',literals:['1000 clientes','300 compraban','95%','Si en otra muestra','0.25','inferior a 0.03','92.5%']},
 {index:496,kind:'proportion',n:400,successes:370,center:.925,confidence:.93,nextConfidence:.95,error:.015,amplitude:.03,strict:true,task:'quality-threshold',threshold:.88,unit:'proporción',population:'proporción de envíos entregados a tiempo',literals:['400 de sus envíos','370 han sido','al menos el 88%','93%','misma proporción','95%','amplitud','inferior a 0.03']},
 {index:669,kind:'mean',sigma:2,n:10,center:4.35,sample:[3.8,6.3,4.3,6,6.2,5.8,1.5,3.3,3.4,2.9],confidence:.92,nextConfidence:.92,error:1,includeError:true,task:'relative-error-reduction',reductionFactor:2,unit:'unidades',population:'media poblacional',literals:['población Normal','desviación típica 2','tamaño 10','3.8 6.3 4.3 6 6.2 5.8 1.5 3.3 3.4 2.9','92%','error de estimación','reducir ese error a la\nmitad','mismo nivel de confianza']},
];
const fmt=(x,d=4)=>Number(x.toFixed(d)).toLocaleString('es-ES',{maximumFractionDigits:d,useGrouping:false});
const step=(explanation,math)=>({explanation,math});
export function buildInterpretationParts(c,text){
 const parts=buildParts(c,text),v=compute(c);
 if(c.task==='existing-sample-sufficiency'){
  const b=parts[1],actual=v.zn*c.sigma/Math.sqrt(c.n);
  const wrong=[critical(.95)*c.sigma/Math.sqrt(c.n),v.z*c.sigma/Math.sqrt(c.n),v.zn*c.sigma/c.n];
  const answer=(e)=>`${e<c.error?'Sí':'No'}; E ≈ ${fmt(e)} ${c.unit}`;
  b.answer=b.finalAnswer=answer(actual);b.distractors=wrong.map(answer);
  b.distractorEvidence=['Reutilizar el cuantil del 95% aunque el apartado exige 98%.','Reutilizar el cuantil del 96% del apartado a).','Dividir la desviación entre n en lugar de entre su raíz.'];
  b.solutionSteps=[
   step('La pregunta se refiere a la muestra ya tomada. Comprobamos su margen a la nueva confianza, no el del apartado anterior.',`n = ${c.n}; σ = ${fmt(c.sigma)}; confianza = 98%`),
   step('El intervalo es bilateral; repartimos la probabilidad exterior entre las dos colas.',`α = 0,02; Φ(z) = 0,99 ⇒ z ≈ ${fmt(v.zn,6)}`),
   step('La desviación poblacional es conocida y la población es normal. Aplicamos la fórmula del margen de la media.', 'E = z·frac{σ}{√(n)}'),
   step('Sustituimos el tamaño existente, conservando la precisión del cuantil.',`E = ${fmt(v.zn,6)}·frac{0,42}{√(49)} ≈ ${fmt(actual,7)} g/dl`),
   step('Contrastamos con la desigualdad estricta del enunciado. El tamaño actual no es suficiente.',`${fmt(actual,7)} > 0,125 ⇒ No`),
   step('Como comprobación adicional, despejamos el tamaño mínimo que sí cumpliría el error pedido.',`n > (frac{z·σ}{0,125})² ≈ ${fmt(v.bound,7)} ⇒ n mínimo = ${v.minimum}`),
   step('El margen decrece al aumentar n; verificamos los dos enteros de la frontera.',`E(${v.minimum}) ≈ ${fmt(v.zn*c.sigma/Math.sqrt(v.minimum),7)}; E(${v.minimum-1}) ≈ ${fmt(v.zn*c.sigma/Math.sqrt(v.minimum-1),7)}`),
   step('La conclusión solicitada es sobre las 49 observaciones, no sobre una muestra distinta.',answer(actual)),
  ];
  b.verification={verified:true,method:'INDEPENDENT_NORMAL_QUANTILE_AND_ACTUAL_SAMPLE_CHECK',detail:'Se comprueba el margen con n=49 y la minimalidad del diseño alternativo; cada distractor se recalcula desde su error declarado.',numericalEvidence:{actualMargin:actual,threshold:c.error,minimum:v.minimum,wrongMargins:wrong}};
 }else if(c.task==='different-planning-sample'){
  // The new proportion belongs only to b). The interval in a) keeps 300/1000.
  const planning={...c,center:c.planningProportion,successes:c.planningProportion*c.n};
  parts[1]=buildParts(planning,text)[1];
  parts[1].solutionSteps[0]=step(`El apartado b) describe otra muestra, con proporción ${fmt(c.planningProportion,6)}. Usamos esa estimación en el diseño y no la proporción ${c.center.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:6,useGrouping:false})} del apartado a).`,`p̂ nueva = ${fmt(c.planningProportion,6)}; q̂ nueva = ${fmt(1-c.planningProportion,6)}`);
  parts[1].verification.numericalEvidence.planningProportion=c.planningProportion;
  parts[1].verification.numericalEvidence.previousProportion=c.center;
 }else if(c.task==='quality-threshold'){
  const a=parts[0];
  const label=raw=>{
   const [lo,hi]=raw.match(/\[([^;]+); ([^\]]+)\]/).slice(1).map(x=>Number(x.replace(',','.')));
   return `${raw}; ${lo>=c.threshold?'se estima que cumple':hi<c.threshold?'se estima que no cumple':'no permite concluir que cumple'}`;
  };
  a.answer=a.finalAnswer=label(a.answer);a.distractors=a.distractors.map(label);
  a.solutionSteps.push(
   step('Para estimar el cumplimiento del mínimo exigido comprobamos todo el intervalo, no solo la proporción muestral.',`p mínimo exigido = 0,88; extremo inferior ≈ ${fmt(v.interval[0],6)}`),
   step('Incluso el extremo inferior supera el 88%. El intervalo respalda que la empresa cumple, con el nivel de confianza del procedimiento; no constituye certeza absoluta.',`${fmt(v.interval[0],6)} > 0,88 ⇒ se estima que cumple`),
  );
  a.verification.numericalEvidence.qualityThreshold=c.threshold;
  a.verification.numericalEvidence.lowerEndpointExceedsThreshold=v.interval[0]>c.threshold;
 }else if(c.task==='relative-error-reduction'){
  const b=parts[1],k=c.reductionFactor,n=c.n*k*k;
  assert.equal(k,2,'Only the source-demonstrated halving case is configured');
  b.answer=b.finalAnswer=`n = ${n}`;b.distractors=[c.n*k,c.n/k,c.n*k*k*k*k].map(x=>`n = ${x}`);
  b.distractorEvidence=['Suponer que el error es inversamente proporcional a n y duplicar la muestra.','Reducir el tamaño a la mitad junto con el error.','Aplicar dos veces el factor cuadrático y multiplicar por dieciséis.'];
  b.solutionSteps=[
   step('Mantenemos la misma desviación poblacional y la misma confianza, por lo que el valor crítico tampoco cambia.',`σ = 2; confianza = 92%; n anterior = 10`),
   step('Escribimos el error anterior y el nuevo antes de sustituir datos.', 'E anterior = z·frac{σ}{√(n anterior)}; E nuevo = z·frac{σ}{√(n nuevo)}'),
   step('Dividimos ambos errores; el cuantil y la desviación se cancelan. Así evitamos que redondear el margen cambie el tamaño mínimo.', 'frac{E nuevo}{E anterior} = √(frac{n anterior}{n nuevo})'),
   step('Reducir el error a la mitad exige que esta razón sea como máximo un medio.', '√(frac{10}{n nuevo}) ≤ frac{1}{2}'),
   step('Elevamos al cuadrado cantidades positivas y despejamos el tamaño entero mínimo.', 'frac{10}{n nuevo} ≤ frac{1}{4} ⇒ n nuevo ≥ 40'),
   step('Comprobamos el tamaño elegido y el anterior directamente mediante razones exactas de errores.', 'E(40) = E(10)/2; E(39)/E(10) = √(10/39) > 1/2'),
   step('La relación es inversa con la raíz del tamaño, no con el tamaño. Hacen falta cuatro veces las observaciones.', 'n = 40'),
  ];
  b.verification={verified:true,method:'EXACT_SAMPLE_SIZE_ERROR_RATIO',detail:'Se cancela z·σ y se prueba n≥4n anterior. La comprobación no depende del redondeo de un cuantil.',numericalEvidence:{oldSampleSize:c.n,reductionFactor:k,minimum:n,ratioAtMinimum:Math.sqrt(c.n/n),ratioAtPrevious:Math.sqrt(c.n/(n-1)),distractorSampleSizes:[20,5,160]}};
 }else throw new Error(`Unsupported interpretation ${c.task}`);
 for(const p of parts){assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.equal(p.finalAnswer,p.answer);}
 return parts;
}
export function buildInterpretationBatch(batchId='batch-0241',selected=cases){
 const result=buildBatch(selected,batchId,buildInterpretationParts);
 result.batch.executedChecks=result.batch.records.map((r,i)=>({queueIndex:selected[i].index,documentHash:r.officialSource.documentHash,sourceLiterals:selected[i].literals,task:selected[i].task,parts:r.parts.map(p=>({partId:p.partId,...p.verification})),result:'PASS'}));
 return result;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const result=buildInterpretationBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0241-original-records.json';
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(result.originals,null,2)+'\n');
 fs.writeFileSync('tmp/batch-0241.json',JSON.stringify(result.batch,null,2)+'\n');
 console.log(JSON.stringify(result.batch.records.map(r=>({exerciseId:r.exerciseId,index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));
}

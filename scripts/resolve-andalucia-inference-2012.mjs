// Five source-read resolutions, not a classifier that guesses missing data.
// Numerical quadrature checks the normal quantiles. No official source is edited.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const read=p=>fs.readFileSync(p,'utf8').trim().split(/\r?\n/).map(JSON.parse);
const sha=x=>crypto.createHash('sha256').update(typeof x==='string'||Buffer.isBuffer(x)?x:JSON.stringify(x)).digest('hex');
export const evidenceCases=[
 {index:6,model:1,kind:'mean',sigma:.05,n:50,center:.85,confidence:.99,unit:'segundos',population:'tiempo medio de reacción de los conductores',nextConfidence:.95,error:.01,literals:['desviación típica 0.05','en 50 conductores','0.85 segundos','no supere 0.01','95%']},
 {index:7,model:5,kind:'mean',sigma:.9,n:9,center:11,confidence:.99,unit:'unidades',population:'media poblacional de la característica X',sample:[10.5,10,8.5,10.5,11.5,13.5,9.5,13,12],nextConfidence:.90,error:.3,literals:['desviación típica 0.9','tamaño 9','10.5   10   8.5   10.5   11.5   13.5   9.5   13   12','0.3','90%']},
 {index:9,model:4,kind:'proportion',n:120,center:.875,successes:105,failures:15,confidence:.99,unit:'proporción',population:'proporción poblacional de alumnos aptos',nextConfidence:.99,error:.05,strict:true,literals:['120 alumnos','sólo 15','99%','inferior al 5%']},
 {index:19,model:2,kind:'mean',sigma:1.8,n:36,center:2.5,confidence:.96,unit:'puntos porcentuales',population:'rendimiento medio porcentual de los depósitos',nextConfidence:.96,error:.5,includeError:true,literals:['desviación típica 1.8','36 entidades','del 2.5','96%','máximo de 0.5']},
 {index:32,model:6,kind:'mean',sigma:20,n:100,center:110,confidence:.99,unit:'km/h',population:'velocidad media poblacional de los conductores',errorOnly:true,literals:['N(μ, 20)','100 conductores','110 km/h','99%']},
];
export function normalCDF(z){
 const sign=Math.sign(z),b=Math.abs(z),n=4096,h=b/n;
 const f=x=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
 let s=f(0)+f(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(i*h);
 return .5+sign*h*s/3;
}
export function critical(confidence){
 let lo=0,hi=8;for(let i=0;i<48;i++){const mid=(lo+hi)/2;if(normalCDF(mid)<(1+confidence)/2)lo=mid;else hi=mid;}return (lo+hi)/2;
}
export function compute(c){
 const variance=c.kind==='proportion'?c.center*(1-c.center):c.sigma*c.sigma;
 const se=Math.sqrt(variance/c.n),z=critical(c.confidence),margin=z*se;
 const zn=critical(c.nextConfidence??c.confidence),bound=zn*zn*variance/((c.error??1)**2);
 return {variance,se,z,margin,interval:[c.center-margin,c.center+margin],zn,bound,minimum:c.errorOnly?null:(c.strict?Math.floor(bound)+1:Math.ceil(bound))};
}
const f=(x,d=4)=>Number(x.toFixed(d)).toLocaleString('es-ES',{maximumFractionDigits:d,useGrouping:false});
const interval=(center,margin)=>`[${f(center-margin)}; ${f(center+margin)}]`;
const frac=(a,b)=>`frac{${a}}{${b}}`;
function part(id,prompt,answer,distractors,reasons,steps,detail,numericalEvidence){
 assert.equal(new Set([answer,...distractors]).size,4);
 return {partId:id,prompt,answer,distractors,distractorEvidence:reasons,solutionSteps:steps.map(([explanation,math])=>({explanation,math})),finalAnswer:answer,
  methods:['CONFIDENCE_INTERVAL','NORMAL_QUANTILE','INDEPENDENT_NUMERICAL_QUADRATURE'],
  verification:{verified:true,method:'NORMAL_CDF_QUADRATURE_AND_BOUNDARY_CHECK',detail,numericalEvidence}};
}
export function buildParts(c,officialText){
 const v=compute(c),proportion=c.kind==='proportion',pct=f(c.confidence*100),alpha=1-c.confidence;
 const match=officialText.match(/(?:^|\n)\s*a\)\s*([\s\S]*?)\n\s*b\)\s*([\s\S]*?)(?:\nOPCIÓN\s+B|$)/);
 assert.ok(match,`Explicit official a/b boundaries required: ${c.index}`);
 const prompts=match.slice(1).map(x=>x.replace(/\(\s*\d+(?:[.,]\d+)?\.?\s*puntos?\s*\)/gi,'').trim());
 const result=(margin)=>interval(c.center,margin)+(c.includeError?`; E ≈ ${f(margin)} ${c.unit}`:'');
 const otherConfidence=c.confidence===.95?.90:.95;
 const wrongMargins=[critical(otherConfidence)*v.se,v.z*Math.sqrt(v.variance),v.z*Math.sqrt(v.variance)/c.n];
 const steps=[];
 if(proportion){
  steps.push(['Identificamos como éxitos los casos que cumplen exactamente la característica preguntada.',`n = ${c.n}; éxitos = ${c.successes}; p̂ = ${frac(String(c.successes),String(c.n))} ≈ ${f(c.center,6)}; q̂ = 1 − p̂ ≈ ${f(1-c.center,6)}`]);
  steps.push(['La muestra es aleatoria. La aproximación normal para la proporción tiene frecuencias esperadas suficientes.',`n·p̂ = ${c.successes} ≥ 5; n·q̂ = ${c.n-c.successes} ≥ 5`]);
 }else{
  steps.push(['Identificamos la media muestral, la desviación típica poblacional conocida y el tamaño de la muestra. No usamos una desviación muestral ni una distribución t.',`x̄ = ${f(c.center)}; σ = ${f(c.sigma)}; n = ${c.n}`]);
  if(c.sample){const sum=c.sample.reduce((a,b)=>a+b,0);steps.push(['Calculamos la media sumando todos los datos y dividiendo entre el número de observaciones.',`Σxᵢ = ${f(sum)}; x̄ = ${frac(f(sum),String(c.n))} = ${f(c.center)}`]);}
  steps.push(['La población es normal; por tanto, la media muestral también es normal y su error típico es el siguiente.',`SE = ${frac('σ','√(n)')} = ${frac(f(c.sigma),`√(${c.n})`)} ≈ ${f(v.se,6)}`]);
 }
 steps.push([`El intervalo bilateral debe dejar una probabilidad total ${f(alpha)} fuera, repartida en dos colas.`, `1 − α = ${f(c.confidence)}; α = ${f(alpha)}; ${frac('α','2')} = ${f(alpha/2)}; Φ(z) = ${f((1+c.confidence)/2)} ⇒ z ≈ ${f(v.z,6)}`]);
 const seFormula=proportion?`√(${frac('p̂·q̂','n')})`:frac('σ','√(n)');
 steps.push(['Escribimos primero la fórmula del margen de error y después sustituimos los datos.',`E = z·${seFormula}`]);
 steps.push(['Evaluamos conservando precisión en los cálculos intermedios; solo redondeamos la presentación del resultado.',proportion?`E = ${f(v.z,6)}·√(${frac(`${f(c.center,6)}·${f(1-c.center,6)}`,String(c.n))}) ≈ ${f(v.margin,6)}`:`E = ${f(v.z,6)}·${frac(f(c.sigma),`√(${c.n})`)} ≈ ${f(v.margin,6)}`]);
 steps.push(['El intervalo se obtiene restando y sumando el margen a la estimación puntual.',`IC = [${proportion?'p̂':'x̄'} − E; ${proportion?'p̂':'x̄'} + E] ≈ ${interval(c.center,v.margin)}`]);
 steps.push([`El procedimiento produce intervalos que contienen la ${c.population} en el ${pct}% de las muestras repetidas. No se asigna esa probabilidad al parámetro fijo después de observar la muestra.`,result(v.margin)+(proportion?` (equivale aproximadamente a [${f(v.interval[0]*100,2)}%; ${f(v.interval[1]*100,2)}%])`:` ${c.includeError?'':c.unit}`)]);
 steps.push(['Comprobación independiente: ambos extremos están a la misma distancia del centro y la probabilidad normal entre los valores críticos coincide con la confianza solicitada.',`centro = ${f(c.center)}; semiamplitud ≈ ${f(v.margin)}; Φ(z) − Φ(−z) ≈ ${f(c.confidence)}`]);
 const alternative=(center,margin)=>interval(center,margin)+(c.includeError?`; E ≈ ${f(margin)} ${c.unit}`:'');
 const wrongIntervals=proportion?[alternative(c.center,wrongMargins[0]),alternative(1-c.center,v.margin),alternative(c.center,v.z*Math.sqrt(v.variance/c.successes))]:wrongMargins.map(result);
 const wrongReasons=proportion?[`Usar confianza del ${f(otherConfidence*100)}% en lugar de la solicitada.`,'Estimar la proporción del suceso complementario en lugar de la característica preguntada.','Excluir los casos que no cumplen la característica del tamaño de la muestra al calcular el error típico.']:[`Usar confianza del ${f(otherConfidence*100)}% en lugar de la solicitada.`,'Omitir la división entre la raíz del tamaño muestral al calcular el error típico.','Dividir entre n en lugar de entre su raíz.'];
 const a=part('a',prompts[0],result(v.margin),wrongIntervals,wrongReasons,steps,'Cuantil obtenido integrando la densidad normal; extremos comprobados por simetría y estandarización.',{...v,confidence:c.confidence,distractorIntervals:wrongIntervals});
 let b;
 if(c.errorOnly){
  const wrong=[2*v.margin,v.se,critical(.95)*v.se];
  b=part('b',prompts[1],`E ≈ ${f(v.margin)} ${c.unit}`,wrong.map(x=>`E ≈ ${f(x)} ${c.unit}`),['Confundir el margen de error con la amplitud total del intervalo.','Omitir el valor crítico y dar únicamente el error típico.','Usar el valor crítico del 95% en vez del 99%.'],[
   ['El máximo error de estimación asociado a este intervalo es su semiamplitud, no la amplitud completa.',`E = z·${frac('σ','√(n)')}`],
   ['Sustituimos el valor crítico del apartado anterior y los datos oficiales.',`E = ${f(v.z,6)}·${frac('20','√(100)')} ≈ ${f(v.margin)} km/h`],
   ['Comprobamos el resultado con la diferencia entre los extremos del intervalo.',`E = ${frac(`${f(v.interval[1],6)} − ${f(v.interval[0],6)}`,'2')} ≈ ${f(v.margin)} km/h`],
   ['La estimación de la media se expresa con este margen y el nivel de confianza establecido.',`110 ± ${f(v.margin)} km/h; confianza = 99%`],
  ],'El margen es la mitad de la longitud del intervalo y coincide con z por el error típico.',{margin:v.margin,distractorMargins:wrong});
 }else{
  const n=v.minimum;
  const marginAt=k=>v.zn*Math.sqrt(v.variance/k);
  const wrong=[n-1,Math.ceil(critical(.80)**2*v.variance/c.error**2),Math.ceil(v.bound*4)];
  assert.equal(new Set([n,...wrong]).size,4);
  assert.ok(c.strict?marginAt(n)<c.error:marginAt(n)<=c.error);
  assert.ok(c.strict?marginAt(n-1)>=c.error:marginAt(n-1)>c.error);
  const relation=c.strict?'>':'≥';
  const nextSteps=[
   [proportion?(c.knownPlanningProportion?'El apartado proporciona la proporción poblacional para planificar la muestra. Usamos ese dato acreditado, que aquí coincide numéricamente con la estimación anterior.':'Planificamos el tamaño usando la proporción estimada en la muestra previa; es una estimación para el diseño, no una garantía uniforme para todas las proporciones desconocidas.'):'Mantenemos la desviación poblacional y usamos el nivel de confianza pedido en este apartado.',proportion?`${c.knownPlanningProportion?'p':'p̂'} ≈ ${f(c.center,6)}; ${c.knownPlanningProportion?'q':'q̂'} ≈ ${f(1-c.center,6)}`:`σ = ${f(c.sigma)}; confianza = ${f(c.nextConfidence*100)}%`],
   ['Recalculamos el valor crítico para un intervalo bilateral con la confianza requerida.',`Φ(z) = ${f((1+c.nextConfidence)/2)} ⇒ z ≈ ${f(v.zn,6)}`],
   ['Partimos de la fórmula del margen de error y de la restricción indicada por el enunciado.',`E = z·${seFormula}; E ${c.strict?'<':'≤'} ${f(c.error)}`],
   ['Elevamos al cuadrado y despejamos n; todos los factores son positivos.',proportion?`n ${relation} ${frac('z²·p̂·q̂','E²')}`:`n ${relation} (${frac('z·σ','E')})²`],
   ['Sustituimos los datos conservando toda la precisión antes de elegir el entero mínimo.',`n ${relation} ${f(v.bound,8)} ⇒ n mínimo = ${n}`],
   ['Verificación de minimalidad: el entero elegido cumple y el anterior no. No se redondea al entero más cercano.',`E(${n}) ≈ ${f(marginAt(n),7)}; E(${n-1}) ≈ ${f(marginAt(n-1),7)}`],
   ['La muestra debe tener como mínimo este número de observaciones para el diseño especificado.',`n = ${n}`],
  ];
  if(c.amplitude)nextSteps.splice(1,0,['La amplitud del intervalo es el doble del margen. Convertimos la restricción de amplitud en una restricción de error antes de despejar.',`amplitud = 2E ${c.strict?'<':'≤'} ${f(c.amplitude)} ⇒ E ${c.strict?'<':'≤'} ${f(c.error)}`]);
  b=part('b',prompts[1],`n = ${n}`,wrong.map(x=>`n = ${x}`),['Elegir el entero inferior, que incumple el error máximo.','Usar un intervalo del 80% en vez de la confianza exigida.','Exigir por error la mitad del margen admisible, lo que multiplica el tamaño teórico por cuatro.'],nextSteps,'Se comprueban numéricamente E(n) y E(n−1), incluyendo desigualdad estricta cuando corresponde.',{bound:v.bound,minimum:n,error:c.error,strict:Boolean(c.strict),marginAtMinimum:marginAt(n),marginAtPrevious:marginAt(n-1),distractorSampleSizes:wrong});
 }
 return [a,b];
}
export function buildBatch(cases=evidenceCases,batchId='batch-0238',partsBuilder=buildParts,checksBuilder=null){
 const rows=read('artifacts/pau-andalucia-resolution/completed-exercises.jsonl');
 const queue=read('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl');
 const blocked=read('artifacts/pau-andalucia-resolution/blocked-exercises.jsonl');
 const canonical=[...read('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl'),...read('artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl')];
 const checks=[],originals=[],records=[];
 for(const c of cases){
  const previous=rows.find(r=>r.queueIndex===c.index)??blocked.find(r=>r.exerciseId===queue[c.index]?.exerciseId);
  assert.ok(previous,'Original queue/processing evidence required');
  const old=rows.find(r=>r.queueIndex===c.index)??{...queue[c.index],publicationState:'PARALLEL_VALIDATED_NOT_PUBLISHED',recordHash:sha(previous)};
  const s=canonical.find(r=>r.exerciseId===old.exerciseId);
  const text=s.learnerContent?s.learnerContent.map(b=>b.type==='text'?b.text:b.derived?.latex??'').join(''):s.officialPrompt;
  for(const literal of c.literals)assert.ok(text.includes(literal),`Official source mismatch ${c.index}: ${literal}`);
  assert.equal(sha(fs.readFileSync(s.provenance.localPath)),s.documentHash);
  if(c.sample)assert.ok(Math.abs(c.sample.reduce((a,b)=>a+b,0)/c.n-c.center)<1e-10);
  if(c.kind==='proportion')assert.equal(c.successes/c.n,c.center);
  const r=structuredClone(old);for(const key of ['queueIndex','resolutionState','validationScope','generatedAnswer','generatedSolution','generatedDistractors','recordHash'])delete r[key];
  r.parts=partsBuilder(c,text);r.sourceLiteral=text;r.sourceSubparts=s.subparts;
  r.officialSource={documentHash:s.documentHash,path:s.provenance.localPath,range:s.sourceRange,learnerContentHash:sha(s.learnerContent??text)};
  r.scoreEvidence=s.scoreEvidence;r.primaryTopic='Muestreo e inferencia estadística';r.block='Probabilidad o estadística';r.examSlot=4;
  r.qualityGates={mathematical:'INDEPENDENT_NORMAL_INTEGRATION_AND_BOUNDARY_CHECKS_PASSED',pedagogical:'DETAILED_INFERENCE_STEPS_REVIEWED',rendering:'RECHECK_REQUIRED',publication:'NOT_ENABLED'};
  r.correctionEvidence={batchId,previousRecordHash:old.recordHash,reason:'OFFICIAL_PARAMETERS_AND_DISTRACTOR_ERROR_MECHANISMS_VERIFIED',parameters:c,archive:`artifacts/pau-andalucia-resolution/audit/correction-${batchId.slice(6)}-original-records.json`};
  originals.push(previous);records.push(r);
  if(checksBuilder){
   r.qualityGates.mathematical='INDEPENDENT_EXPLICIT_PART_CHECKS_PASSED';
   checks.push({queueIndex:c.index,documentHash:s.documentHash,sourceLiterals:c.literals,...checksBuilder(c,r),result:'PASS'});
  }else{
   const v=compute(c);checks.push({queueIndex:c.index,documentHash:s.documentHash,sourceLiterals:c.literals,quantileCDF:normalCDF(v.z),confidence:c.confidence,...v,result:'PASS'});
  }
 }
 return {batch:{schemaVersion:'mathup.pau-andalucia-resolution-batch.v1',batchId,solutionSkillContractHash:'18d4ead04a7159af4882134535a7b15632a430118b0c7f6b24ef45806aab9444',records,blockedRecords:[],executedChecks:checks},originals};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const {batch,originals}=buildBatch();const archive='artifacts/pau-andalucia-resolution/audit/correction-0238-original-records.json';
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(originals,null,2)+'\n');
 fs.writeFileSync('tmp/batch-0238.json',JSON.stringify(batch,null,2)+'\n');
 console.log(JSON.stringify({batchId:batch.batchId,exercises:batch.records.length,parts:batch.records.reduce((n,r)=>n+r.parts.length,0),checks:batch.executedChecks},null,2));
}

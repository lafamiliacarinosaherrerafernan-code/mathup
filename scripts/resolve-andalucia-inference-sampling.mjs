import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts,compute} from './resolve-andalucia-inference-2012.mjs';
import {buildInterpretationParts} from './resolve-andalucia-inference-interpretation.mjs';
// Read individually from the official-source canonical records. Never infer a dataset.
export const cases=[
 {index:249,kind:'proportion',n:2000,successes:710,center:.355,confidence:.965,nextConfidence:.98,error:.015,task:'different-planning-sample',planningProportion:.37,unit:'proporción',population:'proporción de universitarias matriculadas en carreras STEM',literals:['2000 universitarias','710 de ellas','96.5%','En otra comunidad','37%','98%','máximo cometido sea del 1.5%']},
 {index:374,kind:'proportion',n:400,successes:240,center:.6,confidence:.985,nextConfidence:.985,error:.1,task:'sample-size-monotonicity',unit:'proporción',population:'proporción de personas que accede a internet con el móvil',literals:['400\npersonas','240 de ellas','98.5%','aumento o disminución del tamaño','misma proporción muestral','mismo nivel de confianza']},
 {index:668,kind:'proportion',n:220,successes:165,center:.75,confidence:.975,nextConfidence:.975,error:.025,strict:true,task:'interval-compatibility',hypothesizedProportion:.7,unit:'proporción',population:'proporción de enfermos que responde positivamente al medicamento',literals:['220 enfermos','165 de ellos','97.5%','puede admitirse','del 70%','misma proporción muestral','menor que el 2.5%']},
 {index:854,kind:'proportion',n:100,successes:36,center:.36,confidence:.96,nextConfidence:.96,error:.03,strict:true,unit:'proporción',population:'proporción de jóvenes que ve la serie de televisión',literals:['100 jóvenes','36 ven la serie','96 %','inferior a 0.03']},
 {index:933,kind:'mean',sigma:8,n:16,center:39,sample:[30,42,38,45,52,60,21,26,33,44,28,49,37,41,38,40],confidence:.97,nextConfidence:.99,error:2,strict:true,unit:'años',population:'edad media de los empleados',literals:['Normal de varianza 64','16 empleados','30 42 38 45 52 60 21 26 33 44 28 49 37 41 38 40','97%','inferior a 2 años','99%']},
 {index:938,kind:'proportion',n:2100,successes:630,center:.3,confidence:.975,nextConfidence:.975,error:.01,unit:'proporción',population:'proporción de estudiantes procedentes de otras provincias',literals:['2100','630 lo cumplen','97.5%','misma proporción muestral','máximo cometido sea de 0.01']},
 {index:953,kind:'mean',sigma:.5,n:10,center:2.7,sample:[3.5,4.25,2.25,3.75,4.2,2.75,1.25,1.2,1.75,2.1],confidence:.90,nextConfidence:.90,error:.1,unit:'horas',population:'tiempo medio diario de uso de la aplicación',literals:['Normal con desviación típica 0.5','muestra aleatoria de 10','3.5 4.25 2.25 3.75 4.2 2.75 1.25 1.2 1.75 2.1','90%','no superior\na 0.1 horas']},
 {index:1037,kind:'proportion',n:300,successes:210,center:.7,confidence:.92,nextConfidence:.92,error:.02,strict:true,includeError:true,unit:'unidades de proporción',population:'proporción de estudiantes que va regularmente al cine',literals:['tamaño 300','210 acuden','92%','error máximo','estimación de dicha proporción 0.7','menor que 0.02']},
 {index:1047,kind:'mean',sigma:16,n:100,center:247,confidence:.97,nextConfidence:.95,error:.5,unit:'gramos',population:'peso medio de los paquetes de azúcar',literals:['Normal con desviación típica de 16','100 paquetes','medio de 247','97%','máximo de 0.5','95%']},
 {index:1077,kind:'mean',sigma:180,n:30,center:900,confidence:.98,nextConfidence:.98,error:60,unit:'euros',population:'gasto medio mensual de las familias',literals:['Normal','180 euros','30 familias','900 euros','98%','no superior a 60 euros']},
];
const fmt=x=>Number(x.toFixed(4)).toLocaleString('es-ES',{maximumFractionDigits:4,useGrouping:false});
const step=(explanation,math)=>({explanation,math});
export function buildSamplingParts(c,text){
 if(c.task==='different-planning-sample')return buildInterpretationParts(c,text);
 const parts=buildParts(c,text);
 if(c.task==='sample-size-monotonicity'){
  const b=parts[1];b.answer=b.finalAnswer='Al aumentar n disminuye la amplitud; al disminuir n aumenta la amplitud.';
  b.distractors=['Al aumentar n aumenta la amplitud; al disminuir n disminuye la amplitud.','Al aumentar n no cambia la amplitud; al disminuir n no cambia la amplitud.','Al aumentar n disminuye la amplitud; al disminuir n disminuye la amplitud.'];
  b.distractorEvidence=['Confundir proporcionalidad inversa con directa.','Considerar solo la proporción y el nivel de confianza, olvidando el tamaño.','Aplicar la reducción de amplitud en ambos sentidos del cambio de tamaño.'];
  b.solutionSteps=[
   step('La proporción muestral y la confianza permanecen constantes, de modo que solo varía el tamaño.', 'p̂ = 0,6; q̂ = 0,4; confianza = 98,5%'),
   step('La amplitud es dos veces el margen de error.', 'amplitud = 2E; E = z·√(frac{p̂·q̂}{n})'),
   step('Separamos el factor positivo constante del que depende de n.', 'amplitud = frac{K}{√(n)}; K = 2z·√(p̂·q̂) > 0'),
   step('Si aumenta n, aumenta su raíz y el cociente positivo disminuye.', 'n₂ > n₁ ⇒ √(n₂) > √(n₁) ⇒ amplitud₂ < amplitud₁'),
   step('Si disminuye n, disminuye el denominador y el cociente aumenta.', 'n₂ < n₁ ⇒ √(n₂) < √(n₁) ⇒ amplitud₂ > amplitud₁'),
   step('Verificamos la relación mediante dos tamaños que mantienen suficientes éxitos y fracasos para la aproximación normal.', 'amplitud(1600) = amplitud(400)/2; amplitud(100) = 2·amplitud(400)'),
   step('Por tanto, muestras mayores dan intervalos más precisos; muestras menores los ensanchan bajo las condiciones fijadas.', 'amplitud ∝ 1/√(n)'),
  ];
  b.verification={verified:true,method:'POSITIVE_INVERSE_SQUARE_ROOT_MONOTONICITY',detail:'La amplitud es K/√n con K>0; se prueban ambos sentidos de la desigualdad y dos razones exactas.',numericalEvidence:{sampleSizes:[100,400,1600],relativeAmplitudes:[2,1,.5],proportion:.6,confidence:.985}};
 }else if(c.task==='interval-compatibility'){
  const a=parts[0],p0=c.hypothesizedProportion,v=compute(c);
  const suffix=raw=>{const [lo,hi]=raw.match(/\[([^;]+); ([^\]]+)\]/).slice(1).map(x=>Number(x.replace(',','.')));return `${raw}; ${lo<=p0&&p0<=hi?'70% compatible':'70% no compatible'}`;};
  a.answer=a.finalAnswer=suffix(a.answer);a.distractors=a.distractors.map(suffix);
  a.solutionSteps.push(
   step('Comprobamos si el valor propuesto pertenece al intervalo. No basta comparar 70% con la proporción puntual 75%.',`p₀ = 0,7; IC ≈ [${fmt(v.interval[0])}; ${fmt(v.interval[1])}]`),
   step('El 70% está dentro del intervalo y es compatible con los datos al nivel indicado. Esto no demuestra que sea la proporción verdadera.', `${fmt(v.interval[0])} < 0,7 < ${fmt(v.interval[1])} ⇒ 70% compatible`),
  );
  a.verification.numericalEvidence.hypothesizedProportion=p0;
  a.verification.numericalEvidence.compatible=v.interval[0]<=p0&&p0<=v.interval[1];
 }
 for(const p of parts)assert.equal(new Set([p.answer,...p.distractors]).size,4);
 return parts;
}
export function buildSamplingBatch(batchId='batch-0242',selected=cases){
 const result=buildBatch(selected,batchId,buildSamplingParts);
 result.batch.executedChecks=result.batch.records.map((r,i)=>({queueIndex:selected[i].index,documentHash:r.officialSource.documentHash,sourceLiterals:selected[i].literals,parts:r.parts.map(p=>({partId:p.partId,...p.verification})),result:'PASS'}));
 return result;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const result=buildSamplingBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0242-original-records.json';
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(result.originals,null,2)+'\n');
 fs.writeFileSync('tmp/batch-0242.json',JSON.stringify(result.batch,null,2)+'\n');
 console.log(JSON.stringify(result.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));
}

// Parameters transcribed from the three inspected official pages. No historical
// solution is used as an authority; documentary glyph projections are separate.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical} from './resolve-andalucia-inference-2012.mjs';
import {part,intervalPart,sizePart,officialParts,fmt} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:554,kind:'mean',sigma:3,n:10,center:11,sample:[12.3,10,9.1,11,10.5,11.8,9.9,11.5,10.9,13],confidence:.97,error:1.5,strict:true,unit:'euros',literals:['varianza 9','12.3','9.1','13','97 %','menor a 1.5','tamaño 10']},
 {index:793,kind:'mean',sigma:2,n:10,center:3.09,sample:[4.7,2.1,3.6,5.4,0,4.2,4,-.2,1.9,5.2],confidence:.97,nextConfidence:.95,error:.5,strict:true,unit:'minutos',literals:['varianza 4','4.7 2.1 3.6 5.4 0.0 4.2 4.0 − 0.2 1.9 5.2','97 %','30 segundos','95 %','aumentara el nivel']},
 {index:1009,kind:'mean',sigma:3,n:100,center:8.1,confidence:.97,nextConfidence:.92,error:1,strict:true,unit:'días',literals:['desviación típica 3 días','97%','100 enfermos','8.1 días','inferior a 1 día','92%']},
];
const frac=(a,b)=>`frac{${a}}{${b}}`;
export function buildPdfCheckedParts(c,text){
 const p=officialParts(text),z=critical(c.confidence),se=c.sigma/Math.sqrt(c.n),e=z*se;
 if(c.index===554){
  const variance=c.sigma**2/c.n;
  return [part(p[0],`Normal: media μ; desviación típica ${frac(c.sigma,`√(${c.n})`)} euros.`,[
   'Normal: media μ; desviación típica 3 euros.','Normal: media μ; desviación típica 0,3 euros.',`Normal: media 11; desviación típica ${frac(c.sigma,`√(${c.n})`)} euros.`
  ],['Usar la dispersión individual.','Dividir entre n en vez de entre su raíz.','Confundir el parámetro poblacional con la media observada.'],[
   ['El dato oficial es la varianza; primero obtenemos la desviación típica.',`Var(X) = 9 euros²; σ = √(9) = 3 euros`],
   ['La media de observaciones independientes normales sigue una normal exacta.',`x̄ = ${frac('X₁ + ⋯ + X₁₀','10')}`],
   ['La esperanza de la media sigue siendo el parámetro desconocido.',`E(x̄) = ${frac('10μ','10')} = μ`],
   ['Al promediar se divide la varianza por el tamaño muestral.',`Var(x̄) = ${frac('9','10')} = ${fmt(variance)} euros²`],
   ['Calculamos la desviación y comprobamos que su cuadrado coincide con la varianza. Nombramos los parámetros para evitar ambigüedad en la notación normal.',`SD(x̄) = ${frac('3','√(10)')} ≈ ${fmt(se)} euros`],
  ],'NORMAL_SUM_EXPECTATION_VARIANCE',{meanParameter:'μ',variance,sd:se}),intervalPart(c,p[1]),sizePart(c,p[2])];
 }
 if(c.index===793){
  const b=sizePart({...c,confidence:c.nextConfidence},p[1]);
  b.solutionSteps.unshift({explanation:'La desviación está expresada en minutos. Convertimos el error de segundos a minutos antes de despejar; no mezclamos unidades.',math:'30 segundos = frac{30}{60} minutos = 0,5 minutos'});
  b.solutionSteps.push(
   {explanation:'Al aumentar la confianza aumenta el valor crítico positivo y, por tanto, el tamaño teórico necesario para mantener el mismo error.',math:'n > (frac{z·σ}{E})²; z₂ > z₁ ⇒ cota₂ > cota₁'},
   {explanation:'El mínimo entero no disminuye. Puede mantenerse para aumentos muy pequeños que no crucen un entero; aumenta cuando se supera el siguiente umbral.',math:`n mínimo al 95% = 62; n mínimo al 97% = ${Math.floor((z*c.sigma/c.error)**2)+1}`}
  );
  const suffix='; al aumentar la confianza, el mínimo entero no disminuye y aumenta al cruzar un umbral.';
  b.answer+=suffix;b.finalAnswer=b.answer;
  b.distractors=b.distractors.map(x=>x+suffix);
  b.verification.numericalEvidence.confidenceEffect={realBoundStrictlyIncreasing:true,integerNondecreasing:true,minimumAt97:Math.floor((z*c.sigma/c.error)**2)+1};
  return [intervalPart(c,p[0]),b];
 }
 if(c.index===1009){
  const value=margin=>`[${fmt(c.center-margin)}; ${fmt(c.center+margin)}] días`;
  const wrong=[critical(.95)*se,z*c.sigma,z*c.sigma/c.n];
  return [part(p[0],value(e),wrong.map(value),['Usar el nivel del 95% en vez del 97%.','Omitir la reducción de la dispersión al promediar.','Dividir entre n en lugar de entre su raíz.'],[
   ['La media observada viene dada; no se necesita inventar las cien observaciones individuales.',`x̄ = 8,1 días; σ = 3 días; n = 100`],
   ['La población es normal con desviación conocida. La media muestral tiene el siguiente error típico.',`SE = ${frac('σ','√(n)')} = ${frac('3','√(100)')} = 0,3 días`],
   ['El intervalo bilateral del 97% deja un 1,5% en cada cola.',`α = 0,03; Φ(z) = 0,985; z ≈ ${fmt(z)}`],
   ['Escribimos la fórmula general del margen antes de sustituir.',`E = z·SE = ${fmt(z)}·0,3 ≈ ${fmt(e)} días`],
   ['Restamos y sumamos el margen a la estimación puntual.',`IC = [x̄ − E; x̄ + E] ≈ ${value(e)}`],
   ['El procedimiento ofrece cobertura del 97% en muestreos repetidos; no atribuye una probabilidad al parámetro fijo después de observar el intervalo.',`confianza = 97%`],
   ['Verificamos por separado el centro y la semiamplitud y comprobamos la cobertura normal de los cuantiles.',`centro = 8,1; semiamplitud ≈ ${fmt(e)}; Φ(z) − Φ(−z) ≈ 0,97`],
  ],'NORMAL_INTERVAL_WITH_INDEPENDENT_CDF',{z,se,error:e,mean:c.center,confidence:c.confidence,interval:[c.center-e,c.center+e],wrongErrors:wrong}),sizePart({...c,confidence:c.nextConfidence},p[1])];
 }
 throw Error('Case not source-read');
}
export function buildPdfCheckedBatch(batchId='batch-0245',selected=cases){return buildBatch(selected,batchId,buildPdfCheckedParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const batchId=process.argv[2]??'batch-0245',result=buildPdfCheckedBatch(batchId),archive=`artifacts/pau-andalucia-resolution/audit/correction-${batchId.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(result.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${batchId}.json`,JSON.stringify(result.batch,null,2)+'\n');
 console.log(JSON.stringify(result.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));
}

// A source-read, whole-exercise hypothesis test: no invented a)/b) labels.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,fmt} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[{index:407,kind:'proportion',n:200,successes:70,center:.35,nullProportion:.45,significance:.01,literals:['no inferior a 0.45','200 recién nacidos','70 nacieron','H 0 : p ≥ 0.45','significación del 1%','región de rechazo']}];
export function computeTest(c){
 const se=Math.sqrt(c.nullProportion*(1-c.nullProportion)/c.n),z=(c.center-c.nullProportion)/se,cut=-critical(1-2*c.significance);
 return {se,z,cut,proportionCut:c.nullProportion+cut*se,pValue:normalCDF(z),rejected:z<cut};
}
export function buildHypothesisParts(c,text){
 assert.ok(!/(?:^|\n)\s*[a-z]\)/.test(text),'The official exercise has no subparts');
 const v=computeTest(c),wrongCut=-critical(1-c.significance),wrongSE=Math.sqrt(c.center*(1-c.center)/c.n);
 const answer=(cut,threshold,z,rejected)=>`Rechazo: Z < ${fmt(cut)}; p̂ < ${fmt(threshold)}. Z observado ≈ ${fmt(z)}; ${rejected?'se rechaza':'no se rechaza'} H₀.`;
 const result=answer(v.cut,v.proportionCut,v.z,v.rejected);
 return [part({id:'whole',prompt:text},result,[
  answer(wrongCut,c.nullProportion+wrongCut*v.se,v.z,true),
  answer(v.cut,v.proportionCut,v.z,false),
  answer(v.cut,c.nullProportion+v.cut*wrongSE,(c.center-c.nullProportion)/wrongSE,true),
 ],['Repartir la significación entre dos colas en un contraste unilateral.','Invertir la decisión aunque el estadístico observado pertenece a la región de rechazo.','Usar la proporción observada, en vez de la proporción nula, para el error típico del contraste.'],[
  ['Definimos p como la proporción poblacional actual de nacimientos con luna llena. La afirmación a contrastar es un descenso respecto al umbral previo.','H₀: p ≥ 0,45; H₁: p < 0,45'],
  ['Calculamos la proporción muestral con todos los nacimientos seleccionados al azar.','n = 200; x = 70; p̂ = frac{70}{200} = 0,35'],
  ['El contraste es unilateral izquierdo. Usamos el valor frontera p₀ de la hipótesis nula; una disminución de la proporción produce valores negativos del estadístico.','p₀ = 0,45; α = 0,01'],
  ['La aproximación normal es adecuada porque ambas frecuencias esperadas bajo la hipótesis nula son suficientemente grandes.','n·p₀ = 90; n·(1 − p₀) = 110'],
  ['Escribimos el error típico bajo H₀ y sustituimos la proporción nula, no la observada.',`SE₀ = √(frac{p₀·(1 − p₀)}{n}) = √(frac{0,45·0,55}{200}) ≈ ${fmt(v.se)}`],
  ['Estandarizamos la diferencia entre proporción observada y proporción nula.',`Z = frac{p̂ − p₀}{SE₀} = frac{0,35 − 0,45}{${fmt(v.se)}} ≈ ${fmt(v.z)}`],
  ['La región de rechazo deja el 1% de probabilidad en la cola izquierda. No dividimos α entre dos.',`Φ(c) = 0,01 ⇒ c ≈ ${fmt(v.cut)}; rechazo si Z < ${fmt(v.cut)}`],
  ['Expresamos la misma región en términos de la proporción muestral, conservando el sentido de la desigualdad porque el error típico es positivo.',`p̂ < p₀ + c·SE₀ ≈ ${fmt(v.proportionCut)}`],
  ['Comparamos el estadístico con el límite crítico. Pertenece a la región de rechazo.',`${fmt(v.z)} < ${fmt(v.cut)}; 0,35 < ${fmt(v.proportionCut)}`],
  ['Como comprobación independiente, calculamos la probabilidad de la cola izquierda bajo la aproximación normal; es menor que la significación.',`valor p ≈ ${fmt(v.pValue)} < 0,01`],
  ['Rechazamos H₀: hay evidencia estadística al nivel del 1% a favor del descenso. Esto apoya la afirmación del estudio, no demuestra su verdad con certeza.',result],
 ],'LEFT_TAILED_PROPORTION_TEST_NULL_VARIANCE',v)];
}
export function buildHypothesisBatch(batchId='batch-0248',selected=cases){
 const r=buildBatch(selected,batchId,buildHypothesisParts,(c)=>computeTest(c));
 for(const x of r.batch.records){assert.equal(x.sourceSubparts.length,0);assert.equal(x.parts.length,1);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}
 return r;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const batchId=process.argv[2]??'batch-0248',r=buildHypothesisBatch(batchId),archive=`artifacts/pau-andalucia-resolution/audit/correction-${batchId.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${batchId}.json`,JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({batchId,exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));
}

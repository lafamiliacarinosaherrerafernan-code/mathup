// Official 2025 Matemáticas II statements, read against PDF page 2.
// Normal integration and inverse-CDF; no historical answer used as input.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,normalCDF,critical} from './resolve-andalucia-inference-2012.mjs';
import {orderedOfficialParts} from './resolve-andalucia-probability-event-models.mjs';
import {part,fmt} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:1245,kind:'bearings',literals:['media 13 mm','0,1 mm','12,9 mm y 13,15 mm','media\n12,9 mm','0,2 mm','15 de julio']},
 {index:1316,kind:'radar',literals:['70','media 64 km/h','4 km/h','72 km/h','63,6 km/h','5,05 %','80 km/h']},
];
const value=(n,unit='')=>`${fmt(n,6)}${unit}`;
function probabilityPart(prompt,{mean,sd,lower,upper,wrong,reasons,extra=[]}){
 const lo=(lower-mean)/sd,hi=(upper-mean)/sd,p=normalCDF(hi)-normalCDF(lo);
 return part(prompt,value(p),wrong.map(n=>value(n)),reasons,[
  ['Definimos X como el diámetro de una bola; la normal se especifica mediante media y desviación típica.',`μ = ${fmt(mean)} mm; σ = ${fmt(sd)} mm`],
  ['El intervalo de funcionamiento óptimo es el mismo aunque cambie la máquina.',`${fmt(lower)} ≤ X ≤ ${fmt(upper)}`],
  ...extra,
  ['Tipificamos cada extremo usando los parámetros de este apartado.',`Z = frac{X − ${fmt(mean)}}{${fmt(sd)}}; z inferior = ${fmt(lo)}; z superior = ${fmt(hi)}`],
  ['En una normal continua, incluir o excluir los extremos no cambia la probabilidad.',`P(${fmt(lower)} ≤ X ≤ ${fmt(upper)}) = Φ(${fmt(hi)}) − Φ(${fmt(lo)})`],
  ['Evaluamos ambas probabilidades acumuladas antes de restar.',`${fmt(normalCDF(hi),8)} − ${fmt(normalCDF(lo),8)} ≈ ${fmt(p,8)}`],
  ['Comprobación: la probabilidad óptima más las dos colas exteriores suma uno.',`${fmt(p,8)} + ${fmt(normalCDF(lo),8)} + ${fmt(1-normalCDF(hi),8)} ≈ 1`],
  ['Resultado: proporción de bolas que cumplen simultáneamente ambas cotas.',value(p)],
 ],'NORMAL_INTERVAL_INTEGRATION_AND_COMPLEMENT',{mean,sd,lower,upper,lo,hi,value:p,wrong});
}
export function buildMatesNormalParts(c,text){
 const ps=orderedOfficialParts(text).map(p=>({...p,prompt:p.prompt.replace(/\[\s*\d+(?:[.,]\d+)?\s*puntos?\s*\]/gi,'').trim()}));
 assert.equal(ps.length,2);
 if(c.kind==='bearings')return [
  probabilityPart(ps[0],{mean:13,sd:.1,lower:12.9,upper:13.15,wrong:[1-(normalCDF(1.5)-normalCDF(-1)),normalCDF(1.5),2*normalCDF(1)-1],reasons:['Dar la probabilidad de diámetro no óptimo.','Omitir la cota inferior y dar la acumulada superior.','Tratar el intervalo asimétrico como si fuera simétrico a una desviación.']}),
  probabilityPart(ps[1],{mean:12.9,sd:.2,lower:12.9,upper:13.15,wrong:[2*normalCDF(1.25)-1,normalCDF(1.5)-normalCDF(-1),1-normalCDF(1.25)],reasons:['Duplicar el área positiva como si se pidiera un intervalo simétrico.','Mantener los parámetros anteriores a la avería.','Dar solamente la cola por encima del límite superior.'],extra:[['El 15 de julio cambia tanto la media como la desviación: no reutilizamos los parámetros ideales.','μ = 12,9; σ = 0,2; el límite inferior coincide con μ']]}),
 ];
 const p=1-normalCDF(2),percent=100*p,wrong=[100*(1-normalCDF(1.5)),100*normalCDF(2),p];
 const a=part(ps[0],value(percent,'%'),wrong.map(x=>value(x,'%')),['Usar el límite legal de 70 en vez del umbral de disparo de 72.','Elegir la cola inferior en lugar de la superior.','Escribir la probabilidad como porcentaje sin multiplicar por cien.'],[
  ['Definimos X como velocidad en el primer sentido, con la distribución indicada.','μ = 64 km/h; σ = 4 km/h'],
  ['Para ser sancionado se debe alcanzar el umbral del radar, no solo superar la velocidad legal.','X ≥ 72 km/h'],
  ['Tipificamos el umbral.', 'z = frac{72 − 64}{4} = 2'],
  ['Se pide la cola superior de la normal estándar.','P(X ≥ 72) = P(Z ≥ 2) = 1 − Φ(2)'],
  ['Evaluamos la probabilidad y la convertimos en porcentaje.',`P ≈ ${fmt(p,8)}; porcentaje = 100P ≈ ${fmt(percent,6)}%`],
  ['Comprobamos la dirección: el umbral está dos desviaciones por encima de la media, por lo que la cola es pequeña.',`Φ(2) + P ≈ ${fmt(normalCDF(2),8)} + ${fmt(p,8)} = 1`],
  ['Resultado: porcentaje de vehículos sancionados.',value(percent,'%')],
 ],'NORMAL_UPPER_TAIL_AND_PERCENT_CONVERSION',{mean:64,sd:4,threshold:72,z:2,value:percent,wrong});
 const cumulative=1-.0505,z=critical(2*cumulative-1),sigma=(80-63.6)/z,wrongSigma=[(80-63.6)*z,sigma*sigma,(80-64)/z];
 const b=part(ps[1],value(sigma,' km/h'),wrongSigma.map(x=>value(x,' km/h')),['Multiplicar por el cuantil en vez de dividir.','Confundir varianza y desviación típica.','Usar la media del primer sentido en lugar de 63,6.'],[
  ['En sentido contrario la media está dada, pero la desviación típica es desconocida.','μ = 63,6 km/h; σ > 0'],
  ['Convertimos el porcentaje de la cola superior a probabilidad acumulada.','P(X > 80) = 0,0505 ⇒ P(X ≤ 80) = 0,9495'],
  ['Tipificamos conservando σ como incógnita.','Φ((80 − 63,6)/σ) = 0,9495'],
  ['Buscamos el cuantil normal correspondiente.',`z = Φ⁻¹(0,9495) ≈ ${fmt(z,8)}`],
  ['Despejamos la desviación positiva; no se pide la varianza.',`frac{16,4}{σ} = ${fmt(z,8)} ⇒ σ = frac{16,4}{${fmt(z,8)}} ≈ ${fmt(sigma,8)} km/h`],
  ['Con una tabla redondeada, z ≈ 1,64 y σ ≈ 10. No interpretamos las últimas cifras como precisión experimental.','σ ≈ 10 km/h'],
  ['Comprobación independiente: sustituimos σ y recuperamos la probabilidad oficial.',`1 − Φ(16,4/${fmt(sigma,8)}) ≈ 0,0505`],
  ['Resultado de la desviación típica en el segundo sentido.',value(sigma,' km/h')],
 ],'NORMAL_INVERSE_CDF_AND_BACK_SUBSTITUTION',{mean:63.6,threshold:80,tail:.0505,cumulative,z,sigma,wrong:wrongSigma});
 return [a,b];
}
export function buildMatesNormalBatch(id='batch-0276',selected=cases){const result=buildBatch(selected,id,buildMatesNormalParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const r of result.batch.records){assert.equal(r.subject,'Matemáticas II');r.primaryTopic='Distribución normal';r.secondaryTopics=['Tipificación','Probabilidad normal'];r.block='Probabilidad y estadística';r.examSlot=5;}return result;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatesNormalBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0276-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0276.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

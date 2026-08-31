// Individually read official statements. No historical answer is an input.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt,intervalPart,sizePart} from './resolve-andalucia-inference-multipart.mjs';
import {distribution} from './resolve-andalucia-inference-distribution-completion.mjs';
export const cases=[
 {index:1035,kind:'mean',task:'eggs',sigma:1.23,n:24,center:67.3,total:1615.2,confidence:.96,error:.4,unit:'g',literals:['desviación típica 1.23 gramos','dos docenas','1615.2 gramos','96%','amplitud máxima de 0.8']},
 {index:1540,kind:'mean',task:'grades',sigma:3,n:100,center:5.7,confidence:.95,nextConfidence:.99,error:.5,unit:'puntos',literals:['desviación típica 3 puntos','100 alumnos','5.7 puntos','95%','0.5 puntos','99%']},
 {index:1543,kind:'mean',task:'coffee',sigma:.3,n:9,center:62.66/9,sample:[7,7.1,7,6.93,7.02,7,7.01,6.5,7.1],confidence:.98,unit:'g',literals:['desviación típica 0.3 g','98%','9 sobres','aumento del tamaño','7 7.1 7 6.93 7.02 7 7.01 6.5 7.1']},
 {index:1585,kind:'mean',task:'sample-distribution',sigma:1,n:25,center:6.2,knownMean:true,unit:'puntos',lower:6,upper:6.6,literals:['media 6.2 puntos','desviación típica de 1 punto','tamaño 25','entre 6 y 6.6 puntos']},
];
export function buildLastIntactParts(c,text){
 const p=officialParts(text);assert.equal(p.length,c.task==='coffee'?3:2);
 if(c.task==='eggs'||c.task==='grades'){
  const a=intervalPart(c,p[0]),b=sizePart({...c,confidence:c.nextConfidence??c.confidence},p[1]);
  if(c.task==='eggs'){
   a.solutionSteps[1]={explanation:'Dos docenas son veinticuatro huevos. Dividimos el peso total, no el individual, entre el tamaño de muestra.',math:'n = 2·12 = 24; x̄ = frac{1615,2}{24} = 67,3 g'};
   b.solutionSteps.unshift({explanation:'La amplitud solicitada es la longitud total del intervalo. El margen admisible es su mitad.',math:'2E ≤ 0,8 g ⇒ E ≤ 0,4 g'});
  }
  return[a,b];
 }
 if(c.task==='coffee'){
  const z=critical(c.confidence),se=c.sigma/Math.sqrt(c.n),e=z*se,width=2*e;
  const a=part(p[0],`amplitud ≈ ${fmt(width)} g`,[e,2*z*c.sigma,2*z*c.sigma/c.n].map(v=>`amplitud ≈ ${fmt(v)} g`),['Confundir amplitud con margen.','Omitir la raíz del tamaño muestral.','Dividir entre n en lugar de entre su raíz.'],[
   ['La población es normal y su desviación típica es conocida; la media de nueve sobres tiene error típico conocido.','σ = 0,3 g; n = 9; SE = frac{0,3}{√(9)} = 0,1 g'],
   ['Un intervalo bilateral del noventa y ocho por ciento deja uno por ciento en cada cola.',`α = 0,02; Φ(z) = 0,99; z ≈ ${fmt(z)}`],
   ['Escribimos el intervalo genérico y distinguimos amplitud y margen.','IC = [x̄ − E; x̄ + E]; E = z·SE; amplitud = 2E'],
   ['Sustituimos para obtener primero la semiamplitud.',`E = ${fmt(z)}·0,1 ≈ ${fmt(e)} g`],
   ['Duplicamos el margen para responder a la longitud pedida.',`amplitud = 2·${fmt(e)} ≈ ${fmt(width)} g`],
   ['La resta de extremos confirma que la media se cancela. No hace falta conocer aún los pesos individuales.',`(x̄ + E) − (x̄ − E) = 2E ≈ ${fmt(width)} g`],
  ],'NORMAL_INTERVAL_WIDTH_INDEPENDENT_QUANTILE',{z,se,margin:e,width,wrong:[e,2*z*c.sigma,2*z*c.sigma/c.n]});
  const b=part(p[1],'Disminuye en proporción inversa a la raíz de n.',['Aumenta en proporción directa a la raíz de n.','Permanece constante si se mantiene la confianza.','Disminuye en proporción inversa a n.'],['Invertir la dependencia del denominador.','Olvidar el efecto del tamaño sobre el error típico.','Confundir raíz de n con n.'],[
   ['La confianza y la desviación típica poblacional se mantienen fijas.','z > 0 constante; σ = 0,3 g constante'],
   ['Expresamos la amplitud en función del tamaño de la muestra.','L(n) = frac{2z·σ}{√(n)}'],
   ['Al aumentar n aumenta el denominador positivo; por tanto disminuye el cociente.','n₂ > n₁ ⇒ √(n₂) > √(n₁) ⇒ L(n₂) < L(n₁)'],
   ['La relación entre dos amplitudes hace explícita la raíz cuadrada.','frac{L(n₂)}{L(n₁)} = √(frac{n₁}{n₂})'],
   ['Comprobamos con un cambio de tamaño, sin inventar otra muestra ni sus datos.','L(4n) = frac{L(n)}{2}, no frac{L(n)}{4}'],
   ['Con el mismo nivel de confianza, una muestra mayor proporciona un intervalo más estrecho.','amplitud proporcional a frac{1}{√(n)}'],
  ],'POSITIVE_INVERSE_SQRT_WIDTH',{relativeSize:4,relativeWidth:.5,optionRelativeWidths:[.5,2,1,.25]});
  return[a,b,intervalPart(c,p[2])];
 }
 assert.equal(c.task,'sample-distribution');
 const sd=c.sigma/Math.sqrt(c.n),lo=(c.lower-c.center)/sd,hi=(c.upper-c.center)/sd,value=normalCDF(hi)-normalCDF(lo),wrong=[1-value,normalCDF((c.upper-c.center)/c.sigma)-normalCDF((c.lower-c.center)/c.sigma),normalCDF(hi)],form=x=>`P ≈ ${fmt(x)}`;
 return[distribution(c,p[0]),part(p[1],form(value),wrong.map(form),['Dar la probabilidad exterior.','Usar la dispersión de un alumno en lugar de la dispersión de la media.','Omitir la acumulada inferior.'],[
  ['Usamos la distribución exacta de la media de veinticinco calificaciones normales independientes.','x̄ normal; media 6,2; desviación típica frac{1}{√(25)} = 0,2 puntos'],
  ['Escribimos el suceso solicitado antes de tipificar.','P(6 ≤ x̄ ≤ 6,6)'],
  ['Restamos la media poblacional y dividimos por el error típico de la media.','Z = frac{x̄ − 6,2}{0,2}; Z normal estándar'],
  ['Transformamos separadamente ambos extremos.','frac{6 − 6,2}{0,2} = −1; frac{6,6 − 6,2}{0,2} = 2'],
  ['La probabilidad interior es la diferencia de acumuladas, no su suma.',`P = Φ(2) − Φ(−1) ≈ ${fmt(value)}`],
  ['La simetría normal permite una segunda expresión equivalente.','Φ(−1) = 1 − Φ(1); P = Φ(2) + Φ(1) − 1'],
  ['Contrastamos con integración independiente de la densidad en los dos límites.',`${form(value)}; aproximadamente ${fmt(100*value)}%`],
 ],'SAMPLE_MEAN_PROBABILITY_NORMAL_CDF',{sd,lo,hi,value,wrong})];
}
export function buildLastIntactBatch(id='batch-0278',selected=cases){return buildBatch(selected,id,buildLastIntactParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLastIntactBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0278-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0278.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

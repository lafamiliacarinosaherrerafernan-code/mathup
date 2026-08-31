// Parameters read from seven official PDF exercises. Reversible projection is
// separately bound to the PDF/page/image hashes; historical literals stay intact.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt,intervalPart,sizePart} from './resolve-andalucia-inference-multipart.mjs';
import {sourceProjection} from './project-andalucia-inference-source-glyphs.mjs';
export const cases=[
 {index:457,kind:'mean',task:'nursery',center:10.5,sigma:1.5,n:25,unit:'días',literals:['adaptación a la guardería','entre y días?'],recovered:['10.5 días','1.5 días','25 menores','10 días','tamaño 25','entre 8 y 11 días']},
 {index:550,kind:'mean',task:'glasses',center:12.5,sigma:2.5,n:16,unit:'días',literals:['gafas progresivas','diste de días a lo sumo día?'],recovered:['12.5 días','2.5 días','16 individuos','12 días','tamaño 25','12 días a lo sumo 1 día']},
 {index:559,kind:'mean',task:'appointment',center:11.3,sigma:4.2,n:30,confidence:.97,nextConfidence:.95,error:.6,unit:'días',literals:['Atención Primaria','afirmación de la gerencia'],recovered:['4.2 días','30 usuarios','11.3 días','97 %','9.8 días','95 %','0.6 días']},
 {index:885,kind:'mean',task:'anchovies',center:2404.5/30,total:2404.5,sigma:1,n:30,confidence:.99,error:.3,strict:true,unit:'g',literals:['latas de anchoas','nivel de confianza manteniendo el mismo tamaño muestral'],recovered:['1 g','30 latas','2404.5 g','99 %','0.3 g']},
 {index:983,kind:'mean',task:'diameter',center:81,sigma:3,variance:9,n:144,confidence:.985,error:.45,width:.9,unit:'mm',literals:['diámetro','amplitud máxima'],recovered:['9 mm²','144 piezas','81 mm','98.5 %','0.9 mm','80.4 mm','64 piezas','79.5 y 80.7 mm']},
 {index:1224,kind:'mean',task:'battery',center:50,sigma:Math.sqrt(8),variance:8,n:100,confidence:.94,error:.1,strict:true,unit:'meses',literals:['batería de coche','media de años y meses'],recovered:['8 meses²','100 clientes','4 años y 2 meses','94 %','0.1 meses']},
 {index:1506,kind:'mean',task:'prawns',center:53,sigma:5,n:100,confidence:.975,unit:'g',literals:['gamba roja de Garrucha','peso medio de la muestra'],recovered:['5 g','100 gambas','53 g','97.5 %','64 gambas','53.25 g']},
];
function probability(p,{mean,sigma,n,lo=null,hi=null,unit,distribution=false,percentage=false,wrongOverride=null}){
 const sd=sigma/Math.sqrt(n),cdf=x=>normalCDF(x),zlo=lo===null?null:(lo-mean)/sd,zhi=hi===null?null:(hi-mean)/sd;
 const value=(zhi===null?1:cdf(zhi))-(zlo===null?0:cdf(zlo));
 const alt=s=> (hi===null?1:cdf((hi-mean)/s))-(lo===null?0:cdf((lo-mean)/s));
 const wrong=wrongOverride??[1-value,alt(sigma),alt(sigma/n)];
 const reasons=wrongOverride?['Medir la distancia respecto a la media poblacional 12,5 en vez del valor 12 solicitado.','Usar la dispersión individual en vez de la de la media.','Tomar el complemento del intervalo.']:['Tomar el complemento del suceso pedido.','Usar la desviación individual, sin dividir entre la raíz del tamaño.','Dividir la desviación entre n en lugar de entre su raíz.'];
 const prefix=distribution?`Normal: media ${fmt(mean)} ${unit}; desviación ${fmt(sd)} ${unit}; `:'';
 const form=x=>`${prefix}${percentage?'porcentaje':'P'} ≈ ${fmt(x*(percentage?100:1))}${percentage?'%':''}`;
 assert.ok(wrong.every(x=>x>=0&&x<=1&&Math.abs(x-value)>1e-5));
 assert.equal(new Set([value,...wrong].map(x=>fmt(x))).size,4);
 const event=lo===null?`x̄ ≤ ${fmt(hi)}`:hi===null?`x̄ > ${fmt(lo)}`:`${fmt(lo)} ≤ x̄ ≤ ${fmt(hi)}`;
 return part(p,form(value),wrong.map(form),reasons,[
  ['La población es normal. Para una muestra aleatoria independiente, su media es normal exactamente.',`μ = ${fmt(mean)} ${unit}; σ = ${fmt(sigma)} ${unit}; n = ${n}`],
  ['Por linealidad, el centro de la media muestral coincide con la media de la población.',`E(x̄) = μ = ${fmt(mean)} ${unit}`],
  ['Sumamos varianzas independientes y dividimos entre el cuadrado del tamaño al formar la media.',`Var(x̄) = frac{σ²}{n} = ${fmt(sd*sd)} ${unit}²; SD(x̄) = frac{${fmt(sigma)}}{√(${n})} = ${fmt(sd)} ${unit}`],
  ['Escribimos el suceso sobre la media, no sobre un individuo. En una distribución continua, incluir los extremos no cambia la probabilidad.',`P(${event})`],
  ['Tipificamos con el error típico de la media.',`Z = frac{x̄ − ${fmt(mean)}}{${fmt(sd)}}`],
  ['Transformamos cada extremo finito manteniendo el sentido de las desigualdades.',`${zlo===null?'':`z inferior = ${fmt(zlo)}`}${zlo!==null&&zhi!==null?'; ':''}${zhi===null?'':`z superior = ${fmt(zhi)}`}`],
  ['La función Φ acumula hacia la izquierda. Usamos la cola complementaria o la diferencia de acumuladas según el suceso.',`P = ${zhi===null?'1':`Φ(${fmt(zhi)})`} − ${zlo===null?'0':`Φ(${fmt(zlo)})`} ≈ ${fmt(value)}`],
  [percentage?'Multiplicamos por cien para expresar el porcentaje de muestras solicitado.':'El resultado se refiere a medias de muestras de este tamaño, no al porcentaje de individuos.',form(value)],
  ['La integración de la densidad y una segunda evaluación independiente de la normal deben coincidir; comprobamos también el área complementaria.',`P interior + P complementaria = ${fmt(value)} + ${fmt(1-value)} = 1`],
 ],'NORMAL_SAMPLE_MEAN_CDF_INDEPENDENT_REFERENCE',{mean,sigma,n,sd,variance:sd*sd,lo,hi,zlo,zhi,value,wrong,distribution,percentage});
}
export function buildPdfNumeralParts(c,text){
 const p=officialParts(text);assert.equal(p.length,['anchovies','diameter'].includes(c.task)?3:2);
 if(c.task==='nursery')return[
  probability(p[0],{mean:10.5,sigma:1.5,n:25,lo:10,unit:'días',distribution:true}),
  probability(p[1],{mean:10.5,sigma:1.5,n:25,lo:8,hi:11,unit:'días',percentage:true}),
 ];
 if(c.task==='glasses'){
  const b=probability(p[1],{mean:12.5,sigma:2.5,n:25,lo:11,hi:13,unit:'días',wrongOverride:[normalCDF(2)-normalCDF(-2),normalCDF(.2)-normalCDF(-.6),1-(normalCDF(1)-normalCDF(-3))]});
  b.solutionSteps.unshift({explanation:'«Distar de 12 a lo sumo 1» se traduce en un intervalo centrado en 12. No debe centrarse en la media poblacional 12,5.',math:'|x̄ − 12| ≤ 1 ⇒ 11 ≤ x̄ ≤ 13'});
  return[probability(p[0],{mean:12.5,sigma:2.5,n:16,lo:12,unit:'días',distribution:true}),b];
 }
 const a=intervalPart(c,p[0]);
 if(c.task==='appointment'){
  const v=a.verification.numericalEvidence;assert.ok(v.interval[0]<9.8&&9.8<v.interval[1]);
  const suffix=s=>{const [l,u]=s.match(/\[([^;]+); ([^\]]+)\]/).slice(1).map(x=>Number(x.replace(',','.')));return `${s}; 9,8 días ${l<=9.8&&9.8<=u?'compatible':'no compatible'}`;};
  a.answer=a.finalAnswer=suffix(a.answer);a.distractors=a.distractors.map(suffix);
  a.solutionSteps.push({explanation:'Comprobamos si la cifra declarada por la gerencia está dentro del intervalo.',math:`${fmt(v.interval[0])} < 9,8 < ${fmt(v.interval[1])}`},{explanation:'La afirmación es compatible al nivel de confianza indicado. El intervalo no demuestra que 9,8 sea el valor verdadero.',math:'9,8 días compatible'});
  v.hypothesized=9.8;v.compatible=true;
  return[a,sizePart({...c,confidence:c.nextConfidence},p[1])];
 }
 if(c.task==='anchovies'){
  a.solutionSteps[1]={explanation:'Se proporciona el peso total de treinta latas. Lo dividimos entre treinta para estimar el peso medio.',math:'x̄ = frac{2404,5}{30} = 80,15 g'};
  const d=part(p[2],'Aumentar n disminuye E; aumentar la confianza aumenta E.',['Aumentar n aumenta E; aumentar la confianza aumenta E.','Aumentar n disminuye E; aumentar la confianza disminuye E.','Aumentar n no cambia E; aumentar la confianza no cambia E.'],['Invertir la dependencia respecto a la raíz del tamaño.','Ignorar que una mayor cobertura exige un cuantil mayor.','Omitir ambos factores de la fórmula del margen.'],[
   ['Para un intervalo bilateral con desviación conocida, el margen depende de dos factores positivos.', 'E = z·frac{σ}{√(n)}'],
   ['Si mantenemos la confianza, el cuantil z y la desviación σ no cambian.', 'E₂/E₁ = √(n₁/n₂)'],
   ['Un tamaño mayor aumenta el denominador y reduce el margen. Cuadruplicar la muestra lo reduce a la mitad.', 'n₂ = 4n₁ ⇒ E₂/E₁ = 1/2'],
   ['Al mantener el tamaño, la dispersión de la media tampoco cambia. Para aumentar la confianza se necesita abarcar mayor área central normal.', 'confianza = 2Φ(z) − 1'],
   ['Como Φ es estrictamente creciente, mayor confianza exige mayor z, y por tanto mayor margen.', 'confianza₂ > confianza₁ ⇒ z₂ > z₁ ⇒ E₂ > E₁'],
   ['Las dos comparaciones mantienen fijas las restantes condiciones; no se compensan cambios simultáneos no especificados.', 'n aumenta: E disminuye; confianza aumenta: E aumenta'],
  ],'NORMAL_MARGIN_MONOTONICITY',{sizeRatio:4,marginRatio:.5,confidenceDerivativePositive:true});
  return[a,sizePart(c,p[1]),d];
 }
 if(c.task==='diameter'){
  a.solutionSteps.unshift({explanation:'El dato oficial es una varianza; la desviación que entra en el intervalo es su raíz.',math:'σ² = 9 mm² ⇒ σ = 3 mm'});
  const b=sizePart(c,p[1]);b.solutionSteps.unshift({explanation:'La amplitud del intervalo es el doble del margen. Convertimos la anchura máxima antes de dimensionar la muestra.',math:'2E ≤ 0,9 mm ⇒ E ≤ 0,45 mm'});
  return[a,b,probability(p[2],{mean:80.4,sigma:3,n:64,lo:79.5,hi:80.7,unit:'mm',distribution:true})];
 }
 if(c.task==='battery'){
  a.solutionSteps.unshift({explanation:'Expresamos la media en meses y extraemos la desviación a partir de la varianza oficial. No mezclamos años con meses.',math:'x̄ = 4·12 + 2 = 50 meses; σ² = 8 meses² ⇒ σ = √(8) meses'});
  const b=sizePart(c,p[1]);b.solutionSteps.unshift({explanation:'El error se expresa en meses, por lo que conservamos también la desviación en meses.',math:'σ = √(8) meses; E < 0,1 meses'});
  return[a,b];
 }
 assert.equal(c.task,'prawns');return[a,probability(p[1],{mean:53,sigma:5,n:64,lo:53.25,unit:'g'})];
}
export function buildPdfNumeralBatch(id='batch-0281',selected=cases){
 const r=buildBatch(selected,id,buildPdfNumeralParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));
 r.batch.records.forEach((record,i)=>{const c=selected[i],projection=sourceProjection({...record,queueIndex:c.index});for(const s of c.recovered)assert.ok(projection.text.includes(s),`PDF anchor ${c.index}: ${s}`);record.correctionEvidence.pdfParameterRecovery={evidence:projection.evidence,changes:projection.changes,recoveredLiterals:c.recovered};});
 return r;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPdfNumeralBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0281-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0281.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

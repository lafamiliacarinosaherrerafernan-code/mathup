// Parameters transcribed from the three official page-one A4 exercises.
// The official literals and scores remain immutable evidence.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:798,kind:'proportion',n:200,successes:19,center:.095,confidence:.95,nextConfidence:.99,error:.02,unit:'proporción',population:'proporción de balances incorrectos',task:'interval-size',literals:['200 balances','19 de ellos','95%','99%','0.02']},
 {index:1435,kind:'proportion',n:350,successes:50,center:50/350,confidence:.98,target:2/15,unit:'proporción',task:'interval-compatibility',literals:['350 individuos','50 son adultos','98%','2 /15']},
 {index:1491,kind:'proportion',n:500,successes:118,center:118/500,confidence:.93,unit:'proporción',task:'interval-margin',literals:['500','118 afirman','93%','error cometido']},
];
const interval=(x,e)=>`[${fmt(x-e)}; ${fmt(x+e)}]`;
export function values(c){const z=critical(c.confidence),se=Math.sqrt(c.center*(1-c.center)/c.n),margin=z*se;return {z,se,margin,lower:c.center-margin,upper:c.center+margin};}
export function buildProportionParts(c,text){
 if(c.task==='interval-size')return buildParts(c,text);
 const ps=officialParts(text),v=values(c);assert.equal(ps.length,2);
 const errors=[critical(.95)*v.se,v.z*Math.sqrt(c.center*(1-c.center)),v.z*Math.sqrt(c.center*(1-c.center))/c.n];
 const a=part(ps[0],interval(c.center,v.margin),errors.map(e=>interval(c.center,e)),[
  'Usar el 95% en lugar del nivel solicitado.','Omitir el tamaño muestral en el error típico.','Dividir por n en vez de por su raíz.'
 ],[
  ['La proporción poblacional es desconocida; la estimamos mediante la frecuencia relativa observada.',`n = ${c.n}; x = ${c.successes}; p̂ = frac{${c.successes}}{${c.n}} ≈ ${fmt(c.center)}`],
  ['Comprobamos que hay suficientes casos de ambos tipos para emplear la aproximación normal del intervalo de Wald.',`np̂ = ${c.successes}; n(1 − p̂) = ${c.n-c.successes}`],
  ['El intervalo es bilateral: repartimos el riesgo entre ambas colas.',`α = ${fmt(1-c.confidence)}; Φ(z) = ${fmt((1+c.confidence)/2)}; z ≈ ${fmt(v.z)}`],
  ['Calculamos el error típico estimado de la proporción.',`SE = √(frac{p̂(1 − p̂)}{n}) ≈ ${fmt(v.se)}`],
  ['El margen es el cuantil multiplicado por el error típico, no la desviación de un único individuo.',`E = z·SE ≈ ${fmt(v.margin)}`],
  ['Restamos y sumamos el margen a la proporción muestral.',`IC = [p̂ − E; p̂ + E] ≈ ${interval(c.center,v.margin)}`],
  ['En muestreos repetidos, este procedimiento cubre aproximadamente la proporción fija con la confianza indicada. No es la probabilidad posterior de esa proporción.',`confianza = ${fmt(c.confidence*100)}%`],
  ['Verificamos centro, semiamplitud y cobertura normal; los extremos están entre cero y uno.',`centro ≈ ${fmt(c.center)}; semiamplitud ≈ ${fmt(v.margin)}; Φ(z) − Φ(−z) ≈ ${fmt(normalCDF(v.z)-normalCDF(-v.z))}`],
 ],'PROPORTION_INTERVAL_INDEPENDENT_NORMALDIST',{...v,p:c.center,n:c.n,wrongMargins:errors});
 if(c.task==='interval-margin'){
  const wrong=[2*v.margin,v.se,v.margin/2];
  return [a,part(ps[1],`E ≈ ${fmt(v.margin)}`,wrong.map(e=>`E ≈ ${fmt(e)}`),['Confundir margen con anchura total.','Omitir el cuantil de confianza.','Dividir otra vez entre dos un margen ya calculado.'],[
   ['El error máximo estimado es la semiamplitud del intervalo anterior, no su anchura total.',`E = frac{L superior − L inferior}{2}`],
   ['Sustituimos los extremos calculados sin redondear internamente.',`E ≈ frac{${fmt(v.upper)} − ${fmt(v.lower)}}{2} ≈ ${fmt(v.margin)}`],
   ['Comprobamos por la fórmula directa del intervalo de proporción.',`E = z·√(frac{p̂(1 − p̂)}{n})`],
   ['El error depende del tamaño, la frecuencia estimada y el nivel del 93%.',`E ≈ ${fmt(v.z)}·${fmt(v.se)} ≈ ${fmt(v.margin)}`],
   ['Convertimos a puntos porcentuales si se desea comunicar el margen sobre el porcentaje de trabajadores.',`100E ≈ ${fmt(100*v.margin)} puntos porcentuales`],
   ['No conocemos el error real entre p̂ y la proporción poblacional: lo calculado es el margen de confianza estimado.',`p̂ ± E ≈ ${fmt(c.center)} ± ${fmt(v.margin)}`],
  ],'INTERVAL_HALF_WIDTH_AND_DIRECT_MARGIN',{...v,wrongMargins:wrong})];
 }
 assert.equal(c.task,'interval-compatibility');
 const compatible=c.target>=v.lower&&c.target<=v.upper;assert.equal(compatible,true);
 const answer=`Sí: ${fmt(v.lower)} < ${fmt(c.target)} < ${fmt(v.upper)}.`;
 const distractors=[`No: ${fmt(c.target)} < ${fmt(v.lower)} < ${fmt(v.upper)}.`,`No: ${fmt(v.lower)} < ${fmt(v.upper)} < ${fmt(c.target)}.`,`Sí: ${fmt(v.lower)} < ${fmt(1-c.target)} < ${fmt(v.upper)}.`];
 return [a,part(ps[1],answer,distractors,['Situar el valor propuesto debajo del límite inferior.','Situarlo por encima del límite superior.','Comprobar la proporción complementaria en lugar de la de adultos.'],[
  ['El valor propuesto se compara con el intervalo del mismo nivel de confianza.',`p₀ = frac{2}{15} ≈ ${fmt(c.target)}; confianza = 98%`],
  ['Recuperamos los extremos del apartado anterior sin sustituirlos por un intervalo de otro nivel.',`IC ≈ ${interval(c.center,v.margin)}`],
  ['El valor propuesto supera el límite inferior.',`${fmt(c.target)} − ${fmt(v.lower)} ≈ ${fmt(c.target-v.lower)} > 0`],
  ['También es menor que el límite superior.',`${fmt(v.upper)} − ${fmt(c.target)} ≈ ${fmt(v.upper-c.target)} > 0`],
  ['Comprobamos de forma equivalente que su distancia al centro no supera el margen.',`|p₀ − p̂| ≈ ${fmt(Math.abs(c.target-c.center))} < E ≈ ${fmt(v.margin)}`],
  ['Por tanto, puede admitirse como compatible con el intervalo al 98%. La pertenencia no prueba que la proporción sea exactamente ese valor.',answer],
 ],'TARGET_MEMBERSHIP_AND_DISTANCE_TO_CENTER',{...v,target:c.target,compatible,wrongClaims:['target < lower','target > upper','1-target inside interval']})];
}
export function buildProportionBatch(id='batch-0258',selected=cases){return buildBatch(selected,id,buildProportionParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildProportionBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0258-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0258.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

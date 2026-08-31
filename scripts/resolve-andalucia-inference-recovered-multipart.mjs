// Complete, source-inspected exercises previously held without a usable solution.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,normalCDF,critical} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt,intervalPart,sizePart} from './resolve-andalucia-inference-multipart.mjs';
import {buildMixedParts} from './resolve-andalucia-inference-mixed-final.mjs';
export const cases=[
 {index:631,task:'school-proportional',kind:'finite',strata:[160,120,120,80,240,200],fraction:.05,secondCount:9,literals:['160 alumnos','120 en 2º','120 en 3º','80','240','200','proporcional','5 %','9\nalumnos de 2º']},
 {index:1054,task:'interval-size-tail',kind:'mean',sigma:3,n:100,center:8.1,confidence:.97,nextConfidence:.92,error:1,strict:true,populationMean:7.61,tailN:36,threshold:8,unit:'días',literals:['desviación típica 3 días','100 titulados','8.1 días','97%','92%','inferior a un día','7.61 días','36 titulados','superior a 8 días']},
 {index:1080,task:'inverse-interval-new-population',kind:'mean',sigma:140,interval:[517.65,551.95],endpointDecimals:2,confidence:.95,nextN:78,nextConfidence:.97,otherMean:540,otherSigma:150,bounds:[600,700],unit:'euros',literals:['140 €','95%','517.65 , 551.95','78 hipotecas','97%','otra ciudad','540 €','150 €','600 y 700']},
 {index:1149,task:'interval-interpretation-tail',kind:'mean',sigma:5,n:10,center:27,sample:[20,25,30,35,35,20,20,25,30,30],confidence:.98,testedMean:35,populationMean:27.2,threshold:20,unit:'minutos',literals:['desviación típica de 5','10 individuos','20, 25, 30, 35, 35, 20, 20, 25, 30, 30','98%','superior a 35','27.2 minutos','pasados 20 minutos']},
];
export const sourceImages={631:'9b069a537fc95cb126a2a559cbcfd8e8592142779b158166ea899127169f8f36',1054:'f2b821263ddb77236a02cb3b7cea15bb667c3ff7b1fb60a8d312085401993b4b',1080:'dadda232c7ca2a92c96f0791719517cf5ddce65b31157d526945a627fc4bd67c',1149:'9f30c63d5e93286cc64642c8f86543d229c4666851dbfd7366262f4798c7c648'};
const f=fmt,frac=(a,b)=>`frac{${a}}{${b}}`;
const allocation=(p,c,counts,fraction)=>{
 const total=c.strata.reduce((a,b)=>a+b,0),n=counts.reduce((a,b)=>a+b,0),labels=['1.º ESO','2.º ESO','3.º ESO','4.º ESO','1.º Bachillerato','2.º Bachillerato'];
 const format=xs=>`Total ${xs.reduce((a,b)=>a+b,0)}: (${xs.join('; ')}) en el orden de los seis cursos.`;
 const swapped=[...counts];[swapped[0],swapped[1]]=[swapped[1],swapped[0]];
 const shifted=counts.map((x,i)=>x+(i===0?1:i===3?-1:0)),wrongTotal=counts.map(x=>2*x),wrong=[swapped,shifted,wrongTotal];
 return part(p,format(counts),wrong.map(format),['Intercambiar las cuotas de primero y segundo de ESO.','Trasladar una plaza entre cursos sin conservar la proporción.','Duplicar el tamaño solicitado manteniendo solo las proporciones.'],[
  ['Identificamos seis estratos y sumamos su alumnado.',`N = 160 + 120 + 120 + 80 + 240 + 200 = ${total}`],
  ['El enunciado exige representación proporcional: todos los cursos deben tener la misma fracción de selección.',`nᵢ = n·${frac('Nᵢ','N')} = r·Nᵢ`],
  p.id==='a'?['La comisión representa el cinco por ciento del alumnado total.',`r = 0,05; n = 0,05·${total} = ${n}`]:['Las nueve plazas de segundo de ESO determinan la fracción común, no el tamaño total de la comisión.',`r = ${frac('9','120')} = ${f(fraction)}; n = ${f(fraction)}·${total} = ${n}`],
  ...counts.map((x,i)=>[`Aplicamos la misma fracción al curso ${labels[i]}.`,`n(${labels[i]}) = ${f(fraction)}·${c.strata[i]} = ${x}`]),
  ['Comprobamos la suma de las seis plazas y sus razones respecto a las poblaciones originales. Todos los resultados son enteros: no hay ajuste por redondeo.',`${counts.join(' + ')} = ${n}; nᵢ/Nᵢ = ${f(fraction)}`],
  ['Damos tanto el tamaño de la comisión como su composición completa.',format(counts)],
 ],'PROPORTIONAL_STRATIFIED_ALLOCATION_EXACT',{total,n,fraction,counts,wrong});
};
function upperTail(c,p,{sample=false}={}){
 const n=sample?c.tailN:1,se=c.sigma/Math.sqrt(n),z=(c.threshold-c.populationMean)/se,prob=1-normalCDF(z);
 const wrong=[normalCDF(z),1-normalCDF((c.threshold-c.populationMean)/(sample?c.sigma:c.sigma/Math.sqrt(c.n))),1-normalCDF((c.threshold-c.populationMean)/(sample?c.sigma/n:Math.sqrt(c.sigma)))];
 const result=(x,sd=se)=>sample?`Media muestral normal: media ${f(c.populationMean)}; desviación ${f(sd)} ${c.unit}; P(x̄ > ${f(c.threshold)}) ≈ ${f(x)}`:`P(X > ${f(c.threshold)}) ≈ ${f(x)}`;
 return part(p,result(prob),wrong.map((x,i)=>result(x,sample&&i>0?(i===1?c.sigma:c.sigma/n):se)),['Dar la probabilidad complementaria.','Confundir una observación individual y una media de varias observaciones.','Confundir desviación, varianza o reducción por el tamaño muestral.'],[
  [sample?'Este apartado proporciona una media poblacional y un nuevo tamaño muestral. No usamos la estimación del apartado a).':'El estudio posterior proporciona una media poblacional. Aquí se pregunta por un paciente, no por la media de los diez pacientes anteriores.',`μ = ${f(c.populationMean)} ${c.unit}; σ = ${f(c.sigma)} ${c.unit}`],
  [sample?'La media de observaciones independientes normales es normal exactamente; calculamos su esperanza y desviación.':'El tiempo de un paciente es normal con los parámetros dados; no dividimos la desviación entre la raíz de diez.',sample?`E(x̄) = ${f(c.populationMean)}; SD(x̄) = ${frac(f(c.sigma),`√(${n})`)} = ${f(se)} ${c.unit}`:`E(X) = ${f(c.populationMean)}; SD(X) = ${f(se)} ${c.unit}`],
  ['Traducimos el suceso a una cola superior. La continuidad hace irrelevante incluir el instante exacto.',`P(${sample?'x̄':'X'} > ${f(c.threshold)})`],
  ['Tipificamos restando la media y dividiendo por la desviación de la variable correcta.',`z = ${frac(`${f(c.threshold)} − ${f(c.populationMean)}`,f(se))} = ${f(z)}`],
  ['La función de distribución acumula por la izquierda. Restamos a uno para obtener la cola superior.',`P(Z > ${f(z)}) = 1 − Φ(${f(z)}) ≈ ${f(prob)}`],
  ['Comprobación independiente con la integral de la densidad normal; las dos colas deben sumar uno.',`${f(prob)} + ${f(normalCDF(z))} ≈ 1`],
  ['Presentamos todos los resultados que pide el apartado, indicando los parámetros sin ambigüedad.',result(prob)],
 ],'NORMAL_TAIL_WITH_EXPLICIT_RANDOM_VARIABLE',{n,se,z,probability:prob,wrong,mean:c.populationMean,randomVariable:sample?'sample-mean':'individual'});
}
export function buildRecoveredParts(c,text){
 const p=officialParts(text);let ps;
 if(c.task==='school-proportional')ps=[allocation(p[0],c,c.strata.map(n=>n*c.fraction),c.fraction),allocation(p[1],c,c.strata.map(n=>n*c.secondCount/c.strata[1]),c.secondCount/c.strata[1])];
 else if(c.task==='interval-size-tail')ps=[intervalPart(c,p[0]),sizePart({...c,confidence:c.nextConfidence},p[1]),upperTail(c,p[2],{sample:true})];
 else if(c.task==='inverse-interval-new-population'){
  const beforeC=text.slice(0,text.search(/\n\s*c\)/));ps=buildMixedParts({...c,task:'inverse-rounded-size'},beforeC);
  const [lo,hi]=c.bounds,zlo=(lo-c.otherMean)/c.otherSigma,zhi=(hi-c.otherMean)/c.otherSigma,prob=normalCDF(zhi)-normalCDF(zlo),wrong=[1-prob,normalCDF(zhi),normalCDF(zhi*Math.sqrt(c.nextN))-normalCDF(zlo*Math.sqrt(c.nextN))],answer=x=>`P(${lo} < X < ${hi}) ≈ ${f(x)}`;
  ps.push(part(p[2],answer(prob),wrong.map(answer),['Calcular la probabilidad de quedar fuera del intervalo.','Olvidar restar la probabilidad por debajo del límite inferior.','Utilizar el error típico de 78 hipotecas, aunque se pregunta por una hipoteca individual de otra ciudad.'],[
   ['La ciudad y los parámetros cambian en este apartado. Definimos X como la cuota de una hipoteca individual.',`μ = 540 euros; σ = 150 euros`],
   ['Expresamos el suceso pedido, manteniendo ambos extremos.',`600 < X < 700`],
   ['Tipificamos cada extremo con la desviación individual, no con un error típico muestral.',`z inferior = ${frac('600 − 540','150')} = ${f(zlo)}; z superior = ${frac('700 − 540','150')} ≈ ${f(zhi)}`],
   ['Una probabilidad entre dos puntos es la diferencia de sus probabilidades acumuladas.',`P(600 < X < 700) = Φ(${f(zhi)}) − Φ(${f(zlo)})`],
   ['Evaluamos sin redondear prematuramente el extremo superior.',`P ≈ ${f(normalCDF(zhi))} − ${f(normalCDF(zlo))} ≈ ${f(prob)}`],
   ['Verificamos por integración de la densidad en el intervalo y por la suma con las dos colas exteriores.',`${f(normalCDF(zlo))} + ${f(prob)} + ${f(1-normalCDF(zhi))} ≈ 1`],
  ],'INDIVIDUAL_NORMAL_BETWEEN_LIMITS',{zlo,zhi,probability:prob,wrong,randomVariable:'individual'}));
 }else{
  assert.equal(c.task,'interval-interpretation-tail');const ip=intervalPart(c,p[0]),e=critical(c.confidence)*c.sigma/Math.sqrt(c.n),suffix='; una media superior a 35 no es compatible con este intervalo.';
  const old=ip.answer;ip.answer+=suffix;ip.finalAnswer=ip.answer;
  ip.distractors=[old+'; una media superior a 35 sí es compatible con este intervalo.',ip.distractors[0]+suffix,ip.distractors[1]+'; una media superior a 35 sí es compatible con este intervalo.'];
  ip.distractorEvidence=['Invertir la interpretación del límite superior del intervalo.','Usar un nivel de confianza distinto.','Usar la desviación individual como error típico, ensanchar indebidamente el intervalo y admitir medias superiores a 35.'];
  ip.solutionSteps.push({explanation:'El extremo superior del intervalo está por debajo de 35. Por tanto, según este intervalo, no se admite una media superior a 35. Esto no significa que ningún paciente pueda tardar más de 35 minutos.',math:`límite superior ≈ ${f(c.center+e)} < 35 minutos`});
  ip.verification.numericalEvidence.interpretation={threshold:35,upperBelowThreshold:c.center+e<35};
  ps=[ip,upperTail(c,p[1])];
 }
 assert.equal(ps.length,p.length);return ps;
}
export function buildRecoveredBatch(batchId='batch-0256',selected=cases){return buildBatch(selected,batchId,buildRecoveredParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const x=buildRecoveredBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0256-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(x.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0256.json',JSON.stringify(x.batch,null,2)+'\n');console.log(JSON.stringify(x.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

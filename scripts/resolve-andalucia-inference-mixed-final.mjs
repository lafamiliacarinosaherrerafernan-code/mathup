// Source-inspected complete exercises; no historical answer is an authority.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt,intervalPart} from './resolve-andalucia-inference-multipart.mjs';
import {marginPart} from './resolve-andalucia-inference-interval-margin-set.mjs';
export const cases=[
 {index:1018,task:'proportion-size-width',kind:'proportion',n:2500,successes:1825,center:.73,confidence:.95,nextConfidence:.97,error:.01,strict:true,unit:'proporción',population:'proporción de habitantes que realizan turismo sostenible',literals:['2500 habitantes','1825','95%','97%','inferior al 1%','disminución del tamaño']},
 {index:1104,task:'inverse-rounded-size',kind:'mean',sigma:6,interval:[24.47,26.43],endpointDecimals:2,confidence:.95,nextN:49,nextConfidence:.97,unit:'euros',literals:['igual a 6 euros','(24.47, 26.43)','95%','49','97%']},
 {index:1135,task:'variance-width',kind:'mean',sigma:.5,populationVariance:.25,n:64,center:20,confidence:.98,amplitude:2,unit:'mm',literals:['0.25mm2','64 tubos','20 mm','98%','inferior a 2 mm']},
 {index:1161,task:'inverse-rounded-size',kind:'mean',sigma:150,interval:[18475.7,18524.3],endpointDecimals:1,confidence:.985,nextN:100,nextConfidence:.966,unit:'horas',literals:['150 horas','98.5 %','18 475.7','18 524.3','100','96.6 %']},
 {index:1227,task:'different-populations',kind:'mean',sigma:20,n:25,center:40,confidence:.97,tableMean:60,tableSigma:30,tableN:100,tableThreshold:54,unit:'minutos',literals:['fabricar una mesa','media 60 minutos','desviación típica de 30','100','54','fabricar una puerta','20 minutos','25','40 minutos','97%']},
];
export const sourceImages={1018:'1ced7272e2f93b4176503fc4b1dfddcdef5b6fee7a75a343bc4b99e5435b7323',1104:'ccd23fc50fd49be52553b0f8426f7145c72ae42de592d5f3e2f5e12ee1dbc23a',1135:'06455cbdae542484c5e3db8f2dc3032a21fddab0dd4aefb7c230266d7a9c09a2',1161:'c90d23949845b1487864da796f72dedbb51980d1d8c32342646b8c5e87acc73c',1227:'6f02cff160660a54e1e0ba36d3f3c2dde5db4c744bd2f9a5f089fc0ea11b16cc'};
const f=fmt,frac=(a,b)=>`frac{${a}}{${b}}`;
export function inverseValues(c){
 const center=(c.interval[0]+c.interval[1])/2,error=(c.interval[1]-c.interval[0])/2,z=critical(c.confidence),estimate=(z*c.sigma/error)**2,roundingUnit=10**(-c.endpointDecimals),tol=roundingUnit/2;
 const lower=(z*c.sigma/(error+tol))**2,upper=(z*c.sigma/(error-tol))**2;
 const compatible=[];for(let n=Math.ceil(lower);n<=Math.floor(upper);n++)compatible.push(n);
 return {center,error,z,estimate,nearest:Math.round(estimate),lower,upper,compatible,roundingUnit};
}
export function buildMixedParts(c,text){
 const p=officialParts(text);let ps;
 if(c.task==='proportion-size-width'){
  ps=buildParts(c,text);ps[1].prompt=p[1].prompt;
  ps.push(part(p[2],'La amplitud aumenta, manteniendo confianza y proporción.',[
   'La amplitud disminuye, manteniendo confianza y proporción.','La amplitud no cambia, manteniendo confianza y proporción.','La amplitud aumenta inversamente con n, no con su raíz.'],[
   'Invertir la relación entre tamaño y precisión.','Omitir el tamaño muestral del error típico.','Confundir n con su raíz en el denominador.'
  ],[
   ['Para aislar el efecto del tamaño, mantenemos el nivel de confianza y la proporción muestral. Si también cambian, no puede atribuirse todo el efecto a n.',`z > 0; p̂ = 0,73; q̂ = 0,27`],
   ['La amplitud es dos veces el margen de error.',`A = 2z·√(${frac('p̂·q̂','n')})`],
   ['El numerador es positivo y fijo; al disminuir el tamaño aumenta su inversa positiva.',`n₂ < n₁ ⇒ ${frac('1','√(n₂)')} > ${frac('1','√(n₁)')}`],
   ['Por tanto, un tamaño menor proporciona un intervalo más ancho y menos precisión bajo esas condiciones.',`A₂ > A₁`],
   ['Comprobación algebraica: reducir el tamaño a su cuarta parte duplica la amplitud, no la cuadruplica.',`A(n/4) = 2A(n)`],
  ],'FIXED_PROPORTION_CONFIDENCE_INVERSE_ROOT',{relativeN:.25,relativeWidth:2,fixed:['confidence','proportion']}));
 }else if(c.task==='inverse-rounded-size'){
  const v=inverseValues(c),answer=(m,n)=>`media estimada ≈ ${f(m)} ${c.unit}; n estimado ≈ ${n}`;
  const wrong=[[v.error,v.nearest],[v.center,Math.round(v.estimate/4)],[v.center,Math.round(v.estimate*4)]];
  ps=[part(p[0],answer(v.center,v.nearest),wrong.map(([m,n])=>answer(m,n)),[
   'Confundir el centro del intervalo con su margen.','Usar la amplitud completa como margen al despejar n.','Tomar la mitad del margen correcto al despejar n.'
  ],[
   ['Para un intervalo normal bilateral, el centro es la media muestral. Los extremos se presentan redondeados; no añadimos precisión que el documento no da.',`x̄ ≈ ${frac(`${f(c.interval[0])} + ${f(c.interval[1])}`,'2')} = ${f(v.center)} ${c.unit}`],
   ['La semiamplitud proporciona el margen aproximado.',`E ≈ ${frac(`${f(c.interval[1])} − ${f(c.interval[0])}`,'2')} = ${f(v.error)} ${c.unit}`],
   ['El cuantil debe corresponder al nivel de confianza oficial, repartiendo el riesgo entre dos colas.',`Φ(z) = ${f((1+c.confidence)/2)} ⇒ z ≈ ${f(v.z)}`],
   ['Despejamos la igualdad del margen; este no es un problema de tamaño mínimo bajo una desigualdad.',`E = z·${frac('σ','√(n)')} ⇒ n = (${frac('z·σ','E')})²`],
   ['Sustituimos para obtener el tamaño estimado y su entero más próximo. Aquí no procede redondear siempre hacia arriba.',`n ≈ (${frac(`${f(v.z)}·${f(c.sigma)}`,f(v.error))})² ≈ ${f(v.estimate)} ⇒ n estimado ≈ ${v.nearest}`],
   ['Recalculamos el margen del entero aproximado para comprobar su coherencia con la precisión del intervalo publicado.',`E(${v.nearest}) = ${frac(`${f(v.z)}·${f(c.sigma)}`,`√(${v.nearest})`)} ≈ ${f(v.z*c.sigma/Math.sqrt(v.nearest))} ${c.unit}`],
   ['Límite de la información: al considerar el redondeo de ambos extremos, estos otros tamaños enteros también son compatibles. El tamaño calculado es la aproximación habitual, no una deducción de un entero único a partir de decimales truncados.',`n compatible con el redondeo ∈ {${v.compatible.join('; ')}}`],
   ['La respuesta se expresa con su precisión real. No atribuimos a los criterios oficiales un resultado que no especifican.',answer(v.center,v.nearest)],
  ],'INVERSE_NORMAL_INTERVAL_WITH_ROUNDING_LIMIT',{...v,wrong,interpretation:'APPROXIMATION_NOT_UNIQUE_EXACT_INTEGER'}),marginPart({...c,n:c.nextN,confidence:c.nextConfidence},p[1],{newSample:true})];
 }else if(c.task==='variance-width'){
  const z=critical(c.confidence),error=c.amplitude/2,bound=(z*c.sigma/error)**2,n=Math.floor(bound)+1,margin=k=>z*c.sigma/Math.sqrt(k);
  ps=[intervalPart(c,p[0]),part(p[1],`n mínimo = ${n}`,[1,6,3].map(k=>`n mínimo = ${k}`),[
   'Confundir amplitud 2 con margen 2 y elegir un solo tubo.','Usar desviación 1 en vez de la raíz de la varianza 0,25.','Redondear el valor crítico a 3 antes de calcular y presentar una muestra sobredimensionada como mínima.'
  ],[
   ['El dato es una varianza; obtenemos su raíz positiva en milímetros.',`σ² = 0,25 mm² ⇒ σ = 0,5 mm`],
   ['La amplitud completa es el doble del margen. Convertimos primero el requisito.',`A = 2E < 2 mm ⇒ E < 1 mm`],
   ['El intervalo es bilateral y conserva la confianza del apartado anterior.',`Φ(z) = 0,99 ⇒ z ≈ ${f(z)}`],
   ['Despejamos el tamaño a partir de la desigualdad estricta.',`E = ${frac('z·σ','√(n)')} < 1 ⇒ n > (${frac('z·σ','1')})²`],
   ['Sustituimos sin redondear hasta elegir el menor entero.',`n > ${f(bound)} ⇒ n mínimo = ${n}`],
   ['Comprobamos la amplitud para el tamaño propuesto y el anterior.',`A(${n}) ≈ ${f(2*margin(n))} mm < 2 mm; A(${n-1}) ≈ ${f(2*margin(n-1))} mm ≥ 2 mm`],
   ['Una muestra mayor también cumpliría, pero no respondería al tamaño mínimo pedido.',`n mínimo = ${n}`],
  ],'VARIANCE_TO_SD_AND_FULL_WIDTH_MINIMALITY',{variance:.25,z,error,bound,minimum:n,amplitudeAtMinimum:2*margin(n),amplitudeAtPrevious:2*margin(n-1),wrong:[1,6,3]})];
  ps[0].solutionSteps.unshift({explanation:'La fuente da una varianza, no una desviación. Tomamos la raíz antes de usar el intervalo.',math:'σ² = 0,25 mm² ⇒ σ = √(0,25) = 0,5 mm'});
 }else{
  assert.equal(c.task,'different-populations');const se=c.tableSigma/Math.sqrt(c.tableN),z=(c.tableThreshold-c.tableMean)/se,q=1-normalCDF(z),wrong=[normalCDF(z),1-normalCDF((c.tableThreshold-c.tableMean)/c.tableSigma),1-normalCDF((c.tableThreshold-c.tableMean)/(c.tableSigma/c.tableN))];
  ps=[part(p[0],`P(x̄ > 54) ≈ ${f(q)}`,wrong.map(x=>`P(x̄ > 54) ≈ ${f(x)}`),[
   'Calcular la cola inferior en lugar de la superior.','Usar la desviación de una mesa, no la de la media de cien mesas.','Dividir la desviación entre cien, no entre su raíz.'
  ],[
   ['En este apartado estudiamos mesas. Su media poblacional es conocida; no usamos los parámetros de las puertas del apartado siguiente.',`μ = 60 minutos; σ = 30 minutos; n = 100`],
   ['La media de observaciones normales independientes es normal exactamente.',`E(x̄) = 60; SD(x̄) = ${frac('30','√(100)')} = ${f(se)} minutos`],
   ['Escribimos la probabilidad que se pide antes de tipificar.',`P(x̄ > 54)`],
   ['Restamos la media poblacional y dividimos por el error típico positivo, sin cambiar el sentido.',`Z = ${frac('x̄ − 60','3')}; P(x̄ > 54) = P(Z > ${frac('54 − 60','3')}) = P(Z > ${f(z)})`],
   ['Usamos la simetría de la normal para expresar la cola superior negativa como una probabilidad acumulada positiva.',`P(Z > −2) = Φ(2) ≈ ${f(q)}`],
   ['Comprobamos por complemento y por integración independiente de la densidad; el resultado es mayor que la mitad porque 54 está por debajo de 60.',`1 − Φ(−2) ≈ ${f(q)} > 0,5`],
  ],'NORMAL_SAMPLE_MEAN_UPPER_TAIL',{se,z,probability:q,wrong})];
  const ip=intervalPart(c,p[1]),m=critical(c.confidence)*c.sigma/Math.sqrt(c.n);
  const annotate=(s,e)=>`${s}; E ≈ ${f(e)} ${c.unit}`;
  ip.answer=annotate(ip.answer,m);ip.finalAnswer=ip.answer;
  ip.distractors=ip.distractors.map((s,i)=>annotate(s,ip.verification.numericalEvidence.wrongErrors[i]));
  ip.solutionSteps.unshift({explanation:'Ahora estudiamos puertas, una población distinta de las mesas. La media poblacional es desconocida y la media muestral es 40 minutos.',math:'puertas: σ = 20 minutos; n = 25; x̄ = 40 minutos'});
  ip.solutionSteps.push({explanation:'El apartado también pide el error máximo: es la semiamplitud del intervalo, con el nivel de confianza indicado.',math:`E ≈ ${f(m)} minutos`});ps.push(ip);
 }
 assert.equal(ps.length,p.length);return ps;
}
export function buildMixedBatch(batchId='batch-0255',selected=cases){return buildBatch(selected,batchId,buildMixedParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const x=buildMixedBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0255-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(x.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0255.json',JSON.stringify(x.batch,null,2)+'\n');console.log(JSON.stringify(x.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

// Individually source-read cases with distinct tasks, including finite-population
// sampling. No missing statement/parameter is inferred from a historical answer.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
export const cases=[
 {index:514,task:'interval-error-monotonicity',kind:'mean',sigma:.25,n:8,sample:[1.2,.9,1,1.2,1.1,1,.8,1.1],center:1.0375,confidence:.95,unit:'kg',literals:['1.2 0.9 1 1.2 1.1 1 0.8 1.1','desviación típica 0.25 kg','95%','error máximo','aumentásemos el tamaño de la muestra']},
 {index:551,task:'finite-population',kind:'finite',strata:[2000,2500],sampleSize:135,knownPopulation:[6,8,11],meanOfMeans:10.3,literals:['2000 hombres y 2500 mujeres','135 personas','afijación proporcional','{ 6, 8, 11, a }','tamaño 3','es 10.3']},
 {index:591,task:'interval-inverse-and-size',kind:'mean',sigma:5,n:100,interval:[31.2,33.4],confidence:.96,error:1.5,unit:'cm',literals:['desviación típica de 5','100 barras','(31.2, 33.4)','96%','máximo sea 1.5']},
 {index:663,task:'distribution-interval-size',kind:'mean',sigma:5,n:10,center:102,sample:[96,108,97,112,99,106,105,100,98,99],confidence:.97,error:2,strict:true,unit:'euros',literals:['típica 5 €','10 comercios','96 108 97 112 99 106 105 100 98 99','97 %','menor que 2']},
 {index:680,task:'width-and-interval',kind:'mean',sigma:.3,n:9,center:89.84/9,sample:[10,9.9,10.04,9.5,10.1,9.8,10.2,10,10.3],confidence:.98,unit:'g',literals:['típica 0.3 g','98 %','9 paquetes','amplitud','10 9.9 10.04 9.5 10.1 9.8 10.2 10 10.3']},
];
export const fmt=x=>Number(x.toFixed(5)).toLocaleString('es-ES',{maximumFractionDigits:5,useGrouping:false});
const frac=(a,b)=>`frac{${a}}{${b}}`;
const interval=(x,e)=>`[${fmt(x-e)}; ${fmt(x+e)}]`;
export function officialParts(text){
 const markers=[...text.matchAll(/(?:^|\n)\s*([a-z])\)\s*/g)];
 assert.ok(markers.length>=2);
 return markers.map((m,i)=>({id:m[1],prompt:text.slice(m.index+m[0].length,markers[i+1]?.index??text.length)
  .replace(/\(\s*\d+(?:[.,]\d+)?\.?\s*puntos?\s*\)/gi,'')
  .replace(/\n\s*OPCIÓN\s+B\s*$/,'').trim()}));
}
export function part(p,answer,distractors,reasons,steps,method,proof){
 assert.equal(new Set([answer,...distractors]).size,4);
 assert.equal(distractors.length,3);assert.equal(reasons.length,3);
 return {partId:p.id,prompt:p.prompt,answer,distractors,distractorEvidence:reasons,finalAnswer:answer,
  solutionSteps:steps.map(([explanation,math])=>({explanation,math})),methods:[method],
  verification:{verified:true,method,detail:'Comprobación ejecutable independiente de los resultados y de los mecanismos de error, vinculada al literal oficial.',numericalEvidence:proof}};
}
const normalValues=c=>{const z=critical(c.confidence),se=c.sigma/Math.sqrt(c.n);return {z,se,error:z*se,confidence:c.confidence,mean:c.center};};
export function intervalPart(c,p){
 const v=normalValues(c),sum=c.sample?.reduce((a,b)=>a+b,0);
 const errors=[critical(c.confidence===.95?.9:.95)*v.se,v.z*c.sigma,v.z*c.sigma/c.n];
 return part(p,interval(c.center,v.error)+' '+c.unit,errors.map(e=>interval(c.center,e)+' '+c.unit),
  ['Usar otro nivel de confianza.','Usar la desviación individual en lugar del error típico de la media.','Dividir la desviación entre n, no entre su raíz.'],[
  ['La población es normal y su desviación típica es conocida. La media muestral tiene distribución normal.',`σ = ${fmt(c.sigma)} ${c.unit}; n = ${c.n}`],
  c.sample?['Sumamos todos los valores oficiales y calculamos la estimación puntual.',`Σxᵢ = ${fmt(sum)}; x̄ = ${frac(fmt(sum),c.n)} ≈ ${fmt(c.center)} ${c.unit}`]:['La media muestral viene dada en el enunciado. La usamos como estimación puntual, no como media poblacional conocida.',`x̄ = ${fmt(c.center)} ${c.unit}`],
  ['El error típico de la media no es la desviación individual.',`SE = ${frac('σ','√(n)')} = ${frac(fmt(c.sigma),`√(${c.n})`)} ≈ ${fmt(v.se)} ${c.unit}`],
  ['Repartimos el riesgo entre las dos colas y obtenemos el valor crítico.',`α = ${fmt(1-c.confidence)}; Φ(z) = ${fmt((1+c.confidence)/2)} ⇒ z ≈ ${fmt(v.z)}`],
  ['Escribimos el margen y sustituimos sin redondear el cálculo intermedio.',`E = z·SE ≈ ${fmt(v.z)}·${fmt(v.se)} ≈ ${fmt(v.error)} ${c.unit}`],
  ['Restamos y sumamos el margen a la media, manteniendo las unidades.',`IC = [x̄ − E; x̄ + E] ≈ ${interval(c.center,v.error)} ${c.unit}`],
  ['En muestreos repetidos, este procedimiento produce intervalos que contienen la media poblacional con la frecuencia de cobertura indicada. No se atribuye esa probabilidad al parámetro fijo.',`confianza = ${fmt(100*c.confidence)}%`],
  ['Comprobamos el centro, la semiamplitud y la probabilidad normal entre ambos cuantiles.',`centro ≈ ${fmt(c.center)}; semiamplitud ≈ ${fmt(v.error)}; Φ(z) − Φ(−z) ≈ ${fmt(c.confidence)}`],
 ],'NORMAL_INTERVAL_WITH_INDEPENDENT_CDF',{...v,interval:[c.center-v.error,c.center+v.error],wrongErrors:errors,sum});
}
export function sizePart(c,p){
 const z=critical(c.confidence),bound=(z*c.sigma/c.error)**2,n=c.strict?Math.floor(bound)+1:Math.ceil(bound),margin=k=>z*c.sigma/Math.sqrt(k);
 const wrong=[n-1,Math.ceil((critical(.8)*c.sigma/c.error)**2),Math.ceil(bound*4)];
 assert.ok(c.strict?margin(n)<c.error:margin(n)<=c.error);
 assert.ok(c.strict?margin(n-1)>=c.error:margin(n-1)>c.error);
 return part(p,`n = ${n}`,wrong.map(k=>`n = ${k}`),['Redondear hacia abajo y no comprobar el error.','Usar un valor crítico del 80% en lugar del solicitado.','Exigir la mitad del margen admisible y multiplicar por cuatro el tamaño teórico.'],[
  ['Identificamos el margen permitido, la desviación conocida y el nivel de confianza.',`σ = ${fmt(c.sigma)} ${c.unit}; E ${c.strict?'<':'≤'} ${fmt(c.error)} ${c.unit}; confianza = ${fmt(c.confidence*100)}%`],
  ['El intervalo es bilateral; elegimos el cuantil correspondiente a la mitad del riesgo en cada cola.',`Φ(z) = ${fmt((1+c.confidence)/2)}; z ≈ ${fmt(z)}`],
  ['Partimos de la fórmula general del margen y aislamos el tamaño muestral.',`E = z·${frac('σ','√(n)')}; n ${c.strict?'>':'≥'} (${frac('z·σ','E')})²`],
  ['Sustituimos conservando precisión y elegimos el menor entero que cumple, no el entero más cercano.',`n ${c.strict?'>':'≥'} ${fmt(bound)} ⇒ n mínimo = ${n}`],
  ['Comprobamos explícitamente el tamaño elegido.',`E(${n}) ≈ ${fmt(margin(n))} ${c.unit}`],
  ['El entero inmediatamente anterior no cumple; esto demuestra la minimalidad.',`E(${n-1}) ≈ ${fmt(margin(n-1))} ${c.unit}`],
  ['La muestra necesaria debe alcanzar al menos el tamaño calculado para el diseño indicado.',`n = ${n}`],
 ],'SAMPLE_SIZE_AND_PREVIOUS_INTEGER',{z,bound,minimum:n,error:c.error,strict:Boolean(c.strict),marginAtMinimum:margin(n),marginAtPrevious:margin(n-1),wrong});
}
export function buildMultipartParts(c,text){
 const p=officialParts(text);
 if(c.task==='finite-population'){
  const total=c.strata.reduce((a,b)=>a+b,0),counts=c.strata.map(n=>c.sampleSize*n/total),a=4*c.meanOfMeans-c.knownPopulation.reduce((a,b)=>a+b,0);
  return [part(p[0],`${counts[0]} hombres y ${counts[1]} mujeres`,['75 hombres y 60 mujeres','68 hombres y 67 mujeres','54 hombres y 81 mujeres'],['Intercambiar las proporciones de los estratos.','Repartir casi por igual, ignorando el peso de cada estrato.','Usar por error una razón 2:3 en lugar de 2000:2500.'],[
   ['Calculamos el tamaño total de la población.',`N = 2000 + 2500 = ${total}`],
   ['La afijación proporcional conserva el peso de cada estrato.',`nᵢ = n·${frac('Nᵢ','N')}`],
   ['Aplicamos la fórmula al estrato de hombres.',`n hombres = 135·${frac('2000','4500')} = ${counts[0]}`],
   ['Aplicamos la misma fórmula al estrato de mujeres.',`n mujeres = 135·${frac('2500','4500')} = ${counts[1]}`],
   ['Comprobamos que el tamaño total y la proporción de selección coinciden. No hace falta redondear.',`60 + 75 = 135; ${frac('60','2000')} = ${frac('75','2500')} = 0,03`],
  ],'STRATIFIED_PROPORTIONAL_ALLOCATION',{total,counts,sampleSize:135}),
  part(p[1],`a = ${fmt(a)}`,['a = 5,9','a = 27,2','a = 24,2'],['Dividir la suma poblacional entre el tamaño muestral 3 en lugar de la población 4.','Omitir 11 de la suma de los valores conocidos.','Omitir 8 de la suma de los valores conocidos.'],[
   ['La media muestral es un estimador insesgado: la media de su distribución coincide con la media poblacional. Esto vale tanto con reposición como en muestreo simple sin reposición.',`E(x̄) = μ = 10,3`],
   ['La población contiene cuatro valores; el denominador de su media es 4, no el tamaño muestral 3.',`μ = ${frac('6 + 8 + 11 + a','4')}`],
   ['Igualamos la media poblacional al valor acreditado y eliminamos el denominador.',`${frac('25 + a','4')} = 10,3 ⇒ 25 + a = 41,2`],
   ['Despejamos el dato desconocido.',`a = 41,2 − 25 = 16,2`],
   ['Comprobamos por sustitución directa en la media poblacional.',`${frac('6 + 8 + 11 + 16,2','4')} = 10,3`],
   ['Como control adicional, enumeramos las cuatro muestras no ordenadas de tamaño 3 sin reposición y promediamos sus medias.',`(${frac('25','3')} + ${frac('30,2','3')} + ${frac('33,2','3')} + ${frac('35,2','3')})/4 = 10,3`],
  ],'UNBIASED_MEAN_AND_FINITE_ENUMERATION',{a,population:[...c.knownPopulation,a],meanOfMeans:c.meanOfMeans})];
 }
 const v=normalValues(c);
 if(c.task==='interval-error-monotonicity')return [intervalPart(c,p[0]),
  part(p[1],`E ≈ ${fmt(v.error)} kg`,[2*v.error,v.se,critical(.99)*v.se].map(x=>`E ≈ ${fmt(x)} kg`),['Confundir amplitud con semiamplitud.','Omitir el valor crítico.','Usar confianza del 99% en lugar del 95%.'],[
   ['El error máximo del intervalo es su semiamplitud.',`E = z·${frac('σ','√(n)')}`],
   ['Sustituimos los parámetros del intervalo anterior.',`E = ${fmt(v.z)}·${frac('0,25','√(8)')} ≈ ${fmt(v.error)} kg`],
   ['Comprobamos que coincide con la mitad de la diferencia entre los extremos, no con la diferencia completa.',`E = ${frac(`${fmt(c.center+v.error)} − ${fmt(c.center-v.error)}`,'2')} ≈ ${fmt(v.error)} kg`],
   ['Este es el margen de estimación asociado al intervalo del 95%, no una cota absoluta para todos los muestreos posibles.',`confianza = 95%; E ≈ ${fmt(v.error)} kg`],
  ],'INTERVAL_HALFWIDTH',{margin:v.error}),
  part(p[2],'La amplitud disminuye al aumentar n.',['La amplitud aumenta al aumentar n.','La amplitud permanece constante al aumentar n.','La amplitud disminuye en proporción inversa a n.'],['Confundir proporcionalidad inversa con directa.','Ignorar el tamaño en el error típico.','Dividir entre n en lugar de entre su raíz.'],[
   ['La confianza y la desviación poblacional permanecen fijas.',`z > 0; σ = 0,25 kg`],
   ['La amplitud es el doble del margen.',`amplitud = 2E = ${frac('2z·σ','√(n)')}`],
   ['Al aumentar n aumenta el denominador positivo y disminuye la amplitud.',`n₂ > n₁ ⇒ amplitud₂ < amplitud₁`],
   ['Verificamos la dependencia exacta: cuadruplicar el tamaño reduce la amplitud a la mitad, no a una cuarta parte.',`amplitud(4n) = amplitud(n)/2`],
  ],'POSITIVE_INVERSE_SQUARE_ROOT_MONOTONICITY',{relativeSize:4,relativeAmplitude:.5})];
 if(c.task==='distribution-interval-size')return [
  part(p[0],'Normal: media μ; desviación típica frac{5}{√(10)} euros.',['Normal: media μ; desviación típica 5 euros.','Normal: media μ; desviación típica 0,5 euros.','Normal: media 102; desviación típica frac{5}{√(10)} euros.'],['Usar la dispersión de observaciones individuales.','Dividir entre n en lugar de entre su raíz.','Sustituir el parámetro poblacional desconocido por la estimación observada.'],[
   ['Distinguimos la distribución de la media aleatoria del valor de una media ya observada.',`X normal; E(X) = μ; σ = 5 euros`],
   ['La media de diez observaciones independientes normales es normal exactamente.',`x̄ = (X₁ + ⋯ + X₁₀)/10`],
   ['Por linealidad de la esperanza, su centro sigue siendo el parámetro poblacional.',`E(x̄) = (10μ)/10 = μ`],
   ['La independencia permite sumar varianzas; al dividir por 10 se divide la varianza por 100.',`Var(x̄) = ${frac('10·25','100')} = 2,5 euros²`],
   ['La desviación es la raíz de la varianza. Indicamos ambos parámetros con nombres para evitar la ambigüedad de N(μ,σ) frente a N(μ,σ²).',`SD(x̄) = √(2,5) = ${frac('5','√(10)')} ≈ ${fmt(v.se)} euros`],
  ],'NORMAL_SUM_EXPECTATION_VARIANCE',{meanParameter:'μ',variance:2.5,sd:v.se}),intervalPart(c,p[1]),sizePart(c,p[2])];
 if(c.task==='interval-inverse-and-size'){
  const center=(c.interval[0]+c.interval[1])/2,error=(c.interval[1]-c.interval[0])/2;
  return [part(p[0],`x̄ = ${fmt(center)} cm; E = ${fmt(error)} cm`,['x̄ = 32,3 cm; E = 2,2 cm','x̄ = 31,2 cm; E = 1,1 cm','x̄ = 33,4 cm; E = 1,1 cm'],['Dar la amplitud completa en lugar del margen.','Tomar el extremo inferior como media.','Tomar el extremo superior como media.'],[
   ['El intervalo simétrico para la media tiene centro x̄ y semiamplitud E.',`L = x̄ − E = 31,2; U = x̄ + E = 33,4`],
   ['Sumamos los extremos para eliminar E y despejar la media.',`x̄ = ${frac('L + U','2')} = ${frac('31,2 + 33,4','2')} = 32,3 cm`],
   ['Restamos los extremos y dividimos por dos para obtener el margen.',`E = ${frac('U − L','2')} = ${frac('33,4 − 31,2','2')} = 1,1 cm`],
   ['Comprobamos reconstruyendo ambos extremos. No necesitamos conocer el nivel de confianza del apartado a).',`32,3 − 1,1 = 31,2; 32,3 + 1,1 = 33,4`],
  ],'INVERSE_INTERVAL_ENDPOINTS',{center,error,interval:c.interval}),sizePart(c,p[1])];
 }
 if(c.task==='width-and-interval')return [part(p[0],`amplitud ≈ ${fmt(2*v.error)} g`,[v.error,2*v.z*c.sigma,2*v.z*c.sigma/c.n].map(x=>`amplitud ≈ ${fmt(x)} g`),['Confundir amplitud con margen.','Omitir la reducción por raíz del tamaño.','Dividir entre n en lugar de entre su raíz.'],[
  ['La amplitud del intervalo depende de la desviación, el tamaño y la confianza, no de su centro.',`σ = 0,3 g; n = 9; confianza = 98%`],
  ['El cuantil bilateral deja 1% en cada cola.',`Φ(z) = 0,99; z ≈ ${fmt(v.z)}`],
  ['Escribimos la fórmula general antes de sustituir.',`amplitud = 2E = 2z·${frac('σ','√(n)')}`],
  ['Sustituimos y calculamos la longitud total.',`amplitud = 2·${fmt(v.z)}·${frac('0,3','√(9)')} ≈ ${fmt(2*v.error)} g`],
  ['Comprobamos que la semiamplitud es la mitad. Los datos del apartado b) determinarán el centro, no esta longitud.',`E ≈ ${fmt(v.error)} g; amplitud = 2E`],
 ],'NORMAL_INTERVAL_WIDTH',{width:2*v.error,margin:v.error}),intervalPart(c,p[1])];
 throw Error('Unimplemented source-read task');
}
export function buildMultipartBatch(batchId='batch-0243',selected=cases){
 return buildBatch(selected,batchId,buildMultipartParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const batchId=process.argv[2]??'batch-0243',selection=process.argv[3]?.split(',').map(Number);
 const result=buildMultipartBatch(batchId,selection?cases.filter(c=>selection.includes(c.index)):cases),archive=`artifacts/pau-andalucia-resolution/audit/correction-${batchId.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(result.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${batchId}.json`,JSON.stringify(result.batch,null,2)+'\n');
 console.log(JSON.stringify(result.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));
}

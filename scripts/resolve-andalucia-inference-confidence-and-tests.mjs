// Ten individually inspected official exercises. Original statements stay immutable.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt,sizePart} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:317,task:'test',whole:true,kind:'mean',sigma:4,n:100,center:297,nullValue:300,tail:'both',levels:[.05],unit:'g',literals:['300 g','100','297 g','varianza 16','contraste bilateral','0.05']},
 {index:320,task:'interval-maximum',kind:'mean',sigma:5,n:81,center:12,interval:[10.794,13.206],confidence:.97,populationMean:10.2,unit:'horas',literals:['desviación típica 5 horas','81 estudiantes','(10.794, 13.206)','97%','10.2 horas','12 horas','tamaño máximo']},
 {index:339,task:'inverse-minimum',kind:'mean',sigma:15,n:36,center:158,interval:[153.65,162.35],confidence:.95,error:3,strict:true,unit:'km',literals:['varianza 225','36 coches','(153.65, 162.35)','95 %','inferior a 3 km']},
 {index:340,task:'inverse-error-change',kind:'mean',sigma:3,n:36,center:7.02,interval:[6.04,8],confidence:.95,nextN:49,unit:'cm',literals:['desviación típica 3','tamaño 36','(6.04, 8) al 95 %','49']},
 {index:378,task:'test',whole:true,kind:'mean',sigma:5,n:225,center:26,nullValue:25,tail:'right',levels:[.05],unit:'IMC',literals:['no supera el nivel 25','225 adolescentes','IMC medio de 26','típica 5','H 0 : µ ≤ 25','5%']},
 {index:384,task:'test',whole:true,kind:'mean',sigma:2.1,n:25,center:6.3,nullValue:5.5,tail:'both',levels:[.08],unit:'unidades',literals:['N\uf028\uf06d, 2.1\uf029','H0 :\uf06d \uf03d 5.5','bilateral','8%','tamaño 25','6.3']},
 {index:395,task:'aggregate-interval-minimum',kind:'mean',sigma:.8,n:45,center:120,sum:5400,confidence:.97,error:.2,strict:true,unit:'cm³',literals:['desviación típica 0.8 cm3','45 tazas','5 400 cm3','97 %','inferior a 0.2 cm3']},
 {index:456,task:'test',kind:'proportion',n:950,successes:215,center:215/950,nullValue:.25,tail:'left',levels:[.05,.01],literals:['950 personas','215','H 0 : p ≥ 0.25','5%','1%']},
 {index:485,task:'test',whole:true,kind:'proportion',n:500,successes:340,center:.68,nullValue:.7,tail:'both',levels:[.01],literals:['70%','500','340','bilateral','H 0 : p = 0.7','1%']},
 {index:535,task:'test',whole:true,kind:'mean',sigma:8.9,n:100,center:71.8,nullValue:70,tail:'right',levels:[.05],unit:'años',literals:['desviación típica 8.9 años','100','71.8','mayor de 70 años','α = 0.05']},
];
const f=fmt,frac=(a,b)=>`frac{${a}}{${b}}`;
export function hypothesisValues(c,alpha=c.levels[0]){
 const se=c.kind==='mean'?c.sigma/Math.sqrt(c.n):Math.sqrt(c.nullValue*(1-c.nullValue)/c.n);
 const z=(c.center-c.nullValue)/se,cut=critical(1-(c.tail==='both'?alpha:2*alpha));
 const pValue=c.tail==='both'?2*(1-normalCDF(Math.abs(z))):c.tail==='left'?normalCDF(z):1-normalCDF(z);
 const rejected=c.tail==='both'?Math.abs(z)>cut:c.tail==='left'?z < -cut:z>cut;
 return {alpha,se,z,cut,pValue,rejected,lower:c.nullValue-cut*se,upper:c.nullValue+cut*se};
}
function hypothesisPart(c,p,alpha){
 const v=hypothesisValues(c,alpha),both=c.tail==='both',left=c.tail==='left',param=c.kind==='mean'?'μ':'p',estimate=c.kind==='mean'?'x̄':'p̂';
 const h=`H₀: ${param} ${both?'=':left?'≥':'≤'} ${f(c.nullValue)}; H₁: ${param} ${both?'≠':left?'<':'>'} ${f(c.nullValue)}`;
 const region=cut=>both?`|Z| > ${f(cut)}`:`Z ${left?'<':'>'} ${f(left?-cut:cut)}`;
 const result=(cut,z,reject)=>`Rechazo si ${region(cut)}. Z ≈ ${f(z)}; ${reject?'se rechaza':'no se rechaza'} H₀.`;
 const otherCut=critical(1-(both?2*alpha:alpha)),wrongSE=c.kind==='mean'?c.sigma/c.n:Math.sqrt(c.center*(1-c.center)/c.n);
 const pText=v.pValue<.00001?'valor p < 0,00001':`valor p ≈ ${f(v.pValue)}`;
 const steps=[
  ['Definimos el parámetro poblacional y formulamos la alternativa que responde exactamente a lo preguntado. La igualdad pertenece a la hipótesis nula.',h],
  [c.kind==='mean'?'La media muestral ya está proporcionada por el enunciado. Identificamos la desviación típica conocida.':'La proporción observada usa todos los encuestados; el valor nulo procede de la afirmación a contrastar.',c.kind==='mean'?`x̄ = ${f(c.center)} ${c.unit}; σ = ${f(c.sigma)} ${c.unit}; n = ${c.n}`:`p̂ = ${frac(c.successes,c.n)} ≈ ${f(c.center)}; p₀ = ${f(c.nullValue)}`],
  [c.kind==='mean'?'La población normal implica normalidad exacta de la media. No utilizamos una desviación estimada ni una distribución t.':'El contraste normal utiliza la varianza bajo H₀. Comprobamos que ambas frecuencias esperadas superan cinco.',c.kind==='mean'?`SE₀ = ${frac('σ','√(n)')} = ${frac(f(c.sigma),`√(${c.n})`)} ≈ ${f(v.se)}`:`n·p₀ = ${f(c.n*c.nullValue)}; n·(1 − p₀) = ${f(c.n*(1-c.nullValue))}; SE₀ = √(${frac('p₀·(1 − p₀)','n')}) ≈ ${f(v.se)}`],
  ['Escribimos el estadístico y sustituimos sin redondear los cálculos intermedios.',`Z = ${frac(`${estimate} − ${param}₀`,'SE₀')} = ${frac(`${f(c.center)} − ${f(c.nullValue)}`,f(v.se))} ≈ ${f(v.z)}`],
  [both?'Dividimos la significación entre dos colas. Los valores muy grandes en valor absoluto contradicen H₀.':'Concentramos toda la significación en la única cola señalada por H₁.',`α = ${f(alpha)}; Φ(c) = ${f(1-alpha/(both?2:1))}; c ≈ ${f(v.cut)}; rechazo si ${region(v.cut)}`],
  ['Expresamos también la región de rechazo en la escala original de la estimación.',both?`${estimate} < ${f(v.lower)} o ${estimate} > ${f(v.upper)}`:`${estimate} ${left?'<':'>'} ${f(left?v.lower:v.upper)}`],
  ['Comparamos el estadístico con la región crítica. Como comprobación, el valor p conduce a la misma decisión.',`${pText}; α = ${f(alpha)}; ${v.rejected?'el estadístico cae en la región crítica':'el estadístico no cae en la región crítica'}`],
  [v.rejected?`Existe evidencia estadística ${both?'contra la igualdad afirmada':left?'de un valor inferior al umbral':'de un valor superior al umbral'} al nivel solicitado. Esto no representa certeza absoluta.`:'No se rechaza la afirmación al nivel solicitado: es compatible con estos datos. No rechazar no demuestra que la hipótesis sea verdadera.',result(v.cut,v.z,v.rejected)],
 ];
 if(c.sample){
  assert.equal(c.sample.length,c.n);
  const sum=c.sample.reduce((a,b)=>a+b,0);
  assert.ok(Math.abs(sum/c.n-c.center)<1e-10);
  steps[1]=['La media no está dada: sumamos todos los diámetros y dividimos entre el número de observaciones.',`n = ${c.n}; Σxᵢ = ${f(sum)} ${c.unit}; x̄ = ${frac(f(sum),c.n)} = ${f(c.center)} ${c.unit}`];
 }
 if(c.populationVariance!==undefined){
  assert.equal(c.sigma,Math.sqrt(c.populationVariance));
  steps.splice(2,0,['El enunciado da la varianza poblacional; para calcular el error típico necesitamos su raíz positiva.',`σ² = ${f(c.populationVariance)}; σ = √(${f(c.populationVariance)}) = ${f(c.sigma)} ${c.unit}`]);
 }
 if(c.contextConclusions)steps.push([c.contextConclusions[c.levels.indexOf(alpha)],result(v.cut,v.z,v.rejected)]);
 if(c.index===317)steps.splice(2,0,['El dato oficial es una varianza. Tomamos su raíz para obtener la desviación típica.', 'σ² = 16 g²; σ = √(16) = 4 g']);
 return part(p,result(v.cut,v.z,v.rejected),[result(otherCut,v.z,v.rejected),result(v.cut,v.z,!v.rejected),result(v.cut,(c.center-c.nullValue)/wrongSE,v.rejected)],
  [both?'No repartir la significación entre las dos colas.':'Repartir entre dos colas una significación unilateral.','Invertir la decisión respecto de la región crítica.',c.kind==='mean'?'Dividir σ entre n en vez de entre su raíz.':'Usar la proporción muestral, no la nula, en el error típico.'],steps,'NORMAL_HYPOTHESIS_TEST_WITH_NULL_VARIANCE',v);
}
function inversePart(c,p,mode='center'){
 const [l,u]=c.interval,center=(l+u)/2,error=(u-l)/2;
 const result=(x,e)=>mode==='both'?`x̄ = ${f(x)} ${c.unit}; E = ${f(e)} ${c.unit}`:mode==='error'?`E = ${f(e)} ${c.unit}`:`x̄ = ${f(x)} ${c.unit}`;
 const wrong=mode==='error'?[result(center,2*error),result(center,error/2),result(center,c.sigma)]:mode==='both'?[result(center,2*error),result(l,error),result(u,error)]:[result(l,error),result(u,error),result(l+u,error)];
 const reasons=mode==='error'?['Confundir amplitud con semiamplitud.','Volver a dividir por dos el margen.','Confundir desviación individual con margen de estimación.']:mode==='both'?['Dar la amplitud completa como error.','Usar el extremo inferior como media.','Usar el extremo superior como media.']:['Confundir la media con el extremo inferior.','Confundir la media con el extremo superior.','Sumar los extremos sin dividir entre dos.'];
 return part(p,result(center,error),wrong,reasons,[
  ['Identificamos los extremos del intervalo simétrico para la media.',`L = ${f(l)}; U = ${f(u)}`],
  ['La estimación puntual es el punto medio: sumar los extremos cancela el margen.',`x̄ = ${frac('L + U','2')} = ${frac(`${f(l)} + ${f(u)}`,'2')} = ${f(center)} ${c.unit}`],
  ['El margen es la mitad de la longitud, no la longitud completa.',`E = ${frac('U − L','2')} = ${frac(`${f(u)} − ${f(l)}`,'2')} = ${f(error)} ${c.unit}`],
  ['Comprobamos ambos resultados reconstruyendo los extremos oficiales.',`${f(center)} − ${f(error)} = ${f(l)}; ${f(center)} + ${f(error)} = ${f(u)}`],
  ['Respondemos a la magnitud solicitada, conservando las unidades.',result(center,error)],
 ],'INVERSE_SYMMETRIC_INTERVAL',{center,error,interval:c.interval});
}
function monotonicPart(c,p,task){
 const nUp=task==='n-up',confidenceDown=task==='confidence-down';
 const answer=nUp?'Disminuye: es inversamente proporcional a √(n).':confidenceDown?'Debe reducirse el nivel de confianza.':'Aumenta el error al aumentar el nivel de confianza.';
 const wrong=nUp?['Aumenta: es directamente proporcional a √(n).','No cambia: solo depende de la media.','Disminuye: es inversamente proporcional a n.']:confidenceDown?['Debe aumentarse el nivel de confianza.','El nivel de confianza no influye en la amplitud.','Debe cambiarse la media muestral.']:['Disminuye el error al aumentar el nivel de confianza.','El error no cambia porque se mantiene la muestra.','El error aumenta porque necesariamente aumenta σ.'];
 const reasons=nUp?['Invertir la dependencia del tamaño.','Ignorar el error típico.','Confundir raíz del tamaño con tamaño.']:['Invertir el efecto del cuantil.','Ignorar el nivel de confianza en el margen.','Modificar otro parámetro que se mantiene fijo.'];
 return part(p,answer,wrong,reasons,[
  ['La desviación poblacional es conocida y permanece fija. El margen determina la amplitud del intervalo.',`σ = ${f(c.sigma)} ${c.unit}; amplitud = 2E`],
  ['Partimos de la dependencia exacta, antes de comparar.',`E = ${frac('z·σ','√(n)')}; amplitud = ${frac('2z·σ','√(n)')}`],
  [nUp?'Con confianza fija, z no cambia. Aumentar n aumenta el denominador positivo.':'Con n fijo, el error típico no cambia. La confianza controla el cuantil bilateral.',nUp?'n₂ > n₁ ⇒ √(n₂) > √(n₁)':'Φ(z) = (1 + confianza)/2'],
  [nUp?'Por ejemplo, cuadruplicar el tamaño reduce a la mitad el margen y la amplitud.':'Para cubrir una mayor área normal, el cuantil se aleja del centro: aumenta z y aumenta el margen.',nUp?'E(4n) = E(n)/2':'confianza₂ > confianza₁ ⇒ z₂ > z₁ ⇒ E₂ > E₁'],
  ['Aplicamos la relación en el sentido que pide el apartado, sin cambiar los otros parámetros.',answer],
 ],'CONFIDENCE_SIZE_MONOTONICITY',{task,relativeSize:nUp?4:null,relativeError:nUp?.5:null});
}
function maximumPart(c,p){
 const distance=Math.abs(c.center-c.populationMean),z=critical(c.confidence),bound=(z*c.sigma/distance)**2,n=Math.floor(bound),margin=k=>z*c.sigma/Math.sqrt(k);
 assert.ok(margin(n)>=distance&&margin(n+1)<distance);
 return part(p,`n máximo = ${n}`,[n+1,Math.floor((critical(.95)*c.sigma/distance)**2),Math.floor((z*c.sigma/(2*distance))**2)].map(x=>`n máximo = ${x}`),['Redondear hacia arriba como si se pidiera un mínimo.','Utilizar confianza del 95% en lugar del 97%.','Confundir distancia al centro con amplitud total.'],[
  ['La media muestral queda fijada en 12. Para contener la media poblacional 10,2, el intervalo debe llegar al menos hasta ella.',`x̄ = 12; μ = 10,2; |x̄ − μ| = 1,8 horas`],
  ['La condición de pertenencia es que la distancia al centro no supere el margen.',`|x̄ − μ| ≤ E ⇒ 1,8 ≤ ${frac('z·5','√(n)')}`],
  ['Elegimos el cuantil bilateral del nivel solicitado.',`Φ(z) = 0,985 ⇒ z ≈ ${f(z)}`],
  ['Todos los factores son positivos. Al despejar aparece una cota superior para n, no inferior.',`√(n) ≤ ${frac('z·5','1,8')} ⇒ n ≤ (${frac('z·5','1,8')})² ≈ ${f(bound)}`],
  ['El mayor entero permitido es el inferior del umbral.',`n máximo = ${n}`],
  ['Comprobamos que el tamaño propuesto todavía contiene la media poblacional.',`E(${n}) ≈ ${f(margin(n))} ≥ 1,8; 12 − E(${n}) ≈ ${f(12-margin(n))} ≤ 10,2`],
  ['Con el entero siguiente el intervalo es más estrecho y ya no la contiene. Así queda demostrada la maximalidad.',`E(${n+1}) ≈ ${f(margin(n+1))} < 1,8; 12 − E(${n+1}) ≈ ${f(12-margin(n+1))} > 10,2`],
 ],'MAXIMUM_SAMPLE_SIZE_FOR_FIXED_CENTER_CONTAINMENT',{z,distance,bound,maximum:n,marginAtMaximum:margin(n),marginAtNext:margin(n+1)});
}
export function buildConfidenceParts(c,text){
 const p=c.whole?[{id:'whole',prompt:text}]:officialParts(text);
 if(c.task==='test'){
  assert.equal(p.length,c.levels.length);return p.map((x,i)=>hypothesisPart(c,x,c.levels[i]));
 }
 if(c.task==='interval-maximum')return [inversePart(c,p[0]),monotonicPart(c,p[1],'n-up'),monotonicPart(c,p[2],'confidence-down'),maximumPart(c,p[3])];
 if(c.task==='inverse-minimum')return [inversePart(c,p[0],'both'),monotonicPart(c,p[1],'n-up'),sizePart(c,p[2])];
 if(c.task==='inverse-error-change'){
  const z=critical(c.confidence),error=z*c.sigma/Math.sqrt(c.nextN),old=(c.interval[1]-c.interval[0])/2,result=e=>`Disminuye; E ≈ ${f(e)} cm.`;
  const change=part(p[2],result(error),[result(old),result(2*error),result(z*c.sigma/c.nextN)],['Conservar el error de la muestra antigua.','Dar la amplitud como error.','Dividir entre n en lugar de su raíz.'],[
   ['Mantenemos la confianza y la desviación; solo cambia el tamaño de la muestra.',`σ = 3 cm; n nuevo = 49; confianza = 95%`],
   ['El margen depende inversamente de la raíz del tamaño.',`E = ${frac('z·σ','√(n)')}`],
   ['El cuantil bilateral mantiene un 2,5% en cada cola.',`Φ(z) = 0,975 ⇒ z ≈ ${f(z)}`],
   ['Sustituimos el nuevo tamaño y calculamos el margen.',`E = ${f(z)}·${frac('3','√(49)')} ≈ ${f(error)} cm`],
   ['Comparamos con el margen del intervalo original y comprobamos la dependencia inversa.',`${f(error)} < 0,98; E nuevo / E anterior teórico = √(36/49) = frac{6}{7}`],
   ['La pequeña diferencia por redondeo de los extremos originales no altera el sentido ni el cálculo del nuevo margen.',result(error)],
  ],'NORMAL_MARGIN_AT_CHANGED_SAMPLE_SIZE',{z,error,old,n:c.nextN});
  return [inversePart(c,p[0]),inversePart(c,p[1],'error'),change,monotonicPart(c,p[3],'confidence-up')];
 }
 if(c.task==='aggregate-interval-minimum'){
  assert.equal(c.sum/c.n,c.center);const z=critical(c.confidence),se=c.sigma/Math.sqrt(c.n),error=z*se,interval=e=>`[${f(c.center-e)}; ${f(c.center+e)}] cm³`;
  return [part(p[0],'x̄ = 120 cm³',['x̄ = 5400 cm³','x̄ = 45 cm³','x̄ = 12 cm³'],['Confundir el total con la media.','Confundir el tamaño con el valor medio.','Perder un cero al dividir.'],[
   ['El estimador puntual de la media poblacional es la media de las cantidades observadas.', 'estimador: x̄'],
   ['El enunciado proporciona la suma y el número de tazas, no observaciones individuales.', 'Σxᵢ = 5400 cm³; n = 45'],
   ['Dividimos la suma entre el tamaño muestral.', 'x̄ = frac{Σxᵢ}{n} = frac{5400}{45} = 120 cm³'],
   ['Comprobamos mediante la operación inversa.', '45·120 = 5400 cm³'],
   ['La estimación es una cantidad por taza, no el volumen de todas las tazas.', 'x̄ = 120 cm³ por taza'],
  ],'SAMPLE_MEAN_FROM_OFFICIAL_TOTAL',{sum:c.sum,n:c.n,mean:c.center}),
  part(p[1],interval(error),[interval(critical(.95)*se),interval(z*c.sigma),interval(z*c.sigma/c.n)],['Usar el cuantil del 95%.','Usar la desviación de una taza, no de la media.','Dividir entre n en lugar de su raíz.'],[
   ['La población es normal y σ es conocida. Usamos la media calculada con el volumen total.', 'x̄ = 120 cm³; σ = 0,8 cm³; n = 45'],
   ['El 3% que queda fuera del intervalo se reparte entre dos colas.',`α = 0,03; Φ(z) = 0,985 ⇒ z ≈ ${f(z)}`],
   ['Calculamos el error típico de la media.',`SE = ${frac('σ','√(n)')} = ${frac('0,8','√(45)')} ≈ ${f(se)} cm³`],
   ['Multiplicamos por el cuantil para obtener el margen.',`E = z·SE ≈ ${f(error)} cm³`],
   ['Construimos los extremos simétricos alrededor de la estimación.',`IC = [x̄ − E; x̄ + E] ≈ ${interval(error)}`],
   ['Comprobamos centro, semiamplitud y área entre los cuantiles.',`centro = 120; semiamplitud ≈ ${f(error)}; Φ(z) − Φ(−z) = 0,97`],
   ['El 97% es la cobertura del procedimiento en muestreos repetidos; no una probabilidad posterior de la media fija.',interval(error)],
  ],'NORMAL_INTERVAL_FROM_OFFICIAL_TOTAL',{z,se,error,interval:[c.center-error,c.center+error]}),sizePart(c,p[2])];
 }
 throw Error('Unsupported official task');
}
export function buildConfidenceBatch(batchId='batch-0250',selected=cases){
 const r=buildBatch(selected,batchId,buildConfidenceParts,(_c,x)=>({parts:x.parts.map(p=>({partId:p.partId,...p.verification}))}));
 for(const x of r.batch.records)if(x.correctionEvidence.parameters.whole){assert.equal(x.sourceSubparts.length,0);assert.equal(x.parts.length,1);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}
 return r;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const batchId=process.argv[2]??'batch-0250',r=buildConfidenceBatch(batchId),archive=`artifacts/pau-andalucia-resolution/audit/correction-${batchId.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${batchId}.json`,JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));
}

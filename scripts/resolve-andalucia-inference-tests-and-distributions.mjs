// Six complete official tasks, checked against their PDF pages and independent
// NormalDist calculations. No historical answer is used to infer a parameter.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt,sizePart} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:51,task:'two-tests',kind:'mean',sigma:1.2,n:10,center:5.5,sample:[3,8,6,3,9,1,7,7,5,6],nullValue:5,tail:'right',levels:[.05,.15],literals:['desviación típica 1.2','muestra de 10','3 8 6 3 9 1 7 7 5 6','a lo sumo 5','significación del 5%','15%']},
 {index:60,task:'two-tests',kind:'proportion',n:950,successes:590,center:590/950,nullValue:.65,tail:'left',levels:[.10,.01],literals:['65%','950 habitantes','590 están a favor','significación del 10%','significación fuera del 1%']},
 {index:171,task:'hypotheses-region-decision',kind:'proportion',n:500,successes:130,center:.26,nullValue:.3,tail:'left',levels:[.055],literals:['30%','500 personas','130 de ellas','hipótesis nula y la alternativa','región crítica','significación del 5.5%']},
 {index:212,task:'size-distribution-tail',kind:'mean',sigma:5,n:100,center:24,confidence:.99,error:1,unit:'miles de euros',threshold:25,literals:['desviación típica 5','99 %','más de una unidad','tamaño 100','µ = 24','superior a 25']},
 {index:223,task:'proportion-interval-monotonicity-size',kind:'proportion',n:120,successes:80,center:80/120,confidence:.92,nextConfidence:.99,error:.04,literals:['120 establecimientos','80 tienen','máximo de 12 €','92 %','confianza al 99 %','superior a 0.04']},
 {index:273,task:'distribution-two-probabilities',kind:'mean',sigma:16,n:4,center:70,lower:65,upper:72,unit:'kg',literals:['media 70 kg','desviación típica 16 kg','muestras de tamaño 4','entre 65 y 72 kg','menor que 70kg']},
];
const f=fmt,frac=(a,b)=>`frac{${a}}{${b}}`;
export function testValues(c,alpha=c.levels[0]){
 const se=c.kind==='proportion'?Math.sqrt(c.nullValue*(1-c.nullValue)/c.n):c.sigma/Math.sqrt(c.n);
 const z=(c.center-c.nullValue)/se,cut=(c.tail==='left'?-1:1)*critical(1-2*alpha);
 return {alpha,se,z,cut,threshold:c.nullValue+cut*se,rejected:c.tail==='left'?z<cut:z>cut,pValue:c.tail==='left'?normalCDF(z):1-normalCDF(z)};
}
function testPart(c,p,alpha,comparison=false){
 const v=testValues(c,alpha),left=c.tail==='left',op=left?'<':'>',parameter=c.kind==='mean'?'μ':'p',estimate=c.kind==='mean'?'x̄':'p̂';
 const h=`H₀: ${parameter} ${left?'≥':'≤'} ${f(c.nullValue)}; H₁: ${parameter} ${op} ${f(c.nullValue)}`;
 const answer=(cut,z,reject)=>`${h}; rechazo si Z ${op} ${f(cut)}. Z ≈ ${f(z)}; ${reject?'se rechaza':'no se rechaza'} H₀.`;
 const wrongCut=(left?-1:1)*critical(1-alpha),wrongSE=c.kind==='mean'?c.sigma/Math.sqrt(c.n-1):Math.sqrt(c.center*(1-c.center)/c.n);
 const result=answer(v.cut,v.z,v.rejected);
 const steps=[
  ['La hipótesis alternativa expresa la dirección que contradice la afirmación inicial. La igualdad se conserva en la hipótesis nula.',h],
  [c.kind==='mean'?'Sumamos las diez calificaciones y dividimos entre diez. La desviación típica poblacional es conocida.':'Dividimos el número de personas que cumplen la característica entre el total encuestado.',c.kind==='mean'?`Σxᵢ = 55; x̄ = ${frac(55,10)} = 5,5; σ = 1,2`:`p̂ = ${frac(c.successes,c.n)} ≈ ${f(c.center)}`],
  ['Identificamos el nivel de significación y la cola del contraste.',`α = ${f(alpha)}; contraste unilateral ${left?'izquierdo':'derecho'}`],
  [c.kind==='mean'?'La población es normal: la media muestral es normal con error típico σ dividido entre la raíz de n.':'La aproximación normal usa la proporción nula; sus frecuencias esperadas superan cinco.',c.kind==='mean'?`SE₀ = ${frac('σ','√(n)')} = ${frac(f(c.sigma),`√(${c.n})`)} ≈ ${f(v.se)}`:`n·p₀ = ${f(c.n*c.nullValue)}; n·(1 − p₀) = ${f(c.n*(1-c.nullValue))}; SE₀ = √(${frac('p₀·(1 − p₀)','n')}) ≈ ${f(v.se)}`],
  ['Calculamos el estadístico con el valor frontera de la hipótesis nula.',`Z = ${frac(`${estimate} − ${parameter}₀`,'SE₀')} = ${frac(`${f(c.center)} − ${f(c.nullValue)}`,f(v.se))} ≈ ${f(v.z)}`],
  ['Toda la significación queda en una cola; no se reparte entre dos.',`Φ(c) = ${f(left?alpha:1-alpha)} ⇒ c ≈ ${f(v.cut)}; rechazo si Z ${op} ${f(v.cut)}`],
  ['La región también puede expresarse en la escala de la estimación muestral.',`${estimate} ${op} ${f(v.threshold)}`],
  ['Comparamos el estadístico observado con la región crítica y comprobamos la decisión con el valor p.',`Z ≈ ${f(v.z)}; valor p ≈ ${f(v.pValue)} ${v.rejected?'<':'>'} ${f(alpha)}; ${v.rejected?'se rechaza':'no se rechaza'} H₀`],
  [v.rejected?'Hay evidencia contra la afirmación inicial al nivel solicitado; no se trata de una certeza absoluta.':'Los datos no permiten rechazar la afirmación al nivel solicitado. No rechazar no demuestra que la hipótesis sea verdadera.',result],
 ];
 if(comparison)steps.push(['La muestra no cambia; cambia el umbral de exigencia. La decisión ahora es distinta de la del apartado anterior.',`α anterior = ${f(c.levels[0])}; α actual = ${f(alpha)}; valor p = ${f(v.pValue)}`]);
 return part(p,result,[answer(wrongCut,v.z,v.rejected),answer(v.cut,v.z,!v.rejected),answer(v.cut,(c.center-c.nullValue)/wrongSE,v.rejected)],['Usar un cuantil bilateral en un contraste unilateral.','Invertir la decisión pese a la pertenencia o no a la región crítica.',c.kind==='mean'?'Usar n − 1 en el error típico aunque σ es poblacional conocida.':'Usar la proporción observada en la varianza nula del contraste.'],steps,'ONE_SIDED_HYPOTHESIS_TEST',v);
}
function distributionPart(c,p,unknownMean=false){
 const se=c.sigma/Math.sqrt(c.n),mu=unknownMean?'μ':f(c.center),answer=s=>`Normal; media ${mu}; desviación típica ${f(s)} ${c.unit}.`;
 return part(p,answer(se),[c.sigma,c.sigma/c.n,se*se].map(answer),['Confundir la distribución de una observación con la de la media.','Dividir la desviación entre n en lugar de su raíz.','Dar la varianza como si fuese la desviación típica.'],[
  ['Cada observación procede de una población normal. La media de observaciones independientes es exactamente normal; no hace falta un tamaño grande.',`X ~ N(${mu}; ${f(c.sigma)}) (segundo parámetro: desviación típica)`],
  ['La esperanza de la media muestral coincide con la media poblacional.',`E(x̄) = ${mu}`],
  ['La independencia permite sumar varianzas y dividir por el cuadrado del tamaño muestral.',`Var(x̄) = ${frac('σ²','n')} = ${frac(f(c.sigma*c.sigma),c.n)} = ${f(se*se)}`],
  ['La desviación típica es la raíz de esa varianza.',`SE = ${frac('σ','√(n)')} = ${frac(f(c.sigma),`√(${c.n})`)} = ${f(se)} ${c.unit}`],
  ['Comprobamos que la varianza se ha dividido entre n y expresamos inequívocamente los parámetros.',answer(se)],
 ],'EXACT_NORMAL_SAMPLE_MEAN_DISTRIBUTION',{mean:unknownMean?null:c.center,se,variance:se*se,n:c.n});
}
function probabilityPart(c,p,lo,hi){
 const se=c.sigma/Math.sqrt(c.n),a=(lo-c.center)/se,b=(hi-c.center)/se,C=z=>z===Infinity?1:z===-Infinity?0:normalCDF(z);
 const value=C(b)-C(a),wrongRaw=C((hi-c.center)/c.sigma)-C((lo-c.center)/c.sigma);
 const wrong=[1-value,wrongRaw,hi===Infinity?.5:Math.abs(C(b)+C(a)-1)];
 const interval=lo===-Infinity?`x̄ < ${f(hi)}`:hi===Infinity?`x̄ > ${f(lo)}`:`${f(lo)} < x̄ < ${f(hi)}`;
 return part(p,`P ≈ ${f(value)}`,wrong.map(x=>`P ≈ ${f(x)}`),['Tomar el suceso complementario.','Tipificar con la desviación individual en lugar del error típico.',hi===Infinity?'Situar el umbral en la media y asignar la mitad del área.':'Combinar las áreas de las colas con signo incorrecto.'],[
  ['Trabajamos con la media muestral, no con un individuo. La población normal permite usar su distribución exacta.',`x̄ ~ N(${f(c.center)}; ${f(se)}) (desviación típica)`],
  ['Escribimos el suceso pedido antes de efectuar la tipificación.',`P(${interval})`],
  ['Restamos la media poblacional y dividimos por el error típico.',`Z = ${frac(`x̄ − ${f(c.center)}`,f(se))} ~ N(0; 1)`],
  ['Transformamos cada extremo finito de la desigualdad.',`${Number.isFinite(lo)?`${f(lo)} → ${f(a)}`:'extremo inferior: −∞'}; ${Number.isFinite(hi)?`${f(hi)} → ${f(b)}`:'extremo superior: +∞'}`],
  ['Usamos la función de distribución acumulada: para una cola superior restamos de uno; para un intervalo restamos las dos acumuladas.',`P = ${f(C(b))} − ${f(C(a))} ≈ ${f(value)}`],
  ['Comprobamos por integración de la densidad normal y expresamos el resultado entre cero y uno.',`P ≈ ${f(value)}; porcentaje ≈ ${f(100*value)}%`],
 ],'NORMAL_SAMPLE_MEAN_PROBABILITY',{se,a:Number.isFinite(a)?a:null,b:Number.isFinite(b)?b:null,value,wrong});
}
export function buildExtendedParts(c,text){
 const p=officialParts(text);
 if(c.task==='two-tests')return p.map((x,i)=>testPart(c,x,c.levels[i],i===1));
 if(c.task==='hypotheses-region-decision'){
  const v=testValues(c),result='H₀: p ≥ 0,3; H₁: p < 0,3';
  const a=part(p[0],result,['H₀: p ≤ 0,3; H₁: p > 0,3','H₀: p = 0,3; H₁: p ≠ 0,3','H₀: p ≥ 0,26; H₁: p < 0,26'],['Invertir la afirmación y la dirección de la alternativa.','Usar una alternativa bilateral frente a una afirmación de mínimo.','Sustituir el umbral afirmado por la proporción observada.'],[
   ['Definimos el parámetro poblacional que describe el programa.', 'p = proporción poblacional que ha visto el programa'],
   ['La expresión «al menos» incluye la igualdad y los valores mayores.', 'afirmación: p ≥ 0,30'],
   ['La hipótesis nula contiene la afirmación del director; la alternativa expresa un porcentaje inferior.',result],
   ['El estadístico se calibra en la frontera p₀. Los valores pequeños de la proporción observada apoyan la alternativa.', 'p₀ = 0,30; contraste unilateral izquierdo'],
   ['La muestra estima el parámetro, pero no cambia el valor de la hipótesis.', 'p̂ = frac{130}{500} = 0,26; p₀ = 0,30'],
  ],'HYPOTHESIS_FORMULATION',{nullValue:.3,tail:'left'});
  const b=testPart(c,p[1],.055),answer=z=>`Z ≈ ${f(z)}; se rechaza H₀: evidencia de audiencia inferior al 30%.`;
  const d=part(p[2],answer(v.z),[`Z ≈ ${f(v.z)}; no se rechaza H₀: evidencia insuficiente contra el mínimo del 30%.`,`Z ≈ ${f(-v.z)}; se rechaza H₀: evidencia de audiencia inferior al 30%.`,`Z ≈ ${f(v.z)}; se rechaza H₀: evidencia de audiencia superior al 30%.`],['No aplicar la región crítica ya calculada.','Invertir el signo de la diferencia entre proporción observada y nula.','Interpretar un rechazo izquierdo como aumento de audiencia.'],[
   ['La proporción observada procede de toda la encuesta.', 'p̂ = frac{130}{500} = 0,26'],
   ['Bajo la hipótesis nula usamos el error típico calculado con p₀.',`SE₀ = √(frac{0,30·0,70}{500}) ≈ ${f(v.se)}`],
   ['Estandarizamos y conservamos el signo de la diferencia.',`Z = frac{0,26 − 0,30}{${f(v.se)}} ≈ ${f(v.z)}`],
   ['El estadístico pertenece a la cola de rechazo del apartado anterior.',`${f(v.z)} < ${f(v.cut)}`],
   ['El valor p proporciona otra comprobación de la misma decisión.',`valor p ≈ ${f(v.pValue)} < 0,055`],
   ['Los datos contradicen la audiencia mínima afirmada al nivel del 5,5%; esto no es una afirmación de certeza absoluta.',answer(v.z)],
  ],'ONE_SIDED_HYPOTHESIS_TEST_DECISION',v);
  return [a,b,d];
 }
 if(c.task==='size-distribution-tail')return [sizePart(c,p[0]),distributionPart(c,p[1],true),probabilityPart(c,p[2],25,Infinity)];
 if(c.task==='distribution-two-probabilities')return [distributionPart(c,p[0]),probabilityPart(c,p[1],65,72),part(p[2],'P = 0,5',['P = 0,25','P = 0,75','P = 1'],['Dividir una vez más la mitad de la distribución.','Confundir media con tercer cuartil.','Confundir estar por debajo de la media con pertenecer al soporte completo.'],[
  ['La media muestral tiene media poblacional 70 y desviación típica 8.', 'x̄ ~ N(70; 8)'],
  ['Escribimos la probabilidad solicitada.', 'P(x̄ < 70)'],
  ['Tipificamos el extremo, que coincide exactamente con la media.', 'P(Z < frac{70 − 70}{8}) = P(Z < 0)'],
  ['Por simetría de la densidad normal, la mitad del área queda a cada lado del centro.', 'Φ(0) = 0,5'],
  ['La distribución es continua: incluir o excluir el punto 70 no cambia el resultado.', 'P(x̄ = 70) = 0; P(x̄ < 70) = 0,5'],
 ],'NORMAL_SYMMETRY',{value:.5})];
 if(c.task==='proportion-interval-monotonicity-size'){
  const variance=c.center*(1-c.center),se=Math.sqrt(variance/c.n),z=critical(c.confidence),error=z*se,zn=critical(c.nextConfidence),e2=zn*se;
  const interval=e=>`[${f(c.center-e)}; ${f(c.center+e)}]`,bound=zn*zn*variance/(c.error*c.error),n=Math.ceil(bound);
  return [part(p[0],interval(error),[interval(critical(.95)*se),interval(z*Math.sqrt(variance)),`[${f(1-c.center-error)}; ${f(1-c.center+error)}]`],['Usar confianza del 95% en vez del 92%.','Omitir el tamaño muestral en el error típico.','Estimar el suceso complementario.'],[
   ['Los éxitos son los establecimientos cuyo precio no supera 12 euros.', 'p̂ = frac{80}{120} = frac{2}{3}; q̂ = frac{1}{3}'],
   ['La muestra es aleatoria y las frecuencias de éxitos y fracasos permiten la aproximación normal.', 'n·p̂ = 80; n·q̂ = 40'],
   ['El 8% restante se reparte entre las dos colas.',`α = 0,08; Φ(z) = 0,96 ⇒ z ≈ ${f(z)}`],
   ['Escribimos el error típico y el margen antes de calcular.',`SE = √(frac{p̂·q̂}{n}) ≈ ${f(se)}; E = z·SE ≈ ${f(error)}`],
   ['Sumamos y restamos el margen a la proporción muestral.',`IC = [p̂ − E; p̂ + E] ≈ ${interval(error)}`],
   ['El procedimiento tiene cobertura del 92% en muestreos repetidos; no asignamos esa probabilidad a un parámetro fijo.',`proporción estimada ≈ ${f(c.center)}; confianza = 92%`],
   ['Verificamos centro, semiamplitud y área normal entre los cuantiles.',`centro = frac{2}{3}; semiamplitud ≈ ${f(error)}; Φ(z) − Φ(−z) = 0,92`],
  ],'PROPORTION_INTERVAL',{center:c.center,error,se,z,interval:[c.center-error,c.center+error]}),
  part(p[1],'El error aumenta al aumentar el valor crítico.',['El error disminuye al aumentar el valor crítico.','El error no cambia porque no cambia la muestra.','El error aumenta porque cambia la proporción muestral.'],['Invertir la relación entre confianza y anchura.','Ignorar el valor crítico.','Cambiar una estimación que sigue procediendo de la misma muestra.'],[
   ['Conservamos la misma muestra y la misma estimación puntual.', 'p̂ = frac{2}{3}; n = 120'],
   ['El margen es el producto del valor crítico por un error típico que permanece constante.', 'E = z·√(frac{p̂·q̂}{n})'],
   ['Para cubrir un área mayor se alejan los cuantiles del centro.',`z del 92% ≈ ${f(z)}; z del 99% ≈ ${f(zn)}`],
   ['Calculamos ambos márgenes para comprobar el sentido del cambio.',`E del 92% ≈ ${f(error)}; E del 99% ≈ ${f(e2)}`],
   ['Mayor confianza exige un intervalo más ancho; la precisión disminuye si el tamaño no aumenta.', 'El error aumenta al aumentar el valor crítico.'],
  ],'CONFIDENCE_ERROR_MONOTONICITY',{errorBefore:error,errorAfter:e2}),
  part(p[2],`n = ${n}`,[n-1,Math.ceil(z*z*variance/c.error**2),Math.ceil(zn*zn*.25/c.error**2)].map(x=>`n = ${x}`),['Redondear hacia abajo sin comprobar el margen.','Mantener el nivel del 92% cuando se exige el 99%.','Descartar la estimación previa y usar el diseño conservador p = 0,5; no da el mínimo basado en la muestra.'],[
   ['Usamos la estimación de la muestra previa para planificar el tamaño con confianza del 99%.', 'p̂ = frac{2}{3}; q̂ = frac{1}{3}; E ≤ 0,04'],
   ['Despejamos n a partir de la fórmula del margen.', 'E = z·√(frac{p̂·q̂}{n}); n ≥ frac{z²·p̂·q̂}{E²}'],
   ['Elegimos el cuantil bilateral y sustituimos los datos.',`z ≈ ${f(zn)}; n ≥ ${f(bound)}`],
   ['Se necesita el menor entero superior o igual al umbral.',`n = ${n}`],
   ['Comprobamos el margen para el tamaño propuesto.',`E(${n}) ≈ ${f(zn*Math.sqrt(variance/n))} ≤ 0,04`],
   ['El entero anterior no cumple: queda demostrada la minimalidad.',`E(${n-1}) ≈ ${f(zn*Math.sqrt(variance/(n-1)))} > 0,04`],
   ['La conclusión usa la proporción previa; sin ella el diseño conservador sería distinto.',`n mínimo con la estimación previa = ${n}`],
  ],'PROPORTION_SIZE_PREVIOUS_INTEGER',{minimum:n,bound,variance,z:zn,error:c.error})];
 }
 throw Error('Unsupported official task');
}
export function buildExtendedBatch(batchId='batch-0249',selected=cases){return buildBatch(selected,batchId,buildExtendedParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const batchId=process.argv[2]??'batch-0249',r=buildExtendedBatch(batchId),archive=`artifacts/pau-andalucia-resolution/audit/correction-${batchId.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${batchId}.json`,JSON.stringify(r.batch,null,2)+'\n');
 console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));
}

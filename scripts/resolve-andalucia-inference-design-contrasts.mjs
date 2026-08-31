import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,intervalPart,fmt} from './resolve-andalucia-inference-multipart.mjs';
import {projectDesignInference} from './andalucia-inference-design-pdf-evidence.mjs';
const frac=(a,b)=>`frac{${a}}{${b}}`,iv=(c,e)=>`[${fmt(c-e)}; ${fmt(c+e)}]`;
export const cases=[
 {index:563,task:'proportion-design',n:500,successes:200,p:.4,confidence:.97,planningP:.2,nextConfidence:.99,error:.05,strict:true,literals:['500 personas 200','97%','otra muestra ha sido 0.2','inferior a 0.05','99%']},
 {index:570,task:'proportion-design',n:5000,successes:2250,p:.45,confidence:.975,planningP:.5,nextConfidence:.925,error:.03,strict:true,literals:['5 000','2 250','97.5 %','otra muestra','0.5','0.03','92.5 %']},
 {index:759,task:'proportion-design',n:300,successes:135,p:.45,confidence:.97,planningP:.45,nextConfidence:.97,error:.02,strict:true,literals:['300 individuos','135','97 %','misma proporción muestral','inferior al 2 %']},
 {index:868,task:'proportion-design',n:2000,successes:19,p:.0095,confidence:.95,planningP:.0095,nextConfidence:.99,error:.01,literals:['2000','19 de ellos','95%','99%','a lo sumo en un\n1%']},
 {index:1215,task:'proportion-margin',n:400,successes:72,p:.18,confidence:.992,literals:['400 veces','72 de ellas','99.2%','error máximo']},
 {index:1630,task:'mean-width',sigma:15,n:25,center:175,confidence:.9,nextConfidence:.8,error:2.5,amplitude:5,unit:'mg',literals:['varianza es 225 mg2','25 refrescos','175 mg','90 %','80 %','amplitud como máximo de 5 mg']},
 {index:1162,task:'strata-mean-design',sigma:6,confidence:.95,error:1,unit:'kg',literals:['1000','150,\n400, 250 y 200','10 individuos del tercer estrato','típica 6 kg','95%','superior a 1 kg']},
 {index:1461,task:'proportion-compatibility',n:600,successes:400,p:2/3,confidence:.98,planningP:2/3,nextConfidence:.98,error:.02,strict:true,hypothesis:13/20,literals:['600 alumnos','2/3','98 %','13/20','inferior al 2 %']},
 {index:1265,task:'inverse-proportion',n:500,interval:[.31,.39],p:.35,planningP:.35,nextConfidence:.94,error:.03,literals:['(0.31, 0.39)','94%','500 personas','máximo de 0.03']},
];
export function proportionInterval(c,prompt){
 const z=critical(c.confidence),v=c.p*(1-c.p),se=Math.sqrt(v/c.n),e=z*se;
 assert.equal(c.successes/c.n,c.p);assert.ok(c.successes>=5&&c.n-c.successes>=5);
 const wrongConfidence=c.confidence===.95?.9:.95;
 // All alternatives remain on the probability scale, with a comparable width.
 const ws=[critical(wrongConfidence)*se,z*Math.sqrt(v/(c.n/2)),z*Math.sqrt(v/(2*c.n))];
 const intervals=[[c.p-e,c.p+e],...ws.map(w=>[c.p-w,c.p+w])];
 return part(prompt,iv(c.p,e),ws.map(w=>iv(c.p,w)),['Usar otro nivel de confianza.','Usar la mitad del tamaño real al calcular el error típico.','Duplicar el tamaño real al calcular el error típico.'],[
  ['Definimos como éxito exactamente la característica que pregunta el apartado. Estimamos su proporción con la frecuencia observada.',`n = ${c.n}; éxitos = ${c.successes}; p̂ = ${frac(c.successes,c.n)} = ${fmt(c.p)}; q̂ = ${fmt(1-c.p)}`],
  ['La muestra es aleatoria y hay suficientes éxitos y fracasos para la aproximación normal de la proporción.',`n·p̂ = ${c.successes}; n·q̂ = ${c.n-c.successes}`],
  ['Repartimos el riesgo de un intervalo bilateral entre dos colas y obtenemos el cuantil.',`α = ${fmt(1-c.confidence)}; Φ(z) = ${fmt((1+c.confidence)/2)}; z ≈ ${fmt(z)}`],
  ['Escribimos la fórmula del error típico y sustituimos todos los datos de la muestra.',`SE = √(${frac('p̂·q̂','n')}) = √(${frac(`${fmt(c.p)}·${fmt(1-c.p)}`,c.n)}) ≈ ${fmt(se)}`],
  ['Calculamos el margen conservando precisión en los cálculos intermedios.',`E = z·SE ≈ ${fmt(e)}`],
  ['Restamos y sumamos el margen a la proporción observada.',`IC = [p̂ − E; p̂ + E] ≈ ${iv(c.p,e)}`],
  ['El método produce intervalos que contienen la proporción poblacional en la fracción indicada de muestras repetidas. No significa que esa fracción de individuos tenga necesariamente la característica.',`confianza = ${fmt(100*c.confidence)}%; IC en porcentaje ≈ ${iv(100*c.p,100*e)}%`],
  ['Comprobamos simetría, escala de probabilidades y cobertura normal bilateral.',`centro = ${fmt(c.p)}; semiamplitud ≈ ${fmt(e)}; Φ(z) − Φ(−z) ≈ ${fmt(c.confidence)}`],
 ],'NORMAL_PROPORTION_INTERVAL_CDF',{n:c.n,successes:c.successes,p:c.p,z,se,margin:e,interval:intervals[0],distractorIntervals:intervals.slice(1),coverage:2*normalCDF(z)-1});
}
export function sampleSize(c,prompt){
 const proportion=c.planningP!==undefined,variance=proportion?c.planningP*(1-c.planningP):c.sigma**2;
 const confidence=c.nextConfidence??c.confidence,z=critical(confidence),bound=z*z*variance/c.error**2,n=c.strict?Math.floor(bound)+1:Math.ceil(bound),margin=k=>z*Math.sqrt(variance/k);
 const otherConfidence=confidence===.8?.95:.8;
 const wrong=[n-1,Math.ceil(critical(otherConfidence)**2*variance/c.error**2),Math.ceil(bound*4)];
 assert.equal(new Set([n,...wrong]).size,4);assert.ok(c.strict?margin(n)<c.error:margin(n)<=c.error);assert.ok(c.strict?margin(n-1)>=c.error:margin(n-1)>c.error);
 const steps=[
  [proportion?'Usamos la proporción que el enunciado proporciona para este apartado, o la estimación anterior si se mantiene. No la confundimos con una proporción de otro apartado.':'Usamos la desviación poblacional conocida para planificar el tamaño de la muestra.',proportion?`p̂ de planificación = ${fmt(c.planningP)}; q̂ = ${fmt(1-c.planningP)}`:`σ = ${fmt(c.sigma)} ${c.unit}`],
  ...(c.amplitude?[['La amplitud total es dos veces el margen. La condición se convierte antes de despejar n.',`2E ≤ ${fmt(c.amplitude)} ${c.unit} ⇒ E ≤ ${fmt(c.error)} ${c.unit}`]]:[]),
  ['El intervalo es bilateral. Determinamos el cuantil usando la confianza de este apartado.',`confianza = ${fmt(100*confidence)}%; Φ(z) = ${fmt((1+confidence)/2)}; z ≈ ${fmt(z)}`],
  ['Escribimos la restricción del error y su dependencia con el tamaño.',proportion?`E = z·√(${frac('p̂·q̂','n')}); E ${c.strict?'<':'≤'} ${fmt(c.error)}`:`E = z·${frac('σ','√(n)')}; E ${c.strict?'<':'≤'} ${fmt(c.error)} ${c.unit}`],
  ['Despejamos elevando al cuadrado cantidades positivas y conservamos el sentido de la desigualdad.',`n ${c.strict?'>':'≥'} ${frac(proportion?'z²·p̂·q̂':'z²·σ²','E²')} ≈ ${fmt(bound)}`],
  ['Elegimos el menor entero que cumple, no un redondeo al entero más próximo.',`n mínimo = ${n}`],
  ['El tamaño elegido cumple y el anterior no: comprobación independiente de minimalidad.',`E(${n}) ≈ ${fmt(margin(n))}; E(${n-1}) ≈ ${fmt(margin(n-1))}`],
  [proportion?'El diseño usa la proporción estimada; no es una garantía uniforme sobre cualquier proporción desconocida. Un tamaño mayor podría cumplir, pero no es el mínimo pedido.':'Un tamaño mayor podría cumplir, pero no sería la respuesta al mínimo solicitado.',`n = ${n}`],
 ];
 return part(prompt,`n = ${n}`,wrong.map(x=>`n = ${x}`),['Redondear al entero inferior sin comprobar el error.',`Usar confianza del ${fmt(otherConfidence*100)}% en vez de la pedida.`,'Exigir por error la mitad del margen, multiplicando el tamaño teórico por cuatro.'],steps,'SAMPLE_SIZE_INTEGER_BOUNDARY',{z,variance,planningP:c.planningP??null,confidence,bound,minimum:n,error:c.error,strict:Boolean(c.strict),marginAtMinimum:margin(n),marginAtPrevious:margin(n-1),distractorSampleSizes:wrong});
}
function marginPart(c,prompt){
 const z=critical(c.confidence),se=Math.sqrt(c.p*(1-c.p)/c.n),e=z*se,wrong=[2*e,se,critical(.95)*se];
 return part(prompt,`E ≈ ${fmt(e)}`,wrong.map(v=>`E ≈ ${fmt(v)}`),['Dar la amplitud completa en lugar de la semiamplitud.','Omitir el cuantil y dar solo el error típico.','Usar confianza del 95% en lugar de la solicitada.'],[
  ['El error máximo de estimación asociado al intervalo es su margen o semiamplitud, no su amplitud total.',`E = z·√(${frac('p̂·q̂','n')})`],
  ['Conservamos la proporción y el tamaño acreditados en el apartado anterior.',`p̂ = ${fmt(c.p)}; n = ${c.n}; confianza = ${fmt(c.confidence*100)}%`],
  ['Usamos el cuantil bilateral de esa confianza.',`Φ(z) = ${fmt((1+c.confidence)/2)} ⇒ z ≈ ${fmt(z)}`],
  ['Sustituimos sin confundir el porcentaje con la proporción.',`E = ${fmt(z)}·√(${frac(`${fmt(c.p)}·${fmt(1-c.p)}`,c.n)}) ≈ ${fmt(e)}`],
  ['Comprobamos con los extremos del intervalo que la amplitud es el doble.',`IC ≈ ${iv(c.p,e)}; (U − L)/2 ≈ ${fmt(e)}`],
  ['Expresamos también el margen en puntos porcentuales, sin cambiar el nivel de confianza.',`E ≈ ${fmt(100*e)} puntos porcentuales`],
 ],'INTERVAL_HALFWIDTH_CDF',{margin:e,se,z,distractorMargins:wrong});
}
export function solve(c,text){
 const p=officialParts(projectDesignInference(c.index,text));
 if(c.task==='proportion-design')return[proportionInterval(c,p[0]),sampleSize(c,p[1])];
 if(c.task==='proportion-margin')return[proportionInterval(c,p[0]),marginPart(c,p[1])];
 if(c.task==='mean-width'){
  const a=intervalPart(c,p[0]);a.solutionSteps.unshift({explanation:'La varianza está expresada en unidades al cuadrado. Su raíz positiva es la desviación típica.',math:'σ² = 225 mg²; σ = √(225) = 15 mg'});
  return[a,sampleSize(c,p[1])];
 }
 if(c.task==='strata-mean-design')return[part(p[0],'n = 40',['n = 10','n = 25','n = 100'],['Confundir el número del tercer estrato con el total de la muestra.','Usar el peso del segundo estrato para los diez individuos del tercero.','Invertir incorrectamente el factor de selección.'],[
  ['La afijación proporcional usa la misma fracción de muestreo en todos los estratos.',`nᵢ/n = Nᵢ/N`],
  ['Identificamos el tercer estrato, que tiene 250 personas, no 400.',`N = 1000; N₃ = 250; n₃ = 10`],
  ['Sustituimos y despejamos el tamaño total de la muestra.',`10/n = 250/1000 ⇒ n = 10·1000/250 = 40`],
  ['Comprobamos la distribución completa, que en este caso es entera y no requiere una regla de redondeo.',`n₁ = 6; n₂ = 16; n₃ = 10; n₄ = 8`],
  ['La suma coincide con el tamaño total y todas las tasas de selección son iguales.',`6 + 16 + 10 + 8 = 40; 6/150 = 16/400 = 10/250 = 8/200 = 0,04`],
 ],'EXACT_PROPORTIONAL_STRATA',{population:[150,400,250,200],allocation:[6,16,10,8],total:40}),sampleSize(c,p[1])];
 if(c.task==='proportion-compatibility'){
  const a=proportionInterval(c,p[0]),v=a.verification.numericalEvidence,inside=c.hypothesis>=v.interval[0]&&c.hypothesis<=v.interval[1];assert.ok(inside);
  a.answer+='; 13/20 es compatible.';a.finalAnswer=a.answer;
  a.distractors=[iv(c.p,v.margin)+'; 13/20 no es compatible.',iv(c.p,v.se)+'; 13/20 es compatible.',iv(c.p,2*v.margin)+'; 13/20 es compatible.'];
  a.distractorEvidence=['Negar la compatibilidad aunque 0,65 está dentro del intervalo.','Omitir el cuantil al calcular el margen.','Duplicar el margen usando la amplitud como error.'];
  a.solutionSteps.push({explanation:'Comprobamos si la proporción propuesta pertenece al intervalo: es compatible, pero esto no demuestra que sea el valor verdadero.',math:`13/20 = 0,65 ∈ ${iv(c.p,v.margin)}`});
  a.verification.numericalEvidence.hypothesis=c.hypothesis;a.verification.numericalEvidence.inside=inside;
  a.verification.numericalEvidence.distractorIntervals=[[c.p-v.margin,c.p+v.margin],[c.p-v.se,c.p+v.se],[c.p-2*v.margin,c.p+2*v.margin]];
  a.verification.numericalEvidence.distractorCompatibility=[false,true,true];
  return[a,marginPart(c,p[1]),sampleSize(c,p[2])];
 }
 if(c.task==='inverse-proportion')return[
  part(p[0],'p̂ = 0,35',['p̂ = 0,04','p̂ = 0,31','p̂ = 0,39'],['Confundir centro con margen.','Tomar el límite inferior como estimación.','Tomar el límite superior como estimación.'],[
   ['Un intervalo bilateral simétrico para la proporción tiene centro en la frecuencia muestral.',`IC = (p̂ − E; p̂ + E) = (0,31; 0,39)`],
   ['Sumamos los extremos y dividimos por dos para recuperar el centro.',`p̂ = (0,31 + 0,39)/2 = 0,35`],
   ['La semiamplitud mostrada es distinta de la proporción estimada.',`E mostrado = (0,39 − 0,31)/2 = 0,04`],
   ['Comprobamos reconstruyendo los extremos publicados, expresados con dos decimales.',`0,35 − 0,04 = 0,31; 0,35 + 0,04 = 0,39`],
   ['La estimación indica el porcentaje favorable observado, no la confianza del intervalo.',`p̂ = 35%`],
  ],'SYMMETRIC_INTERVAL_CENTER',{interval:c.interval,center:c.p,displayedMargin:.04}),
  part(p[1],'175 personas',['155 personas','195 personas','325 personas'],['Multiplicar por el límite inferior.','Multiplicar por el límite superior.','Contar a los contrarios en lugar de a los favorables.'],[
   ['La frecuencia relativa es el cociente entre favorables y total.',`p̂ = favorables/n`],
   ['Despejamos el número de personas usando el tamaño indicado.',`favorables = n·p̂`],
   ['Sustituimos el centro recuperado en el apartado anterior.',`favorables = 500·0,35 = 175`],
   ['Comprobamos que es un entero y recupera exactamente la proporción.',`175/500 = 0,35; 500 − 175 = 325`],
   ['No usamos los extremos del intervalo como si fueran frecuencias observadas.',`favorables = 175 personas`],
  ],'EXACT_FREQUENCY_COUNT',{n:500,p:.35,count:175}),sampleSize(c,p[2])];
 throw Error('Unsupported official design');
}
export function buildDesignContrastBatch(id='batch-0368',selected=cases){return buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDesignContrastBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0368-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0368.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

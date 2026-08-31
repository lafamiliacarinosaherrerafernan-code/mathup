// Official PDF pages inspected before solving. No historical answer is an input.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical} from './resolve-andalucia-inference-2012.mjs';
import {buildConfidenceParts,hypothesisValues} from './resolve-andalucia-inference-confidence-and-tests.mjs';
import {part,officialParts,fmt as f} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:686,whole:true,kind:'proportion',n:50,successes:14,center:.28,nullValue:.4,tail:'left',levels:[.015],literals:['al menos un 40%','50 sujetos','murieron 14','0.015'],conclusion:'No hay evidencia suficiente al 1,5% para rechazar una mortalidad de al menos el 40%; no queda demostrada estadísticamente la eficacia del fármaco.'},
 {index:689,kind:'mean',sigma:8.9,n:100,center:71.8,nullValue:70,tail:'right',levels:[.05],tasks:['hypotheses','rejection','decision'],unit:'años',literals:['típica 8.9 años','no supera los 70 años','100 individuos','71.8 años','5%'],conclusion:'Se rechaza la hipótesis de que la vida media no supera 70 años; la muestra aporta evidencia de una media superior.'},
 {index:696,kind:'mean',sigma:67,n:100,center:130,nullValue:120,tail:'right',levels:[.05],tasks:['hypotheses','acceptance','decision'],unit:'euros',literals:['no supera los 120 euros','100 extracciones','130 euros','típica 67 euros','región de aceptación'],conclusion:'No se rechaza la afirmación del director al 5%; no hay evidencia suficiente de una extracción media superior a 120 euros. Esto no prueba que su afirmación sea cierta.'},
 {index:704,kind:'mean',sigma:.25,n:20,center:4.8,nullValue:5,tail:'left',levels:[.01],tasks:['hypotheses','rejection','decision'],unit:'kg',literals:['desviación típica 0.25 kg','no baja de 5 kg','20 sacos','4.8 kg','0.01'],conclusion:'Se rechaza al 1% la afirmación del vendedor: la muestra aporta evidencia de que el peso medio es inferior a 5 kg.'},
 {index:760,whole:true,kind:'mean',sigma:1,n:100,center:8.3,nullValue:8,tail:'right',levels:[.05],unit:'horas semanales',literals:['lo sumo, de 8 horas semanales','100 jóvenes','8.3','igual a 1 hora','5%'],conclusion:'Se rechaza la afirmación de la concejalía: hay evidencia al 5% de que el tiempo medio de lectura supera 8 horas semanales.'},
 {index:860,kind:'mean',sigma:.2,n:1000,center:10.0037,nullValue:10,tail:'right',levels:[.025],tasks:['hypotheses','acceptance','decision'],unit:'cm',literals:['a lo sumo, 10 cm','1000 piezas','10.0037 cm','típica 0.2 cm','región de aceptación'],officialParameterRecovery:{parameter:'alpha',value:.025,documentHash:'3382ee86917021a5a103b010202f2bb187eafb9b883e084bbfe921302d86e503',page:1,question:'A.4.b',imageHash:'d616dca96c25821846e4a029e39d235725018abb1900951caf11113d7f6e2490',literal:'α = 0.025',reason:'Visible in the official PDF, omitted by text extraction; original literal retained.'},conclusion:'No se rechaza al 2,5% la hipótesis de una longitud media de a lo sumo 10 cm. La pequeña diferencia observada no acredita que la máquina produzca piezas de media superior a 10 cm.'},
 {index:870,kind:'mean',sigma:6,n:36,center:82,nullValue:80,tail:'right',levels:[.05],tasks:['rejection','decision'],unit:'mg/kg',literals:['típica 6 mg/kg','tamaño 36','80 mg/kg','5%','82 mg/kg'],conclusion:'Se rechaza al 5% que la concentración media no supere 80 mg/kg; hay evidencia estadística de superación del límite sanitario.'},
 {index:1337,kind:'mean',sigma:5,n:10,center:87,sample:[80,83,87,95,86,92,85,83,84,95],nullValue:88,tail:'left',levels:[.05],tasks:['hypotheses-rejection','decision'],unit:'kg',literals:['88 kg o','10 de sus naranjos','80 , 83 , 87 , 95 , 86 , 92 , 85 , 83 , 84 , 95','típica 5 kg','0.05'],conclusion:'No se rechaza la creencia del agricultor de una producción media de al menos 88 kg. No rechazarla no la confirma: la muestra no acredita una disminución al 5%.'},
];
export const sourceImages={686:'8255a62e4c2a470f030feea11c3df76d9e9b6cd9d418746f9ecc2dcb6b860dd8',689:'e104a63cb72a39497d2161a519d65eeded388abac2d071005d9679633a650b16',696:'144d1359929c6914adc7b3d176751f28783670686800d31e671f44e6165f13ba',704:'c89e59324fc439c25cd8c3ea537080920073d3421c0b52c741c80e95c072d0fe',760:'fd91d339f4dfe4da16d3b57669dfd7fdabbe79d22d964510c9335eccd0515930',860:'d616dca96c25821846e4a029e39d235725018abb1900951caf11113d7f6e2490',870:'164fc773bd5e0f122c46dc98c7208591648bbe4f1533ca3d77d49c88e8bf950a',1337:'c5247038b9783199173e9f2b300e68d83d84ffefdb935c33c8381ee070516559'};
export function buildRegionParts(c,text){
 const alpha=c.levels[0],v=hypothesisValues(c),left=c.tail==='left',param=c.kind==='mean'?'μ':'p',proportion=c.kind==='proportion',estimate=proportion?'p̂':'x̄',unit=proportion?'':c.unit;
 const full=buildConfidenceParts({...c,task:'test',whole:true,contextConclusions:[c.conclusion]},text)[0];
 if(c.sample)full.solutionSteps[1].explanation='Sumamos todas las producciones oficiales y dividimos entre el número de naranjos seleccionados.';
 if(c.whole)return [full];
 const ps=officialParts(text);assert.equal(ps.length,c.tasks.length);
 const h=(direction=c.tail,threshold=c.nullValue)=>`H₀: ${param} ${direction==='left'?'≥':'≤'} ${f(threshold)}; H₁: ${param} ${direction==='left'?'<':'>'} ${f(threshold)}`;
 const opposite=left?'right':'left';
 return ps.map((p,i)=>{
  const task=c.tasks[i];
  if(task==='decision')return {...structuredClone(full),partId:p.id,prompt:p.prompt};
  if(task==='hypotheses'){
   const answer=h(),wrong=[h(opposite),`H₀: ${param} = ${f(c.nullValue)}; H₁: ${param} ≠ ${f(c.nullValue)}`,h(c.tail,c.center)];
   return part(p,answer,wrong,['Invertir el sentido de la alternativa.','Plantear dos colas cuando se pregunta por una sola.','Usar la media observada como umbral de la hipótesis.'],[
    ['El parámetro es la media poblacional, no el valor observado en la muestra.',`parámetro: ${param}; umbral oficial = ${f(c.nullValue)} ${c.unit}`],
    ['La afirmación inicial incluye la igualdad. La alternativa expresa la desviación que se pretende detectar.',left?'al menos: ≥; descenso a detectar: <':'a lo sumo: ≤; aumento a detectar: >'],
    ['La observación muestral se utilizará para contrastar, no para escoger a posteriori el umbral.',`x̄ = ${f(c.center)}; μ₀ = ${f(c.nullValue)}`],
    ['Fijamos una sola cola, según el sentido del problema.',left?'cola izquierda':'cola derecha'],
    ['Las hipótesis separan la afirmación de su alternativa sin omitir la igualdad.',answer],
   ],'DIRECTIONAL_POPULATION_HYPOTHESES',{...v,task,correct:{tail:c.tail,nullValue:c.nullValue},wrong:[{tail:opposite},{tail:'both'},{nullValue:c.center}]});
  }
  const acceptance=task==='acceptance',withH=task==='hypotheses-rejection',bound=left?-v.cut:v.cut;
  const sign=acceptance?(left?'≥':'≤'):(left?'<':'>');
  const output=(b,s=sign)=>`${withH||c.includeHypotheses?h()+'. ':''}${acceptance?'No rechazo':'Rechazo'}: Z ${s} ${f(b)}; ${estimate} ${s} ${f(c.nullValue+b*v.se)}${proportion?'':' '+unit}.`;
  const wrongBounds=[left?-critical(1-alpha):critical(1-alpha),-bound,bound*Math.sqrt(c.n)];
  const answer=output(bound);
  return part(p,answer,wrongBounds.map(b=>output(b)),['Repartir el riesgo entre dos colas en un contraste unilateral.','Usar el extremo de la cola opuesta.','Confundir la desviación individual con el error típico de la media.'],[
   ['Formulamos el contraste con el umbral oficial y la igualdad dentro de H₀.',h()],
   proportion?['La aproximación normal de la proporción se calcula bajo la frontera de H₀. Ambas frecuencias esperadas son suficientes.',`n·p₀ = ${f(c.n*c.nullValue)}; n·(1 − p₀) = ${f(c.n*(1-c.nullValue))}; SE₀ = √(frac{p₀·(1 − p₀)}{n}) ≈ ${f(v.se)}; Z = frac{p̂ − p₀}{SE₀}`]:['La población es normal y su desviación es conocida. Tipificamos la media bajo la frontera de H₀.',`Z = frac{x̄ − μ₀}{σ/√(n)}; SE₀ = frac{${f(c.sigma)}}{√(${c.n})} ≈ ${f(v.se)}`],
   ['La región se decide antes de usar la media observada. Toda la significación se coloca en la cola de la alternativa.',`α = ${f(alpha)}; ${left?'Φ(c) = α':'Φ(c) = 1 − α'} ⇒ c ≈ ${f(bound)}`],
   [acceptance?'La región de no rechazo es el complemento de la región crítica. «Aceptación» no significa demostrar que H₀ sea verdadera.':'Los valores que caen más allá del umbral en la cola de H₁ forman la región crítica.',`Z ${sign} ${f(bound)}`],
   proportion?['Despejamos la proporción muestral sin cambiar el sentido: el error típico bajo H₀ es positivo.',`p̂ ${sign} p₀ + c·SE₀ = ${f(c.nullValue)} + (${f(bound)})·${f(v.se)} ≈ ${f(c.nullValue+bound*v.se)}`]:['Despejamos la media sin cambiar el sentido de la desigualdad: el error típico es positivo.',`x̄ ${sign} μ₀ + c·SE₀ = ${f(c.nullValue)} + (${f(bound)})·${f(v.se)} ≈ ${f(c.nullValue+bound*v.se)} ${c.unit}`],
   ['Comprobamos la probabilidad de la región bajo H₀ con la función de distribución normal.',`P₀(región) = ${f(acceptance?1-alpha:alpha)}`],
   ['La respuesta expresa la misma región en ambas escalas.',answer],
  ],'NORMAL_ACCEPTANCE_OR_CRITICAL_REGION',{...v,task,correctBound:bound,wrongBounds,sign});
 });
}
export function buildRegionBatch(id='batch-0254',selected=cases){
 const r=buildBatch(selected,id,buildRegionParts,(_c,x)=>({parts:x.parts.map(p=>({partId:p.partId,...p.verification}))}));
 for(const x of r.batch.records)if(x.correctionEvidence.parameters.whole){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}
 return r;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const id=process.argv[2]??'batch-0254',r=buildRegionBatch(id),archive=`artifacts/pau-andalucia-resolution/audit/correction-${id.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${id}.json`,JSON.stringify(r.batch,null,2)+'\n');
 console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));
}

// Two intact official sampling tasks, solved without historical answer inputs.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt,intervalPart,sizePart} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:1253,kind:'mean',sigma:4,n:16,center:50,knownMean:true,unit:'',lower:47.5,upper:52.5,literals:['Normal de media 50','desviación típica 4','tamaño 16','distribución de la media muestral','entre 47.5 y 52.5']},
 {index:1433,kind:'mean',sigma:20,n:100,center:110,knownMean:false,unit:'euros',confidence:.9,error:2,literals:['100\nclientes','media\nmuestral de 110 euros','típica 20 euros','confianza al 90%','2 euros','tamaño mínimo']},
];
export function distribution(c,p){
 const sd=c.sigma/Math.sqrt(c.n),mu=c.knownMean?fmt(c.center):'μ',form=(m,s)=>`Normal; media ${m}; desviación típica ${fmt(s)}${c.unit?' '+c.unit:''}.`;
 const alternatives=[{mean:mu,sd:c.sigma},{mean:mu,sd:c.sigma/c.n},{mean:c.knownMean?fmt(c.center/c.n):fmt(c.center),sd}];
 return part(p,form(mu,sd),alternatives.map(x=>form(x.mean,x.sd)),['Confundir la dispersión individual con la de la media muestral.','Dividir la desviación típica entre n en lugar de entre su raíz.',c.knownMean?'Dividir otra vez la esperanza poblacional entre el tamaño muestral.':'Confundir la media observada con el parámetro poblacional desconocido.'],[
  ['Una media de observaciones independientes de una población normal sigue una distribución normal exacta.',`X normal; σ = ${fmt(c.sigma)}; n = ${c.n}`],
  ['Aplicamos linealidad de la esperanza a la suma y dividimos entre el tamaño muestral.',`E(x̄) = frac{n·${mu}}{n} = ${mu}`],
  ['La independencia permite sumar las varianzas. Dividir una variable entre n divide su varianza entre n².',`Var(x̄) = frac{n·σ²}{n²} = frac{${fmt(c.sigma**2)}}{${c.n}} = ${fmt(sd**2)}`],
  ['La desviación típica es la raíz cuadrada de la varianza; indicamos su nombre para no confundir las convenciones de N.',`SD(x̄) = frac{σ}{√(n)} = ${fmt(sd)}${c.unit?' '+c.unit:''}`],
  [c.knownMean?'Aquí el enunciado proporciona la media poblacional, de modo que se utiliza su valor conocido.':'La media observada sirve para estimar μ en el siguiente apartado; no convierte μ en un parámetro conocido.',c.knownMean?`μ = ${fmt(c.center)}`:`μ desconocida; x̄ observada = ${fmt(c.center)} euros`],
  ['Verificamos por separado la esperanza y la varianza y damos la distribución solicitada.',form(mu,sd)],
 ],'NORMAL_SAMPLE_MEAN_EXPECTATION_VARIANCE',{mean:c.knownMean?c.center:null,sd,variance:sd**2,alternatives});
}
export function buildDistributionCompletionParts(c,text){
 const p=officialParts(text),a=distribution(c,p[0]);
 if(!c.knownMean)return[a,intervalPart(c,p[1]),sizePart(c,p[2])];
 const sd=c.sigma/Math.sqrt(c.n),lo=(c.lower-c.center)/sd,hi=(c.upper-c.center)/sd,value=normalCDF(hi)-normalCDF(lo);
 const wrong=[1-value,normalCDF((c.upper-c.center)/c.sigma)-normalCDF((c.lower-c.center)/c.sigma),normalCDF(hi)],form=x=>`P ≈ ${fmt(x)}`;
 return[a,part(p[1],form(value),wrong.map(form),['Tomar la probabilidad exterior al intervalo.','Tipificar con la desviación de un individuo en lugar del error típico.','Usar solo la acumulada superior y no restar la acumulada inferior.'],[
  ['Usamos la distribución de la media calculada en el apartado a), no la distribución individual.', 'x̄ normal; media 50; desviación típica 1'],
  ['Expresamos el suceso pedido antes de operar.', 'P(47,5 ≤ x̄ ≤ 52,5)'],
  ['Restamos la media poblacional y dividimos por la desviación típica de la media.', 'Z = frac{x̄ − 50}{1}; Z normal estándar'],
  ['Transformamos ambos extremos conservando el sentido de las desigualdades.', 'frac{47,5 − 50}{1} = −2,5; frac{52,5 − 50}{1} = 2,5'],
  ['Restamos las acumuladas. La continuidad hace irrelevante incluir los extremos.', `P = Φ(2,5) − Φ(−2,5) ≈ ${fmt(value)}`],
  ['La simetría proporciona una segunda expresión de comprobación.', `P = 2·Φ(2,5) − 1 ≈ ${fmt(value)}`],
  ['Contrastamos el área con la distribución normal calculada independientemente y expresamos la probabilidad, no un porcentaje sin unidad.', `${form(value)}; aproximadamente ${fmt(100*value)}%`],
 ],'NORMAL_SAMPLE_MEAN_INTERVAL_PROBABILITY',{sd,lo,hi,value,wrong})];
}
export function buildDistributionCompletionBatch(id='batch-0273',selected=cases){return buildBatch(selected,id,buildDistributionCompletionParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDistributionCompletionBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0273-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0273.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

// Official PDF pages individually inspected; parameterized solutions are not
// inferred from previous generated answers. All original evidence is retained.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts,critical} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt,intervalPart,sizePart} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:914,task:'interval-size',kind:'mean',sigma:8,n:9,center:15,sample:[10,17,8,27,6,9,32,5,21],confidence:.92,nextConfidence:.955,error:1.5,strict:true,unit:'minutos',population:'media poblacional del tiempo de desplazamiento desde el domicilio al trabajo',literals:['desviación típica 8 minutos','9 empleados','10 17 8 27 6 9 32 5 21','92 %','95.5 %','inferior a 1.5 minutos']},
 {index:947,task:'interval-size',kind:'proportion',n:500,successes:380,center:.76,confidence:.97,nextConfidence:.96,error:.02,unit:'proporción',population:'proporción de estudiantes que son usuarios de esa red social',literals:['500 estudiantes','380','usuarios de una determinada red social','97%','96%','no supere el 2%']},
 {index:977,task:'interval-margin',kind:'mean',sigma:50,n:10,center:610.4,sample:[682,553,555,666,657,649,522,568,700,552],confidence:.95,unit:'entradas',literals:['682 553 555 666 657 649 522 568 700 552','desviación típica 50 entradas','95%','error máximo']},
 {index:978,task:'interval-new-margin',kind:'mean',populationVariance:7.84,sigma:2.8,n:12,center:10.8,sample:[9.5,9,10.2,8.6,11.4,10.8,12.6,11,11.8,14.5,10.4,9.8],confidence:.935,nextN:50,nextConfidence:.99,unit:'años',literals:['varianza 7.84','12 lavadoras','9.5 9 10.2 8.6 11.4 10.8 12.6 11 11.8 14.5 10.4 9.8','93.5 %','50 lavadoras','99 %']},
 {index:980,task:'interval-size',kind:'mean',sigma:3,n:25,center:60,confidence:.95,nextConfidence:.99,error:1,strict:true,unit:'g',population:'media poblacional del peso de las ciruelas',literals:['desviación típica 3 gramos','25 ciruelas','60 gramos','95%','99%','inferior a 1 gramo']},
 {index:1002,task:'interval-margin-size',kind:'mean',sigma:2.5,n:10,center:18,sample:[18,18.5,14,16.5,19,20,20.5,17,18.5,18],confidence:.96,error:1,strict:true,unit:'unidades de la variable',literals:['desviación típica es 2.5','18 18.5 14 16.5 19 20 20.5 17 18.5 18','96%','inferior a 1']},
 {index:1004,task:'sd-interval-size',kind:'mean',sigma:4,n:12,center:10.6,sample:[11.8,10,9.8,12,9.7,10.8,9.6,11.3,10.4,12.2,9.1,10.5],confidence:.97,error:1.2,strict:true,unit:'unidades de X',literals:['típica 4','11.8 10 9.8 12 9.7 10.8 9.6 11.3 10.4 12.2 9.1 10.5','97 %','menor que 1.2']},
 {index:1110,task:'interval-size',kind:'proportion',n:500,successes:175,center:.35,confidence:.94,nextConfidence:.97,error:.02,unit:'proporción',population:'proporción poblacional de individuos que usan el transporte público en la ciudad',literals:['500 individuos','175','94 %','97 %','a lo sumo en un 2 %']},
 {index:1124,task:'interval-size',kind:'mean',populationVariance:9.61,sigma:3.1,n:10,center:31.19,sample:[30.6,30,31.3,29.7,32.3,32,32.8,31.5,31.2,30.5],confidence:.97,nextConfidence:.97,error:.15,strict:true,unit:'meses',population:'media poblacional de la vida útil de los teléfonos',literals:['varianza 9.61','10 teléfonos','30.6 30 31.3 29.7 32.3 32 32.8 31.5 31.2 30.5','97%','inferior a 0.15 meses']},
 {index:1163,task:'interval-margin-size',kind:'mean',sigma:25,n:100,center:230,confidence:.96,error:2,unit:'g',literals:['desviación típica 25 g','100 tarros','230 g','96 %','sea 2 g']},
 {index:1286,task:'interval-size',kind:'mean',sigma:6,n:64,center:35,confidence:.95,nextConfidence:.99,error:.5,strict:true,unit:'puntos',population:'media poblacional de las puntuaciones del test',literals:['desviación típica de 6 puntos','64 participantes','35 puntos','95 %','inferior a 0.5 puntos','99 %']},
];
export const sourceImages={914:'0b9b2d8a89ab3624ab805318ca91b63e372783db310c2555a717eefb47fea0e2',947:'93063959e1cc5550b06507e7441496fec213cad4f6badc12d38be4968904296d',977:'4843314392b09c7973cffd5095b2bc7f0dace6c795aed14995bd7bda13a8ea20',978:'2784df25cdab0c89dd7659f46b89fc2fd3d7197324150c717472f7dc439b0f51',980:'9914586203b7a389e1f4badcda64f13886e59c0edb19804d2b415222ee939305',1002:'7fb239bd156998e9e8ccfb7e91006baaa8f63f71c46499e9fcb2ff5df1d25ac5',1004:'0763e9041d0e190236d3ec8da1a8b53cd147dc4b732753d8b1b0c492b07b37d2',1110:'44f356a28a7bfec4c0d9321901a431547807dfb37b9ecee221d94033510bdf74',1124:'2f8f1a51f6908412dfcadfc5ec1c92ebaa1011dc46b1a0003bd8caab7fbc2d08',1163:'231acd150909e6e25e5b9dfced084311876652b65abc24ba3cd9ff0823cbd0cd',1286:'ac38b1efe5a4d939d2e74e6ed0f02e63408bc723089f0250f90b2f3d2796442d'};
const f=fmt,frac=(a,b)=>`frac{${a}}{${b}}`;
export function marginPart(c,p,{newSample=false}={}){
 const z=critical(c.confidence),se=c.sigma/Math.sqrt(c.n),margin=z*se;
 const wrong=[2*margin,se,z*c.sigma/c.n],answer=x=>`E ≈ ${f(x)} ${c.unit}`;
 return part(p,answer(margin),wrong.map(answer),['Confundir el margen con la amplitud completa.','Omitir el valor crítico bilateral.','Dividir la desviación entre n en vez de entre su raíz.'],[
  [newSample?'En este apartado cambian el tamaño y la confianza. El margen no requiere conocer la nueva media muestral.':'El error máximo de estimación del intervalo es su semiamplitud, no la amplitud completa.',`n = ${c.n}; σ = ${f(c.sigma)} ${c.unit}; confianza = ${f(c.confidence*100)}%`],
  ['Dividimos el riesgo entre las dos colas y determinamos el cuantil normal.',`α = ${f(1-c.confidence)}; Φ(z) = ${f((1+c.confidence)/2)} ⇒ z ≈ ${f(z)}`],
  ['Escribimos la fórmula general antes de sustituir.',`E = z·${frac('σ','√(n)')}`],
  ['La desviación de la media disminuye con la raíz del tamaño de muestra.',`SE = ${frac(f(c.sigma),`√(${c.n})`)} ≈ ${f(se)} ${c.unit}`],
  ['Calculamos conservando precisión interna.',`E ≈ ${f(z)}·${f(se)} ≈ ${f(margin)} ${c.unit}`],
  ['Comprobamos por la longitud del intervalo: los extremos distan 2E, por lo que su semiamplitud es E. Es un margen asociado a la confianza, no una cota absoluta para todos los muestreos.',`amplitud = 2E ≈ ${f(2*margin)} ${c.unit}`],
 ],'NORMAL_INTERVAL_HALFWIDTH',{z,se,margin,wrong,confidence:c.confidence,n:c.n});
}
export function buildIntervalMarginParts(c,text){
 const p=officialParts(text);let ps;
 if(c.task==='interval-size')ps=buildParts(c,text);
 else if(c.task==='sd-interval-size'){
  const sd=c.sigma/Math.sqrt(c.n),res=x=>`SD(x̄) ≈ ${f(x)} ${c.unit}`;
  ps=[part(p[0],res(sd),[c.sigma,c.sigma/c.n,c.sigma*c.sigma/c.n].map(res),['Usar la desviación individual.','Dividir entre n en lugar de entre su raíz.','Confundir varianza con desviación típica.'],[
   ['La población es normal y su desviación típica es conocida. Se pregunta por la dispersión de la media muestral, en las mismas unidades de X; el enunciado no especifica una unidad física.',`σ = 4; n = 12`],
   ['La media es la suma de las observaciones dividida por el tamaño.',`x̄ = ${frac('X₁ + ⋯ + X₁₂','12')}`],
   ['Para observaciones independientes, sumamos las varianzas; dividir una variable entre n divide su varianza entre n².',`Var(x̄) = ${frac('n·σ²','n²')} = ${frac('σ²','n')}`],
   ['La desviación típica es la raíz positiva de la varianza.',`SD(x̄) = ${frac('σ','√(n)')} = ${frac('4','√(12)')} ≈ ${f(sd)}`],
   ['Comprobamos que al elevarla al cuadrado recuperamos la varianza, y que es menor que la desviación individual.',`SD(x̄)² = ${frac('16','12')}; ${f(sd)} < 4`],
  ],'NORMAL_SAMPLE_MEAN_STANDARD_DEVIATION',{sd,variance:c.sigma*c.sigma/c.n}),intervalPart(c,p[1]),sizePart(c,p[2])];
 }else{
  ps=[intervalPart(c,p[0]),marginPart(c.task==='interval-new-margin'?{...c,n:c.nextN,confidence:c.nextConfidence}:c,p[1],{newSample:c.task==='interval-new-margin'})];
  if(c.task==='interval-margin-size')ps.push(sizePart(c,p[2]));
 }
 assert.equal(ps.length,p.length);
 if(c.populationVariance!==undefined){assert.ok(Math.abs(c.sigma*c.sigma-c.populationVariance)<1e-12);ps[0].solutionSteps.unshift({explanation:'El dato oficial es una varianza. Antes de usar la fórmula del error típico tomamos su raíz positiva para obtener la desviación típica.',math:`σ² = ${f(c.populationVariance)} ${c.unit}² ⇒ σ = √(${f(c.populationVariance)}) = ${f(c.sigma)} ${c.unit}`});}
 return ps;
}
export function buildIntervalMarginBatch(batchId='batch-0253',selected=cases){return buildBatch(selected,batchId,buildIntervalMarginParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const result=buildIntervalMarginBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0253-original-records.json';
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(result.originals,null,2)+'\n');
 fs.writeFileSync('tmp/batch-0253.json',JSON.stringify(result.batch,null,2)+'\n');
 console.log(JSON.stringify(result.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));
}

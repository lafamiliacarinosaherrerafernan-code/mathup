// Official PDF pages inspected before coding; statement evidence remains immutable.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part,intervalPart,sizePart,officialParts,fmt} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:63,kind:'finite',strata:[60,40,30,50,20],fraction:.2,knownPopulation:[10,12,11,18],meanOfMeans:13.2,literals:['60 estudiantes','40 de Ingeniería Informática','30 de Ingeniería Civil','50 de Ingeniería Mecánica','20 de Ingeniería Aeronáutica','20 %','{a, 10, 12, 11, 18}','tamaño 3','es 13.2']},
 {index:1001,kind:'mean',strata:[150,400,250,200],thirdSample:10,sigma:6,confidence:.95,error:1,unit:'kg',literals:['tamaño 1000','150,','400, 250 y 200','10 individuos del tercer estrato','típica 6 kg','95%','superior a 1 kg']},
 {index:1563,kind:'mean',sigma:2,n:16,center:9,sample:[8,9.2,10,8.5,12,9,11.3,7,8.5,8.3,7.6,9,9.4,10.5,8.9,6.8],confidence:.975,nextConfidence:.90,error:.3,unit:'minutos',literals:['16 pacientes','8 9.2 10 8.5 12 9 11.3 7 8.5 8.3 7.6 9 9.4 10.5 8.9 6.8','varianza 4','97.5 %','90 %','0.3 minutos']},
];
export function buildStrataParts(c,text){
 const p=officialParts(text);
 if(c.index===63){
  const total=c.strata.reduce((a,b)=>a+b,0),n=total*c.fraction,counts=c.strata.map(x=>x*c.fraction);
  const answer=v=>`Estratificado proporcional; n = 40; Eléctrica ${v[0]}, Informática ${v[1]}, Civil ${v[2]}, Mecánica ${v[3]}, Aeronáutica ${v[4]}.`;
  return [part(p[0],answer(counts),[[8,8,8,8,8],[8,12,6,10,4],[12,8,10,6,4]].map(answer),['Repartir la muestra por igual sin conservar el peso de cada titulación.','Intercambiar los efectivos de Eléctrica e Informática.','Intercambiar los efectivos de Civil y Mecánica.'],[
   ['Las titulaciones forman estratos. Se eligen aleatoriamente estudiantes dentro de cada uno y se usa afijación proporcional, no un reparto igual.', 'muestreo aleatorio estratificado con afijación proporcional'],
   ['Sumamos todos los matriculados para obtener la población.',`N = 60 + 40 + 30 + 50 + 20 = ${total}`],
   ['El tamaño total pedido es el veinte por ciento.',`n = 0,20·200 = ${n}`],
   ['La fórmula general conserva el peso de cada titulación.', 'nᵢ = n·frac{Nᵢ}{N} = 0,20·Nᵢ'],
   ['Sustituimos en el mismo orden en que aparecen las titulaciones.', 'Eléctrica: 12; Informática: 8; Civil: 6; Mecánica: 10; Aeronáutica: 4'],
   ['Comprobamos el total y la fracción de selección en cada estrato. Todos los efectivos son enteros; no se necesita redondeo.', '12 + 8 + 6 + 10 + 4 = 40; frac{12}{60} = frac{8}{40} = frac{6}{30} = frac{10}{50} = frac{4}{20} = 0,20'],
  ],'PROPORTIONAL_STRATA_AND_TOTAL',{total,n,counts}),
  part(p[1],'a = 15',['a = −11,4','a = 33','a = 26'],['Confundir el tamaño muestral 3 con los 5 elementos de la población.','Omitir el valor 18 al sumar los datos conocidos.','Omitir el valor 11 al sumar los datos conocidos.'],[
   ['La media de todas las medias muestrales es la media poblacional: la media muestral es insesgada. La igualdad vale con o sin reposición.', 'E(x̄) = μ = 13,2'],
   ['Hay cinco valores en la población. El denominador de su media es 5, aunque las muestras sean de tamaño 3.', 'μ = frac{a + 10 + 12 + 11 + 18}{5} = frac{a + 51}{5}'],
   ['Igualamos al valor indicado y multiplicamos ambos miembros por cinco.', 'a + 51 = 5·13,2 = 66'],
   ['Despejamos el único valor desconocido.', 'a = 66 − 51 = 15'],
   ['Comprobamos por sustitución y, de manera independiente, enumerando las diez muestras no ordenadas de tamaño 3 sin reposición.', 'frac{15 + 10 + 12 + 11 + 18}{5} = 13,2; suma de las 10 medias = 132'],
  ],'UNBIASED_MEAN_AND_ENUMERATION',{population:[15,10,12,11,18],sampleSize:3,mean:13.2,a:15})];
 }
 if(c.index===1001)return [part(p[0],'n = 40',['n = 10','n = 25','n = 100'],['Confundir la muestra del tercer estrato con la muestra total.','Dividir 250 entre 10 sin relacionarlo con la población total.','Usar el 10 como porcentaje en vez de como número de individuos.'],[
  ['La afijación proporcional mantiene la misma fracción de selección en cada estrato.', 'nᵢ = n·frac{Nᵢ}{N}'],
  ['Usamos el tercer estrato, que tiene 250 individuos, y sus diez seleccionados.', '10 = n·frac{250}{1000}'],
  ['Despejamos el tamaño total de la muestra.', 'n = frac{10·1000}{250} = 40'],
  ['Calculamos los cuatro tamaños como comprobación adicional.', 'n₁ = 6; n₂ = 16; n₃ = 10; n₄ = 8'],
  ['La suma es el tamaño total y todas las fracciones de selección valen 0,04.', '6 + 16 + 10 + 8 = 40; frac{10}{250} = frac{40}{1000} = 0,04'],
 ],'INVERSE_PROPORTIONAL_ALLOCATION',{total:1000,thirdPopulation:250,thirdSample:10,n:40,counts:[6,16,10,8]}),sizePart(c,p[1])];
 if(c.index===1563){
  const a=intervalPart(c,p[0]);
  a.solutionSteps.unshift({explanation:'La cifra 4 es la varianza, no la desviación típica. Tomamos su raíz antes de calcular el error típico.',math:'Var(X) = 4 minutos²; σ = √(4) = 2 minutos'});
  return [a,sizePart({...c,confidence:c.nextConfidence},p[1])];
 }
 throw Error('Unsupported official task');
}
export function buildStrataBatch(batchId='batch-0246',selected=cases){return buildBatch(selected,batchId,buildStrataParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const batchId=process.argv[2]??'batch-0246',r=buildStrataBatch(batchId),archive=`artifacts/pau-andalucia-resolution/audit/correction-${batchId.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${batchId}.json`,JSON.stringify(r.batch,null,2)+'\n');
 console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));
}

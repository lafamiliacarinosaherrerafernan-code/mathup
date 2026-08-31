// Two official PDF tasks; numerical work does not use historical answers.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt} from './resolve-andalucia-inference-multipart.mjs';
import {orderedOfficialParts,eventProbabilityPart} from './resolve-andalucia-probability-event-models.mjs';
import {distribution} from './resolve-andalucia-inference-distribution-completion.mjs';
export const cases=[
 {index:599,kind:'probability',literals:['Almería, Barcelona y Cáceres','20 %, 50 % y 30 %','7 %, 6 % y 2 %','no defectuoso'],scale:1000,cells:[['A','D',14],['A','Dc',186],['B','D',30],['B','Dc',470],['C','D',6],['C','Dc',294]],definitions:'A/B/C: Almería/Barcelona/Cáceres; D: defectuoso; Dc: no defectuoso.',derivation:[
  ['Las tres provincias forman una partición de la producción. Cada porcentaje de defecto está condicionado a su provincia.','P(A)=0,20; P(B)=0,50; P(C)=0,30'],
  ['Multiplicamos a lo largo de cada rama para calcular defectos conjuntos, sin sumar directamente tasas condicionadas.','P(A∩D)=0,20·0,07=0,014; P(B∩D)=0,50·0,06=0,030; P(C∩D)=0,30·0,02=0,006'],
  ['La probabilidad total suma las tres ramas de defecto, que son disjuntas.','P(D)=0,014+0,030+0,006=0,050; P(Dc)=0,950'],
  ['Para Bayes conservamos la rama no defectuosa de Almería y dividimos por todos los no defectuosos.','P(A∩Dc)=0,20·0,93=0,186; P(A|Dc)=frac{0,186}{0,950}']],queries:[
  {n:[0,2,4],d:'all',event:'D',label:'bolígrafo defectuoso',wrong:[[3,50],[3,20],[3,100]],reasons:['Usar únicamente la tasa de Barcelona.','Sumar las tres tasas sin ponderarlas.','Contar solo los defectuosos de Barcelona.']},
  {n:[1],d:[1,3,5],event:'A|Dc',label:'procedencia de Almería entre los no defectuosos',wrong:[[1,5],[93,500],[93,100]],reasons:['Conservar la probabilidad previa de Almería.','Dar solo la probabilidad conjunta sin condicionar.','Invertir la condición y dar no defectuoso dado Almería.']} ]},
 {index:899,kind:'mean',knownMean:true,center:3.85,sigma:1.32,n:121,unit:'kg',literals:['4000 melones','1420','980','720','muestra de 200','afijación\nproporcional','3.85','1. 32','121 sandías','b.1)','b.2)']},
];
export function nestedWatermelonParts(text){
 const [a,b]=officialParts(text),markers=[...b.prompt.matchAll(/(?:^|\n)\s*b\.([12])\)\s*/g)];assert.equal(markers.length,2);
 const common=b.prompt.slice(0,markers[0].index).trim();assert.match(common,/121 sandías/);
 return[a,...markers.map((m,i)=>({id:`b.${m[1]}`,prompt:common+'\n'+b.prompt.slice(m.index+m[0].length,markers[i+1]?.index??b.prompt.length).trim()}))];
}
export function buildPensWatermelonParts(c,text){
 if(c.index===599){const ps=orderedOfficialParts(text);assert.equal(ps.length,2);return ps.map((p,i)=>eventProbabilityPart(c,c.queries[i],p));}
 const [pa,pb,pc]=nestedWatermelonParts(text),population=[1420,980,720,4000-1420-980-720],allocation=population.map(n=>200*n/4000),wrong=[[50,50,50,50],[71,36,49,44],[70,49,36,45]],form=xs=>`A: ${xs[0]}; B: ${xs[1]}; C: ${xs[2]}; D: ${xs[3]} melones`;
 const a=part(pa,form(allocation),wrong.map(form),['Usar afijación uniforme en lugar de proporcional.','Intercambiar las proporciones de B y C.','Trasladar una unidad de A a D pese a que las cuotas ya son enteras.'],[
  ['Los estratos son las cuatro variedades. Calculamos primero cuántos melones tiene la variedad restante.','N = 4000; N(D)=4000−1420−980−720=880'],
  ['La afijación proporcional conserva en la muestra la proporción poblacional de cada variedad.','n(h)=n·frac{N(h)}{N}; n=200'],
  ['Para A y B aplicamos la misma fracción de muestreo.','n(A)=200·frac{1420}{4000}=71; n(B)=200·frac{980}{4000}=49'],
  ['Calculamos igualmente C y D, sin repartir por igual lo que resta.','n(C)=200·frac{720}{4000}=36; n(D)=200·frac{880}{4000}=44'],
  ['Las cuatro cuotas son enteras; no se necesita una regla adicional de redondeo.',form(allocation)],
  ['Comprobamos que el tamaño total es doscientos y que cada cuota es el cinco por ciento de su estrato.','71+49+36+44=200; 71/1420=49/980=36/720=44/880=0,05'],
 ],'STRATIFIED_PROPORTIONAL_ALLOCATION',{population,allocation,wrong,total:4000,sampleSize:200});
 const b=distribution(c,pb),sd=c.sigma/Math.sqrt(c.n),lo=(3.6-c.center)/sd,hi=(4-c.center)/sd,value=normalCDF(hi)-normalCDF(lo);
 const bad=[1-value,normalCDF((4-c.center)/c.sigma)-normalCDF((3.6-c.center)/c.sigma),normalCDF(hi)],pf=x=>`P ≈ ${fmt(x)}`;
 const d=part(pc,pf(value),bad.map(pf),['Tomar la probabilidad exterior al intervalo.','Usar la desviación de una sandía en lugar de la de la media.','Olvidar restar el área acumulada del extremo inferior.'],[
  ['El apartado b.1 proporciona la distribución de la media de ciento veintiuna sandías independientes.','E(x̄)=3,85 kg; SD(x̄)=frac{1,32}{√(121)}=0,12 kg'],
  ['El suceso se refiere al peso medio, no al peso de una sandía.','P(3,6 ≤ x̄ ≤ 4)'],
  ['Tipificamos usando el error típico de la media.','Z=frac{x̄−3,85}{0,12}'],
  ['Transformamos los dos extremos antes de consultar la normal estándar.',`z inferior = ${fmt(lo)}; z superior = ${fmt(hi)}`],
  ['Restamos la acumulada inferior de la superior; no redondeamos el límite inferior antes del cálculo.',`P=Φ(${fmt(hi)})−Φ(${fmt(lo)})≈${fmt(value)}`],
  ['La integración independiente de la densidad confirma el área; comprobamos que interior y exterior suman uno.',`${fmt(value)}+${fmt(1-value)}=1`],
  ['Interpretamos el valor en el contexto de medias de muestras de este tamaño.',`Probabilidad ≈ ${fmt(value)}; aproximadamente ${fmt(value*100)}%`],
 ],'NORMAL_SAMPLE_MEAN_INTERVAL_PROBABILITY',{sd,lo,hi,value,wrong:bad});return[a,b,d];
}
export function buildPensWatermelonBatch(id='batch-0280',selected=cases){const r=buildBatch(selected,id,buildPensWatermelonParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const row of r.batch.records){if(row.subject==='Matemáticas II'){row.primaryTopic='Probabilidad';row.secondaryTopics=['Probabilidad total','Probabilidad condicionada','Teorema de Bayes'];row.examSlot=5;row.block='Probabilidad y estadística';}row.qualityGates.pedagogical='OFFICIAL_PARTS_AND_NESTED_SCOPES_FULLY_SOLVED';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPensWatermelonBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0280-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0280.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

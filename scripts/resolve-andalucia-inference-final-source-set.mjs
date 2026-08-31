// Ten further official exercises inspected on their original PDF pages.
// This set closes neither the complete corpus nor all source-recovery work.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {buildConfidenceParts} from './resolve-andalucia-inference-confidence-and-tests.mjs';
import {part,officialParts,fmt,intervalPart} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:1550,task:'test',whole:true,kind:'proportion',n:1200,successes:336,center:.28,nullValue:.35,tail:'left',levels:[.01],literals:['al menos del 35%','1200','336','0.01'],contextConclusions:['Se rechaza al 1% la creencia de que el partido tiene al menos un 35% de apoyo. La muestra aporta evidencia de una proporción inferior.']},
 {index:1555,task:'test',whole:true,kind:'mean',sigma:4,populationVariance:16,n:36,center:8,nullValue:7,tail:'right',levels:[.05],unit:'minutos',literals:['inferior o igual a 7 minutos','36','8 minutos','varianza 16','0.05'],contextConclusions:['No se rechaza al 5% que el servicio cumpla el criterio de eficacia: los datos son compatibles con una media no superior a 7 minutos. No rechazar no demuestra la eficacia.']},
 {index:1557,task:'interval-size',kind:'mean',sum:5274,sigma:7,n:36,center:146.5,confidence:.94,nextConfidence:.94,error:1.5,amplitude:3,unit:'g',population:'media poblacional del peso neto de las tabletas',literals:['desviación típica 7 gramos','36 tabletas','5274 gramos','94%','amplitud','máximo, de 3 gramos']},
 {index:1578,task:'interval-size',kind:'proportion',n:1000,successes:150,center:.15,confidence:.95,nextConfidence:.95,error:.01,strict:true,unit:'proporción',population:'proporción poblacional de ciudadanos enfermos de COVID-19',literals:['1000 ciudadanos','15 %','95 %','inferior al 1 %']},
 {index:1580,task:'interval-size',kind:'mean',sigma:.2,n:25,center:.3,confidence:.94,nextConfidence:.90,error:.05,strict:true,unit:'segundos',population:'media poblacional del tiempo de reacción',literals:['desviación típica 0.2','tamaño 25','0.3 segundos','94%','90%','inferior a 0.05']},
 {index:1584,task:'interval-size',kind:'mean',sigma:5,n:121,center:23,confidence:.988,nextConfidence:.988,error:1,unit:'euros',population:'media poblacional del precio de los libros de narrativa',literals:['121','23 €','típica 5 €','98.8%','no excediera de 1€']},
 {index:1587,task:'interval-size',kind:'proportion',n:250,successes:115,center:.46,confidence:.995,nextConfidence:.995,error:.05,strict:true,unit:'proporción',population:'proporción de residentes británicos en España favorables a salir de la UE',literals:['250','115','99.5 %','inferior al 5 %']},
 {index:1612,task:'interval-margin-halving',kind:'mean',sigma:.2,n:5,center:7.924,sample:[7.92,7.95,7.91,7.9,7.94],confidence:.99,unit:'unidades de acidez',literals:['desviación típica 0.2','7.92 7.95 7.91 7.9 7.94','99%','error anterior a la mitad']},
 {index:1618,task:'distribution-probability',kind:'mean',sigma:8,n:64,center:65,nextN:100,lower:64,upper:65,unit:'kg',literals:['media 65 kg','desviación típica 8 kg','tamaño 64','tamaño 100','entre 64 y 65 kg']},
 {index:1637,task:'interval-size',kind:'mean',sigma:2,n:10,center:6.5,sample:[6.5,7,6.25,7,5.5,7.25,6.75,6.25,6,6.5],confidence:.90,nextConfidence:.90,error:.1,unit:'horas',population:'media poblacional del tiempo diario dedicado a redes sociales',literals:['desviación típica 2 horas','6.5 7 6.25 7 5.5 7.25 6.75 6.25 6 6.5','90 %','0.1 horas']},
];
export const sourceImages={1550:'c59dd1d3285e81301c002326ebab1f7df4cd5d0af4949ac9d860988b600acf38',1555:'98dfa0c699e7532b6019d0e333fdc0008d82094300283380231fec63ccf55e2e',1557:'0444e6cfa49120e0efaaa7d30dd0d238e7078d36a5feb3cede65dcf01dc1019c',1578:'b1b1deef72f597740a45f2ee6cec836df3bbfb32e39e4109c53ee885e866c41b',1580:'3b714455db6f3f41517e96c80a798566db9db4b454eadd56bb1b0117a2611b38',1584:'de085170f8413de776931c80e9d6becb08227335355fb82ed3cac86142cbf46c',1587:'0763e9041d0e190236d3ec8da1a8b53cd147dc4b732753d8b1b0c492b07b37d2',1612:'e32a2c4f10822a66a088301dd8257c16c1047c3c8f8c0e7448695b66c793ede3',1618:'f5108dfbd800257257ecf53a7743b5518c5ac1c6763bec9e54b640eae53c645f',1637:'3c5444820a56cca5ec1a585edc6df8ead937d96207b713bb14af24d3cd62bb94'};
const f=fmt,frac=(a,b)=>`frac{${a}}{${b}}`;
export function buildFinalParts(c,text){
 if(c.task==='test')return buildConfidenceParts(c,text);
 if(c.task==='interval-size'){
  const ps=buildParts(c,text);
  if(c.sum!==undefined){
   assert.equal(c.sum/c.n,c.center);
   ps[0].solutionSteps[0]={explanation:'El enunciado proporciona el peso total, no la media. Dividimos el total entre el número de tabletas y conservamos la desviación conocida.',math:`Σxᵢ = ${f(c.sum)} g; n = ${c.n}; x̄ = ${frac(f(c.sum),c.n)} = ${f(c.center)} g; σ = ${f(c.sigma)} g`};
  }
  return ps;
 }
 const p=officialParts(text);
 if(c.task==='interval-margin-halving'){
  assert.equal(p.length,3);
  const z=critical(c.confidence),se=c.sigma/Math.sqrt(c.n),e=z*se,n=4*c.n,margin=k=>z*c.sigma/Math.sqrt(k);
  // Algebra, not a rounded threshold: E(n_new)/E(n_old)=sqrt(n_old/n_new).
  assert.ok(margin(n-1)>e/2);assert.equal(n,4*c.n);assert.ok(Math.abs(margin(n)-e/2)<1e-14);
  return [intervalPart(c,p[0]),part(p[1],`E ≈ ${f(e)} unidades de acidez`,[2*e,se,critical(.95)*se].map(x=>`E ≈ ${f(x)} unidades de acidez`),['Confundir semiamplitud con amplitud completa.','Omitir el cuantil y dar solo el error típico.','Utilizar el cuantil del 95% en lugar del 99%.'],[
   ['El error máximo de estimación del intervalo es su semiamplitud, no toda su longitud.',`E = z·${frac('σ','√(n)')}`],
   ['Con confianza del 99%, dejamos 0,5% en cada cola y conservamos el cuantil sin redondear.',`Φ(z) = 0,995; z ≈ ${f(z)}`],
   ['Sustituimos la desviación y el tamaño acreditados.',`E = ${f(z)}·${frac('0,2','√(5)')} ≈ ${f(e)}`],
   ['Comprobamos que coincide con la mitad de la longitud del intervalo del apartado a).',`E = ${frac(`${f(c.center+e)} − ${f(c.center-e)}`,'2')} ≈ ${f(e)}`],
   ['Este margen corresponde al procedimiento de confianza; no es una cota absoluta para cualquier muestra.',`E ≈ ${f(e)} unidades de acidez; confianza = 99%`],
  ],'NORMAL_INTERVAL_HALFWIDTH',{z,se,margin:e}),part(p[2],`n mínimo = ${n}`,[2*c.n,4*c.n-1,8*c.n].map(x=>`n mínimo = ${x}`),['Suponer dependencia inversa de n en vez de su raíz.','Escoger el entero anterior, que no reduce el error a la mitad.','Multiplicar por ocho sin respetar la relación cuadrática.'],[
   ['La confianza y la desviación permanecen fijas: solo se modifica n.',`E anterior = ${frac('z·σ','√(5)')}; E nuevo = ${frac('z·σ','√(n)')}`],
   ['Dividimos ambos márgenes: z y σ se cancelan. No redondeamos el error calculado antes.',`${frac('E nuevo','E anterior')} = √(${frac('5','n')})`],
   ['Exigimos que el cociente no supere la mitad; ambos lados son positivos.',`√(${frac('5','n')}) ≤ ${frac('1','2')} ⇒ ${frac('5','n')} ≤ ${frac('1','4')}`],
   ['Despejamos y elegimos el mínimo entero. Reducir el error a la mitad requiere cuadruplicar el tamaño.',`n ≥ 4·5 = ${n} ⇒ n mínimo = ${n}`],
   ['Con 20 se alcanza exactamente la mitad; con 19 todavía se supera.',`E(20) ≈ ${f(margin(n))}; E(19) ≈ ${f(margin(n-1))}; E anterior/2 ≈ ${f(e/2)}`],
   ['La igualdad exacta procede de la relación entre tamaños y no de decimales redondeados.',`E(20)/E(5) = √(5/20) = 1/2`],
  ],'SAMPLE_SIZE_FROM_EXACT_MARGIN_RATIO',{oldN:c.n,minimum:n,ratio:.5,marginAtMinimum:margin(n),marginAtPrevious:margin(n-1),target:e/2})];
 }
 if(c.task==='distribution-probability'){
  assert.equal(p.length,2);
  const sd=c.sigma/Math.sqrt(c.n),se=c.sigma/Math.sqrt(c.nextN),a=(c.lower-c.center)/se,b=(c.upper-c.center)/se,prob=normalCDF(b)-normalCDF(a);
  const d=x=>`Normal: media ${f(c.center)} kg; desviación típica ${f(x)} kg.`,res=x=>`P ≈ ${f(x)}`;
  return [part(p[0],d(sd),[d(c.sigma),d(c.sigma/c.n),d(c.sigma/Math.sqrt(c.n-1))],['Usar la desviación individual como desviación de la media.','Dividir por n en vez de por su raíz.','Usar n−1, como si se estimara aquí una varianza muestral.'],[
   ['Distinguimos la variable individual de la media de una muestra aleatoria de 64 habitantes.',`E(X) = 65 kg; SD(X) = 8 kg; n = 64`],
   ['Una media de observaciones independientes normales es normal exactamente.',`x̄ = ${frac('X₁ + ⋯ + X₆₄','64')}`],
   ['La esperanza de la media coincide con la media de la población.',`E(x̄) = ${frac('64·65','64')} = 65 kg`],
   ['Sumamos las varianzas y dividimos por el cuadrado del tamaño.',`Var(x̄) = ${frac('64·8²','64²')} = ${frac('8²','64')} = 1 kg²`],
   ['Tomamos la raíz de la varianza e indicamos expresamente qué significa cada parámetro.',`SD(x̄) = ${frac('8','√(64)')} = 1 kg`],
   ['La media permanece en 65, pero la dispersión se reduce respecto a los pesos individuales.',d(sd)],
  ],'NORMAL_SAMPLE_MEAN_DISTRIBUTION',{mean:c.center,sd,variance:sd*sd}),part(p[1],res(prob),[res(1-prob),res(normalCDF((c.upper-c.center)/c.sigma)-normalCDF((c.lower-c.center)/c.sigma)),res(1-normalCDF(a))],['Dar la probabilidad del suceso complementario.','Usar la desviación individual 8 en lugar del error típico 0,8.','Olvidar el límite superior y calcular únicamente la cola por encima de 64.'],[
   ['En este apartado la muestra cambia a 100; no reutilizamos el error típico del apartado a).',`n = 100; E(x̄) = 65 kg; SE = ${frac('8','√(100)')} = 0,8 kg`],
   ['Escribimos el suceso pedido y la tipificación antes de sustituir.',`P(64 < x̄ < 65); Z = ${frac('x̄ − 65','0,8')}`],
   ['Transformamos ambos límites, conservando su orden al dividir por una cantidad positiva.',`P(${frac('64 − 65','0,8')} < Z < ${frac('65 − 65','0,8')}) = P(−1,25 < Z < 0)`],
   ['La probabilidad entre dos límites es la diferencia de las acumuladas, no su suma.',`P = Φ(0) − Φ(−1,25)`],
   ['Evaluamos la normal estándar; la simetría permite comprobarlo como Φ(1,25)−0,5.',`P ≈ 0,5 − ${f(normalCDF(a))} ≈ ${f(prob)}`],
   ['El resultado es menor que 0,5, como corresponde a una franja limitada situada a un lado de la media.',`${f(100*prob)}% de las medias muestrales quedan entre 64 y 65 kg`],
   ['En una distribución continua incluir los extremos no altera la probabilidad.',res(prob)],
  ],'NORMAL_INTERVAL_PROBABILITY',{n:c.nextN,se,lowerZ:a,upperZ:b,probability:prob})];
 }
 throw Error('Unsupported official task');
}
export function buildFinalBatch(id='batch-0252',selected=cases){
 const r=buildBatch(selected,id,buildFinalParts,(_c,x)=>({parts:x.parts.map(p=>({partId:p.partId,...p.verification}))}));
 for(const x of r.batch.records)if(x.correctionEvidence.parameters.whole){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}
 return r;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const id=process.argv[2]??'batch-0252',r=buildFinalBatch(id),archive=`artifacts/pau-andalucia-resolution/audit/correction-${id.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${id}.json`,JSON.stringify(r.batch,null,2)+'\n');
 console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));
}

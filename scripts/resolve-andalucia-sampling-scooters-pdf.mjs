// Source-read 2023/2026 tasks. No historical answer is used to fill source gaps.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part,fmt} from './resolve-andalucia-inference-multipart.mjs';
import {binomialPMF} from './resolve-andalucia-probability-binomial-factory.mjs';
import {parameterReplacements} from './andalucia-probability-pdf-parameter-evidence.mjs';
export const cases=[
 {index:437,kind:'probability',task:'scooters',mean:18,sigma:4,threshold:15,n:120,p:.9,minimum:110,literals:['patinetes eléctricos','ley Normal','al menos']},
 {index:1459,kind:'sampling',task:'strata-clt',sizes:[250,300,400,350],selectedFirst:20,mean:6.4,sigma:.7,n:49,lower:6.3,upper:6.8,literals:['cuatro estratos','afijación proporcional','b1)','b2)']},
];
export function project(c,text){for(const[a,b]of parameterReplacements[c.index])text=text.split(a).join(b);return text;}
export const tail=(n,p,minimum)=>Array.from({length:n-minimum+1},(_,i)=>binomialPMF(n,p,minimum+i)).reduce((a,b)=>a+b,0);
export function solve(c,text){
 const ps=officialParts(project(c,text));assert.equal(ps.length,2);
 if(c.task==='scooters'){
  const z=(c.threshold-c.mean)/c.sigma,a=normalCDF(z),mass=binomialPMF(c.n,c.p,c.minimum),b=tail(c.n,c.p,c.minimum),wrong=[mass,1-b,b-mass],form=x=>`P ≈ ${fmt(x)}.`;
  return [part(ps[0],form(a),[1-a,normalCDF((c.threshold-c.mean)/c.sigma**2),normalCDF(c.threshold/c.sigma)].map(form),['Invertir la cola y contar trayectos de más de 15 minutos.','Dividir por la varianza 16 en vez de por la desviación típica 4.','Olvidar restar la media al tipificar.'],[
   ['Definimos la variable de duración y copiamos los parámetros acreditados en el PDF.','T normal; media 18 minutos; desviación típica 4 minutos'],
   ['Traducimos «menos de 15» al suceso que debemos calcular.','P(T<15)'],
   ['Tipificamos restando la media y dividiendo por la desviación típica, no por la varianza.','Z = frac{T−18}{4}; Z normal estándar'],
   ['El umbral queda por debajo de la media, por lo que su puntuación típica es negativa.','frac{15−18}{4}=−0,75'],
   ['Usamos la acumulada normal y verificamos por simetría.','P(T<15)=Φ(−0,75)=1−Φ(0,75)'],
   ['La integración numérica independiente del área normal coincide con el cálculo de la acumulada.',form(a)],
   ['El resultado es menor que un medio, como debe ocurrir porque 15 está por debajo de la media 18.',`Probabilidad aproximada: ${fmt(100*a)}%.`],
  ],'NORMAL_DURATION_STANDARDIZATION_AND_QUADRATURE',{z,value:a,wrong:[1-a,normalCDF(-3/16),normalCDF(15/4)]}),part(ps[1],form(b),wrong.map(form),['Contar exactamente 110, excluyendo 111 a 120.','Dar menos de 110, que es el complemento.','Interpretar «al menos 110» como «más de 110».'],[
   ['Definimos éxito como completar el trayecto sin incidencias. Adoptamos el modelo binomial del apartado: 120 ensayos independientes con probabilidad común 0,9. La independencia es una hipótesis del modelo, no una conclusión sobre tráfico real.','X = número de trayectos sin incidencias; X binomial B(120; 0,9)'],
   ['Al menos 110 incluye la igualdad y todos los recuentos hasta 120.','P(X≥110)=P(X=110)+P(X=111)+…+P(X=120)'],
   ['Cada masa binomial cuenta las formas de elegir los trayectos exitosos y exige el resto con incidencias.','P(X=k)=C(120,k)·0,9^k·0,1^(120−k)'],
   ['Calculamos primero la masa del extremo incluido.','P(X=110)=C(120,110)·0,9^110·0,1^10≈'+fmt(mass)],
   ['Sumamos las once masas sin redondearlas previamente. No sustituimos esta suma por la masa de un único recuento.',form(b)],
   ['La variable de incidencias Y=120−X permite comprobar por una segunda suma corta el mismo suceso.','Y binomial B(120; 0,1); P(X≥110)=P(Y≤10)'],
   ['Verificamos además el complemento y que incluir 110 cambia la probabilidad en su masa exacta.','P(X<110)≈'+fmt(1-b)+'; P(X>110)≈'+fmt(b-mass)],
   ['La respuesta usa la distribución binomial exacta; el signo aproximado corresponde únicamente al redondeo decimal.',form(b)],
  ],'BINOMIAL_TAIL_AND_FAILURE_COUNT_CHECK',{n:c.n,p:c.p,minimum:c.minimum,value:b,wrong,mass})];
 }
 const N=c.sizes.reduce((a,b)=>a+b,0),rate=c.selectedFirst/c.sizes[0],allocation=c.sizes.map(x=>rate*x),sample=rate*N;
 const allocations=[allocation,[20,20,20,20],[20,28,32,24],[20,32,24,28]],claims=allocations.map(x=>({N,n:x.reduce((a,b)=>a+b,0),allocation:x}));
 const format=x=>`N=${x.N}; n=${x.n}; estratos 2, 3 y 4: ${x.allocation.slice(1).join(', ')} individuos.`;
 const sd=c.sigma/Math.sqrt(c.n),lo=(c.lower-c.mean)/sd,hi=(c.upper-c.mean)/sd,value=normalCDF(hi)-normalCDF(lo);
 const normalClaims=[{mean:c.mean,sd,value},{mean:c.mean,sd:c.sigma,value:normalCDF((c.upper-c.mean)/c.sigma)-normalCDF((c.lower-c.mean)/c.sigma)},{mean:c.mean,sd,value:normalCDF(hi)},{mean:c.mean,sd,value:normalCDF(1)-normalCDF(-1)}];
 const normalForm=x=>`b1: normal aproximada, media ${fmt(x.mean)}, desviación típica ${fmt(x.sd)} puntos; b2: P ≈ ${fmt(x.value)}.`;
 return [part(ps[0],format(claims[0]),claims.slice(1).map(format),['Repartir la muestra por igual entre estratos distintos.','Intercambiar las asignaciones de los estratos segundo y cuarto.','Intercambiar las asignaciones de los estratos segundo y tercero.'],[
  ['Sumamos los cuatro tamaños poblacionales sin confundirlos con los tamaños muestrales.','N=250+300+400+350=1300 individuos'],
  ['La afijación proporcional utiliza la misma fracción de muestreo en todos los estratos.','frac{nᵢ}{Nᵢ}=frac{n}{N}'],
  ['El primer estrato proporciona directamente esa fracción.','frac{20}{250}=0,08'],
  ['Aplicamos la fracción a toda la población para obtener el tamaño total de la muestra.','n=0,08·1300=104 individuos'],
  ['Asignamos la muestra a cada uno de los otros estratos, conservando el orden del enunciado.','n₂=0,08·300=24; n₃=0,08·400=32; n₄=0,08·350=28'],
  ['Comprobamos tanto la suma total como las cuatro proporciones.','20+24+32+28=104; 20/250=24/300=32/400=28/350=0,08'],
  ['Las asignaciones ya son enteras; no hace falta redondeo ni reparto adicional.',format(claims[0])],
 ],'STRATIFIED_PROPORTIONAL_ALLOCATION_CHECK',{N,rate,sample,claims}),part(ps[1],normalForm(normalClaims[0]),normalClaims.slice(1).map(normalForm),['Usar la dispersión de una nota individual en vez de la de la media.','Usar solo la acumulada del extremo superior y omitir el inferior.','Sustituir el intervalo asimétrico por una desviación típica a cada lado.'],[
  ['b1. El PDF da media 6,4, desviación típica 0,7 y una muestra aleatoria de 49. No afirma que la población sea normal: usamos la aproximación normal de la media por el teorema central del límite, con el modelo usual de observaciones independientes.','μ=6,4; σ=0,7; n=49'],
  ['La esperanza de la media coincide con la media poblacional. Su varianza se divide entre n.','E(x̄)=6,4; Var(x̄)=frac{0,7²}{49}=0,01'],
  ['Tomamos la raíz de la varianza para identificar claramente la desviación típica, no la varianza como segundo parámetro.','SD(x̄)=frac{0,7}{√(49)}=0,1 puntos'],
  ['b2. Expresamos la probabilidad para la media de las 49 calificaciones, no para una sola calificación.','P(6,3≤x̄≤6,8)'],
  ['Tipificamos cada extremo con el error típico de la media.','frac{6,3−6,4}{0,1}=−1; frac{6,8−6,4}{0,1}=4'],
  ['Restamos las dos acumuladas normales conservando precisión.','P≈Φ(4)−Φ(−1)≈'+fmt(value)],
  ['Comprobamos por simetría y por integración independiente del área entre −1 y 4.','Φ(4)−Φ(−1)=Φ(4)+Φ(1)−1'],
  ['La distribución y la probabilidad son aproximadas porque solo conocemos media y dispersión de la población; no se está afirmando normalidad exacta.',normalForm(normalClaims[0])],
 ],'NORMAL_SAMPLE_MEAN_CLT_APPROXIMATION_AND_QUADRATURE',{sd,lo,hi,value,claims:normalClaims,approximatePopulationModel:true})];
}
export function buildSamplingScootersBatch(id='batch-0289',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){const c=x.correctionEvidence.parameters;if(c.task==='scooters'){x.primaryTopic='Probabilidad';x.secondaryTopics=['Distribución normal','Distribución binomial'];}else{x.secondaryTopics=['Muestreo y afijación proporcional','Distribución de la media muestral'];}}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSamplingScootersBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0289-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0289.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

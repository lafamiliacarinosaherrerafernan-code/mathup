// Four individually inspected official PDF statements. Original bytes remain evidence.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,fmt,intervalPart,sizePart} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:737,kind:'mean',task:'maize',center:145,sigma:22,n:16,unit:'cm',literals:['145','22','135','155','50%','16 plantas','140','151']},
 {index:1061,kind:'mean',task:'electricity',sigma:65,variance:4225,n:100,total:26830,center:268.3,confidence:.92,nextConfidence:.98,error:5,unit:'kWh',literals:['varianza 4225','100 viviendas','26830','92%','98%','224.08, 255.92']},
 {index:1511,kind:'mean',task:'avocado',sigma:4,n:9,center:386/9,sample:[15,120,50,40,5,46,52,48,10],confidence:.97,error:2.1,strict:true,unit:'kg',literals:['desviación típica 4','inferior a 2.1','97 %','15 120 50 40 5 46 52 48 10']},
 {index:1532,kind:'mean',task:'rice',sigma:16,variance:256,n:64,total:63744,center:996,populationMean:1000,confidence:.90,unit:'g',literals:['media 1000','varianza 256','tamaño 64','996','63 744','90 %']},
];
const intervalProbability=(p,mean,sd,lo,hi,unit,percentage=false)=>{
 const zlo=(lo-mean)/sd,zhi=(hi-mean)/sd,value=normalCDF(zhi)-normalCDF(zlo),scale=percentage?100:1;
 const wrong=[1-value,normalCDF(zhi),percentage?value/100:normalCDF(zhi/Math.sqrt(16))-normalCDF(zlo/Math.sqrt(16))];
 const form=v=>`${percentage?'porcentaje':'P'} ≈ ${fmt(scale*v)}${percentage?'%':''}`;
 return part(p,form(value),wrong.map(form),['Tomar la probabilidad exterior al intervalo.','Olvidar restar la acumulada del extremo inferior.',percentage?'Olvidar multiplicar por cien al expresar un porcentaje.':'Usar la dispersión individual en lugar de la desviación de la media de 16 plantas.'],[
  ['Identificamos el centro y la desviación de la variable a la que se refiere este apartado.',`media = ${fmt(mean)} ${unit}; desviación = ${fmt(sd)} ${unit}`],
  ['El suceso es un intervalo y requiere dos extremos, no una sola cola.',`P(${fmt(lo)} ≤ X ≤ ${fmt(hi)})`],
  ['Tipificamos restando el centro y dividiendo por la desviación correspondiente.',`Z = frac{X − ${fmt(mean)}}{${fmt(sd)}}`],
  ['Transformamos separadamente los dos límites.',`z inferior = ${fmt(zlo)}; z superior = ${fmt(zhi)}`],
  ['La tabla normal acumula hacia la izquierda; restamos ambas acumuladas.',`P = Φ(${fmt(zhi)}) − Φ(${fmt(zlo)}) ≈ ${fmt(value)}`],
  [percentage?'Convertimos la probabilidad en el porcentaje de plantas solicitado.':'Interpretamos el resultado como la probabilidad de ese intervalo para la media muestral.',form(value)],
  ['Contrastamos integrando la densidad normal y comprobando el complemento.',`P interior + P exterior = ${fmt(value)} + ${fmt(1-value)} = 1`],
 ],'NORMAL_SAMPLE_MEAN_OR_INDIVIDUAL_INTERVAL_CDF',{mean,sd,lo,hi,zlo,zhi,value,percentage,wrong});
};
export function buildNormalVarianceParts(c,text){
 const p=officialParts(text);assert.equal(p.length,c.task==='avocado'?2:3);
 if(c.task==='maize'){
  const a=intervalProbability(p[0],145,22,135,155,'cm',true);
  const b=part(p[1],'altura mínima = 145 cm',['altura mínima = 167 cm','altura mínima = 123 cm','altura mínima ≈ 159,83877 cm'],['Sumar una desviación: no corresponde al percentil cincuenta.','Restar una desviación: más de la mitad queda por encima.','Confundir el percentil cincuenta con el setenta y cinco.'],[
   ['Se pide el umbral que deja por encima la mitad de las plantas, es decir, la mediana.','P(X ≥ h) = 0,5'],
   ['La distribución normal es simétrica respecto a su media.','μ = 145 cm; σ = 22 cm'],
   ['Tipificamos el umbral antes de usar la simetría.','P(Z ≥ frac{h − 145}{22}) = 0,5'],
   ['En la normal estándar, cero deja la mitad del área a cada lado.','Φ(0) = 0,5 ⇒ frac{h − 145}{22} = 0'],
   ['Despejamos la altura mínima de esa mitad superior.','h − 145 = 0 ⇒ h = 145 cm'],
   ['Comprobamos por simetría y continuidad: incluir la igualdad no cambia la probabilidad.','P(X ≥ 145) = P(Z ≥ 0) = 0,5'],
  ],'NORMAL_MEDIAN_SYMMETRY',{value:145,wrong:[167,123,159.838774]});
  const d=intervalProbability(p[2],145,22/Math.sqrt(16),140,151,'cm');
  d.solutionSteps.unshift({explanation:'La media de dieciséis alturas normales independientes es normal; no tiene la misma dispersión que una planta individual.',math:'E(x̄) = 145 cm; SD(x̄) = frac{22}{√(16)} = 5,5 cm'});
  d.solutionSteps[2].math='P(140 ≤ x̄ ≤ 151)';
  d.solutionSteps[3].math='Z = frac{x̄ − 145}{5,5}';
  return[a,b,d];
 }
 if(c.task==='electricity'){
  const a=intervalPart(c,p[0]);
  a.solutionSteps[0]={explanation:'El dato oficial es la varianza. Obtenemos su raíz antes de aplicar la fórmula del intervalo.',math:'σ² = 4225 kWh² ⇒ σ = √(4225) = 65 kWh; n = 100'};
  a.solutionSteps[1]={explanation:'El consumo proporcionado es total. La media muestral se obtiene dividiéndolo entre las cien viviendas.',math:'x̄ = frac{26830}{100} = 268,3 kWh'};
  const b=sizePart({...c,confidence:c.nextConfidence},p[1]);
  b.solutionSteps.unshift({explanation:'Conservamos la desviación poblacional, no la varianza, para dimensionar la nueva muestra.',math:'σ = √(4225) = 65 kWh'});
  const d=part(p[2],'media muestral = 240 kWh',['media muestral = 224,08 kWh','media muestral = 255,92 kWh','media muestral = 15,92 kWh'],['Confundir media con extremo inferior.','Confundir media con extremo superior.','Confundir media con semiamplitud.'],[
   ['El intervalo para una media tiene extremos simétricos respecto a la media de la muestra.','L = x̄ − E = 224,08; U = x̄ + E = 255,92'],
   ['Sumar las dos igualdades elimina el margen desconocido.','L + U = 2x̄'],
   ['Dividimos entre dos para recuperar el centro.','x̄ = frac{L + U}{2}'],
   ['Sustituimos los extremos del intervalo posterior a la campaña.','x̄ = frac{224,08 + 255,92}{2} = 240 kWh'],
   ['Recuperamos también el margen para comprobar los extremos.','E = frac{255,92 − 224,08}{2} = 15,92 kWh'],
   ['La reconstrucción coincide con los dos extremos originales. No hace falta inferir el nuevo tamaño ni su confianza.','240 − 15,92 = 224,08; 240 + 15,92 = 255,92'],
  ],'INTERVAL_MIDPOINT',{value:240,margin:15.92,wrong:[224.08,255.92,15.92]});
  return[a,b,d];
 }
 if(c.task==='avocado'){
  const a=sizePart(c,p[0]),b=intervalPart(c,p[1]),v=b.verification.numericalEvidence;
  b.answer+=`; E ≈ ${fmt(v.error)} kg`;b.finalAnswer=b.answer;
  b.distractors=b.distractors.map((s,i)=>s+`; E ≈ ${fmt(v.wrongErrors[i])} kg`);
  return[a,b];
 }
 assert.equal(c.task,'rice');
 const sd=c.sigma/Math.sqrt(c.n),z=(996-c.populationMean)/sd,value=normalCDF(z),wrong=[1-value,normalCDF((996-1000)/c.sigma),normalCDF((996-1000)/(c.sigma/c.n))],form=x=>`P ≈ ${fmt(x)}`;
 const a=part(p[0],form(value),wrong.map(form),['Tomar la cola derecha.','Usar la desviación individual en vez de la de la media.','Dividir por n en vez de por su raíz al calcular el error típico.'],[
  ['El enunciado aporta una varianza, de modo que calculamos primero la desviación de cada paquete.','σ² = 256 g² ⇒ σ = 16 g; μ = 1000 g'],
  ['Para sesenta y cuatro paquetes independientes, la media es normal y tiene menor dispersión.','x̄ normal; E(x̄) = 1000 g; SD(x̄) = frac{16}{√(64)} = 2 g'],
  ['Escribimos la probabilidad pedida, una cola inferior.','P(x̄ < 996)'],
  ['Tipificamos con la desviación de la media.','P(Z < frac{996 − 1000}{2}) = P(Z < −2)'],
  ['Usamos la simetría de la normal acumulada para obtener la cola izquierda.',`P = Φ(−2) = 1 − Φ(2) ≈ ${fmt(value)}`],
  ['La integración independiente de la densidad confirma el resultado; no es la probabilidad para un paquete aislado.',`P ≈ ${fmt(value)}; aproximadamente ${fmt(100*value)}%`],
 ],'NORMAL_SAMPLE_MEAN_LOWER_TAIL',{sd,z,value,wrong});
 const b=intervalPart(c,p[1]);
 b.solutionSteps[0]={explanation:'Para estimar el peso medio real usamos la desviación conocida. La cifra de mil gramos no se impone como media verdadera en este apartado.',math:'σ = √(256) = 16 g; n = 64; confianza = 90%'};
 b.solutionSteps[1]={explanation:'Dividimos el peso total de la muestra entre sus sesenta y cuatro paquetes.',math:'x̄ = frac{63744}{64} = 996 g'};
 const upper=b.verification.numericalEvidence.interval[1];
 const d=part(p[2],'Sí: 1000 g supera el extremo superior del intervalo del 90%.',['No: 1000 g está dentro del intervalo del 90%.','No: todo el intervalo del 90% está por encima de 1000 g.','Sí: el intervalo demuestra con certeza que todos los paquetes pesan menos de 1000 g.'],['Incluir erróneamente el peso nominal en el intervalo.','Invertir el sentido de la desviación observada.','Convertir evidencia sobre una media en certeza sobre todos los individuos.'],[
  ['La pregunta se refiere a si los datos apoyan el defecto de peso medio, no a certificar el peso de todos los paquetes.','peso nominal = 1000 g'],
  ['Utilizamos el intervalo calculado con la muestra observada, sin sustituir su centro por el nominal.',`IC del 90% ≈ [${fmt(b.verification.numericalEvidence.interval[0])}; ${fmt(upper)}] g`],
  ['Comparamos el peso nominal con el extremo superior, que es el más cercano a él.',`${fmt(upper)} < 1000 g`],
  ['Por tanto, el peso nominal queda fuera y todo el intervalo se sitúa por debajo.','1000 g ∉ IC; todos los valores del IC son menores que 1000 g'],
  ['Los datos proporcionan base estadística para la falta de peso medio al nivel de confianza indicado; no es una afirmación de certeza.','evidencia de μ < 1000 g al nivel de confianza del 90%'],
  ['Comprobamos que la diferencia respecto al nominal supera el margen del intervalo.',`1000 − 996 = 4 g > E ≈ ${fmt(b.verification.numericalEvidence.error)} g`],
 ],'CONFIDENCE_INTERVAL_NOMINAL_WEIGHT_COMPARISON',{nominal:1000,mean:996,upper,margin:b.verification.numericalEvidence.error,correctPredicates:[upper<1000,true],falsePredicates:[1000<=upper,1000<b.verification.numericalEvidence.interval[0]],individualCertainty:false});
 return[a,b,d];
}
export function buildNormalVarianceBatch(id='batch-0279',selected=cases){return buildBatch(selected,id,buildNormalVarianceParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildNormalVarianceBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0279-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0279.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

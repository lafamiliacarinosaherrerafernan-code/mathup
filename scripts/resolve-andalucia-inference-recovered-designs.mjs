import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical,normalCDF} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts,intervalPart,fmt} from './resolve-andalucia-inference-multipart.mjs';
import {proportionInterval,sampleSize} from './resolve-andalucia-inference-design-contrasts.mjs';
import {recoveredDesignStatements} from './andalucia-inference-recovered-design-pdf-evidence.mjs';
export const cases=[
 {index:988,task:'normal-upper-test',sigma:.2,n:1000,center:10.0037,nullMean:10,alpha:.025,literals:['a lo sumo, 10 cm','1000 piezas','10.0037','0.2 cm','α = 0.025']},
 {index:612,task:'pet-proportion',n:600,successes:240,p:.4,confidence:.95,planningP:.4,nextConfidence:.95,error:.025,literals:['familias a las que se les pregunta si tienen mascota','la mitad de las familias','aumento del tamaño']},
 {index:691,task:'electricity-mean',sigma:18.25,n:361,center:97,confidence:.93,nextConfidence:.91,error:.5,unit:'euros',literals:['gasto mensual por vivienda','zona centro','un tercio del error']},
 {index:851,task:'donor-proportion',n:400,successes:64,p:.16,confidence:.98,nextConfidence:.95,literals:['donantes de sangre','disminuir el nivel de confianza']},
];
const frac=(a,b)=>`frac{${a}}{${b}}`,iv=(c,e)=>`[${fmt(c-e)}; ${fmt(c+e)}]`;
export function solve(c,literal){
 const p=officialParts(recoveredDesignStatements[c.index]??literal);
 if(c.task==='pet-proportion'){
  const a=proportionInterval(c,p[0]),v=a.verification.numericalEvidence;
  a.answer+='; 0,5 no es compatible.';a.finalAnswer=a.answer;
  a.distractors=[iv(c.p,v.margin)+'; 0,5 es compatible.',iv(.5,v.margin)+'; 0,5 es compatible.',iv(c.p,3*v.margin)+'; 0,5 es compatible.'];
  a.distractorEvidence=['Admitir una proporción que está fuera del intervalo.','Centrar el intervalo en el valor propuesto y no en la frecuencia observada.','Triplicar indebidamente el margen hasta incluir 0,5.'];
  a.solutionSteps.push({explanation:'Comparamos la mitad de la población con los extremos: no es compatible con este intervalo del 95%. Esto no es una certeza absoluta sobre el parámetro.',math:`0,5 > ${fmt(c.p+v.margin)} ⇒ 0,5 ∉ ${iv(c.p,v.margin)}`});
  v.hypothesis=.5;v.inside=false;v.distractorIntervals=[v.interval,[.5-v.margin,.5+v.margin],[c.p-3*v.margin,c.p+3*v.margin]];v.distractorCompatibility=[true,true,true];
  return[a,sampleSize(c,p[1]),part(p[2],'Disminuye en proporción a 1/√(n), manteniendo p̂ y la confianza.',['Aumenta en proporción a √(n), manteniendo p̂ y la confianza.','No cambia al aumentar n, manteniendo p̂ y la confianza.','Disminuye en proporción a 1/n, manteniendo p̂ y la confianza.'],['Invertir el efecto del denominador.','Ignorar el tamaño muestral.','Dividir entre n en lugar de entre su raíz.'],[
   ['Para comparar tamaños, mantenemos el nivel de confianza y la proporción de planificación.',`p̂ = 0,4; confianza = 95%`],
   ['La amplitud es el doble del margen del intervalo.',`amplitud = 2z·√(${frac('p̂·q̂','n')})`],
   ['El tamaño aparece bajo una raíz en el denominador.',`amplitud ∝ 1/√(n)`],
   ['Si aumenta n, disminuye la amplitud; cuadruplicar el tamaño la reduce a la mitad.',`amplitud(4n) = amplitud(n)/2`],
   ['Es el efecto del tamaño con las demás condiciones fijas; una muestra nueva también puede cambiar la proporción observada.',`n₂ > n₁ ⇒ amplitud₂ < amplitud₁`],
  ],'INTERVAL_WIDTH_INVERSE_SQRT',{fixedP:.4,fixedConfidence:.95,relativeN:4,relativeWidth:.5})];
 }
 if(c.task==='electricity-mean'){
  const b=sampleSize(c,p[1]);b.solutionSteps.unshift({explanation:'El apartado b) da otro intervalo de referencia. Calculamos su semiamplitud y la dividimos por tres; no usamos el margen del apartado a).',math:'E referencia = (98,5 − 95,5)/2 = 1,5 euros; E nuevo ≤ 1,5/3 = 0,5 euros'});
  return[intervalPart(c,p[0]),b];
 }
 if(c.task==='donor-proportion'){
  const z=critical(c.nextConfidence),se=Math.sqrt(c.p*(1-c.p)/c.n),e=z*se;
  return[proportionInterval(c,p[0]),part(p[1],`E ≈ ${fmt(e)}; disminuye al bajar la confianza.`,[`E ≈ ${fmt(e)}; aumenta al bajar la confianza.`,`E ≈ ${fmt(2*e)}; disminuye al bajar la confianza.`,`E ≈ ${fmt(critical(c.confidence)*se)}; disminuye al bajar la confianza.`],['Invertir la relación entre cuantil y confianza.','Confundir amplitud y semiamplitud.','Mantener el cuantil del 98% en vez de recalcular para 95%.'],[
   ['Mantenemos la proporción y la muestra; cambia el nivel de confianza.',`p̂ = 64/400 = 0,16; q̂ = 0,84; n = 400`],
   ['Para el 95% bilateral queda el 2,5% en cada cola.',`Φ(z) = 0,975 ⇒ z ≈ ${fmt(z)}`],
   ['Calculamos el error típico y después el margen.',`E = z·√(${frac('p̂·q̂','n')}) = ${fmt(z)}·√(${frac('0,16·0,84','400')}) ≈ ${fmt(e)}`],
   ['Convertimos a puntos porcentuales para interpretar la escala.',`E ≈ ${fmt(100*e)} puntos porcentuales`],
   ['Al disminuir la confianza disminuye el cuantil positivo, por lo que el margen disminuye con n y p̂ fijos.',`z 95% ≈ ${fmt(z)} < z 98% ≈ ${fmt(critical(.98))}`],
   ['Comprobamos el resultado por comparación con el margen del apartado anterior.',`E 95% ≈ ${fmt(e)} < E 98% ≈ ${fmt(critical(.98)*se)}`],
  ],'NORMAL_QUANTILE_MONOTONICITY',{margin:e,se,z,confidence:.95,previousMargin:critical(.98)*se,wrongMargins:[e,2*e,critical(.98)*se],wrongDirection:['increase','decrease','decrease']})];
 }
 if(c.task==='normal-upper-test'){
  const se=c.sigma/Math.sqrt(c.n),z=critical(1-2*c.alpha),limit=c.nullMean+z*se,observed=(c.center-c.nullMean)/se,pvalue=1-normalCDF(observed);
  const proof={se,z,limit,observed,pvalue,alpha:c.alpha,nullMean:c.nullMean,sigma:c.sigma,n:c.n,center:c.center};
  return[part(p[0],'H₀: μ ≤ 10; H₁: μ > 10.',['H₀: μ ≥ 10; H₁: μ < 10.','H₀: μ = 10; H₁: μ ≠ 10.','H₀: μ ≤ 10,0037; H₁: μ > 10,0037.'],['Invertir la cola del contraste.','Plantear un contraste bilateral cuando se pregunta por aumento.','Sustituir el límite de fabricación por la media observada.'],[
   ['El parámetro de interés es la media poblacional de la longitud, no una pieza individual.',`μ = longitud media poblacional en cm`],
   ['La afirmación que se quiere detectar es que la media supere el máximo previsto.',`H₁: μ > 10`],
   ['La hipótesis nula contiene la igualdad y los valores que cumplen la condición de fabricación.',`H₀: μ ≤ 10`],
   ['El contraste es unilateral de cola derecha; para calibrarlo se usa el valor frontera.',`μ₀ = 10; Z = ${frac('x̄ − μ₀','σ/√(n)')}`],
   ['Una media suficientemente grande aportaría evidencia contra H₀. La media observada no redefine la hipótesis.',`H₀: μ ≤ 10; H₁: μ > 10`],
  ],'EXPLICIT_UPPER_TAIL_HYPOTHESES',proof),
  part(p[1],`Z ≤ ${fmt(z)}; x̄ ≤ ${fmt(limit)} cm.`,[`Z ≤ ${fmt(critical(.975))}; x̄ ≤ ${fmt(c.nullMean+critical(.975)*se)} cm.`,`Z ≥ −${fmt(z)}; x̄ ≥ ${fmt(c.nullMean-z*se)} cm.`,`Z ≤ ${fmt(z)}; x̄ ≤ ${fmt(c.nullMean+z*c.sigma)} cm.`],['Repartir α entre dos colas indebidamente.','Usar una región de no rechazo de cola izquierda.','Omitir la raíz del tamaño al convertir a media muestral.'],[
   ['La región de aceptación, más precisamente de no rechazo, deja una cola derecha de probabilidad α en la frontera nula.',`α = 0,025; μ₀ = 10 cm`],
   ['La población es normal y la desviación poblacional es conocida.',`SE = ${frac('0,2','√(1000)')} ≈ ${fmt(se)} cm`],
   ['No dividimos α entre dos: el contraste es unilateral.',`P(Z ≤ z) = 1 − α = 0,975 ⇒ z ≈ ${fmt(z)}`],
   ['La región de no rechazo del estadístico es la semirrecta inferior.',`Z ≤ ${fmt(z)}`],
   ['Despejamos x̄ con error típico positivo.',`x̄ ≤ μ₀ + z·SE = 10 + ${fmt(z)}·${fmt(se)} ≈ ${fmt(limit)} cm`],
   ['Comprobamos que en la frontera μ=10 la cola de rechazo tiene exactamente el nivel fijado; para μ<10 es menor.',`P(Z > ${fmt(z)}) ≈ 0,025`],
  ],'NORMAL_ONE_SIDED_ACCEPTANCE',proof),
  part(p[2],'No se rechaza H₀; no hay evidencia suficiente de que μ > 10 cm.',['Se rechaza H₀; hay evidencia suficiente de que μ > 10 cm.','No se rechaza H₀; queda demostrado que μ ≤ 10 cm.','Se rechaza H₀; hay evidencia suficiente de que μ < 10 cm.'],['Rechazar solo porque la media muestral supera 10, ignorando su variabilidad.','Convertir la falta de evidencia en una demostración de H₀.','Concluir un descenso usando un contraste diseñado para un aumento.'],[
   ['Sustituimos los datos observados en el estadístico definido en a).',`Z observado = ${frac('10,0037 − 10',frac('0,2','√(1000)'))} ≈ ${fmt(observed)}`],
   ['Comparamos con el umbral unilateral de b).',`${fmt(observed)} < ${fmt(z)} ⇒ región de no rechazo`],
   ['Comprobación equivalente usando la media muestral.',`10,0037 < ${fmt(limit)} cm`],
   ['Calculamos además el p-valor de cola derecha para contrastar la decisión.',`p-valor = P(Z ≥ ${fmt(observed)}) ≈ ${fmt(pvalue)} > 0,025`],
   ['No hay evidencia estadística suficiente, a ese nivel, de que la media supere 10 cm. Esto no prueba que todas las piezas ni la media cumplan la condición.',`no se rechaza H₀`],
  ],'NORMAL_TEST_STATISTIC_AND_PVALUE',proof)];
 }
 throw Error('Unsupported documented inference');
}
export function buildRecoveredDesignBatch(id='batch-0369',selected=cases){return buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRecoveredDesignBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0369-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0369.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

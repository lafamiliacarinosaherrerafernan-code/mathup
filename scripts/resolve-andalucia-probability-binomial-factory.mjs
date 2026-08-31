import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {orderedOfficialParts} from './resolve-andalucia-probability-event-models.mjs';
import {part,fmt} from './resolve-andalucia-inference-multipart.mjs';
import {fraction} from './resolve-andalucia-probability-2012.mjs';
export const cases=[
 {index:1114,kind:'probability',task:'binomial',n:5,p:.6,literals:['60%','Cinco pacientes','mejoren cuatro','al menos dos','número esperado','mayor o igual a 12']},
 {index:1134,kind:'probability',task:'inverse-factory',weights:[.25,.35,.4],totalDefect:.0205,bDefect:.01,literals:['25%','35%','2.05%','1%','misma probabilidad','sabiendo que es defectuosa']},
];
const f=fraction,F=fmt;
export function choose(n,k){let x=1;for(let j=1;j<=k;j++)x=x*(n-j+1)/j;return x;}
export const binomialPMF=(n,p,k)=>choose(n,k)*p**k*(1-p)**(n-k);
export function buildBinomialFactoryParts(c,text){
 const ps=orderedOfficialParts(text);
 if(c.task==='inverse-factory'){
  const x=(c.totalDefect-c.weights[1]*c.bDefect)/(c.weights[0]+c.weights[2]),a=c.weights[1]*(1-c.bDefect)/(1-c.totalDefect),b=c.weights[0]*x/c.totalDefect;
  const ansA=f(231,653),ansB=f(170,533);
  return [part(ps[0],ansA,[f(7,20),f(693,2000),f(99,100)],['Ignorar que la pieza elegida es no defectuosa.','Dar la probabilidad conjunta de máquina B y pieza buena.','Invertir la condición y dar buena entre las piezas de B.'],[
   ['Definimos B como máquina de origen y D como pieza defectuosa. La condición restringe el espacio a piezas buenas.', 'P(B)=0,35; P(D|B)=0,01; P(D)=0,0205'],
   ['Calculamos la probabilidad complementaria en toda la producción.', 'P(Dc)=1−0,0205=0,9795'],
   ['La probabilidad de buena dentro de B también es complementaria.', 'P(Dc|B)=1−0,01=0,99'],
   ['Multiplicamos a lo largo de la rama para obtener la intersección.', 'P(B∩Dc)=0,35·0,99=0,3465'],
   ['Aplicamos Bayes normalizando entre todas las piezas buenas.', `P(B|Dc)=frac{0,3465}{0,9795}=${ansA}`],
   ['Comprobamos multiplicando el posterior por la probabilidad de la condición; debe recuperar la conjunta.', `${ansA}·0,9795=0,3465`],
   ['La probabilidad queda entre cero y uno y es ligeramente superior al peso de B porque su tasa de defectos es menor que la global.', `P(B|Dc)=${ansA}≈${F(a)}`],
  ],'BAYES_GOOD_PIECE_FACTORY',{value:a,wrong:[.35,.3465,.99]}),part(ps[1],ansB,[f(1,4),f(5,13),f(17,2600)],['Usar el peso de A sin condicionar.','Normalizar solo entre A y C e ignorar los defectos de B.','Dar la conjunta A y defecto, no la condicionada.'],[
   ['La producción se reparte en tres máquinas. Calculamos el peso restante de C.', 'P(C)=1−0,25−0,35=0,40'],
   ['El apartado permite usar una misma tasa de defecto para A y C; la denominamos x.', 'P(D|A)=P(D|C)=x'],
   ['Aplicamos probabilidad total sumando las tres ramas disjuntas.', '0,0205=0,25x+0,35·0,01+0,40x'],
   ['Despejamos la tasa común antes de aplicar Bayes. No la confundimos con la probabilidad pedida.', `0,65x=0,017 ⇒ x=frac{17}{650}`],
   ['Calculamos la conjunta de A y defecto.', `P(A∩D)=0,25·frac{17}{650}=frac{17}{2600}`],
   ['La condición incluye todas las piezas defectuosas, también las fabricadas por B.', `P(A|D)=frac{17/2600}{0,0205}=${ansB}`],
   ['Comprobamos la tasa global sustituyendo el valor obtenido en las tres ramas.', '0,25·(17/650)+0,35·0,01+0,40·(17/650)=0,0205'],
   ['Las posteriores de A, B y C suman uno; esto comprueba la normalización.', `P(A|D)=frac{170}{533}; P(B|D)=frac{7}{41}; P(C|D)=frac{272}{533}; suma=1`],
  ],'INVERSE_TOTAL_PROBABILITY_AND_BAYES',{commonRate:x,value:b,wrong:[.25,5/13,17/2600]})];
 }
 const n=c.n,p=c.p,p4=binomialPMF(n,p,4),p0=binomialPMF(n,p,0),p1=binomialPMF(n,p,1),atLeast=1-p0-p1;
 const aAnswer='Binomial B(5; 0,6); P(X=4)=0,2592.';
 const intro=['Modelamos las cinco respuestas al tratamiento como ensayos de Bernoulli independientes, con la misma probabilidad de mejoría. Esta es la hipótesis del modelo binomial, no una deducción clínica.', 'X = número de pacientes que mejoran; n=5; p=0,6; q=0,4'];
 return [part(ps[0],aAnswer,['Binomial B(5; 0,6); P(X=4)=0,05184.','Binomial B(5; 0,6); P(X=4)=0,1296.','Binomial B(5; 0,4); P(X=4)=0,0768.'],['Omitir las cinco posiciones posibles del paciente que no mejora.','Calcular cuatro éxitos sin exigir el fracaso del quinto.','Intercambiar mejoría y ausencia de mejoría.'],[
  intro,['Identificamos los requisitos del modelo: tamaño fijo, dos resultados por paciente y probabilidad común de éxito.', 'X ~ B(5; 0,6)'],
  ['Escribimos la fórmula de la masa binomial para exactamente k éxitos.', 'P(X=k)=C(n,k)·p^k·q^(n−k)'],
  ['Elegimos los cuatro pacientes que mejoran; el orden no cambia la selección.', 'C(5,4)=5'],
  ['Cada elección requiere cuatro mejorías y una ausencia de mejoría.', 'P(X=4)=5·0,6^4·0,4=0,2592'],
  ['La enumeración de los resultados de los cinco pacientes proporciona las mismas cinco configuraciones favorables.', aAnswer],
 ],'BINOMIAL_MODEL_AND_EXACT_MASS',{n,p,k:4,value:p4,optionClaims:[{n:5,p:.6,value:.2592},{n:5,p:.6,value:.05184},{n:5,p:.6,value:.1296},{n:5,p:.4,value:.0768}]}),part(ps[1],'P(X≥2)=0,91296.',['P(X≥2)=0,2304.','P(X≥2)=0,08704.','P(X≥2)=0,98976.'],['Contar exactamente dos pacientes, no al menos dos.','Dar el complemento: cero o una mejoría.','Restar solo el caso de cero mejorías.'],[
  intro,['Al menos dos significa dos, tres, cuatro o cinco mejorías; su complemento solo tiene dos casos.', 'P(X≥2)=1−P(X=0)−P(X=1)'],
  ['Ningún paciente mejora si se producen cinco fracasos.', 'P(X=0)=0,4^5=0,01024'],
  ['Para una mejoría elegimos quién mejora y exigimos cuatro fracasos.', 'P(X=1)=5·0,6·0,4^4=0,0768'],
  ['Restamos ambas probabilidades disjuntas de uno.', 'P(X≥2)=1−0,01024−0,0768=0,91296'],
  ['La suma directa de las masas de dos a cinco éxitos verifica el complemento.', '0,2304+0,3456+0,2592+0,07776=0,91296'],
 ],'BINOMIAL_COMPLEMENT_AND_ENUMERATION',{n,p,value:atLeast,wrong:[.2304,.08704,.98976]}),part(ps[2],'E(X)=3 pacientes.',['E(X)=2 pacientes.','E(X)=0,6 pacientes.','E(X)=1,2 pacientes.'],['Calcular el número esperado que no mejora.','Dar la probabilidad individual como número esperado de pacientes.','Confundir la varianza con la esperanza.'],[
  intro,['La esperanza cuenta el promedio de mejorías al repetir grupos del mismo tamaño.', 'E(X)=n·p'],
  ['Sumamos las esperanzas de los cinco indicadores de mejoría.', 'E(X)=0,6+0,6+0,6+0,6+0,6'],
  ['Multiplicamos tamaño y probabilidad, manteniendo la unidad pacientes.', 'E(X)=5·0,6=3 pacientes'],
  ['Comprobamos también mediante la suma ponderada de los valores de la binomial.', 'Σ k·P(X=k)=3'],
  ['Una esperanza de tres no garantiza tres mejorías en un grupo concreto.', 'E(X)=3 pacientes.'],
 ],'BINOMIAL_EXPECTATION',{value:3,wrong:[2,.6,1.2]}),part(ps[3],'Como mínimo, 20 pacientes.',['Como mínimo, 19 pacientes.','Como mínimo, 12 pacientes.','Como mínimo, 30 pacientes.'],['Redondear por debajo del mínimo y no comprobar la esperanza.','Confundir doce mejorías esperadas con doce tratados.','Usar la probabilidad de no mejorar en lugar de la de mejorar.'],[
  ['Ahora el tamaño es desconocido y se mantiene la probabilidad de mejoría.', 'E(X)=0,6n'],
  ['Traducimos literalmente «mayor o igual a 12» a una desigualdad.', '0,6n≥12'],
  ['Dividimos por la probabilidad positiva; no cambia el sentido de la desigualdad.', 'n≥frac{12}{0,6}=20'],
  ['El límite ya es entero y la igualdad está permitida.', 'n mínimo=20'],
  ['Verificamos que el tamaño elegido alcanza la esperanza pedida.', 'E(X) con n=20: 20·0,6=12'],
  ['El entero anterior no cumple; esto demuestra la minimalidad.', 'E(X) con n=19: 19·0,6=11,4<12'],
  ['Se exige una esperanza mínima, no una garantía de doce mejorías en cada muestra.', 'Como mínimo, 20 pacientes.'],
 ],'BINOMIAL_EXPECTATION_MINIMUM',{minimum:20,expectationAtMinimum:12,expectationAtPrevious:11.4,wrong:[19,12,30]})];
}
export function buildBinomialFactoryBatch(id='batch-0274',selected=cases){const r=buildBatch(selected,id,buildBinomialFactoryParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Probabilidad';x.secondaryTopics=x.correctionEvidence.parameters.task==='binomial'?['Distribución binomial']:['Probabilidad total','Teorema de Bayes'];}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildBinomialFactoryBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0274-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0274.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

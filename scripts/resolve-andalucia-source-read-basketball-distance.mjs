// Individually solved official 2021/2026 tasks. Source glyph repairs are a
// separate reversible projection, never a replacement for the official literal.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch,critical} from './resolve-andalucia-inference-2012.mjs';
import {orderedOfficialParts,eventProbabilityPart} from './resolve-andalucia-probability-event-models.mjs';
import {part,fmt,intervalPart,sizePart} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:1357,kind:'probability',literals:['40 %','60 % de victorias','30 % de victorias','10 %','20 %','prórroga'],scale:1000,
  cells:[['C','V',240],['C','D',160],['F','V',180],['F','D',420]],
  definitions:'C/F: jugado en casa/fuera; V/D: victoria/derrota. El partido se elige uniformemente entre los de la temporada.',
  derivation:[['Casa y fuera forman una partición. Multiplicamos cada frecuencia por la tasa de victoria correspondiente.','P(C∩V)=0,40·0,60=0,24; P(F∩V)=0,60·0,30=0,18'],['Las derrotas son el complemento de las victorias dentro de cada localización.','P(C∩D)=0,40·0,40=0,16; P(F∩D)=0,60·0,70=0,42'],['Comprobamos que las cuatro ramas son disjuntas y agotan todos los partidos.','0,24+0,16+0,18+0,42=1']]},
 {index:1376,kind:'mean',sigma:15,n:49,center:325,confidence:.97,nextConfidence:.99,error:2,strict:true,unit:'km',claim:310,amplitude:4,
  literals:['varianza 225 𝑘𝑚2','49 viajes','325 𝑘𝑚','confianza al 97%','310 𝑘𝑚','confianza del 99%','amplitud inferior a 4']},
];
export function buildBasketballDistanceParts(c,text){
 const ps=orderedOfficialParts(text);
 if(c.kind==='probability'){
  const queries=[
   {n:[0,2],d:'all',event:'V',label:'victoria',wrong:[[9,20],[3,5],[9,50]],reasons:['Promediar las tasas de victoria como si casa y fuera fueran equiprobables.','Usar solo la tasa en casa.','Contar solo las victorias fuera.']},
   {n:[1],d:[1,3],event:'C|D',label:'partido en casa entre las derrotas',wrong:[[4,25],[2,5],[21,29]],reasons:['Dar solo la conjunta casa y derrota.','Mantener la probabilidad previa de jugar en casa.','Dar fuera entre las derrotas.']},
  ];
  const a=queries.map((q,i)=>eventProbabilityPart(c,q,ps[i]));
  const extended={scale:1000,cells:[['C','VP',24],['C','VsinP',216],['C','D',160],['F','VP',36],['F','VsinP',144],['F','D',420]],
   definitions:c.definitions+' P indica prórroga; VP significa victoria tras prórroga.',derivation:[...c.derivation,
    ['El diez por ciento se refiere solo a las victorias en casa, no a todos los partidos en casa.','P(C∩V∩P)=0,24·0,10=0,024'],
    ['El veinte por ciento se refiere solo a las victorias fuera. No se necesita saber si las derrotas tuvieron prórroga.','P(F∩V∩P)=0,18·0,20=0,036'],
    ['Sumamos las dos vías disjuntas de victoria tras prórroga.','P(V∩P)=0,024+0,036=0,060']]};
  a.push(eventProbabilityPart(extended,{n:[0,3],d:'all',event:'V∩P',label:'victoria y prórroga',wrong:[[4,25],[1,7],[3,10]],reasons:['Ponderar prórrogas por casa/fuera omitiendo las probabilidades de victoria.','Condicionar a victoria cuando se pide la conjunta.','Sumar el diez y el veinte por ciento como si compartieran universo.']},ps[2]));return a;
 }
 const a=intervalPart(c,ps[0]),e=a.verification.numericalEvidence,lo=e.interval[0],hi=e.interval[1];
 // Variance is an official input; explicitly recover its square root before SE.
 a.solutionSteps.unshift({explanation:'El enunciado da la varianza, no la desviación típica. La convertimos antes de calcular el error típico.',math:'σ² = 225 km² ⇒ σ = √(225) = 15 km'});
 const form=(flag,l,u)=>`${flag?'Compatible':'No compatible'} con el IC del 97%: [${fmt(l)}; ${fmt(u)}] km; μ propuesta = 310 km.`;
 const alt95=critical(.95)*c.sigma/Math.sqrt(c.n),altIndividual=critical(.97)*c.sigma;
 const b=part(ps[1],form(false,lo,hi),[form(true,lo,hi),form(false,c.center-alt95,c.center+alt95),form(true,c.center-altIndividual,c.center+altIndividual)],
  ['Invertir la decisión aunque el valor quede fuera del intervalo.','Usar el intervalo del 95% en lugar del solicitado.','Usar la desviación de viajes individuales en vez del error típico de su media.'],[
   ['La comparación usa el intervalo calculado, con el mismo parámetro y nivel de confianza.','μ: distancia media por viaje; confianza = 97%'],
   ['Recuperamos sus extremos sin cambiar el método de estimación.',`IC ≈ [${fmt(lo)}; ${fmt(hi)}] km`],
   ['Comparamos el valor propuesto con ambos extremos.',`310 < ${fmt(lo)} < ${fmt(hi)}`],
   ['El valor propuesto queda por debajo del límite inferior; no pertenece al intervalo.','310 ∉ IC'],
   ['Como comprobación, estandarizamos la diferencia entre la media observada y la propuesta.',`z observado = frac{325 − 310}{15/7} = 7; z crítico ≈ ${fmt(e.z)}`],
   ['No compatible no significa una imposibilidad lógica: el procedimiento tiene un riesgo de error, asociado al nivel elegido.',form(false,lo,hi)],
  ],'INTERVAL_MEMBERSHIP_AND_STANDARDIZED_DISTANCE',{interval:[lo,hi],claim:310,compatible:false,standardized:7,optionClaims:[{compatible:false,interval:[lo,hi]},{compatible:true,interval:[lo,hi]},{compatible:false,interval:[c.center-alt95,c.center+alt95]},{compatible:true,interval:[c.center-altIndividual,c.center+altIndividual]}]});
 const d=sizePart({...c,confidence:c.nextConfidence},ps[2]);
 d.solutionSteps.unshift({explanation:'La amplitud total del intervalo es dos veces su margen. Convertimos la condición antes de despejar el tamaño.',math:'amplitud = 2E < 4 km ⇒ E < 2 km'});
 return [a,b,d];
}
export function buildBasketballDistanceBatch(id='batch-0275',selected=cases){const r=buildBatch(selected,id,buildBasketballDistanceParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records)if(x.correctionEvidence.parameters.kind==='probability'){x.primaryTopic='Probabilidad';x.secondaryTopics=['Probabilidad total','Probabilidad condicionada'];}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildBasketballDistanceBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0275-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0275.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

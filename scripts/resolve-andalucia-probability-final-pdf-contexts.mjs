import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {buildEventParts,orderedOfficialParts,eventProbabilityPart} from './resolve-andalucia-probability-event-models.mjs';
import {part} from './resolve-andalucia-inference-multipart.mjs';
import {fraction as f} from './resolve-andalucia-probability-2012.mjs';
import {parameterReplacements} from './andalucia-probability-pdf-parameter-evidence.mjs';
const q=(n,d,event,label,wrong,reasons)=>({n,d,event,label,wrong,reasons});
export const cases=[
 {index:670,kind:'probability',literals:['65%','25%','ambos idiomas'],scale:400,cells:[['I','G',104],['I','Gc',156],['Ic','G',35],['Ic','Gc',105]],definitions:'I: habla inglés; G: habla alemán. El 40 % del PDF está condicionado a hablar inglés.',derivation:[['El reparto de inglés determina los pesos de las dos ramas.','P(I)=0,65; P(Ic)=0,35'],['Multiplicamos cada rama por su tasa de alemán.','P(I∩G)=0,65·0,40=0,26; P(Ic∩G)=0,35·0,25=0,0875'],['Completamos las ramas sin alemán y sumamos su marginal.','P(I∩Gc)=0,39; P(Ic∩Gc)=0,2625; P(G)=0,3475']],queries:[q([0],'all','I∩G','ambos idiomas',[[2,5],[13,20],[9,20]],['Confundir condicionada con conjunta.','Omitir la tasa de alemán.','Promediar tasas no comparables.']),q([0,2],'all','G','alemán',[[13,40],[13,50],[51,100]],['Promediar las tasas sin pesos.','Contar solo quienes hablan inglés.','Usar 65 % como tasa de alemán entre quienes hablan inglés.']),q([0],[0,2],'I|G','inglés dado alemán',[[2,5],[13,50],[13,20]],['Invertir la condición.','Dar conjunta.','Dar marginal.'])]},
 {index:888,kind:'probability',literals:['Sean A y B','Sean C y D','independientes'],custom:'two-independent-setups'},
 {index:1094,kind:'probability',literals:['streaming','cuarta parte','satisfecho'],scale:10000,cells:[['C-acierto','S',2387],['C-acierto','Sc',1953],['C','error',1860],['T','acierto',1875],['T','error',625],['M','acierto',195],['M','error',1105]],definitions:'C: ciencia ficción; T: terror; M: musical; R: recomendación correcta; S: satisfacción. No se confunde satisfacción con acierto.',derivation:[['El PDF fija los pesos de los géneros.','P(C)=0,62; P(T)=0,25; P(M)=1−0,62−0,25=0,13'],['Las tasas de acierto se multiplican por el peso del género.','P(C∩R)=0,62·0,70=0,434; P(T∩R)=0,25·0,75=0,1875'],['Calculamos la tercera rama y la probabilidad total.','P(M∩R)=0,13·0,15=0,0195; P(R)=0,641'],['El error de terror es la rama complementaria dentro de terror.','P(T∩Rc)=0,25·0,25=0,0625; P(Rc)=0,359'],['La satisfacción se condiciona a ciencia ficción recomendada correctamente.','P(C∩R∩S)=0,62·0,70·0,55=0,2387']],queries:[q([0,1,3,5],'all','R','recomendación correcta',[[8,15],[359,1000],[217,500]],['Promediar tasas sin pesos de género.','Dar el error.','Contar solo ciencia ficción.']),q([4],[2,4,6],'T|Rc','terror dado recomendación incorrecta',[[1,16],[1,4],[1875,6410]],['Dar conjunta.','Dar marginal o invertir la condición.','Condicionar al acierto en lugar del error.']),q([0],'all','C∩R∩S','ciencia ficción, acierto y satisfacción',[[77,200],[217,500],[341,1000]],['Omitir el peso del género.','Omitir satisfacción.','Omitir acierto.'])]},
 {index:1102,kind:'probability',literals:['operarios','ingenieros','hombre'],scale:100,cells:[['O','M',9],['O','H',36],['I','M',14],['I','H',21],['D','M',6],['D','H',14]],definitions:'O: operario; I: ingeniero; D: directivo; M: mujer; H: hombre, según las categorías del enunciado.',derivation:[['Completamos el reparto de colectivos y distinguimos sus tasas de mujeres.','P(D)=0,20; P(I)=0,35; P(O)=0,45'],['Calculamos las probabilidades conjuntas de mujeres.','P(O∩M)=0,45·0,20=0,09; P(I∩M)=0,35·0,40=0,14; P(D∩M)=0,20·0,30=0,06'],['Restamos dentro de cada colectivo para obtener hombres.','P(O∩H)=0,36; P(I∩H)=0,21; P(D∩H)=0,14; P(H)=0,71']],queries:[q([2,4],'all','Oc∩M','no operario y mujer',[[29,100],[4,11],[7,10]],['Incluir operarias.','Dar condicionada.','Sumar tasas sin ponderar.']),q([2,4],[2,3,4,5],'M|Oc','mujer dado no operario',[[1,5],[7,20],[29,55]],['Omitir dividir por la condición.','Promediar sin pesos.','Incluir operarias en el numerador.']),{collective:true}]},
 {index:1285,kind:'probability',literals:['dado equilibrado','mayor que 4','número par'],custom:'die-complement-sets'},
 {index:1471,kind:'probability',literals:['0.6','0.8','0.1','independientes'],custom:'three-event-values',scale:25,cells:[['A','B',12],['A','Bc',3],['Ac','B',1],['Ac','Bc',9]],definitions:'A y B son los sucesos oficiales. Las dos tasas de B están condicionadas a A y a su complemento.',derivation:[['La probabilidad de A complementario es uno menos la de A.','P(A)=0,6; P(Ac)=0,4'],['Aplicamos la regla del producto dentro de cada rama.','P(A∩B)=0,6·0,8=0,48; P(Ac∩B)=0,4·0,1=0,04'],['La probabilidad total suma ambas ramas excluyentes.','P(B)=0,48+0,04=0,52'],['La unión se obtiene restando una vez la intersección.','P(A∪B)=0,6+0,52−0,48=0,64']]}
];
function tuple(p,labels,values,bad,reasons,steps,proof={}){
 const text=v=>v.map(([n,d],i)=>`${labels[i]}=${f(n,d)}`).join('; ')+'.';
 return part(p,text(values),bad.map(text),reasons,[...steps,['Conservamos el orden solicitado y comprobamos que cada probabilidad está entre cero y uno.',text(values)]],'EXACT_EVENT_TUPLE_AND_ENUMERATED_CHECK',{values,bad,...proof});
}
function collective(c,p){
 const vectors=[[36,21,14],[21,36,14],[14,21,36],[36,14,21]],labels=['Operarios','Ingenieros','Directivos'];
 const claims=vectors.map(v=>({values:v,most:labels[v.indexOf(Math.max(...v))]}));
 const text=x=>`${x.most}: O=${f(x.values[0],71)}; I=${f(x.values[1],71)}; D=${f(x.values[2],71)}.`;
 return part(p,text(claims[0]),claims.slice(1).map(text),['Intercambiar las probabilidades de operarios e ingenieros.','Intercambiar operarios y directivos.','Intercambiar ingenieros y directivos.'],[
 [c.definitions,'La condición es ser hombre, no pertenecer previamente a un colectivo.'],...c.derivation,
 ['Aplicamos Bayes con el mismo denominador de hombres para cada colectivo.','P(O|H)=frac{0,36}{0,71}; P(I|H)=frac{0,21}{0,71}; P(D|H)=frac{0,14}{0,71}'],
 ['Las tres condicionadas suman uno.','frac{36+21+14}{71}=1'],
 ['Con denominador común positivo basta comparar los numeradores.','36>21>14'],
 ['El colectivo más probable entre los hombres es el de operarios.',text(claims[0])]
 ],'BAYES_COLLECTIVE_COMPARISON',{claims,denominator:71});
}
export function contextParts(c,text){
 let projected=text;for(const[a,b]of parameterReplacements[c.index]??[])projected=projected.split(a).join(b);
 const ps=orderedOfficialParts(projected);
 if(c.queries){assert.equal(ps.length,c.queries.length);return ps.map((p,i)=>c.queries[i].collective?collective(c,p):eventProbabilityPart(c,c.queries[i],p));}
 assert.equal(ps.length,2);
 if(c.custom==='two-independent-setups'){
  const a={scale:10,cells:[['A','B',1],['A','Bc',4],['Ac','B',3],['Ac','Bc',2]],definitions:'Solo en este apartado usamos A y B. No se ha supuesto su independencia.',derivation:[['Despejamos la intersección en la fórmula de inclusión-exclusión.','P(A∩B)=P(A)+P(B)−P(A∪B)=0,5+0,4−0,8=0,1'],['La condición es B; su probabilidad positiva es el denominador.','P(A|B)=frac{P(A∩B)}{P(B)}=frac{0,1}{0,4}']]};
  const b={scale:50,cells:[['C','D',12],['C','Dc',3],['Cc','D',28],['Cc','Dc',7]],definitions:'Este apartado usa C y D, que sí son independientes según el PDF.',derivation:[['La independencia permite multiplicar los marginales.','P(C∩D)=P(C)P(D)=0,3·0,8=0,24'],['La unión incluye la intersección sin duplicarla.','P(C∪D)=0,3+0,8−0,24=0,86'],['Comprobamos también por complemento: ninguno exige los dos complementarios.','1−(1−0,3)(1−0,8)=1−0,14=0,86']]};
  return [eventProbabilityPart(a,q([0],[0,2],'A|B','A dado B',[[1,10],[1,5],[1,2]],['Dar conjunta.','Invertir condición.','Suponer independencia no declarada.']),ps[0]),eventProbabilityPart(b,q([0,1,2],'all','C∪D','C o D',[[3,5],[19,25],[3,10]],['Contar exactamente uno.','Complementar la intersección.','Dar solo C.']),ps[1])];
 }
 if(c.custom==='three-event-values'){
  const vals=[[13,25],[12,25],[16,25]],bad=[[[9,10],[12,25],[9,10]],[[13,25],[12,25],[1,25]],[[13,25],[4,5],[8,25]]];
  // Keep distractors in [0,1]: omitted weights yields B=0.9; using only B for union is a second error.
  bad[0]=[[9,10],[12,25],[9,10]];
  return [tuple(ps[0],['P(B)','P(A∩B)','P(A∪B)'],vals,bad,['Sumar tasas condicionadas sin pesos y confundir la unión con B.','Dar B sin A en vez de la unión.','Confundir P(B|A) con la intersección.'],[
   [c.definitions,'Se piden tres probabilidades diferentes.'],...c.derivation,
   ['La parte exterior a ambos permite verificar la unión por complemento.','P(Ac∩Bc)=0,4·0,9=0,36; 1−0,36=0,64'],
   ['Las cuatro regiones disjuntas suman uno.','0,48+0,12+0,04+0,36=1']
  ],{cells:c.cells}),buildEventParts({...c,custom:undefined,queries:[q([0],'all','A∩B','ambos',[[1,1],[0,1],[1,2]],['a','b','c']),{independence:true,row:'A',column:'B'}]},projected)[1]];
 }
 assert.equal(c.custom,'die-complement-sets');
 const values=[[5,6],[2,4,6],[1,2,3,4,6],[5],[1,2,3,4,5]];
 const bad=Array.from({length:3},()=>structuredClone(values));bad[0][2]=[2,4];bad[1][3]=[1,3,5];bad[2][4]=[6];
 const names=['A','B','Aᶜ∪B','A∩Bᶜ','(A∩B)ᶜ'];const fmt=v=>v.map((s,i)=>`${names[i]}={${s.join(', ')}}`).join('; ')+'.';
 return [part(ps[0],fmt(values),bad.map(fmt),['Usar intersección en vez de unión.','Omitir exigir pertenecer a A.','Olvidar complementar la intersección.'],[
  ['El espacio muestral contiene las seis caras equiprobables.','Ω={1,2,3,4,5,6}'],
  ['A contiene los mayores que cuatro y B los pares.','A={5,6}; B={2,4,6}'],
  ['Complementar significa conservar los resultados de Ω que no están en el suceso.','Aᶜ={1,2,3,4}; Bᶜ={1,3,5}'],
  ['La unión reúne los resultados sin repetirlos.','Aᶜ∪B={1,2,3,4,6}'],
  ['La intersección exige simultáneamente las dos condiciones.','A∩Bᶜ={5}; A∩B={6}'],
  ['Complementamos la intersección, no cada suceso por separado dentro de una intersección.','(A∩B)ᶜ={1,2,3,4,5}'],
  ['Comprobamos con De Morgan y los cinco elementos fuera de la cara seis.','(A∩B)ᶜ=Aᶜ∪Bᶜ; |(A∩B)ᶜ|=5']
 ],'EXHAUSTIVE_SIX_FACE_SET_MEMBERSHIP',{values,bad}),tuple(ps[1],['P(Aᶜ∩Bᶜ)','P(Aᶜ∪Bᶜ)'],[[1,3],[5,6]],[[[1,6],[5,6]],[[1,3],[1,6]],[[1,3],[1,3]]],['Omitir uno de los dos resultados favorables.','Dar la intersección sin complementar.','Cambiar unión de complementos por su intersección.'],[
  ['Cada cara del dado tiene probabilidad un sexto.','P({i})=frac{1}{6}, i∈Ω'],
  ['Los complementos se forman dentro de las seis caras oficiales.','Aᶜ={1,2,3,4}; Bᶜ={1,3,5}'],
  ['En la primera pregunta exigimos ambas condiciones.','Aᶜ∩Bᶜ={1,3}'],
  ['Aplicamos Laplace contando dos casos entre seis.','P(Aᶜ∩Bᶜ)=frac{2}{6}=frac{1}{3}'],
  ['En la segunda basta una de las dos condiciones.','Aᶜ∪Bᶜ={1,2,3,4,5}'],
  ['Contamos cinco casos y comprobamos con De Morgan.','P(Aᶜ∪Bᶜ)=frac{5}{6}=1−P(A∩B)']
 ],{outcomes:6})];
}
export function buildContextBatch(id='batch-0288',selected=cases){const r=buildBatch(selected,id,contextParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Probabilidad';x.secondaryTopics=['Operaciones con sucesos','Probabilidad total y Bayes'];x.qualityGates.pedagogical='OFFICIAL_PDF_CONTEXT_AND_ENUMERATED_EVENT_CHECKS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildContextBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0288-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0288.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

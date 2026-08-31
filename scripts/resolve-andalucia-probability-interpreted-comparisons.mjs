import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {eventProbabilityPart,orderedOfficialParts} from './resolve-andalucia-probability-event-models.mjs';
import {part} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:1095,kind:'probability',literals:['20000 kg','12000','25000','15000','paquetes de 1 kg'],scale:45,cells:[['F1','A',12],['F1','B',8],['F2','A',15],['F2','B',10]],definitions:'F1/F2: fábrica de origen; A/B: tipo de pasta. Se elige entre paquetes del distribuidor, no entre fábricas equiprobables.',derivation:[['Cada paquete pesa un kilogramo: el número de paquetes es proporcional a los kilogramos producidos.','N=20000+25000=45000'],['Restamos cada producción A de su total para hallar B.','B de F1=8000; B de F2=10000; A total=27000'],['Dividimos todos los conteos entre mil para trabajar con pesos exactos, sin cambiar las probabilidades.','(12000,8000,15000,10000)/1000=(12,8,15,10)']]},
 {index:1401,kind:'probability',literals:['54 siniestros','19 de ellos','29 los','21 de los siniestros','sénior y el vehículo es nuevo'],scale:54,cells:[['J','N',8],['J','V',21],['S','N',11],['S','V',14]],definitions:'J/S: conductor joven/sénior; N/V: vehículo nuevo/viejo. Las probabilidades se refieren únicamente a los siniestros del estudio.',derivation:[['Completamos la fila de jóvenes usando su total y los vehículos viejos.','J∩N=29−21=8'],['Completamos la columna de vehículos nuevos.','S∩N=19−8=11'],['Los sénior son los restantes conductores; quitamos los de vehículo nuevo.','S=54−29=25; S∩V=25−11=14'],['Comprobamos ambos marginales y la suma de las cuatro celdas.','8+21=29; 8+11=19; 8+21+11+14=54']]},
 {index:1244,kind:'probability',literals:['30%','50%','40%','25%','Solo verifique uno'],scale:50,cells:[['A','M',6],['A','H',9],['Ac','M',18],['Ac','H',17]],definitions:'A: profesa la religión indicada; M/H: mujer/hombre en la partición del enunciado. Ac incluye otras religiones y ninguna; no inventamos cómo se reparten por sexo.',derivation:[['Primero calculamos la intersección desde la condicionada a religión A.','P(A∩M)=P(A)P(M|A)=0,30·0,40=0,12'],['La segunda condicionada permite despejar la marginal de mujeres.','P(A|M)=0,12/P(M)=0,25 ⇒ P(M)=0,48'],['Completamos las regiones A sin M, M sin A y el exterior a la unión.','P(A∩H)=0,18; P(Ac∩M)=0,36; P(Ac∩H)=0,34']]}
];
const q=(n,d,event,label,wrong,reasons)=>({n,d,event,label,wrong,reasons});
export function buildComparisonParts(c,text){
 const p=orderedOfficialParts(text);
 if(c.index===1095){
  const a=eventProbabilityPart(c,q([1,3],'all','B','tipo B',[[3,5],[8,45],[2,9]],['Dar el tipo A.','Contar solo B de F1.','Contar solo B de F2.']),p[0]);
  const label=(which,x,y)=>`${which}; P(F1|A)=${x}; P(F2|A)=${y}.`;
  const answer=label('Es más probable F2','frac{4}{9}','frac{5}{9}');
  return [a,part(p[1],answer,[label('Son equiprobables','frac{1}{2}','frac{1}{2}'),label('Es más probable F1','frac{5}{9}','frac{4}{9}'),label('Es más probable F2','frac{4}{15}','frac{1}{3}')],['Elegir fábricas equiprobables, aunque se elige un paquete.','Intercambiar las fábricas.','Dividir los paquetes A de cada fábrica por toda la producción y dar conjuntas.'],[
   [c.definitions,'La condición A restringe el universo a 27000 paquetes.'],...c.derivation,
   ['Dividimos el número favorable de cada fábrica entre todos los paquetes A.','P(F1|A)=12000/27000=frac{4}{9}; P(F2|A)=15000/27000=frac{5}{9}'],
   ['Comparamos fracciones con el mismo denominador; no comparamos las tasas P(A|F1) y P(A|F2).','frac{5}{9} > frac{4}{9}; P(A|F1)=P(A|F2)=0,60'],
   ['Las dos posibilidades agotan los paquetes A y sus posteriores suman uno.','frac{4}{9}+frac{5}{9}=1'],
   ['La igualdad de las tasas A en las fábricas no elimina sus distintos volúmenes de producción.',answer]
  ],'CONDITIONAL_FACTORY_COUNT_COMPARISON',{countsA:[12000,15000],denominator:27000,optionClaims:[{winner:2,posterior:[4/9,5/9]},{winner:0,posterior:[.5,.5]},{winner:1,posterior:[5/9,4/9]},{winner:2,posterior:[4/15,1/3]}]})];
 }
 if(c.index===1401){
  const a=eventProbabilityPart(c,q([3],'all','S∩V','sénior con vehículo viejo',[[25,54],[14,35],[21,54]],['Dar todos los sénior.','Condicionar a vehículos viejos sin que se pida.','Dar jóvenes con vehículo viejo.']),p[0]);
  const b=eventProbabilityPart(c,q([1],[1,3],'J|V','joven entre vehículos viejos',[[7,18],[29,54],[14,25]],['Dar la conjunta.','Dar marginal de jóvenes.','Calcular viejo dado sénior.']),p[1]);
  const answer='Falsa: joven y nuevo, 8 siniestros; sénior y nuevo, 11.';
  return [a,b,part(p[2],answer,['Cierta: joven y nuevo, 8 siniestros; sénior y nuevo, 11.','Falsa: joven y nuevo, 11 siniestros; sénior y nuevo, 8.','Cierta: joven y nuevo, 29 siniestros; sénior y nuevo, 19.'],['Invertir la comparación de frecuencias.','Intercambiar dos celdas de la tabla.','Confundir marginales de joven y nuevo con intersecciones.'],[
   [c.definitions,'Debemos comparar las cuatro combinaciones, no sus marginales.'],...c.derivation,
   ['Las cuatro probabilidades tienen denominador común; basta ordenar los conteos.','8 < 11 < 14 < 21'],
   ['El mínimo corresponde a joven con vehículo nuevo, no a sénior con vehículo nuevo.','P(J∩N)=frac{8}{54}; P(S∩N)=frac{11}{54}'],
   ['No concluimos que un grupo tenga menor riesgo de accidente en la población: no conocemos cuántos conductores hay en cada grupo.',answer]
  ],'CONTINGENCY_CELL_MINIMUM_NOT_POPULATION_RISK',{cells:c.cells,minimum:0,assertedCell:2,assertion:false,optionClaims:[{assertion:false,youngNew:8,seniorNew:11},{assertion:true,youngNew:8,seniorNew:11},{assertion:false,youngNew:11,seniorNew:8},{assertion:true,youngNew:29,seniorNew:19}]})];
 }
 // a) needs only the three religion categories, not their unknown sex breakdown.
 const religion={scale:10,cells:[['A','U',3],['O','U',5],['N','U',2]],definitions:'A, O y N: religión indicada, otras religiones y ninguna. Son tres categorías disjuntas.',derivation:[['Las dos categorías de religión no se solapan.','P(A∪O)=0,30+0,50=0,80'],['N es el complemento de pertenecer a una de las dos categorías anteriores.','P(N)=1−0,80=0,20']]};
 return [eventProbabilityPart(religion,q([2],'all','N','ninguna religión',[[7,10],[1,2],[4,5]],['Complementar solo A.','Complementar solo otras religiones.','Dar quienes sí profesan alguna religión.']),p[0]),eventProbabilityPart(c,q([1,3],'all','H','hombre',[[3,5],[7,10],[12,25]],['Dar hombre condicionado a A.','Dar no A.','Dar mujer.']),p[1]),eventProbabilityPart(c,q([1,2],'all','(A∩H)∪(Ac∩M)','exactamente A o M, no ambos',[[33,50],[39,50],[3,25]],['Usar unión inclusiva.','Sumar marginales sin descontar intersecciones.','Dar intersección.']),p[2])];
}
export function buildComparisonBatch(id='batch-0272',selected=cases){const r=buildBatch(selected,id,buildComparisonParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Probabilidad';x.secondaryTopics=['Probabilidad condicionada','Tablas de contingencia'];}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildComparisonBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0272-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0272.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

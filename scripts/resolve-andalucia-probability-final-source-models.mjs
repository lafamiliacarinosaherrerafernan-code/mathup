// Eight individually resolved official tasks. Integer weights encode probabilities,
// not an invented observed sample. Original statements remain immutable.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {orderedOfficialParts,eventProbabilityPart} from './resolve-andalucia-probability-event-models.mjs';
export const cases=[
 {index:1562,kind:'probability',literals:['60%','50%','20%','no tiene préstamo personal'],scale:10,cells:[['H','P',2],['H','Pc',4],['Hc','P',3],['Hc','Pc',1]],definitions:'H: préstamo hipotecario; P: préstamo personal; c: complementario.',derivation:[
  ['Usamos inclusión-exclusión: la suma de marginales cuenta dos veces a quienes tienen ambos préstamos.','P(H∪P)=P(H)+P(P)−P(H∩P)=0,60+0,50−0,20=0,90'],
  ['Restamos la intersección de cada marginal para obtener las regiones exclusivas.','P(H∩Pc)=0,40; P(Hc∩P)=0,30; P(Hc∩Pc)=0,10'],
  ['Cuando se sabe que no tiene préstamo personal, el universo tiene probabilidad un medio.','P(H|Pc)=frac{P(H∩Pc)}{P(Pc)}; P(Pc)=0,50']],queries:[
  {n:[3],d:'all',event:'Hc∩Pc',label:'no tener ninguno de los préstamos',wrong:[[1,5],[2,5],[3,10]],reasons:['Confundir ninguno con ambos.','Dar solo hipotecario.','Dar solo personal.']},
  {n:[1],d:[1,3],event:'H|Pc',label:'hipotecario entre quienes no tienen personal',wrong:[[2,5],[3,5],[1,2]],reasons:['Dar la conjunta sin condicionar.','Conservar el marginal hipotecario.','Invertir la condición y usar el marginal sin préstamo personal.']}]},
 {index:1568,kind:'probability',literals:['90 %','40 %','un 3 %','no tiene vehículo'],scale:100,cells:[['V','T',33],['V','Tc',57],['Vc','T',7],['Vc','Tc',3]],definitions:'V: vehículo propio; T: usa transporte público; c: complementario.',derivation:[
  ['Ninguno es el complementario de al menos uno.','P(V∪T)=1−P(Vc∩Tc)=1−0,03=0,97'],
  ['Despejamos la intersección en inclusión-exclusión.','P(V∩T)=P(V)+P(T)−P(V∪T)=0,90+0,40−0,97=0,33'],
  ['Descontamos la intersección de cada marginal.','P(Vc∩T)=0,40−0,33=0,07; P(V∩Tc)=0,90−0,33=0,57'],
  ['Condicionar a no tener vehículo exige dividir por su probabilidad, no por la del transporte.','P(T|Vc)=frac{P(T∩Vc)}{P(Vc)}; P(Vc)=0,10']],queries:[
  {n:[0,1,2],d:'all',event:'V∪T',label:'vehículo propio o transporte público',wrong:[[47,50],[3,5],[33,100]],reasons:['Suponer independencia y multiplicar complementos.','Contar exactamente uno en lugar de al menos uno.','Dar la intersección.']},
  {n:[2],d:'all',event:'T∩Vc',label:'transporte público sin vehículo propio',wrong:[[2,5],[33,100],[1,25]],reasons:['No excluir a quienes tienen vehículo.','Elegir la intersección contraria.','Suponer independencia no dada.']},
  {n:[2],d:[2,3],event:'T|Vc',label:'transporte entre quienes no tienen vehículo',wrong:[[7,100],[2,5],[7,40]],reasons:['No dividir por la condición.','Conservar la probabilidad marginal.','Invertir la condición.']}]},
 {index:1572,kind:'probability',literals:['1 dólar, 1 libra y 1 euro','el doble','dos caras','al azar'],scale:18,cells:[['D','C',4],['D','X',2],['L','C',6],['L','X',0],['E','C',3],['E','X',3]],definitions:'D/L/E: dólar/libra/euro; C: cara; X: cruz.',derivation:[
  ['En el dólar, cara y cruz suman uno y la primera duplica a la segunda.','P(C|D)=2P(X|D); 3P(X|D)=1 ⇒ P(X|D)=frac{1}{3}; P(C|D)=frac{2}{3}'],
  ['La libra tiene dos caras y el euro es equilibrado. Las tres monedas son equiprobables.','P(C|L)=1; P(X|L)=0; P(C|E)=P(X|E)=frac{1}{2}; P(D)=P(L)=P(E)=frac{1}{3}'],
  ['Multiplicamos por la elección de moneda para obtener probabilidades conjuntas.','P(D∩C)=frac{2}{9}; P(L∩C)=frac{1}{3}; P(E∩C)=frac{1}{6}; P(D∩X)=frac{1}{9}; P(E∩X)=frac{1}{6}'],
  ['Para invertir la condición usamos Bayes: primero restringimos el universo a las cruces.','P(D|X)=frac{P(D∩X)}{P(X)}; P(X)=frac{1}{9}+frac{1}{6}=frac{5}{18}']],queries:[
  {n:[0,2,4],d:'all',event:'C',label:'obtener cara',wrong:[[1,2],[2,3],[5,6]],reasons:['Tratar todas las monedas como equilibradas.','Usar únicamente la probabilidad del dólar.','Tratar el dólar como si también tuviera dos caras.']},
  {n:[1],d:[1,3,5],event:'D|X',label:'dólar entre los lanzamientos con cruz',wrong:[[1,3],[2,3],[1,9]],reasons:['No actualizar la elección previa.','Usar cara dado dólar en vez de dólar dado cruz.','Dar solo la conjunta.']}]},
 {index:1579,kind:'probability',literals:['72%','11%','87%','86%','12.51%','contrato temporal'],scale:10000,cells:[['I','M',6264],['I','Mc',936],['T','M',1023],['T','Mc',77],['P','M',1462],['P','Mc',238]],definitions:'I: indefinido; T: temporal; P: cuenta propia; M: opina que mejora la conciliación; c: complementario.',derivation:[
  ['Las tres situaciones laborales forman una partición; completamos cuenta propia.','P(P)=1−0,72−0,11=0,17; P(M)=1−0,1251=0,8749'],
  ['Multiplicamos las probabilidades conocidas de cada rama.','P(I∩M)=0,72·0,87=0,6264; P(P∩M)=0,17·0,86=0,1462'],
  ['La probabilidad total permite despejar la rama temporal desconocida.','P(T∩M)=P(M)−P(I∩M)−P(P∩M)=0,8749−0,6264−0,1462=0,1023'],
  ['Separamos la conjunta de la condicionada solicitada.','P(M|T)=frac{P(T∩M)}{P(T)}=frac{0,1023}{0,11}=0,93'],
  ['No trabajar por cuenta propia incluye indefinidos y temporales, sin solapamiento.','P(Pc∩M)=0,6264+0,1023=0,7287; P(Pc|M)=frac{P(Pc∩M)}{P(M)}']],queries:[
  {n:[2],d:[2,3],event:'M|T',label:'mejora de conciliación entre temporales',wrong:[[8749,10000],[1251,10000],[7,100]],reasons:['Usar el marginal de mejora.','Usar el marginal contrario.','Dar el complemento dentro de temporales.']},
  {n:[0,2],d:[0,2,4],event:'Pc|M',label:'no ser autónomo entre quienes opinan que mejora',wrong:[[7287,10000],[83,100],[1462,8749]],reasons:['No dividir por el universo condicionado.','Conservar la probabilidad previa de no ser autónomo.','Dar el suceso complementario.']}]},
 {index:1581,kind:'probability',literals:['55%','30%','20%','no consuma'],scale:100,cells:[['O','G',20],['O','Gc',35],['Oc','G',10],['Oc','Gc',35]],definitions:'O: consume aceite de oliva; G: consume aceite de girasol; c: complementario.',derivation:[
  ['Restamos ambos consumos de cada marginal para obtener los consumos exclusivos.','P(O∩Gc)=0,55−0,20=0,35; P(Oc∩G)=0,30−0,20=0,10'],
  ['Inclusión-exclusión da al menos uno y su complemento da ninguno.','P(O∪G)=0,55+0,30−0,20=0,65; P(Oc∩Gc)=1−0,65=0,35'],
  ['En cada pregunta condicionada, el denominador corresponde al consumo que ya se conoce.','P(G|O)=frac{P(G∩O)}{P(O)}; P(Oc|G)=frac{P(Oc∩G)}{P(G)}']],queries:[
  {n:[0],d:[0,1],event:'G|O',label:'girasol entre consumidores de oliva',wrong:[[1,5],[2,3],[3,10]],reasons:['Dar solo la conjunta.','Invertir la condición.','Usar el marginal de girasol.']},
  {n:[2],d:[0,2],event:'Oc|G',label:'no consumir oliva entre consumidores de girasol',wrong:[[1,10],[9,20],[2,3]],reasons:['Dar solo la conjunta.','Usar el marginal sin oliva.','Responder oliva en lugar de no oliva.']},
  {n:[3],d:'all',event:'Oc∩Gc',label:'no consumir ninguno de los aceites',wrong:[[3,20],[63,200],[13,20]],reasons:['Complementar la suma sin descontar la intersección.','Suponer independencia para los complementarios.','Dar el complemento de ninguno.']}]},
 {index:1586,kind:'probability',literals:['60 %','30 %','80 %','70 %','melocotón','1 litro'],scale:100,cells:[['N','L2',48],['N','L1',12],['P','L2',21],['P','L1',9],['M','L2',4],['M','L1',6]],definitions:'N/P/M: naranja/piña/melocotón; L1/L2: botella de uno/dos litros.',derivation:[
  ['Completamos el tipo de zumo y distinguimos uno de dos litros.','P(M)=1−0,60−0,30=0,10; P(L2|M)=1−0,60=0,40'],
  ['Multiplicamos cada proporción de zumo por su condicionada de dos litros.','P(N∩L2)=0,60·0,80=0,48; P(P∩L2)=0,30·0,70=0,21; P(M∩L2)=0,10·0,40=0,04'],
  ['Las ramas de un litro son los complementos dentro de cada zumo.','P(N∩L1)=0,12; P(P∩L1)=0,09; P(M∩L1)=0,06'],
  ['Probabilidad total suma ramas; Bayes divide la rama por el tamaño de botella conocido.','P(L2)=0,48+0,21+0,04=0,73; P(N|L2)=frac{P(N∩L2)}{P(L2)}; P(M|L1)=frac{P(M∩L1)}{P(L1)}']],queries:[
  {n:[0,2,4],d:'all',event:'L2',label:'botella de dos litros',wrong:[[59,100],[19,30],[3,4]],reasons:['Usar piña al diez por ciento en vez del treinta.','Promediar las condicionadas sin ponderar por tipo de zumo.','Usar el sesenta por ciento de melocotón como dos litros en vez de uno.']},
  {n:[0],d:[0,2,4],event:'N|L2',label:'naranja entre botellas de dos litros',wrong:[[12,25],[3,5],[4,5]],reasons:['Dar solo la conjunta.','Conservar la probabilidad previa de naranja.','Invertir la condición.']},
  {n:[5],d:[1,3,5],event:'M|L1',label:'melocotón entre botellas de un litro',wrong:[[3,50],[1,10],[2,5]],reasons:['Dar solo la conjunta.','Conservar la proporción previa de melocotón.','Usar dos litros dado melocotón.']}]},
 {index:1623,kind:'probability',literals:['5 bolas blancas, 3 rojas y 4 negras','la devuelve','sólo hay una bola blanca','empate'],scale:144,cells:[['B','B',25],['B','R',15],['B','N',20],['R','B',15],['R','R',9],['R','N',12],['N','B',20],['N','R',12],['N','N',16]],definitions:'Cada par indica el color de la primera y segunda extracción: B blanca, R roja, N negra. Se repone la primera bola.',derivation:[
  ['La reposición mantiene las probabilidades y hace independientes las extracciones.','P(B)=frac{5}{12}; P(R)=frac{3}{12}; P(N)=frac{4}{12}; P(i,j)=P(i)P(j)'],
  ['Ana gana con los tres pares de igual color; sumamos sucesos disjuntos.','P(Ana)=frac{25+9+16}{144}=frac{50}{144}'],
  ['Manolo necesita exactamente una blanca, que puede salir en cualquiera de las dos posiciones.','P(Manolo)=2·frac{5}{12}·frac{7}{12}=frac{70}{144}'],
  ['Solo quedan roja-negra o negra-roja para empate; no incluyen ninguna blanca.','P(empate)=2·frac{3}{12}·frac{4}{12}=frac{24}{144}; 50+70+24=144']],queries:[
  {n:[0,4,8],d:'all',event:'gana Ana',label:'victoria de Ana',wrong:[[19,66],[5,12],[47,72]],reasons:['Calcular sin reposición.','Contar una sola extracción blanca.','Dar el complemento de colores iguales.']},
  {n:[1,2,3,6],d:'all',event:'gana Manolo',label:'victoria de Manolo',wrong:[[5,12],[95,144],[35,66]],reasons:['Mirar una sola extracción.','Contar al menos una blanca, incluyendo dos.','Calcular sin reposición.']},
  {n:[5,7],d:'all',event:'empate',label:'empate',wrong:[[2,11],[7,12],[1,12]],reasons:['Calcular roja-negra sin reposición.','Mirar únicamente que la primera no sea blanca.','Contar solo una de las dos ordenaciones de roja y negra.']}]},
 {index:1632,kind:'probability',literals:['700 alumnos','210 son hombres y 490 mujeres','60%','70%'],scale:700,cells:[['H','A',126],['H','Ac',84],['M','A',343],['M','Ac',147]],definitions:'H/M: hombres/mujeres; A: aprueba; c: complementario.',derivation:[
  ['Calculamos los aprobados de cada grupo a partir de sus respectivos porcentajes.','H aprobados = 210·0,60=126; M aprobadas = 490·0,70=343'],
  ['El total de aprobados suma ambos grupos, que son disjuntos.','Aprobados = 126+343=469; no aprobados = 84+147=231'],
  ['Probabilidad total pondera por el tamaño de cada grupo; no promedia las dos tasas sin pesos.','P(A)=frac{210}{700}·0,60+frac{490}{700}·0,70'],
  ['Saber que ha aprobado reduce el universo a los cuatrocientos sesenta y nueve aprobados.','P(M|A)=frac{P(M∩A)}{P(A)}=frac{343}{469}']],queries:[
  {n:[0,2],d:'all',event:'A',label:'aprobar',wrong:[[13,20],[7,10],[63,100]],reasons:['Promediar ambas tasas sin ponderar.','Usar únicamente la tasa femenina.','Intercambiar las tasas de ambos grupos.']},
  {n:[2],d:[0,2],event:'M|A',label:'mujer entre aprobados',wrong:[[49,100],[7,10],[18,67]],reasons:['Dar solo la conjunta.','Conservar el marginal femenino.','Dar el suceso complementario entre aprobados.']} ]},
];
export function buildFinalSourceParts(c,text){const ps=orderedOfficialParts(text);assert.equal(ps.length,c.queries.length);assert.equal(c.cells.reduce((s,r)=>s+r[2],0),c.scale);return ps.map((p,i)=>eventProbabilityPart(c,c.queries[i],{...p,prompt:p.prompt.replace(/\s*BLOQUE\s+[A-D]\s*$/,'').trim()}));}
export function buildFinalSourceBatch(id='batch-0277',selected=cases){const r=buildBatch(selected,id,buildFinalSourceParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){assert.equal(x.subject,'Matemáticas Aplicadas a las CCSS II');x.primaryTopic='Probabilidad';x.secondaryTopics=['Probabilidad total','Probabilidad condicionada','Operaciones con sucesos'];x.qualityGates.pedagogical='OFFICIAL_EVENTS_DEFINED_AND_FULL_EXACT_PROBABILITY_DEVELOPMENT';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFinalSourceBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0277-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0277.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

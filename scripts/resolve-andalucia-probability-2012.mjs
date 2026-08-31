// Authored mathematical solutions, bound to official 2012 DOC literals.
// Integer probability weights are a verification model, not invented observations.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';
const gcd=(a,b)=>b?gcd(b,a%b):a;
export function fraction(n,d=1){assert.ok(Number.isInteger(n)&&Number.isInteger(d)&&d>0);const g=gcd(Math.abs(n),d);return d/g===1?String(n/g):`frac{${n/g}}{${d/g}}`;}
const ratio=(n,d)=>fraction(n,d);
// Each cell: [row event, column event, exact weight]. Keys are stable, not option positions.
export const cases=[
 {index:2,kind:'probability',literals:['90%','30%','25%','400 alumnos'],scale:400,
  cells:[['E','N',100],['E','Nc',260],['Ec','N',20],['Ec','Nc',20]],
  definitions:'E: preocupación por el empleo; N: preocupación por las notas; el sufijo c denota el complementario.',
  derivation:[['La intersección está dada; traducimos el 25% a los 400 alumnos.', 'n(E∩N) = 400·0,25 = 100'],['Separamos las preocupaciones exclusivas y el complemento de la unión.', 'n(E∩Nc) = 360 − 100 = 260; n(Ec∩N) = 120 − 100 = 20; n(Ec∩Nc) = 400 − 380 = 20']],
  queries:[{num:[3],den:'all',count:true,label:'alumnos sin ninguna de las dos preocupaciones',event:'Ec∩Nc',wrong:[[260,1],[100,1],[80,1]],reasons:['Contar quienes solo se preocupan por el empleo.','Contar quienes tienen ambas preocupaciones.','Interpretar veinte alumnos como el 20% de 400.']},{num:[2],den:[2,3],label:'preocupación por las notas entre quienes no se preocupan por el empleo',event:'N|Ec',wrong:[[20,400],[100,400],[1,3]],reasons:['Dar la probabilidad conjunta sin condicionar.','Dar la intersección original de ambas preocupaciones.','Dividir el complemento de empleo entre la proporción de notas.']}]},
 {index:11,kind:'probability',literals:['58%','35%','12%','solamente en un supermercado'],scale:100,
  cells:[['A','B',12],['A','Bc',46],['Ac','B',23],['Ac','Bc',19]],definitions:'A: compra en A; B: compra en B; c denota el complementario.',
  derivation:[['Descontamos de cada marginal la parte común para evitar contar dos veces.', 'P(A∩Bc)=0,58−0,12=0,46; P(Ac∩B)=0,35−0,12=0,23'],['La cuarta celda es el complemento de la unión.', 'P(Ac∩Bc)=1−(0,12+0,46+0,23)=0,19']],
  queries:[{num:[0,1,2],den:'all',label:'comprar en alguno',event:'A∪B',wrong:[[93,100],[69,100],[12,100]],reasons:['Sumar marginales sin restar la intersección.','Excluir indebidamente a quienes compran en ambos.','Dar solo la intersección.']},{num:[3],den:'all',label:'no comprar en ninguno',event:'Ac∩Bc',wrong:[[7,100],[81,100],[31,100]],reasons:['Complementar la suma de marginales sin corregir solapamiento.','Dar el suceso complementario.','Complementar la compra exclusiva.']},{num:[1,2],den:'all',label:'comprar en exactamente uno',event:'(A∩Bc)∪(Ac∩B)',wrong:[[81,100],[93,100],[12,100]],reasons:['Incluir también a quienes compran en ambos.','Contar dos veces la intersección.','Contar solo quienes compran en ambos.']},{num:[1],den:[1,3],label:'comprar en A entre quienes no compran en B',event:'A|Bc',wrong:[[46,100],[58,65],[12,35]],reasons:['No dividir por la condición.','Usar todo A en el numerador, incluyendo compradores de B.','Calcular la condicionada a B, no a su complementario.']}]},
 {index:14,kind:'probability',literals:['si sale 5 o 6','6 bolas blancas y 4 negras','3 bolas blancas y 7 negras','menos de 5'],scale:30,
  cells:[['A','W',6],['A','N',4],['B','W',6],['B','N',14]],definitions:'A: dado 5 o 6 y urna A; B: dado menor que 5 y urna B; W: blanca; N: negra.',
  derivation:[['El dado equilibrado asigna probabilidades distintas a las urnas; no son equiprobables.', 'P(A)=frac{2}{6}=frac{1}{3}; P(B)=frac{4}{6}=frac{2}{3}'],['Multiplicamos por la proporción de cada color dentro de la urna correspondiente.', 'P(A∩W)=frac{1}{3}·frac{6}{10}=frac{6}{30}; P(A∩N)=frac{4}{30}; P(B∩W)=frac{6}{30}; P(B∩N)=frac{14}{30}']],
  queries:[{num:[1,3],den:'all',event:'N',label:'extraer negra',wrong:[[11,20],[7,10],[2,5]],reasons:['Promediar los colores dando el mismo peso a las urnas.','Usar solo la proporción negra de B.','Usar solo la proporción negra de A.']},{num:[3],den:'all',event:'B∩N',label:'negra y procedente de B',wrong:[[7,10],[2,3],[2,15]],reasons:['Omitir la probabilidad de elegir B.','Omitir la condición de color.','Usar la rama negra de A.']},{num:[2],den:[0,2],event:'B|W',label:'dado menor que cinco cuando la bola es blanca',wrong:[[2,3],[1,5],[3,10]],reasons:['Conservar el marginal de B sin actualizarlo.','Dar la probabilidad conjunta.','Invertir la condición y dar P(W|B).']}]},
 {index:16,kind:'probability',literals:['200 personas','60 son profesores','95%','80%'],scale:200,
  cells:[['P','M',57],['P','Mc',3],['Pc','M',112],['Pc','Mc',28]],definitions:'P: profesor de autoescuela; M: mejora su conducción; c: complementario.',
  derivation:[['La muestra tiene sesenta profesores y ciento cuarenta no profesores.', 'n(P)=60; n(Pc)=200−60=140'],['Aplicamos cada tasa de mejora únicamente a su grupo.', 'n(P∩M)=60·0,95=57; n(P∩Mc)=3; n(Pc∩M)=140·0,80=112; n(Pc∩Mc)=28']],
  queries:[{num:[1,3],den:'all',event:'Mc',label:'no mejorar',wrong:[[1,8],[1,5],[169,200]],reasons:['Promediar las tasas de fallo sin ponderar grupos.','Usar solo la tasa de fallo de no profesores.','Dar la probabilidad complementaria de mejora.']},{num:[2],den:[0,2],event:'Pc|M',label:'no ser profesor entre quienes mejoran',wrong:[[14,25],[4,5],[57,169]],reasons:['Dar la conjunta 112/200.','Invertir la condición y usar P(M|Pc).','Dar el complementario dentro de quienes mejoran.']}]},
 {index:22,kind:'probability',literals:['50000 coches','20000','30000','650 coches','200 de la B y 150'],scale:100000,
  cells:[['A','X',650],['A','Xc',49350],['B','X',200],['B','Xc',19800],['C','X',150],['C','Xc',29850]],definitions:'X: accidente durante el año; A, B y C: marcas; c: complementario.',
  derivation:[['Conservamos denominadores distintos por marca; los recuentos absolutos no son tasas.', 'n(A)=50000; n(B)=20000; n(C)=30000'],['Separamos accidente y ausencia de accidente dentro de cada marca.', 'n(X)=650+200+150=1000; n(Xc)=100000−1000=99000']],
  queries:[{special:'minimum-rate'},{num:[4],den:[0,2,4],event:'C|X',label:'marca C entre los coches accidentados',wrong:[[3,1000],[1,200],[3,10]],reasons:['Dividir por 50000 en vez de por todos los accidentados.','Dar P(X|C), invirtiendo la condición.','Usar la proporción marginal de C en toda la cartera.']}]},
 {index:25,kind:'probability',literals:['tres tipos de carnada','1/3','1/5','carnada adecuada'],scale:45,
  cells:[['A','S',5],['A','Sc',10],['Ac','S',6],['Ac','Sc',24]],definitions:'A: carnada adecuada; S: pescar salmón; c: complementario.',
  derivation:[['La elección aleatoria entre tres tipos da un tercio a la adecuada y dos tercios al conjunto de las inadecuadas.', 'P(A)=frac{1}{3}; P(Ac)=frac{2}{3}'],['Multiplicamos cada probabilidad previa por la probabilidad de captura de esa rama.', 'P(A∩S)=frac{1}{3}·frac{1}{3}=frac{5}{45}; P(Ac∩S)=frac{2}{3}·frac{1}{5}=frac{6}{45}']],
  queries:[{num:[0,2],den:'all',event:'S',label:'pescar salmón',wrong:[[1,3],[4,15],[8,15]],reasons:['Suponer que siempre se usa la carnada adecuada.','Promediar los dos grupos con igual peso.','Sumar tasas de captura sin ponderar.']},{num:[0],den:[0,2],event:'A|S',label:'carnada adecuada dado que se pescó salmón',wrong:[[1,3],[1,9],[11,45]],reasons:['Mantener la probabilidad previa sin actualizar.','Dar solo la conjunta.','Dar la probabilidad total de captura.']}]},
 {index:30,kind:'probability',literals:['25 bolas blancas sin marcar','75 bolas blancas marcadas','125 bolas negras sin marcar','175 bolas negras marcadas'],scale:400,
  cells:[['W','Mc',25],['W','M',75],['N','Mc',125],['N','M',175]],definitions:'W: blanca; N: negra; M: marcada; Mc: no marcada.',
  derivation:[['Las cuatro clases son disjuntas y agotan la urna.', 'N total = 25+75+125+175=400'],['Calculamos los marginales necesarios sin confundir marca y color.', 'n(W)=25+75=100; n(N)=300; n(M)=75+175=250; n(Mc)=150']],
  queries:[{num:[0,1],den:'all',event:'W',label:'bola blanca',wrong:[[3,16],[1,16],[3,4]],reasons:['Contar solo blancas marcadas.','Contar solo blancas sin marcar.','Dar el complementario negro.']},{num:[1],den:[1,3],event:'W|M',label:'blanca entre las marcadas',wrong:[[3,16],[3,4],[1,4]],reasons:['Usar el total de la urna como denominador.','Invertir la condición y calcular marcada entre blancas.','Ignorar la condición y usar el marginal blanco.']},{num:[3],den:'all',event:'N∩M',label:'negra y marcada',wrong:[[7,12],[7,10],[5,8]],reasons:['Condicionar a negra sin que se pida.','Condicionar a marcada sin que se pida.','Contar todas las marcadas.']},{special:'independence'}]},
 {index:35,kind:'probability',literals:['44%','25% está en paro','20% de los hombres'],scale:1000,
  cells:[['M','P',110],['M','Pc',330],['H','P',112],['H','Pc',448]],definitions:'M: mujer; H: hombre; P: paro; Pc: trabaja dentro de la población activa.',
  derivation:[['La proporción de hombres es el complemento de la de mujeres.', 'P(M)=0,44; P(H)=0,56'],['Ponderamos cada tasa de paro por su grupo; el complemento representa empleo.', 'P(M∩P)=0,44·0,25=0,110; P(H∩P)=0,56·0,20=0,112; P(M∩Pc)=0,330; P(H∩Pc)=0,448']],
  queries:[{num:[0,2],den:'all',event:'P',label:'persona en paro',wrong:[[9,20],[1,4],[1,5]],reasons:['Sumar tasas condicionadas sin ponderación.','Usar solo la tasa femenina.','Usar solo la tasa masculina.']},{num:[3],den:[1,3],event:'H|Pc',label:'hombre entre quienes trabajan',wrong:[[56,125],[14,25],[56,111]],reasons:['Dar la conjunta sin dividir por empleo.','Mantener la proporción marginal de hombres.','Condicionar a paro en vez de empleo.']}]},
 {index:36,kind:'probability',literals:['60%, 30% y 10%','5%','4%','3%'],scale:1000,
  cells:[['A','D',30],['A','Dc',570],['B','D',12],['B','Dc',288],['C','D',3],['C','Dc',97]],definitions:'A, B y C: máquinas; D: defectuoso; Dc: no defectuoso.',
  derivation:[['Las máquinas forman una partición con pesos de producción distintos.', 'P(A)=0,60; P(B)=0,30; P(C)=0,10'],['Multiplicamos cada peso por su tasa de defecto y obtenemos los complementos dentro de cada rama.', 'P(A∩D)=0,030; P(B∩D)=0,012; P(C∩D)=0,003; P(A∩Dc)=0,570; P(B∩Dc)=0,288; P(C∩Dc)=0,097']],
  queries:[{num:[4],den:'all',event:'C∩D',label:'defectuoso y fabricado por C',wrong:[[3,100],[1,10],[97,100]],reasons:['Omitir la probabilidad de elegir producción de C.','Omitir el defecto.','Usar la tasa no defectuosa de C.']},{num:[1,3,5],den:'all',event:'Dc',label:'no defectuoso',wrong:[[19,20],[24,25],[9,200]],reasons:['Usar únicamente la tasa no defectuosa de A.','Promediar sin ponderar las tasas de no defecto.','Dar el complementario defectuoso.']},{num:[1],den:[1,3,5],event:'A|Dc',label:'procedencia A dado que no es defectuoso',wrong:[[3,5],[57,100],[2,3]],reasons:['Ignorar la condición y usar la cuota de producción.','Dar la conjunta sin dividir por no defecto.','Condicionar a defecto en vez de a no defecto.']}]},
 {index:38,kind:'probability',literals:['200 jóvenes','120 son hombres','84 contratan','24 de las mujeres'],scale:200,
  cells:[['H','I',84],['H','Ic',36],['M','I',56],['M','Ic',24]],definitions:'H: hombre; M: mujer; I: contrata por internet; Ic: no lo hace.',
  derivation:[['Obtenemos los tamaños de ambos grupos y sus complementos.', 'n(M)=200−120=80; n(H∩Ic)=120−84=36'],['Las veinticuatro mujeres sin internet se restan del total de mujeres, no del de hombres.', 'n(M∩I)=80−24=56; n(I)=84+56=140; n(Ic)=36+24=60']],
  queries:[{num:[1,3],den:'all',event:'Ic',label:'no contratar por internet',wrong:[[3,25],[9,50],[7,10]],reasons:['Contar solo mujeres sin internet.','Contar solo hombres sin internet.','Dar el suceso complementario.']},{num:[2],den:[2,3],event:'I|M',label:'internet entre mujeres',wrong:[[7,25],[3,10],[2,5]],reasons:['Usar el total de congresistas como denominador.','Dar el complemento dentro de mujeres.','Invertir la condición y dar P(M|I).']},{num:[0],den:[0,2],event:'H|I',label:'hombre entre quienes contratan por internet',wrong:[[21,50],[7,10],[2,5]],reasons:['Dar la conjunta sin condicionar.','Invertir y calcular P(I|H).','Dar el complementario mujer entre usuarios de internet.']}]},
];
export const sumCells=(c,ids)=>ids==='all'?c.scale:ids.reduce((s,i)=>s+c.cells[i][2],0);
function numericPart(c,q,p){
 const n=sumCells(c,q.num),d=q.count?1:sumCells(c,q.den),answer=ratio(n,d)+(q.count?' alumnos':'');
 const bad=q.wrong.map(([a,b])=>ratio(a,b)+(q.count?' alumnos':''));
 for(const[a,b]of q.wrong)assert.notEqual(n*b,a*d,'Distractor equals the correct probability');
 const base=c.cells.map(([a,b,w])=>`${a}∩${b}: ${ratio(w,c.scale)}`).join('; ');
 const evidence={weights:c.cells,scale:c.scale,numeratorIndexes:q.num,denominatorIndexes:q.den,numerator:n,denominator:d,value:n/d,wrong:q.wrong,count:Boolean(q.count)};
 return part(p,answer,bad,q.reasons,[
  [c.definitions,q.count?'Buscamos un número de alumnos.':`Buscamos P(${q.event}).`],
  ...c.derivation,
  ['Las siguientes celdas son probabilidades exactas. Los pesos enteros son solo una forma de comprobarlas; no añaden observaciones al enunciado.',base],
  [q.count?'La celda del complemento de ambas preocupaciones da directamente el recuento pedido.':q.den==='all'?'Sumamos las celdas disjuntas del suceso solicitado.':'Restringimos el universo a la condición. El numerador contiene únicamente los casos favorables dentro de ella.',q.count?`n(${q.event})=${n}`:`P(${q.event}) = frac{${n}}{${d}}`],
  ['Realizamos el cociente y simplificamos la fracción, conservando su valor exacto.',answer],
  [q.count?'Comprobamos sumando todas las celdas: deben recuperar los cuatrocientos alumnos.':'Comprobamos mediante el complemento dentro del mismo universo: las dos probabilidades deben sumar uno.',q.count?`${c.cells.map(x=>x[2]).join('+')}=${c.scale}`:`${ratio(n,d)} + ${ratio(d-n,d)} = 1`],
  [q.count?`El resultado cuenta ${q.label}, no un porcentaje.`:`Esta es la probabilidad de ${q.label}; la condición no debe invertirse.`,answer],
 ],'EXACT_CONTINGENCY_ENUMERATION_AND_COMPLEMENT',evidence);
}
function specialPart(c,q,p){
 if(q.special==='minimum-rate')return part(p,'C: 0,5%; A: 1,3%; B: 1%.',[
  'A: 0,5%; B: 1%; C: 1,3%.','B: 0,5%; A: 1,3%; C: 1%.','C: 0,15%; A: 0,65%; B: 0,2%.'
 ],['Intercambiar las tasas de A y C.','Intercambiar las tasas de B y C.','Dividir por toda la cartera en vez de por los coches de cada marca.'],[
  ['Comparamos proporciones de accidentes dentro de cada marca, no el número bruto de accidentes.', 'P(X|marca)=frac{accidentes de la marca}{coches de la marca}'],
  ['Calculamos la tasa de A con su propio denominador.', 'P(X|A)=frac{650}{50000}=0,013=1,3%'],
  ['Repetimos con B.', 'P(X|B)=frac{200}{20000}=0,01=1%'],
  ['Repetimos con C.', 'P(X|C)=frac{150}{30000}=0,005=0,5%'],
  ['Ordenamos las tres probabilidades; el mínimo es estricto.', '0,005 < 0,010 < 0,013'],
  ['Contrastamos por productos cruzados, evitando depender del redondeo.', '150·20000 < 200·30000; 200·50000 < 650·20000'],
  ['C tiene la menor proporción observada en este seguimiento; no se afirma una propiedad causal universal.', 'C: 0,5%; A: 1,3%; B: 1%.'],
 ],'EXACT_RATE_COMPARISON',{rates:[650/50000,200/20000,150/30000],minimum:'C'});
 assert.equal(q.special,'independence');
 return part(p,'No: P(W∩M)=frac{3}{16}; P(W)P(M)=frac{5}{32}.',[
  'Sí: P(W∩M)=frac{3}{16}; P(W)P(M)=frac{3}{16}.',
  'No: P(W∩M)=frac{7}{16}; P(W)P(M)=frac{5}{32}.',
  'Sí: P(W∩M)=frac{1}{4}; P(W)P(M)=frac{1}{4}.'
 ],['Sustituir el producto de marginales por la intersección.','Usar negras marcadas en lugar de blancas marcadas.','Confundir la intersección y el producto con el marginal blanco.'],[
  [c.definitions,'Independencia ⇔ P(W∩M)=P(W)P(M)'],
  ['Las blancas marcadas son una de las cuatro celdas oficiales.', 'P(W∩M)=frac{75}{400}=frac{3}{16}'],
  ['Sumamos todas las blancas, estén o no marcadas.', 'P(W)=frac{25+75}{400}=frac{1}{4}'],
  ['Sumamos todas las marcadas, sean blancas o negras.', 'P(M)=frac{75+175}{400}=frac{5}{8}'],
  ['Multiplicamos ambos marginales y comparamos valores exactos.', 'P(W)P(M)=frac{1}{4}·frac{5}{8}=frac{5}{32} ≠ frac{6}{32}=P(W∩M)'],
  ['Una segunda comprobación compara la condicionada con el marginal.', 'P(W|M)=frac{75}{250}=frac{3}{10} ≠ frac{1}{4}=P(W)'],
  ['Marcar una bola aporta información sobre su color en esta urna; los sucesos no son independientes.', 'P(W∩M) ≠ P(W)P(M)'],
 ],'INDEPENDENCE_PRODUCT_AND_CONDITIONAL_CHECK',{joint:3/16,product:5/32,conditional:3/10,marginal:1/4,independent:false});
}
export function buildProbabilityParts(c,text){assert.equal(c.cells.reduce((n,x)=>n+x[2],0),c.scale);const ps=officialParts(text);assert.equal(ps.length,c.queries.length);return ps.map((p,i)=>c.queries[i].special?specialPart(c,c.queries[i],p):numericPart(c,c.queries[i],p));}
export function buildProbabilityBatch(id='batch-0259',selected=cases){const r=buildBatch(selected,id,buildProbabilityParts,(_c,r)=>({parts:r.parts.map(p=>({partId:p.partId,...p.verification}))}));for(const x of r.batch.records){x.primaryTopic='Probabilidad';x.secondaryTopics=['Operaciones con sucesos','Probabilidad condicionada'];x.block='Probabilidad o estadística';x.qualityGates.pedagogical='EXPLICIT_EVENTS_CONTINGENCY_AND_CONDITIONAL_DENOMINATORS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildProbabilityBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0259-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0259.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));}

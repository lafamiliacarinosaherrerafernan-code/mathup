import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part} from './resolve-andalucia-inference-multipart.mjs';
import {fraction as f} from './resolve-andalucia-probability-2012.mjs';
import {orderedOfficialParts,eventProbabilityPart} from './resolve-andalucia-probability-event-models.mjs';
import {projectEventText} from './andalucia-reclassified-event-pdf-evidence.mjs';
const q=(n,d,event,label,wrong,reasons)=>({n,d,event,label,wrong,reasons});
const model=(scale,weights,row,column)=>({scale,cells:[[row,column,weights[0]],[row,column+'c',weights[1]],[row+'c',column,weights[2]],[row+'c',column+'c',weights[3]]],row,column});
export const cases=[
 {index:280,literals:['P (A) = 0.5','P (A ∪ B) = 0.75','P (A − B) = 0.3'],...model(20,[4,6,5,5],'A','B'),
 definitions:'A y B son los sucesos del enunciado; A−B significa A∩Bc.',
 derivation:[['La diferencia es la parte exclusiva de A, no su complemento. Restamos esta parte al marginal.','P(A∩B)=0,50−0,30=0,20'],['Despejamos el marginal de B mediante inclusión-exclusión.','P(B)=0,75−0,50+0,20=0,45'],['Completamos solo B y ninguno.','P(Ac∩B)=0,25; P(Ac∩Bc)=1−0,75=0,25']],
 queries:[q([0],'all','A∩B','que ocurran ambos',[[3,10],[1,4],[9,40]],['Dar la diferencia.','Restar marginal a unión.','Suponer independencia.']),q([1],[1,3],'A|Bc','A dado que no ocurre B',[[3,10],[2,3],[1,2]],['Dar conjunta sin normalizar.','Dividir por B en vez de Bc.','Conservar marginal sin condicionar.']),{properties:true}]},
 {index:627,literals:['7%','36%','28%','solo tenga uno'],...model(100,[27,48,18,7],'C','M'),
 definitions:'C: tener coche; M: tener moto; c: complementario. Las tasas 36% y 28% son condicionadas.',
 derivation:[['La probabilidad de ninguno es 0,07 y la de no moto condicionada a no coche es 0,28. Despejamos el marginal.','P(Cc)=frac{0,07}{0,28}=0,25; P(C)=0,75'],['La rama de coche usa la tasa del 36%.','P(C∩M)=0,75·0,36=0,27; P(C∩Mc)=0,75−0,27=0,48'],['En la rama sin coche descontamos quienes tampoco tienen moto.','P(Cc∩M)=0,25−0,07=0,18']],
 queries:[q([1,2],'all','(C∩Mc)∪(Cc∩M)','exactamente un vehículo',[[93,100],[27,100],[1,2]],['Dar al menos uno.','Dar ambos.','Sumar condicionadas sin ponderarlas.']),q([0,1,2],'all','C∪M','al menos uno',[[66,100],[73,100],[3,4]],['Excluir quienes tienen ambos.','Complementar ambos.','Dar solo coche.']),q([1],[0,1],'Mc|C','no moto entre quienes tienen coche',[[48,100],[55,100],[36,100]],['Dar conjunta.','Dar marginal sin moto.','Olvidar el complemento.']),{properties:true,columnComplement:true}]},
 {index:1013,literals:['60%','50%','20%','iii)'],...model(10,[2,4,3,1],'O','T'),custom:'computer',
 definitions:'O: tener ordenador; T: tener tablet; c: complementario.',
 derivation:[['Restamos la intersección a cada marginal para obtener las regiones exclusivas.','P(O∩Tc)=0,60−0,20=0,40; P(Oc∩T)=0,50−0,20=0,30'],['Inclusión-exclusión cuenta una sola vez a los clientes con ambos dispositivos.','P(O∪T)=0,60+0,50−0,20=0,90'],['El complemento de la unión da quienes no tienen ninguno.','P(Oc∩Tc)=1−0,90=0,10']]},
 {index:1238,literals:['40%','30%','10%','¿Son compatibles?'],...model(10,[1,3,2,4],'S','M'),
 definitions:'S: gustar la salsa; M: gustar el merengue; c: complementario.',
 derivation:[['Los porcentajes dan los marginales y la intersección directamente.','P(S)=0,40; P(M)=0,30; P(S∩M)=0,10'],['Descontamos quienes disfrutan ambos estilos para obtener cada parte exclusiva.','P(S∩Mc)=0,30; P(Sc∩M)=0,20'],['La probabilidad de ninguno completa la partición.','P(Sc∩Mc)=1−(0,10+0,30+0,20)=0,40']],
 queries:[q([0],[0,1],'M|S','merengue entre quienes gustan de salsa',[[1,10],[1,3],[3,10]],['Dar conjunta.','Invertir la condición.','Suponer independencia.']),q([2],[2,3],'M|Sc','merengue entre quienes no gustan de salsa',[[1,5],[3,10],[1,2]],['Dar conjunta.','Conservar marginal.','Dividir por S en vez de Sc.']),{properties:true,compatibleWording:true}]},
 {index:1603,literals:['P (B) = 0.4','P (A/B) = 0.25','P (A − B) = 0.4'],...model(10,[1,4,3,2],'A','B'),custom:'joint-marginal-union',
 definitions:'A y B: sucesos oficiales; A−B=A∩Bc; P(A/B) significa P(A|B).',
 derivation:[['La regla del producto recupera la intersección desde la condicionada y el marginal de B.','P(A∩B)=P(A|B)P(B)=0,25·0,40=0,10'],['Las dos partes disjuntas de A son ambos y solo A.','P(A)=0,10+0,40=0,50'],['Completamos solo B y el exterior a la unión.','P(Ac∩B)=0,40−0,10=0,30; P(Ac∩Bc)=0,20']]},
 {index:952,literals:['P (A) = 0 y P (B) = 0','P (A/B) = 0.2'],...model(10,[1,2,4,3],'A','B'),custom:'nonzero-theorem',
 definitions:'En b), P(A)=0,30, P(B)=0,50 y P(A|B)=0,20. En a), el PDF exige probabilidades NO nulas.',
 derivation:[['En b), multiplicamos por la probabilidad del suceso condicionante.','P(A∩B)=0,20·0,50=0,10'],['Las partes exclusivas se obtienen restando la intersección a los marginales.','P(A∩Bc)=0,20; P(Ac∩B)=0,40'],['Completamos la región de ninguno y contrastamos que todas son no negativas.','P(Ac∩Bc)=1−(0,10+0,20+0,40)=0,30']]},
 {index:542,literals:['productos de cosmética','son hombres que no utilizan','¿Son independientes?'],...model(10000,[4686,1914,1614,1786],'M','N'),
 definitions:'M: mujer; H=Mc: hombre en las dos categorías de la encuesta; N: usar cosmética natural.',
 derivation:[['El PDF establece P(M)=0,66, P(N|M)=0,71 y P(H∩Nc)=0,1786. La primera conjunta se calcula por producto.','P(M∩N)=0,66·0,71=0,4686'],['Completamos la rama de mujeres.','P(M∩Nc)=0,66−0,4686=0,1914'],['El marginal de hombres es el complemento de mujeres; restamos la conjunta sin cosmética natural.','P(H)=0,34; P(H∩N)=0,34−0,1786=0,1614']],
 queries:[q([0,1,2],'all','M∪N','mujer o cosmética natural',[[353,1000],[117,250],[33,50]],['Excluir a quienes cumplen ambas condiciones.','Suponer independencia al calcular el complemento.','Dar únicamente mujeres.']),q([2],'all','H∩N','hombre y cosmética natural',[[17,50],[1786,10000],[2414,10000]],['Dar marginal de hombres.','Dar hombres sin natural.','Aplicar a hombres la tasa condicionada de mujeres.']),q([3],[1,3],'H|Nc','hombre entre quienes no usan cosmética natural',[[1786,10000],[17,50],[893,1700]],['Dar conjunta.','Conservar marginal.','Invertir la condición.']),{properties:true}]},
 {index:1074,literals:['microempresas','ni tiene página web','¿Son incompatibles?'],...model(1000,[96,224,34,646],'W','V'),
 definitions:'W: tener página web; V: vender por comercio electrónico; c: complementario.',
 derivation:[['El PDF da P(W)=0,32, P(Wc∩Vc)=0,646 y P(V|W)=0,30. Aplicamos el producto a la rama con web.','P(W∩V)=0,32·0,30=0,096'],['Completamos la parte con web pero sin ventas electrónicas.','P(W∩Vc)=0,32−0,096=0,224'],['El marginal sin web es 0,68; descontamos quienes tampoco venden electrónicamente.','P(Wc∩V)=0,68−0,646=0,034']],
 queries:[q([0,1,2],'all','W∪V','web o ventas electrónicas',[[129,500],[12,125],[113,250]],['Dar exactamente uno.','Dar ambos.','Sumar marginales sin descontar intersección.']),q([0,2],'all','V','ventas electrónicas',[[3,10],[12,125],[17,500]],['Dar tasa condicionada a web.','Dar solo ventas con web.','Dar solo ventas sin web.']),q([2],'all','Wc∩V','sin web y con ventas electrónicas',[[221,2500],[17,25],[12,125]],['Suponer independencia.','Dar marginal sin web.','Dar ventas con web.']),{properties:true}]},
].sort((a,b)=>a.index-b.index);
export function propertyPart(c,p,{columnComplement=false,compatibleWording=false}={}){
 const N=c.scale,R=c.cells[0][2]+c.cells[1][2],C=columnComplement?c.cells[1][2]+c.cells[3][2]:c.cells[0][2]+c.cells[2][2],J=c.cells[columnComplement?1:0][2],row=c.row,col=c.column+(columnComplement?'c':'');
 assert.ok(J>0,'This proof of compatibility uses a positive intersection');
 const independent=J*N===R*C,compatible=true;
 const claims=[[independent,compatible],[!independent,compatible],[independent,!compatible],[!independent,!compatible]];
 const display=([i,k])=>`Independientes: ${i?'sí':'no'}; ${compatibleWording?'compatibles':'incompatibles'}: ${(compatibleWording?k:!k)?'sí':'no'}.`;
 return part(p,display(claims[0]),claims.slice(1).map(display),['Confundir compatibilidad con independencia.','Confundir intersección positiva con incompatibilidad.','Invertir ambas propiedades.'],[
  [c.definitions,'Compatibilidad pregunta si pueden ocurrir ambos; independencia compara probabilidades.'],...c.derivation,
  ['Calculamos los marginales de los sucesos concretos que se preguntan.',`P(${row})=${f(R,N)}; P(${col})=${f(C,N)}`],
  ['Comparamos la conjunta con el producto sin redondear.',`P(${row}∩${col})=${f(J,N)}; P(${row})P(${col})=${f(R*C,N*N)}`],
  ['La comprobación por productos cruzados evita que una aproximación confunda los resultados.',`${J}·${N}=${J*N}; ${R}·${C}=${R*C}`],
  ['Una intersección de probabilidad estrictamente positiva no puede ser vacía: los sucesos son compatibles.',`P(${row}∩${col})=${f(J,N)}>0`],
  [independent?'El producto coincide con la conjunta: además son independientes.':'La conjunta no coincide con el producto: no son independientes.',display(claims[0])]
 ],'EXACT_MARGINAL_PRODUCT_AND_POSITIVE_INTERSECTION',{N,R,C,J,claims,independent,compatible});
}
function tuple(p,labels,values,bad,reasons,steps,c){
 const text=v=>v.map(([n,d],i)=>`${labels[i]}=${f(n,d)}`).join('; ')+'.';
 const all=[values,...bad];assert.equal(new Set(all.map(text)).size,4);
 for(let i=0;i<all.length;i++)for(let j=0;j<i;j++)assert.ok(all[i].some(([n,d],k)=>n*all[j][k][1]!==d*all[j][k][0]));
 return part(p,text(values),bad.map(text),reasons,[...steps,['Conservamos por separado cada resultado en el orden de las preguntas, sin sustituir una condicionada por su conjunta.',text(values)]],'EXACT_REGION_SUMS_AND_TUPLE_CROSS_PRODUCTS',{values,bad,cells:c.cells,scale:c.scale});
}
export function solve(c,literal){const text=projectEventText(c.index,literal),ps=orderedOfficialParts(text);
 if(c.queries){assert.equal(ps.length,c.queries.length);return ps.map((p,i)=>c.queries[i].properties?propertyPart(c,p,c.queries[i]):eventProbabilityPart(c,c.queries[i],p));}
 if(c.custom==='computer')return[tuple(ps[0],['i) P(O∪T)','ii) P(Tc|Oc)','iii) P(O∩Tc)'],[[9,10],[1,4],[2,5]],[[[7,10],[1,4],[2,5]],[[9,10],[1,10],[2,5]],[[9,10],[1,4],[3,10]]],['Excluir quienes tienen ambos.','No dividir la conjunta por no ordenador.','Intercambiar solo ordenador y solo tablet.'],[
  [c.definitions,'Las tres preguntas i), ii), iii) pertenecen al mismo apartado a).'],...c.derivation,
  ['La primera pregunta pide una unión, incluyendo quienes tienen ambos.','P(O∪T)=0,90'],
  ['La segunda cambia el universo a quienes no tienen ordenador.','P(Oc)=0,40; P(Tc|Oc)=frac{0,10}{0,40}=frac{1}{4}'],
  ['La tercera es una conjunta no condicionada.','P(O∩Tc)=0,40'],
  ['Comprobamos unión por complemento y condicionada mediante producto.','0,90+0,10=1; 0,25·0,40=0,10'],
 ],c),propertyPart(c,ps[1])];
 if(c.custom==='joint-marginal-union')return[eventProbabilityPart(c,q([0],'all','A∩B','ambos',[[1,4],[2,5],[1,5]],['Dar condicionada.','Dar diferencia.','Suponer independencia.']),ps[0]),tuple(ps[1],['P(A)','P(A∪B)'],[[1,2],[4,5]],[[[2,5],[7,10]],[[1,2],[9,10]],[[1,2],[7,10]]],['Omitir la intersección al construir A y la unión.','Sumar marginales sin descontar intersección.','Dar exactamente uno en vez de la unión.'],[
  [c.definitions,'Se piden el marginal de A y la unión, no la misma probabilidad dos veces.'],...c.derivation,
  ['Aplicamos inclusión-exclusión usando el marginal ya calculado.','P(A∪B)=0,50+0,40−0,10=0,80'],
  ['Contrastamos la unión mediante la región de ninguno.','1−P(Ac∩Bc)=1−0,20=0,80'],
  ['Contrastamos A sumando sus dos regiones disjuntas.','P(A∩B)+P(A∩Bc)=0,10+0,40=0,50'],
 ],c),propertyPart(c,ps[2])];
 assert.equal(c.custom,'nonzero-theorem');assert.ok(ps[0].prompt.includes('≠ 0'));
 const claims=['No: independencia exige P(A∩B)>0; incompatibilidad exige P(A∩B)=0.','Sí: independencia e incompatibilidad exigen P(A∩B)=0.','Sí: basta que P(A∩B)=P(A)+P(B).','No: independencia exige P(A∩B)=1.'];
 const a=part(ps[0],claims[0],claims.slice(1),['Confundir independencia con incompatibilidad.','Sustituir producto por suma.','Sustituir producto de marginales por uno.'],[
  ['El PDF dice P(A)≠0 y P(B)≠0: ambos marginales son positivos, ya que las probabilidades no pueden ser negativas.','P(A)>0; P(B)>0'],
  ['Por definición, la independencia obliga a multiplicar los marginales.','P(A∩B)=P(A)P(B)'],
  ['Un producto de dos números positivos es positivo.','P(A)P(B)>0'],
  ['La incompatibilidad exige que la intersección sea vacía.','A∩B=∅ ⇒ P(A∩B)=0'],
  ['Las dos exigencias se contradicen; no pueden cumplirse simultáneamente.','P(A∩B)>0 y P(A∩B)=0 son incompatibles'],
  ['La condición de no nulidad es esencial: no puede eliminarse ni sustituirse por igualdad a cero.',claims[0]],
 ],'POSITIVE_PRODUCT_CONTRADICTS_EMPTY_INTERSECTION',{nonzeroMarginals:true,claims,officialNotEqualSigns:2});
 return[a,tuple(ps[1],['P(A∩B)','P(A∪B)','P(Ac∪Bc)','P(A−B)'],[[1,10],[7,10],[9,10],[1,5]],[[[3,20],[13,20],[17,20],[3,20]],[[1,10],[4,5],[9,10],[1,5]],[[1,10],[7,10],[3,10],[1,5]]],['Suponer independencia no dada.','No descontar la intersección en la unión.','Cambiar unión de complementos por intersección de complementos.'],[
  [c.definitions,'Los datos numéricos de b) se usan solo en este apartado.'],...c.derivation,
  ['La unión cuenta una sola vez la región compartida.','P(A∪B)=0,30+0,50−0,10=0,70'],
  ['De Morgan transforma unión de complementos en complemento de la intersección.','P(Ac∪Bc)=1−P(A∩B)=0,90'],
  ['La diferencia conserva solo la parte de A fuera de B.','P(A−B)=P(A)−P(A∩B)=0,20'],
  ['La partición verifica simultáneamente marginales y unión.','0,10+0,20=0,30; 0,10+0,40=0,50; 0,10+0,20+0,40=0,70'],
 ],c)];
}
export function buildReclassifiedEventBatch(id='batch-0365',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Probabilidad';x.secondaryTopics=['Operaciones con sucesos','Probabilidad condicionada','Independencia'];x.block='Probabilidad o estadística';x.examSlot=4;x.qualityGates.pedagogical='OFFICIAL_EVENT_DEFINITIONS_EXACT_REGION_CHECKS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildReclassifiedEventBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0365-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0365.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));}

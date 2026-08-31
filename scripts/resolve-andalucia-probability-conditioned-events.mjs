// Official finite probability exercises. All numbers below are derived from
// the source statements; missing historical answers are not exclusion reasons.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part} from './resolve-andalucia-inference-multipart.mjs';
import {fraction as f} from './resolve-andalucia-probability-2012.mjs';
import {orderedOfficialParts,buildEventParts} from './resolve-andalucia-probability-event-models.mjs';
export const cases=[
 {index:74,kind:'probability',literals:['30 %','45 %','1 %','3 %','2 %','cobro correcto'],scale:2000,
  cells:[['C1','E',6],['C1','Ec',594],['C2','E',27],['C2','Ec',873],['C3','E',10],['C3','Ec',490]],definitions:'C1, C2 y C3: caja de la primera, segunda o tercera persona; E: cobro erróneo; Ec: cobro correcto.',
  derivation:[['Las tres personas atienden todos los cobros; calculamos la proporción de la tercera.','P(C3)=1−0,30−0,45=0,25'],['Multiplicamos el peso de cada persona por su tasa de error.','P(C1∩E)=0,003; P(C2∩E)=0,0135; P(C3∩E)=0,005'],['Las probabilidades de cobro correcto se calculan dentro de cada rama.','P(C1∩Ec)=0,297; P(C2∩Ec)=0,4365; P(C3∩Ec)=0,245']],
  queries:[{n:[0,2,4],d:'all',event:'E',label:'cobro erróneo',wrong:[[1,50],[3,50],[27,2000]],reasons:['Promediar las tasas sin ponderar la carga de cada persona.','Sumar las tasas condicionadas.','Usar solo los errores de la segunda persona.']},{n:[3],d:[1,3,5],event:'C2|Ec',label:'segunda persona entre los cobros correctos',wrong:[[873,2000],[9,20],[97,100]],reasons:['Dar solo la conjunta sin restringir el universo.','Mantener la probabilidad previa de la segunda persona.','Invertir la condición.']}]},
 {index:109,kind:'probability',literals:['cuatro ases y dos reyes','vuelve a mezclar','no devolviera'],custom:'cards'},
 {index:121,kind:'probability',literals:['dos dados','múltiplo de 4','0.8','0.7','0.5','incompatibles'],custom:'dice-and-incompatibility'},
 {index:128,kind:'probability',literals:['25%','10%','8%','porcentaje'],scale:100,
  cells:[['D','A',8],['D','Ac',17],['Dc','A',2],['Dc','Ac',73]],definitions:'D: consulta del dentista; A: analítica; c: complementario.',
  derivation:[['La parte común ya está dada, sin suponer independencia.','P(D∩A)=0,08'],['Restamos la parte común de cada marginal.','P(D∩Ac)=0,25−0,08=0,17; P(Dc∩A)=0,10−0,08=0,02'],['El resto corresponde a ninguna de las dos actuaciones.','P(Dc∩Ac)=1−0,08−0,17−0,02=0,73']],
  queries:[{independence:true,row:'D',column:'A'},{n:[3],d:'all',percent:true,event:'Dc∩Ac',label:'no hacer ninguna de las dos actuaciones',wrong:[[65,1],[135,2],[27,1]],reasons:['Sumar marginales sin descontar su parte común.','Multiplicar complementos sin independencia.','Dar el porcentaje de la unión.']},{n:[2],d:[2,3],event:'A|Dc',label:'analítica entre quienes no van al dentista',wrong:[[1,50],[2,15],[2,25]],reasons:['Dar solo la conjunta.','No quitar del numerador quienes sí van al dentista.','Condicionar sobre quienes sí van al dentista.']}]},
 {index:163,kind:'probability',literals:['P (Ac) = 0.4','P (A ∩ Bc) = 0.12','P (Bc) = 0.2'],custom:'complements'},
 {index:178,kind:'probability',literals:['teórico es 0.8','práctico es 0.6','ambos es 0.5'],scale:10,
  cells:[['T','P',5],['T','Pc',3],['Tc','P',1],['Tc','Pc',1]],definitions:'T: aprobar teoría; P: aprobar práctica; c: no aprobar la prueba correspondiente.',
  derivation:[['Las personas que aprueban ambas están incluidas en los dos marginales.','P(T∩P)=0,5'],['Calculamos las regiones exclusivas sin suponer independencia.','P(T∩Pc)=0,8−0,5=0,3; P(Tc∩P)=0,6−0,5=0,1'],['La probabilidad de no aprobar ninguna es el resto del universo.','P(Tc∩Pc)=1−0,5−0,3−0,1=0,1']],
  queries:[{n:[0,1,2],d:'all',event:'T∪P',label:'aprobar al menos una prueba',wrong:[[2,5],[4,5],[23,25]],reasons:['Interpretar al menos una como exactamente una.','Dar solo el marginal de teoría.','Suponer independencia para calcular el complemento.']},{n:[2],d:[2,3],event:'P|Tc',label:'aprobar práctica dado que se suspende teoría',wrong:[[1,10],[3,5],[5,6]],reasons:['Dar solo la conjunta.','Usar el marginal de práctica.','Calcular teoría dada práctica.']},{independence:true,row:'T',column:'P'}]},
 {index:405,kind:'probability',literals:['P (A ∩ B) = 0.2','P (A ∪ B) = 0.4','P (A/B) = 0.8'],custom:'conditional-marginals'},
 {index:411,kind:'probability',literals:['𝑃(𝐴 ∪ 𝐵) = 3','𝑃(𝐴𝐶) = 5','𝑃(𝐵𝐶) = 2','incompatibles'],custom:'official-fractions'},
];
function tuple(p,labels,values,bad,reasons,steps){
 const text=vs=>vs.map(([n,d],i)=>`${labels[i]} = ${f(n,d)}`).join('; ')+'.';
 return part(p,text(values),bad.map(text),reasons,[...steps,['Conservamos la correspondencia entre cada pregunta y su resultado.',text(values)]],'INDEPENDENT_EXACT_EVENT_TUPLE',{values,bad});
}
function scalar(p,value,bad,reasons,steps,proof){
 return part(p,f(...value),bad.map(x=>f(...x)),reasons,[...steps,['Simplificamos el resultado exacto; no es necesario aproximar.',f(...value)]],'INDEPENDENT_EXACT_EVENT_SCALAR',{value,bad,...proof});
}
export function buildConditionedParts(c,text){
 if(c.queries)return buildEventParts(c,text);
 const ps=orderedOfficialParts(text);
 if(c.custom==='cards')return ps.map((p,i)=>scalar(p,i?[3,5]:[2,3],i?[[2,3],[2,5],[1,2]]:[[3,5],[4,9],[1,3]],i?['Suponer reposición cuando no la hay.','Dar la conjunta de dos ases.','Confundir las dos clases de cartas con resultados equiprobables.']:['Retirar el primer as pese a la reposición.','Dar la conjunta en lugar de la condicionada.','Dar la probabilidad complementaria de rey.'],[
  ['Llamamos A1 y A2 a obtener as en la primera y segunda extracción.','Hay cuatro ases y dos reyes; cada carta física es un resultado distinto.'],
  [i?'La primera carta no se devuelve: los tamaños son seis y cinco.':'Se devuelve la primera carta y se mezcla: las dos extracciones son independientes.',i?'6·5=30 pares ordenados distintos.':'6·6=36 pares ordenados con repetición.'],
  ['Aplicamos la definición de probabilidad condicionada.','P(A1|A2)=frac{P(A1∩A2)}{P(A2)}'],
  ['Calculamos la probabilidad de dos ases.',i?'P(A1∩A2)=frac{4}{6}·frac{3}{5}=frac{2}{5}':'P(A1∩A2)=frac{4}{6}·frac{4}{6}=frac{4}{9}'],
  ['El marginal de la segunda extracción es dos tercios; puede comprobarse sumando primera as y primera rey.',i?'P(A2)=frac{4}{6}·frac{3}{5}+frac{2}{6}·frac{4}{5}=frac{2}{3}':'P(A2)=frac{4}{6}'],
  ['Dividimos y contrastamos enumerando pares cuya segunda carta es as.',i?'P(A1|A2)=frac{2/5}{2/3}=frac{3}{5}; 12 de 20 pares condicionados.':'P(A1|A2)=frac{4/9}{2/3}=frac{2}{3}; 16 de 24 pares condicionados.']
 ],{replacement:!i}));
 if(c.custom==='dice-and-incompatibility')return [scalar(ps[0],[1,4],[[3,11],[1,12],[5,36]],['Suponer equiprobables las once sumas posibles.','Contar solo una combinación por suma sin multiplicidades.','Dar solo los casos de suma ocho.'],[
  ['En el modelo usual de dos dados equilibrados, las treinta y seis parejas ordenadas son equiprobables.','Ω={(i,j): 1≤i≤6, 1≤j≤6}'],
  ['Las sumas posibles que son múltiplos de cuatro son cuatro, ocho y doce.','S={4,8,12}'],
  ['Enumeramos las parejas de suma cuatro.','(1,3), (2,2), (3,1): tres casos.'],
  ['Enumeramos las parejas de suma ocho y doce.','(2,6), (3,5), (4,4), (5,3), (6,2); (6,6): seis casos.'],
  ['Las sumas distintas son sucesos disjuntos; sumamos sus cardinalidades.','P=frac{3+5+1}{36}=frac{9}{36}=frac{1}{4}'],
  ['Comprobamos enumerando todos los pares y su complemento.','9 favorables + 27 desfavorables = 36']
 ],{enumeration:'two-dice-sum-modulo-four'}),part(ps[1],'Sí: P(A∩B) = 0.',['No: P(A∩B) = 0.','Sí: P(A∩B) = 0,06.','No: P(A∩B) = 0,20.'],['Invertir la definición de incompatibilidad.','Suponer independencia y mantener una conclusión incompatible con una parte común positiva.','Dar P(A) como parte común.'],[
  ['Los superíndices C del PDF oficial denotan los complementarios.','P(Aᶜ)=0,8; P(Bᶜ)=0,7; P(A∪B)=0,5'],
  ['Recuperamos los marginales por complemento.','P(A)=1−0,8=0,2; P(B)=1−0,7=0,3'],
  ['Usamos inclusión-exclusión, sin presuponer independencia.','P(A∩B)=P(A)+P(B)−P(A∪B)'],
  ['Sustituimos y calculamos la parte común.','P(A∩B)=0,2+0,3−0,5=0'],
  ['En el sentido probabilístico pedido, la parte común nula demuestra incompatibilidad.','P(A∪B)=P(A)+P(B)=0,5'],
  ['No confundimos incompatibilidad con independencia: el producto de marginales no es cero.','P(A)P(B)=0,06 ≠ 0']
 ],'ZERO_JOINT_AND_INCOMPATIBILITY',{joint:0,claims:[{yes:true,joint:0},{yes:false,joint:0},{yes:true,joint:.06},{yes:false,joint:.2}]})];
 if(c.custom==='complements')return [tuple(ps[0],['P(A)','P(A∩B)'],[[3,5],[12,25]],[[[2,5],[7,25]],[[3,5],[3,25]],[[3,5],[18,25]]],['No complementar P(Aᶜ).','Confundir la parte exclusiva con la común.','Sumar la parte exclusiva en vez de restarla.'],[
  ['A se divide en dos regiones disjuntas según ocurra B o no.','A=(A∩B)∪(A∩Bᶜ)'],
  ['Calculamos el marginal a partir del complementario dado.','P(A)=1−0,4=0,6'],
  ['Aplicamos la suma de regiones disjuntas.','P(A)=P(A∩B)+P(A∩Bᶜ)'],
  ['Despejamos la región común.','P(A∩B)=0,6−0,12=0,48'],
  ['La suma de ambas regiones recupera el marginal original.','0,48+0,12=0,60'],
  ['Comprobamos también el complemento del marginal.','0,60+0,40=1']
 ]),scalar(ps[1],[4,5],[[12,25],[18,25],[1,5]],['Dar la conjunta como marginal.','Sumar la parte exclusiva.','Obtener el complementario de B.'],[
  ['Usamos el marginal y la parte común obtenidos sin independencia.','P(A)=0,6; P(A∩B)=0,48'],
  ['Ahora imponemos la independencia solicitada.','P(A∩B)=P(A)P(B)'],
  ['El marginal de A no es cero, por lo que podemos dividir.','0,48=0,6·P(B)'],
  ['Despejamos el marginal requerido.','P(B)=frac{0,48}{0,6}=0,8'],
  ['Verificamos la condición mediante el producto.','0,6·0,8=0,48'],
  ['Las regiones restantes son compatibles con probabilidades no negativas.','P(Aᶜ∩B)=0,32; P(Aᶜ∩Bᶜ)=0,08']
 ],{joint:[12,25],marginal:[3,5]}),tuple(ps[2],['P(A∪B)','P(Aᶜ∪Bᶜ)','P(A|Bᶜ)'],[[23,25],[13,25],[3,5]],[[[23,25],[2,25],[3,5]],[[[23,25],[13,25],[3,25]]].flat(),[[23,25],[13,25],[1,5]]],['Usar la conjunción de complementos en vez de su unión.','Dar la conjunta sin dividir por la condición.','Dar el marginal de Bᶜ.'],[
  ['El apartado da P(Bᶜ), de donde obtenemos B.','P(B)=1−0,2=0,8'],
  ['La unión se calcula con la parte común ya obtenida.','P(A∪B)=0,6+0,8−0,48=0,92'],
  ['La unión de complementos es el complemento de la parte común.','P(Aᶜ∪Bᶜ)=1−P(A∩B)=1−0,48=0,52'],
  ['La barra del enunciado denota condicionamiento a Bᶜ.','P(A|Bᶜ)=frac{P(A∩Bᶜ)}{P(Bᶜ)}=frac{0,12}{0,2}=0,6'],
  ['Verificamos por las cuatro regiones disjuntas.','0,48+0,12+0,32+0,08=1'],
  ['Comprobamos complemento de la unión y regla del producto condicionado.','0,92+0,08=1; 0,6·0,2=0,12']
 ])];
 if(c.custom==='conditional-marginals'){
  const model={scale:20,cells:[['A','B',4],['A','Bc',3],['Ac','B',1],['Ac','Bc',12]],definitions:'A y B son los dos sucesos oficiales; c: complementario.',derivation:[['La probabilidad condicionada permite despejar el marginal de B.','P(B)=frac{P(A∩B)}{P(A|B)}=frac{0,2}{0,8}=0,25'],['La unión permite despejar A.','P(A)=0,4−0,25+0,2=0,35']],queries:[{n:[0],d:'all',event:'A∩B',label:'parte común',wrong:[[1,4],[1,2],[1,10]],reasons:['Marginal.','Condición invertida.','Complemento incorrecto.']},{independence:true,row:'A',column:'B'},{n:[1,2,3],d:'all',event:'Ac∪Bc',label:'que no ocurran ambos',wrong:[[3,5],[13,20],[3,4]],reasons:['Complementar la unión en vez de la parte común.','Complementar solo A.','Complementar solo B.']}]};
  const parts=buildEventParts(model,text);parts[0]=tuple(ps[0],['P(B)','P(A)'],[[1,4],[7,20]],[[[4,25],[9,25]],[[1,4],[3,20]],[[7,20],[1,4]]],['Multiplicar la conjunta por la condicionada.','Olvidar volver a sumar la parte común.','Intercambiar los marginales.'],[
   ['La barra oficial significa A condicionado a B.','P(A|B)=frac{P(A∩B)}{P(B)}'],...model.derivation,
   ['Verificamos la condicionada original.','frac{0,2}{0,25}=0,8'],
   ['Verificamos la unión original.','0,35+0,25−0,2=0,4'],
   ['Las cuatro regiones son probabilidades no negativas que suman uno.','0,20+0,15+0,05+0,60=1']
  ]);return parts;
 }
 assert.equal(c.custom,'official-fractions');
 const model={scale:21,cells:[['A','B',4],['A','Bc',2],['Ac','B',3],['Ac','Bc',12]],definitions:'A y B son los sucesos oficiales; C en el PDF indica complementario.',derivation:[['Leemos las tres fracciones completas en el PDF oficial, no sus numeradores aislados.','P(A∪B)=frac{3}{7}; P(Aᶜ)=frac{5}{7}; P(Bᶜ)=frac{2}{3}'],['Recuperamos los marginales.','P(A)=frac{2}{7}; P(B)=frac{1}{3}'],['Inclusión-exclusión determina la parte común.','P(A∩B)=frac{2}{7}+frac{1}{3}−frac{3}{7}=frac{4}{21}']],queries:[{independence:true,row:'A',column:'B'},{n:[3],d:'all',event:'Aᶜ∩Bᶜ',label:'que no ocurra ninguno',wrong:[[10,21],[17,21],[3,7]],reasons:['Multiplicar complementos suponiendo independencia.','Complementar la parte común en vez de la unión.','Dar la unión sin complementar.']},{n:[2],d:[2,3],event:'B|Aᶜ',label:'B dado que no ocurrió A',wrong:[[1,7],[7,15],[4,7]],reasons:['Dar solo la conjunta.','No descontar de B su parte dentro de A.','Invertir la condición y calcular A dado B.']}]};
 const result=buildEventParts(model,text);
 result[0]=part(ps[0],'Independientes: no. Incompatibles: no.',['Independientes: sí. Incompatibles: no.','Independientes: no. Incompatibles: sí.','Independientes: sí. Incompatibles: sí.'],['Confundir la parte común con el producto.','Confundir no independencia con incompatibilidad.','Afirmar simultáneamente ambas condiciones sin comprobarlas.'],[
  [model.definitions,'Son dos preguntas distintas y hay que comprobar las dos.'],...model.derivation,
  ['La independencia exigiría igualdad con el producto de marginales.','P(A)P(B)=frac{2}{7}·frac{1}{3}=frac{2}{21} ≠ frac{4}{21}'],
  ['La incompatibilidad exigiría parte común nula.','P(A∩B)=frac{4}{21}>0'],
  ['Verificamos recuperando los marginales de la tabla de cuatro regiones.','A: frac{4+2}{21}=frac{2}{7}; B: frac{4+3}{21}=frac{1}{3}'],
  ['Concluimos por separado, sin hacer depender un criterio del otro.','No son independientes ni incompatibles.']
 ],'INDEPENDENCE_AND_INCOMPATIBILITY_SEPARATELY',{joint:[4,21],product:[2,21],claims:[[false,false],[true,false],[false,true],[true,true]]});return result;
}
export function buildConditionedBatch(id='batch-0263',selected=cases){const r=buildBatch(selected,id,buildConditionedParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Probabilidad';x.secondaryTopics=['Operaciones con sucesos','Independencia y probabilidad condicionada'];x.qualityGates.pedagogical='EXACT_CONDITIONING_WITH_SEPARATE_OFFICIAL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildConditionedBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0263-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0263.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}

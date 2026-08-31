// Exact finite event models, solved from the official statements. No historical
// answer or option position is used as a mathematical input.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part} from './resolve-andalucia-inference-multipart.mjs';
import {fraction} from './resolve-andalucia-probability-2012.mjs';
const f=fraction;
// Top-level letters must be consecutive. A nested roman i) inside a) is not
// an alphabetic top-level subpart and must remain in its original prompt.
export function orderedOfficialParts(text){
 const markers=[];
 for(const m of text.matchAll(/(?:^|\n)\s*([a-z])\)\s*/g))if(m[1]===String.fromCharCode(97+markers.length))markers.push(m);
 assert.ok(markers.length>=2);
 return markers.map((m,i)=>({id:m[1],prompt:text.slice(m.index+m[0].length,markers[i+1]?.index??text.length).replace(/\(\s*\d+(?:[.,]\d+)?\.?\s*puntos?\s*\)/gi,'').replace(/\n\s*OPCIÓN\s+B\s*$/,'').trim()}));
}
export const cases=[
 {index:409,kind:'probability',literals:['7 llaves','segundo 8 y el tercero 5','única llave','primer o al tercer'],scale:840,
  cells:[['L1','O',40],['L1','Oc',240],['L2','O',35],['L2','Oc',245],['L3','O',56],['L3','Oc',224]],
  definitions:'L1, L2 y L3: llavero elegido; O: la llave abre el trastero; c: complementario.',
  derivation:[['Los llaveros son equiprobables, pero sus llaves no tienen la misma probabilidad de abrir.','P(L1)=P(L2)=P(L3)=frac{1}{3}'],['En cada llavero hay exactamente una llave que abre. Multiplicamos a lo largo de cada rama.','P(L1∩O)=frac{1}{21}; P(L2∩O)=frac{1}{24}; P(L3∩O)=frac{1}{15}'],['Las ramas de fallo usan el complemento dentro de cada llavero.','P(L1∩Oc)=frac{2}{7}; P(L2∩Oc)=frac{7}{24}; P(L3∩Oc)=frac{4}{15}']],
  queries:[
   {n:[1,3,5],d:'all',event:'Oc',label:'no abrir el trastero',wrong:[[17,20],[6,7],[131,840]],reasons:['Unir todas las llaves como si fueran equiprobables.','Usar solo el primer llavero.','Dar la probabilidad de abrir en vez de fallar.']},
   {n:[4],d:'all',event:'L3∩O',label:'elegir el tercer llavero y abrir',wrong:[[1,5],[1,3],[1,20]],reasons:['Omitir la elección del llavero.','Omitir la elección de la llave.','Elegir entre todas las llaves como si fueran equiprobables.']},
   {n:[0,4],d:[0,2,4],event:'(L1∪L3)|O',label:'proceder del primero o tercero entre las llaves que abren',wrong:[[2,3],[4,35],[12,20]],reasons:['Conservar la probabilidad previa de los llaveros.','Dar la conjunta sin dividir por abrir.','Ponderar por el número total de llaves en vez de por la evidencia.']},
   {n:[3,5],d:[1,3,5],event:'L1c|Oc',label:'no proceder del primero dado que no abre',wrong:[[2,3],[469,840],[240,709]],reasons:['No actualizar la probabilidad previa.','Dar solo la conjunta.','Dar el suceso complementario dentro de las llaves que no abren.']}
  ]},
 {index:451,kind:'probability',literals:['30%','20%','5%','primera vez'],scale:200,
  cells:[['G','R',3],['G','Rc',57],['Gc','R',28],['Gc','Rc',112]],definitions:'G: aparato en garantía; R: ya fue reparado anteriormente; Rc: primera visita.',
  derivation:[['Los aparatos en garantía y fuera de garantía forman una partición.','P(G)=0,30; P(Gc)=0,70'],['La reparación anterior tiene tasas distintas en ambas ramas.','P(G∩R)=0,30·0,05=0,015; P(Gc∩R)=0,70·0,20=0,140'],['Completamos las ramas de primera visita, sin confundirlas con aparatos nunca averiados.','P(G∩Rc)=0,285; P(Gc∩Rc)=0,560']],
  queries:[{n:[0,2],d:'all',event:'R',label:'reparación anterior',wrong:[[1,8],[1,4],[1,5]],reasons:['Promediar condicionadas sin ponderar.','Sumar tasas sin ponderar.','Usar únicamente la tasa de fuera de garantía.']},{n:[1],d:[1,3],event:'G|Rc',label:'garantía entre aparatos que llegan por primera vez',wrong:[[57,200],[3,10],[19,20]],reasons:['Dar solo la conjunta.','Conservar el marginal de garantía.','Invertir la condición.']}]},
 {index:1088,kind:'probability',literals:['40%','30%','20%','independientes'],scale:100,
  cells:[['F','B',20],['F','Bc',20],['Fc','B',10],['Fc','Bc',50]],definitions:'F: juega al fútbol; B: juega al baloncesto; c: complementario.',
  derivation:[['Descontamos de cada marginal quienes practican ambos deportes.','P(F∩Bc)=0,40−0,20=0,20; P(Fc∩B)=0,30−0,20=0,10'],['El resto no practica ninguno de los dos deportes.','P(Fc∩Bc)=1−(0,20+0,20+0,10)=0,50']],
  queries:[{n:[3],d:'all',event:'Fc∩Bc',label:'no practicar ninguno',wrong:[[3,10],[21,50],[7,10]],reasons:['Complementar la suma sin descontar solapamiento.','Suponer independencia para multiplicar complementos.','Dar la suma de marginales.']},{n:[1],d:[0,1],event:'Bc|F',label:'no jugar al baloncesto entre futbolistas',wrong:[[1,5],[7,10],[2,3]],reasons:['Dar solo la conjunta.','Dar el marginal sin baloncesto.','Condicionar a baloncesto en vez de a fútbol.']},{independence:true,row:'F',column:'B'}]},
 {index:1089,kind:'probability',literals:['45%','60%','50%','porcentaje'],scale:100,
  cells:[['F','A',30],['F','Ac',15],['Fc','A',30],['Fc','Ac',25]],definitions:'F: juega al fútbol; A: practica atletismo; c: complementario.',
  derivation:[['El 50% está condicionado a atletismo. Multiplicamos por su marginal, no por el de fútbol.','P(F∩A)=0,60·0,50=0,30'],['Completamos las regiones exclusivas y el exterior a ambos deportes.','P(F∩Ac)=0,45−0,30=0,15; P(Fc∩A)=0,60−0,30=0,30; P(Fc∩Ac)=0,25']],
  queries:[{n:[0],d:'all',percent:true,event:'F∩A',label:'practicar ambos deportes',wrong:[[45,2],[50,1],[60,1]],reasons:['Multiplicar la condicionada por el marginal de fútbol.','Dar el porcentaje condicionado como conjunto.','Dar el porcentaje de atletismo.']},{n:[3],d:'all',event:'Fc∩Ac',label:'no practicar ninguno',wrong:[[11,50],[3,10],[3,4]],reasons:['Suponer independencia no dada.','Dar la intersección.','Dar el complementario de ninguno.']},{n:[2],d:[2,3],event:'A|Fc',label:'atletismo entre quienes no juegan al fútbol',wrong:[[3,10],[3,5],[1,2]],reasons:['Dar solo la conjunta.','Usar el marginal de atletismo.','Invertir la condición.']}]},
 {index:442,kind:'probability',literals:['P (A − B) = 0.3','P (Ac) = 0.35','P (B) = 0.55'],scale:100,
  cells:[['A','B',35],['A','Bc',30],['Ac','B',20],['Ac','Bc',15]],definitions:'A−B significa que ocurre A pero no B; c: complementario.',
  derivation:[['Recuperamos A desde su complemento; la diferencia A−B es solo A.','P(A)=1−0,35=0,65; P(A∩Bc)=0,30'],['La intersección es el marginal de A menos la parte exclusiva.','P(A∩B)=0,65−0,30=0,35'],['Completamos solo B y ninguno usando los marginales oficiales.','P(Ac∩B)=0,55−0,35=0,20; P(Ac∩Bc)=0,35−0,20=0,15']],
  queries:[{n:[0,1,2],d:'all',event:'A∪B',label:'que ocurra al menos uno',wrong:[[1,2],[7,20],[3,20]],reasons:['Interpretar al menos uno como exactamente uno.','Dar la intersección.','Dar el complemento de la unión.']},{n:[2],d:[2,3],event:'B|Ac',label:'B dado que no ocurrió A',wrong:[[1,5],[11,20],[7,11]],reasons:['Dar la conjunta sin condicionar.','Conservar el marginal de B.','Calcular A dado B.']},{n:[3],d:'all',event:'Ac∩Bc',label:'que no ocurra ninguno',wrong:[[63,400],[17,20],[7,20]],reasons:['Multiplicar complementos suponiendo independencia.','Dar la unión.','Dar el marginal de no A.']},{independence:true,row:'A',column:'B'}]},
 {index:1090,kind:'probability',literals:['P( A) = 0.5','P(A ∪ B) = 0.7','P( A ∩ B) = 0.4','P(C) = 0.4','P(D) = 0.3','P(C ∪ D) = 0.5','P(E) = 0.6','P(F ) = 0.8'],custom:'three-experiments'},
 {index:1183,kind:'probability',literals:['80%','50%','10%','i)','ii)','independientes'],scale:100,
  cells:[['T','M',40],['T','Mc',40],['Tc','M',10],['Tc','Mc',10]],definitions:'T: admite tarjeta; M: admite móvil; c: complementario.',
  derivation:[['Ninguno es el complemento de la unión.','P(T∪M)=1−0,10=0,90'],['Hallamos la intersección sin presuponer independencia.','P(T∩M)=0,80+0,50−0,90=0,40'],['Completamos las dos regiones exclusivas.','P(T∩Mc)=0,40; P(Tc∩M)=0,10; P(Tc∩Mc)=0,10']],custom:'nested-payment'},
 {index:1490,kind:'probability',literals:['dos veces consecutivas','dado equilibrado','menor que','impar'],custom:'dice'},
 {index:1497,kind:'probability',literals:['225, 201, 162, 210, 180, 172, 156, 193, 218, 167, 176, 222, 215, 120, 190, 171','múltiplo de 5','mayor que 200'],custom:'finite-list',values:[225,201,162,210,180,172,156,193,218,167,176,222,215,120,190,171]},
];
const sum=(c,ids)=>ids==='all'?c.scale:ids.reduce((s,i)=>s+c.cells[i][2],0);
function numeric(c,q,p){
 const n=sum(c,q.n)*(q.percent?100:1),d=sum(c,q.d),a=f(n,d)+(q.percent?'%':'');
 const bad=q.wrong.map(([x,y])=>f(x,y)+(q.percent?'%':''));
 assert.equal(new Set([a,...bad]).size,4);
 for(const[x,y]of q.wrong)assert.notEqual(n*y,x*d);
 return part(p,a,bad,q.reasons,[
  [c.definitions,`Se pide ${q.percent?'el porcentaje':'la probabilidad'} de ${q.label}.`],...c.derivation,
  ['Las regiones disjuntas se expresan como probabilidades exactas; los pesos son una herramienta de cálculo, no nuevos datos observados.',c.cells.map(([r,k,w])=>`${r}∩${k}: ${f(w,c.scale)}`).join('; ')],
  [q.d==='all'?'Sumamos únicamente las regiones favorables.':'El denominador se restringe al suceso condicionante; el numerador incluye sus casos favorables.',`P(${q.event})=${f(sum(c,q.n),sum(c,q.d))}`],
  [q.percent?'Convertimos la probabilidad en porcentaje multiplicando por cien.':'Simplificamos por un divisor común sin redondear.',a],
  ['Contrastamos los casos favorables y desfavorables dentro del mismo universo.',`${f(sum(c,q.n),sum(c,q.d))}+${f(sum(c,q.d)-sum(c,q.n),sum(c,q.d))}=1`],
  ['La respuesta se refiere al suceso solicitado y mantiene la dirección de la condición.',a]
 ],'FINITE_EVENT_MODEL_AND_CONDITIONED_COMPLEMENT',{numerator:n,denominator:d,wrong:q.wrong,percent:!!q.percent,weights:c.cells,event:q.event});
}
export {numeric as eventProbabilityPart};
function independent(c,p,row,column){
 const N=c.scale,R=c.cells.filter(x=>x[0]===row).reduce((s,x)=>s+x[2],0),C=c.cells.filter(x=>x[1]===column).reduce((s,x)=>s+x[2],0),J=c.cells.filter(x=>x[0]===row&&x[1]===column).reduce((s,x)=>s+x[2],0);
 const yes=J*N===R*C;
 const option=(flag,j,pr)=>`${flag?'Sí':'No'}: P(${row}∩${column})=${j}; P(${row})P(${column})=${pr}.`;
 const correct=option(yes,f(J,N),f(R*C,N*N));
 const bad=[option(!yes,f(J,N),f(R*C,N*N)),option(yes,f(R,N),f(R*C,N*N)),option(yes,f(J,N),f(C,N))];
 return part(p,correct,bad,['Invertir la conclusión pese al producto y la intersección calculados.','Usar el marginal del primer suceso como intersección.','Omitir un factor en el producto de marginales.'],[
  [c.definitions,'Independencia ⇔ probabilidad conjunta igual al producto de marginales.'],...c.derivation,
  ['Obtenemos los marginales sumando las regiones correspondientes.',`P(${row})=${f(R,N)}; P(${column})=${f(C,N)}`],
  ['Calculamos por separado la conjunta y el producto.',`P(${row}∩${column})=${f(J,N)}; P(${row})P(${column})=${f(R*C,N*N)}`],
  ['Comparamos mediante productos cruzados exactos, sin redondeos que puedan ocultar una diferencia pequeña.',`${J}·${N}=${J*N}; ${R}·${C}=${R*C}`],
  ['Comprobamos también la condicionada, cuyo denominador es positivo.',`P(${row}|${column})=${f(J,C)}; P(${row})=${f(R,N)}`],
  [yes?'Las igualdades demuestran independencia.':'Las desigualdades descartan independencia; no basta con que las probabilidades sean próximas.',correct]
 ],'EXACT_JOINT_PRODUCT_AND_CONDITIONAL_COMPARISON',{N,R,C,J,independent:yes,optionClaims:[{independent:yes,joint:[J,N],product:[R*C,N*N]},{independent:!yes,joint:[J,N],product:[R*C,N*N]},{independent:yes,joint:[R,N],product:[R*C,N*N]},{independent:yes,joint:[J,N],product:[C,N]}]});
}
function tuple(p,labels,values,bad,reasons,steps,proof){
 const text=vs=>vs.map(([n,d],i)=>`${labels[i]}=${f(n,d)}`).join('; ')+'.';
 return part(p,text(values),bad.map(text),reasons,[...steps,['Conservamos las etiquetas para que cada resultado responda a su pregunta.',text(values)]],'EXACT_MULTIPLE_EVENT_RESULTS',{values,bad,...proof});
}
export function buildEventParts(c,text){
 const ps=orderedOfficialParts(text);
 if(c.queries){assert.equal(ps.length,c.queries.length);return ps.map((p,i)=>c.queries[i].independence?independent(c,p,c.queries[i].row,c.queries[i].column):numeric(c,c.queries[i],p));}
 if(c.custom==='nested-payment')return [tuple(ps[0],['i) P(T∪M)','ii) P(M|T)'],[[9,10],[1,2]],[[[9,10],[2,5]],[[3,10],[1,2]],[[9,10],[4,5]]],['Dar la conjunta en lugar de la condicionada.','Confundir alguno con exactamente uno.','Invertir la condición y calcular tarjeta dado móvil.'],[
  [c.definitions,'El apartado a) contiene dos preguntas distintas, i) e ii).'],...c.derivation,
  ['La primera pregunta pide la unión, incluyendo restaurantes que admiten ambos medios.','P(T∪M)=0,90'],
  ['La segunda restringe el universo a quienes admiten tarjeta.','P(M|T)=frac{P(M∩T)}{P(T)}=frac{0,40}{0,80}=frac{1}{2}'],
  ['Comprobamos por complemento y por la regla del producto.','0,90+0,10=1; 0,50·0,80=0,40']
 ],{cells:c.cells}),independent(c,ps[1],'T','M')];
 if(c.custom==='three-experiments'){
  const setups=[
   {scale:10,cells:[['A','B',4],['A','Bc',1],['Ac','B',2],['Ac','Bc',3]],definitions:'Este apartado solo utiliza A y B; no se mezclan datos de los otros apartados.',derivation:[['Despejamos B en la fórmula de inclusión-exclusión.','P(B)=P(A∪B)−P(A)+P(A∩B)'],['Sustituimos los datos oficiales.','P(B)=0,7−0,5+0,4=0,6'],['Comprobamos que las regiones exclusivas y el complemento son no negativos.','P(A−B)=0,1; P(B−A)=0,2; P((A∪B)c)=0,3']],q:{n:[0,2],d:'all',event:'B',label:'B',wrong:[[1,5],[2,5],[4,5]],reasons:['Omitir sumar la intersección.','Dar solo la intersección.','Sumar A y el complemento de la unión.']}},
   {scale:10,cells:[['C','D',2],['C','Dc',2],['Cc','D',1],['Cc','Dc',5]],definitions:'Este apartado utiliza C y D; c indica complementario.',derivation:[['Obtenemos la conjunta con la unión.','P(C∩D)=0,4+0,3−0,5=0,2'],['Quitamos de C su parte dentro de D y calculamos la condición.','P(C∩Dc)=0,4−0,2=0,2; P(Dc)=0,7']],q:{n:[1],d:[1,3],event:'C|Dc',label:'C dado que no D',wrong:[[1,5],[4,7],[2,3]],reasons:['Omitir dividir por la condición.','Usar todo C, sin excluir D.','Condicionar a D en vez de a su complemento.']}},
   {scale:100,cells:[['E','F',48],['E','Fc',12],['Ec','F',32],['Ec','Fc',8]],definitions:'Solo E y F se declaran independientes en este apartado.',derivation:[['Usamos la independencia que sí está explícitamente dada.','P(E∩F)=0,6·0,8=0,48'],['Los complementarios también son independientes.','P(Ec∩Fc)=(1−0,6)(1−0,8)=0,4·0,2=0,08'],['Contrastamos con el complemento de la unión.','1−(0,6+0,8−0,48)=0,08']],q:{n:[3],d:'all',event:'Ec∩Fc',label:'que no ocurra E ni F',wrong:[[13,25],[3,25],[12,25]],reasons:['Complementar la intersección en vez de la unión.','Calcular E y no F.','Dar la intersección de E y F.']}}
  ];return setups.map((s,i)=>numeric(s,s.q,ps[i]));
 }
 if(c.custom==='dice'){
  const c2={scale:36,cells:[['A','B',6],['A','Bc',3],['Ac','B',12],['Ac','Bc',15]],definitions:'Cada resultado es un par ordenado (primer lanzamiento, segundo lanzamiento).',derivation:[['A exige que ambos valores estén entre uno y tres; B exige primer valor impar.','|A|=3·3=9; |B|=3·6=18'],['La intersección permite primero uno o tres y segundo uno, dos o tres.','|A∩B|=2·3=6']]};
  return [part(ps[0],'36',['12','21','30'],['Sumar posibilidades en vez de multiplicarlas.','Ignorar el orden de los lanzamientos.','Excluir las parejas con repetición.'],[
   ['Los lanzamientos son consecutivos y distinguibles.','Ω={(i,j): i∈{1,2,3,4,5,6}, j∈{1,2,3,4,5,6}}'],
   ['Fijado el primer resultado, el segundo admite seis posibilidades.','Para cada i hay seis pares (i,1), …, (i,6).'],
   ['Aplicamos la regla del producto.','|Ω|=6·6=36'],
   ['No eliminamos parejas iguales: obtener dos veces la misma cara es posible.','(1,1), …, (6,6) pertenecen a Ω.'],
   ['El orden importa: intercambiar resultados distintos produce otro resultado.','(1,2) ≠ (2,1)'],
   ['Comprobamos enumerando seis filas de seis pares; cada uno tiene probabilidad un treintaiseisavo.','36·frac{1}{36}=1']
  ],'ORDERED_CARTESIAN_PRODUCT_ENUMERATION',{outcomes:36,wrong:[12,21,30]}),
  tuple(ps[1],['P(A)','P(B)'],[[1,4],[1,2]],[[[1,2],[1,2]],[[1,9],[1,2]],[[1,4],[3,4]]],['Examinar solo un dado para el máximo.','Usar dos valores en vez de tres para menor que cuatro.','Interpretar primera impar como al menos una impar.'],[
   [c2.definitions,'Los treinta y seis pares son equiprobables.'],...c2.derivation,
   ['El máximo menor que cuatro equivale a que las dos caras sean menores que cuatro.','P(A)=frac{9}{36}=frac{1}{4}'],
   ['Para B, el segundo lanzamiento es cualquiera de las seis caras.','P(B)=frac{18}{36}=frac{1}{2}'],
   ['Los complementos cuentan el resto de los treinta y seis resultados.','9+27=36; 18+18=36']
  ],{outcomes:36}),independent(c2,ps[2],'A','B')];
 }
 assert.equal(c.custom,'finite-list');const N=c.values.length,count=fn=>c.values.filter(fn).length;
 const odd=count(x=>x%2),mult=count(x=>x%5===0),largeMult=count(x=>x%5===0&&x>200),S=count(x=>x>200),T=count(x=>x%2===0),J=count(x=>x>200&&x%2===0);
 const c2={scale:N,cells:[['S','T',J],['S','Tc',S-J],['Sc','T',T-J],['Sc','Tc',N-S-T+J]],definitions:'S: número mayor que doscientos; T: número par. Los dieciséis números son equiprobables.',derivation:[['Enumeramos S y T directamente en la lista oficial.',`S={${c.values.filter(x=>x>200).join(', ')}}; T={${c.values.filter(x=>x%2===0).join(', ')}}`],['Contamos la intersección sin asumir independencia.',`S∩T={${c.values.filter(x=>x>200&&x%2===0).join(', ')}}; |S∩T|=${J}`]]};
 const first={scale:N,cells:[['I','U',odd],['Ic','U',N-odd]],definitions:'I: número impar; todos los elementos de la lista son equiprobables.',derivation:[['Identificamos los impares por su última cifra.',`Impares={${c.values.filter(x=>x%2).join(', ')}}`],['El denominador es el número de elementos distintos de la lista completa.',`N=${N}; |I|=${odd}`]]};
 const cond={scale:N,cells:[['M','S',largeMult],['M','Sc',mult-largeMult],['Mc','U',N-mult]],definitions:'M: múltiplo de cinco; S: mayor que doscientos.',derivation:[['La condición reduce la lista a los múltiplos de cinco.',`M={${c.values.filter(x=>x%5===0).join(', ')}}`],['Entre ellos contamos únicamente los que superan doscientos.',`M∩S={${c.values.filter(x=>x%5===0&&x>200).join(', ')}}`]]};
 return [numeric(first,{n:[0],d:'all',event:'I',label:'impar',wrong:[[5,8],[7,16],[1,2]],reasons:['Dar el complemento par.','Contar indebidamente un impar adicional.','Suponer paridad equiprobable sin contar.']},ps[0]),numeric(cond,{n:[0],d:[0,1],event:'S|M',label:'mayor que doscientos entre los múltiplos de cinco',wrong:[[3,16],[3,8],[1,3]],reasons:['Dividir por toda la lista.','Usar el marginal de mayor que doscientos.','Omitir uno de los tres casos favorables.']},ps[1]),independent(c2,ps[2],'S','T'),numeric(c2,{n:[0,1,2],d:'all',event:'S∪T',label:'mayor que doscientos o par',wrong:[[1,1],[3,16],[3,8]],reasons:['Sumar marginales sin descontar la intersección.','Dar la intersección.','Dar únicamente S.']},ps[3])];
}
export function buildEventBatch(id='batch-0262',selected=cases){const r=buildBatch(selected,id,buildEventParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Probabilidad';x.secondaryTopics=['Operaciones con sucesos','Independencia y probabilidad condicionada'];x.qualityGates.pedagogical='EXPLICIT_EVENT_MODELS_AND_SEPARATE_OFFICIAL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildEventBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0262-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0262.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}
